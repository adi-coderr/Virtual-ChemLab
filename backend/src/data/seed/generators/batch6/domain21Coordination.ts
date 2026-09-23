// Domain 21: Coordination Chemistry & Complexes (105 reactions)
import { addReaction } from "./generateBatch6.js";

export function buildDomain21Coordination(): void {
  const reactions = [
  {
    "id": "coord-co-hexammine-synth",
    "name": "Synthesis of hexaamminecobalt(III) chloride via peroxide oxidation",
    "reactants": [
      "cocl2",
      "ammonia",
      "ammonium-chloride",
      "h2o2"
    ],
    "products": [
      "co-nh3-6-cl3",
      "water"
    ],
    "enthalpy": -310,
    "desc": "Air/peroxide oxidation of ammoniacal cobalt(II) yielding golden-orange Werner salt.",
    "type": "redox_other",
    "effects": [
      {
        "type": "color_change",
        "colorFrom": "#E86A82",
        "colorTo": "#FFB347",
        "description": "Pink solution converts to golden orange crystals"
      }
    ],
    "net": "2 CoCl2 + 10 NH3 + 2 NH4Cl + H2O2 → 2 CoH18N6Cl3 + 2 H2O"
  },
  {
    "id": "coord-co-purpureo-synth",
    "name": "Synthesis of chloropentaamminecobalt(III) chloride (purpureo salt)",
    "reactants": [
      "co-nh3-6-cl3",
      "hcl"
    ],
    "products": [
      "co-nh3-5-cl-cl2",
      "ammonium-chloride"
    ],
    "enthalpy": -45,
    "desc": "Acid-induced substitution of ammonia by chloride ligand forming purple crystals.",
    "type": "complexation",
    "effects": [
      {
        "type": "color_change",
        "colorFrom": "#FFB347",
        "colorTo": "#800020",
        "description": "Golden orange crystals convert to deep purple-red crystals"
      }
    ],
    "net": "CoH18N6Cl3 + HCl → CoH15N5Cl3 + NH4Cl"
  },
  {
    "id": "coord-co-nitro-synth",
    "name": "Ligand substitution of chloropentaamminecobalt(III) with sodium nitrite",
    "reactants": [
      "co-nh3-5-cl-cl2",
      "nano2"
    ],
    "products": [
      "co-nh3-5-no2-cl2",
      "nacl"
    ],
    "enthalpy": -28,
    "desc": "Metathesis generating the yellow-brown N-bonded nitro linkage isomer.",
    "type": "complexation",
    "effects": [
      {
        "type": "color_change",
        "colorFrom": "#800020",
        "colorTo": "#DAA520",
        "description": "Purple crystals convert to yellow-brown nitro complex"
      }
    ],
    "net": "CoH15N5Cl3 + NaNO2 → CoH15N6O2Cl2 + NaCl"
  },
  {
    "id": "coord-co-nitro-kno2",
    "name": "Synthesis of nitropentaamminecobalt(III) with potassium nitrite",
    "reactants": [
      "co-nh3-5-cl-cl2",
      "kno2"
    ],
    "products": [
      "co-nh3-5-no2-cl2",
      "kcl"
    ],
    "enthalpy": -30,
    "desc": "Coordination substitution yielding the nitro linkage isomer.",
    "type": "complexation",
    "effects": [],
    "net": "CoH15N5Cl3 + KNO2 → CoH15N6O2Cl2 + KCl"
  },
  {
    "id": "coord-co-hexammine-base-decomp",
    "name": "Alkaline decomposition of hexaamminecobalt(III) by caustic soda",
    "reactants": [
      "co-nh3-6-cl3",
      "naoh"
    ],
    "products": [
      "cooh3",
      "ammonia",
      "nacl"
    ],
    "enthalpy": -120,
    "desc": "Boiling caustic soda strips ammine ligands precipitating black-brown cobalt(III) hydroxide.",
    "type": "complexation",
    "effects": [],
    "net": "CoH18N6Cl3 + 3 NaOH → CoH3O3 + 6 NH3 + 3 NaCl"
  },
  {
    "id": "coord-co-hexammine-koh-decomp",
    "name": "Alkaline decomposition of hexaamminecobalt(III) by caustic potash",
    "reactants": [
      "co-nh3-6-cl3",
      "koh"
    ],
    "products": [
      "cooh3",
      "ammonia",
      "kcl"
    ],
    "enthalpy": -125,
    "desc": "Potassium hydroxide hydrolysis of the cobalt hexammine coordination sphere.",
    "type": "complexation",
    "effects": [],
    "net": "CoH18N6Cl3 + 3 KOH → CoH3O3 + 6 NH3 + 3 KCl"
  },
  {
    "id": "coord-co-purpureo-naoh",
    "name": "Caustic soda hydrolysis of chloropentaamminecobalt(III)",
    "reactants": [
      "co-nh3-5-cl-cl2",
      "naoh"
    ],
    "products": [
      "cooh3",
      "ammonia",
      "nacl"
    ],
    "enthalpy": -115,
    "desc": "Precipitation of cobalt(III) hydroxide with evolution of ammonia gas.",
    "type": "complexation",
    "effects": [],
    "net": "CoH15N5Cl3 + 3 NaOH → CoH3O3 + 5 NH3 + 3 NaCl"
  },
  {
    "id": "coord-co-purpureo-koh",
    "name": "Caustic potash hydrolysis of chloropentaamminecobalt(III)",
    "reactants": [
      "co-nh3-5-cl-cl2",
      "koh"
    ],
    "products": [
      "cooh3",
      "ammonia",
      "kcl"
    ],
    "enthalpy": -118,
    "desc": "Hydroxide displacement of ammine and chloro ligands.",
    "type": "complexation",
    "effects": [],
    "net": "CoH15N5Cl3 + 3 KOH → CoH3O3 + 5 NH3 + 3 KCl"
  },
  {
    "id": "coord-co-nitro-naoh",
    "name": "Alkaline destruction of nitropentaamminecobalt(III) chloride",
    "reactants": [
      "co-nh3-5-no2-cl2",
      "naoh"
    ],
    "products": [
      "cooh3",
      "ammonia",
      "nano2",
      "nacl"
    ],
    "enthalpy": -130,
    "desc": "Alkaline release of nitrite and ammonia yielding insoluble Co(OH)3.",
    "type": "complexation",
    "effects": [],
    "net": "CoH15N6O2Cl2 + 3 NaOH → CoH3O3 + 5 NH3 + NaNO2 + 2 NaCl"
  },
  {
    "id": "coord-co-nitro-koh",
    "name": "Caustic potash decomposition of nitropentaamminecobalt(III)",
    "reactants": [
      "co-nh3-5-no2-cl2",
      "koh"
    ],
    "products": [
      "cooh3",
      "ammonia",
      "kno2",
      "kcl"
    ],
    "enthalpy": -132,
    "desc": "Base-mediated destruction of nitropentaammine complex.",
    "type": "complexation",
    "effects": [],
    "net": "CoH15N6O2Cl2 + 3 KOH → CoH3O3 + 5 NH3 + KNO2 + 2 KCl"
  },
  {
    "id": "coord-co-hexammine-h2so4",
    "name": "Metathesis of hexaamminecobalt(III) chloride with sulfuric acid",
    "reactants": [
      "co-nh3-6-cl3",
      "h2so4"
    ],
    "products": [
      "co-nh3-5-cl-cl2",
      "nh4-2-so4"
    ],
    "enthalpy": -65,
    "desc": "Acid displacement yielding purpureo complex and ammonium sulfate.",
    "type": "complexation",
    "effects": [],
    "net": "2 CoH18N6Cl3 + H2SO4 → 2 CoH15N5Cl3 + (NH4)2SO4"
  },
  {
    "id": "coord-cobr2-kscn-vogel",
    "name": "Formation of blue potassium tetrathiocyanatocobaltate(II) from cobalt bromide",
    "reactants": [
      "cobr2",
      "kscn"
    ],
    "products": [
      "k2-co-scn-4",
      "kbr"
    ],
    "enthalpy": -40,
    "desc": "Deep blue complexation in amyl alcohol/acetone confirming cobalt(II).",
    "type": "complexation",
    "effects": [
      {
        "type": "color_change",
        "colorFrom": "#E86A82",
        "colorTo": "#00008B",
        "description": "Pink cobalt solution turns brilliant cobalt blue"
      }
    ],
    "net": "CoBr2 + 4 KSCN → K2[Co(SCN)4] + 2 KBr"
  },
  {
    "id": "coord-cobr2-kcl-tetrachloro",
    "name": "Formation of potassium tetrachlorocobaltate(II) from cobalt(II) bromide",
    "reactants": [
      "cobr2",
      "kcl"
    ],
    "products": [
      "k2-co-cl4",
      "kbr"
    ],
    "enthalpy": -24,
    "desc": "Octahedral pink to tetrahedral deep blue tetrachlorocobaltate conversion.",
    "type": "complexation",
    "effects": [
      {
        "type": "color_change",
        "colorFrom": "#E86A82",
        "colorTo": "#0000FF",
        "description": "Pink solution transforms to intense blue"
      }
    ],
    "net": "CoBr2 + 4 KCl → K2[CoCl4] + 2 KBr"
  },
  {
    "id": "coord-k2cocl4-agno3-metathesis",
    "name": "Metathesis of potassium tetrachlorocobaltate(II) with silver nitrate",
    "reactants": [
      "k2-co-cl4",
      "agno3"
    ],
    "products": [
      "agcl",
      "kno3",
      "co-no3-2"
    ],
    "enthalpy": -180,
    "desc": "Quantitative precipitation of silver chloride from chlorocobaltate complex.",
    "type": "complexation",
    "effects": [],
    "net": "K2[CoCl4] + 4 AgNO3 → 4 AgCl + 2 KNO3 + Co(NO3)2"
  },
  {
    "id": "coord-k2coscn4-naoh-precipitation",
    "name": "Caustic soda decomposition of potassium tetrathiocyanatocobaltate",
    "reactants": [
      "k2-co-scn-4",
      "naoh"
    ],
    "products": [
      "cooh2",
      "kscn",
      "nascn"
    ],
    "enthalpy": -45,
    "desc": "Alkaline precipitation of pink-blue cobalt(II) hydroxide from thiocyanate complex.",
    "type": "complexation",
    "effects": [],
    "net": "K2[Co(SCN)4] + 2 NaOH → Co(OH)2 + 2 KSCN + 2 NaSCN"
  },
  {
    "id": "coord-cucl2-ammonia-tetrammine",
    "name": "Synthesis of tetraamminecopper(II) sulfate via copper chloride and ammonium sulfate",
    "reactants": [
      "cucl2",
      "ammonia",
      "na2so4"
    ],
    "products": [
      "cu-nh3-4-so4",
      "nacl"
    ],
    "enthalpy": -95,
    "desc": "Ammonia coordination in presence of sulfate forming deep royal azure blue complex.",
    "type": "complexation",
    "effects": [
      {
        "type": "color_change",
        "colorFrom": "#4A90E2",
        "colorTo": "#002366",
        "description": "Light blue solution deepens into intense royal blue"
      }
    ],
    "net": "CuCl2 + 4 NH3 + Na2SO4 → CuH12N4SO4 + 2 NaCl"
  },
  {
    "id": "coord-cu-tetrammine-acid-destruct",
    "name": "Acidic destruction of tetraamminecopper(II) sulfate by sulfuric acid",
    "reactants": [
      "cu-nh3-4-so4",
      "h2so4"
    ],
    "products": [
      "cuso4",
      "nh4-2-so4"
    ],
    "enthalpy": -145,
    "desc": "Protonation of ammine ligands restores pale blue copper(II) sulfate.",
    "type": "complexation",
    "effects": [],
    "net": "CuH12N4SO4 + 2 H2SO4 → CuSO4 + 2 (NH4)2SO4"
  },
  {
    "id": "coord-cu-tetrammine-hcl",
    "name": "Acidification of tetraamminecopper(II) sulfate with hydrochloric acid",
    "reactants": [
      "cu-nh3-4-so4",
      "hcl"
    ],
    "products": [
      "cucl2",
      "ammonium-chloride",
      "h2so4"
    ],
    "enthalpy": -150,
    "desc": "Complete decoordination yielding copper(II) chloride and ammonium salts.",
    "type": "complexation",
    "effects": [],
    "net": "CuH12N4SO4 + 6 HCl → CuCl2 + 4 NH4Cl + H2SO4"
  },
  {
    "id": "coord-cu-tetrammine-hno3",
    "name": "Nitric acid decoordination of tetraamminecopper(II) sulfate",
    "reactants": [
      "cu-nh3-4-so4",
      "hno3"
    ],
    "products": [
      "cuno32",
      "nh4no3",
      "h2so4"
    ],
    "enthalpy": -155,
    "desc": "Protonation of coordinated ammine ligands by nitric acid.",
    "type": "complexation",
    "effects": [],
    "net": "CuH12N4SO4 + 6 HNO3 → Cu(NO3)2 + 4 NH4NO3 + H2SO4"
  },
  {
    "id": "coord-cu-tetrammine-naoh",
    "name": "Caustic soda precipitation of copper(II) hydroxide from tetraammine complex",
    "reactants": [
      "cu-nh3-4-so4",
      "naoh"
    ],
    "products": [
      "cuoh2",
      "na2so4",
      "ammonia"
    ],
    "enthalpy": -45,
    "desc": "Alkaline precipitation of light blue gelatinous copper hydroxide with release of ammonia.",
    "type": "complexation",
    "effects": [],
    "net": "CuH12N4SO4 + 2 NaOH → Cu(OH)2 + Na2SO4 + 4 NH3"
  },
  {
    "id": "coord-cu-tetrammine-koh",
    "name": "Caustic potash precipitation of copper hydroxide from tetraammine complex",
    "reactants": [
      "cu-nh3-4-so4",
      "koh"
    ],
    "products": [
      "cuoh2",
      "k2so4",
      "ammonia"
    ],
    "enthalpy": -48,
    "desc": "Potassium hydroxide displacement of ammine coordination sphere.",
    "type": "complexation",
    "effects": [],
    "net": "CuH12N4SO4 + 2 KOH → Cu(OH)2 + K2SO4 + 4 NH3"
  },
  {
    "id": "coord-cuno32-kcl-tetrachloro",
    "name": "Formation of potassium tetrachlorocuprate(II) from copper(II) nitrate",
    "reactants": [
      "cuno32",
      "kcl"
    ],
    "products": [
      "k2-cu-cl4",
      "kno3"
    ],
    "enthalpy": -20,
    "desc": "Chloride coordination converting aqua copper to yellow-green tetrachlorocuprate.",
    "type": "complexation",
    "effects": [
      {
        "type": "color_change",
        "colorFrom": "#4A90E2",
        "colorTo": "#2E8B57",
        "description": "Blue cupric solution turns olive/yellow-green"
      }
    ],
    "net": "Cu(NO3)2 + 4 KCl → K2[CuCl4] + 2 KNO3"
  },
  {
    "id": "coord-k2cucl4-agno3-metathesis",
    "name": "Metathesis of potassium tetrachlorocuprate with silver nitrate",
    "reactants": [
      "k2-cu-cl4",
      "agno3"
    ],
    "products": [
      "agcl",
      "kno3",
      "cuno32"
    ],
    "enthalpy": -195,
    "desc": "Complete precipitation of coordinated chloride ligands as curdy silver chloride.",
    "type": "complexation",
    "effects": [],
    "net": "K2[CuCl4] + 4 AgNO3 → 4 AgCl + 2 KNO3 + Cu(NO3)2"
  },
  {
    "id": "coord-k2cucl4-naoh",
    "name": "Precipitation of copper hydroxide from potassium tetrachlorocuprate",
    "reactants": [
      "k2-cu-cl4",
      "naoh"
    ],
    "products": [
      "cuoh2",
      "nacl",
      "kcl"
    ],
    "enthalpy": -55,
    "desc": "Caustic precipitation of gelatinous copper(II) hydroxide.",
    "type": "complexation",
    "effects": [],
    "net": "K2[CuCl4] + 2 NaOH → Cu(OH)2 + 2 NaCl + 2 KCl"
  },
  {
    "id": "coord-k2cucl4-koh",
    "name": "Precipitation of copper hydroxide from tetrachlorocuprate by caustic potash",
    "reactants": [
      "k2-cu-cl4",
      "koh"
    ],
    "products": [
      "cuoh2",
      "kcl"
    ],
    "enthalpy": -58,
    "desc": "Quantitative hydroxide precipitation of copper.",
    "type": "complexation",
    "effects": [],
    "net": "K2[CuCl4] + 2 KOH → Cu(OH)2 + 4 KCl"
  },
  {
    "id": "coord-cu-tetrammine-h2s",
    "name": "Sulfide precipitation of copper(II) sulfide from tetraammine complex",
    "reactants": [
      "cu-nh3-4-so4",
      "h2s"
    ],
    "products": [
      "cus",
      "nh4-2-so4",
      "ammonia"
    ],
    "enthalpy": -130,
    "desc": "Hydrogen sulfide displacement precipitating insoluble black cupric sulfide.",
    "type": "complexation",
    "effects": [],
    "net": "CuH12N4SO4 + H2S → CuS + (NH4)2SO4 + 2 NH3"
  },
  {
    "id": "coord-cu-tetrammine-na2s",
    "name": "Sodium sulfide precipitation of copper sulfide from tetraammine complex",
    "reactants": [
      "cu-nh3-4-so4",
      "na2s"
    ],
    "products": [
      "cus",
      "na2so4",
      "ammonia"
    ],
    "enthalpy": -140,
    "desc": "Precipitation of black copper sulfide from ammoniacal solution.",
    "type": "complexation",
    "effects": [],
    "net": "CuH12N4SO4 + Na2S → CuS + Na2SO4 + 4 NH3"
  },
  {
    "id": "coord-cu-tetrammine-k2s",
    "name": "Potassium sulfide precipitation of copper sulfide from tetraammine complex",
    "reactants": [
      "cu-nh3-4-so4",
      "k2s"
    ],
    "products": [
      "cus",
      "k2so4",
      "ammonia"
    ],
    "enthalpy": -142,
    "desc": "Sulfide attack displacing ammine ligands to precipitate black CuS.",
    "type": "complexation",
    "effects": [],
    "net": "CuH12N4SO4 + K2S → CuS + K2SO4 + 4 NH3"
  },
  {
    "id": "coord-k2cucl4-na2s",
    "name": "Sodium sulfide precipitation of copper(II) sulfide from tetrachlorocuprate",
    "reactants": [
      "k2-cu-cl4",
      "na2s"
    ],
    "products": [
      "cus",
      "nacl",
      "kcl"
    ],
    "enthalpy": -160,
    "desc": "Precipitation of dense black copper sulfide from chlorocuprate matrix.",
    "type": "complexation",
    "effects": [],
    "net": "K2[CuCl4] + Na2S → CuS + 2 NaCl + 2 KCl"
  },
  {
    "id": "coord-k2cucl4-k2s",
    "name": "Potassium sulfide precipitation of copper sulfide from tetrachlorocuprate",
    "reactants": [
      "k2-cu-cl4",
      "k2s"
    ],
    "products": [
      "cus",
      "kcl"
    ],
    "enthalpy": -162,
    "desc": "Rapid precipitation of insoluble black cupric sulfide.",
    "type": "complexation",
    "effects": [],
    "net": "K2[CuCl4] + K2S → CuS + 4 KCl"
  },
  {
    "id": "coord-niso4-ammonia-hexammine",
    "name": "Synthesis of hexaamminenickel(II) chloride via nickel sulfate and ammonium chloride",
    "reactants": [
      "niso4",
      "ammonia",
      "ammonium-chloride"
    ],
    "products": [
      "ni-nh3-6-cl2",
      "nh4-2-so4"
    ],
    "enthalpy": -95,
    "desc": "Ammonia coordination in presence of ammonium chloride forming violet hexaammine crystals.",
    "type": "complexation",
    "effects": [
      {
        "type": "color_change",
        "colorFrom": "#2E8B57",
        "colorTo": "#7B68EE",
        "description": "Emerald green solution turns deep violet"
      }
    ],
    "net": "NiSO4 + 6 NH3 + 2 NH4Cl → NiH18N6Cl2 + (NH4)2SO4"
  },
  {
    "id": "coord-ni-hexammine-hno3-destruct",
    "name": "Nitric acid decoordination of hexaamminenickel(II) chloride",
    "reactants": [
      "ni-nh3-6-cl2",
      "hno3"
    ],
    "products": [
      "nicl2",
      "nh4no3"
    ],
    "enthalpy": -150,
    "desc": "Acid-induced removal of ammine ligands restoring green nickel(II) salt.",
    "type": "complexation",
    "effects": [],
    "net": "NiH18N6Cl2 + 6 HNO3 → NiCl2 + 6 NH4NO3"
  },
  {
    "id": "coord-ni-hexammine-h2so4",
    "name": "Acidic decomposition of hexaamminenickel(II) by sulfuric acid",
    "reactants": [
      "ni-nh3-6-cl2",
      "h2so4"
    ],
    "products": [
      "niso4",
      "nh4-2-so4",
      "hcl"
    ],
    "enthalpy": -170,
    "desc": "Sulfuric acid destruction of the ammine coordination shell.",
    "type": "complexation",
    "effects": [],
    "net": "NiH18N6Cl2 + 4 H2SO4 → NiSO4 + 3 (NH4)2SO4 + 2 HCl"
  },
  {
    "id": "coord-ni-hexammine-naoh",
    "name": "Caustic soda precipitation of nickel(II) hydroxide from ammine complex",
    "reactants": [
      "ni-nh3-6-cl2",
      "naoh"
    ],
    "products": [
      "nioh2",
      "nacl",
      "ammonia"
    ],
    "enthalpy": -50,
    "desc": "Precipitation of apple-green nickel hydroxide with release of gaseous ammonia.",
    "type": "complexation",
    "effects": [],
    "net": "NiH18N6Cl2 + 2 NaOH → Ni(OH)2 + 2 NaCl + 6 NH3"
  },
  {
    "id": "coord-ni-hexammine-koh",
    "name": "Caustic potash precipitation of nickel(II) hydroxide from ammine complex",
    "reactants": [
      "ni-nh3-6-cl2",
      "koh"
    ],
    "products": [
      "nioh2",
      "kcl",
      "ammonia"
    ],
    "enthalpy": -52,
    "desc": "Hydroxide displacement of coordinated ammines.",
    "type": "complexation",
    "effects": [],
    "net": "NiH18N6Cl2 + 2 KOH → Ni(OH)2 + 2 KCl + 6 NH3"
  },
  {
    "id": "coord-nino32-kcn-tetracyano",
    "name": "Synthesis of potassium tetracyanonickelate(II) from nickel nitrate",
    "reactants": [
      "ni-no3-2",
      "kcn"
    ],
    "products": [
      "k2-ni-cn-4",
      "kno3"
    ],
    "enthalpy": -115,
    "desc": "Cyanide substitution forming yellow-orange square planar [Ni(CN)4]2-.",
    "type": "complexation",
    "effects": [
      {
        "type": "color_change",
        "colorFrom": "#2E8B57",
        "colorTo": "#FFA500",
        "description": "Green nickel solution forms orange tetracyanonickelate"
      }
    ],
    "net": "Ni(NO3)2 + 4 KCN → K2[Ni(CN)4] + 2 KNO3"
  },
  {
    "id": "coord-k2nicn4-hcl",
    "name": "Acid decomposition of potassium tetracyanonickelate(II) by hydrochloric acid",
    "reactants": [
      "k2-ni-cn-4",
      "hcl"
    ],
    "products": [
      "nicl2",
      "kcl",
      "hcn"
    ],
    "enthalpy": -75,
    "desc": "Acidification of tetracyanonickelate liberating hazardous hydrogen cyanide gas.",
    "type": "complexation",
    "effects": [],
    "net": "K2[Ni(CN)4] + 4 HCl → NiCl2 + 2 KCl + 4 HCN"
  },
  {
    "id": "coord-k2nicn4-h2so4",
    "name": "Sulfuric acid decomposition of potassium tetracyanonickelate(II)",
    "reactants": [
      "k2-ni-cn-4",
      "h2so4"
    ],
    "products": [
      "niso4",
      "k2so4",
      "hcn"
    ],
    "enthalpy": -80,
    "desc": "Acid hydrolysis of tetracyanonickelate complex.",
    "type": "complexation",
    "effects": [],
    "net": "K2[Ni(CN)4] + 2 H2SO4 → NiSO4 + K2SO4 + 4 HCN"
  },
  {
    "id": "coord-ni-hexammine-na2s",
    "name": "Sodium sulfide precipitation of nickel sulfide from hexaammine complex",
    "reactants": [
      "ni-nh3-6-cl2",
      "na2s"
    ],
    "products": [
      "nis",
      "nacl",
      "ammonia"
    ],
    "enthalpy": -135,
    "desc": "Precipitation of dense black nickel(II) sulfide from ammoniacal medium.",
    "type": "complexation",
    "effects": [],
    "net": "NiH18N6Cl2 + Na2S → NiS + 2 NaCl + 6 NH3"
  },
  {
    "id": "coord-ni-hexammine-k2s",
    "name": "Potassium sulfide precipitation of nickel sulfide from hexaammine complex",
    "reactants": [
      "ni-nh3-6-cl2",
      "k2s"
    ],
    "products": [
      "nis",
      "kcl",
      "ammonia"
    ],
    "enthalpy": -138,
    "desc": "Sulfide attack forming black insoluble NiS.",
    "type": "complexation",
    "effects": [],
    "net": "NiH18N6Cl2 + K2S → NiS + 2 KCl + 6 NH3"
  },
  {
    "id": "coord-ni-en-synth",
    "name": "Synthesis of tris(ethylenediamine)nickel(II) chloride chelate",
    "reactants": [
      "nicl2",
      "ethylenediamine"
    ],
    "products": [
      "ni-en-3-cl2"
    ],
    "enthalpy": -140,
    "desc": "Thermodynamic chelate effect: bidentate ethylenediamine displaces monodentate ligands to form violet complex.",
    "type": "complexation",
    "effects": [
      {
        "type": "color_change",
        "colorFrom": "#2E8B57",
        "colorTo": "#9370DB",
        "description": "Green solution converts to rich violet tris-chelate"
      }
    ],
    "net": "NiCl2 + 3 C2H8N2 → NiC6H24N6Cl2"
  },
  {
    "id": "coord-ni-en-na2s",
    "name": "Sulfide precipitation of nickel sulfide from tris(ethylenediamine) chelate",
    "reactants": [
      "ni-en-3-cl2",
      "na2s"
    ],
    "products": [
      "nis",
      "nacl",
      "ethylenediamine"
    ],
    "enthalpy": -110,
    "desc": "Precipitation of black nickel sulfide with liberation of free ethylenediamine.",
    "type": "complexation",
    "effects": [],
    "net": "NiC6H24N6Cl2 + Na2S → NiS + 2 NaCl + 3 C2H8N2"
  },
  {
    "id": "coord-ni-en-k2s",
    "name": "Potassium sulfide precipitation of nickel sulfide from tris(ethylenediamine) chelate",
    "reactants": [
      "ni-en-3-cl2",
      "k2s"
    ],
    "products": [
      "nis",
      "kcl",
      "ethylenediamine"
    ],
    "enthalpy": -112,
    "desc": "Sulfide displacement of bidentate ethylenediamine chelates.",
    "type": "complexation",
    "effects": [],
    "net": "NiC6H24N6Cl2 + K2S → NiS + 2 KCl + 3 C2H8N2"
  },
  {
    "id": "coord-ni-en-naoh",
    "name": "Caustic soda precipitation of nickel hydroxide from tris(ethylenediamine) chelate",
    "reactants": [
      "ni-en-3-cl2",
      "naoh"
    ],
    "products": [
      "nioh2",
      "nacl",
      "ethylenediamine"
    ],
    "enthalpy": -35,
    "desc": "Alkaline precipitation of apple-green Ni(OH)2.",
    "type": "complexation",
    "effects": [],
    "net": "NiC6H24N6Cl2 + 2 NaOH → Ni(OH)2 + 2 NaCl + 3 C2H8N2"
  },
  {
    "id": "coord-ni-en-koh",
    "name": "Caustic potash precipitation of nickel hydroxide from tris(ethylenediamine) complex",
    "reactants": [
      "ni-en-3-cl2",
      "koh"
    ],
    "products": [
      "nioh2",
      "kcl",
      "ethylenediamine"
    ],
    "enthalpy": -38,
    "desc": "Hydroxide displacement of ethylenediamine ligands from nickel.",
    "type": "complexation",
    "effects": [],
    "net": "NiC6H24N6Cl2 + 2 KOH → Ni(OH)2 + 2 KCl + 3 C2H8N2"
  },
  {
    "id": "coord-cu-en-synth",
    "name": "Synthesis of bis(ethylenediamine)copper(II) sulfate chelate",
    "reactants": [
      "cuso4",
      "ethylenediamine"
    ],
    "products": [
      "cu-en-2-so4"
    ],
    "enthalpy": -125,
    "desc": "Chelation of copper(II) by bidentate ethylenediamine forming deep royal blue square planar complex.",
    "type": "complexation",
    "effects": [
      {
        "type": "color_change",
        "colorFrom": "#4A90E2",
        "colorTo": "#4169E1",
        "description": "Light blue solution deepens to royal blue chelate"
      }
    ],
    "net": "CuSO4 + 2 C2H8N2 → CuC4H16N4SO4"
  },
  {
    "id": "coord-cu-en-naoh",
    "name": "Caustic soda precipitation of copper hydroxide from bis(ethylenediamine) chelate",
    "reactants": [
      "cu-en-2-so4",
      "naoh"
    ],
    "products": [
      "cuoh2",
      "na2so4",
      "ethylenediamine"
    ],
    "enthalpy": -40,
    "desc": "Precipitation of gelatinous copper(II) hydroxide from stable chelate.",
    "type": "complexation",
    "effects": [],
    "net": "CuC4H16N4SO4 + 2 NaOH → Cu(OH)2 + Na2SO4 + 2 C2H8N2"
  },
  {
    "id": "coord-cu-en-koh",
    "name": "Caustic potash precipitation of copper hydroxide from bis(ethylenediamine) chelate",
    "reactants": [
      "cu-en-2-so4",
      "koh"
    ],
    "products": [
      "cuoh2",
      "k2so4",
      "ethylenediamine"
    ],
    "enthalpy": -42,
    "desc": "Potassium hydroxide displacement of ethylenediamine ligands.",
    "type": "complexation",
    "effects": [],
    "net": "CuC4H16N4SO4 + 2 KOH → Cu(OH)2 + K2SO4 + 2 C2H8N2"
  },
  {
    "id": "coord-cu-en-na2s",
    "name": "Sodium sulfide precipitation of copper sulfide from bis(ethylenediamine) chelate",
    "reactants": [
      "cu-en-2-so4",
      "na2s"
    ],
    "products": [
      "cus",
      "na2so4",
      "ethylenediamine"
    ],
    "enthalpy": -150,
    "desc": "Sulfide precipitation of black copper(II) sulfide from bis-chelate.",
    "type": "complexation",
    "effects": [],
    "net": "CuC4H16N4SO4 + Na2S → CuS + Na2SO4 + 2 C2H8N2"
  },
  {
    "id": "coord-cu-en-k2s",
    "name": "Potassium sulfide precipitation of copper sulfide from bis(ethylenediamine) chelate",
    "reactants": [
      "cu-en-2-so4",
      "k2s"
    ],
    "products": [
      "cus",
      "k2so4",
      "ethylenediamine"
    ],
    "enthalpy": -152,
    "desc": "Displacement of ethylenediamine chelates by sulfide anions.",
    "type": "complexation",
    "effects": [],
    "net": "CuC4H16N4SO4 + K2S → CuS + K2SO4 + 2 C2H8N2"
  },
  {
    "id": "coord-cu-en-h2s",
    "name": "Hydrogen sulfide precipitation of copper sulfide from bis(ethylenediamine) chelate",
    "reactants": [
      "cu-en-2-so4",
      "h2s"
    ],
    "products": [
      "cus",
      "h2so4",
      "ethylenediamine"
    ],
    "enthalpy": -135,
    "desc": "Acid sulfide displacement precipitating black CuS.",
    "type": "complexation",
    "effects": [],
    "net": "CuC4H16N4SO4 + H2S → CuS + H2SO4 + 2 C2H8N2"
  },
  {
    "id": "coord-zncl2-ammonia-tetrammine",
    "name": "Synthesis of tetraamminezinc(II) sulfate from zinc chloride",
    "reactants": [
      "zncl2",
      "ammonia",
      "na2so4"
    ],
    "products": [
      "zn-nh3-4-so4",
      "nacl"
    ],
    "enthalpy": -85,
    "desc": "Formation of clear colorless tetraammine complex from zinc chloride.",
    "type": "complexation",
    "effects": [],
    "net": "ZnCl2 + 4 NH3 + Na2SO4 → [Zn(NH3)4]SO4 + 2 NaCl"
  },
  {
    "id": "coord-zn-tetrammine-hno3-destruct",
    "name": "Nitric acid decoordination of tetraamminezinc(II) sulfate",
    "reactants": [
      "zn-nh3-4-so4",
      "hno3"
    ],
    "products": [
      "zn-no3-2",
      "nh4no3",
      "h2so4"
    ],
    "enthalpy": -145,
    "desc": "Protonation of ammine ligands restoring simple zinc salts.",
    "type": "complexation",
    "effects": [],
    "net": "[Zn(NH3)4]SO4 + 6 HNO3 → Zn(NO3)2 + 4 NH4NO3 + H2SO4"
  },
  {
    "id": "coord-zn-tetrammine-hcl",
    "name": "Hydrochloric acid decoordination of tetraamminezinc(II) sulfate",
    "reactants": [
      "zn-nh3-4-so4",
      "hcl"
    ],
    "products": [
      "zncl2",
      "ammonium-chloride",
      "h2so4"
    ],
    "enthalpy": -145,
    "desc": "Decoordination yielding zinc chloride and ammonium salts.",
    "type": "complexation",
    "effects": [],
    "net": "[Zn(NH3)4]SO4 + 6 HCl → ZnCl2 + 4 NH4Cl + H2SO4"
  },
  {
    "id": "coord-zn-tetrammine-naoh",
    "name": "Caustic soda precipitation of zinc hydroxide from tetraammine complex",
    "reactants": [
      "zn-nh3-4-so4",
      "naoh"
    ],
    "products": [
      "znoh2",
      "na2so4",
      "ammonia"
    ],
    "enthalpy": -32,
    "desc": "Precipitation of white gelatinous zinc hydroxide with release of ammonia.",
    "type": "complexation",
    "effects": [],
    "net": "[Zn(NH3)4]SO4 + 2 NaOH → Zn(OH)2 + Na2SO4 + 4 NH3"
  },
  {
    "id": "coord-zn-tetrammine-koh",
    "name": "Caustic potash precipitation of zinc hydroxide from tetraammine complex",
    "reactants": [
      "zn-nh3-4-so4",
      "koh"
    ],
    "products": [
      "znoh2",
      "k2so4",
      "ammonia"
    ],
    "enthalpy": -34,
    "desc": "Potassium hydroxide displacement of ammine coordination sphere.",
    "type": "complexation",
    "effects": [],
    "net": "[Zn(NH3)4]SO4 + 2 KOH → Zn(OH)2 + K2SO4 + 4 NH3"
  },
  {
    "id": "coord-zn-tetrammine-na2s",
    "name": "Sodium sulfide precipitation of zinc sulfide from tetraammine complex",
    "reactants": [
      "zn-nh3-4-so4",
      "na2s"
    ],
    "products": [
      "zns",
      "na2so4",
      "ammonia"
    ],
    "enthalpy": -130,
    "desc": "Precipitation of characteristic white zinc sulfide from ammoniacal medium.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "White zinc sulfide precipitates"
      }
    ],
    "net": "[Zn(NH3)4]SO4 + Na2S → ZnS + Na2SO4 + 4 NH3"
  },
  {
    "id": "coord-zn-tetrammine-k2s",
    "name": "Potassium sulfide precipitation of zinc sulfide from tetraammine complex",
    "reactants": [
      "zn-nh3-4-so4",
      "k2s"
    ],
    "products": [
      "zns",
      "k2so4",
      "ammonia"
    ],
    "enthalpy": -132,
    "desc": "Precipitation of insoluble white zinc sulfide.",
    "type": "complexation",
    "effects": [],
    "net": "[Zn(NH3)4]SO4 + K2S → ZnS + K2SO4 + 4 NH3"
  },
  {
    "id": "coord-zn-tetrammine-h2s",
    "name": "Hydrogen sulfide precipitation of zinc sulfide from tetraammine complex",
    "reactants": [
      "zn-nh3-4-so4",
      "h2s"
    ],
    "products": [
      "zns",
      "nh4-2-so4",
      "ammonia"
    ],
    "enthalpy": -120,
    "desc": "Sulfide gas precipitation of white zinc sulfide.",
    "type": "complexation",
    "effects": [],
    "net": "[Zn(NH3)4]SO4 + H2S → ZnS + (NH4)2SO4 + 2 NH3"
  },
  {
    "id": "coord-k2nicn4-agno3",
    "name": "Precipitation of silver cyanide from potassium tetracyanonickelate",
    "reactants": [
      "k2-ni-cn-4",
      "agno3"
    ],
    "products": [
      "k-ag-cn-2",
      "ni-no3-2"
    ],
    "enthalpy": -120,
    "desc": "Metathesis transferring cyano ligands to form stable dicyanoargentate(I).",
    "type": "complexation",
    "effects": [],
    "net": "K2[Ni(CN)4] + 2 AgNO3 → 2 KAgC2N2 + Ni(NO3)2"
  },
  {
    "id": "coord-ag2o-ammonia-cl-synth",
    "name": "Synthesis of diamminesilver(I) chloride from silver oxide",
    "reactants": [
      "ag2o",
      "ammonia",
      "ammonium-chloride"
    ],
    "products": [
      "ag-nh3-2-cl",
      "water"
    ],
    "enthalpy": -65,
    "desc": "Dissolution of brown silver oxide in ammoniacal ammonium chloride.",
    "type": "complexation",
    "effects": [],
    "net": "Ag2O + 2 NH3 + 2 NH4Cl → 2 [Ag(NH3)2]Cl + H2O"
  },
  {
    "id": "coord-ag-ammine-cl-h2so4",
    "name": "Reprecipitation of silver chloride from diamminesilver(I) by sulfuric acid",
    "reactants": [
      "ag-nh3-2-cl",
      "h2so4"
    ],
    "products": [
      "agcl",
      "nh4-2-so4"
    ],
    "enthalpy": -70,
    "desc": "Diagnostic confirmation: acid destroys ammine complex reprecipitating white AgCl.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Curdy white AgCl precipitates upon acidification"
      }
    ],
    "net": "[Ag(NH3)2]Cl + H2SO4 → AgCl + (NH4)2SO4"
  },
  {
    "id": "coord-ag-ammine-cl-hcl",
    "name": "Reprecipitation of silver chloride by hydrochloric acid",
    "reactants": [
      "ag-nh3-2-cl",
      "hcl"
    ],
    "products": [
      "agcl",
      "ammonium-chloride"
    ],
    "enthalpy": -68,
    "desc": "Acidification destroying diamminesilver(I) coordination.",
    "type": "complexation",
    "effects": [],
    "net": "[Ag(NH3)2]Cl + 2 HCl → AgCl + 2 NH4Cl"
  },
  {
    "id": "coord-ag-ammine-cl-kbr",
    "name": "Metathesis of diamminesilver(I) chloride with potassium bromide",
    "reactants": [
      "ag-nh3-2-cl",
      "kbr"
    ],
    "products": [
      "agbr",
      "kcl",
      "ammonia"
    ],
    "enthalpy": -45,
    "desc": "Precipitation of cream-colored silver bromide due to lower solubility product.",
    "type": "complexation",
    "effects": [],
    "net": "[Ag(NH3)2]Cl + KBr → AgBr + KCl + 2 NH3"
  },
  {
    "id": "coord-ag-ammine-cl-nabr",
    "name": "Precipitation of silver bromide from diamminesilver(I) chloride by sodium bromide",
    "reactants": [
      "ag-nh3-2-cl",
      "nabr"
    ],
    "products": [
      "agbr",
      "nacl",
      "ammonia"
    ],
    "enthalpy": -44,
    "desc": "Slightly insoluble silver bromide precipitates from ammoniacal solution.",
    "type": "complexation",
    "effects": [],
    "net": "[Ag(NH3)2]Cl + NaBr → AgBr + NaCl + 2 NH3"
  },
  {
    "id": "coord-ag-ammine-cl-ki",
    "name": "Metathesis of diamminesilver(I) chloride with potassium iodide",
    "reactants": [
      "ag-nh3-2-cl",
      "ki"
    ],
    "products": [
      "agi",
      "kcl",
      "ammonia"
    ],
    "enthalpy": -75,
    "desc": "Precipitation of pale yellow silver iodide due to extreme insolubility of AgI.",
    "type": "complexation",
    "effects": [],
    "net": "[Ag(NH3)2]Cl + KI → AgI + KCl + 2 NH3"
  },
  {
    "id": "coord-ag-ammine-cl-nai",
    "name": "Precipitation of silver iodide from diamminesilver(I) chloride by sodium iodide",
    "reactants": [
      "ag-nh3-2-cl",
      "nai"
    ],
    "products": [
      "agi",
      "nacl",
      "ammonia"
    ],
    "enthalpy": -74,
    "desc": "Yellow silver iodide precipitation from diamminesilver complex.",
    "type": "complexation",
    "effects": [],
    "net": "[Ag(NH3)2]Cl + NaI → AgI + NaCl + 2 NH3"
  },
  {
    "id": "coord-ag2o-ammonia-no3-synth",
    "name": "Synthesis of Tollens' reagent diamminesilver(I) nitrate from silver oxide",
    "reactants": [
      "ag2o",
      "ammonia",
      "nh4no3"
    ],
    "products": [
      "ag-nh3-2-no3",
      "water"
    ],
    "enthalpy": -68,
    "desc": "Formation of clear diamminesilver(I) reagent for aldehyde detection.",
    "type": "complexation",
    "effects": [],
    "net": "Ag2O + 2 NH3 + 2 NH4NO3 → 2 [Ag(NH3)2]NO3 + H2O"
  },
  {
    "id": "coord-ag-ammine-no3-h2so4",
    "name": "Sulfuric acid acidification of diamminesilver(I) nitrate",
    "reactants": [
      "ag-nh3-2-no3",
      "h2so4"
    ],
    "products": [
      "agno3",
      "nh4-2-so4"
    ],
    "enthalpy": -65,
    "desc": "Decoordination of Tollens' reagent by dilute sulfuric acid.",
    "type": "complexation",
    "effects": [],
    "net": "[Ag(NH3)2]NO3 + H2SO4 → AgNO3 + (NH4)2SO4"
  },
  {
    "id": "coord-ag-ammine-no3-hcl",
    "name": "Precipitation of silver chloride from Tollens' reagent by hydrochloric acid",
    "reactants": [
      "ag-nh3-2-no3",
      "hcl"
    ],
    "products": [
      "agcl",
      "nh4no3",
      "ammonium-chloride"
    ],
    "enthalpy": -110,
    "desc": "Acid destruction of Tollens' reagent precipitating curdy white silver chloride.",
    "type": "complexation",
    "effects": [],
    "net": "[Ag(NH3)2]NO3 + 2 HCl → AgCl + NH4NO3 + NH4Cl"
  },
  {
    "id": "coord-ag-ammine-no3-kbr",
    "name": "Precipitation of cream silver bromide from Tollens' reagent by potassium bromide",
    "reactants": [
      "ag-nh3-2-no3",
      "kbr"
    ],
    "products": [
      "agbr",
      "kno3",
      "ammonia"
    ],
    "enthalpy": -48,
    "desc": "Precipitation of insoluble silver bromide.",
    "type": "complexation",
    "effects": [],
    "net": "[Ag(NH3)2]NO3 + KBr → AgBr + KNO3 + 2 NH3"
  },
  {
    "id": "coord-ag-ammine-no3-nabr",
    "name": "Precipitation of silver bromide from Tollens' reagent by sodium bromide",
    "reactants": [
      "ag-nh3-2-no3",
      "nabr"
    ],
    "products": [
      "agbr",
      "nano3",
      "ammonia"
    ],
    "enthalpy": -47,
    "desc": "Metathesis forming pale cream silver bromide.",
    "type": "complexation",
    "effects": [],
    "net": "[Ag(NH3)2]NO3 + NaBr → AgBr + NaNO3 + 2 NH3"
  },
  {
    "id": "coord-ag-ammine-no3-ki",
    "name": "Precipitation of canary yellow silver iodide from Tollens' reagent by potassium iodide",
    "reactants": [
      "ag-nh3-2-no3",
      "ki"
    ],
    "products": [
      "agi",
      "kno3",
      "ammonia"
    ],
    "enthalpy": -78,
    "desc": "Immediate precipitation of insoluble yellow silver iodide.",
    "type": "complexation",
    "effects": [],
    "net": "[Ag(NH3)2]NO3 + KI → AgI + KNO3 + 2 NH3"
  },
  {
    "id": "coord-ag-ammine-no3-nai",
    "name": "Precipitation of silver iodide from Tollens' reagent by sodium iodide",
    "reactants": [
      "ag-nh3-2-no3",
      "nai"
    ],
    "products": [
      "agi",
      "nano3",
      "ammonia"
    ],
    "enthalpy": -77,
    "desc": "Quantitative precipitation of yellow silver iodide.",
    "type": "complexation",
    "effects": [],
    "net": "[Ag(NH3)2]NO3 + NaI → AgI + NaNO3 + 2 NH3"
  },
  {
    "id": "coord-ag-ammine-cl-na2s",
    "name": "Sulfide precipitation of silver sulfide from diamminesilver(I) chloride",
    "reactants": [
      "ag-nh3-2-cl",
      "na2s"
    ],
    "products": [
      "ag2s",
      "nacl",
      "ammonia"
    ],
    "enthalpy": -165,
    "desc": "Formation of extremely insoluble black silver sulfide.",
    "type": "complexation",
    "effects": [],
    "net": "2 [Ag(NH3)2]Cl + Na2S → Ag2S + 2 NaCl + 4 NH3"
  },
  {
    "id": "coord-feno33-kcl-tetrachloro",
    "name": "Formation of potassium tetrachloroferrate(III) complex from ferric nitrate",
    "reactants": [
      "fe-no3-3",
      "kcl"
    ],
    "products": [
      "k-fe-cl4",
      "kno3"
    ],
    "enthalpy": -22,
    "desc": "Coordination of chloride to ferric iron forming yellow-amber tetrachloroferrate.",
    "type": "complexation",
    "effects": [],
    "net": "Fe(NO3)3 + 4 KCl → K[FeCl4] + 3 KNO3"
  },
  {
    "id": "coord-kfecl4-agno3-metathesis",
    "name": "Metathesis of potassium tetrachloroferrate(III) with silver nitrate",
    "reactants": [
      "k-fe-cl4",
      "agno3"
    ],
    "products": [
      "agcl",
      "kno3",
      "fe-no3-3"
    ],
    "enthalpy": -210,
    "desc": "Quantitative precipitation of silver chloride from tetrachloroferrate.",
    "type": "complexation",
    "effects": [],
    "net": "K[FeCl4] + 4 AgNO3 → 4 AgCl + KNO3 + Fe(NO3)3"
  },
  {
    "id": "coord-feno33-nascn-hexathiocyanato",
    "name": "Formation of iron(III) thiocyanate complex from ferric nitrate and sodium thiocyanate",
    "reactants": [
      "fe-no3-3",
      "nascn"
    ],
    "products": [
      "fe-scn-3",
      "nano3"
    ],
    "enthalpy": -80,
    "desc": "Sensitive qualitative test for iron(III): formation of intensely blood-red coordination complex.",
    "type": "complexation",
    "effects": [
      {
        "type": "color_change",
        "colorFrom": "#DAA520",
        "colorTo": "#8B0000",
        "description": "Yellow-brown ferric solution turns intensely deep blood red"
      }
    ],
    "net": "Fe(NO3)3 + 3 NaSCN → Fe(SCN)3 + 3 NaNO3"
  },
  {
    "id": "coord-fecl3-nascn-thiocyanato",
    "name": "Blood-red iron(III) thiocyanate complexation with sodium thiocyanate",
    "reactants": [
      "fecl3",
      "nascn"
    ],
    "products": [
      "fe-scn-3",
      "nacl"
    ],
    "enthalpy": -60,
    "desc": "Sensitive analytical colorimetric detection of ferric ions with sodium thiocyanate.",
    "type": "complexation",
    "effects": [
      {
        "type": "color_change",
        "colorFrom": "#DAA520",
        "colorTo": "#800000",
        "description": "Ferric solution transforms into vivid dark red complex"
      }
    ],
    "net": "FeCl3 + 3 NaSCN → Fe(SCN)3 + 3 NaCl"
  },
  {
    "id": "coord-fecl3-nh4scn-thiocyanato",
    "name": "Iron(III) thiocyanate formation with ammonium thiocyanate",
    "reactants": [
      "fecl3",
      "nh4scn"
    ],
    "products": [
      "fe-scn-3",
      "ammonium-chloride"
    ],
    "enthalpy": -62,
    "desc": "Blood-red coordination complex formation with ammonium thiocyanate.",
    "type": "complexation",
    "effects": [],
    "net": "FeCl3 + 3 NH4SCN → Fe(SCN)3 + 3 NH4Cl"
  },
  {
    "id": "coord-k4fecn6-cl2-oxidation",
    "name": "Industrial oxidation of potassium ferrocyanide to ferricyanide by chlorine gas",
    "reactants": [
      "k4-fe-cn-6",
      "cl2"
    ],
    "products": [
      "k3-fe-cn-6",
      "kcl"
    ],
    "enthalpy": -115,
    "desc": "Chlorine gas oxidation of yellow ferrocyanide to deep ruby-red potassium ferricyanide.",
    "type": "redox_other",
    "effects": [
      {
        "type": "color_change",
        "colorFrom": "#FFFF00",
        "colorTo": "#DC143C",
        "description": "Yellow solution converts to intense red-orange ferricyanide"
      }
    ],
    "net": "2 K4[Fe(CN)6] + Cl2 → 2 K3[Fe(CN)6] + 2 KCl"
  },
  {
    "id": "coord-k4fecn6-h2o2-oxidation",
    "name": "Peroxide oxidation of potassium ferrocyanide in acidic medium",
    "reactants": [
      "k4-fe-cn-6",
      "h2o2",
      "hcl"
    ],
    "products": [
      "k3-fe-cn-6",
      "kcl",
      "water"
    ],
    "enthalpy": -170,
    "desc": "Controlled one-electron oxidation of hexacyanoferrate(II) to hexacyanoferrate(III).",
    "type": "complexation",
    "effects": [],
    "net": "2 K4[Fe(CN)6] + H2O2 + 2 HCl → 2 K3[Fe(CN)6] + 2 KCl + 2 H2O"
  },
  {
    "id": "coord-k3fecn6-h2o2-koh-reduction",
    "name": "Alkaline hydrogen peroxide reduction of potassium ferricyanide",
    "reactants": [
      "k3-fe-cn-6",
      "h2o2",
      "koh"
    ],
    "products": [
      "k4-fe-cn-6",
      "o2",
      "water"
    ],
    "enthalpy": -140,
    "desc": "Thermodynamic reversal in alkaline medium: peroxide reduces ferricyanide with effervescence of oxygen gas.",
    "type": "complexation",
    "effects": [],
    "net": "2 K3[Fe(CN)6] + H2O2 + 2 KOH → 2 K4[Fe(CN)6] + O2 + 2 H2O"
  },
  {
    "id": "coord-k3fecn6-ki-reduction",
    "name": "Reduction of potassium ferricyanide by potassium iodide",
    "reactants": [
      "k3-fe-cn-6",
      "ki"
    ],
    "products": [
      "k4-fe-cn-6",
      "i2"
    ],
    "enthalpy": -65,
    "desc": "Iodometric reduction of ferricyanide liberating molecular iodine.",
    "type": "complexation",
    "effects": [],
    "net": "2 K3[Fe(CN)6] + 2 KI → 2 K4[Fe(CN)6] + I2"
  },
  {
    "id": "coord-k4fecn6-h2so4-decomp",
    "name": "Destructive thermal acid decomposition of potassium ferrocyanide",
    "reactants": [
      "k4-fe-cn-6",
      "h2so4",
      "water"
    ],
    "products": [
      "k2so4",
      "feso4",
      "nh4-2-so4",
      "co"
    ],
    "enthalpy": -240,
    "desc": "Boiling concentrated sulfuric acid hydrolyzes cyano ligands liberating carbon monoxide gas.",
    "type": "decomposition",
    "effects": [],
    "net": "K4[Fe(CN)6] + 6 H2SO4 + 6 H2O → 2 K2SO4 + FeSO4 + 3 (NH4)2SO4 + 6 CO"
  },
  {
    "id": "coord-k3fecn6-h2so4-decomp",
    "name": "Destructive thermal acid decomposition of potassium ferricyanide",
    "reactants": [
      "k3-fe-cn-6",
      "h2so4",
      "water"
    ],
    "products": [
      "k2so4",
      "fe2-so4-3",
      "nh4-2-so4",
      "co"
    ],
    "enthalpy": -260,
    "desc": "Sulfuric acid hydrolysis yielding ferric sulfate, ammonium sulfate, and carbon monoxide.",
    "type": "complexation",
    "effects": [],
    "net": "2 K3[Fe(CN)6] + 12 H2SO4 + 12 H2O → 3 K2SO4 + Fe2(SO4)3 + 6 (NH4)2SO4 + 12 CO"
  },
  {
    "id": "coord-k3fecn6-naoh-decomp",
    "name": "Caustic soda decomposition of potassium ferricyanide",
    "reactants": [
      "k3-fe-cn-6",
      "naoh"
    ],
    "products": [
      "feoh3",
      "kcn",
      "nacn"
    ],
    "enthalpy": -85,
    "desc": "Alkaline destruction precipitating rust-brown iron(III) hydroxide.",
    "type": "complexation",
    "effects": [],
    "net": "K3[Fe(CN)6] + 3 NaOH → Fe(OH)3 + 3 KCN + 3 NaCN"
  },
  {
    "id": "coord-k3fecn6-koh-decomp",
    "name": "Caustic potash decomposition of potassium ferricyanide",
    "reactants": [
      "k3-fe-cn-6",
      "koh"
    ],
    "products": [
      "feoh3",
      "kcn"
    ],
    "enthalpy": -88,
    "desc": "Precipitation of ferric hydroxide by hot potassium hydroxide.",
    "type": "complexation",
    "effects": [],
    "net": "K3[Fe(CN)6] + 3 KOH → Fe(OH)3 + 6 KCN"
  },
  {
    "id": "coord-k4fecn6-naoh-decomp",
    "name": "Caustic soda decomposition of potassium ferrocyanide",
    "reactants": [
      "k4-fe-cn-6",
      "naoh"
    ],
    "products": [
      "feoh2",
      "kcn",
      "nacn"
    ],
    "enthalpy": -75,
    "desc": "Alkaline precipitation of greenish-white iron(II) hydroxide.",
    "type": "complexation",
    "effects": [],
    "net": "K4[Fe(CN)6] + 2 NaOH → Fe(OH)2 + 4 KCN + 2 NaCN"
  },
  {
    "id": "coord-fe-scn3-naoh",
    "name": "Caustic soda destruction of blood-red iron(III) thiocyanate",
    "reactants": [
      "fe-scn-3",
      "naoh"
    ],
    "products": [
      "feoh3",
      "nascn"
    ],
    "enthalpy": -90,
    "desc": "Hydroxide ion displaces thiocyanate ligands, precipitating reddish-brown ferric hydroxide.",
    "type": "complexation",
    "effects": [],
    "net": "Fe(SCN)3 + 3 NaOH → Fe(OH)3 + 3 NaSCN"
  },
  {
    "id": "coord-carb-fe-co5-synth",
    "name": "Synthesis of iron pentacarbonyl from finely divided iron and carbon monoxide",
    "reactants": [
      "fe",
      "co"
    ],
    "products": [
      "fe-co-5"
    ],
    "enthalpy": -220,
    "desc": "Direct thermal carbonylation under pressure (200°C, 200 bar) forming volatile amber liquid.",
    "type": "synthesis",
    "effects": [],
    "net": "Fe + 5 CO → FeC5O5"
  },
  {
    "id": "coord-carb-ni-co4-mond-synth",
    "name": "Mond process: synthesis of nickel tetracarbonyl at moderate temperature",
    "reactants": [
      "ni",
      "co"
    ],
    "products": [
      "ni-co-4"
    ],
    "enthalpy": -160,
    "desc": "Volatilization of nickel at 50°C into nickel tetracarbonyl gas for refining.",
    "type": "synthesis",
    "effects": [],
    "net": "Ni + 4 CO → NiC4O4"
  },
  {
    "id": "coord-carb-ni-co4-mond-decomp",
    "name": "Mond process: thermal decomposition of nickel tetracarbonyl to pure nickel",
    "reactants": [
      "ni-co-4"
    ],
    "products": [
      "ni",
      "co"
    ],
    "enthalpy": 160,
    "desc": "Thermal cracking of volatile nickel carbonyl at 230°C depositing 99.99% ultra-pure nickel pellets.",
    "type": "decomposition",
    "effects": [],
    "net": "NiC4O4 → Ni + 4 CO"
  },
  {
    "id": "coord-carb-cr-co6-synth",
    "name": "Synthesis of chromium hexacarbonyl",
    "reactants": [
      "cr",
      "co"
    ],
    "products": [
      "cr-co-6"
    ],
    "enthalpy": -250,
    "desc": "Reductive carbonylation forming sublimable white octahedral chromium carbonyl.",
    "type": "synthesis",
    "effects": [],
    "net": "Cr + 6 CO → CrC6O6"
  },
  {
    "id": "coord-carb-mo-co6-synth",
    "name": "Synthesis of molybdenum hexacarbonyl",
    "reactants": [
      "mo",
      "co"
    ],
    "products": [
      "mo-co-6"
    ],
    "enthalpy": -270,
    "desc": "High-pressure carbonylation yielding air-stable white crystalline molybdenum hexacarbonyl.",
    "type": "synthesis",
    "effects": [],
    "net": "Mo + 6 CO → MoC6O6"
  },
  {
    "id": "coord-carb-w-co6-synth",
    "name": "Synthesis of tungsten hexacarbonyl",
    "reactants": [
      "w",
      "co"
    ],
    "products": [
      "w-co-6"
    ],
    "enthalpy": -280,
    "desc": "Reductive carbonylation yielding volatile solid tungsten hexacarbonyl CVD precursor.",
    "type": "synthesis",
    "effects": [],
    "net": "W + 6 CO → WC6O6"
  },
  {
    "id": "coord-al2o3-naoh-amphoteric",
    "name": "Amphoteric dissolution of aluminum oxide in caustic soda",
    "reactants": [
      "al2o3",
      "naoh",
      "water"
    ],
    "products": [
      "na-al-oh-4"
    ],
    "enthalpy": -80,
    "desc": "Caustic digestion of bauxite alumina yielding sodium tetrahydroxoaluminate.",
    "type": "complexation",
    "effects": [],
    "net": "Al2O3 + 2 NaOH + 3 H2O → 2 Na[Al(OH)4]"
  },
  {
    "id": "coord-al-oh-amphoteric-koh",
    "name": "Amphoteric dissolution of aluminum hydroxide in caustic potash",
    "reactants": [
      "al-oh-3",
      "koh"
    ],
    "products": [
      "k-alo2",
      "water"
    ],
    "enthalpy": -32,
    "desc": "Potassium hydroxide dissolution forming potassium aluminate.",
    "type": "complexation",
    "effects": [],
    "net": "Al(OH)3 + KOH → KAlO2 + 2 H2O"
  },
  {
    "id": "coord-na-al-oh4-h2so4-neutralize",
    "name": "Controlled sulfuric acid precipitation of aluminum hydroxide from aluminate",
    "reactants": [
      "na-al-oh-4",
      "h2so4"
    ],
    "products": [
      "al-oh-3",
      "na2so4",
      "water"
    ],
    "enthalpy": -64,
    "desc": "Careful neutralization reprecipitating white gelatinous aluminum hydroxide.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Gelatinous white aluminum hydroxide precipitates"
      }
    ],
    "net": "2 Na[Al(OH)4] + H2SO4 → 2 Al(OH)3 + Na2SO4 + 2 H2O"
  },
  {
    "id": "coord-na-al-oh4-co2-bayer",
    "name": "Bayer process carbonation: precipitation of pure gibbsite by carbon dioxide",
    "reactants": [
      "na-al-oh-4",
      "co2"
    ],
    "products": [
      "al-oh-3",
      "nahco3"
    ],
    "enthalpy": -45,
    "desc": "Industrial carbonation of pregnant aluminate liquor precipitating high-purity Al(OH)3.",
    "type": "complexation",
    "effects": [],
    "net": "Na[Al(OH)4] + CO2 → Al(OH)3 + NaHCO3"
  },
  {
    "id": "coord-zno-naoh-amphoteric",
    "name": "Amphoteric dissolution of zinc oxide in caustic soda forming tetrahydroxozincate",
    "reactants": [
      "zno",
      "naoh",
      "water"
    ],
    "products": [
      "na2-zn-oh-4"
    ],
    "enthalpy": -42,
    "desc": "Excess caustic soda dissolves zinc oxide into clear soluble sodium tetrahydroxozincate.",
    "type": "complexation",
    "effects": [],
    "net": "ZnO + 2 NaOH + H2O → Na2[Zn(OH)4]"
  },
  {
    "id": "coord-na2-zn-oh4-h2so4-neutralize",
    "name": "Sulfuric acid precipitation of zinc hydroxide from tetrahydroxozincate complex",
    "reactants": [
      "na2-zn-oh-4",
      "h2so4"
    ],
    "products": [
      "znoh2",
      "na2so4",
      "water"
    ],
    "enthalpy": -70,
    "desc": "Equimolar neutralization reprecipitating white gelatinous zinc hydroxide.",
    "type": "precipitation",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "White zinc hydroxide precipitates"
      }
    ],
    "net": "Na2[Zn(OH)4] + H2SO4 → Zn(OH)2 + Na2SO4 + 2 H2O"
  },
  {
    "id": "coord-pbo-naoh-amphoteric",
    "name": "Amphoteric dissolution of lead(II) oxide in caustic soda",
    "reactants": [
      "pbo",
      "naoh",
      "water"
    ],
    "products": [
      "na2-pb-oh-4"
    ],
    "enthalpy": -36,
    "desc": "Formation of soluble plumbite / tetrahydroxoplumbate(II) coordination complex.",
    "type": "complexation",
    "effects": [],
    "net": "PbO + 2 NaOH + H2O → Na2[Pb(OH)4]"
  },
  {
    "id": "coord-na2-pb-oh4-hno3-neutralize",
    "name": "Controlled nitric acid neutralization of plumbite complex reprecipitating lead(II) hydroxide",
    "reactants": [
      "na2-pb-oh-4",
      "hno3"
    ],
    "products": [
      "pb-oh-2",
      "nano3",
      "water"
    ],
    "enthalpy": -60,
    "desc": "Neutralization regenerating white lead(II) hydroxide precipitate.",
    "type": "complexation",
    "effects": [],
    "net": "Na2[Pb(OH)4] + 2 HNO3 → Pb(OH)2 + 2 NaNO3 + 2 H2O"
  },
  {
    "id": "coord-sno-naoh-amphoteric",
    "name": "Amphoteric dissolution of tin(II) oxide forming sodium trihydroxostannate(II)",
    "reactants": [
      "sno",
      "naoh",
      "water"
    ],
    "products": [
      "na-sn-oh-3"
    ],
    "enthalpy": -38,
    "desc": "Dissolution of tin(II) oxide into alkaline stannite reducing agent.",
    "type": "complexation",
    "effects": [],
    "net": "SnO + NaOH + H2O → Na[Sn(OH)3]"
  }
];

  for (const r of reactions) {
    addReaction({
      id: r.id,
      name: r.name,
      reactionType: (r.type || "complexation") as any,
      reactants: r.reactants,
      products: r.products,
      netIonicEquation: r.net,
      enthalpyKjPerMol: r.enthalpy,
      observableEffects: (r.effects || []) as any,
      safetyNotes: r.desc,
    });
  }
}
