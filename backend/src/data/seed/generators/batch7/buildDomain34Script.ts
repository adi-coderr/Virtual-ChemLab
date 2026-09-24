import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { allChemicalsMap, existingReactantSets, toBal } from "./generateBatch7.js";
import { balanceEquation } from "../../../../chemistry-engine/balancer.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface Def {
  id: string;
  name: string;
  reactants: string[];
  products: string[];
  enthalpy: number;
  desc: string;
  type?: string;
  effects?: any[];
  net?: string;
}

const list: Def[] = [];
const localKeys = new Set<string>();

function add(
  id: string,
  name: string,
  reactants: string[],
  products: string[],
  enthalpy: number,
  desc: string,
  type: string = "precipitation",
  effects: any[] = []
) {
  const k = [...reactants].sort().join("+");
  if (existingReactantSets.has(k)) {
    console.error(`COLLISION DB: ${id} (${k})`);
    return;
  }
  if (localKeys.has(k)) {
    console.error(`DUPLICATE LOCAL: ${id} (${k})`);
    return;
  }
  localKeys.add(k);

  for (const cid of [...reactants, ...products]) {
    if (!allChemicalsMap.has(cid)) {
      console.error(`UNKNOWN CID in ${id}: ${cid}`);
      return;
    }
  }

  let bal;
  try {
    bal = balanceEquation(reactants.map(toBal), products.map(toBal));
  } catch (err: any) {
    console.error(`BALANCE ERR in ${id}: ${err.message}`);
    return;
  }
  list.push({ id, name, reactants, products, enthalpy, desc, type, effects, net: bal.balancedEquationText });
}

// =========================================================================
// Section 1: Breakpoint Chlorination & Water Disinfection (10)
// =========================================================================
add("env-disinfect-hypochlorite-soda-ash", "Generation of sodium hypochlorite disinfectant from calcium hypochlorite and soda ash",
  ["ca-ocl-2", "na2co3"], ["caco3", "naocl"], -95.0,
  "Chemical metathesis precipitating chalk and yielding clear sodium hypochlorite bleach.", "precipitation",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "White calcium carbonate precipitate forms leaving clear bleach solution" }]);

add("env-disinfect-bleaching-powder", "Manufacture of bleaching powder disinfectant from chlorine and slaked lime",
  ["cl2", "caoh2"], ["ca-ocl-2", "cacl2", "water"], -125.0,
  "Reaction producing municipal water disinfectant powder.", "redox_other");

add("env-disinfect-monochloramine", "Breakpoint chlorination: synthesis of monochloramine from ammonia and hypochlorite",
  ["ammonia", "naocl"], ["nh2cl", "naoh"], -42.0,
  "Initial stage of municipal chloramination for secondary disinfectant residual.", "substitution");

add("env-disinfect-calcium-hypo-acid", "Acidification of calcium hypochlorite liberating chlorine gas disinfectant",
  ["ca-ocl-2", "hcl"], ["cacl2", "cl2", "water"], -85.0,
  "Acid-promoted rapid chlorine release.", "gas_evolution",
  [{ type: "gas_evolution", gasColor: "#D4EFDF", description: "Pungent greenish-yellow chlorine gas evolves vigorously" }]);

add("env-disinfect-clo2-acid-chlorite", "Generation of chlorine dioxide from sodium chlorite and hydrochloric acid",
  ["naclo2", "hcl"], ["clo2", "nacl", "water"], -82.0,
  "Acid-activated generator producing yellow-green ClO2 disinfectant solution.", "redox_other",
  [{ type: "color_change", colorFrom: "#FFFFFF", colorTo: "#F4D03F", description: "Colorless solution shifts to intensely yellow-green ClO2" }]);

add("env-disinfect-clo2-fe2-oxidation", "Chlorine dioxide oxidation of soluble iron(II) to ferric chloride",
  ["clo2", "fecl2", "hcl"], ["fecl3", "water"], -160.0,
  "Removal of dissolved well-water iron via selective chlorine dioxide oxidation.", "redox_other");

add("env-disinfect-hypochlorite-hydrogen-peroxide", "Reaction of hypochlorite disinfectant with hydrogen peroxide evolving oxygen",
  ["naocl", "h2o2"], ["nacl", "o2", "water"], -150.0,
  "Quenching residual active chlorine with oxygen effervescence.", "gas_evolution",
  [{ type: "gas_evolution", gasColor: "#FFFFFF", description: "Vigorous fizzing with pure oxygen gas release" }]);

add("env-disinfect-hypochlorite-nitric-acid", "Acidification of sodium hypochlorite by nitric acid",
  ["naocl", "hno3"], ["nano3", "cl2", "o2", "water"], -95.0,
  "Acid decomposition releasing chlorine and oxygen gas.", "gas_evolution");

add("env-disinfect-ca-hypo-nitric", "Nitric acid acidification of calcium hypochlorite",
  ["ca-ocl-2", "hno3"], ["ca-no3-2", "cl2", "o2", "water"], -110.0,
  "Acid decomposition generating chlorine oxidizer.", "gas_evolution");

