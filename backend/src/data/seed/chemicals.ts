import type { AcidBaseStrength, ChemicalClass, PhysicalState } from "../../chemistry-engine/types.js";

export interface SeedAtom {
  element: string;
  x2d: number;
  y2d: number;
  x3d: number;
  y3d: number;
  z3d: number;
  formalCharge?: number;
}

export interface SeedBond {
  a: number;
  b: number;
  order: 1 | 2 | 3;
  type?: "covalent" | "ionic";
}

export interface SeedStructure {
  atoms: SeedAtom[];
  bonds: SeedBond[];
}

export interface SeedIon {
  formula: string;
  charge: number;
}

export interface SeedChemical {
  id: string;
  commonName: string;
  iupacName?: string;
  formula: string;
  casNumber?: string;
  smiles?: string;
  inchiKey?: string;
  physicalState: PhysicalState;
  density?: number;
  meltingPointC?: number;
  boilingPointC?: number;
  solubilityNotes?: string;
  isAcid?: boolean;
  isBase?: boolean;
  acidBaseStrength?: AcidBaseStrength;
  pKa?: number;
  pKb?: number;
  chemicalClass: ChemicalClass;
  charge?: number;
  substanceColor?: string;
  isElemental?: boolean;
  commonCationCharge?: number;
  neutralizationProducesWater?: boolean;
  dissociation?: { cation: SeedIon; anion: SeedIon };
  aliases?: string[];
  hazardCodes?: string[];
  structure?: SeedStructure;
  source: string;
  notes?: string;
}

const STANDARD_SOURCE =
  "General chemistry reference knowledge (textbook/handbook level, e.g. CRC Handbook / PubChem conventions). Recommend cross-referencing a live database such as PubChem before production/clinical use.";

// ---------------------------------------------------------------------------
// Simple covalent molecules with hand-derived geometry (real bond lengths/angles).
// ---------------------------------------------------------------------------

const WATER_STRUCTURE: SeedStructure = {
  // Bent, H-O-H = 104.5 deg, O-H = 0.96 A
  atoms: [
    { element: "O", x2d: 0, y2d: 0, x3d: 0, y3d: 0, z3d: 0 },
    { element: "H", x2d: -35, y2d: 30, x3d: -0.76, y3d: 0.59, z3d: 0 },
    { element: "H", x2d: 35, y2d: 30, x3d: 0.76, y3d: 0.59, z3d: 0 },
  ],
  bonds: [
    { a: 0, b: 1, order: 1 },
    { a: 0, b: 2, order: 1 },
  ],
};

const HCL_STRUCTURE: SeedStructure = {
  atoms: [
    { element: "H", x2d: -30, y2d: 0, x3d: 0, y3d: 0, z3d: 0 },
    { element: "Cl", x2d: 30, y2d: 0, x3d: 1.27, y3d: 0, z3d: 0 },
  ],
  bonds: [{ a: 0, b: 1, order: 1 }],
};

const CO2_STRUCTURE: SeedStructure = {
  // Linear, O=C=O, C=O = 1.16 A
  atoms: [
    { element: "O", x2d: -50, y2d: 0, x3d: -1.16, y3d: 0, z3d: 0 },
    { element: "C", x2d: 0, y2d: 0, x3d: 0, y3d: 0, z3d: 0 },
    { element: "O", x2d: 50, y2d: 0, x3d: 1.16, y3d: 0, z3d: 0 },
  ],
  bonds: [
    { a: 0, b: 1, order: 2 },
    { a: 1, b: 2, order: 2 },
  ],
};

const CH4_STRUCTURE: SeedStructure = {
  // Tetrahedral, C-H = 1.09 A, using the standard unit-tetrahedron vertex directions.
  atoms: [
    { element: "C", x2d: 0, y2d: 0, x3d: 0, y3d: 0, z3d: 0 },
    { element: "H", x2d: 0, y2d: -45, x3d: 0.629, y3d: 0.629, z3d: 0.629 },
    { element: "H", x2d: 0, y2d: 45, x3d: 0.629, y3d: -0.629, z3d: -0.629 },
    { element: "H", x2d: -45, y2d: 0, x3d: -0.629, y3d: 0.629, z3d: -0.629 },
    { element: "H", x2d: 45, y2d: 0, x3d: -0.629, y3d: -0.629, z3d: 0.629 },
  ],
  bonds: [
    { a: 0, b: 1, order: 1 },
    { a: 0, b: 2, order: 1 },
    { a: 0, b: 3, order: 1 },
    { a: 0, b: 4, order: 1 },
  ],
};

const NH3_STRUCTURE: SeedStructure = {
  // Trigonal pyramidal, H-N-H ~107 deg, N-H = 1.01 A
  atoms: [
    { element: "N", x2d: 0, y2d: 0, x3d: 0, y3d: 0, z3d: 0 },
    { element: "H", x2d: 0, y2d: -45, x3d: 0.936, y3d: 0, z3d: -0.379 },
    { element: "H", x2d: 39, y2d: 22, x3d: -0.468, y3d: 0.811, z3d: -0.379 },
    { element: "H", x2d: -39, y2d: 22, x3d: -0.468, y3d: -0.811, z3d: -0.379 },
  ],
  bonds: [
    { a: 0, b: 1, order: 1 },
    { a: 0, b: 2, order: 1 },
    { a: 0, b: 3, order: 1 },
  ],
};

const O2_STRUCTURE: SeedStructure = {
  atoms: [
    { element: "O", x2d: -30, y2d: 0, x3d: -0.605, y3d: 0, z3d: 0 },
    { element: "O", x2d: 30, y2d: 0, x3d: 0.605, y3d: 0, z3d: 0 },
  ],
  bonds: [{ a: 0, b: 1, order: 2 }],
};

const H2_STRUCTURE: SeedStructure = {
  atoms: [
    { element: "H", x2d: -20, y2d: 0, x3d: -0.37, y3d: 0, z3d: 0 },
    { element: "H", x2d: 20, y2d: 0, x3d: 0.37, y3d: 0, z3d: 0 },
  ],
  bonds: [{ a: 0, b: 1, order: 1 }],
};

