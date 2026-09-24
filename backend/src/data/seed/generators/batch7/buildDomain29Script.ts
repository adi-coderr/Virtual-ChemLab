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
// Section 1: Grignard & Organolithium Prep & Halogen Exchange (15)
// =========================================================================
add("om-grignard-phenyl-br", "Grignard synthesis: bromobenzene oxidative addition with magnesium",
  ["bromobenzene", "mg"], ["c6h5mgbr"], -240.0,
  "Oxidative insertion of magnesium turnings into the C-Br bond in dry ether.", "synthesis");

add("om-grignard-methyl-i", "Synthesis of methylmagnesium iodide Grignard reagent",
  ["ch3i", "mg"], ["ch3mgi"], -265.0,
  "Rapid oxidative addition of magnesium to iodomethane forming classic MeMgI.", "synthesis");

add("om-grignard-methyl-cl", "Synthesis of methylmagnesium chloride Grignard solution",
  ["ch3cl", "mg"], ["ch3mgcl"], -220.0,
  "Industrial MeMgCl preparation under pressure.", "synthesis");

add("om-grignard-ethyl-br", "Synthesis of ethylmagnesium bromide (EtMgBr)",
  ["c2h5br", "mg"], ["c2h5mgbr"], -235.0,
  "Exothermic Grignard synthesis in anhydrous diethyl ether.", "synthesis");

add("om-li-phenyl-br", "Direct lithiation of bromobenzene by lithium metal",
  ["bromobenzene", "li"], ["c6h5li", "libr"], -310.0,
  "Reductive lithiation generating phenyllithium and lithium bromide.");

add("om-li-phenyl-i", "Direct lithiation of iodobenzene by lithium metal",
  ["c6h5i", "li"], ["c6h5li", "lii"], -290.0,
  "Reductive lithiation yielding phenyllithium solution.");

add("om-li-methyl-cl", "Synthesis of methyllithium from chloromethane and lithium",
  ["ch3cl", "li"], ["ch3li", "licl"], -340.0,
  "Heterogeneous reductive lithiation in ether.");

add("om-li-methyl-br", "Synthesis of methyllithium from bromomethane and lithium",
  ["ch3br", "li"], ["ch3li", "libr"], -320.0,
  "Preparation of halide-containing methyllithium.");

add("om-li-methyl-i", "Synthesis of methyllithium from iodomethane and lithium",
  ["ch3i", "li"], ["ch3li", "lii"], -295.0,
  "Synthesis of MeLi·LiI complex reagent.");

add("om-li-exchange-phbr-me", "Lithium-halogen exchange: phenyllithium and bromomethane",
  ["c6h5li", "ch3br"], ["bromobenzene", "ch3li"], -15.0,
  "Halogen-lithium exchange between aryl and alkyl halides.");

add("om-li-exchange-phcl-me", "Lithium-halogen exchange: phenyllithium and chloromethane",
  ["c6h5li", "ch3cl"], ["chlorobenzene", "ch3li"], -18.0,
  "Halogen-metal metathesis.");

add("om-li-exchange-phi-me", "Lithium-halogen exchange: phenyllithium and iodomethane",
  ["c6h5li", "ch3i"], ["c6h5i", "ch3li"], -12.0,
  "Rapid iodine-lithium exchange at -78°C.");

add("om-li-exchange-nbu-phbr", "Halogen-lithium exchange between n-butyllithium and bromobenzene",
  ["c4h9li", "bromobenzene"], ["c6h5li", "c2h5br", "c2h4"], -45.0,
  "n-Butyllithium exchange producing phenyllithium.");

add("om-li-ch3li-transmetal-mg", "Transmetallation of methyllithium with magnesium chloride",
  ["ch3li", "mgcl2"], ["ch3mgcl", "licl"], -35.0,
  "Clean Grignard synthesis via transmetallation.");

add("om-li-c6h5li-transmetal-mg", "Transmetallation of phenyllithium with magnesium bromide",
  ["c6h5li", "mgbr2"], ["c6h5mgbr", "libr"], -38.0,
  "Transmetallation synthesizing phenylmagnesium bromide.");

