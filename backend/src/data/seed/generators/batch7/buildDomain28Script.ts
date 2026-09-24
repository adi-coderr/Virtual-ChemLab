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
  type: string = "redox_other",
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
// Section 1: Uranium Ore Leaching & Oxidative Dissolution (15)
// =========================================================================
add("nuc-u3o8-nitric-leach", "Pitchblende dissolution: nitric acid leaching of triuranium octoxide into uranyl nitrate",
  ["u3o8", "hno3"], ["uo2-no3-2", "no2", "water"], -320.0,
  "Oxidative acid digestion of milled uranium ore concentrate in PUREX feed preparation.");

add("nuc-uo3-sulfuric-dissolution", "Sulfuric acid dissolution of uranium trioxide into uranyl sulfate",
  ["uo3", "h2so4"], ["uo2so4", "water"], -125.0,
  "Acid leaching forming uranyl sulfate solution for ion-exchange recovery.", "acid_base_neutralization");

add("nuc-uo3-hcl-dissolution", "Hydrochloric acid dissolution of uranium trioxide",
  ["uo3", "hcl"], ["uo2cl2", "water"], -110.0,
  "Synthesis of aqueous uranyl chloride solution.", "acid_base_neutralization");

add("nuc-uo2-nitric-leach", "Oxidative dissolution of uranium dioxide fuel pellets by nitric acid",
  ["uo2", "hno3"], ["uo2-no3-2", "no2", "water"], -210.0,
  "Spent fuel head-end shear-leach dissolution releasing nitrogen dioxide fumes.");

add("nuc-uo2-sulfuric-leach-o2", "In-situ recovery: pressurized oxygen and sulfuric acid leaching of uranium dioxide",
  ["uo2", "h2so4", "o2"], ["uo2so4", "water"], -420.0,
  "Aerated sulfuric acid leaching of subsurface uranium sandstone deposits.");

add("nuc-uo2-sulfuric-mno2-leach", "Pyrolusite-assisted sulfuric acid leaching of uranium dioxide",
  ["uo2", "mno2", "h2so4"], ["uo2so4", "mnso4", "water"], -340.0,
  "Manganese dioxide oxidant driving oxidation of insoluble U(IV) to soluble uranyl U(VI).");

add("nuc-uo2co3-nitric-leach", "Nitric acid dissolution of rutherfordine uranyl carbonate",
  ["uo2co3", "hno3"], ["uo2-no3-2", "co2", "water"], -85.0,
  "Acid digestion liberating carbon dioxide gas.", "gas_evolution");

add("nuc-uo2co3-sulfuric-leach", "Sulfuric acid dissolution of uranyl carbonate",
  ["uo2co3", "h2so4"], ["uo2so4", "co2", "water"], -90.0,
  "Acid metathesis generating soluble uranyl sulfate.", "gas_evolution");

add("nuc-uo2co3-hcl-leach", "Hydrochloric acid dissolution of uranyl carbonate mineral",
  ["uo2co3", "hcl"], ["uo2cl2", "co2", "water"], -82.0,
  "Conversion of carbonate mineral to uranyl chloride.", "gas_evolution");

add("nuc-uo2-co2-supercritical-leach", "Supercritical fluid model: oxidation of UO2 by oxygen in nitric acid",
  ["uo2", "hno3", "o2"], ["uo2-no3-2", "water"], -395.0,
  "Catalytic oxygen-assisted dissolution reducing NOx emission volumes.");

add("nuc-uo2-h2o2-sulfuric-leach", "Hydrogen peroxide promoted sulfuric acid leaching of uranium dioxide",
  ["uo2", "h2so4", "h2o2"], ["uo2so4", "water"], -385.0,
  "Green leaching process replacing chlorate or pyrolusite oxidants.");

add("nuc-uo2-h2o2-hcl-leach", "Peroxide-assisted hydrochloric acid leaching of UO2",
  ["uo2", "hcl", "h2o2"], ["uo2cl2", "water"], -365.0,
  "Hydrochloric oxidative leaching producing pure uranyl chloride.");

