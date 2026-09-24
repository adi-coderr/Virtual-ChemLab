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
// Section 1: Lithium-Ion Cathode Syntheses & Calcination (15)
// =========================================================================
add("bat-lco-coo-li2co3", "Solid-state synthesis of LiCoO2 from cobalt(II) oxide and lithium carbonate",
  ["li2co3", "coo", "o2"], ["licoo2", "co2"], -110.0,
  "High-temperature calcination at 850°C forming layered cathode material.");

add("bat-lco-coo-lioh", "Hydrothermal synthesis of LiCoO2 from cobalt(II) oxide and lithium hydroxide",
  ["lioh", "coo", "o2"], ["licoo2", "water"], -130.0,
  "Hydrothermal oxidation producing nanocrystalline LiCoO2.");

add("bat-lco-coco3-li2co3", "Calcination synthesis of LiCoO2 from cobalt carbonate and lithium carbonate",
  ["li2co3", "coco3", "o2"], ["licoo2", "co2"], 45.0,
  "Solid-state ceramic reaction.");

add("bat-lco-cooh2-lioh", "Co-precipitation calcination of LiCoO2 from Co(OH)2 and LiOH",
  ["lioh", "cooh2", "o2"], ["licoo2", "water"], -145.0,
  "Oxidative sintering of hydroxide co-precipitate.");

add("bat-lno-nio-li2co3", "Solid-state synthesis of LiNiO2 from nickel(II) oxide and lithium carbonate",
  ["li2co3", "nio", "o2"], ["linio2", "co2"], -95.0,
  "High-temperature calcination under oxygen flow.");

add("bat-lno-nio-lioh", "Synthesis of LiNiO2 from nickel oxide and lithium hydroxide",
  ["lioh", "nio", "o2"], ["linio2", "water"], -115.0,
  "Thermal sintering producing layered LiNiO2.");

add("bat-lno-nioh2-lioh", "Calcination of nickel hydroxide precursor with LiOH producing LiNiO2",
  ["lioh", "nioh2", "o2"], ["linio2", "water"], -135.0,
  "Precursor calcination in pure oxygen.");

add("bat-lno-nico3-li2co3", "Carbonate calcination synthesis of LiNiO2",
  ["li2co3", "nico3", "o2"], ["linio2", "co2"], 60.0,
  "Solid-state calcination.");

add("bat-lmo-spinel-li2co3", "Synthesis of spinel LiMn2O4 from manganese dioxide and lithium carbonate",
  ["li2co3", "mno2"], ["limn2o4", "co2", "o2"], 85.0,
  "Spinel synthesis at 750°C for high-rate Li-ion cells.");

add("bat-lmo-spinel-lioh", "Synthesis of spinel LiMn2O4 from MnO2 and LiOH",
  ["lioh", "mno2"], ["limn2o4", "water", "o2"], 65.0,
  "Thermal sintering producing 4V cathode spinel.");

add("bat-lmo-spinel-mnco3", "Air calcination synthesis of LiMn2O4 from manganese carbonate",
  ["li2co3", "mnco3", "o2"], ["limn2o4", "co2"], -210.0,
  "Oxidative carbonate calcination.");

add("bat-lmo-layered-li2co3", "Synthesis of layered LiMnO2 from manganese dioxide and lithium carbonate",
  ["li2co3", "mno2", "c"], ["limno2", "co2"], 45.0,
  "Carbothermal controlled reduction producing layered LiMnO2.");

add("bat-lmo-layered-lioh", "Hydrothermal synthesis of layered LiMnO2 from MnO2 and LiOH",
  ["lioh", "mno2", "h2"], ["limno2", "water"], -85.0,
  "Reductive hydrothermal synthesis of layered LiMnO2.");

add("bat-lfp-fepo4-li2co3-c", "Carbothermal reduction synthesis of LiFePO4 from FePO4 and Li2CO3",
  ["li2co3", "fepo4", "c"], ["lifepo4", "co2", "co"], 140.0,
  "Carbothermal synthesis at 700°C under nitrogen yielding carbon-coated LFP.");

add("bat-lfp-fepo4-lioh-c", "Carbothermal synthesis of LiFePO4 using lithium hydroxide",
  ["lioh", "fepo4", "c"], ["lifepo4", "co2", "water"], 120.0,
  "Inert-atmosphere sintering of LFP.");

