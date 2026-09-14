import { describe, it, expect } from "vitest";
import { predictSolubility } from "./solubility.js";
import { ion } from "./ions.js";

describe("predictSolubility", () => {
  it("treats all group-1 cation compounds as soluble regardless of anion", () => {
    expect(predictSolubility(ion("Na", 1), ion("CO3", -2))?.tier).toBe("soluble");
    expect(predictSolubility(ion("K", 1), ion("PO4", -3))?.tier).toBe("soluble");
  });

  it("flags silver and lead halides as insoluble (classic precipitation demos)", () => {
    expect(predictSolubility(ion("Ag", 1), ion("Cl", -1))?.tier).toBe("insoluble");
    expect(predictSolubility(ion("Pb", 2), ion("I", -1))?.tier).toBe("insoluble");
  });

  it("treats other metal halides as soluble", () => {
    expect(predictSolubility(ion("Ca", 2), ion("Cl", -1))?.tier).toBe("soluble");
  });

  it("flags barium sulfate as insoluble (classic gravimetric precipitate)", () => {
    expect(predictSolubility(ion("Ba", 2), ion("SO4", -2))?.tier).toBe("insoluble");
  });

  it("flags calcium sulfate as only slightly soluble, distinct from fully insoluble", () => {
    expect(predictSolubility(ion("Ca", 2), ion("SO4", -2))?.tier).toBe("slightly_soluble");
  });

  it("treats barium hydroxide as soluble but iron hydroxide as insoluble", () => {
    expect(predictSolubility(ion("Ba", 2), ion("OH", -1))?.tier).toBe("soluble");
    expect(predictSolubility(ion("Fe", 2), ion("OH", -1))?.tier).toBe("insoluble");
  });

  it("flags most carbonates as insoluble", () => {
    expect(predictSolubility(ion("Ba", 2), ion("CO3", -2))?.tier).toBe("insoluble");
  });

  it("returns null (no rule) for an anion the table does not cover", () => {
    expect(predictSolubility(ion("Na", 1), ion("Cl", -1))).not.toBeNull(); // sanity: covered case
    expect(predictSolubility(ion("Fe", 3), ion("SiO3", -2))).toBeNull();
  });
});
