import { addReaction } from "./generate1000Reactions.js";
import type { SeedObservableEffect } from "../reactions.js";

export function buildDomain5Organic(): void {
  // Domain 5: 110 Curated Organic Chemistry Reactions
  const list = [
  {
    "id": "org-est-hcooh-ch3oh",
    "name": "Fischer esterification of formic acid with methanol",
    "reactants": [
      "hcooh",
      "ch3oh"
    ],
    "products": [
      "c2h4o2_est",
      "water"
    ],
    "enthalpy": -12,
    "desc": "Pleasant ethereal fruity aroma of methyl formate develops."
  },
  {
    "id": "org-est-hcooh-c2h5oh",
    "name": "Fischer esterification of formic acid with ethanol",
    "reactants": [
      "hcooh",
      "c2h5oh"
    ],
    "products": [
      "c3h6o2_etf",
      "water"
    ],
    "enthalpy": -14,
    "desc": "Distinct fruity rum-like aroma of ethyl formate emerges."
  },
  {
    "id": "org-est-ch3cooh-ch3oh",
    "name": "Fischer esterification of acetic acid with methanol",
    "reactants": [
      "ch3cooh",
      "ch3oh"
    ],
    "products": [
      "c3h6o2_est",
      "water"
    ],
    "enthalpy": -15,
    "desc": "Sweet ester fragrance of methyl acetate forms."
  },
  {
    "id": "org-est-ch3cooh-c3h8o",
    "name": "Fischer esterification of acetic acid with 1-propanol",
    "reactants": [
      "ch3cooh",
      "c3h8o"
    ],
    "products": [
      "c5h10o2",
      "water"
    ],
    "enthalpy": -16,
    "desc": "Sweet pear-like aroma of propyl acetate evolves."
  },
  {
    "id": "org-est-ch3cooh-c4h10o",
    "name": "Fischer esterification of acetic acid with 1-butanol",
    "reactants": [
      "ch3cooh",
      "c4h10o"
    ],
    "products": [
      "c6h12o2",
      "water"
    ],
    "enthalpy": -17,
    "desc": "Fruity banana-apple aroma of butyl acetate develops."
  },
  {
    "id": "org-est-ch3cooh-c5h12o_iso",
    "name": "Synthesis of isoamyl acetate (banana oil)",
    "reactants": [
      "ch3cooh",
      "c5h12o_iso"
    ],
    "products": [
      "c7h14o2",
      "water"
    ],
    "enthalpy": -18,
    "desc": "Intense distinctive banana oil scent fills the vapor phase."
  },
  {
    "id": "org-est-c6h5cooh-ch3oh",
    "name": "Esterification of benzoic acid with methanol",
    "reactants": [
      "c6h5cooh",
      "ch3oh"
    ],
    "products": [
      "c8h8o2",
      "water"
    ],
    "enthalpy": -14,
    "desc": "Fruity feijoa-fragranced methyl benzoate forms."
  },
  {
    "id": "org-est-c6h5cooh-c2h5oh",
    "name": "Esterification of benzoic acid with ethanol",
    "reactants": [
      "c6h5cooh",
      "c2h5oh"
    ],
    "products": [
      "c9h10o2",
      "water"
    ],
    "enthalpy": -15,
    "desc": "Pleasant wintergreen-like fruity odor of ethyl benzoate develops."
  },
  {
    "id": "org-est-c7h6o3-ch3oh",
    "name": "Synthesis of methyl salicylate (oil of wintergreen)",
    "reactants": [
      "c7h6o3",
      "ch3oh"
    ],
    "products": [
      "c8h8o3",
      "water"
    ],
    "enthalpy": -16.5,
    "desc": "Characteristic medicinal scent of oil of wintergreen arises."
  },
  {
    "id": "org-sap-c2h4o2_est-naoh",
    "name": "Saponification of methyl formate with sodium hydroxide",
    "reactants": [
      "c2h4o2_est",
      "naoh"
    ],
    "products": [
      "hcoona",
      "ch3oh"
    ],
    "enthalpy": -65,
    "desc": "Fruity ester scent disappears as methyl formate is cleaved."
  },
  {
    "id": "org-sap-c2h4o2_est-koh",
    "name": "Saponification of methyl formate with potassium hydroxide",
    "reactants": [
      "c2h4o2_est",
      "koh"
    ],
    "products": [
      "hcook",
      "ch3oh"
    ],
    "enthalpy": -66,
    "desc": "Ester hydrolysis yielding potassium formate."
  },
  {
    "id": "org-sap-c3h6o2_etf-naoh",
    "name": "Saponification of ethyl formate with sodium hydroxide",
    "reactants": [
      "c3h6o2_etf",
      "naoh"
    ],
    "products": [
      "hcoona",
      "c2h5oh"
    ],
    "enthalpy": -68,
    "desc": "Rum scent fades into odorless sodium formate and ethanol."
  },
  {
    "id": "org-sap-c3h6o2_etf-koh",
    "name": "Saponification of ethyl formate with potassium hydroxide",
    "reactants": [
      "c3h6o2_etf",
      "koh"
    ],
    "products": [
      "hcook",
      "c2h5oh"
    ],
    "enthalpy": -69,
    "desc": "Hydrolysis yielding potassium formate and ethanol."
  },
  {
    "id": "org-sap-c3h6o2_est-naoh",
    "name": "Saponification of methyl acetate with sodium hydroxide",
    "reactants": [
      "c3h6o2_est",
      "naoh"
    ],
    "products": [
      "ch3coona",
      "ch3oh"
    ],
    "enthalpy": -72,
    "desc": "Exothermic alkaline cleavage of methyl acetate."
  },
  {
    "id": "org-sap-c3h6o2_est-koh",
    "name": "Saponification of methyl acetate with potassium hydroxide",
    "reactants": [
      "c3h6o2_est",
      "koh"
    ],
    "products": [
      "ch3cook",
      "ch3oh"
    ],
    "enthalpy": -73,
    "desc": "Alkaline hydrolysis yielding potassium acetate."
  },
  {
    "id": "org-sap-ch3cooc2h5-koh",
    "name": "Saponification of ethyl acetate with potassium hydroxide",
    "reactants": [
      "ch3cooc2h5",
      "koh"
    ],
    "products": [
      "ch3cook",
      "c2h5oh"
    ],
    "enthalpy": -76,
    "desc": "Cleavage into potassium acetate and ethanol."
  },
  {
    "id": "org-sap-c5h10o2-naoh",
    "name": "Saponification of propyl acetate with sodium hydroxide",
    "reactants": [
      "c5h10o2",
      "naoh"
    ],
    "products": [
      "ch3coona",
      "c3h8o"
    ],
    "enthalpy": -73,
    "desc": "Pear aroma fades yielding sodium acetate and propanol."
  },
  {
    "id": "org-sap-c5h10o2-koh",
    "name": "Saponification of propyl acetate with potassium hydroxide",
    "reactants": [
      "c5h10o2",
      "koh"
    ],
    "products": [
      "ch3cook",
      "c3h8o"
    ],
    "enthalpy": -74,
    "desc": "Hydrolysis yielding potassium acetate and propanol."
  },
  {
    "id": "org-sap-c6h12o2-naoh",
    "name": "Saponification of butyl acetate with sodium hydroxide",
    "reactants": [
      "c6h12o2",
      "naoh"
    ],
    "products": [
      "ch3coona",
      "c4h10o"
    ],
    "enthalpy": -72,
    "desc": "Banana scent fades into sodium acetate and 1-butanol."
  },
  {
    "id": "org-sap-c6h12o2-koh",
    "name": "Saponification of butyl acetate with potassium hydroxide",
    "reactants": [
      "c6h12o2",
      "koh"
    ],
    "products": [
      "ch3cook",
      "c4h10o"
    ],
    "enthalpy": -73,
    "desc": "Hydrolysis yielding potassium acetate and 1-butanol."
  },
  {
    "id": "org-sap-c7h14o2-naoh",
    "name": "Saponification of isoamyl acetate with sodium hydroxide",
    "reactants": [
      "c7h14o2",
      "naoh"
    ],
    "products": [
      "ch3coona",
      "c5h12o_iso"
    ],
    "enthalpy": -71,
    "desc": "Banana oil aroma fades into sodium acetate and isoamyl alcohol."
  },
  {
    "id": "org-sap-c7h14o2-koh",
    "name": "Saponification of isoamyl acetate with potassium hydroxide",
    "reactants": [
      "c7h14o2",
      "koh"
    ],
    "products": [
      "ch3cook",
      "c5h12o_iso"
    ],
    "enthalpy": -72,
    "desc": "Hydrolysis yielding potassium acetate."
  },
  {
    "id": "org-sap-c8h8o2-naoh",
    "name": "Saponification of methyl benzoate with sodium hydroxide",
    "reactants": [
      "c8h8o2",
      "naoh"
    ],
    "products": [
      "c6h5coona",
      "ch3oh"
    ],
    "enthalpy": -68,
    "desc": "Aromatic ester cleaved into soluble sodium benzoate."
  },
  {
    "id": "org-sap-c8h8o2-koh",
    "name": "Saponification of methyl benzoate with potassium hydroxide",
    "reactants": [
      "c8h8o2",
      "koh"
    ],
    "products": [
      "c6h5cook",
      "ch3oh"
    ],
    "enthalpy": -69,
    "desc": "Hydrolysis yielding potassium benzoate."
  },
  {
    "id": "org-sap-c9h10o2-naoh",
    "name": "Saponification of ethyl benzoate with sodium hydroxide",
    "reactants": [
      "c9h10o2",
      "naoh"
    ],
    "products": [
      "c6h5coona",
      "c2h5oh"
    ],
    "enthalpy": -67,
    "desc": "Cleavage into sodium benzoate and ethanol."
  },
  {
    "id": "org-sap-c9h10o2-koh",
    "name": "Saponification of ethyl benzoate with potassium hydroxide",
    "reactants": [
      "c9h10o2",
      "koh"
    ],
    "products": [
      "c6h5cook",
      "c2h5oh"
    ],
    "enthalpy": -68,
    "desc": "Cleavage into potassium benzoate and ethanol."
  },
  {
    "id": "org-hyd-c2h4o2_est-water",
    "name": "Acid-catalyzed hydrolysis of methyl formate",
    "reactants": [
      "c2h4o2_est",
      "water"
    ],
    "products": [
      "hcooh",
      "ch3oh"
    ],
    "enthalpy": 12,
    "desc": "Reversible hydrolysis restoring formic acid and methanol."
  },
  {
    "id": "org-hyd-c3h6o2_etf-water",
    "name": "Hydrolysis of ethyl formate",
    "reactants": [
      "c3h6o2_etf",
      "water"
    ],
    "products": [
      "hcooh",
      "c2h5oh"
    ],
    "enthalpy": 14,
    "desc": "Hydrolysis restoring formic acid and ethanol."
  },
  {
    "id": "org-hyd-c3h6o2_est-water",
    "name": "Hydrolysis of methyl acetate",
    "reactants": [
      "c3h6o2_est",
      "water"
    ],
    "products": [
      "ch3cooh",
      "ch3oh"
    ],
    "enthalpy": 15,
    "desc": "Equilibrium hydrolysis forming acetic acid and methanol."
  },
  {
    "id": "org-hyd-ch3cooc2h5-water",
    "name": "Hydrolysis of ethyl acetate",
    "reactants": [
      "ch3cooc2h5",
      "water"
    ],
    "products": [
      "ch3cooh",
      "c2h5oh"
    ],
    "enthalpy": 15.5,
    "desc": "Equilibrium cleavage into acetic acid and ethanol."
  },
  {
    "id": "org-hyd-c5h10o2-water",
    "name": "Hydrolysis of propyl acetate",
    "reactants": [
      "c5h10o2",
      "water"
    ],
    "products": [
      "ch3cooh",
      "c3h8o"
    ],
    "enthalpy": 16,
    "desc": "Hydrolysis into acetic acid and 1-propanol."
  },
  {
    "id": "org-hyd-c6h12o2-water",
    "name": "Hydrolysis of butyl acetate",
    "reactants": [
      "c6h12o2",
      "water"
    ],
    "products": [
      "ch3cooh",
      "c4h10o"
    ],
    "enthalpy": 17,
    "desc": "Cleavage restoring acetic acid and 1-butanol."
  },
  {
    "id": "org-hyd-c7h14o2-water",
    "name": "Hydrolysis of isoamyl acetate",
    "reactants": [
      "c7h14o2",
      "water"
    ],
    "products": [
      "ch3cooh",
      "c5h12o_iso"
    ],
    "enthalpy": 18,
    "desc": "Hydrolysis restoring acetic acid and isoamyl alcohol."
  },
  {
    "id": "org-hyd-c8h8o2-water",
    "name": "Hydrolysis of methyl benzoate",
    "reactants": [
      "c8h8o2",
      "water"
    ],
    "products": [
      "c6h5cooh",
      "ch3oh"
    ],
    "enthalpy": 14,
    "desc": "Slow acidic hydrolysis precipitating white crystals of benzoic acid."
  },
  {
    "id": "org-hyd-c9h10o2-water",
    "name": "Hydrolysis of ethyl benzoate",
    "reactants": [
      "c9h10o2",
      "water"
    ],
    "products": [
      "c6h5cooh",
      "c2h5oh"
    ],
    "enthalpy": 15,
    "desc": "Cleavage precipitating benzoic acid crystals."
  },
  {
    "id": "org-hyd-c8h8o3-water",
    "name": "Hydrolysis of methyl salicylate",
    "reactants": [
      "c8h8o3",
      "water"
    ],
    "products": [
      "c7h6o3",
      "ch3oh"
    ],
    "enthalpy": 16.5,
    "desc": "Cleavage yielding salicylic acid needles."
  },
  {
    "id": "org-sn-ch3cl-naoh",
    "name": "Hydrolysis of chloromethane with sodium hydroxide",
    "reactants": [
      "ch3cl",
      "naoh"
    ],
    "products": [
      "ch3oh",
      "nacl"
    ],
    "enthalpy": -75,
    "desc": "SN2 nucleophilic displacement producing methanol."
  },
  {
    "id": "org-sn-ch3br-naoh",
    "name": "Hydrolysis of bromomethane with sodium hydroxide",
    "reactants": [
      "ch3br",
      "naoh"
    ],
    "products": [
      "ch3oh",
      "nabr"
    ],
    "enthalpy": -82,
    "desc": "Rapid SN2 nucleophilic displacement yielding methanol."
  },
  {
    "id": "org-sn-ch3i-naoh",
    "name": "Hydrolysis of iodomethane with sodium hydroxide",
    "reactants": [
      "ch3i",
      "naoh"
    ],
    "products": [
      "ch3oh",
      "nai"
    ],
    "enthalpy": -88,
    "desc": "Fast SN2 substitution displacing iodide leaving group."
  },
  {
    "id": "org-sn-c2h5cl-naoh",
    "name": "Hydrolysis of chloroethane with aqueous sodium hydroxide",
    "reactants": [
      "c2h5cl",
      "naoh"
    ],
    "products": [
      "c2h5oh",
      "nacl"
    ],
    "enthalpy": -73,
    "desc": "Nucleophilic conversion of ethyl chloride to ethanol."
  },
  {
    "id": "org-sn-c2h5br-naoh",
    "name": "Hydrolysis of bromoethane with aqueous sodium hydroxide",
    "reactants": [
      "c2h5br",
      "naoh"
    ],
    "products": [
      "c2h5oh",
      "nabr"
    ],
    "enthalpy": -80,
    "desc": "SN2 substitution forming ethanol."
  },
  {
    "id": "org-sn-c2h5i-naoh",
    "name": "Hydrolysis of iodoethane with sodium hydroxide",
    "reactants": [
      "c2h5i",
      "naoh"
    ],
    "products": [
      "c2h5oh",
      "nai"
    ],
    "enthalpy": -85,
    "desc": "Rapid SN2 displacement producing ethanol."
  },
  {
    "id": "org-sn-ch3cl-koh",
    "name": "Hydrolysis of chloromethane with potassium hydroxide",
    "reactants": [
      "ch3cl",
      "koh"
    ],
    "products": [
      "ch3oh",
      "kcl"
    ],
    "enthalpy": -76,
    "desc": "SN2 displacement yielding methanol and potassium chloride."
  },
  {
    "id": "org-sn-ch3br-koh",
    "name": "Hydrolysis of bromomethane with potassium hydroxide",
    "reactants": [
      "ch3br",
      "koh"
    ],
    "products": [
      "ch3oh",
      "kbr"
    ],
    "enthalpy": -83,
    "desc": "Nucleophilic substitution forming methanol and potassium bromide."
  },
  {
    "id": "org-sn-ch3i-koh",
    "name": "Hydrolysis of iodomethane with potassium hydroxide",
    "reactants": [
      "ch3i",
      "koh"
    ],
    "products": [
      "ch3oh",
      "ki"
    ],
    "enthalpy": -89,
    "desc": "Displacement yielding methanol and potassium iodide."
  },
  {
    "id": "org-sn-c2h5cl-koh",
    "name": "Hydrolysis of chloroethane with potassium hydroxide",
    "reactants": [
      "c2h5cl",
      "koh"
    ],
    "products": [
      "c2h5oh",
      "kcl"
    ],
    "enthalpy": -74,
    "desc": "Conversion of ethyl chloride to ethanol."
  },
  {
    "id": "org-sn-c2h5br-koh",
    "name": "Hydrolysis of bromoethane with potassium hydroxide",
    "reactants": [
      "c2h5br",
      "koh"
    ],
    "products": [
      "c2h5oh",
      "kbr"
    ],
    "enthalpy": -81,
    "desc": "Nucleophilic substitution yielding ethanol."
  },
  {
    "id": "org-sn-c2h5i-koh",
    "name": "Hydrolysis of iodoethane with potassium hydroxide",
    "reactants": [
      "c2h5i",
      "koh"
    ],
    "products": [
      "c2h5oh",
      "ki"
    ],
    "enthalpy": -86,
    "desc": "Conversion of ethyl iodide to ethanol."
  },
  {
    "id": "org-cn-ch3cl-nacn",
    "name": "Synthesis of acetonitrile from chloromethane and sodium cyanide",
    "reactants": [
      "ch3cl",
      "nacn"
    ],
    "products": [
      "c2h3n",
      "nacl"
    ],
    "enthalpy": -92,
    "desc": "SN2 cyano-displacement forming acetonitrile."
  },
  {
    "id": "org-cn-ch3br-nacn",
    "name": "Synthesis of acetonitrile from bromomethane and sodium cyanide",
    "reactants": [
      "ch3br",
      "nacn"
    ],
    "products": [
      "c2h3n",
      "nabr"
    ],
    "enthalpy": -98,
    "desc": "Rapid nucleophilic substitution yielding acetonitrile."
  },
  {
    "id": "org-cn-ch3i-nacn",
    "name": "Synthesis of acetonitrile from iodomethane and sodium cyanide",
    "reactants": [
      "ch3i",
      "nacn"
    ],
    "products": [
      "c2h3n",
      "nai"
    ],
    "enthalpy": -105,
    "desc": "Exothermic nucleophilic cyanation."
  },
  {
    "id": "org-cn-ch3cl-kcn",
    "name": "Synthesis of acetonitrile from chloromethane and potassium cyanide",
    "reactants": [
      "ch3cl",
      "kcn"
    ],
    "products": [
      "c2h3n",
      "kcl"
    ],
    "enthalpy": -93,
    "desc": "SN2 displacement yielding acetonitrile and potassium chloride."
  },
  {
    "id": "org-cn-ch3br-kcn",
    "name": "Synthesis of acetonitrile from bromomethane and potassium cyanide",
    "reactants": [
      "ch3br",
      "kcn"
    ],
    "products": [
      "c2h3n",
      "kbr"
    ],
    "enthalpy": -99,
    "desc": "Cyano-displacement producing acetonitrile."
  },
  {
    "id": "org-cn-ch3i-kcn",
    "name": "Synthesis of acetonitrile from iodomethane and potassium cyanide",
    "reactants": [
      "ch3i",
      "kcn"
    ],
    "products": [
      "c2h3n",
      "ki"
    ],
    "enthalpy": -106,
    "desc": "Exothermic SN2 synthesis of acetonitrile."
  },
  {
    "id": "org-hx-ch3oh-hcl",
    "name": "Reaction of methanol with hydrochloric acid",
    "reactants": [
      "ch3oh",
      "hcl"
    ],
    "products": [
      "ch3cl",
      "water"
    ],
    "enthalpy": -18,
    "desc": "Nucleophilic substitution forming volatile chloromethane gas."
  },
  {
    "id": "org-hx-ch3oh-hbr",
    "name": "Reaction of methanol with hydrobromic acid",
    "reactants": [
      "ch3oh",
      "hbr"
    ],
    "products": [
      "ch3br",
      "water"
    ],
    "enthalpy": -25,
    "desc": "Substitution producing bromomethane."
  },
  {
    "id": "org-hx-ch3oh-hi",
    "name": "Reaction of methanol with hydroiodic acid",
    "reactants": [
      "ch3oh",
      "hi"
    ],
    "products": [
      "ch3i",
      "water"
    ],
    "enthalpy": -32,
    "desc": "Dense oily methyl iodide forms as an immiscible lower layer."
  },
  {
    "id": "org-hx-c2h5oh-hcl",
    "name": "Reaction of ethanol with hydrochloric acid",
    "reactants": [
      "c2h5oh",
      "hcl"
    ],
    "products": [
      "c2h5cl",
      "water"
    ],
    "enthalpy": -19,
    "desc": "Nucleophilic substitution forming chloroethane."
  },
  {
    "id": "org-hx-c2h5oh-hbr",
    "name": "Reaction of ethanol with hydrobromic acid",
    "reactants": [
      "c2h5oh",
      "hbr"
    ],
    "products": [
      "c2h5br",
      "water"
    ],
    "enthalpy": -28,
    "desc": "Dense immiscible droplets of bromoethane separate at the bottom."
  },
  {
    "id": "org-hx-c2h5oh-hi",
    "name": "Reaction of ethanol with hydroiodic acid",
    "reactants": [
      "c2h5oh",
      "hi"
    ],
    "products": [
      "c2h5i",
      "water"
    ],
    "enthalpy": -35,
    "desc": "Dense heavy oily layer of iodoethane settles rapidly."
  },
  {
    "id": "org-add-c2h4-cl2",
    "name": "Chlorine addition to ethylene",
    "reactants": [
      "c2h4",
      "cl2"
    ],
    "products": [
      "c2h4cl2"
    ],
    "enthalpy": -218,
    "desc": "Chlorine gas decolorizes yielding dense oily 1,2-dichloroethane droplets."
  },
  {
    "id": "org-add-c2h4-br2",
    "name": "Bromine addition test with ethylene",
    "reactants": [
      "c2h4",
      "br2"
    ],
    "products": [
      "c2h4br2"
    ],
    "enthalpy": -190,
    "desc": "Red-brown bromine water rapidly decolorizes to a clear solution of 1,2-dibromoethane."
  },
  {
    "id": "org-add-c2h4-hcl",
    "name": "Hydrochlorination of ethylene to chloroethane",
    "reactants": [
      "c2h4",
      "hcl"
    ],
    "products": [
      "c2h5cl"
    ],
    "enthalpy": -72,
    "desc": "Addition of gaseous HCl to ethylene yields volatile ethyl chloride."
  },
  {
    "id": "org-add-c2h4-hbr",
    "name": "Hydrobromination of ethylene to bromoethane",
    "reactants": [
      "c2h4",
      "hbr"
    ],
    "products": [
      "c2h5br"
    ],
    "enthalpy": -84,
    "desc": "Addition of hydrogen bromide yields heavy oily bromoethane."
  },
  {
    "id": "org-add-c2h4-hi",
    "name": "Hydroiodination of ethylene to iodoethane",
    "reactants": [
      "c2h4",
      "hi"
    ],
    "products": [
      "c2h5i"
    ],
    "enthalpy": -92,
    "desc": "Electrophilic addition yielding dense iodoethane."
  },
  {
    "id": "org-add-c2h4-water",
    "name": "Catalytic hydration of ethylene to ethanol",
    "reactants": [
      "c2h4",
      "water"
    ],
    "products": [
      "c2h5oh"
    ],
    "enthalpy": -45,
    "desc": "Vapor-phase hydration of ethylene producing ethanol."
  },
  {
    "id": "org-hydr-c2h4-h2",
    "name": "Catalytic hydrogenation of ethylene to ethane",
    "reactants": [
      "c2h4",
      "h2"
    ],
    "products": [
      "c2h6"
    ],
    "enthalpy": -137,
    "desc": "Nickel/platinum catalyzed addition of hydrogen across double bond forming ethane."
  },
  {
    "id": "org-hydr-c3h6-h2",
    "name": "Catalytic hydrogenation of propylene to propane",
    "reactants": [
      "c3h6",
      "h2"
    ],
    "products": [
      "propane"
    ],
    "enthalpy": -126,
    "desc": "Hydrogenation yielding saturated propane gas."
  },
  {
    "id": "org-hydr-c4h8-h2",
    "name": "Catalytic hydrogenation of 1-butene to butane",
    "reactants": [
      "c4h8",
      "h2"
    ],
    "products": [
      "c4h10"
    ],
    "enthalpy": -127,
    "desc": "Hydrogenation yielding butane."
  },
  {
    "id": "org-hydr-c6h10-h2",
    "name": "Hydrogenation of cyclohexene to cyclohexane",
    "reactants": [
      "c6h10",
      "h2"
    ],
    "products": [
      "c6h12"
    ],
    "enthalpy": -120,
    "desc": "Reduction of cycloalkene to chair-conformation cyclohexane."
  },
  {
    "id": "org-hydr-c2h2-h2-partial",
    "name": "Lindlar-type partial hydrogenation of acetylene to ethylene",
    "reactants": [
      "c2h2",
      "h2"
    ],
    "products": [
      "c2h4"
    ],
    "enthalpy": -175,
    "desc": "Selective poisoned catalytic hydrogenation of alkyne to olefin."
  },
  {
    "id": "org-hydr-c6h6-h2",
    "name": "Exhaustive catalytic hydrogenation of benzene to cyclohexane",
    "reactants": [
      "c6h6",
      "h2"
    ],
    "products": [
      "c6h12"
    ],
    "enthalpy": -206,
    "desc": "High-pressure catalytic saturation of aromatic ring to cyclohexane."
  },
  {
    "id": "org-ferment-glucose",
    "name": "Anaerobic fermentation of glucose to ethanol and carbon dioxide",
    "reactants": [
      "c6h12o6"
    ],
    "products": [
      "c2h5oh",
      "co2"
    ],
    "enthalpy": -69,
    "desc": "Enzymatic glycolysis effervescing carbon dioxide and accumulating ethanol."
  },
  {
    "id": "org-sub-ch4-cl2-1",
    "name": "Photochemical chlorination of methane to chloromethane",
    "reactants": [
      "ch4",
      "cl2"
    ],
    "products": [
      "ch3cl",
      "hcl"
    ],
    "enthalpy": -101,
    "desc": "UV-initiated free-radical substitution releasing hydrogen chloride gas."
  },
  {
    "id": "org-sub-ch3cl-cl2",
    "name": "Chlorination of chloromethane to dichloromethane",
    "reactants": [
      "ch3cl",
      "cl2"
    ],
    "products": [
      "ch2cl2",
      "hcl"
    ],
    "enthalpy": -103,
    "desc": "Stepwise radical chlorination producing volatile methylene chloride."
  },
  {
    "id": "org-sub-ch2cl2-cl2",
    "name": "Chlorination of dichloromethane to chloroform",
    "reactants": [
      "ch2cl2",
      "cl2"
    ],
    "products": [
      "chcl3",
      "hcl"
    ],
    "enthalpy": -102,
    "desc": "Photochemical substitution yielding trichloromethane."
  },
  {
    "id": "org-sub-chcl3-cl2",
    "name": "Exhaustive chlorination of chloroform to carbon tetrachloride",
    "reactants": [
      "chcl3",
      "cl2"
    ],
    "products": [
      "ccl4",
      "hcl"
    ],
    "enthalpy": -98,
    "desc": "Exhaustive chlorination yielding non-flammable carbon tetrachloride."
  },
  {
    "id": "org-sub-ch4-br2",
    "name": "Photochemical bromination of methane to bromomethane",
    "reactants": [
      "ch4",
      "br2"
    ],
    "products": [
      "ch3br",
      "hbr"
    ],
    "enthalpy": -65,
    "desc": "Bromine color fades as methyl bromide and HBr fumes are produced."
  },
  {
    "id": "org-sub-c2h6-cl2",
    "name": "Photochemical chlorination of ethane to chloroethane",
    "reactants": [
      "c2h6",
      "cl2"
    ],
    "products": [
      "c2h5cl",
      "hcl"
    ],
    "enthalpy": -112,
    "desc": "Radical chain reaction yielding ethyl chloride."
  },
  {
    "id": "org-sub-c2h6-br2",
    "name": "Photochemical bromination of ethane to bromoethane",
    "reactants": [
      "c2h6",
      "br2"
    ],
    "products": [
      "c2h5br",
      "hbr"
    ],
    "enthalpy": -78,
    "desc": "Bromine decolorizes under light producing bromoethane."
  },
  {
    "id": "org-dehyd-ethanol-c2h4",
    "name": "Acid-catalyzed dehydration of ethanol to ethylene",
    "reactants": [
      "c2h5oh"
    ],
    "products": [
      "c2h4",
      "water"
    ],
    "enthalpy": 45,
    "desc": "Hot sulfuric acid eliminates water from ethanol generating ethylene gas."
  },
  {
    "id": "org-dehyd-ch3oh-ether",
    "name": "Condensation of methanol to dimethyl ether",
    "reactants": [
      "ch3oh"
    ],
    "products": [
      "c2h6o_ether",
      "water"
    ],
    "enthalpy": -22,
    "desc": "Methanol dehydrates forming volatile dimethyl ether gas."
  },
  {
    "id": "org-dehyd-c3h8o-c3h6",
    "name": "Dehydration of 1-propanol to propylene",
    "reactants": [
      "c3h8o"
    ],
    "products": [
      "c3h6",
      "water"
    ],
    "enthalpy": 48,
    "desc": "Endothermic catalytic elimination releasing gaseous propylene."
  },
  {
    "id": "org-dehyd-c4h10o-c4h8",
    "name": "Dehydration of 1-butanol to 1-butene",
    "reactants": [
      "c4h10o"
    ],
    "products": [
      "c4h8",
      "water"
    ],
    "enthalpy": 49,
    "desc": "Elimination reaction yielding butene gas."
  },
  {
    "id": "org-salt-ch3cooh-lioh",
    "name": "Neutralization of acetic acid with lithium hydroxide",
    "reactants": [
      "ch3cooh",
      "lioh"
    ],
    "products": [
      "ch3cooli",
      "water"
    ],
    "enthalpy": -56.5,
    "desc": "Neutralization producing lithium acetate."
  },
  {
    "id": "org-salt-ch3cooh-ammonia",
    "name": "Neutralization of acetic acid with ammonia",
    "reactants": [
      "ch3cooh",
      "ammonia"
    ],
    "products": [
      "ammonium-acetate"
    ],
    "enthalpy": -52,
    "desc": "Ammonia vapor reacts with glacial acetic acid producing dense white ammonium acetate crystals."
  },
  {
    "id": "org-ref-ch4-water",
    "name": "Steam methane reforming (SMR) for hydrogen production",
    "reactants": [
      "ch4",
      "water"
    ],
    "products": [
      "co",
      "h2"
    ],
    "enthalpy": 206,
    "desc": "Primary industrial route to synthesis gas over nickel catalyst at 850°C."
  },
  {
    "id": "org-ref-ch4-co2",
    "name": "Dry reforming of methane with carbon dioxide",
    "reactants": [
      "ch4",
      "co2"
    ],
    "products": [
      "co",
      "h2"
    ],
    "enthalpy": 247,
    "desc": "Catalytic conversion of greenhouse gases into high-value syngas."
  },
  {
    "id": "org-ref-wgs-co-water",
    "name": "Water-gas shift (WGS) reaction",
    "reactants": [
      "co",
      "water"
    ],
    "products": [
      "co2",
      "h2"
    ],
    "enthalpy": -41.2,
    "desc": "Exothermic catalytic shift converting carbon monoxide and steam into carbon dioxide and hydrogen."
  },
  {
    "id": "org-ref-sabatier-co2-h2",
    "name": "Sabatier catalytic methanation of carbon dioxide",
    "reactants": [
      "co2",
      "h2"
    ],
    "products": [
      "ch4",
      "water"
    ],
    "enthalpy": -165,
    "desc": "Catalytic conversion of carbon dioxide to synthetic methane fuel."
  },
  {
    "id": "org-ref-methanation-co-h2",
    "name": "Catalytic methanation of carbon monoxide",
    "reactants": [
      "co",
      "h2"
    ],
    "products": [
      "ch4",
      "water"
    ],
    "enthalpy": -206,
    "desc": "Strongly exothermic methanation over nickel catalyst."
  },
  {
    "id": "org-ref-boudouard-reverse",
    "name": "Reverse Boudouard gasification of carbon with carbon dioxide",
    "reactants": [
      "c",
      "co2"
    ],
    "products": [
      "co"
    ],
    "enthalpy": 172.5,
    "desc": "High-temperature blast furnace gas equilibrium yielding carbon monoxide."
  },
  {
    "id": "org-ref-c-water-syngas",
    "name": "Water gas production by steam over incandescent coke",
    "reactants": [
      "c",
      "water"
    ],
    "products": [
      "co",
      "h2"
    ],
    "enthalpy": 131.3,
    "desc": "Historic town gas synthesis over red-hot metallurgical coke."
  },
  {
    "id": "org-ox-hcho-hcooh",
    "name": "Oxidation of formaldehyde to formic acid",
    "reactants": [
      "hcho",
      "o2"
    ],
    "products": [
      "hcooh"
    ],
    "enthalpy": -285,
    "desc": "Catalytic oxidation converting formaldehyde to formic acid."
  },
  {
    "id": "org-ox-ch3cho-ch3cooh",
    "name": "Liquid-phase catalytic oxidation of acetaldehyde to acetic acid",
    "reactants": [
      "ch3cho",
      "o2"
    ],
    "products": [
      "ch3cooh"
    ],
    "enthalpy": -293,
    "desc": "Manganese acetate catalyzed oxidation yielding glacial acetic acid."
  },
  {
    "id": "org-ox-c3h8o_iso-acetone",
    "name": "Oxidation of isopropanol to acetone",
    "reactants": [
      "c3h8o_iso",
      "o2"
    ],
    "products": [
      "ch3coch3",
      "water"
    ],
    "enthalpy": -178,
    "desc": "Oxidation of secondary alcohol yielding sweet-smelling acetone."
  },
  {
    "id": "org-ox-c4h10o_sec-mek",
    "name": "Oxidation of 2-butanol to methyl ethyl ketone (MEK)",
    "reactants": [
      "c4h10o_sec",
      "o2"
    ],
    "products": [
      "c4h8o_mek",
      "water"
    ],
    "enthalpy": -175,
    "desc": "Dehydrogenation/oxidation producing industrial MEK solvent."
  },
  {
    "id": "org-ox-c7h8o-benzaldehyde",
    "name": "Oxidation of benzyl alcohol to benzaldehyde",
    "reactants": [
      "c7h8o",
      "o2"
    ],
    "products": [
      "c7h6o",
      "water"
    ],
    "enthalpy": -185,
    "desc": "Bitter almond aroma of benzaldehyde emerges."
  },
  {
    "id": "org-ox-c7h6o-benzoic",
    "name": "Autoxidation of benzaldehyde to benzoic acid",
    "reactants": [
      "c7h6o",
      "o2"
    ],
    "products": [
      "c6h5cooh"
    ],
    "enthalpy": -265,
    "desc": "Liquid benzaldehyde absorbs atmospheric oxygen forming white crystalline benzoic acid crust."
  },
  {
    "id": "org-syn-urea-ammonia-co2",
    "name": "Industrial Bosch-Meiser urea synthesis from ammonia and carbon dioxide",
    "reactants": [
      "ammonia",
      "co2"
    ],
    "products": [
      "ch4n2o",
      "water"
    ],
    "enthalpy": -87,
    "desc": "High-pressure synthesis of carbamide (urea) fertilizer crystals."
  },
  {
    "id": "org-ace-caoh2",
    "name": "Reaction of calcium hydroxide with acetic acid (calcium acetate)",
    "reactants": [
      "caoh2",
      "ch3cooh"
    ],
    "products": [
      "ch3coo-2-ca",
      "water"
    ],
    "enthalpy": -114,
    "desc": "Slaked lime dissolves cleanly in vinegar forming calcium acetate (Sterno fuel gel precursor)."
  },
  {
    "id": "org-ace-baoh2",
    "name": "Reaction of barium hydroxide with acetic acid (barium acetate)",
    "reactants": [
      "ba-oh-2",
      "ch3cooh"
    ],
    "products": [
      "ch3coo-2-ba",
      "water"
    ],
    "enthalpy": -115,
    "desc": "Barium hydroxide dissolves into soluble barium acetate."
  },
  {
    "id": "org-ace-mgoh2",
    "name": "Dissolution of magnesium hydroxide in acetic acid (magnesium acetate)",
    "reactants": [
      "mgoh2",
      "ch3cooh"
    ],
    "products": [
      "ch3coo-2-mg",
      "water"
    ],
    "enthalpy": -105,
    "desc": "White suspension dissolves into clear magnesium acetate solution."
  },
  {
    "id": "org-ace-cuoh2",
    "name": "Dissolution of copper(II) hydroxide in acetic acid (verdigris/copper acetate)",
    "reactants": [
      "cuoh2",
      "ch3cooh"
    ],
    "products": [
      "ch3coo-2-cu",
      "water"
    ],
    "enthalpy": -112,
    "desc": "Bright blue copper hydroxide dissolves forming deep dark blue-green copper(II) acetate."
  },
  {
    "id": "org-ace-pboh2",
    "name": "Dissolution of lead(II) hydroxide in acetic acid (sugar of lead)",
    "reactants": [
      "pb-oh-2",
      "ch3cooh"
    ],
    "products": [
      "ch3coo-2-pb",
      "water"
    ],
    "enthalpy": -113,
    "desc": "White lead hydroxide dissolves forming sweet-tasting, highly toxic lead(II) acetate."
  },
  {
    "id": "org-dehydr-ethane-ethene",
    "name": "Thermal steam cracking of ethane to ethylene",
    "reactants": [
      "c2h6"
    ],
    "products": [
      "c2h4",
      "h2"
    ],
    "enthalpy": 137,
    "desc": "Endothermic pyrolysis at 800°C producing polymer-grade ethylene gas."
  },
  {
    "id": "org-dehydr-propane-propene",
    "name": "Catalytic dehydrogenation of propane to propylene",
    "reactants": [
      "propane"
    ],
    "products": [
      "c3h6",
      "h2"
    ],
    "enthalpy": 124,
    "desc": "Platinum-catalyzed dehydrogenation yielding propylene olefin."
  },
  {
    "id": "org-dehydr-butane-butene",
    "name": "Catalytic dehydrogenation of butane to 1-butene",
    "reactants": [
      "c4h10"
    ],
    "products": [
      "c4h8",
      "h2"
    ],
    "enthalpy": 125,
    "desc": "Dehydrogenation yielding 1-butene monomer."
  },
  {
    "id": "org-dehydr-cyclohexane-benzene",
    "name": "Catalytic reforming aromatization of cyclohexane to benzene",
    "reactants": [
      "c6h12"
    ],
    "products": [
      "c6h6",
      "h2"
    ],
    "enthalpy": 206,
    "desc": "Endothermic catalytic aromatization over platinum releasing hydrogen."
  },
  {
    "id": "org-dehydr-ethylbenzene-styrene",
    "name": "Industrial dehydrogenation of ethylbenzene to styrene",
    "reactants": [
      "c8h10"
    ],
    "products": [
      "c8h8",
      "h2"
    ],
    "enthalpy": 121,
    "desc": "Iron oxide catalyzed dehydrogenation producing styrene monomer for polystyrene."
  }
];

  for (const d of list) {
    const isGasProd = d.products.includes("c2h4") || d.products.includes("c3h6") || d.products.includes("c4h8") || d.products.includes("h2") || d.products.includes("co") || d.products.includes("co2") || d.products.includes("c2h2");
    const eff: SeedObservableEffect = isGasProd
      ? {
          type: "gas_evolution",
          description: d.desc,
          relatedChemicalId: d.products.find(p => ["c2h4", "c3h6", "c4h8", "h2", "co", "co2", "c2h2"].includes(p)),
        }
      : {
          type: "color_change",
          description: d.desc,
          colorFrom: "#FFFFFF",
          colorTo: "#F8F8FF",
          relatedChemicalId: d.products[0],
        };

    addReaction({
      id: d.id,
      name: d.name,
      reactionType: "redox_other",
      reactants: d.reactants,
      products: d.products,
      enthalpyKjPerMol: d.enthalpy,
      temperatureMinC: 20,
      temperatureMaxC: d.enthalpy > 50 ? 400 : 120,
      observableEffects: [eff],
      safetyNotes: "Organic reaction involving volatile, flammable, or toxic solvents and reagents; use fume hood, PPE, and no open flames.",
    });
  }
}