add("env-disinfect-hypochlorite-sulfuric", "Sulfuric acid acidification of sodium hypochlorite",
  ["naocl", "h2so4"], ["na2so4", "cl2", "o2", "water"], -105.0,
  "Acidification liberating elemental chlorine gas.", "gas_evolution");

// =========================================================================
// Section 2: Cyanide Detoxification & Alkaline Chlorination (10)
// =========================================================================
add("env-cyanide-alkaline-naocl", "Alkaline chlorination: oxidation of toxic sodium cyanide to sodium cyanate",
  ["nacn", "naocl"], ["nanco", "nacl"], -230.0,
  "Primary detoxification stage converting lethal cyanide into 1000-fold less toxic cyanate.", "redox_other");

add("env-cyanide-alkaline-kcn-naocl", "Oxidation of potassium cyanide by sodium hypochlorite to potassium cyanate",
  ["kcn", "naocl"], ["knco", "nacl"], -228.0,
  "Alkaline chlorination in metal plating wastewater treatment.", "redox_other");

add("env-cyanide-permanganate-oxidation", "Permanganate oxidation of sodium cyanide to sodium cyanate",
  ["nacn", "kmno4", "water"], ["nanco", "mno2", "koh"], -265.0,
  "Permanganate oxidation destroying free cyanides with manganese dioxide precipitation.", "redox_other",
  [{ type: "precipitation", colorTo: "#111111", description: "Dark brown-black manganese dioxide floc forms" }]);

add("env-cyanide-k-permanganate-oxidation", "Potassium permanganate oxidation of potassium cyanide",
  ["kcn", "kmno4", "water"], ["knco", "mno2", "koh"], -262.0,
  "Alkaline permanganate destruction of electroplating cyanide bath waste.", "redox_other");

add("env-cyanide-naocl-excess-mineralization", "Exhaustive alkaline hypochlorite mineralization of sodium cyanide to nitrogen",
  ["nacn", "naocl", "water"], ["nahco3", "n2", "nacl"], -620.0,
  "Two-stage total mineralization releasing inert nitrogen gas and sodium bicarbonate.", "gas_evolution",
  [{ type: "gas_evolution", gasColor: "#FFFFFF", description: "Steady nitrogen gas bubbles evolve" }]);

add("env-cyanide-kcn-naocl-excess-mineralization", "Total hypochlorite oxidation of potassium cyanide to nitrogen and KHCO3",
  ["kcn", "naocl", "water"], ["khco3", "n2", "nacl"], -615.0,
  "Exhaustive alkaline destruction of potassium cyanide.", "gas_evolution");

add("env-cyanide-persulfate-oxidation", "Sodium persulfate destruction of sodium cyanide",
  ["nacn", "na2s2o8", "naoh"], ["nanco", "na2so4", "water"], -340.0,
  "Persulfate advanced oxidation decomposing cyanide into cyanate and sulfate.", "redox_other");

add("env-cyanide-k-persulfate-oxidation", "Potassium persulfate oxidation of potassium cyanide",
  ["kcn", "k2s2o8", "koh"], ["knco", "k2so4", "water"], -338.0,
  "Persulfate radical oxidation of toxic cyanide.", "redox_other");

add("env-cyanate-destruction-persulfate", "Exhaustive persulfate oxidation of sodium cyanate to nitrogen and sulfate",
  ["nanco", "na2s2o8", "water"], ["nahco3", "na2so4", "h2so4", "n2"], -420.0,
  "Complete mineralization of cyanate intermediate to benign nitrogen gas.", "redox_other");

add("env-cyanate-destruction-k-persulfate", "Persulfate oxidation of potassium cyanate to nitrogen and potassium sulfate",
  ["knco", "k2s2o8", "water"], ["khco3", "k2so4", "h2so4", "n2"], -415.0,
  "Exhaustive decomposition of cyanate to nitrogen.", "redox_other");

// =========================================================================
// Section 3: Dechlorination & Reductive Quenching (10)
// =========================================================================
add("env-dechlor-metabisulfite-cl2", "Industrial dechlorination of chlorine with sodium metabisulfite",
  ["na2s2o5", "cl2", "water"], ["na2so4", "hcl", "h2so4"], -380.0,
  "Rapid chemical reduction protecting reverse osmosis membranes from chlorine oxidation.", "redox_other");

add("env-dechlor-k-metabisulfite-cl2", "Dechlorination of water with potassium metabisulfite",
  ["k2s2o5", "cl2", "water"], ["k2so4", "hcl", "h2so4"], -375.0,
  "Scavenging toxic chlorine before wastewater discharge.", "redox_other");

add("env-dechlor-metabisulfite-naocl", "Sodium metabisulfite quenching of residual sodium hypochlorite",
  ["na2s2o5", "naocl", "water"], ["na2so4", "nacl", "h2so4"], -410.0,
  "Effluent dechlorination ensuring zero toxic disinfectant discharge.", "redox_other");

