import { SEED_CHEMICALS } from "../../chemicals.js";
import { RAW_BATCH_5_CHEMICALS } from "./chemicalDefinitionsBatch5.js";
import { SEED_REACTIONS } from "../../reactions.js";
import { REACTIONS_BATCH_5 } from "../../reactionsBatch5.js";
import { parseFormula } from "../../../../chemistry-engine/formulaParser.js";
import { balanceEquation } from "../../../../chemistry-engine/balancer.js";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const allChemsMap = new Map();
for (const c of SEED_CHEMICALS) allChemsMap.set(c.id, c);
for (const c of RAW_BATCH_5_CHEMICALS) allChemsMap.set(c.id, c);

const existingKeys = new Set([...SEED_REACTIONS, ...REACTIONS_BATCH_5].map(r => r.reactants.map(x => x.chemicalId).sort().join("+")));

function toBal(cid: string) {
  const chem = allChemsMap.get(cid);
  if (!chem) throw new Error("Unknown chemical ID: " + cid);
  const parsed = parseFormula(chem.formula);
  return { label: cid, formula: chem.formula, composition: parsed.composition, charge: chem.charge ?? 0 };
}

interface ReactionDef {
  id: string;
  name: string;
  reactants: string[];
  products: string[];
  enthalpy: number;
  desc: string;
  net?: string;
}

const list: ReactionDef[] = [];
const localKeys = new Set<string>();

function add(id: string, name: string, reactants: string[], products: string[], enthalpy: number, desc: string) {
  const k = [...reactants].sort().join("+");
  if (existingKeys.has(k)) throw new Error(`COLLISION DB: ${id} (${k})`);
  if (localKeys.has(k)) throw new Error(`DUPLICATE LOCAL: ${id} (${k})`);
  localKeys.add(k);

  for (const cid of [...reactants, ...products]) {
    if (!allChemsMap.has(cid)) throw new Error(`UNKNOWN: ${cid} in ${id}`);
  }
  const bal = balanceEquation(reactants.map(toBal), products.map(toBal));
  list.push({ id, name, reactants, products, enthalpy, desc, net: bal.balancedEquationText });
}

// 1. Dimethylglyoxime (DMG) Qualitative Nickel Detection (11)
add("bio-dmg-nicl2-ammonia", "Nickel detection in ammoniacal solution by dimethylglyoxime", ["nicl2", "c4h8n2o2_dmg", "ammonia"], ["ni_dmg2", "ammonium-chloride"], -85.0, "Formation of bright strawberry-red needle-like precipitate of nickel dimethylglyoximate.");
add("bio-dmg-niso4-ammonia", "Gravimetric nickel sulfate precipitation with dimethylglyoxime", ["niso4", "c4h8n2o2_dmg", "ammonia"], ["ni_dmg2", "nh4-2-so4"], -88.0, "Standard gravimetric analytical assay for quantitative nickel determination.");
add("bio-dmg-ni-no3-2-ammonia", "Nickel nitrate precipitation by dimethylglyoxime", ["ni-no3-2", "c4h8n2o2_dmg", "ammonia"], ["ni_dmg2", "nh4no3"], -86.0, "Selective precipitation of nickel from mixed transition metal nitrate solutions.");
add("bio-dmg-nibr2-ammonia", "Nickel bromide complexation with dimethylglyoxime", ["nibr2", "c4h8n2o2_dmg", "ammonia"], ["ni_dmg2", "nh4br"], -84.0, "Precipitation of insoluble red bis(dimethylglyoximato)nickel(II).");
add("bio-dmg-nii2-ammonia", "Nickel iodide reaction with dimethylglyoxime", ["nii2", "c4h8n2o2_dmg", "ammonia"], ["ni_dmg2", "nh4i"], -82.0, "Selective qualitative spot test for nickel in presence of iodide.");
add("bio-dmg-nicl2-naoh", "Sodium hydroxide buffered DMG nickel precipitation", ["nicl2", "c4h8n2o2_dmg", "naoh"], ["ni_dmg2", "nacl", "water"], -95.0, "Alkaline precipitation of scarlet nickel chelate.");
add("bio-dmg-niso4-naoh", "Caustic soda buffered nickel sulfate DMG precipitation", ["niso4", "c4h8n2o2_dmg", "naoh"], ["ni_dmg2", "na2so4", "water"], -98.0, "Industrial effluent nickel removal via DMG chelation.");
add("bio-dmg-ni-no3-2-naoh", "Sodium hydroxide mediated nickel nitrate DMG precipitation", ["ni-no3-2", "c4h8n2o2_dmg", "naoh"], ["ni_dmg2", "nano3", "water"], -96.0, "Gravimetric nickel assay in caustic medium.");
add("bio-dmg-dissolution-hcl", "Acidic decomposition of nickel dimethylglyoximate", ["ni_dmg2", "hcl"], ["nicl2", "c4h8n2o2_dmg"], 45.0, "Dissolution of red precipitate in strong mineral acid regenerating green nickel ions.");
add("bio-dmg-dissolution-h2so4", "Sulfuric acid dissolution of nickel dimethylglyoximate", ["ni_dmg2", "h2so4"], ["niso4", "c4h8n2o2_dmg"], 48.0, "Acid digestion of gravimetric nickel precipitate.");
add("bio-dmg-dissolution-hno3", "Nitric acid dissolution and destruction of nickel DMG complex", ["ni_dmg2", "hno3"], ["ni-no3-2", "c4h8n2o2_dmg"], 50.0, "Oxidative dissolution of nickel complex in nitric acid.");

