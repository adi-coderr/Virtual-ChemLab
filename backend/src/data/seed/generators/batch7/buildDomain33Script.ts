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
  type: string = "synthesis",
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
// Section 1: Adipic Acid, HDA & Polyamides (10)
// =========================================================================
add("petro-adipic-cyclohexane-hno3", "Industrial oxidation of cyclohexane to adipic acid by nitric acid",
  ["c6h12", "hno3"], ["c6h10o4_adipic", "n2o", "water"], -1250.0,
  "Two-stage KA-oil oxidation pathway yielding adipic acid crystals.", "redox_other");

add("petro-adipic-combustion", "Thermal combustion of adipic acid monomer",
  ["c6h10o4_adipic", "o2"], ["co2", "water"], -2800.0,
  "Standard bomb calorimetry combustion of hexanedioic acid.", "combustion");

add("petro-nylon-salt-formation", "Synthesis of Nylon 6,6 salt (hexamethylenediammonium adipate)",
  ["c6h10o4_adipic", "c6h16n2_hda"], ["c12h26n2o4_nylon_salt"], -120.0,
  "Equimolar neutralization yielding crystalline stoichiometric Nylon salt.", "acid_base_neutralization",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "White crystalline flakes of Nylon 6,6 salt precipitate" }]);

add("petro-nylon-salt-polycondensation", "Thermal melt polycondensation of Nylon salt to Nylon 6,6 repeating unit",
  ["c12h26n2o4_nylon_salt"], ["c12h22n2o2_nylon66_dimer", "water"], 85.0,
  "High-temperature autoclaving dehydrating nylon salt into polyamide molten fiber resin.", "decomposition");

add("petro-hda-combustion", "Complete combustion of hexamethylenediamine monomer",
  ["c6h16n2_hda", "o2"], ["co2", "n2", "water"], -4200.0,
  "Exothermic combustion of aliphatic diamine.", "combustion");

add("petro-caprolactam-hydrolysis", "Hydrolytic ring opening of caprolactam to 6-aminocaproic acid",
  ["c6h11no_caprolactam", "water"], ["c6h13no2_aminohexanoic"], -15.0,
  "Initiation step in hydrolytic ring-opening polymerization of Nylon-6.", "synthesis");

add("petro-caprolactam-combustion", "Thermal combustion of caprolactam monomer",
  ["c6h11no_caprolactam", "o2"], ["co2", "n2", "water"], -3600.0,
  "Complete combustion yielding carbon dioxide, nitrogen, and steam.", "combustion");

add("petro-aminohexanoic-combustion", "Complete combustion of 6-aminocaproic acid",
  ["c6h13no2_aminohexanoic", "o2"], ["co2", "n2", "water"], -3550.0,
  "Bomb combustion of linear amino acid nylon intermediate.", "combustion");

add("petro-adipic-nitric-digestion", "Exhaustive nitric acid digestion of adipic acid",
  ["c6h10o4_adipic", "hno3"], ["co2", "no2", "water"], -2100.0,
  "Vigorous wet digestion generating dense brown nitrogen dioxide fumes.");

add("petro-caprolactam-nitric-digestion", "Nitric acid oxidation of caprolactam",
  ["c6h11no_caprolactam", "hno3"], ["co2", "no2", "water"], -2450.0,
  "Acid digestion liberating nitrogen dioxide.");

