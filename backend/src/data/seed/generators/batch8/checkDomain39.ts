import * as fs from "fs";
import { parseFormula } from "../../../../chemistry-engine/formulaParser.js";
import { balanceEquation, type BalancerSpecies } from "../../../../chemistry-engine/balancer.js";
import { SEED_CHEMICALS } from "../../chemicals.js";
import { CHEMICALS_BATCH_5 } from "../../chemicalsBatch5.js";
import { CHEMICALS_BATCH_6 } from "../../chemicalsBatch6.js";
import { CHEMICALS_BATCH_7 } from "../../chemicalsBatch7.js";
import { RAW_BATCH_8_CHEMICALS } from "./chemicalDefinitionsBatch8.js";
import { getExistingKeys } from "./inspectCollisions.js";
import { DOMAIN_38_REACTIONS } from "./domain38TotalSynthesisNamedRxns.js";

const allChems = new Map<string, any>();
for (const c of SEED_CHEMICALS) allChems.set(c.id, c);
for (const c of CHEMICALS_BATCH_5) allChems.set(c.id, c);
for (const c of CHEMICALS_BATCH_6) allChems.set(c.id, c);
for (const c of CHEMICALS_BATCH_7) allChems.set(c.id, c);
for (const c of RAW_BATCH_8_CHEMICALS) allChems.set(c.id, c);

const existingKeys = getExistingKeys();
for (const r of DOMAIN_38_REACTIONS) {
  existingKeys.add([...r.reactants].sort().join("+"));
}

const content = fs.readFileSync("src/data/seed/generators/batch8/buildDomain39Script.ts", "utf8");
const regex = /add\(\s*"([^"]+)",\s*"([^"]+)",\s*\[([^\]]+)\],\s*\[([^\]]+)\]/g;
let match;
let count = 0;
const collisions: string[] = [];
const missingChems: { id: string; missing: string[] }[] = [];
const balanceErrors: { id: string; err: string }[] = [];
const localKeys = new Set<string>();
const localDups: string[] = [];

while ((match = regex.exec(content)) !== null) {
  count++;
  const id = match[1] || "";
  const name = match[2] || "";
  const reactants = (match[3] || "").split(",").map(s => s.trim().replace(/['"]/g, "")).filter(Boolean);
  const products = (match[4] || "").split(",").map(s => s.trim().replace(/['"]/g, "")).filter(Boolean);

  const rKey = [...reactants].sort().join("+");
  if (existingKeys.has(rKey)) {
    collisions.push(`[${id}] key: ${rKey}`);
  }
  if (localKeys.has(rKey)) {
    localDups.push(`[${id}] key: ${rKey}`);
  }
  localKeys.add(rKey);

  const missing: string[] = [];
  for (const cid of [...reactants, ...products]) {
    if (!allChems.has(cid)) missing.push(cid);
  }
  if (missing.length > 0) {
    missingChems.push({ id, missing });
    continue;
  }

  // Check balance
  try {
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
      balanceErrors.push({ id, err: "No balanced text returned" });
    }
  } catch (err: any) {
    balanceErrors.push({ id, err: err.message });
  }
}

console.log(`Parsed ${count} reactions for Domain 39.`);
console.log(`Collisions with batches 1-7 & Domain 38: ${collisions.length}`);
collisions.forEach(c => console.log("  Collision:", c));
console.log(`Internal duplicates: ${localDups.length}`);
localDups.forEach(d => console.log("  Internal dup:", d));
console.log(`Missing chemicals: ${missingChems.length}`);
missingChems.forEach(m => console.log(`  [${m.id}] missing:`, m.missing.join(", ")));
console.log(`Balance errors: ${balanceErrors.length}`);
balanceErrors.forEach(b => console.log(`  [${b.id}] error:`, b.err));