// 2. Biuret Reactions & Peptide Coordination (11)
add("bio-biuret-cu-sulfate-naoh", "Biuret test for peptide linkages with copper(II) sulfate", ["c2h5n3o2_biuret", "cuso4", "naoh"], ["cu_biuret_complex", "na2so4", "water"], -65.0, "Diagnostic colorimetric formation of deep violet copper-biuret coordination complex.");
add("bio-biuret-cu-chloride-naoh", "Biuret peptide bond reaction with copper(II) chloride", ["c2h5n3o2_biuret", "cucl2", "naoh"], ["cu_biuret_complex", "nacl", "water"], -62.0, "Clinical photometric total protein quantification reaction.");
add("bio-biuret-cu-nitrate-naoh", "Biuret test with copper(II) nitrate", ["c2h5n3o2_biuret", "cuno32", "naoh"], ["cu_biuret_complex", "nano3", "water"], -64.0, "Chelation of cupric ions by deprotonated peptide nitrogen atoms.");
add("bio-biuret-cu-sulfate-koh", "Potassium hydroxide biuret test", ["c2h5n3o2_biuret", "cuso4", "koh"], ["cu_biuret_complex", "k2so4", "water"], -66.0, "Alkaline peptide coordination producing intense purple hue.");
add("bio-biuret-cu-chloride-koh", "Biuret complexation in potassium hydroxide", ["c2h5n3o2_biuret", "cucl2", "koh"], ["cu_biuret_complex", "kcl", "water"], -63.0, "Formation of square-planar purple copper(II) tetra-coordinate chelate.");
add("bio-biuret-cu-nitrate-koh", "Biuret coordination in potassic medium", ["c2h5n3o2_biuret", "cuno32", "koh"], ["cu_biuret_complex", "kno3", "water"], -65.0, "Violet chromophore formation in serum total protein analysis.");
add("bio-biuret-complex-acid-hcl", "Acid demetallation of copper-biuret complex", ["cu_biuret_complex", "hcl"], ["cucl2", "c2h5n3o2_biuret"], 35.0, "Reversible bleaching of violet color upon acidification.");
add("bio-biuret-complex-acid-h2so4", "Sulfuric acid destruction of copper-biuret complex", ["cu_biuret_complex", "h2so4"], ["cuso4", "c2h5n3o2_biuret"], 38.0, "Acid dissociation of peptide copper complex.");
add("bio-biuret-complex-acid-hno3", "Nitric acid cleaving of copper-biuret complex", ["cu_biuret_complex", "hno3"], ["cuno32", "c2h5n3o2_biuret"], 40.0, "Decomplexation restoring pale blue cupric ions.");
add("bio-biuret-alkaline-hydrolysis-naoh", "Caustic cleavage of biuret into sodium carbonate and ammonia", ["c2h5n3o2_biuret", "naoh"], ["na2co3", "ammonia"], -75.0, "Alkaline degradation of biuret liberating gaseous ammonia.");
add("bio-biuret-alkaline-hydrolysis-koh", "Potassium hydroxide degradation of biuret", ["c2h5n3o2_biuret", "koh"], ["k2co3", "ammonia"], -78.0, "Complete alkaline digestion of urea condensation products.");

