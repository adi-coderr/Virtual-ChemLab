import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProcessBreakdownPanel } from "./ProcessBreakdownPanel";
import type { ReactionResolution } from "../../types/chemistry";

const mockResolution: ReactionResolution = {
  status: "REACTION",
  confidenceTier: "SUPPORTED",
  confidenceScore: 0.99,
  reactionType: "neutralization",
  balancedEquation: "HCl + NaOH → NaCl + H2O",
  reactants: [
    { chemicalId: "hcl", formula: "HCl", commonName: "Hydrochloric acid", role: "reactant", coefficient: 1, isRegistered: true },
    { chemicalId: "naoh", formula: "NaOH", commonName: "Sodium hydroxide", role: "reactant", coefficient: 1, isRegistered: true },
  ],
  products: [
    { chemicalId: "nacl", formula: "NaCl", commonName: "Sodium chloride", role: "product", coefficient: 1, isRegistered: true },
    { chemicalId: "water", formula: "H2O", commonName: "Water", role: "product", coefficient: 1, isRegistered: true },
  ],
  observableEffects: [{ type: "temperature_increase", description: "Heat released" }],
  energyClassification: "exothermic",
  explanation: "Exothermic acid-base neutralization.",
  ruleApplied: "rule:acid_base",
  warnings: [],
};

describe("ProcessBreakdownPanel", () => {
  it("renders the comprehensive explanation title and master statement", () => {
    render(<ProcessBreakdownPanel resolution={mockResolution} />);
    expect(screen.getByText("Explaining Every Change Involved in This Chemistry Process")).toBeInTheDocument();
    expect(screen.getByText(/When two chemicals react, their atoms are rearranged/)).toBeInTheDocument();
  });

  it("renders dimension cards for all fundamental chemistry changes", () => {
    render(<ProcessBreakdownPanel resolution={mockResolution} />);
    expect(screen.getByText("Atomic Rearrangement & Chemical Bonding")).toBeInTheDocument();
    expect(screen.getByText("Concentrations & Reaction Progress")).toBeInTheDocument();
    expect(screen.getByText("Physical & Chemical Property Transformations")).toBeInTheDocument();
    expect(screen.getByText("Macroscopic Sensory Observations")).toBeInTheDocument();
    expect(screen.getByText("Thermodynamics & Energetics")).toBeInTheDocument();
    expect(screen.getByText("Fundamental Conservation Principles")).toBeInTheDocument();
  });
});
