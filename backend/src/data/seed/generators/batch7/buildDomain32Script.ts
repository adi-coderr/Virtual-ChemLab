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
// Section 1: Flavor Esters & Saponification (20)
// =========================================================================
add("food-ester-banana-synth", "Fischer esterification: synthesis of isoamyl acetate (banana flavor)",
  ["c5h12o_isoamyl", "ch3cooh"], ["c7h14o2_isoamyl", "water"], -15.0,
  "Acid-catalyzed condensation producing characteristic banana/pear flavor aroma.", "synthesis");

add("food-ester-banana-hydrolysis", "Aqueous acid hydrolysis of isoamyl acetate",
  ["c7h14o2_isoamyl", "water"], ["c5h12o_isoamyl", "ch3cooh"], 15.0,
  "Ester cleavage regenerating isoamyl alcohol and acetic acid.");

add("food-ester-banana-sapon-naoh", "Base saponification of isoamyl acetate by sodium hydroxide",
  ["c7h14o2_isoamyl", "naoh"], ["c5h12o_isoamyl", "ch3coona"], -55.0,
  "Irreversible alkaline ester cleavage producing sodium acetate.");

add("food-ester-banana-sapon-koh", "Potassium hydroxide saponification of isoamyl acetate",
  ["c7h14o2_isoamyl", "koh"], ["c5h12o_isoamyl", "ch3cook"], -58.0,
  "Alkaline hydrolysis yielding potassium acetate.");

add("food-ester-banana-combustion", "Thermal combustion of isoamyl acetate flavor compound",
  ["c7h14o2_isoamyl", "o2"], ["co2", "water"], -4350.0,
  "Exothermic combustion.", "combustion");

add("food-isoamyl-alcohol-combustion", "Thermal combustion of isoamyl alcohol",
  ["c5h12o_isoamyl", "o2"], ["co2", "water"], -3320.0,
  "Combustion of fusel oil alcohol.", "combustion");

add("food-ester-pineapple-synth", "Fischer esterification: ethyl butyrate (pineapple flavor) synthesis",
  ["c2h5oh", "c3h7cooh"], ["c6h12o2_ethylbutyrate", "water"], -14.0,
  "Synthesis of sweet tropical pineapple aroma ester.", "synthesis");

add("food-ester-pineapple-hydrolysis", "Acid hydrolysis of ethyl butyrate",
  ["c6h12o2_ethylbutyrate", "water"], ["c2h5oh", "c3h7cooh"], 14.0,
  "Reversible ester hydrolysis regenerating butyric acid and ethanol.");

add("food-ester-pineapple-sapon-naoh", "Saponification of ethyl butyrate by caustic soda",
  ["c6h12o2_ethylbutyrate", "naoh"], ["c2h5oh", "c3h7coona"], -52.0,
  "Alkaline hydrolysis yielding sodium butyrate.");

add("food-ester-pineapple-sapon-koh", "Potassium hydroxide saponification of ethyl butyrate",
  ["c6h12o2_ethylbutyrate", "koh"], ["c2h5oh", "c3h7cook"], -54.0,
  "Alkaline cleavage yielding potassium butyrate.");

add("food-ester-pineapple-combustion", "Thermal combustion of ethyl butyrate",
  ["c6h12o2_ethylbutyrate", "o2"], ["co2", "water"], -3650.0,
  "Combustion.", "combustion");

add("food-ester-orange-synth", "Synthesis of octyl acetate (orange flavor) from 1-octanol and acetic acid",
  ["c8h18o_octanol", "ch3cooh"], ["c8h16o2_octylacetate", "water"], -16.0,
  "Esterification producing citrus orange peel aroma.", "synthesis");

add("food-ester-orange-hydrolysis", "Aqueous hydrolysis of octyl acetate",
  ["c8h16o2_octylacetate", "water"], ["c8h18o_octanol", "ch3cooh"], 16.0,
  "Ester cleavage regenerating 1-octanol.");

