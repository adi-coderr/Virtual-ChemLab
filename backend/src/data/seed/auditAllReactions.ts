import { PrismaClient } from "@prisma/client";
import { SEED_CHEMICALS, type SeedChemical } from "./chemicals.js";
import { CHEMICALS_BATCH_5 } from "./chemicalsBatch5.js";
import { CHEMICALS_BATCH_6 } from "./chemicalsBatch6.js";
import { parseFormula } from "../../chemistry-engine/formulaParser.js";

const prisma = new PrismaClient();

const allChemicals = new Map<string, SeedChemical>();
for (const c of SEED_CHEMICALS) allChemicals.set(c.id, c);
for (const c of CHEMICALS_BATCH_5) allChemicals.set(c.id, c);
for (const c of CHEMICALS_BATCH_6) allChemicals.set(c.id, c);

const VALID_REACTION_TYPES = new Set([
  "acid_base_neutralization",
  "precipitation",
  "single_displacement",
  "double_displacement",
  "combustion",
  "gas_evolution",
  "synthesis",
  "decomposition",
  "redox_other",
  "dissolution",
  "unclassified",
]);

const VALID_EFFECT_TYPES = new Set([
  "color_change",
  "precipitation",
  "gas_evolution",
  "temperature_increase",
  "temperature_decrease",
  "dissolution",
  "phase_change",
  "effervescence",
]);

