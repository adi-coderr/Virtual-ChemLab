import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
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
import type { ReactionDefinition } from "./types.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const all = new Map<string, any>();
for (const c of SEED_CHEMICALS) if (c && c.id) all.set(c.id, c);
for (const c of CHEMICALS_BATCH_5) if (c && c.id) all.set(c.id, c);
for (const c of CHEMICALS_BATCH_6) if (c && c.id) all.set(c.id, c);
for (const c of CHEMICALS_BATCH_7) if (c && c.id) all.set(c.id, c);
for (const c of RAW_BATCH_8_CHEMICALS) if (c && c.id) all.set(c.id, c);

const existingKeys = getExistingKeys();
for (const r of DOMAIN_38_REACTIONS) existingKeys.add([...r.reactants].sort().join("+"));
for (const r of DOMAIN_39_REACTIONS) existingKeys.add([...r.reactants].sort().join("+"));
for (const r of DOMAIN_40_REACTIONS) existingKeys.add([...r.reactants].sort().join("+"));

const reactions: ReactionDefinition[] = [];
const localKeys = new Set<string>();

function add(
  id: string,
  name: string,
  reactants: string[],
  products: string[],
  enthalpy: number,
  desc: string,
  type: string,
  effects: any[]
) {
  const rKey = [...reactants].sort().join("+");
  if (existingKeys.has(rKey)) {
    throw new Error(`Collision with existing reaction: [${id}] key: ${rKey}`);
  }
  if (localKeys.has(rKey)) {
    throw new Error(`Duplicate local reaction key: [${id}] key: ${rKey}`);
  }
  localKeys.add(rKey);

  const missing: string[] = [];
  for (const cid of [...reactants, ...products]) {
    if (!all.has(cid)) missing.push(cid);
  }
  if (missing.length > 0) {
    throw new Error(`[${id}] Missing chemical IDs: ${missing.join(", ")}`);
  }

  const rs: BalancerSpecies[] = reactants.map(cid => {
    const chem = all.get(cid)!;
    return { label: cid, formula: chem.formula, composition: parseFormula(chem.formula).composition, charge: 0 };
  });
  const ps: BalancerSpecies[] = products.map(cid => {
    const chem = all.get(cid)!;
    return { label: cid, formula: chem.formula, composition: parseFormula(chem.formula).composition, charge: 0 };
  });

  const res = balanceEquation(rs, ps);
  if (!res.balancedEquationText) {
    throw new Error(`[${id}] Failed to balance: ${reactants.join("+")} -> ${products.join("+")}`);
  }

  reactions.push({
    id,
    name,
    reactants,
    products,
    enthalpyKjPerMol: enthalpy,
    description: desc,
    reactionType: type as any,
    observableEffects: effects
  });
  console.log(`✓ [${id}] ${res.balancedEquationText}`);
}

console.log("Generating Domain 41: Clinical Diagnostics, Biosensors & Medical Biochemistry...");

// 001 - 020: Biosensors & POC Assays
add("clinic-001-glucose-ferricyanide-mediator", "Ferricyanide-mediated amperometric blood glucose test strip",
  ["c6h12o6", "k3fe_cn6", "koh"], ["c6h12o7_gluconic", "k4fe_cn6", "water"],
  -110, "Glucose dehydrogenase/oxidase transfers electrons to ferricyanide mediator producing yellow-to-colorless ferrocyanide current at +400 mV.",
  "redox_other", [{ type: "color_change", colorFrom: "#F4D03F", colorTo: "#EAEDED", description: "Yellow ferricyanide reduces to pale/colorless ferrocyanide" }]);

add("clinic-002-gdl-lactonase-hydrolysis", "Gluconolactone hydrolysis to D-gluconic acid in glucose biosensors",
  ["glucono_delta_lactone", "water"], ["c6h12o7_gluconic"],
  -22, "Spontaneous and lactonase-catalyzed opening of the cyclic lactone ring following glucose oxidation.",
  "synthesis", [{ type: "temperature_increase", description: "Mild hydration exotherm" }]);

add("clinic-003-cholesterol-oxidase-lipid-panel", "Cholesterol oxidase enzymatic oxidation in diagnostic lipid profiles",
  ["cholesterol", "o2"], ["cholest_4_en_3_one", "h2o2"],
  -180, "Enzymatic conversion of free serum cholesterol to cholest-4-en-3-one and stoichiometric hydrogen peroxide for colorimetric quantitation.",
  "redox_other", [{ type: "color_change", colorFrom: "#FFFFFF", colorTo: "#FAFAFA", description: "Lipid dispersion clarifies as stoichiometric H2O2 is generated" }]);

add("clinic-004-uricase-urate-oxidase-gout", "Uricase enzymatic oxidation of uric acid in clinical hyperuricemia assays",
  ["uric_acid", "o2", "water"], ["allantoin", "h2o2", "co2"],
  -215, "Diagnostic enzymatic destruction of purine uric acid yielding highly water-soluble allantoin, peroxide, and carbon dioxide.",
  "redox_other", [{ type: "gas_evolution", description: "Microscopic carbon dioxide effervescence" }]);

add("clinic-005-creatininase-hydrolysis", "Creatininase enzymatic ring-opening of creatinine to creatine",
  ["creatinine", "water"], ["creatine"],
  -18, "First step of the enzymatic cascade for renal function testing converting cyclic creatinine to linear creatine.",
  "synthesis", [{ type: "color_change", colorFrom: "#FFFFFF", colorTo: "#FFFFFF", description: "Dissolution into clear aqueous solution" }]);

add("clinic-006-creatinase-urea-sarcosine-cleavage", "Creatinase enzymatic hydrolysis of creatine to sarcosine and urea",
  ["creatine", "water"], ["sarcosine", "ch4n2o"],
  -15, "Second step in multi-enzyme clinical creatinine dry-slide testing generating sarcosine and urea.",
  "decomposition", [{ type: "temperature_increase", description: "Mild hydrolytic exotherm" }]);

add("clinic-007-sarcosine-oxidase-peroxide-generation", "Sarcosine oxidase enzymatic oxidation in clinical creatinine biosensors",
  ["sarcosine", "o2", "water"], ["glycine", "hcho", "h2o2"],
  -195, "Terminal enzyme in creatinine biosensor generating stoichiometric peroxide detected by electrochemical electrodes.",
  "redox_other", [{ type: "color_change", colorFrom: "#FFFFFF", colorTo: "#FAFAFA", description: "Generation of reactive hydrogen peroxide" }]);

add("clinic-008-lactate-biosensor-ferricyanide", "Lactate biosensor ferricyanide electrochemical transduction",
  ["c3h6o3_lactic", "k3fe_cn6", "koh"], ["c3h4o3_pyruvate", "k4fe_cn6", "water"],
  -125, "Whole-blood sepsis lactate sensor transferring electrons via ferricyanide mediator to avoid direct oxygen dependency.",
  "redox_other", [{ type: "color_change", colorFrom: "#F4D03F", colorTo: "#EAEDED", description: "Yellow ferricyanide reduces to ferrocyanide" }]);

