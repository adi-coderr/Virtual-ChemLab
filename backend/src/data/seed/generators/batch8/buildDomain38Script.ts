import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { parseFormula } from "../../../../chemistry-engine/formulaParser.js";
import { balanceEquation } from "../../../../chemistry-engine/balancer.js";
import { SEED_CHEMICALS, type SeedChemical } from "../../chemicals.js";
import { CHEMICALS_BATCH_5 } from "../../chemicalsBatch5.js";
import { CHEMICALS_BATCH_6 } from "../../chemicalsBatch6.js";
import { CHEMICALS_BATCH_7 } from "../../chemicalsBatch7.js";
import { SEED_REACTIONS } from "../../reactions.js";
import { REACTIONS_BATCH_5 } from "../../reactionsBatch5.js";
import { REACTIONS_BATCH_6 } from "../../reactionsBatch6.js";
import { REACTIONS_BATCH_7 } from "../../reactionsBatch7.js";
import { RAW_BATCH_8_CHEMICALS } from "./chemicalDefinitionsBatch8.js";
import type { ReactionDefinition } from "./types.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const allChemicalsMap = new Map<string, SeedChemical>();
for (const c of SEED_CHEMICALS) allChemicalsMap.set(c.id, c);
for (const c of CHEMICALS_BATCH_5) allChemicalsMap.set(c.id, c);
for (const c of CHEMICALS_BATCH_6) allChemicalsMap.set(c.id, c);
for (const c of CHEMICALS_BATCH_7) allChemicalsMap.set(c.id, c);
for (const c of RAW_BATCH_8_CHEMICALS) allChemicalsMap.set(c.id, c);

export const existingReactantSets = new Set<string>();
for (const r of SEED_REACTIONS) existingReactantSets.add(r.reactants.map(sp => sp.chemicalId).sort().join("+"));
for (const r of REACTIONS_BATCH_5) existingReactantSets.add(r.reactants.map(sp => sp.chemicalId).sort().join("+"));
for (const r of REACTIONS_BATCH_6) existingReactantSets.add(r.reactants.map(sp => sp.chemicalId).sort().join("+"));
for (const r of REACTIONS_BATCH_7) existingReactantSets.add(r.reactants.map(sp => sp.chemicalId).sort().join("+"));

const reactions: ReactionDefinition[] = [];
const seenKeys = new Set<string>();

function add(
  id: string,
  name: string,
  reactants: string[],
  products: string[],
  enthalpy: number,
  desc: string,
  type = "double_displacement",
  effects: any[] = [],
  net?: string
) {
  const rKey = [...reactants].sort().join("+");
  if (existingReactantSets.has(rKey)) {
    throw new Error(`Collision with existing reaction set: ${rKey} in ${id}`);
  }
  if (seenKeys.has(rKey)) {
    throw new Error(`Duplicate reactant key within Domain 38: ${rKey} in ${id}`);
  }
  seenKeys.add(rKey);

  const missing: string[] = [];
  for (const cid of [...reactants, ...products]) {
    if (!allChemicalsMap.has(cid)) missing.push(cid);
  }
  if (missing.length > 0) {
    throw new Error(`[${id}] Missing chemical IDs: ${missing.join(", ")}`);
  }

  // Validate balance
  const toBal = (cid: string) => {
    const c = allChemicalsMap.get(cid)!;
    const p = parseFormula(c.formula);
    return { label: cid, formula: c.formula, composition: p.composition, charge: c.charge ?? 0 };
  };

  try {
    balanceEquation(reactants.map(toBal), products.map(toBal));
  } catch (e: any) {
    throw new Error(`Failed to balance ${id}: ${e.message}`);
  }

  reactions.push({
    id,
    name,
    reactants,
    products,
    enthalpy,
    desc,
    type,
    effects,
    net,
  });
}

// =========================================================================
// DOMAIN 38: Total Synthesis, Named Organic Transformations & Cascades (100)
// =========================================================================

// --- 1. Swern Oxidations (10 reactions) ---
add("total-swern-ethanol", "Swern oxidation of ethanol to acetaldehyde",
  ["c2h5oh", "dmso"],
  ["ch3cho", "dimethyl_sulfide", "water"],
  -145, "Chemoselective oxidation of primary alcohol via sulfonium intermediate with DMSO activator.",
  "redox_other",
  [{ type: "color_change", colorFrom: "#FFFFFF", colorTo: "#FAFAFA", description: "Characteristic dimethyl sulfide odor with clear distillate" }]);

add("total-swern-isopropanol", "Swern oxidation of isopropanol to acetone",
  ["c3h8o_iso", "dmso"],
  ["ch3coch3", "dimethyl_sulfide", "water"],
  -152, "Swern oxidation of secondary alcohol to acetone without over-oxidation.",
  "redox_other",
  [{ type: "temperature_increase", description: "Mild exothermic oxidation producing volatile dimethyl sulfide" }]);

add("total-swern-1-propanol", "Swern oxidation of 1-propanol to propionaldehyde",
  ["c3h8o", "dmso"],
  ["c3h6o_ald", "dimethyl_sulfide", "water"],
  -143, "Mild low-temperature oxidation of aliphatic primary alcohol.",
  "redox_other",
  [{ type: "color_change", colorFrom: "#FFFFFF", colorTo: "#F8F9F9", description: "Formation of propionaldehyde" }]);

add("total-swern-1-butanol", "Swern oxidation of 1-butanol to butyraldehyde",
  ["c4h10o", "dmso"],
  ["c4h8o_ald", "dimethyl_sulfide", "water"],
  -140, "Mild conversion of 1-butanol to butyraldehyde under anhydrous conditions.",
  "redox_other",
  [{ type: "temperature_increase", description: "Mild exotherm" }]);

