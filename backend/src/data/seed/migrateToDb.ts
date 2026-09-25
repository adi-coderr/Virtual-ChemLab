import { PrismaClient } from "@prisma/client";
import { SEED_REACTIONS, type SeedReaction } from "./reactions.js";
import { REACTIONS_BATCH_5 } from "./reactionsBatch5.js";
import { REACTIONS_BATCH_6 } from "./reactionsBatch6.js";
import { REACTIONS_BATCH_7 } from "./reactionsBatch7.js";
import { REACTIONS_BATCH_8 } from "./reactionsBatch8.js";
import { SEED_CHEMICALS, type SeedChemical } from "./chemicals.js";
import { CHEMICALS_BATCH_5 } from "./chemicalsBatch5.js";
import { CHEMICALS_BATCH_6 } from "./chemicalsBatch6.js";
import { CHEMICALS_BATCH_7 } from "./chemicalsBatch7.js";
import { CHEMICALS_BATCH_8 } from "./chemicalsBatch8.js";
import { parseFormula } from "../../chemistry-engine/formulaParser.js";

const prisma = new PrismaClient();

// Build combined chemical registry for validation
const allChemicals = new Map<string, SeedChemical>();
for (const c of SEED_CHEMICALS) allChemicals.set(c.id, c);
for (const c of CHEMICALS_BATCH_5) allChemicals.set(c.id, c);
for (const c of CHEMICALS_BATCH_6) allChemicals.set(c.id, c);
for (const c of CHEMICALS_BATCH_7) allChemicals.set(c.id, c);
for (const c of CHEMICALS_BATCH_8) allChemicals.set(c.id, c);

/**
 * Normalizes a list of reactant chemical IDs into a sorted, deterministic key.
 * e.g. ["nacl", "agno3"] -> "agno3+nacl"
 */
export function normalizeReactantKey(reactants: { chemicalId: string }[]): string {
  return reactants
    .map((r) => r.chemicalId.trim().toLowerCase())
    .sort()
    .join("+");
}

/**
 * Validates that a reaction is strictly atom- and charge-balanced
 * based on the chemical formulas in the chemical database.
 */
function validateReactionBalance(rxn: SeedReaction): { valid: boolean; reason?: string } {
  const leftElements: Record<string, number> = {};
  let leftCharge = 0;

  for (const r of rxn.reactants) {
    const chem = allChemicals.get(r.chemicalId);
    if (!chem) {
      return { valid: false, reason: `Unknown reactant chemicalId: "${r.chemicalId}"` };
    }
    try {
      const parsed = parseFormula(chem.formula);
      for (const [el, count] of Object.entries(parsed.composition)) {
        leftElements[el] = (leftElements[el] || 0) + count * r.coefficient;
      }
      leftCharge += (chem.charge ?? 0) * r.coefficient;
    } catch (e: any) {
      return { valid: false, reason: `Formula parse failed for "${r.chemicalId}": ${e.message}` };
    }
  }

  const rightElements: Record<string, number> = {};
  let rightCharge = 0;

  for (const p of rxn.products) {
    const chem = allChemicals.get(p.chemicalId);
    if (!chem) {
      return { valid: false, reason: `Unknown product chemicalId: "${p.chemicalId}"` };
    }
    try {
      const parsed = parseFormula(chem.formula);
      for (const [el, count] of Object.entries(parsed.composition)) {
        rightElements[el] = (rightElements[el] || 0) + count * p.coefficient;
      }
      rightCharge += (chem.charge ?? 0) * p.coefficient;
    } catch (e: any) {
      return { valid: false, reason: `Formula parse failed for "${p.chemicalId}": ${e.message}` };
    }
  }

  const allElements = new Set([...Object.keys(leftElements), ...Object.keys(rightElements)]);
  for (const el of allElements) {
    const l = leftElements[el] || 0;
    const r = rightElements[el] || 0;
    if (l !== r) {
      return { valid: false, reason: `Unbalanced element "${el}": ${l} on left vs ${r} on right` };
    }
  }

  if (leftCharge !== rightCharge) {
    return { valid: false, reason: `Unbalanced charge: ${leftCharge} on left vs ${rightCharge} on right` };
  }

  return { valid: true };
}

