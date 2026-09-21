import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { AppShell, DEFAULT_RIGHT_WIDTH, MIN_RIGHT_WIDTH } from "./AppShell";

describe("AppShell Layout & Horizontal Resizing", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    window.innerWidth = 1440;
  });

  it("renders left, center, right, and bottom sections with the default 380px width", () => {
    render(
      <AppShell
        left={<div data-testid="left-content">Left Panel</div>}
        center={<div data-testid="center-content">Center Workbench</div>}
        right={<div data-testid="right-content">Right Result Panel</div>}
        bottom={<div data-testid="bottom-content">Bottom Timeline</div>}
        onReset={() => {}}
      />
    );

    expect(screen.getByTestId("left-content")).toBeInTheDocument();
    expect(screen.getByTestId("center-content")).toBeInTheDocument();
    expect(screen.getByTestId("right-content")).toBeInTheDocument();
    expect(screen.getByTestId("bottom-content")).toBeInTheDocument();

    const rightAside = screen.getByTestId("right-content").closest("aside");
    expect(rightAside).toHaveStyle({ width: `${DEFAULT_RIGHT_WIDTH}px` });

    const resizer = screen.getByRole("separator", { name: /resize/i });
    expect(resizer).toBeInTheDocument();
    expect(resizer).toHaveAttribute("aria-valuenow", String(DEFAULT_RIGHT_WIDTH));
  });

  it("expands the right panel horizontally when holding and dragging the resizer to the left", () => {
    render(
      <AppShell
        left={<div>Left</div>}
        center={<div>Center</div>}
        right={<div data-testid="right-content">Right</div>}
        bottom={<div>Bottom</div>}
        onReset={() => {}}
      />
    );

    const resizer = screen.getByRole("separator", { name: /resize/i });
    const rightAside = screen.getByTestId("right-content").closest("aside")!;

    // Initial width is 380px
    expect(rightAside).toHaveStyle({ width: "380px" });

    // Start dragging at x = 800
    fireEvent.mouseDown(resizer, { clientX: 800 });

    // Drag left to x = 650 (delta = +150px expansion)
    fireEvent.mouseMove(window, { clientX: 650 });

    // New width should be 380 + 150 = 530px
    expect(rightAside).toHaveStyle({ width: "530px" });
    expect(resizer).toHaveAttribute("aria-valuenow", "530");

    // Release mouse
    fireEvent.mouseUp(window);
  });

  it("respects minimum width constraint and does not collapse below MIN_RIGHT_WIDTH", () => {
    render(
      <AppShell
        left={<div>Left</div>}
        center={<div>Center</div>}
        right={<div data-testid="right-content">Right</div>}
        bottom={<div>Bottom</div>}
        onReset={() => {}}
      />
    );

    const resizer = screen.getByRole("separator", { name: /resize/i });
    const rightAside = screen.getByTestId("right-content").closest("aside")!;

    // Start drag at x = 800
    fireEvent.mouseDown(resizer, { clientX: 800 });

    // Drag far right to x = 1200 (attempting to shrink below minimum)
    fireEvent.mouseMove(window, { clientX: 1200 });

    // Should clamp to MIN_RIGHT_WIDTH (340px)
    expect(rightAside).toHaveStyle({ width: `${MIN_RIGHT_WIDTH}px` });

    fireEvent.mouseUp(window);
  });

  it("resets back to default width (380px) on double-click", () => {
    render(
      <AppShell
        left={<div>Left</div>}
        center={<div>Center</div>}
        right={<div data-testid="right-content">Right</div>}
        bottom={<div>Bottom</div>}
        onReset={() => {}}
      />
    );

    const resizer = screen.getByRole("separator", { name: /resize/i });
    const rightAside = screen.getByTestId("right-content").closest("aside")!;

    // Drag to expand
    fireEvent.mouseDown(resizer, { clientX: 800 });
    fireEvent.mouseMove(window, { clientX: 600 });
    fireEvent.mouseUp(window);
    expect(rightAside).toHaveStyle({ width: "580px" });

    // Double-click to reset
    fireEvent.doubleClick(resizer);
    expect(rightAside).toHaveStyle({ width: `${DEFAULT_RIGHT_WIDTH}px` });
  });

  it("supports keyboard resizing via arrow keys", () => {
    render(
      <AppShell
        left={<div>Left</div>}
        center={<div>Center</div>}
        right={<div data-testid="right-content">Right</div>}
        bottom={<div>Bottom</div>}
        onReset={() => {}}
      />
    );

    const resizer = screen.getByRole("separator", { name: /resize/i });
    const rightAside = screen.getByTestId("right-content").closest("aside")!;

    // ArrowLeft expands by 20px
    fireEvent.keyDown(resizer, { key: "ArrowLeft" });
    expect(rightAside).toHaveStyle({ width: "400px" });

    // ArrowRight shrinks by 20px
    fireEvent.keyDown(resizer, { key: "ArrowRight" });
    expect(rightAside).toHaveStyle({ width: "380px" });

    // Home resets to default
    fireEvent.keyDown(resizer, { key: "ArrowLeft" });
    fireEvent.keyDown(resizer, { key: "Home" });
    expect(rightAside).toHaveStyle({ width: "380px" });
  });
});
