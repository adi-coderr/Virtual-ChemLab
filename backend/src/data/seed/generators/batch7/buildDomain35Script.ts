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
// Domain 35: Rare Earth Elements, Critical Materials & Hydrometallurgy (100)
// =========================================================================

// Section 1: Dissolution of Rare Earth Oxides in Mineral Acids (1-16)
add("ree-ce2o3-hcl-leach", "Hydrochloric acid digestion of cerium(III) oxide",
  ["ce2o3", "hcl"], ["cecl3", "water"], -320.0,
  "Mineral acid leaching of Ce2O3 to aqueous cerium(III) chloride.", "neutralization");

add("ree-ce2o3-hno3-leach", "Nitric acid digestion of cerium(III) oxide",
  ["ce2o3", "hno3"], ["ce-no3-3", "water"], -340.0,
  "Dissolution yielding cerium(III) nitrate liquor for solvent extraction.", "neutralization");

add("ree-ce2o3-h2so4-leach", "Sulfuric acid digestion of cerium(III) oxide",
  ["ce2o3", "h2so4"], ["ce2-so4-3", "water"], -385.0,
  "Sulfuric acid leaching producing cerium(III) sulfate.", "neutralization");

add("ree-pr2o3-hcl-leach", "Hydrochloric acid dissolution of praseodymium(III) oxide",
  ["pr2o3", "hcl"], ["prcl3", "water"], -335.0,
  "Digestion of green praseodymium oxide yielding vivid green PrCl3 solution.", "neutralization");

add("ree-pr2o3-hno3-leach", "Nitric acid digestion of praseodymium(III) oxide",
  ["pr2o3", "hno3"], ["pr-no3-3", "water"], -350.0,
  "Nitric leach producing praseodymium(III) nitrate solution.", "neutralization");

add("ree-pr2o3-h2so4-leach", "Sulfuric acid digestion of praseodymium(III) oxide",
  ["pr2o3", "h2so4"], ["pr2-so4-3", "water"], -395.0,
  "Sulfuric acid digestion yielding emerald-green praseodymium sulfate.", "neutralization");

add("ree-nd2o3-hcl-leach", "Hydrochloric acid dissolution of neodymium(III) oxide",
  ["nd2o3", "hcl"], ["ndcl3", "water"], -342.0,
  "Digestion of blue-violet Nd2O3 yielding aqueous lilac neodymium(III) chloride.", "neutralization");

add("ree-nd2o3-hno3-leach", "Nitric acid dissolution of neodymium(III) oxide",
  ["nd2o3", "hno3"], ["nd-no3-3", "water"], -360.0,
  "Nitric digestion producing neodymium nitrate liquor for SX circuits.", "neutralization");

add("ree-nd2o3-h2so4-leach", "Sulfuric acid digestion of neodymium(III) oxide",
  ["nd2o3", "h2so4"], ["nd2-so4-3", "water"], -405.0,
  "Acid leaching of neodymium oxide into aqueous neodymium sulfate.", "neutralization");

add("ree-sm2o3-hcl-leach", "Hydrochloric acid dissolution of samarium(III) oxide",
  ["sm2o3", "hcl"], ["smcl3", "water"], -330.0,
  "Dissolution of pale samarium oxide forming faint yellow SmCl3 solution.", "neutralization");

add("ree-sm2o3-hno3-leach", "Nitric acid dissolution of samarium(III) oxide",
  ["sm2o3", "hno3"], ["sm-no3-3", "water"], -352.0,
  "Acid leaching yielding samarium(III) nitrate solution.", "neutralization");

add("ree-sm2o3-h2so4-leach", "Sulfuric acid dissolution of samarium(III) oxide",
  ["sm2o3", "h2so4"], ["sm2-so4-3", "water"], -390.0,
  "Sulfuric leaching converting samarium oxide to soluble sulfate.", "neutralization");