add("nuc-u3o8-hcl-o2-leach", "Hydrochloric acid leaching of triuranium octoxide with oxygen sparging",
  ["u3o8", "hcl", "o2"], ["uo2cl2", "water"], -490.0,
  "Oxidative hydrochloric leaching generating concentrated uranyl chloride feed.");

add("nuc-u-nitric-dissolution", "Direct nitric acid dissolution of metallic uranium",
  ["u", "hno3"], ["uo2-no3-2", "no2", "water"], -1020.0,
  "Reprocessing dissolution of metallic uranium reactor fuel elements.");

add("nuc-u-sulfuric-dissolution", "Oxidative dissolution of uranium metal in hot concentrated sulfuric acid",
  ["u", "h2so4"], ["uo2so4", "so2", "water"], -890.0,
  "Hot sulfuric acid dissolution releasing sulfur dioxide fumes.");

// =========================================================================
// Section 2: Uranium Yellowcake & Uranyl Precipitation (15)
// =========================================================================
add("nuc-yellowcake-naoh-precipitation", "Caustic soda precipitation of sodium diuranate yellowcake",
  ["uo2-no3-2", "naoh"], ["na2u2o7", "nano3", "water"], -165.0,
  "Alkaline precipitation isolating yellowcake from PUREX strip aqueous solutions.", "precipitation",
  [{ type: "precipitation", colorTo: "#E59866", description: "Orange-yellow sodium diuranate precipitates" }]);

add("nuc-yellowcake-koh-precipitation", "Potassium hydroxide precipitation of potassium diuranate",
  ["uo2-no3-2", "koh"], ["k2u2o7", "kno3", "water"], -170.0,
  "Alkaline precipitation producing potassium diuranate.", "precipitation",
  [{ type: "precipitation", colorTo: "#EB984E", description: "Bright orange potassium diuranate precipitates" }]);

add("nuc-yellowcake-ammonia-precipitation", "Ammonium diuranate precipitation: industrial ADU yellowcake synthesis",
  ["uo2-no3-2", "ammonia", "water"], ["nh4-2-u2o7", "nh4no3"], -185.0,
  "Gaseous ammonia neutralizes uranyl nitrate forming yellow ammonium diuranate cake.", "precipitation",
  [{ type: "precipitation", colorTo: "#F5B041", description: "Vibrant yellow ammonium diuranate precipitates" }]);

add("nuc-yellowcake-sulfate-ammonia-precip", "Ammonia precipitation of ADU from uranyl sulfate leach liquor",
  ["uo2so4", "ammonia", "water"], ["nh4-2-u2o7", "nh4-2-so4"], -195.0,
  "Direct yellowcake precipitation from sulfuric acid heap leach eluate.", "precipitation",
  [{ type: "precipitation", colorTo: "#F5B041", description: "Yellow ADU precipitates" }]);

add("nuc-yellowcake-sulfate-naoh-precip", "Caustic soda precipitation of sodium diuranate from uranyl sulfate",
  ["uo2so4", "naoh"], ["na2u2o7", "na2so4", "water"], -175.0,
  "Neutralization of acid sulfate solution recovering sodium diuranate.", "precipitation",
  [{ type: "precipitation", colorTo: "#E59866", description: "Yellow-orange diuranate precipitates" }]);

add("nuc-yellowcake-sulfate-koh-precip", "Potassium hydroxide precipitation of diuranate from uranyl sulfate",
  ["uo2so4", "koh"], ["k2u2o7", "k2so4", "water"], -178.0,
  "Caustic potash precipitation of potassium diuranate yellowcake.", "precipitation",
  [{ type: "precipitation", colorTo: "#EB984E", description: "Potassium diuranate precipitates" }]);

add("nuc-yellowcake-chloride-naoh-precip", "Precipitation of sodium diuranate from uranyl chloride",
  ["uo2cl2", "naoh"], ["na2u2o7", "nacl", "water"], -168.0,
  "Caustic precipitation isolating uranium from chloride solution.", "precipitation");

