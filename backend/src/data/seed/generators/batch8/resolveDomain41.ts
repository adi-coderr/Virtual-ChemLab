import * as fs from "fs";
import * as path from "path";
import { parseFormula } from "../../../../chemistry-engine/formulaParser.js";
import { balanceEquation, type BalancerSpecies } from "../../../../chemistry-engine/balancer.js";
import { SEED_CHEMICALS } from "../../chemicals.js";
import { CHEMICALS_BATCH_5 } from "../../chemicalsBatch5.js";
import { CHEMICALS_BATCH_6 } from "../../chemicalsBatch6.js";
import { CHEMICALS_BATCH_7 } from "../../chemicalsBatch7.js";
import { RAW_BATCH_8_CHEMICALS } from "./chemicalDefinitionsBatch8.js";
import { getExistingKeys } from "./inspectCollisions.js";
import { DOMAIN_38_REACTIONS } from "./domain38TotalSynthesisNamedRxns.js";
import { DOMAIN_39_REACTIONS } from "./domain39AgrochemPesticidesFertilizers.js";
import { DOMAIN_40_REACTIONS } from "./domain40AstrochemPlanetaryGeochem.js";

const allChems = new Map<string, any>();
for (const c of SEED_CHEMICALS) if (c && c.id) allChems.set(c.id, c);
for (const c of CHEMICALS_BATCH_5) if (c && c.id) allChems.set(c.id, c);
for (const c of CHEMICALS_BATCH_6) if (c && c.id) allChems.set(c.id, c);
for (const c of CHEMICALS_BATCH_7) if (c && c.id) allChems.set(c.id, c);
for (const c of RAW_BATCH_8_CHEMICALS) if (c && c.id) allChems.set(c.id, c);

const existingKeys = getExistingKeys();
for (const r of DOMAIN_38_REACTIONS) existingKeys.add([...r.reactants].sort().join("+"));
for (const r of DOMAIN_39_REACTIONS) existingKeys.add([...r.reactants].sort().join("+"));
for (const r of DOMAIN_40_REACTIONS) existingKeys.add([...r.reactants].sort().join("+"));

console.log("Existing keys loaded:", existingKeys.size);