add("total-swern-benzyl-alcohol", "Swern oxidation of benzyl alcohol to benzaldehyde",
  ["c7h8o", "dmso"],
  ["c7h6o", "dimethyl_sulfide", "water"],
  -160, "Quantitative conversion of benzylic alcohol to aromatic benzaldehyde.",
  "redox_other",
  [{ type: "color_change", colorFrom: "#FFFFFF", colorTo: "#FEFDE8", description: "Almond scent of benzaldehyde develops" }]);

add("total-swern-cyclohexanol", "Swern oxidation of cyclohexanol to cyclohexanone",
  ["cyclohexanol", "dmso"],
  ["cyclohexanone", "dimethyl_sulfide", "water"],
  -155, "Synthesis of cyclic ketone from secondary alcohol.",
  "redox_other",
  [{ type: "temperature_increase", description: "Controlled exotherm with liberation of dimethyl sulfide" }]);

add("total-swern-2-butanol", "Swern oxidation of 2-butanol to 2-butanone",
  ["c4h10o_sec", "dmso"],
  ["c4h8o_mek", "dimethyl_sulfide", "water"],
  -150, "Smooth oxidation of 2-butanol to methyl ethyl ketone.",
  "redox_other",
  [{ type: "color_change", colorFrom: "#FFFFFF", colorTo: "#FAFAFA", description: "Clear liquid product formation" }]);

add("total-swern-cyclopentanol", "Swern oxidation of cyclopentanol to cyclopentanone",
  ["cyclopentanol", "dmso"],
  ["c5h8o", "dimethyl_sulfide", "water"],
  -154, "Clean conversion of five-membered secondary alcohol to cyclopentanone.",
  "redox_other",
  [{ type: "temperature_increase", description: "Mild exotherm" }]);

add("total-swern-allyl-alcohol", "Swern oxidation of allyl alcohol to acrolein",
  ["allyl_alcohol", "dmso"],
  ["acrolein", "dimethyl_sulfide", "water"],
  -138, "Chemospecific oxidation preserving the terminal carbon-carbon double bond.",
  "redox_other",
  [{ type: "color_change", colorFrom: "#FFFFFF", colorTo: "#F9E79F", description: "Pungent acrolein vapor generated" }]);

add("total-swern-menthol", "Swern oxidation of menthol to menthone",
  ["menthol", "dmso"],
  ["menthone", "dimethyl_sulfide", "water"],
  -148, "Stereocontrolled oxidation of terpene secondary alcohol to menthone.",
  "redox_other",
  [{ type: "temperature_increase", description: "Exothermic conversion to menthone" }]);

// --- 2. Dess-Martin Periodinane (DMP) Oxidations (10 reactions) ---
add("total-dmp-ethanol", "Dess-Martin periodinane oxidation of ethanol",
  ["c2h5oh", "dmp_periodinane"],
  ["ch3cho", "iodinane_byproduct", "ch3cooh"],
  -118, "Rapid room-temperature oxidation of ethanol to acetaldehyde using hypervalent iodine(V).",
  "redox_other",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Precipitation of reduced periodinane by-product" }]);

add("total-dmp-isopropanol", "Dess-Martin periodinane oxidation of isopropanol",
  ["c3h8o_iso", "dmp_periodinane"],
  ["ch3coch3", "iodinane_byproduct", "ch3cooh"],
  -125, "Neutral, non-acidic conversion of isopropanol to acetone.",
  "redox_other",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Precipitation of crystalline iodinane" }]);

add("total-dmp-benzyl-alcohol", "Dess-Martin periodinane oxidation of benzyl alcohol",
  ["c7h8o", "dmp_periodinane"],
  ["c7h6o", "iodinane_byproduct", "ch3cooh"],
  -135, "High-yielding benzylic oxidation to benzaldehyde with zero over-oxidation.",
  "redox_other",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Deposition of white iodinane by-product" }]);

add("total-dmp-1-propanol", "Dess-Martin periodinane oxidation of 1-propanol",
  ["c3h8o", "dmp_periodinane"],
  ["c3h6o_ald", "iodinane_byproduct", "ch3cooh"],
  -120, "Clean transformation of 1-propanol to propanal.",
  "redox_other",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Precipitation of iodinane by-product" }]);

add("total-dmp-1-butanol", "Dess-Martin periodinane oxidation of 1-butanol",
  ["c4h10o", "dmp_periodinane"],
  ["c4h8o_ald", "iodinane_byproduct", "ch3cooh"],
  -122, "Oxidation of 1-butanol to butanal.",
  "redox_other",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "White solid precipitation" }]);

add("total-dmp-cyclohexanol", "Dess-Martin periodinane oxidation of cyclohexanol",
  ["cyclohexanol", "dmp_periodinane"],
  ["cyclohexanone", "iodinane_byproduct", "ch3cooh"],
  -130, "Mild oxidation of cyclohexanol to cyclohexanone in dichloromethane.",
  "redox_other",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Precipitation of reduced periodinane" }]);

add("total-dmp-cyclopentanol", "Dess-Martin periodinane oxidation of cyclopentanol",
  ["cyclopentanol", "dmp_periodinane"],
  ["c5h8o", "iodinane_byproduct", "ch3cooh"],
  -128, "Formation of cyclopentanone under neutral conditions.",
  "redox_other",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Deposition of iodinane acetate" }]);

add("total-dmp-2-butanol", "Dess-Martin periodinane oxidation of 2-butanol",
  ["c4h10o_sec", "dmp_periodinane"],
  ["c4h8o_mek", "iodinane_byproduct", "ch3cooh"],
  -126, "Oxidation of sec-butanol to methyl ethyl ketone.",
  "redox_other",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Crystalline precipitate separates" }]);

add("total-dmp-allyl-alcohol", "Dess-Martin periodinane oxidation of allyl alcohol",
  ["allyl_alcohol", "dmp_periodinane"],
  ["acrolein", "iodinane_byproduct", "ch3cooh"],
  -115, "Chemoselective oxidation of allylic alcohol without double-bond epoxidation.",
  "redox_other",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "White iodinane precipitate" }]);

add("total-dmp-menthol", "Dess-Martin periodinane oxidation of menthol",
  ["menthol", "dmp_periodinane"],
  ["menthone", "iodinane_byproduct", "ch3cooh"],
  -124, "Mild oxidation of menthol without epimerization of the alpha-chiral center.",
  "redox_other",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Precipitation of iodinane" }]);

// --- 3. Prilezhaev Epoxidations with mCPBA (10 reactions) ---
add("total-mcpba-stilbene", "Prilezhaev epoxidation of trans-stilbene with mCPBA",
  ["stilbene_trans", "mcpba"],
  ["trans_stilbene_oxide", "m_chlorobenzoic_acid"],
  -155, "Stereospecific syn-epoxidation of trans-stilbene yielding trans-stilbene oxide.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Precipitation of insoluble 3-chlorobenzoic acid" }]);

add("total-mcpba-cyclohexene", "Prilezhaev epoxidation of cyclohexene with mCPBA",
  ["c6h10", "mcpba"],
  ["cyclohexene_oxide", "m_chlorobenzoic_acid"],
  -165, "Epoxidation of cyclic alkene in dichloromethane.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "White precipitate of 3-chlorobenzoic acid" }]);

add("total-mcpba-cyclopentene", "Prilezhaev epoxidation of cyclopentene with mCPBA",
  ["c5h8", "mcpba"],
  ["cyclopentene_oxide", "m_chlorobenzoic_acid"],
  -168, "Facile epoxidation of strained cyclopentene ring.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Precipitation of m-chlorobenzoic acid" }]);

add("total-mcpba-styrene", "Prilezhaev epoxidation of styrene with mCPBA",
  ["styrene", "mcpba"],
  ["styrene_oxide", "m_chlorobenzoic_acid"],
  -160, "Electrophilic epoxidation of styrene to styrene oxide.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Crystalline acid precipitate" }]);

