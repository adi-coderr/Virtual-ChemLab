import type { ElementComposition, ReactionType } from "./types.js";

/** True if a composition represents a single free element (e.g. Zn, O2, Fe), not a compound. */
export function isFreeElement(composition: ElementComposition): boolean {
  const distinctElements = Object.keys(composition).filter((k) => (composition[k] ?? 0) !== 0);
  return distinctElements.length === 1;
}

export function soleElementOf(composition: ElementComposition): string | undefined {
  const distinct = Object.keys(composition).filter((k) => (composition[k] ?? 0) !== 0);
  return distinct.length === 1 ? distinct[0] : undefined;
}

export const REACTION_TYPE_LABELS: Record<ReactionType, { label: string; description: string }> = {
  acid_base_neutralization: {
    label: "Acid-base neutralization",
    description: "An acid and a base react to form a salt and (usually) water.",
  },
  precipitation: {
    label: "Precipitation",
    description: "Two soluble ionic compounds exchange ions to form at least one insoluble solid.",
  },
  single_displacement: {
    label: "Single displacement",
    description: "A more reactive element displaces a less reactive element from a compound.",
  },
  double_displacement: {
    label: "Double displacement",
    description: "Two compounds exchange ions or components to form two new compounds.",
  },
  combustion: {
    label: "Combustion",
    description: "A fuel reacts rapidly with oxygen, typically producing CO2 and H2O when combustion is complete.",
  },
  gas_evolution: {
    label: "Gas evolution",
    description: "A reaction that produces a gaseous product, often escaping as bubbles.",
  },
  synthesis: {
    label: "Synthesis (combination)",
    description: "Two or more simpler substances combine to form a single, more complex product.",
  },
  decomposition: {
    label: "Decomposition",
    description: "A single compound breaks down into two or more simpler products.",
  },
  redox_other: {
    label: "Oxidation-reduction (other)",
    description: "Electrons are transferred between species, outside the specific redox patterns modeled here.",
  },
  dissolution: {
    label: "Dissolution",
    description: "A solute dissolves in a solvent, dissociating into hydrated ions or solvated molecules with characteristic enthalpy and solubility behavior.",
  },
  unclassified: {
    label: "Unclassified",
    description: "This reaction did not match a recognized structural pattern.",
  },
};
