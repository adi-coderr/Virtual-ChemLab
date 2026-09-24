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
// Domain 36: Energetics, Propellants & Pyrotechnics (100)
// =========================================================================

// Section 1: Black Powder, Gunpowder & Nitrate Deflagrations (1-10)
add("pyro-black-powder-chile", "Chile saltpeter black powder deflagration",
  ["nano3", "c", "s"], ["na2s", "n2", "co2"], -685.0,
  "Sodium nitrate gunpowder deflagration releasing nitrogen gas and dense white smoke.", "combustion");

add("pyro-kno3-charcoal", "Potassium nitrate and charcoal deflagration",
  ["kno3", "c"], ["k2co3", "co2", "n2"], -730.0,
  "Sulfurless gunpowder deflagration producing potassium carbonate and carbon dioxide.", "combustion");

add("pyro-nano3-charcoal", "Sodium nitrate and charcoal combustion",
  ["nano3", "c"], ["na2co3", "co2", "n2"], -715.0,
  "Rapid combustion producing molten sodium carbonate and nitrogen gas.", "combustion");

add("pyro-bano32-sulfur", "Barium nitrate and sulfur deflagration",
  ["bano32", "s"], ["baso4", "so2", "n2"], -640.0,
  "High-temperature green firework combustion yielding barium sulfate.", "combustion");

add("pyro-cano32-charcoal", "Calcium nitrate and charcoal combustion",
  ["ca-no3-2", "c"], ["caco3", "co2", "n2"], -695.0,
  "Orange-red firework deflagration producing calcium carbonate and nitrogen.", "combustion");

add("pyro-bano32-charcoal", "Barium nitrate and charcoal combustion",
  ["bano32", "c"], ["baco3", "co2", "n2"], -710.0,
  "Combustion producing pale green incandescent flare with barium carbonate.", "combustion");

add("pyro-nano3-s", "Sodium nitrate and sulfur deflagration",
  ["nano3", "s"], ["na2so4", "so2", "n2"], -620.0,
  "Intense yellow flare deflagration yielding sodium sulfate and sulfur dioxide.", "combustion");

add("pyro-mgno32-s", "Magnesium nitrate and sulfur combustion",
  ["mg-no3-2", "s"], ["mgso4", "so2", "n2"], -635.0,
  "Combustion yielding magnesium sulfate and choking sulfur dioxide gas.", "combustion");

add("pyro-mgno32-c", "Magnesium nitrate and charcoal combustion",
  ["mg-no3-2", "c"], ["mgo", "co2", "n2"], -750.0,
  "Rapid deflagration yielding white magnesium oxide smoke.", "combustion");

add("pyro-flame-ca-orange", "Calcium nitrate and sulfur orange pyrotechnic deflagration",
  ["ca-no3-2", "s"], ["caso4", "so2", "n2"], -610.0,
  "Pyrotechnic orange flame composition burning sulfur and calcium nitrate.", "combustion");

// Section 2: Metal Fuel Deflagrations with Nitrates (11-20)
add("pyro-flare-mg-bano32", "Magnesium and barium nitrate green flare deflagration",
  ["mg", "bano32"], ["mgo", "bao", "n2"], -1580.0,
  "Brilliant incandescent military flare reaction yielding barium oxide and magnesium oxide.", "combustion");

add("pyro-flare-mg-nano3", "Magnesium and sodium nitrate yellow illumination flare",
  ["mg", "nano3"], ["mgo", "na2o", "n2"], -1520.0,
  "High-intensity maritime distress flare emitting intense 589 nm sodium doublet.", "combustion");

add("pyro-flare-mg-srno32", "Magnesium and strontium nitrate red pyrotechnic flare",
  ["mg", "sr-no3-2"], ["mgo", "sro", "n2"], -1560.0,
  "Emergency highway flare formulation providing intense deep red illumination.", "combustion");

add("pyro-bano32-al", "Aluminum and barium nitrate flash composition",
  ["bano32", "al"], ["bao", "al2o3", "n2"], -2650.0,
  "Photoflash and salutes: high-brisance deflagration producing alumina and barium oxide.", "combustion");