add("env-dechlor-k-metabisulfite-naocl-reductive", "Potassium metabisulfite reduction of hypochlorite bleach",
  ["k2s2o5", "naocl", "water"], ["k2so4", "nacl", "h2so4"], -405.0,
  "Metabisulfite reductive scavenging.", "redox_other");

add("env-dechlor-sulfite-naocl", "Sodium sulfite dechlorination of hypochlorite residual",
  ["na2so3", "naocl"], ["na2so4", "nacl"], -365.0,
  "Stoichiometric reduction of active chlorine to harmless chloride.", "redox_other");

add("env-dechlor-sulfite-clo2", "Sodium sulfite reduction of toxic chlorine dioxide",
  ["na2so3", "clo2", "water"], ["na2so4", "hcl"], -430.0,
  "Chemical quenching of chlorine dioxide residuals in pulp mill wastewater.", "redox_other");

add("env-dechlor-metabisulfite-clo2", "Sodium metabisulfite reduction of chlorine dioxide",
  ["na2s2o5", "clo2", "water"], ["na2so4", "hcl", "h2so4"], -460.0,
  "Rapid reduction destroying yellow ClO2 gas.", "redox_other");

add("env-dechlor-metabisulfite-h2o2-quenching", "Sodium metabisulfite quenching of residual industrial hydrogen peroxide",
  ["na2s2o5", "h2o2"], ["na2so4", "h2so4", "water"], -395.0,
  "Peroxide destruction prior to biological wastewater treatment.", "redox_other");

add("env-dechlor-k-metabisulfite-h2o2-quenching", "Potassium metabisulfite quenching of hydrogen peroxide",
  ["k2s2o5", "h2o2"], ["k2so4", "h2so4", "water"], -390.0,
  "Reductive destruction of peroxide residues.", "redox_other");

add("env-dechlor-metabisulfite-ozone", "Sodium metabisulfite destruction of aqueous ozone off-gas",
  ["na2s2o5", "o3", "water"], ["na2so4", "h2so4"], -510.0,
  "Scrubbing toxic ozone gas in water treatment off-gas systems.", "redox_other");

// =========================================================================
// Section 4: Coagulation, Flocculation & Sludge Dewatering (10)
// =========================================================================
add("env-coag-k-alum-lime", "Potassium alum coagulation with slaked lime precipitating aluminum hydroxide",
  ["k-al-so4-2", "caoh2"], ["al-oh-3", "caso4", "k2so4"], -185.0,
  "Dual precipitation of gelatinous Al(OH)3 floc and calcium sulfate settling aids.", "precipitation",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Heavy gelatinous white floc of aluminum hydroxide precipitates" }]);

add("env-coag-nh4-alum-lime", "Ammonium alum coagulation with calcium hydroxide",
  ["nh4-al-so4-2", "caoh2"], ["al-oh-3", "caso4", "nh4-2-so4"], -180.0,
  "Coagulant destabilization clarifying colloidal organic wastewater turbidity.", "precipitation",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Dense gelatinous white floc of Al(OH)3 settles rapidly" }]);

add("env-coag-k-alum-bicarbonate", "Potassium alum sweep flocculation with sodium bicarbonate",
  ["k-al-so4-2", "nahco3"], ["al-oh-3", "k2so4", "na2so4", "co2"], -165.0,
  "Municipal alkalinity buffering: sweep flocculation with bicarbonate liberating CO2 gas.", "precipitation",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "White voluminous hydroxide floc forms with gentle effervescence" }]);

add("env-coag-nh4-alum-bicarbonate", "Ammonium alum sweep flocculation with sodium bicarbonate",
  ["nh4-al-so4-2", "nahco3"], ["al-oh-3", "nh4-2-so4", "na2so4", "co2"], -160.0,
  "Turbidity removal via sweep flocculation using sodium bicarbonate.", "precipitation",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "White hydroxide floc precipitates" }]);

add("env-coag-ferric-chloride-lime", "Ferric chloride coagulation with hydrated lime in sewage clarification",
  ["fecl3", "caoh2"], ["feoh3", "cacl2"], -165.0,
  "Coagulation forming dense reddish-brown ferric hydroxide flocs.", "precipitation",
  [{ type: "precipitation", colorTo: "#935116", description: "Voluminous reddish-brown gelatinous Fe(OH)3 flocs precipitate" }]);

add("env-coag-ferric-chloride-bicarbonate", "Ferric chloride hydrolysis with municipal bicarbonate alkalinity",
  ["fecl3", "nahco3"], ["feoh3", "nacl", "co2"], -145.0,
  "Natural alkalinity consumption during ferric chloride coagulation with CO2 gas release.", "gas_evolution",
  [{ type: "precipitation", colorTo: "#935116", description: "Red-brown ferric hydroxide floc precipitates with gentle effervescence" }]);