const NAOH_STRUCTURE: SeedStructure = {
  // Na+ ionically bonded to the hydroxide ion; O-H itself is covalent.
  atoms: [
    { element: "Na", x2d: -70, y2d: 0, x3d: -2.2, y3d: 0, z3d: 0, formalCharge: 1 },
    { element: "O", x2d: 20, y2d: 0, x3d: 0, y3d: 0, z3d: 0, formalCharge: -1 },
    { element: "H", x2d: 60, y2d: -25, x3d: 0.96, y3d: 0, z3d: 0 },
  ],
  bonds: [
    { a: 0, b: 1, order: 1, type: "ionic" },
    { a: 1, b: 2, order: 1, type: "covalent" },
  ],
};

const H2O2_STRUCTURE: SeedStructure = {
  // Skewed (non-planar), O-O = 1.47 A, O-H = 0.96 A, dihedral ~95 deg approximated.
  atoms: [
    { element: "H", x2d: -90, y2d: 0, x3d: -1.55, y3d: 0.85, z3d: 0.4 },
    { element: "O", x2d: -45, y2d: 20, x3d: -0.735, y3d: 0, z3d: 0 },
    { element: "O", x2d: 45, y2d: 20, x3d: 0.735, y3d: 0, z3d: 0 },
    { element: "H", x2d: 90, y2d: 0, x3d: 1.55, y3d: 0.85, z3d: -0.4 },
  ],
  bonds: [
    { a: 0, b: 1, order: 1 },
    { a: 1, b: 2, order: 1 },
    { a: 2, b: 3, order: 1 },
  ],
};

const ACETIC_ACID_STRUCTURE: SeedStructure = {
  // CH3-C(=O)-OH. Trigonal planar carbonyl carbon, tetrahedral methyl carbon.
  atoms: [
    { element: "C", x2d: -70, y2d: 0, x3d: -1.52, y3d: 0, z3d: 0 }, // 0 methyl C
    { element: "H", x2d: -100, y2d: -30, x3d: -1.9, y3d: 0.9, z3d: 0.6 },
    { element: "H", x2d: -100, y2d: 30, x3d: -1.9, y3d: 0.9, z3d: -0.6 },
    { element: "H", x2d: -70, y2d: -45, x3d: -1.9, y3d: -1.05, z3d: 0 },
    { element: "C", x2d: 0, y2d: 0, x3d: 0, y3d: 0, z3d: 0 }, // 4 carbonyl C
    { element: "O", x2d: 25, y2d: -40, x3d: 0.61, y3d: 1.06, z3d: 0 }, // 5 carbonyl O (double bond)
    { element: "O", x2d: 40, y2d: 35, x3d: 0.68, y3d: -1.18, z3d: 0 }, // 6 hydroxyl O
    { element: "H", x2d: 80, y2d: 55, x3d: 1.58, y3d: -1.48, z3d: 0 }, // 7 hydroxyl H
  ],
  bonds: [
    { a: 0, b: 1, order: 1 },
    { a: 0, b: 2, order: 1 },
    { a: 0, b: 3, order: 1 },
    { a: 0, b: 4, order: 1 },
    { a: 4, b: 5, order: 2 },
    { a: 4, b: 6, order: 1 },
    { a: 6, b: 7, order: 1 },
  ],
};

// Reusable tetrahedral sulfate and trigonal-planar nitrate fragments, used by
// several salts below. The cation is attached with an ionic (dashed) bond to
// the fragment's central atom -- a simplified but clearly-labeled schematic,
// not a literal claim about where electron density sits.
function sulfateFragmentWithCation(cationElement: string, cationCharge: number, cationCount: number): SeedStructure {
  const atoms: SeedAtom[] = [
    { element: "S", x2d: 0, y2d: 0, x3d: 0, y3d: 0, z3d: 0 },
    { element: "O", x2d: 40, y2d: -40, x3d: 0.86, y3d: 0.86, z3d: 0.86 },
    { element: "O", x2d: 40, y2d: 40, x3d: 0.86, y3d: -0.86, z3d: -0.86 },
    // The two singly-bonded oxygens carry the ion's -2 formal charge (standard
    // Lewis-structure convention); real sulfate is a symmetric resonance
    // hybrid with the charge delocalized over all four oxygens equally.
    { element: "O", x2d: -40, y2d: -40, x3d: -0.86, y3d: 0.86, z3d: -0.86, formalCharge: -1 },
    { element: "O", x2d: -40, y2d: 40, x3d: -0.86, y3d: -0.86, z3d: 0.86, formalCharge: -1 },
  ];
  const bonds: SeedBond[] = [
    { a: 0, b: 1, order: 2 },
    { a: 0, b: 2, order: 2 },
    { a: 0, b: 3, order: 1 },
    { a: 0, b: 4, order: 1 },
  ];
  for (let i = 0; i < cationCount; i++) {
    atoms.push({ element: cationElement, x2d: -110 - i * 55, y2d: 0, x3d: -2.6 - i * 1.4, y3d: 0, z3d: 0, formalCharge: cationCharge });
    bonds.push({ a: 0, b: atoms.length - 1, order: 1, type: "ionic" });
  }
  return { atoms, bonds };
}

/**
 * Builds `nitrateCount` nitrate groups, each ionically bonded to a single
 * shared cation atom. Used both for 1:1 nitrate salts (nitrateCount=1) and
 * for divalent-cation salts with two nitrates (nitrateCount=2, e.g.
 * Pb(NO3)2) -- note the multiplicity is on the ANION side here, the mirror
 * image of sulfateFragmentWithCation where it is on the cation side.
 */
