import { describe, it, expect } from "vitest";
import { parseFormula, toFormulaSegments, compositionsEqual } from "./formulaParser.js";
import { ChemistryEngineError } from "./types.js";

describe("parseFormula", () => {
  it("parses a simple diatomic formula", () => {
    const result = parseFormula("H2O");
    expect(result.composition).toEqual({ H: 2, O: 1 });
    expect(result.charge).toBe(0);
  });

  it("parses a formula with no explicit counts", () => {
    expect(parseFormula("NaCl").composition).toEqual({ Na: 1, Cl: 1 });
  });

  it("parses parentheses with a multiplier", () => {
    expect(parseFormula("Ca(OH)2").composition).toEqual({ Ca: 1, O: 2, H: 2 });
  });

  it("parses nested/multiple groups", () => {
    expect(parseFormula("Al2(SO4)3").composition).toEqual({ Al: 2, S: 3, O: 12 });
  });

  it("distinguishes two-letter elements from one-letter + digit sequences", () => {
    // NO3 should be Nitrogen + 3 Oxygen, not "No" (Nobelium) + "3"
    expect(parseFormula("NO3").composition).toEqual({ N: 1, O: 3 });
    // NaCl should use the two-letter symbol Na, not N + a + Cl (a isn't an element)
    expect(parseFormula("NaCl").composition).toEqual({ Na: 1, Cl: 1 });
  });

  it("parses a simple trailing charge", () => {
    const result = parseFormula("Na+");
    expect(result.composition).toEqual({ Na: 1 });
    expect(result.charge).toBe(1);
  });

  it("parses a negative charge with explicit magnitude", () => {
    const result = parseFormula("SO4^2-");
    expect(result.composition).toEqual({ S: 1, O: 4 });
    expect(result.charge).toBe(-2);
  });

  it("requires a caret for a polyatomic ion's multi-magnitude charge, rather than guessing", () => {
    // "CO32-" is genuinely ambiguous: carbonate (CO3, charge 2-) vs. "CO" with a
    // (chemically nonsensical, but not the parser's job to know that) charge of 32-.
    expect(() => parseFormula("CO32-")).toThrow(ChemistryEngineError);
    expect(() => parseFormula("CO32-")).toThrow(/Ambiguous charge notation/);
  });

  it("parses the same polyatomic ion correctly once disambiguated with a caret", () => {
    const result = parseFormula("CO3^2-");
    expect(result.composition).toEqual({ C: 1, O: 3 });
    expect(result.charge).toBe(-2);
  });

  it("parses a multi-magnitude charge on a monatomic ion without needing a caret", () => {
    // Unambiguous: "Fe" is a bare element with no subscript of its own, so the
    // trailing digit can only be the charge.
    const result = parseFormula("Fe3+");
    expect(result.composition).toEqual({ Fe: 1 });
    expect(result.charge).toBe(3);
  });

  it("parses a monatomic anion with multi-magnitude charge (oxide)", () => {
    const result = parseFormula("O2-");
    expect(result.composition).toEqual({ O: 1 });
    expect(result.charge).toBe(-2);
  });

  it("rejects an unrecognized element symbol", () => {
    expect(() => parseFormula("Xz2O")).toThrow(ChemistryEngineError);
  });

  it("rejects mismatched brackets", () => {
    expect(() => parseFormula("Ca(OH2")).toThrow(ChemistryEngineError);
  });

  it("rejects an empty formula", () => {
    expect(() => parseFormula("")).toThrow(ChemistryEngineError);
  });

  it("handles a real organic formula", () => {
    expect(parseFormula("CH3COOH").composition).toEqual({ C: 2, H: 4, O: 2 });
  });

  it("handles a bracketed complex-ion-style formula", () => {
    expect(parseFormula("Pb(NO3)2").composition).toEqual({ Pb: 1, N: 2, O: 6 });
  });
});

describe("toFormulaSegments", () => {
  it("splits letters and digits into alternating segments for subscript rendering", () => {
    expect(toFormulaSegments("Fe2O3")).toEqual([
      { text: "Fe", subscript: false },
      { text: "2", subscript: true },
      { text: "O", subscript: false },
      { text: "3", subscript: true },
    ]);
  });

  it("handles a formula with no digits", () => {
    expect(toFormulaSegments("NaCl")).toEqual([{ text: "NaCl", subscript: false }]);
  });
});

describe("compositionsEqual", () => {
  it("treats zero-count entries as absent", () => {
    expect(compositionsEqual({ H: 2, O: 1, Na: 0 }, { H: 2, O: 1 })).toBe(true);
  });

  it("detects a real difference", () => {
    expect(compositionsEqual({ H: 2, O: 1 }, { H: 2, O: 2 })).toBe(false);
  });
});