add("pyro-srno32-al", "Aluminum and strontium nitrate red flash composition",
  ["sr-no3-2", "al"], ["sro", "al2o3", "n2"], -2620.0,
  "Pyrotechnic flash reaction generating intense red thermal radiation.", "combustion");

add("pyro-cano32-al", "Aluminum and calcium nitrate pyrotechnic reaction",
  ["ca-no3-2", "al"], ["cao", "al2o3", "n2"], -2590.0,
  "Exothermic incendiary reaction generating white-hot molten alumina slag.", "combustion");

add("pyro-nano3-al", "Aluminum and sodium nitrate pyrotechnic reaction",
  ["nano3", "al"], ["na2o", "al2o3", "n2"], -2480.0,
  "Incendiary composition deflagrating with brilliant yellow flash.", "combustion");

add("pyro-mgno32-al", "Magnesium nitrate and aluminum pyrotechnic flash",
  ["mg-no3-2", "al"], ["mgo", "al2o3", "n2"], -2710.0,
  "Intensely exothermic flash powder reaction releasing dense white clouds.", "combustion");

add("pyro-bano32-b", "Boron and barium nitrate green delay igniter",
  ["bano32", "b"], ["bao", "b2o3", "n2"], -2150.0,
  "Gasless delay ignition composition producing boron oxide glass.", "combustion");

add("pyro-srno32-b", "Boron and strontium nitrate red delay igniter",
  ["sr-no3-2", "b"], ["sro", "b2o3", "n2"], -2120.0,
  "Gasless pyrotechnic delay composition generating high heat.", "combustion");

// Section 3: Metalloid & Transition Metal Fuel Deflagrations (21-30)
add("pyro-cano32-b", "Boron and calcium nitrate pyrotechnic reaction",
  ["ca-no3-2", "b"], ["cao", "b2o3", "n2"], -2090.0,
  "High-temperature delay element formulation.", "combustion");

add("pyro-nano3-b", "Boron and sodium nitrate pyrotechnic igniter",
  ["nano3", "b"], ["na2o", "b2o3", "n2"], -1980.0,
  "Pyrotechnic igniter producing vitreous borate slag.", "combustion");

add("pyro-bano32-si", "Silicon and barium nitrate pyrotechnic delay composition",
  ["bano32", "si"], ["bao", "sio2", "n2"], -1850.0,
  "Electric match and fuse delay composition burning with minimal gas generation.", "combustion");

add("pyro-srno32-si", "Silicon and strontium nitrate delay composition",
  ["sr-no3-2", "si"], ["sro", "sio2", "n2"], -1820.0,
  "Low-gas pyrotechnic delay element formulation.", "combustion");

add("pyro-cano32-si", "Silicon and calcium nitrate pyrotechnic reaction",
  ["ca-no3-2", "si"], ["cao", "sio2", "n2"], -1790.0,
  "Exothermic delay train reaction producing calcium silicate slag precursors.", "combustion");

add("pyro-spark-ti-o2", "Titanium sparkler incandescent combustion",
  ["ti", "o2"], ["tio2"], -944.0,
  "Pyrotechnic sparkler effect: branched silvery-white sparks of burning titanium metal.", "combustion");

add("pyro-spark-zr-o2", "Zirconium flash incandescent combustion",
  ["zr", "o2"], ["zro2"], -1100.0,
  "Photoflash bulb combustion: intense incandescent flash of fine zirconium foil.", "combustion");

add("pyro-igniter-zr-kclo4", "Zirconium and potassium perchlorate (ZPP) initiator deflagration",
  ["zr", "kclo4"], ["zro2", "kcl"], -1680.0,
  "Standard NASA/DoD electro-explosive initiator producing hot particulate slag.", "combustion");

add("pyro-sparkler-fe", "Iron sparkler branch spark combustion",
  ["fe", "o2"], ["fe3o4"], -1118.0,
  "Classic wire sparkler reaction producing golden branching flower sparks.", "combustion");

add("pyro-sparkler-al", "Aluminum sparkler silver spark combustion",
  ["al", "o2"], ["al2o3"], -1675.0,
  "Bright silver streamer sparks produced by combustion of atomized aluminum powder.", "combustion");

