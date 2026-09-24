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
  type: string = "synthesis",
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
// Domain 37: Toxicology, Forensics & Chemical Spot Tests (100)
// =========================================================================

// Section 1: Chemiluminescence, Latent Prints & Serology (1-8)
add("forensic-luminol-persulfate", "Luminol chemiluminescence oxidation by sodium persulfate",
  ["luminol", "na2s2o8", "naoh"], ["na2-aminophthalate", "na2so4", "n2", "water"], -690.0,
  "Forensic blood and latent print reagent: persulfate-activated chemiluminescent emission of luminol.", "redox_other");

add("forensic-luminol-o3", "Luminol chemiluminescence oxidation by ozone",
  ["luminol", "o3", "naoh"], ["na2-aminophthalate", "n2", "water", "o2"], -610.0,
  "Chemiluminescent detection of atmospheric ozone via luminol oxidation producing excited 3-aminophthalate dianion.", "redox_other");

add("forensic-ninhydrin-dehydration", "Thermal dehydration of ninhydrin to 1,2,3-indantrione",
  ["c9h6o4_ninhydrin"], ["indane-1-2-3-trione", "water"], 42.0,
  "Latent fingerprint development: thermal activation of ninhydrin dehydrating to reactive triketone.", "decomposition");

add("forensic-fingerprint-pd-fe", "Physical developer redox reaction for latent prints",
  ["agno3", "feso4"], ["ag", "fe-no3-3", "fe2-so4-3"], -95.0,
  "Forensic physical developer: iron(II) reduction of silver nitrate depositing dark silver nanoparticles along print ridges on wet paper.", "redox_other");

add("forensic-formic-naocl", "Hypochlorite oxidation of formic acid metabolite",
  ["hcooh", "naocl"], ["co2", "nacl", "water"], -320.0,
  "Toxicology testing: destruction of toxic methanol metabolite formic acid via hypochlorite oxidation.", "redox_other");

add("forensic-formaldehyde-naocl", "Hypochlorite oxidation of formaldehyde",
  ["hcho", "naocl"], ["hcooh", "nacl"], -295.0,
  "Rapid oxidative neutralization of volatile formaldehyde fixative into formic acid.", "redox_other");

add("forensic-methanol-naocl", "Oxidation of methanol toxicant by sodium hypochlorite",
  ["ch3oh", "naocl"], ["hcho", "nacl", "water"], -260.0,
  "Diagnostic screening reaction oxidizing toxic ingested methanol to formaldehyde.", "redox_other");

add("forensic-formaldehyde-tollens", "Tollens silver mirror test for forensic aldehyde detection",
  ["hcho", "agno3", "naoh"], ["ag", "hcoona", "nano3", "water"], -185.0,
  "Forensic confirmation: reduction of ammoniacal silver ions by formaldehyde depositing reflective silver mirror.", "redox_other");

// Section 2: Drug & Toxicant Oxidative Spot Tests (9-22)
add("forensic-meth-marquis-oxidation", "Acidic potassium dichromate oxidation of methamphetamine",
  ["c10h15n_meth", "k2cr2o7", "h2so4"], ["co2", "cr2-so4-3", "k2so4", "water", "no2"], -3850.0,
  "Presumptive forensic test: vigorous chromic digestion shifting color from bright orange Cr(VI) to deep green Cr(III).", "redox_other");

add("forensic-morphine-marquis-oxidation", "Acidic potassium dichromate oxidation of morphine",
  ["c17h19no3_morphine", "k2cr2o7", "h2so4"], ["co2", "cr2-so4-3", "k2so4", "water", "no2"], -5420.0,
  "Forensic opiate identification: exhaustive chromic acid digestion with chromophore color shift.", "redox_other");

add("forensic-cocaine-marquis-oxidation", "Acidic potassium dichromate oxidation of cocaine base",
  ["c17h21no4_cocaine", "k2cr2o7", "h2so4"], ["co2", "cr2-so4-3", "k2so4", "water", "no2"], -5650.0,
  "Total oxidative digestion of seized cocaine alkaloid into carbon dioxide, nitrogen dioxide, and water.", "redox_other");

