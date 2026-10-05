import { apiClient } from "./client";
import type { CuratedReaction, ReactionConditions, ReactionInputSpecies, SimulationResult } from "../types/chemistry";

export interface PredictReactionResponse {
  simulationResult: SimulationResult;
  source: "curated_database" | "ai_predicted";
}

export interface AiStatusResponse {
  serverKeysConfigured: {
    groq: boolean;
    gemini: boolean;
    openai: boolean;
    anthropic: boolean;
  };
  defaultProvider: "groq" | "gemini" | "openai" | "anthropic";
}

export interface TestKeyResponse {
  valid: boolean;
  message: string;
}

export const reactionsApi = {
  list: async (limit = 50, offset = 0, q?: string): Promise<{ items: CuratedReaction[]; total: number }> => {
    const queryParam = q ? `&q=${encodeURIComponent(q)}` : "";
    const res = await apiClient.get<CuratedReaction[]>(`/reactions?limit=${limit}&offset=${offset}${queryParam}`);
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
  predictReaction: async (
    query: string,
    conditions?: ReactionConditions,
    apiKey?: string,
    provider?: "groq" | "gemini" | "openai" | "anthropic"
  ): Promise<PredictReactionResponse> => {
    const res = await apiClient.post<PredictReactionResponse>("/reactions/predict", {
      query,
      conditions,
      apiKey,
      provider,
    });
    return res.data;
  },
  getAiStatus: async (): Promise<AiStatusResponse> => {
    const res = await apiClient.get<AiStatusResponse>("/reactions/ai-status");
    return res.data;
  },
  testApiKey: async (provider: "groq" | "gemini" | "openai" | "anthropic", apiKey: string): Promise<TestKeyResponse> => {
    const res = await apiClient.post<TestKeyResponse>("/reactions/test-key", { provider, apiKey });
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
