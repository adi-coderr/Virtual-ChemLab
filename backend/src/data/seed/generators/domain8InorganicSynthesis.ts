import { addReaction } from "./generate1000Reactions.js";
import type { SeedObservableEffect } from "../reactions.js";

export function buildDomain8InorganicSynthesis(): void {
  // Domain 8: 70 Curated Inorganic Synthesis & Metallurgy Reactions
  const list = [
  {
    "id": "synth-ostwald-no",
    "name": "Ostwald process catalytic oxidation of ammonia to nitric oxide",
    "reactants": [
      "ammonia",
      "o2"
    ],
    "products": [
      "no",
      "water"
    ],
    "enthalpy": -905.2,
    "desc": "Ammonia and air passed through platinum-rhodium gauze at 800°C oxidize cleanly to nitric oxide."
  },
  {
    "id": "synth-baryta-hydration",
    "name": "Hydration of barium oxide to barium hydroxide",
    "reactants": [
      "bao",
      "water"
    ],
    "products": [
      "ba-oh-2"
    ],
    "enthalpy": -102,
    "desc": "Exothermic hydration of barium oxide forming soluble alkaline barium hydroxide."
  },
  {
    "id": "synth-strontia-hydration",
    "name": "Hydration of strontium oxide to strontium hydroxide",
    "reactants": [
      "sro",
      "water"
    ],
    "products": [
      "sr-oh-2"
    ],
    "enthalpy": -84,
    "desc": "Strontium oxide combines with water yielding strontium hydroxide."
  },
  {
    "id": "synth-magnesia-hydration",
    "name": "Slow hydration of magnesium oxide to magnesium hydroxide",
    "reactants": [
      "mgo",
      "water"
    ],
    "products": [
      "mgoh2"
    ],
    "enthalpy": -37,
    "desc": "Light calcined magnesia slowly slakes in warm water forming milk of magnesia suspension."
  },
  {
    "id": "synth-lithia-hydration",
    "name": "Hydration of lithium oxide to lithium hydroxide",
    "reactants": [
      "li2o",
      "water"
    ],
    "products": [
      "lioh"
    ],
    "enthalpy": -121,
    "desc": "Vigorous hydration of white lithium oxide producing lithium hydroxide solution."
  },
  {
    "id": "roast-zns",
    "name": "Oxidative roasting of zinc blende (sphalerite ore)",
    "reactants": [
      "zns",
      "o2"
    ],
    "products": [
      "zno",
      "so2"
    ],
    "enthalpy": -878,
    "desc": "Sulfidic zinc ore roasted at 900°C in air converting zinc sulfide to calcined zinc oxide and sulfur dioxide."
  },
  {
    "id": "roast-pbs",
    "name": "Oxidative roasting of galena (lead sulfide ore)",
    "reactants": [
      "pbs",
      "o2"
    ],
    "products": [
      "pbo",
      "so2"
    ],
    "enthalpy": -834,
    "desc": "Lead sulfide ore roasted with excess air converting to yellow lead oxide and SO2 gas."
  },
  {
    "id": "roast-cus",
    "name": "Oxidative roasting of copper(II) sulfide (covellite ore)",
    "reactants": [
      "cus",
      "o2"
    ],
    "products": [
      "cuo",
      "so2"
    ],
    "enthalpy": -806,
    "desc": "Black copper sulfide roasted in air yielding black copper(II) oxide and sulfur dioxide."
  },
  {
    "id": "roast-cu2s",
    "name": "Oxidative roasting of copper(I) sulfide (chalcocite ore)",
    "reactants": [
      "cu2s",
      "o2"
    ],
    "products": [
      "cuo",
      "so2"
    ],
    "enthalpy": -780,
    "desc": "Chalcocite roasted converting copper(I) sulfide to copper(II) oxide."
  },
  {
    "id": "roast-nis",
    "name": "Oxidative roasting of nickel sulfide (millerite ore)",
    "reactants": [
      "nis",
      "o2"
    ],
    "products": [
      "nio",
      "so2"
    ],
    "enthalpy": -936,
    "desc": "Nickel sulfide roasted converting to nickel oxide calcine."
  },
  {
    "id": "roast-ag2s",
    "name": "Oxidative roasting of silver sulfide (argentite ore)",
    "reactants": [
      "ag2s",
      "o2"
    ],
    "products": [
      "ag",
      "so2"
    ],
    "enthalpy": -280,
    "desc": "Silver sulfide roasted in air decomposes directly to metallic silver."
  },
  {
    "id": "roast-bi2s3",
    "name": "Oxidative roasting of bismuthinite ore",
    "reactants": [
      "bi2s3",
      "o2"
    ],
    "products": [
      "bi2o3",
      "so2"
    ],
    "enthalpy": -2010,
    "desc": "Bismuth sulfide roasted yielding yellow bismuth trioxide powder and sulfur dioxide."
  },
  {
    "id": "roast-lead-self-reduction",
    "name": "Galena self-reduction with litharge (lead converter process)",
    "reactants": [
      "pbs",
      "pbo"
    ],
    "products": [
      "pb",
      "so2"
    ],
    "enthalpy": 218,
    "desc": "Partially roasted lead ore reacts with unchanged galena at red heat yielding pure molten lead metal."
  },
  {
    "id": "thermite-cr2o3-mg",
    "name": "Magnesiothermic reduction of chromium(III) oxide",
    "reactants": [
      "cr2o3",
      "mg"
    ],
    "products": [
      "cr",
      "mgo"
    ],
    "enthalpy": -780,
    "desc": "Magnesium ribbon ignites mixture producing sparks and metallic chromium nodules."
  },
  {
    "id": "thermite-mno2-mg",
    "name": "Magnesiothermic reduction of manganese dioxide",
    "reactants": [
      "mno2",
      "mg"
    ],
    "products": [
      "mn",
      "mgo"
    ],
    "enthalpy": -920,
    "desc": "Intensely bright flash reaction reducing manganese dioxide to metallic manganese."
  },
  {
    "id": "thermite-cuo-zn",
    "name": "Metallothermic reduction of copper(II) oxide by zinc dust",
    "reactants": [
      "cuo",
      "zn"
    ],
    "products": [
      "cu",
      "zno"
    ],
    "enthalpy": -150,
    "desc": "Heated mixture of black copper oxide and zinc dust flashes into bright yellow-hot zinc oxide and copper."
  },
  {
    "id": "thermite-pbo-zn",
    "name": "Metallothermic reduction of lead(II) oxide by zinc",
    "reactants": [
      "pbo",
      "zn"
    ],
    "products": [
      "pb",
      "zno"
    ],
    "enthalpy": -130,
    "desc": "Reduction of litharge with zinc powder forming molten beads of lead."
  },
  {
    "id": "thermite-sno-zn",
    "name": "Metallothermic reduction of tin(II) oxide by zinc",
    "reactants": [
      "sno",
      "zn"
    ],
    "products": [
      "sn",
      "zno"
    ],
    "enthalpy": -125,
    "desc": "Reduction of tin oxide by zinc powder producing molten tin."
  },
  {
    "id": "thermite-nio-zn",
    "name": "Metallothermic reduction of nickel(II) oxide by zinc",
    "reactants": [
      "nio",
      "zn"
    ],
    "products": [
      "ni",
      "zno"
    ],
    "enthalpy": -110,
    "desc": "Reduction of nickel oxide by zinc dust yielding nickel metal."
  },
  {
    "id": "thermite-ag2o-zn",
    "name": "Reduction of silver oxide by zinc powder",
    "reactants": [
      "ag2o",
      "zn"
    ],
    "products": [
      "ag",
      "zno"
    ],
    "enthalpy": -312,
    "desc": "Rapid exothermic reduction producing spongy metallic silver."
  },
  {
    "id": "thermite-ag2o-cu",
    "name": "Reduction of silver oxide by copper powder",
    "reactants": [
      "ag2o",
      "cu"
    ],
    "products": [
      "ag",
      "cuo"
    ],
    "enthalpy": -162,
    "desc": "Heated copper powder reduces silver oxide to bright metallic silver flakes."
  },
  {
    "id": "thermite-ag2o-al",
    "name": "Aluminothermic reduction of silver oxide (silver thermite)",
    "reactants": [
      "ag2o",
      "al"
    ],
    "products": [
      "ag",
      "al2o3"
    ],
    "enthalpy": -1540,
    "desc": "Extremely fast flash-powder thermite reaction erupting in blinding white sparks and pure molten silver."
  },
  {
    "id": "thermite-ag2o-mg",
    "name": "Magnesiothermic reduction of silver oxide",
    "reactants": [
      "ag2o",
      "mg"
    ],
    "products": [
      "ag",
      "mgo"
    ],
    "enthalpy": -570,
    "desc": "Instantaneous flash reaction producing metallic silver."
  },
  {
    "id": "thermite-cuo-al",
    "name": "Aluminothermic reduction of copper(II) oxide (copper thermite)",
    "reactants": [
      "cuo",
      "al"
    ],
    "products": [
      "cu",
      "al2o3"
    ],
    "enthalpy": -1204,
    "desc": "Spectacularly violent explosive thermite mixture erupts in a blinding flash of molten copper."
  },
  {
    "id": "thermite-pbo-al",
    "name": "Aluminothermic reduction of lead(II) oxide",
    "reactants": [
      "pbo",
      "al"
    ],
    "products": [
      "pb",
      "al2o3"
    ],
    "enthalpy": -844,
    "desc": "Energetic reduction of litharge by aluminium powder producing molten metallic lead."
  },
  {
    "id": "thermite-sno-al",
    "name": "Aluminothermic reduction of tin(II) oxide",
    "reactants": [
      "sno",
      "al"
    ],
    "products": [
      "sn",
      "al2o3"
    ],
    "enthalpy": -818,
    "desc": "Reduction of tin oxide with fine aluminium powder forming molten tin."
  },
  {
    "id": "thermite-nio-al",
    "name": "Aluminothermic reduction of nickel(II) oxide",
    "reactants": [
      "nio",
      "al"
    ],
    "products": [
      "ni",
      "al2o3"
    ],
    "enthalpy": -948,
    "desc": "Intensely exothermic reduction yielding molten nickel metal."
  },
  {
    "id": "thermite-zno-al",
    "name": "Aluminothermic reduction of zinc oxide",
    "reactants": [
      "zno",
      "al"
    ],
    "products": [
      "zn",
      "al2o3"
    ],
    "enthalpy": -620,
    "desc": "High-temperature reduction producing incandescent zinc vapor."
  },
  {
    "id": "thermite-bi2o3-al",
    "name": "Aluminothermic reduction of bismuth(III) oxide (bismuth thermite)",
    "reactants": [
      "bi2o3",
      "al"
    ],
    "products": [
      "bi",
      "al2o3"
    ],
    "enthalpy": -1090,
    "desc": "Flash-like rapid reaction producing molten metallic bismuth."
  },
  {
    "id": "thermite-cuo-mg",
    "name": "Magnesiothermic reduction of copper(II) oxide",
    "reactants": [
      "cuo",
      "mg"
    ],
    "products": [
      "cu",
      "mgo"
    ],
    "enthalpy": -445,
    "desc": "Blinding flash reaction yielding spongy copper and white magnesia ash."
  },
  {
    "id": "thermite-pbo-mg",
    "name": "Magnesiothermic reduction of lead(II) oxide",
    "reactants": [
      "pbo",
      "mg"
    ],
    "products": [
      "pb",
      "mgo"
    ],
    "enthalpy": -382,
    "desc": "Exothermic reduction producing lead droplets."
  },
  {
    "id": "thermite-sno-mg",
    "name": "Magnesiothermic reduction of tin(II) oxide",
    "reactants": [
      "sno",
      "mg"
    ],
    "products": [
      "sn",
      "mgo"
    ],
    "enthalpy": -374,
    "desc": "Magnesium reduces tin oxide to tin metal."
  },
  {
    "id": "thermite-nio-mg",
    "name": "Magnesiothermic reduction of nickel(II) oxide",
    "reactants": [
      "nio",
      "mg"
    ],
    "products": [
      "ni",
      "mgo"
    ],
    "enthalpy": -361,
    "desc": "Magnesium reduction producing metallic nickel."
  },
  {
    "id": "thermite-zno-mg",
    "name": "Magnesiothermic reduction of zinc oxide",
    "reactants": [
      "zno",
      "mg"
    ],
    "products": [
      "zn",
      "mgo"
    ],
    "enthalpy": -251,
    "desc": "Energetic reduction yielding zinc."
  },
  {
    "id": "thermite-fe2o3-mg",
    "name": "Magnesiothermic reduction of iron(III) oxide",
    "reactants": [
      "fe2o3",
      "mg"
    ],
    "products": [
      "fe",
      "mgo"
    ],
    "enthalpy": -980,
    "desc": "Violent sparks and blinding light as magnesium reduces rust to iron."
  },
  {
    "id": "thermite-bi2o3-mg",
    "name": "Magnesiothermic reduction of bismuth(III) oxide",
    "reactants": [
      "bi2o3",
      "mg"
    ],
    "products": [
      "bi",
      "mgo"
    ],
    "enthalpy": -880,
    "desc": "Magnesium powder reduces bismuth oxide."
  },
  {
    "id": "thermite-sio2-al",
    "name": "Aluminothermic reduction of silicon dioxide (silica thermite)",
    "reactants": [
      "sio2",
      "al"
    ],
    "products": [
      "si",
      "al2o3"
    ],
    "enthalpy": -619,
    "desc": "High-temperature reduction of white silica sand by aluminium powder producing crystalline silicon."
  },
  {
    "id": "thermite-so2-mg",
    "name": "Combustion reduction of sulfur dioxide by magnesium",
    "reactants": [
      "so2",
      "mg"
    ],
    "products": [
      "s",
      "mgo"
    ],
    "enthalpy": -547,
    "desc": "Magnesium ribbon burns in sulfur dioxide gas forming yellow elemental sulfur and white MgO."
  },
  {
    "id": "kroll-ti-reduction",
    "name": "Kroll process reduction of titanium tetrachloride by molten magnesium",
    "reactants": [
      "ticl4",
      "mg"
    ],
    "products": [
      "ti",
      "mgcl2"
    ],
    "enthalpy": -480,
    "desc": "Titanium tetrachloride vapor reduced by molten magnesium at 850°C under argon yielding porous titanium metal sponge."
  },
  {
    "id": "synth-pb-s",
    "name": "Direct synthesis of lead(II) sulfide",
    "reactants": [
      "pb",
      "s"
    ],
    "products": [
      "pbs"
    ],
    "enthalpy": -100.4,
    "desc": "Molten lead and sulfur combine at dull red heat to produce metallic-lustered galena crystals."
  },
  {
    "id": "synth-sn-s",
    "name": "Direct synthesis of tin(II) sulfide",
    "reactants": [
      "sn",
      "s"
    ],
    "products": [
      "sns"
    ],
    "enthalpy": -100,
    "desc": "Tin foil and sulfur powder heat together producing dark grey crystalline tin(II) sulfide."
  },
  {
    "id": "synth-ni-s",
    "name": "Direct synthesis of nickel(II) sulfide",
    "reactants": [
      "ni",
      "s"
    ],
    "products": [
      "nis"
    ],
    "enthalpy": -82,
    "desc": "Fine nickel powder glows in sulfur vapor forming black nickel sulfide."
  },
  {
    "id": "synth-ag-s",
    "name": "Direct synthesis of silver sulfide (silver tarnishing)",
    "reactants": [
      "ag",
      "s"
    ],
    "products": [
      "ag2s"
    ],
    "enthalpy": -32.6,
    "desc": "Silver heated with sulfur develops a deep black-blue iridescent coat of argentite."
  },
  {
    "id": "synth-bi-s",
    "name": "Direct synthesis of bismuth(III) sulfide",
    "reactants": [
      "bi",
      "s"
    ],
    "products": [
      "bi2s3"
    ],
    "enthalpy": -143,
    "desc": "Molten bismuth and sulfur react forming dark grey metallic bismuthinite."
  },
  {
    "id": "synth-cu-i2",
    "name": "Direct synthesis of copper(I) iodide",
    "reactants": [
      "cu",
      "i2"
    ],
    "products": [
      "cui"
    ],
    "enthalpy": -68,
    "desc": "Heated copper foil reacts directly with purple iodine vapor forming off-white cuprous iodide."
  },
  {
    "id": "synth-al-i2",
    "name": "Water-catalyzed synthesis of aluminium iodide",
    "reactants": [
      "al",
      "i2"
    ],
    "products": [
      "ali3"
    ],
    "enthalpy": -514,
    "desc": "Addition of a single drop of water to aluminium powder and iodine initiates violent eruption of purple vapor."
  },
  {
    "id": "synth-zn-i2",
    "name": "Direct synthesis of zinc iodide",
    "reactants": [
      "zn",
      "i2"
    ],
    "products": [
      "zni2"
    ],
    "enthalpy": -208,
    "desc": "Zinc powder and iodine crystals react exothermically in warm suspension forming colorless zinc iodide."
  },
  {
    "id": "synth-fe-i2",
    "name": "Direct synthesis of iron(II) iodide",
    "reactants": [
      "fe",
      "i2"
    ],
    "products": [
      "fei2"
    ],
    "enthalpy": -113,
    "desc": "Iron filings react with iodine in aqueous slurry forming pale green iron(II) iodide solution."
  },
  {
    "id": "synth-mg-i2",
    "name": "Direct synthesis of magnesium iodide",
    "reactants": [
      "mg",
      "i2"
    ],
    "products": [
      "mgi2"
    ],
    "enthalpy": -364,
    "desc": "Magnesium turnings combine directly with iodine forming deliquescent magnesium iodide."
  },
  {
    "id": "synth-pb-i2",
    "name": "Direct synthesis of lead(II) iodide (golden rain precursor)",
    "reactants": [
      "pb",
      "i2"
    ],
    "products": [
      "pbi2"
    ],
    "enthalpy": -175,
    "desc": "Lead filings and iodine heat together producing bright golden-yellow lead(II) iodide."
  },
  {
    "id": "synth-ni-i2",
    "name": "Direct synthesis of nickel(II) iodide",
    "reactants": [
      "ni",
      "i2"
    ],
    "products": [
      "nii2"
    ],
    "enthalpy": -96,
    "desc": "Finely divided nickel heated with iodine vapor produces black crystalline nickel iodide."
  },
  {
    "id": "synth-ag-i2",
    "name": "Direct synthesis of silver iodide",
    "reactants": [
      "ag",
      "i2"
    ],
    "products": [
      "agi"
    ],
    "enthalpy": -62.4,
    "desc": "Silver leaf exposed to iodine vapor turns bright yellow as silver iodide forms."
  },
  {
    "id": "synth-mg-br2",
    "name": "Direct bromination of magnesium to magnesium bromide",
    "reactants": [
      "mg",
      "br2"
    ],
    "products": [
      "mgbr2"
    ],
    "enthalpy": -524,
    "desc": "Magnesium ribbon burns vigorously in bromine vapor producing white hygroscopic MgBr2."
  },
  {
    "id": "synth-pb-br2",
    "name": "Direct bromination of lead to lead(II) bromide",
    "reactants": [
      "pb",
      "br2"
    ],
    "products": [
      "pbbr2"
    ],
    "enthalpy": -278,
    "desc": "Lead metal combines with bromine vapor at moderate heat forming white lead(II) bromide."
  },
  {
    "id": "synth-ag-br2",
    "name": "Direct bromination of silver to silver bromide",
    "reactants": [
      "ag",
      "br2"
    ],
    "products": [
      "agbr"
    ],
    "enthalpy": -100.4,
    "desc": "Silver heated in bromine vapor forms pale cream silver bromide."
  },
  {
    "id": "synth-pcl3",
    "name": "Direct chlorination of white phosphorus to phosphorus trichloride",
    "reactants": [
      "p4",
      "cl2"
    ],
    "products": [
      "pcl3"
    ],
    "enthalpy": -1279,
    "desc": "White phosphorus burns in a stream of dry chlorine gas forming fuming liquid phosphorus trichloride."
  },
  {
    "id": "synth-pcl5",
    "name": "Chlorination of phosphorus trichloride to phosphorus pentachloride",
    "reactants": [
      "pcl3",
      "cl2"
    ],
    "products": [
      "pcl5"
    ],
    "enthalpy": -92.5,
    "desc": "Chlorine gas passed over liquid PCl3 condenses into pale greenish-yellow crystals of PCl5."
  },
  {
    "id": "synth-ag-cl2",
    "name": "Direct chlorination of silver to silver chloride",
    "reactants": [
      "ag",
      "cl2"
    ],
    "products": [
      "agcl"
    ],
    "enthalpy": -127,
    "desc": "Silver foil exposed to dry chlorine gas coats rapidly with insoluble white silver chloride."
  },
  {
    "id": "carb-bao-co2",
    "name": "Carbonation of barium oxide",
    "reactants": [
      "bao",
      "co2"
    ],
    "products": [
      "baco3"
    ],
    "enthalpy": -269,
    "desc": "Caustic barium oxide absorbs carbon dioxide forming white insoluble barium carbonate."
  },
  {
    "id": "carb-sro-co2",
    "name": "Carbonation of strontium oxide",
    "reactants": [
      "sro",
      "co2"
    ],
    "products": [
      "srco3"
    ],
    "enthalpy": -235,
    "desc": "Strontium oxide absorbs carbon dioxide gas forming strontium carbonate."
  },
  {
    "id": "carb-mgo-co2",
    "name": "Carbonation of magnesia",
    "reactants": [
      "mgo",
      "co2"
    ],
    "products": [
      "mgco3"
    ],
    "enthalpy": -117,
    "desc": "Magnesium oxide slowly absorbs atmospheric carbon dioxide forming magnesium carbonate."
  },
  {
    "id": "carb-pbo-co2",
    "name": "Carbonation of lead oxide",
    "reactants": [
      "pbo",
      "co2"
    ],
    "products": [
      "pbco3"
    ],
    "enthalpy": -88,
    "desc": "Litharge reacts with carbon dioxide under moist conditions forming cerussite."
  },
  {
    "id": "carb-zno-co2",
    "name": "Carbonation of zinc oxide",
    "reactants": [
      "zno",
      "co2"
    ],
    "products": [
      "znco3"
    ],
    "enthalpy": -71,
    "desc": "Zinc oxide absorbs carbon dioxide forming zinc carbonate."
  },
  {
    "id": "carb-ag2o-co2",
    "name": "Carbonation of silver oxide",
    "reactants": [
      "ag2o",
      "co2"
    ],
    "products": [
      "ag2co3"
    ],
    "enthalpy": -80,
    "desc": "Brown silver oxide exposed to carbon dioxide turns pale yellow as silver carbonate forms."
  },
  {
    "id": "sulfite-cao-so2",
    "name": "Flue-gas lime desulfurization (calcium sulfite formation)",
    "reactants": [
      "cao",
      "so2"
    ],
    "products": [
      "caso3"
    ],
    "enthalpy": -178,
    "desc": "Quicklime absorbs sulfur dioxide gas in coal plant scrubbers forming insoluble calcium sulfite."
  },
  {
    "id": "sulfite-bao-so2",
    "name": "Barium oxide capture of sulfur dioxide",
    "reactants": [
      "bao",
      "so2"
    ],
    "products": [
      "baso3"
    ],
    "enthalpy": -210,
    "desc": "Barium oxide combines with sulfur dioxide gas forming insoluble barium sulfite."
  },
  {
    "id": "sulfite-sro-so2",
    "name": "Strontium oxide capture of sulfur dioxide",
    "reactants": [
      "sro",
      "so2"
    ],
    "products": [
      "srso3"
    ],
    "enthalpy": -195,
    "desc": "Strontium oxide reacts with sulfur dioxide gas forming strontium sulfite."
  },
  {
    "id": "sulfate-cao-so3",
    "name": "Direct sulfation of quicklime to calcium sulfate",
    "reactants": [
      "cao",
      "so3"
    ],
    "products": [
      "caso4"
    ],
    "enthalpy": -501,
    "desc": "Quicklime aggressively absorbs sulfur trioxide vapor forming anhydrous calcium sulfate (anhydrite)."
  },
  {
    "id": "sulfate-mgo-so3",
    "name": "Direct sulfation of magnesia to magnesium sulfate",
    "reactants": [
      "mgo",
      "so3"
    ],
    "products": [
      "mgso4"
    ],
    "enthalpy": -442,
    "desc": "Magnesium oxide reacts with sulfur trioxide forming anhydrous magnesium sulfate."
  },
  {
    "id": "sulfate-bao-so3",
    "name": "Direct sulfation of barium oxide to barium sulfate",
    "reactants": [
      "bao",
      "so3"
    ],
    "products": [
      "baso4"
    ],
    "enthalpy": -550,
    "desc": "Barium oxide combines with sulfur trioxide forming insoluble barium sulfate."
  }
];

  for (const d of list) {
    const isGasProd = d.products.some(p => ["so2", "co", "co2", "no", "n2o4", "nocl", "ch4", "ammonia", "h2", "cocl2", "so2cl2", "water"].includes(p));
    const gasId = d.products.find(p => ["so2", "co", "co2", "no", "n2o4", "nocl", "ch4", "ammonia", "h2", "cocl2", "so2cl2", "water"].includes(p));
    const eff: SeedObservableEffect = isGasProd
      ? {
          type: "gas_evolution",
          description: d.desc,
          relatedChemicalId: gasId,
        }
      : {
          type: "color_change",
          description: d.desc,
          colorFrom: "#C0C0C0",
          colorTo: "#DAA520",
          relatedChemicalId: d.products[0],
        };

    addReaction({
      id: d.id,
      name: d.name,
      reactionType: ((d as any).reactionType || "synthesis") as any,
      reactants: d.reactants,
      products: d.products,
      enthalpyKjPerMol: d.enthalpy,
      temperatureMinC: 300,
      temperatureMaxC: 1400,
      observableEffects: [eff],
      safetyNotes: "High-temperature metallurgical / inorganic synthesis reaction; thermal hazard and hazardous gas evolution. Conduct in high-temperature blast/crucible furnace or fume hood.",
    });
  }
}