// =========================================================================
// Section 2: Protonation, Hydrolysis & Acid Quench (15)
// =========================================================================
add("om-quench-phmgbr-water", "Aqueous quenching of phenylmagnesium bromide yielding benzene",
  ["c6h5mgbr", "water"], ["c6h6", "mgbr2", "mgoh2"], -280.0,
  "Hydrolytic quenching isolating benzene.");

add("om-quench-phmgbr-hcl", "Hydrochloric acid quench of phenylmagnesium bromide",
  ["c6h5mgbr", "hcl"], ["c6h6", "mgbr2", "mgcl2"], -310.0,
  "Acidic workup of Grignard mixture.");

add("om-quench-phmgbr-hbr", "Hydrobromic acid quench of phenylmagnesium bromide",
  ["c6h5mgbr", "hbr"], ["c6h6", "mgbr2"], -315.0,
  "Single-salt workup forming magnesium bromide.");

add("om-quench-phmgbr-h2so4", "Sulfuric acid workup of phenylmagnesium bromide",
  ["c6h5mgbr", "h2so4"], ["c6h6", "mgbr2", "mgso4"], -330.0,
  "Aqueous sulfuric acid neutralization.");

add("om-quench-ch3mgi-water", "Water hydrolysis of methylmagnesium iodide generating methane",
  ["ch3mgi", "water"], ["ch4", "mgi2", "mgoh2"], -290.0,
  "Exothermic gas evolution releasing methane.", "gas_evolution");

add("om-quench-ch3mgi-hcl", "Hydrochloric acid quenching of methylmagnesium iodide",
  ["ch3mgi", "hcl"], ["ch4", "mgi2", "mgcl2"], -315.0,
  "Acid neutralization releasing methane gas.", "gas_evolution");

add("om-quench-ch3mgi-hi", "Hydroiodic acid quench of methylmagnesium iodide",
  ["ch3mgi", "hi"], ["ch4", "mgi2"], -320.0,
  "Acid quench forming pure magnesium iodide.", "gas_evolution");

add("om-quench-ch3mgcl-water", "Water quenching of methylmagnesium chloride",
  ["ch3mgcl", "water"], ["ch4", "mgcl2", "mgoh2"], -285.0,
  "Hydrolysis liberating methane.", "gas_evolution");

add("om-quench-ch3mgcl-hcl", "Hydrochloric acid quench of methylmagnesium chloride",
  ["ch3mgcl", "hcl"], ["ch4", "mgcl2"], -305.0,
  "Acid quench generating methane gas.", "gas_evolution");

add("om-quench-c2h5mgbr-water", "Aqueous quenching of ethylmagnesium bromide generating ethane",
  ["c2h5mgbr", "water"], ["c2h6", "mgbr2", "mgoh2"], -275.0,
  "Hydrolytic quench releasing ethane gas.", "gas_evolution");

add("om-quench-c2h5mgbr-hcl", "Hydrochloric acid quench of ethylmagnesium bromide",
  ["c2h5mgbr", "hcl"], ["c2h6", "mgbr2", "mgcl2"], -300.0,
  "Acid workup releasing ethane.", "gas_evolution");

add("om-quench-phli-water", "Water quenching of phenyllithium yielding benzene",
  ["c6h5li", "water"], ["c6h6", "lioh"], -320.0,
  "Violent exothermic hydrolysis.");

add("om-quench-phli-hcl", "Hydrochloric acid neutralization of phenyllithium",
  ["c6h5li", "hcl"], ["c6h6", "licl"], -350.0,
  "Acid workup forming benzene and lithium chloride.");

add("om-quench-ch3li-water", "Water quenching of methyllithium generating methane",
  ["ch3li", "water"], ["ch4", "lioh"], -330.0,
  "Vigorous hydrolysis producing methane.", "gas_evolution");

add("om-quench-c4h9li-water", "Water hydrolysis of n-butyllithium producing butane",
  ["c4h9li", "water"], ["c4h10", "lioh"], -340.0,
  "Hydrolytic quenching producing butane gas.", "gas_evolution");

