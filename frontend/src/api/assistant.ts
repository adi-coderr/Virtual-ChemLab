import { apiClient } from "./client";

export interface AssistantResponseItem {
  kind: "proposed_action" | "answer" | "clarification_needed";
  actionType?: string;
  payload?: Record<string, unknown>;
  matchedChemical?: { id: string; commonName: string; formula: string };
  text: string;
}

export const assistantApi = {
  parse: async (text: string, experimentId?: string): Promise<AssistantResponseItem[]> => {
    const res = await apiClient.post<AssistantResponseItem[]>("/assistant/parse", { text, experimentId });
    return res.data;
  },
};