add("food-ester-orange-sapon-naoh", "Caustic saponification of octyl acetate",
  ["c8h16o2_octylacetate", "naoh"], ["c8h18o_octanol", "ch3coona"], -56.0,
  "Base-promoted cleavage of octyl ester.");

add("food-ester-orange-sapon-koh", "Potassium hydroxide saponification of octyl acetate",
  ["c8h16o2_octylacetate", "koh"], ["c8h18o_octanol", "ch3cook"], -58.0,
  "Alkaline saponification.");

add("food-octanol-combustion", "Thermal combustion of 1-octanol",
  ["c8h18o_octanol", "o2"], ["co2", "water"], -5280.0,
  "Exothermic combustion.", "combustion");

add("food-ester-orange-combustion", "Complete combustion of octyl acetate",
  ["c8h16o2_octylacetate", "o2"], ["co2", "water"], -6250.0,
  "Combustion.", "combustion");

add("food-isoamyl-nitric-oxidation", "Nitric acid oxidation of isoamyl alcohol",
  ["c5h12o_isoamyl", "hno3"], ["co2", "no2", "water"], -2450.0,
  "Oxidative destruction.");

add("food-octanol-nitric-oxidation", "Nitric acid oxidation of 1-octanol",
  ["c8h18o_octanol", "hno3"], ["co2", "no2", "water"], -3850.0,
  "Exhaustive nitric oxidation.");

add("food-ethylbutyrate-nitric-oxidation", "Nitric acid oxidative cleavage of ethyl butyrate",
  ["c6h12o2_ethylbutyrate", "hno3"], ["co2", "no2", "water"], -2750.0,
  "Acid digestion.");

// =========================================================================
// Section 2: Tartaric Acid, Bitartrate & Rochelle Salt (15)
// =========================================================================
add("food-tartaric-cream-of-tartar-koh", "Precipitation of cream of tartar (potassium bitartrate) by KOH",
  ["c4h6o6_tartaric", "koh"], ["k-h-c4h4o6", "water"], -58.0,
  "Controlled neutralization precipitating crystalline cream of tartar.", "precipitation");

add("food-tartaric-khco3-precipitation", "Precipitation of potassium bitartrate using potassium bicarbonate",
  ["c4h6o6_tartaric", "khco3"], ["k-h-c4h4o6", "co2", "water"], -42.0,
  "Wine stabilization reaction precipitating wine diamonds.", "precipitation");

add("food-tartaric-k2co3-precipitation", "Potassium carbonate neutralization yielding potassium bitartrate",
  ["c4h6o6_tartaric", "k2co3"], ["k-h-c4h4o6", "khco3"], -35.0,
  "Partial neutralization.");

add("food-rochelle-salt-naoh-synth", "Synthesis of Rochelle salt (potassium sodium tartrate) using NaOH",
  ["k-h-c4h4o6", "naoh"], ["kna-c4h4o6", "water"], -54.0,
  "Neutralization of cream of tartar producing piezoelectric Rochelle salt crystals.", "synthesis");

add("food-rochelle-salt-nahco3-synth", "Synthesis of Rochelle salt using sodium bicarbonate",
  ["k-h-c4h4o6", "nahco3"], ["kna-c4h4o6", "co2", "water"], -38.0,
  "Effervescent synthesis of potassium sodium tartrate.", "synthesis");

add("food-rochelle-salt-na2co3-synth", "Synthesis of Rochelle salt using soda ash",
  ["k-h-c4h4o6", "na2co3"], ["kna-c4h4o6", "nahco3"], -32.0,
  "Carbonate neutralization producing Rochelle salt.");

add("food-tartaric-acid-combustion", "Thermal combustion of tartaric acid",
  ["c4h6o6_tartaric", "o2"], ["co2", "water"], -1150.0,
  "Combustion of wine acid.", "combustion");

