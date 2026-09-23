import type { ReactionDefinition } from "./types.js";

// Domain 26: Electroplating & Surface Conversion Finishing (100 reactions)
export const DOMAIN_26_ELECTROPLATING_REACTIONS: ReactionDefinition[] = [
  {
    "id": "plate-tin-fluoroborate-synthesis",
    "name": "Synthesis of tin(II) fluoroborate plating concentrate from stannous oxide and fluoboric acid",
    "reactants": [
      "sno",
      "hbf4"
    ],
    "products": [
      "sn-bf4-2",
      "water"
    ],
    "enthalpy": -85,
    "desc": "Dissolution of high-purity stannous oxide in 48% fluoboric acid preparing tin fluoroborate electroplating bath.",
    "type": "metathesis",
    "effects": [],
    "net": "SnO + 2 HBF4 → SnB2F8 + H2O"
  },
  {
    "id": "plate-lead-fluoroborate-synthesis",
    "name": "Synthesis of lead(II) fluoroborate plating concentrate from litharge and fluoboric acid",
    "reactants": [
      "pbo",
      "hbf4"
    ],
    "products": [
      "pb-bf4-2",
      "water"
    ],
    "enthalpy": -95,
    "desc": "Exothermic dissolution of lead monoxide preparing solder plating electrolyte concentrate.",
    "type": "metathesis",
    "effects": [],
    "net": "PbO + 2 HBF4 → PbB2F8 + H2O"
  },
  {
    "id": "plate-tin-metal-fluoroboric-dissolution",
    "name": "Chemical dissolution of metallic tin in fluoboric acid under aeration",
    "reactants": [
      "sn",
      "hbf4"
    ],
    "products": [
      "sn-bf4-2",
      "h2"
    ],
    "enthalpy": -65,
    "desc": "Anode replenishing reaction maintaining stannous ion concentration in fluoroborate plating baths.",
    "type": "single_displacement",
    "effects": [],
    "net": "Sn + 2 HBF4 → SnB2F8 + H2"
  },
  {
    "id": "plate-lead-metal-fluoroboric-dissolution",
    "name": "Dissolution of metallic lead in fluoboric acid",
    "reactants": [
      "pb",
      "hbf4"
    ],
    "products": [
      "pb-bf4-2",
      "h2"
    ],
    "enthalpy": -55,
    "desc": "Chemical corrosion maintaining plumbous content in high-throw solder plating tanks.",
    "type": "single_displacement",
    "effects": [],
    "net": "Pb + 2 HBF4 → PbB2F8 + H2"
  },
  {
    "id": "plate-stannous-sulfate-caustic-neutralize",
    "name": "Alkaline precipitation of stannous hydroxide from stannous sulfate plating bath",
    "reactants": [
      "snso4",
      "naoh"
    ],
    "products": [
      "sn-oh-2",
      "na2so4"
    ],
    "enthalpy": -95,
    "desc": "Wastewater heavy metal precipitation neutralizing spent acid tin plating rinse waters.",
    "type": "metathesis",
    "effects": [],
    "net": "SnSO4 + 2 NaOH → Sn(OH)2 + Na2SO4"
  },
  {
    "id": "plate-stannous-sulfate-potash-neutralize",
    "name": "Caustic potash precipitation of stannous hydroxide from tin sulfate rinse",
    "reactants": [
      "snso4",
      "koh"
    ],
    "products": [
      "sn-oh-2",
      "k2so4"
    ],
    "enthalpy": -98,
    "desc": "Neutralization of acidic tin plating effluents generating potassium sulfate byproduct.",
    "type": "metathesis",
    "effects": [],
    "net": "SnSO4 + 2 KOH → Sn(OH)2 + K2SO4"
  },
  {
    "id": "plate-stannous-chloride-potash-neutralize",
    "name": "Neutralization of stannous chloride by caustic potash",
    "reactants": [
      "sncl2",
      "koh"
    ],
    "products": [
      "sn-oh-2",
      "kcl"
    ],
    "enthalpy": -105,
    "desc": "Alkaline precipitation of tin values from acidic solder flux rinses.",
    "type": "metathesis",
    "effects": [],
    "net": "SnCl2 + 2 KOH → Sn(OH)2 + 2 KCl"
  },
  {
    "id": "plate-stannous-hydroxide-hbf4-dissolution",
    "name": "Preparation of tin(II) fluoroborate from freshly precipitated stannous hydroxide",
    "reactants": [
      "sn-oh-2",
      "hbf4"
    ],
    "products": [
      "sn-bf4-2",
      "water"
    ],
    "enthalpy": -115,
    "desc": "Dissolution of active hydroxide cake in fluoboric acid.",
    "type": "metathesis",
    "effects": [],
    "net": "Sn(OH)2 + 2 HBF4 → SnB2F8 + 2 H2O"
  },
  {
    "id": "plate-lead-hydroxide-hbf4-dissolution",
    "name": "Dissolution of lead(II) hydroxide in fluoboric acid to lead fluoroborate",
    "reactants": [
      "pb-oh-2",
      "hbf4"
    ],
    "products": [
      "pb-bf4-2",
      "water"
    ],
    "enthalpy": -120,
    "desc": "Preparation of lead fluoroborate plating concentrate.",
    "type": "metathesis",
    "effects": [],
    "net": "Pb(OH)2 + 2 HBF4 → PbB2F8 + 2 H2O"
  },
  {
    "id": "plate-lead-hydroxide-hcl-precipitation",
    "name": "Reaction of lead(II) hydroxide with hydrochloric acid forming lead chloride",
    "reactants": [
      "pb-oh-2",
      "hcl"
    ],
    "products": [
      "pbcl2",
      "water"
    ],
    "enthalpy": -95,
    "desc": "Conversion of lead hydroxide to sparingly soluble plumbous chloride.",
    "type": "metathesis",
    "effects": [],
    "net": "Pb(OH)2 + 2 HCl → PbCl2 + 2 H2O"
  },
  {
    "id": "plate-stannous-hydroxide-h2so4-acid-tin",
    "name": "Make-up of acid tin sulfate plating bath: dissolution of stannous hydroxide in sulfuric acid",
    "reactants": [
      "sn-oh-2",
      "h2so4"
    ],
    "products": [
      "snso4",
      "water"
    ],
    "enthalpy": -135,
    "desc": "Preparation of bright acid tin plating bath electrolyte.",
    "type": "metathesis",
    "effects": [],
    "net": "Sn(OH)2 + H2SO4 → SnSO4 + 2 H2O"
  },
  {
    "id": "plate-tin-fluoroborate-sulfide-precip",
    "name": "Sulfide precipitation of tin from spent fluoroborate bath by hydrogen sulfide",
    "reactants": [
      "sn-bf4-2",
      "h2s"
    ],
    "products": [
      "sns",
      "hbf4"
    ],
    "enthalpy": -72,
    "desc": "Wastewater heavy metal remediation removing tin from acidic fluoroborate effluents.",
    "type": "metathesis",
    "effects": [],
    "net": "SnB2F8 + H2S → SnS + 2 HBF4"
  },
  {
    "id": "plate-lead-fluoroborate-sulfide-precip",
    "name": "Sulfide precipitation of lead from solder fluoroborate rinse by hydrogen sulfide",
    "reactants": [
      "pb-bf4-2",
      "h2s"
    ],
    "products": [
      "pbs",
      "hbf4"
    ],
    "enthalpy": -88,
    "desc": "Deep heavy metal scavenging removing toxic lead from fluoroborate plating waste.",
    "type": "metathesis",
    "effects": [],
    "net": "PbB2F8 + H2S → PbS + 2 HBF4"
  },
  {
    "id": "plate-lead-fluoroborate-hcl-precip",
    "name": "Hydrochloric acid precipitation of lead chloride from lead fluoroborate",
    "reactants": [
      "pb-bf4-2",
      "hcl"
    ],
    "products": [
      "pbcl2",
      "hbf4"
    ],
    "enthalpy": -42,
    "desc": "Selective separation of lead from fluoroborate solutions regenerating fluoboric acid.",
    "type": "metathesis",
    "effects": [],
    "net": "PbB2F8 + 2 HCl → PbCl2 + 2 HBF4"
  },
  {
    "id": "plate-lead-fluoroborate-sulfate-precip",
    "name": "Sulfuric acid precipitation of lead sulfate from fluoroborate bath",
    "reactants": [
      "pb-bf4-2",
      "h2so4"
    ],
    "products": [
      "pbso4",
      "hbf4"
    ],
    "enthalpy": -65,
    "desc": "Desulfating and stripping lead from fluoroborate electrolytes.",
    "type": "metathesis",
    "effects": [],
    "net": "PbB2F8 + H2SO4 → PbSO4 + 2 HBF4"
  },
  {
    "id": "plate-zinc-caustic-zincate-immersion",
    "name": "Zincate immersion process: alkaline dissolution of zinc forming sodium tetrahydroxozincate",
    "reactants": [
      "zn",
      "naoh",
      "water"
    ],
    "products": [
      "na2-zn-oh-4",
      "h2"
    ],
    "enthalpy": -125,
    "desc": "Pre-treatment immersion coating of aluminum alloys depositing a thin catalytic zincate strike layer.",
    "type": "single_displacement",
    "effects": [],
    "net": "Zn + 2 NaOH + 2 H2O → Na2[Zn(OH)4] + H2"
  },
  {
    "id": "plate-aluminum-caustic-zincate-etch",
    "name": "Alkaline micro-etching of aluminum substrate in caustic zincate pretreatment bath",
    "reactants": [
      "al",
      "naoh",
      "water"
    ],
    "products": [
      "na-al-oh-4",
      "h2"
    ],
    "enthalpy": -420,
    "desc": "Simultaneous dissolution of native aluminum oxide and substrate prior to zincate immersion deposition.",
    "type": "single_displacement",
    "effects": [],
    "net": "2 Al + 2 NaOH + 6 H2O → 2 Na[Al(OH)4] + 3 H2"
  },
  {
    "id": "plate-zinc-sulfate-na2hpo4-naoh",
    "name": "Zinc phosphate conversion coating: reaction of zinc sulfate with disodium phosphate and NaOH",
    "reactants": [
      "znso4",
      "na2hpo4",
      "naoh"
    ],
    "products": [
      "zn3-po4-2",
      "na2so4",
      "water"
    ],
    "enthalpy": -210,
    "desc": "Automotive phosphating bath chemistry depositing tertiary zinc phosphate crystals.",
    "type": "metathesis",
    "effects": [],
    "net": "3 ZnSO4 + 2 Na2HPO4 + 2 NaOH → Zn3(PO4)2 + 3 Na2SO4 + 2 H2O"
  },
  {
    "id": "plate-zinc-chloride-na2hpo4-naoh",
    "name": "Zinc phosphating make-up: zinc chloride reaction with disodium phosphate and caustic soda",
    "reactants": [
      "zncl2",
      "na2hpo4",
      "naoh"
    ],
    "products": [
      "zn3-po4-2",
      "nacl",
      "water"
    ],
    "enthalpy": -225,
    "desc": "Formation of fine-grained zinc phosphate primer conversion layer on steel.",
    "type": "metathesis",
    "effects": [],
    "net": "3 ZnCl2 + 2 Na2HPO4 + 2 NaOH → Zn3(PO4)2 + 6 NaCl + 2 H2O"
  },
  {
    "id": "plate-zinc-sulfate-k2hpo4-koh",
    "name": "Potassium-buffered zinc phosphating: reaction of zinc sulfate with dipotassium phosphate and KOH",
    "reactants": [
      "znso4",
      "k2hpo4",
      "koh"
    ],
    "products": [
      "zn3-po4-2",
      "k2so4",
      "water"
    ],
    "enthalpy": -215,
    "desc": "Sludge-free zinc phosphating conversion bath formulation.",
    "type": "metathesis",
    "effects": [],
    "net": "3 ZnSO4 + 2 K2HPO4 + 2 KOH → Zn3(PO4)2 + 3 K2SO4 + 2 H2O"
  },
  {
    "id": "plate-zinc-chloride-k2hpo4-koh",
    "name": "Potassium-buffered zinc chloride phosphating conversion",
    "reactants": [
      "zncl2",
      "k2hpo4",
      "koh"
    ],
    "products": [
      "zn3-po4-2",
      "kcl",
      "water"
    ],
    "enthalpy": -230,
    "desc": "High-efficiency phosphating pretreatment improving organic powder coating adhesion.",
    "type": "metathesis",
    "effects": [],
    "net": "3 ZnCl2 + 2 K2HPO4 + 2 KOH → Zn3(PO4)2 + 6 KCl + 2 H2O"
  },
  {
    "id": "plate-zinc-sulfate-na2hpo4-na2co3",
    "name": "Carbonate-buffered zinc phosphating: reaction of zinc sulfate with Na2HPO4 and soda ash",
    "reactants": [
      "znso4",
      "na2hpo4",
      "na2co3"
    ],
    "products": [
      "zn3-po4-2",
      "na2so4",
      "co2",
      "water"
    ],
    "enthalpy": -165,
    "desc": "Self-buffering phosphating bath with carbon dioxide evolution maintaining optimal acidity.",
    "type": "metathesis",
    "effects": [],
    "net": "3 ZnSO4 + 2 Na2HPO4 + Na2CO3 → Zn3(PO4)2 + 3 Na2SO4 + CO2 + H2O"
  },
  {
    "id": "plate-zinc-chloride-na2hpo4-na2co3",
    "name": "Carbonate-accelerated zinc chloride phosphating",
    "reactants": [
      "zncl2",
      "na2hpo4",
      "na2co3"
    ],
    "products": [
      "zn3-po4-2",
      "nacl",
      "co2",
      "water"
    ],
    "enthalpy": -180,
    "desc": "Spray phosphating bath formulation.",
    "type": "metathesis",
    "effects": [],
    "net": "3 ZnCl2 + 2 Na2HPO4 + Na2CO3 → Zn3(PO4)2 + 6 NaCl + CO2 + H2O"
  },
  {
    "id": "plate-zinc-phosphate-precipitation-sulfate",
    "name": "Zinc phosphating solution make-up: reaction of zinc sulfate with trisodium phosphate",
    "reactants": [
      "znso4",
      "na3po4"
    ],
    "products": [
      "zn3-po4-2",
      "na2so4"
    ],
    "enthalpy": -165,
    "desc": "Formation of tertiary zinc phosphate (Hopeite) conversion coating crystals.",
    "type": "metathesis",
    "effects": [],
    "net": "3 ZnSO4 + 2 Na3PO4 → Zn3(PO4)2 + 3 Na2SO4"
  },
  {
    "id": "plate-zinc-phosphate-precipitation-chloride",
    "name": "Reaction of zinc chloride with trisodium phosphate to zinc phosphate",
    "reactants": [
      "zncl2",
      "na3po4"
    ],
    "products": [
      "zn3-po4-2",
      "nacl"
    ],
    "enthalpy": -180,
    "desc": "Precipitation of zinc phosphate for automotive paint base coatings.",
    "type": "metathesis",
    "effects": [],
    "net": "3 ZnCl2 + 2 Na3PO4 → Zn3(PO4)2 + 6 NaCl"
  },
  {
    "id": "plate-zinc-phosphate-potassium-sulfate",
    "name": "Reaction of zinc sulfate with tripotassium phosphate",
    "reactants": [
      "znso4",
      "k3po4"
    ],
    "products": [
      "zn3-po4-2",
      "k2so4"
    ],
    "enthalpy": -170,
    "desc": "Make-up of crystalline zinc phosphate conversion bath.",
    "type": "metathesis",
    "effects": [],
    "net": "3 ZnSO4 + 2 K3PO4 → Zn3(PO4)2 + 3 K2SO4"
  },
  {
    "id": "plate-zinc-phosphate-potassium-chloride",
    "name": "Reaction of zinc chloride with tripotassium phosphate",
    "reactants": [
      "zncl2",
      "k3po4"
    ],
    "products": [
      "zn3-po4-2",
      "kcl"
    ],
    "enthalpy": -185,
    "desc": "Synthesis of crystalline zinc phosphate.",
    "type": "metathesis",
    "effects": [],
    "net": "3 ZnCl2 + 2 K3PO4 → Zn3(PO4)2 + 6 KCl"
  },
  {
    "id": "plate-lead-fluoroborate-hi-precip",
    "name": "Volumetric determination of lead: precipitation of yellow lead(II) iodide from fluoroborate",
    "reactants": [
      "pb-bf4-2",
      "hi"
    ],
    "products": [
      "pbi2",
      "hbf4"
    ],
    "enthalpy": -75,
    "desc": "Quantitative precipitation of golden plumbous iodide crystals from fluoroborate plating solution.",
    "type": "metathesis",
    "effects": [],
    "net": "PbB2F8 + 2 HI → PbI2 + 2 HBF4"
  },
  {
    "id": "plate-lead-phosphate-precipitation-k",
    "name": "Reaction of lead nitrate with tripotassium phosphate",
    "reactants": [
      "pbno32",
      "k2hpo4",
      "koh"
    ],
    "products": [
      "pb3-po4-2",
      "kno3",
      "water"
    ],
    "enthalpy": -195,
    "desc": "Precipitation of lead phosphate.",
    "type": "metathesis",
    "effects": [],
    "net": "3 Pb(NO3)2 + 2 K2HPO4 + 2 KOH → Pb3(PO4)2 + 6 KNO3 + 2 H2O"
  },
  {
    "id": "plate-lead-phosphate-na2hpo4-na2co3",
    "name": "Lead phosphate conversion coating: reaction of lead nitrate with Na2HPO4 and Na2CO3",
    "reactants": [
      "pbno32",
      "na2hpo4",
      "na2co3"
    ],
    "products": [
      "pb3-po4-2",
      "nano3",
      "co2",
      "water"
    ],
    "enthalpy": -145,
    "desc": "Carbonate-buffered lead phosphate precipitation.",
    "type": "metathesis",
    "effects": [],
    "net": "3 Pb(NO3)2 + 2 Na2HPO4 + Na2CO3 → Pb3(PO4)2 + 6 NaNO3 + CO2 + H2O"
  },
  {
    "id": "plate-watts-nickel-carbonate-neutralize",
    "name": "Watts nickel bath pH adjustment: neutralization of excess acidity with nickel(II) carbonate",
    "reactants": [
      "nico3",
      "h2so4"
    ],
    "products": [
      "niso4",
      "co2",
      "water"
    ],
    "enthalpy": -90,
    "desc": "Routine tank maintenance raising Watts bath pH without introducing extraneous cations.",
    "type": "metathesis",
    "effects": [],
    "net": "NiCO3 + H2SO4 → NiSO4 + CO2 + H2O"
  },
  {
    "id": "plate-woods-nickel-strike-carbonate",
    "name": "Wood's nickel strike make-up: dissolution of nickel carbonate in concentrated HCl",
    "reactants": [
      "nico3",
      "hcl"
    ],
    "products": [
      "nicl2",
      "co2",
      "water"
    ],
    "enthalpy": -80,
    "desc": "Preparation of low-pH high-chloride Wood's strike electrolyte activating stainless steel.",
    "type": "metathesis",
    "effects": [],
    "net": "NiCO3 + 2 HCl → NiCl2 + CO2 + H2O"
  },
  {
    "id": "plate-nickel-sulfate-caustic-precipitation",
    "name": "Alkaline wastewater treatment: precipitation of nickel(II) hydroxide by caustic soda",
    "reactants": [
      "niso4",
      "naoh"
    ],
    "products": [
      "nioh2",
      "na2so4"
    ],
    "enthalpy": -92,
    "desc": "Heavy metal precipitation from spent Watts nickel plating rinse waters at pH 9.5.",
    "type": "metathesis",
    "effects": [],
    "net": "NiSO4 + 2 NaOH → Ni(OH)2 + Na2SO4"
  },
  {
    "id": "plate-nickel-carbonate-precipitation-chloride",
    "name": "Sodium carbonate precipitation of nickel carbonate from chloride effluent",
    "reactants": [
      "nicl2",
      "na2co3"
    ],
    "products": [
      "nico3",
      "nacl"
    ],
    "enthalpy": -45,
    "desc": "Recovery of nickel carbonate from spent strike baths.",
    "type": "metathesis",
    "effects": [],
    "net": "NiCl2 + Na2CO3 → NiCO3 + 2 NaCl"
  },
  {
    "id": "plate-hypophosphite-peroxide-destruction",
    "name": "Electroless nickel wastewater destruction: oxidation of hypophosphite by hydrogen peroxide",
    "reactants": [
      "h3po2",
      "h2o2"
    ],
    "products": [
      "h3po4",
      "water"
    ],
    "enthalpy": -380,
    "desc": "Advanced oxidation process destroying reducing hypophosphite before heavy metal precipitation.",
    "type": "metathesis",
    "effects": [],
    "net": "H3PO2 + 2 H2O2 → H3PO4 + 2 H2O"
  },
  {
    "id": "plate-hypophosphite-chlorine-oxidation-na",
    "name": "Destruction of spent electroless nickel reducing agent by chlorine gas",
    "reactants": [
      "nah2po2",
      "cl2",
      "water"
    ],
    "products": [
      "nah2po4",
      "hcl"
    ],
    "enthalpy": -420,
    "desc": "Chlorination tank destruction of sodium hypochlorite in ENP effluent.",
    "type": "metathesis",
    "effects": [],
    "net": "NaH2PO2 + 2 Cl2 + 2 H2O → NaH2PO4 + 4 HCl"
  },
  {
    "id": "plate-hypophosphite-chlorine-oxidation-acid",
    "name": "Vapor-phase destruction of hypophosphorous acid by chlorine",
    "reactants": [
      "h3po2",
      "cl2",
      "water"
    ],
    "products": [
      "h3po4",
      "hcl"
    ],
    "enthalpy": -435,
    "desc": "Oxidation of hypophosphorous acid effluent.",
    "type": "metathesis",
    "effects": [],
    "net": "H3PO2 + 2 Cl2 + 2 H2O → H3PO4 + 4 HCl"
  },
  {
    "id": "plate-hypophosphite-nitric-oxidation-acid",
    "name": "Nitric acid oxidation of hypophosphorous acid in spent plating bath",
    "reactants": [
      "h3po2",
      "hno3"
    ],
    "products": [
      "h3po4",
      "no2",
      "water"
    ],
    "enthalpy": -280,
    "desc": "Thermal digestion of hypophosphite with nitric acid.",
    "type": "metathesis",
    "effects": [],
    "net": "H3PO2 + 4 HNO3 → H3PO4 + 4 NO2 + 2 H2O"
  },
  {
    "id": "plate-hypophosphite-nitric-oxidation-na",
    "name": "Nitric acid oxidation of sodium hypophosphite in electroless nickel sludge",
    "reactants": [
      "nah2po2",
      "hno3"
    ],
    "products": [
      "nah2po4",
      "no2",
      "water"
    ],
    "enthalpy": -275,
    "desc": "Oxidative destruction of residual hypophosphite.",
    "type": "metathesis",
    "effects": [],
    "net": "NaH2PO2 + 4 HNO3 → NaH2PO4 + 4 NO2 + 2 H2O"
  },
  {
    "id": "plate-nickel-phosphate-precipitation-sulfate",
    "name": "Nickel phosphate conversion: reaction of nickel sulfate with trisodium phosphate",
    "reactants": [
      "niso4",
      "na3po4"
    ],
    "products": [
      "ni3-po4-2",
      "na2so4"
    ],
    "enthalpy": -150,
    "desc": "Precipitation of insoluble light green nickel orthophosphate.",
    "type": "metathesis",
    "effects": [],
    "net": "3 NiSO4 + 2 Na3PO4 → Ni3(PO4)2 + 3 Na2SO4"
  },
  {
    "id": "plate-nickel-phosphate-precipitation-chloride",
    "name": "Reaction of nickel chloride with trisodium phosphate",
    "reactants": [
      "nicl2",
      "na3po4"
    ],
    "products": [
      "ni3-po4-2",
      "nacl"
    ],
    "enthalpy": -165,
    "desc": "Formation of nickel phosphate.",
    "type": "metathesis",
    "effects": [],
    "net": "3 NiCl2 + 2 Na3PO4 → Ni3(PO4)2 + 6 NaCl"
  },
  {
    "id": "plate-nickel-phosphate-potassium-sulfate",
    "name": "Reaction of nickel sulfate with tripotassium phosphate",
    "reactants": [
      "niso4",
      "k3po4"
    ],
    "products": [
      "ni3-po4-2",
      "k2so4"
    ],
    "enthalpy": -155,
    "desc": "Precipitation of nickel phosphate.",
    "type": "metathesis",
    "effects": [],
    "net": "3 NiSO4 + 2 K3PO4 → Ni3(PO4)2 + 3 K2SO4"
  },
  {
    "id": "plate-nickel-phosphate-potassium-chloride",
    "name": "Reaction of nickel chloride with tripotassium phosphate",
    "reactants": [
      "nicl2",
      "k3po4"
    ],
    "products": [
      "ni3-po4-2",
      "kcl"
    ],
    "enthalpy": -170,
    "desc": "Precipitation of nickel phosphate.",
    "type": "metathesis",
    "effects": [],
    "net": "3 NiCl2 + 2 K3PO4 → Ni3(PO4)2 + 6 KCl"
  },
  {
    "id": "plate-hypophosphite-ferric-reduction",
    "name": "Ferric chloride test: reduction of ferric chloride by hypophosphorous acid in ENP baths",
    "reactants": [
      "h3po2",
      "fecl3",
      "water"
    ],
    "products": [
      "h3po4",
      "fecl2",
      "hcl"
    ],
    "enthalpy": -240,
    "desc": "Analytical redox titration determining residual hypophosphite reducing power.",
    "type": "metathesis",
    "effects": [],
    "net": "H3PO2 + 4 FeCl3 + 2 H2O → H3PO4 + 4 FeCl2 + 4 HCl"
  },
  {
    "id": "plate-copper-carbonate-precipitation-sulfate",
    "name": "Sodium carbonate precipitation of copper carbonate from plating rinse water",
    "reactants": [
      "cuso4",
      "na2co3"
    ],
    "products": [
      "cuco3",
      "na2so4"
    ],
    "enthalpy": -42,
    "desc": "Recovery of copper values as green basic copper carbonate precipitate.",
    "type": "metathesis",
    "effects": [],
    "net": "CuSO4 + Na2CO3 → CuCO3 + Na2SO4"
  },
  {
    "id": "plate-copper-carbonate-precipitation-chloride",
    "name": "Precipitation of copper carbonate from cupric chloride effluent",
    "reactants": [
      "cucl2",
      "na2co3"
    ],
    "products": [
      "cuco3",
      "nacl"
    ],
    "enthalpy": -45,
    "desc": "Carbonate precipitation recovering copper from spent etchant.",
    "type": "metathesis",
    "effects": [],
    "net": "CuCl2 + Na2CO3 → CuCO3 + 2 NaCl"
  },
  {
    "id": "plate-copper-pyrophosphate-hydrolysis",
    "name": "Degradation of copper pyrophosphate plating bath: thermal hydrolysis to orthophosphate",
    "reactants": [
      "k4p2o7",
      "water"
    ],
    "products": [
      "k2hpo4"
    ],
    "enthalpy": -35,
    "desc": "Undesirable buildup of orthophosphate decomposition byproduct in warm copper pyrophosphate tanks.",
    "type": "decomposition",
    "effects": [],
    "net": "K4P2O7 + H2O → 2 K2HPO4"
  },
  {
    "id": "plate-hypophosphite-copper-reduction-sulfate",
    "name": "Electroless copper strike: hypophosphite reduction of copper sulfate",
    "reactants": [
      "h3po2",
      "cuso4",
      "water"
    ],
    "products": [
      "cu",
      "h3po4",
      "h2so4"
    ],
    "enthalpy": -185,
    "desc": "Chemical reduction depositing metallic copper without formaldehyde reducing agent.",
    "type": "single_displacement",
    "effects": [],
    "net": "H3PO2 + 2 CuSO4 + 2 H2O → 2 Cu + H3PO4 + 2 H2SO4"
  },
  {
    "id": "plate-hypophosphite-copper-reduction-chloride",
    "name": "Sodium hypophosphite reduction of cupric chloride to metallic copper",
    "reactants": [
      "nah2po2",
      "cucl2",
      "water"
    ],
    "products": [
      "cu",
      "nah2po4",
      "hcl"
    ],
    "enthalpy": -195,
    "desc": "Autocatalytic immersion copper strike deposition on activated plastics.",
    "type": "single_displacement",
    "effects": [],
    "net": "NaH2PO2 + 2 CuCl2 + 2 H2O → 2 Cu + NaH2PO4 + 4 HCl"
  },
  {
    "id": "plate-copper-phosphate-precipitation-sulfate",
    "name": "Copper phosphate precipitation: reaction of copper sulfate with trisodium phosphate",
    "reactants": [
      "cuso4",
      "na3po4"
    ],
    "products": [
      "cu3-po4-2",
      "na2so4"
    ],
    "enthalpy": -145,
    "desc": "Precipitation of copper(II) phosphate from copper plating dragout.",
    "type": "metathesis",
    "effects": [],
    "net": "3 CuSO4 + 2 Na3PO4 → Cu3(PO4)2 + 3 Na2SO4"
  },
  {
    "id": "plate-copper-phosphate-precipitation-chloride",
    "name": "Reaction of copper(II) chloride with trisodium phosphate",
    "reactants": [
      "cucl2",
      "na3po4"
    ],
    "products": [
      "cu3-po4-2",
      "nacl"
    ],
    "enthalpy": -155,
    "desc": "Formation of insoluble cupric phosphate.",
    "type": "metathesis",
    "effects": [],
    "net": "3 CuCl2 + 2 Na3PO4 → Cu3(PO4)2 + 6 NaCl"
  },
  {
    "id": "plate-copper-sulfate-na2hpo4-naoh",
    "name": "Copper phosphating conversion: reaction of copper sulfate with Na2HPO4 and NaOH",
    "reactants": [
      "cuso4",
      "na2hpo4",
      "naoh"
    ],
    "products": [
      "cu3-po4-2",
      "na2so4",
      "water"
    ],
    "enthalpy": -190,
    "desc": "Precipitation of tertiary copper phosphate crystals.",
    "type": "metathesis",
    "effects": [],
    "net": "3 CuSO4 + 2 Na2HPO4 + 2 NaOH → Cu3(PO4)2 + 3 Na2SO4 + 2 H2O"
  },
  {
    "id": "plate-copper-sulfate-k2hpo4-koh",
    "name": "Potassium-buffered copper phosphate precipitation",
    "reactants": [
      "cuso4",
      "k2hpo4",
      "koh"
    ],
    "products": [
      "cu3-po4-2",
      "k2so4",
      "water"
    ],
    "enthalpy": -195,
    "desc": "Alkaline precipitation of cupric phosphate.",
    "type": "metathesis",
    "effects": [],
    "net": "3 CuSO4 + 2 K2HPO4 + 2 KOH → Cu3(PO4)2 + 3 K2SO4 + 2 H2O"
  },
  {
    "id": "plate-copper-chloride-k2hpo4-koh",
    "name": "Reaction of copper(II) chloride with dipotassium phosphate and KOH",
    "reactants": [
      "cucl2",
      "k2hpo4",
      "koh"
    ],
    "products": [
      "cu3-po4-2",
      "kcl",
      "water"
    ],
    "enthalpy": -205,
    "desc": "Precipitation of cupric phosphate.",
    "type": "metathesis",
    "effects": [],
    "net": "3 CuCl2 + 2 K2HPO4 + 2 KOH → Cu3(PO4)2 + 6 KCl + 2 H2O"
  },
  {
    "id": "plate-copper-sulfate-na2hpo4-na2co3",
    "name": "Carbonate-buffered copper phosphate precipitation",
    "reactants": [
      "cuso4",
      "na2hpo4",
      "na2co3"
    ],
    "products": [
      "cu3-po4-2",
      "na2so4",
      "co2",
      "water"
    ],
    "enthalpy": -150,
    "desc": "Recovery of copper values as tertiary phosphate.",
    "type": "metathesis",
    "effects": [],
    "net": "3 CuSO4 + 2 Na2HPO4 + Na2CO3 → Cu3(PO4)2 + 3 Na2SO4 + CO2 + H2O"
  },
  {
    "id": "plate-nickel-sulfate-na2hpo4-naoh",
    "name": "Nickel phosphate precipitation: reaction of nickel sulfate with Na2HPO4 and NaOH",
    "reactants": [
      "niso4",
      "na2hpo4",
      "naoh"
    ],
    "products": [
      "ni3-po4-2",
      "na2so4",
      "water"
    ],
    "enthalpy": -200,
    "desc": "Precipitation of nickel phosphate.",
    "type": "metathesis",
    "effects": [],
    "net": "3 NiSO4 + 2 Na2HPO4 + 2 NaOH → Ni3(PO4)2 + 3 Na2SO4 + 2 H2O"
  },
  {
    "id": "plate-nickel-chloride-na2hpo4-naoh",
    "name": "Reaction of nickel chloride with disodium phosphate and caustic soda",
    "reactants": [
      "nicl2",
      "na2hpo4",
      "naoh"
    ],
    "products": [
      "ni3-po4-2",
      "nacl",
      "water"
    ],
    "enthalpy": -215,
    "desc": "Formation of nickel phosphate conversion coating.",
    "type": "metathesis",
    "effects": [],
    "net": "3 NiCl2 + 2 Na2HPO4 + 2 NaOH → Ni3(PO4)2 + 6 NaCl + 2 H2O"
  },
  {
    "id": "plate-nickel-sulfate-k2hpo4-koh",
    "name": "Potassium-buffered nickel phosphate precipitation",
    "reactants": [
      "niso4",
      "k2hpo4",
      "koh"
    ],
    "products": [
      "ni3-po4-2",
      "k2so4",
      "water"
    ],
    "enthalpy": -205,
    "desc": "Neutralization producing insoluble nickel phosphate.",
    "type": "metathesis",
    "effects": [],
    "net": "3 NiSO4 + 2 K2HPO4 + 2 KOH → Ni3(PO4)2 + 3 K2SO4 + 2 H2O"
  },
  {
    "id": "plate-chrome-metabisulfite-reduction-na",
    "name": "Chromium plating wastewater reduction: reduction of hexavalent dichromate by sodium metabisulfite",
    "reactants": [
      "na2cr2o7",
      "na2s2o5",
      "h2so4"
    ],
    "products": [
      "cr2-so4-3",
      "na2so4",
      "water"
    ],
    "enthalpy": -720,
    "desc": "Automated redox reduction tank converting toxic carcinogenic Cr(VI) into Cr(III) at pH 2.0.",
    "type": "single_displacement",
    "effects": [],
    "net": "2 Na2Cr2O7 + 3 Na2S2O5 + 5 H2SO4 → 2 Cr2(SO4)3 + 5 Na2SO4 + 5 H2O"
  },
  {
    "id": "plate-chrome-metabisulfite-reduction-k",
    "name": "Potassium dichromate reduction by sodium metabisulfite in sulfuric acid",
    "reactants": [
      "k2cr2o7",
      "na2s2o5",
      "h2so4"
    ],
    "products": [
      "cr2-so4-3",
      "k2so4",
      "na2so4",
      "water"
    ],
    "enthalpy": -725,
    "desc": "Wastewater redox destruction of hexavalent chromium plating drag-out.",
    "type": "single_displacement",
    "effects": [],
    "net": "2 K2Cr2O7 + 3 Na2S2O5 + 5 H2SO4 → 2 Cr2(SO4)3 + 2 K2SO4 + 3 Na2SO4 + 5 H2O"
  },
  {
    "id": "plate-chrome-ferrous-sulfate-reduction-na",
    "name": "Wastewater treatment: reduction of sodium dichromate by ferrous sulfate",
    "reactants": [
      "na2cr2o7",
      "feso4",
      "h2so4"
    ],
    "products": [
      "cr2-so4-3",
      "fe2-so4-3",
      "na2so4",
      "water"
    ],
    "enthalpy": -540,
    "desc": "Rapid stoichiometric redox reduction using waste pickling liquor ferrous sulfate.",
    "type": "single_displacement",
    "effects": [],
    "net": "Na2Cr2O7 + 6 FeSO4 + 7 H2SO4 → Cr2(SO4)3 + 3 Fe2(SO4)3 + Na2SO4 + 7 H2O"
  },
  {
    "id": "plate-chrome-so2-reduction-na",
    "name": "Gas-phase sulfur dioxide reduction of sodium dichromate in sulfuric acid",
    "reactants": [
      "na2cr2o7",
      "so2",
      "h2so4"
    ],
    "products": [
      "cr2-so4-3",
      "na2so4",
      "water"
    ],
    "enthalpy": -610,
    "desc": "Industrial continuous flue gas reduction of hexavalent chromium plating wastewater.",
    "type": "single_displacement",
    "effects": [],
    "net": "Na2Cr2O7 + 3 SO2 + H2SO4 → Cr2(SO4)3 + Na2SO4 + H2O"
  },
  {
    "id": "plate-chrome-bisulfite-reduction-na",
    "name": "Wastewater reduction: reduction of sodium dichromate by sodium bisulfite in sulfuric acid",
    "reactants": [
      "na2cr2o7",
      "nahso3",
      "h2so4"
    ],
    "products": [
      "cr2-so4-3",
      "na2so4",
      "water"
    ],
    "enthalpy": -690,
    "desc": "Continuous sulfurous reduction of hexavalent chromium drag-out at pH 2.0-2.5.",
    "type": "single_displacement",
    "effects": [],
    "net": "2 Na2Cr2O7 + 6 NaHSO3 + 5 H2SO4 → 2 Cr2(SO4)3 + 5 Na2SO4 + 8 H2O"
  },
  {
    "id": "plate-chromic-trioxide-so2-reduction",
    "name": "Direct sulfur dioxide reduction of chromic acid trioxide to chromium(III) sulfate",
    "reactants": [
      "cro3",
      "so2"
    ],
    "products": [
      "cr2-so4-3"
    ],
    "enthalpy": -780,
    "desc": "Thermal reduction of chromic acid mists captured in scrubber packings.",
    "type": "synthesis",
    "effects": [],
    "net": "2 CrO3 + 3 SO2 → Cr2(SO4)3"
  },
  {
    "id": "plate-chromic-trioxide-h2s-reduction",
    "name": "Hydrogen sulfide gas reduction of chromic acid mist",
    "reactants": [
      "cro3",
      "h2s"
    ],
    "products": [
      "cr2o3",
      "s",
      "water"
    ],
    "enthalpy": -850,
    "desc": "Emergency dry gas abatement converting toxic CrO3 to insoluble chromium(III) oxide.",
    "type": "metathesis",
    "effects": [],
    "net": "2 CrO3 + 3 H2S → Cr2O3 + 3 S + 3 H2O"
  },
  {
    "id": "plate-chromium-chloride-potash-precipitation",
    "name": "Caustic potash precipitation of chromium hydroxide from trivalent chloride rinse",
    "reactants": [
      "crcl3",
      "koh"
    ],
    "products": [
      "cr-oh-3",
      "kcl"
    ],
    "enthalpy": -118,
    "desc": "Hydroxide precipitation of chromium(III).",
    "type": "metathesis",
    "effects": [],
    "net": "CrCl3 + 3 KOH → Cr(OH)3 + 3 KCl"
  },
  {
    "id": "plate-chromium-hydroxide-h2so4-redissolution",
    "name": "Redissolution of chromium(III) hydroxide in sulfuric acid regenerating chromic sulfate",
    "reactants": [
      "cr-oh-3",
      "h2so4"
    ],
    "products": [
      "cr2-so4-3",
      "water"
    ],
    "enthalpy": -185,
    "desc": "Re-acidification producing basic chromium sulfate for trivalent plating make-up.",
    "type": "metathesis",
    "effects": [],
    "net": "2 Cr(OH)3 + 3 H2SO4 → Cr2(SO4)3 + 6 H2O"
  },
  {
    "id": "plate-chromium-hydroxide-hcl-redissolution",
    "name": "Dissolution of chromium(III) hydroxide in hydrochloric acid",
    "reactants": [
      "cr-oh-3",
      "hcl"
    ],
    "products": [
      "crcl3",
      "water"
    ],
    "enthalpy": -145,
    "desc": "Regeneration of trivalent chromium chloride electroplating salts.",
    "type": "metathesis",
    "effects": [],
    "net": "Cr(OH)3 + 3 HCl → CrCl3 + 3 H2O"
  },
  {
    "id": "plate-chromate-lead-nitrate-precipitation-na",
    "name": "Sodium chromate precipitation of lead chromate yellow pigment from plating effluent",
    "reactants": [
      "na2cro4",
      "pbno32"
    ],
    "products": [
      "pbcro4",
      "nano3"
    ],
    "enthalpy": -65,
    "desc": "Scavenging residual chromate ions with lead nitrate forming insoluble chrome yellow pigment.",
    "type": "metathesis",
    "effects": [],
    "net": "Na2CrO4 + Pb(NO3)2 → PbCrO4 + 2 NaNO3"
  },
  {
    "id": "plate-dichromate-lead-nitrate-precipitation-k",
    "name": "Acidic precipitation of lead chromate from potassium dichromate and lead nitrate",
    "reactants": [
      "k2cr2o7",
      "pbno32",
      "water"
    ],
    "products": [
      "pbcro4",
      "kno3",
      "hno3"
    ],
    "enthalpy": -45,
    "desc": "Acidic precipitation of insoluble lead chromate.",
    "type": "metathesis",
    "effects": [],
    "net": "K2Cr2O7 + 2 Pb(NO3)2 + H2O → 2 PbCrO4 + 2 KNO3 + 2 HNO3"
  },
  {
    "id": "plate-dichromate-lead-nitrate-precipitation-na",
    "name": "Precipitation of lead chromate from sodium dichromate plating dragout",
    "reactants": [
      "na2cr2o7",
      "pbno32",
      "water"
    ],
    "products": [
      "pbcro4",
      "nano3",
      "hno3"
    ],
    "enthalpy": -42,
    "desc": "Precipitation of lead chromate from dichromate rinses.",
    "type": "metathesis",
    "effects": [],
    "net": "Na2Cr2O7 + 2 Pb(NO3)2 + H2O → 2 PbCrO4 + 2 NaNO3 + 2 HNO3"
  },
  {
    "id": "plate-chromate-conversion-zinc-dichromate",
    "name": "Hexavalent chromate conversion passivate on electrogalvanized zinc",
    "reactants": [
      "zn",
      "na2cr2o7",
      "h2so4"
    ],
    "products": [
      "znso4",
      "cr2-so4-3",
      "na2so4",
      "water"
    ],
    "enthalpy": -1120,
    "desc": "Formation of yellow iridescent corrosion-resistant chromate conversion film on zinc plate.",
    "type": "single_displacement",
    "effects": [],
    "net": "3 Zn + Na2Cr2O7 + 7 H2SO4 → 3 ZnSO4 + Cr2(SO4)3 + Na2SO4 + 7 H2O"
  },
  {
    "id": "plate-iron-phosphate-ferric-chloride-na",
    "name": "Iron phosphating conversion: precipitation of ferric phosphate by trisodium phosphate",
    "reactants": [
      "fecl3",
      "na3po4"
    ],
    "products": [
      "fepo4",
      "nacl"
    ],
    "enthalpy": -110,
    "desc": "Formation of amorphous iron phosphate conversion layer on sheet steel providing paint adhesion.",
    "type": "metathesis",
    "effects": [],
    "net": "FeCl3 + Na3PO4 → FePO4 + 3 NaCl"
  },
  {
    "id": "plate-iron-phosphate-ferric-chloride-k",
    "name": "Precipitation of ferric phosphate using tripotassium phosphate",
    "reactants": [
      "fecl3",
      "k3po4"
    ],
    "products": [
      "fepo4",
      "kcl"
    ],
    "enthalpy": -115,
    "desc": "Iron phosphating bath formulation.",
    "type": "metathesis",
    "effects": [],
    "net": "FeCl3 + K3PO4 → FePO4 + 3 KCl"
  },
  {
    "id": "plate-iron-phosphate-ferric-sulfate-na",
    "name": "Reaction of ferric sulfate with trisodium phosphate producing iron(III) phosphate",
    "reactants": [
      "fe2-so4-3",
      "na3po4"
    ],
    "products": [
      "fepo4",
      "na2so4"
    ],
    "enthalpy": -210,
    "desc": "Precipitation of ferric phosphate from sulfate phosphating formulations.",
    "type": "metathesis",
    "effects": [],
    "net": "Fe2(SO4)3 + 2 Na3PO4 → 2 FePO4 + 3 Na2SO4"
  },
  {
    "id": "plate-iron-phosphate-ferric-sulfate-k",
    "name": "Reaction of ferric sulfate with tripotassium phosphate",
    "reactants": [
      "fe2-so4-3",
      "k3po4"
    ],
    "products": [
      "fepo4",
      "k2so4"
    ],
    "enthalpy": -215,
    "desc": "Precipitation of iron(III) phosphate.",
    "type": "metathesis",
    "effects": [],
    "net": "Fe2(SO4)3 + 2 K3PO4 → 2 FePO4 + 3 K2SO4"
  },
  {
    "id": "plate-aluminum-phosphate-precipitation-chloride",
    "name": "Aluminum phosphating: precipitation of aluminum phosphate by trisodium phosphate",
    "reactants": [
      "alcl3",
      "na3po4"
    ],
    "products": [
      "alpo4",
      "nacl"
    ],
    "enthalpy": -140,
    "desc": "Conversion coating improving paint adhesion on aluminum extrusion profiles.",
    "type": "metathesis",
    "effects": [],
    "net": "AlCl3 + Na3PO4 → AlPO4 + 3 NaCl"
  },
  {
    "id": "plate-aluminum-phosphate-precipitation-sulfate",
    "name": "Reaction of aluminum sulfate with trisodium phosphate",
    "reactants": [
      "al2-so4-3",
      "na3po4"
    ],
    "products": [
      "alpo4",
      "na2so4"
    ],
    "enthalpy": -265,
    "desc": "Precipitation of insoluble aluminum phosphate.",
    "type": "metathesis",
    "effects": [],
    "net": "Al2(SO4)3 + 2 Na3PO4 → 2 AlPO4 + 3 Na2SO4"
  },
  {
    "id": "plate-aluminum-phosphate-na2hpo4-naoh",
    "name": "Aluminum phosphating with disodium phosphate and caustic soda",
    "reactants": [
      "alcl3",
      "na2hpo4",
      "naoh"
    ],
    "products": [
      "alpo4",
      "nacl",
      "water"
    ],
    "enthalpy": -180,
    "desc": "Alkaline phosphating formulation for aluminum coils.",
    "type": "metathesis",
    "effects": [],
    "net": "AlCl3 + Na2HPO4 + NaOH → AlPO4 + 3 NaCl + H2O"
  },
  {
    "id": "plate-aluminum-phosphate-k2hpo4-koh",
    "name": "Potassium-buffered aluminum phosphating conversion",
    "reactants": [
      "alcl3",
      "k2hpo4",
      "koh"
    ],
    "products": [
      "alpo4",
      "kcl",
      "water"
    ],
    "enthalpy": -185,
    "desc": "Formation of insoluble aluminum orthophosphate primer coating.",
    "type": "metathesis",
    "effects": [],
    "net": "AlCl3 + K2HPO4 + KOH → AlPO4 + 3 KCl + H2O"
  },
  {
    "id": "plate-iron-phosphate-ferric-chloride-na2hpo4",
    "name": "Ferric chloride reaction with Na2HPO4 and NaOH generating iron phosphate",
    "reactants": [
      "fecl3",
      "na2hpo4",
      "naoh"
    ],
    "products": [
      "fepo4",
      "nacl",
      "water"
    ],
    "enthalpy": -160,
    "desc": "Neutralized spray iron phosphating on stamped sheet metal.",
    "type": "metathesis",
    "effects": [],
    "net": "FeCl3 + Na2HPO4 + NaOH → FePO4 + 3 NaCl + H2O"
  },
  {
    "id": "plate-iron-phosphate-ferric-chloride-k2hpo4",
    "name": "Ferric chloride reaction with K2HPO4 and KOH",
    "reactants": [
      "fecl3",
      "k2hpo4",
      "koh"
    ],
    "products": [
      "fepo4",
      "kcl",
      "water"
    ],
    "enthalpy": -165,
    "desc": "Potassium-buffered iron phosphating conversion.",
    "type": "metathesis",
    "effects": [],
    "net": "FeCl3 + K2HPO4 + KOH → FePO4 + 3 KCl + H2O"
  },
  {
    "id": "plate-iron-phosphate-sulfate-na2hpo4",
    "name": "Ferric sulfate reaction with Na2HPO4 and NaOH",
    "reactants": [
      "fe2-so4-3",
      "na2hpo4",
      "naoh"
    ],
    "products": [
      "fepo4",
      "na2so4",
      "water"
    ],
    "enthalpy": -290,
    "desc": "Sulfate-based iron phosphating conversion formulation.",
    "type": "metathesis",
    "effects": [],
    "net": "Fe2(SO4)3 + 2 Na2HPO4 + 2 NaOH → 2 FePO4 + 3 Na2SO4 + 2 H2O"
  },
  {
    "id": "plate-iron-phosphate-sulfate-k2hpo4",
    "name": "Ferric sulfate reaction with K2HPO4 and KOH",
    "reactants": [
      "fe2-so4-3",
      "k2hpo4",
      "koh"
    ],
    "products": [
      "fepo4",
      "k2so4",
      "water"
    ],
    "enthalpy": -295,
    "desc": "Neutralized phosphating formulation for cold-rolled steel.",
    "type": "metathesis",
    "effects": [],
    "net": "Fe2(SO4)3 + 2 K2HPO4 + 2 KOH → 2 FePO4 + 3 K2SO4 + 2 H2O"
  },
  {
    "id": "plate-nickel-chloride-k2hpo4-koh",
    "name": "Reaction of nickel chloride with dipotassium phosphate and KOH",
    "reactants": [
      "nicl2",
      "k2hpo4",
      "koh"
    ],
    "products": [
      "ni3-po4-2",
      "kcl",
      "water"
    ],
    "enthalpy": -225,
    "desc": "Precipitation of nickel phosphate.",
    "type": "metathesis",
    "effects": [],
    "net": "3 NiCl2 + 2 K2HPO4 + 2 KOH → Ni3(PO4)2 + 6 KCl + 2 H2O"
  },
  {
    "id": "plate-nickel-phosphate-carbonate-buffer",
    "name": "Carbonate-buffered nickel phosphate precipitation",
    "reactants": [
      "niso4",
      "na2hpo4",
      "na2co3"
    ],
    "products": [
      "ni3-po4-2",
      "na2so4",
      "co2",
      "water"
    ],
    "enthalpy": -160,
    "desc": "Formation of nickel phosphate conversion layer.",
    "type": "metathesis",
    "effects": [],
    "net": "3 NiSO4 + 2 Na2HPO4 + Na2CO3 → Ni3(PO4)2 + 3 Na2SO4 + CO2 + H2O"
  },
  {
    "id": "plate-silver-nitric-electrolytic-strip",
    "name": "Nitric acid chemical stripping of defective silver electrodeposits from copper base",
    "reactants": [
      "ag",
      "hno3"
    ],
    "products": [
      "agno3",
      "no2",
      "water"
    ],
    "enthalpy": -62,
    "desc": "Chemical rack and parts stripping reclaiming precious silver from reject components.",
    "type": "single_displacement",
    "effects": [],
    "net": "Ag + 2 HNO3 → AgNO3 + NO2 + H2O"
  },
  {
    "id": "plate-silver-hydroxide-oxide-precipitation",
    "name": "Precipitation of silver(I) oxide from silver nitrate plating dragout by caustic soda",
    "reactants": [
      "agno3",
      "naoh"
    ],
    "products": [
      "ag2o",
      "nano3",
      "water"
    ],
    "enthalpy": -45,
    "desc": "Precious metal refining precipitating brown silver oxide from spent cyanide-free silver baths.",
    "type": "metathesis",
    "effects": [],
    "net": "2 AgNO3 + 2 NaOH → Ag2O + 2 NaNO3 + H2O"
  },
  {
    "id": "plate-silver-potash-oxide-precipitation",
    "name": "Caustic potash precipitation of silver(I) oxide from silver plating effluent",
    "reactants": [
      "agno3",
      "koh"
    ],
    "products": [
      "ag2o",
      "kno3",
      "water"
    ],
    "enthalpy": -48,
    "desc": "Alkaline precipitation recovering silver from dragout rinse tanks.",
    "type": "metathesis",
    "effects": [],
    "net": "2 AgNO3 + 2 KOH → Ag2O + 2 KNO3 + H2O"
  },
  {
    "id": "plate-silver-oxide-hcl-precipitation",
    "name": "Reaction of silver(I) oxide with hydrochloric acid forming silver chloride",
    "reactants": [
      "ag2o",
      "hcl"
    ],
    "products": [
      "agcl",
      "water"
    ],
    "enthalpy": -115,
    "desc": "Conversion of silver oxide cake into pure silver chloride horn silver.",
    "type": "metathesis",
    "effects": [],
    "net": "Ag2O + 2 HCl → 2 AgCl + H2O"
  },
  {
    "id": "plate-silver-oxide-hbr-precipitation",
    "name": "Precipitation of pale yellow silver bromide from silver oxide and hydrobromic acid",
    "reactants": [
      "ag2o",
      "hbr"
    ],
    "products": [
      "agbr",
      "water"
    ],
    "enthalpy": -125,
    "desc": "Conversion of reclaimed silver oxide into silver bromide.",
    "type": "metathesis",
    "effects": [],
    "net": "Ag2O + 2 HBr → 2 AgBr + H2O"
  },
  {
    "id": "plate-silver-carbonate-precipitation-na",
    "name": "Sodium carbonate precipitation of silver carbonate from dilute silver rinses",
    "reactants": [
      "agno3",
      "na2co3"
    ],
    "products": [
      "ag2co3",
      "nano3"
    ],
    "enthalpy": -40,
    "desc": "Scavenging precious silver as light yellow silver carbonate.",
    "type": "metathesis",
    "effects": [],
    "net": "2 AgNO3 + Na2CO3 → Ag2CO3 + 2 NaNO3"
  },
  {
    "id": "plate-silver-oxide-hi-precipitation",
    "name": "Precipitation of bright yellow silver iodide from silver oxide and hydriodic acid",
    "reactants": [
      "ag2o",
      "hi"
    ],
    "products": [
      "agi",
      "water"
    ],
    "enthalpy": -140,
    "desc": "Conversion of silver oxide cake into photographic and plating silver iodide.",
    "type": "metathesis",
    "effects": [],
    "net": "Ag2O + 2 HI → 2 AgI + H2O"
  },
  {
    "id": "plate-silver-carbonate-nitric-dissolution",
    "name": "Dissolution of silver carbonate in nitric acid regenerating silver nitrate",
    "reactants": [
      "ag2co3",
      "hno3"
    ],
    "products": [
      "agno3",
      "co2",
      "water"
    ],
    "enthalpy": -68,
    "desc": "Purification step producing high-purity silver nitrate plating crystals.",
    "type": "metathesis",
    "effects": [],
    "net": "Ag2CO3 + 2 HNO3 → 2 AgNO3 + CO2 + H2O"
  },
  {
    "id": "plate-pyrophosphate-bath-acidification-hcl",
    "name": "Acidification of copper pyrophosphate bath: neutralization by hydrochloric acid",
    "reactants": [
      "k4p2o7",
      "hcl"
    ],
    "products": [
      "kcl",
      "h4p2o7"
    ],
    "enthalpy": -95,
    "desc": "Waste treatment decomposing potassium pyrophosphate plating complex.",
    "type": "metathesis",
    "effects": [],
    "net": "K4P2O7 + 4 HCl → 4 KCl + H4P2O7"
  },
  {
    "id": "plate-pyrophosphate-bath-acidification-h2so4",
    "name": "Sulfuric acid decomposition of spent potassium pyrophosphate plating electrolyte",
    "reactants": [
      "k4p2o7",
      "h2so4"
    ],
    "products": [
      "k2so4",
      "h4p2o7"
    ],
    "enthalpy": -110,
    "desc": "Demulsification and heavy metal precipitation pretreatment for pyrophosphate plating effluent.",
    "type": "metathesis",
    "effects": [],
    "net": "K4P2O7 + 2 H2SO4 → 2 K2SO4 + H4P2O7"
  },
  {
    "id": "plate-silver-sulfate-precipitation-na",
    "name": "Precipitation of sparingly soluble silver sulfate by sodium sulfate",
    "reactants": [
      "agno3",
      "na2so4"
    ],
    "products": [
      "ag2so4",
      "nano3"
    ],
    "enthalpy": -22,
    "desc": "Fractional crystallization of silver sulfate plating salts.",
    "type": "metathesis",
    "effects": [],
    "net": "2 AgNO3 + Na2SO4 → Ag2SO4 + 2 NaNO3"
  },
  {
    "id": "plate-silver-sulfate-precipitation-k",
    "name": "Potassium sulfate precipitation of silver sulfate",
    "reactants": [
      "agno3",
      "k2so4"
    ],
    "products": [
      "ag2so4",
      "kno3"
    ],
    "enthalpy": -24,
    "desc": "Sulfate precipitation of silver.",
    "type": "metathesis",
    "effects": [],
    "net": "2 AgNO3 + K2SO4 → Ag2SO4 + 2 KNO3"
  },
  {
    "id": "plate-silver-tarnish-sulfide-formation",
    "name": "Environmental tarnishing of decorative silver electroplate by hydrogen sulfide",
    "reactants": [
      "ag",
      "h2s"
    ],
    "products": [
      "ag2s",
      "h2"
    ],
    "enthalpy": -28,
    "desc": "Atmospheric corrosion forming black silver sulfide tarnish film on electrical contacts.",
    "type": "single_displacement",
    "effects": [],
    "net": "2 Ag + H2S → Ag2S + H2"
  },
  {
    "id": "plate-anodized-aluminum-sealing-boiling-water",
    "name": "Hydrothermal sealing of sulfuric acid anodized aluminum: hydration of alumina to aluminum hydroxide",
    "reactants": [
      "al2o3",
      "water"
    ],
    "products": [
      "al-oh-3"
    ],
    "enthalpy": -98,
    "desc": "Boiling DI water sealing at 98°C swelling anodic porous alumina into dense protective bayerite.",
    "type": "synthesis",
    "effects": [],
    "net": "Al2O3 + 3 H2O → 2 Al(OH)3"
  }
];