add("total-mcpba-1-octene", "Prilezhaev epoxidation of 1-octene with mCPBA",
  ["c8h16", "mcpba"],
  ["1_octene_oxide", "m_chlorobenzoic_acid"],
  -158, "Epoxidation of terminal aliphatic alkene.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Precipitation of m-chlorobenzoic acid" }]);

add("total-mcpba-1-hexene", "Prilezhaev epoxidation of 1-hexene with mCPBA",
  ["c6h12_1hexene", "mcpba"],
  ["1_hexene_oxide", "m_chlorobenzoic_acid"],
  -162, "Synthesis of 1,2-epoxyhexane.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "White solid precipitation" }]);

add("total-mcpba-norbornene", "Prilezhaev epoxidation of norbornene with mCPBA",
  ["norbornene", "mcpba"],
  ["norbornene_oxide", "m_chlorobenzoic_acid"],
  -185, "Exo-selective epoxidation of bicyclic alkene driven by ring strain release.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Rapid precipitation of 3-chlorobenzoic acid" }]);

add("total-mcpba-limonene", "Prilezhaev regioselective monoepoxidation of limonene",
  ["c10h16_limonene", "mcpba"],
  ["limonene_oxide", "m_chlorobenzoic_acid"],
  -160, "Regioselective epoxidation at the more electron-rich endocyclic trisubstituted double bond.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Precipitation of m-chlorobenzoic acid" }]);

add("total-mcpba-allyl-chloride", "Prilezhaev epoxidation of allyl chloride to epichlorohydrin",
  ["c3h5cl", "mcpba"],
  ["c3h5clo_epichlorohydrin", "m_chlorobenzoic_acid"],
  -148, "Peracid oxidation of allyl chloride producing epichlorohydrin monomer.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Precipitation of by-product acid" }]);

add("total-mcpba-allyl-alcohol", "Prilezhaev epoxidation of allyl alcohol to glycidol",
  ["allyl_alcohol", "mcpba"],
  ["glycidol", "m_chlorobenzoic_acid"],
  -152, "Epoxidation of allylic alcohol yielding glycidol.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Precipitation of 3-chlorobenzoic acid" }]);

// --- 4. Baeyer-Villiger Ketone Oxidations with mCPBA (10 reactions) ---
add("total-bv-cyclohexanone", "Baeyer-Villiger oxidation of cyclohexanone to epsilon-caprolactone",
  ["cyclohexanone", "mcpba"],
  ["caprolactone", "m_chlorobenzoic_acid"],
  -180, "Peracid insertion into cyclic ketone ring yielding epsilon-caprolactone monomer.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Precipitation of m-chlorobenzoic acid" }]);

add("total-bv-acetone", "Baeyer-Villiger oxidation of acetone to methyl acetate",
  ["ch3coch3", "mcpba"],
  ["c3h6o2_est", "m_chlorobenzoic_acid"],
  -160, "Oxidation of acetone forming methyl acetate.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Precipitation of 3-chlorobenzoic acid" }]);