// 3. Nessler Reactions for Ammonia (11)
add("bio-nessler-nh3-koh", "Nessler test for free ammonia with potassium hydroxide", ["k2hgi4_nessler", "ammonia", "koh"], ["nh2hg2io_millon", "ki", "water"], -110.0, "Instantaneous development of yellow-orange color or brown precipitate of iodide of Millon base.");
add("bio-nessler-nh4cl-koh", "Nessler qualitative detection of ammonium chloride", ["k2hgi4_nessler", "ammonium-chloride", "koh"], ["nh2hg2io_millon", "ki", "kcl", "water"], -115.0, "Clinical urine ammonia photometric detection.");
add("bio-nessler-nh4no3-koh", "Nessler reaction with ammonium nitrate", ["k2hgi4_nessler", "nh4no3", "koh"], ["nh2hg2io_millon", "ki", "kno3", "water"], -112.0, "Trace ammonium quantification in environmental water samples.");
add("bio-nessler-nh42so4-koh", "Nessler determination of ammonium sulfate fertilizer", ["k2hgi4_nessler", "nh4-2-so4", "koh"], ["nh2hg2io_millon", "ki", "k2so4", "water"], -118.0, "Micro-Kjeldahl distillate ammonium confirmation.");
add("bio-nessler-nh4br-koh", "Nessler reaction with ammonium bromide", ["k2hgi4_nessler", "nh4br", "koh"], ["nh2hg2io_millon", "ki", "kbr", "water"], -114.0, "Precipitation of brown condensation product of Millon base.");
add("bio-nessler-nh3-naoh", "Nessler test in sodium hydroxide medium", ["k2hgi4_nessler", "ammonia", "naoh"], ["nh2hg2io_millon", "ki", "nai", "water"], -108.0, "Colorimetric ammonia assay using caustic soda buffer.");
add("bio-nessler-nh4cl-naoh", "Detection of ammonium chloride in sodium hydroxide", ["k2hgi4_nessler", "ammonium-chloride", "naoh"], ["nh2hg2io_millon", "ki", "nacl", "nai", "water"], -112.0, "Rapid clinical spot test for azotemia and uremic metabolites.");
add("bio-nessler-nh4no3-naoh", "Detection of ammonium nitrate in sodium hydroxide", ["k2hgi4_nessler", "nh4no3", "naoh"], ["nh2hg2io_millon", "ki", "nano3", "nai", "water"], -110.0, "Spectrophotometric detection of trace nitrogen.");
add("bio-nessler-synthesis-hgi2", "Preparation of Nessler reagent from mercury(II) iodide", ["hgi2", "ki"], ["k2hgi4_nessler"], -42.0, "Dissolution of red mercury iodide into soluble yellow potassium tetraiodomercurate(II).");
add("bio-nessler-synthesis-hgcl2", "Synthesis of Nessler reagent from mercury(II) chloride", ["hgcl2", "ki"], ["k2hgi4_nessler", "kcl"], -75.0, "Direct stoichiometric formulation of Nessler analytical reagent.");
add("bio-nessler-silver-precipitation", "Silver precipitation of Nessler complex", ["k2hgi4_nessler", "agno3"], ["agi", "kno3", "hgi2"], -125.0, "Precipitation of pale yellow silver iodide and red mercury(II) iodide.");