add("ree-y2o3-hcl-leach", "Hydrochloric acid dissolution of yttrium(III) oxide",
  ["y2o3", "hcl"], ["ycl3", "water"], -355.0,
  "Acid digestion of yttria white powder yielding clear yttrium chloride liquor.", "neutralization");

add("ree-y2o3-hno3-leach", "Nitric acid dissolution of yttrium(III) oxide",
  ["y2o3", "hno3"], ["y-no3-3", "water"], -375.0,
  "Nitric digestion of yttria producing yttrium nitrate precursor.", "neutralization");

add("ree-y2o3-h2so4-leach", "Sulfuric acid digestion of yttrium(III) oxide",
  ["y2o3", "h2so4"], ["y2-so4-3", "water"], -415.0,
  "Sulfuric acid leaching of yttria powder yielding aqueous yttrium sulfate.", "neutralization");

add("ree-la2o3-h2so4-leach", "Sulfuric acid digestion of lanthanum(III) oxide",
  ["la2o3", "h2so4"], ["la2-so4-3", "water"], -420.0,
  "Acid leaching converting lanthanum oxide to soluble lanthanum sulfate.", "neutralization");

// Section 2: Cerium Redox & Oxide Processing (17-20)
add("ree-ceo2-oxalic-hcl-leach", "Reductive leaching of cerium(IV) dioxide with oxalic acid and HCl",
  ["ceo2", "h2c2o4", "hcl"], ["cecl3", "co2", "water"], -210.0,
  "Reductive leaching converting insoluble CeO2 into soluble Ce(III) chloride with CO2 effervescence.", "redox_other");

add("ree-ceo2-hydrogen-reduction", "Hydrogen reduction of cerium(IV) dioxide to cerium(III) oxide",
  ["ceo2", "h2"], ["ce2o3", "water"], 145.0,
  "High-temperature reduction of yellow CeO2 to golden-yellow Ce2O3.", "redox_other");

add("ree-ceo2-co-reduction", "Carbon monoxide reduction of cerium dioxide",
  ["ceo2", "co"], ["ce2o3", "co2"], 115.0,
  "Reductive syngas roasting of cerium dioxide in three-way catalytic converters.", "redox_other");

add("ree-ce2o3-air-oxidation", "Air calcination of cerium(III) oxide to cerium(IV) dioxide",
  ["ce2o3", "o2"], ["ceo2"], -380.0,
  "Thermal oxidation of Ce(III) oxide to yellow CeO2 polish abrasive.", "combustion");

// Section 3: Rare Earth Oxalate Precipitation with Oxalic Acid (21-32)
add("ree-lacl3-oxalic-precip", "Oxalic acid precipitation of lanthanum(III) oxalate from chloride",
  ["lacl3", "h2c2o4"], ["la2-c2o4-3", "hcl"], -42.0,
  "Precipitation of insoluble white crystalline lanthanum oxalate decahydrate precursor.", "precipitation");

add("ree-cecl3-oxalic-precip", "Oxalic acid precipitation of cerium(III) oxalate from chloride",
  ["cecl3", "h2c2o4"], ["ce2-c2o4-3", "hcl"], -45.0,
  "Precipitation of pale white cerium(III) oxalate decahydrate.", "precipitation");

add("ree-prcl3-oxalic-precip", "Oxalic acid precipitation of praseodymium(III) oxalate from chloride",
  ["prcl3", "h2c2o4"], ["pr2-c2o4-3", "hcl"], -48.0,
  "Precipitation of light green praseodymium(III) oxalate.", "precipitation");

add("ree-ndcl3-oxalic-precip", "Oxalic acid precipitation of neodymium(III) oxalate from chloride",
  ["ndcl3", "h2c2o4"], ["nd2-c2o4-3", "hcl"], -50.0,
  "Precipitation of violet neodymium(III) oxalate from chloride liquor.", "precipitation");

add("ree-smcl3-oxalic-precip", "Oxalic acid precipitation of samarium(III) oxalate from chloride",
  ["smcl3", "h2c2o4"], ["sm2-c2o4-3", "hcl"], -46.0,
  "Precipitation of pale yellow samarium(III) oxalate.", "precipitation");