add("forensic-froehde-morphine", "Froehde's reagent nitric acid digestion of morphine",
  ["c17h19no3_morphine", "hno3"], ["co2", "no2", "water"], -4680.0,
  "Exhaustive nitration and oxidative degradation of morphine alkaloid releasing dense red-brown NO2 gas.", "redox_other");

add("forensic-meth-permanganate", "Permanganate oxidation of methamphetamine",
  ["c10h15n_meth", "kmno4", "h2so4"], ["co2", "mnso4", "k2so4", "water", "no2"], -4120.0,
  "Diagnostic alkaloid screening: rapid decolorization of purple permanganate to colorless Mn(II).", "redox_other");

add("forensic-morphine-permanganate", "Permanganate oxidation of morphine alkaloid",
  ["c17h19no3_morphine", "kmno4", "h2so4"], ["co2", "mnso4", "k2so4", "water", "no2"], -5890.0,
  "Opiate spot test: oxidative cleavage of morphine phenanthrene nucleus with permanganate discharge.", "redox_other");

add("forensic-cocaine-permanganate", "Permanganate oxidation test for cocaine ecgonine esters",
  ["c17h21no4_cocaine", "kmno4", "h2so4"], ["co2", "mnso4", "k2so4", "water", "no2"], -6050.0,
  "Exhaustive oxidation verifying purity of cocaine hydrochloride / freebase samples.", "redox_other");

add("forensic-meth-dichromate", "Sodium dichromate oxidation of methamphetamine",
  ["c10h15n_meth", "na2cr2o7", "h2so4"], ["co2", "cr2-so4-3", "na2so4", "water", "no2"], -3820.0,
  "Acidic sodium dichromate digestion producing green Cr(III) sulfate.", "redox_other");

add("forensic-morphine-na2cr2o7", "Sodium dichromate oxidation of morphine",
  ["c17h19no3_morphine", "na2cr2o7", "h2so4"], ["co2", "cr2-so4-3", "na2so4", "water", "no2"], -5390.0,
  "Toxicological screening: chromic acid mineralization of opiate residues.", "redox_other");

add("forensic-cocaine-na2cr2o7", "Sodium dichromate oxidation of cocaine",
  ["c17h21no4_cocaine", "na2cr2o7", "h2so4"], ["co2", "cr2-so4-3", "na2so4", "water", "no2"], -5610.0,
  "Chromic acid destruction of cocaine alkaloid yielding aqueous chromium(III) sulfate.", "redox_other");

add("forensic-meth-hno3", "Concentrated nitric acid digestion of methamphetamine",
  ["c10h15n_meth", "hno3"], ["co2", "no2", "water"], -3450.0,
  "Nitric acid digestion releasing nitrogen dioxide gas.", "redox_other");

add("forensic-cocaine-hno3", "Concentrated nitric acid digestion of cocaine",
  ["c17h21no4_cocaine", "hno3"], ["co2", "no2", "water"], -5120.0,
  "Acid decomposition of cocaine alkaloid releasing copious NO2 fumes.", "redox_other");

add("forensic-meth-combust", "Controlled field incineration of seized methamphetamine",
  ["c10h15n_meth", "o2"], ["co2", "water", "no2"], -4890.0,
  "Thermal destruction of illicit methamphetamine contraband in high-temperature incinerator.", "combustion");

add("forensic-morphine-combust", "Controlled field incineration of seized morphine",
  ["c17h19no3_morphine", "o2"], ["co2", "water", "no2"], -6820.0,
  "Thermal demilitarization and incineration of illicit opiates.", "combustion");

// Section 3: Cocaine Combustion, Marsh & Reinsch Arsenic Tests (23-34)
add("forensic-cocaine-combust", "Controlled field incineration of seized cocaine contraband",
  ["c17h21no4_cocaine", "o2"], ["co2", "water", "no2"], -7150.0,
  "High-temperature disposal incineration of seized cocaine bricks.", "combustion");

add("forensic-marsh-hypochlorite-dissolution", "Sodium hypochlorite dissolution of Marsh arsenic mirror",
  ["as", "naocl", "water"], ["h3aso4", "nacl"], -620.0,
  "Key Marsh test confirmation: metallic arsenic mirror dissolves immediately in sodium hypochlorite, distinguishing it from antimony.", "redox_other");