// 4. Prussian Blue Diagnostics (11)
add("bio-prussian-fecl3-k4fecn6", "Prussian blue synthesis from ferric chloride and potassium ferrocyanide", ["k4fe_cn6", "fecl3"], ["fe4_fecn6_3", "kcl"], -310.0, "Historic Perls Prussian blue qualitative histological stain for ferric hemosiderin iron.");
add("bio-prussian-feno33-k4fecn6", "Prussian blue formation from iron(III) nitrate", ["k4fe_cn6", "fe-no3-3"], ["fe4_fecn6_3", "kno3"], -315.0, "Precipitation of insoluble dark blue ferric hexacyanoferrate.");
add("bio-prussian-fe2so43-k4fecn6", "Prussian blue synthesis from ferric sulfate", ["k4fe_cn6", "fe2-so4-3"], ["fe4_fecn6_3", "k2so4"], -320.0, "Insoluble blue antidote pigment synthesized to bind radioactive cesium and thallium.");
add("bio-prussian-decomposition-koh", "Alkaline destruction of Prussian blue by potassium hydroxide", ["fe4_fecn6_3", "koh"], ["feoh3", "k4fe_cn6"], 85.0, "Decolorization of intense blue pigment leaving brown rust-like ferric hydroxide.");
add("bio-prussian-oxidation-cl2", "Oxidation of potassium ferrocyanide by chlorine", ["k4fe_cn6", "cl2"], ["k3fe_cn6", "kcl"], -140.0, "Industrial conversion of yellow ferrocyanide to ruby-red potassium ferricyanide.");
add("bio-prussian-oxidation-br2", "Bromine oxidation of potassium ferrocyanide", ["k4fe_cn6", "br2"], ["k3fe_cn6", "kbr"], -115.0, "Conversion of iron(II) complex to iron(III) ferricyanide.");
add("bio-prussian-oxidation-peroxide", "Hydrogen peroxide oxidation of ferrocyanide in acidic medium", ["k4fe_cn6", "h2o2", "hcl"], ["k3fe_cn6", "kcl", "water"], -185.0, "Catalytic peroxidase-coupled oxidation of hexacyanoferrate.");
add("bio-prussian-oxidation-permanganate", "Permanganometric oxidation of potassium ferrocyanide", ["k4fe_cn6", "kmno4", "h2so4"], ["k3fe_cn6", "mnso4", "k2so4", "water"], -340.0, "Standard analytical redox titration of hexacyanoferrate(II).");
add("bio-prussian-reduction-iodide", "Iodometric reduction of potassium ferricyanide", ["k3fe_cn6", "ki"], ["k4fe_cn6", "i2"], 48.0, "Quantitative determination of ferricyanide by liberated iodine titration.");
add("bio-prussian-reduction-feso4", "Ferrous sulfate reduction of ferricyanide (Turnbull blue precursor)", ["k3fe_cn6", "feso4", "k2so4"], ["k4fe_cn6", "fe2-so4-3"], -45.0, "Redox equilibrium between hexacyanoferrate and iron ions.");
add("bio-prussian-alkaline-ferrocyanide-feoh3", "Colloidal synthesis of ferrocyanide from ferric hydroxide and Prussian blue", ["feoh3", "k4fe_cn6"], ["fe4_fecn6_3", "koh"], -85.0, "Reversible colloid equilibrium between Prussian blue and iron oxide hydrate.");

// 5. Hydroquinone / Benzoquinone Redox (11)
add("bio-hq-silver-reduction", "Photographic and histological reduction of silver nitrate by hydroquinone", ["c6h6o2_hydroquinone", "agno3"], ["c6h4o2_benzoquinone", "ag", "hno3"], -135.0, "Bielschowsky silver stain mechanism reducing ionic silver to black metallic silver grains.");
add("bio-hq-fecl3-oxidation", "Ferric chloride colorimetric oxidation of hydroquinone", ["c6h6o2_hydroquinone", "fecl3"], ["c6h4o2_benzoquinone", "fecl2", "hcl"], -65.0, "Diagnostic phenolic oxidation by iron(III) chloride.");
add("bio-hq-fe2so43-oxidation", "Ferric sulfate oxidation of hydroquinone", ["c6h6o2_hydroquinone", "fe2-so4-3"], ["c6h4o2_benzoquinone", "feso4", "h2so4"], -68.0, "Mitochondrial electron transport chain model reaction.");
add("bio-hq-peroxide-peroxidase", "Peroxidase-catalyzed oxidation of hydroquinone to benzoquinone", ["c6h6o2_hydroquinone", "h2o2"], ["c6h4o2_benzoquinone", "water"], -175.0, "Biomimetic defense secretion of bombardier beetles.");
add("bio-hq-permanganate-titration", "Permanganate titration of hydroquinone", ["c6h6o2_hydroquinone", "kmno4", "h2so4"], ["c6h4o2_benzoquinone", "mnso4", "k2so4", "water"], -420.0, "Volumetric determination of dihydroxybenzene antioxidants.");
add("bio-hq-dichromate-oxidation", "Chromic acid oxidation of hydroquinone to 1,4-benzoquinone", ["c6h6o2_hydroquinone", "k2cr2o7", "h2so4"], ["c6h4o2_benzoquinone", "cr2-so4-3", "k2so4", "water"], -380.0, "Classic organic synthesis of golden-yellow crystalline p-benzoquinone.");
add("bio-hq-iodine-titration", "Iodometric oxidation of hydroquinone", ["c6h6o2_hydroquinone", "i2"], ["c6h4o2_benzoquinone", "hi"], -42.0, "Equilibrium redox titration of photographic developer solution.");
add("bio-hq-bromine-oxidation", "Bromine oxidation of hydroquinone", ["c6h6o2_hydroquinone", "br2"], ["c6h4o2_benzoquinone", "hbr"], -95.0, "Rapid halogen oxidation generating 1,4-benzoquinone.");
add("bio-hq-chlorine-oxidation", "Chlorine oxidation of hydroquinone", ["c6h6o2_hydroquinone", "cl2"], ["c6h4o2_benzoquinone", "hcl"], -145.0, "Oxidative dehydrogenation of dihydroxybenzene.");
add("bio-bq-sulfite-reduction", "Antioxidant sulfite reduction of benzoquinone back to hydroquinone", ["c6h4o2_benzoquinone", "so2", "water"], ["c6h6o2_hydroquinone", "h2so4"], -120.0, "Photographic preservative mechanism of sulfite preventing quinone developer oxidation.");
add("bio-bq-sulfide-reduction", "Hydrogen sulfide reduction of p-benzoquinone", ["c6h4o2_benzoquinone", "h2s"], ["c6h6o2_hydroquinone", "s"], -85.0, "Reduction of quinoid chromophore precipitating elemental sulfur.");

