import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ObservableEffectsPanel } from "./ObservableEffectsPanel";

describe("ObservableEffectsPanel", () => {
  it("renders empty message when effects list is empty", () => {
    render(<ObservableEffectsPanel effects={[]} />);
    expect(screen.getByText(/No specific observable effects/i)).toBeInTheDocument();
  });

  it("renders temperature decrease effect with quantitative delta badge and description", () => {
    render(
      <ObservableEffectsPanel
        effects={[
          {
            type: "temperature_decrease",
            description:
              "Temperature decreased by 7.5 °C (from 25.0 °C to 17.5 °C). Noticeable drop in temperature; dissolution of potassium nitrate is strongly endothermic.",
            temperatureDeltaC: -7.5,
            initialTemperatureC: 25.0,
            finalTemperatureC: 17.5,
          },
        ]}
      />
    );

    expect(screen.getByText("temperature decrease")).toBeInTheDocument();
    expect(screen.getAllByText(/Decreased by 7\.5 °C/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/25\.0 °C → 17\.5 °C/i)).toBeInTheDocument();
    expect(screen.getByText(/dissolution of potassium nitrate is strongly endothermic/i)).toBeInTheDocument();
  });

  it("renders temperature increase effect with delta badge", () => {
    render(
      <ObservableEffectsPanel
        effects={[
          {
            type: "temperature_increase",
            description: "Temperature increased by 6.8 °C (from 25.0 °C to 31.8 °C). Strong neutralization is exothermic.",
            temperatureDeltaC: 6.8,
            initialTemperatureC: 25.0,
            finalTemperatureC: 31.8,
          },
        ]}
      />
    );

    expect(screen.getByText("temperature increase")).toBeInTheDocument();
    expect(screen.getAllByText(/Increased by 6\.8 °C/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/25\.0 °C → 31\.8 °C/i)).toBeInTheDocument();
  });
});