add("forensic-marsh-h2o2-oxidation", "Hydrogen peroxide oxidation of metallic arsenic mirror",
  ["as", "h2o2"], ["as2o3", "water"], -580.0,
  "Oxidation of reflective arsenic metal mirror film back to white arsenic trioxide.", "redox_other");

add("forensic-reinsch-cu-arsenic", "Reinsch test for arsenic on metallic copper foil",
  ["as2o3", "cu", "hcl"], ["cucl2", "as", "water"], -110.0,
  "Classic 19th-century clinical toxicology: metallic copper foil reduces aqueous As(III) in hot HCl, plating a dark steel-gray arsenic film.", "single_displacement");

add("forensic-reinsch-deposit-oxidation", "Sublimation oxidation of Reinsch copper arsenic deposit",
  ["as", "o2"], ["as2o3"], -657.0,
  "Confirmation step of Reinsch test: heating copper foil in open tube sublimes arsenic to characteristic sparkling octahedral As2O3 crystals.", "combustion");

add("forensic-as2o3-na2s-hcl", "Acidified sodium sulfide precipitation of arsenic(III) sulfide",
  ["as2o3", "na2s", "hcl"], ["as2s3", "nacl", "water"], -110.0,
  "Toxicological qualitative group analysis: acidified sulfide precipitation of brilliant yellow As2S3 (orpiment).", "precipitation");

add("forensic-stibnite-precip", "Hydrogen sulfide precipitation of toxic antimony(III) as stibnite",
  ["sb2o3", "h2s"], ["sb2s3", "water"], -92.0,
  "Forensic heavy metal screening: precipitation of distinctive orange-red antimony(III) sulfide.", "precipitation");

add("forensic-antimony-reinsch", "Reinsch test for toxic antimony on copper foil",
  ["sb2o3", "cu", "hcl"], ["cucl2", "sb", "water"], -105.0,
  "Reinsch screening: deposition of violet-black antimony coating on cleaned copper strip.", "single_displacement");

add("forensic-arsenic-hno3-dissolution", "Nitric acid oxidation of arsenic mirror to arsenic acid",
  ["as", "hno3", "water"], ["h3aso4", "no"], -415.0,
  "Wet digestion of arsenic forensic specimen yielding soluble orthoarsenic acid.", "redox_other");

add("forensic-as2o3-nitric-oxidation", "Nitric acid digestion of arsenic trioxide to arsenic acid",
  ["as2o3", "hno3", "water"], ["h3aso4", "no2"], -185.0,
  "Digestion of poison evidence samples converting As2O3 into arsenic acid for atomic absorption spectroscopy.", "redox_other");

add("forensic-antimony-nitric-oxidation", "Nitric acid oxidation of metallic antimony deposit",
  ["sb", "hno3"], ["sb2o3", "no2", "water"], -395.0,
  "Oxidation of antimony spot test deposits to insoluble white antimony trioxide.", "redox_other");

add("forensic-stibnite-nitric-digestion", "Nitric acid digestion of antimony(III) sulfide residue",
  ["sb2s3", "hno3"], ["sb2o3", "h2so4", "no2", "water"], -1680.0,
  "Exhaustive acid digestion of orange stibnite precipitate releasing NO2 and sulfuric acid.", "redox_other");

// Section 4: Cyanide & Carbon Monoxide Toxicology (35-45)
add("forensic-cyanide-rhodanese-detox", "Sodium thiosulfate detoxification of potassium cyanide",
  ["kcn", "na2s2o3"], ["kscn", "na2so3"], -48.0,
  "In vitro model of rhodanese enzyme: sulfur transfer converting lethal cyanide into non-toxic thiocyanate.", "synthesis");

add("forensic-cyanide-stomach-hcl", "Gastric acid liberation of lethal hydrogen cyanide gas from NaCN",
  ["nacn", "hcl"], ["hcn", "nacl"], -18.0,
  "Toxicology of oral cyanide ingestion: hydrochloric acid in stomach immediately liberates volatile toxic HCN vapor.", "neutralization");