// 6. Sugar Diagnostics (Fehling / Benedict) (11)
add("bio-sugar-glucose-fehling-cucl2-naoh", "Fehling qualitative test for D-glucose with copper(II) chloride", ["c6h12o6", "cucl2", "naoh"], ["cu2o", "nacl", "co2", "water"], -3850.0, "Reduction of alkaline cupric tartrate to insoluble brick-red copper(I) oxide.");
add("bio-sugar-glucose-fehling-cuso4-naoh", "Benedict/Fehling test for D-glucose with copper(II) sulfate", ["c6h12o6", "cuso4", "naoh"], ["cu2o", "na2so4", "co2", "water"], -3880.0, "Semiquantitative clinical test for glycosuria in diabetes mellitus.");
add("bio-sugar-glucose-fehling-cucl2-koh", "Potassium hydroxide buffered Fehling test for D-glucose", ["c6h12o6", "cucl2", "koh"], ["cu2o", "kcl", "co2", "water"], -3860.0, "Alkaline enediol oxidation of reducing aldose sugars.");
add("bio-sugar-glucose-fehling-cuso4-koh", "Fehling test for D-glucose using caustic potash", ["c6h12o6", "cuso4", "koh"], ["cu2o", "k2so4", "co2", "water"], -3890.0, "Precipitation of cuprous oxide with simultaneous glucose oxidation.");
add("bio-sugar-fructose-fehling-cucl2-naoh", "Fehling test for D-fructose ketose sugar", ["c6h12o6_fructose", "cucl2", "naoh"], ["cu2o", "nacl", "co2", "water"], -3840.0, "Base-catalyzed Lobry de Bruyn-Alberda van Ekenstein rearrangement reducing copper(II).");
add("bio-sugar-fructose-fehling-cuso4-naoh", "Benedict test for D-fructose in caustic soda", ["c6h12o6_fructose", "cuso4", "naoh"], ["cu2o", "na2so4", "co2", "water"], -3870.0, "Formation of diagnostic red cuprous oxide precipitate.");
add("bio-sugar-fructose-fehling-cucl2-koh", "Fehling reaction of D-fructose in caustic potash", ["c6h12o6_fructose", "cucl2", "koh"], ["cu2o", "kcl", "co2", "water"], -3850.0, "Rapid ketose reduction of alkaline copper(II) chloride.");
add("bio-sugar-fructose-fehling-cuso4-koh", "Fehling reaction of D-fructose with copper(II) sulfate in KOH", ["c6h12o6_fructose", "cuso4", "koh"], ["cu2o", "k2so4", "co2", "water"], -3880.0, "Redox decomposition of ketose sugar to brick-red Cu2O.");
add("bio-sugar-sucrose-inversion-hydrolysis", "Acid-catalyzed inversion of sucrose to glucose and fructose", ["sucrose", "water"], ["c6h12o6", "c6h12o6_fructose"], -14.0, "Enzymatic or acid hydrolysis reversing optical rotation from dextro to levorotatory.");
add("bio-sugar-glucose-permanganate", "Permanganate complete oxidation of D-glucose", ["c6h12o6", "kmno4", "h2so4"], ["co2", "mnso4", "k2so4", "water"], -4200.0, "Total chemical oxygen demand (COD) degradation of blood sugar.");
add("bio-sugar-fructose-permanganate", "Permanganate oxidation of D-fructose", ["c6h12o6_fructose", "kmno4", "h2so4"], ["co2", "mnso4", "k2so4", "water"], -4180.0, "Exhaustive permanganometric mineralization of ketohexose.");