add("clinic-009-bilirubin-oxidase-clearing", "Bilirubin oxidase enzymatic oxidation in serum interference elimination",
  ["bilirubin", "o2"], ["biliverdin", "water"],
  -240, "Enzymatic conversion of yellow-orange bilirubin to green biliverdin to eliminate spectral interference in clinical spectrophotometry.",
  "redox_other", [{ type: "color_change", colorFrom: "#D4AC0D", colorTo: "#1E8449", description: "Yellow-orange icteric serum turns emerald-green biliverdin" }]);

add("clinic-010-tmb-peroxidase-elisa-chromophore", "Horseradish peroxidase TMB oxidation in clinical ELISA diagnostics",
  ["tmb", "h2o2"], ["tmb_diimine", "water"],
  -190, "Horseradish peroxidase (HRP) oxidation of colorless 3,3',5,5'-tetramethylbenzidine to blue charge-transfer complex and yellow diimine.",
  "redox_other", [{ type: "color_change", colorFrom: "#FFFFFF", colorTo: "#F4D03F", description: "Colorless solution yields deep yellow diimine chromophore at 450 nm" }]);

add("clinic-011-glucose-benedict-copper-reduction", "Benedict / Fehling test reduction of copper(II) hydroxide by glucose",
  ["c6h12o6", "cuoh2"], ["cu2o", "c6h12o7_gluconic", "water"],
  -95, "Reducing aldehyde group of D-glucose reduces insoluble blue cupric hydroxide to brick-red cuprous oxide precipitate.",
  "redox_other", [{ type: "precipitation", colorTo: "#B03A2E", description: "Blue alkaline cupric solution deposits brick-red cuprous oxide precipitate" }]);

add("clinic-012-glucose-tollens-silver-mirror", "Tollens silver mirror diagnostic test for reducing monosaccharides",
  ["c6h12o6", "ag2o"], ["ag", "c6h12o7_gluconic"],
  -160, "Oxidation of open-chain aldoses depositing metallic silver mirror on glass diagnostic tubes.",
  "redox_other", [{ type: "color_change", colorFrom: "#FFFFFF", colorTo: "#BDC3C7", description: "Bright reflective silver mirror deposits on glassware" }]);

add("clinic-013-fructose-resorcinol-seliwanoff", "Seliwanoff diagnostic acid dehydration of D-fructose to hydroxymethylfurfural",
  ["c6h12o6_fructose", "hcl"], ["hmf", "hcl", "water"],
  85, "Rapid acid-catalyzed dehydration of ketohexoses forming 5-(hydroxymethyl)furfural for resorcinol coupling.",
  "decomposition", [{ type: "temperature_increase", description: "Endothermic acid dehydration requiring boiling water bath" }]);

add("clinic-014-ethanol-breathalyzer-cro3-oxidation", "Chromium trioxide sulfuric acid breathalyzer alcohol oxidation",
  ["c2h5oh", "cro3", "h2so4"], ["ch3cooh", "cr2-so4-3", "water"],
  -480, "Electrochemical and photometric roadside alcohol screen reducing reddish-orange Cr(VI) to forest green Cr(III) sulfate.",
  "redox_other", [{ type: "color_change", colorFrom: "#BA4A00", colorTo: "#1E8449", description: "Red-orange chromium trioxide reduces to deep green chromium(III) sulfate" }]);

add("clinic-015-urease-bun-enzymatic-hydrolysis", "Urease enzymatic hydrolysis in blood urea nitrogen (BUN) assays",
  ["ch4n2o", "water"], ["ammonia", "co2"],
  -31, "Rapid nickel-dependent enzymatic cleavage of blood urea producing alkaline ammonia quantified by Berthelot or glutamate dehydrogenase assays.",
  "decomposition", [{ type: "gas_evolution", description: "Alkaline ammonia and carbon dioxide generation" }]);

add("clinic-016-alp-p-nitrophenyl-phosphate-cleavage", "Alkaline phosphatase (ALP) enzymatic hydrolysis of p-nitrophenyl phosphate",
  ["p_nitrophenyl_phosphate", "water"], ["p_nitrophenol", "h3po4"],
  -42, "Kinetic diagnostic assay assessing biliary obstruction and osteoblastic bone metastases releasing p-nitrophenol.",
  "decomposition", [{ type: "color_change", colorFrom: "#FFFFFF", colorTo: "#FFFFFF", description: "Hydrolytic cleavage into free nitrophenol" }]);

add("clinic-017-p-nitrophenol-alkaline-yellow-chromophore", "Alkaline ionization of p-nitrophenol to 405 nm yellow diagnostic chromophore",
  ["p_nitrophenol", "naoh"], ["c6h4nnao3", "water"],
  -55, "Deprotonation of phenolic hydroxyl forming delocalized quinoid phenolate anion with molar absorptivity 18,500 M-1 cm-1 at 405 nm.",
  "acid_base", [{ type: "color_change", colorFrom: "#FFFFFF", colorTo: "#F4D03F", description: "Colorless solution instantly develops intense luminous yellow color" }]);

add("clinic-018-ellman-dtnb-thiol-cleavage", "Ellman reagent (DTNB) disulfide reduction generating yellow TNB anion",
  ["dtnb", "h2s"], ["tnb", "s"],
  -75, "Disulfide exchange with biological sulfhydryls yielding intense yellow 2-nitro-5-thiobenzoate anion at 412 nm.",
  "redox_other", [{ type: "color_change", colorFrom: "#FEF9E7", colorTo: "#F4D03F", description: "Pale yellow reagent yields vibrant chrome-yellow TNB chromophore" }]);

add("clinic-019-glutathione-reductase-cycle", "Glutathione disulfide enzymatic reduction in red blood cell redox screens",
  ["gssg", "h2"], ["gsh"],
  -65, "Regeneration of reduced intracellular glutathione protecting erythrocyte membranes from peroxide-induced hemolytic anemia (G6PD deficiency).",
  "synthesis", [{ type: "color_change", colorFrom: "#FFFFFF", colorTo: "#FFFFFF", description: "Enzymatic reduction restoring cellular thiol pool" }]);

add("clinic-020-biuret-cupric-complexation", "Biuret test coordination of peptide bonds by copper(II) hydroxide",
  ["biuret", "cuoh2"], ["cu_biuret_complex", "water"],
  -68, "Chelation of cupric ions by adjacent amide nitrogens forming deep violet-purple square planar coordination complex at 540 nm.",
  "synthesis", [{ type: "color_change", colorFrom: "#3498DB", colorTo: "#8E44AD", description: "Light blue cupric suspension dissolves into brilliant royal purple-violet solution" }]);

// 021 - 040: Toxicology & Antidotes
add("clinic-021-dmsa-lead-chelation", "Succimer (DMSA) heavy metal chelation of lead chloride",
  ["dmsa", "pbcl2"], ["dmsa_lead_chelate", "hcl"],
  -88, "Oral dimercaptosuccinic acid binding divalent lead into a water-soluble 5-membered cyclic chelate excreted renally.",
  "double_displacement", [{ type: "color_change", colorFrom: "#FFFFFF", colorTo: "#EAEDED", description: "Clear soluble lead mercaptide chelate forms" }]);