// =========================================================================
// Section 2: Terephthalic Acid & Polyester (PET) Syntheses (10)
// =========================================================================
add("petro-pta-permanganate-oxidation", "Permanganate oxidation of p-xylene to purified terephthalic acid (PTA)",
  ["c8h10", "kmno4", "h2so4"], ["c8h6o4_pta", "mnso4", "k2so4", "water"], -1450.0,
  "Vigorous oxidative cleavage of benzylic methyl groups precipitating white insoluble PTA crystals.", "redox_other",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Dense white crystals of terephthalic acid precipitate" }]);

add("petro-acrylic-acid-permanganate", "Permanganate total oxidation of acrylic acid wastewater",
  ["c3h4o2_acrylic_acid", "kmno4", "h2so4"], ["co2", "mnso4", "k2so4", "water"], -1420.0,
  "Advanced oxidation process treating acrylic wastewater effluent.", "redox_other");

add("petro-acrylic-acid-dichromate", "Potassium dichromate oxidation of acrylic acid effluent",
  ["c3h4o2_acrylic_acid", "k2cr2o7", "h2so4"], ["co2", "cr2-so4-3", "k2so4", "water"], -1350.0,
  "Chemical oxygen demand COD digestion of acrylic acid.", "redox_other");

add("petro-bhet-polycondensation", "Melt-phase polycondensation of BHET to PET repeating unit",
  ["c12h14o6_bhet"], ["c10h8o4_pet_unit", "c2h6o2"], 42.0,
  "Transesterification releasing ethylene glycol byproduct under high vacuum.", "decomposition");

add("petro-mma-permanganate", "Permanganate advanced oxidation of methyl methacrylate effluent",
  ["c5h8o2_mma", "kmno4", "h2so4"], ["co2", "mnso4", "k2so4", "water"], -2850.0,
  "Total oxidative destruction of methacrylic monomer.", "redox_other");

add("petro-dmt-combustion", "Thermal combustion of dimethyl terephthalate",
  ["c10h10o4_dmt", "o2"], ["co2", "water"], -4680.0,
  "Complete combustion of diester monomer.", "combustion");

add("petro-dmt-transesterification", "Transesterification of DMT with ethylene glycol to PET unit and methanol",
  ["c10h10o4_dmt", "c2h6o2"], ["c10h8o4_pet_unit", "ch3oh"], -18.0,
  "Catalytic transesterification stripping volatile methanol.", "synthesis");

add("petro-pet-unit-combustion", "Thermal combustion of PET polyester repeat unit",
  ["c10h8o4_pet_unit", "o2"], ["co2", "water"], -4450.0,
  "Incineration of polyester polymer unit.", "combustion");

add("petro-mma-dichromate", "Dichromate COD digestion of methyl methacrylate",
  ["c5h8o2_mma", "k2cr2o7", "h2so4"], ["co2", "cr2-so4-3", "k2so4", "water"], -2720.0,
  "Chemical oxygen demand oxidation of MMA with Cr(III) emerald green color shift.", "redox_other");

add("petro-pta-nitric-digestion", "Nitric acid oxidation of terephthalic acid",
  ["c8h6o4_pta", "hno3"], ["co2", "no2", "water"], -2750.0,
  "Acid digestion liberating nitrogen dioxide.");

// =========================================================================
// Section 3: Cumene Process, Phenol & Bisphenol A (10)
// =========================================================================
add("petro-cumene-ozone-peroxidation", "Ozone-promoted oxidation of cumene to cumene hydroperoxide (CHP)",
  ["c9h12_cumene", "o3"], ["c9h12o2_chp", "o2"], -185.0,
  "Accelerated ozonolysis auto-oxidation synthesizing CHP intermediate.", "redox_other");

add("petro-chp-cleavage", "Hock rearrangement: acid-catalyzed cleavage of cumene hydroperoxide",
  ["c9h12o2_chp"], ["c6h6o", "ch3coch3"], -252.0,
  "Sulfuric acid cleavage producing stoichiometric co-products phenol and acetone.", "decomposition");

add("petro-cumene-combustion-incomplete", "Incomplete combustion of cumene hydrocarbon yielding carbon monoxide",
  ["c9h12_cumene", "o2"], ["co", "water"], -3280.0,
  "Oxygen-deficient combustion generating carbon monoxide.", "combustion");

add("petro-chp-combustion", "Thermal combustion of cumene hydroperoxide",
  ["c9h12o2_chp", "o2"], ["co2", "water"], -4950.0,
  "Exothermic combustion.", "combustion");

add("petro-bpa-condensation", "Acid-catalyzed condensation of phenol and acetone synthesizing Bisphenol A",
  ["c6h6o", "ch3coch3"], ["c15h16o2_bpa", "water"], -78.0,
  "Electrophilic aromatic substitution producing difunctional monomer BPA.", "synthesis",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "White crystalline flakes of Bisphenol A precipitate" }]);

