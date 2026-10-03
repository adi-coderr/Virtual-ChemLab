import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  aiReactionPredictor,
  sanitizeChemicalFormula,
} from "../../src/services/aiReactionPredictor.js";
import { getDb } from "../../src/data/db.js";
import { seedDatabase } from "../../src/data/seed/index.js";

describe("AI Predictor Accuracy and Post-Processing Engine", () => {
  const db = getDb();
  seedDatabase(db);

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe("Formula Sanitization (sanitizeChemicalFormula)", () => {
    it("strips physical state annotations like (s), (l), (g), (aq)", () => {
      expect(sanitizeChemicalFormula("H2O(l)")).toEqual({
        formula: "H2O",
        coefficient: undefined,
        physicalState: "liquid",
      });
      expect(sanitizeChemicalFormula("CO2 (g)")).toEqual({
        formula: "CO2",
        coefficient: undefined,
        physicalState: "gas",
      });
      expect(sanitizeChemicalFormula("AgCl(s)")).toEqual({
        formula: "AgCl",
        coefficient: undefined,
        physicalState: "solid",
      });
      expect(sanitizeChemicalFormula("NaCl(aq)")).toEqual({
        formula: "NaCl",
        coefficient: undefined,
        physicalState: "aqueous",
      });
    });

    it("extracts accidental leading coefficients in formula strings", () => {
      const res = sanitizeChemicalFormula("2 H2O");
      expect(res.formula).toBe("H2O");
      expect(res.coefficient).toBe(2);

      const res2 = sanitizeChemicalFormula("3Fe");
      expect(res2.formula).toBe("Fe");
      expect(res2.coefficient).toBe(3);

      const res3 = sanitizeChemicalFormula("2 H2O (l)");
      expect(res3.formula).toBe("H2O");
      expect(res3.coefficient).toBe(2);
      expect(res3.physicalState).toBe("liquid");

      const res4 = sanitizeChemicalFormula("2H2O (l)");
      expect(res4.formula).toBe("H2O");
      expect(res4.coefficient).toBe(2);
      expect(res4.physicalState).toBe("liquid");

      const res5 = sanitizeChemicalFormula("3 [Fe(CN)6]4-");
      expect(res5.formula).toBe("[Fe(CN)6]^4-");
      expect(res5.coefficient).toBe(3);
    });

    it("normalizes charge notations for ions", () => {
      expect(sanitizeChemicalFormula("Fe^2+").formula).toBe("Fe^2+");
      expect(sanitizeChemicalFormula("Fe+2").formula).toBe("Fe^2+");
      expect(sanitizeChemicalFormula("Fe++").formula).toBe("Fe^2+");
      expect(sanitizeChemicalFormula("SO4^2-").formula).toBe("SO4^2-");
      expect(sanitizeChemicalFormula("SO4-2").formula).toBe("SO4^2-");
      expect(sanitizeChemicalFormula("OH-").formula).toBe("OH^-");
      expect(sanitizeChemicalFormula("H+").formula).toBe("H^+");
    });

    it("strips hydrate dots to enable formula balancing", () => {
      expect(sanitizeChemicalFormula("CuSO4·5H2O").formula).toBe("CuSO4");
      expect(sanitizeChemicalFormula("CuSO4.5H2O").formula).toBe("CuSO4");
    });
  });

  describe("Prompt Assembly with Physical Conditions and Reactant Context", () => {
    it("incorporates elevated temperature, catalyst, solvent, and reactant classes", () => {
      const prompt = aiReactionPredictor.assemblePrompt("N2 + H2", {
        conditions: {
          temperatureC: 450,
          pressureAtm: 200,
          solvent: "gas phase",
          catalystChemicalId: "Fe",
        },
        reactantDetails: [
          { name: "Nitrogen", formula: "N2", amount: "1 mol", state: "gas" },
          { name: "Hydrogen", formula: "H2", amount: "3 mol", state: "gas" },
        ],
      });

      expect(prompt).toContain("450 °C (elevated / heating applied)");
      expect(prompt).toContain("200 atm");
      expect(prompt).toContain("gas phase");
      expect(prompt).toContain("Fe");
      expect(prompt).toContain("Nitrogen [N2] (gas)");
      expect(prompt).toContain("Hydrogen [H2] (gas)");
      expect(prompt).toContain("thermodynamic evaluation");
    });
  });

  describe("Post-processing and Mathematical Stoichiometric Balancing", () => {
    it("enriches predicted products with known database records and balances coefficients", async () => {
      vi.spyOn(aiReactionPredictor as any, "callProvider").mockResolvedValueOnce({
        status: "REACTION",
        reactionType: "combustion",
        balancedEquation: "CH4 + O2 -> CO2 + H2O", // Unbalanced coefficients from model
        reactants: [
          { formula: "CH4(g)", commonName: "Methane" },
          { formula: "O2(g)", commonName: "Oxygen" },
        ],
        products: [
          { formula: "CO2(g)", commonName: "Carbon dioxide" },
          { formula: "H2O(l)", commonName: "Water" },
        ],
        energyClassification: "exothermic",
        enthalpyKjPerMol: -890,
        explanation: "Complete combustion of methane in oxygen produces carbon dioxide and water.",
      });

      const res = await aiReactionPredictor.predict("CH4 + O2", {
        provider: "groq",
        apiKey: "gsk_test_mock_key",
      });

      expect(res.status).toBe("REACTION");
      expect(res.confidenceScore).toBe(0.98);
      // Mathematically balanced by engine: CH4 + 2 O2 -> CO2 + 2 H2O
      expect(res.balancedEquation).toContain("CH4 + 2 O2 → CO2 + 2 H2O");
      const ch4 = res.reactants.find((r) => r.formula === "CH4");
      const o2 = res.reactants.find((r) => r.formula === "O2");
      const co2 = res.products.find((p) => p.formula === "CO2");
      const h2o = res.products.find((p) => p.formula === "H2O");

      expect(ch4?.coefficient).toBe(1);
      expect(o2?.coefficient).toBe(2);
      expect(co2?.coefficient).toBe(1);
      expect(h2o?.coefficient).toBe(2);

      // Verify DB enrichment matched registered records
      expect(ch4?.isRegistered).toBe(true);
      expect(h2o?.isRegistered).toBe(true);
      expect(res.energyClassification).toBe("exothermic");
      expect(res.enthalpyKjPerMol).toBe(-890);
    });

    it("auto-completes water in aqueous redox reactions when H and O are missing in products", async () => {
      // Model returned KMnO4 + H2SO4 + H2O2 -> K2SO4 + MnSO4 + O2 without specifying H2O
      vi.spyOn(aiReactionPredictor as any, "callProvider").mockResolvedValueOnce({
        status: "REACTION",
        reactionType: "redox_other",
        reactants: [
          { formula: "KMnO4", commonName: "Potassium permanganate", coefficient: 2 },
          { formula: "H2SO4", commonName: "Sulfuric acid", coefficient: 3 },
          { formula: "H2O2", commonName: "Hydrogen peroxide", coefficient: 5 },
        ],
        products: [
          { formula: "K2SO4", commonName: "Potassium sulfate", coefficient: 1 },
          { formula: "MnSO4", commonName: "Manganese(II) sulfate", coefficient: 2 },
          { formula: "O2", commonName: "Oxygen gas", coefficient: 5 },
        ],
        explanation: "Permanganate oxidizes hydrogen peroxide to oxygen.",
      });

      const res = await aiReactionPredictor.predict("KMnO4 + H2SO4 + H2O2", {
        provider: "groq",
        apiKey: "gsk_test_mock_key",
      });

      expect(res.status).toBe("REACTION");
      expect(res.confidenceScore).toBe(0.98);
      // Auto-completed with H2O
      const water = res.products.find((p) => p.formula === "H2O");
      expect(water).toBeDefined();
      expect(water?.coefficient).toBe(8);
      expect(water?.isByproduct).toBe(true);
      expect(res.balancedEquation).toContain("8 H2O");
    });

    it("updates existing water entry coefficient instead of duplicating it", async () => {
      // Model returned KMnO4 + H2SO4 + H2O2 -> K2SO4 + MnSO4 + O2 + H2O with water coefficient 1 instead of 8
      vi.spyOn(aiReactionPredictor as any, "callProvider").mockResolvedValueOnce({
        status: "REACTION",
        reactionType: "redox_other",
        reactants: [
          { formula: "KMnO4", commonName: "Potassium permanganate", coefficient: 2 },
          { formula: "H2SO4", commonName: "Sulfuric acid", coefficient: 3 },
          { formula: "H2O2", commonName: "Hydrogen peroxide", coefficient: 5 },
        ],
        products: [
          { formula: "K2SO4", commonName: "Potassium sulfate", coefficient: 1 },
          { formula: "MnSO4", commonName: "Manganese(II) sulfate", coefficient: 2 },
          { formula: "O2", commonName: "Oxygen gas", coefficient: 5 },
          { formula: "H2O", commonName: "Water", coefficient: 1, isByproduct: true },
        ],
        explanation: "Permanganate oxidizes hydrogen peroxide to oxygen in acidic solution.",
      });

      const res = await aiReactionPredictor.predict("KMnO4 + H2SO4 + H2O2", {
        provider: "groq",
        apiKey: "gsk_test_mock_key",
      });

      expect(res.status).toBe("REACTION");
      const waterProducts = res.products.filter((p) => p.formula === "H2O");
      // Must NOT duplicate water
      expect(waterProducts).toHaveLength(1);
      expect(waterProducts[0]?.coefficient).toBe(8);
      expect(res.balancedEquation).toContain("8 H2O");
      expect(res.balancedEquation).not.toContain("H2O + 7 H2O");
    });

    it("balances reaction via Gaussian elimination when water is omitted from products", async () => {
      // Cu + HNO3 -> Cu(NO3)2 + NO2 (H2O omitted, unbalanced coefficients)
      vi.spyOn(aiReactionPredictor as any, "callProvider").mockResolvedValueOnce({
        status: "REACTION",
        reactionType: "redox_other",
        reactants: [
          { formula: "Cu", commonName: "Copper" },
          { formula: "HNO3", commonName: "Nitric acid" },
        ],
        products: [
          { formula: "Cu(NO3)2", commonName: "Copper(II) nitrate" },
          { formula: "NO2", commonName: "Nitrogen dioxide" },
        ],
        explanation: "Concentrated nitric acid oxidizes copper to copper(II) nitrate and nitrogen dioxide gas.",
      });

      const res = await aiReactionPredictor.predict("Cu + HNO3 (conc)", {
        provider: "groq",
        apiKey: "gsk_test_mock_key",
      });

      expect(res.status).toBe("REACTION");
      expect(res.confidenceScore).toBe(0.98);
      // Balanced: Cu + 4 HNO3 -> Cu(NO3)2 + 2 NO2 + 2 H2O
      expect(res.balancedEquation).toContain("Cu + 4 HNO3 → Cu(NO3)2 + 2 NO2 + 2 H2O");
      const h2o = res.products.find((p) => p.formula === "H2O");
      expect(h2o).toBeDefined();
      expect(h2o?.coefficient).toBe(2);
    });

    it("correctly identifies and formats NO_REACTION outcomes with enriched reactants", async () => {
      vi.spyOn(aiReactionPredictor as any, "callProvider").mockResolvedValueOnce({
        status: "NO_REACTION",
        reactants: [
          { formula: "Cu", commonName: "Copper" },
          { formula: "HCl", commonName: "Hydrochloric acid" },
        ],
        products: [],
        explanation:
          "Copper has a positive standard reduction potential (+0.34 V) and is below hydrogen in the activity series, so it cannot be oxidized by non-oxidizing hydronium ions in HCl.",
      });

      const res = await aiReactionPredictor.predict("Cu + HCl", {
        provider: "gemini",
        apiKey: "fake_gemini_key",
      });

      expect(res.status).toBe("NO_REACTION");
      expect(res.products).toHaveLength(0);
      expect(res.confidenceScore).toBe(0.95);
      expect(res.explanation).toContain("Copper has a positive standard reduction potential");
      const cu = res.reactants.find((r) => r.formula === "Cu");
      expect(cu?.isRegistered).toBe(true);
    });
  });
});
