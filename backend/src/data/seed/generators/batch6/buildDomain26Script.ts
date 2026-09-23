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

// Read existing keys from Domains 21 to 25
for (const f of ["domain21Coordination.ts", "domain22Hydrometallurgy.ts", "domain23CatalysisInorganic.ts", "domain24PyrometallurgySmelting.ts", "domain25SemiconductorCVD.ts"]) {
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

function add(id: string, name: string, reactants: string[], products: string[], enthalpy: number, desc: string, type: string = "metathesis", effects: any[] = []) {
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
// Section 1: Tin & Lead Fluoroborate Plating & Solder Baths (15)
// =========================================================================
add("plate-tin-fluoroborate-synthesis", "Synthesis of tin(II) fluoroborate plating concentrate from stannous oxide and fluoboric acid",
  ["sno", "hbf4"], ["sn-bf4-2", "water"], -85.0,
  "Dissolution of high-purity stannous oxide in 48% fluoboric acid preparing tin fluoroborate electroplating bath.");

add("plate-lead-fluoroborate-synthesis", "Synthesis of lead(II) fluoroborate plating concentrate from litharge and fluoboric acid",
  ["pbo", "hbf4"], ["pb-bf4-2", "water"], -95.0,
  "Exothermic dissolution of lead monoxide preparing solder plating electrolyte concentrate.");

add("plate-tin-metal-fluoroboric-dissolution", "Chemical dissolution of metallic tin in fluoboric acid under aeration",
  ["sn", "hbf4"], ["sn-bf4-2", "h2"], -65.0,
  "Anode replenishing reaction maintaining stannous ion concentration in fluoroborate plating baths.", "single_displacement");

add("plate-lead-metal-fluoroboric-dissolution", "Dissolution of metallic lead in fluoboric acid",
  ["pb", "hbf4"], ["pb-bf4-2", "h2"], -55.0,
  "Chemical corrosion maintaining plumbous content in high-throw solder plating tanks.", "single_displacement");

add("plate-stannous-sulfate-caustic-neutralize", "Alkaline precipitation of stannous hydroxide from stannous sulfate plating bath",
  ["snso4", "naoh"], ["sn-oh-2", "na2so4"], -95.0,
  "Wastewater heavy metal precipitation neutralizing spent acid tin plating rinse waters.");

add("plate-stannous-sulfate-potash-neutralize", "Caustic potash precipitation of stannous hydroxide from tin sulfate rinse",
  ["snso4", "koh"], ["sn-oh-2", "k2so4"], -98.0,
  "Neutralization of acidic tin plating effluents generating potassium sulfate byproduct.");

add("plate-stannous-chloride-potash-neutralize", "Neutralization of stannous chloride by caustic potash",
  ["sncl2", "koh"], ["sn-oh-2", "kcl"], -105.0,
  "Alkaline precipitation of tin values from acidic solder flux rinses.");

add("plate-stannous-hydroxide-hbf4-dissolution", "Preparation of tin(II) fluoroborate from freshly precipitated stannous hydroxide",
  ["sn-oh-2", "hbf4"], ["sn-bf4-2", "water"], -115.0,
  "Dissolution of active hydroxide cake in fluoboric acid.");

add("plate-lead-hydroxide-hbf4-dissolution", "Dissolution of lead(II) hydroxide in fluoboric acid to lead fluoroborate",
  ["pb-oh-2", "hbf4"], ["pb-bf4-2", "water"], -120.0,
  "Preparation of lead fluoroborate plating concentrate.");

add("plate-lead-hydroxide-hcl-precipitation", "Reaction of lead(II) hydroxide with hydrochloric acid forming lead chloride",
  ["pb-oh-2", "hcl"], ["pbcl2", "water"], -95.0,
  "Conversion of lead hydroxide to sparingly soluble plumbous chloride.");

add("plate-stannous-hydroxide-h2so4-acid-tin", "Make-up of acid tin sulfate plating bath: dissolution of stannous hydroxide in sulfuric acid",
  ["sn-oh-2", "h2so4"], ["snso4", "water"], -135.0,
  "Preparation of bright acid tin plating bath electrolyte.");

add("plate-tin-fluoroborate-sulfide-precip", "Sulfide precipitation of tin from spent fluoroborate bath by hydrogen sulfide",
  ["sn-bf4-2", "h2s"], ["sns", "hbf4"], -72.0,
  "Wastewater heavy metal remediation removing tin from acidic fluoroborate effluents.");

add("plate-lead-fluoroborate-sulfide-precip", "Sulfide precipitation of lead from solder fluoroborate rinse by hydrogen sulfide",
  ["pb-bf4-2", "h2s"], ["pbs", "hbf4"], -88.0,
  "Deep heavy metal scavenging removing toxic lead from fluoroborate plating waste.");

add("plate-lead-fluoroborate-hcl-precip", "Hydrochloric acid precipitation of lead chloride from lead fluoroborate",
  ["pb-bf4-2", "hcl"], ["pbcl2", "hbf4"], -42.0,
  "Selective separation of lead from fluoroborate solutions regenerating fluoboric acid.");

add("plate-lead-fluoroborate-sulfate-precip", "Sulfuric acid precipitation of lead sulfate from fluoroborate bath",
  ["pb-bf4-2", "h2so4"], ["pbso4", "hbf4"], -65.0,
  "Desulfating and stripping lead from fluoroborate electrolytes.");

// =========================================================================
// Section 2: Zinc Plating, Zincate Pretreatments & Conversion (15)
// =========================================================================
add("plate-zinc-caustic-zincate-immersion", "Zincate immersion process: alkaline dissolution of zinc forming sodium tetrahydroxozincate",
  ["zn", "naoh", "water"], ["na2-zn-oh-4", "h2"], -125.0,
  "Pre-treatment immersion coating of aluminum alloys depositing a thin catalytic zincate strike layer.", "single_displacement");

add("plate-aluminum-caustic-zincate-etch", "Alkaline micro-etching of aluminum substrate in caustic zincate pretreatment bath",
  ["al", "naoh", "water"], ["na-al-oh-4", "h2"], -420.0,
  "Simultaneous dissolution of native aluminum oxide and substrate prior to zincate immersion deposition.", "single_displacement");

add("plate-zinc-sulfate-na2hpo4-naoh", "Zinc phosphate conversion coating: reaction of zinc sulfate with disodium phosphate and NaOH",
  ["znso4", "na2hpo4", "naoh"], ["zn3-po4-2", "na2so4", "water"], -210.0,
  "Automotive phosphating bath chemistry depositing tertiary zinc phosphate crystals.");

add("plate-zinc-chloride-na2hpo4-naoh", "Zinc phosphating make-up: zinc chloride reaction with disodium phosphate and caustic soda",
  ["zncl2", "na2hpo4", "naoh"], ["zn3-po4-2", "nacl", "water"], -225.0,
  "Formation of fine-grained zinc phosphate primer conversion layer on steel.");

add("plate-zinc-sulfate-k2hpo4-koh", "Potassium-buffered zinc phosphating: reaction of zinc sulfate with dipotassium phosphate and KOH",
  ["znso4", "k2hpo4", "koh"], ["zn3-po4-2", "k2so4", "water"], -215.0,
  "Sludge-free zinc phosphating conversion bath formulation.");

add("plate-zinc-chloride-k2hpo4-koh", "Potassium-buffered zinc chloride phosphating conversion",
  ["zncl2", "k2hpo4", "koh"], ["zn3-po4-2", "kcl", "water"], -230.0,
  "High-efficiency phosphating pretreatment improving organic powder coating adhesion.");

add("plate-zinc-sulfate-na2hpo4-na2co3", "Carbonate-buffered zinc phosphating: reaction of zinc sulfate with Na2HPO4 and soda ash",
  ["znso4", "na2hpo4", "na2co3"], ["zn3-po4-2", "na2so4", "co2", "water"], -165.0,
  "Self-buffering phosphating bath with carbon dioxide evolution maintaining optimal acidity.");

add("plate-zinc-chloride-na2hpo4-na2co3", "Carbonate-accelerated zinc chloride phosphating",
  ["zncl2", "na2hpo4", "na2co3"], ["zn3-po4-2", "nacl", "co2", "water"], -180.0,
  "Spray phosphating bath formulation.");

add("plate-zinc-phosphate-precipitation-sulfate", "Zinc phosphating solution make-up: reaction of zinc sulfate with trisodium phosphate",
  ["znso4", "na3po4"], ["zn3-po4-2", "na2so4"], -165.0,
  "Formation of tertiary zinc phosphate (Hopeite) conversion coating crystals.");

add("plate-zinc-phosphate-precipitation-chloride", "Reaction of zinc chloride with trisodium phosphate to zinc phosphate",
  ["zncl2", "na3po4"], ["zn3-po4-2", "nacl"], -180.0,
  "Precipitation of zinc phosphate for automotive paint base coatings.");

add("plate-zinc-phosphate-potassium-sulfate", "Reaction of zinc sulfate with tripotassium phosphate",
  ["znso4", "k3po4"], ["zn3-po4-2", "k2so4"], -170.0,
  "Make-up of crystalline zinc phosphate conversion bath.");

add("plate-zinc-phosphate-potassium-chloride", "Reaction of zinc chloride with tripotassium phosphate",
  ["zncl2", "k3po4"], ["zn3-po4-2", "kcl"], -185.0,
  "Synthesis of crystalline zinc phosphate.");

add("plate-lead-fluoroborate-hi-precip", "Volumetric determination of lead: precipitation of yellow lead(II) iodide from fluoroborate",
  ["pb-bf4-2", "hi"], ["pbi2", "hbf4"], -75.0,
  "Quantitative precipitation of golden plumbous iodide crystals from fluoroborate plating solution.");

add("plate-lead-phosphate-precipitation-k", "Reaction of lead nitrate with tripotassium phosphate",
  ["pbno32", "k2hpo4", "koh"], ["pb3-po4-2", "kno3", "water"], -195.0,
  "Precipitation of lead phosphate.");

add("plate-lead-phosphate-na2hpo4-na2co3", "Lead phosphate conversion coating: reaction of lead nitrate with Na2HPO4 and Na2CO3",
  ["pbno32", "na2hpo4", "na2co3"], ["pb3-po4-2", "nano3", "co2", "water"], -145.0,
  "Carbonate-buffered lead phosphate precipitation.");

// =========================================================================
// Section 3: Nickel Plating & Electroless Nickel-Phosphorus (ENP) (14)
// =========================================================================
add("plate-watts-nickel-carbonate-neutralize", "Watts nickel bath pH adjustment: neutralization of excess acidity with nickel(II) carbonate",
  ["nico3", "h2so4"], ["niso4", "co2", "water"], -90.0,
  "Routine tank maintenance raising Watts bath pH without introducing extraneous cations.");

add("plate-woods-nickel-strike-carbonate", "Wood's nickel strike make-up: dissolution of nickel carbonate in concentrated HCl",
  ["nico3", "hcl"], ["nicl2", "co2", "water"], -80.0,
  "Preparation of low-pH high-chloride Wood's strike electrolyte activating stainless steel.");

add("plate-nickel-sulfate-caustic-precipitation", "Alkaline wastewater treatment: precipitation of nickel(II) hydroxide by caustic soda",
  ["niso4", "naoh"], ["nioh2", "na2so4"], -92.0,
  "Heavy metal precipitation from spent Watts nickel plating rinse waters at pH 9.5.");

add("plate-nickel-carbonate-precipitation-chloride", "Sodium carbonate precipitation of nickel carbonate from chloride effluent",
  ["nicl2", "na2co3"], ["nico3", "nacl"], -45.0,
  "Recovery of nickel carbonate from spent strike baths.");

add("plate-hypophosphite-peroxide-destruction", "Electroless nickel wastewater destruction: oxidation of hypophosphite by hydrogen peroxide",
  ["h3po2", "h2o2"], ["h3po4", "water"], -380.0,
  "Advanced oxidation process destroying reducing hypophosphite before heavy metal precipitation.");

add("plate-hypophosphite-chlorine-oxidation-na", "Destruction of spent electroless nickel reducing agent by chlorine gas",
  ["nah2po2", "cl2", "water"], ["nah2po4", "hcl"], -420.0,
  "Chlorination tank destruction of sodium hypochlorite in ENP effluent.");

add("plate-hypophosphite-chlorine-oxidation-acid", "Vapor-phase destruction of hypophosphorous acid by chlorine",
  ["h3po2", "cl2", "water"], ["h3po4", "hcl"], -435.0,
  "Oxidation of hypophosphorous acid effluent.");

add("plate-hypophosphite-nitric-oxidation-acid", "Nitric acid oxidation of hypophosphorous acid in spent plating bath",
  ["h3po2", "hno3"], ["h3po4", "no2", "water"], -280.0,
  "Thermal digestion of hypophosphite with nitric acid.");

add("plate-hypophosphite-nitric-oxidation-na", "Nitric acid oxidation of sodium hypophosphite in electroless nickel sludge",
  ["nah2po2", "hno3"], ["nah2po4", "no2", "water"], -275.0,
  "Oxidative destruction of residual hypophosphite.");

add("plate-nickel-phosphate-precipitation-sulfate", "Nickel phosphate conversion: reaction of nickel sulfate with trisodium phosphate",
  ["niso4", "na3po4"], ["ni3-po4-2", "na2so4"], -150.0,
  "Precipitation of insoluble light green nickel orthophosphate.");

add("plate-nickel-phosphate-precipitation-chloride", "Reaction of nickel chloride with trisodium phosphate",
  ["nicl2", "na3po4"], ["ni3-po4-2", "nacl"], -165.0,
  "Formation of nickel phosphate.");

add("plate-nickel-phosphate-potassium-sulfate", "Reaction of nickel sulfate with tripotassium phosphate",
  ["niso4", "k3po4"], ["ni3-po4-2", "k2so4"], -155.0,
  "Precipitation of nickel phosphate.");

add("plate-nickel-phosphate-potassium-chloride", "Reaction of nickel chloride with tripotassium phosphate",
  ["nicl2", "k3po4"], ["ni3-po4-2", "kcl"], -170.0,
  "Precipitation of nickel phosphate.");

add("plate-hypophosphite-ferric-reduction", "Ferric chloride test: reduction of ferric chloride by hypophosphorous acid in ENP baths",
  ["h3po2", "fecl3", "water"], ["h3po4", "fecl2", "hcl"], -240.0,
  "Analytical redox titration determining residual hypophosphite reducing power.");

// =========================================================================
// Section 4: Copper Plating & Pyrophosphate Electrolytes (14)
// =========================================================================
add("plate-copper-carbonate-precipitation-sulfate", "Sodium carbonate precipitation of copper carbonate from plating rinse water",
  ["cuso4", "na2co3"], ["cuco3", "na2so4"], -42.0,
  "Recovery of copper values as green basic copper carbonate precipitate.");

add("plate-copper-carbonate-precipitation-chloride", "Precipitation of copper carbonate from cupric chloride effluent",
  ["cucl2", "na2co3"], ["cuco3", "nacl"], -45.0,
  "Carbonate precipitation recovering copper from spent etchant.");

add("plate-copper-pyrophosphate-hydrolysis", "Degradation of copper pyrophosphate plating bath: thermal hydrolysis to orthophosphate",
  ["k4p2o7", "water"], ["k2hpo4"], -35.0,
  "Undesirable buildup of orthophosphate decomposition byproduct in warm copper pyrophosphate tanks.", "decomposition");

add("plate-hypophosphite-copper-reduction-sulfate", "Electroless copper strike: hypophosphite reduction of copper sulfate",
  ["h3po2", "cuso4", "water"], ["cu", "h3po4", "h2so4"], -185.0,
  "Chemical reduction depositing metallic copper without formaldehyde reducing agent.", "single_displacement");

add("plate-hypophosphite-copper-reduction-chloride", "Sodium hypophosphite reduction of cupric chloride to metallic copper",
  ["nah2po2", "cucl2", "water"], ["cu", "nah2po4", "hcl"], -195.0,
  "Autocatalytic immersion copper strike deposition on activated plastics.", "single_displacement");

add("plate-copper-phosphate-precipitation-sulfate", "Copper phosphate precipitation: reaction of copper sulfate with trisodium phosphate",
  ["cuso4", "na3po4"], ["cu3-po4-2", "na2so4"], -145.0,
  "Precipitation of copper(II) phosphate from copper plating dragout.");

add("plate-copper-phosphate-precipitation-chloride", "Reaction of copper(II) chloride with trisodium phosphate",
  ["cucl2", "na3po4"], ["cu3-po4-2", "nacl"], -155.0,
  "Formation of insoluble cupric phosphate.");

add("plate-copper-sulfate-na2hpo4-naoh", "Copper phosphating conversion: reaction of copper sulfate with Na2HPO4 and NaOH",
  ["cuso4", "na2hpo4", "naoh"], ["cu3-po4-2", "na2so4", "water"], -190.0,
  "Precipitation of tertiary copper phosphate crystals.");

add("plate-copper-sulfate-k2hpo4-koh", "Potassium-buffered copper phosphate precipitation",
  ["cuso4", "k2hpo4", "koh"], ["cu3-po4-2", "k2so4", "water"], -195.0,
  "Alkaline precipitation of cupric phosphate.");

add("plate-copper-chloride-k2hpo4-koh", "Reaction of copper(II) chloride with dipotassium phosphate and KOH",
  ["cucl2", "k2hpo4", "koh"], ["cu3-po4-2", "kcl", "water"], -205.0,
  "Precipitation of cupric phosphate.");

add("plate-copper-sulfate-na2hpo4-na2co3", "Carbonate-buffered copper phosphate precipitation",
  ["cuso4", "na2hpo4", "na2co3"], ["cu3-po4-2", "na2so4", "co2", "water"], -150.0,
  "Recovery of copper values as tertiary phosphate.");

add("plate-nickel-sulfate-na2hpo4-naoh", "Nickel phosphate precipitation: reaction of nickel sulfate with Na2HPO4 and NaOH",
  ["niso4", "na2hpo4", "naoh"], ["ni3-po4-2", "na2so4", "water"], -200.0,
  "Precipitation of nickel phosphate.");

add("plate-nickel-chloride-na2hpo4-naoh", "Reaction of nickel chloride with disodium phosphate and caustic soda",
  ["nicl2", "na2hpo4", "naoh"], ["ni3-po4-2", "nacl", "water"], -215.0,
  "Formation of nickel phosphate conversion coating.");

add("plate-nickel-sulfate-k2hpo4-koh", "Potassium-buffered nickel phosphate precipitation",
  ["niso4", "k2hpo4", "koh"], ["ni3-po4-2", "k2so4", "water"], -205.0,
  "Neutralization producing insoluble nickel phosphate.");

// =========================================================================
// Section 5: Chromium Plating & Hexavalent Reduction Chemistry (14)
// =========================================================================
add("plate-chrome-metabisulfite-reduction-na", "Chromium plating wastewater reduction: reduction of hexavalent dichromate by sodium metabisulfite",
  ["na2cr2o7", "na2s2o5", "h2so4"], ["cr2-so4-3", "na2so4", "water"], -720.0,
  "Automated redox reduction tank converting toxic carcinogenic Cr(VI) into Cr(III) at pH 2.0.", "single_displacement");

add("plate-chrome-metabisulfite-reduction-k", "Potassium dichromate reduction by sodium metabisulfite in sulfuric acid",
  ["k2cr2o7", "na2s2o5", "h2so4"], ["cr2-so4-3", "k2so4", "na2so4", "water"], -725.0,
  "Wastewater redox destruction of hexavalent chromium plating drag-out.", "single_displacement");

add("plate-chrome-ferrous-sulfate-reduction-na", "Wastewater treatment: reduction of sodium dichromate by ferrous sulfate",
  ["na2cr2o7", "feso4", "h2so4"], ["cr2-so4-3", "fe2-so4-3", "na2so4", "water"], -540.0,
  "Rapid stoichiometric redox reduction using waste pickling liquor ferrous sulfate.", "single_displacement");

add("plate-chrome-so2-reduction-na", "Gas-phase sulfur dioxide reduction of sodium dichromate in sulfuric acid",
  ["na2cr2o7", "so2", "h2so4"], ["cr2-so4-3", "na2so4", "water"], -610.0,
  "Industrial continuous flue gas reduction of hexavalent chromium plating wastewater.", "single_displacement");

add("plate-chrome-bisulfite-reduction-na", "Wastewater reduction: reduction of sodium dichromate by sodium bisulfite in sulfuric acid",
  ["na2cr2o7", "nahso3", "h2so4"], ["cr2-so4-3", "na2so4", "water"], -690.0,
  "Continuous sulfurous reduction of hexavalent chromium drag-out at pH 2.0-2.5.", "single_displacement");

add("plate-chromic-trioxide-so2-reduction", "Direct sulfur dioxide reduction of chromic acid trioxide to chromium(III) sulfate",
  ["cro3", "so2"], ["cr2-so4-3"], -780.0,
  "Thermal reduction of chromic acid mists captured in scrubber packings.", "synthesis");

add("plate-chromic-trioxide-h2s-reduction", "Hydrogen sulfide gas reduction of chromic acid mist",
  ["cro3", "h2s"], ["cr2o3", "s", "water"], -850.0,
  "Emergency dry gas abatement converting toxic CrO3 to insoluble chromium(III) oxide.");

add("plate-chromium-chloride-potash-precipitation", "Caustic potash precipitation of chromium hydroxide from trivalent chloride rinse",
  ["crcl3", "koh"], ["cr-oh-3", "kcl"], -118.0,
  "Hydroxide precipitation of chromium(III).");

add("plate-chromium-hydroxide-h2so4-redissolution", "Redissolution of chromium(III) hydroxide in sulfuric acid regenerating chromic sulfate",
  ["cr-oh-3", "h2so4"], ["cr2-so4-3", "water"], -185.0,
  "Re-acidification producing basic chromium sulfate for trivalent plating make-up.");

add("plate-chromium-hydroxide-hcl-redissolution", "Dissolution of chromium(III) hydroxide in hydrochloric acid",
  ["cr-oh-3", "hcl"], ["crcl3", "water"], -145.0,
  "Regeneration of trivalent chromium chloride electroplating salts.");

add("plate-chromate-lead-nitrate-precipitation-na", "Sodium chromate precipitation of lead chromate yellow pigment from plating effluent",
  ["na2cro4", "pbno32"], ["pbcro4", "nano3"], -65.0,
  "Scavenging residual chromate ions with lead nitrate forming insoluble chrome yellow pigment.");

add("plate-dichromate-lead-nitrate-precipitation-k", "Acidic precipitation of lead chromate from potassium dichromate and lead nitrate",
  ["k2cr2o7", "pbno32", "water"], ["pbcro4", "kno3", "hno3"], -45.0,
  "Acidic precipitation of insoluble lead chromate.");

add("plate-dichromate-lead-nitrate-precipitation-na", "Precipitation of lead chromate from sodium dichromate plating dragout",
  ["na2cr2o7", "pbno32", "water"], ["pbcro4", "nano3", "hno3"], -42.0,
  "Precipitation of lead chromate from dichromate rinses.");

add("plate-chromate-conversion-zinc-dichromate", "Hexavalent chromate conversion passivate on electrogalvanized zinc",
  ["zn", "na2cr2o7", "h2so4"], ["znso4", "cr2-so4-3", "na2so4", "water"], -1120.0,
  "Formation of yellow iridescent corrosion-resistant chromate conversion film on zinc plate.", "single_displacement");

// =========================================================================
// Section 6: Phosphating & Surface Conversion Coatings (14)
// =========================================================================
add("plate-iron-phosphate-ferric-chloride-na", "Iron phosphating conversion: precipitation of ferric phosphate by trisodium phosphate",
  ["fecl3", "na3po4"], ["fepo4", "nacl"], -110.0,
  "Formation of amorphous iron phosphate conversion layer on sheet steel providing paint adhesion.");

add("plate-iron-phosphate-ferric-chloride-k", "Precipitation of ferric phosphate using tripotassium phosphate",
  ["fecl3", "k3po4"], ["fepo4", "kcl"], -115.0,
  "Iron phosphating bath formulation.");

add("plate-iron-phosphate-ferric-sulfate-na", "Reaction of ferric sulfate with trisodium phosphate producing iron(III) phosphate",
  ["fe2-so4-3", "na3po4"], ["fepo4", "na2so4"], -210.0,
  "Precipitation of ferric phosphate from sulfate phosphating formulations.");

add("plate-iron-phosphate-ferric-sulfate-k", "Reaction of ferric sulfate with tripotassium phosphate",
  ["fe2-so4-3", "k3po4"], ["fepo4", "k2so4"], -215.0,
  "Precipitation of iron(III) phosphate.");

add("plate-aluminum-phosphate-precipitation-chloride", "Aluminum phosphating: precipitation of aluminum phosphate by trisodium phosphate",
  ["alcl3", "na3po4"], ["alpo4", "nacl"], -140.0,
  "Conversion coating improving paint adhesion on aluminum extrusion profiles.");

add("plate-aluminum-phosphate-precipitation-sulfate", "Reaction of aluminum sulfate with trisodium phosphate",
  ["al2-so4-3", "na3po4"], ["alpo4", "na2so4"], -265.0,
  "Precipitation of insoluble aluminum phosphate.");

add("plate-aluminum-phosphate-na2hpo4-naoh", "Aluminum phosphating with disodium phosphate and caustic soda",
  ["alcl3", "na2hpo4", "naoh"], ["alpo4", "nacl", "water"], -180.0,
  "Alkaline phosphating formulation for aluminum coils.");

add("plate-aluminum-phosphate-k2hpo4-koh", "Potassium-buffered aluminum phosphating conversion",
  ["alcl3", "k2hpo4", "koh"], ["alpo4", "kcl", "water"], -185.0,
  "Formation of insoluble aluminum orthophosphate primer coating.");

add("plate-iron-phosphate-ferric-chloride-na2hpo4", "Ferric chloride reaction with Na2HPO4 and NaOH generating iron phosphate",
  ["fecl3", "na2hpo4", "naoh"], ["fepo4", "nacl", "water"], -160.0,
  "Neutralized spray iron phosphating on stamped sheet metal.");

add("plate-iron-phosphate-ferric-chloride-k2hpo4", "Ferric chloride reaction with K2HPO4 and KOH",
  ["fecl3", "k2hpo4", "koh"], ["fepo4", "kcl", "water"], -165.0,
  "Potassium-buffered iron phosphating conversion.");

add("plate-iron-phosphate-sulfate-na2hpo4", "Ferric sulfate reaction with Na2HPO4 and NaOH",
  ["fe2-so4-3", "na2hpo4", "naoh"], ["fepo4", "na2so4", "water"], -290.0,
  "Sulfate-based iron phosphating conversion formulation.");

add("plate-iron-phosphate-sulfate-k2hpo4", "Ferric sulfate reaction with K2HPO4 and KOH",
  ["fe2-so4-3", "k2hpo4", "koh"], ["fepo4", "k2so4", "water"], -295.0,
  "Neutralized phosphating formulation for cold-rolled steel.");

add("plate-nickel-chloride-k2hpo4-koh", "Reaction of nickel chloride with dipotassium phosphate and KOH",
  ["nicl2", "k2hpo4", "koh"], ["ni3-po4-2", "kcl", "water"], -225.0,
  "Precipitation of nickel phosphate.");

add("plate-nickel-phosphate-carbonate-buffer", "Carbonate-buffered nickel phosphate precipitation",
  ["niso4", "na2hpo4", "na2co3"], ["ni3-po4-2", "na2so4", "co2", "water"], -160.0,
  "Formation of nickel phosphate conversion layer.");

// =========================================================================
// Section 7: Precious Metals, Anodizing & Surface Passivation (14)
// =========================================================================
add("plate-silver-nitric-electrolytic-strip", "Nitric acid chemical stripping of defective silver electrodeposits from copper base",
  ["ag", "hno3"], ["agno3", "no2", "water"], -62.0,
  "Chemical rack and parts stripping reclaiming precious silver from reject components.", "single_displacement");

add("plate-silver-hydroxide-oxide-precipitation", "Precipitation of silver(I) oxide from silver nitrate plating dragout by caustic soda",
  ["agno3", "naoh"], ["ag2o", "nano3", "water"], -45.0,
  "Precious metal refining precipitating brown silver oxide from spent cyanide-free silver baths.");

add("plate-silver-potash-oxide-precipitation", "Caustic potash precipitation of silver(I) oxide from silver plating effluent",
  ["agno3", "koh"], ["ag2o", "kno3", "water"], -48.0,
  "Alkaline precipitation recovering silver from dragout rinse tanks.");

add("plate-silver-oxide-hcl-precipitation", "Reaction of silver(I) oxide with hydrochloric acid forming silver chloride",
  ["ag2o", "hcl"], ["agcl", "water"], -115.0,
  "Conversion of silver oxide cake into pure silver chloride horn silver.");

add("plate-silver-oxide-hbr-precipitation", "Precipitation of pale yellow silver bromide from silver oxide and hydrobromic acid",
  ["ag2o", "hbr"], ["agbr", "water"], -125.0,
  "Conversion of reclaimed silver oxide into silver bromide.");

add("plate-silver-carbonate-precipitation-na", "Sodium carbonate precipitation of silver carbonate from dilute silver rinses",
  ["agno3", "na2co3"], ["ag2co3", "nano3"], -40.0,
  "Scavenging precious silver as light yellow silver carbonate.");

add("plate-silver-oxide-hi-precipitation", "Precipitation of bright yellow silver iodide from silver oxide and hydriodic acid",
  ["ag2o", "hi"], ["agi", "water"], -140.0,
  "Conversion of silver oxide cake into photographic and plating silver iodide.");

add("plate-silver-carbonate-nitric-dissolution", "Dissolution of silver carbonate in nitric acid regenerating silver nitrate",
  ["ag2co3", "hno3"], ["agno3", "co2", "water"], -68.0,
  "Purification step producing high-purity silver nitrate plating crystals.");

add("plate-pyrophosphate-bath-acidification-hcl", "Acidification of copper pyrophosphate bath: neutralization by hydrochloric acid",
  ["k4p2o7", "hcl"], ["kcl", "h4p2o7"], -95.0,
  "Waste treatment decomposing potassium pyrophosphate plating complex.");

add("plate-pyrophosphate-bath-acidification-h2so4", "Sulfuric acid decomposition of spent potassium pyrophosphate plating electrolyte",
  ["k4p2o7", "h2so4"], ["k2so4", "h4p2o7"], -110.0,
  "Demulsification and heavy metal precipitation pretreatment for pyrophosphate plating effluent.");

add("plate-silver-sulfate-precipitation-na", "Precipitation of sparingly soluble silver sulfate by sodium sulfate",
  ["agno3", "na2so4"], ["ag2so4", "nano3"], -22.0,
  "Fractional crystallization of silver sulfate plating salts.");

add("plate-silver-sulfate-precipitation-k", "Potassium sulfate precipitation of silver sulfate",
  ["agno3", "k2so4"], ["ag2so4", "kno3"], -24.0,
  "Sulfate precipitation of silver.");

add("plate-silver-tarnish-sulfide-formation", "Environmental tarnishing of decorative silver electroplate by hydrogen sulfide",
  ["ag", "h2s"], ["ag2s", "h2"], -28.0,
  "Atmospheric corrosion forming black silver sulfide tarnish film on electrical contacts.", "single_displacement");

add("plate-anodized-aluminum-sealing-boiling-water", "Hydrothermal sealing of sulfuric acid anodized aluminum: hydration of alumina to aluminum hydroxide",
  ["al2o3", "water"], ["al-oh-3"], -98.0,
  "Boiling DI water sealing at 98°C swelling anodic porous alumina into dense protective bayerite.", "synthesis");

console.log(`\nDomain 26 complete: ${list.length} reactions validated!`);

const outPath = path.resolve(__dirname, "domain26ElectroplatingFinishing.ts");
const code = `import type { ReactionDefinition } from "./types.js";

// Domain 26: Electroplating & Surface Conversion Finishing (100 reactions)
export const DOMAIN_26_ELECTROPLATING_REACTIONS: ReactionDefinition[] = ${JSON.stringify(list, null, 2)};
`;

fs.writeFileSync(outPath, code, "utf8");
console.log(`✓ Wrote ${list.length} reactions to domain26ElectroplatingFinishing.ts\n`);
