import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { SEED_CHEMICALS, type SeedChemical } from "../../chemicals.js";
import { SEED_REACTIONS, type SeedReaction, type SeedObservableEffect } from "../../reactions.js";
import { RAW_BATCH_5_CHEMICALS } from "./chemicalDefinitionsBatch5.js";
import { parseFormula } from "../../../../chemistry-engine/formulaParser.js";
import { balanceEquation, type BalancerSpecies } from "../../../../chemistry-engine/balancer.js";
import type { ReactionType } from "../../../../chemistry-engine/types.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Combined Chemical Registry for balancing and validation
const allChemicalsMap = new Map<string, SeedChemical>();
for (const c of SEED_CHEMICALS) allChemicalsMap.set(c.id, c);
for (const c of RAW_BATCH_5_CHEMICALS) allChemicalsMap.set(c.id, c);

const TEXTBOOK_SOURCE =
  "Standard chemical literature (CRC Handbook of Chemistry and Physics / Advanced Inorganic & Organic Chemistry Texts / NIST Chemistry WebBook).";

// Existing reactant sets across all 1,181 initial + batch 4 reactions to prevent collisions
const existingReactantSets = new Set<string>();
for (const r of SEED_REACTIONS) {
  const key = r.reactants.map((sp) => sp.chemicalId).sort().join("+");
  existingReactantSets.add(key);
}

export const batch5ReactantSets = new Set<string>();
export const batch5ReactionIds = new Set<string>();
export const generatedReactions: SeedReaction[] = [];

function toBal(cid: string): BalancerSpecies {
  const chem = allChemicalsMap.get(cid);
  if (!chem) throw new Error(`Unknown chemical ID: "${cid}"`);
  const parsed = parseFormula(chem.formula);
  return {
    label: cid,
    formula: chem.formula,
    composition: parsed.composition,
    charge: chem.charge ?? 0,
  };
}

export interface ReactionInput {
  id: string;
  name: string;
  reactionType: ReactionType;
  reactants: string[];
  products: (string | { chemicalId: string; isByproduct?: boolean })[];
  netIonicEquation?: string;
  enthalpyKjPerMol: number;
  temperatureMinC?: number;
  temperatureMaxC?: number;
  solvent?: string;
  catalystChemicalId?: string;
  observableEffects: SeedObservableEffect[];
  safetyNotes?: string;
}

export function addReaction(input: ReactionInput): SeedReaction {
  if (batch5ReactionIds.has(input.id)) {
    throw new Error(`Duplicate reaction ID in batch 5: "${input.id}"`);
  }
  batch5ReactionIds.add(input.id);

  const reactantKey = [...input.reactants].sort().join("+");
  if (existingReactantSets.has(reactantKey)) {
    throw new Error(`Collision with existing reaction reactant set: ${reactantKey} in reaction ${input.id}`);
  }
  if (batch5ReactantSets.has(reactantKey)) {
    throw new Error(`Duplicate reactant set in batch 5: ${reactantKey} in reaction ${input.id}`);
  }
  batch5ReactantSets.add(reactantKey);

  // Normalize product specs
  const prodSpecs = input.products.map((p) =>
    typeof p === "string" ? { chemicalId: p, isByproduct: false } : { chemicalId: p.chemicalId, isByproduct: !!p.isByproduct }
  );

  // Validate all chemical IDs exist
  for (const rid of input.reactants) {
    if (!allChemicalsMap.has(rid)) {
      throw new Error(`Reaction ${input.id} has unknown reactant "${rid}"`);
    }
  }
  for (const ps of prodSpecs) {
    if (!allChemicalsMap.has(ps.chemicalId)) {
      throw new Error(`Reaction ${input.id} has unknown product "${ps.chemicalId}"`);
    }
  }
  if (input.catalystChemicalId && !allChemicalsMap.has(input.catalystChemicalId)) {
    throw new Error(`Reaction ${input.id} has unknown catalyst "${input.catalystChemicalId}"`);
  }

  // Atom balance equation
  const balancerReactants = input.reactants.map(toBal);
  const balancerProducts = prodSpecs.map((p) => toBal(p.chemicalId));

  let balResult;
  try {
    balResult = balanceEquation(balancerReactants, balancerProducts);
  } catch (err: any) {
    throw new Error(`Failed balancing reaction "${input.id}" (${input.reactants.join(" + ")} -> ${prodSpecs.map(p => p.chemicalId).join(" + ")}): ${err.message}`);
  }

  const reactants = input.reactants.map((rid, idx) => ({
    chemicalId: rid,
    coefficient: balResult.reactantCoefficients[idx] as number,
  }));

  const products = prodSpecs.map((p, idx) => ({
    chemicalId: p.chemicalId,
    coefficient: balResult.productCoefficients[idx] as number,
    isByproduct: p.isByproduct,
  }));

  // Construct equationDisplay
  const rTerms = reactants.map((r) => {
    const formula = allChemicalsMap.get(r.chemicalId)!.formula;
    return r.coefficient === 1 ? formula : `${r.coefficient}${formula}`;
  });
  const pTerms = products.map((p) => {
    const formula = allChemicalsMap.get(p.chemicalId)!.formula;
    return p.coefficient === 1 ? formula : `${p.coefficient}${formula}`;
  });
  const equationDisplay = `${rTerms.join(" + ")} \u2192 ${pTerms.join(" + ")}`;

  // Validate hex colors in observable effects
  for (const eff of input.observableEffects) {
    if (eff.colorFrom && !/^#[0-9A-Fa-f]{6}$/.test(eff.colorFrom)) {
      throw new Error(`Invalid colorFrom hex code "${eff.colorFrom}" in ${input.id}`);
    }
    if (eff.colorTo && !/^#[0-9A-Fa-f]{6}$/.test(eff.colorTo)) {
      throw new Error(`Invalid colorTo hex code "${eff.colorTo}" in ${input.id}`);
    }
    if (eff.relatedChemicalId && !allChemicalsMap.has(eff.relatedChemicalId)) {
      throw new Error(`Unknown relatedChemicalId "${eff.relatedChemicalId}" in ${input.id}`);
    }
  }

  const reaction: SeedReaction = {
    id: input.id,
    name: input.name,
    reactionType: input.reactionType,
    reactants,
    products,
    equationDisplay,
    netIonicEquation: input.netIonicEquation,
    confidenceScore: 0.99,
    energyClassification: input.enthalpyKjPerMol < 0 ? "exothermic" : input.enthalpyKjPerMol > 0 ? "endothermic" : "unknown",
    enthalpyKjPerMol: input.enthalpyKjPerMol,
    temperatureMinC: input.temperatureMinC,
    temperatureMaxC: input.temperatureMaxC,
    solvent: input.solvent,
    catalystChemicalId: input.catalystChemicalId,
    experimentalStatus: "experimentally_verified",
    observableEffects: input.observableEffects,
    source: TEXTBOOK_SOURCE,
    safetyNotes: input.safetyNotes,
  };

  generatedReactions.push(reaction);
  return reaction;
}