add("env-coag-ferrous-sulfate-lime", "Ferrous sulfate coagulation with calcium hydroxide",
  ["feso4", "caoh2"], ["feoh2", "caso4"], -95.0,
  "Lime-copperas coagulation producing green gelatinous ferrous hydroxide floc.", "precipitation",
  [{ type: "precipitation", colorTo: "#1E8449", description: "Dark green gelatinous Fe(OH)2 precipitate forms" }]);

add("env-coag-ferrous-aeration-oxidation", "Aerobic oxidation of ferrous hydroxide floc to stable ferric hydroxide",
  ["feoh2", "o2", "water"], ["feoh3"], -240.0,
  "Air-stripping basin oxidation converting green ferrous sludge to insoluble brown ferric rust.", "redox_other",
  [{ type: "color_change", colorFrom: "#1E8449", colorTo: "#935116", description: "Greenish Fe(OH)2 oxidizes to dense reddish-brown Fe(OH)3" }]);

add("env-coag-alum-carbonate", "Aluminum sulfate coagulation with sodium carbonate (soda ash)",
  ["al2-so4-3", "na2co3", "water"], ["al-oh-3", "na2so4", "co2"], -175.0,
  "Alkalinity replenishment during alum water treatment.", "precipitation",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "White gelatinous aluminum hydroxide floc forms with bubbling" }]);

add("env-coag-ferric-sulfate-lime", "Ferric sulfate coagulation with hydrated lime",
  ["fe2-so4-3", "caoh2"], ["feoh3", "caso4"], -210.0,
  "Industrial coagulant settling heavy metals and suspended silt.", "precipitation",
  [{ type: "precipitation", colorTo: "#935116", description: "Heavy reddish-brown ferric sludge settles quickly" }]);

// =========================================================================
// Section 5: Hexavalent Chromium Detoxification & Reduction (10)
// =========================================================================
add("env-cr6-reduction-formic-acid", "Formic acid reduction of toxic chromium(VI) in acidic wastewater",
  ["k2cr2o7", "hcooh", "h2so4"], ["cr2-so4-3", "co2", "k2so4", "water"], -540.0,
  "Organic acid reduction of hexavalent chromium converting orange Cr(VI) to green Cr(III).", "redox_other",
  [{ type: "color_change", colorFrom: "#E67E22", colorTo: "#1E8449", description: "Orange solution shifts to deep green Cr(III)" }]);

add("env-cr6-reduction-k-metabisulfite", "Potassium metabisulfite reduction of hexavalent chromium",
  ["k2cr2o7", "k2s2o5", "h2so4"], ["cr2-so4-3", "k2so4", "water"], -635.0,
  "Reductive detoxification of electroplating rinse waters.", "redox_other",
  [{ type: "color_change", colorFrom: "#E67E22", colorTo: "#1E8449", description: "Brilliant orange shifts to deep green Cr(III)" }]);

add("env-cr6-reduction-glycerol", "Glycerol byproduct reduction of hexavalent chromium in acidic media",
  ["k2cr2o7", "c3h8o3", "h2so4"], ["cr2-so4-3", "co2", "k2so4", "water"], -1120.0,
  "Sustainable utilization of crude biodiesel glycerol as a Cr(VI) reducing agent.", "redox_other",
  [{ type: "color_change", colorFrom: "#E67E22", colorTo: "#1E8449", description: "Orange dichromate reduces to emerald green Cr(III)" }]);

add("env-cr6-reduction-thiosulfate", "Sodium thiosulfate reduction of hexavalent chromium in acidic effluent",
  ["k2cr2o7", "na2s2o3", "h2so4"], ["cr2-so4-3", "na2so4", "k2so4", "water"], -680.0,
  "Reductive destruction of residual dichromate oxidizer.", "redox_other",
  [{ type: "color_change", colorFrom: "#E67E22", colorTo: "#1E8449", description: "Orange Cr(VI) turns deep emerald green Cr(III)" }]);

add("env-cr3-crcl3-lime-ppt", "Lime precipitation of chromium(III) chloride as chromium hydroxide",
  ["crcl3", "caoh2"], ["cr-oh-3", "cacl2"], -145.0,
  "Neutralization isolating green Cr(OH)3 sludge from chrome tanning wastewater.", "precipitation",
  [{ type: "precipitation", colorTo: "#1E8449", description: "Dense green floc of Cr(OH)3 precipitates" }]);

add("env-cr3-precipitation-soda-ash", "Sodium carbonate neutralization and precipitation of chromium(III)",
  ["cr2-so4-3", "na2co3", "water"], ["cr-oh-3", "na2so4", "co2"], -165.0,
  "Carbonate precipitation buffering pH with carbon dioxide release.", "precipitation",
  [{ type: "precipitation", colorTo: "#1E8449", description: "Green Cr(OH)3 settles with gentle effervescence" }]);

add("env-cr3-precipitation-ammonia", "Ammoniacal precipitation of chromium(III) hydroxide",
  ["cr2-so4-3", "ammonia", "water"], ["cr-oh-3", "nh4-2-so4"], -170.0,
  "Ammonium hydroxide neutralization recovering valuable chromium.", "precipitation",
  [{ type: "precipitation", colorTo: "#1E8449", description: "Grey-green precipitate of Cr(OH)3 forms" }]);