add("nuc-yellowcake-chloride-koh-precip", "Precipitation of potassium diuranate from uranyl chloride",
  ["uo2cl2", "koh"], ["k2u2o7", "kcl", "water"], -172.0,
  "Potash precipitation recovering uranium from chloride refining streams.", "precipitation");

add("nuc-yellowcake-chloride-ammonia-precip", "Ammonia precipitation of ADU from uranyl chloride",
  ["uo2cl2", "ammonia", "water"], ["nh4-2-u2o7", "ammonium-chloride"], -182.0,
  "Ammoniacal precipitation of yellowcake.", "precipitation");

add("nuc-uranyl-peroxide-nitrate-precip", "Uranyl peroxide precipitation from uranyl nitrate (studtite process)",
  ["uo2-no3-2", "h2o2"], ["uo4", "hno3"], -85.0,
  "Selective precipitation of pale yellow uranyl peroxide yielding nuclear-purity product.", "precipitation",
  [{ type: "precipitation", colorTo: "#FFF9C4", description: "Pale yellow uranyl peroxide precipitates" }]);

add("nuc-uranyl-peroxide-sulfate-precip", "Hydrogen peroxide precipitation of uranyl peroxide from uranyl sulfate",
  ["uo2so4", "h2o2"], ["uo4", "h2so4"], -88.0,
  "Selective recovery of uranium from acid leach liquors free of sulfate impurities.", "precipitation",
  [{ type: "precipitation", colorTo: "#FFF9C4", description: "Fine yellow UO4 crystals precipitate" }]);

add("nuc-uranyl-peroxide-chloride-precip", "Precipitation of uranyl peroxide from uranyl chloride by H2O2",
  ["uo2cl2", "h2o2"], ["uo4", "hcl"], -82.0,
  "Selective peroxide precipitation separating uranium from chloride matrix.", "precipitation");

add("nuc-uranyl-carbonate-na2co3-precip", "Precipitation of uranyl carbonate by sodium carbonate",
  ["uo2-no3-2", "na2co3"], ["uo2co3", "nano3"], -52.0,
  "Controlled precipitation of basic uranyl carbonate.", "precipitation");

add("nuc-uranyl-carbonate-k2co3-precip", "Potassium carbonate precipitation of uranyl carbonate",
  ["uo2-no3-2", "k2co3"], ["uo2co3", "kno3"], -54.0,
  "Stoichiometric carbonate precipitation.", "precipitation");

add("nuc-uranyl-sulfate-barium-nitrate-metathesis", "Precipitation separation: barium nitrate removal of sulfate from uranyl sulfate",
  ["uo2so4", "ba-no3-2"], ["baso4", "uo2-no3-2"], -42.0,
  "Quantitative sulfate removal precipitating insoluble BaSO4.", "precipitation");

// =========================================================================
// Section 3: Thermal Decomposition, Calcination & Reduction (15)
// =========================================================================
add("nuc-adu-calcination-uo3", "ADU thermal calcination: decomposition of ammonium diuranate to uranium trioxide",
  ["nh4-2-u2o7"], ["uo3", "ammonia", "water"], 145.0,
  "Rotary kiln thermal decomposition of yellowcake at 400°C generating reactive UO3.", "decomposition");

add("nuc-adu-calcination-u3o8", "High-temperature air calcination of ammonium diuranate to U3O8",
  ["nh4-2-u2o7", "o2"], ["u3o8", "n2", "water"], -850.0,
  "Industrial calcination at 750°C converting yellowcake to stable triuranium octoxide.");

add("nuc-adu-reduction-uo2-h2", "Direct hydrogen reduction of ammonium diuranate into ceramic UO2",
  ["nh4-2-u2o7", "h2"], ["uo2", "ammonia", "water"], -95.0,
  "Fluidized-bed reductive calcination directly yielding reactor-grade uranium dioxide.");

add("nuc-uranyl-peroxide-calcination", "Thermal decomposition of uranyl peroxide to uranium trioxide",
  ["uo4"], ["uo3", "o2"], 68.0,
  "Gentle heating at 350°C converting UO4 to microcrystalline orange UO3.", "decomposition");

