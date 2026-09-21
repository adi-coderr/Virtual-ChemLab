export type PhysicalState = "solid" | "liquid" | "gas" | "aqueous" | "unknown";
export type AcidBaseStrength = "strong" | "weak" | "none";
export type ConfidenceTier = "SUPPORTED" | "PREDICTED" | "APPROXIMATE" | "UNKNOWN";
export type ReactionStatus = "REACTION" | "NO_REACTION" | "UNSUPPORTED";
export type ReactionType =
  | "acid_base_neutralization"
  | "precipitation"
  | "single_displacement"
  | "double_displacement"
  | "combustion"
  | "gas_evolution"
  | "synthesis"
  | "decomposition"
  | "redox_other"
  | "dissolution"
  | "unclassified";
export type EnergyClassification = "exothermic" | "endothermic" | "unknown";
export type ObservableEffectType =
  | "color_change"
  | "precipitation"
  | "gas_evolution"
  | "temperature_increase"
  | "temperature_decrease"
  | "dissolution"
  | "phase_change"
  | "effervescence";

export interface Hazard {
  code: string;
  label: string;
  description: string;
  severity: "low" | "medium" | "high" | "extreme";
}

export interface AtomRecord {
  atomIndex: number;
  element: string;
  x2d: number;
  y2d: number;
  x3d: number;
  y3d: number;
  z3d: number;
  formalCharge?: number;
}

export interface BondRecord {
  atomIndex1: number;
  atomIndex2: number;
  order: 1 | 2 | 3;
  type: "covalent" | "ionic";
}

export interface MoleculeStructure {
  atoms: AtomRecord[];
  bonds: BondRecord[];
  curated: boolean;
}

export interface Provenance {
  source: string;
  reference?: string;
  lastVerifiedDate?: string;
  confidence: "high" | "medium" | "low";
  dataVersion: string;
}

export interface Chemical {
  id: string;
  commonName: string;
  iupacName?: string;
  formula: string;
  composition: Record<string, number>;
  charge: number;
  molarMass: number;
  casNumber?: string;
  smiles?: string;
  physicalState: PhysicalState;
  density?: number;
  meltingPointC?: number;
  boilingPointC?: number;
  solubilityNotes?: string;
  isAcid: boolean;
  isBase: boolean;
  acidBaseStrength: AcidBaseStrength;
  pKa?: number;
  pKb?: number;
  chemicalClass: string;
  substanceColor?: string;
  aliases: string[];
  hazards: Hazard[];
  structure?: MoleculeStructure;
  provenance: Provenance;
  notes?: string;
}

export interface ChemicalSummary {
  id: string;
  commonName: string;
  formula: string;
  molarMass: number;
  chemicalClass: string;
  substanceColor?: string;
}

export interface ObservableEffect {
  type: ObservableEffectType;
  description: string;
  relatedChemicalId?: string;
  colorFrom?: string;
  colorTo?: string;
  temperatureDeltaC?: number;
  initialTemperatureC?: number;
  finalTemperatureC?: number;
}

export interface CalorimetryResult {
  enthalpyKjPerMol: number;
  extentMoles: number;
  heatJoules: number;
  solutionHeatJoules: number;
  initialTemperatureC: number;
  finalTemperatureC: number;
  temperatureDeltaC: number;
  totalMassGrams: number;
  heatCapacityJPerC: number;
  summaryText: string;
}

export interface ResolvedSpecies {
  chemicalId: string;
  formula: string;
  commonName: string;
  coefficient: number;
  isByproduct?: boolean;
  isRegistered: boolean;
}

export interface ProcessChangeDimension {
  title: string;
  category: "atomic_bonding" | "concentrations" | "properties" | "observables" | "thermodynamics" | "conservation";
  description: string;
  details: string[];
}

export interface ChemicalProcessBreakdown {
  masterExplanation: string;
  dimensions: ProcessChangeDimension[];
}

export interface ReactionResolution {
  status: ReactionStatus;
  confidenceTier: ConfidenceTier;
  confidenceScore: number;
  reactionType?: ReactionType;
  balancedEquation?: string;
  netIonicEquation?: string;
  reactants: ResolvedSpecies[];
  products: ResolvedSpecies[];
  observableEffects: ObservableEffect[];
  energyClassification?: EnergyClassification;
  enthalpyKjPerMol?: number;
  calorimetry?: CalorimetryResult;
  explanation: string;
  ruleApplied: string;
  reference?: string;
  safetyNotes?: string;
  warnings: string[];
  missingInfo?: string[];
  processExplanation?: string;
  processBreakdown?: ChemicalProcessBreakdown;
}

export interface StoichiometryLine {
  chemicalId: string;
  formula: string;
  commonName: string;
  role: "reactant" | "product" | "byproduct";
  coefficient: number;
  inputMoles?: number;
  inputMass?: number;
  isLimiting?: boolean;
  theoreticalYieldMoles?: number;
  theoreticalYieldMass?: number;
  remainingMoles?: number;
  remainingMass?: number;
}

export interface SimulationResult {
  resolution: ReactionResolution;
  stoichiometry?: StoichiometryLine[];
  limitingReagentChemicalId?: string;
  calorimetry?: CalorimetryResult;
}

export type Unit = "g" | "kg" | "mg" | "mol" | "mmol" | "mL" | "L";

export interface ReactionInputSpecies {
  chemicalId: string;
  amount: number;
  unit: Unit;
  concentrationMolar?: number;
}

export interface ReactionConditions {
  temperatureC?: number;
  pressureAtm?: number;
  solvent?: string;
  catalystChemicalId?: string;
}

export interface CuratedReaction {
  id: string;
  name: string;
  reactionType: ReactionType;
  reactants: { chemicalId: string; coefficient: number }[];
  products: { chemicalId: string; coefficient: number; isByproduct?: boolean }[];
  equationDisplay: string;
  netIonicEquation?: string;
  energyClassification: EnergyClassification;
  observableEffects: ObservableEffect[];
  confidenceScore: number;
}
