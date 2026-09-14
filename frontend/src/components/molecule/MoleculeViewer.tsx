import { useState } from "react";
import type { Chemical } from "../../types/chemistry";
import { MoleculeViewer2D } from "./MoleculeViewer2D";
import { MoleculeViewer3D } from "./MoleculeViewer3D";
import { formatFormula } from "../../utils/formatFormula";
import "./MoleculeViewer.css";

export function MoleculeViewer({ chemical }: { chemical: Chemical }) {
  const [mode, setMode] = useState<"2d" | "3d">("3d");

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
        <span className="molecule-viewer__title formula">{formatFormula(chemical.formula)}</span>
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
        {mode === "2d" ? <MoleculeViewer2D structure={chemical.structure} label={chemical.commonName} /> : <MoleculeViewer3D structure={chemical.structure} />}
      </div>
      <p className="molecule-viewer__caption">
        Scientifically informed representation from real bond lengths/angles -- not a live quantum-mechanical simulation.
      </p>
    </div>
  );
}