add("food-cream-of-tartar-combustion", "Combustion of potassium bitartrate producing potassium carbonate",
  ["k-h-c4h4o6", "o2"], ["k2co3", "co2", "water"], -1650.0,
  "Oxidative ashing of cream of tartar.", "combustion");

add("food-rochelle-salt-combustion", "Thermal combustion of Rochelle salt",
  ["kna-c4h4o6", "o2"], ["k2co3", "na2co3", "co2", "water"], -1850.0,
  "Ashing producing mixed alkali carbonates.", "combustion");

add("food-tartaric-disodium-salt", "Complete neutralization of tartaric acid to disodium tartrate",
  ["c4h6o6_tartaric", "naoh"], ["c4h4o6na2", "water"], -112.0,
  "Neutralization yielding food emulsifier sodium tartrate.", "acid_base_neutralization");

add("food-cream-tartar-acid-hcl", "Acidification of potassium bitartrate with hydrochloric acid",
  ["k-h-c4h4o6", "hcl"], ["c4h6o6_tartaric", "kcl"], -14.0,
  "Acid displacement liberating free tartaric acid.", "acid_base_neutralization");

add("food-cream-tartar-acid-h2so4", "Sulfuric acid acidification of potassium bitartrate",
  ["k-h-c4h4o6", "h2so4"], ["c4h6o6_tartaric", "k2so4"], -16.0,
  "Industrial recovery of tartaric acid from wine lees.", "acid_base_neutralization");

add("food-cream-tartar-acid-hno3", "Nitric acid reaction with potassium bitartrate",
  ["k-h-c4h4o6", "hno3"], ["c4h6o6_tartaric", "kno3"], -15.0,
  "Acid metathesis generating potassium nitrate.", "acid_base_neutralization");

add("food-rochelle-salt-acid-hcl", "Hydrochloric acid acidification of Rochelle salt",
  ["kna-c4h4o6", "hcl"], ["c4h6o6_tartaric", "nacl", "kcl"], -22.0,
  "Acid decomposition.", "acid_base_neutralization");

add("food-rochelle-salt-acid-h2so4", "Sulfuric acid decomposition of Rochelle salt",
  ["kna-c4h4o6", "h2so4"], ["c4h6o6_tartaric", "na2so4", "k2so4"], -25.0,
  "Acid decomposition yielding mixed sulfates.", "acid_base_neutralization");

// =========================================================================
// Section 3: Citric Acid, Triethyl Citrate & Buffers (15)
// =========================================================================
add("food-citric-neutralize-naoh", "Complete neutralization of citric acid to trisodium citrate",
  ["c6h8o7_citric", "naoh"], ["na3-c6h5o7", "water"], -165.0,
  "Triprotic neutralization producing sour salt buffering agent.", "acid_base_neutralization");

add("food-citric-bathbomb-nahco3", "Effervescent reaction of citric acid and sodium bicarbonate",
  ["c6h8o7_citric", "nahco3"], ["na3-c6h5o7", "co2", "water"], -85.0,
  "Classic bath bomb and antacid effervescent CO2 evolution.", "gas_evolution");

add("food-citric-na2co3-reaction", "Neutralization of citric acid by sodium carbonate",
  ["c6h8o7_citric", "na2co3"], ["na3-c6h5o7", "co2", "water"], -95.0,
  "Effervescent neutralization yielding trisodium citrate.", "gas_evolution");

add("food-triethyl-citrate-synth", "Synthesis of triethyl citrate plasticizer/flavor from citric acid and ethanol",
  ["c6h8o7_citric", "c2h5oh"], ["c12h20o7", "water"], -35.0,
  "Esterification producing food additive triethyl citrate (E1505).", "synthesis");

add("food-triethyl-citrate-hydrolysis", "Aqueous hydrolysis of triethyl citrate",
  ["c12h20o7", "water"], ["c6h8o7_citric", "c2h5oh"], 35.0,
  "Hydrolysis regenerating citric acid and ethanol.");

