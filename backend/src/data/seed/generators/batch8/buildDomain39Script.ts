import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { parseFormula } from "../../../../chemistry-engine/formulaParser.js";
import { balanceEquation, type BalancerSpecies } from "../../../../chemistry-engine/balancer.js";
import { SEED_CHEMICALS, type SeedChemical } from "../../chemicals.js";
import { CHEMICALS_BATCH_5 } from "../../chemicalsBatch5.js";
import { CHEMICALS_BATCH_6 } from "../../chemicalsBatch6.js";
import { CHEMICALS_BATCH_7 } from "../../chemicalsBatch7.js";
import { RAW_BATCH_8_CHEMICALS } from "./chemicalDefinitionsBatch8.js";
import { getExistingKeys } from "./inspectCollisions.js";
import { DOMAIN_38_REACTIONS } from "./domain38TotalSynthesisNamedRxns.js";
import type { ReactionDefinition } from "./types.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const allChemicalsMap = new Map<string, SeedChemical>();
for (const c of SEED_CHEMICALS) allChemicalsMap.set(c.id, c);
for (const c of CHEMICALS_BATCH_5) allChemicalsMap.set(c.id, c);
for (const c of CHEMICALS_BATCH_6) allChemicalsMap.set(c.id, c);
for (const c of CHEMICALS_BATCH_7) allChemicalsMap.set(c.id, c);
for (const c of RAW_BATCH_8_CHEMICALS) allChemicalsMap.set(c.id, c);

const existingReactantSets = getExistingKeys();
for (const r of DOMAIN_38_REACTIONS) {
  existingReactantSets.add([...r.reactants].sort().join("+"));
}

const reactions: ReactionDefinition[] = [];
const seenKeys = new Set<string>();

function add(
  id: string,
  name: string,
  reactants: string[],
  products: string[],
  enthalpy: number,
  desc: string,
  type = "double_displacement",
  effects: any[] = [],
  net?: string
) {
  const rKey = [...reactants].sort().join("+");
  if (existingReactantSets.has(rKey)) {
    throw new Error(`Collision with existing reaction set: ${rKey} in ${id}`);
  }
  if (seenKeys.has(rKey)) {
    throw new Error(`Duplicate reactant key within Domain 39: ${rKey} in ${id}`);
  }
  seenKeys.add(rKey);

  const missing: string[] = [];
  for (const cid of [...reactants, ...products]) {
    if (!allChemicalsMap.has(cid)) missing.push(cid);
  }
  if (missing.length > 0) {
    throw new Error(`[${id}] Missing chemical IDs: ${missing.join(", ")}`);
  }

  // Verify balance
  const bReactants: BalancerSpecies[] = reactants.map(cid => {
    const chem = allChemicalsMap.get(cid)!;
    const p = parseFormula(chem.formula);
    return { label: cid, formula: chem.formula, composition: p.composition, charge: chem.charge ?? 0 };
  });
  const bProducts: BalancerSpecies[] = products.map(cid => {
    const chem = allChemicalsMap.get(cid)!;
    const p = parseFormula(chem.formula);
    return { label: cid, formula: chem.formula, composition: p.composition, charge: chem.charge ?? 0 };
  });

  const res = balanceEquation(bReactants, bProducts);
  if (!res.balancedEquationText) {
    throw new Error(`Failed to balance [${id}]`);
  }

  reactions.push({
    id,
    name,
    reactants,
    products,
    enthalpyKjPerMol: enthalpy,
    description: desc,
    reactionType: type,
    observableEffects: effects,
    netIonicEquation: net
  });
}

// =========================================================================
// 1. Modern NPKS Fertilizers & Slow-Release Nutrients (20 reactions: 001-020)
// =========================================================================

add("agro-001-tsp-synthesis", "Triple superphosphate (TSP) fertilizer synthesis",
  ["ca3po42", "h3po4"],
  ["triple_superphosphate"],
  -120, "Acidulation of insoluble tricalcium phosphate with phosphoric acid yielding soluble monocalcium phosphate (TSP).",
  "synthesis",
  [{ type: "temperature_increase", description: "Exothermic slurry formation during acidulation" }]);

add("agro-002-map-synthesis", "Monoammonium phosphate (MAP) 11-52-0 fertilizer synthesis",
  ["ammonia", "h3po4"],
  ["monoammonium_phosphate"],
  -115, "Gas-liquid ammoniation of merchant-grade phosphoric acid crystallizing MAP granules.",
  "synthesis",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Rapid crystallization of white MAP needles" }]);

add("agro-003-dap-synthesis", "Diammonium phosphate (DAP) 18-46-0 fertilizer synthesis",
  ["monoammonium_phosphate", "ammonia"],
  ["diammonium_phosphate"],
  -68, "Second ammoniation stage of MAP producing alkaline diammonium phosphate.",
  "synthesis",
  [{ type: "temperature_increase", description: "Mild ammoniation exotherm" }]);

add("agro-004-dap-thermal-decomposition", "Thermal de-ammoniation of diammonium phosphate",
  ["diammonium_phosphate"],
  ["monoammonium_phosphate", "ammonia"],
  68, "Controlled thermal decomposition of DAP at elevated temperatures releasing ammonia.",
  "decomposition",
  [{ type: "gas_evolution", description: "Pungent ammonia gas evolved upon gentle heating" }]);

add("agro-005-map-condensation", "Thermal condensation of monoammonium phosphate to ammonium polyphosphate precursor",
  ["monoammonium_phosphate"],
  ["nh4po3_polyphosphate", "water"],
  45, "Dehydration of monoammonium phosphate into condensed ammonium metaphosphate.",
  "decomposition",
  [{ type: "phase_change", description: "Viscous condensed polyphosphate melt forms" }]);

add("agro-006-langbeinite-dissolution", "Congruent dissolution of langbeinite fertilizer",
  ["k2mg2_so4_3"],
  ["k2so4", "mgso4"],
  -15, "Dissolution of potassium magnesium sulfate mineral yielding soluble K and Mg macronutrients.",
  "decomposition",
  [{ type: "color_change", colorFrom: "#FADBD8", colorTo: "#FFFFFF", description: "Pale pink crystals dissolve into clear nutrient solution" }]);

add("agro-007-kno3-metathesis", "Industrial potassium nitrate 13-0-44 fertilizer production",
  ["kcl", "nh4no3"],
  ["kno3", "ammonium-chloride"],
  12, "Fractional crystallization metathesis producing chloride-free potassium nitrate fertilizer.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Prismatic KNO3 crystals precipitate upon chilling" }]);