add("ree-ycl3-oxalic-precip", "Oxalic acid precipitation of yttrium(III) oxalate from chloride",
  ["ycl3", "h2c2o4"], ["y2-c2o4-3", "hcl"], -52.0,
  "Precipitation of insoluble white yttrium oxalate from purified chloride leach.", "precipitation");

add("ree-la-nitrate-oxalic-precip", "Oxalic acid precipitation of lanthanum(III) oxalate from nitrate",
  ["la-no3-3", "h2c2o4"], ["la2-c2o4-3", "hno3"], -44.0,
  "Precipitation of lanthanum oxalate from solvent extraction strip liquor.", "precipitation");

add("ree-ce-nitrate-oxalic-precip", "Oxalic acid precipitation of cerium(III) oxalate from nitrate",
  ["ce-no3-3", "h2c2o4"], ["ce2-c2o4-3", "hno3"], -46.0,
  "Precipitation of cerium(III) oxalate from stripped nitrate solution.", "precipitation");

add("ree-pr-nitrate-oxalic-precip", "Oxalic acid precipitation of praseodymium(III) oxalate from nitrate",
  ["pr-no3-3", "h2c2o4"], ["pr2-c2o4-3", "hno3"], -49.0,
  "Precipitation of praseodymium oxalate from purified nitrate stream.", "precipitation");

add("ree-nd-nitrate-oxalic-precip", "Oxalic acid precipitation of neodymium(III) oxalate from nitrate",
  ["nd-no3-3", "h2c2o4"], ["nd2-c2o4-3", "hno3"], -51.0,
  "Precipitation of lilac neodymium oxalate precipitate from nitrate strip.", "precipitation");

add("ree-sm-nitrate-oxalic-precip", "Oxalic acid precipitation of samarium(III) oxalate from nitrate",
  ["sm-no3-3", "h2c2o4"], ["sm2-c2o4-3", "hno3"], -47.0,
  "Precipitation of samarium oxalate from nitrate strip liquor.", "precipitation");

add("ree-y-nitrate-oxalic-precip", "Oxalic acid precipitation of yttrium(III) oxalate from nitrate",
  ["y-no3-3", "h2c2o4"], ["y2-c2o4-3", "hno3"], -53.0,
  "Precipitation of dense white yttrium oxalate from stripped SX nitrate stream.", "precipitation");

// Section 4: Rare Earth Oxalate Precipitation with Sodium Oxalate (33-41)
add("ree-la-nitrate-na2c2o4-precip", "Sodium oxalate precipitation of lanthanum(III) oxalate",
  ["la-no3-3", "na2c2o4"], ["la2-c2o4-3", "nano3"], -58.0,
  "Metathetical precipitation using sodium oxalate forming dense lanthanum oxalate.", "precipitation");

add("ree-nd-nitrate-na2c2o4-precip", "Sodium oxalate precipitation of neodymium(III) oxalate",
  ["nd-no3-3", "na2c2o4"], ["nd2-c2o4-3", "nano3"], -62.0,
  "Metathesis precipitation of lavender neodymium oxalate with sodium oxalate.", "precipitation");

add("ree-sm-nitrate-na2c2o4-precip", "Sodium oxalate precipitation of samarium(III) oxalate",
  ["sm-no3-3", "na2c2o4"], ["sm2-c2o4-3", "nano3"], -60.0,
  "Precipitation of samarium oxalate using sodium oxalate precipitant.", "precipitation");

add("ree-y-nitrate-na2c2o4-precip", "Sodium oxalate precipitation of yttrium(III) oxalate",
  ["y-no3-3", "na2c2o4"], ["y2-c2o4-3", "nano3"], -64.0,
  "Sodium oxalate precipitation producing high-purity yttrium oxalate.", "precipitation");

