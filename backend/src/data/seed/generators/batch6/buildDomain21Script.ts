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

function add(id: string, name: string, reactants: string[], products: string[], enthalpy: number, desc: string, type: string = "complexation", effects: any[] = []) {
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

// Section 1: Cobalt Ammine Complexes & Werner Chemistry (15)
add("coord-co-hexammine-synth", "Synthesis of hexaamminecobalt(III) chloride via peroxide oxidation",
  ["cocl2", "ammonia", "ammonium-chloride", "h2o2"], ["co-nh3-6-cl3", "water"], -310.0,
  "Air/peroxide oxidation of ammoniacal cobalt(II) yielding golden-orange Werner salt.", "redox_other",
  [{ type: "color_change", colorFrom: "#E86A82", colorTo: "#FFB347", description: "Pink solution converts to golden orange crystals" }]);

add("coord-co-purpureo-synth", "Synthesis of chloropentaamminecobalt(III) chloride (purpureo salt)",
  ["co-nh3-6-cl3", "hcl"], ["co-nh3-5-cl-cl2", "ammonium-chloride"], -45.0,
  "Acid-induced substitution of ammonia by chloride ligand forming purple crystals.", "complexation",
  [{ type: "color_change", colorFrom: "#FFB347", colorTo: "#800020", description: "Golden orange crystals convert to deep purple-red crystals" }]);

add("coord-co-nitro-synth", "Ligand substitution of chloropentaamminecobalt(III) with sodium nitrite",
  ["co-nh3-5-cl-cl2", "nano2"], ["co-nh3-5-no2-cl2", "nacl"], -28.0,
  "Metathesis generating the yellow-brown N-bonded nitro linkage isomer.", "complexation",
  [{ type: "color_change", colorFrom: "#800020", colorTo: "#DAA520", description: "Purple crystals convert to yellow-brown nitro complex" }]);

add("coord-co-nitro-kno2", "Synthesis of nitropentaamminecobalt(III) with potassium nitrite",
  ["co-nh3-5-cl-cl2", "kno2"], ["co-nh3-5-no2-cl2", "kcl"], -30.0,
  "Coordination substitution yielding the nitro linkage isomer.");

add("coord-co-hexammine-base-decomp", "Alkaline decomposition of hexaamminecobalt(III) by caustic soda",
  ["co-nh3-6-cl3", "naoh"], ["cooh3", "ammonia", "nacl"], -120.0,
  "Boiling caustic soda strips ammine ligands precipitating black-brown cobalt(III) hydroxide.");

add("coord-co-hexammine-koh-decomp", "Alkaline decomposition of hexaamminecobalt(III) by caustic potash",
  ["co-nh3-6-cl3", "koh"], ["cooh3", "ammonia", "kcl"], -125.0,
  "Potassium hydroxide hydrolysis of the cobalt hexammine coordination sphere.");

add("coord-co-purpureo-naoh", "Caustic soda hydrolysis of chloropentaamminecobalt(III)",
  ["co-nh3-5-cl-cl2", "naoh"], ["cooh3", "ammonia", "nacl"], -115.0,
  "Precipitation of cobalt(III) hydroxide with evolution of ammonia gas.");

add("coord-co-purpureo-koh", "Caustic potash hydrolysis of chloropentaamminecobalt(III)",
  ["co-nh3-5-cl-cl2", "koh"], ["cooh3", "ammonia", "kcl"], -118.0,
  "Hydroxide displacement of ammine and chloro ligands.");

add("coord-co-nitro-naoh", "Alkaline destruction of nitropentaamminecobalt(III) chloride",
  ["co-nh3-5-no2-cl2", "naoh"], ["cooh3", "ammonia", "nano2", "nacl"], -130.0,
  "Alkaline release of nitrite and ammonia yielding insoluble Co(OH)3.");

add("coord-co-nitro-koh", "Caustic potash decomposition of nitropentaamminecobalt(III)",
  ["co-nh3-5-no2-cl2", "koh"], ["cooh3", "ammonia", "kno2", "kcl"], -132.0,
  "Base-mediated destruction of nitropentaammine complex.");

add("coord-co-hexammine-h2so4", "Metathesis of hexaamminecobalt(III) chloride with sulfuric acid",
  ["co-nh3-6-cl3", "h2so4"], ["co-nh3-5-cl-cl2", "nh4-2-so4"], -65.0,
  "Acid displacement yielding purpureo complex and ammonium sulfate.");

add("coord-cobr2-kscn-vogel", "Formation of blue potassium tetrathiocyanatocobaltate(II) from cobalt bromide",
  ["cobr2", "kscn"], ["k2-co-scn-4", "kbr"], -40.0,
  "Deep blue complexation in amyl alcohol/acetone confirming cobalt(II).", "complexation",
  [{ type: "color_change", colorFrom: "#E86A82", colorTo: "#00008B", description: "Pink cobalt solution turns brilliant cobalt blue" }]);

add("coord-cobr2-kcl-tetrachloro", "Formation of potassium tetrachlorocobaltate(II) from cobalt(II) bromide",
  ["cobr2", "kcl"], ["k2-co-cl4", "kbr"], -24.0,
  "Octahedral pink to tetrahedral deep blue tetrachlorocobaltate conversion.", "complexation",
  [{ type: "color_change", colorFrom: "#E86A82", colorTo: "#0000FF", description: "Pink solution transforms to intense blue" }]);

add("coord-k2cocl4-agno3-metathesis", "Metathesis of potassium tetrachlorocobaltate(II) with silver nitrate",
  ["k2-co-cl4", "agno3"], ["agcl", "kno3", "co-no3-2"], -180.0,
  "Quantitative precipitation of silver chloride from chlorocobaltate complex.");

add("coord-k2coscn4-naoh-precipitation", "Caustic soda decomposition of potassium tetrathiocyanatocobaltate",
  ["k2-co-scn-4", "naoh"], ["cooh2", "kscn", "nascn"], -45.0,
  "Alkaline precipitation of pink-blue cobalt(II) hydroxide from thiocyanate complex.");

// Section 2: Copper Ammine & Halido Complexes (15)
add("coord-cucl2-ammonia-tetrammine", "Synthesis of tetraamminecopper(II) sulfate via copper chloride and ammonium sulfate",
  ["cucl2", "ammonia", "na2so4"], ["cu-nh3-4-so4", "nacl"], -95.0,
  "Ammonia coordination in presence of sulfate forming deep royal azure blue complex.", "complexation",
  [{ type: "color_change", colorFrom: "#4A90E2", colorTo: "#002366", description: "Light blue solution deepens into intense royal blue" }]);

add("coord-cu-tetrammine-acid-destruct", "Acidic destruction of tetraamminecopper(II) sulfate by sulfuric acid",
  ["cu-nh3-4-so4", "h2so4"], ["cuso4", "nh4-2-so4"], -145.0,
  "Protonation of ammine ligands restores pale blue copper(II) sulfate.");

add("coord-cu-tetrammine-hcl", "Acidification of tetraamminecopper(II) sulfate with hydrochloric acid",
  ["cu-nh3-4-so4", "hcl"], ["cucl2", "ammonium-chloride", "h2so4"], -150.0,
  "Complete decoordination yielding copper(II) chloride and ammonium salts.");

add("coord-cu-tetrammine-hno3", "Nitric acid decoordination of tetraamminecopper(II) sulfate",
  ["cu-nh3-4-so4", "hno3"], ["cuno32", "nh4no3", "h2so4"], -155.0,
  "Protonation of coordinated ammine ligands by nitric acid.");

add("coord-cu-tetrammine-naoh", "Caustic soda precipitation of copper(II) hydroxide from tetraammine complex",
  ["cu-nh3-4-so4", "naoh"], ["cuoh2", "na2so4", "ammonia"], -45.0,
  "Alkaline precipitation of light blue gelatinous copper hydroxide with release of ammonia.");

add("coord-cu-tetrammine-koh", "Caustic potash precipitation of copper hydroxide from tetraammine complex",
  ["cu-nh3-4-so4", "koh"], ["cuoh2", "k2so4", "ammonia"], -48.0,
  "Potassium hydroxide displacement of ammine coordination sphere.");

add("coord-cuno32-kcl-tetrachloro", "Formation of potassium tetrachlorocuprate(II) from copper(II) nitrate",
  ["cuno32", "kcl"], ["k2-cu-cl4", "kno3"], -20.0,
  "Chloride coordination converting aqua copper to yellow-green tetrachlorocuprate.", "complexation",
  [{ type: "color_change", colorFrom: "#4A90E2", colorTo: "#2E8B57", description: "Blue cupric solution turns olive/yellow-green" }]);

add("coord-k2cucl4-agno3-metathesis", "Metathesis of potassium tetrachlorocuprate with silver nitrate",
  ["k2-cu-cl4", "agno3"], ["agcl", "kno3", "cuno32"], -195.0,
  "Complete precipitation of coordinated chloride ligands as curdy silver chloride.");

add("coord-k2cucl4-naoh", "Precipitation of copper hydroxide from potassium tetrachlorocuprate",
  ["k2-cu-cl4", "naoh"], ["cuoh2", "nacl", "kcl"], -55.0,
  "Caustic precipitation of gelatinous copper(II) hydroxide.");

add("coord-k2cucl4-koh", "Precipitation of copper hydroxide from tetrachlorocuprate by caustic potash",
  ["k2-cu-cl4", "koh"], ["cuoh2", "kcl"], -58.0,
  "Quantitative hydroxide precipitation of copper.");

add("coord-cu-tetrammine-h2s", "Sulfide precipitation of copper(II) sulfide from tetraammine complex",
  ["cu-nh3-4-so4", "h2s"], ["cus", "nh4-2-so4", "ammonia"], -130.0,
  "Hydrogen sulfide displacement precipitating insoluble black cupric sulfide.");

add("coord-cu-tetrammine-na2s", "Sodium sulfide precipitation of copper sulfide from tetraammine complex",
  ["cu-nh3-4-so4", "na2s"], ["cus", "na2so4", "ammonia"], -140.0,
  "Precipitation of black copper sulfide from ammoniacal solution.");

add("coord-cu-tetrammine-k2s", "Potassium sulfide precipitation of copper sulfide from tetraammine complex",
  ["cu-nh3-4-so4", "k2s"], ["cus", "k2so4", "ammonia"], -142.0,
  "Sulfide attack displacing ammine ligands to precipitate black CuS.");

add("coord-k2cucl4-na2s", "Sodium sulfide precipitation of copper(II) sulfide from tetrachlorocuprate",
  ["k2-cu-cl4", "na2s"], ["cus", "nacl", "kcl"], -160.0,
  "Precipitation of dense black copper sulfide from chlorocuprate matrix.");

add("coord-k2cucl4-k2s", "Potassium sulfide precipitation of copper sulfide from tetrachlorocuprate",
  ["k2-cu-cl4", "k2s"], ["cus", "kcl"], -162.0,
  "Rapid precipitation of insoluble black cupric sulfide.");

// Section 3: Nickel Coordination Chemistry (15)
add("coord-niso4-ammonia-hexammine", "Synthesis of hexaamminenickel(II) chloride via nickel sulfate and ammonium chloride",
  ["niso4", "ammonia", "ammonium-chloride"], ["ni-nh3-6-cl2", "nh4-2-so4"], -95.0,
  "Ammonia coordination in presence of ammonium chloride forming violet hexaammine crystals.", "complexation",
  [{ type: "color_change", colorFrom: "#2E8B57", colorTo: "#7B68EE", description: "Emerald green solution turns deep violet" }]);

add("coord-ni-hexammine-hno3-destruct", "Nitric acid decoordination of hexaamminenickel(II) chloride",
  ["ni-nh3-6-cl2", "hno3"], ["nicl2", "nh4no3"], -150.0,
  "Acid-induced removal of ammine ligands restoring green nickel(II) salt.");

add("coord-ni-hexammine-h2so4", "Acidic decomposition of hexaamminenickel(II) by sulfuric acid",
  ["ni-nh3-6-cl2", "h2so4"], ["niso4", "nh4-2-so4", "hcl"], -170.0,
  "Sulfuric acid destruction of the ammine coordination shell.");

add("coord-ni-hexammine-naoh", "Caustic soda precipitation of nickel(II) hydroxide from ammine complex",
  ["ni-nh3-6-cl2", "naoh"], ["nioh2", "nacl", "ammonia"], -50.0,
  "Precipitation of apple-green nickel hydroxide with release of gaseous ammonia.");

add("coord-ni-hexammine-koh", "Caustic potash precipitation of nickel(II) hydroxide from ammine complex",
  ["ni-nh3-6-cl2", "koh"], ["nioh2", "kcl", "ammonia"], -52.0,
  "Hydroxide displacement of coordinated ammines.");

add("coord-nino32-kcn-tetracyano", "Synthesis of potassium tetracyanonickelate(II) from nickel nitrate",
  ["ni-no3-2", "kcn"], ["k2-ni-cn-4", "kno3"], -115.0,
  "Cyanide substitution forming yellow-orange square planar [Ni(CN)4]2-.", "complexation",
  [{ type: "color_change", colorFrom: "#2E8B57", colorTo: "#FFA500", description: "Green nickel solution forms orange tetracyanonickelate" }]);

add("coord-k2nicn4-hcl", "Acid decomposition of potassium tetracyanonickelate(II) by hydrochloric acid",
  ["k2-ni-cn-4", "hcl"], ["nicl2", "kcl", "hcn"], -75.0,
  "Acidification of tetracyanonickelate liberating hazardous hydrogen cyanide gas.");

add("coord-k2nicn4-h2so4", "Sulfuric acid decomposition of potassium tetracyanonickelate(II)",
  ["k2-ni-cn-4", "h2so4"], ["niso4", "k2so4", "hcn"], -80.0,
  "Acid hydrolysis of tetracyanonickelate complex.");

add("coord-ni-hexammine-na2s", "Sodium sulfide precipitation of nickel sulfide from hexaammine complex",
  ["ni-nh3-6-cl2", "na2s"], ["nis", "nacl", "ammonia"], -135.0,
  "Precipitation of dense black nickel(II) sulfide from ammoniacal medium.");

add("coord-ni-hexammine-k2s", "Potassium sulfide precipitation of nickel sulfide from hexaammine complex",
  ["ni-nh3-6-cl2", "k2s"], ["nis", "kcl", "ammonia"], -138.0,
  "Sulfide attack forming black insoluble NiS.");

add("coord-ni-en-synth", "Synthesis of tris(ethylenediamine)nickel(II) chloride chelate",
  ["nicl2", "ethylenediamine"], ["ni-en-3-cl2"], -140.0,
  "Thermodynamic chelate effect: bidentate ethylenediamine displaces monodentate ligands to form violet complex.", "complexation",
  [{ type: "color_change", colorFrom: "#2E8B57", colorTo: "#9370DB", description: "Green solution converts to rich violet tris-chelate" }]);

add("coord-ni-en-na2s", "Sulfide precipitation of nickel sulfide from tris(ethylenediamine) chelate",
  ["ni-en-3-cl2", "na2s"], ["nis", "nacl", "ethylenediamine"], -110.0,
  "Precipitation of black nickel sulfide with liberation of free ethylenediamine.");

add("coord-ni-en-k2s", "Potassium sulfide precipitation of nickel sulfide from tris(ethylenediamine) chelate",
  ["ni-en-3-cl2", "k2s"], ["nis", "kcl", "ethylenediamine"], -112.0,
  "Sulfide displacement of bidentate ethylenediamine chelates.");

add("coord-ni-en-naoh", "Caustic soda precipitation of nickel hydroxide from tris(ethylenediamine) chelate",
  ["ni-en-3-cl2", "naoh"], ["nioh2", "nacl", "ethylenediamine"], -35.0,
  "Alkaline precipitation of apple-green Ni(OH)2.");

add("coord-ni-en-koh", "Caustic potash precipitation of nickel hydroxide from tris(ethylenediamine) complex",
  ["ni-en-3-cl2", "koh"], ["nioh2", "kcl", "ethylenediamine"], -38.0,
  "Hydroxide displacement of ethylenediamine ligands from nickel.");

// Section 4: Ethylenediamine & Zinc Coordination Chemistry (15)
add("coord-cu-en-synth", "Synthesis of bis(ethylenediamine)copper(II) sulfate chelate",
  ["cuso4", "ethylenediamine"], ["cu-en-2-so4"], -125.0,
  "Chelation of copper(II) by bidentate ethylenediamine forming deep royal blue square planar complex.", "complexation",
  [{ type: "color_change", colorFrom: "#4A90E2", colorTo: "#4169E1", description: "Light blue solution deepens to royal blue chelate" }]);

add("coord-cu-en-naoh", "Caustic soda precipitation of copper hydroxide from bis(ethylenediamine) chelate",
  ["cu-en-2-so4", "naoh"], ["cuoh2", "na2so4", "ethylenediamine"], -40.0,
  "Precipitation of gelatinous copper(II) hydroxide from stable chelate.");

add("coord-cu-en-koh", "Caustic potash precipitation of copper hydroxide from bis(ethylenediamine) chelate",
  ["cu-en-2-so4", "koh"], ["cuoh2", "k2so4", "ethylenediamine"], -42.0,
  "Potassium hydroxide displacement of ethylenediamine ligands.");

add("coord-cu-en-na2s", "Sodium sulfide precipitation of copper sulfide from bis(ethylenediamine) chelate",
  ["cu-en-2-so4", "na2s"], ["cus", "na2so4", "ethylenediamine"], -150.0,
  "Sulfide precipitation of black copper(II) sulfide from bis-chelate.");

add("coord-cu-en-k2s", "Potassium sulfide precipitation of copper sulfide from bis(ethylenediamine) chelate",
  ["cu-en-2-so4", "k2s"], ["cus", "k2so4", "ethylenediamine"], -152.0,
  "Displacement of ethylenediamine chelates by sulfide anions.");

add("coord-cu-en-h2s", "Hydrogen sulfide precipitation of copper sulfide from bis(ethylenediamine) chelate",
  ["cu-en-2-so4", "h2s"], ["cus", "h2so4", "ethylenediamine"], -135.0,
  "Acid sulfide displacement precipitating black CuS.");

add("coord-zncl2-ammonia-tetrammine", "Synthesis of tetraamminezinc(II) sulfate from zinc chloride",
  ["zncl2", "ammonia", "na2so4"], ["zn-nh3-4-so4", "nacl"], -85.0,
  "Formation of clear colorless tetraammine complex from zinc chloride.", "complexation");

add("coord-zn-tetrammine-hno3-destruct", "Nitric acid decoordination of tetraamminezinc(II) sulfate",
  ["zn-nh3-4-so4", "hno3"], ["zn-no3-2", "nh4no3", "h2so4"], -145.0,
  "Protonation of ammine ligands restoring simple zinc salts.");

add("coord-zn-tetrammine-hcl", "Hydrochloric acid decoordination of tetraamminezinc(II) sulfate",
  ["zn-nh3-4-so4", "hcl"], ["zncl2", "ammonium-chloride", "h2so4"], -145.0,
  "Decoordination yielding zinc chloride and ammonium salts.");

add("coord-zn-tetrammine-naoh", "Caustic soda precipitation of zinc hydroxide from tetraammine complex",
  ["zn-nh3-4-so4", "naoh"], ["znoh2", "na2so4", "ammonia"], -32.0,
  "Precipitation of white gelatinous zinc hydroxide with release of ammonia.");

add("coord-zn-tetrammine-koh", "Caustic potash precipitation of zinc hydroxide from tetraammine complex",
  ["zn-nh3-4-so4", "koh"], ["znoh2", "k2so4", "ammonia"], -34.0,
  "Potassium hydroxide displacement of ammine coordination sphere.");

add("coord-zn-tetrammine-na2s", "Sodium sulfide precipitation of zinc sulfide from tetraammine complex",
  ["zn-nh3-4-so4", "na2s"], ["zns", "na2so4", "ammonia"], -130.0,
  "Precipitation of characteristic white zinc sulfide from ammoniacal medium.", "precipitation",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "White zinc sulfide precipitates" }]);

