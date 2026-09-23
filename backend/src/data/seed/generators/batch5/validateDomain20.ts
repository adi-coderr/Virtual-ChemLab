import { SEED_CHEMICALS } from "../../chemicals.js";
import { RAW_BATCH_5_CHEMICALS } from "./chemicalDefinitionsBatch5.js";
import { SEED_REACTIONS } from "../../reactions.js";
import { REACTIONS_BATCH_5 } from "../../reactionsBatch5.js";
import { parseFormula } from "../../../../chemistry-engine/formulaParser.js";
import { balanceEquation, type BalancerSpecies } from "../../../../chemistry-engine/balancer.js";

const allChemsMap = new Map();
for (const c of SEED_CHEMICALS) allChemsMap.set(c.id, c);
for (const c of RAW_BATCH_5_CHEMICALS) allChemsMap.set(c.id, c);

const existingKeys = new Set([...SEED_REACTIONS, ...REACTIONS_BATCH_5].map(r => r.reactants.map(x => x.chemicalId).sort().join("+")));

function toBal(cid: string): BalancerSpecies {
  const chem = allChemsMap.get(cid);
  if (!chem) throw new Error(`Unknown chemical ID: "${cid}"`);
  const parsed = parseFormula(chem.formula);
  return {
    label: cid,
    formula: chem.formula,
    composition: parsed.composition,
    charge: chem.charge ?? 0,
  };
}

export interface CandidateReaction {
  id: string;
  name: string;
  reactants: string[];
  products: string[];
  enthalpy: number;
  desc: string;
  net?: string;
}

export function testAndValidateReactions(reactions: CandidateReaction[]) {
  const usedKeys = new Set();
  const validReactions = [];

  for (const r of reactions) {
    const key = [...r.reactants].sort().join("+");
    if (existingKeys.has(key)) {
      throw new Error(`Collision with DB for reaction ${r.id}: key ${key}`);
    }
    if (usedKeys.has(key)) {
      throw new Error(`Internal duplicate key in Domain 20 for ${r.id}: key ${key}`);
    }
    usedKeys.add(key);

    for (const rid of r.reactants) {
      if (!allChemsMap.has(rid)) throw new Error(`Unknown reactant "${rid}" in ${r.id}`);
    }
    for (const pid of r.products) {
      if (!allChemsMap.has(pid)) throw new Error(`Unknown product "${pid}" in ${r.id}`);
    }

    try {
      const bal = balanceEquation(r.reactants.map(toBal), r.products.map(toBal));
      validReactions.push({ ...r, bal });
    } catch (e: any) {
      throw new Error(`Balancing error in ${r.id}: ${e.message}`);
    }
  }

  console.log(`Successfully validated ${validReactions.length} reactions for Domain 20!`);
  return validReactions;
}