// =========================================================================
// Section 2: Lithium Iron Phosphate (LFP) & Cathode Leaching (15)
// =========================================================================
add("bat-lfp-hydrothermal-feso4", "Hydrothermal synthesis of LiFePO4 from FeSO4, LiOH, and H3PO4",
  ["lioh", "feso4", "h3po4"], ["lifepo4", "li2so4", "water"], -180.0,
  "Autoclave hydrothermal synthesis at 180°C.");

add("bat-lfp-fe2o3-li2co3-c", "Carbothermal reduction of hematite, phosphoric acid, and Li2CO3 to LiFePO4",
  ["li2co3", "fe2o3", "h3po4", "c"], ["lifepo4", "co2", "water"], 160.0,
  "Low-cost precursor route for olivine LFP manufacturing.");

add("bat-lfp-fe2o3-lioh-c", "Carbothermal synthesis of LiFePO4 from Fe2O3 and LiOH",
  ["lioh", "fe2o3", "h3po4", "c"], ["lifepo4", "co2", "water"], 145.0,
  "Direct carbothermal reduction under argon.");

add("bat-lfp-fe3o4-li2co3-c", "Carbothermal synthesis of LiFePO4 from magnetite precursor",
  ["li2co3", "fe3o4", "h3po4", "c"], ["lifepo4", "co2", "water"], 130.0,
  "Magnetite route for olivine LFP.");

add("bat-lfp-fe3o4-lioh-c", "Hydrothermal-carbothermal LiFePO4 synthesis from Fe3O4 and LiOH",
  ["lioh", "fe3o4", "h3po4", "c"], ["lifepo4", "co2", "water"], 115.0,
  "Magnetite precursor sintering.");

add("bat-lfp-acid-leach-h2so4", "Spent LFP battery recycling: sulfuric acid leaching",
  ["lifepo4", "h2so4"], ["feso4", "li2so4", "h3po4"], -45.0,
  "Acid leaching recovering lithium and iron from shredded black mass.");

add("bat-lfp-acid-leach-hcl", "Hydrochloric acid leaching of spent LiFePO4 battery scrap",
  ["lifepo4", "hcl"], ["fecl2", "licl", "h3po4"], -40.0,
  "Chloride leaching process.");

add("bat-lfp-delithiation-h2o2", "Chemical delithiation of LiFePO4 by hydrogen peroxide and sulfuric acid",
  ["lifepo4", "h2o2", "h2so4"], ["fepo4", "li2so4", "water"], -165.0,
  "Chemical oxidation yielding pure heterosite FePO4.");

add("bat-lco-acid-leach-h2so4", "Hydrometallurgical recycling: oxidative sulfuric acid leaching of LiCoO2",
  ["licoo2", "h2so4"], ["coso4", "li2so4", "o2", "water"], -120.0,
  "Sulfuric acid leaching dissolving cobalt and lithium with oxygen off-gassing.");

add("bat-lco-acid-leach-oxalic", "Green hydrometallurgical recycling: oxalic acid reductive leaching of LiCoO2",
  ["licoo2", "h2so4", "h2c2o4"], ["coso4", "li2so4", "co2", "water"], -280.0,
  "Organic acid assisted leaching converting cobalt(III) to cobalt(II).");

add("bat-lco-acid-leach-hcl", "Hydrochloric acid leaching of spent LiCoO2 cathode material",
  ["licoo2", "hcl"], ["cocl2", "licl", "cl2", "water"], -195.0,
  "Acid digestion liberating chlorine gas.");

add("bat-lno-acid-leach-h2so4", "Sulfuric acid dissolution of spent LiNiO2 cathode material",
  ["linio2", "h2so4"], ["niso4", "li2so4", "o2", "water"], -115.0,
  "Hydrometallurgical extraction of nickel and lithium.");

add("bat-lno-acid-leach-hcl", "Hydrochloric acid digestion of spent LiNiO2 scrap",
  ["linio2", "hcl"], ["nicl2", "licl", "cl2", "water"], -190.0,
  "Chloride dissolution generating chlorine.");

