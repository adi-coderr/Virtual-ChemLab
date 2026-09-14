import { describe, it, expect } from "vitest";
import { massToGrams, molesFromUnit, volumeToLiters, toMoles } from "./units.js";
import { ChemistryEngineError } from "./types.js";

describe("basic unit conversions", () => {
  it("converts mass units to grams", () => {
    expect(massToGrams(1, "kg")).toBe(1000);
    expect(massToGrams(1000, "mg")).toBe(1);
    expect(massToGrams(5, "g")).toBe(5);
  });

  it("converts moles units", () => {
    expect(molesFromUnit(1000, "mmol")).toBe(1);
    expect(molesFromUnit(2, "mol")).toBe(2);
  });

  it("converts volume units to liters", () => {
    expect(volumeToLiters(1000, "mL")).toBe(1);
    expect(volumeToLiters(0.5, "L")).toBe(0.5);
  });
});

describe("toMoles", () => {
  it("computes moles from mass and molar mass (NaCl)", () => {
    const result = toMoles({ chemicalId: "nacl", amount: 58.44, unit: "g" }, 58.44);
    expect(result.moles).toBeCloseTo(1, 5);
  });

  it("computes moles directly when unit is mol", () => {
    const result = toMoles({ chemicalId: "hcl", amount: 0.5, unit: "mol" }, 36.46);
    expect(result.moles).toBe(0.5);
    expect(result.massGrams).toBeCloseTo(18.23, 2);
  });

  it("computes moles from volume and concentration (100 mL of 0.1 M HCl)", () => {
    const result = toMoles({ chemicalId: "hcl", amount: 100, unit: "mL", concentrationMolar: 0.1 }, 36.46);
    expect(result.moles).toBeCloseTo(0.01, 6);
  });

  it("throws a clear error when volume is given without concentration", () => {
    expect(() => toMoles({ chemicalId: "hcl", amount: 100, unit: "mL" }, 36.46)).toThrow(ChemistryEngineError);
    expect(() => toMoles({ chemicalId: "hcl", amount: 100, unit: "mL" }, 36.46)).toThrow(/without a concentration/);
  });

  it("rejects a non-positive amount", () => {
    expect(() => toMoles({ chemicalId: "hcl", amount: 0, unit: "mol" }, 36.46)).toThrow(ChemistryEngineError);
    expect(() => toMoles({ chemicalId: "hcl", amount: -5, unit: "g" }, 36.46)).toThrow(ChemistryEngineError);
  });
});
