import { useMemo, useState } from "react";
import type { Chemical } from "../../types/chemistry";
import { MoleculeViewer2D } from "./MoleculeViewer2D";
import { MoleculeViewer3D } from "./MoleculeViewer3D";
import { formatFormula } from "../../utils/formatFormula";
import { getElementVisual, getElementName } from "./elementColors";
import "./MoleculeViewer.css";

export function MoleculeViewer({ chemical }: { chemical: Chemical }) {
  const [mode, setMode] = useState<"2d" | "3d">("3d");

  const presentElements = useMemo(() => {
    if (!chemical.structure?.atoms) return [];
    const counts: Record<string, number> = {};
    for (const a of chemical.structure.atoms) {
      counts[a.element] = (counts[a.element] || 0) + 1;
    }
    const priority = (sym: string) => (sym === "C" ? "00" : sym === "H" ? "01" : sym);
    return Object.keys(counts)
      .sort((a, b) => priority(a).localeCompare(priority(b)))
      .map((symbol) => ({
        symbol,
        name: getElementName(symbol),
        count: counts[symbol]!,
        visual: getElementVisual(symbol),
      }));
  }, [chemical.structure]);

  if (!chemical.structure) {
    return (
      <div className="molecule-viewer molecule-viewer--empty">
        <p className="molecule-viewer__empty-title">No curated structure yet</p>
        <p className="molecule-viewer__empty-body">
          {chemical.commonName} ({chemical.formula}) doesn&apos;t have hand-verified atom coordinates in this v0.1 database. Rather than
          guess at a layout, this is left blank -- see docs/ADDING_NEW_REACTIONS.md for how to add one.
        </p>
      </div>
    );
  }

  return (
    <div className="molecule-viewer">
      <div className="molecule-viewer__toolbar">
        <div className="molecule-viewer__title-container">
          <span className="molecule-viewer__title formula">{formatFormula(chemical.formula)}</span>
          {chemical.commonName && chemical.commonName.toLowerCase() !== chemical.formula.toLowerCase() && (
            <span className="molecule-viewer__common-name">({chemical.commonName})</span>
          )}
        </div>
        <div className="molecule-viewer__toggle">
          <button className={mode === "2d" ? "is-active" : ""} onClick={() => setMode("2d")}>
            2D
          </button>
          <button className={mode === "3d" ? "is-active" : ""} onClick={() => setMode("3d")}>
            3D
          </button>
        </div>
      </div>
      <div className="molecule-viewer__stage">
        {mode === "2d" ? (
          <MoleculeViewer2D structure={chemical.structure} label={chemical.commonName} />
        ) : (
          <MoleculeViewer3D structure={chemical.structure} />
        )}

        {/* Bottom Right Floating Element Sphere Demo & Key */}
        {presentElements.length > 0 && (
          <div className="molecule-viewer__legend" aria-label="Element Legend">
            <div className="molecule-viewer__legend-title">Elements</div>
            <div className="molecule-viewer__legend-list">
              {presentElements.map((elem) => (
                <div
                  key={elem.symbol}
                  className="molecule-viewer__legend-item"
                  title={`${elem.name} (${elem.symbol}) — ${elem.count} atom${elem.count > 1 ? "s" : ""}`}
                >
                  <span
                    className="molecule-viewer__legend-sphere"
                    style={{
                      backgroundColor: elem.visual.color,
                    }}
                  />
                  <span className="molecule-viewer__legend-text">
                    <span className="molecule-viewer__legend-symbol">{elem.symbol}</span>
                    <span className="molecule-viewer__legend-sep">·</span>
                    <span className="molecule-viewer__legend-name">{elem.name}</span>
                    {elem.count > 1 && <span className="molecule-viewer__legend-count">×{elem.count}</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <p className="molecule-viewer__caption">
        Scientifically informed representation from real bond lengths/angles -- not a live quantum-mechanical simulation.
      </p>
    </div>
  );
}