add("nuc-uo4-reduction-h2", "Direct hydrogen reduction of uranyl peroxide to uranium dioxide",
  ["uo4", "h2"], ["uo2", "water"], -320.0,
  "One-step reductive calcination of studtite to ceramic nuclear fuel.");

add("nuc-uo4-reduction-co", "Carbon monoxide reduction of uranyl peroxide",
  ["uo4", "co"], ["uo2", "co2"], -450.0,
  "Reductive gas treatment of uranyl peroxide.");

add("nuc-uranyl-carbonate-calcination-uo3", "Thermal decomposition of uranyl carbonate to UO3",
  ["uo2co3"], ["uo3", "co2"], 92.0,
  "Decarboxylation at 400°C yielding uranium trioxide powder.", "decomposition");

add("nuc-uranyl-carbonate-hydrogen-reduction", "Reductive calcination of uranyl carbonate to UO2 under hydrogen",
  ["uo2co3", "h2"], ["uo2", "co2", "water"], -42.0,
  "Single-step reduction of uranyl carbonate to uranium dioxide.");

add("nuc-uo3-co-reduction", "Carbon monoxide reduction of uranium trioxide",
  ["uo3", "co"], ["uo2", "co2"], -150.0,
  "Gas-phase reduction of UO3 to uranium dioxide.");

add("nuc-uo3-methane-reduction", "Methane reduction of uranium trioxide to uranium dioxide",
  ["uo3", "ch4"], ["uo2", "co2", "water"], -130.0,
  "Natural gas reduction of UO3 in a fluidized calciner.");

add("nuc-u3o8-co-reduction", "Carbon monoxide reduction of U3O8 to UO2",
  ["u3o8", "co"], ["uo2", "co2"], -195.0,
  "Carbon monoxide reduction converting U3O8 to stoichiometric UO2.");

add("nuc-u3o8-methane-reduction", "Methane reduction of triuranium octoxide to uranium dioxide",
  ["u3o8", "ch4"], ["uo2", "co2", "water"], -165.0,
  "Synthesis gas / hydrocarbon reduction of pitchblende calcine.");

add("nuc-u-oxalate-calcination-uo2", "Thermal decomposition of uranium(IV) oxalate into ceramic UO2",
  ["u-c2o4-2"], ["uo2", "co", "co2"], 210.0,
  "Inert atmosphere calcination generating ultra-fine nuclear fuel ceramic powder.", "decomposition");

add("nuc-u-oxalate-air-calcination", "Oxidative air calcination of uranium(IV) oxalate to U3O8",
  ["u-c2o4-2", "o2"], ["u3o8", "co2"], -980.0,
  "Complete air combustion of uranium oxalate powder.");

add("nuc-u-steam-corrosion-uo2", "Severe accident: high-temperature oxidation of uranium metal by steam",
  ["u", "water"], ["uo2", "h2"], -460.0,
  "Loss-of-coolant reaction in metallic-fueled reactors generating hydrogen gas.");

// =========================================================================
// Section 4: Fluorination, Ames Process & Volatility Cycle (15)
// =========================================================================
add("nuc-hydrofluorination-uo3", "Hydrofluorination of uranium trioxide by anhydrous hydrogen fluoride",
  ["uo3", "hf"], ["uf4", "o2", "water"], -240.0,
  "High-temperature conversion of UO3 to green salt.");

add("nuc-direct-fluorination-u-metal", "Direct fluorination of metallic uranium to uranium hexafluoride",
  ["u", "f2"], ["uf6"], -2150.0,
  "Vigorous exothermic fluorination producing volatile UF6.");

add("nuc-direct-fluorination-uo2-f2", "Direct fluorine gas conversion of uranium dioxide to UF6",
  ["uo2", "f2"], ["uf6", "o2"], -1050.0,
  "Fluoride volatility processing of spent oxide fuels without liquid aqueous solvents.");

add("nuc-direct-fluorination-u3o8-f2", "Fluorination of triuranium octoxide by elemental fluorine",
  ["u3o8", "f2"], ["uf6", "o2"], -3120.0,
  "Fluoride volatility extraction of uranium from bulk calcined ore.");