add("food-triethyl-citrate-sapon-naoh", "Alkaline saponification of triethyl citrate",
  ["c12h20o7", "naoh"], ["na3-c6h5o7", "c2h5oh"], -145.0,
  "Alkaline ester cleavage yielding trisodium citrate.");

add("food-triethyl-citrate-combustion", "Thermal combustion of triethyl citrate",
  ["c12h20o7", "o2"], ["co2", "water"], -6450.0,
  "Combustion.", "combustion");

add("food-citrate-acid-hcl", "Acidification of trisodium citrate by hydrochloric acid",
  ["na3-c6h5o7", "hcl"], ["c6h8o7_citric", "nacl"], -24.0,
  "Acid displacement regenerating citric acid.", "acid_base_neutralization");

add("food-citrate-acid-h2so4", "Sulfuric acid conversion of trisodium citrate to citric acid",
  ["na3-c6h5o7", "h2so4"], ["c6h8o7_citric", "na2so4"], -28.0,
  "Industrial acid recovery of citric acid.", "acid_base_neutralization");

add("food-citrate-acid-hno3", "Nitric acid acidification of trisodium citrate",
  ["na3-c6h5o7", "hno3"], ["c6h8o7_citric", "nano3"], -25.0,
  "Acid metathesis generating sodium nitrate.", "acid_base_neutralization");

add("food-citric-acid-combustion", "Thermal combustion of citric acid",
  ["c6h8o7_citric", "o2"], ["co2", "water"], -1960.0,
  "Combustion.", "combustion");

add("food-trisodium-citrate-combustion", "Thermal combustion of trisodium citrate",
  ["na3-c6h5o7", "o2"], ["na2co3", "co2", "water"], -2480.0,
  "Ashing yielding sodium carbonate.", "combustion");

add("food-citric-nitric-oxidation", "Nitric acid oxidative digestion of citric acid",
  ["c6h8o7_citric", "hno3"], ["co2", "no2", "water"], -1650.0,
  "Nitric acid oxidation.");

add("food-trisodium-citrate-peroxide", "Peroxide oxidative degradation of sodium citrate",
  ["na3-c6h5o7", "h2o2"], ["na2co3", "co2", "water"], -1850.0,
  "Oxidative destruction.");

add("food-citric-peroxide-cleavage", "Fenton oxidative cleavage of citric acid",
  ["c6h8o7_citric", "h2o2"], ["co2", "water"], -1950.0,
  "Hydroxyl radical oxidation.");

// =========================================================================
// Section 4: Lactic Acid, Fermentation & Lactates (15)
// =========================================================================
add("food-lactic-neutralize-naoh", "Neutralization of lactic acid to sodium lactate",
  ["c3h6o3_lactic", "naoh"], ["c3h5o3na", "water"], -56.0,
  "Synthesis of food humectant sodium lactate (E325).", "acid_base_neutralization");

add("food-lactic-nahco3-reaction", "Reaction of lactic acid with sodium bicarbonate",
  ["c3h6o3_lactic", "nahco3"], ["c3h5o3na", "co2", "water"], -38.0,
  "Effervescent neutralization liberating carbon dioxide.", "gas_evolution");

add("food-lactic-na2co3-reaction", "Neutralization of lactic acid by sodium carbonate",
  ["c3h6o3_lactic", "na2co3"], ["c3h5o3na", "co2", "water"], -42.0,
  "Synthesis of sodium lactate buffer.", "gas_evolution");

add("food-sodium-lactate-acid-hcl", "Acidification of sodium lactate with hydrochloric acid",
  ["c3h5o3na", "hcl"], ["c3h6o3_lactic", "nacl"], -12.0,
  "Regeneration of free lactic acid.", "acid_base_neutralization");

add("food-sodium-lactate-acid-h2so4", "Sulfuric acid acidification of sodium lactate",
  ["c3h5o3na", "h2so4"], ["c3h6o3_lactic", "na2so4"], -14.0,
  "Acid displacement producing sodium sulfate.", "acid_base_neutralization");

