// Domain 36: Energetics, Propellants & Pyrotechnics (100 reactions)
export const DOMAIN_36_REACTIONS = [
  {
    "id": "pyro-black-powder-chile",
    "name": "Chile saltpeter black powder deflagration",
    "reactants": [
      "nano3",
      "c",
      "s"
    ],
    "products": [
      "na2s",
      "n2",
      "co2"
    ],
    "enthalpy": -685,
    "desc": "Sodium nitrate gunpowder deflagration releasing nitrogen gas and dense white smoke.",
    "type": "combustion",
    "effects": [],
    "net": "2 NaNO3 + 3 C + S → Na2S + N2 + 3 CO2"
  },
  {
    "id": "pyro-kno3-charcoal",
    "name": "Potassium nitrate and charcoal deflagration",
    "reactants": [
      "kno3",
      "c"
    ],
    "products": [
      "k2co3",
      "co2",
      "n2"
    ],
    "enthalpy": -730,
    "desc": "Sulfurless gunpowder deflagration producing potassium carbonate and carbon dioxide.",
    "type": "combustion",
    "effects": [],
    "net": "4 KNO3 + 5 C → 2 K2CO3 + 3 CO2 + 2 N2"
  },
  {
    "id": "pyro-nano3-charcoal",
    "name": "Sodium nitrate and charcoal combustion",
    "reactants": [
      "nano3",
      "c"
    ],
    "products": [
      "na2co3",
      "co2",
      "n2"
    ],
    "enthalpy": -715,
    "desc": "Rapid combustion producing molten sodium carbonate and nitrogen gas.",
    "type": "combustion",
    "effects": [],
    "net": "4 NaNO3 + 5 C → 2 Na2CO3 + 3 CO2 + 2 N2"
  },
  {
    "id": "pyro-bano32-sulfur",
    "name": "Barium nitrate and sulfur deflagration",
    "reactants": [
      "bano32",
      "s"
    ],
    "products": [
      "baso4",
      "so2",
      "n2"
    ],
    "enthalpy": -640,
    "desc": "High-temperature green firework combustion yielding barium sulfate.",
    "type": "combustion",
    "effects": [],
    "net": "Ba(NO3)2 + 2 S → BaSO4 + SO2 + N2"
  },
  {
    "id": "pyro-cano32-charcoal",
    "name": "Calcium nitrate and charcoal combustion",
    "reactants": [
      "ca-no3-2",
      "c"
    ],
    "products": [
      "caco3",
      "co2",
      "n2"
    ],
    "enthalpy": -695,
    "desc": "Orange-red firework deflagration producing calcium carbonate and nitrogen.",
    "type": "combustion",
    "effects": [],
    "net": "2 Ca(NO3)2 + 5 C → 2 CaCO3 + 3 CO2 + 2 N2"
  },
  {
    "id": "pyro-bano32-charcoal",
    "name": "Barium nitrate and charcoal combustion",
    "reactants": [
      "bano32",
      "c"
    ],
    "products": [
      "baco3",
      "co2",
      "n2"
    ],
    "enthalpy": -710,
    "desc": "Combustion producing pale green incandescent flare with barium carbonate.",
    "type": "combustion",
    "effects": [],
    "net": "2 Ba(NO3)2 + 5 C → 2 BaCO3 + 3 CO2 + 2 N2"
  },
  {
    "id": "pyro-nano3-s",
    "name": "Sodium nitrate and sulfur deflagration",
    "reactants": [
      "nano3",
      "s"
    ],
    "products": [
      "na2so4",
      "so2",
      "n2"
    ],
    "enthalpy": -620,
    "desc": "Intense yellow flare deflagration yielding sodium sulfate and sulfur dioxide.",
    "type": "combustion",
    "effects": [],
    "net": "2 NaNO3 + 2 S → Na2SO4 + SO2 + N2"
  },
  {
    "id": "pyro-mgno32-s",
    "name": "Magnesium nitrate and sulfur combustion",
    "reactants": [
      "mg-no3-2",
      "s"
    ],
    "products": [
      "mgso4",
      "so2",
      "n2"
    ],
    "enthalpy": -635,
    "desc": "Combustion yielding magnesium sulfate and choking sulfur dioxide gas.",
    "type": "combustion",
    "effects": [],
    "net": "Mg(NO3)2 + 2 S → MgSO4 + SO2 + N2"
  },
  {
    "id": "pyro-mgno32-c",
    "name": "Magnesium nitrate and charcoal combustion",
    "reactants": [
      "mg-no3-2",
      "c"
    ],
    "products": [
      "mgo",
      "co2",
      "n2"
    ],
    "enthalpy": -750,
    "desc": "Rapid deflagration yielding white magnesium oxide smoke.",
    "type": "combustion",
    "effects": [],
    "net": "2 Mg(NO3)2 + 5 C → 2 MgO + 5 CO2 + 2 N2"
  },
  {
    "id": "pyro-flame-ca-orange",
    "name": "Calcium nitrate and sulfur orange pyrotechnic deflagration",
    "reactants": [
      "ca-no3-2",
      "s"
    ],
    "products": [
      "caso4",
      "so2",
      "n2"
    ],
    "enthalpy": -610,
    "desc": "Pyrotechnic orange flame composition burning sulfur and calcium nitrate.",
    "type": "combustion",
    "effects": [],
    "net": "Ca(NO3)2 + 2 S → CaSO4 + SO2 + N2"
  },
  {
    "id": "pyro-flare-mg-bano32",
    "name": "Magnesium and barium nitrate green flare deflagration",
    "reactants": [
      "mg",
      "bano32"
    ],
    "products": [
      "mgo",
      "bao",
      "n2"
    ],
    "enthalpy": -1580,
    "desc": "Brilliant incandescent military flare reaction yielding barium oxide and magnesium oxide.",
    "type": "combustion",
    "effects": [],
    "net": "5 Mg + Ba(NO3)2 → 5 MgO + BaO + N2"
  },
  {
    "id": "pyro-flare-mg-nano3",
    "name": "Magnesium and sodium nitrate yellow illumination flare",
    "reactants": [
      "mg",
      "nano3"
    ],
    "products": [
      "mgo",
      "na2o",
      "n2"
    ],
    "enthalpy": -1520,
    "desc": "High-intensity maritime distress flare emitting intense 589 nm sodium doublet.",
    "type": "combustion",
    "effects": [],
    "net": "5 Mg + 2 NaNO3 → 5 MgO + Na2O + N2"
  },
  {
    "id": "pyro-flare-mg-srno32",
    "name": "Magnesium and strontium nitrate red pyrotechnic flare",
    "reactants": [
      "mg",
      "sr-no3-2"
    ],
    "products": [
      "mgo",
      "sro",
      "n2"
    ],
    "enthalpy": -1560,
    "desc": "Emergency highway flare formulation providing intense deep red illumination.",
    "type": "combustion",
    "effects": [],
    "net": "5 Mg + Sr(NO3)2 → 5 MgO + SrO + N2"
  },
  {
    "id": "pyro-bano32-al",
    "name": "Aluminum and barium nitrate flash composition",
    "reactants": [
      "bano32",
      "al"
    ],
    "products": [
      "bao",
      "al2o3",
      "n2"
    ],
    "enthalpy": -2650,
    "desc": "Photoflash and salutes: high-brisance deflagration producing alumina and barium oxide.",
    "type": "combustion",
    "effects": [],
    "net": "3 Ba(NO3)2 + 10 Al → 3 BaO + 5 Al2O3 + 3 N2"
  },
  {
    "id": "pyro-srno32-al",
    "name": "Aluminum and strontium nitrate red flash composition",
    "reactants": [
      "sr-no3-2",
      "al"
    ],
    "products": [
      "sro",
      "al2o3",
      "n2"
    ],
    "enthalpy": -2620,
    "desc": "Pyrotechnic flash reaction generating intense red thermal radiation.",
    "type": "combustion",
    "effects": [],
    "net": "3 Sr(NO3)2 + 10 Al → 3 SrO + 5 Al2O3 + 3 N2"
  },
  {
    "id": "pyro-cano32-al",
    "name": "Aluminum and calcium nitrate pyrotechnic reaction",
    "reactants": [
      "ca-no3-2",
      "al"
    ],
    "products": [
      "cao",
      "al2o3",
      "n2"
    ],
    "enthalpy": -2590,
    "desc": "Exothermic incendiary reaction generating white-hot molten alumina slag.",
    "type": "combustion",
    "effects": [],
    "net": "3 Ca(NO3)2 + 10 Al → 3 CaO + 5 Al2O3 + 3 N2"
  },
  {
    "id": "pyro-nano3-al",
    "name": "Aluminum and sodium nitrate pyrotechnic reaction",
    "reactants": [
      "nano3",
      "al"
    ],
    "products": [
      "na2o",
      "al2o3",
      "n2"
    ],
    "enthalpy": -2480,
    "desc": "Incendiary composition deflagrating with brilliant yellow flash.",
    "type": "combustion",
    "effects": [],
    "net": "6 NaNO3 + 10 Al → 3 Na2O + 5 Al2O3 + 3 N2"
  },
  {
    "id": "pyro-mgno32-al",
    "name": "Magnesium nitrate and aluminum pyrotechnic flash",
    "reactants": [
      "mg-no3-2",
      "al"
    ],
    "products": [
      "mgo",
      "al2o3",
      "n2"
    ],
    "enthalpy": -2710,
    "desc": "Intensely exothermic flash powder reaction releasing dense white clouds.",
    "type": "combustion",
    "effects": [],
    "net": "3 Mg(NO3)2 + 10 Al → 3 MgO + 5 Al2O3 + 3 N2"
  },
  {
    "id": "pyro-bano32-b",
    "name": "Boron and barium nitrate green delay igniter",
    "reactants": [
      "bano32",
      "b"
    ],
    "products": [
      "bao",
      "b2o3",
      "n2"
    ],
    "enthalpy": -2150,
    "desc": "Gasless delay ignition composition producing boron oxide glass.",
    "type": "combustion",
    "effects": [],
    "net": "3 Ba(NO3)2 + 10 B → 3 BaO + 5 B2O3 + 3 N2"
  },
  {
    "id": "pyro-srno32-b",
    "name": "Boron and strontium nitrate red delay igniter",
    "reactants": [
      "sr-no3-2",
      "b"
    ],
    "products": [
      "sro",
      "b2o3",
      "n2"
    ],
    "enthalpy": -2120,
    "desc": "Gasless pyrotechnic delay composition generating high heat.",
    "type": "combustion",
    "effects": [],
    "net": "3 Sr(NO3)2 + 10 B → 3 SrO + 5 B2O3 + 3 N2"
  },
  {
    "id": "pyro-cano32-b",
    "name": "Boron and calcium nitrate pyrotechnic reaction",
    "reactants": [
      "ca-no3-2",
      "b"
    ],
    "products": [
      "cao",
      "b2o3",
      "n2"
    ],
    "enthalpy": -2090,
    "desc": "High-temperature delay element formulation.",
    "type": "combustion",
    "effects": [],
    "net": "3 Ca(NO3)2 + 10 B → 3 CaO + 5 B2O3 + 3 N2"
  },
  {
    "id": "pyro-nano3-b",
    "name": "Boron and sodium nitrate pyrotechnic igniter",
    "reactants": [
      "nano3",
      "b"
    ],
    "products": [
      "na2o",
      "b2o3",
      "n2"
    ],
    "enthalpy": -1980,
    "desc": "Pyrotechnic igniter producing vitreous borate slag.",
    "type": "combustion",
    "effects": [],
    "net": "6 NaNO3 + 10 B → 3 Na2O + 5 B2O3 + 3 N2"
  },
  {
    "id": "pyro-bano32-si",
    "name": "Silicon and barium nitrate pyrotechnic delay composition",
    "reactants": [
      "bano32",
      "si"
    ],
    "products": [
      "bao",
      "sio2",
      "n2"
    ],
    "enthalpy": -1850,
    "desc": "Electric match and fuse delay composition burning with minimal gas generation.",
    "type": "combustion",
    "effects": [],
    "net": "2 Ba(NO3)2 + 5 Si → 2 BaO + 5 SiO2 + 2 N2"
  },
  {
    "id": "pyro-srno32-si",
    "name": "Silicon and strontium nitrate delay composition",
    "reactants": [
      "sr-no3-2",
      "si"
    ],
    "products": [
      "sro",
      "sio2",
      "n2"
    ],
    "enthalpy": -1820,
    "desc": "Low-gas pyrotechnic delay element formulation.",
    "type": "combustion",
    "effects": [],
    "net": "2 Sr(NO3)2 + 5 Si → 2 SrO + 5 SiO2 + 2 N2"
  },
  {
    "id": "pyro-cano32-si",
    "name": "Silicon and calcium nitrate pyrotechnic reaction",
    "reactants": [
      "ca-no3-2",
      "si"
    ],
    "products": [
      "cao",
      "sio2",
      "n2"
    ],
    "enthalpy": -1790,
    "desc": "Exothermic delay train reaction producing calcium silicate slag precursors.",
    "type": "combustion",
    "effects": [],
    "net": "2 Ca(NO3)2 + 5 Si → 2 CaO + 5 SiO2 + 2 N2"
  },
  {
    "id": "pyro-spark-ti-o2",
    "name": "Titanium sparkler incandescent combustion",
    "reactants": [
      "ti",
      "o2"
    ],
    "products": [
      "tio2"
    ],
    "enthalpy": -944,
    "desc": "Pyrotechnic sparkler effect: branched silvery-white sparks of burning titanium metal.",
    "type": "combustion",
    "effects": [],
    "net": "Ti + O2 → TiO2"
  },
  {
    "id": "pyro-spark-zr-o2",
    "name": "Zirconium flash incandescent combustion",
    "reactants": [
      "zr",
      "o2"
    ],
    "products": [
      "zro2"
    ],
    "enthalpy": -1100,
    "desc": "Photoflash bulb combustion: intense incandescent flash of fine zirconium foil.",
    "type": "combustion",
    "effects": [],
    "net": "Zr + O2 → ZrO2"
  },
  {
    "id": "pyro-igniter-zr-kclo4",
    "name": "Zirconium and potassium perchlorate (ZPP) initiator deflagration",
    "reactants": [
      "zr",
      "kclo4"
    ],
    "products": [
      "zro2",
      "kcl"
    ],
    "enthalpy": -1680,
    "desc": "Standard NASA/DoD electro-explosive initiator producing hot particulate slag.",
    "type": "combustion",
    "effects": [],
    "net": "2 Zr + KClO4 → 2 ZrO2 + KCl"
  },
  {
    "id": "pyro-sparkler-fe",
    "name": "Iron sparkler branch spark combustion",
    "reactants": [
      "fe",
      "o2"
    ],
    "products": [
      "fe3o4"
    ],
    "enthalpy": -1118,
    "desc": "Classic wire sparkler reaction producing golden branching flower sparks.",
    "type": "combustion",
    "effects": [],
    "net": "3 Fe + 2 O2 → Fe3O4"
  },
  {
    "id": "pyro-sparkler-al",
    "name": "Aluminum sparkler silver spark combustion",
    "reactants": [
      "al",
      "o2"
    ],
    "products": [
      "al2o3"
    ],
    "enthalpy": -1675,
    "desc": "Bright silver streamer sparks produced by combustion of atomized aluminum powder.",
    "type": "combustion",
    "effects": [],
    "net": "4 Al + 3 O2 → 2 Al2O3"
  },
  {
    "id": "pyro-naclo3-c",
    "name": "Sodium chlorate and charcoal combustion",
    "reactants": [
      "naclo3",
      "c"
    ],
    "products": [
      "nacl",
      "co2"
    ],
    "enthalpy": -760,
    "desc": "Vigorous deflagration yielding sodium chloride and carbon dioxide.",
    "type": "combustion",
    "effects": [],
    "net": "2 NaClO3 + 3 C → 2 NaCl + 3 CO2"
  },
  {
    "id": "pyro-sr-clo3-2-decomp",
    "name": "Strontium chlorate pyrotechnic thermal decomposition",
    "reactants": [
      "sr-clo3-2"
    ],
    "products": [
      "srcl2",
      "o2"
    ],
    "enthalpy": -130,
    "desc": "Thermal decomposition liberating oxygen and volatile red flame emitter SrCl2.",
    "type": "decomposition",
    "effects": [],
    "net": "Sr(ClO3)2 → SrCl2 + 3 O2"
  },
  {
    "id": "pyro-ba-clo3-2-c",
    "name": "Barium chlorate and charcoal green pyrotechnic combustion",
    "reactants": [
      "ba-clo3-2",
      "c"
    ],
    "products": [
      "bacl2",
      "co2"
    ],
    "enthalpy": -820,
    "desc": "Green star composition deflagrating to produce vibrant emerald green BaCl emission.",
    "type": "combustion",
    "effects": [],
    "net": "Ba(ClO3)2 + 3 C → BaCl2 + 3 CO2"
  },
  {
    "id": "pyro-ba-clo3-2-s",
    "name": "Barium chlorate and sulfur green firework deflagration",
    "reactants": [
      "ba-clo3-2",
      "s"
    ],
    "products": [
      "bacl2",
      "so2"
    ],
    "enthalpy": -780,
    "desc": "Classic 19th-century green pyrotechnic composition releasing sulfur dioxide.",
    "type": "combustion",
    "effects": [],
    "net": "Ba(ClO3)2 + 3 S → BaCl2 + 3 SO2"
  },
  {
    "id": "pyro-flare-sr-clo3-2-c",
    "name": "Strontium chlorate and charcoal red firework combustion",
    "reactants": [
      "sr-clo3-2",
      "c"
    ],
    "products": [
      "srcl2",
      "co2"
    ],
    "enthalpy": -810,
    "desc": "Spectacular crimson firework star formulation releasing strontium chloride.",
    "type": "combustion",
    "effects": [],
    "net": "Sr(ClO3)2 + 3 C → SrCl2 + 3 CO2"
  },
  {
    "id": "pyro-flare-sr-clo3-2-s",
    "name": "Strontium chlorate and sulfur red pyrotechnic deflagration",
    "reactants": [
      "sr-clo3-2",
      "s"
    ],
    "products": [
      "srcl2",
      "so2"
    ],
    "enthalpy": -775,
    "desc": "Vigorous deflagration producing brilliant deep red flame color.",
    "type": "combustion",
    "effects": [],
    "net": "Sr(ClO3)2 + 3 S → SrCl2 + 3 SO2"
  },
  {
    "id": "pyro-kclo3-al",
    "name": "Potassium chlorate and aluminum flash deflagration",
    "reactants": [
      "kclo3",
      "al"
    ],
    "products": [
      "al2o3",
      "kcl"
    ],
    "enthalpy": -1410,
    "desc": "Extremely sensitive explosive flash powder deflagrating with concussive shockwave.",
    "type": "combustion",
    "effects": [],
    "net": "KClO3 + 2 Al → Al2O3 + KCl"
  },
  {
    "id": "pyro-naclo3-al",
    "name": "Sodium chlorate and aluminum flash reaction",
    "reactants": [
      "naclo3",
      "al"
    ],
    "products": [
      "al2o3",
      "nacl"
    ],
    "enthalpy": -1390,
    "desc": "Concussive flash reaction producing molten alumina and incandescent vapor.",
    "type": "combustion",
    "effects": [],
    "net": "NaClO3 + 2 Al → Al2O3 + NaCl"
  },
  {
    "id": "pyro-naclo3-s",
    "name": "Sodium chlorate and sulfur pyrotechnic deflagration",
    "reactants": [
      "naclo3",
      "s"
    ],
    "products": [
      "nacl",
      "so2"
    ],
    "enthalpy": -690,
    "desc": "Rapid friction-sensitive deflagration emitting sulfur dioxide and yellow flame.",
    "type": "combustion",
    "effects": [],
    "net": "2 NaClO3 + 3 S → 2 NaCl + 3 SO2"
  },
  {
    "id": "pyro-naclo3-mg",
    "name": "Sodium chlorate and magnesium flash composition",
    "reactants": [
      "naclo3",
      "mg"
    ],
    "products": [
      "mgo",
      "nacl"
    ],
    "enthalpy": -1650,
    "desc": "Intensely bright flash powder producing dense white smoke and yellow emission.",
    "type": "combustion",
    "effects": [],
    "net": "NaClO3 + 3 Mg → 3 MgO + NaCl"
  },
  {
    "id": "pyro-naclo4-c",
    "name": "Sodium perchlorate and carbon deflagration",
    "reactants": [
      "naclo4",
      "c"
    ],
    "products": [
      "nacl",
      "co2"
    ],
    "enthalpy": -790,
    "desc": "High-energy pyrotechnic propellant deflagration.",
    "type": "combustion",
    "effects": [],
    "net": "NaClO4 + 2 C → NaCl + 2 CO2"
  },
  {
    "id": "pyro-naclo4-mg",
    "name": "Sodium perchlorate and magnesium flash powder",
    "reactants": [
      "naclo4",
      "mg"
    ],
    "products": [
      "mgo",
      "nacl"
    ],
    "enthalpy": -2150,
    "desc": "Photoflash charge producing intense light pulse and concussive sound report.",
    "type": "combustion",
    "effects": [],
    "net": "NaClO4 + 4 Mg → 4 MgO + NaCl"
  },
  {
    "id": "pyro-flash-al-ba-clo3-2",
    "name": "Aluminum and barium chlorate green flash deflagration",
    "reactants": [
      "al",
      "ba-clo3-2"
    ],
    "products": [
      "al2o3",
      "bacl2"
    ],
    "enthalpy": -2680,
    "desc": "Green photoflash and salute composition deflagrating with brilliant flash and loud report.",
    "type": "combustion",
    "effects": [],
    "net": "4 Al + Ba(ClO3)2 → 2 Al2O3 + BaCl2"
  },
  {
    "id": "pyro-liclo4-s",
    "name": "Lithium perchlorate and sulfur deflagration",
    "reactants": [
      "liclo4",
      "s"
    ],
    "products": [
      "licl",
      "so2"
    ],
    "enthalpy": -740,
    "desc": "Deflagration producing lithium chloride and sulfur dioxide.",
    "type": "combustion",
    "effects": [],
    "net": "LiClO4 + 2 S → LiCl + 2 SO2"
  },
  {
    "id": "pyro-liclo4-al",
    "name": "Lithium perchlorate and aluminum high-energy propellant deflagration",
    "reactants": [
      "liclo4",
      "al"
    ],
    "products": [
      "al2o3",
      "licl"
    ],
    "enthalpy": -3320,
    "desc": "Extremely energy-dense aluminized rocket propellant reaction.",
    "type": "combustion",
    "effects": [],
    "net": "3 LiClO4 + 8 Al → 4 Al2O3 + 3 LiCl"
  },
  {
    "id": "pyro-liclo4-mg",
    "name": "Lithium perchlorate and magnesium flash reaction",
    "reactants": [
      "liclo4",
      "mg"
    ],
    "products": [
      "mgo",
      "licl"
    ],
    "enthalpy": -2210,
    "desc": "High-output illuminating flash powder reaction.",
    "type": "combustion",
    "effects": [],
    "net": "LiClO4 + 4 Mg → 4 MgO + LiCl"
  },
  {
    "id": "pyro-whistle-kclo4-benzoate",
    "name": "Potassium perchlorate and potassium benzoate whistle mix",
    "reactants": [
      "kclo4",
      "c6h5cook"
    ],
    "products": [
      "kcl",
      "k2co3",
      "co2",
      "water"
    ],
    "enthalpy": -2850,
    "desc": "Acoustic whistle composition burning in oscillatory waves inside open tubes.",
    "type": "combustion",
    "effects": [],
    "net": "15 KClO4 + 4 C6H5COOK → 15 KCl + 2 K2CO3 + 26 CO2 + 10 H2O"
  },
  {
    "id": "pyro-kclo3-ti",
    "name": "Potassium chlorate and titanium spark reaction",
    "reactants": [
      "kclo3",
      "ti"
    ],
    "products": [
      "tio2",
      "kcl"
    ],
    "enthalpy": -1850,
    "desc": "Pyrotechnic fountain composition releasing white-hot incandescent titanium sparks.",
    "type": "combustion",
    "effects": [],
    "net": "2 KClO3 + 3 Ti → 3 TiO2 + 2 KCl"
  },
  {
    "id": "pyro-naclo3-ti",
    "name": "Sodium chlorate and titanium fountain reaction",
    "reactants": [
      "naclo3",
      "ti"
    ],
    "products": [
      "tio2",
      "nacl"
    ],
    "enthalpy": -1820,
    "desc": "Fountain and wheel composition producing brilliant titanium sparks.",
    "type": "combustion",
    "effects": [],
    "net": "2 NaClO3 + 3 Ti → 3 TiO2 + 2 NaCl"
  },
  {
    "id": "pyro-naclo4-ti",
    "name": "Sodium perchlorate and titanium igniter reaction",
    "reactants": [
      "naclo4",
      "ti"
    ],
    "products": [
      "tio2",
      "nacl"
    ],
    "enthalpy": -1910,
    "desc": "High-brisance pyrotechnic igniter reaction producing titanium dioxide slag.",
    "type": "combustion",
    "effects": [],
    "net": "NaClO4 + 2 Ti → 2 TiO2 + NaCl"
  },
  {
    "id": "pyro-kclo3-zr",
    "name": "Potassium chlorate and zirconium flash reaction",
    "reactants": [
      "kclo3",
      "zr"
    ],
    "products": [
      "zro2",
      "kcl"
    ],
    "enthalpy": -2120,
    "desc": "High-brisance primer and detonator ignition formulation.",
    "type": "combustion",
    "effects": [],
    "net": "2 KClO3 + 3 Zr → 3 ZrO2 + 2 KCl"
  },
  {
    "id": "pyro-naclo3-zr",
    "name": "Sodium chlorate and zirconium flash reaction",
    "reactants": [
      "naclo3",
      "zr"
    ],
    "products": [
      "zro2",
      "nacl"
    ],
    "enthalpy": -2090,
    "desc": "Zirconium flash reaction generating intense radiant thermal pulse.",
    "type": "combustion",
    "effects": [],
    "net": "2 NaClO3 + 3 Zr → 3 ZrO2 + 2 NaCl"
  },
  {
    "id": "pyro-naclo4-zr",
    "name": "Sodium perchlorate and zirconium pyrotechnic reaction",
    "reactants": [
      "naclo4",
      "zr"
    ],
    "products": [
      "zro2",
      "nacl"
    ],
    "enthalpy": -2200,
    "desc": "High-heat primer mix yielding refractory zirconia and sodium chloride.",
    "type": "combustion",
    "effects": [],
    "net": "NaClO4 + 2 Zr → 2 ZrO2 + NaCl"
  },
  {
    "id": "pyro-kclo3-b",
    "name": "Potassium chlorate and boron igniter reaction",
    "reactants": [
      "kclo3",
      "b"
    ],
    "products": [
      "b2o3",
      "kcl"
    ],
    "enthalpy": -1540,
    "desc": "Electric match composition yielding glassy B2O3 matrix.",
    "type": "combustion",
    "effects": [],
    "net": "KClO3 + 2 B → B2O3 + KCl"
  },
  {
    "id": "pyro-naclo3-b",
    "name": "Sodium chlorate and boron pyrotechnic reaction",
    "reactants": [
      "naclo3",
      "b"
    ],
    "products": [
      "b2o3",
      "nacl"
    ],
    "enthalpy": -1520,
    "desc": "Hot-wire igniter composition deflagrating with high calorific output.",
    "type": "combustion",
    "effects": [],
    "net": "NaClO3 + 2 B → B2O3 + NaCl"
  },
  {
    "id": "pyro-naclo4-b",
    "name": "Sodium perchlorate and boron high-energy igniter",
    "reactants": [
      "naclo4",
      "b"
    ],
    "products": [
      "b2o3",
      "nacl"
    ],
    "enthalpy": -4150,
    "desc": "Aerospace squib igniter formulation deflagrating to boron trioxide.",
    "type": "combustion",
    "effects": [],
    "net": "3 NaClO4 + 8 B → 4 B2O3 + 3 NaCl"
  },
  {
    "id": "pyro-kclo3-si",
    "name": "Potassium chlorate and silicon delay composition",
    "reactants": [
      "kclo3",
      "si"
    ],
    "products": [
      "sio2",
      "kcl"
    ],
    "enthalpy": -1460,
    "desc": "Gasless delay element deflagrating smoothly without bursting confining casing.",
    "type": "combustion",
    "effects": [],
    "net": "2 KClO3 + 3 Si → 3 SiO2 + 2 KCl"
  },
  {
    "id": "pyro-naclo3-si",
    "name": "Sodium chlorate and silicon delay reaction",
    "reactants": [
      "naclo3",
      "si"
    ],
    "products": [
      "sio2",
      "nacl"
    ],
    "enthalpy": -1430,
    "desc": "Slow-burning pyrotechnic delay composition.",
    "type": "combustion",
    "effects": [],
    "net": "2 NaClO3 + 3 Si → 3 SiO2 + 2 NaCl"
  },
  {
    "id": "pyro-naclo4-si",
    "name": "Sodium perchlorate and silicon pyrotechnic combustion",
    "reactants": [
      "naclo4",
      "si"
    ],
    "products": [
      "sio2",
      "nacl"
    ],
    "enthalpy": -1520,
    "desc": "Thermite-like delay formulation producing fused silica slag.",
    "type": "combustion",
    "effects": [],
    "net": "NaClO4 + 2 Si → 2 SiO2 + NaCl"
  },
  {
    "id": "pyro-kclo3-zn",
    "name": "Potassium chlorate and zinc pyrotechnic reaction",
    "reactants": [
      "kclo3",
      "zn"
    ],
    "products": [
      "zno",
      "kcl"
    ],
    "enthalpy": -980,
    "desc": "Smoke generation and flare composition producing zinc oxide.",
    "type": "combustion",
    "effects": [],
    "net": "KClO3 + 3 Zn → 3 ZnO + KCl"
  },
  {
    "id": "pyro-naclo3-zn",
    "name": "Sodium chlorate and zinc smoke propellant reaction",
    "reactants": [
      "naclo3",
      "zn"
    ],
    "products": [
      "zno",
      "nacl"
    ],
    "enthalpy": -960,
    "desc": "Pyrotechnic screening smoke mixture generating dense zinc oxide cloud.",
    "type": "combustion",
    "effects": [],
    "net": "NaClO3 + 3 Zn → 3 ZnO + NaCl"
  },
  {
    "id": "pyro-naclo4-zn",
    "name": "Sodium perchlorate and zinc pyrotechnic reaction",
    "reactants": [
      "naclo4",
      "zn"
    ],
    "products": [
      "zno",
      "nacl"
    ],
    "enthalpy": -1420,
    "desc": "High-temperature smoke and flare composition.",
    "type": "combustion",
    "effects": [],
    "net": "NaClO4 + 4 Zn → 4 ZnO + NaCl"
  },
  {
    "id": "pyro-naclo4-fe",
    "name": "Sodium perchlorate and iron thermitic deflagration",
    "reactants": [
      "naclo4",
      "fe"
    ],
    "products": [
      "fe2o3",
      "nacl"
    ],
    "enthalpy": -2410,
    "desc": "Thermitic pyrotechnic heating charge for field rations and emergency heaters.",
    "type": "combustion",
    "effects": [],
    "net": "3 NaClO4 + 8 Fe → 4 Fe2O3 + 3 NaCl"
  },
  {
    "id": "pyro-apcp-mg-nh4clo4",
    "name": "Ammonium perchlorate and magnesium propellant deflagration",
    "reactants": [
      "nh4clo4",
      "mg"
    ],
    "products": [
      "mgo",
      "mgcl2",
      "n2",
      "water"
    ],
    "enthalpy": -2460,
    "desc": "Magnesium-fueled composite solid rocket propellant burning with dazzling white exhaust.",
    "type": "combustion",
    "effects": [],
    "net": "2 NH4ClO4 + 5 Mg → 4 MgO + MgCl2 + N2 + 4 H2O"
  },
  {
    "id": "pyro-kndx-glucose",
    "name": "Potassium nitrate and glucose amateur rocket propellant (KNDX)",
    "reactants": [
      "kno3",
      "c6h12o6"
    ],
    "products": [
      "k2co3",
      "n2",
      "co2",
      "water"
    ],
    "enthalpy": -6450,
    "desc": "Caramel candy rocket propellant burning to yield dense steam and smoke exhaust.",
    "type": "combustion",
    "effects": [],
    "net": "24 KNO3 + 5 C6H12O6 → 12 K2CO3 + 12 N2 + 18 CO2 + 30 H2O"
  },
  {
    "id": "pyro-ancp-mg-nh4no3",
    "name": "Ammonium nitrate and magnesium composite propellant",
    "reactants": [
      "nh4no3",
      "mg"
    ],
    "products": [
      "mgo",
      "n2",
      "water"
    ],
    "enthalpy": -710,
    "desc": "Smokeless solid rocket propellant formulation utilizing energetic ammonium nitrate.",
    "type": "combustion",
    "effects": [],
    "net": "NH4NO3 + Mg → MgO + N2 + 2 H2O"
  },
  {
    "id": "pyro-ancp-al-nh4no3",
    "name": "Ammonium nitrate and aluminum composite propellant",
    "reactants": [
      "nh4no3",
      "al"
    ],
    "products": [
      "al2o3",
      "n2",
      "water"
    ],
    "enthalpy": -2180,
    "desc": "Aluminized ammonium nitrate solid propellant producing high specific impulse.",
    "type": "combustion",
    "effects": [],
    "net": "3 NH4NO3 + 2 Al → Al2O3 + 3 N2 + 6 H2O"
  },
  {
    "id": "pyro-hypergolic-n2h4-n2o4",
    "name": "Hydrazine and dinitrogen tetroxide hypergolic propellant combustion",
    "reactants": [
      "n2h4",
      "n2o4"
    ],
    "products": [
      "n2",
      "water"
    ],
    "enthalpy": -1049,
    "desc": "Spontaneous hypergolic combustion powering spacecraft orbital maneuvering and attitude control thrusters.",
    "type": "combustion",
    "effects": [],
    "net": "2 N2H4 + N2O4 → 3 N2 + 4 H2O"
  },
  {
    "id": "pyro-ap-boron",
    "name": "Ammonium perchlorate and boron high-energy propellant reaction",
    "reactants": [
      "nh4clo4",
      "b"
    ],
    "products": [
      "b2o3",
      "bcl3",
      "n2",
      "water"
    ],
    "enthalpy": -3280,
    "desc": "High-density boron-loaded solid propellant for ramjet and missile propulsion.",
    "type": "combustion",
    "effects": [],
    "net": "6 NH4ClO4 + 10 B → 4 B2O3 + 2 BCl3 + 3 N2 + 12 H2O"
  },
  {
    "id": "pyro-thermite-cu2o-mg",
    "name": "Copper(I) oxide and magnesium thermite reaction",
    "reactants": [
      "cu2o",
      "mg"
    ],
    "products": [
      "cu",
      "mgo"
    ],
    "enthalpy": -420,
    "desc": "Flash thermite reaction deflagrating with blinding flash and copper vapor.",
    "type": "redox_other",
    "effects": [],
    "net": "Cu2O + Mg → 2 Cu + MgO"
  },
  {
    "id": "pyro-thermite-fe3o4-mg",
    "name": "Magnetite and magnesium incendiary thermite",
    "reactants": [
      "fe3o4",
      "mg"
    ],
    "products": [
      "fe",
      "mgo"
    ],
    "enthalpy": -1320,
    "desc": "Incendiary bomb formulation igniting spontaneously at high temperature to produce molten iron.",
    "type": "redox_other",
    "effects": [],
    "net": "Fe3O4 + 4 Mg → 3 Fe + 4 MgO"
  },
  {
    "id": "pyro-detonation-agn3",
    "name": "Silver azide primary explosive detonation",
    "reactants": [
      "agn3"
    ],
    "products": [
      "ag",
      "n2"
    ],
    "enthalpy": -310,
    "desc": "Detonation of sensitive primary explosive silver azide releasing nitrogen gas shockwave.",
    "type": "decomposition",
    "effects": [],
    "net": "2 AgN3 → 2 Ag + 3 N2"
  },
  {
    "id": "pyro-detonation-kn3",
    "name": "Potassium azide thermal decomposition",
    "reactants": [
      "kn3"
    ],
    "products": [
      "k",
      "n2"
    ],
    "enthalpy": -12,
    "desc": "Controlled thermal decomposition releasing pure spectroscopic grade nitrogen gas.",
    "type": "decomposition",
    "effects": [],
    "net": "2 KN3 → 2 K + 3 N2"
  },
  {
    "id": "pyro-detonation-fulminate",
    "name": "Mercury(II) fulminate primary explosive detonation",
    "reactants": [
      "c2hgn2o2_fulminate"
    ],
    "products": [
      "hg",
      "co",
      "n2"
    ],
    "enthalpy": -480,
    "desc": "Percussion cap detonation: explosive deflagration-to-detonation transition shattering casing.",
    "type": "decomposition",
    "effects": [],
    "net": "Hg(CNO)2 → Hg + 2 CO + N2"
  },
  {
    "id": "pyro-synth-pb-n3-2",
    "name": "Precipitation synthesis of lead(II) azide",
    "reactants": [
      "pbno32",
      "nan3"
    ],
    "products": [
      "pb-n3-2",
      "nano3"
    ],
    "enthalpy": -28,
    "desc": "Metathetical precipitation forming dextrinated primary explosive crystals.",
    "type": "precipitation",
    "effects": [],
    "net": "Pb(NO3)2 + 2 NaN3 → Pb(N3)2 + 2 NaNO3"
  },
  {
    "id": "pyro-synth-agn3",
    "name": "Precipitation synthesis of silver azide",
    "reactants": [
      "agno3",
      "nan3"
    ],
    "products": [
      "agn3",
      "nano3"
    ],
    "enthalpy": -32,
    "desc": "Precipitation of sensitive crystalline silver azide initiator.",
    "type": "precipitation",
    "effects": [],
    "net": "AgNO3 + NaN3 → AgN3 + NaNO3"
  },
  {
    "id": "pyro-detonation-cu-n3-2-synth",
    "name": "Precipitation synthesis of copper(II) azide",
    "reactants": [
      "cu-no3-2",
      "nan3"
    ],
    "products": [
      "cu-n3-2",
      "nano3"
    ],
    "enthalpy": -30,
    "desc": "Formation of hazardous sensitive green copper azide precipitate.",
    "type": "precipitation",
    "effects": [],
    "net": "Cu(NO3)2 + 2 NaN3 → Cu(N3)2 + 2 NaNO3"
  },
  {
    "id": "pyro-synth-hn3",
    "name": "Synthesis of volatile hydrazoic acid from sodium azide",
    "reactants": [
      "nan3",
      "h2so4"
    ],
    "products": [
      "hn3",
      "na2so4"
    ],
    "enthalpy": -45,
    "desc": "Acidification of sodium azide generating toxic, volatile, explosive hydrazoic acid vapor.",
    "type": "neutralization",
    "effects": [],
    "net": "2 NaN3 + H2SO4 → 2 HN3 + Na2SO4"
  },
  {
    "id": "pyro-synth-kn3-kcl",
    "name": "Metathetical crystallization of potassium azide",
    "reactants": [
      "nan3",
      "kcl"
    ],
    "products": [
      "kn3",
      "nacl"
    ],
    "enthalpy": 8,
    "desc": "Fractional crystallization separating potassium azide from sodium chloride.",
    "type": "synthesis",
    "effects": [],
    "net": "NaN3 + KCl → KN3 + NaCl"
  },
  {
    "id": "pyro-flame-cu-blue",
    "name": "Copper(II) nitrate and carbon pyrotechnic combustion",
    "reactants": [
      "cu-no3-2",
      "c"
    ],
    "products": [
      "cu",
      "co2",
      "no2"
    ],
    "enthalpy": -340,
    "desc": "Pyrotechnic blue flare combustion emitting characteristic copper chloride/vapor spectra.",
    "type": "combustion",
    "effects": [],
    "net": "Cu(NO3)2 + C → Cu + CO2 + 2 NO2"
  },
  {
    "id": "pyro-detonation-tnt",
    "name": "Detonation of 2,4,6-trinitrotoluene (TNT)",
    "reactants": [
      "c7h5n3o6_tnt"
    ],
    "products": [
      "c",
      "co",
      "n2",
      "water"
    ],
    "enthalpy": -1050,
    "desc": "High explosive detonation: Kistiakowsky-Wilson oxygen-deficient detonation yielding black carbonaceous fireball.",
    "type": "decomposition",
    "effects": [],
    "net": "2 C7H5N3O6 → 7 C + 7 CO + 3 N2 + 5 H2O"
  },
  {
    "id": "pyro-detonation-ng",
    "name": "Detonation of liquid nitroglycerin",
    "reactants": [
      "c3h5n3o9_nitroglycerin"
    ],
    "products": [
      "co2",
      "water",
      "n2",
      "o2"
    ],
    "enthalpy": -1540,
    "desc": "Positive oxygen balance detonation producing supersonic 7,700 m/s blast wave.",
    "type": "decomposition",
    "effects": [],
    "net": "4 C3H5N3O9 → 12 CO2 + 10 H2O + 6 N2 + O2"
  },
  {
    "id": "pyro-detonation-rdx",
    "name": "Detonation of cyclotrimethylenetrinitramine (RDX)",
    "reactants": [
      "c3h6n6o6_rdx"
    ],
    "products": [
      "co",
      "n2",
      "water"
    ],
    "enthalpy": -1120,
    "desc": "Military high explosive detonation producing 8,750 m/s detonation velocity and immense brisance.",
    "type": "decomposition",
    "effects": [],
    "net": "C3H6N6O6 → 3 CO + 3 N2 + 3 H2O"
  },
  {
    "id": "pyro-detonation-hmx",
    "name": "Detonation of octogen (HMX)",
    "reactants": [
      "c4h8n8o8_hmx"
    ],
    "products": [
      "co",
      "n2",
      "water"
    ],
    "enthalpy": -1510,
    "desc": "High-density plastic explosive detonation generating 9,100 m/s detonation velocity.",
    "type": "decomposition",
    "effects": [],
    "net": "C4H8N8O8 → 4 CO + 4 N2 + 4 H2O"
  },
  {
    "id": "pyro-detonation-petn",
    "name": "Detonation of pentaerythritol tetranitrate (PETN)",
    "reactants": [
      "c5h8n4o12_petn"
    ],
    "products": [
      "co2",
      "co",
      "n2",
      "water"
    ],
    "enthalpy": -1490,
    "desc": "Detonating cord and blasting cap booster detonation yielding intense shockwave.",
    "type": "decomposition",
    "effects": [],
    "net": "C5H8N4O12 → 3 CO2 + 2 CO + 2 N2 + 4 H2O"
  },
  {
    "id": "pyro-detonation-picric",
    "name": "Detonation of picric acid (2,4,6-trinitrophenol)",
    "reactants": [
      "c6h3n3o7_picric"
    ],
    "products": [
      "c",
      "co",
      "n2",
      "water"
    ],
    "enthalpy": -980,
    "desc": "Melinite/Lyddite naval artillery shell detonation releasing toxic yellow smoke.",
    "type": "decomposition",
    "effects": [],
    "net": "2 C6H3N3O7 → C + 11 CO + 3 N2 + 3 H2O"
  },
  {
    "id": "pyro-anfo-nh4no3-ch3no2",
    "name": "Detonation of ammonium nitrate and nitromethane (ANNM)",
    "reactants": [
      "nh4no3",
      "ch3no2"
    ],
    "products": [
      "n2",
      "co2",
      "water"
    ],
    "enthalpy": -2150,
    "desc": "High-brisance liquid-sensitized ammonium nitrate commercial blasting explosive detonation.",
    "type": "combustion",
    "effects": [],
    "net": "3 NH4NO3 + 2 CH3NO2 → 4 N2 + 2 CO2 + 9 H2O"
  },
  {
    "id": "pyro-combustion-rdx",
    "name": "Complete combustion of RDX with excess atmospheric oxygen",
    "reactants": [
      "c3h6n6o6_rdx",
      "o2"
    ],
    "products": [
      "co2",
      "water",
      "n2"
    ],
    "enthalpy": -2160,
    "desc": "Incineration and open burning of surplus RDX munitions to harmless gaseous products.",
    "type": "combustion",
    "effects": [],
    "net": "2 C3H6N6O6 + 3 O2 → 6 CO2 + 6 H2O + 6 N2"
  },
  {
    "id": "pyro-combustion-hmx",
    "name": "Complete combustion of HMX with excess oxygen",
    "reactants": [
      "c4h8n8o8_hmx",
      "o2"
    ],
    "products": [
      "co2",
      "water",
      "n2"
    ],
    "enthalpy": -2880,
    "desc": "Demilitarization thermal destruction of HMX energetic charges.",
    "type": "combustion",
    "effects": [],
    "net": "C4H8N8O8 + 2 O2 → 4 CO2 + 4 H2O + 4 N2"
  },
  {
    "id": "pyro-flash-al-sr-clo3-2",
    "name": "Aluminum and strontium chlorate red flash deflagration",
    "reactants": [
      "al",
      "sr-clo3-2"
    ],
    "products": [
      "al2o3",
      "srcl2"
    ],
    "enthalpy": -2650,
    "desc": "Crimson photoflash composition generating brilliant red light and concussion.",
    "type": "combustion",
    "effects": [],
    "net": "4 Al + Sr(ClO3)2 → 2 Al2O3 + SrCl2"
  },
  {
    "id": "pyro-synth-nh4clo3",
    "name": "Synthesis of unstable ammonium chlorate",
    "reactants": [
      "ammonium-chloride",
      "naclo3"
    ],
    "products": [
      "nh4clo3",
      "nacl"
    ],
    "enthalpy": 12,
    "desc": "Precipitation of notoriously unstable, spontaneously explosive ammonium chlorate.",
    "type": "synthesis",
    "effects": [],
    "net": "NH4Cl + NaClO3 → NH4ClO3 + NaCl"
  },
  {
    "id": "pyro-decomp-nh4clo3",
    "name": "Spontaneous explosive deflagration of ammonium chlorate",
    "reactants": [
      "nh4clo3"
    ],
    "products": [
      "n2",
      "cl2",
      "o2",
      "water"
    ],
    "enthalpy": -320,
    "desc": "Hazardous auto-decomposition of NH4ClO3 releasing toxic chlorine gas and oxygen.",
    "type": "decomposition",
    "effects": [],
    "net": "2 NH4ClO3 → N2 + Cl2 + O2 + 4 H2O"
  },
  {
    "id": "pyro-synth-ba-clo3-2",
    "name": "Metathesis synthesis of barium chlorate",
    "reactants": [
      "bacl2",
      "naclo3"
    ],
    "products": [
      "ba-clo3-2",
      "nacl"
    ],
    "enthalpy": 15,
    "desc": "Crystallization of barium chlorate green firework oxidizer.",
    "type": "synthesis",
    "effects": [],
    "net": "BaCl2 + 2 NaClO3 → Ba(ClO3)2 + 2 NaCl"
  },
  {
    "id": "pyro-synth-sr-clo3-2",
    "name": "Metathesis synthesis of strontium chlorate",
    "reactants": [
      "srcl2",
      "naclo3"
    ],
    "products": [
      "sr-clo3-2",
      "nacl"
    ],
    "enthalpy": 18,
    "desc": "Synthesis of deliquescent red pyrotechnic oxidizer strontium chlorate.",
    "type": "synthesis",
    "effects": [],
    "net": "SrCl2 + 2 NaClO3 → Sr(ClO3)2 + 2 NaCl"
  },
  {
    "id": "pyro-synth-nh4clo4",
    "name": "Metathesis synthesis of ammonium perchlorate",
    "reactants": [
      "ammonium-chloride",
      "naclo4"
    ],
    "products": [
      "nh4clo4",
      "nacl"
    ],
    "enthalpy": 14,
    "desc": "Industrial precipitation process producing space shuttle rocket booster oxidizer NH4ClO4.",
    "type": "synthesis",
    "effects": [],
    "net": "NH4Cl + NaClO4 → NH4ClO4 + NaCl"
  },
  {
    "id": "pyro-smoke-kclo3-sugar",
    "name": "Potassium chlorate and sucrose colored smoke carrier deflagration",
    "reactants": [
      "kclo3",
      "sucrose"
    ],
    "products": [
      "kcl",
      "co2",
      "water"
    ],
    "enthalpy": -4850,
    "desc": "Low-temperature burning pyrotechnic composition subliming organic dyes into colored smoke.",
    "type": "combustion",
    "effects": [],
    "net": "8 KClO3 + C12H22O11 → 8 KCl + 12 CO2 + 11 H2O"
  },
  {
    "id": "pyro-delay-sb2s3-kclo3",
    "name": "Antimony(III) sulfide and potassium chlorate delay mixture",
    "reactants": [
      "sb2s3",
      "kclo3"
    ],
    "products": [
      "sb2o3",
      "so2",
      "kcl"
    ],
    "enthalpy": -1240,
    "desc": "Slow-burning delay train and matchhead igniter deflagration.",
    "type": "combustion",
    "effects": [],
    "net": "Sb2S3 + 3 KClO3 → Sb2O3 + 3 SO2 + 3 KCl"
  },
  {
    "id": "pyro-delay-bi2s3-kclo4",
    "name": "Bismuth(III) sulfide and potassium perchlorate gasless delay",
    "reactants": [
      "bi2s3",
      "kclo4"
    ],
    "products": [
      "bi2o3",
      "so2",
      "kcl"
    ],
    "enthalpy": -3850,
    "desc": "Non-toxic heavy-metal pyrotechnic delay formulation.",
    "type": "combustion",
    "effects": [],
    "net": "4 Bi2S3 + 9 KClO4 → 4 Bi2O3 + 12 SO2 + 9 KCl"
  },
  {
    "id": "pyro-delay-si-pbo",
    "name": "Silicon and lead(II) oxide delay train reaction",
    "reactants": [
      "si",
      "pbo"
    ],
    "products": [
      "sio2",
      "pb"
    ],
    "enthalpy": -380,
    "desc": "Gasless delay element burning steadily to accurately time explosive fuse trains.",
    "type": "redox_other",
    "effects": [],
    "net": "Si + 2 PbO → SiO2 + 2 Pb"
  },
  {
    "id": "pyro-delay-bacro4-b",
    "name": "Barium chromate and boron gasless delay reaction",
    "reactants": [
      "bacro4",
      "b"
    ],
    "products": [
      "bao",
      "cr2o3",
      "b2o3"
    ],
    "enthalpy": -790,
    "desc": "Precision military ordnance delay element producing zero net gaseous volume change.",
    "type": "redox_other",
    "effects": [],
    "net": "2 BaCrO4 + 2 B → 2 BaO + Cr2O3 + B2O3"
  }
];
