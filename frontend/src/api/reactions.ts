import { apiClient } from "./client";
import type { CuratedReaction, ReactionConditions, ReactionInputSpecies, SimulationResult } from "../types/chemistry";

export const reactionsApi = {
  list: async (limit = 50, offset = 0): Promise<{ items: CuratedReaction[]; total: number }> => {
    const res = await apiClient.get<CuratedReaction[]>(`/reactions?limit=${limit}&offset=${offset}`);
    return { items: res.data, total: res.total ?? res.data.length };
  },
  getById: async (id: string): Promise<CuratedReaction> => {
    const res = await apiClient.get<CuratedReaction>(`/reactions/${encodeURIComponent(id)}`);
    return res.data;
  },
  simulate: async (reactants: ReactionInputSpecies[], conditions?: ReactionConditions): Promise<SimulationResult> => {
    const res = await apiClient.post<SimulationResult>("/reactions/simulate", { reactants, conditions });
    return res.data;
  },
  balance: async (reactants: string[], products: string[]) => {
    const res = await apiClient.post<{ balancedEquationText: string; reactantCoefficients: number[]; productCoefficients: number[]; warnings: string[] }>(
      "/reactions/balance",
      { reactants, products }
    );
    return res.data;
  },
};
