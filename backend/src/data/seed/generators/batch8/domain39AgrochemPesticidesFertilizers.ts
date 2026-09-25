// Domain 39: Agrochemistry, Pesticides, Herbicides & Modern Fertilizers (100 reactions)
import type { ReactionDefinition } from "./types.js";

export const DOMAIN_39_REACTIONS: ReactionDefinition[] = [
  {
    "id": "agro-001-tsp-synthesis",
    "name": "Triple superphosphate (TSP) fertilizer synthesis",
    "reactants": [
      "ca3po42",
      "h3po4"
    ],
    "products": [
      "triple_superphosphate"
    ],
    "enthalpyKjPerMol": -120,
    "description": "Acidulation of insoluble tricalcium phosphate with phosphoric acid yielding soluble monocalcium phosphate (TSP).",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Exothermic slurry formation during acidulation"
      }
    ]
  },
  {
    "id": "agro-002-map-synthesis",
    "name": "Monoammonium phosphate (MAP) 11-52-0 fertilizer synthesis",
    "reactants": [
      "ammonia",
      "h3po4"
    ],
    "products": [
      "monoammonium_phosphate"
    ],
    "enthalpyKjPerMol": -115,
    "description": "Gas-liquid ammoniation of merchant-grade phosphoric acid crystallizing MAP granules.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Rapid crystallization of white MAP needles"
      }
    ]
  },
  {
    "id": "agro-003-dap-synthesis",
    "name": "Diammonium phosphate (DAP) 18-46-0 fertilizer synthesis",
    "reactants": [
      "monoammonium_phosphate",
      "ammonia"
    ],
    "products": [
      "diammonium_phosphate"
    ],
    "enthalpyKjPerMol": -68,
    "description": "Second ammoniation stage of MAP producing alkaline diammonium phosphate.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Mild ammoniation exotherm"
      }
    ]
  },
  {
    "id": "agro-004-dap-thermal-decomposition",
    "name": "Thermal de-ammoniation of diammonium phosphate",
    "reactants": [
      "diammonium_phosphate"
    ],
    "products": [
      "monoammonium_phosphate",
      "ammonia"
    ],
    "enthalpyKjPerMol": 68,
    "description": "Controlled thermal decomposition of DAP at elevated temperatures releasing ammonia.",
    "reactionType": "decomposition",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Pungent ammonia gas evolved upon gentle heating"
      }
    ]
  },
  {
    "id": "agro-005-map-condensation",
    "name": "Thermal condensation of monoammonium phosphate to ammonium polyphosphate precursor",
    "reactants": [
      "monoammonium_phosphate"
    ],
    "products": [
      "nh4po3_polyphosphate",
      "water"
    ],
    "enthalpyKjPerMol": 45,
    "description": "Dehydration of monoammonium phosphate into condensed ammonium metaphosphate.",
    "reactionType": "decomposition",
    "observableEffects": [
      {
        "type": "phase_change",
        "description": "Viscous condensed polyphosphate melt forms"
      }
    ]
  },
  {
    "id": "agro-006-langbeinite-dissolution",
    "name": "Congruent dissolution of langbeinite fertilizer",
    "reactants": [
      "k2mg2_so4_3"
    ],
    "products": [
      "k2so4",
      "mgso4"
    ],
    "enthalpyKjPerMol": -15,
    "description": "Dissolution of potassium magnesium sulfate mineral yielding soluble K and Mg macronutrients.",
    "reactionType": "decomposition",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#FADBD8",
        "colorTo": "#FFFFFF",
        "description": "Pale pink crystals dissolve into clear nutrient solution"
      }
    ]
  },
  {
    "id": "agro-007-kno3-metathesis",
    "name": "Industrial potassium nitrate 13-0-44 fertilizer production",
    "reactants": [
      "kcl",
      "nh4no3"
    ],
    "products": [
      "kno3",
      "ammonium-chloride"
    ],
    "enthalpyKjPerMol": 12,
    "description": "Fractional crystallization metathesis producing chloride-free potassium nitrate fertilizer.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Prismatic KNO3 crystals precipitate upon chilling"
      }
    ]
  },
  {
    "id": "agro-008-fluorapatite-defluorination",
    "name": "Thermal defluorination of fluorapatite with silica and steam",
    "reactants": [
      "ca5f_po4_3",
      "sio2",
      "water"
    ],
    "products": [
      "ca3po42",
      "casio3",
      "hf"
    ],
    "enthalpyKjPerMol": 180,
    "description": "Rotary kiln calcination of fluorapatite generating feed-grade defluorinated tricalcium phosphate.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Evolution of gaseous HF into scrubbing tower"
      }
    ]
  },
  {
    "id": "agro-009-cacn2-hydrolysis",
    "name": "Hydrolysis of calcium cyanamide to hydrogen cyanamide and lime",
    "reactants": [
      "cacn2",
      "water"
    ],
    "products": [
      "caoh2",
      "h2cn2"
    ],
    "enthalpyKjPerMol": -65,
    "description": "First soil breakdown step of lime-nitrogen (Kalkstickstoff) fertilizer.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#E5E7E9",
        "description": "Liming precipitation of calcium hydroxide"
      }
    ]
  },
  {
    "id": "agro-010-h2cn2-hydration",
    "name": "Soil catalytic hydration of hydrogen cyanamide to urea",
    "reactants": [
      "h2cn2",
      "water"
    ],
    "products": [
      "urea"
    ],
    "enthalpyKjPerMol": -82,
    "description": "Manganese dioxide-catalyzed soil hydration converting cyanamide to bioavailable urea.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#FFFFFF",
        "colorTo": "#FAFAFA",
        "description": "Clear solution of urea forms in moist soil pore water"
      }
    ]
  },
  {
    "id": "agro-011-urea-hydrochloride-formation",
    "name": "Synthesis of non-fuming urea hydrochloride fertilizer descaler",
    "reactants": [
      "urea",
      "hcl"
    ],
    "products": [
      "urea_hydrochloride"
    ],
    "enthalpyKjPerMol": -42,
    "description": "Direct adduction of urea with anhydrous hydrogen chloride forming safe agricultural acid cleaner.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Exothermic formation of clear heavy liquid salt"
      }
    ]
  },
  {
    "id": "agro-012-urea-phosphate-synthesis",
    "name": "Urea phosphate 17-44-0 acidifying fertilizer synthesis",
    "reactants": [
      "urea",
      "h3po4"
    ],
    "products": [
      "urea_phosphate"
    ],
    "enthalpyKjPerMol": -35,
    "description": "Direct reaction between urea and technical-grade wet-process phosphoric acid.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Monoclinic prismatic crystals of urea phosphate precipitate"
      }
    ]
  },
  {
    "id": "agro-013-dcd-dimerization",
    "name": "Dimerization of hydrogen cyanamide to dicyandiamide nitrification inhibitor",
    "reactants": [
      "h2cn2"
    ],
    "products": [
      "dicyandiamide"
    ],
    "enthalpyKjPerMol": -75,
    "description": "Alkaline dimerization producing DCD slow-release nitrification inhibitor.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "White crystalline DCD separates from alkaline liquor"
      }
    ]
  },
  {
    "id": "agro-014-ats-synthesis",
    "name": "Ammonium thiosulfate liquid fertilizer synthesis",
    "reactants": [
      "ammonia",
      "so2",
      "s",
      "water"
    ],
    "products": [
      "nh4_2s2o3"
    ],
    "enthalpyKjPerMol": -190,
    "description": "Scrubbing of sulfur dioxide with aqueous ammonia and elemental sulfur slurry yielding clear liquid ATS fertilizer.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#F4D03F",
        "colorTo": "#FFFFFF",
        "description": "Yellow sulfur dissolves as ammonium thiosulfate liquid forms"
      }
    ]
  },
  {
    "id": "agro-015-znso4-dehydration",
    "name": "Thermal dehydration of zinc sulfate heptahydrate to monohydrate",
    "reactants": [
      "znso4_7h2o"
    ],
    "products": [
      "znso4_h2o",
      "water"
    ],
    "enthalpyKjPerMol": 310,
    "description": "Rotary kiln thermal dehydration producing granular 35.5% Zn micronutrient fertilizer.",
    "reactionType": "decomposition",
    "observableEffects": [
      {
        "type": "phase_change",
        "description": "Vitreous heptahydrate crystals turn into free-flowing opaque white granules"
      }
    ]
  },
  {
    "id": "agro-016-mnso4-pyrolusite-reduction",
    "name": "Sulfur dioxide reductive leaching of pyrolusite to manganese sulfate",
    "reactants": [
      "mno2",
      "so2"
    ],
    "products": [
      "mnso4"
    ],
    "enthalpyKjPerMol": -240,
    "description": "Direct hydrometallurgical reduction of black manganese dioxide ore to soluble manganese micronutrient.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#1C2833",
        "colorTo": "#FADBD8",
        "description": "Black pyrolusite dissolves yielding pale pink manganese sulfate solution"
      }
    ]
  },
  {
    "id": "agro-017-feso4-iron-dissolution",
    "name": "Sulfuric acid dissolution of iron scrap for agricultural ferrous sulfate",
    "reactants": [
      "fe",
      "h2so4",
      "water"
    ],
    "products": [
      "feso4_7h2o",
      "h2"
    ],
    "enthalpyKjPerMol": -88,
    "description": "Dissolution of scrap steel in spent pickling acid yielding agricultural green vitriol crystals.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Hydrogen gas bubbling"
      },
      {
        "type": "precipitation",
        "colorTo": "#A2D9CE",
        "description": "Pale sea-green vitriol crystals precipitate"
      }
    ]
  },
  {
    "id": "agro-018-disodium-octaborate-synthesis",
    "name": "Synthesis of highly soluble disodium octaborate tetrahydrate foliar fertilizer",
    "reactants": [
      "na2b4o7",
      "h3bo3"
    ],
    "products": [
      "na2b8o13",
      "water"
    ],
    "enthalpyKjPerMol": -22,
    "description": "Thermal blending of borax and boric acid producing ultra-soluble 20.8% B foliar spray.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "White spray-dried amorphous octaborate powder"
      }
    ]
  },
  {
    "id": "agro-019-cuso4-basic-carbonate",
    "name": "Sulfuric acid neutralization of basic copper carbonate to soluble copper sulfate",
    "reactants": [
      "cu2co3_oh_2",
      "h2so4"
    ],
    "products": [
      "cuso4",
      "co2",
      "water"
    ],
    "enthalpyKjPerMol": -135,
    "description": "Acid digestion of basic copper carbonate producing sky-blue copper sulfate solution.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Effervescence of carbon dioxide"
      },
      {
        "type": "color_change",
        "colorFrom": "#1ABC9C",
        "colorTo": "#2980B9",
        "description": "Intense blue solution forms"
      }
    ]
  },
  {
    "id": "agro-020-struvite-precipitation",
    "name": "Struvite crystal precipitation from agricultural wastewater",
    "reactants": [
      "mgcl2",
      "monoammonium_phosphate",
      "naoh",
      "water"
    ],
    "products": [
      "mgnh4po4_6h2o",
      "nacl"
    ],
    "enthalpyKjPerMol": -45,
    "description": "Recovery of phosphorus and nitrogen from swine manure effluent as crystalline struvite slow-release fertilizer.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Immediate precipitation of glistening white struvite crystals"
      }
    ]
  },
  {
    "id": "agro-021-malathion-activation",
    "name": "Cytochrome P450 oxidative bioactivation of malathion to malaoxon",
    "reactants": [
      "malathion",
      "o2"
    ],
    "products": [
      "malaoxon",
      "so2"
    ],
    "enthalpyKjPerMol": -290,
    "description": "Microsomal metabolic desulfuration converting phosphorothionate into potent acetylcholinesterase inhibitor malaoxon.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#F9E79F",
        "colorTo": "#FCF3CF",
        "description": "Slight lightening of amber insecticide liquid"
      }
    ]
  },
  {
    "id": "agro-022-malathion-esterase-cleavage",
    "name": "Enzymatic carboxylesterase detoxification of malathion",
    "reactants": [
      "malathion",
      "water"
    ],
    "products": [
      "malathion_monocarboxylic_acid",
      "c2h5oh"
    ],
    "enthalpyKjPerMol": -38,
    "description": "Rapid mammalian carboxylesterase hydrolysis protecting mammals compared to susceptible insects.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#F9E79F",
        "colorTo": "#FFFFFF",
        "description": "Emulsion clears into aqueous metabolite solution"
      }
    ]
  },
  {
    "id": "agro-023-chlorpyrifos-soil-hydrolysis",
    "name": "Soil microbial phosphotriesterase hydrolysis of chlorpyrifos",
    "reactants": [
      "chlorpyrifos",
      "water"
    ],
    "products": [
      "tcpy",
      "diethyl_thiophosphoric_acid"
    ],
    "enthalpyKjPerMol": -42,
    "description": "Enzymatic cleavage producing persistent 3,5,6-trichloro-2-pyridinol soil biomarker.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "White solid TCPy metabolite forms"
      }
    ]
  },
  {
    "id": "agro-024-carbaryl-synthesis",
    "name": "Industrial synthesis of carbaryl (Sevin)",
    "reactants": [
      "1_naphthol",
      "methyl_isocyanate"
    ],
    "products": [
      "carbaryl"
    ],
    "enthalpyKjPerMol": -92,
    "description": "Direct addition of 1-naphthol to methyl isocyanate forming broad-spectrum carbamate insecticide.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Exothermic crystallization of carbaryl flakes"
      }
    ]
  },
  {
    "id": "agro-025-carbaryl-hydrolysis",
    "name": "Aqueous diagnostic hydrolysis of carbaryl to 1-naphthol",
    "reactants": [
      "carbaryl",
      "water"
    ],
    "products": [
      "1_naphthol",
      "methylamine",
      "co2"
    ],
    "enthalpyKjPerMol": -48,
    "description": "Hydrolytic cleavage liberating 1-naphthol for spectrophotometric residue monitoring.",
    "reactionType": "decomposition",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Slow carbon dioxide effervescence"
      }
    ]
  },
  {
    "id": "agro-026-diazinon-activation",
    "name": "Oxidative desulfuration of diazinon to diazoxon",
    "reactants": [
      "diazinon",
      "o2"
    ],
    "products": [
      "diazoxon",
      "so2"
    ],
    "enthalpyKjPerMol": -285,
    "description": "Bioactivation of diazinon by mixed-function oxidases to neurotoxic diazoxon.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#F5B041",
        "colorTo": "#FAD7A0",
        "description": "Yellow-brown liquid oxidizes"
      }
    ]
  },
  {
    "id": "agro-027-diazinon-hydrolysis",
    "name": "Soil environmental hydrolysis of diazinon to pyrimidinol",
    "reactants": [
      "diazinon",
      "water"
    ],
    "products": [
      "imp_pyrimidinol",
      "diethyl_thiophosphoric_acid"
    ],
    "enthalpyKjPerMol": -45,
    "description": "Hydrolase cleavage of phosphate ester linkage in moist agricultural soils.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#F5B041",
        "colorTo": "#FFFFFF",
        "description": "Decolorization of soil pore solution"
      }
    ]
  },
  {
    "id": "agro-028-dimethoate-oxidation",
    "name": "Oxidative bioactivation of dimethoate to omethoate",
    "reactants": [
      "dimethoate",
      "o2"
    ],
    "products": [
      "omethoate",
      "so2"
    ],
    "enthalpyKjPerMol": -280,
    "description": "Metabolic sulfuration replacement generating active systemic oxon cholinesterase inhibitor.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#EAECEE",
        "colorTo": "#FCF3CF",
        "description": "Formation of pale yellow omethoate"
      }
    ]
  },
  {
    "id": "agro-029-parathion-activation",
    "name": "Microsomal oxidation of ethyl parathion to paraoxon",
    "reactants": [
      "parathion",
      "o2"
    ],
    "products": [
      "paraoxon",
      "so2"
    ],
    "enthalpyKjPerMol": -305,
    "description": "Bioactivation of parathion yielding deadly active anticholinesterase agent paraoxon.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#F4D03F",
        "colorTo": "#F9E79F",
        "description": "Deep yellow liquid shifts in spectral absorbance"
      }
    ]
  },
  {
    "id": "agro-030-parathion-hydrolysis",
    "name": "Phosphotriesterase detoxication hydrolysis of parathion",
    "reactants": [
      "parathion",
      "water"
    ],
    "products": [
      "p_nitrophenol",
      "diethyl_thiophosphoric_acid"
    ],
    "enthalpyKjPerMol": -50,
    "description": "Bacterial organophosphate hydrolase cleavage releasing chromogenic 4-nitrophenol.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#FFFFFF",
        "colorTo": "#F4D03F",
        "description": "Development of yellow 4-nitrophenol color"
      }
    ]
  },
  {
    "id": "agro-031-aldicarb-oxidation-sulfoxide",
    "name": "Microbial thioether oxidation of aldicarb to aldicarb sulfoxide",
    "reactants": [
      "aldicarb",
      "h2o2"
    ],
    "products": [
      "aldicarb_sulfoxide",
      "water"
    ],
    "enthalpyKjPerMol": -145,
    "description": "Enzymatic flavin monooxygenase oxidation of aldicarb in soil and groundwater.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Mild oxidation exotherm"
      }
    ]
  },
  {
    "id": "agro-032-aldicarb-sulfoxide-oxidation",
    "name": "Peroxide oxidation of aldicarb sulfoxide to aldicarb sulfone",
    "reactants": [
      "aldicarb_sulfoxide",
      "h2o2"
    ],
    "products": [
      "aldicarb_sulfone",
      "water"
    ],
    "enthalpyKjPerMol": -138,
    "description": "Secondary persistent oxidation step forming toxic aldicarb sulfone.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Crystallization of white sulfone needles"
      }
    ]
  },
  {
    "id": "agro-033-methomyl-oxidation",
    "name": "Hydrogen peroxide oxidation of methomyl to methomyl sulfoxide",
    "reactants": [
      "methomyl",
      "h2o2"
    ],
    "products": [
      "methomyl_sulfoxide",
      "water"
    ],
    "enthalpyKjPerMol": -135,
    "description": "Soil microbial thioether oxidation of oxime carbamate methomyl.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Mild exothermic oxidation"
      }
    ]
  },
  {
    "id": "agro-034-propoxur-synthesis",
    "name": "Synthesis of propoxur from 2-isopropoxyphenol and methyl isocyanate",
    "reactants": [
      "2_isopropoxyphenol",
      "methyl_isocyanate"
    ],
    "products": [
      "propoxur"
    ],
    "enthalpyKjPerMol": -88,
    "description": "Addition of phenolic hydroxyl to isocyanate generating Baygon carbamate insecticide.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Exothermic crystallization of pure propoxur"
      }
    ]
  },
  {
    "id": "agro-035-propoxur-hydrolysis",
    "name": "Degradative hydrolysis of propoxur",
    "reactants": [
      "propoxur",
      "water"
    ],
    "products": [
      "2_isopropoxyphenol",
      "methylamine",
      "co2"
    ],
    "enthalpyKjPerMol": -46,
    "description": "Hydrolytic cleavage of propoxur carbamate ester.",
    "reactionType": "decomposition",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Evolution of carbon dioxide and trace methylamine"
      }
    ]
  },
  {
    "id": "agro-036-thiram-synthesis",
    "name": "Oxidative dimerization of sodium dimethyldithiocarbamate to thiram",
    "reactants": [
      "sodium_dimethyldithiocarbamate",
      "h2o2",
      "h2so4"
    ],
    "products": [
      "thiram",
      "na2so4",
      "water"
    ],
    "enthalpyKjPerMol": -185,
    "description": "Hydrogen peroxide coupling of dithiocarbamate forming tetramethylthiuram disulfide.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#F9E79F",
        "description": "Precipitation of pale yellow thiram powder"
      }
    ]
  },
  {
    "id": "agro-037-captan-synthesis",
    "name": "Synthesis of captan fungicide",
    "reactants": [
      "tetrahydrophthalimide",
      "ccl4",
      "s"
    ],
    "products": [
      "captan",
      "hcl"
    ],
    "enthalpyKjPerMol": -95,
    "description": "Perchloromethylmercaptan substitution on tetrahydrophthalimide.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Precipitation of crystalline captan"
      }
    ]
  },
  {
    "id": "agro-038-chlorothalonil-synthesis",
    "name": "Vapor-phase catalytic chlorination of isophthalonitrile to chlorothalonil",
    "reactants": [
      "isophthalonitrile",
      "cl2"
    ],
    "products": [
      "chlorothalonil",
      "hcl"
    ],
    "enthalpyKjPerMol": -240,
    "description": "Exhaustive chlorination of aromatic ring carbons over activated carbon catalyst.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Deposition of white chlorothalonil sublimate"
      }
    ]
  },
  {
    "id": "agro-039-metalaxyl-synthesis",
    "name": "Synthesis of metalaxyl acylalanine systemic fungicide",
    "reactants": [
      "2_6_dimethylaniline",
      "c3h6o2_est",
      "ch3cocl"
    ],
    "products": [
      "metalaxyl",
      "hcl"
    ],
    "enthalpyKjPerMol": -118,
    "description": "Acylation of methyl N-(2,6-dimethylphenyl)alaninate intermediate.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "White solid metalaxyl separates"
      }
    ]
  },
  {
    "id": "agro-040-calcium-polysulfide-synthesis",
    "name": "Digestion of sulfur in boiling slaked lime to lime sulfur",
    "reactants": [
      "caoh2",
      "s"
    ],
    "products": [
      "calcium_tetrasulfide",
      "caso4",
      "water"
    ],
    "enthalpyKjPerMol": -160,
    "description": "Reaction of elemental sulfur with slaked lime forming deep ruby-red calcium polysulfide dormant spray.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#F4D03F",
        "colorTo": "#922B21",
        "description": "Bright yellow sulfur dissolves forming deep blood-red liquor"
      }
    ]
  },
  {
    "id": "agro-041-atrazine-synthesis-step1",
    "name": "First substitution of cyanuric chloride with ethylamine",
    "reactants": [
      "cyanuric_chloride",
      "c2h5nh2"
    ],
    "products": [
      "simazine",
      "hcl"
    ],
    "enthalpyKjPerMol": -85,
    "description": "Nucleophilic aromatic substitution of 1,3,5-triazine ring at 0 °C.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "White monoalkylamino chlorotriazine precipitates"
      }
    ]
  },
  {
    "id": "agro-042-atrazine-synthesis-step2",
    "name": "Second substitution of chlorotriazine with isopropylamine to atrazine",
    "reactants": [
      "simazine",
      "isopropylamine"
    ],
    "products": [
      "atrazine",
      "c2h5nh2"
    ],
    "enthalpyKjPerMol": -62,
    "description": "Selective displacement by secondary branched alkylamine at 50 °C yielding atrazine.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Atrazine crystallizes upon cooling"
      }
    ]
  },
  {
    "id": "agro-043-atrazine-abiotic-hydrolysis",
    "name": "Abiotic acid-catalyzed dechlorination of atrazine to hydroxyatrazine",
    "reactants": [
      "atrazine",
      "water"
    ],
    "products": [
      "hydroxyatrazine",
      "hcl"
    ],
    "enthalpyKjPerMol": -35,
    "description": "Soil mineral surface-catalyzed nucleophilic substitution of chlorine by hydroxyl.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Precipitation of insoluble hydroxyatrazine metabolite"
      }
    ]
  },
  {
    "id": "agro-044-atrazine-bacterial-deethylation",
    "name": "Bacterial Cytochrome P450 N-dealkylation of atrazine to deethylatrazine",
    "reactants": [
      "atrazine",
      "o2"
    ],
    "products": [
      "deethylatrazine",
      "ch3cho"
    ],
    "enthalpyKjPerMol": -220,
    "description": "Rhodococcus oxidative N-deethylation yielding prominent groundwater biomarker DEA.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#FFFFFF",
        "colorTo": "#FAFAFA",
        "description": "Pungent acetaldehyde scent detected in head gas"
      }
    ]
  },
  {
    "id": "agro-045-glyphosate-synthesis-ida",
    "name": "Formaldehyde-phosphite Mannich condensation producing glyphosate",
    "reactants": [
      "glycine",
      "hcho",
      "h3po3"
    ],
    "products": [
      "glyphosate",
      "water"
    ],
    "enthalpyKjPerMol": -88,
    "description": "Industrial Mannich-type phosphonomethylation of glycine forming glyphosate.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "White zwitterionic glyphosate precipitates at isoelectric point pH 2.5"
      }
    ]
  },
  {
    "id": "agro-046-glyphosate-ipa-salt",
    "name": "Formulation of glyphosate isopropylamine salt liquid concentrate (Roundup)",
    "reactants": [
      "glyphosate",
      "isopropylamine"
    ],
    "products": [
      "c3h8no5p_salt"
    ],
    "enthalpyKjPerMol": -45,
    "description": "Neutralization of zwitterionic glyphosate with isopropylamine forming highly water-soluble surfactant formulation.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#FFFFFF",
        "colorTo": "#FCF3CF",
        "description": "Clear amber aqueous concentrate forms"
      }
    ]
  },
  {
    "id": "agro-047-glyphosate-microbial-cleavage",
    "name": "Microbial C-N lyase degradation of glyphosate to AMPA",
    "reactants": [
      "glyphosate",
      "o2"
    ],
    "products": [
      "ampa",
      "hcho",
      "co2"
    ],
    "enthalpyKjPerMol": -265,
    "description": "Pseudomonas / Flavobacterium cleavage producing aminomethylphosphonic acid.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Metabolic carbon dioxide evolution"
      }
    ]
  },
  {
    "id": "agro-048-ampa-mineralization",
    "name": "Bacterial phosphatase mineralization of AMPA to phosphate",
    "reactants": [
      "ampa",
      "water"
    ],
    "products": [
      "methylamine",
      "h3po4"
    ],
    "enthalpyKjPerMol": -42,
    "description": "C-P bond lyase enzymatic cleavage releasing inorganic orthophosphate into soil.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#FFFFFF",
        "colorTo": "#FAFAFA",
        "description": "Inorganic phosphate released into soil solution"
      }
    ]
  },
  {
    "id": "agro-049-2-4-d-synthesis",
    "name": "Williamson ether synthesis of 2,4-D herbicide",
    "reactants": [
      "2_4_dichlorophenol",
      "chloroacetic_acid",
      "naoh"
    ],
    "products": [
      "2_4_d",
      "nacl",
      "water"
    ],
    "enthalpyKjPerMol": -115,
    "description": "Condensation of 2,4-dichlorophenol with chloroacetate in alkaline medium followed by acidification.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Heavy crystalline precipitation of 2,4-D upon acidification"
      }
    ]
  },
  {
    "id": "agro-050-2-4-d-dma-salt",
    "name": "Formulation of 2,4-D dimethylamine aqueous salt",
    "reactants": [
      "2_4_d",
      "dimethylamine"
    ],
    "products": [
      "c10h13cl2no3_salt"
    ],
    "enthalpyKjPerMol": -52,
    "description": "Exothermic amine salt formation producing water-soluble non-volatile post-emergence spray.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Exothermic neutralization into clear amber solution"
      }
    ]
  },
  {
    "id": "agro-051-mcpa-synthesis",
    "name": "Williamson etherification manufacturing MCPA selective auxin herbicide",
    "reactants": [
      "4_chloro_2_methylphenol",
      "chloroacetic_acid",
      "naoh"
    ],
    "products": [
      "mcpa",
      "nacl",
      "water"
    ],
    "enthalpyKjPerMol": -112,
    "description": "Coupling of 4-chloro-o-cresol with sodium chloroacetate.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Flakes of MCPA crystallize"
      }
    ]
  },
  {
    "id": "agro-052-dicamba-etherification",
    "name": "Williamson methylation of 3,6-dichlorosalicylic acid to dicamba",
    "reactants": [
      "3_6_dichlorosalicylic_acid",
      "ch3cl",
      "naoh"
    ],
    "products": [
      "dicamba",
      "nacl",
      "water"
    ],
    "enthalpyKjPerMol": -105,
    "description": "Selective phenolic O-methylation producing dicamba herbicide.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "White solid dicamba precipitates upon acid wash"
      }
    ]
  },
  {
    "id": "agro-053-alachlor-hydrolysis",
    "name": "Abiotic dechlorination hydrolysis of alachlor in soil",
    "reactants": [
      "alachlor",
      "water"
    ],
    "products": [
      "hydroxy_alachlor",
      "hcl"
    ],
    "enthalpyKjPerMol": -38,
    "description": "Soil water nucleophilic displacement of alpha-chloro substituent forming hydroxyalachlor.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "White solid hydroxyalachlor separates"
      }
    ]
  },
  {
    "id": "agro-054-metolachlor-hydrolysis",
    "name": "Abiotic dechlorination hydrolysis of metolachlor",
    "reactants": [
      "metolachlor",
      "water"
    ],
    "products": [
      "hydroxy_metolachlor",
      "hcl"
    ],
    "enthalpyKjPerMol": -36,
    "description": "Aqueous displacement of chloro group generating benign hydroxymetolachlor metabolite.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#F9E79F",
        "colorTo": "#FFFFFF",
        "description": "Decolorization of herbicide emulsion"
      }
    ]
  },
  {
    "id": "agro-055-glufosinate-salt-synthesis",
    "name": "Neutralization forming glufosinate-ammonium herbicide (Basta)",
    "reactants": [
      "glufosinate",
      "ammonia"
    ],
    "products": [
      "glufosinate_ammonium"
    ],
    "enthalpyKjPerMol": -62,
    "description": "Reaction of glufosinate amino acid phosphinate with ammonia.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "White microcrystalline glufosinate-ammonium precipitates"
      }
    ]
  },
  {
    "id": "agro-056-paraquat-quaternization",
    "name": "Quaternization of 4,4'-bipyridine with chloromethane to paraquat",
    "reactants": [
      "4_4_bipyridine",
      "ch3cl"
    ],
    "products": [
      "paraquat_dichloride"
    ],
    "enthalpyKjPerMol": -145,
    "description": "Double Menshutkin nucleophilic substitution producing yellow methyl viologen dichloride.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#F4D03F",
        "description": "Bright yellow crystals of paraquat dichloride separate"
      }
    ]
  },
  {
    "id": "agro-057-diquat-cyclization",
    "name": "Quaternization of 2,2'-bipyridine with 1,2-dibromoethane to diquat",
    "reactants": [
      "2_2_bipyridine",
      "c2h4br2"
    ],
    "products": [
      "diquat_dibromide"
    ],
    "enthalpyKjPerMol": -135,
    "description": "Intramolecular ethylene-bridged bis-quaternization forming rigid diquat dibromide.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#F5B041",
        "description": "Yellow-orange diquat crystals precipitate"
      }
    ]
  },
  {
    "id": "agro-058-paraquat-anion-metathesis",
    "name": "Metathesis of paraquat dichloride with sodium iodide",
    "reactants": [
      "paraquat_dichloride",
      "nai"
    ],
    "products": [
      "paraquat_diiodide",
      "nacl"
    ],
    "enthalpyKjPerMol": -18,
    "description": "Halide exchange equilibrium forming deep orange paraquat diiodide salt.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#F4D03F",
        "colorTo": "#D4AC0D",
        "description": "Deeper orange-brown color of viologen iodide develops"
      }
    ]
  },
  {
    "id": "agro-059-glyphosate-complexation-ca",
    "name": "Hard-water calcium antagonism and inactivation of glyphosate",
    "reactants": [
      "glyphosate",
      "cacl2"
    ],
    "products": [
      "c3h6canno5p_salt",
      "hcl"
    ],
    "enthalpyKjPerMol": -28,
    "description": "Chelation of divalent Ca2+ in hard spray tank water deactivating glyphosate weed uptake.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Cloudy colloidal calcium glyphosate complex separates"
      }
    ]
  },
  {
    "id": "agro-060-ams-hard-water-conditioning",
    "name": "Ammonium sulfate spray-water conditioning protecting glyphosate",
    "reactants": [
      "cacl2",
      "nh4-2-so4"
    ],
    "products": [
      "caso4",
      "ammonium-chloride"
    ],
    "enthalpyKjPerMol": -15,
    "description": "Adjuvant gypsum precipitation preventing calcium from binding glyphosate active ingredient.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Fine calcium sulfate precipitate conditions hard water"
      }
    ]
  },
  {
    "id": "agro-061-bordeaux-mixture-precipitation",
    "name": "Precipitation of Bordeaux mixture fungicide",
    "reactants": [
      "cuso4",
      "caoh2"
    ],
    "products": [
      "cuoh2",
      "caso4"
    ],
    "enthalpyKjPerMol": -62,
    "description": "Mixing copper sulfate with slaked lime forming historic protectant vineyard spray.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#3498DB",
        "description": "Sky-blue gelatinous cupric hydroxide-gypsum suspension precipitates"
      }
    ]
  },
  {
    "id": "agro-062-burgundy-mixture-precipitation",
    "name": "Precipitation of Burgundy mixture fungicide with washing soda",
    "reactants": [
      "cuso4",
      "na2co3",
      "water"
    ],
    "products": [
      "cu2co3_oh_2",
      "na2so4",
      "co2"
    ],
    "enthalpyKjPerMol": -75,
    "description": "Basic copper carbonate precipitation without lime residue for ornamental foliage.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Carbon dioxide effervescence"
      },
      {
        "type": "precipitation",
        "colorTo": "#1ABC9C",
        "description": "Turquoise basic copper carbonate flocculates"
      }
    ]
  },
  {
    "id": "agro-063-copper-oxychloride-metathesis",
    "name": "Precipitation of copper oxychloride fungicide from copper sulfate",
    "reactants": [
      "cuso4",
      "naoh",
      "nacl"
    ],
    "products": [
      "copper_oxychloride",
      "na2so4"
    ],
    "enthalpyKjPerMol": -180,
    "description": "Alkaline brine precipitation producing protectant copper oxychloride fungicide.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#1ABC9C",
        "description": "Dense sea-green copper oxychloride precipitate separates"
      }
    ]
  },
  {
    "id": "agro-064-fe-edta-chelation",
    "name": "Synthesis of sodium ferric ethylenediaminetetraacetate (Fe-EDTA)",
    "reactants": [
      "fecl3",
      "edta_tetrasodium"
    ],
    "products": [
      "fe_edta",
      "nacl"
    ],
    "enthalpyKjPerMol": -98,
    "description": "Coordination of Fe(III) by hexadentate EDTA ligand forming yellow-brown bioavailable iron fertilizer.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#B03A2E",
        "colorTo": "#F5B041",
        "description": "Deep reddish-brown ferric chloride shifts to yellow-amber Fe-EDTA complex"
      }
    ]
  },
  {
    "id": "agro-065-zn-edta-chelation",
    "name": "Formulation of disodium zinc EDTA micronutrient chelate",
    "reactants": [
      "znso4",
      "edta_tetrasodium"
    ],
    "products": [
      "zn_edta",
      "na2so4"
    ],
    "enthalpyKjPerMol": -82,
    "description": "Exothermic sequestration of zinc ion preventing insoluble carbonate and hydroxide precipitation.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Exothermic ligand coordination"
      }
    ]
  },
  {
    "id": "agro-066-mn-edta-chelation",
    "name": "Synthesis of manganese EDTA fertilizer chelate",
    "reactants": [
      "mnso4",
      "edta_tetrasodium"
    ],
    "products": [
      "mn_edta",
      "na2so4"
    ],
    "enthalpyKjPerMol": -76,
    "description": "Chelation stabilizing Mn(II) against air oxidation to insoluble MnO2 in alkaline soils.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#FADBD8",
        "colorTo": "#FFFFFF",
        "description": "Pale pink turns into clear water-soluble manganese chelate"
      }
    ]
  },
  {
    "id": "agro-067-cu-edta-chelation",
    "name": "Formulation of disodium copper EDTA micronutrient spray",
    "reactants": [
      "cuso4",
      "edta_tetrasodium"
    ],
    "products": [
      "cu_edta",
      "na2so4"
    ],
    "enthalpyKjPerMol": -115,
    "description": "Strong chelation of copper(II) forming intense royal blue non-phytotoxic complex.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#2980B9",
        "colorTo": "#1B4F72",
        "description": "Light blue shifts to intense deep royal blue Cu-EDTA solution"
      }
    ]
  },
  {
    "id": "agro-068-aluminum-sulfate-liming",
    "name": "Liming precipitation of soluble aluminum sulfate with slaked lime",
    "reactants": [
      "al2-so4-3",
      "caoh2"
    ],
    "products": [
      "al-oh-3",
      "caso4"
    ],
    "enthalpyKjPerMol": -180,
    "description": "Neutralization of soil acidity and precipitation of phytotoxic aluminum by hydrated lime.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "White gelatinous aluminum hydroxide and gypsum precipitate"
      }
    ]
  },
  {
    "id": "agro-069-borax-boric-acid-buffer",
    "name": "Boric acid-borate buffer foliar equilibrium",
    "reactants": [
      "na2b4o7",
      "h2so4",
      "water"
    ],
    "products": [
      "h3bo3",
      "na2so4"
    ],
    "enthalpyKjPerMol": -68,
    "description": "Acidification of natural tincal borax yielding pure orthoboric acid.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Pearly white plates of boric acid crystallize upon cooling"
      }
    ]
  },
  {
    "id": "agro-070-zinc-basic-carbonate",
    "name": "Precipitation of basic zinc carbonate micronutrient dispersion",
    "reactants": [
      "znso4",
      "na2co3",
      "water"
    ],
    "products": [
      "znco3_basic",
      "na2so4",
      "co2"
    ],
    "enthalpyKjPerMol": -85,
    "description": "Precipitation of fine micronized zinc carbonate for suspension fertilizer sprays.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Carbon dioxide gas evolution"
      },
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Fine white insoluble zinc carbonate powder forms"
      }
    ]
  },
  {
    "id": "agro-071-potassium-phosphite-synthesis",
    "name": "Synthesis of potassium phosphite systemic fungicide/biostimulant",
    "reactants": [
      "h3po3",
      "koh"
    ],
    "products": [
      "k2hpo3",
      "water"
    ],
    "enthalpyKjPerMol": -125,
    "description": "Neutralization of phosphorous acid to potassium phosphite inducing systemic acquired resistance against Phytophthora.",
    "reactionType": "acid_base_neutralization",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Strong neutralization exotherm"
      }
    ]
  },
  {
    "id": "agro-072-copper-hydroxide-nitrate-synthesis",
    "name": "Caustic precipitation of microcrystalline copper hydroxide fungicide",
    "reactants": [
      "cuno32",
      "naoh"
    ],
    "products": [
      "cuoh2",
      "nano3"
    ],
    "enthalpyKjPerMol": -75,
    "description": "Controlled precipitation of blue cupric hydroxide active ingredient for protectant crop sprays.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#3498DB",
        "description": "Brilliant cerulean blue gelatinous precipitate forms"
      }
    ]
  },
  {
    "id": "agro-073-sulfur-peroxide-soil-oxidation",
    "name": "Peroxide accelerated oxidation of elemental sulfur for soil treatment",
    "reactants": [
      "s",
      "h2o2"
    ],
    "products": [
      "h2so4",
      "water"
    ],
    "enthalpyKjPerMol": -480,
    "description": "Chemical oxidation of agricultural sulfur generating sulfuric acid.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Violent exotherm with complete sulfur dissolution"
      }
    ]
  },
  {
    "id": "agro-074-zinc-oxide-phosphoric-acidulation",
    "name": "Phosphoric acid conversion of zinc oxide to zinc phosphate",
    "reactants": [
      "zno",
      "h3po4"
    ],
    "products": [
      "zn3-po4-2",
      "water"
    ],
    "enthalpyKjPerMol": -165,
    "description": "Acid digestion of agricultural zinc oxide to insoluble slow-release zinc phosphate.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Fine white microcrystalline zinc phosphate precipitates"
      }
    ]
  },
  {
    "id": "agro-075-manganese-carbonate-acidulation",
    "name": "Sulfuric acid acidulation of rhodochrosite to manganese sulfate",
    "reactants": [
      "mnco3",
      "h2so4"
    ],
    "products": [
      "mnso4",
      "co2",
      "water"
    ],
    "enthalpyKjPerMol": -118,
    "description": "Acid digestion of pink manganese carbonate ore for fertilizer blending.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Rapid carbon dioxide effervescence"
      },
      {
        "type": "color_change",
        "colorFrom": "#FADBD8",
        "colorTo": "#FDEDEC",
        "description": "Pink ore dissolves into pale rose liquid"
      }
    ]
  },
  {
    "id": "agro-076-iron-chelate-alkaline-cleavage",
    "name": "Alkaline precipitation of ferric hydroxide from Fe-EDTA",
    "reactants": [
      "fe_edta",
      "naoh"
    ],
    "products": [
      "feoh3",
      "edta_tetrasodium"
    ],
    "enthalpyKjPerMol": -45,
    "description": "Hydroxide demetallation of Fe-EDTA complex at high pH.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#935116",
        "description": "Rust-brown ferric hydroxide precipitates"
      }
    ]
  },
  {
    "id": "agro-077-calcium-nitrate-ammoniation",
    "name": "Ammoniation of burnt lime with ammonium nitrate",
    "reactants": [
      "cao",
      "nh4no3"
    ],
    "products": [
      "ca-no3-2",
      "ammonia",
      "water"
    ],
    "enthalpyKjPerMol": -32,
    "description": "Manufacturing greenhouse water-soluble calcium nitrate fertilizer.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Evolution of ammonia gas"
      }
    ]
  },
  {
    "id": "agro-078-magnesium-nitrate-ammoniation",
    "name": "Metathesis of magnesium hydroxide with ammonium nitrate",
    "reactants": [
      "mgoh2",
      "nh4no3"
    ],
    "products": [
      "mg-no3-2",
      "ammonia",
      "water"
    ],
    "enthalpyKjPerMol": 22,
    "description": "Production of high-solubility 11-0-0-9.6Mg fertigation grade magnesium nitrate.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Ammonia outgassing"
      }
    ]
  },
  {
    "id": "agro-079-urea-phosphate-potassium-neutralization",
    "name": "Neutralization of urea phosphate with potassium hydroxide for N-P-K fertigation",
    "reactants": [
      "urea_phosphate",
      "koh"
    ],
    "products": [
      "kh2po4",
      "urea",
      "water"
    ],
    "enthalpyKjPerMol": -75,
    "description": "Alkaline neutralization yielding chlorine-free crystalline monopotassium phosphate and free urea fertilizer.",
    "reactionType": "acid_base_neutralization",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Neutralization exotherm forming clear N-P-K liquid"
      }
    ]
  },
  {
    "id": "agro-080-potassium-thiosulfate-synthesis",
    "name": "Synthesis of potassium thiosulfate (KTS) 0-0-25-17S liquid fertilizer",
    "reactants": [
      "koh",
      "so2",
      "s"
    ],
    "products": [
      "k2s2o3",
      "water"
    ],
    "enthalpyKjPerMol": -240,
    "description": "Absorption of sulfur dioxide in potassium hydroxide with elemental sulfur forming clear neutral KTS.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#F4D03F",
        "colorTo": "#FFFFFF",
        "description": "Yellow sulfur dissolves yielding crystal-clear high-analysis liquid"
      }
    ]
  },
  {
    "id": "agro-081-soil-nitrification-ammonium-chloride",
    "name": "Soil biological nitrification of ammonium chloride to nitrous acid",
    "reactants": [
      "ammonium-chloride",
      "o2"
    ],
    "products": [
      "hno2",
      "hcl",
      "water"
    ],
    "enthalpyKjPerMol": -280,
    "description": "Autotrophic oxidation of fertilizer ammonium chloride acidifying soil rhizosphere.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Biological nitrification heat release"
      }
    ]
  },
  {
    "id": "agro-082-soil-nitrification-step2",
    "name": "Soil bacterial oxidation of nitrite to nitric acid (Nitrobacter)",
    "reactants": [
      "hno2",
      "o2"
    ],
    "products": [
      "hno3"
    ],
    "enthalpyKjPerMol": -75,
    "description": "Rapid bio-oxidation converting toxic nitrite to plant-available nitrate anion.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#FFFFFF",
        "colorTo": "#FAFAFA",
        "description": "Oxidation of nitrite in soil pore water"
      }
    ]
  },
  {
    "id": "agro-083-soil-denitrification",
    "name": "Anoxic heterotrophic soil denitrification converting nitrate to nitrogen gas",
    "reactants": [
      "hno3",
      "ch3cooh"
    ],
    "products": [
      "n2",
      "co2",
      "water"
    ],
    "enthalpyKjPerMol": -1120,
    "description": "Anaerobic microbial respiration in waterlogged soils causing agronomic nitrogen gas loss.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Evolution of molecular nitrogen and carbon dioxide from saturated soil"
      }
    ]
  },
  {
    "id": "agro-084-quicklime-phosphoric-superphosphate",
    "name": "Quicklime neutralization with phosphoric acid producing triple superphosphate",
    "reactants": [
      "cao",
      "h3po4"
    ],
    "products": [
      "triple_superphosphate",
      "water"
    ],
    "enthalpyKjPerMol": -175,
    "description": "Direct acidulation of burnt lime with wet-process phosphoric acid producing concentrated triple superphosphate.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Strong exotherm with white crystallization"
      }
    ]
  },
  {
    "id": "agro-085-soil-dolomite-calcination",
    "name": "Thermal calcination of agricultural dolomite mineral",
    "reactants": [
      "camgco32_dolomite"
    ],
    "products": [
      "cao",
      "mgo",
      "co2"
    ],
    "enthalpyKjPerMol": 305,
    "description": "Rotary kiln thermal decomposition of dolomite producing high-reactivity agricultural cal-mag lime.",
    "reactionType": "decomposition",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Vigorous carbon dioxide outgassing at 900 °C"
      }
    ]
  },
  {
    "id": "agro-086-aluminum-toxicity-precipitation",
    "name": "Precipitation of phytotoxic trivalent aluminum by liming",
    "reactants": [
      "alcl3",
      "caoh2"
    ],
    "products": [
      "al-oh-3",
      "cacl2"
    ],
    "enthalpyKjPerMol": -115,
    "description": "Detoxification of mobile Al3+ ions below pH 5.0 into insoluble gibbsite.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "White gelatinous aluminum hydroxide precipitates"
      }
    ]
  },
  {
    "id": "agro-087-soil-acidification-sulfur",
    "name": "Microbial oxidation of elemental sulfur for blueberry soil acidification (Thiobacillus)",
    "reactants": [
      "s",
      "o2",
      "water"
    ],
    "products": [
      "h2so4"
    ],
    "enthalpyKjPerMol": -580,
    "description": "Autotrophic bacterial oxidation lowering pH of calcareous soils to optimal 4.5-5.2 for acidophilic crops.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#F4D03F",
        "colorTo": "#FFFFFF",
        "description": "Yellow sulfur granules disappear as strong acidity develops"
      }
    ]
  },
  {
    "id": "agro-088-soil-pyrite-acidification",
    "name": "Weathering oxidation of soil pyrite in acid sulfate soils",
    "reactants": [
      "fes2",
      "o2",
      "water"
    ],
    "products": [
      "feso4",
      "h2so4"
    ],
    "enthalpyKjPerMol": -1440,
    "description": "Drainage and aeration of coastal mangrove cat clays generating catastrophic sulfuric acid toxicity.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#7D6608",
        "colorTo": "#935116",
        "description": "Yellow-brown jarosite and rust mottles form in subsoil"
      }
    ]
  },
  {
    "id": "agro-089-phosphate-fixation-iron-strengite",
    "name": "Phosphate fixation in acidic red soils forming insoluble strengite",
    "reactants": [
      "fecl3",
      "h3po4",
      "water"
    ],
    "products": [
      "strengite",
      "hcl"
    ],
    "enthalpyKjPerMol": -48,
    "description": "Fixation of soluble fertilizer orthophosphate by reactive ferric oxides in acidic tropical oxisols.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#AF7AC5",
        "description": "Pinkish-lavender microcrystalline strengite locks up available phosphorus"
      }
    ]
  },
  {
    "id": "agro-090-phosphate-fixation-aluminum-variscite",
    "name": "Phosphate fixation by aluminum in acidic soils forming variscite",
    "reactants": [
      "alcl3",
      "h3po4",
      "water"
    ],
    "products": [
      "variscite",
      "hcl"
    ],
    "enthalpyKjPerMol": -52,
    "description": "Fixation of phosphate fertilizer on kaolinite and gibbsite surfaces as insoluble variscite.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#73C6B6",
        "description": "Pale green-white variscite mineral fixes fertilizer phosphorus"
      }
    ]
  },
  {
    "id": "agro-091-phosphate-fixation-calcite-hydroxyapatite",
    "name": "Phosphate fixation in calcareous alkaline soils forming hydroxyapatite",
    "reactants": [
      "cacl2",
      "h3po4",
      "caoh2"
    ],
    "products": [
      "hydroxyapatite",
      "hcl",
      "water"
    ],
    "enthalpyKjPerMol": -380,
    "description": "Precipitation of soluble phosphorus onto calcite surfaces forming highly insoluble hydroxyapatite.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Dense white insoluble apatite crust precipitates"
      }
    ]
  },
  {
    "id": "agro-092-anaerobic-vivianite-formation",
    "name": "Biogeochemical precipitation of vivianite in waterlogged paddy soils",
    "reactants": [
      "fecl2",
      "monoammonium_phosphate",
      "ammonia",
      "water"
    ],
    "products": [
      "vivianite",
      "ammonium-chloride"
    ],
    "enthalpyKjPerMol": -165,
    "description": "Reduction of ferric iron to ferrous iron under flooded rice cultivation precipitating vivianite.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#2E86C1",
        "description": "Indigo-blue vivianite nodules crystallize in gleyed soil horizon"
      }
    ]
  },
  {
    "id": "agro-093-sodic-soil-gypsum-remediation",
    "name": "Gypsum displacement of exchangeable sodium in sodic agricultural soils",
    "reactants": [
      "caso4",
      "nacl"
    ],
    "products": [
      "cacl2",
      "na2so4"
    ],
    "enthalpyKjPerMol": -12,
    "description": "Calcium ion exchange on clay surfaces replacing dispersed Na+ to flocculate soil structure and restore water infiltration.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "phase_change",
        "description": "Flocculation and clearing of dispersed muddy clay suspension"
      }
    ]
  },
  {
    "id": "agro-094-iron-chlorosis-reduction",
    "name": "Biogeochemical reduction of ferric iron by sulfide in flooded paddy soils",
    "reactants": [
      "fecl3",
      "na2s"
    ],
    "products": [
      "fecl2",
      "s",
      "nacl"
    ],
    "enthalpyKjPerMol": -145,
    "description": "Anaerobic microbial and chemical reduction converting insoluble Fe(III) to plant-absorbable Fe(II) with sulfur precipitation.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#B03A2E",
        "colorTo": "#A2D9CE",
        "description": "Rust-red ferric solution turns pale green ferrous with colloidal sulfur"
      }
    ]
  },
  {
    "id": "agro-095-potassium-polyphosphate-thermal",
    "name": "Thermal synthesis of potassium metaphosphate fertilizer",
    "reactants": [
      "kh2po4"
    ],
    "products": [
      "potassium_polyphosphate",
      "water"
    ],
    "enthalpyKjPerMol": 48,
    "description": "High-temperature dehydration yielding zero-chloride PK fertilizer.",
    "reactionType": "decomposition",
    "observableEffects": [
      {
        "type": "phase_change",
        "description": "Molten polyphosphate glass forms at 800 °C"
      }
    ]
  },
  {
    "id": "agro-096-ammonium-volatilization-stripping",
    "name": "Ammoniation of urea phosphate producing monoammonium phosphate and urea",
    "reactants": [
      "urea_phosphate",
      "ammonia"
    ],
    "products": [
      "monoammonium_phosphate",
      "urea"
    ],
    "enthalpyKjPerMol": -45,
    "description": "Direct ammoniation yielding balanced high-analysis solid nitrogen-phosphorus fertilizer blend.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Exothermic ammoniation forming solid fertilizer salt mixture"
      }
    ]
  },
  {
    "id": "agro-097-humic-acid-iron-complexation",
    "name": "Chelation of ferric iron by natural citric acid root exudate",
    "reactants": [
      "fecl3",
      "c6h8o7_citric"
    ],
    "products": [
      "fe_citrate_complex",
      "hcl"
    ],
    "enthalpyKjPerMol": -85,
    "description": "Natural organic acid exudate solubilizing iron in the plant root rhizosphere.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#B03A2E",
        "colorTo": "#F4D03F",
        "description": "Red-brown ferric chloride forms clear greenish-yellow soluble organic chelate"
      }
    ]
  },
  {
    "id": "agro-098-rhizosphere-oxalate-aluminum-detox",
    "name": "Root exudation of oxalic acid detoxifying aluminum in acid soils",
    "reactants": [
      "alcl3",
      "h2c2o4",
      "naoh"
    ],
    "products": [
      "al_oxalate_complex",
      "nacl",
      "water"
    ],
    "enthalpyKjPerMol": -110,
    "description": "Aluminum-activated malate/oxalate transporter (ALMT) exudate forming non-phytotoxic chelate.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#FFFFFF",
        "colorTo": "#FAFAFA",
        "description": "Protection of root apical meristem"
      }
    ]
  },
  {
    "id": "agro-099-rhizosphere-ph-drop-ammonium-uptake",
    "name": "Magnesium hydroxide (brucite) liming displacement of ammonium in acidic soil",
    "reactants": [
      "ammonium-chloride",
      "mgoh2"
    ],
    "products": [
      "ammonia",
      "mgcl2",
      "water"
    ],
    "enthalpyKjPerMol": 22,
    "description": "Alkaline brucite neutralizes ammonium chloride, releasing ammonia gas while supplying essential magnesium cations.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Slow ammonia gas evolution"
      }
    ]
  },
  {
    "id": "agro-100-potassium-nitrate-acidulation",
    "name": "Phosphoric acid conversion of potassium nitrate to monopotassium phosphate",
    "reactants": [
      "kno3",
      "h3po4"
    ],
    "products": [
      "kh2po4",
      "hno3"
    ],
    "enthalpyKjPerMol": -15,
    "description": "Acid conversion yielding pure monopotassium phosphate hydroponic nutrient.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#FFFFFF",
        "colorTo": "#FAFAFA",
        "description": "Clear solution of hydroponic nutrients forms"
      }
    ]
  }
];
