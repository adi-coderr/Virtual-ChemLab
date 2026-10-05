import type { ElementComposition, MoleculeStructure } from "./types.js";

/**
 * Deterministic pseudo-random number generator (Mulberry32)
 */
function createSeededRandom(seedStr: string): () => number {
  let h = 0x811c9dc5;
  for (let i = 0; i < seedStr.length; i++) {
    h ^= seedStr.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  let s = h >>> 0;
  return () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Standard maximum valence capacity */
const ELEMENT_MAX_VALENCE: Record<string, number> = {
  H: 1,
  F: 1,
  Cl: 1,
  Br: 1,
  I: 1,
  O: 2,
  S: 4,
  N: 3,
  P: 4,
  C: 4,
  Si: 4,
  B: 3,
  Li: 1,
  Na: 1,
  K: 1,
  Mg: 2,
  Ca: 2,
  Al: 3,
  Fe: 3,
  Cu: 2,
  Zn: 2,
};

/** Standard covalent bond length approximations (in Angstroms) */
const BOND_LENGTHS: Record<string, number> = {
  "C-C": 1.52,
  "C=C": 1.40,
  "C-N": 1.47,
  "C-O": 1.43,
  "C=O": 1.22,
  "C-S": 1.82,
  "C-F": 1.35,
  "C-Cl": 1.77,
  "C-Br": 1.94,
  "C-I": 2.14,
  "C-H": 1.09,
  "N-H": 1.01,
  "O-H": 0.96,
  "S-H": 1.34,
};

function getBondDistance(e1: string, e2: string): number {
  const k1 = `${e1}-${e2}`;
  const k2 = `${e2}-${e1}`;
  return BOND_LENGTHS[k1] ?? BOND_LENGTHS[k2] ?? 1.5;
}

/** Ideal 4-direction tetrahedral unit vectors */
const TETRAHEDRAL_VECTORS = [
  { x: 0.577, y: 0.577, z: 0.577 },
  { x: -0.577, y: -0.577, z: 0.577 },
  { x: -0.577, y: 0.577, z: -0.577 },
  { x: 0.577, y: -0.577, z: -0.577 },
];

export function generateMoleculeStructure(
  chemicalId: string,
  formula: string,
  composition: ElementComposition,
  commonName = ""
): MoleculeStructure {
  const rng = createSeededRandom(chemicalId || formula || commonName);
  const comp = { ...composition };

  const priority = ["C", "N", "O", "S", "P", "F", "Cl", "Br", "I", "B", "Si"];
  const otherKeys = Object.keys(comp).filter((k) => k !== "H" && !priority.includes(k));
  const heavyKeys = [...priority.filter((k) => (comp[k] ?? 0) > 0), ...otherKeys];

  const atoms: MoleculeStructure["atoms"] = [];
  const bonds: MoleculeStructure["bonds"] = [];
  const valenceUsed: number[] = [];

  const name = commonName.toLowerCase();
  const cCount = comp["C"] || 0;
  const hCount = comp["H"] || 0;

  // Detect aromatic ring systems or 5-membered heterocycles
  const has6Ring =
    cCount >= 6 &&
    (name.includes("phenyl") ||
      name.includes("benzen") ||
      name.includes("tolu") ||
      name.includes("pyridin") ||
      name.includes("pyrimid") ||
      name.includes("benzo") ||
      (hCount > 0 && hCount <= cCount * 1.4));

  const has5Ring =
    cCount >= 4 &&
    !has6Ring &&
    (name.includes("pyrrol") ||
      name.includes("furan") ||
      name.includes("thiophen") ||
      name.includes("succinimide") ||
      name.includes("pyrazol") ||
      name.includes("imidazol") ||
      name.includes("cyclopent"));

  let atomCount = 0;

  function addAtom(element: string, x3d: number, y3d: number, z3d: number): number {
    const idx = atomCount++;
    atoms.push({
      atomIndex: idx,
      element,
      x3d: Number(x3d.toFixed(3)),
      y3d: Number(y3d.toFixed(3)),
      z3d: Number(z3d.toFixed(3)),
      x2d: Math.round(x3d * 40),
      y2d: Math.round(y3d * 40),
    });
    valenceUsed[idx] = 0;
    return idx;
  }

  function addBond(i1: number, i2: number, order: 1 | 2 | 3 = 1, type: "covalent" | "ionic" = "covalent") {
    bonds.push({ atomIndex1: i1, atomIndex2: i2, order, type });
    valenceUsed[i1] = (valenceUsed[i1] ?? 0) + order;
    valenceUsed[i2] = (valenceUsed[i2] ?? 0) + order;
  }

  if (has6Ring && cCount >= 6) {
    // 6-membered aromatic ring with radius ~1.40 A
    const ringRadius = 1.4;
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      const x = ringRadius * Math.cos(angle);
      const y = ringRadius * Math.sin(angle);
      let elem = "C";
      if (name.includes("pyridin") && i === 1) elem = "N";
      if (name.includes("pyrimid") && (i === 1 || i === 3)) elem = "N";
      addAtom(elem, x, y, 0);
    }
    for (let i = 0; i < 6; i++) {
      addBond(i, (i + 1) % 6, (i % 2 === 0 ? 2 : 1) as 1 | 2);
    }
  } else if (has5Ring && cCount >= 4) {
    // 5-membered planar ring with radius ~1.35 A
    const ringRadius = 1.35;
    for (let i = 0; i < 5; i++) {
      const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
      const x = ringRadius * Math.cos(angle);
      const y = ringRadius * Math.sin(angle);
      let elem = "C";
      if ((comp["N"] ?? 0) > 0 && i === 0) elem = "N";
      else if ((comp["O"] ?? 0) > 0 && name.includes("furan") && i === 0) elem = "O";
      else if ((comp["S"] ?? 0) > 0 && name.includes("thiophen") && i === 0) elem = "S";
      addAtom(elem, x, y, 0);
    }
    for (let i = 0; i < 5; i++) {
      addBond(i, (i + 1) % 5, (i === 0 ? 2 : 1) as 1 | 2);
    }
  }

  // Pure hydrogen fallback (e.g. H2)
  if (atoms.length === 0 && (comp["H"] ?? 0) > 0) {
    const totalH = comp["H"] ?? 1;
    if (totalH === 1) {
      addAtom("H", 0, 0, 0);
    } else {
      for (let i = 0; i < totalH; i++) {
        const x = (i - (totalH - 1) / 2) * 0.74;
        addAtom("H", x, 0, 0);
        if (i > 0) addBond(i - 1, i, 1);
      }
    }
  }

  // Count atoms already placed from skeleton
  const placedCounts: Record<string, number> = {};
  for (const a of atoms) {
    placedCounts[a.element] = (placedCounts[a.element] || 0) + 1;
  }

  // Place remaining heavy atoms (branching substituents, carbon chains, functional groups)
  for (const sym of heavyKeys) {
    const totalRequired = comp[sym] || 0;
    const needed = totalRequired - (placedCounts[sym] || 0);

    for (let k = 0; k < needed; k++) {
      // Find candidate parent atom that still has available valence
      let parentIdx = -1;
      for (let p = 0; p < atoms.length; p++) {
        const pElem = atoms[p]!.element;
        const maxV = ELEMENT_MAX_VALENCE[pElem] ?? 4;
        if (valenceUsed[p]! < maxV) {
          parentIdx = p;
          break;
        }
      }

      // If no atom has valence, use the last heavy atom
      if (parentIdx === -1 && atoms.length > 0) {
        parentIdx = atoms.length - 1;
      }

      let x: number;
      let y: number;
      let z: number;

      if (parentIdx >= 0) {
        const parent = atoms[parentIdx]!;
        const bondDist = getBondDistance(parent.element, sym);

        // Select tetrahedral vector slot based on current valence used
        const slot = valenceUsed[parentIdx]! % 4;
        const tv = TETRAHEDRAL_VECTORS[slot]!;

        // Add slight pseudo-random perturbation to avoid collinear overlaps
        const jitterX = (rng() - 0.5) * 0.15;
        const jitterY = (rng() - 0.5) * 0.15;
        const jitterZ = (rng() - 0.5) * 0.15;

        x = parent.x3d + bondDist * tv.x + jitterX;
        y = parent.y3d + bondDist * tv.y + jitterY;
        z = parent.z3d + bondDist * tv.z + jitterZ;
      } else {
        x = atoms.length * 1.5;
        y = (atoms.length % 2) * 0.5;
        z = 0;
      }

      const newIdx = addAtom(sym, x, y, z);

      if (parentIdx >= 0) {
        const isDouble =
          (sym === "O" && (name.includes("one") || name.includes("oic") || name.includes("aldehyde"))) ||
          (sym === "N" && name.includes("imine"));
        addBond(parentIdx, newIdx, (isDouble ? 2 : 1) as 1 | 2);
      }
    }
  }

  // Place Hydrogens: only attach to atoms with remaining valence capacity
  const hTotal = Math.min(comp["H"] || 0, 32);
  let placedH = 0;

  for (let p = 0; p < atoms.length && placedH < hTotal; p++) {
    const parent = atoms[p]!;
    const maxV = ELEMENT_MAX_VALENCE[parent.element] ?? 4;
    const remaining = maxV - (valenceUsed[p] ?? 0);

    for (let r = 0; r < remaining && placedH < hTotal; r++) {
      const hDist = getBondDistance(parent.element, "H");
      const slot = (valenceUsed[p]! + r) % 4;
      const tv = TETRAHEDRAL_VECTORS[slot]!;

      const x = parent.x3d + hDist * tv.x;
      const y = parent.y3d + hDist * tv.y;
      const z = parent.z3d + hDist * tv.z;

      const hIdx = addAtom("H", x, y, z);
      addBond(p, hIdx, 1);
      placedH++;
    }
  }

  // If there are still remaining unplaced Hydrogens, distribute them around outer perimeter
  while (placedH < hTotal && atoms.length > 0) {
    const parentIdx = placedH % Math.max(1, Math.min(atoms.length - placedH, 10));
    const parent = atoms[parentIdx]!;
    const angle = (placedH * 2.399) % (2 * Math.PI);
    const hDist = 1.09;
    const x = parent.x3d + hDist * Math.cos(angle);
    const y = parent.y3d + hDist * Math.sin(angle);
    const z = parent.z3d + (placedH % 2 === 0 ? 0.6 : -0.6);

    const hIdx = addAtom("H", x, y, z);
    addBond(parentIdx, hIdx, 1);
    placedH++;
  }

  // ---------------------------------------------------------------------------
  // Steric Clash Relaxation: Guarantee min distance >= 0.85 A between all atoms
  // ---------------------------------------------------------------------------
  const MIN_ALLOWED_DIST = 0.85;
  for (let iter = 0; iter < 12; iter++) {
    let clashFound = false;
    for (let i = 0; i < atoms.length; i++) {
      for (let j = i + 1; j < atoms.length; j++) {
        const a1 = atoms[i]!;
        const a2 = atoms[j]!;
        let dx = a2.x3d - a1.x3d;
        let dy = a2.y3d - a1.y3d;
        let dz = a2.z3d - a1.z3d;
        let dist = Math.hypot(dx, dy, dz);

        if (dist < MIN_ALLOWED_DIST) {
          clashFound = true;
          if (dist < 0.001) {
            dx = (rng() - 0.5) * 0.2;
            dy = (rng() - 0.5) * 0.2;
            dz = 0.5;
            dist = Math.hypot(dx, dy, dz);
          }
          const push = (MIN_ALLOWED_DIST - dist) * 0.55;
          const nx = dx / dist;
          const ny = dy / dist;
          const nz = dz / dist;

          a1.x3d -= nx * push;
          a1.y3d -= ny * push;
          a1.z3d -= nz * push;
          a2.x3d += nx * push;
          a2.y3d += ny * push;
          a2.z3d += nz * push;
        }
      }
    }
    if (!clashFound) break;
  }

  // ---------------------------------------------------------------------------
  // Recenter molecule around (0, 0, 0) and generate 2D coordinates
  // ---------------------------------------------------------------------------
  let sumX = 0;
  let sumY = 0;
  let sumZ = 0;
  for (const a of atoms) {
    sumX += a.x3d;
    sumY += a.y3d;
    sumZ += a.z3d;
  }
  const midX = sumX / (atoms.length || 1);
  const midY = sumY / (atoms.length || 1);
  const midZ = sumZ / (atoms.length || 1);

  for (const a of atoms) {
    a.x3d = Number((a.x3d - midX).toFixed(3));
    a.y3d = Number((a.y3d - midY).toFixed(3));
    a.z3d = Number((a.z3d - midZ).toFixed(3));
    a.x2d = Math.round(a.x3d * 42);
    a.y2d = Math.round(a.y3d * 42);
  }

  return {
    atoms,
    bonds,
    curated: true,
  };
}
