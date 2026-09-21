import { addReaction } from "./generate1000Reactions.js";
import type { SeedObservableEffect } from "../reactions.js";

export function buildDomain7Decomposition(): void {
  // Domain 7: 70 Curated Thermal Decomposition & Pyrolysis Reactions
  const list = [
  {
    "id": "decomp-li2co3",
    "name": "Thermal calcination of lithium carbonate",
    "reactants": [
      "li2co3"
    ],
    "products": [
      "li2o",
      "co2"
    ],
    "enthalpy": 226,
    "desc": "Lithium carbonate decomposes at 720°C yielding lithium oxide and carbon dioxide."
  },
  {
    "id": "decomp-sodalime-acetate-na",
    "name": "Soda-lime decarboxylation of sodium acetate to methane",
    "reactants": [
      "ch3coona",
      "naoh"
    ],
    "products": [
      "ch4",
      "na2co3"
    ],
    "enthalpy": -55,
    "desc": "Dry heating sodium acetate with sodium hydroxide yields methane gas and sodium carbonate."
  },
  {
    "id": "decomp-sodalime-acetate-k",
    "name": "Decarboxylation of potassium acetate with potassium hydroxide",
    "reactants": [
      "ch3cook",
      "koh"
    ],
    "products": [
      "ch4",
      "k2co3"
    ],
    "enthalpy": -52,
    "desc": "Heating potassium acetate with base yields methane gas."
  },
  {
    "id": "decomp-sodalime-benzoate-na",
    "name": "Soda-lime decarboxylation of sodium benzoate to benzene",
    "reactants": [
      "c6h5coona",
      "naoh"
    ],
    "products": [
      "c6h6",
      "na2co3"
    ],
    "enthalpy": -38,
    "desc": "Pyrolysis of sodium benzoate with sodium hydroxide yields benzene and sodium carbonate."
  },
  {
    "id": "decomp-sodalime-benzoate-k",
    "name": "Decarboxylation of potassium benzoate with potassium hydroxide",
    "reactants": [
      "c6h5cook",
      "koh"
    ],
    "products": [
      "c6h6",
      "k2co3"
    ],
    "enthalpy": -36,
    "desc": "Pyrolysis of potassium benzoate with potassium hydroxide produces benzene."
  },
  {
    "id": "decomp-mgco3",
    "name": "Thermal calcination of magnesium carbonate",
    "reactants": [
      "mgco3"
    ],
    "products": [
      "mgo",
      "co2"
    ],
    "enthalpy": 117,
    "desc": "Magnesium carbonate decomposes on heating releasing carbon dioxide and leaving magnesia."
  },
  {
    "id": "decomp-baco3",
    "name": "High-temperature calcination of barium carbonate",
    "reactants": [
      "baco3"
    ],
    "products": [
      "bao",
      "co2"
    ],
    "enthalpy": 269,
    "desc": "Decomposition at 1300°C yielding barium oxide and carbon dioxide."
  },
  {
    "id": "decomp-srco3",
    "name": "Thermal calcination of strontium carbonate",
    "reactants": [
      "srco3"
    ],
    "products": [
      "sro",
      "co2"
    ],
    "enthalpy": 235,
    "desc": "Strontium carbonate calcines at 1100°C yielding strontium oxide."
  },
  {
    "id": "decomp-ag2co3",
    "name": "Thermal decomposition of silver carbonate",
    "reactants": [
      "ag2co3"
    ],
    "products": [
      "ag2o",
      "co2"
    ],
    "enthalpy": 80,
    "desc": "Pale yellow silver carbonate decomposes at 200°C to dark brown silver oxide."
  },
  {
    "id": "decomp-khco3",
    "name": "Thermal decomposition of potassium bicarbonate",
    "reactants": [
      "khco3"
    ],
    "products": [
      "k2co3",
      "water",
      "co2"
    ],
    "enthalpy": 91,
    "desc": "Potassium bicarbonate decomposes into potassium carbonate, steam, and carbon dioxide."
  },
  {
    "id": "decomp-mg-hco3-2",
    "name": "Thermal decomposition of magnesium bicarbonate",
    "reactants": [
      "mg-hco3-2"
    ],
    "products": [
      "mgco3",
      "water",
      "co2"
    ],
    "enthalpy": 36,
    "desc": "Boiling water decomposes soluble bicarbonate into white precipitate of basic magnesium carbonate."
  },
  {
    "id": "decomp-caoh2",
    "name": "Thermal dehydration of calcium hydroxide to quicklime",
    "reactants": [
      "caoh2"
    ],
    "products": [
      "cao",
      "water"
    ],
    "enthalpy": 109,
    "desc": "Slaked lime dehydrates at 512°C yielding caustic quicklime."
  },
  {
    "id": "decomp-mgoh2",
    "name": "Thermal dehydration of magnesium hydroxide",
    "reactants": [
      "mgoh2"
    ],
    "products": [
      "mgo",
      "water"
    ],
    "enthalpy": 81,
    "desc": "Brucite loses water at 350°C forming refractory magnesia."
  },
  {
    "id": "decomp-cuoh2",
    "name": "Thermal dehydration of copper(II) hydroxide",
    "reactants": [
      "cuoh2"
    ],
    "products": [
      "cuo",
      "water"
    ],
    "enthalpy": 42,
    "desc": "Gelatinous blue copper hydroxide dehydrates smoothly on heating to black copper(II) oxide."
  },
  {
    "id": "decomp-al-oh-3",
    "name": "Thermal calcination of aluminium hydroxide to alumina",
    "reactants": [
      "al-oh-3"
    ],
    "products": [
      "al2o3",
      "water"
    ],
    "enthalpy": 185,
    "desc": "Gibbsite calcines at 1000°C yielding hard refractory white corundum alumina."
  },
  {
    "id": "decomp-feoh3",
    "name": "Thermal dehydration of iron(III) hydroxide to hematite",
    "reactants": [
      "feoh3"
    ],
    "products": [
      "fe2o3",
      "water"
    ],
    "enthalpy": 96,
    "desc": "Rust-colored precipitate dehydrates on firing to dark red hematite powder."
  },
  {
    "id": "decomp-znoh2",
    "name": "Thermal dehydration of zinc hydroxide",
    "reactants": [
      "znoh2"
    ],
    "products": [
      "zno",
      "water"
    ],
    "enthalpy": 48,
    "desc": "White gelatinous zinc hydroxide dehydrates to zinc oxide."
  },
  {
    "id": "decomp-pb-oh-2",
    "name": "Thermal dehydration of lead(II) hydroxide",
    "reactants": [
      "pb-oh-2"
    ],
    "products": [
      "pbo",
      "water"
    ],
    "enthalpy": 65,
    "desc": "White lead hydroxide turns yellow as it dehydrates to lead monoxide."
  },
  {
    "id": "decomp-sn-oh-2",
    "name": "Thermal dehydration of tin(II) hydroxide",
    "reactants": [
      "sn-oh-2"
    ],
    "products": [
      "sno",
      "water"
    ],
    "enthalpy": 45,
    "desc": "White precipitate dehydrates on gentle warming to dark brown-black tin(II) oxide."
  },
  {
    "id": "decomp-bi-oh-3",
    "name": "Thermal dehydration of bismuth(III) hydroxide",
    "reactants": [
      "bi-oh-3"
    ],
    "products": [
      "bi2o3",
      "water"
    ],
    "enthalpy": 92,
    "desc": "White bismuth hydroxide turns yellow as bismuth trioxide forms."
  },
  {
    "id": "decomp-cr-oh-3",
    "name": "Thermal dehydration of chromium(III) hydroxide",
    "reactants": [
      "cr-oh-3"
    ],
    "products": [
      "cr2o3",
      "water"
    ],
    "enthalpy": 110,
    "desc": "Gray-green chromium hydroxide dehydrates to dark green chromium(III) oxide."
  },
  {
    "id": "decomp-ba-oh-2",
    "name": "Thermal dehydration of barium hydroxide",
    "reactants": [
      "ba-oh-2"
    ],
    "products": [
      "bao",
      "water"
    ],
    "enthalpy": 140,
    "desc": "Dehydration at 800°C yielding barium oxide."
  },
  {
    "id": "decomp-sr-oh-2",
    "name": "Thermal dehydration of strontium hydroxide",
    "reactants": [
      "sr-oh-2"
    ],
    "products": [
      "sro",
      "water"
    ],
    "enthalpy": 135,
    "desc": "Dehydration yielding strontium oxide and steam."
  },
  {
    "id": "decomp-agcl",
    "name": "Photochemical decomposition of silver chloride (photographic darkening)",
    "reactants": [
      "agcl"
    ],
    "products": [
      "ag",
      "cl2"
    ],
    "enthalpy": 127,
    "desc": "Exposure of white silver chloride to actinic light causes purple-gray darkening as metallic silver precipitates."
  },
  {
    "id": "decomp-agbr",
    "name": "Photochemical decomposition of silver bromide (daguerreotype latency)",
    "reactants": [
      "agbr"
    ],
    "products": [
      "ag",
      "br2"
    ],
    "enthalpy": 100,
    "desc": "Light decomposes pale cream silver bromide releasing bromine and submicroscopic silver specks."
  },
  {
    "id": "decomp-agi",
    "name": "Photochemical decomposition of silver iodide",
    "reactants": [
      "agi"
    ],
    "products": [
      "ag",
      "i2"
    ],
    "enthalpy": 62,
    "desc": "Yellow silver iodide decomposes under sunlight yielding metallic silver and free iodine."
  },
  {
    "id": "decomp-fecl3",
    "name": "Thermal dissociation of iron(III) chloride",
    "reactants": [
      "fecl3"
    ],
    "products": [
      "fecl2",
      "cl2"
    ],
    "enthalpy": 61,
    "desc": "Dark green crystals dissociate upon heating to iron(II) chloride and chlorine gas."
  },
  {
    "id": "decomp-h2so4",
    "name": "High-temperature thermal dissociation of sulfuric acid",
    "reactants": [
      "h2so4"
    ],
    "products": [
      "so3",
      "water"
    ],
    "enthalpy": 177,
    "desc": "Concentrated acid boils at 337°C emitting dense white choking choking fumes of sulfur trioxide and water vapor."
  },
  {
    "id": "decomp-hno2",
    "name": "Disproportionation decomposition of nitrous acid",
    "reactants": [
      "hno2"
    ],
    "products": [
      "hno3",
      "no",
      "water"
    ],
    "enthalpy": 37,
    "desc": "Pale blue cold nitrous acid warms and decomposes into nitric acid, nitric oxide gas, and water."
  },
  {
    "id": "decomp-hno3",
    "name": "Photolytic and thermal decomposition of nitric acid (red fuming)",
    "reactants": [
      "hno3"
    ],
    "products": [
      "no2",
      "water",
      "o2"
    ],
    "enthalpy": 72,
    "desc": "Concentrated nitric acid turns yellowish-brown over time as it slowly decomposes into NO2 and oxygen."
  },
  {
    "id": "decomp-isopropanol-dehydro",
    "name": "Catalytic dehydrogenation of isopropanol to acetone",
    "reactants": [
      "c3h8o_iso"
    ],
    "products": [
      "ch3coch3",
      "h2"
    ],
    "enthalpy": 66,
    "desc": "Isopropanol over copper or zinc oxide catalyst dehydrogenates cleanly to volatile acetone."
  },
  {
    "id": "decomp-acetic-methane",
    "name": "Thermal decarboxylation cracking of acetic acid to methane and carbon dioxide",
    "reactants": [
      "ch3cooh"
    ],
    "products": [
      "ch4",
      "co2"
    ],
    "enthalpy": -33,
    "desc": "Pyrolytic decarboxylation yields greenhouse gases methane and carbon dioxide."
  },
  {
    "id": "decomp-iodoethane",
    "name": "Dehydroiodination of iodoethane to ethylene",
    "reactants": [
      "c2h5i"
    ],
    "products": [
      "c2h4",
      "hi"
    ],
    "enthalpy": 60,
    "desc": "Thermal elimination of hydrogen iodide from iodoethane yields ethylene gas."
  },
  {
    "id": "decomp-2butanol-butene",
    "name": "Dehydration of 2-butanol to 2-butene",
    "reactants": [
      "c4h10o_sec"
    ],
    "products": [
      "c4h8",
      "water"
    ],
    "enthalpy": 42,
    "desc": "Dehydration of 2-butanol yields butene."
  },
  {
    "id": "decomp-tbutanol-butene",
    "name": "Dehydration of tert-butanol to isobutene",
    "reactants": [
      "c4h10o_tert"
    ],
    "products": [
      "c4h8",
      "water"
    ],
    "enthalpy": 38,
    "desc": "Tert-butanol dehydrates under gentle warming."
  },
  {
    "id": "decomp-cuno32",
    "name": "Thermal decomposition of copper(II) nitrate",
    "reactants": [
      "cu-no3-2"
    ],
    "products": [
      "cuo",
      "no2",
      "o2"
    ],
    "enthalpy": 285,
    "desc": "Blue crystals melt and decompose into dense brown NO2 fumes and black copper oxide."
  },
  {
    "id": "decomp-znno32",
    "name": "Thermal decomposition of zinc nitrate",
    "reactants": [
      "zn-no3-2"
    ],
    "products": [
      "zno",
      "no2",
      "o2"
    ],
    "enthalpy": 290,
    "desc": "Decomposes yielding yellow-hot zinc oxide and brown nitrogen dioxide fumes."
  },
  {
    "id": "decomp-mgno32",
    "name": "Thermal decomposition of magnesium nitrate",
    "reactants": [
      "mg-no3-2"
    ],
    "products": [
      "mgo",
      "no2",
      "o2"
    ],
    "enthalpy": 315,
    "desc": "White salt decomposes to magnesia and nitrogen dioxide gas."
  },
  {
    "id": "decomp-cano32",
    "name": "Thermal decomposition of calcium nitrate",
    "reactants": [
      "ca-no3-2"
    ],
    "products": [
      "cao",
      "no2",
      "o2"
    ],
    "enthalpy": 368,
    "desc": "High-temperature decomposition yielding quicklime, oxygen, and NO2."
  },
  {
    "id": "decomp-srno32",
    "name": "Thermal decomposition of strontium nitrate",
    "reactants": [
      "sr-no3-2"
    ],
    "products": [
      "sro",
      "no2",
      "o2"
    ],
    "enthalpy": 382,
    "desc": "Decomposition of red-pyrotechnic oxidizer yielding strontium oxide."
  },
  {
    "id": "decomp-bano32",
    "name": "Thermal decomposition of barium nitrate",
    "reactants": [
      "bano32"
    ],
    "products": [
      "bao",
      "no2",
      "o2"
    ],
    "enthalpy": 405,
    "desc": "Green pyrotechnic oxidizer decomposes at red heat."
  },
  {
    "id": "decomp-bino33",
    "name": "Thermal decomposition of bismuth(III) nitrate",
    "reactants": [
      "bi-no3-3"
    ],
    "products": [
      "bi2o3",
      "no2",
      "o2"
    ],
    "enthalpy": 450,
    "desc": "Decomposes yielding yellow bismuth oxide powder."
  },
  {
    "id": "decomp-alno33",
    "name": "Thermal decomposition of aluminium nitrate",
    "reactants": [
      "al-no3-3"
    ],
    "products": [
      "al2o3",
      "no2",
      "o2"
    ],
    "enthalpy": 520,
    "desc": "Decomposes into fluffy white alumina powder and nitrogen dioxide."
  },
  {
    "id": "decomp-feno33",
    "name": "Thermal decomposition of iron(III) nitrate",
    "reactants": [
      "fe-no3-3"
    ],
    "products": [
      "fe2o3",
      "no2",
      "o2"
    ],
    "enthalpy": 490,
    "desc": "Pale violet crystals decompose into red iron(III) oxide and dense brown NO2."
  },
  {
    "id": "decomp-crno33",
    "name": "Thermal decomposition of chromium(III) nitrate",
    "reactants": [
      "cr-no3-3"
    ],
    "products": [
      "cr2o3",
      "no2",
      "o2"
    ],
    "enthalpy": 510,
    "desc": "Dark violet crystals decompose into green chromium oxide."
  },
  {
    "id": "decomp-agno3",
    "name": "Thermal decomposition of silver nitrate to metallic silver",
    "reactants": [
      "agno3"
    ],
    "products": [
      "ag",
      "no2",
      "o2"
    ],
    "enthalpy": 158,
    "desc": "Silver nitrate decomposes at 440°C leaving lustrous mirror-like beads of elemental silver."
  },
  {
    "id": "decomp-nano3",
    "name": "Thermal decomposition of sodium nitrate",
    "reactants": [
      "nano3"
    ],
    "products": [
      "nano2",
      "o2"
    ],
    "enthalpy": 106,
    "desc": "Melted sodium nitrate gently effervesces releasing pure oxygen gas and leaving sodium nitrite."
  },
  {
    "id": "decomp-lino3",
    "name": "Thermal decomposition of lithium nitrate",
    "reactants": [
      "lino3"
    ],
    "products": [
      "li2o",
      "no2",
      "o2"
    ],
    "enthalpy": 232,
    "desc": "Lithium exhibits diagonal relationship with magnesium, decomposing directly to oxide."
  },
  {
    "id": "decomp-nh4no2",
    "name": "Thermal decomposition of ammonium nitrite to nitrogen gas",
    "reactants": [
      "nh4no2"
    ],
    "products": [
      "n2",
      "water"
    ],
    "enthalpy": -315,
    "desc": "Mild warming decomposes ammonium nitrite cleanly into odorless nitrogen gas."
  },
  {
    "id": "decomp-nh4no3",
    "name": "Gentle thermal decomposition of ammonium nitrate to nitrous oxide",
    "reactants": [
      "nh4no3"
    ],
    "products": [
      "n2o",
      "water"
    ],
    "enthalpy": -36,
    "desc": "Careful warming to 200°C decomposes ammonium nitrate into laughing gas and steam."
  },
  {
    "id": "decomp-n2o4",
    "name": "Thermal dissociation of dinitrogen tetroxide to nitrogen dioxide",
    "reactants": [
      "n2o4"
    ],
    "products": [
      "no2"
    ],
    "enthalpy": 57.2,
    "desc": "Pale yellow liquid/gas turns into dense reddish-brown nitrogen dioxide gas."
  },
  {
    "id": "decomp-so3",
    "name": "High-temperature catalytic dissociation of sulfur trioxide",
    "reactants": [
      "so3"
    ],
    "products": [
      "so2",
      "o2"
    ],
    "enthalpy": 198,
    "desc": "Sulfur trioxide dissociates into sulfur dioxide and oxygen gas."
  },
  {
    "id": "decomp-pcl5",
    "name": "Thermal dissociation of phosphorus pentachloride",
    "reactants": [
      "pcl5"
    ],
    "products": [
      "pcl3",
      "cl2"
    ],
    "enthalpy": 92.5,
    "desc": "Phosphorus pentachloride vaporizes and reversibly dissociates into PCl3 and yellow chlorine gas."
  },
  {
    "id": "decomp-hi",
    "name": "Thermal dissociation of hydrogen iodide",
    "reactants": [
      "hi"
    ],
    "products": [
      "h2",
      "i2"
    ],
    "enthalpy": 26.5,
    "desc": "Colorless hydrogen iodide gas dissociates into hydrogen and deep violet iodine vapor."
  },
  {
    "id": "decomp-hbr",
    "name": "Thermal dissociation of hydrogen bromide",
    "reactants": [
      "hbr"
    ],
    "products": [
      "h2",
      "br2"
    ],
    "enthalpy": 103,
    "desc": "Dissociation into hydrogen and red-brown bromine vapor."
  },
  {
    "id": "decomp-kclo4",
    "name": "Thermal decomposition of potassium perchlorate",
    "reactants": [
      "kclo4"
    ],
    "products": [
      "kcl",
      "o2"
    ],
    "enthalpy": -12,
    "desc": "Perchlorate decomposes at 400°C into potassium chloride and oxygen."
  },
  {
    "id": "decomp-naclo4",
    "name": "Thermal decomposition of sodium perchlorate",
    "reactants": [
      "naclo4"
    ],
    "products": [
      "nacl",
      "o2"
    ],
    "enthalpy": -14,
    "desc": "Decomposes releasing oxygen gas."
  },
  {
    "id": "decomp-ag2o",
    "name": "Thermal decomposition of silver oxide",
    "reactants": [
      "ag2o"
    ],
    "products": [
      "ag",
      "o2"
    ],
    "enthalpy": 62,
    "desc": "Dark brown silver oxide decomposes at 280°C leaving pure metallic silver."
  },
  {
    "id": "decomp-cuso4-5h2o",
    "name": "Thermal dehydration of copper(II) sulfate pentahydrate",
    "reactants": [
      "cuso4-5h2o"
    ],
    "products": [
      "cuso4",
      "water"
    ],
    "enthalpy": 299,
    "desc": "Royal-blue vitriol crystals crumble into chalky grayish-white anhydrous copper sulfate."
  },
  {
    "id": "decomp-fe2-so4-3",
    "name": "Thermal calcination of iron(III) sulfate",
    "reactants": [
      "fe2-so4-3"
    ],
    "products": [
      "fe2o3",
      "so3"
    ],
    "enthalpy": 560,
    "desc": "Iron(III) sulfate decomposes at red heat to red hematite and sulfur trioxide fumes."
  },
  {
    "id": "decomp-al2-so4-3",
    "name": "Thermal calcination of aluminium sulfate",
    "reactants": [
      "al2-so4-3"
    ],
    "products": [
      "al2o3",
      "so3"
    ],
    "enthalpy": 640,
    "desc": "Aluminium sulfate decomposes at 770°C yielding alumina and sulfur trioxide."
  },
  {
    "id": "decomp-caso4",
    "name": "High-temperature decomposition of calcium sulfate",
    "reactants": [
      "caso4"
    ],
    "products": [
      "cao",
      "so2",
      "o2"
    ],
    "enthalpy": 501,
    "desc": "Decomposes at 1200°C into quicklime, sulfur dioxide, and oxygen."
  },
  {
    "id": "decomp-mgso4",
    "name": "High-temperature calcination of magnesium sulfate",
    "reactants": [
      "mgso4"
    ],
    "products": [
      "mgo",
      "so2",
      "o2"
    ],
    "enthalpy": 442,
    "desc": "Decomposes at 1124°C into magnesia and sulfur dioxide."
  },
  {
    "id": "decomp-znso4",
    "name": "Thermal decomposition of zinc sulfate",
    "reactants": [
      "znso4"
    ],
    "products": [
      "zno",
      "so2",
      "o2"
    ],
    "enthalpy": 340,
    "desc": "Zinc sulfate decomposes at 740°C into zinc oxide and SO2/O2."
  },
  {
    "id": "decomp-cuso4-thermal",
    "name": "High-temperature calcination of anhydrous copper(II) sulfate",
    "reactants": [
      "cuso4"
    ],
    "products": [
      "cuo",
      "so2",
      "o2"
    ],
    "enthalpy": 280,
    "desc": "Copper sulfate decomposes at 650°C into black copper(II) oxide and sulfur dioxide."
  },
  {
    "id": "decomp-malonic-acid",
    "name": "Thermal decarboxylation of malonic acid to acetic acid",
    "reactants": [
      "c3h4o4"
    ],
    "products": [
      "ch3cooh",
      "co2"
    ],
    "enthalpy": -35,
    "desc": "Molten malonic acid effervesces at 140°C cleanly eliminating CO2 to yield acetic acid."
  },
  {
    "id": "decomp-formic-acid",
    "name": "Thermal decomposition of formic acid to carbon monoxide and steam",
    "reactants": [
      "hcooh"
    ],
    "products": [
      "co",
      "water"
    ],
    "enthalpy": 15,
    "desc": "Dehydration over warm concentrated acid releasing flammable carbon monoxide gas."
  },
  {
    "id": "decomp-oxalic-acid-co",
    "name": "Thermal decomposition of oxalic acid into carbon monoxide, carbon dioxide, and steam",
    "reactants": [
      "h2c2o4"
    ],
    "products": [
      "co",
      "co2",
      "water"
    ],
    "enthalpy": 105,
    "desc": "Oxalic acid decomposes upon heating with sulfuric acid into equimolar CO and CO2."
  },
  {
    "id": "decomp-salicylic-decarb",
    "name": "Decarboxylation of salicylic acid to phenol",
    "reactants": [
      "c7h6o3"
    ],
    "products": [
      "c6h6o",
      "co2"
    ],
    "enthalpy": 22,
    "desc": "Heating salicylic acid in the presence of base catalyst eliminates carbon dioxide to produce phenol."
  },
  {
    "id": "decomp-chloroethane",
    "name": "Dehydrohalogenation of chloroethane to ethylene",
    "reactants": [
      "c2h5cl"
    ],
    "products": [
      "c2h4",
      "hcl"
    ],
    "enthalpy": 71,
    "desc": "Elimination of hydrogen chloride from chloroethane yields ethylene gas."
  }
];

  for (const d of list) {
    const isGasProd = d.products.some(p => ["co2", "so2", "so3", "no2", "no", "n2", "o2", "h2", "cl2", "br2", "ch4", "c2h4", "c3h6", "c4h8", "hcl", "hbr", "hi"].includes(p));
    const gasId = d.products.find(p => ["co2", "so2", "so3", "no2", "no", "n2", "o2", "h2", "cl2", "br2", "ch4", "c2h4", "c3h6", "c4h8", "hcl", "hbr", "hi"].includes(p));
    const eff: SeedObservableEffect = isGasProd
      ? {
          type: "gas_evolution",
          description: d.desc,
          relatedChemicalId: gasId,
        }
      : {
          type: "color_change",
          description: d.desc,
          colorFrom: "#E0E0E0",
          colorTo: "#808080",
          relatedChemicalId: d.products[0],
        };

    addReaction({
      id: d.id,
      name: d.name,
      reactionType: "decomposition",
      reactants: d.reactants,
      products: d.products,
      enthalpyKjPerMol: d.enthalpy,
      temperatureMinC: 150,
      temperatureMaxC: 1200,
      observableEffects: [eff],
      safetyNotes: "Endothermic or pyrolytic thermal decomposition; high temperatures and hot/toxic evolved gases. Work in a fume hood with heat-resistant protection.",
    });
  }
}
