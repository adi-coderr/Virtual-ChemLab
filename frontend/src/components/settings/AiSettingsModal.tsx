import { useState } from "react";
import { useSettingsStore, type AiProvider } from "../../state/settingsStore";
import { Button } from "../common/Badge";
import "./AiSettingsModal.css";

const PROVIDERS: { id: AiProvider; name: string; tag: string; description: string; keyUrl: string }[] = [
  {
    id: "groq",
    name: "Groq",
    tag: "Ultra-Fast / Free Tier",
    description: "Lightning-fast inference (300+ tok/s) with Llama 3.3 70B. Generous free tier.",
    keyUrl: "https://console.groq.com/keys",
  },
  {
    id: "gemini",
    name: "Google Gemini",
    tag: "Free Tier / Fast",
    description: "Ultra-fast response times & generous free tier via Google AI Studio.",
    keyUrl: "https://aistudio.google.com/app/apikey",
  },
  {
    id: "openai",
    name: "OpenAI",
    tag: "GPT-4o / mini",
    description: "Industry standard reasoning and chemical formula comprehension.",
    keyUrl: "https://platform.openai.com/api-keys",
  },
  {
    id: "anthropic",
    name: "Anthropic Claude",
    tag: "Claude 3.5",
    description: "Detailed scientific explanations and mechanistic chemistry reasoning.",
    keyUrl: "https://console.anthropic.com/settings/keys",
  },
];

export function AiSettingsModal() {
  const isSettingsOpen = useSettingsStore((s) => s.isSettingsOpen);
  const closeSettings = useSettingsStore((s) => s.closeSettings);
  const provider = useSettingsStore((s) => s.provider);
  const setProvider = useSettingsStore((s) => s.setProvider);
  const apiKey = useSettingsStore((s) => s.apiKey);
  const setApiKey = useSettingsStore((s) => s.setApiKey);
  const serverStatus = useSettingsStore((s) => s.serverStatus);
  const isTesting = useSettingsStore((s) => s.isTesting);
  const testResult = useSettingsStore((s) => s.testResult);
  const testConnection = useSettingsStore((s) => s.testConnection);
  const saveSettings = useSettingsStore((s) => s.saveSettings);
  const clearKey = useSettingsStore((s) => s.clearKey);

  const [tempKey, setTempKey] = useState(apiKey);
  const [showKey, setShowKey] = useState(false);

  if (!isSettingsOpen) return null;

  const currentProviderInfo = PROVIDERS.find((p) => p.id === provider) ?? PROVIDERS[0]!;
  const isServerKeyActive = serverStatus?.serverKeysConfigured?.[provider];

  const handleSave = () => {
    saveSettings(provider, tempKey);
  };

  return (
    <div className="ai-modal-backdrop" onClick={closeSettings}>
      <div className="ai-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="ai-modal-title">
        <div className="ai-modal__header">
          <div className="ai-modal__title-row">
            <span className="ai-modal__sparkle-icon">✨</span>
            <h3 id="ai-modal-title" className="ai-modal__title">AI Chemical Predictor Settings</h3>
          </div>
          <button className="ai-modal__close-btn" onClick={closeSettings} aria-label="Close settings">
            ✕
          </button>
        </div>

        <p className="ai-modal__subtitle">
          Configure an AI API key so that whenever you type or simulate reactions not found in the 4,391 database records, the website dynamically generates full balanced equations, mechanisms, observable effects, and safety data.
        </p>

        {/* Provider Selector Cards */}
        <div className="ai-modal__providers">
          {PROVIDERS.map((p) => {
            const isSelected = p.id === provider;
            const hasServerConfig = serverStatus?.serverKeysConfigured?.[p.id];
            return (
              <button
                key={p.id}
                type="button"
                className={`ai-modal__provider-card ${isSelected ? "ai-modal__provider-card--active" : ""}`}
                onClick={() => setProvider(p.id)}
              >
                <div className="ai-modal__provider-card-header">
                  <span className="ai-modal__provider-name">{p.name}</span>
                  {hasServerConfig && <span className="ai-modal__server-pill">.env Active</span>}
                </div>
                <span className="ai-modal__provider-tag">{p.tag}</span>
                <p className="ai-modal__provider-desc">{p.description}</p>
              </button>
            );
          })}
        </div>

        {/* API Key Input Section */}
        <div className="ai-modal__input-section">
          <div className="ai-modal__label-row">
            <label htmlFor="ai-api-key-input" className="ai-modal__label">
              {currentProviderInfo.name} API Key
            </label>
            <a
              href={currentProviderInfo.keyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ai-modal__key-link"
            >
              Get free key ↗
            </a>
          </div>

          <div className="ai-modal__input-wrapper">
            <input
              id="ai-api-key-input"
              type={showKey ? "text" : "password"}
              className="ai-modal__input"
              placeholder={isServerKeyActive ? `Server key configured in .env (or override here)` : `Paste your ${currentProviderInfo.name} API key here`}
              value={tempKey}
              onChange={(e) => {
                setTempKey(e.target.value);
                setApiKey(e.target.value);
              }}
            />
            <button
              type="button"
              className="ai-modal__show-btn"
              onClick={() => setShowKey(!showKey)}
              aria-label={showKey ? "Hide key" : "Show key"}
            >
              {showKey ? "Hide" : "Show"}
            </button>
          </div>

          {isServerKeyActive && !tempKey && (
            <div className="ai-modal__status-banner ai-modal__status-banner--server">
              <span>✓ A server-side key for <strong>{currentProviderInfo.name}</strong> is detected in <code>backend/.env</code>. You can use it directly or enter a custom key above.</span>
            </div>
          )}

          {/* Test Connection Button & Result */}
          <div className="ai-modal__test-row">
            <Button
              variant="secondary"
              disabled={isTesting || (!tempKey.trim() && !isServerKeyActive)}
              onClick={testConnection}
            >
              {isTesting ? "Testing connection\u2026" : "⚡ Test Key Connection"}
            </Button>
            {tempKey && (
              <button type="button" className="ai-modal__clear-btn" onClick={() => { setTempKey(""); clearKey(); }}>
                Clear Key
              </button>
            )}
          </div>

          {testResult && (
            <div className={`ai-modal__test-result ${testResult.valid ? "ai-modal__test-result--success" : "ai-modal__test-result--error"}`}>
              <span>{testResult.valid ? "✓ " : "✕ "}</span>
              <span>{testResult.message}</span>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="ai-modal__footer">
          <Button variant="secondary" onClick={closeSettings}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save &amp; Enable AI Predictor
          </Button>
        </div>
      </div>
    </div>
  );
}