// Section 4: Chlorate & Perchlorate Pyrotechnics / Colored Flames (31-40)
add("pyro-naclo3-c", "Sodium chlorate and charcoal combustion",
  ["naclo3", "c"], ["nacl", "co2"], -760.0,
  "Vigorous deflagration yielding sodium chloride and carbon dioxide.", "combustion");

add("pyro-sr-clo3-2-decomp", "Strontium chlorate pyrotechnic thermal decomposition",
  ["sr-clo3-2"], ["srcl2", "o2"], -130.0,
  "Thermal decomposition liberating oxygen and volatile red flame emitter SrCl2.", "decomposition");

add("pyro-ba-clo3-2-c", "Barium chlorate and charcoal green pyrotechnic combustion",
  ["ba-clo3-2", "c"], ["bacl2", "co2"], -820.0,
  "Green star composition deflagrating to produce vibrant emerald green BaCl emission.", "combustion");

add("pyro-ba-clo3-2-s", "Barium chlorate and sulfur green firework deflagration",
  ["ba-clo3-2", "s"], ["bacl2", "so2"], -780.0,
  "Classic 19th-century green pyrotechnic composition releasing sulfur dioxide.", "combustion");

add("pyro-flare-sr-clo3-2-c", "Strontium chlorate and charcoal red firework combustion",
  ["sr-clo3-2", "c"], ["srcl2", "co2"], -810.0,
  "Spectacular crimson firework star formulation releasing strontium chloride.", "combustion");

add("pyro-flare-sr-clo3-2-s", "Strontium chlorate and sulfur red pyrotechnic deflagration",
  ["sr-clo3-2", "s"], ["srcl2", "so2"], -775.0,
  "Vigorous deflagration producing brilliant deep red flame color.", "combustion");

add("pyro-kclo3-al", "Potassium chlorate and aluminum flash deflagration",
  ["kclo3", "al"], ["al2o3", "kcl"], -1410.0,
  "Extremely sensitive explosive flash powder deflagrating with concussive shockwave.", "combustion");

add("pyro-naclo3-al", "Sodium chlorate and aluminum flash reaction",
  ["naclo3", "al"], ["al2o3", "nacl"], -1390.0,
  "Concussive flash reaction producing molten alumina and incandescent vapor.", "combustion");

add("pyro-naclo3-s", "Sodium chlorate and sulfur pyrotechnic deflagration",
  ["naclo3", "s"], ["nacl", "so2"], -690.0,
  "Rapid friction-sensitive deflagration emitting sulfur dioxide and yellow flame.", "combustion");

add("pyro-naclo3-mg", "Sodium chlorate and magnesium flash composition",
  ["naclo3", "mg"], ["mgo", "nacl"], -1650.0,
  "Intensely bright flash powder producing dense white smoke and yellow emission.", "combustion");

// Section 5: Perchlorate Deflagrations & Whistles (41-50)
add("pyro-naclo4-c", "Sodium perchlorate and carbon deflagration",
  ["naclo4", "c"], ["nacl", "co2"], -790.0,
  "High-energy pyrotechnic propellant deflagration.", "combustion");

add("pyro-naclo4-mg", "Sodium perchlorate and magnesium flash powder",
  ["naclo4", "mg"], ["mgo", "nacl"], -2150.0,
  "Photoflash charge producing intense light pulse and concussive sound report.", "combustion");

add("pyro-flash-al-ba-clo3-2", "Aluminum and barium chlorate green flash deflagration",
  ["al", "ba-clo3-2"], ["al2o3", "bacl2"], -2680.0,
  "Green photoflash and salute composition deflagrating with brilliant flash and loud report.", "combustion");

add("pyro-liclo4-s", "Lithium perchlorate and sulfur deflagration",
  ["liclo4", "s"], ["licl", "so2"], -740.0,
  "Deflagration producing lithium chloride and sulfur dioxide.", "combustion");

