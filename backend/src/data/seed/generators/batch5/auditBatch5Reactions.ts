import { REACTIONS_BATCH_5 } from "../../reactionsBatch5.js";
import { CHEMICALS_BATCH_5 } from "../../chemicalsBatch5.js";
import { SEED_CHEMICALS } from "../../chemicals.js";
import { SEED_REACTIONS } from "../../reactions.js";
import { parseFormula } from "../../../../chemistry-engine/formulaParser.js";

interface AuditError {
  reactionId: string;
  field: string;
  message: string;
}

const errors: AuditError[] = [];
const warnings: string[] = [];

// 1. Build all-chemicals lookup
const allChems = new Map<string, any>();
for (const c of SEED_CHEMICALS) allChems.set(c.id, c);
for (const c of CHEMICALS_BATCH_5) allChems.set(c.id, c);

console.log(`Auditing ${REACTIONS_BATCH_5.length} Batch 5 reactions against ${allChems.size} total chemicals...`);

// 2. Track unique IDs and reactant sets
const reactionIds = new Set<string>();
for (const r of SEED_REACTIONS) reactionIds.add(r.id);

const reactantSets = new Set<string>();
for (const r of SEED_REACTIONS) {
  reactantSets.add(r.reactants.map(x => x.chemicalId).sort().join("+"));
}

let balancedCount = 0;

