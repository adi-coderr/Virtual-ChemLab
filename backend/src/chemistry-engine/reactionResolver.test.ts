import { describe, it, expect } from "vitest";
import { resolveReaction, type ChemicalLookupPort } from "./reactionResolver.js";
import { parseFormula } from "./formulaParser.js";
import { computeMolarMass } from "./molarMass.js";
import { compositionsEqual } from "./formulaParser.js";
import type { Chemical, CuratedReaction, Dissociation, ElementComposition } from "./types.js";

function chem(partial: {
  id: string;
  formula: string;
  commonName: string;
  isAcid?: boolean;
  isBase?: boolean;
  acidBaseStrength?: "strong" | "weak" | "none";
  isElemental?: boolean;
  commonCationCharge?: number;
  dissociation?: Dissociation;
  charge?: number;
  neutralizationProducesWater?: boolean;
}): Chemical {
  const parsed = parseFormula(partial.formula);
  return {
    id: partial.id,
    commonName: partial.commonName,
    formula: partial.formula,
    composition: parsed.composition,
    charge: partial.charge ?? 0,
    molarMass: computeMolarMass(parsed.composition),
    physicalState: "aqueous",
    isAcid: partial.isAcid ?? false,
    isBase: partial.isBase ?? false,
    acidBaseStrength: partial.acidBaseStrength ?? "none",
    chemicalClass: "other",
    aliases: [],
    hazards: [],
    provenance: { source: "test fixture", confidence: "high", dataVersion: "test" },
    isElemental: partial.isElemental,
    commonCationCharge: partial.commonCationCharge,
    dissociation: partial.dissociation,
    neutralizationProducesWater: partial.neutralizationProducesWater,
  };
}

