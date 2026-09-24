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
  type: string = "redox_other",
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
// Section 1: Copper Acetate Paddlewheel MOF Precursor & Metathesis (20)
// =========================================================================
add("mof-cu-paddlewheel-cu-h2o2-synth", "Oxidative synthesis of copper acetate paddlewheel from copper metal and hydrogen peroxide",
  ["ch3cooh", "cu", "h2o2"], ["c8h12cu2o8", "water"], -320.0,
  "Oxidative dissolution of copper wire in glacial acetic acid with hydrogen peroxide.", "synthesis");

add("mof-cu-paddlewheel-cu2o-synth", "Oxidative synthesis of copper(II) acetate paddlewheel from cuprous oxide",
  ["ch3cooh", "cu2o", "o2"], ["c8h12cu2o8", "water"], -280.0,
  "Oxidative dissolution of cuprous oxide into paddlewheel dimer.", "synthesis");

add("mof-cu-paddlewheel-cuco3-synth", "Carbonate route synthesis of copper(II) acetate paddlewheel",
  ["ch3cooh", "cuco3"], ["c8h12cu2o8", "co2", "water"], -85.0,
  "Acid metathesis liberating carbon dioxide.", "gas_evolution");

add("mof-cu-paddlewheel-cleavage-hcl", "Acid cleavage of copper acetate paddlewheel by hydrochloric acid",
  ["c8h12cu2o8", "hcl"], ["cucl2", "ch3cooh"], -45.0,
  "Proton-driven disassembly of binuclear paddlewheel cluster.");

add("mof-cu-paddlewheel-cleavage-h2so4", "Sulfuric acid cleavage of copper acetate paddlewheel",
  ["c8h12cu2o8", "h2so4"], ["cuso4", "ch3cooh"], -50.0,
  "Disassembly yielding copper sulfate and acetic acid.");

add("mof-cu-paddlewheel-cleavage-hno3", "Nitric acid cleavage of paddlewheel dimer to copper(II) nitrate",
  ["c8h12cu2o8", "hno3"], ["cu-no3-2", "ch3cooh"], -42.0,
  "Acid metathesis producing cupric nitrate solution.");

add("mof-cu-paddlewheel-caustic-naoh", "Caustic soda decomposition of copper paddlewheel complex",
  ["c8h12cu2o8", "naoh"], ["cuoh2", "ch3coona"], -75.0,
  "Alkaline precipitation isolating blue copper(II) hydroxide.", "precipitation");

add("mof-cu-paddlewheel-caustic-koh", "Potassium hydroxide decomposition of copper paddlewheel",
  ["c8h12cu2o8", "koh"], ["cuoh2", "ch3cook"], -78.0,
  "Alkaline precipitation yielding copper hydroxide.", "precipitation");

add("mof-cu-paddlewheel-sulfidation-na2s", "Sulfidation of copper paddlewheel dimer by sodium sulfide",
  ["c8h12cu2o8", "na2s"], ["cus", "ch3coona"], -165.0,
  "Quantitative precipitation of black covellite CuS.", "precipitation");

add("mof-cu-paddlewheel-sulfidation-h2s", "Hydrogen sulfide precipitation of copper paddlewheel",
  ["c8h12cu2o8", "h2s"], ["cus", "ch3cooh"], -155.0,
  "Precipitation of black copper sulfide.", "precipitation");

add("mof-cu-paddlewheel-reduction-h2", "Hydrogen gas reduction of copper paddlewheel to metallic copper",
  ["c8h12cu2o8", "h2"], ["cu", "ch3cooh"], -140.0,
  "Heterogeneous gas-phase reduction depositing copper metal film.");

add("mof-cu-paddlewheel-reduction-co", "Carbon monoxide reduction of copper paddlewheel dimer",
  ["c8h12cu2o8", "co", "water"], ["cu", "co2", "ch3cooh"], -190.0,
  "Reductive carbonylation forming metallic copper.");

add("mof-cu-paddlewheel-cementation-fe", "Iron metal cementation of copper from paddlewheel solution",
  ["c8h12cu2o8", "fe"], ["cu", "ch3coo-2-fe"], -185.0,
  "Redox displacement depositing spongy copper powder.");

add("mof-cu-paddlewheel-cementation-zn", "Zinc metal displacement of copper from paddlewheel complex",
  ["c8h12cu2o8", "zn"], ["cu", "ch3coo-2-zn"], -220.0,
  "Exothermic metal displacement.");

