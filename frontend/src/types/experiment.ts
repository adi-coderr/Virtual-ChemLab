import type { ReactionConditions, ReactionInputSpecies, SimulationResult, Unit } from "./chemistry";

export type ExperimentActionType = "ADD_CHEMICAL" | "MIX" | "HEAT" | "COOL" | "REMOVE" | "MEASURE" | "RUN_REACTION" | "RESET";

export interface ExperimentActionDTO {
  id: number;
  sequence: number;
  actionType: ExperimentActionType;
  payload: Record<string, unknown>;
  result?: SimulationResult;
  createdAt: string;
}

export interface ExperimentDTO {
  id: string;
  name: string | null;
  createdAt: string;
  updatedAt: string;
  status: "in_progress" | "completed";
  actions: ExperimentActionDTO[];
}

/** Client-side view of "what's in a container right now", built up from ADD_CHEMICAL actions -- distinct from the server's action log, which is the source of truth for replay/history. */
export interface ContainerContent {
  chemicalId: string;
  commonName: string;
  formula: string;
  substanceColor?: string;
  amount: number;
  unit: Unit;
  concentrationMolar?: number;
}

export interface Container {
  id: string;
  name: string;
  equipmentType: EquipmentType;
  contents: ContainerContent[];
  temperatureC: number;
}

export type EquipmentType = "beaker" | "test_tube" | "erlenmeyer_flask" | "graduated_cylinder" | "burette";

export interface EquipmentDefinition {
  type: EquipmentType;
  label: string;
  description: string;
  defaultCapacityMl: number;
}

export interface TimelineEntry {
  id: string;
  timeLabel: string;
  description: string;
  actionType: ExperimentActionType;
}

export type { ReactionConditions, ReactionInputSpecies };
