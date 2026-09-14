import { apiClient } from "./client";
import type { Chemical, ChemicalSummary } from "../types/chemistry";

export const chemicalsApi = {
  search: async (query: string, limit = 12): Promise<{ items: ChemicalSummary[]; total: number }> => {
    const res = await apiClient.get<ChemicalSummary[]>(`/chemicals/search?q=${encodeURIComponent(query)}&limit=${limit}`);
    return { items: res.data, total: res.total ?? res.data.length };
  },
  list: async (limit = 50, offset = 0): Promise<{ items: ChemicalSummary[]; total: number }> => {
    const res = await apiClient.get<ChemicalSummary[]>(`/chemicals?limit=${limit}&offset=${offset}`);
    return { items: res.data, total: res.total ?? res.data.length };
  },
  getById: async (id: string): Promise<Chemical> => {
    const res = await apiClient.get<Chemical>(`/chemicals/${encodeURIComponent(id)}`);
    return res.data;
  },
};