add("petro-bpa-combustion", "Complete combustion of Bisphenol A",
  ["c15h16o2_bpa", "o2"], ["co2", "water"], -7750.0,
  "Combustion.", "combustion");

add("petro-phenol-bromination", "Exhaustive electrophilic bromination of phenol to 2,4,6-tribromophenol",
  ["c6h6o", "br2"], ["c6h3br3o", "hbr"], -210.0,
  "Rapid bromination yielding insoluble white antiseptic precipitate.", "substitution",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "White curdy precipitate of tribromophenol forms instantly" }]);

add("petro-cumene-nitric-digestion", "Nitric acid oxidation of cumene",
  ["c9h12_cumene", "hno3"], ["co2", "no2", "water"], -4100.0,
  "Acid digestion liberating nitrogen dioxide.");

add("petro-bpa-nitric-digestion", "Nitric acid oxidation of Bisphenol A",
  ["c15h16o2_bpa", "hno3"], ["co2", "no2", "water"], -6200.0,
  "Acid digestion liberating nitrogen dioxide.");

add("petro-phenol-dichromate-oxidation", "Oxidation of phenol by acidified potassium dichromate to 1,4-benzoquinone",
  ["c6h6o", "k2cr2o7", "h2so4"], ["c6h4o2_benzoquinone", "cr2-so4-3", "k2so4", "water"], -480.0,
  "Chromic acid oxidation of phenol yielding yellow crystalline benzoquinone.", "redox_other",
  [{ type: "color_change", colorFrom: "#E67E22", colorTo: "#145A32", description: "Orange dichromate shifts to deep chromium(III) green" }]);

// =========================================================================
// Section 4: Acrylics, Acrylates & Methacrylates (10)
// =========================================================================
add("petro-acrylic-acid-ozone-oxidation", "Ozone catalytic oxidation of propylene to acrylic acid",
  ["c3h6", "o3"], ["c3h4o2_acrylic_acid", "water"], -640.0,
  "Vapor-phase ozonolysis oxidation synthesizing acrylic acid monomer.", "redox_other");

add("petro-acrylic-acid-combustion", "Complete combustion of acrylic acid monomer",
  ["c3h4o2_acrylic_acid", "o2"], ["co2", "water"], -1370.0,
  "Combustion of vinyl carboxylic acid.", "combustion");

add("petro-methyl-acrylate-synthesis", "Fischer esterification of acrylic acid with methanol to methyl acrylate",
  ["c3h4o2_acrylic_acid", "ch3oh"], ["c4h6o2_methyl_acrylate", "water"], -18.0,
  "Sulfuric acid catalyzed esterification producing acrylate monomer.", "synthesis");

add("petro-ethyl-acrylate-isomer-synthesis", "Esterification of acrylic acid with ethanol to ethyl acrylate (MMA isomer)",
  ["c3h4o2_acrylic_acid", "c2h5oh"], ["c5h8o2_mma", "water"], -22.0,
  "Condensation producing acrylate ester monomer.", "synthesis");

add("petro-methyl-acrylate-combustion", "Thermal combustion of methyl acrylate monomer",
  ["c4h6o2_methyl_acrylate", "o2"], ["co2", "water"], -2050.0,
  "Combustion of volatile acrylate ester.", "combustion");

add("petro-mma-combustion", "Complete combustion of methyl methacrylate (MMA)",
  ["c5h8o2_mma", "o2"], ["co2", "water"], -2680.0,
  "Combustion of acrylic Plexiglas monomer.", "combustion");

add("petro-epichlorohydrin-combustion", "Complete combustion of epichlorohydrin",
  ["c3h5clo_epichlorohydrin", "o2"], ["co2", "hcl", "water"], -1650.0,
  "Combustion generating acidic hydrogen chloride effluent.", "combustion");