add("pyro-liclo4-al", "Lithium perchlorate and aluminum high-energy propellant deflagration",
  ["liclo4", "al"], ["al2o3", "licl"], -3320.0,
  "Extremely energy-dense aluminized rocket propellant reaction.", "combustion");

add("pyro-liclo4-mg", "Lithium perchlorate and magnesium flash reaction",
  ["liclo4", "mg"], ["mgo", "licl"], -2210.0,
  "High-output illuminating flash powder reaction.", "combustion");

add("pyro-whistle-kclo4-benzoate", "Potassium perchlorate and potassium benzoate whistle mix",
  ["kclo4", "c6h5cook"], ["kcl", "k2co3", "co2", "water"], -2850.0,
  "Acoustic whistle composition burning in oscillatory waves inside open tubes.", "combustion");

add("pyro-kclo3-ti", "Potassium chlorate and titanium spark reaction",
  ["kclo3", "ti"], ["tio2", "kcl"], -1850.0,
  "Pyrotechnic fountain composition releasing white-hot incandescent titanium sparks.", "combustion");

add("pyro-naclo3-ti", "Sodium chlorate and titanium fountain reaction",
  ["naclo3", "ti"], ["tio2", "nacl"], -1820.0,
  "Fountain and wheel composition producing brilliant titanium sparks.", "combustion");

add("pyro-naclo4-ti", "Sodium perchlorate and titanium igniter reaction",
  ["naclo4", "ti"], ["tio2", "nacl"], -1910.0,
  "High-brisance pyrotechnic igniter reaction producing titanium dioxide slag.", "combustion");

// Section 6: Zirconium, Boron, Silicon Chlorate/Perchlorates (51-60)
add("pyro-kclo3-zr", "Potassium chlorate and zirconium flash reaction",
  ["kclo3", "zr"], ["zro2", "kcl"], -2120.0,
  "High-brisance primer and detonator ignition formulation.", "combustion");

add("pyro-naclo3-zr", "Sodium chlorate and zirconium flash reaction",
  ["naclo3", "zr"], ["zro2", "nacl"], -2090.0,
  "Zirconium flash reaction generating intense radiant thermal pulse.", "combustion");

add("pyro-naclo4-zr", "Sodium perchlorate and zirconium pyrotechnic reaction",
  ["naclo4", "zr"], ["zro2", "nacl"], -2200.0,
  "High-heat primer mix yielding refractory zirconia and sodium chloride.", "combustion");

add("pyro-kclo3-b", "Potassium chlorate and boron igniter reaction",
  ["kclo3", "b"], ["b2o3", "kcl"], -1540.0,
  "Electric match composition yielding glassy B2O3 matrix.", "combustion");

add("pyro-naclo3-b", "Sodium chlorate and boron pyrotechnic reaction",
  ["naclo3", "b"], ["b2o3", "nacl"], -1520.0,
  "Hot-wire igniter composition deflagrating with high calorific output.", "combustion");

add("pyro-naclo4-b", "Sodium perchlorate and boron high-energy igniter",
  ["naclo4", "b"], ["b2o3", "nacl"], -4150.0,
  "Aerospace squib igniter formulation deflagrating to boron trioxide.", "combustion");

add("pyro-kclo3-si", "Potassium chlorate and silicon delay composition",
  ["kclo3", "si"], ["sio2", "kcl"], -1460.0,
  "Gasless delay element deflagrating smoothly without bursting confining casing.", "combustion");

add("pyro-naclo3-si", "Sodium chlorate and silicon delay reaction",
  ["naclo3", "si"], ["sio2", "nacl"], -1430.0,
  "Slow-burning pyrotechnic delay composition.", "combustion");

add("pyro-naclo4-si", "Sodium perchlorate and silicon pyrotechnic combustion",
  ["naclo4", "si"], ["sio2", "nacl"], -1520.0,
  "Thermite-like delay formulation producing fused silica slag.", "combustion");

add("pyro-kclo3-zn", "Potassium chlorate and zinc pyrotechnic reaction",
  ["kclo3", "zn"], ["zno", "kcl"], -980.0,
  "Smoke generation and flare composition producing zinc oxide.", "combustion");