add("clinic-022-ca-edta-lead-displacement", "Calcium disodium EDTA lead transmetalation emergency therapy",
  ["ca_edta", "pbno32"], ["pb_edta", "ca-no3-2"],
  -62, "Thermodynamic displacement of calcium (log K = 10.7) by toxic lead (log K = 18.0) in acute pediatric plumbism.",
  "double_displacement", [{ type: "color_change", colorFrom: "#FFFFFF", colorTo: "#FFFFFF", description: "Formation of ultra-stable soluble lead EDTA complex" }]);

add("clinic-023-calcium-gluconate-hf-burn-antidote", "Calcium gluconate precipitation of toxic fluoride in hydrofluoric acid burns",
  ["calcium_gluconate", "hf"], ["caf2", "c6h12o7_gluconic"],
  -145, "Emergency topical and intra-arterial neutralization immobilizing free fluoride ions as insoluble CaF2 to avert lethal cardiac arrest.",
  "precipitation", [{ type: "precipitation", colorTo: "#FFFFFF", description: "Precipitation of insoluble white calcium fluoride mineral" }]);

add("clinic-024-deferoxamine-iron-chelation", "Deferoxamine hexadentate chelation of toxic ferric iron",
  ["deferoxamine", "fecl3"], ["ferrioxamine", "hcl"],
  -135, "Bacterial siderophore chelating free iron from acute ferrous sulfate overdose into reddish-brown ferrioxamine excreted in urine.",
  "double_displacement", [{ type: "color_change", colorFrom: "#FADBD8", colorTo: "#C0392B", description: "Solution turns characteristic vin-rose reddish-brown ferrioxamine" }]);

add("clinic-025-penicillamine-copper-chelation", "D-Penicillamine cupriuresis chelation in Wilson's disease",
  ["penicillamine", "cucl2"], ["penicillamine_cu_chelate", "hcl"],
  -96, "Bidentate amino-thiol coordination of pathological hepatic and cerebral copper deposits promoting massive urinary excretion.",
  "double_displacement", [{ type: "color_change", colorFrom: "#85C1E9", colorTo: "#34495E", description: "Light blue cupric solution turns dark blue-purple copper thiolate chelate" }]);

add("clinic-026-rhodanese-hcn-detoxification", "Mitochondrial rhodanese sulfur transfer detoxifying hydrogen cyanide gas",
  ["hcn", "na2s2o3"], ["nahso3", "nascn"],
  -115, "Hepatic rhodanese transfers sulfane sulfur from thiosulfate to lethal cyanide converting it to non-toxic thiocyanate excreted renally.",
  "redox_other", [{ type: "temperature_increase", description: "Exothermic enzymatic sulfur transfer" }]);

add("clinic-027-sodium-nitrite-acidification-methb", "Acidification of sodium nitrite producing reactive nitrous gases for methemoglobin induction",
  ["nano2", "h2so4"], ["na2so4", "no", "no2", "water"],
  -82, "Cyanide antidote kit component generating active nitrogen oxides to oxidize Hb(Fe2+) to MetHb(Fe3+) which avidly traps cyanide.",
  "decomposition", [{ type: "gas_evolution", description: "Evolution of reddish-brown nitrogen dioxide and nitric oxide fumes" }]);

add("clinic-028-fomepizole-acid-neutralization", "Fomepizole neutralization by hydrochloric acid during pharmaceutical preparation",
  ["fomepizole", "hcl"], ["c4h7cln2"],
  -48, "Preparation of water-soluble 4-methylpyrazole hydrochloride salt for intravenous infusion in methanol/antifreeze poisoning.",
  "synthesis", [{ type: "temperature_increase", description: "Exothermic basic amine neutralization" }]);

add("clinic-029-nac-neutralization-infusion", "N-Acetylcysteine sodium salt formation for intravenous Parvolex infusion",
  ["acetylcysteine", "naoh"], ["c5h8nnao3s_nac_sodium", "water"],
  -56, "Formulation of neutral sterile N-acetylcysteine sodium solution to restore hepatic glutathione in acetaminophen hepatotoxicity.",
  "acid_base", [{ type: "temperature_increase", description: "Mild neutralization exotherm" }]);

add("clinic-030-lanthanum-carbonate-phosphate-binder", "Lanthanum carbonate (Fosrenol) binding of dietary phosphate in renal failure",
  ["lanthanum_carbonate", "h3po4"], ["lanthanum_phosphate", "co2", "water"],
  -175, "Non-calcium phosphate binder reacting with ingested intestinal phosphate to form highly insoluble LaPO4 excreted in feces.",
  "double_displacement", [{ type: "gas_evolution", description: "Effervescence of carbon dioxide as insoluble lanthanum phosphate precipitates" }]);

add("clinic-031-calcium-acetate-phoslo-binder", "Calcium acetate (PhosLo) dietary phosphate precipitation in ESRD hemodialysis",
  ["ca_acetate", "h3po4"], ["ca3po42", "ch3cooh"],
  -120, "Oral phosphate binder precipitating insoluble tricalcium phosphate in the gastrointestinal tract to prevent uremic osteodystrophy.",
  "double_displacement", [{ type: "precipitation", colorTo: "#FFFFFF", description: "White dense calcium phosphate precipitate forms" }]);

add("clinic-032-aluminum-hydroxide-phosphate-binder", "Aluminum hydroxide (Amphojel) precipitation of intestinal phosphate",
  ["al-oh-3", "h3po4"], ["alpo4", "water"],
  -130, "Classic non-absorbable inorganic hydroxide binding luminal phosphate as insoluble aluminum phosphate.",
  "double_displacement", [{ type: "precipitation", colorTo: "#FFFFFF", description: "Dense white precipitate of aluminum phosphate" }]);

add("clinic-033-calcium-citrate-anticoagulation-reversal", "Calcium chloride reversal of regional citrate anticoagulation in apheresis",
  ["cacl2", "c6h5o7na3"], ["ca_citrate", "nacl"],
  -68, "Restoration of systemic ionized calcium (iCa2+) following extracorporeal citrate chelation preventing tetany and hypocalcemia.",
  "double_displacement", [{ type: "precipitation", colorTo: "#FFFFFF", description: "Precipitation of microcrystalline calcium citrate" }]);

add("clinic-034-gout-monosodium-urate-crystallization", "Monosodium urate needle crystal precipitation in hyperuricemic gouty arthritis",
  ["uric_acid", "naoh"], ["sodium_urate", "water"],
  -62, "Alkalinization and neutralization of insoluble uric acid forming negatively birefringent needle-shaped monosodium urate tophi.",
  "acid_base", [{ type: "precipitation", colorTo: "#FFFFFF", description: "Rapid crystallization of fine needle-shaped monosodium urate crystals" }]);