add("env-cr3-precipitation-magnesia", "Magnesium oxide precipitation of chromium(III) hydroxide",
  ["cr2-so4-3", "mgo", "water"], ["cr-oh-3", "mgso4"], -160.0,
  "Controlled slow alkali release minimizing hydroxide redissoiution.", "precipitation",
  [{ type: "precipitation", colorTo: "#1E8449", description: "Dense green chromium hydroxide sludge precipitates" }]);

add("env-cr3-crcl3-carbonate-ppt", "Soda ash precipitation of chromium(III) chloride",
  ["crcl3", "na2co3", "water"], ["cr-oh-3", "nacl", "co2"], -155.0,
  "Carbonate neutralization producing green hydroxide floc with bubbling.", "precipitation");

add("env-cr3-crcl3-ammonia-ppt", "Ammonia precipitation of chromium(III) chloride",
  ["crcl3", "ammonia", "water"], ["cr-oh-3", "ammonium-chloride"], -148.0,
  "Ammonia recovery of chromium as hydroxide.", "precipitation");

// =========================================================================
// Section 6: Heavy Metal Carbonates & Sulfides (10)
// =========================================================================
add("env-metal-lead-carbonate-ppt", "Sodium carbonate precipitation of lead(II) chloride to cerussite",
  ["pbcl2", "na2co3"], ["pbco3", "nacl"], -95.0,
  "Removal of soluble lead as insoluble white lead carbonate.", "precipitation",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Heavy white precipitate of lead(II) carbonate forms" }]);

add("env-metal-cadmium-carbonate-ppt", "Sodium carbonate precipitation of cadmium(II) chloride to otavite",
  ["cdcl2", "na2co3"], ["cdco3", "nacl"], -98.0,
  "Alkaline carbonate insolubilization of toxic cadmium.", "precipitation",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Dense white precipitate of cadmium carbonate forms" }]);

add("env-metal-cadmium-sulfate-sulfide", "Sodium sulfide precipitation of cadmium sulfate to yellow cadmium sulfide",
  ["cdso4", "na2s"], ["cds", "na2so4"], -148.0,
  "Quantitative sulfide precipitation of cadmium from smelting wash liquors.", "precipitation",
  [{ type: "precipitation", colorTo: "#F4D03F", description: "Brilliant yellow cadmium sulfide precipitate forms" }]);

add("env-metal-copper-bicarbonate-ppt", "Sodium bicarbonate precipitation of copper(II) chloride",
  ["cucl2", "nahco3"], ["cuco3", "nacl", "co2", "water"], -85.0,
  "Effervescent bicarbonate precipitation of turquoise copper carbonate.", "precipitation",
  [{ type: "precipitation", colorTo: "#17A589", description: "Pale greenish-blue copper(II) carbonate precipitates with fizzing" }]);

add("env-metal-nickel-bicarbonate-ppt", "Sodium bicarbonate precipitation of nickel(II) chloride",
  ["nicl2", "nahco3"], ["nico3", "nacl", "co2", "water"], -88.0,
  "Gentle carbonate neutralization precipitating pale green nickel carbonate.", "precipitation",
  [{ type: "precipitation", colorTo: "#A9DFBF", description: "Light green precipitate of nickel carbonate forms" }]);

add("env-metal-zinc-bicarbonate-ppt", "Sodium bicarbonate precipitation of zinc(II) chloride",
  ["zncl2", "nahco3"], ["znco3", "nacl", "co2", "water"], -92.0,
  "Carbonate precipitation forming smithsonite precursor with CO2 evolution.", "precipitation",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Dense white precipitate of zinc carbonate settles" }]);

add("env-metal-lead-bicarbonate-ppt", "Sodium bicarbonate precipitation of lead(II) chloride",
  ["pbcl2", "nahco3"], ["pbco3", "nacl", "co2", "water"], -82.0,
  "Bicarbonate buffering insolubilizing lead contaminants.", "precipitation",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "White precipitate of lead carbonate settles" }]);

add("env-metal-cadmium-bicarbonate-ppt", "Sodium bicarbonate precipitation of cadmium(II) chloride",
  ["cdcl2", "nahco3"], ["cdco3", "nacl", "co2", "water"], -86.0,
  "Alkaline precipitation buffering toxic cadmium rinses.", "precipitation",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "White precipitate of cadmium carbonate forms" }]);

add("env-metal-iron2-bicarbonate-ppt", "Sodium bicarbonate precipitation of iron(II) chloride to siderite",
  ["fecl2", "nahco3"], ["feco3", "nacl", "co2", "water"], -78.0,
  "Insolubilization of ferrous iron as white/tan ferrous carbonate.", "precipitation",
  [{ type: "precipitation", colorTo: "#F5CBA7", description: "Off-white to pale tan precipitate of ferrous carbonate settles" }]);

