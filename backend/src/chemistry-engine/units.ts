import { ChemistryEngineError } from "./types.js";
import type { ReactionInputSpecies } from "./types.js";

/**
 * Deliberate scope limit: this engine converts mass <-> moles (via molar
 * mass) and solution volume + molar concentration <-> moles. It does NOT
 * convert a bare gas volume to moles via the ideal gas law, because doing
 * that correctly requires temperature and pressure to be pinned down
 * precisely and it is easy to silently imply more precision than the model
 * actually has. If you need gas-volume dosing, convert to moles yourself
 * using PV = nRT for your specific conditions, or provide mass/moles directly.
 */

export function massToGrams(amount: number, unit: "g" | "kg" | "mg"): number {
  switch (unit) {
    case "g":
      return amount;
    case "kg":
      return amount * 1000;
    case "mg":
      return amount / 1000;
  }
}

export function molesFromUnit(amount: number, unit: "mol" | "mmol"): number {
  return unit === "mol" ? amount : amount / 1000;
}

export function volumeToLiters(amount: number, unit: "mL" | "L"): number {
  return unit === "L" ? amount : amount / 1000;
}

export interface MolesResult {
  moles: number;
  massGrams?: number;
}

/** Resolves the number of moles supplied by a reaction input, given the chemical's molar mass. */
export function toMoles(input: ReactionInputSpecies, molarMass: number): MolesResult {
  const { amount, unit } = input;
  if (amount <= 0) {
    throw new ChemistryEngineError(`Amount must be a positive number (got ${amount}).`, "INVALID_AMOUNT", {
      amount,
    });
  }

  if (unit === "g" || unit === "kg" || unit === "mg") {
    const grams = massToGrams(amount, unit);
    return { moles: grams / molarMass, massGrams: grams };
  }

  if (unit === "mol" || unit === "mmol") {
    const moles = molesFromUnit(amount, unit);
    return { moles, massGrams: moles * molarMass };
  }

  if (unit === "mL" || unit === "L") {
    if (input.concentrationMolar === undefined) {
      throw new ChemistryEngineError(
        `A volume ("${amount} ${unit}") was given without a concentration. Provide concentrationMolar ` +
          `(mol/L) for a solution, or specify the amount as mass or moles instead.`,
        "MISSING_CONCENTRATION",
        { amount, unit }
      );
    }
    if (input.concentrationMolar <= 0) {
      throw new ChemistryEngineError("concentrationMolar must be a positive number.", "INVALID_CONCENTRATION");
    }
    const liters = volumeToLiters(amount, unit);
    const moles = liters * input.concentrationMolar;
    return { moles, massGrams: moles * molarMass };
  }

  throw new ChemistryEngineError(`Unsupported unit "${unit}".`, "UNSUPPORTED_UNIT", { unit });
}