add("bat-lmo-acid-leach-h2so4", "Sulfuric acid leaching of spent LiMn2O4 spinel",
  ["limn2o4", "h2so4"], ["mnso4", "li2so4", "o2", "water"], -130.0,
  "Dissolution of spent cathode spinel.");

add("bat-lmo-acid-leach-hcl", "Hydrochloric acid leaching of spent LiMn2O4 cathode",
  ["limn2o4", "hcl"], ["mncl2", "licl", "cl2", "water"], -210.0,
  "Chloride leaching dissolving manganese.");

// =========================================================================
// Section 3: Cathode Thermal Degradation & Hydrometallurgical Recycling (15)
// =========================================================================
add("bat-lco-thermal-decomposition", "Thermal runaway: decomposition of delithiated LiCoO2 releasing oxygen",
  ["licoo2"], ["coo", "li2o", "o2"], 115.0,
  "High-temperature thermal decomposition releasing oxygen gas.", "decomposition");

add("bat-lno-thermal-decomposition", "Thermal runaway: decomposition of delithiated LiNiO2 releasing oxygen",
  ["linio2"], ["nio", "li2o", "o2"], 85.0,
  "Oxygen evolution from charged nickel-rich cathode.", "decomposition");

add("bat-lmo-thermal-decomposition", "Thermal decomposition of spinel LiMn2O4",
  ["limn2o4"], ["mn2o3", "li2o", "o2"], 140.0,
  "Thermal reduction of manganese spinel at elevated temperatures.", "decomposition");

add("bat-recov-li2co3-na2co3", "Lithium recovery: precipitation of battery-grade lithium carbonate from sulfate brine",
  ["li2so4", "na2co3"], ["li2co3", "na2so4"], -18.0,
  "Soda ash precipitation of sparingly soluble Li2CO3 at 90°C.", "precipitation");

add("bat-recov-li2co3-licl", "Precipitation of lithium carbonate from concentrated lithium chloride eluate",
  ["licl", "na2co3"], ["li2co3", "nacl"], -15.0,
  "Hot carbonate precipitation recovering refined lithium salt.", "precipitation");

add("bat-recov-li2co3-lino3", "Precipitation of lithium carbonate from nitrate strip solution",
  ["lino3", "na2co3"], ["li2co3", "nano3"], -16.0,
  "Carbonate recovery from solvent extraction eluate.", "precipitation");

add("bat-lfp-recov-naoh", "Alkaline digestion of spent LiFePO4 recovering lithium hydroxide",
  ["lifepo4", "naoh"], ["feoh2", "na3po4", "lioh"], -65.0,
  "Mechanochemical alkaline leaching separating lithium from iron phosphate.");

add("bat-lco-recov-naoh", "Caustic precipitation of cobalt hydroxide from battery leach sulfate",
  ["coso4", "naoh"], ["cooh2", "na2so4"], -85.0,
  "Hydroxide precipitation isolating cobalt precursor.", "precipitation");

add("bat-lmo-recov-naoh", "Precipitation of manganese hydroxide from battery leachate",
  ["mnso4", "naoh"], ["mnoh2", "na2so4"], -82.0,
  "Alkaline precipitation isolating manganese hydroxide.", "precipitation");

add("bat-lno-thermal-coo", "Thermal decomposition of cobalt carbonate to cobalt oxide",
  ["coco3"], ["coo", "co2"], 88.0,
  "Calcination regenerating cobalt precursor.", "decomposition");

add("bat-lno-thermal-nico3", "Thermal calcination of nickel carbonate to nickel oxide",
  ["nico3"], ["nio", "co2"], 85.0,
  "Thermal decomposition producing green NiO powder.", "decomposition");

add("bat-lmo-thermal-mnco3", "Thermal air roasting of manganese carbonate to manganese dioxide",
  ["mnco3", "o2"], ["mno2", "co2"], -65.0,
  "Air oxidation yielding battery-active electrolytic manganese dioxide (EMD).");

add("bat-feoh2-air-oxidation", "Air oxidation of iron(II) hydroxide to iron(III) oxide during battery recycling",
  ["feoh2", "o2"], ["fe2o3", "water"], -320.0,
  "Iron removal stage in hydrometallurgical purification.");

