import * as fs from "fs";
import * as path from "path";

const chems = [
  {
    id: "c4h8cun2o4",
    name: "Copper(II) bis(glycinate)",
    commonName: "Copper glycinate chelate (Deep blue biuret model)",
    formula: "C4H8CuN2O4",
    molecularWeight: 211.66,
    state: "solid",
    color: "#1B4F72",
    description: "Deep sapphire-blue coordination complex modeling peptide nitrogen coordination in the biuret total protein assay.",
    category: "complex",
    dangerLevel: 1,
    ghsHazards: ["H302"],
    safetyAdvice: ["P264"],
    enthalpyOfFormation: -760,
    entropy: 260,
    heatCapacity: 210,
    solubilityWater: 25,
    density: 1.95,
    boilingPoint: 500,
    meltingPoint: 220,
    oxidationStates: { Cu: 2, C: 0, H: 1, N: -3, O: -2 },
    notes: "Classic square-planar trans-chelate formed by alpha-amino acid carboxyl and amine donors."
  },
  {
    id: "na4fe_cn5nos",
    name: "Tetrasodium pentakis(cyano-C)(thionitrosyl)ferrate",
    commonName: "Sodium thionitroprusside (Legal purple chromophore)",
    formula: "C5FeN6Na4OS",
    molecularWeight: 337.95,
    state: "solid",
    color: "#6C3483",
    description: "Intense purple coordination complex formed by nucleophilic attack of sulfide on the nitrosyl ligand of sodium nitroprusside.",
    category: "complex",
    dangerLevel: 0,
    ghsHazards: [],
    safetyAdvice: ["P102"],
    enthalpyOfFormation: -320,
    entropy: 390,
    heatCapacity: 310,
    solubilityWater: 250,
    density: 1.88,
    boilingPoint: 600,
    meltingPoint: 250,
    oxidationStates: { Fe: 2, Na: 1, C: 2, N: -3, O: -2, S: -2 },
    notes: "Diagnostic color reaction in urinalysis dipstick detection of ketones and sulfur metabolites."
  }
];

const batch8File = path.resolve("src/data/seed/generators/batch8/chemicalDefinitionsBatch8.ts");
let batch8Content = fs.readFileSync(batch8File, "utf8");
const added: any[] = [];
for (const c of chems) {
  if (!batch8Content.includes(`"id": "${c.id}"`)) {
    added.push(c);
  }
}

if (added.length > 0) {
  const lastIdx = batch8Content.lastIndexOf("];");
  const entries = added.map(c => "  " + JSON.stringify(c, null, 2).replace(/\n/g, "\n  ")).join(",\n");
  batch8Content = batch8Content.slice(0, lastIdx).trimEnd() + ",\n" + entries + "\n];\n";
  fs.writeFileSync(batch8File, batch8Content, "utf8");
  console.log(`✓ Added ${added.length} chems to chemicalDefinitionsBatch8.ts`);
}
