// Domain 34: Environmental Remediation & Wastewater Treatment (100 reactions)
export const DOMAIN_34_REACTIONS = [
  {
    "id": "env-disinfect-hypochlorite-soda-ash",
    "name": "Generation of sodium hypochlorite disinfectant from calcium hypochlorite and soda ash",
    "reactants": [
      "ca-ocl-2",
      "na2co3"
    ],
    "products": [
      "caco3",
      "naocl"
    ],
    "enthalpy": -95,
    "desc": "Chemical metathesis precipitating chalk and yielding clear sodium hypochlorite bleach.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "White calcium carbonate precipitate forms leaving clear bleach solution"
      }
    ],
    "net": "Ca(OCl)2 + Na2CO3 → CaCO3 + 2 NaOCl"
  },
  {
    "id": "env-disinfect-bleaching-powder",
    "name": "Manufacture of bleaching powder disinfectant from chlorine and slaked lime",
    "reactants": [
      "cl2",
      "caoh2"
    ],
    "products": [
      "ca-ocl-2",
      "cacl2",
      "water"
    ],
    "enthalpy": -125,
    "desc": "Reaction producing municipal water disinfectant powder.",
    "type": "redox_other",
    "effects": [],
    "net": "2 Cl2 + 2 Ca(OH)2 → Ca(OCl)2 + CaCl2 + 2 H2O"
  },
  {
    "id": "env-disinfect-monochloramine",
    "name": "Breakpoint chlorination: synthesis of monochloramine from ammonia and hypochlorite",
    "reactants": [
      "ammonia",
      "naocl"
    ],
    "products": [
      "nh2cl",
      "naoh"
    ],
    "enthalpy": -42,
    "desc": "Initial stage of municipal chloramination for secondary disinfectant residual.",
    "type": "substitution",
    "effects": [],
    "net": "NH3 + NaOCl → NH2Cl + NaOH"
  },
  {
    "id": "env-disinfect-calcium-hypo-acid",
    "name": "Acidification of calcium hypochlorite liberating chlorine gas disinfectant",
    "reactants": [
      "ca-ocl-2",
      "hcl"
    ],
    "products": [
      "cacl2",
      "cl2",
      "water"
    ],
    "enthalpy": -85,
    "desc": "Acid-promoted rapid chlorine release.",
    "type": "gas_evolution",
    "effects": [
      {
        "type": "gas_evolution",
        "gasColor": "#D4EFDF",
        "description": "Pungent greenish-yellow chlorine gas evolves vigorously"
      }
    ],
    "net": "Ca(OCl)2 + 4 HCl → CaCl2 + 2 Cl2 + 2 H2O"
  },
  {
    "id": "env-disinfect-clo2-acid-chlorite",
    "name": "Generation of chlorine dioxide from sodium chlorite and hydrochloric acid",
    "reactants": [
      "naclo2",
      "hcl"
    ],
    "products": [
      "clo2",
      "nacl",
      "water"
    ],
    "enthalpy": -82,
    "desc": "Acid-activated generator producing yellow-green ClO2 disinfectant solution.",
    "type": "redox_other",
    "effects": [
      {
        "type": "color_change",
        "colorFrom": "#FFFFFF",
        "colorTo": "#F4D03F",
        "description": "Colorless solution shifts to intensely yellow-green ClO2"
      }
    ],
    "net": "5 NaClO2 + 4 HCl → 4 ClO2 + 5 NaCl + 2 H2O"
  },
  {
    "id": "env-disinfect-clo2-fe2-oxidation",
    "name": "Chlorine dioxide oxidation of soluble iron(II) to ferric chloride",
    "reactants": [
      "clo2",
      "fecl2",
      "hcl"
    ],
    "products": [
      "fecl3",
      "water"
    ],
    "enthalpy": -160,
    "desc": "Removal of dissolved well-water iron via selective chlorine dioxide oxidation.",
    "type": "redox_other",
    "effects": [],
    "net": "ClO2 + 5 FeCl2 + 4 HCl → 5 FeCl3 + 2 H2O"
  },
  {
    "id": "env-disinfect-hypochlorite-hydrogen-peroxide",
    "name": "Reaction of hypochlorite disinfectant with hydrogen peroxide evolving oxygen",
    "reactants": [
      "naocl",
      "h2o2"
    ],
    "products": [
      "nacl",
      "o2",
      "water"
    ],
    "enthalpy": -150,
    "desc": "Quenching residual active chlorine with oxygen effervescence.",
    "type": "gas_evolution",
    "effects": [
      {
        "type": "gas_evolution",
        "gasColor": "#FFFFFF",
        "description": "Vigorous fizzing with pure oxygen gas release"
      }
    ],
    "net": "NaOCl + H2O2 → NaCl + O2 + H2O"
  },
  {
    "id": "env-disinfect-hypochlorite-nitric-acid",
    "name": "Acidification of sodium hypochlorite by nitric acid",
    "reactants": [
      "naocl",
      "hno3"
    ],
    "products": [
      "nano3",
      "cl2",
      "o2",
      "water"
    ],
    "enthalpy": -95,
    "desc": "Acid decomposition releasing chlorine and oxygen gas.",
    "type": "gas_evolution",
    "effects": [],
    "net": "4 NaOCl + 4 HNO3 → 4 NaNO3 + 2 Cl2 + O2 + 2 H2O"
  },
  {
    "id": "env-disinfect-ca-hypo-nitric",
    "name": "Nitric acid acidification of calcium hypochlorite",
    "reactants": [
      "ca-ocl-2",
      "hno3"
    ],
    "products": [
      "ca-no3-2",
      "cl2",
      "o2",
      "water"
    ],
    "enthalpy": -110,
    "desc": "Acid decomposition generating chlorine oxidizer.",
    "type": "gas_evolution",
    "effects": [],
    "net": "2 Ca(OCl)2 + 4 HNO3 → 2 Ca(NO3)2 + 2 Cl2 + O2 + 2 H2O"
  },
  {
    "id": "env-disinfect-hypochlorite-sulfuric",
    "name": "Sulfuric acid acidification of sodium hypochlorite",
    "reactants": [
      "naocl",
      "h2so4"
    ],
    "products": [
      "na2so4",
      "cl2",
      "o2",
      "water"
    ],
    "enthalpy": -105,
    "desc": "Acidification liberating elemental chlorine gas.",
    "type": "gas_evolution",
    "effects": [],
    "net": "4 NaOCl + 2 H2SO4 → 2 Na2SO4 + 2 Cl2 + O2 + 2 H2O"
  },
  {
    "id": "env-cyanide-alkaline-naocl",
    "name": "Alkaline chlorination: oxidation of toxic sodium cyanide to sodium cyanate",
    "reactants": [
      "nacn",
      "naocl"
    ],
    "products": [
      "nanco",
      "nacl"
    ],
    "enthalpy": -230,
    "desc": "Primary detoxification stage converting lethal cyanide into 1000-fold less toxic cyanate.",
    "type": "redox_other",
    "effects": [],
    "net": "NaCN + NaOCl → NaNCO + NaCl"
  },
  {
    "id": "env-cyanide-alkaline-kcn-naocl",
    "name": "Oxidation of potassium cyanide by sodium hypochlorite to potassium cyanate",
    "reactants": [
      "kcn",
      "naocl"
    ],
    "products": [
      "knco",
      "nacl"
    ],
    "enthalpy": -228,
    "desc": "Alkaline chlorination in metal plating wastewater treatment.",
    "type": "redox_other",
    "effects": [],
    "net": "KCN + NaOCl → KNCO + NaCl"
  },
  {
    "id": "env-cyanide-permanganate-oxidation",
    "name": "Permanganate oxidation of sodium cyanide to sodium cyanate",
    "reactants": [
      "nacn",
      "kmno4",
      "water"
    ],
    "products": [
      "nanco",
      "mno2",
      "koh"
    ],
    "enthalpy": -265,
    "desc": "Permanganate oxidation destroying free cyanides with manganese dioxide precipitation.",
    "type": "redox_other",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#111111",
        "description": "Dark brown-black manganese dioxide floc forms"
      }
    ],
    "net": "3 NaCN + 2 KMnO4 + H2O → 3 NaNCO + 2 MnO2 + 2 KOH"
  },
  {
    "id": "env-cyanide-k-permanganate-oxidation",
    "name": "Potassium permanganate oxidation of potassium cyanide",
    "reactants": [
      "kcn",
      "kmno4",
      "water"
    ],
    "products": [
      "knco",
      "mno2",
      "koh"
    ],
    "enthalpy": -262,
    "desc": "Alkaline permanganate destruction of electroplating cyanide bath waste.",
    "type": "redox_other",
    "effects": [],
    "net": "3 KCN + 2 KMnO4 + H2O → 3 KNCO + 2 MnO2 + 2 KOH"
  },
  {
    "id": "env-cyanide-naocl-excess-mineralization",
    "name": "Exhaustive alkaline hypochlorite mineralization of sodium cyanide to nitrogen",
    "reactants": [
      "nacn",
      "naocl",
      "water"
    ],
    "products": [
      "nahco3",
      "n2",
      "nacl"
    ],
    "enthalpy": -620,
    "desc": "Two-stage total mineralization releasing inert nitrogen gas and sodium bicarbonate.",
    "type": "gas_evolution",
    "effects": [
      {
        "type": "gas_evolution",
        "gasColor": "#FFFFFF",
        "description": "Steady nitrogen gas bubbles evolve"
      }
    ],
    "net": "2 NaCN + 5 NaOCl + H2O → 2 NaHCO3 + N2 + 5 NaCl"
  },
  {
    "id": "env-cyanide-kcn-naocl-excess-mineralization",
    "name": "Total hypochlorite oxidation of potassium cyanide to nitrogen and KHCO3",
    "reactants": [
      "kcn",
      "naocl",
      "water"
    ],
    "products": [
      "khco3",
      "n2",
      "nacl"
    ],
    "enthalpy": -615,
    "desc": "Exhaustive alkaline destruction of potassium cyanide.",
    "type": "gas_evolution",
    "effects": [],
    "net": "2 KCN + 5 NaOCl + H2O → 2 KHCO3 + N2 + 5 NaCl"
  },
  {
    "id": "env-cyanide-persulfate-oxidation",
    "name": "Sodium persulfate destruction of sodium cyanide",
    "reactants": [
      "nacn",
      "na2s2o8",
      "naoh"
    ],
    "products": [
      "nanco",
      "na2so4",
      "water"
    ],
    "enthalpy": -340,
    "desc": "Persulfate advanced oxidation decomposing cyanide into cyanate and sulfate.",
    "type": "redox_other",
    "effects": [],
    "net": "NaCN + Na2S2O8 + 2 NaOH → NaNCO + 2 Na2SO4 + H2O"
  },
  {
    "id": "env-cyanide-k-persulfate-oxidation",
    "name": "Potassium persulfate oxidation of potassium cyanide",
    "reactants": [
      "kcn",
      "k2s2o8",
      "koh"
    ],
    "products": [
      "knco",
      "k2so4",
      "water"
    ],
    "enthalpy": -338,
    "desc": "Persulfate radical oxidation of toxic cyanide.",
    "type": "redox_other",
    "effects": [],
    "net": "KCN + K2S2O8 + 2 KOH → KNCO + 2 K2SO4 + H2O"
  },
  {
    "id": "env-cyanate-destruction-persulfate",
    "name": "Exhaustive persulfate oxidation of sodium cyanate to nitrogen and sulfate",
    "reactants": [
      "nanco",
      "na2s2o8",
      "water"
    ],
    "products": [
      "nahco3",
      "na2so4",
      "h2so4",
      "n2"
    ],
    "enthalpy": -420,
    "desc": "Complete mineralization of cyanate intermediate to benign nitrogen gas.",
    "type": "redox_other",
    "effects": [],
    "net": "2 NaNCO + 3 Na2S2O8 + 4 H2O → 2 NaHCO3 + 3 Na2SO4 + 3 H2SO4 + N2"
  },
  {
    "id": "env-cyanate-destruction-k-persulfate",
    "name": "Persulfate oxidation of potassium cyanate to nitrogen and potassium sulfate",
    "reactants": [
      "knco",
      "k2s2o8",
      "water"
    ],
    "products": [
      "khco3",
      "k2so4",
      "h2so4",
      "n2"
    ],
    "enthalpy": -415,
    "desc": "Exhaustive decomposition of cyanate to nitrogen.",
    "type": "redox_other",
    "effects": [],
    "net": "2 KNCO + 3 K2S2O8 + 4 H2O → 2 KHCO3 + 3 K2SO4 + 3 H2SO4 + N2"
  },
  {
    "id": "env-dechlor-metabisulfite-cl2",
    "name": "Industrial dechlorination of chlorine with sodium metabisulfite",
    "reactants": [
      "na2s2o5",
      "cl2",
      "water"
    ],
    "products": [
      "na2so4",
      "hcl",
      "h2so4"
    ],
    "enthalpy": -380,
    "desc": "Rapid chemical reduction protecting reverse osmosis membranes from chlorine oxidation.",
    "type": "redox_other",
    "effects": [],
    "net": "Na2S2O5 + 2 Cl2 + 3 H2O → Na2SO4 + 4 HCl + H2SO4"
  },
  {
    "id": "env-dechlor-k-metabisulfite-cl2",
    "name": "Dechlorination of water with potassium metabisulfite",
    "reactants": [
      "k2s2o5",
      "cl2",
      "water"
    ],
    "products": [
      "k2so4",
      "hcl",
      "h2so4"
    ],
    "enthalpy": -375,
    "desc": "Scavenging toxic chlorine before wastewater discharge.",
    "type": "redox_other",
    "effects": [],
    "net": "K2S2O5 + 2 Cl2 + 3 H2O → K2SO4 + 4 HCl + H2SO4"
  },
  {
    "id": "env-dechlor-metabisulfite-naocl",
    "name": "Sodium metabisulfite quenching of residual sodium hypochlorite",
    "reactants": [
      "na2s2o5",
      "naocl",
      "water"
    ],
    "products": [
      "na2so4",
      "nacl",
      "h2so4"
    ],
    "enthalpy": -410,
    "desc": "Effluent dechlorination ensuring zero toxic disinfectant discharge.",
    "type": "redox_other",
    "effects": [],
    "net": "Na2S2O5 + 2 NaOCl + H2O → Na2SO4 + 2 NaCl + H2SO4"
  },
  {
    "id": "env-dechlor-k-metabisulfite-naocl-reductive",
    "name": "Potassium metabisulfite reduction of hypochlorite bleach",
    "reactants": [
      "k2s2o5",
      "naocl",
      "water"
    ],
    "products": [
      "k2so4",
      "nacl",
      "h2so4"
    ],
    "enthalpy": -405,
    "desc": "Metabisulfite reductive scavenging.",
    "type": "redox_other",
    "effects": [],
    "net": "K2S2O5 + 2 NaOCl + H2O → K2SO4 + 2 NaCl + H2SO4"
  },
  {
    "id": "env-dechlor-sulfite-naocl",
    "name": "Sodium sulfite dechlorination of hypochlorite residual",
    "reactants": [
      "na2so3",
      "naocl"
    ],
    "products": [
      "na2so4",
      "nacl"
    ],
    "enthalpy": -365,
    "desc": "Stoichiometric reduction of active chlorine to harmless chloride.",
    "type": "redox_other",
    "effects": [],
    "net": "Na2SO3 + NaOCl → Na2SO4 + NaCl"
  },
  {
    "id": "env-dechlor-sulfite-clo2",
    "name": "Sodium sulfite reduction of toxic chlorine dioxide",
    "reactants": [
      "na2so3",
      "clo2",
      "water"
    ],
    "products": [
      "na2so4",
      "hcl"
    ],
    "enthalpy": -430,
    "desc": "Chemical quenching of chlorine dioxide residuals in pulp mill wastewater.",
    "type": "redox_other",
    "effects": [],
    "net": "5 Na2SO3 + 2 ClO2 + H2O → 5 Na2SO4 + 2 HCl"
  },
  {
    "id": "env-dechlor-metabisulfite-clo2",
    "name": "Sodium metabisulfite reduction of chlorine dioxide",
    "reactants": [
      "na2s2o5",
      "clo2",
      "water"
    ],
    "products": [
      "na2so4",
      "hcl",
      "h2so4"
    ],
    "enthalpy": -460,
    "desc": "Rapid reduction destroying yellow ClO2 gas.",
    "type": "redox_other",
    "effects": [],
    "net": "5 Na2S2O5 + 4 ClO2 + 7 H2O → 5 Na2SO4 + 4 HCl + 5 H2SO4"
  },
  {
    "id": "env-dechlor-metabisulfite-h2o2-quenching",
    "name": "Sodium metabisulfite quenching of residual industrial hydrogen peroxide",
    "reactants": [
      "na2s2o5",
      "h2o2"
    ],
    "products": [
      "na2so4",
      "h2so4",
      "water"
    ],
    "enthalpy": -395,
    "desc": "Peroxide destruction prior to biological wastewater treatment.",
    "type": "redox_other",
    "effects": [],
    "net": "Na2S2O5 + 2 H2O2 → Na2SO4 + H2SO4 + H2O"
  },
  {
    "id": "env-dechlor-k-metabisulfite-h2o2-quenching",
    "name": "Potassium metabisulfite quenching of hydrogen peroxide",
    "reactants": [
      "k2s2o5",
      "h2o2"
    ],
    "products": [
      "k2so4",
      "h2so4",
      "water"
    ],
    "enthalpy": -390,
    "desc": "Reductive destruction of peroxide residues.",
    "type": "redox_other",
    "effects": [],
    "net": "K2S2O5 + 2 H2O2 → K2SO4 + H2SO4 + H2O"
  },
  {
    "id": "env-dechlor-metabisulfite-ozone",
    "name": "Sodium metabisulfite destruction of aqueous ozone off-gas",
    "reactants": [
      "na2s2o5",
      "o3",
      "water"
    ],
    "products": [
      "na2so4",
      "h2so4"
    ],
    "enthalpy": -510,
    "desc": "Scrubbing toxic ozone gas in water treatment off-gas systems.",
    "type": "redox_other",
    "effects": [],
    "net": "3 Na2S2O5 + 2 O3 + 3 H2O → 3 Na2SO4 + 3 H2SO4"
  },
  {
    "id": "env-coag-k-alum-lime",
    "name": "Potassium alum coagulation with slaked lime precipitating aluminum hydroxide",
    "reactants": [
      "k-al-so4-2",
      "caoh2"
    ],
    "products": [
      "al-oh-3",
      "caso4",
      "k2so4"
    ],
    "enthalpy": -185,
    "desc": "Dual precipitation of gelatinous Al(OH)3 floc and calcium sulfate settling aids.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Heavy gelatinous white floc of aluminum hydroxide precipitates"
      }
    ],
    "net": "2 KAl(SO4)2 + 3 Ca(OH)2 → 2 Al(OH)3 + 3 CaSO4 + K2SO4"
  },
  {
    "id": "env-coag-nh4-alum-lime",
    "name": "Ammonium alum coagulation with calcium hydroxide",
    "reactants": [
      "nh4-al-so4-2",
      "caoh2"
    ],
    "products": [
      "al-oh-3",
      "caso4",
      "nh4-2-so4"
    ],
    "enthalpy": -180,
    "desc": "Coagulant destabilization clarifying colloidal organic wastewater turbidity.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Dense gelatinous white floc of Al(OH)3 settles rapidly"
      }
    ],
    "net": "2 NH4Al(SO4)2 + 3 Ca(OH)2 → 2 Al(OH)3 + 3 CaSO4 + (NH4)2SO4"
  },
  {
    "id": "env-coag-k-alum-bicarbonate",
    "name": "Potassium alum sweep flocculation with sodium bicarbonate",
    "reactants": [
      "k-al-so4-2",
      "nahco3"
    ],
    "products": [
      "al-oh-3",
      "k2so4",
      "na2so4",
      "co2"
    ],
    "enthalpy": -165,
    "desc": "Municipal alkalinity buffering: sweep flocculation with bicarbonate liberating CO2 gas.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "White voluminous hydroxide floc forms with gentle effervescence"
      }
    ],
    "net": "2 KAl(SO4)2 + 6 NaHCO3 → 2 Al(OH)3 + K2SO4 + 3 Na2SO4 + 6 CO2"
  },
  {
    "id": "env-coag-nh4-alum-bicarbonate",
    "name": "Ammonium alum sweep flocculation with sodium bicarbonate",
    "reactants": [
      "nh4-al-so4-2",
      "nahco3"
    ],
    "products": [
      "al-oh-3",
      "nh4-2-so4",
      "na2so4",
      "co2"
    ],
    "enthalpy": -160,
    "desc": "Turbidity removal via sweep flocculation using sodium bicarbonate.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "White hydroxide floc precipitates"
      }
    ],
    "net": "2 NH4Al(SO4)2 + 6 NaHCO3 → 2 Al(OH)3 + (NH4)2SO4 + 3 Na2SO4 + 6 CO2"
  },
  {
    "id": "env-coag-ferric-chloride-lime",
    "name": "Ferric chloride coagulation with hydrated lime in sewage clarification",
    "reactants": [
      "fecl3",
      "caoh2"
    ],
    "products": [
      "feoh3",
      "cacl2"
    ],
    "enthalpy": -165,
    "desc": "Coagulation forming dense reddish-brown ferric hydroxide flocs.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#935116",
        "description": "Voluminous reddish-brown gelatinous Fe(OH)3 flocs precipitate"
      }
    ],
    "net": "2 FeCl3 + 3 Ca(OH)2 → 2 Fe(OH)3 + 3 CaCl2"
  },
  {
    "id": "env-coag-ferric-chloride-bicarbonate",
    "name": "Ferric chloride hydrolysis with municipal bicarbonate alkalinity",
    "reactants": [
      "fecl3",
      "nahco3"
    ],
    "products": [
      "feoh3",
      "nacl",
      "co2"
    ],
    "enthalpy": -145,
    "desc": "Natural alkalinity consumption during ferric chloride coagulation with CO2 gas release.",
    "type": "gas_evolution",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#935116",
        "description": "Red-brown ferric hydroxide floc precipitates with gentle effervescence"
      }
    ],
    "net": "FeCl3 + 3 NaHCO3 → Fe(OH)3 + 3 NaCl + 3 CO2"
  },
  {
    "id": "env-coag-ferrous-sulfate-lime",
    "name": "Ferrous sulfate coagulation with calcium hydroxide",
    "reactants": [
      "feso4",
      "caoh2"
    ],
    "products": [
      "feoh2",
      "caso4"
    ],
    "enthalpy": -95,
    "desc": "Lime-copperas coagulation producing green gelatinous ferrous hydroxide floc.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#1E8449",
        "description": "Dark green gelatinous Fe(OH)2 precipitate forms"
      }
    ],
    "net": "FeSO4 + Ca(OH)2 → Fe(OH)2 + CaSO4"
  },
  {
    "id": "env-coag-ferrous-aeration-oxidation",
    "name": "Aerobic oxidation of ferrous hydroxide floc to stable ferric hydroxide",
    "reactants": [
      "feoh2",
      "o2",
      "water"
    ],
    "products": [
      "feoh3"
    ],
    "enthalpy": -240,
    "desc": "Air-stripping basin oxidation converting green ferrous sludge to insoluble brown ferric rust.",
    "type": "redox_other",
    "effects": [
      {
        "type": "color_change",
        "colorFrom": "#1E8449",
        "colorTo": "#935116",
        "description": "Greenish Fe(OH)2 oxidizes to dense reddish-brown Fe(OH)3"
      }
    ],
    "net": "4 Fe(OH)2 + O2 + 2 H2O → 4 Fe(OH)3"
  },
  {
    "id": "env-coag-alum-carbonate",
    "name": "Aluminum sulfate coagulation with sodium carbonate (soda ash)",
    "reactants": [
      "al2-so4-3",
      "na2co3",
      "water"
    ],
    "products": [
      "al-oh-3",
      "na2so4",
      "co2"
    ],
    "enthalpy": -175,
    "desc": "Alkalinity replenishment during alum water treatment.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "White gelatinous aluminum hydroxide floc forms with bubbling"
      }
    ],
    "net": "Al2(SO4)3 + 3 Na2CO3 + 3 H2O → 2 Al(OH)3 + 3 Na2SO4 + 3 CO2"
  },
  {
    "id": "env-coag-ferric-sulfate-lime",
    "name": "Ferric sulfate coagulation with hydrated lime",
    "reactants": [
      "fe2-so4-3",
      "caoh2"
    ],
    "products": [
      "feoh3",
      "caso4"
    ],
    "enthalpy": -210,
    "desc": "Industrial coagulant settling heavy metals and suspended silt.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#935116",
        "description": "Heavy reddish-brown ferric sludge settles quickly"
      }
    ],
    "net": "Fe2(SO4)3 + 3 Ca(OH)2 → 2 Fe(OH)3 + 3 CaSO4"
  },
  {
    "id": "env-cr6-reduction-formic-acid",
    "name": "Formic acid reduction of toxic chromium(VI) in acidic wastewater",
    "reactants": [
      "k2cr2o7",
      "hcooh",
      "h2so4"
    ],
    "products": [
      "cr2-so4-3",
      "co2",
      "k2so4",
      "water"
    ],
    "enthalpy": -540,
    "desc": "Organic acid reduction of hexavalent chromium converting orange Cr(VI) to green Cr(III).",
    "type": "redox_other",
    "effects": [
      {
        "type": "color_change",
        "colorFrom": "#E67E22",
        "colorTo": "#1E8449",
        "description": "Orange solution shifts to deep green Cr(III)"
      }
    ],
    "net": "K2Cr2O7 + 3 HCOOH + 4 H2SO4 → Cr2(SO4)3 + 3 CO2 + K2SO4 + 7 H2O"
  },
  {
    "id": "env-cr6-reduction-k-metabisulfite",
    "name": "Potassium metabisulfite reduction of hexavalent chromium",
    "reactants": [
      "k2cr2o7",
      "k2s2o5",
      "h2so4"
    ],
    "products": [
      "cr2-so4-3",
      "k2so4",
      "water"
    ],
    "enthalpy": -635,
    "desc": "Reductive detoxification of electroplating rinse waters.",
    "type": "redox_other",
    "effects": [
      {
        "type": "color_change",
        "colorFrom": "#E67E22",
        "colorTo": "#1E8449",
        "description": "Brilliant orange shifts to deep green Cr(III)"
      }
    ],
    "net": "2 K2Cr2O7 + 3 K2S2O5 + 5 H2SO4 → 2 Cr2(SO4)3 + 5 K2SO4 + 5 H2O"
  },
  {
    "id": "env-cr6-reduction-glycerol",
    "name": "Glycerol byproduct reduction of hexavalent chromium in acidic media",
    "reactants": [
      "k2cr2o7",
      "c3h8o3",
      "h2so4"
    ],
    "products": [
      "cr2-so4-3",
      "co2",
      "k2so4",
      "water"
    ],
    "enthalpy": -1120,
    "desc": "Sustainable utilization of crude biodiesel glycerol as a Cr(VI) reducing agent.",
    "type": "redox_other",
    "effects": [
      {
        "type": "color_change",
        "colorFrom": "#E67E22",
        "colorTo": "#1E8449",
        "description": "Orange dichromate reduces to emerald green Cr(III)"
      }
    ],
    "net": "7 K2Cr2O7 + 3 C3H8O3 + 28 H2SO4 → 7 Cr2(SO4)3 + 9 CO2 + 7 K2SO4 + 40 H2O"
  },
  {
    "id": "env-cr6-reduction-thiosulfate",
    "name": "Sodium thiosulfate reduction of hexavalent chromium in acidic effluent",
    "reactants": [
      "k2cr2o7",
      "na2s2o3",
      "h2so4"
    ],
    "products": [
      "cr2-so4-3",
      "na2so4",
      "k2so4",
      "water"
    ],
    "enthalpy": -680,
    "desc": "Reductive destruction of residual dichromate oxidizer.",
    "type": "redox_other",
    "effects": [
      {
        "type": "color_change",
        "colorFrom": "#E67E22",
        "colorTo": "#1E8449",
        "description": "Orange Cr(VI) turns deep emerald green Cr(III)"
      }
    ],
    "net": "4 K2Cr2O7 + 3 Na2S2O3 + 13 H2SO4 → 4 Cr2(SO4)3 + 3 Na2SO4 + 4 K2SO4 + 13 H2O"
  },
  {
    "id": "env-cr3-crcl3-lime-ppt",
    "name": "Lime precipitation of chromium(III) chloride as chromium hydroxide",
    "reactants": [
      "crcl3",
      "caoh2"
    ],
    "products": [
      "cr-oh-3",
      "cacl2"
    ],
    "enthalpy": -145,
    "desc": "Neutralization isolating green Cr(OH)3 sludge from chrome tanning wastewater.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#1E8449",
        "description": "Dense green floc of Cr(OH)3 precipitates"
      }
    ],
    "net": "2 CrCl3 + 3 Ca(OH)2 → 2 Cr(OH)3 + 3 CaCl2"
  },
  {
    "id": "env-cr3-precipitation-soda-ash",
    "name": "Sodium carbonate neutralization and precipitation of chromium(III)",
    "reactants": [
      "cr2-so4-3",
      "na2co3",
      "water"
    ],
    "products": [
      "cr-oh-3",
      "na2so4",
      "co2"
    ],
    "enthalpy": -165,
    "desc": "Carbonate precipitation buffering pH with carbon dioxide release.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#1E8449",
        "description": "Green Cr(OH)3 settles with gentle effervescence"
      }
    ],
    "net": "Cr2(SO4)3 + 3 Na2CO3 + 3 H2O → 2 Cr(OH)3 + 3 Na2SO4 + 3 CO2"
  },
  {
    "id": "env-cr3-precipitation-ammonia",
    "name": "Ammoniacal precipitation of chromium(III) hydroxide",
    "reactants": [
      "cr2-so4-3",
      "ammonia",
      "water"
    ],
    "products": [
      "cr-oh-3",
      "nh4-2-so4"
    ],
    "enthalpy": -170,
    "desc": "Ammonium hydroxide neutralization recovering valuable chromium.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#1E8449",
        "description": "Grey-green precipitate of Cr(OH)3 forms"
      }
    ],
    "net": "Cr2(SO4)3 + 6 NH3 + 6 H2O → 2 Cr(OH)3 + 3 (NH4)2SO4"
  },
  {
    "id": "env-cr3-precipitation-magnesia",
    "name": "Magnesium oxide precipitation of chromium(III) hydroxide",
    "reactants": [
      "cr2-so4-3",
      "mgo",
      "water"
    ],
    "products": [
      "cr-oh-3",
      "mgso4"
    ],
    "enthalpy": -160,
    "desc": "Controlled slow alkali release minimizing hydroxide redissoiution.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#1E8449",
        "description": "Dense green chromium hydroxide sludge precipitates"
      }
    ],
    "net": "Cr2(SO4)3 + 3 MgO + 3 H2O → 2 Cr(OH)3 + 3 MgSO4"
  },
  {
    "id": "env-cr3-crcl3-carbonate-ppt",
    "name": "Soda ash precipitation of chromium(III) chloride",
    "reactants": [
      "crcl3",
      "na2co3",
      "water"
    ],
    "products": [
      "cr-oh-3",
      "nacl",
      "co2"
    ],
    "enthalpy": -155,
    "desc": "Carbonate neutralization producing green hydroxide floc with bubbling.",
    "type": "precipitation",
    "effects": [],
    "net": "2 CrCl3 + 3 Na2CO3 + 3 H2O → 2 Cr(OH)3 + 6 NaCl + 3 CO2"
  },
  {
    "id": "env-cr3-crcl3-ammonia-ppt",
    "name": "Ammonia precipitation of chromium(III) chloride",
    "reactants": [
      "crcl3",
      "ammonia",
      "water"
    ],
    "products": [
      "cr-oh-3",
      "ammonium-chloride"
    ],
    "enthalpy": -148,
    "desc": "Ammonia recovery of chromium as hydroxide.",
    "type": "precipitation",
    "effects": [],
    "net": "CrCl3 + 3 NH3 + 3 H2O → Cr(OH)3 + 3 NH4Cl"
  },
  {
    "id": "env-metal-lead-carbonate-ppt",
    "name": "Sodium carbonate precipitation of lead(II) chloride to cerussite",
    "reactants": [
      "pbcl2",
      "na2co3"
    ],
    "products": [
      "pbco3",
      "nacl"
    ],
    "enthalpy": -95,
    "desc": "Removal of soluble lead as insoluble white lead carbonate.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Heavy white precipitate of lead(II) carbonate forms"
      }
    ],
    "net": "PbCl2 + Na2CO3 → PbCO3 + 2 NaCl"
  },
  {
    "id": "env-metal-cadmium-carbonate-ppt",
    "name": "Sodium carbonate precipitation of cadmium(II) chloride to otavite",
    "reactants": [
      "cdcl2",
      "na2co3"
    ],
    "products": [
      "cdco3",
      "nacl"
    ],
    "enthalpy": -98,
    "desc": "Alkaline carbonate insolubilization of toxic cadmium.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Dense white precipitate of cadmium carbonate forms"
      }
    ],
    "net": "CdCl2 + Na2CO3 → CdCO3 + 2 NaCl"
  },
  {
    "id": "env-metal-cadmium-sulfate-sulfide",
    "name": "Sodium sulfide precipitation of cadmium sulfate to yellow cadmium sulfide",
    "reactants": [
      "cdso4",
      "na2s"
    ],
    "products": [
      "cds",
      "na2so4"
    ],
    "enthalpy": -148,
    "desc": "Quantitative sulfide precipitation of cadmium from smelting wash liquors.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#F4D03F",
        "description": "Brilliant yellow cadmium sulfide precipitate forms"
      }
    ],
    "net": "CdSO4 + Na2S → CdS + Na2SO4"
  },
  {
    "id": "env-metal-copper-bicarbonate-ppt",
    "name": "Sodium bicarbonate precipitation of copper(II) chloride",
    "reactants": [
      "cucl2",
      "nahco3"
    ],
    "products": [
      "cuco3",
      "nacl",
      "co2",
      "water"
    ],
    "enthalpy": -85,
    "desc": "Effervescent bicarbonate precipitation of turquoise copper carbonate.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#17A589",
        "description": "Pale greenish-blue copper(II) carbonate precipitates with fizzing"
      }
    ],
    "net": "CuCl2 + 2 NaHCO3 → CuCO3 + 2 NaCl + CO2 + H2O"
  },
  {
    "id": "env-metal-nickel-bicarbonate-ppt",
    "name": "Sodium bicarbonate precipitation of nickel(II) chloride",
    "reactants": [
      "nicl2",
      "nahco3"
    ],
    "products": [
      "nico3",
      "nacl",
      "co2",
      "water"
    ],
    "enthalpy": -88,
    "desc": "Gentle carbonate neutralization precipitating pale green nickel carbonate.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#A9DFBF",
        "description": "Light green precipitate of nickel carbonate forms"
      }
    ],
    "net": "NiCl2 + 2 NaHCO3 → NiCO3 + 2 NaCl + CO2 + H2O"
  },
  {
    "id": "env-metal-zinc-bicarbonate-ppt",
    "name": "Sodium bicarbonate precipitation of zinc(II) chloride",
    "reactants": [
      "zncl2",
      "nahco3"
    ],
    "products": [
      "znco3",
      "nacl",
      "co2",
      "water"
    ],
    "enthalpy": -92,
    "desc": "Carbonate precipitation forming smithsonite precursor with CO2 evolution.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Dense white precipitate of zinc carbonate settles"
      }
    ],
    "net": "ZnCl2 + 2 NaHCO3 → ZnCO3 + 2 NaCl + CO2 + H2O"
  },
  {
    "id": "env-metal-lead-bicarbonate-ppt",
    "name": "Sodium bicarbonate precipitation of lead(II) chloride",
    "reactants": [
      "pbcl2",
      "nahco3"
    ],
    "products": [
      "pbco3",
      "nacl",
      "co2",
      "water"
    ],
    "enthalpy": -82,
    "desc": "Bicarbonate buffering insolubilizing lead contaminants.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "White precipitate of lead carbonate settles"
      }
    ],
    "net": "PbCl2 + 2 NaHCO3 → PbCO3 + 2 NaCl + CO2 + H2O"
  },
  {
    "id": "env-metal-cadmium-bicarbonate-ppt",
    "name": "Sodium bicarbonate precipitation of cadmium(II) chloride",
    "reactants": [
      "cdcl2",
      "nahco3"
    ],
    "products": [
      "cdco3",
      "nacl",
      "co2",
      "water"
    ],
    "enthalpy": -86,
    "desc": "Alkaline precipitation buffering toxic cadmium rinses.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "White precipitate of cadmium carbonate forms"
      }
    ],
    "net": "CdCl2 + 2 NaHCO3 → CdCO3 + 2 NaCl + CO2 + H2O"
  },
  {
    "id": "env-metal-iron2-bicarbonate-ppt",
    "name": "Sodium bicarbonate precipitation of iron(II) chloride to siderite",
    "reactants": [
      "fecl2",
      "nahco3"
    ],
    "products": [
      "feco3",
      "nacl",
      "co2",
      "water"
    ],
    "enthalpy": -78,
    "desc": "Insolubilization of ferrous iron as white/tan ferrous carbonate.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#F5CBA7",
        "description": "Off-white to pale tan precipitate of ferrous carbonate settles"
      }
    ],
    "net": "FeCl2 + 2 NaHCO3 → FeCO3 + 2 NaCl + CO2 + H2O"
  },
  {
    "id": "env-metal-arsenic-h2s-ppt",
    "name": "Hydrogen sulfide precipitation of arsenic trioxide to orpiment",
    "reactants": [
      "as2o3",
      "h2s"
    ],
    "products": [
      "as2s3",
      "water"
    ],
    "enthalpy": -110,
    "desc": "Smelter acid-gas scrubbing precipitating bright yellow arsenic trisulfide.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#F4D03F",
        "description": "Vivid golden-yellow orpiment (As2S3) precipitate forms"
      }
    ],
    "net": "As2O3 + 3 H2S → As2S3 + 3 H2O"
  },
  {
    "id": "env-persulfate-thermal-na2s2o8-decomp",
    "name": "Thermal activation of sodium persulfate generating oxygen and bisulfate",
    "reactants": [
      "na2s2o8",
      "water"
    ],
    "products": [
      "na2so4",
      "h2so4",
      "o2"
    ],
    "enthalpy": 65,
    "desc": "In-situ chemical oxidation (ISCO) generating reactive sulfate radicals.",
    "type": "decomposition",
    "effects": [],
    "net": "2 Na2S2O8 + 2 H2O → 2 Na2SO4 + 2 H2SO4 + O2"
  },
  {
    "id": "env-persulfate-fe2-activation-sodium",
    "name": "Ferrous iron activation of sodium persulfate producing ferric sulfate",
    "reactants": [
      "na2s2o8",
      "feso4"
    ],
    "products": [
      "na2so4",
      "fe2-so4-3"
    ],
    "enthalpy": -145,
    "desc": "Homogeneous catalytic activation generating sulfate radicals for contaminant destruction.",
    "type": "redox_other",
    "effects": [],
    "net": "Na2S2O8 + 2 FeSO4 → Na2SO4 + Fe2(SO4)3"
  },
  {
    "id": "env-persulfate-phenol-mineralization-direct",
    "name": "Sodium persulfate advanced oxidation mineralization of phenol",
    "reactants": [
      "c6h6o",
      "na2s2o8",
      "water"
    ],
    "products": [
      "co2",
      "na2so4",
      "h2so4"
    ],
    "enthalpy": -2850,
    "desc": "Complete destructive mineralization of refractory phenolic pollutants.",
    "type": "redox_other",
    "effects": [],
    "net": "C6H6O + 14 Na2S2O8 + 11 H2O → 6 CO2 + 14 Na2SO4 + 14 H2SO4"
  },
  {
    "id": "env-persulfate-benzene-mineralization-direct",
    "name": "Sodium persulfate destruction of hazardous benzene in groundwater",
    "reactants": [
      "c6h6",
      "na2s2o8",
      "water"
    ],
    "products": [
      "co2",
      "na2so4",
      "h2so4"
    ],
    "enthalpy": -3400,
    "desc": "In-situ soil remediation converting carcinogenic benzene into CO2.",
    "type": "redox_other",
    "effects": [],
    "net": "C6H6 + 15 Na2S2O8 + 12 H2O → 6 CO2 + 15 Na2SO4 + 15 H2SO4"
  },
  {
    "id": "env-persulfate-toluene-mineralization-direct",
    "name": "Sodium persulfate mineralization of toxic toluene (BTEX)",
    "reactants": [
      "c7h8",
      "na2s2o8",
      "water"
    ],
    "products": [
      "co2",
      "na2so4",
      "h2so4"
    ],
    "enthalpy": -3950,
    "desc": "Persulfate remediation of petroleum hydrocarbon plumes.",
    "type": "redox_other",
    "effects": [],
    "net": "C7H8 + 18 Na2S2O8 + 14 H2O → 7 CO2 + 18 Na2SO4 + 18 H2SO4"
  },
  {
    "id": "env-persulfate-manganese-oxidation",
    "name": "Persulfate oxidation of soluble manganese(II) to insoluble manganese dioxide",
    "reactants": [
      "mnso4",
      "na2s2o8",
      "water"
    ],
    "products": [
      "mno2",
      "na2so4",
      "h2so4"
    ],
    "enthalpy": -165,
    "desc": "Drinking water demanganization precipitating black pyrolusite.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#111111",
        "description": "Dark brown-black precipitate of MnO2 forms"
      }
    ],
    "net": "MnSO4 + Na2S2O8 + 2 H2O → MnO2 + Na2SO4 + 2 H2SO4"
  },
  {
    "id": "env-persulfate-acetone-mineralization",
    "name": "Sodium persulfate oxidative degradation of solvent acetone",
    "reactants": [
      "ch3coch3",
      "na2s2o8",
      "water"
    ],
    "products": [
      "co2",
      "na2so4",
      "h2so4"
    ],
    "enthalpy": -1850,
    "desc": "Sulfate radical destruction of volatile oxygenated organic solvents.",
    "type": "redox_other",
    "effects": [],
    "net": "CH3COCH3 + 8 Na2S2O8 + 5 H2O → 3 CO2 + 8 Na2SO4 + 8 H2SO4"
  },
  {
    "id": "env-persulfate-glycerol-mineralization",
    "name": "Sodium persulfate oxidation of industrial glycerol waste",
    "reactants": [
      "c3h8o3",
      "na2s2o8",
      "water"
    ],
    "products": [
      "co2",
      "na2so4",
      "h2so4"
    ],
    "enthalpy": -2250,
    "desc": "Advanced chemical oxidation decomposing glycerol into CO2 and sulfuric acid.",
    "type": "redox_other",
    "effects": [],
    "net": "C3H8O3 + 7 Na2S2O8 + 3 H2O → 3 CO2 + 7 Na2SO4 + 7 H2SO4"
  },
  {
    "id": "env-persulfate-ethanol-mineralization",
    "name": "Persulfate oxidation of ethanol wash water effluent",
    "reactants": [
      "c2h5oh",
      "na2s2o8",
      "water"
    ],
    "products": [
      "co2",
      "na2so4",
      "h2so4"
    ],
    "enthalpy": -1650,
    "desc": "Total oxidative destruction of alcohols.",
    "type": "redox_other",
    "effects": [],
    "net": "C2H5OH + 6 Na2S2O8 + 3 H2O → 2 CO2 + 6 Na2SO4 + 6 H2SO4"
  },
  {
    "id": "env-persulfate-k-phenol-mineralization",
    "name": "Potassium persulfate advanced oxidation of phenol",
    "reactants": [
      "c6h6o",
      "k2s2o8",
      "water"
    ],
    "products": [
      "co2",
      "k2so4",
      "h2so4"
    ],
    "enthalpy": -2840,
    "desc": "Potassium persulfate mineralization of phenolic wastewater.",
    "type": "redox_other",
    "effects": [],
    "net": "C6H6O + 14 K2S2O8 + 11 H2O → 6 CO2 + 14 K2SO4 + 14 H2SO4"
  },
  {
    "id": "env-fenton-phenol-mineralization",
    "name": "Fenton advanced oxidation mineralization of toxic phenol",
    "reactants": [
      "c6h6o",
      "h2o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -3200,
    "desc": "Total destructive oxidation of phenolic wastewater into carbon dioxide and water.",
    "type": "redox_other",
    "effects": [],
    "net": "C6H6O + 14 H2O2 → 6 CO2 + 17 H2O"
  },
  {
    "id": "env-peroxone-benzene-mineralization",
    "name": "Peroxone (ozone + hydrogen peroxide) advanced oxidation of benzene",
    "reactants": [
      "c6h6",
      "o3",
      "h2o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -3850,
    "desc": "Synergistic ozone-peroxide generation of hydroxyl radicals mineralizing benzene.",
    "type": "redox_other",
    "effects": [],
    "net": "C6H6 + 4 O3 + 3 H2O2 → 6 CO2 + 6 H2O"
  },
  {
    "id": "env-peroxone-phenol-mineralization",
    "name": "Peroxone synergistic advanced oxidation of phenol",
    "reactants": [
      "c6h6o",
      "o3",
      "h2o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -3400,
    "desc": "Total destruction of refractory phenolic contaminants.",
    "type": "redox_other",
    "effects": [],
    "net": "3 C6H6O + 11 O3 + 9 H2O2 → 18 CO2 + 18 H2O"
  },
  {
    "id": "env-peroxone-toluene-mineralization",
    "name": "Peroxone oxidation of toxic toluene hydrocarbon",
    "reactants": [
      "c7h8",
      "o3",
      "h2o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -4350,
    "desc": "Hydroxyl radical mineralization of aromatic methyl side chain and ring.",
    "type": "redox_other",
    "effects": [],
    "net": "C7H8 + 5 O3 + 3 H2O2 → 7 CO2 + 7 H2O"
  },
  {
    "id": "env-persulfate-ethylene-glycol-destruction",
    "name": "Persulfate advanced oxidation of ethylene glycol wastewater",
    "reactants": [
      "c2h6o2",
      "na2s2o8",
      "water"
    ],
    "products": [
      "co2",
      "na2so4",
      "h2so4"
    ],
    "enthalpy": -1450,
    "desc": "Persulfate radical degradation of glycol antifreeze effluent.",
    "type": "redox_other",
    "effects": [],
    "net": "C2H6O2 + 5 Na2S2O8 + 2 H2O → 2 CO2 + 5 Na2SO4 + 5 H2SO4"
  },
  {
    "id": "env-fenton-glycerol-destruction",
    "name": "Fenton advanced oxidation of glycerol waste streams",
    "reactants": [
      "c3h8o3",
      "h2o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -1850,
    "desc": "Catalytic peroxide oxidation mineralizing trihydric alcohol.",
    "type": "redox_other",
    "effects": [],
    "net": "C3H8O3 + 7 H2O2 → 3 CO2 + 11 H2O"
  },
  {
    "id": "env-fenton-acetone-destruction",
    "name": "Fenton oxidation of waste acetone solvent",
    "reactants": [
      "ch3coch3",
      "h2o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -1650,
    "desc": "Radical cleavage and mineralization of volatile ketone solvent.",
    "type": "redox_other",
    "effects": [],
    "net": "CH3COCH3 + 8 H2O2 → 3 CO2 + 11 H2O"
  },
  {
    "id": "env-fenton-isopropanol-destruction",
    "name": "Fenton advanced oxidation of isopropanol in semiconductor effluent",
    "reactants": [
      "c3h8o",
      "h2o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -1950,
    "desc": "Total destruction of rubbing alcohol solvents.",
    "type": "redox_other",
    "effects": [],
    "net": "C3H8O + 9 H2O2 → 3 CO2 + 13 H2O"
  },
  {
    "id": "env-persulfate-ascorbic-destruction",
    "name": "Persulfate degradation of residual ascorbic acid antioxidant",
    "reactants": [
      "c6h8o6_ascorbic",
      "na2s2o8",
      "water"
    ],
    "products": [
      "co2",
      "na2so4",
      "h2so4"
    ],
    "enthalpy": -2450,
    "desc": "Persulfate advanced oxidation mineralizing antioxidant residues.",
    "type": "redox_other",
    "effects": [],
    "net": "C6H8O6 + 10 Na2S2O8 + 6 H2O → 6 CO2 + 10 Na2SO4 + 10 H2SO4"
  },
  {
    "id": "env-fenton-ethanol-mineralization",
    "name": "Fenton oxidation of industrial ethanol wash effluent",
    "reactants": [
      "c2h5oh",
      "h2o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -1280,
    "desc": "Total oxidative destruction of alcohols.",
    "type": "redox_other",
    "effects": [],
    "net": "C2H5OH + 6 H2O2 → 2 CO2 + 9 H2O"
  },
  {
    "id": "env-amd-aeration-feso4-oxidation",
    "name": "Aerobic oxidation of ferrous iron in acid mine drainage",
    "reactants": [
      "feso4",
      "o2",
      "h2so4"
    ],
    "products": [
      "fe2-so4-3",
      "water"
    ],
    "enthalpy": -142,
    "desc": "Pre-oxidation converting soluble Fe(II) into easily precipitable Fe(III).",
    "type": "redox_other",
    "effects": [],
    "net": "4 FeSO4 + O2 + 2 H2SO4 → 2 Fe2(SO4)3 + 2 H2O"
  },
  {
    "id": "env-amd-ca-bicarbonate-neutralization",
    "name": "Calcium bicarbonate passive neutralization of acid mine drainage",
    "reactants": [
      "ca-hco3-2",
      "h2so4"
    ],
    "products": [
      "caso4",
      "co2",
      "water"
    ],
    "enthalpy": -92,
    "desc": "Alkaline groundwater buffering of acid streams.",
    "type": "gas_evolution",
    "effects": [
      {
        "type": "gas_evolution",
        "gasColor": "#FFFFFF",
        "description": "Gentle bubbling with carbon dioxide release"
      }
    ],
    "net": "Ca(HCO3)2 + H2SO4 → CaSO4 + 2 CO2 + 2 H2O"
  },
  {
    "id": "env-amd-fecl3-limestone-ppt",
    "name": "Limestone neutralization precipitating ferric hydroxide in AMD channels",
    "reactants": [
      "fecl3",
      "caco3",
      "water"
    ],
    "products": [
      "feoh3",
      "cacl2",
      "co2"
    ],
    "enthalpy": -168,
    "desc": "Contact bed neutralization with red-brown rust precipitation and CO2 release.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#935116",
        "description": "Reddish-brown ferric hydroxide precipitate settles with bubbling"
      }
    ],
    "net": "2 FeCl3 + 3 CaCO3 + 3 H2O → 2 Fe(OH)3 + 3 CaCl2 + 3 CO2"
  },
  {
    "id": "env-amd-alcl3-limestone-ppt",
    "name": "Limestone precipitation of aluminum chloride from acid drainage",
    "reactants": [
      "alcl3",
      "caco3",
      "water"
    ],
    "products": [
      "al-oh-3",
      "cacl2",
      "co2"
    ],
    "enthalpy": -158,
    "desc": "Aluminum removal via limestone rock drain contact.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "White aluminum hydroxide floc settles with CO2 evolution"
      }
    ],
    "net": "2 AlCl3 + 3 CaCO3 + 3 H2O → 2 Al(OH)3 + 3 CaCl2 + 3 CO2"
  },
  {
    "id": "env-amd-ferric-limestone-ppt",
    "name": "Limestone-promoted precipitation of ferric iron in AMD treatment ponds",
    "reactants": [
      "fe2-so4-3",
      "caco3",
      "water"
    ],
    "products": [
      "feoh3",
      "caso4",
      "co2"
    ],
    "enthalpy": -195,
    "desc": "Acidity neutralization precipitating yellow-boy iron sludge.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#935116",
        "description": "Heavy brownish-yellow ferric precipitate ('yellow boy') settles"
      }
    ],
    "net": "Fe2(SO4)3 + 3 CaCO3 + 3 H2O → 2 Fe(OH)3 + 3 CaSO4 + 3 CO2"
  },
  {
    "id": "env-amd-aluminum-limestone-ppt",
    "name": "Limestone precipitation of dissolved aluminum from acidic drainage",
    "reactants": [
      "al2-so4-3",
      "caco3",
      "water"
    ],
    "products": [
      "al-oh-3",
      "caso4",
      "co2"
    ],
    "enthalpy": -175,
    "desc": "Removal of ecotoxic aluminum as gelatinous hydroxide floc.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "White gelatinous aluminum floc precipitates"
      }
    ],
    "net": "Al2(SO4)3 + 3 CaCO3 + 3 H2O → 2 Al(OH)3 + 3 CaSO4 + 3 CO2"
  },
  {
    "id": "env-amd-ferrous-soda-ash-ppt",
    "name": "Soda ash precipitation of dissolved ferrous iron to siderite",
    "reactants": [
      "feso4",
      "na2co3"
    ],
    "products": [
      "feco3",
      "na2so4"
    ],
    "enthalpy": -88,
    "desc": "Insolubilization of soluble Fe(II) prior to aeration.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#F5CBA7",
        "description": "Pale tan precipitate of ferrous carbonate settles"
      }
    ],
    "net": "FeSO4 + Na2CO3 → FeCO3 + Na2SO4"
  },
  {
    "id": "env-amd-al-bicarbonate-ppt",
    "name": "Sodium bicarbonate sweep precipitation of dissolved aluminum",
    "reactants": [
      "al2-so4-3",
      "nahco3"
    ],
    "products": [
      "al-oh-3",
      "na2so4",
      "co2"
    ],
    "enthalpy": -168,
    "desc": "Safe pH elevation without excess causticity precipitating Al(OH)3.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "White gelatinous aluminum floc forms with effervescence"
      }
    ],
    "net": "Al2(SO4)3 + 6 NaHCO3 → 2 Al(OH)3 + 3 Na2SO4 + 6 CO2"
  },
  {
    "id": "env-amd-ammonia-neutralization-direct",
    "name": "Ammonia gas injection neutralization of acid mine drainage",
    "reactants": [
      "h2so4",
      "ammonia"
    ],
    "products": [
      "nh4-2-so4"
    ],
    "enthalpy": -135,
    "desc": "Rapid gaseous acid neutralization yielding agricultural ammonium sulfate fertilizer.",
    "type": "acid_base_neutralization",
    "effects": [],
    "net": "H2SO4 + 2 NH3 → (NH4)2SO4"
  },
  {
    "id": "env-amd-ferrous-bicarbonate-reaction",
    "name": "Reaction of ferrous sulfate with calcium bicarbonate in limestone drains",
    "reactants": [
      "feso4",
      "ca-hco3-2"
    ],
    "products": [
      "feco3",
      "caso4",
      "co2",
      "water"
    ],
    "enthalpy": -95,
    "desc": "Passive coprecipitation of gypsum and siderite.",
    "type": "precipitation",
    "effects": [],
    "net": "FeSO4 + Ca(HCO3)2 → FeCO3 + CaSO4 + CO2 + H2O"
  },
  {
    "id": "env-phos-h3po4-limestone-direct",
    "name": "Limestone precipitation of phosphoric acid as tricalcium phosphate",
    "reactants": [
      "caco3",
      "h3po4"
    ],
    "products": [
      "ca3po42",
      "co2",
      "water"
    ],
    "enthalpy": -118,
    "desc": "Phosphorus capture using cheap limestone packing beds.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "White precipitate of calcium phosphate forms with effervescence"
      }
    ],
    "net": "3 CaCO3 + 2 H3PO4 → Ca3(PO4)2 + 3 CO2 + 3 H2O"
  },
  {
    "id": "env-phos-alcl3-neutralization-ppt",
    "name": "Aluminum chloride and caustic precipitation of orthophosphate",
    "reactants": [
      "alcl3",
      "h3po4",
      "naoh"
    ],
    "products": [
      "alpo4",
      "nacl",
      "water"
    ],
    "enthalpy": -165,
    "desc": "Acid-phosphate effluent treatment isolating insoluble aluminum phosphate.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "White precipitate of AlPO4 settles"
      }
    ],
    "net": "AlCl3 + H3PO4 + 3 NaOH → AlPO4 + 3 NaCl + 3 H2O"
  },
  {
    "id": "env-phos-fecl3-neutralization-ppt",
    "name": "Ferric chloride and sodium hydroxide precipitation of phosphate",
    "reactants": [
      "fecl3",
      "h3po4",
      "naoh"
    ],
    "products": [
      "fepo4",
      "nacl",
      "water"
    ],
    "enthalpy": -172,
    "desc": "Coprecipitation of iron(III) phosphate.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FCF3CF",
        "description": "Yellowish-white precipitate of FePO4 forms"
      }
    ],
    "net": "FeCl3 + H3PO4 + 3 NaOH → FePO4 + 3 NaCl + 3 H2O"
  },
  {
    "id": "env-phos-cacl2-neutralization-ppt",
    "name": "Calcium chloride and caustic precipitation of phosphoric acid",
    "reactants": [
      "cacl2",
      "h3po4",
      "naoh"
    ],
    "products": [
      "ca3po42",
      "nacl",
      "water"
    ],
    "enthalpy": -185,
    "desc": "Controlled precipitation of bone-ash hydroxyapatite precursor.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Dense white precipitate of calcium phosphate settles"
      }
    ],
    "net": "3 CaCl2 + 2 H3PO4 + 6 NaOH → Ca3(PO4)2 + 6 NaCl + 6 H2O"
  },
  {
    "id": "env-phos-mg-carbonate-reaction",
    "name": "Magnesium carbonate precipitation of phosphoric acid to trimagnesium phosphate",
    "reactants": [
      "mgco3",
      "h3po4"
    ],
    "products": [
      "mg3-po4-2",
      "co2",
      "water"
    ],
    "enthalpy": -122,
    "desc": "Slow-release phosphate fertilizer recovery from manure digester supernatants.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "White crystalline precipitate of magnesium phosphate forms with bubbling"
      }
    ],
    "net": "3 MgCO3 + 2 H3PO4 → Mg3(PO4)2 + 3 CO2 + 3 H2O"
  },
  {
    "id": "env-phos-calcium-hydroxide-ppt",
    "name": "Hydrated lime precipitation of phosphate from sewage effluent",
    "reactants": [
      "caoh2",
      "na3po4"
    ],
    "products": [
      "ca3po42",
      "naoh"
    ],
    "enthalpy": -150,
    "desc": "Alkaline lime precipitation of phosphorus.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "White precipitate of calcium phosphate settles"
      }
    ],
    "net": "3 Ca(OH)2 + 2 Na3PO4 → Ca3(PO4)2 + 6 NaOH"
  },
  {
    "id": "env-fluoride-lime-ppt",
    "name": "Hydrated lime precipitation of toxic fluoride from industrial rinses",
    "reactants": [
      "naf",
      "caoh2"
    ],
    "products": [
      "caf2",
      "naoh"
    ],
    "enthalpy": -85,
    "desc": "Fluoride precipitation as insoluble fluorite mineral.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Fine white crystalline precipitate of calcium fluoride forms"
      }
    ],
    "net": "2 NaF + Ca(OH)2 → CaF2 + 2 NaOH"
  },
  {
    "id": "env-k-persulfate-benzene-mineralization",
    "name": "Potassium persulfate advanced oxidation mineralization of benzene",
    "reactants": [
      "c6h6",
      "k2s2o8",
      "water"
    ],
    "products": [
      "co2",
      "k2so4",
      "h2so4"
    ],
    "enthalpy": -3380,
    "desc": "Potassium persulfate in-situ chemical oxidation of benzene.",
    "type": "redox_other",
    "effects": [],
    "net": "C6H6 + 15 K2S2O8 + 12 H2O → 6 CO2 + 15 K2SO4 + 15 H2SO4"
  },
  {
    "id": "env-persulfate-oxalic-acid-mineralization",
    "name": "Sodium persulfate destruction of oxalic acid chelator",
    "reactants": [
      "h2c2o4",
      "na2s2o8"
    ],
    "products": [
      "co2",
      "na2so4",
      "h2so4"
    ],
    "enthalpy": -450,
    "desc": "Mineralization of dicarboxylic acid chelating agent.",
    "type": "redox_other",
    "effects": [],
    "net": "H2C2O4 + Na2S2O8 → 2 CO2 + Na2SO4 + H2SO4"
  },
  {
    "id": "env-fenton-formaldehyde-mineralization",
    "name": "Fenton oxidation of toxic formaldehyde in industrial wastewaters",
    "reactants": [
      "hcho",
      "h2o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -480,
    "desc": "Advanced oxidation converting embalming and resin formaldehyde into water and carbon dioxide.",
    "type": "redox_other",
    "effects": [],
    "net": "HCHO + 2 H2O2 → CO2 + 3 H2O"
  }
];
