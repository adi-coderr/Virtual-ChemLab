import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { allChemicalsMap, existingReactantSets, toBal } from "./generateBatch6.js";
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

// Read existing keys from Domains 21 to 26
for (const f of [
  "domain21Coordination.ts",
  "domain22Hydrometallurgy.ts",
  "domain23CatalysisInorganic.ts",
  "domain24PyrometallurgySmelting.ts",
  "domain25SemiconductorCVD.ts",
  "domain26ElectroplatingFinishing.ts"
]) {
  const p = path.resolve(__dirname, f);
  if (fs.existsSync(p)) {
    const content = fs.readFileSync(p, "utf8");
    const match = content.match(/"reactants":\s*(\[[^\]]+\])/g);
    if (match) {
      for (const m of match) {
        const parsed = JSON.parse(m.replace('"reactants":', "").trim());
        localKeys.add(parsed.sort().join("+"));
      }
    }
  }
}

function add(id: string, name: string, reactants: string[], products: string[], enthalpy: number, desc: string, type: string = "metathesis", effects: any[] = []) {
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
// Section 1: Forensic Blood, Chemiluminescence & Peroxidase Catalysis (14)
// =========================================================================
add("forensic-kastle-meyer-peroxidase", "Kastle-Meyer presumptive blood test: peroxidase catalytic oxidation of phenolphthalin to pink phenolphthalein",
  ["phenolphthalin", "h2o2"], ["phenolphthalein", "water"], -210.0,
  "Hemoglobin iron mimics peroxidase enzyme catalyzing rapid pink color formation within 10 seconds.");

add("forensic-luminol-chemiluminescence", "Luminol presumptive test: alkaline peroxide oxidation emitting brilliant blue chemiluminescence",
  ["luminol", "h2o2", "naoh"], ["na2-aminophthalate", "n2", "water"], -640.0,
  "Catalytic oxidation of luminol by blood hematin exciting 3-aminophthalate dianion which emits 425 nm blue photons.", "single_displacement");

add("forensic-peroxidase-sodium-iodide", "Peroxidase mimic spot test: hydrogen peroxide oxidation of sodium iodide in acid",
  ["h2o2", "nai", "h2so4"], ["i2", "na2so4", "water"], -186.0,
  "Enzymatic oxidation liberating brown iodine starch-complex indicator.", "single_displacement");

add("forensic-peroxidase-sodium-bromide", "Hydrogen peroxide oxidation of sodium bromide in sulfuric acid",
  ["h2o2", "nabr", "h2so4"], ["br2", "na2so4", "water"], -132.0,
  "Oxidative liberation of free bromine in toxicological screening.", "single_displacement");

add("forensic-peroxide-nitrite-oxidation-k", "Oxidative conversion of potassium nitrite to nitrate by hydrogen peroxide",
  ["h2o2", "kno2"], ["kno3", "water"], -145.0,
  "Forensic verification differentiating nitrites from nitrates.", "single_displacement");

add("forensic-peroxide-nitrite-oxidation-na", "Hydrogen peroxide oxidation of sodium nitrite to sodium nitrate",
  ["h2o2", "nano2"], ["nano3", "water"], -148.0,
  "Oxidative destruction confirming nitrite presence.", "single_displacement");

add("forensic-peroxide-sulfite-oxidation", "Peroxide oxidation of sodium sulfite to sulfate",
  ["h2o2", "na2so3"], ["na2so4", "water"], -320.0,
  "Rapid oxidation of preservative sulfites in food toxicology.", "single_displacement");

add("forensic-peroxide-sulfide-oxidation", "Oxidative precipitation of elemental sulfur from hydrogen sulfide by peroxide",
  ["h2o2", "h2s"], ["s", "water"], -240.0,
  "Toxicological destruction of lethal sewer gas hydrogen sulfide.", "single_displacement");

add("forensic-peroxide-thiosulfate-oxidation", "Peroxide oxidation of sodium thiosulfate in acid",
  ["h2o2", "na2s2o3"], ["na2so4", "h2so4", "water"], -780.0,
  "Neutralization of fixing agents in forensic photography.", "single_displacement");

add("forensic-copper-sulfate-nai-iodometry", "Copper iodometric assay: reduction of copper(II) sulfate by sodium iodide releasing iodine",
  ["cuso4", "nai"], ["cui", "i2", "na2so4"], -112.0,
  "Quantitative iodometric determination of copper in toxicological samples.", "redox_other");

add("forensic-copper-chloride-nai-iodometry", "Copper chloride iodometric screening with sodium iodide",
  ["cucl2", "nai"], ["cui", "i2", "nacl"], -108.0,
  "Precipitation of cuprous iodide with liberation of free iodine.", "redox_other");

add("forensic-copper-nitrate-ki-iodometry", "Copper nitrate iodometric titration with potassium iodide",
  ["cu-no3-2", "ki"], ["cui", "i2", "kno3"], -116.0,
  "Analytical assay for soluble copper poisoning.", "redox_other");

add("forensic-copper-nitrate-nai-iodometry", "Copper nitrate iodometric assay using sodium iodide",
  ["cu-no3-2", "nai"], ["cui", "i2", "nano3"], -118.0,
  "Colorimetric screening of copper residues.", "redox_other");

add("forensic-silver-sulfate-nacl", "Forensic silver recovery: precipitation of silver chloride from silver sulfate by NaCl",
  ["ag2so4", "nacl"], ["agcl", "na2so4"], -68.0,
  "Precipitation of curdy white silver chloride trace evidence.");

// =========================================================================
// Section 2: Breathalyzer & Toxicological Alcohol Screening (16)
// =========================================================================
add("forensic-breathalyzer-ethanol-na2cr2o7", "Breathalyzer test: oxidation of pulmonary ethanol vapor by acidified sodium dichromate",
  ["c2h5oh", "na2cr2o7", "h2so4"], ["ch3cooh", "cr2-so4-3", "na2so4", "water"], -955.0,
  "Color change from bright orange Cr(VI) to deep emerald green Cr(III) proportional to blood alcohol content.", "single_displacement");

add("forensic-toxicology-methanol-k2cr2o7", "Methanol poison screening: oxidation of toxic methanol to formic acid by potassium dichromate",
  ["ch3oh", "k2cr2o7", "h2so4"], ["hcooh", "cr2-so4-3", "k2so4", "water"], -880.0,
  "Detection of lethal adulterated alcohol / moonshine poisoning.", "single_displacement");

add("forensic-toxicology-methanol-na2cr2o7", "Sodium dichromate oxidation of toxic methanol in gastric lavage",
  ["ch3oh", "na2cr2o7", "h2so4"], ["hcooh", "cr2-so4-3", "na2so4", "water"], -885.0,
  "Quantitative screening for methanol ingestion.", "single_displacement");

add("forensic-alcohol-permanganate-ethanol-h2so4", "Potassium permanganate screening: acid oxidation of ethanol to acetic acid",
  ["c2h5oh", "kmno4", "h2so4"], ["ch3cooh", "mnso4", "k2so4", "water"], -1120.0,
  "Rapid color discharge from deep purple MnO4- to colorless Mn2+ in field sobriety test kit.", "single_displacement");

add("forensic-alcohol-permanganate-methanol-h2so4", "Acid permanganate oxidation of methanol to formic acid",
  ["ch3oh", "kmno4", "h2so4"], ["hcooh", "mnso4", "k2so4", "water"], -1080.0,
  "Decolorization test differentiating methanol from tertiary alcohols.", "single_displacement");

add("forensic-breathalyzer-ethanol-hcl-k2cr2o7", "Hydrochloric acid breathalyzer: oxidation of ethanol by potassium dichromate in HCl",
  ["c2h5oh", "k2cr2o7", "hcl"], ["ch3cooh", "crcl3", "kcl", "water"], -920.0,
  "Formation of violet-green chromic chloride in chloride-based breath tubes.", "single_displacement");

add("forensic-breathalyzer-ethanol-hcl-na2cr2o7", "Hydrochloric acid breathalyzer using sodium dichromate",
  ["c2h5oh", "na2cr2o7", "hcl"], ["ch3cooh", "crcl3", "nacl", "water"], -925.0,
  "Oxidation of ethanol by sodium dichromate in HCl.", "single_displacement");

add("forensic-toxicology-methanol-hcl-k2cr2o7", "Hydrochloric acid detection of methanol by potassium dichromate",
  ["ch3oh", "k2cr2o7", "hcl"], ["hcooh", "crcl3", "kcl", "water"], -850.0,
  "Toxicological colorimetric screening for methanol.", "single_displacement");

add("forensic-toxicology-methanol-hcl-na2cr2o7", "Hydrochloric acid screening of methanol by sodium dichromate",
  ["ch3oh", "na2cr2o7", "hcl"], ["hcooh", "crcl3", "nacl", "water"], -855.0,
  "Colorimetric detection of methanol.", "single_displacement");

add("forensic-alcohol-permanganate-ethanol-hcl", "Potassium permanganate oxidation of ethanol in hydrochloric acid",
  ["c2h5oh", "kmno4", "hcl"], ["ch3cooh", "mncl2", "kcl", "water"], -1050.0,
  "Purple-to-colorless redox indicator reaction.", "single_displacement");

add("forensic-alcohol-permanganate-methanol-hcl", "Hydrochloric acid permanganate oxidation of methanol to formic acid",
  ["ch3oh", "kmno4", "hcl"], ["hcooh", "mncl2", "kcl", "water"], -1020.0,
  "Rapid color discharge detecting toxic primary alcohols.", "single_displacement");

add("forensic-acetaldehyde-dichromate-oxidation-k", "Breathalyzer secondary stage: oxidation of acetaldehyde metabolite by potassium dichromate",
  ["ch3cho", "k2cr2o7", "h2so4"], ["ch3cooh", "cr2-so4-3", "k2so4", "water"], -510.0,
  "Oxidation of volatile alcohol metabolite in breath test ampoules.", "single_displacement");

add("forensic-acetaldehyde-dichromate-oxidation-na", "Oxidation of acetaldehyde by sodium dichromate in sulfuric acid",
  ["ch3cho", "na2cr2o7", "h2so4"], ["ch3cooh", "cr2-so4-3", "na2so4", "water"], -515.0,
  "Dichromate oxidation of acetaldehyde intermediate.", "single_displacement");

add("forensic-isopropanol-dichromate-k-h2so4", "Rubbing alcohol / isopropanol screening: potassium dichromate oxidation to acetone",
  ["c3h8o_iso", "k2cr2o7", "h2so4"], ["ch3coch3", "cr2-so4-3", "k2so4", "water"], -780.0,
  "Oxidation of ingested isopropanol to acetone with fruity odor and emerald green Cr(III).", "single_displacement");

add("forensic-isopropanol-dichromate-na-h2so4", "Sodium dichromate oxidation of isopropanol in gastric contents",
  ["c3h8o_iso", "na2cr2o7", "h2so4"], ["ch3coch3", "cr2-so4-3", "na2so4", "water"], -785.0,
  "Screening for toxic isopropanol ingestion.", "single_displacement");

add("forensic-isopropanol-permanganate-h2so4", "Permanganate screening of isopropanol in sulfuric acid",
  ["c3h8o_iso", "kmno4", "h2so4"], ["ch3coch3", "mnso4", "k2so4", "water"], -840.0,
  "Decolorization of permanganate by secondary alcohol.", "single_displacement");

// =========================================================================
// Section 3: Extended Aliphatic Alcohol Screening & Spot Tests (10)
// =========================================================================
add("forensic-isopropanol-dichromate-k-hcl", "Hydrochloric acid dichromate oxidation of isopropanol",
  ["c3h8o_iso", "k2cr2o7", "hcl"], ["ch3coch3", "crcl3", "kcl", "water"], -750.0,
  "Rapid colorimetric detection of isopropanol.", "single_displacement");

add("forensic-isopropanol-dichromate-na-hcl", "Hydrochloric acid sodium dichromate oxidation of isopropanol",
  ["c3h8o_iso", "na2cr2o7", "hcl"], ["ch3coch3", "crcl3", "nacl", "water"], -755.0,
  "Isopropanol screening in gastric contents.", "single_displacement");

add("forensic-isopropanol-permanganate-hcl", "Hydrochloric acid permanganate oxidation of isopropanol",
  ["c3h8o_iso", "kmno4", "hcl"], ["ch3coch3", "mncl2", "kcl", "water"], -810.0,
  "Permanganate reduction detecting secondary alcohol solvent.", "single_displacement");

add("forensic-propanol-dichromate-k-h2so4", "Potassium dichromate oxidation of 1-propanol to propionic acid",
  ["c3h8o", "k2cr2o7", "h2so4"], ["c2h5cooh", "cr2-so4-3", "k2so4", "water"], -920.0,
  "Toxicological screening of fusel oil and disinfectant n-propanol.", "single_displacement");

add("forensic-propanol-dichromate-na-h2so4", "Sodium dichromate oxidation of 1-propanol",
  ["c3h8o", "na2cr2o7", "h2so4"], ["c2h5cooh", "cr2-so4-3", "na2so4", "water"], -925.0,
  "Oxidation of 1-propanol to propionic acid.", "single_displacement");

add("forensic-propanol-permanganate-h2so4", "Acid permanganate oxidation of 1-propanol",
  ["c3h8o", "kmno4", "h2so4"], ["c2h5cooh", "mnso4", "k2so4", "water"], -1080.0,
  "Decolorization test for 1-propanol.", "single_displacement");

add("forensic-butanol-dichromate-k-h2so4", "Potassium dichromate oxidation of n-butanol to butyric acid",
  ["c4h10o", "k2cr2o7", "h2so4"], ["c3h7cooh", "cr2-so4-3", "k2so4", "water"], -940.0,
  "Screening of industrial solvent butanol in intoxication cases.", "single_displacement");

add("forensic-butanol-dichromate-na-h2so4", "Sodium dichromate oxidation of n-butanol",
  ["c4h10o", "na2cr2o7", "h2so4"], ["c3h7cooh", "cr2-so4-3", "na2so4", "water"], -945.0,
  "Conversion of 1-butanol to pungent butyric acid.", "single_displacement");

add("forensic-butanol-permanganate-h2so4", "Permanganate oxidation of n-butanol in sulfuric acid",
  ["c4h10o", "kmno4", "h2so4"], ["c3h7cooh", "mnso4", "k2so4", "water"], -1100.0,
  "Oxidative screening of higher aliphatic alcohols.", "single_displacement");

add("forensic-aspirin-aqueous-hydrolysis", "Aspirin identification: chemical hydrolysis of acetylsalicylic acid to salicylic acid",
  ["aspirin", "water"], ["salicylic-acid", "ch3cooh"], 25.0,
  "Hydrolysis liberating free salicylic acid for ferric chloride violet spot test.", "decomposition");

// =========================================================================
// Section 4: Latent Fingerprints & Trace Evidence Development (11)
// =========================================================================
add("forensic-ninhydrin-hydration-equilibrium", "Ninhydrin reagent preparation: hydration of indane-1-2-3-trione to ninhydrin monohydrate",
  ["indane-1-2-3-trione", "water"], ["ninhydrin"], -42.0,
  "Reversible hydration of yellow triketone to gem-diol ninhydrin in forensic spray solutions.", "synthesis");

add("forensic-ninhydrin-glycine-ruhemann-purple", "Ruhemann's purple development: ninhydrin reaction with amino acids on porous paper",
  ["indane-1-2-3-trione", "glycine"], ["c18h11no4_ruhemann", "co2", "hcho", "water"], -340.0,
  "Classic latent print development on paper forming deep purple-violet Ruhemann complex.", "single_displacement");

add("forensic-potassium-iodide-silver-print", "Iodine enhancement: conversion of faint silver chloride print to bright yellow silver iodide",
  ["agcl", "ki"], ["agi", "kcl"], -48.0,
  "Chemical contrast enhancement of developed silver prints.", "single_displacement");

add("forensic-sodium-iodide-silver-print", "Sodium iodide enhancement of silver chloride fingerprint impressions",
  ["agcl", "nai"], ["agi", "nacl"], -50.0,
  "Iodide displacement enhancing visibility on colored backgrounds.", "single_displacement");

add("forensic-potassium-bromide-silver-print", "Bromide conversion: transformation of silver chloride print into silver bromide",
  ["agcl", "kbr"], ["agbr", "kcl"], -28.0,
  "Chemical toning of latent print impressions.", "single_displacement");

add("forensic-sodium-bromide-silver-print", "Sodium bromide toning of silver chloride prints",
  ["agcl", "nabr"], ["agbr", "nacl"], -30.0,
  "Chemical contrast enhancement.", "single_displacement");

add("forensic-silver-sulfide-enhancement", "Ammonium sulfide toning: conversion of silver chloride print into indelible black silver sulfide",
  ["agcl", "h2s"], ["ag2s", "hcl"], -65.0,
  "Intensification of faint silver prints converting AgCl to permanent jet-black Ag2S.", "single_displacement");

add("forensic-silver-bromide-h2s", "Hydrogen sulfide toning of silver bromide latent print image",
  ["agbr", "h2s"], ["ag2s", "hbr"], -58.0,
  "Conversion of silver bromide to black silver sulfide.", "single_displacement");

add("forensic-silver-iodide-h2s", "Hydrogen sulfide conversion of silver iodide impressions",
  ["agi", "h2s"], ["ag2s", "hi"], -42.0,
  "Permanent toning of latent iodide impressions.", "single_displacement");

add("forensic-silver-bromide-ki", "Potassium iodide toning: conversion of silver bromide to silver iodide",
  ["agbr", "ki"], ["agi", "kbr"], -32.0,
  "Contrast enhancement converting pale yellow AgBr to intense yellow AgI.", "single_displacement");

add("forensic-silver-bromide-nai", "Sodium iodide toning of silver bromide impressions",
  ["agbr", "nai"], ["agi", "nabr"], -34.0,
  "Chemical displacement toning of forensic photography plates.", "single_displacement");

// =========================================================================
// Section 5: Toxic Heavy Metal Poisons (Arsenic, Bismuth, Mercury, Lead) (21)
// =========================================================================
add("forensic-marsh-test-arsenic-sulfuric", "Marsh test: forensic generation of volatile arsine gas from arsenic trioxide by zinc and acid",
  ["as2o3", "zn", "h2so4"], ["ash3", "znso4", "water"], -420.0,
  "Historical 1836 Marsh test generating arsine gas in forensic toxicology screening for homicidal poisoning.", "single_displacement");

add("forensic-marsh-test-arsenic-hcl", "Marsh test in hydrochloric acid: reduction of arsenic trioxide by mossy zinc",
  ["as2o3", "zn", "hcl"], ["ash3", "zncl2", "water"], -460.0,
  "Hydrochloric acid generation of arsine gas.", "single_displacement");

add("forensic-marsh-test-arsenic-magnesium", "Marsh test variant: rapid generation of arsine using magnesium turnings in HCl",
  ["as2o3", "mg", "hcl"], ["ash3", "mgcl2", "water"], -850.0,
  "High-rate reduction generating arsine gas.", "single_displacement");

add("forensic-gutzeit-test-silver-nitrate", "Gutzeit arsenic test: reduction of silver nitrate test paper by arsine to metallic silver",
  ["ash3", "agno3", "water"], ["as2o3", "ag", "hno3"], -620.0,
  "Colorimetric test paper forming characteristic yellow-then-black silver spot confirming arsenic.", "single_displacement");

add("forensic-mercury-stannous-calomel-reduction", "Mercury poison test: reduction of toxic corrosive sublimate (HgCl2) to white calomel precipitate",
  ["hgcl2", "sncl2"], ["hg2cl2", "sncl4"], -180.0,
  "Diagnostic forensic reduction identifying lethal mercuric chloride in biological fluids.", "single_displacement");

add("forensic-mercury-caustic-yellow-oxide", "Caustic precipitation test: precipitation of yellow mercuric oxide from toxic bichloride",
  ["hgcl2", "naoh"], ["hgo", "nacl", "water"], -95.0,
  "Identification of toxic inorganic mercury salts.");

add("forensic-hgcl2-koh", "Potassium hydroxide precipitation of yellow mercuric oxide from mercuric chloride",
  ["hgcl2", "koh"], ["hgo", "kcl", "water"], -98.0,
  "Diagnostic caustic spot test for inorganic mercury.");

add("forensic-hgcl2-nai", "Sodium iodide precipitation of scarlet red mercuric iodide",
  ["hgcl2", "nai"], ["hgi2", "nacl"], -85.0,
  "Formation of scarlet red HgI2 precipitate confirming mercury(II).");

add("forensic-hgcl2-k2s", "Potassium sulfide precipitation of black mercuric sulfide",
  ["hgcl2", "k2s"], ["hgs", "kcl"], -128.0,
  "Precipitation of insoluble black cinnabar HgS.");

add("forensic-mercuric-oxide-hcl-dissolution", "Dissolution of mercuric oxide in hydrochloric acid regenerating corrosive sublimate",
  ["hgo", "hcl"], ["hgcl2", "water"], -110.0,
  "Confirmation test in forensic heavy metal tox screening.");

add("forensic-bicl3-sulfide-black-precip", "Bismuth toxicological test: hydrogen sulfide precipitation of black bismuth(III) sulfide",
  ["bicl3", "h2s"], ["bi2s3", "hcl"], -115.0,
  "Classic qualitative separation identifying bismuth via jet-black Bi2S3 precipitate.");

add("forensic-bicl3-na2s-black-precip", "Sodium sulfide precipitation of bismuth sulfide from gastric lavage",
  ["bicl3", "na2s"], ["bi2s3", "nacl"], -145.0,
  "Precipitation confirming bismuth poisoning.");

add("forensic-bicl3-k2s-black-precip", "Potassium sulfide confirmation test for bismuth(III)",
  ["bicl3", "k2s"], ["bi2s3", "kcl"], -148.0,
  "Sulfide precipitation in heavy metal group II analytical separation.");

add("forensic-lead-iodide-yellow-precip-chloride", "Golden rain test: precipitation of bright yellow crystalline lead(II) iodide from chloride",
  ["pbcl2", "ki"], ["pbi2", "kcl"], -45.0,
  "Confirmation test for toxic lead in criminal poisonings producing shimmering golden hexagonal crystals.");

add("forensic-lead-iodide-yellow-precip-sodium", "Precipitation of lead(II) iodide by sodium iodide",
  ["pbcl2", "nai"], ["pbi2", "nacl"], -48.0,
  "Toxicological identification of plumbous ions.");

add("forensic-lead-bullet-wipe-sulfide", "Bullet wipe confirmation: reaction of lead bullet residue with sodium sulfide forming black PbS",
  ["pbcl2", "na2s"], ["pbs", "nacl"], -95.0,
  "Detection of microscopic lead bullet wipe on entry wounds and gunshot impact perimeters.");

add("forensic-pbcl2-k2cro4", "Lead chromate chrome-yellow test: reaction of lead chloride with potassium chromate",
  ["pbcl2", "k2cro4"], ["pbcro4", "kcl"], -62.0,
  "Diagnostic bright yellow precipitate identifying lead.");

add("forensic-pbcl2-na2cro4", "Sodium chromate confirmation test for lead chloride",
  ["pbcl2", "na2cro4"], ["pbcro4", "nacl"], -64.0,
  "Precipitation of bright yellow PbCrO4 in forensic toxicological digests.");

add("forensic-pbso4-ki", "Potassium iodide conversion of lead sulfate to yellow lead iodide",
  ["pbso4", "ki"], ["pbi2", "k2so4"], -38.0,
  "Confirmation of lead in battery acid and industrial poisonings.");

add("forensic-pbso4-nai", "Sodium iodide conversion of lead sulfate residue",
  ["pbso4", "nai"], ["pbi2", "na2so4"], -40.0,
  "Colorimetric verification yielding yellow PbI2.");

add("forensic-pbso4-na2s", "Conversion of insoluble lead sulfate to black lead sulfide by sodium sulfide",
  ["pbso4", "na2s"], ["pbs", "na2so4"], -92.0,
  "Bullet residue spot test on contaminated fabric.");

// =========================================================================
// Section 6: Explosives, Detonators & Gunshot Residue (GSR) (14)
// =========================================================================
add("forensic-pbso4-k2s", "Potassium sulfide confirmation test converting lead sulfate to black PbS",
  ["pbso4", "k2s"], ["pbs", "k2so4"], -95.0,
  "Chemical confirmation of lead bullet traces.");

add("forensic-lead-azide-primary-detonation", "Primary high explosive detonation: rapid adiabatic detonation of lead azide",
  ["pb-n3-2"], ["pb", "n2"], -445.0,
  "Detonation of blasting cap primer at 5200 m/s initiating secondary high explosives.", "decomposition");

add("forensic-copper-azide-detonation", "Accidental copper azide detonation: explosion of pipe/fitting azide accumulation",
  ["cu-n3-2"], ["cu", "n2"], -395.0,
  "Spontaneous friction/impact detonation of hazardous copper azide formed in brass plumbing.", "decomposition");

add("forensic-armstrong-explosive-chlorate-p4", "Armstrong's explosive mixture: shock-sensitive detonation of potassium chlorate and red phosphorus",
  ["kclo3", "p4"], ["kcl", "p4o10"], -6120.0,
  "Extremely impact-sensitive pyrotechnic cap composition detonating upon light friction or hammer blow.");

add("forensic-anfo-blasting-agent-detonation", "ANFO blasting agent: detonation of ammonium nitrate with hydrocarbon fuel",
  ["nh4no3", "ch4"], ["n2", "co2", "water"], -1850.0,
  "Commercial mining and improvised ammonium nitrate-fuel oil blasting explosive detonation.", "single_displacement");

add("forensic-chlorate-reduction-ferrous-sulfate", "Gunshot residue / explosive test: reduction of potassium chlorate by ferrous sulfate",
  ["kclo3", "feso4", "h2so4"], ["kcl", "fe2-so4-3", "water"], -1180.0,
  "Confirmation of chlorate-based improvised explosives and match-head bomb fillers.");

add("forensic-chlorate-reduction-ferrous-chloride", "Reduction of potassium chlorate by ferrous chloride in hydrochloric acid",
  ["kclo3", "fecl2", "hcl"], ["kcl", "fecl3", "water"], -1120.0,
  "Chemical destruction and titration of chlorate explosive residue.");

add("forensic-gsr-nitrite-ferrous-sulfate-k", "GSR confirmation test: reduction of potassium nitrite by ferrous sulfate in acid",
  ["kno2", "feso4", "h2so4"], ["fe2-so4-3", "no", "k2so4", "water"], -240.0,
  "Modified Griess test step generating nitric oxide gas from unburned gunpowder nitrite particles.", "single_displacement");

add("forensic-gsr-nitrite-ferrous-sulfate-na", "Reduction of sodium nitrite gunshot residue by ferrous sulfate",
  ["nano2", "feso4", "h2so4"], ["fe2-so4-3", "no", "na2so4", "water"], -245.0,
  "Identification of partially burnt propellant grain nitrites on shooter hands.", "single_displacement");

add("forensic-nitrite-iodide-oxidation-k", "Nitrite spot test: oxidation of potassium iodide by potassium nitrite in acid",
  ["kno2", "ki", "h2so4"], ["i2", "no", "k2so4", "water"], -195.0,
  "Iodine-starch blue spot test confirming nitrite in gunpowder residue.", "single_displacement");

add("forensic-barium-chromate-pyrotechnic-test", "Barium primer residue test: precipitation of yellow barium chromate from barium nitrate",
  ["ba-no3-2", "k2cro4"], ["bacro4", "kno3"], -68.0,
  "Confirmation of barium nitrate primer oxidizer in gunshot residue swabs.");

add("forensic-barium-sulfate-sulfuric-precipitation", "Precipitation of insoluble barium sulfate from barium nitrate by sulfuric acid",
  ["ba-no3-2", "h2so4"], ["baso4", "hno3"], -85.0,
  "Heavy metal primer confirmation identifying barium.");

add("forensic-barium-chloride-sulfuric-precipitation", "Precipitation of barium sulfate from barium chloride",
  ["bacl2", "h2so4"], ["baso4", "hcl"], -80.0,
  "Acid precipitation of barium sulfate.");

add("forensic-strontium-chromate-flare-test", "Strontium red flare pyrotechnic test: precipitation of yellow strontium chromate",
  ["srcl2", "k2cro4"], ["srcro4", "kcl"], -65.0,
  "Identification of strontium salts from marine distress flare arson debris.");

// =========================================================================
// Section 7: Soil, Flare, Thiocyanate & Crime Scene Salt Analysis (14)
// =========================================================================
add("forensic-strontium-sulfate-chloride-precip", "Precipitation of strontium sulfate from strontium chloride by sulfuric acid",
  ["srcl2", "h2so4"], ["srso4", "hcl"], -75.0,
  "Confirmation of strontium pyrotechnic accelerant residue.");

add("forensic-strontium-sulfate-nitrate-precip", "Precipitation of strontium sulfate from strontium nitrate flare residue",
  ["sr-no3-2", "h2so4"], ["srso4", "hno3"], -78.0,
  "Acid precipitation of strontium sulfate.");

add("forensic-thiocyanate-test-na-sulfate", "Reaction of sodium thiocyanate with iron(III) sulfate",
  ["nascn", "fe2-so4-3"], ["fe-scn-3", "na2so4"], -198.0,
  "Blood-red thiocyanatoiron(III) formation.");

add("forensic-thiocyanate-test-nh4-sulfate", "Reaction of ammonium thiocyanate with ferric sulfate",
  ["nh4scn", "fe2-so4-3"], ["fe-scn-3", "nh4-2-so4"], -192.0,
  "Deep red colorimetric spot test.");

add("forensic-thiocyanate-test-nh4-nitrate", "Reaction of ammonium thiocyanate with ferric nitrate",
  ["nh4scn", "fe-no3-3"], ["fe-scn-3", "nh4no3"], -96.0,
  "Blood-red complex test.");

add("forensic-black-powder-carbothermic-c", "Gunpowder blast: rapid deflagration of potassium chlorate by carbon",
  ["kclo3", "c"], ["kcl", "co2"], -890.0,
  "Explosive deflagration in improvised pyrotechnic devices.", "single_displacement");

add("forensic-lead-sulfate-nitric-acid-lead", "Recovery of lead from crime scene lead sulfate by sulfuric acid digest",
  ["pbno32", "h2so4"], ["pbso4", "hno3"], -65.0,
  "Acid precipitation isolating lead from toxicological digests.");

add("forensic-lead-sulfate-potassium-carbonate-metathesis", "Metathesis of insoluble lead sulfate into lead carbonate by potassium carbonate",
  ["pbso4", "k2co3"], ["pbco3", "k2so4"], -25.0,
  "Extraction of lead from battery acid burns and environmental soil samples.");

add("forensic-lead-sulfate-soda-ash-metathesis", "Metathesis of lead sulfate by sodium carbonate",
  ["pbso4", "na2co3"], ["pbco3", "na2so4"], -28.0,
  "Analytical digestion of lead sulfate residues.");

add("forensic-soil-barium-carbonate-k", "Barium pyrotechnic residue test: precipitation of barium carbonate by potassium carbonate",
  ["ba-no3-2", "k2co3"], ["baco3", "kno3"], -48.0,
  "Identification of barium carbonate in soil and pyrotechnic blast debris.");

add("forensic-soil-barium-carbonate-na", "Sodium carbonate precipitation of barium carbonate from bomb crater soil",
  ["ba-no3-2", "na2co3"], ["baco3", "nano3"], -45.0,
  "Soil extraction confirming barium contamination from explosive detonations.");

add("forensic-soil-gypsum-barium-test", "Barium precipitation test: reaction of gypsum extract with barium chloride",
  ["caso4", "bacl2"], ["baso4", "cacl2"], -18.0,
  "Forensic mineralogy distinguishing plaster/gypsum traces from drywall.");

add("forensic-lead-carbonate-sulfate-metathesis-k", "Metathesis of lead carbonate into insoluble lead sulfate by potassium sulfate",
  ["pbco3", "k2so4"], ["pbso4", "k2co3"], 15.0,
  "Chemical transformation in lead mineral forensic identification.");

add("forensic-lead-carbonate-sulfate-metathesis-na", "Metathesis of lead carbonate into lead sulfate by sodium sulfate",
  ["pbco3", "na2so4"], ["pbso4", "na2co3"], 18.0,
  "Conversion of lead carbonate into plumbous sulfate.");

console.log(`\nDomain 27 complete: ${list.length} reactions validated!`);

const outPath = path.resolve(__dirname, "domain27ForensicsColorTests.ts");
const code = `import type { ReactionDefinition } from "./types.js";

// Domain 27: Forensic Chemistry & Qualitative Color Spot Tests (100 reactions)
export const DOMAIN_27_FORENSICS_REACTIONS: ReactionDefinition[] = ${JSON.stringify(list, null, 2)};
`;

fs.writeFileSync(outPath, code, "utf8");
console.log(`✓ Wrote ${list.length} reactions to domain27ForensicsColorTests.ts\n`);
