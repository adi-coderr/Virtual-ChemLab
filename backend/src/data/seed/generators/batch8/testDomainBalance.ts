import { DOMAIN_38_REACTIONS } from "./domain38TotalSynthesisNamedRxns.js";
import { parseFormula } from "../../../../chemistry-engine/formulaParser.js";
import { balanceEquation, type BalancerSpecies } from "../../../../chemistry-engine/balancer.js";
import { SEED_CHEMICALS } from "../../chemicals.js";
import { CHEMICALS_BATCH_5 } from "../../chemicalsBatch5.js";
import { CHEMICALS_BATCH_6 } from "../../chemicalsBatch6.js";
import { CHEMICALS_BATCH_7 } from "../../chemicalsBatch7.js";
import { RAW_BATCH_8_CHEMICALS } from "./chemicalDefinitionsBatch8.js";

const allChems = new Map<string, any>();
for (const c of SEED_CHEMICALS) allChems.set(c.id, c);
for (const c of CHEMICALS_BATCH_5) allChems.set(c.id, c);
for (const c of CHEMICALS_BATCH_6) allChems.set(c.id, c);
for (const c of CHEMICALS_BATCH_7) allChems.set(c.id, c);
for (const c of RAW_BATCH_8_CHEMICALS) allChems.set(c.id, c);

function toBal(cid: string): BalancerSpecies {
  const chem = allChems.get(cid);
  if (!chem) throw new Error(`Unknown chemical ID: "${cid}"`);
  const parsed = parseFormula(chem.formula);
  return {
    label: cid,
    formula: chem.formula,
    composition: parsed.composition,
    charge: chem.charge ?? 0,
  };
}

let errors = 0;
for (const r of DOMAIN_38_REACTIONS) {
  try {
    const reactants = r.reactants.map(toBal);
    const products = r.products.map(toBal);
    const res = balanceEquation(reactants, products);
    if (!res.balancedEquationText) {
      console.error(`FAILED balance: ${r.id} (${r.name})`);
      errors++;
    }
  } catch (err: any) {
    console.error(`ERROR balancing ${r.id}: ${err.message}`);
    errors++;
  }
}

if (errors === 0) {
  console.log(`✓ All ${DOMAIN_38_REACTIONS.length} reactions in Domain 38 balance 100% perfectly!`);
} else {
  console.error(`❌ ${errors} balance errors in Domain 38!`);
  process.exit(1);
}
