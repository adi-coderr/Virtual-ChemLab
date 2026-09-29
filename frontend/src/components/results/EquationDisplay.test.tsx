import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { EquationDisplay } from "./EquationDisplay";

describe("EquationDisplay", () => {
  it("renders balanced chemical equation with proper arrows", () => {
    const { container } = render(<EquationDisplay equation="HCl + NaOH → NaCl + H2O" />);
    expect(container.textContent).toContain("HCl");
    expect(container.textContent).toContain("→");
    expect(container.textContent).toContain("NaCl");
  });

  it("normalizes ascii arrow (->) to Unicode chemical arrow (→)", () => {
    const { container } = render(
      <EquationDisplay equation="CrO2Cl2 + 4NaOH -> Na2CrO4 + 2NaCl + 2H2O" />
    );
    expect(container.textContent).toContain("→");
    expect(container.textContent).not.toContain("->");
  });

  it("formats ions, superscripts for charges, and subscripts for atoms", () => {
    const { container } = render(
      <EquationDisplay equation="CrO2Cl2 + 4OH- -> CrO4^2- + 2Cl- + 2H2O" />
    );
    // Charge 2- should be rendered inside <sup>
    const sups = container.querySelectorAll("sup");
    expect(sups.length).toBeGreaterThanOrEqual(3); // OH-, 2-, Cl-
    const supTexts = Array.from(sups).map((s) => s.textContent);
    expect(supTexts).toContain("2-");
    expect(supTexts).toContain("-");

    // Atom count 4 and 2 should be inside <sub>
    const subs = container.querySelectorAll("sub");
    expect(subs.length).toBeGreaterThanOrEqual(2);
  });
});
