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

// Read existing keys from Domain 21 as well
const d21Path = path.resolve(__dirname, "./domain21Coordination.ts");
if (fs.existsSync(d21Path)) {
  const d21Content = fs.readFileSync(d21Path, "utf8");
  const match = d21Content.match(/"reactants":\s*(\[[^\]]+\])/g);
  if (match) {
    for (const m of match) {
      const parsed = JSON.parse(m.replace('"reactants":', "").trim());
      localKeys.add(parsed.sort().join("+"));
    }
  }
}

function add(id: string, name: string, reactants: string[], products: string[], enthalpy: number, desc: string, type: string = "redox_other", effects: any[] = []) {
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

// Section 1: Gold & Silver Cyanidation & Merrill-Crowe (15)
add("hydro-au-cyanidation-na", "MacArthur-Forrest process: aerated cyanidation of metallic gold",
  ["au", "nacn", "o2", "water"], ["na-au-cn-2", "naoh"], -430.0,
  "Industrial gold extraction: oxygen oxidizes native gold into soluble dicyanoaurate(I).");

add("hydro-au-cyanidation-k", "Potassium cyanide leaching of gold with atmospheric oxygen",
  ["au", "kcn", "o2", "water"], ["k-au-cn-2", "koh"], -435.0,
  "Gold heap leaching dissolution yielding potassium dicyanoaurate.");

add("hydro-ag-cyanidation-na", "MacArthur-Forrest silver dissolution by aerated sodium cyanide",
  ["ag", "nacn", "o2", "water"], ["na-ag-cn-2", "naoh"], -380.0,
  "Cyanide dissolution of native silver into water-soluble silver dicyano complex.");

add("hydro-ag-cyanidation-k", "Potassium cyanide dissolution of silver metal",
  ["ag", "kcn", "o2", "water"], ["k-ag-cn-2", "koh"], -385.0,
  "Oxidative alkaline cyanidation of native silver.");

add("hydro-ag2s-cyanidation-na-peroxide", "Peroxide-assisted cyanidation of acanthite/argentite silver sulfide ore",
  ["ag2s", "nacn", "h2o2"], ["na-ag-cn-2", "na2so4", "water"], -720.0,
  "High-efficiency peroxide oxidative cyanide leaching converting silver sulfide to soluble dicyanoargentate.");

add("hydro-ag2s-cyanidation-k-peroxide", "Peroxide-assisted potassium cyanide leaching of argentite ore",
  ["ag2s", "kcn", "h2o2"], ["k-ag-cn-2", "k2so4", "water"], -725.0,
  "Alkaline peroxide cyanidation of silver sulfide.");

add("hydro-ag2o-cyanidation-na", "Cyanide leaching of silver oxide residues",
  ["ag2o", "nacn", "water"], ["na-ag-cn-2", "naoh"], -85.0,
  "Dissolution of oxidized silver metallurgical slimes into dicyanoargentate.");

add("hydro-agcl-cyanidation-k", "Potassium cyanide leaching of silver chloride",
  ["agcl", "kcn"], ["k-ag-cn-2", "kcl"], -68.0,
  "Complexation dissolution of horn silver.");

add("hydro-agbr-cyanidation-na", "Cyanide dissolution of bromargyrite silver bromide ore",
  ["agbr", "nacn"], ["na-ag-cn-2", "nabr"], -58.0,
  "Hydrometallurgical recovery of silver from bromide ores.");

add("hydro-agbr-cyanidation-k", "Potassium cyanide dissolution of silver bromide",
  ["agbr", "kcn"], ["k-ag-cn-2", "kbr"], -60.0,
  "Alkaline cyanide dissolution of bromargyrite.");

add("hydro-agi-cyanidation-na", "Cyanide dissolution of iodargyrite silver iodide ore",
  ["agi", "nacn"], ["na-ag-cn-2", "nai"], -42.0,
  "High-efficiency cyanidation of refractory silver iodide minerals.");

add("hydro-agi-cyanidation-k", "Potassium cyanide dissolution of silver iodide",
  ["agi", "kcn"], ["k-ag-cn-2", "ki"], -44.0,
  "Solubilization of silver iodide in potassium cyanide.");

add("hydro-au-peroxide-cyanidation", "Hydrogen peroxide accelerated cyanidation of native gold",
  ["au", "nacn", "h2o2"], ["na-au-cn-2", "naoh"], -510.0,
  "Peroxide-assisted high-intensity gold leaching.");

add("hydro-ag-peroxide-cyanidation", "Hydrogen peroxide accelerated cyanidation of silver",
  ["ag", "nacn", "h2o2"], ["na-ag-cn-2", "naoh"], -470.0,
  "Peroxide oxidation of silver in alkaline cyanide solution.");

add("hydro-merrill-crowe-zn-au", "Merrill-Crowe process: zinc dust cementation of gold from cyanide solution",
  ["na-au-cn-2", "zn", "naoh"], ["au", "na2-zn-oh-4", "nacn"], -210.0,
  "Sacrificial zinc dust reduces gold(I) out of pregnant leach liquor to metallic gold sponge.");

// Section 2: Bayer Process & Alumina Hydrometallurgy (15)
add("hydro-bayer-alumina-digestion", "Bayer process: high-temperature caustic digestion of alumina",
  ["al2o3", "naoh"], ["na-alo2", "water"], -45.0,
  "Caustic digestion of anhydrous bauxite alumina.");

add("hydro-bayer-potash-alumina", "Caustic potash digestion of aluminum oxide",
  ["al2o3", "koh"], ["k-alo2", "water"], -48.0,
  "Potassium hydroxide digestion of alumina.");

add("hydro-bayer-precipitation-cooling", "Bayer precipitation: seeding and decomposition of sodium aluminate liquor",
  ["na-alo2", "water"], ["al-oh-3", "naoh"], -35.0,
  "Controlled cooling and seed addition precipitating coarse sandy metallurgical gibbsite.");

add("hydro-bayer-potash-precipitation", "Hydrolytic precipitation of gibbsite from potassium aluminate liquor",
  ["k-alo2", "water"], ["al-oh-3", "koh"], -32.0,
  "Decomposition of supersaturated potassium aluminate solution.");

add("hydro-bayer-co2-carbonation-na", "Carbonation of Bayer sodium aluminate liquor",
  ["na-alo2", "co2", "water"], ["al-oh-3", "nahco3"], -78.0,
  "Accelerated carbonation precipitating fine chemical-grade aluminum trihydroxide.");

add("hydro-bayer-co2-carbonation-k", "Carbonation of potassium aluminate liquor by carbon dioxide",
  ["k-alo2", "co2", "water"], ["al-oh-3", "khco3"], -80.0,
  "Carbon dioxide precipitation of pure aluminum hydroxide from potash liquor.");

add("hydro-bayer-alumina-sulfuric", "Acid process for low-grade bauxite: sulfuric acid leaching of alumina",
  ["al2o3", "h2so4"], ["al2-so4-3", "water"], -195.0,
  "Acid extraction generating aluminum sulfate coagulant for water treatment.");

add("hydro-bayer-alumina-hbr", "Hydrobromic acid leaching of alumina bauxite",
  ["al2o3", "hbr"], ["albr3", "water"], -185.0,
  "Acidic dissolution yielding aluminum bromide precursor.");

add("hydro-bayer-alumina-hno3", "Nitric acid dissolution of aluminum oxide",
  ["al2o3", "hno3"], ["al-no3-3", "water"], -180.0,
  "Production of high-purity aluminum nitrate catalyst support precursor.");

add("hydro-bayer-desilication-soda-sinter", "Thermal desilication sintering of silica with soda ash",
  ["sio2", "na2co3"], ["na2sio3", "co2"], 95.0,
  "Solid-state sintering converting quartz gangue into soluble sodium metasilicate.");

add("hydro-bayer-desilication-potash-sinter", "Potash sintering of quartz gangue",
  ["sio2", "k2co3"], ["k2sio3", "co2"], 98.0,
  "Thermal sintering with potassium carbonate.");

add("hydro-bayer-soda-lime-sinter", "Soda-lime sinter process: roasting diasporic bauxite with limestone",
  ["al2o3", "na2co3"], ["na-alo2", "co2"], 125.0,
  "High-temperature alkaline sintering for low-grade high-silica bauxite ores.");

add("hydro-bayer-potash-sinter", "Potash sintering of aluminum oxide",
  ["al2o3", "k2co3"], ["k-alo2", "co2"], 130.0,
  "Thermal sintering with potassium carbonate.");

add("hydro-bayer-lime-potash-bicarb-causticization", "Causticization of potassium bicarbonate liquor with slaked lime",
  ["khco3", "caoh2"], ["caco3", "koh", "water"], -26.0,
  "Regeneration of active caustic potash from carbonated liquor.");

add("hydro-bayer-potash-causticization", "Causticization of potassium carbonate with lime",
  ["k2co3", "caoh2"], ["caco3", "koh"], -16.0,
  "Regeneration of potassium hydroxide from carbonate solutions.");

// Section 3: Copper Hydrometallurgy & Ore Leaching (15)
add("hydro-cu-chalcocite-ferric-leach-1", "Ferric sulfate leaching of chalcocite (Stage 1)",
  ["cu2s", "fe2-so4-3"], ["cuso4", "feso4", "cus"], -110.0,
  "First rapid stage of chalcocite heap leaching converting Cu2S to covellite (CuS).");

add("hydro-cu-covellite-ferric-chloride", "Ferric chloride leaching of covellite copper ore",
  ["cus", "fecl3"], ["cucl2", "fecl2", "s"], -60.0,
  "Chloride hydrometallurgy leaching of covellite yielding copper(II) chloride and sulfur.");

add("hydro-cu-chalcopyrite-ferric-leach", "Atmospheric ferric chloride leaching of chalcopyrite ore",
  ["cu-fe-s2", "fecl3"], ["cucl2", "fecl2", "s"], -85.0,
  "Chloride hydrometallurgy: ferric chloride attack liberating cupric chloride and sulfur.");

add("hydro-cu-cementation-aluminum", "Aluminum scrap cementation of copper from copper sulfate solution",
  ["cuso4", "al"], ["cu", "al2-so4-3"], -480.0,
  "Galvanic displacement of copper by scrap aluminum wire.");

add("hydro-cuno32-iron-cementation", "Scrap iron cementation of copper from copper(II) nitrate liquor",
  ["cuno32", "fe"], ["cu", "fe-no3-2"], -165.0,
  "Galvanic displacement of copper from nitrate pregnant leach solution.");

add("hydro-cu-malachite-acid-leach", "Sulfuric acid leaching of malachite / copper carbonate ore",
  ["cuco3", "h2so4"], ["cuso4", "co2", "water"], -62.0,
  "Rapid ambient atmospheric heap leaching of oxidized copper carbonate ores.");

add("hydro-cu-malachite-hcl-leach", "Hydrochloric acid leaching of copper carbonate ore",
  ["cuco3", "hcl"], ["cucl2", "co2", "water"], -65.0,
  "Chloride heap leaching of oxidized malachite ores.");

add("hydro-cu-malachite-hno3-leach", "Nitric acid leaching of malachite copper ore",
  ["cuco3", "hno3"], ["cuno32", "co2", "water"], -68.0,
  "Oxidative dissolution of basic copper carbonate.");

add("hydro-cu-cuo-acetic-leach", "Acetic acid leaching of oxidized copper ore",
  ["cuo", "ch3cooh"], ["ch3coo-2-cu", "water"], -85.0,
  "Mild organic acid leaching producing copper acetate.");

add("hydro-cu-cu2o-acid-leach", "Sulfuric acid disproportionation leaching of cuprite (copper(I) oxide)",
  ["cu2o", "h2so4"], ["cu", "cuso4", "water"], -85.0,
  "Acid attack on cuprite generating soluble copper sulfate and elemental copper.");

add("hydro-cu-cu2o-hcl-leach", "Hydrochloric acid disproportionation leaching of cuprite",
  ["cu2o", "hcl"], ["cu", "cucl2", "water"], -88.0,
  "Disproportionation of copper(I) oxide in hydrochloric acid.");

add("hydro-cu-cu2o-hno3-leach", "Nitric acid oxidative dissolution of cuprite",
  ["cu2o", "hno3"], ["cuno32", "no2", "water"], -210.0,
  "Oxidative dissolution of cuprous oxide to cupric nitrate.");

add("hydro-cu-chalcocite-oxygen-leach", "Pressure acid leaching of chalcocite with oxygen",
  ["cu2s", "o2", "h2so4"], ["cuso4", "water"], -680.0,
  "Autoclave total pressure oxidation of chalcocite.");

add("hydro-cu-chalcopyrite-oxygen-pox", "Total pressure oxidation (POX) of chalcopyrite concentrate in autoclave",
  ["cu-fe-s2", "o2", "water"], ["cuso4", "fe2o3", "h2so4"], -1750.0,
  "High-temperature autoclave POX at 220°C converting chalcopyrite into soluble CuSO4 and stable hematite.");

add("hydro-cu-chalcocite-fecl3-leach", "Ferric chloride leaching of chalcocite ore",
  ["cu2s", "fecl3"], ["cucl2", "fecl2", "s"], -95.0,
  "Rapid chloride hydrometallurgy extraction of chalcocite.");

// Section 4: Zinc Leaching & Calcine Purification (15)
add("hydro-zn-calcine-acetic-leach", "Acetic acid leaching of roasted zinc calcine",
  ["zno", "ch3cooh"], ["ch3coo-2-zn", "water"], -75.0,
  "Selective organic acid leaching of zinc oxide producing zinc acetate.");

add("hydro-zn-calcine-soda-bicarbonate", "Conversion of zinc oxide calcine by sodium bicarbonate",
  ["zno", "nahco3"], ["znco3", "naoh"], -28.0,
  "Alkaline carbonation of zinc oxide calcines.");

add("hydro-zn-calcine-ammonium-leach", "Ammoniacal ammonium carbonate leaching of zinc calcine",
  ["zno", "nh4hco3"], ["znco3", "ammonia", "water"], -45.0,
  "Hydrometallurgical Caron-type ammoniacal extraction of zinc.");

add("hydro-zn-calcine-soda-ash", "Sodium carbonate conversion of zinc oxide in hydrothermal brine",
  ["zno", "na2co3", "water"], ["znco3", "naoh"], -25.0,
  "Conversion of zinc calcine to insoluble zinc carbonate.");

add("hydro-zn-sphalerite-ferric-leach", "Direct ferric sulfate leaching of sphalerite zinc sulfide concentrate",
  ["zns", "fe2-so4-3"], ["znso4", "feso4", "s"], -70.0,
  "Non-oxidative roasting bypass: ferric sulfate oxidation of zinc sulfide to elemental sulfur.");

add("hydro-zn-sphalerite-ferric-chloride", "Direct ferric chloride leaching of sphalerite concentrate",
  ["zns", "fecl3"], ["zncl2", "fecl2", "s"], -75.0,
  "Chloride hydrometallurgy direct leaching of zinc blende.");

add("hydro-zn-sphalerite-oxygen-leach", "Sherritt direct pressure oxygen leaching of zinc sulfide concentrate",
  ["zns", "o2", "h2so4"], ["znso4", "s", "water"], -420.0,
  "Commercial autoclave direct leaching avoiding sulfur dioxide roasting emissions.");

add("hydro-zn-carbonate-smithsonite-leach", "Sulfuric acid leaching of smithsonite (zinc carbonate) ore",
  ["znco3", "h2so4"], ["znso4", "co2", "water"], -65.0,
  "Atmospheric acid dissolution of oxidized zinc deposits.");

add("hydro-zn-carbonate-hcl-leach", "Hydrochloric acid leaching of zinc carbonate ore",
  ["znco3", "hcl"], ["zncl2", "co2", "water"], -68.0,
  "Acid leaching of smithsonite generating zinc chloride.");

add("hydro-zn-carbonate-hno3-leach", "Nitric acid dissolution of smithsonite zinc ore",
  ["znco3", "hno3"], ["zn-no3-2", "co2", "water"], -70.0,
  "Nitric acid dissolution of zinc carbonate.");

add("hydro-zn-purif-pb-cementation", "Electrolyte purification: zinc dust removal of lead ions",
  ["pbso4", "zn"], ["pb", "znso4"], -160.0,
  "Zinc dust cementation removing trace soluble lead before electrowinning.");

add("hydro-zn-purif-pbbr2-cementation", "Cementation of lead from bromide brine by zinc dust",
  ["pbbr2", "zn"], ["pb", "znbr2"], -165.0,
  "Galvanic displacement of lead.");

add("hydro-zn-purif-sncl2-cementation", "Cementation of tin impurities from zinc electrolyte by zinc dust",
  ["sncl2", "zn"], ["sn", "zncl2"], -140.0,
  "Removal of harmful tin impurities from electrowinning feed.");

add("hydro-zn-purif-snso4-cementation", "Cementation of tin from zinc sulfate electrolyte by zinc dust",
  ["snso4", "zn"], ["sn", "znso4"], -135.0,
  "Precipitation of metallic tin sponge.");

add("hydro-zn-purif-nino32-cementation", "Cementation of nickel from zinc nitrate solution by zinc dust",
  ["ni-no3-2", "zn"], ["ni", "zn-no3-2"], -122.0,
  "Precipitation of nickel sponge.");

// Section 5: Nickel & Cobalt Hydrometallurgy (15)
add("hydro-coo-sulfuric-leach", "Sulfuric acid leaching of cobalt(II) oxide",
  ["coo", "h2so4"], ["coso4", "water"], -108.0,
  "Acid leaching of cobalt oxide laterite deposits.");

add("hydro-coo-hcl-leach", "Hydrochloric acid leaching of cobalt(II) oxide ore",
  ["coo", "hcl"], ["cocl2", "water"], -112.0,
  "Atmospheric chloride leaching of cobalt oxide.");

add("hydro-coo-hno3-leach", "Nitric acid leaching of cobalt(II) oxide",
  ["coo", "hno3"], ["co-no3-2", "water"], -116.0,
  "Nitric acid dissolution of cobalt oxide.");

add("hydro-nio-hno3-leach", "Nitric acid leaching of nickel(II) oxide laterite",
  ["nio", "hno3"], ["ni-no3-2", "water"], -118.0,
  "Nitric acid extraction of nickel from lateritic ores.");

add("hydro-nio-fecl3-leach", "Ferric chloride leaching of nickel(II) oxide",
  ["nio", "fecl3", "water"], ["nicl2", "feoh3"], -65.0,
  "Ferric chloride displacement leaching of nickel oxide.");

add("hydro-ni-sulfide-ferric-leach", "Ferric sulfate leaching of millerite nickel sulfide ore",
  ["nis", "fe2-so4-3"], ["niso4", "feso4", "s"], -60.0,
  "Atmospheric ferric leaching of nickel sulfide concentrates.");

add("hydro-ni-sulfide-ferric-chloride", "Ferric chloride leaching of nickel sulfide",
  ["nis", "fecl3"], ["nicl2", "fecl2", "s"], -65.0,
  "Chloride hydrometallurgy leaching of millerite.");

add("hydro-ni-sulfide-oxygen-pox", "Total pressure oxidation of nickel sulfide concentrate",
  ["nis", "o2", "h2so4"], ["niso4", "s", "water"], -410.0,
  "High-pressure autoclave leaching of nickel matte/concentrates.");

add("hydro-co-sulfide-oxygen-pox", "Autoclave pressure oxidation of cobalt(II) sulfide",
  ["co-s", "o2", "h2so4"], ["coso4", "s", "water"], -405.0,
  "Hydrometallurgical extraction of cobalt from sulfide concentrates.");

add("hydro-ni-msp-sulfide-precip", "Mixed sulfide precipitation (MSP): H2S precipitation of nickel from HPAL liquor",
  ["niso4", "h2s"], ["nis", "h2so4"], -85.0,
  "Selective recovery of nickel from pregnant leach solution using hydrogen sulfide gas.");

add("hydro-co-msp-sulfide-precip", "Mixed sulfide precipitation of cobalt using hydrogen sulfide",
  ["coso4", "h2s"], ["co-s", "h2so4"], -82.0,
  "Precipitation of mixed nickel-cobalt sulfide intermediate (MSP).");

add("hydro-ni-mhp-hydroxide-precip", "Mixed hydroxide precipitation (MHP): magnesia precipitation of nickel",
  ["niso4", "mgoh2"], ["nioh2", "mgso4"], -30.0,
  "Commercial MHP intermediate production using calcined magnesia (MgO/Mg(OH)2).");

add("hydro-co-mhp-hydroxide-precip", "Magnesia precipitation of cobalt hydroxide (MHP process)",
  ["coso4", "mgoh2"], ["cooh2", "mgso4"], -28.0,
  "Co-precipitation of cobalt hydroxide in MHP intermediate.");

add("hydro-ni-soda-ash-precip", "Precipitation of basic nickel carbonate from purified leach liquor",
  ["niso4", "na2co3"], ["nico3", "na2so4"], -22.0,
  "Soda ash precipitation of battery-grade nickel carbonate precursor.");

add("hydro-co-soda-ash-precip", "Precipitation of cobalt carbonate from cobalt sulfate liquor",
  ["coso4", "na2co3"], ["coco3", "na2so4"], -24.0,
  "Synthesis of high-purity cobalt carbonate precursor for lithium-ion cathode synthesis.");

add("hydro-ni-potash-precip", "Potassium carbonate precipitation of nickel carbonate",
  ["niso4", "k2co3"], ["nico3", "k2so4"], -25.0,
  "Metathesis generating insoluble nickel carbonate.");

// Section 6: Lead, Tin & Precious Metals Hydrometallurgy (15)
add("hydro-pb-galena-ferric-leach", "Ferric chloride leaching of galena lead sulfide ore",
  ["pbs", "fecl3"], ["pbcl2", "fecl2", "s"], -60.0,
  "Chloride hydrometallurgy bypass of lead smelting: ferric chloride dissolution of PbS.");

add("hydro-pb-galena-hno3-leach", "Nitric acid oxidation leaching of galena ore",
  ["pbs", "hno3"], ["pbno32", "no", "s", "water"], -240.0,
  "Hydrometallurgical extraction of lead by dilute nitric acid.");

add("hydro-pb-oxide-hno3-leach", "Nitric acid leaching of litharge (lead(II) oxide) ore",
  ["pbo", "hno3"], ["pbno32", "water"], -110.0,
  "Rapid dissolution of lead oxide in nitric acid.");

add("hydro-pb-oxide-hcl-leach", "Hydrochloric acid leaching of lead(II) oxide",
  ["pbo", "hcl"], ["pbcl2", "water"], -95.0,
  "Hot brine leaching of oxidized lead minerals.");

add("hydro-pb-carbonate-cerussite-hno3", "Nitric acid leaching of cerussite (lead carbonate) ore",
  ["pbco3", "hno3"], ["pbno32", "co2", "water"], -62.0,
  "Acid leaching of oxidized lead carbonate deposits.");

add("hydro-pb-carbonate-hcl-leach", "Hydrochloric acid leaching of cerussite ore",
  ["pbco3", "hcl"], ["pbcl2", "co2", "water"], -60.0,
  "Chloride dissolution of lead carbonate.");

add("hydro-sn-oxide-hcl-leach", "Hydrochloric acid leaching of tin(II) oxide",
  ["sno", "hcl"], ["sncl2", "water"], -105.0,
  "Acid dissolution of stannous oxide calcines.");

add("hydro-sn-oxide-h2so4-leach", "Sulfuric acid leaching of tin(II) oxide",
  ["sno", "h2so4"], ["snso4", "water"], -100.0,
  "Sulfuric acid leaching generating stannous sulfate.");

add("hydro-sn-cassiterite-hcl-leach", "Hydrochloric acid leaching of cassiterite (tin(IV) oxide)",
  ["sno2", "hcl"], ["sncl4", "water"], -85.0,
  "Concentrated hydrochloric acid digestion of tin dioxide.");

add("hydro-sn-sulfide-ferric-leach", "Ferric chloride leaching of herzenbergite (tin(II) sulfide) ore",
  ["sns", "fecl3"], ["sncl2", "fecl2", "s"], -65.0,
  "Ferric chloride dissolution of tin sulfide.");

add("hydro-sn-sulfide-o2-leach", "Oxidative acid leaching of tin sulfide",
  ["sns", "o2", "hcl"], ["sncl2", "so2", "water"], -420.0,
  "Pressure oxidative dissolution of sulfide concentrates.");

add("hydro-ag-purif-zn-so4", "Zinc dust cementation of silver from silver sulfate solution",
  ["ag2so4", "zn"], ["ag", "znso4"], -305.0,
  "Fast electrochemical displacement recovering high-purity silver sponge.");

add("hydro-ag2o-hno3-leach", "Nitric acid dissolution of silver oxide residues",
  ["ag2o", "hno3"], ["agno3", "water"], -120.0,
  "Recovery of silver from oxidized refining residues.");

add("hydro-ag2o-h2so4-leach", "Sulfuric acid dissolution of silver oxide",
  ["ag2o", "h2so4"], ["ag2so4", "water"], -115.0,
  "Formation of silver sulfate in hydrometallurgical partition.");

add("hydro-ag2s-ferric-leach", "Ferric chloride leaching of silver sulfide ore",
  ["ag2s", "fecl3"], ["agcl", "fecl2", "s"], -72.0,
  "Chloride hydrometallurgy leaching of argentite.");

// Section 7: Uranium Hydrometallurgy & Refractory Sulfide Leaching (15)
add("hydro-u-sulfuric-acid-leach", "Sulfuric acid dissolution of triuranium octoxide (yellowcake)",
  ["u3o8", "h2so4", "h2o2"], ["uo2-so4", "water"], -320.0,
  "Peroxide-assisted acid leaching of uranium ore concentrates yielding soluble uranyl sulfate.");

add("hydro-u-ferric-oxidative-leach", "Ferric iron oxidative sulfuric acid leaching of yellowcake",
  ["u3o8", "h2so4", "fe2-so4-3"], ["uo2-so4", "feso4", "water"], -280.0,
  "Ferric ion oxidation of uranium(IV) to uranyl(VI) in heap and in-situ recovery (ISR).");

add("hydro-u-carbonate-in-situ-leach", "In-situ recovery (ISR): alkaline sodium carbonate leaching of uranium ore",
  ["u3o8", "na2co3", "nahco3", "o2"], ["na4-uo2-co3-3", "water"], -540.0,
  "Environmentally benign ISR leaching converting uranium into soluble sodium uranyl tricarbonate.");

add("hydro-u-leach-mno2-oxidant", "Pyrolusite (MnO2) assisted sulfuric acid leaching of uranium yellowcake",
  ["u3o8", "h2so4", "mno2"], ["uo2-so4", "mnso4", "water"], -350.0,
  "Classic atmospheric uranium leaching: manganese dioxide oxidizes tetravalent uranium to hexavalent uranyl.");

add("hydro-u-leach-hno3-oxidant", "Nitric acid assisted sulfuric acid leaching of uranium ore",
  ["u3o8", "h2so4", "hno3"], ["uo2-so4", "no2", "water"], -380.0,
  "Nitric acid catalytic oxidation of uraninite in sulfuric acid leach slurry.");

add("hydro-u-carbonate-acid-split", "Sulfuric acid strip of sodium uranyl tricarbonate to uranyl sulfate",
  ["na4-uo2-co3-3", "h2so4"], ["uo2-so4", "na2so4", "co2", "water"], -310.0,
  "Acid acidification decomposing tricarbonate complex to produce concentrated uranyl sulfate feed.");

add("hydro-refract-feass-bioleach-1", "Bio-oxidation of arsenopyrite: bacterial oxidation generating ferric and arsenic acids",
  ["fe-as-s", "o2", "water", "h2so4"], ["fe2-so4-3", "h3aso4"], -1350.0,
  "Bio-oxidation of refractory gold arsenopyrite matrix exposing encapsulated submicroscopic gold grains.");

add("hydro-refract-pyrite-ferric-leach", "Indirect chemical leaching of auriferous pyrite by ferric sulfate",
  ["fes2", "fe2-so4-3", "water"], ["feso4", "h2so4"], -420.0,
  "Indirect bioleaching mechanism: ferric sulfate attacks pyrite matrix generating ferrous sulfate and sulfuric acid.");

add("hydro-refract-feass-ferric-leach", "Ferric sulfate oxidation of arsenopyrite ore",
  ["fe-as-s", "fe2-so4-3", "water"], ["feso4", "h3aso4", "h2so4"], -680.0,
  "Ferric ion chemical oxidation of arsenopyrite mineral in heap bioreactor.");

add("hydro-refract-feass-hno3-leach", "Nitric acid oxidation leaching of arsenopyrite concentrate",
  ["fe-as-s", "hno3"], ["fe-no3-3", "h3aso4", "no2", "water", "h2so4"], -1520.0,
  "Intensive nitric acid oxidation destroying refractory arsenopyrite crystal lattice.");

add("hydro-refract-pyrite-hno3-leach", "Nitric acid pressure oxidation of auriferous pyrite",
  ["fes2", "hno3"], ["fe-no3-3", "no2", "water", "h2so4"], -1650.0,
  "Complete chemical breakdown of refractory pyrite hosting invisible solid solution gold.");

add("hydro-refract-pyrite-chlorine-leach", "Chlorine lixiviant oxidation of pyrite matrix",
  ["fes2", "cl2", "water"], ["fecl3", "h2so4", "hcl"], -1480.0,
  "High-rate aqueous chlorination decomposing sulfide gold ores.");

add("hydro-refract-feass-chlorine-leach", "Chlorination destruction of refractory arsenopyrite ore",
  ["fe-as-s", "cl2", "water"], ["fecl3", "h3aso4", "h2so4", "hcl"], -1550.0,
  "Direct hydrometallurgical chlorination liberating refractory gold.");

add("hydro-refract-pyrite-bioleach-hcl", "Hydrochloric acid ferric leaching of pyrite",
  ["fes2", "fecl3", "water"], ["fecl2", "h2so4", "hcl"], -430.0,
  "Chloride bioleaching matrix decomposition of pyrite.");

console.log(`Domain 22 complete: ${list.length} reactions validated!`);

const targetFile = path.resolve(__dirname, "./domain22Hydrometallurgy.ts");
const code = `// Domain 22: Hydrometallurgy & Mineral Leaching (105 reactions)
import { addReaction } from "./generateBatch6.js";

export function buildDomain22Hydrometallurgy(): void {
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
console.log(`✓ Wrote ${list.length} reactions to domain22Hydrometallurgy.ts`);