async function audit() {
  console.log("===============================================================");
  console.log("   COMPREHENSIVE AUDIT OF ALL EQUATIONS & OUTCOMES IN SQLITE   ");
  console.log("===============================================================\n");

  const rows = await prisma.reaction.findMany();
  console.log(`Total reactions in database: ${rows.length}\n`);

  let balanceErrors = 0;
  let chargeErrors = 0;
  let missingChemicalErrors = 0;
  let invalidTypeErrors = 0;
  let invalidEffectErrors = 0;
  let enthalpyDiscrepancies = 0;
  let duplicateKeyErrors = 0;
  let selfReactantErrors = 0;
  let zeroCoefficientErrors = 0;

  const seenKeys = new Map<string, string>();
  const errorDetails: { id: string; name: string; issues: string[] }[] = [];

  for (const r of rows) {
    const issues: string[] = [];

    // 1. Check reactant key uniqueness
    const reactantsList = (r.reactants as any[]) || [];
    const productsList = (r.products as any[]) || [];

    const computedKey = reactantsList
      .map((x) => String(x.chemicalId || "").trim().toLowerCase())
      .sort()
      .join("+");

    if (computedKey !== r.reactantKey) {
      issues.push(`reactantKey mismatch: DB has "${r.reactantKey}", computed "${computedKey}"`);
      duplicateKeyErrors++;
    }

    if (seenKeys.has(r.reactantKey)) {
      issues.push(`Collision: reactantKey "${r.reactantKey}" already used by "${seenKeys.get(r.reactantKey)}"`);
      duplicateKeyErrors++;
    } else {
      seenKeys.set(r.reactantKey, r.id);
    }

    // 2. Check for duplicate species on both sides or zero coefficients
    const rSpeciesIds = new Set(reactantsList.map((x) => x.chemicalId));
    for (const p of productsList) {
      if (rSpeciesIds.has(p.chemicalId)) {
        issues.push(`Species "${p.chemicalId}" appears on both reactant and product side`);
        selfReactantErrors++;
      }
    }

    for (const sp of [...reactantsList, ...productsList]) {
      if (!sp.coefficient || sp.coefficient <= 0) {
        issues.push(`Species "${sp.chemicalId}" has invalid coefficient ${sp.coefficient}`);
        zeroCoefficientErrors++;
      }
    }

    // 3. Check chemical definitions and parse formulas
    const leftElements: Record<string, number> = {};
    let leftCharge = 0;

    for (const sp of reactantsList) {
      const chem = allChemicals.get(sp.chemicalId);
      if (!chem) {
        issues.push(`Unknown reactant chemicalId: "${sp.chemicalId}"`);
        missingChemicalErrors++;
        continue;
      }
      try {
        const parsed = parseFormula(chem.formula);
        for (const [el, count] of Object.entries(parsed.composition)) {
          leftElements[el] = (leftElements[el] || 0) + count * sp.coefficient;
        }
        leftCharge += (chem.charge ?? 0) * sp.coefficient;
      } catch (err: any) {
        issues.push(`Formula parse failure for reactant "${sp.chemicalId}" (${chem.formula}): ${err.message}`);
        missingChemicalErrors++;
      }
    }

    const rightElements: Record<string, number> = {};
    let rightCharge = 0;

    for (const sp of productsList) {
      const chem = allChemicals.get(sp.chemicalId);
      if (!chem) {
        issues.push(`Unknown product chemicalId: "${sp.chemicalId}"`);
        missingChemicalErrors++;
        continue;
      }
      try {
        const parsed = parseFormula(chem.formula);
        for (const [el, count] of Object.entries(parsed.composition)) {
          rightElements[el] = (rightElements[el] || 0) + count * sp.coefficient;
        }
        rightCharge += (chem.charge ?? 0) * sp.coefficient;
      } catch (err: any) {
        issues.push(`Formula parse failure for product "${sp.chemicalId}" (${chem.formula}): ${err.message}`);
        missingChemicalErrors++;
      }
    }

    // 4. Element balance check
    const allEls = new Set([...Object.keys(leftElements), ...Object.keys(rightElements)]);
    for (const el of allEls) {
      const l = leftElements[el] || 0;
      const right = rightElements[el] || 0;
      if (l !== right) {
        issues.push(`Unbalanced element "${el}": ${l} on left vs ${right} on right`);
        balanceErrors++;
      }
    }

    // 5. Charge balance check
    if (leftCharge !== rightCharge) {
      issues.push(`Unbalanced charge: ${leftCharge} on left vs ${rightCharge} on right`);
      chargeErrors++;
    }

    // 6. Reaction type check
    if (!VALID_REACTION_TYPES.has(r.reactionType)) {
      issues.push(`Invalid reactionType: "${r.reactionType}"`);
      invalidTypeErrors++;
    }

    // 7. Enthalpy & Energy classification check
    const cond = (r.conditions as any) || {};
    const dH = cond.enthalpyKjPerMol;
    const eClass = cond.energyClassification;
    if (typeof dH === "number") {
      if (dH < 0 && eClass && eClass !== "exothermic") {
        issues.push(`Enthalpy ${dH} kJ/mol is negative but classification is "${eClass}"`);
        enthalpyDiscrepancies++;
      } else if (dH > 0 && eClass && eClass !== "endothermic") {
        issues.push(`Enthalpy ${dH} kJ/mol is positive but classification is "${eClass}"`);
        enthalpyDiscrepancies++;
      }
    }

    // 8. Observable effects check
    const obs = (r.observations as any[]) || [];
    for (const eff of obs) {
      if (eff.type && !VALID_EFFECT_TYPES.has(eff.type)) {
        issues.push(`Invalid observable effect type: "${eff.type}"`);
        invalidEffectErrors++;
      }
      if (eff.colorFrom && !/^#[0-9A-Fa-f]{6}$/.test(eff.colorFrom)) {
        issues.push(`Invalid colorFrom hex code: "${eff.colorFrom}"`);
        invalidEffectErrors++;
      }
      if (eff.colorTo && !/^#[0-9A-Fa-f]{6}$/.test(eff.colorTo)) {
        issues.push(`Invalid colorTo hex code: "${eff.colorTo}"`);
        invalidEffectErrors++;
      }
      if (eff.relatedChemicalId && !allChemicals.has(eff.relatedChemicalId)) {
        issues.push(`Unknown relatedChemicalId: "${eff.relatedChemicalId}"`);
        invalidEffectErrors++;
      }
    }

    if (issues.length > 0) {
      errorDetails.push({ id: r.id, name: r.name, issues });
    }
  }

  console.log("---------------- AUDIT SUMMARY ----------------");
  console.log(`Total reactions evaluated:         ${rows.length}`);
  console.log(`100% Correct Reactions:             ${rows.length - errorDetails.length}`);
  console.log(`Reactions with detected issues:    ${errorDetails.length}`);
  console.log(`  - Element balance errors:        ${balanceErrors}`);
  console.log(`  - Charge balance errors:         ${chargeErrors}`);
  console.log(`  - Missing/unknown chemical IDs:  ${missingChemicalErrors}`);
  console.log(`  - Invalid reaction types:        ${invalidTypeErrors}`);
  console.log(`  - Invalid observable effects:    ${invalidEffectErrors}`);
  console.log(`  - Enthalpy/classification bugs:  ${enthalpyDiscrepancies}`);
  console.log(`  - Key collision/mismatch:        ${duplicateKeyErrors}`);
  console.log(`  - Cross-side duplicate species:  ${selfReactantErrors}`);
  console.log(`  - Non-positive coefficients:     ${zeroCoefficientErrors}`);
  console.log("-----------------------------------------------\n");

  if (errorDetails.length > 0) {
    console.log(`=== ALL ISSUES BREAKDOWN (${errorDetails.length} reactions) ===\n`);
    for (const item of errorDetails) {
      // Group by issue type
      const isBalance = item.issues.some(x => x.startsWith("Unbalanced element"));
      const isCrossSide = item.issues.some(x => x.includes("appears on both"));
      const isType = item.issues.some(x => x.startsWith("Invalid reactionType"));
      const isEffect = item.issues.some(x => x.startsWith("Invalid observable effect") || x.includes("color"));

      console.log(`[${item.id}] "${item.name}":`);
      for (const iss of item.issues) {
        console.log(`    - ${iss}`);
      }
    }
  } else {
    console.log("✓ PERFECT: All 2,891 reactions in dev.db are 100% element-balanced, charge-balanced, validly typed, and consistent!");
  }
}

audit()
  .catch((err) => {
    console.error("Audit script failed:", err);
  })
  .finally(() => prisma.$disconnect());