add("bat-feoh2-acetic-leach", "Acetic acid dissolution of recycled iron(II) hydroxide",
  ["feoh2", "ch3cooh"], ["ch3coo-2-fe", "water"], -62.0,
  "Organic acid leaching producing iron(II) acetate precursor.", "acid_base_neutralization");

add("bat-cooh2-dehydration", "Thermal dehydration of cobalt(II) hydroxide to cobalt(II) oxide",
  ["cooh2"], ["coo", "water"], 65.0,
  "Calcination producing CoO.", "decomposition");

// =========================================================================
// Section 4: Electrolyte Salts, Degradation & Acetate Chemistry (15)
// =========================================================================
add("bat-lipf6-hydrolysis-water", "Moisture degradation of LiPF6 battery electrolyte generating toxic HF gas",
  ["lipf6", "water"], ["lif", "hf", "h3po4"], -145.0,
  "Exothermic electrolyte hydrolysis forming corrosive hydrofluoric acid and lithium fluoride precipitate.", "gas_evolution");

add("bat-lipf6-neutralize-naoh", "Caustic soda neutralization of spent LiPF6 electrolyte",
  ["lipf6", "naoh"], ["lif", "naf", "na3po4", "water"], -380.0,
  "Waste electrolyte treatment precipitating insoluble fluorides.", "precipitation");

add("bat-lipf6-neutralize-koh", "Potassium hydroxide neutralization of spent LiPF6 electrolyte",
  ["lipf6", "koh"], ["lif", "kf", "k3po4", "water"], -395.0,
  "Caustic potash neutralization.");

add("bat-libf4-neutralize-naoh", "Caustic neutralization of LiBF4 battery electrolyte salt",
  ["libf4", "naoh"], ["lif", "naf", "h3bo3"], -220.0,
  "Alkaline neutralization recovering lithium fluoride.");

add("bat-libf4-neutralize-koh", "Potassium hydroxide neutralization of LiBF4 salt",
  ["libf4", "koh"], ["lif", "kf", "h3bo3"], -230.0,
  "Neutralization yielding boric acid.");

add("bat-liclo4-thermal-decomp", "Thermal decomposition of lithium perchlorate solid electrolyte",
  ["liclo4"], ["licl", "o2"], 28.0,
  "High-temperature decomposition releasing oxygen.", "decomposition");

add("bat-liclo4-combustion-c", "Deflagration reaction of lithium perchlorate with carbon anode dust",
  ["liclo4", "c"], ["licl", "co2"], -410.0,
  "Exothermic runaway reaction with graphite dust.", "combustion");

add("bat-liclo4-reduction-h2", "Hydrogen reduction of lithium perchlorate to lithium chloride",
  ["liclo4", "h2"], ["licl", "water"], -620.0,
  "Gas-phase catalytic reduction.");

add("bat-liclo4-reduction-co", "Carbon monoxide reduction of lithium perchlorate",
  ["liclo4", "co"], ["licl", "co2"], -710.0,
  "Reductive destruction of spent perchlorate.");

add("bat-lic2h3o2-acid-hcl", "Acidification of lithium acetate precursor by hydrochloric acid",
  ["lic2h3o2", "hcl"], ["licl", "ch3cooh"], -18.0,
  "Synthesis of lithium chloride and glacial acetic acid.", "acid_base_neutralization");

add("bat-lic2h3o2-acid-hbr", "Hydrobromic acid reaction with lithium acetate",
  ["lic2h3o2", "hbr"], ["libr", "ch3cooh"], -19.0,
  "Synthesis of battery-grade lithium bromide.", "acid_base_neutralization");

add("bat-lic2h3o2-acid-h2so4", "Conversion of lithium acetate to lithium sulfate by sulfuric acid",
  ["lic2h3o2", "h2so4"], ["li2so4", "ch3cooh"], -22.0,
  "Acid metathesis generating lithium sulfate.", "acid_base_neutralization");

add("bat-lic2h3o2-acid-hno3", "Nitric acid acidification of lithium acetate",
  ["lic2h3o2", "hno3"], ["lino3", "ch3cooh"], -17.0,
  "Synthesis of lithium nitrate oxidizer.", "acid_base_neutralization");

add("bat-lic2h3o2-combustion", "Thermal combustion of lithium acetate gel precursor",
  ["lic2h3o2", "o2"], ["li2co3", "co2", "water"], -1680.0,
  "Sol-gel combustion synthesis of lithium oxide/carbonate precursor.", "combustion");

