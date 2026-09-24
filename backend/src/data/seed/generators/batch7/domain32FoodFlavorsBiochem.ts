// Domain 32: Food Chemistry, Flavors & Fermentation (100 reactions)
import { addReaction } from "./generateBatch7.js";

export function buildDomain32FoodFlavorsBiochem(): void {
  const reactions = [
  {
    "id": "food-ester-banana-synth",
    "name": "Fischer esterification: synthesis of isoamyl acetate (banana flavor)",
    "reactants": [
      "c5h12o_isoamyl",
      "ch3cooh"
    ],
    "products": [
      "c7h14o2_isoamyl",
      "water"
    ],
    "enthalpy": -15,
    "desc": "Acid-catalyzed condensation producing characteristic banana/pear flavor aroma.",
    "type": "synthesis",
    "effects": [],
    "net": "C5H12O + CH3COOH → C7H14O2 + H2O"
  },
  {
    "id": "food-ester-banana-hydrolysis",
    "name": "Aqueous acid hydrolysis of isoamyl acetate",
    "reactants": [
      "c7h14o2_isoamyl",
      "water"
    ],
    "products": [
      "c5h12o_isoamyl",
      "ch3cooh"
    ],
    "enthalpy": 15,
    "desc": "Ester cleavage regenerating isoamyl alcohol and acetic acid.",
    "type": "redox_other",
    "effects": [],
    "net": "C7H14O2 + H2O → C5H12O + CH3COOH"
  },
  {
    "id": "food-ester-banana-sapon-naoh",
    "name": "Base saponification of isoamyl acetate by sodium hydroxide",
    "reactants": [
      "c7h14o2_isoamyl",
      "naoh"
    ],
    "products": [
      "c5h12o_isoamyl",
      "ch3coona"
    ],
    "enthalpy": -55,
    "desc": "Irreversible alkaline ester cleavage producing sodium acetate.",
    "type": "redox_other",
    "effects": [],
    "net": "C7H14O2 + NaOH → C5H12O + CH3COONa"
  },
  {
    "id": "food-ester-banana-sapon-koh",
    "name": "Potassium hydroxide saponification of isoamyl acetate",
    "reactants": [
      "c7h14o2_isoamyl",
      "koh"
    ],
    "products": [
      "c5h12o_isoamyl",
      "ch3cook"
    ],
    "enthalpy": -58,
    "desc": "Alkaline hydrolysis yielding potassium acetate.",
    "type": "redox_other",
    "effects": [],
    "net": "C7H14O2 + KOH → C5H12O + CH3COOK"
  },
  {
    "id": "food-ester-banana-combustion",
    "name": "Thermal combustion of isoamyl acetate flavor compound",
    "reactants": [
      "c7h14o2_isoamyl",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -4350,
    "desc": "Exothermic combustion.",
    "type": "combustion",
    "effects": [],
    "net": "2 C7H14O2 + 19 O2 → 14 CO2 + 14 H2O"
  },
  {
    "id": "food-isoamyl-alcohol-combustion",
    "name": "Thermal combustion of isoamyl alcohol",
    "reactants": [
      "c5h12o_isoamyl",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -3320,
    "desc": "Combustion of fusel oil alcohol.",
    "type": "combustion",
    "effects": [],
    "net": "2 C5H12O + 15 O2 → 10 CO2 + 12 H2O"
  },
  {
    "id": "food-ester-pineapple-synth",
    "name": "Fischer esterification: ethyl butyrate (pineapple flavor) synthesis",
    "reactants": [
      "c2h5oh",
      "c3h7cooh"
    ],
    "products": [
      "c6h12o2_ethylbutyrate",
      "water"
    ],
    "enthalpy": -14,
    "desc": "Synthesis of sweet tropical pineapple aroma ester.",
    "type": "synthesis",
    "effects": [],
    "net": "C2H5OH + C3H7COOH → C6H12O2 + H2O"
  },
  {
    "id": "food-ester-pineapple-hydrolysis",
    "name": "Acid hydrolysis of ethyl butyrate",
    "reactants": [
      "c6h12o2_ethylbutyrate",
      "water"
    ],
    "products": [
      "c2h5oh",
      "c3h7cooh"
    ],
    "enthalpy": 14,
    "desc": "Reversible ester hydrolysis regenerating butyric acid and ethanol.",
    "type": "redox_other",
    "effects": [],
    "net": "C6H12O2 + H2O → C2H5OH + C3H7COOH"
  },
  {
    "id": "food-ester-pineapple-sapon-naoh",
    "name": "Saponification of ethyl butyrate by caustic soda",
    "reactants": [
      "c6h12o2_ethylbutyrate",
      "naoh"
    ],
    "products": [
      "c2h5oh",
      "c3h7coona"
    ],
    "enthalpy": -52,
    "desc": "Alkaline hydrolysis yielding sodium butyrate.",
    "type": "redox_other",
    "effects": [],
    "net": "C6H12O2 + NaOH → C2H5OH + C3H7COONa"
  },
  {
    "id": "food-ester-pineapple-sapon-koh",
    "name": "Potassium hydroxide saponification of ethyl butyrate",
    "reactants": [
      "c6h12o2_ethylbutyrate",
      "koh"
    ],
    "products": [
      "c2h5oh",
      "c3h7cook"
    ],
    "enthalpy": -54,
    "desc": "Alkaline cleavage yielding potassium butyrate.",
    "type": "redox_other",
    "effects": [],
    "net": "C6H12O2 + KOH → C2H5OH + C3H7COOK"
  },
  {
    "id": "food-ester-pineapple-combustion",
    "name": "Thermal combustion of ethyl butyrate",
    "reactants": [
      "c6h12o2_ethylbutyrate",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -3650,
    "desc": "Combustion.",
    "type": "combustion",
    "effects": [],
    "net": "C6H12O2 + 8 O2 → 6 CO2 + 6 H2O"
  },
  {
    "id": "food-ester-orange-synth",
    "name": "Synthesis of octyl acetate (orange flavor) from 1-octanol and acetic acid",
    "reactants": [
      "c8h18o_octanol",
      "ch3cooh"
    ],
    "products": [
      "c8h16o2_octylacetate",
      "water"
    ],
    "enthalpy": -16,
    "desc": "Esterification producing citrus orange peel aroma.",
    "type": "synthesis",
    "effects": [],
    "net": "C8H18O + CH3COOH → C10H20O2 + H2O"
  },
  {
    "id": "food-ester-orange-hydrolysis",
    "name": "Aqueous hydrolysis of octyl acetate",
    "reactants": [
      "c8h16o2_octylacetate",
      "water"
    ],
    "products": [
      "c8h18o_octanol",
      "ch3cooh"
    ],
    "enthalpy": 16,
    "desc": "Ester cleavage regenerating 1-octanol.",
    "type": "redox_other",
    "effects": [],
    "net": "C10H20O2 + H2O → C8H18O + CH3COOH"
  },
  {
    "id": "food-ester-orange-sapon-naoh",
    "name": "Caustic saponification of octyl acetate",
    "reactants": [
      "c8h16o2_octylacetate",
      "naoh"
    ],
    "products": [
      "c8h18o_octanol",
      "ch3coona"
    ],
    "enthalpy": -56,
    "desc": "Base-promoted cleavage of octyl ester.",
    "type": "redox_other",
    "effects": [],
    "net": "C10H20O2 + NaOH → C8H18O + CH3COONa"
  },
  {
    "id": "food-ester-orange-sapon-koh",
    "name": "Potassium hydroxide saponification of octyl acetate",
    "reactants": [
      "c8h16o2_octylacetate",
      "koh"
    ],
    "products": [
      "c8h18o_octanol",
      "ch3cook"
    ],
    "enthalpy": -58,
    "desc": "Alkaline saponification.",
    "type": "redox_other",
    "effects": [],
    "net": "C10H20O2 + KOH → C8H18O + CH3COOK"
  },
  {
    "id": "food-octanol-combustion",
    "name": "Thermal combustion of 1-octanol",
    "reactants": [
      "c8h18o_octanol",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -5280,
    "desc": "Exothermic combustion.",
    "type": "combustion",
    "effects": [],
    "net": "C8H18O + 12 O2 → 8 CO2 + 9 H2O"
  },
  {
    "id": "food-ester-orange-combustion",
    "name": "Complete combustion of octyl acetate",
    "reactants": [
      "c8h16o2_octylacetate",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -6250,
    "desc": "Combustion.",
    "type": "combustion",
    "effects": [],
    "net": "C10H20O2 + 14 O2 → 10 CO2 + 10 H2O"
  },
  {
    "id": "food-isoamyl-nitric-oxidation",
    "name": "Nitric acid oxidation of isoamyl alcohol",
    "reactants": [
      "c5h12o_isoamyl",
      "hno3"
    ],
    "products": [
      "co2",
      "no2",
      "water"
    ],
    "enthalpy": -2450,
    "desc": "Oxidative destruction.",
    "type": "redox_other",
    "effects": [],
    "net": "C5H12O + 30 HNO3 → 5 CO2 + 30 NO2 + 21 H2O"
  },
  {
    "id": "food-octanol-nitric-oxidation",
    "name": "Nitric acid oxidation of 1-octanol",
    "reactants": [
      "c8h18o_octanol",
      "hno3"
    ],
    "products": [
      "co2",
      "no2",
      "water"
    ],
    "enthalpy": -3850,
    "desc": "Exhaustive nitric oxidation.",
    "type": "redox_other",
    "effects": [],
    "net": "C8H18O + 48 HNO3 → 8 CO2 + 48 NO2 + 33 H2O"
  },
  {
    "id": "food-ethylbutyrate-nitric-oxidation",
    "name": "Nitric acid oxidative cleavage of ethyl butyrate",
    "reactants": [
      "c6h12o2_ethylbutyrate",
      "hno3"
    ],
    "products": [
      "co2",
      "no2",
      "water"
    ],
    "enthalpy": -2750,
    "desc": "Acid digestion.",
    "type": "redox_other",
    "effects": [],
    "net": "C6H12O2 + 32 HNO3 → 6 CO2 + 32 NO2 + 22 H2O"
  },
  {
    "id": "food-tartaric-cream-of-tartar-koh",
    "name": "Precipitation of cream of tartar (potassium bitartrate) by KOH",
    "reactants": [
      "c4h6o6_tartaric",
      "koh"
    ],
    "products": [
      "k-h-c4h4o6",
      "water"
    ],
    "enthalpy": -58,
    "desc": "Controlled neutralization precipitating crystalline cream of tartar.",
    "type": "precipitation",
    "effects": [],
    "net": "C4H6O6 + KOH → KHC4H4O6 + H2O"
  },
  {
    "id": "food-tartaric-khco3-precipitation",
    "name": "Precipitation of potassium bitartrate using potassium bicarbonate",
    "reactants": [
      "c4h6o6_tartaric",
      "khco3"
    ],
    "products": [
      "k-h-c4h4o6",
      "co2",
      "water"
    ],
    "enthalpy": -42,
    "desc": "Wine stabilization reaction precipitating wine diamonds.",
    "type": "precipitation",
    "effects": [],
    "net": "C4H6O6 + KHCO3 → KHC4H4O6 + CO2 + H2O"
  },
  {
    "id": "food-tartaric-k2co3-precipitation",
    "name": "Potassium carbonate neutralization yielding potassium bitartrate",
    "reactants": [
      "c4h6o6_tartaric",
      "k2co3"
    ],
    "products": [
      "k-h-c4h4o6",
      "khco3"
    ],
    "enthalpy": -35,
    "desc": "Partial neutralization.",
    "type": "redox_other",
    "effects": [],
    "net": "C4H6O6 + K2CO3 → KHC4H4O6 + KHCO3"
  },
  {
    "id": "food-rochelle-salt-naoh-synth",
    "name": "Synthesis of Rochelle salt (potassium sodium tartrate) using NaOH",
    "reactants": [
      "k-h-c4h4o6",
      "naoh"
    ],
    "products": [
      "kna-c4h4o6",
      "water"
    ],
    "enthalpy": -54,
    "desc": "Neutralization of cream of tartar producing piezoelectric Rochelle salt crystals.",
    "type": "synthesis",
    "effects": [],
    "net": "KHC4H4O6 + NaOH → KNaC4H4O6 + H2O"
  },
  {
    "id": "food-rochelle-salt-nahco3-synth",
    "name": "Synthesis of Rochelle salt using sodium bicarbonate",
    "reactants": [
      "k-h-c4h4o6",
      "nahco3"
    ],
    "products": [
      "kna-c4h4o6",
      "co2",
      "water"
    ],
    "enthalpy": -38,
    "desc": "Effervescent synthesis of potassium sodium tartrate.",
    "type": "synthesis",
    "effects": [],
    "net": "KHC4H4O6 + NaHCO3 → KNaC4H4O6 + CO2 + H2O"
  },
  {
    "id": "food-rochelle-salt-na2co3-synth",
    "name": "Synthesis of Rochelle salt using soda ash",
    "reactants": [
      "k-h-c4h4o6",
      "na2co3"
    ],
    "products": [
      "kna-c4h4o6",
      "nahco3"
    ],
    "enthalpy": -32,
    "desc": "Carbonate neutralization producing Rochelle salt.",
    "type": "redox_other",
    "effects": [],
    "net": "KHC4H4O6 + Na2CO3 → KNaC4H4O6 + NaHCO3"
  },
  {
    "id": "food-tartaric-acid-combustion",
    "name": "Thermal combustion of tartaric acid",
    "reactants": [
      "c4h6o6_tartaric",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -1150,
    "desc": "Combustion of wine acid.",
    "type": "combustion",
    "effects": [],
    "net": "2 C4H6O6 + 5 O2 → 8 CO2 + 6 H2O"
  },
  {
    "id": "food-cream-of-tartar-combustion",
    "name": "Combustion of potassium bitartrate producing potassium carbonate",
    "reactants": [
      "k-h-c4h4o6",
      "o2"
    ],
    "products": [
      "k2co3",
      "co2",
      "water"
    ],
    "enthalpy": -1650,
    "desc": "Oxidative ashing of cream of tartar.",
    "type": "combustion",
    "effects": [],
    "net": "2 KHC4H4O6 + 5 O2 → K2CO3 + 7 CO2 + 5 H2O"
  },
  {
    "id": "food-rochelle-salt-combustion",
    "name": "Thermal combustion of Rochelle salt",
    "reactants": [
      "kna-c4h4o6",
      "o2"
    ],
    "products": [
      "k2co3",
      "na2co3",
      "co2",
      "water"
    ],
    "enthalpy": -1850,
    "desc": "Ashing producing mixed alkali carbonates.",
    "type": "combustion",
    "effects": [],
    "net": "2 KNaC4H4O6 + 5 O2 → K2CO3 + Na2CO3 + 6 CO2 + 4 H2O"
  },
  {
    "id": "food-tartaric-disodium-salt",
    "name": "Complete neutralization of tartaric acid to disodium tartrate",
    "reactants": [
      "c4h6o6_tartaric",
      "naoh"
    ],
    "products": [
      "c4h4o6na2",
      "water"
    ],
    "enthalpy": -112,
    "desc": "Neutralization yielding food emulsifier sodium tartrate.",
    "type": "acid_base_neutralization",
    "effects": [],
    "net": "C4H6O6 + 2 NaOH → C4H4O6Na2 + 2 H2O"
  },
  {
    "id": "food-cream-tartar-acid-hcl",
    "name": "Acidification of potassium bitartrate with hydrochloric acid",
    "reactants": [
      "k-h-c4h4o6",
      "hcl"
    ],
    "products": [
      "c4h6o6_tartaric",
      "kcl"
    ],
    "enthalpy": -14,
    "desc": "Acid displacement liberating free tartaric acid.",
    "type": "acid_base_neutralization",
    "effects": [],
    "net": "KHC4H4O6 + HCl → C4H6O6 + KCl"
  },
  {
    "id": "food-cream-tartar-acid-h2so4",
    "name": "Sulfuric acid acidification of potassium bitartrate",
    "reactants": [
      "k-h-c4h4o6",
      "h2so4"
    ],
    "products": [
      "c4h6o6_tartaric",
      "k2so4"
    ],
    "enthalpy": -16,
    "desc": "Industrial recovery of tartaric acid from wine lees.",
    "type": "acid_base_neutralization",
    "effects": [],
    "net": "2 KHC4H4O6 + H2SO4 → 2 C4H6O6 + K2SO4"
  },
  {
    "id": "food-cream-tartar-acid-hno3",
    "name": "Nitric acid reaction with potassium bitartrate",
    "reactants": [
      "k-h-c4h4o6",
      "hno3"
    ],
    "products": [
      "c4h6o6_tartaric",
      "kno3"
    ],
    "enthalpy": -15,
    "desc": "Acid metathesis generating potassium nitrate.",
    "type": "acid_base_neutralization",
    "effects": [],
    "net": "KHC4H4O6 + HNO3 → C4H6O6 + KNO3"
  },
  {
    "id": "food-rochelle-salt-acid-hcl",
    "name": "Hydrochloric acid acidification of Rochelle salt",
    "reactants": [
      "kna-c4h4o6",
      "hcl"
    ],
    "products": [
      "c4h6o6_tartaric",
      "nacl",
      "kcl"
    ],
    "enthalpy": -22,
    "desc": "Acid decomposition.",
    "type": "acid_base_neutralization",
    "effects": [],
    "net": "KNaC4H4O6 + 2 HCl → C4H6O6 + NaCl + KCl"
  },
  {
    "id": "food-rochelle-salt-acid-h2so4",
    "name": "Sulfuric acid decomposition of Rochelle salt",
    "reactants": [
      "kna-c4h4o6",
      "h2so4"
    ],
    "products": [
      "c4h6o6_tartaric",
      "na2so4",
      "k2so4"
    ],
    "enthalpy": -25,
    "desc": "Acid decomposition yielding mixed sulfates.",
    "type": "acid_base_neutralization",
    "effects": [],
    "net": "2 KNaC4H4O6 + 2 H2SO4 → 2 C4H6O6 + Na2SO4 + K2SO4"
  },
  {
    "id": "food-citric-neutralize-naoh",
    "name": "Complete neutralization of citric acid to trisodium citrate",
    "reactants": [
      "c6h8o7_citric",
      "naoh"
    ],
    "products": [
      "na3-c6h5o7",
      "water"
    ],
    "enthalpy": -165,
    "desc": "Triprotic neutralization producing sour salt buffering agent.",
    "type": "acid_base_neutralization",
    "effects": [],
    "net": "C6H8O7 + 3 NaOH → Na3C6H5O7 + 3 H2O"
  },
  {
    "id": "food-citric-bathbomb-nahco3",
    "name": "Effervescent reaction of citric acid and sodium bicarbonate",
    "reactants": [
      "c6h8o7_citric",
      "nahco3"
    ],
    "products": [
      "na3-c6h5o7",
      "co2",
      "water"
    ],
    "enthalpy": -85,
    "desc": "Classic bath bomb and antacid effervescent CO2 evolution.",
    "type": "gas_evolution",
    "effects": [],
    "net": "C6H8O7 + 3 NaHCO3 → Na3C6H5O7 + 3 CO2 + 3 H2O"
  },
  {
    "id": "food-citric-na2co3-reaction",
    "name": "Neutralization of citric acid by sodium carbonate",
    "reactants": [
      "c6h8o7_citric",
      "na2co3"
    ],
    "products": [
      "na3-c6h5o7",
      "co2",
      "water"
    ],
    "enthalpy": -95,
    "desc": "Effervescent neutralization yielding trisodium citrate.",
    "type": "gas_evolution",
    "effects": [],
    "net": "2 C6H8O7 + 3 Na2CO3 → 2 Na3C6H5O7 + 3 CO2 + 3 H2O"
  },
  {
    "id": "food-triethyl-citrate-synth",
    "name": "Synthesis of triethyl citrate plasticizer/flavor from citric acid and ethanol",
    "reactants": [
      "c6h8o7_citric",
      "c2h5oh"
    ],
    "products": [
      "c12h20o7",
      "water"
    ],
    "enthalpy": -35,
    "desc": "Esterification producing food additive triethyl citrate (E1505).",
    "type": "synthesis",
    "effects": [],
    "net": "C6H8O7 + 3 C2H5OH → C12H20O7 + 3 H2O"
  },
  {
    "id": "food-triethyl-citrate-hydrolysis",
    "name": "Aqueous hydrolysis of triethyl citrate",
    "reactants": [
      "c12h20o7",
      "water"
    ],
    "products": [
      "c6h8o7_citric",
      "c2h5oh"
    ],
    "enthalpy": 35,
    "desc": "Hydrolysis regenerating citric acid and ethanol.",
    "type": "redox_other",
    "effects": [],
    "net": "C12H20O7 + 3 H2O → C6H8O7 + 3 C2H5OH"
  },
  {
    "id": "food-triethyl-citrate-sapon-naoh",
    "name": "Alkaline saponification of triethyl citrate",
    "reactants": [
      "c12h20o7",
      "naoh"
    ],
    "products": [
      "na3-c6h5o7",
      "c2h5oh"
    ],
    "enthalpy": -145,
    "desc": "Alkaline ester cleavage yielding trisodium citrate.",
    "type": "redox_other",
    "effects": [],
    "net": "C12H20O7 + 3 NaOH → Na3C6H5O7 + 3 C2H5OH"
  },
  {
    "id": "food-triethyl-citrate-combustion",
    "name": "Thermal combustion of triethyl citrate",
    "reactants": [
      "c12h20o7",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -6450,
    "desc": "Combustion.",
    "type": "combustion",
    "effects": [],
    "net": "2 C12H20O7 + 27 O2 → 24 CO2 + 20 H2O"
  },
  {
    "id": "food-citrate-acid-hcl",
    "name": "Acidification of trisodium citrate by hydrochloric acid",
    "reactants": [
      "na3-c6h5o7",
      "hcl"
    ],
    "products": [
      "c6h8o7_citric",
      "nacl"
    ],
    "enthalpy": -24,
    "desc": "Acid displacement regenerating citric acid.",
    "type": "acid_base_neutralization",
    "effects": [],
    "net": "Na3C6H5O7 + 3 HCl → C6H8O7 + 3 NaCl"
  },
  {
    "id": "food-citrate-acid-h2so4",
    "name": "Sulfuric acid conversion of trisodium citrate to citric acid",
    "reactants": [
      "na3-c6h5o7",
      "h2so4"
    ],
    "products": [
      "c6h8o7_citric",
      "na2so4"
    ],
    "enthalpy": -28,
    "desc": "Industrial acid recovery of citric acid.",
    "type": "acid_base_neutralization",
    "effects": [],
    "net": "2 Na3C6H5O7 + 3 H2SO4 → 2 C6H8O7 + 3 Na2SO4"
  },
  {
    "id": "food-citrate-acid-hno3",
    "name": "Nitric acid acidification of trisodium citrate",
    "reactants": [
      "na3-c6h5o7",
      "hno3"
    ],
    "products": [
      "c6h8o7_citric",
      "nano3"
    ],
    "enthalpy": -25,
    "desc": "Acid metathesis generating sodium nitrate.",
    "type": "acid_base_neutralization",
    "effects": [],
    "net": "Na3C6H5O7 + 3 HNO3 → C6H8O7 + 3 NaNO3"
  },
  {
    "id": "food-citric-acid-combustion",
    "name": "Thermal combustion of citric acid",
    "reactants": [
      "c6h8o7_citric",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -1960,
    "desc": "Combustion.",
    "type": "combustion",
    "effects": [],
    "net": "2 C6H8O7 + 9 O2 → 12 CO2 + 8 H2O"
  },
  {
    "id": "food-trisodium-citrate-combustion",
    "name": "Thermal combustion of trisodium citrate",
    "reactants": [
      "na3-c6h5o7",
      "o2"
    ],
    "products": [
      "na2co3",
      "co2",
      "water"
    ],
    "enthalpy": -2480,
    "desc": "Ashing yielding sodium carbonate.",
    "type": "combustion",
    "effects": [],
    "net": "2 Na3C6H5O7 + 9 O2 → 3 Na2CO3 + 9 CO2 + 5 H2O"
  },
  {
    "id": "food-citric-nitric-oxidation",
    "name": "Nitric acid oxidative digestion of citric acid",
    "reactants": [
      "c6h8o7_citric",
      "hno3"
    ],
    "products": [
      "co2",
      "no2",
      "water"
    ],
    "enthalpy": -1650,
    "desc": "Nitric acid oxidation.",
    "type": "redox_other",
    "effects": [],
    "net": "C6H8O7 + 18 HNO3 → 6 CO2 + 18 NO2 + 13 H2O"
  },
  {
    "id": "food-trisodium-citrate-peroxide",
    "name": "Peroxide oxidative degradation of sodium citrate",
    "reactants": [
      "na3-c6h5o7",
      "h2o2"
    ],
    "products": [
      "na2co3",
      "co2",
      "water"
    ],
    "enthalpy": -1850,
    "desc": "Oxidative destruction.",
    "type": "redox_other",
    "effects": [],
    "net": "2 Na3C6H5O7 + 18 H2O2 → 3 Na2CO3 + 9 CO2 + 23 H2O"
  },
  {
    "id": "food-citric-peroxide-cleavage",
    "name": "Fenton oxidative cleavage of citric acid",
    "reactants": [
      "c6h8o7_citric",
      "h2o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -1950,
    "desc": "Hydroxyl radical oxidation.",
    "type": "redox_other",
    "effects": [],
    "net": "C6H8O7 + 9 H2O2 → 6 CO2 + 13 H2O"
  },
  {
    "id": "food-lactic-neutralize-naoh",
    "name": "Neutralization of lactic acid to sodium lactate",
    "reactants": [
      "c3h6o3_lactic",
      "naoh"
    ],
    "products": [
      "c3h5o3na",
      "water"
    ],
    "enthalpy": -56,
    "desc": "Synthesis of food humectant sodium lactate (E325).",
    "type": "acid_base_neutralization",
    "effects": [],
    "net": "C3H6O3 + NaOH → C3H5O3Na + H2O"
  },
  {
    "id": "food-lactic-nahco3-reaction",
    "name": "Reaction of lactic acid with sodium bicarbonate",
    "reactants": [
      "c3h6o3_lactic",
      "nahco3"
    ],
    "products": [
      "c3h5o3na",
      "co2",
      "water"
    ],
    "enthalpy": -38,
    "desc": "Effervescent neutralization liberating carbon dioxide.",
    "type": "gas_evolution",
    "effects": [],
    "net": "C3H6O3 + NaHCO3 → C3H5O3Na + CO2 + H2O"
  },
  {
    "id": "food-lactic-na2co3-reaction",
    "name": "Neutralization of lactic acid by sodium carbonate",
    "reactants": [
      "c3h6o3_lactic",
      "na2co3"
    ],
    "products": [
      "c3h5o3na",
      "co2",
      "water"
    ],
    "enthalpy": -42,
    "desc": "Synthesis of sodium lactate buffer.",
    "type": "gas_evolution",
    "effects": [],
    "net": "2 C3H6O3 + Na2CO3 → 2 C3H5O3Na + CO2 + H2O"
  },
  {
    "id": "food-sodium-lactate-acid-hcl",
    "name": "Acidification of sodium lactate with hydrochloric acid",
    "reactants": [
      "c3h5o3na",
      "hcl"
    ],
    "products": [
      "c3h6o3_lactic",
      "nacl"
    ],
    "enthalpy": -12,
    "desc": "Regeneration of free lactic acid.",
    "type": "acid_base_neutralization",
    "effects": [],
    "net": "C3H5O3Na + HCl → C3H6O3 + NaCl"
  },
  {
    "id": "food-sodium-lactate-acid-h2so4",
    "name": "Sulfuric acid acidification of sodium lactate",
    "reactants": [
      "c3h5o3na",
      "h2so4"
    ],
    "products": [
      "c3h6o3_lactic",
      "na2so4"
    ],
    "enthalpy": -14,
    "desc": "Acid displacement producing sodium sulfate.",
    "type": "acid_base_neutralization",
    "effects": [],
    "net": "2 C3H5O3Na + H2SO4 → 2 C3H6O3 + Na2SO4"
  },
  {
    "id": "food-sodium-lactate-acid-hno3",
    "name": "Nitric acid acidification of sodium lactate",
    "reactants": [
      "c3h5o3na",
      "hno3"
    ],
    "products": [
      "c3h6o3_lactic",
      "nano3"
    ],
    "enthalpy": -13,
    "desc": "Acid metathesis generating sodium nitrate.",
    "type": "acid_base_neutralization",
    "effects": [],
    "net": "C3H5O3Na + HNO3 → C3H6O3 + NaNO3"
  },
  {
    "id": "food-lactic-acid-combustion",
    "name": "Complete combustion of lactic acid",
    "reactants": [
      "c3h6o3_lactic",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -1360,
    "desc": "Metabolic and thermal combustion.",
    "type": "combustion",
    "effects": [],
    "net": "C3H6O3 + 3 O2 → 3 CO2 + 3 H2O"
  },
  {
    "id": "food-sodium-lactate-combustion",
    "name": "Thermal combustion of sodium lactate",
    "reactants": [
      "c3h5o3na",
      "o2"
    ],
    "products": [
      "na2co3",
      "co2",
      "water"
    ],
    "enthalpy": -1650,
    "desc": "Ashing yielding sodium carbonate.",
    "type": "combustion",
    "effects": [],
    "net": "2 C3H5O3Na + 6 O2 → Na2CO3 + 5 CO2 + 5 H2O"
  },
  {
    "id": "food-lactic-nitric-oxidation",
    "name": "Nitric acid oxidation of lactic acid",
    "reactants": [
      "c3h6o3_lactic",
      "hno3"
    ],
    "products": [
      "co2",
      "no2",
      "water"
    ],
    "enthalpy": -1150,
    "desc": "Acid digestion liberating nitrogen dioxide.",
    "type": "redox_other",
    "effects": [],
    "net": "C3H6O3 + 12 HNO3 → 3 CO2 + 12 NO2 + 9 H2O"
  },
  {
    "id": "food-lactic-sulfuric-decarboxylation",
    "name": "Thermal acid decarbonylation of lactic acid yielding acetaldehyde",
    "reactants": [
      "c3h6o3_lactic"
    ],
    "products": [
      "co",
      "ch3cho",
      "water"
    ],
    "enthalpy": 45,
    "desc": "Decarbonylation yielding acetaldehyde flavor and carbon monoxide.",
    "type": "decomposition",
    "effects": [],
    "net": "C3H6O3 → CO + CH3CHO + H2O"
  },
  {
    "id": "food-lactic-permanganate-oxidation",
    "name": "Permanganate oxidation of lactic acid to acetic acid",
    "reactants": [
      "c3h6o3_lactic",
      "kmno4",
      "h2so4"
    ],
    "products": [
      "ch3cooh",
      "co2",
      "mnso4",
      "k2so4",
      "water"
    ],
    "enthalpy": -420,
    "desc": "Oxidative cleavage of alpha-hydroxy acid.",
    "type": "redox_other",
    "effects": [],
    "net": "9 C3H6O3 + 4 KMnO4 + 6 H2SO4 → 11 CH3COOH + 5 CO2 + 4 MnSO4 + 2 K2SO4 + 11 H2O"
  },
  {
    "id": "food-lactic-dichromate-oxidation",
    "name": "Acid dichromate oxidation of lactic acid to acetic acid",
    "reactants": [
      "c3h6o3_lactic",
      "k2cr2o7",
      "h2so4"
    ],
    "products": [
      "ch3cooh",
      "co2",
      "cr2-so4-3",
      "k2so4",
      "water"
    ],
    "enthalpy": -390,
    "desc": "Chromic acid cleavage.",
    "type": "redox_other",
    "effects": [],
    "net": "25 C3H6O3 + 6 K2Cr2O7 + 24 H2SO4 → 33 CH3COOH + 9 CO2 + 6 Cr2(SO4)3 + 6 K2SO4 + 33 H2O"
  },
  {
    "id": "food-lactic-peroxide-oxidation",
    "name": "Fenton oxidation of lactic acid yielding acetic acid and CO2",
    "reactants": [
      "c3h6o3_lactic",
      "h2o2"
    ],
    "products": [
      "ch3cooh",
      "co2",
      "water"
    ],
    "enthalpy": -280,
    "desc": "Peroxide oxidative cleavage.",
    "type": "redox_other",
    "effects": [],
    "net": "7 C3H6O3 + 6 H2O2 → 9 CH3COOH + 3 CO2 + 9 H2O"
  },
  {
    "id": "food-lactic-chlorine-oxidation",
    "name": "Chlorine oxidation of lactic acid in water",
    "reactants": [
      "c3h6o3_lactic",
      "cl2",
      "water"
    ],
    "products": [
      "ch3cooh",
      "co2",
      "hcl"
    ],
    "enthalpy": -240,
    "desc": "Halogen oxidation.",
    "type": "redox_other",
    "effects": [],
    "net": "3 C3H6O3 + 2 Cl2 + H2O → 4 CH3COOH + CO2 + 4 HCl"
  },
  {
    "id": "food-lactic-bromine-oxidation",
    "name": "Bromine oxidation of lactic acid",
    "reactants": [
      "c3h6o3_lactic",
      "br2",
      "water"
    ],
    "products": [
      "ch3cooh",
      "co2",
      "hbr"
    ],
    "enthalpy": -210,
    "desc": "Halogen oxidation.",
    "type": "redox_other",
    "effects": [],
    "net": "3 C3H6O3 + 2 Br2 + H2O → 4 CH3COOH + CO2 + 4 HBr"
  },
  {
    "id": "food-vitc-iodine-titration",
    "name": "Iodometric titration: oxidation of ascorbic acid to dehydroascorbic acid by iodine",
    "reactants": [
      "c6h8o6_ascorbic",
      "i2"
    ],
    "products": [
      "c6h6o6_dehydroascorbic",
      "hi"
    ],
    "enthalpy": -85,
    "desc": "Standard analytical redox titration of Vitamin C with starch endpoint.",
    "type": "redox_other",
    "effects": [
      {
        "type": "color_change",
        "colorFrom": "#2C3E50",
        "colorTo": "#FFFFFF",
        "description": "Blue-black iodine-starch complex decolorizes"
      }
    ],
    "net": "C6H8O6 + I2 → C6H6O6 + 2 HI"
  },
  {
    "id": "food-vitc-bromine-oxidation",
    "name": "Bromine oxidation of ascorbic acid",
    "reactants": [
      "c6h8o6_ascorbic",
      "br2"
    ],
    "products": [
      "c6h6o6_dehydroascorbic",
      "hbr"
    ],
    "enthalpy": -110,
    "desc": "Rapid decolorization of brown bromine water.",
    "type": "redox_other",
    "effects": [
      {
        "type": "color_change",
        "colorFrom": "#B03A2E",
        "colorTo": "#FFFFFF",
        "description": "Brown-orange bromine water is instantly bleached"
      }
    ],
    "net": "C6H8O6 + Br2 → C6H6O6 + 2 HBr"
  },
  {
    "id": "food-vitc-chlorine-oxidation",
    "name": "Chlorine water oxidation of Vitamin C",
    "reactants": [
      "c6h8o6_ascorbic",
      "cl2"
    ],
    "products": [
      "c6h6o6_dehydroascorbic",
      "hcl"
    ],
    "enthalpy": -145,
    "desc": "Antioxidant scavenging of free active chlorine.",
    "type": "redox_other",
    "effects": [],
    "net": "C6H8O6 + Cl2 → C6H6O6 + 2 HCl"
  },
  {
    "id": "food-vitc-peroxide-scavenging",
    "name": "Hydrogen peroxide scavenging by ascorbic acid",
    "reactants": [
      "c6h8o6_ascorbic",
      "h2o2"
    ],
    "products": [
      "c6h6o6_dehydroascorbic",
      "water"
    ],
    "enthalpy": -195,
    "desc": "Primary biological antioxidant defense reducing reactive peroxide to water.",
    "type": "redox_other",
    "effects": [],
    "net": "C6H8O6 + H2O2 → C6H6O6 + 2 H2O"
  },
  {
    "id": "food-vitc-aerobic-autoxidation",
    "name": "Aerobic autoxidation of Vitamin C to dehydroascorbic acid and H2O2",
    "reactants": [
      "c6h8o6_ascorbic",
      "o2"
    ],
    "products": [
      "c6h6o6_dehydroascorbic",
      "h2o2"
    ],
    "enthalpy": -65,
    "desc": "Atmospheric oxidation responsible for Vitamin C degradation in stored fruit juices.",
    "type": "redox_other",
    "effects": [],
    "net": "C6H8O6 + O2 → C6H6O6 + H2O2"
  },
  {
    "id": "food-vitc-iron-reduction",
    "name": "Ferric iron reduction: ascorbic acid reduces FeCl3 to FeCl2",
    "reactants": [
      "c6h8o6_ascorbic",
      "fecl3"
    ],
    "products": [
      "c6h6o6_dehydroascorbic",
      "fecl2",
      "hcl"
    ],
    "enthalpy": -120,
    "desc": "Dietary mechanism enhancing non-heme iron absorption by reducing Fe(III) to soluble Fe(II).",
    "type": "redox_other",
    "effects": [],
    "net": "C6H8O6 + 2 FeCl3 → C6H6O6 + 2 FeCl2 + 2 HCl"
  },
  {
    "id": "food-vitc-copper-reduction",
    "name": "Cupric copper reduction by ascorbic acid generating cuprous chloride",
    "reactants": [
      "c6h8o6_ascorbic",
      "cucl2"
    ],
    "products": [
      "c6h6o6_dehydroascorbic",
      "cucl",
      "hcl"
    ],
    "enthalpy": -95,
    "desc": "Trace copper catalyzed oxidation of Vitamin C.",
    "type": "redox_other",
    "effects": [],
    "net": "C6H8O6 + 2 CuCl2 → C6H6O6 + 2 CuCl + 2 HCl"
  },
  {
    "id": "food-vitc-silver-mirror",
    "name": "Silver mirror reaction: reduction of silver nitrate by ascorbic acid",
    "reactants": [
      "c6h8o6_ascorbic",
      "agno3"
    ],
    "products": [
      "c6h6o6_dehydroascorbic",
      "ag",
      "hno3"
    ],
    "enthalpy": -165,
    "desc": "Rapid reduction depositing metallic silver mirror.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#BDC3C7",
        "description": "Lustrous silver mirror deposits on glass"
      }
    ],
    "net": "C6H8O6 + 2 AgNO3 → C6H6O6 + 2 Ag + 2 HNO3"
  },
  {
    "id": "food-vitc-permanganate-titration",
    "name": "Acid permanganate titration of ascorbic acid",
    "reactants": [
      "c6h8o6_ascorbic",
      "kmno4",
      "h2so4"
    ],
    "products": [
      "c6h6o6_dehydroascorbic",
      "mnso4",
      "k2so4",
      "water"
    ],
    "enthalpy": -380,
    "desc": "Redox titration bleaching deep purple permanganate.",
    "type": "redox_other",
    "effects": [
      {
        "type": "color_change",
        "colorFrom": "#7D3C98",
        "colorTo": "#FFFFFF",
        "description": "Intense purple permanganate is bleached clear"
      }
    ],
    "net": "5 C6H8O6 + 2 KMnO4 + 3 H2SO4 → 5 C6H6O6 + 2 MnSO4 + K2SO4 + 8 H2O"
  },
  {
    "id": "food-vitc-dichromate-titration",
    "name": "Acid dichromate oxidation of Vitamin C",
    "reactants": [
      "c6h8o6_ascorbic",
      "k2cr2o7",
      "h2so4"
    ],
    "products": [
      "c6h6o6_dehydroascorbic",
      "cr2-so4-3",
      "k2so4",
      "water"
    ],
    "enthalpy": -340,
    "desc": "Colorimetric reduction turning orange dichromate into green chromium(III).",
    "type": "redox_other",
    "effects": [
      {
        "type": "color_change",
        "colorFrom": "#E67E22",
        "colorTo": "#27AE60",
        "description": "Orange solution shifts to deep green Cr(III)"
      }
    ],
    "net": "3 C6H8O6 + K2Cr2O7 + 4 H2SO4 → 3 C6H6O6 + Cr2(SO4)3 + K2SO4 + 7 H2O"
  },
  {
    "id": "food-vitc-ozone-oxidation",
    "name": "Ozone oxidation of ascorbic acid to dehydroascorbic acid",
    "reactants": [
      "c6h8o6_ascorbic",
      "o3"
    ],
    "products": [
      "c6h6o6_dehydroascorbic",
      "o2",
      "water"
    ],
    "enthalpy": -310,
    "desc": "Rapid ozonolysis oxidation of vitamin C antioxidant.",
    "type": "redox_other",
    "effects": [],
    "net": "C6H8O6 + O3 → C6H6O6 + O2 + H2O"
  },
  {
    "id": "food-dehydroascorbic-combustion",
    "name": "Thermal combustion of dehydroascorbic acid",
    "reactants": [
      "c6h6o6_dehydroascorbic",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -2180,
    "desc": "Combustion.",
    "type": "combustion",
    "effects": [],
    "net": "2 C6H6O6 + 9 O2 → 12 CO2 + 6 H2O"
  },
  {
    "id": "food-vitc-nitric-oxidation",
    "name": "Nitric acid oxidation of ascorbic acid",
    "reactants": [
      "c6h8o6_ascorbic",
      "hno3"
    ],
    "products": [
      "co2",
      "no2",
      "water"
    ],
    "enthalpy": -1850,
    "desc": "Acid digestion liberating nitrogen dioxide.",
    "type": "redox_other",
    "effects": [],
    "net": "C6H8O6 + 20 HNO3 → 6 CO2 + 20 NO2 + 14 H2O"
  },
  {
    "id": "food-dehydroascorbic-nitric-oxidation",
    "name": "Nitric acid oxidation of dehydroascorbic acid",
    "reactants": [
      "c6h6o6_dehydroascorbic",
      "hno3"
    ],
    "products": [
      "co2",
      "no2",
      "water"
    ],
    "enthalpy": -1750,
    "desc": "Acid oxidation.",
    "type": "redox_other",
    "effects": [],
    "net": "C6H6O6 + 18 HNO3 → 6 CO2 + 18 NO2 + 12 H2O"
  },
  {
    "id": "food-vitc-catalytic-hydrogenation",
    "name": "Catalytic hydrogenation of dehydroascorbic acid regenerating Vitamin C",
    "reactants": [
      "c6h6o6_dehydroascorbic",
      "h2"
    ],
    "products": [
      "c6h8o6_ascorbic"
    ],
    "enthalpy": -85,
    "desc": "Stereospecific reduction regenerating ascorbic acid.",
    "type": "synthesis",
    "effects": [],
    "net": "C6H6O6 + H2 → C6H8O6"
  },
  {
    "id": "food-benzoic-neutralize-naoh",
    "name": "Synthesis of sodium benzoate food preservative (E211) using NaOH",
    "reactants": [
      "c7h6o2_benzoic",
      "naoh"
    ],
    "products": [
      "c7h5o2na_sodium_benzoate",
      "water"
    ],
    "enthalpy": -58,
    "desc": "Neutralization isolating water-soluble antimicrobial sodium benzoate.",
    "type": "acid_base_neutralization",
    "effects": [],
    "net": "C7H6O2 + NaOH → C7H5O2Na + H2O"
  },
  {
    "id": "food-benzoic-nahco3-reaction",
    "name": "Neutralization of benzoic acid with sodium bicarbonate",
    "reactants": [
      "c7h6o2_benzoic",
      "nahco3"
    ],
    "products": [
      "c7h5o2na_sodium_benzoate",
      "co2",
      "water"
    ],
    "enthalpy": -42,
    "desc": "Effervescent neutralization liberating carbon dioxide.",
    "type": "gas_evolution",
    "effects": [],
    "net": "C7H6O2 + NaHCO3 → C7H5O2Na + CO2 + H2O"
  },
  {
    "id": "food-benzoic-na2co3-reaction",
    "name": "Reaction of benzoic acid with sodium carbonate",
    "reactants": [
      "c7h6o2_benzoic",
      "na2co3"
    ],
    "products": [
      "c7h5o2na_sodium_benzoate",
      "nahco3"
    ],
    "enthalpy": -34,
    "desc": "Carbonate neutralization producing sodium benzoate.",
    "type": "redox_other",
    "effects": [],
    "net": "C7H6O2 + Na2CO3 → C7H5O2Na + NaHCO3"
  },
  {
    "id": "food-benzoate-acid-precipitation-hcl",
    "name": "Acidification of sodium benzoate causing precipitation of benzoic acid",
    "reactants": [
      "c7h5o2na_sodium_benzoate",
      "hcl"
    ],
    "products": [
      "c7h6o2_benzoic",
      "nacl"
    ],
    "enthalpy": -16,
    "desc": "Acidification triggering dense white needle crystals of benzoic acid.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "White crystalline needles of benzoic acid precipitate"
      }
    ],
    "net": "C7H5O2Na + HCl → C7H6O2 + NaCl"
  },
  {
    "id": "food-benzoate-acid-precipitation-h2so4",
    "name": "Sulfuric acid precipitation of benzoic acid from benzoate preservative",
    "reactants": [
      "c7h5o2na_sodium_benzoate",
      "h2so4"
    ],
    "products": [
      "c7h6o2_benzoic",
      "na2so4"
    ],
    "enthalpy": -18,
    "desc": "Precipitation of insoluble benzoic acid crystals.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "White needles of benzoic acid precipitate"
      }
    ],
    "net": "2 C7H5O2Na + H2SO4 → 2 C7H6O2 + Na2SO4"
  },
  {
    "id": "food-benzoate-acid-precipitation-hno3",
    "name": "Nitric acid acidification of sodium benzoate",
    "reactants": [
      "c7h5o2na_sodium_benzoate",
      "hno3"
    ],
    "products": [
      "c7h6o2_benzoic",
      "nano3"
    ],
    "enthalpy": -15,
    "desc": "Acid metathesis isolating crystalline benzoic acid.",
    "type": "precipitation",
    "effects": [],
    "net": "C7H5O2Na + HNO3 → C7H6O2 + NaNO3"
  },
  {
    "id": "food-benzoic-acid-combustion",
    "name": "Thermal combustion of benzoic acid",
    "reactants": [
      "c7h6o2_benzoic",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -3220,
    "desc": "Standard bomb calorimetry primary reference combustion.",
    "type": "combustion",
    "effects": [],
    "net": "2 C7H6O2 + 15 O2 → 14 CO2 + 6 H2O"
  },
  {
    "id": "food-sodium-benzoate-combustion",
    "name": "Thermal combustion of sodium benzoate preservative",
    "reactants": [
      "c7h5o2na_sodium_benzoate",
      "o2"
    ],
    "products": [
      "na2co3",
      "co2",
      "water"
    ],
    "enthalpy": -3450,
    "desc": "Ashing yielding sodium carbonate.",
    "type": "combustion",
    "effects": [],
    "net": "2 C7H5O2Na + 15 O2 → Na2CO3 + 13 CO2 + 5 H2O"
  },
  {
    "id": "food-benzoic-nitric-oxidation",
    "name": "Nitric acid oxidation of benzoic acid",
    "reactants": [
      "c7h6o2_benzoic",
      "hno3"
    ],
    "products": [
      "co2",
      "no2",
      "water"
    ],
    "enthalpy": -2650,
    "desc": "Exhaustive nitric oxidation.",
    "type": "redox_other",
    "effects": [],
    "net": "C7H6O2 + 30 HNO3 → 7 CO2 + 30 NO2 + 18 H2O"
  },
  {
    "id": "food-sodium-benzoate-decarboxylation",
    "name": "Soda lime decarboxylation of sodium benzoate preservative to benzene",
    "reactants": [
      "c7h5o2na_sodium_benzoate",
      "naoh"
    ],
    "products": [
      "c6h6",
      "na2co3"
    ],
    "enthalpy": -112,
    "desc": "Thermal decarboxylation producing benzene hydrocarbon.",
    "type": "redox_other",
    "effects": [],
    "net": "C7H5O2Na + NaOH → C6H6 + Na2CO3"
  },
  {
    "id": "food-maltose-combustion",
    "name": "Complete combustion of maltose carbohydrate",
    "reactants": [
      "c12h22o11_maltose",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -5640,
    "desc": "Bomb calorimetry combustion of malt sugar.",
    "type": "combustion",
    "effects": [],
    "net": "C12H22O11 + 12 O2 → 12 CO2 + 11 H2O"
  },
  {
    "id": "food-ethanol-cuo-dehydrogenation",
    "name": "Vapor phase oxidation/dehydrogenation of fermentation ethanol over copper(II) oxide",
    "reactants": [
      "c2h5oh",
      "cuo"
    ],
    "products": [
      "ch3cho",
      "cu",
      "water"
    ],
    "enthalpy": -178,
    "desc": "Hot copper oxide dehydrogenation of alcohol to acetaldehyde with copper metal mirror.",
    "type": "redox_other",
    "effects": [
      {
        "type": "color_change",
        "colorFrom": "#111111",
        "colorTo": "#D35400",
        "description": "Black CuO reduces to reddish-copper metallic sheen"
      }
    ],
    "net": "C2H5OH + CuO → CH3CHO + Cu + H2O"
  },
  {
    "id": "food-glycerol-permanganate-hypergolic",
    "name": "Hypergolic oxidation of fermentation glycerol byproduct by potassium permanganate",
    "reactants": [
      "c3h8o3",
      "kmno4"
    ],
    "products": [
      "k2co3",
      "mn2o3",
      "co2",
      "water"
    ],
    "enthalpy": -1850,
    "desc": "Spontaneous hypergolic combustion producing intense purple flames and steam.",
    "type": "redox_other",
    "effects": [
      {
        "type": "color_change",
        "colorFrom": "#4A0E4E",
        "colorTo": "#2C3E50",
        "description": "Intense purple permanganate ignites producing smoke and brownish manganese(III) residue"
      }
    ],
    "net": "4 C3H8O3 + 14 KMnO4 → 7 K2CO3 + 7 Mn2O3 + 5 CO2 + 16 H2O"
  },
  {
    "id": "food-butyric-acid-nahco3",
    "name": "Effervescent neutralization of butyric acid with sodium bicarbonate",
    "reactants": [
      "c3h7cooh",
      "nahco3"
    ],
    "products": [
      "c3h7coona",
      "co2",
      "water"
    ],
    "enthalpy": -41,
    "desc": "Neutralization buffering rancid butyric acid into sodium butyrate with vigorous CO2 gas evolution.",
    "type": "gas_evolution",
    "effects": [
      {
        "type": "gas_evolution",
        "gasColor": "#FFFFFF",
        "description": "Vigorous fizzing and carbon dioxide evolution"
      }
    ],
    "net": "C3H7COOH + NaHCO3 → C3H7COONa + CO2 + H2O"
  },
  {
    "id": "food-glycerol-nitric-oxidation",
    "name": "Nitric acid oxidation of glycerol",
    "reactants": [
      "c3h8o3",
      "hno3"
    ],
    "products": [
      "co2",
      "no2",
      "water"
    ],
    "enthalpy": -1350,
    "desc": "Acid digestion.",
    "type": "redox_other",
    "effects": [],
    "net": "C3H8O3 + 14 HNO3 → 3 CO2 + 14 NO2 + 11 H2O"
  },
  {
    "id": "food-butyric-acid-nitric-oxidation",
    "name": "Nitric acid oxidation of butyric acid",
    "reactants": [
      "c3h7cooh",
      "hno3"
    ],
    "products": [
      "co2",
      "no2",
      "water"
    ],
    "enthalpy": -1780,
    "desc": "Acid oxidation.",
    "type": "redox_other",
    "effects": [],
    "net": "C3H7COOH + 20 HNO3 → 4 CO2 + 20 NO2 + 14 H2O"
  },
  {
    "id": "food-sodium-butyrate-acid-hcl",
    "name": "Acidification of sodium butyrate by hydrochloric acid",
    "reactants": [
      "c3h7coona",
      "hcl"
    ],
    "products": [
      "c3h7cooh",
      "nacl"
    ],
    "enthalpy": -15,
    "desc": "Liberation of pungent butyric acid.",
    "type": "gas_evolution",
    "effects": [],
    "net": "C3H7COONa + HCl → C3H7COOH + NaCl"
  },
  {
    "id": "food-sodium-butyrate-acid-h2so4",
    "name": "Sulfuric acid acidification of sodium butyrate",
    "reactants": [
      "c3h7coona",
      "h2so4"
    ],
    "products": [
      "c3h7cooh",
      "na2so4"
    ],
    "enthalpy": -18,
    "desc": "Acid displacement regenerating butyric acid.",
    "type": "gas_evolution",
    "effects": [],
    "net": "2 C3H7COONa + H2SO4 → 2 C3H7COOH + Na2SO4"
  },
  {
    "id": "food-potassium-butyrate-acid-hcl",
    "name": "Hydrochloric acid acidification of potassium butyrate",
    "reactants": [
      "c3h7cook",
      "hcl"
    ],
    "products": [
      "c3h7cooh",
      "kcl"
    ],
    "enthalpy": -16,
    "desc": "Acidification releasing butyric acid.",
    "type": "gas_evolution",
    "effects": [],
    "net": "C3H7COOK + HCl → C3H7COOH + KCl"
  },
  {
    "id": "food-potassium-butyrate-acid-h2so4",
    "name": "Sulfuric acid reaction with potassium butyrate",
    "reactants": [
      "c3h7cook",
      "h2so4"
    ],
    "products": [
      "c3h7cooh",
      "k2so4"
    ],
    "enthalpy": -19,
    "desc": "Acid metathesis liberating butyric acid.",
    "type": "gas_evolution",
    "effects": [],
    "net": "2 C3H7COOK + H2SO4 → 2 C3H7COOH + K2SO4"
  }
];

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
