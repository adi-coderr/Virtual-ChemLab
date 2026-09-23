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

// Read existing keys from Domain 21, Domain 22, and Domain 23
for (const f of ["domain21Coordination.ts", "domain22Hydrometallurgy.ts", "domain23CatalysisInorganic.ts"]) {
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

function add(id: string, name: string, reactants: string[], products: string[], enthalpy: number, desc: string, type: string = "single_displacement", effects: any[] = []) {
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
// Section 1: Iron Blast Furnace, DRI & Cementite Metallurgy (15)
// =========================================================================
add("pyro-bf-wustite-co-reduction", "Blast furnace reduction: reduction of wüstite by carbon monoxide",
  ["feo", "co"], ["fe", "co2"], -17.0,
  "Indirect reduction in the upper blast furnace shaft at 700-900°C producing solid sponge iron.");

add("pyro-bf-wustite-c-reduction", "Blast furnace direct reduction: endothermic reduction of wüstite by coke carbon",
  ["feo", "c"], ["fe", "co"], 155.0,
  "Direct reduction zone at >1000°C where wüstite reacts directly with solid metallurgical coke.");

add("pyro-bf-cementite-wustite-redox", "High-temperature reaction of iron carbide (cementite) with wüstite",
  ["fe3c", "feo"], ["fe", "co"], 170.0,
  "Decarburization of molten iron droplets falling through wüstite-rich smelting slag.");

add("pyro-dri-wustite-h2-reduction", "Direct Reduced Iron (DRI) process: reduction of wüstite by hydrogen",
  ["feo", "h2"], ["fe", "water"], 25.0,
  "Green steelmaking in Energiron/Midrex shaft furnaces using clean electrolytic hydrogen.");

add("pyro-bf-desulfurization-lime-coke", "Blast furnace hearth desulfurization: partitioning of sulfur into basic slag",
  ["fes", "cao", "c"], ["fe", "cas", "co"], 115.0,
  "Capture of iron sulfide by lime in reducing slag creating calcium sulfide.");

add("pyro-bf-direct-reduction-magnetite-c", "Carbothermic reduction of magnetite by coke to iron",
  ["fe3o4", "c"], ["fe", "co"], 640.0,
  "Direct carbothermic smelting of magnetite iron ore in hearth zone.");

add("pyro-bf-carbon-iron-cementite", "Solid-state carburization: formation of cementite from iron and carbon",
  ["fe", "c"], ["fe3c"], 25.0,
  "Dissolution of carbon into austenite lattice forming cementite in pig iron.", "synthesis");

add("pyro-dri-hematite-ch4-reforming", "Methane-based Direct Reduced Iron: reduction of hematite by natural gas",
  ["fe2o3", "ch4"], ["fe", "co", "water"], 215.0,
  "Midrex process shaft reduction utilizing in-situ reformed methane to reduce iron ore pellets.");

add("pyro-dri-magnetite-ch4-reforming", "Methane direct reduction: reduction of magnetite iron ore by natural gas",
  ["fe3o4", "ch4"], ["fe", "co2", "water"], 310.0,
  "Natural gas DRI reduction of magnetite concentrates generating hot DRI sponge iron.");

add("pyro-dri-wustite-ch4-reforming", "Methane reduction of wüstite in fluidized bed DRI reactors",
  ["feo", "ch4"], ["fe", "co", "h2"], 190.0,
  "Fluidized bed iron ore reduction using natural gas.");

add("pyro-bf-cementite-co2-decarb", "Decarburization of cementite by carbon dioxide in top gas",
  ["fe3c", "co2"], ["fe", "co"], 150.0,
  "Gas-solid decarburization of high-carbon iron pellets.");

add("pyro-bf-cementite-hematite-redox", "High-temperature reaction between cementite and hematite ore",
  ["fe3c", "fe2o3"], ["fe", "co"], 495.0,
  "Direct solid-state reduction producing low-carbon sponge iron.");

add("pyro-bf-cementite-magnetite-redox", "Reaction of cementite with magnetite ore in ironmaking smelting hearth",
  ["fe3c", "fe3o4"], ["fe", "co"], 680.0,
  "Redox reaction generating carbon monoxide and liquid iron.");

add("pyro-bf-wustite-hcl-pickling", "Hydrochloric acid pickling of wüstite mill scale from hot-rolled steel strip",
  ["feo", "hcl"], ["fecl2", "water"], -110.0,
  "Continuous steel strip pickling bath dissolving iron oxide scale.", "metathesis");

add("pyro-bf-wustite-h2so4-pickling", "Sulfuric acid pickling of wüstite surface scale",
  ["feo", "h2so4"], ["feso4", "water"], -125.0,
  "Hot sulfuric acid dissolution of wüstite scale generating copperas byproduct.", "metathesis");

// =========================================================================
// Section 2: Blast Furnace Slags, BOS Steelmaking & Ladle Refining (15)
// =========================================================================
add("pyro-slag-casio3-formation", "Blast furnace slag formation: fluxing of silica gangue by calcined lime",
  ["cao", "sio2"], ["casio3"], -90.0,
  "Primary slag-forming neutralization reaction generating molten calcium metasilicate.", "synthesis");

add("pyro-slag-mgsio3-enstatite", "Dolomitic blast furnace slag: fluxing of silica gangue by magnesium oxide",
  ["mgo", "sio2"], ["mgsio3_enstatite"], -75.0,
  "Addition of dolomitic lime (MgO) generating fluid enstatite slag with low viscosity.", "synthesis");

add("pyro-slag-fe2sio4-fayalite", "Acidic iron smelting slag: formation of fayalite from wüstite and silica",
  ["feo", "sio2"], ["fe2sio4_fayalite"], -38.0,
  "Key iron silicate slag formed during non-ferrous smelting and blast furnace hearth operations.", "synthesis");

add("pyro-ladle-deoxidation-silicon", "Ladle steel deoxidation: silicon killing of dissolved wüstite in molten steel",
  ["feo", "si"], ["fe", "sio2"], -315.0,
  "Silicon deoxidation preventing CO gas blowhole porosity in killed steel ingots.");

add("pyro-ladle-deoxidation-ferrosilicon", "Ladle steel deoxidation: treatment of wüstite using ferrosilicon alloy",
  ["feo", "fesi"], ["fe", "sio2"], -260.0,
  "Addition of commercial 75% ferrosilicon to tap stream deoxidizing steel and augmenting iron yield.");

add("pyro-ladle-deoxidation-casi2", "Ladle steel deoxidation & slagging by calcium silicide alloy",
  ["feo", "casi2"], ["fe", "cao", "si"], -420.0,
  "Wire injection of calcium silicide providing deep deoxidation and calcium vapor micro-cleansing.");

add("pyro-steel-desulfurization-manganese", "Steel ladle desulfurization: manganese scavenging of iron sulfide",
  ["fes", "mn"], ["fe", "mns"], -55.0,
  "Alloying manganese to prevent hot-shortness by substituting FeS with high-melting globular MnS inclusions.");

add("pyro-slag-mnsio3-rhodonite", "Silicomanganese steel slag: formation of rhodonite from manganese oxide and silica",
  ["mno_oxide", "sio2"], ["mnsio3"], -48.0,
  "Formation of manganese metasilicate slag during high-carbon ferromanganese smelting.", "synthesis");

add("pyro-slag-caal2o4-krotite", "Calcium aluminate synthetic ladle refining slag formation",
  ["cao", "al2o3"], ["caal2o4"], -25.0,
  "Premelted calcium aluminate flux producing desulfurizing fluid top slag in ladle refining furnaces.", "synthesis");

add("pyro-bos-decarburization-oxygen", "Basic Oxygen Furnace (BOF): supersonic oxygen lancing decarburizing molten cementite",
  ["fe3c", "o2"], ["fe", "co"], -480.0,
  "High-velocity top-blown pure oxygen jet burning dissolved carbon out of hot metal in 15 minutes.");

add("pyro-steel-manganese-slagging", "BOF steelmaking: oxidation of dissolved manganese into slag by wüstite",
  ["mn", "feo"], ["mno_oxide", "fe"], -125.0,
  "Early oxidation stage in oxygen converter transferring manganese into slag phase.");

add("pyro-ladle-aluminum-deoxidation", "Ladle deoxidation: aluminum killing of dissolved wüstite in molten steel",
  ["feo", "al"], ["fe", "al2o3"], -850.0,
  "Addition of aluminum wire or notch-bars producing ultra-clean deep-drawing steel.");

add("pyro-wustite-carbonation-siderite", "Solid-state carbonation of wüstite to siderite",
  ["feo", "co2"], ["feco3"], -85.0,
  "Mineral carbonation capturing carbon dioxide with iron oxide.", "synthesis");

add("pyro-wustite-nitrate-dissolution", "Nitric acid dissolution of wüstite generating iron(II) nitrate",
  ["feo", "hno3"], ["fe-no3-2", "water"], -130.0,
  "Dissolution of wüstite in non-oxidizing dilute nitric acid.", "metathesis");

add("pyro-slag-iron-silicide-deoxidation", "Deoxidation of wüstite by calcium silicide in presence of silica flux",
  ["casi2", "sio2"], ["casio3", "si"], -180.0,
  "Slag-metal interface reaction regenerating silicon during ladle refining.", "single_displacement");

// =========================================================================
// Section 3: Copper Matte Smelting, Converting & Fire Refining (14)
// =========================================================================
add("pyro-cu-converting-blister-reaction", "Peirce-Smith converter: blister copper formation from chalcocite and cuprous oxide",
  ["cu2s", "cu2o"], ["cu", "so2"], 115.0,
  "Classic 'copper blow' reaction where chalcocite reacts with cuprite producing blister copper.");

add("pyro-cu-pyrite-smelting-dissoc", "Flash smelting furnace: thermal decomposition and partial combustion of pyrite",
  ["fes2", "o2"], ["fes", "so2"], -440.0,
  "Pyrite in chalcopyrite copper concentrate burning in suspension shaft.");

add("pyro-cu-covellite-thermal-dissoc", "Smelting furnace suspension: thermal dissociation of covellite to chalcocite",
  ["cus"], ["cu2s", "s"], 90.0,
  "Endothermic flash dissociation of covellite releasing elemental sulfur vapor.", "decomposition");

add("pyro-cu-fire-refining-poling-c", "Anode furnace fire refining: green wood poling reduction of dissolved Cu2O by carbon",
  ["cu2o", "c"], ["cu", "co"], 140.0,
  "Traditional poling inserting green pine logs into molten blister copper to deoxidize bath.");

add("pyro-cu-matte-desulfurization-lime", "Copper matte desulfurization with calcined lime flux and coke",
  ["cu2s", "cao", "c"], ["cu", "cas", "co"], 210.0,
  "Pyrometallurgical desulfurization partitioning sulfur into calcium sulfide slag.");

add("pyro-cu-sulfate-roast-reaction", "Copper roast-reaction: interaction of chalcocite with copper(II) sulfate",
  ["cu2s", "cuso4"], ["cu", "so2"], 290.0,
  "Direct roast-reaction producing metallic copper and concentrated sulfur dioxide.");

add("pyro-cu-matte-iron-precipitation", "Precipitation smelting: displacement of copper from molten chalcocite by metallic iron",
  ["cu2s", "fe"], ["cu", "fes"], -60.0,
  "Historical precipitation process recovering copper metal from sulfidic matte using scrap iron.");

add("pyro-cu-covellite-iron-precipitation", "Kern's reaction: reduction of covellite by scrap iron in matte smelting",
  ["cus", "fe"], ["cu", "fes"], -75.0,
  "High-temperature displacement of copper by iron in reverberatory smelting furnaces.");

add("pyro-cu-cuprite-iron-reduction", "Reduction of molten copper(I) oxide by iron",
  ["cu2o", "fe"], ["cu", "feo"], -115.0,
  "Slag-metal equilibrium reducing copper oxide into metal phase while slagging iron.");

add("pyro-cu-cupric-iron-reduction", "Direct reduction of copper(II) oxide by metallic iron",
  ["cuo", "fe"], ["cu", "feo"], -145.0,
  "Exothermic slag reduction reaction recovering copper values.");

add("pyro-cu-cuprite-methane-poling", "Gaseous anode fire-refining: deoxidation of cuprite by reformed natural gas (methane)",
  ["cu2o", "ch4"], ["cu", "co", "h2"], 165.0,
  "Modern tuyere injection of natural gas deoxidizing molten copper anodes before casting.");

add("pyro-cu-cupric-methane-reduction", "Reduction of copper(II) oxide by methane gas",
  ["cuo", "ch4"], ["cu", "co", "water"], -95.0,
  "Gas-phase reduction of copper calcine by natural gas.");

add("pyro-cu-chalcopyrite-cupric-chloride-roast", "Cupric chloride chloridizing roast of chalcopyrite concentrate",
  ["cufes2_chalcopyrite", "cucl2"], ["cucl", "fecl2", "s"], -85.0,
  "Low-temperature chloridizing roast converting chalcopyrite into cuprous chloride.");

add("pyro-cu-chalcopyrite-ferric-chloride-roast", "Ferric chloride chlorination roast of chalcopyrite ore",
  ["cufes2_chalcopyrite", "fecl3"], ["cucl2", "fecl2", "s"], -110.0,
  "Non-oxidative chlorination yielding cupric and ferrous chlorides.");

// =========================================================================
// Section 4: Zinc, Lead, Tin & Antimony Pyrometallurgy (14)
// =========================================================================
add("pyro-zn-co-reduction-retort", "Vertical retort zinc smelting: reduction of zinc oxide by carbon monoxide",
  ["zno", "co"], ["zn", "co2"], 65.0,
  "Gas-phase reduction in zinc retort furnace distilling zinc vapor.");

add("pyro-pb-roast-reaction-sulfate", "Direct smelting roast-reaction: interaction of galena with lead(II) sulfate",
  ["pbs", "pbso4"], ["pb", "so2"], 410.0,
  "Autogenous high-temperature reaction yielding metallic lead and concentrated SO2 gas.");

add("pyro-pb-iron-precipitation-smelting", "Lead blast furnace: iron precipitation reduction of galena ore",
  ["pbs", "fe"], ["pb", "fes"], -15.0,
  "Historical precipitation process where iron scrap reduces galena directly in shaft furnace.");

add("pyro-pb-litharge-iron-reduction", "Reduction of molten litharge (PbO) by metallic iron",
  ["pbo", "fe"], ["pb", "feo"], -70.0,
  "Slag cleaning reduction recovering metallic lead from lead-bearing smelting slag.");

add("pyro-pb-litharge-methane-reduction", "Methane reduction of lead(II) oxide calcine",
  ["pbo", "ch4"], ["pb", "co", "water"], -45.0,
  "Gaseous reduction of lead oxide by natural gas.");

add("pyro-pb-sulfate-co-reduction", "Reduction of lead(II) sulfate by carbon monoxide in smelting shaft",
  ["pbso4", "co"], ["pb", "co2", "so2"], 190.0,
  "Shaft furnace reduction of recycled battery paste lead sulfate.");

add("pyro-zn-iron-precipitation-reduction", "Zinc smelting: displacement of zinc from sphalerite by molten iron",
  ["zns", "fe"], ["zn", "fes"], 68.0,
  "High-temperature displacement reaction distilling zinc vapor.");

add("pyro-zn-oxide-iron-reduction", "Reduction of zinc oxide by metallic iron at high temperature",
  ["zno", "fe"], ["zn", "feo"], 95.0,
  "Electric arc furnace slag fuming reaction vaporizing zinc from EAF dust.");

add("pyro-zn-oxide-methane-reduction", "Reduction of zinc oxide by methane in vertical retort",
  ["zno", "ch4"], ["zn", "co", "water"], 120.0,
  "Gas-phase carbothermic analog using natural gas reducing agent.");

add("pyro-sn-cassiterite-iron-reduction", "Smelting reduction: reduction of cassiterite ore by scrap iron",
  ["sno2", "fe"], ["sn", "feo"], -25.0,
  "Recovery of tin metal by iron displacement in reverberatory tin slag cleaning.");

add("pyro-sn-stannous-oxide-iron-reduction", "Reduction of stannous oxide slag by iron",
  ["sno", "fe"], ["sn", "feo"], -15.0,
  "Slag fuming reduction yielding crude tin metal.");

add("pyro-sn-cassiterite-methane-reduction", "Reformed natural gas reduction of cassiterite ore",
  ["sno2", "ch4"], ["sn", "co", "water"], 140.0,
  "Fluidized bed reduction of cassiterite concentrates using methane.");

add("pyro-sn-stannous-sulfide-iron-reduction", "Iron precipitation smelting of tin(II) sulfide concentrate",
  ["sns", "fe"], ["sn", "fes"], -35.0,
  "Displacement smelting converting sulfidic tin concentrates into crude tin metal.");

add("pyro-sb-english-precipitation-process", "English precipitation process: iron reduction of stibnite (antimony trisulfide)",
  ["sb2s3", "fe"], ["sb", "fes"], -120.0,
  "Smelting stibnite ore with wrought iron scrap in crucible furnace yielding crude antimony regulus.");

// =========================================================================
// Section 5: Reactive & Refractory Metals (Kroll, Pidgeon, Acheson, Halides) (14)
// =========================================================================
add("pyro-kroll-zirconium-magnesium", "Kroll process for nuclear-grade zirconium: reduction of ZrCl4 by molten magnesium",
  ["zrcl4", "mg"], ["zr", "mgcl2"], -480.0,
  "Reduction of hafnium-free ZrCl4 vapor by molten magnesium producing zirconium sponge for nuclear fuel cladding.");

add("pyro-hunter-zirconium-sodium", "Hunter-type sodium reduction of zirconium tetrachloride",
  ["zrcl4", "na"], ["zr", "nacl"], -780.0,
  "Sodium reduction yielding ductile metallic zirconium sponge.");

add("pyro-chlorination-zirconia", "Carbochlorination of baddeleyite zirconia to zirconium tetrachloride",
  ["zro2", "c", "cl2"], ["zrcl4", "co"], -165.0,
  "Carbochlorination of zirconia and petroleum coke under chlorine gas flow.", "synthesis");

add("pyro-titanium-nitriding", "High-temperature synthesis of ultra-hard titanium nitride ceramic",
  ["ti", "n2"], ["tin"], -338.0,
  "Direct thermal nitridation of titanium at 1200°C forming golden wear-resistant TiN coating.", "synthesis");

add("pyro-pidgeon-magnesium-reduction", "Pidgeon process: retort reduction of calcined dolomite (MgO) by ferrosilicon",
  ["mgo", "fesi"], ["mg", "sio2", "fe"], 185.0,
  "Vacuum retort reduction at 1150°C and 0.1 Torr distilling high-purity magnesium vapor.");

add("pyro-pidgeon-silicothermic-direct", "Silicothermic Pidgeon process: direct reduction of magnesium oxide by silicon",
  ["mgo", "si"], ["mg", "sio2"], 195.0,
  "Vacuum distillation reduction of magnesia using metallurgical silicon.");

add("pyro-carbothermic-magnesium-radenthein", "Radenthein process: high-temperature carbothermic reduction of magnesia",
  ["mgo", "c"], ["mg", "co"], 610.0,
  "Electric arc furnace reduction of MgO at 2200°C shock-quenched with cold natural gas.");

add("pyro-acheson-silicon-carbide", "Acheson process: electric resistance synthesis of silicon carbide (Carborundum)",
  ["sio2", "c"], ["sic", "co"], 500.0,
  "High-temperature synthesis in electric resistance core furnaces at 2000°C yielding refractory SiC crystals.", "synthesis");

add("pyro-carbochlorination-silicon", "Fluidized bed carbochlorination of silica to silicon tetrachloride",
  ["sio2", "c", "cl2"], ["sicl4", "co"], -240.0,
  "High-temperature carbochlorination generating silicon tetrachloride precursor for optical fibers.", "synthesis");

add("pyro-carbochlorination-alumina", "Carbochlorination of calcined bauxite alumina to anhydrous aluminum chloride",
  ["al2o3", "c", "cl2"], ["alcl3", "co"], -210.0,
  "Carbochlorination process producing anhydrous AlCl3 Lewis acid catalyst.", "synthesis");

add("pyro-magnesium-silicon-reduction", "Kroll-type reduction of silicon tetrachloride by magnesium metal",
  ["sicl4", "mg"], ["si", "mgcl2"], -380.0,
  "Vapor-phase reduction producing ultra-fine silicon powder and recoverable magnesium chloride.");

add("pyro-kroll-vanadium-tetrachloride", "Kroll-type reduction of vanadium tetrachloride by molten magnesium",
  ["vcl4", "mg"], ["v", "mgcl2"], -440.0,
  "Inert gas reduction producing ductile metallic vanadium.");

add("pyro-fumed-silica-sicl4-water", "Aerosil process: flame hydrolysis of silicon tetrachloride to fumed silica",
  ["sicl4", "water"], ["sio2", "hcl"], -145.0,
  "High-temperature oxyhydrogen flame hydrolysis synthesizing nanostructured pyrogenic silica.", "metathesis");

add("pyro-sicl4-vapor-oxidation", "Direct vapor-phase oxidation of silicon tetrachloride to silica",
  ["sicl4", "o2"], ["sio2", "cl2"], -170.0,
  "Gas-phase oxidation generating synthetic vitreous silica and recyclable chlorine gas.");

// =========================================================================
// Section 6: CVD Halide Metallurgy & Oxide Reductions (14)
// =========================================================================
add("pyro-cvd-tungsten-wf6-h2", "Semiconductor CVD: chemical vapor deposition of tungsten contact plugs from WF6 and H2",
  ["wf6", "h2"], ["w", "hf"], -88.0,
  "Low-pressure CVD at 450°C filling contact vias in silicon integrated circuits.");

add("pyro-wf6-hydrolysis-wo3", "Aqueous / steam hydrolysis of tungsten hexafluoride to tungsten trioxide",
  ["wf6", "water"], ["wo3", "hf"], -195.0,
  "Scrubber absorption of waste WF6 offgases producing hydrous tungsten oxide.", "metathesis");

add("pyro-tungsten-trioxide-ch4", "Natural gas reduction of tungsten trioxide to metallic tungsten powder",
  ["wo3", "ch4"], ["w", "co", "water"], 220.0,
  "Hydrocarbon reduction producing fine tungsten powder for wear-resistant hardmetals.");

add("pyro-molybdenum-trioxide-ch4", "Methane reduction of molybdenum trioxide to molybdenum powder",
  ["moo3", "ch4"], ["mo", "co", "water"], 190.0,
  "Natural gas reduction of MoO3 in rotary kilns.");

add("pyro-vanadium-trioxide-c", "Carbothermic reduction of vanadium(III) oxide to metallic vanadium",
  ["v2o3", "c"], ["v", "co"], 540.0,
  "Vacuum furnace reduction of V2O3 producing vanadium metal for master alloys.");

add("pyro-vanadium-trioxide-h2", "Hydrogen reduction of vanadium(III) oxide",
  ["v2o3", "h2"], ["v", "water"], 185.0,
  "High-temperature gas-phase reduction of vanadium sesquioxide.");

add("pyro-vanadium-trioxide-ch4", "Methane reduction of vanadium(III) oxide to metallic vanadium",
  ["v2o3", "ch4"], ["v", "co", "water"], 260.0,
  "Hydrocarbon reduction of vanadium oxide.");

add("pyro-vanadium-pentoxide-ch4", "Direct reduction of vanadium pentoxide by methane",
  ["v2o5", "ch4"], ["v", "co", "water"], 420.0,
  "Natural gas direct reduction of vanadium pentoxide flake.");

add("pyro-vanadium-pentoxide-co", "Indirect reduction of vanadium pentoxide by carbon monoxide",
  ["v2o5", "co"], ["v", "co2"], -120.0,
  "Gas-phase reduction in vanadium smelting shafts.");

add("pyro-thermite-cobalt-reduction", "Aluminothermic reduction of cobalt(II) oxide to metallic cobalt",
  ["coo", "al"], ["cobalt-metal", "al2o3"], -840.0,
  "Aluminothermic reduction producing high-purity cobalt metal for magnetic materials.");

add("pyro-thermite-cuprous-reduction", "Thermite reduction of copper(I) oxide by aluminum",
  ["cu2o", "al"], ["cu", "al2o3"], -1120.0,
  "Exothermic pyrotechnic reaction generating molten copper.");

add("pyro-thermite-molybdenum-reduction", "Aluminothermic extraction of pure molybdenum from molybdenum trioxide",
  ["moo3", "al"], ["mo", "al2o3"], -930.0,
  "Thermite reduction yielding ductile carbon-free molybdenum metal.");

add("pyro-thermite-tungsten-reduction", "Aluminothermic reduction of tungsten trioxide to metallic tungsten",
  ["wo3", "al"], ["w", "al2o3"], -880.0,
  "High-temperature extraction producing refractory tungsten metal.");

add("pyro-thermite-magnetite-aluminothermic", "Thermite reduction: aluminothermic reduction of magnetite iron ore",
  ["fe3o4", "al"], ["fe", "al2o3"], -3340.0,
  "High-energy pyrotechnic incendiary and field rail welding thermite formulation.");

// =========================================================================
// Section 7: Van Arkel - de Boer Refining & Vapor Transport Metallurgy (14)
// =========================================================================
add("pyro-van-arkel-titanium-synthesis", "Van Arkel - de Boer process Step 1: formation of volatile titanium(IV) iodide",
  ["ti", "i2"], ["tii4"], -375.0,
  "Lower temperature synthesis at 250°C reacting crude titanium sponge with iodine vapor.", "synthesis");

add("pyro-van-arkel-titanium-dissociation", "Van Arkel - de Boer process Step 2: thermal dissociation of TiI4 on hot tungsten filament",
  ["tii4"], ["ti", "i2"], 375.0,
  "High-temperature dissociation at 1400°C depositing ultra-pure ductile crystal bar titanium.", "decomposition");

add("pyro-van-arkel-zirconium-synthesis", "Van Arkel - de Boer refining: formation of volatile zirconium(IV) iodide",
  ["zr", "i2"], ["zri4"], -490.0,
  "Reaction of crude zirconium sponge with iodine vapor at 300°C.", "synthesis");

add("pyro-van-arkel-zirconium-dissociation", "Van Arkel - de Boer refining: thermal dissociation of ZrI4 on hot filament",
  ["zri4"], ["zr", "i2"], 490.0,
  "Dissociation at 1300°C depositing nuclear-grade ductility zirconium crystal bars.", "decomposition");

add("pyro-germanium-hydrogen-reduction", "Hydrogen reduction of electronic-grade germanium dioxide to semiconductor germanium",
  ["geo2", "h2"], ["ge", "water"], 75.0,
  "Tube furnace reduction at 650°C producing intrinsic germanium ingots for zone refining.");

add("pyro-germanium-carbothermic-reduction", "Carbothermic reduction of germanium dioxide",
  ["geo2", "c"], ["ge", "co"], 285.0,
  "High-temperature carbothermic reduction producing crude germanium.");

add("pyro-antimony-hydrogen-reduction", "Hydrogen reduction of antimony trioxide to pure antimony regulus",
  ["sb2o3", "h2"], ["sb", "water"], 145.0,
  "Gas-phase reduction under dry hydrogen flow.");

add("pyro-antimony-carbothermic-reduction", "Blast furnace smelting of stibnite calcine: carbothermic reduction of antimony trioxide",
  ["sb2o3", "c"], ["sb", "co"], 420.0,
  "Shaft furnace reduction of Sb2O3 calcine with metallurgical charcoal yielding antimony regulus.");

add("pyro-antimony-co-reduction", "Reduction of antimony trioxide calcine by carbon monoxide",
  ["sb2o3", "co"], ["sb", "co2"], 110.0,
  "Indirect reduction in antimony blast furnace.");

add("pyro-antimony-stibnite-direct-roast", "Direct roast-reduction of stibnite with oxygen",
  ["sb2s3", "o2"], ["sb", "so2"], -580.0,
  "Roast-reduction of antimony trisulfide concentrates generating metallic antimony.");

add("pyro-chromium-carbothermic-reduction", "Electric arc furnace reduction: carbothermic synthesis of high-carbon ferrochrome",
  ["cr2o3", "c"], ["cr", "co"], 780.0,
  "Submerged arc furnace smelting of chromite ore producing ferrochrome master alloy for stainless steel.");

add("pyro-chromium-co-reduction", "Indirect reduction of chromium(III) oxide by carbon monoxide",
  ["cr2o3", "co"], ["cr", "co2"], 260.0,
  "Shaft reduction of chromite pre-reduced pellets.");

add("pyro-hall-heroult-anode-combustion", "Hall-Héroult molten salt electrowinning: net cell carbothermic consumption of carbon anodes",
  ["al2o3", "c"], ["al", "co2"], 1080.0,
  "Net overall cell reaction in cryolite bath at 960°C producing aluminum metal and CO2.");

add("pyro-stannous-oxide-hno3-dissolution", "Nitric acid dissolution of stannous oxide calcines",
  ["sno", "hno3"], ["sn-no3-2", "water"], -115.0,
  "Acid leaching of stannous oxide generating tin(II) nitrate solution.", "metathesis");

console.log(`\nDomain 24 complete: ${list.length} reactions validated!`);

const outPath = path.resolve(__dirname, "domain24PyrometallurgySmelting.ts");
const code = `import type { ReactionDefinition } from "./types.js";

// Domain 24: High-Temperature Smelting & Blast Furnace Pyrometallurgy (100 reactions)
export const DOMAIN_24_PYROMETALLURGY_REACTIONS: ReactionDefinition[] = ${JSON.stringify(list, null, 2)};
`;

fs.writeFileSync(outPath, code, "utf8");
console.log(`✓ Wrote ${list.length} reactions to domain24PyrometallurgySmelting.ts\n`);