add("forensic-cyanide-kcn-hcl", "Gastric acid liberation of hydrogen cyanide from potassium cyanide",
  ["kcn", "hcl"], ["hcn", "kcl"], -20.0,
  "Acid-promoted release of prussic acid vapor upon lethal ingestion of KCN.", "neutralization");

add("forensic-cyanide-nacn-h2so4", "Acidification of sodium cyanide in toxicology micro-diffusion chambers",
  ["nacn", "h2so4"], ["hcn", "na2so4"], -42.0,
  "Conway micro-diffusion assay: liberation of volatile HCN into alkaline trapping well.", "neutralization");

add("forensic-cyanide-kcn-h2so4", "Sulfuric acid acidification of potassium cyanide",
  ["kcn", "h2so4"], ["hcn", "k2so4"], -45.0,
  "Micro-diffusion extraction of cyanide from post-mortem blood samples.", "neutralization");

add("forensic-co-silver-reduction", "Carbon monoxide reduction of ammoniacal silver nitrate",
  ["agno3", "co", "water"], ["ag", "co2", "hno3"], -195.0,
  "Toxicological blood gas screening: carbon monoxide reduces aqueous silver ions to black metallic silver mirror.", "redox_other");

add("forensic-co-permanganate-oxidation", "Acidic potassium permanganate oxidation of carbon monoxide",
  ["kmno4", "co", "h2so4"], ["co2", "mnso4", "k2so4", "water"], -620.0,
  "Gas detection tube chemistry: quantitative oxidation of lethal CO with colorimetric decolorization.", "redox_other");

add("forensic-cyanide-rhodanese-sodium", "Sodium thiosulfate detoxification of sodium cyanide",
  ["nacn", "na2s2o3"], ["nascn", "na2so3"], -45.0,
  "Clinical antidote model: sulfurtransferase enzyme mechanism converting cyanide into thiocyanate.", "synthesis");

add("forensic-kcn-persulfate", "Sodium persulfate oxidation of potassium cyanide",
  ["kcn", "na2s2o8", "water"], ["knco", "na2so4", "h2so4"], -240.0,
  "Advanced oxidation decontamination converting toxic cyanide to cyanate.", "redox_other");

add("forensic-cyanate-hydrolysis", "Acidic hydrolysis of sodium cyanate to ammonium chloride",
  ["nanco", "hcl", "water"], ["nacl", "ammonium-chloride", "co2"], -85.0,
  "Completion of cyanide decontamination: acid hydrolysis converting cyanate into harmless ammonium chloride and CO2.", "decomposition");

add("forensic-knco-hydrolysis", "Acidic hydrolysis of potassium cyanate",
  ["knco", "hcl", "water"], ["kcl", "ammonium-chloride", "co2"], -88.0,
  "Complete degradation of cyanate into potassium chloride, ammonium chloride, and carbon dioxide.", "decomposition");

// Section 5: Heavy Metal Toxicology: Lead (46-57)
add("forensic-lead-oxalate-precip", "Oxalic acid precipitation of toxic lead(II) from nitrate solution",
  ["pbno32", "h2c2o4"], ["pbc2o4", "hno3"], -34.0,
  "Toxicology isolation: gravimetric precipitation of insoluble lead oxalate from acid digest.", "precipitation");

add("forensic-lead-chromate-confirmation", "Confirmatory precipitation of lead chromate from lead chloride",
  ["pbcl2", "k2cr2o7", "water"], ["pbcro4", "kcl", "hcl"], -45.0,
  "Forensic gunshot residue (GSR) confirmation: precipitation of bright yellow lead chromate pigment.", "precipitation");

add("forensic-lead-na2so4", "Sodium sulfate precipitation of lead(II) sulfate",
  ["pbcl2", "na2so4"], ["pbso4", "nacl"], -28.0,
  "Isolation of lead contamination from environmental soil and paint chip leaches.", "precipitation");

add("forensic-lead-k2so4", "Potassium sulfate precipitation of lead(II) sulfate",
  ["pbcl2", "k2so4"], ["pbso4", "kcl"], -30.0,
  "Precipitation of dense white lead sulfate from chloride extracts.", "precipitation");

