// Domain 37: Toxicology, Forensics & Chemical Spot Tests (100 reactions)
export const DOMAIN_37_REACTIONS = [
  {
    "id": "forensic-luminol-persulfate",
    "name": "Luminol chemiluminescence oxidation by sodium persulfate",
    "reactants": [
      "luminol",
      "na2s2o8",
      "naoh"
    ],
    "products": [
      "na2-aminophthalate",
      "na2so4",
      "n2",
      "water"
    ],
    "enthalpy": -690,
    "desc": "Forensic blood and latent print reagent: persulfate-activated chemiluminescent emission of luminol.",
    "type": "redox_other",
    "effects": [],
    "net": "C8H7N3O2 + 2 Na2S2O8 + 6 NaOH → C8H5NNa2O4 + 4 Na2SO4 + N2 + 4 H2O"
  },
  {
    "id": "forensic-luminol-o3",
    "name": "Luminol chemiluminescence oxidation by ozone",
    "reactants": [
      "luminol",
      "o3",
      "naoh"
    ],
    "products": [
      "na2-aminophthalate",
      "n2",
      "water",
      "o2"
    ],
    "enthalpy": -610,
    "desc": "Chemiluminescent detection of atmospheric ozone via luminol oxidation producing excited 3-aminophthalate dianion.",
    "type": "redox_other",
    "effects": [],
    "net": "C8H7N3O2 + 2 O3 + 2 NaOH → C8H5NNa2O4 + N2 + 2 H2O + 2 O2"
  },
  {
    "id": "forensic-ninhydrin-dehydration",
    "name": "Thermal dehydration of ninhydrin to 1,2,3-indantrione",
    "reactants": [
      "c9h6o4_ninhydrin"
    ],
    "products": [
      "indane-1-2-3-trione",
      "water"
    ],
    "enthalpy": 42,
    "desc": "Latent fingerprint development: thermal activation of ninhydrin dehydrating to reactive triketone.",
    "type": "decomposition",
    "effects": [],
    "net": "C9H6O4 → C9H4O3 + H2O"
  },
  {
    "id": "forensic-fingerprint-pd-fe",
    "name": "Physical developer redox reaction for latent prints",
    "reactants": [
      "agno3",
      "feso4"
    ],
    "products": [
      "ag",
      "fe-no3-3",
      "fe2-so4-3"
    ],
    "enthalpy": -95,
    "desc": "Forensic physical developer: iron(II) reduction of silver nitrate depositing dark silver nanoparticles along print ridges on wet paper.",
    "type": "redox_other",
    "effects": [],
    "net": "3 AgNO3 + 3 FeSO4 → 3 Ag + Fe(NO3)3 + Fe2(SO4)3"
  },
  {
    "id": "forensic-formic-naocl",
    "name": "Hypochlorite oxidation of formic acid metabolite",
    "reactants": [
      "hcooh",
      "naocl"
    ],
    "products": [
      "co2",
      "nacl",
      "water"
    ],
    "enthalpy": -320,
    "desc": "Toxicology testing: destruction of toxic methanol metabolite formic acid via hypochlorite oxidation.",
    "type": "redox_other",
    "effects": [],
    "net": "HCOOH + NaOCl → CO2 + NaCl + H2O"
  },
  {
    "id": "forensic-formaldehyde-naocl",
    "name": "Hypochlorite oxidation of formaldehyde",
    "reactants": [
      "hcho",
      "naocl"
    ],
    "products": [
      "hcooh",
      "nacl"
    ],
    "enthalpy": -295,
    "desc": "Rapid oxidative neutralization of volatile formaldehyde fixative into formic acid.",
    "type": "redox_other",
    "effects": [],
    "net": "HCHO + NaOCl → HCOOH + NaCl"
  },
  {
    "id": "forensic-methanol-naocl",
    "name": "Oxidation of methanol toxicant by sodium hypochlorite",
    "reactants": [
      "ch3oh",
      "naocl"
    ],
    "products": [
      "hcho",
      "nacl",
      "water"
    ],
    "enthalpy": -260,
    "desc": "Diagnostic screening reaction oxidizing toxic ingested methanol to formaldehyde.",
    "type": "redox_other",
    "effects": [],
    "net": "CH3OH + NaOCl → HCHO + NaCl + H2O"
  },
  {
    "id": "forensic-formaldehyde-tollens",
    "name": "Tollens silver mirror test for forensic aldehyde detection",
    "reactants": [
      "hcho",
      "agno3",
      "naoh"
    ],
    "products": [
      "ag",
      "hcoona",
      "nano3",
      "water"
    ],
    "enthalpy": -185,
    "desc": "Forensic confirmation: reduction of ammoniacal silver ions by formaldehyde depositing reflective silver mirror.",
    "type": "redox_other",
    "effects": [],
    "net": "HCHO + 2 AgNO3 + 3 NaOH → 2 Ag + HCOONa + 2 NaNO3 + 2 H2O"
  },
  {
    "id": "forensic-meth-marquis-oxidation",
    "name": "Acidic potassium dichromate oxidation of methamphetamine",
    "reactants": [
      "c10h15n_meth",
      "k2cr2o7",
      "h2so4"
    ],
    "products": [
      "co2",
      "cr2-so4-3",
      "k2so4",
      "water",
      "no2"
    ],
    "enthalpy": -3850,
    "desc": "Presumptive forensic test: vigorous chromic digestion shifting color from bright orange Cr(VI) to deep green Cr(III).",
    "type": "redox_other",
    "effects": [],
    "net": "6 C10H15N + 59 K2Cr2O7 + 236 H2SO4 → 60 CO2 + 59 Cr2(SO4)3 + 59 K2SO4 + 281 H2O + 6 NO2"
  },
  {
    "id": "forensic-morphine-marquis-oxidation",
    "name": "Acidic potassium dichromate oxidation of morphine",
    "reactants": [
      "c17h19no3_morphine",
      "k2cr2o7",
      "h2so4"
    ],
    "products": [
      "co2",
      "cr2-so4-3",
      "k2so4",
      "water",
      "no2"
    ],
    "enthalpy": -5420,
    "desc": "Forensic opiate identification: exhaustive chromic acid digestion with chromophore color shift.",
    "type": "redox_other",
    "effects": [],
    "net": "6 C17H19NO3 + 85 K2Cr2O7 + 340 H2SO4 → 102 CO2 + 85 Cr2(SO4)3 + 85 K2SO4 + 397 H2O + 6 NO2"
  },
  {
    "id": "forensic-cocaine-marquis-oxidation",
    "name": "Acidic potassium dichromate oxidation of cocaine base",
    "reactants": [
      "c17h21no4_cocaine",
      "k2cr2o7",
      "h2so4"
    ],
    "products": [
      "co2",
      "cr2-so4-3",
      "k2so4",
      "water",
      "no2"
    ],
    "enthalpy": -5650,
    "desc": "Total oxidative digestion of seized cocaine alkaloid into carbon dioxide, nitrogen dioxide, and water.",
    "type": "redox_other",
    "effects": [],
    "net": "6 C17H21NO4 + 85 K2Cr2O7 + 340 H2SO4 → 102 CO2 + 85 Cr2(SO4)3 + 85 K2SO4 + 403 H2O + 6 NO2"
  },
  {
    "id": "forensic-froehde-morphine",
    "name": "Froehde's reagent nitric acid digestion of morphine",
    "reactants": [
      "c17h19no3_morphine",
      "hno3"
    ],
    "products": [
      "co2",
      "no2",
      "water"
    ],
    "enthalpy": -4680,
    "desc": "Exhaustive nitration and oxidative degradation of morphine alkaloid releasing dense red-brown NO2 gas.",
    "type": "redox_other",
    "effects": [],
    "net": "C17H19NO3 + 85 HNO3 → 17 CO2 + 86 NO2 + 52 H2O"
  },
  {
    "id": "forensic-meth-permanganate",
    "name": "Permanganate oxidation of methamphetamine",
    "reactants": [
      "c10h15n_meth",
      "kmno4",
      "h2so4"
    ],
    "products": [
      "co2",
      "mnso4",
      "k2so4",
      "water",
      "no2"
    ],
    "enthalpy": -4120,
    "desc": "Diagnostic alkaloid screening: rapid decolorization of purple permanganate to colorless Mn(II).",
    "type": "redox_other",
    "effects": [],
    "net": "10 C10H15N + 118 KMnO4 + 177 H2SO4 → 100 CO2 + 118 MnSO4 + 59 K2SO4 + 252 H2O + 10 NO2"
  },
  {
    "id": "forensic-morphine-permanganate",
    "name": "Permanganate oxidation of morphine alkaloid",
    "reactants": [
      "c17h19no3_morphine",
      "kmno4",
      "h2so4"
    ],
    "products": [
      "co2",
      "mnso4",
      "k2so4",
      "water",
      "no2"
    ],
    "enthalpy": -5890,
    "desc": "Opiate spot test: oxidative cleavage of morphine phenanthrene nucleus with permanganate discharge.",
    "type": "redox_other",
    "effects": [],
    "net": "2 C17H19NO3 + 34 KMnO4 + 51 H2SO4 → 34 CO2 + 34 MnSO4 + 17 K2SO4 + 70 H2O + 2 NO2"
  },
  {
    "id": "forensic-cocaine-permanganate",
    "name": "Permanganate oxidation test for cocaine ecgonine esters",
    "reactants": [
      "c17h21no4_cocaine",
      "kmno4",
      "h2so4"
    ],
    "products": [
      "co2",
      "mnso4",
      "k2so4",
      "water",
      "no2"
    ],
    "enthalpy": -6050,
    "desc": "Exhaustive oxidation verifying purity of cocaine hydrochloride / freebase samples.",
    "type": "redox_other",
    "effects": [],
    "net": "2 C17H21NO4 + 34 KMnO4 + 51 H2SO4 → 34 CO2 + 34 MnSO4 + 17 K2SO4 + 72 H2O + 2 NO2"
  },
  {
    "id": "forensic-meth-dichromate",
    "name": "Sodium dichromate oxidation of methamphetamine",
    "reactants": [
      "c10h15n_meth",
      "na2cr2o7",
      "h2so4"
    ],
    "products": [
      "co2",
      "cr2-so4-3",
      "na2so4",
      "water",
      "no2"
    ],
    "enthalpy": -3820,
    "desc": "Acidic sodium dichromate digestion producing green Cr(III) sulfate.",
    "type": "redox_other",
    "effects": [],
    "net": "6 C10H15N + 59 Na2Cr2O7 + 236 H2SO4 → 60 CO2 + 59 Cr2(SO4)3 + 59 Na2SO4 + 281 H2O + 6 NO2"
  },
  {
    "id": "forensic-morphine-na2cr2o7",
    "name": "Sodium dichromate oxidation of morphine",
    "reactants": [
      "c17h19no3_morphine",
      "na2cr2o7",
      "h2so4"
    ],
    "products": [
      "co2",
      "cr2-so4-3",
      "na2so4",
      "water",
      "no2"
    ],
    "enthalpy": -5390,
    "desc": "Toxicological screening: chromic acid mineralization of opiate residues.",
    "type": "redox_other",
    "effects": [],
    "net": "6 C17H19NO3 + 85 Na2Cr2O7 + 340 H2SO4 → 102 CO2 + 85 Cr2(SO4)3 + 85 Na2SO4 + 397 H2O + 6 NO2"
  },
  {
    "id": "forensic-cocaine-na2cr2o7",
    "name": "Sodium dichromate oxidation of cocaine",
    "reactants": [
      "c17h21no4_cocaine",
      "na2cr2o7",
      "h2so4"
    ],
    "products": [
      "co2",
      "cr2-so4-3",
      "na2so4",
      "water",
      "no2"
    ],
    "enthalpy": -5610,
    "desc": "Chromic acid destruction of cocaine alkaloid yielding aqueous chromium(III) sulfate.",
    "type": "redox_other",
    "effects": [],
    "net": "6 C17H21NO4 + 85 Na2Cr2O7 + 340 H2SO4 → 102 CO2 + 85 Cr2(SO4)3 + 85 Na2SO4 + 403 H2O + 6 NO2"
  },
  {
    "id": "forensic-meth-hno3",
    "name": "Concentrated nitric acid digestion of methamphetamine",
    "reactants": [
      "c10h15n_meth",
      "hno3"
    ],
    "products": [
      "co2",
      "no2",
      "water"
    ],
    "enthalpy": -3450,
    "desc": "Nitric acid digestion releasing nitrogen dioxide gas.",
    "type": "redox_other",
    "effects": [],
    "net": "C10H15N + 59 HNO3 → 10 CO2 + 60 NO2 + 37 H2O"
  },
  {
    "id": "forensic-cocaine-hno3",
    "name": "Concentrated nitric acid digestion of cocaine",
    "reactants": [
      "c17h21no4_cocaine",
      "hno3"
    ],
    "products": [
      "co2",
      "no2",
      "water"
    ],
    "enthalpy": -5120,
    "desc": "Acid decomposition of cocaine alkaloid releasing copious NO2 fumes.",
    "type": "redox_other",
    "effects": [],
    "net": "C17H21NO4 + 85 HNO3 → 17 CO2 + 86 NO2 + 53 H2O"
  },
  {
    "id": "forensic-meth-combust",
    "name": "Controlled field incineration of seized methamphetamine",
    "reactants": [
      "c10h15n_meth",
      "o2"
    ],
    "products": [
      "co2",
      "water",
      "no2"
    ],
    "enthalpy": -4890,
    "desc": "Thermal destruction of illicit methamphetamine contraband in high-temperature incinerator.",
    "type": "combustion",
    "effects": [],
    "net": "4 C10H15N + 59 O2 → 40 CO2 + 30 H2O + 4 NO2"
  },
  {
    "id": "forensic-morphine-combust",
    "name": "Controlled field incineration of seized morphine",
    "reactants": [
      "c17h19no3_morphine",
      "o2"
    ],
    "products": [
      "co2",
      "water",
      "no2"
    ],
    "enthalpy": -6820,
    "desc": "Thermal demilitarization and incineration of illicit opiates.",
    "type": "combustion",
    "effects": [],
    "net": "4 C17H19NO3 + 85 O2 → 68 CO2 + 38 H2O + 4 NO2"
  },
  {
    "id": "forensic-cocaine-combust",
    "name": "Controlled field incineration of seized cocaine contraband",
    "reactants": [
      "c17h21no4_cocaine",
      "o2"
    ],
    "products": [
      "co2",
      "water",
      "no2"
    ],
    "enthalpy": -7150,
    "desc": "High-temperature disposal incineration of seized cocaine bricks.",
    "type": "combustion",
    "effects": [],
    "net": "4 C17H21NO4 + 85 O2 → 68 CO2 + 42 H2O + 4 NO2"
  },
  {
    "id": "forensic-marsh-hypochlorite-dissolution",
    "name": "Sodium hypochlorite dissolution of Marsh arsenic mirror",
    "reactants": [
      "as",
      "naocl",
      "water"
    ],
    "products": [
      "h3aso4",
      "nacl"
    ],
    "enthalpy": -620,
    "desc": "Key Marsh test confirmation: metallic arsenic mirror dissolves immediately in sodium hypochlorite, distinguishing it from antimony.",
    "type": "redox_other",
    "effects": [],
    "net": "2 As + 5 NaOCl + 3 H2O → 2 H3AsO4 + 5 NaCl"
  },
  {
    "id": "forensic-marsh-h2o2-oxidation",
    "name": "Hydrogen peroxide oxidation of metallic arsenic mirror",
    "reactants": [
      "as",
      "h2o2"
    ],
    "products": [
      "as2o3",
      "water"
    ],
    "enthalpy": -580,
    "desc": "Oxidation of reflective arsenic metal mirror film back to white arsenic trioxide.",
    "type": "redox_other",
    "effects": [],
    "net": "2 As + 3 H2O2 → As2O3 + 3 H2O"
  },
  {
    "id": "forensic-reinsch-cu-arsenic",
    "name": "Reinsch test for arsenic on metallic copper foil",
    "reactants": [
      "as2o3",
      "cu",
      "hcl"
    ],
    "products": [
      "cucl2",
      "as",
      "water"
    ],
    "enthalpy": -110,
    "desc": "Classic 19th-century clinical toxicology: metallic copper foil reduces aqueous As(III) in hot HCl, plating a dark steel-gray arsenic film.",
    "type": "single_displacement",
    "effects": [],
    "net": "As2O3 + 3 Cu + 6 HCl → 3 CuCl2 + 2 As + 3 H2O"
  },
  {
    "id": "forensic-reinsch-deposit-oxidation",
    "name": "Sublimation oxidation of Reinsch copper arsenic deposit",
    "reactants": [
      "as",
      "o2"
    ],
    "products": [
      "as2o3"
    ],
    "enthalpy": -657,
    "desc": "Confirmation step of Reinsch test: heating copper foil in open tube sublimes arsenic to characteristic sparkling octahedral As2O3 crystals.",
    "type": "combustion",
    "effects": [],
    "net": "4 As + 3 O2 → 2 As2O3"
  },
  {
    "id": "forensic-as2o3-na2s-hcl",
    "name": "Acidified sodium sulfide precipitation of arsenic(III) sulfide",
    "reactants": [
      "as2o3",
      "na2s",
      "hcl"
    ],
    "products": [
      "as2s3",
      "nacl",
      "water"
    ],
    "enthalpy": -110,
    "desc": "Toxicological qualitative group analysis: acidified sulfide precipitation of brilliant yellow As2S3 (orpiment).",
    "type": "precipitation",
    "effects": [],
    "net": "As2O3 + 3 Na2S + 6 HCl → As2S3 + 6 NaCl + 3 H2O"
  },
  {
    "id": "forensic-stibnite-precip",
    "name": "Hydrogen sulfide precipitation of toxic antimony(III) as stibnite",
    "reactants": [
      "sb2o3",
      "h2s"
    ],
    "products": [
      "sb2s3",
      "water"
    ],
    "enthalpy": -92,
    "desc": "Forensic heavy metal screening: precipitation of distinctive orange-red antimony(III) sulfide.",
    "type": "precipitation",
    "effects": [],
    "net": "Sb2O3 + 3 H2S → Sb2S3 + 3 H2O"
  },
  {
    "id": "forensic-antimony-reinsch",
    "name": "Reinsch test for toxic antimony on copper foil",
    "reactants": [
      "sb2o3",
      "cu",
      "hcl"
    ],
    "products": [
      "cucl2",
      "sb",
      "water"
    ],
    "enthalpy": -105,
    "desc": "Reinsch screening: deposition of violet-black antimony coating on cleaned copper strip.",
    "type": "single_displacement",
    "effects": [],
    "net": "Sb2O3 + 3 Cu + 6 HCl → 3 CuCl2 + 2 Sb + 3 H2O"
  },
  {
    "id": "forensic-arsenic-hno3-dissolution",
    "name": "Nitric acid oxidation of arsenic mirror to arsenic acid",
    "reactants": [
      "as",
      "hno3",
      "water"
    ],
    "products": [
      "h3aso4",
      "no"
    ],
    "enthalpy": -415,
    "desc": "Wet digestion of arsenic forensic specimen yielding soluble orthoarsenic acid.",
    "type": "redox_other",
    "effects": [],
    "net": "3 As + 5 HNO3 + 2 H2O → 3 H3AsO4 + 5 NO"
  },
  {
    "id": "forensic-as2o3-nitric-oxidation",
    "name": "Nitric acid digestion of arsenic trioxide to arsenic acid",
    "reactants": [
      "as2o3",
      "hno3",
      "water"
    ],
    "products": [
      "h3aso4",
      "no2"
    ],
    "enthalpy": -185,
    "desc": "Digestion of poison evidence samples converting As2O3 into arsenic acid for atomic absorption spectroscopy.",
    "type": "redox_other",
    "effects": [],
    "net": "As2O3 + 4 HNO3 + H2O → 2 H3AsO4 + 4 NO2"
  },
  {
    "id": "forensic-antimony-nitric-oxidation",
    "name": "Nitric acid oxidation of metallic antimony deposit",
    "reactants": [
      "sb",
      "hno3"
    ],
    "products": [
      "sb2o3",
      "no2",
      "water"
    ],
    "enthalpy": -395,
    "desc": "Oxidation of antimony spot test deposits to insoluble white antimony trioxide.",
    "type": "redox_other",
    "effects": [],
    "net": "2 Sb + 6 HNO3 → Sb2O3 + 6 NO2 + 3 H2O"
  },
  {
    "id": "forensic-stibnite-nitric-digestion",
    "name": "Nitric acid digestion of antimony(III) sulfide residue",
    "reactants": [
      "sb2s3",
      "hno3"
    ],
    "products": [
      "sb2o3",
      "h2so4",
      "no2",
      "water"
    ],
    "enthalpy": -1680,
    "desc": "Exhaustive acid digestion of orange stibnite precipitate releasing NO2 and sulfuric acid.",
    "type": "redox_other",
    "effects": [],
    "net": "Sb2S3 + 24 HNO3 → Sb2O3 + 3 H2SO4 + 24 NO2 + 9 H2O"
  },
  {
    "id": "forensic-cyanide-rhodanese-detox",
    "name": "Sodium thiosulfate detoxification of potassium cyanide",
    "reactants": [
      "kcn",
      "na2s2o3"
    ],
    "products": [
      "kscn",
      "na2so3"
    ],
    "enthalpy": -48,
    "desc": "In vitro model of rhodanese enzyme: sulfur transfer converting lethal cyanide into non-toxic thiocyanate.",
    "type": "synthesis",
    "effects": [],
    "net": "KCN + Na2S2O3 → KSCN + Na2SO3"
  },
  {
    "id": "forensic-cyanide-stomach-hcl",
    "name": "Gastric acid liberation of lethal hydrogen cyanide gas from NaCN",
    "reactants": [
      "nacn",
      "hcl"
    ],
    "products": [
      "hcn",
      "nacl"
    ],
    "enthalpy": -18,
    "desc": "Toxicology of oral cyanide ingestion: hydrochloric acid in stomach immediately liberates volatile toxic HCN vapor.",
    "type": "neutralization",
    "effects": [],
    "net": "NaCN + HCl → HCN + NaCl"
  },
  {
    "id": "forensic-cyanide-kcn-hcl",
    "name": "Gastric acid liberation of hydrogen cyanide from potassium cyanide",
    "reactants": [
      "kcn",
      "hcl"
    ],
    "products": [
      "hcn",
      "kcl"
    ],
    "enthalpy": -20,
    "desc": "Acid-promoted release of prussic acid vapor upon lethal ingestion of KCN.",
    "type": "neutralization",
    "effects": [],
    "net": "KCN + HCl → HCN + KCl"
  },
  {
    "id": "forensic-cyanide-nacn-h2so4",
    "name": "Acidification of sodium cyanide in toxicology micro-diffusion chambers",
    "reactants": [
      "nacn",
      "h2so4"
    ],
    "products": [
      "hcn",
      "na2so4"
    ],
    "enthalpy": -42,
    "desc": "Conway micro-diffusion assay: liberation of volatile HCN into alkaline trapping well.",
    "type": "neutralization",
    "effects": [],
    "net": "2 NaCN + H2SO4 → 2 HCN + Na2SO4"
  },
  {
    "id": "forensic-cyanide-kcn-h2so4",
    "name": "Sulfuric acid acidification of potassium cyanide",
    "reactants": [
      "kcn",
      "h2so4"
    ],
    "products": [
      "hcn",
      "k2so4"
    ],
    "enthalpy": -45,
    "desc": "Micro-diffusion extraction of cyanide from post-mortem blood samples.",
    "type": "neutralization",
    "effects": [],
    "net": "2 KCN + H2SO4 → 2 HCN + K2SO4"
  },
  {
    "id": "forensic-co-silver-reduction",
    "name": "Carbon monoxide reduction of ammoniacal silver nitrate",
    "reactants": [
      "agno3",
      "co",
      "water"
    ],
    "products": [
      "ag",
      "co2",
      "hno3"
    ],
    "enthalpy": -195,
    "desc": "Toxicological blood gas screening: carbon monoxide reduces aqueous silver ions to black metallic silver mirror.",
    "type": "redox_other",
    "effects": [],
    "net": "2 AgNO3 + CO + H2O → 2 Ag + CO2 + 2 HNO3"
  },
  {
    "id": "forensic-co-permanganate-oxidation",
    "name": "Acidic potassium permanganate oxidation of carbon monoxide",
    "reactants": [
      "kmno4",
      "co",
      "h2so4"
    ],
    "products": [
      "co2",
      "mnso4",
      "k2so4",
      "water"
    ],
    "enthalpy": -620,
    "desc": "Gas detection tube chemistry: quantitative oxidation of lethal CO with colorimetric decolorization.",
    "type": "redox_other",
    "effects": [],
    "net": "2 KMnO4 + 5 CO + 3 H2SO4 → 5 CO2 + 2 MnSO4 + K2SO4 + 3 H2O"
  },
  {
    "id": "forensic-cyanide-rhodanese-sodium",
    "name": "Sodium thiosulfate detoxification of sodium cyanide",
    "reactants": [
      "nacn",
      "na2s2o3"
    ],
    "products": [
      "nascn",
      "na2so3"
    ],
    "enthalpy": -45,
    "desc": "Clinical antidote model: sulfurtransferase enzyme mechanism converting cyanide into thiocyanate.",
    "type": "synthesis",
    "effects": [],
    "net": "NaCN + Na2S2O3 → NaSCN + Na2SO3"
  },
  {
    "id": "forensic-kcn-persulfate",
    "name": "Sodium persulfate oxidation of potassium cyanide",
    "reactants": [
      "kcn",
      "na2s2o8",
      "water"
    ],
    "products": [
      "knco",
      "na2so4",
      "h2so4"
    ],
    "enthalpy": -240,
    "desc": "Advanced oxidation decontamination converting toxic cyanide to cyanate.",
    "type": "redox_other",
    "effects": [],
    "net": "KCN + Na2S2O8 + H2O → KNCO + Na2SO4 + H2SO4"
  },
  {
    "id": "forensic-cyanate-hydrolysis",
    "name": "Acidic hydrolysis of sodium cyanate to ammonium chloride",
    "reactants": [
      "nanco",
      "hcl",
      "water"
    ],
    "products": [
      "nacl",
      "ammonium-chloride",
      "co2"
    ],
    "enthalpy": -85,
    "desc": "Completion of cyanide decontamination: acid hydrolysis converting cyanate into harmless ammonium chloride and CO2.",
    "type": "decomposition",
    "effects": [],
    "net": "NaNCO + 2 HCl + H2O → NaCl + NH4Cl + CO2"
  },
  {
    "id": "forensic-knco-hydrolysis",
    "name": "Acidic hydrolysis of potassium cyanate",
    "reactants": [
      "knco",
      "hcl",
      "water"
    ],
    "products": [
      "kcl",
      "ammonium-chloride",
      "co2"
    ],
    "enthalpy": -88,
    "desc": "Complete degradation of cyanate into potassium chloride, ammonium chloride, and carbon dioxide.",
    "type": "decomposition",
    "effects": [],
    "net": "KNCO + 2 HCl + H2O → KCl + NH4Cl + CO2"
  },
  {
    "id": "forensic-lead-oxalate-precip",
    "name": "Oxalic acid precipitation of toxic lead(II) from nitrate solution",
    "reactants": [
      "pbno32",
      "h2c2o4"
    ],
    "products": [
      "pbc2o4",
      "hno3"
    ],
    "enthalpy": -34,
    "desc": "Toxicology isolation: gravimetric precipitation of insoluble lead oxalate from acid digest.",
    "type": "precipitation",
    "effects": [],
    "net": "Pb(NO3)2 + H2C2O4 → PbC2O4 + 2 HNO3"
  },
  {
    "id": "forensic-lead-chromate-confirmation",
    "name": "Confirmatory precipitation of lead chromate from lead chloride",
    "reactants": [
      "pbcl2",
      "k2cr2o7",
      "water"
    ],
    "products": [
      "pbcro4",
      "kcl",
      "hcl"
    ],
    "enthalpy": -45,
    "desc": "Forensic gunshot residue (GSR) confirmation: precipitation of bright yellow lead chromate pigment.",
    "type": "precipitation",
    "effects": [],
    "net": "2 PbCl2 + K2Cr2O7 + H2O → 2 PbCrO4 + 2 KCl + 2 HCl"
  },
  {
    "id": "forensic-lead-na2so4",
    "name": "Sodium sulfate precipitation of lead(II) sulfate",
    "reactants": [
      "pbcl2",
      "na2so4"
    ],
    "products": [
      "pbso4",
      "nacl"
    ],
    "enthalpy": -28,
    "desc": "Isolation of lead contamination from environmental soil and paint chip leaches.",
    "type": "precipitation",
    "effects": [],
    "net": "PbCl2 + Na2SO4 → PbSO4 + 2 NaCl"
  },
  {
    "id": "forensic-lead-k2so4",
    "name": "Potassium sulfate precipitation of lead(II) sulfate",
    "reactants": [
      "pbcl2",
      "k2so4"
    ],
    "products": [
      "pbso4",
      "kcl"
    ],
    "enthalpy": -30,
    "desc": "Precipitation of dense white lead sulfate from chloride extracts.",
    "type": "precipitation",
    "effects": [],
    "net": "PbCl2 + K2SO4 → PbSO4 + 2 KCl"
  },
  {
    "id": "forensic-pbi2-na2s",
    "name": "Sodium sulfide conversion of lead(II) iodide to black galena",
    "reactants": [
      "pbi2",
      "na2s"
    ],
    "products": [
      "pbs",
      "nai"
    ],
    "enthalpy": -62,
    "desc": "Confirmatory color shift: yellow crystalline lead iodide spangles converting to black insoluble lead sulfide.",
    "type": "metathesis",
    "effects": [],
    "net": "PbI2 + Na2S → PbS + 2 NaI"
  },
  {
    "id": "forensic-pbi2-k2s",
    "name": "Potassium sulfide conversion of lead(II) iodide to lead sulfide",
    "reactants": [
      "pbi2",
      "k2s"
    ],
    "products": [
      "pbs",
      "ki"
    ],
    "enthalpy": -64,
    "desc": "Confirmatory sulfide spot test for lead identification.",
    "type": "metathesis",
    "effects": [],
    "net": "PbI2 + K2S → PbS + 2 KI"
  },
  {
    "id": "forensic-pbcl2-k2c2o4",
    "name": "Potassium oxalate precipitation of lead(II) oxalate",
    "reactants": [
      "pbcl2",
      "k2c2o4"
    ],
    "products": [
      "pbc2o4",
      "kcl"
    ],
    "enthalpy": -25,
    "desc": "Precipitation of crystalline lead oxalate from neutral chloride solution.",
    "type": "precipitation",
    "effects": [],
    "net": "PbCl2 + K2C2O4 → PbC2O4 + 2 KCl"
  },
  {
    "id": "forensic-pbcl2-na2c2o4",
    "name": "Sodium oxalate precipitation of lead(II) oxalate",
    "reactants": [
      "pbcl2",
      "na2c2o4"
    ],
    "products": [
      "pbc2o4",
      "nacl"
    ],
    "enthalpy": -24,
    "desc": "Metathesis yielding insoluble lead oxalate.",
    "type": "precipitation",
    "effects": [],
    "net": "PbCl2 + Na2C2O4 → PbC2O4 + 2 NaCl"
  },
  {
    "id": "forensic-pbco3-h2so4",
    "name": "Sulfuric acid digestion of white lead paint pigment",
    "reactants": [
      "pbco3",
      "h2so4"
    ],
    "products": [
      "pbso4",
      "co2",
      "water"
    ],
    "enthalpy": -65,
    "desc": "Forensic paint analysis: digestion of historic white lead (basic lead carbonate) releasing CO2.",
    "type": "neutralization",
    "effects": [],
    "net": "PbCO3 + H2SO4 → PbSO4 + CO2 + H2O"
  },
  {
    "id": "forensic-pbco3-h2s",
    "name": "Hydrogen sulfide blackening of lead carbonate paint",
    "reactants": [
      "pbco3",
      "h2s"
    ],
    "products": [
      "pbs",
      "co2",
      "water"
    ],
    "enthalpy": -72,
    "desc": "Art forensics & historic document aging: environmental H2S blackening white lead pigments into black PbS.",
    "type": "metathesis",
    "effects": [],
    "net": "PbCO3 + H2S → PbS + CO2 + H2O"
  },
  {
    "id": "forensic-pboh2-h2s",
    "name": "Hydrogen sulfide reaction with lead(II) hydroxide",
    "reactants": [
      "pb-oh-2",
      "h2s"
    ],
    "products": [
      "pbs",
      "water"
    ],
    "enthalpy": -85,
    "desc": "Rapid blackening detection of lead hydroxide residue upon exposure to sulfide.",
    "type": "metathesis",
    "effects": [],
    "net": "Pb(OH)2 + H2S → PbS + 2 H2O"
  },
  {
    "id": "forensic-baco3-h2so4",
    "name": "Sulfuric acid digestion of barium carbonate gunshot residue",
    "reactants": [
      "baco3",
      "h2so4"
    ],
    "products": [
      "baso4",
      "co2",
      "water"
    ],
    "enthalpy": -92,
    "desc": "GSR primer residue analysis: converting barium carbonate into insoluble barium sulfate with effervescence.",
    "type": "neutralization",
    "effects": [],
    "net": "BaCO3 + H2SO4 → BaSO4 + CO2 + H2O"
  },
  {
    "id": "forensic-mercury-copper-amalgam",
    "name": "Reinsch copper wire amalgamation test for toxic mercury(II)",
    "reactants": [
      "hgcl2",
      "cu"
    ],
    "products": [
      "cucl2",
      "hg"
    ],
    "enthalpy": -85,
    "desc": "Clinical mercury poisoning screen: metallic copper displaces mercury, forming a shiny silvery amalgam layer.",
    "type": "single_displacement",
    "effects": [],
    "net": "HgCl2 + Cu → CuCl2 + Hg"
  },
  {
    "id": "forensic-mercury-aqua-regia",
    "name": "Aqua regia wet digestion of insoluble cinnabar mercury sulfide",
    "reactants": [
      "hgs",
      "hno3",
      "hcl"
    ],
    "products": [
      "hgcl2",
      "no",
      "s",
      "water"
    ],
    "enthalpy": -195,
    "desc": "Forensic mineral digestion: oxidative dissolution of red cinnabar (HgS) to soluble mercuric chloride.",
    "type": "redox_other",
    "effects": [],
    "net": "3 HgS + 2 HNO3 + 6 HCl → 3 HgCl2 + 2 NO + 3 S + 4 H2O"
  },
  {
    "id": "forensic-mercury-zinc-displacement",
    "name": "Metallic zinc displacement of mercury from mercuric chloride",
    "reactants": [
      "hgcl2",
      "zn"
    ],
    "products": [
      "hg",
      "zncl2"
    ],
    "enthalpy": -210,
    "desc": "Toxicology confirmation: zinc dust reduces toxic aqueous Hg(II) to silvery liquid mercury droplets.",
    "type": "single_displacement",
    "effects": [],
    "net": "HgCl2 + Zn → Hg + ZnCl2"
  },
  {
    "id": "forensic-mercury-h2s-detection",
    "name": "Hydrogen sulfide detection of mercuric chloride",
    "reactants": [
      "hgcl2",
      "h2s"
    ],
    "products": [
      "hgs",
      "hcl"
    ],
    "enthalpy": -78,
    "desc": "Screening reaction: progressive white-yellow-brown-black precipitate culminating in mercuric sulfide.",
    "type": "precipitation",
    "effects": [],
    "net": "HgCl2 + H2S → HgS + 2 HCl"
  },
  {
    "id": "forensic-hgcl2-na2co3",
    "name": "Sodium carbonate precipitation of mercury(II) oxide",
    "reactants": [
      "hgcl2",
      "na2co3"
    ],
    "products": [
      "hgo",
      "nacl",
      "co2"
    ],
    "enthalpy": -45,
    "desc": "Alkaline carbonate precipitation producing yellow-orange mercuric oxide precipitate.",
    "type": "precipitation",
    "effects": [],
    "net": "HgCl2 + Na2CO3 → HgO + 2 NaCl + CO2"
  },
  {
    "id": "forensic-hgcl2-k2co3",
    "name": "Potassium carbonate precipitation of mercury(II) oxide",
    "reactants": [
      "hgcl2",
      "k2co3"
    ],
    "products": [
      "hgo",
      "kcl",
      "co2"
    ],
    "enthalpy": -48,
    "desc": "Precipitation of orange basic mercuric oxide.",
    "type": "precipitation",
    "effects": [],
    "net": "HgCl2 + K2CO3 → HgO + 2 KCl + CO2"
  },
  {
    "id": "forensic-hgi2-na2s",
    "name": "Sodium sulfide conversion of scarlet mercuric iodide to black metacinnabar",
    "reactants": [
      "hgi2",
      "na2s"
    ],
    "products": [
      "hgs",
      "nai"
    ],
    "enthalpy": -55,
    "desc": "Confirmatory metathesis shifting bright scarlet HgI2 to black insoluble HgS.",
    "type": "metathesis",
    "effects": [],
    "net": "HgI2 + Na2S → HgS + 2 NaI"
  },
  {
    "id": "forensic-hgi2-k2s",
    "name": "Potassium sulfide conversion of mercuric iodide to mercuric sulfide",
    "reactants": [
      "hgi2",
      "k2s"
    ],
    "products": [
      "hgs",
      "ki"
    ],
    "enthalpy": -57,
    "desc": "Sulfide spot test confirmation of mercury halides.",
    "type": "metathesis",
    "effects": [],
    "net": "HgI2 + K2S → HgS + 2 KI"
  },
  {
    "id": "forensic-hgs-roast",
    "name": "Forensic oxidative roasting of cinnabar mineral evidence",
    "reactants": [
      "hgs",
      "o2"
    ],
    "products": [
      "hg",
      "so2"
    ],
    "enthalpy": -230,
    "desc": "Thermal forensic assay: open-tube roasting of cinnabar releasing metallic mercury vapor and sulfur dioxide.",
    "type": "combustion",
    "effects": [],
    "net": "HgS + O2 → Hg + SO2"
  },
  {
    "id": "forensic-hg2cl2-na2s",
    "name": "Sodium sulfide disproportionation of calomel (mercurous chloride)",
    "reactants": [
      "hg2cl2",
      "na2s"
    ],
    "products": [
      "hg",
      "hgs",
      "nacl"
    ],
    "enthalpy": -68,
    "desc": "Sulfide testing of calomel yielding a mixture of black HgS and finely divided gray metallic mercury.",
    "type": "redox_other",
    "effects": [],
    "net": "Hg2Cl2 + Na2S → Hg + HgS + 2 NaCl"
  },
  {
    "id": "forensic-hg2cl2-h2s",
    "name": "Hydrogen sulfide disproportionation of mercurous chloride",
    "reactants": [
      "hg2cl2",
      "h2s"
    ],
    "products": [
      "hg",
      "hgs",
      "hcl"
    ],
    "enthalpy": -62,
    "desc": "Qualitative detection: H2S immediately blackens calomel via simultaneous HgS precipitation and metallic Hg deposition.",
    "type": "redox_other",
    "effects": [],
    "net": "Hg2Cl2 + H2S → Hg + HgS + 2 HCl"
  },
  {
    "id": "forensic-hg2cl2-cl2",
    "name": "Chlorination of calomel to corrosive sublimate (mercuric chloride)",
    "reactants": [
      "hg2cl2",
      "cl2"
    ],
    "products": [
      "hgcl2"
    ],
    "enthalpy": -110,
    "desc": "Oxidation converting mild insoluble calomel into highly lethal, soluble mercuric chloride.",
    "type": "synthesis",
    "effects": [],
    "net": "Hg2Cl2 + Cl2 → 2 HgCl2"
  },
  {
    "id": "forensic-cd-nitrate-na2co3",
    "name": "Sodium carbonate precipitation of cadmium carbonate from nitrate",
    "reactants": [
      "cd-no3-2",
      "na2co3"
    ],
    "products": [
      "cdco3",
      "nano3"
    ],
    "enthalpy": -34,
    "desc": "Forensic screening: isolation of toxic cadmium from nitrate extracts.",
    "type": "precipitation",
    "effects": [],
    "net": "Cd(NO3)2 + Na2CO3 → CdCO3 + 2 NaNO3"
  },
  {
    "id": "forensic-cadmium-k2co3",
    "name": "Potassium carbonate precipitation of cadmium carbonate",
    "reactants": [
      "cdcl2",
      "k2co3"
    ],
    "products": [
      "cdco3",
      "kcl"
    ],
    "enthalpy": -34,
    "desc": "Metathesis yielding white insoluble cadmium carbonate.",
    "type": "precipitation",
    "effects": [],
    "net": "CdCl2 + K2CO3 → CdCO3 + 2 KCl"
  },
  {
    "id": "forensic-cdcl2-h2s",
    "name": "Hydrogen sulfide precipitation of cadmium sulfide from chloride",
    "reactants": [
      "cdcl2",
      "h2s"
    ],
    "products": [
      "cds",
      "hcl"
    ],
    "enthalpy": -74,
    "desc": "Diagnostic spot test: acidic H2S precipitation of brilliant yellow cadmium sulfide (cadmium yellow).",
    "type": "precipitation",
    "effects": [],
    "net": "CdCl2 + H2S → CdS + 2 HCl"
  },
  {
    "id": "forensic-cdso4-k2s",
    "name": "Potassium sulfide precipitation of cadmium sulfide from sulfate",
    "reactants": [
      "cdso4",
      "k2s"
    ],
    "products": [
      "cds",
      "k2so4"
    ],
    "enthalpy": -90,
    "desc": "Environmental toxicology: rapid sulfide precipitation of toxic cadmium effluent.",
    "type": "precipitation",
    "effects": [],
    "net": "CdSO4 + K2S → CdS + K2SO4"
  },
  {
    "id": "forensic-cdso4-h2s",
    "name": "Hydrogen sulfide precipitation of cadmium sulfide from sulfate leach",
    "reactants": [
      "cdso4",
      "h2s"
    ],
    "products": [
      "cds",
      "h2so4"
    ],
    "enthalpy": -70,
    "desc": "Acidic precipitation of canary-yellow CdS pigment.",
    "type": "precipitation",
    "effects": [],
    "net": "CdSO4 + H2S → CdS + H2SO4"
  },
  {
    "id": "forensic-cdso4-naoh",
    "name": "Sodium hydroxide precipitation of cadmium hydroxide",
    "reactants": [
      "cdso4",
      "naoh"
    ],
    "products": [
      "cd-oh-2",
      "na2so4"
    ],
    "enthalpy": -42,
    "desc": "Alkaline precipitation of gelatinous white cadmium hydroxide.",
    "type": "precipitation",
    "effects": [],
    "net": "CdSO4 + 2 NaOH → Cd(OH)2 + Na2SO4"
  },
  {
    "id": "forensic-cdso4-na2co3",
    "name": "Sodium carbonate precipitation of cadmium carbonate from sulfate",
    "reactants": [
      "cdso4",
      "na2co3"
    ],
    "products": [
      "cdco3",
      "na2so4"
    ],
    "enthalpy": -30,
    "desc": "Precipitation of cadmium carbonate from contaminated mine runoff.",
    "type": "precipitation",
    "effects": [],
    "net": "CdSO4 + Na2CO3 → CdCO3 + Na2SO4"
  },
  {
    "id": "forensic-cdco3-hcl",
    "name": "Hydrochloric acid dissolution of cadmium carbonate residue",
    "reactants": [
      "cdco3",
      "hcl"
    ],
    "products": [
      "cdcl2",
      "co2",
      "water"
    ],
    "enthalpy": -35,
    "desc": "Acid extraction of toxic cadmium from solid mineral or biological ash.",
    "type": "neutralization",
    "effects": [],
    "net": "CdCO3 + 2 HCl → CdCl2 + CO2 + H2O"
  },
  {
    "id": "forensic-cdco3-hno3",
    "name": "Nitric acid dissolution of cadmium carbonate",
    "reactants": [
      "cdco3",
      "hno3"
    ],
    "products": [
      "cd-no3-2",
      "co2",
      "water"
    ],
    "enthalpy": -38,
    "desc": "Nitric digestion of cadmium residues for trace elemental quantification.",
    "type": "neutralization",
    "effects": [],
    "net": "CdCO3 + 2 HNO3 → Cd(NO3)2 + CO2 + H2O"
  },
  {
    "id": "forensic-cdco3-h2so4",
    "name": "Sulfuric acid dissolution of cadmium carbonate",
    "reactants": [
      "cdco3",
      "h2so4"
    ],
    "products": [
      "cdso4",
      "co2",
      "water"
    ],
    "enthalpy": -42,
    "desc": "Digestion of cadmium carbonate yielding soluble cadmium sulfate.",
    "type": "neutralization",
    "effects": [],
    "net": "CdCO3 + H2SO4 → CdSO4 + CO2 + H2O"
  },
  {
    "id": "forensic-cdoh2-hcl",
    "name": "Hydrochloric acid neutralization of cadmium hydroxide",
    "reactants": [
      "cd-oh-2",
      "hcl"
    ],
    "products": [
      "cdcl2",
      "water"
    ],
    "enthalpy": -55,
    "desc": "Acid dissolution of precipitated cadmium hydroxide.",
    "type": "neutralization",
    "effects": [],
    "net": "Cd(OH)2 + 2 HCl → CdCl2 + 2 H2O"
  },
  {
    "id": "forensic-cdoh2-hno3",
    "name": "Nitric acid neutralization of cadmium hydroxide",
    "reactants": [
      "cd-oh-2",
      "hno3"
    ],
    "products": [
      "cd-no3-2",
      "water"
    ],
    "enthalpy": -58,
    "desc": "Neutralization forming clear aqueous cadmium nitrate.",
    "type": "neutralization",
    "effects": [],
    "net": "Cd(OH)2 + 2 HNO3 → Cd(NO3)2 + 2 H2O"
  },
  {
    "id": "forensic-cdoh2-h2so4",
    "name": "Sulfuric acid neutralization of cadmium hydroxide",
    "reactants": [
      "cd-oh-2",
      "h2so4"
    ],
    "products": [
      "cdso4",
      "water"
    ],
    "enthalpy": -62,
    "desc": "Sulfuric dissolution of cadmium hydroxide sludge.",
    "type": "neutralization",
    "effects": [],
    "net": "Cd(OH)2 + H2SO4 → CdSO4 + 2 H2O"
  },
  {
    "id": "forensic-cdoh2-h2s",
    "name": "Hydrogen sulfide conversion of cadmium hydroxide to cadmium sulfide",
    "reactants": [
      "cd-oh-2",
      "h2s"
    ],
    "products": [
      "cds",
      "water"
    ],
    "enthalpy": -95,
    "desc": "Direct sulfide staining converting white cadmium hydroxide to vibrant yellow CdS.",
    "type": "metathesis",
    "effects": [],
    "net": "Cd(OH)2 + H2S → CdS + 2 H2O"
  },
  {
    "id": "forensic-cdco3-h2s",
    "name": "Hydrogen sulfide conversion of cadmium carbonate to cadmium sulfide",
    "reactants": [
      "cdco3",
      "h2s"
    ],
    "products": [
      "cds",
      "co2",
      "water"
    ],
    "enthalpy": -82,
    "desc": "Sulfide gas spot test blackening/yellowing cadmium carbonate coatings.",
    "type": "metathesis",
    "effects": [],
    "net": "CdCO3 + H2S → CdS + CO2 + H2O"
  },
  {
    "id": "forensic-bismuth-oxychloride-pearl",
    "name": "Water hydrolysis of bismuth trichloride to pearl white oxychloride",
    "reactants": [
      "bicl3",
      "water"
    ],
    "products": [
      "biocl",
      "hcl"
    ],
    "enthalpy": -38,
    "desc": "Classic bismuth spot test: massive dilution with water precipitates pearlescent white BiOCl (pearl white).",
    "type": "precipitation",
    "effects": [],
    "net": "BiCl3 + H2O → BiOCl + 2 HCl"
  },
  {
    "id": "forensic-bismuth-copper-cementation",
    "name": "Metallic copper cementation of bismuth from chloride solution",
    "reactants": [
      "bicl3",
      "cu"
    ],
    "products": [
      "bi",
      "cucl2"
    ],
    "enthalpy": -75,
    "desc": "Toxicology displacement test: copper foil displaces toxic bismuth as a velvety black metallic film.",
    "type": "single_displacement",
    "effects": [],
    "net": "2 BiCl3 + 3 Cu → 2 Bi + 3 CuCl2"
  },
  {
    "id": "forensic-bismuth-nitrate-oxychloride",
    "name": "Sodium chloride and water precipitation of bismuth oxychloride",
    "reactants": [
      "bi-no3-3",
      "nacl",
      "water"
    ],
    "products": [
      "biocl",
      "nano3",
      "hno3"
    ],
    "enthalpy": -42,
    "desc": "Forensic detection: adding dilute brine to bismuth nitrate hydrolyzes out characteristic dense white BiOCl.",
    "type": "precipitation",
    "effects": [],
    "net": "Bi(NO3)3 + NaCl + H2O → BiOCl + NaNO3 + 2 HNO3"
  },
  {
    "id": "forensic-bismuth-nitrate-kcl",
    "name": "Potassium chloride and water precipitation of bismuth oxychloride",
    "reactants": [
      "bi-no3-3",
      "kcl",
      "water"
    ],
    "products": [
      "biocl",
      "kno3",
      "hno3"
    ],
    "enthalpy": -44,
    "desc": "Precipitation of pearlescent white bismuth oxychloride with KCl.",
    "type": "precipitation",
    "effects": [],
    "net": "Bi(NO3)3 + KCl + H2O → BiOCl + KNO3 + 2 HNO3"
  },
  {
    "id": "forensic-bi2o3-hcl",
    "name": "Hydrochloric acid digestion of bismuth(III) oxide",
    "reactants": [
      "bi2o3",
      "hcl"
    ],
    "products": [
      "bicl3",
      "water"
    ],
    "enthalpy": -215,
    "desc": "Acid leaching of bismuth cosmetic / toxicological samples to aqueous trichloride.",
    "type": "neutralization",
    "effects": [],
    "net": "Bi2O3 + 6 HCl → 2 BiCl3 + 3 H2O"
  },
  {
    "id": "forensic-bi2o3-hno3",
    "name": "Nitric acid digestion of bismuth(III) oxide",
    "reactants": [
      "bi2o3",
      "hno3"
    ],
    "products": [
      "bi-no3-3",
      "water"
    ],
    "enthalpy": -230,
    "desc": "Nitric dissolution of bismuth trioxide to soluble nitrate.",
    "type": "neutralization",
    "effects": [],
    "net": "Bi2O3 + 6 HNO3 → 2 Bi(NO3)3 + 3 H2O"
  },
  {
    "id": "forensic-bi2o3-h2s",
    "name": "Hydrogen sulfide precipitation of bismuth sulfide from oxide",
    "reactants": [
      "bi2o3",
      "h2s"
    ],
    "products": [
      "bi2s3",
      "water"
    ],
    "enthalpy": -165,
    "desc": "Sulfide staining: conversion of pale yellow Bi2O3 into dark brown-black Bi2S3.",
    "type": "metathesis",
    "effects": [],
    "net": "Bi2O3 + 3 H2S → Bi2S3 + 3 H2O"
  },
  {
    "id": "forensic-bioh3-hcl",
    "name": "Hydrochloric acid dissolution of bismuth(III) hydroxide",
    "reactants": [
      "bi-oh-3",
      "hcl"
    ],
    "products": [
      "bicl3",
      "water"
    ],
    "enthalpy": -110,
    "desc": "Neutralization of bismuth hydroxide forming bismuth chloride.",
    "type": "neutralization",
    "effects": [],
    "net": "Bi(OH)3 + 3 HCl → BiCl3 + 3 H2O"
  },
  {
    "id": "forensic-bioh3-h2s",
    "name": "Hydrogen sulfide reaction with bismuth(III) hydroxide",
    "reactants": [
      "bi-oh-3",
      "h2s"
    ],
    "products": [
      "bi2s3",
      "water"
    ],
    "enthalpy": -145,
    "desc": "Sulfide spot test turning white bismuth hydroxide into dark brown-black Bi2S3.",
    "type": "metathesis",
    "effects": [],
    "net": "2 Bi(OH)3 + 3 H2S → Bi2S3 + 6 H2O"
  },
  {
    "id": "forensic-biocl-h2s",
    "name": "Hydrogen sulfide conversion of bismuth oxychloride to bismuth sulfide",
    "reactants": [
      "biocl",
      "h2s"
    ],
    "products": [
      "bi2s3",
      "hcl",
      "water"
    ],
    "enthalpy": -120,
    "desc": "Diagnostic confirmation: exposure of pearl white BiOCl to H2S yields dark brown-black bismuth sulfide.",
    "type": "metathesis",
    "effects": [],
    "net": "2 BiOCl + 3 H2S → Bi2S3 + 2 HCl + 2 H2O"
  },
  {
    "id": "forensic-formaldehyde-dichromate",
    "name": "Potassium dichromate oxidation of formaldehyde",
    "reactants": [
      "hcho",
      "k2cr2o7",
      "h2so4"
    ],
    "products": [
      "hcooh",
      "cr2-so4-3",
      "k2so4",
      "water"
    ],
    "enthalpy": -850,
    "desc": "Toxicology analysis: partial oxidation of formaldehyde to formic acid with emerald green Cr(III) color shift.",
    "type": "redox_other",
    "effects": [],
    "net": "3 HCHO + K2Cr2O7 + 4 H2SO4 → 3 HCOOH + Cr2(SO4)3 + K2SO4 + 4 H2O"
  },
  {
    "id": "forensic-ethylene-glycol-dichromate-oxalic",
    "name": "Sodium dichromate oxidation of toxic ethylene glycol to oxalic acid",
    "reactants": [
      "c2h6o2",
      "na2cr2o7",
      "h2so4"
    ],
    "products": [
      "h2c2o4",
      "cr2-so4-3",
      "na2so4",
      "water"
    ],
    "enthalpy": -2050,
    "desc": "Antifreeze poisoning model: oxidation of ethylene glycol to nephrotoxic oxalic acid with Cr(III) emerald green color shift.",
    "type": "redox_other",
    "effects": [],
    "net": "3 C2H6O2 + 4 Na2Cr2O7 + 16 H2SO4 → 3 H2C2O4 + 4 Cr2(SO4)3 + 4 Na2SO4 + 22 H2O"
  },
  {
    "id": "forensic-kidney-calcium-oxalate",
    "name": "Calcium chloride precipitation of calcium oxalate monohydrate",
    "reactants": [
      "h2c2o4",
      "cacl2"
    ],
    "products": [
      "cac2o4",
      "hcl"
    ],
    "enthalpy": -32,
    "desc": "Forensic post-mortem histology biomarker: precipitation of sharp envelope-shaped calcium oxalate crystals that cause fatal renal failure.",
    "type": "precipitation",
    "effects": [],
    "net": "H2C2O4 + CaCl2 → CaC2O4 + 2 HCl"
  },
  {
    "id": "forensic-formic-permanganate",
    "name": "Permanganate oxidation of formic acid toxicant to carbon dioxide",
    "reactants": [
      "hcooh",
      "kmno4",
      "h2so4"
    ],
    "products": [
      "co2",
      "mnso4",
      "k2so4",
      "water"
    ],
    "enthalpy": -790,
    "desc": "Quantitative toxicological determination of formic acid (blindness-inducing methanol metabolite).",
    "type": "redox_other",
    "effects": [],
    "net": "5 HCOOH + 2 KMnO4 + 3 H2SO4 → 5 CO2 + 2 MnSO4 + K2SO4 + 8 H2O"
  },
  {
    "id": "forensic-formaldehyde-kmno4",
    "name": "Permanganate exhaustive oxidation of formaldehyde",
    "reactants": [
      "hcho",
      "kmno4",
      "h2so4"
    ],
    "products": [
      "co2",
      "mnso4",
      "k2so4",
      "water"
    ],
    "enthalpy": -1240,
    "desc": "Total oxidative destruction of tissue fixative formaldehyde to carbon dioxide.",
    "type": "redox_other",
    "effects": [],
    "net": "5 HCHO + 4 KMnO4 + 6 H2SO4 → 5 CO2 + 4 MnSO4 + 2 K2SO4 + 11 H2O"
  },
  {
    "id": "forensic-kidney-ca-oxalate-caco3",
    "name": "Oxalic acid reaction with calcium carbonate",
    "reactants": [
      "h2c2o4",
      "caco3"
    ],
    "products": [
      "cac2o4",
      "co2",
      "water"
    ],
    "enthalpy": -45,
    "desc": "In vitro model of oxalic acid attacking bone and vascular calcium carbonate stores.",
    "type": "neutralization",
    "effects": [],
    "net": "H2C2O4 + CaCO3 → CaC2O4 + CO2 + H2O"
  }
];