add("ree-lacl3-na2c2o4-precip", "Lanthanum chloride precipitation with sodium oxalate",
  ["lacl3", "na2c2o4"], ["la2-c2o4-3", "nacl"], -56.0,
  "Metathesis yielding white lanthanum oxalate precipitate.", "precipitation");

add("ree-prcl3-na2c2o4-precip", "Praseodymium chloride precipitation with sodium oxalate",
  ["prcl3", "na2c2o4"], ["pr2-c2o4-3", "nacl"], -59.0,
  "Metathesis yielding light green praseodymium oxalate.", "precipitation");

add("ree-ndcl3-na2c2o4-precip", "Neodymium chloride precipitation with sodium oxalate",
  ["ndcl3", "na2c2o4"], ["nd2-c2o4-3", "nacl"], -61.0,
  "Precipitation yielding lavender neodymium oxalate and brine.", "precipitation");

add("ree-smcl3-na2c2o4-precip", "Samarium chloride precipitation with sodium oxalate",
  ["smcl3", "na2c2o4"], ["sm2-c2o4-3", "nacl"], -58.0,
  "Precipitation yielding samarium oxalate precipitate.", "precipitation");

add("ree-ycl3-na2c2o4-precip", "Yttrium chloride precipitation with sodium oxalate",
  ["ycl3", "na2c2o4"], ["y2-c2o4-3", "nacl"], -63.0,
  "Precipitation yielding pure white yttrium oxalate and sodium chloride.", "precipitation");

// Section 5: Calcinations and Pyrolyses of Oxalates to Oxides (42-51)
add("ree-la-oxalate-calcination", "Oxidative calcination of lanthanum(III) oxalate to La2O3",
  ["la2-c2o4-3", "o2"], ["la2o3", "co2"], -820.0,
  "Rotary kiln thermal calcination at 900°C converting oxalate to La2O3 powder.", "combustion");

add("ree-ce-oxalate-calcination", "Oxidative calcination of cerium(III) oxalate to CeO2",
  ["ce2-c2o4-3", "o2"], ["ceo2", "co2"], -1180.0,
  "Oxidative calcination of cerium oxalate yielding yellow ceria polishing powder.", "combustion");

add("ree-pr-oxalate-calcination", "Oxidative calcination of praseodymium(III) oxalate to Pr2O3",
  ["pr2-c2o4-3", "o2"], ["pr2o3", "co2"], -840.0,
  "Thermal decomposition of praseodymium oxalate producing green Pr2O3.", "combustion");

add("ree-nd-oxalate-calcination", "Oxidative calcination of neodymium(III) oxalate to Nd2O3",
  ["nd2-c2o4-3", "o2"], ["nd2o3", "co2"], -855.0,
  "High-temperature calcination producing light violet Nd2O3 magnet oxide.", "combustion");

add("ree-sm-oxalate-calcination", "Oxidative calcination of samarium(III) oxalate to Sm2O3",
  ["sm2-c2o4-3", "o2"], ["sm2o3", "co2"], -835.0,
  "Thermal calcination in air converting samarium oxalate into pale Sm2O3.", "combustion");

add("ree-y-oxalate-calcination", "Oxidative calcination of yttrium(III) oxalate to Y2O3",
  ["y2-c2o4-3", "o2"], ["y2o3", "co2"], -870.0,
  "Thermal calcination at 1000°C yielding phosphor-grade Y2O3 powder.", "combustion");

add("ree-la-oxalate-inert-pyrolysis", "Inert pyrolysis of lanthanum oxalate",
  ["la2-c2o4-3"], ["la2o3", "co", "co2"], 720.0,
  "Thermal decomposition under argon releasing CO and CO2.", "decomposition");

add("ree-nd-oxalate-inert-pyrolysis", "Inert pyrolysis of neodymium oxalate",
  ["nd2-c2o4-3"], ["nd2o3", "co", "co2"], 735.0,
  "Inert atmosphere thermal decomposition yielding Nd2O3, CO, and CO2.", "decomposition");