add("agro-008-fluorapatite-defluorination", "Thermal defluorination of fluorapatite with silica and steam",
  ["ca5f_po4_3", "sio2", "water"],
  ["ca3po42", "casio3", "hf"],
  180, "Rotary kiln calcination of fluorapatite generating feed-grade defluorinated tricalcium phosphate.",
  "double_displacement",
  [{ type: "gas_evolution", description: "Evolution of gaseous HF into scrubbing tower" }]);

add("agro-009-cacn2-hydrolysis", "Hydrolysis of calcium cyanamide to hydrogen cyanamide and lime",
  ["cacn2", "water"],
  ["caoh2", "h2cn2"],
  -65, "First soil breakdown step of lime-nitrogen (Kalkstickstoff) fertilizer.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#E5E7E9", description: "Liming precipitation of calcium hydroxide" }]);

add("agro-010-h2cn2-hydration", "Soil catalytic hydration of hydrogen cyanamide to urea",
  ["h2cn2", "water"],
  ["urea"],
  -82, "Manganese dioxide-catalyzed soil hydration converting cyanamide to bioavailable urea.",
  "synthesis",
  [{ type: "color_change", colorFrom: "#FFFFFF", colorTo: "#FAFAFA", description: "Clear solution of urea forms in moist soil pore water" }]);

add("agro-011-urea-hydrochloride-formation", "Synthesis of non-fuming urea hydrochloride fertilizer descaler",
  ["urea", "hcl"],
  ["urea_hydrochloride"],
  -42, "Direct adduction of urea with anhydrous hydrogen chloride forming safe agricultural acid cleaner.",
  "synthesis",
  [{ type: "temperature_increase", description: "Exothermic formation of clear heavy liquid salt" }]);

add("agro-012-urea-phosphate-synthesis", "Urea phosphate 17-44-0 acidifying fertilizer synthesis",
  ["urea", "h3po4"],
  ["urea_phosphate"],
  -35, "Direct reaction between urea and technical-grade wet-process phosphoric acid.",
  "synthesis",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Monoclinic prismatic crystals of urea phosphate precipitate" }]);

add("agro-013-dcd-dimerization", "Dimerization of hydrogen cyanamide to dicyandiamide nitrification inhibitor",
  ["h2cn2"],
  ["dicyandiamide"],
  -75, "Alkaline dimerization producing DCD slow-release nitrification inhibitor.",
  "synthesis",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "White crystalline DCD separates from alkaline liquor" }]);

add("agro-014-ats-synthesis", "Ammonium thiosulfate liquid fertilizer synthesis",
  ["ammonia", "so2", "s", "water"],
  ["nh4_2s2o3"],
  -190, "Scrubbing of sulfur dioxide with aqueous ammonia and elemental sulfur slurry yielding clear liquid ATS fertilizer.",
  "synthesis",
  [{ type: "color_change", colorFrom: "#F4D03F", colorTo: "#FFFFFF", description: "Yellow sulfur dissolves as ammonium thiosulfate liquid forms" }]);

add("agro-015-znso4-dehydration", "Thermal dehydration of zinc sulfate heptahydrate to monohydrate",
  ["znso4_7h2o"],
  ["znso4_h2o", "water"],
  310, "Rotary kiln thermal dehydration producing granular 35.5% Zn micronutrient fertilizer.",
  "decomposition",
  [{ type: "phase_change", description: "Vitreous heptahydrate crystals turn into free-flowing opaque white granules" }]);

add("agro-016-mnso4-pyrolusite-reduction", "Sulfur dioxide reductive leaching of pyrolusite to manganese sulfate",
  ["mno2", "so2"],
  ["mnso4"],
  -240, "Direct hydrometallurgical reduction of black manganese dioxide ore to soluble manganese micronutrient.",
  "synthesis",
  [{ type: "color_change", colorFrom: "#1C2833", colorTo: "#FADBD8", description: "Black pyrolusite dissolves yielding pale pink manganese sulfate solution" }]);

add("agro-017-feso4-iron-dissolution", "Sulfuric acid dissolution of iron scrap for agricultural ferrous sulfate",
  ["fe", "h2so4", "water"],
  ["feso4_7h2o", "h2"],
  -88, "Dissolution of scrap steel in spent pickling acid yielding agricultural green vitriol crystals.",
  "redox_other",
  [{ type: "gas_evolution", description: "Hydrogen gas bubbling" },
   { type: "precipitation", colorTo: "#A2D9CE", description: "Pale sea-green vitriol crystals precipitate" }]);

add("agro-018-disodium-octaborate-synthesis", "Synthesis of highly soluble disodium octaborate tetrahydrate foliar fertilizer",
  ["na2b4o7", "h3bo3"],
  ["na2b8o13", "water"],
  -22, "Thermal blending of borax and boric acid producing ultra-soluble 20.8% B foliar spray.",
  "synthesis",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "White spray-dried amorphous octaborate powder" }]);

add("agro-019-cuso4-basic-carbonate", "Sulfuric acid neutralization of basic copper carbonate to soluble copper sulfate",
  ["cu2co3_oh_2", "h2so4"],
  ["cuso4", "co2", "water"],
  -135, "Acid digestion of basic copper carbonate producing sky-blue copper sulfate solution.",
  "double_displacement",
  [{ type: "gas_evolution", description: "Effervescence of carbon dioxide" },
   { type: "color_change", colorFrom: "#1ABC9C", colorTo: "#2980B9", description: "Intense blue solution forms" }]);

add("agro-020-struvite-precipitation", "Struvite crystal precipitation from agricultural wastewater",
  ["mgcl2", "monoammonium_phosphate", "naoh", "water"],
  ["mgnh4po4_6h2o", "nacl"],
  -45, "Recovery of phosphorus and nitrogen from swine manure effluent as crystalline struvite slow-release fertilizer.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Immediate precipitation of glistening white struvite crystals" }]);