// =========================================================================
// Section 3: Carboxylation & Carbonyl Additions (15)
// =========================================================================
add("om-carbox-phmgbr-co2-hcl", "Carboxylation of phenylmagnesium bromide to benzoic acid (HCl workup)",
  ["c6h5mgbr", "co2", "hcl"], ["c6h5cooh", "mgbr2", "mgcl2"], -260.0,
  "Dry ice addition followed by acid workup.");

add("om-carbox-phmgbr-co2-hbr", "Carboxylation of phenylmagnesium bromide with HBr workup",
  ["c6h5mgbr", "co2", "hbr"], ["c6h5cooh", "mgbr2"], -265.0,
  "Carboxylation with single magnesium bromide salt byproduct.");

add("om-carbox-phmgbr-co2-h2so4", "Sulfuric acid workup of carboxylated phenylmagnesium bromide",
  ["c6h5mgbr", "co2", "h2so4"], ["c6h5cooh", "mgbr2", "mgso4"], -280.0,
  "Carboxylation with sulfuric acid workup.");

add("om-carbox-phli-co2-hcl", "Carboxylation of phenyllithium yielding benzoic acid",
  ["c6h5li", "co2", "hcl"], ["c6h5cooh", "licl"], -290.0,
  "Carbon dioxide capture producing benzoic acid.");

add("om-carbox-phli-co2-hbr", "Phenyllithium carboxylation with hydrobromic acid workup",
  ["c6h5li", "co2", "hbr"], ["c6h5cooh", "libr"], -295.0,
  "Carboxylation yielding benzoic acid.");

add("om-carbox-ch3mgcl-co2-hcl", "Carboxylation of methylmagnesium chloride yielding acetic acid",
  ["ch3mgcl", "co2", "hcl"], ["ch3cooh", "mgcl2"], -250.0,
  "Grignard carbonylation synthesizing acetic acid.");

add("om-carbox-ch3mgi-co2-hcl", "Carboxylation of methylmagnesium iodide to acetic acid",
  ["ch3mgi", "co2", "hcl"], ["ch3cooh", "mgi2", "mgcl2"], -255.0,
  "Carboxylation synthesizing acetic acid.");

add("om-carbox-ch3li-co2-hcl", "Carboxylation of methyllithium producing acetic acid",
  ["ch3li", "co2", "hcl"], ["ch3cooh", "licl"], -280.0,
  "Organolithium carbonylation to carboxylic acid.");

add("om-quench-c4h9li-hcl", "Hydrochloric acid quenching of n-butyllithium producing butane",
  ["c4h9li", "hcl"], ["c4h10", "licl"], -360.0,
  "Acid neutralization releasing butane.");

add("om-add-phmgbr-acetaldehyde", "Grignard addition: phenylmagnesium bromide to acetaldehyde yielding 1-phenylethanol",
  ["c6h5mgbr", "ch3cho", "hcl"], ["c8h10o", "mgbr2", "mgcl2"], -245.0,
  "Nucleophilic carbonyl addition synthesizing secondary alcohol.");

add("om-add-phmgbr-acetaldehyde-hbr", "Phenylmagnesium bromide addition to acetaldehyde with HBr quench",
  ["c6h5mgbr", "ch3cho", "hbr"], ["c8h10o", "mgbr2"], -250.0,
  "Carbonyl addition yielding 1-phenylethanol.");

add("om-add-ch3mgcl-benzaldehyde", "Addition of methylmagnesium chloride to benzaldehyde producing 1-phenylethanol",
  ["ch3mgcl", "c7h6o", "hcl"], ["c8h10o", "mgcl2"], -235.0,
  "Carbonyl addition to benzaldehyde.");

add("om-add-ch3mgi-benzaldehyde", "Addition of methylmagnesium iodide to benzaldehyde",
  ["ch3mgi", "c7h6o", "hcl"], ["c8h10o", "mgi2", "mgcl2"], -240.0,
  "Grignard synthesis of 1-phenylethanol.");

add("om-add-ch3li-benzaldehyde", "Methyllithium addition to benzaldehyde yielding 1-phenylethanol",
  ["ch3li", "c7h6o", "hcl"], ["c8h10o", "licl"], -260.0,
  "Rapid nucleophilic addition of organolithium.");

