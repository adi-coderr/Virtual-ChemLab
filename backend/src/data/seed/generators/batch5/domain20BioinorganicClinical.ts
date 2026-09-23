import { addReaction } from "./generateBatch5.js";

export function buildDomain20BioinorganicClinical(): void {
  // Domain 20: Exactly 110 Bioinorganic, Clinical & Qualitative Analytical Reactions
  const reactions = [
    {
        "id": "bio-dmg-nicl2-ammonia",
        "name": "Nickel detection in ammoniacal solution by dimethylglyoxime",
        "reactants": [
            "nicl2",
            "c4h8n2o2_dmg",
            "ammonia"
        ],
        "products": [
            "ni_dmg2",
            "ammonium-chloride"
        ],
        "enthalpy": -85,
        "desc": "Formation of bright strawberry-red needle-like precipitate of nickel dimethylglyoximate.",
        "net": "NiCl2 + 2 C4H8N2O2 + 2 NH3 → NiC8H14N4O4 + 2 NH4Cl"
    },
    {
        "id": "bio-dmg-niso4-ammonia",
        "name": "Gravimetric nickel sulfate precipitation with dimethylglyoxime",
        "reactants": [
            "niso4",
            "c4h8n2o2_dmg",
            "ammonia"
        ],
        "products": [
            "ni_dmg2",
            "nh4-2-so4"
        ],
        "enthalpy": -88,
        "desc": "Standard gravimetric analytical assay for quantitative nickel determination.",
        "net": "NiSO4 + 2 C4H8N2O2 + 2 NH3 → NiC8H14N4O4 + (NH4)2SO4"
    },
    {
        "id": "bio-dmg-ni-no3-2-ammonia",
        "name": "Nickel nitrate precipitation by dimethylglyoxime",
        "reactants": [
            "ni-no3-2",
            "c4h8n2o2_dmg",
            "ammonia"
        ],
        "products": [
            "ni_dmg2",
            "nh4no3"
        ],
        "enthalpy": -86,
        "desc": "Selective precipitation of nickel from mixed transition metal nitrate solutions.",
        "net": "Ni(NO3)2 + 2 C4H8N2O2 + 2 NH3 → NiC8H14N4O4 + 2 NH4NO3"
    },
    {
        "id": "bio-dmg-nibr2-ammonia",
        "name": "Nickel bromide complexation with dimethylglyoxime",
        "reactants": [
            "nibr2",
            "c4h8n2o2_dmg",
            "ammonia"
        ],
        "products": [
            "ni_dmg2",
            "nh4br"
        ],
        "enthalpy": -84,
        "desc": "Precipitation of insoluble red bis(dimethylglyoximato)nickel(II).",
        "net": "NiBr2 + 2 C4H8N2O2 + 2 NH3 → NiC8H14N4O4 + 2 NH4Br"
    },
    {
        "id": "bio-dmg-nii2-ammonia",
        "name": "Nickel iodide reaction with dimethylglyoxime",
        "reactants": [
            "nii2",
            "c4h8n2o2_dmg",
            "ammonia"
        ],
        "products": [
            "ni_dmg2",
            "nh4i"
        ],
        "enthalpy": -82,
        "desc": "Selective qualitative spot test for nickel in presence of iodide.",
        "net": "NiI2 + 2 C4H8N2O2 + 2 NH3 → NiC8H14N4O4 + 2 NH4I"
    },
    {
        "id": "bio-dmg-nicl2-naoh",
        "name": "Sodium hydroxide buffered DMG nickel precipitation",
        "reactants": [
            "nicl2",
            "c4h8n2o2_dmg",
            "naoh"
        ],
        "products": [
            "ni_dmg2",
            "nacl",
            "water"
        ],
        "enthalpy": -95,
        "desc": "Alkaline precipitation of scarlet nickel chelate.",
        "net": "NiCl2 + 2 C4H8N2O2 + 2 NaOH → NiC8H14N4O4 + 2 NaCl + 2 H2O"
    },
    {
        "id": "bio-dmg-niso4-naoh",
        "name": "Caustic soda buffered nickel sulfate DMG precipitation",
        "reactants": [
            "niso4",
            "c4h8n2o2_dmg",
            "naoh"
        ],
        "products": [
            "ni_dmg2",
            "na2so4",
            "water"
        ],
        "enthalpy": -98,
        "desc": "Industrial effluent nickel removal via DMG chelation.",
        "net": "NiSO4 + 2 C4H8N2O2 + 2 NaOH → NiC8H14N4O4 + Na2SO4 + 2 H2O"
    },
    {
        "id": "bio-dmg-ni-no3-2-naoh",
        "name": "Sodium hydroxide mediated nickel nitrate DMG precipitation",
        "reactants": [
            "ni-no3-2",
            "c4h8n2o2_dmg",
            "naoh"
        ],
        "products": [
            "ni_dmg2",
            "nano3",
            "water"
        ],
        "enthalpy": -96,
        "desc": "Gravimetric nickel assay in caustic medium.",
        "net": "Ni(NO3)2 + 2 C4H8N2O2 + 2 NaOH → NiC8H14N4O4 + 2 NaNO3 + 2 H2O"
    },
    {
        "id": "bio-dmg-dissolution-hcl",
        "name": "Acidic decomposition of nickel dimethylglyoximate",
        "reactants": [
            "ni_dmg2",
            "hcl"
        ],
        "products": [
            "nicl2",
            "c4h8n2o2_dmg"
        ],
        "enthalpy": 45,
        "desc": "Dissolution of red precipitate in strong mineral acid regenerating green nickel ions.",
        "net": "NiC8H14N4O4 + 2 HCl → NiCl2 + 2 C4H8N2O2"
    },
    {
        "id": "bio-dmg-dissolution-h2so4",
        "name": "Sulfuric acid dissolution of nickel dimethylglyoximate",
        "reactants": [
            "ni_dmg2",
            "h2so4"
        ],
        "products": [
            "niso4",
            "c4h8n2o2_dmg"
        ],
        "enthalpy": 48,
        "desc": "Acid digestion of gravimetric nickel precipitate.",
        "net": "NiC8H14N4O4 + H2SO4 → NiSO4 + 2 C4H8N2O2"
    },
    {
        "id": "bio-dmg-dissolution-hno3",
        "name": "Nitric acid dissolution and destruction of nickel DMG complex",
        "reactants": [
            "ni_dmg2",
            "hno3"
        ],
        "products": [
            "ni-no3-2",
            "c4h8n2o2_dmg"
        ],
        "enthalpy": 50,
        "desc": "Oxidative dissolution of nickel complex in nitric acid.",
        "net": "NiC8H14N4O4 + 2 HNO3 → Ni(NO3)2 + 2 C4H8N2O2"
    },
    {
        "id": "bio-biuret-cu-sulfate-naoh",
        "name": "Biuret test for peptide linkages with copper(II) sulfate",
        "reactants": [
            "c2h5n3o2_biuret",
            "cuso4",
            "naoh"
        ],
        "products": [
            "cu_biuret_complex",
            "na2so4",
            "water"
        ],
        "enthalpy": -65,
        "desc": "Diagnostic colorimetric formation of deep violet copper-biuret coordination complex.",
        "net": "2 C2H5N3O2 + CuSO4 + 2 NaOH → CuC4H8N6O4 + Na2SO4 + 2 H2O"
    },
    {
        "id": "bio-biuret-cu-chloride-naoh",
        "name": "Biuret peptide bond reaction with copper(II) chloride",
        "reactants": [
            "c2h5n3o2_biuret",
            "cucl2",
            "naoh"
        ],
        "products": [
            "cu_biuret_complex",
            "nacl",
            "water"
        ],
        "enthalpy": -62,
        "desc": "Clinical photometric total protein quantification reaction.",
        "net": "2 C2H5N3O2 + CuCl2 + 2 NaOH → CuC4H8N6O4 + 2 NaCl + 2 H2O"
    },
    {
        "id": "bio-biuret-cu-nitrate-naoh",
        "name": "Biuret test with copper(II) nitrate",
        "reactants": [
            "c2h5n3o2_biuret",
            "cuno32",
            "naoh"
        ],
        "products": [
            "cu_biuret_complex",
            "nano3",
            "water"
        ],
        "enthalpy": -64,
        "desc": "Chelation of cupric ions by deprotonated peptide nitrogen atoms.",
        "net": "2 C2H5N3O2 + Cu(NO3)2 + 2 NaOH → CuC4H8N6O4 + 2 NaNO3 + 2 H2O"
    },
    {
        "id": "bio-biuret-cu-sulfate-koh",
        "name": "Potassium hydroxide biuret test",
        "reactants": [
            "c2h5n3o2_biuret",
            "cuso4",
            "koh"
        ],
        "products": [
            "cu_biuret_complex",
            "k2so4",
            "water"
        ],
        "enthalpy": -66,
        "desc": "Alkaline peptide coordination producing intense purple hue.",
        "net": "2 C2H5N3O2 + CuSO4 + 2 KOH → CuC4H8N6O4 + K2SO4 + 2 H2O"
    },
    {
        "id": "bio-biuret-cu-chloride-koh",
        "name": "Biuret complexation in potassium hydroxide",
        "reactants": [
            "c2h5n3o2_biuret",
            "cucl2",
            "koh"
        ],
        "products": [
            "cu_biuret_complex",
            "kcl",
            "water"
        ],
        "enthalpy": -63,
        "desc": "Formation of square-planar purple copper(II) tetra-coordinate chelate.",
        "net": "2 C2H5N3O2 + CuCl2 + 2 KOH → CuC4H8N6O4 + 2 KCl + 2 H2O"
    },
    {
        "id": "bio-biuret-cu-nitrate-koh",
        "name": "Biuret coordination in potassic medium",
        "reactants": [
            "c2h5n3o2_biuret",
            "cuno32",
            "koh"
        ],
        "products": [
            "cu_biuret_complex",
            "kno3",
            "water"
        ],
        "enthalpy": -65,
        "desc": "Violet chromophore formation in serum total protein analysis.",
        "net": "2 C2H5N3O2 + Cu(NO3)2 + 2 KOH → CuC4H8N6O4 + 2 KNO3 + 2 H2O"
    },
    {
        "id": "bio-biuret-complex-acid-hcl",
        "name": "Acid demetallation of copper-biuret complex",
        "reactants": [
            "cu_biuret_complex",
            "hcl"
        ],
        "products": [
            "cucl2",
            "c2h5n3o2_biuret"
        ],
        "enthalpy": 35,
        "desc": "Reversible bleaching of violet color upon acidification.",
        "net": "CuC4H8N6O4 + 2 HCl → CuCl2 + 2 C2H5N3O2"
    },
    {
        "id": "bio-biuret-complex-acid-h2so4",
        "name": "Sulfuric acid destruction of copper-biuret complex",
        "reactants": [
            "cu_biuret_complex",
            "h2so4"
        ],
        "products": [
            "cuso4",
            "c2h5n3o2_biuret"
        ],
        "enthalpy": 38,
        "desc": "Acid dissociation of peptide copper complex.",
        "net": "CuC4H8N6O4 + H2SO4 → CuSO4 + 2 C2H5N3O2"
    },
    {
        "id": "bio-biuret-complex-acid-hno3",
        "name": "Nitric acid cleaving of copper-biuret complex",
        "reactants": [
            "cu_biuret_complex",
            "hno3"
        ],
        "products": [
            "cuno32",
            "c2h5n3o2_biuret"
        ],
        "enthalpy": 40,
        "desc": "Decomplexation restoring pale blue cupric ions.",
        "net": "CuC4H8N6O4 + 2 HNO3 → Cu(NO3)2 + 2 C2H5N3O2"
    },
    {
        "id": "bio-biuret-alkaline-hydrolysis-naoh",
        "name": "Caustic cleavage of biuret into sodium carbonate and ammonia",
        "reactants": [
            "c2h5n3o2_biuret",
            "naoh"
        ],
        "products": [
            "na2co3",
            "ammonia"
        ],
        "enthalpy": -75,
        "desc": "Alkaline degradation of biuret liberating gaseous ammonia.",
        "net": "C2H5N3O2 + 4 NaOH → 2 Na2CO3 + 3 NH3"
    },
    {
        "id": "bio-biuret-alkaline-hydrolysis-koh",
        "name": "Potassium hydroxide degradation of biuret",
        "reactants": [
            "c2h5n3o2_biuret",
            "koh"
        ],
        "products": [
            "k2co3",
            "ammonia"
        ],
        "enthalpy": -78,
        "desc": "Complete alkaline digestion of urea condensation products.",
        "net": "C2H5N3O2 + 4 KOH → 2 K2CO3 + 3 NH3"
    },
    {
        "id": "bio-nessler-nh3-koh",
        "name": "Nessler test for free ammonia with potassium hydroxide",
        "reactants": [
            "k2hgi4_nessler",
            "ammonia",
            "koh"
        ],
        "products": [
            "nh2hg2io_millon",
            "ki",
            "water"
        ],
        "enthalpy": -110,
        "desc": "Instantaneous development of yellow-orange color or brown precipitate of iodide of Millon base.",
        "net": "2 K2HgI4 + NH3 + 3 KOH → Hg2NIOH2 + 7 KI + 2 H2O"
    },
    {
        "id": "bio-nessler-nh4cl-koh",
        "name": "Nessler qualitative detection of ammonium chloride",
        "reactants": [
            "k2hgi4_nessler",
            "ammonium-chloride",
            "koh"
        ],
        "products": [
            "nh2hg2io_millon",
            "ki",
            "kcl",
            "water"
        ],
        "enthalpy": -115,
        "desc": "Clinical urine ammonia photometric detection.",
        "net": "2 K2HgI4 + NH4Cl + 4 KOH → Hg2NIOH2 + 7 KI + KCl + 3 H2O"
    },
    {
        "id": "bio-nessler-nh4no3-koh",
        "name": "Nessler reaction with ammonium nitrate",
        "reactants": [
            "k2hgi4_nessler",
            "nh4no3",
            "koh"
        ],
        "products": [
            "nh2hg2io_millon",
            "ki",
            "kno3",
            "water"
        ],
        "enthalpy": -112,
        "desc": "Trace ammonium quantification in environmental water samples.",
        "net": "2 K2HgI4 + NH4NO3 + 4 KOH → Hg2NIOH2 + 7 KI + KNO3 + 3 H2O"
    },
    {
        "id": "bio-nessler-nh42so4-koh",
        "name": "Nessler determination of ammonium sulfate fertilizer",
        "reactants": [
            "k2hgi4_nessler",
            "nh4-2-so4",
            "koh"
        ],
        "products": [
            "nh2hg2io_millon",
            "ki",
            "k2so4",
            "water"
        ],
        "enthalpy": -118,
        "desc": "Micro-Kjeldahl distillate ammonium confirmation.",
        "net": "4 K2HgI4 + (NH4)2SO4 + 8 KOH → 2 Hg2NIOH2 + 14 KI + K2SO4 + 6 H2O"
    },
    {
        "id": "bio-nessler-nh4br-koh",
        "name": "Nessler reaction with ammonium bromide",
        "reactants": [
            "k2hgi4_nessler",
            "nh4br",
            "koh"
        ],
        "products": [
            "nh2hg2io_millon",
            "ki",
            "kbr",
            "water"
        ],
        "enthalpy": -114,
        "desc": "Precipitation of brown condensation product of Millon base.",
        "net": "2 K2HgI4 + NH4Br + 4 KOH → Hg2NIOH2 + 7 KI + KBr + 3 H2O"
    },
    {
        "id": "bio-nessler-nh3-naoh",
        "name": "Nessler test in sodium hydroxide medium",
        "reactants": [
            "k2hgi4_nessler",
            "ammonia",
            "naoh"
        ],
        "products": [
            "nh2hg2io_millon",
            "ki",
            "nai",
            "water"
        ],
        "enthalpy": -108,
        "desc": "Colorimetric ammonia assay using caustic soda buffer.",
        "net": "2 K2HgI4 + NH3 + 3 NaOH → Hg2NIOH2 + 4 KI + 3 NaI + 2 H2O"
    },
    {
        "id": "bio-nessler-nh4cl-naoh",
        "name": "Detection of ammonium chloride in sodium hydroxide",
        "reactants": [
            "k2hgi4_nessler",
            "ammonium-chloride",
            "naoh"
        ],
        "products": [
            "nh2hg2io_millon",
            "ki",
            "nacl",
            "nai",
            "water"
        ],
        "enthalpy": -112,
        "desc": "Rapid clinical spot test for azotemia and uremic metabolites.",
        "net": "2 K2HgI4 + NH4Cl + 4 NaOH → Hg2NIOH2 + 4 KI + NaCl + 3 NaI + 3 H2O"
    },
    {
        "id": "bio-nessler-nh4no3-naoh",
        "name": "Detection of ammonium nitrate in sodium hydroxide",
        "reactants": [
            "k2hgi4_nessler",
            "nh4no3",
            "naoh"
        ],
        "products": [
            "nh2hg2io_millon",
            "ki",
            "nano3",
            "nai",
            "water"
        ],
        "enthalpy": -110,
        "desc": "Spectrophotometric detection of trace nitrogen.",
        "net": "2 K2HgI4 + NH4NO3 + 4 NaOH → Hg2NIOH2 + 4 KI + NaNO3 + 3 NaI + 3 H2O"
    },
    {
        "id": "bio-nessler-synthesis-hgi2",
        "name": "Preparation of Nessler reagent from mercury(II) iodide",
        "reactants": [
            "hgi2",
            "ki"
        ],
        "products": [
            "k2hgi4_nessler"
        ],
        "enthalpy": -42,
        "desc": "Dissolution of red mercury iodide into soluble yellow potassium tetraiodomercurate(II).",
        "net": "HgI2 + 2 KI → K2HgI4"
    },
    {
        "id": "bio-nessler-synthesis-hgcl2",
        "name": "Synthesis of Nessler reagent from mercury(II) chloride",
        "reactants": [
            "hgcl2",
            "ki"
        ],
        "products": [
            "k2hgi4_nessler",
            "kcl"
        ],
        "enthalpy": -75,
        "desc": "Direct stoichiometric formulation of Nessler analytical reagent.",
        "net": "HgCl2 + 4 KI → K2HgI4 + 2 KCl"
    },
    {
        "id": "bio-nessler-silver-precipitation",
        "name": "Silver precipitation of Nessler complex",
        "reactants": [
            "k2hgi4_nessler",
            "agno3"
        ],
        "products": [
            "agi",
            "kno3",
            "hgi2"
        ],
        "enthalpy": -125,
        "desc": "Precipitation of pale yellow silver iodide and red mercury(II) iodide.",
        "net": "K2HgI4 + 2 AgNO3 → 2 AgI + 2 KNO3 + HgI2"
    },
    {
        "id": "bio-prussian-fecl3-k4fecn6",
        "name": "Prussian blue synthesis from ferric chloride and potassium ferrocyanide",
        "reactants": [
            "k4fe_cn6",
            "fecl3"
        ],
        "products": [
            "fe4_fecn6_3",
            "kcl"
        ],
        "enthalpy": -310,
        "desc": "Historic Perls Prussian blue qualitative histological stain for ferric hemosiderin iron.",
        "net": "3 K4FeC6N6 + 4 FeCl3 → Fe7C18N18 + 12 KCl"
    },
    {
        "id": "bio-prussian-feno33-k4fecn6",
        "name": "Prussian blue formation from iron(III) nitrate",
        "reactants": [
            "k4fe_cn6",
            "fe-no3-3"
        ],
        "products": [
            "fe4_fecn6_3",
            "kno3"
        ],
        "enthalpy": -315,
        "desc": "Precipitation of insoluble dark blue ferric hexacyanoferrate.",
        "net": "3 K4FeC6N6 + 4 Fe(NO3)3 → Fe7C18N18 + 12 KNO3"
    },
    {
        "id": "bio-prussian-fe2so43-k4fecn6",
        "name": "Prussian blue synthesis from ferric sulfate",
        "reactants": [
            "k4fe_cn6",
            "fe2-so4-3"
        ],
        "products": [
            "fe4_fecn6_3",
            "k2so4"
        ],
        "enthalpy": -320,
        "desc": "Insoluble blue antidote pigment synthesized to bind radioactive cesium and thallium.",
        "net": "3 K4FeC6N6 + 2 Fe2(SO4)3 → Fe7C18N18 + 6 K2SO4"
    },
    {
        "id": "bio-prussian-decomposition-koh",
        "name": "Alkaline destruction of Prussian blue by potassium hydroxide",
        "reactants": [
            "fe4_fecn6_3",
            "koh"
        ],
        "products": [
            "feoh3",
            "k4fe_cn6"
        ],
        "enthalpy": 85,
        "desc": "Decolorization of intense blue pigment leaving brown rust-like ferric hydroxide.",
        "net": "Fe7C18N18 + 12 KOH → 4 Fe(OH)3 + 3 K4FeC6N6"
    },
    {
        "id": "bio-prussian-oxidation-cl2",
        "name": "Oxidation of potassium ferrocyanide by chlorine",
        "reactants": [
            "k4fe_cn6",
            "cl2"
        ],
        "products": [
            "k3fe_cn6",
            "kcl"
        ],
        "enthalpy": -140,
        "desc": "Industrial conversion of yellow ferrocyanide to ruby-red potassium ferricyanide.",
        "net": "2 K4FeC6N6 + Cl2 → 2 K3FeC6N6 + 2 KCl"
    },
    {
        "id": "bio-prussian-oxidation-br2",
        "name": "Bromine oxidation of potassium ferrocyanide",
        "reactants": [
            "k4fe_cn6",
            "br2"
        ],
        "products": [
            "k3fe_cn6",
            "kbr"
        ],
        "enthalpy": -115,
        "desc": "Conversion of iron(II) complex to iron(III) ferricyanide.",
        "net": "2 K4FeC6N6 + Br2 → 2 K3FeC6N6 + 2 KBr"
    },
    {
        "id": "bio-prussian-oxidation-peroxide",
        "name": "Hydrogen peroxide oxidation of ferrocyanide in acidic medium",
        "reactants": [
            "k4fe_cn6",
            "h2o2",
            "hcl"
        ],
        "products": [
            "k3fe_cn6",
            "kcl",
            "water"
        ],
        "enthalpy": -185,
        "desc": "Catalytic peroxidase-coupled oxidation of hexacyanoferrate.",
        "net": "2 K4FeC6N6 + H2O2 + 2 HCl → 2 K3FeC6N6 + 2 KCl + 2 H2O"
    },
    {
        "id": "bio-prussian-oxidation-permanganate",
        "name": "Permanganometric oxidation of potassium ferrocyanide",
        "reactants": [
            "k4fe_cn6",
            "kmno4",
            "h2so4"
        ],
        "products": [
            "k3fe_cn6",
            "mnso4",
            "k2so4",
            "water"
        ],
        "enthalpy": -340,
        "desc": "Standard analytical redox titration of hexacyanoferrate(II).",
        "net": "5 K4FeC6N6 + KMnO4 + 4 H2SO4 → 5 K3FeC6N6 + MnSO4 + 3 K2SO4 + 4 H2O"
    },
    {
        "id": "bio-prussian-reduction-iodide",
        "name": "Iodometric reduction of potassium ferricyanide",
        "reactants": [
            "k3fe_cn6",
            "ki"
        ],
        "products": [
            "k4fe_cn6",
            "i2"
        ],
        "enthalpy": 48,
        "desc": "Quantitative determination of ferricyanide by liberated iodine titration.",
        "net": "2 K3FeC6N6 + 2 KI → 2 K4FeC6N6 + I2"
    },
    {
        "id": "bio-prussian-reduction-feso4",
        "name": "Ferrous sulfate reduction of ferricyanide (Turnbull blue precursor)",
        "reactants": [
            "k3fe_cn6",
            "feso4",
            "k2so4"
        ],
        "products": [
            "k4fe_cn6",
            "fe2-so4-3"
        ],
        "enthalpy": -45,
        "desc": "Redox equilibrium between hexacyanoferrate and iron ions.",
        "net": "2 K3FeC6N6 + 2 FeSO4 + K2SO4 → 2 K4FeC6N6 + Fe2(SO4)3"
    },
    {
        "id": "bio-prussian-alkaline-ferrocyanide-feoh3",
        "name": "Colloidal synthesis of ferrocyanide from ferric hydroxide and Prussian blue",
        "reactants": [
            "feoh3",
            "k4fe_cn6"
        ],
        "products": [
            "fe4_fecn6_3",
            "koh"
        ],
        "enthalpy": -85,
        "desc": "Reversible colloid equilibrium between Prussian blue and iron oxide hydrate.",
        "net": "4 Fe(OH)3 + 3 K4FeC6N6 → Fe7C18N18 + 12 KOH"
    },
    {
        "id": "bio-hq-silver-reduction",
        "name": "Photographic and histological reduction of silver nitrate by hydroquinone",
        "reactants": [
            "c6h6o2_hydroquinone",
            "agno3"
        ],
        "products": [
            "c6h4o2_benzoquinone",
            "ag",
            "hno3"
        ],
        "enthalpy": -135,
        "desc": "Bielschowsky silver stain mechanism reducing ionic silver to black metallic silver grains.",
        "net": "C6H6O2 + 2 AgNO3 → C6H4O2 + 2 Ag + 2 HNO3"
    },
    {
        "id": "bio-hq-fecl3-oxidation",
        "name": "Ferric chloride colorimetric oxidation of hydroquinone",
        "reactants": [
            "c6h6o2_hydroquinone",
            "fecl3"
        ],
        "products": [
            "c6h4o2_benzoquinone",
            "fecl2",
            "hcl"
        ],
        "enthalpy": -65,
        "desc": "Diagnostic phenolic oxidation by iron(III) chloride.",
        "net": "C6H6O2 + 2 FeCl3 → C6H4O2 + 2 FeCl2 + 2 HCl"
    },
    {
        "id": "bio-hq-fe2so43-oxidation",
        "name": "Ferric sulfate oxidation of hydroquinone",
        "reactants": [
            "c6h6o2_hydroquinone",
            "fe2-so4-3"
        ],
        "products": [
            "c6h4o2_benzoquinone",
            "feso4",
            "h2so4"
        ],
        "enthalpy": -68,
        "desc": "Mitochondrial electron transport chain model reaction.",
        "net": "C6H6O2 + Fe2(SO4)3 → C6H4O2 + 2 FeSO4 + H2SO4"
    },
    {
        "id": "bio-hq-peroxide-peroxidase",
        "name": "Peroxidase-catalyzed oxidation of hydroquinone to benzoquinone",
        "reactants": [
            "c6h6o2_hydroquinone",
            "h2o2"
        ],
        "products": [
            "c6h4o2_benzoquinone",
            "water"
        ],
        "enthalpy": -175,
        "desc": "Biomimetic defense secretion of bombardier beetles.",
        "net": "C6H6O2 + H2O2 → C6H4O2 + 2 H2O"
    },
    {
        "id": "bio-hq-permanganate-titration",
        "name": "Permanganate titration of hydroquinone",
        "reactants": [
            "c6h6o2_hydroquinone",
            "kmno4",
            "h2so4"
        ],
        "products": [
            "c6h4o2_benzoquinone",
            "mnso4",
            "k2so4",
            "water"
        ],
        "enthalpy": -420,
        "desc": "Volumetric determination of dihydroxybenzene antioxidants.",
        "net": "5 C6H6O2 + 2 KMnO4 + 3 H2SO4 → 5 C6H4O2 + 2 MnSO4 + K2SO4 + 8 H2O"
    },
    {
        "id": "bio-hq-dichromate-oxidation",
        "name": "Chromic acid oxidation of hydroquinone to 1,4-benzoquinone",
        "reactants": [
            "c6h6o2_hydroquinone",
            "k2cr2o7",
            "h2so4"
        ],
        "products": [
            "c6h4o2_benzoquinone",
            "cr2-so4-3",
            "k2so4",
            "water"
        ],
        "enthalpy": -380,
        "desc": "Classic organic synthesis of golden-yellow crystalline p-benzoquinone.",
        "net": "3 C6H6O2 + K2Cr2O7 + 4 H2SO4 → 3 C6H4O2 + Cr2(SO4)3 + K2SO4 + 7 H2O"
    },
    {
        "id": "bio-hq-iodine-titration",
        "name": "Iodometric oxidation of hydroquinone",
        "reactants": [
            "c6h6o2_hydroquinone",
            "i2"
        ],
        "products": [
            "c6h4o2_benzoquinone",
            "hi"
        ],
        "enthalpy": -42,
        "desc": "Equilibrium redox titration of photographic developer solution.",
        "net": "C6H6O2 + I2 → C6H4O2 + 2 HI"
    },
    {
        "id": "bio-hq-bromine-oxidation",
        "name": "Bromine oxidation of hydroquinone",
        "reactants": [
            "c6h6o2_hydroquinone",
            "br2"
        ],
        "products": [
            "c6h4o2_benzoquinone",
            "hbr"
        ],
        "enthalpy": -95,
        "desc": "Rapid halogen oxidation generating 1,4-benzoquinone.",
        "net": "C6H6O2 + Br2 → C6H4O2 + 2 HBr"
    },
    {
        "id": "bio-hq-chlorine-oxidation",
        "name": "Chlorine oxidation of hydroquinone",
        "reactants": [
            "c6h6o2_hydroquinone",
            "cl2"
        ],
        "products": [
            "c6h4o2_benzoquinone",
            "hcl"
        ],
        "enthalpy": -145,
        "desc": "Oxidative dehydrogenation of dihydroxybenzene.",
        "net": "C6H6O2 + Cl2 → C6H4O2 + 2 HCl"
    },
    {
        "id": "bio-bq-sulfite-reduction",
        "name": "Antioxidant sulfite reduction of benzoquinone back to hydroquinone",
        "reactants": [
            "c6h4o2_benzoquinone",
            "so2",
            "water"
        ],
        "products": [
            "c6h6o2_hydroquinone",
            "h2so4"
        ],
        "enthalpy": -120,
        "desc": "Photographic preservative mechanism of sulfite preventing quinone developer oxidation.",
        "net": "C6H4O2 + SO2 + 2 H2O → C6H6O2 + H2SO4"
    },
    {
        "id": "bio-bq-sulfide-reduction",
        "name": "Hydrogen sulfide reduction of p-benzoquinone",
        "reactants": [
            "c6h4o2_benzoquinone",
            "h2s"
        ],
        "products": [
            "c6h6o2_hydroquinone",
            "s"
        ],
        "enthalpy": -85,
        "desc": "Reduction of quinoid chromophore precipitating elemental sulfur.",
        "net": "C6H4O2 + H2S → C6H6O2 + S"
    },
    {
        "id": "bio-sugar-glucose-fehling-cucl2-naoh",
        "name": "Fehling qualitative test for D-glucose with copper(II) chloride",
        "reactants": [
            "c6h12o6",
            "cucl2",
            "naoh"
        ],
        "products": [
            "cu2o",
            "nacl",
            "co2",
            "water"
        ],
        "enthalpy": -3850,
        "desc": "Reduction of alkaline cupric tartrate to insoluble brick-red copper(I) oxide.",
        "net": "C6H12O6 + 24 CuCl2 + 48 NaOH → 12 Cu2O + 48 NaCl + 6 CO2 + 30 H2O"
    },
    {
        "id": "bio-sugar-glucose-fehling-cuso4-naoh",
        "name": "Benedict/Fehling test for D-glucose with copper(II) sulfate",
        "reactants": [
            "c6h12o6",
            "cuso4",
            "naoh"
        ],
        "products": [
            "cu2o",
            "na2so4",
            "co2",
            "water"
        ],
        "enthalpy": -3880,
        "desc": "Semiquantitative clinical test for glycosuria in diabetes mellitus.",
        "net": "C6H12O6 + 24 CuSO4 + 48 NaOH → 12 Cu2O + 24 Na2SO4 + 6 CO2 + 30 H2O"
    },
    {
        "id": "bio-sugar-glucose-fehling-cucl2-koh",
        "name": "Potassium hydroxide buffered Fehling test for D-glucose",
        "reactants": [
            "c6h12o6",
            "cucl2",
            "koh"
        ],
        "products": [
            "cu2o",
            "kcl",
            "co2",
            "water"
        ],
        "enthalpy": -3860,
        "desc": "Alkaline enediol oxidation of reducing aldose sugars.",
        "net": "C6H12O6 + 24 CuCl2 + 48 KOH → 12 Cu2O + 48 KCl + 6 CO2 + 30 H2O"
    },
    {
        "id": "bio-sugar-glucose-fehling-cuso4-koh",
        "name": "Fehling test for D-glucose using caustic potash",
        "reactants": [
            "c6h12o6",
            "cuso4",
            "koh"
        ],
        "products": [
            "cu2o",
            "k2so4",
            "co2",
            "water"
        ],
        "enthalpy": -3890,
        "desc": "Precipitation of cuprous oxide with simultaneous glucose oxidation.",
        "net": "C6H12O6 + 24 CuSO4 + 48 KOH → 12 Cu2O + 24 K2SO4 + 6 CO2 + 30 H2O"
    },
    {
        "id": "bio-sugar-fructose-fehling-cucl2-naoh",
        "name": "Fehling test for D-fructose ketose sugar",
        "reactants": [
            "c6h12o6_fructose",
            "cucl2",
            "naoh"
        ],
        "products": [
            "cu2o",
            "nacl",
            "co2",
            "water"
        ],
        "enthalpy": -3840,
        "desc": "Base-catalyzed Lobry de Bruyn-Alberda van Ekenstein rearrangement reducing copper(II).",
        "net": "C6H12O6 + 24 CuCl2 + 48 NaOH → 12 Cu2O + 48 NaCl + 6 CO2 + 30 H2O"
    },
    {
        "id": "bio-sugar-fructose-fehling-cuso4-naoh",
        "name": "Benedict test for D-fructose in caustic soda",
        "reactants": [
            "c6h12o6_fructose",
            "cuso4",
            "naoh"
        ],
        "products": [
            "cu2o",
            "na2so4",
            "co2",
            "water"
        ],
        "enthalpy": -3870,
        "desc": "Formation of diagnostic red cuprous oxide precipitate.",
        "net": "C6H12O6 + 24 CuSO4 + 48 NaOH → 12 Cu2O + 24 Na2SO4 + 6 CO2 + 30 H2O"
    },
    {
        "id": "bio-sugar-fructose-fehling-cucl2-koh",
        "name": "Fehling reaction of D-fructose in caustic potash",
        "reactants": [
            "c6h12o6_fructose",
            "cucl2",
            "koh"
        ],
        "products": [
            "cu2o",
            "kcl",
            "co2",
            "water"
        ],
        "enthalpy": -3850,
        "desc": "Rapid ketose reduction of alkaline copper(II) chloride.",
        "net": "C6H12O6 + 24 CuCl2 + 48 KOH → 12 Cu2O + 48 KCl + 6 CO2 + 30 H2O"
    },
    {
        "id": "bio-sugar-fructose-fehling-cuso4-koh",
        "name": "Fehling reaction of D-fructose with copper(II) sulfate in KOH",
        "reactants": [
            "c6h12o6_fructose",
            "cuso4",
            "koh"
        ],
        "products": [
            "cu2o",
            "k2so4",
            "co2",
            "water"
        ],
        "enthalpy": -3880,
        "desc": "Redox decomposition of ketose sugar to brick-red Cu2O.",
        "net": "C6H12O6 + 24 CuSO4 + 48 KOH → 12 Cu2O + 24 K2SO4 + 6 CO2 + 30 H2O"
    },
    {
        "id": "bio-sugar-sucrose-inversion-hydrolysis",
        "name": "Acid-catalyzed inversion of sucrose to glucose and fructose",
        "reactants": [
            "sucrose",
            "water"
        ],
        "products": [
            "c6h12o6",
            "c6h12o6_fructose"
        ],
        "enthalpy": -14,
        "desc": "Enzymatic or acid hydrolysis reversing optical rotation from dextro to levorotatory.",
        "net": "C12H22O11 + H2O → C6H12O6 + C6H12O6"
    },
    {
        "id": "bio-sugar-glucose-permanganate",
        "name": "Permanganate complete oxidation of D-glucose",
        "reactants": [
            "c6h12o6",
            "kmno4",
            "h2so4"
        ],
        "products": [
            "co2",
            "mnso4",
            "k2so4",
            "water"
        ],
        "enthalpy": -4200,
        "desc": "Total chemical oxygen demand (COD) degradation of blood sugar.",
        "net": "5 C6H12O6 + 24 KMnO4 + 36 H2SO4 → 30 CO2 + 24 MnSO4 + 12 K2SO4 + 66 H2O"
    },
    {
        "id": "bio-sugar-fructose-permanganate",
        "name": "Permanganate oxidation of D-fructose",
        "reactants": [
            "c6h12o6_fructose",
            "kmno4",
            "h2so4"
        ],
        "products": [
            "co2",
            "mnso4",
            "k2so4",
            "water"
        ],
        "enthalpy": -4180,
        "desc": "Exhaustive permanganometric mineralization of ketohexose.",
        "net": "5 C6H12O6 + 24 KMnO4 + 36 H2SO4 → 30 CO2 + 24 MnSO4 + 12 K2SO4 + 66 H2O"
    },
    {
        "id": "bio-aa-glycine-combustion",
        "name": "Complete oxidative combustion of glycine",
        "reactants": [
            "glycine",
            "o2"
        ],
        "products": [
            "co2",
            "water",
            "n2"
        ],
        "enthalpy": -975,
        "desc": "Bomb calorimetry oxidation of the simplest proteinogenic amino acid.",
        "net": "4 C2H5NO2 + 9 O2 → 8 CO2 + 10 H2O + 2 N2"
    },
    {
        "id": "bio-aa-alanine-combustion",
        "name": "Complete oxidative combustion of alanine",
        "reactants": [
            "alanine",
            "o2"
        ],
        "products": [
            "co2",
            "water",
            "n2"
        ],
        "enthalpy": -1620,
        "desc": "Thermal combustion of alanine yielding carbon dioxide, steam, and nitrogen.",
        "net": "4 C3H7NO2 + 15 O2 → 12 CO2 + 14 H2O + 2 N2"
    },
    {
        "id": "bio-aa-glycylglycine-combustion",
        "name": "Combustion of dipeptide glycylglycine",
        "reactants": [
            "glycylglycine",
            "o2"
        ],
        "products": [
            "co2",
            "water",
            "n2"
        ],
        "enthalpy": -1950,
        "desc": "Thermal oxidation of prototype dipeptide model.",
        "net": "2 C4H8N2O3 + 9 O2 → 8 CO2 + 8 H2O + 2 N2"
    },
    {
        "id": "bio-aa-phenylalanine-combustion",
        "name": "Combustion of aromatic amino acid L-phenylalanine",
        "reactants": [
            "c9h11no2_phenylalanine",
            "o2"
        ],
        "products": [
            "co2",
            "water",
            "n2"
        ],
        "enthalpy": -4650,
        "desc": "Complete calorimetric oxidation of aromatic amino acid.",
        "net": "4 C9H11NO2 + 43 O2 → 36 CO2 + 22 H2O + 2 N2"
    },
    {
        "id": "bio-lactic-acid-combustion",
        "name": "Calorimetric combustion of metabolic lactic acid",
        "reactants": [
            "lactic-acid",
            "o2"
        ],
        "products": [
            "co2",
            "water"
        ],
        "enthalpy": -1340,
        "desc": "Oxidative combustion of anaerobic glycolysis end product.",
        "net": "C3H6O3 + 3 O2 → 3 CO2 + 3 H2O"
    },
    {
        "id": "bio-org-formamide-hydrolysis-koh",
        "name": "Potassium hydroxide hydrolysis of formamide",
        "reactants": [
            "formamide",
            "koh"
        ],
        "products": [
            "hcook",
            "ammonia"
        ],
        "enthalpy": -68,
        "desc": "Base-catalyzed amide cleavage yielding potassium formate.",
        "net": "CH3NO + KOH → HCOOK + NH3"
    },
    {
        "id": "bio-aa-urea-combustion",
        "name": "Calorimetric combustion of urea",
        "reactants": [
            "urea",
            "o2"
        ],
        "products": [
            "co2",
            "water",
            "n2"
        ],
        "enthalpy": -632,
        "desc": "Standard enthalpy of combustion of biological nitrogenous waste.",
        "net": "2 CH4N2O + 3 O2 → 2 CO2 + 4 H2O + 2 N2"
    },
    {
        "id": "bio-aa-urea-nitrous-acid-effervescence",
        "name": "Gasometric Van Slyke determination of urea with nitrous acid",
        "reactants": [
            "urea",
            "hno2"
        ],
        "products": [
            "co2",
            "n2",
            "water"
        ],
        "enthalpy": -480,
        "desc": "Rapid effervescence of molecular nitrogen and carbon dioxide for blood urea nitrogen.",
        "net": "CH4N2O + 2 HNO2 → CO2 + 2 N2 + 3 H2O"
    },
    {
        "id": "bio-org-oxamide-hydrolysis-naoh",
        "name": "Alkaline saponification of oxamide to sodium oxalate",
        "reactants": [
            "oxamide",
            "naoh"
        ],
        "products": [
            "na2c2o4",
            "ammonia"
        ],
        "enthalpy": -75,
        "desc": "Alkaline cleavage of bis-amide liberating ammonia.",
        "net": "C2H4N2O2 + 2 NaOH → Na2C2O4 + 2 NH3"
    },
    {
        "id": "bio-org-oxamide-hydrolysis-koh",
        "name": "Potassium hydroxide hydrolysis of oxamide",
        "reactants": [
            "oxamide",
            "koh"
        ],
        "products": [
            "k2c2o4",
            "ammonia"
        ],
        "enthalpy": -78,
        "desc": "Conversion of diamide into potassium oxalate.",
        "net": "C2H4N2O2 + 2 KOH → K2C2O4 + 2 NH3"
    },
    {
        "id": "bio-org-formamide-hydrolysis-naoh",
        "name": "Alkaline hydrolysis of formamide to sodium formate",
        "reactants": [
            "formamide",
            "naoh"
        ],
        "products": [
            "hcoona",
            "ammonia"
        ],
        "enthalpy": -65,
        "desc": "Base-catalyzed amide cleavage yielding sodium formate.",
        "net": "CH3NO + NaOH → HCOONa + NH3"
    },
    {
        "id": "bio-nabh4-benzoquinone-reduction",
        "name": "Sodium borohydride reduction of 1,4-benzoquinone to hydroquinone",
        "reactants": [
            "nabh4",
            "c6h4o2_benzoquinone",
            "water"
        ],
        "products": [
            "c6h6o2_hydroquinone",
            "naoh",
            "h3bo3"
        ],
        "enthalpy": -280,
        "desc": "Biomimetic hydride transfer reducing quinone electron carriers.",
        "net": "NaBH4 + 4 C6H4O2 + 4 H2O → 4 C6H6O2 + NaOH + H3BO3"
    },
    {
        "id": "bio-nabh4-silver-reduction",
        "name": "Sodium borohydride synthesis of silver nanoparticles",
        "reactants": [
            "nabh4",
            "agno3",
            "water"
        ],
        "products": [
            "ag",
            "nano3",
            "h3bo3",
            "h2"
        ],
        "enthalpy": -340,
        "desc": "Hydride reduction producing yellow-brown colloidal silver for antimicrobial assays.",
        "net": "2 NaBH4 + 2 AgNO3 + 6 H2O → 2 Ag + 2 NaNO3 + 2 H3BO3 + 7 H2"
    },
    {
        "id": "bio-nabh4-cucl2-reduction",
        "name": "Sodium borohydride reduction of copper(II) chloride",
        "reactants": [
            "nabh4",
            "cucl2",
            "water"
        ],
        "products": [
            "cu",
            "nacl",
            "h3bo3",
            "h2"
        ],
        "enthalpy": -260,
        "desc": "Hydride reduction isolating metallic copper powder.",
        "net": "2 NaBH4 + CuCl2 + 6 H2O → Cu + 2 NaCl + 2 H3BO3 + 7 H2"
    },
    {
        "id": "bio-nabh4-acid-hydrolysis-hcl",
        "name": "Acid hydrolysis of sodium borohydride in hydrochloric acid",
        "reactants": [
            "nabh4",
            "hcl",
            "water"
        ],
        "products": [
            "nacl",
            "h3bo3",
            "h2"
        ],
        "enthalpy": -215,
        "desc": "Violent effervescence releasing pure molecular hydrogen gas.",
        "net": "NaBH4 + HCl + 3 H2O → NaCl + H3BO3 + 4 H2"
    },
    {
        "id": "bio-nabh4-acid-hydrolysis-h2so4",
        "name": "Sulfuric acid decomposition of sodium borohydride",
        "reactants": [
            "nabh4",
            "h2so4",
            "water"
        ],
        "products": [
            "na2so4",
            "h3bo3",
            "h2"
        ],
        "enthalpy": -225,
        "desc": "Rapid generation of hydrogen fuel and boric acid.",
        "net": "2 NaBH4 + H2SO4 + 6 H2O → Na2SO4 + 2 H3BO3 + 8 H2"
    },
    {
        "id": "bio-nabh4-acid-hydrolysis-hno3",
        "name": "Nitric acid hydrolysis of sodium borohydride",
        "reactants": [
            "nabh4",
            "hno3",
            "water"
        ],
        "products": [
            "nano3",
            "h3bo3",
            "h2"
        ],
        "enthalpy": -220,
        "desc": "Exothermic acidification yielding sodium nitrate and boric acid.",
        "net": "NaBH4 + HNO3 + 3 H2O → NaNO3 + H3BO3 + 4 H2"
    },
    {
        "id": "bio-nabh4-acetic-hydrolysis",
        "name": "Acetic acid hydrolysis of sodium borohydride",
        "reactants": [
            "nabh4",
            "ch3cooh",
            "water"
        ],
        "products": [
            "ch3coona",
            "h3bo3",
            "h2"
        ],
        "enthalpy": -185,
        "desc": "Controlled buffer hydrolysis of borohydride.",
        "net": "NaBH4 + CH3COOH + 3 H2O → CH3COONa + H3BO3 + 4 H2"
    },
    {
        "id": "bio-nabh4-fecl3-reduction",
        "name": "Sodium borohydride reduction of iron(III) to iron(II)",
        "reactants": [
            "nabh4",
            "fecl3",
            "water"
        ],
        "products": [
            "fecl2",
            "nacl",
            "h3bo3",
            "h2"
        ],
        "enthalpy": -195,
        "desc": "Selective one-electron reduction of ferric chloride.",
        "net": "2 NaBH4 + 2 FeCl3 + 6 H2O → 2 FeCl2 + 2 NaCl + 2 H3BO3 + 7 H2"
    },
    {
        "id": "bio-nabh4-cuso4-reduction",
        "name": "Reduction of copper(II) sulfate by sodium borohydride",
        "reactants": [
            "nabh4",
            "cuso4",
            "water"
        ],
        "products": [
            "cu",
            "na2so4",
            "h3bo3",
            "h2"
        ],
        "enthalpy": -275,
        "desc": "Precipitation of ultrafine elemental copper powder.",
        "net": "2 NaBH4 + CuSO4 + 6 H2O → Cu + Na2SO4 + 2 H3BO3 + 7 H2"
    },
    {
        "id": "bio-nabh4-niso4-reduction",
        "name": "Borohydride reduction of nickel sulfate (Raney nickel analog)",
        "reactants": [
            "nabh4",
            "niso4",
            "water"
        ],
        "products": [
            "ni",
            "na2so4",
            "h3bo3",
            "h2"
        ],
        "enthalpy": -240,
        "desc": "Synthesis of black active nickel boride/metal hydrogenation catalyst.",
        "net": "2 NaBH4 + NiSO4 + 6 H2O → Ni + Na2SO4 + 2 H3BO3 + 7 H2"
    },
    {
        "id": "bio-nabh4-feso4-reduction",
        "name": "Reduction of iron(II) sulfate by sodium borohydride",
        "reactants": [
            "nabh4",
            "feso4",
            "water"
        ],
        "products": [
            "fe",
            "na2so4",
            "h3bo3",
            "h2"
        ],
        "enthalpy": -180,
        "desc": "Synthesis of zero-valent iron nanoparticles (nZVI) for environmental remediation.",
        "net": "2 NaBH4 + FeSO4 + 6 H2O → Fe + Na2SO4 + 2 H3BO3 + 7 H2"
    },
    {
        "id": "bio-perox-fenton-reaction",
        "name": "Fenton reagent hydroxyl radical generation from ferrous chloride",
        "reactants": [
            "fecl2",
            "h2o2",
            "hcl"
        ],
        "products": [
            "fecl3",
            "water"
        ],
        "enthalpy": -160,
        "desc": "Classic advanced oxidation process (AOP) generating destructive hydroxyl radicals.",
        "net": "2 FeCl2 + H2O2 + 2 HCl → 2 FeCl3 + 2 H2O"
    },
    {
        "id": "bio-perox-fenton-sulfate",
        "name": "Fenton reaction with ferrous sulfate",
        "reactants": [
            "feso4",
            "h2o2",
            "h2so4"
        ],
        "products": [
            "fe2-so4-3",
            "water"
        ],
        "enthalpy": -165,
        "desc": "Biomimetic model of intracellular oxidative stress and lipid peroxidation.",
        "net": "2 FeSO4 + H2O2 + H2SO4 → Fe2(SO4)3 + 2 H2O"
    },
    {
        "id": "bio-perox-iron-nitrate-fenton",
        "name": "Fenton reaction with iron(II) nitrate",
        "reactants": [
            "fe-no3-2",
            "h2o2",
            "hno3"
        ],
        "products": [
            "fe-no3-3",
            "water"
        ],
        "enthalpy": -155,
        "desc": "Peroxide reduction by ferrous nitrate in nitric acid medium.",
        "net": "2 Fe(NO3)2 + H2O2 + 2 HNO3 → 2 Fe(NO3)3 + 2 H2O"
    },
    {
        "id": "bio-perox-bromide-haloperoxidase",
        "name": "Vanadium/heme haloperoxidase model: bromide oxidation by peroxide",
        "reactants": [
            "kbr",
            "h2o2",
            "h2so4"
        ],
        "products": [
            "br2",
            "k2so4",
            "water"
        ],
        "enthalpy": -145,
        "desc": "Biochemical synthesis of elemental bromine in marine red algae.",
        "net": "2 KBr + H2O2 + H2SO4 → Br2 + K2SO4 + 2 H2O"
    },
    {
        "id": "bio-perox-chloride-haloperoxidase",
        "name": "Neutrophil myeloperoxidase model: chloride oxidation by hydrogen peroxide",
        "reactants": [
            "nacl",
            "h2o2",
            "h2so4"
        ],
        "products": [
            "cl2",
            "na2so4",
            "water"
        ],
        "enthalpy": -120,
        "desc": "Enzymatic generation of microbicidal hypochlorous acid/chlorine in phagosomes.",
        "net": "2 NaCl + H2O2 + H2SO4 → Cl2 + Na2SO4 + 2 H2O"
    },
    {
        "id": "bio-perox-ki-hcl-haloperoxidase",
        "name": "Iodide peroxidase biomimetic oxidation by hydrogen peroxide",
        "reactants": [
            "ki",
            "h2o2",
            "hcl"
        ],
        "products": [
            "i2",
            "kcl",
            "water"
        ],
        "enthalpy": -180,
        "desc": "Thyroid peroxidase mimic: oxidation of dietary iodide to molecular iodine.",
        "net": "2 KI + H2O2 + 2 HCl → I2 + 2 KCl + 2 H2O"
    },
    {
        "id": "bio-perox-kbr-hcl-haloperoxidase",
        "name": "Bromide haloperoxidase biomimetic oxidation",
        "reactants": [
            "kbr",
            "h2o2",
            "hcl"
        ],
        "products": [
            "br2",
            "kcl",
            "water"
        ],
        "enthalpy": -150,
        "desc": "Marine algal bromoperoxidase model forming orange-brown bromine.",
        "net": "2 KBr + H2O2 + 2 HCl → Br2 + 2 KCl + 2 H2O"
    },
    {
        "id": "bio-perox-nai-hcl-haloperoxidase",
        "name": "Sodium iodide haloperoxidase oxidation",
        "reactants": [
            "nai",
            "h2o2",
            "hcl"
        ],
        "products": [
            "i2",
            "nacl",
            "water"
        ],
        "enthalpy": -180,
        "desc": "Colorimetric detection of hydroperoxides with sodium iodide.",
        "net": "2 NaI + H2O2 + 2 HCl → I2 + 2 NaCl + 2 H2O"
    },
    {
        "id": "bio-perox-nabr-hcl-haloperoxidase",
        "name": "Sodium bromide haloperoxidase oxidation",
        "reactants": [
            "nabr",
            "h2o2",
            "hcl"
        ],
        "products": [
            "br2",
            "nacl",
            "water"
        ],
        "enthalpy": -150,
        "desc": "Biomimetic haloperoxidase oxidation of sodium bromide.",
        "net": "2 NaBr + H2O2 + 2 HCl → Br2 + 2 NaCl + 2 H2O"
    },
    {
        "id": "bio-perox-hi-peroxide",
        "name": "Direct oxidation of hydroiodic acid by hydrogen peroxide",
        "reactants": [
            "hi",
            "h2o2"
        ],
        "products": [
            "i2",
            "water"
        ],
        "enthalpy": -240,
        "desc": "Rapid oxidation of hydriodic acid liberating triiodide/iodine crystals.",
        "net": "2 HI + H2O2 → I2 + 2 H2O"
    },
    {
        "id": "bio-perox-hbr-peroxide",
        "name": "Direct oxidation of hydrobromic acid by hydrogen peroxide",
        "reactants": [
            "hbr",
            "h2o2"
        ],
        "products": [
            "br2",
            "water"
        ],
        "enthalpy": -190,
        "desc": "Rapid oxidation liberating dense red bromine vapors.",
        "net": "2 HBr + H2O2 → Br2 + 2 H2O"
    },
    {
        "id": "bio-assay-caso4-na2c2o4",
        "name": "Precipitation of calcium oxalate from calcium sulfate",
        "reactants": [
            "caso4",
            "na2c2o4"
        ],
        "products": [
            "cac2o4",
            "na2so4"
        ],
        "enthalpy": -25,
        "desc": "Diagnostic precipitation of nephrolithiasis calcium oxalate monohydrate.",
        "net": "CaSO4 + Na2C2O4 → CaC2O4 + Na2SO4"
    },
    {
        "id": "bio-assay-cac2o4-kmno4-titration",
        "name": "Kramer-Tisdall permanganometric serum calcium titration",
        "reactants": [
            "cac2o4",
            "kmno4",
            "h2so4"
        ],
        "products": [
            "caso4",
            "mnso4",
            "k2so4",
            "co2",
            "water"
        ],
        "enthalpy": -540,
        "desc": "Decolorization of purple permanganate by dissolved calcium oxalate.",
        "net": "5 CaC2O4 + 2 KMnO4 + 8 H2SO4 → 5 CaSO4 + 2 MnSO4 + K2SO4 + 10 CO2 + 8 H2O"
    },
    {
        "id": "bio-assay-bano32-k2so4",
        "name": "Precipitation of radiopaque barium sulfate with potassium sulfate",
        "reactants": [
            "ba-no3-2",
            "k2so4"
        ],
        "products": [
            "baso4",
            "kno3"
        ],
        "enthalpy": -32,
        "desc": "Synthesis of inert barium meal contrast agent.",
        "net": "BaN2O6 + K2SO4 → BaSO4 + 2 KNO3"
    },
    {
        "id": "bio-assay-bano32-na2so4",
        "name": "Precipitation of barium sulfate with sodium sulfate",
        "reactants": [
            "ba-no3-2",
            "na2so4"
        ],
        "products": [
            "baso4",
            "nano3"
        ],
        "enthalpy": -34,
        "desc": "Diagnostic clinical precipitation of insoluble radio-contrast agent.",
        "net": "BaN2O6 + Na2SO4 → BaSO4 + 2 NaNO3"
    },
    {
        "id": "bio-assay-bano32-na2c2o4",
        "name": "Diagnostic precipitation of insoluble barium oxalate",
        "reactants": [
            "ba-no3-2",
            "na2c2o4"
        ],
        "products": [
            "bac2o4",
            "nano3"
        ],
        "enthalpy": -28,
        "desc": "Oxalate precipitation test for barium cations.",
        "net": "BaN2O6 + Na2C2O4 → BaC2O4 + 2 NaNO3"
    },
    {
        "id": "bio-assay-znso4-na2co3",
        "name": "Precipitation of pharmaceutical basic zinc carbonate",
        "reactants": [
            "znso4",
            "na2co3"
        ],
        "products": [
            "znco3",
            "na2so4"
        ],
        "enthalpy": -26,
        "desc": "Synthesis of medicinal smithsonite / calamine precursor.",
        "net": "ZnSO4 + Na2CO3 → ZnCO3 + Na2SO4"
    },
    {
        "id": "bio-assay-zncl2-na2co3",
        "name": "Precipitation of zinc carbonate from zinc chloride",
        "reactants": [
            "zncl2",
            "na2co3"
        ],
        "products": [
            "znco3",
            "nacl"
        ],
        "enthalpy": -25,
        "desc": "Precipitation of zinc carbonate topical antiseptic salt.",
        "net": "ZnCl2 + Na2CO3 → ZnCO3 + 2 NaCl"
    },
    {
        "id": "bio-assay-fecl2-na2c2o4",
        "name": "Precipitation of ferrous oxalate humboldtine from ferrous chloride",
        "reactants": [
            "fecl2",
            "na2c2o4"
        ],
        "products": [
            "fec2o4",
            "nacl"
        ],
        "enthalpy": -24,
        "desc": "Model precipitation of urinary ferrous oxalate mineral humboldtine.",
        "net": "FeCl2 + Na2C2O4 → FeC2O4 + 2 NaCl"
    },
    {
        "id": "bio-assay-feso4-na2c2o4",
        "name": "Precipitation of ferrous oxalate from iron(II) sulfate",
        "reactants": [
            "feso4",
            "na2c2o4"
        ],
        "products": [
            "fec2o4",
            "na2so4"
        ],
        "enthalpy": -23,
        "desc": "Quantitative precipitation of iron(II) oxalate in urine sediment assays.",
        "net": "FeSO4 + Na2C2O4 → FeC2O4 + Na2SO4"
    },
    {
        "id": "bio-assay-cuso4-na2c2o4",
        "name": "Precipitation of copper(II) oxalate from cupric sulfate",
        "reactants": [
            "cuso4",
            "na2c2o4"
        ],
        "products": [
            "cuc2o4",
            "na2so4"
        ],
        "enthalpy": -27,
        "desc": "Coordination precipitation of insoluble light-blue copper(II) oxalate.",
        "net": "CuSO4 + Na2C2O4 → CuC2O4 + Na2SO4"
    },
    {
        "id": "bio-assay-znso4-k2co3",
        "name": "Precipitation of zinc carbonate by potassium carbonate",
        "reactants": [
            "znso4",
            "k2co3"
        ],
        "products": [
            "znco3",
            "k2so4"
        ],
        "enthalpy": -27,
        "desc": "Synthesis of basic zinc carbonate for dermatological ointments.",
        "net": "ZnSO4 + K2CO3 → ZnCO3 + K2SO4"
    }
];

  for (const r of reactions) {
    addReaction({
      id: r.id,
      name: r.name,
      reactionType: "redox_other",
      reactants: r.reactants,
      products: r.products,
      netIonicEquation: r.net,
      enthalpyKjPerMol: r.enthalpy,
      temperatureMinC: 15,
      temperatureMaxC: 100,
      observableEffects: [
        {
          type: "color_change",
          description: r.desc,
        }
      ],
      safetyNotes: "Bioinorganic and clinical qualitative test reaction. Handle heavy metal complexes (mercury, nickel, barium) and alkaline/acidic reagents with laboratory PPE.",
    });
  }
}
