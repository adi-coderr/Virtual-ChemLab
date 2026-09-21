import type { CalorimetryResult, ReactionConditions, ReactionInputSpecies, ReactionResolution, StoichiometryLine } from "../chemistry-engine/types.js";

export type ExperimentActionType = "ADD_CHEMICAL" | "MIX" | "HEAT" | "COOL" | "REMOVE" | "MEASURE" | "RUN_REACTION" | "RESET";

/** The allowlisted set of operations the AI assistant (or any client) may propose; the backend validates every one regardless of origin. */
export const ALLOWED_ACTION_TYPES: ExperimentActionType[] = ["ADD_CHEMICAL", "MIX", "HEAT", "COOL", "REMOVE", "MEASURE", "RUN_REACTION", "RESET"];

export interface ExperimentActionPayload {
  chemicalId?: string;
  amount?: number;
  unit?: ReactionInputSpecies["unit"];
  concentrationMolar?: number;
  containerId?: string;
  targetTemperatureC?: number;
  conditions?: ReactionConditions;
  [key: string]: unknown;
}

export interface ExperimentActionDTO {
  id: number;
  sequence: number;
  actionType: ExperimentActionType;
  payload: ExperimentActionPayload;
  result?: SimulationResultDTO | Record<string, unknown>;
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

export interface SimulationResultDTO {
  resolution: ReactionResolution;
  stoichiometry?: StoichiometryLine[];
  limitingReagentChemicalId?: string;
  calorimetry?: CalorimetryResult;
}

export interface ApiError {
  status: "error";
  code: string;
  message: string;
  details?: Record<string, unknown>;
}