add("total-bv-butanone", "Baeyer-Villiger oxidation of 2-butanone to ethyl acetate",
  ["c4h8o_mek", "mcpba"],
  ["ch3cooc2h5", "m_chlorobenzoic_acid"],
  -168, "Regioselective oxygen insertion towards the more substituted ethyl group yielding ethyl acetate.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Precipitation of m-chlorobenzoic acid" }]);

add("total-bv-acetophenone", "Baeyer-Villiger oxidation of acetophenone to phenyl acetate",
  ["acetophenone", "mcpba"],
  ["phenyl_acetate", "m_chlorobenzoic_acid"],
  -190, "Selective phenyl migratory aptitude in Baeyer-Villiger oxidation yielding phenyl acetate.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Precipitation of white 3-chlorobenzoic acid" }]);

add("total-bv-benzophenone", "Baeyer-Villiger oxidation of benzophenone to phenyl benzoate",
  ["benzophenone", "mcpba"],
  ["phenyl_benzoate", "m_chlorobenzoic_acid"],
  -195, "Oxidation of diaryl ketone to phenyl benzoate ester.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Precipitation of m-chlorobenzoic acid" }]);

add("total-bv-adamantanone", "Baeyer-Villiger oxidation of 2-adamantanone to 4-oxahomoadamantan-5-one",
  ["adamantanone", "mcpba"],
  ["oxahomoadamantanone", "m_chlorobenzoic_acid"],
  -185, "Bridged lactone synthesis by peracid oxidation of adamantanone.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Precipitation of acid by-product" }]);

add("total-bv-cyclobutanone", "Baeyer-Villiger oxidation of cyclobutanone to gamma-butyrolactone",
  ["cyclobutanone", "mcpba"],
  ["c4h6o2_gbl", "m_chlorobenzoic_acid"],
  -210, "Strain-accelerated ring expansion of four-membered ketone to gamma-butyrolactone.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Precipitation of 3-chlorobenzoic acid" }]);

add("total-bv-pinacolone", "Baeyer-Villiger oxidation of pinacolone to tert-butyl acetate",
  ["pinacolone", "mcpba"],
  ["tert_butyl_acetate", "m_chlorobenzoic_acid"],
  -172, "Exclusive tertiary alkyl migration in Baeyer-Villiger rearrangement.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Precipitation of m-chlorobenzoic acid" }]);

add("total-bv-camphor", "Baeyer-Villiger oxidation of camphor to campholide",
  ["camphor", "mcpba"],
  ["campholide", "m_chlorobenzoic_acid"],
  -182, "Regiospecific lactonization of bicyclic monoterpene ketone.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Crystalline acid deposition" }]);

add("total-bv-cyclopentanone", "Baeyer-Villiger oxidation of cyclopentanone to delta-valerolactone",
  ["c5h8o", "mcpba"],
  ["c5h8o2_valerolactone", "m_chlorobenzoic_acid"],
  -175, "Ring expansion oxidation of cyclopentanone to 5-valerolactone.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Precipitation of solid acid" }]);

// --- 5. Wohl-Ziegler Radical Brominations with NBS (10 reactions) ---
add("total-wz-toluene", "Wohl-Ziegler benzylic bromination of toluene with NBS",
  ["c7h8", "n_bromosuccinimide"],
  ["benzyl_bromide", "succinimide"],
  -65, "Free-radical benzylic bromination of toluene providing sustained low Br2 concentration.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Precipitation of floating succinimide crystals" }]);

add("total-wz-cyclohexene", "Wohl-Ziegler allylic bromination of cyclohexene with NBS",
  ["c6h10", "n_bromosuccinimide"],
  ["3_bromocyclohexene", "succinimide"],
  -70, "Allylic radical bromination forming 3-bromocyclohexene.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Floating succinimide by-product formation" }]);

add("total-wz-cyclopentene", "Wohl-Ziegler allylic bromination of cyclopentene with NBS",
  ["c5h8", "n_bromosuccinimide"],
  ["3_bromocyclopentene", "succinimide"],
  -68, "Allylic halogenation of cyclopentene.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Insoluble succinimide rises to surface" }]);

add("total-wz-o-xylene", "Wohl-Ziegler benzylic bromination of o-xylene",
  ["c8h10_xyl", "n_bromosuccinimide"],
  ["o_methylbenzyl_bromide", "succinimide"],
  -66, "Regioselective monobromination of o-xylene.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Succinimide precipitation" }]);

add("total-wz-p-xylene", "Wohl-Ziegler benzylic bromination of p-xylene",
  ["p_xylene", "n_bromosuccinimide"],
  ["p_methylbenzyl_bromide", "succinimide"],
  -67, "Monobromination at the para-methyl group.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Succinimide separation" }]);

add("total-wz-m-xylene", "Wohl-Ziegler benzylic bromination of m-xylene",
  ["m_xylene", "n_bromosuccinimide"],
  ["m_methylbenzyl_bromide", "succinimide"],
  -66, "Benzylic monohalogenation of m-xylene.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Precipitation of succinimide" }]);

add("total-wz-ethylbenzene", "Wohl-Ziegler benzylic bromination of ethylbenzene",
  ["c8h10", "n_bromosuccinimide"],
  ["1_bromoethylbenzene", "succinimide"],
  -72, "Regiospecific bromination at the secondary benzylic position.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "White succinimide separates" }]);

add("total-wz-cumene", "Wohl-Ziegler benzylic bromination of cumene",
  ["cumene", "n_bromosuccinimide"],
  ["2_bromo_2_phenylpropane", "succinimide"],
  -78, "Rapid radical bromination at the tertiary benzylic position.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Precipitation of succinimide" }]);

