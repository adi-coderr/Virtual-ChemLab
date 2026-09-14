import { ChemistryEngineError } from "./types.js";
import type { ReactionInputSpecies, StoichiometryLine } from "./types.js";
import { toMoles } from "./units.js";

export interface StoichiometryReactantInfo {
  chemicalId: string;
  formula: string;
  commonName: string;
  coefficient: number;
  molarMass: number;
}

export interface StoichiometryProductInfo {
  chemicalId: string;
  formula: string;
  commonName: string;
  coefficient: number;
  molarMass: number;
  isByproduct?: boolean;
}

export interface StoichiometryResult {
  lines: StoichiometryLine[];
  limitingReagentChemicalId: string;
  /** Moles of reaction "extent" (i.e. how many times the balanced equation as written occurred). */
  extentMoles: number;
}

/**
 * Computes the full stoichiometric breakdown for a balanced reaction given
 * how much of each reactant was actually provided.
 *
 * Every reactant listed in the balanced equation must have a corresponding
 * input amount -- silently assuming "0" for a missing reactant would
 * misrepresent what the user asked to simulate, so this throws instead.
 */
export function computeStoichiometry(
  reactants: StoichiometryReactantInfo[],
  products: StoichiometryProductInfo[],
  inputs: ReactionInputSpecies[]
): StoichiometryResult {
  const inputByChemicalId = new Map(inputs.map((i) => [i.chemicalId, i]));

  const reactantMoles = reactants.map((r) => {
    const input = inputByChemicalId.get(r.chemicalId);
    if (!input) {
      throw new ChemistryEngineError(
        `No quantity was provided for reactant "${r.commonName}" (${r.formula}), which this reaction requires.`,
        "MISSING_REACTANT_QUANTITY",
        { chemicalId: r.chemicalId }
      );
    }
    const { moles, massGrams } = toMoles(input, r.molarMass);
    return { ...r, providedMoles: moles, providedMass: massGrams };
  });

  // The limiting reagent is whichever reactant has the smallest "moles per
  // stoichiometric unit" -- i.e. would run out first if the reaction ran to completion.
  let limiting = reactantMoles[0];
  if (!limiting) {
    throw new ChemistryEngineError("No reactants supplied.", "NO_REACTANTS");
  }
  let limitingRatio = limiting.providedMoles / limiting.coefficient;
  for (const r of reactantMoles) {
    const ratio = r.providedMoles / r.coefficient;
    if (ratio < limitingRatio) {
      limiting = r;
      limitingRatio = ratio;
    }
  }
  const extentMoles = limitingRatio;

  const reactantLines: StoichiometryLine[] = reactantMoles.map((r) => {
    const consumedMoles = r.coefficient * extentMoles;
    const remainingMoles = Math.max(0, r.providedMoles - consumedMoles);
    return {
      chemicalId: r.chemicalId,
      formula: r.formula,
      commonName: r.commonName,
      role: "reactant",
      coefficient: r.coefficient,
      inputMoles: r.providedMoles,
      inputMass: r.providedMass,
      isLimiting: r.chemicalId === limiting.chemicalId,
      remainingMoles,
      remainingMass: remainingMoles * r.molarMass,
    };
  });

  const productLines: StoichiometryLine[] = products.map((p) => {
    const yieldMoles = p.coefficient * extentMoles;
    return {
      chemicalId: p.chemicalId,
      formula: p.formula,
      commonName: p.commonName,
      role: p.isByproduct ? "byproduct" : "product",
      coefficient: p.coefficient,
      theoreticalYieldMoles: yieldMoles,
      theoreticalYieldMass: yieldMoles * p.molarMass,
    };
  });

  return {
    lines: [...reactantLines, ...productLines],
    limitingReagentChemicalId: limiting.chemicalId,
    extentMoles,
  };
}

/** Percentage yield, only meaningful when an experimentally observed yield is supplied. */
export function computePercentageYield(theoreticalYieldMass: number, actualYieldMass: number): number {
  if (theoreticalYieldMass <= 0) {
    throw new ChemistryEngineError("Theoretical yield must be positive to compute a percentage yield.", "INVALID_YIELD");
  }
  return (actualYieldMass / theoreticalYieldMass) * 100;
}