add("mof-cu-paddlewheel-cementation-mg", "Magnesium reduction of copper acetate paddlewheel",
  ["c8h12cu2o8", "mg"], ["cu", "ch3coo-2-mg"], -310.0,
  "Vigorous exothermic metal displacement.");

add("mof-cu-paddlewheel-combustion", "Thermal combustion of copper acetate paddlewheel precursor",
  ["c8h12cu2o8", "o2"], ["cuo", "co2", "water"], -3450.0,
  "Oxidative calcination yielding copper(II) oxide powder.", "combustion");

add("mof-cu-paddlewheel-pyrolysis-cu", "Inert thermal pyrolysis of copper paddlewheel producing copper metal",
  ["c8h12cu2o8"], ["cu", "co", "h2"], 120.0,
  "Vacuum pyrolysis generating metallic copper film and syngas.", "decomposition");

add("mof-cu-paddlewheel-nabh4-reduction", "Sodium borohydride reduction of copper paddlewheel to Cu nanoparticles",
  ["c8h12cu2o8", "nabh4", "water"], ["cu", "h3bo3", "ch3coona", "h2"], -480.0,
  "Chemical reduction synthesizing colloidal copper nanoparticles.");

add("mof-cu-paddlewheel-methanol-reduction", "Methanol solvothermal reduction of copper paddlewheel",
  ["c8h12cu2o8", "ch3oh"], ["cu", "hcho", "ch3cooh"], -95.0,
  "Alcohol reduction in solvothermal MOF synthesis.");

add("mof-cu-paddlewheel-oxalate-metathesis", "Oxalate metathesis: conversion of paddlewheel to insoluble copper oxalate",
  ["c8h12cu2o8", "h2c2o4"], ["cuc2o4", "ch3cooh"], -35.0,
  "Ligand exchange precipitating pale blue copper oxalate.", "precipitation");

// =========================================================================
// Section 2: Phthalocyanine & Metallophthalocyanine Macrocycles (15)
// =========================================================================
add("mof-pc-copper-chloride-synth", "Synthesis of copper phthalocyanine pigment from metal-free Pc and CuCl2",
  ["c32h18n8_pc", "cucl2"], ["c32h16cu_n8_cupc", "hcl"], -140.0,
  "Template coordination forming brilliant cyan blue pigment Phthalo Blue (Pigment Blue 15).", "synthesis");

add("mof-pc-copper-sulfate-synth", "Synthesis of copper phthalocyanine from copper(II) sulfate",
  ["c32h18n8_pc", "cuso4"], ["c32h16cu_n8_cupc", "h2so4"], -145.0,
  "Coordination inserting copper into the central cavity.", "synthesis");

add("mof-pc-copper-nitrate-synth", "Copper nitrate insertion into phthalocyanine macrocycle",
  ["c32h18n8_pc", "cu-no3-2"], ["c32h16cu_n8_cupc", "hno3"], -135.0,
  "Synthesis of copper phthalocyanine complex.", "synthesis");

add("mof-pc-paddlewheel-cu-synth", "Paddlewheel dimer transmetallation into copper phthalocyanine",
  ["c32h18n8_pc", "c8h12cu2o8"], ["c32h16cu_n8_cupc", "ch3cooh"], -180.0,
  "Facile metalation using copper acetate paddlewheel precursor.", "synthesis");

add("mof-cupc-combustion", "Complete combustion of copper phthalocyanine in air",
  ["c32h16cu_n8_cupc", "o2"], ["cuo", "co2", "no2", "water"], -18200.0,
  "Thermal combustion of stable aromatic macrocycle.", "combustion");

add("mof-pc-free-combustion", "Combustion of metal-free phthalocyanine macrocycle",
  ["c32h18n8_pc", "o2"], ["co2", "no2", "water"], -17800.0,
  "High-temperature combustion of free base phthalocyanine.", "combustion");

add("mof-cupc-nitric-digestion", "Oxidative acid digestion of copper phthalocyanine in fuming nitric acid",
  ["c32h16cu_n8_cupc", "hno3"], ["cu-no3-2", "co2", "no2", "water"], -7600.0,
  "Exhaustive oxidative destruction of macrocyclic ring.");

