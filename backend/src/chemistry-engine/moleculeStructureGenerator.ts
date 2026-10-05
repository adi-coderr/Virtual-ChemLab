import type { ElementComposition, MoleculeStructure } from "./types.js";
import { parseFormula } from "./formulaParser.js";

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
  S: 6,
  N: 3,
  P: 5,
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
  Mn: 7,
  Cr: 6,
  Ti: 4,
  Ba: 2,
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
  "S-O": 1.49,
  "S=O": 1.43,
  "P-O": 1.54,
  "P=O": 1.48,
  "N-O": 1.40,
  "N=O": 1.22,
  "B-F": 1.31,
  "S-F": 1.56,
  "P-Cl": 2.04,
  "Fe-Cl": 2.16,
  "Cu-O": 1.95,
  "Al-Cl": 2.06,
  "Si-O": 1.63,
  "Si-C": 1.87,
};

function getBondDistance(e1: string, e2: string): number {
  const k1 = `${e1}-${e2}`;
  const k2 = `${e2}-${e1}`;
  return BOND_LENGTHS[k1] ?? BOND_LENGTHS[k2] ?? 1.5;
}

/** VSEPR Geometry Unit Vectors */
const VSEPR_VECTORS = {
  linear: [
    { x: 1, y: 0, z: 0 },
    { x: -1, y: 0, z: 0 },
  ],
  bent: [
    { x: 0.793, y: 0.609, z: 0 },
    { x: -0.793, y: 0.609, z: 0 },
  ],
  trigonalPlanar: [
    { x: 0, y: 1, z: 0 },
    { x: 0.866, y: -0.5, z: 0 },
    { x: -0.866, y: -0.5, z: 0 },
  ],
  trigonalPyramidal: [
    { x: 0, y: 0.94, z: -0.34 },
    { x: 0.814, y: -0.47, z: -0.34 },
    { x: -0.814, y: -0.47, z: -0.34 },
  ],
  tetrahedral: [
    { x: 0.577, y: 0.577, z: 0.577 },
    { x: -0.577, y: -0.577, z: 0.577 },
    { x: -0.577, y: 0.577, z: -0.577 },
    { x: 0.577, y: -0.577, z: -0.577 },
  ],
  trigonalBipyramidal: [
    { x: 1, y: 0, z: 0 },
    { x: -0.5, y: 0.866, z: 0 },
    { x: -0.5, y: -0.866, z: 0 },
    { x: 0, y: 0, z: 1 },
    { x: 0, y: 0, z: -1 },
  ],
  octahedral: [
    { x: 1, y: 0, z: 0 },
    { x: -1, y: 0, z: 0 },
    { x: 0, y: 1, z: 0 },
    { x: 0, y: -1, z: 0 },
    { x: 0, y: 0, z: 1 },
    { x: 0, y: 0, z: -1 },
  ],
};

// -----------------------------------------------------------------------------
// 1. SMILES-to-3D Structure Generator
// -----------------------------------------------------------------------------

interface SmilesNode {
  idx: number;
  elem: string;
  charge: number;
  edges: { target: number; order: 1 | 2 | 3 }[];
}