// Additional chems needed
const extraChems = [
  {
    id: "c7h5cl2feo3",
    name: "Ferric salicylate dichloride",
    commonName: "Trinder violet iron(III) salicylate",
    formula: "C7H5Cl2FeO3",
    molecularWeight: 263.86,
    state: "solid",
    color: "#5B2C6F",
    description: "Deep violet-purple complex measured at 540 nm in Trinder's clinical salicylate poisoning assay.",
    category: "complex",
    dangerLevel: 1,
    ghsHazards: ["H302"],
    safetyAdvice: ["P264"],
    enthalpyOfFormation: -620,
    entropy: 290,
    heatCapacity: 240,
    solubilityWater: 50,
    density: 1.82,
    boilingPoint: 550,
    meltingPoint: 230,
    oxidationStates: { Fe: 3, Cl: -1, C: 0, H: 1, O: -2 },
    notes: "Emergency clinical toxicology confirmation of toxic aspirin ingestion."
  },
  {
    id: "c4h5cl2feo3",
    name: "Ferric acetoacetate dichloride",
    commonName: "Gerhardt Bordeaux red ferric complex",
    formula: "C4H5Cl2FeO3",
    molecularWeight: 227.83,
    state: "solid",
    color: "#78281F",
    description: "Heat-labile Bordeaux red enolic complex in Gerhardt's test for diabetic ketoacidosis.",
    category: "complex",
    dangerLevel: 0,
    ghsHazards: [],
    safetyAdvice: ["P102"],
    enthalpyOfFormation: -710,
    entropy: 250,
    heatCapacity: 200,
    solubilityWater: 60,
    density: 1.76,
    boilingPoint: 450,
    meltingPoint: 190,
    oxidationStates: { Fe: 3, Cl: -1, C: 0, H: 1, O: -2 },
    notes: "Distinguishes acetoacetate from salicylates by thermal decomposition upon boiling."
  },
  {
    id: "c6h6cln3o2s",
    name: "4-Sulfamoylbenzenediazonium chloride",
    commonName: "Diazotized sulfanilamide cation chloride",
    formula: "C6H6ClN3O2S",
    molecularWeight: 219.65,
    state: "solid",
    color: "#FEF9E7",
    description: "Reactive diazonium salt formed in Griess test for urinary tract infection screening.",
    category: "organic",
    dangerLevel: 2,
    ghsHazards: ["H242", "H315"],
    safetyAdvice: ["P210", "P280"],
    enthalpyOfFormation: -210,
    entropy: 240,
    heatCapacity: 180,
    solubilityWater: 40,
    density: 1.65,
    boilingPoint: 280,
    meltingPoint: 95,
    oxidationStates: { Cl: -1, C: 0, H: 1, N: 0, O: -2, S: 4 },
    notes: "Couples with aromatic amines to generate pink azo chromophore."
  },
  {
    id: "c9h10n2o5",
    name: "3-Nitro-L-tyrosine",
    commonName: "3-Nitrotyrosine (Heller test & oxidative stress biomarker)",
    formula: "C9H10N2O5",
    molecularWeight: 226.19,
    state: "solid",
    color: "#F4D03F",
    description: "Yellow nitrated aromatic amino acid formed in Heller xanthoproteic test and as a biomarker of peroxynitrite tissue injury.",
    category: "organic",
    dangerLevel: 0,
    ghsHazards: [],
    safetyAdvice: ["P102"],
    enthalpyOfFormation: -840,
    entropy: 290,
    heatCapacity: 240,
    solubilityWater: 2.5,
    density: 1.56,
    boilingPoint: 480,
    meltingPoint: 235,
    oxidationStates: { C: 0, H: 1, N: 1, O: -2 },
    notes: "Turns deep orange in alkaline conditions due to quinoid phenolate formation."
  },
  {
    id: "c4h5nao3",
    name: "Sodium acetoacetate",
    commonName: "Sodium acetoacetate (DKA neutral salt)",
    formula: "C4H5NaO3",
    molecularWeight: 124.07,
    state: "solid",
    color: "#FFFFFF",
    description: "Neutralized sodium salt formed during intravenous bicarbonate resuscitation in diabetic ketoacidosis.",
    category: "salt",
    dangerLevel: 0,
    ghsHazards: [],
    safetyAdvice: ["P102"],
    enthalpyOfFormation: -820,
    entropy: 260,
    heatCapacity: 205,
    solubilityWater: 800,
    density: 1.45,
    boilingPoint: 350,
    meltingPoint: 155,
    oxidationStates: { Na: 1, C: 0, H: 1, O: -2 },
    notes: "Buffers systemic acidosis while awaiting insulin inhibition of lipolysis."
  },
  {
    id: "mg2si3o8",
    name: "Magnesium trisilicate",
    commonName: "Magnesium trisilicate (Gaviscon antacid)",
    formula: "Mg2O8Si3",
    molecularWeight: 260.86,
    state: "solid",
    color: "#FFFFFF",
    description: "Insoluble antacid reacting slowly with gastric acid to form gelatinous protective hydrated silica gel.",
    category: "inorganic",
    dangerLevel: 0,
    ghsHazards: [],
    safetyAdvice: ["P102"],
    enthalpyOfFormation: -3750,
    entropy: 210,
    heatCapacity: 195,
    solubilityWater: 0.01,
    density: 3.1,
    boilingPoint: 2200,
    meltingPoint: 1550,
    oxidationStates: { Mg: 2, Si: 4, O: -2 },
    notes: "Forms a floating raft in the stomach preventing gastroesophageal acid reflux."
  }
];

// Append extra chems to chemicalDefinitionsBatch8.ts
const batch8File = path.resolve("src/data/seed/generators/batch8/chemicalDefinitionsBatch8.ts");
let batch8Content = fs.readFileSync(batch8File, "utf8");
const addedExtra: any[] = [];
for (const c of extraChems) {
  if (!batch8Content.includes(`"id": "${c.id}"`)) {
    addedExtra.push(c);
    allChems.set(c.id, c);
  }
}

if (addedExtra.length > 0) {
  const lastIdx = batch8Content.lastIndexOf("];");
  const entries = addedExtra.map(c => "  " + JSON.stringify(c, null, 2).replace(/\n/g, "\n  ")).join(",\n");
  batch8Content = batch8Content.slice(0, lastIdx).trimEnd() + ",\n" + entries + "\n];\n";
  fs.writeFileSync(batch8File, batch8Content, "utf8");
  console.log(`✓ Added ${addedExtra.length} extra chems to chemicalDefinitionsBatch8.ts`);
}

console.log("Ready to test and resolve Domain 41!");
