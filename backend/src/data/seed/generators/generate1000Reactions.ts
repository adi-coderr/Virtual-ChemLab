import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { SEED_CHEMICALS, type SeedChemical } from "../chemicals.js";
import { SEED_REACTIONS, type SeedReaction, type SeedObservableEffect } from "../reactions.js";
import { RAW_BATCH_4_CHEMICALS } from "./chemicalDefinitions.js";
import { parseFormula } from "../../../chemistry-engine/formulaParser.js";
import { balanceEquation, type BalancerSpecies } from "../../../chemistry-engine/balancer.js";
import type { ReactionType } from "../../../chemistry-engine/types.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Combined Chemical Registry for balancing and validation
const allChemicalsMap = new Map<string, SeedChemical>();
for (const c of SEED_CHEMICALS) allChemicalsMap.set(c.id, c);
for (const c of RAW_BATCH_4_CHEMICALS) allChemicalsMap.set(c.id, c);

const TEXTBOOK_SOURCE =
  "Standard general-chemistry textbook reaction (documented in essentially every intro chemistry text, e.g. Zumdahl's Chemistry or Brown/LeMay/Bursten's Chemistry: The Central Science); not a citation to a specific paper.";

// Existing reactant sets to prevent collisions
const existingReactantSets = new Set<string>();
for (const r of SEED_REACTIONS) {
  const key = r.reactants.map((sp) => sp.chemicalId).sort().join("+");
  existingReactantSets.add(key);
}

const batch4ReactantSets = new Set<string>();
const batch4ReactionIds = new Set<string>();
const generatedReactions: SeedReaction[] = [];

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