add("ree-sm-oxalate-inert-pyrolysis", "Inert pyrolysis of samarium oxalate",
  ["sm2-c2o4-3"], ["sm2o3", "co", "co2"], 730.0,
  "Pyrolysis of samarium oxalate under nitrogen.", "decomposition");

add("ree-y-oxalate-inert-pyrolysis", "Inert pyrolysis of yttrium oxalate",
  ["y2-c2o4-3"], ["y2o3", "co", "co2"], 745.0,
  "Non-oxidative pyrolysis producing yttrium oxide, carbon monoxide, and carbon dioxide.", "decomposition");

// Section 6: Fluoride Conversions for Molten Salt & Metallothermic Feedstocks (52-66)
add("ree-lacl3-hf-fluorination", "Hydrofluorination of lanthanum chloride to LaF3",
  ["lacl3", "hf"], ["laf3", "hcl"], -65.0,
  "Aqueous hydrofluorination precipitating refractory LaF3.", "precipitation");

add("ree-prcl3-hf-fluorination", "Hydrofluorination of praseodymium chloride to PrF3",
  ["prcl3", "hf"], ["prf3", "hcl"], -68.0,
  "Hydrofluorination precipitating insoluble light green PrF3.", "precipitation");

add("ree-ndcl3-hf-fluorination", "Hydrofluorination of neodymium chloride to NdF3",
  ["ndcl3", "hf"], ["ndf3", "hcl"], -70.0,
  "Hydrofluorination converting NdCl3 to crystalline NdF3 metallothermic feedstock.", "precipitation");

add("ree-smcl3-hf-fluorination", "Hydrofluorination of samarium chloride to SmF3",
  ["smcl3", "hf"], ["smf3", "hcl"], -66.0,
  "Precipitation of samarium(III) fluoride using hydrofluoric acid.", "precipitation");

add("ree-ycl3-hf-fluorination", "Hydrofluorination of yttrium chloride to YF3",
  ["ycl3", "hf"], ["yf3", "hcl"], -72.0,
  "Aqueous precipitation of insoluble yttrium fluoride.", "precipitation");

add("ree-la-nitrate-naf-precip", "Sodium fluoride precipitation of lanthanum fluoride from nitrate",
  ["la-no3-3", "naf"], ["laf3", "nano3"], -55.0,
  "Precipitation of insoluble LaF3 using sodium fluoride.", "precipitation");

add("ree-nd-nitrate-naf-precip", "Sodium fluoride precipitation of neodymium fluoride from nitrate",
  ["nd-no3-3", "naf"], ["ndf3", "nano3"], -58.0,
  "Precipitation of lilac NdF3 with sodium fluoride.", "precipitation");

add("ree-sm-nitrate-naf-precip", "Sodium fluoride precipitation of samarium fluoride from nitrate",
  ["sm-no3-3", "naf"], ["smf3", "nano3"], -56.0,
  "Precipitation of samarium fluoride from nitrate solution using NaF.", "precipitation");

add("ree-y-nitrate-naf-precip", "Sodium fluoride precipitation of yttrium fluoride from nitrate",
  ["y-no3-3", "naf"], ["yf3", "nano3"], -60.0,
  "Precipitation of yttrium fluoride using sodium fluoride.", "precipitation");

add("ree-pr-nitrate-naf-precip", "Sodium fluoride precipitation of praseodymium fluoride from nitrate",
  ["pr-no3-3", "naf"], ["prf3", "nano3"], -57.0,
  "Precipitation of praseodymium fluoride from nitrate liquor.", "precipitation");

add("ree-lacl3-naf-precip", "Sodium fluoride precipitation of lanthanum fluoride from chloride",
  ["lacl3", "naf"], ["laf3", "nacl"], -54.0,
  "Fluoride precipitation yielding insoluble LaF3 and brine.", "precipitation");