add("food-sodium-lactate-acid-hno3", "Nitric acid acidification of sodium lactate",
  ["c3h5o3na", "hno3"], ["c3h6o3_lactic", "nano3"], -13.0,
  "Acid metathesis generating sodium nitrate.", "acid_base_neutralization");

add("food-lactic-acid-combustion", "Complete combustion of lactic acid",
  ["c3h6o3_lactic", "o2"], ["co2", "water"], -1360.0,
  "Metabolic and thermal combustion.", "combustion");

add("food-sodium-lactate-combustion", "Thermal combustion of sodium lactate",
  ["c3h5o3na", "o2"], ["na2co3", "co2", "water"], -1650.0,
  "Ashing yielding sodium carbonate.", "combustion");

add("food-lactic-nitric-oxidation", "Nitric acid oxidation of lactic acid",
  ["c3h6o3_lactic", "hno3"], ["co2", "no2", "water"], -1150.0,
  "Acid digestion liberating nitrogen dioxide.");

add("food-lactic-sulfuric-decarboxylation", "Thermal acid decarbonylation of lactic acid yielding acetaldehyde",
  ["c3h6o3_lactic"], ["co", "ch3cho", "water"], 45.0,
  "Decarbonylation yielding acetaldehyde flavor and carbon monoxide.", "decomposition");

add("food-lactic-permanganate-oxidation", "Permanganate oxidation of lactic acid to acetic acid",
  ["c3h6o3_lactic", "kmno4", "h2so4"], ["ch3cooh", "co2", "mnso4", "k2so4", "water"], -420.0,
  "Oxidative cleavage of alpha-hydroxy acid.");

add("food-lactic-dichromate-oxidation", "Acid dichromate oxidation of lactic acid to acetic acid",
  ["c3h6o3_lactic", "k2cr2o7", "h2so4"], ["ch3cooh", "co2", "cr2-so4-3", "k2so4", "water"], -390.0,
  "Chromic acid cleavage.");

add("food-lactic-peroxide-oxidation", "Fenton oxidation of lactic acid yielding acetic acid and CO2",
  ["c3h6o3_lactic", "h2o2"], ["ch3cooh", "co2", "water"], -280.0,
  "Peroxide oxidative cleavage.");

add("food-lactic-chlorine-oxidation", "Chlorine oxidation of lactic acid in water",
  ["c3h6o3_lactic", "cl2", "water"], ["ch3cooh", "co2", "hcl"], -240.0,
  "Halogen oxidation.");

add("food-lactic-bromine-oxidation", "Bromine oxidation of lactic acid",
  ["c3h6o3_lactic", "br2", "water"], ["ch3cooh", "co2", "hbr"], -210.0,
  "Halogen oxidation.");

// =========================================================================
// Section 5: Ascorbic Acid (Vitamin C) Redox & Titrations (15)
// =========================================================================
add("food-vitc-iodine-titration", "Iodometric titration: oxidation of ascorbic acid to dehydroascorbic acid by iodine",
  ["c6h8o6_ascorbic", "i2"], ["c6h6o6_dehydroascorbic", "hi"], -85.0,
  "Standard analytical redox titration of Vitamin C with starch endpoint.", "redox_other",
  [{ type: "color_change", colorFrom: "#2C3E50", colorTo: "#FFFFFF", description: "Blue-black iodine-starch complex decolorizes" }]);

add("food-vitc-bromine-oxidation", "Bromine oxidation of ascorbic acid",
  ["c6h8o6_ascorbic", "br2"], ["c6h6o6_dehydroascorbic", "hbr"], -110.0,
  "Rapid decolorization of brown bromine water.", "redox_other",
  [{ type: "color_change", colorFrom: "#B03A2E", colorTo: "#FFFFFF", description: "Brown-orange bromine water is instantly bleached" }]);

