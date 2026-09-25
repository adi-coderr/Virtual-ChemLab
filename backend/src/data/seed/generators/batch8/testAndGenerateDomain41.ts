import * as fs from "fs";
import * as path from "path";
import { parseFormula } from "../../../../chemistry-engine/formulaParser.js";
import { balanceEquation, type BalancerSpecies } from "../../../../chemistry-engine/balancer.js";
import { SEED_CHEMICALS } from "../../chemicals.js";
import { CHEMICALS_BATCH_5 } from "../../chemicalsBatch5.js";
import { CHEMICALS_BATCH_6 } from "../../chemicalsBatch6.js";
import { CHEMICALS_BATCH_7 } from "../../chemicalsBatch7.js";
import { RAW_BATCH_8_CHEMICALS } from "./chemicalDefinitionsBatch8.js";
import { getExistingKeys } from "./inspectCollisions.js";
import { DOMAIN_38_REACTIONS } from "./domain38TotalSynthesisNamedRxns.js";
import { DOMAIN_39_REACTIONS } from "./domain39AgrochemPesticidesFertilizers.js";
import { DOMAIN_40_REACTIONS } from "./domain40AstrochemPlanetaryGeochem.js";
import type { ReactionDefinition } from "./types.js";

const allChems = new Map<string, any>();
for (const c of SEED_CHEMICALS) allChems.set(c.id, c);
for (const c of CHEMICALS_BATCH_5) allChems.set(c.id, c);
for (const c of CHEMICALS_BATCH_6) allChems.set(c.id, c);
for (const c of CHEMICALS_BATCH_7) allChems.set(c.id, c);
for (const c of RAW_BATCH_8_CHEMICALS) allChems.set(c.id, c);

const existingKeys = getExistingKeys();
for (const r of DOMAIN_38_REACTIONS) existingKeys.add([...r.reactants].sort().join("+"));
for (const r of DOMAIN_39_REACTIONS) existingKeys.add([...r.reactants].sort().join("+"));
for (const r of DOMAIN_40_REACTIONS) existingKeys.add([...r.reactants].sort().join("+"));

const localKeys = new Set<string>();
const reactions: ReactionDefinition[] = [];

function tryAdd(
  id: string,
  name: string,
  reactants: string[],
  products: string[],
  enthalpyKjPerMol: number,
  description: string,
  reactionType: any,
  observableEffects: any[]
) {
  // 1. Check chemical existence
  for (const cid of [...reactants, ...products]) {
    if (!allChems.has(cid)) {
      throw new Error(`[${id}] Unknown chemical ID: "${cid}"`);
    }
  }

  // 2. Check collision
  const rKey = [...reactants].sort().join("+");
  if (existingKeys.has(rKey)) {
    throw new Error(`[${id}] Collides with existing key: ${rKey}`);
  }
  if (localKeys.has(rKey)) {
    throw new Error(`[${id}] Duplicate local key: ${rKey}`);
  }

  // 3. Check balance
  const bReactants: BalancerSpecies[] = reactants.map(cid => {
    const chem = allChems.get(cid)!;
    const p = parseFormula(chem.formula);
    return { label: cid, formula: chem.formula, composition: p.composition, charge: chem.charge ?? 0 };
  });
  const bProducts: BalancerSpecies[] = products.map(cid => {
    const chem = allChems.get(cid)!;
    const p = parseFormula(chem.formula);
    return { label: cid, formula: chem.formula, composition: p.composition, charge: chem.charge ?? 0 };
  });

  const res = balanceEquation(bReactants, bProducts);
  if (!res.balancedEquationText) {
    throw new Error(`[${id}] Failed to balance: ${reactants.join("+")} -> ${products.join("+")}`);
  }

  localKeys.add(rKey);
  reactions.push({
    id,
    name,
    reactants,
    products,
    enthalpyKjPerMol,
    description,
    reactionType,
    observableEffects
  });
  console.log(`✓ [${id}] Balanced: ${res.balancedEquationText}`);
}

console.log("Testing candidate Domain 41 reactions...");
// We will test reactions here!
