import { apiClient } from "./client";
import type { ChemrxnReaction, ChemrxnStats, ChemrxnSearchParams } from "../types/chemrxn";
import type { SimulationResult, ReactionConditions } from "../types/chemistry";

export const chemrxnApi = {
  search: async (params: ChemrxnSearchParams = {}): Promise<{ items: ChemrxnReaction[]; total: number }> => {
    const query = new URLSearchParams();
    if (params.q) query.set("q", params.q);
    if (params.year) query.set("year", String(params.year));
    if (params.era) query.set("era", params.era);
    if (params.minYield) query.set("minYield", String(params.minYield));
    if (params.productState) query.set("productState", params.productState);
    if (params.reactant) query.set("reactant", params.reactant);
    if (params.product) query.set("product", params.product);
    if (params.limit) query.set("limit", String(params.limit));
    if (params.offset) query.set("offset", String(params.offset));

    const res = await apiClient.get<ChemrxnReaction[]>(`/chemrxn/reactions?${query.toString()}`);
    return { items: res.data, total: res.total ?? res.data.length };
  },

  getById: async (id: string): Promise<ChemrxnReaction> => {
    const res = await apiClient.get<ChemrxnReaction>(`/chemrxn/reactions/${encodeURIComponent(id)}`);
    return res.data;
  },

  simulate: async (id: string, conditions?: ReactionConditions): Promise<SimulationResult> => {
    const res = await apiClient.post<SimulationResult>(`/chemrxn/simulate/${encodeURIComponent(id)}`, {
      conditions,
    });
    return res.data;
  },

  getStats: async (): Promise<ChemrxnStats> => {
    const res = await apiClient.get<ChemrxnStats>("/chemrxn/stats");
    return res.data;
  },

  ingest: async (data: { year?: number; filePath?: string; maxFiles?: number }) => {
    const res = await apiClient.post<{ status: string; count: number; totalIndexed: number }>("/chemrxn/ingest", data);
    return res.data;
  },
};