add("food-vitc-chlorine-oxidation", "Chlorine water oxidation of Vitamin C",
  ["c6h8o6_ascorbic", "cl2"], ["c6h6o6_dehydroascorbic", "hcl"], -145.0,
  "Antioxidant scavenging of free active chlorine.");

add("food-vitc-peroxide-scavenging", "Hydrogen peroxide scavenging by ascorbic acid",
  ["c6h8o6_ascorbic", "h2o2"], ["c6h6o6_dehydroascorbic", "water"], -195.0,
  "Primary biological antioxidant defense reducing reactive peroxide to water.");

add("food-vitc-aerobic-autoxidation", "Aerobic autoxidation of Vitamin C to dehydroascorbic acid and H2O2",
  ["c6h8o6_ascorbic", "o2"], ["c6h6o6_dehydroascorbic", "h2o2"], -65.0,
  "Atmospheric oxidation responsible for Vitamin C degradation in stored fruit juices.");

add("food-vitc-iron-reduction", "Ferric iron reduction: ascorbic acid reduces FeCl3 to FeCl2",
  ["c6h8o6_ascorbic", "fecl3"], ["c6h6o6_dehydroascorbic", "fecl2", "hcl"], -120.0,
  "Dietary mechanism enhancing non-heme iron absorption by reducing Fe(III) to soluble Fe(II).");

add("food-vitc-copper-reduction", "Cupric copper reduction by ascorbic acid generating cuprous chloride",
  ["c6h8o6_ascorbic", "cucl2"], ["c6h6o6_dehydroascorbic", "cucl", "hcl"], -95.0,
  "Trace copper catalyzed oxidation of Vitamin C.");

add("food-vitc-silver-mirror", "Silver mirror reaction: reduction of silver nitrate by ascorbic acid",
  ["c6h8o6_ascorbic", "agno3"], ["c6h6o6_dehydroascorbic", "ag", "hno3"], -165.0,
  "Rapid reduction depositing metallic silver mirror.", "precipitation",
  [{ type: "precipitation", colorTo: "#BDC3C7", description: "Lustrous silver mirror deposits on glass" }]);

add("food-vitc-permanganate-titration", "Acid permanganate titration of ascorbic acid",
  ["c6h8o6_ascorbic", "kmno4", "h2so4"], ["c6h6o6_dehydroascorbic", "mnso4", "k2so4", "water"], -380.0,
  "Redox titration bleaching deep purple permanganate.", "redox_other",
  [{ type: "color_change", colorFrom: "#7D3C98", colorTo: "#FFFFFF", description: "Intense purple permanganate is bleached clear" }]);

add("food-vitc-dichromate-titration", "Acid dichromate oxidation of Vitamin C",
  ["c6h8o6_ascorbic", "k2cr2o7", "h2so4"], ["c6h6o6_dehydroascorbic", "cr2-so4-3", "k2so4", "water"], -340.0,
  "Colorimetric reduction turning orange dichromate into green chromium(III).", "redox_other",
  [{ type: "color_change", colorFrom: "#E67E22", colorTo: "#27AE60", description: "Orange solution shifts to deep green Cr(III)" }]);

add("food-vitc-ozone-oxidation", "Ozone oxidation of ascorbic acid to dehydroascorbic acid",
  ["c6h8o6_ascorbic", "o3"], ["c6h6o6_dehydroascorbic", "o2", "water"], -310.0,
  "Rapid ozonolysis oxidation of vitamin C antioxidant.", "redox_other");

add("food-dehydroascorbic-combustion", "Thermal combustion of dehydroascorbic acid",
  ["c6h6o6_dehydroascorbic", "o2"], ["co2", "water"], -2180.0,
  "Combustion.", "combustion");

add("food-vitc-nitric-oxidation", "Nitric acid oxidation of ascorbic acid",
  ["c6h8o6_ascorbic", "hno3"], ["co2", "no2", "water"], -1850.0,
  "Acid digestion liberating nitrogen dioxide.");