add("petro-epichlorohydrin-hydrolysis", "Aqueous base hydrolysis of epichlorohydrin to glycerol",
  ["c3h5clo_epichlorohydrin", "naoh", "water"], ["c3h8o3", "nacl"], -135.0,
  "Ring opening and nucleophilic chloride displacement.", "substitution");

add("petro-acrylic-acid-nitric-digestion", "Nitric acid oxidation of acrylic acid",
  ["c3h4o2_acrylic_acid", "hno3"], ["co2", "no2", "water"], -1150.0,
  "Acid digestion liberating nitrogen dioxide.");

add("petro-mma-nitric-digestion", "Nitric acid oxidation of methyl methacrylate",
  ["c5h8o2_mma", "hno3"], ["co2", "no2", "water"], -2150.0,
  "Acid digestion liberating nitrogen dioxide.");

// =========================================================================
// Section 5: Maleic & Phthalic Anhydrides (10)
// =========================================================================
add("petro-maleic-anhydride-butane-ozone", "Selective ozone oxidation of n-butane to maleic anhydride",
  ["c4h10", "o3"], ["c4h2o3_maleic_anhydride", "water"], -1480.0,
  "Low-temperature catalytic ozonolysis yielding maleic anhydride crystals.", "redox_other");

add("petro-maleic-anhydride-benzene-ozone", "Catalytic ozonolysis of benzene to maleic anhydride",
  ["c6h6", "o3"], ["c4h2o3_maleic_anhydride", "co2", "water"], -2150.0,
  "Vapor-phase ring-opening oxidative cleavage yielding maleic anhydride.", "redox_other");

add("petro-maleic-anhydride-hydration", "Hydration of maleic anhydride yielding maleic acid",
  ["c4h2o3_maleic_anhydride", "water"], ["c4h4o4_maleic"], -35.0,
  "Exothermic ring opening of cyclic anhydride.", "synthesis");

add("petro-maleic-anhydride-combustion", "Complete combustion of maleic anhydride",
  ["c4h2o3_maleic_anhydride", "o2"], ["co2", "water"], -1390.0,
  "Combustion.", "combustion");

add("petro-maleic-acid-combustion", "Thermal combustion of maleic acid",
  ["c4h4o4_maleic", "o2"], ["co2", "water"], -1360.0,
  "Combustion of cis-butenedioic acid.", "combustion");

add("petro-phthalic-anhydride-naphthalene-ozone", "Ozonolysis cleavage of naphthalene to phthalic anhydride",
  ["c10h8", "o3"], ["c8h4o3_phthalic_anhydride", "co2", "water"], -2350.0,
  "Vapor ozonolysis converting bicyclic aromatic into phthalic anhydride.", "redox_other");

add("petro-phthalic-anhydride-combustion", "Complete combustion of phthalic anhydride",
  ["c8h4o3_phthalic_anhydride", "o2"], ["co2", "water"], -3260.0,
  "Combustion.", "combustion");

add("petro-phthalic-anhydride-methanol-esterification", "Esterification of phthalic anhydride with methanol to dimethyl phthalate",
  ["c8h4o3_phthalic_anhydride", "ch3oh"], ["c10h10o4_dmt", "water"], -45.0,
  "Acid-catalyzed diester plasticizer synthesis.", "synthesis");

add("petro-maleic-anhydride-nitric-digestion", "Nitric acid oxidation of maleic anhydride",
  ["c4h2o3_maleic_anhydride", "hno3"], ["co2", "no2", "water"], -1220.0,
  "Acid digestion liberating nitrogen dioxide.");

add("petro-phthalic-anhydride-nitric-digestion", "Nitric acid oxidation of phthalic anhydride",
  ["c8h4o3_phthalic_anhydride", "hno3"], ["co2", "no2", "water"], -2800.0,
  "Acid digestion liberating nitrogen dioxide.");

// =========================================================================
// Section 6: Vinyl Chloride & Fluorinated Monomers (10)
// =========================================================================
add("petro-vcm-dehydrochlorination-koh", "Dehydrochlorination of 1,2-dichloroethane by potassium hydroxide to VCM",
  ["c2h4cl2", "koh"], ["c2h3cl_vcm", "kcl", "water"], -85.0,
  "Alkaline elimination synthesizing vinyl chloride monomer.", "decomposition");

