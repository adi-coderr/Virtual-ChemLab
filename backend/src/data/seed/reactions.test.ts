import { describe, it, expect } from "vitest";
import { SEED_REACTIONS } from "./reactions.js";
import { SEED_CHEMICALS } from "./chemicals.js";
import { parseFormula } from "../../chemistry-engine/formulaParser.js";
import { balanceEquation } from "../../chemistry-engine/balancer.js";

const chemById = new Map(SEED_CHEMICALS.map((c) => [c.id, c]));

describe("seed reaction data integrity", () => {
  it("has unique ids", () => {
    const ids = SEED_REACTIONS.map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it.each(SEED_REACTIONS.map((r) => [r.id, r] as const))("%s: every reactant/product chemical id exists", (_id, r) => {
    for (const species of [...r.reactants, ...r.products]) {
      expect(chemById.has(species.chemicalId), `unknown chemical id "${species.chemicalId}" in reaction ${r.id}`).toBe(true);
    }
    if (r.catalystChemicalId) {
      expect(chemById.has(r.catalystChemicalId)).toBe(true);
    }
    for (const effect of r.observableEffects) {
      if (effect.relatedChemicalId) {
        expect(chemById.has(effect.relatedChemicalId), `unknown related chemical in an effect of ${r.id}`).toBe(true);
      }
    }
  });

  it.each(SEED_REACTIONS.map((r) => [r.id, r] as const))(
    "%s: the stored coefficients are an actual valid element-conservation balance",
    (_id, r) => {
      const toBalancerSpecies = (chemicalId: string) => {
        const chem = chemById.get(chemicalId)!;
        const parsed = parseFormula(chem.formula);
        return { label: chemicalId, formula: chem.formula, composition: parsed.composition, charge: chem.charge ?? 0 };
      };

      const balanced = balanceEquation(r.reactants.map((x) => toBalancerSpecies(x.chemicalId)), r.products.map((x) => toBalancerSpecies(x.chemicalId)));

      // The balancer returns the *minimal* integer coefficients. The stored
      // seed coefficients should be an integer multiple of that minimal
      // solution (usually exactly equal to it).
      const ratios = [...r.reactants.map((x, i) => x.coefficient / (balanced.reactantCoefficients[i] as number)), ...r.products.map((x, i) => x.coefficient / (balanced.productCoefficients[i] as number))];
      const first = ratios[0];
      for (const ratio of ratios) {
        expect(ratio, `${r.id}: stored coefficients are not a consistent multiple of the minimal balance (got ratios ${ratios.join(", ")})`).toBeCloseTo(first as number, 6);
      }
    }
  );

  it.each(SEED_REACTIONS.map((r) => [r.id, r] as const))("%s: equationDisplay is non-empty and mentions every species formula", (_id, r) => {
    expect(r.equationDisplay.length).toBeGreaterThan(0);
    for (const species of [...r.reactants, ...r.products]) {
      const formula = chemById.get(species.chemicalId)!.formula;
      expect(r.equationDisplay.includes(formula), `${r.id}: equationDisplay "${r.equationDisplay}" is missing formula "${formula}"`).toBe(true);
    }
  });
});
