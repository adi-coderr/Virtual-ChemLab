import { describe, it, expect } from "vitest";
import { SEED_CHEMICALS } from "./chemicals.js";
import { HAZARDS } from "./hazards.js";
import { parseFormula, compositionsEqual } from "../../chemistry-engine/formulaParser.js";
import { computeMolarMass } from "../../chemistry-engine/molarMass.js";
import { composeNeutralFormula, ion } from "../../chemistry-engine/ions.js";

const hazardCodes = new Set(HAZARDS.map((h) => h.code));

describe("seed chemical data integrity", () => {
  it("has unique ids", () => {
    const ids = SEED_CHEMICALS.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it.each(SEED_CHEMICALS.map((c) => [c.id, c] as const))("%s: formula parses and molar mass is computable", (_id, c) => {
    const parsed = parseFormula(c.formula);
    expect(() => computeMolarMass(parsed.composition)).not.toThrow();
  });

  it.each(SEED_CHEMICALS.map((c) => [c.id, c] as const))("%s: every referenced hazard code exists", (_id, c) => {
    for (const code of c.hazardCodes ?? []) {
      expect(hazardCodes.has(code), `unknown hazard code "${code}" on ${c.id}`).toBe(true);
    }
  });

  it.each(SEED_CHEMICALS.filter((c) => c.structure).map((c) => [c.id, c] as const))(
    "%s: structure's atom composition matches the parsed formula",
    (_id, c) => {
      const parsedComposition = parseFormula(c.formula).composition;
      const structureComposition: Record<string, number> = {};
      for (const atom of c.structure!.atoms) {
        structureComposition[atom.element] = (structureComposition[atom.element] ?? 0) + 1;
      }
      expect(
        compositionsEqual(parsedComposition, structureComposition),
        `${c.id}: formula ${c.formula} = ${JSON.stringify(parsedComposition)} but structure atoms = ${JSON.stringify(structureComposition)}`
      ).toBe(true);
    }
  );

  it.each(SEED_CHEMICALS.filter((c) => c.structure).map((c) => [c.id, c] as const))(
    "%s: structure bond indices are valid and formal charges sum to the compound's net charge",
    (_id, c) => {
      const n = c.structure!.atoms.length;
      for (const bond of c.structure!.bonds) {
        expect(bond.a).toBeGreaterThanOrEqual(0);
        expect(bond.a).toBeLessThan(n);
        expect(bond.b).toBeGreaterThanOrEqual(0);
        expect(bond.b).toBeLessThan(n);
        expect(bond.a).not.toBe(bond.b);
      }
      const totalFormalCharge = c.structure!.atoms.reduce((sum, a) => sum + (a.formalCharge ?? 0), 0);
      expect(totalFormalCharge, `${c.id}: formal charges should sum to ${c.charge ?? 0}`).toBe(c.charge ?? 0);
    }
  );

  it.each(
    SEED_CHEMICALS.filter((c) => c.dissociation && c.id !== "ammonia").map((c) => [c.id, c] as const)
  )("%s: dissociation cation+anion recombine to the compound's own formula composition", (_id, c) => {
    const composed = composeNeutralFormula(
      ion(c.dissociation!.cation.formula, c.dissociation!.cation.charge),
      ion(c.dissociation!.anion.formula, c.dissociation!.anion.charge)
    );
    const parsedComposition = parseFormula(c.formula).composition;
    expect(
      compositionsEqual(composed.composition, parsedComposition),
      `${c.id}: dissociation recombines to ${JSON.stringify(composed.composition)} but formula ${c.formula} is ${JSON.stringify(parsedComposition)}`
    ).toBe(true);
  });

  it("ammonia is a deliberate, documented exception: its dissociation models aqueous ionization (NH3 + H2O -> NH4+ + OH-), not literal self-dissociation, so it recombines to NH4OH rather than NH3", () => {
    const ammonia = SEED_CHEMICALS.find((c) => c.id === "ammonia")!;
    const composed = composeNeutralFormula(
      ion(ammonia.dissociation!.cation.formula, ammonia.dissociation!.cation.charge),
      ion(ammonia.dissociation!.anion.formula, ammonia.dissociation!.anion.charge)
    );
    expect(composed.composition).toEqual({ N: 1, H: 5, O: 1 });
  });

  it.each(SEED_CHEMICALS.filter((c) => c.isElemental).map((c) => [c.id, c] as const))(
    "%s: elemental chemicals have exactly one distinct element",
    (_id, c) => {
      const composition = parseFormula(c.formula).composition;
      expect(Object.keys(composition).length).toBe(1);
    }
  );
});
