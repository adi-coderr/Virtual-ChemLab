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
const batch2 = SEED_REACTIONS.slice(81); // the 50 new reactions (indices 81 to 130)

describe("Comprehensive Audit of 50 Newly Added Reactions", () => {
  it("has exactly 50 reactions in batch 2 (total 131)", () => {
    expect(batch2.length).toBe(50);
    expect(SEED_REACTIONS.length).toBe(131);
  });

  describe.each(batch2.map((r, i) => [r.id, r, 82 + i] as const))("%s (#%d)", (id, r, _num) => {
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
});