// =========================================================================
// 2. Pesticide Synthesis: Organophosphates & Carbamates (20 reactions: 021-040)
// =========================================================================

add("agro-021-malathion-activation", "Cytochrome P450 oxidative bioactivation of malathion to malaoxon",
  ["malathion", "o2"],
  ["malaoxon", "so2"],
  -290, "Microsomal metabolic desulfuration converting phosphorothionate into potent acetylcholinesterase inhibitor malaoxon.",
  "redox_other",
  [{ type: "color_change", colorFrom: "#F9E79F", colorTo: "#FCF3CF", description: "Slight lightening of amber insecticide liquid" }]);

add("agro-022-malathion-esterase-cleavage", "Enzymatic carboxylesterase detoxification of malathion",
  ["malathion", "water"],
  ["malathion_monocarboxylic_acid", "c2h5oh"],
  -38, "Rapid mammalian carboxylesterase hydrolysis protecting mammals compared to susceptible insects.",
  "double_displacement",
  [{ type: "color_change", colorFrom: "#F9E79F", colorTo: "#FFFFFF", description: "Emulsion clears into aqueous metabolite solution" }]);

add("agro-023-chlorpyrifos-soil-hydrolysis", "Soil microbial phosphotriesterase hydrolysis of chlorpyrifos",
  ["chlorpyrifos", "water"],
  ["tcpy", "diethyl_thiophosphoric_acid"],
  -42, "Enzymatic cleavage producing persistent 3,5,6-trichloro-2-pyridinol soil biomarker.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "White solid TCPy metabolite forms" }]);

add("agro-024-carbaryl-synthesis", "Industrial synthesis of carbaryl (Sevin)",
  ["1_naphthol", "methyl_isocyanate"],
  ["carbaryl"],
  -92, "Direct addition of 1-naphthol to methyl isocyanate forming broad-spectrum carbamate insecticide.",
  "synthesis",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Exothermic crystallization of carbaryl flakes" }]);

add("agro-025-carbaryl-hydrolysis", "Aqueous diagnostic hydrolysis of carbaryl to 1-naphthol",
  ["carbaryl", "water"],
  ["1_naphthol", "methylamine", "co2"],
  -48, "Hydrolytic cleavage liberating 1-naphthol for spectrophotometric residue monitoring.",
  "decomposition",
  [{ type: "gas_evolution", description: "Slow carbon dioxide effervescence" }]);

add("agro-026-diazinon-activation", "Oxidative desulfuration of diazinon to diazoxon",
  ["diazinon", "o2"],
  ["diazoxon", "so2"],
  -285, "Bioactivation of diazinon by mixed-function oxidases to neurotoxic diazoxon.",
  "redox_other",
  [{ type: "color_change", colorFrom: "#F5B041", colorTo: "#FAD7A0", description: "Yellow-brown liquid oxidizes" }]);

add("agro-027-diazinon-hydrolysis", "Soil environmental hydrolysis of diazinon to pyrimidinol",
  ["diazinon", "water"],
  ["imp_pyrimidinol", "diethyl_thiophosphoric_acid"],
  -45, "Hydrolase cleavage of phosphate ester linkage in moist agricultural soils.",
  "double_displacement",
  [{ type: "color_change", colorFrom: "#F5B041", colorTo: "#FFFFFF", description: "Decolorization of soil pore solution" }]);

add("agro-028-dimethoate-oxidation", "Oxidative bioactivation of dimethoate to omethoate",
  ["dimethoate", "o2"],
  ["omethoate", "so2"],
  -280, "Metabolic sulfuration replacement generating active systemic oxon cholinesterase inhibitor.",
  "redox_other",
  [{ type: "color_change", colorFrom: "#EAECEE", colorTo: "#FCF3CF", description: "Formation of pale yellow omethoate" }]);

add("agro-029-parathion-activation", "Microsomal oxidation of ethyl parathion to paraoxon",
  ["parathion", "o2"],
  ["paraoxon", "so2"],
  -305, "Bioactivation of parathion yielding deadly active anticholinesterase agent paraoxon.",
  "redox_other",
  [{ type: "color_change", colorFrom: "#F4D03F", colorTo: "#F9E79F", description: "Deep yellow liquid shifts in spectral absorbance" }]);

add("agro-030-parathion-hydrolysis", "Phosphotriesterase detoxication hydrolysis of parathion",
  ["parathion", "water"],
  ["p_nitrophenol", "diethyl_thiophosphoric_acid"],
  -50, "Bacterial organophosphate hydrolase cleavage releasing chromogenic 4-nitrophenol.",
  "double_displacement",
  [{ type: "color_change", colorFrom: "#FFFFFF", colorTo: "#F4D03F", description: "Development of yellow 4-nitrophenol color" }]);

add("agro-031-aldicarb-oxidation-sulfoxide", "Microbial thioether oxidation of aldicarb to aldicarb sulfoxide",
  ["aldicarb", "h2o2"],
  ["aldicarb_sulfoxide", "water"],
  -145, "Enzymatic flavin monooxygenase oxidation of aldicarb in soil and groundwater.",
  "redox_other",
  [{ type: "temperature_increase", description: "Mild oxidation exotherm" }]);

add("agro-032-aldicarb-sulfoxide-oxidation", "Peroxide oxidation of aldicarb sulfoxide to aldicarb sulfone",
  ["aldicarb_sulfoxide", "h2o2"],
  ["aldicarb_sulfone", "water"],
  -138, "Secondary persistent oxidation step forming toxic aldicarb sulfone.",
  "redox_other",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Crystallization of white sulfone needles" }]);

add("agro-033-methomyl-oxidation", "Hydrogen peroxide oxidation of methomyl to methomyl sulfoxide",
  ["methomyl", "h2o2"],
  ["methomyl_sulfoxide", "water"],
  -135, "Soil microbial thioether oxidation of oxime carbamate methomyl.",
  "redox_other",
  [{ type: "temperature_increase", description: "Mild exothermic oxidation" }]);

add("agro-034-propoxur-synthesis", "Synthesis of propoxur from 2-isopropoxyphenol and methyl isocyanate",
  ["2_isopropoxyphenol", "methyl_isocyanate"],
  ["propoxur"],
  -88, "Addition of phenolic hydroxyl to isocyanate generating Baygon carbamate insecticide.",
  "synthesis",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Exothermic crystallization of pure propoxur" }]);

add("agro-035-propoxur-hydrolysis", "Degradative hydrolysis of propoxur",
  ["propoxur", "water"],
  ["2_isopropoxyphenol", "methylamine", "co2"],
  -46, "Hydrolytic cleavage of propoxur carbamate ester.",
  "decomposition",
  [{ type: "gas_evolution", description: "Evolution of carbon dioxide and trace methylamine" }]);

add("agro-036-thiram-synthesis", "Oxidative dimerization of sodium dimethyldithiocarbamate to thiram",
  ["sodium_dimethyldithiocarbamate", "h2o2", "h2so4"],
  ["thiram", "na2so4", "water"],
  -185, "Hydrogen peroxide coupling of dithiocarbamate forming tetramethylthiuram disulfide.",
  "redox_other",
  [{ type: "precipitation", colorTo: "#F9E79F", description: "Precipitation of pale yellow thiram powder" }]);

add("agro-037-captan-synthesis", "Synthesis of captan fungicide",
  ["tetrahydrophthalimide", "ccl4", "s"],
  ["captan", "hcl"],
  -95, "Perchloromethylmercaptan substitution on tetrahydrophthalimide.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Precipitation of crystalline captan" }]);

add("agro-038-chlorothalonil-synthesis", "Vapor-phase catalytic chlorination of isophthalonitrile to chlorothalonil",
  ["isophthalonitrile", "cl2"],
  ["chlorothalonil", "hcl"],
  -240, "Exhaustive chlorination of aromatic ring carbons over activated carbon catalyst.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Deposition of white chlorothalonil sublimate" }]);