function parseSmilesToGraph(smiles: string): SmilesNode[] {
  const nodes: SmilesNode[] = [];
  const ringMap: Record<number, { nodeIdx: number; order: 1 | 2 | 3 }> = {};
  const branchStack: number[] = [];
  let currentIdx = -1;
  let nextOrder: 1 | 2 | 3 = 1;

  let i = 0;
  while (i < smiles.length) {
    const ch = smiles[i]!;

    if (ch === ".") {
      currentIdx = -1;
      nextOrder = 1;
      i++;
      continue;
    }

    if (ch === "(") {
      branchStack.push(currentIdx);
      i++;
      continue;
    }

    if (ch === ")") {
      currentIdx = branchStack.pop() ?? -1;
      i++;
      continue;
    }

    if (ch === "-") {
      nextOrder = 1;
      i++;
      continue;
    }
    if (ch === "=") {
      nextOrder = 2;
      i++;
      continue;
    }
    if (ch === "#") {
      nextOrder = 3;
      i++;
      continue;
    }
    if (ch === ":" || ch === "/" || ch === "\\") {
      nextOrder = 1;
      i++;
      continue;
    }

    // Ring closure
    if (/[0-9]/.test(ch)) {
      const r = parseInt(ch, 10);
      if (ringMap[r] !== undefined) {
        const other = ringMap[r]!;
        delete ringMap[r];
        if (currentIdx >= 0 && currentIdx !== other.nodeIdx) {
          nodes[currentIdx]!.edges.push({ target: other.nodeIdx, order: other.order });
          nodes[other.nodeIdx]!.edges.push({ target: currentIdx, order: other.order });
        }
      } else if (currentIdx >= 0) {
        ringMap[r] = { nodeIdx: currentIdx, order: nextOrder };
        nextOrder = 1;
      }
      i++;
      continue;
    }

    // Bracketed atom: [Na+], [OH-], [N+](=O)[O-]
    if (ch === "[") {
      const end = smiles.indexOf("]", i);
      if (end !== -1) {
        const inner = smiles.slice(i + 1, end);
        const match = inner.match(/^([A-Za-z]+)(?:@+)?(?:H[0-9]*)?([+-][0-9]*|[0-9]*[+-])?/);
        const raw = match ? match[1]! : "C";
        const elem = raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase();
        let charge = 0;
        if (match && match[2]) {
          if (match[2] === "+") charge = 1;
          else if (match[2] === "-") charge = -1;
          else charge = parseInt(match[2], 10) || 0;
        }
        const idx = nodes.length;
        nodes.push({ idx, elem, charge, edges: [] });
        if (currentIdx >= 0) {
          nodes[currentIdx]!.edges.push({ target: idx, order: nextOrder });
          nodes[idx]!.edges.push({ target: currentIdx, order: nextOrder });
        }
        currentIdx = idx;
        nextOrder = 1;
        i = end + 1;
        continue;
      }
    }

    // Multi-letter & single-letter atoms
    let elem = "";
    const two = smiles.slice(i, i + 2);
    if (["Cl", "Br", "Si", "Na", "Ca", "Fe", "Cu", "Al", "Zn", "Ba", "Mg"].includes(two)) {
      elem = two;
      i += 2;
    } else if (/[A-Za-z]/.test(ch)) {
      elem = ch.toUpperCase();
      i++;
    }

    if (elem) {
      const idx = nodes.length;
      nodes.push({ idx, elem, charge: 0, edges: [] });
      if (currentIdx >= 0) {
        nodes[currentIdx]!.edges.push({ target: idx, order: nextOrder });
        nodes[idx]!.edges.push({ target: currentIdx, order: nextOrder });
      }
      currentIdx = idx;
      nextOrder = 1;
    } else {
      i++;
    }
  }

  return nodes;
}

