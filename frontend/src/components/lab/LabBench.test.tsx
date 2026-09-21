import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { LabBench } from "./LabBench";
import { useLabStore } from "../../state/experimentStore";

describe("LabBench & ContainerView Auto-Sizing", () => {
  beforeEach(() => {
    useLabStore.setState({
      containers: [
        {
          id: "beaker-1",
          name: "Beaker 1",
          equipmentType: "beaker",
          contents: [],
          temperatureC: 25,
        },
      ],
      activeContainerId: "beaker-1",
    });
  });

  it("renders a single container in the hero tier (centered and large)", () => {
    const { container } = render(<LabBench />);
    const card = container.querySelector(".container-view");
    expect(card).toBeDefined();
    expect(card?.classList.contains("container-view--hero")).toBe(true);
    expect(container.querySelector(".lab-bench--hero")).toBeDefined();
    expect(screen.getByText("1 vessel")).toBeDefined();
  });

  it("auto-adjusts to duo size when a 2nd container is added", () => {
    const { rerender, container } = render(<LabBench />);

    act(() => {
      useLabStore.getState().addEquipment("erlenmeyer_flask");
    });
    rerender(<LabBench />);

    const cards = container.querySelectorAll(".container-view");
    expect(cards.length).toBe(2);
    for (const card of cards) {
      expect(card.classList.contains("container-view--duo")).toBe(true);
    }
    expect(screen.getByText("2 vessels")).toBeDefined();
  });

  it("auto-adjusts to trio size when a 3rd container is added", () => {
    const { rerender, container } = render(<LabBench />);

    act(() => {
      useLabStore.getState().addEquipment("erlenmeyer_flask");
      useLabStore.getState().addEquipment("test_tube");
    });
    rerender(<LabBench />);

    const cards = container.querySelectorAll(".container-view");
    expect(cards.length).toBe(3);
    for (const card of cards) {
      expect(card.classList.contains("container-view--trio")).toBe(true);
    }
    expect(screen.getByText("3 vessels")).toBeDefined();
  });

  it("auto-adjusts to compact size when 5 containers are added", () => {
    const { rerender, container } = render(<LabBench />);

    act(() => {
      useLabStore.getState().addEquipment("erlenmeyer_flask");
      useLabStore.getState().addEquipment("test_tube");
      useLabStore.getState().addEquipment("graduated_cylinder");
      useLabStore.getState().addEquipment("burette");
    });
    rerender(<LabBench />);

    const cards = container.querySelectorAll(".container-view");
    expect(cards.length).toBe(5);
    for (const card of cards) {
      expect(card.classList.contains("container-view--compact")).toBe(true);
    }
    expect(screen.getByText("5 vessels")).toBeDefined();
  });

  it("allows removing a container and automatically enlarages remaining utensils", () => {
    const { rerender, container } = render(<LabBench />);

    act(() => {
      useLabStore.getState().addEquipment("erlenmeyer_flask");
    });
    rerender(<LabBench />);
    expect(container.querySelectorAll(".container-view--duo").length).toBe(2);

    // Click remove button on the second container
    const removeBtns = screen.getAllByRole("button", { name: /remove/i });
    expect(removeBtns.length).toBe(2);
    act(() => {
      fireEvent.click(removeBtns[1]);
    });

    rerender(<LabBench />);
    // Should scale back to hero
    const remainingCards = container.querySelectorAll(".container-view");
    expect(remainingCards.length).toBe(1);
    expect(remainingCards[0].classList.contains("container-view--hero")).toBe(true);
  });
});