add("ree-prcl3-naf-precip", "Sodium fluoride precipitation of praseodymium fluoride from chloride",
  ["prcl3", "naf"], ["prf3", "nacl"], -57.0,
  "Fluoride precipitation of green PrF3 from chloride liquor.", "precipitation");

add("ree-ndcl3-naf-precip", "Sodium fluoride precipitation of neodymium fluoride from chloride",
  ["ndcl3", "naf"], ["ndf3", "nacl"], -59.0,
  "Precipitation of NdF3 from chloride feed using sodium fluoride.", "precipitation");

add("ree-smcl3-naf-precip", "Sodium fluoride precipitation of samarium fluoride from chloride",
  ["smcl3", "naf"], ["smf3", "nacl"], -55.0,
  "Fluoride precipitation of SmF3 and sodium chloride.", "precipitation");

add("ree-ycl3-naf-precip", "Sodium fluoride precipitation of yttrium fluoride from chloride",
  ["ycl3", "naf"], ["yf3", "nacl"], -61.0,
  "Precipitation of dense YF3 using sodium fluoride.", "precipitation");

// Section 7: Calciothermic & Metallothermic Reductions to Pure Rare Earth Metals (67-76)
add("ree-laf3-ca-reduction", "Calciothermic reduction of lanthanum(III) fluoride",
  ["laf3", "ca"], ["la", "caf2"], -185.0,
  "High-temperature bomb reduction of LaF3 by calcium metal producing pure lanthanum.", "redox_other");

add("ree-prf3-ca-reduction", "Calciothermic reduction of praseodymium(III) fluoride",
  ["prf3", "ca"], ["pr", "caf2"], -190.0,
  "Calciothermic reduction in tantalum crucible yielding metallic praseodymium.", "redox_other");

add("ree-ndf3-ca-reduction", "Calciothermic reduction of neodymium(III) fluoride",
  ["ndf3", "ca"], ["nd", "caf2"], -195.0,
  "Industrial Ames process reduction of NdF3 by calcium metal to produce metallic neodymium ingot.", "redox_other");

add("ree-smf3-ca-reduction", "Calciothermic reduction of samarium(III) fluoride",
  ["smf3", "ca"], ["sm", "caf2"], -175.0,
  "Calciothermic reduction yielding metallic samarium.", "redox_other");

add("ree-yf3-ca-reduction", "Calciothermic reduction of yttrium(III) fluoride",
  ["yf3", "ca"], ["y", "caf2"], -210.0,
  "Metallothermic reduction of YF3 by molten calcium yielding yttrium sponge metal.", "redox_other");

add("ree-ndcl3-ca-reduction", "Calciothermic reduction of anhydrous neodymium(III) chloride",
  ["ndcl3", "ca"], ["nd", "cacl2"], -180.0,
  "Reduction of molten NdCl3 by calcium producing metallic neodymium and CaCl2 slag.", "redox_other");

add("ree-prcl3-ca-reduction", "Calciothermic reduction of anhydrous praseodymium(III) chloride",
  ["prcl3", "ca"], ["pr", "cacl2"], -178.0,
  "Metallothermic reduction of PrCl3 yielding praseodymium metal.", "redox_other");

add("ree-smcl3-ca-reduction", "Calciothermic reduction of anhydrous samarium(III) chloride",
  ["smcl3", "ca"], ["sm", "cacl2"], -165.0,
  "Calciothermic reduction of SmCl3 yielding samarium metal.", "redox_other");

add("ree-ycl3-ca-reduction", "Calciothermic reduction of anhydrous yttrium(III) chloride",
  ["ycl3", "ca"], ["y", "cacl2"], -198.0,
  "Reduction of anhydrous YCl3 by calcium metal yielding metallic yttrium.", "redox_other");

add("ree-lacl3-mg-reduction", "Magnesium reduction of anhydrous lanthanum(III) chloride",
  ["lacl3", "mg"], ["la", "mgcl2"], -145.0,
  "Metallothermic reduction using molten magnesium forming lanthanum-magnesium master alloy.", "redox_other");