add("forensic-pbi2-na2s", "Sodium sulfide conversion of lead(II) iodide to black galena",
  ["pbi2", "na2s"], ["pbs", "nai"], -62.0,
  "Confirmatory color shift: yellow crystalline lead iodide spangles converting to black insoluble lead sulfide.", "metathesis");

add("forensic-pbi2-k2s", "Potassium sulfide conversion of lead(II) iodide to lead sulfide",
  ["pbi2", "k2s"], ["pbs", "ki"], -64.0,
  "Confirmatory sulfide spot test for lead identification.", "metathesis");

add("forensic-pbcl2-k2c2o4", "Potassium oxalate precipitation of lead(II) oxalate",
  ["pbcl2", "k2c2o4"], ["pbc2o4", "kcl"], -25.0,
  "Precipitation of crystalline lead oxalate from neutral chloride solution.", "precipitation");

add("forensic-pbcl2-na2c2o4", "Sodium oxalate precipitation of lead(II) oxalate",
  ["pbcl2", "na2c2o4"], ["pbc2o4", "nacl"], -24.0,
  "Metathesis yielding insoluble lead oxalate.", "precipitation");

add("forensic-pbco3-h2so4", "Sulfuric acid digestion of white lead paint pigment",
  ["pbco3", "h2so4"], ["pbso4", "co2", "water"], -65.0,
  "Forensic paint analysis: digestion of historic white lead (basic lead carbonate) releasing CO2.", "neutralization");

add("forensic-pbco3-h2s", "Hydrogen sulfide blackening of lead carbonate paint",
  ["pbco3", "h2s"], ["pbs", "co2", "water"], -72.0,
  "Art forensics & historic document aging: environmental H2S blackening white lead pigments into black PbS.", "metathesis");

add("forensic-pboh2-h2s", "Hydrogen sulfide reaction with lead(II) hydroxide",
  ["pb-oh-2", "h2s"], ["pbs", "water"], -85.0,
  "Rapid blackening detection of lead hydroxide residue upon exposure to sulfide.", "metathesis");

add("forensic-baco3-h2so4", "Sulfuric acid digestion of barium carbonate gunshot residue",
  ["baco3", "h2so4"], ["baso4", "co2", "water"], -92.0,
  "GSR primer residue analysis: converting barium carbonate into insoluble barium sulfate with effervescence.", "neutralization");

// Section 6: Heavy Metal Toxicology: Mercury (58-69)
add("forensic-mercury-copper-amalgam", "Reinsch copper wire amalgamation test for toxic mercury(II)",
  ["hgcl2", "cu"], ["cucl2", "hg"], -85.0,
  "Clinical mercury poisoning screen: metallic copper displaces mercury, forming a shiny silvery amalgam layer.", "single_displacement");

add("forensic-mercury-aqua-regia", "Aqua regia wet digestion of insoluble cinnabar mercury sulfide",
  ["hgs", "hno3", "hcl"], ["hgcl2", "no", "s", "water"], -195.0,
  "Forensic mineral digestion: oxidative dissolution of red cinnabar (HgS) to soluble mercuric chloride.", "redox_other");

add("forensic-mercury-zinc-displacement", "Metallic zinc displacement of mercury from mercuric chloride",
  ["hgcl2", "zn"], ["hg", "zncl2"], -210.0,
  "Toxicology confirmation: zinc dust reduces toxic aqueous Hg(II) to silvery liquid mercury droplets.", "single_displacement");

add("forensic-mercury-h2s-detection", "Hydrogen sulfide detection of mercuric chloride",
  ["hgcl2", "h2s"], ["hgs", "hcl"], -78.0,
  "Screening reaction: progressive white-yellow-brown-black precipitate culminating in mercuric sulfide.", "precipitation");

add("forensic-hgcl2-na2co3", "Sodium carbonate precipitation of mercury(II) oxide",
  ["hgcl2", "na2co3"], ["hgo", "nacl", "co2"], -45.0,
  "Alkaline carbonate precipitation producing yellow-orange mercuric oxide precipitate.", "precipitation");

add("forensic-hgcl2-k2co3", "Potassium carbonate precipitation of mercury(II) oxide",
  ["hgcl2", "k2co3"], ["hgo", "kcl", "co2"], -48.0,
  "Precipitation of orange basic mercuric oxide.", "precipitation");

