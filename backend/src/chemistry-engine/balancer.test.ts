import { describe, it, expect } from "vitest";
import { balanceEquation, type BalancerSpecies } from "./balancer.js";
import { parseFormula } from "./formulaParser.js";
import { ChemistryEngineError } from "./types.js";

function species(formula: string): BalancerSpecies {
  const parsed = parseFormula(formula);
  return { label: formula, formula, composition: parsed.composition, charge: parsed.charge };
}

describe("balanceEquation", () => {
  it("balances water synthesis (2H2 + O2 -> 2H2O)", () => {
    const result = balanceEquation([species("H2"), species("O2")], [species("H2O")]);
    expect(result.reactantCoefficients).toEqual([2, 1]);
    expect(result.productCoefficients).toEqual([2]);
  });

  it("balances iron rusting exactly as specified in the product brief (4Fe + 3O2 -> 2Fe2O3)", () => {
    const result = balanceEquation([species("Fe"), species("O2")], [species("Fe2O3")]);
    expect(result.reactantCoefficients).toEqual([4, 3]);
    expect(result.productCoefficients).toEqual([2]);
  });

  it("balances propane combustion (C3H8 + 5O2 -> 3CO2 + 4H2O)", () => {
    const result = balanceEquation([species("C3H8"), species("O2")], [species("CO2"), species("H2O")]);
    expect(result.reactantCoefficients).toEqual([1, 5]);
    expect(result.productCoefficients).toEqual([3, 4]);
  });

  it("balances methane combustion (CH4 + 2O2 -> CO2 + 2H2O) matching the seed reaction list", () => {
    const result = balanceEquation([species("CH4"), species("O2")], [species("CO2"), species("H2O")]);
    expect(result.reactantCoefficients).toEqual([1, 2]);
    expect(result.productCoefficients).toEqual([1, 2]);
  });

  it("balances a reaction with a polyatomic ion and larger coefficients (3Ca(OH)2 + 2H3PO4 -> Ca3(PO4)2 + 6H2O)", () => {
    const result = balanceEquation(
      [species("Ca(OH)2"), species("H3PO4")],
      [species("Ca3(PO4)2"), species("H2O")]
    );
    expect(result.reactantCoefficients).toEqual([3, 2]);
    expect(result.productCoefficients).toEqual([1, 6]);
  });

  it("leaves an already-1:1:1:1 double displacement alone (AgNO3 + NaCl -> AgCl + NaNO3)", () => {
    const result = balanceEquation([species("AgNO3"), species("NaCl")], [species("AgCl"), species("NaNO3")]);
    expect(result.reactantCoefficients).toEqual([1, 1]);
    expect(result.productCoefficients).toEqual([1, 1]);
  });

  it("balances a neutralization producing a 1:2:1:2 ratio (HCl + Ca(OH)2 -> CaCl2 + H2O)", () => {
    const result = balanceEquation([species("HCl"), species("Ca(OH)2")], [species("CaCl2"), species("H2O")]);
    expect(result.reactantCoefficients).toEqual([2, 1]);
    expect(result.productCoefficients).toEqual([1, 2]);
  });

  it("balances net charge for an ionic single-displacement half reaction (Fe + Cu2+ -> Fe2+ + Cu)", () => {
    const result = balanceEquation([species("Fe"), species("Cu^2+")], [species("Fe^2+"), species("Cu")]);
    expect(result.reactantCoefficients).toEqual([1, 1]);
    expect(result.productCoefficients).toEqual([1, 1]);
    expect(result.chargeBalanced).toBe(true);
  });

  it("produces a human-readable equation string without a redundant '1' coefficient", () => {
    const result = balanceEquation([species("HCl"), species("NaOH")], [species("NaCl"), species("H2O")]);
    expect(result.balancedEquationText).toBe("HCl + NaOH \u2192 NaCl + H2O");
  });

  it("includes coefficients > 1 in the display string", () => {
    const result = balanceEquation([species("Fe"), species("O2")], [species("Fe2O3")]);
    expect(result.balancedEquationText).toBe("4 Fe + 3 O2 \u2192 2 Fe2O3");
  });

  it("rejects an equation where an element is not conserved", () => {
    expect(() => balanceEquation([species("H2"), species("O2")], [species("NaCl")])).toThrow(ChemistryEngineError);
    expect(() => balanceEquation([species("H2"), species("O2")], [species("NaCl")])).toThrow(
      /cannot be balanced/
    );
  });

  it("rejects a spurious extra reactant that introduces an unmatched element", () => {
    expect(() => balanceEquation([species("H2"), species("O2"), species("CO2")], [species("H2O")])).toThrow(
      /only in reactants/
    );
  });

  it("rejects an equation with no reactants or no products", () => {
    expect(() => balanceEquation([], [species("H2O")])).toThrow(ChemistryEngineError);
    expect(() => balanceEquation([species("H2")], [])).toThrow(ChemistryEngineError);
  });
});
