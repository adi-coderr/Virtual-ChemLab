import type { ReactionInputSpecies, CalorimetryResult } from "./types.js";

export type { CalorimetryResult };

export interface CalorimetryOptions {
  inputs: ReactionInputSpecies[];
  extentMoles: number;
  enthalpyKjPerMol: number;
  initialTemperatureC?: number;
  molarMassLookup?: (chemicalId: string) => number | undefined;
}

const SPECIFIC_HEAT_AQUEOUS_J_PER_G_C = 4.184;
const DEFAULT_SOLVENT_MASS_GRAMS = 50.0; // Standard bench scale default (50 mL water)

export function computeCalorimetry(options: CalorimetryOptions): CalorimetryResult {
  const { inputs, extentMoles, enthalpyKjPerMol, initialTemperatureC = 25.0, molarMassLookup } = options;

  let totalMassGrams = 0;
  let hasSolvent = false;

  for (const input of inputs) {
    if (input.chemicalId === "water" || input.unit === "mL" || input.unit === "L") {
      hasSolvent = true;
    }

    let mass = 0;
    switch (input.unit) {
      case "g":
        mass = input.amount;
        break;
      case "kg":
        mass = input.amount * 1000;
        break;
      case "mg":
        mass = input.amount / 1000;
        break;
      case "mL":
        // Assume density ~ 1.0 g/mL for aqueous solutions/liquids
        mass = input.amount * 1.0;
        break;
      case "L":
        mass = input.amount * 1000;
        break;
      case "mol":
      case "mmol": {
        const molarMass = molarMassLookup?.(input.chemicalId) ?? 50;
        const moles = input.unit === "mol" ? input.amount : input.amount / 1000;
        mass = moles * molarMass;
        break;
      }
      default:
        mass = input.amount;
    }
    totalMassGrams += mass;
  }

  // If only a solid solute was provided without solvent amount, add default aqueous solvent
  if (!hasSolvent || totalMassGrams < 5.0) {
    totalMassGrams += DEFAULT_SOLVENT_MASS_GRAMS;
  }

  const heatCapacityJPerC = Math.max(10.0, totalMassGrams * SPECIFIC_HEAT_AQUEOUS_J_PER_G_C);

  // q_rxn = n * ΔH (kJ -> J)
  const heatJoules = extentMoles * enthalpyKjPerMol * 1000;
  // q_solution = - q_rxn
  const solutionHeatJoules = -heatJoules;

  // ΔT = q_solution / C
  const rawDeltaT = solutionHeatJoules / heatCapacityJPerC;
  const rawFinalT = initialTemperatureC + rawDeltaT;

  // Bound to physical liquid range for aqueous experiments (-5 °C to 100 °C) when started at ambient/aqueous conditions
  const clampedFinalT = initialTemperatureC <= 100.0
    ? Math.min(100.0, Math.max(-5.0, rawFinalT))
    : Math.max(-5.0, rawFinalT);
  const effectiveDeltaT = clampedFinalT - initialTemperatureC;

  const initialRound = Math.round(initialTemperatureC * 10) / 10;
  const finalRound = Math.round(clampedFinalT * 10) / 10;
  const deltaRound = Math.round(effectiveDeltaT * 10) / 10;

  let summaryText = "";
  if (deltaRound < 0) {
    summaryText = `Decreased by ${Math.abs(deltaRound).toFixed(1)} °C (from ${initialRound.toFixed(1)} °C to ${finalRound.toFixed(1)} °C)`;
  } else if (deltaRound > 0) {
    summaryText = `Increased by ${deltaRound.toFixed(1)} °C (from ${initialRound.toFixed(1)} °C to ${finalRound.toFixed(1)} °C)`;
  } else {
    summaryText = `No significant temperature change (remains at ${initialRound.toFixed(1)} °C)`;
  }

  return {
    enthalpyKjPerMol,
    extentMoles,
    heatJoules,
    solutionHeatJoules,
    initialTemperatureC: initialRound,
    finalTemperatureC: finalRound,
    temperatureDeltaC: deltaRound,
    totalMassGrams: Math.round(totalMassGrams * 10) / 10,
    heatCapacityJPerC: Math.round(heatCapacityJPerC * 10) / 10,
    summaryText,
  };
}
