import type { IonSpec } from "./ions.js";

export type SolubilityTier = "soluble" | "slightly_soluble" | "insoluble";

export interface SolubilityPrediction {
  tier: SolubilityTier;
  rule: string;
}

// Cations whose compounds are soluble with virtually every anion (Group 1 + ammonium).
const ALWAYS_SOLUBLE_CATIONS = new Set(["Li", "Na", "K", "Rb", "Cs", "NH4"]);
// Anions that are soluble with virtually every cation.
const ALWAYS_SOLUBLE_ANIONS = new Set(["NO3", "CH3COO", "ClO3", "ClO4"]);

const HALIDE_ANIONS = new Set(["Cl", "Br", "I"]);
const HALIDE_EXCEPTION_CATIONS = new Set(["Ag", "Pb", "Hg2"]);

const SULFATE_INSOLUBLE_CATIONS = new Set(["Ba", "Sr", "Pb"]);
const SULFATE_SLIGHTLY_SOLUBLE_CATIONS = new Set(["Ca", "Ag"]);

const HYDROXIDE_SOLUBLE_EXCEPTION_CATIONS = new Set(["Ba", "Sr"]);
const HYDROXIDE_SLIGHTLY_SOLUBLE_CATIONS = new Set(["Ca"]);

const INSOLUBLE_UNLESS_GROUP1_ANIONS = new Set(["CO3", "PO4", "SO3", "CrO4"]);
const SULFIDE_ANIONS = new Set(["S"]);

/**
 * Applies the standard general-chemistry solubility rules to a cation/anion
 * pair. Returns null when no rule in this table covers the pair, which
 * callers should treat as "cannot determine" rather than guessing.
 */
export function predictSolubility(cation: IonSpec, anion: IonSpec): SolubilityPrediction | null {
  if (ALWAYS_SOLUBLE_CATIONS.has(cation.formula)) {
    return {
      tier: "soluble",
      rule: "Compounds of Group 1 metals and ammonium (NH4+) are soluble with virtually every anion.",
    };
  }

  if (ALWAYS_SOLUBLE_ANIONS.has(anion.formula)) {
    return {
      tier: "soluble",
      rule: "Nitrates, acetates, and chlorates are soluble with virtually every cation.",
    };
  }

  if (HALIDE_ANIONS.has(anion.formula)) {
    if (HALIDE_EXCEPTION_CATIONS.has(cation.formula)) {
      return {
        tier: "insoluble",
        rule: "Chlorides, bromides, and iodides are soluble except when paired with Ag+, Pb2+, or Hg2(2+).",
      };
    }
    return {
      tier: "soluble",
      rule: "Chlorides, bromides, and iodides are soluble except when paired with Ag+, Pb2+, or Hg2(2+).",
    };
  }

  if (anion.formula === "SO4") {
    if (SULFATE_INSOLUBLE_CATIONS.has(cation.formula)) {
      return {
        tier: "insoluble",
        rule: "Sulfates are soluble except with Ba2+, Sr2+, and Pb2+ (insoluble), or Ca2+/Ag+ (slightly soluble).",
      };
    }
    if (SULFATE_SLIGHTLY_SOLUBLE_CATIONS.has(cation.formula)) {
      return {
        tier: "slightly_soluble",
        rule: "Sulfates are soluble except with Ba2+, Sr2+, and Pb2+ (insoluble), or Ca2+/Ag+ (slightly soluble).",
      };
    }
    return { tier: "soluble", rule: "Sulfates are soluble except with Ba2+, Sr2+, Pb2+, Ca2+, and Ag+." };
  }

  if (anion.formula === "OH") {
    if (HYDROXIDE_SOLUBLE_EXCEPTION_CATIONS.has(cation.formula)) {
      return {
        tier: "soluble",
        rule: "Hydroxides are insoluble except for Group 1 cations and Ba2+/Sr2+ (soluble), or Ca2+ (slightly soluble).",
      };
    }
    if (HYDROXIDE_SLIGHTLY_SOLUBLE_CATIONS.has(cation.formula)) {
      return {
        tier: "slightly_soluble",
        rule: "Hydroxides are insoluble except for Group 1 cations and Ba2+/Sr2+ (soluble), or Ca2+ (slightly soluble).",
      };
    }
    return {
      tier: "insoluble",
      rule: "Hydroxides are insoluble except for Group 1 cations and Ba2+/Sr2+ (soluble), or Ca2+ (slightly soluble).",
    };
  }

  if (INSOLUBLE_UNLESS_GROUP1_ANIONS.has(anion.formula)) {
    return {
      tier: "insoluble",
      rule: "Carbonates, phosphates, sulfites, and chromates are insoluble except with Group 1 cations or ammonium.",
    };
  }

  if (SULFIDE_ANIONS.has(anion.formula)) {
    return {
      tier: "insoluble",
      rule: "Sulfides are insoluble except with Group 1 cations or ammonium.",
    };
  }

  return null;
}