for (const rxn of REACTIONS_BATCH_5) {
  // Check ID
  if (!rxn.id || rxn.id.trim() === "") {
    errors.push({ reactionId: "(empty)", field: "id", message: "Missing reaction ID" });
    continue;
  }
  if (reactionIds.has(rxn.id)) {
    errors.push({ reactionId: rxn.id, field: "id", message: `Duplicate reaction ID "${rxn.id}"` });
  }
  reactionIds.add(rxn.id);

  // Check Name
  if (!rxn.name || rxn.name.trim() === "") {
    errors.push({ reactionId: rxn.id, field: "name", message: "Missing reaction name" });
  }

  // Check Reactants
  if (!rxn.reactants || rxn.reactants.length === 0) {
    errors.push({ reactionId: rxn.id, field: "reactants", message: "Reaction has no reactants" });
  }
  const rSetKey = rxn.reactants.map(x => x.chemicalId).sort().join("+");
  if (reactantSets.has(rSetKey)) {
    errors.push({ reactionId: rxn.id, field: "reactants", message: `Reactant collision with existing reaction: [${rSetKey}]` });
  }
  reactantSets.add(rSetKey);

  // Check Products
  if (!rxn.products || rxn.products.length === 0) {
    errors.push({ reactionId: rxn.id, field: "products", message: "Reaction has no products" });
  }

  // Check Chemical Existence & Coefficients
  const leftElements: Record<string, number> = {};
  let leftCharge = 0;
  for (const r of rxn.reactants) {
    const chem = allChems.get(r.chemicalId);
    if (!chem) {
      errors.push({ reactionId: rxn.id, field: "reactants", message: `Reactant "${r.chemicalId}" not found in chemical database` });
      continue;
    }
    if (!r.coefficient || r.coefficient <= 0 || !Number.isInteger(r.coefficient)) {
      errors.push({ reactionId: rxn.id, field: "reactants", message: `Invalid reactant coefficient ${r.coefficient} for "${r.chemicalId}"` });
    }
    try {
      const parsed = parseFormula(chem.formula);
      for (const [el, count] of Object.entries(parsed.composition)) {
        leftElements[el] = (leftElements[el] || 0) + count * r.coefficient;
      }
      leftCharge += (chem.charge ?? 0) * r.coefficient;
    } catch (e: any) {
      errors.push({ reactionId: rxn.id, field: "reactants", message: `Formula parse failed for reactant "${r.chemicalId}" (${chem.formula}): ${e.message}` });
    }
  }

  const rightElements: Record<string, number> = {};
  let rightCharge = 0;
  for (const p of rxn.products) {
    const chem = allChems.get(p.chemicalId);
    if (!chem) {
      errors.push({ reactionId: rxn.id, field: "products", message: `Product "${p.chemicalId}" not found in chemical database` });
      continue;
    }
    if (!p.coefficient || p.coefficient <= 0 || !Number.isInteger(p.coefficient)) {
      errors.push({ reactionId: rxn.id, field: "products", message: `Invalid product coefficient ${p.coefficient} for "${p.chemicalId}"` });
    }
    try {
      const parsed = parseFormula(chem.formula);
      for (const [el, count] of Object.entries(parsed.composition)) {
        rightElements[el] = (rightElements[el] || 0) + count * p.coefficient;
      }
      rightCharge += (chem.charge ?? 0) * p.coefficient;
    } catch (e: any) {
      errors.push({ reactionId: rxn.id, field: "products", message: `Formula parse failed for product "${p.chemicalId}" (${chem.formula}): ${e.message}` });
    }
  }

  // Atomic balance check
  const allEls = new Set([...Object.keys(leftElements), ...Object.keys(rightElements)]);
  let isAtomBalanced = true;
  for (const el of allEls) {
    const l = leftElements[el] || 0;
    const r = rightElements[el] || 0;
    if (l !== r) {
      errors.push({
        reactionId: rxn.id,
        field: "balance",
        message: `Element mismatch for ${el}: Left=${l}, Right=${r}. Reaction: ${rxn.equationDisplay}`
      });
      isAtomBalanced = false;
    }
  }
  if (leftCharge !== rightCharge) {
    errors.push({
      reactionId: rxn.id,
      field: "chargeBalance",
      message: `Charge mismatch: Left=${leftCharge}, Right=${rightCharge}`
    });
  }
  if (isAtomBalanced && leftCharge === rightCharge) {
    balancedCount++;
  }

  // Check Energy Classification
  if (rxn.enthalpyKjPerMol !== undefined) {
    if (rxn.enthalpyKjPerMol < 0 && rxn.energyClassification !== "exothermic") {
      warnings.push(`${rxn.id}: Enthalpy is negative (${rxn.enthalpyKjPerMol}) but energyClassification is "${rxn.energyClassification}"`);
    } else if (rxn.enthalpyKjPerMol > 0 && rxn.energyClassification !== "endothermic") {
      warnings.push(`${rxn.id}: Enthalpy is positive (${rxn.enthalpyKjPerMol}) but energyClassification is "${rxn.energyClassification}"`);
    }
  }

  // Temperature Bounds
  if (rxn.temperatureMinC !== undefined && rxn.temperatureMaxC !== undefined) {
    if (rxn.temperatureMinC > rxn.temperatureMaxC) {
      errors.push({ reactionId: rxn.id, field: "temperature", message: `temperatureMinC (${rxn.temperatureMinC}) > temperatureMaxC (${rxn.temperatureMaxC})` });
    }
  }

  // Observable Effects
  if (rxn.observableEffects) {
    for (const eff of rxn.observableEffects) {
      if (eff.colorFrom && !/^#[0-9A-Fa-f]{6}$/.test(eff.colorFrom)) {
        errors.push({ reactionId: rxn.id, field: "observableEffects", message: `Invalid hex colorFrom: "${eff.colorFrom}"` });
      }
      if (eff.colorTo && !/^#[0-9A-Fa-f]{6}$/.test(eff.colorTo)) {
        errors.push({ reactionId: rxn.id, field: "observableEffects", message: `Invalid hex colorTo: "${eff.colorTo}"` });
      }
      if (eff.relatedChemicalId && !allChems.has(eff.relatedChemicalId)) {
        errors.push({ reactionId: rxn.id, field: "observableEffects", message: `Unknown relatedChemicalId "${eff.relatedChemicalId}"` });
      }
    }
  }

  // Catalyst
  if (rxn.catalystChemicalId && !allChems.has(rxn.catalystChemicalId)) {
    errors.push({ reactionId: rxn.id, field: "catalystChemicalId", message: `Unknown catalyst "${rxn.catalystChemicalId}"` });
  }
}

console.log("\n================ AUDIT SUMMARY ================");
console.log(`Total Reactions Audited: ${REACTIONS_BATCH_5.length}`);
console.log(`100% Atom & Charge Balanced: ${balancedCount} / ${REACTIONS_BATCH_5.length}`);
console.log(`Total Errors Found: ${errors.length}`);
console.log(`Total Warnings Found: ${warnings.length}`);

if (errors.length > 0) {
  console.log("\n--- ERRORS ---");
  for (const e of errors.slice(0, 30)) {
    console.log(`[${e.field}] ${e.reactionId}: ${e.message}`);
  }
  if (errors.length > 30) console.log(`... and ${errors.length - 30} more errors.`);
}

if (warnings.length > 0) {
  console.log("\n--- WARNINGS ---");
  for (const w of warnings.slice(0, 10)) {
    console.log(w);
  }
}

if (errors.length === 0 && warnings.length === 0) {
  console.log("\n✓ SUCCESS: ZERO errors, ZERO warnings! All 710 added reactions contain 100% valid, consistent, atom-balanced information!");
}