add("petro-vcm-ozone-oxidation", "Ozone oxidative decomposition of vinyl chloride monomer",
  ["c2h3cl_vcm", "o3"], ["co2", "hcl", "water"], -1450.0,
  "Vigorous wet ozonolysis scrubbing chlorinated volatile organic compound.", "redox_other");

add("petro-edc-ozone-oxidation", "Ozone catalytic oxidation of 1,2-dichloroethane effluent",
  ["c2h4cl2", "o3"], ["co2", "hcl", "water"], -1520.0,
  "Advanced oxidation process destroying chlorinated solvents.", "redox_other");

add("petro-vcm-combustion", "Thermal combustion of vinyl chloride monomer",
  ["c2h3cl_vcm", "o2"], ["co2", "hcl", "water"], -1180.0,
  "Incineration generating corrosive hydrogen chloride.", "combustion");

add("petro-edc-combustion", "Complete combustion of 1,2-dichloroethane",
  ["c2h4cl2", "o2"], ["co2", "hcl", "water"], -1250.0,
  "Combustion.", "combustion");

add("petro-tfe-combustion-fluorine", "Thermal combustion of tetrafluoroethylene liberating fluorine gas",
  ["c2f4_tfe", "o2"], ["co2", "f2"], -420.0,
  "High-temperature oxidative decomposition.", "combustion");

add("petro-tfe-hydrogen-reductive-defluorination", "Catalytic hydro-defluorination of tetrafluoroethylene to ethylene",
  ["c2f4_tfe", "h2"], ["c2h4", "hf"], -310.0,
  "Precious metal catalyzed reductive stripping of fluorine.", "synthesis");

add("petro-vcm-hydrogenation", "Catalytic hydrogenation of vinyl chloride to chloroethane",
  ["c2h3cl_vcm", "h2"], ["c2h5cl"], -130.0,
  "Selective olefin reduction.", "synthesis");

add("petro-vcm-nitric-digestion", "Nitric acid oxidation of vinyl chloride",
  ["c2h3cl_vcm", "hno3"], ["co2", "no2", "hcl", "water"], -1120.0,
  "Acid digestion liberating nitrogen dioxide.");

add("petro-edc-nitric-digestion", "Nitric acid oxidation of 1,2-dichloroethane",
  ["c2h4cl2", "hno3"], ["co2", "no2", "hcl", "water"], -1180.0,
  "Acid digestion liberating nitrogen dioxide.");

// =========================================================================
// Section 7: Styrene & Aromatic Polymer Intermediates (10)
// =========================================================================
add("petro-styrene-hydration-phenylethanol", "Acid-catalyzed Markovnikov hydration of styrene to 1-phenylethanol",
  ["c8h8_styrene", "water"], ["c8h10o"], -45.0,
  "Hydration yielding secondary alcohol perfume precursor.", "synthesis");

add("petro-styrene-combustion", "Complete combustion of styrene monomer",
  ["c8h8_styrene", "o2"], ["co2", "water"], -4390.0,
  "Combustion.", "combustion");

add("petro-styrene-bromination", "Electrophilic bromine addition across styrene vinyl bond",
  ["c8h8_styrene", "br2"], ["c8h8br2"], -122.0,
  "Rapid decolorization of red bromine solution forming 1,2-dibromoethylbenzene.", "addition",
  [{ type: "color_change", colorFrom: "#B03A2E", colorTo: "#FFFFFF", description: "Red-brown bromine discharge to colorless solution" }]);

add("petro-styrene-chlorination", "Chlorine addition across styrene olefinic bond",
  ["c8h8_styrene", "cl2"], ["c8h8cl2"], -185.0,
  "Halogen addition forming styrene dichloride.", "addition");

add("petro-styrene-hydrogenation-ethylbenzene", "Selective catalytic hydrogenation of styrene to ethylbenzene",
  ["c8h8_styrene", "h2"], ["c8h10"], -118.0,
  "Selective reduction of vinyl side chain over Pd/C catalyst.", "synthesis");

