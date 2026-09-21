import { describe, it, expect } from "vitest";
import { SEED_REACTIONS } from "./reactions.js";
import { SEED_CHEMICALS } from "./chemicals.js";
import { parseFormula } from "../../chemistry-engine/formulaParser.js";
import { balanceEquation } from "../../chemistry-engine/balancer.js";
import { createTestDb } from "../db.js";
import { seedDatabase } from "./index.js";
import { SimulationService } from "../../services/simulationService.js";

const db = createTestDb();
seedDatabase(db);
const simulationService = new SimulationService(db);

const chemMap = new Map(SEED_CHEMICALS.map((c) => [c.id, c]));
const batch2 = SEED_REACTIONS.slice(81, 131); // Batch 2 reactions (50)
const batch3 = SEED_REACTIONS.slice(131, 181); // Batch 3 reactions (50)
const batch4 = SEED_REACTIONS.slice(181); // Batch 4 reactions (1000 newly added)

describe("Comprehensive Audit of 50 Batch 3 Reactions and 1000 Batch 4 Reactions", () => {
  it("has exactly 1,181 reactions total with 523 chemicals and 1000 reactions in batch 4", () => {
    expect(batch2.length).toBe(50);
    expect(batch3.length).toBe(50);
    expect(batch4.length).toBe(1000);
    expect(SEED_REACTIONS.length).toBe(1181);
    expect(SEED_CHEMICALS.length).toBe(523);
  });


  describe.each(batch3.map((r, i) => [r.id, r, 132 + i] as const))("%s (#%d)", (id, r, _num) => {
    it("all reactant and product chemical IDs exist in seed chemicals", () => {
      for (const sp of [...r.reactants, ...r.products]) {
        expect(chemMap.has(sp.chemicalId), `Unknown chemical ID: ${sp.chemicalId} in reaction ${id}`).toBe(true);
      }
      if (r.catalystChemicalId) {
        expect(chemMap.has(r.catalystChemicalId)).toBe(true);
      }
    });

    it("has valid element-conservation stoichiometry", () => {
      const toBal = (cid: string) => {
        const c = chemMap.get(cid)!;
        return { label: cid, formula: c.formula, composition: parseFormula(c.formula).composition, charge: c.charge ?? 0 };
      };

      const bal = balanceEquation(
        r.reactants.map((x) => toBal(x.chemicalId)),
        r.products.map((x) => toBal(x.chemicalId))
      );

      const ratios = [
        ...r.reactants.map((x, i) => x.coefficient / (bal.reactantCoefficients[i] as number)),
        ...r.products.map((x, i) => x.coefficient / (bal.productCoefficients[i] as number)),
      ];
      const first = ratios[0] as number;
      for (const ratio of ratios) {
        expect(ratio).toBeCloseTo(first, 5);
      }
    });

    it("equationDisplay mentions every reactant and product formula", () => {
      for (const sp of [...r.reactants, ...r.products]) {
        const chem = chemMap.get(sp.chemicalId)!;
        expect(r.equationDisplay).toContain(chem.formula);
      }
    });

    it("enthalpy sign matches energyClassification", () => {
      if (r.enthalpyKjPerMol !== undefined) {
        if (r.enthalpyKjPerMol < 0) {
          expect(r.energyClassification).toBe("exothermic");
        } else if (r.enthalpyKjPerMol > 0) {
          expect(r.energyClassification).toBe("endothermic");
        }
      }
    });

    it("has observable effects with valid relatedChemicalIds if provided", () => {
      expect(r.observableEffects.length).toBeGreaterThan(0);
      for (const eff of r.observableEffects) {
        expect(eff.description.length).toBeGreaterThan(5);
        if (eff.relatedChemicalId) {
          expect(chemMap.has(eff.relatedChemicalId), `Unknown relatedChemicalId: ${eff.relatedChemicalId}`).toBe(true);
        }
      }
    });

    it("simulates cleanly through simulationService with SUPPORTED tier and accurate calorimetry", () => {
      const inputReactants = r.reactants.map((sp) => ({
        chemicalId: sp.chemicalId,
        amount: 1,
        unit: "mol" as const,
      }));

      // Use a temperature compatible with the reaction's required temperature window
      const simTemp = r.temperatureMinC !== undefined
        ? (r.temperatureMaxC !== undefined ? (r.temperatureMinC + r.temperatureMaxC) / 2 : r.temperatureMinC + 10)
        : 25;

      const sim = simulationService.simulate(inputReactants, {
        temperatureC: simTemp,
        pressureAtm: 1,
        solvent: r.solvent,
      });

      expect(sim.resolution.status).toBe("REACTION");
      expect(sim.resolution.confidenceTier).toBe("SUPPORTED");
      expect(sim.resolution.balancedEquation).toBe(r.equationDisplay);
      expect(sim.stoichiometry!.length).toBeGreaterThanOrEqual(r.reactants.length + r.products.length);

      if (r.enthalpyKjPerMol !== undefined) {
        expect(sim.calorimetry).toBeDefined();
        expect(sim.calorimetry!.enthalpyKjPerMol).toBe(r.enthalpyKjPerMol);
        if (r.enthalpyKjPerMol < 0) {
          expect(sim.calorimetry!.temperatureDeltaC).toBeGreaterThanOrEqual(0);
        } else if (r.enthalpyKjPerMol > 0) {
          expect(sim.calorimetry!.temperatureDeltaC).toBeLessThanOrEqual(0);
        }
      }

      expect(sim.resolution.processBreakdown).toBeDefined();
      expect(sim.resolution.processBreakdown!.dimensions.length).toBeGreaterThanOrEqual(5);
    });
  });

  describe("Batch 4 (1,000 reactions) Comprehensive Audit", () => {
    it("all reactant, product, and catalyst chemical IDs exist in seed chemicals", () => {
      for (const r of batch4) {
        for (const sp of [...r.reactants, ...r.products]) {
          expect(chemMap.has(sp.chemicalId), `Unknown chemical ID: ${sp.chemicalId} in reaction ${r.id}`).toBe(true);
        }
        if (r.catalystChemicalId) {
          expect(chemMap.has(r.catalystChemicalId), `Unknown catalyst ID: ${r.catalystChemicalId} in reaction ${r.id}`).toBe(true);
        }
      }
    });

    it("all 1,000 reactions have valid element-conservation stoichiometry", () => {
      const toBal = (cid: string) => {
        const c = chemMap.get(cid)!;
        return { label: cid, formula: c.formula, composition: parseFormula(c.formula).composition, charge: c.charge ?? 0 };
      };

      for (const r of batch4) {
        const bal = balanceEquation(
          r.reactants.map((x) => toBal(x.chemicalId)),
          r.products.map((x) => toBal(x.chemicalId))
        );

        const ratios = [
          ...r.reactants.map((x, i) => x.coefficient / (bal.reactantCoefficients[i] as number)),
          ...r.products.map((x, i) => x.coefficient / (bal.productCoefficients[i] as number)),
        ];
        const first = ratios[0] as number;
        for (const ratio of ratios) {
          expect(ratio, `Stoichiometry mismatch in ${r.id}`).toBeCloseTo(first, 5);
        }
      }
    });

    it("all 1,000 reactions have equationDisplay mentioning reactant and product formulas", () => {
      for (const r of batch4) {
        for (const sp of [...r.reactants, ...r.products]) {
          const chem = chemMap.get(sp.chemicalId)!;
          expect(r.equationDisplay, `Missing formula ${chem.formula} in ${r.id}`).toContain(chem.formula);
        }
      }
    });

    it("all 1,000 reactions have consistent enthalpy sign and classification", () => {
      for (const r of batch4) {
        if (r.enthalpyKjPerMol !== undefined) {
          if (r.enthalpyKjPerMol < 0) {
            expect(r.energyClassification, `Expected exothermic for ${r.id}`).toBe("exothermic");
          } else if (r.enthalpyKjPerMol > 0) {
            expect(r.energyClassification, `Expected endothermic for ${r.id}`).toBe("endothermic");
          }
        }
      }
    });

    it("all 1,000 reactions have rich observable effects with valid chemical IDs", () => {
      for (const r of batch4) {
        expect(r.observableEffects.length, `No observable effects in ${r.id}`).toBeGreaterThan(0);
        for (const eff of r.observableEffects) {
          expect(eff.description.length, `Description too short in ${r.id}`).toBeGreaterThan(5);
          if (eff.relatedChemicalId) {
            expect(chemMap.has(eff.relatedChemicalId), `Unknown relatedChemicalId: ${eff.relatedChemicalId} in ${r.id}`).toBe(true);
          }
        }
      }
    });

    it("simulates cleanly across representative reactions from all 10 domains", () => {
      // Test every 25th reaction to cover all 10 domains thoroughly and quickly (40 simulations)
      const sampledReactions = batch4.filter((_, idx) => idx % 25 === 0);
      expect(sampledReactions.length).toBe(40);

      for (const r of sampledReactions) {
        const inputReactants = r.reactants.map((sp) => ({
          chemicalId: sp.chemicalId,
          amount: 1,
          unit: "mol" as const,
        }));

        const simTemp = r.temperatureMinC !== undefined
          ? (r.temperatureMaxC !== undefined ? (r.temperatureMinC + r.temperatureMaxC) / 2 : r.temperatureMinC + 10)
          : 25;

        const sim = simulationService.simulate(inputReactants, {
          temperatureC: simTemp,
          pressureAtm: 1,
          solvent: r.solvent,
        });

        expect(sim.resolution.status, `Status for ${r.id}`).toBe("REACTION");
        expect(sim.resolution.confidenceTier, `Confidence tier for ${r.id}`).toBe("SUPPORTED");
        expect(sim.resolution.balancedEquation, `Equation for ${r.id}`).toBe(r.equationDisplay);
        expect(sim.resolution.processBreakdown).toBeDefined();
      }
    });
  });
});