add("om-add-phli-acetaldehyde", "Phenyllithium addition to acetaldehyde yielding 1-phenylethanol",
  ["c6h5li", "ch3cho", "hcl"], ["c8h10o", "licl"], -265.0,
  "Organolithium addition producing secondary alcohol.");

// =========================================================================
// Section 4: Cross-Coupling, Kumada & Alkylation Reactions (20)
// =========================================================================
add("om-kumada-phmgbr-mei", "Kumada coupling: phenylmagnesium bromide and iodomethane to toluene",
  ["c6h5mgbr", "ch3i"], ["c7h8", "mgbr2", "mgi2"], -195.0,
  "Nickel/palladium-catalyzed cross-coupling.");

add("om-kumada-phmgbr-mecl", "Kumada coupling: phenylmagnesium bromide and chloromethane to toluene",
  ["c6h5mgbr", "ch3cl"], ["c7h8", "mgbr2", "mgcl2"], -185.0,
  "Cross-coupling generating toluene.");

add("om-kumada-phmgbr-mebr", "Kumada coupling: phenylmagnesium bromide and bromomethane to toluene",
  ["c6h5mgbr", "ch3br"], ["c7h8", "mgbr2"], -190.0,
  "Cross-coupling.");

add("om-kumada-phmgbr-etbr", "Kumada coupling: phenylmagnesium bromide and bromoethane to ethylbenzene",
  ["c6h5mgbr", "c2h5br"], ["c8h10", "mgbr2"], -180.0,
  "Cross-coupling synthesizing ethylbenzene.");

add("om-kumada-phmgbr-etcl", "Kumada coupling: phenylmagnesium bromide and chloroethane to ethylbenzene",
  ["c6h5mgbr", "c2h5cl"], ["c8h10", "mgbr2", "mgcl2"], -175.0,
  "Cross-coupling.");

add("om-kumada-phmgbr-phbr", "Kumada biaryl coupling: phenylmagnesium bromide and bromobenzene to biphenyl",
  ["c6h5mgbr", "bromobenzene"], ["c12h10", "mgbr2"], -210.0,
  "Biaryl cross-coupling.");

add("om-kumada-phmgbr-phcl", "Kumada biaryl coupling: phenylmagnesium bromide and chlorobenzene",
  ["c6h5mgbr", "chlorobenzene"], ["c12h10", "mgbr2", "mgcl2"], -205.0,
  "Biaryl cross-coupling.");

add("om-kumada-phmgbr-phi", "Kumada biaryl coupling: phenylmagnesium bromide and iodobenzene",
  ["c6h5mgbr", "c6h5i"], ["c12h10", "mgbr2", "mgi2"], -215.0,
  "Biaryl cross-coupling.");

add("om-coupling-phli-phbr", "Organolithium biaryl coupling: phenyllithium and bromobenzene to biphenyl",
  ["c6h5li", "bromobenzene"], ["c12h10", "libr"], -240.0,
  "Biaryl coupling.");

add("om-coupling-phli-phcl", "Organolithium biaryl coupling: phenyllithium and chlorobenzene to biphenyl",
  ["c6h5li", "chlorobenzene"], ["c12h10", "licl"], -235.0,
  "Biaryl coupling.");

add("om-coupling-phli-phi", "Organolithium biaryl coupling: phenyllithium and iodobenzene to biphenyl",
  ["c6h5li", "c6h5i"], ["c12h10", "lii"], -245.0,
  "Biaryl coupling.");

add("om-kumada-ch3mgcl-mecl", "Wurtz-Grignard coupling: methylmagnesium chloride and chloromethane to ethane",
  ["ch3mgcl", "ch3cl"], ["c2h6", "mgcl2"], -195.0,
  "Alkyl-alkyl coupling generating ethane gas.", "gas_evolution");

add("om-kumada-ch3mgi-mei", "Coupling of methylmagnesium iodide and iodomethane yielding ethane",
  ["ch3mgi", "ch3i"], ["c2h6", "mgi2"], -205.0,
  "Cross-coupling forming ethane gas.", "gas_evolution");