add("petro-styrene-nitric-digestion", "Nitric acid oxidation of styrene monomer",
  ["c8h8_styrene", "hno3"], ["co2", "no2", "water"], -3550.0,
  "Acid digestion liberating nitrogen dioxide.");

add("petro-styrene-permanganate-mineralization", "Exhaustive permanganate oxidation of styrene to carbon dioxide and water",
  ["c8h8_styrene", "kmno4", "h2so4"], ["co2", "mnso4", "k2so4", "water"], -3200.0,
  "Permanganate redox cleavage.", "redox_other");

add("petro-styrene-ozone-cleavage", "Ozonolysis cleavage of styrene yielding benzaldehyde and formic acid",
  ["c8h8_styrene", "o3"], ["c7h6o", "hcooh"], -420.0,
  "Selective reductive ozonolysis cleaving the styrene vinyl bond.", "redox_other");

add("petro-ethylbenzene-ozone-oxidation", "Ozone catalytic oxidation of ethylbenzene",
  ["c8h10", "o3"], ["co2", "water"], -3850.0,
  "Total oxidative destruction of alkylbenzene.", "redox_other");

add("petro-styrene-n2o-combustion", "Combustion of styrene monomer with nitrous oxide oxidant",
  ["c8h8_styrene", "n2o"], ["co2", "n2", "water"], -4650.0,
  "Energetic oxidation with nitrous oxide.", "combustion");

// We will fix line 316 if needed below before running.
// =========================================================================
// Section 8: Dienes, Rubbers & Cycloadditions (10)
// =========================================================================
add("petro-butadiene-partial-hydrogenation", "Selective catalytic hydrogenation of 1,3-butadiene to 1-butene",
  ["c4h6_butadiene", "h2"], ["c4h8"], -110.0,
  "Selective hydrogenation in steam cracker C4 cut purification.", "synthesis");

add("petro-butadiene-combustion", "Complete combustion of 1,3-butadiene monomer",
  ["c4h6_butadiene", "o2"], ["co2", "water"], -2540.0,
  "Combustion of conjugated diene.", "combustion");

add("petro-butadiene-ozone-oxidation", "Exhaustive ozone oxidation of 1,3-butadiene to carbon dioxide and water",
  ["c4h6_butadiene", "o3"], ["co2", "water"], -3100.0,
  "Total oxidative destruction of diene off-gases.", "redox_other");

add("petro-butadiene-permanganate-oxidation", "Acidified potassium permanganate mineralization of 1,3-butadiene",
  ["c4h6_butadiene", "kmno4", "h2so4"], ["co2", "mnso4", "k2so4", "water"], -2850.0,
  "Exhaustive permanganate oxidation decolorizing purple MnO4-.", "redox_other");

add("petro-butadiene-dichromate-oxidation", "Acidified potassium dichromate oxidation of 1,3-butadiene",
  ["c4h6_butadiene", "k2cr2o7", "h2so4"], ["co2", "cr2-so4-3", "k2so4", "water"], -2650.0,
  "Dichromate redox mineralization.", "redox_other");

add("petro-butadiene-maleic-anhydride-diels-alder", "Diels-Alder cycloaddition of 1,3-butadiene with maleic anhydride",
  ["c4h6_butadiene", "c4h2o3_maleic_anhydride"], ["c8h8o3_thpa"], -170.0,
  "Classic Diels-Alder reaction forming cis-1,2,3,6-tetrahydrophthalic anhydride.", "synthesis",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "White crystalline adduct crystallizes upon cooling" }]);

add("petro-butadiene-nitric-digestion", "Nitric acid oxidation of 1,3-butadiene",
  ["c4h6_butadiene", "hno3"], ["co2", "no2", "water"], -2100.0,
  "Acid digestion liberating nitrogen dioxide.");

add("petro-butadiene-chlorine-addition-chlorobutene", "Chlorine addition across 1,3-butadiene yielding 1,4-dichlorobut-2-ene",
  ["c4h6_butadiene", "cl2"], ["c4h6cl2"], -175.0,
  "Electrophilic 1,4-addition of chlorine.", "addition");