add("food-dehydroascorbic-nitric-oxidation", "Nitric acid oxidation of dehydroascorbic acid",
  ["c6h6o6_dehydroascorbic", "hno3"], ["co2", "no2", "water"], -1750.0,
  "Acid oxidation.");

add("food-vitc-catalytic-hydrogenation", "Catalytic hydrogenation of dehydroascorbic acid regenerating Vitamin C",
  ["c6h6o6_dehydroascorbic", "h2"], ["c6h8o6_ascorbic"], -85.0,
  "Stereospecific reduction regenerating ascorbic acid.", "synthesis");

// =========================================================================
// Section 6: Benzoic Acid & Sodium Benzoate Preservatives (10)
// =========================================================================
add("food-benzoic-neutralize-naoh", "Synthesis of sodium benzoate food preservative (E211) using NaOH",
  ["c7h6o2_benzoic", "naoh"], ["c7h5o2na_sodium_benzoate", "water"], -58.0,
  "Neutralization isolating water-soluble antimicrobial sodium benzoate.", "acid_base_neutralization");

add("food-benzoic-nahco3-reaction", "Neutralization of benzoic acid with sodium bicarbonate",
  ["c7h6o2_benzoic", "nahco3"], ["c7h5o2na_sodium_benzoate", "co2", "water"], -42.0,
  "Effervescent neutralization liberating carbon dioxide.", "gas_evolution");

add("food-benzoic-na2co3-reaction", "Reaction of benzoic acid with sodium carbonate",
  ["c7h6o2_benzoic", "na2co3"], ["c7h5o2na_sodium_benzoate", "nahco3"], -34.0,
  "Carbonate neutralization producing sodium benzoate.");

add("food-benzoate-acid-precipitation-hcl", "Acidification of sodium benzoate causing precipitation of benzoic acid",
  ["c7h5o2na_sodium_benzoate", "hcl"], ["c7h6o2_benzoic", "nacl"], -16.0,
  "Acidification triggering dense white needle crystals of benzoic acid.", "precipitation",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "White crystalline needles of benzoic acid precipitate" }]);

add("food-benzoate-acid-precipitation-h2so4", "Sulfuric acid precipitation of benzoic acid from benzoate preservative",
  ["c7h5o2na_sodium_benzoate", "h2so4"], ["c7h6o2_benzoic", "na2so4"], -18.0,
  "Precipitation of insoluble benzoic acid crystals.", "precipitation",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "White needles of benzoic acid precipitate" }]);

add("food-benzoate-acid-precipitation-hno3", "Nitric acid acidification of sodium benzoate",
  ["c7h5o2na_sodium_benzoate", "hno3"], ["c7h6o2_benzoic", "nano3"], -15.0,
  "Acid metathesis isolating crystalline benzoic acid.", "precipitation");

add("food-benzoic-acid-combustion", "Thermal combustion of benzoic acid",
  ["c7h6o2_benzoic", "o2"], ["co2", "water"], -3220.0,
  "Standard bomb calorimetry primary reference combustion.", "combustion");

add("food-sodium-benzoate-combustion", "Thermal combustion of sodium benzoate preservative",
  ["c7h5o2na_sodium_benzoate", "o2"], ["na2co3", "co2", "water"], -3450.0,
  "Ashing yielding sodium carbonate.", "combustion");

add("food-benzoic-nitric-oxidation", "Nitric acid oxidation of benzoic acid",
  ["c7h6o2_benzoic", "hno3"], ["co2", "no2", "water"], -2650.0,
  "Exhaustive nitric oxidation.");

add("food-sodium-benzoate-decarboxylation", "Soda lime decarboxylation of sodium benzoate preservative to benzene",
  ["c7h5o2na_sodium_benzoate", "naoh"], ["c6h6", "na2co3"], -112.0,
  "Thermal decarboxylation producing benzene hydrocarbon.");