add("total-wz-1-methylnaphthalene", "Wohl-Ziegler bromination of 1-methylnaphthalene",
  ["1_methylnaphthalene", "n_bromosuccinimide"],
  ["1_bromomethylnaphthalene", "succinimide"],
  -70, "Benzylic bromination yielding 1-(bromomethyl)naphthalene.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Succinimide floating on solvent" }]);

add("total-wz-2-methylnaphthalene", "Wohl-Ziegler bromination of 2-methylnaphthalene",
  ["2_methylnaphthalene", "n_bromosuccinimide"],
  ["2_bromomethylnaphthalene", "succinimide"],
  -69, "Synthesis of 2-(bromomethyl)naphthalene.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Precipitation of succinimide" }]);

// --- 6. Aldol & Claisen-Schmidt Condensations (10 reactions) ---
add("total-claisen-schmidt-chalcone", "Claisen-Schmidt condensation forming chalcone",
  ["c7h6o", "acetophenone"],
  ["chalcone", "water"],
  -28, "Base-catalyzed crossed aldol condensation forming conjugated trans-chalcone.",
  "synthesis",
  [{ type: "precipitation", colorTo: "#FFF9A6", description: "Yellow crystalline chalcone precipitates" }]);

add("total-aldol-cyclohexanone-dimer", "Self-condensation of cyclohexanone to 2-cyclohexenylcyclohexanone",
  ["cyclohexanone"],
  ["cyclohexenylcyclohexanone", "water"],
  -24, "Base-catalyzed aldol dehydration between two cyclohexanone molecules.",
  "decomposition",
  [{ type: "color_change", colorFrom: "#FFFFFF", colorTo: "#FAD7A0", description: "Liquid darkens to amber" }]);

add("total-knoevenagel-benzaldehyde-malonate", "Knoevenagel condensation of benzaldehyde with diethyl malonate",
  ["c7h6o", "diethyl_malonate"],
  ["diethyl_benzylidenemalonate", "water"],
  -35, "Piperidine-catalyzed condensation yielding diethyl benzylidenemalonate.",
  "synthesis",
  [{ type: "color_change", colorFrom: "#FFFFFF", colorTo: "#FEF9E7", description: "Slight yellowing as conjugated ester forms" }]);

add("total-knoevenagel-benzaldehyde-acetoacetate", "Knoevenagel condensation of benzaldehyde with ethyl acetoacetate",
  ["c7h6o", "ethyl_acetoacetate"],
  ["ethyl_benzylideneacetoacetate", "water"],
  -36, "Condensation of aromatic aldehyde with active beta-keto ester.",
  "synthesis",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "White to cream crystalline adduct forms" }]);

add("total-robinson-annulation-step", "Robinson annulation: condensation of cyclohexanone with methyl vinyl ketone",
  ["cyclohexanone", "methyl_vinyl_ketone"],
  ["octalone_bicyclic", "water"],
  -85, "Tandem Michael addition followed by intramolecular aldol condensation forming bicyclic hexahydronaphthalen-2-one.",
  "synthesis",
  [{ type: "color_change", colorFrom: "#FFFFFF", colorTo: "#EDBB99", description: "Deepening of orange-brown tint in basic medium" }]);

add("total-robinson-cyclopentanone-mvk", "Robinson annulation of cyclopentanone with methyl vinyl ketone",
  ["c5h8o", "methyl_vinyl_ketone"],
  ["tetrahydroindan_one", "water"],
  -82, "Annulation cascade synthesizing bicyclic [4.3.0] nonenone.",
  "synthesis",
  [{ type: "color_change", colorFrom: "#FFFFFF", colorTo: "#F5CBA7", description: "Amber coloration" }]);

// --- 7. Fischer Indole Syntheses (10 reactions) ---
add("total-fischer-acetone", "Fischer indole synthesis of 2-methylindole from phenylhydrazine and acetone",
  ["phenylhydrazine", "ch3coch3"],
  ["2_methylindole", "ammonia", "water"],
  -95, "Acid-catalyzed sigmatropic rearrangement and cyclization of acetone phenylhydrazone.",
  "synthesis",
  [{ type: "precipitation", colorTo: "#F5EEF8", description: "Crystallization of 2-methylindole with release of ammonia gas" },
   { type: "gas_evolution", description: "Ammonia gas evolution" }]);

add("total-fischer-cyclohexanone", "Fischer indole synthesis of 1,2,3,4-tetrahydrocarbazole",
  ["phenylhydrazine", "cyclohexanone"],
  ["tetrahydrocarbazole", "ammonia", "water"],
  -110, "Synthesis of tricyclic carbazole core via Fischer cyclization.",
  "synthesis",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Rapid crystallization of white tetrahydrocarbazole" }]);

add("total-fischer-cyclopentanone", "Fischer indole synthesis of 1,2,3,4-tetrahydrocyclopenta[b]indole",
  ["phenylhydrazine", "c5h8o"],
  ["tetrahydrocyclopentaindole", "ammonia", "water"],
  -105, "Cyclization forming cyclopentindole framework.",
  "synthesis",
  [{ type: "precipitation", colorTo: "#F4ECF7", description: "Precipitation of crystalline indole" }]);

add("total-fischer-pyruvate", "Fischer indole synthesis of ethyl indole-2-carboxylate",
  ["phenylhydrazine", "ethyl_pyruvate"],
  ["ethyl_indole_2_carboxylate", "ammonia", "water"],
  -102, "Fischer synthesis of 2-carboethoxyindole derivative.",
  "synthesis",
  [{ type: "precipitation", colorTo: "#E8DAEF", description: "Tan crystalline precipitation" }]);

add("total-fischer-butanone", "Fischer indole synthesis of 2,3-dimethylindole from 2-butanone",
  ["phenylhydrazine", "c4h8o_mek"],
  ["2_3_dimethylindole", "ammonia", "water"],
  -98, "Cyclization of 2-butanone phenylhydrazone.",
  "synthesis",
  [{ type: "precipitation", colorTo: "#FDEDEC", description: "Pale pink crystals precipitate" }]);

add("total-fischer-propiophenone", "Fischer indole synthesis of 3-methyl-2-phenylindole",
  ["phenylhydrazine", "propiophenone"],
  ["3_methyl_2_phenylindole", "ammonia", "water"],
  -115, "Synthesis of 2,3-disubstituted indole.",
  "synthesis",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "White solid precipitation" }]);