add("coord-zn-tetrammine-k2s", "Potassium sulfide precipitation of zinc sulfide from tetraammine complex",
  ["zn-nh3-4-so4", "k2s"], ["zns", "k2so4", "ammonia"], -132.0,
  "Precipitation of insoluble white zinc sulfide.");

add("coord-zn-tetrammine-h2s", "Hydrogen sulfide precipitation of zinc sulfide from tetraammine complex",
  ["zn-nh3-4-so4", "h2s"], ["zns", "nh4-2-so4", "ammonia"], -120.0,
  "Sulfide gas precipitation of white zinc sulfide.");

add("coord-k2nicn4-agno3", "Precipitation of silver cyanide from potassium tetracyanonickelate",
  ["k2-ni-cn-4", "agno3"], ["k-ag-cn-2", "ni-no3-2"], -120.0,
  "Metathesis transferring cyano ligands to form stable dicyanoargentate(I).");

// Section 5: Silver Ammine & Tollens Reagents (15)
add("coord-ag2o-ammonia-cl-synth", "Synthesis of diamminesilver(I) chloride from silver oxide",
  ["ag2o", "ammonia", "ammonium-chloride"], ["ag-nh3-2-cl", "water"], -65.0,
  "Dissolution of brown silver oxide in ammoniacal ammonium chloride.", "complexation");