const FIXTURES: Chemical[] = [
  chem({ id: "hcl", formula: "HCl", commonName: "Hydrochloric acid", isAcid: true, acidBaseStrength: "strong", dissociation: { cation: { formula: "H", charge: 1 }, anion: { formula: "Cl", charge: -1 } } }),
  chem({ id: "naoh", formula: "NaOH", commonName: "Sodium hydroxide", isBase: true, acidBaseStrength: "strong", dissociation: { cation: { formula: "Na", charge: 1 }, anion: { formula: "OH", charge: -1 } }, neutralizationProducesWater: true }),
  chem({ id: "koh", formula: "KOH", commonName: "Potassium hydroxide", isBase: true, acidBaseStrength: "strong", dissociation: { cation: { formula: "K", charge: 1 }, anion: { formula: "OH", charge: -1 } }, neutralizationProducesWater: true }),
  chem({ id: "nacl", formula: "NaCl", commonName: "Sodium chloride", dissociation: { cation: { formula: "Na", charge: 1 }, anion: { formula: "Cl", charge: -1 } } }),
  chem({ id: "kcl", formula: "KCl", commonName: "Potassium chloride", dissociation: { cation: { formula: "K", charge: 1 }, anion: { formula: "Cl", charge: -1 } } }),
  chem({ id: "water", formula: "H2O", commonName: "Water" }),
  chem({ id: "zn", formula: "Zn", commonName: "Zinc", isElemental: true, commonCationCharge: 2 }),
  chem({ id: "cu", formula: "Cu", commonName: "Copper", isElemental: true, commonCationCharge: 2 }),
  chem({ id: "ag", formula: "Ag", commonName: "Silver", isElemental: true }),
  chem({ id: "mg", formula: "Mg", commonName: "Magnesium", isElemental: true, commonCationCharge: 2 }),
  chem({ id: "cuso4", formula: "CuSO4", commonName: "Copper(II) sulfate", dissociation: { cation: { formula: "Cu", charge: 2 }, anion: { formula: "SO4", charge: -2 } } }),
  chem({ id: "znso4", formula: "ZnSO4", commonName: "Zinc sulfate", dissociation: { cation: { formula: "Zn", charge: 2 }, anion: { formula: "SO4", charge: -2 } } }),
  chem({ id: "agno3", formula: "AgNO3", commonName: "Silver nitrate", dissociation: { cation: { formula: "Ag", charge: 1 }, anion: { formula: "NO3", charge: -1 } } }),
  chem({ id: "agcl", formula: "AgCl", commonName: "Silver chloride", dissociation: { cation: { formula: "Ag", charge: 1 }, anion: { formula: "Cl", charge: -1 } } }),
  chem({ id: "nano3", formula: "NaNO3", commonName: "Sodium nitrate", dissociation: { cation: { formula: "Na", charge: 1 }, anion: { formula: "NO3", charge: -1 } } }),
  chem({ id: "cuno32", formula: "Cu(NO3)2", commonName: "Copper(II) nitrate", dissociation: { cation: { formula: "Cu", charge: 2 }, anion: { formula: "NO3", charge: -1 } } }),
  chem({ id: "ki", formula: "KI", commonName: "Potassium iodide", dissociation: { cation: { formula: "K", charge: 1 }, anion: { formula: "I", charge: -1 } } }),
  chem({ id: "nai", formula: "NaI", commonName: "Sodium iodide", dissociation: { cation: { formula: "Na", charge: 1 }, anion: { formula: "I", charge: -1 } } }),
  chem({ id: "mgcl2", formula: "MgCl2", commonName: "Magnesium chloride", dissociation: { cation: { formula: "Mg", charge: 2 }, anion: { formula: "Cl", charge: -1 } } }),
  chem({ id: "h2", formula: "H2", commonName: "Hydrogen gas" }),
  chem({ id: "co2", formula: "CO2", commonName: "Carbon dioxide" }),
  chem({ id: "o2", formula: "O2", commonName: "Oxygen", isElemental: true }),
  chem({ id: "propane", formula: "C3H8", commonName: "Propane" }),
  chem({ id: "nahco3", formula: "NaHCO3", commonName: "Sodium bicarbonate", dissociation: { cation: { formula: "Na", charge: 1 }, anion: { formula: "HCO3", charge: -1 } } }),
  chem({ id: "ammonia", formula: "NH3", commonName: "Ammonia", isBase: true, acidBaseStrength: "weak", dissociation: { cation: { formula: "NH4", charge: 1 }, anion: { formula: "OH", charge: -1 } } }),
  chem({ id: "acetic-acid", formula: "CH3COOH", commonName: "Acetic acid", isAcid: true, acidBaseStrength: "weak", dissociation: { cation: { formula: "H", charge: 1 }, anion: { formula: "CH3COO", charge: -1 } } }),
  chem({ id: "ammonium-acetate", formula: "CH3COONH4", commonName: "Ammonium acetate" }),
  chem({ id: "test-x", formula: "He", commonName: "Test X" }),
  chem({ id: "test-y", formula: "Ne", commonName: "Test Y" }),
];

const CURATED: CuratedReaction[] = [
  {
    id: "hcl-naoh",
    name: "Neutralization of hydrochloric acid with sodium hydroxide",
    reactionType: "acid_base_neutralization",
    reactants: [{ chemicalId: "hcl", coefficient: 1 }, { chemicalId: "naoh", coefficient: 1 }],
    products: [{ chemicalId: "nacl", coefficient: 1 }, { chemicalId: "water", coefficient: 1, isByproduct: true }],
    equationDisplay: "HCl + NaOH \u2192 NaCl + H2O",
    energyClassification: "exothermic",
    observableEffects: [],
    experimentalStatus: "experimentally_verified",
    confidenceScore: 0.99,
    source: "test fixture",
  },
  {
    id: "ambiguous-1",
    name: "Ambiguous outcome 1",
    reactionType: "unclassified",
    reactants: [{ chemicalId: "test-x", coefficient: 1 }, { chemicalId: "test-y", coefficient: 1 }],
    products: [{ chemicalId: "water", coefficient: 1 }],
    equationDisplay: "He + Ne \u2192 H2O (fixture only)",
    energyClassification: "unknown",
    observableEffects: [],
    experimentalStatus: "heuristic",
    confidenceScore: 0.5,
    source: "test fixture",
  },
  {
    id: "ambiguous-2",
    name: "Ambiguous outcome 2",
    reactionType: "unclassified",
    reactants: [{ chemicalId: "test-y", coefficient: 1 }, { chemicalId: "test-x", coefficient: 1 }],
    products: [{ chemicalId: "co2", coefficient: 1 }],
    equationDisplay: "Ne + He \u2192 CO2 (fixture only)",
    energyClassification: "unknown",
    observableEffects: [],
    experimentalStatus: "heuristic",
    confidenceScore: 0.5,
    source: "test fixture",
  },
];