add("clinic-035-calcium-urate-nephrolithiasis", "Calcium urate precipitation in hyperuricosuric calcium nephrolithiasis",
  ["sodium_urate", "cacl2"], ["ca_urate", "nacl"],
  -44, "Heterogeneous nucleating seed formation precipitating insoluble calcium urate in renal calyces.",
  "double_displacement", [{ type: "precipitation", colorTo: "#FFFFFF", description: "Dense crystalline calcium urate precipitate forms" }]);

add("clinic-036-ammonium-oxalate-calcium-precipitation", "Ammonium oxalate clinical diagnostic precipitation of calcium nitrate",
  ["ca-no3-2", "nh4-2-c2o4"], ["cac2o4", "nh4no3"],
  -34, "Quantitative precipitation of envelope-shaped calcium oxalate crystals used for photometric or gravimetric calcium assays.",
  "double_displacement", [{ type: "precipitation", colorTo: "#FFFFFF", description: "Immediate heavy white precipitate of calcium oxalate" }]);

add("clinic-037-struvite-calculus-precipitation", "Struvite (triple phosphate) staghorn calculus precipitation by Proteus infection",
  ["mgcl2", "monoammonium_phosphate", "naoh"], ["struvite", "nacl", "water"],
  -88, "Bacterial urease alkalizes urine driving precipitation of massive branched staghorn calculi in renal pelvis.",
  "precipitation", [{ type: "precipitation", colorTo: "#FFFFFF", description: "Formation of classic 'coffin-lid' struvite microcrystals" }]);

add("clinic-038-aluminum-phosphate-antacid-neutralization", "Aluminum phosphate (Phosphalugel) antacid neutralization of gastric acid",
  ["alpo4", "hcl"], ["alcl3", "h3po4"],
  -98, "Non-systemic antacid tablet buffering gastric pH while releasing mild cytoprotective phosphate.",
  "acid_base", [{ type: "temperature_increase", description: "Dissolution with mild neutralization exotherm" }]);

add("clinic-039-magnesium-trisilicate-antacid-neutralization", "Magnesium trisilicate (Gaviscon) neutralization forming protective hydrated silica",
  ["mg2si3o8", "hcl"], ["mgcl2", "sio2", "water"],
  -118, "Reaction with gastric acid producing floating alginate/silica raft suppressing gastroesophageal reflux disease.",
  "acid_base", [{ type: "precipitation", colorTo: "#FFFFFF", description: "Formation of gelatinous white hydrated silica precipitate" }]);

add("clinic-040-calcium-carbonate-acetic-neutralization", "Calcium carbonate effervescent antacid reaction with weak organic acid",
  ["caco3", "ch3cooh"], ["ch3coo-2-ca", "co2", "water"],
  -72, "Effervescent dissolution releasing carbon dioxide and soluble calcium acetate.",
  "acid_base", [{ type: "gas_evolution", description: "Rapid bubbling effervescence of carbon dioxide" }]);

// 041 - 060: Acid-Base & Clinical Pharmacology
add("clinic-041-bicarbonate-ketoacidosis-rescue", "Sodium bicarbonate resuscitation neutralizing acetoacetic acid in diabetic ketoacidosis",
  ["nahco3", "c4h6o3_acetoacetic"], ["c4h5nao3", "co2", "water"],
  -52, "Emergency buffer therapy correcting arterial acidemia and generating neutral sodium acetoacetate and expired CO2.",
  "acid_base", [{ type: "gas_evolution", description: "Effervescence of carbon dioxide gas" }]);

add("clinic-042-ammonium-chloride-bicarbonate-challenge", "Ammonium chloride distal renal tubular acidosis bicarbonate challenge",
  ["ammonium-chloride", "nahco3"], ["nacl", "ammonia", "co2", "water"],
  -44, "Acid-loading challenge testing distal intercalated cell H+ secretion to distinguish Type 1 from Type 2 RTA.",
  "acid_base", [{ type: "gas_evolution", description: "Generation of ammonia and carbon dioxide gases" }]);

add("clinic-043-perls-prussian-blue-tissue-iron", "Perls Prussian blue histochemical reaction for hemosiderin iron deposits",
  ["fecl2", "k3fe_cn6"], ["fe3_fecn6_2", "kcl"],
  -110, "Turnbull / Prussian blue coordination identifying pathological iron overload in hemochromatosis and sideroblastic ringed sideroblasts.",
  "double_displacement", [{ type: "precipitation", colorTo: "#1B4F72", description: "Dense insoluble deep Prussian blue pigment deposits" }]);

add("clinic-044-luminol-chemiluminescence-forensic-blood", "Luminol chemiluminescent oxidation catalyzed by hemoglobin heme iron",
  ["luminol", "h2o2"], ["3_aminophthalate", "n2", "water"],
  -460, "Catalytic peroxidase-like activity of heme decomposing H2O2 to oxidize luminol emitting intense blue chemiluminescence (425 nm).",
  "redox_other", [{ type: "color_change", colorFrom: "#EAEDED", colorTo: "#2980B9", description: "Vivid luminescent blue glow emitted in darkened room" }]);

add("clinic-045-dansyl-chloride-amino-acid-labeling", "Dansyl chloride fluorogenic labeling of primary amino acids",
  ["dansyl_chloride", "glycine"], ["dansyl_glycine", "hcl"],
  -78, "Fluorescent derivatization of amino acid alpha-amino groups enabling femtomole detection in diagnostic aminoaciduria screening.",
  "synthesis", [{ type: "color_change", colorFrom: "#F4D03F", colorTo: "#F9E79F", description: "Formation of intensely fluorescent yellow-green sulfonamide conjugate" }]);

add("clinic-046-chloramine-t-tyrosine-radioiodination", "Chloramine-T electrophilic radioiodination of peptide tyrosine residues",
  ["chloramine_t", "tyrosine", "nai", "water"], ["3_iodotyrosine", "p_toluenesulfonamide", "nacl", "naoh"],
  -135, "Standard oxidation in radioimmunoassay (RIA) producing electrophilic iodonium (I+) for ortho-substitution into phenol rings.",
  "redox_other", [{ type: "temperature_increase", description: "Exothermic electrophilic aromatic substitution" }]);

add("clinic-047-ascorbate-ferricyanide-antioxidant", "Electrochemical reduction of ferricyanide by ascorbic acid (Vitamin C)",
  ["c6h8o6_ascorbic", "k3fe_cn6", "koh"], ["c6h6o6_dehydroascorbic", "k4fe_cn6", "water"],
  -140, "Point-of-care amperometric sensor assessing plasma total antioxidant capacity (TAC) via two-electron transfer to ferricyanide.",
  "redox_other", [{ type: "color_change", colorFrom: "#F4D03F", colorTo: "#EAEDED", description: "Yellow ferricyanide bleaches to clear ferrocyanide" }]);

add("clinic-048-acetic-acid-protein-precipitation", "Acetic acid heat coagulation test for urinary albumin",
  ["ch3cooh", "naoh"], ["ch3coona", "water"],
  -57, "Acidification to the isoelectric point causing thermal denaturation and turbid flocculation of pathologic urinary protein.",
  "acid_base", [{ type: "temperature_increase", description: "Exothermic proton neutralization" }]);