function nitrateFragmentWithCation(cationElement: string, cationCharge: number, nitrateCount: number): SeedStructure {
  const atoms: SeedAtom[] = [{ element: cationElement, x2d: 0, y2d: 0, x3d: 0, y3d: 0, z3d: 0, formalCharge: cationCharge }];
  const bonds: SeedBond[] = [];
  for (let i = 0; i < nitrateCount; i++) {
    const dirSign = i % 2 === 0 ? 1 : -1;
    const cx2d = dirSign * (100 + Math.floor(i / 2) * 90);
    const cy2d = Math.floor(i / 2) * 90 + 40;
    const cx3d = dirSign * (2.6 + Math.floor(i / 2) * 1.6);
    const cy3d = Math.floor(i / 2) * 1.8 + 1.2;
    const nIndex = atoms.length;
    atoms.push({ element: "N", x2d: cx2d, y2d: cy2d, x3d: cx3d, y3d: cy3d, z3d: 0 });
    atoms.push({ element: "O", x2d: cx2d + 45, y2d: cy2d, x3d: cx3d + 1.24, y3d: cy3d, z3d: 0 });
    atoms.push({ element: "O", x2d: cx2d - 22, y2d: cy2d + 39, x3d: cx3d - 0.62, y3d: cy3d + 1.07, z3d: 0 });
    // As with sulfate, the -1 formal charge is placed on one representative
    // singly-bonded oxygen; real nitrate delocalizes it symmetrically.
    atoms.push({ element: "O", x2d: cx2d - 22, y2d: cy2d - 39, x3d: cx3d - 0.62, y3d: cy3d - 1.07, z3d: 0, formalCharge: -1 });
    bonds.push({ a: nIndex, b: nIndex + 1, order: 2 });
    bonds.push({ a: nIndex, b: nIndex + 2, order: 1 });
    bonds.push({ a: nIndex, b: nIndex + 3, order: 1 });
    bonds.push({ a: 0, b: nIndex, order: 1, type: "ionic" });
  }
  return { atoms, bonds };
}

function ionPairStructure(cationElement: string, cationCharge: number, anionElement: string, anionCharge: number, anionCount = 1): SeedStructure {
  const atoms: SeedAtom[] = [{ element: cationElement, x2d: 0, y2d: 0, x3d: 0, y3d: 0, z3d: 0, formalCharge: cationCharge }];
  const bonds: SeedBond[] = [];
  const spread = anionCount === 1 ? [0] : [-1, 1];
  spread.forEach((dir, i) => {
    atoms.push({ element: anionElement, x2d: dir === 0 ? 70 : 70 * dir, y2d: 0, x3d: dir === 0 ? 2.5 : 2.5 * dir, y3d: 0, z3d: 0, formalCharge: anionCharge });
    bonds.push({ a: 0, b: i + 1, order: 1, type: "ionic" });
  });
  return { atoms, bonds };
}

// ---------------------------------------------------------------------------
// Seed chemicals
// ---------------------------------------------------------------------------

