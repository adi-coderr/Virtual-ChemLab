import * as fs from "fs";
import * as path from "path";

const chems = [
  {
    id: "mo",
    name: "Molybdenum metal",
    commonName: "Molybdenum (Refractory gate metal)",
    formula: "Mo",
    molecularWeight: 95.95,
    state: "solid",
    color: "#566573",
    description: "Refractory transition metal utilized for low-resistance wordlines in 3D NAND flash memory and advanced gate electrodes.",
    category: "metal",
    dangerLevel: 0,
    ghsHazards: [],
    safetyAdvice: ["P102"],
    enthalpyOfFormation: 0,
    entropy: 28.6,
    heatCapacity: 24.1,
    solubilityWater: 0,
    density: 10.28,
    boilingPoint: 4639,
    meltingPoint: 2623,
    oxidationStates: { Mo: 0 },
    notes: "High melting point and low electrical resistivity (5.34 micro-ohm cm)."
  },
  {
    id: "ta",
    name: "Tantalum metal",
    commonName: "Tantalum (Copper barrier & capacitor plate)",
    formula: "Ta",
    molecularWeight: 180.95,
    state: "solid",
    color: "#7F8C8D",
    description: "Corrosion-resistant refractory metal serving as the standard bilayer barrier (Ta/TaN) against copper interconnect diffusion.",
    category: "metal",
    dangerLevel: 0,
    ghsHazards: [],
    safetyAdvice: ["P102"],
    enthalpyOfFormation: 0,
    entropy: 41.5,
    heatCapacity: 25.4,
    solubilityWater: 0,
    density: 16.69,
    boilingPoint: 5458,
    meltingPoint: 3017,
    oxidationStates: { Ta: 0 },
    notes: "Body-centered cubic metal sputtered via physical vapor deposition (PVD)."
  },
  {
    id: "co2-co-8",
    name: "Dicobalt octacarbonyl",
    commonName: "Cobalt carbonyl (Co CVD precursor)",
    formula: "C8Co2O8",
    molecularWeight: 341.95,
    state: "solid",
    color: "#E74C3C",
    description: "Volatile organometallic cobalt complex used for low-temperature chemical vapor deposition of cobalt contacts and interconnect caps.",
    category: "complex",
    dangerLevel: 2,
    ghsHazards: ["H302", "H332"],
    safetyAdvice: ["P261", "P280"],
    enthalpyOfFormation: -1250,
    entropy: 410,
    heatCapacity: 310,
    solubilityWater: 0,
    density: 1.78,
    boilingPoint: 150,
    meltingPoint: 51,
    oxidationStates: { Co: 0, C: 2, O: -2 },
    notes: "Thermal decomposition at 150-200 °C produces ultra-pure cobalt thin films."
  },
  {
    id: "mocl5",
    name: "Molybdenum pentachloride",
    commonName: "Molybdenum(V) chloride (Mo CVD precursor)",
    formula: "Cl5Mo",
    molecularWeight: 273.21,
    state: "solid",
    color: "#17202A",
    description: "Volatile dark green-black chloride precursor for chemical vapor deposition of molybdenum gate metal lines.",
    category: "inorganic",
    dangerLevel: 2,
    ghsHazards: ["H314"],
    safetyAdvice: ["P280", "P301+P330+P331", "P305+P351+P338"],
    enthalpyOfFormation: -528,
    entropy: 195,
    heatCapacity: 140,
    solubilityWater: 0,
    density: 2.93,
    boilingPoint: 268,
    meltingPoint: 194,
    oxidationStates: { Mo: 5, Cl: -1 },
    notes: "Reduced cleanly by hydrogen at 450-600 °C into low-stress metallic molybdenum."
  },
  {
    id: "xef2",
    name: "Xenon difluoride",
    commonName: "XeF2 (Isotropic silicon MEMS dry etchant)",
    formula: "F2Xe",
    molecularWeight: 169.29,
    state: "solid",
    color: "#FFFFFF",
    description: "Vapor-phase noble gas fluoride that etches silicon spontaneously and isotropically with infinite selectivity to SiO2 and photoresist.",
    category: "inorganic",
    dangerLevel: 2,
    ghsHazards: ["H272", "H300", "H314"],
    safetyAdvice: ["P220", "P280", "P301+P310", "P305+P351+P338"],
    enthalpyOfFormation: -164,
    entropy: 115,
    heatCapacity: 68,
    solubilityWater: 25,
    density: 4.32,
    boilingPoint: 114,
    meltingPoint: 129,
    oxidationStates: { Xe: 2, F: -1 },
    notes: "Gold-standard dry chemical release agent for MEMS resonators and cantilevers."
  },
  {
    id: "xe",
    name: "Xenon gas",
    commonName: "Xenon (Inert noble gas)",
    formula: "Xe",
    molecularWeight: 131.29,
    state: "gas",
    color: "#EAEDED",
    description: "Heavy inert noble gas released during xenon difluoride etching and used in EUV laser-produced plasma (LPP) source chambers.",
    category: "noble_gas",
    dangerLevel: 0,
    ghsHazards: [],
    safetyAdvice: ["P102"],
    enthalpyOfFormation: 0,
    entropy: 169.7,
    heatCapacity: 20.8,
    solubilityWater: 0.1,
    density: 5.9,
    boilingPoint: -108.1,
    meltingPoint: -111.8,
    oxidationStates: { Xe: 0 },
    notes: "Non-toxic inert effluent gas from XeF2 dry etch vacuum tools."
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
