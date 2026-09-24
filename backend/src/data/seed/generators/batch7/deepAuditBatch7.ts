import { PrismaClient } from "@prisma/client";
import { SEED_CHEMICALS, type SeedChemical } from "../../chemicals.js";
import { CHEMICALS_BATCH_5 } from "../../chemicalsBatch5.js";
import { CHEMICALS_BATCH_6 } from "../../chemicalsBatch6.js";
import { CHEMICALS_BATCH_7 } from "../../chemicalsBatch7.js";
import { SEED_REACTIONS, type SeedReaction } from "../../reactions.js";
import { REACTIONS_BATCH_5 } from "../../reactionsBatch5.js";
import { REACTIONS_BATCH_6 } from "../../reactionsBatch6.js";
import { REACTIONS_BATCH_7 } from "../../reactionsBatch7.js";
import { parseFormula } from "../../../../chemistry-engine/formulaParser.js";
import { computeMolarMass } from "../../../../chemistry-engine/molarMass.js";
import { ELEMENT_DATA, ELEMENT_SYMBOLS } from "../../../../chemistry-engine/elementData.js";

const prisma = new PrismaClient();

const allChemicals = new Map<string, SeedChemical>();
for (const c of SEED_CHEMICALS) allChemicals.set(c.id, c);
for (const c of CHEMICALS_BATCH_5) allChemicals.set(c.id, c);
for (const c of CHEMICALS_BATCH_6) allChemicals.set(c.id, c);
for (const c of CHEMICALS_BATCH_7) allChemicals.set(c.id, c);

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

const VALID_PHYSICAL_STATES = new Set(["solid", "liquid", "gas", "aqueous"]);

interface AuditResult {
  scope: string;
  totalChecked: number;
  errors: string[];
  warnings: string[];
}

function auditChemicalRegistry(chems: SeedChemical[], scope: string): AuditResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const seenIds = new Set<string>();

  for (const c of chems) {
    // 1. ID check
    if (!c.id || c.id.trim() === "") {
      errors.push(`[${scope}] Empty chemical ID found.`);
      continue;
    }
    if (seenIds.has(c.id)) {
      errors.push(`[${scope}] Duplicate chemical ID: "${c.id}".`);
    }
    seenIds.add(c.id);

    // 2. Names
    if (!c.commonName || c.commonName.trim() === "") {
      errors.push(`[${scope}] Chemical "${c.id}": Missing commonName.`);
    }

    // 3. Formula & Composition
    if (!c.formula || c.formula.trim() === "") {
      errors.push(`[${scope}] Chemical "${c.id}": Missing formula.`);
    } else {
      try {
        const parsed = parseFormula(c.formula);
        const elements = Object.keys(parsed.composition);
        if (elements.length === 0) {
          errors.push(`[${scope}] Chemical "${c.id}": Empty parsed composition for "${c.formula}".`);
        }
        for (const el of elements) {
          if (!ELEMENT_DATA.has(el)) {
            errors.push(`[${scope}] Chemical "${c.id}": Unknown element "${el}" in formula "${c.formula}".`);
          }
        }
        // Verify molar mass calculation
        const computedMass = computeMolarMass(parsed.composition);
        const statedMass = (c as any).molarMass;
        if (statedMass !== undefined && Math.abs(statedMass - computedMass) > 0.5) {
          warnings.push(`[${scope}] Chemical "${c.id}": Stated molar mass (${statedMass}) differs from computed (${computedMass.toFixed(2)}) for "${c.formula}".`);
        }
      } catch (err: any) {
        errors.push(`[${scope}] Chemical "${c.id}": Formula parsing failed for "${c.formula}": ${err.message}`);
      }
    }

    // 4. Physical State
    if (!VALID_PHYSICAL_STATES.has(c.physicalState)) {
      errors.push(`[${scope}] Chemical "${c.id}": Invalid physicalState "${c.physicalState}".`);
    }

    // 5. Density
    if (c.density !== undefined && c.density <= 0) {
      errors.push(`[${scope}] Chemical "${c.id}": Non-positive density (${c.density}).`);
    }

    // 6. Melting / Boiling points
    if (c.meltingPointC !== undefined && c.boilingPointC !== undefined) {
      if (c.meltingPointC > c.boilingPointC) {
        errors.push(`[${scope}] Chemical "${c.id}": meltingPointC (${c.meltingPointC}°C) > boilingPointC (${c.boilingPointC}°C).`);
      }
    }

    // 7. Substance color hex
    if (c.substanceColor && !/^#[0-9A-Fa-f]{6}$/.test(c.substanceColor)) {
      errors.push(`[${scope}] Chemical "${c.id}": Invalid substanceColor hex "${c.substanceColor}".`);
    }

    // 8. Dissociation charge balance if provided
    if (c.dissociation) {
      const netDissCharge = (c.dissociation.cation.charge || 0) + (c.dissociation.anion.charge || 0);
      if (netDissCharge !== (c.charge || 0) && !c.dissociation.cation.formula.includes("2")) {
        // Just flag as warning if simple 1:1 charge mismatch
        warnings.push(`[${scope}] Chemical "${c.id}": Dissociation charges (${c.dissociation.cation.charge} + ${c.dissociation.anion.charge}) != net charge (${c.charge || 0}).`);
      }
    }
  }

  return { scope, totalChecked: chems.length, errors, warnings };
}