add("clinic-049-salicylate-trinder-ferric-colorimetry", "Trinder photometric diagnostic assay for toxic salicylate overdose",
  ["fecl3", "water"], ["feoh3", "hcl"],
  -12, "Formation of stable purple-violet iron-phenolate coordination complex absorbing strongly at 540 nm in emergency toxicology.",
  "decomposition", [{ type: "color_change", colorFrom: "#D4AC0D", colorTo: "#7D3C98", description: "Solution turns deep diagnostic purple" }]);

add("clinic-050-pralidoxime-chloride-conversion", "Pralidoxime chloride reaction forming active oxime antidote base",
  ["pralidoxime", "naoh"], ["c7h8n2o", "nacl", "water"],
  -44, "Liberation of uncharged pralidoxime free base capable of crossing the blood-brain barrier to dephosphorylate acetylcholinesterase.",
  "acid_base", [{ type: "temperature_increase", description: "Exothermic chloride neutralization" }]);

add("clinic-051-cupric-tartrate-fehling-glucose", "Fehling reduction of cupric tartrate complex by reducing glucose",
  ["c6h12o6", "cuo"], ["c6h12o7_gluconic", "cu2o"],
  -82, "Enolic tautomer of glucose reduces cupric ions to insoluble red cuprous oxide precipitate in diabetic sugar urinalysis.",
  "redox_other", [{ type: "precipitation", colorTo: "#C0392B", description: "Red cuprous oxide microcrystalline precipitate forms at bottom of tube" }]);

add("clinic-052-sodium-thiosulfate-caliphylaxis", "Sodium thiosulfate dissolution of vascular calcium deposits in calciphylaxis",
  ["na2s2o3", "cacl2"], ["ca-s2o3", "nacl"],
  -18, "Intravenous thiosulfate chelates insoluble subcutaneous calcium deposits into soluble calcium thiosulfate salts (log K = 3.0).",
  "double_displacement", [{ type: "color_change", colorFrom: "#FFFFFF", colorTo: "#FFFFFF", description: "Clearing of calcified crystal suspensions" }]);

add("clinic-053-sodium-nitroprusside-sulfide-complex", "Legal test sodium nitroprusside sulfide complexation to purple thionitroprusside",
  ["na2-fe-cn-5-no", "na2s"], ["na4fe_cn5nos"],
  -95, "Alkaline activation of pentacyanonitrosylferrate forming the active coordination site for acetoacetate nucleophilic attack.",
  "redox_other", [{ type: "color_change", colorFrom: "#922B21", colorTo: "#1F618D", description: "Deep ruby red turns vivid purple-blue" }]);

add("clinic-054-barium-hydroxide-sulfate-antidote", "Sodium sulfate emergency antidote precipitation of soluble barium hydroxide",
  ["ba-oh-2", "na2so4"], ["baso4", "naoh"],
  -112, "Precipitation of lethal soluble barium rodenticide into completely insoluble, non-absorbable barium sulfate.",
  "double_displacement", [{ type: "precipitation", colorTo: "#FFFFFF", description: "Dense heavy white barium sulfate precipitate forms with gas evolution" }]);

add("clinic-055-potassium-iodate-iodide-synergy", "Potassium iodate-iodide acetic acid volumetric titration in tablet verification",
  ["kio3", "ki", "ch3cooh"], ["i2", "ch3cook", "water"],
  -340, "Comproportionation assay quantifying stockpiled potassium iodate tablets used for thyroid radioactive iodine blockade.",
  "redox_other", [{ type: "color_change", colorFrom: "#EAEDED", colorTo: "#7E5109", description: "Colorless solution generates dark brown molecular iodine" }]);

add("clinic-056-methylene-blue-methemoglobin-reduction", "Methylene blue dye reduction to colorless leucomethylene blue",
  ["c16h18cln3s", "h2"], ["c16h19cln3s"],
  -130, "NADPH-dependent enzymatic reduction of methylene blue to leuko form which donates electrons directly to MetHb(Fe3+) restoring Hb(Fe2+).",
  "synthesis", [{ type: "color_change", colorFrom: "#1B4F72", colorTo: "#EAEDED", description: "Deep royal blue turns completely colorless upon reduction" }]);

add("clinic-057-clark-collip-oxalate-permanganate-titration", "Clark-Collip nitric acid permanganate titration of precipitated calcium oxalate",
  ["cac2o4", "kmno4", "hno3"], ["ca-no3-2", "kno3", "mn-no3-2", "co2", "water"],
  -1380, "Gold-standard reference titration determining serum calcium concentration by titrating isolated oxalate with permanganate.",
  "redox_other", [{ type: "color_change", colorFrom: "#7D3C98", colorTo: "#EAEDED", description: "Intense purple permanganate rapidly bleaches to faint permanent pink end-point" }]);

add("clinic-058-berthelot-chloramine-formation", "Berthelot reaction generation of monochloramine from ammonium chloride and hypochlorite",
  ["ammonium-chloride", "naocl"], ["nh2cl", "nacl", "water"],
  -46, "First stage of Berthelot spectrophotometric indophenol method for blood urea nitrogen determination.",
  "synthesis", [{ type: "temperature_increase", description: "Mild exothermic chlorination" }]);

add("clinic-059-sodium-salicylate-acidification", "Salicylic acid precipitation upon gastric acidification of sodium salicylate",
  ["c7h5o3na", "hcl"], ["c7h6o3", "nacl"],
  -28, "Diagnostic verification of non-ionized lipophilic salicylate absorption across gastric mucosal barrier causing systemic toxicity.",
  "double_displacement", [{ type: "precipitation", colorTo: "#FFFFFF", description: "Silky white needle-like crystals of salicylic acid precipitate" }]);

add("clinic-060-silver-sulfadiazine-burn-antimicrobial", "Silver nitrate synthesis of topical antimicrobial silver sulfadiazine",
  ["agno3", "c10h9n4nao2s"], ["c10h9agn4o2s", "nano3"],
  -48, "Metathesis producing broad-spectrum topical antibacterial silver sulfadiazine cream (Silvadene) preventing burn wound sepsis.",
  "double_displacement", [{ type: "precipitation", colorTo: "#FFFFFF", description: "Dense white precipitate of silver sulfadiazine" }]);

// 061 - 080: Urinalysis & Histochemistry
add("clinic-061-silver-lactate-burn-antiseptic", "Silver lactate topical burn antiseptic reaction with sodium chloride exudate",
  ["c3h5ago3", "nacl"], ["agcl", "c3h5o3na"],
  -72, "Antimicrobial silver ions precipitate as insoluble silver chloride upon contact with burn blister fluid electrolytes.",
  "double_displacement", [{ type: "precipitation", colorTo: "#FFFFFF", description: "Curd-like white silver chloride precipitate forms" }]);

