import { addReaction } from "./generate1000Reactions.js";

export function buildDomain2Precipitation(): void {
  // Domain 2: 220 Curated Precipitation Reactions
  const precipitations = [
  {
    "id": "precip-agno3-kcl",
    "name": "Precipitation of AGCL from silver nitrate and potassium chloride",
    "reactants": [
      "agno3",
      "kcl"
    ],
    "precipitate": "agcl",
    "byproduct": "kno3",
    "enthalpy": -65.5,
    "netIonic": "Ag+ + X- → AgX(s)",
    "colorTo": "#FFFFFF",
    "desc": "Formation of insoluble AGCL precipitate."
  },
  {
    "id": "precip-agno3-licl",
    "name": "Precipitation of AGCL from silver nitrate and lithium chloride",
    "reactants": [
      "agno3",
      "licl"
    ],
    "precipitate": "agcl",
    "byproduct": "lino3",
    "enthalpy": -65.2,
    "netIonic": "Ag+ + X- → AgX(s)",
    "colorTo": "#FFFFFF",
    "desc": "Formation of insoluble AGCL precipitate."
  },
  {
    "id": "precip-agno3-rbcl",
    "name": "Precipitation of AGCL from silver nitrate and rubidium chloride",
    "reactants": [
      "agno3",
      "rbcl"
    ],
    "precipitate": "agcl",
    "byproduct": "rbno3",
    "enthalpy": -65.6,
    "netIonic": "Ag+ + X- → AgX(s)",
    "colorTo": "#FFFFFF",
    "desc": "Formation of insoluble AGCL precipitate."
  },
  {
    "id": "precip-agno3-cscl",
    "name": "Precipitation of AGCL from silver nitrate and cesium chloride",
    "reactants": [
      "agno3",
      "cscl"
    ],
    "precipitate": "agcl",
    "byproduct": "csno3",
    "enthalpy": -65.7,
    "netIonic": "Ag+ + X- → AgX(s)",
    "colorTo": "#FFFFFF",
    "desc": "Formation of insoluble AGCL precipitate."
  },
  {
    "id": "precip-agno3-cacl2",
    "name": "Precipitation of AGCL from silver nitrate and calcium chloride",
    "reactants": [
      "agno3",
      "cacl2"
    ],
    "precipitate": "agcl",
    "byproduct": "ca-no3-2",
    "enthalpy": -131,
    "netIonic": "Ag+ + X- → AgX(s)",
    "colorTo": "#FFFFFF",
    "desc": "Formation of insoluble AGCL precipitate."
  },
  {
    "id": "precip-agno3-bacl2",
    "name": "Precipitation of AGCL from silver nitrate and barium chloride",
    "reactants": [
      "agno3",
      "bacl2"
    ],
    "precipitate": "agcl",
    "byproduct": "bano32",
    "enthalpy": -131.2,
    "netIonic": "Ag+ + X- → AgX(s)",
    "colorTo": "#FFFFFF",
    "desc": "Formation of insoluble AGCL precipitate."
  },
  {
    "id": "precip-agno3-srcl2",
    "name": "Precipitation of AGCL from silver nitrate and strontium chloride",
    "reactants": [
      "agno3",
      "srcl2"
    ],
    "precipitate": "agcl",
    "byproduct": "sr-no3-2",
    "enthalpy": -131,
    "netIonic": "Ag+ + X- → AgX(s)",
    "colorTo": "#FFFFFF",
    "desc": "Formation of insoluble AGCL precipitate."
  },
  {
    "id": "precip-agno3-mgcl2",
    "name": "Precipitation of AGCL from silver nitrate and magnesium chloride",
    "reactants": [
      "agno3",
      "mgcl2"
    ],
    "precipitate": "agcl",
    "byproduct": "mg-no3-2",
    "enthalpy": -130.5,
    "netIonic": "Ag+ + X- → AgX(s)",
    "colorTo": "#FFFFFF",
    "desc": "Formation of insoluble AGCL precipitate."
  },
  {
    "id": "precip-agno3-zncl2",
    "name": "Precipitation of AGCL from silver nitrate and zinc chloride",
    "reactants": [
      "agno3",
      "zncl2"
    ],
    "precipitate": "agcl",
    "byproduct": "zn-no3-2",
    "enthalpy": -130.8,
    "netIonic": "Ag+ + X- → AgX(s)",
    "colorTo": "#FFFFFF",
    "desc": "Formation of insoluble AGCL precipitate."
  },
  {
    "id": "precip-agno3-cucl2",
    "name": "Precipitation of AGCL from silver nitrate and copper(II) chloride",
    "reactants": [
      "agno3",
      "cucl2"
    ],
    "precipitate": "agcl",
    "byproduct": "cu-no3-2",
    "enthalpy": -130.2,
    "netIonic": "Ag+ + X- → AgX(s)",
    "colorTo": "#FFFFFF",
    "desc": "Formation of insoluble AGCL precipitate."
  },
  {
    "id": "precip-agno3-nicl2",
    "name": "Precipitation of AGCL from silver nitrate and nickel(II) chloride",
    "reactants": [
      "agno3",
      "nicl2"
    ],
    "precipitate": "agcl",
    "byproduct": "ni-no3-2",
    "enthalpy": -130.4,
    "netIonic": "Ag+ + X- → AgX(s)",
    "colorTo": "#FFFFFF",
    "desc": "Formation of insoluble AGCL precipitate."
  },
  {
    "id": "precip-agno3-cocl2",
    "name": "Precipitation of AGCL from silver nitrate and cobalt(II) chloride",
    "reactants": [
      "agno3",
      "cocl2"
    ],
    "precipitate": "agcl",
    "byproduct": "co-no3-2",
    "enthalpy": -130.3,
    "netIonic": "Ag+ + X- → AgX(s)",
    "colorTo": "#FFFFFF",
    "desc": "Formation of insoluble AGCL precipitate."
  },
  {
    "id": "precip-agno3-mncl2",
    "name": "Precipitation of AGCL from silver nitrate and manganese(II) chloride",
    "reactants": [
      "agno3",
      "mncl2"
    ],
    "precipitate": "agcl",
    "byproduct": "mn-no3-2",
    "enthalpy": -130.6,
    "netIonic": "Ag+ + X- → AgX(s)",
    "colorTo": "#FFFFFF",
    "desc": "Formation of insoluble AGCL precipitate."
  },
  {
    "id": "precip-agno3-fecl2",
    "name": "Precipitation of AGCL from silver nitrate and iron(II) chloride",
    "reactants": [
      "agno3",
      "fecl2"
    ],
    "precipitate": "agcl",
    "byproduct": "fe-no3-2",
    "enthalpy": -130.5,
    "netIonic": "Ag+ + X- → AgX(s)",
    "colorTo": "#FFFFFF",
    "desc": "Formation of insoluble AGCL precipitate."
  },
  {
    "id": "precip-agno3-fecl3",
    "name": "Precipitation of AGCL from silver nitrate and iron(III) chloride",
    "reactants": [
      "agno3",
      "fecl3"
    ],
    "precipitate": "agcl",
    "byproduct": "fe-no3-3",
    "enthalpy": -196,
    "netIonic": "Ag+ + X- → AgX(s)",
    "colorTo": "#FFFFFF",
    "desc": "Formation of insoluble AGCL precipitate."
  },
  {
    "id": "precip-agno3-alcl3",
    "name": "Precipitation of AGCL from silver nitrate and aluminium chloride",
    "reactants": [
      "agno3",
      "alcl3"
    ],
    "precipitate": "agcl",
    "byproduct": "al-no3-3",
    "enthalpy": -196.5,
    "netIonic": "Ag+ + X- → AgX(s)",
    "colorTo": "#FFFFFF",
    "desc": "Formation of insoluble AGCL precipitate."
  },
  {
    "id": "precip-agno3-ammonium-chloride",
    "name": "Precipitation of AGCL from silver nitrate and ammonium chloride",
    "reactants": [
      "agno3",
      "ammonium-chloride"
    ],
    "precipitate": "agcl",
    "byproduct": "nh4no3",
    "enthalpy": -65.4,
    "netIonic": "Ag+ + X- → AgX(s)",
    "colorTo": "#FFFFFF",
    "desc": "Formation of insoluble AGCL precipitate."
  },
  {
    "id": "precip-agno3-libr",
    "name": "Precipitation of AGBR from silver nitrate and lithium bromide",
    "reactants": [
      "agno3",
      "libr"
    ],
    "precipitate": "agbr",
    "byproduct": "lino3",
    "enthalpy": -84,
    "netIonic": "Ag+ + X- → AgX(s)",
    "colorTo": "#FFFDD0",
    "desc": "Formation of insoluble AGBR precipitate."
  },
  {
    "id": "precip-agno3-rbbr",
    "name": "Precipitation of AGBR from silver nitrate and rubidium bromide",
    "reactants": [
      "agno3",
      "rbbr"
    ],
    "precipitate": "agbr",
    "byproduct": "rbno3",
    "enthalpy": -84.3,
    "netIonic": "Ag+ + X- → AgX(s)",
    "colorTo": "#FFFDD0",
    "desc": "Formation of insoluble AGBR precipitate."
  },
  {
    "id": "precip-agno3-csbr",
    "name": "Precipitation of AGBR from silver nitrate and cesium bromide",
    "reactants": [
      "agno3",
      "csbr"
    ],
    "precipitate": "agbr",
    "byproduct": "csno3",
    "enthalpy": -84.4,
    "netIonic": "Ag+ + X- → AgX(s)",
    "colorTo": "#FFFDD0",
    "desc": "Formation of insoluble AGBR precipitate."
  },
  {
    "id": "precip-agno3-cabr2",
    "name": "Precipitation of AGBR from silver nitrate and calcium bromide",
    "reactants": [
      "agno3",
      "cabr2"
    ],
    "precipitate": "agbr",
    "byproduct": "ca-no3-2",
    "enthalpy": -168.4,
    "netIonic": "Ag+ + X- → AgX(s)",
    "colorTo": "#FFFDD0",
    "desc": "Formation of insoluble AGBR precipitate."
  },
  {
    "id": "precip-agno3-babr2",
    "name": "Precipitation of AGBR from silver nitrate and barium bromide",
    "reactants": [
      "agno3",
      "babr2"
    ],
    "precipitate": "agbr",
    "byproduct": "bano32",
    "enthalpy": -168.6,
    "netIonic": "Ag+ + X- → AgX(s)",
    "colorTo": "#FFFDD0",
    "desc": "Formation of insoluble AGBR precipitate."
  },
  {
    "id": "precip-agno3-srbr2",
    "name": "Precipitation of AGBR from silver nitrate and strontium bromide",
    "reactants": [
      "agno3",
      "srbr2"
    ],
    "precipitate": "agbr",
    "byproduct": "sr-no3-2",
    "enthalpy": -168.3,
    "netIonic": "Ag+ + X- → AgX(s)",
    "colorTo": "#FFFDD0",
    "desc": "Formation of insoluble AGBR precipitate."
  },
  {
    "id": "precip-agno3-mgbr2",
    "name": "Precipitation of AGBR from silver nitrate and magnesium bromide",
    "reactants": [
      "agno3",
      "mgbr2"
    ],
    "precipitate": "agbr",
    "byproduct": "mg-no3-2",
    "enthalpy": -168,
    "netIonic": "Ag+ + X- → AgX(s)",
    "colorTo": "#FFFDD0",
    "desc": "Formation of insoluble AGBR precipitate."
  },
  {
    "id": "precip-agno3-znbr2",
    "name": "Precipitation of AGBR from silver nitrate and zinc bromide",
    "reactants": [
      "agno3",
      "znbr2"
    ],
    "precipitate": "agbr",
    "byproduct": "zn-no3-2",
    "enthalpy": -168.1,
    "netIonic": "Ag+ + X- → AgX(s)",
    "colorTo": "#FFFDD0",
    "desc": "Formation of insoluble AGBR precipitate."
  },
  {
    "id": "precip-agno3-cubr2",
    "name": "Precipitation of AGBR from silver nitrate and copper(II) bromide",
    "reactants": [
      "agno3",
      "cubr2"
    ],
    "precipitate": "agbr",
    "byproduct": "cu-no3-2",
    "enthalpy": -167.8,
    "netIonic": "Ag+ + X- → AgX(s)",
    "colorTo": "#FFFDD0",
    "desc": "Formation of insoluble AGBR precipitate."
  },
  {
    "id": "precip-agno3-nibr2",
    "name": "Precipitation of AGBR from silver nitrate and nickel(II) bromide",
    "reactants": [
      "agno3",
      "nibr2"
    ],
    "precipitate": "agbr",
    "byproduct": "ni-no3-2",
    "enthalpy": -168,
    "netIonic": "Ag+ + X- → AgX(s)",
    "colorTo": "#FFFDD0",
    "desc": "Formation of insoluble AGBR precipitate."
  },
  {
    "id": "precip-agno3-cobr2",
    "name": "Precipitation of AGBR from silver nitrate and cobalt(II) bromide",
    "reactants": [
      "agno3",
      "cobr2"
    ],
    "precipitate": "agbr",
    "byproduct": "co-no3-2",
    "enthalpy": -167.9,
    "netIonic": "Ag+ + X- → AgX(s)",
    "colorTo": "#FFFDD0",
    "desc": "Formation of insoluble AGBR precipitate."
  },
  {
    "id": "precip-agno3-mnbr2",
    "name": "Precipitation of AGBR from silver nitrate and manganese(II) bromide",
    "reactants": [
      "agno3",
      "mnbr2"
    ],
    "precipitate": "agbr",
    "byproduct": "mn-no3-2",
    "enthalpy": -168.2,
    "netIonic": "Ag+ + X- → AgX(s)",
    "colorTo": "#FFFDD0",
    "desc": "Formation of insoluble AGBR precipitate."
  },
  {
    "id": "precip-agno3-febr2",
    "name": "Precipitation of AGBR from silver nitrate and iron(II) bromide",
    "reactants": [
      "agno3",
      "febr2"
    ],
    "precipitate": "agbr",
    "byproduct": "fe-no3-2",
    "enthalpy": -168,
    "netIonic": "Ag+ + X- → AgX(s)",
    "colorTo": "#FFFDD0",
    "desc": "Formation of insoluble AGBR precipitate."
  },
  {
    "id": "precip-agno3-albr3",
    "name": "Precipitation of AGBR from silver nitrate and aluminium bromide",
    "reactants": [
      "agno3",
      "albr3"
    ],
    "precipitate": "agbr",
    "byproduct": "al-no3-3",
    "enthalpy": -252.6,
    "netIonic": "Ag+ + X- → AgX(s)",
    "colorTo": "#FFFDD0",
    "desc": "Formation of insoluble AGBR precipitate."
  },
  {
    "id": "precip-agno3-nh4br",
    "name": "Precipitation of AGBR from silver nitrate and ammonium bromide",
    "reactants": [
      "agno3",
      "nh4br"
    ],
    "precipitate": "agbr",
    "byproduct": "nh4no3",
    "enthalpy": -84.1,
    "netIonic": "Ag+ + X- → AgX(s)",
    "colorTo": "#FFFDD0",
    "desc": "Formation of insoluble AGBR precipitate."
  },
  {
    "id": "precip-agno3-lii",
    "name": "Precipitation of AGI from silver nitrate and lithium iodide",
    "reactants": [
      "agno3",
      "lii"
    ],
    "precipitate": "agi",
    "byproduct": "lino3",
    "enthalpy": -112.2,
    "netIonic": "Ag+ + X- → AgX(s)",
    "colorTo": "#FFD700",
    "desc": "Formation of insoluble AGI precipitate."
  },
  {
    "id": "precip-agno3-rbi",
    "name": "Precipitation of AGI from silver nitrate and rubidium iodide",
    "reactants": [
      "agno3",
      "rbi"
    ],
    "precipitate": "agi",
    "byproduct": "rbno3",
    "enthalpy": -112.6,
    "netIonic": "Ag+ + X- → AgX(s)",
    "colorTo": "#FFD700",
    "desc": "Formation of insoluble AGI precipitate."
  },
  {
    "id": "precip-agno3-csi",
    "name": "Precipitation of AGI from silver nitrate and cesium iodide",
    "reactants": [
      "agno3",
      "csi"
    ],
    "precipitate": "agi",
    "byproduct": "csno3",
    "enthalpy": -112.7,
    "netIonic": "Ag+ + X- → AgX(s)",
    "colorTo": "#FFD700",
    "desc": "Formation of insoluble AGI precipitate."
  },
  {
    "id": "precip-agno3-cai2",
    "name": "Precipitation of AGI from silver nitrate and calcium iodide",
    "reactants": [
      "agno3",
      "cai2"
    ],
    "precipitate": "agi",
    "byproduct": "ca-no3-2",
    "enthalpy": -224.8,
    "netIonic": "Ag+ + X- → AgX(s)",
    "colorTo": "#FFD700",
    "desc": "Formation of insoluble AGI precipitate."
  },
  {
    "id": "precip-agno3-bai2",
    "name": "Precipitation of AGI from silver nitrate and barium iodide",
    "reactants": [
      "agno3",
      "bai2"
    ],
    "precipitate": "agi",
    "byproduct": "bano32",
    "enthalpy": -225,
    "netIonic": "Ag+ + X- → AgX(s)",
    "colorTo": "#FFD700",
    "desc": "Formation of insoluble AGI precipitate."
  },
  {
    "id": "precip-agno3-sri2",
    "name": "Precipitation of AGI from silver nitrate and strontium iodide",
    "reactants": [
      "agno3",
      "sri2"
    ],
    "precipitate": "agi",
    "byproduct": "sr-no3-2",
    "enthalpy": -224.6,
    "netIonic": "Ag+ + X- → AgX(s)",
    "colorTo": "#FFD700",
    "desc": "Formation of insoluble AGI precipitate."
  },
  {
    "id": "precip-agno3-mgi2",
    "name": "Precipitation of AGI from silver nitrate and magnesium iodide",
    "reactants": [
      "agno3",
      "mgi2"
    ],
    "precipitate": "agi",
    "byproduct": "mg-no3-2",
    "enthalpy": -224.2,
    "netIonic": "Ag+ + X- → AgX(s)",
    "colorTo": "#FFD700",
    "desc": "Formation of insoluble AGI precipitate."
  },
  {
    "id": "precip-agno3-zni2",
    "name": "Precipitation of AGI from silver nitrate and zinc iodide",
    "reactants": [
      "agno3",
      "zni2"
    ],
    "precipitate": "agi",
    "byproduct": "zn-no3-2",
    "enthalpy": -224.4,
    "netIonic": "Ag+ + X- → AgX(s)",
    "colorTo": "#FFD700",
    "desc": "Formation of insoluble AGI precipitate."
  },
  {
    "id": "precip-agno3-mni2",
    "name": "Precipitation of AGI from silver nitrate and manganese(II) iodide",
    "reactants": [
      "agno3",
      "mni2"
    ],
    "precipitate": "agi",
    "byproduct": "mn-no3-2",
    "enthalpy": -224.5,
    "netIonic": "Ag+ + X- → AgX(s)",
    "colorTo": "#FFD700",
    "desc": "Formation of insoluble AGI precipitate."
  },
  {
    "id": "precip-agno3-nh4i",
    "name": "Precipitation of AGI from silver nitrate and ammonium iodide",
    "reactants": [
      "agno3",
      "nh4i"
    ],
    "precipitate": "agi",
    "byproduct": "nh4no3",
    "enthalpy": -112.3,
    "netIonic": "Ag+ + X- → AgX(s)",
    "colorTo": "#FFD700",
    "desc": "Formation of insoluble AGI precipitate."
  },
  {
    "id": "precip-agno3-na2cro4",
    "name": "Precipitation of AG2CRO4 from silver nitrate and sodium chromate",
    "reactants": [
      "agno3",
      "na2cro4"
    ],
    "precipitate": "ag2cro4",
    "byproduct": "nano3",
    "enthalpy": -61.8,
    "netIonic": "2Ag+ + anion → precipitate(s)",
    "colorTo": "#B22222",
    "desc": "Precipitation of AG2CRO4."
  },
  {
    "id": "precip-agno3-nh4-2-cro4",
    "name": "Precipitation of AG2CRO4 from silver nitrate and ammonium chromate",
    "reactants": [
      "agno3",
      "nh4-2-cro4"
    ],
    "precipitate": "ag2cro4",
    "byproduct": "nh4no3",
    "enthalpy": -61.9,
    "netIonic": "2Ag+ + anion → precipitate(s)",
    "colorTo": "#B22222",
    "desc": "Precipitation of AG2CRO4."
  },
  {
    "id": "precip-agno3-k3po4",
    "name": "Precipitation of AG3PO4 from silver nitrate and potassium phosphate",
    "reactants": [
      "agno3",
      "k3po4"
    ],
    "precipitate": "ag3po4",
    "byproduct": "kno3",
    "enthalpy": -165,
    "netIonic": "2Ag+ + anion → precipitate(s)",
    "colorTo": "#FFD700",
    "desc": "Precipitation of AG3PO4."
  },
  {
    "id": "precip-agno3-na2c2o4",
    "name": "Precipitation of AG2C2O4 from silver nitrate and sodium oxalate",
    "reactants": [
      "agno3",
      "na2c2o4"
    ],
    "precipitate": "ag2c2o4",
    "byproduct": "nano3",
    "enthalpy": -58.5,
    "netIonic": "2Ag+ + anion → precipitate(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of AG2C2O4."
  },
  {
    "id": "precip-agno3-k2c2o4",
    "name": "Precipitation of AG2C2O4 from silver nitrate and potassium oxalate",
    "reactants": [
      "agno3",
      "k2c2o4"
    ],
    "precipitate": "ag2c2o4",
    "byproduct": "kno3",
    "enthalpy": -58.7,
    "netIonic": "2Ag+ + anion → precipitate(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of AG2C2O4."
  },
  {
    "id": "precip-agno3-nh4-2-c2o4",
    "name": "Precipitation of AG2C2O4 from silver nitrate and ammonium oxalate",
    "reactants": [
      "agno3",
      "nh4-2-c2o4"
    ],
    "precipitate": "ag2c2o4",
    "byproduct": "nh4no3",
    "enthalpy": -58.6,
    "netIonic": "2Ag+ + anion → precipitate(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of AG2C2O4."
  },
  {
    "id": "precip-agno3-k2co3",
    "name": "Precipitation of AG2CO3 from silver nitrate and potassium carbonate",
    "reactants": [
      "agno3",
      "k2co3"
    ],
    "precipitate": "ag2co3",
    "byproduct": "kno3",
    "enthalpy": -42,
    "netIonic": "2Ag+ + anion → precipitate(s)",
    "colorTo": "#FFF8DC",
    "desc": "Precipitation of AG2CO3."
  },
  {
    "id": "precip-agno3-na2s",
    "name": "Precipitation of AG2S from silver nitrate and sodium sulfide",
    "reactants": [
      "agno3",
      "na2s"
    ],
    "precipitate": "ag2s",
    "byproduct": "nano3",
    "enthalpy": -102.5,
    "netIonic": "2Ag+ + anion → precipitate(s)",
    "colorTo": "#1C1C1C",
    "desc": "Precipitation of AG2S."
  },
  {
    "id": "precip-pbno32-kcl",
    "name": "Precipitation of PBCL2 from lead(II) nitrate and potassium chloride",
    "reactants": [
      "pbno32",
      "kcl"
    ],
    "precipitate": "pbcl2",
    "byproduct": "kno3",
    "enthalpy": -24.5,
    "netIonic": "Pb2+ + anion → PBCL2(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of PBCL2."
  },
  {
    "id": "precip-pbno32-licl",
    "name": "Precipitation of PBCL2 from lead(II) nitrate and lithium chloride",
    "reactants": [
      "pbno32",
      "licl"
    ],
    "precipitate": "pbcl2",
    "byproduct": "lino3",
    "enthalpy": -24.2,
    "netIonic": "Pb2+ + anion → PBCL2(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of PBCL2."
  },
  {
    "id": "precip-pbno32-rbcl",
    "name": "Precipitation of PBCL2 from lead(II) nitrate and rubidium chloride",
    "reactants": [
      "pbno32",
      "rbcl"
    ],
    "precipitate": "pbcl2",
    "byproduct": "rbno3",
    "enthalpy": -24.6,
    "netIonic": "Pb2+ + anion → PBCL2(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of PBCL2."
  },
  {
    "id": "precip-pbno32-cscl",
    "name": "Precipitation of PBCL2 from lead(II) nitrate and cesium chloride",
    "reactants": [
      "pbno32",
      "cscl"
    ],
    "precipitate": "pbcl2",
    "byproduct": "csno3",
    "enthalpy": -24.7,
    "netIonic": "Pb2+ + anion → PBCL2(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of PBCL2."
  },
  {
    "id": "precip-pbno32-cacl2",
    "name": "Precipitation of PBCL2 from lead(II) nitrate and calcium chloride",
    "reactants": [
      "pbno32",
      "cacl2"
    ],
    "precipitate": "pbcl2",
    "byproduct": "ca-no3-2",
    "enthalpy": -24,
    "netIonic": "Pb2+ + anion → PBCL2(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of PBCL2."
  },
  {
    "id": "precip-pbno32-bacl2",
    "name": "Precipitation of PBCL2 from lead(II) nitrate and barium chloride",
    "reactants": [
      "pbno32",
      "bacl2"
    ],
    "precipitate": "pbcl2",
    "byproduct": "bano32",
    "enthalpy": -24.3,
    "netIonic": "Pb2+ + anion → PBCL2(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of PBCL2."
  },
  {
    "id": "precip-pbno32-srcl2",
    "name": "Precipitation of PBCL2 from lead(II) nitrate and strontium chloride",
    "reactants": [
      "pbno32",
      "srcl2"
    ],
    "precipitate": "pbcl2",
    "byproduct": "sr-no3-2",
    "enthalpy": -24.2,
    "netIonic": "Pb2+ + anion → PBCL2(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of PBCL2."
  },
  {
    "id": "precip-pbno32-mgcl2",
    "name": "Precipitation of PBCL2 from lead(II) nitrate and magnesium chloride",
    "reactants": [
      "pbno32",
      "mgcl2"
    ],
    "precipitate": "pbcl2",
    "byproduct": "mg-no3-2",
    "enthalpy": -23.8,
    "netIonic": "Pb2+ + anion → PBCL2(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of PBCL2."
  },
  {
    "id": "precip-pbno32-zncl2",
    "name": "Precipitation of PBCL2 from lead(II) nitrate and zinc chloride",
    "reactants": [
      "pbno32",
      "zncl2"
    ],
    "precipitate": "pbcl2",
    "byproduct": "zn-no3-2",
    "enthalpy": -24.1,
    "netIonic": "Pb2+ + anion → PBCL2(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of PBCL2."
  },
  {
    "id": "precip-pbno32-cucl2",
    "name": "Precipitation of PBCL2 from lead(II) nitrate and copper(II) chloride",
    "reactants": [
      "pbno32",
      "cucl2"
    ],
    "precipitate": "pbcl2",
    "byproduct": "cu-no3-2",
    "enthalpy": -23.9,
    "netIonic": "Pb2+ + anion → PBCL2(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of PBCL2."
  },
  {
    "id": "precip-pbno32-nicl2",
    "name": "Precipitation of PBCL2 from lead(II) nitrate and nickel(II) chloride",
    "reactants": [
      "pbno32",
      "nicl2"
    ],
    "precipitate": "pbcl2",
    "byproduct": "ni-no3-2",
    "enthalpy": -24,
    "netIonic": "Pb2+ + anion → PBCL2(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of PBCL2."
  },
  {
    "id": "precip-pbno32-mncl2",
    "name": "Precipitation of PBCL2 from lead(II) nitrate and manganese(II) chloride",
    "reactants": [
      "pbno32",
      "mncl2"
    ],
    "precipitate": "pbcl2",
    "byproduct": "mn-no3-2",
    "enthalpy": -24.2,
    "netIonic": "Pb2+ + anion → PBCL2(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of PBCL2."
  },
  {
    "id": "precip-pbno32-alcl3",
    "name": "Precipitation of PBCL2 from lead(II) nitrate and aluminium chloride",
    "reactants": [
      "pbno32",
      "alcl3"
    ],
    "precipitate": "pbcl2",
    "byproduct": "al-no3-3",
    "enthalpy": -36.5,
    "netIonic": "Pb2+ + anion → PBCL2(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of PBCL2."
  },
  {
    "id": "precip-pbno32-ammonium-chloride",
    "name": "Precipitation of PBCL2 from lead(II) nitrate and ammonium chloride",
    "reactants": [
      "pbno32",
      "ammonium-chloride"
    ],
    "precipitate": "pbcl2",
    "byproduct": "nh4no3",
    "enthalpy": -24.4,
    "netIonic": "Pb2+ + anion → PBCL2(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of PBCL2."
  },
  {
    "id": "precip-pbno32-nabr",
    "name": "Precipitation of PBBR2 from lead(II) nitrate and sodium bromide",
    "reactants": [
      "pbno32",
      "nabr"
    ],
    "precipitate": "pbbr2",
    "byproduct": "nano3",
    "enthalpy": -29.8,
    "netIonic": "Pb2+ + anion → PBBR2(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of PBBR2."
  },
  {
    "id": "precip-pbno32-kbr",
    "name": "Precipitation of PBBR2 from lead(II) nitrate and potassium bromide",
    "reactants": [
      "pbno32",
      "kbr"
    ],
    "precipitate": "pbbr2",
    "byproduct": "kno3",
    "enthalpy": -30,
    "netIonic": "Pb2+ + anion → PBBR2(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of PBBR2."
  },
  {
    "id": "precip-pbno32-libr",
    "name": "Precipitation of PBBR2 from lead(II) nitrate and lithium bromide",
    "reactants": [
      "pbno32",
      "libr"
    ],
    "precipitate": "pbbr2",
    "byproduct": "lino3",
    "enthalpy": -29.6,
    "netIonic": "Pb2+ + anion → PBBR2(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of PBBR2."
  },
  {
    "id": "precip-pbno32-cabr2",
    "name": "Precipitation of PBBR2 from lead(II) nitrate and calcium bromide",
    "reactants": [
      "pbno32",
      "cabr2"
    ],
    "precipitate": "pbbr2",
    "byproduct": "ca-no3-2",
    "enthalpy": -29.5,
    "netIonic": "Pb2+ + anion → PBBR2(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of PBBR2."
  },
  {
    "id": "precip-pbno32-mgbr2",
    "name": "Precipitation of PBBR2 from lead(II) nitrate and magnesium bromide",
    "reactants": [
      "pbno32",
      "mgbr2"
    ],
    "precipitate": "pbbr2",
    "byproduct": "mg-no3-2",
    "enthalpy": -29.3,
    "netIonic": "Pb2+ + anion → PBBR2(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of PBBR2."
  },
  {
    "id": "precip-pbno32-znbr2",
    "name": "Precipitation of PBBR2 from lead(II) nitrate and zinc bromide",
    "reactants": [
      "pbno32",
      "znbr2"
    ],
    "precipitate": "pbbr2",
    "byproduct": "zn-no3-2",
    "enthalpy": -29.7,
    "netIonic": "Pb2+ + anion → PBBR2(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of PBBR2."
  },
  {
    "id": "precip-pbno32-nh4br",
    "name": "Precipitation of PBBR2 from lead(II) nitrate and ammonium bromide",
    "reactants": [
      "pbno32",
      "nh4br"
    ],
    "precipitate": "pbbr2",
    "byproduct": "nh4no3",
    "enthalpy": -29.9,
    "netIonic": "Pb2+ + anion → PBBR2(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of PBBR2."
  },
  {
    "id": "precip-pbno32-lii",
    "name": "Precipitation of PBI2 from lead(II) nitrate and lithium iodide",
    "reactants": [
      "pbno32",
      "lii"
    ],
    "precipitate": "pbi2",
    "byproduct": "lino3",
    "enthalpy": -63.5,
    "netIonic": "Pb2+ + anion → PBI2(s)",
    "colorTo": "#FFD700",
    "desc": "Precipitation of PBI2."
  },
  {
    "id": "precip-pbno32-cai2",
    "name": "Precipitation of PBI2 from lead(II) nitrate and calcium iodide",
    "reactants": [
      "pbno32",
      "cai2"
    ],
    "precipitate": "pbi2",
    "byproduct": "ca-no3-2",
    "enthalpy": -63.2,
    "netIonic": "Pb2+ + anion → PBI2(s)",
    "colorTo": "#FFD700",
    "desc": "Precipitation of PBI2."
  },
  {
    "id": "precip-pbno32-mgi2",
    "name": "Precipitation of PBI2 from lead(II) nitrate and magnesium iodide",
    "reactants": [
      "pbno32",
      "mgi2"
    ],
    "precipitate": "pbi2",
    "byproduct": "mg-no3-2",
    "enthalpy": -63,
    "netIonic": "Pb2+ + anion → PBI2(s)",
    "colorTo": "#FFD700",
    "desc": "Precipitation of PBI2."
  },
  {
    "id": "precip-pbno32-zni2",
    "name": "Precipitation of PBI2 from lead(II) nitrate and zinc iodide",
    "reactants": [
      "pbno32",
      "zni2"
    ],
    "precipitate": "pbi2",
    "byproduct": "zn-no3-2",
    "enthalpy": -63.4,
    "netIonic": "Pb2+ + anion → PBI2(s)",
    "colorTo": "#FFD700",
    "desc": "Precipitation of PBI2."
  },
  {
    "id": "precip-pbno32-nh4i",
    "name": "Precipitation of PBI2 from lead(II) nitrate and ammonium iodide",
    "reactants": [
      "pbno32",
      "nh4i"
    ],
    "precipitate": "pbi2",
    "byproduct": "nh4no3",
    "enthalpy": -63.6,
    "netIonic": "Pb2+ + anion → PBI2(s)",
    "colorTo": "#FFD700",
    "desc": "Precipitation of PBI2."
  },
  {
    "id": "precip-pbno32-k2so4",
    "name": "Precipitation of PBSO4 from lead(II) nitrate and potassium sulfate",
    "reactants": [
      "pbno32",
      "k2so4"
    ],
    "precipitate": "pbso4",
    "byproduct": "kno3",
    "enthalpy": -18.5,
    "netIonic": "Pb2+ + anion → PBSO4(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of PBSO4."
  },
  {
    "id": "precip-pbno32-li2so4",
    "name": "Precipitation of PBSO4 from lead(II) nitrate and lithium sulfate",
    "reactants": [
      "pbno32",
      "li2so4"
    ],
    "precipitate": "pbso4",
    "byproduct": "lino3",
    "enthalpy": -18.2,
    "netIonic": "Pb2+ + anion → PBSO4(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of PBSO4."
  },
  {
    "id": "precip-pbno32-rb2so4",
    "name": "Precipitation of PBSO4 from lead(II) nitrate and rubidium sulfate",
    "reactants": [
      "pbno32",
      "rb2so4"
    ],
    "precipitate": "pbso4",
    "byproduct": "rbno3",
    "enthalpy": -18.6,
    "netIonic": "Pb2+ + anion → PBSO4(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of PBSO4."
  },
  {
    "id": "precip-pbno32-cs2so4",
    "name": "Precipitation of PBSO4 from lead(II) nitrate and cesium sulfate",
    "reactants": [
      "pbno32",
      "cs2so4"
    ],
    "precipitate": "pbso4",
    "byproduct": "csno3",
    "enthalpy": -18.7,
    "netIonic": "Pb2+ + anion → PBSO4(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of PBSO4."
  },
  {
    "id": "precip-pbno32-mgso4",
    "name": "Precipitation of PBSO4 from lead(II) nitrate and magnesium sulfate",
    "reactants": [
      "pbno32",
      "mgso4"
    ],
    "precipitate": "pbso4",
    "byproduct": "mg-no3-2",
    "enthalpy": -18,
    "netIonic": "Pb2+ + anion → PBSO4(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of PBSO4."
  },
  {
    "id": "precip-pbno32-znso4",
    "name": "Precipitation of PBSO4 from lead(II) nitrate and zinc sulfate",
    "reactants": [
      "pbno32",
      "znso4"
    ],
    "precipitate": "pbso4",
    "byproduct": "zn-no3-2",
    "enthalpy": -18.4,
    "netIonic": "Pb2+ + anion → PBSO4(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of PBSO4."
  },
  {
    "id": "precip-pbno32-cuso4",
    "name": "Precipitation of PBSO4 from lead(II) nitrate and copper(II) sulfate",
    "reactants": [
      "pbno32",
      "cuso4"
    ],
    "precipitate": "pbso4",
    "byproduct": "cu-no3-2",
    "enthalpy": -18.1,
    "netIonic": "Pb2+ + anion → PBSO4(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of PBSO4."
  },
  {
    "id": "precip-pbno32-feso4",
    "name": "Precipitation of PBSO4 from lead(II) nitrate and iron(II) sulfate",
    "reactants": [
      "pbno32",
      "feso4"
    ],
    "precipitate": "pbso4",
    "byproduct": "fe-no3-2",
    "enthalpy": -18.3,
    "netIonic": "Pb2+ + anion → PBSO4(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of PBSO4."
  },
  {
    "id": "precip-pbno32-niso4",
    "name": "Precipitation of PBSO4 from lead(II) nitrate and nickel(II) sulfate",
    "reactants": [
      "pbno32",
      "niso4"
    ],
    "precipitate": "pbso4",
    "byproduct": "ni-no3-2",
    "enthalpy": -18.2,
    "netIonic": "Pb2+ + anion → PBSO4(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of PBSO4."
  },
  {
    "id": "precip-pbno32-mnso4",
    "name": "Precipitation of PBSO4 from lead(II) nitrate and manganese(II) sulfate",
    "reactants": [
      "pbno32",
      "mnso4"
    ],
    "precipitate": "pbso4",
    "byproduct": "mn-no3-2",
    "enthalpy": -18.4,
    "netIonic": "Pb2+ + anion → PBSO4(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of PBSO4."
  },
  {
    "id": "precip-pbno32-al2-so4-3",
    "name": "Precipitation of PBSO4 from lead(II) nitrate and aluminium sulfate",
    "reactants": [
      "pbno32",
      "al2-so4-3"
    ],
    "precipitate": "pbso4",
    "byproduct": "al-no3-3",
    "enthalpy": -55,
    "netIonic": "Pb2+ + anion → PBSO4(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of PBSO4."
  },
  {
    "id": "precip-pbno32-nh4-2-so4",
    "name": "Precipitation of PBSO4 from lead(II) nitrate and ammonium sulfate",
    "reactants": [
      "pbno32",
      "nh4-2-so4"
    ],
    "precipitate": "pbso4",
    "byproduct": "nh4no3",
    "enthalpy": -18.5,
    "netIonic": "Pb2+ + anion → PBSO4(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of PBSO4."
  },
  {
    "id": "precip-pbno32-nh4-2-cro4",
    "name": "Precipitation of PBCRO4 from lead(II) nitrate and ammonium chromate",
    "reactants": [
      "pbno32",
      "nh4-2-cro4"
    ],
    "precipitate": "pbcro4",
    "byproduct": "nh4no3",
    "enthalpy": -53.8,
    "netIonic": "Pb2+ + anion → PBCRO4(s)",
    "colorTo": "#FFD700",
    "desc": "Precipitation of PBCRO4."
  },
  {
    "id": "precip-pbno32-na2co3",
    "name": "Precipitation of PBCO3 from lead(II) nitrate and sodium carbonate",
    "reactants": [
      "pbno32",
      "na2co3"
    ],
    "precipitate": "pbco3",
    "byproduct": "nano3",
    "enthalpy": -26,
    "netIonic": "Pb2+ + anion → PBCO3(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of PBCO3."
  },
  {
    "id": "precip-pbno32-k2co3",
    "name": "Precipitation of PBCO3 from lead(II) nitrate and potassium carbonate",
    "reactants": [
      "pbno32",
      "k2co3"
    ],
    "precipitate": "pbco3",
    "byproduct": "kno3",
    "enthalpy": -26.2,
    "netIonic": "Pb2+ + anion → PBCO3(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of PBCO3."
  },
  {
    "id": "precip-pbno32-na2c2o4",
    "name": "Precipitation of PBC2O4 from lead(II) nitrate and sodium oxalate",
    "reactants": [
      "pbno32",
      "na2c2o4"
    ],
    "precipitate": "pbc2o4",
    "byproduct": "nano3",
    "enthalpy": -38.5,
    "netIonic": "Pb2+ + anion → PBC2O4(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of PBC2O4."
  },
  {
    "id": "precip-pbno32-k2c2o4",
    "name": "Precipitation of PBC2O4 from lead(II) nitrate and potassium oxalate",
    "reactants": [
      "pbno32",
      "k2c2o4"
    ],
    "precipitate": "pbc2o4",
    "byproduct": "kno3",
    "enthalpy": -38.8,
    "netIonic": "Pb2+ + anion → PBC2O4(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of PBC2O4."
  },
  {
    "id": "precip-pbno32-nh4-2-c2o4",
    "name": "Precipitation of PBC2O4 from lead(II) nitrate and ammonium oxalate",
    "reactants": [
      "pbno32",
      "nh4-2-c2o4"
    ],
    "precipitate": "pbc2o4",
    "byproduct": "nh4no3",
    "enthalpy": -38.6,
    "netIonic": "Pb2+ + anion → PBC2O4(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of PBC2O4."
  },
  {
    "id": "precip-pbno32-na2s",
    "name": "Precipitation of PBS from lead(II) nitrate and sodium sulfide",
    "reactants": [
      "pbno32",
      "na2s"
    ],
    "precipitate": "pbs",
    "byproduct": "nano3",
    "enthalpy": -105,
    "netIonic": "Pb2+ + anion → PBS(s)",
    "colorTo": "#1C1C1C",
    "desc": "Precipitation of PBS."
  },
  {
    "id": "precip-pbno32-na3po4",
    "name": "Precipitation of PB3-PO4-2 from lead(II) nitrate and sodium phosphate",
    "reactants": [
      "pbno32",
      "na3po4"
    ],
    "precipitate": "pb3-po4-2",
    "byproduct": "nano3",
    "enthalpy": -135,
    "netIonic": "Pb2+ + anion → PB3-PO4-2(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of PB3-PO4-2."
  },
  {
    "id": "precip-pbno32-k3po4",
    "name": "Precipitation of PB3-PO4-2 from lead(II) nitrate and potassium phosphate",
    "reactants": [
      "pbno32",
      "k3po4"
    ],
    "precipitate": "pb3-po4-2",
    "byproduct": "kno3",
    "enthalpy": -135.5,
    "netIonic": "Pb2+ + anion → PB3-PO4-2(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of PB3-PO4-2."
  },
  {
    "id": "precip-bacl2-k2so4",
    "name": "Precipitation of BASO4 from bacl2 and potassium sulfate",
    "reactants": [
      "bacl2",
      "k2so4"
    ],
    "precipitate": "baso4",
    "byproduct": "kcl",
    "enthalpy": -25.5,
    "netIonic": "M2+ + anion → BASO4(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of white/yellow BASO4."
  },
  {
    "id": "precip-bacl2-rb2so4",
    "name": "Precipitation of BASO4 from bacl2 and rubidium sulfate",
    "reactants": [
      "bacl2",
      "rb2so4"
    ],
    "precipitate": "baso4",
    "byproduct": "rbcl",
    "enthalpy": -25.6,
    "netIonic": "M2+ + anion → BASO4(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of white/yellow BASO4."
  },
  {
    "id": "precip-bacl2-cs2so4",
    "name": "Precipitation of BASO4 from bacl2 and cesium sulfate",
    "reactants": [
      "bacl2",
      "cs2so4"
    ],
    "precipitate": "baso4",
    "byproduct": "cscl",
    "enthalpy": -25.7,
    "netIonic": "M2+ + anion → BASO4(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of white/yellow BASO4."
  },
  {
    "id": "precip-bacl2-mgso4",
    "name": "Precipitation of BASO4 from bacl2 and magnesium sulfate",
    "reactants": [
      "bacl2",
      "mgso4"
    ],
    "precipitate": "baso4",
    "byproduct": "mgcl2",
    "enthalpy": -24.8,
    "netIonic": "M2+ + anion → BASO4(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of white/yellow BASO4."
  },
  {
    "id": "precip-bacl2-znso4",
    "name": "Precipitation of BASO4 from bacl2 and zinc sulfate",
    "reactants": [
      "bacl2",
      "znso4"
    ],
    "precipitate": "baso4",
    "byproduct": "zncl2",
    "enthalpy": -25.2,
    "netIonic": "M2+ + anion → BASO4(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of white/yellow BASO4."
  },
  {
    "id": "precip-bacl2-feso4",
    "name": "Precipitation of BASO4 from bacl2 and iron(II) sulfate",
    "reactants": [
      "bacl2",
      "feso4"
    ],
    "precipitate": "baso4",
    "byproduct": "fecl2",
    "enthalpy": -25.1,
    "netIonic": "M2+ + anion → BASO4(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of white/yellow BASO4."
  },
  {
    "id": "precip-bacl2-niso4",
    "name": "Precipitation of BASO4 from bacl2 and nickel(II) sulfate",
    "reactants": [
      "bacl2",
      "niso4"
    ],
    "precipitate": "baso4",
    "byproduct": "nicl2",
    "enthalpy": -25,
    "netIonic": "M2+ + anion → BASO4(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of white/yellow BASO4."
  },
  {
    "id": "precip-bacl2-mnso4",
    "name": "Precipitation of BASO4 from bacl2 and manganese(II) sulfate",
    "reactants": [
      "bacl2",
      "mnso4"
    ],
    "precipitate": "baso4",
    "byproduct": "mncl2",
    "enthalpy": -25.3,
    "netIonic": "M2+ + anion → BASO4(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of white/yellow BASO4."
  },
  {
    "id": "precip-bacl2-al2-so4-3",
    "name": "Precipitation of BASO4 from bacl2 and aluminium sulfate",
    "reactants": [
      "bacl2",
      "al2-so4-3"
    ],
    "precipitate": "baso4",
    "byproduct": "alcl3",
    "enthalpy": -76,
    "netIonic": "M2+ + anion → BASO4(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of white/yellow BASO4."
  },
  {
    "id": "precip-bacl2-nh4-2-so4",
    "name": "Precipitation of BASO4 from bacl2 and ammonium sulfate",
    "reactants": [
      "bacl2",
      "nh4-2-so4"
    ],
    "precipitate": "baso4",
    "byproduct": "ammonium-chloride",
    "enthalpy": -25.4,
    "netIonic": "M2+ + anion → BASO4(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of white/yellow BASO4."
  },
  {
    "id": "precip-bano32-k2so4",
    "name": "Precipitation of BASO4 from bano32 and potassium sulfate",
    "reactants": [
      "bano32",
      "k2so4"
    ],
    "precipitate": "baso4",
    "byproduct": "kno3",
    "enthalpy": -25.6,
    "netIonic": "M2+ + anion → BASO4(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of white/yellow BASO4."
  },
  {
    "id": "precip-bano32-li2so4",
    "name": "Precipitation of BASO4 from bano32 and lithium sulfate",
    "reactants": [
      "bano32",
      "li2so4"
    ],
    "precipitate": "baso4",
    "byproduct": "lino3",
    "enthalpy": -25.3,
    "netIonic": "M2+ + anion → BASO4(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of white/yellow BASO4."
  },
  {
    "id": "precip-bano32-mgso4",
    "name": "Precipitation of BASO4 from bano32 and magnesium sulfate",
    "reactants": [
      "bano32",
      "mgso4"
    ],
    "precipitate": "baso4",
    "byproduct": "mg-no3-2",
    "enthalpy": -24.9,
    "netIonic": "M2+ + anion → BASO4(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of white/yellow BASO4."
  },
  {
    "id": "precip-bano32-znso4",
    "name": "Precipitation of BASO4 from bano32 and zinc sulfate",
    "reactants": [
      "bano32",
      "znso4"
    ],
    "precipitate": "baso4",
    "byproduct": "zn-no3-2",
    "enthalpy": -25.3,
    "netIonic": "M2+ + anion → BASO4(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of white/yellow BASO4."
  },
  {
    "id": "precip-bano32-cuso4",
    "name": "Precipitation of BASO4 from bano32 and copper(II) sulfate",
    "reactants": [
      "bano32",
      "cuso4"
    ],
    "precipitate": "baso4",
    "byproduct": "cu-no3-2",
    "enthalpy": -25.1,
    "netIonic": "M2+ + anion → BASO4(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of white/yellow BASO4."
  },
  {
    "id": "precip-bano32-feso4",
    "name": "Precipitation of BASO4 from bano32 and iron(II) sulfate",
    "reactants": [
      "bano32",
      "feso4"
    ],
    "precipitate": "baso4",
    "byproduct": "fe-no3-2",
    "enthalpy": -25.2,
    "netIonic": "M2+ + anion → BASO4(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of white/yellow BASO4."
  },
  {
    "id": "precip-bano32-niso4",
    "name": "Precipitation of BASO4 from bano32 and nickel(II) sulfate",
    "reactants": [
      "bano32",
      "niso4"
    ],
    "precipitate": "baso4",
    "byproduct": "ni-no3-2",
    "enthalpy": -25.1,
    "netIonic": "M2+ + anion → BASO4(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of white/yellow BASO4."
  },
  {
    "id": "precip-bano32-mnso4",
    "name": "Precipitation of BASO4 from bano32 and manganese(II) sulfate",
    "reactants": [
      "bano32",
      "mnso4"
    ],
    "precipitate": "baso4",
    "byproduct": "mn-no3-2",
    "enthalpy": -25.4,
    "netIonic": "M2+ + anion → BASO4(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of white/yellow BASO4."
  },
  {
    "id": "precip-bano32-al2-so4-3",
    "name": "Precipitation of BASO4 from bano32 and aluminium sulfate",
    "reactants": [
      "bano32",
      "al2-so4-3"
    ],
    "precipitate": "baso4",
    "byproduct": "al-no3-3",
    "enthalpy": -76.2,
    "netIonic": "M2+ + anion → BASO4(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of white/yellow BASO4."
  },
  {
    "id": "precip-bano32-nh4-2-so4",
    "name": "Precipitation of BASO4 from bano32 and ammonium sulfate",
    "reactants": [
      "bano32",
      "nh4-2-so4"
    ],
    "precipitate": "baso4",
    "byproduct": "nh4no3",
    "enthalpy": -25.5,
    "netIonic": "M2+ + anion → BASO4(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of white/yellow BASO4."
  },
  {
    "id": "precip-bano32-na2cro4",
    "name": "Precipitation of BACRO4 from bano32 and sodium chromate",
    "reactants": [
      "bano32",
      "na2cro4"
    ],
    "precipitate": "bacro4",
    "byproduct": "nano3",
    "enthalpy": -44.8,
    "netIonic": "M2+ + anion → BACRO4(s)",
    "colorTo": "#FFFF00",
    "desc": "Precipitation of white/yellow BACRO4."
  },
  {
    "id": "precip-bano32-nh4-2-cro4",
    "name": "Precipitation of BACRO4 from bano32 and ammonium chromate",
    "reactants": [
      "bano32",
      "nh4-2-cro4"
    ],
    "precipitate": "bacro4",
    "byproduct": "nh4no3",
    "enthalpy": -44.9,
    "netIonic": "M2+ + anion → BACRO4(s)",
    "colorTo": "#FFFF00",
    "desc": "Precipitation of white/yellow BACRO4."
  },
  {
    "id": "precip-bano32-na2co3",
    "name": "Precipitation of BACO3 from bano32 and sodium carbonate",
    "reactants": [
      "bano32",
      "na2co3"
    ],
    "precipitate": "baco3",
    "byproduct": "nano3",
    "enthalpy": -15.2,
    "netIonic": "M2+ + anion → BACO3(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of white/yellow BACO3."
  },
  {
    "id": "precip-bano32-k2co3",
    "name": "Precipitation of BACO3 from bano32 and potassium carbonate",
    "reactants": [
      "bano32",
      "k2co3"
    ],
    "precipitate": "baco3",
    "byproduct": "kno3",
    "enthalpy": -15.6,
    "netIonic": "M2+ + anion → BACO3(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of white/yellow BACO3."
  },
  {
    "id": "precip-bacl2-na2c2o4",
    "name": "Precipitation of BAC2O4 from bacl2 and sodium oxalate",
    "reactants": [
      "bacl2",
      "na2c2o4"
    ],
    "precipitate": "bac2o4",
    "byproduct": "nacl",
    "enthalpy": -22,
    "netIonic": "M2+ + anion → BAC2O4(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of white/yellow BAC2O4."
  },
  {
    "id": "precip-bacl2-k2c2o4",
    "name": "Precipitation of BAC2O4 from bacl2 and potassium oxalate",
    "reactants": [
      "bacl2",
      "k2c2o4"
    ],
    "precipitate": "bac2o4",
    "byproduct": "kcl",
    "enthalpy": -22.4,
    "netIonic": "M2+ + anion → BAC2O4(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of white/yellow BAC2O4."
  },
  {
    "id": "precip-bano32-nh4-2-c2o4",
    "name": "Precipitation of BAC2O4 from bano32 and ammonium oxalate",
    "reactants": [
      "bano32",
      "nh4-2-c2o4"
    ],
    "precipitate": "bac2o4",
    "byproduct": "nh4no3",
    "enthalpy": -22.2,
    "netIonic": "M2+ + anion → BAC2O4(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of white/yellow BAC2O4."
  },
  {
    "id": "precip-bano32-k3po4",
    "name": "Precipitation of BA3PO42 from bano32 and potassium phosphate",
    "reactants": [
      "bano32",
      "k3po4"
    ],
    "precipitate": "ba3po42",
    "byproduct": "kno3",
    "enthalpy": -88.5,
    "netIonic": "M2+ + anion → BA3PO42(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of white/yellow BA3PO42."
  },
  {
    "id": "precip-srcl2-na2so4",
    "name": "Precipitation of SRSO4 from srcl2 and sodium sulfate",
    "reactants": [
      "srcl2",
      "na2so4"
    ],
    "precipitate": "srso4",
    "byproduct": "nacl",
    "enthalpy": -19.5,
    "netIonic": "M2+ + anion → SRSO4(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of white/yellow SRSO4."
  },
  {
    "id": "precip-srcl2-k2so4",
    "name": "Precipitation of SRSO4 from srcl2 and potassium sulfate",
    "reactants": [
      "srcl2",
      "k2so4"
    ],
    "precipitate": "srso4",
    "byproduct": "kcl",
    "enthalpy": -19.8,
    "netIonic": "M2+ + anion → SRSO4(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of white/yellow SRSO4."
  },
  {
    "id": "precip-srcl2-li2so4",
    "name": "Precipitation of SRSO4 from srcl2 and lithium sulfate",
    "reactants": [
      "srcl2",
      "li2so4"
    ],
    "precipitate": "srso4",
    "byproduct": "licl",
    "enthalpy": -19.2,
    "netIonic": "M2+ + anion → SRSO4(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of white/yellow SRSO4."
  },
  {
    "id": "precip-srcl2-mgso4",
    "name": "Precipitation of SRSO4 from srcl2 and magnesium sulfate",
    "reactants": [
      "srcl2",
      "mgso4"
    ],
    "precipitate": "srso4",
    "byproduct": "mgcl2",
    "enthalpy": -18.8,
    "netIonic": "M2+ + anion → SRSO4(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of white/yellow SRSO4."
  },
  {
    "id": "precip-srcl2-znso4",
    "name": "Precipitation of SRSO4 from srcl2 and zinc sulfate",
    "reactants": [
      "srcl2",
      "znso4"
    ],
    "precipitate": "srso4",
    "byproduct": "zncl2",
    "enthalpy": -19.2,
    "netIonic": "M2+ + anion → SRSO4(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of white/yellow SRSO4."
  },
  {
    "id": "precip-srcl2-cuso4",
    "name": "Precipitation of SRSO4 from srcl2 and copper(II) sulfate",
    "reactants": [
      "srcl2",
      "cuso4"
    ],
    "precipitate": "srso4",
    "byproduct": "cucl2",
    "enthalpy": -19,
    "netIonic": "M2+ + anion → SRSO4(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of white/yellow SRSO4."
  },
  {
    "id": "precip-srcl2-feso4",
    "name": "Precipitation of SRSO4 from srcl2 and iron(II) sulfate",
    "reactants": [
      "srcl2",
      "feso4"
    ],
    "precipitate": "srso4",
    "byproduct": "fecl2",
    "enthalpy": -19.1,
    "netIonic": "M2+ + anion → SRSO4(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of white/yellow SRSO4."
  },
  {
    "id": "precip-srcl2-nh4-2-so4",
    "name": "Precipitation of SRSO4 from srcl2 and ammonium sulfate",
    "reactants": [
      "srcl2",
      "nh4-2-so4"
    ],
    "precipitate": "srso4",
    "byproduct": "ammonium-chloride",
    "enthalpy": -19.4,
    "netIonic": "M2+ + anion → SRSO4(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of white/yellow SRSO4."
  },
  {
    "id": "precip-sr-no3-2-na2so4",
    "name": "Precipitation of SRSO4 from sr-no3-2 and sodium sulfate",
    "reactants": [
      "sr-no3-2",
      "na2so4"
    ],
    "precipitate": "srso4",
    "byproduct": "nano3",
    "enthalpy": -19.5,
    "netIonic": "M2+ + anion → SRSO4(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of white/yellow SRSO4."
  },
  {
    "id": "precip-sr-no3-2-k2so4",
    "name": "Precipitation of SRSO4 from sr-no3-2 and potassium sulfate",
    "reactants": [
      "sr-no3-2",
      "k2so4"
    ],
    "precipitate": "srso4",
    "byproduct": "kno3",
    "enthalpy": -19.8,
    "netIonic": "M2+ + anion → SRSO4(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of white/yellow SRSO4."
  },
  {
    "id": "precip-sr-no3-2-mgso4",
    "name": "Precipitation of SRSO4 from sr-no3-2 and magnesium sulfate",
    "reactants": [
      "sr-no3-2",
      "mgso4"
    ],
    "precipitate": "srso4",
    "byproduct": "mg-no3-2",
    "enthalpy": -18.9,
    "netIonic": "M2+ + anion → SRSO4(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of white/yellow SRSO4."
  },
  {
    "id": "precip-sr-no3-2-znso4",
    "name": "Precipitation of SRSO4 from sr-no3-2 and zinc sulfate",
    "reactants": [
      "sr-no3-2",
      "znso4"
    ],
    "precipitate": "srso4",
    "byproduct": "zn-no3-2",
    "enthalpy": -19.3,
    "netIonic": "M2+ + anion → SRSO4(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of white/yellow SRSO4."
  },
  {
    "id": "precip-sr-no3-2-cuso4",
    "name": "Precipitation of SRSO4 from sr-no3-2 and copper(II) sulfate",
    "reactants": [
      "sr-no3-2",
      "cuso4"
    ],
    "precipitate": "srso4",
    "byproduct": "cu-no3-2",
    "enthalpy": -19.1,
    "netIonic": "M2+ + anion → SRSO4(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of white/yellow SRSO4."
  },
  {
    "id": "precip-sr-no3-2-feso4",
    "name": "Precipitation of SRSO4 from sr-no3-2 and iron(II) sulfate",
    "reactants": [
      "sr-no3-2",
      "feso4"
    ],
    "precipitate": "srso4",
    "byproduct": "fe-no3-2",
    "enthalpy": -19.2,
    "netIonic": "M2+ + anion → SRSO4(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of white/yellow SRSO4."
  },
  {
    "id": "precip-sr-no3-2-nh4-2-so4",
    "name": "Precipitation of SRSO4 from sr-no3-2 and ammonium sulfate",
    "reactants": [
      "sr-no3-2",
      "nh4-2-so4"
    ],
    "precipitate": "srso4",
    "byproduct": "nh4no3",
    "enthalpy": -19.6,
    "netIonic": "M2+ + anion → SRSO4(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of white/yellow SRSO4."
  },
  {
    "id": "precip-srcl2-na2co3",
    "name": "Precipitation of SRCO3 from srcl2 and sodium carbonate",
    "reactants": [
      "srcl2",
      "na2co3"
    ],
    "precipitate": "srco3",
    "byproduct": "nacl",
    "enthalpy": -20.5,
    "netIonic": "M2+ + anion → SRCO3(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of white/yellow SRCO3."
  },
  {
    "id": "precip-srcl2-k2co3",
    "name": "Precipitation of SRCO3 from srcl2 and potassium carbonate",
    "reactants": [
      "srcl2",
      "k2co3"
    ],
    "precipitate": "srco3",
    "byproduct": "kcl",
    "enthalpy": -20.8,
    "netIonic": "M2+ + anion → SRCO3(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of white/yellow SRCO3."
  },
  {
    "id": "precip-sr-no3-2-na2co3",
    "name": "Precipitation of SRCO3 from sr-no3-2 and sodium carbonate",
    "reactants": [
      "sr-no3-2",
      "na2co3"
    ],
    "precipitate": "srco3",
    "byproduct": "nano3",
    "enthalpy": -20.6,
    "netIonic": "M2+ + anion → SRCO3(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of white/yellow SRCO3."
  },
  {
    "id": "precip-sr-no3-2-k2co3",
    "name": "Precipitation of SRCO3 from sr-no3-2 and potassium carbonate",
    "reactants": [
      "sr-no3-2",
      "k2co3"
    ],
    "precipitate": "srco3",
    "byproduct": "kno3",
    "enthalpy": -20.9,
    "netIonic": "M2+ + anion → SRCO3(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of white/yellow SRCO3."
  },
  {
    "id": "precip-srcl2-na2cro4",
    "name": "Precipitation of SRCRO4 from srcl2 and sodium chromate",
    "reactants": [
      "srcl2",
      "na2cro4"
    ],
    "precipitate": "srcro4",
    "byproduct": "nacl",
    "enthalpy": -38,
    "netIonic": "M2+ + anion → SRCRO4(s)",
    "colorTo": "#FFFF00",
    "desc": "Precipitation of white/yellow SRCRO4."
  },
  {
    "id": "precip-sr-no3-2-k2cro4",
    "name": "Precipitation of SRCRO4 from sr-no3-2 and potassium chromate",
    "reactants": [
      "sr-no3-2",
      "k2cro4"
    ],
    "precipitate": "srcro4",
    "byproduct": "kno3",
    "enthalpy": -38.4,
    "netIonic": "M2+ + anion → SRCRO4(s)",
    "colorTo": "#FFFF00",
    "desc": "Precipitation of white/yellow SRCRO4."
  },
  {
    "id": "precip-ca-no3-2-na2co3",
    "name": "Precipitation of CACO3 from ca-no3-2 and sodium carbonate",
    "reactants": [
      "ca-no3-2",
      "na2co3"
    ],
    "precipitate": "caco3",
    "byproduct": "nano3",
    "enthalpy": -12.4,
    "netIonic": "M2+ + anion → CACO3(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of insoluble CACO3."
  },
  {
    "id": "precip-ca-no3-2-k2co3",
    "name": "Precipitation of CACO3 from ca-no3-2 and potassium carbonate",
    "reactants": [
      "ca-no3-2",
      "k2co3"
    ],
    "precipitate": "caco3",
    "byproduct": "kno3",
    "enthalpy": -12.6,
    "netIonic": "M2+ + anion → CACO3(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of insoluble CACO3."
  },
  {
    "id": "precip-cacl2-na2c2o4",
    "name": "Precipitation of CAC2O4 from cacl2 and sodium oxalate",
    "reactants": [
      "cacl2",
      "na2c2o4"
    ],
    "precipitate": "cac2o4",
    "byproduct": "nacl",
    "enthalpy": -28,
    "netIonic": "M2+ + anion → CAC2O4(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of insoluble CAC2O4."
  },
  {
    "id": "precip-cacl2-k2c2o4",
    "name": "Precipitation of CAC2O4 from cacl2 and potassium oxalate",
    "reactants": [
      "cacl2",
      "k2c2o4"
    ],
    "precipitate": "cac2o4",
    "byproduct": "kcl",
    "enthalpy": -28.4,
    "netIonic": "M2+ + anion → CAC2O4(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of insoluble CAC2O4."
  },
  {
    "id": "precip-cacl2-nh4-2-c2o4",
    "name": "Precipitation of CAC2O4 from cacl2 and ammonium oxalate",
    "reactants": [
      "cacl2",
      "nh4-2-c2o4"
    ],
    "precipitate": "cac2o4",
    "byproduct": "ammonium-chloride",
    "enthalpy": -28.2,
    "netIonic": "M2+ + anion → CAC2O4(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of insoluble CAC2O4."
  },
  {
    "id": "precip-ca-no3-2-na2c2o4",
    "name": "Precipitation of CAC2O4 from ca-no3-2 and sodium oxalate",
    "reactants": [
      "ca-no3-2",
      "na2c2o4"
    ],
    "precipitate": "cac2o4",
    "byproduct": "nano3",
    "enthalpy": -28.1,
    "netIonic": "M2+ + anion → CAC2O4(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of insoluble CAC2O4."
  },
  {
    "id": "precip-ca-no3-2-k2c2o4",
    "name": "Precipitation of CAC2O4 from ca-no3-2 and potassium oxalate",
    "reactants": [
      "ca-no3-2",
      "k2c2o4"
    ],
    "precipitate": "cac2o4",
    "byproduct": "kno3",
    "enthalpy": -28.5,
    "netIonic": "M2+ + anion → CAC2O4(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of insoluble CAC2O4."
  },
  {
    "id": "precip-cacl2-k3po4",
    "name": "Precipitation of CA3PO42 from cacl2 and potassium phosphate",
    "reactants": [
      "cacl2",
      "k3po4"
    ],
    "precipitate": "ca3po42",
    "byproduct": "kcl",
    "enthalpy": -95,
    "netIonic": "M2+ + anion → CA3PO42(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of insoluble CA3PO42."
  },
  {
    "id": "precip-ca-no3-2-na3po4",
    "name": "Precipitation of CA3PO42 from ca-no3-2 and sodium phosphate",
    "reactants": [
      "ca-no3-2",
      "na3po4"
    ],
    "precipitate": "ca3po42",
    "byproduct": "nano3",
    "enthalpy": -94.5,
    "netIonic": "M2+ + anion → CA3PO42(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of insoluble CA3PO42."
  },
  {
    "id": "precip-ca-no3-2-k3po4",
    "name": "Precipitation of CA3PO42 from ca-no3-2 and potassium phosphate",
    "reactants": [
      "ca-no3-2",
      "k3po4"
    ],
    "precipitate": "ca3po42",
    "byproduct": "kno3",
    "enthalpy": -95.2,
    "netIonic": "M2+ + anion → CA3PO42(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of insoluble CA3PO42."
  },
  {
    "id": "precip-cacl2-naf",
    "name": "Precipitation of CAF2 from cacl2 and sodium fluoride",
    "reactants": [
      "cacl2",
      "naf"
    ],
    "precipitate": "caf2",
    "byproduct": "nacl",
    "enthalpy": -32,
    "netIonic": "M2+ + anion → CAF2(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of insoluble CAF2."
  },
  {
    "id": "precip-cacl2-kf",
    "name": "Precipitation of CAF2 from cacl2 and potassium fluoride",
    "reactants": [
      "cacl2",
      "kf"
    ],
    "precipitate": "caf2",
    "byproduct": "kcl",
    "enthalpy": -32.4,
    "netIonic": "M2+ + anion → CAF2(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of insoluble CAF2."
  },
  {
    "id": "precip-ca-no3-2-naf",
    "name": "Precipitation of CAF2 from ca-no3-2 and sodium fluoride",
    "reactants": [
      "ca-no3-2",
      "naf"
    ],
    "precipitate": "caf2",
    "byproduct": "nano3",
    "enthalpy": -32.1,
    "netIonic": "M2+ + anion → CAF2(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of insoluble CAF2."
  },
  {
    "id": "precip-ca-no3-2-kf",
    "name": "Precipitation of CAF2 from ca-no3-2 and potassium fluoride",
    "reactants": [
      "ca-no3-2",
      "kf"
    ],
    "precipitate": "caf2",
    "byproduct": "kno3",
    "enthalpy": -32.5,
    "netIonic": "M2+ + anion → CAF2(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of insoluble CAF2."
  },
  {
    "id": "precip-mgcl2-na2co3",
    "name": "Precipitation of MGCO3 from mgcl2 and sodium carbonate",
    "reactants": [
      "mgcl2",
      "na2co3"
    ],
    "precipitate": "mgco3",
    "byproduct": "nacl",
    "enthalpy": -10.5,
    "netIonic": "M2+ + anion → MGCO3(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of insoluble MGCO3."
  },
  {
    "id": "precip-mgcl2-k2co3",
    "name": "Precipitation of MGCO3 from mgcl2 and potassium carbonate",
    "reactants": [
      "mgcl2",
      "k2co3"
    ],
    "precipitate": "mgco3",
    "byproduct": "kcl",
    "enthalpy": -10.8,
    "netIonic": "M2+ + anion → MGCO3(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of insoluble MGCO3."
  },
  {
    "id": "precip-mg-no3-2-na2co3",
    "name": "Precipitation of MGCO3 from mg-no3-2 and sodium carbonate",
    "reactants": [
      "mg-no3-2",
      "na2co3"
    ],
    "precipitate": "mgco3",
    "byproduct": "nano3",
    "enthalpy": -10.6,
    "netIonic": "M2+ + anion → MGCO3(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of insoluble MGCO3."
  },
  {
    "id": "precip-mg-no3-2-k2co3",
    "name": "Precipitation of MGCO3 from mg-no3-2 and potassium carbonate",
    "reactants": [
      "mg-no3-2",
      "k2co3"
    ],
    "precipitate": "mgco3",
    "byproduct": "kno3",
    "enthalpy": -10.9,
    "netIonic": "M2+ + anion → MGCO3(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of insoluble MGCO3."
  },
  {
    "id": "precip-mgso4-k2co3",
    "name": "Precipitation of MGCO3 from mgso4 and potassium carbonate",
    "reactants": [
      "mgso4",
      "k2co3"
    ],
    "precipitate": "mgco3",
    "byproduct": "k2so4",
    "enthalpy": -10.7,
    "netIonic": "M2+ + anion → MGCO3(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of insoluble MGCO3."
  },
  {
    "id": "precip-mgcl2-na3po4",
    "name": "Precipitation of MG3-PO4-2 from mgcl2 and sodium phosphate",
    "reactants": [
      "mgcl2",
      "na3po4"
    ],
    "precipitate": "mg3-po4-2",
    "byproduct": "nacl",
    "enthalpy": -82,
    "netIonic": "M2+ + anion → MG3-PO4-2(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of insoluble MG3-PO4-2."
  },
  {
    "id": "precip-mg-no3-2-k3po4",
    "name": "Precipitation of MG3-PO4-2 from mg-no3-2 and potassium phosphate",
    "reactants": [
      "mg-no3-2",
      "k3po4"
    ],
    "precipitate": "mg3-po4-2",
    "byproduct": "kno3",
    "enthalpy": -82.5,
    "netIonic": "M2+ + anion → MG3-PO4-2(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of insoluble MG3-PO4-2."
  },
  {
    "id": "precip-mgso4-na3po4",
    "name": "Precipitation of MG3-PO4-2 from mgso4 and sodium phosphate",
    "reactants": [
      "mgso4",
      "na3po4"
    ],
    "precipitate": "mg3-po4-2",
    "byproduct": "na2so4",
    "enthalpy": -82.2,
    "netIonic": "M2+ + anion → MG3-PO4-2(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of insoluble MG3-PO4-2."
  },
  {
    "id": "precip-mgso4-k3po4",
    "name": "Precipitation of MG3-PO4-2 from mgso4 and potassium phosphate",
    "reactants": [
      "mgso4",
      "k3po4"
    ],
    "precipitate": "mg3-po4-2",
    "byproduct": "k2so4",
    "enthalpy": -82.6,
    "netIonic": "M2+ + anion → MG3-PO4-2(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of insoluble MG3-PO4-2."
  },
  {
    "id": "precip-cucl2-koh",
    "name": "Precipitation of CUOH2 from cucl2 and potassium hydroxide",
    "reactants": [
      "cucl2",
      "koh"
    ],
    "precipitate": "cuoh2",
    "byproduct": "kcl",
    "enthalpy": -48,
    "netIonic": "M(n+) + OH-/S(2-) → CUOH2(s)",
    "colorTo": "#00BFFF",
    "desc": "Precipitation of CUOH2."
  },
  {
    "id": "precip-cucl2-lioh",
    "name": "Precipitation of CUOH2 from cucl2 and lithium hydroxide",
    "reactants": [
      "cucl2",
      "lioh"
    ],
    "precipitate": "cuoh2",
    "byproduct": "licl",
    "enthalpy": -47.5,
    "netIonic": "M(n+) + OH-/S(2-) → CUOH2(s)",
    "colorTo": "#00BFFF",
    "desc": "Precipitation of CUOH2."
  },
  {
    "id": "precip-cu-no3-2-koh",
    "name": "Precipitation of CUOH2 from cu-no3-2 and potassium hydroxide",
    "reactants": [
      "cu-no3-2",
      "koh"
    ],
    "precipitate": "cuoh2",
    "byproduct": "kno3",
    "enthalpy": -48.2,
    "netIonic": "M(n+) + OH-/S(2-) → CUOH2(s)",
    "colorTo": "#00BFFF",
    "desc": "Precipitation of CUOH2."
  },
  {
    "id": "precip-cu-no3-2-lioh",
    "name": "Precipitation of CUOH2 from cu-no3-2 and lithium hydroxide",
    "reactants": [
      "cu-no3-2",
      "lioh"
    ],
    "precipitate": "cuoh2",
    "byproduct": "lino3",
    "enthalpy": -47.8,
    "netIonic": "M(n+) + OH-/S(2-) → CUOH2(s)",
    "colorTo": "#00BFFF",
    "desc": "Precipitation of CUOH2."
  },
  {
    "id": "precip-cuso4-koh",
    "name": "Precipitation of CUOH2 from cuso4 and potassium hydroxide",
    "reactants": [
      "cuso4",
      "koh"
    ],
    "precipitate": "cuoh2",
    "byproduct": "k2so4",
    "enthalpy": -48.5,
    "netIonic": "M(n+) + OH-/S(2-) → CUOH2(s)",
    "colorTo": "#00BFFF",
    "desc": "Precipitation of CUOH2."
  },
  {
    "id": "precip-cuso4-lioh",
    "name": "Precipitation of CUOH2 from cuso4 and lithium hydroxide",
    "reactants": [
      "cuso4",
      "lioh"
    ],
    "precipitate": "cuoh2",
    "byproduct": "li2so4",
    "enthalpy": -48,
    "netIonic": "M(n+) + OH-/S(2-) → CUOH2(s)",
    "colorTo": "#00BFFF",
    "desc": "Precipitation of CUOH2."
  },
  {
    "id": "precip-cucl2-na2s",
    "name": "Precipitation of CUS from cucl2 and sodium sulfide",
    "reactants": [
      "cucl2",
      "na2s"
    ],
    "precipitate": "cus",
    "byproduct": "nacl",
    "enthalpy": -118,
    "netIonic": "M(n+) + OH-/S(2-) → CUS(s)",
    "colorTo": "#1C1C1C",
    "desc": "Precipitation of CUS."
  },
  {
    "id": "precip-cu-no3-2-na2s",
    "name": "Precipitation of CUS from cu-no3-2 and sodium sulfide",
    "reactants": [
      "cu-no3-2",
      "na2s"
    ],
    "precipitate": "cus",
    "byproduct": "nano3",
    "enthalpy": -118.2,
    "netIonic": "M(n+) + OH-/S(2-) → CUS(s)",
    "colorTo": "#1C1C1C",
    "desc": "Precipitation of CUS."
  },
  {
    "id": "precip-cu-no3-2-k2s",
    "name": "Precipitation of CUS from cu-no3-2 and potassium sulfide",
    "reactants": [
      "cu-no3-2",
      "k2s"
    ],
    "precipitate": "cus",
    "byproduct": "kno3",
    "enthalpy": -118.5,
    "netIonic": "M(n+) + OH-/S(2-) → CUS(s)",
    "colorTo": "#1C1C1C",
    "desc": "Precipitation of CUS."
  },
  {
    "id": "precip-cuso4-k2s",
    "name": "Precipitation of CUS from cuso4 and potassium sulfide",
    "reactants": [
      "cuso4",
      "k2s"
    ],
    "precipitate": "cus",
    "byproduct": "k2so4",
    "enthalpy": -118.8,
    "netIonic": "M(n+) + OH-/S(2-) → CUS(s)",
    "colorTo": "#1C1C1C",
    "desc": "Precipitation of CUS."
  },
  {
    "id": "precip-fecl2-koh",
    "name": "Precipitation of FEOH2 from fecl2 and potassium hydroxide",
    "reactants": [
      "fecl2",
      "koh"
    ],
    "precipitate": "feoh2",
    "byproduct": "kcl",
    "enthalpy": -42,
    "netIonic": "M(n+) + OH-/S(2-) → FEOH2(s)",
    "colorTo": "#2E8B57",
    "desc": "Precipitation of FEOH2."
  },
  {
    "id": "precip-fecl2-lioh",
    "name": "Precipitation of FEOH2 from fecl2 and lithium hydroxide",
    "reactants": [
      "fecl2",
      "lioh"
    ],
    "precipitate": "feoh2",
    "byproduct": "licl",
    "enthalpy": -41.6,
    "netIonic": "M(n+) + OH-/S(2-) → FEOH2(s)",
    "colorTo": "#2E8B57",
    "desc": "Precipitation of FEOH2."
  },
  {
    "id": "precip-feso4-koh",
    "name": "Precipitation of FEOH2 from feso4 and potassium hydroxide",
    "reactants": [
      "feso4",
      "koh"
    ],
    "precipitate": "feoh2",
    "byproduct": "k2so4",
    "enthalpy": -42.5,
    "netIonic": "M(n+) + OH-/S(2-) → FEOH2(s)",
    "colorTo": "#2E8B57",
    "desc": "Precipitation of FEOH2."
  },
  {
    "id": "precip-fe-no3-2-naoh",
    "name": "Precipitation of FEOH2 from fe-no3-2 and sodium hydroxide",
    "reactants": [
      "fe-no3-2",
      "naoh"
    ],
    "precipitate": "feoh2",
    "byproduct": "nano3",
    "enthalpy": -42.2,
    "netIonic": "M(n+) + OH-/S(2-) → FEOH2(s)",
    "colorTo": "#2E8B57",
    "desc": "Precipitation of FEOH2."
  },
  {
    "id": "precip-fe-no3-2-koh",
    "name": "Precipitation of FEOH2 from fe-no3-2 and potassium hydroxide",
    "reactants": [
      "fe-no3-2",
      "koh"
    ],
    "precipitate": "feoh2",
    "byproduct": "kno3",
    "enthalpy": -42.4,
    "netIonic": "M(n+) + OH-/S(2-) → FEOH2(s)",
    "colorTo": "#2E8B57",
    "desc": "Precipitation of FEOH2."
  },
  {
    "id": "precip-fe-no3-2-na2s",
    "name": "Precipitation of FES from fe-no3-2 and sodium sulfide",
    "reactants": [
      "fe-no3-2",
      "na2s"
    ],
    "precipitate": "fes",
    "byproduct": "nano3",
    "enthalpy": -98.3,
    "netIonic": "M(n+) + OH-/S(2-) → FES(s)",
    "colorTo": "#1C1C1C",
    "desc": "Precipitation of FES."
  },
  {
    "id": "precip-fecl3-koh",
    "name": "Precipitation of FEOH3 from fecl3 and potassium hydroxide",
    "reactants": [
      "fecl3",
      "koh"
    ],
    "precipitate": "feoh3",
    "byproduct": "kcl",
    "enthalpy": -85,
    "netIonic": "M(n+) + OH-/S(2-) → FEOH3(s)",
    "colorTo": "#8B4513",
    "desc": "Precipitation of FEOH3."
  },
  {
    "id": "precip-fecl3-lioh",
    "name": "Precipitation of FEOH3 from fecl3 and lithium hydroxide",
    "reactants": [
      "fecl3",
      "lioh"
    ],
    "precipitate": "feoh3",
    "byproduct": "licl",
    "enthalpy": -84.2,
    "netIonic": "M(n+) + OH-/S(2-) → FEOH3(s)",
    "colorTo": "#8B4513",
    "desc": "Precipitation of FEOH3."
  },
  {
    "id": "precip-fe-no3-3-naoh",
    "name": "Precipitation of FEOH3 from fe-no3-3 and sodium hydroxide",
    "reactants": [
      "fe-no3-3",
      "naoh"
    ],
    "precipitate": "feoh3",
    "byproduct": "nano3",
    "enthalpy": -85.2,
    "netIonic": "M(n+) + OH-/S(2-) → FEOH3(s)",
    "colorTo": "#8B4513",
    "desc": "Precipitation of FEOH3."
  },
  {
    "id": "precip-fe-no3-3-koh",
    "name": "Precipitation of FEOH3 from fe-no3-3 and potassium hydroxide",
    "reactants": [
      "fe-no3-3",
      "koh"
    ],
    "precipitate": "feoh3",
    "byproduct": "kno3",
    "enthalpy": -85.5,
    "netIonic": "M(n+) + OH-/S(2-) → FEOH3(s)",
    "colorTo": "#8B4513",
    "desc": "Precipitation of FEOH3."
  },
  {
    "id": "precip-fe2-so4-3-koh",
    "name": "Precipitation of FEOH3 from fe2-so4-3 and potassium hydroxide",
    "reactants": [
      "fe2-so4-3",
      "koh"
    ],
    "precipitate": "feoh3",
    "byproduct": "k2so4",
    "enthalpy": -171,
    "netIonic": "M(n+) + OH-/S(2-) → FEOH3(s)",
    "colorTo": "#8B4513",
    "desc": "Precipitation of FEOH3."
  },
  {
    "id": "precip-zncl2-koh",
    "name": "Precipitation of ZNOH2 from zncl2 and potassium hydroxide",
    "reactants": [
      "zncl2",
      "koh"
    ],
    "precipitate": "znoh2",
    "byproduct": "kcl",
    "enthalpy": -44,
    "netIonic": "M(n+) + OH-/S(2-) → ZNOH2(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of ZNOH2."
  },
  {
    "id": "precip-zn-no3-2-koh",
    "name": "Precipitation of ZNOH2 from zn-no3-2 and potassium hydroxide",
    "reactants": [
      "zn-no3-2",
      "koh"
    ],
    "precipitate": "znoh2",
    "byproduct": "kno3",
    "enthalpy": -44.2,
    "netIonic": "M(n+) + OH-/S(2-) → ZNOH2(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of ZNOH2."
  },
  {
    "id": "precip-znso4-koh",
    "name": "Precipitation of ZNOH2 from znso4 and potassium hydroxide",
    "reactants": [
      "znso4",
      "koh"
    ],
    "precipitate": "znoh2",
    "byproduct": "k2so4",
    "enthalpy": -44.5,
    "netIonic": "M(n+) + OH-/S(2-) → ZNOH2(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of ZNOH2."
  },
  {
    "id": "precip-zn-no3-2-na2s",
    "name": "Precipitation of ZNS from zn-no3-2 and sodium sulfide",
    "reactants": [
      "zn-no3-2",
      "na2s"
    ],
    "precipitate": "zns",
    "byproduct": "nano3",
    "enthalpy": -104,
    "netIonic": "M(n+) + OH-/S(2-) → ZNS(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of ZNS."
  },
  {
    "id": "precip-alcl3-koh",
    "name": "Precipitation of AL-OH-3 from alcl3 and potassium hydroxide",
    "reactants": [
      "alcl3",
      "koh"
    ],
    "precipitate": "al-oh-3",
    "byproduct": "kcl",
    "enthalpy": -88,
    "netIonic": "M(n+) + OH-/S(2-) → AL-OH-3(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of AL-OH-3."
  },
  {
    "id": "precip-al-no3-3-naoh",
    "name": "Precipitation of AL-OH-3 from al-no3-3 and sodium hydroxide",
    "reactants": [
      "al-no3-3",
      "naoh"
    ],
    "precipitate": "al-oh-3",
    "byproduct": "nano3",
    "enthalpy": -88.2,
    "netIonic": "M(n+) + OH-/S(2-) → AL-OH-3(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of AL-OH-3."
  },
  {
    "id": "precip-al-no3-3-koh",
    "name": "Precipitation of AL-OH-3 from al-no3-3 and potassium hydroxide",
    "reactants": [
      "al-no3-3",
      "koh"
    ],
    "precipitate": "al-oh-3",
    "byproduct": "kno3",
    "enthalpy": -88.5,
    "netIonic": "M(n+) + OH-/S(2-) → AL-OH-3(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of AL-OH-3."
  },
  {
    "id": "precip-al2-so4-3-koh",
    "name": "Precipitation of AL-OH-3 from al2-so4-3 and potassium hydroxide",
    "reactants": [
      "al2-so4-3",
      "koh"
    ],
    "precipitate": "al-oh-3",
    "byproduct": "k2so4",
    "enthalpy": -177,
    "netIonic": "M(n+) + OH-/S(2-) → AL-OH-3(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of AL-OH-3."
  },
  {
    "id": "precip-nicl2-koh",
    "name": "Precipitation of NIOH2 from nicl2 and potassium hydroxide",
    "reactants": [
      "nicl2",
      "koh"
    ],
    "precipitate": "nioh2",
    "byproduct": "kcl",
    "enthalpy": -43,
    "netIonic": "M(n+) + OH-/S(2-) → NIOH2(s)",
    "colorTo": "#98FB98",
    "desc": "Precipitation of NIOH2."
  },
  {
    "id": "precip-ni-no3-2-naoh",
    "name": "Precipitation of NIOH2 from ni-no3-2 and sodium hydroxide",
    "reactants": [
      "ni-no3-2",
      "naoh"
    ],
    "precipitate": "nioh2",
    "byproduct": "nano3",
    "enthalpy": -43.2,
    "netIonic": "M(n+) + OH-/S(2-) → NIOH2(s)",
    "colorTo": "#98FB98",
    "desc": "Precipitation of NIOH2."
  },
  {
    "id": "precip-ni-no3-2-koh",
    "name": "Precipitation of NIOH2 from ni-no3-2 and potassium hydroxide",
    "reactants": [
      "ni-no3-2",
      "koh"
    ],
    "precipitate": "nioh2",
    "byproduct": "kno3",
    "enthalpy": -43.4,
    "netIonic": "M(n+) + OH-/S(2-) → NIOH2(s)",
    "colorTo": "#98FB98",
    "desc": "Precipitation of NIOH2."
  },
  {
    "id": "precip-niso4-koh",
    "name": "Precipitation of NIOH2 from niso4 and potassium hydroxide",
    "reactants": [
      "niso4",
      "koh"
    ],
    "precipitate": "nioh2",
    "byproduct": "k2so4",
    "enthalpy": -43.6,
    "netIonic": "M(n+) + OH-/S(2-) → NIOH2(s)",
    "colorTo": "#98FB98",
    "desc": "Precipitation of NIOH2."
  },
  {
    "id": "precip-nicl2-na2s",
    "name": "Precipitation of NIS from nicl2 and sodium sulfide",
    "reactants": [
      "nicl2",
      "na2s"
    ],
    "precipitate": "nis",
    "byproduct": "nacl",
    "enthalpy": -101,
    "netIonic": "M(n+) + OH-/S(2-) → NIS(s)",
    "colorTo": "#1C1C1C",
    "desc": "Precipitation of NIS."
  },
  {
    "id": "precip-ni-no3-2-na2s",
    "name": "Precipitation of NIS from ni-no3-2 and sodium sulfide",
    "reactants": [
      "ni-no3-2",
      "na2s"
    ],
    "precipitate": "nis",
    "byproduct": "nano3",
    "enthalpy": -101.3,
    "netIonic": "M(n+) + OH-/S(2-) → NIS(s)",
    "colorTo": "#1C1C1C",
    "desc": "Precipitation of NIS."
  },
  {
    "id": "precip-cocl2-koh",
    "name": "Precipitation of COOH2 from cocl2 and potassium hydroxide",
    "reactants": [
      "cocl2",
      "koh"
    ],
    "precipitate": "cooh2",
    "byproduct": "kcl",
    "enthalpy": -42.5,
    "netIonic": "M(n+) + OH-/S(2-) → COOH2(s)",
    "colorTo": "#FF69B4",
    "desc": "Precipitation of COOH2."
  },
  {
    "id": "precip-co-no3-2-naoh",
    "name": "Precipitation of COOH2 from co-no3-2 and sodium hydroxide",
    "reactants": [
      "co-no3-2",
      "naoh"
    ],
    "precipitate": "cooh2",
    "byproduct": "nano3",
    "enthalpy": -42.7,
    "netIonic": "M(n+) + OH-/S(2-) → COOH2(s)",
    "colorTo": "#FF69B4",
    "desc": "Precipitation of COOH2."
  },
  {
    "id": "precip-co-no3-2-koh",
    "name": "Precipitation of COOH2 from co-no3-2 and potassium hydroxide",
    "reactants": [
      "co-no3-2",
      "koh"
    ],
    "precipitate": "cooh2",
    "byproduct": "kno3",
    "enthalpy": -42.9,
    "netIonic": "M(n+) + OH-/S(2-) → COOH2(s)",
    "colorTo": "#FF69B4",
    "desc": "Precipitation of COOH2."
  },
  {
    "id": "precip-coso4-koh",
    "name": "Precipitation of COOH2 from coso4 and potassium hydroxide",
    "reactants": [
      "coso4",
      "koh"
    ],
    "precipitate": "cooh2",
    "byproduct": "k2so4",
    "enthalpy": -43.1,
    "netIonic": "M(n+) + OH-/S(2-) → COOH2(s)",
    "colorTo": "#FF69B4",
    "desc": "Precipitation of COOH2."
  },
  {
    "id": "precip-cocl2-na2s",
    "name": "Precipitation of COS from cocl2 and sodium sulfide",
    "reactants": [
      "cocl2",
      "na2s"
    ],
    "precipitate": "cos",
    "byproduct": "nacl",
    "enthalpy": -99,
    "netIonic": "M(n+) + OH-/S(2-) → COS(s)",
    "colorTo": "#1C1C1C",
    "desc": "Precipitation of COS."
  },
  {
    "id": "precip-co-no3-2-na2s",
    "name": "Precipitation of COS from co-no3-2 and sodium sulfide",
    "reactants": [
      "co-no3-2",
      "na2s"
    ],
    "precipitate": "cos",
    "byproduct": "nano3",
    "enthalpy": -99.4,
    "netIonic": "M(n+) + OH-/S(2-) → COS(s)",
    "colorTo": "#1C1C1C",
    "desc": "Precipitation of COS."
  },
  {
    "id": "precip-mncl2-koh",
    "name": "Precipitation of MNOH2 from mncl2 and potassium hydroxide",
    "reactants": [
      "mncl2",
      "koh"
    ],
    "precipitate": "mnoh2",
    "byproduct": "kcl",
    "enthalpy": -41,
    "netIonic": "M(n+) + OH-/S(2-) → MNOH2(s)",
    "colorTo": "#FFB6C1",
    "desc": "Precipitation of MNOH2."
  },
  {
    "id": "precip-mn-no3-2-naoh",
    "name": "Precipitation of MNOH2 from mn-no3-2 and sodium hydroxide",
    "reactants": [
      "mn-no3-2",
      "naoh"
    ],
    "precipitate": "mnoh2",
    "byproduct": "nano3",
    "enthalpy": -41.2,
    "netIonic": "M(n+) + OH-/S(2-) → MNOH2(s)",
    "colorTo": "#FFB6C1",
    "desc": "Precipitation of MNOH2."
  },
  {
    "id": "precip-mn-no3-2-koh",
    "name": "Precipitation of MNOH2 from mn-no3-2 and potassium hydroxide",
    "reactants": [
      "mn-no3-2",
      "koh"
    ],
    "precipitate": "mnoh2",
    "byproduct": "kno3",
    "enthalpy": -41.5,
    "netIonic": "M(n+) + OH-/S(2-) → MNOH2(s)",
    "colorTo": "#FFB6C1",
    "desc": "Precipitation of MNOH2."
  },
  {
    "id": "precip-mnso4-koh",
    "name": "Precipitation of MNOH2 from mnso4 and potassium hydroxide",
    "reactants": [
      "mnso4",
      "koh"
    ],
    "precipitate": "mnoh2",
    "byproduct": "k2so4",
    "enthalpy": -41.8,
    "netIonic": "M(n+) + OH-/S(2-) → MNOH2(s)",
    "colorTo": "#FFB6C1",
    "desc": "Precipitation of MNOH2."
  },
  {
    "id": "precip-mn-no3-2-na2s",
    "name": "Precipitation of MNS from mn-no3-2 and sodium sulfide",
    "reactants": [
      "mn-no3-2",
      "na2s"
    ],
    "precipitate": "mns",
    "byproduct": "nano3",
    "enthalpy": -92,
    "netIonic": "M(n+) + OH-/S(2-) → MNS(s)",
    "colorTo": "#FFB6C1",
    "desc": "Precipitation of MNS."
  },
  {
    "id": "precip-cdcl2-naoh",
    "name": "Precipitation of CD-OH-2 from cdcl2 and sodium hydroxide",
    "reactants": [
      "cdcl2",
      "naoh"
    ],
    "precipitate": "cd-oh-2",
    "byproduct": "nacl",
    "enthalpy": -45,
    "netIonic": "M(n+) + OH-/S(2-) → CD-OH-2(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of CD-OH-2."
  },
  {
    "id": "precip-cdcl2-koh",
    "name": "Precipitation of CD-OH-2 from cdcl2 and potassium hydroxide",
    "reactants": [
      "cdcl2",
      "koh"
    ],
    "precipitate": "cd-oh-2",
    "byproduct": "kcl",
    "enthalpy": -45.3,
    "netIonic": "M(n+) + OH-/S(2-) → CD-OH-2(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of CD-OH-2."
  },
  {
    "id": "precip-cd-no3-2-naoh",
    "name": "Precipitation of CD-OH-2 from cd-no3-2 and sodium hydroxide",
    "reactants": [
      "cd-no3-2",
      "naoh"
    ],
    "precipitate": "cd-oh-2",
    "byproduct": "nano3",
    "enthalpy": -45.2,
    "netIonic": "M(n+) + OH-/S(2-) → CD-OH-2(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of CD-OH-2."
  },
  {
    "id": "precip-cd-no3-2-koh",
    "name": "Precipitation of CD-OH-2 from cd-no3-2 and potassium hydroxide",
    "reactants": [
      "cd-no3-2",
      "koh"
    ],
    "precipitate": "cd-oh-2",
    "byproduct": "kno3",
    "enthalpy": -45.5,
    "netIonic": "M(n+) + OH-/S(2-) → CD-OH-2(s)",
    "colorTo": "#FFFFFF",
    "desc": "Precipitation of CD-OH-2."
  },
  {
    "id": "precip-cdcl2-na2s",
    "name": "Precipitation of CDS from cdcl2 and sodium sulfide",
    "reactants": [
      "cdcl2",
      "na2s"
    ],
    "precipitate": "cds",
    "byproduct": "nacl",
    "enthalpy": -122,
    "netIonic": "M(n+) + OH-/S(2-) → CDS(s)",
    "colorTo": "#FFD700",
    "desc": "Precipitation of CDS."
  }
];

  if (precipitations.length !== 220) {
    throw new Error(`Expected 220 precipitation reactions, got ${precipitations.length}`);
  }

  for (const p of precipitations) {
    addReaction({
      id: p.id,
      name: p.name,
      reactionType: "precipitation",
      reactants: p.reactants,
      products: [p.precipitate, { chemicalId: p.byproduct, isByproduct: true }],
      netIonicEquation: p.netIonic,
      enthalpyKjPerMol: p.enthalpy,
      temperatureMinC: 10,
      temperatureMaxC: 60,
      solvent: "water",
      observableEffects: [
        {
          type: "precipitation",
          description: p.desc,
          relatedChemicalId: p.precipitate,
          colorTo: p.colorTo
        }
      ],
      safetyNotes: "Collect and dispose of heavy-metal precipitate residues in appropriate hazardous waste containers."
    });
  }
}
