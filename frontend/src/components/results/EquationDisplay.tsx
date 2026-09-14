import { formatFormula } from "../../utils/formatFormula";
import "./EquationDisplay.css";

/** Splits "2 HCl + NaOH \u2192 NaCl + H2O" into formatted tokens: coefficients stay plain, formulas get subscripts. */
export function EquationDisplay({ equation }: { equation: string }) {
  const sides = equation.split("\u2192");
  return (
    <div className="equation-display formula">
      {sides.map((side, sideIndex) => (
        <span key={sideIndex} className="equation-display__side">
          {sideIndex > 0 && <span className="equation-display__arrow">{"\u2192"}</span>}
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
  const match = term.match(/^(\d+)\s+(.*)$/);
  if (match) {
    return (
      <>
        <span className="equation-display__coefficient">{match[1]}</span>
        {formatFormula(match[2] as string)}
      </>
    );
  }
  return <>{formatFormula(term)}</>;
}
