// Domain 30: Battery Chemistries & Energy Storage (100 reactions)
import { addReaction } from "./generateBatch7.js";

export function buildDomain30BatteryEnergyStorage(): void {
  const reactions = [
  {
    "id": "bat-lco-coo-li2co3",
    "name": "Solid-state synthesis of LiCoO2 from cobalt(II) oxide and lithium carbonate",
    "reactants": [
      "li2co3",
      "coo",
      "o2"
    ],
    "products": [
      "licoo2",
      "co2"
    ],
    "enthalpy": -110,
    "desc": "High-temperature calcination at 850°C forming layered cathode material.",
    "type": "redox_other",
    "effects": [],
    "net": "2 Li2CO3 + 4 CoO + O2 → 4 LiCoO2 + 2 CO2"
  },
  {
    "id": "bat-lco-coo-lioh",
    "name": "Hydrothermal synthesis of LiCoO2 from cobalt(II) oxide and lithium hydroxide",
    "reactants": [
      "lioh",
      "coo",
      "o2"
    ],
    "products": [
      "licoo2",
      "water"
    ],
    "enthalpy": -130,
    "desc": "Hydrothermal oxidation producing nanocrystalline LiCoO2.",
    "type": "redox_other",
    "effects": [],
    "net": "4 LiOH + 4 CoO + O2 → 4 LiCoO2 + 2 H2O"
  },
  {
    "id": "bat-lco-coco3-li2co3",
    "name": "Calcination synthesis of LiCoO2 from cobalt carbonate and lithium carbonate",
    "reactants": [
      "li2co3",
      "coco3",
      "o2"
    ],
    "products": [
      "licoo2",
      "co2"
    ],
    "enthalpy": 45,
    "desc": "Solid-state ceramic reaction.",
    "type": "redox_other",
    "effects": [],
    "net": "2 Li2CO3 + 4 CoCO3 + O2 → 4 LiCoO2 + 6 CO2"
  },
  {
    "id": "bat-lco-cooh2-lioh",
    "name": "Co-precipitation calcination of LiCoO2 from Co(OH)2 and LiOH",
    "reactants": [
      "lioh",
      "cooh2",
      "o2"
    ],
    "products": [
      "licoo2",
      "water"
    ],
    "enthalpy": -145,
    "desc": "Oxidative sintering of hydroxide co-precipitate.",
    "type": "redox_other",
    "effects": [],
    "net": "4 LiOH + 4 Co(OH)2 + O2 → 4 LiCoO2 + 6 H2O"
  },
  {
    "id": "bat-lno-nio-li2co3",
    "name": "Solid-state synthesis of LiNiO2 from nickel(II) oxide and lithium carbonate",
    "reactants": [
      "li2co3",
      "nio",
      "o2"
    ],
    "products": [
      "linio2",
      "co2"
    ],
    "enthalpy": -95,
    "desc": "High-temperature calcination under oxygen flow.",
    "type": "redox_other",
    "effects": [],
    "net": "2 Li2CO3 + 4 NiO + O2 → 4 LiNiO2 + 2 CO2"
  },
  {
    "id": "bat-lno-nio-lioh",
    "name": "Synthesis of LiNiO2 from nickel oxide and lithium hydroxide",
    "reactants": [
      "lioh",
      "nio",
      "o2"
    ],
    "products": [
      "linio2",
      "water"
    ],
    "enthalpy": -115,
    "desc": "Thermal sintering producing layered LiNiO2.",
    "type": "redox_other",
    "effects": [],
    "net": "4 LiOH + 4 NiO + O2 → 4 LiNiO2 + 2 H2O"
  },
  {
    "id": "bat-lno-nioh2-lioh",
    "name": "Calcination of nickel hydroxide precursor with LiOH producing LiNiO2",
    "reactants": [
      "lioh",
      "nioh2",
      "o2"
    ],
    "products": [
      "linio2",
      "water"
    ],
    "enthalpy": -135,
    "desc": "Precursor calcination in pure oxygen.",
    "type": "redox_other",
    "effects": [],
    "net": "4 LiOH + 4 Ni(OH)2 + O2 → 4 LiNiO2 + 6 H2O"
  },
  {
    "id": "bat-lno-nico3-li2co3",
    "name": "Carbonate calcination synthesis of LiNiO2",
    "reactants": [
      "li2co3",
      "nico3",
      "o2"
    ],
    "products": [
      "linio2",
      "co2"
    ],
    "enthalpy": 60,
    "desc": "Solid-state calcination.",
    "type": "redox_other",
    "effects": [],
    "net": "2 Li2CO3 + 4 NiCO3 + O2 → 4 LiNiO2 + 6 CO2"
  },
  {
    "id": "bat-lmo-spinel-li2co3",
    "name": "Synthesis of spinel LiMn2O4 from manganese dioxide and lithium carbonate",
    "reactants": [
      "li2co3",
      "mno2"
    ],
    "products": [
      "limn2o4",
      "co2",
      "o2"
    ],
    "enthalpy": 85,
    "desc": "Spinel synthesis at 750°C for high-rate Li-ion cells.",
    "type": "redox_other",
    "effects": [],
    "net": "2 Li2CO3 + 8 MnO2 → 4 LiMn2O4 + 2 CO2 + O2"
  },
  {
    "id": "bat-lmo-spinel-lioh",
    "name": "Synthesis of spinel LiMn2O4 from MnO2 and LiOH",
    "reactants": [
      "lioh",
      "mno2"
    ],
    "products": [
      "limn2o4",
      "water",
      "o2"
    ],
    "enthalpy": 65,
    "desc": "Thermal sintering producing 4V cathode spinel.",
    "type": "redox_other",
    "effects": [],
    "net": "4 LiOH + 8 MnO2 → 4 LiMn2O4 + 2 H2O + O2"
  },
  {
    "id": "bat-lmo-spinel-mnco3",
    "name": "Air calcination synthesis of LiMn2O4 from manganese carbonate",
    "reactants": [
      "li2co3",
      "mnco3",
      "o2"
    ],
    "products": [
      "limn2o4",
      "co2"
    ],
    "enthalpy": -210,
    "desc": "Oxidative carbonate calcination.",
    "type": "redox_other",
    "effects": [],
    "net": "2 Li2CO3 + 8 MnCO3 + 3 O2 → 4 LiMn2O4 + 10 CO2"
  },
  {
    "id": "bat-lmo-layered-li2co3",
    "name": "Synthesis of layered LiMnO2 from manganese dioxide and lithium carbonate",
    "reactants": [
      "li2co3",
      "mno2",
      "c"
    ],
    "products": [
      "limno2",
      "co2"
    ],
    "enthalpy": 45,
    "desc": "Carbothermal controlled reduction producing layered LiMnO2.",
    "type": "redox_other",
    "effects": [],
    "net": "2 Li2CO3 + 4 MnO2 + C → 4 LiMnO2 + 3 CO2"
  },
  {
    "id": "bat-lmo-layered-lioh",
    "name": "Hydrothermal synthesis of layered LiMnO2 from MnO2 and LiOH",
    "reactants": [
      "lioh",
      "mno2",
      "h2"
    ],
    "products": [
      "limno2",
      "water"
    ],
    "enthalpy": -85,
    "desc": "Reductive hydrothermal synthesis of layered LiMnO2.",
    "type": "redox_other",
    "effects": [],
    "net": "2 LiOH + 2 MnO2 + H2 → 2 LiMnO2 + 2 H2O"
  },
  {
    "id": "bat-lfp-fepo4-li2co3-c",
    "name": "Carbothermal reduction synthesis of LiFePO4 from FePO4 and Li2CO3",
    "reactants": [
      "li2co3",
      "fepo4",
      "c"
    ],
    "products": [
      "lifepo4",
      "co2",
      "co"
    ],
    "enthalpy": 140,
    "desc": "Carbothermal synthesis at 700°C under nitrogen yielding carbon-coated LFP.",
    "type": "redox_other",
    "effects": [],
    "net": "Li2CO3 + 2 FePO4 + C → 2 LiFePO4 + CO2 + CO"
  },
  {
    "id": "bat-lfp-fepo4-lioh-c",
    "name": "Carbothermal synthesis of LiFePO4 using lithium hydroxide",
    "reactants": [
      "lioh",
      "fepo4",
      "c"
    ],
    "products": [
      "lifepo4",
      "co2",
      "water"
    ],
    "enthalpy": 120,
    "desc": "Inert-atmosphere sintering of LFP.",
    "type": "redox_other",
    "effects": [],
    "net": "4 LiOH + 4 FePO4 + C → 4 LiFePO4 + CO2 + 2 H2O"
  },
  {
    "id": "bat-lfp-hydrothermal-feso4",
    "name": "Hydrothermal synthesis of LiFePO4 from FeSO4, LiOH, and H3PO4",
    "reactants": [
      "lioh",
      "feso4",
      "h3po4"
    ],
    "products": [
      "lifepo4",
      "li2so4",
      "water"
    ],
    "enthalpy": -180,
    "desc": "Autoclave hydrothermal synthesis at 180°C.",
    "type": "redox_other",
    "effects": [],
    "net": "3 LiOH + FeSO4 + H3PO4 → LiFePO4 + Li2SO4 + 3 H2O"
  },
  {
    "id": "bat-lfp-fe2o3-li2co3-c",
    "name": "Carbothermal reduction of hematite, phosphoric acid, and Li2CO3 to LiFePO4",
    "reactants": [
      "li2co3",
      "fe2o3",
      "h3po4",
      "c"
    ],
    "products": [
      "lifepo4",
      "co2",
      "water"
    ],
    "enthalpy": 160,
    "desc": "Low-cost precursor route for olivine LFP manufacturing.",
    "type": "redox_other",
    "effects": [],
    "net": "2 Li2CO3 + 2 Fe2O3 + 4 H3PO4 + C → 4 LiFePO4 + 3 CO2 + 6 H2O"
  },
  {
    "id": "bat-lfp-fe2o3-lioh-c",
    "name": "Carbothermal synthesis of LiFePO4 from Fe2O3 and LiOH",
    "reactants": [
      "lioh",
      "fe2o3",
      "h3po4",
      "c"
    ],
    "products": [
      "lifepo4",
      "co2",
      "water"
    ],
    "enthalpy": 145,
    "desc": "Direct carbothermal reduction under argon.",
    "type": "redox_other",
    "effects": [],
    "net": "4 LiOH + 2 Fe2O3 + 4 H3PO4 + C → 4 LiFePO4 + CO2 + 8 H2O"
  },
  {
    "id": "bat-lfp-fe3o4-li2co3-c",
    "name": "Carbothermal synthesis of LiFePO4 from magnetite precursor",
    "reactants": [
      "li2co3",
      "fe3o4",
      "h3po4",
      "c"
    ],
    "products": [
      "lifepo4",
      "co2",
      "water"
    ],
    "enthalpy": 130,
    "desc": "Magnetite route for olivine LFP.",
    "type": "redox_other",
    "effects": [],
    "net": "3 Li2CO3 + 2 Fe3O4 + 6 H3PO4 + C → 6 LiFePO4 + 4 CO2 + 9 H2O"
  },
  {
    "id": "bat-lfp-fe3o4-lioh-c",
    "name": "Hydrothermal-carbothermal LiFePO4 synthesis from Fe3O4 and LiOH",
    "reactants": [
      "lioh",
      "fe3o4",
      "h3po4",
      "c"
    ],
    "products": [
      "lifepo4",
      "co2",
      "water"
    ],
    "enthalpy": 115,
    "desc": "Magnetite precursor sintering.",
    "type": "redox_other",
    "effects": [],
    "net": "6 LiOH + 2 Fe3O4 + 6 H3PO4 + C → 6 LiFePO4 + CO2 + 12 H2O"
  },
  {
    "id": "bat-lfp-acid-leach-h2so4",
    "name": "Spent LFP battery recycling: sulfuric acid leaching",
    "reactants": [
      "lifepo4",
      "h2so4"
    ],
    "products": [
      "feso4",
      "li2so4",
      "h3po4"
    ],
    "enthalpy": -45,
    "desc": "Acid leaching recovering lithium and iron from shredded black mass.",
    "type": "redox_other",
    "effects": [],
    "net": "2 LiFePO4 + 3 H2SO4 → 2 FeSO4 + Li2SO4 + 2 H3PO4"
  },
  {
    "id": "bat-lfp-acid-leach-hcl",
    "name": "Hydrochloric acid leaching of spent LiFePO4 battery scrap",
    "reactants": [
      "lifepo4",
      "hcl"
    ],
    "products": [
      "fecl2",
      "licl",
      "h3po4"
    ],
    "enthalpy": -40,
    "desc": "Chloride leaching process.",
    "type": "redox_other",
    "effects": [],
    "net": "LiFePO4 + 3 HCl → FeCl2 + LiCl + H3PO4"
  },
  {
    "id": "bat-lfp-delithiation-h2o2",
    "name": "Chemical delithiation of LiFePO4 by hydrogen peroxide and sulfuric acid",
    "reactants": [
      "lifepo4",
      "h2o2",
      "h2so4"
    ],
    "products": [
      "fepo4",
      "li2so4",
      "water"
    ],
    "enthalpy": -165,
    "desc": "Chemical oxidation yielding pure heterosite FePO4.",
    "type": "redox_other",
    "effects": [],
    "net": "2 LiFePO4 + H2O2 + H2SO4 → 2 FePO4 + Li2SO4 + 2 H2O"
  },
  {
    "id": "bat-lco-acid-leach-h2so4",
    "name": "Hydrometallurgical recycling: oxidative sulfuric acid leaching of LiCoO2",
    "reactants": [
      "licoo2",
      "h2so4"
    ],
    "products": [
      "coso4",
      "li2so4",
      "o2",
      "water"
    ],
    "enthalpy": -120,
    "desc": "Sulfuric acid leaching dissolving cobalt and lithium with oxygen off-gassing.",
    "type": "redox_other",
    "effects": [],
    "net": "4 LiCoO2 + 6 H2SO4 → 4 CoSO4 + 2 Li2SO4 + O2 + 6 H2O"
  },
  {
    "id": "bat-lco-acid-leach-oxalic",
    "name": "Green hydrometallurgical recycling: oxalic acid reductive leaching of LiCoO2",
    "reactants": [
      "licoo2",
      "h2so4",
      "h2c2o4"
    ],
    "products": [
      "coso4",
      "li2so4",
      "co2",
      "water"
    ],
    "enthalpy": -280,
    "desc": "Organic acid assisted leaching converting cobalt(III) to cobalt(II).",
    "type": "redox_other",
    "effects": [],
    "net": "2 LiCoO2 + 3 H2SO4 + H2C2O4 → 2 CoSO4 + Li2SO4 + 2 CO2 + 4 H2O"
  },
  {
    "id": "bat-lco-acid-leach-hcl",
    "name": "Hydrochloric acid leaching of spent LiCoO2 cathode material",
    "reactants": [
      "licoo2",
      "hcl"
    ],
    "products": [
      "cocl2",
      "licl",
      "cl2",
      "water"
    ],
    "enthalpy": -195,
    "desc": "Acid digestion liberating chlorine gas.",
    "type": "redox_other",
    "effects": [],
    "net": "2 LiCoO2 + 8 HCl → 2 CoCl2 + 2 LiCl + Cl2 + 4 H2O"
  },
  {
    "id": "bat-lno-acid-leach-h2so4",
    "name": "Sulfuric acid dissolution of spent LiNiO2 cathode material",
    "reactants": [
      "linio2",
      "h2so4"
    ],
    "products": [
      "niso4",
      "li2so4",
      "o2",
      "water"
    ],
    "enthalpy": -115,
    "desc": "Hydrometallurgical extraction of nickel and lithium.",
    "type": "redox_other",
    "effects": [],
    "net": "4 LiNiO2 + 6 H2SO4 → 4 NiSO4 + 2 Li2SO4 + O2 + 6 H2O"
  },
  {
    "id": "bat-lno-acid-leach-hcl",
    "name": "Hydrochloric acid digestion of spent LiNiO2 scrap",
    "reactants": [
      "linio2",
      "hcl"
    ],
    "products": [
      "nicl2",
      "licl",
      "cl2",
      "water"
    ],
    "enthalpy": -190,
    "desc": "Chloride dissolution generating chlorine.",
    "type": "redox_other",
    "effects": [],
    "net": "2 LiNiO2 + 8 HCl → 2 NiCl2 + 2 LiCl + Cl2 + 4 H2O"
  },
  {
    "id": "bat-lmo-acid-leach-h2so4",
    "name": "Sulfuric acid leaching of spent LiMn2O4 spinel",
    "reactants": [
      "limn2o4",
      "h2so4"
    ],
    "products": [
      "mnso4",
      "li2so4",
      "o2",
      "water"
    ],
    "enthalpy": -130,
    "desc": "Dissolution of spent cathode spinel.",
    "type": "redox_other",
    "effects": [],
    "net": "4 LiMn2O4 + 10 H2SO4 → 8 MnSO4 + 2 Li2SO4 + 3 O2 + 10 H2O"
  },
  {
    "id": "bat-lmo-acid-leach-hcl",
    "name": "Hydrochloric acid leaching of spent LiMn2O4 cathode",
    "reactants": [
      "limn2o4",
      "hcl"
    ],
    "products": [
      "mncl2",
      "licl",
      "cl2",
      "water"
    ],
    "enthalpy": -210,
    "desc": "Chloride leaching dissolving manganese.",
    "type": "redox_other",
    "effects": [],
    "net": "2 LiMn2O4 + 16 HCl → 4 MnCl2 + 2 LiCl + 3 Cl2 + 8 H2O"
  },
  {
    "id": "bat-lco-thermal-decomposition",
    "name": "Thermal runaway: decomposition of delithiated LiCoO2 releasing oxygen",
    "reactants": [
      "licoo2"
    ],
    "products": [
      "coo",
      "li2o",
      "o2"
    ],
    "enthalpy": 115,
    "desc": "High-temperature thermal decomposition releasing oxygen gas.",
    "type": "decomposition",
    "effects": [],
    "net": "4 LiCoO2 → 4 CoO + 2 Li2O + O2"
  },
  {
    "id": "bat-lno-thermal-decomposition",
    "name": "Thermal runaway: decomposition of delithiated LiNiO2 releasing oxygen",
    "reactants": [
      "linio2"
    ],
    "products": [
      "nio",
      "li2o",
      "o2"
    ],
    "enthalpy": 85,
    "desc": "Oxygen evolution from charged nickel-rich cathode.",
    "type": "decomposition",
    "effects": [],
    "net": "4 LiNiO2 → 4 NiO + 2 Li2O + O2"
  },
  {
    "id": "bat-lmo-thermal-decomposition",
    "name": "Thermal decomposition of spinel LiMn2O4",
    "reactants": [
      "limn2o4"
    ],
    "products": [
      "mn2o3",
      "li2o",
      "o2"
    ],
    "enthalpy": 140,
    "desc": "Thermal reduction of manganese spinel at elevated temperatures.",
    "type": "decomposition",
    "effects": [],
    "net": "4 LiMn2O4 → 4 Mn2O3 + 2 Li2O + O2"
  },
  {
    "id": "bat-recov-li2co3-na2co3",
    "name": "Lithium recovery: precipitation of battery-grade lithium carbonate from sulfate brine",
    "reactants": [
      "li2so4",
      "na2co3"
    ],
    "products": [
      "li2co3",
      "na2so4"
    ],
    "enthalpy": -18,
    "desc": "Soda ash precipitation of sparingly soluble Li2CO3 at 90°C.",
    "type": "precipitation",
    "effects": [],
    "net": "Li2SO4 + Na2CO3 → Li2CO3 + Na2SO4"
  },
  {
    "id": "bat-recov-li2co3-licl",
    "name": "Precipitation of lithium carbonate from concentrated lithium chloride eluate",
    "reactants": [
      "licl",
      "na2co3"
    ],
    "products": [
      "li2co3",
      "nacl"
    ],
    "enthalpy": -15,
    "desc": "Hot carbonate precipitation recovering refined lithium salt.",
    "type": "precipitation",
    "effects": [],
    "net": "2 LiCl + Na2CO3 → Li2CO3 + 2 NaCl"
  },
  {
    "id": "bat-recov-li2co3-lino3",
    "name": "Precipitation of lithium carbonate from nitrate strip solution",
    "reactants": [
      "lino3",
      "na2co3"
    ],
    "products": [
      "li2co3",
      "nano3"
    ],
    "enthalpy": -16,
    "desc": "Carbonate recovery from solvent extraction eluate.",
    "type": "precipitation",
    "effects": [],
    "net": "2 LiNO3 + Na2CO3 → Li2CO3 + 2 NaNO3"
  },
  {
    "id": "bat-lfp-recov-naoh",
    "name": "Alkaline digestion of spent LiFePO4 recovering lithium hydroxide",
    "reactants": [
      "lifepo4",
      "naoh"
    ],
    "products": [
      "feoh2",
      "na3po4",
      "lioh"
    ],
    "enthalpy": -65,
    "desc": "Mechanochemical alkaline leaching separating lithium from iron phosphate.",
    "type": "redox_other",
    "effects": [],
    "net": "LiFePO4 + 3 NaOH → Fe(OH)2 + Na3PO4 + LiOH"
  },
  {
    "id": "bat-lco-recov-naoh",
    "name": "Caustic precipitation of cobalt hydroxide from battery leach sulfate",
    "reactants": [
      "coso4",
      "naoh"
    ],
    "products": [
      "cooh2",
      "na2so4"
    ],
    "enthalpy": -85,
    "desc": "Hydroxide precipitation isolating cobalt precursor.",
    "type": "precipitation",
    "effects": [],
    "net": "CoSO4 + 2 NaOH → Co(OH)2 + Na2SO4"
  },
  {
    "id": "bat-lmo-recov-naoh",
    "name": "Precipitation of manganese hydroxide from battery leachate",
    "reactants": [
      "mnso4",
      "naoh"
    ],
    "products": [
      "mnoh2",
      "na2so4"
    ],
    "enthalpy": -82,
    "desc": "Alkaline precipitation isolating manganese hydroxide.",
    "type": "precipitation",
    "effects": [],
    "net": "MnSO4 + 2 NaOH → Mn(OH)2 + Na2SO4"
  },
  {
    "id": "bat-lno-thermal-coo",
    "name": "Thermal decomposition of cobalt carbonate to cobalt oxide",
    "reactants": [
      "coco3"
    ],
    "products": [
      "coo",
      "co2"
    ],
    "enthalpy": 88,
    "desc": "Calcination regenerating cobalt precursor.",
    "type": "decomposition",
    "effects": [],
    "net": "CoCO3 → CoO + CO2"
  },
  {
    "id": "bat-lno-thermal-nico3",
    "name": "Thermal calcination of nickel carbonate to nickel oxide",
    "reactants": [
      "nico3"
    ],
    "products": [
      "nio",
      "co2"
    ],
    "enthalpy": 85,
    "desc": "Thermal decomposition producing green NiO powder.",
    "type": "decomposition",
    "effects": [],
    "net": "NiCO3 → NiO + CO2"
  },
  {
    "id": "bat-lmo-thermal-mnco3",
    "name": "Thermal air roasting of manganese carbonate to manganese dioxide",
    "reactants": [
      "mnco3",
      "o2"
    ],
    "products": [
      "mno2",
      "co2"
    ],
    "enthalpy": -65,
    "desc": "Air oxidation yielding battery-active electrolytic manganese dioxide (EMD).",
    "type": "redox_other",
    "effects": [],
    "net": "2 MnCO3 + O2 → 2 MnO2 + 2 CO2"
  },
  {
    "id": "bat-feoh2-air-oxidation",
    "name": "Air oxidation of iron(II) hydroxide to iron(III) oxide during battery recycling",
    "reactants": [
      "feoh2",
      "o2"
    ],
    "products": [
      "fe2o3",
      "water"
    ],
    "enthalpy": -320,
    "desc": "Iron removal stage in hydrometallurgical purification.",
    "type": "redox_other",
    "effects": [],
    "net": "4 Fe(OH)2 + O2 → 2 Fe2O3 + 4 H2O"
  },
  {
    "id": "bat-feoh2-acetic-leach",
    "name": "Acetic acid dissolution of recycled iron(II) hydroxide",
    "reactants": [
      "feoh2",
      "ch3cooh"
    ],
    "products": [
      "ch3coo-2-fe",
      "water"
    ],
    "enthalpy": -62,
    "desc": "Organic acid leaching producing iron(II) acetate precursor.",
    "type": "acid_base_neutralization",
    "effects": [],
    "net": "Fe(OH)2 + 2 CH3COOH → (CH3COO)2Fe + 2 H2O"
  },
  {
    "id": "bat-cooh2-dehydration",
    "name": "Thermal dehydration of cobalt(II) hydroxide to cobalt(II) oxide",
    "reactants": [
      "cooh2"
    ],
    "products": [
      "coo",
      "water"
    ],
    "enthalpy": 65,
    "desc": "Calcination producing CoO.",
    "type": "decomposition",
    "effects": [],
    "net": "Co(OH)2 → CoO + H2O"
  },
  {
    "id": "bat-lipf6-hydrolysis-water",
    "name": "Moisture degradation of LiPF6 battery electrolyte generating toxic HF gas",
    "reactants": [
      "lipf6",
      "water"
    ],
    "products": [
      "lif",
      "hf",
      "h3po4"
    ],
    "enthalpy": -145,
    "desc": "Exothermic electrolyte hydrolysis forming corrosive hydrofluoric acid and lithium fluoride precipitate.",
    "type": "gas_evolution",
    "effects": [],
    "net": "LiPF6 + 4 H2O → LiF + 5 HF + H3PO4"
  },
  {
    "id": "bat-lipf6-neutralize-naoh",
    "name": "Caustic soda neutralization of spent LiPF6 electrolyte",
    "reactants": [
      "lipf6",
      "naoh"
    ],
    "products": [
      "lif",
      "naf",
      "na3po4",
      "water"
    ],
    "enthalpy": -380,
    "desc": "Waste electrolyte treatment precipitating insoluble fluorides.",
    "type": "precipitation",
    "effects": [],
    "net": "LiPF6 + 8 NaOH → LiF + 5 NaF + Na3PO4 + 4 H2O"
  },
  {
    "id": "bat-lipf6-neutralize-koh",
    "name": "Potassium hydroxide neutralization of spent LiPF6 electrolyte",
    "reactants": [
      "lipf6",
      "koh"
    ],
    "products": [
      "lif",
      "kf",
      "k3po4",
      "water"
    ],
    "enthalpy": -395,
    "desc": "Caustic potash neutralization.",
    "type": "redox_other",
    "effects": [],
    "net": "LiPF6 + 8 KOH → LiF + 5 KF + K3PO4 + 4 H2O"
  },
  {
    "id": "bat-libf4-neutralize-naoh",
    "name": "Caustic neutralization of LiBF4 battery electrolyte salt",
    "reactants": [
      "libf4",
      "naoh"
    ],
    "products": [
      "lif",
      "naf",
      "h3bo3"
    ],
    "enthalpy": -220,
    "desc": "Alkaline neutralization recovering lithium fluoride.",
    "type": "redox_other",
    "effects": [],
    "net": "LiBF4 + 3 NaOH → LiF + 3 NaF + H3BO3"
  },
  {
    "id": "bat-libf4-neutralize-koh",
    "name": "Potassium hydroxide neutralization of LiBF4 salt",
    "reactants": [
      "libf4",
      "koh"
    ],
    "products": [
      "lif",
      "kf",
      "h3bo3"
    ],
    "enthalpy": -230,
    "desc": "Neutralization yielding boric acid.",
    "type": "redox_other",
    "effects": [],
    "net": "LiBF4 + 3 KOH → LiF + 3 KF + H3BO3"
  },
  {
    "id": "bat-liclo4-thermal-decomp",
    "name": "Thermal decomposition of lithium perchlorate solid electrolyte",
    "reactants": [
      "liclo4"
    ],
    "products": [
      "licl",
      "o2"
    ],
    "enthalpy": 28,
    "desc": "High-temperature decomposition releasing oxygen.",
    "type": "decomposition",
    "effects": [],
    "net": "LiClO4 → LiCl + 2 O2"
  },
  {
    "id": "bat-liclo4-combustion-c",
    "name": "Deflagration reaction of lithium perchlorate with carbon anode dust",
    "reactants": [
      "liclo4",
      "c"
    ],
    "products": [
      "licl",
      "co2"
    ],
    "enthalpy": -410,
    "desc": "Exothermic runaway reaction with graphite dust.",
    "type": "combustion",
    "effects": [],
    "net": "LiClO4 + 2 C → LiCl + 2 CO2"
  },
  {
    "id": "bat-liclo4-reduction-h2",
    "name": "Hydrogen reduction of lithium perchlorate to lithium chloride",
    "reactants": [
      "liclo4",
      "h2"
    ],
    "products": [
      "licl",
      "water"
    ],
    "enthalpy": -620,
    "desc": "Gas-phase catalytic reduction.",
    "type": "redox_other",
    "effects": [],
    "net": "LiClO4 + 4 H2 → LiCl + 4 H2O"
  },
  {
    "id": "bat-liclo4-reduction-co",
    "name": "Carbon monoxide reduction of lithium perchlorate",
    "reactants": [
      "liclo4",
      "co"
    ],
    "products": [
      "licl",
      "co2"
    ],
    "enthalpy": -710,
    "desc": "Reductive destruction of spent perchlorate.",
    "type": "redox_other",
    "effects": [],
    "net": "LiClO4 + 4 CO → LiCl + 4 CO2"
  },
  {
    "id": "bat-lic2h3o2-acid-hcl",
    "name": "Acidification of lithium acetate precursor by hydrochloric acid",
    "reactants": [
      "lic2h3o2",
      "hcl"
    ],
    "products": [
      "licl",
      "ch3cooh"
    ],
    "enthalpy": -18,
    "desc": "Synthesis of lithium chloride and glacial acetic acid.",
    "type": "acid_base_neutralization",
    "effects": [],
    "net": "C2H3LiO2 + HCl → LiCl + CH3COOH"
  },
  {
    "id": "bat-lic2h3o2-acid-hbr",
    "name": "Hydrobromic acid reaction with lithium acetate",
    "reactants": [
      "lic2h3o2",
      "hbr"
    ],
    "products": [
      "libr",
      "ch3cooh"
    ],
    "enthalpy": -19,
    "desc": "Synthesis of battery-grade lithium bromide.",
    "type": "acid_base_neutralization",
    "effects": [],
    "net": "C2H3LiO2 + HBr → LiBr + CH3COOH"
  },
  {
    "id": "bat-lic2h3o2-acid-h2so4",
    "name": "Conversion of lithium acetate to lithium sulfate by sulfuric acid",
    "reactants": [
      "lic2h3o2",
      "h2so4"
    ],
    "products": [
      "li2so4",
      "ch3cooh"
    ],
    "enthalpy": -22,
    "desc": "Acid metathesis generating lithium sulfate.",
    "type": "acid_base_neutralization",
    "effects": [],
    "net": "2 C2H3LiO2 + H2SO4 → Li2SO4 + 2 CH3COOH"
  },
  {
    "id": "bat-lic2h3o2-acid-hno3",
    "name": "Nitric acid acidification of lithium acetate",
    "reactants": [
      "lic2h3o2",
      "hno3"
    ],
    "products": [
      "lino3",
      "ch3cooh"
    ],
    "enthalpy": -17,
    "desc": "Synthesis of lithium nitrate oxidizer.",
    "type": "acid_base_neutralization",
    "effects": [],
    "net": "C2H3LiO2 + HNO3 → LiNO3 + CH3COOH"
  },
  {
    "id": "bat-lic2h3o2-combustion",
    "name": "Thermal combustion of lithium acetate gel precursor",
    "reactants": [
      "lic2h3o2",
      "o2"
    ],
    "products": [
      "li2co3",
      "co2",
      "water"
    ],
    "enthalpy": -1680,
    "desc": "Sol-gel combustion synthesis of lithium oxide/carbonate precursor.",
    "type": "combustion",
    "effects": [],
    "net": "2 C2H3LiO2 + 4 O2 → Li2CO3 + 3 CO2 + 3 H2O"
  },
  {
    "id": "bat-lic2h3o2-pyrolysis",
    "name": "Dry pyrolysis of anhydrous lithium acetate producing acetone",
    "reactants": [
      "lic2h3o2"
    ],
    "products": [
      "li2co3",
      "ch3coch3"
    ],
    "enthalpy": 95,
    "desc": "Thermal ketonization generating acetone and lithium carbonate.",
    "type": "decomposition",
    "effects": [],
    "net": "2 C2H3LiO2 → Li2CO3 + CH3COCH3"
  },
  {
    "id": "bat-vrfb-v2o5-reduction-c",
    "name": "Carbothermal sulfuric acid digestion of V2O5 to vanadyl sulfate electrolyte",
    "reactants": [
      "v2o5",
      "h2so4",
      "c"
    ],
    "products": [
      "voso4",
      "co2",
      "water"
    ],
    "enthalpy": -85,
    "desc": "Preparation of V(IV) positive electrolyte from vanadium pentoxide.",
    "type": "redox_other",
    "effects": [],
    "net": "2 V2O5 + 4 H2SO4 + C → 4 VOSO4 + CO2 + 4 H2O"
  },
  {
    "id": "bat-vrfb-v2o5-reduction-methanol",
    "name": "Methanol reduction of V2O5 to vanadyl sulfate electrolyte",
    "reactants": [
      "v2o5",
      "h2so4",
      "ch3oh"
    ],
    "products": [
      "voso4",
      "hcho",
      "water"
    ],
    "enthalpy": -175,
    "desc": "Alcohol reduction synthesizing vanadyl posolyte.",
    "type": "redox_other",
    "effects": [],
    "net": "V2O5 + 2 H2SO4 + CH3OH → 2 VOSO4 + HCHO + 3 H2O"
  },
  {
    "id": "bat-vrfb-v2o5-hbr-reduction",
    "name": "Hydrobromic acid reduction of vanadium pentoxide",
    "reactants": [
      "v2o5",
      "hbr"
    ],
    "products": [
      "v2o3",
      "br2",
      "water"
    ],
    "enthalpy": -110,
    "desc": "Bromide reduction of vanadium pentoxide.",
    "type": "redox_other",
    "effects": [],
    "net": "V2O5 + 4 HBr → V2O3 + 2 Br2 + 2 H2O"
  },
  {
    "id": "bat-vrfb-comproportionation",
    "name": "VRFB electrolyte balancing: comproportionation of V(IV) and V(II) to V(III)",
    "reactants": [
      "voso4",
      "vso4",
      "h2so4"
    ],
    "products": [
      "v2-so4-3",
      "water"
    ],
    "enthalpy": -95,
    "desc": "Electrolyte rebalancing reaction yielding homogeneous V(III) solution.",
    "type": "redox_other",
    "effects": [],
    "net": "VOSO4 + VSO4 + H2SO4 → V2(SO4)3 + H2O"
  },
  {
    "id": "bat-vrfb-v3-air-oxidation",
    "name": "Air oxidation of vanadium(III) sulfate electrolyte to vanadyl sulfate",
    "reactants": [
      "v2-so4-3",
      "o2",
      "water"
    ],
    "products": [
      "voso4",
      "h2so4"
    ],
    "enthalpy": -245,
    "desc": "Capacity loss mechanism in VRFB negative tank due to oxygen cross-contamination.",
    "type": "redox_other",
    "effects": [],
    "net": "2 V2(SO4)3 + O2 + 2 H2O → 4 VOSO4 + 2 H2SO4"
  },
  {
    "id": "bat-vrfb-v2-air-oxidation",
    "name": "Rapid air oxidation of vanadium(II) sulfate negative electrolyte",
    "reactants": [
      "vso4",
      "o2",
      "h2so4"
    ],
    "products": [
      "v2-so4-3",
      "water"
    ],
    "enthalpy": -320,
    "desc": "Parasitic atmospheric oxidation of purple V(II) negolyte to green V(III).",
    "type": "redox_other",
    "effects": [],
    "net": "4 VSO4 + O2 + 2 H2SO4 → 2 V2(SO4)3 + 2 H2O"
  },
  {
    "id": "bat-vrfb-v2-corrosion-h2",
    "name": "Parasitic hydrogen evolution corrosion of vanadium(II) negolyte",
    "reactants": [
      "vso4",
      "h2so4"
    ],
    "products": [
      "v2-so4-3",
      "h2"
    ],
    "enthalpy": -42,
    "desc": "Self-discharge hydrogen evolution on carbon felt electrodes.",
    "type": "gas_evolution",
    "effects": [],
    "net": "2 VSO4 + H2SO4 → V2(SO4)3 + H2"
  },
  {
    "id": "bat-vrfb-v4-reduction-zn",
    "name": "Zinc metal chemical reduction of vanadyl sulfate V(IV) to V(III)",
    "reactants": [
      "voso4",
      "zn",
      "h2so4"
    ],
    "products": [
      "v2-so4-3",
      "znso4",
      "water"
    ],
    "enthalpy": -195,
    "desc": "Chemical reduction for electrolyte testing.",
    "type": "redox_other",
    "effects": [],
    "net": "2 VOSO4 + Zn + 2 H2SO4 → V2(SO4)3 + ZnSO4 + 2 H2O"
  },
  {
    "id": "bat-vrfb-v3-reduction-zn",
    "name": "Zinc metal reduction of vanadium(III) sulfate to vanadium(II) sulfate",
    "reactants": [
      "v2-so4-3",
      "zn"
    ],
    "products": [
      "vso4",
      "znso4"
    ],
    "enthalpy": -140,
    "desc": "Deep reduction generating active purple V(II) negolyte.",
    "type": "redox_other",
    "effects": [],
    "net": "V2(SO4)3 + Zn → 2 VSO4 + ZnSO4"
  },
  {
    "id": "bat-vrfb-v4-reduction-fe",
    "name": "Iron metal reduction of vanadyl sulfate to vanadium(III)",
    "reactants": [
      "voso4",
      "fe",
      "h2so4"
    ],
    "products": [
      "v2-so4-3",
      "feso4",
      "water"
    ],
    "enthalpy": -165,
    "desc": "Chemical reduction of posolyte.",
    "type": "redox_other",
    "effects": [],
    "net": "2 VOSO4 + Fe + 2 H2SO4 → V2(SO4)3 + FeSO4 + 2 H2O"
  },
  {
    "id": "bat-vrfb-v3-reduction-fe",
    "name": "Iron reduction of vanadium(III) sulfate to vanadium(II)",
    "reactants": [
      "v2-so4-3",
      "fe"
    ],
    "products": [
      "vso4",
      "feso4"
    ],
    "enthalpy": -95,
    "desc": "Reductive activation.",
    "type": "redox_other",
    "effects": [],
    "net": "V2(SO4)3 + Fe → 2 VSO4 + FeSO4"
  },
  {
    "id": "bat-vrfb-v4-reduction-mg",
    "name": "Magnesium reduction of vanadyl sulfate to V(III)",
    "reactants": [
      "voso4",
      "mg",
      "h2so4"
    ],
    "products": [
      "v2-so4-3",
      "mgso4",
      "water"
    ],
    "enthalpy": -340,
    "desc": "Exothermic chemical reduction.",
    "type": "redox_other",
    "effects": [],
    "net": "2 VOSO4 + Mg + 2 H2SO4 → V2(SO4)3 + MgSO4 + 2 H2O"
  },
  {
    "id": "bat-vrfb-v3-reduction-mg",
    "name": "Magnesium reduction of V(III) sulfate to V(II)",
    "reactants": [
      "v2-so4-3",
      "mg"
    ],
    "products": [
      "vso4",
      "mgso4"
    ],
    "enthalpy": -285,
    "desc": "Energetic reduction yielding purple VSO4.",
    "type": "redox_other",
    "effects": [],
    "net": "V2(SO4)3 + Mg → 2 VSO4 + MgSO4"
  },
  {
    "id": "bat-vrfb-voso4-precipitation-naoh",
    "name": "Oxidative alkaline precipitation of vanadyl sulfate by NaOH",
    "reactants": [
      "voso4",
      "naoh",
      "o2"
    ],
    "products": [
      "v2o5",
      "na2so4",
      "water"
    ],
    "enthalpy": -180,
    "desc": "Alkaline precipitation recovering vanadium pentoxide.",
    "type": "redox_other",
    "effects": [],
    "net": "4 VOSO4 + 8 NaOH + O2 → 2 V2O5 + 4 Na2SO4 + 4 H2O"
  },
  {
    "id": "bat-vrfb-v2so43-precipitation-naoh",
    "name": "Alkaline precipitation of vanadium(III) oxide from V2(SO4)3",
    "reactants": [
      "v2-so4-3",
      "naoh"
    ],
    "products": [
      "v2o3",
      "na2so4",
      "water"
    ],
    "enthalpy": -170,
    "desc": "Precipitation of black vanadium(III) oxide.",
    "type": "redox_other",
    "effects": [],
    "net": "V2(SO4)3 + 6 NaOH → V2O3 + 3 Na2SO4 + 3 H2O"
  },
  {
    "id": "bat-sib-natio2-synthesis",
    "name": "Solid-state carbothermal synthesis of sodium titanate (NaTiO2) anode material",
    "reactants": [
      "na2co3",
      "tio2",
      "c"
    ],
    "products": [
      "natio2",
      "co",
      "co2"
    ],
    "enthalpy": 185,
    "desc": "High-temperature reductive sintering of NaTiO2 sodium-ion battery anode.",
    "type": "redox_other",
    "effects": [],
    "net": "Na2CO3 + 2 TiO2 + C → 2 NaTiO2 + CO + CO2"
  },
  {
    "id": "bat-sib-natio2-acid-hcl",
    "name": "Hydrochloric acid digestion of sodium titanate",
    "reactants": [
      "natio2",
      "hcl"
    ],
    "products": [
      "nacl",
      "tio2",
      "h2"
    ],
    "enthalpy": -65,
    "desc": "Acid digestion liberating hydrogen gas.",
    "type": "gas_evolution",
    "effects": [],
    "net": "2 NaTiO2 + 2 HCl → 2 NaCl + 2 TiO2 + H2"
  },
  {
    "id": "bat-sib-natio2-acid-h2so4",
    "name": "Sulfuric acid dissolution of sodium titanate",
    "reactants": [
      "natio2",
      "h2so4"
    ],
    "products": [
      "na2so4",
      "tio2",
      "h2"
    ],
    "enthalpy": -70,
    "desc": "Acid digestion releasing hydrogen.",
    "type": "gas_evolution",
    "effects": [],
    "net": "2 NaTiO2 + H2SO4 → Na2SO4 + 2 TiO2 + H2"
  },
  {
    "id": "bat-sib-natio2-acid-hno3",
    "name": "Nitric acid oxidation of sodium titanate",
    "reactants": [
      "natio2",
      "hno3"
    ],
    "products": [
      "nano3",
      "tio2",
      "no2",
      "water"
    ],
    "enthalpy": -195,
    "desc": "Oxidative acid digestion.",
    "type": "redox_other",
    "effects": [],
    "net": "NaTiO2 + 2 HNO3 → NaNO3 + TiO2 + NO2 + H2O"
  },
  {
    "id": "bat-sib-natio2-air-oxidation",
    "name": "Air oxidation of sodium titanate anode material",
    "reactants": [
      "natio2",
      "o2"
    ],
    "products": [
      "na2o",
      "tio2"
    ],
    "enthalpy": -260,
    "desc": "Atmospheric degradation of sensitive sodium titanate.",
    "type": "redox_other",
    "effects": [],
    "net": "4 NaTiO2 + O2 → 2 Na2O + 4 TiO2"
  },
  {
    "id": "bat-sib-nasicon-synth-na2co3",
    "name": "Carbothermal synthesis of NASICON Na3V2(PO4)3 cathode from V2O5 and soda ash",
    "reactants": [
      "na2co3",
      "v2o5",
      "h3po4",
      "c"
    ],
    "products": [
      "na3v2-po4-3",
      "co2",
      "water"
    ],
    "enthalpy": 240,
    "desc": "Synthesis of high-voltage NASICON sodium super-ionic conductor cathode.",
    "type": "redox_other",
    "effects": [],
    "net": "3 Na2CO3 + 2 V2O5 + 6 H3PO4 + 2 C → 2 Na3V2(PO4)3 + 5 CO2 + 9 H2O"
  },
  {
    "id": "bat-sib-nasicon-synth-naoh",
    "name": "Hydrothermal-carbothermal synthesis of Na3V2(PO4)3 using NaOH",
    "reactants": [
      "naoh",
      "v2o5",
      "h3po4",
      "c"
    ],
    "products": [
      "na3v2-po4-3",
      "co2",
      "water"
    ],
    "enthalpy": 215,
    "desc": "Caustic hydrothermal route for NASICON cathode nanoparticles.",
    "type": "redox_other",
    "effects": [],
    "net": "3 NaOH + V2O5 + 3 H3PO4 + C → Na3V2(PO4)3 + CO2 + 6 H2O"
  },
  {
    "id": "bat-sib-nasicon-synth-v2o3",
    "name": "Direct ceramic synthesis of Na3V2(PO4)3 from vanadium(III) oxide",
    "reactants": [
      "na2co3",
      "v2o3",
      "h3po4"
    ],
    "products": [
      "na3v2-po4-3",
      "co2",
      "water"
    ],
    "enthalpy": 140,
    "desc": "Single-phase synthesis under inert atmosphere.",
    "type": "redox_other",
    "effects": [],
    "net": "3 Na2CO3 + 2 V2O3 + 6 H3PO4 → 2 Na3V2(PO4)3 + 3 CO2 + 9 H2O"
  },
  {
    "id": "bat-sib-alluaudite-synthesis",
    "name": "Solid-state synthesis of alluaudite Na2Fe2(SO4)3 high-voltage cathode",
    "reactants": [
      "na2so4",
      "feso4"
    ],
    "products": [
      "na2fe2-so4-3"
    ],
    "enthalpy": 25,
    "desc": "Low-temperature solid-state sintering at 350°C forming 3.8V alluaudite cathode.",
    "type": "synthesis",
    "effects": [],
    "net": "Na2SO4 + 2 FeSO4 → Na2Fe2(SO4)3"
  },
  {
    "id": "bat-sib-alluaudite-hydrolysis-naoh",
    "name": "Alkaline decomposition of alluaudite cathode scrap",
    "reactants": [
      "na2fe2-so4-3",
      "naoh"
    ],
    "products": [
      "feoh2",
      "na2so4"
    ],
    "enthalpy": -120,
    "desc": "Alkaline hydrometallurgical recycling.",
    "type": "redox_other",
    "effects": [],
    "net": "Na2Fe2(SO4)3 + 4 NaOH → 2 Fe(OH)2 + 3 Na2SO4"
  },
  {
    "id": "bat-sib-alluaudite-acid-hcl",
    "name": "Hydrochloric acid leaching of spent alluaudite sodium-iron cathode",
    "reactants": [
      "na2fe2-so4-3",
      "hcl"
    ],
    "products": [
      "fecl2",
      "nacl",
      "h2so4"
    ],
    "enthalpy": -55,
    "desc": "Acid leaching separating sodium and iron salts.",
    "type": "redox_other",
    "effects": [],
    "net": "Na2Fe2(SO4)3 + 6 HCl → 2 FeCl2 + 2 NaCl + 3 H2SO4"
  },
  {
    "id": "bat-sib-nasicon-acid-leach-h2so4",
    "name": "Sulfuric acid leaching of spent NASICON Na3V2(PO4)3 cathode",
    "reactants": [
      "na3v2-po4-3",
      "h2so4",
      "o2",
      "water"
    ],
    "products": [
      "voso4",
      "na2so4",
      "h3po4"
    ],
    "enthalpy": -310,
    "desc": "Hydrometallurgical recovery of vanadium and sodium phosphate.",
    "type": "redox_other",
    "effects": [],
    "net": "2 Na3V2(PO4)3 + 7 H2SO4 + O2 + 2 H2O → 4 VOSO4 + 3 Na2SO4 + 6 H3PO4"
  },
  {
    "id": "bat-sib-nasicon-acid-leach-hcl",
    "name": "Hydrochloric acid leaching of spent NASICON material",
    "reactants": [
      "na3v2-po4-3",
      "hcl"
    ],
    "products": [
      "vcl3",
      "nacl",
      "h3po4"
    ],
    "enthalpy": -180,
    "desc": "Chloride leaching of sodium vanadium phosphate.",
    "type": "redox_other",
    "effects": [],
    "net": "Na3V2(PO4)3 + 9 HCl → 2 VCl3 + 3 NaCl + 3 H3PO4"
  },
  {
    "id": "bat-sib-alluaudite-thermal-decomp",
    "name": "Thermal decomposition of alluaudite Na2Fe2(SO4)3 at 600°C",
    "reactants": [
      "na2fe2-so4-3"
    ],
    "products": [
      "na2so4",
      "fe2o3",
      "so2",
      "o2"
    ],
    "enthalpy": 185,
    "desc": "Thermal degradation releasing sulfur dioxide.",
    "type": "decomposition",
    "effects": [],
    "net": "2 Na2Fe2(SO4)3 → 2 Na2SO4 + 2 Fe2O3 + 4 SO2 + O2"
  },
  {
    "id": "bat-sib-natio2-hydrolysis-water",
    "name": "Aqueous corrosion of sodium titanate anode by moisture",
    "reactants": [
      "natio2",
      "water"
    ],
    "products": [
      "naoh",
      "tio2",
      "h2"
    ],
    "enthalpy": -45,
    "desc": "Aqueous hydrolysis releasing hydrogen gas.",
    "type": "gas_evolution",
    "effects": [],
    "net": "2 NaTiO2 + 2 H2O → 2 NaOH + 2 TiO2 + H2"
  },
  {
    "id": "bat-mxene-combustion",
    "name": "Thermal combustion of Ti3C2 MXene 2D nanosheets in air",
    "reactants": [
      "ti3c2",
      "o2"
    ],
    "products": [
      "tio2",
      "co2"
    ],
    "enthalpy": -3150,
    "desc": "High-temperature oxidative destruction of MXene sheets.",
    "type": "combustion",
    "effects": [],
    "net": "Ti3C2 + 5 O2 → 3 TiO2 + 2 CO2"
  },
  {
    "id": "bat-mxene-chlorination",
    "name": "High-temperature chlorination of Ti3C2 MXene",
    "reactants": [
      "ti3c2",
      "cl2"
    ],
    "products": [
      "ticl4",
      "c"
    ],
    "enthalpy": -1180,
    "desc": "Chlorination producing volatile TiCl4 and carbide-derived carbon (CDC).",
    "type": "redox_other",
    "effects": [],
    "net": "Ti3C2 + 6 Cl2 → 3 TiCl4 + 2 C"
  },
  {
    "id": "bat-mxene-peroxide-oxidation",
    "name": "Chemical degradation of Ti3C2 MXene colloidal flakes by hydrogen peroxide",
    "reactants": [
      "ti3c2",
      "h2o2"
    ],
    "products": [
      "tio2",
      "co2",
      "water"
    ],
    "enthalpy": -3850,
    "desc": "Oxidative destruction of 2D titanium carbide.",
    "type": "redox_other",
    "effects": [],
    "net": "Ti3C2 + 10 H2O2 → 3 TiO2 + 2 CO2 + 10 H2O"
  },
  {
    "id": "bat-mxene-nitric-digestion",
    "name": "Oxidative acid digestion of Ti3C2 MXene in hot nitric acid",
    "reactants": [
      "ti3c2",
      "hno3"
    ],
    "products": [
      "tio2",
      "co2",
      "no2",
      "water"
    ],
    "enthalpy": -4200,
    "desc": "Acid digestion liberating dense nitrogen dioxide plumes.",
    "type": "redox_other",
    "effects": [],
    "net": "Ti3C2 + 20 HNO3 → 3 TiO2 + 2 CO2 + 20 NO2 + 10 H2O"
  },
  {
    "id": "bat-sei-li-fluorination",
    "name": "Direct fluorination of lithium metal anode creating compact LiF SEI",
    "reactants": [
      "li",
      "f2"
    ],
    "products": [
      "lif"
    ],
    "enthalpy": -616,
    "desc": "Direct gas-phase fluorination forming artificial SEI.",
    "type": "synthesis",
    "effects": [],
    "net": "2 Li + F2 → 2 LiF"
  },
  {
    "id": "bat-sei-li-co2-carbonate",
    "name": "CO2 electrolyte additive passivation: formation of Li2CO3 on lithium anode",
    "reactants": [
      "li",
      "co2"
    ],
    "products": [
      "li2co3",
      "c"
    ],
    "enthalpy": -720,
    "desc": "SEI stabilization preventing lithium dendrite growth.",
    "type": "redox_other",
    "effects": [],
    "net": "4 Li + 3 CO2 → 2 Li2CO3 + C"
  },
  {
    "id": "bat-sei-li-hf-scavenging",
    "name": "Lithium metal scavenging of trace HF in battery electrolyte forming LiF",
    "reactants": [
      "li",
      "hf"
    ],
    "products": [
      "lif",
      "h2"
    ],
    "enthalpy": -320,
    "desc": "Passivation reaction generating LiF SEI layer.",
    "type": "redox_other",
    "effects": [],
    "net": "2 Li + 2 HF → 2 LiF + H2"
  },
  {
    "id": "bat-sei-na-fluorination",
    "name": "Fluorination of sodium metal anode to NaF passivating interface",
    "reactants": [
      "na",
      "f2"
    ],
    "products": [
      "naf"
    ],
    "enthalpy": -575,
    "desc": "Direct fluorination forming artificial NaF SEI.",
    "type": "synthesis",
    "effects": [],
    "net": "2 Na + F2 → 2 NaF"
  },
  {
    "id": "bat-sei-na-co2-carbonate",
    "name": "Interfacial carbonate passivating film formation on sodium metal anode",
    "reactants": [
      "na",
      "co2"
    ],
    "products": [
      "na2co3",
      "c"
    ],
    "enthalpy": -680,
    "desc": "Artificial SEI creation from carbon dioxide treatment.",
    "type": "redox_other",
    "effects": [],
    "net": "4 Na + 3 CO2 → 2 Na2CO3 + C"
  },
  {
    "id": "bat-sei-na-hf-scavenging",
    "name": "Sodium anode scavenging of HF acid producing NaF protective layer",
    "reactants": [
      "na",
      "hf"
    ],
    "products": [
      "naf",
      "h2"
    ],
    "enthalpy": -290,
    "desc": "Electrolyte HF scavenging.",
    "type": "redox_other",
    "effects": [],
    "net": "2 Na + 2 HF → 2 NaF + H2"
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