add("petro-butadiene-sulfur-vulcanization", "Sulfur-vulcanization crosslinking simulation of butadiene units",
  ["c4h6_butadiene", "s"], ["c4h4s", "h2s"], -95.0,
  "Sulfur crosslinking and cyclization with hydrogen sulfide release.", "redox_other");

add("petro-butadiene-peroxide-mineralization", "Fenton peroxide oxidation of 1,3-butadiene wastewater streams",
  ["c4h6_butadiene", "h2o2"], ["co2", "water"], -2850.0,
  "Wet chemical oxidation degrading volatile diene contaminants.", "redox_other");

// =========================================================================
// Section 9: Acrylonitrile & Polyacrylonitrile Intermediates (10)
// =========================================================================
add("petro-acrylonitrile-acid-hydrolysis", "Hydrochloric acid hydrolysis of acrylonitrile to acrylic acid and ammonium chloride",
  ["c3h3n_acrylonitrile", "hcl", "water"], ["c3h4o2_acrylic_acid", "ammonium-chloride"], -85.0,
  "Acid-catalyzed nitrile hydrolysis isolating acrylic acid.", "synthesis");

add("petro-acrylonitrile-combustion", "Thermal combustion of acrylonitrile monomer",
  ["c3h3n_acrylonitrile", "o2"], ["co2", "n2", "water"], -1760.0,
  "Combustion of vinyl cyanide.", "combustion");

add("petro-acrylonitrile-n2o-combustion", "High-temperature combustion of acrylonitrile with nitrous oxide oxidant",
  ["c3h3n_acrylonitrile", "n2o"], ["co2", "n2", "water"], -1950.0,
  "Energetic combustion with nitrous oxide.", "combustion");

add("petro-acrylonitrile-hydrogen-peroxide", "Alkaline hydrogen peroxide digestion of toxic acrylonitrile waste",
  ["c3h3n_acrylonitrile", "h2o2"], ["co2", "n2", "water"], -1950.0,
  "Advanced chemical oxidation decontaminating nitrile wastewaters.", "redox_other");

add("petro-acrylonitrile-ozone-oxidation", "Ozone destruction of residual acrylonitrile monomer in wastewater",
  ["c3h3n_acrylonitrile", "o3"], ["co2", "n2", "water"], -2100.0,
  "Total oxidative destruction of hazardous acrylonitrile.", "redox_other");

add("petro-acrylonitrile-hydrogenation-propylamine", "Exhaustive catalytic hydrogenation of acrylonitrile to propylamine",
  ["c3h3n_acrylonitrile", "h2"], ["c3h9n"], -245.0,
  "Raney nickel reduction of nitrile and olefinic bonds.", "synthesis");

add("petro-acrylonitrile-nitric-digestion", "Nitric acid oxidation of acrylonitrile",
  ["c3h3n_acrylonitrile", "hno3"], ["co2", "no2", "water"], -1450.0,
  "Acid digestion liberating nitrogen dioxide.");

add("petro-acrylonitrile-sulfuric-hydrolysis", "Sulfuric acid digestion of acrylonitrile to acrylic acid and ammonium sulfate",
  ["c3h3n_acrylonitrile", "h2so4", "water"], ["c3h4o2_acrylic_acid", "nh4-2-so4"], -95.0,
  "Industrial sulfuric acid hydration pathway to acrylic acid.", "synthesis");

add("petro-acrylonitrile-permanganate-oxidation", "Acidified potassium permanganate destruction of acrylonitrile",
  ["c3h3n_acrylonitrile", "kmno4", "h2so4"], ["co2", "mnso4", "k2so4", "n2", "water"], -2250.0,
  "Permanganate redox mineralization.", "redox_other");