add("forensic-hgi2-na2s", "Sodium sulfide conversion of scarlet mercuric iodide to black metacinnabar",
  ["hgi2", "na2s"], ["hgs", "nai"], -55.0,
  "Confirmatory metathesis shifting bright scarlet HgI2 to black insoluble HgS.", "metathesis");

add("forensic-hgi2-k2s", "Potassium sulfide conversion of mercuric iodide to mercuric sulfide",
  ["hgi2", "k2s"], ["hgs", "ki"], -57.0,
  "Sulfide spot test confirmation of mercury halides.", "metathesis");

add("forensic-hgs-roast", "Forensic oxidative roasting of cinnabar mineral evidence",
  ["hgs", "o2"], ["hg", "so2"], -230.0,
  "Thermal forensic assay: open-tube roasting of cinnabar releasing metallic mercury vapor and sulfur dioxide.", "combustion");

add("forensic-hg2cl2-na2s", "Sodium sulfide disproportionation of calomel (mercurous chloride)",
  ["hg2cl2", "na2s"], ["hg", "hgs", "nacl"], -68.0,
  "Sulfide testing of calomel yielding a mixture of black HgS and finely divided gray metallic mercury.", "redox_other");

add("forensic-hg2cl2-h2s", "Hydrogen sulfide disproportionation of mercurous chloride",
  ["hg2cl2", "h2s"], ["hg", "hgs", "hcl"], -62.0,
  "Qualitative detection: H2S immediately blackens calomel via simultaneous HgS precipitation and metallic Hg deposition.", "redox_other");

add("forensic-hg2cl2-cl2", "Chlorination of calomel to corrosive sublimate (mercuric chloride)",
  ["hg2cl2", "cl2"], ["hgcl2"], -110.0,
  "Oxidation converting mild insoluble calomel into highly lethal, soluble mercuric chloride.", "synthesis");

// Section 7: Heavy Metal Toxicology: Cadmium (70-78)
add("forensic-cd-nitrate-na2co3", "Sodium carbonate precipitation of cadmium carbonate from nitrate",
  ["cd-no3-2", "na2co3"], ["cdco3", "nano3"], -34.0,
  "Forensic screening: isolation of toxic cadmium from nitrate extracts.", "precipitation");

add("forensic-cadmium-k2co3", "Potassium carbonate precipitation of cadmium carbonate",
  ["cdcl2", "k2co3"], ["cdco3", "kcl"], -34.0,
  "Metathesis yielding white insoluble cadmium carbonate.", "precipitation");

add("forensic-cdcl2-h2s", "Hydrogen sulfide precipitation of cadmium sulfide from chloride",
  ["cdcl2", "h2s"], ["cds", "hcl"], -74.0,
  "Diagnostic spot test: acidic H2S precipitation of brilliant yellow cadmium sulfide (cadmium yellow).", "precipitation");

add("forensic-cdso4-k2s", "Potassium sulfide precipitation of cadmium sulfide from sulfate",
  ["cdso4", "k2s"], ["cds", "k2so4"], -90.0,
  "Environmental toxicology: rapid sulfide precipitation of toxic cadmium effluent.", "precipitation");

add("forensic-cdso4-h2s", "Hydrogen sulfide precipitation of cadmium sulfide from sulfate leach",
  ["cdso4", "h2s"], ["cds", "h2so4"], -70.0,
  "Acidic precipitation of canary-yellow CdS pigment.", "precipitation");

add("forensic-cdso4-naoh", "Sodium hydroxide precipitation of cadmium hydroxide",
  ["cdso4", "naoh"], ["cd-oh-2", "na2so4"], -42.0,
  "Alkaline precipitation of gelatinous white cadmium hydroxide.", "precipitation");

add("forensic-cdso4-na2co3", "Sodium carbonate precipitation of cadmium carbonate from sulfate",
  ["cdso4", "na2co3"], ["cdco3", "na2so4"], -30.0,
  "Precipitation of cadmium carbonate from contaminated mine runoff.", "precipitation");

