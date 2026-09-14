import type { Chemical } from "../../types/chemistry";
import { formatFormula } from "../../utils/formatFormula";
import "./PropertiesPanel.css";

function Row({ label, value }: { label: string; value?: string | number | null }) {
  if (value === undefined || value === null || value === "") return null;
  return (
    <div className="properties-panel__row">
      <span className="properties-panel__label">{label}</span>
      <span className="properties-panel__value">{value}</span>
    </div>
  );
}

export function PropertiesPanel({ chemical }: { chemical: Chemical }) {
  return (
    <div className="properties-panel">
      <header className="properties-panel__header">
        <h3>{chemical.commonName}</h3>
        <span className="formula properties-panel__formula">{formatFormula(chemical.formula)}</span>
      </header>

      <Row label="IUPAC name" value={chemical.iupacName} />
      <Row label="Molar mass" value={`${chemical.molarMass.toFixed(3)} g/mol`} />
      <Row label="CAS number" value={chemical.casNumber} />
      <Row label="Physical state" value={chemical.physicalState} />
      <Row label="Density" value={chemical.density ? `${chemical.density} g/cm\u00b3` : undefined} />
      <Row label="Melting point" value={chemical.meltingPointC !== undefined ? `${chemical.meltingPointC} \u00b0C` : undefined} />
      <Row label="Boiling point" value={chemical.boilingPointC !== undefined ? `${chemical.boilingPointC} \u00b0C` : undefined} />
      <Row label="Solubility" value={chemical.solubilityNotes} />
      <Row label="Class" value={chemical.chemicalClass.replace(/_/g, " ")} />
      <Row
        label="Acid/base"
        value={chemical.isAcid ? `Acid (${chemical.acidBaseStrength})` : chemical.isBase ? `Base (${chemical.acidBaseStrength})` : undefined}
      />
      <Row label="pKa" value={chemical.pKa} />
      <Row label="pKb" value={chemical.pKb} />

      {chemical.aliases.length > 0 && (
        <div className="properties-panel__row">
          <span className="properties-panel__label">Also known as</span>
          <span className="properties-panel__value">{chemical.aliases.join(", ")}</span>
        </div>
      )}

      {chemical.notes && <p className="properties-panel__notes">{chemical.notes}</p>}

      <footer className="properties-panel__provenance">
        Source: {chemical.provenance.source}
        {chemical.provenance.confidence && ` \u00b7 confidence: ${chemical.provenance.confidence}`}
      </footer>
    </div>
  );
}
