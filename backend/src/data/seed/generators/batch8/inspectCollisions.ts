import { SEED_REACTIONS } from "../../reactions.js";
import { REACTIONS_BATCH_5 } from "../../reactionsBatch5.js";
import { REACTIONS_BATCH_6 } from "../../reactionsBatch6.js";
import { REACTIONS_BATCH_7 } from "../../reactionsBatch7.js";

const existing = new Set<string>();
for (const r of SEED_REACTIONS) existing.add(r.reactants.map(sp => sp.chemicalId).sort().join("+"));
for (const r of REACTIONS_BATCH_5) existing.add(r.reactants.map(sp => sp.chemicalId).sort().join("+"));
for (const r of REACTIONS_BATCH_6) existing.add(r.reactants.map(sp => sp.chemicalId).sort().join("+"));
for (const r of REACTIONS_BATCH_7) existing.add(r.reactants.map(sp => sp.chemicalId).sort().join("+"));

console.log(`Loaded ${existing.size} unique existing reactant keys across batches 1-7.`);

export function checkCollision(reactants: string[]): boolean {
  const k = [...reactants].sort().join("+");
  return existing.has(k);
}

export function getExistingKeys(): Set<string> {
  return existing;
}