function auditReactionsList(reactions: SeedReaction[], scope: string, existingKeys?: Set<string>): AuditResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const seenIds = new Set<string>();
  const seenKeys = existingKeys ? new Set(existingKeys) : new Set<string>();

  for (const rxn of reactions) {
    // 1. ID check
    if (!rxn.id || rxn.id.trim() === "") {
      errors.push(`[${scope}] Empty reaction ID found.`);
      continue;
    }
    if (seenIds.has(rxn.id)) {
      errors.push(`[${scope}] Duplicate reaction ID: "${rxn.id}".`);
    }
    seenIds.add(rxn.id);

    // 2. Name check
    if (!rxn.name || rxn.name.trim() === "") {
      errors.push(`[${scope}] Reaction "${rxn.id}": Missing name.`);
    }

    // 3. Reactant key & collisions
    const reactantIds = rxn.reactants.map(r => r.chemicalId.trim().toLowerCase());
    const reactantKey = [...reactantIds].sort().join("+");
    if (seenKeys.has(reactantKey)) {
      errors.push(`[${scope}] Collision: reactantKey "${reactantKey}" in reaction "${rxn.id}" already exists.`);
    } else {
      seenKeys.add(reactantKey);
    }

    // 4. Reactants & Products count
    if (!rxn.reactants || rxn.reactants.length === 0) {
      errors.push(`[${scope}] Reaction "${rxn.id}": Has no reactants.`);
    }
    if (!rxn.products || rxn.products.length === 0) {
      errors.push(`[${scope}] Reaction "${rxn.id}": Has no products.`);
    }

    // 5. Positive coefficients & cross-side duplicates
    const reactantSet = new Set<string>();
    for (const r of rxn.reactants || []) {
      if (!r.coefficient || r.coefficient <= 0 || !Number.isInteger(r.coefficient)) {
        errors.push(`[${scope}] Reaction "${rxn.id}": Invalid reactant coefficient ${r.coefficient} for "${r.chemicalId}".`);
      }
      reactantSet.add(r.chemicalId);
    }

    for (const p of rxn.products || []) {
      if (!p.coefficient || p.coefficient <= 0 || !Number.isInteger(p.coefficient)) {
        errors.push(`[${scope}] Reaction "${rxn.id}": Invalid product coefficient ${p.coefficient} for "${p.chemicalId}".`);
      }
      if (reactantSet.has(p.chemicalId)) {
        errors.push(`[${scope}] Reaction "${rxn.id}": Species "${p.chemicalId}" appears on BOTH reactant and product side.`);
      }
    }

    // 6. Stoichiometric Element & Charge Balance
    const leftElements: Record<string, number> = {};
    let leftCharge = 0;
    let missingSpecies = false;

    for (const r of rxn.reactants || []) {
      const chem = allChemicals.get(r.chemicalId);
      if (!chem) {
        errors.push(`[${scope}] Reaction "${rxn.id}": Unknown reactant chemicalId "${r.chemicalId}".`);
        missingSpecies = true;
        continue;
      }
      try {
        const parsed = parseFormula(chem.formula);
        for (const [el, count] of Object.entries(parsed.composition)) {
          leftElements[el] = (leftElements[el] || 0) + count * r.coefficient;
        }
        leftCharge += (chem.charge ?? 0) * r.coefficient;
      } catch (err: any) {
        errors.push(`[${scope}] Reaction "${rxn.id}": Failed parsing reactant formula "${chem.formula}": ${err.message}`);
        missingSpecies = true;
      }
    }

    const rightElements: Record<string, number> = {};
    let rightCharge = 0;

    for (const p of rxn.products || []) {
      const chem = allChemicals.get(p.chemicalId);
      if (!chem) {
        errors.push(`[${scope}] Reaction "${rxn.id}": Unknown product chemicalId "${p.chemicalId}".`);
        missingSpecies = true;
        continue;
      }
      try {
        const parsed = parseFormula(chem.formula);
        for (const [el, count] of Object.entries(parsed.composition)) {
          rightElements[el] = (rightElements[el] || 0) + count * p.coefficient;
        }
        rightCharge += (chem.charge ?? 0) * p.coefficient;
      } catch (err: any) {
        errors.push(`[${scope}] Reaction "${rxn.id}": Failed parsing product formula "${chem.formula}": ${err.message}`);
        missingSpecies = true;
      }
    }

    if (!missingSpecies) {
      const allElements = new Set([...Object.keys(leftElements), ...Object.keys(rightElements)]);
      for (const el of allElements) {
        const l = leftElements[el] || 0;
        const r = rightElements[el] || 0;
        if (l !== r) {
          errors.push(`[${scope}] Reaction "${rxn.id}": Unbalanced element "${el}" (${l} left vs ${r} right).`);
        }
      }
      if (leftCharge !== rightCharge) {
        errors.push(`[${scope}] Reaction "${rxn.id}": Unbalanced charge (${leftCharge} left vs ${rightCharge} right).`);
      }
    }

    // 7. Reaction Type Validation
    if (!VALID_REACTION_TYPES.has(rxn.reactionType)) {
      errors.push(`[${scope}] Reaction "${rxn.id}": Invalid reactionType "${rxn.reactionType}".`);
    }

    // 8. Thermodynamics & Enthalpy
    if (rxn.enthalpyKjPerMol !== undefined) {
      if (rxn.enthalpyKjPerMol < 0 && rxn.energyClassification !== "exothermic") {
        errors.push(`[${scope}] Reaction "${rxn.id}": enthalpy is ${rxn.enthalpyKjPerMol} kJ/mol but energyClassification is "${rxn.energyClassification}".`);
      } else if (rxn.enthalpyKjPerMol > 0 && rxn.energyClassification !== "endothermic") {
        errors.push(`[${scope}] Reaction "${rxn.id}": enthalpy is ${rxn.enthalpyKjPerMol} kJ/mol but energyClassification is "${rxn.energyClassification}".`);
      }
    }

    // 9. Temperature Range
    if (rxn.temperatureMinC !== undefined && rxn.temperatureMaxC !== undefined) {
      if (rxn.temperatureMinC > rxn.temperatureMaxC) {
        errors.push(`[${scope}] Reaction "${rxn.id}": temperatureMinC (${rxn.temperatureMinC}) > temperatureMaxC (${rxn.temperatureMaxC}).`);
      }
    }

    // 10. Observable Effects
    const allReactionSpeciesIds = new Set([...rxn.reactants.map(r => r.chemicalId), ...rxn.products.map(p => p.chemicalId)]);
    for (const eff of rxn.observableEffects || []) {
      if (!VALID_EFFECT_TYPES.has(eff.type)) {
        errors.push(`[${scope}] Reaction "${rxn.id}": Invalid observable effect type "${eff.type}".`);
      }
      if (eff.colorFrom && !/^#[0-9A-Fa-f]{6}$/.test(eff.colorFrom)) {
        errors.push(`[${scope}] Reaction "${rxn.id}": Invalid colorFrom hex "${eff.colorFrom}".`);
      }
      if (eff.colorTo && !/^#[0-9A-Fa-f]{6}$/.test(eff.colorTo)) {
        errors.push(`[${scope}] Reaction "${rxn.id}": Invalid colorTo hex "${eff.colorTo}".`);
      }
      if (eff.relatedChemicalId) {
        if (!allChemicals.has(eff.relatedChemicalId)) {
          errors.push(`[${scope}] Reaction "${rxn.id}": Unknown relatedChemicalId "${eff.relatedChemicalId}".`);
        } else if (!allReactionSpeciesIds.has(eff.relatedChemicalId)) {
          warnings.push(`[${scope}] Reaction "${rxn.id}": relatedChemicalId "${eff.relatedChemicalId}" is not a reactant or product.`);
        }
      }
      if (eff.type === "precipitation") {
        // Verify at least one product is solid or insoluble
        const hasSolidProduct = rxn.products.some(p => {
          const c = allChemicals.get(p.chemicalId);
          return c && (c.physicalState === "solid" || (c.solubilityNotes && c.solubilityNotes.toLowerCase().includes("insoluble")));
        });
        if (!hasSolidProduct) {
          warnings.push(`[${scope}] Reaction "${rxn.id}": Observable effect is precipitation, but no product has physicalState="solid".`);
        }
      }
      if (eff.type === "gas_evolution") {
        // Verify at least one product is gas
        const hasGasProduct = rxn.products.some(p => {
          const c = allChemicals.get(p.chemicalId);
          return c && (c.physicalState === "gas" || ["co2", "h2", "o2", "n2", "nh3", "so2", "cl2", "no2", "h2s"].includes(c.id));
        });
        if (!hasGasProduct) {
          warnings.push(`[${scope}] Reaction "${rxn.id}": Observable effect is gas_evolution, but no product is gas.`);
        }
      }
    }

    // 11. Equation display check
    if (!rxn.equationDisplay || rxn.equationDisplay.trim() === "") {
      errors.push(`[${scope}] Reaction "${rxn.id}": Empty equationDisplay.`);
    } else {
      // Check that arrow is present
      if (!rxn.equationDisplay.includes("→") && !rxn.equationDisplay.includes("->")) {
        errors.push(`[${scope}] Reaction "${rxn.id}": equationDisplay missing reaction arrow: "${rxn.equationDisplay}".`);
      }
    }
  }

  return { scope, totalChecked: reactions.length, errors, warnings };
}