add("agro-039-metalaxyl-synthesis", "Synthesis of metalaxyl acylalanine systemic fungicide",
  ["2_6_dimethylaniline", "c3h6o2_est", "ch3cocl"],
  ["metalaxyl", "hcl"],
  -118, "Acylation of methyl N-(2,6-dimethylphenyl)alaninate intermediate.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "White solid metalaxyl separates" }]);

add("agro-040-calcium-polysulfide-synthesis", "Digestion of sulfur in boiling slaked lime to lime sulfur",
  ["caoh2", "s"],
  ["calcium_tetrasulfide", "caso4", "water"],
  -160, "Reaction of elemental sulfur with slaked lime forming deep ruby-red calcium polysulfide dormant spray.",
  "redox_other",
  [{ type: "color_change", colorFrom: "#F4D03F", colorTo: "#922B21", description: "Bright yellow sulfur dissolves forming deep blood-red liquor" }]);

// =========================================================================
// 3. Herbicide Chemistry: Triazines, Phosphonates & Auxins (20 reactions: 041-060)
// =========================================================================

add("agro-041-atrazine-synthesis-step1", "First substitution of cyanuric chloride with ethylamine",
  ["cyanuric_chloride", "c2h5nh2"],
  ["simazine", "hcl"],
  -85, "Nucleophilic aromatic substitution of 1,3,5-triazine ring at 0 °C.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "White monoalkylamino chlorotriazine precipitates" }]);

add("agro-042-atrazine-synthesis-step2", "Second substitution of chlorotriazine with isopropylamine to atrazine",
  ["simazine", "isopropylamine"],
  ["atrazine", "c2h5nh2"],
  -62, "Selective displacement by secondary branched alkylamine at 50 °C yielding atrazine.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Atrazine crystallizes upon cooling" }]);

add("agro-043-atrazine-abiotic-hydrolysis", "Abiotic acid-catalyzed dechlorination of atrazine to hydroxyatrazine",
  ["atrazine", "water"],
  ["hydroxyatrazine", "hcl"],
  -35, "Soil mineral surface-catalyzed nucleophilic substitution of chlorine by hydroxyl.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Precipitation of insoluble hydroxyatrazine metabolite" }]);

add("agro-044-atrazine-bacterial-deethylation", "Bacterial Cytochrome P450 N-dealkylation of atrazine to deethylatrazine",
  ["atrazine", "o2"],
  ["deethylatrazine", "ch3cho"],
  -220, "Rhodococcus oxidative N-deethylation yielding prominent groundwater biomarker DEA.",
  "redox_other",
  [{ type: "color_change", colorFrom: "#FFFFFF", colorTo: "#FAFAFA", description: "Pungent acetaldehyde scent detected in head gas" }]);

add("agro-045-glyphosate-synthesis-ida", "Formaldehyde-phosphite Mannich condensation producing glyphosate",
  ["glycine", "hcho", "h3po3"],
  ["glyphosate", "water"],
  -88, "Industrial Mannich-type phosphonomethylation of glycine forming glyphosate.",
  "synthesis",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "White zwitterionic glyphosate precipitates at isoelectric point pH 2.5" }]);

add("agro-046-glyphosate-ipa-salt", "Formulation of glyphosate isopropylamine salt liquid concentrate (Roundup)",
  ["glyphosate", "isopropylamine"],
  ["c3h8no5p_salt"],
  -45, "Neutralization of zwitterionic glyphosate with isopropylamine forming highly water-soluble surfactant formulation.",
  "synthesis",
  [{ type: "color_change", colorFrom: "#FFFFFF", colorTo: "#FCF3CF", description: "Clear amber aqueous concentrate forms" }]);

add("agro-047-glyphosate-microbial-cleavage", "Microbial C-N lyase degradation of glyphosate to AMPA",
  ["glyphosate", "o2"],
  ["ampa", "hcho", "co2"],
  -265, "Pseudomonas / Flavobacterium cleavage producing aminomethylphosphonic acid.",
  "redox_other",
  [{ type: "gas_evolution", description: "Metabolic carbon dioxide evolution" }]);

