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
import "./ReactionResultPanel.css";

export function ReactionResultPanel({ result }: { result: SimulationResult }) {
  const { resolution, stoichiometry } = result;
  const [selectedChemical, setSelectedChemical] = useState<Chemical | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

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

  return (
    <div className="reaction-result">
      <div className="reaction-result__headline">
        <ConfidenceBadge tier={resolution.confidenceTier} score={resolution.confidenceScore} />
        {resolution.reactionType && <span className="reaction-result__type">{resolution.reactionType.replace(/_/g, " ")}</span>}
      </div>

      {resolution.balancedEquation ? (
        <EquationDisplay equation={resolution.balancedEquation} />
      ) : (
        <p className="reaction-result__no-equation">{resolution.status === "NO_REACTION" ? "No net reaction occurs." : "No equation available."}</p>
      )}

      <p className="reaction-result__explanation">{resolution.explanation}</p>

      {resolution.warnings.length > 0 && (
        <ul className="reaction-result__warnings">
          {resolution.warnings.map((w, i) => (
            <li key={i}>{w}</li>
          ))}
        </ul>
      )}

      {registeredSpecies.length > 0 && (
        <div className="reaction-result__species-picker">
          {registeredSpecies.map((s) => (
            <button
              key={s.chemicalId}
              className={`reaction-result__species-chip ${s.chemicalId === selectedId ? "is-selected" : ""}`}
              onClick={() => setSelectedId(s.chemicalId)}
            >
              <span className="formula">{formatFormula(s.formula)}</span>
            </button>
          ))}
        </div>
      )}

      <Tabs
        defaultTabId="process"
        tabs={[
          {
            id: "process",
            label: "Process breakdown",
            content: <ProcessBreakdownPanel resolution={resolution} />,
          },
          {
            id: "molecule",
            label: "Molecular structure",
            content: selectedChemical ? (
              <MoleculeViewer chemical={selectedChemical} />
            ) : (
              <p className="reaction-result__placeholder">Select a chemical above to view its 3D molecular structure.</p>
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
            id: "effects",
            label: "Observable effects",
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
            id: "quantities",
            label: "Quantities",
            content: stoichiometry ? <QuantitiesTable lines={stoichiometry} /> : <p className="reaction-result__no-stoich">Quantities not computed for this result.</p>,
          },
        ]}
      />

      {resolution.netIonicEquation && (
        <div className="reaction-result__ionic">
          <span className="reaction-result__ionic-label">Net ionic equation</span>
          <EquationDisplay equation={resolution.netIonicEquation} />
        </div>
      )}
    </div>
  );
}

function QuantitiesTable({ lines }: { lines: NonNullable<SimulationResult["stoichiometry"]> }) {
  return (
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
  );
}