// Section 7: Solid & Liquid Rocket Propellants (61-70)
add("pyro-naclo3-zn", "Sodium chlorate and zinc smoke propellant reaction",
  ["naclo3", "zn"], ["zno", "nacl"], -960.0,
  "Pyrotechnic screening smoke mixture generating dense zinc oxide cloud.", "combustion");

add("pyro-naclo4-zn", "Sodium perchlorate and zinc pyrotechnic reaction",
  ["naclo4", "zn"], ["zno", "nacl"], -1420.0,
  "High-temperature smoke and flare composition.", "combustion");

add("pyro-naclo4-fe", "Sodium perchlorate and iron thermitic deflagration",
  ["naclo4", "fe"], ["fe2o3", "nacl"], -2410.0,
  "Thermitic pyrotechnic heating charge for field rations and emergency heaters.", "combustion");

add("pyro-apcp-mg-nh4clo4", "Ammonium perchlorate and magnesium propellant deflagration",
  ["nh4clo4", "mg"], ["mgo", "mgcl2", "n2", "water"], -2460.0,
  "Magnesium-fueled composite solid rocket propellant burning with dazzling white exhaust.", "combustion");

add("pyro-kndx-glucose", "Potassium nitrate and glucose amateur rocket propellant (KNDX)",
  ["kno3", "c6h12o6"], ["k2co3", "n2", "co2", "water"], -6450.0,
  "Caramel candy rocket propellant burning to yield dense steam and smoke exhaust.", "combustion");

add("pyro-ancp-mg-nh4no3", "Ammonium nitrate and magnesium composite propellant",
  ["nh4no3", "mg"], ["mgo", "n2", "water"], -710.0,
  "Smokeless solid rocket propellant formulation utilizing energetic ammonium nitrate.", "combustion");

add("pyro-ancp-al-nh4no3", "Ammonium nitrate and aluminum composite propellant",
  ["nh4no3", "al"], ["al2o3", "n2", "water"], -2180.0,
  "Aluminized ammonium nitrate solid propellant producing high specific impulse.", "combustion");

add("pyro-hypergolic-n2h4-n2o4", "Hydrazine and dinitrogen tetroxide hypergolic propellant combustion",
  ["n2h4", "n2o4"], ["n2", "water"], -1049.0,
  "Spontaneous hypergolic combustion powering spacecraft orbital maneuvering and attitude control thrusters.", "combustion");

add("pyro-ap-boron", "Ammonium perchlorate and boron high-energy propellant reaction",
  ["nh4clo4", "b"], ["b2o3", "bcl3", "n2", "water"], -3280.0,
  "High-density boron-loaded solid propellant for ramjet and missile propulsion.", "combustion");

add("pyro-thermite-cu2o-mg", "Copper(I) oxide and magnesium thermite reaction",
  ["cu2o", "mg"], ["cu", "mgo"], -420.0,
  "Flash thermite reaction deflagrating with blinding flash and copper vapor.", "redox_other");

// Section 8: Primary Explosives, Initiators & Azides (71-80)
add("pyro-thermite-fe3o4-mg", "Magnetite and magnesium incendiary thermite",
  ["fe3o4", "mg"], ["fe", "mgo"], -1320.0,
  "Incendiary bomb formulation igniting spontaneously at high temperature to produce molten iron.", "redox_other");

add("pyro-detonation-agn3", "Silver azide primary explosive detonation",
  ["agn3"], ["ag", "n2"], -310.0,
  "Detonation of sensitive primary explosive silver azide releasing nitrogen gas shockwave.", "decomposition");

add("pyro-detonation-kn3", "Potassium azide thermal decomposition",
  ["kn3"], ["k", "n2"], -12.0,
  "Controlled thermal decomposition releasing pure spectroscopic grade nitrogen gas.", "decomposition");

add("pyro-detonation-fulminate", "Mercury(II) fulminate primary explosive detonation",
  ["c2hgn2o2_fulminate"], ["hg", "co", "n2"], -480.0,
  "Percussion cap detonation: explosive deflagration-to-detonation transition shattering casing.", "decomposition");