function generateFromSmiles(smiles: string, rng: () => number): MoleculeStructure | null {
  const graph = parseSmilesToGraph(smiles);
  if (graph.length === 0) return null;

  const atoms: MoleculeStructure["atoms"] = [];
  const bonds: MoleculeStructure["bonds"] = [];
  const coords: { x: number; y: number; z: number }[] = [];

  // 1. Initial BFS 3D coordinate layout
  const visited = new Set<number>();
  const queue: number[] = [0];
  visited.add(0);
  coords[0] = { x: 0, y: 0, z: 0 };

  while (queue.length > 0) {
    const u = queue.shift()!;
    const uNode = graph[u]!;
    const uPos = coords[u]!;

    let neighborIdx = 0;
    for (const edge of uNode.edges) {
      const v = edge.target;
      if (!visited.has(v)) {
        visited.add(v);
        queue.push(v);

        const vNode = graph[v]!;
        const bondDist = getBondDistance(uNode.elem, vNode.elem);
        const slot = neighborIdx % 4;
        const tv = VSEPR_VECTORS.tetrahedral[slot]!;
        const jitter = (rng() - 0.5) * 0.2;

        coords[v] = {
          x: uPos.x + bondDist * tv.x + jitter,
          y: uPos.y + bondDist * tv.y + jitter,
          z: uPos.z + bondDist * tv.z + jitter,
        };
        neighborIdx++;
      }
    }
  }

  // Handle any disconnected fragments (e.g. salts like Na+ . Cl-)
  for (let i = 0; i < graph.length; i++) {
    if (!coords[i]) {
      coords[i] = { x: i * 2.2, y: 0, z: 0 };
    }
  }

  // 2. Add heavy atoms to atoms array
  for (let i = 0; i < graph.length; i++) {
    const node = graph[i]!;
    const p = coords[i]!;
    atoms.push({
      atomIndex: i,
      element: node.elem,
      x3d: Number(p.x.toFixed(3)),
      y3d: Number(p.y.toFixed(3)),
      z3d: Number(p.z.toFixed(3)),
      x2d: Math.round(p.x * 40),
      y2d: Math.round(p.y * 40),
      formalCharge: node.charge,
    });
  }

  // Add heavy bonds
  const bondSet = new Set<string>();
  for (const node of graph) {
    for (const edge of node.edges) {
      const k = [Math.min(node.idx, edge.target), Math.max(node.idx, edge.target)].join("-");
      if (!bondSet.has(k)) {
        bondSet.add(k);
        bonds.push({
          atomIndex1: node.idx,
          atomIndex2: edge.target,
          order: edge.order,
          type: "covalent",
        });
      }
    }
  }

  // 3. Attach implicit Hydrogens to satisfy standard valencies
  const heavyCount = atoms.length;
  for (let i = 0; i < heavyCount; i++) {
    const node = graph[i]!;
    const elem = node.elem;
    const maxV = ELEMENT_MAX_VALENCE[elem] ?? 4;
    const usedV = node.edges.reduce((sum, e) => sum + e.order, 0);
    const needH = Math.max(0, maxV - usedV);

    const parentPos = atoms[i]!;
    for (let h = 0; h < needH; h++) {
      const hDist = getBondDistance(elem, "H");
      const slot = (usedV + h) % 4;
      const tv = VSEPR_VECTORS.tetrahedral[slot]!;
      const hIdx = atoms.length;

      const x = parentPos.x3d + hDist * tv.x;
      const y = parentPos.y3d + hDist * tv.y;
      const z = parentPos.z3d + hDist * tv.z;

      atoms.push({
        atomIndex: hIdx,
        element: "H",
        x3d: Number(x.toFixed(3)),
        y3d: Number(y.toFixed(3)),
        z3d: Number(z.toFixed(3)),
        x2d: Math.round(x * 40),
        y2d: Math.round(y * 40),
      });

      bonds.push({
        atomIndex1: i,
        atomIndex2: hIdx,
        order: 1,
        type: "covalent",
      });
    }
  }

  // 4. Steric & Bond Spring Relaxation
  relaxGeometry(atoms, bonds, rng);

  return { curated: true, atoms, bonds };
}

// -----------------------------------------------------------------------------
// 2. Inorganic & Small-Molecule VSEPR Generator
// -----------------------------------------------------------------------------

function detectCentralAtom(comp: ElementComposition, formula: string): string | null {
  const elements = Object.keys(comp);
  if (elements.length <= 1) return null;

  // Oxoacids & Oxoanions: SO4, PO4, NO3, CO3, ClO4, CrO4, MnO4, BO3, SiO4, SeO4, AsO4
  if ((comp["O"] ?? 0) >= 2) {
    for (const c of [
      "S", "Se", "Te", "P", "As", "Sb", "Cr", "Mo", "W", "Mn", "Re", "N", "C", "Si", "Ge", "Cl", "Br", "I", "B", "V",
    ]) {
      if (comp[c] && comp[c]! <= 2) return c;
    }
  }

  // Binary Halides, Oxides & Hydrides: BF3, SF6, PCl5, FeCl3, BaCl2, CO2, H2O, NH3
  const centralCandidates = [
    "Be", "Mg", "Ca", "Sr", "Ba", "Li", "Na", "K", "Cs",
    "Sc", "Ti", "V", "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn",
    "Y", "Zr", "Nb", "Mo", "Tc", "Ru", "Rh", "Pd", "Ag", "Cd",
    "Hf", "Ta", "W", "Re", "Os", "Ir", "Pt", "Au", "Hg",
    "B", "Al", "Ga", "In", "Tl", "Si", "Ge", "Sn", "Pb",
    "P", "As", "Sb", "Bi", "S", "Se", "Te", "C", "N",
  ];
  for (const c of centralCandidates) {
    if (comp[c] && comp[c] === 1) {
      const others = elements.filter((e) => e !== c);
      if (others.every((e) => ["F", "Cl", "Br", "I", "H", "O"].includes(e))) {
        return c;
      }
    }
  }

  if (comp["O"] === 1 && (comp["H"] ?? 0) >= 2) return "O"; // H2O
  if (comp["S"] === 1 && (comp["H"] ?? 0) >= 2) return "S"; // H2S

  return null;
}

