import type { JSX } from "react";
import { formatFormula } from "../../utils/formatFormula";
import "./EquationDisplay.css";

/** Splits chemical equations into formatted reactants, arrows, and products with proper chemical notation */
export function EquationDisplay({ equation }: { equation: string }) {
  // Normalize various arrow representations into standard Unicode chemical arrows
  const normalized = equation
    .replace(/\s*(?:<=>|<->|⇌)\s*/g, " ⇌ ")
    .replace(/\s*(?:->|-->|=>|→)\s*/g, " → ");

  const isEquilibrium = normalized.includes("⇌");
  const arrowSymbol = isEquilibrium ? "⇌" : "→";
  const sides = normalized.split(arrowSymbol);

  return (
    <div className="equation-display formula">
      {sides.map((side, sideIndex) => (
        <span key={sideIndex} className="equation-display__side">
          {sideIndex > 0 && (
            <span className="equation-display__arrow" aria-label="yields">
              {arrowSymbol}
            </span>
          )}
          {side
            .trim()
            .split("+")
            .map((term, i, arr) => (
              <span key={i} className="equation-display__term">
                {formatTerm(term.trim())}
                {i < arr.length - 1 && <span className="equation-display__plus">+</span>}
              </span>
            ))}
        </span>
      ))}
    </div>
  );
}

function formatTerm(term: string): JSX.Element {
  // Matches leading integer stoichiometric coefficient e.g. "4 NaOH", "4NaOH", "2H2O"
  const match = term.match(/^(\d+)\s*(.*)$/);
  if (match && match[2]) {
    return (
      <>
        <span className="equation-display__coefficient">{match[1]}</span>
        {formatFormula(match[2] as string)}
      </>
    );
  }
  return <>{formatFormula(term)}</>;
}