add("mof-pc-free-nitric-digestion", "Nitric acid oxidative cleavage of metal-free phthalocyanine",
  ["c32h18n8_pc", "hno3"], ["co2", "no2", "water"], -7400.0,
  "Acid digestion liberating nitrogen dioxide.");

add("mof-cupc-sulfuric-demetal", "Concentrated sulfuric acid demetallation of copper phthalocyanine",
  ["c32h16cu_n8_cupc", "h2so4"], ["cuso4", "c32h18n8_pc"], 65.0,
  "Acid-promoted demetallation recovering free phthalocyanine.");

add("mof-pc-direct-copper-metalation", "Direct thermal metalation of phthalocyanine by metallic copper",
  ["c32h18n8_pc", "cu"], ["c32h16cu_n8_cupc", "h2"], -85.0,
  "Vapor-phase metalation on copper substrate producing epitaxial CuPc thin films.");

add("mof-pc-cuo-metalation", "Solid-state reaction of copper(II) oxide with phthalocyanine",
  ["c32h18n8_pc", "cuo"], ["c32h16cu_n8_cupc", "water"], -95.0,
  "Thermal condensation producing water and CuPc.");

add("mof-pc-cuoh2-metalation", "Reaction of copper(II) hydroxide with phthalocyanine",
  ["c32h18n8_pc", "cuoh2"], ["c32h16cu_n8_cupc", "water"], -110.0,
  "Facile condensation in high-boiling solvent.");

add("mof-pc-cuco3-metalation", "Copper carbonate metalation of free phthalocyanine",
  ["c32h18n8_pc", "cuco3"], ["c32h16cu_n8_cupc", "co2", "water"], -75.0,
  "Decarboxylation driving copper insertion.");

add("mof-cupc-sulfide-displacement-h2s", "Hydrogen sulfide demetallation of copper phthalocyanine",
  ["c32h16cu_n8_cupc", "h2s"], ["cus", "c32h18n8_pc"], -45.0,
  "Sulfidation displacing copper as copper sulfide precipitate.");

add("mof-cupc-sulfide-displacement-na2s", "Sodium sulfide demetallation of CuPc in aqueous alkaline medium",
  ["c32h16cu_n8_cupc", "na2s", "water"], ["cus", "c32h18n8_pc", "naoh"], -55.0,
  "Alkaline sulfidation recovering metal-free macrocycle.");

// =========================================================================
// Section 3: Terephthalate Linkers & MOF Framework Chemistry (15)
// =========================================================================
add("mof-pta-esterification-methanol", "Fischer esterification of terephthalic acid to dimethyl terephthalate",
  ["c8h6o4_pta", "ch3oh"], ["dimethyl-terephthalate", "water"], -25.0,
  "Synthesis of dimethyl terephthalate (DMT) precursor.", "synthesis");

add("mof-dmt-saponification-naoh", "Alkaline saponification of dimethyl terephthalate by sodium hydroxide",
  ["dimethyl-terephthalate", "naoh", "hcl"], ["c8h6o4_pta", "ch3oh", "nacl"], -65.0,
  "Saponification with acid workup recovering terephthalic acid.");

add("mof-pta-esterification-glycol", "Esterification of terephthalic acid with ethylene glycol to BHET",
  ["c8h6o4_pta", "c2h6o2"], ["c12h14o6_bhet", "water"], -30.0,
  "Synthesis of bis(2-hydroxyethyl) terephthalate monomer for PET.", "synthesis");

add("mof-bhet-hydrolysis-water", "Aqueous neutral hydrolysis of BHET monomer",
  ["c12h14o6_bhet", "water"], ["c8h6o4_pta", "c2h6o2"], 30.0,
  "Chemical recycling of polyester monomer.");

add("mof-pta-combustion", "Complete combustion of terephthalic acid MOF linker",
  ["c8h6o4_pta", "o2"], ["co2", "water"], -3210.0,
  "Exothermic combustion.", "combustion");

add("mof-phenolphthalein-synthesis", "Condensation synthesis of phenolphthalein from phthalic anhydride and phenol",
  ["phthalic-anhydride", "c6h6o"], ["phenolphthalein", "water"], -65.0,
  "Acid-catalyzed condensation producing classic pH indicator.", "synthesis");

add("mof-phthalic-anhydride-naoh", "Alkaline ring opening of phthalic anhydride by sodium hydroxide",
  ["phthalic-anhydride", "naoh", "hcl"], ["c8h6o4", "nacl"], -70.0,
  "Alkaline opening and acid workup.");

