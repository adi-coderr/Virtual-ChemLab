import { addReaction } from "./generate1000Reactions.js";
import type { SeedObservableEffect } from "../reactions.js";

export function buildDomain6Combustion(): void {
  // Domain 6: 110 Curated Combustion Reactions
  const list = [
  {
    "id": "comb-comp-c2h6",
    "name": "Complete combustion of ethane",
    "reactants": [
      "c2h6",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -1560.7,
    "desc": "Ethane burns cleanly with a faint blue flame releasing carbon dioxide and water vapor."
  },
  {
    "id": "comb-comp-c5h12",
    "name": "Complete combustion of pentane",
    "reactants": [
      "c5h12",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -3535,
    "desc": "Volatile liquid pentane vapor burns with a hot yellow-tipped flame."
  },
  {
    "id": "comb-comp-c6h14",
    "name": "Complete combustion of hexane",
    "reactants": [
      "c6h14",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -4163,
    "desc": "Clean exothermic combustion of volatile hexane solvent."
  },
  {
    "id": "comb-comp-c7h16",
    "name": "Complete combustion of heptane (zero octane standard)",
    "reactants": [
      "c7h16",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -4817,
    "desc": "Heptane burns steadily with a bright luminous flame."
  },
  {
    "id": "comb-comp-c9h20",
    "name": "Complete combustion of nonane",
    "reactants": [
      "c9h20",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -6125,
    "desc": "Combustion of kerosene-fraction nonane."
  },
  {
    "id": "comb-comp-c10h22",
    "name": "Complete combustion of decane",
    "reactants": [
      "c10h22",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -6778,
    "desc": "Combustion of aviation fuel hydrocarbon decane."
  },
  {
    "id": "comb-comp-c12h26",
    "name": "Complete combustion of dodecane",
    "reactants": [
      "c12h26",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -8086,
    "desc": "Steady burning of diesel surrogate paraffin dodecane."
  },
  {
    "id": "comb-comp-c16h34",
    "name": "Complete combustion of hexadecane (cetane)",
    "reactants": [
      "c16h34",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -10700,
    "desc": "High-enthalpy combustion of heavy liquid paraffin cetane."
  },
  {
    "id": "comb-comp-c5h10",
    "name": "Complete combustion of cyclopentane",
    "reactants": [
      "c5h10",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -3291,
    "desc": "Cycloalkane burns with a luminous flame."
  },
  {
    "id": "comb-comp-c6h12",
    "name": "Complete combustion of cyclohexane",
    "reactants": [
      "c6h12",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -3920,
    "desc": "Cyclohexane vapor burns with a bright yellow flame."
  },
  {
    "id": "comb-comp-c3h6",
    "name": "Complete combustion of propylene",
    "reactants": [
      "c3h6",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -2058,
    "desc": "Luminous flame of propylene burning in air."
  },
  {
    "id": "comb-comp-c4h8",
    "name": "Complete combustion of 1-butene",
    "reactants": [
      "c4h8",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -2717,
    "desc": "Butene gas burns with a bright yellow-orange flame."
  },
  {
    "id": "comb-comp-c6h10",
    "name": "Complete combustion of cyclohexene",
    "reactants": [
      "c6h10",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -3750,
    "desc": "Cycloalkene burns with a luminous, slightly sooty yellow flame."
  },
  {
    "id": "comb-comp-c3h4",
    "name": "Complete combustion of propyne (MAPP gas)",
    "reactants": [
      "c3h4",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -1938,
    "desc": "High-temperature flame of propyne burning intensely in oxygen."
  },
  {
    "id": "comb-comp-c4h6",
    "name": "Complete combustion of 1-butyne",
    "reactants": [
      "c4h6",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -2596,
    "desc": "Butyne burns with a bright, energetic flame."
  },
  {
    "id": "comb-comp-c6h6",
    "name": "Complete combustion of benzene",
    "reactants": [
      "c6h6",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -3267,
    "desc": "Benzene burns in excess oxygen with an intense hot flame."
  },
  {
    "id": "comb-comp-c7h8",
    "name": "Complete combustion of toluene",
    "reactants": [
      "c7h8",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -3910,
    "desc": "Toluene vapor burns vigorously with a bright flame."
  },
  {
    "id": "comb-comp-c8h10",
    "name": "Complete combustion of ethylbenzene",
    "reactants": [
      "c8h10",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -4565,
    "desc": "Combustion of ethylbenzene in excess oxygen."
  },
  {
    "id": "comb-comp-c8h10_xyl",
    "name": "Complete combustion of o-xylene",
    "reactants": [
      "c8h10_xyl",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -4552,
    "desc": "Xylene burns energetically yielding carbon dioxide and steam."
  },
  {
    "id": "comb-comp-c10h8",
    "name": "Complete combustion of naphthalene (mothballs)",
    "reactants": [
      "c10h8",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -5157,
    "desc": "Solid naphthalene sublimes and combusts with an intense brilliant flame."
  },
  {
    "id": "comb-comp-c14h10",
    "name": "Complete combustion of anthracene",
    "reactants": [
      "c14h10",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -7061,
    "desc": "Tricyclic aromatic hydrocarbon combusts completely in oxygen."
  },
  {
    "id": "comb-comp-c8h8",
    "name": "Complete combustion of styrene",
    "reactants": [
      "c8h8",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -4395,
    "desc": "Styrene monomer burns with an intense luminous flame."
  },
  {
    "id": "comb-comp-c3h8o",
    "name": "Complete combustion of 1-propanol",
    "reactants": [
      "c3h8o",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -2021,
    "desc": "Propanol burns cleanly with a bright blue-yellow flame."
  },
  {
    "id": "comb-comp-c4h10o",
    "name": "Complete combustion of 1-butanol",
    "reactants": [
      "c4h10o",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -2676,
    "desc": "Butanol burns with a steady warm flame."
  },
  {
    "id": "comb-comp-c4h10o_tert",
    "name": "Complete combustion of tert-butanol",
    "reactants": [
      "c4h10o_tert",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -2644,
    "desc": "Tert-butanol burns with a clean luminous flame."
  },
  {
    "id": "comb-comp-c5h12o",
    "name": "Complete combustion of 1-pentanol",
    "reactants": [
      "c5h12o",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -3331,
    "desc": "Liquid pentanol burns steadily."
  },
  {
    "id": "comb-comp-c5h12o_iso",
    "name": "Complete combustion of isoamyl alcohol",
    "reactants": [
      "c5h12o_iso",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -3320,
    "desc": "Isoamyl alcohol burns with a steady flame."
  },
  {
    "id": "comb-comp-c2h6o2",
    "name": "Complete combustion of ethylene glycol",
    "reactants": [
      "c2h6o2",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -1180,
    "desc": "Antifreeze diol burns with a clear blue flame."
  },
  {
    "id": "comb-comp-c3h8o3",
    "name": "Complete combustion of glycerol",
    "reactants": [
      "c3h8o3",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -1655,
    "desc": "Viscous glycerol burns at high temperature yielding carbon dioxide and steam."
  },
  {
    "id": "comb-comp-c6h6o",
    "name": "Complete combustion of phenol",
    "reactants": [
      "c6h6o",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -3053,
    "desc": "Phenol combusts in oxygen releasing carbon dioxide and water."
  },
  {
    "id": "comb-comp-c2h6o_ether",
    "name": "Complete combustion of dimethyl ether",
    "reactants": [
      "c2h6o_ether",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -1460,
    "desc": "Clean-burning aerosol propellant burns with a soot-free blue flame."
  },
  {
    "id": "comb-comp-c4h10o_ether",
    "name": "Complete combustion of diethyl ether",
    "reactants": [
      "c4h10o_ether",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -2726,
    "desc": "Highly volatile diethyl ether burns rapidly with a luminous flame."
  },
  {
    "id": "comb-comp-c4h8o_thf",
    "name": "Complete combustion of tetrahydrofuran (THF)",
    "reactants": [
      "c4h8o_thf",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -2500,
    "desc": "THF burns with a clear, hot flame."
  },
  {
    "id": "comb-comp-c4h8o2_diox",
    "name": "Complete combustion of 1,4-dioxane",
    "reactants": [
      "c4h8o2_diox",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -2410,
    "desc": "Dioxane solvent burns cleanly in excess oxygen."
  },
  {
    "id": "comb-comp-c3h6o_ald",
    "name": "Complete combustion of propionaldehyde",
    "reactants": [
      "c3h6o_ald",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -1820,
    "desc": "Propionaldehyde burns yielding carbon dioxide and water."
  },
  {
    "id": "comb-comp-c4h8o_ald",
    "name": "Complete combustion of butyraldehyde",
    "reactants": [
      "c4h8o_ald",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -2470,
    "desc": "Butyraldehyde burns with a warm luminous flame."
  },
  {
    "id": "comb-comp-ch3coch3",
    "name": "Complete combustion of acetone",
    "reactants": [
      "ch3coch3",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -1790,
    "desc": "Acetone solvent burns with a bright, crackling yellow flame."
  },
  {
    "id": "comb-comp-c4h8o_mek",
    "name": "Complete combustion of methyl ethyl ketone (MEK)",
    "reactants": [
      "c4h8o_mek",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -2444,
    "desc": "MEK burns with a luminous orange-tipped flame."
  },
  {
    "id": "comb-comp-c5h8o",
    "name": "Complete combustion of cyclopentanone",
    "reactants": [
      "c5h8o",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -3080,
    "desc": "Cyclic ketone burns with a bright flame."
  },
  {
    "id": "comb-comp-c6h10o",
    "name": "Complete combustion of cyclohexanone",
    "reactants": [
      "c6h10o",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -3720,
    "desc": "Cyclohexanone burns smoothly in excess oxygen."
  },
  {
    "id": "comb-comp-c2h4o2_est",
    "name": "Complete combustion of methyl formate",
    "reactants": [
      "c2h4o2_est",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -973,
    "desc": "Methyl formate burns with a clear blue flame."
  },
  {
    "id": "comb-comp-c3h6o2_est",
    "name": "Complete combustion of methyl acetate",
    "reactants": [
      "c3h6o2_est",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -1592,
    "desc": "Methyl acetate burns with a pale, smokeless blue flame."
  },
  {
    "id": "comb-comp-c3h6o2_etf",
    "name": "Complete combustion of ethyl formate",
    "reactants": [
      "c3h6o2_etf",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -1620,
    "desc": "Ethyl formate burns with a clear flame."
  },
  {
    "id": "comb-comp-ch3cooc2h5",
    "name": "Complete combustion of ethyl acetate",
    "reactants": [
      "ch3cooc2h5",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -2238,
    "desc": "Ethyl acetate burns with a luminous, slightly yellow flame."
  },
  {
    "id": "comb-comp-c5h10o2",
    "name": "Complete combustion of propyl acetate",
    "reactants": [
      "c5h10o2",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -2890,
    "desc": "Propyl acetate burns with a steady bright flame."
  },
  {
    "id": "comb-comp-c6h12o2",
    "name": "Complete combustion of butyl acetate",
    "reactants": [
      "c6h12o2",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -3540,
    "desc": "Butyl acetate burns with a luminous flame."
  },
  {
    "id": "comb-comp-c7h14o2",
    "name": "Complete combustion of isoamyl acetate",
    "reactants": [
      "c7h14o2",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -4190,
    "desc": "Banana oil ester burns with a bright, luminous flame."
  },
  {
    "id": "comb-comp-c8h8o2",
    "name": "Complete combustion of methyl benzoate",
    "reactants": [
      "c8h8o2",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -3960,
    "desc": "Aromatic ester burns with a bright yellow flame."
  },
  {
    "id": "comb-comp-c9h10o2",
    "name": "Complete combustion of ethyl benzoate",
    "reactants": [
      "c9h10o2",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -4610,
    "desc": "Ethyl benzoate burns energetically in excess oxygen."
  },
  {
    "id": "comb-comp-c8h8o3",
    "name": "Complete combustion of methyl salicylate",
    "reactants": [
      "c8h8o3",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -4020,
    "desc": "Wintergreen oil combusts releasing carbon dioxide and steam."
  },
  {
    "id": "comb-comp-hcooh",
    "name": "Complete combustion of formic acid",
    "reactants": [
      "hcooh",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -255,
    "desc": "Formic acid vapor burns with a pale blue flame."
  },
  {
    "id": "comb-comp-ch3cooh",
    "name": "Complete combustion of acetic acid",
    "reactants": [
      "ch3cooh",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -874,
    "desc": "Glacial acetic acid burns with a blue, smokeless flame."
  },
  {
    "id": "comb-comp-c2h5cooh",
    "name": "Complete combustion of propionic acid",
    "reactants": [
      "c2h5cooh",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -1527,
    "desc": "Propionic acid burns with a luminous blue flame."
  },
  {
    "id": "comb-comp-c3h7cooh",
    "name": "Complete combustion of butyric acid",
    "reactants": [
      "c3h7cooh",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -2183,
    "desc": "Butyric acid burns with a luminous flame."
  },
  {
    "id": "comb-comp-c4h9cooh",
    "name": "Complete combustion of valeric acid",
    "reactants": [
      "c4h9cooh",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -2838,
    "desc": "Valeric acid burns steadily."
  },
  {
    "id": "comb-comp-c6h5cooh",
    "name": "Complete combustion of benzoic acid",
    "reactants": [
      "c6h5cooh",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -3227,
    "desc": "Benzoic acid crystals burn with a brilliant, luminous flame."
  },
  {
    "id": "comb-comp-c7h6o3",
    "name": "Complete combustion of salicylic acid",
    "reactants": [
      "c7h6o3",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -3026,
    "desc": "Salicylic acid needle crystals combust in excess oxygen."
  },
  {
    "id": "comb-comp-c3h6o3",
    "name": "Complete combustion of lactic acid",
    "reactants": [
      "c3h6o3",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -1344,
    "desc": "Lactic acid burns cleanly forming carbon dioxide and water."
  },
  {
    "id": "comb-comp-c6h8o7",
    "name": "Complete combustion of citric acid",
    "reactants": [
      "c6h8o7",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -1960,
    "desc": "Citric acid crystals melt and combust releasing steam and CO2."
  },
  {
    "id": "comb-comp-c4h6o6",
    "name": "Complete combustion of tartaric acid",
    "reactants": [
      "c4h6o6",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -1155,
    "desc": "Tartaric acid combusts completely in oxygen."
  },
  {
    "id": "comb-comp-c3h4o4",
    "name": "Complete combustion of malonic acid",
    "reactants": [
      "c3h4o4",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -865,
    "desc": "Malonic acid combusts yielding carbon dioxide and water."
  },
  {
    "id": "comb-comp-c4h6o4",
    "name": "Complete combustion of succinic acid",
    "reactants": [
      "c4h6o4",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -1491,
    "desc": "Succinic acid burns with a clean flame."
  },
  {
    "id": "comb-comp-c6h10o4",
    "name": "Complete combustion of adipic acid",
    "reactants": [
      "c6h10o4",
      "o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -2800,
    "desc": "Adipic acid nylon precursor burns cleanly."
  },
  {
    "id": "comb-comp-ch4n2o",
    "name": "Combustion of urea in oxygen",
    "reactants": [
      "ch4n2o",
      "o2"
    ],
    "products": [
      "co2",
      "water",
      "n2"
    ],
    "enthalpy": -632,
    "desc": "Urea decomposes and combusts releasing carbon dioxide, water, and nitrogen gas."
  },
  {
    "id": "comb-comp-cs2",
    "name": "Combustion of carbon disulfide",
    "reactants": [
      "cs2",
      "o2"
    ],
    "products": [
      "co2",
      "so2"
    ],
    "enthalpy": -1075,
    "desc": "Extremely flammable CS2 burns with a brilliant eerie blue flame producing choking SO2."
  },
  {
    "id": "comb-comp-c2h6s",
    "name": "Combustion of ethanethiol",
    "reactants": [
      "c2h6s",
      "o2"
    ],
    "products": [
      "co2",
      "water",
      "so2"
    ],
    "enthalpy": -1880,
    "desc": "Ethanethiol burns with a blue flame releasing carbon dioxide, water, and sulfur dioxide."
  },
  {
    "id": "comb-comp-c4h4s",
    "name": "Combustion of thiophene",
    "reactants": [
      "c4h4s",
      "o2"
    ],
    "products": [
      "co2",
      "water",
      "so2"
    ],
    "enthalpy": -2800,
    "desc": "Thiophene burns with a smoky flame producing sulfur dioxide."
  },
  {
    "id": "comb-comp-c2h3n",
    "name": "Combustion of acetonitrile",
    "reactants": [
      "c2h3n",
      "o2"
    ],
    "products": [
      "co2",
      "water",
      "n2"
    ],
    "enthalpy": -1250,
    "desc": "Acetonitrile burns with a luminous flame releasing carbon dioxide, water, and nitrogen."
  },
  {
    "id": "comb-comp-ch3no2",
    "name": "Combustion of nitromethane",
    "reactants": [
      "ch3no2",
      "o2"
    ],
    "products": [
      "co2",
      "water",
      "n2"
    ],
    "enthalpy": -709,
    "desc": "Top fuel drag racing nitromethane burns with an intense, violent flame."
  },
  {
    "id": "comb-comp-ch3nh2",
    "name": "Combustion of methylamine",
    "reactants": [
      "ch3nh2",
      "o2"
    ],
    "products": [
      "co2",
      "water",
      "n2"
    ],
    "enthalpy": -1085,
    "desc": "Methylamine gas burns with a yellow flame producing nitrogen, CO2, and water."
  },
  {
    "id": "comb-comp-c2h5nh2",
    "name": "Combustion of ethylamine",
    "reactants": [
      "c2h5nh2",
      "o2"
    ],
    "products": [
      "co2",
      "water",
      "n2"
    ],
    "enthalpy": -1710,
    "desc": "Ethylamine vapor burns with a luminous flame."
  },
  {
    "id": "comb-comp-c6h7n",
    "name": "Combustion of aniline",
    "reactants": [
      "c6h7n",
      "o2"
    ],
    "products": [
      "co2",
      "water",
      "n2"
    ],
    "enthalpy": -3392,
    "desc": "Aniline burns with a smoky yellow flame."
  },
  {
    "id": "comb-comp-c5h5n",
    "name": "Combustion of pyridine",
    "reactants": [
      "c5h5n",
      "o2"
    ],
    "products": [
      "co2",
      "water",
      "n2"
    ],
    "enthalpy": -2782,
    "desc": "Pyridine burns with a luminous, sooty flame."
  },
  {
    "id": "comb-n2o-ch4",
    "name": "Combustion of methane with nitrous oxide",
    "reactants": [
      "ch4",
      "n2o"
    ],
    "products": [
      "co2",
      "water",
      "n2"
    ],
    "enthalpy": -1050,
    "desc": "High-temperature rocketry combustion of methane with N2O."
  },
  {
    "id": "comb-n2o-c2h6",
    "name": "Combustion of ethane with nitrous oxide",
    "reactants": [
      "c2h6",
      "n2o"
    ],
    "products": [
      "co2",
      "water",
      "n2"
    ],
    "enthalpy": -1760,
    "desc": "Ethane burns vigorously in nitrous oxide atmosphere."
  },
  {
    "id": "comb-n2o-propane",
    "name": "Combustion of propane with nitrous oxide",
    "reactants": [
      "propane",
      "n2o"
    ],
    "products": [
      "co2",
      "water",
      "n2"
    ],
    "enthalpy": -2480,
    "desc": "Propane gas burns with an intense, howling flame in N2O."
  },
  {
    "id": "comb-n2o-c4h10",
    "name": "Combustion of butane with nitrous oxide",
    "reactants": [
      "c4h10",
      "n2o"
    ],
    "products": [
      "co2",
      "water",
      "n2"
    ],
    "enthalpy": -3200,
    "desc": "Butane burns violently in nitrous oxide gas."
  },
  {
    "id": "comb-n2o-c2h4",
    "name": "Combustion of ethylene with nitrous oxide",
    "reactants": [
      "c2h4",
      "n2o"
    ],
    "products": [
      "co2",
      "water",
      "n2"
    ],
    "enthalpy": -1680,
    "desc": "Ethylene burns with a blinding hot flame in nitrous oxide."
  },
  {
    "id": "comb-n2o-c2h2",
    "name": "Combustion of acetylene with nitrous oxide",
    "reactants": [
      "c2h2",
      "n2o"
    ],
    "products": [
      "co2",
      "water",
      "n2"
    ],
    "enthalpy": -1420,
    "desc": "Incandescent oxy-nitrous flame reaching temperatures above 3000°C."
  },
  {
    "id": "comb-n2o-c6h6",
    "name": "Combustion of benzene with nitrous oxide",
    "reactants": [
      "c6h6",
      "n2o"
    ],
    "products": [
      "co2",
      "water",
      "n2"
    ],
    "enthalpy": -3550,
    "desc": "Benzene vapor combusts violently in nitrous oxide."
  },
  {
    "id": "comb-n2o-h2",
    "name": "Combustion of hydrogen with nitrous oxide",
    "reactants": [
      "h2",
      "n2o"
    ],
    "products": [
      "water",
      "n2"
    ],
    "enthalpy": -324,
    "desc": "Hydrogen ignites with an audible bark/detonation in nitrous oxide."
  },
  {
    "id": "comb-n2o-c",
    "name": "Combustion of carbon with nitrous oxide",
    "reactants": [
      "c",
      "n2o"
    ],
    "products": [
      "co2",
      "n2"
    ],
    "enthalpy": -550,
    "desc": "Incandescent carbon burns in nitrous oxide releasing CO2 and nitrogen."
  },
  {
    "id": "comb-n2o-ch3oh",
    "name": "Combustion of methanol with nitrous oxide",
    "reactants": [
      "ch3oh",
      "n2o"
    ],
    "products": [
      "co2",
      "water",
      "n2"
    ],
    "enthalpy": -890,
    "desc": "Methanol fuel burns rapidly in nitrous oxide oxidizer."
  },
  {
    "id": "comb-n2o-c2h5oh",
    "name": "Combustion of ethanol with nitrous oxide",
    "reactants": [
      "c2h5oh",
      "n2o"
    ],
    "products": [
      "co2",
      "water",
      "n2"
    ],
    "enthalpy": -1540,
    "desc": "Ethanol burns with a hot, luminous flame in nitrous oxide."
  },
  {
    "id": "comb-n2o-al",
    "name": "Incendiary combustion of aluminium in nitrous oxide",
    "reactants": [
      "al",
      "n2o"
    ],
    "products": [
      "al2o3",
      "n2"
    ],
    "enthalpy": -1880,
    "desc": "Aluminium powder burns with a brilliant white flash in N2O."
  },
  {
    "id": "comb-n2o-zn",
    "name": "Combustion of zinc in nitrous oxide",
    "reactants": [
      "zn",
      "n2o"
    ],
    "products": [
      "zno",
      "n2"
    ],
    "enthalpy": -430,
    "desc": "Zinc burns with a bluish flame in nitrous oxide gas."
  },
  {
    "id": "comb-n2o-fe",
    "name": "Combustion of iron in nitrous oxide",
    "reactants": [
      "fe",
      "n2o"
    ],
    "products": [
      "fe2o3",
      "n2"
    ],
    "enthalpy": -950,
    "desc": "Glowing iron wire sparks furiously in nitrous oxide."
  },
  {
    "id": "comb-n2o-cu",
    "name": "Oxidation of copper in nitrous oxide",
    "reactants": [
      "cu",
      "n2o"
    ],
    "products": [
      "cuo",
      "n2"
    ],
    "enthalpy": -220,
    "desc": "Copper oxidizes at red heat in nitrous oxide stream."
  },
  {
    "id": "comb-n2o-ti",
    "name": "Combustion of titanium in nitrous oxide",
    "reactants": [
      "ti",
      "n2o"
    ],
    "products": [
      "tio2",
      "n2"
    ],
    "enthalpy": -1100,
    "desc": "Titanium burns with dazzling white brilliance in N2O."
  },
  {
    "id": "comb-n2o-mg",
    "name": "Combustion of magnesium in nitrous oxide",
    "reactants": [
      "mg",
      "n2o"
    ],
    "products": [
      "mgo",
      "n2"
    ],
    "enthalpy": -680,
    "desc": "Magnesium ribbon burns vigorously in laughing gas."
  },
  {
    "id": "comb-hal-al-cl2",
    "name": "Combustion of aluminium in chlorine gas",
    "reactants": [
      "al",
      "cl2"
    ],
    "products": [
      "alcl3"
    ],
    "enthalpy": -704,
    "desc": "Aluminium foil ignites spontaneously with a brilliant flash forming white AlCl3 smoke."
  },
  {
    "id": "comb-hal-zn-cl2",
    "name": "Combustion of zinc in chlorine gas",
    "reactants": [
      "zn",
      "cl2"
    ],
    "products": [
      "zncl2"
    ],
    "enthalpy": -415,
    "desc": "Zinc burns with a pale whitish flame forming zinc chloride."
  },
  {
    "id": "comb-hal-fe-cl2",
    "name": "Combustion of iron in dry chlorine gas",
    "reactants": [
      "fe",
      "cl2"
    ],
    "products": [
      "fecl3"
    ],
    "enthalpy": -399.5,
    "desc": "Glowing iron wire bursts into a voluminous reddish-brown cloud of ferric chloride."
  },
  {
    "id": "comb-hal-cu-cl2",
    "name": "Combustion of copper foil in chlorine gas",
    "reactants": [
      "cu",
      "cl2"
    ],
    "products": [
      "cucl2"
    ],
    "enthalpy": -220.1,
    "desc": "Red-hot copper burns with a dazzling green flame forming brown copper(II) chloride."
  },
  {
    "id": "comb-hal-ni-cl2",
    "name": "Combustion of nickel in chlorine gas",
    "reactants": [
      "ni",
      "cl2"
    ],
    "products": [
      "nicl2"
    ],
    "enthalpy": -305.3,
    "desc": "Nickel powder glows at red heat in chlorine forming yellow anhydrous NiCl2."
  },
  {
    "id": "comb-hal-sn-cl2",
    "name": "Combustion of tin in chlorine gas",
    "reactants": [
      "sn",
      "cl2"
    ],
    "products": [
      "sncl4"
    ],
    "enthalpy": -511.3,
    "desc": "Tin melts and burns exothermically forming fuming liquid tin(IV) chloride."
  },
  {
    "id": "comb-hal-pb-cl2",
    "name": "Combustion of lead in chlorine gas",
    "reactants": [
      "pb",
      "cl2"
    ],
    "products": [
      "pbcl2"
    ],
    "enthalpy": -359.4,
    "desc": "Molten lead burns slowly in chlorine forming white lead(II) chloride."
  },
  {
    "id": "comb-hal-cr-cl2",
    "name": "Combustion of chromium in chlorine gas",
    "reactants": [
      "cr",
      "cl2"
    ],
    "products": [
      "crcl3"
    ],
    "enthalpy": -556.5,
    "desc": "Chromium burns at 600°C forming lustrous violet flakes of anhydrous CrCl3."
  },
  {
    "id": "comb-hal-mn-cl2",
    "name": "Combustion of manganese in chlorine gas",
    "reactants": [
      "mn",
      "cl2"
    ],
    "products": [
      "mncl2"
    ],
    "enthalpy": -481.3,
    "desc": "Manganese burns forming pink anhydrous manganese(II) chloride."
  },
  {
    "id": "comb-hal-ti-cl2",
    "name": "High-temperature chlorination of titanium metal",
    "reactants": [
      "ti",
      "cl2"
    ],
    "products": [
      "ticl4"
    ],
    "enthalpy": -804.2,
    "desc": "Titanium burns violently at 450°C forming volatile liquid titanium tetrachloride."
  },
  {
    "id": "comb-hal-bi-cl2",
    "name": "Combustion of bismuth in chlorine gas",
    "reactants": [
      "bi",
      "cl2"
    ],
    "products": [
      "bicl3"
    ],
    "enthalpy": -379,
    "desc": "Bismuth burns with a bluish flame forming white bismuth(III) chloride."
  },
  {
    "id": "comb-hal-cd-cl2",
    "name": "Combustion of cadmium in chlorine gas",
    "reactants": [
      "cd",
      "cl2"
    ],
    "products": [
      "cdcl2"
    ],
    "enthalpy": -391.5,
    "desc": "Molten cadmium burns steadily in chlorine."
  },
  {
    "id": "comb-hal-co-cl2",
    "name": "Combustion of cobalt in chlorine gas",
    "reactants": [
      "cobalt-metal",
      "cl2"
    ],
    "products": [
      "cocl2"
    ],
    "enthalpy": -312.5,
    "desc": "Cobalt glows at red heat in chlorine forming pale blue anhydrous CoCl2."
  },
  {
    "id": "comb-hal-al-br2",
    "name": "Incendiary reaction of aluminium with liquid bromine",
    "reactants": [
      "al",
      "br2"
    ],
    "products": [
      "albr3"
    ],
    "enthalpy": -527.2,
    "desc": "Aluminium foil skitters across liquid bromine bursting into fierce white flame and red smoke."
  },
  {
    "id": "comb-hal-zn-br2",
    "name": "Combustion of zinc in bromine vapor",
    "reactants": [
      "zn",
      "br2"
    ],
    "products": [
      "znbr2"
    ],
    "enthalpy": -328.7,
    "desc": "Zinc burns vigorously in dense amber bromine vapor."
  },
  {
    "id": "comb-hal-fe-br2",
    "name": "Combustion of iron in bromine vapor",
    "reactants": [
      "fe",
      "br2"
    ],
    "products": [
      "febr2"
    ],
    "enthalpy": -249.8,
    "desc": "Red-hot iron wire burns in bromine vapor forming iron(II) bromide."
  },
  {
    "id": "comb-hal-cu-br2",
    "name": "Combustion of copper in bromine vapor",
    "reactants": [
      "cu",
      "br2"
    ],
    "products": [
      "cubr2"
    ],
    "enthalpy": -141.8,
    "desc": "Hot copper burns with a green flame in bromine vapor."
  },
  {
    "id": "comb-hal-ni-br2",
    "name": "Reaction of nickel with bromine vapor",
    "reactants": [
      "ni",
      "br2"
    ],
    "products": [
      "nibr2"
    ],
    "enthalpy": -212,
    "desc": "Heated nickel burns in bromine forming yellow-brown NiBr2."
  },
  {
    "id": "comb-hal-cd-br2",
    "name": "Combustion of cadmium in bromine vapor",
    "reactants": [
      "cd",
      "br2"
    ],
    "products": [
      "cdbr2"
    ],
    "enthalpy": -316,
    "desc": "Cadmium metal combusts in bromine vapor."
  },
  {
    "id": "comb-hal-co-br2",
    "name": "Reaction of cobalt with bromine vapor",
    "reactants": [
      "cobalt-metal",
      "br2"
    ],
    "products": [
      "cobr2"
    ],
    "enthalpy": -221,
    "desc": "Cobalt metal burns in bromine forming green anhydrous CoBr2."
  }
];

  for (const d of list) {
    const isGasProd = d.products.includes("co2") || d.products.includes("so2") || d.products.includes("n2");
    const eff: SeedObservableEffect = isGasProd
      ? {
          type: "gas_evolution",
          description: d.desc,
          relatedChemicalId: d.products.find(p => ["co2", "so2", "n2"].includes(p)),
        }
      : {
          type: "color_change",
          description: d.desc,
          colorFrom: "#C0C0C0",
          colorTo: "#FFFFFF",
          relatedChemicalId: d.products[0],
        };

    addReaction({
      id: d.id,
      name: d.name,
      reactionType: "combustion",
      reactants: d.reactants,
      products: d.products,
      enthalpyKjPerMol: d.enthalpy,
      temperatureMinC: 250,
      temperatureMaxC: 1500,
      observableEffects: [eff],
      safetyNotes: "Violent exothermic combustion / oxidation reaction; extreme heat, fire, and thermal burn hazard. Wear flame-resistant PPE.",
    });
  }
}