add("clinic-062-indoxyl-acetate-esterase-cleavage", "Leukocyte esterase dipstick hydrolysis of indoxyl acetate",
  ["indoxyl_acetate", "water"], ["indoxyl", "ch3cooh"],
  -24, "Enzymatic cleavage by human neutrophil elastase releasing free indoxyl intermediate in rapid pyuria urinalysis.",
  "decomposition", [{ type: "color_change", colorFrom: "#FFFFFF", colorTo: "#F9E79F", description: "Clear substrate pad develops pale yellow free indoxyl" }]);

add("clinic-063-indoxyl-aerial-indigo-dimerization", "Oxidative dimerization of indoxyl into diagnostic indigo blue dye",
  ["indoxyl", "o2"], ["indigo_dye", "water"],
  -175, "Spontaneous oxidation and coupling of two indoxyl molecules forming brilliant insoluble indigo blue in purple urine bag syndrome.",
  "redox_other", [{ type: "color_change", colorFrom: "#F9E79F", colorTo: "#1B4F72", description: "Pale yellow solution oxidizes to deep intense royal indigo blue" }]);

add("clinic-064-folin-ciocalteu-molybdenum-reduction", "Lowry protein assay reduction of molybdenum trioxide by tyrosine",
  ["tyrosine", "moo3"], ["c9h9no3", "moo2", "water"],
  -110, "Phenolic side chain of tyrosine residues reduces phosphomolybdotungstic acid forming deep blue heteropolymolybdenum chromophore (750 nm).",
  "redox_other", [{ type: "color_change", colorFrom: "#F4D03F", colorTo: "#1F618D", description: "Yellow reagent turns intense dark molybdenum blue" }]);

add("clinic-065-ninhydrin-glycine-deamination", "Ninhydrin oxidative deamination of glycine amino acid in aminoaciduria screening",
  ["ninhydrin", "glycine"], ["c9h7no3", "hcho", "co2", "water"],
  -88, "First step of the classical ninhydrin test forming intermediate amine and aldehyde with carbon dioxide release.",
  "redox_other", [{ type: "gas_evolution", description: "Decarboxylation effervescence upon heating" }]);

add("clinic-066-ninhydrin-intermediate-decarboxylation", "Oxidative transformation of ninhydrin intermediate releasing nitrogen dioxide",
  ["c9h7no3", "o2"], ["ninhydrin", "no2", "water"],
  -92, "Oxidative transformation of indandione amine intermediate releasing nitrogen dioxide during chromophore maturation.",
  "redox_other", [{ type: "color_change", colorFrom: "#FADBD8", colorTo: "#6C3483", description: "Formation of rich violet pigment" }]);

add("clinic-067-von-kossa-calcium-phosphate-silver", "Von Kossa histochemical silver displacement staining of pathological calcification",
  ["ca3po42", "agno3"], ["ag3po4", "ca-no3-2"],
  -85, "Displacement of calcium by silver ions in calcified arteriosclerotic plaques and nephrocalcinosis followed by photoreduction to black Ag0.",
  "double_displacement", [{ type: "precipitation", colorTo: "#F4D03F", description: "Yellow silver phosphate deposits in calcified tissue regions" }]);

add("clinic-068-von-kossa-photochemical-silver-reduction", "Photochemical reduction of silver phosphate to black metallic silver deposits",
  ["ag3po4", "water"], ["ag", "h3po4", "o2"],
  180, "Bright light exposure photoreduces silver phosphate into permanent jet-black microscopic metallic silver grains marking calcification.",
  "redox_other", [{ type: "color_change", colorFrom: "#F4D03F", colorTo: "#17202A", description: "Yellow deposits turn completely jet black under UV/bright light" }]);

add("clinic-069-alizarin-red-s-calcium-lake", "Alizarin Red S histochemical chelation of calcium in osteoid mineralization",
  ["alizarin", "cacl2"], ["c14h6cao4", "hcl"],
  -42, "Bidentate coordination of calcium ions forming a bright birefringence-positive red calcium-alizarin chelate lake in bone biopsies.",
  "double_displacement", [{ type: "precipitation", colorTo: "#C0392B", description: "Intense brilliant scarlet-red calcium coordination lake precipitates" }]);

add("clinic-070-gram-stain-crystal-violet-iodine", "Gram stain mordant complexation of crystal violet by triiodide",
  ["c25h30cln3", "ki3"], ["c25h30in3", "kcl", "i2"],
  -35, "Formation of large water-insoluble crystal violet-iodine (CV-I) precipitate trapped within thick peptidoglycan walls of Gram-positive bacteria.",
  "double_displacement", [{ type: "precipitation", colorTo: "#4A235A", description: "Deep blue-violet crystalline CV-I mordant complex forms" }]);

add("clinic-071-resorcinol-seliwanoff-red-condensation", "Seliwanoff resorcinol condensation with HMF forming cherry-red chromophore",
  ["hmf", "resorcinol"], ["c12h10o4", "water"],
  -92, "Electrophilic condensation of furan aldehyde with phenolic resorcinol forming xanthene cherry-red pigment diagnostic for fructose.",
  "synthesis", [{ type: "color_change", colorFrom: "#FFFFFF", colorTo: "#922B21", description: "Colorless solution develops vivid cherry-red color within 60 seconds" }]);

add("clinic-072-copper-glycine-chelate-formation", "Copper(II) bis-glycinate deep blue coordination complex in biuret protein modeling",
  ["cuoh2", "glycine"], ["c4h8cun2o4", "water"],
  -84, "Coordination of cupric ions by alpha-amino acid carboxyl and amine donors yielding deep blue water-soluble complex.",
  "synthesis", [{ type: "color_change", colorFrom: "#3498DB", colorTo: "#1B4F72", description: "Light blue cupric hydroxide dissolves into intense deep blue solution" }]);

add("clinic-073-magnesium-carbonate-antacid-neutralization", "Magnesium carbonate antacid (Rennie) reaction with weak acetic acid",
  ["mgco3", "ch3cooh"], ["ch3coo-2-mg", "co2", "water"],
  -85, "Rapid neutralization of excess gastric acid releasing soluble magnesium chloride and effervescent carbon dioxide.",
  "acid_base", [{ type: "gas_evolution", description: "Vigorous bubbling effervescence of carbon dioxide" }]);

add("clinic-074-carbonic-acid-dissociation-blood-gas", "Carbonic acid rapid dehydration to carbon dioxide in pulmonary capillaries",
  ["h2co3"], ["co2", "water"],
  15, "Carbonic anhydrase (CA) catalyzed dehydration converting hydrogen carbonate into expired carbon dioxide gas maintaining blood pH 7.40.",
  "decomposition", [{ type: "gas_evolution", description: "Evolution of dissolved carbon dioxide into alveolar gas phase" }]);

add("clinic-075-ascorbic-acid-iodate-reduction", "Ascorbic acid reduction of potassium iodate in diagnostic vitamin C titration",
  ["c6h8o6_ascorbic", "kio3"], ["c6h6o6_dehydroascorbic", "ki", "water"],
  -92, "Two-electron enediol oxidation of Vitamin C reducing green cupric chloride to white cuprous chloride precipitate.",
  "redox_other", [{ type: "precipitation", colorTo: "#EAEDED", description: "Green cupric solution deposits white cuprous chloride precipitate" }]);