// 7. Amides, Organic Nitrogen & Calorimetry (11)
add("bio-aa-glycine-combustion", "Complete oxidative combustion of glycine", ["glycine", "o2"], ["co2", "water", "n2"], -975.0, "Bomb calorimetry oxidation of the simplest proteinogenic amino acid.");
add("bio-aa-alanine-combustion", "Complete oxidative combustion of alanine", ["alanine", "o2"], ["co2", "water", "n2"], -1620.0, "Thermal combustion of alanine yielding carbon dioxide, steam, and nitrogen.");
add("bio-aa-glycylglycine-combustion", "Combustion of dipeptide glycylglycine", ["glycylglycine", "o2"], ["co2", "water", "n2"], -1950.0, "Thermal oxidation of prototype dipeptide model.");
add("bio-aa-phenylalanine-combustion", "Combustion of aromatic amino acid L-phenylalanine", ["c9h11no2_phenylalanine", "o2"], ["co2", "water", "n2"], -4650.0, "Complete calorimetric oxidation of aromatic amino acid.");
add("bio-lactic-acid-combustion", "Calorimetric combustion of metabolic lactic acid", ["lactic-acid", "o2"], ["co2", "water"], -1340.0, "Oxidative combustion of anaerobic glycolysis end product.");
add("bio-org-formamide-hydrolysis-koh", "Potassium hydroxide hydrolysis of formamide", ["formamide", "koh"], ["hcook", "ammonia"], -68.0, "Base-catalyzed amide cleavage yielding potassium formate.");
add("bio-aa-urea-combustion", "Calorimetric combustion of urea", ["urea", "o2"], ["co2", "water", "n2"], -632.0, "Standard enthalpy of combustion of biological nitrogenous waste.");
add("bio-aa-urea-nitrous-acid-effervescence", "Gasometric Van Slyke determination of urea with nitrous acid", ["urea", "hno2"], ["co2", "n2", "water"], -480.0, "Rapid effervescence of molecular nitrogen and carbon dioxide for blood urea nitrogen.");
add("bio-org-oxamide-hydrolysis-naoh", "Alkaline saponification of oxamide to sodium oxalate", ["oxamide", "naoh"], ["na2c2o4", "ammonia"], -75.0, "Alkaline cleavage of bis-amide liberating ammonia.");
add("bio-org-oxamide-hydrolysis-koh", "Potassium hydroxide hydrolysis of oxamide", ["oxamide", "koh"], ["k2c2o4", "ammonia"], -78.0, "Conversion of diamide into potassium oxalate.");
add("bio-org-formamide-hydrolysis-naoh", "Alkaline hydrolysis of formamide to sodium formate", ["formamide", "naoh"], ["hcoona", "ammonia"], -65.0, "Base-catalyzed amide cleavage yielding sodium formate.");

// 8. NaBH4 Biomimetic Reductions (11)
add("bio-nabh4-benzoquinone-reduction", "Sodium borohydride reduction of 1,4-benzoquinone to hydroquinone", ["nabh4", "c6h4o2_benzoquinone", "water"], ["c6h6o2_hydroquinone", "naoh", "h3bo3"], -280.0, "Biomimetic hydride transfer reducing quinone electron carriers.");
add("bio-nabh4-silver-reduction", "Sodium borohydride synthesis of silver nanoparticles", ["nabh4", "agno3", "water"], ["ag", "nano3", "h3bo3", "h2"], -340.0, "Hydride reduction producing yellow-brown colloidal silver for antimicrobial assays.");
add("bio-nabh4-cucl2-reduction", "Sodium borohydride reduction of copper(II) chloride", ["nabh4", "cucl2", "water"], ["cu", "nacl", "h3bo3", "h2"], -260.0, "Hydride reduction isolating metallic copper powder.");
add("bio-nabh4-acid-hydrolysis-hcl", "Acid hydrolysis of sodium borohydride in hydrochloric acid", ["nabh4", "hcl", "water"], ["nacl", "h3bo3", "h2"], -215.0, "Violent effervescence releasing pure molecular hydrogen gas.");
add("bio-nabh4-acid-hydrolysis-h2so4", "Sulfuric acid decomposition of sodium borohydride", ["nabh4", "h2so4", "water"], ["na2so4", "h3bo3", "h2"], -225.0, "Rapid generation of hydrogen fuel and boric acid.");
add("bio-nabh4-acid-hydrolysis-hno3", "Nitric acid hydrolysis of sodium borohydride", ["nabh4", "hno3", "water"], ["nano3", "h3bo3", "h2"], -220.0, "Exothermic acidification yielding sodium nitrate and boric acid.");
add("bio-nabh4-acetic-hydrolysis", "Acetic acid hydrolysis of sodium borohydride", ["nabh4", "ch3cooh", "water"], ["ch3coona", "h3bo3", "h2"], -185.0, "Controlled buffer hydrolysis of borohydride.");
add("bio-nabh4-fecl3-reduction", "Sodium borohydride reduction of iron(III) to iron(II)", ["nabh4", "fecl3", "water"], ["fecl2", "nacl", "h3bo3", "h2"], -195.0, "Selective one-electron reduction of ferric chloride.");
add("bio-nabh4-cuso4-reduction", "Reduction of copper(II) sulfate by sodium borohydride", ["nabh4", "cuso4", "water"], ["cu", "na2so4", "h3bo3", "h2"], -275.0, "Precipitation of ultrafine elemental copper powder.");
add("bio-nabh4-niso4-reduction", "Borohydride reduction of nickel sulfate (Raney nickel analog)", ["nabh4", "niso4", "water"], ["ni", "na2so4", "h3bo3", "h2"], -240.0, "Synthesis of black active nickel boride/metal hydrogenation catalyst.");
add("bio-nabh4-feso4-reduction", "Reduction of iron(II) sulfate by sodium borohydride", ["nabh4", "feso4", "water"], ["fe", "na2so4", "h3bo3", "h2"], -180.0, "Synthesis of zero-valent iron nanoparticles (nZVI) for environmental remediation.");

