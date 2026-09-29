import { useEffect, useState } from "react";
import type { SimulationResult } from "../../types/chemistry";
import { chemicalsApi } from "../../api/chemicals";
import type { Chemical } from "../../types/chemistry";
import { ConfidenceBadge } from "./ConfidenceBadge";
import { EquationDisplay } from "./EquationDisplay";
import { ObservableEffectsPanel } from "./ObservableEffectsPanel";
import { PropertiesPanel } from "../properties/PropertiesPanel";
import { SafetyPanel } from "../safety/SafetyPanel";
import { MoleculeViewer } from "../molecule/MoleculeViewer";
import { ProcessBreakdownPanel } from "./ProcessBreakdownPanel";
import { Tabs } from "../common/Tabs";
import { formatFormula } from "../../utils/formatFormula";
import { useSettingsStore } from "../../state/settingsStore";
import "./ReactionResultPanel.css";

export function ReactionResultPanel({ result }: { result: SimulationResult }) {
  const { resolution, stoichiometry } = result;
  const calorimetry = result.calorimetry ?? resolution.calorimetry;
  const [selectedChemical, setSelectedChemical] = useState<Chemical | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const openSettings = useSettingsStore((s) => s.openSettings);

  const registeredSpecies = [...resolution.reactants, ...resolution.products].filter((s) => s.isRegistered);

  useEffect(() => {
    const first = registeredSpecies[0];
    if (first && !selectedId) setSelectedId(first.chemicalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolution]);

  useEffect(() => {
    if (!selectedId) return;
    let cancelled = false;
    chemicalsApi.getById(selectedId).then((c) => {
      if (!cancelled) setSelectedChemical(c);
    });
    return () => {
      cancelled = true;
    };
  }, [selectedId]);

  // Filter out redundant AI engine notes from warnings if already displayed in AI banner
  const displayWarnings = resolution.warnings.filter(
    (w) => !w.toLowerCase().includes("dynamically predicted by")
  );

  return (
    <div className="reaction-result">
      {/* 1. Header with Confidence & Reaction Type */}
      <div className="reaction-result__headline">
        <ConfidenceBadge
          tier={resolution.confidenceTier}
          score={resolution.confidenceScore}
          aiProvider={resolution.aiProvider}
          isAiPredicted={resolution.isAiPredicted}
        />
        {resolution.reactionType && (
          <span className="reaction-result__type">{resolution.reactionType.replace(/_/g, " ")}</span>
        )}
      </div>

      {/* 2. Dynamic AI Prediction Banner */}
      {resolution.isAiPredicted && (
        <div className="reaction-result__ai-banner">
          <span className="reaction-result__ai-badge">✨ Dynamic AI Prediction</span>
          <p className="reaction-result__ai-text">
            This reaction was computed in real time using <strong>{resolution.aiProvider || "the AI engine"}</strong> after checking all 4,391 database records.
          </p>
        </div>
      )}

      {/* 3. Prompt when AI Key is missing for Unsupported Reactions */}
      {resolution.status === "UNSUPPORTED" && (
        <div className="reaction-result__ai-key-prompt">
          <div className="reaction-result__ai-key-prompt-header">
            <span className="reaction-result__ai-key-icon">✨</span>
            <div className="reaction-result__ai-key-prompt-content">
              <strong>Reaction Not in Database — AI Ready</strong>
              <p className="reaction-result__ai-key-prompt-desc">
                This combination is not in our 4,391 curated database. Configure your Groq, Gemini, OpenAI, or Claude key to automatically predict products and energetics.
              </p>
            </div>
          </div>
          <button
            type="button"
            className="reaction-result__open-settings-btn"
            onClick={openSettings}
          >
            Configure AI API Key
          </button>
        </div>
      )}

      {/* 4. Chemical Equation Card (Balanced Equation + Net Ionic Equation) */}
      <div className="reaction-result__equation-card">
        <div className="reaction-result__main-equation">
          {resolution.balancedEquation ? (
            <EquationDisplay equation={resolution.balancedEquation} />
          ) : (
            <p className="reaction-result__no-equation">
              {resolution.status === "NO_REACTION" ? "No net reaction occurs." : "No equation available."}
            </p>
          )}
        </div>

        {resolution.netIonicEquation && (
          <div className="reaction-result__ionic">
            <span className="reaction-result__ionic-label">Net Ionic</span>
            <div className="reaction-result__ionic-display">
              <EquationDisplay equation={resolution.netIonicEquation} />
            </div>
          </div>
        )}
      </div>

      {/* 5. Scientific Explanation */}
      {resolution.explanation && (
        <div className="reaction-result__explanation-box">
          <p className="reaction-result__explanation">{resolution.explanation}</p>
        </div>
      )}

      {/* 6. Calorimetry & Temperature Change Card */}
      {calorimetry && (
        <div
          className={`reaction-result__thermo-card ${
            calorimetry.temperatureDeltaC < 0
              ? "reaction-result__thermo-card--cold"
              : calorimetry.temperatureDeltaC > 0
                ? "reaction-result__thermo-card--warm"
                : "reaction-result__thermo-card--neutral"
          }`}
        >
          <div className="reaction-result__thermo-icon" aria-hidden="true">
            {calorimetry.temperatureDeltaC < 0 ? "❄️" : calorimetry.temperatureDeltaC > 0 ? "🔥" : "🌡️"}
          </div>
          <div className="reaction-result__thermo-info">
            <div className="reaction-result__thermo-title">
              {calorimetry.temperatureDeltaC < 0
                ? `Temperature Decreased by ${Math.abs(calorimetry.temperatureDeltaC).toFixed(1)} °C`
                : calorimetry.temperatureDeltaC > 0
                  ? `Temperature Increased by ${calorimetry.temperatureDeltaC.toFixed(1)} °C`
                  : "No Significant Temperature Change"}
            </div>
            <div className="reaction-result__thermo-details">
              <span>
                <strong>Initial:</strong> {calorimetry.initialTemperatureC.toFixed(1)} °C
              </span>
              <span className="reaction-result__thermo-arrow">→</span>
              <span>
                <strong>Final:</strong> {calorimetry.finalTemperatureC.toFixed(1)} °C
              </span>
              <span className="reaction-result__thermo-sep">•</span>
              <span>
                <strong>ΔH:</strong> {calorimetry.enthalpyKjPerMol > 0 ? "+" : ""}
                {calorimetry.enthalpyKjPerMol} kJ/mol
              </span>
              <span className="reaction-result__thermo-sep">•</span>
              <span>
                <strong>Heat:</strong> {(Math.abs(calorimetry.heatJoules) / 1000).toFixed(2)} kJ{" "}
                {calorimetry.heatJoules > 0 ? "absorbed" : "released"}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 7. Warnings (Real hazard warnings only) */}
      {displayWarnings.length > 0 && (
        <div className="reaction-result__warnings-card">
          <span className="reaction-result__warnings-icon" aria-hidden="true">⚠️</span>
          <ul className="reaction-result__warnings-list">
            {displayWarnings.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </div>
      )}

      {/* 8. Species Selector (if registered chemicals are in reaction) */}
      {registeredSpecies.length > 0 && (
        <div className="reaction-result__species-picker-wrapper">
          <span className="reaction-result__species-picker-title">Substance Details:</span>
          <div className="reaction-result__species-picker">
            {registeredSpecies.map((s) => (
              <button
                key={s.chemicalId}
                type="button"
                className={`reaction-result__species-chip ${s.chemicalId === selectedId ? "is-selected" : ""}`}
                onClick={() => setSelectedId(s.chemicalId)}
                title={s.commonName}
              >
                <span className="formula">{formatFormula(s.formula)}</span>
                <span className="reaction-result__species-chip-name">{s.commonName}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 9. Comprehensive Down Section Tabs: Process, Observations, Safety, Properties, Molecule, Quantities */}
      <div className="reaction-result__bottom-tabs">
        <Tabs
          className="reaction-result__tabs"
          defaultTabId="process"
          tabs={[
            {
              id: "process",
              label: "Process",
              content: <ProcessBreakdownPanel resolution={resolution} />,
            },
            {
              id: "effects",
              label: "Observations",
              content: <ObservableEffectsPanel effects={resolution.observableEffects} />,
            },
            {
              id: "safety",
              label: "Safety",
              content: selectedChemical ? (
                <SafetyPanel hazards={selectedChemical.hazards} safetyNotes={resolution.safetyNotes} />
              ) : (
                <p className="reaction-result__placeholder">Select a chemical above to view safety notes.</p>
              ),
            },
            {
              id: "properties",
              label: "Properties",
              content: selectedChemical ? (
                <PropertiesPanel chemical={selectedChemical} />
              ) : (
                <p className="reaction-result__placeholder">Select a chemical above to view properties.</p>
              ),
            },
            {
              id: "molecule",
              label: "3D Molecule",
              content: selectedChemical ? (
                <MoleculeViewer chemical={selectedChemical} />
              ) : (
                <p className="reaction-result__placeholder">Select a chemical above to view its 3D molecular structure.</p>
              ),
            },
            {
              id: "quantities",
              label: "Quantities",
              content: stoichiometry ? (
                <QuantitiesTable lines={stoichiometry} />
              ) : (
                <p className="reaction-result__no-stoich">Quantities not computed for this result.</p>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}

function QuantitiesTable({ lines }: { lines: NonNullable<SimulationResult["stoichiometry"]> }) {
  return (
    <div className="quantities-table-wrapper">
      <table className="quantities-table">
        <thead>
          <tr>
            <th>Species</th>
            <th>Role</th>
            <th>Input</th>
            <th>Yield / remaining</th>
          </tr>
        </thead>
        <tbody>
          {lines.map((line) => (
            <tr key={line.chemicalId} className={line.isLimiting ? "quantities-table__limiting" : ""}>
              <td className="formula">{formatFormula(line.formula)}</td>
              <td>
                {line.role}
                {line.isLimiting ? " (limiting)" : ""}
              </td>
              <td>{line.inputMoles !== undefined ? `${line.inputMoles.toFixed(4)} mol` : "\u2014"}</td>
              <td>
                {line.theoreticalYieldMoles !== undefined
                  ? `${line.theoreticalYieldMoles.toFixed(4)} mol (${line.theoreticalYieldMass?.toFixed(3)} g)`
                  : line.remainingMoles !== undefined
                    ? `${line.remainingMoles.toFixed(4)} mol left over`
                    : "\u2014"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
