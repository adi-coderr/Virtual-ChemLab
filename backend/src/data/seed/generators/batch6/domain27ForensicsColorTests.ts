import type { ReactionDefinition } from "./types.js";

// Domain 27: Forensic Chemistry & Qualitative Color Spot Tests (100 reactions)
export const DOMAIN_27_FORENSICS_REACTIONS: ReactionDefinition[] = [
  {
    "id": "forensic-kastle-meyer-peroxidase",
    "name": "Kastle-Meyer presumptive blood test: peroxidase catalytic oxidation of phenolphthalin to pink phenolphthalein",
    "reactants": [
      "phenolphthalin",
      "h2o2"
    ],
    "products": [
      "phenolphthalein",
      "water"
    ],
    "enthalpy": -210,
    "desc": "Hemoglobin iron mimics peroxidase enzyme catalyzing rapid pink color formation within 10 seconds.",
    "type": "metathesis",
    "effects": [],
    "net": "C20H16O4 + H2O2 → C20H14O4 + 2 H2O"
  },
  {
    "id": "forensic-luminol-chemiluminescence",
    "name": "Luminol presumptive test: alkaline peroxide oxidation emitting brilliant blue chemiluminescence",
    "reactants": [
      "luminol",
      "h2o2",
      "naoh"
    ],
    "products": [
      "na2-aminophthalate",
      "n2",
      "water"
    ],
    "enthalpy": -640,
    "desc": "Catalytic oxidation of luminol by blood hematin exciting 3-aminophthalate dianion which emits 425 nm blue photons.",
    "type": "single_displacement",
    "effects": [],
    "net": "C8H7N3O2 + 2 H2O2 + 2 NaOH → C8H5NNa2O4 + N2 + 4 H2O"
  },
  {
    "id": "forensic-peroxidase-sodium-iodide",
    "name": "Peroxidase mimic spot test: hydrogen peroxide oxidation of sodium iodide in acid",
    "reactants": [
      "h2o2",
      "nai",
      "h2so4"
    ],
    "products": [
      "i2",
      "na2so4",
      "water"
    ],
    "enthalpy": -186,
    "desc": "Enzymatic oxidation liberating brown iodine starch-complex indicator.",
    "type": "single_displacement",
    "effects": [],
    "net": "H2O2 + 2 NaI + H2SO4 → I2 + Na2SO4 + 2 H2O"
  },
  {
    "id": "forensic-peroxidase-sodium-bromide",
    "name": "Hydrogen peroxide oxidation of sodium bromide in sulfuric acid",
    "reactants": [
      "h2o2",
      "nabr",
      "h2so4"
    ],
    "products": [
      "br2",
      "na2so4",
      "water"
    ],
    "enthalpy": -132,
    "desc": "Oxidative liberation of free bromine in toxicological screening.",
    "type": "single_displacement",
    "effects": [],
    "net": "H2O2 + 2 NaBr + H2SO4 → Br2 + Na2SO4 + 2 H2O"
  },
  {
    "id": "forensic-peroxide-nitrite-oxidation-k",
    "name": "Oxidative conversion of potassium nitrite to nitrate by hydrogen peroxide",
    "reactants": [
      "h2o2",
      "kno2"
    ],
    "products": [
      "kno3",
      "water"
    ],
    "enthalpy": -145,
    "desc": "Forensic verification differentiating nitrites from nitrates.",
    "type": "single_displacement",
    "effects": [],
    "net": "H2O2 + KNO2 → KNO3 + H2O"
  },
  {
    "id": "forensic-peroxide-nitrite-oxidation-na",
    "name": "Hydrogen peroxide oxidation of sodium nitrite to sodium nitrate",
    "reactants": [
      "h2o2",
      "nano2"
    ],
    "products": [
      "nano3",
      "water"
    ],
    "enthalpy": -148,
    "desc": "Oxidative destruction confirming nitrite presence.",
    "type": "single_displacement",
    "effects": [],
    "net": "H2O2 + NaNO2 → NaNO3 + H2O"
  },
  {
    "id": "forensic-peroxide-sulfite-oxidation",
    "name": "Peroxide oxidation of sodium sulfite to sulfate",
    "reactants": [
      "h2o2",
      "na2so3"
    ],
    "products": [
      "na2so4",
      "water"
    ],
    "enthalpy": -320,
    "desc": "Rapid oxidation of preservative sulfites in food toxicology.",
    "type": "single_displacement",
    "effects": [],
    "net": "H2O2 + Na2SO3 → Na2SO4 + H2O"
  },
  {
    "id": "forensic-peroxide-sulfide-oxidation",
    "name": "Oxidative precipitation of elemental sulfur from hydrogen sulfide by peroxide",
    "reactants": [
      "h2o2",
      "h2s"
    ],
    "products": [
      "s",
      "water"
    ],
    "enthalpy": -240,
    "desc": "Toxicological destruction of lethal sewer gas hydrogen sulfide.",
    "type": "single_displacement",
    "effects": [],
    "net": "H2O2 + H2S → S + 2 H2O"
  },
  {
    "id": "forensic-peroxide-thiosulfate-oxidation",
    "name": "Peroxide oxidation of sodium thiosulfate in acid",
    "reactants": [
      "h2o2",
      "na2s2o3"
    ],
    "products": [
      "na2so4",
      "h2so4",
      "water"
    ],
    "enthalpy": -780,
    "desc": "Neutralization of fixing agents in forensic photography.",
    "type": "single_displacement",
    "effects": [],
    "net": "4 H2O2 + Na2S2O3 → Na2SO4 + H2SO4 + 3 H2O"
  },
  {
    "id": "forensic-copper-sulfate-nai-iodometry",
    "name": "Copper iodometric assay: reduction of copper(II) sulfate by sodium iodide releasing iodine",
    "reactants": [
      "cuso4",
      "nai"
    ],
    "products": [
      "cui",
      "i2",
      "na2so4"
    ],
    "enthalpy": -112,
    "desc": "Quantitative iodometric determination of copper in toxicological samples.",
    "type": "redox_other",
    "effects": [],
    "net": "2 CuSO4 + 4 NaI → 2 CuI + I2 + 2 Na2SO4"
  },
  {
    "id": "forensic-copper-chloride-nai-iodometry",
    "name": "Copper chloride iodometric screening with sodium iodide",
    "reactants": [
      "cucl2",
      "nai"
    ],
    "products": [
      "cui",
      "i2",
      "nacl"
    ],
    "enthalpy": -108,
    "desc": "Precipitation of cuprous iodide with liberation of free iodine.",
    "type": "redox_other",
    "effects": [],
    "net": "2 CuCl2 + 4 NaI → 2 CuI + I2 + 4 NaCl"
  },
  {
    "id": "forensic-copper-nitrate-ki-iodometry",
    "name": "Copper nitrate iodometric titration with potassium iodide",
    "reactants": [
      "cu-no3-2",
      "ki"
    ],
    "products": [
      "cui",
      "i2",
      "kno3"
    ],
    "enthalpy": -116,
    "desc": "Analytical assay for soluble copper poisoning.",
    "type": "redox_other",
    "effects": [],
    "net": "2 Cu(NO3)2 + 4 KI → 2 CuI + I2 + 4 KNO3"
  },
  {
    "id": "forensic-copper-nitrate-nai-iodometry",
    "name": "Copper nitrate iodometric assay using sodium iodide",
    "reactants": [
      "cu-no3-2",
      "nai"
    ],
    "products": [
      "cui",
      "i2",
      "nano3"
    ],
    "enthalpy": -118,
    "desc": "Colorimetric screening of copper residues.",
    "type": "redox_other",
    "effects": [],
    "net": "2 Cu(NO3)2 + 4 NaI → 2 CuI + I2 + 4 NaNO3"
  },
  {
    "id": "forensic-silver-sulfate-nacl",
    "name": "Forensic silver recovery: precipitation of silver chloride from silver sulfate by NaCl",
    "reactants": [
      "ag2so4",
      "nacl"
    ],
    "products": [
      "agcl",
      "na2so4"
    ],
    "enthalpy": -68,
    "desc": "Precipitation of curdy white silver chloride trace evidence.",
    "type": "metathesis",
    "effects": [],
    "net": "Ag2SO4 + 2 NaCl → 2 AgCl + Na2SO4"
  },
  {
    "id": "forensic-breathalyzer-ethanol-na2cr2o7",
    "name": "Breathalyzer test: oxidation of pulmonary ethanol vapor by acidified sodium dichromate",
    "reactants": [
      "c2h5oh",
      "na2cr2o7",
      "h2so4"
    ],
    "products": [
      "ch3cooh",
      "cr2-so4-3",
      "na2so4",
      "water"
    ],
    "enthalpy": -955,
    "desc": "Color change from bright orange Cr(VI) to deep emerald green Cr(III) proportional to blood alcohol content.",
    "type": "single_displacement",
    "effects": [],
    "net": "3 C2H5OH + 2 Na2Cr2O7 + 8 H2SO4 → 3 CH3COOH + 2 Cr2(SO4)3 + 2 Na2SO4 + 11 H2O"
  },
  {
    "id": "forensic-toxicology-methanol-k2cr2o7",
    "name": "Methanol poison screening: oxidation of toxic methanol to formic acid by potassium dichromate",
    "reactants": [
      "ch3oh",
      "k2cr2o7",
      "h2so4"
    ],
    "products": [
      "hcooh",
      "cr2-so4-3",
      "k2so4",
      "water"
    ],
    "enthalpy": -880,
    "desc": "Detection of lethal adulterated alcohol / moonshine poisoning.",
    "type": "single_displacement",
    "effects": [],
    "net": "3 CH3OH + 2 K2Cr2O7 + 8 H2SO4 → 3 HCOOH + 2 Cr2(SO4)3 + 2 K2SO4 + 11 H2O"
  },
  {
    "id": "forensic-toxicology-methanol-na2cr2o7",
    "name": "Sodium dichromate oxidation of toxic methanol in gastric lavage",
    "reactants": [
      "ch3oh",
      "na2cr2o7",
      "h2so4"
    ],
    "products": [
      "hcooh",
      "cr2-so4-3",
      "na2so4",
      "water"
    ],
    "enthalpy": -885,
    "desc": "Quantitative screening for methanol ingestion.",
    "type": "single_displacement",
    "effects": [],
    "net": "3 CH3OH + 2 Na2Cr2O7 + 8 H2SO4 → 3 HCOOH + 2 Cr2(SO4)3 + 2 Na2SO4 + 11 H2O"
  },
  {
    "id": "forensic-alcohol-permanganate-ethanol-h2so4",
    "name": "Potassium permanganate screening: acid oxidation of ethanol to acetic acid",
    "reactants": [
      "c2h5oh",
      "kmno4",
      "h2so4"
    ],
    "products": [
      "ch3cooh",
      "mnso4",
      "k2so4",
      "water"
    ],
    "enthalpy": -1120,
    "desc": "Rapid color discharge from deep purple MnO4- to colorless Mn2+ in field sobriety test kit.",
    "type": "single_displacement",
    "effects": [],
    "net": "5 C2H5OH + 4 KMnO4 + 6 H2SO4 → 5 CH3COOH + 4 MnSO4 + 2 K2SO4 + 11 H2O"
  },
  {
    "id": "forensic-alcohol-permanganate-methanol-h2so4",
    "name": "Acid permanganate oxidation of methanol to formic acid",
    "reactants": [
      "ch3oh",
      "kmno4",
      "h2so4"
    ],
    "products": [
      "hcooh",
      "mnso4",
      "k2so4",
      "water"
    ],
    "enthalpy": -1080,
    "desc": "Decolorization test differentiating methanol from tertiary alcohols.",
    "type": "single_displacement",
    "effects": [],
    "net": "5 CH3OH + 4 KMnO4 + 6 H2SO4 → 5 HCOOH + 4 MnSO4 + 2 K2SO4 + 11 H2O"
  },
  {
    "id": "forensic-breathalyzer-ethanol-hcl-k2cr2o7",
    "name": "Hydrochloric acid breathalyzer: oxidation of ethanol by potassium dichromate in HCl",
    "reactants": [
      "c2h5oh",
      "k2cr2o7",
      "hcl"
    ],
    "products": [
      "ch3cooh",
      "crcl3",
      "kcl",
      "water"
    ],
    "enthalpy": -920,
    "desc": "Formation of violet-green chromic chloride in chloride-based breath tubes.",
    "type": "single_displacement",
    "effects": [],
    "net": "3 C2H5OH + 2 K2Cr2O7 + 16 HCl → 3 CH3COOH + 4 CrCl3 + 4 KCl + 11 H2O"
  },
  {
    "id": "forensic-breathalyzer-ethanol-hcl-na2cr2o7",
    "name": "Hydrochloric acid breathalyzer using sodium dichromate",
    "reactants": [
      "c2h5oh",
      "na2cr2o7",
      "hcl"
    ],
    "products": [
      "ch3cooh",
      "crcl3",
      "nacl",
      "water"
    ],
    "enthalpy": -925,
    "desc": "Oxidation of ethanol by sodium dichromate in HCl.",
    "type": "single_displacement",
    "effects": [],
    "net": "3 C2H5OH + 2 Na2Cr2O7 + 16 HCl → 3 CH3COOH + 4 CrCl3 + 4 NaCl + 11 H2O"
  },
  {
    "id": "forensic-toxicology-methanol-hcl-k2cr2o7",
    "name": "Hydrochloric acid detection of methanol by potassium dichromate",
    "reactants": [
      "ch3oh",
      "k2cr2o7",
      "hcl"
    ],
    "products": [
      "hcooh",
      "crcl3",
      "kcl",
      "water"
    ],
    "enthalpy": -850,
    "desc": "Toxicological colorimetric screening for methanol.",
    "type": "single_displacement",
    "effects": [],
    "net": "3 CH3OH + 2 K2Cr2O7 + 16 HCl → 3 HCOOH + 4 CrCl3 + 4 KCl + 11 H2O"
  },
  {
    "id": "forensic-toxicology-methanol-hcl-na2cr2o7",
    "name": "Hydrochloric acid screening of methanol by sodium dichromate",
    "reactants": [
      "ch3oh",
      "na2cr2o7",
      "hcl"
    ],
    "products": [
      "hcooh",
      "crcl3",
      "nacl",
      "water"
    ],
    "enthalpy": -855,
    "desc": "Colorimetric detection of methanol.",
    "type": "single_displacement",
    "effects": [],
    "net": "3 CH3OH + 2 Na2Cr2O7 + 16 HCl → 3 HCOOH + 4 CrCl3 + 4 NaCl + 11 H2O"
  },
  {
    "id": "forensic-alcohol-permanganate-ethanol-hcl",
    "name": "Potassium permanganate oxidation of ethanol in hydrochloric acid",
    "reactants": [
      "c2h5oh",
      "kmno4",
      "hcl"
    ],
    "products": [
      "ch3cooh",
      "mncl2",
      "kcl",
      "water"
    ],
    "enthalpy": -1050,
    "desc": "Purple-to-colorless redox indicator reaction.",
    "type": "single_displacement",
    "effects": [],
    "net": "5 C2H5OH + 4 KMnO4 + 12 HCl → 5 CH3COOH + 4 MnCl2 + 4 KCl + 11 H2O"
  },
  {
    "id": "forensic-alcohol-permanganate-methanol-hcl",
    "name": "Hydrochloric acid permanganate oxidation of methanol to formic acid",
    "reactants": [
      "ch3oh",
      "kmno4",
      "hcl"
    ],
    "products": [
      "hcooh",
      "mncl2",
      "kcl",
      "water"
    ],
    "enthalpy": -1020,
    "desc": "Rapid color discharge detecting toxic primary alcohols.",
    "type": "single_displacement",
    "effects": [],
    "net": "5 CH3OH + 4 KMnO4 + 12 HCl → 5 HCOOH + 4 MnCl2 + 4 KCl + 11 H2O"
  },
  {
    "id": "forensic-acetaldehyde-dichromate-oxidation-k",
    "name": "Breathalyzer secondary stage: oxidation of acetaldehyde metabolite by potassium dichromate",
    "reactants": [
      "ch3cho",
      "k2cr2o7",
      "h2so4"
    ],
    "products": [
      "ch3cooh",
      "cr2-so4-3",
      "k2so4",
      "water"
    ],
    "enthalpy": -510,
    "desc": "Oxidation of volatile alcohol metabolite in breath test ampoules.",
    "type": "single_displacement",
    "effects": [],
    "net": "3 CH3CHO + K2Cr2O7 + 4 H2SO4 → 3 CH3COOH + Cr2(SO4)3 + K2SO4 + 4 H2O"
  },
  {
    "id": "forensic-acetaldehyde-dichromate-oxidation-na",
    "name": "Oxidation of acetaldehyde by sodium dichromate in sulfuric acid",
    "reactants": [
      "ch3cho",
      "na2cr2o7",
      "h2so4"
    ],
    "products": [
      "ch3cooh",
      "cr2-so4-3",
      "na2so4",
      "water"
    ],
    "enthalpy": -515,
    "desc": "Dichromate oxidation of acetaldehyde intermediate.",
    "type": "single_displacement",
    "effects": [],
    "net": "3 CH3CHO + Na2Cr2O7 + 4 H2SO4 → 3 CH3COOH + Cr2(SO4)3 + Na2SO4 + 4 H2O"
  },
  {
    "id": "forensic-isopropanol-dichromate-k-h2so4",
    "name": "Rubbing alcohol / isopropanol screening: potassium dichromate oxidation to acetone",
    "reactants": [
      "c3h8o_iso",
      "k2cr2o7",
      "h2so4"
    ],
    "products": [
      "ch3coch3",
      "cr2-so4-3",
      "k2so4",
      "water"
    ],
    "enthalpy": -780,
    "desc": "Oxidation of ingested isopropanol to acetone with fruity odor and emerald green Cr(III).",
    "type": "single_displacement",
    "effects": [],
    "net": "3 C3H8O + K2Cr2O7 + 4 H2SO4 → 3 CH3COCH3 + Cr2(SO4)3 + K2SO4 + 7 H2O"
  },
  {
    "id": "forensic-isopropanol-dichromate-na-h2so4",
    "name": "Sodium dichromate oxidation of isopropanol in gastric contents",
    "reactants": [
      "c3h8o_iso",
      "na2cr2o7",
      "h2so4"
    ],
    "products": [
      "ch3coch3",
      "cr2-so4-3",
      "na2so4",
      "water"
    ],
    "enthalpy": -785,
    "desc": "Screening for toxic isopropanol ingestion.",
    "type": "single_displacement",
    "effects": [],
    "net": "3 C3H8O + Na2Cr2O7 + 4 H2SO4 → 3 CH3COCH3 + Cr2(SO4)3 + Na2SO4 + 7 H2O"
  },
  {
    "id": "forensic-isopropanol-permanganate-h2so4",
    "name": "Permanganate screening of isopropanol in sulfuric acid",
    "reactants": [
      "c3h8o_iso",
      "kmno4",
      "h2so4"
    ],
    "products": [
      "ch3coch3",
      "mnso4",
      "k2so4",
      "water"
    ],
    "enthalpy": -840,
    "desc": "Decolorization of permanganate by secondary alcohol.",
    "type": "single_displacement",
    "effects": [],
    "net": "5 C3H8O + 2 KMnO4 + 3 H2SO4 → 5 CH3COCH3 + 2 MnSO4 + K2SO4 + 8 H2O"
  },
  {
    "id": "forensic-isopropanol-dichromate-k-hcl",
    "name": "Hydrochloric acid dichromate oxidation of isopropanol",
    "reactants": [
      "c3h8o_iso",
      "k2cr2o7",
      "hcl"
    ],
    "products": [
      "ch3coch3",
      "crcl3",
      "kcl",
      "water"
    ],
    "enthalpy": -750,
    "desc": "Rapid colorimetric detection of isopropanol.",
    "type": "single_displacement",
    "effects": [],
    "net": "3 C3H8O + K2Cr2O7 + 8 HCl → 3 CH3COCH3 + 2 CrCl3 + 2 KCl + 7 H2O"
  },
  {
    "id": "forensic-isopropanol-dichromate-na-hcl",
    "name": "Hydrochloric acid sodium dichromate oxidation of isopropanol",
    "reactants": [
      "c3h8o_iso",
      "na2cr2o7",
      "hcl"
    ],
    "products": [
      "ch3coch3",
      "crcl3",
      "nacl",
      "water"
    ],
    "enthalpy": -755,
    "desc": "Isopropanol screening in gastric contents.",
    "type": "single_displacement",
    "effects": [],
    "net": "3 C3H8O + Na2Cr2O7 + 8 HCl → 3 CH3COCH3 + 2 CrCl3 + 2 NaCl + 7 H2O"
  },
  {
    "id": "forensic-isopropanol-permanganate-hcl",
    "name": "Hydrochloric acid permanganate oxidation of isopropanol",
    "reactants": [
      "c3h8o_iso",
      "kmno4",
      "hcl"
    ],
    "products": [
      "ch3coch3",
      "mncl2",
      "kcl",
      "water"
    ],
    "enthalpy": -810,
    "desc": "Permanganate reduction detecting secondary alcohol solvent.",
    "type": "single_displacement",
    "effects": [],
    "net": "5 C3H8O + 2 KMnO4 + 6 HCl → 5 CH3COCH3 + 2 MnCl2 + 2 KCl + 8 H2O"
  },
  {
    "id": "forensic-propanol-dichromate-k-h2so4",
    "name": "Potassium dichromate oxidation of 1-propanol to propionic acid",
    "reactants": [
      "c3h8o",
      "k2cr2o7",
      "h2so4"
    ],
    "products": [
      "c2h5cooh",
      "cr2-so4-3",
      "k2so4",
      "water"
    ],
    "enthalpy": -920,
    "desc": "Toxicological screening of fusel oil and disinfectant n-propanol.",
    "type": "single_displacement",
    "effects": [],
    "net": "3 C3H8O + 2 K2Cr2O7 + 8 H2SO4 → 3 C2H5COOH + 2 Cr2(SO4)3 + 2 K2SO4 + 11 H2O"
  },
  {
    "id": "forensic-propanol-dichromate-na-h2so4",
    "name": "Sodium dichromate oxidation of 1-propanol",
    "reactants": [
      "c3h8o",
      "na2cr2o7",
      "h2so4"
    ],
    "products": [
      "c2h5cooh",
      "cr2-so4-3",
      "na2so4",
      "water"
    ],
    "enthalpy": -925,
    "desc": "Oxidation of 1-propanol to propionic acid.",
    "type": "single_displacement",
    "effects": [],
    "net": "3 C3H8O + 2 Na2Cr2O7 + 8 H2SO4 → 3 C2H5COOH + 2 Cr2(SO4)3 + 2 Na2SO4 + 11 H2O"
  },
  {
    "id": "forensic-propanol-permanganate-h2so4",
    "name": "Acid permanganate oxidation of 1-propanol",
    "reactants": [
      "c3h8o",
      "kmno4",
      "h2so4"
    ],
    "products": [
      "c2h5cooh",
      "mnso4",
      "k2so4",
      "water"
    ],
    "enthalpy": -1080,
    "desc": "Decolorization test for 1-propanol.",
    "type": "single_displacement",
    "effects": [],
    "net": "5 C3H8O + 4 KMnO4 + 6 H2SO4 → 5 C2H5COOH + 4 MnSO4 + 2 K2SO4 + 11 H2O"
  },
  {
    "id": "forensic-butanol-dichromate-k-h2so4",
    "name": "Potassium dichromate oxidation of n-butanol to butyric acid",
    "reactants": [
      "c4h10o",
      "k2cr2o7",
      "h2so4"
    ],
    "products": [
      "c3h7cooh",
      "cr2-so4-3",
      "k2so4",
      "water"
    ],
    "enthalpy": -940,
    "desc": "Screening of industrial solvent butanol in intoxication cases.",
    "type": "single_displacement",
    "effects": [],
    "net": "3 C4H10O + 2 K2Cr2O7 + 8 H2SO4 → 3 C3H7COOH + 2 Cr2(SO4)3 + 2 K2SO4 + 11 H2O"
  },
  {
    "id": "forensic-butanol-dichromate-na-h2so4",
    "name": "Sodium dichromate oxidation of n-butanol",
    "reactants": [
      "c4h10o",
      "na2cr2o7",
      "h2so4"
    ],
    "products": [
      "c3h7cooh",
      "cr2-so4-3",
      "na2so4",
      "water"
    ],
    "enthalpy": -945,
    "desc": "Conversion of 1-butanol to pungent butyric acid.",
    "type": "single_displacement",
    "effects": [],
    "net": "3 C4H10O + 2 Na2Cr2O7 + 8 H2SO4 → 3 C3H7COOH + 2 Cr2(SO4)3 + 2 Na2SO4 + 11 H2O"
  },
  {
    "id": "forensic-butanol-permanganate-h2so4",
    "name": "Permanganate oxidation of n-butanol in sulfuric acid",
    "reactants": [
      "c4h10o",
      "kmno4",
      "h2so4"
    ],
    "products": [
      "c3h7cooh",
      "mnso4",
      "k2so4",
      "water"
    ],
    "enthalpy": -1100,
    "desc": "Oxidative screening of higher aliphatic alcohols.",
    "type": "single_displacement",
    "effects": [],
    "net": "5 C4H10O + 4 KMnO4 + 6 H2SO4 → 5 C3H7COOH + 4 MnSO4 + 2 K2SO4 + 11 H2O"
  },
  {
    "id": "forensic-aspirin-aqueous-hydrolysis",
    "name": "Aspirin identification: chemical hydrolysis of acetylsalicylic acid to salicylic acid",
    "reactants": [
      "aspirin",
      "water"
    ],
    "products": [
      "salicylic-acid",
      "ch3cooh"
    ],
    "enthalpy": 25,
    "desc": "Hydrolysis liberating free salicylic acid for ferric chloride violet spot test.",
    "type": "decomposition",
    "effects": [],
    "net": "C9H8O4 + H2O → C7H6O3 + CH3COOH"
  },
  {
    "id": "forensic-ninhydrin-hydration-equilibrium",
    "name": "Ninhydrin reagent preparation: hydration of indane-1-2-3-trione to ninhydrin monohydrate",
    "reactants": [
      "indane-1-2-3-trione",
      "water"
    ],
    "products": [
      "ninhydrin"
    ],
    "enthalpy": -42,
    "desc": "Reversible hydration of yellow triketone to gem-diol ninhydrin in forensic spray solutions.",
    "type": "synthesis",
    "effects": [],
    "net": "C9H4O3 + H2O → C9H6O4"
  },
  {
    "id": "forensic-ninhydrin-glycine-ruhemann-purple",
    "name": "Ruhemann's purple development: ninhydrin reaction with amino acids on porous paper",
    "reactants": [
      "indane-1-2-3-trione",
      "glycine"
    ],
    "products": [
      "c18h11no4_ruhemann",
      "co2",
      "hcho",
      "water"
    ],
    "enthalpy": -340,
    "desc": "Classic latent print development on paper forming deep purple-violet Ruhemann complex.",
    "type": "single_displacement",
    "effects": [],
    "net": "4 C9H4O3 + 2 C2H5NO2 → 2 C18H11NO4 + 3 CO2 + HCHO + H2O"
  },
  {
    "id": "forensic-potassium-iodide-silver-print",
    "name": "Iodine enhancement: conversion of faint silver chloride print to bright yellow silver iodide",
    "reactants": [
      "agcl",
      "ki"
    ],
    "products": [
      "agi",
      "kcl"
    ],
    "enthalpy": -48,
    "desc": "Chemical contrast enhancement of developed silver prints.",
    "type": "single_displacement",
    "effects": [],
    "net": "AgCl + KI → AgI + KCl"
  },
  {
    "id": "forensic-sodium-iodide-silver-print",
    "name": "Sodium iodide enhancement of silver chloride fingerprint impressions",
    "reactants": [
      "agcl",
      "nai"
    ],
    "products": [
      "agi",
      "nacl"
    ],
    "enthalpy": -50,
    "desc": "Iodide displacement enhancing visibility on colored backgrounds.",
    "type": "single_displacement",
    "effects": [],
    "net": "AgCl + NaI → AgI + NaCl"
  },
  {
    "id": "forensic-potassium-bromide-silver-print",
    "name": "Bromide conversion: transformation of silver chloride print into silver bromide",
    "reactants": [
      "agcl",
      "kbr"
    ],
    "products": [
      "agbr",
      "kcl"
    ],
    "enthalpy": -28,
    "desc": "Chemical toning of latent print impressions.",
    "type": "single_displacement",
    "effects": [],
    "net": "AgCl + KBr → AgBr + KCl"
  },
  {
    "id": "forensic-sodium-bromide-silver-print",
    "name": "Sodium bromide toning of silver chloride prints",
    "reactants": [
      "agcl",
      "nabr"
    ],
    "products": [
      "agbr",
      "nacl"
    ],
    "enthalpy": -30,
    "desc": "Chemical contrast enhancement.",
    "type": "single_displacement",
    "effects": [],
    "net": "AgCl + NaBr → AgBr + NaCl"
  },
  {
    "id": "forensic-silver-sulfide-enhancement",
    "name": "Ammonium sulfide toning: conversion of silver chloride print into indelible black silver sulfide",
    "reactants": [
      "agcl",
      "h2s"
    ],
    "products": [
      "ag2s",
      "hcl"
    ],
    "enthalpy": -65,
    "desc": "Intensification of faint silver prints converting AgCl to permanent jet-black Ag2S.",
    "type": "single_displacement",
    "effects": [],
    "net": "2 AgCl + H2S → Ag2S + 2 HCl"
  },
  {
    "id": "forensic-silver-bromide-h2s",
    "name": "Hydrogen sulfide toning of silver bromide latent print image",
    "reactants": [
      "agbr",
      "h2s"
    ],
    "products": [
      "ag2s",
      "hbr"
    ],
    "enthalpy": -58,
    "desc": "Conversion of silver bromide to black silver sulfide.",
    "type": "single_displacement",
    "effects": [],
    "net": "2 AgBr + H2S → Ag2S + 2 HBr"
  },
  {
    "id": "forensic-silver-iodide-h2s",
    "name": "Hydrogen sulfide conversion of silver iodide impressions",
    "reactants": [
      "agi",
      "h2s"
    ],
    "products": [
      "ag2s",
      "hi"
    ],
    "enthalpy": -42,
    "desc": "Permanent toning of latent iodide impressions.",
    "type": "single_displacement",
    "effects": [],
    "net": "2 AgI + H2S → Ag2S + 2 HI"
  },
  {
    "id": "forensic-silver-bromide-ki",
    "name": "Potassium iodide toning: conversion of silver bromide to silver iodide",
    "reactants": [
      "agbr",
      "ki"
    ],
    "products": [
      "agi",
      "kbr"
    ],
    "enthalpy": -32,
    "desc": "Contrast enhancement converting pale yellow AgBr to intense yellow AgI.",
    "type": "single_displacement",
    "effects": [],
    "net": "AgBr + KI → AgI + KBr"
  },
  {
    "id": "forensic-silver-bromide-nai",
    "name": "Sodium iodide toning of silver bromide impressions",
    "reactants": [
      "agbr",
      "nai"
    ],
    "products": [
      "agi",
      "nabr"
    ],
    "enthalpy": -34,
    "desc": "Chemical displacement toning of forensic photography plates.",
    "type": "single_displacement",
    "effects": [],
    "net": "AgBr + NaI → AgI + NaBr"
  },
  {
    "id": "forensic-marsh-test-arsenic-sulfuric",
    "name": "Marsh test: forensic generation of volatile arsine gas from arsenic trioxide by zinc and acid",
    "reactants": [
      "as2o3",
      "zn",
      "h2so4"
    ],
    "products": [
      "ash3",
      "znso4",
      "water"
    ],
    "enthalpy": -420,
    "desc": "Historical 1836 Marsh test generating arsine gas in forensic toxicology screening for homicidal poisoning.",
    "type": "single_displacement",
    "effects": [],
    "net": "As2O3 + 6 Zn + 6 H2SO4 → 2 AsH3 + 6 ZnSO4 + 3 H2O"
  },
  {
    "id": "forensic-marsh-test-arsenic-hcl",
    "name": "Marsh test in hydrochloric acid: reduction of arsenic trioxide by mossy zinc",
    "reactants": [
      "as2o3",
      "zn",
      "hcl"
    ],
    "products": [
      "ash3",
      "zncl2",
      "water"
    ],
    "enthalpy": -460,
    "desc": "Hydrochloric acid generation of arsine gas.",
    "type": "single_displacement",
    "effects": [],
    "net": "As2O3 + 6 Zn + 12 HCl → 2 AsH3 + 6 ZnCl2 + 3 H2O"
  },
  {
    "id": "forensic-marsh-test-arsenic-magnesium",
    "name": "Marsh test variant: rapid generation of arsine using magnesium turnings in HCl",
    "reactants": [
      "as2o3",
      "mg",
      "hcl"
    ],
    "products": [
      "ash3",
      "mgcl2",
      "water"
    ],
    "enthalpy": -850,
    "desc": "High-rate reduction generating arsine gas.",
    "type": "single_displacement",
    "effects": [],
    "net": "As2O3 + 6 Mg + 12 HCl → 2 AsH3 + 6 MgCl2 + 3 H2O"
  },
  {
    "id": "forensic-gutzeit-test-silver-nitrate",
    "name": "Gutzeit arsenic test: reduction of silver nitrate test paper by arsine to metallic silver",
    "reactants": [
      "ash3",
      "agno3",
      "water"
    ],
    "products": [
      "as2o3",
      "ag",
      "hno3"
    ],
    "enthalpy": -620,
    "desc": "Colorimetric test paper forming characteristic yellow-then-black silver spot confirming arsenic.",
    "type": "single_displacement",
    "effects": [],
    "net": "2 AsH3 + 12 AgNO3 + 3 H2O → As2O3 + 12 Ag + 12 HNO3"
  },
  {
    "id": "forensic-mercury-stannous-calomel-reduction",
    "name": "Mercury poison test: reduction of toxic corrosive sublimate (HgCl2) to white calomel precipitate",
    "reactants": [
      "hgcl2",
      "sncl2"
    ],
    "products": [
      "hg2cl2",
      "sncl4"
    ],
    "enthalpy": -180,
    "desc": "Diagnostic forensic reduction identifying lethal mercuric chloride in biological fluids.",
    "type": "single_displacement",
    "effects": [],
    "net": "2 HgCl2 + SnCl2 → Hg2Cl2 + SnCl4"
  },
  {
    "id": "forensic-mercury-caustic-yellow-oxide",
    "name": "Caustic precipitation test: precipitation of yellow mercuric oxide from toxic bichloride",
    "reactants": [
      "hgcl2",
      "naoh"
    ],
    "products": [
      "hgo",
      "nacl",
      "water"
    ],
    "enthalpy": -95,
    "desc": "Identification of toxic inorganic mercury salts.",
    "type": "metathesis",
    "effects": [],
    "net": "HgCl2 + 2 NaOH → HgO + 2 NaCl + H2O"
  },
  {
    "id": "forensic-hgcl2-koh",
    "name": "Potassium hydroxide precipitation of yellow mercuric oxide from mercuric chloride",
    "reactants": [
      "hgcl2",
      "koh"
    ],
    "products": [
      "hgo",
      "kcl",
      "water"
    ],
    "enthalpy": -98,
    "desc": "Diagnostic caustic spot test for inorganic mercury.",
    "type": "metathesis",
    "effects": [],
    "net": "HgCl2 + 2 KOH → HgO + 2 KCl + H2O"
  },
  {
    "id": "forensic-hgcl2-nai",
    "name": "Sodium iodide precipitation of scarlet red mercuric iodide",
    "reactants": [
      "hgcl2",
      "nai"
    ],
    "products": [
      "hgi2",
      "nacl"
    ],
    "enthalpy": -85,
    "desc": "Formation of scarlet red HgI2 precipitate confirming mercury(II).",
    "type": "metathesis",
    "effects": [],
    "net": "HgCl2 + 2 NaI → HgI2 + 2 NaCl"
  },
  {
    "id": "forensic-hgcl2-k2s",
    "name": "Potassium sulfide precipitation of black mercuric sulfide",
    "reactants": [
      "hgcl2",
      "k2s"
    ],
    "products": [
      "hgs",
      "kcl"
    ],
    "enthalpy": -128,
    "desc": "Precipitation of insoluble black cinnabar HgS.",
    "type": "metathesis",
    "effects": [],
    "net": "HgCl2 + K2S → HgS + 2 KCl"
  },
  {
    "id": "forensic-mercuric-oxide-hcl-dissolution",
    "name": "Dissolution of mercuric oxide in hydrochloric acid regenerating corrosive sublimate",
    "reactants": [
      "hgo",
      "hcl"
    ],
    "products": [
      "hgcl2",
      "water"
    ],
    "enthalpy": -110,
    "desc": "Confirmation test in forensic heavy metal tox screening.",
    "type": "metathesis",
    "effects": [],
    "net": "HgO + 2 HCl → HgCl2 + H2O"
  },
  {
    "id": "forensic-bicl3-sulfide-black-precip",
    "name": "Bismuth toxicological test: hydrogen sulfide precipitation of black bismuth(III) sulfide",
    "reactants": [
      "bicl3",
      "h2s"
    ],
    "products": [
      "bi2s3",
      "hcl"
    ],
    "enthalpy": -115,
    "desc": "Classic qualitative separation identifying bismuth via jet-black Bi2S3 precipitate.",
    "type": "metathesis",
    "effects": [],
    "net": "2 BiCl3 + 3 H2S → Bi2S3 + 6 HCl"
  },
  {
    "id": "forensic-bicl3-na2s-black-precip",
    "name": "Sodium sulfide precipitation of bismuth sulfide from gastric lavage",
    "reactants": [
      "bicl3",
      "na2s"
    ],
    "products": [
      "bi2s3",
      "nacl"
    ],
    "enthalpy": -145,
    "desc": "Precipitation confirming bismuth poisoning.",
    "type": "metathesis",
    "effects": [],
    "net": "2 BiCl3 + 3 Na2S → Bi2S3 + 6 NaCl"
  },
  {
    "id": "forensic-bicl3-k2s-black-precip",
    "name": "Potassium sulfide confirmation test for bismuth(III)",
    "reactants": [
      "bicl3",
      "k2s"
    ],
    "products": [
      "bi2s3",
      "kcl"
    ],
    "enthalpy": -148,
    "desc": "Sulfide precipitation in heavy metal group II analytical separation.",
    "type": "metathesis",
    "effects": [],
    "net": "2 BiCl3 + 3 K2S → Bi2S3 + 6 KCl"
  },
  {
    "id": "forensic-lead-iodide-yellow-precip-chloride",
    "name": "Golden rain test: precipitation of bright yellow crystalline lead(II) iodide from chloride",
    "reactants": [
      "pbcl2",
      "ki"
    ],
    "products": [
      "pbi2",
      "kcl"
    ],
    "enthalpy": -45,
    "desc": "Confirmation test for toxic lead in criminal poisonings producing shimmering golden hexagonal crystals.",
    "type": "metathesis",
    "effects": [],
    "net": "PbCl2 + 2 KI → PbI2 + 2 KCl"
  },
  {
    "id": "forensic-lead-iodide-yellow-precip-sodium",
    "name": "Precipitation of lead(II) iodide by sodium iodide",
    "reactants": [
      "pbcl2",
      "nai"
    ],
    "products": [
      "pbi2",
      "nacl"
    ],
    "enthalpy": -48,
    "desc": "Toxicological identification of plumbous ions.",
    "type": "metathesis",
    "effects": [],
    "net": "PbCl2 + 2 NaI → PbI2 + 2 NaCl"
  },
  {
    "id": "forensic-lead-bullet-wipe-sulfide",
    "name": "Bullet wipe confirmation: reaction of lead bullet residue with sodium sulfide forming black PbS",
    "reactants": [
      "pbcl2",
      "na2s"
    ],
    "products": [
      "pbs",
      "nacl"
    ],
    "enthalpy": -95,
    "desc": "Detection of microscopic lead bullet wipe on entry wounds and gunshot impact perimeters.",
    "type": "metathesis",
    "effects": [],
    "net": "PbCl2 + Na2S → PbS + 2 NaCl"
  },
  {
    "id": "forensic-pbcl2-k2cro4",
    "name": "Lead chromate chrome-yellow test: reaction of lead chloride with potassium chromate",
    "reactants": [
      "pbcl2",
      "k2cro4"
    ],
    "products": [
      "pbcro4",
      "kcl"
    ],
    "enthalpy": -62,
    "desc": "Diagnostic bright yellow precipitate identifying lead.",
    "type": "metathesis",
    "effects": [],
    "net": "PbCl2 + K2CrO4 → PbCrO4 + 2 KCl"
  },
  {
    "id": "forensic-pbcl2-na2cro4",
    "name": "Sodium chromate confirmation test for lead chloride",
    "reactants": [
      "pbcl2",
      "na2cro4"
    ],
    "products": [
      "pbcro4",
      "nacl"
    ],
    "enthalpy": -64,
    "desc": "Precipitation of bright yellow PbCrO4 in forensic toxicological digests.",
    "type": "metathesis",
    "effects": [],
    "net": "PbCl2 + Na2CrO4 → PbCrO4 + 2 NaCl"
  },
  {
    "id": "forensic-pbso4-ki",
    "name": "Potassium iodide conversion of lead sulfate to yellow lead iodide",
    "reactants": [
      "pbso4",
      "ki"
    ],
    "products": [
      "pbi2",
      "k2so4"
    ],
    "enthalpy": -38,
    "desc": "Confirmation of lead in battery acid and industrial poisonings.",
    "type": "metathesis",
    "effects": [],
    "net": "PbSO4 + 2 KI → PbI2 + K2SO4"
  },
  {
    "id": "forensic-pbso4-nai",
    "name": "Sodium iodide conversion of lead sulfate residue",
    "reactants": [
      "pbso4",
      "nai"
    ],
    "products": [
      "pbi2",
      "na2so4"
    ],
    "enthalpy": -40,
    "desc": "Colorimetric verification yielding yellow PbI2.",
    "type": "metathesis",
    "effects": [],
    "net": "PbSO4 + 2 NaI → PbI2 + Na2SO4"
  },
  {
    "id": "forensic-pbso4-na2s",
    "name": "Conversion of insoluble lead sulfate to black lead sulfide by sodium sulfide",
    "reactants": [
      "pbso4",
      "na2s"
    ],
    "products": [
      "pbs",
      "na2so4"
    ],
    "enthalpy": -92,
    "desc": "Bullet residue spot test on contaminated fabric.",
    "type": "metathesis",
    "effects": [],
    "net": "PbSO4 + Na2S → PbS + Na2SO4"
  },
  {
    "id": "forensic-pbso4-k2s",
    "name": "Potassium sulfide confirmation test converting lead sulfate to black PbS",
    "reactants": [
      "pbso4",
      "k2s"
    ],
    "products": [
      "pbs",
      "k2so4"
    ],
    "enthalpy": -95,
    "desc": "Chemical confirmation of lead bullet traces.",
    "type": "metathesis",
    "effects": [],
    "net": "PbSO4 + K2S → PbS + K2SO4"
  },
  {
    "id": "forensic-lead-azide-primary-detonation",
    "name": "Primary high explosive detonation: rapid adiabatic detonation of lead azide",
    "reactants": [
      "pb-n3-2"
    ],
    "products": [
      "pb",
      "n2"
    ],
    "enthalpy": -445,
    "desc": "Detonation of blasting cap primer at 5200 m/s initiating secondary high explosives.",
    "type": "decomposition",
    "effects": [],
    "net": "Pb(N3)2 → Pb + 3 N2"
  },
  {
    "id": "forensic-copper-azide-detonation",
    "name": "Accidental copper azide detonation: explosion of pipe/fitting azide accumulation",
    "reactants": [
      "cu-n3-2"
    ],
    "products": [
      "cu",
      "n2"
    ],
    "enthalpy": -395,
    "desc": "Spontaneous friction/impact detonation of hazardous copper azide formed in brass plumbing.",
    "type": "decomposition",
    "effects": [],
    "net": "Cu(N3)2 → Cu + 3 N2"
  },
  {
    "id": "forensic-armstrong-explosive-chlorate-p4",
    "name": "Armstrong's explosive mixture: shock-sensitive detonation of potassium chlorate and red phosphorus",
    "reactants": [
      "kclo3",
      "p4"
    ],
    "products": [
      "kcl",
      "p4o10"
    ],
    "enthalpy": -6120,
    "desc": "Extremely impact-sensitive pyrotechnic cap composition detonating upon light friction or hammer blow.",
    "type": "metathesis",
    "effects": [],
    "net": "10 KClO3 + 3 P4 → 10 KCl + 3 P4O10"
  },
  {
    "id": "forensic-anfo-blasting-agent-detonation",
    "name": "ANFO blasting agent: detonation of ammonium nitrate with hydrocarbon fuel",
    "reactants": [
      "nh4no3",
      "ch4"
    ],
    "products": [
      "n2",
      "co2",
      "water"
    ],
    "enthalpy": -1850,
    "desc": "Commercial mining and improvised ammonium nitrate-fuel oil blasting explosive detonation.",
    "type": "single_displacement",
    "effects": [],
    "net": "4 NH4NO3 + CH4 → 4 N2 + CO2 + 10 H2O"
  },
  {
    "id": "forensic-chlorate-reduction-ferrous-sulfate",
    "name": "Gunshot residue / explosive test: reduction of potassium chlorate by ferrous sulfate",
    "reactants": [
      "kclo3",
      "feso4",
      "h2so4"
    ],
    "products": [
      "kcl",
      "fe2-so4-3",
      "water"
    ],
    "enthalpy": -1180,
    "desc": "Confirmation of chlorate-based improvised explosives and match-head bomb fillers.",
    "type": "metathesis",
    "effects": [],
    "net": "KClO3 + 6 FeSO4 + 3 H2SO4 → KCl + 3 Fe2(SO4)3 + 3 H2O"
  },
  {
    "id": "forensic-chlorate-reduction-ferrous-chloride",
    "name": "Reduction of potassium chlorate by ferrous chloride in hydrochloric acid",
    "reactants": [
      "kclo3",
      "fecl2",
      "hcl"
    ],
    "products": [
      "kcl",
      "fecl3",
      "water"
    ],
    "enthalpy": -1120,
    "desc": "Chemical destruction and titration of chlorate explosive residue.",
    "type": "metathesis",
    "effects": [],
    "net": "KClO3 + 6 FeCl2 + 6 HCl → KCl + 6 FeCl3 + 3 H2O"
  },
  {
    "id": "forensic-gsr-nitrite-ferrous-sulfate-k",
    "name": "GSR confirmation test: reduction of potassium nitrite by ferrous sulfate in acid",
    "reactants": [
      "kno2",
      "feso4",
      "h2so4"
    ],
    "products": [
      "fe2-so4-3",
      "no",
      "k2so4",
      "water"
    ],
    "enthalpy": -240,
    "desc": "Modified Griess test step generating nitric oxide gas from unburned gunpowder nitrite particles.",
    "type": "single_displacement",
    "effects": [],
    "net": "2 KNO2 + 2 FeSO4 + 2 H2SO4 → Fe2(SO4)3 + 2 NO + K2SO4 + 2 H2O"
  },
  {
    "id": "forensic-gsr-nitrite-ferrous-sulfate-na",
    "name": "Reduction of sodium nitrite gunshot residue by ferrous sulfate",
    "reactants": [
      "nano2",
      "feso4",
      "h2so4"
    ],
    "products": [
      "fe2-so4-3",
      "no",
      "na2so4",
      "water"
    ],
    "enthalpy": -245,
    "desc": "Identification of partially burnt propellant grain nitrites on shooter hands.",
    "type": "single_displacement",
    "effects": [],
    "net": "2 NaNO2 + 2 FeSO4 + 2 H2SO4 → Fe2(SO4)3 + 2 NO + Na2SO4 + 2 H2O"
  },
  {
    "id": "forensic-nitrite-iodide-oxidation-k",
    "name": "Nitrite spot test: oxidation of potassium iodide by potassium nitrite in acid",
    "reactants": [
      "kno2",
      "ki",
      "h2so4"
    ],
    "products": [
      "i2",
      "no",
      "k2so4",
      "water"
    ],
    "enthalpy": -195,
    "desc": "Iodine-starch blue spot test confirming nitrite in gunpowder residue.",
    "type": "single_displacement",
    "effects": [],
    "net": "2 KNO2 + 2 KI + 2 H2SO4 → I2 + 2 NO + 2 K2SO4 + 2 H2O"
  },
  {
    "id": "forensic-barium-chromate-pyrotechnic-test",
    "name": "Barium primer residue test: precipitation of yellow barium chromate from barium nitrate",
    "reactants": [
      "ba-no3-2",
      "k2cro4"
    ],
    "products": [
      "bacro4",
      "kno3"
    ],
    "enthalpy": -68,
    "desc": "Confirmation of barium nitrate primer oxidizer in gunshot residue swabs.",
    "type": "metathesis",
    "effects": [],
    "net": "BaN2O6 + K2CrO4 → BaCrO4 + 2 KNO3"
  },
  {
    "id": "forensic-barium-sulfate-sulfuric-precipitation",
    "name": "Precipitation of insoluble barium sulfate from barium nitrate by sulfuric acid",
    "reactants": [
      "ba-no3-2",
      "h2so4"
    ],
    "products": [
      "baso4",
      "hno3"
    ],
    "enthalpy": -85,
    "desc": "Heavy metal primer confirmation identifying barium.",
    "type": "metathesis",
    "effects": [],
    "net": "BaN2O6 + H2SO4 → BaSO4 + 2 HNO3"
  },
  {
    "id": "forensic-barium-chloride-sulfuric-precipitation",
    "name": "Precipitation of barium sulfate from barium chloride",
    "reactants": [
      "bacl2",
      "h2so4"
    ],
    "products": [
      "baso4",
      "hcl"
    ],
    "enthalpy": -80,
    "desc": "Acid precipitation of barium sulfate.",
    "type": "metathesis",
    "effects": [],
    "net": "BaCl2 + H2SO4 → BaSO4 + 2 HCl"
  },
  {
    "id": "forensic-strontium-chromate-flare-test",
    "name": "Strontium red flare pyrotechnic test: precipitation of yellow strontium chromate",
    "reactants": [
      "srcl2",
      "k2cro4"
    ],
    "products": [
      "srcro4",
      "kcl"
    ],
    "enthalpy": -65,
    "desc": "Identification of strontium salts from marine distress flare arson debris.",
    "type": "metathesis",
    "effects": [],
    "net": "SrCl2 + K2CrO4 → SrCrO4 + 2 KCl"
  },
  {
    "id": "forensic-strontium-sulfate-chloride-precip",
    "name": "Precipitation of strontium sulfate from strontium chloride by sulfuric acid",
    "reactants": [
      "srcl2",
      "h2so4"
    ],
    "products": [
      "srso4",
      "hcl"
    ],
    "enthalpy": -75,
    "desc": "Confirmation of strontium pyrotechnic accelerant residue.",
    "type": "metathesis",
    "effects": [],
    "net": "SrCl2 + H2SO4 → SrSO4 + 2 HCl"
  },
  {
    "id": "forensic-strontium-sulfate-nitrate-precip",
    "name": "Precipitation of strontium sulfate from strontium nitrate flare residue",
    "reactants": [
      "sr-no3-2",
      "h2so4"
    ],
    "products": [
      "srso4",
      "hno3"
    ],
    "enthalpy": -78,
    "desc": "Acid precipitation of strontium sulfate.",
    "type": "metathesis",
    "effects": [],
    "net": "Sr(NO3)2 + H2SO4 → SrSO4 + 2 HNO3"
  },
  {
    "id": "forensic-thiocyanate-test-na-sulfate",
    "name": "Reaction of sodium thiocyanate with iron(III) sulfate",
    "reactants": [
      "nascn",
      "fe2-so4-3"
    ],
    "products": [
      "fe-scn-3",
      "na2so4"
    ],
    "enthalpy": -198,
    "desc": "Blood-red thiocyanatoiron(III) formation.",
    "type": "metathesis",
    "effects": [],
    "net": "6 NaSCN + Fe2(SO4)3 → 2 Fe(SCN)3 + 3 Na2SO4"
  },
  {
    "id": "forensic-thiocyanate-test-nh4-sulfate",
    "name": "Reaction of ammonium thiocyanate with ferric sulfate",
    "reactants": [
      "nh4scn",
      "fe2-so4-3"
    ],
    "products": [
      "fe-scn-3",
      "nh4-2-so4"
    ],
    "enthalpy": -192,
    "desc": "Deep red colorimetric spot test.",
    "type": "metathesis",
    "effects": [],
    "net": "6 NH4SCN + Fe2(SO4)3 → 2 Fe(SCN)3 + 3 (NH4)2SO4"
  },
  {
    "id": "forensic-thiocyanate-test-nh4-nitrate",
    "name": "Reaction of ammonium thiocyanate with ferric nitrate",
    "reactants": [
      "nh4scn",
      "fe-no3-3"
    ],
    "products": [
      "fe-scn-3",
      "nh4no3"
    ],
    "enthalpy": -96,
    "desc": "Blood-red complex test.",
    "type": "metathesis",
    "effects": [],
    "net": "3 NH4SCN + Fe(NO3)3 → Fe(SCN)3 + 3 NH4NO3"
  },
  {
    "id": "forensic-black-powder-carbothermic-c",
    "name": "Gunpowder blast: rapid deflagration of potassium chlorate by carbon",
    "reactants": [
      "kclo3",
      "c"
    ],
    "products": [
      "kcl",
      "co2"
    ],
    "enthalpy": -890,
    "desc": "Explosive deflagration in improvised pyrotechnic devices.",
    "type": "single_displacement",
    "effects": [],
    "net": "2 KClO3 + 3 C → 2 KCl + 3 CO2"
  },
  {
    "id": "forensic-lead-sulfate-nitric-acid-lead",
    "name": "Recovery of lead from crime scene lead sulfate by sulfuric acid digest",
    "reactants": [
      "pbno32",
      "h2so4"
    ],
    "products": [
      "pbso4",
      "hno3"
    ],
    "enthalpy": -65,
    "desc": "Acid precipitation isolating lead from toxicological digests.",
    "type": "metathesis",
    "effects": [],
    "net": "Pb(NO3)2 + H2SO4 → PbSO4 + 2 HNO3"
  },
  {
    "id": "forensic-lead-sulfate-potassium-carbonate-metathesis",
    "name": "Metathesis of insoluble lead sulfate into lead carbonate by potassium carbonate",
    "reactants": [
      "pbso4",
      "k2co3"
    ],
    "products": [
      "pbco3",
      "k2so4"
    ],
    "enthalpy": -25,
    "desc": "Extraction of lead from battery acid burns and environmental soil samples.",
    "type": "metathesis",
    "effects": [],
    "net": "PbSO4 + K2CO3 → PbCO3 + K2SO4"
  },
  {
    "id": "forensic-lead-sulfate-soda-ash-metathesis",
    "name": "Metathesis of lead sulfate by sodium carbonate",
    "reactants": [
      "pbso4",
      "na2co3"
    ],
    "products": [
      "pbco3",
      "na2so4"
    ],
    "enthalpy": -28,
    "desc": "Analytical digestion of lead sulfate residues.",
    "type": "metathesis",
    "effects": [],
    "net": "PbSO4 + Na2CO3 → PbCO3 + Na2SO4"
  },
  {
    "id": "forensic-soil-barium-carbonate-k",
    "name": "Barium pyrotechnic residue test: precipitation of barium carbonate by potassium carbonate",
    "reactants": [
      "ba-no3-2",
      "k2co3"
    ],
    "products": [
      "baco3",
      "kno3"
    ],
    "enthalpy": -48,
    "desc": "Identification of barium carbonate in soil and pyrotechnic blast debris.",
    "type": "metathesis",
    "effects": [],
    "net": "BaN2O6 + K2CO3 → BaCO3 + 2 KNO3"
  },
  {
    "id": "forensic-soil-barium-carbonate-na",
    "name": "Sodium carbonate precipitation of barium carbonate from bomb crater soil",
    "reactants": [
      "ba-no3-2",
      "na2co3"
    ],
    "products": [
      "baco3",
      "nano3"
    ],
    "enthalpy": -45,
    "desc": "Soil extraction confirming barium contamination from explosive detonations.",
    "type": "metathesis",
    "effects": [],
    "net": "BaN2O6 + Na2CO3 → BaCO3 + 2 NaNO3"
  },
  {
    "id": "forensic-soil-gypsum-barium-test",
    "name": "Barium precipitation test: reaction of gypsum extract with barium chloride",
    "reactants": [
      "caso4",
      "bacl2"
    ],
    "products": [
      "baso4",
      "cacl2"
    ],
    "enthalpy": -18,
    "desc": "Forensic mineralogy distinguishing plaster/gypsum traces from drywall.",
    "type": "metathesis",
    "effects": [],
    "net": "CaSO4 + BaCl2 → BaSO4 + CaCl2"
  },
  {
    "id": "forensic-lead-carbonate-sulfate-metathesis-k",
    "name": "Metathesis of lead carbonate into insoluble lead sulfate by potassium sulfate",
    "reactants": [
      "pbco3",
      "k2so4"
    ],
    "products": [
      "pbso4",
      "k2co3"
    ],
    "enthalpy": 15,
    "desc": "Chemical transformation in lead mineral forensic identification.",
    "type": "metathesis",
    "effects": [],
    "net": "PbCO3 + K2SO4 → PbSO4 + K2CO3"
  },
  {
    "id": "forensic-lead-carbonate-sulfate-metathesis-na",
    "name": "Metathesis of lead carbonate into lead sulfate by sodium sulfate",
    "reactants": [
      "pbco3",
      "na2so4"
    ],
    "products": [
      "pbso4",
      "na2co3"
    ],
    "enthalpy": 18,
    "desc": "Conversion of lead carbonate into plumbous sulfate.",
    "type": "metathesis",
    "effects": [],
    "net": "PbCO3 + Na2SO4 → PbSO4 + Na2CO3"
  }
];