// 9. Peroxide Fenton & Catalase Biomimetics (11)
add("bio-perox-fenton-reaction", "Fenton reagent hydroxyl radical generation from ferrous chloride", ["fecl2", "h2o2", "hcl"], ["fecl3", "water"], -160.0, "Classic advanced oxidation process (AOP) generating destructive hydroxyl radicals.");
add("bio-perox-fenton-sulfate", "Fenton reaction with ferrous sulfate", ["feso4", "h2o2", "h2so4"], ["fe2-so4-3", "water"], -165.0, "Biomimetic model of intracellular oxidative stress and lipid peroxidation.");
add("bio-perox-iron-nitrate-fenton", "Fenton reaction with iron(II) nitrate", ["fe-no3-2", "h2o2", "hno3"], ["fe-no3-3", "water"], -155.0, "Peroxide reduction by ferrous nitrate in nitric acid medium.");
add("bio-perox-bromide-haloperoxidase", "Vanadium/heme haloperoxidase model: bromide oxidation by peroxide", ["kbr", "h2o2", "h2so4"], ["br2", "k2so4", "water"], -145.0, "Biochemical synthesis of elemental bromine in marine red algae.");
add("bio-perox-chloride-haloperoxidase", "Neutrophil myeloperoxidase model: chloride oxidation by hydrogen peroxide", ["nacl", "h2o2", "h2so4"], ["cl2", "na2so4", "water"], -120.0, "Enzymatic generation of microbicidal hypochlorous acid/chlorine in phagosomes.");
add("bio-perox-ki-hcl-haloperoxidase", "Iodide peroxidase biomimetic oxidation by hydrogen peroxide", ["ki", "h2o2", "hcl"], ["i2", "kcl", "water"], -180.0, "Thyroid peroxidase mimic: oxidation of dietary iodide to molecular iodine.");
add("bio-perox-kbr-hcl-haloperoxidase", "Bromide haloperoxidase biomimetic oxidation", ["kbr", "h2o2", "hcl"], ["br2", "kcl", "water"], -150.0, "Marine algal bromoperoxidase model forming orange-brown bromine.");
add("bio-perox-nai-hcl-haloperoxidase", "Sodium iodide haloperoxidase oxidation", ["nai", "h2o2", "hcl"], ["i2", "nacl", "water"], -180.0, "Colorimetric detection of hydroperoxides with sodium iodide.");
add("bio-perox-nabr-hcl-haloperoxidase", "Sodium bromide haloperoxidase oxidation", ["nabr", "h2o2", "hcl"], ["br2", "nacl", "water"], -150.0, "Biomimetic haloperoxidase oxidation of sodium bromide.");
add("bio-perox-hi-peroxide", "Direct oxidation of hydroiodic acid by hydrogen peroxide", ["hi", "h2o2"], ["i2", "water"], -240.0, "Rapid oxidation of hydriodic acid liberating triiodide/iodine crystals.");
add("bio-perox-hbr-peroxide", "Direct oxidation of hydrobromic acid by hydrogen peroxide", ["hbr", "h2o2"], ["br2", "water"], -190.0, "Rapid oxidation liberating dense red bromine vapors.");

