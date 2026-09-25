// Domain 41: Clinical Diagnostics, Biosensors & Medical Biochemistry (100 reactions)
import type { ReactionDefinition } from "./types.js";

export const DOMAIN_41_REACTIONS: ReactionDefinition[] = [
  {
    "id": "clinic-001-glucose-ferricyanide-mediator",
    "name": "Ferricyanide-mediated amperometric blood glucose test strip",
    "reactants": [
      "c6h12o6",
      "k3fe_cn6",
      "koh"
    ],
    "products": [
      "c6h12o7_gluconic",
      "k4fe_cn6",
      "water"
    ],
    "enthalpyKjPerMol": -110,
    "description": "Glucose dehydrogenase/oxidase transfers electrons to ferricyanide mediator producing yellow-to-colorless ferrocyanide current at +400 mV.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#F4D03F",
        "colorTo": "#EAEDED",
        "description": "Yellow ferricyanide reduces to pale/colorless ferrocyanide"
      }
    ]
  },
  {
    "id": "clinic-002-gdl-lactonase-hydrolysis",
    "name": "Gluconolactone hydrolysis to D-gluconic acid in glucose biosensors",
    "reactants": [
      "glucono_delta_lactone",
      "water"
    ],
    "products": [
      "c6h12o7_gluconic"
    ],
    "enthalpyKjPerMol": -22,
    "description": "Spontaneous and lactonase-catalyzed opening of the cyclic lactone ring following glucose oxidation.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Mild hydration exotherm"
      }
    ]
  },
  {
    "id": "clinic-003-cholesterol-oxidase-lipid-panel",
    "name": "Cholesterol oxidase enzymatic oxidation in diagnostic lipid profiles",
    "reactants": [
      "cholesterol",
      "o2"
    ],
    "products": [
      "cholest_4_en_3_one",
      "h2o2"
    ],
    "enthalpyKjPerMol": -180,
    "description": "Enzymatic conversion of free serum cholesterol to cholest-4-en-3-one and stoichiometric hydrogen peroxide for colorimetric quantitation.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#FFFFFF",
        "colorTo": "#FAFAFA",
        "description": "Lipid dispersion clarifies as stoichiometric H2O2 is generated"
      }
    ]
  },
  {
    "id": "clinic-004-uricase-urate-oxidase-gout",
    "name": "Uricase enzymatic oxidation of uric acid in clinical hyperuricemia assays",
    "reactants": [
      "uric_acid",
      "o2",
      "water"
    ],
    "products": [
      "allantoin",
      "h2o2",
      "co2"
    ],
    "enthalpyKjPerMol": -215,
    "description": "Diagnostic enzymatic destruction of purine uric acid yielding highly water-soluble allantoin, peroxide, and carbon dioxide.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Microscopic carbon dioxide effervescence"
      }
    ]
  },
  {
    "id": "clinic-005-creatininase-hydrolysis",
    "name": "Creatininase enzymatic ring-opening of creatinine to creatine",
    "reactants": [
      "creatinine",
      "water"
    ],
    "products": [
      "creatine"
    ],
    "enthalpyKjPerMol": -18,
    "description": "First step of the enzymatic cascade for renal function testing converting cyclic creatinine to linear creatine.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#FFFFFF",
        "colorTo": "#FFFFFF",
        "description": "Dissolution into clear aqueous solution"
      }
    ]
  },
  {
    "id": "clinic-006-creatinase-urea-sarcosine-cleavage",
    "name": "Creatinase enzymatic hydrolysis of creatine to sarcosine and urea",
    "reactants": [
      "creatine",
      "water"
    ],
    "products": [
      "sarcosine",
      "ch4n2o"
    ],
    "enthalpyKjPerMol": -15,
    "description": "Second step in multi-enzyme clinical creatinine dry-slide testing generating sarcosine and urea.",
    "reactionType": "decomposition",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Mild hydrolytic exotherm"
      }
    ]
  },
  {
    "id": "clinic-007-sarcosine-oxidase-peroxide-generation",
    "name": "Sarcosine oxidase enzymatic oxidation in clinical creatinine biosensors",
    "reactants": [
      "sarcosine",
      "o2",
      "water"
    ],
    "products": [
      "glycine",
      "hcho",
      "h2o2"
    ],
    "enthalpyKjPerMol": -195,
    "description": "Terminal enzyme in creatinine biosensor generating stoichiometric peroxide detected by electrochemical electrodes.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#FFFFFF",
        "colorTo": "#FAFAFA",
        "description": "Generation of reactive hydrogen peroxide"
      }
    ]
  },
  {
    "id": "clinic-008-lactate-biosensor-ferricyanide",
    "name": "Lactate biosensor ferricyanide electrochemical transduction",
    "reactants": [
      "c3h6o3_lactic",
      "k3fe_cn6",
      "koh"
    ],
    "products": [
      "c3h4o3_pyruvate",
      "k4fe_cn6",
      "water"
    ],
    "enthalpyKjPerMol": -125,
    "description": "Whole-blood sepsis lactate sensor transferring electrons via ferricyanide mediator to avoid direct oxygen dependency.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#F4D03F",
        "colorTo": "#EAEDED",
        "description": "Yellow ferricyanide reduces to ferrocyanide"
      }
    ]
  },
  {
    "id": "clinic-009-bilirubin-oxidase-clearing",
    "name": "Bilirubin oxidase enzymatic oxidation in serum interference elimination",
    "reactants": [
      "bilirubin",
      "o2"
    ],
    "products": [
      "biliverdin",
      "water"
    ],
    "enthalpyKjPerMol": -240,
    "description": "Enzymatic conversion of yellow-orange bilirubin to green biliverdin to eliminate spectral interference in clinical spectrophotometry.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#D4AC0D",
        "colorTo": "#1E8449",
        "description": "Yellow-orange icteric serum turns emerald-green biliverdin"
      }
    ]
  },
  {
    "id": "clinic-010-tmb-peroxidase-elisa-chromophore",
    "name": "Horseradish peroxidase TMB oxidation in clinical ELISA diagnostics",
    "reactants": [
      "tmb",
      "h2o2"
    ],
    "products": [
      "tmb_diimine",
      "water"
    ],
    "enthalpyKjPerMol": -190,
    "description": "Horseradish peroxidase (HRP) oxidation of colorless 3,3',5,5'-tetramethylbenzidine to blue charge-transfer complex and yellow diimine.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#FFFFFF",
        "colorTo": "#F4D03F",
        "description": "Colorless solution yields deep yellow diimine chromophore at 450 nm"
      }
    ]
  },
  {
    "id": "clinic-011-glucose-benedict-copper-reduction",
    "name": "Benedict / Fehling test reduction of copper(II) hydroxide by glucose",
    "reactants": [
      "c6h12o6",
      "cuoh2"
    ],
    "products": [
      "cu2o",
      "c6h12o7_gluconic",
      "water"
    ],
    "enthalpyKjPerMol": -95,
    "description": "Reducing aldehyde group of D-glucose reduces insoluble blue cupric hydroxide to brick-red cuprous oxide precipitate.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#B03A2E",
        "description": "Blue alkaline cupric solution deposits brick-red cuprous oxide precipitate"
      }
    ]
  },
  {
    "id": "clinic-012-glucose-tollens-silver-mirror",
    "name": "Tollens silver mirror diagnostic test for reducing monosaccharides",
    "reactants": [
      "c6h12o6",
      "ag2o"
    ],
    "products": [
      "ag",
      "c6h12o7_gluconic"
    ],
    "enthalpyKjPerMol": -160,
    "description": "Oxidation of open-chain aldoses depositing metallic silver mirror on glass diagnostic tubes.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#FFFFFF",
        "colorTo": "#BDC3C7",
        "description": "Bright reflective silver mirror deposits on glassware"
      }
    ]
  },
  {
    "id": "clinic-013-acetoacetate-decarboxylation",
    "name": "Spontaneous decarboxylation of acetoacetic acid to acetone in diabetic ketoacidosis",
    "reactants": [
      "c4h6o3_acetoacetic"
    ],
    "products": [
      "ch3coch3",
      "co2"
    ],
    "enthalpyKjPerMol": -42,
    "description": "Non-enzymatic spontaneous decarboxylation of acetoacetic acid producing volatile acetone breath and carbon dioxide in uncontrolled diabetes.",
    "reactionType": "decomposition",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Evolution of carbon dioxide with characteristic sweet fruity acetone odor"
      }
    ]
  },
  {
    "id": "clinic-014-ethanol-breathalyzer-cro3-oxidation",
    "name": "Chromium trioxide sulfuric acid breathalyzer alcohol oxidation",
    "reactants": [
      "c2h5oh",
      "cro3",
      "h2so4"
    ],
    "products": [
      "ch3cooh",
      "cr2-so4-3",
      "water"
    ],
    "enthalpyKjPerMol": -480,
    "description": "Electrochemical and photometric roadside alcohol screen reducing reddish-orange Cr(VI) to forest green Cr(III) sulfate.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#BA4A00",
        "colorTo": "#1E8449",
        "description": "Red-orange chromium trioxide reduces to deep green chromium(III) sulfate"
      }
    ]
  },
  {
    "id": "clinic-015-urease-bun-enzymatic-hydrolysis",
    "name": "Urease enzymatic hydrolysis in blood urea nitrogen (BUN) assays",
    "reactants": [
      "ch4n2o",
      "water"
    ],
    "products": [
      "ammonia",
      "co2"
    ],
    "enthalpyKjPerMol": -31,
    "description": "Rapid nickel-dependent enzymatic cleavage of blood urea producing alkaline ammonia quantified by Berthelot or glutamate dehydrogenase assays.",
    "reactionType": "decomposition",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Alkaline ammonia and carbon dioxide generation"
      }
    ]
  },
  {
    "id": "clinic-016-alp-p-nitrophenyl-phosphate-cleavage",
    "name": "Alkaline phosphatase (ALP) enzymatic hydrolysis of p-nitrophenyl phosphate",
    "reactants": [
      "p_nitrophenyl_phosphate",
      "water"
    ],
    "products": [
      "p_nitrophenol",
      "h3po4"
    ],
    "enthalpyKjPerMol": -42,
    "description": "Kinetic diagnostic assay assessing biliary obstruction and osteoblastic bone metastases releasing p-nitrophenol.",
    "reactionType": "decomposition",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#FFFFFF",
        "colorTo": "#FFFFFF",
        "description": "Hydrolytic cleavage into free nitrophenol"
      }
    ]
  },
  {
    "id": "clinic-017-p-nitrophenol-alkaline-yellow-chromophore",
    "name": "Alkaline ionization of p-nitrophenol to 405 nm yellow diagnostic chromophore",
    "reactants": [
      "p_nitrophenol",
      "naoh"
    ],
    "products": [
      "c6h4nnao3",
      "water"
    ],
    "enthalpyKjPerMol": -55,
    "description": "Deprotonation of phenolic hydroxyl forming delocalized quinoid phenolate anion with molar absorptivity 18,500 M-1 cm-1 at 405 nm.",
    "reactionType": "acid_base",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#FFFFFF",
        "colorTo": "#F4D03F",
        "description": "Colorless solution instantly develops intense luminous yellow color"
      }
    ]
  },
  {
    "id": "clinic-018-ellman-dtnb-thiol-cleavage",
    "name": "Ellman reagent (DTNB) disulfide reduction generating yellow TNB anion",
    "reactants": [
      "dtnb",
      "h2s"
    ],
    "products": [
      "tnb",
      "s"
    ],
    "enthalpyKjPerMol": -75,
    "description": "Disulfide exchange with biological sulfhydryls yielding intense yellow 2-nitro-5-thiobenzoate anion at 412 nm.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#FEF9E7",
        "colorTo": "#F4D03F",
        "description": "Pale yellow reagent yields vibrant chrome-yellow TNB chromophore"
      }
    ]
  },
  {
    "id": "clinic-019-glutathione-reductase-cycle",
    "name": "Glutathione disulfide enzymatic reduction in red blood cell redox screens",
    "reactants": [
      "gssg",
      "h2"
    ],
    "products": [
      "gsh"
    ],
    "enthalpyKjPerMol": -65,
    "description": "Regeneration of reduced intracellular glutathione protecting erythrocyte membranes from peroxide-induced hemolytic anemia (G6PD deficiency).",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#FFFFFF",
        "colorTo": "#FFFFFF",
        "description": "Enzymatic reduction restoring cellular thiol pool"
      }
    ]
  },
  {
    "id": "clinic-020-biuret-cupric-complexation",
    "name": "Biuret test coordination of peptide bonds by copper(II) hydroxide",
    "reactants": [
      "biuret",
      "cuoh2"
    ],
    "products": [
      "cu_biuret_complex",
      "water"
    ],
    "enthalpyKjPerMol": -68,
    "description": "Chelation of cupric ions by adjacent amide nitrogens forming deep violet-purple square planar coordination complex at 540 nm.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#3498DB",
        "colorTo": "#8E44AD",
        "description": "Light blue cupric suspension dissolves into brilliant royal purple-violet solution"
      }
    ]
  },
  {
    "id": "clinic-021-dmsa-lead-chelation",
    "name": "Succimer (DMSA) heavy metal chelation of lead chloride",
    "reactants": [
      "dmsa",
      "pbcl2"
    ],
    "products": [
      "dmsa_lead_chelate",
      "hcl"
    ],
    "enthalpyKjPerMol": -88,
    "description": "Oral dimercaptosuccinic acid binding divalent lead into a water-soluble 5-membered cyclic chelate excreted renally.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#FFFFFF",
        "colorTo": "#EAEDED",
        "description": "Clear soluble lead mercaptide chelate forms"
      }
    ]
  },
  {
    "id": "clinic-022-ca-edta-lead-displacement",
    "name": "Calcium disodium EDTA lead transmetalation emergency therapy",
    "reactants": [
      "ca_edta",
      "pbno32"
    ],
    "products": [
      "pb_edta",
      "ca-no3-2"
    ],
    "enthalpyKjPerMol": -62,
    "description": "Thermodynamic displacement of calcium (log K = 10.7) by toxic lead (log K = 18.0) in acute pediatric plumbism.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#FFFFFF",
        "colorTo": "#FFFFFF",
        "description": "Formation of ultra-stable soluble lead EDTA complex"
      }
    ]
  },
  {
    "id": "clinic-023-calcium-gluconate-hf-burn-antidote",
    "name": "Calcium gluconate precipitation of toxic fluoride in hydrofluoric acid burns",
    "reactants": [
      "calcium_gluconate",
      "hf"
    ],
    "products": [
      "caf2",
      "c6h12o7_gluconic"
    ],
    "enthalpyKjPerMol": -145,
    "description": "Emergency topical and intra-arterial neutralization immobilizing free fluoride ions as insoluble CaF2 to avert lethal cardiac arrest.",
    "reactionType": "precipitation",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Precipitation of insoluble white calcium fluoride mineral"
      }
    ]
  },
  {
    "id": "clinic-024-deferoxamine-iron-chelation",
    "name": "Deferoxamine hexadentate chelation of toxic ferric iron",
    "reactants": [
      "deferoxamine",
      "fecl3"
    ],
    "products": [
      "ferrioxamine",
      "hcl"
    ],
    "enthalpyKjPerMol": -135,
    "description": "Bacterial siderophore chelating free iron from acute ferrous sulfate overdose into reddish-brown ferrioxamine excreted in urine.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#FADBD8",
        "colorTo": "#C0392B",
        "description": "Solution turns characteristic vin-rose reddish-brown ferrioxamine"
      }
    ]
  },
  {
    "id": "clinic-025-penicillamine-copper-chelation",
    "name": "D-Penicillamine cupriuresis chelation in Wilson's disease",
    "reactants": [
      "penicillamine",
      "cucl2"
    ],
    "products": [
      "penicillamine_cu_chelate",
      "hcl"
    ],
    "enthalpyKjPerMol": -96,
    "description": "Bidentate amino-thiol coordination of pathological hepatic and cerebral copper deposits promoting massive urinary excretion.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#85C1E9",
        "colorTo": "#34495E",
        "description": "Light blue cupric solution turns dark blue-purple copper thiolate chelate"
      }
    ]
  },
  {
    "id": "clinic-026-rhodanese-hcn-detoxification",
    "name": "Mitochondrial rhodanese sulfur transfer detoxifying hydrogen cyanide gas",
    "reactants": [
      "hcn",
      "na2s2o3"
    ],
    "products": [
      "nahso3",
      "nascn"
    ],
    "enthalpyKjPerMol": -115,
    "description": "Hepatic rhodanese transfers sulfane sulfur from thiosulfate to lethal cyanide converting it to non-toxic thiocyanate excreted renally.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Exothermic enzymatic sulfur transfer"
      }
    ]
  },
  {
    "id": "clinic-027-sodium-nitrite-acidification-methb",
    "name": "Acidification of sodium nitrite producing reactive nitrous gases for methemoglobin induction",
    "reactants": [
      "nano2",
      "h2so4"
    ],
    "products": [
      "na2so4",
      "no",
      "no2",
      "water"
    ],
    "enthalpyKjPerMol": -82,
    "description": "Cyanide antidote kit component generating active nitrogen oxides to oxidize Hb(Fe2+) to MetHb(Fe3+) which avidly traps cyanide.",
    "reactionType": "decomposition",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Evolution of reddish-brown nitrogen dioxide and nitric oxide fumes"
      }
    ]
  },
  {
    "id": "clinic-028-fomepizole-acid-neutralization",
    "name": "Fomepizole neutralization by hydrochloric acid during pharmaceutical preparation",
    "reactants": [
      "fomepizole",
      "hcl"
    ],
    "products": [
      "c4h7cln2"
    ],
    "enthalpyKjPerMol": -48,
    "description": "Preparation of water-soluble 4-methylpyrazole hydrochloride salt for intravenous infusion in methanol/antifreeze poisoning.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Exothermic basic amine neutralization"
      }
    ]
  },
  {
    "id": "clinic-029-nac-neutralization-infusion",
    "name": "N-Acetylcysteine sodium salt formation for intravenous Parvolex infusion",
    "reactants": [
      "acetylcysteine",
      "naoh"
    ],
    "products": [
      "c5h8nnao3s_nac_sodium",
      "water"
    ],
    "enthalpyKjPerMol": -56,
    "description": "Formulation of neutral sterile N-acetylcysteine sodium solution to restore hepatic glutathione in acetaminophen hepatotoxicity.",
    "reactionType": "acid_base",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Mild neutralization exotherm"
      }
    ]
  },
  {
    "id": "clinic-030-lanthanum-carbonate-phosphate-binder",
    "name": "Lanthanum carbonate (Fosrenol) binding of dietary phosphate in renal failure",
    "reactants": [
      "lanthanum_carbonate",
      "h3po4"
    ],
    "products": [
      "lanthanum_phosphate",
      "co2",
      "water"
    ],
    "enthalpyKjPerMol": -175,
    "description": "Non-calcium phosphate binder reacting with ingested intestinal phosphate to form highly insoluble LaPO4 excreted in feces.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Effervescence of carbon dioxide as insoluble lanthanum phosphate precipitates"
      }
    ]
  },
  {
    "id": "clinic-031-calcium-acetate-phoslo-binder",
    "name": "Calcium acetate (PhosLo) dietary phosphate precipitation in ESRD hemodialysis",
    "reactants": [
      "ca_acetate",
      "h3po4"
    ],
    "products": [
      "ca3po42",
      "ch3cooh"
    ],
    "enthalpyKjPerMol": -120,
    "description": "Oral phosphate binder precipitating insoluble tricalcium phosphate in the gastrointestinal tract to prevent uremic osteodystrophy.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "White dense calcium phosphate precipitate forms"
      }
    ]
  },
  {
    "id": "clinic-032-aluminum-hydroxide-phosphate-binder",
    "name": "Aluminum hydroxide (Amphojel) precipitation of intestinal phosphate",
    "reactants": [
      "al-oh-3",
      "h3po4"
    ],
    "products": [
      "alpo4",
      "water"
    ],
    "enthalpyKjPerMol": -130,
    "description": "Classic non-absorbable inorganic hydroxide binding luminal phosphate as insoluble aluminum phosphate.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Dense white precipitate of aluminum phosphate"
      }
    ]
  },
  {
    "id": "clinic-033-calcium-citrate-anticoagulation-reversal",
    "name": "Calcium chloride reversal of regional citrate anticoagulation in apheresis",
    "reactants": [
      "cacl2",
      "c6h5o7na3"
    ],
    "products": [
      "ca_citrate",
      "nacl"
    ],
    "enthalpyKjPerMol": -68,
    "description": "Restoration of systemic ionized calcium (iCa2+) following extracorporeal citrate chelation preventing tetany and hypocalcemia.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Precipitation of microcrystalline calcium citrate"
      }
    ]
  },
  {
    "id": "clinic-034-gout-monosodium-urate-crystallization",
    "name": "Monosodium urate needle crystal precipitation in hyperuricemic gouty arthritis",
    "reactants": [
      "uric_acid",
      "naoh"
    ],
    "products": [
      "sodium_urate",
      "water"
    ],
    "enthalpyKjPerMol": -62,
    "description": "Alkalinization and neutralization of insoluble uric acid forming negatively birefringent needle-shaped monosodium urate tophi.",
    "reactionType": "acid_base",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Rapid crystallization of fine needle-shaped monosodium urate crystals"
      }
    ]
  },
  {
    "id": "clinic-035-calcium-urate-nephrolithiasis",
    "name": "Calcium urate precipitation in hyperuricosuric calcium nephrolithiasis",
    "reactants": [
      "sodium_urate",
      "cacl2"
    ],
    "products": [
      "ca_urate",
      "nacl"
    ],
    "enthalpyKjPerMol": -44,
    "description": "Heterogeneous nucleating seed formation precipitating insoluble calcium urate in renal calyces.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Dense crystalline calcium urate precipitate forms"
      }
    ]
  },
  {
    "id": "clinic-036-ammonium-oxalate-calcium-precipitation",
    "name": "Ammonium oxalate clinical diagnostic precipitation of calcium nitrate",
    "reactants": [
      "ca-no3-2",
      "nh4-2-c2o4"
    ],
    "products": [
      "cac2o4",
      "nh4no3"
    ],
    "enthalpyKjPerMol": -34,
    "description": "Quantitative precipitation of envelope-shaped calcium oxalate crystals used for photometric or gravimetric calcium assays.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Immediate heavy white precipitate of calcium oxalate"
      }
    ]
  },
  {
    "id": "clinic-037-struvite-calculus-precipitation",
    "name": "Struvite (triple phosphate) staghorn calculus precipitation by Proteus infection",
    "reactants": [
      "mgcl2",
      "monoammonium_phosphate",
      "naoh"
    ],
    "products": [
      "struvite",
      "nacl",
      "water"
    ],
    "enthalpyKjPerMol": -88,
    "description": "Bacterial urease alkalizes urine driving precipitation of massive branched staghorn calculi in renal pelvis.",
    "reactionType": "precipitation",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Formation of classic 'coffin-lid' struvite microcrystals"
      }
    ]
  },
  {
    "id": "clinic-038-aluminum-phosphate-antacid-neutralization",
    "name": "Aluminum phosphate (Phosphalugel) antacid neutralization of gastric acid",
    "reactants": [
      "alpo4",
      "hcl"
    ],
    "products": [
      "alcl3",
      "h3po4"
    ],
    "enthalpyKjPerMol": -98,
    "description": "Non-systemic antacid tablet buffering gastric pH while releasing mild cytoprotective phosphate.",
    "reactionType": "acid_base",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Dissolution with mild neutralization exotherm"
      }
    ]
  },
  {
    "id": "clinic-039-magnesium-trisilicate-antacid-neutralization",
    "name": "Magnesium trisilicate (Gaviscon) neutralization forming protective hydrated silica",
    "reactants": [
      "mg2si3o8",
      "hcl"
    ],
    "products": [
      "mgcl2",
      "sio2",
      "water"
    ],
    "enthalpyKjPerMol": -118,
    "description": "Reaction with gastric acid producing floating alginate/silica raft suppressing gastroesophageal reflux disease.",
    "reactionType": "acid_base",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Formation of gelatinous white hydrated silica precipitate"
      }
    ]
  },
  {
    "id": "clinic-040-calcium-carbonate-acetic-neutralization",
    "name": "Calcium carbonate effervescent antacid reaction with weak organic acid",
    "reactants": [
      "caco3",
      "ch3cooh"
    ],
    "products": [
      "ch3coo-2-ca",
      "co2",
      "water"
    ],
    "enthalpyKjPerMol": -72,
    "description": "Effervescent dissolution releasing carbon dioxide and soluble calcium acetate.",
    "reactionType": "acid_base",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Rapid bubbling effervescence of carbon dioxide"
      }
    ]
  },
  {
    "id": "clinic-041-bicarbonate-ketoacidosis-rescue",
    "name": "Sodium bicarbonate resuscitation neutralizing acetoacetic acid in diabetic ketoacidosis",
    "reactants": [
      "nahco3",
      "c4h6o3_acetoacetic"
    ],
    "products": [
      "c4h5nao3",
      "co2",
      "water"
    ],
    "enthalpyKjPerMol": -52,
    "description": "Emergency buffer therapy correcting arterial acidemia and generating neutral sodium acetoacetate and expired CO2.",
    "reactionType": "acid_base",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Effervescence of carbon dioxide gas"
      }
    ]
  },
  {
    "id": "clinic-042-ammonium-chloride-bicarbonate-challenge",
    "name": "Ammonium chloride distal renal tubular acidosis bicarbonate challenge",
    "reactants": [
      "ammonium-chloride",
      "nahco3"
    ],
    "products": [
      "nacl",
      "ammonia",
      "co2",
      "water"
    ],
    "enthalpyKjPerMol": -44,
    "description": "Acid-loading challenge testing distal intercalated cell H+ secretion to distinguish Type 1 from Type 2 RTA.",
    "reactionType": "acid_base",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Generation of ammonia and carbon dioxide gases"
      }
    ]
  },
  {
    "id": "clinic-043-perls-prussian-blue-tissue-iron",
    "name": "Perls Prussian blue histochemical reaction for hemosiderin iron deposits",
    "reactants": [
      "fecl2",
      "k3fe_cn6"
    ],
    "products": [
      "fe3_fecn6_2",
      "kcl"
    ],
    "enthalpyKjPerMol": -110,
    "description": "Turnbull / Prussian blue coordination identifying pathological iron overload in hemochromatosis and sideroblastic ringed sideroblasts.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#1B4F72",
        "description": "Dense insoluble deep Prussian blue pigment deposits"
      }
    ]
  },
  {
    "id": "clinic-044-luminol-chemiluminescence-forensic-blood",
    "name": "Luminol chemiluminescent oxidation catalyzed by hemoglobin heme iron",
    "reactants": [
      "luminol",
      "h2o2"
    ],
    "products": [
      "3_aminophthalate",
      "n2",
      "water"
    ],
    "enthalpyKjPerMol": -460,
    "description": "Catalytic peroxidase-like activity of heme decomposing H2O2 to oxidize luminol emitting intense blue chemiluminescence (425 nm).",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#EAEDED",
        "colorTo": "#2980B9",
        "description": "Vivid luminescent blue glow emitted in darkened room"
      }
    ]
  },
  {
    "id": "clinic-045-dansyl-chloride-amino-acid-labeling",
    "name": "Dansyl chloride fluorogenic labeling of primary amino acids",
    "reactants": [
      "dansyl_chloride",
      "glycine"
    ],
    "products": [
      "dansyl_glycine",
      "hcl"
    ],
    "enthalpyKjPerMol": -78,
    "description": "Fluorescent derivatization of amino acid alpha-amino groups enabling femtomole detection in diagnostic aminoaciduria screening.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#F4D03F",
        "colorTo": "#F9E79F",
        "description": "Formation of intensely fluorescent yellow-green sulfonamide conjugate"
      }
    ]
  },
  {
    "id": "clinic-046-chloramine-t-tyrosine-radioiodination",
    "name": "Chloramine-T electrophilic radioiodination of peptide tyrosine residues",
    "reactants": [
      "chloramine_t",
      "tyrosine",
      "nai",
      "water"
    ],
    "products": [
      "3_iodotyrosine",
      "p_toluenesulfonamide",
      "nacl",
      "naoh"
    ],
    "enthalpyKjPerMol": -135,
    "description": "Standard oxidation in radioimmunoassay (RIA) producing electrophilic iodonium (I+) for ortho-substitution into phenol rings.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Exothermic electrophilic aromatic substitution"
      }
    ]
  },
  {
    "id": "clinic-047-ascorbate-ferricyanide-antioxidant",
    "name": "Electrochemical reduction of ferricyanide by ascorbic acid (Vitamin C)",
    "reactants": [
      "c6h8o6_ascorbic",
      "k3fe_cn6",
      "koh"
    ],
    "products": [
      "c6h6o6_dehydroascorbic",
      "k4fe_cn6",
      "water"
    ],
    "enthalpyKjPerMol": -140,
    "description": "Point-of-care amperometric sensor assessing plasma total antioxidant capacity (TAC) via two-electron transfer to ferricyanide.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#F4D03F",
        "colorTo": "#EAEDED",
        "description": "Yellow ferricyanide bleaches to clear ferrocyanide"
      }
    ]
  },
  {
    "id": "clinic-048-acetic-acid-protein-precipitation",
    "name": "Acetic acid heat coagulation test for urinary albumin",
    "reactants": [
      "ch3cooh",
      "naoh"
    ],
    "products": [
      "ch3coona",
      "water"
    ],
    "enthalpyKjPerMol": -57,
    "description": "Acidification to the isoelectric point causing thermal denaturation and turbid flocculation of pathologic urinary protein.",
    "reactionType": "acid_base",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Exothermic proton neutralization"
      }
    ]
  },
  {
    "id": "clinic-049-salicylate-trinder-ferric-colorimetry",
    "name": "Trinder photometric diagnostic assay for toxic salicylate overdose",
    "reactants": [
      "fecl3",
      "water"
    ],
    "products": [
      "feoh3",
      "hcl"
    ],
    "enthalpyKjPerMol": -12,
    "description": "Formation of stable purple-violet iron-phenolate coordination complex absorbing strongly at 540 nm in emergency toxicology.",
    "reactionType": "decomposition",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#D4AC0D",
        "colorTo": "#7D3C98",
        "description": "Solution turns deep diagnostic purple"
      }
    ]
  },
  {
    "id": "clinic-050-pralidoxime-chloride-conversion",
    "name": "Pralidoxime chloride reaction forming active oxime antidote base",
    "reactants": [
      "pralidoxime",
      "naoh"
    ],
    "products": [
      "c7h8n2o",
      "nacl",
      "water"
    ],
    "enthalpyKjPerMol": -44,
    "description": "Liberation of uncharged pralidoxime free base capable of crossing the blood-brain barrier to dephosphorylate acetylcholinesterase.",
    "reactionType": "acid_base",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Exothermic chloride neutralization"
      }
    ]
  },
  {
    "id": "clinic-051-cupric-tartrate-fehling-glucose",
    "name": "Fehling reduction of cupric tartrate complex by reducing glucose",
    "reactants": [
      "c6h12o6",
      "cuo"
    ],
    "products": [
      "c6h12o7_gluconic",
      "cu2o"
    ],
    "enthalpyKjPerMol": -82,
    "description": "Enolic tautomer of glucose reduces cupric ions to insoluble red cuprous oxide precipitate in diabetic sugar urinalysis.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#C0392B",
        "description": "Red cuprous oxide microcrystalline precipitate forms at bottom of tube"
      }
    ]
  },
  {
    "id": "clinic-052-sodium-thiosulfate-caliphylaxis",
    "name": "Sodium thiosulfate dissolution of vascular calcium deposits in calciphylaxis",
    "reactants": [
      "na2s2o3",
      "cacl2"
    ],
    "products": [
      "ca-s2o3",
      "nacl"
    ],
    "enthalpyKjPerMol": -18,
    "description": "Intravenous thiosulfate chelates insoluble subcutaneous calcium deposits into soluble calcium thiosulfate salts (log K = 3.0).",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#FFFFFF",
        "colorTo": "#FFFFFF",
        "description": "Clearing of calcified crystal suspensions"
      }
    ]
  },
  {
    "id": "clinic-053-sodium-nitroprusside-sulfide-complex",
    "name": "Legal test sodium nitroprusside sulfide complexation to purple thionitroprusside",
    "reactants": [
      "na2-fe-cn-5-no",
      "na2s"
    ],
    "products": [
      "na4fe_cn5nos"
    ],
    "enthalpyKjPerMol": -95,
    "description": "Alkaline activation of pentacyanonitrosylferrate forming the active coordination site for acetoacetate nucleophilic attack.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#922B21",
        "colorTo": "#1F618D",
        "description": "Deep ruby red turns vivid purple-blue"
      }
    ]
  },
  {
    "id": "clinic-054-barium-hydroxide-sulfate-antidote",
    "name": "Sodium sulfate emergency antidote precipitation of soluble barium hydroxide",
    "reactants": [
      "ba-oh-2",
      "na2so4"
    ],
    "products": [
      "baso4",
      "naoh"
    ],
    "enthalpyKjPerMol": -112,
    "description": "Precipitation of lethal soluble barium rodenticide into completely insoluble, non-absorbable barium sulfate.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Dense heavy white barium sulfate precipitate forms with gas evolution"
      }
    ]
  },
  {
    "id": "clinic-055-potassium-iodate-iodide-synergy",
    "name": "Potassium iodate-iodide acetic acid volumetric titration in tablet verification",
    "reactants": [
      "kio3",
      "ki",
      "ch3cooh"
    ],
    "products": [
      "i2",
      "ch3cook",
      "water"
    ],
    "enthalpyKjPerMol": -340,
    "description": "Comproportionation assay quantifying stockpiled potassium iodate tablets used for thyroid radioactive iodine blockade.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#EAEDED",
        "colorTo": "#7E5109",
        "description": "Colorless solution generates dark brown molecular iodine"
      }
    ]
  },
  {
    "id": "clinic-056-methylene-blue-methemoglobin-reduction",
    "name": "Methylene blue dye reduction to colorless leucomethylene blue",
    "reactants": [
      "c16h18cln3s",
      "h2"
    ],
    "products": [
      "c16h19cln3s"
    ],
    "enthalpyKjPerMol": -130,
    "description": "NADPH-dependent enzymatic reduction of methylene blue to leuko form which donates electrons directly to MetHb(Fe3+) restoring Hb(Fe2+).",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#1B4F72",
        "colorTo": "#EAEDED",
        "description": "Deep royal blue turns completely colorless upon reduction"
      }
    ]
  },
  {
    "id": "clinic-057-clark-collip-oxalate-permanganate-titration",
    "name": "Clark-Collip nitric acid permanganate titration of precipitated calcium oxalate",
    "reactants": [
      "cac2o4",
      "kmno4",
      "hno3"
    ],
    "products": [
      "ca-no3-2",
      "kno3",
      "mn-no3-2",
      "co2",
      "water"
    ],
    "enthalpyKjPerMol": -1380,
    "description": "Gold-standard reference titration determining serum calcium concentration by titrating isolated oxalate with permanganate.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#7D3C98",
        "colorTo": "#EAEDED",
        "description": "Intense purple permanganate rapidly bleaches to faint permanent pink end-point"
      }
    ]
  },
  {
    "id": "clinic-058-berthelot-chloramine-formation",
    "name": "Berthelot reaction generation of monochloramine from ammonium chloride and hypochlorite",
    "reactants": [
      "ammonium-chloride",
      "naocl"
    ],
    "products": [
      "nh2cl",
      "nacl",
      "water"
    ],
    "enthalpyKjPerMol": -46,
    "description": "First stage of Berthelot spectrophotometric indophenol method for blood urea nitrogen determination.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Mild exothermic chlorination"
      }
    ]
  },
  {
    "id": "clinic-059-sodium-salicylate-acidification",
    "name": "Salicylic acid precipitation upon gastric acidification of sodium salicylate",
    "reactants": [
      "c7h5o3na",
      "hcl"
    ],
    "products": [
      "c7h6o3",
      "nacl"
    ],
    "enthalpyKjPerMol": -28,
    "description": "Diagnostic verification of non-ionized lipophilic salicylate absorption across gastric mucosal barrier causing systemic toxicity.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Silky white needle-like crystals of salicylic acid precipitate"
      }
    ]
  },
  {
    "id": "clinic-060-silver-sulfadiazine-burn-antimicrobial",
    "name": "Silver nitrate synthesis of topical antimicrobial silver sulfadiazine",
    "reactants": [
      "agno3",
      "c10h9n4nao2s"
    ],
    "products": [
      "c10h9agn4o2s",
      "nano3"
    ],
    "enthalpyKjPerMol": -48,
    "description": "Metathesis producing broad-spectrum topical antibacterial silver sulfadiazine cream (Silvadene) preventing burn wound sepsis.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Dense white precipitate of silver sulfadiazine"
      }
    ]
  },
  {
    "id": "clinic-061-silver-lactate-burn-antiseptic",
    "name": "Silver lactate topical burn antiseptic reaction with sodium chloride exudate",
    "reactants": [
      "c3h5ago3",
      "nacl"
    ],
    "products": [
      "agcl",
      "c3h5o3na"
    ],
    "enthalpyKjPerMol": -72,
    "description": "Antimicrobial silver ions precipitate as insoluble silver chloride upon contact with burn blister fluid electrolytes.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Curd-like white silver chloride precipitate forms"
      }
    ]
  },
  {
    "id": "clinic-062-indoxyl-acetate-esterase-cleavage",
    "name": "Leukocyte esterase dipstick hydrolysis of indoxyl acetate",
    "reactants": [
      "indoxyl_acetate",
      "water"
    ],
    "products": [
      "indoxyl",
      "ch3cooh"
    ],
    "enthalpyKjPerMol": -24,
    "description": "Enzymatic cleavage by human neutrophil elastase releasing free indoxyl intermediate in rapid pyuria urinalysis.",
    "reactionType": "decomposition",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#FFFFFF",
        "colorTo": "#F9E79F",
        "description": "Clear substrate pad develops pale yellow free indoxyl"
      }
    ]
  },
  {
    "id": "clinic-063-indoxyl-aerial-indigo-dimerization",
    "name": "Oxidative dimerization of indoxyl into diagnostic indigo blue dye",
    "reactants": [
      "indoxyl",
      "o2"
    ],
    "products": [
      "indigo_dye",
      "water"
    ],
    "enthalpyKjPerMol": -175,
    "description": "Spontaneous oxidation and coupling of two indoxyl molecules forming brilliant insoluble indigo blue in purple urine bag syndrome.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#F9E79F",
        "colorTo": "#1B4F72",
        "description": "Pale yellow solution oxidizes to deep intense royal indigo blue"
      }
    ]
  },
  {
    "id": "clinic-064-folin-ciocalteu-molybdenum-reduction",
    "name": "Lowry protein assay reduction of molybdenum trioxide by tyrosine",
    "reactants": [
      "tyrosine",
      "moo3"
    ],
    "products": [
      "c9h9no3",
      "moo2",
      "water"
    ],
    "enthalpyKjPerMol": -110,
    "description": "Phenolic side chain of tyrosine residues reduces phosphomolybdotungstic acid forming deep blue heteropolymolybdenum chromophore (750 nm).",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#F4D03F",
        "colorTo": "#1F618D",
        "description": "Yellow reagent turns intense dark molybdenum blue"
      }
    ]
  },
  {
    "id": "clinic-065-ninhydrin-glycine-deamination",
    "name": "Ninhydrin oxidative deamination of glycine amino acid in aminoaciduria screening",
    "reactants": [
      "ninhydrin",
      "glycine"
    ],
    "products": [
      "c9h7no3",
      "hcho",
      "co2",
      "water"
    ],
    "enthalpyKjPerMol": -88,
    "description": "First step of the classical ninhydrin test forming intermediate amine and aldehyde with carbon dioxide release.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Decarboxylation effervescence upon heating"
      }
    ]
  },
  {
    "id": "clinic-066-ninhydrin-intermediate-decarboxylation",
    "name": "Oxidative transformation of ninhydrin intermediate releasing nitrogen dioxide",
    "reactants": [
      "c9h7no3",
      "o2"
    ],
    "products": [
      "ninhydrin",
      "no2",
      "water"
    ],
    "enthalpyKjPerMol": -92,
    "description": "Oxidative transformation of indandione amine intermediate releasing nitrogen dioxide during chromophore maturation.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#FADBD8",
        "colorTo": "#6C3483",
        "description": "Formation of rich violet pigment"
      }
    ]
  },
  {
    "id": "clinic-067-von-kossa-calcium-phosphate-silver",
    "name": "Von Kossa histochemical silver displacement staining of pathological calcification",
    "reactants": [
      "ca3po42",
      "agno3"
    ],
    "products": [
      "ag3po4",
      "ca-no3-2"
    ],
    "enthalpyKjPerMol": -85,
    "description": "Displacement of calcium by silver ions in calcified arteriosclerotic plaques and nephrocalcinosis followed by photoreduction to black Ag0.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#F4D03F",
        "description": "Yellow silver phosphate deposits in calcified tissue regions"
      }
    ]
  },
  {
    "id": "clinic-068-von-kossa-photochemical-silver-reduction",
    "name": "Photochemical reduction of silver phosphate to black metallic silver deposits",
    "reactants": [
      "ag3po4",
      "water"
    ],
    "products": [
      "ag",
      "h3po4",
      "o2"
    ],
    "enthalpyKjPerMol": 180,
    "description": "Bright light exposure photoreduces silver phosphate into permanent jet-black microscopic metallic silver grains marking calcification.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#F4D03F",
        "colorTo": "#17202A",
        "description": "Yellow deposits turn completely jet black under UV/bright light"
      }
    ]
  },
  {
    "id": "clinic-069-alizarin-red-s-calcium-lake",
    "name": "Alizarin Red S histochemical chelation of calcium in osteoid mineralization",
    "reactants": [
      "alizarin",
      "cacl2"
    ],
    "products": [
      "c14h6cao4",
      "hcl"
    ],
    "enthalpyKjPerMol": -42,
    "description": "Bidentate coordination of calcium ions forming a bright birefringence-positive red calcium-alizarin chelate lake in bone biopsies.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#C0392B",
        "description": "Intense brilliant scarlet-red calcium coordination lake precipitates"
      }
    ]
  },
  {
    "id": "clinic-070-gram-stain-crystal-violet-iodine",
    "name": "Gram stain mordant complexation of crystal violet by triiodide",
    "reactants": [
      "c25h30cln3",
      "ki3"
    ],
    "products": [
      "c25h30in3",
      "kcl",
      "i2"
    ],
    "enthalpyKjPerMol": -35,
    "description": "Formation of large water-insoluble crystal violet-iodine (CV-I) precipitate trapped within thick peptidoglycan walls of Gram-positive bacteria.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#4A235A",
        "description": "Deep blue-violet crystalline CV-I mordant complex forms"
      }
    ]
  },
  {
    "id": "clinic-071-resorcinol-seliwanoff-red-condensation",
    "name": "Seliwanoff resorcinol condensation with HMF forming cherry-red chromophore",
    "reactants": [
      "hmf",
      "resorcinol"
    ],
    "products": [
      "c12h10o4",
      "water"
    ],
    "enthalpyKjPerMol": -92,
    "description": "Electrophilic condensation of furan aldehyde with phenolic resorcinol forming xanthene cherry-red pigment diagnostic for fructose.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#FFFFFF",
        "colorTo": "#922B21",
        "description": "Colorless solution develops vivid cherry-red color within 60 seconds"
      }
    ]
  },
  {
    "id": "clinic-072-copper-glycine-chelate-formation",
    "name": "Copper(II) bis-glycinate deep blue coordination complex in biuret protein modeling",
    "reactants": [
      "cuoh2",
      "glycine"
    ],
    "products": [
      "c4h8cun2o4",
      "water"
    ],
    "enthalpyKjPerMol": -84,
    "description": "Coordination of cupric ions by alpha-amino acid carboxyl and amine donors yielding deep blue water-soluble complex.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#3498DB",
        "colorTo": "#1B4F72",
        "description": "Light blue cupric hydroxide dissolves into intense deep blue solution"
      }
    ]
  },
  {
    "id": "clinic-073-magnesium-carbonate-antacid-neutralization",
    "name": "Magnesium carbonate antacid (Rennie) reaction with weak acetic acid",
    "reactants": [
      "mgco3",
      "ch3cooh"
    ],
    "products": [
      "ch3coo-2-mg",
      "co2",
      "water"
    ],
    "enthalpyKjPerMol": -85,
    "description": "Rapid neutralization of excess gastric acid releasing soluble magnesium chloride and effervescent carbon dioxide.",
    "reactionType": "acid_base",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Vigorous bubbling effervescence of carbon dioxide"
      }
    ]
  },
  {
    "id": "clinic-074-carbonic-acid-dissociation-blood-gas",
    "name": "Carbonic acid rapid dehydration to carbon dioxide in pulmonary capillaries",
    "reactants": [
      "h2co3"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpyKjPerMol": 15,
    "description": "Carbonic anhydrase (CA) catalyzed dehydration converting hydrogen carbonate into expired carbon dioxide gas maintaining blood pH 7.40.",
    "reactionType": "decomposition",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Evolution of dissolved carbon dioxide into alveolar gas phase"
      }
    ]
  },
  {
    "id": "clinic-075-ascorbic-acid-iodate-reduction",
    "name": "Ascorbic acid reduction of potassium iodate in diagnostic vitamin C titration",
    "reactants": [
      "c6h8o6_ascorbic",
      "kio3"
    ],
    "products": [
      "c6h6o6_dehydroascorbic",
      "ki",
      "water"
    ],
    "enthalpyKjPerMol": -92,
    "description": "Two-electron enediol oxidation of Vitamin C reducing green cupric chloride to white cuprous chloride precipitate.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#EAEDED",
        "description": "Green cupric solution deposits white cuprous chloride precipitate"
      }
    ]
  },
  {
    "id": "clinic-076-copper-carbonate-benedict-reagent",
    "name": "Precipitation of copper carbonate by potassium carbonate in Benedict reagent synthesis",
    "reactants": [
      "cuso4",
      "k2co3"
    ],
    "products": [
      "cuco3",
      "k2so4"
    ],
    "enthalpyKjPerMol": -24,
    "description": "Metathesis reaction yielding cupric carbonate intermediate stabilized by trisodium citrate in glucose test solutions.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#1E8449",
        "description": "Dense green-blue copper carbonate precipitate forms"
      }
    ]
  },
  {
    "id": "clinic-077-lugol-iodine-glycogen-staining",
    "name": "Lugol iodine histochemical staining of vaginal epithelial glycogen",
    "reactants": [
      "i2",
      "ki"
    ],
    "products": [
      "ki3"
    ],
    "enthalpyKjPerMol": -18,
    "description": "Schiller diagnostic test for cervical dysplasia: normal glycogen-rich squamous epithelium stains mahogany brown, abnormal areas remain unstained.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#5D6D7E",
        "colorTo": "#7E5109",
        "description": "Triiodide complexation produces rich mahogany brown solution"
      }
    ]
  },
  {
    "id": "clinic-078-sulfuric-acid-ammonium-buffer",
    "name": "Ammonium bicarbonate buffering of systemic sulfuric metabolic acidemia",
    "reactants": [
      "h2so4",
      "nh4hco3"
    ],
    "products": [
      "nh4-2-so4",
      "co2",
      "water"
    ],
    "enthalpyKjPerMol": -96,
    "description": "Renal and respiratory compensation converting strong inorganic metabolic acid into neutral sodium sulfate and exhaled CO2.",
    "reactionType": "acid_base",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Effervescence of carbon dioxide gas"
      }
    ]
  },
  {
    "id": "clinic-079-schiff-reagent-sulfur-dioxide-bleaching",
    "name": "Sulfur dioxide bleaching of basic fuchsin forming colorless Schiff reagent",
    "reactants": [
      "so2",
      "water"
    ],
    "products": [
      "h2so3"
    ],
    "enthalpyKjPerMol": -24,
    "description": "Preparation of diagnostic Schiff reagent for Periodic Acid-Schiff (PAS) detection of basement membranes and glycogen.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#922B21",
        "colorTo": "#EAEDED",
        "description": "Intense magenta basic fuchsin bleaches completely colorless"
      }
    ]
  },
  {
    "id": "clinic-080-periodic-acid-glycol-cleavage",
    "name": "Periodic acid Malaprade glycol cleavage model in PAS histochemistry",
    "reactants": [
      "c2h6o2",
      "hio4"
    ],
    "products": [
      "hcho",
      "hio3",
      "water"
    ],
    "enthalpyKjPerMol": -185,
    "description": "Oxidation of 1,2-cis diols of glycogen and mucins into dialdehydes capable of recolorizing leuco-fuchsin in tissue sections.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Exothermic carbon-carbon glycol bond scission"
      }
    ]
  },
  {
    "id": "clinic-081-ferric-salicylate-trinder-complex",
    "name": "Ferric chloride coordination with salicylic acid in acute aspirin toxicity",
    "reactants": [
      "fecl3",
      "c7h6o3"
    ],
    "products": [
      "c7h5cl2feo3",
      "hcl"
    ],
    "enthalpyKjPerMol": -45,
    "description": "Emergency bedside screening forming a heat-stable purple-violet iron-salicylate chelate in patient urine.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#F4D03F",
        "colorTo": "#5B2C6F",
        "description": "Pale yellow ferric chloride turns intense deep violet-purple"
      }
    ]
  },
  {
    "id": "clinic-082-ferric-acetoacetate-gerhardt-complex",
    "name": "Gerhardt ferric chloride test for urinary acetoacetic acid in diabetic ketoacidosis",
    "reactants": [
      "fecl3",
      "c4h6o3_acetoacetic"
    ],
    "products": [
      "c4h5cl2feo3",
      "hcl"
    ],
    "enthalpyKjPerMol": -48,
    "description": "Enolic coordination yielding rich Bordeaux wine-red complex which decomposes and bleaches upon boiling (unlike salicylate).",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#F4D03F",
        "colorTo": "#78281F",
        "description": "Development of rich Bordeaux wine-red color"
      }
    ]
  },
  {
    "id": "clinic-083-sodium-fluoride-glycolysis-inhibition",
    "name": "Sodium fluoride precipitation of magnesium cofactor inhibiting enolase",
    "reactants": [
      "naf",
      "mgcl2"
    ],
    "products": [
      "mgf2",
      "nacl"
    ],
    "enthalpyKjPerMol": -22,
    "description": "Gray-top blood collection tube additive precipitating magnesium fluorophosphate to arrest in vitro erythrocyte glycolysis.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Precipitation of insoluble white magnesium fluoride"
      }
    ]
  },
  {
    "id": "clinic-084-potassium-oxalate-calcium-bromide",
    "name": "Potassium oxalate precipitation of calcium bromide in diagnostic anticoagulation",
    "reactants": [
      "cabr2",
      "k2c2o4"
    ],
    "products": [
      "cac2o4",
      "kbr"
    ],
    "enthalpyKjPerMol": -34,
    "description": "Companion anticoagulant in fluoride tubes sequestering free ionized calcium to completely prevent plasma coagulation.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Immediate precipitation of insoluble white calcium oxalate"
      }
    ]
  },
  {
    "id": "clinic-085-tyrosine-nitration-xanthoproteic-test",
    "name": "Heller xanthoproteic diagnostic test nitration of aromatic protein tyrosine",
    "reactants": [
      "tyrosine",
      "hno3"
    ],
    "products": [
      "c9h10n2o5",
      "water"
    ],
    "enthalpyKjPerMol": -76,
    "description": "Nitration of phenolic ring producing bright yellow 3-nitrotyrosine which turns deep orange upon alkalinization with ammonia.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#FFFFFF",
        "colorTo": "#F4D03F",
        "description": "Clear protein solution turns vibrant yellow xanthoproteic chromophore"
      }
    ]
  },
  {
    "id": "clinic-086-prussian-blue-cesium-trapping",
    "name": "Insoluble Prussian blue exchange reaction trapping radioactive cesium-137",
    "reactants": [
      "fe4_fecn6_3",
      "cscl"
    ],
    "products": [
      "csfe_fecn6",
      "fecl3"
    ],
    "enthalpyKjPerMol": -42,
    "description": "Oral Radiogardase ion-exchange trapping cesium-137 and thallium within crystal lattice cages for safe fecal clearance.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#1B4F72",
        "colorTo": "#1B4F72",
        "description": "Retention of deep blue pigment with trapped radiocations"
      }
    ]
  },
  {
    "id": "clinic-087-sodium-hypochlorite-spill-decontamination",
    "name": "Sodium hypochlorite decontamination of infectious clinical blood spills",
    "reactants": [
      "naocl",
      "hcl"
    ],
    "products": [
      "nacl",
      "cl2",
      "water"
    ],
    "enthalpyKjPerMol": -68,
    "description": "Emergency biocidal disinfection of bloodborne pathogens (HIV, Hepatitis B) generating potent oxidative germicidal chlorine.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Evolution of pale green germicidal chlorine gas"
      }
    ]
  },
  {
    "id": "clinic-088-ferrozine-iron-assay-reduction",
    "name": "Hydroxylamine reduction of serum ferric iron to ferrous state for ferrozine assay",
    "reactants": [
      "fecl3",
      "nh2oh_hcl"
    ],
    "products": [
      "fecl2",
      "n2",
      "hcl",
      "water"
    ],
    "enthalpyKjPerMol": -118,
    "description": "Reduction of transferrin-bound ferric iron prior to chromogenic chelation with ferrozine (absorbance at 562 nm).",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Evolution of nitrogen gas during quantitative iron reduction"
      }
    ]
  },
  {
    "id": "clinic-089-cresolphthalein-complexone-calcium",
    "name": "o-Cresolphthalein complexone purple chelation in automated serum calcium assays",
    "reactants": [
      "cpc_dye",
      "cacl2"
    ],
    "products": [
      "cpc_ca_complex",
      "hcl"
    ],
    "enthalpyKjPerMol": -58,
    "description": "Alkaline complexation of serum calcium at pH 10-12 forming intense purple-red chromophore measured spectrophotometrically at 575 nm.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#FADBD8",
        "colorTo": "#6C3483",
        "description": "Colorless reagent develops intense magenta-purple calcium coordination complex"
      }
    ]
  },
  {
    "id": "clinic-090-sulfanilamide-diazotization-nitrite",
    "name": "Sulfanilamide diazotization by nitrous acid in Griess UTI bacteriuria screening",
    "reactants": [
      "sulfanilamide",
      "hno2",
      "hcl"
    ],
    "products": [
      "c6h6cln3o2s",
      "water"
    ],
    "enthalpyKjPerMol": -64,
    "description": "First stage of Griess urinary dipstick reaction converting bacterial nitrate reductase product into diazonium cation.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Exothermic diazotization at acidic pH"
      }
    ]
  },
  {
    "id": "clinic-091-potassium-dichromate-formalin-fixative",
    "name": "Orth fixative chromate mordanting of adrenal chromaffin granules",
    "reactants": [
      "k2cr2o7",
      "naoh"
    ],
    "products": [
      "k2cro4",
      "na2cro4",
      "water"
    ],
    "enthalpyKjPerMol": -38,
    "description": "Fixation of catecholamines in pheochromocytoma biopsy specimens causing brown oxidation of epinephrine granules.",
    "reactionType": "acid_base",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#E67E22",
        "colorTo": "#F4D03F",
        "description": "Orange dichromate shifts to bright yellow chromate in buffered fixative"
      }
    ]
  },
  {
    "id": "clinic-092-coomassie-brilliant-blue-phosphoric-acid",
    "name": "Bradford protein assay phosphoric acid reagent preparation",
    "reactants": [
      "h3po4",
      "water"
    ],
    "products": [
      "h3po4_aq"
    ],
    "enthalpyKjPerMol": -15,
    "description": "Acidic ethanol-phosphoric acid formulation maintaining Coomassie G-250 in doubly protonated red-brown cationic state (465 nm).",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Exothermic acid dilution"
      }
    ]
  },
  {
    "id": "clinic-093-bca-cupric-formaldehyde-reduction",
    "name": "BCA protein assay reduction of copper(II) hydroxide to cuprous oxide by aldehyde",
    "reactants": [
      "cuoh2",
      "hcho"
    ],
    "products": [
      "cu2o",
      "hcooh",
      "water"
    ],
    "enthalpyKjPerMol": -128,
    "description": "Biuret-like reduction of Cu(II) to Cu(I) in alkaline solution by protein peptide bonds and reducing functional groups.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#3498DB",
        "colorTo": "#922B21",
        "description": "Light blue cupric suspension reduces to brick-red cuprous oxide"
      }
    ]
  },
  {
    "id": "clinic-094-hydrogen-peroxide-titanium-peroxo-complex",
    "name": "Titanium oxysulfate photometric quantification of enzymatic hydrogen peroxide",
    "reactants": [
      "tiso4",
      "h2o2"
    ],
    "products": [
      "tio2_so4",
      "water"
    ],
    "enthalpyKjPerMol": -98,
    "description": "Reaction with titanium(IV) forming intensely yellow-orange pertitanic acid complex (410 nm) quantifying oxidase activity.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#FFFFFF",
        "colorTo": "#D35400",
        "description": "Colorless solution yields vivid yellow-orange titanium peroxo complex"
      }
    ]
  },
  {
    "id": "clinic-095-lugol-triiodide-thiosulfate-titration",
    "name": "Lugol triiodide volumetric titration with sodium thiosulfate",
    "reactants": [
      "ki3",
      "na2s2o3"
    ],
    "products": [
      "ki",
      "nai",
      "na2s4o6"
    ],
    "enthalpyKjPerMol": -180,
    "description": "Volumetric determination of therapeutic antibiotic and vitamin levels using starch indicator at blue-to-colorless transition.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#5D6D7E",
        "colorTo": "#EAEDED",
        "description": "Deep dark brown-blue iodine bleaches to completely water-clear solution"
      }
    ]
  },
  {
    "id": "clinic-096-sodium-borohydride-disulfide-reduction",
    "name": "Sodium borohydride chemical reduction of immunoglobulin interchain disulfides",
    "reactants": [
      "nabh4",
      "water"
    ],
    "products": [
      "nabo2",
      "h2"
    ],
    "enthalpyKjPerMol": -240,
    "description": "Mild chemical reduction of IgG hinge disulfide bonds preparing Fab and F(ab')2 antibody fragments for diagnostic immunoassays.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Effervescence of active reducing hydrogen gas"
      }
    ]
  },
  {
    "id": "clinic-097-ferricyanide-nitrite-oxidation",
    "name": "Potassium ferricyanide alkaline oxidation of sodium nitrite in Drabkin cycle",
    "reactants": [
      "k3fe_cn6",
      "nano2",
      "koh"
    ],
    "products": [
      "k4fe_cn6",
      "nano3",
      "water"
    ],
    "enthalpyKjPerMol": -48,
    "description": "Analytical electron transfer cycle measuring total hemoglobin oxidizing equivalents in clinical hemolysates.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#F4D03F",
        "colorTo": "#7E5109",
        "description": "Yellow solution darkens as brown elemental iodine is released"
      }
    ]
  },
  {
    "id": "clinic-098-barium-hydroxide-somogyi-deproteinization",
    "name": "Somogyi deproteinization precipitation with zinc sulfate in blood glucose",
    "reactants": [
      "ba-oh-2",
      "znso4"
    ],
    "products": [
      "baso4",
      "znoh2"
    ],
    "enthalpyKjPerMol": -118,
    "description": "Preparation of protein-free blood filtrate: coprecipitation of barium sulfate and gelatinous zinc hydroxide entangling all serum proteins.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Heavy gelatinous white precipitate clears leaving protein-free supernatant"
      }
    ]
  },
  {
    "id": "clinic-099-trichloroacetic-acid-protein-precipitation",
    "name": "Trichloroacetic acid (TCA) diagnostic precipitation of cerebrospinal fluid protein",
    "reactants": [
      "c2hcl3o2",
      "naoh"
    ],
    "products": [
      "c2cl3nao2",
      "water"
    ],
    "enthalpyKjPerMol": -58,
    "description": "Disruption of protein hydration shells causing instant quantitative denaturation and turbidimetric flocculation in meningitis CSF.",
    "reactionType": "acid_base",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Exothermic neutralization"
      }
    ]
  },
  {
    "id": "clinic-100-silver-lactate-argentaffin-stain",
    "name": "Silver lactate reduction in histochemical Fontana-Masson melanin staining",
    "reactants": [
      "c3h5ago3",
      "h2"
    ],
    "products": [
      "ag",
      "c3h6o3_lactic"
    ],
    "enthalpyKjPerMol": -75,
    "description": "Melanin pigment granules directly reduce argentaffin silver salts to microscopic metallic silver particles confirming metastatic melanoma.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#FFFFFF",
        "colorTo": "#17202A",
        "description": "Tissue section develops intense jet-black melanin granulations"
      }
    ]
  }
];