add("om-kumada-ch3mgcl-mei", "Cross-coupling of methylmagnesium chloride with iodomethane",
  ["ch3mgcl", "ch3i"], ["c2h6", "mgcl2", "mgi2"], -200.0,
  "Mixed halide coupling generating ethane.", "gas_evolution");

add("om-coupling-phli-etbr", "Ethylation of phenyllithium by bromoethane to ethylbenzene",
  ["c6h5li", "c2h5br"], ["c8h10", "libr"], -205.0,
  "Alkylation producing ethylbenzene.");

add("om-coupling-phli-etcl", "Ethylation of phenyllithium by chloroethane to ethylbenzene",
  ["c6h5li", "c2h5cl"], ["c8h10", "licl"], -200.0,
  "Alkylation.");

add("om-kumada-ch3mgi-phbr", "Kumada coupling of methylmagnesium iodide with bromobenzene to toluene",
  ["ch3mgi", "bromobenzene"], ["c7h8", "mgbr2", "mgi2"], -195.0,
  "Cross-coupling.");

add("om-kumada-ch3mgcl-phbr", "Kumada coupling of methylmagnesium chloride with bromobenzene",
  ["ch3mgcl", "bromobenzene"], ["c7h8", "mgbr2", "mgcl2"], -190.0,
  "Cross-coupling.");

add("om-kumada-ch3mgcl-phcl", "Kumada coupling of methylmagnesium chloride with chlorobenzene to toluene",
  ["ch3mgcl", "chlorobenzene"], ["c7h8", "mgcl2"], -185.0,
  "Cross-coupling.");

add("om-kumada-c2h5mgbr-phbr", "Kumada coupling of ethylmagnesium bromide with bromobenzene to ethylbenzene",
  ["c2h5mgbr", "bromobenzene"], ["c8h10", "mgbr2"], -180.0,
  "Cross-coupling.");

// =========================================================================
// Section 5: Suzuki-Miyaura Boronic Acid Coupling (15)
// =========================================================================
add("om-suzuki-pba-phbr-naoh", "Suzuki-Miyaura cross-coupling: phenylboronic acid and bromobenzene (NaOH base)",
  ["c6h7bo2_pba", "bromobenzene", "naoh"], ["c12h10", "h3bo3", "nabr"], -210.0,
  "Palladium-catalyzed biaryl cross-coupling.");

add("om-suzuki-pba-phbr-koh", "Suzuki-Miyaura cross-coupling: phenylboronic acid and bromobenzene (KOH base)",
  ["c6h7bo2_pba", "bromobenzene", "koh"], ["c12h10", "h3bo3", "kbr"], -212.0,
  "Cross-coupling.");

add("om-suzuki-pba-phcl-naoh", "Suzuki-Miyaura cross-coupling: phenylboronic acid and chlorobenzene",
  ["c6h7bo2_pba", "chlorobenzene", "naoh"], ["c12h10", "h3bo3", "nacl"], -205.0,
  "Cross-coupling.");

add("om-suzuki-pba-phcl-koh", "Suzuki-Miyaura cross-coupling: phenylboronic acid and chlorobenzene with KOH",
  ["c6h7bo2_pba", "chlorobenzene", "koh"], ["c12h10", "h3bo3", "kcl"], -207.0,
  "Cross-coupling.");

add("om-suzuki-pba-phi-naoh", "Suzuki-Miyaura cross-coupling: phenylboronic acid and iodobenzene",
  ["c6h7bo2_pba", "c6h5i", "naoh"], ["c12h10", "h3bo3", "nai"], -215.0,
  "Cross-coupling.");

add("om-suzuki-pba-phi-koh", "Suzuki-Miyaura cross-coupling: phenylboronic acid and iodobenzene with KOH",
  ["c6h7bo2_pba", "c6h5i", "koh"], ["c12h10", "h3bo3", "ki"], -218.0,
  "Cross-coupling.");

add("om-suzuki-pba-mei-naoh", "Suzuki methylation: phenylboronic acid and iodomethane yielding toluene",
  ["c6h7bo2_pba", "ch3i", "naoh"], ["c7h8", "h3bo3", "nai"], -195.0,
  "Cross-coupling.");