add("bat-lic2h3o2-pyrolysis", "Dry pyrolysis of anhydrous lithium acetate producing acetone",
  ["lic2h3o2"], ["li2co3", "ch3coch3"], 95.0,
  "Thermal ketonization generating acetone and lithium carbonate.", "decomposition");

// =========================================================================
// Section 5: Vanadium Redox Flow Battery (VRFB) Reactions (15)
// =========================================================================
add("bat-vrfb-v2o5-reduction-c", "Carbothermal sulfuric acid digestion of V2O5 to vanadyl sulfate electrolyte",
  ["v2o5", "h2so4", "c"], ["voso4", "co2", "water"], -85.0,
  "Preparation of V(IV) positive electrolyte from vanadium pentoxide.");

add("bat-vrfb-v2o5-reduction-methanol", "Methanol reduction of V2O5 to vanadyl sulfate electrolyte",
  ["v2o5", "h2so4", "ch3oh"], ["voso4", "hcho", "water"], -175.0,
  "Alcohol reduction synthesizing vanadyl posolyte.");

add("bat-vrfb-v2o5-hbr-reduction", "Hydrobromic acid reduction of vanadium pentoxide",
  ["v2o5", "hbr"], ["v2o3", "br2", "water"], -110.0,
  "Bromide reduction of vanadium pentoxide.");

add("bat-vrfb-comproportionation", "VRFB electrolyte balancing: comproportionation of V(IV) and V(II) to V(III)",
  ["voso4", "vso4", "h2so4"], ["v2-so4-3", "water"], -95.0,
  "Electrolyte rebalancing reaction yielding homogeneous V(III) solution.");

add("bat-vrfb-v3-air-oxidation", "Air oxidation of vanadium(III) sulfate electrolyte to vanadyl sulfate",
  ["v2-so4-3", "o2", "water"], ["voso4", "h2so4"], -245.0,
  "Capacity loss mechanism in VRFB negative tank due to oxygen cross-contamination.");

add("bat-vrfb-v2-air-oxidation", "Rapid air oxidation of vanadium(II) sulfate negative electrolyte",
  ["vso4", "o2", "h2so4"], ["v2-so4-3", "water"], -320.0,
  "Parasitic atmospheric oxidation of purple V(II) negolyte to green V(III).");

add("bat-vrfb-v2-corrosion-h2", "Parasitic hydrogen evolution corrosion of vanadium(II) negolyte",
  ["vso4", "h2so4"], ["v2-so4-3", "h2"], -42.0,
  "Self-discharge hydrogen evolution on carbon felt electrodes.", "gas_evolution");

add("bat-vrfb-v4-reduction-zn", "Zinc metal chemical reduction of vanadyl sulfate V(IV) to V(III)",
  ["voso4", "zn", "h2so4"], ["v2-so4-3", "znso4", "water"], -195.0,
  "Chemical reduction for electrolyte testing.");

add("bat-vrfb-v3-reduction-zn", "Zinc metal reduction of vanadium(III) sulfate to vanadium(II) sulfate",
  ["v2-so4-3", "zn"], ["vso4", "znso4"], -140.0,
  "Deep reduction generating active purple V(II) negolyte.");

add("bat-vrfb-v4-reduction-fe", "Iron metal reduction of vanadyl sulfate to vanadium(III)",
  ["voso4", "fe", "h2so4"], ["v2-so4-3", "feso4", "water"], -165.0,
  "Chemical reduction of posolyte.");

add("bat-vrfb-v3-reduction-fe", "Iron reduction of vanadium(III) sulfate to vanadium(II)",
  ["v2-so4-3", "fe"], ["vso4", "feso4"], -95.0,
  "Reductive activation.");

add("bat-vrfb-v4-reduction-mg", "Magnesium reduction of vanadyl sulfate to V(III)",
  ["voso4", "mg", "h2so4"], ["v2-so4-3", "mgso4", "water"], -340.0,
  "Exothermic chemical reduction.");

add("bat-vrfb-v3-reduction-mg", "Magnesium reduction of V(III) sulfate to V(II)",
  ["v2-so4-3", "mg"], ["vso4", "mgso4"], -285.0,
  "Energetic reduction yielding purple VSO4.");