function makeLookup(chemicals: Chemical[], curated: CuratedReaction[]): ChemicalLookupPort {
  return {
    getById: (id) => chemicals.find((c) => c.id === id),
    findByComposition: (composition: ElementComposition, charge: number) =>
      chemicals.find((c) => c.charge === charge && compositionsEqual(c.composition, composition)),
    findCuratedReactionsByReactantSet: (ids: string[]) => {
      const target = new Set(ids);
      return curated.filter((r) => {
        const reactionIds = new Set(r.reactants.map((x) => x.chemicalId));
        return reactionIds.size === target.size && [...target].every((id) => reactionIds.has(id));
      });
    },
  };
}

const lookup = makeLookup(FIXTURES, CURATED);
const byId = (id: string) => FIXTURES.find((c) => c.id === id) as Chemical;

describe("resolveReaction: curated pathway", () => {
  it("returns SUPPORTED for a curated reactant set", () => {
    const result = resolveReaction([byId("hcl"), byId("naoh")], {}, lookup);
    expect(result.status).toBe("REACTION");
    expect(result.confidenceTier).toBe("SUPPORTED");
    expect(result.products.map((p) => p.chemicalId).sort()).toEqual(["nacl", "water"]);
  });

  it("reports an ambiguous result when multiple curated outcomes match under the given conditions", () => {
    const result = resolveReaction([byId("test-x"), byId("test-y")], {}, lookup);
    expect(result.confidenceTier).toBe("PREDICTED");
    expect(result.ruleApplied).toBe("curated_reaction:ambiguous");
    expect(result.warnings.length).toBeGreaterThan(0);
  });
});

describe("resolveReaction: metal + acid rule", () => {
  it("predicts Mg + HCl -> MgCl2 + H2 (Mg is above H in the activity series)", () => {
    const result = resolveReaction([byId("mg"), byId("hcl")], {}, lookup);
    expect(result.status).toBe("REACTION");
    expect(result.confidenceTier).toBe("PREDICTED");
    expect(result.reactionType).toBe("single_displacement");
    expect(result.products.map((p) => p.chemicalId).sort()).toEqual(["h2", "mgcl2"]);
  });

  it("predicts NO reaction for Cu + HCl (Cu is below H)", () => {
    const result = resolveReaction([byId("cu"), byId("hcl")], {}, lookup);
    expect(result.status).toBe("NO_REACTION");
    expect(result.confidenceTier).toBe("PREDICTED");
  });
});

describe("resolveReaction: single displacement rule", () => {
  it("predicts Zn + CuSO4 -> ZnSO4 + Cu", () => {
    const result = resolveReaction([byId("zn"), byId("cuso4")], {}, lookup);
    expect(result.status).toBe("REACTION");
    expect(result.confidenceTier).toBe("PREDICTED");
    expect(result.products.map((p) => p.chemicalId).sort()).toEqual(["cu", "znso4"]);
  });

  it("predicts Cu + AgNO3 -> Cu(NO3)2 + Ag (Cu above Ag)", () => {
    const result = resolveReaction([byId("cu"), byId("agno3")], {}, lookup);
    expect(result.status).toBe("REACTION");
    expect(result.products.map((p) => p.chemicalId).sort()).toEqual(["ag", "cuno32"]);
    expect(result.balancedEquation).toContain("2");
  });
});