async function runDeepAudit() {
  console.log("=================================================================");
  console.log("       COMPREHENSIVE DEEP AUDIT OF REACTION DATA QUALITY         ");
  console.log("=================================================================\n");

  // A. Audit Chemicals Batch 7
  console.log(">>> Phase 1: Auditing Batch 7 Chemicals (156 chemicals)...");
  const missingElements = new Set<string>();
  for (const c of CHEMICALS_BATCH_7) {
    const matches = c.formula.match(/[A-Z][a-z]?/g) || [];
    for (const m of matches) {
      if (ELEMENT_SYMBOLS.has(m) && !ELEMENT_DATA.has(m)) {
        missingElements.add(m);
      }
    }
  }
  console.log("Missing elements in ELEMENT_DATA:", Array.from(missingElements).sort());

  const chemRes = auditChemicalRegistry(CHEMICALS_BATCH_7, "Batch 7 Chemicals");
  console.log(`Checked: ${chemRes.totalChecked} chemicals`);
  console.log(`Errors:  ${chemRes.errors.length}`);
  console.log(`Warnings: ${chemRes.warnings.length}\n`);

  // B. Audit Reactions Batch 7
  console.log(">>> Phase 2: Auditing Batch 7 Reactions (1,000 reactions)...");
  // Gather baseline keys before Batch 7
  const priorKeys = new Set<string>();
  for (const r of SEED_REACTIONS) priorKeys.add(r.reactants.map(x => x.chemicalId.trim().toLowerCase()).sort().join("+"));
  for (const r of REACTIONS_BATCH_5) priorKeys.add(r.reactants.map(x => x.chemicalId.trim().toLowerCase()).sort().join("+"));
  for (const r of REACTIONS_BATCH_6) priorKeys.add(r.reactants.map(x => x.chemicalId.trim().toLowerCase()).sort().join("+"));

  const rxnRes = auditReactionsList(REACTIONS_BATCH_7, "Batch 7 Reactions", priorKeys);
  console.log(`Checked: ${rxnRes.totalChecked} reactions`);
  console.log(`Errors:  ${rxnRes.errors.length}`);
  console.log(`Warnings: ${rxnRes.warnings.length}\n`);

  // C. Audit DB Records (dev.db)
  console.log(">>> Phase 3: Auditing Database Records in dev.db (3,891 reactions)...");
  const dbRows = await prisma.reaction.findMany();
  console.log(`Total rows in dev.db: ${dbRows.length}`);

  const dbReactions: SeedReaction[] = dbRows.map(r => ({
    id: r.id,
    name: r.name,
    reactionType: r.reactionType as any,
    reactants: r.reactants as any,
    products: r.products as any,
    equationDisplay: r.equation,
    netIonicEquation: r.netIonicEquation ?? undefined,
    confidenceScore: r.confidenceScore,
    energyClassification: ((r.conditions as any)?.energyClassification) ?? "neutral",
    enthalpyKjPerMol: ((r.conditions as any)?.enthalpyKjPerMol) ?? undefined,
    temperatureMinC: ((r.conditions as any)?.temperatureMinC) ?? undefined,
    temperatureMaxC: ((r.conditions as any)?.temperatureMaxC) ?? undefined,
    solvent: ((r.conditions as any)?.solvent) ?? undefined,
    catalystChemicalId: ((r.conditions as any)?.catalystChemicalId) ?? undefined,
    experimentalStatus: r.verified ? "experimentally_verified" : "heuristic",
    observableEffects: (r.observations as any[]) || [],
    source: r.source,
    safetyNotes: (r.hazards as any)?.safetyNotes ?? undefined,
  }));

  // Separate batch 7 from legacy reactions in DB
  const dbBatch7Rows = dbReactions.filter(r => 
    ["nuc-", "organo-", "bat-", "mof-", "food-", "petro-", "env-", "ree-", "pyro-", "forensic-"].some(p => r.id.startsWith(p))
  );
  console.log(`Identified Batch 7 rows in dev.db: ${dbBatch7Rows.length}`);
  const dbBatch7Res = auditReactionsList(dbBatch7Rows, "dev.db Batch 7");
  console.log(`Batch 7 in DB Errors:   ${dbBatch7Res.errors.length}`);
  console.log(`Batch 7 in DB Warnings: ${dbBatch7Res.warnings.length}\n`);

  console.log("=================================================================");
  console.log("                        AUDIT REPORT                             ");
  console.log("=================================================================");
  const allErrors = [...chemRes.errors, ...rxnRes.errors, ...dbBatch7Res.errors];
  const allWarnings = [...chemRes.warnings, ...rxnRes.warnings, ...dbBatch7Res.warnings];

  if (allErrors.length === 0) {
    console.log("✓ SUCCESS: 0 ERRORS across all checks!");
  } else {
    console.log(`✗ FOUND ${allErrors.length} ERRORS:`);
    allErrors.slice(0, 50).forEach(e => console.log("  - " + e));
    if (allErrors.length > 50) console.log(`  ... and ${allErrors.length - 50} more errors`);
  }

  if (allWarnings.length > 0) {
    console.log(`\nINFORMATIONAL NOTICES (${allWarnings.length}):`);
    allWarnings.slice(0, 30).forEach(w => console.log("  ℹ " + w));
    if (allWarnings.length > 30) console.log(`  ... and ${allWarnings.length - 30} more notices`);
  }
  console.log("=================================================================\n");
}

runDeepAudit()
  .catch(err => {
    console.error("Deep audit failed with error:", err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
