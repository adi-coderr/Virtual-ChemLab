import type { ReactionDefinition } from "./types.js";

// Domain 24: High-Temperature Smelting & Blast Furnace Pyrometallurgy (100 reactions)
export const DOMAIN_24_PYROMETALLURGY_REACTIONS: ReactionDefinition[] = [
  {
    "id": "pyro-bf-wustite-co-reduction",
    "name": "Blast furnace reduction: reduction of wüstite by carbon monoxide",
    "reactants": [
      "feo",
      "co"
    ],
    "products": [
      "fe",
      "co2"
    ],
    "enthalpy": -17,
    "desc": "Indirect reduction in the upper blast furnace shaft at 700-900°C producing solid sponge iron.",
    "type": "single_displacement",
    "effects": [],
    "net": "FeO + CO → Fe + CO2"
  },
  {
    "id": "pyro-bf-wustite-c-reduction",
    "name": "Blast furnace direct reduction: endothermic reduction of wüstite by coke carbon",
    "reactants": [
      "feo",
      "c"
    ],
    "products": [
      "fe",
      "co"
    ],
    "enthalpy": 155,
    "desc": "Direct reduction zone at >1000°C where wüstite reacts directly with solid metallurgical coke.",
    "type": "single_displacement",
    "effects": [],
    "net": "FeO + C → Fe + CO"
  },
  {
    "id": "pyro-bf-cementite-wustite-redox",
    "name": "High-temperature reaction of iron carbide (cementite) with wüstite",
    "reactants": [
      "fe3c",
      "feo"
    ],
    "products": [
      "fe",
      "co"
    ],
    "enthalpy": 170,
    "desc": "Decarburization of molten iron droplets falling through wüstite-rich smelting slag.",
    "type": "single_displacement",
    "effects": [],
    "net": "Fe3C + FeO → 4 Fe + CO"
  },
  {
    "id": "pyro-dri-wustite-h2-reduction",
    "name": "Direct Reduced Iron (DRI) process: reduction of wüstite by hydrogen",
    "reactants": [
      "feo",
      "h2"
    ],
    "products": [
      "fe",
      "water"
    ],
    "enthalpy": 25,
    "desc": "Green steelmaking in Energiron/Midrex shaft furnaces using clean electrolytic hydrogen.",
    "type": "single_displacement",
    "effects": [],
    "net": "FeO + H2 → Fe + H2O"
  },
  {
    "id": "pyro-bf-desulfurization-lime-coke",
    "name": "Blast furnace hearth desulfurization: partitioning of sulfur into basic slag",
    "reactants": [
      "fes",
      "cao",
      "c"
    ],
    "products": [
      "fe",
      "cas",
      "co"
    ],
    "enthalpy": 115,
    "desc": "Capture of iron sulfide by lime in reducing slag creating calcium sulfide.",
    "type": "single_displacement",
    "effects": [],
    "net": "FeS + CaO + C → Fe + CaS + CO"
  },
  {
    "id": "pyro-bf-direct-reduction-magnetite-c",
    "name": "Carbothermic reduction of magnetite by coke to iron",
    "reactants": [
      "fe3o4",
      "c"
    ],
    "products": [
      "fe",
      "co"
    ],
    "enthalpy": 640,
    "desc": "Direct carbothermic smelting of magnetite iron ore in hearth zone.",
    "type": "single_displacement",
    "effects": [],
    "net": "Fe3O4 + 4 C → 3 Fe + 4 CO"
  },
  {
    "id": "pyro-bf-carbon-iron-cementite",
    "name": "Solid-state carburization: formation of cementite from iron and carbon",
    "reactants": [
      "fe",
      "c"
    ],
    "products": [
      "fe3c"
    ],
    "enthalpy": 25,
    "desc": "Dissolution of carbon into austenite lattice forming cementite in pig iron.",
    "type": "synthesis",
    "effects": [],
    "net": "3 Fe + C → Fe3C"
  },
  {
    "id": "pyro-dri-hematite-ch4-reforming",
    "name": "Methane-based Direct Reduced Iron: reduction of hematite by natural gas",
    "reactants": [
      "fe2o3",
      "ch4"
    ],
    "products": [
      "fe",
      "co",
      "water"
    ],
    "enthalpy": 215,
    "desc": "Midrex process shaft reduction utilizing in-situ reformed methane to reduce iron ore pellets.",
    "type": "single_displacement",
    "effects": [],
    "net": "Fe2O3 + CH4 → 2 Fe + CO + 2 H2O"
  },
  {
    "id": "pyro-dri-magnetite-ch4-reforming",
    "name": "Methane direct reduction: reduction of magnetite iron ore by natural gas",
    "reactants": [
      "fe3o4",
      "ch4"
    ],
    "products": [
      "fe",
      "co2",
      "water"
    ],
    "enthalpy": 310,
    "desc": "Natural gas DRI reduction of magnetite concentrates generating hot DRI sponge iron.",
    "type": "single_displacement",
    "effects": [],
    "net": "Fe3O4 + CH4 → 3 Fe + CO2 + 2 H2O"
  },
  {
    "id": "pyro-dri-wustite-ch4-reforming",
    "name": "Methane reduction of wüstite in fluidized bed DRI reactors",
    "reactants": [
      "feo",
      "ch4"
    ],
    "products": [
      "fe",
      "co",
      "h2"
    ],
    "enthalpy": 190,
    "desc": "Fluidized bed iron ore reduction using natural gas.",
    "type": "single_displacement",
    "effects": [],
    "net": "FeO + CH4 → Fe + CO + 2 H2"
  },
  {
    "id": "pyro-bf-cementite-co2-decarb",
    "name": "Decarburization of cementite by carbon dioxide in top gas",
    "reactants": [
      "fe3c",
      "co2"
    ],
    "products": [
      "fe",
      "co"
    ],
    "enthalpy": 150,
    "desc": "Gas-solid decarburization of high-carbon iron pellets.",
    "type": "single_displacement",
    "effects": [],
    "net": "Fe3C + CO2 → 3 Fe + 2 CO"
  },
  {
    "id": "pyro-bf-cementite-hematite-redox",
    "name": "High-temperature reaction between cementite and hematite ore",
    "reactants": [
      "fe3c",
      "fe2o3"
    ],
    "products": [
      "fe",
      "co"
    ],
    "enthalpy": 495,
    "desc": "Direct solid-state reduction producing low-carbon sponge iron.",
    "type": "single_displacement",
    "effects": [],
    "net": "3 Fe3C + Fe2O3 → 11 Fe + 3 CO"
  },
  {
    "id": "pyro-bf-cementite-magnetite-redox",
    "name": "Reaction of cementite with magnetite ore in ironmaking smelting hearth",
    "reactants": [
      "fe3c",
      "fe3o4"
    ],
    "products": [
      "fe",
      "co"
    ],
    "enthalpy": 680,
    "desc": "Redox reaction generating carbon monoxide and liquid iron.",
    "type": "single_displacement",
    "effects": [],
    "net": "4 Fe3C + Fe3O4 → 15 Fe + 4 CO"
  },
  {
    "id": "pyro-bf-wustite-hcl-pickling",
    "name": "Hydrochloric acid pickling of wüstite mill scale from hot-rolled steel strip",
    "reactants": [
      "feo",
      "hcl"
    ],
    "products": [
      "fecl2",
      "water"
    ],
    "enthalpy": -110,
    "desc": "Continuous steel strip pickling bath dissolving iron oxide scale.",
    "type": "metathesis",
    "effects": [],
    "net": "FeO + 2 HCl → FeCl2 + H2O"
  },
  {
    "id": "pyro-bf-wustite-h2so4-pickling",
    "name": "Sulfuric acid pickling of wüstite surface scale",
    "reactants": [
      "feo",
      "h2so4"
    ],
    "products": [
      "feso4",
      "water"
    ],
    "enthalpy": -125,
    "desc": "Hot sulfuric acid dissolution of wüstite scale generating copperas byproduct.",
    "type": "metathesis",
    "effects": [],
    "net": "FeO + H2SO4 → FeSO4 + H2O"
  },
  {
    "id": "pyro-slag-casio3-formation",
    "name": "Blast furnace slag formation: fluxing of silica gangue by calcined lime",
    "reactants": [
      "cao",
      "sio2"
    ],
    "products": [
      "casio3"
    ],
    "enthalpy": -90,
    "desc": "Primary slag-forming neutralization reaction generating molten calcium metasilicate.",
    "type": "synthesis",
    "effects": [],
    "net": "CaO + SiO2 → CaSiO3"
  },
  {
    "id": "pyro-slag-mgsio3-enstatite",
    "name": "Dolomitic blast furnace slag: fluxing of silica gangue by magnesium oxide",
    "reactants": [
      "mgo",
      "sio2"
    ],
    "products": [
      "mgsio3_enstatite"
    ],
    "enthalpy": -75,
    "desc": "Addition of dolomitic lime (MgO) generating fluid enstatite slag with low viscosity.",
    "type": "synthesis",
    "effects": [],
    "net": "MgO + SiO2 → MgSiO3"
  },
  {
    "id": "pyro-slag-fe2sio4-fayalite",
    "name": "Acidic iron smelting slag: formation of fayalite from wüstite and silica",
    "reactants": [
      "feo",
      "sio2"
    ],
    "products": [
      "fe2sio4_fayalite"
    ],
    "enthalpy": -38,
    "desc": "Key iron silicate slag formed during non-ferrous smelting and blast furnace hearth operations.",
    "type": "synthesis",
    "effects": [],
    "net": "2 FeO + SiO2 → Fe2SiO4"
  },
  {
    "id": "pyro-ladle-deoxidation-silicon",
    "name": "Ladle steel deoxidation: silicon killing of dissolved wüstite in molten steel",
    "reactants": [
      "feo",
      "si"
    ],
    "products": [
      "fe",
      "sio2"
    ],
    "enthalpy": -315,
    "desc": "Silicon deoxidation preventing CO gas blowhole porosity in killed steel ingots.",
    "type": "single_displacement",
    "effects": [],
    "net": "2 FeO + Si → 2 Fe + SiO2"
  },
  {
    "id": "pyro-ladle-deoxidation-ferrosilicon",
    "name": "Ladle steel deoxidation: treatment of wüstite using ferrosilicon alloy",
    "reactants": [
      "feo",
      "fesi"
    ],
    "products": [
      "fe",
      "sio2"
    ],
    "enthalpy": -260,
    "desc": "Addition of commercial 75% ferrosilicon to tap stream deoxidizing steel and augmenting iron yield.",
    "type": "single_displacement",
    "effects": [],
    "net": "2 FeO + FeSi → 3 Fe + SiO2"
  },
  {
    "id": "pyro-ladle-deoxidation-casi2",
    "name": "Ladle steel deoxidation & slagging by calcium silicide alloy",
    "reactants": [
      "feo",
      "casi2"
    ],
    "products": [
      "fe",
      "cao",
      "si"
    ],
    "enthalpy": -420,
    "desc": "Wire injection of calcium silicide providing deep deoxidation and calcium vapor micro-cleansing.",
    "type": "single_displacement",
    "effects": [],
    "net": "FeO + CaSi2 → Fe + CaO + 2 Si"
  },
  {
    "id": "pyro-steel-desulfurization-manganese",
    "name": "Steel ladle desulfurization: manganese scavenging of iron sulfide",
    "reactants": [
      "fes",
      "mn"
    ],
    "products": [
      "fe",
      "mns"
    ],
    "enthalpy": -55,
    "desc": "Alloying manganese to prevent hot-shortness by substituting FeS with high-melting globular MnS inclusions.",
    "type": "single_displacement",
    "effects": [],
    "net": "FeS + Mn → Fe + MnS"
  },
  {
    "id": "pyro-slag-mnsio3-rhodonite",
    "name": "Silicomanganese steel slag: formation of rhodonite from manganese oxide and silica",
    "reactants": [
      "mno_oxide",
      "sio2"
    ],
    "products": [
      "mnsio3"
    ],
    "enthalpy": -48,
    "desc": "Formation of manganese metasilicate slag during high-carbon ferromanganese smelting.",
    "type": "synthesis",
    "effects": [],
    "net": "MnO + SiO2 → MnSiO3"
  },
  {
    "id": "pyro-slag-caal2o4-krotite",
    "name": "Calcium aluminate synthetic ladle refining slag formation",
    "reactants": [
      "cao",
      "al2o3"
    ],
    "products": [
      "caal2o4"
    ],
    "enthalpy": -25,
    "desc": "Premelted calcium aluminate flux producing desulfurizing fluid top slag in ladle refining furnaces.",
    "type": "synthesis",
    "effects": [],
    "net": "CaO + Al2O3 → CaAl2O4"
  },
  {
    "id": "pyro-bos-decarburization-oxygen",
    "name": "Basic Oxygen Furnace (BOF): supersonic oxygen lancing decarburizing molten cementite",
    "reactants": [
      "fe3c",
      "o2"
    ],
    "products": [
      "fe",
      "co"
    ],
    "enthalpy": -480,
    "desc": "High-velocity top-blown pure oxygen jet burning dissolved carbon out of hot metal in 15 minutes.",
    "type": "single_displacement",
    "effects": [],
    "net": "2 Fe3C + O2 → 6 Fe + 2 CO"
  },
  {
    "id": "pyro-steel-manganese-slagging",
    "name": "BOF steelmaking: oxidation of dissolved manganese into slag by wüstite",
    "reactants": [
      "mn",
      "feo"
    ],
    "products": [
      "mno_oxide",
      "fe"
    ],
    "enthalpy": -125,
    "desc": "Early oxidation stage in oxygen converter transferring manganese into slag phase.",
    "type": "single_displacement",
    "effects": [],
    "net": "Mn + FeO → MnO + Fe"
  },
  {
    "id": "pyro-ladle-aluminum-deoxidation",
    "name": "Ladle deoxidation: aluminum killing of dissolved wüstite in molten steel",
    "reactants": [
      "feo",
      "al"
    ],
    "products": [
      "fe",
      "al2o3"
    ],
    "enthalpy": -850,
    "desc": "Addition of aluminum wire or notch-bars producing ultra-clean deep-drawing steel.",
    "type": "single_displacement",
    "effects": [],
    "net": "3 FeO + 2 Al → 3 Fe + Al2O3"
  },
  {
    "id": "pyro-wustite-carbonation-siderite",
    "name": "Solid-state carbonation of wüstite to siderite",
    "reactants": [
      "feo",
      "co2"
    ],
    "products": [
      "feco3"
    ],
    "enthalpy": -85,
    "desc": "Mineral carbonation capturing carbon dioxide with iron oxide.",
    "type": "synthesis",
    "effects": [],
    "net": "FeO + CO2 → FeCO3"
  },
  {
    "id": "pyro-wustite-nitrate-dissolution",
    "name": "Nitric acid dissolution of wüstite generating iron(II) nitrate",
    "reactants": [
      "feo",
      "hno3"
    ],
    "products": [
      "fe-no3-2",
      "water"
    ],
    "enthalpy": -130,
    "desc": "Dissolution of wüstite in non-oxidizing dilute nitric acid.",
    "type": "metathesis",
    "effects": [],
    "net": "FeO + 2 HNO3 → Fe(NO3)2 + H2O"
  },
  {
    "id": "pyro-slag-iron-silicide-deoxidation",
    "name": "Deoxidation of wüstite by calcium silicide in presence of silica flux",
    "reactants": [
      "casi2",
      "sio2"
    ],
    "products": [
      "casio3",
      "si"
    ],
    "enthalpy": -180,
    "desc": "Slag-metal interface reaction regenerating silicon during ladle refining.",
    "type": "single_displacement",
    "effects": [],
    "net": "2 CaSi2 + 3 SiO2 → 2 CaSiO3 + 5 Si"
  },
  {
    "id": "pyro-cu-converting-blister-reaction",
    "name": "Peirce-Smith converter: blister copper formation from chalcocite and cuprous oxide",
    "reactants": [
      "cu2s",
      "cu2o"
    ],
    "products": [
      "cu",
      "so2"
    ],
    "enthalpy": 115,
    "desc": "Classic 'copper blow' reaction where chalcocite reacts with cuprite producing blister copper.",
    "type": "single_displacement",
    "effects": [],
    "net": "Cu2S + 2 Cu2O → 6 Cu + SO2"
  },
  {
    "id": "pyro-cu-pyrite-smelting-dissoc",
    "name": "Flash smelting furnace: thermal decomposition and partial combustion of pyrite",
    "reactants": [
      "fes2",
      "o2"
    ],
    "products": [
      "fes",
      "so2"
    ],
    "enthalpy": -440,
    "desc": "Pyrite in chalcopyrite copper concentrate burning in suspension shaft.",
    "type": "single_displacement",
    "effects": [],
    "net": "FeS2 + O2 → FeS + SO2"
  },
  {
    "id": "pyro-cu-covellite-thermal-dissoc",
    "name": "Smelting furnace suspension: thermal dissociation of covellite to chalcocite",
    "reactants": [
      "cus"
    ],
    "products": [
      "cu2s",
      "s"
    ],
    "enthalpy": 90,
    "desc": "Endothermic flash dissociation of covellite releasing elemental sulfur vapor.",
    "type": "decomposition",
    "effects": [],
    "net": "2 CuS → Cu2S + S"
  },
  {
    "id": "pyro-cu-fire-refining-poling-c",
    "name": "Anode furnace fire refining: green wood poling reduction of dissolved Cu2O by carbon",
    "reactants": [
      "cu2o",
      "c"
    ],
    "products": [
      "cu",
      "co"
    ],
    "enthalpy": 140,
    "desc": "Traditional poling inserting green pine logs into molten blister copper to deoxidize bath.",
    "type": "single_displacement",
    "effects": [],
    "net": "Cu2O + C → 2 Cu + CO"
  },
  {
    "id": "pyro-cu-matte-desulfurization-lime",
    "name": "Copper matte desulfurization with calcined lime flux and coke",
    "reactants": [
      "cu2s",
      "cao",
      "c"
    ],
    "products": [
      "cu",
      "cas",
      "co"
    ],
    "enthalpy": 210,
    "desc": "Pyrometallurgical desulfurization partitioning sulfur into calcium sulfide slag.",
    "type": "single_displacement",
    "effects": [],
    "net": "Cu2S + CaO + C → 2 Cu + CaS + CO"
  },
  {
    "id": "pyro-cu-sulfate-roast-reaction",
    "name": "Copper roast-reaction: interaction of chalcocite with copper(II) sulfate",
    "reactants": [
      "cu2s",
      "cuso4"
    ],
    "products": [
      "cu",
      "so2"
    ],
    "enthalpy": 290,
    "desc": "Direct roast-reaction producing metallic copper and concentrated sulfur dioxide.",
    "type": "single_displacement",
    "effects": [],
    "net": "Cu2S + CuSO4 → 3 Cu + 2 SO2"
  },
  {
    "id": "pyro-cu-matte-iron-precipitation",
    "name": "Precipitation smelting: displacement of copper from molten chalcocite by metallic iron",
    "reactants": [
      "cu2s",
      "fe"
    ],
    "products": [
      "cu",
      "fes"
    ],
    "enthalpy": -60,
    "desc": "Historical precipitation process recovering copper metal from sulfidic matte using scrap iron.",
    "type": "single_displacement",
    "effects": [],
    "net": "Cu2S + Fe → 2 Cu + FeS"
  },
  {
    "id": "pyro-cu-covellite-iron-precipitation",
    "name": "Kern's reaction: reduction of covellite by scrap iron in matte smelting",
    "reactants": [
      "cus",
      "fe"
    ],
    "products": [
      "cu",
      "fes"
    ],
    "enthalpy": -75,
    "desc": "High-temperature displacement of copper by iron in reverberatory smelting furnaces.",
    "type": "single_displacement",
    "effects": [],
    "net": "CuS + Fe → Cu + FeS"
  },
  {
    "id": "pyro-cu-cuprite-iron-reduction",
    "name": "Reduction of molten copper(I) oxide by iron",
    "reactants": [
      "cu2o",
      "fe"
    ],
    "products": [
      "cu",
      "feo"
    ],
    "enthalpy": -115,
    "desc": "Slag-metal equilibrium reducing copper oxide into metal phase while slagging iron.",
    "type": "single_displacement",
    "effects": [],
    "net": "Cu2O + Fe → 2 Cu + FeO"
  },
  {
    "id": "pyro-cu-cupric-iron-reduction",
    "name": "Direct reduction of copper(II) oxide by metallic iron",
    "reactants": [
      "cuo",
      "fe"
    ],
    "products": [
      "cu",
      "feo"
    ],
    "enthalpy": -145,
    "desc": "Exothermic slag reduction reaction recovering copper values.",
    "type": "single_displacement",
    "effects": [],
    "net": "CuO + Fe → Cu + FeO"
  },
  {
    "id": "pyro-cu-cuprite-methane-poling",
    "name": "Gaseous anode fire-refining: deoxidation of cuprite by reformed natural gas (methane)",
    "reactants": [
      "cu2o",
      "ch4"
    ],
    "products": [
      "cu",
      "co",
      "h2"
    ],
    "enthalpy": 165,
    "desc": "Modern tuyere injection of natural gas deoxidizing molten copper anodes before casting.",
    "type": "single_displacement",
    "effects": [],
    "net": "Cu2O + CH4 → 2 Cu + CO + 2 H2"
  },
  {
    "id": "pyro-cu-cupric-methane-reduction",
    "name": "Reduction of copper(II) oxide by methane gas",
    "reactants": [
      "cuo",
      "ch4"
    ],
    "products": [
      "cu",
      "co",
      "water"
    ],
    "enthalpy": -95,
    "desc": "Gas-phase reduction of copper calcine by natural gas.",
    "type": "single_displacement",
    "effects": [],
    "net": "3 CuO + CH4 → 3 Cu + CO + 2 H2O"
  },
  {
    "id": "pyro-cu-chalcopyrite-cupric-chloride-roast",
    "name": "Cupric chloride chloridizing roast of chalcopyrite concentrate",
    "reactants": [
      "cufes2_chalcopyrite",
      "cucl2"
    ],
    "products": [
      "cucl",
      "fecl2",
      "s"
    ],
    "enthalpy": -85,
    "desc": "Low-temperature chloridizing roast converting chalcopyrite into cuprous chloride.",
    "type": "single_displacement",
    "effects": [],
    "net": "CuFeS2 + 3 CuCl2 → 4 CuCl + FeCl2 + 2 S"
  },
  {
    "id": "pyro-cu-chalcopyrite-ferric-chloride-roast",
    "name": "Ferric chloride chlorination roast of chalcopyrite ore",
    "reactants": [
      "cufes2_chalcopyrite",
      "fecl3"
    ],
    "products": [
      "cucl2",
      "fecl2",
      "s"
    ],
    "enthalpy": -110,
    "desc": "Non-oxidative chlorination yielding cupric and ferrous chlorides.",
    "type": "single_displacement",
    "effects": [],
    "net": "CuFeS2 + 4 FeCl3 → CuCl2 + 5 FeCl2 + 2 S"
  },
  {
    "id": "pyro-zn-co-reduction-retort",
    "name": "Vertical retort zinc smelting: reduction of zinc oxide by carbon monoxide",
    "reactants": [
      "zno",
      "co"
    ],
    "products": [
      "zn",
      "co2"
    ],
    "enthalpy": 65,
    "desc": "Gas-phase reduction in zinc retort furnace distilling zinc vapor.",
    "type": "single_displacement",
    "effects": [],
    "net": "ZnO + CO → Zn + CO2"
  },
  {
    "id": "pyro-pb-roast-reaction-sulfate",
    "name": "Direct smelting roast-reaction: interaction of galena with lead(II) sulfate",
    "reactants": [
      "pbs",
      "pbso4"
    ],
    "products": [
      "pb",
      "so2"
    ],
    "enthalpy": 410,
    "desc": "Autogenous high-temperature reaction yielding metallic lead and concentrated SO2 gas.",
    "type": "single_displacement",
    "effects": [],
    "net": "PbS + PbSO4 → 2 Pb + 2 SO2"
  },
  {
    "id": "pyro-pb-iron-precipitation-smelting",
    "name": "Lead blast furnace: iron precipitation reduction of galena ore",
    "reactants": [
      "pbs",
      "fe"
    ],
    "products": [
      "pb",
      "fes"
    ],
    "enthalpy": -15,
    "desc": "Historical precipitation process where iron scrap reduces galena directly in shaft furnace.",
    "type": "single_displacement",
    "effects": [],
    "net": "PbS + Fe → Pb + FeS"
  },
  {
    "id": "pyro-pb-litharge-iron-reduction",
    "name": "Reduction of molten litharge (PbO) by metallic iron",
    "reactants": [
      "pbo",
      "fe"
    ],
    "products": [
      "pb",
      "feo"
    ],
    "enthalpy": -70,
    "desc": "Slag cleaning reduction recovering metallic lead from lead-bearing smelting slag.",
    "type": "single_displacement",
    "effects": [],
    "net": "PbO + Fe → Pb + FeO"
  },
  {
    "id": "pyro-pb-litharge-methane-reduction",
    "name": "Methane reduction of lead(II) oxide calcine",
    "reactants": [
      "pbo",
      "ch4"
    ],
    "products": [
      "pb",
      "co",
      "water"
    ],
    "enthalpy": -45,
    "desc": "Gaseous reduction of lead oxide by natural gas.",
    "type": "single_displacement",
    "effects": [],
    "net": "3 PbO + CH4 → 3 Pb + CO + 2 H2O"
  },
  {
    "id": "pyro-pb-sulfate-co-reduction",
    "name": "Reduction of lead(II) sulfate by carbon monoxide in smelting shaft",
    "reactants": [
      "pbso4",
      "co"
    ],
    "products": [
      "pb",
      "co2",
      "so2"
    ],
    "enthalpy": 190,
    "desc": "Shaft furnace reduction of recycled battery paste lead sulfate.",
    "type": "single_displacement",
    "effects": [],
    "net": "PbSO4 + 2 CO → Pb + 2 CO2 + SO2"
  },
  {
    "id": "pyro-zn-iron-precipitation-reduction",
    "name": "Zinc smelting: displacement of zinc from sphalerite by molten iron",
    "reactants": [
      "zns",
      "fe"
    ],
    "products": [
      "zn",
      "fes"
    ],
    "enthalpy": 68,
    "desc": "High-temperature displacement reaction distilling zinc vapor.",
    "type": "single_displacement",
    "effects": [],
    "net": "ZnS + Fe → Zn + FeS"
  },
  {
    "id": "pyro-zn-oxide-iron-reduction",
    "name": "Reduction of zinc oxide by metallic iron at high temperature",
    "reactants": [
      "zno",
      "fe"
    ],
    "products": [
      "zn",
      "feo"
    ],
    "enthalpy": 95,
    "desc": "Electric arc furnace slag fuming reaction vaporizing zinc from EAF dust.",
    "type": "single_displacement",
    "effects": [],
    "net": "ZnO + Fe → Zn + FeO"
  },
  {
    "id": "pyro-zn-oxide-methane-reduction",
    "name": "Reduction of zinc oxide by methane in vertical retort",
    "reactants": [
      "zno",
      "ch4"
    ],
    "products": [
      "zn",
      "co",
      "water"
    ],
    "enthalpy": 120,
    "desc": "Gas-phase carbothermic analog using natural gas reducing agent.",
    "type": "single_displacement",
    "effects": [],
    "net": "3 ZnO + CH4 → 3 Zn + CO + 2 H2O"
  },
  {
    "id": "pyro-sn-cassiterite-iron-reduction",
    "name": "Smelting reduction: reduction of cassiterite ore by scrap iron",
    "reactants": [
      "sno2",
      "fe"
    ],
    "products": [
      "sn",
      "feo"
    ],
    "enthalpy": -25,
    "desc": "Recovery of tin metal by iron displacement in reverberatory tin slag cleaning.",
    "type": "single_displacement",
    "effects": [],
    "net": "SnO2 + 2 Fe → Sn + 2 FeO"
  },
  {
    "id": "pyro-sn-stannous-oxide-iron-reduction",
    "name": "Reduction of stannous oxide slag by iron",
    "reactants": [
      "sno",
      "fe"
    ],
    "products": [
      "sn",
      "feo"
    ],
    "enthalpy": -15,
    "desc": "Slag fuming reduction yielding crude tin metal.",
    "type": "single_displacement",
    "effects": [],
    "net": "SnO + Fe → Sn + FeO"
  },
  {
    "id": "pyro-sn-cassiterite-methane-reduction",
    "name": "Reformed natural gas reduction of cassiterite ore",
    "reactants": [
      "sno2",
      "ch4"
    ],
    "products": [
      "sn",
      "co",
      "water"
    ],
    "enthalpy": 140,
    "desc": "Fluidized bed reduction of cassiterite concentrates using methane.",
    "type": "single_displacement",
    "effects": [],
    "net": "3 SnO2 + 2 CH4 → 3 Sn + 2 CO + 4 H2O"
  },
  {
    "id": "pyro-sn-stannous-sulfide-iron-reduction",
    "name": "Iron precipitation smelting of tin(II) sulfide concentrate",
    "reactants": [
      "sns",
      "fe"
    ],
    "products": [
      "sn",
      "fes"
    ],
    "enthalpy": -35,
    "desc": "Displacement smelting converting sulfidic tin concentrates into crude tin metal.",
    "type": "single_displacement",
    "effects": [],
    "net": "SnS + Fe → Sn + FeS"
  },
  {
    "id": "pyro-sb-english-precipitation-process",
    "name": "English precipitation process: iron reduction of stibnite (antimony trisulfide)",
    "reactants": [
      "sb2s3",
      "fe"
    ],
    "products": [
      "sb",
      "fes"
    ],
    "enthalpy": -120,
    "desc": "Smelting stibnite ore with wrought iron scrap in crucible furnace yielding crude antimony regulus.",
    "type": "single_displacement",
    "effects": [],
    "net": "Sb2S3 + 3 Fe → 2 Sb + 3 FeS"
  },
  {
    "id": "pyro-kroll-zirconium-magnesium",
    "name": "Kroll process for nuclear-grade zirconium: reduction of ZrCl4 by molten magnesium",
    "reactants": [
      "zrcl4",
      "mg"
    ],
    "products": [
      "zr",
      "mgcl2"
    ],
    "enthalpy": -480,
    "desc": "Reduction of hafnium-free ZrCl4 vapor by molten magnesium producing zirconium sponge for nuclear fuel cladding.",
    "type": "single_displacement",
    "effects": [],
    "net": "ZrCl4 + 2 Mg → Zr + 2 MgCl2"
  },
  {
    "id": "pyro-hunter-zirconium-sodium",
    "name": "Hunter-type sodium reduction of zirconium tetrachloride",
    "reactants": [
      "zrcl4",
      "na"
    ],
    "products": [
      "zr",
      "nacl"
    ],
    "enthalpy": -780,
    "desc": "Sodium reduction yielding ductile metallic zirconium sponge.",
    "type": "single_displacement",
    "effects": [],
    "net": "ZrCl4 + 4 Na → Zr + 4 NaCl"
  },
  {
    "id": "pyro-chlorination-zirconia",
    "name": "Carbochlorination of baddeleyite zirconia to zirconium tetrachloride",
    "reactants": [
      "zro2",
      "c",
      "cl2"
    ],
    "products": [
      "zrcl4",
      "co"
    ],
    "enthalpy": -165,
    "desc": "Carbochlorination of zirconia and petroleum coke under chlorine gas flow.",
    "type": "synthesis",
    "effects": [],
    "net": "ZrO2 + 2 C + 2 Cl2 → ZrCl4 + 2 CO"
  },
  {
    "id": "pyro-titanium-nitriding",
    "name": "High-temperature synthesis of ultra-hard titanium nitride ceramic",
    "reactants": [
      "ti",
      "n2"
    ],
    "products": [
      "tin"
    ],
    "enthalpy": -338,
    "desc": "Direct thermal nitridation of titanium at 1200°C forming golden wear-resistant TiN coating.",
    "type": "synthesis",
    "effects": [],
    "net": "2 Ti + N2 → 2 TiN"
  },
  {
    "id": "pyro-pidgeon-magnesium-reduction",
    "name": "Pidgeon process: retort reduction of calcined dolomite (MgO) by ferrosilicon",
    "reactants": [
      "mgo",
      "fesi"
    ],
    "products": [
      "mg",
      "sio2",
      "fe"
    ],
    "enthalpy": 185,
    "desc": "Vacuum retort reduction at 1150°C and 0.1 Torr distilling high-purity magnesium vapor.",
    "type": "single_displacement",
    "effects": [],
    "net": "2 MgO + FeSi → 2 Mg + SiO2 + Fe"
  },
  {
    "id": "pyro-pidgeon-silicothermic-direct",
    "name": "Silicothermic Pidgeon process: direct reduction of magnesium oxide by silicon",
    "reactants": [
      "mgo",
      "si"
    ],
    "products": [
      "mg",
      "sio2"
    ],
    "enthalpy": 195,
    "desc": "Vacuum distillation reduction of magnesia using metallurgical silicon.",
    "type": "single_displacement",
    "effects": [],
    "net": "2 MgO + Si → 2 Mg + SiO2"
  },
  {
    "id": "pyro-carbothermic-magnesium-radenthein",
    "name": "Radenthein process: high-temperature carbothermic reduction of magnesia",
    "reactants": [
      "mgo",
      "c"
    ],
    "products": [
      "mg",
      "co"
    ],
    "enthalpy": 610,
    "desc": "Electric arc furnace reduction of MgO at 2200°C shock-quenched with cold natural gas.",
    "type": "single_displacement",
    "effects": [],
    "net": "MgO + C → Mg + CO"
  },
  {
    "id": "pyro-acheson-silicon-carbide",
    "name": "Acheson process: electric resistance synthesis of silicon carbide (Carborundum)",
    "reactants": [
      "sio2",
      "c"
    ],
    "products": [
      "sic",
      "co"
    ],
    "enthalpy": 500,
    "desc": "High-temperature synthesis in electric resistance core furnaces at 2000°C yielding refractory SiC crystals.",
    "type": "synthesis",
    "effects": [],
    "net": "SiO2 + 3 C → SiC + 2 CO"
  },
  {
    "id": "pyro-carbochlorination-silicon",
    "name": "Fluidized bed carbochlorination of silica to silicon tetrachloride",
    "reactants": [
      "sio2",
      "c",
      "cl2"
    ],
    "products": [
      "sicl4",
      "co"
    ],
    "enthalpy": -240,
    "desc": "High-temperature carbochlorination generating silicon tetrachloride precursor for optical fibers.",
    "type": "synthesis",
    "effects": [],
    "net": "SiO2 + 2 C + 2 Cl2 → SiCl4 + 2 CO"
  },
  {
    "id": "pyro-carbochlorination-alumina",
    "name": "Carbochlorination of calcined bauxite alumina to anhydrous aluminum chloride",
    "reactants": [
      "al2o3",
      "c",
      "cl2"
    ],
    "products": [
      "alcl3",
      "co"
    ],
    "enthalpy": -210,
    "desc": "Carbochlorination process producing anhydrous AlCl3 Lewis acid catalyst.",
    "type": "synthesis",
    "effects": [],
    "net": "Al2O3 + 3 C + 3 Cl2 → 2 AlCl3 + 3 CO"
  },
  {
    "id": "pyro-magnesium-silicon-reduction",
    "name": "Kroll-type reduction of silicon tetrachloride by magnesium metal",
    "reactants": [
      "sicl4",
      "mg"
    ],
    "products": [
      "si",
      "mgcl2"
    ],
    "enthalpy": -380,
    "desc": "Vapor-phase reduction producing ultra-fine silicon powder and recoverable magnesium chloride.",
    "type": "single_displacement",
    "effects": [],
    "net": "SiCl4 + 2 Mg → Si + 2 MgCl2"
  },
  {
    "id": "pyro-kroll-vanadium-tetrachloride",
    "name": "Kroll-type reduction of vanadium tetrachloride by molten magnesium",
    "reactants": [
      "vcl4",
      "mg"
    ],
    "products": [
      "v",
      "mgcl2"
    ],
    "enthalpy": -440,
    "desc": "Inert gas reduction producing ductile metallic vanadium.",
    "type": "single_displacement",
    "effects": [],
    "net": "VCl4 + 2 Mg → V + 2 MgCl2"
  },
  {
    "id": "pyro-fumed-silica-sicl4-water",
    "name": "Aerosil process: flame hydrolysis of silicon tetrachloride to fumed silica",
    "reactants": [
      "sicl4",
      "water"
    ],
    "products": [
      "sio2",
      "hcl"
    ],
    "enthalpy": -145,
    "desc": "High-temperature oxyhydrogen flame hydrolysis synthesizing nanostructured pyrogenic silica.",
    "type": "metathesis",
    "effects": [],
    "net": "SiCl4 + 2 H2O → SiO2 + 4 HCl"
  },
  {
    "id": "pyro-sicl4-vapor-oxidation",
    "name": "Direct vapor-phase oxidation of silicon tetrachloride to silica",
    "reactants": [
      "sicl4",
      "o2"
    ],
    "products": [
      "sio2",
      "cl2"
    ],
    "enthalpy": -170,
    "desc": "Gas-phase oxidation generating synthetic vitreous silica and recyclable chlorine gas.",
    "type": "single_displacement",
    "effects": [],
    "net": "SiCl4 + O2 → SiO2 + 2 Cl2"
  },
  {
    "id": "pyro-cvd-tungsten-wf6-h2",
    "name": "Semiconductor CVD: chemical vapor deposition of tungsten contact plugs from WF6 and H2",
    "reactants": [
      "wf6",
      "h2"
    ],
    "products": [
      "w",
      "hf"
    ],
    "enthalpy": -88,
    "desc": "Low-pressure CVD at 450°C filling contact vias in silicon integrated circuits.",
    "type": "single_displacement",
    "effects": [],
    "net": "WF6 + 3 H2 → W + 6 HF"
  },
  {
    "id": "pyro-wf6-hydrolysis-wo3",
    "name": "Aqueous / steam hydrolysis of tungsten hexafluoride to tungsten trioxide",
    "reactants": [
      "wf6",
      "water"
    ],
    "products": [
      "wo3",
      "hf"
    ],
    "enthalpy": -195,
    "desc": "Scrubber absorption of waste WF6 offgases producing hydrous tungsten oxide.",
    "type": "metathesis",
    "effects": [],
    "net": "WF6 + 3 H2O → WO3 + 6 HF"
  },
  {
    "id": "pyro-tungsten-trioxide-ch4",
    "name": "Natural gas reduction of tungsten trioxide to metallic tungsten powder",
    "reactants": [
      "wo3",
      "ch4"
    ],
    "products": [
      "w",
      "co",
      "water"
    ],
    "enthalpy": 220,
    "desc": "Hydrocarbon reduction producing fine tungsten powder for wear-resistant hardmetals.",
    "type": "single_displacement",
    "effects": [],
    "net": "WO3 + CH4 → W + CO + 2 H2O"
  },
  {
    "id": "pyro-molybdenum-trioxide-ch4",
    "name": "Methane reduction of molybdenum trioxide to molybdenum powder",
    "reactants": [
      "moo3",
      "ch4"
    ],
    "products": [
      "mo",
      "co",
      "water"
    ],
    "enthalpy": 190,
    "desc": "Natural gas reduction of MoO3 in rotary kilns.",
    "type": "single_displacement",
    "effects": [],
    "net": "MoO3 + CH4 → Mo + CO + 2 H2O"
  },
  {
    "id": "pyro-vanadium-trioxide-c",
    "name": "Carbothermic reduction of vanadium(III) oxide to metallic vanadium",
    "reactants": [
      "v2o3",
      "c"
    ],
    "products": [
      "v",
      "co"
    ],
    "enthalpy": 540,
    "desc": "Vacuum furnace reduction of V2O3 producing vanadium metal for master alloys.",
    "type": "single_displacement",
    "effects": [],
    "net": "V2O3 + 3 C → 2 V + 3 CO"
  },
  {
    "id": "pyro-vanadium-trioxide-h2",
    "name": "Hydrogen reduction of vanadium(III) oxide",
    "reactants": [
      "v2o3",
      "h2"
    ],
    "products": [
      "v",
      "water"
    ],
    "enthalpy": 185,
    "desc": "High-temperature gas-phase reduction of vanadium sesquioxide.",
    "type": "single_displacement",
    "effects": [],
    "net": "V2O3 + 3 H2 → 2 V + 3 H2O"
  },
  {
    "id": "pyro-vanadium-trioxide-ch4",
    "name": "Methane reduction of vanadium(III) oxide to metallic vanadium",
    "reactants": [
      "v2o3",
      "ch4"
    ],
    "products": [
      "v",
      "co",
      "water"
    ],
    "enthalpy": 260,
    "desc": "Hydrocarbon reduction of vanadium oxide.",
    "type": "single_displacement",
    "effects": [],
    "net": "V2O3 + CH4 → 2 V + CO + 2 H2O"
  },
  {
    "id": "pyro-vanadium-pentoxide-ch4",
    "name": "Direct reduction of vanadium pentoxide by methane",
    "reactants": [
      "v2o5",
      "ch4"
    ],
    "products": [
      "v",
      "co",
      "water"
    ],
    "enthalpy": 420,
    "desc": "Natural gas direct reduction of vanadium pentoxide flake.",
    "type": "single_displacement",
    "effects": [],
    "net": "3 V2O5 + 5 CH4 → 6 V + 5 CO + 10 H2O"
  },
  {
    "id": "pyro-vanadium-pentoxide-co",
    "name": "Indirect reduction of vanadium pentoxide by carbon monoxide",
    "reactants": [
      "v2o5",
      "co"
    ],
    "products": [
      "v",
      "co2"
    ],
    "enthalpy": -120,
    "desc": "Gas-phase reduction in vanadium smelting shafts.",
    "type": "single_displacement",
    "effects": [],
    "net": "V2O5 + 5 CO → 2 V + 5 CO2"
  },
  {
    "id": "pyro-thermite-cobalt-reduction",
    "name": "Aluminothermic reduction of cobalt(II) oxide to metallic cobalt",
    "reactants": [
      "coo",
      "al"
    ],
    "products": [
      "cobalt-metal",
      "al2o3"
    ],
    "enthalpy": -840,
    "desc": "Aluminothermic reduction producing high-purity cobalt metal for magnetic materials.",
    "type": "single_displacement",
    "effects": [],
    "net": "3 CoO + 2 Al → 3 Co + Al2O3"
  },
  {
    "id": "pyro-thermite-cuprous-reduction",
    "name": "Thermite reduction of copper(I) oxide by aluminum",
    "reactants": [
      "cu2o",
      "al"
    ],
    "products": [
      "cu",
      "al2o3"
    ],
    "enthalpy": -1120,
    "desc": "Exothermic pyrotechnic reaction generating molten copper.",
    "type": "single_displacement",
    "effects": [],
    "net": "3 Cu2O + 2 Al → 6 Cu + Al2O3"
  },
  {
    "id": "pyro-thermite-molybdenum-reduction",
    "name": "Aluminothermic extraction of pure molybdenum from molybdenum trioxide",
    "reactants": [
      "moo3",
      "al"
    ],
    "products": [
      "mo",
      "al2o3"
    ],
    "enthalpy": -930,
    "desc": "Thermite reduction yielding ductile carbon-free molybdenum metal.",
    "type": "single_displacement",
    "effects": [],
    "net": "MoO3 + 2 Al → Mo + Al2O3"
  },
  {
    "id": "pyro-thermite-tungsten-reduction",
    "name": "Aluminothermic reduction of tungsten trioxide to metallic tungsten",
    "reactants": [
      "wo3",
      "al"
    ],
    "products": [
      "w",
      "al2o3"
    ],
    "enthalpy": -880,
    "desc": "High-temperature extraction producing refractory tungsten metal.",
    "type": "single_displacement",
    "effects": [],
    "net": "WO3 + 2 Al → W + Al2O3"
  },
  {
    "id": "pyro-thermite-magnetite-aluminothermic",
    "name": "Thermite reduction: aluminothermic reduction of magnetite iron ore",
    "reactants": [
      "fe3o4",
      "al"
    ],
    "products": [
      "fe",
      "al2o3"
    ],
    "enthalpy": -3340,
    "desc": "High-energy pyrotechnic incendiary and field rail welding thermite formulation.",
    "type": "single_displacement",
    "effects": [],
    "net": "3 Fe3O4 + 8 Al → 9 Fe + 4 Al2O3"
  },
  {
    "id": "pyro-van-arkel-titanium-synthesis",
    "name": "Van Arkel - de Boer process Step 1: formation of volatile titanium(IV) iodide",
    "reactants": [
      "ti",
      "i2"
    ],
    "products": [
      "tii4"
    ],
    "enthalpy": -375,
    "desc": "Lower temperature synthesis at 250°C reacting crude titanium sponge with iodine vapor.",
    "type": "synthesis",
    "effects": [],
    "net": "Ti + 2 I2 → TiI4"
  },
  {
    "id": "pyro-van-arkel-titanium-dissociation",
    "name": "Van Arkel - de Boer process Step 2: thermal dissociation of TiI4 on hot tungsten filament",
    "reactants": [
      "tii4"
    ],
    "products": [
      "ti",
      "i2"
    ],
    "enthalpy": 375,
    "desc": "High-temperature dissociation at 1400°C depositing ultra-pure ductile crystal bar titanium.",
    "type": "decomposition",
    "effects": [],
    "net": "TiI4 → Ti + 2 I2"
  },
  {
    "id": "pyro-van-arkel-zirconium-synthesis",
    "name": "Van Arkel - de Boer refining: formation of volatile zirconium(IV) iodide",
    "reactants": [
      "zr",
      "i2"
    ],
    "products": [
      "zri4"
    ],
    "enthalpy": -490,
    "desc": "Reaction of crude zirconium sponge with iodine vapor at 300°C.",
    "type": "synthesis",
    "effects": [],
    "net": "Zr + 2 I2 → ZrI4"
  },
  {
    "id": "pyro-van-arkel-zirconium-dissociation",
    "name": "Van Arkel - de Boer refining: thermal dissociation of ZrI4 on hot filament",
    "reactants": [
      "zri4"
    ],
    "products": [
      "zr",
      "i2"
    ],
    "enthalpy": 490,
    "desc": "Dissociation at 1300°C depositing nuclear-grade ductility zirconium crystal bars.",
    "type": "decomposition",
    "effects": [],
    "net": "ZrI4 → Zr + 2 I2"
  },
  {
    "id": "pyro-germanium-hydrogen-reduction",
    "name": "Hydrogen reduction of electronic-grade germanium dioxide to semiconductor germanium",
    "reactants": [
      "geo2",
      "h2"
    ],
    "products": [
      "ge",
      "water"
    ],
    "enthalpy": 75,
    "desc": "Tube furnace reduction at 650°C producing intrinsic germanium ingots for zone refining.",
    "type": "single_displacement",
    "effects": [],
    "net": "GeO2 + 2 H2 → Ge + 2 H2O"
  },
  {
    "id": "pyro-germanium-carbothermic-reduction",
    "name": "Carbothermic reduction of germanium dioxide",
    "reactants": [
      "geo2",
      "c"
    ],
    "products": [
      "ge",
      "co"
    ],
    "enthalpy": 285,
    "desc": "High-temperature carbothermic reduction producing crude germanium.",
    "type": "single_displacement",
    "effects": [],
    "net": "GeO2 + 2 C → Ge + 2 CO"
  },
  {
    "id": "pyro-antimony-hydrogen-reduction",
    "name": "Hydrogen reduction of antimony trioxide to pure antimony regulus",
    "reactants": [
      "sb2o3",
      "h2"
    ],
    "products": [
      "sb",
      "water"
    ],
    "enthalpy": 145,
    "desc": "Gas-phase reduction under dry hydrogen flow.",
    "type": "single_displacement",
    "effects": [],
    "net": "Sb2O3 + 3 H2 → 2 Sb + 3 H2O"
  },
  {
    "id": "pyro-antimony-carbothermic-reduction",
    "name": "Blast furnace smelting of stibnite calcine: carbothermic reduction of antimony trioxide",
    "reactants": [
      "sb2o3",
      "c"
    ],
    "products": [
      "sb",
      "co"
    ],
    "enthalpy": 420,
    "desc": "Shaft furnace reduction of Sb2O3 calcine with metallurgical charcoal yielding antimony regulus.",
    "type": "single_displacement",
    "effects": [],
    "net": "Sb2O3 + 3 C → 2 Sb + 3 CO"
  },
  {
    "id": "pyro-antimony-co-reduction",
    "name": "Reduction of antimony trioxide calcine by carbon monoxide",
    "reactants": [
      "sb2o3",
      "co"
    ],
    "products": [
      "sb",
      "co2"
    ],
    "enthalpy": 110,
    "desc": "Indirect reduction in antimony blast furnace.",
    "type": "single_displacement",
    "effects": [],
    "net": "Sb2O3 + 3 CO → 2 Sb + 3 CO2"
  },
  {
    "id": "pyro-antimony-stibnite-direct-roast",
    "name": "Direct roast-reduction of stibnite with oxygen",
    "reactants": [
      "sb2s3",
      "o2"
    ],
    "products": [
      "sb",
      "so2"
    ],
    "enthalpy": -580,
    "desc": "Roast-reduction of antimony trisulfide concentrates generating metallic antimony.",
    "type": "single_displacement",
    "effects": [],
    "net": "Sb2S3 + 3 O2 → 2 Sb + 3 SO2"
  },
  {
    "id": "pyro-chromium-carbothermic-reduction",
    "name": "Electric arc furnace reduction: carbothermic synthesis of high-carbon ferrochrome",
    "reactants": [
      "cr2o3",
      "c"
    ],
    "products": [
      "cr",
      "co"
    ],
    "enthalpy": 780,
    "desc": "Submerged arc furnace smelting of chromite ore producing ferrochrome master alloy for stainless steel.",
    "type": "single_displacement",
    "effects": [],
    "net": "Cr2O3 + 3 C → 2 Cr + 3 CO"
  },
  {
    "id": "pyro-chromium-co-reduction",
    "name": "Indirect reduction of chromium(III) oxide by carbon monoxide",
    "reactants": [
      "cr2o3",
      "co"
    ],
    "products": [
      "cr",
      "co2"
    ],
    "enthalpy": 260,
    "desc": "Shaft reduction of chromite pre-reduced pellets.",
    "type": "single_displacement",
    "effects": [],
    "net": "Cr2O3 + 3 CO → 2 Cr + 3 CO2"
  },
  {
    "id": "pyro-hall-heroult-anode-combustion",
    "name": "Hall-Héroult molten salt electrowinning: net cell carbothermic consumption of carbon anodes",
    "reactants": [
      "al2o3",
      "c"
    ],
    "products": [
      "al",
      "co2"
    ],
    "enthalpy": 1080,
    "desc": "Net overall cell reaction in cryolite bath at 960°C producing aluminum metal and CO2.",
    "type": "single_displacement",
    "effects": [],
    "net": "2 Al2O3 + 3 C → 4 Al + 3 CO2"
  },
  {
    "id": "pyro-stannous-oxide-hno3-dissolution",
    "name": "Nitric acid dissolution of stannous oxide calcines",
    "reactants": [
      "sno",
      "hno3"
    ],
    "products": [
      "sn-no3-2",
      "water"
    ],
    "enthalpy": -115,
    "desc": "Acid leaching of stannous oxide generating tin(II) nitrate solution.",
    "type": "metathesis",
    "effects": [],
    "net": "SnO + 2 HNO3 → Sn(NO3)2 + H2O"
  }
];