add("coord-ag-ammine-cl-h2so4", "Reprecipitation of silver chloride from diamminesilver(I) by sulfuric acid",
  ["ag-nh3-2-cl", "h2so4"], ["agcl", "nh4-2-so4"], -70.0,
  "Diagnostic confirmation: acid destroys ammine complex reprecipitating white AgCl.", "precipitation",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Curdy white AgCl precipitates upon acidification" }]);

add("coord-ag-ammine-cl-hcl", "Reprecipitation of silver chloride by hydrochloric acid",
  ["ag-nh3-2-cl", "hcl"], ["agcl", "ammonium-chloride"], -68.0,
  "Acidification destroying diamminesilver(I) coordination.");

add("coord-ag-ammine-cl-kbr", "Metathesis of diamminesilver(I) chloride with potassium bromide",
  ["ag-nh3-2-cl", "kbr"], ["agbr", "kcl", "ammonia"], -45.0,
  "Precipitation of cream-colored silver bromide due to lower solubility product.");

add("coord-ag-ammine-cl-nabr", "Precipitation of silver bromide from diamminesilver(I) chloride by sodium bromide",
  ["ag-nh3-2-cl", "nabr"], ["agbr", "nacl", "ammonia"], -44.0,
  "Slightly insoluble silver bromide precipitates from ammoniacal solution.");

add("coord-ag-ammine-cl-ki", "Metathesis of diamminesilver(I) chloride with potassium iodide",
  ["ag-nh3-2-cl", "ki"], ["agi", "kcl", "ammonia"], -75.0,
  "Precipitation of pale yellow silver iodide due to extreme insolubility of AgI.");

add("coord-ag-ammine-cl-nai", "Precipitation of silver iodide from diamminesilver(I) chloride by sodium iodide",
  ["ag-nh3-2-cl", "nai"], ["agi", "nacl", "ammonia"], -74.0,
  "Yellow silver iodide precipitation from diamminesilver complex.");

add("coord-ag2o-ammonia-no3-synth", "Synthesis of Tollens' reagent diamminesilver(I) nitrate from silver oxide",
  ["ag2o", "ammonia", "nh4no3"], ["ag-nh3-2-no3", "water"], -68.0,
  "Formation of clear diamminesilver(I) reagent for aldehyde detection.", "complexation");

add("coord-ag-ammine-no3-h2so4", "Sulfuric acid acidification of diamminesilver(I) nitrate",
  ["ag-nh3-2-no3", "h2so4"], ["agno3", "nh4-2-so4"], -65.0,
  "Decoordination of Tollens' reagent by dilute sulfuric acid.");

add("coord-ag-ammine-no3-hcl", "Precipitation of silver chloride from Tollens' reagent by hydrochloric acid",
  ["ag-nh3-2-no3", "hcl"], ["agcl", "nh4no3", "ammonium-chloride"], -110.0,
  "Acid destruction of Tollens' reagent precipitating curdy white silver chloride.");

add("coord-ag-ammine-no3-kbr", "Precipitation of cream silver bromide from Tollens' reagent by potassium bromide",
  ["ag-nh3-2-no3", "kbr"], ["agbr", "kno3", "ammonia"], -48.0,
  "Precipitation of insoluble silver bromide.");

add("coord-ag-ammine-no3-nabr", "Precipitation of silver bromide from Tollens' reagent by sodium bromide",
  ["ag-nh3-2-no3", "nabr"], ["agbr", "nano3", "ammonia"], -47.0,
  "Metathesis forming pale cream silver bromide.");

add("coord-ag-ammine-no3-ki", "Precipitation of canary yellow silver iodide from Tollens' reagent by potassium iodide",
  ["ag-nh3-2-no3", "ki"], ["agi", "kno3", "ammonia"], -78.0,
  "Immediate precipitation of insoluble yellow silver iodide.");

add("coord-ag-ammine-no3-nai", "Precipitation of silver iodide from Tollens' reagent by sodium iodide",
  ["ag-nh3-2-no3", "nai"], ["agi", "nano3", "ammonia"], -77.0,
  "Quantitative precipitation of yellow silver iodide.");

add("coord-ag-ammine-cl-na2s", "Sulfide precipitation of silver sulfide from diamminesilver(I) chloride",
  ["ag-nh3-2-cl", "na2s"], ["ag2s", "nacl", "ammonia"], -165.0,
  "Formation of extremely insoluble black silver sulfide.");

// Section 6: Iron Cyano & Thiocyanate Complexes (15)
add("coord-feno33-kcl-tetrachloro", "Formation of potassium tetrachloroferrate(III) complex from ferric nitrate",
  ["fe-no3-3", "kcl"], ["k-fe-cl4", "kno3"], -22.0,
  "Coordination of chloride to ferric iron forming yellow-amber tetrachloroferrate.", "complexation");

add("coord-kfecl4-agno3-metathesis", "Metathesis of potassium tetrachloroferrate(III) with silver nitrate",
  ["k-fe-cl4", "agno3"], ["agcl", "kno3", "fe-no3-3"], -210.0,
  "Quantitative precipitation of silver chloride from tetrachloroferrate.");

add("coord-feno33-nascn-hexathiocyanato", "Formation of iron(III) thiocyanate complex from ferric nitrate and sodium thiocyanate",
  ["fe-no3-3", "nascn"], ["fe-scn-3", "nano3"], -80.0,
  "Sensitive qualitative test for iron(III): formation of intensely blood-red coordination complex.", "complexation",
  [{ type: "color_change", colorFrom: "#DAA520", colorTo: "#8B0000", description: "Yellow-brown ferric solution turns intensely deep blood red" }]);

add("coord-fecl3-nascn-thiocyanato", "Blood-red iron(III) thiocyanate complexation with sodium thiocyanate",
  ["fecl3", "nascn"], ["fe-scn-3", "nacl"], -60.0,
  "Sensitive analytical colorimetric detection of ferric ions with sodium thiocyanate.", "complexation",
  [{ type: "color_change", colorFrom: "#DAA520", colorTo: "#800000", description: "Ferric solution transforms into vivid dark red complex" }]);

add("coord-fecl3-nh4scn-thiocyanato", "Iron(III) thiocyanate formation with ammonium thiocyanate",
  ["fecl3", "nh4scn"], ["fe-scn-3", "ammonium-chloride"], -62.0,
  "Blood-red coordination complex formation with ammonium thiocyanate.");

add("coord-k4fecn6-cl2-oxidation", "Industrial oxidation of potassium ferrocyanide to ferricyanide by chlorine gas",
  ["k4-fe-cn-6", "cl2"], ["k3-fe-cn-6", "kcl"], -115.0,
  "Chlorine gas oxidation of yellow ferrocyanide to deep ruby-red potassium ferricyanide.", "redox_other",
  [{ type: "color_change", colorFrom: "#FFFF00", colorTo: "#DC143C", description: "Yellow solution converts to intense red-orange ferricyanide" }]);

add("coord-k4fecn6-h2o2-oxidation", "Peroxide oxidation of potassium ferrocyanide in acidic medium",
  ["k4-fe-cn-6", "h2o2", "hcl"], ["k3-fe-cn-6", "kcl", "water"], -170.0,
  "Controlled one-electron oxidation of hexacyanoferrate(II) to hexacyanoferrate(III).");

add("coord-k3fecn6-h2o2-koh-reduction", "Alkaline hydrogen peroxide reduction of potassium ferricyanide",
  ["k3-fe-cn-6", "h2o2", "koh"], ["k4-fe-cn-6", "o2", "water"], -140.0,
  "Thermodynamic reversal in alkaline medium: peroxide reduces ferricyanide with effervescence of oxygen gas.");

add("coord-k3fecn6-ki-reduction", "Reduction of potassium ferricyanide by potassium iodide",
  ["k3-fe-cn-6", "ki"], ["k4-fe-cn-6", "i2"], -65.0,
  "Iodometric reduction of ferricyanide liberating molecular iodine.");

add("coord-k4fecn6-h2so4-decomp", "Destructive thermal acid decomposition of potassium ferrocyanide",
  ["k4-fe-cn-6", "h2so4", "water"], ["k2so4", "feso4", "nh4-2-so4", "co"], -240.0,
  "Boiling concentrated sulfuric acid hydrolyzes cyano ligands liberating carbon monoxide gas.", "decomposition");

add("coord-k3fecn6-h2so4-decomp", "Destructive thermal acid decomposition of potassium ferricyanide",
  ["k3-fe-cn-6", "h2so4", "water"], ["k2so4", "fe2-so4-3", "nh4-2-so4", "co"], -260.0,
  "Sulfuric acid hydrolysis yielding ferric sulfate, ammonium sulfate, and carbon monoxide.");

add("coord-k3fecn6-naoh-decomp", "Caustic soda decomposition of potassium ferricyanide",
  ["k3-fe-cn-6", "naoh"], ["feoh3", "kcn", "nacn"], -85.0,
  "Alkaline destruction precipitating rust-brown iron(III) hydroxide.");

add("coord-k3fecn6-koh-decomp", "Caustic potash decomposition of potassium ferricyanide",
  ["k3-fe-cn-6", "koh"], ["feoh3", "kcn"], -88.0,
  "Precipitation of ferric hydroxide by hot potassium hydroxide.");

add("coord-k4fecn6-naoh-decomp", "Caustic soda decomposition of potassium ferrocyanide",
  ["k4-fe-cn-6", "naoh"], ["feoh2", "kcn", "nacn"], -75.0,
  "Alkaline precipitation of greenish-white iron(II) hydroxide.");

add("coord-fe-scn3-naoh", "Caustic soda destruction of blood-red iron(III) thiocyanate",
  ["fe-scn-3", "naoh"], ["feoh3", "nascn"], -90.0,
  "Hydroxide ion displaces thiocyanate ligands, precipitating reddish-brown ferric hydroxide.");

// Section 7: Metal Carbonyls & Amphoteric Hydroxo Complexes (15)
add("coord-carb-fe-co5-synth", "Synthesis of iron pentacarbonyl from finely divided iron and carbon monoxide",
  ["fe", "co"], ["fe-co-5"], -220.0,
  "Direct thermal carbonylation under pressure (200°C, 200 bar) forming volatile amber liquid.", "synthesis");

add("coord-carb-ni-co4-mond-synth", "Mond process: synthesis of nickel tetracarbonyl at moderate temperature",
  ["ni", "co"], ["ni-co-4"], -160.0,
  "Volatilization of nickel at 50°C into nickel tetracarbonyl gas for refining.", "synthesis");

add("coord-carb-ni-co4-mond-decomp", "Mond process: thermal decomposition of nickel tetracarbonyl to pure nickel",
  ["ni-co-4"], ["ni", "co"], 160.0,
  "Thermal cracking of volatile nickel carbonyl at 230°C depositing 99.99% ultra-pure nickel pellets.", "decomposition");

add("coord-carb-cr-co6-synth", "Synthesis of chromium hexacarbonyl",
  ["cr", "co"], ["cr-co-6"], -250.0,
  "Reductive carbonylation forming sublimable white octahedral chromium carbonyl.", "synthesis");

add("coord-carb-mo-co6-synth", "Synthesis of molybdenum hexacarbonyl",
  ["mo", "co"], ["mo-co-6"], -270.0,
  "High-pressure carbonylation yielding air-stable white crystalline molybdenum hexacarbonyl.", "synthesis");

add("coord-carb-w-co6-synth", "Synthesis of tungsten hexacarbonyl",
  ["w", "co"], ["w-co-6"], -280.0,
  "Reductive carbonylation yielding volatile solid tungsten hexacarbonyl CVD precursor.", "synthesis");

add("coord-al2o3-naoh-amphoteric", "Amphoteric dissolution of aluminum oxide in caustic soda",
  ["al2o3", "naoh", "water"], ["na-al-oh-4"], -80.0,
  "Caustic digestion of bauxite alumina yielding sodium tetrahydroxoaluminate.", "complexation");

add("coord-al-oh-amphoteric-koh", "Amphoteric dissolution of aluminum hydroxide in caustic potash",
  ["al-oh-3", "koh"], ["k-alo2", "water"], -32.0,
  "Potassium hydroxide dissolution forming potassium aluminate.");

add("coord-na-al-oh4-h2so4-neutralize", "Controlled sulfuric acid precipitation of aluminum hydroxide from aluminate",
  ["na-al-oh-4", "h2so4"], ["al-oh-3", "na2so4", "water"], -64.0,
  "Careful neutralization reprecipitating white gelatinous aluminum hydroxide.", "precipitation",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Gelatinous white aluminum hydroxide precipitates" }]);

add("coord-na-al-oh4-co2-bayer", "Bayer process carbonation: precipitation of pure gibbsite by carbon dioxide",
  ["na-al-oh-4", "co2"], ["al-oh-3", "nahco3"], -45.0,
  "Industrial carbonation of pregnant aluminate liquor precipitating high-purity Al(OH)3.");

add("coord-zno-naoh-amphoteric", "Amphoteric dissolution of zinc oxide in caustic soda forming tetrahydroxozincate",
  ["zno", "naoh", "water"], ["na2-zn-oh-4"], -42.0,
  "Excess caustic soda dissolves zinc oxide into clear soluble sodium tetrahydroxozincate.", "complexation");

add("coord-na2-zn-oh4-h2so4-neutralize", "Sulfuric acid precipitation of zinc hydroxide from tetrahydroxozincate complex",
  ["na2-zn-oh-4", "h2so4"], ["znoh2", "na2so4", "water"], -70.0,
  "Equimolar neutralization reprecipitating white gelatinous zinc hydroxide.", "precipitation",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "White zinc hydroxide precipitates" }]);