describe("resolveReaction: precipitation / solubility rule", () => {
  it("predicts AgNO3 + NaCl -> AgCl (precipitate) + NaNO3", () => {
    const result = resolveReaction([byId("agno3"), byId("nacl")], {}, lookup);
    expect(result.status).toBe("REACTION");
    expect(result.reactionType).toBe("precipitation");
    expect(result.products.map((p) => p.chemicalId).sort()).toEqual(["agcl", "nano3"]);
    expect(result.observableEffects.some((e) => e.type === "precipitation")).toBe(true);
  });

  it("predicts NO reaction for NaCl + KI (both possible products are soluble)", () => {
    const result = resolveReaction([byId("nacl"), byId("ki")], {}, lookup);
    expect(result.status).toBe("NO_REACTION");
    expect(result.confidenceTier).toBe("PREDICTED");
    expect(result.explanation).toMatch(/soluble/);
  });
});

describe("resolveReaction: combustion rule", () => {
  it("predicts propane combustion (C3H8 + O2 -> CO2 + H2O)", () => {
    const result = resolveReaction([byId("propane"), byId("o2")], {}, lookup);
    expect(result.status).toBe("REACTION");
    expect(result.reactionType).toBe("combustion");
    expect(result.energyClassification).toBe("exothermic");
    expect(result.products.map((p) => p.chemicalId).sort()).toEqual(["co2", "water"]);
  });
});

describe("resolveReaction: gas evolution rule", () => {
  it("predicts NaHCO3 + HCl -> NaCl + H2O + CO2", () => {
    const result = resolveReaction([byId("nahco3"), byId("hcl")], {}, lookup);
    expect(result.status).toBe("REACTION");
    expect(result.reactionType).toBe("gas_evolution");
    expect(result.products.map((p) => p.chemicalId).sort()).toEqual(["co2", "nacl", "water"]);
    expect(result.observableEffects.some((e) => e.type === "gas_evolution")).toBe(true);
  });
});

describe("resolveReaction: acid-base rule with strength-based tiers", () => {
  it("marks a strong-strong pair (HCl + KOH) as PREDICTED with water as a byproduct", () => {
    const result = resolveReaction([byId("hcl"), byId("koh")], {}, lookup);
    expect(result.confidenceTier).toBe("PREDICTED");
    expect(result.products.map((p) => p.chemicalId).sort()).toEqual(["kcl", "water"]);
  });

  it("marks a weak-weak pair (acetic acid + ammonia) as APPROXIMATE with no water byproduct", () => {
    const result = resolveReaction([byId("acetic-acid"), byId("ammonia")], {}, lookup);
    expect(result.confidenceTier).toBe("APPROXIMATE");
    expect(result.products.map((p) => p.chemicalId)).toEqual(["ammonium-acetate"]);
    expect(result.explanation).toMatch(/equilibrium/);
  });
});

describe("resolveReaction: unsupported fallback", () => {
  it("returns UNSUPPORTED/UNKNOWN when nothing matches", () => {
    // Methane and salt: no acid/base, no elemental-metal pairing, and methane has no ionic dissociation.
    const result = resolveReaction([byId("propane"), byId("nacl")], {}, lookup);
    expect(result.status).toBe("UNSUPPORTED");
    expect(result.confidenceTier).toBe("UNKNOWN");
    expect(result.confidenceScore).toBe(0);
    expect(result.missingInfo?.length).toBeGreaterThan(0);
  });

  it("returns UNSUPPORTED for a single reactant with no curated single-reactant match", () => {
    const result = resolveReaction([byId("water")], {}, lookup);
    expect(result.status).toBe("UNSUPPORTED");
  });
});
