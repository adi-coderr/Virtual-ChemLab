import { create } from "zustand";
import { reactionsApi, type AiStatusResponse } from "../api/reactions";

export type AiProvider = "gemini" | "openai" | "anthropic";

interface SettingsState {
  isSettingsOpen: boolean;
  provider: AiProvider;
  apiKey: string;
  serverStatus: AiStatusResponse | null;
  isTesting: boolean;
  testResult: { valid: boolean; message: string } | null;

  openSettings: () => void;
  closeSettings: () => void;
  setProvider: (provider: AiProvider) => void;
  setApiKey: (key: string) => void;
  loadSettings: () => Promise<void>;
  saveSettings: (provider: AiProvider, apiKey: string) => void;
  testConnection: () => Promise<void>;
  clearKey: () => void;
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  isSettingsOpen: false,
  provider: (localStorage.getItem("chemlab_ai_provider") as AiProvider) || "gemini",
  apiKey: localStorage.getItem("chemlab_ai_key") || "",
  serverStatus: null,
  isTesting: false,
  testResult: null,

  openSettings: () => set({ isSettingsOpen: true, testResult: null }),
  closeSettings: () => set({ isSettingsOpen: false, testResult: null }),

  setProvider: (provider) => {
    set({ provider, testResult: null });
    localStorage.setItem("chemlab_ai_provider", provider);
  },

  setApiKey: (apiKey) => {
    set({ apiKey, testResult: null });
  },

  loadSettings: async () => {
    try {
      const serverStatus = await reactionsApi.getAiStatus();
      set({ serverStatus });
      if (!localStorage.getItem("chemlab_ai_provider") && serverStatus.defaultProvider) {
        set({ provider: serverStatus.defaultProvider });
      }
    } catch {
      // server status load optional
    }
  },

  saveSettings: (provider, apiKey) => {
    localStorage.setItem("chemlab_ai_provider", provider);
    localStorage.setItem("chemlab_ai_key", apiKey.trim());
    set({ provider, apiKey: apiKey.trim(), isSettingsOpen: false });
  },

  testConnection: async () => {
    const { provider, apiKey } = get();
    if (!apiKey.trim()) {
      set({ testResult: { valid: false, message: "Please enter an API key first." } });
      return;
    }
    set({ isTesting: true, testResult: null });
    try {
      const res = await reactionsApi.testApiKey(provider, apiKey.trim());
      set({ isTesting: false, testResult: res });
    } catch (err: any) {
      set({ isTesting: false, testResult: { valid: false, message: err.message || "Failed to reach server" } });
    }
  },

  clearKey: () => {
    localStorage.removeItem("chemlab_ai_key");
    set({ apiKey: "", testResult: null });
  },
}));