add("agro-048-ampa-mineralization", "Bacterial phosphatase mineralization of AMPA to phosphate",
  ["ampa", "water"],
  ["methylamine", "h3po4"],
  -42, "C-P bond lyase enzymatic cleavage releasing inorganic orthophosphate into soil.",
  "double_displacement",
  [{ type: "color_change", colorFrom: "#FFFFFF", colorTo: "#FAFAFA", description: "Inorganic phosphate released into soil solution" }]);

add("agro-049-2-4-d-synthesis", "Williamson ether synthesis of 2,4-D herbicide",
  ["2_4_dichlorophenol", "chloroacetic_acid", "naoh"],
  ["2_4_d", "nacl", "water"],
  -115, "Condensation of 2,4-dichlorophenol with chloroacetate in alkaline medium followed by acidification.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Heavy crystalline precipitation of 2,4-D upon acidification" }]);

add("agro-050-2-4-d-dma-salt", "Formulation of 2,4-D dimethylamine aqueous salt",
  ["2_4_d", "dimethylamine"],
  ["c10h13cl2no3_salt"],
  -52, "Exothermic amine salt formation producing water-soluble non-volatile post-emergence spray.",
  "synthesis",
  [{ type: "temperature_increase", description: "Exothermic neutralization into clear amber solution" }]);

add("agro-051-mcpa-synthesis", "Williamson etherification manufacturing MCPA selective auxin herbicide",
  ["4_chloro_2_methylphenol", "chloroacetic_acid", "naoh"],
  ["mcpa", "nacl", "water"],
  -112, "Coupling of 4-chloro-o-cresol with sodium chloroacetate.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Flakes of MCPA crystallize" }]);

add("agro-052-dicamba-etherification", "Williamson methylation of 3,6-dichlorosalicylic acid to dicamba",
  ["3_6_dichlorosalicylic_acid", "ch3cl", "naoh"],
  ["dicamba", "nacl", "water"],
  -105, "Selective phenolic O-methylation producing dicamba herbicide.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "White solid dicamba precipitates upon acid wash" }]);

add("agro-053-alachlor-hydrolysis", "Abiotic dechlorination hydrolysis of alachlor in soil",
  ["alachlor", "water"],
  ["hydroxy_alachlor", "hcl"],
  -38, "Soil water nucleophilic displacement of alpha-chloro substituent forming hydroxyalachlor.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "White solid hydroxyalachlor separates" }]);

add("agro-054-metolachlor-hydrolysis", "Abiotic dechlorination hydrolysis of metolachlor",
  ["metolachlor", "water"],
  ["hydroxy_metolachlor", "hcl"],
  -36, "Aqueous displacement of chloro group generating benign hydroxymetolachlor metabolite.",
  "double_displacement",
  [{ type: "color_change", colorFrom: "#F9E79F", colorTo: "#FFFFFF", description: "Decolorization of herbicide emulsion" }]);

add("agro-055-glufosinate-salt-synthesis", "Neutralization forming glufosinate-ammonium herbicide (Basta)",
  ["glufosinate", "ammonia"],
  ["glufosinate_ammonium"],
  -62, "Reaction of glufosinate amino acid phosphinate with ammonia.",
  "synthesis",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "White microcrystalline glufosinate-ammonium precipitates" }]);

add("agro-056-paraquat-quaternization", "Quaternization of 4,4'-bipyridine with chloromethane to paraquat",
  ["4_4_bipyridine", "ch3cl"],
  ["paraquat_dichloride"],
  -145, "Double Menshutkin nucleophilic substitution producing yellow methyl viologen dichloride.",
  "synthesis",
  [{ type: "precipitation", colorTo: "#F4D03F", description: "Bright yellow crystals of paraquat dichloride separate" }]);

add("agro-057-diquat-cyclization", "Quaternization of 2,2'-bipyridine with 1,2-dibromoethane to diquat",
  ["2_2_bipyridine", "c2h4br2"],
  ["diquat_dibromide"],
  -135, "Intramolecular ethylene-bridged bis-quaternization forming rigid diquat dibromide.",
  "synthesis",
  [{ type: "precipitation", colorTo: "#F5B041", description: "Yellow-orange diquat crystals precipitate" }]);

add("agro-058-paraquat-anion-metathesis", "Metathesis of paraquat dichloride with sodium iodide",
  ["paraquat_dichloride", "nai"],
  ["paraquat_diiodide", "nacl"],
  -18, "Halide exchange equilibrium forming deep orange paraquat diiodide salt.",
  "double_displacement",
  [{ type: "color_change", colorFrom: "#F4D03F", colorTo: "#D4AC0D", description: "Deeper orange-brown color of viologen iodide develops" }]);

add("agro-059-glyphosate-complexation-ca", "Hard-water calcium antagonism and inactivation of glyphosate",
  ["glyphosate", "cacl2"],
  ["c3h6canno5p_salt", "hcl"],
  -28, "Chelation of divalent Ca2+ in hard spray tank water deactivating glyphosate weed uptake.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Cloudy colloidal calcium glyphosate complex separates" }]);

add("agro-060-ams-hard-water-conditioning", "Ammonium sulfate spray-water conditioning protecting glyphosate",
  ["cacl2", "nh4-2-so4"],
  ["caso4", "ammonium-chloride"],
  -15, "Adjuvant gypsum precipitation preventing calcium from binding glyphosate active ingredient.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Fine calcium sulfate precipitate conditions hard water" }]);

// =========================================================================
// 4. Fungicides, Protectants & Chelation Formulations (20 reactions: 061-080)
// =========================================================================

add("agro-061-bordeaux-mixture-precipitation", "Precipitation of Bordeaux mixture fungicide",
  ["cuso4", "caoh2"],
  ["cuoh2", "caso4"],
  -62, "Mixing copper sulfate with slaked lime forming historic protectant vineyard spray.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#3498DB", description: "Sky-blue gelatinous cupric hydroxide-gypsum suspension precipitates" }]);

add("agro-062-burgundy-mixture-precipitation", "Precipitation of Burgundy mixture fungicide with washing soda",
  ["cuso4", "na2co3", "water"],
  ["cu2co3_oh_2", "na2so4", "co2"],
  -75, "Basic copper carbonate precipitation without lime residue for ornamental foliage.",
  "double_displacement",
  [{ type: "gas_evolution", description: "Carbon dioxide effervescence" },
   { type: "precipitation", colorTo: "#1ABC9C", description: "Turquoise basic copper carbonate flocculates" }]);

