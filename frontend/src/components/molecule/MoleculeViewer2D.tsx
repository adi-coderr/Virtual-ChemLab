import { useMemo } from "react";
import type { MoleculeStructure } from "../../types/chemistry";
import { getElementVisual } from "./elementColors";
import "./MoleculeViewer2D.css";

const ATOM_RADIUS_2D = 13;
const VIEWPORT_PADDING = 40;

export function MoleculeViewer2D({ structure, label }: { structure: MoleculeStructure; label?: string }) {
  const { atoms, bonds } = structure;

  const bounds = useMemo(() => {
    const xs = atoms.map((a) => a.x2d);
    const ys = atoms.map((a) => a.y2d);
    const minX = Math.min(...xs) - VIEWPORT_PADDING;
    const maxX = Math.max(...xs) + VIEWPORT_PADDING;
    const minY = Math.min(...ys) - VIEWPORT_PADDING;
    const maxY = Math.max(...ys) + VIEWPORT_PADDING;
    return { minX, minY, width: Math.max(maxX - minX, 120), height: Math.max(maxY - minY, 120) };
  }, [atoms]);

  return (
    <div className="molecule-2d">
      <svg
        viewBox={`${bounds.minX} ${bounds.minY} ${bounds.width} ${bounds.height}`}
        role="img"
        aria-label={label ? `2D structure of ${label}` : "2D molecular structure"}
      >
        {bonds.map((bond, i) => {
          const a1 = atoms[bond.atomIndex1];
          const a2 = atoms[bond.atomIndex2];
          if (!a1 || !a2) return null;
          const dx = a2.x2d - a1.x2d;
          const dy = a2.y2d - a1.y2d;
          const len = Math.hypot(dx, dy) || 1;
          const perpX = (-dy / len) * 3.5;
          const perpY = (dx / len) * 3.5;
          const offsets = bond.order === 1 ? [0] : bond.order === 2 ? [-1, 1] : [-1.6, 0, 1.6];
          return (
            <g key={i}>
              {offsets.map((offset, j) => (
                <line
                  key={j}
                  x1={a1.x2d + perpX * offset}
                  y1={a1.y2d + perpY * offset}
                  x2={a2.x2d + perpX * offset}
                  y2={a2.y2d + perpY * offset}
                  className={bond.type === "ionic" ? "molecule-2d__bond molecule-2d__bond--ionic" : "molecule-2d__bond"}
                />
              ))}
            </g>
          );
        })}
        {atoms.map((atom, i) => {
          const visual = getElementVisual(atom.element);
          return (
            <g key={i}>
              <circle cx={atom.x2d} cy={atom.y2d} r={ATOM_RADIUS_2D} fill={visual.color} className="molecule-2d__atom" />
              <text x={atom.x2d} y={atom.y2d} className="molecule-2d__label" fill={isLightColor(visual.color) ? "#1a1a1a" : "#fff"}>
                {atom.element}
                {atom.formalCharge ? <tspan baselineShift="super" fontSize="8">{atom.formalCharge > 0 ? `${atom.formalCharge > 1 ? atom.formalCharge : ""}+` : `${Math.abs(atom.formalCharge) > 1 ? Math.abs(atom.formalCharge) : ""}\u2212`}</tspan> : null}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function isLightColor(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 150;
}