add("env-metal-arsenic-h2s-ppt", "Hydrogen sulfide precipitation of arsenic trioxide to orpiment",
  ["as2o3", "h2s"], ["as2s3", "water"], -110.0,
  "Smelter acid-gas scrubbing precipitating bright yellow arsenic trisulfide.", "precipitation",
  [{ type: "precipitation", colorTo: "#F4D03F", description: "Vivid golden-yellow orpiment (As2S3) precipitate forms" }]);

// =========================================================================
// Section 7: Persulfate Advanced Oxidation Processes (SR-AOP) (10)
// =========================================================================
add("env-persulfate-thermal-na2s2o8-decomp", "Thermal activation of sodium persulfate generating oxygen and bisulfate",
  ["na2s2o8", "water"], ["na2so4", "h2so4", "o2"], 65.0,
  "In-situ chemical oxidation (ISCO) generating reactive sulfate radicals.", "decomposition");

add("env-persulfate-fe2-activation-sodium", "Ferrous iron activation of sodium persulfate producing ferric sulfate",
  ["na2s2o8", "feso4"], ["na2so4", "fe2-so4-3"], -145.0,
  "Homogeneous catalytic activation generating sulfate radicals for contaminant destruction.", "redox_other");

add("env-persulfate-phenol-mineralization-direct", "Sodium persulfate advanced oxidation mineralization of phenol",
  ["c6h6o", "na2s2o8", "water"], ["co2", "na2so4", "h2so4"], -2850.0,
  "Complete destructive mineralization of refractory phenolic pollutants.", "redox_other");

add("env-persulfate-benzene-mineralization-direct", "Sodium persulfate destruction of hazardous benzene in groundwater",
  ["c6h6", "na2s2o8", "water"], ["co2", "na2so4", "h2so4"], -3400.0,
  "In-situ soil remediation converting carcinogenic benzene into CO2.", "redox_other");

add("env-persulfate-toluene-mineralization-direct", "Sodium persulfate mineralization of toxic toluene (BTEX)",
  ["c7h8", "na2s2o8", "water"], ["co2", "na2so4", "h2so4"], -3950.0,
  "Persulfate remediation of petroleum hydrocarbon plumes.", "redox_other");

add("env-persulfate-manganese-oxidation", "Persulfate oxidation of soluble manganese(II) to insoluble manganese dioxide",
  ["mnso4", "na2s2o8", "water"], ["mno2", "na2so4", "h2so4"], -165.0,
  "Drinking water demanganization precipitating black pyrolusite.", "precipitation",
  [{ type: "precipitation", colorTo: "#111111", description: "Dark brown-black precipitate of MnO2 forms" }]);

add("env-persulfate-acetone-mineralization", "Sodium persulfate oxidative degradation of solvent acetone",
  ["ch3coch3", "na2s2o8", "water"], ["co2", "na2so4", "h2so4"], -1850.0,
  "Sulfate radical destruction of volatile oxygenated organic solvents.", "redox_other");

add("env-persulfate-glycerol-mineralization", "Sodium persulfate oxidation of industrial glycerol waste",
  ["c3h8o3", "na2s2o8", "water"], ["co2", "na2so4", "h2so4"], -2250.0,
  "Advanced chemical oxidation decomposing glycerol into CO2 and sulfuric acid.", "redox_other");

add("env-persulfate-ethanol-mineralization", "Persulfate oxidation of ethanol wash water effluent",
  ["c2h5oh", "na2s2o8", "water"], ["co2", "na2so4", "h2so4"], -1650.0,
  "Total oxidative destruction of alcohols.", "redox_other");

add("env-persulfate-k-phenol-mineralization", "Potassium persulfate advanced oxidation of phenol",
  ["c6h6o", "k2s2o8", "water"], ["co2", "k2so4", "h2so4"], -2840.0,
  "Potassium persulfate mineralization of phenolic wastewater.", "redox_other");

// =========================================================================
// Section 8: Fenton Chemistry & Classical AOP (10)
// =========================================================================
add("env-fenton-phenol-mineralization", "Fenton advanced oxidation mineralization of toxic phenol",
  ["c6h6o", "h2o2"], ["co2", "water"], -3200.0,
  "Total destructive oxidation of phenolic wastewater into carbon dioxide and water.", "redox_other");

add("env-peroxone-benzene-mineralization", "Peroxone (ozone + hydrogen peroxide) advanced oxidation of benzene",
  ["c6h6", "o3", "h2o2"], ["co2", "water"], -3850.0,
  "Synergistic ozone-peroxide generation of hydroxyl radicals mineralizing benzene.", "redox_other");

add("env-peroxone-phenol-mineralization", "Peroxone synergistic advanced oxidation of phenol",
  ["c6h6o", "o3", "h2o2"], ["co2", "water"], -3400.0,
  "Total destruction of refractory phenolic contaminants.", "redox_other");

add("env-peroxone-toluene-mineralization", "Peroxone oxidation of toxic toluene hydrocarbon",
  ["c7h8", "o3", "h2o2"], ["co2", "water"], -4350.0,
  "Hydroxyl radical mineralization of aromatic methyl side chain and ring.", "redox_other");