add("agro-063-copper-oxychloride-metathesis", "Precipitation of copper oxychloride fungicide from copper sulfate",
  ["cuso4", "naoh", "nacl"],
  ["copper_oxychloride", "na2so4"],
  -180, "Alkaline brine precipitation producing protectant copper oxychloride fungicide.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#1ABC9C", description: "Dense sea-green copper oxychloride precipitate separates" }]);

add("agro-064-fe-edta-chelation", "Synthesis of sodium ferric ethylenediaminetetraacetate (Fe-EDTA)",
  ["fecl3", "edta_tetrasodium"],
  ["fe_edta", "nacl"],
  -98, "Coordination of Fe(III) by hexadentate EDTA ligand forming yellow-brown bioavailable iron fertilizer.",
  "double_displacement",
  [{ type: "color_change", colorFrom: "#B03A2E", colorTo: "#F5B041", description: "Deep reddish-brown ferric chloride shifts to yellow-amber Fe-EDTA complex" }]);

add("agro-065-zn-edta-chelation", "Formulation of disodium zinc EDTA micronutrient chelate",
  ["znso4", "edta_tetrasodium"],
  ["zn_edta", "na2so4"],
  -82, "Exothermic sequestration of zinc ion preventing insoluble carbonate and hydroxide precipitation.",
  "double_displacement",
  [{ type: "temperature_increase", description: "Exothermic ligand coordination" }]);

add("agro-066-mn-edta-chelation", "Synthesis of manganese EDTA fertilizer chelate",
  ["mnso4", "edta_tetrasodium"],
  ["mn_edta", "na2so4"],
  -76, "Chelation stabilizing Mn(II) against air oxidation to insoluble MnO2 in alkaline soils.",
  "double_displacement",
  [{ type: "color_change", colorFrom: "#FADBD8", colorTo: "#FFFFFF", description: "Pale pink turns into clear water-soluble manganese chelate" }]);

add("agro-067-cu-edta-chelation", "Formulation of disodium copper EDTA micronutrient spray",
  ["cuso4", "edta_tetrasodium"],
  ["cu_edta", "na2so4"],
  -115, "Strong chelation of copper(II) forming intense royal blue non-phytotoxic complex.",
  "double_displacement",
  [{ type: "color_change", colorFrom: "#2980B9", colorTo: "#1B4F72", description: "Light blue shifts to intense deep royal blue Cu-EDTA solution" }]);

add("agro-068-aluminum-sulfate-liming", "Liming precipitation of soluble aluminum sulfate with slaked lime",
  ["al2-so4-3", "caoh2"],
  ["al-oh-3", "caso4"],
  -180, "Neutralization of soil acidity and precipitation of phytotoxic aluminum by hydrated lime.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "White gelatinous aluminum hydroxide and gypsum precipitate" }]);

add("agro-069-borax-boric-acid-buffer", "Boric acid-borate buffer foliar equilibrium",
  ["na2b4o7", "h2so4", "water"],
  ["h3bo3", "na2so4"],
  -68, "Acidification of natural tincal borax yielding pure orthoboric acid.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Pearly white plates of boric acid crystallize upon cooling" }]);

add("agro-070-zinc-basic-carbonate", "Precipitation of basic zinc carbonate micronutrient dispersion",
  ["znso4", "na2co3", "water"],
  ["znco3_basic", "na2so4", "co2"],
  -85, "Precipitation of fine micronized zinc carbonate for suspension fertilizer sprays.",
  "double_displacement",
  [{ type: "gas_evolution", description: "Carbon dioxide gas evolution" },
   { type: "precipitation", colorTo: "#FFFFFF", description: "Fine white insoluble zinc carbonate powder forms" }]);

add("agro-071-potassium-phosphite-synthesis", "Synthesis of potassium phosphite systemic fungicide/biostimulant",
  ["h3po3", "koh"],
  ["k2hpo3", "water"],
  -125, "Neutralization of phosphorous acid to potassium phosphite inducing systemic acquired resistance against Phytophthora.",
  "acid_base_neutralization",
  [{ type: "temperature_increase", description: "Strong neutralization exotherm" }]);

add("agro-072-copper-hydroxide-nitrate-synthesis", "Caustic precipitation of microcrystalline copper hydroxide fungicide",
  ["cuno32", "naoh"],
  ["cuoh2", "nano3"],
  -75, "Controlled precipitation of blue cupric hydroxide active ingredient for protectant crop sprays.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#3498DB", description: "Brilliant cerulean blue gelatinous precipitate forms" }]);

add("agro-073-sulfur-peroxide-soil-oxidation", "Peroxide accelerated oxidation of elemental sulfur for soil treatment",
  ["s", "h2o2"],
  ["h2so4", "water"],
  -480, "Chemical oxidation of agricultural sulfur generating sulfuric acid.",
  "synthesis",
  [{ type: "temperature_increase", description: "Violent exotherm with complete sulfur dissolution" }]);

add("agro-074-zinc-oxide-phosphoric-acidulation", "Phosphoric acid conversion of zinc oxide to zinc phosphate",
  ["zno", "h3po4"],
  ["zn3-po4-2", "water"],
  -165, "Acid digestion of agricultural zinc oxide to insoluble slow-release zinc phosphate.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Fine white microcrystalline zinc phosphate precipitates" }]);

add("agro-075-manganese-carbonate-acidulation", "Sulfuric acid acidulation of rhodochrosite to manganese sulfate",
  ["mnco3", "h2so4"],
  ["mnso4", "co2", "water"],
  -118, "Acid digestion of pink manganese carbonate ore for fertilizer blending.",
  "double_displacement",
  [{ type: "gas_evolution", description: "Rapid carbon dioxide effervescence" },
   { type: "color_change", colorFrom: "#FADBD8", colorTo: "#FDEDEC", description: "Pink ore dissolves into pale rose liquid" }]);

