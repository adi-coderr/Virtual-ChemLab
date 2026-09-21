/**
 * Periodic table reference data.
 *
 * Two separate concerns, deliberately kept apart:
 *
 * 1. `ELEMENT_SYMBOLS` - the full set of all 118 recognized element symbols.
 *    This is what the formula parser checks against, so a formula containing
 *    any real element (even one this app has no other data for) parses
 *    successfully rather than being rejected as "invalid".
 *
 * 2. `ELEMENT_DATA` - detailed data (standard atomic weight, CPK visualization
 *    color, covalent radius) for the subset of elements this application
 *    currently has curated data for. Molar-mass calculation and 3D rendering
 *    both consult this map and will raise a clear, explicit error for an
 *    element that is missing here, rather than silently guessing a value.
 *    Extending coverage to more elements means adding an entry here -
 *    see docs/ADDING_NEW_REACTIONS.md.
 */

export const ELEMENT_SYMBOLS: Set<string> = new Set([
  "H", "He", "Li", "Be", "B", "C", "N", "O", "F", "Ne",
  "Na", "Mg", "Al", "Si", "P", "S", "Cl", "Ar",
  "K", "Ca", "Sc", "Ti", "V", "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn",
  "Ga", "Ge", "As", "Se", "Br", "Kr",
  "Rb", "Sr", "Y", "Zr", "Nb", "Mo", "Tc", "Ru", "Rh", "Pd", "Ag", "Cd",
  "In", "Sn", "Sb", "Te", "I", "Xe",
  "Cs", "Ba", "La", "Ce", "Pr", "Nd", "Pm", "Sm", "Eu", "Gd", "Tb", "Dy",
  "Ho", "Er", "Tm", "Yb", "Lu",
  "Hf", "Ta", "W", "Re", "Os", "Ir", "Pt", "Au", "Hg", "Tl", "Pb", "Bi", "Po", "At", "Rn",
  "Fr", "Ra", "Ac", "Th", "Pa", "U", "Np", "Pu", "Am", "Cm", "Bk", "Cf", "Es", "Fm", "Md", "No", "Lr",
  "Rf", "Db", "Sg", "Bh", "Hs", "Mt", "Ds", "Rg", "Cn", "Nh", "Fl", "Mc", "Lv", "Ts", "Og",
]);

export interface ElementInfo {
  symbol: string;
  name: string;
  atomicNumber: number;
  /** Standard atomic weight, unitless (g/mol numerically). */
  atomicMass: number;
  /** CPK/Jmol-convention visualization color. */
  cpkColor: string;
  /** Approximate covalent radius in picometers, used only to scale 3D atom spheres. */
  covalentRadiusPm: number;
  category: string;
}