add("env-persulfate-ethylene-glycol-destruction", "Persulfate advanced oxidation of ethylene glycol wastewater",
  ["c2h6o2", "na2s2o8", "water"], ["co2", "na2so4", "h2so4"], -1450.0,
  "Persulfate radical degradation of glycol antifreeze effluent.", "redox_other");

add("env-fenton-glycerol-destruction", "Fenton advanced oxidation of glycerol waste streams",
  ["c3h8o3", "h2o2"], ["co2", "water"], -1850.0,
  "Catalytic peroxide oxidation mineralizing trihydric alcohol.", "redox_other");

add("env-fenton-acetone-destruction", "Fenton oxidation of waste acetone solvent",
  ["ch3coch3", "h2o2"], ["co2", "water"], -1650.0,
  "Radical cleavage and mineralization of volatile ketone solvent.", "redox_other");

add("env-fenton-isopropanol-destruction", "Fenton advanced oxidation of isopropanol in semiconductor effluent",
  ["c3h8o", "h2o2"], ["co2", "water"], -1950.0,
  "Total destruction of rubbing alcohol solvents.", "redox_other");

add("env-persulfate-ascorbic-destruction", "Persulfate degradation of residual ascorbic acid antioxidant",
  ["c6h8o6_ascorbic", "na2s2o8", "water"], ["co2", "na2so4", "h2so4"], -2450.0,
  "Persulfate advanced oxidation mineralizing antioxidant residues.", "redox_other");

add("env-fenton-ethanol-mineralization", "Fenton oxidation of industrial ethanol wash effluent",
  ["c2h5oh", "h2o2"], ["co2", "water"], -1280.0,
  "Total oxidative destruction of alcohols.", "redox_other");

// =========================================================================
// Section 9: Acid Mine Drainage (AMD) Neutralization & Passive Systems (10)
// =========================================================================
add("env-amd-aeration-feso4-oxidation", "Aerobic oxidation of ferrous iron in acid mine drainage",
  ["feso4", "o2", "h2so4"], ["fe2-so4-3", "water"], -142.0,
  "Pre-oxidation converting soluble Fe(II) into easily precipitable Fe(III).", "redox_other");

add("env-amd-ca-bicarbonate-neutralization", "Calcium bicarbonate passive neutralization of acid mine drainage",
  ["ca-hco3-2", "h2so4"], ["caso4", "co2", "water"], -92.0,
  "Alkaline groundwater buffering of acid streams.", "gas_evolution",
  [{ type: "gas_evolution", gasColor: "#FFFFFF", description: "Gentle bubbling with carbon dioxide release" }]);

add("env-amd-fecl3-limestone-ppt", "Limestone neutralization precipitating ferric hydroxide in AMD channels",
  ["fecl3", "caco3", "water"], ["feoh3", "cacl2", "co2"], -168.0,
  "Contact bed neutralization with red-brown rust precipitation and CO2 release.", "precipitation",
  [{ type: "precipitation", colorTo: "#935116", description: "Reddish-brown ferric hydroxide precipitate settles with bubbling" }]);

add("env-amd-alcl3-limestone-ppt", "Limestone precipitation of aluminum chloride from acid drainage",
  ["alcl3", "caco3", "water"], ["al-oh-3", "cacl2", "co2"], -158.0,
  "Aluminum removal via limestone rock drain contact.", "precipitation",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "White aluminum hydroxide floc settles with CO2 evolution" }]);

add("env-amd-ferric-limestone-ppt", "Limestone-promoted precipitation of ferric iron in AMD treatment ponds",
  ["fe2-so4-3", "caco3", "water"], ["feoh3", "caso4", "co2"], -195.0,
  "Acidity neutralization precipitating yellow-boy iron sludge.", "precipitation",
  [{ type: "precipitation", colorTo: "#935116", description: "Heavy brownish-yellow ferric precipitate ('yellow boy') settles" }]);

add("env-amd-aluminum-limestone-ppt", "Limestone precipitation of dissolved aluminum from acidic drainage",
  ["al2-so4-3", "caco3", "water"], ["al-oh-3", "caso4", "co2"], -175.0,
  "Removal of ecotoxic aluminum as gelatinous hydroxide floc.", "precipitation",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "White gelatinous aluminum floc precipitates" }]);

add("env-amd-ferrous-soda-ash-ppt", "Soda ash precipitation of dissolved ferrous iron to siderite",
  ["feso4", "na2co3"], ["feco3", "na2so4"], -88.0,
  "Insolubilization of soluble Fe(II) prior to aeration.", "precipitation",
  [{ type: "precipitation", colorTo: "#F5CBA7", description: "Pale tan precipitate of ferrous carbonate settles" }]);

add("env-amd-al-bicarbonate-ppt", "Sodium bicarbonate sweep precipitation of dissolved aluminum",
  ["al2-so4-3", "nahco3"], ["al-oh-3", "na2so4", "co2"], -168.0,
  "Safe pH elevation without excess causticity precipitating Al(OH)3.", "precipitation",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "White gelatinous aluminum floc forms with effervescence" }]);

