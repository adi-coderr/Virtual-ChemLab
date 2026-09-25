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

const all = new Map<string, any>();
for (const c of SEED_CHEMICALS) all.set(c.id, c);
for (const c of CHEMICALS_BATCH_5) all.set(c.id, c);
for (const c of CHEMICALS_BATCH_6) all.set(c.id, c);
for (const c of CHEMICALS_BATCH_7) all.set(c.id, c);
for (const c of RAW_BATCH_8_CHEMICALS) all.set(c.id, c);

const existing = getExistingKeys();
for (const r of DOMAIN_38_REACTIONS) existing.add([...r.reactants].sort().join("+"));
for (const r of DOMAIN_39_REACTIONS) existing.add([...r.reactants].sort().join("+"));
for (const r of DOMAIN_40_REACTIONS) existing.add([...r.reactants].sort().join("+"));

const candidates = [
  // 1-20 Biosensors & POC
  {
    id: "clinic-001-glucose-ferricyanide-mediator",
    name: "Ferricyanide-mediated amperometric blood glucose test strip",
    reactants: ["c6h12o6", "k3fe_cn6", "koh"],
    products: ["c6h12o7_gluconic", "k4fe_cn6", "water"],
    enthalpy: -110,
    desc: "Glucose dehydrogenase/oxidase transfers electrons to ferricyanide mediator producing yellow-to-colorless ferrocyanide current at +400 mV.",
    type: "redox_other",
    effects: [{ type: "color_change", colorFrom: "#F4D03F", colorTo: "#EAEDED", description: "Yellow ferricyanide reduces to pale ferrocyanide" }]
  },
  {
    id: "clinic-002-gdl-lactonase-hydrolysis",
    name: "Gluconolactone hydrolysis to D-gluconic acid in glucose biosensors",
    reactants: ["glucono_delta_lactone", "water"],
    products: ["c6h12o7_gluconic"],
    enthalpy: -22,
    desc: "Spontaneous and lactonase-catalyzed opening of cyclic lactone ring following glucose oxidation.",
    type: "synthesis",
    effects: [{ type: "temperature_increase", description: "Mild hydration exotherm" }]
  },
  {
    id: "clinic-003-cholesterol-oxidase-lipid-panel",
    name: "Cholesterol oxidase enzymatic oxidation in diagnostic lipid profiles",
    reactants: ["cholesterol", "o2"],
    products: ["cholest_4_en_3_one", "h2o2"],
    enthalpy: -180,
    desc: "Enzymatic conversion of free serum cholesterol to cholest-4-en-3-one and stoichiometric hydrogen peroxide.",
    type: "redox_other",
    effects: [{ type: "color_change", colorFrom: "#FFFFFF", colorTo: "#FAFAFA", description: "Lipid dispersion clarifies as H2O2 is generated" }]
  },
  {
    id: "clinic-004-uricase-urate-oxidase-gout",
    name: "Uricase enzymatic oxidation of uric acid in clinical hyperuricemia assays",
    reactants: ["uric_acid", "o2", "water"],
    products: ["allantoin", "h2o2", "co2"],
    enthalpy: -215,
    desc: "Diagnostic enzymatic destruction of purine uric acid yielding highly water-soluble allantoin, peroxide, and carbon dioxide.",
    type: "redox_other",
    effects: [{ type: "gas_evolution", description: "Microscopic carbon dioxide effervescence" }]
  },
  {
    id: "clinic-005-creatininase-hydrolysis",
    name: "Creatininase enzymatic ring-opening of creatinine to creatine",
    reactants: ["creatinine", "water"],
    products: ["creatine"],
    enthalpy: -18,
    desc: "First step of enzymatic cascade for renal function testing converting cyclic creatinine to linear creatine.",
    type: "synthesis",
    effects: [{ type: "color_change", colorFrom: "#FFFFFF", colorTo: "#FFFFFF", description: "Dissolution into clear aqueous solution" }]
  },
  {
    id: "clinic-006-creatinase-urea-sarcosine-cleavage",
    name: "Creatinase enzymatic hydrolysis of creatine to sarcosine and urea",
    reactants: ["creatine", "water"],
    products: ["sarcosine", "ch4n2o"],
    enthalpy: -15,
    desc: "Second step in multi-enzyme clinical creatinine dry-slide testing generating sarcosine and urea.",
    type: "decomposition",
    effects: [{ type: "temperature_increase", description: "Mild hydrolytic exotherm" }]
  },
  {
    id: "clinic-007-sarcosine-oxidase-peroxide-generation",
    name: "Sarcosine oxidase enzymatic oxidation in clinical creatinine biosensors",
    reactants: ["sarcosine", "o2", "water"],
    products: ["glycine", "hcho", "h2o2"],
    enthalpy: -195,
    desc: "Terminal enzyme in creatinine biosensor generating stoichiometric peroxide detected by electrochemical electrodes.",
    type: "redox_other",
    effects: [{ type: "color_change", colorFrom: "#FFFFFF", colorTo: "#FAFAFA", description: "Generation of reactive hydrogen peroxide" }]
  },
  {
    id: "clinic-008-lactate-biosensor-ferricyanide",
    name: "Lactate biosensor ferricyanide electrochemical transduction",
    reactants: ["c3h6o3_lactic", "k3fe_cn6", "koh"],
    products: ["c3h4o3_pyruvate", "k4fe_cn6", "water"],
    enthalpy: -125,
    desc: "Whole-blood sepsis lactate sensor transferring electrons via ferricyanide mediator to avoid direct oxygen dependency.",
    type: "redox_other",
    effects: [{ type: "color_change", colorFrom: "#F4D03F", colorTo: "#EAEDED", description: "Yellow ferricyanide reduces to ferrocyanide" }]
  },
  {
    id: "clinic-009-bilirubin-oxidase-clearing",
    name: "Bilirubin oxidase enzymatic oxidation in serum interference elimination",
    reactants: ["bilirubin", "o2"],
    products: ["biliverdin", "water"],
    enthalpy: -240,
    desc: "Enzymatic conversion of yellow-orange bilirubin to green biliverdin to eliminate spectral interference in spectrophotometry.",
    type: "redox_other",
    effects: [{ type: "color_change", colorFrom: "#D4AC0D", colorTo: "#1E8449", description: "Yellow-orange icteric serum turns emerald green biliverdin" }]
  },
  {
    id: "clinic-010-tmb-peroxidase-elisa-chromophore",
    name: "Horseradish peroxidase TMB oxidation in clinical ELISA diagnostics",
    reactants: ["tmb", "h2o2"],
    products: ["tmb_diimine", "water"],
    enthalpy: -190,
    desc: "Horseradish peroxidase (HRP) oxidation of colorless 3,3',5,5'-tetramethylbenzidine to blue charge-transfer complex and yellow diimine.",
    type: "redox_other",
    effects: [{ type: "color_change", colorFrom: "#FFFFFF", colorTo: "#F4D03F", description: "Colorless solution yields deep yellow diimine chromophore at 450 nm" }]
  },
  {
    id: "clinic-011-glucose-benedict-copper-reduction",
    name: "Benedict / Fehling test reduction of copper(II) hydroxide by glucose",
    reactants: ["c6h12o6", "cu_oh_2"],
    products: ["cu2o", "c6h12o7_gluconic", "water"],
    enthalpy: -95,
    desc: "Reducing aldehyde group of D-glucose reduces insoluble blue cupric hydroxide to brick-red cuprous oxide precipitate.",
    type: "redox_other",
    effects: [{ type: "precipitation", colorTo: "#B03A2E", description: "Blue alkaline cupric solution deposits brick-red cuprous oxide precipitate" }]
  },
  {
    id: "clinic-012-glucose-tollens-silver-mirror",
    name: "Tollens silver mirror diagnostic test for reducing monosaccharides",
    reactants: ["c6h12o6", "ag2o"],
    products: ["ag", "c6h12o7_gluconic"],
    enthalpy: -160,
    desc: "Oxidation of open-chain aldoses depositing metallic silver mirror on glass diagnostic tubes.",
    type: "redox_other",
    effects: [{ type: "color_change", colorFrom: "#FFFFFF", colorTo: "#BDC3C7", description: "Bright reflective silver mirror deposits on glassware" }]
  },
  {
    id: "clinic-013-fructose-seliwanoff-hmf-dehydration",
    name: "Seliwanoff diagnostic dehydration of D-fructose to hydroxymethylfurfural",
    reactants: ["c6h12o6_fructose"],
    products: ["hmf", "water"],
    enthalpy: 85,
    desc: "Rapid acid-catalyzed dehydration of ketohexoses forming 5-(hydroxymethyl)furfural for resorcinol coupling.",
    type: "decomposition",
    effects: [{ type: "temperature_increase", description: "Endothermic acid dehydration requiring boiling water bath" }]
  },
  {
    id: "clinic-014-ethanol-breathalyzer-cro3-oxidation",
    name: "Chromium trioxide sulfuric acid breathalyzer alcohol oxidation",
    reactants: ["c2h5oh", "cro3", "h2so4"],
    products: ["ch3cooh", "cr2-so4-3", "water"],
    enthalpy: -480,
    desc: "Electrochemical and photometric roadside alcohol screen reducing reddish-orange Cr(VI) to forest green Cr(III) sulfate.",
    type: "redox_other",
    effects: [{ type: "color_change", colorFrom: "#BA4A00", colorTo: "#1E8449", description: "Red-orange chromium trioxide reduces to deep green chromium(III) sulfate" }]
  },
  {
    id: "clinic-015-urease-bun-enzymatic-hydrolysis",
    name: "Urease enzymatic hydrolysis in blood urea nitrogen (BUN) assays",
    reactants: ["ch4n2o", "water"],
    products: ["nh3", "co2"],
    enthalpy: -31,
    desc: "Rapid nickel-dependent enzymatic cleavage of blood urea producing alkaline ammonia quantified by Berthelot or glutamate dehydrogenase assays.",
    type: "decomposition",
    effects: [{ type: "gas_evolution", description: "Alkaline ammonia and carbon dioxide generation" }]
  },
  {
    id: "clinic-016-alp-p-nitrophenyl-phosphate-cleavage",
    name: "Alkaline phosphatase (ALP) enzymatic hydrolysis of p-nitrophenyl phosphate",
    reactants: ["p_nitrophenyl_phosphate", "water"],
    products: ["p_nitrophenol", "h3po4"],
    enthalpy: -42,
    desc: "Kinetic diagnostic assay assessing biliary obstruction and osteoblastic bone metastases releasing p-nitrophenol.",
    type: "decomposition",
    effects: [{ type: "color_change", colorFrom: "#FFFFFF", colorTo: "#FFFFFF", description: "Hydrolytic cleavage into free nitrophenol" }]
  },
  {
    id: "clinic-017-p-nitrophenol-alkaline-yellow-chromophore",
    name: "Alkaline ionization of p-nitrophenol to 405 nm yellow diagnostic chromophore",
    reactants: ["p_nitrophenol", "naoh"],
    products: ["c6h4nnao3", "water"],
    enthalpy: -55,
    desc: "Deprotonation of phenolic hydroxyl forming delocalized quinoid phenolate anion with molar absorptivity 18,500 M-1 cm-1 at 405 nm.",
    type: "acid_base",
    effects: [{ type: "color_change", colorFrom: "#FFFFFF", colorTo: "#F4D03F", description: "Colorless solution instantly develops intense luminous yellow color" }]
  },
  {
    id: "clinic-018-ellman-dtnb-thiol-cleavage",
    name: "Ellman reagent (DTNB) disulfide reduction generating yellow TNB anion",
    reactants: ["dtnb", "h2s"],
    products: ["tnb", "s"],
    enthalpy: -75,
    desc: "Disulfide exchange with biological sulfhydryls yielding intense yellow 2-nitro-5-thiobenzoate anion at 412 nm.",
    type: "redox_other",
    effects: [{ type: "color_change", colorFrom: "#FEF9E7", colorTo: "#F4D03F", description: "Pale yellow reagent yields vibrant chrome-yellow TNB chromophore" }]
  },
  {
    id: "clinic-019-glutathione-reductase-cycle",
    name: "Glutathione disulfide enzymatic reduction in red blood cell redox screens",
    reactants: ["gssg", "h2"],
    products: ["gsh"],
    enthalpy: -65,
    desc: "Regeneration of reduced intracellular glutathione protecting erythrocyte membranes from peroxide-induced hemolytic anemia (G6PD deficiency).",
    type: "synthesis",
    effects: [{ type: "color_change", colorFrom: "#FFFFFF", colorTo: "#FFFFFF", description: "Enzymatic reduction restoring cellular thiol pool" }]
  },
  {
    id: "clinic-020-biuret-cupric-complexation",
    name: "Biuret test coordination of peptide bonds by copper(II) hydroxide",
    reactants: ["biuret", "cu_oh_2"],
    products: ["cu_biuret_complex", "water"],
    enthalpy: -68,
    desc: "Chelation of cupric ions by adjacent amide nitrogens forming deep violet-purple square planar coordination complex at 540 nm.",
    type: "synthesis",
    effects: [{ type: "color_change", colorFrom: "#3498DB", colorTo: "#8E44AD", description: "Light blue cupric suspension dissolves into brilliant royal purple-violet solution" }]
  }
];

let ok = 0;
for (const c of candidates) {
  try {
    for (const cid of [...c.reactants, ...c.products]) {
      if (!all.has(cid)) throw new Error(`Missing ID: ${cid}`);
    }
    const rKey = [...c.reactants].sort().join("+");
    if (existing.has(rKey)) throw new Error(`Collision: ${rKey}`);
    const rs = c.reactants.map(cid => {
      const chem = all.get(cid)!;
      const p = parseFormula(chem.formula);
      return { label: cid, formula: chem.formula, composition: p.composition, charge: chem.charge ?? 0 };
    });
    const ps = c.products.map(cid => {
      const chem = all.get(cid)!;
      const p = parseFormula(chem.formula);
      return { label: cid, formula: chem.formula, composition: p.composition, charge: chem.charge ?? 0 };
    });
    const res = balanceEquation(rs, ps);
    if (!res.balancedEquationText) throw new Error("No balance");
    console.log(`✓ [${c.id}] ${res.balancedEquationText}`);
    ok++;
  } catch (err: any) {
    console.error(`❌ [${c.id}]:`, err.message);
  }
}
console.log(`Tested ${ok} / ${candidates.length} successfully!`);