add("coord-pbo-naoh-amphoteric", "Amphoteric dissolution of lead(II) oxide in caustic soda",
  ["pbo", "naoh", "water"], ["na2-pb-oh-4"], -36.0,
  "Formation of soluble plumbite / tetrahydroxoplumbate(II) coordination complex.", "complexation");

add("coord-na2-pb-oh4-hno3-neutralize", "Controlled nitric acid neutralization of plumbite complex reprecipitating lead(II) hydroxide",
  ["na2-pb-oh-4", "hno3"], ["pb-oh-2", "nano3", "water"], -60.0,
  "Neutralization regenerating white lead(II) hydroxide precipitate.");

add("coord-sno-naoh-amphoteric", "Amphoteric dissolution of tin(II) oxide forming sodium trihydroxostannate(II)",
  ["sno", "naoh", "water"], ["na-sn-oh-3"], -38.0,
  "Dissolution of tin(II) oxide into alkaline stannite reducing agent.", "complexation");

console.log(`Domain 21 complete: ${list.length} reactions validated!`);

const targetFile = path.resolve(__dirname, "./domain21Coordination.ts");
const code = `// Domain 21: Coordination Chemistry & Complexes (105 reactions)
import { addReaction } from "./generateBatch6.js";

export function buildDomain21Coordination(): void {
  const reactions = ${JSON.stringify(list, null, 2)};

  for (const r of reactions) {
    addReaction({
      id: r.id,
      name: r.name,
      reactionType: (r.type || "complexation") as any,
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
console.log(`✓ Wrote ${list.length} reactions to domain21Coordination.ts`);
