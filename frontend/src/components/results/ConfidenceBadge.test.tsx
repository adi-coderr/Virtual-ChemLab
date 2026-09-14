import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ConfidenceBadge } from "./ConfidenceBadge";

describe("ConfidenceBadge", () => {
  it("renders the SUPPORTED tier with its label", () => {
    render(<ConfidenceBadge tier="SUPPORTED" score={0.99} />);
    expect(screen.getByText("Supported")).toBeInTheDocument();
    expect(screen.getByText("99%")).toBeInTheDocument();
  });

  it("renders the PREDICTED tier", () => {
    render(<ConfidenceBadge tier="PREDICTED" />);
    expect(screen.getByText("Predicted")).toBeInTheDocument();
  });

  it("renders the APPROXIMATE tier", () => {
    render(<ConfidenceBadge tier="APPROXIMATE" />);
    expect(screen.getByText("Approximate")).toBeInTheDocument();
  });

  it("renders the UNKNOWN tier without a percentage when score is omitted", () => {
    render(<ConfidenceBadge tier="UNKNOWN" />);
    expect(screen.getByText("Unknown")).toBeInTheDocument();
    expect(screen.queryByText(/%/)).not.toBeInTheDocument();
  });
});