add("clinic-076-copper-carbonate-benedict-reagent", "Precipitation of copper carbonate by potassium carbonate in Benedict reagent synthesis",
  ["cuso4", "k2co3"], ["cuco3", "k2so4"],
  -24, "Metathesis reaction yielding cupric carbonate intermediate stabilized by trisodium citrate in glucose test solutions.",
  "double_displacement", [{ type: "precipitation", colorTo: "#1E8449", description: "Dense green-blue copper carbonate precipitate forms" }]);

add("clinic-077-lugol-iodine-glycogen-staining", "Lugol iodine histochemical staining of vaginal epithelial glycogen",
  ["i2", "ki"], ["ki3"],
  -18, "Schiller diagnostic test for cervical dysplasia: normal glycogen-rich squamous epithelium stains mahogany brown, abnormal areas remain unstained.",
  "synthesis", [{ type: "color_change", colorFrom: "#5D6D7E", colorTo: "#7E5109", description: "Triiodide complexation produces rich mahogany brown solution" }]);

add("clinic-078-sulfuric-acid-ammonium-buffer", "Ammonium bicarbonate buffering of systemic sulfuric metabolic acidemia",
  ["h2so4", "nh4hco3"], ["nh4-2-so4", "co2", "water"],
  -96, "Renal and respiratory compensation converting strong inorganic metabolic acid into neutral sodium sulfate and exhaled CO2.",
  "acid_base", [{ type: "gas_evolution", description: "Effervescence of carbon dioxide gas" }]);

add("clinic-079-schiff-reagent-sulfur-dioxide-bleaching", "Sulfur dioxide bleaching of basic fuchsin forming colorless Schiff reagent",
  ["so2", "water"], ["h2so3"],
  -24, "Preparation of diagnostic Schiff reagent for Periodic Acid-Schiff (PAS) detection of basement membranes and glycogen.",
  "synthesis", [{ type: "color_change", colorFrom: "#922B21", colorTo: "#EAEDED", description: "Intense magenta basic fuchsin bleaches completely colorless" }]);

add("clinic-080-periodic-acid-glycol-cleavage", "Periodic acid Malaprade glycol cleavage model in PAS histochemistry",
  ["c2h6o2", "hio4"], ["hcho", "hio3", "water"],
  -185, "Oxidation of 1,2-cis diols of glycogen and mucins into dialdehydes capable of recolorizing leuco-fuchsin in tissue sections.",
  "redox_other", [{ type: "temperature_increase", description: "Exothermic carbon-carbon glycol bond scission" }]);

// 081 - 100: Immunoassays & Protein Chemistry
add("clinic-081-ferric-salicylate-trinder-complex", "Ferric chloride coordination with salicylic acid in acute aspirin toxicity",
  ["fecl3", "c7h6o3"], ["c7h5cl2feo3", "hcl"],
  -45, "Emergency bedside screening forming a heat-stable purple-violet iron-salicylate chelate in patient urine.",
  "double_displacement", [{ type: "color_change", colorFrom: "#F4D03F", colorTo: "#5B2C6F", description: "Pale yellow ferric chloride turns intense deep violet-purple" }]);

add("clinic-082-ferric-acetoacetate-gerhardt-complex", "Gerhardt ferric chloride test for urinary acetoacetic acid in diabetic ketoacidosis",
  ["fecl3", "c4h6o3_acetoacetic"], ["c4h5cl2feo3", "hcl"],
  -48, "Enolic coordination yielding rich Bordeaux wine-red complex which decomposes and bleaches upon boiling (unlike salicylate).",
  "double_displacement", [{ type: "color_change", colorFrom: "#F4D03F", colorTo: "#78281F", description: "Development of rich Bordeaux wine-red color" }]);

add("clinic-083-sodium-fluoride-glycolysis-inhibition", "Sodium fluoride precipitation of magnesium cofactor inhibiting enolase",
  ["naf", "mgcl2"], ["mgf2", "nacl"],
  -22, "Gray-top blood collection tube additive precipitating magnesium fluorophosphate to arrest in vitro erythrocyte glycolysis.",
  "double_displacement", [{ type: "precipitation", colorTo: "#FFFFFF", description: "Precipitation of insoluble white magnesium fluoride" }]);

add("clinic-084-potassium-oxalate-calcium-bromide", "Potassium oxalate precipitation of calcium bromide in diagnostic anticoagulation",
  ["cabr2", "k2c2o4"], ["cac2o4", "kbr"],
  -34, "Companion anticoagulant in fluoride tubes sequestering free ionized calcium to completely prevent plasma coagulation.",
  "double_displacement", [{ type: "precipitation", colorTo: "#FFFFFF", description: "Immediate precipitation of insoluble white calcium oxalate" }]);

add("clinic-085-tyrosine-nitration-xanthoproteic-test", "Heller xanthoproteic diagnostic test nitration of aromatic protein tyrosine",
  ["tyrosine", "hno3"], ["c9h10n2o5", "water"],
  -76, "Nitration of phenolic ring producing bright yellow 3-nitrotyrosine which turns deep orange upon alkalinization with ammonia.",
  "synthesis", [{ type: "color_change", colorFrom: "#FFFFFF", colorTo: "#F4D03F", description: "Clear protein solution turns vibrant yellow xanthoproteic chromophore" }]);

add("clinic-086-prussian-blue-cesium-trapping", "Insoluble Prussian blue exchange reaction trapping radioactive cesium-137",
  ["fe4_fecn6_3", "cscl"], ["csfe_fecn6", "fecl3"],
  -42, "Oral Radiogardase ion-exchange trapping cesium-137 and thallium within crystal lattice cages for safe fecal clearance.",
  "double_displacement", [{ type: "color_change", colorFrom: "#1B4F72", colorTo: "#1B4F72", description: "Retention of deep blue pigment with trapped radiocations" }]);

add("clinic-087-sodium-hypochlorite-spill-decontamination", "Sodium hypochlorite decontamination of infectious clinical blood spills",
  ["naocl", "hcl"], ["nacl", "cl2", "water"],
  -68, "Emergency biocidal disinfection of bloodborne pathogens (HIV, Hepatitis B) generating potent oxidative germicidal chlorine.",
  "redox_other", [{ type: "gas_evolution", description: "Evolution of pale green germicidal chlorine gas" }]);

add("clinic-088-ferrozine-iron-assay-reduction", "Hydroxylamine reduction of serum ferric iron to ferrous state for ferrozine assay",
  ["fecl3", "nh2oh_hcl"], ["fecl2", "n2", "hcl", "water"],
  -118, "Reduction of transferrin-bound ferric iron prior to chromogenic chelation with ferrozine (absorbance at 562 nm).",
  "redox_other", [{ type: "gas_evolution", description: "Evolution of nitrogen gas during quantitative iron reduction" }]);