const ELEMENT_LIST: ElementInfo[] = [
  { symbol: "H", name: "Hydrogen", atomicNumber: 1, atomicMass: 1.008, cpkColor: "#F2F2F2", covalentRadiusPm: 31, category: "nonmetal" },
  { symbol: "He", name: "Helium", atomicNumber: 2, atomicMass: 4.003, cpkColor: "#D9FFFF", covalentRadiusPm: 28, category: "noble_gas" },
  { symbol: "Li", name: "Lithium", atomicNumber: 3, atomicMass: 6.94, cpkColor: "#CC80FF", covalentRadiusPm: 128, category: "alkali_metal" },
  { symbol: "Be", name: "Beryllium", atomicNumber: 4, atomicMass: 9.012, cpkColor: "#C2FF00", covalentRadiusPm: 96, category: "alkaline_earth_metal" },
  { symbol: "B", name: "Boron", atomicNumber: 5, atomicMass: 10.81, cpkColor: "#FFB5B5", covalentRadiusPm: 84, category: "metalloid" },
  { symbol: "C", name: "Carbon", atomicNumber: 6, atomicMass: 12.011, cpkColor: "#303030", covalentRadiusPm: 76, category: "nonmetal" },
  { symbol: "N", name: "Nitrogen", atomicNumber: 7, atomicMass: 14.007, cpkColor: "#3050F8", covalentRadiusPm: 71, category: "nonmetal" },
  { symbol: "O", name: "Oxygen", atomicNumber: 8, atomicMass: 15.999, cpkColor: "#FF0D0D", covalentRadiusPm: 66, category: "nonmetal" },
  { symbol: "F", name: "Fluorine", atomicNumber: 9, atomicMass: 18.998, cpkColor: "#90E050", covalentRadiusPm: 57, category: "halogen" },
  { symbol: "Ne", name: "Neon", atomicNumber: 10, atomicMass: 20.180, cpkColor: "#B3E3F5", covalentRadiusPm: 58, category: "noble_gas" },
  { symbol: "Na", name: "Sodium", atomicNumber: 11, atomicMass: 22.990, cpkColor: "#AB5CF2", covalentRadiusPm: 166, category: "alkali_metal" },
  { symbol: "Mg", name: "Magnesium", atomicNumber: 12, atomicMass: 24.305, cpkColor: "#8AFF00", covalentRadiusPm: 141, category: "alkaline_earth_metal" },
  { symbol: "Al", name: "Aluminium", atomicNumber: 13, atomicMass: 26.982, cpkColor: "#BFA6A6", covalentRadiusPm: 121, category: "post_transition_metal" },
  { symbol: "Si", name: "Silicon", atomicNumber: 14, atomicMass: 28.085, cpkColor: "#F0C8A0", covalentRadiusPm: 111, category: "metalloid" },
  { symbol: "P", name: "Phosphorus", atomicNumber: 15, atomicMass: 30.974, cpkColor: "#FF8000", covalentRadiusPm: 107, category: "nonmetal" },
  { symbol: "S", name: "Sulfur", atomicNumber: 16, atomicMass: 32.06, cpkColor: "#FFFF30", covalentRadiusPm: 105, category: "nonmetal" },
  { symbol: "Cl", name: "Chlorine", atomicNumber: 17, atomicMass: 35.45, cpkColor: "#1FF01F", covalentRadiusPm: 102, category: "halogen" },
  { symbol: "Ar", name: "Argon", atomicNumber: 18, atomicMass: 39.948, cpkColor: "#80D1E3", covalentRadiusPm: 106, category: "noble_gas" },
  { symbol: "K", name: "Potassium", atomicNumber: 19, atomicMass: 39.098, cpkColor: "#8F40D4", covalentRadiusPm: 203, category: "alkali_metal" },
  { symbol: "Ca", name: "Calcium", atomicNumber: 20, atomicMass: 40.078, cpkColor: "#3DFF00", covalentRadiusPm: 176, category: "alkaline_earth_metal" },
  { symbol: "Sc", name: "Scandium", atomicNumber: 21, atomicMass: 44.956, cpkColor: "#E6E6E6", covalentRadiusPm: 170, category: "transition_metal" },
  { symbol: "Ti", name: "Titanium", atomicNumber: 22, atomicMass: 47.867, cpkColor: "#BFC2C7", covalentRadiusPm: 160, category: "transition_metal" },
  { symbol: "V", name: "Vanadium", atomicNumber: 23, atomicMass: 50.942, cpkColor: "#A6A6AB", covalentRadiusPm: 153, category: "transition_metal" },
  { symbol: "Cr", name: "Chromium", atomicNumber: 24, atomicMass: 51.996, cpkColor: "#8A99C7", covalentRadiusPm: 139, category: "transition_metal" },
  { symbol: "Mn", name: "Manganese", atomicNumber: 25, atomicMass: 54.938, cpkColor: "#9C7AC7", covalentRadiusPm: 139, category: "transition_metal" },
  { symbol: "Fe", name: "Iron", atomicNumber: 26, atomicMass: 55.845, cpkColor: "#E06633", covalentRadiusPm: 132, category: "transition_metal" },
  { symbol: "Co", name: "Cobalt", atomicNumber: 27, atomicMass: 58.933, cpkColor: "#F090A0", covalentRadiusPm: 126, category: "transition_metal" },
  { symbol: "Ni", name: "Nickel", atomicNumber: 28, atomicMass: 58.693, cpkColor: "#50D050", covalentRadiusPm: 124, category: "transition_metal" },
  { symbol: "Cu", name: "Copper", atomicNumber: 29, atomicMass: 63.546, cpkColor: "#C88033", covalentRadiusPm: 132, category: "transition_metal" },
  { symbol: "Zn", name: "Zinc", atomicNumber: 30, atomicMass: 65.38, cpkColor: "#7D80B0", covalentRadiusPm: 122, category: "transition_metal" },
  { symbol: "Ga", name: "Gallium", atomicNumber: 31, atomicMass: 69.723, cpkColor: "#C28F8F", covalentRadiusPm: 122, category: "post_transition_metal" },
  { symbol: "Ge", name: "Germanium", atomicNumber: 32, atomicMass: 72.630, cpkColor: "#668F8F", covalentRadiusPm: 120, category: "metalloid" },
  { symbol: "As", name: "Arsenic", atomicNumber: 33, atomicMass: 74.922, cpkColor: "#BD80E3", covalentRadiusPm: 119, category: "metalloid" },
  { symbol: "Se", name: "Selenium", atomicNumber: 34, atomicMass: 78.971, cpkColor: "#FFA100", covalentRadiusPm: 120, category: "nonmetal" },
  { symbol: "Br", name: "Bromine", atomicNumber: 35, atomicMass: 79.904, cpkColor: "#A62929", covalentRadiusPm: 120, category: "halogen" },
  { symbol: "Kr", name: "Krypton", atomicNumber: 36, atomicMass: 83.798, cpkColor: "#5CB8D1", covalentRadiusPm: 116, category: "noble_gas" },
  { symbol: "Rb", name: "Rubidium", atomicNumber: 37, atomicMass: 85.468, cpkColor: "#702EB0", covalentRadiusPm: 220, category: "alkali_metal" },
  { symbol: "Sr", name: "Strontium", atomicNumber: 38, atomicMass: 87.62, cpkColor: "#00FF00", covalentRadiusPm: 195, category: "alkaline_earth_metal" },
  { symbol: "Ag", name: "Silver", atomicNumber: 47, atomicMass: 107.868, cpkColor: "#C0C0C0", covalentRadiusPm: 145, category: "transition_metal" },
  { symbol: "Cd", name: "Cadmium", atomicNumber: 48, atomicMass: 112.414, cpkColor: "#FFD98F", covalentRadiusPm: 144, category: "transition_metal" },
  { symbol: "Sn", name: "Tin", atomicNumber: 50, atomicMass: 118.710, cpkColor: "#668080", covalentRadiusPm: 139, category: "post_transition_metal" },
  { symbol: "Sb", name: "Antimony", atomicNumber: 51, atomicMass: 121.760, cpkColor: "#9E63B5", covalentRadiusPm: 139, category: "metalloid" },
  { symbol: "I", name: "Iodine", atomicNumber: 53, atomicMass: 126.904, cpkColor: "#940094", covalentRadiusPm: 139, category: "halogen" },
  { symbol: "Xe", name: "Xenon", atomicNumber: 54, atomicMass: 131.293, cpkColor: "#429EB0", covalentRadiusPm: 140, category: "noble_gas" },
  { symbol: "Cs", name: "Caesium", atomicNumber: 55, atomicMass: 132.905, cpkColor: "#57178F", covalentRadiusPm: 244, category: "alkali_metal" },
  { symbol: "Ba", name: "Barium", atomicNumber: 56, atomicMass: 137.327, cpkColor: "#00C900", covalentRadiusPm: 149, category: "alkaline_earth_metal" },
  { symbol: "W", name: "Tungsten", atomicNumber: 74, atomicMass: 183.84, cpkColor: "#2194D6", covalentRadiusPm: 162, category: "transition_metal" },
  { symbol: "Pt", name: "Platinum", atomicNumber: 78, atomicMass: 195.085, cpkColor: "#D0D0E0", covalentRadiusPm: 136, category: "transition_metal" },
  { symbol: "Au", name: "Gold", atomicNumber: 79, atomicMass: 196.967, cpkColor: "#FFD123", covalentRadiusPm: 136, category: "transition_metal" },
  { symbol: "Hg", name: "Mercury", atomicNumber: 80, atomicMass: 200.592, cpkColor: "#B8B8D0", covalentRadiusPm: 132, category: "transition_metal" },
  { symbol: "Pb", name: "Lead", atomicNumber: 82, atomicMass: 207.2, cpkColor: "#575961", covalentRadiusPm: 146, category: "post_transition_metal" },
  { symbol: "Bi", name: "Bismuth", atomicNumber: 83, atomicMass: 208.980, cpkColor: "#9E4FB5", covalentRadiusPm: 148, category: "post_transition_metal" },
];

export const ELEMENT_DATA: Map<string, ElementInfo> = new Map(ELEMENT_LIST.map((e) => [e.symbol, e]));

export function getElementInfo(symbol: string): ElementInfo | undefined {
  return ELEMENT_DATA.get(symbol);
}

export function requireElementInfo(symbol: string): ElementInfo {
  const info = ELEMENT_DATA.get(symbol);
  if (!info) {
    throw new Error(
      `No curated data for element "${symbol}" yet. Add an entry to ELEMENT_LIST in elementData.ts before using it in a chemical record.`
    );
  }
  return info;
}
