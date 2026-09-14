import { describe, it, expect } from "vitest";
import { parseFormula } from "./formulaParser.js";
import { computeMolarMass } from "./molarMass.js";

describe("computeMolarMass", () => {
  it("computes water's molar mass correctly", () => {
    const mass = computeMolarMass(parseFormula("H2O").composition);
    expect(mass).toBeCloseTo(18.015, 2);
  });

  it("computes NaCl's molar mass correctly", () => {
    const mass = computeMolarMass(parseFormula("NaCl").composition);
    expect(mass).toBeCloseTo(58.44, 1);
  });

  it("computes a more complex formula (Al2(SO4)3) correctly", () => {
    const mass = computeMolarMass(parseFormula("Al2(SO4)3").composition);
    // 2*26.982 + 3*32.06 + 12*15.999 = 53.964 + 96.18 + 191.988 = 342.132
    expect(mass).toBeCloseTo(342.13, 1);
  });

  it("throws a clear error for an element with no curated atomic mass", () => {
    // "Uup" style symbols are not in ELEMENT_SYMBOLS at all so parsing itself
    // would fail first; instead pick a real recognized-but-uncurated element.
    expect(() => computeMolarMass(parseFormula("NpO2").composition)).toThrow(/No curated data/);
  });
});
