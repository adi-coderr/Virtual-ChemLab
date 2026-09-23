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

// Read existing keys from Domain 21 and Domain 22
for (const f of ["domain21Coordination.ts", "domain22Hydrometallurgy.ts"]) {
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

function add(id: string, name: string, reactants: string[], products: string[], enthalpy: number, desc: string, type: string = "synthesis", effects: any[] = []) {
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

// Section 1: Contact Process & Sulfur Oxoacids / Chlorides (15)
add("cat-so2-no2-oxidation", "Lead chamber process: oxidation of sulfur dioxide by nitrogen dioxide",
  ["so2", "no2"], ["so3", "no"], -84.0,
  "Historical homogeneous gas-phase catalytic oxidation in lead chamber sulfuric acid synthesis.");

add("cat-so2-n2o-oxidation", "Nitrous oxide oxidation of sulfur dioxide over metal oxide catalyst",
  ["so2", "n2o"], ["so3", "n2"], -195.0,
  "Catalytic abatement of nitrous oxide with sulfur dioxide.");

add("cat-so2cl2-naoh-neutralize", "Caustic soda neutralization of sulfuryl chloride",
  ["so2cl2", "naoh"], ["na2so4", "nacl", "water"], -320.0,
  "Alkaline scrubber neutralization of sulfuryl chloride vapors.");

add("cat-so2cl2-koh-neutralize", "Caustic potash neutralization of sulfuryl chloride",
  ["so2cl2", "koh"], ["k2so4", "kcl", "water"], -325.0,
  "Alkaline destruction producing potassium sulfate and chloride.");

add("cat-socl2-naoh-neutralize", "Caustic soda neutralization of thionyl chloride",
  ["socl2", "naoh"], ["na2so3", "nacl", "water"], -280.0,
  "Scrubber neutralization generating sodium sulfite and chloride.");

add("cat-socl2-koh-neutralize", "Caustic potash neutralization of thionyl chloride",
  ["socl2", "koh"], ["k2so3", "kcl", "water"], -285.0,
  "Alkaline scrubber destruction using caustic potash.");

add("cat-socl2-so3-chlorosulfonic", "Reaction of thionyl chloride with sulfur trioxide",
  ["socl2", "so3"], ["so2", "so2cl2"], -50.0,
  "Industrial interconversion yielding sulfuryl chloride and sulfur dioxide.");

add("cat-so3-naoh-sulfate", "Direct neutralization of sulfur trioxide vapor by caustic soda",
  ["so3", "naoh"], ["na2so4", "water"], -285.0,
  "Highly exothermic gas-liquid scrubbing of SO3.");

add("cat-so3-koh-sulfate", "Caustic potash absorption of sulfur trioxide",
  ["so3", "koh"], ["k2so4", "water"], -290.0,
  "Absorption of sulfur trioxide forming potassium sulfate.");

add("cat-so3-nacl-metathesis", "High-temperature reaction of sulfur trioxide with sodium chloride",
  ["so3", "nacl", "water"], ["na2so4", "hcl"], -65.0,
  "Mannheim furnace analog converting salt to sodium sulfate.");

add("cat-so3-kcl-metathesis", "Reaction of sulfur trioxide with potassium chloride",
  ["so3", "kcl", "water"], ["k2so4", "hcl"], -68.0,
  "Conversion of potassium chloride to potassium sulfate.");

add("cat-so3-ammonia-sulfate", "Direct gas-phase reaction of sulfur trioxide and ammonia",
  ["so3", "ammonia", "water"], ["nh4-2-so4"], -210.0,
  "Synthesis of fertilizer ammonium sulfate from sulfur trioxide.");

add("cat-so3-nahco3-sulfate", "Bicarbonate dry sorbent injection: neutralization of sulfur trioxide",
  ["so3", "nahco3"], ["na2so4", "co2", "water"], -165.0,
  "Flue gas duct injection of sodium bicarbonate capturing SO3 emissions.");

add("cat-so3-khco3-sulfate", "Potassium bicarbonate absorption of sulfur trioxide",
  ["so3", "khco3"], ["k2so4", "co2", "water"], -170.0,
  "Neutralization of sulfur trioxide by potassium bicarbonate.");

add("cat-so3-na2co3-sulfate", "Dry soda ash absorption of sulfur trioxide",
  ["so3", "na2co3"], ["na2so4", "co2"], -195.0,
  "Solid-gas reaction capturing SO3 in hot flue gas streams.");

// Section 2: Claus Process & Catalytic Sulfur Chemistry (14)
add("cat-claus-cos-hydrolysis", "Claus catalytic converter: hydrolysis of carbonyl sulfide impurity",
  ["carbonyl-sulfide", "water"], ["co2", "h2s"], -35.0,
  "Alumina-catalyzed hydrolysis of COS intermediate in refinery Claus sulfur recovery unit.");

add("cat-claus-cos-oxidation", "Direct catalytic oxidation of carbonyl sulfide",
  ["carbonyl-sulfide", "o2"], ["co2", "so2"], -545.0,
  "Thermal combustion of carbonyl sulfide in Claus reaction furnace.");

add("cat-claus-cs2-chlorination", "Carbon tetrachloride synthesis: chlorination of carbon disulfide",
  ["cs2", "cl2"], ["ccl4", "s"], -230.0,
  "Industrial synthesis of carbon tetrachloride and elemental sulfur over iron catalyst.");

add("cat-claus-cos-naoh", "Caustic scrubbing of carbonyl sulfide gas",
  ["carbonyl-sulfide", "naoh"], ["na2co3", "na2s", "water"], -140.0,
  "Alkaline chemical scrubbing of acid gas containing carbonyl sulfide.");

add("cat-claus-cos-koh", "Potassium hydroxide absorption of carbonyl sulfide",
  ["carbonyl-sulfide", "koh"], ["k2co3", "k2s", "water"], -145.0,
  "Caustic absorption converting COS to carbonate and sulfide.");

add("cat-h2s-cl2-redox", "Vapor-phase redox: oxidation of hydrogen sulfide by chlorine",
  ["h2s", "cl2"], ["s", "hcl"], -175.0,
  "Rapid gas-phase redox depositing elemental sulfur.");

add("cat-h2s-br2-redox", "Oxidation of hydrogen sulfide by bromine",
  ["h2s", "br2"], ["s", "hbr"], -130.0,
  "Quantitative redox reaction depositing sulfur powder.");

add("cat-h2s-i2-redox", "Bumgarner-type redox: reduction of iodine by hydrogen sulfide",
  ["h2s", "i2"], ["s", "hi"], -45.0,
  "Precipitation of sulfur with formation of hydriodic acid.");

add("cat-h2s-so3-redox", "Gas-phase comproportionation of hydrogen sulfide and sulfur trioxide",
  ["h2s", "so3"], ["s", "so2", "water"], -210.0,
  "Exothermic gas-phase redox in sulfur plant tail gas units.");

add("cat-cs2-naoh-scrub", "Caustic soda scrubbing of carbon disulfide",
  ["cs2", "naoh"], ["na2co3", "na2s", "water"], -195.0,
  "Scrubber absorption of CS2 vapors in caustic soda.");

add("cat-cs2-koh-scrub", "Potassium hydroxide scrubbing of carbon disulfide",
  ["cs2", "koh"], ["k2co3", "k2s", "water"], -200.0,
  "Alkaline absorption of carbon disulfide.");

add("cat-h2s-no2-oxidation", "Oxidation of hydrogen sulfide by nitrogen dioxide",
  ["h2s", "no2"], ["s", "no", "water"], -145.0,
  "Flue gas cross-redox between H2S and NO2.");

add("cat-h2s-n2o-reduction", "Catalytic reduction of nitrous oxide by hydrogen sulfide",
  ["h2s", "n2o"], ["s", "n2", "water"], -265.0,
  "Simultaneous DeNOx and desulfurization.");

add("cat-h2s-so2cl2-redox", "Cross-redox reaction between hydrogen sulfide and sulfuryl chloride",
  ["h2s", "so2cl2"], ["s", "so2", "hcl"], -240.0,
  "Vapor-phase destruction of toxic halides generating sulfur and SO2.");

// Section 3: Raschig Hydrazine & Industrial Nitrogen Chemistry (15)
add("cat-raschig-chloramine-synth", "Raschig process Step 1: synthesis of chloramine from ammonia and hypochlorite",
  ["ammonia", "naclo"], ["nh2cl", "naoh"], -145.0,
  "Low-temperature rapid synthesis of monochloramine in the industrial Raschig route.");

add("cat-raschig-hydrazine-coupling", "Raschig process Step 2: coupling of chloramine with excess ammonia",
  ["nh2cl", "ammonia", "naoh"], ["n2h4", "nacl", "water"], -180.0,
  "Gelatin-catalyzed nucleophilic displacement forming hydrazine hydrate.");

add("cat-raschig-sulfate-precip", "Isolation of hydrazine as crystalline hydrazine sulfate",
  ["n2h4", "h2so4"], ["h2nnh2-h2so4"], -155.0,
  "Quantitative precipitation of sparingly soluble hydrazine sulfate from dilute crude Raschig liquor.");

add("cat-hydrazine-peroxide-combust", "Hypergolic bipropellant combustion: hydrazine and hydrogen peroxide",
  ["n2h4", "h2o2"], ["n2", "water"], -640.0,
  "Clean high-energy rocket thruster propellant reaction yielding nitrogen and steam.");

add("cat-hydrazine-chlorine-redox", "Dechlorination: destruction of chlorine gas by hydrazine",
  ["n2h4", "cl2"], ["n2", "hcl"], -520.0,
  "Rapid environmental scavenging of chlorine gas.");

add("cat-hydrazine-bromine-redox", "Bromine reduction by hydrazine",
  ["n2h4", "br2"], ["n2", "hbr"], -480.0,
  "Quantitative reduction of bromine to hydrobromic acid.");

add("cat-hydrazine-iodine-titration", "Iodometric titration of hydrazine",
  ["n2h4", "i2"], ["n2", "hi"], -310.0,
  "Analytical standardization of hydrazine solutions with iodine.");

add("cat-hydrazine-iron-reduction", "Hydrazine boiler feedwater oxygen scavenging and magnetite passivation",
  ["n2h4", "fe2o3"], ["fe3o4", "n2", "water"], -240.0,
  "Reduction of rust to adherent protective black magnetite film on boiler tubes.");

add("cat-hydrazine-cupric-reduction", "Hydrazine reduction of copper(II) chloride to metallic copper",
  ["cucl2", "n2h4", "naoh"], ["cu", "n2", "nacl", "water"], -320.0,
  "Electroless copper deposition and nanoparticle synthesis via hydrazine reduction.");

add("cat-hydrazine-cu-sulfate-reduct", "Hydrazine reduction of copper(II) sulfate",
  ["cuso4", "n2h4", "naoh"], ["cu", "n2", "na2so4", "water"], -315.0,
  "Precipitation of ultrafine copper powder.");

add("cat-hydrazine-silver-mirror", "Silver mirror formation via hydrazine reduction of silver nitrate",
  ["agno3", "n2h4", "naoh"], ["ag", "n2", "nano3", "water"], -380.0,
  "Chemical silver metallization of glass mirrors using hydrazine reductant.");

add("cat-hydrazine-sulfate-naoh-free", "Liberation of free hydrazine hydrate from hydrazine sulfate by caustic soda",
  ["h2nnh2-h2so4", "naoh"], ["n2h4", "na2so4", "water"], -45.0,
  "Neutralization and distillation of anhydrous/hydrate hydrazine.");

add("cat-hydrazine-sulfate-koh-free", "Liberation of hydrazine from sulfate salt using caustic potash",
  ["h2nnh2-h2so4", "koh"], ["n2h4", "k2so4", "water"], -48.0,
  "Potassium hydroxide neutralization of hydrazine sulfate.");

add("cat-chloramine-ammonia-direct", "Gas-phase synthesis of hydrazine from chloramine and ammonia",
  ["nh2cl", "ammonia"], ["n2h4", "ammonium-chloride"], -165.0,
  "Non-aqueous gas-phase Raschig reaction.");

add("cat-hydrazine-catalytic-decomp", "Satellite monopropellant catalytic decomposition over iridium (Shell 405)",
  ["n2h4"], ["n2", "ammonia", "h2"], -110.0,
  "Spacecraft attitude control thruster: rapid adiabatic catalytic decomposition.");

// Section 4: DeNOx SCR Catalysis & Urea Chemistry (14)
add("cat-ch4-no-reduction", "Selective catalytic reduction of nitrogen monoxide by methane",
  ["ch4", "no"], ["co2", "water", "n2"], -1160.0,
  "Methane-SCR over Co-ZSM-5 zeolite for lean-burn natural gas engines.");

add("cat-scr-no2-reduction", "Slow SCR reaction: reduction of pure nitrogen dioxide by ammonia",
  ["ammonia", "no2"], ["n2", "water"], -1370.0,
  "DeNOx reduction of NO2 in chemical plant off-gases.");

add("cat-scr-n2o-abatement", "Catalytic abatement of nitrous oxide by ammonia",
  ["ammonia", "n2o"], ["n2", "water"], -910.0,
  "High-temperature catalytic destruction of greenhouse gas N2O in nitric acid plant exhausts.");

add("cat-urea-scr-hydrolysis", "Thermal hydrolysis of urea (DEF / AdBlue) generating ammonia for DeNOx",
  ["urea", "water"], ["ammonia", "co2"], 134.0,
  "Diesel exhaust fluid vaporization and catalytic thermolysis in mobile SCR systems.");

add("cat-urea-bleach-oxidation", "Oxidative destruction of urea by sodium hypochlorite",
  ["urea", "naclo"], ["n2", "nacl", "co2", "water"], -460.0,
  "Wastewater treatment destroying nitrogenous urea with hypochlorite.");

add("cat-urea-hno3-nitrate", "Thermal decomposition of urea nitrate",
  ["urea", "hno3"], ["co2", "n2o", "water"], -185.0,
  "Acid-catalyzed destruction of urea producing nitrous oxide.");

add("cat-urea-h2o2-peroxide", "Peroxide oxidation of urea",
  ["urea", "h2o2"], ["n2", "co2", "water"], -510.0,
  "Advanced oxidation process for wastewater purification.");

add("cat-ammonia-chlorine-bleaching", "Chlor-alkali scrubber reaction: ammonia destruction of chlorine gas",
  ["ammonia", "cl2"], ["n2", "ammonium-chloride"], -460.0,
  "Safety emergency scrubbing of chlorine gas leaks with ammonia spray.");

add("cat-ammonia-iodine-redox", "Gas-phase oxidation of ammonia by iodine vapor",
  ["ammonia", "i2"], ["n2", "hi"], -250.0,
  "High-temperature redox yielding nitrogen and hydriodic acid.");

add("cat-no-co-catalytic-reduction", "Automotive 3-way catalyst: reduction of NO by carbon monoxide",
  ["no", "co"], ["n2", "co2"], -373.0,
  "Key stoichiometric reaction across Pt/Rh washcoat in three-way catalytic converters.");

add("cat-no-h2-catalytic-reduction", "Automotive catalyst: reduction of nitrogen monoxide by hydrogen",
  ["no", "h2"], ["n2", "water"], -332.0,
  "Exhaust gas reduction of NO over platinum group metal catalysts.");

add("cat-no2-h2-catalytic-reduction", "Catalytic reduction of nitrogen dioxide by hydrogen",
  ["no2", "h2"], ["n2", "water"], -680.0,
  "Catalytic DeNOx reduction using hydrogen.");

add("cat-urea-no-denox", "Urea SCR: direct reduction of nitrogen monoxide by urea without prior hydrolysis",
  ["urea", "no"], ["n2", "co2", "water"], -1480.0,
  "Direct thermal DeNOx SCR reaction between vaporized urea and flue gas nitric oxide.");

add("cat-ammonia-co-reduction", "High-temperature reaction of ammonia with carbon monoxide to hydrogen cyanide",
  ["ammonia", "co"], ["hcn", "water"], 45.0,
  "Vapor-phase synthesis of hydrogen cyanide over alumina/platinum catalysts.");

// Section 5: Chlor-Alkali, Chlorates & Perchlorates (14)
add("cat-cl2-naoh-cold-bleach", "Cold chlor-alkali reaction: synthesis of sodium hypochlorite bleach",
  ["cl2", "naoh"], ["naclo", "nacl", "water"], -102.0,
  "Industrial chlor-alkali reaction at <30°C producing commercial household bleach.");

add("cat-naclo-catalytic-decomp", "Cobalt oxide catalyzed decomposition of sodium hypochlorite",
  ["naclo"], ["nacl", "o2"], -62.0,
  "Catalytic oxygen evolution destroying industrial hypochlorite effluents.");

add("cat-i2-naoh-iodate", "Disproportionation of iodine in hot caustic soda to sodium iodate",
  ["i2", "naoh"], ["naio3", "nai", "water"], -180.0,
  "Manufacture of food-grade and pharmaceutical iodates.");

add("cat-kbro3-kbr-titration-h2so4", "Bromate-bromide analytical generation of active bromine in sulfuric acid",
  ["kbro3", "kbr", "h2so4"], ["br2", "k2so4", "water"], -195.0,
  "In-situ volumetric generation of exact stoichiometric bromine for organic titrations.");

add("cat-nabro3-nabr-acid", "Sodium bromate and sodium bromide reaction in sulfuric acid",
  ["nabro3", "nabr", "h2so4"], ["br2", "na2so4", "water"], -190.0,
  "Industrial generation of bromine in chemical synthesis.");

add("cat-naio3-nai-acid", "Sodium iodate and sodium iodide reaction in sulfuric acid",
  ["naio3", "nai", "h2so4"], ["i2", "na2so4", "water"], -165.0,
  "Volumetric generation of iodine using sodium salts.");

add("cat-kbro3-kbr-titration-hno3", "Bromate-bromide reaction in nitric acid medium",
  ["kbro3", "kbr", "hno3"], ["br2", "kno3", "water"], -198.0,
  "Generation of bromine in nitric acid.");

add("cat-kio3-ki-titration-hno3", "Iodate-iodide reaction in nitric acid medium",
  ["kio3", "ki", "hno3"], ["i2", "kno3", "water"], -172.0,
  "Analytical liberation of iodine in nitric acid solution.");

add("cat-nabro3-nabr-hcl", "Sodium bromate and sodium bromide reaction in hydrochloric acid",
  ["nabro3", "nabr", "hcl"], ["br2", "nacl", "water"], -192.0,
  "Acid-catalyzed liberation of bromine.");

add("cat-naio3-nai-hcl", "Sodium iodate and sodium iodide reaction in hydrochloric acid",
  ["naio3", "nai", "hcl"], ["i2", "nacl", "water"], -168.0,
  "Acid-catalyzed liberation of iodine.");

add("cat-kio3-nai-hcl", "Cross-salt iodate-iodide reaction in hydrochloric acid",
  ["kio3", "nai", "hcl"], ["i2", "kcl", "nacl", "water"], -170.0,
  "Quantitative liberation of iodine from mixed alkali halides.");

add("cat-kbro3-nabr-hcl", "Cross-salt bromate-bromide reaction in hydrochloric acid",
  ["kbro3", "nabr", "hcl"], ["br2", "kcl", "nacl", "water"], -195.0,
  "Quantitative generation of bromine from mixed potassium/sodium salts.");

add("cat-kio3-nai-h2so4", "Cross-salt iodate-iodide reaction in sulfuric acid",
  ["kio3", "nai", "h2so4"], ["i2", "k2so4", "na2so4", "water"], -168.0,
  "Analytical standardization of iodate.");

add("cat-kbro3-nabr-h2so4", "Cross-salt bromate-bromide reaction in sulfuric acid",
  ["kbro3", "nabr", "h2so4"], ["br2", "k2so4", "na2so4", "water"], -194.0,
  "Analytical bromination reagent preparation.");

// Section 6: Chlorobenzene & Catalytic Oxychlorination (14)
add("cat-benzene-oxychlorination", "Raschig-Hooker process Step 1: oxychlorination of benzene to chlorobenzene",
  ["c6h6", "hcl", "o2"], ["chlorobenzene", "water"], -210.0,
  "Vapor-phase oxychlorination of benzene over CuCl2-FeCl3 catalyst at 240°C.");

add("cat-chlorobenzene-hydrolysis", "Raschig-Hooker process Step 2: steam catalytic hydrolysis of chlorobenzene to phenol",
  ["chlorobenzene", "water"], ["phenol", "hcl"], 15.0,
  "Vapor-phase catalytic hydrolysis over silica/copper phosphate catalyst at 450°C.");

add("cat-cucl-naoh-precipitation", "Precipitation of copper(I) oxide from cuprous chloride and sodium hydroxide",
  ["cucl", "naoh"], ["cu2o", "nacl", "water"], -62.0,
  "Alkaline precipitation producing red cuprous oxide and sodium chloride.");

add("cat-deacon-cucl-air-direct", "Aerial oxidation of copper(I) chloride in Deacon oxychlorination loop",
  ["cucl", "o2"], ["cucl2", "cuo"], -120.0,
  "Regeneration of active copper(II) center in Deacon cycle.");

add("cat-deacon-hbr-oxidation", "Catalytic oxidation of hydrogen bromide to elemental bromine",
  ["hbr", "o2"], ["br2", "water"], -135.0,
  "Bromine recovery from bromination process waste streams.");

add("cat-deacon-cucl-aqueous-air", "Aqueous aerial oxidation of cuprous chloride",
  ["cucl", "o2", "water"], ["cucl2", "cuoh2"], -145.0,
  "Aerial oxidation of copper(I) chloride in chloride leaching circuits.");

add("cat-no2-co-catalytic-reduction", "Automotive catalyst: reduction of nitrogen dioxide by carbon monoxide",
  ["no2", "co"], ["n2", "co2"], -750.0,
  "Catalytic reduction across noble metal washcoat.");

add("cat-n2o-co-catalytic-reduction", "Catalytic reduction of nitrous oxide by carbon monoxide",
  ["n2o", "co"], ["n2", "co2"], -360.0,
  "Exothermic DeNOx reaction over supported metal catalysts.");

add("cat-cucl2-h2-reduction", "Hydrogen reduction of copper(II) chloride",
  ["cucl2", "h2"], ["cu", "hcl"], -85.0,
  "Vapor-phase reduction depositing copper coating.");

add("cat-cucl-h2-reduction", "Hydrogen reduction of copper(I) chloride to pure copper",
  ["cucl", "h2"], ["cu", "hcl"], -65.0,
  "Gas-phase chemical reduction.");

add("cat-cu2o-co-reduction", "Carbon monoxide reduction of copper(I) oxide",
  ["cu2o", "co"], ["cu", "co2"], -110.0,
  "Exothermic reduction of cuprous oxide to metallic copper by carbon monoxide.");

add("cat-cu2o-h2-reduction", "Hydrogen reduction of copper(I) oxide",
  ["cu2o", "h2"], ["cu", "water"], -115.0,
  "Gas-phase reduction of cuprite.");

add("cat-coo-co-reduction", "Carbon monoxide reduction of cobalt(II) oxide to metallic cobalt catalyst",
  ["coo", "co"], ["cobalt-metal", "co2"], -90.0,
  "Gas-phase reduction activating cobalt Fischer-Tropsch catalyst precursor.");

add("cat-coo-h2-activation", "Hydrogen reduction of cobalt(II) oxide to Fischer-Tropsch cobalt catalyst",
  ["coo", "h2"], ["cobalt-metal", "water"], -115.0,
  "Activation of cobalt Fischer-Tropsch catalysts under hydrogen flow.");

// Section 7: Industrial Phosphorus Chemistry & Phosphoryl Halides (14)
add("cat-pcl3-oxygen-oxychloride", "Direct gas-phase oxidation of phosphorus trichloride to phosphoryl chloride",
  ["pcl3", "o2"], ["pocl3"], -285.0,
  "Industrial synthesis of POCl3 flame retardant and plasticizer precursor.");

add("cat-pocl3-naoh-neutralize", "Caustic soda neutralization of phosphoryl chloride",
  ["pocl3", "naoh"], ["na3po4", "nacl", "water"], -540.0,
  "Scrubber absorption of POCl3 in caustic soda.");

add("cat-pocl3-koh-neutralize", "Caustic potash neutralization of phosphorus oxychloride",
  ["pocl3", "koh"], ["k3po4", "kcl", "water"], -550.0,
  "Neutralization yielding potassium phosphate.");

add("cat-pcl5-naoh-neutralize", "Alkaline destruction of phosphorus pentachloride by caustic soda",
  ["pcl5", "naoh"], ["na3po4", "nacl", "water"], -680.0,
  "Vigorous scrubber neutralization of PCl5 fumes.");

add("cat-pcl5-koh-neutralize", "Caustic potash destruction of phosphorus pentachloride",
  ["pcl5", "koh"], ["k3po4", "kcl", "water"], -690.0,
  "Alkaline neutralization of PCl5.");

add("cat-p4-p4o10-combustion", "Thermal combustion of white phosphorus to phosphorus pentoxide",
  ["p4", "o2"], ["p4o10"], -2980.0,
  "Thermal phosphoric acid process: complete combustion of elemental phosphorus.");

add("cat-p4o10-naoh-neutralize", "Caustic soda neutralization of phosphorus pentoxide vapor",
  ["p4o10", "naoh"], ["na3po4", "water"], -850.0,
  "Exothermic scrubbing forming sodium phosphate.");

add("cat-p4o10-koh-neutralize", "Caustic potash neutralization of phosphorus pentoxide",
  ["p4o10", "koh"], ["k3po4", "water"], -860.0,
  "Formation of tripotassium phosphate.");

add("cat-p4o10-quicklime-calcination", "Thermal calcination of phosphorus pentoxide with quicklime",
  ["p4o10", "cao"], ["ca3po42"], -1150.0,
  "Direct dry synthesis of tricalcium phosphate ceramic precursor.");

add("cat-p4o10-limestone-sinter", "Thermal reaction of phosphorus pentoxide with calcium carbonate",
  ["p4o10", "caco3"], ["ca3po42", "co2"], -680.0,
  "Thermal synthesis of calcium phosphate fertilizer matrix.");

add("cat-p4o10-soda-ash-sinter", "Solid-state reaction of phosphorus pentoxide with soda ash",
  ["p4o10", "na2co3"], ["na3po4", "co2"], -540.0,
  "Dry thermal synthesis of sodium phosphate detergent builder.");

add("cat-p4o10-potash-sinter", "Solid-state reaction of phosphorus pentoxide with potassium carbonate",
  ["p4o10", "k2co3"], ["k3po4", "co2"], -550.0,
  "Thermal synthesis of potassium phosphate specialty fertilizer.");

add("cat-p4o10-magnesia-sinter", "Thermal reaction of phosphorus pentoxide with magnesium oxide",
  ["p4o10", "mgo"], ["mg3-po4-2"], -1080.0,
  "Synthesis of refractory magnesium phosphate matrix.");

add("cat-p4o10-baryta-sinter", "Thermal reaction of phosphorus pentoxide with barium oxide",
  ["p4o10", "bao"], ["ba3po42"], -1120.0,
  "Synthesis of barium phosphate optical glass constituent.");

console.log(`Domain 23 complete: ${list.length} reactions validated!`);

const targetFile = path.resolve(__dirname, "./domain23CatalysisInorganic.ts");
const code = `// Domain 23: Heterogeneous Catalysis & Industrial Inorganic (100 reactions)
import { addReaction } from "./generateBatch6.js";

export function buildDomain23CatalysisInorganic(): void {
  const reactions = ${JSON.stringify(list, null, 2)};

  for (const r of reactions) {
    addReaction({
      id: r.id,
      name: r.name,
      reactionType: (r.type || "synthesis") as any,
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
console.log(`✓ Wrote ${list.length} reactions to domain23CatalysisInorganic.ts`);