add("pyro-synth-pb-n3-2", "Precipitation synthesis of lead(II) azide",
  ["pbno32", "nan3"], ["pb-n3-2", "nano3"], -28.0,
  "Metathetical precipitation forming dextrinated primary explosive crystals.", "precipitation");

add("pyro-synth-agn3", "Precipitation synthesis of silver azide",
  ["agno3", "nan3"], ["agn3", "nano3"], -32.0,
  "Precipitation of sensitive crystalline silver azide initiator.", "precipitation");

add("pyro-detonation-cu-n3-2-synth", "Precipitation synthesis of copper(II) azide",
  ["cu-no3-2", "nan3"], ["cu-n3-2", "nano3"], -30.0,
  "Formation of hazardous sensitive green copper azide precipitate.", "precipitation");

add("pyro-synth-hn3", "Synthesis of volatile hydrazoic acid from sodium azide",
  ["nan3", "h2so4"], ["hn3", "na2so4"], -45.0,
  "Acidification of sodium azide generating toxic, volatile, explosive hydrazoic acid vapor.", "neutralization");

add("pyro-synth-kn3-kcl", "Metathetical crystallization of potassium azide",
  ["nan3", "kcl"], ["kn3", "nacl"], 8.0,
  "Fractional crystallization separating potassium azide from sodium chloride.", "synthesis");

add("pyro-flame-cu-blue", "Copper(II) nitrate and carbon pyrotechnic combustion",
  ["cu-no3-2", "c"], ["cu", "co2", "no2"], -340.0,
  "Pyrotechnic blue flare combustion emitting characteristic copper chloride/vapor spectra.", "combustion");

// Section 9: Detonation & Combustion of Secondary Explosives (81-90)
add("pyro-detonation-tnt", "Detonation of 2,4,6-trinitrotoluene (TNT)",
  ["c7h5n3o6_tnt"], ["c", "co", "n2", "water"], -1050.0,
  "High explosive detonation: Kistiakowsky-Wilson oxygen-deficient detonation yielding black carbonaceous fireball.", "decomposition");

add("pyro-detonation-ng", "Detonation of liquid nitroglycerin",
  ["c3h5n3o9_nitroglycerin"], ["co2", "water", "n2", "o2"], -1540.0,
  "Positive oxygen balance detonation producing supersonic 7,700 m/s blast wave.", "decomposition");

add("pyro-detonation-rdx", "Detonation of cyclotrimethylenetrinitramine (RDX)",
  ["c3h6n6o6_rdx"], ["co", "n2", "water"], -1120.0,
  "Military high explosive detonation producing 8,750 m/s detonation velocity and immense brisance.", "decomposition");

add("pyro-detonation-hmx", "Detonation of octogen (HMX)",
  ["c4h8n8o8_hmx"], ["co", "n2", "water"], -1510.0,
  "High-density plastic explosive detonation generating 9,100 m/s detonation velocity.", "decomposition");

add("pyro-detonation-petn", "Detonation of pentaerythritol tetranitrate (PETN)",
  ["c5h8n4o12_petn"], ["co2", "co", "n2", "water"], -1490.0,
  "Detonating cord and blasting cap booster detonation yielding intense shockwave.", "decomposition");

add("pyro-detonation-picric", "Detonation of picric acid (2,4,6-trinitrophenol)",
  ["c6h3n3o7_picric"], ["c", "co", "n2", "water"], -980.0,
  "Melinite/Lyddite naval artillery shell detonation releasing toxic yellow smoke.", "decomposition");

add("pyro-anfo-nh4no3-ch3no2", "Detonation of ammonium nitrate and nitromethane (ANNM)",
  ["nh4no3", "ch3no2"], ["n2", "co2", "water"], -2150.0,
  "High-brisance liquid-sensitized ammonium nitrate commercial blasting explosive detonation.", "combustion");

add("pyro-combustion-rdx", "Complete combustion of RDX with excess atmospheric oxygen",
  ["c3h6n6o6_rdx", "o2"], ["co2", "water", "n2"], -2160.0,
  "Incineration and open burning of surplus RDX munitions to harmless gaseous products.", "combustion");