add("mof-pta-zinc-oxide-neutralize", "Acid digestion of zinc oxide terephthalate framework (MOF-5 node dissolution)",
  ["c8h6o4_pta", "zno", "hcl"], ["zncl2", "c8h6o4", "water"], -65.0,
  "Acidic dissolution decomposing zinc oxide coordination node into soluble zinc chloride.");

add("mof-pta-copper-hydroxide-neutralize", "Reaction of terephthalic acid with copper(II) hydroxide",
  ["c8h6o4_pta", "cuoh2", "hno3"], ["cu-no3-2", "c8h6o4", "water"], -40.0,
  "Acid digestion of copper terephthalate framework.");

add("mof-dmp-hydrolysis-water", "Aqueous hydrolysis of dimethyl phthalate",
  ["c10h10o4", "water"], ["c8h6o4", "ch3oh"], 45.0,
  "Hydrolysis regenerating phthalic acid.");

add("mof-phthalic-anhydride-combustion", "Thermal combustion of phthalic anhydride",
  ["phthalic-anhydride", "o2"], ["co2", "water"], -3150.0,
  "Exothermic combustion.", "combustion");

add("mof-phthalic-acid-combustion", "Combustion of ortho-phthalic acid",
  ["c8h6o4", "o2"], ["co2", "water"], -3180.0,
  "Combustion.", "combustion");

add("mof-phenolphthalein-combustion", "Complete combustion of phenolphthalein indicator",
  ["phenolphthalein", "o2"], ["co2", "water"], -8950.0,
  "Combustion.", "combustion");

add("mof-bhet-combustion", "Thermal combustion of BHET monomer",
  ["c12h14o6_bhet", "o2"], ["co2", "water"], -5100.0,
  "Combustion.", "combustion");

add("mof-dmt-combustion", "Thermal combustion of dimethyl terephthalate",
  ["dimethyl-terephthalate", "o2"], ["co2", "water"], -4680.0,
  "Combustion.", "combustion");

// =========================================================================
// Section 4: Crown Ether Host-Guest Inclusion & Phase Transfer (15)
// =========================================================================
add("mof-crown-combustion", "Complete combustion of 18-crown-6 macrocycle",
  ["c12h24o6_18crown6", "o2"], ["co2", "water"], -7150.0,
  "Combustion of cyclic polyether.", "combustion");

add("mof-crown-nitric-digestion", "Oxidative acid digestion of 18-crown-6 in hot nitric acid",
  ["c12h24o6_18crown6", "hno3"], ["co2", "no2", "water"], -3400.0,
  "Nitric acid oxidation.");

add("mof-crown-sulfuric-digestion", "Concentrated sulfuric acid oxidative charring of 18-crown-6",
  ["c12h24o6_18crown6", "h2so4"], ["co2", "so2", "water"], -2850.0,
  "Acid decomposition.");

add("mof-crown-chlorine-oxidation", "Chlorine gas and oxygen oxidation of 18-crown-6",
  ["c12h24o6_18crown6", "cl2", "o2"], ["co2", "hcl"], -4200.0,
  "Oxidative degradation by halogens.");

add("mof-crown-bromine-oxidation", "Bromine and oxygen oxidation of 18-crown-6 ether ring",
  ["c12h24o6_18crown6", "br2", "o2"], ["co2", "hbr"], -3980.0,
  "Halogen degradation.");

add("mof-crown-permanganate-cleavage", "Permanganate oxidative degradation of 18-crown-6 host ether",
  ["c12h24o6_18crown6", "kmno4", "h2so4"], ["co2", "mnso4", "k2so4", "water"], -4950.0,
  "Oxidative ring cleavage in sulfuric acid.");

add("mof-crown-dichromate-cleavage", "Acid dichromate destruction of 18-crown-6",
  ["c12h24o6_18crown6", "k2cr2o7", "h2so4"], ["co2", "cr2-so4-3", "k2so4", "water"], -4650.0,
  "Chromic acid oxidation.");

add("mof-crown-peroxide-cleavage", "Fenton/peroxide degradation of 18-crown-6",
  ["c12h24o6_18crown6", "h2o2"], ["co2", "water"], -5800.0,
  "Hydroxyl radical oxidative destruction.");

