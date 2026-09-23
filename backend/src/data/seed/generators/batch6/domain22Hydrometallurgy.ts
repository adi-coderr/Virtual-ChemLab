// Domain 22: Hydrometallurgy & Mineral Leaching (105 reactions)
import { addReaction } from "./generateBatch6.js";

export function buildDomain22Hydrometallurgy(): void {
  const reactions = [
  {
    "id": "hydro-au-cyanidation-na",
    "name": "MacArthur-Forrest process: aerated cyanidation of metallic gold",
    "reactants": [
      "au",
      "nacn",
      "o2",
      "water"
    ],
    "products": [
      "na-au-cn-2",
      "naoh"
    ],
    "enthalpy": -430,
    "desc": "Industrial gold extraction: oxygen oxidizes native gold into soluble dicyanoaurate(I).",
    "type": "redox_other",
    "effects": [],
    "net": "4 Au + 8 NaCN + O2 + 2 H2O → 4 NaAuC2N2 + 4 NaOH"
  },
  {
    "id": "hydro-au-cyanidation-k",
    "name": "Potassium cyanide leaching of gold with atmospheric oxygen",
    "reactants": [
      "au",
      "kcn",
      "o2",
      "water"
    ],
    "products": [
      "k-au-cn-2",
      "koh"
    ],
    "enthalpy": -435,
    "desc": "Gold heap leaching dissolution yielding potassium dicyanoaurate.",
    "type": "redox_other",
    "effects": [],
    "net": "4 Au + 8 KCN + O2 + 2 H2O → 4 KAuC2N2 + 4 KOH"
  },
  {
    "id": "hydro-ag-cyanidation-na",
    "name": "MacArthur-Forrest silver dissolution by aerated sodium cyanide",
    "reactants": [
      "ag",
      "nacn",
      "o2",
      "water"
    ],
    "products": [
      "na-ag-cn-2",
      "naoh"
    ],
    "enthalpy": -380,
    "desc": "Cyanide dissolution of native silver into water-soluble silver dicyano complex.",
    "type": "redox_other",
    "effects": [],
    "net": "4 Ag + 8 NaCN + O2 + 2 H2O → 4 NaAgC2N2 + 4 NaOH"
  },
  {
    "id": "hydro-ag-cyanidation-k",
    "name": "Potassium cyanide dissolution of silver metal",
    "reactants": [
      "ag",
      "kcn",
      "o2",
      "water"
    ],
    "products": [
      "k-ag-cn-2",
      "koh"
    ],
    "enthalpy": -385,
    "desc": "Oxidative alkaline cyanidation of native silver.",
    "type": "redox_other",
    "effects": [],
    "net": "4 Ag + 8 KCN + O2 + 2 H2O → 4 KAgC2N2 + 4 KOH"
  },
  {
    "id": "hydro-ag2s-cyanidation-na-peroxide",
    "name": "Peroxide-assisted cyanidation of acanthite/argentite silver sulfide ore",
    "reactants": [
      "ag2s",
      "nacn",
      "h2o2"
    ],
    "products": [
      "na-ag-cn-2",
      "na2so4",
      "water"
    ],
    "enthalpy": -720,
    "desc": "High-efficiency peroxide oxidative cyanide leaching converting silver sulfide to soluble dicyanoargentate.",
    "type": "redox_other",
    "effects": [],
    "net": "Ag2S + 4 NaCN + 4 H2O2 → 2 NaAgC2N2 + Na2SO4 + 4 H2O"
  },
  {
    "id": "hydro-ag2s-cyanidation-k-peroxide",
    "name": "Peroxide-assisted potassium cyanide leaching of argentite ore",
    "reactants": [
      "ag2s",
      "kcn",
      "h2o2"
    ],
    "products": [
      "k-ag-cn-2",
      "k2so4",
      "water"
    ],
    "enthalpy": -725,
    "desc": "Alkaline peroxide cyanidation of silver sulfide.",
    "type": "redox_other",
    "effects": [],
    "net": "Ag2S + 4 KCN + 4 H2O2 → 2 KAgC2N2 + K2SO4 + 4 H2O"
  },
  {
    "id": "hydro-ag2o-cyanidation-na",
    "name": "Cyanide leaching of silver oxide residues",
    "reactants": [
      "ag2o",
      "nacn",
      "water"
    ],
    "products": [
      "na-ag-cn-2",
      "naoh"
    ],
    "enthalpy": -85,
    "desc": "Dissolution of oxidized silver metallurgical slimes into dicyanoargentate.",
    "type": "redox_other",
    "effects": [],
    "net": "Ag2O + 4 NaCN + H2O → 2 NaAgC2N2 + 2 NaOH"
  },
  {
    "id": "hydro-agcl-cyanidation-k",
    "name": "Potassium cyanide leaching of silver chloride",
    "reactants": [
      "agcl",
      "kcn"
    ],
    "products": [
      "k-ag-cn-2",
      "kcl"
    ],
    "enthalpy": -68,
    "desc": "Complexation dissolution of horn silver.",
    "type": "redox_other",
    "effects": [],
    "net": "AgCl + 2 KCN → KAgC2N2 + KCl"
  },
  {
    "id": "hydro-agbr-cyanidation-na",
    "name": "Cyanide dissolution of bromargyrite silver bromide ore",
    "reactants": [
      "agbr",
      "nacn"
    ],
    "products": [
      "na-ag-cn-2",
      "nabr"
    ],
    "enthalpy": -58,
    "desc": "Hydrometallurgical recovery of silver from bromide ores.",
    "type": "redox_other",
    "effects": [],
    "net": "AgBr + 2 NaCN → NaAgC2N2 + NaBr"
  },
  {
    "id": "hydro-agbr-cyanidation-k",
    "name": "Potassium cyanide dissolution of silver bromide",
    "reactants": [
      "agbr",
      "kcn"
    ],
    "products": [
      "k-ag-cn-2",
      "kbr"
    ],
    "enthalpy": -60,
    "desc": "Alkaline cyanide dissolution of bromargyrite.",
    "type": "redox_other",
    "effects": [],
    "net": "AgBr + 2 KCN → KAgC2N2 + KBr"
  },
  {
    "id": "hydro-agi-cyanidation-na",
    "name": "Cyanide dissolution of iodargyrite silver iodide ore",
    "reactants": [
      "agi",
      "nacn"
    ],
    "products": [
      "na-ag-cn-2",
      "nai"
    ],
    "enthalpy": -42,
    "desc": "High-efficiency cyanidation of refractory silver iodide minerals.",
    "type": "redox_other",
    "effects": [],
    "net": "AgI + 2 NaCN → NaAgC2N2 + NaI"
  },
  {
    "id": "hydro-agi-cyanidation-k",
    "name": "Potassium cyanide dissolution of silver iodide",
    "reactants": [
      "agi",
      "kcn"
    ],
    "products": [
      "k-ag-cn-2",
      "ki"
    ],
    "enthalpy": -44,
    "desc": "Solubilization of silver iodide in potassium cyanide.",
    "type": "redox_other",
    "effects": [],
    "net": "AgI + 2 KCN → KAgC2N2 + KI"
  },
  {
    "id": "hydro-au-peroxide-cyanidation",
    "name": "Hydrogen peroxide accelerated cyanidation of native gold",
    "reactants": [
      "au",
      "nacn",
      "h2o2"
    ],
    "products": [
      "na-au-cn-2",
      "naoh"
    ],
    "enthalpy": -510,
    "desc": "Peroxide-assisted high-intensity gold leaching.",
    "type": "redox_other",
    "effects": [],
    "net": "2 Au + 4 NaCN + H2O2 → 2 NaAuC2N2 + 2 NaOH"
  },
  {
    "id": "hydro-ag-peroxide-cyanidation",
    "name": "Hydrogen peroxide accelerated cyanidation of silver",
    "reactants": [
      "ag",
      "nacn",
      "h2o2"
    ],
    "products": [
      "na-ag-cn-2",
      "naoh"
    ],
    "enthalpy": -470,
    "desc": "Peroxide oxidation of silver in alkaline cyanide solution.",
    "type": "redox_other",
    "effects": [],
    "net": "2 Ag + 4 NaCN + H2O2 → 2 NaAgC2N2 + 2 NaOH"
  },
  {
    "id": "hydro-merrill-crowe-zn-au",
    "name": "Merrill-Crowe process: zinc dust cementation of gold from cyanide solution",
    "reactants": [
      "na-au-cn-2",
      "zn",
      "naoh"
    ],
    "products": [
      "au",
      "na2-zn-oh-4",
      "nacn"
    ],
    "enthalpy": -210,
    "desc": "Sacrificial zinc dust reduces gold(I) out of pregnant leach liquor to metallic gold sponge.",
    "type": "redox_other",
    "effects": [],
    "net": "2 NaAuC2N2 + Zn + 4 NaOH → 2 Au + Na2[Zn(OH)4] + 4 NaCN"
  },
  {
    "id": "hydro-bayer-alumina-digestion",
    "name": "Bayer process: high-temperature caustic digestion of alumina",
    "reactants": [
      "al2o3",
      "naoh"
    ],
    "products": [
      "na-alo2",
      "water"
    ],
    "enthalpy": -45,
    "desc": "Caustic digestion of anhydrous bauxite alumina.",
    "type": "redox_other",
    "effects": [],
    "net": "Al2O3 + 2 NaOH → 2 NaAlO2 + H2O"
  },
  {
    "id": "hydro-bayer-potash-alumina",
    "name": "Caustic potash digestion of aluminum oxide",
    "reactants": [
      "al2o3",
      "koh"
    ],
    "products": [
      "k-alo2",
      "water"
    ],
    "enthalpy": -48,
    "desc": "Potassium hydroxide digestion of alumina.",
    "type": "redox_other",
    "effects": [],
    "net": "Al2O3 + 2 KOH → 2 KAlO2 + H2O"
  },
  {
    "id": "hydro-bayer-precipitation-cooling",
    "name": "Bayer precipitation: seeding and decomposition of sodium aluminate liquor",
    "reactants": [
      "na-alo2",
      "water"
    ],
    "products": [
      "al-oh-3",
      "naoh"
    ],
    "enthalpy": -35,
    "desc": "Controlled cooling and seed addition precipitating coarse sandy metallurgical gibbsite.",
    "type": "redox_other",
    "effects": [],
    "net": "NaAlO2 + 2 H2O → Al(OH)3 + NaOH"
  },
  {
    "id": "hydro-bayer-potash-precipitation",
    "name": "Hydrolytic precipitation of gibbsite from potassium aluminate liquor",
    "reactants": [
      "k-alo2",
      "water"
    ],
    "products": [
      "al-oh-3",
      "koh"
    ],
    "enthalpy": -32,
    "desc": "Decomposition of supersaturated potassium aluminate solution.",
    "type": "redox_other",
    "effects": [],
    "net": "KAlO2 + 2 H2O → Al(OH)3 + KOH"
  },
  {
    "id": "hydro-bayer-co2-carbonation-na",
    "name": "Carbonation of Bayer sodium aluminate liquor",
    "reactants": [
      "na-alo2",
      "co2",
      "water"
    ],
    "products": [
      "al-oh-3",
      "nahco3"
    ],
    "enthalpy": -78,
    "desc": "Accelerated carbonation precipitating fine chemical-grade aluminum trihydroxide.",
    "type": "redox_other",
    "effects": [],
    "net": "NaAlO2 + CO2 + 2 H2O → Al(OH)3 + NaHCO3"
  },
  {
    "id": "hydro-bayer-co2-carbonation-k",
    "name": "Carbonation of potassium aluminate liquor by carbon dioxide",
    "reactants": [
      "k-alo2",
      "co2",
      "water"
    ],
    "products": [
      "al-oh-3",
      "khco3"
    ],
    "enthalpy": -80,
    "desc": "Carbon dioxide precipitation of pure aluminum hydroxide from potash liquor.",
    "type": "redox_other",
    "effects": [],
    "net": "KAlO2 + CO2 + 2 H2O → Al(OH)3 + KHCO3"
  },
  {
    "id": "hydro-bayer-alumina-sulfuric",
    "name": "Acid process for low-grade bauxite: sulfuric acid leaching of alumina",
    "reactants": [
      "al2o3",
      "h2so4"
    ],
    "products": [
      "al2-so4-3",
      "water"
    ],
    "enthalpy": -195,
    "desc": "Acid extraction generating aluminum sulfate coagulant for water treatment.",
    "type": "redox_other",
    "effects": [],
    "net": "Al2O3 + 3 H2SO4 → Al2(SO4)3 + 3 H2O"
  },
  {
    "id": "hydro-bayer-alumina-hbr",
    "name": "Hydrobromic acid leaching of alumina bauxite",
    "reactants": [
      "al2o3",
      "hbr"
    ],
    "products": [
      "albr3",
      "water"
    ],
    "enthalpy": -185,
    "desc": "Acidic dissolution yielding aluminum bromide precursor.",
    "type": "redox_other",
    "effects": [],
    "net": "Al2O3 + 6 HBr → 2 AlBr3 + 3 H2O"
  },
  {
    "id": "hydro-bayer-alumina-hno3",
    "name": "Nitric acid dissolution of aluminum oxide",
    "reactants": [
      "al2o3",
      "hno3"
    ],
    "products": [
      "al-no3-3",
      "water"
    ],
    "enthalpy": -180,
    "desc": "Production of high-purity aluminum nitrate catalyst support precursor.",
    "type": "redox_other",
    "effects": [],
    "net": "Al2O3 + 6 HNO3 → 2 Al(NO3)3 + 3 H2O"
  },
  {
    "id": "hydro-bayer-desilication-soda-sinter",
    "name": "Thermal desilication sintering of silica with soda ash",
    "reactants": [
      "sio2",
      "na2co3"
    ],
    "products": [
      "na2sio3",
      "co2"
    ],
    "enthalpy": 95,
    "desc": "Solid-state sintering converting quartz gangue into soluble sodium metasilicate.",
    "type": "redox_other",
    "effects": [],
    "net": "SiO2 + Na2CO3 → Na2SiO3 + CO2"
  },
  {
    "id": "hydro-bayer-desilication-potash-sinter",
    "name": "Potash sintering of quartz gangue",
    "reactants": [
      "sio2",
      "k2co3"
    ],
    "products": [
      "k2sio3",
      "co2"
    ],
    "enthalpy": 98,
    "desc": "Thermal sintering with potassium carbonate.",
    "type": "redox_other",
    "effects": [],
    "net": "SiO2 + K2CO3 → K2SiO3 + CO2"
  },
  {
    "id": "hydro-bayer-soda-lime-sinter",
    "name": "Soda-lime sinter process: roasting diasporic bauxite with limestone",
    "reactants": [
      "al2o3",
      "na2co3"
    ],
    "products": [
      "na-alo2",
      "co2"
    ],
    "enthalpy": 125,
    "desc": "High-temperature alkaline sintering for low-grade high-silica bauxite ores.",
    "type": "redox_other",
    "effects": [],
    "net": "Al2O3 + Na2CO3 → 2 NaAlO2 + CO2"
  },
  {
    "id": "hydro-bayer-potash-sinter",
    "name": "Potash sintering of aluminum oxide",
    "reactants": [
      "al2o3",
      "k2co3"
    ],
    "products": [
      "k-alo2",
      "co2"
    ],
    "enthalpy": 130,
    "desc": "Thermal sintering with potassium carbonate.",
    "type": "redox_other",
    "effects": [],
    "net": "Al2O3 + K2CO3 → 2 KAlO2 + CO2"
  },
  {
    "id": "hydro-bayer-lime-potash-bicarb-causticization",
    "name": "Causticization of potassium bicarbonate liquor with slaked lime",
    "reactants": [
      "khco3",
      "caoh2"
    ],
    "products": [
      "caco3",
      "koh",
      "water"
    ],
    "enthalpy": -26,
    "desc": "Regeneration of active caustic potash from carbonated liquor.",
    "type": "redox_other",
    "effects": [],
    "net": "KHCO3 + Ca(OH)2 → CaCO3 + KOH + H2O"
  },
  {
    "id": "hydro-bayer-potash-causticization",
    "name": "Causticization of potassium carbonate with lime",
    "reactants": [
      "k2co3",
      "caoh2"
    ],
    "products": [
      "caco3",
      "koh"
    ],
    "enthalpy": -16,
    "desc": "Regeneration of potassium hydroxide from carbonate solutions.",
    "type": "redox_other",
    "effects": [],
    "net": "K2CO3 + Ca(OH)2 → CaCO3 + 2 KOH"
  },
  {
    "id": "hydro-cu-chalcocite-ferric-leach-1",
    "name": "Ferric sulfate leaching of chalcocite (Stage 1)",
    "reactants": [
      "cu2s",
      "fe2-so4-3"
    ],
    "products": [
      "cuso4",
      "feso4",
      "cus"
    ],
    "enthalpy": -110,
    "desc": "First rapid stage of chalcocite heap leaching converting Cu2S to covellite (CuS).",
    "type": "redox_other",
    "effects": [],
    "net": "Cu2S + Fe2(SO4)3 → CuSO4 + 2 FeSO4 + CuS"
  },
  {
    "id": "hydro-cu-covellite-ferric-chloride",
    "name": "Ferric chloride leaching of covellite copper ore",
    "reactants": [
      "cus",
      "fecl3"
    ],
    "products": [
      "cucl2",
      "fecl2",
      "s"
    ],
    "enthalpy": -60,
    "desc": "Chloride hydrometallurgy leaching of covellite yielding copper(II) chloride and sulfur.",
    "type": "redox_other",
    "effects": [],
    "net": "CuS + 2 FeCl3 → CuCl2 + 2 FeCl2 + S"
  },
  {
    "id": "hydro-cu-chalcopyrite-ferric-leach",
    "name": "Atmospheric ferric chloride leaching of chalcopyrite ore",
    "reactants": [
      "cu-fe-s2",
      "fecl3"
    ],
    "products": [
      "cucl2",
      "fecl2",
      "s"
    ],
    "enthalpy": -85,
    "desc": "Chloride hydrometallurgy: ferric chloride attack liberating cupric chloride and sulfur.",
    "type": "redox_other",
    "effects": [],
    "net": "CuFeS2 + 4 FeCl3 → CuCl2 + 5 FeCl2 + 2 S"
  },
  {
    "id": "hydro-cu-cementation-aluminum",
    "name": "Aluminum scrap cementation of copper from copper sulfate solution",
    "reactants": [
      "cuso4",
      "al"
    ],
    "products": [
      "cu",
      "al2-so4-3"
    ],
    "enthalpy": -480,
    "desc": "Galvanic displacement of copper by scrap aluminum wire.",
    "type": "redox_other",
    "effects": [],
    "net": "3 CuSO4 + 2 Al → 3 Cu + Al2(SO4)3"
  },
  {
    "id": "hydro-cuno32-iron-cementation",
    "name": "Scrap iron cementation of copper from copper(II) nitrate liquor",
    "reactants": [
      "cuno32",
      "fe"
    ],
    "products": [
      "cu",
      "fe-no3-2"
    ],
    "enthalpy": -165,
    "desc": "Galvanic displacement of copper from nitrate pregnant leach solution.",
    "type": "redox_other",
    "effects": [],
    "net": "Cu(NO3)2 + Fe → Cu + Fe(NO3)2"
  },
  {
    "id": "hydro-cu-malachite-acid-leach",
    "name": "Sulfuric acid leaching of malachite / copper carbonate ore",
    "reactants": [
      "cuco3",
      "h2so4"
    ],
    "products": [
      "cuso4",
      "co2",
      "water"
    ],
    "enthalpy": -62,
    "desc": "Rapid ambient atmospheric heap leaching of oxidized copper carbonate ores.",
    "type": "redox_other",
    "effects": [],
    "net": "CuCO3 + H2SO4 → CuSO4 + CO2 + H2O"
  },
  {
    "id": "hydro-cu-malachite-hcl-leach",
    "name": "Hydrochloric acid leaching of copper carbonate ore",
    "reactants": [
      "cuco3",
      "hcl"
    ],
    "products": [
      "cucl2",
      "co2",
      "water"
    ],
    "enthalpy": -65,
    "desc": "Chloride heap leaching of oxidized malachite ores.",
    "type": "redox_other",
    "effects": [],
    "net": "CuCO3 + 2 HCl → CuCl2 + CO2 + H2O"
  },
  {
    "id": "hydro-cu-malachite-hno3-leach",
    "name": "Nitric acid leaching of malachite copper ore",
    "reactants": [
      "cuco3",
      "hno3"
    ],
    "products": [
      "cuno32",
      "co2",
      "water"
    ],
    "enthalpy": -68,
    "desc": "Oxidative dissolution of basic copper carbonate.",
    "type": "redox_other",
    "effects": [],
    "net": "CuCO3 + 2 HNO3 → Cu(NO3)2 + CO2 + H2O"
  },
  {
    "id": "hydro-cu-cuo-acetic-leach",
    "name": "Acetic acid leaching of oxidized copper ore",
    "reactants": [
      "cuo",
      "ch3cooh"
    ],
    "products": [
      "ch3coo-2-cu",
      "water"
    ],
    "enthalpy": -85,
    "desc": "Mild organic acid leaching producing copper acetate.",
    "type": "redox_other",
    "effects": [],
    "net": "CuO + 2 CH3COOH → Cu(CH3COO)2 + H2O"
  },
  {
    "id": "hydro-cu-cu2o-acid-leach",
    "name": "Sulfuric acid disproportionation leaching of cuprite (copper(I) oxide)",
    "reactants": [
      "cu2o",
      "h2so4"
    ],
    "products": [
      "cu",
      "cuso4",
      "water"
    ],
    "enthalpy": -85,
    "desc": "Acid attack on cuprite generating soluble copper sulfate and elemental copper.",
    "type": "redox_other",
    "effects": [],
    "net": "Cu2O + H2SO4 → Cu + CuSO4 + H2O"
  },
  {
    "id": "hydro-cu-cu2o-hcl-leach",
    "name": "Hydrochloric acid disproportionation leaching of cuprite",
    "reactants": [
      "cu2o",
      "hcl"
    ],
    "products": [
      "cu",
      "cucl2",
      "water"
    ],
    "enthalpy": -88,
    "desc": "Disproportionation of copper(I) oxide in hydrochloric acid.",
    "type": "redox_other",
    "effects": [],
    "net": "Cu2O + 2 HCl → Cu + CuCl2 + H2O"
  },
  {
    "id": "hydro-cu-cu2o-hno3-leach",
    "name": "Nitric acid oxidative dissolution of cuprite",
    "reactants": [
      "cu2o",
      "hno3"
    ],
    "products": [
      "cuno32",
      "no2",
      "water"
    ],
    "enthalpy": -210,
    "desc": "Oxidative dissolution of cuprous oxide to cupric nitrate.",
    "type": "redox_other",
    "effects": [],
    "net": "Cu2O + 6 HNO3 → 2 Cu(NO3)2 + 2 NO2 + 3 H2O"
  },
  {
    "id": "hydro-cu-chalcocite-oxygen-leach",
    "name": "Pressure acid leaching of chalcocite with oxygen",
    "reactants": [
      "cu2s",
      "o2",
      "h2so4"
    ],
    "products": [
      "cuso4",
      "water"
    ],
    "enthalpy": -680,
    "desc": "Autoclave total pressure oxidation of chalcocite.",
    "type": "redox_other",
    "effects": [],
    "net": "2 Cu2S + 5 O2 + 2 H2SO4 → 4 CuSO4 + 2 H2O"
  },
  {
    "id": "hydro-cu-chalcopyrite-oxygen-pox",
    "name": "Total pressure oxidation (POX) of chalcopyrite concentrate in autoclave",
    "reactants": [
      "cu-fe-s2",
      "o2",
      "water"
    ],
    "products": [
      "cuso4",
      "fe2o3",
      "h2so4"
    ],
    "enthalpy": -1750,
    "desc": "High-temperature autoclave POX at 220°C converting chalcopyrite into soluble CuSO4 and stable hematite.",
    "type": "redox_other",
    "effects": [],
    "net": "4 CuFeS2 + 17 O2 + 4 H2O → 4 CuSO4 + 2 Fe2O3 + 4 H2SO4"
  },
  {
    "id": "hydro-cu-chalcocite-fecl3-leach",
    "name": "Ferric chloride leaching of chalcocite ore",
    "reactants": [
      "cu2s",
      "fecl3"
    ],
    "products": [
      "cucl2",
      "fecl2",
      "s"
    ],
    "enthalpy": -95,
    "desc": "Rapid chloride hydrometallurgy extraction of chalcocite.",
    "type": "redox_other",
    "effects": [],
    "net": "Cu2S + 4 FeCl3 → 2 CuCl2 + 4 FeCl2 + S"
  },
  {
    "id": "hydro-zn-calcine-acetic-leach",
    "name": "Acetic acid leaching of roasted zinc calcine",
    "reactants": [
      "zno",
      "ch3cooh"
    ],
    "products": [
      "ch3coo-2-zn",
      "water"
    ],
    "enthalpy": -75,
    "desc": "Selective organic acid leaching of zinc oxide producing zinc acetate.",
    "type": "redox_other",
    "effects": [],
    "net": "ZnO + 2 CH3COOH → (CH3COO)2Zn + H2O"
  },
  {
    "id": "hydro-zn-calcine-soda-bicarbonate",
    "name": "Conversion of zinc oxide calcine by sodium bicarbonate",
    "reactants": [
      "zno",
      "nahco3"
    ],
    "products": [
      "znco3",
      "naoh"
    ],
    "enthalpy": -28,
    "desc": "Alkaline carbonation of zinc oxide calcines.",
    "type": "redox_other",
    "effects": [],
    "net": "ZnO + NaHCO3 → ZnCO3 + NaOH"
  },
  {
    "id": "hydro-zn-calcine-ammonium-leach",
    "name": "Ammoniacal ammonium carbonate leaching of zinc calcine",
    "reactants": [
      "zno",
      "nh4hco3"
    ],
    "products": [
      "znco3",
      "ammonia",
      "water"
    ],
    "enthalpy": -45,
    "desc": "Hydrometallurgical Caron-type ammoniacal extraction of zinc.",
    "type": "redox_other",
    "effects": [],
    "net": "ZnO + NH4HCO3 → ZnCO3 + NH3 + H2O"
  },
  {
    "id": "hydro-zn-calcine-soda-ash",
    "name": "Sodium carbonate conversion of zinc oxide in hydrothermal brine",
    "reactants": [
      "zno",
      "na2co3",
      "water"
    ],
    "products": [
      "znco3",
      "naoh"
    ],
    "enthalpy": -25,
    "desc": "Conversion of zinc calcine to insoluble zinc carbonate.",
    "type": "redox_other",
    "effects": [],
    "net": "ZnO + Na2CO3 + H2O → ZnCO3 + 2 NaOH"
  },
  {
    "id": "hydro-zn-sphalerite-ferric-leach",
    "name": "Direct ferric sulfate leaching of sphalerite zinc sulfide concentrate",
    "reactants": [
      "zns",
      "fe2-so4-3"
    ],
    "products": [
      "znso4",
      "feso4",
      "s"
    ],
    "enthalpy": -70,
    "desc": "Non-oxidative roasting bypass: ferric sulfate oxidation of zinc sulfide to elemental sulfur.",
    "type": "redox_other",
    "effects": [],
    "net": "ZnS + Fe2(SO4)3 → ZnSO4 + 2 FeSO4 + S"
  },
  {
    "id": "hydro-zn-sphalerite-ferric-chloride",
    "name": "Direct ferric chloride leaching of sphalerite concentrate",
    "reactants": [
      "zns",
      "fecl3"
    ],
    "products": [
      "zncl2",
      "fecl2",
      "s"
    ],
    "enthalpy": -75,
    "desc": "Chloride hydrometallurgy direct leaching of zinc blende.",
    "type": "redox_other",
    "effects": [],
    "net": "ZnS + 2 FeCl3 → ZnCl2 + 2 FeCl2 + S"
  },
  {
    "id": "hydro-zn-sphalerite-oxygen-leach",
    "name": "Sherritt direct pressure oxygen leaching of zinc sulfide concentrate",
    "reactants": [
      "zns",
      "o2",
      "h2so4"
    ],
    "products": [
      "znso4",
      "s",
      "water"
    ],
    "enthalpy": -420,
    "desc": "Commercial autoclave direct leaching avoiding sulfur dioxide roasting emissions.",
    "type": "redox_other",
    "effects": [],
    "net": "2 ZnS + O2 + 2 H2SO4 → 2 ZnSO4 + 2 S + 2 H2O"
  },
  {
    "id": "hydro-zn-carbonate-smithsonite-leach",
    "name": "Sulfuric acid leaching of smithsonite (zinc carbonate) ore",
    "reactants": [
      "znco3",
      "h2so4"
    ],
    "products": [
      "znso4",
      "co2",
      "water"
    ],
    "enthalpy": -65,
    "desc": "Atmospheric acid dissolution of oxidized zinc deposits.",
    "type": "redox_other",
    "effects": [],
    "net": "ZnCO3 + H2SO4 → ZnSO4 + CO2 + H2O"
  },
  {
    "id": "hydro-zn-carbonate-hcl-leach",
    "name": "Hydrochloric acid leaching of zinc carbonate ore",
    "reactants": [
      "znco3",
      "hcl"
    ],
    "products": [
      "zncl2",
      "co2",
      "water"
    ],
    "enthalpy": -68,
    "desc": "Acid leaching of smithsonite generating zinc chloride.",
    "type": "redox_other",
    "effects": [],
    "net": "ZnCO3 + 2 HCl → ZnCl2 + CO2 + H2O"
  },
  {
    "id": "hydro-zn-carbonate-hno3-leach",
    "name": "Nitric acid dissolution of smithsonite zinc ore",
    "reactants": [
      "znco3",
      "hno3"
    ],
    "products": [
      "zn-no3-2",
      "co2",
      "water"
    ],
    "enthalpy": -70,
    "desc": "Nitric acid dissolution of zinc carbonate.",
    "type": "redox_other",
    "effects": [],
    "net": "ZnCO3 + 2 HNO3 → Zn(NO3)2 + CO2 + H2O"
  },
  {
    "id": "hydro-zn-purif-pb-cementation",
    "name": "Electrolyte purification: zinc dust removal of lead ions",
    "reactants": [
      "pbso4",
      "zn"
    ],
    "products": [
      "pb",
      "znso4"
    ],
    "enthalpy": -160,
    "desc": "Zinc dust cementation removing trace soluble lead before electrowinning.",
    "type": "redox_other",
    "effects": [],
    "net": "PbSO4 + Zn → Pb + ZnSO4"
  },
  {
    "id": "hydro-zn-purif-pbbr2-cementation",
    "name": "Cementation of lead from bromide brine by zinc dust",
    "reactants": [
      "pbbr2",
      "zn"
    ],
    "products": [
      "pb",
      "znbr2"
    ],
    "enthalpy": -165,
    "desc": "Galvanic displacement of lead.",
    "type": "redox_other",
    "effects": [],
    "net": "PbBr2 + Zn → Pb + ZnBr2"
  },
  {
    "id": "hydro-zn-purif-sncl2-cementation",
    "name": "Cementation of tin impurities from zinc electrolyte by zinc dust",
    "reactants": [
      "sncl2",
      "zn"
    ],
    "products": [
      "sn",
      "zncl2"
    ],
    "enthalpy": -140,
    "desc": "Removal of harmful tin impurities from electrowinning feed.",
    "type": "redox_other",
    "effects": [],
    "net": "SnCl2 + Zn → Sn + ZnCl2"
  },
  {
    "id": "hydro-zn-purif-snso4-cementation",
    "name": "Cementation of tin from zinc sulfate electrolyte by zinc dust",
    "reactants": [
      "snso4",
      "zn"
    ],
    "products": [
      "sn",
      "znso4"
    ],
    "enthalpy": -135,
    "desc": "Precipitation of metallic tin sponge.",
    "type": "redox_other",
    "effects": [],
    "net": "SnSO4 + Zn → Sn + ZnSO4"
  },
  {
    "id": "hydro-zn-purif-nino32-cementation",
    "name": "Cementation of nickel from zinc nitrate solution by zinc dust",
    "reactants": [
      "ni-no3-2",
      "zn"
    ],
    "products": [
      "ni",
      "zn-no3-2"
    ],
    "enthalpy": -122,
    "desc": "Precipitation of nickel sponge.",
    "type": "redox_other",
    "effects": [],
    "net": "Ni(NO3)2 + Zn → Ni + Zn(NO3)2"
  },
  {
    "id": "hydro-coo-sulfuric-leach",
    "name": "Sulfuric acid leaching of cobalt(II) oxide",
    "reactants": [
      "coo",
      "h2so4"
    ],
    "products": [
      "coso4",
      "water"
    ],
    "enthalpy": -108,
    "desc": "Acid leaching of cobalt oxide laterite deposits.",
    "type": "redox_other",
    "effects": [],
    "net": "CoO + H2SO4 → CoSO4 + H2O"
  },
  {
    "id": "hydro-coo-hcl-leach",
    "name": "Hydrochloric acid leaching of cobalt(II) oxide ore",
    "reactants": [
      "coo",
      "hcl"
    ],
    "products": [
      "cocl2",
      "water"
    ],
    "enthalpy": -112,
    "desc": "Atmospheric chloride leaching of cobalt oxide.",
    "type": "redox_other",
    "effects": [],
    "net": "CoO + 2 HCl → CoCl2 + H2O"
  },
  {
    "id": "hydro-coo-hno3-leach",
    "name": "Nitric acid leaching of cobalt(II) oxide",
    "reactants": [
      "coo",
      "hno3"
    ],
    "products": [
      "co-no3-2",
      "water"
    ],
    "enthalpy": -116,
    "desc": "Nitric acid dissolution of cobalt oxide.",
    "type": "redox_other",
    "effects": [],
    "net": "CoO + 2 HNO3 → Co(NO3)2 + H2O"
  },
  {
    "id": "hydro-nio-hno3-leach",
    "name": "Nitric acid leaching of nickel(II) oxide laterite",
    "reactants": [
      "nio",
      "hno3"
    ],
    "products": [
      "ni-no3-2",
      "water"
    ],
    "enthalpy": -118,
    "desc": "Nitric acid extraction of nickel from lateritic ores.",
    "type": "redox_other",
    "effects": [],
    "net": "NiO + 2 HNO3 → Ni(NO3)2 + H2O"
  },
  {
    "id": "hydro-nio-fecl3-leach",
    "name": "Ferric chloride leaching of nickel(II) oxide",
    "reactants": [
      "nio",
      "fecl3",
      "water"
    ],
    "products": [
      "nicl2",
      "feoh3"
    ],
    "enthalpy": -65,
    "desc": "Ferric chloride displacement leaching of nickel oxide.",
    "type": "redox_other",
    "effects": [],
    "net": "3 NiO + 2 FeCl3 + 3 H2O → 3 NiCl2 + 2 Fe(OH)3"
  },
  {
    "id": "hydro-ni-sulfide-ferric-leach",
    "name": "Ferric sulfate leaching of millerite nickel sulfide ore",
    "reactants": [
      "nis",
      "fe2-so4-3"
    ],
    "products": [
      "niso4",
      "feso4",
      "s"
    ],
    "enthalpy": -60,
    "desc": "Atmospheric ferric leaching of nickel sulfide concentrates.",
    "type": "redox_other",
    "effects": [],
    "net": "NiS + Fe2(SO4)3 → NiSO4 + 2 FeSO4 + S"
  },
  {
    "id": "hydro-ni-sulfide-ferric-chloride",
    "name": "Ferric chloride leaching of nickel sulfide",
    "reactants": [
      "nis",
      "fecl3"
    ],
    "products": [
      "nicl2",
      "fecl2",
      "s"
    ],
    "enthalpy": -65,
    "desc": "Chloride hydrometallurgy leaching of millerite.",
    "type": "redox_other",
    "effects": [],
    "net": "NiS + 2 FeCl3 → NiCl2 + 2 FeCl2 + S"
  },
  {
    "id": "hydro-ni-sulfide-oxygen-pox",
    "name": "Total pressure oxidation of nickel sulfide concentrate",
    "reactants": [
      "nis",
      "o2",
      "h2so4"
    ],
    "products": [
      "niso4",
      "s",
      "water"
    ],
    "enthalpy": -410,
    "desc": "High-pressure autoclave leaching of nickel matte/concentrates.",
    "type": "redox_other",
    "effects": [],
    "net": "2 NiS + O2 + 2 H2SO4 → 2 NiSO4 + 2 S + 2 H2O"
  },
  {
    "id": "hydro-co-sulfide-oxygen-pox",
    "name": "Autoclave pressure oxidation of cobalt(II) sulfide",
    "reactants": [
      "co-s",
      "o2",
      "h2so4"
    ],
    "products": [
      "coso4",
      "s",
      "water"
    ],
    "enthalpy": -405,
    "desc": "Hydrometallurgical extraction of cobalt from sulfide concentrates.",
    "type": "redox_other",
    "effects": [],
    "net": "2 CoS + O2 + 2 H2SO4 → 2 CoSO4 + 2 S + 2 H2O"
  },
  {
    "id": "hydro-ni-msp-sulfide-precip",
    "name": "Mixed sulfide precipitation (MSP): H2S precipitation of nickel from HPAL liquor",
    "reactants": [
      "niso4",
      "h2s"
    ],
    "products": [
      "nis",
      "h2so4"
    ],
    "enthalpy": -85,
    "desc": "Selective recovery of nickel from pregnant leach solution using hydrogen sulfide gas.",
    "type": "redox_other",
    "effects": [],
    "net": "NiSO4 + H2S → NiS + H2SO4"
  },
  {
    "id": "hydro-co-msp-sulfide-precip",
    "name": "Mixed sulfide precipitation of cobalt using hydrogen sulfide",
    "reactants": [
      "coso4",
      "h2s"
    ],
    "products": [
      "co-s",
      "h2so4"
    ],
    "enthalpy": -82,
    "desc": "Precipitation of mixed nickel-cobalt sulfide intermediate (MSP).",
    "type": "redox_other",
    "effects": [],
    "net": "CoSO4 + H2S → CoS + H2SO4"
  },
  {
    "id": "hydro-ni-mhp-hydroxide-precip",
    "name": "Mixed hydroxide precipitation (MHP): magnesia precipitation of nickel",
    "reactants": [
      "niso4",
      "mgoh2"
    ],
    "products": [
      "nioh2",
      "mgso4"
    ],
    "enthalpy": -30,
    "desc": "Commercial MHP intermediate production using calcined magnesia (MgO/Mg(OH)2).",
    "type": "redox_other",
    "effects": [],
    "net": "NiSO4 + Mg(OH)2 → Ni(OH)2 + MgSO4"
  },
  {
    "id": "hydro-co-mhp-hydroxide-precip",
    "name": "Magnesia precipitation of cobalt hydroxide (MHP process)",
    "reactants": [
      "coso4",
      "mgoh2"
    ],
    "products": [
      "cooh2",
      "mgso4"
    ],
    "enthalpy": -28,
    "desc": "Co-precipitation of cobalt hydroxide in MHP intermediate.",
    "type": "redox_other",
    "effects": [],
    "net": "CoSO4 + Mg(OH)2 → Co(OH)2 + MgSO4"
  },
  {
    "id": "hydro-ni-soda-ash-precip",
    "name": "Precipitation of basic nickel carbonate from purified leach liquor",
    "reactants": [
      "niso4",
      "na2co3"
    ],
    "products": [
      "nico3",
      "na2so4"
    ],
    "enthalpy": -22,
    "desc": "Soda ash precipitation of battery-grade nickel carbonate precursor.",
    "type": "redox_other",
    "effects": [],
    "net": "NiSO4 + Na2CO3 → NiCO3 + Na2SO4"
  },
  {
    "id": "hydro-co-soda-ash-precip",
    "name": "Precipitation of cobalt carbonate from cobalt sulfate liquor",
    "reactants": [
      "coso4",
      "na2co3"
    ],
    "products": [
      "coco3",
      "na2so4"
    ],
    "enthalpy": -24,
    "desc": "Synthesis of high-purity cobalt carbonate precursor for lithium-ion cathode synthesis.",
    "type": "redox_other",
    "effects": [],
    "net": "CoSO4 + Na2CO3 → CoCO3 + Na2SO4"
  },
  {
    "id": "hydro-ni-potash-precip",
    "name": "Potassium carbonate precipitation of nickel carbonate",
    "reactants": [
      "niso4",
      "k2co3"
    ],
    "products": [
      "nico3",
      "k2so4"
    ],
    "enthalpy": -25,
    "desc": "Metathesis generating insoluble nickel carbonate.",
    "type": "redox_other",
    "effects": [],
    "net": "NiSO4 + K2CO3 → NiCO3 + K2SO4"
  },
  {
    "id": "hydro-pb-galena-ferric-leach",
    "name": "Ferric chloride leaching of galena lead sulfide ore",
    "reactants": [
      "pbs",
      "fecl3"
    ],
    "products": [
      "pbcl2",
      "fecl2",
      "s"
    ],
    "enthalpy": -60,
    "desc": "Chloride hydrometallurgy bypass of lead smelting: ferric chloride dissolution of PbS.",
    "type": "redox_other",
    "effects": [],
    "net": "PbS + 2 FeCl3 → PbCl2 + 2 FeCl2 + S"
  },
  {
    "id": "hydro-pb-galena-hno3-leach",
    "name": "Nitric acid oxidation leaching of galena ore",
    "reactants": [
      "pbs",
      "hno3"
    ],
    "products": [
      "pbno32",
      "no",
      "s",
      "water"
    ],
    "enthalpy": -240,
    "desc": "Hydrometallurgical extraction of lead by dilute nitric acid.",
    "type": "redox_other",
    "effects": [],
    "net": "3 PbS + 8 HNO3 → 3 Pb(NO3)2 + 2 NO + 3 S + 4 H2O"
  },
  {
    "id": "hydro-pb-oxide-hno3-leach",
    "name": "Nitric acid leaching of litharge (lead(II) oxide) ore",
    "reactants": [
      "pbo",
      "hno3"
    ],
    "products": [
      "pbno32",
      "water"
    ],
    "enthalpy": -110,
    "desc": "Rapid dissolution of lead oxide in nitric acid.",
    "type": "redox_other",
    "effects": [],
    "net": "PbO + 2 HNO3 → Pb(NO3)2 + H2O"
  },
  {
    "id": "hydro-pb-oxide-hcl-leach",
    "name": "Hydrochloric acid leaching of lead(II) oxide",
    "reactants": [
      "pbo",
      "hcl"
    ],
    "products": [
      "pbcl2",
      "water"
    ],
    "enthalpy": -95,
    "desc": "Hot brine leaching of oxidized lead minerals.",
    "type": "redox_other",
    "effects": [],
    "net": "PbO + 2 HCl → PbCl2 + H2O"
  },
  {
    "id": "hydro-pb-carbonate-cerussite-hno3",
    "name": "Nitric acid leaching of cerussite (lead carbonate) ore",
    "reactants": [
      "pbco3",
      "hno3"
    ],
    "products": [
      "pbno32",
      "co2",
      "water"
    ],
    "enthalpy": -62,
    "desc": "Acid leaching of oxidized lead carbonate deposits.",
    "type": "redox_other",
    "effects": [],
    "net": "PbCO3 + 2 HNO3 → Pb(NO3)2 + CO2 + H2O"
  },
  {
    "id": "hydro-pb-carbonate-hcl-leach",
    "name": "Hydrochloric acid leaching of cerussite ore",
    "reactants": [
      "pbco3",
      "hcl"
    ],
    "products": [
      "pbcl2",
      "co2",
      "water"
    ],
    "enthalpy": -60,
    "desc": "Chloride dissolution of lead carbonate.",
    "type": "redox_other",
    "effects": [],
    "net": "PbCO3 + 2 HCl → PbCl2 + CO2 + H2O"
  },
  {
    "id": "hydro-sn-oxide-hcl-leach",
    "name": "Hydrochloric acid leaching of tin(II) oxide",
    "reactants": [
      "sno",
      "hcl"
    ],
    "products": [
      "sncl2",
      "water"
    ],
    "enthalpy": -105,
    "desc": "Acid dissolution of stannous oxide calcines.",
    "type": "redox_other",
    "effects": [],
    "net": "SnO + 2 HCl → SnCl2 + H2O"
  },
  {
    "id": "hydro-sn-oxide-h2so4-leach",
    "name": "Sulfuric acid leaching of tin(II) oxide",
    "reactants": [
      "sno",
      "h2so4"
    ],
    "products": [
      "snso4",
      "water"
    ],
    "enthalpy": -100,
    "desc": "Sulfuric acid leaching generating stannous sulfate.",
    "type": "redox_other",
    "effects": [],
    "net": "SnO + H2SO4 → SnSO4 + H2O"
  },
  {
    "id": "hydro-sn-cassiterite-hcl-leach",
    "name": "Hydrochloric acid leaching of cassiterite (tin(IV) oxide)",
    "reactants": [
      "sno2",
      "hcl"
    ],
    "products": [
      "sncl4",
      "water"
    ],
    "enthalpy": -85,
    "desc": "Concentrated hydrochloric acid digestion of tin dioxide.",
    "type": "redox_other",
    "effects": [],
    "net": "SnO2 + 4 HCl → SnCl4 + 2 H2O"
  },
  {
    "id": "hydro-sn-sulfide-ferric-leach",
    "name": "Ferric chloride leaching of herzenbergite (tin(II) sulfide) ore",
    "reactants": [
      "sns",
      "fecl3"
    ],
    "products": [
      "sncl2",
      "fecl2",
      "s"
    ],
    "enthalpy": -65,
    "desc": "Ferric chloride dissolution of tin sulfide.",
    "type": "redox_other",
    "effects": [],
    "net": "SnS + 2 FeCl3 → SnCl2 + 2 FeCl2 + S"
  },
  {
    "id": "hydro-sn-sulfide-o2-leach",
    "name": "Oxidative acid leaching of tin sulfide",
    "reactants": [
      "sns",
      "o2",
      "hcl"
    ],
    "products": [
      "sncl2",
      "so2",
      "water"
    ],
    "enthalpy": -420,
    "desc": "Pressure oxidative dissolution of sulfide concentrates.",
    "type": "redox_other",
    "effects": [],
    "net": "2 SnS + 3 O2 + 4 HCl → 2 SnCl2 + 2 SO2 + 2 H2O"
  },
  {
    "id": "hydro-ag-purif-zn-so4",
    "name": "Zinc dust cementation of silver from silver sulfate solution",
    "reactants": [
      "ag2so4",
      "zn"
    ],
    "products": [
      "ag",
      "znso4"
    ],
    "enthalpy": -305,
    "desc": "Fast electrochemical displacement recovering high-purity silver sponge.",
    "type": "redox_other",
    "effects": [],
    "net": "Ag2SO4 + Zn → 2 Ag + ZnSO4"
  },
  {
    "id": "hydro-ag2o-hno3-leach",
    "name": "Nitric acid dissolution of silver oxide residues",
    "reactants": [
      "ag2o",
      "hno3"
    ],
    "products": [
      "agno3",
      "water"
    ],
    "enthalpy": -120,
    "desc": "Recovery of silver from oxidized refining residues.",
    "type": "redox_other",
    "effects": [],
    "net": "Ag2O + 2 HNO3 → 2 AgNO3 + H2O"
  },
  {
    "id": "hydro-ag2o-h2so4-leach",
    "name": "Sulfuric acid dissolution of silver oxide",
    "reactants": [
      "ag2o",
      "h2so4"
    ],
    "products": [
      "ag2so4",
      "water"
    ],
    "enthalpy": -115,
    "desc": "Formation of silver sulfate in hydrometallurgical partition.",
    "type": "redox_other",
    "effects": [],
    "net": "Ag2O + H2SO4 → Ag2SO4 + H2O"
  },
  {
    "id": "hydro-ag2s-ferric-leach",
    "name": "Ferric chloride leaching of silver sulfide ore",
    "reactants": [
      "ag2s",
      "fecl3"
    ],
    "products": [
      "agcl",
      "fecl2",
      "s"
    ],
    "enthalpy": -72,
    "desc": "Chloride hydrometallurgy leaching of argentite.",
    "type": "redox_other",
    "effects": [],
    "net": "Ag2S + 2 FeCl3 → 2 AgCl + 2 FeCl2 + S"
  },
  {
    "id": "hydro-u-sulfuric-acid-leach",
    "name": "Sulfuric acid dissolution of triuranium octoxide (yellowcake)",
    "reactants": [
      "u3o8",
      "h2so4",
      "h2o2"
    ],
    "products": [
      "uo2-so4",
      "water"
    ],
    "enthalpy": -320,
    "desc": "Peroxide-assisted acid leaching of uranium ore concentrates yielding soluble uranyl sulfate.",
    "type": "redox_other",
    "effects": [],
    "net": "U3O8 + 3 H2SO4 + H2O2 → 3 UO2SO4 + 4 H2O"
  },
  {
    "id": "hydro-u-ferric-oxidative-leach",
    "name": "Ferric iron oxidative sulfuric acid leaching of yellowcake",
    "reactants": [
      "u3o8",
      "h2so4",
      "fe2-so4-3"
    ],
    "products": [
      "uo2-so4",
      "feso4",
      "water"
    ],
    "enthalpy": -280,
    "desc": "Ferric ion oxidation of uranium(IV) to uranyl(VI) in heap and in-situ recovery (ISR).",
    "type": "redox_other",
    "effects": [],
    "net": "U3O8 + 2 H2SO4 + Fe2(SO4)3 → 3 UO2SO4 + 2 FeSO4 + 2 H2O"
  },
  {
    "id": "hydro-u-carbonate-in-situ-leach",
    "name": "In-situ recovery (ISR): alkaline sodium carbonate leaching of uranium ore",
    "reactants": [
      "u3o8",
      "na2co3",
      "nahco3",
      "o2"
    ],
    "products": [
      "na4-uo2-co3-3",
      "water"
    ],
    "enthalpy": -540,
    "desc": "Environmentally benign ISR leaching converting uranium into soluble sodium uranyl tricarbonate.",
    "type": "redox_other",
    "effects": [],
    "net": "2 U3O8 + 6 Na2CO3 + 12 NaHCO3 + O2 → 6 Na4UC3O11 + 6 H2O"
  },
  {
    "id": "hydro-u-leach-mno2-oxidant",
    "name": "Pyrolusite (MnO2) assisted sulfuric acid leaching of uranium yellowcake",
    "reactants": [
      "u3o8",
      "h2so4",
      "mno2"
    ],
    "products": [
      "uo2-so4",
      "mnso4",
      "water"
    ],
    "enthalpy": -350,
    "desc": "Classic atmospheric uranium leaching: manganese dioxide oxidizes tetravalent uranium to hexavalent uranyl.",
    "type": "redox_other",
    "effects": [],
    "net": "U3O8 + 4 H2SO4 + MnO2 → 3 UO2SO4 + MnSO4 + 4 H2O"
  },
  {
    "id": "hydro-u-leach-hno3-oxidant",
    "name": "Nitric acid assisted sulfuric acid leaching of uranium ore",
    "reactants": [
      "u3o8",
      "h2so4",
      "hno3"
    ],
    "products": [
      "uo2-so4",
      "no2",
      "water"
    ],
    "enthalpy": -380,
    "desc": "Nitric acid catalytic oxidation of uraninite in sulfuric acid leach slurry.",
    "type": "redox_other",
    "effects": [],
    "net": "U3O8 + 3 H2SO4 + 2 HNO3 → 3 UO2SO4 + 2 NO2 + 4 H2O"
  },
  {
    "id": "hydro-u-carbonate-acid-split",
    "name": "Sulfuric acid strip of sodium uranyl tricarbonate to uranyl sulfate",
    "reactants": [
      "na4-uo2-co3-3",
      "h2so4"
    ],
    "products": [
      "uo2-so4",
      "na2so4",
      "co2",
      "water"
    ],
    "enthalpy": -310,
    "desc": "Acid acidification decomposing tricarbonate complex to produce concentrated uranyl sulfate feed.",
    "type": "redox_other",
    "effects": [],
    "net": "Na4UC3O11 + 3 H2SO4 → UO2SO4 + 2 Na2SO4 + 3 CO2 + 3 H2O"
  },
  {
    "id": "hydro-refract-feass-bioleach-1",
    "name": "Bio-oxidation of arsenopyrite: bacterial oxidation generating ferric and arsenic acids",
    "reactants": [
      "fe-as-s",
      "o2",
      "water",
      "h2so4"
    ],
    "products": [
      "fe2-so4-3",
      "h3aso4"
    ],
    "enthalpy": -1350,
    "desc": "Bio-oxidation of refractory gold arsenopyrite matrix exposing encapsulated submicroscopic gold grains.",
    "type": "redox_other",
    "effects": [],
    "net": "2 FeAsS + 7 O2 + 2 H2O + H2SO4 → Fe2(SO4)3 + 2 H3AsO4"
  },
  {
    "id": "hydro-refract-pyrite-ferric-leach",
    "name": "Indirect chemical leaching of auriferous pyrite by ferric sulfate",
    "reactants": [
      "fes2",
      "fe2-so4-3",
      "water"
    ],
    "products": [
      "feso4",
      "h2so4"
    ],
    "enthalpy": -420,
    "desc": "Indirect bioleaching mechanism: ferric sulfate attacks pyrite matrix generating ferrous sulfate and sulfuric acid.",
    "type": "redox_other",
    "effects": [],
    "net": "FeS2 + 7 Fe2(SO4)3 + 8 H2O → 15 FeSO4 + 8 H2SO4"
  },
  {
    "id": "hydro-refract-feass-ferric-leach",
    "name": "Ferric sulfate oxidation of arsenopyrite ore",
    "reactants": [
      "fe-as-s",
      "fe2-so4-3",
      "water"
    ],
    "products": [
      "feso4",
      "h3aso4",
      "h2so4"
    ],
    "enthalpy": -680,
    "desc": "Ferric ion chemical oxidation of arsenopyrite mineral in heap bioreactor.",
    "type": "redox_other",
    "effects": [],
    "net": "2 FeAsS + 13 Fe2(SO4)3 + 16 H2O → 28 FeSO4 + 2 H3AsO4 + 13 H2SO4"
  },
  {
    "id": "hydro-refract-feass-hno3-leach",
    "name": "Nitric acid oxidation leaching of arsenopyrite concentrate",
    "reactants": [
      "fe-as-s",
      "hno3"
    ],
    "products": [
      "fe-no3-3",
      "h3aso4",
      "no2",
      "water",
      "h2so4"
    ],
    "enthalpy": -1520,
    "desc": "Intensive nitric acid oxidation destroying refractory arsenopyrite crystal lattice.",
    "type": "redox_other",
    "effects": [],
    "net": "FeAsS + 17 HNO3 → Fe(NO3)3 + H3AsO4 + 14 NO2 + 6 H2O + H2SO4"
  },
  {
    "id": "hydro-refract-pyrite-hno3-leach",
    "name": "Nitric acid pressure oxidation of auriferous pyrite",
    "reactants": [
      "fes2",
      "hno3"
    ],
    "products": [
      "fe-no3-3",
      "no2",
      "water",
      "h2so4"
    ],
    "enthalpy": -1650,
    "desc": "Complete chemical breakdown of refractory pyrite hosting invisible solid solution gold.",
    "type": "redox_other",
    "effects": [],
    "net": "FeS2 + 18 HNO3 → Fe(NO3)3 + 15 NO2 + 7 H2O + 2 H2SO4"
  },
  {
    "id": "hydro-refract-pyrite-chlorine-leach",
    "name": "Chlorine lixiviant oxidation of pyrite matrix",
    "reactants": [
      "fes2",
      "cl2",
      "water"
    ],
    "products": [
      "fecl3",
      "h2so4",
      "hcl"
    ],
    "enthalpy": -1480,
    "desc": "High-rate aqueous chlorination decomposing sulfide gold ores.",
    "type": "redox_other",
    "effects": [],
    "net": "2 FeS2 + 15 Cl2 + 16 H2O → 2 FeCl3 + 4 H2SO4 + 24 HCl"
  },
  {
    "id": "hydro-refract-feass-chlorine-leach",
    "name": "Chlorination destruction of refractory arsenopyrite ore",
    "reactants": [
      "fe-as-s",
      "cl2",
      "water"
    ],
    "products": [
      "fecl3",
      "h3aso4",
      "h2so4",
      "hcl"
    ],
    "enthalpy": -1550,
    "desc": "Direct hydrometallurgical chlorination liberating refractory gold.",
    "type": "redox_other",
    "effects": [],
    "net": "FeAsS + 7 Cl2 + 8 H2O → FeCl3 + H3AsO4 + H2SO4 + 11 HCl"
  },
  {
    "id": "hydro-refract-pyrite-bioleach-hcl",
    "name": "Hydrochloric acid ferric leaching of pyrite",
    "reactants": [
      "fes2",
      "fecl3",
      "water"
    ],
    "products": [
      "fecl2",
      "h2so4",
      "hcl"
    ],
    "enthalpy": -430,
    "desc": "Chloride bioleaching matrix decomposition of pyrite.",
    "type": "redox_other",
    "effects": [],
    "net": "FeS2 + 14 FeCl3 + 8 H2O → 15 FeCl2 + 2 H2SO4 + 12 HCl"
  }
];

  for (const r of reactions) {
    addReaction({
      id: r.id,
      name: r.name,
      reactionType: (r.type || "redox_other") as any,
      reactants: r.reactants,
      products: r.products,
      netIonicEquation: r.net,
      enthalpyKjPerMol: r.enthalpy,
      observableEffects: r.effects || [],
      safetyNotes: r.desc,
    });
  }
}