add("nuc-uf6-hydrogen-reduction-uf4", "Hydrogen reduction of depleted uranium hexafluoride to UF4",
  ["uf6", "h2"], ["uf4", "hf"], -285.0,
  "Deconversion of depleted UF6 tails to stable green salt UF4 and anhydrous HF.");

add("nuc-uf4-sodium-reduction", "Sodiothermic reduction of uranium tetrafluoride to uranium metal",
  ["uf4", "na"], ["u", "naf"], -680.0,
  "Molten alkali metal reduction synthesizing metallic uranium.");

add("nuc-uf4-potassium-reduction", "Potassiothermic reduction of uranium tetrafluoride",
  ["uf4", "k"], ["u", "kf"], -710.0,
  "Alkali metal vapor reduction to uranium powder.");

add("nuc-uf4-aluminum-reduction", "Aluminothermic reduction of uranium tetrafluoride",
  ["uf4", "al"], ["u", "alf3"], -290.0,
  "Pyrometallurgical reduction forming metallic uranium and aluminum fluoride.");

add("nuc-uf4-steam-pyrohydrolysis", "Pyrohydrolysis: high-temperature steam conversion of UF4 to U3O8",
  ["uf4", "water", "o2"], ["u3o8", "hf"], 45.0,
  "Quantitative pyrohydrolysis for fluoride waste treatment and analysis.");

add("nuc-u-hf-gas-hydrofluorination", "Hydrofluorination of metallic uranium by anhydrous HF",
  ["u", "hf"], ["uf4", "h2"], -620.0,
  "Direct reaction producing green salt and hydrogen gas.");

add("nuc-uo2co3-hf-hydrofluorination", "Hydrofluorination of uranyl carbonate to UF4",
  ["uo2co3", "hf"], ["uf4", "co2", "o2", "water"], -110.0,
  "Fluorination accompanied by carbon dioxide evolution.");

add("nuc-uf6-peroxide-conversion", "Uranyl peroxide synthesis from uranium hexafluoride and hydrogen peroxide",
  ["uf6", "h2o2", "water"], ["uo4", "hf"], -260.0,
  "Direct conversion of gaseous UF6 to insoluble uranyl peroxide.", "precipitation");

add("nuc-uo2f2-hydrogen-reduction-uo2", "Hydrogen pyro-reduction of uranyl fluoride to ceramic UO2",
  ["uo2f2", "h2"], ["uo2", "hf"], 15.0,
  "Thermal reduction converting enriched UO2F2 to reactor fuel.");

add("nuc-uo2f2-pyrohydrolysis-u3o8", "Pyrohydrolysis of uranyl fluoride yielding triuranium octoxide",
  ["uo2f2", "water"], ["u3o8", "hf", "o2"], 115.0,
  "High-temperature steam defluorination yielding stable oxide.");

add("nuc-uo2f2-ammonia-yellowcake", "Ammoniacal precipitation of ADU from uranyl fluoride solution",
  ["uo2f2", "ammonia", "water"], ["nh4-2-u2o7", "nh4f"], -170.0,
  "Precipitation of yellowcake from hydrolyzed enriched uranium fractions.", "precipitation",
  [{ type: "precipitation", colorTo: "#F5B041", description: "Yellow ADU precipitates" }]);

// =========================================================================
// Section 5: Thorium Extraction, Leaching & Ore Processing (15)
// =========================================================================
add("nuc-tho2-nitric-leach-thorex", "THOREX process: fluoride-catalyzed nitric acid dissolution of thoria",
  ["tho2", "hno3"], ["th-no3-4", "water"], -150.0,
  "Dissolution of refractory thorium dioxide fuel pellets using nitric acid with trace fluoride catalyst.");

add("nuc-tho2-sulfuric-leach", "Sulfuric acid digestion of monazite-derived thorium dioxide",
  ["tho2", "h2so4"], ["th-so4-2", "water"], -185.0,
  "Digestion of thorium oxide forming soluble thorium sulfate.");

add("nuc-tho2-hcl-dissolution", "Hydrochloric acid dissolution of reactive thorium oxide",
  ["tho2", "hcl"], ["thcl4", "water"], -135.0,
  "Synthesis of aqueous thorium(IV) chloride solution.");

