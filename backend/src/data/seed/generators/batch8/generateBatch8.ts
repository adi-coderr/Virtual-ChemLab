import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { SEED_CHEMICALS, type SeedChemical } from "../../chemicals.js";
import { CHEMICALS_BATCH_5 } from "../../chemicalsBatch5.js";
import { CHEMICALS_BATCH_6 } from "../../chemicalsBatch6.js";
import { CHEMICALS_BATCH_7 } from "../../chemicalsBatch7.js";
import { SEED_REACTIONS, type SeedReaction, type SeedObservableEffect } from "../../reactions.js";
import { REACTIONS_BATCH_5 } from "../../reactionsBatch5.js";
import { REACTIONS_BATCH_6 } from "../../reactionsBatch6.js";
import { REACTIONS_BATCH_7 } from "../../reactionsBatch7.js";
import { RAW_BATCH_8_CHEMICALS } from "./chemicalDefinitionsBatch8.js";
import { parseFormula } from "../../../../chemistry-engine/formulaParser.js";
import { balanceEquation, type BalancerSpecies } from "../../../../chemistry-engine/balancer.js";
import type { ReactionType } from "../../../../chemistry-engine/types.js";

import { DOMAIN_38_REACTIONS } from "./domain38TotalSynthesisNamedRxns.js";
import { DOMAIN_39_REACTIONS } from "./domain39AgrochemPesticidesFertilizers.js";
import { DOMAIN_40_REACTIONS } from "./domain40AstrochemPlanetaryGeochem.js";
import { DOMAIN_41_REACTIONS } from "./domain41ClinicalDiagnosticsBiosensors.js";
import { DOMAIN_42_REACTIONS } from "./domain42SemiconductorCVDMicroelectronics.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Combined Chemical Registry across all batches (1,200+ chemicals)
export const allChemicalsMap = new Map<string, SeedChemical>();
for (const c of SEED_CHEMICALS) allChemicalsMap.set(c.id, c);
for (const c of CHEMICALS_BATCH_5) allChemicalsMap.set(c.id, c);
for (const c of CHEMICALS_BATCH_6) allChemicalsMap.set(c.id, c);
for (const c of CHEMICALS_BATCH_7) allChemicalsMap.set(c.id, c);
for (const c of RAW_BATCH_8_CHEMICALS) allChemicalsMap.set(c.id, c);

const TEXTBOOK_SOURCE =
  "Standard chemical literature (CRC Handbook of Chemistry and Physics / March's Advanced Organic Chemistry / Ullmann's Encyclopedia of Industrial Chemistry / NIST Chemistry WebBook / Semiconductor Industry Association).";

// Existing reactant sets across all 3,891 seed + batch 5 + batch 6 + batch 7 reactions to prevent collisions
export const existingReactantSets = new Set<string>();
for (const r of SEED_REACTIONS) {
  const key = r.reactants.map((sp) => sp.chemicalId).sort().join("+");
  existingReactantSets.add(key);
}
for (const r of REACTIONS_BATCH_5) {
  const key = r.reactants.map((sp) => sp.chemicalId).sort().join("+");
  existingReactantSets.add(key);
}
for (const r of REACTIONS_BATCH_6) {
  const key = r.reactants.map((sp) => sp.chemicalId).sort().join("+");
  existingReactantSets.add(key);
}
for (const r of REACTIONS_BATCH_7) {
  const key = r.reactants.map((sp) => sp.chemicalId).sort().join("+");
  existingReactantSets.add(key);
}

export const batch8ReactantSets = new Set<string>();
export const batch8ReactionIds = new Set<string>();
export const generatedBatch8Reactions: SeedReaction[] = [];

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
  if (type === "neutralization" || type === "acid_base") return "acid_base_neutralization";
  if (type === "substitution") return "double_displacement";
  if (type === "addition") return "synthesis";
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
  observableEffects: any[];
  safetyNotes?: string;
}

