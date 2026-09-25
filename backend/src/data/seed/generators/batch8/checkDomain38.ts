import { SEED_CHEMICALS } from "../../chemicals.js";
import { CHEMICALS_BATCH_5 } from "../../chemicalsBatch5.js";
import { CHEMICALS_BATCH_6 } from "../../chemicalsBatch6.js";
import { CHEMICALS_BATCH_7 } from "../../chemicalsBatch7.js";
import { RAW_BATCH_8_CHEMICALS } from "./chemicalDefinitionsBatch8.js";
import { getExistingKeys } from "./inspectCollisions.js";
import * as fs from "fs";

const allChems = new Map<string, any>();
for (const c of SEED_CHEMICALS) allChems.set(c.id, c);
for (const c of CHEMICALS_BATCH_5) allChems.set(c.id, c);
for (const c of CHEMICALS_BATCH_6) allChems.set(c.id, c);
for (const c of CHEMICALS_BATCH_7) allChems.set(c.id, c);
for (const c of RAW_BATCH_8_CHEMICALS) allChems.set(c.id, c);

const existingKeys = getExistingKeys();

// Read buildDomain38Script.ts and extract all add(...) calls
const content = fs.readFileSync("src/data/seed/generators/batch8/buildDomain38Script.ts", "utf8");

// Regex to capture add(id, name, [reactants], [products], ...)
const regex = /add\(\s*"([^"]+)",\s*"([^"]+)",\s*\[([^\]]+)\],\s*\[([^\]]+)\]/g;
let match;
let count = 0;
const collisions: string[] = [];
const missingChems: { id: string; missing: string[] }[] = [];
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
  }
}

console.log(`Parsed ${count} reactions.`);
console.log(`Collisions with batches 1-7: ${collisions.length}`);
collisions.forEach(c => console.log("  Collision:", c));
console.log(`Internal duplicates: ${localDups.length}`);
localDups.forEach(d => console.log("  Internal dup:", d));
console.log(`Reactions with missing chemicals: ${missingChems.length}`);
missingChems.forEach(m => console.log(`  [${m.id}] missing:`, m.missing.join(", ")));