// 10. Clinical Precipitants & Electrolytes (11)
add("bio-assay-caso4-na2c2o4", "Precipitation of calcium oxalate from calcium sulfate", ["caso4", "na2c2o4"], ["cac2o4", "na2so4"], -25.0, "Diagnostic precipitation of nephrolithiasis calcium oxalate monohydrate.");
add("bio-assay-cac2o4-kmno4-titration", "Kramer-Tisdall permanganometric serum calcium titration", ["cac2o4", "kmno4", "h2so4"], ["caso4", "mnso4", "k2so4", "co2", "water"], -540.0, "Decolorization of purple permanganate by dissolved calcium oxalate.");
add("bio-assay-bano32-k2so4", "Precipitation of radiopaque barium sulfate with potassium sulfate", ["ba-no3-2", "k2so4"], ["baso4", "kno3"], -32.0, "Synthesis of inert barium meal contrast agent.");
add("bio-assay-bano32-na2so4", "Precipitation of barium sulfate with sodium sulfate", ["ba-no3-2", "na2so4"], ["baso4", "nano3"], -34.0, "Diagnostic clinical precipitation of insoluble radio-contrast agent.");
add("bio-assay-bano32-na2c2o4", "Diagnostic precipitation of insoluble barium oxalate", ["ba-no3-2", "na2c2o4"], ["bac2o4", "nano3"], -28.0, "Oxalate precipitation test for barium cations.");
add("bio-assay-znso4-na2co3", "Precipitation of pharmaceutical basic zinc carbonate", ["znso4", "na2co3"], ["znco3", "na2so4"], -26.0, "Synthesis of medicinal smithsonite / calamine precursor.");
add("bio-assay-zncl2-na2co3", "Precipitation of zinc carbonate from zinc chloride", ["zncl2", "na2co3"], ["znco3", "nacl"], -25.0, "Precipitation of zinc carbonate topical antiseptic salt.");
add("bio-assay-fecl2-na2c2o4", "Precipitation of ferrous oxalate humboldtine from ferrous chloride", ["fecl2", "na2c2o4"], ["fec2o4", "nacl"], -24.0, "Model precipitation of urinary ferrous oxalate mineral humboldtine.");
add("bio-assay-feso4-na2c2o4", "Precipitation of ferrous oxalate from iron(II) sulfate", ["feso4", "na2c2o4"], ["fec2o4", "na2so4"], -23.0, "Quantitative precipitation of iron(II) oxalate in urine sediment assays.");
add("bio-assay-cuso4-na2c2o4", "Precipitation of copper(II) oxalate from cupric sulfate", ["cuso4", "na2c2o4"], ["cuc2o4", "na2so4"], -27.0, "Coordination precipitation of insoluble light-blue copper(II) oxalate.");
add("bio-assay-znso4-k2co3", "Precipitation of zinc carbonate by potassium carbonate", ["znso4", "k2co3"], ["znco3", "k2so4"], -27.0, "Synthesis of basic zinc carbonate for dermatological ointments.");

console.log(`Validated all ${list.length} reactions! Writing domain20BioinorganicClinical.ts...`);

const targetPath = path.resolve(__dirname, "./domain20BioinorganicClinical.ts");
const code = `import { addReaction } from "./generateBatch5.js";

export function buildDomain20BioinorganicClinical(): void {
  // Domain 20: Exactly 110 Bioinorganic, Clinical & Qualitative Analytical Reactions
  const reactions = ${JSON.stringify(list, null, 4)};

  for (const r of reactions) {
    addReaction({
      id: r.id,
      name: r.name,
      reactionType: "redox_other",
      reactants: r.reactants,
      products: r.products,
      netIonicEquation: r.net,
      enthalpyKjPerMol: r.enthalpy,
      temperatureMinC: 15,
      temperatureMaxC: 100,
      observableEffects: [
        {
          type: "color_change",
          description: r.desc,
        }
      ],
      safetyNotes: "Bioinorganic and clinical qualitative test reaction. Handle heavy metal complexes (mercury, nickel, barium) and alkaline/acidic reagents with laboratory PPE.",
    });
  }
}
`;

fs.writeFileSync(targetPath, code, "utf8");
console.log(`✓ Wrote ${list.length} reactions to domain20BioinorganicClinical.ts`);
