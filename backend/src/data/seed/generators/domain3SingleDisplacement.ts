import { addReaction } from "./generate1000Reactions.js";
import { SEED_CHEMICALS } from "../chemicals.js";
import { RAW_BATCH_4_CHEMICALS } from "./chemicalDefinitions.js";
import type { SeedObservableEffect } from "../reactions.js";

const chemColorMap = new Map<string, string>();
for (const c of SEED_CHEMICALS) chemColorMap.set(c.id, c.substanceColor ?? "#FFFFFF");
for (const c of RAW_BATCH_4_CHEMICALS) chemColorMap.set(c.id, c.substanceColor ?? "#FFFFFF");

export function buildDomain3SingleDisplacement(): void {
  // Domain 3: 120 Curated Single Displacement & Redox Reactions
  const list = [
    {
      "id": "disp-zn-cuno32",
      "name": "Displacement of copper by zinc from copper(II) nitrate",
      "reactants": ["zn", "cu-no3-2"],
      "products": ["cu", "zn-no3-2"],
      "enthalpy": -216,
      "desc": "Reddish-brown metallic copper deposits onto zinc."
    },
    {
      "id": "disp-zn-niso4",
      "name": "Displacement of nickel by zinc from nickel(II) sulfate",
      "reactants": ["zn", "niso4"],
      "products": ["ni", "znso4"],
      "enthalpy": -130,
      "desc": "Finely divided metallic nickel deposits onto zinc."
    },
    {
      "id": "disp-zn-nicl2",
      "name": "Displacement of nickel by zinc from nickel(II) chloride",
      "reactants": ["zn", "nicl2"],
      "products": ["ni", "zncl2"],
      "enthalpy": -132,
      "desc": "Green nickel solution fades as nickel metal plates out."
    },
    {
      "id": "disp-zn-coso4",
      "name": "Displacement of cobalt by zinc from cobalt(II) sulfate",
      "reactants": ["zn", "coso4"],
      "products": ["cobalt-metal", "znso4"],
      "enthalpy": -125,
      "desc": "Cobalt metal forms on zinc strip."
    },
    {
      "id": "disp-zn-cocl2",
      "name": "Displacement of cobalt by zinc from cobalt(II) chloride",
      "reactants": ["zn", "cocl2"],
      "products": ["cobalt-metal", "zncl2"],
      "enthalpy": -127,
      "desc": "Pink cobalt solution turns colorless as cobalt precipitates."
    },
    {
      "id": "disp-zn-pbno32",
      "name": "Displacement of lead by zinc from lead(II) nitrate",
      "reactants": ["zn", "pbno32"],
      "products": ["pb", "zn-no3-2"],
      "enthalpy": -155,
      "desc": "Lead arborized crystals grow on zinc surface."
    },
    {
      "id": "disp-zn-pbcl2",
      "name": "Displacement of lead by zinc from lead(II) chloride",
      "reactants": ["zn", "pbcl2"],
      "products": ["pb", "zncl2"],
      "enthalpy": -156,
      "desc": "Lead metal deposits as gray crystals."
    },
    {
      "id": "disp-zn-bino33",
      "name": "Displacement of bismuth by zinc from bismuth(III) nitrate",
      "reactants": ["zn", "bi-no3-3"],
      "products": ["bi", "zn-no3-2"],
      "enthalpy": -260,
      "desc": "Black dendritic bismuth deposits onto zinc metal."
    },
    {
      "id": "disp-zn-cdcl2",
      "name": "Displacement of cadmium by zinc from cadmium chloride",
      "reactants": ["zn", "cdcl2"],
      "products": ["cd", "zncl2"],
      "enthalpy": -62,
      "desc": "Silvery cadmium crystals form on zinc."
    },
    {
      "id": "disp-zn-feso4",
      "name": "Displacement of iron by zinc from iron(II) sulfate",
      "reactants": ["zn", "feso4"],
      "products": ["fe", "znso4"],
      "enthalpy": -82,
      "desc": "Gray iron powder plates onto zinc strip."
    },
    {
      "id": "disp-zn-fecl2",
      "name": "Displacement of iron by zinc from iron(II) chloride",
      "reactants": ["zn", "fecl2"],
      "products": ["fe", "zncl2"],
      "enthalpy": -84,
      "desc": "Pale green solution decolorizes as iron deposits."
    },
    {
      "id": "disp-fe-cuno32",
      "name": "Displacement of copper by iron from copper(II) nitrate",
      "reactants": ["fe", "cu-no3-2"],
      "products": ["cu", "fe-no3-2"],
      "enthalpy": -150,
      "desc": "Copper metal coats iron surface."
    },
    {
      "id": "disp-fe-pbno32",
      "name": "Displacement of lead by iron from lead(II) nitrate",
      "reactants": ["fe", "pbno32"],
      "products": ["pb", "fe-no3-2"],
      "enthalpy": -88,
      "desc": "Gray lead metal deposits onto iron."
    },
    {
      "id": "disp-fe-niso4",
      "name": "Displacement of nickel by iron from nickel(II) sulfate",
      "reactants": ["fe", "niso4"],
      "products": ["ni", "feso4"],
      "enthalpy": -64,
      "desc": "Nickel metal plates onto iron."
    },
    {
      "id": "disp-fe-coso4",
      "name": "Displacement of cobalt by iron from cobalt(II) sulfate",
      "reactants": ["fe", "coso4"],
      "products": ["cobalt-metal", "feso4"],
      "enthalpy": -58,
      "desc": "Cobalt metal forms on iron."
    },
    {
      "id": "disp-fe-bino33",
      "name": "Displacement of bismuth by iron from bismuth(III) nitrate",
      "reactants": ["fe", "bi-no3-3"],
      "products": ["bi", "fe-no3-2"],
      "enthalpy": -195,
      "desc": "Bismuth black crystals deposit on iron."
    },
    {
      "id": "disp-fe-cdcl2",
      "name": "Displacement of cadmium by iron from cadmium chloride",
      "reactants": ["fe", "cdcl2"],
      "products": ["cd", "fecl2"],
      "enthalpy": -28,
      "desc": "Cadmium metal forms on iron."
    },
    {
      "id": "disp-al-cuno32",
      "name": "Displacement of copper by aluminium from copper(II) nitrate",
      "reactants": ["al", "cu-no3-2"],
      "products": ["cu", "al-no3-3"],
      "enthalpy": -755,
      "desc": "Metallic copper coats aluminium foil."
    },
    {
      "id": "disp-al-pbno32",
      "name": "Displacement of lead by aluminium from lead(II) nitrate",
      "reactants": ["al", "pbno32"],
      "products": ["pb", "al-no3-3"],
      "enthalpy": -560,
      "desc": "Lead needles form on aluminium foil."
    },
    {
      "id": "disp-al-niso4",
      "name": "Displacement of nickel by aluminium from nickel(II) sulfate",
      "reactants": ["al", "niso4"],
      "products": ["ni", "al2-so4-3"],
      "enthalpy": -490,
      "desc": "Nickel metal deposits on aluminium."
    },
    {
      "id": "disp-al-coso4",
      "name": "Displacement of cobalt by aluminium from cobalt(II) sulfate",
      "reactants": ["al", "coso4"],
      "products": ["cobalt-metal", "al2-so4-3"],
      "enthalpy": -475,
      "desc": "Cobalt metal forms on aluminium."
    },
    {
      "id": "disp-al-bino33",
      "name": "Displacement of bismuth by aluminium from bismuth(III) nitrate",
      "reactants": ["al", "bi-no3-3"],
      "products": ["bi", "al-no3-3"],
      "enthalpy": -520,
      "desc": "Bismuth black crystals precipitate."
    },
    {
      "id": "disp-al-cdcl2",
      "name": "Displacement of cadmium by aluminium from cadmium chloride",
      "reactants": ["al", "cdcl2"],
      "products": ["cd", "alcl3"],
      "enthalpy": -310,
      "desc": "Cadmium metal forms on aluminium."
    },
    {
      "id": "disp-al-feso4",
      "name": "Displacement of iron by aluminium from iron(II) sulfate",
      "reactants": ["al", "feso4"],
      "products": ["fe", "al2-so4-3"],
      "enthalpy": -480,
      "desc": "Iron deposits onto aluminium strip."
    },
    {
      "id": "disp-al-fecl2",
      "name": "Displacement of iron by aluminium from iron(II) chloride",
      "reactants": ["al", "fecl2"],
      "products": ["fe", "alcl3"],
      "enthalpy": -485,
      "desc": "Iron metal deposits as black flakes."
    },
    {
      "id": "disp-sn-agno3",
      "name": "Displacement of silver by tin from silver nitrate",
      "reactants": ["sn", "agno3"],
      "products": ["ag", "sn-no3-2"],
      "enthalpy": -270,
      "desc": "Silver crystals plate out onto tin metal."
    },
    {
      "id": "disp-sn-cuso4",
      "name": "Displacement of copper by tin from copper(II) sulfate",
      "reactants": ["sn", "cuso4"],
      "products": ["cu", "snso4"],
      "enthalpy": -135,
      "desc": "Reddish copper coats tin strip."
    },
    {
      "id": "disp-sn-pbno32",
      "name": "Displacement of lead by tin from lead(II) nitrate",
      "reactants": ["sn", "pbno32"],
      "products": ["pb", "sn-no3-2"],
      "enthalpy": -75,
      "desc": "Lead crystals deposit on tin."
    },
    {
      "id": "disp-ni-agno3",
      "name": "Displacement of silver by nickel from silver nitrate",
      "reactants": ["ni", "agno3"],
      "products": ["ag", "ni-no3-2"],
      "enthalpy": -275,
      "desc": "Silver needles precipitate onto nickel wire."
    },
    {
      "id": "disp-ni-cucl2",
      "name": "Displacement of copper by nickel from copper(II) chloride",
      "reactants": ["ni", "cucl2"],
      "products": ["cu", "nicl2"],
      "enthalpy": -142,
      "desc": "Copper metal deposits onto nickel."
    },
    {
      "id": "disp-ni-pbno32",
      "name": "Displacement of lead by nickel from lead(II) nitrate",
      "reactants": ["ni", "pbno32"],
      "products": ["pb", "ni-no3-2"],
      "enthalpy": -80,
      "desc": "Lead crystals deposit on nickel."
    },
    {
      "id": "disp-co-agno3",
      "name": "Displacement of silver by cobalt from silver nitrate",
      "reactants": ["cobalt-metal", "agno3"],
      "products": ["ag", "co-no3-2"],
      "enthalpy": -280,
      "desc": "Silver crystals grow on cobalt metal."
    },
    {
      "id": "disp-co-cuso4",
      "name": "Displacement of copper by cobalt from copper(II) sulfate",
      "reactants": ["cobalt-metal", "cuso4"],
      "products": ["cu", "coso4"],
      "enthalpy": -145,
      "desc": "Copper metal coats cobalt strip."
    },
    {
      "id": "disp-co-cucl2",
      "name": "Displacement of copper by cobalt from copper(II) chloride",
      "reactants": ["cobalt-metal", "cucl2"],
      "products": ["cu", "cocl2"],
      "enthalpy": -147,
      "desc": "Copper metal precipitates on cobalt."
    },
    {
      "id": "disp-co-pbno32",
      "name": "Displacement of lead by cobalt from lead(II) nitrate",
      "reactants": ["cobalt-metal", "pbno32"],
      "products": ["pb", "co-no3-2"],
      "enthalpy": -85,
      "desc": "Lead crystals deposit on cobalt."
    },
    {
      "id": "disp-mn-cuso4",
      "name": "Displacement of copper by manganese from copper(II) sulfate",
      "reactants": ["mn", "cuso4"],
      "products": ["cu", "mnso4"],
      "enthalpy": -260,
      "desc": "Rapid deposition of copper on manganese metal."
    },
    {
      "id": "disp-mn-cucl2",
      "name": "Displacement of copper by manganese from copper(II) chloride",
      "reactants": ["mn", "cucl2"],
      "products": ["cu", "mncl2"],
      "enthalpy": -262,
      "desc": "Copper metal precipitates vigorously."
    },
    {
      "id": "disp-mn-agno3",
      "name": "Displacement of silver by manganese from silver nitrate",
      "reactants": ["mn", "agno3"],
      "products": ["ag", "mn-no3-2"],
      "enthalpy": -390,
      "desc": "Vigorous deposition of silver needles on manganese."
    },
    {
      "id": "disp-mn-pbno32",
      "name": "Displacement of lead by manganese from lead(II) nitrate",
      "reactants": ["mn", "pbno32"],
      "products": ["pb", "mn-no3-2"],
      "enthalpy": -200,
      "desc": "Lead metal deposits on manganese."
    },
    {
      "id": "disp-mn-niso4",
      "name": "Displacement of nickel by manganese from nickel(II) sulfate",
      "reactants": ["mn", "niso4"],
      "products": ["ni", "mnso4"],
      "enthalpy": -175,
      "desc": "Nickel metal plates onto manganese."
    },
    {
      "id": "disp-cr-cuso4",
      "name": "Displacement of copper by chromium from copper(II) sulfate",
      "reactants": ["cr", "cuso4"],
      "products": ["cu", "cr2-so4-3"],
      "enthalpy": -580,
      "desc": "Copper metal deposits onto chromium."
    },
    {
      "id": "disp-cr-agno3",
      "name": "Displacement of silver by chromium from silver nitrate",
      "reactants": ["cr", "agno3"],
      "products": ["ag", "cr-no3-3"],
      "enthalpy": -820,
      "desc": "Silver crystals plate on chromium."
    },
    {
      "id": "disp-cd-agno3",
      "name": "Displacement of silver by cadmium from silver nitrate",
      "reactants": ["cd", "agno3"],
      "products": ["ag", "cd-no3-2"],
      "enthalpy": -310,
      "desc": "Silver needles grow on cadmium metal."
    },
    {
      "id": "disp-cd-cuso4",
      "name": "Displacement of copper by cadmium from copper(II) sulfate",
      "reactants": ["cd", "cuso4"],
      "products": ["cu", "cdso4"],
      "enthalpy": -170,
      "desc": "Copper metal coats cadmium."
    },
    {
      "id": "disp-cd-cucl2",
      "name": "Displacement of copper by cadmium from copper(II) chloride",
      "reactants": ["cd", "cucl2"],
      "products": ["cu", "cdcl2"],
      "enthalpy": -172,
      "desc": "Copper metal precipitates out."
    },
    {
      "id": "disp-cd-pbno32",
      "name": "Displacement of lead by cadmium from lead(II) nitrate",
      "reactants": ["cd", "pbno32"],
      "products": ["pb", "cd-no3-2"],
      "enthalpy": -110,
      "desc": "Lead crystals deposit on cadmium."
    },
    {
      "id": "disp-cd-niso4",
      "name": "Displacement of nickel by cadmium from nickel(II) sulfate",
      "reactants": ["cd", "niso4"],
      "products": ["ni", "cdso4"],
      "enthalpy": -85,
      "desc": "Nickel metal forms on cadmium."
    },
    {
      "id": "disp-mg-znso4",
      "name": "Displacement of zinc by magnesium from zinc sulfate",
      "reactants": ["mg", "znso4"],
      "products": ["zn", "mgso4"],
      "enthalpy": -340,
      "desc": "Vigorous deposition of spongy zinc on magnesium ribbon."
    },
    {
      "id": "disp-mg-feso4",
      "name": "Displacement of iron by magnesium from iron(II) sulfate",
      "reactants": ["mg", "feso4"],
      "products": ["fe", "mgso4"],
      "enthalpy": -360,
      "desc": "Dark iron particles deposit onto magnesium ribbon."
    },
    {
      "id": "disp-mg-agno3",
      "name": "Displacement of silver by magnesium from silver nitrate",
      "reactants": ["mg", "agno3"],
      "products": ["ag", "mg-no3-2"],
      "enthalpy": -580,
      "desc": "Glistening silver crystals rapidly form on magnesium ribbon."
    },
    {
      "id": "disp-mg-pbno32",
      "name": "Displacement of lead by magnesium from lead(II) nitrate",
      "reactants": ["mg", "pbno32"],
      "products": ["pb", "mg-no3-2"],
      "enthalpy": -385,
      "desc": "Silvery lead needles form along magnesium surface."
    },
    {
      "id": "disp-mg-niso4",
      "name": "Displacement of nickel by magnesium from nickel(II) sulfate",
      "reactants": ["mg", "niso4"],
      "products": ["ni", "mgso4"],
      "enthalpy": -350,
      "desc": "Metallic nickel powder deposits rapidly."
    },
    {
      "id": "disp-zn-hbr",
      "name": "Single displacement reaction of zinc with hydrobromic acid",
      "reactants": ["zn", "hbr"],
      "products": ["znbr2", "h2"],
      "enthalpy": -152,
      "desc": "Hydrogen gas evolves vigorously as zinc dissolves in HBr."
    },
    {
      "id": "disp-zn-hi",
      "name": "Single displacement reaction of zinc with hydroiodic acid",
      "reactants": ["zn", "hi"],
      "products": ["zni2", "h2"],
      "enthalpy": -150,
      "desc": "Hydrogen gas evolution yielding zinc iodide."
    },
    {
      "id": "disp-fe-hbr",
      "name": "Single displacement reaction of iron with hydrobromic acid",
      "reactants": ["fe", "hbr"],
      "products": ["febr2", "h2"],
      "enthalpy": -87,
      "desc": "Hydrogen gas bubbling off iron wire."
    },
    {
      "id": "disp-fe-hi",
      "name": "Single displacement reaction of iron with hydroiodic acid",
      "reactants": ["fe", "hi"],
      "products": ["fei2", "h2"],
      "enthalpy": -85,
      "desc": "Hydrogen gas released as iron dissolves in HI."
    },
    {
      "id": "disp-al-h2so4",
      "name": "Single displacement reaction of aluminium with sulfuric acid",
      "reactants": ["al", "h2so4"],
      "products": ["al2-so4-3", "h2"],
      "enthalpy": -535,
      "desc": "Hydrogen gas bubbles steadily as aluminium dissolves."
    },
    {
      "id": "disp-al-hbr",
      "name": "Single displacement reaction of aluminium with hydrobromic acid",
      "reactants": ["al", "hbr"],
      "products": ["albr3", "h2"],
      "enthalpy": -528,
      "desc": "Energetic evolution of hydrogen gas."
    },
    {
      "id": "disp-al-hi",
      "name": "Single displacement reaction of aluminium with hydroiodic acid",
      "reactants": ["al", "hi"],
      "products": ["ali3", "h2"],
      "enthalpy": -522,
      "desc": "Hydrogen gas evolution yielding aluminium iodide."
    },
    {
      "id": "disp-sn-h2so4",
      "name": "Reaction of tin with sulfuric acid",
      "reactants": ["sn", "h2so4"],
      "products": ["snso4", "h2"],
      "enthalpy": -39,
      "desc": "Slow hydrogen gas evolution."
    },
    {
      "id": "disp-cd-hbr",
      "name": "Reaction of cadmium with hydrobromic acid",
      "reactants": ["cd", "hbr"],
      "products": ["cdbr2", "h2"],
      "enthalpy": -71,
      "desc": "Hydrogen bubbles forming cadmium bromide."
    },
    {
      "id": "disp-ni-hcl",
      "name": "Reaction of nickel with hydrochloric acid",
      "reactants": ["ni", "hcl"],
      "products": ["nicl2", "h2"],
      "enthalpy": -45,
      "desc": "Slow hydrogen effervescence turning solution pale green."
    },
    {
      "id": "disp-ni-h2so4",
      "name": "Reaction of nickel with sulfuric acid",
      "reactants": ["ni", "h2so4"],
      "products": ["niso4", "h2"],
      "enthalpy": -46,
      "desc": "Hydrogen gas released forming green nickel sulfate."
    },
    {
      "id": "disp-ni-hbr",
      "name": "Reaction of nickel with hydrobromic acid",
      "reactants": ["ni", "hbr"],
      "products": ["nibr2", "h2"],
      "enthalpy": -44,
      "desc": "Hydrogen evolution forming nickel bromide."
    },
    {
      "id": "disp-co-hcl",
      "name": "Reaction of cobalt with hydrochloric acid",
      "reactants": ["cobalt-metal", "hcl"],
      "products": ["cocl2", "h2"],
      "enthalpy": -48,
      "desc": "Hydrogen bubbles rise as cobalt dissolves forming pink solution."
    },
    {
      "id": "disp-co-h2so4",
      "name": "Reaction of cobalt with sulfuric acid",
      "reactants": ["cobalt-metal", "h2so4"],
      "products": ["coso4", "h2"],
      "enthalpy": -49,
      "desc": "Hydrogen gas evolution forming cobalt sulfate."
    },
    {
      "id": "disp-co-hbr",
      "name": "Reaction of cobalt with hydrobromic acid",
      "reactants": ["cobalt-metal", "hbr"],
      "products": ["cobr2", "h2"],
      "enthalpy": -47,
      "desc": "Hydrogen evolution forming cobalt bromide."
    },
    {
      "id": "disp-mn-hcl",
      "name": "Reaction of manganese with hydrochloric acid",
      "reactants": ["mn", "hcl"],
      "products": ["mncl2", "h2"],
      "enthalpy": -220,
      "desc": "Vigorous hydrogen effervescence from active manganese metal."
    },
    {
      "id": "disp-mn-h2so4",
      "name": "Reaction of manganese with sulfuric acid",
      "reactants": ["mn", "h2so4"],
      "products": ["mnso4", "h2"],
      "enthalpy": -222,
      "desc": "Rapid stream of hydrogen gas bubbles."
    },
    {
      "id": "disp-mn-hbr",
      "name": "Reaction of manganese with hydrobromic acid",
      "reactants": ["mn", "hbr"],
      "products": ["mnbr2", "h2"],
      "enthalpy": -218,
      "desc": "Energetic hydrogen release."
    },
    {
      "id": "disp-cr-hcl",
      "name": "Reaction of chromium with hydrochloric acid",
      "reactants": ["cr", "hcl"],
      "products": ["crcl3", "h2"],
      "enthalpy": -160,
      "desc": "Hydrogen gas evolves forming deep violet chromium(III) chloride."
    },
    {
      "id": "disp-cr-h2so4",
      "name": "Reaction of chromium with sulfuric acid",
      "reactants": ["cr", "h2so4"],
      "products": ["cr2-so4-3", "h2"],
      "enthalpy": -162,
      "desc": "Hydrogen evolution yielding chromium(III) sulfate."
    },
    {
      "id": "disp-ti-hcl",
      "name": "Reaction of titanium with concentrated hydrochloric acid",
      "reactants": ["ti", "hcl"],
      "products": ["ticl4", "h2"],
      "enthalpy": -190,
      "desc": "Titanium dissolves with hydrogen gas evolution."
    },
    {
      "id": "disp-cd-hcl",
      "name": "Reaction of cadmium with hydrochloric acid",
      "reactants": ["cd", "hcl"],
      "products": ["cdcl2", "h2"],
      "enthalpy": -72,
      "desc": "Hydrogen bubbles stream from cadmium metal."
    },
    {
      "id": "disp-cd-h2so4",
      "name": "Reaction of cadmium with sulfuric acid",
      "reactants": ["cd", "h2so4"],
      "products": ["cdso4", "h2"],
      "enthalpy": -73,
      "desc": "Hydrogen evolution forming cadmium sulfate."
    },
    {
      "id": "disp-cd-hi",
      "name": "Reaction of cadmium with hydroiodic acid",
      "reactants": ["cd", "hi"],
      "products": ["cdi2", "h2"],
      "enthalpy": -70,
      "desc": "Cadmium metal slowly reacts with hydroiodic acid releasing hydrogen."
    },
    {
      "id": "disp-al-zncl2",
      "name": "Displacement of zinc by aluminium from zinc chloride",
      "reactants": ["al", "zncl2"],
      "products": ["zn", "alcl3"],
      "enthalpy": -480,
      "desc": "Aluminium displaces zinc forming spongy gray zinc metal."
    },
    {
      "id": "disp-al-mncl2",
      "name": "Displacement of manganese by aluminium from manganese(II) chloride",
      "reactants": ["al", "mncl2"],
      "products": ["mn", "alcl3"],
      "enthalpy": -320,
      "desc": "Aluminium reduces manganese(II) chloride to metallic manganese."
    },
    {
      "id": "disp-cl2-nabr",
      "name": "Displacement of bromine by chlorine from sodium bromide",
      "reactants": ["cl2", "nabr"],
      "products": ["br2", "nacl"],
      "enthalpy": -98,
      "desc": "Colorless solution turns orange-amber as elemental bromine is liberated."
    },
    {
      "id": "disp-cl2-libr",
      "name": "Displacement of bromine by chlorine from lithium bromide",
      "reactants": ["cl2", "libr"],
      "products": ["br2", "licl"],
      "enthalpy": -97.8,
      "desc": "Liberation of elemental bromine."
    },
    {
      "id": "disp-cl2-cabr2",
      "name": "Displacement of bromine by chlorine from calcium bromide",
      "reactants": ["cl2", "cabr2"],
      "products": ["br2", "cacl2"],
      "enthalpy": -98.2,
      "desc": "Bromine liberated into orange solution."
    },
    {
      "id": "disp-cl2-babr2",
      "name": "Displacement of bromine by chlorine from barium bromide",
      "reactants": ["cl2", "babr2"],
      "products": ["br2", "bacl2"],
      "enthalpy": -98.4,
      "desc": "Liberation of elemental bromine."
    },
    {
      "id": "disp-cl2-srbr2",
      "name": "Displacement of bromine by chlorine from strontium bromide",
      "reactants": ["cl2", "srbr2"],
      "products": ["br2", "srcl2"],
      "enthalpy": -98.1,
      "desc": "Bromine liberated turning solution amber."
    },
    {
      "id": "disp-cl2-mgbr2",
      "name": "Displacement of bromine by chlorine from magnesium bromide",
      "reactants": ["cl2", "mgbr2"],
      "products": ["br2", "mgcl2"],
      "enthalpy": -97.9,
      "desc": "Bromine liberated into solution."
    },
    {
      "id": "disp-cl2-znbr2",
      "name": "Displacement of bromine by chlorine from zinc bromide",
      "reactants": ["cl2", "znbr2"],
      "products": ["br2", "zncl2"],
      "enthalpy": -98,
      "desc": "Bromine liberated."
    },
    {
      "id": "disp-cl2-nai",
      "name": "Displacement of iodine by chlorine from sodium iodide",
      "reactants": ["cl2", "nai"],
      "products": ["i2", "nacl"],
      "enthalpy": -145,
      "desc": "Colorless solution darkens into brown triiodide and purple iodine crystals."
    },
    {
      "id": "disp-cl2-lii",
      "name": "Displacement of iodine by chlorine from lithium iodide",
      "reactants": ["cl2", "lii"],
      "products": ["i2", "licl"],
      "enthalpy": -144.8,
      "desc": "Dark purple-brown iodine liberated."
    },
    {
      "id": "disp-cl2-cai2",
      "name": "Displacement of iodine by chlorine from calcium iodide",
      "reactants": ["cl2", "cai2"],
      "products": ["i2", "cacl2"],
      "enthalpy": -145.2,
      "desc": "Iodine liberated into brown solution."
    },
    {
      "id": "disp-cl2-bai2",
      "name": "Displacement of iodine by chlorine from barium iodide",
      "reactants": ["cl2", "bai2"],
      "products": ["i2", "bacl2"],
      "enthalpy": -145.4,
      "desc": "Elemental iodine liberated."
    },
    {
      "id": "disp-cl2-sri2",
      "name": "Displacement of iodine by chlorine from strontium iodide",
      "reactants": ["cl2", "sri2"],
      "products": ["i2", "srcl2"],
      "enthalpy": -145.1,
      "desc": "Iodine liberated."
    },
    {
      "id": "disp-cl2-mgi2",
      "name": "Displacement of iodine by chlorine from magnesium iodide",
      "reactants": ["cl2", "mgi2"],
      "products": ["i2", "mgcl2"],
      "enthalpy": -144.9,
      "desc": "Iodine liberated."
    },
    {
      "id": "disp-cl2-zni2",
      "name": "Displacement of iodine by chlorine from zinc iodide",
      "reactants": ["cl2", "zni2"],
      "products": ["i2", "zncl2"],
      "enthalpy": -145,
      "desc": "Iodine liberated."
    },
    {
      "id": "disp-br2-nai",
      "name": "Displacement of iodine by bromine from sodium iodide",
      "reactants": ["br2", "nai"],
      "products": ["i2", "nabr"],
      "enthalpy": -47,
      "desc": "Amber bromine solution deepens to violet-brown as iodine is released."
    },
    {
      "id": "disp-br2-lii",
      "name": "Displacement of iodine by bromine from lithium iodide",
      "reactants": ["br2", "lii"],
      "products": ["i2", "libr"],
      "enthalpy": -46.8,
      "desc": "Iodine liberated by bromine."
    },
    {
      "id": "disp-br2-cai2",
      "name": "Displacement of iodine by bromine from calcium iodide",
      "reactants": ["br2", "cai2"],
      "products": ["i2", "cabr2"],
      "enthalpy": -47,
      "desc": "Liberation of elemental iodine."
    },
    {
      "id": "disp-br2-mgi2",
      "name": "Displacement of iodine by bromine from magnesium iodide",
      "reactants": ["br2", "mgi2"],
      "products": ["i2", "mgbr2"],
      "enthalpy": -46.9,
      "desc": "Liberation of elemental iodine."
    },
    {
      "id": "disp-f2-nacl",
      "name": "Displacement of chlorine by fluorine from sodium chloride",
      "reactants": ["f2", "nacl"],
      "products": ["cl2", "naf"],
      "enthalpy": -320,
      "desc": "Violent displacement liberating chlorine gas."
    },
    {
      "id": "disp-f2-kcl",
      "name": "Displacement of chlorine by fluorine from potassium chloride",
      "reactants": ["f2", "kcl"],
      "products": ["cl2", "kf"],
      "enthalpy": -322,
      "desc": "Fluorine displaces chlorine gas."
    },
    {
      "id": "disp-f2-cacl2",
      "name": "Displacement of chlorine by fluorine from calcium chloride",
      "reactants": ["f2", "cacl2"],
      "products": ["cl2", "caf2"],
      "enthalpy": -330,
      "desc": "Fluorine displaces chlorine yielding calcium fluoride."
    },
    {
      "id": "disp-f2-nabr",
      "name": "Displacement of bromine by fluorine from sodium bromide",
      "reactants": ["f2", "nabr"],
      "products": ["br2", "naf"],
      "enthalpy": -418,
      "desc": "Fluorine vigorously displaces bromine vapors."
    },
    {
      "id": "disp-fe2o3-h2",
      "name": "Reduction of iron(III) oxide by hydrogen gas",
      "reactants": ["fe2o3", "h2"],
      "products": ["fe", "water"],
      "enthalpy": 98,
      "desc": "Red iron oxide is reduced to dark gray metallic iron sponge."
    },
    {
      "id": "disp-pbo-h2",
      "name": "Reduction of lead(II) oxide by hydrogen gas",
      "reactants": ["pbo", "h2"],
      "products": ["pb", "water"],
      "enthalpy": -68,
      "desc": "Yellow lead oxide turns into silvery metallic lead bead."
    },
    {
      "id": "disp-nio-h2",
      "name": "Reduction of nickel(II) oxide by hydrogen gas",
      "reactants": ["nio", "h2"],
      "products": ["ni", "water"],
      "enthalpy": -28,
      "desc": "Green nickel oxide reduced to magnetic nickel powder."
    },
    {
      "id": "disp-sno-h2",
      "name": "Reduction of tin(II) oxide by hydrogen gas",
      "reactants": ["sno", "h2"],
      "products": ["sn", "water"],
      "enthalpy": -45,
      "desc": "Dark oxide reduced to molten silvery tin beads."
    },
    {
      "id": "disp-sno2-h2",
      "name": "Reduction of tin(IV) oxide by hydrogen gas",
      "reactants": ["sno2", "h2"],
      "products": ["sn", "water"],
      "enthalpy": 32,
      "desc": "Cassiterite reduced to shiny elemental tin."
    },
    {
      "id": "disp-bi2o3-h2",
      "name": "Reduction of bismuth(III) oxide by hydrogen gas",
      "reactants": ["bi2o3", "h2"],
      "products": ["bi", "water"],
      "enthalpy": -160,
      "desc": "Yellow bismuth oxide reduced to metallic bismuth droplets."
    },
    {
      "id": "disp-pbo-co",
      "name": "Reduction of lead(II) oxide by carbon monoxide",
      "reactants": ["pbo", "co"],
      "products": ["pb", "co2"],
      "enthalpy": -110,
      "desc": "Yellow lead oxide reduced to liquid lead bead."
    },
    {
      "id": "disp-nio-co",
      "name": "Reduction of nickel(II) oxide by carbon monoxide",
      "reactants": ["nio", "co"],
      "products": ["ni", "co2"],
      "enthalpy": -70,
      "desc": "Nickel oxide reduced to fine metallic nickel powder."
    },
    {
      "id": "disp-sno-co",
      "name": "Reduction of tin(II) oxide by carbon monoxide",
      "reactants": ["sno", "co"],
      "products": ["sn", "co2"],
      "enthalpy": -86,
      "desc": "Tin oxide reduced to metallic tin."
    },
    {
      "id": "disp-sno2-co",
      "name": "Reduction of tin(IV) oxide by carbon monoxide",
      "reactants": ["sno2", "co"],
      "products": ["sn", "co2"],
      "enthalpy": -10,
      "desc": "Cassiterite reduced to elemental tin by CO."
    },
    {
      "id": "disp-bi2o3-co",
      "name": "Reduction of bismuth(III) oxide by carbon monoxide",
      "reactants": ["bi2o3", "co"],
      "products": ["bi", "co2"],
      "enthalpy": -280,
      "desc": "Bismuth oxide reduced by carbon monoxide."
    },
    {
      "id": "disp-pbo-c",
      "name": "Carbothermic smelting reduction of lead(II) oxide",
      "reactants": ["pbo", "c"],
      "products": ["pb", "co"],
      "enthalpy": 107,
      "desc": "Lead oxide reduced by carbon coke to metallic lead beads."
    },
    {
      "id": "disp-sno2-c",
      "name": "Carbothermic reduction of tin(IV) oxide",
      "reactants": ["sno2", "c"],
      "products": ["sn", "co"],
      "enthalpy": 360,
      "desc": "Smelting of cassiterite ore with carbon to yield elemental tin."
    },
    {
      "id": "disp-sno-c",
      "name": "Carbothermic reduction of tin(II) oxide",
      "reactants": ["sno", "c"],
      "products": ["sn", "co"],
      "enthalpy": 145,
      "desc": "Reduction of tin monoxide by charcoal."
    },
    {
      "id": "disp-f2-ki",
      "name": "Displacement of iodine by fluorine from potassium iodide",
      "reactants": ["f2", "ki"],
      "products": ["i2", "kf"],
      "enthalpy": -467,
      "desc": "Fluorine violently oxidizes potassium iodide releasing iodine vapor."
    },
    {
      "id": "disp-zno-c",
      "name": "Carbothermic reduction of zinc oxide",
      "reactants": ["zno", "c"],
      "products": ["zn", "co"],
      "enthalpy": 350,
      "desc": "Industrial retort furnace reduction yielding vaporized zinc metal."
    },
    {
      "id": "disp-bi2o3-c",
      "name": "Carbothermic reduction of bismuth(III) oxide",
      "reactants": ["bi2o3", "c"],
      "products": ["bi", "co"],
      "enthalpy": 290,
      "desc": "Reduction of bismuth oxide powder with carbon powder."
    },
    {
      "id": "disp-f2-nai",
      "name": "Displacement of iodine by fluorine from sodium iodide",
      "reactants": ["f2", "nai"],
      "products": ["i2", "naf"],
      "enthalpy": -465,
      "desc": "Fluorine reacts violently with sodium iodide releasing iodine vapors."
    },
    {
      "id": "disp-thermite-v2o5",
      "name": "Aluminothermic reduction of vanadium(V) oxide",
      "reactants": ["al", "v2o5"],
      "products": ["v", "al2o3"],
      "enthalpy": -740.0,
      "desc": "Incendiary aluminothermic reduction yielding elemental vanadium metal."
    },
    {
      "id": "disp-thermite-cr2o3",
      "name": "Aluminothermic reduction of chromium(III) oxide",
      "reactants": ["al", "cr2o3"],
      "products": ["cr", "al2o3"],
      "enthalpy": -536.0,
      "desc": "High-temperature thermite reduction yielding molten elemental chromium."
    }
  ];

  for (const d of list) {
    const isGasProd = d.products.includes("h2") || d.products.includes("co") || d.products.includes("co2") || d.products.includes("cl2");
    const eff: SeedObservableEffect = isGasProd
      ? {
          type: "gas_evolution",
          description: d.desc,
          relatedChemicalId: d.products.find(p => ["h2", "co", "co2", "cl2"].includes(p)),
        }
      : {
          type: "color_change",
          description: d.desc,
          colorFrom: (d.reactants[1] ? chemColorMap.get(d.reactants[1]) : undefined) ?? "#FFFFFF",
          colorTo: (d.products[0] ? chemColorMap.get(d.products[0]) : undefined) ?? "#A0A0A0",
          relatedChemicalId: d.products[0],
        };

    addReaction({
      id: d.id,
      name: d.name,
      reactionType: "single_displacement",
      reactants: d.reactants,
      products: d.products,
      enthalpyKjPerMol: d.enthalpy,
      temperatureMinC: 20,
      temperatureMaxC: d.enthalpy > 0 ? 800 : 150,
      observableEffects: [eff],
      safetyNotes: "Redox single displacement reaction; handle metals, acids, and heating apparatus with standard PPE.",
    });
  }
}
