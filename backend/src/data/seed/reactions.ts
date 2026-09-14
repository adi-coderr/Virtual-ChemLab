import type { EnergyClassification, ObservableEffectType, ReactionType } from "../../chemistry-engine/types.js";

export interface SeedReactionSpecies {
  chemicalId: string;
  coefficient: number;
  isByproduct?: boolean;
}

export interface SeedObservableEffect {
  type: ObservableEffectType;
  description: string;
  relatedChemicalId?: string;
  colorFrom?: string;
  colorTo?: string;
}

export interface SeedReaction {
  id: string;
  name: string;
  reactionType: ReactionType;
  reactants: SeedReactionSpecies[];
  products: SeedReactionSpecies[];
  equationDisplay: string;
  netIonicEquation?: string;
  confidenceScore: number;
  energyClassification: EnergyClassification;
  temperatureMinC?: number;
  temperatureMaxC?: number;
  solvent?: string;
  catalystChemicalId?: string;
  experimentalStatus: "experimentally_verified" | "rule_derived" | "heuristic";
  observableEffects: SeedObservableEffect[];
  source: string;
  safetyNotes?: string;
}

const TEXTBOOK_SOURCE =
  "Standard general-chemistry textbook reaction (documented in essentially every intro chemistry text, e.g. Zumdahl's Chemistry or Brown/LeMay/Bursten's Chemistry: The Central Science); not a citation to a specific paper.";

