import { apiClient } from "./client";
import type { ReactionConditions, ReactionInputSpecies, SimulationResult } from "../types/chemistry";

export const reactionsApi = {
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
