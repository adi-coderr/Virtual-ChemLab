// Domain 28: Nuclear Chemistry, Actinide & Radiochemical Processing (100 reactions)
import { addReaction } from "./generateBatch7.js";

export function buildDomain28NuclearActinides(): void {
  const reactions = [
  {
    "id": "nuc-u3o8-nitric-leach",
    "name": "Pitchblende dissolution: nitric acid leaching of triuranium octoxide into uranyl nitrate",
    "reactants": [
      "u3o8",
      "hno3"
    ],
    "products": [
      "uo2-no3-2",
      "no2",
      "water"
    ],
    "enthalpy": -320,
    "desc": "Oxidative acid digestion of milled uranium ore concentrate in PUREX feed preparation.",
    "type": "redox_other",
    "effects": [],
    "net": "U3O8 + 8 HNO3 → 3 UO2(NO3)2 + 2 NO2 + 4 H2O"
  },
  {
    "id": "nuc-uo3-sulfuric-dissolution",
    "name": "Sulfuric acid dissolution of uranium trioxide into uranyl sulfate",
    "reactants": [
      "uo3",
      "h2so4"
    ],
    "products": [
      "uo2so4",
      "water"
    ],
    "enthalpy": -125,
    "desc": "Acid leaching forming uranyl sulfate solution for ion-exchange recovery.",
    "type": "acid_base_neutralization",
    "effects": [],
    "net": "UO3 + H2SO4 → UO2SO4 + H2O"
  },
  {
    "id": "nuc-uo3-hcl-dissolution",
    "name": "Hydrochloric acid dissolution of uranium trioxide",
    "reactants": [
      "uo3",
      "hcl"
    ],
    "products": [
      "uo2cl2",
      "water"
    ],
    "enthalpy": -110,
    "desc": "Synthesis of aqueous uranyl chloride solution.",
    "type": "acid_base_neutralization",
    "effects": [],
    "net": "UO3 + 2 HCl → UO2Cl2 + H2O"
  },
  {
    "id": "nuc-uo2-nitric-leach",
    "name": "Oxidative dissolution of uranium dioxide fuel pellets by nitric acid",
    "reactants": [
      "uo2",
      "hno3"
    ],
    "products": [
      "uo2-no3-2",
      "no2",
      "water"
    ],
    "enthalpy": -210,
    "desc": "Spent fuel head-end shear-leach dissolution releasing nitrogen dioxide fumes.",
    "type": "redox_other",
    "effects": [],
    "net": "UO2 + 4 HNO3 → UO2(NO3)2 + 2 NO2 + 2 H2O"
  },
  {
    "id": "nuc-uo2-sulfuric-leach-o2",
    "name": "In-situ recovery: pressurized oxygen and sulfuric acid leaching of uranium dioxide",
    "reactants": [
      "uo2",
      "h2so4",
      "o2"
    ],
    "products": [
      "uo2so4",
      "water"
    ],
    "enthalpy": -420,
    "desc": "Aerated sulfuric acid leaching of subsurface uranium sandstone deposits.",
    "type": "redox_other",
    "effects": [],
    "net": "2 UO2 + 2 H2SO4 + O2 → 2 UO2SO4 + 2 H2O"
  },
  {
    "id": "nuc-uo2-sulfuric-mno2-leach",
    "name": "Pyrolusite-assisted sulfuric acid leaching of uranium dioxide",
    "reactants": [
      "uo2",
      "mno2",
      "h2so4"
    ],
    "products": [
      "uo2so4",
      "mnso4",
      "water"
    ],
    "enthalpy": -340,
    "desc": "Manganese dioxide oxidant driving oxidation of insoluble U(IV) to soluble uranyl U(VI).",
    "type": "redox_other",
    "effects": [],
    "net": "UO2 + MnO2 + 2 H2SO4 → UO2SO4 + MnSO4 + 2 H2O"
  },
  {
    "id": "nuc-uo2co3-nitric-leach",
    "name": "Nitric acid dissolution of rutherfordine uranyl carbonate",
    "reactants": [
      "uo2co3",
      "hno3"
    ],
    "products": [
      "uo2-no3-2",
      "co2",
      "water"
    ],
    "enthalpy": -85,
    "desc": "Acid digestion liberating carbon dioxide gas.",
    "type": "gas_evolution",
    "effects": [],
    "net": "UO2CO3 + 2 HNO3 → UO2(NO3)2 + CO2 + H2O"
  },
  {
    "id": "nuc-uo2co3-sulfuric-leach",
    "name": "Sulfuric acid dissolution of uranyl carbonate",
    "reactants": [
      "uo2co3",
      "h2so4"
    ],
    "products": [
      "uo2so4",
      "co2",
      "water"
    ],
    "enthalpy": -90,
    "desc": "Acid metathesis generating soluble uranyl sulfate.",
    "type": "gas_evolution",
    "effects": [],
    "net": "UO2CO3 + H2SO4 → UO2SO4 + CO2 + H2O"
  },
  {
    "id": "nuc-uo2co3-hcl-leach",
    "name": "Hydrochloric acid dissolution of uranyl carbonate mineral",
    "reactants": [
      "uo2co3",
      "hcl"
    ],
    "products": [
      "uo2cl2",
      "co2",
      "water"
    ],
    "enthalpy": -82,
    "desc": "Conversion of carbonate mineral to uranyl chloride.",
    "type": "gas_evolution",
    "effects": [],
    "net": "UO2CO3 + 2 HCl → UO2Cl2 + CO2 + H2O"
  },
  {
    "id": "nuc-uo2-co2-supercritical-leach",
    "name": "Supercritical fluid model: oxidation of UO2 by oxygen in nitric acid",
    "reactants": [
      "uo2",
      "hno3",
      "o2"
    ],
    "products": [
      "uo2-no3-2",
      "water"
    ],
    "enthalpy": -395,
    "desc": "Catalytic oxygen-assisted dissolution reducing NOx emission volumes.",
    "type": "redox_other",
    "effects": [],
    "net": "2 UO2 + 4 HNO3 + O2 → 2 UO2(NO3)2 + 2 H2O"
  },
  {
    "id": "nuc-uo2-h2o2-sulfuric-leach",
    "name": "Hydrogen peroxide promoted sulfuric acid leaching of uranium dioxide",
    "reactants": [
      "uo2",
      "h2so4",
      "h2o2"
    ],
    "products": [
      "uo2so4",
      "water"
    ],
    "enthalpy": -385,
    "desc": "Green leaching process replacing chlorate or pyrolusite oxidants.",
    "type": "redox_other",
    "effects": [],
    "net": "UO2 + H2SO4 + H2O2 → UO2SO4 + 2 H2O"
  },
  {
    "id": "nuc-uo2-h2o2-hcl-leach",
    "name": "Peroxide-assisted hydrochloric acid leaching of UO2",
    "reactants": [
      "uo2",
      "hcl",
      "h2o2"
    ],
    "products": [
      "uo2cl2",
      "water"
    ],
    "enthalpy": -365,
    "desc": "Hydrochloric oxidative leaching producing pure uranyl chloride.",
    "type": "redox_other",
    "effects": [],
    "net": "UO2 + 2 HCl + H2O2 → UO2Cl2 + 2 H2O"
  },
  {
    "id": "nuc-u3o8-hcl-o2-leach",
    "name": "Hydrochloric acid leaching of triuranium octoxide with oxygen sparging",
    "reactants": [
      "u3o8",
      "hcl",
      "o2"
    ],
    "products": [
      "uo2cl2",
      "water"
    ],
    "enthalpy": -490,
    "desc": "Oxidative hydrochloric leaching generating concentrated uranyl chloride feed.",
    "type": "redox_other",
    "effects": [],
    "net": "2 U3O8 + 12 HCl + O2 → 6 UO2Cl2 + 6 H2O"
  },
  {
    "id": "nuc-u-nitric-dissolution",
    "name": "Direct nitric acid dissolution of metallic uranium",
    "reactants": [
      "u",
      "hno3"
    ],
    "products": [
      "uo2-no3-2",
      "no2",
      "water"
    ],
    "enthalpy": -1020,
    "desc": "Reprocessing dissolution of metallic uranium reactor fuel elements.",
    "type": "redox_other",
    "effects": [],
    "net": "U + 8 HNO3 → UO2(NO3)2 + 6 NO2 + 4 H2O"
  },
  {
    "id": "nuc-u-sulfuric-dissolution",
    "name": "Oxidative dissolution of uranium metal in hot concentrated sulfuric acid",
    "reactants": [
      "u",
      "h2so4"
    ],
    "products": [
      "uo2so4",
      "so2",
      "water"
    ],
    "enthalpy": -890,
    "desc": "Hot sulfuric acid dissolution releasing sulfur dioxide fumes.",
    "type": "redox_other",
    "effects": [],
    "net": "U + 4 H2SO4 → UO2SO4 + 3 SO2 + 4 H2O"
  },
  {
    "id": "nuc-yellowcake-naoh-precipitation",
    "name": "Caustic soda precipitation of sodium diuranate yellowcake",
    "reactants": [
      "uo2-no3-2",
      "naoh"
    ],
    "products": [
      "na2u2o7",
      "nano3",
      "water"
    ],
    "enthalpy": -165,
    "desc": "Alkaline precipitation isolating yellowcake from PUREX strip aqueous solutions.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#E59866",
        "description": "Orange-yellow sodium diuranate precipitates"
      }
    ],
    "net": "2 UO2(NO3)2 + 6 NaOH → Na2U2O7 + 4 NaNO3 + 3 H2O"
  },
  {
    "id": "nuc-yellowcake-koh-precipitation",
    "name": "Potassium hydroxide precipitation of potassium diuranate",
    "reactants": [
      "uo2-no3-2",
      "koh"
    ],
    "products": [
      "k2u2o7",
      "kno3",
      "water"
    ],
    "enthalpy": -170,
    "desc": "Alkaline precipitation producing potassium diuranate.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#EB984E",
        "description": "Bright orange potassium diuranate precipitates"
      }
    ],
    "net": "2 UO2(NO3)2 + 6 KOH → K2U2O7 + 4 KNO3 + 3 H2O"
  },
  {
    "id": "nuc-yellowcake-ammonia-precipitation",
    "name": "Ammonium diuranate precipitation: industrial ADU yellowcake synthesis",
    "reactants": [
      "uo2-no3-2",
      "ammonia",
      "water"
    ],
    "products": [
      "nh4-2-u2o7",
      "nh4no3"
    ],
    "enthalpy": -185,
    "desc": "Gaseous ammonia neutralizes uranyl nitrate forming yellow ammonium diuranate cake.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#F5B041",
        "description": "Vibrant yellow ammonium diuranate precipitates"
      }
    ],
    "net": "2 UO2(NO3)2 + 6 NH3 + 3 H2O → (NH4)2U2O7 + 4 NH4NO3"
  },
  {
    "id": "nuc-yellowcake-sulfate-ammonia-precip",
    "name": "Ammonia precipitation of ADU from uranyl sulfate leach liquor",
    "reactants": [
      "uo2so4",
      "ammonia",
      "water"
    ],
    "products": [
      "nh4-2-u2o7",
      "nh4-2-so4"
    ],
    "enthalpy": -195,
    "desc": "Direct yellowcake precipitation from sulfuric acid heap leach eluate.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#F5B041",
        "description": "Yellow ADU precipitates"
      }
    ],
    "net": "2 UO2SO4 + 6 NH3 + 3 H2O → (NH4)2U2O7 + 2 (NH4)2SO4"
  },
  {
    "id": "nuc-yellowcake-sulfate-naoh-precip",
    "name": "Caustic soda precipitation of sodium diuranate from uranyl sulfate",
    "reactants": [
      "uo2so4",
      "naoh"
    ],
    "products": [
      "na2u2o7",
      "na2so4",
      "water"
    ],
    "enthalpy": -175,
    "desc": "Neutralization of acid sulfate solution recovering sodium diuranate.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#E59866",
        "description": "Yellow-orange diuranate precipitates"
      }
    ],
    "net": "2 UO2SO4 + 6 NaOH → Na2U2O7 + 2 Na2SO4 + 3 H2O"
  },
  {
    "id": "nuc-yellowcake-sulfate-koh-precip",
    "name": "Potassium hydroxide precipitation of diuranate from uranyl sulfate",
    "reactants": [
      "uo2so4",
      "koh"
    ],
    "products": [
      "k2u2o7",
      "k2so4",
      "water"
    ],
    "enthalpy": -178,
    "desc": "Caustic potash precipitation of potassium diuranate yellowcake.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#EB984E",
        "description": "Potassium diuranate precipitates"
      }
    ],
    "net": "2 UO2SO4 + 6 KOH → K2U2O7 + 2 K2SO4 + 3 H2O"
  },
  {
    "id": "nuc-yellowcake-chloride-naoh-precip",
    "name": "Precipitation of sodium diuranate from uranyl chloride",
    "reactants": [
      "uo2cl2",
      "naoh"
    ],
    "products": [
      "na2u2o7",
      "nacl",
      "water"
    ],
    "enthalpy": -168,
    "desc": "Caustic precipitation isolating uranium from chloride solution.",
    "type": "precipitation",
    "effects": [],
    "net": "2 UO2Cl2 + 6 NaOH → Na2U2O7 + 4 NaCl + 3 H2O"
  },
  {
    "id": "nuc-yellowcake-chloride-koh-precip",
    "name": "Precipitation of potassium diuranate from uranyl chloride",
    "reactants": [
      "uo2cl2",
      "koh"
    ],
    "products": [
      "k2u2o7",
      "kcl",
      "water"
    ],
    "enthalpy": -172,
    "desc": "Potash precipitation recovering uranium from chloride refining streams.",
    "type": "precipitation",
    "effects": [],
    "net": "2 UO2Cl2 + 6 KOH → K2U2O7 + 4 KCl + 3 H2O"
  },
  {
    "id": "nuc-yellowcake-chloride-ammonia-precip",
    "name": "Ammonia precipitation of ADU from uranyl chloride",
    "reactants": [
      "uo2cl2",
      "ammonia",
      "water"
    ],
    "products": [
      "nh4-2-u2o7",
      "ammonium-chloride"
    ],
    "enthalpy": -182,
    "desc": "Ammoniacal precipitation of yellowcake.",
    "type": "precipitation",
    "effects": [],
    "net": "2 UO2Cl2 + 6 NH3 + 3 H2O → (NH4)2U2O7 + 4 NH4Cl"
  },
  {
    "id": "nuc-uranyl-peroxide-nitrate-precip",
    "name": "Uranyl peroxide precipitation from uranyl nitrate (studtite process)",
    "reactants": [
      "uo2-no3-2",
      "h2o2"
    ],
    "products": [
      "uo4",
      "hno3"
    ],
    "enthalpy": -85,
    "desc": "Selective precipitation of pale yellow uranyl peroxide yielding nuclear-purity product.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFF9C4",
        "description": "Pale yellow uranyl peroxide precipitates"
      }
    ],
    "net": "UO2(NO3)2 + H2O2 → UO4 + 2 HNO3"
  },
  {
    "id": "nuc-uranyl-peroxide-sulfate-precip",
    "name": "Hydrogen peroxide precipitation of uranyl peroxide from uranyl sulfate",
    "reactants": [
      "uo2so4",
      "h2o2"
    ],
    "products": [
      "uo4",
      "h2so4"
    ],
    "enthalpy": -88,
    "desc": "Selective recovery of uranium from acid leach liquors free of sulfate impurities.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFF9C4",
        "description": "Fine yellow UO4 crystals precipitate"
      }
    ],
    "net": "UO2SO4 + H2O2 → UO4 + H2SO4"
  },
  {
    "id": "nuc-uranyl-peroxide-chloride-precip",
    "name": "Precipitation of uranyl peroxide from uranyl chloride by H2O2",
    "reactants": [
      "uo2cl2",
      "h2o2"
    ],
    "products": [
      "uo4",
      "hcl"
    ],
    "enthalpy": -82,
    "desc": "Selective peroxide precipitation separating uranium from chloride matrix.",
    "type": "precipitation",
    "effects": [],
    "net": "UO2Cl2 + H2O2 → UO4 + 2 HCl"
  },
  {
    "id": "nuc-uranyl-carbonate-na2co3-precip",
    "name": "Precipitation of uranyl carbonate by sodium carbonate",
    "reactants": [
      "uo2-no3-2",
      "na2co3"
    ],
    "products": [
      "uo2co3",
      "nano3"
    ],
    "enthalpy": -52,
    "desc": "Controlled precipitation of basic uranyl carbonate.",
    "type": "precipitation",
    "effects": [],
    "net": "UO2(NO3)2 + Na2CO3 → UO2CO3 + 2 NaNO3"
  },
  {
    "id": "nuc-uranyl-carbonate-k2co3-precip",
    "name": "Potassium carbonate precipitation of uranyl carbonate",
    "reactants": [
      "uo2-no3-2",
      "k2co3"
    ],
    "products": [
      "uo2co3",
      "kno3"
    ],
    "enthalpy": -54,
    "desc": "Stoichiometric carbonate precipitation.",
    "type": "precipitation",
    "effects": [],
    "net": "UO2(NO3)2 + K2CO3 → UO2CO3 + 2 KNO3"
  },
  {
    "id": "nuc-uranyl-sulfate-barium-nitrate-metathesis",
    "name": "Precipitation separation: barium nitrate removal of sulfate from uranyl sulfate",
    "reactants": [
      "uo2so4",
      "ba-no3-2"
    ],
    "products": [
      "baso4",
      "uo2-no3-2"
    ],
    "enthalpy": -42,
    "desc": "Quantitative sulfate removal precipitating insoluble BaSO4.",
    "type": "precipitation",
    "effects": [],
    "net": "UO2SO4 + BaN2O6 → BaSO4 + UO2(NO3)2"
  },
  {
    "id": "nuc-adu-calcination-uo3",
    "name": "ADU thermal calcination: decomposition of ammonium diuranate to uranium trioxide",
    "reactants": [
      "nh4-2-u2o7"
    ],
    "products": [
      "uo3",
      "ammonia",
      "water"
    ],
    "enthalpy": 145,
    "desc": "Rotary kiln thermal decomposition of yellowcake at 400°C generating reactive UO3.",
    "type": "decomposition",
    "effects": [],
    "net": "(NH4)2U2O7 → 2 UO3 + 2 NH3 + H2O"
  },
  {
    "id": "nuc-adu-calcination-u3o8",
    "name": "High-temperature air calcination of ammonium diuranate to U3O8",
    "reactants": [
      "nh4-2-u2o7",
      "o2"
    ],
    "products": [
      "u3o8",
      "n2",
      "water"
    ],
    "enthalpy": -850,
    "desc": "Industrial calcination at 750°C converting yellowcake to stable triuranium octoxide.",
    "type": "redox_other",
    "effects": [],
    "net": "6 (NH4)2U2O7 + 7 O2 → 4 U3O8 + 6 N2 + 24 H2O"
  },
  {
    "id": "nuc-adu-reduction-uo2-h2",
    "name": "Direct hydrogen reduction of ammonium diuranate into ceramic UO2",
    "reactants": [
      "nh4-2-u2o7",
      "h2"
    ],
    "products": [
      "uo2",
      "ammonia",
      "water"
    ],
    "enthalpy": -95,
    "desc": "Fluidized-bed reductive calcination directly yielding reactor-grade uranium dioxide.",
    "type": "redox_other",
    "effects": [],
    "net": "(NH4)2U2O7 + 2 H2 → 2 UO2 + 2 NH3 + 3 H2O"
  },
  {
    "id": "nuc-uranyl-peroxide-calcination",
    "name": "Thermal decomposition of uranyl peroxide to uranium trioxide",
    "reactants": [
      "uo4"
    ],
    "products": [
      "uo3",
      "o2"
    ],
    "enthalpy": 68,
    "desc": "Gentle heating at 350°C converting UO4 to microcrystalline orange UO3.",
    "type": "decomposition",
    "effects": [],
    "net": "2 UO4 → 2 UO3 + O2"
  },
  {
    "id": "nuc-uo4-reduction-h2",
    "name": "Direct hydrogen reduction of uranyl peroxide to uranium dioxide",
    "reactants": [
      "uo4",
      "h2"
    ],
    "products": [
      "uo2",
      "water"
    ],
    "enthalpy": -320,
    "desc": "One-step reductive calcination of studtite to ceramic nuclear fuel.",
    "type": "redox_other",
    "effects": [],
    "net": "UO4 + 2 H2 → UO2 + 2 H2O"
  },
  {
    "id": "nuc-uo4-reduction-co",
    "name": "Carbon monoxide reduction of uranyl peroxide",
    "reactants": [
      "uo4",
      "co"
    ],
    "products": [
      "uo2",
      "co2"
    ],
    "enthalpy": -450,
    "desc": "Reductive gas treatment of uranyl peroxide.",
    "type": "redox_other",
    "effects": [],
    "net": "UO4 + 2 CO → UO2 + 2 CO2"
  },
  {
    "id": "nuc-uranyl-carbonate-calcination-uo3",
    "name": "Thermal decomposition of uranyl carbonate to UO3",
    "reactants": [
      "uo2co3"
    ],
    "products": [
      "uo3",
      "co2"
    ],
    "enthalpy": 92,
    "desc": "Decarboxylation at 400°C yielding uranium trioxide powder.",
    "type": "decomposition",
    "effects": [],
    "net": "UO2CO3 → UO3 + CO2"
  },
  {
    "id": "nuc-uranyl-carbonate-hydrogen-reduction",
    "name": "Reductive calcination of uranyl carbonate to UO2 under hydrogen",
    "reactants": [
      "uo2co3",
      "h2"
    ],
    "products": [
      "uo2",
      "co2",
      "water"
    ],
    "enthalpy": -42,
    "desc": "Single-step reduction of uranyl carbonate to uranium dioxide.",
    "type": "redox_other",
    "effects": [],
    "net": "UO2CO3 + H2 → UO2 + CO2 + H2O"
  },
  {
    "id": "nuc-uo3-co-reduction",
    "name": "Carbon monoxide reduction of uranium trioxide",
    "reactants": [
      "uo3",
      "co"
    ],
    "products": [
      "uo2",
      "co2"
    ],
    "enthalpy": -150,
    "desc": "Gas-phase reduction of UO3 to uranium dioxide.",
    "type": "redox_other",
    "effects": [],
    "net": "UO3 + CO → UO2 + CO2"
  },
  {
    "id": "nuc-uo3-methane-reduction",
    "name": "Methane reduction of uranium trioxide to uranium dioxide",
    "reactants": [
      "uo3",
      "ch4"
    ],
    "products": [
      "uo2",
      "co2",
      "water"
    ],
    "enthalpy": -130,
    "desc": "Natural gas reduction of UO3 in a fluidized calciner.",
    "type": "redox_other",
    "effects": [],
    "net": "4 UO3 + CH4 → 4 UO2 + CO2 + 2 H2O"
  },
  {
    "id": "nuc-u3o8-co-reduction",
    "name": "Carbon monoxide reduction of U3O8 to UO2",
    "reactants": [
      "u3o8",
      "co"
    ],
    "products": [
      "uo2",
      "co2"
    ],
    "enthalpy": -195,
    "desc": "Carbon monoxide reduction converting U3O8 to stoichiometric UO2.",
    "type": "redox_other",
    "effects": [],
    "net": "U3O8 + 2 CO → 3 UO2 + 2 CO2"
  },
  {
    "id": "nuc-u3o8-methane-reduction",
    "name": "Methane reduction of triuranium octoxide to uranium dioxide",
    "reactants": [
      "u3o8",
      "ch4"
    ],
    "products": [
      "uo2",
      "co2",
      "water"
    ],
    "enthalpy": -165,
    "desc": "Synthesis gas / hydrocarbon reduction of pitchblende calcine.",
    "type": "redox_other",
    "effects": [],
    "net": "2 U3O8 + CH4 → 6 UO2 + CO2 + 2 H2O"
  },
  {
    "id": "nuc-u-oxalate-calcination-uo2",
    "name": "Thermal decomposition of uranium(IV) oxalate into ceramic UO2",
    "reactants": [
      "u-c2o4-2"
    ],
    "products": [
      "uo2",
      "co",
      "co2"
    ],
    "enthalpy": 210,
    "desc": "Inert atmosphere calcination generating ultra-fine nuclear fuel ceramic powder.",
    "type": "decomposition",
    "effects": [],
    "net": "U(C2O4)2 → UO2 + 2 CO + 2 CO2"
  },
  {
    "id": "nuc-u-oxalate-air-calcination",
    "name": "Oxidative air calcination of uranium(IV) oxalate to U3O8",
    "reactants": [
      "u-c2o4-2",
      "o2"
    ],
    "products": [
      "u3o8",
      "co2"
    ],
    "enthalpy": -980,
    "desc": "Complete air combustion of uranium oxalate powder.",
    "type": "redox_other",
    "effects": [],
    "net": "3 U(C2O4)2 + 4 O2 → U3O8 + 12 CO2"
  },
  {
    "id": "nuc-u-steam-corrosion-uo2",
    "name": "Severe accident: high-temperature oxidation of uranium metal by steam",
    "reactants": [
      "u",
      "water"
    ],
    "products": [
      "uo2",
      "h2"
    ],
    "enthalpy": -460,
    "desc": "Loss-of-coolant reaction in metallic-fueled reactors generating hydrogen gas.",
    "type": "redox_other",
    "effects": [],
    "net": "U + 2 H2O → UO2 + 2 H2"
  },
  {
    "id": "nuc-hydrofluorination-uo3",
    "name": "Hydrofluorination of uranium trioxide by anhydrous hydrogen fluoride",
    "reactants": [
      "uo3",
      "hf"
    ],
    "products": [
      "uf4",
      "o2",
      "water"
    ],
    "enthalpy": -240,
    "desc": "High-temperature conversion of UO3 to green salt.",
    "type": "redox_other",
    "effects": [],
    "net": "2 UO3 + 8 HF → 2 UF4 + O2 + 4 H2O"
  },
  {
    "id": "nuc-direct-fluorination-u-metal",
    "name": "Direct fluorination of metallic uranium to uranium hexafluoride",
    "reactants": [
      "u",
      "f2"
    ],
    "products": [
      "uf6"
    ],
    "enthalpy": -2150,
    "desc": "Vigorous exothermic fluorination producing volatile UF6.",
    "type": "redox_other",
    "effects": [],
    "net": "U + 3 F2 → UF6"
  },
  {
    "id": "nuc-direct-fluorination-uo2-f2",
    "name": "Direct fluorine gas conversion of uranium dioxide to UF6",
    "reactants": [
      "uo2",
      "f2"
    ],
    "products": [
      "uf6",
      "o2"
    ],
    "enthalpy": -1050,
    "desc": "Fluoride volatility processing of spent oxide fuels without liquid aqueous solvents.",
    "type": "redox_other",
    "effects": [],
    "net": "UO2 + 3 F2 → UF6 + O2"
  },
  {
    "id": "nuc-direct-fluorination-u3o8-f2",
    "name": "Fluorination of triuranium octoxide by elemental fluorine",
    "reactants": [
      "u3o8",
      "f2"
    ],
    "products": [
      "uf6",
      "o2"
    ],
    "enthalpy": -3120,
    "desc": "Fluoride volatility extraction of uranium from bulk calcined ore.",
    "type": "redox_other",
    "effects": [],
    "net": "U3O8 + 9 F2 → 3 UF6 + 4 O2"
  },
  {
    "id": "nuc-uf6-hydrogen-reduction-uf4",
    "name": "Hydrogen reduction of depleted uranium hexafluoride to UF4",
    "reactants": [
      "uf6",
      "h2"
    ],
    "products": [
      "uf4",
      "hf"
    ],
    "enthalpy": -285,
    "desc": "Deconversion of depleted UF6 tails to stable green salt UF4 and anhydrous HF.",
    "type": "redox_other",
    "effects": [],
    "net": "UF6 + H2 → UF4 + 2 HF"
  },
  {
    "id": "nuc-uf4-sodium-reduction",
    "name": "Sodiothermic reduction of uranium tetrafluoride to uranium metal",
    "reactants": [
      "uf4",
      "na"
    ],
    "products": [
      "u",
      "naf"
    ],
    "enthalpy": -680,
    "desc": "Molten alkali metal reduction synthesizing metallic uranium.",
    "type": "redox_other",
    "effects": [],
    "net": "UF4 + 4 Na → U + 4 NaF"
  },
  {
    "id": "nuc-uf4-potassium-reduction",
    "name": "Potassiothermic reduction of uranium tetrafluoride",
    "reactants": [
      "uf4",
      "k"
    ],
    "products": [
      "u",
      "kf"
    ],
    "enthalpy": -710,
    "desc": "Alkali metal vapor reduction to uranium powder.",
    "type": "redox_other",
    "effects": [],
    "net": "UF4 + 4 K → U + 4 KF"
  },
  {
    "id": "nuc-uf4-aluminum-reduction",
    "name": "Aluminothermic reduction of uranium tetrafluoride",
    "reactants": [
      "uf4",
      "al"
    ],
    "products": [
      "u",
      "alf3"
    ],
    "enthalpy": -290,
    "desc": "Pyrometallurgical reduction forming metallic uranium and aluminum fluoride.",
    "type": "redox_other",
    "effects": [],
    "net": "3 UF4 + 4 Al → 3 U + 4 AlF3"
  },
  {
    "id": "nuc-uf4-steam-pyrohydrolysis",
    "name": "Pyrohydrolysis: high-temperature steam conversion of UF4 to U3O8",
    "reactants": [
      "uf4",
      "water",
      "o2"
    ],
    "products": [
      "u3o8",
      "hf"
    ],
    "enthalpy": 45,
    "desc": "Quantitative pyrohydrolysis for fluoride waste treatment and analysis.",
    "type": "redox_other",
    "effects": [],
    "net": "3 UF4 + 6 H2O + O2 → U3O8 + 12 HF"
  },
  {
    "id": "nuc-u-hf-gas-hydrofluorination",
    "name": "Hydrofluorination of metallic uranium by anhydrous HF",
    "reactants": [
      "u",
      "hf"
    ],
    "products": [
      "uf4",
      "h2"
    ],
    "enthalpy": -620,
    "desc": "Direct reaction producing green salt and hydrogen gas.",
    "type": "redox_other",
    "effects": [],
    "net": "U + 4 HF → UF4 + 2 H2"
  },
  {
    "id": "nuc-uo2co3-hf-hydrofluorination",
    "name": "Hydrofluorination of uranyl carbonate to UF4",
    "reactants": [
      "uo2co3",
      "hf"
    ],
    "products": [
      "uf4",
      "co2",
      "o2",
      "water"
    ],
    "enthalpy": -110,
    "desc": "Fluorination accompanied by carbon dioxide evolution.",
    "type": "redox_other",
    "effects": [],
    "net": "2 UO2CO3 + 8 HF → 2 UF4 + 2 CO2 + O2 + 4 H2O"
  },
  {
    "id": "nuc-uf6-peroxide-conversion",
    "name": "Uranyl peroxide synthesis from uranium hexafluoride and hydrogen peroxide",
    "reactants": [
      "uf6",
      "h2o2",
      "water"
    ],
    "products": [
      "uo4",
      "hf"
    ],
    "enthalpy": -260,
    "desc": "Direct conversion of gaseous UF6 to insoluble uranyl peroxide.",
    "type": "precipitation",
    "effects": [],
    "net": "UF6 + H2O2 + 2 H2O → UO4 + 6 HF"
  },
  {
    "id": "nuc-uo2f2-hydrogen-reduction-uo2",
    "name": "Hydrogen pyro-reduction of uranyl fluoride to ceramic UO2",
    "reactants": [
      "uo2f2",
      "h2"
    ],
    "products": [
      "uo2",
      "hf"
    ],
    "enthalpy": 15,
    "desc": "Thermal reduction converting enriched UO2F2 to reactor fuel.",
    "type": "redox_other",
    "effects": [],
    "net": "UO2F2 + H2 → UO2 + 2 HF"
  },
  {
    "id": "nuc-uo2f2-pyrohydrolysis-u3o8",
    "name": "Pyrohydrolysis of uranyl fluoride yielding triuranium octoxide",
    "reactants": [
      "uo2f2",
      "water"
    ],
    "products": [
      "u3o8",
      "hf",
      "o2"
    ],
    "enthalpy": 115,
    "desc": "High-temperature steam defluorination yielding stable oxide.",
    "type": "redox_other",
    "effects": [],
    "net": "6 UO2F2 + 6 H2O → 2 U3O8 + 12 HF + O2"
  },
  {
    "id": "nuc-uo2f2-ammonia-yellowcake",
    "name": "Ammoniacal precipitation of ADU from uranyl fluoride solution",
    "reactants": [
      "uo2f2",
      "ammonia",
      "water"
    ],
    "products": [
      "nh4-2-u2o7",
      "nh4f"
    ],
    "enthalpy": -170,
    "desc": "Precipitation of yellowcake from hydrolyzed enriched uranium fractions.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#F5B041",
        "description": "Yellow ADU precipitates"
      }
    ],
    "net": "2 UO2F2 + 6 NH3 + 3 H2O → (NH4)2U2O7 + 4 NH4F"
  },
  {
    "id": "nuc-tho2-nitric-leach-thorex",
    "name": "THOREX process: fluoride-catalyzed nitric acid dissolution of thoria",
    "reactants": [
      "tho2",
      "hno3"
    ],
    "products": [
      "th-no3-4",
      "water"
    ],
    "enthalpy": -150,
    "desc": "Dissolution of refractory thorium dioxide fuel pellets using nitric acid with trace fluoride catalyst.",
    "type": "redox_other",
    "effects": [],
    "net": "ThO2 + 4 HNO3 → Th(NO3)4 + 2 H2O"
  },
  {
    "id": "nuc-tho2-sulfuric-leach",
    "name": "Sulfuric acid digestion of monazite-derived thorium dioxide",
    "reactants": [
      "tho2",
      "h2so4"
    ],
    "products": [
      "th-so4-2",
      "water"
    ],
    "enthalpy": -185,
    "desc": "Digestion of thorium oxide forming soluble thorium sulfate.",
    "type": "redox_other",
    "effects": [],
    "net": "ThO2 + 2 H2SO4 → Th(SO4)2 + 2 H2O"
  },
  {
    "id": "nuc-tho2-hcl-dissolution",
    "name": "Hydrochloric acid dissolution of reactive thorium oxide",
    "reactants": [
      "tho2",
      "hcl"
    ],
    "products": [
      "thcl4",
      "water"
    ],
    "enthalpy": -135,
    "desc": "Synthesis of aqueous thorium(IV) chloride solution.",
    "type": "redox_other",
    "effects": [],
    "net": "ThO2 + 4 HCl → ThCl4 + 2 H2O"
  },
  {
    "id": "nuc-tho2-hf-conversion",
    "name": "Hydrofluorination of thoria into thorium tetrafluoride",
    "reactants": [
      "tho2",
      "hf"
    ],
    "products": [
      "thf4",
      "water"
    ],
    "enthalpy": -210,
    "desc": "High-temperature fluorination producing ThF4 for molten salt breeder reactors (LFTR).",
    "type": "redox_other",
    "effects": [],
    "net": "ThO2 + 4 HF → ThF4 + 2 H2O"
  },
  {
    "id": "nuc-th-nitric-dissolution",
    "name": "Nitric acid dissolution of metallic thorium",
    "reactants": [
      "th",
      "hno3"
    ],
    "products": [
      "th-no3-4",
      "no2",
      "water"
    ],
    "enthalpy": -1180,
    "desc": "Reprocessing dissolution of thorium metal blanket elements.",
    "type": "redox_other",
    "effects": [],
    "net": "Th + 8 HNO3 → Th(NO3)4 + 4 NO2 + 4 H2O"
  },
  {
    "id": "nuc-th-hcl-dissolution",
    "name": "Hydrochloric acid attack on thorium metal",
    "reactants": [
      "th",
      "hcl"
    ],
    "products": [
      "thcl4",
      "h2"
    ],
    "enthalpy": -760,
    "desc": "Dissolution of metallic thorium generating ThCl4 and hydrogen gas.",
    "type": "redox_other",
    "effects": [],
    "net": "Th + 4 HCl → ThCl4 + 2 H2"
  },
  {
    "id": "nuc-th-h2so4-dissolution",
    "name": "Sulfuric acid dissolution of metallic thorium",
    "reactants": [
      "th",
      "h2so4"
    ],
    "products": [
      "th-so4-2",
      "h2"
    ],
    "enthalpy": -810,
    "desc": "Dissolution of thorium metal generating thorium sulfate.",
    "type": "redox_other",
    "effects": [],
    "net": "Th + 2 H2SO4 → Th(SO4)2 + 2 H2"
  },
  {
    "id": "nuc-th-air-combustion-tho2",
    "name": "Elemental combustion of thorium metal to thorium dioxide",
    "reactants": [
      "th",
      "o2"
    ],
    "products": [
      "tho2"
    ],
    "enthalpy": -1226,
    "desc": "Energetic oxidation yielding the highest melting oxide known (ThO2, 3390°C).",
    "type": "synthesis",
    "effects": [],
    "net": "Th + O2 → ThO2"
  },
  {
    "id": "nuc-th-cl2-chlorination",
    "name": "Direct chlorination of metallic thorium to ThCl4",
    "reactants": [
      "th",
      "cl2"
    ],
    "products": [
      "thcl4"
    ],
    "enthalpy": -1185,
    "desc": "Anhydrous vapor chlorination at 600°C generating sublimed ThCl4.",
    "type": "synthesis",
    "effects": [],
    "net": "Th + 2 Cl2 → ThCl4"
  },
  {
    "id": "nuc-th-f2-fluorination",
    "name": "Direct fluorination of thorium metal to ThF4",
    "reactants": [
      "th",
      "f2"
    ],
    "products": [
      "thf4"
    ],
    "enthalpy": -2095,
    "desc": "Direct elemental synthesis of thorium tetrafluoride.",
    "type": "synthesis",
    "effects": [],
    "net": "Th + 2 F2 → ThF4"
  },
  {
    "id": "nuc-th-nitrate-naoh-precipitation",
    "name": "Caustic soda precipitation of thorium hydroxide from nitrate",
    "reactants": [
      "th-no3-4",
      "naoh"
    ],
    "products": [
      "tho2",
      "nano3",
      "water"
    ],
    "enthalpy": -190,
    "desc": "Alkaline precipitation isolating hydrated thoria.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FDFEFE",
        "description": "Dense white gelatinous thorium hydroxide precipitates"
      }
    ],
    "net": "Th(NO3)4 + 4 NaOH → ThO2 + 4 NaNO3 + 2 H2O"
  },
  {
    "id": "nuc-th-nitrate-koh-precipitation",
    "name": "Potassium hydroxide precipitation of thorium hydroxide",
    "reactants": [
      "th-no3-4",
      "koh"
    ],
    "products": [
      "tho2",
      "kno3",
      "water"
    ],
    "enthalpy": -195,
    "desc": "Precipitation of thorium hydrous oxide by KOH.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FDFEFE",
        "description": "White precipitate of hydrated ThO2 forms"
      }
    ],
    "net": "Th(NO3)4 + 4 KOH → ThO2 + 4 KNO3 + 2 H2O"
  },
  {
    "id": "nuc-th-nitrate-ammonia-precipitation",
    "name": "Ammonia precipitation of thorium hydroxide from nitrate solution",
    "reactants": [
      "th-no3-4",
      "ammonia",
      "water"
    ],
    "products": [
      "tho2",
      "nh4no3"
    ],
    "enthalpy": -180,
    "desc": "Separation of thorium from rare earths via selective ammonia precipitation.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FDFEFE",
        "description": "White gelatinous precipitate forms"
      }
    ],
    "net": "Th(NO3)4 + 4 NH3 + 2 H2O → ThO2 + 4 NH4NO3"
  },
  {
    "id": "nuc-th-oxalate-nitrate-precipitation",
    "name": "Selective oxalate precipitation of thorium(IV) from nitrate solution",
    "reactants": [
      "th-no3-4",
      "h2c2o4"
    ],
    "products": [
      "th-c2o4-2",
      "hno3"
    ],
    "enthalpy": -92,
    "desc": "Highly selective analytical and industrial separation of thorium from trivalent lanthanides.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Heavy white crystalline thorium oxalate precipitates"
      }
    ],
    "net": "Th(NO3)4 + 2 H2C2O4 → Th(C2O4)2 + 4 HNO3"
  },
  {
    "id": "nuc-th-oxalate-na2c2o4-precip",
    "name": "Sodium oxalate precipitation of thorium oxalate",
    "reactants": [
      "th-no3-4",
      "na2c2o4"
    ],
    "products": [
      "th-c2o4-2",
      "nano3"
    ],
    "enthalpy": -96,
    "desc": "Precipitation of insoluble thorium oxalate using sodium oxalate.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "White thorium oxalate precipitates"
      }
    ],
    "net": "Th(NO3)4 + 2 Na2C2O4 → Th(C2O4)2 + 4 NaNO3"
  },
  {
    "id": "nuc-th-oxalate-k2c2o4-precip",
    "name": "Potassium oxalate precipitation of thorium oxalate",
    "reactants": [
      "th-no3-4",
      "k2c2o4"
    ],
    "products": [
      "th-c2o4-2",
      "kno3"
    ],
    "enthalpy": -98,
    "desc": "Quantitative precipitation of thorium oxalate.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "White crystalline thorium oxalate precipitates"
      }
    ],
    "net": "Th(NO3)4 + 2 K2C2O4 → Th(C2O4)2 + 4 KNO3"
  },
  {
    "id": "nuc-thcl4-oxalate-precip",
    "name": "Oxalic acid precipitation of thorium from chloride solution",
    "reactants": [
      "thcl4",
      "h2c2o4"
    ],
    "products": [
      "th-c2o4-2",
      "hcl"
    ],
    "enthalpy": -88,
    "desc": "Selective recovery of thorium from monazite chloride leach liquor.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "White thorium oxalate precipitates"
      }
    ],
    "net": "ThCl4 + 2 H2C2O4 → Th(C2O4)2 + 4 HCl"
  },
  {
    "id": "nuc-thso42-oxalate-precip",
    "name": "Oxalic acid precipitation of thorium from sulfate solution",
    "reactants": [
      "th-so4-2",
      "h2c2o4"
    ],
    "products": [
      "th-c2o4-2",
      "h2so4"
    ],
    "enthalpy": -84,
    "desc": "Isolation of thorium from concentrated monazite sulfuric acid digestate.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "White thorium oxalate precipitates"
      }
    ],
    "net": "Th(SO4)2 + 2 H2C2O4 → Th(C2O4)2 + 2 H2SO4"
  },
  {
    "id": "nuc-th-oxalate-calcination-tho2",
    "name": "Thermal calcination of thorium oxalate to ceramic thoria",
    "reactants": [
      "th-c2o4-2"
    ],
    "products": [
      "tho2",
      "co",
      "co2"
    ],
    "enthalpy": 240,
    "desc": "Thermal decomposition at 800°C generating high surface area nuclear-grade ThO2 powder.",
    "type": "decomposition",
    "effects": [],
    "net": "Th(C2O4)2 → ThO2 + 2 CO + 2 CO2"
  },
  {
    "id": "nuc-th-oxalate-air-calcination",
    "name": "Oxidative air calcination of thorium oxalate",
    "reactants": [
      "th-c2o4-2",
      "o2"
    ],
    "products": [
      "tho2",
      "co2"
    ],
    "enthalpy": -820,
    "desc": "Air roasting of thorium oxalate producing pure thorium dioxide.",
    "type": "redox_other",
    "effects": [],
    "net": "Th(C2O4)2 + O2 → ThO2 + 4 CO2"
  },
  {
    "id": "nuc-thf4-calcium-reduction",
    "name": "Calciothermic reduction of thorium tetrafluoride to thorium metal",
    "reactants": [
      "thf4",
      "ca"
    ],
    "products": [
      "th",
      "caf2"
    ],
    "enthalpy": -630,
    "desc": "Ames-type bomb reduction producing reactor-grade metallic thorium.",
    "type": "redox_other",
    "effects": [],
    "net": "ThF4 + 2 Ca → Th + 2 CaF2"
  },
  {
    "id": "nuc-thf4-magnesium-reduction",
    "name": "Magnesiothermic reduction of thorium tetrafluoride",
    "reactants": [
      "thf4",
      "mg"
    ],
    "products": [
      "th",
      "mgf2"
    ],
    "enthalpy": -410,
    "desc": "Metallothermic reduction yielding thorium-magnesium alloy intermediate.",
    "type": "redox_other",
    "effects": [],
    "net": "ThF4 + 2 Mg → Th + 2 MgF2"
  },
  {
    "id": "nuc-thcl4-sodium-reduction",
    "name": "Sodiothermic reduction of thorium tetrachloride",
    "reactants": [
      "thcl4",
      "na"
    ],
    "products": [
      "th",
      "nacl"
    ],
    "enthalpy": -740,
    "desc": "Vapor-phase sodium reduction producing ductile thorium sponge.",
    "type": "redox_other",
    "effects": [],
    "net": "ThCl4 + 4 Na → Th + 4 NaCl"
  },
  {
    "id": "nuc-thcl4-potassium-reduction",
    "name": "Potassiothermic reduction of thorium tetrachloride",
    "reactants": [
      "thcl4",
      "k"
    ],
    "products": [
      "th",
      "kcl"
    ],
    "enthalpy": -770,
    "desc": "Reduction of ThCl4 by molten potassium.",
    "type": "redox_other",
    "effects": [],
    "net": "ThCl4 + 4 K → Th + 4 KCl"
  },
  {
    "id": "nuc-thcl4-magnesium-reduction",
    "name": "Kroll-type magnesium reduction of thorium tetrachloride",
    "reactants": [
      "thcl4",
      "mg"
    ],
    "products": [
      "th",
      "mgcl2"
    ],
    "enthalpy": -480,
    "desc": "Pyrometallurgical reduction of anhydrous ThCl4 vapor by molten magnesium.",
    "type": "redox_other",
    "effects": [],
    "net": "ThCl4 + 2 Mg → Th + 2 MgCl2"
  },
  {
    "id": "nuc-thcl4-calcium-reduction",
    "name": "Calciothermic reduction of thorium tetrachloride",
    "reactants": [
      "thcl4",
      "ca"
    ],
    "products": [
      "th",
      "cacl2"
    ],
    "enthalpy": -590,
    "desc": "Exothermic bomb reduction producing metallic thorium buttons.",
    "type": "redox_other",
    "effects": [],
    "net": "ThCl4 + 2 Ca → Th + 2 CaCl2"
  },
  {
    "id": "nuc-thso42-naoh-precipitation",
    "name": "Caustic neutralization of thorium sulfate",
    "reactants": [
      "th-so4-2",
      "naoh"
    ],
    "products": [
      "tho2",
      "na2so4",
      "water"
    ],
    "enthalpy": -188,
    "desc": "Alkaline precipitation recovering thorium from sulfate solution.",
    "type": "precipitation",
    "effects": [],
    "net": "Th(SO4)2 + 4 NaOH → ThO2 + 2 Na2SO4 + 2 H2O"
  },
  {
    "id": "nuc-thso42-barium-nitrate-metathesis",
    "name": "Sulfate removal from thorium sulfate using barium nitrate",
    "reactants": [
      "th-so4-2",
      "ba-no3-2"
    ],
    "products": [
      "baso4",
      "th-no3-4"
    ],
    "enthalpy": -46,
    "desc": "Quantitative metathesis separating thorium into nitrate phase.",
    "type": "precipitation",
    "effects": [],
    "net": "Th(SO4)2 + 2 BaN2O6 → 2 BaSO4 + Th(NO3)4"
  },
  {
    "id": "nuc-thso42-barium-chloride-metathesis",
    "name": "Conversion of thorium sulfate to thorium chloride via BaCl2",
    "reactants": [
      "th-so4-2",
      "bacl2"
    ],
    "products": [
      "baso4",
      "thcl4"
    ],
    "enthalpy": -44,
    "desc": "Precipitation of barium sulfate yielding anhydrous ThCl4 precursor.",
    "type": "precipitation",
    "effects": [],
    "net": "Th(SO4)2 + 2 BaCl2 → 2 BaSO4 + ThCl4"
  },
  {
    "id": "nuc-th-water-corrosion",
    "name": "High-temperature corrosion of thorium metal by steam",
    "reactants": [
      "th",
      "water"
    ],
    "products": [
      "tho2",
      "h2"
    ],
    "enthalpy": -510,
    "desc": "Hydrothermal oxidation of metallic thorium generating hydrogen.",
    "type": "redox_other",
    "effects": [],
    "net": "Th + 2 H2O → ThO2 + 2 H2"
  },
  {
    "id": "nuc-uranyl-chloride-agno3-metathesis",
    "name": "Silver nitrate precipitation of chloride from uranyl chloride",
    "reactants": [
      "uo2cl2",
      "agno3"
    ],
    "products": [
      "agcl",
      "uo2-no3-2"
    ],
    "enthalpy": -112,
    "desc": "Quantitative argentometric removal of chloride generating uranyl nitrate.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Curdy white AgCl precipitates"
      }
    ],
    "net": "UO2Cl2 + 2 AgNO3 → 2 AgCl + UO2(NO3)2"
  },
  {
    "id": "nuc-uo2-sulfate-h2s-reduction",
    "name": "Hydrogen sulfide reductive precipitation of uranium dioxide from uranyl sulfate",
    "reactants": [
      "uo2so4",
      "h2s"
    ],
    "products": [
      "uo2",
      "s",
      "h2so4"
    ],
    "enthalpy": -95,
    "desc": "Biogeochemical model: H2S reduction precipitating uraninite and elemental sulfur.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#1C1C1C",
        "description": "Black uraninite and yellow sulfur precipitate"
      }
    ],
    "net": "UO2SO4 + H2S → UO2 + S + H2SO4"
  },
  {
    "id": "nuc-uo2-nitrate-h2s-reduction",
    "name": "Hydrogen sulfide reduction of uranyl nitrate to uraninite",
    "reactants": [
      "uo2-no3-2",
      "h2s"
    ],
    "products": [
      "uo2",
      "s",
      "hno3"
    ],
    "enthalpy": -98,
    "desc": "Reductive immobilization of uranyl ions by sulfide in roll-front ore genesis.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#1C1C1C",
        "description": "Black UO2 precipitate forms"
      }
    ],
    "net": "UO2(NO3)2 + H2S → UO2 + S + 2 HNO3"
  },
  {
    "id": "nuc-uo2-chloride-h2s-reduction",
    "name": "Sulfide reduction of uranyl chloride",
    "reactants": [
      "uo2cl2",
      "h2s"
    ],
    "products": [
      "uo2",
      "s",
      "hcl"
    ],
    "enthalpy": -92,
    "desc": "Precipitation of uranium dioxide via hydrogen sulfide reduction.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#1C1C1C",
        "description": "Black UO2 precipitate forms"
      }
    ],
    "net": "UO2Cl2 + H2S → UO2 + S + 2 HCl"
  },
  {
    "id": "nuc-uo2-sulfate-na2s-reduction",
    "name": "Sodium sulfide reduction of uranyl sulfate",
    "reactants": [
      "uo2so4",
      "na2s"
    ],
    "products": [
      "uo2",
      "s",
      "na2so4"
    ],
    "enthalpy": -115,
    "desc": "Alkaline sulfide reduction precipitating uraninite.",
    "type": "precipitation",
    "effects": [],
    "net": "UO2SO4 + Na2S → UO2 + S + Na2SO4"
  },
  {
    "id": "nuc-uo2-chloride-na2s-reduction",
    "name": "Sodium sulfide reduction of uranyl chloride",
    "reactants": [
      "uo2cl2",
      "na2s"
    ],
    "products": [
      "uo2",
      "s",
      "nacl"
    ],
    "enthalpy": -110,
    "desc": "Sulfide reduction immobilizing uranium.",
    "type": "precipitation",
    "effects": [],
    "net": "UO2Cl2 + Na2S → UO2 + S + 2 NaCl"
  },
  {
    "id": "nuc-uranyl-carbonate-co-reduction",
    "name": "Carbon monoxide reduction of uranyl carbonate",
    "reactants": [
      "uo2co3",
      "co"
    ],
    "products": [
      "uo2",
      "co2"
    ],
    "enthalpy": -160,
    "desc": "Pyrometallurgical reduction converting carbonate to dioxide.",
    "type": "redox_other",
    "effects": [],
    "net": "UO2CO3 + CO → UO2 + 2 CO2"
  },
  {
    "id": "nuc-uranyl-carbonate-carbon-reduction",
    "name": "Carbothermic reduction of uranyl carbonate",
    "reactants": [
      "uo2co3",
      "c"
    ],
    "products": [
      "uo2",
      "co"
    ],
    "enthalpy": 110,
    "desc": "High-temperature vacuum reduction of uranyl carbonate.",
    "type": "redox_other",
    "effects": [],
    "net": "UO2CO3 + 2 C → UO2 + 3 CO"
  },
  {
    "id": "nuc-u3o8-carbon-reduction",
    "name": "Carbothermic reduction of triuranium octoxide",
    "reactants": [
      "u3o8",
      "c"
    ],
    "products": [
      "uo2",
      "co"
    ],
    "enthalpy": 125,
    "desc": "Direct carbothermic reduction of pitchblende concentrate.",
    "type": "redox_other",
    "effects": [],
    "net": "U3O8 + 2 C → 3 UO2 + 2 CO"
  },
  {
    "id": "nuc-u-co2-corrosion",
    "name": "Corrosion of metallic uranium by hot carbon dioxide gas",
    "reactants": [
      "u",
      "co2"
    ],
    "products": [
      "uo2",
      "co"
    ],
    "enthalpy": -520,
    "desc": "Magnox reactor gas coolant reaction with ruptured fuel cladding.",
    "type": "redox_other",
    "effects": [],
    "net": "U + 2 CO2 → UO2 + 2 CO"
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