add("petro-acrylonitrile-dichromate-oxidation", "Potassium dichromate redox digestion of toxic acrylonitrile",
  ["c3h3n_acrylonitrile", "k2cr2o7", "h2so4"], ["co2", "cr2-so4-3", "k2so4", "n2", "water"], -2180.0,
  "Dichromate oxidative destruction with green Cr(III) formation.", "redox_other",
  [{ type: "color_change", colorFrom: "#E67E22", colorTo: "#145A32", description: "Orange dichromate shifts to emerald green Cr(III)" }]);

// =========================================================================
// Section 10: Alkane Cracking, Reforming & Diol Oxidations (10)
// =========================================================================
add("petro-ethylene-glycol-nitric-oxidation", "Nitric acid oxidation of ethylene glycol to carbon dioxide and NO2",
  ["c2h6o2", "hno3"], ["co2", "no2", "water"], -1250.0,
  "Exhaustive acid digestion of diol monomer.", "redox_other");

add("petro-ethylene-glycol-permanganate-oxidation", "Permanganate redox oxidation of ethylene glycol",
  ["c2h6o2", "kmno4", "h2so4"], ["co2", "mnso4", "k2so4", "water"], -1380.0,
  "Quantitative permanganometric titration of diol.", "redox_other");

add("petro-ethylene-glycol-dichromate-oxidation", "Potassium dichromate oxidation of ethylene glycol",
  ["c2h6o2", "k2cr2o7", "h2so4"], ["co2", "cr2-so4-3", "k2so4", "water"], -1220.0,
  "Dichromate oxidation turning orange Cr(VI) to green Cr(III).", "redox_other");

add("petro-propylene-glycol-nitric-oxidation", "Nitric acid oxidation of propylene glycol",
  ["c3h8o2", "hno3"], ["co2", "no2", "water"], -1780.0,
  "Acid digestion liberating nitrogen dioxide.");

add("petro-propylene-glycol-permanganate-oxidation", "Permanganate oxidation of propylene glycol",
  ["c3h8o2", "kmno4", "h2so4"], ["co2", "mnso4", "k2so4", "water"], -1850.0,
  "Total oxidative destruction of 1,2-propanediol.", "redox_other");

add("petro-propylene-glycol-dichromate-oxidation", "Acidic potassium dichromate oxidation of propylene glycol",
  ["c3h8o2", "k2cr2o7", "h2so4"], ["co2", "cr2-so4-3", "k2so4", "water"], -1680.0,
  "Exhaustive oxidation with colorimetric shift to emerald green Cr(III).", "redox_other");

add("petro-ethylene-glycol-ozone-mineralization", "Ozone catalytic mineralization of ethylene glycol wastewater",
  ["c2h6o2", "o3"], ["co2", "water"], -1650.0,
  "Ozonation degrading glycol pollutants to water and carbon dioxide.", "redox_other");

add("petro-propylene-glycol-ozone-mineralization", "Ozone oxidation of propylene glycol effluent",
  ["c3h8o2", "o3"], ["co2", "water"], -2100.0,
  "Advanced oxidation process mineralizing 1,2-propanediol.", "redox_other");

add("petro-ethylene-glycol-hydrogen-peroxide", "Fenton advanced oxidation of ethylene glycol by hydrogen peroxide",
  ["c2h6o2", "h2o2"], ["co2", "water"], -1420.0,
  "Fenton oxidation degrading aqueous diol contaminants into water and CO2.", "redox_other");

add("petro-propylene-glycol-hydrogen-peroxide", "Peroxide mineralization of propylene glycol",
  ["c3h8o2", "h2o2"], ["co2", "water"], -1950.0,
  "Total wet peroxide oxidation.", "redox_other");

console.log(`Domain 33 complete: ${list.length} reactions validated!`);

if (list.length === 100) {
  const code = `// Domain 33: Petrochemistry, Industrial Monomers & Polymer Syntheses (100 reactions)
export const DOMAIN_33_REACTIONS = ${JSON.stringify(list, null, 2)};
`;
  fs.writeFileSync(path.join(__dirname, "domain33PetrochemPolymers.ts"), code);
  console.log(`✓ Wrote 100 reactions to domain33PetrochemPolymers.ts`);
} else {
  console.error(`Expected 100 reactions, but got ${list.length}`);
}