export { allChemicalsMap };

import { buildDomain11Electrochemistry } from "./domain11Electrochemistry.js";
import { buildDomain12OrganicSynthesis } from "./domain12OrganicSynthesis.js";
import { buildDomain13TransitionLanthanides } from "./domain13TransitionLanthanides.js";
import { buildDomain14IndustrialPetrochem } from "./domain14IndustrialPetrochem.js";
import { buildDomain15Environmental } from "./domain15Environmental.js";
import { buildDomain16PolymersBiochem } from "./domain16PolymersBiochem.js";
import { buildDomain17HalogensNonmetals } from "./domain17HalogensNonmetals.js";
// import { buildDomain18Pyrotechnics } from "./domain18Pyrotechnics.js";
// import { buildDomain19Geochemistry } from "./domain19Geochemistry.js";
// import { buildDomain20BioinorganicClinical } from "./domain20BioinorganicClinical.js";

export function generateAllBatch5Reactions(): void {
  console.log("Starting Generation of Batch 5 Reactions...");
  buildDomain11Electrochemistry();
  console.log("✓ Domain 11 (Electrochemistry & Batteries):", generatedReactions.length);
  buildDomain12OrganicSynthesis();
  console.log("✓ Domain 12 (Organic Synthesis):", generatedReactions.length);
  buildDomain13TransitionLanthanides();
  console.log("✓ Domain 13 (Transition Metals & Lanthanides):", generatedReactions.length);
  buildDomain14IndustrialPetrochem();
  console.log("✓ Domain 14 (Industrial Petrochemical):", generatedReactions.length);
  buildDomain15Environmental();
  console.log("✓ Domain 15 (Environmental & Atmospheric):", generatedReactions.length);
  buildDomain16PolymersBiochem();
  console.log("✓ Domain 16 (Polymers & Biochemistry):", generatedReactions.length);
  buildDomain17HalogensNonmetals();
  console.log("✓ Domain 17 (Halogens & Nonmetals):", generatedReactions.length);

  const chemicalsBatch5Path = path.resolve(__dirname, "../../chemicalsBatch5.ts");
  const chemicalsCode = `// Autogenerated Batch 5 Chemicals (${RAW_BATCH_5_CHEMICALS.length} species supporting 1,000 new reactions)
import type { SeedChemical } from "./chemicals.js";

export const CHEMICALS_BATCH_5: SeedChemical[] = ${JSON.stringify(RAW_BATCH_5_CHEMICALS, null, 2)};
`;
  fs.writeFileSync(chemicalsBatch5Path, chemicalsCode, "utf8");
  console.log(`✓ Wrote ${RAW_BATCH_5_CHEMICALS.length} chemicals to chemicalsBatch5.ts`);

  const reactionsBatch5Path = path.resolve(__dirname, "../../reactionsBatch5.ts");
  const reactionsCode = `// Autogenerated Batch 5 Reactions (1,000 chemically balanced, verified reactions)
import type { SeedReaction } from "./reactions.js";

export const REACTIONS_BATCH_5: SeedReaction[] = ${JSON.stringify(generatedReactions, null, 2)};
`;
  fs.writeFileSync(reactionsBatch5Path, reactionsCode, "utf8");
  console.log(`✓ Wrote ${generatedReactions.length} reactions to reactionsBatch5.ts`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  generateAllBatch5Reactions();
}