// =========================================================================
// Section 7: Sugar Respiration, Glycolysis & Byproducts (10)
// =========================================================================
add("food-maltose-combustion", "Complete combustion of maltose carbohydrate",
  ["c12h22o11_maltose", "o2"], ["co2", "water"], -5640.0,
  "Bomb calorimetry combustion of malt sugar.", "combustion");

add("food-ethanol-cuo-dehydrogenation", "Vapor phase oxidation/dehydrogenation of fermentation ethanol over copper(II) oxide",
  ["c2h5oh", "cuo"], ["ch3cho", "cu", "water"], -178.0,
  "Hot copper oxide dehydrogenation of alcohol to acetaldehyde with copper metal mirror.", "redox_other",
  [{ type: "color_change", colorFrom: "#111111", colorTo: "#D35400", description: "Black CuO reduces to reddish-copper metallic sheen" }]);

add("food-glycerol-permanganate-hypergolic", "Hypergolic oxidation of fermentation glycerol byproduct by potassium permanganate",
  ["c3h8o3", "kmno4"], ["k2co3", "mn2o3", "co2", "water"], -1850.0,
  "Spontaneous hypergolic combustion producing intense purple flames and steam.", "redox_other",
  [{ type: "color_change", colorFrom: "#4A0E4E", colorTo: "#2C3E50", description: "Intense purple permanganate ignites producing smoke and brownish manganese(III) residue" }]);

add("food-butyric-acid-nahco3", "Effervescent neutralization of butyric acid with sodium bicarbonate",
  ["c3h7cooh", "nahco3"], ["c3h7coona", "co2", "water"], -41.0,
  "Neutralization buffering rancid butyric acid into sodium butyrate with vigorous CO2 gas evolution.", "gas_evolution",
  [{ type: "gas_evolution", gasColor: "#FFFFFF", description: "Vigorous fizzing and carbon dioxide evolution" }]);

add("food-glycerol-nitric-oxidation", "Nitric acid oxidation of glycerol",
  ["c3h8o3", "hno3"], ["co2", "no2", "water"], -1350.0,
  "Acid digestion.");

add("food-butyric-acid-nitric-oxidation", "Nitric acid oxidation of butyric acid",
  ["c3h7cooh", "hno3"], ["co2", "no2", "water"], -1780.0,
  "Acid oxidation.");

add("food-sodium-butyrate-acid-hcl", "Acidification of sodium butyrate by hydrochloric acid",
  ["c3h7coona", "hcl"], ["c3h7cooh", "nacl"], -15.0,
  "Liberation of pungent butyric acid.", "gas_evolution");

add("food-sodium-butyrate-acid-h2so4", "Sulfuric acid acidification of sodium butyrate",
  ["c3h7coona", "h2so4"], ["c3h7cooh", "na2so4"], -18.0,
  "Acid displacement regenerating butyric acid.", "gas_evolution");

add("food-potassium-butyrate-acid-hcl", "Hydrochloric acid acidification of potassium butyrate",
  ["c3h7cook", "hcl"], ["c3h7cooh", "kcl"], -16.0,
  "Acidification releasing butyric acid.", "gas_evolution");

add("food-potassium-butyrate-acid-h2so4", "Sulfuric acid reaction with potassium butyrate",
  ["c3h7cook", "h2so4"], ["c3h7cooh", "k2so4"], -19.0,
  "Acid metathesis liberating butyric acid.", "gas_evolution");

console.log(`Domain 32 complete: ${list.length} reactions validated!`);

const targetFile = path.resolve(__dirname, "./domain32FoodFlavorsBiochem.ts");
const code = `// Domain 32: Food Chemistry, Flavors & Fermentation (${list.length} reactions)
import { addReaction } from "./generateBatch7.js";

export function buildDomain32FoodFlavorsBiochem(): void {
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
console.log(`✓ Wrote ${list.length} reactions to domain32FoodFlavorsBiochem.ts`);