async function migrate() {
  console.log("=================================================");
  console.log("   MIGRATING CHEMICAL REACTIONS TO SQLITE DB     ");
  console.log("=================================================\n");

  const combinedReactions: SeedReaction[] = [
    ...SEED_REACTIONS,
    ...REACTIONS_BATCH_5,
    ...REACTIONS_BATCH_6,
    ...REACTIONS_BATCH_7,
    ...REACTIONS_BATCH_8,
  ];
  console.log(`Total candidate reactions to process: ${combinedReactions.length}`);
  console.log(`  - SEED_REACTIONS: ${SEED_REACTIONS.length}`);
  console.log(`  - REACTIONS_BATCH_5: ${REACTIONS_BATCH_5.length}`);
  console.log(`  - REACTIONS_BATCH_6: ${REACTIONS_BATCH_6.length}`);
  console.log(`  - REACTIONS_BATCH_7: ${REACTIONS_BATCH_7.length}`);
  console.log(`  - REACTIONS_BATCH_8: ${REACTIONS_BATCH_8.length}\n`);

  // Query existing records in database to ensure full idempotency (safe to re-run anytime)
  const existingRows = await prisma.reaction.findMany({
    select: { id: true, reactantKey: true },
  });
  const existingKeys = new Set<string>(existingRows.map((r) => r.reactantKey));
  const existingIds = new Set<string>(existingRows.map((r) => r.id));
  if (existingRows.length > 0) {
    console.log(`Found ${existingRows.length} existing reactions in database. Duplicates will be safely skipped.\n`);
  }

  let validCount = 0;
  let invalidCount = 0;
  let duplicateKeyCount = 0;

  const validRecords: any[] = [];
  const queuedReactantKeys = new Set<string>();

  for (const rxn of combinedReactions) {
    // 1. Balance validation
    const validation = validateReactionBalance(rxn);
    if (!validation.valid) {
      console.warn(`[INVALID] Reaction "${rxn.id}" (${rxn.name}): ${validation.reason}`);
      invalidCount++;
      continue;
    }

    // 2. Normalize reactant key
    const reactantKey = normalizeReactantKey(rxn.reactants);
    if (existingIds.has(rxn.id)) {
      await prisma.reaction.update({
        where: { id: rxn.id },
        data: {
          equation: rxn.equationDisplay,
          products: rxn.products as any,
          observations: (rxn.observableEffects || []) as any,
        },
      });
      duplicateKeyCount++;
      continue;
    }
    if (existingKeys.has(reactantKey)) {
      duplicateKeyCount++;
      continue;
    }
    if (queuedReactantKeys.has(reactantKey)) {
      console.warn(`[DUPLICATE KEY] Skipping "${rxn.id}" - key "${reactantKey}" already queued`);
      duplicateKeyCount++;
      continue;
    }
    queuedReactantKeys.add(reactantKey);

    // 3. Format record for Prisma
    const record = {
      id: rxn.id,
      reactantKey,
      name: rxn.name,
      equation: rxn.equationDisplay,
      netIonicEquation: rxn.netIonicEquation ?? null,
      reactionType: rxn.reactionType,
      reactants: rxn.reactants as any,
      products: rxn.products as any,
      conditions: {
        temperatureMinC: rxn.temperatureMinC,
        temperatureMaxC: rxn.temperatureMaxC,
        solvent: rxn.solvent ?? "water",
        catalystChemicalId: rxn.catalystChemicalId,
        enthalpyKjPerMol: rxn.enthalpyKjPerMol,
        energyClassification: rxn.energyClassification,
      } as any,
      observations: (rxn.observableEffects || []) as any,
      hazards: {
        safetyNotes: rxn.safetyNotes ?? null,
      } as any,
      source: "curated",
      verified: rxn.experimentalStatus === "experimentally_verified",
      confidenceScore: rxn.confidenceScore ?? 0.99,
    };

    validRecords.push(record);
    validCount++;
  }

  console.log(`Validation complete:`);
  console.log(`  ✓ Valid & ready to insert: ${validCount}`);
  console.log(`  ✗ Invalid (unbalanced/errors): ${invalidCount}`);
  console.log(`  ⚠ Skipped existing/duplicate keys: ${duplicateKeyCount}\n`);

  // 4. Batch insert in chunks of 1000
  const BATCH_SIZE = 1000;
  let totalInserted = 0;

  for (let i = 0; i < validRecords.length; i += BATCH_SIZE) {
    const chunk = validRecords.slice(i, i + BATCH_SIZE);
    const result = await prisma.reaction.createMany({
      data: chunk,
    });
    totalInserted += result.count;
    console.log(
      `Inserted batch ${Math.floor(i / BATCH_SIZE) + 1}: ${result.count} rows (rows ${i + 1} to ${Math.min(
        i + BATCH_SIZE,
        validRecords.length
      )})`
    );
  }

  // 5. Final verification count
  const dbCount = await prisma.reaction.count();

  console.log("\n=================================================");
  console.log("            MIGRATION SUMMARY                    ");
  console.log("=================================================");
  console.log(`Total candidate input:       ${combinedReactions.length}`);
  console.log(`Successfully inserted:       ${totalInserted}`);
  console.log(`Skipped (existing/dups):     ${duplicateKeyCount}`);
  console.log(`Invalid (unbalanced/errors): ${invalidCount}`);
  console.log(`Total rows in database:      ${dbCount}`);
  console.log("=================================================\n");
}

migrate()
  .catch((err) => {
    console.error("Migration failed with error:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