export const SEED_CHEMICALS: SeedChemical[] = [
  // --- Acids ---
  {
    id: "hcl",
    commonName: "Hydrochloric acid",
    iupacName: "Hydrogen chloride",
    formula: "HCl",
    casNumber: "7647-01-0",
    smiles: "Cl",
    physicalState: "aqueous",
    density: 1.19,
    meltingPointC: -114.2,
    boilingPointC: -85.0,
    isAcid: true,
    acidBaseStrength: "strong",
    chemicalClass: "acid",
    substanceColor: "#F2F6F8",
    dissociation: { cation: { formula: "H", charge: 1 }, anion: { formula: "Cl", charge: -1 } },
    aliases: ["muriatic acid", "hydrogen chloride"],
    hazardCodes: ["CORROSIVE", "TOXIC"],
    structure: HCL_STRUCTURE,
    source: STANDARD_SOURCE,
    notes:
      "Modeled as the aqueous acid (~37% w/w concentrated reagent, the common lab form). Melting/boiling points listed are for pure hydrogen chloride gas.",
  },
  {
    id: "acetic-acid",
    commonName: "Acetic acid",
    iupacName: "Ethanoic acid",
    formula: "CH3COOH",
    casNumber: "64-19-7",
    smiles: "CC(=O)O",
    physicalState: "liquid",
    density: 1.049,
    meltingPointC: 16.6,
    boilingPointC: 118.1,
    isAcid: true,
    acidBaseStrength: "weak",
    pKa: 4.76,
    chemicalClass: "acid",
    substanceColor: "#F7F5EE",
    dissociation: { cation: { formula: "H", charge: 1 }, anion: { formula: "CH3COO", charge: -1 } },
    aliases: ["ethanoic acid", "vinegar acid"],
    hazardCodes: ["CORROSIVE", "FLAMMABLE"],
    structure: ACETIC_ACID_STRUCTURE,
    source: STANDARD_SOURCE,
    notes: "Properties given for glacial (pure) acetic acid; household vinegar is a dilute (~5%) aqueous solution.",
  },

  // --- Bases ---
  {
    id: "naoh",
    commonName: "Sodium hydroxide",
    iupacName: "Sodium hydroxide",
    formula: "NaOH",
    casNumber: "1310-73-2",
    smiles: "[Na+].[OH-]",
    physicalState: "solid",
    density: 2.13,
    meltingPointC: 318,
    boilingPointC: 1388,
    isBase: true,
    acidBaseStrength: "strong",
    chemicalClass: "base",
    substanceColor: "#FFFFFF",
    dissociation: { cation: { formula: "Na", charge: 1 }, anion: { formula: "OH", charge: -1 } },
    neutralizationProducesWater: true,
    aliases: ["lye", "caustic soda"],
    hazardCodes: ["CORROSIVE"],
    structure: NAOH_STRUCTURE,
    source: STANDARD_SOURCE,
    notes: "Solid pellet form as typically stocked in a lab; dissolves readily and exothermically in water.",
  },
  {
    id: "ammonia",
    commonName: "Ammonia",
    iupacName: "Azane",
    formula: "NH3",
    casNumber: "7664-41-7",
    smiles: "N",
    physicalState: "aqueous",
    density: 0.9,
    meltingPointC: -77.7,
    boilingPointC: -33.3,
    isBase: true,
    acidBaseStrength: "weak",
    pKb: 4.75,
    chemicalClass: "base",
    substanceColor: "#F5F8F5",
    dissociation: { cation: { formula: "NH4", charge: 1 }, anion: { formula: "OH", charge: -1 } },
    aliases: ["ammonium hydroxide (aqueous)", "household ammonia"],
    hazardCodes: ["TOXIC", "CORROSIVE", "IRRITANT"],
    structure: NH3_STRUCTURE,
    source: STANDARD_SOURCE,
    notes:
      "Gas at room temperature; commonly used and modeled here as an aqueous solution. Its dissociation is written as NH4+/OH- for solubility bookkeeping, but neutralization with an acid does NOT separately release water (see docs/CHEMISTRY_ENGINE.md).",
  },

  // --- Common salts / small molecules from the seed reaction list ---
  {
    id: "nacl",
    commonName: "Sodium chloride",
    iupacName: "Sodium chloride",
    formula: "NaCl",
    casNumber: "7647-14-5",
    smiles: "[Na+].[Cl-]",
    physicalState: "solid",
    density: 2.16,
    meltingPointC: 801,
    boilingPointC: 1465,
    chemicalClass: "salt",
    substanceColor: "#FFFFFF",
    dissociation: { cation: { formula: "Na", charge: 1 }, anion: { formula: "Cl", charge: -1 } },
    aliases: ["table salt", "salt", "halite"],
    structure: ionPairStructure("Na", 1, "Cl", -1),
    source: STANDARD_SOURCE,
  },
  {
    id: "water",
    commonName: "Water",
    iupacName: "Oxidane",
    formula: "H2O",
    casNumber: "7732-18-5",
    smiles: "O",
    physicalState: "liquid",
    density: 1.0,
    meltingPointC: 0,
    boilingPointC: 100,
    chemicalClass: "other",
    substanceColor: "#CFE8F3",
    aliases: ["dihydrogen monoxide"],
    structure: WATER_STRUCTURE,
    source: STANDARD_SOURCE,
  },
  {
    id: "agno3",
    commonName: "Silver nitrate",
    formula: "AgNO3",
    casNumber: "7761-88-8",
    smiles: "[Ag+].[O-][N+](=O)[O-]",
    physicalState: "solid",
    density: 4.35,
    meltingPointC: 212,
    chemicalClass: "salt",
    substanceColor: "#FFFFFF",
    dissociation: { cation: { formula: "Ag", charge: 1 }, anion: { formula: "NO3", charge: -1 } },
    hazardCodes: ["OXIDIZING", "CORROSIVE", "ENVIRONMENTAL_HAZARD"],
    structure: nitrateFragmentWithCation("Ag", 1, 1),
    source: STANDARD_SOURCE,
    notes: "Stains skin and organic material black on prolonged light exposure due to reduction to metallic silver.",
  },
  {
    id: "agcl",
    commonName: "Silver chloride",
    formula: "AgCl",
    casNumber: "7783-90-6",
    physicalState: "solid",
    density: 5.56,
    meltingPointC: 455,
    solubilityNotes: "Insoluble in water (Ksp \u2248 1.8\u00d710\u207b\u00b9\u2070).",
    chemicalClass: "salt",
    substanceColor: "#F5F5F0",
    dissociation: { cation: { formula: "Ag", charge: 1 }, anion: { formula: "Cl", charge: -1 } },
    structure: ionPairStructure("Ag", 1, "Cl", -1),
    source: STANDARD_SOURCE,
    notes: "Classic white precipitate that darkens on exposure to light as it slowly photo-decomposes to metallic silver.",
  },
  {
    id: "nano3",
    commonName: "Sodium nitrate",
    formula: "NaNO3",
    casNumber: "7631-99-4",
    physicalState: "solid",
    density: 2.26,
    meltingPointC: 308,
    chemicalClass: "salt",
    substanceColor: "#FFFFFF",
    dissociation: { cation: { formula: "Na", charge: 1 }, anion: { formula: "NO3", charge: -1 } },
    hazardCodes: ["OXIDIZING"],
    structure: nitrateFragmentWithCation("Na", 1, 1),
    source: STANDARD_SOURCE,
  },
  {
    id: "zn",
    commonName: "Zinc",
    formula: "Zn",
    casNumber: "7440-66-6",
    physicalState: "solid",
    density: 7.14,
    meltingPointC: 419.5,
    boilingPointC: 907,
    chemicalClass: "metal",
    substanceColor: "#B7B9BD",
    isElemental: true,
    commonCationCharge: 2,
    aliases: ["zinc metal"],
    source: STANDARD_SOURCE,
  },
  {
    id: "cuso4",
    commonName: "Copper(II) sulfate",
    iupacName: "Copper(II) sulfate",
    formula: "CuSO4",
    casNumber: "7758-98-7",
    physicalState: "solid",
    density: 3.6,
    meltingPointC: 110,
    solubilityNotes: "Highly soluble in water; forms a characteristic blue solution due to the hydrated Cu2+ ion.",
    chemicalClass: "salt",
    substanceColor: "#2E7DA6",
    dissociation: { cation: { formula: "Cu", charge: 2 }, anion: { formula: "SO4", charge: -2 } },
    hazardCodes: ["TOXIC", "IRRITANT", "ENVIRONMENTAL_HAZARD"],
    aliases: ["blue vitriol", "copper sulphate"],
    structure: sulfateFragmentWithCation("Cu", 2, 1),
    source: STANDARD_SOURCE,
    notes:
      "The anhydrous solid is actually off-white/grey; the familiar blue color belongs to the pentahydrate crystal and to aqueous solutions (both contain the hydrated [Cu(H2O)6]2+ ion). This app models the anhydrous formula for stoichiometry but shows the solution color.",
  },
  {
    id: "znso4",
    commonName: "Zinc sulfate",
    formula: "ZnSO4",
    casNumber: "7733-02-0",
    physicalState: "solid",
    density: 3.54,
    meltingPointC: 680,
    chemicalClass: "salt",
    substanceColor: "#F5F5F5",
    dissociation: { cation: { formula: "Zn", charge: 2 }, anion: { formula: "SO4", charge: -2 } },
    hazardCodes: ["IRRITANT"],
    structure: sulfateFragmentWithCation("Zn", 2, 1),
    source: STANDARD_SOURCE,
  },
  {
    id: "cu",
    commonName: "Copper",
    formula: "Cu",
    casNumber: "7440-50-8",
    physicalState: "solid",
    density: 8.96,
    meltingPointC: 1085,
    boilingPointC: 2562,
    chemicalClass: "metal",
    substanceColor: "#C88033",
    isElemental: true,
    commonCationCharge: 2,
    aliases: ["copper metal"],
    source: STANDARD_SOURCE,
  },
  {
    id: "nahco3",
    commonName: "Sodium bicarbonate",
    iupacName: "Sodium hydrogen carbonate",
    formula: "NaHCO3",
    casNumber: "144-55-8",
    physicalState: "solid",
    density: 2.2,
    solubilityNotes: "Soluble in water; decomposes (rather than melting cleanly) above roughly 50\u201380 \u00b0C, releasing CO2.",
    chemicalClass: "salt",
    substanceColor: "#FFFFFF",
    dissociation: { cation: { formula: "Na", charge: 1 }, anion: { formula: "HCO3", charge: -1 } },
    aliases: ["baking soda", "bicarbonate of soda"],
    source: STANDARD_SOURCE,
  },
  {
    id: "na2co3",
    commonName: "Sodium carbonate",
    formula: "Na2CO3",
    casNumber: "497-19-8",
    physicalState: "solid",
    density: 2.54,
    meltingPointC: 851,
    chemicalClass: "salt",
    substanceColor: "#FFFFFF",
    dissociation: { cation: { formula: "Na", charge: 1 }, anion: { formula: "CO3", charge: -2 } },
    hazardCodes: ["IRRITANT"],
    aliases: ["washing soda", "soda ash"],
    source: STANDARD_SOURCE,
    notes:
      "Included alongside sodium bicarbonate to demonstrate the general acid + carbonate rule on a pairing that is not individually curated (see docs/ADDING_NEW_REACTIONS.md).",
  },
  {
    id: "co2",
    commonName: "Carbon dioxide",
    formula: "CO2",
    casNumber: "124-38-9",
    smiles: "O=C=O",
    physicalState: "gas",
    density: 1.98,
    meltingPointC: -78.5,
    chemicalClass: "other",
    substanceColor: "#E9E9E9",
    aliases: ["dry ice (solid form)"],
    structure: CO2_STRUCTURE,
    source: STANDARD_SOURCE,
    notes: "Sublimes directly from solid to gas at -78.5 \u00b0C under 1 atm; density given is for the gas at STP (g/L).",
  },
  {
    id: "ch4",
    commonName: "Methane",
    formula: "CH4",
    casNumber: "74-82-8",
    smiles: "C",
    physicalState: "gas",
    density: 0.657,
    meltingPointC: -182.5,
    boilingPointC: -161.5,
    chemicalClass: "organic",
    substanceColor: "#E9E9E9",
    hazardCodes: ["FLAMMABLE", "COMPRESSED_GAS"],
    aliases: ["natural gas (primary component)"],
    structure: CH4_STRUCTURE,
    source: STANDARD_SOURCE,
    notes: "Density given is for the gas at STP (g/L).",
  },
  {
    id: "o2",
    commonName: "Oxygen",
    formula: "O2",
    casNumber: "7782-44-7",
    physicalState: "gas",
    density: 1.429,
    meltingPointC: -218.3,
    boilingPointC: -183.0,
    chemicalClass: "molecular_element",
    substanceColor: "#E9E9E9",
    isElemental: true,
    hazardCodes: ["OXIDIZING", "COMPRESSED_GAS"],
    structure: O2_STRUCTURE,
    source: STANDARD_SOURCE,
    notes: "Density given is for the gas at STP (g/L).",
  },
  {
    id: "fe",
    commonName: "Iron",
    formula: "Fe",
    casNumber: "7439-89-6",
    physicalState: "solid",
    density: 7.87,
    meltingPointC: 1538,
    boilingPointC: 2862,
    chemicalClass: "metal",
    substanceColor: "#9A9A9A",
    isElemental: true,
    commonCationCharge: 2,
    aliases: ["iron metal", "iron filings"],
    source: STANDARD_SOURCE,
    notes:
      "Modeled here reacting only to Fe2+ (as in FeSO4) for simplicity; iron can also form Fe3+ compounds depending on conditions, which this engine does not currently distinguish.",
  },
  {
    id: "feso4",
    commonName: "Iron(II) sulfate",
    formula: "FeSO4",
    casNumber: "7720-78-7",
    physicalState: "solid",
    density: 2.84,
    chemicalClass: "salt",
    substanceColor: "#C7DFC1",
    dissociation: { cation: { formula: "Fe", charge: 2 }, anion: { formula: "SO4", charge: -2 } },
    hazardCodes: ["IRRITANT"],
    aliases: ["ferrous sulfate", "green vitriol"],
    structure: sulfateFragmentWithCation("Fe", 2, 1),
    source: STANDARD_SOURCE,
    notes: "Aqueous Fe2+ solutions are pale green.",
  },

  // --- Extra precipitation examples ---
  {
    id: "bacl2",
    commonName: "Barium chloride",
    formula: "BaCl2",
    casNumber: "10361-37-2",
    physicalState: "solid",
    density: 3.86,
    meltingPointC: 962,
    boilingPointC: 1560,
    chemicalClass: "salt",
    substanceColor: "#FFFFFF",
    dissociation: { cation: { formula: "Ba", charge: 2 }, anion: { formula: "Cl", charge: -1 } },
    hazardCodes: ["TOXIC"],
    structure: ionPairStructure("Ba", 2, "Cl", -1, 2),
    source: STANDARD_SOURCE,
  },
  {
    id: "na2so4",
    commonName: "Sodium sulfate",
    formula: "Na2SO4",
    casNumber: "7757-82-6",
    physicalState: "solid",
    density: 2.66,
    meltingPointC: 884,
    chemicalClass: "salt",
    substanceColor: "#FFFFFF",
    dissociation: { cation: { formula: "Na", charge: 1 }, anion: { formula: "SO4", charge: -2 } },
    structure: sulfateFragmentWithCation("Na", 1, 2),
    source: STANDARD_SOURCE,
  },
  {
    id: "baso4",
    commonName: "Barium sulfate",
    formula: "BaSO4",
    casNumber: "7727-43-7",
    physicalState: "solid",
    density: 4.49,
    meltingPointC: 1580,
    solubilityNotes:
      "Extremely insoluble in water (Ksp \u2248 1.1\u00d710\u207b\u00b9\u2070); this very low solubility is exactly why it is used as a medical radiocontrast agent (it passes through the body largely un-dissolved).",
    chemicalClass: "salt",
    substanceColor: "#FFFFFF",
    dissociation: { cation: { formula: "Ba", charge: 2 }, anion: { formula: "SO4", charge: -2 } },
    structure: sulfateFragmentWithCation("Ba", 2, 1),
    source: STANDARD_SOURCE,
  },
  {
    id: "ki",
    commonName: "Potassium iodide",
    formula: "KI",
    casNumber: "7681-11-0",
    physicalState: "solid",
    density: 3.12,
    meltingPointC: 681,
    boilingPointC: 1330,
    chemicalClass: "salt",
    substanceColor: "#FFFFFF",
    dissociation: { cation: { formula: "K", charge: 1 }, anion: { formula: "I", charge: -1 } },
    structure: ionPairStructure("K", 1, "I", -1),
    source: STANDARD_SOURCE,
    notes: "Can slowly develop a yellow tint on exposure to light/air as trace I2 forms.",
  },
  {
    id: "pbno32",
    commonName: "Lead(II) nitrate",
    formula: "Pb(NO3)2",
    casNumber: "10099-74-8",
    physicalState: "solid",
    density: 4.53,
    meltingPointC: 470,
    chemicalClass: "salt",
    substanceColor: "#FFFFFF",
    dissociation: { cation: { formula: "Pb", charge: 2 }, anion: { formula: "NO3", charge: -1 } },
    hazardCodes: ["TOXIC", "OXIDIZING", "ENVIRONMENTAL_HAZARD"],
    structure: nitrateFragmentWithCation("Pb", 2, 2),
    source: STANDARD_SOURCE,
  },
  {
    id: "pbi2",
    commonName: "Lead(II) iodide",
    formula: "PbI2",
    casNumber: "10101-63-0",
    physicalState: "solid",
    density: 6.16,
    meltingPointC: 402,
    solubilityNotes: "Insoluble in cold water; classic bright-yellow precipitate (the \"golden rain\" demonstration).",
    chemicalClass: "salt",
    substanceColor: "#F7D046",
    dissociation: { cation: { formula: "Pb", charge: 2 }, anion: { formula: "I", charge: -1 } },
    hazardCodes: ["TOXIC", "ENVIRONMENTAL_HAZARD"],
    structure: ionPairStructure("Pb", 2, "I", -1, 2),
    source: STANDARD_SOURCE,
  },
  {
    id: "kno3",
    commonName: "Potassium nitrate",
    formula: "KNO3",
    casNumber: "7757-79-1",
    physicalState: "solid",
    density: 2.11,
    meltingPointC: 334,
    chemicalClass: "salt",
    substanceColor: "#FFFFFF",
    dissociation: { cation: { formula: "K", charge: 1 }, anion: { formula: "NO3", charge: -1 } },
    hazardCodes: ["OXIDIZING"],
    aliases: ["saltpetre", "saltpeter"],
    structure: nitrateFragmentWithCation("K", 1, 1),
    source: STANDARD_SOURCE,
  },
  {
    id: "kcl",
    commonName: "Potassium chloride",
    formula: "KCl",
    casNumber: "7447-40-7",
    physicalState: "solid",
    density: 1.98,
    meltingPointC: 770,
    boilingPointC: 1420,
    chemicalClass: "salt",
    substanceColor: "#FFFFFF",
    dissociation: { cation: { formula: "K", charge: 1 }, anion: { formula: "Cl", charge: -1 } },
    aliases: ["salt substitute"],
    structure: ionPairStructure("K", 1, "Cl", -1),
    source: STANDARD_SOURCE,
  },
  {
    id: "nai",
    commonName: "Sodium iodide",
    formula: "NaI",
    casNumber: "7681-82-5",
    physicalState: "solid",
    density: 3.67,
    meltingPointC: 661,
    boilingPointC: 1304,
    chemicalClass: "salt",
    substanceColor: "#FFFFFF",
    dissociation: { cation: { formula: "Na", charge: 1 }, anion: { formula: "I", charge: -1 } },
    structure: ionPairStructure("Na", 1, "I", -1),
    source: STANDARD_SOURCE,
  },

  // --- Catalytic decomposition example ---
  {
    id: "h2o2",
    commonName: "Hydrogen peroxide",
    formula: "H2O2",
    casNumber: "7722-84-1",
    smiles: "OO",
    physicalState: "aqueous",
    density: 1.45,
    meltingPointC: -0.43,
    boilingPointC: 150.2,
    chemicalClass: "other",
    substanceColor: "#F2F8FA",
    hazardCodes: ["OXIDIZING", "CORROSIVE"],
    structure: H2O2_STRUCTURE,
    source: STANDARD_SOURCE,
    notes:
      "Commonly sold and used as a dilute aqueous solution (3-30% w/w); properties listed are for pure H2O2. Slowly decomposes to water and oxygen even without a catalyst; manganese dioxide dramatically speeds this up.",
  },
  {
    id: "mno2",
    commonName: "Manganese dioxide",
    formula: "MnO2",
    casNumber: "1313-13-9",
    physicalState: "solid",
    density: 5.03,
    chemicalClass: "oxide",
    substanceColor: "#3B3B3B",
    hazardCodes: ["HEALTH_HAZARD"],
    aliases: ["manganese(IV) oxide", "pyrolusite"],
    source: STANDARD_SOURCE,
    notes: "Used here purely as a catalyst for hydrogen peroxide decomposition; it is not consumed by the reaction.",
  },

  // --- Weak acid/base pair (APPROXIMATE tier demonstration) ---
  {
    id: "ammonium-acetate",
    commonName: "Ammonium acetate",
    formula: "CH3COONH4",
    casNumber: "631-61-8",
    physicalState: "solid",
    density: 1.17,
    meltingPointC: 114,
    chemicalClass: "salt",
    substanceColor: "#FFFFFF",
    aliases: ["E264"],
    source: STANDARD_SOURCE,
    notes: "Deliquescent (absorbs moisture from air); used industrially as a food-acidity regulator and buffer.",
  },

  // --- Extensibility / activity-series demonstration chemicals ---
  {
    id: "mg",
    commonName: "Magnesium",
    formula: "Mg",
    casNumber: "7439-95-4",
    physicalState: "solid",
    density: 1.74,
    meltingPointC: 650,
    boilingPointC: 1090,
    chemicalClass: "metal",
    substanceColor: "#C6C6C6",
    isElemental: true,
    commonCationCharge: 2,
    hazardCodes: ["FLAMMABLE"],
    source: STANDARD_SOURCE,
    notes: "Powder or ribbon form is flammable and burns with a brilliant white light; bulk metal is comparatively stable.",
  },
  {
    id: "mgcl2",
    commonName: "Magnesium chloride",
    formula: "MgCl2",
    casNumber: "7786-30-3",
    physicalState: "solid",
    density: 2.32,
    meltingPointC: 714,
    boilingPointC: 1412,
    chemicalClass: "salt",
    substanceColor: "#FFFFFF",
    dissociation: { cation: { formula: "Mg", charge: 2 }, anion: { formula: "Cl", charge: -1 } },
    structure: ionPairStructure("Mg", 2, "Cl", -1, 2),
    source: STANDARD_SOURCE,
    notes: "Used as a de-icing salt and (as \"nigari\") a tofu coagulant.",
  },
  {
    id: "h2",
    commonName: "Hydrogen",
    formula: "H2",
    casNumber: "1333-74-0",
    physicalState: "gas",
    density: 0.0899,
    meltingPointC: -259.2,
    boilingPointC: -252.9,
    chemicalClass: "molecular_element",
    substanceColor: "#E9E9E9",
    isElemental: true,
    hazardCodes: ["FLAMMABLE", "COMPRESSED_GAS"],
    structure: H2_STRUCTURE,
    source: STANDARD_SOURCE,
    notes: "Density given is for the gas at STP (g/L).",
  },
  {
    id: "ag",
    commonName: "Silver",
    formula: "Ag",
    casNumber: "7440-22-4",
    physicalState: "solid",
    density: 10.49,
    meltingPointC: 961.8,
    boilingPointC: 2162,
    chemicalClass: "metal",
    substanceColor: "#C0C0C0",
    isElemental: true,
    source: STANDARD_SOURCE,
  },
  {
    id: "cuno32",
    commonName: "Copper(II) nitrate",
    formula: "Cu(NO3)2",
    casNumber: "3251-23-8",
    physicalState: "solid",
    density: 3.05,
    solubilityNotes: "Anhydrous form decomposes on heating rather than melting cleanly (\u2248170 \u00b0C).",
    chemicalClass: "salt",
    substanceColor: "#2E7DA6",
    dissociation: { cation: { formula: "Cu", charge: 2 }, anion: { formula: "NO3", charge: -1 } },
    hazardCodes: ["OXIDIZING", "IRRITANT"],
    structure: nitrateFragmentWithCation("Cu", 2, 2),
    source: STANDARD_SOURCE,
  },
  {
    id: "propane",
    commonName: "Propane",
    formula: "C3H8",
    casNumber: "74-98-6",
    smiles: "CCC",
    physicalState: "gas",
    density: 1.83,
    meltingPointC: -187.7,
    boilingPointC: -42.1,
    chemicalClass: "organic",
    substanceColor: "#E9E9E9",
    hazardCodes: ["FLAMMABLE", "COMPRESSED_GAS"],
    aliases: ["LPG (major component)"],
    source: STANDARD_SOURCE,
    notes: "Density given is for the gas at STP (g/L); included to demonstrate the general combustion rule on a fuel that is not individually curated.",
  },
  {
    id: "sodium-acetate",
    commonName: "Sodium acetate",
    formula: "CH3COONa",
    casNumber: "127-09-3",
    physicalState: "solid",
    density: 1.53,
    meltingPointC: 324,
    chemicalClass: "salt",
    substanceColor: "#FFFFFF",
    dissociation: { cation: { formula: "Na", charge: 1 }, anion: { formula: "CH3COO", charge: -1 } },
    hazardCodes: ["IRRITANT"],
    aliases: ["sodium ethanoate", "hot ice"],
    source: STANDARD_SOURCE,
  },
  {
    id: "ammonium-chloride",
    commonName: "Ammonium chloride",
    formula: "NH4Cl",
    casNumber: "12125-02-9",
    physicalState: "solid",
    density: 1.53,
    meltingPointC: 338,
    chemicalClass: "salt",
    substanceColor: "#FFFFFF",
    dissociation: { cation: { formula: "NH4", charge: 1 }, anion: { formula: "Cl", charge: -1 } },
    hazardCodes: ["IRRITANT"],
    aliases: ["sal ammoniac"],
    source: STANDARD_SOURCE,
    notes: "Sublimes at 338 °C into ammonia and hydrogen chloride gas.",
  },
  {
    id: "cuoh2",
    commonName: "Copper(II) hydroxide",
    formula: "Cu(OH)2",
    casNumber: "20427-59-2",
    physicalState: "solid",
    density: 3.37,
    meltingPointC: 80,
    chemicalClass: "base",
    substanceColor: "#1E88E5",
    dissociation: { cation: { formula: "Cu", charge: 2 }, anion: { formula: "OH", charge: -1 } },
    hazardCodes: ["IRRITANT", "ENVIRONMENTAL_HAZARD"],
    source: STANDARD_SOURCE,
    notes: "Distinctive gelatinous bright blue precipitate; thermally decomposes to black CuO at ~80 °C.",
  },
  {
    id: "agi",
    commonName: "Silver iodide",
    formula: "AgI",
    casNumber: "7783-96-2",
    physicalState: "solid",
    density: 5.68,
    meltingPointC: 558,
    chemicalClass: "salt",
    substanceColor: "#FFF9A6",
    dissociation: { cation: { formula: "Ag", charge: 1 }, anion: { formula: "I", charge: -1 } },
    hazardCodes: ["ENVIRONMENTAL_HAZARD"],
    source: STANDARD_SOURCE,
    notes: "Pale bright yellow precipitate; photosensitive and historically used in cloud seeding and photography.",
  },
  {
    id: "cucl2",
    commonName: "Copper(II) chloride",
    formula: "CuCl2",
    casNumber: "7447-39-4",
    physicalState: "solid",
    density: 3.38,
    meltingPointC: 498,
    chemicalClass: "salt",
    substanceColor: "#1B8A70",
    dissociation: { cation: { formula: "Cu", charge: 2 }, anion: { formula: "Cl", charge: -1 } },
    hazardCodes: ["TOXIC", "IRRITANT", "ENVIRONMENTAL_HAZARD"],
    aliases: ["cupric chloride"],
    source: STANDARD_SOURCE,
    notes: "Anhydrous is brownish-yellow; forms brilliant blue-green aqueous solutions.",
  },
  {
    id: "nh4no3",
    commonName: "Ammonium nitrate",
    formula: "NH4NO3",
    casNumber: "6484-52-2",
    physicalState: "solid",
    density: 1.72,
    meltingPointC: 169.6,
    chemicalClass: "salt",
    substanceColor: "#FFFFFF",
    dissociation: { cation: { formula: "NH4", charge: 1 }, anion: { formula: "NO3", charge: -1 } },
    hazardCodes: ["OXIDIZING", "IRRITANT"],
    source: STANDARD_SOURCE,
    notes: "Dissolves highly endothermically in water (commercial instant cold packs).",
  },
  {
    id: "cacl2",
    commonName: "Calcium chloride",
    formula: "CaCl2",
    casNumber: "10043-52-4",
    physicalState: "solid",
    density: 2.15,
    meltingPointC: 772,
    chemicalClass: "salt",
    substanceColor: "#FFFFFF",
    dissociation: { cation: { formula: "Ca", charge: 2 }, anion: { formula: "Cl", charge: -1 } },
    hazardCodes: ["IRRITANT"],
    source: STANDARD_SOURCE,
    notes: "Exothermically dissolves in water; widely used as a de-icing agent and in chemical hot packs.",
  },
  {
    id: "mgo",
    commonName: "Magnesium oxide",
    formula: "MgO",
    casNumber: "1309-48-4",
    physicalState: "solid",
    density: 3.58,
    meltingPointC: 2852,
    chemicalClass: "oxide",
    substanceColor: "#FFFFFF",
    aliases: ["magnesia"],
    source: STANDARD_SOURCE,
    notes: "White hygroscopic solid; produced by burning magnesium metal ribbon in air or oxygen.",
  },
  {
    id: "caco3",
    commonName: "Calcium carbonate",
    formula: "CaCO3",
    casNumber: "471-34-1",
    physicalState: "solid",
    density: 2.71,
    meltingPointC: 825,
    chemicalClass: "salt",
    substanceColor: "#FFFFFF",
    dissociation: { cation: { formula: "Ca", charge: 2 }, anion: { formula: "CO3", charge: -2 } },
    aliases: ["limestone", "chalk", "calcite", "marble"],
    source: STANDARD_SOURCE,
    notes: "Virtually insoluble in neutral water; reacts readily with acids to liberate carbon dioxide gas.",
  },
  {
    id: "zncl2",
    commonName: "Zinc chloride",
    formula: "ZnCl2",
    casNumber: "7646-85-7",
    physicalState: "solid",
    density: 2.907,
    meltingPointC: 290,
    chemicalClass: "salt",
    substanceColor: "#FFFFFF",
    dissociation: { cation: { formula: "Zn", charge: 2 }, anion: { formula: "Cl", charge: -1 } },
    hazardCodes: ["CORROSIVE", "ENVIRONMENTAL_HAZARD"],
    source: STANDARD_SOURCE,
    notes: "Highly deliquescent white salt formed by the reaction of zinc with hydrochloric acid.",
  },
  {
    id: "fecl2",
    commonName: "Iron(II) chloride",
    formula: "FeCl2",
    casNumber: "7758-94-3",
    physicalState: "solid",
    density: 3.16,
    meltingPointC: 677,
    chemicalClass: "salt",
    substanceColor: "#E0F2E9",
    dissociation: { cation: { formula: "Fe", charge: 2 }, anion: { formula: "Cl", charge: -1 } },
    hazardCodes: ["CORROSIVE", "TOXIC"],
    aliases: ["ferrous chloride"],
    source: STANDARD_SOURCE,
    notes: "Paramagnetic solid; aqueous solutions have a characteristic pale green color.",
  },
  {
    id: "mgso4",
    commonName: "Magnesium sulfate",
    formula: "MgSO4",
    casNumber: "7487-88-9",
    physicalState: "solid",
    density: 2.66,
    meltingPointC: 1124,
    chemicalClass: "salt",
    substanceColor: "#FFFFFF",
    dissociation: { cation: { formula: "Mg", charge: 2 }, anion: { formula: "SO4", charge: -2 } },
    aliases: ["Epsom salt"],
    source: STANDARD_SOURCE,
    notes: "Highly soluble in water; odorless white crystalline solid.",
  },
];