add("nuc-tho2-hf-conversion", "Hydrofluorination of thoria into thorium tetrafluoride",
  ["tho2", "hf"], ["thf4", "water"], -210.0,
  "High-temperature fluorination producing ThF4 for molten salt breeder reactors (LFTR).");

add("nuc-th-nitric-dissolution", "Nitric acid dissolution of metallic thorium",
  ["th", "hno3"], ["th-no3-4", "no2", "water"], -1180.0,
  "Reprocessing dissolution of thorium metal blanket elements.");

add("nuc-th-hcl-dissolution", "Hydrochloric acid attack on thorium metal",
  ["th", "hcl"], ["thcl4", "h2"], -760.0,
  "Dissolution of metallic thorium generating ThCl4 and hydrogen gas.");

add("nuc-th-h2so4-dissolution", "Sulfuric acid dissolution of metallic thorium",
  ["th", "h2so4"], ["th-so4-2", "h2"], -810.0,
  "Dissolution of thorium metal generating thorium sulfate.");

add("nuc-th-air-combustion-tho2", "Elemental combustion of thorium metal to thorium dioxide",
  ["th", "o2"], ["tho2"], -1226.0,
  "Energetic oxidation yielding the highest melting oxide known (ThO2, 3390°C).", "synthesis");

add("nuc-th-cl2-chlorination", "Direct chlorination of metallic thorium to ThCl4",
  ["th", "cl2"], ["thcl4"], -1185.0,
  "Anhydrous vapor chlorination at 600°C generating sublimed ThCl4.", "synthesis");

add("nuc-th-f2-fluorination", "Direct fluorination of thorium metal to ThF4",
  ["th", "f2"], ["thf4"], -2095.0,
  "Direct elemental synthesis of thorium tetrafluoride.", "synthesis");

add("nuc-th-nitrate-naoh-precipitation", "Caustic soda precipitation of thorium hydroxide from nitrate",
  ["th-no3-4", "naoh"], ["tho2", "nano3", "water"], -190.0,
  "Alkaline precipitation isolating hydrated thoria.", "precipitation",
  [{ type: "precipitation", colorTo: "#FDFEFE", description: "Dense white gelatinous thorium hydroxide precipitates" }]);

add("nuc-th-nitrate-koh-precipitation", "Potassium hydroxide precipitation of thorium hydroxide",
  ["th-no3-4", "koh"], ["tho2", "kno3", "water"], -195.0,
  "Precipitation of thorium hydrous oxide by KOH.", "precipitation",
  [{ type: "precipitation", colorTo: "#FDFEFE", description: "White precipitate of hydrated ThO2 forms" }]);

add("nuc-th-nitrate-ammonia-precipitation", "Ammonia precipitation of thorium hydroxide from nitrate solution",
  ["th-no3-4", "ammonia", "water"], ["tho2", "nh4no3"], -180.0,
  "Separation of thorium from rare earths via selective ammonia precipitation.", "precipitation",
  [{ type: "precipitation", colorTo: "#FDFEFE", description: "White gelatinous precipitate forms" }]);

add("nuc-th-oxalate-nitrate-precipitation", "Selective oxalate precipitation of thorium(IV) from nitrate solution",
  ["th-no3-4", "h2c2o4"], ["th-c2o4-2", "hno3"], -92.0,
  "Highly selective analytical and industrial separation of thorium from trivalent lanthanides.", "precipitation",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Heavy white crystalline thorium oxalate precipitates" }]);

add("nuc-th-oxalate-na2c2o4-precip", "Sodium oxalate precipitation of thorium oxalate",
  ["th-no3-4", "na2c2o4"], ["th-c2o4-2", "nano3"], -96.0,
  "Precipitation of insoluble thorium oxalate using sodium oxalate.", "precipitation",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "White thorium oxalate precipitates" }]);

