import type { JSX } from "react";

/**
 * Renders a chemical formula string as JSX with proper subscripts, superscripts, and phase annotations.
 * Handles:
 * - Subscripts for stoichiometry/atoms: H2O -> H₂O, CrO2Cl2 -> CrO₂Cl₂
 * - Caret charges: CrO4^2- or CrO4^{2-} -> CrO₄²⁻
 * - Trailing ion charges: OH-, Cl-, Na+, Fe3+, SO42- -> OH⁻, Cl⁻, Na⁺, Fe³⁺
 * - Phase annotations: (aq), (s), (l), (g)
 */
export function formatFormula(formula: string): (string | JSX.Element)[] {
  let str = formula.trim();
  // Guard: If it looks like a chemical name (contains 3+ consecutive lowercase letters or spaces), return unchanged
  if (/[a-z]{3,}/.test(str) || /\s/.test(str)) {
    return [formula];
  }
  let phase = "";
  const phaseMatch = str.match(/\s*\(((?:aq|s|l|g|solid|gas|liquid|aqueous))\)$/i);
  if (phaseMatch && phaseMatch[1]) {
    phase = ` (${phaseMatch[1].toLowerCase()})`;
    str = str.slice(0, -phaseMatch[0].length).trim();
  }

  let charge = "";
  const caretMatch = str.match(/\^\{?([0-9]*[+-]|[0-9]+)\}?$/);
  if (caretMatch && caretMatch[1]) {
    charge = caretMatch[1];
    str = str.slice(0, -caretMatch[0].length);
  } else {
    const chargeMatch = str.match(/([0-9]*[+-])$/);
    if (chargeMatch && chargeMatch[1] && str.length > chargeMatch[0].length) {
      charge = chargeMatch[1];
      str = str.slice(0, -chargeMatch[0].length);
    }
  }

  const parts: (string | JSX.Element)[] = [];
  let buffer = "";
  let bufferIsDigit = false;
  let key = 0;

  const flush = () => {
    if (buffer.length === 0) return;
    if (bufferIsDigit) {
      parts.push(<sub key={key++}>{buffer}</sub>);
    } else {
      parts.push(buffer);
    }
    buffer = "";
  };

  for (const ch of str) {
    const isDigit = ch >= "0" && ch <= "9";
    if (buffer.length > 0 && isDigit !== bufferIsDigit) flush();
    buffer += ch;
    bufferIsDigit = isDigit;
  }
  flush();

  if (charge) {
    parts.push(<sup key={key++}>{charge}</sup>);
  }

  if (phase) {
    parts.push(
      <span key={key++} className="formula-phase" style={{ opacity: 0.75, fontSize: "0.85em" }}>
        {phase}
      </span>
    );
  }

  return parts;
}
