import * as fs from "fs";

const toAdd: any[] = [
  {
    id: "hydroxy_alachlor",
    commonName: "Hydroxyalachlor",
    formula: "C14H21NO3",
    casNumber: "171263-23-9",
    physicalState: "solid",
    density: 1.15,
    chemicalClass: "organic",
    substanceColor: "#FFFFFF",
    notes: "Primary abiotic and microbial dechlorination metabolite of alachlor in agricultural soil.",
  },
  {
    id: "hydroxy_metolachlor",
    commonName: "Hydroxymetolachlor",
    formula: "C15H23NO3",
    casNumber: "171263-24-0",
    physicalState: "liquid",
    density: 1.12,
    chemicalClass: "organic",
    substanceColor: "#FFFFFF",
    notes: "Benign hydrolytic dechlorination metabolite of metolachlor herbicide.",
  },
  {
    id: "paraquat_diiodide",
    commonName: "Paraquat diiodide (Methyl viologen diiodide)",
    formula: "C12H14I2N2",
    casNumber: "1910-44-7",
    physicalState: "solid",
    density: 2.15,
    chemicalClass: "salt",
    substanceColor: "#D4AC0D",
    notes: "Deep orange-yellow bipyridylium iodide salt with intense charge-transfer absorption.",
  }
];

const filePath = "src/data/seed/generators/batch8/chemicalDefinitionsBatch8.ts";
let content = fs.readFileSync(filePath, "utf8");
const formatted = toAdd.map(c => `  ${JSON.stringify(c, null, 2).replace(/\n/g, "\n  ")},`).join("\n");
const lastIdx = content.lastIndexOf("];");
const updated = content.slice(0, lastIdx) + formatted + "\n" + content.slice(lastIdx);
fs.writeFileSync(filePath, updated, "utf8");
console.log(`✓ Added 3 more chemicals to Batch 8 registry.`);