export const SEED_REACTIONS: SeedReaction[] = [
  {
    id: "hcl-naoh-neutralization",
    name: "Neutralization of hydrochloric acid with sodium hydroxide",
    reactionType: "acid_base_neutralization",
    reactants: [
      { chemicalId: "hcl", coefficient: 1 },
      { chemicalId: "naoh", coefficient: 1 },
    ],
    products: [
      { chemicalId: "nacl", coefficient: 1 },
      { chemicalId: "water", coefficient: 1, isByproduct: true },
    ],
    equationDisplay: "HCl + NaOH \u2192 NaCl + H2O",
    netIonicEquation: "H+ + OH\u207b \u2192 H2O",
    confidenceScore: 0.99,
    energyClassification: "exothermic",
    temperatureMinC: 0,
    temperatureMaxC: 100,
    solvent: "water",
    experimentalStatus: "experimentally_verified",
    observableEffects: [{ type: "temperature_increase", description: "The mixture warms noticeably; strong acid/strong base neutralization is strongly exothermic." }],
    source: TEXTBOOK_SOURCE,
    safetyNotes: "Both reactants are corrosive; wear eye protection and gloves, and add acid to base (or vice versa per lab protocol) slowly to control heat release.",
  },
  {
    id: "agno3-nacl-precipitation",
    name: "Precipitation of silver chloride from silver nitrate and sodium chloride",
    reactionType: "precipitation",
    reactants: [
      { chemicalId: "agno3", coefficient: 1 },
      { chemicalId: "nacl", coefficient: 1 },
    ],
    products: [
      { chemicalId: "agcl", coefficient: 1 },
      { chemicalId: "nano3", coefficient: 1, isByproduct: true },
    ],
    equationDisplay: "AgNO3 + NaCl \u2192 AgCl + NaNO3",
    netIonicEquation: "Ag+ + Cl\u207b \u2192 AgCl(s)",
    confidenceScore: 0.99,
    energyClassification: "unknown",
    temperatureMinC: 0,
    temperatureMaxC: 100,
    solvent: "water",
    experimentalStatus: "experimentally_verified",
    observableEffects: [
      { type: "precipitation", description: "A white, curd-like precipitate of silver chloride forms immediately.", relatedChemicalId: "agcl" },
    ],
    source: TEXTBOOK_SOURCE,
    safetyNotes: "Silver nitrate stains skin/clothing and is an environmental hazard; avoid drain disposal.",
  },
  {
    id: "zn-cuso4-displacement",
    name: "Displacement of copper by zinc",
    reactionType: "single_displacement",
    reactants: [
      { chemicalId: "zn", coefficient: 1 },
      { chemicalId: "cuso4", coefficient: 1 },
    ],
    products: [
      { chemicalId: "znso4", coefficient: 1 },
      { chemicalId: "cu", coefficient: 1 },
    ],
    equationDisplay: "Zn + CuSO4 \u2192 ZnSO4 + Cu",
    netIonicEquation: "Zn + Cu2+ \u2192 Zn2+ + Cu",
    confidenceScore: 0.98,
    energyClassification: "exothermic",
    temperatureMinC: 0,
    temperatureMaxC: 100,
    solvent: "water",
    experimentalStatus: "experimentally_verified",
    observableEffects: [
      { type: "color_change", description: "The blue CuSO4 solution fades as reddish copper metal deposits on the zinc surface.", relatedChemicalId: "cu", colorFrom: "#2E7DA6", colorTo: "#F5F5F5" },
    ],
    source: TEXTBOOK_SOURCE,
    safetyNotes: "Low hazard; copper sulfate solution is toxic if ingested and is an environmental hazard.",
  },
  {
    id: "nahco3-hcl-gas-evolution",
    name: "Reaction of sodium bicarbonate with hydrochloric acid",
    reactionType: "gas_evolution",
    reactants: [
      { chemicalId: "nahco3", coefficient: 1 },
      { chemicalId: "hcl", coefficient: 1 },
    ],
    products: [
      { chemicalId: "nacl", coefficient: 1 },
      { chemicalId: "water", coefficient: 1, isByproduct: true },
      { chemicalId: "co2", coefficient: 1, isByproduct: true },
    ],
    equationDisplay: "NaHCO3 + HCl \u2192 NaCl + H2O + CO2",
    confidenceScore: 0.98,
    energyClassification: "endothermic",
    temperatureMinC: 0,
    temperatureMaxC: 100,
    solvent: "water",
    experimentalStatus: "experimentally_verified",
    observableEffects: [{ type: "gas_evolution", description: "Vigorous fizzing as CO2 gas bubbles out of solution.", relatedChemicalId: "co2" }],
    source: TEXTBOOK_SOURCE,
    safetyNotes: "Low hazard overall; the HCl itself is corrosive.",
  },
  {
    id: "ch4-combustion",
    name: "Complete combustion of methane",
    reactionType: "combustion",
    reactants: [
      { chemicalId: "ch4", coefficient: 1 },
      { chemicalId: "o2", coefficient: 2 },
    ],
    products: [
      { chemicalId: "co2", coefficient: 1 },
      { chemicalId: "water", coefficient: 2 },
    ],
    equationDisplay: "CH4 + 2O2 \u2192 CO2 + 2H2O",
    confidenceScore: 0.99,
    energyClassification: "exothermic",
    experimentalStatus: "experimentally_verified",
    observableEffects: [{ type: "temperature_increase", description: "Burns with a pale blue flame, releasing substantial heat and light." }],
    source: TEXTBOOK_SOURCE,
    safetyNotes: "Methane is flammable and forms explosive mixtures with air (5-15% by volume); requires an ignition source and adequate ventilation. This app simulates the chemistry only -- it is not an ignition procedure.",
  },
  {
    id: "fe-cuso4-displacement",
    name: "Displacement of copper by iron",
    reactionType: "single_displacement",
    reactants: [
      { chemicalId: "fe", coefficient: 1 },
      { chemicalId: "cuso4", coefficient: 1 },
    ],
    products: [
      { chemicalId: "feso4", coefficient: 1 },
      { chemicalId: "cu", coefficient: 1 },
    ],
    equationDisplay: "Fe + CuSO4 \u2192 FeSO4 + Cu",
    netIonicEquation: "Fe + Cu2+ \u2192 Fe2+ + Cu",
    confidenceScore: 0.98,
    energyClassification: "exothermic",
    temperatureMinC: 0,
    temperatureMaxC: 100,
    solvent: "water",
    experimentalStatus: "experimentally_verified",
    observableEffects: [
      { type: "color_change", description: "The blue CuSO4 solution fades toward pale green (Fe2+) as copper metal deposits on the iron.", relatedChemicalId: "cu", colorFrom: "#2E7DA6", colorTo: "#C7DFC1" },
    ],
    source: TEXTBOOK_SOURCE,
  },
  {
    id: "bacl2-na2so4-precipitation",
    name: "Precipitation of barium sulfate",
    reactionType: "precipitation",
    reactants: [
      { chemicalId: "bacl2", coefficient: 1 },
      { chemicalId: "na2so4", coefficient: 1 },
    ],
    products: [
      { chemicalId: "baso4", coefficient: 1 },
      { chemicalId: "nacl", coefficient: 2, isByproduct: true },
    ],
    equationDisplay: "BaCl2 + Na2SO4 \u2192 BaSO4 + 2NaCl",
    netIonicEquation: "Ba2+ + SO4^2\u207b \u2192 BaSO4(s)",
    confidenceScore: 0.98,
    energyClassification: "unknown",
    temperatureMinC: 0,
    temperatureMaxC: 100,
    solvent: "water",
    experimentalStatus: "experimentally_verified",
    observableEffects: [{ type: "precipitation", description: "A dense white precipitate of barium sulfate forms immediately.", relatedChemicalId: "baso4" }],
    source: TEXTBOOK_SOURCE,
    safetyNotes: "Soluble barium salts (the reactant BaCl2) are toxic; the product BaSO4 itself is essentially inert and non-toxic due to its extreme insolubility.",
  },
  {
    id: "pbno32-ki-precipitation",
    name: "Precipitation of lead(II) iodide (\"golden rain\")",
    reactionType: "precipitation",
    reactants: [
      { chemicalId: "pbno32", coefficient: 1 },
      { chemicalId: "ki", coefficient: 2 },
    ],
    products: [
      { chemicalId: "pbi2", coefficient: 1 },
      { chemicalId: "kno3", coefficient: 2, isByproduct: true },
    ],
    equationDisplay: "Pb(NO3)2 + 2KI \u2192 PbI2 + 2KNO3",
    netIonicEquation: "Pb2+ + 2I\u207b \u2192 PbI2(s)",
    confidenceScore: 0.98,
    energyClassification: "unknown",
    temperatureMinC: 0,
    temperatureMaxC: 100,
    solvent: "water",
    experimentalStatus: "experimentally_verified",
    observableEffects: [
      { type: "precipitation", description: "A bright yellow precipitate forms; when done hot and allowed to cool slowly, it crystallizes in shimmering flakes (the classic \"golden rain\" demonstration).", relatedChemicalId: "pbi2" },
    ],
    source: TEXTBOOK_SOURCE,
    safetyNotes: "Lead compounds are toxic and an environmental hazard; avoid skin contact and drain disposal.",
  },
  {
    id: "h2o2-decomposition",
    name: "Catalytic decomposition of hydrogen peroxide",
    reactionType: "decomposition",
    reactants: [{ chemicalId: "h2o2", coefficient: 2 }],
    products: [
      { chemicalId: "water", coefficient: 2 },
      { chemicalId: "o2", coefficient: 1, isByproduct: true },
    ],
    equationDisplay: "2H2O2 \u2192 2H2O + O2",
    confidenceScore: 0.97,
    energyClassification: "exothermic",
    catalystChemicalId: "mno2",
    experimentalStatus: "experimentally_verified",
    observableEffects: [
      { type: "gas_evolution", description: "Oxygen gas bubbles vigorously out of solution; with a catalyst present the reaction can proceed fast enough to produce visible foam and heat.", relatedChemicalId: "o2" },
      { type: "temperature_increase", description: "Noticeably exothermic, especially with a catalyst speeding the reaction." },
    ],
    source: TEXTBOOK_SOURCE,
    safetyNotes: "H2O2 is oxidizing/corrosive at higher concentrations; the catalyzed decomposition (\"elephant toothpaste\" style demonstrations) can produce hot foam -- keep away from skin and eyes.",
  },
];
