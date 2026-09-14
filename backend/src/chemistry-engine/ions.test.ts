import { describe, it, expect } from "vitest";
import { ion, composeNeutralFormula } from "./ions.js";

describe("composeNeutralFormula", () => {
  it("combines a 1+/1- pair with no subscripts (Ag+ + Cl- -> AgCl)", () => {
    const result = composeNeutralFormula(ion("Ag", 1), ion("Cl", -1));
    expect(result.formula).toBe("AgCl");
    expect(result.composition).toEqual({ Ag: 1, Cl: 1 });
  });

  it("puts a subscript on a monatomic anion without parentheses (Pb2+ + I- -> PbI2)", () => {
    const result = composeNeutralFormula(ion("Pb", 2), ion("I", -1));
    expect(result.formula).toBe("PbI2");
    expect(result.composition).toEqual({ Pb: 1, I: 2 });
  });

  it("cross-multiplies unlike charges (Al3+ + SO4^2- -> Al2(SO4)3)", () => {
    const result = composeNeutralFormula(ion("Al", 3), ion("SO4", -2));
    expect(result.formula).toBe("Al2(SO4)3");
    expect(result.composition).toEqual({ Al: 2, S: 3, O: 12 });
  });

  it("reduces to lowest terms rather than leaving Ca2(CO3)2 (Ca2+ + CO3^2- -> CaCO3)", () => {
    const result = composeNeutralFormula(ion("Ca", 2), ion("CO3", -2));
    expect(result.formula).toBe("CaCO3");
    expect(result.composition).toEqual({ Ca: 1, C: 1, O: 3 });
  });

  it("parenthesizes a multi-atom cation when its count is greater than 1 ((NH4)2SO4)", () => {
    const result = composeNeutralFormula(ion("NH4", 1), ion("SO4", -2));
    expect(result.formula).toBe("(NH4)2SO4");
    expect(result.composition).toEqual({ N: 2, H: 8, S: 1, O: 4 });
  });

  it("throws if the cation charge is not positive or the anion charge is not negative", () => {
    expect(() => composeNeutralFormula(ion("Cl", -1), ion("Ag", 1))).toThrow();
  });
});
