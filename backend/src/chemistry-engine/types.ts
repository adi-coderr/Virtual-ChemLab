/**
 * Core types shared across the chemistry engine.
 *
 * These types intentionally model chemical formulas as structured data
 * (element -> count maps, explicit charge) rather than opaque strings,
 * so that every downstream stage (balancing, stoichiometry, classification)
 * operates on the same unambiguous representation.
 */

/** Element counts within a formula, e.g. { C: 1, H: 4 } for CH4. */
export type ElementComposition = Record<string, number>;

/** A parsed chemical formula: composition + net ionic charge (0 for neutral species). */
export interface ParsedFormula {
  /** Original formula string as provided. */
  raw: string;
  /** Element symbol -> atom count, fully expanded (parentheses resolved). */
  composition: ElementComposition;
  /** Net charge. 0 for neutral molecules/compounds. */
  charge: number;
}

export type PhysicalState = "solid" | "liquid" | "gas" | "aqueous" | "unknown";

export type AcidBaseStrength = "strong" | "weak" | "none";

export type ChemicalClass =
  | "acid"
  | "base"
  | "salt"
  | "oxide"
  | "metal"
  | "nonmetal"
  | "molecular_element"
  | "organic"
  | "ion"
  | "other";

/** The four confidence tiers the whole system is required to expose to the user. */
export type ConfidenceTier = "SUPPORTED" | "PREDICTED" | "APPROXIMATE" | "UNKNOWN";

/**
 * High-level resolution status. Distinct from ConfidenceTier: a NO_REACTION
 * result can still be confidently PREDICTED (e.g. "these two salts are both
 * soluble, so no precipitate forms") -- confidently knowing nothing happens
 * is a real scientific result, not the same as UNSUPPORTED.
 */
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

export interface ObservableEffect {
  type: ObservableEffectType;
  description: string;
  relatedChemicalId?: string;
  colorFrom?: string;
  colorTo?: string;
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
  /** True when coordinates were hand-curated for this molecule rather than auto-laid-out. */
  curated: boolean;
}

export type DataConfidence = "high" | "medium" | "low";

export interface Provenance {
  source: string;
  reference?: string;
  lastVerifiedDate?: string;
  confidence: DataConfidence;
  dataVersion: string;
}

export interface Hazard {
  code: string;
  label: string;
  description: string;
  severity: "low" | "medium" | "high" | "extreme";
}

export interface Chemical {
  id: string;
  commonName: string;
  iupacName?: string;
  formula: string;
  composition: ElementComposition;
  charge: number;
  molarMass: number;
  casNumber?: string;
  smiles?: string;
  inchi?: string;
  inchiKey?: string;
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
  chemicalClass: ChemicalClass;
  substanceColor?: string;
  aliases: string[];
  hazards: Hazard[];
  structure?: MoleculeStructure;
  provenance: Provenance;
  notes?: string;
  /** Present only for ionic compounds we have curated dissociation data for. */
  dissociation?: Dissociation;
  /** True for a bare element (Zn, Fe, O2, Cu...), used by single-displacement matching. */
  isElemental?: boolean;
  /**
   * The charge this element is assumed to take when it reacts as a simple
   * cation (e.g. Zn -> 2, Fe -> 2, Mg -> 2, Al -> 3). Only set for elemental
   * metals used by the single-displacement / metal+acid rules; deliberately
   * does not attempt to model variable oxidation states (e.g. Fe2+ vs Fe3+).
   */
  commonCationCharge?: number;
  /**
   * True only for genuine hydroxide bases (NaOH, KOH, Ca(OH)2, Ba(OH)2...)
   * where neutralization produces water as a byproduct. Left unset for
   * molecular bases like ammonia, whose dissociation is modeled as
   * NH4+/OH- for solubility purposes but whose neutralization reactions do
   * NOT separately produce water (NH3 + CH3COOH -> CH3COONH4, no H2O).
   * Deliberately explicit rather than inferred from the anion formula.
   */
  neutralizationProducesWater?: boolean;
}

export interface ResolvedSpecies {
  chemicalId: string;
  formula: string;
  commonName: string;
  coefficient: number;
  moles?: number;
  massGrams?: number;
  isByproduct?: boolean;
  /** False when this species was predicted (e.g. via solubility rules) but is not yet a curated chemical record. */
  isRegistered: boolean;
}

export interface IonChargeSpec {
  formula: string;
  charge: number;
}

/**
 * How an ionic compound splits into ions in solution. This is curated
 * chemical knowledge attached to a Chemical record (see docs/CHEMISTRY_ENGINE.md)
 * rather than something derived automatically from the formula.
 */
export interface Dissociation {
  cation: IonChargeSpec;
  anion: IonChargeSpec;
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
  temperatureMinC?: number;
  temperatureMaxC?: number;
  solvent?: string;
  catalystChemicalId?: string;
  observableEffects: ObservableEffect[];
  experimentalStatus: "experimentally_verified" | "rule_derived" | "heuristic";
  confidenceScore: number;
  source: string;
  reference?: string;
  safetyNotes?: string;
}

export interface ReactionInputSpecies {
  chemicalId: string;
  amount: number;
  unit: "g" | "kg" | "mg" | "mol" | "mmol" | "mL" | "L";
  concentrationMolar?: number;
}

export interface ReactionConditions {
  temperatureC?: number;
  pressureAtm?: number;
  solvent?: string;
  catalystChemicalId?: string;
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
  explanation: string;
  ruleApplied: string;
  reference?: string;
  safetyNotes?: string;
  warnings: string[];
  missingInfo?: string[];
}

export class ChemistryEngineError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly details?: Record<string, unknown>
  ) {
    super(message);
    this.name = "ChemistryEngineError";
  }
}
