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
import { DOMAIN_41_REACTIONS } from "./domain41ClinicalDiagnosticsBiosensors.js";

const allChems = new Map<string, any>();
for (const c of SEED_CHEMICALS) if (c && c.id) allChems.set(c.id, c);
for (const c of CHEMICALS_BATCH_5) if (c && c.id) allChems.set(c.id, c);
for (const c of CHEMICALS_BATCH_6) if (c && c.id) allChems.set(c.id, c);
for (const c of CHEMICALS_BATCH_7) if (c && c.id) allChems.set(c.id, c);
for (const c of RAW_BATCH_8_CHEMICALS) if (c && c.id) allChems.set(c.id, c);

const existingKeys = getExistingKeys();
for (const r of DOMAIN_38_REACTIONS) existingKeys.add([...r.reactants].sort().join("+"));
for (const r of DOMAIN_39_REACTIONS) existingKeys.add([...r.reactants].sort().join("+"));
for (const r of DOMAIN_40_REACTIONS) existingKeys.add([...r.reactants].sort().join("+"));

const collisions: string[] = [];
const missingChems: { id: string; missing: string[] }[] = [];
const balanceErrors: { id: string; err: string }[] = [];
const localKeys = new Set<string>();
const localDups: string[] = [];

for (const r of DOMAIN_41_REACTIONS) {
  const rKey = [...r.reactants].sort().join("+");
  if (existingKeys.has(rKey)) {
    collisions.push(`[${r.id}] key: ${rKey}`);
  }
  if (localKeys.has(rKey)) {
    localDups.push(`[${r.id}] key: ${rKey}`);
  }
  localKeys.add(rKey);

  const missing: string[] = [];
  for (const cid of [...r.reactants, ...r.products]) {
    if (!allChems.has(cid)) missing.push(cid);
  }
  if (missing.length > 0) {
    missingChems.push({ id: r.id, missing });
    continue;
  }

  try {
    const bReactants: BalancerSpecies[] = r.reactants.map(cid => {
      const chem = allChems.get(cid)!;
      const p = parseFormula(chem.formula);
      return { label: cid, formula: chem.formula, composition: p.composition, charge: chem.charge ?? 0 };
    });
    const bProducts: BalancerSpecies[] = r.products.map(cid => {
      const chem = allChems.get(cid)!;
      const p = parseFormula(chem.formula);
      return { label: cid, formula: chem.formula, composition: p.composition, charge: chem.charge ?? 0 };
    });
    const res = balanceEquation(bReactants, bProducts);
    if (!res.balancedEquationText) {
      balanceErrors.push({ id: r.id, err: "No balanced text returned" });
    }
  } catch (err: any) {
    balanceErrors.push({ id: r.id, err: err.message });
  }
}

console.log(`Audited ${DOMAIN_41_REACTIONS.length} reactions for Domain 41:`);
console.log(`Collisions with batches 1-7 & Domains 38-40: ${collisions.length}`);
collisions.forEach(c => console.log("  Collision:", c));
console.log(`Internal duplicates: ${localDups.length}`);
localDups.forEach(d => console.log("  Internal dup:", d));
console.log(`Missing chemicals: ${missingChems.length}`);
missingChems.forEach(m => console.log(`  [${m.id}] missing:`, m.missing.join(", ")));
console.log(`Balance errors: ${balanceErrors.length}`);
balanceErrors.forEach(b => console.log(`  [${b.id}] error:`, b.err));

if (collisions.length === 0 && localDups.length === 0 && missingChems.length === 0 && balanceErrors.length === 0) {
  console.log("🌟 DOMAIN 41 IS 100% PERFECT! 100/100 reactions balanced, 0 collisions, 0 duplicates, 0 missing chems!");
} else {
  process.exit(1);
}