add("pyro-combustion-hmx", "Complete combustion of HMX with excess oxygen",
  ["c4h8n8o8_hmx", "o2"], ["co2", "water", "n2"], -2880.0,
  "Demilitarization thermal destruction of HMX energetic charges.", "combustion");

add("pyro-flash-al-sr-clo3-2", "Aluminum and strontium chlorate red flash deflagration",
  ["al", "sr-clo3-2"], ["al2o3", "srcl2"], -2650.0,
  "Crimson photoflash composition generating brilliant red light and concussion.", "combustion");

// Section 10: Smokes, Strobes & Delays (91-100)
add("pyro-synth-nh4clo3", "Synthesis of unstable ammonium chlorate",
  ["ammonium-chloride", "naclo3"], ["nh4clo3", "nacl"], 12.0,
  "Precipitation of notoriously unstable, spontaneously explosive ammonium chlorate.", "synthesis");

add("pyro-decomp-nh4clo3", "Spontaneous explosive deflagration of ammonium chlorate",
  ["nh4clo3"], ["n2", "cl2", "o2", "water"], -320.0,
  "Hazardous auto-decomposition of NH4ClO3 releasing toxic chlorine gas and oxygen.", "decomposition");

add("pyro-synth-ba-clo3-2", "Metathesis synthesis of barium chlorate",
  ["bacl2", "naclo3"], ["ba-clo3-2", "nacl"], 15.0,
  "Crystallization of barium chlorate green firework oxidizer.", "synthesis");

add("pyro-synth-sr-clo3-2", "Metathesis synthesis of strontium chlorate",
  ["srcl2", "naclo3"], ["sr-clo3-2", "nacl"], 18.0,
  "Synthesis of deliquescent red pyrotechnic oxidizer strontium chlorate.", "synthesis");

add("pyro-synth-nh4clo4", "Metathesis synthesis of ammonium perchlorate",
  ["ammonium-chloride", "naclo4"], ["nh4clo4", "nacl"], 14.0,
  "Industrial precipitation process producing space shuttle rocket booster oxidizer NH4ClO4.", "synthesis");

add("pyro-smoke-kclo3-sugar", "Potassium chlorate and sucrose colored smoke carrier deflagration",
  ["kclo3", "sucrose"], ["kcl", "co2", "water"], -4850.0,
  "Low-temperature burning pyrotechnic composition subliming organic dyes into colored smoke.", "combustion");

add("pyro-delay-sb2s3-kclo3", "Antimony(III) sulfide and potassium chlorate delay mixture",
  ["sb2s3", "kclo3"], ["sb2o3", "so2", "kcl"], -1240.0,
  "Slow-burning delay train and matchhead igniter deflagration.", "combustion");

add("pyro-delay-bi2s3-kclo4", "Bismuth(III) sulfide and potassium perchlorate gasless delay",
  ["bi2s3", "kclo4"], ["bi2o3", "so2", "kcl"], -3850.0,
  "Non-toxic heavy-metal pyrotechnic delay formulation.", "combustion");

add("pyro-delay-si-pbo", "Silicon and lead(II) oxide delay train reaction",
  ["si", "pbo"], ["sio2", "pb"], -380.0,
  "Gasless delay element burning steadily to accurately time explosive fuse trains.", "redox_other");

add("pyro-delay-bacro4-b", "Barium chromate and boron gasless delay reaction",
  ["bacro4", "b"], ["bao", "cr2o3", "b2o3"], -790.0,
  "Precision military ordnance delay element producing zero net gaseous volume change.", "redox_other");

console.log(`Domain 36 complete: ${list.length} reactions validated!`);

if (list.length === 100) {
  const code = `// Domain 36: Energetics, Propellants & Pyrotechnics (100 reactions)
export const DOMAIN_36_REACTIONS = ${JSON.stringify(list, null, 2)};
`;
  fs.writeFileSync(path.join(__dirname, "domain36EnergeticsPyrotechnics.ts"), code);
  console.log(`✓ Wrote 100 reactions to domain36EnergeticsPyrotechnics.ts`);
} else {
  console.error(`Expected 100 reactions, but got ${list.length}`);
}
