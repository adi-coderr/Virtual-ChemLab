// Domain 40: Astrochemistry, Planetary Geochemistry, Lunar/Mars ISRU & Prebiotic Models (100 reactions)
import type { ReactionDefinition } from "./types.js";

export const DOMAIN_40_REACTIONS: ReactionDefinition[] = [
  {
    "id": "astro-001-forsterite-enstatite-serpentinization",
    "name": "Hydrothermal serpentinization of olivine and pyroxene",
    "reactants": [
      "forsterite",
      "enstatite",
      "water"
    ],
    "products": [
      "serpentine"
    ],
    "enthalpyKjPerMol": -65,
    "description": "Hydrothermal hydration of ultramafic mantle peridotite on ocean worlds (Enceladus, Europa) forming serpentine.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "phase_change",
        "description": "Greenish serpentine phyllosilicate forms with swelling"
      }
    ]
  },
  {
    "id": "astro-002-fayalite-magnetite-serpentinization",
    "name": "Hydrothermal serpentinization of fayalite with molecular hydrogen generation",
    "reactants": [
      "fayalite",
      "water"
    ],
    "products": [
      "fe3o4",
      "sio2",
      "h2"
    ],
    "enthalpyKjPerMol": -82,
    "description": "Anaerobic serpentinization of iron-rich olivine releasing hydrogen fuel to power deep biosphere methanogenesis.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Evolution of molecular hydrogen gas"
      },
      {
        "type": "color_change",
        "colorFrom": "#7D6608",
        "colorTo": "#1C2833",
        "description": "Brown olivine darkens to magnetic black magnetite"
      }
    ]
  },
  {
    "id": "astro-003-forsterite-carbonation-magnesite",
    "name": "Direct dry planetary mineral carbonation of forsterite olivine",
    "reactants": [
      "forsterite",
      "co2"
    ],
    "products": [
      "mgco3",
      "sio2"
    ],
    "enthalpyKjPerMol": -88,
    "description": "Atmospheric sequestration of carbon dioxide into planetary mantle olivine crusts on Mars and Venus.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#A9DFBF",
        "colorTo": "#FFFFFF",
        "description": "Pale green olivine converts to white magnesite and silica"
      }
    ]
  },
  {
    "id": "astro-004-forsterite-aqueous-carbonation",
    "name": "Aqueous weathering carbonation of forsterite to serpentine and magnesite",
    "reactants": [
      "forsterite",
      "co2",
      "water"
    ],
    "products": [
      "serpentine",
      "mgco3"
    ],
    "enthalpyKjPerMol": -110,
    "description": "Simultaneous hydrothermal hydration and carbonation storing atmospheric greenhouse gases in ultramafic rocks.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#A9DFBF",
        "colorTo": "#27AE60",
        "description": "Formation of mixed green serpentine and white magnesite matrix"
      }
    ]
  },
  {
    "id": "astro-005-fayalite-carbonation-siderite",
    "name": "Dry carbonation of iron-rich olivine forming siderite",
    "reactants": [
      "fayalite",
      "co2"
    ],
    "products": [
      "feco3",
      "sio2"
    ],
    "enthalpyKjPerMol": -76,
    "description": "Dense exoplanet CO2 atmosphere interaction with fayalitic lavas trapping carbon as siderite.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#7D6608",
        "colorTo": "#935116",
        "description": "Formation of brown siderite and chalcedony silica"
      }
    ]
  },
  {
    "id": "astro-006-enstatite-hydration-serpentine",
    "name": "Direct hydrothermal hydration of enstatite pyroxene",
    "reactants": [
      "enstatite",
      "water"
    ],
    "products": [
      "serpentine",
      "sio2"
    ],
    "enthalpyKjPerMol": -52,
    "description": "Metamorphic hydration of magnesium orthopyroxene in chondritic asteroids releasing colloidal silica.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "phase_change",
        "description": "Transformation into fibrous chrysotile serpentine and quartz"
      }
    ]
  },
  {
    "id": "astro-007-enstatite-carbonation-magnesite",
    "name": "Planetary atmospheric carbonation of enstatite pyroxene",
    "reactants": [
      "enstatite",
      "co2"
    ],
    "products": [
      "mgco3",
      "sio2"
    ],
    "enthalpyKjPerMol": -38,
    "description": "In-situ carbon mineral trapping in pyroxene-rich basaltic crusts.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#D4EFDF",
        "colorTo": "#FFFFFF",
        "description": "Pyroxene bleached to white magnesite-silica composite"
      }
    ]
  },
  {
    "id": "astro-008-anorthite-kaolinite-weathering",
    "name": "Hydrothermal acid weathering of planetary anorthite plagioclase",
    "reactants": [
      "anorthite",
      "co2",
      "water"
    ],
    "products": [
      "caco3",
      "al2si2o5oh4_kaolinite"
    ],
    "enthalpyKjPerMol": -95,
    "description": "Aqueous alteration of primeval plagioclase feldspar crusts producing kaolinite clay and limestone.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Chalky white kaolinite clay and calcium carbonate precipitate"
      }
    ]
  },
  {
    "id": "astro-009-diopside-carbonation",
    "name": "High-pressure carbonation of diopside clinopyroxene",
    "reactants": [
      "diopside",
      "co2"
    ],
    "products": [
      "caco3",
      "mgco3",
      "sio2"
    ],
    "enthalpyKjPerMol": -120,
    "description": "Mantle metasomatism in carbonate-rich subduction zones trapping carbon in diopside.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#A2D9CE",
        "colorTo": "#FFFFFF",
        "description": "Green clinopyroxene decomposes into white carbonate-silica skarn"
      }
    ]
  },
  {
    "id": "astro-010-siderite-thermal-decomposition",
    "name": "Thermal vacuum decomposition of Martian siderite",
    "reactants": [
      "feco3"
    ],
    "products": [
      "feo",
      "co2"
    ],
    "enthalpyKjPerMol": 85,
    "description": "Thermal calcination of iron carbonate in volcanic contact metamorphic aureoles.",
    "reactionType": "decomposition",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Vigorous carbon dioxide outgassing"
      },
      {
        "type": "color_change",
        "colorFrom": "#935116",
        "colorTo": "#1C2833",
        "description": "Brown siderite turns black wüstite"
      }
    ]
  },
  {
    "id": "astro-011-troilite-weathering-sulfate",
    "name": "Oxidative weathering of meteoritic troilite",
    "reactants": [
      "troilite",
      "o2"
    ],
    "products": [
      "feso4"
    ],
    "enthalpyKjPerMol": -820,
    "description": "Dry and low-humidity oxidation of iron meteorites generating ferrous sulfate salts.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#B7950B",
        "colorTo": "#A2D9CE",
        "description": "Bronze troilite tarnishes to pale green melanterite sulfate"
      }
    ]
  },
  {
    "id": "astro-012-goethite-hematite-dehydration",
    "name": "Thermal dehydration of goethite to crystalline Martian hematite",
    "reactants": [
      "goethite"
    ],
    "products": [
      "fe2o3",
      "water"
    ],
    "enthalpyKjPerMol": 48,
    "description": "Diagenetic desiccation of ferric oxyhydroxides forming Martian hematite spherules (blueberries).",
    "reactionType": "decomposition",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#B9770E",
        "colorTo": "#7B241C",
        "description": "Ochre-yellow goethite dehydrates to lustrous dark red-gray hematite"
      }
    ]
  },
  {
    "id": "astro-013-magnetite-maghemite-oxidation",
    "name": "Low-temperature surface oxidation of planetary magnetite to hematite",
    "reactants": [
      "fe3o4",
      "o2"
    ],
    "products": [
      "fe2o3"
    ],
    "enthalpyKjPerMol": -495,
    "description": "Photochemically driven slow oxidation causing the characteristic reddish hue of Mars.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#1C2833",
        "colorTo": "#922B21",
        "description": "Black ferromagnetic magnetite turns rust-red hematite dust"
      }
    ]
  },
  {
    "id": "astro-014-schreibersite-aqueous-corrosion",
    "name": "Corrosive aqueous alteration of meteoritic schreibersite",
    "reactants": [
      "schreibersite",
      "water"
    ],
    "products": [
      "feo",
      "hypophosphorous_acid",
      "h2"
    ],
    "enthalpyKjPerMol": -145,
    "description": "Hydrothermal corrosion of prebiotic iron-nickel phosphide releasing reactive phosphorus oxyacids and hydrogen gas.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Effervescence of hydrogen gas"
      },
      {
        "type": "precipitation",
        "colorTo": "#1C2833",
        "description": "Black wüstite crust forms over meteoritic grain"
      }
    ]
  },
  {
    "id": "astro-015-forsterite-silica-enstatite",
    "name": "Subsolidus metamorphic reaction between olivine and silica",
    "reactants": [
      "forsterite",
      "sio2"
    ],
    "products": [
      "enstatite"
    ],
    "enthalpyKjPerMol": -15,
    "description": "Prograde metamorphism in planetary crusts reacting olivine with silica-saturated fluids to form pyroxene.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "phase_change",
        "description": "Recrystallization of granular olivine into prismatic pyroxene"
      }
    ]
  },
  {
    "id": "astro-016-serpentine-thermal-dehydration",
    "name": "Prograde thermal dehydration of subducting serpentine phyllosilicate",
    "reactants": [
      "serpentine"
    ],
    "products": [
      "forsterite",
      "enstatite",
      "water"
    ],
    "enthalpyKjPerMol": 165,
    "description": "High-temperature devolatilization of serpentinized oceanic slab returning water to planetary mantles.",
    "reactionType": "decomposition",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "High-pressure superheated steam outgassing at 650 °C"
      }
    ]
  },
  {
    "id": "astro-017-fayalite-reduction-co",
    "name": "Carbon monoxide reduction of fayalite in protoplanetary nebular gas",
    "reactants": [
      "fayalite",
      "co"
    ],
    "products": [
      "fe",
      "sio2",
      "co2"
    ],
    "enthalpyKjPerMol": -32,
    "description": "High-temperature nebular reduction producing native iron beads in chondritic meteorites.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#7D6608",
        "colorTo": "#7F8C8D",
        "description": "Silicate turns to metallic iron grains embedded in silica glass"
      }
    ]
  },
  {
    "id": "astro-018-forsterite-carbothermal-reduction",
    "name": "Carbothermal reduction of olivine for planetary magnesium extraction",
    "reactants": [
      "forsterite",
      "c"
    ],
    "products": [
      "mg",
      "sio2",
      "co"
    ],
    "enthalpyKjPerMol": 480,
    "description": "High-temperature electric arc furnace reduction of olivine regolith for extraterrestrial alloy manufacturing.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Carbon monoxide and magnesium vapor evolution at 1600 °C"
      }
    ]
  },
  {
    "id": "astro-019-fayalite-hydrogen-reduction",
    "name": "Hydrogen reduction of fayalite in planetary regolith",
    "reactants": [
      "fayalite",
      "h2"
    ],
    "products": [
      "fe",
      "sio2",
      "water"
    ],
    "enthalpyKjPerMol": 68,
    "description": "High-temperature reduction of iron silicate extracting metallic iron and water on airless bodies.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Water vapor release"
      },
      {
        "type": "color_change",
        "colorFrom": "#7D6608",
        "colorTo": "#717D7E",
        "description": "Iron metal beads nucleate in silica matrix"
      }
    ]
  },
  {
    "id": "astro-020-troilite-hydrogen-reduction",
    "name": "Hydrogen reduction of meteoritic troilite mineral",
    "reactants": [
      "troilite",
      "h2"
    ],
    "products": [
      "fe",
      "h2s"
    ],
    "enthalpyKjPerMol": 72,
    "description": "Desulfurization of meteoritic iron sulfide producing metallic iron and hydrogen sulfide gas.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Rotten-egg odor hydrogen sulfide gas evolution"
      },
      {
        "type": "color_change",
        "colorFrom": "#B7950B",
        "colorTo": "#7F8C8D",
        "description": "Bronze sulfide reduces to metallic gray iron"
      }
    ]
  },
  {
    "id": "astro-021-ilmenite-hydrogen-reduction",
    "name": "Hydrogen reduction of lunar ilmenite for oxygen and water production",
    "reactants": [
      "ilmenite",
      "h2"
    ],
    "products": [
      "fe",
      "tio2",
      "water"
    ],
    "enthalpyKjPerMol": 38,
    "description": "Primary Lunar ISRU process (1000 °C fluidized bed) reducing mare basalt ilmenite to water and iron.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "High-temperature steam generated for oxygen electrolysis"
      },
      {
        "type": "color_change",
        "colorFrom": "#1C2833",
        "colorTo": "#FFFFFF",
        "description": "Black ilmenite converts to white rutile and gray sponge iron"
      }
    ]
  },
  {
    "id": "astro-022-ilmenite-carbothermal-reduction",
    "name": "Carbothermal reduction of lunar ilmenite ore",
    "reactants": [
      "ilmenite",
      "c"
    ],
    "products": [
      "fe",
      "tio2",
      "co"
    ],
    "enthalpyKjPerMol": 180,
    "description": "Carbon arc reduction of concentrated lunar ilmenite producing carbon monoxide and metallic iron.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Carbon monoxide outgassing at 1200 °C"
      }
    ]
  },
  {
    "id": "astro-023-ilmenite-methane-reduction",
    "name": "Methane-assisted reduction of lunar ilmenite in recycling loop",
    "reactants": [
      "ilmenite",
      "ch4"
    ],
    "products": [
      "fe",
      "tio2",
      "co",
      "h2"
    ],
    "enthalpyKjPerMol": 245,
    "description": "Closed-loop gaseous hydrocarbon reduction extracting iron and synthesis gas from lunar mare ore.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Syngas (CO + H2) outgassing"
      }
    ]
  },
  {
    "id": "astro-024-ilmenite-carbon-monoxide-reduction",
    "name": "Carbon monoxide reduction of lunar ilmenite",
    "reactants": [
      "ilmenite",
      "co"
    ],
    "products": [
      "fe",
      "tio2",
      "co2"
    ],
    "enthalpyKjPerMol": -12,
    "description": "Recycled carbon monoxide reducing ilmenite to produce CO2 for subsequent oxygen reclamation.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#1C2833",
        "colorTo": "#BDC3C7",
        "description": "Black ilmenite turns light gray rutile and iron"
      }
    ]
  },
  {
    "id": "astro-025-moxie-solid-oxide-co2-electrolysis",
    "name": "High-temperature solid oxide electrolysis of Martian CO2 (MOXIE)",
    "reactants": [
      "co2"
    ],
    "products": [
      "co",
      "o2"
    ],
    "enthalpyKjPerMol": 283,
    "description": "Electrocatalytic splitting of Martian atmospheric carbon dioxide at 800 °C producing breathable oxygen.",
    "reactionType": "decomposition",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Pure oxygen gas separation at the zirconia anode"
      }
    ]
  },
  {
    "id": "astro-026-magnesium-perchlorate-thermal-oxygen",
    "name": "Thermal decomposition of Martian soil magnesium perchlorate for oxygen release",
    "reactants": [
      "magnesium_perchlorate"
    ],
    "products": [
      "mgcl2",
      "o2"
    ],
    "enthalpyKjPerMol": 115,
    "description": "Low-energy thermal bakeout (350 °C) of deliquescent Martian soil perchlorate releasing breathable oxygen.",
    "reactionType": "decomposition",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Vigorous pure oxygen evolution"
      },
      {
        "type": "color_change",
        "colorFrom": "#FFFFFF",
        "colorTo": "#EAEDED",
        "description": "White perchlorate turns to anhydrous magnesium chloride"
      }
    ]
  },
  {
    "id": "astro-027-calcium-perchlorate-thermal-oxygen",
    "name": "Thermal decomposition of Martian calcium perchlorate salts",
    "reactants": [
      "calcium_perchlorate"
    ],
    "products": [
      "cacl2",
      "o2"
    ],
    "enthalpyKjPerMol": 125,
    "description": "Pyrolysis of Martian regolith calcium perchlorate generating oxygen and calcium chloride flux.",
    "reactionType": "decomposition",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Oxygen gas release"
      }
    ]
  },
  {
    "id": "astro-028-martian-perchlorate-ferrous-reduction",
    "name": "Abiotic reduction of Martian perchlorate by ferrous iron in hydrothermal vents",
    "reactants": [
      "magnesium_perchlorate",
      "feo"
    ],
    "products": [
      "mgcl2",
      "fe2o3"
    ],
    "enthalpyKjPerMol": -620,
    "description": "Spontaneous low-temperature detoxification of perchlorate by ferrous basalt minerals in ancient Martian springs.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#1C2833",
        "colorTo": "#922B21",
        "description": "Black ferrous oxide oxidizes to dark red ferric oxide"
      }
    ]
  },
  {
    "id": "astro-029-anorthite-carbothermal-reduction",
    "name": "Carbothermal reduction of anorthite plagioclase for lunar aluminum extraction",
    "reactants": [
      "anorthite",
      "c"
    ],
    "products": [
      "cao",
      "al",
      "sio2",
      "co"
    ],
    "enthalpyKjPerMol": 1280,
    "description": "Vacuum electric smelting of lunar highland regolith yielding structural aluminum and quicklime.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "phase_change",
        "description": "Molten aluminum separates from silicate slag at 1650 °C"
      }
    ]
  },
  {
    "id": "astro-030-anorthite-hydrofluoric-acid-leaching",
    "name": "Hydrofluoric acid digestion of lunar anorthite regolith",
    "reactants": [
      "anorthite",
      "hf"
    ],
    "products": [
      "caf2",
      "alf3",
      "sif4",
      "water"
    ],
    "enthalpyKjPerMol": -450,
    "description": "Fluoride acid leaching extraction separating volatile silicon tetrafluoride and aluminum fluoride.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Volatile silicon tetrafluoride gas boils off"
      }
    ]
  },
  {
    "id": "astro-031-lunar-calcium-oxide-chlorination",
    "name": "Carbochlorination of quicklime from lunar regolith slag",
    "reactants": [
      "cao",
      "c",
      "cl2"
    ],
    "products": [
      "cacl2",
      "co"
    ],
    "enthalpyKjPerMol": -195,
    "description": "Chlorination of residual calcium oxide for molten salt electrolysis feedstock.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#FFFFFF",
        "colorTo": "#FFFFFF",
        "description": "Lime converts to molten calcium chloride salt"
      }
    ]
  },
  {
    "id": "astro-032-calcium-perchlorate-ferrous-reduction",
    "name": "Reduction of calcium perchlorate by wüstite in Martian hydrothermal vents",
    "reactants": [
      "calcium_perchlorate",
      "feo"
    ],
    "products": [
      "cacl2",
      "fe2o3"
    ],
    "enthalpyKjPerMol": -640,
    "description": "Aqueous redox detoxification of perchlorates depositing rusty iron oxyhydroxide muds.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#1C2833",
        "colorTo": "#7B241C",
        "description": "Red hematite mud precipitates"
      }
    ]
  },
  {
    "id": "astro-033-enstatite-carbothermal-reduction",
    "name": "High-temperature carbothermal reduction of enstatite pyroxene",
    "reactants": [
      "enstatite",
      "c"
    ],
    "products": [
      "mg",
      "sio2",
      "co"
    ],
    "enthalpyKjPerMol": 580,
    "description": "Lunar smelting of pyroxene minerals to recover magnesium metal vapor and carbon monoxide.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Magnesium metal vapor distills over at 1500 °C"
      }
    ]
  },
  {
    "id": "astro-034-diopside-carbothermal-reduction",
    "name": "Carbothermal reduction of lunar mare diopside pyroxene",
    "reactants": [
      "diopside",
      "c"
    ],
    "products": [
      "cao",
      "mg",
      "sio2",
      "co"
    ],
    "enthalpyKjPerMol": 620,
    "description": "Comprehensive smelting of lunar clinopyroxene into lime, magnesium, and silica glass.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "phase_change",
        "description": "Vaporization of magnesium alongside carbon monoxide release"
      }
    ]
  },
  {
    "id": "astro-035-schreibersite-oxidation-isru",
    "name": "Thermal oxidation of meteoritic schreibersite for planetary fertilizer synthesis",
    "reactants": [
      "schreibersite",
      "o2"
    ],
    "products": [
      "fe2o3",
      "p4o10"
    ],
    "enthalpyKjPerMol": -3150,
    "description": "Controlled combustion of iron-nickel phosphide scrap yielding ferric oxide and phosphorus pentoxide.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Dense white phosphorus pentoxide smoke condenses"
      }
    ]
  },
  {
    "id": "astro-036-fayalite-methane-reduction",
    "name": "Methane reduction of fayalitic olivine for planetary iron extraction",
    "reactants": [
      "fayalite",
      "ch4"
    ],
    "products": [
      "fe",
      "sio2",
      "co",
      "h2"
    ],
    "enthalpyKjPerMol": 280,
    "description": "Natural gas or ISRU methane reduction of olivine-rich basalts yielding sponge iron.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#7D6608",
        "colorTo": "#7F8C8D",
        "description": "Silicate collapses into granular metallic iron"
      }
    ]
  },
  {
    "id": "astro-037-forsterite-hydrogen-reduction",
    "name": "Ultra-high-temperature hydrogen reduction of forsterite olivine",
    "reactants": [
      "forsterite",
      "h2"
    ],
    "products": [
      "mg",
      "sio2",
      "water"
    ],
    "enthalpyKjPerMol": 590,
    "description": "Concentrated solar furnace thermal reduction of magnesium silicate regolith.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Magnesium vapor and steam evolved above 1700 °C"
      }
    ]
  },
  {
    "id": "astro-038-troilite-carbothermal-reduction",
    "name": "Carbothermal reduction of meteoritic troilite to metallic iron and carbon disulfide",
    "reactants": [
      "troilite",
      "c"
    ],
    "products": [
      "fe",
      "cs2"
    ],
    "enthalpyKjPerMol": 180,
    "description": "High-temperature carbon reduction of asteroid-derived iron sulfide recovering structural iron and carbon disulfide solvent.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Volatile carbon disulfide vapor boils off"
      },
      {
        "type": "color_change",
        "colorFrom": "#B7950B",
        "colorTo": "#7F8C8D",
        "description": "Bronze troilite reduces to metallic gray sponge iron"
      }
    ]
  },
  {
    "id": "astro-039-lunar-rutile-hydrogen-reduction",
    "name": "Hydrogen reduction of titanium dioxide from lunar ilmenite tailings",
    "reactants": [
      "tio2",
      "h2"
    ],
    "products": [
      "ti",
      "water"
    ],
    "enthalpyKjPerMol": 280,
    "description": "Reduction of purified titanium dioxide white pigment to structural titanium metal sponge.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Steam outgassing"
      },
      {
        "type": "color_change",
        "colorFrom": "#FFFFFF",
        "colorTo": "#7F8C8D",
        "description": "White titanium oxide turns metallic gray titanium sponge"
      }
    ]
  },
  {
    "id": "astro-040-molten-regolith-iron-electrolysis",
    "name": "Direct molten regolith electrolysis (MRE) iron oxide decomposition",
    "reactants": [
      "feo"
    ],
    "products": [
      "fe",
      "o2"
    ],
    "enthalpyKjPerMol": 544,
    "description": "Electrolytic decomposition of dissolved ferrous oxide in molten lunar basalt (1450 °C) extracting metallic iron at cathode and oxygen gas at anode.",
    "reactionType": "decomposition",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Oxygen gas bubbles evolve at inert anode"
      },
      {
        "type": "phase_change",
        "description": "Dense molten metallic iron pool collects at bottom"
      }
    ]
  },
  {
    "id": "astro-041-formamide-interstellar-synthesis",
    "name": "Condensation of hydrogen cyanide and water ice in interstellar grain mantles",
    "reactants": [
      "hcn",
      "water"
    ],
    "products": [
      "formamide"
    ],
    "enthalpyKjPerMol": -62,
    "description": "Surface cosmic-ray and UV-driven hydration of HCN in interstellar ice grains (e.g. Hale-Bopp comet).",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "phase_change",
        "description": "Liquid formamide precursor matrix condenses in icy grain mantle"
      }
    ]
  },
  {
    "id": "astro-042-formamide-thermal-decarbonylation",
    "name": "Thermal vacuum decarbonylation of formamide on comet perihelion",
    "reactants": [
      "formamide"
    ],
    "products": [
      "co",
      "ammonia"
    ],
    "enthalpyKjPerMol": 42,
    "description": "Pyrolysis of interstellar formamide replenishing cometary coma carbon monoxide and ammonia outgassing.",
    "reactionType": "decomposition",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Evolution of carbon monoxide and ammonia gas"
      }
    ]
  },
  {
    "id": "astro-043-glycolaldehyde-formaldehyde-dimerization",
    "name": "Dimerization of formaldehyde in interstellar dust cloud grain mantles",
    "reactants": [
      "hcho"
    ],
    "products": [
      "glycolaldehyde"
    ],
    "enthalpyKjPerMol": -125,
    "description": "Non-enzymatic formose initiation reaction forming the simplest prebiotic sugar glycolaldehyde.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "phase_change",
        "description": "Volatile formaldehyde gas condenses into crystalline solid sugar"
      }
    ]
  },
  {
    "id": "astro-044-glycolaldehyde-hydrogenation",
    "name": "Catalytic surface hydrogenation of glycolaldehyde on cosmic dust grains",
    "reactants": [
      "glycolaldehyde",
      "h2"
    ],
    "products": [
      "c2h6o2"
    ],
    "enthalpyKjPerMol": -88,
    "description": "Grain surface H-atom addition converting glycolaldehyde to interstellar ethylene glycol.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "phase_change",
        "description": "Reduction to viscous ethylene glycol liquid"
      }
    ]
  },
  {
    "id": "astro-045-aminoacetonitrile-strecker-synthesis",
    "name": "Interstellar Strecker condensation forming aminoacetonitrile (glycine precursor)",
    "reactants": [
      "hcho",
      "ammonia",
      "hcn"
    ],
    "products": [
      "aminoacetonitrile",
      "water"
    ],
    "enthalpyKjPerMol": -118,
    "description": "Three-component cosmic synthesis detected in Sagittarius B2(N) hot molecular core.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "phase_change",
        "description": "Formation of aminoacetonitrile liquid precursor in grain ice"
      }
    ]
  },
  {
    "id": "astro-046-aminoacetonitrile-hydrolysis-glycine",
    "name": "Hydrothermal aqueous hydrolysis of aminoacetonitrile into glycine in carbonaceous chondrites",
    "reactants": [
      "aminoacetonitrile",
      "water"
    ],
    "products": [
      "glycine",
      "ammonia"
    ],
    "enthalpyKjPerMol": -75,
    "description": "Asteroidal aqueous parent-body alteration yielding racemic amino acids found in Murchison meteorite.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Crystalline glycine amino acid plates crystallize"
      }
    ]
  },
  {
    "id": "astro-047-cyanoacetylene-synthesis",
    "name": "Gas-phase reaction of acetylene and cyanide in dense molecular clouds (TMC-1)",
    "reactants": [
      "c2h2",
      "hcn"
    ],
    "products": [
      "cyanoacetylene",
      "h2"
    ],
    "enthalpyKjPerMol": -45,
    "description": "Radical-neutral addition reaction building extended linear polyynes in interstellar envelopes.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Hydrogen gas release alongside cyanoacetylene formation"
      }
    ]
  },
  {
    "id": "astro-048-cyanogen-prebiotic-photolysis",
    "name": "Cometary photolytic oxidation of hydrogen cyanide to cyanogen",
    "reactants": [
      "hcn",
      "o2"
    ],
    "products": [
      "cyanogen",
      "water"
    ],
    "enthalpyKjPerMol": -410,
    "description": "Photochemical generation of toxic cyanogen gas observed in cometary comae (e.g. Halley).",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Evolution of cyanogen pseudohalogen gas"
      }
    ]
  },
  {
    "id": "astro-049-carbon-suboxide-photochemical-formation",
    "name": "Vacuum UV photolysis of cometary carbon monoxide ice",
    "reactants": [
      "co"
    ],
    "products": [
      "carbon_suboxide",
      "co2"
    ],
    "enthalpyKjPerMol": -18,
    "description": "Irradiation of pure CO ice matrices forming polymerized red-brown carbon suboxide cumulenes.",
    "reactionType": "decomposition",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#FFFFFF",
        "colorTo": "#A93226",
        "description": "Colorless ice turns distinctive reddish-brown cometary residue"
      }
    ]
  },
  {
    "id": "astro-050-carbon-suboxide-hydration-malonic",
    "name": "Hydration of cometary carbon suboxide in melting meteorite ice",
    "reactants": [
      "carbon_suboxide",
      "water"
    ],
    "products": [
      "c3h4o4"
    ],
    "enthalpyKjPerMol": -140,
    "description": "Prebiotic hydrolysis yielding dicarboxylic malonic acid observed in carbonaceous chondrites.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "White crystalline malonic acid precipitates"
      }
    ]
  },
  {
    "id": "astro-051-isocyanic-acid-synthesis",
    "name": "Gas-phase synthesis of isocyanic acid from carbon monoxide and ammonia",
    "reactants": [
      "ammonia",
      "isocyanic_acid"
    ],
    "products": [
      "ch4n2o"
    ],
    "enthalpyKjPerMol": -115,
    "description": "Condensation of isocyanic acid and ammonia on interstellar dust grains producing primordial urea.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "White crystalline urea coats grain surfaces"
      }
    ]
  },
  {
    "id": "astro-052-formamide-methanol-transesterification",
    "name": "Interstellar grain-surface synthesis of methyl formate from formamide and methanol",
    "reactants": [
      "formamide",
      "ch3oh"
    ],
    "products": [
      "methyl_formate",
      "ammonia"
    ],
    "enthalpyKjPerMol": -22,
    "description": "Prebiotic ester synthesis detected abundantly in Orion-KL and W51 hot molecular cores.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "phase_change",
        "description": "Pleasant fruity-scented methyl formate forms"
      }
    ]
  },
  {
    "id": "astro-053-methanethiol-interstellar-synthesis",
    "name": "Cosmic grain-surface synthesis of methanethiol from methane and hydrogen sulfide",
    "reactants": [
      "ch4",
      "h2s"
    ],
    "products": [
      "methanethiol",
      "h2"
    ],
    "enthalpyKjPerMol": 25,
    "description": "Radical-induced sulfur insertion under cosmic ray irradiation generating volatile prebiotic thiols.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Intensely pungent methanethiol and hydrogen gas evolved"
      }
    ]
  },
  {
    "id": "astro-054-cyanamide-dimerization",
    "name": "Prebiotic condensation dimerization of cyanamide to dicyandiamide",
    "reactants": [
      "cyanamide"
    ],
    "products": [
      "dicyandiamide"
    ],
    "enthalpyKjPerMol": -78,
    "description": "Interstellar and prebiotic concentration mechanism generating dicyandiamide phosphorylating reagent.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "White microcrystalline dicyandiamide forms"
      }
    ]
  },
  {
    "id": "astro-055-aminooxazoline-sutherland-synthesis",
    "name": "Prebiotic ribonucleotide precursor condensation of glycolaldehyde with cyanamide",
    "reactants": [
      "glycolaldehyde",
      "cyanamide"
    ],
    "products": [
      "aminooxazoline"
    ],
    "enthalpyKjPerMol": -95,
    "description": "Pivotal step in the Sutherland prebiotic RNA synthesis crystallizing pure aminooxazoline from prebiotic mixtures.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Fine white crystals of 2-aminooxazoline separate cleanly"
      }
    ]
  },
  {
    "id": "astro-056-titan-diacetylene-cyanodiacetylene",
    "name": "Cyanopolyyne growth from diacetylene and HCN in Titan stratosphere",
    "reactants": [
      "diacetylene",
      "hcn"
    ],
    "products": [
      "cyanodiacetylene",
      "h2"
    ],
    "enthalpyKjPerMol": -48,
    "description": "Photochemical chain lengthening producing cyanodiacetylene mapped in cold dark interstellar clouds.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Molecular hydrogen evolution"
      }
    ]
  },
  {
    "id": "astro-057-titan-cyanogen-diacetylene-ice",
    "name": "Photochemical coupling of diacetylene and cyanogen in Titan polar clouds",
    "reactants": [
      "diacetylene",
      "cyanogen"
    ],
    "products": [
      "dicyanodiacetylene",
      "h2"
    ],
    "enthalpyKjPerMol": -52,
    "description": "Formation of solid dicyanodiacetylene crystalline ice observed by Cassini CIRS spectrometer.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "phase_change",
        "description": "Condensation into golden-yellow stratospheric ice particles"
      }
    ]
  },
  {
    "id": "astro-058-carbonyl-sulfide-synthesis",
    "name": "Direct synthesis of carbonyl sulfide from carbon monoxide and sulfur vapor",
    "reactants": [
      "co",
      "s"
    ],
    "products": [
      "carbonyl_sulfide"
    ],
    "enthalpyKjPerMol": -35,
    "description": "High-temperature thermochemical formation in the lower troposphere of Venus.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#F4D03F",
        "colorTo": "#FFFFFF",
        "description": "Yellow sulfur dissolves into gas-phase carbonyl sulfide"
      }
    ]
  },
  {
    "id": "astro-059-carbonyl-sulfide-photolysis",
    "name": "Atmospheric UV photodecomposition of carbonyl sulfide",
    "reactants": [
      "carbonyl_sulfide"
    ],
    "products": [
      "co",
      "s"
    ],
    "enthalpyKjPerMol": 35,
    "description": "Photolysis in the upper clouds of Venus regenerating elemental sulfur haze particles.",
    "reactionType": "decomposition",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#FFFFFF",
        "colorTo": "#F4D03F",
        "description": "Precipitation of pale yellow sulfur aerosols"
      }
    ]
  },
  {
    "id": "astro-060-jupiter-ammonium-hydrosulfide-clouds",
    "name": "Condensation of ammonia and hydrogen sulfide forming Jupiter cloud deck",
    "reactants": [
      "ammonia",
      "h2s"
    ],
    "products": [
      "ammonium_hydrosulfide"
    ],
    "enthalpyKjPerMol": -95,
    "description": "Equilibrium condensation creating the dense intermediate cloud layer at 2 bar depth in Jupiter.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#F9E79F",
        "description": "Dense yellowish-white ammonium hydrosulfide snow forms"
      }
    ]
  },
  {
    "id": "astro-061-titan-methane-photolysis-acetylene",
    "name": "Solar UV photolysis of methane in Titan upper atmosphere to acetylene",
    "reactants": [
      "ch4",
      "ammonia"
    ],
    "products": [
      "methylamine",
      "h2"
    ],
    "enthalpyKjPerMol": 58,
    "description": "Upper atmospheric ionization discharge coupling nitrogen and methane into primary amines.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Evolution of fishy-scented methylamine and hydrogen gas"
      }
    ]
  },
  {
    "id": "astro-062-titan-damn-hcn-tetramerization",
    "name": "Tholin aerosol precursor tetramerization of hydrogen cyanide",
    "reactants": [
      "hcn"
    ],
    "products": [
      "diaminomaleonitrile"
    ],
    "enthalpyKjPerMol": -165,
    "description": "Base-catalyzed prebiotic condensation of 4 HCN molecules into crystalline diaminomaleonitrile (DAMN).",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#F5EEF8",
        "description": "Pale yellow-brown DAMN crystals precipitate"
      }
    ]
  },
  {
    "id": "astro-063-titan-adenine-formation-damn",
    "name": "Polymerization of diaminomaleonitrile with HCN yielding adenine nucleobase",
    "reactants": [
      "diaminomaleonitrile",
      "hcn"
    ],
    "products": [
      "adenine"
    ],
    "enthalpyKjPerMol": -98,
    "description": "Photochemically driven ring-closure of DAMN with HCN building the adenine purine ring in planetary tholins.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Pure crystalline adenine nucleobase forms"
      }
    ]
  },
  {
    "id": "astro-064-jupiter-disilane-oxidation",
    "name": "Pyrophoric oxidation of disilane in planetary impact plumes",
    "reactants": [
      "disilane",
      "o2"
    ],
    "products": [
      "sio2",
      "water"
    ],
    "enthalpyKjPerMol": -1480,
    "description": "Hypergolic pyrophoric oxidation of disilane in impact plumes depositing amorphous silica nanoparticles and water.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Blinding white flash and combustion"
      },
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Dense white silica nanoparticle smoke condenses"
      }
    ]
  },
  {
    "id": "astro-065-venus-carbonyl-sulfide-so3-reaction",
    "name": "Reduction of sulfur trioxide by carbonyl sulfide in Venus lower clouds",
    "reactants": [
      "carbonyl_sulfide",
      "so3"
    ],
    "products": [
      "co2",
      "so2",
      "s"
    ],
    "enthalpyKjPerMol": -85,
    "description": "Catalytic sulfur cycling in the lower cloud deck of Venus maintaining elemental sulfur aerosols.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#FFFFFF",
        "colorTo": "#F4D03F",
        "description": "Precipitation of pale yellow sulfur aerosols"
      }
    ]
  },
  {
    "id": "astro-066-venus-water-loss-wustite",
    "name": "Catastrophic atmospheric water loss via wüstite oxidation on Venus surface",
    "reactants": [
      "feo",
      "water"
    ],
    "products": [
      "fe3o4",
      "h2"
    ],
    "enthalpyKjPerMol": -42,
    "description": "Basalt-water reaction oxidizing crustal wüstite to magnetite, releasing hydrogen for space escape.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Hydrogen gas evolved for hydrodynamic planetary escape"
      },
      {
        "type": "color_change",
        "colorFrom": "#1C2833",
        "colorTo": "#1C2833",
        "description": "Crustal iron oxidizes with water loss"
      }
    ]
  },
  {
    "id": "astro-067-titan-acetonitrile-synthesis",
    "name": "Photochemical coupling of acetylene and ammonia forming acetonitrile",
    "reactants": [
      "c2h2",
      "ammonia"
    ],
    "products": [
      "c2h3n",
      "h2"
    ],
    "enthalpyKjPerMol": -35,
    "description": "UV-driven ion-molecule synthesis of acetonitrile mapped by ALMA in Titan atmosphere.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Hydrogen gas release alongside volatile acetonitrile vapor"
      }
    ]
  },
  {
    "id": "astro-068-venus-carbonyl-sulfide-so2-reduction",
    "name": "Reduction of sulfur dioxide by carbonyl sulfide on Venus",
    "reactants": [
      "carbonyl_sulfide",
      "so2"
    ],
    "products": [
      "co2",
      "s"
    ],
    "enthalpyKjPerMol": -115,
    "description": "Catalytic sulfur cycling in the lower cloud deck of Venus maintaining elemental sulfur aerosols.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#FFFFFF",
        "colorTo": "#F4D03F",
        "description": "Precipitation of sulfur droplets and CO2"
      }
    ]
  },
  {
    "id": "astro-069-jupiter-phosphine-water-hydrolysis",
    "name": "Deep hydrothermal hydrolysis of phosphine in Jovian water cloud deck",
    "reactants": [
      "ph3",
      "water"
    ],
    "products": [
      "h3po4",
      "h2"
    ],
    "enthalpyKjPerMol": -68,
    "description": "Thermochemical oxidation of deep tropospheric phosphine into orthophosphoric acid in Jovian water clouds.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Hydrogen gas evolution"
      }
    ]
  },
  {
    "id": "astro-070-planetary-methane-so2-reduction",
    "name": "Thermochemical reduction of sulfur dioxide by methane in reducing planetary atmospheres",
    "reactants": [
      "ch4",
      "so2"
    ],
    "products": [
      "co2",
      "s",
      "water"
    ],
    "enthalpyKjPerMol": -165,
    "description": "High-temperature gas-phase reduction of volcanic sulfur dioxide by atmospheric methane depositing elemental sulfur.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#FFFFFF",
        "colorTo": "#F4D03F",
        "description": "Yellow sulfur aerosol fog condenses alongside water vapor"
      }
    ]
  },
  {
    "id": "astro-071-titan-nitrogen-methane-hcn",
    "name": "Corona discharge synthesis of hydrogen cyanide in Titan nitrogen-methane atmosphere",
    "reactants": [
      "n2",
      "c2h2"
    ],
    "products": [
      "hcn"
    ],
    "enthalpyKjPerMol": -12,
    "description": "Energetic electron and UV flux coupling molecular nitrogen and acetylene into hydrogen cyanide.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Formation of gas-phase hydrogen cyanide"
      }
    ]
  },
  {
    "id": "astro-072-titan-toluene-formation",
    "name": "Photochemical alkylation of benzene by methane yielding toluene in Titan smog",
    "reactants": [
      "c6h6",
      "ch4"
    ],
    "products": [
      "c7h8",
      "h2"
    ],
    "enthalpyKjPerMol": 48,
    "description": "Solar UV and cosmic-ray driven alkylation building methyl-substituted aromatics in Titan orange organic haze.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#FFFFFF",
        "colorTo": "#D4AC0D",
        "description": "Clear aromatic vapors condense into amber-hued aerosol droplets"
      }
    ]
  },
  {
    "id": "astro-073-mars-perchlorate-uv-photolysis",
    "name": "Photochemical vacuum UV reduction of Martian surface perchlorates",
    "reactants": [
      "magnesium_perchlorate",
      "h2o2"
    ],
    "products": [
      "mgcl2",
      "o2",
      "water"
    ],
    "enthalpyKjPerMol": -380,
    "description": "Peroxide-accelerated decomposition of perchlorates under intense Martian surface UV radiation.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Vigorous oxygen gas evolution"
      }
    ]
  },
  {
    "id": "astro-074-mars-fumarolic-feso4-calcination",
    "name": "Thermal roasting decomposition of ferrous sulfate in Martian fumaroles",
    "reactants": [
      "feso4"
    ],
    "products": [
      "fe2o3",
      "so2",
      "so3"
    ],
    "enthalpyKjPerMol": 245,
    "description": "Volcanic fumarolic desulfurization of ferrous sulfate depositing red hematite crust and releasing SO2 and SO3 gases.",
    "reactionType": "decomposition",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Evolution of sulfur dioxide and sulfur trioxide fumes"
      },
      {
        "type": "color_change",
        "colorFrom": "#A2D9CE",
        "colorTo": "#7B241C",
        "description": "Pale green vitriol decomposes to dark red hematite"
      }
    ]
  },
  {
    "id": "astro-075-mercury-enstatite-solar-wind-reduction",
    "name": "Solar wind proton reduction of surface enstatite pyroxene on Mercury",
    "reactants": [
      "enstatite",
      "h2"
    ],
    "products": [
      "mg",
      "sio2",
      "water"
    ],
    "enthalpyKjPerMol": 410,
    "description": "Space weathering reduction of rocky regolith by solar wind hydrogen creating submicroscopic metallic magnesium blebs.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Water vapor outgassing into Mercury exosphere"
      }
    ]
  },
  {
    "id": "astro-076-io-pyrite-thermal-desulfurization",
    "name": "Thermal pyrolytic desulfurization of pyrite on Io and hot rocky exoplanets",
    "reactants": [
      "fes2"
    ],
    "products": [
      "troilite",
      "s"
    ],
    "enthalpyKjPerMol": 135,
    "description": "Vacuum thermal desulfurization of pyrite mineral at 700 °C releasing yellow elemental sulfur vapor and leaving stoichiometric troilite.",
    "reactionType": "decomposition",
    "observableEffects": [
      {
        "type": "phase_change",
        "description": "Yellow elemental sulfur vapor outgasses and condenses into bright frost"
      },
      {
        "type": "color_change",
        "colorFrom": "#B7950B",
        "colorTo": "#7D6608",
        "description": "Golden pyrite turns to bronze troilite"
      }
    ]
  },
  {
    "id": "astro-077-triton-methane-nitrogen-radiolysis",
    "name": "Solar wind and cosmic ray radiolysis of nitrogen-methane ices on Neptune moon Triton",
    "reactants": [
      "n2",
      "ch4"
    ],
    "products": [
      "hcn",
      "ammonia"
    ],
    "enthalpyKjPerMol": 65,
    "description": "Cryogenic surface radiolysis generating reddish organic tholin stains on nitrogen polar caps.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#FFFFFF",
        "colorTo": "#BA4A00",
        "description": "Colorless ices turn pinkish-red tholin polymer"
      }
    ]
  },
  {
    "id": "astro-078-pluto-carbon-monoxide-methane-tholin",
    "name": "Solar UV photolysis of Pluto nitrogen-methane-CO atmosphere",
    "reactants": [
      "co",
      "ch4"
    ],
    "products": [
      "hcho",
      "c2h2"
    ],
    "enthalpyKjPerMol": 85,
    "description": "Far-UV atmospheric synthesis building complex smog particles settling onto Pluto Cthulhu Macula.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#FFFFFF",
        "colorTo": "#6E2C00",
        "description": "Dark brown-red tholin particles rain onto nitrogen glacier"
      }
    ]
  },
  {
    "id": "astro-079-europa-radiolytic-hydrogen-peroxide",
    "name": "Charged particle radiolysis of Europa surface water ice",
    "reactants": [
      "water",
      "o2"
    ],
    "products": [
      "h2o2"
    ],
    "enthalpyKjPerMol": 188,
    "description": "Magnetospheric sulfur and electron bombardment creating surface hydrogen peroxide oxidants.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#FFFFFF",
        "colorTo": "#FFFFFF",
        "description": "Hydrogen peroxide hydrates trapped in surface ice"
      }
    ]
  },
  {
    "id": "astro-080-enceladus-methanogenesis-equilibrium",
    "name": "Deep hydrothermal methanogenesis equilibrium in Enceladus core",
    "reactants": [
      "co2",
      "h2s"
    ],
    "products": [
      "carbonyl_sulfide",
      "water"
    ],
    "enthalpyKjPerMol": 28,
    "description": "Equilibrium coupling of carbon dioxide and hydrothermal sulfide in alkaline ocean vents.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "phase_change",
        "description": "Trace carbonyl sulfide outgasses in south polar plumes"
      }
    ]
  },
  {
    "id": "astro-081-wachtershauser-iron-sulfur-formate",
    "name": "Wächtershäuser iron-sulfur world primordial carbon fixation",
    "reactants": [
      "co2",
      "fes",
      "h2s"
    ],
    "products": [
      "fes2",
      "hcooh"
    ],
    "enthalpyKjPerMol": -48,
    "description": "Chemoautotrophic reduction of CO2 coupled to the exergonic oxidation of FeS to pyrite in primordial hydrothermal vents.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#1C2833",
        "colorTo": "#B7950B",
        "description": "Black troilite transforms into golden metallic pyrite crystals"
      }
    ]
  },
  {
    "id": "astro-082-wachtershauser-pyrite-hydrogen",
    "name": "Primordial pyrite-pulled electron generation from troilite and hydrogen sulfide",
    "reactants": [
      "fes",
      "h2s"
    ],
    "products": [
      "fes2",
      "h2"
    ],
    "enthalpyKjPerMol": -38,
    "description": "Fundamental geochemical energy source generating high-potential reducing equivalents on early Earth and Enceladus.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Evolution of molecular hydrogen gas"
      },
      {
        "type": "color_change",
        "colorFrom": "#1C2833",
        "colorTo": "#B7950B",
        "description": "Golden pyrite flakes crystallize"
      }
    ]
  },
  {
    "id": "astro-083-formose-glycolaldehyde-dimerization-erythrose",
    "name": "Formose condensation of two glycolaldehyde molecules yielding erythrose",
    "reactants": [
      "glycolaldehyde"
    ],
    "products": [
      "erythrose"
    ],
    "enthalpyKjPerMol": -115,
    "description": "Non-enzymatic aldol self-condensation building 4-carbon tetrose sugars in warm alkaline springs.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "phase_change",
        "description": "Formation of viscous tetrose sugar syrup"
      }
    ]
  },
  {
    "id": "astro-084-formose-ribose-pentose-synthesis",
    "name": "Formose cross-aldol condensation of glycolaldehyde and triose to ribose",
    "reactants": [
      "glycolaldehyde",
      "c3h6o3_gap"
    ],
    "products": [
      "ribose"
    ],
    "enthalpyKjPerMol": -98,
    "description": "Prebiotic synthesis of D-ribose sugar forming the backbone of prebiotic RNA.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "phase_change",
        "description": "Viscous syrup yields crystalline D-ribose"
      }
    ]
  },
  {
    "id": "astro-085-pyrophosphate-prebiotic-condensation",
    "name": "Thermal mineral condensation of orthophosphate to pyrophosphate on volcanic basalt",
    "reactants": [
      "na2hpo4"
    ],
    "products": [
      "na4p2o7",
      "water"
    ],
    "enthalpyKjPerMol": 38,
    "description": "Dry-heating evaporation of prebiotic puddles condensing orthophosphate into energy-rich pyrophosphate.",
    "reactionType": "decomposition",
    "observableEffects": [
      {
        "type": "phase_change",
        "description": "Dehydration yielding anhydrous crystalline sodium pyrophosphate"
      }
    ]
  },
  {
    "id": "astro-086-trimetaphosphate-thermal-condensation",
    "name": "Volcanic mineral-mediated cyclic condensation yielding sodium trimetaphosphate",
    "reactants": [
      "nah2po4"
    ],
    "products": [
      "sodium_trimetaphosphate",
      "water"
    ],
    "enthalpyKjPerMol": 78,
    "description": "High-temperature volcanic fumarole dehydration producing cyclic trimetaphosphate phosphorylating agent.",
    "reactionType": "decomposition",
    "observableEffects": [
      {
        "type": "phase_change",
        "description": "White microcrystalline ring metaphosphate forms"
      }
    ]
  },
  {
    "id": "astro-087-strecker-alanine-synthesis",
    "name": "Prebiotic Strecker synthesis of alanine from acetaldehyde, HCN, and water",
    "reactants": [
      "ch3cho",
      "hcn",
      "water"
    ],
    "products": [
      "alanine"
    ],
    "enthalpyKjPerMol": -120,
    "description": "Single-pot hydrothermal condensation and hydrolysis yielding racemic alanine amino acid.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "White crystalline alanine amino acid precipitates"
      }
    ]
  },
  {
    "id": "astro-088-prebiotic-pyruvate-synthesis",
    "name": "Hydrothermal carbonylation of acetic acid on iron-nickel catalysts",
    "reactants": [
      "ch3cooh",
      "co"
    ],
    "products": [
      "c3h4o3_pyruvate"
    ],
    "enthalpyKjPerMol": -32,
    "description": "Primordial carbon-chain elongation building pyruvic acid central to the reverse Krebs cycle.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#FFFFFF",
        "colorTo": "#FAFAFA",
        "description": "Clear solution turns pale yellowish pyruvic acid"
      }
    ]
  },
  {
    "id": "astro-089-pyruvate-alanine-reductive-amination",
    "name": "Primordial reductive amination of pyruvate to alanine in hydrothermal vents",
    "reactants": [
      "ammonia",
      "c3h4o3_pyruvate",
      "h2"
    ],
    "products": [
      "alanine",
      "water"
    ],
    "enthalpyKjPerMol": -88,
    "description": "Geochemical prebiotic amino acid synthesis coupling pyruvate, ammonia, and hydrogen on iron-sulfide surfaces.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Precipitation of alanine amino acid"
      }
    ]
  },
  {
    "id": "astro-090-hadean-iron-co2-reduction",
    "name": "Direct carbon dioxide reduction by native iron in Hadean hydrothermal systems",
    "reactants": [
      "co2",
      "fe"
    ],
    "products": [
      "feo",
      "co"
    ],
    "enthalpyKjPerMol": 18,
    "description": "Exergonic reduction of dissolved oceanic CO2 by meteoritic or native iron depositing wüstite and releasing carbon monoxide.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#7F8C8D",
        "colorTo": "#1C2833",
        "description": "Metallic iron turns black wüstite crust"
      }
    ]
  },
  {
    "id": "astro-091-meteoritic-schreibersite-acid-corrosion",
    "name": "Acidic weathering dissolution of meteoritic schreibersite releasing phosphine",
    "reactants": [
      "schreibersite",
      "hcl"
    ],
    "products": [
      "fecl2",
      "ph3",
      "h2"
    ],
    "enthalpyKjPerMol": -310,
    "description": "Acid digestion of extraterrestrial iron phosphide by primordial volcanic hydrochloric acid generating phosphine gas and hydrogen.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Pungent garlic-like phosphine gas and hydrogen effervesce"
      },
      {
        "type": "color_change",
        "colorFrom": "#7B7D7D",
        "colorTo": "#A2D9CE",
        "description": "Dark meteoritic mineral dissolves into pale green ferrous chloride"
      }
    ]
  },
  {
    "id": "astro-092-formate-ferric-reduction",
    "name": "Abiotic reduction of hydrothermal ferric iron by primordial formate",
    "reactants": [
      "fecl3",
      "hcooh"
    ],
    "products": [
      "fecl2",
      "co2",
      "hcl"
    ],
    "enthalpyKjPerMol": -68,
    "description": "Electron-transfer coupling between organic acids and mineral iron in early alkaline vent systems.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Carbon dioxide effervescence"
      },
      {
        "type": "color_change",
        "colorFrom": "#B03A2E",
        "colorTo": "#A2D9CE",
        "description": "Rust-red ferric solution clarifies to pale green ferrous"
      }
    ]
  },
  {
    "id": "astro-093-meteoritic-phosphite-oxidation",
    "name": "Photochemical oxidation of prebiotic phosphorous acid to orthophosphoric acid",
    "reactants": [
      "h3po3",
      "o2"
    ],
    "products": [
      "h3po4"
    ],
    "enthalpyKjPerMol": -310,
    "description": "UV-driven atmospheric oxidation converting soluble phosphite into structural phosphate for nucleic acids.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Strong exothermic oxidation"
      }
    ]
  },
  {
    "id": "astro-094-meteoritic-hypophosphorous-oxidation",
    "name": "Stepwise oxidation of meteoritic hypophosphorous acid to phosphorous acid",
    "reactants": [
      "hypophosphorous_acid",
      "o2"
    ],
    "products": [
      "h3po3"
    ],
    "enthalpyKjPerMol": -380,
    "description": "Atmospheric oxidation of reduced phosphorus released by schreibersite weathering.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Exothermic oxidation"
      }
    ]
  },
  {
    "id": "astro-095-ribose-furfural-dehydration",
    "name": "Prebiotic acid-catalyzed dehydration of D-ribose to furfural",
    "reactants": [
      "ribose"
    ],
    "products": [
      "furfural",
      "water"
    ],
    "enthalpyKjPerMol": 28,
    "description": "Thermal decomposition pathway of unprotected pentoses in the absence of mineral borate stabilizers.",
    "reactionType": "decomposition",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#FFFFFF",
        "colorTo": "#F5B041",
        "description": "White sugar turns into golden-amber oily furfural liquid with almond aroma"
      }
    ]
  },
  {
    "id": "astro-096-glycine-dimerization-peptide-bond",
    "name": "Primordial peptide bond condensation of glycine to glycylglycine",
    "reactants": [
      "glycine",
      "carbonyl_sulfide"
    ],
    "products": [
      "glycylglycine",
      "co2",
      "h2s"
    ],
    "enthalpyKjPerMol": -48,
    "description": "Carbonyl sulfide-promoted prebiotic polymerization of amino acids into peptides under volcanic conditions.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Evolution of carbon dioxide and hydrogen sulfide"
      },
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "White dipeptide glycylglycine precipitates"
      }
    ]
  },
  {
    "id": "astro-097-alanine-glycine-peptide-condensation",
    "name": "Abiotic dipeptide formation between alanine and glycine mediated by COS",
    "reactants": [
      "alanine",
      "glycine",
      "carbonyl_sulfide"
    ],
    "products": [
      "c5h10n2o3_alanylglycine",
      "co2",
      "h2s"
    ],
    "enthalpyKjPerMol": -52,
    "description": "Volcanic gas-mediated non-ribosomal peptide bond formation yielding mixed alanylglycine dipeptide.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Carbon dioxide and hydrogen sulfide gas release"
      },
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Mixed dipeptide crystallizes from warm aqueous solution"
      }
    ]
  },
  {
    "id": "astro-098-alanine-homodipeptide-condensation",
    "name": "Prebiotic volcanic condensation of alanine to alanylalanine",
    "reactants": [
      "alanine",
      "carbonyl_sulfide"
    ],
    "products": [
      "c6h12n2o3_alanylalanine",
      "co2",
      "h2s"
    ],
    "enthalpyKjPerMol": -50,
    "description": "Direct COS-activated peptide coupling of two alanine molecules without modern ribosome machinery.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Pungent hydrogen sulfide and carbon dioxide effervescence"
      },
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Crystalline alanylalanine precipitates"
      }
    ]
  },
  {
    "id": "astro-099-methanethiol-acetate-thioester-coupling",
    "name": "Primordial thioester synthesis from methanethiol and acetic acid",
    "reactants": [
      "methanethiol",
      "ch3cooh"
    ],
    "products": [
      "methyl_thioacetate",
      "water"
    ],
    "enthalpyKjPerMol": -12,
    "description": "Prebiotic formation of energy-rich high-energy thioester bonds central to the origin of metabolism.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#FFFFFF",
        "colorTo": "#FFFFFF",
        "description": "Condensation into distinct organic ester phase"
      }
    ]
  },
  {
    "id": "astro-100-saladino-formamide-adenine-synthesis",
    "name": "Saladino prebiotic purine synthesis of adenine from formamide and HCN",
    "reactants": [
      "formamide",
      "hcn"
    ],
    "products": [
      "adenine",
      "water"
    ],
    "enthalpyKjPerMol": -85,
    "description": "Mineral-catalyzed prebiotic condensation of formamide with four HCN molecules yielding adenine and water.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Dense white microcrystalline adenine precipitates"
      }
    ]
  }
];