add("mof-crown-hydrogenation", "Exhaustive catalytic hydrogenolysis of 18-crown-6 to ethane and water",
  ["c12h24o6_18crown6", "h2"], ["c2h6", "water"], -620.0,
  "Hydrogenolysis of ether linkages.");

add("mof-crown-ptc-toluene-permanganate", "Crown ether phase-transfer oxidation of toluene to benzoic acid",
  ["c7h8", "kmno4", "h2so4"], ["c6h5cooh", "mnso4", "k2so4", "water"], -640.0,
  "Purple benzene phase-transfer oxidation solubilized by 18-crown-6.");

add("mof-crown-ptc-alcohol-dichromate", "Phase-transfer oxidation of 1-phenylethanol to acetophenone by dichromate",
  ["c8h10o", "k2cr2o7", "h2so4"], ["acetophenone", "cr2-so4-3", "k2so4", "water"], -480.0,
  "Crown-ether promoted oxidation.");

add("mof-crown-ptc-benzyl-alcohol", "Oxidation of benzyl alcohol to benzoic acid via permanganate and crown ether",
  ["c7h8o", "kmno4", "h2so4"], ["c6h5cooh", "mnso4", "k2so4", "water"], -720.0,
  "Phase-transfer catalytic alcohol oxidation.");

add("mof-crown-syngas-cracking", "Thermal steam reforming of 18-crown-6",
  ["c12h24o6_18crown6", "water"], ["co", "h2"], 890.0,
  "High-temperature catalytic steam reforming.", "decomposition");

add("mof-crown-co2-reforming", "Dry carbon dioxide reforming of 18-crown-6",
  ["c12h24o6_18crown6", "co2"], ["co", "h2"], 940.0,
  "Catalytic dry reforming producing syngas.");

add("mof-crown-methane-pyrolysis", "Thermal cracking of 18-crown-6 with methane",
  ["c12h24o6_18crown6", "ch4"], ["c2h6", "co", "h2"], 410.0,
  "Hydrocarbon co-pyrolysis.");

// =========================================================================
// Section 5: Dithizone Chelating & Metallocomplexes (15)
// =========================================================================
add("mof-dithizone-h2-hydrogenolysis", "Catalytic hydrogenolysis of dithizone chelating agent",
  ["c13h12n4s_dithizone", "h2"], ["c6h6", "ch4", "ammonia", "h2s"], -410.0,
  "Reductive cleavage into benzene, methane, ammonia, and hydrogen sulfide.");

add("mof-dithizone-combustion", "Thermal combustion of dithizone analytical reagent",
  ["c13h12n4s_dithizone", "o2"], ["co2", "no2", "so2", "water"], -8250.0,
  "Exothermic combustion.", "combustion");

add("mof-dithizone-nitric-digestion", "Oxidative nitric acid digestion of dithizone",
  ["c13h12n4s_dithizone", "hno3"], ["co2", "no2", "h2so4", "water"], -3950.0,
  "Acid digestion destroying organic sulfur and nitrogen.");

add("mof-dithizone-chlorine-oxidation", "Chlorine water oxidative degradation of dithizone",
  ["c13h12n4s_dithizone", "cl2", "water"], ["co2", "hcl", "h2so4", "no2"], -4600.0,
  "Halogen destruction of sulfur ligand.");

add("mof-dithizone-peroxide-oxidation", "Hydrogen peroxide oxidation of dithizone to sulfate",
  ["c13h12n4s_dithizone", "h2o2"], ["co2", "h2so4", "no2", "water"], -5100.0,
  "Peroxide destruction of chromophore.");

add("mof-dithizone-permanganate-cleavage", "Permanganate oxidation of dithizone in acidic solution",
  ["c13h12n4s_dithizone", "kmno4", "h2so4"], ["co2", "mnso4", "k2so4", "no2", "water"], -6200.0,
  "Acid permanganate destruction of dithizone reagent.");

add("mof-dithizone-dichromate-cleavage", "Acid dichromate oxidation of dithizone",
  ["c13h12n4s_dithizone", "k2cr2o7", "h2so4"], ["co2", "cr2-so4-3", "k2so4", "no2", "water"], -5900.0,
  "Chromic acid digestion.");

add("mof-dithizone-bromine-oxidation", "Bromine water oxidation of dithizone",
  ["c13h12n4s_dithizone", "br2", "water"], ["co2", "hbr", "h2so4", "no2"], -4300.0,
  "Brominative cleavage.");

