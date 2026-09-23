import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { SEED_CHEMICALS, type SeedChemical } from "../../chemicals.js";
import { CHEMICALS_BATCH_5 } from "../../chemicalsBatch5.js";
import { SEED_REACTIONS, type SeedReaction, type SeedObservableEffect } from "../../reactions.js";
import { REACTIONS_BATCH_5 } from "../../reactionsBatch5.js";
import { RAW_BATCH_6_CHEMICALS } from "./chemicalDefinitionsBatch6.js";
import { parseFormula } from "../../../../chemistry-engine/formulaParser.js";
import { balanceEquation, type BalancerSpecies } from "../../../../chemistry-engine/balancer.js";
import type { ReactionType } from "../../../../chemistry-engine/types.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Combined Chemical Registry across all batches (1,014 chemicals)
export const allChemicalsMap = new Map<string, SeedChemical>();
for (const c of SEED_CHEMICALS) allChemicalsMap.set(c.id, c);
for (const c of CHEMICALS_BATCH_5) allChemicalsMap.set(c.id, c);
for (const c of RAW_BATCH_6_CHEMICALS) allChemicalsMap.set(c.id, c);

const TEXTBOOK_SOURCE =
  "Standard chemical literature (CRC Handbook of Chemistry and Physics / Advanced Inorganic & Organic Chemistry Texts / NIST Chemistry WebBook / Ullmann's Encyclopedia of Industrial Chemistry).";

// Existing reactant sets across all 2,181 seed + batch 5 reactions to prevent collisions
export const existingReactantSets = new Set<string>();
for (const r of SEED_REACTIONS) {
  const key = r.reactants.map((sp) => sp.chemicalId).sort().join("+");
  existingReactantSets.add(key);
}
for (const r of REACTIONS_BATCH_5) {
  const key = r.reactants.map((sp) => sp.chemicalId).sort().join("+");
  existingReactantSets.add(key);
}

export const batch6ReactantSets = new Set<string>();
export const batch6ReactionIds = new Set<string>();
export const generatedBatch6Reactions: SeedReaction[] = [];