function generateInorganicVsepr(
  comp: ElementComposition,
  formula: string,
  commonName: string,
  rng: () => number
): MoleculeStructure | null {
  const central = detectCentralAtom(comp, formula);
  if (!central) return null;

  const atoms: MoleculeStructure["atoms"] = [];
  const bonds: MoleculeStructure["bonds"] = [];

  // Place central atom at origin
  atoms.push({
    atomIndex: 0,
    element: central,
    x3d: 0,
    y3d: 0,
    z3d: 0,
    x2d: 0,
    y2d: 0,
  });

  const oCount = comp["O"] || 0;
  const hCount = comp["H"] || 0;

  // Case A: Oxoacid or Oxoanion (e.g. H2SO4, H3PO4, CuSO4, HNO3, CO3)
  if (oCount >= 2 && central !== "O") {
    let vecs = VSEPR_VECTORS.tetrahedral;
    if (oCount === 2) vecs = VSEPR_VECTORS.bent;
    else if (oCount === 3) vecs = VSEPR_VECTORS.trigonalPlanar;

    const oIndices: number[] = [];
    for (let i = 0; i < oCount; i++) {
      const v = vecs[i % vecs.length]!;
      const d = getBondDistance(central, "O");
      const oIdx = atoms.length;
      oIndices.push(oIdx);

      atoms.push({
        atomIndex: oIdx,
        element: "O",
        x3d: Number((v.x * d).toFixed(3)),
        y3d: Number((v.y * d).toFixed(3)),
        z3d: Number((v.z * d).toFixed(3)),
        x2d: Math.round(v.x * d * 40),
        y2d: Math.round(v.y * d * 40),
      });

      const isDouble = i < oCount - Math.min(hCount, oCount);
      bonds.push({
        atomIndex1: 0,
        atomIndex2: oIdx,
        order: isDouble ? 2 : 1,
        type: "covalent",
      });
    }

    // Attach H to O atoms (O-H) for oxoacids
    let placedH = 0;
    for (let i = 0; i < oCount && placedH < hCount; i++) {
      const oIdx = oIndices[i]!;
      const oAtom = atoms[oIdx]!;
      const hDist = 0.96;
      const hIdx = atoms.length;

      const hx = oAtom.x3d * 1.4 + 0.3;
      const hy = oAtom.y3d * 1.4;
      const hz = oAtom.z3d * 1.4 - 0.2;

      atoms.push({
        atomIndex: hIdx,
        element: "H",
        x3d: Number(hx.toFixed(3)),
        y3d: Number(hy.toFixed(3)),
        z3d: Number(hz.toFixed(3)),
        x2d: Math.round(hx * 40),
        y2d: Math.round(hy * 40),
      });

      bonds.push({
        atomIndex1: oIdx,
        atomIndex2: hIdx,
        order: 1,
        type: "covalent",
      });
      placedH++;
    }

    // Attach any metal cations (e.g. Cu in CuSO4, Fe in FeSO4, Ca in CaCO3)
    const metals = Object.keys(comp).filter((k) => k !== central && k !== "O" && k !== "H");
    for (const m of metals) {
      const mCount = comp[m] || 0;
      for (let j = 0; j < mCount; j++) {
        const mIdx = atoms.length;
        const targetO = oIndices[j % oIndices.length]!;
        const oAtom = atoms[targetO]!;
        const mDist = 1.95;

        const mx = oAtom.x3d * 1.5 - 0.4;
        const my = oAtom.y3d * 1.5 + 0.4;
        const mz = oAtom.z3d * 1.5;

        atoms.push({
          atomIndex: mIdx,
          element: m,
          x3d: Number(mx.toFixed(3)),
          y3d: Number(my.toFixed(3)),
          z3d: Number(mz.toFixed(3)),
          x2d: Math.round(mx * 40),
          y2d: Math.round(my * 40),
        });

        bonds.push({
          atomIndex1: targetO,
          atomIndex2: mIdx,
          order: 1,
          type: "ionic",
        });
      }
    }

    relaxGeometry(atoms, bonds, rng);
    return { curated: true, atoms, bonds };
  }

  // Case B: Small Binary Halides / Hydrides / Oxides (BF3, SF6, PCl5, FeCl3, CO2, H2O, NH3)
  const ligandKeys = Object.keys(comp).filter((k) => k !== central);
  const ligandList: string[] = [];
  for (const k of ligandKeys) {
    const cnt = comp[k] || 0;
    for (let c = 0; c < cnt; c++) ligandList.push(k);
  }

  const n = ligandList.length;
  let vecs = VSEPR_VECTORS.tetrahedral;
  if (n === 2) {
    const isLinear = central === "C" || central === "Be" || formula.includes("CO2");
    vecs = isLinear ? VSEPR_VECTORS.linear : VSEPR_VECTORS.bent;
  } else if (n === 3) {
    const isPlanar = central === "B" || central === "Al" || central === "SO3";
    vecs = isPlanar ? VSEPR_VECTORS.trigonalPlanar : VSEPR_VECTORS.trigonalPyramidal;
  } else if (n === 4) {
    vecs = VSEPR_VECTORS.tetrahedral;
  } else if (n === 5) {
    vecs = VSEPR_VECTORS.trigonalBipyramidal;
  } else if (n >= 6) {
    vecs = VSEPR_VECTORS.octahedral;
  }

  for (let i = 0; i < n; i++) {
    const ligElem = ligandList[i]!;
    const v = vecs[i % vecs.length]!;
    const d = getBondDistance(central, ligElem);
    const lIdx = atoms.length;

    atoms.push({
      atomIndex: lIdx,
      element: ligElem,
      x3d: Number((v.x * d).toFixed(3)),
      y3d: Number((v.y * d).toFixed(3)),
      z3d: Number((v.z * d).toFixed(3)),
      x2d: Math.round(v.x * d * 40),
      y2d: Math.round(v.y * d * 40),
    });

    const isDouble = (central === "C" && ligElem === "O") || (central === "S" && ligElem === "O");
    bonds.push({
      atomIndex1: 0,
      atomIndex2: lIdx,
      order: isDouble ? 2 : 1,
      type: "covalent",
    });
  }

  relaxGeometry(atoms, bonds, rng);
  return { curated: true, atoms, bonds };
}

