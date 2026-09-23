// Domain 23: Heterogeneous Catalysis & Industrial Inorganic (100 reactions)
import { addReaction } from "./generateBatch6.js";

export function buildDomain23CatalysisInorganic(): void {
  const reactions = [
  {
    "id": "cat-so2-no2-oxidation",
    "name": "Lead chamber process: oxidation of sulfur dioxide by nitrogen dioxide",
    "reactants": [
      "so2",
      "no2"
    ],
    "products": [
      "so3",
      "no"
    ],
    "enthalpy": -84,
    "desc": "Historical homogeneous gas-phase catalytic oxidation in lead chamber sulfuric acid synthesis.",
    "type": "synthesis",
    "effects": [],
    "net": "SO2 + NO2 → SO3 + NO"
  },
  {
    "id": "cat-so2-n2o-oxidation",
    "name": "Nitrous oxide oxidation of sulfur dioxide over metal oxide catalyst",
    "reactants": [
      "so2",
      "n2o"
    ],
    "products": [
      "so3",
      "n2"
    ],
    "enthalpy": -195,
    "desc": "Catalytic abatement of nitrous oxide with sulfur dioxide.",
    "type": "synthesis",
    "effects": [],
    "net": "SO2 + N2O → SO3 + N2"
  },
  {
    "id": "cat-so2cl2-naoh-neutralize",
    "name": "Caustic soda neutralization of sulfuryl chloride",
    "reactants": [
      "so2cl2",
      "naoh"
    ],
    "products": [
      "na2so4",
      "nacl",
      "water"
    ],
    "enthalpy": -320,
    "desc": "Alkaline scrubber neutralization of sulfuryl chloride vapors.",
    "type": "synthesis",
    "effects": [],
    "net": "SO2Cl2 + 4 NaOH → Na2SO4 + 2 NaCl + 2 H2O"
  },
  {
    "id": "cat-so2cl2-koh-neutralize",
    "name": "Caustic potash neutralization of sulfuryl chloride",
    "reactants": [
      "so2cl2",
      "koh"
    ],
    "products": [
      "k2so4",
      "kcl",
      "water"
    ],
    "enthalpy": -325,
    "desc": "Alkaline destruction producing potassium sulfate and chloride.",
    "type": "synthesis",
    "effects": [],
    "net": "SO2Cl2 + 4 KOH → K2SO4 + 2 KCl + 2 H2O"
  },
  {
    "id": "cat-socl2-naoh-neutralize",
    "name": "Caustic soda neutralization of thionyl chloride",
    "reactants": [
      "socl2",
      "naoh"
    ],
    "products": [
      "na2so3",
      "nacl",
      "water"
    ],
    "enthalpy": -280,
    "desc": "Scrubber neutralization generating sodium sulfite and chloride.",
    "type": "synthesis",
    "effects": [],
    "net": "SOCl2 + 4 NaOH → Na2SO3 + 2 NaCl + 2 H2O"
  },
  {
    "id": "cat-socl2-koh-neutralize",
    "name": "Caustic potash neutralization of thionyl chloride",
    "reactants": [
      "socl2",
      "koh"
    ],
    "products": [
      "k2so3",
      "kcl",
      "water"
    ],
    "enthalpy": -285,
    "desc": "Alkaline scrubber destruction using caustic potash.",
    "type": "synthesis",
    "effects": [],
    "net": "SOCl2 + 4 KOH → K2SO3 + 2 KCl + 2 H2O"
  },
  {
    "id": "cat-socl2-so3-chlorosulfonic",
    "name": "Reaction of thionyl chloride with sulfur trioxide",
    "reactants": [
      "socl2",
      "so3"
    ],
    "products": [
      "so2",
      "so2cl2"
    ],
    "enthalpy": -50,
    "desc": "Industrial interconversion yielding sulfuryl chloride and sulfur dioxide.",
    "type": "synthesis",
    "effects": [],
    "net": "SOCl2 + SO3 → SO2 + SO2Cl2"
  },
  {
    "id": "cat-so3-naoh-sulfate",
    "name": "Direct neutralization of sulfur trioxide vapor by caustic soda",
    "reactants": [
      "so3",
      "naoh"
    ],
    "products": [
      "na2so4",
      "water"
    ],
    "enthalpy": -285,
    "desc": "Highly exothermic gas-liquid scrubbing of SO3.",
    "type": "synthesis",
    "effects": [],
    "net": "SO3 + 2 NaOH → Na2SO4 + H2O"
  },
  {
    "id": "cat-so3-koh-sulfate",
    "name": "Caustic potash absorption of sulfur trioxide",
    "reactants": [
      "so3",
      "koh"
    ],
    "products": [
      "k2so4",
      "water"
    ],
    "enthalpy": -290,
    "desc": "Absorption of sulfur trioxide forming potassium sulfate.",
    "type": "synthesis",
    "effects": [],
    "net": "SO3 + 2 KOH → K2SO4 + H2O"
  },
  {
    "id": "cat-so3-nacl-metathesis",
    "name": "High-temperature reaction of sulfur trioxide with sodium chloride",
    "reactants": [
      "so3",
      "nacl",
      "water"
    ],
    "products": [
      "na2so4",
      "hcl"
    ],
    "enthalpy": -65,
    "desc": "Mannheim furnace analog converting salt to sodium sulfate.",
    "type": "synthesis",
    "effects": [],
    "net": "SO3 + 2 NaCl + H2O → Na2SO4 + 2 HCl"
  },
  {
    "id": "cat-so3-kcl-metathesis",
    "name": "Reaction of sulfur trioxide with potassium chloride",
    "reactants": [
      "so3",
      "kcl",
      "water"
    ],
    "products": [
      "k2so4",
      "hcl"
    ],
    "enthalpy": -68,
    "desc": "Conversion of potassium chloride to potassium sulfate.",
    "type": "synthesis",
    "effects": [],
    "net": "SO3 + 2 KCl + H2O → K2SO4 + 2 HCl"
  },
  {
    "id": "cat-so3-ammonia-sulfate",
    "name": "Direct gas-phase reaction of sulfur trioxide and ammonia",
    "reactants": [
      "so3",
      "ammonia",
      "water"
    ],
    "products": [
      "nh4-2-so4"
    ],
    "enthalpy": -210,
    "desc": "Synthesis of fertilizer ammonium sulfate from sulfur trioxide.",
    "type": "synthesis",
    "effects": [],
    "net": "SO3 + 2 NH3 + H2O → (NH4)2SO4"
  },
  {
    "id": "cat-so3-nahco3-sulfate",
    "name": "Bicarbonate dry sorbent injection: neutralization of sulfur trioxide",
    "reactants": [
      "so3",
      "nahco3"
    ],
    "products": [
      "na2so4",
      "co2",
      "water"
    ],
    "enthalpy": -165,
    "desc": "Flue gas duct injection of sodium bicarbonate capturing SO3 emissions.",
    "type": "synthesis",
    "effects": [],
    "net": "SO3 + 2 NaHCO3 → Na2SO4 + 2 CO2 + H2O"
  },
  {
    "id": "cat-so3-khco3-sulfate",
    "name": "Potassium bicarbonate absorption of sulfur trioxide",
    "reactants": [
      "so3",
      "khco3"
    ],
    "products": [
      "k2so4",
      "co2",
      "water"
    ],
    "enthalpy": -170,
    "desc": "Neutralization of sulfur trioxide by potassium bicarbonate.",
    "type": "synthesis",
    "effects": [],
    "net": "SO3 + 2 KHCO3 → K2SO4 + 2 CO2 + H2O"
  },
  {
    "id": "cat-so3-na2co3-sulfate",
    "name": "Dry soda ash absorption of sulfur trioxide",
    "reactants": [
      "so3",
      "na2co3"
    ],
    "products": [
      "na2so4",
      "co2"
    ],
    "enthalpy": -195,
    "desc": "Solid-gas reaction capturing SO3 in hot flue gas streams.",
    "type": "synthesis",
    "effects": [],
    "net": "SO3 + Na2CO3 → Na2SO4 + CO2"
  },
  {
    "id": "cat-claus-cos-hydrolysis",
    "name": "Claus catalytic converter: hydrolysis of carbonyl sulfide impurity",
    "reactants": [
      "carbonyl-sulfide",
      "water"
    ],
    "products": [
      "co2",
      "h2s"
    ],
    "enthalpy": -35,
    "desc": "Alumina-catalyzed hydrolysis of COS intermediate in refinery Claus sulfur recovery unit.",
    "type": "synthesis",
    "effects": [],
    "net": "COS + H2O → CO2 + H2S"
  },
  {
    "id": "cat-claus-cos-oxidation",
    "name": "Direct catalytic oxidation of carbonyl sulfide",
    "reactants": [
      "carbonyl-sulfide",
      "o2"
    ],
    "products": [
      "co2",
      "so2"
    ],
    "enthalpy": -545,
    "desc": "Thermal combustion of carbonyl sulfide in Claus reaction furnace.",
    "type": "synthesis",
    "effects": [],
    "net": "2 COS + 3 O2 → 2 CO2 + 2 SO2"
  },
  {
    "id": "cat-claus-cs2-chlorination",
    "name": "Carbon tetrachloride synthesis: chlorination of carbon disulfide",
    "reactants": [
      "cs2",
      "cl2"
    ],
    "products": [
      "ccl4",
      "s"
    ],
    "enthalpy": -230,
    "desc": "Industrial synthesis of carbon tetrachloride and elemental sulfur over iron catalyst.",
    "type": "synthesis",
    "effects": [],
    "net": "CS2 + 2 Cl2 → CCl4 + 2 S"
  },
  {
    "id": "cat-claus-cos-naoh",
    "name": "Caustic scrubbing of carbonyl sulfide gas",
    "reactants": [
      "carbonyl-sulfide",
      "naoh"
    ],
    "products": [
      "na2co3",
      "na2s",
      "water"
    ],
    "enthalpy": -140,
    "desc": "Alkaline chemical scrubbing of acid gas containing carbonyl sulfide.",
    "type": "synthesis",
    "effects": [],
    "net": "COS + 4 NaOH → Na2CO3 + Na2S + 2 H2O"
  },
  {
    "id": "cat-claus-cos-koh",
    "name": "Potassium hydroxide absorption of carbonyl sulfide",
    "reactants": [
      "carbonyl-sulfide",
      "koh"
    ],
    "products": [
      "k2co3",
      "k2s",
      "water"
    ],
    "enthalpy": -145,
    "desc": "Caustic absorption converting COS to carbonate and sulfide.",
    "type": "synthesis",
    "effects": [],
    "net": "COS + 4 KOH → K2CO3 + K2S + 2 H2O"
  },
  {
    "id": "cat-h2s-cl2-redox",
    "name": "Vapor-phase redox: oxidation of hydrogen sulfide by chlorine",
    "reactants": [
      "h2s",
      "cl2"
    ],
    "products": [
      "s",
      "hcl"
    ],
    "enthalpy": -175,
    "desc": "Rapid gas-phase redox depositing elemental sulfur.",
    "type": "synthesis",
    "effects": [],
    "net": "H2S + Cl2 → S + 2 HCl"
  },
  {
    "id": "cat-h2s-br2-redox",
    "name": "Oxidation of hydrogen sulfide by bromine",
    "reactants": [
      "h2s",
      "br2"
    ],
    "products": [
      "s",
      "hbr"
    ],
    "enthalpy": -130,
    "desc": "Quantitative redox reaction depositing sulfur powder.",
    "type": "synthesis",
    "effects": [],
    "net": "H2S + Br2 → S + 2 HBr"
  },
  {
    "id": "cat-h2s-i2-redox",
    "name": "Bumgarner-type redox: reduction of iodine by hydrogen sulfide",
    "reactants": [
      "h2s",
      "i2"
    ],
    "products": [
      "s",
      "hi"
    ],
    "enthalpy": -45,
    "desc": "Precipitation of sulfur with formation of hydriodic acid.",
    "type": "synthesis",
    "effects": [],
    "net": "H2S + I2 → S + 2 HI"
  },
  {
    "id": "cat-h2s-so3-redox",
    "name": "Gas-phase comproportionation of hydrogen sulfide and sulfur trioxide",
    "reactants": [
      "h2s",
      "so3"
    ],
    "products": [
      "s",
      "so2",
      "water"
    ],
    "enthalpy": -210,
    "desc": "Exothermic gas-phase redox in sulfur plant tail gas units.",
    "type": "synthesis",
    "effects": [],
    "net": "H2S + SO3 → S + SO2 + H2O"
  },
  {
    "id": "cat-cs2-naoh-scrub",
    "name": "Caustic soda scrubbing of carbon disulfide",
    "reactants": [
      "cs2",
      "naoh"
    ],
    "products": [
      "na2co3",
      "na2s",
      "water"
    ],
    "enthalpy": -195,
    "desc": "Scrubber absorption of CS2 vapors in caustic soda.",
    "type": "synthesis",
    "effects": [],
    "net": "CS2 + 6 NaOH → Na2CO3 + 2 Na2S + 3 H2O"
  },
  {
    "id": "cat-cs2-koh-scrub",
    "name": "Potassium hydroxide scrubbing of carbon disulfide",
    "reactants": [
      "cs2",
      "koh"
    ],
    "products": [
      "k2co3",
      "k2s",
      "water"
    ],
    "enthalpy": -200,
    "desc": "Alkaline absorption of carbon disulfide.",
    "type": "synthesis",
    "effects": [],
    "net": "CS2 + 6 KOH → K2CO3 + 2 K2S + 3 H2O"
  },
  {
    "id": "cat-h2s-no2-oxidation",
    "name": "Oxidation of hydrogen sulfide by nitrogen dioxide",
    "reactants": [
      "h2s",
      "no2"
    ],
    "products": [
      "s",
      "no",
      "water"
    ],
    "enthalpy": -145,
    "desc": "Flue gas cross-redox between H2S and NO2.",
    "type": "synthesis",
    "effects": [],
    "net": "H2S + NO2 → S + NO + H2O"
  },
  {
    "id": "cat-h2s-n2o-reduction",
    "name": "Catalytic reduction of nitrous oxide by hydrogen sulfide",
    "reactants": [
      "h2s",
      "n2o"
    ],
    "products": [
      "s",
      "n2",
      "water"
    ],
    "enthalpy": -265,
    "desc": "Simultaneous DeNOx and desulfurization.",
    "type": "synthesis",
    "effects": [],
    "net": "H2S + N2O → S + N2 + H2O"
  },
  {
    "id": "cat-h2s-so2cl2-redox",
    "name": "Cross-redox reaction between hydrogen sulfide and sulfuryl chloride",
    "reactants": [
      "h2s",
      "so2cl2"
    ],
    "products": [
      "s",
      "so2",
      "hcl"
    ],
    "enthalpy": -240,
    "desc": "Vapor-phase destruction of toxic halides generating sulfur and SO2.",
    "type": "synthesis",
    "effects": [],
    "net": "H2S + SO2Cl2 → S + SO2 + 2 HCl"
  },
  {
    "id": "cat-raschig-chloramine-synth",
    "name": "Raschig process Step 1: synthesis of chloramine from ammonia and hypochlorite",
    "reactants": [
      "ammonia",
      "naclo"
    ],
    "products": [
      "nh2cl",
      "naoh"
    ],
    "enthalpy": -145,
    "desc": "Low-temperature rapid synthesis of monochloramine in the industrial Raschig route.",
    "type": "synthesis",
    "effects": [],
    "net": "NH3 + NaClO → NH2Cl + NaOH"
  },
  {
    "id": "cat-raschig-hydrazine-coupling",
    "name": "Raschig process Step 2: coupling of chloramine with excess ammonia",
    "reactants": [
      "nh2cl",
      "ammonia",
      "naoh"
    ],
    "products": [
      "n2h4",
      "nacl",
      "water"
    ],
    "enthalpy": -180,
    "desc": "Gelatin-catalyzed nucleophilic displacement forming hydrazine hydrate.",
    "type": "synthesis",
    "effects": [],
    "net": "NH2Cl + NH3 + NaOH → N2H4 + NaCl + H2O"
  },
  {
    "id": "cat-raschig-sulfate-precip",
    "name": "Isolation of hydrazine as crystalline hydrazine sulfate",
    "reactants": [
      "n2h4",
      "h2so4"
    ],
    "products": [
      "h2nnh2-h2so4"
    ],
    "enthalpy": -155,
    "desc": "Quantitative precipitation of sparingly soluble hydrazine sulfate from dilute crude Raschig liquor.",
    "type": "synthesis",
    "effects": [],
    "net": "N2H4 + H2SO4 → N2H6SO4"
  },
  {
    "id": "cat-hydrazine-peroxide-combust",
    "name": "Hypergolic bipropellant combustion: hydrazine and hydrogen peroxide",
    "reactants": [
      "n2h4",
      "h2o2"
    ],
    "products": [
      "n2",
      "water"
    ],
    "enthalpy": -640,
    "desc": "Clean high-energy rocket thruster propellant reaction yielding nitrogen and steam.",
    "type": "synthesis",
    "effects": [],
    "net": "N2H4 + 2 H2O2 → N2 + 4 H2O"
  },
  {
    "id": "cat-hydrazine-chlorine-redox",
    "name": "Dechlorination: destruction of chlorine gas by hydrazine",
    "reactants": [
      "n2h4",
      "cl2"
    ],
    "products": [
      "n2",
      "hcl"
    ],
    "enthalpy": -520,
    "desc": "Rapid environmental scavenging of chlorine gas.",
    "type": "synthesis",
    "effects": [],
    "net": "N2H4 + 2 Cl2 → N2 + 4 HCl"
  },
  {
    "id": "cat-hydrazine-bromine-redox",
    "name": "Bromine reduction by hydrazine",
    "reactants": [
      "n2h4",
      "br2"
    ],
    "products": [
      "n2",
      "hbr"
    ],
    "enthalpy": -480,
    "desc": "Quantitative reduction of bromine to hydrobromic acid.",
    "type": "synthesis",
    "effects": [],
    "net": "N2H4 + 2 Br2 → N2 + 4 HBr"
  },
  {
    "id": "cat-hydrazine-iodine-titration",
    "name": "Iodometric titration of hydrazine",
    "reactants": [
      "n2h4",
      "i2"
    ],
    "products": [
      "n2",
      "hi"
    ],
    "enthalpy": -310,
    "desc": "Analytical standardization of hydrazine solutions with iodine.",
    "type": "synthesis",
    "effects": [],
    "net": "N2H4 + 2 I2 → N2 + 4 HI"
  },
  {
    "id": "cat-hydrazine-iron-reduction",
    "name": "Hydrazine boiler feedwater oxygen scavenging and magnetite passivation",
    "reactants": [
      "n2h4",
      "fe2o3"
    ],
    "products": [
      "fe3o4",
      "n2",
      "water"
    ],
    "enthalpy": -240,
    "desc": "Reduction of rust to adherent protective black magnetite film on boiler tubes.",
    "type": "synthesis",
    "effects": [],
    "net": "N2H4 + 6 Fe2O3 → 4 Fe3O4 + N2 + 2 H2O"
  },
  {
    "id": "cat-hydrazine-cupric-reduction",
    "name": "Hydrazine reduction of copper(II) chloride to metallic copper",
    "reactants": [
      "cucl2",
      "n2h4",
      "naoh"
    ],
    "products": [
      "cu",
      "n2",
      "nacl",
      "water"
    ],
    "enthalpy": -320,
    "desc": "Electroless copper deposition and nanoparticle synthesis via hydrazine reduction.",
    "type": "synthesis",
    "effects": [],
    "net": "2 CuCl2 + N2H4 + 4 NaOH → 2 Cu + N2 + 4 NaCl + 4 H2O"
  },
  {
    "id": "cat-hydrazine-cu-sulfate-reduct",
    "name": "Hydrazine reduction of copper(II) sulfate",
    "reactants": [
      "cuso4",
      "n2h4",
      "naoh"
    ],
    "products": [
      "cu",
      "n2",
      "na2so4",
      "water"
    ],
    "enthalpy": -315,
    "desc": "Precipitation of ultrafine copper powder.",
    "type": "synthesis",
    "effects": [],
    "net": "2 CuSO4 + N2H4 + 4 NaOH → 2 Cu + N2 + 2 Na2SO4 + 4 H2O"
  },
  {
    "id": "cat-hydrazine-silver-mirror",
    "name": "Silver mirror formation via hydrazine reduction of silver nitrate",
    "reactants": [
      "agno3",
      "n2h4",
      "naoh"
    ],
    "products": [
      "ag",
      "n2",
      "nano3",
      "water"
    ],
    "enthalpy": -380,
    "desc": "Chemical silver metallization of glass mirrors using hydrazine reductant.",
    "type": "synthesis",
    "effects": [],
    "net": "4 AgNO3 + N2H4 + 4 NaOH → 4 Ag + N2 + 4 NaNO3 + 4 H2O"
  },
  {
    "id": "cat-hydrazine-sulfate-naoh-free",
    "name": "Liberation of free hydrazine hydrate from hydrazine sulfate by caustic soda",
    "reactants": [
      "h2nnh2-h2so4",
      "naoh"
    ],
    "products": [
      "n2h4",
      "na2so4",
      "water"
    ],
    "enthalpy": -45,
    "desc": "Neutralization and distillation of anhydrous/hydrate hydrazine.",
    "type": "synthesis",
    "effects": [],
    "net": "N2H6SO4 + 2 NaOH → N2H4 + Na2SO4 + 2 H2O"
  },
  {
    "id": "cat-hydrazine-sulfate-koh-free",
    "name": "Liberation of hydrazine from sulfate salt using caustic potash",
    "reactants": [
      "h2nnh2-h2so4",
      "koh"
    ],
    "products": [
      "n2h4",
      "k2so4",
      "water"
    ],
    "enthalpy": -48,
    "desc": "Potassium hydroxide neutralization of hydrazine sulfate.",
    "type": "synthesis",
    "effects": [],
    "net": "N2H6SO4 + 2 KOH → N2H4 + K2SO4 + 2 H2O"
  },
  {
    "id": "cat-chloramine-ammonia-direct",
    "name": "Gas-phase synthesis of hydrazine from chloramine and ammonia",
    "reactants": [
      "nh2cl",
      "ammonia"
    ],
    "products": [
      "n2h4",
      "ammonium-chloride"
    ],
    "enthalpy": -165,
    "desc": "Non-aqueous gas-phase Raschig reaction.",
    "type": "synthesis",
    "effects": [],
    "net": "NH2Cl + 2 NH3 → N2H4 + NH4Cl"
  },
  {
    "id": "cat-hydrazine-catalytic-decomp",
    "name": "Satellite monopropellant catalytic decomposition over iridium (Shell 405)",
    "reactants": [
      "n2h4"
    ],
    "products": [
      "n2",
      "ammonia",
      "h2"
    ],
    "enthalpy": -110,
    "desc": "Spacecraft attitude control thruster: rapid adiabatic catalytic decomposition.",
    "type": "synthesis",
    "effects": [],
    "net": "5 N2H4 → 3 N2 + 4 NH3 + 4 H2"
  },
  {
    "id": "cat-ch4-no-reduction",
    "name": "Selective catalytic reduction of nitrogen monoxide by methane",
    "reactants": [
      "ch4",
      "no"
    ],
    "products": [
      "co2",
      "water",
      "n2"
    ],
    "enthalpy": -1160,
    "desc": "Methane-SCR over Co-ZSM-5 zeolite for lean-burn natural gas engines.",
    "type": "synthesis",
    "effects": [],
    "net": "CH4 + 4 NO → CO2 + 2 H2O + 2 N2"
  },
  {
    "id": "cat-scr-no2-reduction",
    "name": "Slow SCR reaction: reduction of pure nitrogen dioxide by ammonia",
    "reactants": [
      "ammonia",
      "no2"
    ],
    "products": [
      "n2",
      "water"
    ],
    "enthalpy": -1370,
    "desc": "DeNOx reduction of NO2 in chemical plant off-gases.",
    "type": "synthesis",
    "effects": [],
    "net": "8 NH3 + 6 NO2 → 7 N2 + 12 H2O"
  },
  {
    "id": "cat-scr-n2o-abatement",
    "name": "Catalytic abatement of nitrous oxide by ammonia",
    "reactants": [
      "ammonia",
      "n2o"
    ],
    "products": [
      "n2",
      "water"
    ],
    "enthalpy": -910,
    "desc": "High-temperature catalytic destruction of greenhouse gas N2O in nitric acid plant exhausts.",
    "type": "synthesis",
    "effects": [],
    "net": "2 NH3 + 3 N2O → 4 N2 + 3 H2O"
  },
  {
    "id": "cat-urea-scr-hydrolysis",
    "name": "Thermal hydrolysis of urea (DEF / AdBlue) generating ammonia for DeNOx",
    "reactants": [
      "urea",
      "water"
    ],
    "products": [
      "ammonia",
      "co2"
    ],
    "enthalpy": 134,
    "desc": "Diesel exhaust fluid vaporization and catalytic thermolysis in mobile SCR systems.",
    "type": "synthesis",
    "effects": [],
    "net": "CH4N2O + H2O → 2 NH3 + CO2"
  },
  {
    "id": "cat-urea-bleach-oxidation",
    "name": "Oxidative destruction of urea by sodium hypochlorite",
    "reactants": [
      "urea",
      "naclo"
    ],
    "products": [
      "n2",
      "nacl",
      "co2",
      "water"
    ],
    "enthalpy": -460,
    "desc": "Wastewater treatment destroying nitrogenous urea with hypochlorite.",
    "type": "synthesis",
    "effects": [],
    "net": "CH4N2O + 3 NaClO → N2 + 3 NaCl + CO2 + 2 H2O"
  },
  {
    "id": "cat-urea-hno3-nitrate",
    "name": "Thermal decomposition of urea nitrate",
    "reactants": [
      "urea",
      "hno3"
    ],
    "products": [
      "co2",
      "n2o",
      "water"
    ],
    "enthalpy": -185,
    "desc": "Acid-catalyzed destruction of urea producing nitrous oxide.",
    "type": "synthesis",
    "effects": [],
    "net": "CH4N2O + 2 HNO3 → CO2 + 2 N2O + 3 H2O"
  },
  {
    "id": "cat-urea-h2o2-peroxide",
    "name": "Peroxide oxidation of urea",
    "reactants": [
      "urea",
      "h2o2"
    ],
    "products": [
      "n2",
      "co2",
      "water"
    ],
    "enthalpy": -510,
    "desc": "Advanced oxidation process for wastewater purification.",
    "type": "synthesis",
    "effects": [],
    "net": "CH4N2O + 3 H2O2 → N2 + CO2 + 5 H2O"
  },
  {
    "id": "cat-ammonia-chlorine-bleaching",
    "name": "Chlor-alkali scrubber reaction: ammonia destruction of chlorine gas",
    "reactants": [
      "ammonia",
      "cl2"
    ],
    "products": [
      "n2",
      "ammonium-chloride"
    ],
    "enthalpy": -460,
    "desc": "Safety emergency scrubbing of chlorine gas leaks with ammonia spray.",
    "type": "synthesis",
    "effects": [],
    "net": "8 NH3 + 3 Cl2 → N2 + 6 NH4Cl"
  },
  {
    "id": "cat-ammonia-iodine-redox",
    "name": "Gas-phase oxidation of ammonia by iodine vapor",
    "reactants": [
      "ammonia",
      "i2"
    ],
    "products": [
      "n2",
      "hi"
    ],
    "enthalpy": -250,
    "desc": "High-temperature redox yielding nitrogen and hydriodic acid.",
    "type": "synthesis",
    "effects": [],
    "net": "2 NH3 + 3 I2 → N2 + 6 HI"
  },
  {
    "id": "cat-no-co-catalytic-reduction",
    "name": "Automotive 3-way catalyst: reduction of NO by carbon monoxide",
    "reactants": [
      "no",
      "co"
    ],
    "products": [
      "n2",
      "co2"
    ],
    "enthalpy": -373,
    "desc": "Key stoichiometric reaction across Pt/Rh washcoat in three-way catalytic converters.",
    "type": "synthesis",
    "effects": [],
    "net": "2 NO + 2 CO → N2 + 2 CO2"
  },
  {
    "id": "cat-no-h2-catalytic-reduction",
    "name": "Automotive catalyst: reduction of nitrogen monoxide by hydrogen",
    "reactants": [
      "no",
      "h2"
    ],
    "products": [
      "n2",
      "water"
    ],
    "enthalpy": -332,
    "desc": "Exhaust gas reduction of NO over platinum group metal catalysts.",
    "type": "synthesis",
    "effects": [],
    "net": "2 NO + 2 H2 → N2 + 2 H2O"
  },
  {
    "id": "cat-no2-h2-catalytic-reduction",
    "name": "Catalytic reduction of nitrogen dioxide by hydrogen",
    "reactants": [
      "no2",
      "h2"
    ],
    "products": [
      "n2",
      "water"
    ],
    "enthalpy": -680,
    "desc": "Catalytic DeNOx reduction using hydrogen.",
    "type": "synthesis",
    "effects": [],
    "net": "2 NO2 + 4 H2 → N2 + 4 H2O"
  },
  {
    "id": "cat-urea-no-denox",
    "name": "Urea SCR: direct reduction of nitrogen monoxide by urea without prior hydrolysis",
    "reactants": [
      "urea",
      "no"
    ],
    "products": [
      "n2",
      "co2",
      "water"
    ],
    "enthalpy": -1480,
    "desc": "Direct thermal DeNOx SCR reaction between vaporized urea and flue gas nitric oxide.",
    "type": "synthesis",
    "effects": [],
    "net": "2 CH4N2O + 6 NO → 5 N2 + 2 CO2 + 4 H2O"
  },
  {
    "id": "cat-ammonia-co-reduction",
    "name": "High-temperature reaction of ammonia with carbon monoxide to hydrogen cyanide",
    "reactants": [
      "ammonia",
      "co"
    ],
    "products": [
      "hcn",
      "water"
    ],
    "enthalpy": 45,
    "desc": "Vapor-phase synthesis of hydrogen cyanide over alumina/platinum catalysts.",
    "type": "synthesis",
    "effects": [],
    "net": "NH3 + CO → HCN + H2O"
  },
  {
    "id": "cat-cl2-naoh-cold-bleach",
    "name": "Cold chlor-alkali reaction: synthesis of sodium hypochlorite bleach",
    "reactants": [
      "cl2",
      "naoh"
    ],
    "products": [
      "naclo",
      "nacl",
      "water"
    ],
    "enthalpy": -102,
    "desc": "Industrial chlor-alkali reaction at <30°C producing commercial household bleach.",
    "type": "synthesis",
    "effects": [],
    "net": "Cl2 + 2 NaOH → NaClO + NaCl + H2O"
  },
  {
    "id": "cat-naclo-catalytic-decomp",
    "name": "Cobalt oxide catalyzed decomposition of sodium hypochlorite",
    "reactants": [
      "naclo"
    ],
    "products": [
      "nacl",
      "o2"
    ],
    "enthalpy": -62,
    "desc": "Catalytic oxygen evolution destroying industrial hypochlorite effluents.",
    "type": "synthesis",
    "effects": [],
    "net": "2 NaClO → 2 NaCl + O2"
  },
  {
    "id": "cat-i2-naoh-iodate",
    "name": "Disproportionation of iodine in hot caustic soda to sodium iodate",
    "reactants": [
      "i2",
      "naoh"
    ],
    "products": [
      "naio3",
      "nai",
      "water"
    ],
    "enthalpy": -180,
    "desc": "Manufacture of food-grade and pharmaceutical iodates.",
    "type": "synthesis",
    "effects": [],
    "net": "3 I2 + 6 NaOH → NaIO3 + 5 NaI + 3 H2O"
  },
  {
    "id": "cat-kbro3-kbr-titration-h2so4",
    "name": "Bromate-bromide analytical generation of active bromine in sulfuric acid",
    "reactants": [
      "kbro3",
      "kbr",
      "h2so4"
    ],
    "products": [
      "br2",
      "k2so4",
      "water"
    ],
    "enthalpy": -195,
    "desc": "In-situ volumetric generation of exact stoichiometric bromine for organic titrations.",
    "type": "synthesis",
    "effects": [],
    "net": "KBrO3 + 5 KBr + 3 H2SO4 → 3 Br2 + 3 K2SO4 + 3 H2O"
  },
  {
    "id": "cat-nabro3-nabr-acid",
    "name": "Sodium bromate and sodium bromide reaction in sulfuric acid",
    "reactants": [
      "nabro3",
      "nabr",
      "h2so4"
    ],
    "products": [
      "br2",
      "na2so4",
      "water"
    ],
    "enthalpy": -190,
    "desc": "Industrial generation of bromine in chemical synthesis.",
    "type": "synthesis",
    "effects": [],
    "net": "NaBrO3 + 5 NaBr + 3 H2SO4 → 3 Br2 + 3 Na2SO4 + 3 H2O"
  },
  {
    "id": "cat-naio3-nai-acid",
    "name": "Sodium iodate and sodium iodide reaction in sulfuric acid",
    "reactants": [
      "naio3",
      "nai",
      "h2so4"
    ],
    "products": [
      "i2",
      "na2so4",
      "water"
    ],
    "enthalpy": -165,
    "desc": "Volumetric generation of iodine using sodium salts.",
    "type": "synthesis",
    "effects": [],
    "net": "NaIO3 + 5 NaI + 3 H2SO4 → 3 I2 + 3 Na2SO4 + 3 H2O"
  },
  {
    "id": "cat-kbro3-kbr-titration-hno3",
    "name": "Bromate-bromide reaction in nitric acid medium",
    "reactants": [
      "kbro3",
      "kbr",
      "hno3"
    ],
    "products": [
      "br2",
      "kno3",
      "water"
    ],
    "enthalpy": -198,
    "desc": "Generation of bromine in nitric acid.",
    "type": "synthesis",
    "effects": [],
    "net": "KBrO3 + 5 KBr + 6 HNO3 → 3 Br2 + 6 KNO3 + 3 H2O"
  },
  {
    "id": "cat-kio3-ki-titration-hno3",
    "name": "Iodate-iodide reaction in nitric acid medium",
    "reactants": [
      "kio3",
      "ki",
      "hno3"
    ],
    "products": [
      "i2",
      "kno3",
      "water"
    ],
    "enthalpy": -172,
    "desc": "Analytical liberation of iodine in nitric acid solution.",
    "type": "synthesis",
    "effects": [],
    "net": "KIO3 + 5 KI + 6 HNO3 → 3 I2 + 6 KNO3 + 3 H2O"
  },
  {
    "id": "cat-nabro3-nabr-hcl",
    "name": "Sodium bromate and sodium bromide reaction in hydrochloric acid",
    "reactants": [
      "nabro3",
      "nabr",
      "hcl"
    ],
    "products": [
      "br2",
      "nacl",
      "water"
    ],
    "enthalpy": -192,
    "desc": "Acid-catalyzed liberation of bromine.",
    "type": "synthesis",
    "effects": [],
    "net": "NaBrO3 + 5 NaBr + 6 HCl → 3 Br2 + 6 NaCl + 3 H2O"
  },
  {
    "id": "cat-naio3-nai-hcl",
    "name": "Sodium iodate and sodium iodide reaction in hydrochloric acid",
    "reactants": [
      "naio3",
      "nai",
      "hcl"
    ],
    "products": [
      "i2",
      "nacl",
      "water"
    ],
    "enthalpy": -168,
    "desc": "Acid-catalyzed liberation of iodine.",
    "type": "synthesis",
    "effects": [],
    "net": "NaIO3 + 5 NaI + 6 HCl → 3 I2 + 6 NaCl + 3 H2O"
  },
  {
    "id": "cat-kio3-nai-hcl",
    "name": "Cross-salt iodate-iodide reaction in hydrochloric acid",
    "reactants": [
      "kio3",
      "nai",
      "hcl"
    ],
    "products": [
      "i2",
      "kcl",
      "nacl",
      "water"
    ],
    "enthalpy": -170,
    "desc": "Quantitative liberation of iodine from mixed alkali halides.",
    "type": "synthesis",
    "effects": [],
    "net": "KIO3 + 5 NaI + 6 HCl → 3 I2 + KCl + 5 NaCl + 3 H2O"
  },
  {
    "id": "cat-kbro3-nabr-hcl",
    "name": "Cross-salt bromate-bromide reaction in hydrochloric acid",
    "reactants": [
      "kbro3",
      "nabr",
      "hcl"
    ],
    "products": [
      "br2",
      "kcl",
      "nacl",
      "water"
    ],
    "enthalpy": -195,
    "desc": "Quantitative generation of bromine from mixed potassium/sodium salts.",
    "type": "synthesis",
    "effects": [],
    "net": "KBrO3 + 5 NaBr + 6 HCl → 3 Br2 + KCl + 5 NaCl + 3 H2O"
  },
  {
    "id": "cat-kio3-nai-h2so4",
    "name": "Cross-salt iodate-iodide reaction in sulfuric acid",
    "reactants": [
      "kio3",
      "nai",
      "h2so4"
    ],
    "products": [
      "i2",
      "k2so4",
      "na2so4",
      "water"
    ],
    "enthalpy": -168,
    "desc": "Analytical standardization of iodate.",
    "type": "synthesis",
    "effects": [],
    "net": "2 KIO3 + 10 NaI + 6 H2SO4 → 6 I2 + K2SO4 + 5 Na2SO4 + 6 H2O"
  },
  {
    "id": "cat-kbro3-nabr-h2so4",
    "name": "Cross-salt bromate-bromide reaction in sulfuric acid",
    "reactants": [
      "kbro3",
      "nabr",
      "h2so4"
    ],
    "products": [
      "br2",
      "k2so4",
      "na2so4",
      "water"
    ],
    "enthalpy": -194,
    "desc": "Analytical bromination reagent preparation.",
    "type": "synthesis",
    "effects": [],
    "net": "2 KBrO3 + 10 NaBr + 6 H2SO4 → 6 Br2 + K2SO4 + 5 Na2SO4 + 6 H2O"
  },
  {
    "id": "cat-benzene-oxychlorination",
    "name": "Raschig-Hooker process Step 1: oxychlorination of benzene to chlorobenzene",
    "reactants": [
      "c6h6",
      "hcl",
      "o2"
    ],
    "products": [
      "chlorobenzene",
      "water"
    ],
    "enthalpy": -210,
    "desc": "Vapor-phase oxychlorination of benzene over CuCl2-FeCl3 catalyst at 240°C.",
    "type": "synthesis",
    "effects": [],
    "net": "2 C6H6 + 2 HCl + O2 → 2 C6H5Cl + 2 H2O"
  },
  {
    "id": "cat-chlorobenzene-hydrolysis",
    "name": "Raschig-Hooker process Step 2: steam catalytic hydrolysis of chlorobenzene to phenol",
    "reactants": [
      "chlorobenzene",
      "water"
    ],
    "products": [
      "phenol",
      "hcl"
    ],
    "enthalpy": 15,
    "desc": "Vapor-phase catalytic hydrolysis over silica/copper phosphate catalyst at 450°C.",
    "type": "synthesis",
    "effects": [],
    "net": "C6H5Cl + H2O → C6H6O + HCl"
  },
  {
    "id": "cat-cucl-naoh-precipitation",
    "name": "Precipitation of copper(I) oxide from cuprous chloride and sodium hydroxide",
    "reactants": [
      "cucl",
      "naoh"
    ],
    "products": [
      "cu2o",
      "nacl",
      "water"
    ],
    "enthalpy": -62,
    "desc": "Alkaline precipitation producing red cuprous oxide and sodium chloride.",
    "type": "synthesis",
    "effects": [],
    "net": "2 CuCl + 2 NaOH → Cu2O + 2 NaCl + H2O"
  },
  {
    "id": "cat-deacon-cucl-air-direct",
    "name": "Aerial oxidation of copper(I) chloride in Deacon oxychlorination loop",
    "reactants": [
      "cucl",
      "o2"
    ],
    "products": [
      "cucl2",
      "cuo"
    ],
    "enthalpy": -120,
    "desc": "Regeneration of active copper(II) center in Deacon cycle.",
    "type": "synthesis",
    "effects": [],
    "net": "4 CuCl + O2 → 2 CuCl2 + 2 CuO"
  },
  {
    "id": "cat-deacon-hbr-oxidation",
    "name": "Catalytic oxidation of hydrogen bromide to elemental bromine",
    "reactants": [
      "hbr",
      "o2"
    ],
    "products": [
      "br2",
      "water"
    ],
    "enthalpy": -135,
    "desc": "Bromine recovery from bromination process waste streams.",
    "type": "synthesis",
    "effects": [],
    "net": "4 HBr + O2 → 2 Br2 + 2 H2O"
  },
  {
    "id": "cat-deacon-cucl-aqueous-air",
    "name": "Aqueous aerial oxidation of cuprous chloride",
    "reactants": [
      "cucl",
      "o2",
      "water"
    ],
    "products": [
      "cucl2",
      "cuoh2"
    ],
    "enthalpy": -145,
    "desc": "Aerial oxidation of copper(I) chloride in chloride leaching circuits.",
    "type": "synthesis",
    "effects": [],
    "net": "4 CuCl + O2 + 2 H2O → 2 CuCl2 + 2 Cu(OH)2"
  },
  {
    "id": "cat-no2-co-catalytic-reduction",
    "name": "Automotive catalyst: reduction of nitrogen dioxide by carbon monoxide",
    "reactants": [
      "no2",
      "co"
    ],
    "products": [
      "n2",
      "co2"
    ],
    "enthalpy": -750,
    "desc": "Catalytic reduction across noble metal washcoat.",
    "type": "synthesis",
    "effects": [],
    "net": "2 NO2 + 4 CO → N2 + 4 CO2"
  },
  {
    "id": "cat-n2o-co-catalytic-reduction",
    "name": "Catalytic reduction of nitrous oxide by carbon monoxide",
    "reactants": [
      "n2o",
      "co"
    ],
    "products": [
      "n2",
      "co2"
    ],
    "enthalpy": -360,
    "desc": "Exothermic DeNOx reaction over supported metal catalysts.",
    "type": "synthesis",
    "effects": [],
    "net": "N2O + CO → N2 + CO2"
  },
  {
    "id": "cat-cucl2-h2-reduction",
    "name": "Hydrogen reduction of copper(II) chloride",
    "reactants": [
      "cucl2",
      "h2"
    ],
    "products": [
      "cu",
      "hcl"
    ],
    "enthalpy": -85,
    "desc": "Vapor-phase reduction depositing copper coating.",
    "type": "synthesis",
    "effects": [],
    "net": "CuCl2 + H2 → Cu + 2 HCl"
  },
  {
    "id": "cat-cucl-h2-reduction",
    "name": "Hydrogen reduction of copper(I) chloride to pure copper",
    "reactants": [
      "cucl",
      "h2"
    ],
    "products": [
      "cu",
      "hcl"
    ],
    "enthalpy": -65,
    "desc": "Gas-phase chemical reduction.",
    "type": "synthesis",
    "effects": [],
    "net": "2 CuCl + H2 → 2 Cu + 2 HCl"
  },
  {
    "id": "cat-cu2o-co-reduction",
    "name": "Carbon monoxide reduction of copper(I) oxide",
    "reactants": [
      "cu2o",
      "co"
    ],
    "products": [
      "cu",
      "co2"
    ],
    "enthalpy": -110,
    "desc": "Exothermic reduction of cuprous oxide to metallic copper by carbon monoxide.",
    "type": "synthesis",
    "effects": [],
    "net": "Cu2O + CO → 2 Cu + CO2"
  },
  {
    "id": "cat-cu2o-h2-reduction",
    "name": "Hydrogen reduction of copper(I) oxide",
    "reactants": [
      "cu2o",
      "h2"
    ],
    "products": [
      "cu",
      "water"
    ],
    "enthalpy": -115,
    "desc": "Gas-phase reduction of cuprite.",
    "type": "synthesis",
    "effects": [],
    "net": "Cu2O + H2 → 2 Cu + H2O"
  },
  {
    "id": "cat-coo-co-reduction",
    "name": "Carbon monoxide reduction of cobalt(II) oxide to metallic cobalt catalyst",
    "reactants": [
      "coo",
      "co"
    ],
    "products": [
      "cobalt-metal",
      "co2"
    ],
    "enthalpy": -90,
    "desc": "Gas-phase reduction activating cobalt Fischer-Tropsch catalyst precursor.",
    "type": "synthesis",
    "effects": [],
    "net": "CoO + CO → Co + CO2"
  },
  {
    "id": "cat-coo-h2-activation",
    "name": "Hydrogen reduction of cobalt(II) oxide to Fischer-Tropsch cobalt catalyst",
    "reactants": [
      "coo",
      "h2"
    ],
    "products": [
      "cobalt-metal",
      "water"
    ],
    "enthalpy": -115,
    "desc": "Activation of cobalt Fischer-Tropsch catalysts under hydrogen flow.",
    "type": "synthesis",
    "effects": [],
    "net": "CoO + H2 → Co + H2O"
  },
  {
    "id": "cat-pcl3-oxygen-oxychloride",
    "name": "Direct gas-phase oxidation of phosphorus trichloride to phosphoryl chloride",
    "reactants": [
      "pcl3",
      "o2"
    ],
    "products": [
      "pocl3"
    ],
    "enthalpy": -285,
    "desc": "Industrial synthesis of POCl3 flame retardant and plasticizer precursor.",
    "type": "synthesis",
    "effects": [],
    "net": "2 PCl3 + O2 → 2 POCl3"
  },
  {
    "id": "cat-pocl3-naoh-neutralize",
    "name": "Caustic soda neutralization of phosphoryl chloride",
    "reactants": [
      "pocl3",
      "naoh"
    ],
    "products": [
      "na3po4",
      "nacl",
      "water"
    ],
    "enthalpy": -540,
    "desc": "Scrubber absorption of POCl3 in caustic soda.",
    "type": "synthesis",
    "effects": [],
    "net": "POCl3 + 6 NaOH → Na3PO4 + 3 NaCl + 3 H2O"
  },
  {
    "id": "cat-pocl3-koh-neutralize",
    "name": "Caustic potash neutralization of phosphorus oxychloride",
    "reactants": [
      "pocl3",
      "koh"
    ],
    "products": [
      "k3po4",
      "kcl",
      "water"
    ],
    "enthalpy": -550,
    "desc": "Neutralization yielding potassium phosphate.",
    "type": "synthesis",
    "effects": [],
    "net": "POCl3 + 6 KOH → K3PO4 + 3 KCl + 3 H2O"
  },
  {
    "id": "cat-pcl5-naoh-neutralize",
    "name": "Alkaline destruction of phosphorus pentachloride by caustic soda",
    "reactants": [
      "pcl5",
      "naoh"
    ],
    "products": [
      "na3po4",
      "nacl",
      "water"
    ],
    "enthalpy": -680,
    "desc": "Vigorous scrubber neutralization of PCl5 fumes.",
    "type": "synthesis",
    "effects": [],
    "net": "PCl5 + 8 NaOH → Na3PO4 + 5 NaCl + 4 H2O"
  },
  {
    "id": "cat-pcl5-koh-neutralize",
    "name": "Caustic potash destruction of phosphorus pentachloride",
    "reactants": [
      "pcl5",
      "koh"
    ],
    "products": [
      "k3po4",
      "kcl",
      "water"
    ],
    "enthalpy": -690,
    "desc": "Alkaline neutralization of PCl5.",
    "type": "synthesis",
    "effects": [],
    "net": "PCl5 + 8 KOH → K3PO4 + 5 KCl + 4 H2O"
  },
  {
    "id": "cat-p4-p4o10-combustion",
    "name": "Thermal combustion of white phosphorus to phosphorus pentoxide",
    "reactants": [
      "p4",
      "o2"
    ],
    "products": [
      "p4o10"
    ],
    "enthalpy": -2980,
    "desc": "Thermal phosphoric acid process: complete combustion of elemental phosphorus.",
    "type": "synthesis",
    "effects": [],
    "net": "P4 + 5 O2 → P4O10"
  },
  {
    "id": "cat-p4o10-naoh-neutralize",
    "name": "Caustic soda neutralization of phosphorus pentoxide vapor",
    "reactants": [
      "p4o10",
      "naoh"
    ],
    "products": [
      "na3po4",
      "water"
    ],
    "enthalpy": -850,
    "desc": "Exothermic scrubbing forming sodium phosphate.",
    "type": "synthesis",
    "effects": [],
    "net": "P4O10 + 12 NaOH → 4 Na3PO4 + 6 H2O"
  },
  {
    "id": "cat-p4o10-koh-neutralize",
    "name": "Caustic potash neutralization of phosphorus pentoxide",
    "reactants": [
      "p4o10",
      "koh"
    ],
    "products": [
      "k3po4",
      "water"
    ],
    "enthalpy": -860,
    "desc": "Formation of tripotassium phosphate.",
    "type": "synthesis",
    "effects": [],
    "net": "P4O10 + 12 KOH → 4 K3PO4 + 6 H2O"
  },
  {
    "id": "cat-p4o10-quicklime-calcination",
    "name": "Thermal calcination of phosphorus pentoxide with quicklime",
    "reactants": [
      "p4o10",
      "cao"
    ],
    "products": [
      "ca3po42"
    ],
    "enthalpy": -1150,
    "desc": "Direct dry synthesis of tricalcium phosphate ceramic precursor.",
    "type": "synthesis",
    "effects": [],
    "net": "P4O10 + 6 CaO → 2 Ca3(PO4)2"
  },
  {
    "id": "cat-p4o10-limestone-sinter",
    "name": "Thermal reaction of phosphorus pentoxide with calcium carbonate",
    "reactants": [
      "p4o10",
      "caco3"
    ],
    "products": [
      "ca3po42",
      "co2"
    ],
    "enthalpy": -680,
    "desc": "Thermal synthesis of calcium phosphate fertilizer matrix.",
    "type": "synthesis",
    "effects": [],
    "net": "P4O10 + 6 CaCO3 → 2 Ca3(PO4)2 + 6 CO2"
  },
  {
    "id": "cat-p4o10-soda-ash-sinter",
    "name": "Solid-state reaction of phosphorus pentoxide with soda ash",
    "reactants": [
      "p4o10",
      "na2co3"
    ],
    "products": [
      "na3po4",
      "co2"
    ],
    "enthalpy": -540,
    "desc": "Dry thermal synthesis of sodium phosphate detergent builder.",
    "type": "synthesis",
    "effects": [],
    "net": "P4O10 + 6 Na2CO3 → 4 Na3PO4 + 6 CO2"
  },
  {
    "id": "cat-p4o10-potash-sinter",
    "name": "Solid-state reaction of phosphorus pentoxide with potassium carbonate",
    "reactants": [
      "p4o10",
      "k2co3"
    ],
    "products": [
      "k3po4",
      "co2"
    ],
    "enthalpy": -550,
    "desc": "Thermal synthesis of potassium phosphate specialty fertilizer.",
    "type": "synthesis",
    "effects": [],
    "net": "P4O10 + 6 K2CO3 → 4 K3PO4 + 6 CO2"
  },
  {
    "id": "cat-p4o10-magnesia-sinter",
    "name": "Thermal reaction of phosphorus pentoxide with magnesium oxide",
    "reactants": [
      "p4o10",
      "mgo"
    ],
    "products": [
      "mg3-po4-2"
    ],
    "enthalpy": -1080,
    "desc": "Synthesis of refractory magnesium phosphate matrix.",
    "type": "synthesis",
    "effects": [],
    "net": "P4O10 + 6 MgO → 2 Mg3(PO4)2"
  },
  {
    "id": "cat-p4o10-baryta-sinter",
    "name": "Thermal reaction of phosphorus pentoxide with barium oxide",
    "reactants": [
      "p4o10",
      "bao"
    ],
    "products": [
      "ba3po42"
    ],
    "enthalpy": -1120,
    "desc": "Synthesis of barium phosphate optical glass constituent.",
    "type": "synthesis",
    "effects": [],
    "net": "P4O10 + 6 BaO → 2 Ba3(PO4)2"
  }
];

  for (const r of reactions) {
    addReaction({
      id: r.id,
      name: r.name,
      reactionType: (r.type || "synthesis") as any,
      reactants: r.reactants,
      products: r.products,
      netIonicEquation: r.net,
      enthalpyKjPerMol: r.enthalpy,
      observableEffects: r.effects || [],
      safetyNotes: r.desc,
    });
  }
}