add("om-suzuki-pba-mecl-naoh", "Suzuki methylation: phenylboronic acid and chloromethane yielding toluene",
  ["c6h7bo2_pba", "ch3cl", "naoh"], ["c7h8", "h3bo3", "nacl"], -185.0,
  "Cross-coupling.");

add("om-suzuki-pba-mebr-naoh", "Suzuki methylation: phenylboronic acid and bromomethane yielding toluene",
  ["c6h7bo2_pba", "ch3br", "naoh"], ["c7h8", "h3bo3", "nabr"], -190.0,
  "Cross-coupling.");

add("om-suzuki-pba-etbr-naoh", "Suzuki ethylation: phenylboronic acid and bromoethane to ethylbenzene",
  ["c6h7bo2_pba", "c2h5br", "naoh"], ["c8h10", "h3bo3", "nabr"], -180.0,
  "Cross-coupling.");

add("om-suzuki-pba-etcl-naoh", "Suzuki ethylation: phenylboronic acid and chloroethane to ethylbenzene",
  ["c6h7bo2_pba", "c2h5cl", "naoh"], ["c8h10", "h3bo3", "nacl"], -175.0,
  "Cross-coupling.");

add("om-pba-protodeboronation", "Protodeboronation: hydrolytic cleavage of phenylboronic acid to benzene",
  ["c6h7bo2_pba", "water"], ["c6h6", "h3bo3"], -45.0,
  "Hydrolytic cleavage.");

add("om-pba-oxidation-peroxide", "Oxidation of phenylboronic acid by alkaline hydrogen peroxide to sodium phenolate",
  ["c6h7bo2_pba", "h2o2", "naoh"], ["sodium-phenolate", "h3bo3", "water"], -360.0,
  "Oxidative deboronation.");

add("om-pba-ipso-nitration", "Ipso-nitration of phenylboronic acid yielding nitrobenzene",
  ["c6h7bo2_pba", "hno3"], ["nitrobenzene", "h3bo3"], -140.0,
  "Electrophilic ipso-substitution.");

add("om-pba-bromodeboronation", "Bromodeboronation of phenylboronic acid yielding bromobenzene",
  ["c6h7bo2_pba", "br2", "water"], ["bromobenzene", "hbr", "h3bo3"], -120.0,
  "Halodeboronation.");

// =========================================================================
// Section 6: Metallocenes (Ferrocene & Titanocene) (10)
// =========================================================================
add("om-ferrocene-naoh-synth", "Synthesis of ferrocene from cyclopentadiene, iron(II) chloride, and NaOH",
  ["fecl2", "c5h6_cpd", "naoh"], ["fe-c5h5-2", "nacl", "water"], -165.0,
  "Base-promoted deprotonation and coordination.");

add("om-ferrocene-koh-synth", "Synthesis of ferrocene using KOH base",
  ["fecl2", "c5h6_cpd", "koh"], ["fe-c5h5-2", "kcl", "water"], -170.0,
  "Coordination synthesis.");

add("om-ferrocene-ammonia-synth", "Synthesis of ferrocene using ammonia base",
  ["fecl2", "c5h6_cpd", "ammonia"], ["fe-c5h5-2", "ammonium-chloride"], -155.0,
  "Ammoniacal ferrocene synthesis.");

add("om-titanocene-naoh-synth", "Synthesis of titanocene dichloride from TiCl4, cyclopentadiene, and NaOH",
  ["ticl4", "c5h6_cpd", "naoh"], ["ti-c5h5-2-cl2", "nacl", "water"], -210.0,
  "Organotitanium synthesis.");

add("om-titanocene-koh-synth", "Synthesis of titanocene dichloride using KOH base",
  ["ticl4", "c5h6_cpd", "koh"], ["ti-c5h5-2-cl2", "kcl", "water"], -215.0,
  "Organotitanium synthesis.");

add("om-titanocene-ammonia-synth", "Synthesis of titanocene dichloride using ammonia",
  ["ticl4", "c5h6_cpd", "ammonia"], ["ti-c5h5-2-cl2", "ammonium-chloride"], -195.0,
  "Coordination synthesis.");

