import { describe, it, expect } from "vitest";
import { computeCalorimetry } from "./calorimetry.js";

describe("computeCalorimetry", () => {
  it("calculates temperature decrease for endothermic potassium nitrate dissolution", () => {
    // 10 g KNO3 (molar mass ~101.1 g/mol) in 100 mL water
    // extent = 10 / 101.1 ~ 0.0989 mol
    // ΔH_soln = +34.89 kJ/mol
    // totalMass = 10 + 100 = 110 g
    // C = 110 * 4.184 = 460.24 J/°C
    // q_rxn = 0.0989 * 34890 = 3450.6 J
    // ΔT = -3450.6 / 460.24 = -7.5 °C
    const result = computeCalorimetry({
      inputs: [
        { chemicalId: "kno3", amount: 10, unit: "g" },
        { chemicalId: "water", amount: 100, unit: "mL" },
      ],
      extentMoles: 0.0989,
      enthalpyKjPerMol: 34.89,
      initialTemperatureC: 25.0,
    });

    expect(result.temperatureDeltaC).toBeLessThan(0);
    expect(result.temperatureDeltaC).toBeCloseTo(-7.5, 0.5);
    expect(result.finalTemperatureC).toBeCloseTo(17.5, 0.5);
    expect(result.summaryText).toContain("Decreased by");
    expect(result.summaryText).toContain("from 25.0 °C to");
  });

  it("calculates temperature increase for exothermic neutralization", () => {
    // 25 mL of 1 M HCl (0.025 mol) + 25 mL of 1 M NaOH (0.025 mol)
    // ΔH = -57.1 kJ/mol
    // totalMass = 50 g
    // C = 50 * 4.184 = 209.2 J/°C
    // q_rxn = 0.025 * (-57100) = -1427.5 J
    // q_soln = +1427.5 J
    // ΔT = +1427.5 / 209.2 ~ +6.8 °C
    const result = computeCalorimetry({
      inputs: [
        { chemicalId: "hcl", amount: 25, unit: "mL" },
        { chemicalId: "naoh", amount: 25, unit: "mL" },
      ],
      extentMoles: 0.025,
      enthalpyKjPerMol: -57.1,
      initialTemperatureC: 25.0,
    });

    expect(result.temperatureDeltaC).toBeGreaterThan(0);
    expect(result.temperatureDeltaC).toBeCloseTo(6.8, 0.5);
    expect(result.finalTemperatureC).toBeCloseTo(31.8, 0.5);
    expect(result.summaryText).toContain("Increased by");
  });

  it("handles solid solute when solvent volume is implicit", () => {
    // 5 g KNO3 without explicit water amount (uses default 50 g solvent)
    const result = computeCalorimetry({
      inputs: [{ chemicalId: "kno3", amount: 5, unit: "g" }],
      extentMoles: 0.0494,
      enthalpyKjPerMol: 34.89,
      initialTemperatureC: 22.0,
    });

    expect(result.temperatureDeltaC).toBeLessThan(0);
    expect(result.finalTemperatureC).toBeLessThan(22.0);
    expect(result.summaryText).toContain("Decreased by");
  });
});