// -----------------------------------------------------------------------------
// 3. Organic Molecule Fallback Generator (Aliphatic Chains & Aromatic Rings)
// -----------------------------------------------------------------------------

function generateOrganicStructure(
  chemicalId: string,
  formula: string,
  comp: ElementComposition,
  commonName: string,
  rng: () => number
): MoleculeStructure {
  const halogens = ["F", "Cl", "Br", "I"];
  const nonMetals = new Set(["C", "Si", "B", "N", "P", "S", "As", "Se", "Te", "O", ...halogens, "H"]);
  const metalKeys = Object.keys(comp).filter((k) => !nonMetals.has(k) && (comp[k] ?? 0) > 0);

  // Core ordering: C/Si/B -> Metals -> Polyvalent heteroatoms -> O -> Halogens
  const heavyKeys = [
    ...["C", "Si", "B"].filter((k) => (comp[k] ?? 0) > 0),
    ...metalKeys,
    ...["N", "P", "S", "As", "Se", "Te"].filter((k) => (comp[k] ?? 0) > 0),
    ...((comp["O"] ?? 0) > 0 ? ["O"] : []),
    ...halogens.filter((k) => (comp[k] ?? 0) > 0),
  ];

  const atoms: MoleculeStructure["atoms"] = [];
  const bonds: MoleculeStructure["bonds"] = [];
  const valenceUsed: number[] = [];

  const name = commonName.toLowerCase();
  const cCount = comp["C"] || 0;
  const hCount = comp["H"] || 0;

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

  // 1. Ring skeletons
  if (has6Ring && cCount >= 6) {
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

  // 2. Aliphatic carbon continuous zigzag backbone if no ring
  if (atoms.length === 0 && cCount > 0) {
    const backboneLen = Math.min(cCount, 14);
    for (let i = 0; i < backboneLen; i++) {
      const x = (i - (backboneLen - 1) / 2) * 1.35;
      const y = i % 2 === 0 ? 0.45 : -0.45;
      const z = i % 4 === 0 || i % 4 === 1 ? 0.25 : -0.25;
      addAtom("C", x, y, z);
      if (i > 0) {
        addBond(i - 1, i, 1);
      }
    }
  }

  // Pure hydrogen fallback (e.g. H2)
  if (atoms.length === 0 && heavyKeys.length === 0 && (comp["H"] ?? 0) > 0) {
    const totalH = comp["H"] ?? 1;
    for (let i = 0; i < totalH; i++) {
      const x = (i - (totalH - 1) / 2) * 0.74;
      addAtom("H", x, 0, 0);
      if (i > 0) addBond(i - 1, i, 1);
    }
  }

  const isPeroxide =
    name.includes("peroxide") ||
    name.includes("peroxy") ||
    name.includes("persulfate") ||
    name.includes("perborate") ||
    name.includes("cpba") ||
    name.includes("peracid");
  const isElementalHalogen =
    cCount === 0 &&
    heavyKeys.length === 1 &&
    ["F", "Cl", "Br", "I"].includes(heavyKeys[0]!);

  // 3. Attach remaining heavy atoms across least-substituted backbone positions
  const placedCounts: Record<string, number> = {};
  for (const a of atoms) placedCounts[a.element] = (placedCounts[a.element] || 0) + 1;

  for (const sym of heavyKeys) {
    const totalRequired = comp[sym] || 0;
    const needed = totalRequired - (placedCounts[sym] || 0);

    for (let k = 0; k < needed; k++) {
      let parentIdx = -1;
      let minValence = Infinity;

      for (let p = 0; p < atoms.length; p++) {
        const pElem = atoms[p]!.element;
        if (pElem === "H") continue;

        // Terminal halogen check: Halogens cannot accept children unless elemental halogen (e.g. Cl2)
        if (["F", "Cl", "Br", "I"].includes(pElem) && !isElementalHalogen) continue;

        // Halogen substituent cannot attach to Oxygen or other Halogen
        if (
          ["F", "Cl", "Br", "I"].includes(sym) &&
          (pElem === "O" || ["F", "Cl", "Br", "I"].includes(pElem)) &&
          !isElementalHalogen
        ) {
          continue;
        }

        // Oxygen cannot attach to Oxygen unless genuine peroxide
        if (sym === "O" && pElem === "O" && !isPeroxide) continue;

        // Oxygen cannot attach to Halogen
        if (sym === "O" && ["F", "Cl", "Br", "I"].includes(pElem)) continue;

        const maxV = ELEMENT_MAX_VALENCE[pElem] ?? 4;
        const used = valenceUsed[p] ?? 0;
        if (used < maxV && used < minValence) {
          minValence = used;
          parentIdx = p;
        }
      }

      // Fallback: If no candidate with remaining valence found, look for best heavy atom (prefer C, N, S, P over O/halogens)
      if (parentIdx === -1 && atoms.length > 0) {
        for (let p = 0; p < atoms.length; p++) {
          const pElem = atoms[p]!.element;
          if (["C", "N", "S", "P", "Si", "B"].includes(pElem)) {
            parentIdx = p;
            break;
          }
        }
        if (parentIdx === -1 && isElementalHalogen) {
          parentIdx = atoms.length - 1;
        } else if (parentIdx === -1) {
          parentIdx = 0;
        }
      }

      let x: number;
      let y: number;
      let z: number;

      if (parentIdx >= 0) {
        const parent = atoms[parentIdx]!;
        const bondDist = getBondDistance(parent.element, sym);
        const slot = valenceUsed[parentIdx]! % 4;
        const tv = VSEPR_VECTORS.tetrahedral[slot]!;
        const jitter = (rng() - 0.5) * 0.15;

        x = parent.x3d + bondDist * tv.x + jitter;
        y = parent.y3d + bondDist * tv.y + jitter;
        z = parent.z3d + bondDist * tv.z + jitter;
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

  // 4. Place Hydrogens: evenly fill remaining valences on all heavy atoms
  const hTotal = comp["H"] || 0;
  let placedH = 0;

  for (let p = 0; p < atoms.length && placedH < hTotal; p++) {
    const parent = atoms[p]!;
    if (parent.element === "H") continue;
    const maxV = ELEMENT_MAX_VALENCE[parent.element] ?? 4;
    const remaining = maxV - (valenceUsed[p] ?? 0);

    for (let r = 0; r < remaining && placedH < hTotal; r++) {
      const hDist = getBondDistance(parent.element, "H");
      const slot = (valenceUsed[p]! + r) % 4;
      const tv = VSEPR_VECTORS.tetrahedral[slot]!;

      const x = parent.x3d + hDist * tv.x;
      const y = parent.y3d + hDist * tv.y;
      const z = parent.z3d + hDist * tv.z;

      const hIdx = addAtom("H", x, y, z);
      addBond(p, hIdx, 1);
      placedH++;
    }
  }

  // Excess hydrogens distributed evenly around perimeter
  if (placedH < hTotal && atoms.length > 0) {
    const heavyIndices = atoms
      .map((a, idx) => ({ elem: a.element, idx }))
      .filter((item) => item.elem !== "H")
      .map((item) => item.idx);
    const targetPool = heavyIndices.length > 0 ? heavyIndices : atoms.map((_, idx) => idx);

    while (placedH < hTotal) {
      const parentIdx = targetPool[placedH % targetPool.length]!;
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
  }

  if (atoms.length === 0) {
    const lowerName = (commonName || chemicalId).toLowerCase();
    if (lowerName.includes("hcl")) {
      addAtom("H", -0.65, 0, 0);
      addAtom("Cl", 0.65, 0, 0);
      addBond(0, 1, 1);
    } else if (lowerName.includes("lactam")) {
      addAtom("C", -0.7, -0.7, 0);
      addAtom("C", 0.7, -0.7, 0);
      addAtom("C", 0.7, 0.7, 0);
      addAtom("N", -0.7, 0.7, 0);
      addBond(0, 1, 1);
      addBond(1, 2, 1);
      addBond(2, 3, 1);
      addBond(3, 0, 1);
    } else if (lowerName.includes("lysine")) {
      // Lysine backbone C6N2
      for (let i = 0; i < 6; i++) {
        addAtom("C", (i - 2.5) * 1.3, (i % 2) * 0.4, 0);
        if (i > 0) addBond(i - 1, i, 1);
      }
      addAtom("N", -3.8, 0, 0);
      addBond(0, 6, 1);
      addAtom("N", 4.2, 0, 0);
      addBond(5, 7, 1);
    } else if (lowerName.includes("grignard")) {
      addAtom("C", -1.5, 0, 0);
      addAtom("Mg", 0, 0, 0);
      addAtom("Br", 1.8, 0, 0);
      addBond(0, 1, 1);
      addBond(1, 2, 1);
    } else {
      let fallbackElem = "C";
      if (lowerName.includes("nickel")) fallbackElem = "Ni";
      else if (lowerName.includes("iron")) fallbackElem = "Fe";
      else if (lowerName.includes("copper")) fallbackElem = "Cu";
      else if (lowerName.includes("zinc")) fallbackElem = "Zn";
      else if (lowerName.includes("gold")) fallbackElem = "Au";
      else if (lowerName.includes("silver")) fallbackElem = "Ag";
      else if (lowerName.includes("platinum")) fallbackElem = "Pt";
      else if (lowerName.includes("palladium")) fallbackElem = "Pd";
      addAtom(fallbackElem, 0, 0, 0);
    }
  }

  relaxGeometry(atoms, bonds, rng);
  return { curated: true, atoms, bonds };
}

// -----------------------------------------------------------------------------
// Common Steric & Bond Spring Relaxation
// -----------------------------------------------------------------------------

function relaxGeometry(
  atoms: MoleculeStructure["atoms"],
  bonds: MoleculeStructure["bonds"],
  rng: () => number
) {
  const MIN_ALLOWED_DIST = 0.95;

  for (let iter = 0; iter < 24; iter++) {
    // 1. Bond distance spring constraint
    for (const b of bonds) {
      const a1 = atoms[b.atomIndex1]!;
      const a2 = atoms[b.atomIndex2]!;
      const targetDist = getBondDistance(a1.element, a2.element);

      let dx = a2.x3d - a1.x3d;
      let dy = a2.y3d - a1.y3d;
      let dz = a2.z3d - a1.z3d;
      let dist = Math.hypot(dx, dy, dz);
      if (dist < 0.001) dist = 0.001;

      const diff = (dist - targetDist) * 0.35;
      const nx = dx / dist;
      const ny = dy / dist;
      const nz = dz / dist;

      a1.x3d += nx * diff * 0.5;
      a1.y3d += ny * diff * 0.5;
      a1.z3d += nz * diff * 0.5;
      a2.x3d -= nx * diff * 0.5;
      a2.y3d -= ny * diff * 0.5;
      a2.z3d -= nz * diff * 0.5;
    }

    // 2. Non-bonded steric clash repulsion
    for (let i = 0; i < atoms.length; i++) {
      for (let j = i + 1; j < atoms.length; j++) {
        const a1 = atoms[i]!;
        const a2 = atoms[j]!;

        let dx = a2.x3d - a1.x3d;
        let dy = a2.y3d - a1.y3d;
        let dz = a2.z3d - a1.z3d;
        let dist = Math.hypot(dx, dy, dz);

        const minDist = a1.element === "H" || a2.element === "H" ? MIN_ALLOWED_DIST : 1.35;
        if (dist < minDist) {
          if (dist < 0.001) {
            dx = (rng() - 0.5) * 0.2;
            dy = (rng() - 0.5) * 0.2;
            dz = (rng() - 0.5) * 0.2;
            dist = Math.hypot(dx, dy, dz) || 0.1;
          }

          const push = (minDist - dist) * 0.45;
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
  }

  // Recenter molecule at (0, 0, 0) and generate 2D projection
  let sumX = 0;
  let sumY = 0;
  let sumZ = 0;
  for (const a of atoms) {
    sumX += a.x3d;
    sumY += a.y3d;
    sumZ += a.z3d;
  }
  const avgX = sumX / atoms.length;
  const avgY = sumY / atoms.length;
  const avgZ = sumZ / atoms.length;

  for (const a of atoms) {
    a.x3d = Number((a.x3d - avgX).toFixed(3));
    a.y3d = Number((a.y3d - avgY).toFixed(3));
    a.z3d = Number((a.z3d - avgZ).toFixed(3));
    a.x2d = Math.round(a.x3d * 42);
    a.y2d = Math.round(a.y3d * 42);
  }
}

// -----------------------------------------------------------------------------
// Main Generator Entrypoint
// -----------------------------------------------------------------------------

export function generateMoleculeStructure(
  chemicalId: string,
  formula: string,
  composition?: ElementComposition,
  commonName = "",
  smiles?: string
): MoleculeStructure {
  const rng = createSeededRandom(chemicalId || formula || commonName || smiles || "chemlab_seed");

  // 1. Prioritize SMILES whenever available (most chemically accurate topology)
  if (smiles && smiles.trim().length > 0) {
    try {
      const struct = generateFromSmiles(smiles.trim(), rng);
      if (struct && struct.atoms.length > 0) {
        return struct;
      }
    } catch {
      // Fallback if SMILES parsing fails on edge case
    }
  }

  // Determine composition
  let comp: ElementComposition = {};
  if (composition && Object.keys(composition).length > 0) {
    comp = { ...composition };
  } else if (formula && formula.trim().length > 0) {
    try {
      comp = parseFormula(formula.trim()).composition;
    } catch {
      comp = {};
    }
  }

  // 2. Homonuclear elements and small elemental clusters (O2, N2, H2, Cl2, Br2, I2, F2, O3, single atoms)
  const elementKeys = Object.keys(comp).filter((k) => (comp[k] ?? 0) > 0);
  if (elementKeys.length === 1) {
    const elem = elementKeys[0]!;
    const count = comp[elem]!;
    if (count === 1) {
      return {
        curated: true,
        atoms: [{ atomIndex: 0, element: elem, x3d: 0, y3d: 0, z3d: 0, x2d: 0, y2d: 0 }],
        bonds: [],
      };
    }
    if (count === 2) {
      const d = getBondDistance(elem, elem) || (elem === "H" ? 0.74 : 1.4);
      const order = elem === "N" ? 3 : elem === "O" ? 2 : 1;
      return {
        curated: true,
        atoms: [
          { atomIndex: 0, element: elem, x3d: Number((-d / 2).toFixed(3)), y3d: 0, z3d: 0, x2d: -30, y2d: 0 },
          { atomIndex: 1, element: elem, x3d: Number((d / 2).toFixed(3)), y3d: 0, z3d: 0, x2d: 30, y2d: 0 },
        ],
        bonds: [{ atomIndex1: 0, atomIndex2: 1, order: order as 1 | 2 | 3, type: "covalent" }],
      };
    }
    if (count === 3 && elem === "O") {
      const d = 1.28;
      const angle = (116.8 * Math.PI) / 180;
      return {
        curated: true,
        atoms: [
          { atomIndex: 0, element: "O", x3d: 0, y3d: 0.35, z3d: 0, x2d: 0, y2d: 20 },
          { atomIndex: 1, element: "O", x3d: Number((-d * Math.sin(angle / 2)).toFixed(3)), y3d: -0.35, z3d: 0, x2d: -35, y2d: -20 },
          { atomIndex: 2, element: "O", x3d: Number((d * Math.sin(angle / 2)).toFixed(3)), y3d: -0.35, z3d: 0, x2d: 35, y2d: -20 },
        ],
        bonds: [
          { atomIndex1: 0, atomIndex2: 1, order: 2, type: "covalent" },
          { atomIndex1: 0, atomIndex2: 2, order: 1, type: "covalent" },
        ],
      };
    }
  }

  // 3. Inorganic & Oxoacid / Small Molecule VSEPR Generator
  const vsepr = generateInorganicVsepr(comp, formula, commonName, rng);
  if (vsepr && vsepr.atoms.length > 0) {
    return vsepr;
  }

  // 4. Organic Structure Generator with proper continuous zigzag chains & rings
  return generateOrganicStructure(chemicalId, formula, comp, commonName, rng);
}