add("om-ferrocene-combustion", "Complete combustion of ferrocene to iron(III) oxide and CO2",
  ["fe-c5h5-2", "o2"], ["fe2o3", "co2", "water"], -6420.0,
  "Combustion.", "combustion");

add("om-ferrocene-nitric-digestion", "Oxidative acid digestion of ferrocene in hot nitric acid",
  ["fe-c5h5-2", "hno3"], ["fe-no3-3", "no2", "co2", "water"], -3280.0,
  "Nitric acid oxidation.");

add("om-titanocene-hydrolysis-water", "Aqueous hydrolysis of titanocene dichloride producing TiO2 and cyclopentadiene",
  ["ti-c5h5-2-cl2", "water"], ["tio2", "hcl", "c5h6_cpd"], -65.0,
  "Hydrolysis.");

add("om-titanocene-combustion", "Thermal combustion of titanocene dichloride producing titanium dioxide",
  ["ti-c5h5-2-cl2", "o2"], ["tio2", "cl2", "co2", "water"], -4950.0,
  "Combustion.", "combustion");

// =========================================================================
// Section 7: Palladium Catalysis & Precursor Reductions (10)
// =========================================================================
add("om-pd-oac2-reduction-h2", "Hydrogen reduction of palladium(II) acetate to active Pd(0) catalyst",
  ["pd-oac-2", "h2"], ["pd", "ch3cooh"], -145.0,
  "Catalyst activation.");

add("om-pd-oac2-reduction-co", "Carbon monoxide reduction of palladium(II) acetate to Pd(0)",
  ["pd-oac-2", "co", "water"], ["pd", "co2", "ch3cooh"], -195.0,
  "Reductive carbonylation.");

add("om-pd-oac2-reduction-methanol", "Methanol reduction of palladium(II) acetate generating formaldehyde and Pd(0)",
  ["pd-oac-2", "ch3oh"], ["pd", "hcho", "ch3cooh"], -110.0,
  "Alcohol reduction.");

add("om-pd-oac2-metathesis-hcl", "Acid metathesis: palladium(II) acetate conversion to palladium(II) chloride",
  ["pd-oac-2", "hcl"], ["pdcl2", "ch3cooh"], -65.0,
  "Ligand metathesis.");

add("om-pd-oac2-reduction-nabh4", "Sodium borohydride reduction of palladium acetate to zero-valent Pd nanoparticles",
  ["pd-oac-2", "nabh4", "water"], ["pd", "h3bo3", "ch3coona", "h2"], -420.0,
  "Nanoparticle synthesis.");

add("om-pd-oac2-reduction-mg", "Magnesium metal reduction of palladium(II) acetate",
  ["pd-oac-2", "mg"], ["pd", "ch3coo-2-mg"], -310.0,
  "Metallo-reduction.");

add("om-pd-oac2-reduction-zn", "Zinc dust reduction of palladium(II) acetate",
  ["pd-oac-2", "zn"], ["pd", "ch3coo-2-zn"], -280.0,
  "Metallo-reduction.");

add("om-pd-oac2-reduction-fe", "Iron metal cementation of palladium from palladium acetate",
  ["pd-oac-2", "fe"], ["pd", "ch3coo-2-fe"], -240.0,
  "Cementation.");

add("om-pd-oac2-reduction-cu", "Copper wire reduction of palladium acetate to palladium metal",
  ["pd-oac-2", "cu"], ["pd", "ch3coo-2-cu"], -150.0,
  "Cementation.");

add("om-pd-oac2-combustion", "Thermal calcination of palladium(II) acetate yielding palladium metal",
  ["pd-oac-2", "o2"], ["pd", "co2", "water"], -1650.0,
  "Oxidative calcination.", "combustion");

console.log(`Domain 29 complete: ${list.length} reactions validated!`);

const targetFile = path.resolve(__dirname, "./domain29OrganometallicsCoupling.ts");
const code = `// Domain 29: Organometallics & Named Coupling (${list.length} reactions)
import { addReaction } from "./generateBatch7.js";

export function buildDomain29OrganometallicsCoupling(): void {
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
console.log(`✓ Wrote ${list.length} reactions to domain29OrganometallicsCoupling.ts`);