add("forensic-cdco3-hcl", "Hydrochloric acid dissolution of cadmium carbonate residue",
  ["cdco3", "hcl"], ["cdcl2", "co2", "water"], -35.0,
  "Acid extraction of toxic cadmium from solid mineral or biological ash.", "neutralization");

add("forensic-cdco3-hno3", "Nitric acid dissolution of cadmium carbonate",
  ["cdco3", "hno3"], ["cd-no3-2", "co2", "water"], -38.0,
  "Nitric digestion of cadmium residues for trace elemental quantification.", "neutralization");

// Section 8: Heavy Metal Toxicology: Cadmium & Bismuth (79-88)
add("forensic-cdco3-h2so4", "Sulfuric acid dissolution of cadmium carbonate",
  ["cdco3", "h2so4"], ["cdso4", "co2", "water"], -42.0,
  "Digestion of cadmium carbonate yielding soluble cadmium sulfate.", "neutralization");

add("forensic-cdoh2-hcl", "Hydrochloric acid neutralization of cadmium hydroxide",
  ["cd-oh-2", "hcl"], ["cdcl2", "water"], -55.0,
  "Acid dissolution of precipitated cadmium hydroxide.", "neutralization");

add("forensic-cdoh2-hno3", "Nitric acid neutralization of cadmium hydroxide",
  ["cd-oh-2", "hno3"], ["cd-no3-2", "water"], -58.0,
  "Neutralization forming clear aqueous cadmium nitrate.", "neutralization");

add("forensic-cdoh2-h2so4", "Sulfuric acid neutralization of cadmium hydroxide",
  ["cd-oh-2", "h2so4"], ["cdso4", "water"], -62.0,
  "Sulfuric dissolution of cadmium hydroxide sludge.", "neutralization");

add("forensic-cdoh2-h2s", "Hydrogen sulfide conversion of cadmium hydroxide to cadmium sulfide",
  ["cd-oh-2", "h2s"], ["cds", "water"], -95.0,
  "Direct sulfide staining converting white cadmium hydroxide to vibrant yellow CdS.", "metathesis");

add("forensic-cdco3-h2s", "Hydrogen sulfide conversion of cadmium carbonate to cadmium sulfide",
  ["cdco3", "h2s"], ["cds", "co2", "water"], -82.0,
  "Sulfide gas spot test blackening/yellowing cadmium carbonate coatings.", "metathesis");

add("forensic-bismuth-oxychloride-pearl", "Water hydrolysis of bismuth trichloride to pearl white oxychloride",
  ["bicl3", "water"], ["biocl", "hcl"], -38.0,
  "Classic bismuth spot test: massive dilution with water precipitates pearlescent white BiOCl (pearl white).", "precipitation");

add("forensic-bismuth-copper-cementation", "Metallic copper cementation of bismuth from chloride solution",
  ["bicl3", "cu"], ["bi", "cucl2"], -75.0,
  "Toxicology displacement test: copper foil displaces toxic bismuth as a velvety black metallic film.", "single_displacement");

add("forensic-bismuth-nitrate-oxychloride", "Sodium chloride and water precipitation of bismuth oxychloride",
  ["bi-no3-3", "nacl", "water"], ["biocl", "nano3", "hno3"], -42.0,
  "Forensic detection: adding dilute brine to bismuth nitrate hydrolyzes out characteristic dense white BiOCl.", "precipitation");

add("forensic-bismuth-nitrate-kcl", "Potassium chloride and water precipitation of bismuth oxychloride",
  ["bi-no3-3", "kcl", "water"], ["biocl", "kno3", "hno3"], -44.0,
  "Precipitation of pearlescent white bismuth oxychloride with KCl.", "precipitation");

// Section 9: Bismuth Digestion & Toxic Alcohol Forensics (89-94)
add("forensic-bi2o3-hcl", "Hydrochloric acid digestion of bismuth(III) oxide",
  ["bi2o3", "hcl"], ["bicl3", "water"], -215.0,
  "Acid leaching of bismuth cosmetic / toxicological samples to aqueous trichloride.", "neutralization");

add("forensic-bi2o3-hno3", "Nitric acid digestion of bismuth(III) oxide",
  ["bi2o3", "hno3"], ["bi-no3-3", "water"], -230.0,
  "Nitric dissolution of bismuth trioxide to soluble nitrate.", "neutralization");

