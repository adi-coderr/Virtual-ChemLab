import { SEED_CHEMICALS } from "../../chemicals.js";
import { RAW_BATCH_5_CHEMICALS } from "./chemicalDefinitionsBatch5.js";
import { SEED_REACTIONS } from "../../reactions.js";
import { REACTIONS_BATCH_5 } from "../../reactionsBatch5.js";
import { parseFormula } from "../../../../chemistry-engine/formulaParser.js";
import { balanceEquation } from "../../../../chemistry-engine/balancer.js";

const allChemsMap = new Map();
for (const c of SEED_CHEMICALS) allChemsMap.set(c.id, c);
for (const c of RAW_BATCH_5_CHEMICALS) allChemsMap.set(c.id, c);

const existingKeys = new Set([...SEED_REACTIONS, ...REACTIONS_BATCH_5].map(r => r.reactants.map(x => x.chemicalId).sort().join("+")));

function toBal(cid: string) {
  const chem = allChemsMap.get(cid);
  if (!chem) throw new Error("Unknown chemical ID: " + cid);
  const parsed = parseFormula(chem.formula);
  return { label: cid, formula: chem.formula, composition: parsed.composition, charge: chem.charge ?? 0 };
}

export function tryAdd(id: string, name: string, reactants: string[], products: string[], enthalpy: number, desc: string) {
  const k = [...reactants].sort().join("+");
  if (existingKeys.has(k)) {
    console.log("FAIL COLLISION:", id, k);
    return null;
  }
  for (const cid of [...reactants, ...products]) {
    if (!allChemsMap.has(cid)) {
      console.log("FAIL UNKNOWN:", id, cid);
      return null;
    }
  }
  try {
    const bal = balanceEquation(reactants.map(toBal), products.map(toBal));
    return { id, name, reactants, products, enthalpy, desc, net: bal.balancedEquationText };
  } catch (e: any) {
    console.log("FAIL BAL:", id, e.message);
    return null;
  }
}