// =========================================================================
// Section 6: Thorium Halides, Reductions & Molten Salt Chemistry (15)
// =========================================================================
add("nuc-th-oxalate-k2c2o4-precip", "Potassium oxalate precipitation of thorium oxalate",
  ["th-no3-4", "k2c2o4"], ["th-c2o4-2", "kno3"], -98.0,
  "Quantitative precipitation of thorium oxalate.", "precipitation",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "White crystalline thorium oxalate precipitates" }]);

add("nuc-thcl4-oxalate-precip", "Oxalic acid precipitation of thorium from chloride solution",
  ["thcl4", "h2c2o4"], ["th-c2o4-2", "hcl"], -88.0,
  "Selective recovery of thorium from monazite chloride leach liquor.", "precipitation",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "White thorium oxalate precipitates" }]);

add("nuc-thso42-oxalate-precip", "Oxalic acid precipitation of thorium from sulfate solution",
  ["th-so4-2", "h2c2o4"], ["th-c2o4-2", "h2so4"], -84.0,
  "Isolation of thorium from concentrated monazite sulfuric acid digestate.", "precipitation",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "White thorium oxalate precipitates" }]);

add("nuc-th-oxalate-calcination-tho2", "Thermal calcination of thorium oxalate to ceramic thoria",
  ["th-c2o4-2"], ["tho2", "co", "co2"], 240.0,
  "Thermal decomposition at 800°C generating high surface area nuclear-grade ThO2 powder.", "decomposition");

add("nuc-th-oxalate-air-calcination", "Oxidative air calcination of thorium oxalate",
  ["th-c2o4-2", "o2"], ["tho2", "co2"], -820.0,
  "Air roasting of thorium oxalate producing pure thorium dioxide.");

add("nuc-thf4-calcium-reduction", "Calciothermic reduction of thorium tetrafluoride to thorium metal",
  ["thf4", "ca"], ["th", "caf2"], -630.0,
  "Ames-type bomb reduction producing reactor-grade metallic thorium.");

add("nuc-thf4-magnesium-reduction", "Magnesiothermic reduction of thorium tetrafluoride",
  ["thf4", "mg"], ["th", "mgf2"], -410.0,
  "Metallothermic reduction yielding thorium-magnesium alloy intermediate.");

add("nuc-thcl4-sodium-reduction", "Sodiothermic reduction of thorium tetrachloride",
  ["thcl4", "na"], ["th", "nacl"], -740.0,
  "Vapor-phase sodium reduction producing ductile thorium sponge.");

add("nuc-thcl4-potassium-reduction", "Potassiothermic reduction of thorium tetrachloride",
  ["thcl4", "k"], ["th", "kcl"], -770.0,
  "Reduction of ThCl4 by molten potassium.");

add("nuc-thcl4-magnesium-reduction", "Kroll-type magnesium reduction of thorium tetrachloride",
  ["thcl4", "mg"], ["th", "mgcl2"], -480.0,
  "Pyrometallurgical reduction of anhydrous ThCl4 vapor by molten magnesium.");

add("nuc-thcl4-calcium-reduction", "Calciothermic reduction of thorium tetrachloride",
  ["thcl4", "ca"], ["th", "cacl2"], -590.0,
  "Exothermic bomb reduction producing metallic thorium buttons.");

add("nuc-thso42-naoh-precipitation", "Caustic neutralization of thorium sulfate",
  ["th-so4-2", "naoh"], ["tho2", "na2so4", "water"], -188.0,
  "Alkaline precipitation recovering thorium from sulfate solution.", "precipitation");

add("nuc-thso42-barium-nitrate-metathesis", "Sulfate removal from thorium sulfate using barium nitrate",
  ["th-so4-2", "ba-no3-2"], ["baso4", "th-no3-4"], -46.0,
  "Quantitative metathesis separating thorium into nitrate phase.", "precipitation");

add("nuc-thso42-barium-chloride-metathesis", "Conversion of thorium sulfate to thorium chloride via BaCl2",
  ["th-so4-2", "bacl2"], ["baso4", "thcl4"], -44.0,
  "Precipitation of barium sulfate yielding anhydrous ThCl4 precursor.", "precipitation");

add("nuc-th-water-corrosion", "High-temperature corrosion of thorium metal by steam",
  ["th", "water"], ["tho2", "h2"], -510.0,
  "Hydrothermal oxidation of metallic thorium generating hydrogen.");

