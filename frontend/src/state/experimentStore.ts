import { create } from "zustand";
import { experimentsApi } from "../api/experiments";
import type { ChemicalSummary, ReactionConditions, SimulationResult, Unit } from "../types/chemistry";
import type { Container, ContainerContent, EquipmentType, TimelineEntry } from "../types/experiment";

function makeId(): string {
  return Math.random().toString(36).slice(2, 10);
}

function defaultContainerName(type: EquipmentType, index: number): string {
  const labels: Record<EquipmentType, string> = {
    beaker: "Beaker",
    test_tube: "Test tube",
    erlenmeyer_flask: "Erlenmeyer flask",
    graduated_cylinder: "Graduated cylinder",
    burette: "Burette",
  };
  return `${labels[type]} ${index}`;
}

function timeLabel(startedAt: number): string {
  const elapsedSeconds = Math.max(0, Math.round((Date.now() - startedAt) / 1000));
  const mm = Math.floor(elapsedSeconds / 60)
    .toString()
    .padStart(2, "0");
  const ss = (elapsedSeconds % 60).toString().padStart(2, "0");
  return `${mm}:${ss}`;
}

interface LabState {
  experimentId: string | null;
  experimentStartedAt: number;
  containers: Container[];
  activeContainerId: string | null;
  lastSimulationResult: SimulationResult | null;
  lastReactionContainerId: string | null;
  timeline: TimelineEntry[];
  history: { containers: Container[]; timeline: TimelineEntry[] }[];
  conditions: ReactionConditions;
  isLoading: boolean;
  error: string | null;

  initExperiment: () => Promise<void>;
  addEquipment: (type: EquipmentType) => void;
  setActiveContainer: (id: string) => void;
  addChemical: (chemical: ChemicalSummary, amount: number, unit: Unit, concentrationMolar?: number) => Promise<void>;
  removeContent: (containerId: string, chemicalId: string) => void;
  pourInto: (sourceId: string, targetId: string) => void;
  heat: (targetTemperatureC: number) => Promise<void>;
  cool: (targetTemperatureC: number) => Promise<void>;
  setConditions: (conditions: ReactionConditions) => void;
  runReaction: () => Promise<void>;
  resetExperiment: () => Promise<void>;
  undo: () => void;
  clearError: () => void;
}

function snapshot(state: LabState) {
  return { containers: state.containers.map((c) => ({ ...c, contents: [...c.contents] })), timeline: [...state.timeline] };
}

function consolidateContents(contents: ContainerContent[]): ContainerContent[] {
  const map = new Map<string, ContainerContent>();
  for (const item of contents) {
    const existing = map.get(item.chemicalId);
    if (!existing) {
      map.set(item.chemicalId, { ...item });
      continue;
    }
    if (existing.unit === item.unit) {
      if ((existing.unit === "mL" || existing.unit === "L") && existing.concentrationMolar && item.concentrationMolar) {
        const totalVolume = existing.amount + item.amount;
        const totalMoles = existing.amount * existing.concentrationMolar + item.amount * item.concentrationMolar;
        existing.amount = totalVolume;
        existing.concentrationMolar = totalVolume > 0 ? totalMoles / totalVolume : existing.concentrationMolar;
      } else {
        existing.amount += item.amount;
      }
    } else if ((existing.unit === "mL" && item.unit === "L") || (existing.unit === "L" && item.unit === "mL")) {
      const existingML = existing.unit === "mL" ? existing.amount : existing.amount * 1000;
      const itemML = item.unit === "mL" ? item.amount : item.amount * 1000;
      const totalML = existingML + itemML;
      if (existing.concentrationMolar && item.concentrationMolar) {
        const totalMoles = existingML * existing.concentrationMolar + itemML * item.concentrationMolar;
        existing.concentrationMolar = totalML > 0 ? totalMoles / totalML : existing.concentrationMolar;
      }
      existing.unit = "mL";
      existing.amount = totalML;
    } else {
      existing.amount += item.amount;
    }
  }
  return Array.from(map.values());
}

