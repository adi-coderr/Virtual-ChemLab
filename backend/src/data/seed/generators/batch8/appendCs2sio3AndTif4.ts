import * as fs from "fs";
import * as path from "path";

const chems = [
  {
    id: "cs2sio3",
    name: "Cesium metasilicate",
    commonName: "Cesium silicate (CsOH silicon etch product)",
    formula: "Cs2O3Si",
    molecularWeight: 341.90,
    state: "solid",
    color: "#FFFFFF",
    description: "Highly soluble byproduct formed during anisotropic crystallographic etching of silicon wafers by cesium hydroxide.",
    category: "salt",
    dangerLevel: 0,
    ghsHazards: [],
    safetyAdvice: ["P102"],
    enthalpyOfFormation: -1550,
    entropy: 190,
    heatCapacity: 140,
    solubilityWater: 700,
    density: 3.5,
    boilingPoint: 1500,
    meltingPoint: 950,
    oxidationStates: { Cs: 1, Si: 4, O: -2 },
    notes: "CsOH produces high-precision MEMS micro-nozzles with minimal corner undercutting."
  },
  {
    id: "tif4",
    name: "Titanium tetrafluoride",
    commonName: "Titanium(IV) fluoride (Ti dry etch product)",
    formula: "F4Ti",
    molecularWeight: 123.86,
    state: "solid",
    color: "#FFFFFF",
    description: "Volatile fluoride product formed during plasma and xenon difluoride chemical dry etching of titanium liner films.",
    category: "inorganic",
    dangerLevel: 2,
    ghsHazards: ["H314"],
    safetyAdvice: ["P280", "P305+P351+P338"],
    enthalpyOfFormation: -1649,
    entropy: 134,
    heatCapacity: 98,
    solubilityWater: 100,
    density: 2.79,
    boilingPoint: 284,
    meltingPoint: 284,
    oxidationStates: { Ti: 4, F: -1 },
    notes: "Sublimes cleanly under vacuum during MEMS release processing."
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
