// Domain 42: Semiconductor CVD, ALD, Etch & Microelectronics (100 reactions)
import type { ReactionDefinition } from "./types.js";

export const DOMAIN_42_REACTIONS: ReactionDefinition[] = [
  {
    "id": "semi-001-disilane-high-rate-polysilicon",
    "name": "Disilane pyrolytic CVD of polycrystalline silicon thin films",
    "reactants": [
      "si2h6"
    ],
    "products": [
      "si",
      "h2"
    ],
    "enthalpyKjPerMol": 185,
    "description": "High-rate low-temperature (500-550 °C) chemical vapor deposition of polycrystalline silicon thin films.",
    "reactionType": "decomposition",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Pyrolytic decomposition depositing silicon film with hydrogen gas release"
      }
    ]
  },
  {
    "id": "semi-002-trisilane-low-temp-epitaxy",
    "name": "Trisilane low-temperature chemical vapor deposition of amorphous silicon",
    "reactants": [
      "si3h8"
    ],
    "products": [
      "si",
      "h2"
    ],
    "enthalpyKjPerMol": 240,
    "description": "Fast deposition of conformal amorphous silicon gates and FinFET channel sacrificial layers at temperatures down to 450 °C.",
    "reactionType": "decomposition",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Ultra-low temperature pyrolytic silicon thin-film deposition"
      }
    ]
  },
  {
    "id": "semi-003-dcs-low-temp-oxide",
    "name": "Dichlorosilane low-temperature oxidation (LTO) spacer oxide CVD",
    "reactants": [
      "sih2cl2",
      "o2"
    ],
    "products": [
      "sio2",
      "hcl"
    ],
    "enthalpyKjPerMol": -820,
    "description": "Low-temperature oxidation of dichlorosilane at 400-450 °C depositing conformal gate spacer silicon dioxide dielectric.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Exothermic vapor-phase reaction depositing conformal dielectric oxide"
      }
    ]
  },
  {
    "id": "semi-004-stc-zinc-reduction",
    "name": "Silicon tetrachloride reduction by zinc vapor for semiconductor polysilicon",
    "reactants": [
      "sicl4",
      "zn"
    ],
    "products": [
      "si",
      "zncl2"
    ],
    "enthalpyKjPerMol": -380,
    "description": "Historical DuPont process reducing STC with molten zinc vapor at 950 °C to produce high-purity semiconductor silicon needles.",
    "reactionType": "single_displacement",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Exothermic metal vapor reduction depositing elemental silicon crystals"
      }
    ]
  },
  {
    "id": "semi-005-stc-calcium-reduction",
    "name": "Silicon tetrachloride metallothermic reduction by calcium vapor",
    "reactants": [
      "sicl4",
      "ca"
    ],
    "products": [
      "si",
      "cacl2"
    ],
    "enthalpyKjPerMol": -590,
    "description": "High-temperature metallothermic reduction producing high-purity polycrystalline silicon with calcium chloride slag.",
    "reactionType": "single_displacement",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Intense exothermic reduction yielding crystalline silicon"
      }
    ]
  },
  {
    "id": "semi-006-tcs-zinc-reduction",
    "name": "Trichlorosilane reduction by zinc vapor in polycrystalline silicon growth",
    "reactants": [
      "sihcl3",
      "zn"
    ],
    "products": [
      "si",
      "zncl2",
      "h2"
    ],
    "enthalpyKjPerMol": -240,
    "description": "Zinc reduction variant producing silicon rods at reduced furnace operating temperatures.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Deposition of polycrystalline silicon with zinc chloride subliming off"
      }
    ]
  },
  {
    "id": "semi-007-digermane-low-temp-epitaxy",
    "name": "Digermane pyrolytic low-temperature chemical vapor deposition of germanium",
    "reactants": [
      "ge2h6"
    ],
    "products": [
      "ge",
      "h2"
    ],
    "enthalpyKjPerMol": 165,
    "description": "Decomposition of digermane at 350-450 °C to deposit pure germanium channel layers for high-hole-mobility pFETs.",
    "reactionType": "decomposition",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Low-temperature deposition of mirror-smooth metallic germanium thin film"
      }
    ]
  },
  {
    "id": "semi-008-digermane-n2o-gate-oxide",
    "name": "Digermane nitrous oxide chemical vapor deposition of germanium dioxide gate dielectric",
    "reactants": [
      "ge2h6",
      "n2o"
    ],
    "products": [
      "geo2",
      "n2",
      "water"
    ],
    "enthalpyKjPerMol": -1650,
    "description": "Low-temperature CVD oxidation of digermane by nitrous oxide depositing passivation GeO2 gate oxide for high-mobility Ge channels.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Vigorous oxidation depositing dielectric GeO2 thin film"
      }
    ]
  },
  {
    "id": "semi-009-phosphine-scrubber-oxidation",
    "name": "Phosphine gas scrubber decontamination via hypochlorite oxidation",
    "reactants": [
      "ph3",
      "naocl"
    ],
    "products": [
      "h3po4",
      "nacl"
    ],
    "enthalpyKjPerMol": -1180,
    "description": "Point-of-use scrubber wet chemical oxidation neutralizing lethal phosphine exhaust from doping chambers into safe phosphate.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Exothermic wet oxidation neutralizing toxic hydride gas into clear solution"
      }
    ]
  },
  {
    "id": "semi-010-diborane-scrubber-oxidation",
    "name": "Diborane semiconductor exhaust scrubber hypochlorite oxidation",
    "reactants": [
      "b2h6",
      "naocl"
    ],
    "products": [
      "h3bo3",
      "nacl"
    ],
    "enthalpyKjPerMol": -1420,
    "description": "Effluent gas scrubber oxidation converting toxic diborane exhaust into soluble boric acid and sodium chloride.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Rapid chemical decontamination of toxic boron dopant gas"
      }
    ]
  },
  {
    "id": "semi-011-silane-nitrogen-pecvd-nitride",
    "name": "Plasma-enhanced CVD (PECVD) of silicon nitride from silane and nitrogen",
    "reactants": [
      "sih4",
      "n2"
    ],
    "products": [
      "si3n4",
      "h2"
    ],
    "enthalpyKjPerMol": -280,
    "description": "RF plasma cracking of molecular nitrogen and silane at 300 °C depositing passivation and moisture-barrier Si3N4 films.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#EAEDED",
        "colorTo": "#2E4053",
        "description": "Deposition of hard, scratch-resistant dielectric silicon nitride film"
      }
    ]
  },
  {
    "id": "semi-012-teos-ozone-sacvd",
    "name": "Sub-atmospheric CVD (SACVD) of silicon dioxide from TEOS and ozone",
    "reactants": [
      "teos",
      "o3"
    ],
    "products": [
      "sio2",
      "ch3cho",
      "water"
    ],
    "enthalpyKjPerMol": -1450,
    "description": "Ozone-activated decomposition of TEOS providing flow-like gap fill in sub-20nm shallow trench isolation (STI) structures.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Exothermic ozone-catalyzed deposition of dielectric silicon dioxide"
      }
    ]
  },
  {
    "id": "semi-013-mts-sic-power-cvd",
    "name": "Methyltrichlorosilane (MTS) single-source chemical vapor deposition of silicon carbide",
    "reactants": [
      "ch3sicl3"
    ],
    "products": [
      "sic",
      "hcl"
    ],
    "enthalpyKjPerMol": -110,
    "description": "High-temperature (1350 °C) pyrolysis of stoichiometric organosilane precursor depositing 4H-SiC power semiconductor epitaxial layers.",
    "reactionType": "decomposition",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Deposition of transparent, ultra-hard silicon carbide semiconductor layer"
      }
    ]
  },
  {
    "id": "semi-014-silicon-tetrachloride-ammonia-nitride",
    "name": "Silicon tetrachloride LPCVD of silicon nitride at high temperature",
    "reactants": [
      "sicl4",
      "ammonia"
    ],
    "products": [
      "si3n4",
      "hcl"
    ],
    "enthalpyKjPerMol": -420,
    "description": "Reaction of STC with ammonia at 850 °C producing high-density, hydrogen-free silicon nitride gate dielectric layers.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Deposition of dense silicon nitride film with HCl evolution"
      }
    ]
  },
  {
    "id": "semi-015-disilane-nitrous-oxide-oxide",
    "name": "Disilane nitrous oxide chemical vapor deposition of silicon dioxide",
    "reactants": [
      "si2h6",
      "n2o"
    ],
    "products": [
      "sio2",
      "n2",
      "water"
    ],
    "enthalpyKjPerMol": -1820,
    "description": "Rapid low-temperature deposition of gate spacer silicon dioxide films from reactive disilane and nitrous oxide.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Vigorous oxidation depositing dielectric SiO2 film"
      }
    ]
  },
  {
    "id": "semi-016-silicon-tetrabromide-hydrogen-epitaxy",
    "name": "Silicon tetrabromide hydrogen reduction for low-defect silicon epitaxy",
    "reactants": [
      "sibr4",
      "h2"
    ],
    "products": [
      "si",
      "hbr"
    ],
    "enthalpyKjPerMol": 135,
    "description": "Bromide-based vapor phase epitaxy providing reduced autodoping and sharp dopant transition profiles.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Epitaxial deposition of pure silicon with volatile HBr exhaust"
      }
    ]
  },
  {
    "id": "semi-017-germane-ozone-ald-oxide",
    "name": "Ozone-assisted low-temperature CVD of germanium dioxide gate dielectric",
    "reactants": [
      "geh4",
      "o3"
    ],
    "products": [
      "geo2",
      "water"
    ],
    "enthalpyKjPerMol": -790,
    "description": "Ozone oxidation of germane at 250 °C passivating high-mobility germanium pFET channel interfaces.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Deposition of clear germanium dioxide dielectric thin film"
      }
    ]
  },
  {
    "id": "semi-018-digermane-oxygen-oxidation",
    "name": "Digermane thermal oxidation for high-dielectric GeO2 gate oxide",
    "reactants": [
      "ge2h6",
      "o2"
    ],
    "products": [
      "geo2",
      "water"
    ],
    "enthalpyKjPerMol": -1410,
    "description": "Direct thermal oxidation of digermane depositing conformal germanium dioxide for high-mobility device isolation.",
    "reactionType": "combustion",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Exothermic vapor-phase oxidation depositing GeO2 dielectric"
      }
    ]
  },
  {
    "id": "semi-019-silane-ethylene-sic-cvd",
    "name": "Silane and ethylene co-deposition of cubic silicon carbide (3C-SiC)",
    "reactants": [
      "sih4",
      "c2h4"
    ],
    "products": [
      "sic",
      "ch4",
      "h2"
    ],
    "enthalpyKjPerMol": -310,
    "description": "LPCVD heteroepitaxial growth of silicon carbide thin films on silicon wafers at 900-1100 °C.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Heteroepitaxial growth of durable SiC ceramic semiconductor film"
      }
    ]
  },
  {
    "id": "semi-020-silicon-tetrafluoride-hydrogen-plasma",
    "name": "Silicon tetrafluoride reduction in hydrogen plasma for microcrystalline silicon",
    "reactants": [
      "sif4",
      "h2"
    ],
    "products": [
      "si",
      "hf"
    ],
    "enthalpyKjPerMol": 280,
    "description": "Plasma-enhanced chemical vapor deposition using SiF4 and H2 to grow microcrystalline silicon thin-film transistors (TFTs).",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Plasma deposition of microcrystalline silicon film with HF release"
      }
    ]
  },
  {
    "id": "semi-021-hfo2-ald-hfcl4-water",
    "name": "Atomic layer deposition (ALD) of hafnium dioxide high-k gate dielectric",
    "reactants": [
      "hfcl4",
      "water"
    ],
    "products": [
      "hfo2",
      "hcl"
    ],
    "enthalpyKjPerMol": -195,
    "description": "Self-limiting binary half-reactions of HfCl4 and H2O vapor pulses depositing sub-nanometer HfO2 (k ~ 25) gate oxide.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Layer-by-layer atomic growth of amorphous high-k HfO2 film"
      }
    ]
  },
  {
    "id": "semi-022-zro2-ald-zrcl4-ozone",
    "name": "Ozone-based atomic layer deposition of zirconium dioxide (ZrO2)",
    "reactants": [
      "zrcl4",
      "o3"
    ],
    "products": [
      "zro2",
      "cl2",
      "o2"
    ],
    "enthalpyKjPerMol": -260,
    "description": "Ozone ALD of tetragonal ZrO2 in deep DRAM storage capacitors providing high dielectric constant without residual hydrogen.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Layer-by-layer growth of high-capacitance ZrO2 dielectric with chlorine release"
      }
    ]
  },
  {
    "id": "semi-023-tio2-ald-ticl4-ozone",
    "name": "Ozone atomic layer deposition of titanium dioxide (TiO2)",
    "reactants": [
      "ticl4",
      "o3"
    ],
    "products": [
      "tio2",
      "cl2",
      "o2"
    ],
    "enthalpyKjPerMol": -220,
    "description": "Ozone ALD of high-permittivity rutile TiO2 thin films for MIM capacitors and work-function tuning.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Atomic layer growth of high-k TiO2 dielectric thin film"
      }
    ]
  },
  {
    "id": "semi-024-ttip-tio2-thermal-cvd",
    "name": "Titanium tetraisopropoxide (TTIP) pyrolytic CVD of titanium dioxide",
    "reactants": [
      "ttip"
    ],
    "products": [
      "tio2",
      "c3h6",
      "water"
    ],
    "enthalpyKjPerMol": 115,
    "description": "Metalorganic chemical vapor deposition of conformal optical and dielectric TiO2 films at 350-450 °C releasing propene.",
    "reactionType": "decomposition",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Endothermic precursor pyrolysis depositing refractive TiO2 coating"
      }
    ]
  },
  {
    "id": "semi-025-tma-pyrolysis-aluminum-metal",
    "name": "Trimethylaluminum (TMA) pyrolytic CVD of metallic aluminum interconnects",
    "reactants": [
      "al-ch3-3"
    ],
    "products": [
      "al",
      "c2h6"
    ],
    "enthalpyKjPerMol": 140,
    "description": "Thermal pyrolysis of TMA at 300-400 °C depositing pure metallic aluminum for interconnect vias and contact plugs.",
    "reactionType": "decomposition",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#EAEDED",
        "colorTo": "#BDC3C7",
        "description": "Thermal decomposition depositing mirror-bright metallic aluminum film"
      }
    ]
  },
  {
    "id": "semi-026-tma-ozone-al2o3-ald",
    "name": "Trimethylaluminum ozone ALD for hydrogen-free alumina dielectric barriers",
    "reactants": [
      "al-ch3-3",
      "o3"
    ],
    "products": [
      "al2o3",
      "co2",
      "water"
    ],
    "enthalpyKjPerMol": -1850,
    "description": "Ozone-based ALD of Al2O3 eliminating OH trapping defects in flash memory charge trap layers and OLED encapsulation.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Vigorous surface oxidation depositing dense Al2O3 dielectric"
      }
    ]
  },
  {
    "id": "semi-027-ta2o5-ald-tacl5-water",
    "name": "Tantalum pentachloride ALD of tantalum pentoxide high-k capacitor dielectric",
    "reactants": [
      "tacl5",
      "water"
    ],
    "products": [
      "ta2o5",
      "hcl"
    ],
    "enthalpyKjPerMol": -310,
    "description": "Surface saturated ALD reaction depositing conformal Ta2O5 dielectric films (k ~ 25) with low leakage current.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Atomic layer growth of amorphous Ta2O5 capacitor dielectric"
      }
    ]
  },
  {
    "id": "semi-028-tin-cvd-ticl4-nitrogen-hydrogen",
    "name": "Titanium nitride (TiN) metal gate CVD from TiCl4, N2, and H2",
    "reactants": [
      "ticl4",
      "n2",
      "h2"
    ],
    "products": [
      "tin",
      "hcl"
    ],
    "enthalpyKjPerMol": -360,
    "description": "High-temperature reduction CVD producing golden-yellow refractory TiN barrier layers against copper and tungsten diffusion.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#EAEDED",
        "colorTo": "#F4D03F",
        "description": "Deposition of brilliant metallic golden-yellow TiN diffusion barrier"
      }
    ]
  },
  {
    "id": "semi-029-tan-ald-tacl5-ammonia",
    "name": "Tantalum nitride (TaN) ALD copper diffusion barrier from TaCl5 and ammonia",
    "reactants": [
      "tacl5",
      "ammonia"
    ],
    "products": [
      "tan",
      "n2",
      "hcl"
    ],
    "enthalpyKjPerMol": -380,
    "description": "Atomic layer deposition of ultra-thin, highly conformal TaN barriers preventing copper electromigration in dual-damascene vias.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#EAEDED",
        "colorTo": "#7F8C8D",
        "description": "Atomic deposition of dense metallic tantalum nitride barrier layer"
      }
    ]
  },
  {
    "id": "semi-030-tungsten-disilane-reduction",
    "name": "Tungsten contact plug CVD via disilane reduction of WF6",
    "reactants": [
      "wf6",
      "si2h6"
    ],
    "products": [
      "w",
      "sif4",
      "h2"
    ],
    "enthalpyKjPerMol": -890,
    "description": "Disilane reduction of WF6 providing high-speed vertical plug fill without encroaching or etching underlying gate oxide.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#EAEDED",
        "colorTo": "#566573",
        "description": "Dense tungsten metal completely fills high-aspect-ratio vertical contact vias"
      }
    ]
  },
  {
    "id": "semi-031-tungsten-zinc-reduction",
    "name": "Tungsten hexafluoride metallothermic reduction by zinc vapor",
    "reactants": [
      "wf6",
      "zn"
    ],
    "products": [
      "w",
      "znf2"
    ],
    "enthalpyKjPerMol": -620,
    "description": "Metallothermic reduction depositing high-purity refractory tungsten powder and films with volatile zinc fluoride byproduct.",
    "reactionType": "single_displacement",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#EAEDED",
        "colorTo": "#566573",
        "description": "Rapid metal vapor reduction depositing dense refractory tungsten metal"
      }
    ]
  },
  {
    "id": "semi-032-wsi2-trisilane-polycide",
    "name": "Tungsten disilicide (WSi2) polycide deposition from WF6 and trisilane",
    "reactants": [
      "wf6",
      "si3h8"
    ],
    "products": [
      "wsi2",
      "sif4",
      "hf"
    ],
    "enthalpyKjPerMol": -1240,
    "description": "Low-temperature CVD synthesis of low-resistivity refractory tungsten disilicide polycide over polysilicon gate lines.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#EAEDED",
        "colorTo": "#34495E",
        "description": "Formation of low-resistivity metallic tungsten silicide film"
      }
    ]
  },
  {
    "id": "semi-033-cobalt-cvd-dicobalt-octacarbonyl",
    "name": "Cobalt metal barrier and capping layer CVD from dicobalt octacarbonyl",
    "reactants": [
      "co2-co-8"
    ],
    "products": [
      "cobalt-metal",
      "co"
    ],
    "enthalpyKjPerMol": 145,
    "description": "Low-temperature thermal CVD of cobalt metal capping layers suppressing copper surface electromigration in sub-10nm interconnects.",
    "reactionType": "decomposition",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#E74C3C",
        "colorTo": "#5D6D7E",
        "description": "Sublimed precursor decomposes depositing silvery metallic cobalt barrier"
      }
    ]
  },
  {
    "id": "semi-034-copper-chloride-zinc-reduction",
    "name": "Cuprous chloride vapor reduction by zinc for copper metallization seed",
    "reactants": [
      "cucl",
      "zn"
    ],
    "products": [
      "cu",
      "zncl2"
    ],
    "enthalpyKjPerMol": -110,
    "description": "Metallothermic reduction of cuprous chloride vapor depositing continuous, highly conductive copper seed layers.",
    "reactionType": "single_displacement",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#EAEDED",
        "colorTo": "#BA4A00",
        "description": "Reduction deposits brilliant reddish-metallic copper film"
      }
    ]
  },
  {
    "id": "semi-035-bn-ald-bcl3-ammonia",
    "name": "Atomic layer deposition of hexagonal boron nitride from BCl3 and ammonia",
    "reactants": [
      "bcl3",
      "ammonia"
    ],
    "products": [
      "bn",
      "hcl"
    ],
    "enthalpyKjPerMol": -290,
    "description": "Cyclic ALD synthesis of atomically thin, wide-bandgap (5.9 eV) hexagonal boron nitride (h-BN) 2D dielectric layers.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Layer-by-layer growth of atomically flat dielectric h-BN film"
      }
    ]
  },
  {
    "id": "semi-036-aln-piezo-ald-tma-ammonia",
    "name": "Aluminum nitride (AlN) piezoelectric thin-film ALD from TMA and ammonia",
    "reactants": [
      "al-ch3-3",
      "ammonia"
    ],
    "products": [
      "aln",
      "ch4"
    ],
    "enthalpyKjPerMol": -320,
    "description": "Atomic layer deposition of highly oriented c-axis AlN thin films for 5G bulk acoustic wave (BAW) RF resonator filters.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Deposition of transparent, highly piezoelectric AlN ceramic layer"
      }
    ]
  },
  {
    "id": "semi-037-gan-hvpe-gacl3-ammonia",
    "name": "Gallium nitride (GaN) HVPE epitaxy from gallium trichloride and ammonia",
    "reactants": [
      "gacl3",
      "ammonia"
    ],
    "products": [
      "gan",
      "hcl"
    ],
    "enthalpyKjPerMol": -310,
    "description": "Hydride vapor phase epitaxy (HVPE) rapid growth of thick, free-standing GaN power substrate wafers.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "High-rate epitaxial deposition of crystalline GaN wide-bandgap semiconductor"
      }
    ]
  },
  {
    "id": "semi-038-inp-hvpe-incl3-phosphine",
    "name": "Indium phosphide (InP) HVPE epitaxy from indium trichloride and phosphine",
    "reactants": [
      "incl3",
      "ph3"
    ],
    "products": [
      "inp",
      "hcl"
    ],
    "enthalpyKjPerMol": -295,
    "description": "Hydride vapor phase epitaxy of indium phosphide wafers for telecom laser diodes and photonic integrated circuits.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Epitaxial deposition of mirror-smooth optoelectronic InP layer"
      }
    ]
  },
  {
    "id": "semi-039-gaas-hvpe-gacl3-arsine",
    "name": "Gallium arsenide (GaAs) HVPE epitaxy from gallium trichloride and arsine",
    "reactants": [
      "gacl3",
      "ash3"
    ],
    "products": [
      "gaas",
      "hcl"
    ],
    "enthalpyKjPerMol": -330,
    "description": "Vapor phase epitaxial synthesis of high-purity GaAs single-crystal wafers for high-efficiency multi-junction solar cells.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Epitaxial growth of compound semiconductor GaAs single-crystal film"
      }
    ]
  },
  {
    "id": "semi-040-molybdenum-cvd-mocl5-hydrogen",
    "name": "Molybdenum interconnect gate CVD via hydrogen reduction of MoCl5",
    "reactants": [
      "mocl5",
      "h2"
    ],
    "products": [
      "mo",
      "hcl"
    ],
    "enthalpyKjPerMol": -115,
    "description": "CVD of low-resistivity, high-work-function refractory molybdenum wordlines for 3D NAND flash memory arrays.",
    "reactionType": "single_displacement",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#EAEDED",
        "colorTo": "#34495E",
        "description": "Deposition of dense, silvery metallic molybdenum conductor"
      }
    ]
  },
  {
    "id": "semi-041-piranha-caros-acid-generation",
    "name": "Piranha solution generation of peroxymonosulfuric acid (Caro's acid)",
    "reactants": [
      "h2so4",
      "h2o2"
    ],
    "products": [
      "h2so5",
      "water"
    ],
    "enthalpyKjPerMol": -82,
    "description": "Mixing 3:1 concentrated sulfuric acid and 30% hydrogen peroxide creating aggressive Caro's acid for wafer organic stripping.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Violent exotherm heating solution above 120 °C"
      }
    ]
  },
  {
    "id": "semi-042-piranha-photoresist-strip",
    "name": "Piranha solution oxidative mineralization of organic photoresist carbon",
    "reactants": [
      "c",
      "h2so5"
    ],
    "products": [
      "co2",
      "h2so4"
    ],
    "enthalpyKjPerMol": -520,
    "description": "Complete wet chemical oxidation of baked cross-linked polymer photoresist residues into gaseous carbon dioxide.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Vigorous effervescence of carbon dioxide as photoresist dissolves"
      }
    ]
  },
  {
    "id": "semi-043-sio2-nh4f-etching",
    "name": "Ammonium fluoride aqueous etching of silicon dioxide",
    "reactants": [
      "sio2",
      "nh4f"
    ],
    "products": [
      "nh42sif6",
      "ammonia",
      "water"
    ],
    "enthalpyKjPerMol": -95,
    "description": "Alkaline-buffered fluoride dissolution of silicon dioxide minimizing metallic ion contamination and gate undercutting.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#FFFFFF",
        "colorTo": "#FFFFFF",
        "description": "Controlled dissolution of silicon dioxide into soluble fluorosilicate"
      }
    ]
  },
  {
    "id": "semi-044-sio2-buffered-fluoride-etch",
    "name": "Buffered oxide etching of thermal silicon dioxide",
    "reactants": [
      "sio2",
      "hf",
      "nh4f"
    ],
    "products": [
      "nh42sif6",
      "water"
    ],
    "enthalpyKjPerMol": -160,
    "description": "Equilibrated buffered oxide etching providing highly stable and reproducible SiO2 pattern etching.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#FFFFFF",
        "colorTo": "#FFFFFF",
        "description": "Smooth, residue-free dissolution of silicon dioxide"
      }
    ]
  },
  {
    "id": "semi-045-boe-buffer-equilibrium",
    "name": "Buffered Oxide Etch (BOE) ammonium bifluoride formation",
    "reactants": [
      "nh4f",
      "hf"
    ],
    "products": [
      "nh4hf2"
    ],
    "enthalpyKjPerMol": -24,
    "description": "Buffering HF with ammonium fluoride maintaining a constant HF2- ion activity and uniform SiO2 etch rate across wafer batches.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Mild buffering neutralization"
      }
    ]
  },
  {
    "id": "semi-046-boe-sio2-dissolution",
    "name": "Buffered Oxide Etch (BOE) dissolution of SiO2 forming ammonium fluorosilicate",
    "reactants": [
      "sio2",
      "nh4hf2"
    ],
    "products": [
      "nh42sif6",
      "nh4f",
      "water"
    ],
    "enthalpyKjPerMol": -128,
    "description": "Isotropic oxide wet etching without attacking photoresist adhesion or inducing mask undercutting.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#FFFFFF",
        "colorTo": "#FFFFFF",
        "description": "Smooth, residue-free dissolution of silicon dioxide"
      }
    ]
  },
  {
    "id": "semi-047-silicon-nitride-hot-phosphoric-strip",
    "name": "Hot phosphoric acid selective wet etching of silicon nitride",
    "reactants": [
      "si3n4",
      "h3po4",
      "water"
    ],
    "products": [
      "sio2",
      "monoammonium_phosphate"
    ],
    "enthalpyKjPerMol": -340,
    "description": "Refluxing 85% H3PO4 at 160 °C selectively stripping Si3N4 masks with high selectivity (>50:1) over underlying SiO2 pad oxide.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Selective chemical stripping converting silicon nitride into soluble phosphate"
      }
    ]
  },
  {
    "id": "semi-048-anisotropic-silicon-etch-csoh",
    "name": "Anisotropic crystallographic etching of Si(100) by cesium hydroxide",
    "reactants": [
      "si",
      "csoh",
      "water"
    ],
    "products": [
      "cs2sio3",
      "h2"
    ],
    "enthalpyKjPerMol": -355,
    "description": "Cesium hydroxide crystallographic wet etching creating precise MEMS microstructures with smooth sidewall morphology.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Steady bubbling of hydrogen gas from etching silicon surfaces"
      }
    ]
  },
  {
    "id": "semi-049-anisotropic-silicon-etch-tmah",
    "name": "Metal-ion-free anisotropic etching of silicon by TMAH",
    "reactants": [
      "si",
      "tmah",
      "water"
    ],
    "products": [
      "tmah_silicate",
      "h2"
    ],
    "enthalpyKjPerMol": -310,
    "description": "CMOS-compatible anisotropic etching of silicon MEMS cantilevers without mobile alkali ion (Na+/K+) contamination.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Vigorous hydrogen gas bubbling forming crystallographic inverted pyramids"
      }
    ]
  },
  {
    "id": "semi-050-hna-isotropic-silicon-oxidation",
    "name": "HNA wet chemical isotropic etching of silicon: nitric acid oxidation",
    "reactants": [
      "si",
      "hno3"
    ],
    "products": [
      "sio2",
      "no2",
      "water"
    ],
    "enthalpyKjPerMol": -380,
    "description": "First step of isotropic silicon etching: nitric acid oxidizes silicon surface to silicon dioxide while releasing NO2.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Evolution of reddish-brown nitrogen dioxide gas fumes"
      }
    ]
  },
  {
    "id": "semi-051-titanium-wet-etch-piranha",
    "name": "Titanium metal barrier wet etching in dilute piranha solution",
    "reactants": [
      "ti",
      "h2so4",
      "h2o2"
    ],
    "products": [
      "tiso4",
      "water"
    ],
    "enthalpyKjPerMol": -410,
    "description": "Rapid oxidation and complexation of residual titanium barrier metal without etching underlying dielectric trenches.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#5D6D7E",
        "colorTo": "#EAEDED",
        "description": "Metallic titanium dissolves into clear solution"
      }
    ]
  },
  {
    "id": "semi-052-aluminum-nitric-etch",
    "name": "Aluminum pattern etching in electronic-grade nitric acid",
    "reactants": [
      "al",
      "hno3"
    ],
    "products": [
      "al-no3-3",
      "no2",
      "water"
    ],
    "enthalpyKjPerMol": -790,
    "description": "Controlled wet chemical etching and stripping of aluminum bonding pads releasing nitrogen dioxide fumes.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Dissolution of aluminum metal with brown NO2 fuming"
      }
    ]
  },
  {
    "id": "semi-053-tungsten-cmp-peroxide-oxidation",
    "name": "Tungsten chemical mechanical planarization (CMP): surface oxidation by peroxide",
    "reactants": [
      "w",
      "h2o2"
    ],
    "products": [
      "wo3",
      "water"
    ],
    "enthalpyKjPerMol": -510,
    "description": "Chemical component of tungsten CMP: acidic slurry containing H2O2 oxidizes metal plug surface to brittle WO3.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#566573",
        "colorTo": "#D4AC0D",
        "description": "Silvery tungsten surface passivates with yellow tungsten trioxide layer"
      }
    ]
  },
  {
    "id": "semi-054-tungsten-oxide-cmp-dissolution",
    "name": "Alkaline slurry chemical dissolution of tungsten trioxide in CMP polishing",
    "reactants": [
      "wo3",
      "koh"
    ],
    "products": [
      "k2wo4",
      "water"
    ],
    "enthalpyKjPerMol": -88,
    "description": "Rapid dissolution of mechanically abraded WO3 surface into soluble potassium tungstate preventing wafer defects.",
    "reactionType": "acid_base",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#D4AC0D",
        "colorTo": "#EAEDED",
        "description": "Yellow tungsten oxide dissolves into clear soluble tungstate"
      }
    ]
  },
  {
    "id": "semi-055-copper-cmp-peroxide-oxidation",
    "name": "Copper interconnect CMP chemical oxidation by hydrogen peroxide",
    "reactants": [
      "cu",
      "h2o2"
    ],
    "products": [
      "cuo",
      "water"
    ],
    "enthalpyKjPerMol": -195,
    "description": "Chemical passivation forming cupric oxide film on high-topography copper lines before mechanical polishing.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#BA4A00",
        "colorTo": "#2C3E50",
        "description": "Reddish copper metal oxidizes to black cupric oxide surface skin"
      }
    ]
  },
  {
    "id": "semi-056-copper-cmp-glycine-dissolution",
    "name": "Copper CMP complexation and dissolution of copper oxide by glycine",
    "reactants": [
      "cuo",
      "glycine"
    ],
    "products": [
      "c4h8cun2o4",
      "water"
    ],
    "enthalpyKjPerMol": -82,
    "description": "Chelating agent in CMP slurry converting abraded copper oxide into soluble deep blue copper bis-glycinate complex.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#2C3E50",
        "colorTo": "#1B4F72",
        "description": "Black copper oxide skin dissolves into deep blue soluble chelate"
      }
    ]
  },
  {
    "id": "semi-057-rca-sc1-methanol-oxidation",
    "name": "RCA Standard Clean 1 (SC-1) peroxide oxidation of solvent residues",
    "reactants": [
      "ch3oh",
      "h2o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpyKjPerMol": -590,
    "description": "Alkaline peroxide clean destroying trace solvent and organic alcohol contaminants from wafer surfaces.",
    "reactionType": "combustion",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Effervescence of carbon dioxide as organic alcohol residue is mineralized"
      }
    ]
  },
  {
    "id": "semi-058-rca-sc2-metallic-iron-stripping",
    "name": "RCA Standard Clean 2 (SC-2) hydrochloric acid stripping of trace iron contamination",
    "reactants": [
      "fe",
      "h2o2",
      "hcl"
    ],
    "products": [
      "fecl3",
      "water"
    ],
    "enthalpyKjPerMol": -590,
    "description": "Acidic peroxide clean (HCl + H2O2 + H2O at 75 °C) solubilizing alkali and transition metal contaminants as stable chlorides.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#5D6D7E",
        "colorTo": "#F4D03F",
        "description": "Dissolution of trace metallic iron into soluble ferric chloride"
      }
    ]
  },
  {
    "id": "semi-059-csoh-silicon-dioxide-dissolution",
    "name": "Cesium hydroxide chemical dissolution of silicon dioxide",
    "reactants": [
      "sio2",
      "csoh"
    ],
    "products": [
      "cs2sio3",
      "water"
    ],
    "enthalpyKjPerMol": -160,
    "description": "Alkaline dissolution of thermal silicon dioxide in cesium hydroxide forming soluble cesium metasilicate.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#FFFFFF",
        "colorTo": "#FFFFFF",
        "description": "Smooth dissolution of sacrificial silicon dioxide dielectric"
      }
    ]
  },
  {
    "id": "semi-060-silicon-peroxide-hf-etching",
    "name": "Metal-assisted chemical etching (MacEtch) of silicon in HF/H2O2",
    "reactants": [
      "si",
      "hf",
      "h2o2"
    ],
    "products": [
      "h2sif6",
      "water"
    ],
    "enthalpyKjPerMol": -840,
    "description": "Catalytic etching beneath noble metal nanoparticles creating ultra-high-aspect-ratio vertical silicon nanowire arrays.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "High-aspect-ratio vertical porous silicon nanostructure formation"
      }
    ]
  },
  {
    "id": "semi-061-ti-xef2-dry-etch",
    "name": "Titanium liner chemical dry etching by xenon difluoride vapor",
    "reactants": [
      "ti",
      "xef2"
    ],
    "products": [
      "tif4",
      "xe"
    ],
    "enthalpyKjPerMol": -920,
    "description": "Spontaneous gas-phase etching of titanium barrier and adhesion layers in XeF2 without plasma damage.",
    "reactionType": "single_displacement",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Spontaneous chemical vapor gasification of titanium into TiF4 and xenon gas"
      }
    ]
  },
  {
    "id": "semi-062-silicon-bcl3-plasma-etching",
    "name": "Silicon reactive ion etching in pure boron trichloride plasma",
    "reactants": [
      "si",
      "bcl3"
    ],
    "products": [
      "sicl4",
      "b"
    ],
    "enthalpyKjPerMol": -380,
    "description": "Anisotropic plasma etching of silicon trenches using boron trichloride producing volatile silicon tetrachloride and boron.",
    "reactionType": "single_displacement",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Directional etching of silicon trenches with volatile SiCl4 exhaust"
      }
    ]
  },
  {
    "id": "semi-063-silicon-bromine-high-selectivity-rie",
    "name": "Silicon deep trench RIE in bromine plasma for extreme gate oxide selectivity",
    "reactants": [
      "si",
      "br2"
    ],
    "products": [
      "sibr4"
    ],
    "enthalpyKjPerMol": -460,
    "description": "HBr/Br2 plasma etching providing silicon-to-oxide selectivity >150:1 due to zero spontaneous chemical etching without ion bombardment.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Vertical anisotropic silicon etching with desorbing SiBr4 gas"
      }
    ]
  },
  {
    "id": "semi-064-sio2-cf4-plasma-etching",
    "name": "Silicon dioxide plasma reactive ion etching in carbon tetrafluoride (CF4)",
    "reactants": [
      "sio2",
      "cf4"
    ],
    "products": [
      "sif4",
      "co2"
    ],
    "enthalpyKjPerMol": -240,
    "description": "RF plasma breakdown of CF4 creating CF3+ ions and F radicals that volatilize SiO2 as SiF4 and CO2.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Plasma gasification of dielectric oxide into volatile SiF4 and CO2"
      }
    ]
  },
  {
    "id": "semi-065-sio2-chf3-selective-rie",
    "name": "Selective oxide reactive ion etching over silicon in trifluoromethane (CHF3)",
    "reactants": [
      "sio2",
      "chf3"
    ],
    "products": [
      "sif4",
      "co",
      "water"
    ],
    "enthalpyKjPerMol": -310,
    "description": "High C:F ratio promotes fluorocarbon polymer passivation on bare silicon while ion bombardment continues etching oxide.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Directional oxide contact hole etching with selective polymer sidewall protection"
      }
    ]
  },
  {
    "id": "semi-066-si3n4-sf6-plasma-etching",
    "name": "Silicon nitride plasma dry etching in sulfur hexafluoride (SF6)",
    "reactants": [
      "si3n4",
      "sf6"
    ],
    "products": [
      "sif4",
      "sf4",
      "n2"
    ],
    "enthalpyKjPerMol": -820,
    "description": "Fast, high-selectivity plasma etching of silicon nitride films in SF6/O2 discharge producing volatile SiF4 and SF4 gases.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Rapid dry stripping of silicon nitride dielectric in glowing RF plasma"
      }
    ]
  },
  {
    "id": "semi-067-tungsten-sf6-plasma-etch",
    "name": "Tungsten metal contact plug dry etching in sulfur hexafluoride plasma",
    "reactants": [
      "w",
      "sf6"
    ],
    "products": [
      "wf6",
      "s"
    ],
    "enthalpyKjPerMol": -490,
    "description": "Reactive ion etchback of overburden tungsten metal following via hole filling, desorbing volatile WF6 gas.",
    "reactionType": "single_displacement",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Etchback clearing tungsten overburden into volatile WF6 gas"
      }
    ]
  },
  {
    "id": "semi-068-tungsten-xef2-chemical-dry-etch",
    "name": "Tungsten chemical dry etching in xenon difluoride vapor",
    "reactants": [
      "w",
      "xef2"
    ],
    "products": [
      "wf6",
      "xe"
    ],
    "enthalpyKjPerMol": -1410,
    "description": "Spontaneous gas-phase isotropic etching of tungsten sacrificial layers during MEMS release processing.",
    "reactionType": "single_displacement",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Rapid spontaneous dry gasification of tungsten metal into WF6 and xenon gas"
      }
    ]
  },
  {
    "id": "semi-069-tin-bcl3-cl2-metal-gate-rie",
    "name": "Titanium nitride (TiN) gate RIE in BCl3 and chlorine plasma",
    "reactants": [
      "tin",
      "bcl3",
      "cl2"
    ],
    "products": [
      "ticl4",
      "bn"
    ],
    "enthalpyKjPerMol": -460,
    "description": "Anisotropic pattern etching of TiN metal gates with in situ boron nitride sidewall passivation.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Anisotropic pattern etching of work-function metal gate lines"
      }
    ]
  },
  {
    "id": "semi-070-ti-bcl3-plasma-etch",
    "name": "Titanium adhesion layer dry etching in boron trichloride plasma",
    "reactants": [
      "ti",
      "bcl3"
    ],
    "products": [
      "ticl4",
      "b"
    ],
    "enthalpyKjPerMol": -240,
    "description": "BCl3 plasma scavenges moisture and attacks titanium liner films forming volatile TiCl4 at low wafer temperatures.",
    "reactionType": "single_displacement",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Plasma removal of titanium liner metallization"
      }
    ]
  },
  {
    "id": "semi-071-al2o3-bcl3-native-oxide-breakthrough",
    "name": "Native alumina breakthrough on aluminum interconnects in BCl3 plasma",
    "reactants": [
      "al2o3",
      "bcl3"
    ],
    "products": [
      "alcl3",
      "b2o3"
    ],
    "enthalpyKjPerMol": -190,
    "description": "Essential initiation step in aluminum RIE: BCl3 reduces tough native Al2O3 skin before chlorine plasma can etch underlying aluminum.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Breakthrough of passivation oxide allowing rapid metal etching"
      }
    ]
  },
  {
    "id": "semi-072-aluminum-hf-vapor-cleaning",
    "name": "Hydrofluoric acid cleaning of aluminum metallization forming passivating AlF3",
    "reactants": [
      "al",
      "hf"
    ],
    "products": [
      "alf3",
      "h2"
    ],
    "enthalpyKjPerMol": -690,
    "description": "Controlled etching and self-limiting passivation of aluminum interconnects in anhydrous HF vapor forming protective AlF3 skin.",
    "reactionType": "single_displacement",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Evolution of hydrogen gas as aluminum surface forms thin protective AlF3 passivation"
      }
    ]
  },
  {
    "id": "semi-073-c4f8-plasma-polymer-deposition",
    "name": "Octafluorocyclobutane plasma dissociation in Bosch DRIE process",
    "reactants": [
      "c4f8"
    ],
    "products": [
      "cf4",
      "c"
    ],
    "enthalpyKjPerMol": 110,
    "description": "Plasma dissociation of C4F8 depositing protective Teflon-like fluorocarbon (CF2)n polymer on silicon trench sidewalls.",
    "reactionType": "decomposition",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Deposition of protective fluoropolymer passivation skin in DRIE cycle"
      }
    ]
  },
  {
    "id": "semi-074-ozone-plasma-photoresist-ashing",
    "name": "Ozone plasma photoresist ashing and stripping",
    "reactants": [
      "c",
      "o3"
    ],
    "products": [
      "co2"
    ],
    "enthalpyKjPerMol": -620,
    "description": "Downstream atomic oxygen and ozone plasma stripping baked ion-implanted photoresist masks without substrate damage.",
    "reactionType": "combustion",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Clean dry mineralization of photoresist carbon into carbon dioxide"
      }
    ]
  },
  {
    "id": "semi-075-gaas-chlorine-plasma-etching",
    "name": "Gallium arsenide compound semiconductor mesa etching in chlorine plasma",
    "reactants": [
      "gaas",
      "cl2"
    ],
    "products": [
      "gacl3",
      "as"
    ],
    "enthalpyKjPerMol": -310,
    "description": "High-density plasma etching of GaAs laser facets and HEMT mesas with volatile GaCl3 desorbing above 100 °C.",
    "reactionType": "single_displacement",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Directional etching of smooth vertical GaAs semiconductor facets"
      }
    ]
  },
  {
    "id": "semi-076-inp-chlorine-plasma-etching",
    "name": "Indium phosphide dry etching in high-temperature chlorine plasma",
    "reactants": [
      "inp",
      "cl2"
    ],
    "products": [
      "incl3",
      "pcl3"
    ],
    "enthalpyKjPerMol": -440,
    "description": "Substrate heated to 200 °C to desorb low-volatility InCl3 etch product for smooth vertical waveguide sidewalls.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Elevated temperature plasma etching of InP optical waveguides"
      }
    ]
  },
  {
    "id": "semi-077-molybdenum-cf4-o2-rie",
    "name": "Molybdenum plasma reactive ion etching in CF4 and oxygen mixture",
    "reactants": [
      "mo",
      "cf4",
      "o2"
    ],
    "products": [
      "mof6",
      "co2"
    ],
    "enthalpyKjPerMol": -680,
    "description": "Dry pattern definition of molybdenum metal wordlines in 3D NAND flash memory chips.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Volatilization of metallic molybdenum into MoF6 and CO2 gases"
      }
    ]
  },
  {
    "id": "semi-078-tantalum-sf6-plasma-etch",
    "name": "Tantalum capacitor plate and barrier dry etching in SF6 plasma",
    "reactants": [
      "ta",
      "sf6"
    ],
    "products": [
      "taf5",
      "s"
    ],
    "enthalpyKjPerMol": -580,
    "description": "Plasma pattern transfer into tantalum metal layers releasing volatile tantalum pentafluoride.",
    "reactionType": "single_displacement",
    "observableEffects": [
      {
        "type": "gas_evolution",
        "description": "Anisotropic etching of tantalum film into desorbing TaF5 vapor"
      }
    ]
  },
  {
    "id": "semi-079-silicon-hbr-oxygen-trench-etching",
    "name": "Polysilicon gate deep trench etching in HBr and oxygen plasma",
    "reactants": [
      "si",
      "hbr",
      "o2"
    ],
    "products": [
      "sibr4",
      "sio2",
      "water"
    ],
    "enthalpyKjPerMol": -710,
    "description": "Simultaneous trench etching and in situ SiOxBr-y sidewall passivation providing perfectly vertical 90° gate profiles.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Vertical gate profile etching with in situ oxide passivation"
      }
    ]
  },
  {
    "id": "semi-080-sicl4-methane-sic-plasma",
    "name": "Silicon tetrachloride and methane plasma synthesis of silicon carbide passivation",
    "reactants": [
      "sicl4",
      "ch4"
    ],
    "products": [
      "sic",
      "hcl"
    ],
    "enthalpyKjPerMol": -140,
    "description": "Plasma-enhanced CVD from STC and methane depositing hermetic SiC barrier coatings on microelectronic assemblies.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Plasma deposition of durable silicon carbide protective thin film"
      }
    ]
  },
  {
    "id": "semi-081-n2o-rapid-thermal-oxidation",
    "name": "Nitrous oxide rapid thermal oxidation (RTO) of silicon for oxynitride dielectrics",
    "reactants": [
      "si",
      "n2o"
    ],
    "products": [
      "sio2",
      "n2"
    ],
    "enthalpyKjPerMol": -680,
    "description": "RTO in N2O incorporating nitrogen at the Si/SiO2 interface to block boron dopant penetration from p+ gates.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "High-temperature growth of nitrogen-passivated gate oxynitride dielectric"
      }
    ]
  },
  {
    "id": "semi-082-hcl-chlorinated-dry-oxidation",
    "name": "Chlorine-enhanced thermal oxidation of silicon with HCl addition",
    "reactants": [
      "si",
      "o2",
      "hcl"
    ],
    "products": [
      "sio2",
      "cl2",
      "water"
    ],
    "enthalpyKjPerMol": -890,
    "description": "Adding 1-3% HCl during dry oxidation passivates mobile sodium ions and reduces interface state density.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Thermal oxidation with in situ mobile ion getter cleaning"
      }
    ]
  },
  {
    "id": "semi-083-ozone-low-temp-silicon-oxidation",
    "name": "Ozone-assisted low-temperature thermal oxidation of silicon",
    "reactants": [
      "si",
      "o3"
    ],
    "products": [
      "sio2",
      "o2"
    ],
    "enthalpyKjPerMol": -740,
    "description": "Ozone oxidation producing ultra-thin, low-defect gate oxides at 400-600 °C for low-thermal-budget 3D monolithic integration.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Low-temperature thermal growth of high-purity silicon dioxide"
      }
    ]
  },
  {
    "id": "semi-084-bbr3-p-type-predeposition",
    "name": "Boron tribromide (BBr3) p-type dopant predeposition oxidation",
    "reactants": [
      "bbr3",
      "o2"
    ],
    "products": [
      "b2o3",
      "br2"
    ],
    "enthalpyKjPerMol": -520,
    "description": "Liquid bubbler source vaporizes BBr3 which oxidizes on silicon wafers forming a borosilicate glass (BSG) dopant source.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#EAEDED",
        "colorTo": "#BA4A00",
        "description": "Deposition of glassy BSG film with release of red-brown bromine vapor"
      }
    ]
  },
  {
    "id": "semi-085-boron-oxide-silicon-drive-in",
    "name": "Boron drive-in diffusion from borosilicate glass into silicon lattice",
    "reactants": [
      "b2o3",
      "si"
    ],
    "products": [
      "b",
      "sio2"
    ],
    "enthalpyKjPerMol": -180,
    "description": "High-temperature (1050 °C) diffusion anneal where B2O3 reacts with silicon, releasing elemental boron into lattice substitution sites.",
    "reactionType": "single_displacement",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Dopant diffusion into silicon forming shallow p-type junctions"
      }
    ]
  },
  {
    "id": "semi-086-pocl3-cao-scrubber-abatement",
    "name": "Phosphorus oxychloride scrubber abatement by calcium oxide",
    "reactants": [
      "pocl3",
      "cao"
    ],
    "products": [
      "ca3po42",
      "cacl2"
    ],
    "enthalpyKjPerMol": -1150,
    "description": "Dry scrubber canister packed with calcium oxide pellets neutralizing toxic POCl3 doping effluent into inert calcium phosphate.",
    "reactionType": "double_displacement",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Exothermic dry chemisorption trapping toxic phosphorus oxychloride effluent"
      }
    ]
  },
  {
    "id": "semi-087-phosphorus-pentoxide-silicon-drive-in",
    "name": "Phosphorus drive-in diffusion from phosphosilicate glass into silicon",
    "reactants": [
      "p4o10",
      "si"
    ],
    "products": [
      "p",
      "sio2"
    ],
    "enthalpyKjPerMol": -440,
    "description": "High-temperature solid-state diffusion reducing P4O10 to dope silicon n-type for emitter and source/drain junctions.",
    "reactionType": "single_displacement",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Solid-state diffusion forming n+ deep well and emitter junctions"
      }
    ]
  },
  {
    "id": "semi-088-arsenic-trioxide-buried-layer-diffusion",
    "name": "Arsenic trioxide predeposition for n+ sub-collector buried layer diffusion",
    "reactants": [
      "as2o3",
      "si"
    ],
    "products": [
      "as",
      "sio2"
    ],
    "enthalpyKjPerMol": -195,
    "description": "Predeposition reduction forming heavily doped n+ buried layers in bipolar and BiCMOS technology with low auto-doping.",
    "reactionType": "single_displacement",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Solid-state diffusion of arsenic dopants into silicon lattice"
      }
    ]
  },
  {
    "id": "semi-089-antimony-trioxide-buried-layer-diffusion",
    "name": "Antimony trioxide thermal reduction for low-diffusion sub-collector junctions",
    "reactants": [
      "sb2o3",
      "si"
    ],
    "products": [
      "sb",
      "sio2"
    ],
    "enthalpyKjPerMol": -160,
    "description": "Antimony doping provides minimal outward diffusion during subsequent epitaxial growth due to very low diffusion coefficient.",
    "reactionType": "single_displacement",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Diffusion creating sharp n+ buried layer boundaries"
      }
    ]
  },
  {
    "id": "semi-090-titanium-salicide-formation",
    "name": "Titanium self-aligned silicidation (salicide) forming low-resistivity TiSi2",
    "reactants": [
      "ti",
      "si"
    ],
    "products": [
      "tisi2"
    ],
    "enthalpyKjPerMol": -134,
    "description": "Thermal reaction of sputtered titanium with source/drain and poly-gate silicon forming C54-TiSi2 contacts (15 micro-ohm cm).",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#5D6D7E",
        "colorTo": "#34495E",
        "description": "Formation of low-resistivity metallic titanium silicide contact"
      }
    ]
  },
  {
    "id": "semi-091-cobalt-monosilicide-phase1",
    "name": "Cobalt silicidation phase 1: formation of cobalt monosilicide (CoSi)",
    "reactants": [
      "cobalt-metal",
      "si"
    ],
    "products": [
      "cosi"
    ],
    "enthalpyKjPerMol": -100,
    "description": "First rapid thermal anneal (RTA 1 at 450-550 °C) forming high-resistivity CoSi phase without bridging spacers.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Solid-state reaction forming intermediate monosilicide phase"
      }
    ]
  },
  {
    "id": "semi-092-cobalt-disilicide-phase2",
    "name": "Cobalt salicide phase 2: transformation to low-resistivity CoSi2",
    "reactants": [
      "cosi",
      "si"
    ],
    "products": [
      "cosi2"
    ],
    "enthalpyKjPerMol": -82,
    "description": "Second rapid thermal anneal (RTA 2 at 750-850 °C) converting CoSi to low-resistivity fluorite CoSi2 (14-18 micro-ohm cm).",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Phase transformation yielding low-resistance cubic cobalt disilicide"
      }
    ]
  },
  {
    "id": "semi-093-nickel-salicide-nisi-formation",
    "name": "Nickel salicide (NiSi) formation for advanced node CMOS source/drain contacts",
    "reactants": [
      "ni",
      "si"
    ],
    "products": [
      "nisi"
    ],
    "enthalpyKjPerMol": -86,
    "description": "Single low-temperature anneal (400 °C) forming NiSi: minimal silicon consumption, no narrow-line degradation down to sub-10nm.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Low-temperature silicidation forming ultra-shallow contact silicide"
      }
    ]
  },
  {
    "id": "semi-094-platinum-silicidation-phase1",
    "name": "Platinum silicide phase 1: formation of diplatinum silicide (Pt2Si)",
    "reactants": [
      "pt",
      "si"
    ],
    "products": [
      "pt2si"
    ],
    "enthalpyKjPerMol": -105,
    "description": "Low-temperature (200-300 °C) annealing of platinum thin film on silicon initiating silicide formation.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Solid-state diffusion forming initial Pt2Si phase"
      }
    ]
  },
  {
    "id": "semi-095-platinum-silicide-schottky-barrier",
    "name": "Platinum monosilicide (PtSi) formation for infrared detectors and Schottky diodes",
    "reactants": [
      "pt2si",
      "si"
    ],
    "products": [
      "ptsi"
    ],
    "enthalpyKjPerMol": -67,
    "description": "High-temperature anneal (400-500 °C) yielding stable PtSi Schottky contacts with high barrier height (0.85 eV) on n-Si.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Formation of high-barrier Schottky silicide contact"
      }
    ]
  },
  {
    "id": "semi-096-gold-aluminum-intermetallic-au2al",
    "name": "Gold-aluminum wire bond intermetallic diffusion: Au2Al phase formation",
    "reactants": [
      "au",
      "al"
    ],
    "products": [
      "au2al"
    ],
    "enthalpyKjPerMol": -82,
    "description": "Interdiffusion at thermosonic gold ball wire bond interfaces with aluminum bond pads at 200 °C.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Solid-state intermetallic growth at wire bond interface"
      }
    ]
  },
  {
    "id": "semi-097-purple-plague-aual2-formation",
    "name": "Purple plague (AuAl2) catastrophic brittle intermetallic failure",
    "reactants": [
      "au2al",
      "al"
    ],
    "products": [
      "aual2"
    ],
    "enthalpyKjPerMol": -78,
    "description": "Formation of highly brittle, vibrant purple AuAl2 accompanied by Kirkendall microvoiding causing wire bond detachment.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#D4AC0D",
        "colorTo": "#7D3C98",
        "description": "Formation of notorious vibrant purple, brittle intermetallic plague"
      }
    ]
  },
  {
    "id": "semi-098-copper-wire-bonding-ammonia-reduction",
    "name": "Ammonia reducing atmosphere reduction of copper oxide for wire bonding",
    "reactants": [
      "cuo",
      "ammonia"
    ],
    "products": [
      "cu",
      "n2",
      "water"
    ],
    "enthalpyKjPerMol": -280,
    "description": "Reduction of surface copper oxide in ammonia forming gas ensuring clean, defect-free thermosonic copper ball bonds.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#2C3E50",
        "colorTo": "#BA4A00",
        "description": "Reduction of oxidized surface skin restoring bright metallic copper"
      }
    ]
  },
  {
    "id": "semi-099-solder-reflow-ammonia-reduction",
    "name": "Ammonia gas reduction of tin oxide in fluxless flip-chip solder reflow",
    "reactants": [
      "sno2",
      "ammonia"
    ],
    "products": [
      "sn",
      "n2",
      "water"
    ],
    "enthalpyKjPerMol": -260,
    "description": "Reduction of surface tin oxide in reducing atmosphere enabling void-free wetting of SAC solder micro-bumps in 2.5D/3D packaging.",
    "reactionType": "redox_other",
    "observableEffects": [
      {
        "type": "color_change",
        "colorFrom": "#EAEDED",
        "colorTo": "#BDC3C7",
        "description": "Oxide clears allowing molten solder ball to reflow into perfect sphere"
      }
    ]
  },
  {
    "id": "semi-100-iron-silicide-wafer-gettering",
    "name": "Backside polysilicon gettering of fast-diffusing iron impurities into FeSi2",
    "reactants": [
      "fe",
      "si"
    ],
    "products": [
      "fesi2"
    ],
    "enthalpyKjPerMol": -81,
    "description": "Trapping of lethal transition metal impurities into backside polysilicon grain boundary sinks during thermal processing.",
    "reactionType": "synthesis",
    "observableEffects": [
      {
        "type": "temperature_increase",
        "description": "Precipitation of iron impurities as inactive iron disilicide gettering sites"
      }
    ]
  }
];