add("agro-076-iron-chelate-alkaline-cleavage", "Alkaline precipitation of ferric hydroxide from Fe-EDTA",
  ["fe_edta", "naoh"],
  ["feoh3", "edta_tetrasodium"],
  -45, "Hydroxide demetallation of Fe-EDTA complex at high pH.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#935116", description: "Rust-brown ferric hydroxide precipitates" }]);

add("agro-077-calcium-nitrate-ammoniation", "Ammoniation of burnt lime with ammonium nitrate",
  ["cao", "nh4no3"],
  ["ca-no3-2", "ammonia", "water"],
  -32, "Manufacturing greenhouse water-soluble calcium nitrate fertilizer.",
  "double_displacement",
  [{ type: "gas_evolution", description: "Evolution of ammonia gas" }]);

add("agro-078-magnesium-nitrate-ammoniation", "Metathesis of magnesium hydroxide with ammonium nitrate",
  ["mgoh2", "nh4no3"],
  ["mg-no3-2", "ammonia", "water"],
  22, "Production of high-solubility 11-0-0-9.6Mg fertigation grade magnesium nitrate.",
  "double_displacement",
  [{ type: "gas_evolution", description: "Ammonia outgassing" }]);

add("agro-079-urea-phosphate-potassium-neutralization", "Neutralization of urea phosphate with potassium hydroxide for N-P-K fertigation",
  ["urea_phosphate", "koh"],
  ["kh2po4", "urea", "water"],
  -75, "Alkaline neutralization yielding chlorine-free crystalline monopotassium phosphate and free urea fertilizer.",
  "acid_base_neutralization",
  [{ type: "temperature_increase", description: "Neutralization exotherm forming clear N-P-K liquid" }]);

add("agro-080-potassium-thiosulfate-synthesis", "Synthesis of potassium thiosulfate (KTS) 0-0-25-17S liquid fertilizer",
  ["koh", "so2", "s"],
  ["k2s2o3", "water"],
  -240, "Absorption of sulfur dioxide in potassium hydroxide with elemental sulfur forming clear neutral KTS.",
  "synthesis",
  [{ type: "color_change", colorFrom: "#F4D03F", colorTo: "#FFFFFF", description: "Yellow sulfur dissolves yielding crystal-clear high-analysis liquid" }]);

// =========================================================================
// 5. Soil Chemistry, Liming, Acidification & Nutrient Cycles (20 reactions: 081-100)
// =========================================================================

add("agro-081-soil-nitrification-ammonium-chloride", "Soil biological nitrification of ammonium chloride to nitrous acid",
  ["ammonium-chloride", "o2"],
  ["hno2", "hcl", "water"],
  -280, "Autotrophic oxidation of fertilizer ammonium chloride acidifying soil rhizosphere.",
  "redox_other",
  [{ type: "temperature_increase", description: "Biological nitrification heat release" }]);

add("agro-082-soil-nitrification-step2", "Soil bacterial oxidation of nitrite to nitric acid (Nitrobacter)",
  ["hno2", "o2"],
  ["hno3"],
  -75, "Rapid bio-oxidation converting toxic nitrite to plant-available nitrate anion.",
  "redox_other",
  [{ type: "color_change", colorFrom: "#FFFFFF", colorTo: "#FAFAFA", description: "Oxidation of nitrite in soil pore water" }]);

add("agro-083-soil-denitrification", "Anoxic heterotrophic soil denitrification converting nitrate to nitrogen gas",
  ["hno3", "ch3cooh"],
  ["n2", "co2", "water"],
  -1120, "Anaerobic microbial respiration in waterlogged soils causing agronomic nitrogen gas loss.",
  "redox_other",
  [{ type: "gas_evolution", description: "Evolution of molecular nitrogen and carbon dioxide from saturated soil" }]);

add("agro-084-quicklime-phosphoric-superphosphate", "Quicklime neutralization with phosphoric acid producing triple superphosphate",
  ["cao", "h3po4"],
  ["triple_superphosphate", "water"],
  -175, "Direct acidulation of burnt lime with wet-process phosphoric acid producing concentrated triple superphosphate.",
  "double_displacement",
  [{ type: "temperature_increase", description: "Strong exotherm with white crystallization" }]);

add("agro-085-soil-dolomite-calcination", "Thermal calcination of agricultural dolomite mineral",
  ["camgco32_dolomite"],
  ["cao", "mgo", "co2"],
  305, "Rotary kiln thermal decomposition of dolomite producing high-reactivity agricultural cal-mag lime.",
  "decomposition",
  [{ type: "gas_evolution", description: "Vigorous carbon dioxide outgassing at 900 °C" }]);

add("agro-086-aluminum-toxicity-precipitation", "Precipitation of phytotoxic trivalent aluminum by liming",
  ["alcl3", "caoh2"],
  ["al-oh-3", "cacl2"],
  -115, "Detoxification of mobile Al3+ ions below pH 5.0 into insoluble gibbsite.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "White gelatinous aluminum hydroxide precipitates" }]);

add("agro-087-soil-acidification-sulfur", "Microbial oxidation of elemental sulfur for blueberry soil acidification (Thiobacillus)",
  ["s", "o2", "water"],
  ["h2so4"],
  -580, "Autotrophic bacterial oxidation lowering pH of calcareous soils to optimal 4.5-5.2 for acidophilic crops.",
  "synthesis",
  [{ type: "color_change", colorFrom: "#F4D03F", colorTo: "#FFFFFF", description: "Yellow sulfur granules disappear as strong acidity develops" }]);

add("agro-088-soil-pyrite-acidification", "Weathering oxidation of soil pyrite in acid sulfate soils",
  ["fes2", "o2", "water"],
  ["feso4", "h2so4"],
  -1440, "Drainage and aeration of coastal mangrove cat clays generating catastrophic sulfuric acid toxicity.",
  "redox_other",
  [{ type: "color_change", colorFrom: "#7D6608", colorTo: "#935116", description: "Yellow-brown jarosite and rust mottles form in subsoil" }]);

add("agro-089-phosphate-fixation-iron-strengite", "Phosphate fixation in acidic red soils forming insoluble strengite",
  ["fecl3", "h3po4", "water"],
  ["strengite", "hcl"],
  -48, "Fixation of soluble fertilizer orthophosphate by reactive ferric oxides in acidic tropical oxisols.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#AF7AC5", description: "Pinkish-lavender microcrystalline strengite locks up available phosphorus" }]);