add("mof-dithizone-copper-complex-calcination", "Thermal calcination of copper dithizonate analytical residue",
  ["c13h12n4s_dithizone", "cucl2", "o2"], ["cuo", "co2", "hcl", "no2", "so2", "water"], -8400.0,
  "Oxidative destruction of copper dithizone chelate.");

add("mof-dithizone-lead-complex-calcination", "Thermal calcination of lead dithizonate precipitate",
  ["c13h12n4s_dithizone", "pbno32", "o2"], ["pbo", "co2", "no2", "so2", "water"], -8100.0,
  "Analytical calcination of lead dithizone complex.");

add("mof-dithizone-zinc-complex-calcination", "Oxidative calcination of zinc dithizonate residue",
  ["c13h12n4s_dithizone", "zncl2", "o2"], ["zno", "co2", "hcl", "no2", "so2", "water"], -8350.0,
  "Thermal destruction of zinc dithizone chelate.");

add("mof-dithizone-mercury-complex-calcination", "Thermal calcination of mercury dithizonate analytical extract",
  ["c13h12n4s_dithizone", "hgcl2", "o2"], ["hgo", "co2", "hcl", "no2", "so2", "water"], -8200.0,
  "Decomposition of mercury chelate.");

add("mof-dithizone-silver-complex-calcination", "Thermal decomposition of silver dithizonate residue",
  ["c13h12n4s_dithizone", "agno3", "o2"], ["ag2o", "co2", "no2", "so2", "water"], -7950.0,
  "Calcination of silver dithizone complex.");

add("mof-dithizone-sulfuric-charring", "Concentrated sulfuric acid dehydration and charring of dithizone",
  ["c13h12n4s_dithizone", "h2so4"], ["co2", "so2", "no2", "water"], -3200.0,
  "Acid digestion.");

add("mof-dithizone-pyrolysis", "Inert atmosphere pyrolysis of dithizone",
  ["c13h12n4s_dithizone"], ["c", "ch4", "ammonia", "h2s", "n2"], 185.0,
  "Thermal cracking into elemental carbon, methane, and volatile gases.", "decomposition");

// =========================================================================
// Section 6: Alum Supramolecular Crystal Growth & Hydration Networks (10)
// =========================================================================
add("mof-alum-k-naoh-precipitation", "Caustic soda precipitation of aluminum hydroxide from potassium alum",
  ["k-al-so4-2", "naoh"], ["al-oh-3", "k2so4", "na2so4"], -185.0,
  "Alkaline precipitation isolating aluminum hydroxide.", "precipitation");

add("mof-alum-k-koh-precipitation", "Potassium hydroxide reaction with potassium alum",
  ["k-al-so4-2", "koh"], ["al-oh-3", "k2so4"], -195.0,
  "Quantitative precipitation of Al(OH)3.", "precipitation");

add("mof-alum-k-ammonia-precipitation", "Ammonia precipitation of aluminum hydroxide from potassium alum crystal solution",
  ["k-al-so4-2", "ammonia", "water"], ["al-oh-3", "k2so4", "nh4-2-so4"], -170.0,
  "Ammoniacal precipitation of white gelatinous Al(OH)3.", "precipitation");

add("mof-alum-k-bacl2-metathesis", "Barium chloride precipitation of sulfate from potassium alum",
  ["k-al-so4-2", "bacl2"], ["baso4", "kcl", "alcl3"], -48.0,
  "Quantitative sulfate removal isolating AlCl3.", "precipitation");

add("mof-alum-k-bano32-metathesis", "Barium nitrate metathesis of potassium alum",
  ["k-al-so4-2", "ba-no3-2"], ["baso4", "kno3", "al-no3-3"], -46.0,
  "Conversion of alum to aluminum nitrate solution.", "precipitation");

add("mof-alum-k-na2co3-precipitation", "Sodium carbonate neutralization of potassium alum",
  ["k-al-so4-2", "na2co3", "water"], ["al-oh-3", "k2so4", "na2so4", "co2"], -140.0,
  "Effervescent precipitation of basic aluminum hydroxide.", "precipitation");

add("mof-alum-nh4-naoh-precipitation", "Caustic soda precipitation of aluminum hydroxide from ammonium alum",
  ["nh4-al-so4-2", "naoh"], ["al-oh-3", "ammonia", "na2so4", "water"], -195.0,
  "Alkaline precipitation releasing gaseous ammonia.", "precipitation");

