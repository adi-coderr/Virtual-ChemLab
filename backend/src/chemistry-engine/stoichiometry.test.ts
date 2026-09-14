import { describe, it, expect } from "vitest";
import { computeStoichiometry, computePercentageYield } from "./stoichiometry.js";
import { ChemistryEngineError } from "./types.js";

describe("computeStoichiometry", () => {
  it("matches the exact 100 mL of 0.1 M HCl + 100 mL of 0.1 M NaOH example from the spec", () => {
    const result = computeStoichiometry(
      [
        { chemicalId: "hcl", formula: "HCl", commonName: "Hydrochloric acid", coefficient: 1, molarMass: 36.46 },
        { chemicalId: "naoh", formula: "NaOH", commonName: "Sodium hydroxide", coefficient: 1, molarMass: 40.0 },
      ],
      [
        { chemicalId: "nacl", formula: "NaCl", commonName: "Sodium chloride", coefficient: 1, molarMass: 58.44 },
        { chemicalId: "water", formula: "H2O", commonName: "Water", coefficient: 1, molarMass: 18.015 },
      ],
      [
        { chemicalId: "hcl", amount: 100, unit: "mL", concentrationMolar: 0.1 },
        { chemicalId: "naoh", amount: 100, unit: "mL", concentrationMolar: 0.1 },
      ]
    );

    expect(result.extentMoles).toBeCloseTo(0.01, 6);
    // Exactly stoichiometric: neither reactant is left over, both are simultaneously "limiting".
    const hclLine = result.lines.find((l) => l.chemicalId === "hcl")!;
    const naohLine = result.lines.find((l) => l.chemicalId === "naoh")!;
    expect(hclLine.remainingMoles).toBeCloseTo(0, 6);
    expect(naohLine.remainingMoles).toBeCloseTo(0, 6);

    const naclLine = result.lines.find((l) => l.chemicalId === "nacl")!;
    const waterLine = result.lines.find((l) => l.chemicalId === "water")!;
    expect(naclLine.theoreticalYieldMoles).toBeCloseTo(0.01, 6);
    expect(waterLine.theoreticalYieldMoles).toBeCloseTo(0.01, 6);
    expect(naclLine.theoreticalYieldMass).toBeCloseTo(0.01 * 58.44, 6);
  });

  it("correctly identifies the limiting reagent and leftover excess", () => {
    // 1 mol Zn + 0.5 mol CuSO4 -> ZnSO4 + Cu (1:1:1:1) -- CuSO4 should be limiting.
    const result = computeStoichiometry(
      [
        { chemicalId: "zn", formula: "Zn", commonName: "Zinc", coefficient: 1, molarMass: 65.38 },
        { chemicalId: "cuso4", formula: "CuSO4", commonName: "Copper(II) sulfate", coefficient: 1, molarMass: 159.61 },
      ],
      [
        { chemicalId: "znso4", formula: "ZnSO4", commonName: "Zinc sulfate", coefficient: 1, molarMass: 161.44 },
        { chemicalId: "cu", formula: "Cu", commonName: "Copper", coefficient: 1, molarMass: 63.55 },
      ],
      [
        { chemicalId: "zn", amount: 1, unit: "mol" },
        { chemicalId: "cuso4", amount: 0.5, unit: "mol" },
      ]
    );

    expect(result.limitingReagentChemicalId).toBe("cuso4");
    expect(result.extentMoles).toBeCloseTo(0.5, 6);

    const znLine = result.lines.find((l) => l.chemicalId === "zn")!;
    expect(znLine.isLimiting).toBe(false);
    expect(znLine.remainingMoles).toBeCloseTo(0.5, 6);

    const cuLine = result.lines.find((l) => l.chemicalId === "cu")!;
    expect(cuLine.theoreticalYieldMoles).toBeCloseTo(0.5, 6);
  });

  it("handles unequal stoichiometric coefficients correctly (2:1 ratio)", () => {
    // 2 HCl + 1 Mg(OH)2 -> MgCl2 + 2 H2O ; providing 1 mol HCl and 1 mol Mg(OH)2 makes HCl limiting.
    const result = computeStoichiometry(
      [
        { chemicalId: "hcl", formula: "HCl", commonName: "Hydrochloric acid", coefficient: 2, molarMass: 36.46 },
        { chemicalId: "mgoh2", formula: "Mg(OH)2", commonName: "Magnesium hydroxide", coefficient: 1, molarMass: 58.32 },
      ],
      [
        { chemicalId: "mgcl2", formula: "MgCl2", commonName: "Magnesium chloride", coefficient: 1, molarMass: 95.21 },
        { chemicalId: "water", formula: "H2O", commonName: "Water", coefficient: 2, molarMass: 18.015 },
      ],
      [
        { chemicalId: "hcl", amount: 1, unit: "mol" },
        { chemicalId: "mgoh2", amount: 1, unit: "mol" },
      ]
    );
    // HCl: 1 mol / coefficient 2 = 0.5 ratio. Mg(OH)2: 1 mol / coefficient 1 = 1.0 ratio. HCl is limiting.
    expect(result.limitingReagentChemicalId).toBe("hcl");
    expect(result.extentMoles).toBeCloseTo(0.5, 6);
    const waterLine = result.lines.find((l) => l.chemicalId === "water")!;
    expect(waterLine.theoreticalYieldMoles).toBeCloseTo(1.0, 6);
  });

  it("throws a clear error when a required reactant quantity is missing", () => {
    expect(() =>
      computeStoichiometry(
        [
          { chemicalId: "hcl", formula: "HCl", commonName: "Hydrochloric acid", coefficient: 1, molarMass: 36.46 },
          { chemicalId: "naoh", formula: "NaOH", commonName: "Sodium hydroxide", coefficient: 1, molarMass: 40.0 },
        ],
        [],
        [{ chemicalId: "hcl", amount: 1, unit: "mol" }]
      )
    ).toThrow(ChemistryEngineError);
  });
});

describe("computePercentageYield", () => {
  it("computes a percentage yield", () => {
    expect(computePercentageYield(10, 8.5)).toBeCloseTo(85, 6);
  });

  it("rejects a non-positive theoretical yield", () => {
    expect(() => computePercentageYield(0, 5)).toThrow(ChemistryEngineError);
  });
});