// =========================================================================
// Section 7: Uranyl Metathesis, Carbonates, Sulfides & Redox (10)
// =========================================================================
add("nuc-uranyl-chloride-agno3-metathesis", "Silver nitrate precipitation of chloride from uranyl chloride",
  ["uo2cl2", "agno3"], ["agcl", "uo2-no3-2"], -112.0,
  "Quantitative argentometric removal of chloride generating uranyl nitrate.", "precipitation",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Curdy white AgCl precipitates" }]);

add("nuc-uo2-sulfate-h2s-reduction", "Hydrogen sulfide reductive precipitation of uranium dioxide from uranyl sulfate",
  ["uo2so4", "h2s"], ["uo2", "s", "h2so4"], -95.0,
  "Biogeochemical model: H2S reduction precipitating uraninite and elemental sulfur.", "precipitation",
  [{ type: "precipitation", colorTo: "#1C1C1C", description: "Black uraninite and yellow sulfur precipitate" }]);

add("nuc-uo2-nitrate-h2s-reduction", "Hydrogen sulfide reduction of uranyl nitrate to uraninite",
  ["uo2-no3-2", "h2s"], ["uo2", "s", "hno3"], -98.0,
  "Reductive immobilization of uranyl ions by sulfide in roll-front ore genesis.", "precipitation",
  [{ type: "precipitation", colorTo: "#1C1C1C", description: "Black UO2 precipitate forms" }]);

add("nuc-uo2-chloride-h2s-reduction", "Sulfide reduction of uranyl chloride",
  ["uo2cl2", "h2s"], ["uo2", "s", "hcl"], -92.0,
  "Precipitation of uranium dioxide via hydrogen sulfide reduction.", "precipitation",
  [{ type: "precipitation", colorTo: "#1C1C1C", description: "Black UO2 precipitate forms" }]);

add("nuc-uo2-sulfate-na2s-reduction", "Sodium sulfide reduction of uranyl sulfate",
  ["uo2so4", "na2s"], ["uo2", "s", "na2so4"], -115.0,
  "Alkaline sulfide reduction precipitating uraninite.", "precipitation");

add("nuc-uo2-chloride-na2s-reduction", "Sodium sulfide reduction of uranyl chloride",
  ["uo2cl2", "na2s"], ["uo2", "s", "nacl"], -110.0,
  "Sulfide reduction immobilizing uranium.", "precipitation");

add("nuc-uranyl-carbonate-co-reduction", "Carbon monoxide reduction of uranyl carbonate",
  ["uo2co3", "co"], ["uo2", "co2"], -160.0,
  "Pyrometallurgical reduction converting carbonate to dioxide.");

add("nuc-uranyl-carbonate-carbon-reduction", "Carbothermic reduction of uranyl carbonate",
  ["uo2co3", "c"], ["uo2", "co"], 110.0,
  "High-temperature vacuum reduction of uranyl carbonate.");

add("nuc-u3o8-carbon-reduction", "Carbothermic reduction of triuranium octoxide",
  ["u3o8", "c"], ["uo2", "co"], 125.0,
  "Direct carbothermic reduction of pitchblende concentrate.");

add("nuc-u-co2-corrosion", "Corrosion of metallic uranium by hot carbon dioxide gas",
  ["u", "co2"], ["uo2", "co"], -520.0,
  "Magnox reactor gas coolant reaction with ruptured fuel cladding.");

console.log(`Domain 28 complete: ${list.length} reactions validated!`);

const targetFile = path.resolve(__dirname, "./domain28NuclearActinides.ts");
const code = `// Domain 28: Nuclear Chemistry, Actinide & Radiochemical Processing (${list.length} reactions)
import { addReaction } from "./generateBatch7.js";

export function buildDomain28NuclearActinides(): void {
  const reactions = ${JSON.stringify(list, null, 2)};

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
`;
fs.writeFileSync(targetFile, code, "utf8");
console.log(`✓ Wrote ${list.length} reactions to domain28NuclearActinides.ts`);