add("forensic-bi2o3-h2s", "Hydrogen sulfide precipitation of bismuth sulfide from oxide",
  ["bi2o3", "h2s"], ["bi2s3", "water"], -165.0,
  "Sulfide staining: conversion of pale yellow Bi2O3 into dark brown-black Bi2S3.", "metathesis");

add("forensic-bioh3-hcl", "Hydrochloric acid dissolution of bismuth(III) hydroxide",
  ["bi-oh-3", "hcl"], ["bicl3", "water"], -110.0,
  "Neutralization of bismuth hydroxide forming bismuth chloride.", "neutralization");

add("forensic-bioh3-h2s", "Hydrogen sulfide reaction with bismuth(III) hydroxide",
  ["bi-oh-3", "h2s"], ["bi2s3", "water"], -145.0,
  "Sulfide spot test turning white bismuth hydroxide into dark brown-black Bi2S3.", "metathesis");

add("forensic-biocl-h2s", "Hydrogen sulfide conversion of bismuth oxychloride to bismuth sulfide",
  ["biocl", "h2s"], ["bi2s3", "hcl", "water"], -120.0,
  "Diagnostic confirmation: exposure of pearl white BiOCl to H2S yields dark brown-black bismuth sulfide.", "metathesis");

// Section 10: Nephrotoxins & Gunshot Residue Identification (95-100)
add("forensic-formaldehyde-dichromate", "Potassium dichromate oxidation of formaldehyde",
  ["hcho", "k2cr2o7", "h2so4"], ["hcooh", "cr2-so4-3", "k2so4", "water"], -850.0,
  "Toxicology analysis: partial oxidation of formaldehyde to formic acid with emerald green Cr(III) color shift.", "redox_other");

add("forensic-ethylene-glycol-dichromate-oxalic", "Sodium dichromate oxidation of toxic ethylene glycol to oxalic acid",
  ["c2h6o2", "na2cr2o7", "h2so4"], ["h2c2o4", "cr2-so4-3", "na2so4", "water"], -2050.0,
  "Antifreeze poisoning model: oxidation of ethylene glycol to nephrotoxic oxalic acid with Cr(III) emerald green color shift.", "redox_other");

add("forensic-kidney-calcium-oxalate", "Calcium chloride precipitation of calcium oxalate monohydrate",
  ["h2c2o4", "cacl2"], ["cac2o4", "hcl"], -32.0,
  "Forensic post-mortem histology biomarker: precipitation of sharp envelope-shaped calcium oxalate crystals that cause fatal renal failure.", "precipitation");

add("forensic-formic-permanganate", "Permanganate oxidation of formic acid toxicant to carbon dioxide",
  ["hcooh", "kmno4", "h2so4"], ["co2", "mnso4", "k2so4", "water"], -790.0,
  "Quantitative toxicological determination of formic acid (blindness-inducing methanol metabolite).", "redox_other");

add("forensic-formaldehyde-kmno4", "Permanganate exhaustive oxidation of formaldehyde",
  ["hcho", "kmno4", "h2so4"], ["co2", "mnso4", "k2so4", "water"], -1240.0,
  "Total oxidative destruction of tissue fixative formaldehyde to carbon dioxide.", "redox_other");

add("forensic-kidney-ca-oxalate-caco3", "Oxalic acid reaction with calcium carbonate",
  ["h2c2o4", "caco3"], ["cac2o4", "co2", "water"], -45.0,
  "In vitro model of oxalic acid attacking bone and vascular calcium carbonate stores.", "neutralization");

console.log(`Domain 37 complete: ${list.length} reactions validated!`);

if (list.length === 100) {
  const code = `// Domain 37: Toxicology, Forensics & Chemical Spot Tests (100 reactions)
export const DOMAIN_37_REACTIONS = ${JSON.stringify(list, null, 2)};
`;
  fs.writeFileSync(path.join(__dirname, "domain37ToxicologyForensicSpotTests.ts"), code);
  console.log(`✓ Wrote 100 reactions to domain37ToxicologyForensicSpotTests.ts`);
} else {
  console.error(`Expected 100 reactions, but got ${list.length}`);
}