add("mof-alum-nh4-koh-precipitation", "Potassium hydroxide reaction with ammonium alum",
  ["nh4-al-so4-2", "koh"], ["al-oh-3", "ammonia", "k2so4", "water"], -200.0,
  "Precipitation of Al(OH)3 with ammonia evolution.", "precipitation");

add("mof-alum-nh4-bacl2-metathesis", "Barium chloride metathesis of ammonium alum",
  ["nh4-al-so4-2", "bacl2"], ["baso4", "ammonium-chloride", "alcl3"], -49.0,
  "Precipitation of barium sulfate.", "precipitation");

add("mof-alum-nh4-bano32-metathesis", "Barium nitrate metathesis of ammonium alum",
  ["nh4-al-so4-2", "ba-no3-2"], ["baso4", "nh4no3", "al-no3-3"], -47.0,
  "Conversion of ammonium alum to nitrate salts.", "precipitation");

// =========================================================================
// Section 7: Aminophthalate & Chemiluminescence Precursors (10)
// =========================================================================
add("mof-luminol-o2-chemiluminescence", "Alkaline oxygen oxidation of luminol generating disodium 3-aminophthalate and blue light",
  ["luminol", "o2", "naoh"], ["na2-aminophthalate", "n2", "water"], -320.0,
  "Chemiluminescent oxidation producing excited aminophthalate emitting 425 nm blue light.");

add("mof-luminol-caocl2-chemiluminescence", "Calcium hypochlorite oxidation of luminol in alkaline solution",
  ["luminol", "ca-ocl-2", "naoh"], ["na2-aminophthalate", "n2", "cacl2", "water"], -360.0,
  "Chemiluminescent detection of hypochlorite bleaching agents.");

add("mof-luminol-naocl-chemiluminescence", "Sodium hypochlorite catalyzed chemiluminescent oxidation of luminol",
  ["luminol", "naocl", "naoh"], ["na2-aminophthalate", "n2", "nacl", "water"], -350.0,
  "Rapid light emission in hypochlorite presence.");

add("mof-luminol-hno3-digestion", "Oxidative acid digestion of luminol in hot nitric acid",
  ["luminol", "hno3"], ["co2", "no2", "water"], -2950.0,
  "Acid digestion destroying heterocyclic hydrazide ring.");

add("mof-aminophthalate-o2-combustion", "Thermal combustion of disodium 3-aminophthalate",
  ["na2-aminophthalate", "o2"], ["na2co3", "co2", "no2", "water"], -3650.0,
  "Combustion of aromatic sodium dicarboxylate salt.", "combustion");

add("mof-aminophthalate-hno3-digestion", "Nitric acid oxidation of disodium 3-aminophthalate",
  ["na2-aminophthalate", "hno3"], ["nano3", "co2", "no2", "water"], -1850.0,
  "Acid oxidation recovering sodium nitrate.");

add("mof-aminophthalate-sulfuric-digestion", "Sulfuric acid digestion of disodium aminophthalate",
  ["na2-aminophthalate", "h2so4"], ["na2so4", "co2", "so2", "no2", "water"], -1450.0,
  "Exhaustive acid charring.");

add("mof-luminol-combustion", "Thermal combustion of luminol in air",
  ["luminol", "o2"], ["co2", "no2", "water"], -4150.0,
  "Exothermic combustion.", "combustion");

add("mof-luminol-chlorine-oxidation", "Chlorine gas oxidation of luminol in water",
  ["luminol", "cl2", "water"], ["co2", "hcl", "no2"], -3100.0,
  "Halogen degradation of luminol.");

add("mof-luminol-permanganate-acid-oxidation", "Acid permanganate destructive oxidation of luminol",
  ["luminol", "kmno4", "h2so4"], ["co2", "no2", "mnso4", "k2so4", "water"], -4400.0,
  "Strong chemical oxidation destroying luminol.");

console.log(`Domain 31 complete: ${list.length} reactions validated!`);

const targetFile = path.resolve(__dirname, "./domain31SupramolecularMOFs.ts");
const code = `// Domain 31: Supramolecular & MOF Precursors (${list.length} reactions)
import { addReaction } from "./generateBatch7.js";

export function buildDomain31SupramolecularMOFs(): void {
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
console.log(`✓ Wrote ${list.length} reactions to domain31SupramolecularMOFs.ts`);
