/**
 * CPK/Jmol-convention colors and approximate covalent radii, for rendering
 * atoms in the 2D/3D viewers. Mirrors backend/src/chemistry-engine/elementData.ts;
 * duplicated here (frontend and backend are independent projects, not a
 * shared-package monorepo in this v0.1 -- see docs/ARCHITECTURE.md) rather
 * than re-derived, so keep the two in sync if you add elements.
 */
export interface ElementVisual {
  color: string;
  radiusPm: number;
}

const DEFAULT_VISUAL: ElementVisual = { color: "#B9C3C8", radiusPm: 120 };

export const ELEMENT_VISUALS: Record<string, ElementVisual> = {
  H: { color: "#F2F2F2", radiusPm: 31 },
  He: { color: "#D9FFFF", radiusPm: 28 },
  Li: { color: "#CC80FF", radiusPm: 128 },
  Be: { color: "#C2FF00", radiusPm: 96 },
  B: { color: "#FFB5B5", radiusPm: 84 },
  C: { color: "#404040", radiusPm: 76 },
  N: { color: "#3050F8", radiusPm: 71 },
  O: { color: "#FF0D0D", radiusPm: 66 },
  F: { color: "#90E050", radiusPm: 57 },
  Ne: { color: "#B3E3F5", radiusPm: 58 },
  Na: { color: "#AB5CF2", radiusPm: 166 },
  Mg: { color: "#8AFF00", radiusPm: 141 },
  Al: { color: "#BFA6A6", radiusPm: 121 },
  Si: { color: "#F0C8A0", radiusPm: 111 },
  P: { color: "#FF8000", radiusPm: 107 },
  S: { color: "#FFFF30", radiusPm: 105 },
  Cl: { color: "#1FF01F", radiusPm: 102 },
  Ar: { color: "#80D1E3", radiusPm: 106 },
  K: { color: "#8F40D4", radiusPm: 203 },
  Ca: { color: "#3DFF00", radiusPm: 176 },
  Mn: { color: "#9C7AC7", radiusPm: 139 },
  Fe: { color: "#E06633", radiusPm: 132 },
  Ni: { color: "#50D050", radiusPm: 124 },
  Cu: { color: "#C88033", radiusPm: 132 },
  Zn: { color: "#7D80B0", radiusPm: 122 },
  Br: { color: "#A62929", radiusPm: 120 },
  Ag: { color: "#C0C0C0", radiusPm: 145 },
  Ba: { color: "#00C900", radiusPm: 149 },
  Pb: { color: "#575961", radiusPm: 146 },
  I: { color: "#940094", radiusPm: 139 },
};

export function getElementVisual(symbol: string): ElementVisual {
  return ELEMENT_VISUALS[symbol] ?? DEFAULT_VISUAL;
}