add("bat-vrfb-voso4-precipitation-naoh", "Oxidative alkaline precipitation of vanadyl sulfate by NaOH",
  ["voso4", "naoh", "o2"], ["v2o5", "na2so4", "water"], -180.0,
  "Alkaline precipitation recovering vanadium pentoxide.");

add("bat-vrfb-v2so43-precipitation-naoh", "Alkaline precipitation of vanadium(III) oxide from V2(SO4)3",
  ["v2-so4-3", "naoh"], ["v2o3", "na2so4", "water"], -170.0,
  "Precipitation of black vanadium(III) oxide.");

// =========================================================================
// Section 6: Sodium-Ion Battery & NASICON Chemistries (15)
// =========================================================================
add("bat-sib-natio2-synthesis", "Solid-state carbothermal synthesis of sodium titanate (NaTiO2) anode material",
  ["na2co3", "tio2", "c"], ["natio2", "co", "co2"], 185.0,
  "High-temperature reductive sintering of NaTiO2 sodium-ion battery anode.");

add("bat-sib-natio2-acid-hcl", "Hydrochloric acid digestion of sodium titanate",
  ["natio2", "hcl"], ["nacl", "tio2", "h2"], -65.0,
  "Acid digestion liberating hydrogen gas.", "gas_evolution");

add("bat-sib-natio2-acid-h2so4", "Sulfuric acid dissolution of sodium titanate",
  ["natio2", "h2so4"], ["na2so4", "tio2", "h2"], -70.0,
  "Acid digestion releasing hydrogen.", "gas_evolution");

add("bat-sib-natio2-acid-hno3", "Nitric acid oxidation of sodium titanate",
  ["natio2", "hno3"], ["nano3", "tio2", "no2", "water"], -195.0,
  "Oxidative acid digestion.");

add("bat-sib-natio2-air-oxidation", "Air oxidation of sodium titanate anode material",
  ["natio2", "o2"], ["na2o", "tio2"], -260.0,
  "Atmospheric degradation of sensitive sodium titanate.");

add("bat-sib-nasicon-synth-na2co3", "Carbothermal synthesis of NASICON Na3V2(PO4)3 cathode from V2O5 and soda ash",
  ["na2co3", "v2o5", "h3po4", "c"], ["na3v2-po4-3", "co2", "water"], 240.0,
  "Synthesis of high-voltage NASICON sodium super-ionic conductor cathode.");

add("bat-sib-nasicon-synth-naoh", "Hydrothermal-carbothermal synthesis of Na3V2(PO4)3 using NaOH",
  ["naoh", "v2o5", "h3po4", "c"], ["na3v2-po4-3", "co2", "water"], 215.0,
  "Caustic hydrothermal route for NASICON cathode nanoparticles.");

add("bat-sib-nasicon-synth-v2o3", "Direct ceramic synthesis of Na3V2(PO4)3 from vanadium(III) oxide",
  ["na2co3", "v2o3", "h3po4"], ["na3v2-po4-3", "co2", "water"], 140.0,
  "Single-phase synthesis under inert atmosphere.");

add("bat-sib-alluaudite-synthesis", "Solid-state synthesis of alluaudite Na2Fe2(SO4)3 high-voltage cathode",
  ["na2so4", "feso4"], ["na2fe2-so4-3"], 25.0,
  "Low-temperature solid-state sintering at 350°C forming 3.8V alluaudite cathode.", "synthesis");

add("bat-sib-alluaudite-hydrolysis-naoh", "Alkaline decomposition of alluaudite cathode scrap",
  ["na2fe2-so4-3", "naoh"], ["feoh2", "na2so4"], -120.0,
  "Alkaline hydrometallurgical recycling.");

add("bat-sib-alluaudite-acid-hcl", "Hydrochloric acid leaching of spent alluaudite sodium-iron cathode",
  ["na2fe2-so4-3", "hcl"], ["fecl2", "nacl", "h2so4"], -55.0,
  "Acid leaching separating sodium and iron salts.");

