// Domain 33: Petrochemistry, Industrial Monomers & Polymer Syntheses (100 reactions)
export const DOMAIN_33_REACTIONS = [
  {
    "id": "petro-adipic-cyclohexane-hno3",
    "name": "Industrial oxidation of cyclohexane to adipic acid by nitric acid",
    "reactants": [
      "c6h12",
      "hno3"
    ],
    "products": [
      "c6h10o4_adipic",
      "n2o",
      "water"
    ],
    "enthalpy": -1250,
    "desc": "Two-stage KA-oil oxidation pathway yielding adipic acid crystals.",
    "type": "redox_other",
    "effects": [],
    "net": "4 C6H12 + 10 HNO3 → 4 C6H10O4 + 5 N2O + 9 H2O"
  },
  {
    "id": "petro-adipic-combustion",
    "name": "Thermal combustion of adipic acid monomer",
    "reactants": [
      "c6h10o4_adipic",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -2800,
    "desc": "Standard bomb calorimetry combustion of hexanedioic acid.",
    "type": "combustion",
    "effects": [],
    "net": "2 C6H10O4 + 13 O2 → 12 CO2 + 10 H2O"
  },
  {
    "id": "petro-nylon-salt-formation",
    "name": "Synthesis of Nylon 6,6 salt (hexamethylenediammonium adipate)",
    "reactants": [
      "c6h10o4_adipic",
      "c6h16n2_hda"
    ],
    "products": [
      "c12h26n2o4_nylon_salt"
    ],
    "enthalpy": -120,
    "desc": "Equimolar neutralization yielding crystalline stoichiometric Nylon salt.",
    "type": "acid_base_neutralization",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "White crystalline flakes of Nylon 6,6 salt precipitate"
      }
    ],
    "net": "C6H10O4 + C6H16N2 → C12H26N2O4"
  },
  {
    "id": "petro-nylon-salt-polycondensation",
    "name": "Thermal melt polycondensation of Nylon salt to Nylon 6,6 repeating unit",
    "reactants": [
      "c12h26n2o4_nylon_salt"
    ],
    "products": [
      "c12h22n2o2_nylon66_dimer",
      "water"
    ],
    "enthalpy": 85,
    "desc": "High-temperature autoclaving dehydrating nylon salt into polyamide molten fiber resin.",
    "type": "decomposition",
    "effects": [],
    "net": "C12H26N2O4 → C12H22N2O2 + 2 H2O"
  },
  {
    "id": "petro-hda-combustion",
    "name": "Complete combustion of hexamethylenediamine monomer",
    "reactants": [
      "c6h16n2_hda",
      "o2"
    ],
    "products": [
      "co2",
      "n2",
      "water"
    ],
    "enthalpy": -4200,
    "desc": "Exothermic combustion of aliphatic diamine.",
    "type": "combustion",
    "effects": [],
    "net": "C6H16N2 + 10 O2 → 6 CO2 + N2 + 8 H2O"
  },
  {
    "id": "petro-caprolactam-hydrolysis",
    "name": "Hydrolytic ring opening of caprolactam to 6-aminocaproic acid",
    "reactants": [
      "c6h11no_caprolactam",
      "water"
    ],
    "products": [
      "c6h13no2_aminohexanoic"
    ],
    "enthalpy": -15,
    "desc": "Initiation step in hydrolytic ring-opening polymerization of Nylon-6.",
    "type": "synthesis",
    "effects": [],
    "net": "C6H11NO + H2O → C6H13NO2"
  },
  {
    "id": "petro-caprolactam-combustion",
    "name": "Thermal combustion of caprolactam monomer",
    "reactants": [
      "c6h11no_caprolactam",
      "o2"
    ],
    "products": [
      "co2",
      "n2",
      "water"
    ],
    "enthalpy": -3600,
    "desc": "Complete combustion yielding carbon dioxide, nitrogen, and steam.",
    "type": "combustion",
    "effects": [],
    "net": "4 C6H11NO + 33 O2 → 24 CO2 + 2 N2 + 22 H2O"
  },
  {
    "id": "petro-aminohexanoic-combustion",
    "name": "Complete combustion of 6-aminocaproic acid",
    "reactants": [
      "c6h13no2_aminohexanoic",
      "o2"
    ],
    "products": [
      "co2",
      "n2",
      "water"
    ],
    "enthalpy": -3550,
    "desc": "Bomb combustion of linear amino acid nylon intermediate.",
    "type": "combustion",
    "effects": [],
    "net": "4 C6H13NO2 + 33 O2 → 24 CO2 + 2 N2 + 26 H2O"
  },
  {
    "id": "petro-adipic-nitric-digestion",
    "name": "Exhaustive nitric acid digestion of adipic acid",
    "reactants": [
      "c6h10o4_adipic",
      "hno3"
    ],
    "products": [
      "co2",
      "no2",
      "water"
    ],
    "enthalpy": -2100,
    "desc": "Vigorous wet digestion generating dense brown nitrogen dioxide fumes.",
    "type": "synthesis",
    "effects": [],
    "net": "C6H10O4 + 26 HNO3 → 6 CO2 + 26 NO2 + 18 H2O"
  },
  {
    "id": "petro-caprolactam-nitric-digestion",
    "name": "Nitric acid oxidation of caprolactam",
    "reactants": [
      "c6h11no_caprolactam",
      "hno3"
    ],
    "products": [
      "co2",
      "no2",
      "water"
    ],
    "enthalpy": -2450,
    "desc": "Acid digestion liberating nitrogen dioxide.",
    "type": "synthesis",
    "effects": [],
    "net": "C6H11NO + 37 HNO3 → 6 CO2 + 38 NO2 + 24 H2O"
  },
  {
    "id": "petro-pta-permanganate-oxidation",
    "name": "Permanganate oxidation of p-xylene to purified terephthalic acid (PTA)",
    "reactants": [
      "c8h10",
      "kmno4",
      "h2so4"
    ],
    "products": [
      "c8h6o4_pta",
      "mnso4",
      "k2so4",
      "water"
    ],
    "enthalpy": -1450,
    "desc": "Vigorous oxidative cleavage of benzylic methyl groups precipitating white insoluble PTA crystals.",
    "type": "redox_other",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Dense white crystals of terephthalic acid precipitate"
      }
    ],
    "net": "5 C8H10 + 12 KMnO4 + 18 H2SO4 → 5 C8H6O4 + 12 MnSO4 + 6 K2SO4 + 28 H2O"
  },
  {
    "id": "petro-acrylic-acid-permanganate",
    "name": "Permanganate total oxidation of acrylic acid wastewater",
    "reactants": [
      "c3h4o2_acrylic_acid",
      "kmno4",
      "h2so4"
    ],
    "products": [
      "co2",
      "mnso4",
      "k2so4",
      "water"
    ],
    "enthalpy": -1420,
    "desc": "Advanced oxidation process treating acrylic wastewater effluent.",
    "type": "redox_other",
    "effects": [],
    "net": "5 C3H4O2 + 12 KMnO4 + 18 H2SO4 → 15 CO2 + 12 MnSO4 + 6 K2SO4 + 28 H2O"
  },
  {
    "id": "petro-acrylic-acid-dichromate",
    "name": "Potassium dichromate oxidation of acrylic acid effluent",
    "reactants": [
      "c3h4o2_acrylic_acid",
      "k2cr2o7",
      "h2so4"
    ],
    "products": [
      "co2",
      "cr2-so4-3",
      "k2so4",
      "water"
    ],
    "enthalpy": -1350,
    "desc": "Chemical oxygen demand COD digestion of acrylic acid.",
    "type": "redox_other",
    "effects": [],
    "net": "C3H4O2 + 2 K2Cr2O7 + 8 H2SO4 → 3 CO2 + 2 Cr2(SO4)3 + 2 K2SO4 + 10 H2O"
  },
  {
    "id": "petro-bhet-polycondensation",
    "name": "Melt-phase polycondensation of BHET to PET repeating unit",
    "reactants": [
      "c12h14o6_bhet"
    ],
    "products": [
      "c10h8o4_pet_unit",
      "c2h6o2"
    ],
    "enthalpy": 42,
    "desc": "Transesterification releasing ethylene glycol byproduct under high vacuum.",
    "type": "decomposition",
    "effects": [],
    "net": "C12H14O6 → C10H8O4 + C2H6O2"
  },
  {
    "id": "petro-mma-permanganate",
    "name": "Permanganate advanced oxidation of methyl methacrylate effluent",
    "reactants": [
      "c5h8o2_mma",
      "kmno4",
      "h2so4"
    ],
    "products": [
      "co2",
      "mnso4",
      "k2so4",
      "water"
    ],
    "enthalpy": -2850,
    "desc": "Total oxidative destruction of methacrylic monomer.",
    "type": "redox_other",
    "effects": [],
    "net": "5 C5H8O2 + 24 KMnO4 + 36 H2SO4 → 25 CO2 + 24 MnSO4 + 12 K2SO4 + 56 H2O"
  },
  {
    "id": "petro-dmt-combustion",
    "name": "Thermal combustion of dimethyl terephthalate",
    "reactants": [
      "c10h10o4_dmt",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -4680,
    "desc": "Complete combustion of diester monomer.",
    "type": "combustion",
    "effects": [],
    "net": "2 C10H10O4 + 21 O2 → 20 CO2 + 10 H2O"
  },
  {
    "id": "petro-dmt-transesterification",
    "name": "Transesterification of DMT with ethylene glycol to PET unit and methanol",
    "reactants": [
      "c10h10o4_dmt",
      "c2h6o2"
    ],
    "products": [
      "c10h8o4_pet_unit",
      "ch3oh"
    ],
    "enthalpy": -18,
    "desc": "Catalytic transesterification stripping volatile methanol.",
    "type": "synthesis",
    "effects": [],
    "net": "C10H10O4 + C2H6O2 → C10H8O4 + 2 CH3OH"
  },
  {
    "id": "petro-pet-unit-combustion",
    "name": "Thermal combustion of PET polyester repeat unit",
    "reactants": [
      "c10h8o4_pet_unit",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -4450,
    "desc": "Incineration of polyester polymer unit.",
    "type": "combustion",
    "effects": [],
    "net": "C10H8O4 + 10 O2 → 10 CO2 + 4 H2O"
  },
  {
    "id": "petro-mma-dichromate",
    "name": "Dichromate COD digestion of methyl methacrylate",
    "reactants": [
      "c5h8o2_mma",
      "k2cr2o7",
      "h2so4"
    ],
    "products": [
      "co2",
      "cr2-so4-3",
      "k2so4",
      "water"
    ],
    "enthalpy": -2720,
    "desc": "Chemical oxygen demand oxidation of MMA with Cr(III) emerald green color shift.",
    "type": "redox_other",
    "effects": [],
    "net": "C5H8O2 + 4 K2Cr2O7 + 16 H2SO4 → 5 CO2 + 4 Cr2(SO4)3 + 4 K2SO4 + 20 H2O"
  },
  {
    "id": "petro-pta-nitric-digestion",
    "name": "Nitric acid oxidation of terephthalic acid",
    "reactants": [
      "c8h6o4_pta",
      "hno3"
    ],
    "products": [
      "co2",
      "no2",
      "water"
    ],
    "enthalpy": -2750,
    "desc": "Acid digestion liberating nitrogen dioxide.",
    "type": "synthesis",
    "effects": [],
    "net": "C8H6O4 + 30 HNO3 → 8 CO2 + 30 NO2 + 18 H2O"
  },
  {
    "id": "petro-cumene-ozone-peroxidation",
    "name": "Ozone-promoted oxidation of cumene to cumene hydroperoxide (CHP)",
    "reactants": [
      "c9h12_cumene",
      "o3"
    ],
    "products": [
      "c9h12o2_chp",
      "o2"
    ],
    "enthalpy": -185,
    "desc": "Accelerated ozonolysis auto-oxidation synthesizing CHP intermediate.",
    "type": "redox_other",
    "effects": [],
    "net": "3 C9H12 + 4 O3 → 3 C9H12O2 + 3 O2"
  },
  {
    "id": "petro-chp-cleavage",
    "name": "Hock rearrangement: acid-catalyzed cleavage of cumene hydroperoxide",
    "reactants": [
      "c9h12o2_chp"
    ],
    "products": [
      "c6h6o",
      "ch3coch3"
    ],
    "enthalpy": -252,
    "desc": "Sulfuric acid cleavage producing stoichiometric co-products phenol and acetone.",
    "type": "decomposition",
    "effects": [],
    "net": "C9H12O2 → C6H6O + CH3COCH3"
  },
  {
    "id": "petro-cumene-combustion-incomplete",
    "name": "Incomplete combustion of cumene hydrocarbon yielding carbon monoxide",
    "reactants": [
      "c9h12_cumene",
      "o2"
    ],
    "products": [
      "co",
      "water"
    ],
    "enthalpy": -3280,
    "desc": "Oxygen-deficient combustion generating carbon monoxide.",
    "type": "combustion",
    "effects": [],
    "net": "2 C9H12 + 15 O2 → 18 CO + 12 H2O"
  },
  {
    "id": "petro-chp-combustion",
    "name": "Thermal combustion of cumene hydroperoxide",
    "reactants": [
      "c9h12o2_chp",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -4950,
    "desc": "Exothermic combustion.",
    "type": "combustion",
    "effects": [],
    "net": "C9H12O2 + 11 O2 → 9 CO2 + 6 H2O"
  },
  {
    "id": "petro-bpa-condensation",
    "name": "Acid-catalyzed condensation of phenol and acetone synthesizing Bisphenol A",
    "reactants": [
      "c6h6o",
      "ch3coch3"
    ],
    "products": [
      "c15h16o2_bpa",
      "water"
    ],
    "enthalpy": -78,
    "desc": "Electrophilic aromatic substitution producing difunctional monomer BPA.",
    "type": "synthesis",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "White crystalline flakes of Bisphenol A precipitate"
      }
    ],
    "net": "2 C6H6O + CH3COCH3 → C15H16O2 + H2O"
  },
  {
    "id": "petro-bpa-combustion",
    "name": "Complete combustion of Bisphenol A",
    "reactants": [
      "c15h16o2_bpa",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -7750,
    "desc": "Combustion.",
    "type": "combustion",
    "effects": [],
    "net": "C15H16O2 + 18 O2 → 15 CO2 + 8 H2O"
  },
  {
    "id": "petro-phenol-bromination",
    "name": "Exhaustive electrophilic bromination of phenol to 2,4,6-tribromophenol",
    "reactants": [
      "c6h6o",
      "br2"
    ],
    "products": [
      "c6h3br3o",
      "hbr"
    ],
    "enthalpy": -210,
    "desc": "Rapid bromination yielding insoluble white antiseptic precipitate.",
    "type": "substitution",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "White curdy precipitate of tribromophenol forms instantly"
      }
    ],
    "net": "C6H6O + 3 Br2 → C6H3Br3O + 3 HBr"
  },
  {
    "id": "petro-cumene-nitric-digestion",
    "name": "Nitric acid oxidation of cumene",
    "reactants": [
      "c9h12_cumene",
      "hno3"
    ],
    "products": [
      "co2",
      "no2",
      "water"
    ],
    "enthalpy": -4100,
    "desc": "Acid digestion liberating nitrogen dioxide.",
    "type": "synthesis",
    "effects": [],
    "net": "C9H12 + 48 HNO3 → 9 CO2 + 48 NO2 + 30 H2O"
  },
  {
    "id": "petro-bpa-nitric-digestion",
    "name": "Nitric acid oxidation of Bisphenol A",
    "reactants": [
      "c15h16o2_bpa",
      "hno3"
    ],
    "products": [
      "co2",
      "no2",
      "water"
    ],
    "enthalpy": -6200,
    "desc": "Acid digestion liberating nitrogen dioxide.",
    "type": "synthesis",
    "effects": [],
    "net": "C15H16O2 + 72 HNO3 → 15 CO2 + 72 NO2 + 44 H2O"
  },
  {
    "id": "petro-phenol-dichromate-oxidation",
    "name": "Oxidation of phenol by acidified potassium dichromate to 1,4-benzoquinone",
    "reactants": [
      "c6h6o",
      "k2cr2o7",
      "h2so4"
    ],
    "products": [
      "c6h4o2_benzoquinone",
      "cr2-so4-3",
      "k2so4",
      "water"
    ],
    "enthalpy": -480,
    "desc": "Chromic acid oxidation of phenol yielding yellow crystalline benzoquinone.",
    "type": "redox_other",
    "effects": [
      {
        "type": "color_change",
        "colorFrom": "#E67E22",
        "colorTo": "#145A32",
        "description": "Orange dichromate shifts to deep chromium(III) green"
      }
    ],
    "net": "3 C6H6O + 2 K2Cr2O7 + 8 H2SO4 → 3 C6H4O2 + 2 Cr2(SO4)3 + 2 K2SO4 + 11 H2O"
  },
  {
    "id": "petro-acrylic-acid-ozone-oxidation",
    "name": "Ozone catalytic oxidation of propylene to acrylic acid",
    "reactants": [
      "c3h6",
      "o3"
    ],
    "products": [
      "c3h4o2_acrylic_acid",
      "water"
    ],
    "enthalpy": -640,
    "desc": "Vapor-phase ozonolysis oxidation synthesizing acrylic acid monomer.",
    "type": "redox_other",
    "effects": [],
    "net": "C3H6 + O3 → C3H4O2 + H2O"
  },
  {
    "id": "petro-acrylic-acid-combustion",
    "name": "Complete combustion of acrylic acid monomer",
    "reactants": [
      "c3h4o2_acrylic_acid",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -1370,
    "desc": "Combustion of vinyl carboxylic acid.",
    "type": "combustion",
    "effects": [],
    "net": "C3H4O2 + 3 O2 → 3 CO2 + 2 H2O"
  },
  {
    "id": "petro-methyl-acrylate-synthesis",
    "name": "Fischer esterification of acrylic acid with methanol to methyl acrylate",
    "reactants": [
      "c3h4o2_acrylic_acid",
      "ch3oh"
    ],
    "products": [
      "c4h6o2_methyl_acrylate",
      "water"
    ],
    "enthalpy": -18,
    "desc": "Sulfuric acid catalyzed esterification producing acrylate monomer.",
    "type": "synthesis",
    "effects": [],
    "net": "C3H4O2 + CH3OH → C4H6O2 + H2O"
  },
  {
    "id": "petro-ethyl-acrylate-isomer-synthesis",
    "name": "Esterification of acrylic acid with ethanol to ethyl acrylate (MMA isomer)",
    "reactants": [
      "c3h4o2_acrylic_acid",
      "c2h5oh"
    ],
    "products": [
      "c5h8o2_mma",
      "water"
    ],
    "enthalpy": -22,
    "desc": "Condensation producing acrylate ester monomer.",
    "type": "synthesis",
    "effects": [],
    "net": "C3H4O2 + C2H5OH → C5H8O2 + H2O"
  },
  {
    "id": "petro-methyl-acrylate-combustion",
    "name": "Thermal combustion of methyl acrylate monomer",
    "reactants": [
      "c4h6o2_methyl_acrylate",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -2050,
    "desc": "Combustion of volatile acrylate ester.",
    "type": "combustion",
    "effects": [],
    "net": "2 C4H6O2 + 9 O2 → 8 CO2 + 6 H2O"
  },
  {
    "id": "petro-mma-combustion",
    "name": "Complete combustion of methyl methacrylate (MMA)",
    "reactants": [
      "c5h8o2_mma",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -2680,
    "desc": "Combustion of acrylic Plexiglas monomer.",
    "type": "combustion",
    "effects": [],
    "net": "C5H8O2 + 6 O2 → 5 CO2 + 4 H2O"
  },
  {
    "id": "petro-epichlorohydrin-combustion",
    "name": "Complete combustion of epichlorohydrin",
    "reactants": [
      "c3h5clo_epichlorohydrin",
      "o2"
    ],
    "products": [
      "co2",
      "hcl",
      "water"
    ],
    "enthalpy": -1650,
    "desc": "Combustion generating acidic hydrogen chloride effluent.",
    "type": "combustion",
    "effects": [],
    "net": "2 C3H5ClO + 7 O2 → 6 CO2 + 2 HCl + 4 H2O"
  },
  {
    "id": "petro-epichlorohydrin-hydrolysis",
    "name": "Aqueous base hydrolysis of epichlorohydrin to glycerol",
    "reactants": [
      "c3h5clo_epichlorohydrin",
      "naoh",
      "water"
    ],
    "products": [
      "c3h8o3",
      "nacl"
    ],
    "enthalpy": -135,
    "desc": "Ring opening and nucleophilic chloride displacement.",
    "type": "substitution",
    "effects": [],
    "net": "C3H5ClO + NaOH + H2O → C3H8O3 + NaCl"
  },
  {
    "id": "petro-acrylic-acid-nitric-digestion",
    "name": "Nitric acid oxidation of acrylic acid",
    "reactants": [
      "c3h4o2_acrylic_acid",
      "hno3"
    ],
    "products": [
      "co2",
      "no2",
      "water"
    ],
    "enthalpy": -1150,
    "desc": "Acid digestion liberating nitrogen dioxide.",
    "type": "synthesis",
    "effects": [],
    "net": "C3H4O2 + 12 HNO3 → 3 CO2 + 12 NO2 + 8 H2O"
  },
  {
    "id": "petro-mma-nitric-digestion",
    "name": "Nitric acid oxidation of methyl methacrylate",
    "reactants": [
      "c5h8o2_mma",
      "hno3"
    ],
    "products": [
      "co2",
      "no2",
      "water"
    ],
    "enthalpy": -2150,
    "desc": "Acid digestion liberating nitrogen dioxide.",
    "type": "synthesis",
    "effects": [],
    "net": "C5H8O2 + 24 HNO3 → 5 CO2 + 24 NO2 + 16 H2O"
  },
  {
    "id": "petro-maleic-anhydride-butane-ozone",
    "name": "Selective ozone oxidation of n-butane to maleic anhydride",
    "reactants": [
      "c4h10",
      "o3"
    ],
    "products": [
      "c4h2o3_maleic_anhydride",
      "water"
    ],
    "enthalpy": -1480,
    "desc": "Low-temperature catalytic ozonolysis yielding maleic anhydride crystals.",
    "type": "redox_other",
    "effects": [],
    "net": "3 C4H10 + 7 O3 → 3 C4H2O3 + 12 H2O"
  },
  {
    "id": "petro-maleic-anhydride-benzene-ozone",
    "name": "Catalytic ozonolysis of benzene to maleic anhydride",
    "reactants": [
      "c6h6",
      "o3"
    ],
    "products": [
      "c4h2o3_maleic_anhydride",
      "co2",
      "water"
    ],
    "enthalpy": -2150,
    "desc": "Vapor-phase ring-opening oxidative cleavage yielding maleic anhydride.",
    "type": "redox_other",
    "effects": [],
    "net": "C6H6 + 3 O3 → C4H2O3 + 2 CO2 + 2 H2O"
  },
  {
    "id": "petro-maleic-anhydride-hydration",
    "name": "Hydration of maleic anhydride yielding maleic acid",
    "reactants": [
      "c4h2o3_maleic_anhydride",
      "water"
    ],
    "products": [
      "c4h4o4_maleic"
    ],
    "enthalpy": -35,
    "desc": "Exothermic ring opening of cyclic anhydride.",
    "type": "synthesis",
    "effects": [],
    "net": "C4H2O3 + H2O → C4H4O4"
  },
  {
    "id": "petro-maleic-anhydride-combustion",
    "name": "Complete combustion of maleic anhydride",
    "reactants": [
      "c4h2o3_maleic_anhydride",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -1390,
    "desc": "Combustion.",
    "type": "combustion",
    "effects": [],
    "net": "C4H2O3 + 3 O2 → 4 CO2 + H2O"
  },
  {
    "id": "petro-maleic-acid-combustion",
    "name": "Thermal combustion of maleic acid",
    "reactants": [
      "c4h4o4_maleic",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -1360,
    "desc": "Combustion of cis-butenedioic acid.",
    "type": "combustion",
    "effects": [],
    "net": "C4H4O4 + 3 O2 → 4 CO2 + 2 H2O"
  },
  {
    "id": "petro-phthalic-anhydride-naphthalene-ozone",
    "name": "Ozonolysis cleavage of naphthalene to phthalic anhydride",
    "reactants": [
      "c10h8",
      "o3"
    ],
    "products": [
      "c8h4o3_phthalic_anhydride",
      "co2",
      "water"
    ],
    "enthalpy": -2350,
    "desc": "Vapor ozonolysis converting bicyclic aromatic into phthalic anhydride.",
    "type": "redox_other",
    "effects": [],
    "net": "C10H8 + 3 O3 → C8H4O3 + 2 CO2 + 2 H2O"
  },
  {
    "id": "petro-phthalic-anhydride-combustion",
    "name": "Complete combustion of phthalic anhydride",
    "reactants": [
      "c8h4o3_phthalic_anhydride",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -3260,
    "desc": "Combustion.",
    "type": "combustion",
    "effects": [],
    "net": "2 C8H4O3 + 15 O2 → 16 CO2 + 4 H2O"
  },
  {
    "id": "petro-phthalic-anhydride-methanol-esterification",
    "name": "Esterification of phthalic anhydride with methanol to dimethyl phthalate",
    "reactants": [
      "c8h4o3_phthalic_anhydride",
      "ch3oh"
    ],
    "products": [
      "c10h10o4_dmt",
      "water"
    ],
    "enthalpy": -45,
    "desc": "Acid-catalyzed diester plasticizer synthesis.",
    "type": "synthesis",
    "effects": [],
    "net": "C8H4O3 + 2 CH3OH → C10H10O4 + H2O"
  },
  {
    "id": "petro-maleic-anhydride-nitric-digestion",
    "name": "Nitric acid oxidation of maleic anhydride",
    "reactants": [
      "c4h2o3_maleic_anhydride",
      "hno3"
    ],
    "products": [
      "co2",
      "no2",
      "water"
    ],
    "enthalpy": -1220,
    "desc": "Acid digestion liberating nitrogen dioxide.",
    "type": "synthesis",
    "effects": [],
    "net": "C4H2O3 + 12 HNO3 → 4 CO2 + 12 NO2 + 7 H2O"
  },
  {
    "id": "petro-phthalic-anhydride-nitric-digestion",
    "name": "Nitric acid oxidation of phthalic anhydride",
    "reactants": [
      "c8h4o3_phthalic_anhydride",
      "hno3"
    ],
    "products": [
      "co2",
      "no2",
      "water"
    ],
    "enthalpy": -2800,
    "desc": "Acid digestion liberating nitrogen dioxide.",
    "type": "synthesis",
    "effects": [],
    "net": "C8H4O3 + 30 HNO3 → 8 CO2 + 30 NO2 + 17 H2O"
  },
  {
    "id": "petro-vcm-dehydrochlorination-koh",
    "name": "Dehydrochlorination of 1,2-dichloroethane by potassium hydroxide to VCM",
    "reactants": [
      "c2h4cl2",
      "koh"
    ],
    "products": [
      "c2h3cl_vcm",
      "kcl",
      "water"
    ],
    "enthalpy": -85,
    "desc": "Alkaline elimination synthesizing vinyl chloride monomer.",
    "type": "decomposition",
    "effects": [],
    "net": "C2H4Cl2 + KOH → C2H3Cl + KCl + H2O"
  },
  {
    "id": "petro-vcm-ozone-oxidation",
    "name": "Ozone oxidative decomposition of vinyl chloride monomer",
    "reactants": [
      "c2h3cl_vcm",
      "o3"
    ],
    "products": [
      "co2",
      "hcl",
      "water"
    ],
    "enthalpy": -1450,
    "desc": "Vigorous wet ozonolysis scrubbing chlorinated volatile organic compound.",
    "type": "redox_other",
    "effects": [],
    "net": "3 C2H3Cl + 5 O3 → 6 CO2 + 3 HCl + 3 H2O"
  },
  {
    "id": "petro-edc-ozone-oxidation",
    "name": "Ozone catalytic oxidation of 1,2-dichloroethane effluent",
    "reactants": [
      "c2h4cl2",
      "o3"
    ],
    "products": [
      "co2",
      "hcl",
      "water"
    ],
    "enthalpy": -1520,
    "desc": "Advanced oxidation process destroying chlorinated solvents.",
    "type": "redox_other",
    "effects": [],
    "net": "3 C2H4Cl2 + 5 O3 → 6 CO2 + 6 HCl + 3 H2O"
  },
  {
    "id": "petro-vcm-combustion",
    "name": "Thermal combustion of vinyl chloride monomer",
    "reactants": [
      "c2h3cl_vcm",
      "o2"
    ],
    "products": [
      "co2",
      "hcl",
      "water"
    ],
    "enthalpy": -1180,
    "desc": "Incineration generating corrosive hydrogen chloride.",
    "type": "combustion",
    "effects": [],
    "net": "2 C2H3Cl + 5 O2 → 4 CO2 + 2 HCl + 2 H2O"
  },
  {
    "id": "petro-edc-combustion",
    "name": "Complete combustion of 1,2-dichloroethane",
    "reactants": [
      "c2h4cl2",
      "o2"
    ],
    "products": [
      "co2",
      "hcl",
      "water"
    ],
    "enthalpy": -1250,
    "desc": "Combustion.",
    "type": "combustion",
    "effects": [],
    "net": "2 C2H4Cl2 + 5 O2 → 4 CO2 + 4 HCl + 2 H2O"
  },
  {
    "id": "petro-tfe-combustion-fluorine",
    "name": "Thermal combustion of tetrafluoroethylene liberating fluorine gas",
    "reactants": [
      "c2f4_tfe",
      "o2"
    ],
    "products": [
      "co2",
      "f2"
    ],
    "enthalpy": -420,
    "desc": "High-temperature oxidative decomposition.",
    "type": "combustion",
    "effects": [],
    "net": "C2F4 + 2 O2 → 2 CO2 + 2 F2"
  },
  {
    "id": "petro-tfe-hydrogen-reductive-defluorination",
    "name": "Catalytic hydro-defluorination of tetrafluoroethylene to ethylene",
    "reactants": [
      "c2f4_tfe",
      "h2"
    ],
    "products": [
      "c2h4",
      "hf"
    ],
    "enthalpy": -310,
    "desc": "Precious metal catalyzed reductive stripping of fluorine.",
    "type": "synthesis",
    "effects": [],
    "net": "C2F4 + 4 H2 → C2H4 + 4 HF"
  },
  {
    "id": "petro-vcm-hydrogenation",
    "name": "Catalytic hydrogenation of vinyl chloride to chloroethane",
    "reactants": [
      "c2h3cl_vcm",
      "h2"
    ],
    "products": [
      "c2h5cl"
    ],
    "enthalpy": -130,
    "desc": "Selective olefin reduction.",
    "type": "synthesis",
    "effects": [],
    "net": "C2H3Cl + H2 → C2H5Cl"
  },
  {
    "id": "petro-vcm-nitric-digestion",
    "name": "Nitric acid oxidation of vinyl chloride",
    "reactants": [
      "c2h3cl_vcm",
      "hno3"
    ],
    "products": [
      "co2",
      "no2",
      "hcl",
      "water"
    ],
    "enthalpy": -1120,
    "desc": "Acid digestion liberating nitrogen dioxide.",
    "type": "synthesis",
    "effects": [],
    "net": "C2H3Cl + 10 HNO3 → 2 CO2 + 10 NO2 + HCl + 6 H2O"
  },
  {
    "id": "petro-edc-nitric-digestion",
    "name": "Nitric acid oxidation of 1,2-dichloroethane",
    "reactants": [
      "c2h4cl2",
      "hno3"
    ],
    "products": [
      "co2",
      "no2",
      "hcl",
      "water"
    ],
    "enthalpy": -1180,
    "desc": "Acid digestion liberating nitrogen dioxide.",
    "type": "synthesis",
    "effects": [],
    "net": "C2H4Cl2 + 10 HNO3 → 2 CO2 + 10 NO2 + 2 HCl + 6 H2O"
  },
  {
    "id": "petro-styrene-hydration-phenylethanol",
    "name": "Acid-catalyzed Markovnikov hydration of styrene to 1-phenylethanol",
    "reactants": [
      "c8h8_styrene",
      "water"
    ],
    "products": [
      "c8h10o"
    ],
    "enthalpy": -45,
    "desc": "Hydration yielding secondary alcohol perfume precursor.",
    "type": "synthesis",
    "effects": [],
    "net": "C8H8 + H2O → C8H10O"
  },
  {
    "id": "petro-styrene-combustion",
    "name": "Complete combustion of styrene monomer",
    "reactants": [
      "c8h8_styrene",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -4390,
    "desc": "Combustion.",
    "type": "combustion",
    "effects": [],
    "net": "C8H8 + 10 O2 → 8 CO2 + 4 H2O"
  },
  {
    "id": "petro-styrene-bromination",
    "name": "Electrophilic bromine addition across styrene vinyl bond",
    "reactants": [
      "c8h8_styrene",
      "br2"
    ],
    "products": [
      "c8h8br2"
    ],
    "enthalpy": -122,
    "desc": "Rapid decolorization of red bromine solution forming 1,2-dibromoethylbenzene.",
    "type": "addition",
    "effects": [
      {
        "type": "color_change",
        "colorFrom": "#B03A2E",
        "colorTo": "#FFFFFF",
        "description": "Red-brown bromine discharge to colorless solution"
      }
    ],
    "net": "C8H8 + Br2 → C8H8Br2"
  },
  {
    "id": "petro-styrene-chlorination",
    "name": "Chlorine addition across styrene olefinic bond",
    "reactants": [
      "c8h8_styrene",
      "cl2"
    ],
    "products": [
      "c8h8cl2"
    ],
    "enthalpy": -185,
    "desc": "Halogen addition forming styrene dichloride.",
    "type": "addition",
    "effects": [],
    "net": "C8H8 + Cl2 → C8H8Cl2"
  },
  {
    "id": "petro-styrene-hydrogenation-ethylbenzene",
    "name": "Selective catalytic hydrogenation of styrene to ethylbenzene",
    "reactants": [
      "c8h8_styrene",
      "h2"
    ],
    "products": [
      "c8h10"
    ],
    "enthalpy": -118,
    "desc": "Selective reduction of vinyl side chain over Pd/C catalyst.",
    "type": "synthesis",
    "effects": [],
    "net": "C8H8 + H2 → C8H10"
  },
  {
    "id": "petro-styrene-nitric-digestion",
    "name": "Nitric acid oxidation of styrene monomer",
    "reactants": [
      "c8h8_styrene",
      "hno3"
    ],
    "products": [
      "co2",
      "no2",
      "water"
    ],
    "enthalpy": -3550,
    "desc": "Acid digestion liberating nitrogen dioxide.",
    "type": "synthesis",
    "effects": [],
    "net": "C8H8 + 40 HNO3 → 8 CO2 + 40 NO2 + 24 H2O"
  },
  {
    "id": "petro-styrene-permanganate-mineralization",
    "name": "Exhaustive permanganate oxidation of styrene to carbon dioxide and water",
    "reactants": [
      "c8h8_styrene",
      "kmno4",
      "h2so4"
    ],
    "products": [
      "co2",
      "mnso4",
      "k2so4",
      "water"
    ],
    "enthalpy": -3200,
    "desc": "Permanganate redox cleavage.",
    "type": "redox_other",
    "effects": [],
    "net": "C8H8 + 8 KMnO4 + 12 H2SO4 → 8 CO2 + 8 MnSO4 + 4 K2SO4 + 16 H2O"
  },
  {
    "id": "petro-styrene-ozone-cleavage",
    "name": "Ozonolysis cleavage of styrene yielding benzaldehyde and formic acid",
    "reactants": [
      "c8h8_styrene",
      "o3"
    ],
    "products": [
      "c7h6o",
      "hcooh"
    ],
    "enthalpy": -420,
    "desc": "Selective reductive ozonolysis cleaving the styrene vinyl bond.",
    "type": "redox_other",
    "effects": [],
    "net": "C8H8 + O3 → C7H6O + HCOOH"
  },
  {
    "id": "petro-ethylbenzene-ozone-oxidation",
    "name": "Ozone catalytic oxidation of ethylbenzene",
    "reactants": [
      "c8h10",
      "o3"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -3850,
    "desc": "Total oxidative destruction of alkylbenzene.",
    "type": "redox_other",
    "effects": [],
    "net": "C8H10 + 7 O3 → 8 CO2 + 5 H2O"
  },
  {
    "id": "petro-styrene-n2o-combustion",
    "name": "Combustion of styrene monomer with nitrous oxide oxidant",
    "reactants": [
      "c8h8_styrene",
      "n2o"
    ],
    "products": [
      "co2",
      "n2",
      "water"
    ],
    "enthalpy": -4650,
    "desc": "Energetic oxidation with nitrous oxide.",
    "type": "combustion",
    "effects": [],
    "net": "C8H8 + 20 N2O → 8 CO2 + 20 N2 + 4 H2O"
  },
  {
    "id": "petro-butadiene-partial-hydrogenation",
    "name": "Selective catalytic hydrogenation of 1,3-butadiene to 1-butene",
    "reactants": [
      "c4h6_butadiene",
      "h2"
    ],
    "products": [
      "c4h8"
    ],
    "enthalpy": -110,
    "desc": "Selective hydrogenation in steam cracker C4 cut purification.",
    "type": "synthesis",
    "effects": [],
    "net": "C4H6 + H2 → C4H8"
  },
  {
    "id": "petro-butadiene-combustion",
    "name": "Complete combustion of 1,3-butadiene monomer",
    "reactants": [
      "c4h6_butadiene",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -2540,
    "desc": "Combustion of conjugated diene.",
    "type": "combustion",
    "effects": [],
    "net": "2 C4H6 + 11 O2 → 8 CO2 + 6 H2O"
  },
  {
    "id": "petro-butadiene-ozone-oxidation",
    "name": "Exhaustive ozone oxidation of 1,3-butadiene to carbon dioxide and water",
    "reactants": [
      "c4h6_butadiene",
      "o3"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -3100,
    "desc": "Total oxidative destruction of diene off-gases.",
    "type": "redox_other",
    "effects": [],
    "net": "3 C4H6 + 11 O3 → 12 CO2 + 9 H2O"
  },
  {
    "id": "petro-butadiene-permanganate-oxidation",
    "name": "Acidified potassium permanganate mineralization of 1,3-butadiene",
    "reactants": [
      "c4h6_butadiene",
      "kmno4",
      "h2so4"
    ],
    "products": [
      "co2",
      "mnso4",
      "k2so4",
      "water"
    ],
    "enthalpy": -2850,
    "desc": "Exhaustive permanganate oxidation decolorizing purple MnO4-.",
    "type": "redox_other",
    "effects": [],
    "net": "5 C4H6 + 22 KMnO4 + 33 H2SO4 → 20 CO2 + 22 MnSO4 + 11 K2SO4 + 48 H2O"
  },
  {
    "id": "petro-butadiene-dichromate-oxidation",
    "name": "Acidified potassium dichromate oxidation of 1,3-butadiene",
    "reactants": [
      "c4h6_butadiene",
      "k2cr2o7",
      "h2so4"
    ],
    "products": [
      "co2",
      "cr2-so4-3",
      "k2so4",
      "water"
    ],
    "enthalpy": -2650,
    "desc": "Dichromate redox mineralization.",
    "type": "redox_other",
    "effects": [],
    "net": "3 C4H6 + 11 K2Cr2O7 + 44 H2SO4 → 12 CO2 + 11 Cr2(SO4)3 + 11 K2SO4 + 53 H2O"
  },
  {
    "id": "petro-butadiene-maleic-anhydride-diels-alder",
    "name": "Diels-Alder cycloaddition of 1,3-butadiene with maleic anhydride",
    "reactants": [
      "c4h6_butadiene",
      "c4h2o3_maleic_anhydride"
    ],
    "products": [
      "c8h8o3_thpa"
    ],
    "enthalpy": -170,
    "desc": "Classic Diels-Alder reaction forming cis-1,2,3,6-tetrahydrophthalic anhydride.",
    "type": "synthesis",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "White crystalline adduct crystallizes upon cooling"
      }
    ],
    "net": "C4H6 + C4H2O3 → C8H8O3"
  },
  {
    "id": "petro-butadiene-nitric-digestion",
    "name": "Nitric acid oxidation of 1,3-butadiene",
    "reactants": [
      "c4h6_butadiene",
      "hno3"
    ],
    "products": [
      "co2",
      "no2",
      "water"
    ],
    "enthalpy": -2100,
    "desc": "Acid digestion liberating nitrogen dioxide.",
    "type": "synthesis",
    "effects": [],
    "net": "C4H6 + 22 HNO3 → 4 CO2 + 22 NO2 + 14 H2O"
  },
  {
    "id": "petro-butadiene-chlorine-addition-chlorobutene",
    "name": "Chlorine addition across 1,3-butadiene yielding 1,4-dichlorobut-2-ene",
    "reactants": [
      "c4h6_butadiene",
      "cl2"
    ],
    "products": [
      "c4h6cl2"
    ],
    "enthalpy": -175,
    "desc": "Electrophilic 1,4-addition of chlorine.",
    "type": "addition",
    "effects": [],
    "net": "C4H6 + Cl2 → C4H6Cl2"
  },
  {
    "id": "petro-butadiene-sulfur-vulcanization",
    "name": "Sulfur-vulcanization crosslinking simulation of butadiene units",
    "reactants": [
      "c4h6_butadiene",
      "s"
    ],
    "products": [
      "c4h4s",
      "h2s"
    ],
    "enthalpy": -95,
    "desc": "Sulfur crosslinking and cyclization with hydrogen sulfide release.",
    "type": "redox_other",
    "effects": [],
    "net": "C4H6 + 2 S → C4H4S + H2S"
  },
  {
    "id": "petro-butadiene-peroxide-mineralization",
    "name": "Fenton peroxide oxidation of 1,3-butadiene wastewater streams",
    "reactants": [
      "c4h6_butadiene",
      "h2o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -2850,
    "desc": "Wet chemical oxidation degrading volatile diene contaminants.",
    "type": "redox_other",
    "effects": [],
    "net": "C4H6 + 11 H2O2 → 4 CO2 + 14 H2O"
  },
  {
    "id": "petro-acrylonitrile-acid-hydrolysis",
    "name": "Hydrochloric acid hydrolysis of acrylonitrile to acrylic acid and ammonium chloride",
    "reactants": [
      "c3h3n_acrylonitrile",
      "hcl",
      "water"
    ],
    "products": [
      "c3h4o2_acrylic_acid",
      "ammonium-chloride"
    ],
    "enthalpy": -85,
    "desc": "Acid-catalyzed nitrile hydrolysis isolating acrylic acid.",
    "type": "synthesis",
    "effects": [],
    "net": "C3H3N + HCl + 2 H2O → C3H4O2 + NH4Cl"
  },
  {
    "id": "petro-acrylonitrile-combustion",
    "name": "Thermal combustion of acrylonitrile monomer",
    "reactants": [
      "c3h3n_acrylonitrile",
      "o2"
    ],
    "products": [
      "co2",
      "n2",
      "water"
    ],
    "enthalpy": -1760,
    "desc": "Combustion of vinyl cyanide.",
    "type": "combustion",
    "effects": [],
    "net": "4 C3H3N + 15 O2 → 12 CO2 + 2 N2 + 6 H2O"
  },
  {
    "id": "petro-acrylonitrile-n2o-combustion",
    "name": "High-temperature combustion of acrylonitrile with nitrous oxide oxidant",
    "reactants": [
      "c3h3n_acrylonitrile",
      "n2o"
    ],
    "products": [
      "co2",
      "n2",
      "water"
    ],
    "enthalpy": -1950,
    "desc": "Energetic combustion with nitrous oxide.",
    "type": "combustion",
    "effects": [],
    "net": "2 C3H3N + 15 N2O → 6 CO2 + 16 N2 + 3 H2O"
  },
  {
    "id": "petro-acrylonitrile-hydrogen-peroxide",
    "name": "Alkaline hydrogen peroxide digestion of toxic acrylonitrile waste",
    "reactants": [
      "c3h3n_acrylonitrile",
      "h2o2"
    ],
    "products": [
      "co2",
      "n2",
      "water"
    ],
    "enthalpy": -1950,
    "desc": "Advanced chemical oxidation decontaminating nitrile wastewaters.",
    "type": "redox_other",
    "effects": [],
    "net": "2 C3H3N + 15 H2O2 → 6 CO2 + N2 + 18 H2O"
  },
  {
    "id": "petro-acrylonitrile-ozone-oxidation",
    "name": "Ozone destruction of residual acrylonitrile monomer in wastewater",
    "reactants": [
      "c3h3n_acrylonitrile",
      "o3"
    ],
    "products": [
      "co2",
      "n2",
      "water"
    ],
    "enthalpy": -2100,
    "desc": "Total oxidative destruction of hazardous acrylonitrile.",
    "type": "redox_other",
    "effects": [],
    "net": "2 C3H3N + 5 O3 → 6 CO2 + N2 + 3 H2O"
  },
  {
    "id": "petro-acrylonitrile-hydrogenation-propylamine",
    "name": "Exhaustive catalytic hydrogenation of acrylonitrile to propylamine",
    "reactants": [
      "c3h3n_acrylonitrile",
      "h2"
    ],
    "products": [
      "c3h9n"
    ],
    "enthalpy": -245,
    "desc": "Raney nickel reduction of nitrile and olefinic bonds.",
    "type": "synthesis",
    "effects": [],
    "net": "C3H3N + 3 H2 → C3H9N"
  },
  {
    "id": "petro-acrylonitrile-nitric-digestion",
    "name": "Nitric acid oxidation of acrylonitrile",
    "reactants": [
      "c3h3n_acrylonitrile",
      "hno3"
    ],
    "products": [
      "co2",
      "no2",
      "water"
    ],
    "enthalpy": -1450,
    "desc": "Acid digestion liberating nitrogen dioxide.",
    "type": "synthesis",
    "effects": [],
    "net": "C3H3N + 19 HNO3 → 3 CO2 + 20 NO2 + 11 H2O"
  },
  {
    "id": "petro-acrylonitrile-sulfuric-hydrolysis",
    "name": "Sulfuric acid digestion of acrylonitrile to acrylic acid and ammonium sulfate",
    "reactants": [
      "c3h3n_acrylonitrile",
      "h2so4",
      "water"
    ],
    "products": [
      "c3h4o2_acrylic_acid",
      "nh4-2-so4"
    ],
    "enthalpy": -95,
    "desc": "Industrial sulfuric acid hydration pathway to acrylic acid.",
    "type": "synthesis",
    "effects": [],
    "net": "2 C3H3N + H2SO4 + 4 H2O → 2 C3H4O2 + (NH4)2SO4"
  },
  {
    "id": "petro-acrylonitrile-permanganate-oxidation",
    "name": "Acidified potassium permanganate destruction of acrylonitrile",
    "reactants": [
      "c3h3n_acrylonitrile",
      "kmno4",
      "h2so4"
    ],
    "products": [
      "co2",
      "mnso4",
      "k2so4",
      "n2",
      "water"
    ],
    "enthalpy": -2250,
    "desc": "Permanganate redox mineralization.",
    "type": "redox_other",
    "effects": [],
    "net": "2 C3H3N + 6 KMnO4 + 9 H2SO4 → 6 CO2 + 6 MnSO4 + 3 K2SO4 + N2 + 12 H2O"
  },
  {
    "id": "petro-acrylonitrile-dichromate-oxidation",
    "name": "Potassium dichromate redox digestion of toxic acrylonitrile",
    "reactants": [
      "c3h3n_acrylonitrile",
      "k2cr2o7",
      "h2so4"
    ],
    "products": [
      "co2",
      "cr2-so4-3",
      "k2so4",
      "n2",
      "water"
    ],
    "enthalpy": -2180,
    "desc": "Dichromate oxidative destruction with green Cr(III) formation.",
    "type": "redox_other",
    "effects": [
      {
        "type": "color_change",
        "colorFrom": "#E67E22",
        "colorTo": "#145A32",
        "description": "Orange dichromate shifts to emerald green Cr(III)"
      }
    ],
    "net": "2 C3H3N + 5 K2Cr2O7 + 20 H2SO4 → 6 CO2 + 5 Cr2(SO4)3 + 5 K2SO4 + N2 + 23 H2O"
  },
  {
    "id": "petro-ethylene-glycol-nitric-oxidation",
    "name": "Nitric acid oxidation of ethylene glycol to carbon dioxide and NO2",
    "reactants": [
      "c2h6o2",
      "hno3"
    ],
    "products": [
      "co2",
      "no2",
      "water"
    ],
    "enthalpy": -1250,
    "desc": "Exhaustive acid digestion of diol monomer.",
    "type": "redox_other",
    "effects": [],
    "net": "C2H6O2 + 10 HNO3 → 2 CO2 + 10 NO2 + 8 H2O"
  },
  {
    "id": "petro-ethylene-glycol-permanganate-oxidation",
    "name": "Permanganate redox oxidation of ethylene glycol",
    "reactants": [
      "c2h6o2",
      "kmno4",
      "h2so4"
    ],
    "products": [
      "co2",
      "mnso4",
      "k2so4",
      "water"
    ],
    "enthalpy": -1380,
    "desc": "Quantitative permanganometric titration of diol.",
    "type": "redox_other",
    "effects": [],
    "net": "C2H6O2 + 2 KMnO4 + 3 H2SO4 → 2 CO2 + 2 MnSO4 + K2SO4 + 6 H2O"
  },
  {
    "id": "petro-ethylene-glycol-dichromate-oxidation",
    "name": "Potassium dichromate oxidation of ethylene glycol",
    "reactants": [
      "c2h6o2",
      "k2cr2o7",
      "h2so4"
    ],
    "products": [
      "co2",
      "cr2-so4-3",
      "k2so4",
      "water"
    ],
    "enthalpy": -1220,
    "desc": "Dichromate oxidation turning orange Cr(VI) to green Cr(III).",
    "type": "redox_other",
    "effects": [],
    "net": "3 C2H6O2 + 5 K2Cr2O7 + 20 H2SO4 → 6 CO2 + 5 Cr2(SO4)3 + 5 K2SO4 + 29 H2O"
  },
  {
    "id": "petro-propylene-glycol-nitric-oxidation",
    "name": "Nitric acid oxidation of propylene glycol",
    "reactants": [
      "c3h8o2",
      "hno3"
    ],
    "products": [
      "co2",
      "no2",
      "water"
    ],
    "enthalpy": -1780,
    "desc": "Acid digestion liberating nitrogen dioxide.",
    "type": "synthesis",
    "effects": [],
    "net": "C3H8O2 + 16 HNO3 → 3 CO2 + 16 NO2 + 12 H2O"
  },
  {
    "id": "petro-propylene-glycol-permanganate-oxidation",
    "name": "Permanganate oxidation of propylene glycol",
    "reactants": [
      "c3h8o2",
      "kmno4",
      "h2so4"
    ],
    "products": [
      "co2",
      "mnso4",
      "k2so4",
      "water"
    ],
    "enthalpy": -1850,
    "desc": "Total oxidative destruction of 1,2-propanediol.",
    "type": "redox_other",
    "effects": [],
    "net": "5 C3H8O2 + 16 KMnO4 + 24 H2SO4 → 15 CO2 + 16 MnSO4 + 8 K2SO4 + 44 H2O"
  },
  {
    "id": "petro-propylene-glycol-dichromate-oxidation",
    "name": "Acidic potassium dichromate oxidation of propylene glycol",
    "reactants": [
      "c3h8o2",
      "k2cr2o7",
      "h2so4"
    ],
    "products": [
      "co2",
      "cr2-so4-3",
      "k2so4",
      "water"
    ],
    "enthalpy": -1680,
    "desc": "Exhaustive oxidation with colorimetric shift to emerald green Cr(III).",
    "type": "redox_other",
    "effects": [],
    "net": "3 C3H8O2 + 8 K2Cr2O7 + 32 H2SO4 → 9 CO2 + 8 Cr2(SO4)3 + 8 K2SO4 + 44 H2O"
  },
  {
    "id": "petro-ethylene-glycol-ozone-mineralization",
    "name": "Ozone catalytic mineralization of ethylene glycol wastewater",
    "reactants": [
      "c2h6o2",
      "o3"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -1650,
    "desc": "Ozonation degrading glycol pollutants to water and carbon dioxide.",
    "type": "redox_other",
    "effects": [],
    "net": "3 C2H6O2 + 5 O3 → 6 CO2 + 9 H2O"
  },
  {
    "id": "petro-propylene-glycol-ozone-mineralization",
    "name": "Ozone oxidation of propylene glycol effluent",
    "reactants": [
      "c3h8o2",
      "o3"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -2100,
    "desc": "Advanced oxidation process mineralizing 1,2-propanediol.",
    "type": "redox_other",
    "effects": [],
    "net": "3 C3H8O2 + 8 O3 → 9 CO2 + 12 H2O"
  },
  {
    "id": "petro-ethylene-glycol-hydrogen-peroxide",
    "name": "Fenton advanced oxidation of ethylene glycol by hydrogen peroxide",
    "reactants": [
      "c2h6o2",
      "h2o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -1420,
    "desc": "Fenton oxidation degrading aqueous diol contaminants into water and CO2.",
    "type": "redox_other",
    "effects": [],
    "net": "C2H6O2 + 5 H2O2 → 2 CO2 + 8 H2O"
  },
  {
    "id": "petro-propylene-glycol-hydrogen-peroxide",
    "name": "Peroxide mineralization of propylene glycol",
    "reactants": [
      "c3h8o2",
      "h2o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -1950,
    "desc": "Total wet peroxide oxidation.",
    "type": "redox_other",
    "effects": [],
    "net": "C3H8O2 + 8 H2O2 → 3 CO2 + 12 H2O"
  }
];
