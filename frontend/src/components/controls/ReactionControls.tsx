import { useState } from "react";
import { useLabStore } from "../../state/experimentStore";
import type { ChemicalSummary, Unit } from "../../types/chemistry";
import { formatFormula } from "../../utils/formatFormula";
import { Button } from "../common/Badge";
import "./ReactionControls.css";

const UNITS: Unit[] = ["mL", "L", "g", "kg", "mg", "mol", "mmol"];
const VOLUME_UNITS: Unit[] = ["mL", "L"];

export function ReactionControls({ pendingChemical, onAdded }: { pendingChemical: ChemicalSummary | null; onAdded: () => void }) {
  const [amount, setAmount] = useState<number | "">(20);
  const [unit, setUnit] = useState<Unit>("mL");
  const [concentration, setConcentration] = useState<number | "">(0.1);
  const addChemical = useLabStore((s) => s.addChemical);
  const isLoading = useLabStore((s) => s.isLoading);

  const conditions = useLabStore((s) => s.conditions);
  const setConditions = useLabStore((s) => s.setConditions);
  const runReaction = useLabStore((s) => s.runReaction);
  const activeContainer = useLabStore((s) => s.containers.find((c) => c.id === s.activeContainerId));

  const needsConcentration = VOLUME_UNITS.includes(unit);

  return (
    <div className="reaction-controls">
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
            max={150}
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