add("bat-sib-nasicon-acid-leach-h2so4", "Sulfuric acid leaching of spent NASICON Na3V2(PO4)3 cathode",
  ["na3v2-po4-3", "h2so4", "o2", "water"], ["voso4", "na2so4", "h3po4"], -310.0,
  "Hydrometallurgical recovery of vanadium and sodium phosphate.");

add("bat-sib-nasicon-acid-leach-hcl", "Hydrochloric acid leaching of spent NASICON material",
  ["na3v2-po4-3", "hcl"], ["vcl3", "nacl", "h3po4"], -180.0,
  "Chloride leaching of sodium vanadium phosphate.");

add("bat-sib-alluaudite-thermal-decomp", "Thermal decomposition of alluaudite Na2Fe2(SO4)3 at 600°C",
  ["na2fe2-so4-3"], ["na2so4", "fe2o3", "so2", "o2"], 185.0,
  "Thermal degradation releasing sulfur dioxide.", "decomposition");

add("bat-sib-natio2-hydrolysis-water", "Aqueous corrosion of sodium titanate anode by moisture",
  ["natio2", "water"], ["naoh", "tio2", "h2"], -45.0,
  "Aqueous hydrolysis releasing hydrogen gas.", "gas_evolution");

// =========================================================================
// Section 7: MXene (Ti3C2) & Anode SEI Formations (10)
// =========================================================================
add("bat-mxene-combustion", "Thermal combustion of Ti3C2 MXene 2D nanosheets in air",
  ["ti3c2", "o2"], ["tio2", "co2"], -3150.0,
  "High-temperature oxidative destruction of MXene sheets.", "combustion");

add("bat-mxene-chlorination", "High-temperature chlorination of Ti3C2 MXene",
  ["ti3c2", "cl2"], ["ticl4", "c"], -1180.0,
  "Chlorination producing volatile TiCl4 and carbide-derived carbon (CDC).");

add("bat-mxene-peroxide-oxidation", "Chemical degradation of Ti3C2 MXene colloidal flakes by hydrogen peroxide",
  ["ti3c2", "h2o2"], ["tio2", "co2", "water"], -3850.0,
  "Oxidative destruction of 2D titanium carbide.");

add("bat-mxene-nitric-digestion", "Oxidative acid digestion of Ti3C2 MXene in hot nitric acid",
  ["ti3c2", "hno3"], ["tio2", "co2", "no2", "water"], -4200.0,
  "Acid digestion liberating dense nitrogen dioxide plumes.");

add("bat-sei-li-fluorination", "Direct fluorination of lithium metal anode creating compact LiF SEI",
  ["li", "f2"], ["lif"], -616.0,
  "Direct gas-phase fluorination forming artificial SEI.", "synthesis");

add("bat-sei-li-co2-carbonate", "CO2 electrolyte additive passivation: formation of Li2CO3 on lithium anode",
  ["li", "co2"], ["li2co3", "c"], -720.0,
  "SEI stabilization preventing lithium dendrite growth.");

add("bat-sei-li-hf-scavenging", "Lithium metal scavenging of trace HF in battery electrolyte forming LiF",
  ["li", "hf"], ["lif", "h2"], -320.0,
  "Passivation reaction generating LiF SEI layer.");

add("bat-sei-na-fluorination", "Fluorination of sodium metal anode to NaF passivating interface",
  ["na", "f2"], ["naf"], -575.0,
  "Direct fluorination forming artificial NaF SEI.", "synthesis");

add("bat-sei-na-co2-carbonate", "Interfacial carbonate passivating film formation on sodium metal anode",
  ["na", "co2"], ["na2co3", "c"], -680.0,
  "Artificial SEI creation from carbon dioxide treatment.");

add("bat-sei-na-hf-scavenging", "Sodium anode scavenging of HF acid producing NaF protective layer",
  ["na", "hf"], ["naf", "h2"], -290.0,
  "Electrolyte HF scavenging.");

console.log(`Domain 30 complete: ${list.length} reactions validated!`);

const targetFile = path.resolve(__dirname, "./domain30BatteryEnergyStorage.ts");
const code = `// Domain 30: Battery Chemistries & Energy Storage (${list.length} reactions)
import { addReaction } from "./generateBatch7.js";

export function buildDomain30BatteryEnergyStorage(): void {
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
console.log(`✓ Wrote ${list.length} reactions to domain30BatteryEnergyStorage.ts`);