add("total-fischer-acetophenone", "Fischer indole synthesis of 2-phenylindole",
  ["phenylhydrazine", "acetophenone"],
  ["2_phenylindole", "ammonia", "water"],
  -112, "Acid-promoted cyclization forming 2-phenylindole.",
  "synthesis",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Crystalline flakes precipitate" }]);

add("total-fischer-3-pentanone", "Fischer indole synthesis of 2-ethyl-3-methylindole",
  ["phenylhydrazine", "3_pentanone"],
  ["2_ethyl_3_methylindole", "ammonia", "water"],
  -96, "Synthesis of 2,3-dialkylindole from symmetrical ketone.",
  "synthesis",
  [{ type: "precipitation", colorTo: "#FADBD8", description: "Deposition of pinkish-white crystals" }]);

add("total-fischer-phenylacetaldehyde", "Fischer indole synthesis of 3-phenylindole",
  ["phenylhydrazine", "phenylacetaldehyde"],
  ["3_phenylindole", "ammonia", "water"],
  -108, "Cyclization of phenylacetaldehyde phenylhydrazone.",
  "synthesis",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Precipitation of 3-phenylindole" }]);

add("total-fischer-levulinic-acid", "Fischer indole synthesis of 2-methylindole-3-acetic acid",
  ["phenylhydrazine", "levulinic_acid"],
  ["2_methylindole_3_acetic_acid", "ammonia", "water"],
  -106, "Synthesis of auxin/indomethacin intermediate.",
  "synthesis",
  [{ type: "precipitation", colorTo: "#D7BDE2", description: "Off-white crystalline solid precipitates" }]);

// --- 8. Wittig Olefinations with Phosphorus Ylide (10 reactions) ---
add("total-wittig-benzaldehyde-methyl", "Wittig olefination of benzaldehyde with methylenetriphenylphosphorane",
  ["c7h6o", "methylenetriphenylphosphorane"],
  ["c8h8", "triphenylphosphine_oxide"],
  -180, "Classic Wittig synthesis of styrene driven by strong phosphorus-oxygen bond formation.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Copious precipitation of triphenylphosphine oxide" }]);

add("total-wittig-cyclohexanone-methyl", "Wittig methylenation of cyclohexanone",
  ["cyclohexanone", "methylenetriphenylphosphorane"],
  ["methylenecyclohexane", "triphenylphosphine_oxide"],
  -175, "Conversion of cyclic ketone to exocyclic alkene.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Precipitation of triphenylphosphine oxide" }]);

add("total-wittig-cyclopentanone-methyl", "Wittig methylenation of cyclopentanone",
  ["c5h8o", "methylenetriphenylphosphorane"],
  ["methylenecyclopentane", "triphenylphosphine_oxide"],
  -174, "Synthesis of methylenecyclopentane.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "White solid precipitation" }]);

add("total-wittig-acetone-methyl", "Wittig methylenation of acetone to 2-methylpropene (isobutylene)",
  ["ch3coch3", "methylenetriphenylphosphorane"],
  ["isobutylene", "triphenylphosphine_oxide"],
  -172, "Generation of gaseous isobutylene from acetone.",
  "double_displacement",
  [{ type: "gas_evolution", description: "Evolution of isobutylene gas" },
   { type: "precipitation", colorTo: "#FFFFFF", description: "Precipitation of triphenylphosphine oxide" }]);

add("total-wittig-acetaldehyde-methyl", "Wittig methylenation of acetaldehyde to propylene",
  ["ch3cho", "methylenetriphenylphosphorane"],
  ["c3h6", "triphenylphosphine_oxide"],
  -170, "Olefination of acetaldehyde to propylene gas.",
  "double_displacement",
  [{ type: "gas_evolution", description: "Evolution of propylene gas" }]);

add("total-wittig-acetophenone-methyl", "Wittig methylenation of acetophenone to alpha-methylstyrene",
  ["acetophenone", "methylenetriphenylphosphorane"],
  ["alpha_methylstyrene", "triphenylphosphine_oxide"],
  -178, "Olefination of acetophenone.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Precipitation of triphenylphosphine oxide" }]);

add("total-wittig-benzophenone-methyl", "Wittig methylenation of benzophenone to 1,1-diphenylethylene",
  ["benzophenone", "methylenetriphenylphosphorane"],
  ["1_1_diphenylethylene", "triphenylphosphine_oxide"],
  -176, "Synthesis of 1,1-diphenylethene.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Crystalline byproduct precipitation" }]);

add("total-wittig-cinnamaldehyde-methyl", "Wittig methylenation of cinnamaldehyde to 1-phenyl-1,3-butadiene",
  ["cinnamaldehyde", "methylenetriphenylphosphorane"],
  ["1_phenyl_1_3_butadiene", "triphenylphosphine_oxide"],
  -182, "Conjugated diene synthesis via Wittig reaction.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Triphenylphosphine oxide deposition" }]);