// Section 8: Cerium(IV) Specialized Hydrometallurgical Separation Redox (77-80)
add("ree-ce3-ozone-oxidation", "Ozone oxidation of cerium(III) sulfate to cerium(IV) sulfate",
  ["ce2-so4-3", "o3", "h2so4"], ["ce-so4-2", "o2", "water"], -310.0,
  "Selective catalytic oxidation converting trivalent cerium to tetravalent cerium for easy separation.", "redox_other");

add("ree-ce3-persulfate-oxidation", "Persulfate oxidation of cerium(III) sulfate to cerium(IV) sulfate",
  ["ce2-so4-3", "na2s2o8"], ["ce-so4-2", "na2so4"], -240.0,
  "Sodium persulfate oxidation of Ce(III) to insoluble yellow Ce(IV) basic sulfate.", "redox_other");

add("ree-ce4-nitrite-reduction", "Sodium nitrite reduction of cerium(IV) sulfate",
  ["ce-so4-2", "nano2", "water"], ["ce2-so4-3", "nano3", "h2so4"], -160.0,
  "Controlled reduction of ceric sulfate by aqueous nitrite during analytical back-extraction.", "redox_other");

add("ree-ce3-permanganate-oxidation", "Permanganate oxidation of cerium(III) sulfate",
  ["ce2-so4-3", "kmno4", "h2so4"], ["ce-so4-2", "mnso4", "k2so4", "water"], -420.0,
  "Oxidation of cerium(III) to cerium(IV) via acidic potassium permanganate.", "redox_other");

// Section 9: Rare Earth Metals Reacting with Mineral Acids (81-90)
add("ree-la-hcl-dissolution", "Dissolution of lanthanum metal in hydrochloric acid",
  ["la", "hcl"], ["lacl3", "h2"], -715.0,
  "Exothermic attack of lanthanum metal by HCl releasing vigorous hydrogen gas.", "single_displacement");

add("ree-la-hno3-dissolution", "Dissolution of lanthanum metal in dilute nitric acid",
  ["la", "hno3"], ["la-no3-3", "no", "water"], -890.0,
  "Dissolution of metallic lanthanum releasing nitric oxide and forming lanthanum nitrate.", "redox_other");

add("ree-la-h2so4-dissolution", "Dissolution of lanthanum metal in sulfuric acid",
  ["la", "h2so4"], ["la2-so4-3", "h2"], -730.0,
  "Acid dissolution yielding aqueous lanthanum sulfate and effervescent hydrogen.", "single_displacement");

add("ree-pr-hcl-dissolution", "Dissolution of praseodymium metal in hydrochloric acid",
  ["pr", "hcl"], ["prcl3", "h2"], -705.0,
  "Exothermic reaction of praseodymium metal with HCl producing bright green PrCl3 solution.", "single_displacement");

add("ree-pr-h2so4-dissolution", "Dissolution of praseodymium metal in sulfuric acid",
  ["pr", "h2so4"], ["pr2-so4-3", "h2"], -720.0,
  "Reaction of praseodymium metal with sulfuric acid forming green Pr2(SO4)3 and H2.", "single_displacement");

add("ree-nd-hcl-dissolution", "Dissolution of neodymium metal in hydrochloric acid",
  ["nd", "hcl"], ["ndcl3", "h2"], -695.0,
  "Vigorous attack of neodymium scrap magnet metal by HCl yielding purple NdCl3 solution.", "single_displacement");

add("ree-nd-hno3-dissolution", "Dissolution of neodymium metal in dilute nitric acid",
  ["nd", "hno3"], ["nd-no3-3", "no", "water"], -875.0,
  "Dissolution of neodymium metal in nitric acid releasing nitric oxide gas.", "redox_other");

add("ree-nd-h2so4-dissolution", "Dissolution of neodymium metal in sulfuric acid",
  ["nd", "h2so4"], ["nd2-so4-3", "h2"], -710.0,
  "Hydrometallurgical recycling: digestion of neodymium metal in H2SO4 to recover Nd2(SO4)3.", "single_displacement");

