import { REACTIONS_BATCH_5 } from "../../reactionsBatch5.js";
import { CHEMICALS_BATCH_5 } from "../../chemicalsBatch5.js";
import { SEED_CHEMICALS, type SeedChemical } from "../../chemicals.js";
import { SEED_REACTIONS } from "../../reactions.js";
import { parseFormula } from "../../../../chemistry-engine/formulaParser.js";

const allChems = new Map<string, SeedChemical>();
for (const c of SEED_CHEMICALS) allChems.set(c.id, c);
for (const c of CHEMICALS_BATCH_5) allChems.set(c.id, c);

const errors: string[] = [];
const warnings: string[] = [];

console.log(`=== DEEP AUDIT: ${REACTIONS_BATCH_5.length} REACTIONS & ${CHEMICALS_BATCH_5.length} CHEMICALS ===\n`);

// 1. Audit all Batch 5 Chemicals
console.log("Checking Batch 5 Chemicals...");
for (const chem of CHEMICALS_BATCH_5) {
  if (!chem.id || chem.id.trim() === "") {
    errors.push(`Chemical without ID found`);
  }
  if (!chem.commonName || chem.commonName.trim() === "") {
    errors.push(`Chemical ${chem.id}: Missing commonName`);
  }
  if (!chem.formula || chem.formula.trim() === "") {
    errors.push(`Chemical ${chem.id}: Missing formula`);
  } else {
    try {
      const parsed = parseFormula(chem.formula);
      if (Object.keys(parsed.composition).length === 0) {
        errors.push(`Chemical ${chem.id}: Empty composition for formula "${chem.formula}"`);
      }
    } catch (e: any) {
      errors.push(`Chemical ${chem.id}: Formula parse error "${chem.formula}": ${e.message}`);
    }
  }
  if (chem.density !== undefined && chem.density <= 0) {
    errors.push(`Chemical ${chem.id}: Non-positive density ${chem.density}`);
  }
  if (chem.meltingPointC !== undefined && chem.boilingPointC !== undefined) {
    if (chem.meltingPointC > chem.boilingPointC) {
      errors.push(`Chemical ${chem.id}: meltingPointC (${chem.meltingPointC}) > boilingPointC (${chem.boilingPointC})`);
    }
  }
  if (chem.substanceColor && !/^#[0-9A-Fa-f]{6}$/.test(chem.substanceColor)) {
    errors.push(`Chemical ${chem.id}: Invalid hex substanceColor "${chem.substanceColor}"`);
  }
}

// 2. Audit all Batch 5 Reactions
console.log("Checking Batch 5 Reactions...");
const reactionIds = new Set<string>();
for (const r of SEED_REACTIONS) reactionIds.add(r.id);

const reactantSets = new Set<string>();
for (const r of SEED_REACTIONS) {
  reactantSets.add(r.reactants.map(x => x.chemicalId).sort().join("+"));
}

for (const rxn of REACTIONS_BATCH_5) {
  // ID uniqueness
  if (!rxn.id || rxn.id.trim() === "") {
    errors.push(`Empty reaction ID found`);
    continue;
  }
  if (reactionIds.has(rxn.id)) {
    errors.push(`Duplicate reaction ID: "${rxn.id}"`);
  }
  reactionIds.add(rxn.id);

  // Reactant collision
  const rSetKey = rxn.reactants.map(x => x.chemicalId).sort().join("+");
  if (reactantSets.has(rSetKey)) {
    errors.push(`Reactant collision: [${rSetKey}] in reaction "${rxn.id}"`);
  }
  reactantSets.add(rSetKey);

  // Atom & Charge balance
  const leftElements: Record<string, number> = {};
  let leftCharge = 0;
  for (const r of rxn.reactants) {
    const c = allChems.get(r.chemicalId);
    if (!c) {
      errors.push(`${rxn.id}: Missing reactant chemical "${r.chemicalId}"`);
      continue;
    }
    const parsed = parseFormula(c.formula);
    for (const [el, cnt] of Object.entries(parsed.composition)) {
      leftElements[el] = (leftElements[el] || 0) + cnt * r.coefficient;
    }
    leftCharge += (c.charge ?? 0) * r.coefficient;
  }

  const rightElements: Record<string, number> = {};
  let rightCharge = 0;
  for (const p of rxn.products) {
    const c = allChems.get(p.chemicalId);
    if (!c) {
      errors.push(`${rxn.id}: Missing product chemical "${p.chemicalId}"`);
      continue;
    }
    const parsed = parseFormula(c.formula);
    for (const [el, cnt] of Object.entries(parsed.composition)) {
      rightElements[el] = (rightElements[el] || 0) + cnt * p.coefficient;
    }
    rightCharge += (c.charge ?? 0) * p.coefficient;
  }

  const allEls = new Set([...Object.keys(leftElements), ...Object.keys(rightElements)]);
  for (const el of allEls) {
    const l = leftElements[el] || 0;
    const r = rightElements[el] || 0;
    if (l !== r) {
      errors.push(`${rxn.id}: Unbalanced element ${el} (Reactants: ${l}, Products: ${r})`);
    }
  }
  if (leftCharge !== rightCharge) {
    errors.push(`${rxn.id}: Unbalanced charge (Reactants: ${leftCharge}, Products: ${rightCharge})`);
  }

  // Energy & Thermodynamics
  if (rxn.enthalpyKjPerMol !== undefined) {
    if (rxn.enthalpyKjPerMol < 0 && rxn.energyClassification !== "exothermic") {
      errors.push(`${rxn.id}: deltaH = ${rxn.enthalpyKjPerMol} < 0 but energyClassification is "${rxn.energyClassification}"`);
    }
    if (rxn.enthalpyKjPerMol > 0 && rxn.energyClassification !== "endothermic") {
      errors.push(`${rxn.id}: deltaH = ${rxn.enthalpyKjPerMol} > 0 but energyClassification is "${rxn.energyClassification}"`);
    }
  }

  // Observable Effects
  if (rxn.observableEffects) {
    for (const eff of rxn.observableEffects) {
      if (eff.colorFrom && !/^#[0-9A-Fa-f]{6}$/.test(eff.colorFrom)) {
        errors.push(`${rxn.id}: Invalid colorFrom "${eff.colorFrom}"`);
      }
      if (eff.colorTo && !/^#[0-9A-Fa-f]{6}$/.test(eff.colorTo)) {
        errors.push(`${rxn.id}: Invalid colorTo "${eff.colorTo}"`);
      }
      if (eff.relatedChemicalId && !allChems.has(eff.relatedChemicalId)) {
        errors.push(`${rxn.id}: Observable effect references unknown chemical "${eff.relatedChemicalId}"`);
      }
    }
  }

  // Temperature range
  if (rxn.temperatureMinC !== undefined && rxn.temperatureMaxC !== undefined) {
    if (rxn.temperatureMinC > rxn.temperatureMaxC) {
      errors.push(`${rxn.id}: temperatureMinC (${rxn.temperatureMinC}) > temperatureMaxC (${rxn.temperatureMaxC})`);
    }
  }
}

console.log("\n================ AUDIT RESULTS ================");
console.log(`Audited ${REACTIONS_BATCH_5.length} reactions and ${CHEMICALS_BATCH_5.length} chemicals.`);
console.log(`Total Errors: ${errors.length}`);
console.log(`Total Warnings: ${warnings.length}`);

if (errors.length > 0) {
  console.log("\nErrors:");
  errors.forEach(e => console.log("  ✗ " + e));
} else {
  console.log("✓ ALL CHECKS PASSED: Zero errors, zero discrepancies!");
}
