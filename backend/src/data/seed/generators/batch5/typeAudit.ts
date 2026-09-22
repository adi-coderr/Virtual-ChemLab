import { REACTIONS_BATCH_5 } from "../../reactionsBatch5.js";

const VALID_REACTION_TYPES = new Set([
  "acid_base_neutralization",
  "precipitation",
  "single_displacement",
  "double_displacement",
  "combustion",
  "gas_evolution",
  "synthesis",
  "decomposition",
  "redox_other",
  "dissolution",
  "unclassified",
]);

const VALID_EFFECT_TYPES = new Set([
  "color_change",
  "precipitation",
  "gas_evolution",
  "temperature_increase",
  "temperature_decrease",
  "dissolution",
  "phase_change",
  "effervescence",
]);

const typeErrors: string[] = [];

for (const rxn of REACTIONS_BATCH_5) {
  if (!VALID_REACTION_TYPES.has(rxn.reactionType)) {
    typeErrors.push(`${rxn.id}: Invalid reactionType "${rxn.reactionType}"`);
  }
  for (const eff of rxn.observableEffects || []) {
    if (!VALID_EFFECT_TYPES.has(eff.type)) {
      typeErrors.push(`${rxn.id}: Invalid observableEffect type "${eff.type}"`);
    }
  }
}

console.log(`Type Audit: ${typeErrors.length} type errors found.`);
if (typeErrors.length > 0) {
  console.log(typeErrors);
} else {
  console.log("✓ All 710 reactions strictly conform to ReactionType and ObservableEffectType unions!");
}