add("ree-sm-hcl-dissolution", "Dissolution of samarium metal in hydrochloric acid",
  ["sm", "hcl"], ["smcl3", "h2"], -680.0,
  "Dissolution of samarium metal in hydrochloric acid yielding SmCl3 and hydrogen gas.", "single_displacement");

add("ree-y-hcl-dissolution", "Dissolution of yttrium metal in hydrochloric acid",
  ["y", "hcl"], ["ycl3", "h2"], -740.0,
  "Reaction of metallic yttrium with hydrochloric acid liberating hydrogen gas.", "single_displacement");

// Section 10: High-Temperature Oxidation & Chlorination of Rare Earth Metals (91-100)
add("ree-la-combustion", "Combustion of metallic lanthanum in oxygen",
  ["la", "o2"], ["la2o3"], -1790.0,
  "Brilliant incandescent burning of pyrophoric lanthanum metal forming white La2O3.", "combustion");

add("ree-pr-combustion", "Combustion of metallic praseodymium in oxygen",
  ["pr", "o2"], ["pr2o3"], -1810.0,
  "High-temperature combustion of praseodymium metal yielding green Pr2O3.", "combustion");

add("ree-nd-combustion", "Combustion of metallic neodymium in oxygen",
  ["nd", "o2"], ["nd2o3"], -1805.0,
  "Vigorous combustion of neodymium metal shavings producing violet-tinted Nd2O3.", "combustion");

add("ree-sm-combustion", "Combustion of metallic samarium in oxygen",
  ["sm", "o2"], ["sm2o3"], -1820.0,
  "Combustion of samarium metal shavings producing pale yellow Sm2O3.", "combustion");

add("ree-y-combustion", "Combustion of metallic yttrium in oxygen",
  ["y", "o2"], ["y2o3"], -1905.0,
  "Incandescent combustion of metallic yttrium forming refractory white Y2O3.", "combustion");

add("ree-la-direct-chlorination", "Direct vapor-phase chlorination of lanthanum metal",
  ["la", "cl2"], ["lacl3"], -1070.0,
  "Vapor chlorination of lanthanum metal at 700°C producing anhydrous LaCl3.", "synthesis");

add("ree-pr-direct-chlorination", "Direct chlorination of praseodymium metal",
  ["pr", "cl2"], ["prcl3"], -1060.0,
  "Chlorination of praseodymium metal by chlorine gas forming anhydrous PrCl3.", "synthesis");

add("ree-nd-direct-chlorination", "Direct vapor-phase chlorination of neodymium metal",
  ["nd", "cl2"], ["ndcl3"], -1050.0,
  "High-temperature chlorination of neodymium metal yielding anhydrous NdCl3 for electrowinning.", "synthesis");

add("ree-sm-direct-chlorination", "Direct chlorination of samarium metal",
  ["sm", "cl2"], ["smcl3"], -1040.0,
  "Reaction of samarium metal with chlorine gas producing anhydrous SmCl3.", "synthesis");

add("ree-y-direct-chlorination", "Direct vapor chlorination of metallic yttrium",
  ["y", "cl2"], ["ycl3"], -1015.0,
  "Chlorination of yttrium metal sponge by chlorine gas producing anhydrous YCl3.", "synthesis");

console.log(`Domain 35 complete: ${list.length} reactions validated!`);

if (list.length === 100) {
  const code = `// Domain 35: Rare Earth Elements, Critical Materials & Hydrometallurgy (100 reactions)
export const DOMAIN_35_REACTIONS = ${JSON.stringify(list, null, 2)};
`;
  fs.writeFileSync(path.join(__dirname, "domain35RareEarthsMining.ts"), code);
  console.log(`✓ Wrote 100 reactions to domain35RareEarthsMining.ts`);
} else {
  console.error(`Expected 100 reactions, but got ${list.length}`);
}