export const useLabStore = create<LabState>((set, get) => ({
  experimentId: null,
  experimentStartedAt: Date.now(),
  containers: [],
  activeContainerId: null,
  lastSimulationResult: null,
  lastReactionContainerId: null,
  timeline: [],
  history: [],
  conditions: { temperatureC: 25, solvent: "water" },
  isLoading: false,
  error: null,

  initExperiment: async () => {
    set({ isLoading: true, error: null });
    try {
      const experiment = await experimentsApi.create("Untitled experiment");
      const defaultContainer: Container = {
        id: makeId(),
        name: defaultContainerName("beaker", 1),
        equipmentType: "beaker",
        contents: [],
        temperatureC: 25,
      };
      set({
        experimentId: experiment.id,
        experimentStartedAt: Date.now(),
        containers: [defaultContainer],
        activeContainerId: defaultContainer.id,
        timeline: [],
        history: [],
        lastSimulationResult: null,
        isLoading: false,
      });
    } catch (err) {
      set({ isLoading: false, error: err instanceof Error ? err.message : "Failed to start experiment" });
    }
  },

  addEquipment: (type) => {
    set((state) => {
      const count = state.containers.filter((c) => c.equipmentType === type).length + 1;
      const container: Container = {
        id: makeId(),
        name: defaultContainerName(type, count),
        equipmentType: type,
        contents: [],
        temperatureC: 25,
      };
      return {
        history: [...state.history, snapshot(state)],
        containers: [...state.containers, container],
        activeContainerId: container.id,
      };
    });
  },

  setActiveContainer: (id) => set({ activeContainerId: id }),

  addChemical: async (chemical, amount, unit, concentrationMolar) => {
    const state = get();
    if (!state.experimentId || !state.activeContainerId) return;
    set({ isLoading: true, error: null });
    try {
      await experimentsApi.addAction(state.experimentId, "ADD_CHEMICAL", {
        chemicalId: chemical.id,
        amount,
        unit,
        concentrationMolar,
        containerId: state.activeContainerId,
      });
      set((s) => {
        const content: ContainerContent = {
          chemicalId: chemical.id,
          commonName: chemical.commonName,
          formula: chemical.formula,
          substanceColor: chemical.substanceColor,
          amount,
          unit,
          concentrationMolar,
        };
        const containers = s.containers.map((c) =>
          c.id === s.activeContainerId ? { ...c, contents: consolidateContents([...c.contents, content]) } : c
        );
        const entry: TimelineEntry = {
          id: makeId(),
          timeLabel: timeLabel(s.experimentStartedAt),
          description: `Added ${amount} ${unit} of ${chemical.commonName} (${chemical.formula})`,
          actionType: "ADD_CHEMICAL",
        };
        return { history: [...s.history, snapshot(s)], containers, timeline: [...s.timeline, entry], isLoading: false };
      });
    } catch (err) {
      set({ isLoading: false, error: err instanceof Error ? err.message : "Failed to add chemical" });
    }
  },

  removeContent: (containerId, chemicalId) => {
    set((s) => {
      const container = s.containers.find((c) => c.id === containerId);
      const removed = container?.contents.find((c) => c.chemicalId === chemicalId);
      const containers = s.containers.map((c) => (c.id === containerId ? { ...c, contents: c.contents.filter((x) => x.chemicalId !== chemicalId) } : c));
      const entry: TimelineEntry | null = removed
        ? { id: makeId(), timeLabel: timeLabel(s.experimentStartedAt), description: `Removed ${removed.commonName}`, actionType: "REMOVE" }
        : null;
      return { history: [...s.history, snapshot(s)], containers, timeline: entry ? [...s.timeline, entry] : s.timeline };
    });
  },

  pourInto: (sourceId, targetId) => {
    set((s) => {
      const source = s.containers.find((c) => c.id === sourceId);
      if (!source || source.contents.length === 0) return {};
      const target = s.containers.find((c) => c.id === targetId);
      const mergedContents = target ? consolidateContents([...target.contents, ...source.contents]) : source.contents;
      const containers = s.containers.map((c) => {
        if (c.id === sourceId) return { ...c, contents: [] };
        if (c.id === targetId) return { ...c, contents: mergedContents };
        return c;
      });
      const entry: TimelineEntry = {
        id: makeId(),
        timeLabel: timeLabel(s.experimentStartedAt),
        description: `Poured ${source.name} into ${target?.name ?? "container"}`,
        actionType: "MIX",
      };
      return { history: [...s.history, snapshot(s)], containers, timeline: [...s.timeline, entry], activeContainerId: targetId };
    });
  },

  heat: async (targetTemperatureC) => {
    const state = get();
    if (!state.experimentId || !state.activeContainerId) return;
    await experimentsApi.addAction(state.experimentId, "HEAT", { targetTemperatureC, containerId: state.activeContainerId });
    set((s) => {
      const containers = s.containers.map((c) => (c.id === s.activeContainerId ? { ...c, temperatureC: targetTemperatureC } : c));
      const entry: TimelineEntry = { id: makeId(), timeLabel: timeLabel(s.experimentStartedAt), description: `Heated to ${targetTemperatureC} \u00b0C`, actionType: "HEAT" };
      return { history: [...s.history, snapshot(s)], containers, timeline: [...s.timeline, entry], conditions: { ...s.conditions, temperatureC: targetTemperatureC } };
    });
  },

  cool: async (targetTemperatureC) => {
    const state = get();
    if (!state.experimentId || !state.activeContainerId) return;
    await experimentsApi.addAction(state.experimentId, "COOL", { targetTemperatureC, containerId: state.activeContainerId });
    set((s) => {
      const containers = s.containers.map((c) => (c.id === s.activeContainerId ? { ...c, temperatureC: targetTemperatureC } : c));
      const entry: TimelineEntry = { id: makeId(), timeLabel: timeLabel(s.experimentStartedAt), description: `Cooled to ${targetTemperatureC} \u00b0C`, actionType: "COOL" };
      return { history: [...s.history, snapshot(s)], containers, timeline: [...s.timeline, entry], conditions: { ...s.conditions, temperatureC: targetTemperatureC } };
    });
  },

  setConditions: (conditions) => set((s) => ({ conditions: { ...s.conditions, ...conditions } })),

  runReaction: async () => {
    const state = get();
    const container = state.containers.find((c) => c.id === state.activeContainerId);
    if (!state.experimentId || !container || container.contents.length === 0) {
      set({ error: "Add at least one chemical to the active container before running a reaction." });
      return;
    }
    set({ isLoading: true, error: null });
    try {
      const consolidated = consolidateContents(container.contents);
      const reactants = consolidated.map((c) => ({
        chemicalId: c.chemicalId,
        amount: c.amount,
        unit: c.unit,
        concentrationMolar: c.concentrationMolar,
      }));
      const { simulationResult } = (await experimentsApi.addAction(state.experimentId, "RUN_REACTION", {
        reactants,
        conditions: state.conditions,
      })) as { simulationResult: SimulationResult };

      set((s) => {
        const resolution = simulationResult.resolution;
        let containers = s.containers;
        if (resolution.status === "REACTION") {
          const stoichByChemicalId = new Map((simulationResult.stoichiometry ?? []).map((line) => [line.chemicalId, line]));
          const productContents: ContainerContent[] = resolution.products
            .map((p) => {
              const line = stoichByChemicalId.get(p.chemicalId);
              const mass = line?.theoreticalYieldMass ?? 0;
              return {
                chemicalId: p.chemicalId,
                commonName: p.commonName,
                formula: p.formula,
                amount: mass > 0 ? parseFloat(mass.toFixed(4)) : 0.1,
                unit: "g" as Unit,
              };
            })
            .filter((c) => c.amount > 0);

          // Keep any unreacted excess reactants (where remainingMass > 0.001)
          const excessReactants: ContainerContent[] = (simulationResult.stoichiometry ?? [])
            .filter((line) => line.role === "reactant" && (line.remainingMass ?? 0) > 0.001)
            .map((line) => ({
              chemicalId: line.chemicalId,
              commonName: line.commonName,
              formula: line.formula,
              amount: parseFloat((line.remainingMass ?? 0).toFixed(4)),
              unit: "g" as Unit,
            }));

          // Keep spectators (any chemical in container not involved in reaction)
          const activeIds = new Set([
            ...resolution.reactants.map((r) => r.chemicalId),
            ...resolution.products.map((p) => p.chemicalId),
          ]);
          const spectators = container.contents.filter((c) => !activeIds.has(c.chemicalId));

          const newContents = consolidateContents([...productContents, ...excessReactants, ...spectators]);
          containers = s.containers.map((c) => (c.id === container.id ? { ...c, contents: newContents } : c));
        }
        const entry: TimelineEntry = {
          id: makeId(),
          timeLabel: timeLabel(s.experimentStartedAt),
          description:
            resolution.status === "REACTION"
              ? `Reaction detected (${resolution.confidenceTier.toLowerCase()}): ${resolution.balancedEquation ?? ""}`
              : resolution.status === "NO_REACTION"
                ? "No reaction detected under these conditions."
                : "Reaction not confidently supported.",
          actionType: "RUN_REACTION",
        };
        return {
          history: [...s.history, snapshot(s)],
          containers,
          timeline: [...s.timeline, entry],
          lastSimulationResult: simulationResult,
          lastReactionContainerId: container.id,
          isLoading: false,
        };
      });
    } catch (err) {
      set({ isLoading: false, error: err instanceof Error ? err.message : "Failed to run reaction" });
    }
  },

  resetExperiment: async () => {
    const state = get();
    if (!state.experimentId) return;
    set({ isLoading: true, error: null });
    try {
      await experimentsApi.reset(state.experimentId);
      const defaultContainer: Container = { id: makeId(), name: defaultContainerName("beaker", 1), equipmentType: "beaker", contents: [], temperatureC: 25 };
      set({
        containers: [defaultContainer],
        activeContainerId: defaultContainer.id,
        timeline: [],
        history: [],
        lastSimulationResult: null,
        lastReactionContainerId: null,
        experimentStartedAt: Date.now(),
        isLoading: false,
      });
    } catch (err) {
      set({ isLoading: false, error: err instanceof Error ? err.message : "Failed to reset experiment" });
    }
  },

  undo: () => {
    set((s) => {
      if (s.history.length === 0) return {};
      const previous = s.history[s.history.length - 1]!;
      return { containers: previous.containers, timeline: previous.timeline, history: s.history.slice(0, -1) };
    });
  },

  clearError: () => set({ error: null }),
}));