add("clinic-089-cresolphthalein-complexone-calcium", "o-Cresolphthalein complexone purple chelation in automated serum calcium assays",
  ["cpc_dye", "cacl2"], ["cpc_ca_complex", "hcl"],
  -58, "Alkaline complexation of serum calcium at pH 10-12 forming intense purple-red chromophore measured spectrophotometrically at 575 nm.",
  "double_displacement", [{ type: "color_change", colorFrom: "#FADBD8", colorTo: "#6C3483", description: "Colorless reagent develops intense magenta-purple calcium coordination complex" }]);

add("clinic-090-sulfanilamide-diazotization-nitrite", "Sulfanilamide diazotization by nitrous acid in Griess UTI bacteriuria screening",
  ["sulfanilamide", "hno2", "hcl"], ["c6h6cln3o2s", "water"],
  -64, "First stage of Griess urinary dipstick reaction converting bacterial nitrate reductase product into diazonium cation.",
  "synthesis", [{ type: "temperature_increase", description: "Exothermic diazotization at acidic pH" }]);

add("clinic-091-potassium-dichromate-formalin-fixative", "Orth fixative chromate mordanting of adrenal chromaffin granules",
  ["k2cr2o7", "naoh"], ["k2cro4", "na2cro4", "water"],
  -38, "Fixation of catecholamines in pheochromocytoma biopsy specimens causing brown oxidation of epinephrine granules.",
  "acid_base", [{ type: "color_change", colorFrom: "#E67E22", colorTo: "#F4D03F", description: "Orange dichromate shifts to bright yellow chromate in buffered fixative" }]);

add("clinic-092-coomassie-brilliant-blue-phosphoric-acid", "Bradford protein assay phosphoric acid reagent preparation",
  ["h3po4", "water"], ["h3po4_aq"],
  -15, "Acidic ethanol-phosphoric acid formulation maintaining Coomassie G-250 in doubly protonated red-brown cationic state (465 nm).",
  "synthesis", [{ type: "temperature_increase", description: "Exothermic acid dilution" }]);

add("clinic-093-bca-cupric-formaldehyde-reduction", "BCA protein assay reduction of copper(II) hydroxide to cuprous oxide by aldehyde",
  ["cuoh2", "hcho"], ["cu2o", "hcooh", "water"],
  -128, "Biuret-like reduction of Cu(II) to Cu(I) in alkaline solution by protein peptide bonds and reducing functional groups.",
  "redox_other", [{ type: "color_change", colorFrom: "#3498DB", colorTo: "#922B21", description: "Light blue cupric suspension reduces to brick-red cuprous oxide" }]);

add("clinic-094-hydrogen-peroxide-titanium-peroxo-complex", "Titanium oxysulfate photometric quantification of enzymatic hydrogen peroxide",
  ["tiso4", "h2o2"], ["tio2_so4", "water"],
  -98, "Reaction with titanium(IV) forming intensely yellow-orange pertitanic acid complex (410 nm) quantifying oxidase activity.",
  "synthesis", [{ type: "color_change", colorFrom: "#FFFFFF", colorTo: "#D35400", description: "Colorless solution yields vivid yellow-orange titanium peroxo complex" }]);

add("clinic-095-lugol-triiodide-thiosulfate-titration", "Lugol triiodide volumetric titration with sodium thiosulfate",
  ["ki3", "na2s2o3"], ["ki", "nai", "na2s4o6"],
  -180, "Volumetric determination of therapeutic antibiotic and vitamin levels using starch indicator at blue-to-colorless transition.",
  "redox_other", [{ type: "color_change", colorFrom: "#5D6D7E", colorTo: "#EAEDED", description: "Deep dark brown-blue iodine bleaches to completely water-clear solution" }]);

add("clinic-096-sodium-borohydride-disulfide-reduction", "Sodium borohydride chemical reduction of immunoglobulin interchain disulfides",
  ["nabh4", "water"], ["nabo2", "h2"],
  -240, "Mild chemical reduction of IgG hinge disulfide bonds preparing Fab and F(ab')2 antibody fragments for diagnostic immunoassays.",
  "redox_other", [{ type: "gas_evolution", description: "Effervescence of active reducing hydrogen gas" }]);

add("clinic-097-ferricyanide-nitrite-oxidation", "Potassium ferricyanide alkaline oxidation of sodium nitrite in Drabkin cycle",
  ["k3fe_cn6", "nano2", "koh"], ["k4fe_cn6", "nano3", "water"],
  -48, "Analytical electron transfer cycle measuring total hemoglobin oxidizing equivalents in clinical hemolysates.",
  "redox_other", [{ type: "color_change", colorFrom: "#F4D03F", colorTo: "#7E5109", description: "Yellow solution darkens as brown elemental iodine is released" }]);

add("clinic-098-barium-hydroxide-somogyi-deproteinization", "Somogyi deproteinization precipitation with zinc sulfate in blood glucose",
  ["ba-oh-2", "znso4"], ["baso4", "znoh2"],
  -118, "Preparation of protein-free blood filtrate: coprecipitation of barium sulfate and gelatinous zinc hydroxide entangling all serum proteins.",
  "double_displacement", [{ type: "precipitation", colorTo: "#FFFFFF", description: "Heavy gelatinous white precipitate clears leaving protein-free supernatant" }]);

add("clinic-099-trichloroacetic-acid-protein-precipitation", "Trichloroacetic acid (TCA) diagnostic precipitation of cerebrospinal fluid protein",
  ["c2hcl3o2", "naoh"], ["c2cl3nao2", "water"],
  -58, "Disruption of protein hydration shells causing instant quantitative denaturation and turbidimetric flocculation in meningitis CSF.",
  "acid_base", [{ type: "temperature_increase", description: "Exothermic neutralization" }]);

add("clinic-100-silver-lactate-argentaffin-stain", "Silver lactate reduction in histochemical Fontana-Masson melanin staining",
  ["c3h5ago3", "h2"], ["ag", "c3h6o3_lactic"],
  -75, "Melanin pigment granules directly reduce argentaffin silver salts to microscopic metallic silver particles confirming metastatic melanoma.",
  "redox_other", [{ type: "color_change", colorFrom: "#FFFFFF", colorTo: "#17202A", description: "Tissue section develops intense jet-black melanin granulations" }]);

console.log(`Domain 41 successfully constructed with ${reactions.length} reactions!`);

// Write domain41ClinicalDiagnosticsBiosensors.ts
const outputPath = path.resolve(__dirname, "domain41ClinicalDiagnosticsBiosensors.ts");
const code = `// Domain 41: Clinical Diagnostics, Biosensors & Medical Biochemistry (${reactions.length} reactions)
import type { ReactionDefinition } from "./types.js";

export const DOMAIN_41_REACTIONS: ReactionDefinition[] = ${JSON.stringify(reactions, null, 2)};
`;

fs.writeFileSync(outputPath, code, "utf8");
console.log(`✓ Wrote ${reactions.length} reactions to domain41ClinicalDiagnosticsBiosensors.ts`);
