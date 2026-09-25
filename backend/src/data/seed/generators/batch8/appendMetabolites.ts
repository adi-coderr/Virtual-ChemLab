import * as fs from "fs";

const toAdd: any[] = [
  {
    id: "malathion_monocarboxylic_acid",
    commonName: "Malathion monocarboxylic acid (MMA)",
    formula: "C8H15O6PS2",
    casNumber: "1644-88-8",
    physicalState: "solid",
    density: 1.30,
    chemicalClass: "organic",
    substanceColor: "#FFFFFF",
    notes: "Primary enzymatic detoxication metabolite formed by serum and tissue carboxylesterases.",
  },
  {
    id: "diethyl_thiophosphoric_acid",
    commonName: "O,O-Diethyl phosphorothioate (DETP)",
    formula: "C4H11O3PS",
    casNumber: "2465-65-8",
    physicalState: "liquid",
    density: 1.15,
    chemicalClass: "organic",
    substanceColor: "#FFFFFF",
    notes: "Universal urinary biomarker metabolite indicating exposure to chlorpyrifos, diazinon, and parathion.",
  },
  {
    id: "methomyl_sulfoxide",
    commonName: "Methomyl sulfoxide",
    formula: "C5H10N2O3S",
    casNumber: "51910-63-9",
    physicalState: "solid",
    density: 1.35,
    chemicalClass: "organic",
    substanceColor: "#FFFFFF",
    notes: "Oxidation metabolite of methomyl formed by agricultural soil microflora.",
  },
  {
    id: "glufosinate_ammonium",
    commonName: "Glufosinate-ammonium (Basta / Liberty)",
    formula: "C5H15N2O4P",
    casNumber: "77182-82-2",
    physicalState: "solid",
    density: 1.40,
    meltingPointC: 216,
    chemicalClass: "organic",
    substanceColor: "#FFFFFF",
    notes: "Commercial ammonium salt formulation of glufosinate broad-spectrum herbicide.",
  },
  {
    id: "potassium_polyphosphate",
    commonName: "Potassium metaphosphate (Potassium polyphosphate)",
    formula: "KPO3",
    casNumber: "7790-53-6",
    physicalState: "solid",
    density: 2.39,
    meltingPointC: 807,
    chemicalClass: "salt",
    substanceColor: "#FFFFFF",
    notes: "Ultra-high analysis 0-58-35 PK fertilizer with minimal salt index.",
  },
  {
    id: "urea_hydrochloride",
    commonName: "Urea hydrochloride",
    formula: "CH5ClN2O",
    casNumber: "506-89-8",
    physicalState: "solid",
    density: 1.44,
    meltingPointC: 145,
    chemicalClass: "salt",
    substanceColor: "#FFFFFF",
    notes: "Safe alternative to muriatic acid used in agricultural irrigation equipment scale removal.",
  }
];

const filePath = "src/data/seed/generators/batch8/chemicalDefinitionsBatch8.ts";
let content = fs.readFileSync(filePath, "utf8");
const formatted = toAdd.map(c => `  ${JSON.stringify(c, null, 2).replace(/\n/g, "\n  ")},`).join("\n");
const lastIdx = content.lastIndexOf("];");
const updated = content.slice(0, lastIdx) + formatted + "\n" + content.slice(lastIdx);
fs.writeFileSync(filePath, updated, "utf8");
console.log(`✓ Added 6 metabolite chemicals to Batch 8 registry.`);