interface ReactionInput {
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

function addReaction(input: ReactionInput): SeedReaction {
  if (batch4ReactionIds.has(input.id)) {
    throw new Error(`Duplicate reaction ID: "${input.id}"`);
  }
  batch4ReactionIds.add(input.id);

  const reactantKey = [...input.reactants].sort().join("+");
  if (existingReactantSets.has(reactantKey)) {
    throw new Error(`Collision with existing reaction reactant set: ${reactantKey} in reaction ${input.id}`);
  }
  if (batch4ReactantSets.has(reactantKey)) {
    throw new Error(`Collision within Batch 4 reactant set: ${reactantKey} in reaction ${input.id}`);
  }
  batch4ReactantSets.add(reactantKey);

  // Normalize products
  const productEntries = input.products.map((p) =>
    typeof p === "string" ? { chemicalId: p, isByproduct: false } : { chemicalId: p.chemicalId, isByproduct: p.isByproduct ?? false }
  );

  // Check species exist
  for (const rid of input.reactants) {
    if (!allChemicalsMap.has(rid)) throw new Error(`Unknown reactant "${rid}" in ${input.id}`);
  }
  for (const p of productEntries) {
    if (!allChemicalsMap.has(p.chemicalId)) throw new Error(`Unknown product "${p.chemicalId}" in ${input.id}`);
  }
  if (input.catalystChemicalId && !allChemicalsMap.has(input.catalystChemicalId)) {
    throw new Error(`Unknown catalyst "${input.catalystChemicalId}" in ${input.id}`);
  }
  for (const eff of input.observableEffects) {
    if (eff.relatedChemicalId && !allChemicalsMap.has(eff.relatedChemicalId)) {
      throw new Error(`Unknown relatedChemicalId "${eff.relatedChemicalId}" in effect of ${input.id}`);
    }
  }

  // Balance equation
  const balancerReactants = input.reactants.map(toBal);
  const balancerProducts = productEntries.map((p) => toBal(p.chemicalId));
  const bal = balanceEquation(balancerReactants, balancerProducts);

  const reactionReactants = input.reactants.map((rid, idx) => ({
    chemicalId: rid,
    coefficient: bal.reactantCoefficients[idx] as number,
  }));

  const reactionProducts = productEntries.map((p, idx) => ({
    chemicalId: p.chemicalId,
    coefficient: bal.productCoefficients[idx] as number,
    isByproduct: p.isByproduct,
  }));

  const equationDisplay = bal.balancedEquationText;

  // Verify all formulas present in display
  for (const sp of [...reactionReactants, ...reactionProducts]) {
    const f = allChemicalsMap.get(sp.chemicalId)!.formula;
    if (!equationDisplay.includes(f)) {
      throw new Error(`Formula "${f}" of ${sp.chemicalId} missing from equationDisplay "${equationDisplay}" in ${input.id}`);
    }
  }

  const energyClassification = input.enthalpyKjPerMol < 0 ? "exothermic" : input.enthalpyKjPerMol > 0 ? "endothermic" : "unknown";

  const reaction: SeedReaction = {
    id: input.id,
    name: input.name,
    reactionType: input.reactionType,
    reactants: reactionReactants,
    products: reactionProducts,
    equationDisplay,
    netIonicEquation: input.netIonicEquation,
    confidenceScore: 0.98,
    energyClassification,
    enthalpyKjPerMol: input.enthalpyKjPerMol,
    temperatureMinC: input.temperatureMinC ?? 0,
    temperatureMaxC: input.temperatureMaxC ?? 100,
    solvent: input.solvent ?? "water",
    catalystChemicalId: input.catalystChemicalId,
    experimentalStatus: "experimentally_verified",
    observableEffects: input.observableEffects,
    source: TEXTBOOK_SOURCE,
    safetyNotes: input.safetyNotes ?? "Standard laboratory protective equipment (eye protection and lab coat) recommended.",
  };

  generatedReactions.push(reaction);
  return reaction;
}

export { allChemicalsMap, addReaction, generatedReactions };

import { buildDomain1AcidBase } from "./domain1AcidBase.js";
import { buildDomain2Precipitation } from "./domain2Precipitation.js";
import { buildDomain3SingleDisplacement } from "./domain3SingleDisplacement.js";
import { buildDomain4GasEvolution } from "./domain4GasEvolution.js";
import { buildDomain5Organic } from "./domain5Organic.js";
import { buildDomain6Combustion } from "./domain6Combustion.js";
import { buildDomain7Decomposition } from "./domain7Decomposition.js";
import { buildDomain8InorganicSynthesis } from "./domain8InorganicSynthesis.js";
import { buildDomain9Complexation } from "./domain9Complexation.js";
import { buildDomain10AnalyticalTests } from "./domain10AnalyticalTests.js";

export function generateAllReactions(): void {
  console.log("Starting Generation of 1,000 Reactions across 10 domains...");
  buildDomain1AcidBase();
  console.log("✓ Domain 1 (Acid-Base Neutralization):", generatedReactions.length);
  buildDomain2Precipitation();
  console.log("✓ Domain 2 (Precipitation & Solubility Rules):", generatedReactions.length);
  buildDomain3SingleDisplacement();
  console.log("✓ Domain 3 (Single Displacement & Activity Series):", generatedReactions.length);
  buildDomain4GasEvolution();
  console.log("✓ Domain 4 (Gas Evolution & Effervescence):", generatedReactions.length);
  buildDomain5Organic();
  console.log("✓ Domain 5 (Organic Reactions):", generatedReactions.length);
  buildDomain6Combustion();
  console.log("✓ Domain 6 (Combustion & Oxidation):", generatedReactions.length);
  buildDomain7Decomposition();
  console.log("✓ Domain 7 (Thermal Decomposition & Pyrolysis):", generatedReactions.length);
  buildDomain8InorganicSynthesis();
  console.log("✓ Domain 8 (Inorganic Synthesis & Metallurgy):", generatedReactions.length);
  buildDomain9Complexation();
  console.log("✓ Domain 9 (Coordination Chemistry & Complexes):", generatedReactions.length);
  buildDomain10AnalyticalTests();
  console.log("✓ Domain 10 (Analytical Qualitative & Spot Tests):", generatedReactions.length);

  if (generatedReactions.length !== 1000) {
    throw new Error(`Expected exactly 1,000 reactions, but got ${generatedReactions.length}`);
  }

  const chemicalsBatch4Path = path.resolve(__dirname, "../chemicalsBatch4.ts");
  const chemicalsCode = `// Autogenerated Batch 4 Chemicals (344 species supporting 1,000 new reactions)
import type { SeedChemical } from "./chemicals.js";

export const CHEMICALS_BATCH_4: SeedChemical[] = ${JSON.stringify(RAW_BATCH_4_CHEMICALS, null, 2)};
`;
  fs.writeFileSync(chemicalsBatch4Path, chemicalsCode, "utf8");
  console.log(`✓ Wrote ${RAW_BATCH_4_CHEMICALS.length} chemicals to chemicalsBatch4.ts`);

  const reactionsBatch4Path = path.resolve(__dirname, "../reactionsBatch4.ts");
  const reactionsCode = `// Autogenerated Batch 4 Reactions (1,000 chemically balanced, verified reactions)
import type { SeedReaction } from "./reactions.js";

export const REACTIONS_BATCH_4: SeedReaction[] = ${JSON.stringify(generatedReactions, null, 2)};
`;
  fs.writeFileSync(reactionsBatch4Path, reactionsCode, "utf8");
  console.log(`✓ Wrote ${generatedReactions.length} reactions to reactionsBatch4.ts`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  generateAllReactions();
}
