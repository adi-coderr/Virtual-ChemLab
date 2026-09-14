import { apiClient } from "./client";
import type { ExperimentActionType, ExperimentDTO } from "../types/experiment";

export const experimentsApi = {
  create: async (name?: string): Promise<ExperimentDTO> => {
    const res = await apiClient.post<ExperimentDTO>("/experiments", { name });
    return res.data;
  },
  getById: async (id: string): Promise<ExperimentDTO> => {
    const res = await apiClient.get<ExperimentDTO>(`/experiments/${id}`);
    return res.data;
  },
  addAction: async (id: string, actionType: ExperimentActionType, payload: Record<string, unknown>) => {
    const res = await apiClient.post<{ action: unknown; simulationResult?: unknown }>(`/experiments/${id}/actions`, { actionType, payload });
    return res.data;
  },
  reset: async (id: string): Promise<ExperimentDTO> => {
    const res = await apiClient.post<ExperimentDTO>(`/experiments/${id}/reset`);
    return res.data;
  },
};