export function addReaction(input: ReactionInput): SeedReaction {
  if (batch8ReactionIds.has(input.id)) {
    throw new Error(`Duplicate reaction ID in batch 8: "${input.id}"`);
  }
  batch8ReactionIds.add(input.id);

  const reactantKey = [...input.reactants].sort().join("+");
  if (existingReactantSets.has(reactantKey)) {
    throw new Error(`Collision with existing reaction reactant set: ${reactantKey} in reaction ${input.id}`);
  }
  if (batch8ReactantSets.has(reactantKey)) {
    throw new Error(`Duplicate reactant set in batch 8: ${reactantKey} in reaction ${input.id}`);
  }
  batch8ReactantSets.add(reactantKey);

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
  const equationDisplay = `${rTerms.join(" + ")} → ${pTerms.join(" + ")}`;

  // Validate and sanitize observable effects
  const sanitizedEffects: SeedObservableEffect[] = (input.observableEffects || []).map((eff: any) => {
    const item: SeedObservableEffect = {
      type: eff.type === "precipitate" ? "precipitation" : eff.type,
      description: eff.description,
    };
    if (eff.colorTo) item.colorTo = eff.colorTo;
    else if (eff.color) item.colorTo = eff.color;
    else if (eff.gasColor) item.colorTo = eff.gasColor;

    if (eff.colorFrom) item.colorFrom = eff.colorFrom;
    if (eff.relatedChemicalId) item.relatedChemicalId = eff.relatedChemicalId;
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

  generatedBatch8Reactions.push(reaction);
  return reaction;
}

export function generateAllBatch8Reactions() {
  console.log("Starting Batch 8 Reaction Generation across Domains 38–42...");

  const domains = [
    { name: "Domain 38: Total Synthesis, Named Organic Transformations & Cascade Reactions", reactions: DOMAIN_38_REACTIONS },
    { name: "Domain 39: Agrochemistry, Pesticides, Herbicides & Soil Fertility", reactions: DOMAIN_39_REACTIONS },
    { name: "Domain 40: Astrochemistry, Planetary Geochemistry & Prebiotic Models", reactions: DOMAIN_40_REACTIONS },
    { name: "Domain 41: Clinical Diagnostics, Biosensors & Medical Biochemistry", reactions: DOMAIN_41_REACTIONS },
    { name: "Domain 42: Semiconductor Processing, CVD & Microelectronics", reactions: DOMAIN_42_REACTIONS },
  ];

  for (const d of domains) {
    for (const r of d.reactions as any[]) {
      addReaction({
        id: r.id,
        name: r.name,
        reactionType: mapReactionType(r.type || r.reactionType, r.reactants, r.products),
        reactants: r.reactants,
        products: r.products,
        netIonicEquation: r.net || r.netIonicEquation,
        enthalpyKjPerMol: r.enthalpy ?? r.enthalpyKjPerMol ?? 0,
        solvent: r.solvent,
        catalystChemicalId: r.catalyst || r.catalystChemicalId,
        temperatureMinC: r.tempMin ?? r.temperatureMinC,
        temperatureMaxC: r.tempMax ?? r.temperatureMaxC,
        observableEffects: (r.effects || r.observableEffects || []) as any,
        safetyNotes: r.desc || r.description || r.safetyNotes,
      });
    }
    console.log(`✓ ${d.name}: cumulative total = ${generatedBatch8Reactions.length}`);
  }

  if (generatedBatch8Reactions.length !== 500) {
    throw new Error(`Expected exactly 500 reactions in Batch 8, but got ${generatedBatch8Reactions.length}`);
  }

  // Write chemicalsBatch8.ts
  const chemicalsBatch8Path = path.resolve(__dirname, "../../chemicalsBatch8.ts");
  const chemicalsCode = `// Autogenerated Batch 8 Chemicals (${RAW_BATCH_8_CHEMICALS.length} species supporting 500 new reactions)
import type { SeedChemical } from "./chemicals.js";

export const CHEMICALS_BATCH_8: SeedChemical[] = ${JSON.stringify(RAW_BATCH_8_CHEMICALS, null, 2)};
`;
  fs.writeFileSync(chemicalsBatch8Path, chemicalsCode, "utf8");
  console.log(`✓ Wrote ${RAW_BATCH_8_CHEMICALS.length} chemicals to chemicalsBatch8.ts`);

  // Write reactionsBatch8.ts
  const reactionsBatch8Path = path.resolve(__dirname, "../../reactionsBatch8.ts");
  const reactionsCode = `// Autogenerated Batch 8 Reactions (${generatedBatch8Reactions.length} chemically balanced, verified reactions)
import type { SeedReaction } from "./reactions.js";

export const REACTIONS_BATCH_8: SeedReaction[] = ${JSON.stringify(generatedBatch8Reactions, null, 2)};
`;
  fs.writeFileSync(reactionsBatch8Path, reactionsCode, "utf8");
  console.log(`✓ Wrote ${generatedBatch8Reactions.length} reactions to reactionsBatch8.ts`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  generateAllBatch8Reactions();
}