add("env-amd-ammonia-neutralization-direct", "Ammonia gas injection neutralization of acid mine drainage",
  ["h2so4", "ammonia"], ["nh4-2-so4"], -135.0,
  "Rapid gaseous acid neutralization yielding agricultural ammonium sulfate fertilizer.", "acid_base_neutralization");

add("env-amd-ferrous-bicarbonate-reaction", "Reaction of ferrous sulfate with calcium bicarbonate in limestone drains",
  ["feso4", "ca-hco3-2"], ["feco3", "caso4", "co2", "water"], -95.0,
  "Passive coprecipitation of gypsum and siderite.", "precipitation");

// =========================================================================
// Section 10: Phosphate Recovery & Mineralization (10)
// =========================================================================
add("env-phos-h3po4-limestone-direct", "Limestone precipitation of phosphoric acid as tricalcium phosphate",
  ["caco3", "h3po4"], ["ca3po42", "co2", "water"], -118.0,
  "Phosphorus capture using cheap limestone packing beds.", "precipitation",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "White precipitate of calcium phosphate forms with effervescence" }]);

add("env-phos-alcl3-neutralization-ppt", "Aluminum chloride and caustic precipitation of orthophosphate",
  ["alcl3", "h3po4", "naoh"], ["alpo4", "nacl", "water"], -165.0,
  "Acid-phosphate effluent treatment isolating insoluble aluminum phosphate.", "precipitation",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "White precipitate of AlPO4 settles" }]);

add("env-phos-fecl3-neutralization-ppt", "Ferric chloride and sodium hydroxide precipitation of phosphate",
  ["fecl3", "h3po4", "naoh"], ["fepo4", "nacl", "water"], -172.0,
  "Coprecipitation of iron(III) phosphate.", "precipitation",
  [{ type: "precipitation", colorTo: "#FCF3CF", description: "Yellowish-white precipitate of FePO4 forms" }]);

add("env-phos-cacl2-neutralization-ppt", "Calcium chloride and caustic precipitation of phosphoric acid",
  ["cacl2", "h3po4", "naoh"], ["ca3po42", "nacl", "water"], -185.0,
  "Controlled precipitation of bone-ash hydroxyapatite precursor.", "precipitation",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Dense white precipitate of calcium phosphate settles" }]);

add("env-phos-mg-carbonate-reaction", "Magnesium carbonate precipitation of phosphoric acid to trimagnesium phosphate",
  ["mgco3", "h3po4"], ["mg3-po4-2", "co2", "water"], -122.0,
  "Slow-release phosphate fertilizer recovery from manure digester supernatants.", "precipitation",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "White crystalline precipitate of magnesium phosphate forms with bubbling" }]);

add("env-phos-calcium-hydroxide-ppt", "Hydrated lime precipitation of phosphate from sewage effluent",
  ["caoh2", "na3po4"], ["ca3po42", "naoh"], -150.0,
  "Alkaline lime precipitation of phosphorus.", "precipitation",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "White precipitate of calcium phosphate settles" }]);

add("env-fluoride-lime-ppt", "Hydrated lime precipitation of toxic fluoride from industrial rinses",
  ["naf", "caoh2"], ["caf2", "naoh"], -85.0,
  "Fluoride precipitation as insoluble fluorite mineral.", "precipitation",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Fine white crystalline precipitate of calcium fluoride forms" }]);

add("env-k-persulfate-benzene-mineralization", "Potassium persulfate advanced oxidation mineralization of benzene",
  ["c6h6", "k2s2o8", "water"], ["co2", "k2so4", "h2so4"], -3380.0,
  "Potassium persulfate in-situ chemical oxidation of benzene.", "redox_other");

add("env-persulfate-oxalic-acid-mineralization", "Sodium persulfate destruction of oxalic acid chelator",
  ["h2c2o4", "na2s2o8"], ["co2", "na2so4", "h2so4"], -450.0,
  "Mineralization of dicarboxylic acid chelating agent.", "redox_other");

add("env-fenton-formaldehyde-mineralization", "Fenton oxidation of toxic formaldehyde in industrial wastewaters",
  ["hcho", "h2o2"], ["co2", "water"], -480.0,
  "Advanced oxidation converting embalming and resin formaldehyde into water and carbon dioxide.", "redox_other");

console.log(`Domain 34 complete: ${list.length} reactions validated!`);

if (list.length === 100) {
  const code = `// Domain 34: Environmental Remediation & Wastewater Treatment (100 reactions)
export const DOMAIN_34_REACTIONS = ${JSON.stringify(list, null, 2)};
`;
  fs.writeFileSync(path.join(__dirname, "domain34EnvironmentalWastewater.ts"), code);
  console.log(`✓ Wrote 100 reactions to domain34EnvironmentalWastewater.ts`);
} else {
  console.error(`Expected 100 reactions, but got ${list.length}`);
}
