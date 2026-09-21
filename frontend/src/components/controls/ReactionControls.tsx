import { useEffect, useState } from "react";
import { useLabStore } from "../../state/experimentStore";
import type { ChemicalSummary, CuratedReaction, Unit } from "../../types/chemistry";
import { reactionsApi } from "../../api/reactions";
import { chemicalsApi } from "../../api/chemicals";
import { formatFormula } from "../../utils/formatFormula";
import { Button } from "../common/Badge";
import "./ReactionControls.css";

const UNITS: Unit[] = ["mL", "L", "g", "kg", "mg", "mol", "mmol"];
const VOLUME_UNITS: Unit[] = ["mL", "L"];

export function ReactionControls({ pendingChemical, onAdded }: { pendingChemical: ChemicalSummary | null; onAdded: () => void }) {
  const [amount, setAmount] = useState<number | "">(20);
  const [unit, setUnit] = useState<Unit>("mL");
  const [concentration, setConcentration] = useState<number | "">(0.1);
  const [curatedReactions, setCuratedReactions] = useState<CuratedReaction[]>([]);
  const [selectedReactionId, setSelectedReactionId] = useState<string>("");
  const [loadingPreset, setLoadingPreset] = useState(false);

  const addChemical = useLabStore((s) => s.addChemical);
  const isLoading = useLabStore((s) => s.isLoading);
  const conditions = useLabStore((s) => s.conditions);
  const setConditions = useLabStore((s) => s.setConditions);
  const runReaction = useLabStore((s) => s.runReaction);
  const activeContainer = useLabStore((s) => s.containers.find((c) => c.id === s.activeContainerId));

  useEffect(() => {
    let cancelled = false;
    reactionsApi.list(100).then((res) => {
      if (!cancelled) setCuratedReactions(res.items);
    }).catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const needsConcentration = VOLUME_UNITS.includes(unit);
  const selectedReaction = curatedReactions.find((r) => r.id === selectedReactionId);

  const handleLoadReaction = async (rx: CuratedReaction, autoRun: boolean) => {
    if (!activeContainer) return;
    setLoadingPreset(true);
    try {
      setConditions({
        temperatureC: rx.temperatureMinC !== undefined && rx.temperatureMinC > 25 ? rx.temperatureMinC : 25,
        solvent: rx.solvent ?? "water",
      });

      for (const r of rx.reactants) {
        const chem = await chemicalsApi.getById(r.chemicalId);
        let amt = 20;
        let u: Unit = "mL";
        let conc: number | undefined = 0.1;

        if (chem.physicalState === "gas") {
          amt = r.coefficient || 1;
          u = "mol";
          conc = undefined;
        } else if (chem.physicalState === "solid" && (chem.chemicalClass === "metal" || rx.reactionType === "dissolution")) {
          amt = 2 * (r.coefficient || 1);
          u = "g";
          conc = undefined;
        } else if (chem.id === "water") {
          amt = 50;
          u = "mL";
          conc = undefined;
        } else {
          amt = 20 * (r.coefficient || 1);
          u = "mL";
          conc = 0.1;
        }

        await addChemical(chem, amt, u, conc);
      }

      if (autoRun) {
        await runReaction();
      }
    } finally {
      setLoadingPreset(false);
    }
  };

  return (
    <div className="reaction-controls">
      {curatedReactions.length > 0 && (
        <div className="reaction-controls__presets">
          <p className="reaction-controls__section-title">Example Reactions ({curatedReactions.length})</p>
          <select
            className="reaction-controls__preset-select"
            value={selectedReactionId}
            onChange={(e) => setSelectedReactionId(e.target.value)}
          >
            <option value="">-- Choose a curated reaction --</option>
            {curatedReactions.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>

          {selectedReaction && (
            <div className="reaction-controls__preset-preview">
              <div className="reaction-controls__preset-eq">{selectedReaction.equationDisplay}</div>
              <div className="reaction-controls__preset-tags">
                <span className="reaction-controls__preset-tag">{selectedReaction.reactionType.replace(/_/g, " ")}</span>
                <span className={`reaction-controls__preset-tag reaction-controls__preset-tag--${selectedReaction.energyClassification}`}>
                  {selectedReaction.energyClassification}
                  {selectedReaction.enthalpyKjPerMol !== undefined && ` (${selectedReaction.enthalpyKjPerMol > 0 ? "+" : ""}${selectedReaction.enthalpyKjPerMol} kJ/mol)`}
                </span>
              </div>
              <div className="reaction-controls__preset-buttons">
                <Button
                  variant="secondary"
                  disabled={isLoading || loadingPreset || !activeContainer}
                  onClick={() => handleLoadReaction(selectedReaction, false)}
                >
                  Load to container
                </Button>
                <Button
                  variant="primary"
                  disabled={isLoading || loadingPreset || !activeContainer}
                  onClick={() => handleLoadReaction(selectedReaction, true)}
                >
                  {loadingPreset ? "Loading\u2026" : "Load & React"}
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="reaction-controls__divider" />

      {pendingChemical ? (
        <div className="reaction-controls__add-form">
          <p className="reaction-controls__add-title">
            Add <span className="formula">{formatFormula(pendingChemical.formula)}</span> ({pendingChemical.commonName})
          </p>
          <div className="reaction-controls__row">
            <label>
              Amount
              <input
                type="number"
                min={0}
                step="any"
                value={amount}
                placeholder="Amount"
                onChange={(e) => setAmount(e.target.value === "" ? "" : parseFloat(e.target.value))}
              />
            </label>
            <label>
              Unit
              <select value={unit} onChange={(e) => setUnit(e.target.value as Unit)}>
                {UNITS.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </label>
          </div>
          {needsConcentration && (
            <label className="reaction-controls__conc">
              Concentration (mol/L)
              <input
                type="number"
                min={0}
                step="any"
                value={concentration}
                onChange={(e) => setConcentration(e.target.value === "" ? "" : parseFloat(e.target.value))}
              />
            </label>
          )}
          <Button
            variant="primary"
            disabled={isLoading || amount === "" || amount <= 0 || (needsConcentration && (concentration === "" || concentration <= 0))}
            onClick={async () => {
              if (amount === "" || amount <= 0) return;
              await addChemical(pendingChemical, amount, unit, needsConcentration ? (concentration as number) : undefined);
              onAdded();
            }}
          >
            Add to container
          </Button>
        </div>
      ) : (
        <p className="reaction-controls__hint">Search and select a chemical to add it to the active container.</p>
      )}

      <div className="reaction-controls__divider" />

      <div className="reaction-controls__conditions">
        <p className="reaction-controls__section-title">Conditions</p>
        <label>
          Temperature ({conditions.temperatureC ?? 25}{" \u00b0C)"}
          <input
            type="range"
            min={-20}
            max={250}
            value={conditions.temperatureC ?? 25}
            onChange={(e) => setConditions({ temperatureC: parseFloat(e.target.value) })}
          />
        </label>
        <label>
          Solvent
          <input type="text" value={conditions.solvent ?? ""} onChange={(e) => setConditions({ solvent: e.target.value })} placeholder="water" />
        </label>
      </div>

      <Button variant="primary" disabled={isLoading || !activeContainer || activeContainer.contents.length === 0} onClick={() => runReaction()}>
        {isLoading ? "Running\u2026" : "React"}
      </Button>
    </div>
  );
}