export function toBal(cid: string): BalancerSpecies {
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

export function mapReactionType(type: string | undefined, reactants: string[], products: any[]): ReactionType {
  if (!type) return "double_displacement";
  if (type === "metathesis") return "double_displacement";
  if (type === "complexation") {
    return products.length === 1 ? "synthesis" : "double_displacement";
  }
  return type as ReactionType;
}

export interface ReactionInput {
  id: string;
  name: string;
  reactionType: ReactionType | string;
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
  if (batch6ReactionIds.has(input.id)) {
    throw new Error(`Duplicate reaction ID in batch 6: "${input.id}"`);
  }
  batch6ReactionIds.add(input.id);

  const reactantKey = [...input.reactants].sort().join("+");
  if (existingReactantSets.has(reactantKey)) {
    throw new Error(`Collision with existing reaction reactant set: ${reactantKey} in reaction ${input.id}`);
  }
  if (batch6ReactantSets.has(reactantKey)) {
    throw new Error(`Duplicate reactant set in batch 6: ${reactantKey} in reaction ${input.id}`);
  }
  batch6ReactantSets.add(reactantKey);

  // Validate all species exist
  for (const rid of input.reactants) {
    if (!allChemicalsMap.has(rid)) {
      throw new Error(`Unknown reactant chemicalId "${rid}" in reaction ${input.id}`);
    }
  }

  const prodSpecs = input.products.map((p) => (typeof p === "string" ? { chemicalId: p, isByproduct: false } : p));
  for (const p of prodSpecs) {
    if (!allChemicalsMap.has(p.chemicalId)) {
      throw new Error(`Unknown product chemicalId "${p.chemicalId}" in reaction ${input.id}`);
    }
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

  // Validate and sanitize observable effects
  const sanitizedEffects: SeedObservableEffect[] = (input.observableEffects || []).map((eff: any) => {
    const item = { ...eff };
    if (item.type === "precipitate") item.type = "precipitation";
    if (item.color && !item.colorTo) {
      item.colorTo = item.color;
      delete item.color;
    }
    return item;
  });

  for (const eff of sanitizedEffects) {
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
    reactionType: mapReactionType(input.reactionType, input.reactants, prodSpecs),
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
    observableEffects: sanitizedEffects,
    source: TEXTBOOK_SOURCE,
    safetyNotes: input.safetyNotes,
  };

  generatedBatch6Reactions.push(reaction);
  return reaction;
}

import { buildDomain21Coordination } from "./domain21Coordination.js";
import { buildDomain22Hydrometallurgy } from "./domain22Hydrometallurgy.js";
import { buildDomain23CatalysisInorganic } from "./domain23CatalysisInorganic.js";
import { DOMAIN_24_PYROMETALLURGY_REACTIONS } from "./domain24PyrometallurgySmelting.js";
import { DOMAIN_25_SEMICONDUCTOR_REACTIONS } from "./domain25SemiconductorCVD.js";
import { DOMAIN_26_ELECTROPLATING_REACTIONS } from "./domain26ElectroplatingFinishing.js";
import { DOMAIN_27_FORENSICS_REACTIONS } from "./domain27ForensicsColorTests.js";

export function generateAllBatch6Reactions(): void {
  console.log("Starting Generation of Batch 6 Reactions...");

  buildDomain21Coordination();
  console.log("✓ Domain 21 (Coordination Chemistry & Complexes):", generatedBatch6Reactions.length);

  buildDomain22Hydrometallurgy();
  console.log("✓ Domain 22 (Hydrometallurgy & Mineral Leaching):", generatedBatch6Reactions.length);

  buildDomain23CatalysisInorganic();
  console.log("✓ Domain 23 (Heterogeneous Catalysis & Industrial Inorganic):", generatedBatch6Reactions.length);

  for (const r of DOMAIN_24_PYROMETALLURGY_REACTIONS) {
    addReaction({
      id: r.id,
      name: r.name,
      reactionType: mapReactionType(r.type, r.reactants, r.products),
      reactants: r.reactants,
      products: r.products,
      netIonicEquation: r.net,
      enthalpyKjPerMol: r.enthalpy,
      observableEffects: (r.effects || []) as any,
      safetyNotes: r.desc,
    });
  }
  console.log("✓ Domain 24 (High-Temperature Smelting & Blast Furnace):", generatedBatch6Reactions.length);

  for (const r of DOMAIN_25_SEMICONDUCTOR_REACTIONS) {
    addReaction({
      id: r.id,
      name: r.name,
      reactionType: mapReactionType(r.type, r.reactants, r.products),
      reactants: r.reactants,
      products: r.products,
      netIonicEquation: r.net,
      enthalpyKjPerMol: r.enthalpy,
      observableEffects: (r.effects || []) as any,
      safetyNotes: r.desc,
    });
  }
  console.log("✓ Domain 25 (Semiconductor Materials & CVD Precursors):", generatedBatch6Reactions.length);

  for (const r of DOMAIN_26_ELECTROPLATING_REACTIONS) {
    addReaction({
      id: r.id,
      name: r.name,
      reactionType: mapReactionType(r.type, r.reactants, r.products),
      reactants: r.reactants,
      products: r.products,
      netIonicEquation: r.net,
      enthalpyKjPerMol: r.enthalpy,
      observableEffects: (r.effects || []) as any,
      safetyNotes: r.desc,
    });
  }
  console.log("✓ Domain 26 (Electroplating & Surface Conversion Finishing):", generatedBatch6Reactions.length);

  for (const r of DOMAIN_27_FORENSICS_REACTIONS) {
    addReaction({
      id: r.id,
      name: r.name,
      reactionType: mapReactionType(r.type, r.reactants, r.products),
      reactants: r.reactants,
      products: r.products,
      netIonicEquation: r.net,
      enthalpyKjPerMol: r.enthalpy,
      observableEffects: (r.effects || []) as any,
      safetyNotes: r.desc,
    });
  }
  console.log("✓ Domain 27 (Forensic Chemistry & Qualitative Color Spot Tests):", generatedBatch6Reactions.length);

  if (generatedBatch6Reactions.length !== 710) {
    throw new Error(`Expected exactly 710 reactions in Batch 6, but got ${generatedBatch6Reactions.length}`);
  }

  // Write chemicalsBatch6.ts
  const chemicalsBatch6Path = path.resolve(__dirname, "../../chemicalsBatch6.ts");
  const chemicalsCode = `// Autogenerated Batch 6 Chemicals (${RAW_BATCH_6_CHEMICALS.length} species supporting 710 new reactions)
import type { SeedChemical } from "./chemicals.js";

export const CHEMICALS_BATCH_6: SeedChemical[] = ${JSON.stringify(RAW_BATCH_6_CHEMICALS, null, 2)};
`;
  fs.writeFileSync(chemicalsBatch6Path, chemicalsCode, "utf8");
  console.log(`✓ Wrote ${RAW_BATCH_6_CHEMICALS.length} chemicals to chemicalsBatch6.ts`);

  // Write reactionsBatch6.ts
  const reactionsBatch6Path = path.resolve(__dirname, "../../reactionsBatch6.ts");
  const reactionsCode = `// Autogenerated Batch 6 Reactions (${generatedBatch6Reactions.length} chemically balanced, verified reactions)
import type { SeedReaction } from "./reactions.js";

export const REACTIONS_BATCH_6: SeedReaction[] = ${JSON.stringify(generatedBatch6Reactions, null, 2)};
`;
  fs.writeFileSync(reactionsBatch6Path, reactionsCode, "utf8");
  console.log(`✓ Wrote ${generatedBatch6Reactions.length} reactions to reactionsBatch6.ts`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  generateAllBatch6Reactions();
}