add("total-wittig-crotonaldehyde-methyl", "Wittig methylenation of crotonaldehyde to 1,3-pentadiene",
  ["c4h6o_crotonaldehyde", "methylenetriphenylphosphorane"],
  ["1_3_pentadiene", "triphenylphosphine_oxide"],
  -173, "Synthesis of piperylene diene isomer.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Precipitation of TPPO" }]);

add("total-wittig-adamantanone-methyl", "Wittig methylenation of 2-adamantanone to 2-methyleneadamantane",
  ["adamantanone", "methylenetriphenylphosphorane"],
  ["2_methyleneadamantane", "triphenylphosphine_oxide"],
  -185, "Olefination of rigid tricyclic cage ketone.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "White solid precipitation" }]);

// --- 9. Classical Named Rearrangements & Reductions ---
add("total-clemmensen-cyclohexanone", "Clemmensen reduction of cyclohexanone to cyclohexane",
  ["cyclohexanone", "zn", "hcl"],
  ["c6h12", "zncl2", "water"],
  -295, "Complete reduction of cyclic ketone to cyclohexane.",
  "redox_other",
  [{ type: "phase_change", description: "Formation of immiscible upper cyclohexane hydrocarbon layer" }]);

add("total-clemmensen-cyclopentanone", "Clemmensen reduction of cyclopentanone to cyclopentane",
  ["c5h8o", "zn", "hcl"],
  ["c5h10", "zncl2", "water"],
  -290, "Deoxygenation of cyclopentanone.",
  "redox_other",
  [{ type: "phase_change", description: "Separation of cyclopentane layer" }]);

add("total-clemmensen-acetone", "Clemmensen reduction of acetone to propane",
  ["ch3coch3", "zn", "hcl"],
  ["propane", "zncl2", "water"],
  -285, "Acidic reduction of acetone liberating propane gas.",
  "redox_other",
  [{ type: "gas_evolution", description: "Propane gas evolution" }]);

add("total-wolff-kishner-acetophenone", "Wolff-Kishner reduction of acetophenone to ethylbenzene",
  ["acetophenone", "n2h4"],
  ["c8h10", "n2", "water"],
  -220, "Alkaline high-temperature decomposition of acetophenone hydrazone releasing nitrogen gas.",
  "redox_other",
  [{ type: "gas_evolution", description: "Vigorous nitrogen gas evolution" }]);

add("total-wolff-kishner-benzophenone", "Wolff-Kishner reduction of benzophenone to diphenylmethane",
  ["benzophenone", "n2h4"],
  ["diphenylmethane", "n2", "water"],
  -215, "Base-catalyzed deoxygenation of benzophenone.",
  "redox_other",
  [{ type: "gas_evolution", description: "Evolution of molecular nitrogen" }]);

add("total-wolff-kishner-cyclohexanone", "Wolff-Kishner reduction of cyclohexanone to cyclohexane",
  ["cyclohexanone", "n2h4"],
  ["c6h12", "n2", "water"],
  -210, "Conversion of cyclohexanone to cyclohexane.",
  "redox_other",
  [{ type: "gas_evolution", description: "Nitrogen gas effervescence" }]);

add("total-wolff-kishner-cyclopentanone", "Wolff-Kishner reduction of cyclopentanone to cyclopentane",
  ["c5h8o", "n2h4"],
  ["c5h10", "n2", "water"],
  -208, "Deoxygenation of five-membered cyclic ketone.",
  "redox_other",
  [{ type: "gas_evolution", description: "Nitrogen gas evolution" }]);

add("total-wolff-kishner-acetone", "Wolff-Kishner reduction of acetone to propane",
  ["ch3coch3", "n2h4"],
  ["propane", "n2", "water"],
  -205, "Conversion of acetone to gaseous propane.",
  "redox_other",
  [{ type: "gas_evolution", description: "Propane and nitrogen gas evolution" }]);

add("total-pinacol-rearrangement", "Pinacol rearrangement of pinacol to pinacolone",
  ["pinacol"],
  ["pinacolone", "water"],
  -45, "Acid-catalyzed 1,2-methyl shift in 2,3-dimethylbutane-2,3-diol forming pinacolone.",
  "decomposition",
  [{ type: "color_change", colorFrom: "#FFFFFF", colorTo: "#FCF3CF", description: "Liquid distillation of pinacolone with minty odor" }]);

add("total-cannizzaro-benzaldehyde", "Cannizzaro disproportionation of benzaldehyde",
  ["c7h6o", "koh"],
  ["c7h8o", "c7h5o2k"],
  -80, "Base-induced redox disproportionation of non-enolizable aromatic aldehyde.",
  "redox_other",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Precipitation of potassium benzoate" }]);

add("total-cannizzaro-p-chlorobenzaldehyde", "Cannizzaro disproportionation of 4-chlorobenzaldehyde",
  ["p_chlorobenzaldehyde", "koh"],
  ["p_chlorobenzyl_alcohol", "potassium_p_chlorobenzoate"],
  -82, "Disproportionation of halo-substituted aromatic aldehyde.",
  "redox_other",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Precipitation of potassium 4-chlorobenzoate" }]);

add("total-beckmann-cyclohexanone-oxime", "Beckmann rearrangement of cyclohexanone oxime to caprolactam",
  ["cyclohexanone_oxime"],
  ["caprolactam"],
  -115, "Acid-promoted ring expansion rearrangement yielding epsilon-caprolactam monomer for Nylon 6.",
  "decomposition",
  [{ type: "temperature_increase", description: "Violent exotherm in concentrated sulfuric acid medium" }]);

add("total-beckmann-acetophenone-oxime", "Beckmann rearrangement of acetophenone oxime to acetanilide",
  ["acetophenone_oxime"],
  ["c8h9no"],
  -105, "Stereospecific anti-migration of phenyl ring forming acetanilide.",
  "decomposition",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Precipitation of acetanilide upon aqueous dilution" }]);

// --- 10. Michael Additions & Functional Group Cascades (10 reactions) ---
add("total-birch-benzene", "Birch reduction of benzene to 1,4-cyclohexadiene",
  ["c6h6", "na", "c2h5oh"],
  ["1_4_cyclohexadiene", "sodium_ethoxide"],
  -240, "Dissolving metal reduction in liquid ammonia/alcohol providing non-conjugated diene.",
  "redox_other",
  [{ type: "color_change", colorFrom: "#1B4F72", colorTo: "#FFFFFF", description: "Deep blue solvated electron solution discharges to clear" }]);

add("total-michael-malonate-chalcone", "Michael addition of diethyl malonate to chalcone",
  ["diethyl_malonate", "chalcone"],
  ["michael_malonate_chalcone"],
  -60, "Conjugate 1,4-addition of active methylene nucleophile across alpha,beta-unsaturated ketone.",
  "synthesis",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "White adduct crystallizes" }]);

add("total-michael-acetoacetate-mvk", "Michael addition of ethyl acetoacetate to methyl vinyl ketone",
  ["ethyl_acetoacetate", "methyl_vinyl_ketone"],
  ["michael_acetoacetate_mvk"],
  -58, "Base-catalyzed 1,4-conjugate addition forming 1,5-diketone precursor.",
  "synthesis",
  [{ type: "color_change", colorFrom: "#FFFFFF", colorTo: "#FCF3CF", description: "Slight yellowing of reaction mixture" }]);

add("total-michael-malonate-mvk", "Michael addition of diethyl malonate to methyl vinyl ketone",
  ["diethyl_malonate", "methyl_vinyl_ketone"],
  ["michael_malonate_mvk"],
  -55, "Conjugate addition yielding keto-diester.",
  "synthesis",
  [{ type: "temperature_increase", description: "Mild exotherm upon addition" }]);

add("total-michael-acetylacetone-mvk", "Michael addition of acetylacetone to methyl vinyl ketone",
  ["acetylacetone", "methyl_vinyl_ketone"],
  ["michael_acac_mvk"],
  -62, "Addition of beta-diketone across enone.",
  "synthesis",
  [{ type: "temperature_increase", description: "Exothermic reaction" }]);

add("total-michael-malonate-acrolein", "Michael addition of diethyl malonate to acrolein",
  ["diethyl_malonate", "acrolein"],
  ["michael_malonate_acrolein"],
  -54, "Conjugate addition to acrolein.",
  "synthesis",
  [{ type: "color_change", colorFrom: "#FFFFFF", colorTo: "#F9E79F", description: "Color change to pale yellow" }]);

add("total-michael-malonate-acrylonitrile", "Cyanoethylation: Michael addition of diethyl malonate to acrylonitrile",
  ["diethyl_malonate", "c3h3n_acrylonitrile"],
  ["michael_malonate_nitrile"],
  -58, "Cyanoethylation of active methylene diester.",
  "synthesis",
  [{ type: "temperature_increase", description: "Exotherm with consumption of volatile nitrile" }]);

add("total-michael-diethylamine-acrolein", "Conjugate addition of diethylamine to acrolein",
  ["diethylamine", "acrolein"],
  ["3_diethylaminopropanal"],
  -65, "Aza-Michael addition across conjugated enal.",
  "synthesis",
  [{ type: "color_change", colorFrom: "#FFFFFF", colorTo: "#FEF9E7", description: "Slight yellowing" }]);

add("total-michael-morpholine-mvk", "Aza-Michael addition of morpholine to methyl vinyl ketone",
  ["morpholine", "methyl_vinyl_ketone"],
  ["4_morpholinobutan_2_one"],
  -68, "Facile amine conjugate addition without catalyst.",
  "synthesis",
  [{ type: "temperature_increase", description: "Immediate exotherm on mixing" }]);

add("total-michael-piperidine-chalcone", "Aza-Michael addition of piperidine to chalcone",
  ["piperidine", "chalcone"],
  ["1_3_diphenyl_3_piperidinopropan_1_one"],
  -50, "Conjugate addition to chalcone enone system.",
  "synthesis",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Precipitation of beta-amino ketone" }]);

add("total-michael-nitroethane-mvk", "Michael addition of nitroethane to methyl vinyl ketone",
  ["nitroethane", "methyl_vinyl_ketone"],
  ["5_nitrohexan_2_one"],
  -62, "Carbon-carbon bond formation via nitroalkane carbanion addition.",
  "synthesis",
  [{ type: "color_change", colorFrom: "#FFFFFF", colorTo: "#FAD7A0", description: "Development of amber color" }]);

console.log(`Domain 38 constructed with ${reactions.length} reactions!`);

// Write domain38TotalSynthesisNamedRxns.ts
const outputPath = path.resolve(__dirname, "domain38TotalSynthesisNamedRxns.ts");
const code = `// Domain 38: Total Synthesis, Named Organic Transformations & Cascade Reactions (${reactions.length} reactions)
import type { ReactionDefinition } from "./types.js";

export const DOMAIN_38_REACTIONS: ReactionDefinition[] = ${JSON.stringify(reactions, null, 2)};
`;
fs.writeFileSync(outputPath, code, "utf8");
console.log(`✓ Wrote ${reactions.length} reactions to domain38TotalSynthesisNamedRxns.ts`);
