// Domain 31: Supramolecular & MOF Precursors (100 reactions)
import { addReaction } from "./generateBatch7.js";

export function buildDomain31SupramolecularMOFs(): void {
  const reactions = [
  {
    "id": "mof-cu-paddlewheel-cu-h2o2-synth",
    "name": "Oxidative synthesis of copper acetate paddlewheel from copper metal and hydrogen peroxide",
    "reactants": [
      "ch3cooh",
      "cu",
      "h2o2"
    ],
    "products": [
      "c8h12cu2o8",
      "water"
    ],
    "enthalpy": -320,
    "desc": "Oxidative dissolution of copper wire in glacial acetic acid with hydrogen peroxide.",
    "type": "synthesis",
    "effects": [],
    "net": "4 CH3COOH + 2 Cu + 2 H2O2 → C8H12Cu2O8 + 4 H2O"
  },
  {
    "id": "mof-cu-paddlewheel-cu2o-synth",
    "name": "Oxidative synthesis of copper(II) acetate paddlewheel from cuprous oxide",
    "reactants": [
      "ch3cooh",
      "cu2o",
      "o2"
    ],
    "products": [
      "c8h12cu2o8",
      "water"
    ],
    "enthalpy": -280,
    "desc": "Oxidative dissolution of cuprous oxide into paddlewheel dimer.",
    "type": "synthesis",
    "effects": [],
    "net": "8 CH3COOH + 2 Cu2O + O2 → 2 C8H12Cu2O8 + 4 H2O"
  },
  {
    "id": "mof-cu-paddlewheel-cuco3-synth",
    "name": "Carbonate route synthesis of copper(II) acetate paddlewheel",
    "reactants": [
      "ch3cooh",
      "cuco3"
    ],
    "products": [
      "c8h12cu2o8",
      "co2",
      "water"
    ],
    "enthalpy": -85,
    "desc": "Acid metathesis liberating carbon dioxide.",
    "type": "gas_evolution",
    "effects": [],
    "net": "4 CH3COOH + 2 CuCO3 → C8H12Cu2O8 + 2 CO2 + 2 H2O"
  },
  {
    "id": "mof-cu-paddlewheel-cleavage-hcl",
    "name": "Acid cleavage of copper acetate paddlewheel by hydrochloric acid",
    "reactants": [
      "c8h12cu2o8",
      "hcl"
    ],
    "products": [
      "cucl2",
      "ch3cooh"
    ],
    "enthalpy": -45,
    "desc": "Proton-driven disassembly of binuclear paddlewheel cluster.",
    "type": "redox_other",
    "effects": [],
    "net": "C8H12Cu2O8 + 4 HCl → 2 CuCl2 + 4 CH3COOH"
  },
  {
    "id": "mof-cu-paddlewheel-cleavage-h2so4",
    "name": "Sulfuric acid cleavage of copper acetate paddlewheel",
    "reactants": [
      "c8h12cu2o8",
      "h2so4"
    ],
    "products": [
      "cuso4",
      "ch3cooh"
    ],
    "enthalpy": -50,
    "desc": "Disassembly yielding copper sulfate and acetic acid.",
    "type": "redox_other",
    "effects": [],
    "net": "C8H12Cu2O8 + 2 H2SO4 → 2 CuSO4 + 4 CH3COOH"
  },
  {
    "id": "mof-cu-paddlewheel-cleavage-hno3",
    "name": "Nitric acid cleavage of paddlewheel dimer to copper(II) nitrate",
    "reactants": [
      "c8h12cu2o8",
      "hno3"
    ],
    "products": [
      "cu-no3-2",
      "ch3cooh"
    ],
    "enthalpy": -42,
    "desc": "Acid metathesis producing cupric nitrate solution.",
    "type": "redox_other",
    "effects": [],
    "net": "C8H12Cu2O8 + 4 HNO3 → 2 Cu(NO3)2 + 4 CH3COOH"
  },
  {
    "id": "mof-cu-paddlewheel-caustic-naoh",
    "name": "Caustic soda decomposition of copper paddlewheel complex",
    "reactants": [
      "c8h12cu2o8",
      "naoh"
    ],
    "products": [
      "cuoh2",
      "ch3coona"
    ],
    "enthalpy": -75,
    "desc": "Alkaline precipitation isolating blue copper(II) hydroxide.",
    "type": "precipitation",
    "effects": [],
    "net": "C8H12Cu2O8 + 4 NaOH → 2 Cu(OH)2 + 4 CH3COONa"
  },
  {
    "id": "mof-cu-paddlewheel-caustic-koh",
    "name": "Potassium hydroxide decomposition of copper paddlewheel",
    "reactants": [
      "c8h12cu2o8",
      "koh"
    ],
    "products": [
      "cuoh2",
      "ch3cook"
    ],
    "enthalpy": -78,
    "desc": "Alkaline precipitation yielding copper hydroxide.",
    "type": "precipitation",
    "effects": [],
    "net": "C8H12Cu2O8 + 4 KOH → 2 Cu(OH)2 + 4 CH3COOK"
  },
  {
    "id": "mof-cu-paddlewheel-sulfidation-na2s",
    "name": "Sulfidation of copper paddlewheel dimer by sodium sulfide",
    "reactants": [
      "c8h12cu2o8",
      "na2s"
    ],
    "products": [
      "cus",
      "ch3coona"
    ],
    "enthalpy": -165,
    "desc": "Quantitative precipitation of black covellite CuS.",
    "type": "precipitation",
    "effects": [],
    "net": "C8H12Cu2O8 + 2 Na2S → 2 CuS + 4 CH3COONa"
  },
  {
    "id": "mof-cu-paddlewheel-sulfidation-h2s",
    "name": "Hydrogen sulfide precipitation of copper paddlewheel",
    "reactants": [
      "c8h12cu2o8",
      "h2s"
    ],
    "products": [
      "cus",
      "ch3cooh"
    ],
    "enthalpy": -155,
    "desc": "Precipitation of black copper sulfide.",
    "type": "precipitation",
    "effects": [],
    "net": "C8H12Cu2O8 + 2 H2S → 2 CuS + 4 CH3COOH"
  },
  {
    "id": "mof-cu-paddlewheel-reduction-h2",
    "name": "Hydrogen gas reduction of copper paddlewheel to metallic copper",
    "reactants": [
      "c8h12cu2o8",
      "h2"
    ],
    "products": [
      "cu",
      "ch3cooh"
    ],
    "enthalpy": -140,
    "desc": "Heterogeneous gas-phase reduction depositing copper metal film.",
    "type": "redox_other",
    "effects": [],
    "net": "C8H12Cu2O8 + 2 H2 → 2 Cu + 4 CH3COOH"
  },
  {
    "id": "mof-cu-paddlewheel-reduction-co",
    "name": "Carbon monoxide reduction of copper paddlewheel dimer",
    "reactants": [
      "c8h12cu2o8",
      "co",
      "water"
    ],
    "products": [
      "cu",
      "co2",
      "ch3cooh"
    ],
    "enthalpy": -190,
    "desc": "Reductive carbonylation forming metallic copper.",
    "type": "redox_other",
    "effects": [],
    "net": "C8H12Cu2O8 + 10 CO + 6 H2O → 2 Cu + 6 CO2 + 6 CH3COOH"
  },
  {
    "id": "mof-cu-paddlewheel-cementation-fe",
    "name": "Iron metal cementation of copper from paddlewheel solution",
    "reactants": [
      "c8h12cu2o8",
      "fe"
    ],
    "products": [
      "cu",
      "ch3coo-2-fe"
    ],
    "enthalpy": -185,
    "desc": "Redox displacement depositing spongy copper powder.",
    "type": "redox_other",
    "effects": [],
    "net": "C8H12Cu2O8 + 2 Fe → 2 Cu + 2 (CH3COO)2Fe"
  },
  {
    "id": "mof-cu-paddlewheel-cementation-zn",
    "name": "Zinc metal displacement of copper from paddlewheel complex",
    "reactants": [
      "c8h12cu2o8",
      "zn"
    ],
    "products": [
      "cu",
      "ch3coo-2-zn"
    ],
    "enthalpy": -220,
    "desc": "Exothermic metal displacement.",
    "type": "redox_other",
    "effects": [],
    "net": "C8H12Cu2O8 + 2 Zn → 2 Cu + 2 (CH3COO)2Zn"
  },
  {
    "id": "mof-cu-paddlewheel-cementation-mg",
    "name": "Magnesium reduction of copper acetate paddlewheel",
    "reactants": [
      "c8h12cu2o8",
      "mg"
    ],
    "products": [
      "cu",
      "ch3coo-2-mg"
    ],
    "enthalpy": -310,
    "desc": "Vigorous exothermic metal displacement.",
    "type": "redox_other",
    "effects": [],
    "net": "C8H12Cu2O8 + 2 Mg → 2 Cu + 2 (CH3COO)2Mg"
  },
  {
    "id": "mof-cu-paddlewheel-combustion",
    "name": "Thermal combustion of copper acetate paddlewheel precursor",
    "reactants": [
      "c8h12cu2o8",
      "o2"
    ],
    "products": [
      "cuo",
      "co2",
      "water"
    ],
    "enthalpy": -3450,
    "desc": "Oxidative calcination yielding copper(II) oxide powder.",
    "type": "combustion",
    "effects": [],
    "net": "C8H12Cu2O8 + 8 O2 → 2 CuO + 8 CO2 + 6 H2O"
  },
  {
    "id": "mof-cu-paddlewheel-pyrolysis-cu",
    "name": "Inert thermal pyrolysis of copper paddlewheel producing copper metal",
    "reactants": [
      "c8h12cu2o8"
    ],
    "products": [
      "cu",
      "co",
      "h2"
    ],
    "enthalpy": 120,
    "desc": "Vacuum pyrolysis generating metallic copper film and syngas.",
    "type": "decomposition",
    "effects": [],
    "net": "C8H12Cu2O8 → 2 Cu + 8 CO + 6 H2"
  },
  {
    "id": "mof-cu-paddlewheel-nabh4-reduction",
    "name": "Sodium borohydride reduction of copper paddlewheel to Cu nanoparticles",
    "reactants": [
      "c8h12cu2o8",
      "nabh4",
      "water"
    ],
    "products": [
      "cu",
      "h3bo3",
      "ch3coona",
      "h2"
    ],
    "enthalpy": -480,
    "desc": "Chemical reduction synthesizing colloidal copper nanoparticles.",
    "type": "redox_other",
    "effects": [],
    "net": "C8H12Cu2O8 + 4 NaBH4 + 12 H2O → 2 Cu + 4 H3BO3 + 4 CH3COONa + 14 H2"
  },
  {
    "id": "mof-cu-paddlewheel-methanol-reduction",
    "name": "Methanol solvothermal reduction of copper paddlewheel",
    "reactants": [
      "c8h12cu2o8",
      "ch3oh"
    ],
    "products": [
      "cu",
      "hcho",
      "ch3cooh"
    ],
    "enthalpy": -95,
    "desc": "Alcohol reduction in solvothermal MOF synthesis.",
    "type": "redox_other",
    "effects": [],
    "net": "3 C8H12Cu2O8 + 6 CH3OH → 6 Cu + 10 HCHO + 10 CH3COOH"
  },
  {
    "id": "mof-cu-paddlewheel-oxalate-metathesis",
    "name": "Oxalate metathesis: conversion of paddlewheel to insoluble copper oxalate",
    "reactants": [
      "c8h12cu2o8",
      "h2c2o4"
    ],
    "products": [
      "cuc2o4",
      "ch3cooh"
    ],
    "enthalpy": -35,
    "desc": "Ligand exchange precipitating pale blue copper oxalate.",
    "type": "precipitation",
    "effects": [],
    "net": "C8H12Cu2O8 + 2 H2C2O4 → 2 CuC2O4 + 4 CH3COOH"
  },
  {
    "id": "mof-pc-copper-chloride-synth",
    "name": "Synthesis of copper phthalocyanine pigment from metal-free Pc and CuCl2",
    "reactants": [
      "c32h18n8_pc",
      "cucl2"
    ],
    "products": [
      "c32h16cu_n8_cupc",
      "hcl"
    ],
    "enthalpy": -140,
    "desc": "Template coordination forming brilliant cyan blue pigment Phthalo Blue (Pigment Blue 15).",
    "type": "synthesis",
    "effects": [],
    "net": "C32H18N8 + CuCl2 → C32H16CuN8 + 2 HCl"
  },
  {
    "id": "mof-pc-copper-sulfate-synth",
    "name": "Synthesis of copper phthalocyanine from copper(II) sulfate",
    "reactants": [
      "c32h18n8_pc",
      "cuso4"
    ],
    "products": [
      "c32h16cu_n8_cupc",
      "h2so4"
    ],
    "enthalpy": -145,
    "desc": "Coordination inserting copper into the central cavity.",
    "type": "synthesis",
    "effects": [],
    "net": "C32H18N8 + CuSO4 → C32H16CuN8 + H2SO4"
  },
  {
    "id": "mof-pc-copper-nitrate-synth",
    "name": "Copper nitrate insertion into phthalocyanine macrocycle",
    "reactants": [
      "c32h18n8_pc",
      "cu-no3-2"
    ],
    "products": [
      "c32h16cu_n8_cupc",
      "hno3"
    ],
    "enthalpy": -135,
    "desc": "Synthesis of copper phthalocyanine complex.",
    "type": "synthesis",
    "effects": [],
    "net": "C32H18N8 + Cu(NO3)2 → C32H16CuN8 + 2 HNO3"
  },
  {
    "id": "mof-pc-paddlewheel-cu-synth",
    "name": "Paddlewheel dimer transmetallation into copper phthalocyanine",
    "reactants": [
      "c32h18n8_pc",
      "c8h12cu2o8"
    ],
    "products": [
      "c32h16cu_n8_cupc",
      "ch3cooh"
    ],
    "enthalpy": -180,
    "desc": "Facile metalation using copper acetate paddlewheel precursor.",
    "type": "synthesis",
    "effects": [],
    "net": "2 C32H18N8 + C8H12Cu2O8 → 2 C32H16CuN8 + 4 CH3COOH"
  },
  {
    "id": "mof-cupc-combustion",
    "name": "Complete combustion of copper phthalocyanine in air",
    "reactants": [
      "c32h16cu_n8_cupc",
      "o2"
    ],
    "products": [
      "cuo",
      "co2",
      "no2",
      "water"
    ],
    "enthalpy": -18200,
    "desc": "Thermal combustion of stable aromatic macrocycle.",
    "type": "combustion",
    "effects": [],
    "net": "2 C32H16CuN8 + 89 O2 → 2 CuO + 64 CO2 + 16 NO2 + 16 H2O"
  },
  {
    "id": "mof-pc-free-combustion",
    "name": "Combustion of metal-free phthalocyanine macrocycle",
    "reactants": [
      "c32h18n8_pc",
      "o2"
    ],
    "products": [
      "co2",
      "no2",
      "water"
    ],
    "enthalpy": -17800,
    "desc": "High-temperature combustion of free base phthalocyanine.",
    "type": "combustion",
    "effects": [],
    "net": "2 C32H18N8 + 89 O2 → 64 CO2 + 16 NO2 + 18 H2O"
  },
  {
    "id": "mof-cupc-nitric-digestion",
    "name": "Oxidative acid digestion of copper phthalocyanine in fuming nitric acid",
    "reactants": [
      "c32h16cu_n8_cupc",
      "hno3"
    ],
    "products": [
      "cu-no3-2",
      "co2",
      "no2",
      "water"
    ],
    "enthalpy": -7600,
    "desc": "Exhaustive oxidative destruction of macrocyclic ring.",
    "type": "redox_other",
    "effects": [],
    "net": "C32H16CuN8 + 180 HNO3 → Cu(NO3)2 + 32 CO2 + 186 NO2 + 98 H2O"
  },
  {
    "id": "mof-pc-free-nitric-digestion",
    "name": "Nitric acid oxidative cleavage of metal-free phthalocyanine",
    "reactants": [
      "c32h18n8_pc",
      "hno3"
    ],
    "products": [
      "co2",
      "no2",
      "water"
    ],
    "enthalpy": -7400,
    "desc": "Acid digestion liberating nitrogen dioxide.",
    "type": "redox_other",
    "effects": [],
    "net": "C32H18N8 + 178 HNO3 → 32 CO2 + 186 NO2 + 98 H2O"
  },
  {
    "id": "mof-cupc-sulfuric-demetal",
    "name": "Concentrated sulfuric acid demetallation of copper phthalocyanine",
    "reactants": [
      "c32h16cu_n8_cupc",
      "h2so4"
    ],
    "products": [
      "cuso4",
      "c32h18n8_pc"
    ],
    "enthalpy": 65,
    "desc": "Acid-promoted demetallation recovering free phthalocyanine.",
    "type": "redox_other",
    "effects": [],
    "net": "C32H16CuN8 + H2SO4 → CuSO4 + C32H18N8"
  },
  {
    "id": "mof-pc-direct-copper-metalation",
    "name": "Direct thermal metalation of phthalocyanine by metallic copper",
    "reactants": [
      "c32h18n8_pc",
      "cu"
    ],
    "products": [
      "c32h16cu_n8_cupc",
      "h2"
    ],
    "enthalpy": -85,
    "desc": "Vapor-phase metalation on copper substrate producing epitaxial CuPc thin films.",
    "type": "redox_other",
    "effects": [],
    "net": "C32H18N8 + Cu → C32H16CuN8 + H2"
  },
  {
    "id": "mof-pc-cuo-metalation",
    "name": "Solid-state reaction of copper(II) oxide with phthalocyanine",
    "reactants": [
      "c32h18n8_pc",
      "cuo"
    ],
    "products": [
      "c32h16cu_n8_cupc",
      "water"
    ],
    "enthalpy": -95,
    "desc": "Thermal condensation producing water and CuPc.",
    "type": "redox_other",
    "effects": [],
    "net": "C32H18N8 + CuO → C32H16CuN8 + H2O"
  },
  {
    "id": "mof-pc-cuoh2-metalation",
    "name": "Reaction of copper(II) hydroxide with phthalocyanine",
    "reactants": [
      "c32h18n8_pc",
      "cuoh2"
    ],
    "products": [
      "c32h16cu_n8_cupc",
      "water"
    ],
    "enthalpy": -110,
    "desc": "Facile condensation in high-boiling solvent.",
    "type": "redox_other",
    "effects": [],
    "net": "C32H18N8 + Cu(OH)2 → C32H16CuN8 + 2 H2O"
  },
  {
    "id": "mof-pc-cuco3-metalation",
    "name": "Copper carbonate metalation of free phthalocyanine",
    "reactants": [
      "c32h18n8_pc",
      "cuco3"
    ],
    "products": [
      "c32h16cu_n8_cupc",
      "co2",
      "water"
    ],
    "enthalpy": -75,
    "desc": "Decarboxylation driving copper insertion.",
    "type": "redox_other",
    "effects": [],
    "net": "C32H18N8 + CuCO3 → C32H16CuN8 + CO2 + H2O"
  },
  {
    "id": "mof-cupc-sulfide-displacement-h2s",
    "name": "Hydrogen sulfide demetallation of copper phthalocyanine",
    "reactants": [
      "c32h16cu_n8_cupc",
      "h2s"
    ],
    "products": [
      "cus",
      "c32h18n8_pc"
    ],
    "enthalpy": -45,
    "desc": "Sulfidation displacing copper as copper sulfide precipitate.",
    "type": "redox_other",
    "effects": [],
    "net": "C32H16CuN8 + H2S → CuS + C32H18N8"
  },
  {
    "id": "mof-cupc-sulfide-displacement-na2s",
    "name": "Sodium sulfide demetallation of CuPc in aqueous alkaline medium",
    "reactants": [
      "c32h16cu_n8_cupc",
      "na2s",
      "water"
    ],
    "products": [
      "cus",
      "c32h18n8_pc",
      "naoh"
    ],
    "enthalpy": -55,
    "desc": "Alkaline sulfidation recovering metal-free macrocycle.",
    "type": "redox_other",
    "effects": [],
    "net": "C32H16CuN8 + Na2S + 2 H2O → CuS + C32H18N8 + 2 NaOH"
  },
  {
    "id": "mof-pta-esterification-methanol",
    "name": "Fischer esterification of terephthalic acid to dimethyl terephthalate",
    "reactants": [
      "c8h6o4_pta",
      "ch3oh"
    ],
    "products": [
      "dimethyl-terephthalate",
      "water"
    ],
    "enthalpy": -25,
    "desc": "Synthesis of dimethyl terephthalate (DMT) precursor.",
    "type": "synthesis",
    "effects": [],
    "net": "C8H6O4 + 2 CH3OH → C10H10O4 + 2 H2O"
  },
  {
    "id": "mof-dmt-saponification-naoh",
    "name": "Alkaline saponification of dimethyl terephthalate by sodium hydroxide",
    "reactants": [
      "dimethyl-terephthalate",
      "naoh",
      "hcl"
    ],
    "products": [
      "c8h6o4_pta",
      "ch3oh",
      "nacl"
    ],
    "enthalpy": -65,
    "desc": "Saponification with acid workup recovering terephthalic acid.",
    "type": "redox_other",
    "effects": [],
    "net": "C10H10O4 + 2 NaOH + 2 HCl → C8H6O4 + 2 CH3OH + 2 NaCl"
  },
  {
    "id": "mof-pta-esterification-glycol",
    "name": "Esterification of terephthalic acid with ethylene glycol to BHET",
    "reactants": [
      "c8h6o4_pta",
      "c2h6o2"
    ],
    "products": [
      "c12h14o6_bhet",
      "water"
    ],
    "enthalpy": -30,
    "desc": "Synthesis of bis(2-hydroxyethyl) terephthalate monomer for PET.",
    "type": "synthesis",
    "effects": [],
    "net": "C8H6O4 + 2 C2H6O2 → C12H14O6 + 2 H2O"
  },
  {
    "id": "mof-bhet-hydrolysis-water",
    "name": "Aqueous neutral hydrolysis of BHET monomer",
    "reactants": [
      "c12h14o6_bhet",
      "water"
    ],
    "products": [
      "c8h6o4_pta",
      "c2h6o2"
    ],
    "enthalpy": 30,
    "desc": "Chemical recycling of polyester monomer.",
    "type": "redox_other",
    "effects": [],
    "net": "C12H14O6 + 2 H2O → C8H6O4 + 2 C2H6O2"
  },
  {
    "id": "mof-pta-combustion",
    "name": "Complete combustion of terephthalic acid MOF linker",
    "reactants": [
      "c8h6o4_pta",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -3210,
    "desc": "Exothermic combustion.",
    "type": "combustion",
    "effects": [],
    "net": "2 C8H6O4 + 15 O2 → 16 CO2 + 6 H2O"
  },
  {
    "id": "mof-phenolphthalein-synthesis",
    "name": "Condensation synthesis of phenolphthalein from phthalic anhydride and phenol",
    "reactants": [
      "phthalic-anhydride",
      "c6h6o"
    ],
    "products": [
      "phenolphthalein",
      "water"
    ],
    "enthalpy": -65,
    "desc": "Acid-catalyzed condensation producing classic pH indicator.",
    "type": "synthesis",
    "effects": [],
    "net": "C8H4O3 + 2 C6H6O → C20H14O4 + H2O"
  },
  {
    "id": "mof-phthalic-anhydride-naoh",
    "name": "Alkaline ring opening of phthalic anhydride by sodium hydroxide",
    "reactants": [
      "phthalic-anhydride",
      "naoh",
      "hcl"
    ],
    "products": [
      "c8h6o4",
      "nacl"
    ],
    "enthalpy": -70,
    "desc": "Alkaline opening and acid workup.",
    "type": "redox_other",
    "effects": [],
    "net": "C8H4O3 + NaOH + HCl → C8H6O4 + NaCl"
  },
  {
    "id": "mof-pta-zinc-oxide-neutralize",
    "name": "Acid digestion of zinc oxide terephthalate framework (MOF-5 node dissolution)",
    "reactants": [
      "c8h6o4_pta",
      "zno",
      "hcl"
    ],
    "products": [
      "zncl2",
      "c8h6o4",
      "water"
    ],
    "enthalpy": -65,
    "desc": "Acidic dissolution decomposing zinc oxide coordination node into soluble zinc chloride.",
    "type": "redox_other",
    "effects": [],
    "net": "C8H6O4 + ZnO + 2 HCl → ZnCl2 + C8H6O4 + H2O"
  },
  {
    "id": "mof-pta-copper-hydroxide-neutralize",
    "name": "Reaction of terephthalic acid with copper(II) hydroxide",
    "reactants": [
      "c8h6o4_pta",
      "cuoh2",
      "hno3"
    ],
    "products": [
      "cu-no3-2",
      "c8h6o4",
      "water"
    ],
    "enthalpy": -40,
    "desc": "Acid digestion of copper terephthalate framework.",
    "type": "redox_other",
    "effects": [],
    "net": "2 C8H6O4 + Cu(OH)2 + 2 HNO3 → Cu(NO3)2 + 2 C8H6O4 + 2 H2O"
  },
  {
    "id": "mof-dmp-hydrolysis-water",
    "name": "Aqueous hydrolysis of dimethyl phthalate",
    "reactants": [
      "c10h10o4",
      "water"
    ],
    "products": [
      "c8h6o4",
      "ch3oh"
    ],
    "enthalpy": 45,
    "desc": "Hydrolysis regenerating phthalic acid.",
    "type": "redox_other",
    "effects": [],
    "net": "C10H10O4 + 2 H2O → C8H6O4 + 2 CH3OH"
  },
  {
    "id": "mof-phthalic-anhydride-combustion",
    "name": "Thermal combustion of phthalic anhydride",
    "reactants": [
      "phthalic-anhydride",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -3150,
    "desc": "Exothermic combustion.",
    "type": "combustion",
    "effects": [],
    "net": "2 C8H4O3 + 15 O2 → 16 CO2 + 4 H2O"
  },
  {
    "id": "mof-phthalic-acid-combustion",
    "name": "Combustion of ortho-phthalic acid",
    "reactants": [
      "c8h6o4",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -3180,
    "desc": "Combustion.",
    "type": "combustion",
    "effects": [],
    "net": "2 C8H6O4 + 15 O2 → 16 CO2 + 6 H2O"
  },
  {
    "id": "mof-phenolphthalein-combustion",
    "name": "Complete combustion of phenolphthalein indicator",
    "reactants": [
      "phenolphthalein",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -8950,
    "desc": "Combustion.",
    "type": "combustion",
    "effects": [],
    "net": "2 C20H14O4 + 43 O2 → 40 CO2 + 14 H2O"
  },
  {
    "id": "mof-bhet-combustion",
    "name": "Thermal combustion of BHET monomer",
    "reactants": [
      "c12h14o6_bhet",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -5100,
    "desc": "Combustion.",
    "type": "combustion",
    "effects": [],
    "net": "2 C12H14O6 + 25 O2 → 24 CO2 + 14 H2O"
  },
  {
    "id": "mof-dmt-combustion",
    "name": "Thermal combustion of dimethyl terephthalate",
    "reactants": [
      "dimethyl-terephthalate",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -4680,
    "desc": "Combustion.",
    "type": "combustion",
    "effects": [],
    "net": "2 C10H10O4 + 21 O2 → 20 CO2 + 10 H2O"
  },
  {
    "id": "mof-crown-combustion",
    "name": "Complete combustion of 18-crown-6 macrocycle",
    "reactants": [
      "c12h24o6_18crown6",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -7150,
    "desc": "Combustion of cyclic polyether.",
    "type": "combustion",
    "effects": [],
    "net": "C12H24O6 + 15 O2 → 12 CO2 + 12 H2O"
  },
  {
    "id": "mof-crown-nitric-digestion",
    "name": "Oxidative acid digestion of 18-crown-6 in hot nitric acid",
    "reactants": [
      "c12h24o6_18crown6",
      "hno3"
    ],
    "products": [
      "co2",
      "no2",
      "water"
    ],
    "enthalpy": -3400,
    "desc": "Nitric acid oxidation.",
    "type": "redox_other",
    "effects": [],
    "net": "C12H24O6 + 60 HNO3 → 12 CO2 + 60 NO2 + 42 H2O"
  },
  {
    "id": "mof-crown-sulfuric-digestion",
    "name": "Concentrated sulfuric acid oxidative charring of 18-crown-6",
    "reactants": [
      "c12h24o6_18crown6",
      "h2so4"
    ],
    "products": [
      "co2",
      "so2",
      "water"
    ],
    "enthalpy": -2850,
    "desc": "Acid decomposition.",
    "type": "redox_other",
    "effects": [],
    "net": "C12H24O6 + 30 H2SO4 → 12 CO2 + 30 SO2 + 42 H2O"
  },
  {
    "id": "mof-crown-chlorine-oxidation",
    "name": "Chlorine gas and oxygen oxidation of 18-crown-6",
    "reactants": [
      "c12h24o6_18crown6",
      "cl2",
      "o2"
    ],
    "products": [
      "co2",
      "hcl"
    ],
    "enthalpy": -4200,
    "desc": "Oxidative degradation by halogens.",
    "type": "redox_other",
    "effects": [],
    "net": "C12H24O6 + 12 Cl2 + 9 O2 → 12 CO2 + 24 HCl"
  },
  {
    "id": "mof-crown-bromine-oxidation",
    "name": "Bromine and oxygen oxidation of 18-crown-6 ether ring",
    "reactants": [
      "c12h24o6_18crown6",
      "br2",
      "o2"
    ],
    "products": [
      "co2",
      "hbr"
    ],
    "enthalpy": -3980,
    "desc": "Halogen degradation.",
    "type": "redox_other",
    "effects": [],
    "net": "C12H24O6 + 12 Br2 + 9 O2 → 12 CO2 + 24 HBr"
  },
  {
    "id": "mof-crown-permanganate-cleavage",
    "name": "Permanganate oxidative degradation of 18-crown-6 host ether",
    "reactants": [
      "c12h24o6_18crown6",
      "kmno4",
      "h2so4"
    ],
    "products": [
      "co2",
      "mnso4",
      "k2so4",
      "water"
    ],
    "enthalpy": -4950,
    "desc": "Oxidative ring cleavage in sulfuric acid.",
    "type": "redox_other",
    "effects": [],
    "net": "C12H24O6 + 12 KMnO4 + 18 H2SO4 → 12 CO2 + 12 MnSO4 + 6 K2SO4 + 30 H2O"
  },
  {
    "id": "mof-crown-dichromate-cleavage",
    "name": "Acid dichromate destruction of 18-crown-6",
    "reactants": [
      "c12h24o6_18crown6",
      "k2cr2o7",
      "h2so4"
    ],
    "products": [
      "co2",
      "cr2-so4-3",
      "k2so4",
      "water"
    ],
    "enthalpy": -4650,
    "desc": "Chromic acid oxidation.",
    "type": "redox_other",
    "effects": [],
    "net": "C12H24O6 + 10 K2Cr2O7 + 40 H2SO4 → 12 CO2 + 10 Cr2(SO4)3 + 10 K2SO4 + 52 H2O"
  },
  {
    "id": "mof-crown-peroxide-cleavage",
    "name": "Fenton/peroxide degradation of 18-crown-6",
    "reactants": [
      "c12h24o6_18crown6",
      "h2o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -5800,
    "desc": "Hydroxyl radical oxidative destruction.",
    "type": "redox_other",
    "effects": [],
    "net": "C12H24O6 + 30 H2O2 → 12 CO2 + 42 H2O"
  },
  {
    "id": "mof-crown-hydrogenation",
    "name": "Exhaustive catalytic hydrogenolysis of 18-crown-6 to ethane and water",
    "reactants": [
      "c12h24o6_18crown6",
      "h2"
    ],
    "products": [
      "c2h6",
      "water"
    ],
    "enthalpy": -620,
    "desc": "Hydrogenolysis of ether linkages.",
    "type": "redox_other",
    "effects": [],
    "net": "C12H24O6 + 12 H2 → 6 C2H6 + 6 H2O"
  },
  {
    "id": "mof-crown-ptc-toluene-permanganate",
    "name": "Crown ether phase-transfer oxidation of toluene to benzoic acid",
    "reactants": [
      "c7h8",
      "kmno4",
      "h2so4"
    ],
    "products": [
      "c6h5cooh",
      "mnso4",
      "k2so4",
      "water"
    ],
    "enthalpy": -640,
    "desc": "Purple benzene phase-transfer oxidation solubilized by 18-crown-6.",
    "type": "redox_other",
    "effects": [],
    "net": "5 C7H8 + 6 KMnO4 + 9 H2SO4 → 5 C6H5COOH + 6 MnSO4 + 3 K2SO4 + 14 H2O"
  },
  {
    "id": "mof-crown-ptc-alcohol-dichromate",
    "name": "Phase-transfer oxidation of 1-phenylethanol to acetophenone by dichromate",
    "reactants": [
      "c8h10o",
      "k2cr2o7",
      "h2so4"
    ],
    "products": [
      "acetophenone",
      "cr2-so4-3",
      "k2so4",
      "water"
    ],
    "enthalpy": -480,
    "desc": "Crown-ether promoted oxidation.",
    "type": "redox_other",
    "effects": [],
    "net": "3 C8H10O + K2Cr2O7 + 4 H2SO4 → 3 C8H8O + Cr2(SO4)3 + K2SO4 + 7 H2O"
  },
  {
    "id": "mof-crown-ptc-benzyl-alcohol",
    "name": "Oxidation of benzyl alcohol to benzoic acid via permanganate and crown ether",
    "reactants": [
      "c7h8o",
      "kmno4",
      "h2so4"
    ],
    "products": [
      "c6h5cooh",
      "mnso4",
      "k2so4",
      "water"
    ],
    "enthalpy": -720,
    "desc": "Phase-transfer catalytic alcohol oxidation.",
    "type": "redox_other",
    "effects": [],
    "net": "5 C7H8O + 4 KMnO4 + 6 H2SO4 → 5 C6H5COOH + 4 MnSO4 + 2 K2SO4 + 11 H2O"
  },
  {
    "id": "mof-crown-syngas-cracking",
    "name": "Thermal steam reforming of 18-crown-6",
    "reactants": [
      "c12h24o6_18crown6",
      "water"
    ],
    "products": [
      "co",
      "h2"
    ],
    "enthalpy": 890,
    "desc": "High-temperature catalytic steam reforming.",
    "type": "decomposition",
    "effects": [],
    "net": "C12H24O6 + 6 H2O → 12 CO + 18 H2"
  },
  {
    "id": "mof-crown-co2-reforming",
    "name": "Dry carbon dioxide reforming of 18-crown-6",
    "reactants": [
      "c12h24o6_18crown6",
      "co2"
    ],
    "products": [
      "co",
      "h2"
    ],
    "enthalpy": 940,
    "desc": "Catalytic dry reforming producing syngas.",
    "type": "redox_other",
    "effects": [],
    "net": "C12H24O6 + 6 CO2 → 18 CO + 12 H2"
  },
  {
    "id": "mof-crown-methane-pyrolysis",
    "name": "Thermal cracking of 18-crown-6 with methane",
    "reactants": [
      "c12h24o6_18crown6",
      "ch4"
    ],
    "products": [
      "c2h6",
      "co",
      "h2"
    ],
    "enthalpy": 410,
    "desc": "Hydrocarbon co-pyrolysis.",
    "type": "redox_other",
    "effects": [],
    "net": "C12H24O6 + 6 CH4 → 6 C2H6 + 6 CO + 6 H2"
  },
  {
    "id": "mof-dithizone-h2-hydrogenolysis",
    "name": "Catalytic hydrogenolysis of dithizone chelating agent",
    "reactants": [
      "c13h12n4s_dithizone",
      "h2"
    ],
    "products": [
      "c6h6",
      "ch4",
      "ammonia",
      "h2s"
    ],
    "enthalpy": -410,
    "desc": "Reductive cleavage into benzene, methane, ammonia, and hydrogen sulfide.",
    "type": "redox_other",
    "effects": [],
    "net": "C13H12N4S + 9 H2 → 2 C6H6 + CH4 + 4 NH3 + H2S"
  },
  {
    "id": "mof-dithizone-combustion",
    "name": "Thermal combustion of dithizone analytical reagent",
    "reactants": [
      "c13h12n4s_dithizone",
      "o2"
    ],
    "products": [
      "co2",
      "no2",
      "so2",
      "water"
    ],
    "enthalpy": -8250,
    "desc": "Exothermic combustion.",
    "type": "combustion",
    "effects": [],
    "net": "C13H12N4S + 21 O2 → 13 CO2 + 4 NO2 + SO2 + 6 H2O"
  },
  {
    "id": "mof-dithizone-nitric-digestion",
    "name": "Oxidative nitric acid digestion of dithizone",
    "reactants": [
      "c13h12n4s_dithizone",
      "hno3"
    ],
    "products": [
      "co2",
      "no2",
      "h2so4",
      "water"
    ],
    "enthalpy": -3950,
    "desc": "Acid digestion destroying organic sulfur and nitrogen.",
    "type": "redox_other",
    "effects": [],
    "net": "C13H12N4S + 86 HNO3 → 13 CO2 + 90 NO2 + H2SO4 + 48 H2O"
  },
  {
    "id": "mof-dithizone-chlorine-oxidation",
    "name": "Chlorine water oxidative degradation of dithizone",
    "reactants": [
      "c13h12n4s_dithizone",
      "cl2",
      "water"
    ],
    "products": [
      "co2",
      "hcl",
      "h2so4",
      "no2"
    ],
    "enthalpy": -4600,
    "desc": "Halogen destruction of sulfur ligand.",
    "type": "redox_other",
    "effects": [],
    "net": "C13H12N4S + 43 Cl2 + 38 H2O → 13 CO2 + 86 HCl + H2SO4 + 4 NO2"
  },
  {
    "id": "mof-dithizone-peroxide-oxidation",
    "name": "Hydrogen peroxide oxidation of dithizone to sulfate",
    "reactants": [
      "c13h12n4s_dithizone",
      "h2o2"
    ],
    "products": [
      "co2",
      "h2so4",
      "no2",
      "water"
    ],
    "enthalpy": -5100,
    "desc": "Peroxide destruction of chromophore.",
    "type": "redox_other",
    "effects": [],
    "net": "C13H12N4S + 43 H2O2 → 13 CO2 + H2SO4 + 4 NO2 + 48 H2O"
  },
  {
    "id": "mof-dithizone-permanganate-cleavage",
    "name": "Permanganate oxidation of dithizone in acidic solution",
    "reactants": [
      "c13h12n4s_dithizone",
      "kmno4",
      "h2so4"
    ],
    "products": [
      "co2",
      "mnso4",
      "k2so4",
      "no2",
      "water"
    ],
    "enthalpy": -6200,
    "desc": "Acid permanganate destruction of dithizone reagent.",
    "type": "redox_other",
    "effects": [],
    "net": "5 C13H12N4S + 86 KMnO4 + 124 H2SO4 → 65 CO2 + 86 MnSO4 + 43 K2SO4 + 20 NO2 + 154 H2O"
  },
  {
    "id": "mof-dithizone-dichromate-cleavage",
    "name": "Acid dichromate oxidation of dithizone",
    "reactants": [
      "c13h12n4s_dithizone",
      "k2cr2o7",
      "h2so4"
    ],
    "products": [
      "co2",
      "cr2-so4-3",
      "k2so4",
      "no2",
      "water"
    ],
    "enthalpy": -5900,
    "desc": "Chromic acid digestion.",
    "type": "redox_other",
    "effects": [],
    "net": "3 C13H12N4S + 43 K2Cr2O7 + 169 H2SO4 → 39 CO2 + 43 Cr2(SO4)3 + 43 K2SO4 + 12 NO2 + 187 H2O"
  },
  {
    "id": "mof-dithizone-bromine-oxidation",
    "name": "Bromine water oxidation of dithizone",
    "reactants": [
      "c13h12n4s_dithizone",
      "br2",
      "water"
    ],
    "products": [
      "co2",
      "hbr",
      "h2so4",
      "no2"
    ],
    "enthalpy": -4300,
    "desc": "Brominative cleavage.",
    "type": "redox_other",
    "effects": [],
    "net": "C13H12N4S + 43 Br2 + 38 H2O → 13 CO2 + 86 HBr + H2SO4 + 4 NO2"
  },
  {
    "id": "mof-dithizone-copper-complex-calcination",
    "name": "Thermal calcination of copper dithizonate analytical residue",
    "reactants": [
      "c13h12n4s_dithizone",
      "cucl2",
      "o2"
    ],
    "products": [
      "cuo",
      "co2",
      "hcl",
      "no2",
      "so2",
      "water"
    ],
    "enthalpy": -8400,
    "desc": "Oxidative destruction of copper dithizone chelate.",
    "type": "redox_other",
    "effects": [],
    "net": "C13H12N4S + 5 CuCl2 + 21 O2 → 5 CuO + 13 CO2 + 10 HCl + 4 NO2 + SO2 + H2O"
  },
  {
    "id": "mof-dithizone-lead-complex-calcination",
    "name": "Thermal calcination of lead dithizonate precipitate",
    "reactants": [
      "c13h12n4s_dithizone",
      "pbno32",
      "o2"
    ],
    "products": [
      "pbo",
      "co2",
      "no2",
      "so2",
      "water"
    ],
    "enthalpy": -8100,
    "desc": "Analytical calcination of lead dithizone complex.",
    "type": "redox_other",
    "effects": [],
    "net": "2 C13H12N4S + 2 Pb(NO3)2 + 41 O2 → 2 PbO + 26 CO2 + 12 NO2 + 2 SO2 + 12 H2O"
  },
  {
    "id": "mof-dithizone-zinc-complex-calcination",
    "name": "Oxidative calcination of zinc dithizonate residue",
    "reactants": [
      "c13h12n4s_dithizone",
      "zncl2",
      "o2"
    ],
    "products": [
      "zno",
      "co2",
      "hcl",
      "no2",
      "so2",
      "water"
    ],
    "enthalpy": -8350,
    "desc": "Thermal destruction of zinc dithizone chelate.",
    "type": "redox_other",
    "effects": [],
    "net": "C13H12N4S + 5 ZnCl2 + 21 O2 → 5 ZnO + 13 CO2 + 10 HCl + 4 NO2 + SO2 + H2O"
  },
  {
    "id": "mof-dithizone-mercury-complex-calcination",
    "name": "Thermal calcination of mercury dithizonate analytical extract",
    "reactants": [
      "c13h12n4s_dithizone",
      "hgcl2",
      "o2"
    ],
    "products": [
      "hgo",
      "co2",
      "hcl",
      "no2",
      "so2",
      "water"
    ],
    "enthalpy": -8200,
    "desc": "Decomposition of mercury chelate.",
    "type": "redox_other",
    "effects": [],
    "net": "C13H12N4S + 5 HgCl2 + 21 O2 → 5 HgO + 13 CO2 + 10 HCl + 4 NO2 + SO2 + H2O"
  },
  {
    "id": "mof-dithizone-silver-complex-calcination",
    "name": "Thermal decomposition of silver dithizonate residue",
    "reactants": [
      "c13h12n4s_dithizone",
      "agno3",
      "o2"
    ],
    "products": [
      "ag2o",
      "co2",
      "no2",
      "so2",
      "water"
    ],
    "enthalpy": -7950,
    "desc": "Calcination of silver dithizone complex.",
    "type": "redox_other",
    "effects": [],
    "net": "2 C13H12N4S + 4 AgNO3 + 41 O2 → 2 Ag2O + 26 CO2 + 12 NO2 + 2 SO2 + 12 H2O"
  },
  {
    "id": "mof-dithizone-sulfuric-charring",
    "name": "Concentrated sulfuric acid dehydration and charring of dithizone",
    "reactants": [
      "c13h12n4s_dithizone",
      "h2so4"
    ],
    "products": [
      "co2",
      "so2",
      "no2",
      "water"
    ],
    "enthalpy": -3200,
    "desc": "Acid digestion.",
    "type": "redox_other",
    "effects": [],
    "net": "C13H12N4S + 42 H2SO4 → 13 CO2 + 43 SO2 + 4 NO2 + 48 H2O"
  },
  {
    "id": "mof-dithizone-pyrolysis",
    "name": "Inert atmosphere pyrolysis of dithizone",
    "reactants": [
      "c13h12n4s_dithizone"
    ],
    "products": [
      "c",
      "ch4",
      "ammonia",
      "h2s",
      "n2"
    ],
    "enthalpy": 185,
    "desc": "Thermal cracking into elemental carbon, methane, and volatile gases.",
    "type": "decomposition",
    "effects": [],
    "net": "C13H12N4S → 12 C + CH4 + 2 NH3 + H2S + N2"
  },
  {
    "id": "mof-alum-k-naoh-precipitation",
    "name": "Caustic soda precipitation of aluminum hydroxide from potassium alum",
    "reactants": [
      "k-al-so4-2",
      "naoh"
    ],
    "products": [
      "al-oh-3",
      "k2so4",
      "na2so4"
    ],
    "enthalpy": -185,
    "desc": "Alkaline precipitation isolating aluminum hydroxide.",
    "type": "precipitation",
    "effects": [],
    "net": "2 KAl(SO4)2 + 6 NaOH → 2 Al(OH)3 + K2SO4 + 3 Na2SO4"
  },
  {
    "id": "mof-alum-k-koh-precipitation",
    "name": "Potassium hydroxide reaction with potassium alum",
    "reactants": [
      "k-al-so4-2",
      "koh"
    ],
    "products": [
      "al-oh-3",
      "k2so4"
    ],
    "enthalpy": -195,
    "desc": "Quantitative precipitation of Al(OH)3.",
    "type": "precipitation",
    "effects": [],
    "net": "KAl(SO4)2 + 3 KOH → Al(OH)3 + 2 K2SO4"
  },
  {
    "id": "mof-alum-k-ammonia-precipitation",
    "name": "Ammonia precipitation of aluminum hydroxide from potassium alum crystal solution",
    "reactants": [
      "k-al-so4-2",
      "ammonia",
      "water"
    ],
    "products": [
      "al-oh-3",
      "k2so4",
      "nh4-2-so4"
    ],
    "enthalpy": -170,
    "desc": "Ammoniacal precipitation of white gelatinous Al(OH)3.",
    "type": "precipitation",
    "effects": [],
    "net": "2 KAl(SO4)2 + 6 NH3 + 6 H2O → 2 Al(OH)3 + K2SO4 + 3 (NH4)2SO4"
  },
  {
    "id": "mof-alum-k-bacl2-metathesis",
    "name": "Barium chloride precipitation of sulfate from potassium alum",
    "reactants": [
      "k-al-so4-2",
      "bacl2"
    ],
    "products": [
      "baso4",
      "kcl",
      "alcl3"
    ],
    "enthalpy": -48,
    "desc": "Quantitative sulfate removal isolating AlCl3.",
    "type": "precipitation",
    "effects": [],
    "net": "KAl(SO4)2 + 2 BaCl2 → 2 BaSO4 + KCl + AlCl3"
  },
  {
    "id": "mof-alum-k-bano32-metathesis",
    "name": "Barium nitrate metathesis of potassium alum",
    "reactants": [
      "k-al-so4-2",
      "ba-no3-2"
    ],
    "products": [
      "baso4",
      "kno3",
      "al-no3-3"
    ],
    "enthalpy": -46,
    "desc": "Conversion of alum to aluminum nitrate solution.",
    "type": "precipitation",
    "effects": [],
    "net": "KAl(SO4)2 + 2 BaN2O6 → 2 BaSO4 + KNO3 + Al(NO3)3"
  },
  {
    "id": "mof-alum-k-na2co3-precipitation",
    "name": "Sodium carbonate neutralization of potassium alum",
    "reactants": [
      "k-al-so4-2",
      "na2co3",
      "water"
    ],
    "products": [
      "al-oh-3",
      "k2so4",
      "na2so4",
      "co2"
    ],
    "enthalpy": -140,
    "desc": "Effervescent precipitation of basic aluminum hydroxide.",
    "type": "precipitation",
    "effects": [],
    "net": "2 KAl(SO4)2 + 3 Na2CO3 + 3 H2O → 2 Al(OH)3 + K2SO4 + 3 Na2SO4 + 3 CO2"
  },
  {
    "id": "mof-alum-nh4-naoh-precipitation",
    "name": "Caustic soda precipitation of aluminum hydroxide from ammonium alum",
    "reactants": [
      "nh4-al-so4-2",
      "naoh"
    ],
    "products": [
      "al-oh-3",
      "ammonia",
      "na2so4",
      "water"
    ],
    "enthalpy": -195,
    "desc": "Alkaline precipitation releasing gaseous ammonia.",
    "type": "precipitation",
    "effects": [],
    "net": "NH4Al(SO4)2 + 4 NaOH → Al(OH)3 + NH3 + 2 Na2SO4 + H2O"
  },
  {
    "id": "mof-alum-nh4-koh-precipitation",
    "name": "Potassium hydroxide reaction with ammonium alum",
    "reactants": [
      "nh4-al-so4-2",
      "koh"
    ],
    "products": [
      "al-oh-3",
      "ammonia",
      "k2so4",
      "water"
    ],
    "enthalpy": -200,
    "desc": "Precipitation of Al(OH)3 with ammonia evolution.",
    "type": "precipitation",
    "effects": [],
    "net": "NH4Al(SO4)2 + 4 KOH → Al(OH)3 + NH3 + 2 K2SO4 + H2O"
  },
  {
    "id": "mof-alum-nh4-bacl2-metathesis",
    "name": "Barium chloride metathesis of ammonium alum",
    "reactants": [
      "nh4-al-so4-2",
      "bacl2"
    ],
    "products": [
      "baso4",
      "ammonium-chloride",
      "alcl3"
    ],
    "enthalpy": -49,
    "desc": "Precipitation of barium sulfate.",
    "type": "precipitation",
    "effects": [],
    "net": "NH4Al(SO4)2 + 2 BaCl2 → 2 BaSO4 + NH4Cl + AlCl3"
  },
  {
    "id": "mof-alum-nh4-bano32-metathesis",
    "name": "Barium nitrate metathesis of ammonium alum",
    "reactants": [
      "nh4-al-so4-2",
      "ba-no3-2"
    ],
    "products": [
      "baso4",
      "nh4no3",
      "al-no3-3"
    ],
    "enthalpy": -47,
    "desc": "Conversion of ammonium alum to nitrate salts.",
    "type": "precipitation",
    "effects": [],
    "net": "NH4Al(SO4)2 + 2 BaN2O6 → 2 BaSO4 + NH4NO3 + Al(NO3)3"
  },
  {
    "id": "mof-luminol-o2-chemiluminescence",
    "name": "Alkaline oxygen oxidation of luminol generating disodium 3-aminophthalate and blue light",
    "reactants": [
      "luminol",
      "o2",
      "naoh"
    ],
    "products": [
      "na2-aminophthalate",
      "n2",
      "water"
    ],
    "enthalpy": -320,
    "desc": "Chemiluminescent oxidation producing excited aminophthalate emitting 425 nm blue light.",
    "type": "redox_other",
    "effects": [],
    "net": "C8H7N3O2 + O2 + 2 NaOH → C8H5NNa2O4 + N2 + 2 H2O"
  },
  {
    "id": "mof-luminol-caocl2-chemiluminescence",
    "name": "Calcium hypochlorite oxidation of luminol in alkaline solution",
    "reactants": [
      "luminol",
      "ca-ocl-2",
      "naoh"
    ],
    "products": [
      "na2-aminophthalate",
      "n2",
      "cacl2",
      "water"
    ],
    "enthalpy": -360,
    "desc": "Chemiluminescent detection of hypochlorite bleaching agents.",
    "type": "redox_other",
    "effects": [],
    "net": "C8H7N3O2 + Ca(OCl)2 + 2 NaOH → C8H5NNa2O4 + N2 + CaCl2 + 2 H2O"
  },
  {
    "id": "mof-luminol-naocl-chemiluminescence",
    "name": "Sodium hypochlorite catalyzed chemiluminescent oxidation of luminol",
    "reactants": [
      "luminol",
      "naocl",
      "naoh"
    ],
    "products": [
      "na2-aminophthalate",
      "n2",
      "nacl",
      "water"
    ],
    "enthalpy": -350,
    "desc": "Rapid light emission in hypochlorite presence.",
    "type": "redox_other",
    "effects": [],
    "net": "C8H7N3O2 + 2 NaOCl + 2 NaOH → C8H5NNa2O4 + N2 + 2 NaCl + 2 H2O"
  },
  {
    "id": "mof-luminol-hno3-digestion",
    "name": "Oxidative acid digestion of luminol in hot nitric acid",
    "reactants": [
      "luminol",
      "hno3"
    ],
    "products": [
      "co2",
      "no2",
      "water"
    ],
    "enthalpy": -2950,
    "desc": "Acid digestion destroying heterocyclic hydrazide ring.",
    "type": "redox_other",
    "effects": [],
    "net": "C8H7N3O2 + 47 HNO3 → 8 CO2 + 50 NO2 + 27 H2O"
  },
  {
    "id": "mof-aminophthalate-o2-combustion",
    "name": "Thermal combustion of disodium 3-aminophthalate",
    "reactants": [
      "na2-aminophthalate",
      "o2"
    ],
    "products": [
      "na2co3",
      "co2",
      "no2",
      "water"
    ],
    "enthalpy": -3650,
    "desc": "Combustion of aromatic sodium dicarboxylate salt.",
    "type": "combustion",
    "effects": [],
    "net": "4 C8H5NNa2O4 + 35 O2 → 4 Na2CO3 + 28 CO2 + 4 NO2 + 10 H2O"
  },
  {
    "id": "mof-aminophthalate-hno3-digestion",
    "name": "Nitric acid oxidation of disodium 3-aminophthalate",
    "reactants": [
      "na2-aminophthalate",
      "hno3"
    ],
    "products": [
      "nano3",
      "co2",
      "no2",
      "water"
    ],
    "enthalpy": -1850,
    "desc": "Acid oxidation recovering sodium nitrate.",
    "type": "redox_other",
    "effects": [],
    "net": "C8H5NNa2O4 + 37 HNO3 → 2 NaNO3 + 8 CO2 + 36 NO2 + 21 H2O"
  },
  {
    "id": "mof-aminophthalate-sulfuric-digestion",
    "name": "Sulfuric acid digestion of disodium aminophthalate",
    "reactants": [
      "na2-aminophthalate",
      "h2so4"
    ],
    "products": [
      "na2so4",
      "co2",
      "so2",
      "no2",
      "water"
    ],
    "enthalpy": -1450,
    "desc": "Exhaustive acid charring.",
    "type": "redox_other",
    "effects": [],
    "net": "2 C8H5NNa2O4 + 37 H2SO4 → 2 Na2SO4 + 16 CO2 + 35 SO2 + 2 NO2 + 42 H2O"
  },
  {
    "id": "mof-luminol-combustion",
    "name": "Thermal combustion of luminol in air",
    "reactants": [
      "luminol",
      "o2"
    ],
    "products": [
      "co2",
      "no2",
      "water"
    ],
    "enthalpy": -4150,
    "desc": "Exothermic combustion.",
    "type": "combustion",
    "effects": [],
    "net": "4 C8H7N3O2 + 47 O2 → 32 CO2 + 12 NO2 + 14 H2O"
  },
  {
    "id": "mof-luminol-chlorine-oxidation",
    "name": "Chlorine gas oxidation of luminol in water",
    "reactants": [
      "luminol",
      "cl2",
      "water"
    ],
    "products": [
      "co2",
      "hcl",
      "no2"
    ],
    "enthalpy": -3100,
    "desc": "Halogen degradation of luminol.",
    "type": "redox_other",
    "effects": [],
    "net": "2 C8H7N3O2 + 47 Cl2 + 40 H2O → 16 CO2 + 94 HCl + 6 NO2"
  },
  {
    "id": "mof-luminol-permanganate-acid-oxidation",
    "name": "Acid permanganate destructive oxidation of luminol",
    "reactants": [
      "luminol",
      "kmno4",
      "h2so4"
    ],
    "products": [
      "co2",
      "no2",
      "mnso4",
      "k2so4",
      "water"
    ],
    "enthalpy": -4400,
    "desc": "Strong chemical oxidation destroying luminol.",
    "type": "redox_other",
    "effects": [],
    "net": "10 C8H7N3O2 + 94 KMnO4 + 141 H2SO4 → 80 CO2 + 30 NO2 + 94 MnSO4 + 47 K2SO4 + 176 H2O"
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