add("agro-090-phosphate-fixation-aluminum-variscite", "Phosphate fixation by aluminum in acidic soils forming variscite",
  ["alcl3", "h3po4", "water"],
  ["variscite", "hcl"],
  -52, "Fixation of phosphate fertilizer on kaolinite and gibbsite surfaces as insoluble variscite.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#73C6B6", description: "Pale green-white variscite mineral fixes fertilizer phosphorus" }]);

add("agro-091-phosphate-fixation-calcite-hydroxyapatite", "Phosphate fixation in calcareous alkaline soils forming hydroxyapatite",
  ["cacl2", "h3po4", "caoh2"],
  ["hydroxyapatite", "hcl", "water"],
  -380, "Precipitation of soluble phosphorus onto calcite surfaces forming highly insoluble hydroxyapatite.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Dense white insoluble apatite crust precipitates" }]);

add("agro-092-anaerobic-vivianite-formation", "Biogeochemical precipitation of vivianite in waterlogged paddy soils",
  ["fecl2", "monoammonium_phosphate", "ammonia", "water"],
  ["vivianite", "ammonium-chloride"],
  -165, "Reduction of ferric iron to ferrous iron under flooded rice cultivation precipitating vivianite.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#2E86C1", description: "Indigo-blue vivianite nodules crystallize in gleyed soil horizon" }]);

add("agro-093-sodic-soil-gypsum-remediation", "Gypsum displacement of exchangeable sodium in sodic agricultural soils",
  ["caso4", "nacl"],
  ["cacl2", "na2so4"],
  -12, "Calcium ion exchange on clay surfaces replacing dispersed Na+ to flocculate soil structure and restore water infiltration.",
  "double_displacement",
  [{ type: "phase_change", description: "Flocculation and clearing of dispersed muddy clay suspension" }]);

add("agro-094-iron-chlorosis-reduction", "Biogeochemical reduction of ferric iron by sulfide in flooded paddy soils",
  ["fecl3", "na2s"],
  ["fecl2", "s", "nacl"],
  -145, "Anaerobic microbial and chemical reduction converting insoluble Fe(III) to plant-absorbable Fe(II) with sulfur precipitation.",
  "redox_other",
  [{ type: "color_change", colorFrom: "#B03A2E", colorTo: "#A2D9CE", description: "Rust-red ferric solution turns pale green ferrous with colloidal sulfur" }]);

add("agro-095-potassium-polyphosphate-thermal", "Thermal synthesis of potassium metaphosphate fertilizer",
  ["kh2po4"],
  ["potassium_polyphosphate", "water"],
  48, "High-temperature dehydration yielding zero-chloride PK fertilizer.",
  "decomposition",
  [{ type: "phase_change", description: "Molten polyphosphate glass forms at 800 °C" }]);

add("agro-096-ammonium-volatilization-stripping", "Ammoniation of urea phosphate producing monoammonium phosphate and urea",
  ["urea_phosphate", "ammonia"],
  ["monoammonium_phosphate", "urea"],
  -45, "Direct ammoniation yielding balanced high-analysis solid nitrogen-phosphorus fertilizer blend.",
  "synthesis",
  [{ type: "temperature_increase", description: "Exothermic ammoniation forming solid fertilizer salt mixture" }]);

add("agro-097-humic-acid-iron-complexation", "Chelation of ferric iron by natural citric acid root exudate",
  ["fecl3", "c6h8o7_citric"],
  ["fe_citrate_complex", "hcl"],
  -85, "Natural organic acid exudate solubilizing iron in the plant root rhizosphere.",
  "double_displacement",
  [{ type: "color_change", colorFrom: "#B03A2E", colorTo: "#F4D03F", description: "Red-brown ferric chloride forms clear greenish-yellow soluble organic chelate" }]);

add("agro-098-rhizosphere-oxalate-aluminum-detox", "Root exudation of oxalic acid detoxifying aluminum in acid soils",
  ["alcl3", "h2c2o4", "naoh"],
  ["al_oxalate_complex", "nacl", "water"],
  -110, "Aluminum-activated malate/oxalate transporter (ALMT) exudate forming non-phytotoxic chelate.",
  "double_displacement",
  [{ type: "color_change", colorFrom: "#FFFFFF", colorTo: "#FAFAFA", description: "Protection of root apical meristem" }]);

add("agro-099-rhizosphere-ph-drop-ammonium-uptake", "Magnesium hydroxide (brucite) liming displacement of ammonium in acidic soil",
  ["ammonium-chloride", "mgoh2"],
  ["ammonia", "mgcl2", "water"],
  22, "Alkaline brucite neutralizes ammonium chloride, releasing ammonia gas while supplying essential magnesium cations.",
  "double_displacement",
  [{ type: "gas_evolution", description: "Slow ammonia gas evolution" }]);

add("agro-100-potassium-nitrate-acidulation", "Phosphoric acid conversion of potassium nitrate to monopotassium phosphate",
  ["kno3", "h3po4"],
  ["kh2po4", "hno3"],
  -15, "Acid conversion yielding pure monopotassium phosphate hydroponic nutrient.",
  "double_displacement",
  [{ type: "color_change", colorFrom: "#FFFFFF", colorTo: "#FAFAFA", description: "Clear solution of hydroponic nutrients forms" }]);

console.log(`Domain 39 successfully constructed with ${reactions.length} reactions!`);

// Write domain39AgrochemPesticidesFertilizers.ts
const outputPath = path.resolve(__dirname, "domain39AgrochemPesticidesFertilizers.ts");
const code = `// Domain 39: Agrochemistry, Pesticides, Herbicides & Modern Fertilizers (${reactions.length} reactions)
import type { ReactionDefinition } from "./types.js";

export const DOMAIN_39_REACTIONS: ReactionDefinition[] = ${JSON.stringify(reactions, null, 2)};
`;
fs.writeFileSync(outputPath, code, "utf8");
console.log(`✓ Wrote ${reactions.length} reactions to domain39AgrochemPesticidesFertilizers.ts`);
