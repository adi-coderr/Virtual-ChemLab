// Domain 38: Total Synthesis, Named Organic Transformations & Cascade Reactions (100 reactions)
import type { ReactionDefinition } from "./types.js";

export const DOMAIN_38_REACTIONS: ReactionDefinition[] = [
  {
    "id": "total-swern-ethanol",
    "name": "Swern oxidation of ethanol to acetaldehyde",
    "reactants": [
      "c2h5oh",
      "dmso"
    ],
    "products": [
      "ch3cho",
      "dimethyl_sulfide",
      "water"
    ],
    "enthalpy": -145,
    "desc": "Chemoselective oxidation of primary alcohol via sulfonium intermediate with DMSO activator.",
    "type": "redox_other",
    "effects": [
      {
        "type": "color_change",
        "colorFrom": "#FFFFFF",
        "colorTo": "#FAFAFA",
        "description": "Characteristic dimethyl sulfide odor with clear distillate"
      }
    ]
  },
  {
    "id": "total-swern-isopropanol",
    "name": "Swern oxidation of isopropanol to acetone",
    "reactants": [
      "c3h8o_iso",
      "dmso"
    ],
    "products": [
      "ch3coch3",
      "dimethyl_sulfide",
      "water"
    ],
    "enthalpy": -152,
    "desc": "Swern oxidation of secondary alcohol to acetone without over-oxidation.",
    "type": "redox_other",
    "effects": [
      {
        "type": "temperature_increase",
        "description": "Mild exothermic oxidation producing volatile dimethyl sulfide"
      }
    ]
  },
  {
    "id": "total-swern-1-propanol",
    "name": "Swern oxidation of 1-propanol to propionaldehyde",
    "reactants": [
      "c3h8o",
      "dmso"
    ],
    "products": [
      "c3h6o_ald",
      "dimethyl_sulfide",
      "water"
    ],
    "enthalpy": -143,
    "desc": "Mild low-temperature oxidation of aliphatic primary alcohol.",
    "type": "redox_other",
    "effects": [
      {
        "type": "color_change",
        "colorFrom": "#FFFFFF",
        "colorTo": "#F8F9F9",
        "description": "Formation of propionaldehyde"
      }
    ]
  },
  {
    "id": "total-swern-1-butanol",
    "name": "Swern oxidation of 1-butanol to butyraldehyde",
    "reactants": [
      "c4h10o",
      "dmso"
    ],
    "products": [
      "c4h8o_ald",
      "dimethyl_sulfide",
      "water"
    ],
    "enthalpy": -140,
    "desc": "Mild conversion of 1-butanol to butyraldehyde under anhydrous conditions.",
    "type": "redox_other",
    "effects": [
      {
        "type": "temperature_increase",
        "description": "Mild exotherm"
      }
    ]
  },
  {
    "id": "total-swern-benzyl-alcohol",
    "name": "Swern oxidation of benzyl alcohol to benzaldehyde",
    "reactants": [
      "c7h8o",
      "dmso"
    ],
    "products": [
      "c7h6o",
      "dimethyl_sulfide",
      "water"
    ],
    "enthalpy": -160,
    "desc": "Quantitative conversion of benzylic alcohol to aromatic benzaldehyde.",
    "type": "redox_other",
    "effects": [
      {
        "type": "color_change",
        "colorFrom": "#FFFFFF",
        "colorTo": "#FEFDE8",
        "description": "Almond scent of benzaldehyde develops"
      }
    ]
  },
  {
    "id": "total-swern-cyclohexanol",
    "name": "Swern oxidation of cyclohexanol to cyclohexanone",
    "reactants": [
      "cyclohexanol",
      "dmso"
    ],
    "products": [
      "cyclohexanone",
      "dimethyl_sulfide",
      "water"
    ],
    "enthalpy": -155,
    "desc": "Synthesis of cyclic ketone from secondary alcohol.",
    "type": "redox_other",
    "effects": [
      {
        "type": "temperature_increase",
        "description": "Controlled exotherm with liberation of dimethyl sulfide"
      }
    ]
  },
  {
    "id": "total-swern-2-butanol",
    "name": "Swern oxidation of 2-butanol to 2-butanone",
    "reactants": [
      "c4h10o_sec",
      "dmso"
    ],
    "products": [
      "c4h8o_mek",
      "dimethyl_sulfide",
      "water"
    ],
    "enthalpy": -150,
    "desc": "Smooth oxidation of 2-butanol to methyl ethyl ketone.",
    "type": "redox_other",
    "effects": [
      {
        "type": "color_change",
        "colorFrom": "#FFFFFF",
        "colorTo": "#FAFAFA",
        "description": "Clear liquid product formation"
      }
    ]
  },
  {
    "id": "total-swern-cyclopentanol",
    "name": "Swern oxidation of cyclopentanol to cyclopentanone",
    "reactants": [
      "cyclopentanol",
      "dmso"
    ],
    "products": [
      "c5h8o",
      "dimethyl_sulfide",
      "water"
    ],
    "enthalpy": -154,
    "desc": "Clean conversion of five-membered secondary alcohol to cyclopentanone.",
    "type": "redox_other",
    "effects": [
      {
        "type": "temperature_increase",
        "description": "Mild exotherm"
      }
    ]
  },
  {
    "id": "total-swern-allyl-alcohol",
    "name": "Swern oxidation of allyl alcohol to acrolein",
    "reactants": [
      "allyl_alcohol",
      "dmso"
    ],
    "products": [
      "acrolein",
      "dimethyl_sulfide",
      "water"
    ],
    "enthalpy": -138,
    "desc": "Chemospecific oxidation preserving the terminal carbon-carbon double bond.",
    "type": "redox_other",
    "effects": [
      {
        "type": "color_change",
        "colorFrom": "#FFFFFF",
        "colorTo": "#F9E79F",
        "description": "Pungent acrolein vapor generated"
      }
    ]
  },
  {
    "id": "total-swern-menthol",
    "name": "Swern oxidation of menthol to menthone",
    "reactants": [
      "menthol",
      "dmso"
    ],
    "products": [
      "menthone",
      "dimethyl_sulfide",
      "water"
    ],
    "enthalpy": -148,
    "desc": "Stereocontrolled oxidation of terpene secondary alcohol to menthone.",
    "type": "redox_other",
    "effects": [
      {
        "type": "temperature_increase",
        "description": "Exothermic conversion to menthone"
      }
    ]
  },
  {
    "id": "total-dmp-ethanol",
    "name": "Dess-Martin periodinane oxidation of ethanol",
    "reactants": [
      "c2h5oh",
      "dmp_periodinane"
    ],
    "products": [
      "ch3cho",
      "iodinane_byproduct",
      "ch3cooh"
    ],
    "enthalpy": -118,
    "desc": "Rapid room-temperature oxidation of ethanol to acetaldehyde using hypervalent iodine(V).",
    "type": "redox_other",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Precipitation of reduced periodinane by-product"
      }
    ]
  },
  {
    "id": "total-dmp-isopropanol",
    "name": "Dess-Martin periodinane oxidation of isopropanol",
    "reactants": [
      "c3h8o_iso",
      "dmp_periodinane"
    ],
    "products": [
      "ch3coch3",
      "iodinane_byproduct",
      "ch3cooh"
    ],
    "enthalpy": -125,
    "desc": "Neutral, non-acidic conversion of isopropanol to acetone.",
    "type": "redox_other",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Precipitation of crystalline iodinane"
      }
    ]
  },
  {
    "id": "total-dmp-benzyl-alcohol",
    "name": "Dess-Martin periodinane oxidation of benzyl alcohol",
    "reactants": [
      "c7h8o",
      "dmp_periodinane"
    ],
    "products": [
      "c7h6o",
      "iodinane_byproduct",
      "ch3cooh"
    ],
    "enthalpy": -135,
    "desc": "High-yielding benzylic oxidation to benzaldehyde with zero over-oxidation.",
    "type": "redox_other",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Deposition of white iodinane by-product"
      }
    ]
  },
  {
    "id": "total-dmp-1-propanol",
    "name": "Dess-Martin periodinane oxidation of 1-propanol",
    "reactants": [
      "c3h8o",
      "dmp_periodinane"
    ],
    "products": [
      "c3h6o_ald",
      "iodinane_byproduct",
      "ch3cooh"
    ],
    "enthalpy": -120,
    "desc": "Clean transformation of 1-propanol to propanal.",
    "type": "redox_other",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Precipitation of iodinane by-product"
      }
    ]
  },
  {
    "id": "total-dmp-1-butanol",
    "name": "Dess-Martin periodinane oxidation of 1-butanol",
    "reactants": [
      "c4h10o",
      "dmp_periodinane"
    ],
    "products": [
      "c4h8o_ald",
      "iodinane_byproduct",
      "ch3cooh"
    ],
    "enthalpy": -122,
    "desc": "Oxidation of 1-butanol to butanal.",
    "type": "redox_other",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "White solid precipitation"
      }
    ]
  },
  {
    "id": "total-dmp-cyclohexanol",
    "name": "Dess-Martin periodinane oxidation of cyclohexanol",
    "reactants": [
      "cyclohexanol",
      "dmp_periodinane"
    ],
    "products": [
      "cyclohexanone",
      "iodinane_byproduct",
      "ch3cooh"
    ],
    "enthalpy": -130,
    "desc": "Mild oxidation of cyclohexanol to cyclohexanone in dichloromethane.",
    "type": "redox_other",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Precipitation of reduced periodinane"
      }
    ]
  },
  {
    "id": "total-dmp-cyclopentanol",
    "name": "Dess-Martin periodinane oxidation of cyclopentanol",
    "reactants": [
      "cyclopentanol",
      "dmp_periodinane"
    ],
    "products": [
      "c5h8o",
      "iodinane_byproduct",
      "ch3cooh"
    ],
    "enthalpy": -128,
    "desc": "Formation of cyclopentanone under neutral conditions.",
    "type": "redox_other",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Deposition of iodinane acetate"
      }
    ]
  },
  {
    "id": "total-dmp-2-butanol",
    "name": "Dess-Martin periodinane oxidation of 2-butanol",
    "reactants": [
      "c4h10o_sec",
      "dmp_periodinane"
    ],
    "products": [
      "c4h8o_mek",
      "iodinane_byproduct",
      "ch3cooh"
    ],
    "enthalpy": -126,
    "desc": "Oxidation of sec-butanol to methyl ethyl ketone.",
    "type": "redox_other",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Crystalline precipitate separates"
      }
    ]
  },
  {
    "id": "total-dmp-allyl-alcohol",
    "name": "Dess-Martin periodinane oxidation of allyl alcohol",
    "reactants": [
      "allyl_alcohol",
      "dmp_periodinane"
    ],
    "products": [
      "acrolein",
      "iodinane_byproduct",
      "ch3cooh"
    ],
    "enthalpy": -115,
    "desc": "Chemoselective oxidation of allylic alcohol without double-bond epoxidation.",
    "type": "redox_other",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "White iodinane precipitate"
      }
    ]
  },
  {
    "id": "total-dmp-menthol",
    "name": "Dess-Martin periodinane oxidation of menthol",
    "reactants": [
      "menthol",
      "dmp_periodinane"
    ],
    "products": [
      "menthone",
      "iodinane_byproduct",
      "ch3cooh"
    ],
    "enthalpy": -124,
    "desc": "Mild oxidation of menthol without epimerization of the alpha-chiral center.",
    "type": "redox_other",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Precipitation of iodinane"
      }
    ]
  },
  {
    "id": "total-mcpba-stilbene",
    "name": "Prilezhaev epoxidation of trans-stilbene with mCPBA",
    "reactants": [
      "stilbene_trans",
      "mcpba"
    ],
    "products": [
      "trans_stilbene_oxide",
      "m_chlorobenzoic_acid"
    ],
    "enthalpy": -155,
    "desc": "Stereospecific syn-epoxidation of trans-stilbene yielding trans-stilbene oxide.",
    "type": "double_displacement",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Precipitation of insoluble 3-chlorobenzoic acid"
      }
    ]
  },
  {
    "id": "total-mcpba-cyclohexene",
    "name": "Prilezhaev epoxidation of cyclohexene with mCPBA",
    "reactants": [
      "c6h10",
      "mcpba"
    ],
    "products": [
      "cyclohexene_oxide",
      "m_chlorobenzoic_acid"
    ],
    "enthalpy": -165,
    "desc": "Epoxidation of cyclic alkene in dichloromethane.",
    "type": "double_displacement",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "White precipitate of 3-chlorobenzoic acid"
      }
    ]
  },
  {
    "id": "total-mcpba-cyclopentene",
    "name": "Prilezhaev epoxidation of cyclopentene with mCPBA",
    "reactants": [
      "c5h8",
      "mcpba"
    ],
    "products": [
      "cyclopentene_oxide",
      "m_chlorobenzoic_acid"
    ],
    "enthalpy": -168,
    "desc": "Facile epoxidation of strained cyclopentene ring.",
    "type": "double_displacement",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Precipitation of m-chlorobenzoic acid"
      }
    ]
  },
  {
    "id": "total-mcpba-styrene",
    "name": "Prilezhaev epoxidation of styrene with mCPBA",
    "reactants": [
      "styrene",
      "mcpba"
    ],
    "products": [
      "styrene_oxide",
      "m_chlorobenzoic_acid"
    ],
    "enthalpy": -160,
    "desc": "Electrophilic epoxidation of styrene to styrene oxide.",
    "type": "double_displacement",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Crystalline acid precipitate"
      }
    ]
  },
  {
    "id": "total-mcpba-1-octene",
    "name": "Prilezhaev epoxidation of 1-octene with mCPBA",
    "reactants": [
      "c8h16",
      "mcpba"
    ],
    "products": [
      "1_octene_oxide",
      "m_chlorobenzoic_acid"
    ],
    "enthalpy": -158,
    "desc": "Epoxidation of terminal aliphatic alkene.",
    "type": "double_displacement",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Precipitation of m-chlorobenzoic acid"
      }
    ]
  },
  {
    "id": "total-mcpba-1-hexene",
    "name": "Prilezhaev epoxidation of 1-hexene with mCPBA",
    "reactants": [
      "c6h12_1hexene",
      "mcpba"
    ],
    "products": [
      "1_hexene_oxide",
      "m_chlorobenzoic_acid"
    ],
    "enthalpy": -162,
    "desc": "Synthesis of 1,2-epoxyhexane.",
    "type": "double_displacement",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "White solid precipitation"
      }
    ]
  },
  {
    "id": "total-mcpba-norbornene",
    "name": "Prilezhaev epoxidation of norbornene with mCPBA",
    "reactants": [
      "norbornene",
      "mcpba"
    ],
    "products": [
      "norbornene_oxide",
      "m_chlorobenzoic_acid"
    ],
    "enthalpy": -185,
    "desc": "Exo-selective epoxidation of bicyclic alkene driven by ring strain release.",
    "type": "double_displacement",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Rapid precipitation of 3-chlorobenzoic acid"
      }
    ]
  },
  {
    "id": "total-mcpba-limonene",
    "name": "Prilezhaev regioselective monoepoxidation of limonene",
    "reactants": [
      "c10h16_limonene",
      "mcpba"
    ],
    "products": [
      "limonene_oxide",
      "m_chlorobenzoic_acid"
    ],
    "enthalpy": -160,
    "desc": "Regioselective epoxidation at the more electron-rich endocyclic trisubstituted double bond.",
    "type": "double_displacement",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Precipitation of m-chlorobenzoic acid"
      }
    ]
  },
  {
    "id": "total-mcpba-allyl-chloride",
    "name": "Prilezhaev epoxidation of allyl chloride to epichlorohydrin",
    "reactants": [
      "c3h5cl",
      "mcpba"
    ],
    "products": [
      "c3h5clo_epichlorohydrin",
      "m_chlorobenzoic_acid"
    ],
    "enthalpy": -148,
    "desc": "Peracid oxidation of allyl chloride producing epichlorohydrin monomer.",
    "type": "double_displacement",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Precipitation of by-product acid"
      }
    ]
  },
  {
    "id": "total-mcpba-allyl-alcohol",
    "name": "Prilezhaev epoxidation of allyl alcohol to glycidol",
    "reactants": [
      "allyl_alcohol",
      "mcpba"
    ],
    "products": [
      "glycidol",
      "m_chlorobenzoic_acid"
    ],
    "enthalpy": -152,
    "desc": "Epoxidation of allylic alcohol yielding glycidol.",
    "type": "double_displacement",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Precipitation of 3-chlorobenzoic acid"
      }
    ]
  },
  {
    "id": "total-bv-cyclohexanone",
    "name": "Baeyer-Villiger oxidation of cyclohexanone to epsilon-caprolactone",
    "reactants": [
      "cyclohexanone",
      "mcpba"
    ],
    "products": [
      "caprolactone",
      "m_chlorobenzoic_acid"
    ],
    "enthalpy": -180,
    "desc": "Peracid insertion into cyclic ketone ring yielding epsilon-caprolactone monomer.",
    "type": "double_displacement",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Precipitation of m-chlorobenzoic acid"
      }
    ]
  },
  {
    "id": "total-bv-acetone",
    "name": "Baeyer-Villiger oxidation of acetone to methyl acetate",
    "reactants": [
      "ch3coch3",
      "mcpba"
    ],
    "products": [
      "c3h6o2_est",
      "m_chlorobenzoic_acid"
    ],
    "enthalpy": -160,
    "desc": "Oxidation of acetone forming methyl acetate.",
    "type": "double_displacement",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Precipitation of 3-chlorobenzoic acid"
      }
    ]
  },
  {
    "id": "total-bv-butanone",
    "name": "Baeyer-Villiger oxidation of 2-butanone to ethyl acetate",
    "reactants": [
      "c4h8o_mek",
      "mcpba"
    ],
    "products": [
      "ch3cooc2h5",
      "m_chlorobenzoic_acid"
    ],
    "enthalpy": -168,
    "desc": "Regioselective oxygen insertion towards the more substituted ethyl group yielding ethyl acetate.",
    "type": "double_displacement",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Precipitation of m-chlorobenzoic acid"
      }
    ]
  },
  {
    "id": "total-bv-acetophenone",
    "name": "Baeyer-Villiger oxidation of acetophenone to phenyl acetate",
    "reactants": [
      "acetophenone",
      "mcpba"
    ],
    "products": [
      "phenyl_acetate",
      "m_chlorobenzoic_acid"
    ],
    "enthalpy": -190,
    "desc": "Selective phenyl migratory aptitude in Baeyer-Villiger oxidation yielding phenyl acetate.",
    "type": "double_displacement",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Precipitation of white 3-chlorobenzoic acid"
      }
    ]
  },
  {
    "id": "total-bv-benzophenone",
    "name": "Baeyer-Villiger oxidation of benzophenone to phenyl benzoate",
    "reactants": [
      "benzophenone",
      "mcpba"
    ],
    "products": [
      "phenyl_benzoate",
      "m_chlorobenzoic_acid"
    ],
    "enthalpy": -195,
    "desc": "Oxidation of diaryl ketone to phenyl benzoate ester.",
    "type": "double_displacement",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Precipitation of m-chlorobenzoic acid"
      }
    ]
  },
  {
    "id": "total-bv-adamantanone",
    "name": "Baeyer-Villiger oxidation of 2-adamantanone to 4-oxahomoadamantan-5-one",
    "reactants": [
      "adamantanone",
      "mcpba"
    ],
    "products": [
      "oxahomoadamantanone",
      "m_chlorobenzoic_acid"
    ],
    "enthalpy": -185,
    "desc": "Bridged lactone synthesis by peracid oxidation of adamantanone.",
    "type": "double_displacement",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Precipitation of acid by-product"
      }
    ]
  },
  {
    "id": "total-bv-cyclobutanone",
    "name": "Baeyer-Villiger oxidation of cyclobutanone to gamma-butyrolactone",
    "reactants": [
      "cyclobutanone",
      "mcpba"
    ],
    "products": [
      "c4h6o2_gbl",
      "m_chlorobenzoic_acid"
    ],
    "enthalpy": -210,
    "desc": "Strain-accelerated ring expansion of four-membered ketone to gamma-butyrolactone.",
    "type": "double_displacement",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Precipitation of 3-chlorobenzoic acid"
      }
    ]
  },
  {
    "id": "total-bv-pinacolone",
    "name": "Baeyer-Villiger oxidation of pinacolone to tert-butyl acetate",
    "reactants": [
      "pinacolone",
      "mcpba"
    ],
    "products": [
      "tert_butyl_acetate",
      "m_chlorobenzoic_acid"
    ],
    "enthalpy": -172,
    "desc": "Exclusive tertiary alkyl migration in Baeyer-Villiger rearrangement.",
    "type": "double_displacement",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Precipitation of m-chlorobenzoic acid"
      }
    ]
  },
  {
    "id": "total-bv-camphor",
    "name": "Baeyer-Villiger oxidation of camphor to campholide",
    "reactants": [
      "camphor",
      "mcpba"
    ],
    "products": [
      "campholide",
      "m_chlorobenzoic_acid"
    ],
    "enthalpy": -182,
    "desc": "Regiospecific lactonization of bicyclic monoterpene ketone.",
    "type": "double_displacement",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Crystalline acid deposition"
      }
    ]
  },
  {
    "id": "total-bv-cyclopentanone",
    "name": "Baeyer-Villiger oxidation of cyclopentanone to delta-valerolactone",
    "reactants": [
      "c5h8o",
      "mcpba"
    ],
    "products": [
      "c5h8o2_valerolactone",
      "m_chlorobenzoic_acid"
    ],
    "enthalpy": -175,
    "desc": "Ring expansion oxidation of cyclopentanone to 5-valerolactone.",
    "type": "double_displacement",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Precipitation of solid acid"
      }
    ]
  },
  {
    "id": "total-wz-toluene",
    "name": "Wohl-Ziegler benzylic bromination of toluene with NBS",
    "reactants": [
      "c7h8",
      "n_bromosuccinimide"
    ],
    "products": [
      "benzyl_bromide",
      "succinimide"
    ],
    "enthalpy": -65,
    "desc": "Free-radical benzylic bromination of toluene providing sustained low Br2 concentration.",
    "type": "double_displacement",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Precipitation of floating succinimide crystals"
      }
    ]
  },
  {
    "id": "total-wz-cyclohexene",
    "name": "Wohl-Ziegler allylic bromination of cyclohexene with NBS",
    "reactants": [
      "c6h10",
      "n_bromosuccinimide"
    ],
    "products": [
      "3_bromocyclohexene",
      "succinimide"
    ],
    "enthalpy": -70,
    "desc": "Allylic radical bromination forming 3-bromocyclohexene.",
    "type": "double_displacement",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Floating succinimide by-product formation"
      }
    ]
  },
  {
    "id": "total-wz-cyclopentene",
    "name": "Wohl-Ziegler allylic bromination of cyclopentene with NBS",
    "reactants": [
      "c5h8",
      "n_bromosuccinimide"
    ],
    "products": [
      "3_bromocyclopentene",
      "succinimide"
    ],
    "enthalpy": -68,
    "desc": "Allylic halogenation of cyclopentene.",
    "type": "double_displacement",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Insoluble succinimide rises to surface"
      }
    ]
  },
  {
    "id": "total-wz-o-xylene",
    "name": "Wohl-Ziegler benzylic bromination of o-xylene",
    "reactants": [
      "c8h10_xyl",
      "n_bromosuccinimide"
    ],
    "products": [
      "o_methylbenzyl_bromide",
      "succinimide"
    ],
    "enthalpy": -66,
    "desc": "Regioselective monobromination of o-xylene.",
    "type": "double_displacement",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Succinimide precipitation"
      }
    ]
  },
  {
    "id": "total-wz-p-xylene",
    "name": "Wohl-Ziegler benzylic bromination of p-xylene",
    "reactants": [
      "p_xylene",
      "n_bromosuccinimide"
    ],
    "products": [
      "p_methylbenzyl_bromide",
      "succinimide"
    ],
    "enthalpy": -67,
    "desc": "Monobromination at the para-methyl group.",
    "type": "double_displacement",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Succinimide separation"
      }
    ]
  },
  {
    "id": "total-wz-m-xylene",
    "name": "Wohl-Ziegler benzylic bromination of m-xylene",
    "reactants": [
      "m_xylene",
      "n_bromosuccinimide"
    ],
    "products": [
      "m_methylbenzyl_bromide",
      "succinimide"
    ],
    "enthalpy": -66,
    "desc": "Benzylic monohalogenation of m-xylene.",
    "type": "double_displacement",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Precipitation of succinimide"
      }
    ]
  },
  {
    "id": "total-wz-ethylbenzene",
    "name": "Wohl-Ziegler benzylic bromination of ethylbenzene",
    "reactants": [
      "c8h10",
      "n_bromosuccinimide"
    ],
    "products": [
      "1_bromoethylbenzene",
      "succinimide"
    ],
    "enthalpy": -72,
    "desc": "Regiospecific bromination at the secondary benzylic position.",
    "type": "double_displacement",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "White succinimide separates"
      }
    ]
  },
  {
    "id": "total-wz-cumene",
    "name": "Wohl-Ziegler benzylic bromination of cumene",
    "reactants": [
      "cumene",
      "n_bromosuccinimide"
    ],
    "products": [
      "2_bromo_2_phenylpropane",
      "succinimide"
    ],
    "enthalpy": -78,
    "desc": "Rapid radical bromination at the tertiary benzylic position.",
    "type": "double_displacement",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Precipitation of succinimide"
      }
    ]
  },
  {
    "id": "total-wz-1-methylnaphthalene",
    "name": "Wohl-Ziegler bromination of 1-methylnaphthalene",
    "reactants": [
      "1_methylnaphthalene",
      "n_bromosuccinimide"
    ],
    "products": [
      "1_bromomethylnaphthalene",
      "succinimide"
    ],
    "enthalpy": -70,
    "desc": "Benzylic bromination yielding 1-(bromomethyl)naphthalene.",
    "type": "double_displacement",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Succinimide floating on solvent"
      }
    ]
  },
  {
    "id": "total-wz-2-methylnaphthalene",
    "name": "Wohl-Ziegler bromination of 2-methylnaphthalene",
    "reactants": [
      "2_methylnaphthalene",
      "n_bromosuccinimide"
    ],
    "products": [
      "2_bromomethylnaphthalene",
      "succinimide"
    ],
    "enthalpy": -69,
    "desc": "Synthesis of 2-(bromomethyl)naphthalene.",
    "type": "double_displacement",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Precipitation of succinimide"
      }
    ]
  },
  {
    "id": "total-claisen-schmidt-chalcone",
    "name": "Claisen-Schmidt condensation forming chalcone",
    "reactants": [
      "c7h6o",
      "acetophenone"
    ],
    "products": [
      "chalcone",
      "water"
    ],
    "enthalpy": -28,
    "desc": "Base-catalyzed crossed aldol condensation forming conjugated trans-chalcone.",
    "type": "synthesis",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFF9A6",
        "description": "Yellow crystalline chalcone precipitates"
      }
    ]
  },
  {
    "id": "total-aldol-cyclohexanone-dimer",
    "name": "Self-condensation of cyclohexanone to 2-cyclohexenylcyclohexanone",
    "reactants": [
      "cyclohexanone"
    ],
    "products": [
      "cyclohexenylcyclohexanone",
      "water"
    ],
    "enthalpy": -24,
    "desc": "Base-catalyzed aldol dehydration between two cyclohexanone molecules.",
    "type": "decomposition",
    "effects": [
      {
        "type": "color_change",
        "colorFrom": "#FFFFFF",
        "colorTo": "#FAD7A0",
        "description": "Liquid darkens to amber"
      }
    ]
  },
  {
    "id": "total-knoevenagel-benzaldehyde-malonate",
    "name": "Knoevenagel condensation of benzaldehyde with diethyl malonate",
    "reactants": [
      "c7h6o",
      "diethyl_malonate"
    ],
    "products": [
      "diethyl_benzylidenemalonate",
      "water"
    ],
    "enthalpy": -35,
    "desc": "Piperidine-catalyzed condensation yielding diethyl benzylidenemalonate.",
    "type": "synthesis",
    "effects": [
      {
        "type": "color_change",
        "colorFrom": "#FFFFFF",
        "colorTo": "#FEF9E7",
        "description": "Slight yellowing as conjugated ester forms"
      }
    ]
  },
  {
    "id": "total-knoevenagel-benzaldehyde-acetoacetate",
    "name": "Knoevenagel condensation of benzaldehyde with ethyl acetoacetate",
    "reactants": [
      "c7h6o",
      "ethyl_acetoacetate"
    ],
    "products": [
      "ethyl_benzylideneacetoacetate",
      "water"
    ],
    "enthalpy": -36,
    "desc": "Condensation of aromatic aldehyde with active beta-keto ester.",
    "type": "synthesis",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "White to cream crystalline adduct forms"
      }
    ]
  },
  {
    "id": "total-robinson-annulation-step",
    "name": "Robinson annulation: condensation of cyclohexanone with methyl vinyl ketone",
    "reactants": [
      "cyclohexanone",
      "methyl_vinyl_ketone"
    ],
    "products": [
      "octalone_bicyclic",
      "water"
    ],
    "enthalpy": -85,
    "desc": "Tandem Michael addition followed by intramolecular aldol condensation forming bicyclic hexahydronaphthalen-2-one.",
    "type": "synthesis",
    "effects": [
      {
        "type": "color_change",
        "colorFrom": "#FFFFFF",
        "colorTo": "#EDBB99",
        "description": "Deepening of orange-brown tint in basic medium"
      }
    ]
  },
  {
    "id": "total-robinson-cyclopentanone-mvk",
    "name": "Robinson annulation of cyclopentanone with methyl vinyl ketone",
    "reactants": [
      "c5h8o",
      "methyl_vinyl_ketone"
    ],
    "products": [
      "tetrahydroindan_one",
      "water"
    ],
    "enthalpy": -82,
    "desc": "Annulation cascade synthesizing bicyclic [4.3.0] nonenone.",
    "type": "synthesis",
    "effects": [
      {
        "type": "color_change",
        "colorFrom": "#FFFFFF",
        "colorTo": "#F5CBA7",
        "description": "Amber coloration"
      }
    ]
  },
  {
    "id": "total-fischer-acetone",
    "name": "Fischer indole synthesis of 2-methylindole from phenylhydrazine and acetone",
    "reactants": [
      "phenylhydrazine",
      "ch3coch3"
    ],
    "products": [
      "2_methylindole",
      "ammonia",
      "water"
    ],
    "enthalpy": -95,
    "desc": "Acid-catalyzed sigmatropic rearrangement and cyclization of acetone phenylhydrazone.",
    "type": "synthesis",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#F5EEF8",
        "description": "Crystallization of 2-methylindole with release of ammonia gas"
      },
      {
        "type": "gas_evolution",
        "description": "Ammonia gas evolution"
      }
    ]
  },
  {
    "id": "total-fischer-cyclohexanone",
    "name": "Fischer indole synthesis of 1,2,3,4-tetrahydrocarbazole",
    "reactants": [
      "phenylhydrazine",
      "cyclohexanone"
    ],
    "products": [
      "tetrahydrocarbazole",
      "ammonia",
      "water"
    ],
    "enthalpy": -110,
    "desc": "Synthesis of tricyclic carbazole core via Fischer cyclization.",
    "type": "synthesis",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Rapid crystallization of white tetrahydrocarbazole"
      }
    ]
  },
  {
    "id": "total-fischer-cyclopentanone",
    "name": "Fischer indole synthesis of 1,2,3,4-tetrahydrocyclopenta[b]indole",
    "reactants": [
      "phenylhydrazine",
      "c5h8o"
    ],
    "products": [
      "tetrahydrocyclopentaindole",
      "ammonia",
      "water"
    ],
    "enthalpy": -105,
    "desc": "Cyclization forming cyclopentindole framework.",
    "type": "synthesis",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#F4ECF7",
        "description": "Precipitation of crystalline indole"
      }
    ]
  },
  {
    "id": "total-fischer-pyruvate",
    "name": "Fischer indole synthesis of ethyl indole-2-carboxylate",
    "reactants": [
      "phenylhydrazine",
      "ethyl_pyruvate"
    ],
    "products": [
      "ethyl_indole_2_carboxylate",
      "ammonia",
      "water"
    ],
    "enthalpy": -102,
    "desc": "Fischer synthesis of 2-carboethoxyindole derivative.",
    "type": "synthesis",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#E8DAEF",
        "description": "Tan crystalline precipitation"
      }
    ]
  },
  {
    "id": "total-fischer-butanone",
    "name": "Fischer indole synthesis of 2,3-dimethylindole from 2-butanone",
    "reactants": [
      "phenylhydrazine",
      "c4h8o_mek"
    ],
    "products": [
      "2_3_dimethylindole",
      "ammonia",
      "water"
    ],
    "enthalpy": -98,
    "desc": "Cyclization of 2-butanone phenylhydrazone.",
    "type": "synthesis",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FDEDEC",
        "description": "Pale pink crystals precipitate"
      }
    ]
  },
  {
    "id": "total-fischer-propiophenone",
    "name": "Fischer indole synthesis of 3-methyl-2-phenylindole",
    "reactants": [
      "phenylhydrazine",
      "propiophenone"
    ],
    "products": [
      "3_methyl_2_phenylindole",
      "ammonia",
      "water"
    ],
    "enthalpy": -115,
    "desc": "Synthesis of 2,3-disubstituted indole.",
    "type": "synthesis",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "White solid precipitation"
      }
    ]
  },
  {
    "id": "total-fischer-acetophenone",
    "name": "Fischer indole synthesis of 2-phenylindole",
    "reactants": [
      "phenylhydrazine",
      "acetophenone"
    ],
    "products": [
      "2_phenylindole",
      "ammonia",
      "water"
    ],
    "enthalpy": -112,
    "desc": "Acid-promoted cyclization forming 2-phenylindole.",
    "type": "synthesis",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Crystalline flakes precipitate"
      }
    ]
  },
  {
    "id": "total-fischer-3-pentanone",
    "name": "Fischer indole synthesis of 2-ethyl-3-methylindole",
    "reactants": [
      "phenylhydrazine",
      "3_pentanone"
    ],
    "products": [
      "2_ethyl_3_methylindole",
      "ammonia",
      "water"
    ],
    "enthalpy": -96,
    "desc": "Synthesis of 2,3-dialkylindole from symmetrical ketone.",
    "type": "synthesis",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FADBD8",
        "description": "Deposition of pinkish-white crystals"
      }
    ]
  },
  {
    "id": "total-fischer-phenylacetaldehyde",
    "name": "Fischer indole synthesis of 3-phenylindole",
    "reactants": [
      "phenylhydrazine",
      "phenylacetaldehyde"
    ],
    "products": [
      "3_phenylindole",
      "ammonia",
      "water"
    ],
    "enthalpy": -108,
    "desc": "Cyclization of phenylacetaldehyde phenylhydrazone.",
    "type": "synthesis",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Precipitation of 3-phenylindole"
      }
    ]
  },
  {
    "id": "total-fischer-levulinic-acid",
    "name": "Fischer indole synthesis of 2-methylindole-3-acetic acid",
    "reactants": [
      "phenylhydrazine",
      "levulinic_acid"
    ],
    "products": [
      "2_methylindole_3_acetic_acid",
      "ammonia",
      "water"
    ],
    "enthalpy": -106,
    "desc": "Synthesis of auxin/indomethacin intermediate.",
    "type": "synthesis",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#D7BDE2",
        "description": "Off-white crystalline solid precipitates"
      }
    ]
  },
  {
    "id": "total-wittig-benzaldehyde-methyl",
    "name": "Wittig olefination of benzaldehyde with methylenetriphenylphosphorane",
    "reactants": [
      "c7h6o",
      "methylenetriphenylphosphorane"
    ],
    "products": [
      "c8h8",
      "triphenylphosphine_oxide"
    ],
    "enthalpy": -180,
    "desc": "Classic Wittig synthesis of styrene driven by strong phosphorus-oxygen bond formation.",
    "type": "double_displacement",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Copious precipitation of triphenylphosphine oxide"
      }
    ]
  },
  {
    "id": "total-wittig-cyclohexanone-methyl",
    "name": "Wittig methylenation of cyclohexanone",
    "reactants": [
      "cyclohexanone",
      "methylenetriphenylphosphorane"
    ],
    "products": [
      "methylenecyclohexane",
      "triphenylphosphine_oxide"
    ],
    "enthalpy": -175,
    "desc": "Conversion of cyclic ketone to exocyclic alkene.",
    "type": "double_displacement",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Precipitation of triphenylphosphine oxide"
      }
    ]
  },
  {
    "id": "total-wittig-cyclopentanone-methyl",
    "name": "Wittig methylenation of cyclopentanone",
    "reactants": [
      "c5h8o",
      "methylenetriphenylphosphorane"
    ],
    "products": [
      "methylenecyclopentane",
      "triphenylphosphine_oxide"
    ],
    "enthalpy": -174,
    "desc": "Synthesis of methylenecyclopentane.",
    "type": "double_displacement",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "White solid precipitation"
      }
    ]
  },
  {
    "id": "total-wittig-acetone-methyl",
    "name": "Wittig methylenation of acetone to 2-methylpropene (isobutylene)",
    "reactants": [
      "ch3coch3",
      "methylenetriphenylphosphorane"
    ],
    "products": [
      "isobutylene",
      "triphenylphosphine_oxide"
    ],
    "enthalpy": -172,
    "desc": "Generation of gaseous isobutylene from acetone.",
    "type": "double_displacement",
    "effects": [
      {
        "type": "gas_evolution",
        "description": "Evolution of isobutylene gas"
      },
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Precipitation of triphenylphosphine oxide"
      }
    ]
  },
  {
    "id": "total-wittig-acetaldehyde-methyl",
    "name": "Wittig methylenation of acetaldehyde to propylene",
    "reactants": [
      "ch3cho",
      "methylenetriphenylphosphorane"
    ],
    "products": [
      "c3h6",
      "triphenylphosphine_oxide"
    ],
    "enthalpy": -170,
    "desc": "Olefination of acetaldehyde to propylene gas.",
    "type": "double_displacement",
    "effects": [
      {
        "type": "gas_evolution",
        "description": "Evolution of propylene gas"
      }
    ]
  },
  {
    "id": "total-wittig-acetophenone-methyl",
    "name": "Wittig methylenation of acetophenone to alpha-methylstyrene",
    "reactants": [
      "acetophenone",
      "methylenetriphenylphosphorane"
    ],
    "products": [
      "alpha_methylstyrene",
      "triphenylphosphine_oxide"
    ],
    "enthalpy": -178,
    "desc": "Olefination of acetophenone.",
    "type": "double_displacement",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Precipitation of triphenylphosphine oxide"
      }
    ]
  },
  {
    "id": "total-wittig-benzophenone-methyl",
    "name": "Wittig methylenation of benzophenone to 1,1-diphenylethylene",
    "reactants": [
      "benzophenone",
      "methylenetriphenylphosphorane"
    ],
    "products": [
      "1_1_diphenylethylene",
      "triphenylphosphine_oxide"
    ],
    "enthalpy": -176,
    "desc": "Synthesis of 1,1-diphenylethene.",
    "type": "double_displacement",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Crystalline byproduct precipitation"
      }
    ]
  },
  {
    "id": "total-wittig-cinnamaldehyde-methyl",
    "name": "Wittig methylenation of cinnamaldehyde to 1-phenyl-1,3-butadiene",
    "reactants": [
      "cinnamaldehyde",
      "methylenetriphenylphosphorane"
    ],
    "products": [
      "1_phenyl_1_3_butadiene",
      "triphenylphosphine_oxide"
    ],
    "enthalpy": -182,
    "desc": "Conjugated diene synthesis via Wittig reaction.",
    "type": "double_displacement",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Triphenylphosphine oxide deposition"
      }
    ]
  },
  {
    "id": "total-wittig-crotonaldehyde-methyl",
    "name": "Wittig methylenation of crotonaldehyde to 1,3-pentadiene",
    "reactants": [
      "c4h6o_crotonaldehyde",
      "methylenetriphenylphosphorane"
    ],
    "products": [
      "1_3_pentadiene",
      "triphenylphosphine_oxide"
    ],
    "enthalpy": -173,
    "desc": "Synthesis of piperylene diene isomer.",
    "type": "double_displacement",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Precipitation of TPPO"
      }
    ]
  },
  {
    "id": "total-wittig-adamantanone-methyl",
    "name": "Wittig methylenation of 2-adamantanone to 2-methyleneadamantane",
    "reactants": [
      "adamantanone",
      "methylenetriphenylphosphorane"
    ],
    "products": [
      "2_methyleneadamantane",
      "triphenylphosphine_oxide"
    ],
    "enthalpy": -185,
    "desc": "Olefination of rigid tricyclic cage ketone.",
    "type": "double_displacement",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "White solid precipitation"
      }
    ]
  },
  {
    "id": "total-clemmensen-cyclohexanone",
    "name": "Clemmensen reduction of cyclohexanone to cyclohexane",
    "reactants": [
      "cyclohexanone",
      "zn",
      "hcl"
    ],
    "products": [
      "c6h12",
      "zncl2",
      "water"
    ],
    "enthalpy": -295,
    "desc": "Complete reduction of cyclic ketone to cyclohexane.",
    "type": "redox_other",
    "effects": [
      {
        "type": "phase_change",
        "description": "Formation of immiscible upper cyclohexane hydrocarbon layer"
      }
    ]
  },
  {
    "id": "total-clemmensen-cyclopentanone",
    "name": "Clemmensen reduction of cyclopentanone to cyclopentane",
    "reactants": [
      "c5h8o",
      "zn",
      "hcl"
    ],
    "products": [
      "c5h10",
      "zncl2",
      "water"
    ],
    "enthalpy": -290,
    "desc": "Deoxygenation of cyclopentanone.",
    "type": "redox_other",
    "effects": [
      {
        "type": "phase_change",
        "description": "Separation of cyclopentane layer"
      }
    ]
  },
  {
    "id": "total-clemmensen-acetone",
    "name": "Clemmensen reduction of acetone to propane",
    "reactants": [
      "ch3coch3",
      "zn",
      "hcl"
    ],
    "products": [
      "propane",
      "zncl2",
      "water"
    ],
    "enthalpy": -285,
    "desc": "Acidic reduction of acetone liberating propane gas.",
    "type": "redox_other",
    "effects": [
      {
        "type": "gas_evolution",
        "description": "Propane gas evolution"
      }
    ]
  },
  {
    "id": "total-wolff-kishner-acetophenone",
    "name": "Wolff-Kishner reduction of acetophenone to ethylbenzene",
    "reactants": [
      "acetophenone",
      "n2h4"
    ],
    "products": [
      "c8h10",
      "n2",
      "water"
    ],
    "enthalpy": -220,
    "desc": "Alkaline high-temperature decomposition of acetophenone hydrazone releasing nitrogen gas.",
    "type": "redox_other",
    "effects": [
      {
        "type": "gas_evolution",
        "description": "Vigorous nitrogen gas evolution"
      }
    ]
  },
  {
    "id": "total-wolff-kishner-benzophenone",
    "name": "Wolff-Kishner reduction of benzophenone to diphenylmethane",
    "reactants": [
      "benzophenone",
      "n2h4"
    ],
    "products": [
      "diphenylmethane",
      "n2",
      "water"
    ],
    "enthalpy": -215,
    "desc": "Base-catalyzed deoxygenation of benzophenone.",
    "type": "redox_other",
    "effects": [
      {
        "type": "gas_evolution",
        "description": "Evolution of molecular nitrogen"
      }
    ]
  },
  {
    "id": "total-wolff-kishner-cyclohexanone",
    "name": "Wolff-Kishner reduction of cyclohexanone to cyclohexane",
    "reactants": [
      "cyclohexanone",
      "n2h4"
    ],
    "products": [
      "c6h12",
      "n2",
      "water"
    ],
    "enthalpy": -210,
    "desc": "Conversion of cyclohexanone to cyclohexane.",
    "type": "redox_other",
    "effects": [
      {
        "type": "gas_evolution",
        "description": "Nitrogen gas effervescence"
      }
    ]
  },
  {
    "id": "total-wolff-kishner-cyclopentanone",
    "name": "Wolff-Kishner reduction of cyclopentanone to cyclopentane",
    "reactants": [
      "c5h8o",
      "n2h4"
    ],
    "products": [
      "c5h10",
      "n2",
      "water"
    ],
    "enthalpy": -208,
    "desc": "Deoxygenation of five-membered cyclic ketone.",
    "type": "redox_other",
    "effects": [
      {
        "type": "gas_evolution",
        "description": "Nitrogen gas evolution"
      }
    ]
  },
  {
    "id": "total-wolff-kishner-acetone",
    "name": "Wolff-Kishner reduction of acetone to propane",
    "reactants": [
      "ch3coch3",
      "n2h4"
    ],
    "products": [
      "propane",
      "n2",
      "water"
    ],
    "enthalpy": -205,
    "desc": "Conversion of acetone to gaseous propane.",
    "type": "redox_other",
    "effects": [
      {
        "type": "gas_evolution",
        "description": "Propane and nitrogen gas evolution"
      }
    ]
  },
  {
    "id": "total-pinacol-rearrangement",
    "name": "Pinacol rearrangement of pinacol to pinacolone",
    "reactants": [
      "pinacol"
    ],
    "products": [
      "pinacolone",
      "water"
    ],
    "enthalpy": -45,
    "desc": "Acid-catalyzed 1,2-methyl shift in 2,3-dimethylbutane-2,3-diol forming pinacolone.",
    "type": "decomposition",
    "effects": [
      {
        "type": "color_change",
        "colorFrom": "#FFFFFF",
        "colorTo": "#FCF3CF",
        "description": "Liquid distillation of pinacolone with minty odor"
      }
    ]
  },
  {
    "id": "total-cannizzaro-benzaldehyde",
    "name": "Cannizzaro disproportionation of benzaldehyde",
    "reactants": [
      "c7h6o",
      "koh"
    ],
    "products": [
      "c7h8o",
      "c7h5o2k"
    ],
    "enthalpy": -80,
    "desc": "Base-induced redox disproportionation of non-enolizable aromatic aldehyde.",
    "type": "redox_other",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Precipitation of potassium benzoate"
      }
    ]
  },
  {
    "id": "total-cannizzaro-p-chlorobenzaldehyde",
    "name": "Cannizzaro disproportionation of 4-chlorobenzaldehyde",
    "reactants": [
      "p_chlorobenzaldehyde",
      "koh"
    ],
    "products": [
      "p_chlorobenzyl_alcohol",
      "potassium_p_chlorobenzoate"
    ],
    "enthalpy": -82,
    "desc": "Disproportionation of halo-substituted aromatic aldehyde.",
    "type": "redox_other",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Precipitation of potassium 4-chlorobenzoate"
      }
    ]
  },
  {
    "id": "total-beckmann-cyclohexanone-oxime",
    "name": "Beckmann rearrangement of cyclohexanone oxime to caprolactam",
    "reactants": [
      "cyclohexanone_oxime"
    ],
    "products": [
      "caprolactam"
    ],
    "enthalpy": -115,
    "desc": "Acid-promoted ring expansion rearrangement yielding epsilon-caprolactam monomer for Nylon 6.",
    "type": "decomposition",
    "effects": [
      {
        "type": "temperature_increase",
        "description": "Violent exotherm in concentrated sulfuric acid medium"
      }
    ]
  },
  {
    "id": "total-beckmann-acetophenone-oxime",
    "name": "Beckmann rearrangement of acetophenone oxime to acetanilide",
    "reactants": [
      "acetophenone_oxime"
    ],
    "products": [
      "c8h9no"
    ],
    "enthalpy": -105,
    "desc": "Stereospecific anti-migration of phenyl ring forming acetanilide.",
    "type": "decomposition",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Precipitation of acetanilide upon aqueous dilution"
      }
    ]
  },
  {
    "id": "total-birch-benzene",
    "name": "Birch reduction of benzene to 1,4-cyclohexadiene",
    "reactants": [
      "c6h6",
      "na",
      "c2h5oh"
    ],
    "products": [
      "1_4_cyclohexadiene",
      "sodium_ethoxide"
    ],
    "enthalpy": -240,
    "desc": "Dissolving metal reduction in liquid ammonia/alcohol providing non-conjugated diene.",
    "type": "redox_other",
    "effects": [
      {
        "type": "color_change",
        "colorFrom": "#1B4F72",
        "colorTo": "#FFFFFF",
        "description": "Deep blue solvated electron solution discharges to clear"
      }
    ]
  },
  {
    "id": "total-michael-malonate-chalcone",
    "name": "Michael addition of diethyl malonate to chalcone",
    "reactants": [
      "diethyl_malonate",
      "chalcone"
    ],
    "products": [
      "michael_malonate_chalcone"
    ],
    "enthalpy": -60,
    "desc": "Conjugate 1,4-addition of active methylene nucleophile across alpha,beta-unsaturated ketone.",
    "type": "synthesis",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "White adduct crystallizes"
      }
    ]
  },
  {
    "id": "total-michael-acetoacetate-mvk",
    "name": "Michael addition of ethyl acetoacetate to methyl vinyl ketone",
    "reactants": [
      "ethyl_acetoacetate",
      "methyl_vinyl_ketone"
    ],
    "products": [
      "michael_acetoacetate_mvk"
    ],
    "enthalpy": -58,
    "desc": "Base-catalyzed 1,4-conjugate addition forming 1,5-diketone precursor.",
    "type": "synthesis",
    "effects": [
      {
        "type": "color_change",
        "colorFrom": "#FFFFFF",
        "colorTo": "#FCF3CF",
        "description": "Slight yellowing of reaction mixture"
      }
    ]
  },
  {
    "id": "total-michael-malonate-mvk",
    "name": "Michael addition of diethyl malonate to methyl vinyl ketone",
    "reactants": [
      "diethyl_malonate",
      "methyl_vinyl_ketone"
    ],
    "products": [
      "michael_malonate_mvk"
    ],
    "enthalpy": -55,
    "desc": "Conjugate addition yielding keto-diester.",
    "type": "synthesis",
    "effects": [
      {
        "type": "temperature_increase",
        "description": "Mild exotherm upon addition"
      }
    ]
  },
  {
    "id": "total-michael-acetylacetone-mvk",
    "name": "Michael addition of acetylacetone to methyl vinyl ketone",
    "reactants": [
      "acetylacetone",
      "methyl_vinyl_ketone"
    ],
    "products": [
      "michael_acac_mvk"
    ],
    "enthalpy": -62,
    "desc": "Addition of beta-diketone across enone.",
    "type": "synthesis",
    "effects": [
      {
        "type": "temperature_increase",
        "description": "Exothermic reaction"
      }
    ]
  },
  {
    "id": "total-michael-malonate-acrolein",
    "name": "Michael addition of diethyl malonate to acrolein",
    "reactants": [
      "diethyl_malonate",
      "acrolein"
    ],
    "products": [
      "michael_malonate_acrolein"
    ],
    "enthalpy": -54,
    "desc": "Conjugate addition to acrolein.",
    "type": "synthesis",
    "effects": [
      {
        "type": "color_change",
        "colorFrom": "#FFFFFF",
        "colorTo": "#F9E79F",
        "description": "Color change to pale yellow"
      }
    ]
  },
  {
    "id": "total-michael-malonate-acrylonitrile",
    "name": "Cyanoethylation: Michael addition of diethyl malonate to acrylonitrile",
    "reactants": [
      "diethyl_malonate",
      "c3h3n_acrylonitrile"
    ],
    "products": [
      "michael_malonate_nitrile"
    ],
    "enthalpy": -58,
    "desc": "Cyanoethylation of active methylene diester.",
    "type": "synthesis",
    "effects": [
      {
        "type": "temperature_increase",
        "description": "Exotherm with consumption of volatile nitrile"
      }
    ]
  },
  {
    "id": "total-michael-diethylamine-acrolein",
    "name": "Conjugate addition of diethylamine to acrolein",
    "reactants": [
      "diethylamine",
      "acrolein"
    ],
    "products": [
      "3_diethylaminopropanal"
    ],
    "enthalpy": -65,
    "desc": "Aza-Michael addition across conjugated enal.",
    "type": "synthesis",
    "effects": [
      {
        "type": "color_change",
        "colorFrom": "#FFFFFF",
        "colorTo": "#FEF9E7",
        "description": "Slight yellowing"
      }
    ]
  },
  {
    "id": "total-michael-morpholine-mvk",
    "name": "Aza-Michael addition of morpholine to methyl vinyl ketone",
    "reactants": [
      "morpholine",
      "methyl_vinyl_ketone"
    ],
    "products": [
      "4_morpholinobutan_2_one"
    ],
    "enthalpy": -68,
    "desc": "Facile amine conjugate addition without catalyst.",
    "type": "synthesis",
    "effects": [
      {
        "type": "temperature_increase",
        "description": "Immediate exotherm on mixing"
      }
    ]
  },
  {
    "id": "total-michael-piperidine-chalcone",
    "name": "Aza-Michael addition of piperidine to chalcone",
    "reactants": [
      "piperidine",
      "chalcone"
    ],
    "products": [
      "1_3_diphenyl_3_piperidinopropan_1_one"
    ],
    "enthalpy": -50,
    "desc": "Conjugate addition to chalcone enone system.",
    "type": "synthesis",
    "effects": [
      {
        "type": "precipitation",
        "colorTo": "#FFFFFF",
        "description": "Precipitation of beta-amino ketone"
      }
    ]
  },
  {
    "id": "total-michael-nitroethane-mvk",
    "name": "Michael addition of nitroethane to methyl vinyl ketone",
    "reactants": [
      "nitroethane",
      "methyl_vinyl_ketone"
    ],
    "products": [
      "5_nitrohexan_2_one"
    ],
    "enthalpy": -62,
    "desc": "Carbon-carbon bond formation via nitroalkane carbanion addition.",
    "type": "synthesis",
    "effects": [
      {
        "type": "color_change",
        "colorFrom": "#FFFFFF",
        "colorTo": "#FAD7A0",
        "description": "Development of amber color"
      }
    ]
  }
];
