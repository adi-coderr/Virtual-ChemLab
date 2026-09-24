// Domain 29: Organometallics & Named Coupling (100 reactions)
import { addReaction } from "./generateBatch7.js";

export function buildDomain29OrganometallicsCoupling(): void {
  const reactions = [
  {
    "id": "om-grignard-phenyl-br",
    "name": "Grignard synthesis: bromobenzene oxidative addition with magnesium",
    "reactants": [
      "bromobenzene",
      "mg"
    ],
    "products": [
      "c6h5mgbr"
    ],
    "enthalpy": -240,
    "desc": "Oxidative insertion of magnesium turnings into the C-Br bond in dry ether.",
    "type": "synthesis",
    "effects": [],
    "net": "C6H5Br + Mg → C6H5MgBr"
  },
  {
    "id": "om-grignard-methyl-i",
    "name": "Synthesis of methylmagnesium iodide Grignard reagent",
    "reactants": [
      "ch3i",
      "mg"
    ],
    "products": [
      "ch3mgi"
    ],
    "enthalpy": -265,
    "desc": "Rapid oxidative addition of magnesium to iodomethane forming classic MeMgI.",
    "type": "synthesis",
    "effects": [],
    "net": "CH3I + Mg → CH3MgI"
  },
  {
    "id": "om-grignard-methyl-cl",
    "name": "Synthesis of methylmagnesium chloride Grignard solution",
    "reactants": [
      "ch3cl",
      "mg"
    ],
    "products": [
      "ch3mgcl"
    ],
    "enthalpy": -220,
    "desc": "Industrial MeMgCl preparation under pressure.",
    "type": "synthesis",
    "effects": [],
    "net": "CH3Cl + Mg → CH3MgCl"
  },
  {
    "id": "om-grignard-ethyl-br",
    "name": "Synthesis of ethylmagnesium bromide (EtMgBr)",
    "reactants": [
      "c2h5br",
      "mg"
    ],
    "products": [
      "c2h5mgbr"
    ],
    "enthalpy": -235,
    "desc": "Exothermic Grignard synthesis in anhydrous diethyl ether.",
    "type": "synthesis",
    "effects": [],
    "net": "C2H5Br + Mg → C2H5MgBr"
  },
  {
    "id": "om-li-phenyl-br",
    "name": "Direct lithiation of bromobenzene by lithium metal",
    "reactants": [
      "bromobenzene",
      "li"
    ],
    "products": [
      "c6h5li",
      "libr"
    ],
    "enthalpy": -310,
    "desc": "Reductive lithiation generating phenyllithium and lithium bromide.",
    "type": "redox_other",
    "effects": [],
    "net": "C6H5Br + 2 Li → C6H5Li + LiBr"
  },
  {
    "id": "om-li-phenyl-i",
    "name": "Direct lithiation of iodobenzene by lithium metal",
    "reactants": [
      "c6h5i",
      "li"
    ],
    "products": [
      "c6h5li",
      "lii"
    ],
    "enthalpy": -290,
    "desc": "Reductive lithiation yielding phenyllithium solution.",
    "type": "redox_other",
    "effects": [],
    "net": "C6H5I + 2 Li → C6H5Li + LiI"
  },
  {
    "id": "om-li-methyl-cl",
    "name": "Synthesis of methyllithium from chloromethane and lithium",
    "reactants": [
      "ch3cl",
      "li"
    ],
    "products": [
      "ch3li",
      "licl"
    ],
    "enthalpy": -340,
    "desc": "Heterogeneous reductive lithiation in ether.",
    "type": "redox_other",
    "effects": [],
    "net": "CH3Cl + 2 Li → CH3Li + LiCl"
  },
  {
    "id": "om-li-methyl-br",
    "name": "Synthesis of methyllithium from bromomethane and lithium",
    "reactants": [
      "ch3br",
      "li"
    ],
    "products": [
      "ch3li",
      "libr"
    ],
    "enthalpy": -320,
    "desc": "Preparation of halide-containing methyllithium.",
    "type": "redox_other",
    "effects": [],
    "net": "CH3Br + 2 Li → CH3Li + LiBr"
  },
  {
    "id": "om-li-methyl-i",
    "name": "Synthesis of methyllithium from iodomethane and lithium",
    "reactants": [
      "ch3i",
      "li"
    ],
    "products": [
      "ch3li",
      "lii"
    ],
    "enthalpy": -295,
    "desc": "Synthesis of MeLi·LiI complex reagent.",
    "type": "redox_other",
    "effects": [],
    "net": "CH3I + 2 Li → CH3Li + LiI"
  },
  {
    "id": "om-li-exchange-phbr-me",
    "name": "Lithium-halogen exchange: phenyllithium and bromomethane",
    "reactants": [
      "c6h5li",
      "ch3br"
    ],
    "products": [
      "bromobenzene",
      "ch3li"
    ],
    "enthalpy": -15,
    "desc": "Halogen-lithium exchange between aryl and alkyl halides.",
    "type": "redox_other",
    "effects": [],
    "net": "C6H5Li + CH3Br → C6H5Br + CH3Li"
  },
  {
    "id": "om-li-exchange-phcl-me",
    "name": "Lithium-halogen exchange: phenyllithium and chloromethane",
    "reactants": [
      "c6h5li",
      "ch3cl"
    ],
    "products": [
      "chlorobenzene",
      "ch3li"
    ],
    "enthalpy": -18,
    "desc": "Halogen-metal metathesis.",
    "type": "redox_other",
    "effects": [],
    "net": "C6H5Li + CH3Cl → C6H5Cl + CH3Li"
  },
  {
    "id": "om-li-exchange-phi-me",
    "name": "Lithium-halogen exchange: phenyllithium and iodomethane",
    "reactants": [
      "c6h5li",
      "ch3i"
    ],
    "products": [
      "c6h5i",
      "ch3li"
    ],
    "enthalpy": -12,
    "desc": "Rapid iodine-lithium exchange at -78°C.",
    "type": "redox_other",
    "effects": [],
    "net": "C6H5Li + CH3I → C6H5I + CH3Li"
  },
  {
    "id": "om-li-exchange-nbu-phbr",
    "name": "Halogen-lithium exchange between n-butyllithium and bromobenzene",
    "reactants": [
      "c4h9li",
      "bromobenzene"
    ],
    "products": [
      "c6h5li",
      "c2h5br",
      "c2h4"
    ],
    "enthalpy": -45,
    "desc": "n-Butyllithium exchange producing phenyllithium.",
    "type": "redox_other",
    "effects": [],
    "net": "C4H9Li + C6H5Br → C6H5Li + C2H5Br + C2H4"
  },
  {
    "id": "om-li-ch3li-transmetal-mg",
    "name": "Transmetallation of methyllithium with magnesium chloride",
    "reactants": [
      "ch3li",
      "mgcl2"
    ],
    "products": [
      "ch3mgcl",
      "licl"
    ],
    "enthalpy": -35,
    "desc": "Clean Grignard synthesis via transmetallation.",
    "type": "redox_other",
    "effects": [],
    "net": "CH3Li + MgCl2 → CH3MgCl + LiCl"
  },
  {
    "id": "om-li-c6h5li-transmetal-mg",
    "name": "Transmetallation of phenyllithium with magnesium bromide",
    "reactants": [
      "c6h5li",
      "mgbr2"
    ],
    "products": [
      "c6h5mgbr",
      "libr"
    ],
    "enthalpy": -38,
    "desc": "Transmetallation synthesizing phenylmagnesium bromide.",
    "type": "redox_other",
    "effects": [],
    "net": "C6H5Li + MgBr2 → C6H5MgBr + LiBr"
  },
  {
    "id": "om-quench-phmgbr-water",
    "name": "Aqueous quenching of phenylmagnesium bromide yielding benzene",
    "reactants": [
      "c6h5mgbr",
      "water"
    ],
    "products": [
      "c6h6",
      "mgbr2",
      "mgoh2"
    ],
    "enthalpy": -280,
    "desc": "Hydrolytic quenching isolating benzene.",
    "type": "redox_other",
    "effects": [],
    "net": "2 C6H5MgBr + 2 H2O → 2 C6H6 + MgBr2 + Mg(OH)2"
  },
  {
    "id": "om-quench-phmgbr-hcl",
    "name": "Hydrochloric acid quench of phenylmagnesium bromide",
    "reactants": [
      "c6h5mgbr",
      "hcl"
    ],
    "products": [
      "c6h6",
      "mgbr2",
      "mgcl2"
    ],
    "enthalpy": -310,
    "desc": "Acidic workup of Grignard mixture.",
    "type": "redox_other",
    "effects": [],
    "net": "2 C6H5MgBr + 2 HCl → 2 C6H6 + MgBr2 + MgCl2"
  },
  {
    "id": "om-quench-phmgbr-hbr",
    "name": "Hydrobromic acid quench of phenylmagnesium bromide",
    "reactants": [
      "c6h5mgbr",
      "hbr"
    ],
    "products": [
      "c6h6",
      "mgbr2"
    ],
    "enthalpy": -315,
    "desc": "Single-salt workup forming magnesium bromide.",
    "type": "redox_other",
    "effects": [],
    "net": "C6H5MgBr + HBr → C6H6 + MgBr2"
  },
  {
    "id": "om-quench-phmgbr-h2so4",
    "name": "Sulfuric acid workup of phenylmagnesium bromide",
    "reactants": [
      "c6h5mgbr",
      "h2so4"
    ],
    "products": [
      "c6h6",
      "mgbr2",
      "mgso4"
    ],
    "enthalpy": -330,
    "desc": "Aqueous sulfuric acid neutralization.",
    "type": "redox_other",
    "effects": [],
    "net": "2 C6H5MgBr + H2SO4 → 2 C6H6 + MgBr2 + MgSO4"
  },
  {
    "id": "om-quench-ch3mgi-water",
    "name": "Water hydrolysis of methylmagnesium iodide generating methane",
    "reactants": [
      "ch3mgi",
      "water"
    ],
    "products": [
      "ch4",
      "mgi2",
      "mgoh2"
    ],
    "enthalpy": -290,
    "desc": "Exothermic gas evolution releasing methane.",
    "type": "gas_evolution",
    "effects": [],
    "net": "2 CH3MgI + 2 H2O → 2 CH4 + MgI2 + Mg(OH)2"
  },
  {
    "id": "om-quench-ch3mgi-hcl",
    "name": "Hydrochloric acid quenching of methylmagnesium iodide",
    "reactants": [
      "ch3mgi",
      "hcl"
    ],
    "products": [
      "ch4",
      "mgi2",
      "mgcl2"
    ],
    "enthalpy": -315,
    "desc": "Acid neutralization releasing methane gas.",
    "type": "gas_evolution",
    "effects": [],
    "net": "2 CH3MgI + 2 HCl → 2 CH4 + MgI2 + MgCl2"
  },
  {
    "id": "om-quench-ch3mgi-hi",
    "name": "Hydroiodic acid quench of methylmagnesium iodide",
    "reactants": [
      "ch3mgi",
      "hi"
    ],
    "products": [
      "ch4",
      "mgi2"
    ],
    "enthalpy": -320,
    "desc": "Acid quench forming pure magnesium iodide.",
    "type": "gas_evolution",
    "effects": [],
    "net": "CH3MgI + HI → CH4 + MgI2"
  },
  {
    "id": "om-quench-ch3mgcl-water",
    "name": "Water quenching of methylmagnesium chloride",
    "reactants": [
      "ch3mgcl",
      "water"
    ],
    "products": [
      "ch4",
      "mgcl2",
      "mgoh2"
    ],
    "enthalpy": -285,
    "desc": "Hydrolysis liberating methane.",
    "type": "gas_evolution",
    "effects": [],
    "net": "2 CH3MgCl + 2 H2O → 2 CH4 + MgCl2 + Mg(OH)2"
  },
  {
    "id": "om-quench-ch3mgcl-hcl",
    "name": "Hydrochloric acid quench of methylmagnesium chloride",
    "reactants": [
      "ch3mgcl",
      "hcl"
    ],
    "products": [
      "ch4",
      "mgcl2"
    ],
    "enthalpy": -305,
    "desc": "Acid quench generating methane gas.",
    "type": "gas_evolution",
    "effects": [],
    "net": "CH3MgCl + HCl → CH4 + MgCl2"
  },
  {
    "id": "om-quench-c2h5mgbr-water",
    "name": "Aqueous quenching of ethylmagnesium bromide generating ethane",
    "reactants": [
      "c2h5mgbr",
      "water"
    ],
    "products": [
      "c2h6",
      "mgbr2",
      "mgoh2"
    ],
    "enthalpy": -275,
    "desc": "Hydrolytic quench releasing ethane gas.",
    "type": "gas_evolution",
    "effects": [],
    "net": "2 C2H5MgBr + 2 H2O → 2 C2H6 + MgBr2 + Mg(OH)2"
  },
  {
    "id": "om-quench-c2h5mgbr-hcl",
    "name": "Hydrochloric acid quench of ethylmagnesium bromide",
    "reactants": [
      "c2h5mgbr",
      "hcl"
    ],
    "products": [
      "c2h6",
      "mgbr2",
      "mgcl2"
    ],
    "enthalpy": -300,
    "desc": "Acid workup releasing ethane.",
    "type": "gas_evolution",
    "effects": [],
    "net": "2 C2H5MgBr + 2 HCl → 2 C2H6 + MgBr2 + MgCl2"
  },
  {
    "id": "om-quench-phli-water",
    "name": "Water quenching of phenyllithium yielding benzene",
    "reactants": [
      "c6h5li",
      "water"
    ],
    "products": [
      "c6h6",
      "lioh"
    ],
    "enthalpy": -320,
    "desc": "Violent exothermic hydrolysis.",
    "type": "redox_other",
    "effects": [],
    "net": "C6H5Li + H2O → C6H6 + LiOH"
  },
  {
    "id": "om-quench-phli-hcl",
    "name": "Hydrochloric acid neutralization of phenyllithium",
    "reactants": [
      "c6h5li",
      "hcl"
    ],
    "products": [
      "c6h6",
      "licl"
    ],
    "enthalpy": -350,
    "desc": "Acid workup forming benzene and lithium chloride.",
    "type": "redox_other",
    "effects": [],
    "net": "C6H5Li + HCl → C6H6 + LiCl"
  },
  {
    "id": "om-quench-ch3li-water",
    "name": "Water quenching of methyllithium generating methane",
    "reactants": [
      "ch3li",
      "water"
    ],
    "products": [
      "ch4",
      "lioh"
    ],
    "enthalpy": -330,
    "desc": "Vigorous hydrolysis producing methane.",
    "type": "gas_evolution",
    "effects": [],
    "net": "CH3Li + H2O → CH4 + LiOH"
  },
  {
    "id": "om-quench-c4h9li-water",
    "name": "Water hydrolysis of n-butyllithium producing butane",
    "reactants": [
      "c4h9li",
      "water"
    ],
    "products": [
      "c4h10",
      "lioh"
    ],
    "enthalpy": -340,
    "desc": "Hydrolytic quenching producing butane gas.",
    "type": "gas_evolution",
    "effects": [],
    "net": "C4H9Li + H2O → C4H10 + LiOH"
  },
  {
    "id": "om-carbox-phmgbr-co2-hcl",
    "name": "Carboxylation of phenylmagnesium bromide to benzoic acid (HCl workup)",
    "reactants": [
      "c6h5mgbr",
      "co2",
      "hcl"
    ],
    "products": [
      "c6h5cooh",
      "mgbr2",
      "mgcl2"
    ],
    "enthalpy": -260,
    "desc": "Dry ice addition followed by acid workup.",
    "type": "redox_other",
    "effects": [],
    "net": "2 C6H5MgBr + 2 CO2 + 2 HCl → 2 C6H5COOH + MgBr2 + MgCl2"
  },
  {
    "id": "om-carbox-phmgbr-co2-hbr",
    "name": "Carboxylation of phenylmagnesium bromide with HBr workup",
    "reactants": [
      "c6h5mgbr",
      "co2",
      "hbr"
    ],
    "products": [
      "c6h5cooh",
      "mgbr2"
    ],
    "enthalpy": -265,
    "desc": "Carboxylation with single magnesium bromide salt byproduct.",
    "type": "redox_other",
    "effects": [],
    "net": "C6H5MgBr + CO2 + HBr → C6H5COOH + MgBr2"
  },
  {
    "id": "om-carbox-phmgbr-co2-h2so4",
    "name": "Sulfuric acid workup of carboxylated phenylmagnesium bromide",
    "reactants": [
      "c6h5mgbr",
      "co2",
      "h2so4"
    ],
    "products": [
      "c6h5cooh",
      "mgbr2",
      "mgso4"
    ],
    "enthalpy": -280,
    "desc": "Carboxylation with sulfuric acid workup.",
    "type": "redox_other",
    "effects": [],
    "net": "2 C6H5MgBr + 2 CO2 + H2SO4 → 2 C6H5COOH + MgBr2 + MgSO4"
  },
  {
    "id": "om-carbox-phli-co2-hcl",
    "name": "Carboxylation of phenyllithium yielding benzoic acid",
    "reactants": [
      "c6h5li",
      "co2",
      "hcl"
    ],
    "products": [
      "c6h5cooh",
      "licl"
    ],
    "enthalpy": -290,
    "desc": "Carbon dioxide capture producing benzoic acid.",
    "type": "redox_other",
    "effects": [],
    "net": "C6H5Li + CO2 + HCl → C6H5COOH + LiCl"
  },
  {
    "id": "om-carbox-phli-co2-hbr",
    "name": "Phenyllithium carboxylation with hydrobromic acid workup",
    "reactants": [
      "c6h5li",
      "co2",
      "hbr"
    ],
    "products": [
      "c6h5cooh",
      "libr"
    ],
    "enthalpy": -295,
    "desc": "Carboxylation yielding benzoic acid.",
    "type": "redox_other",
    "effects": [],
    "net": "C6H5Li + CO2 + HBr → C6H5COOH + LiBr"
  },
  {
    "id": "om-carbox-ch3mgcl-co2-hcl",
    "name": "Carboxylation of methylmagnesium chloride yielding acetic acid",
    "reactants": [
      "ch3mgcl",
      "co2",
      "hcl"
    ],
    "products": [
      "ch3cooh",
      "mgcl2"
    ],
    "enthalpy": -250,
    "desc": "Grignard carbonylation synthesizing acetic acid.",
    "type": "redox_other",
    "effects": [],
    "net": "CH3MgCl + CO2 + HCl → CH3COOH + MgCl2"
  },
  {
    "id": "om-carbox-ch3mgi-co2-hcl",
    "name": "Carboxylation of methylmagnesium iodide to acetic acid",
    "reactants": [
      "ch3mgi",
      "co2",
      "hcl"
    ],
    "products": [
      "ch3cooh",
      "mgi2",
      "mgcl2"
    ],
    "enthalpy": -255,
    "desc": "Carboxylation synthesizing acetic acid.",
    "type": "redox_other",
    "effects": [],
    "net": "2 CH3MgI + 2 CO2 + 2 HCl → 2 CH3COOH + MgI2 + MgCl2"
  },
  {
    "id": "om-carbox-ch3li-co2-hcl",
    "name": "Carboxylation of methyllithium producing acetic acid",
    "reactants": [
      "ch3li",
      "co2",
      "hcl"
    ],
    "products": [
      "ch3cooh",
      "licl"
    ],
    "enthalpy": -280,
    "desc": "Organolithium carbonylation to carboxylic acid.",
    "type": "redox_other",
    "effects": [],
    "net": "CH3Li + CO2 + HCl → CH3COOH + LiCl"
  },
  {
    "id": "om-quench-c4h9li-hcl",
    "name": "Hydrochloric acid quenching of n-butyllithium producing butane",
    "reactants": [
      "c4h9li",
      "hcl"
    ],
    "products": [
      "c4h10",
      "licl"
    ],
    "enthalpy": -360,
    "desc": "Acid neutralization releasing butane.",
    "type": "redox_other",
    "effects": [],
    "net": "C4H9Li + HCl → C4H10 + LiCl"
  },
  {
    "id": "om-add-phmgbr-acetaldehyde",
    "name": "Grignard addition: phenylmagnesium bromide to acetaldehyde yielding 1-phenylethanol",
    "reactants": [
      "c6h5mgbr",
      "ch3cho",
      "hcl"
    ],
    "products": [
      "c8h10o",
      "mgbr2",
      "mgcl2"
    ],
    "enthalpy": -245,
    "desc": "Nucleophilic carbonyl addition synthesizing secondary alcohol.",
    "type": "redox_other",
    "effects": [],
    "net": "2 C6H5MgBr + 2 CH3CHO + 2 HCl → 2 C8H10O + MgBr2 + MgCl2"
  },
  {
    "id": "om-add-phmgbr-acetaldehyde-hbr",
    "name": "Phenylmagnesium bromide addition to acetaldehyde with HBr quench",
    "reactants": [
      "c6h5mgbr",
      "ch3cho",
      "hbr"
    ],
    "products": [
      "c8h10o",
      "mgbr2"
    ],
    "enthalpy": -250,
    "desc": "Carbonyl addition yielding 1-phenylethanol.",
    "type": "redox_other",
    "effects": [],
    "net": "C6H5MgBr + CH3CHO + HBr → C8H10O + MgBr2"
  },
  {
    "id": "om-add-ch3mgcl-benzaldehyde",
    "name": "Addition of methylmagnesium chloride to benzaldehyde producing 1-phenylethanol",
    "reactants": [
      "ch3mgcl",
      "c7h6o",
      "hcl"
    ],
    "products": [
      "c8h10o",
      "mgcl2"
    ],
    "enthalpy": -235,
    "desc": "Carbonyl addition to benzaldehyde.",
    "type": "redox_other",
    "effects": [],
    "net": "CH3MgCl + C7H6O + HCl → C8H10O + MgCl2"
  },
  {
    "id": "om-add-ch3mgi-benzaldehyde",
    "name": "Addition of methylmagnesium iodide to benzaldehyde",
    "reactants": [
      "ch3mgi",
      "c7h6o",
      "hcl"
    ],
    "products": [
      "c8h10o",
      "mgi2",
      "mgcl2"
    ],
    "enthalpy": -240,
    "desc": "Grignard synthesis of 1-phenylethanol.",
    "type": "redox_other",
    "effects": [],
    "net": "2 CH3MgI + 2 C7H6O + 2 HCl → 2 C8H10O + MgI2 + MgCl2"
  },
  {
    "id": "om-add-ch3li-benzaldehyde",
    "name": "Methyllithium addition to benzaldehyde yielding 1-phenylethanol",
    "reactants": [
      "ch3li",
      "c7h6o",
      "hcl"
    ],
    "products": [
      "c8h10o",
      "licl"
    ],
    "enthalpy": -260,
    "desc": "Rapid nucleophilic addition of organolithium.",
    "type": "redox_other",
    "effects": [],
    "net": "CH3Li + C7H6O + HCl → C8H10O + LiCl"
  },
  {
    "id": "om-add-phli-acetaldehyde",
    "name": "Phenyllithium addition to acetaldehyde yielding 1-phenylethanol",
    "reactants": [
      "c6h5li",
      "ch3cho",
      "hcl"
    ],
    "products": [
      "c8h10o",
      "licl"
    ],
    "enthalpy": -265,
    "desc": "Organolithium addition producing secondary alcohol.",
    "type": "redox_other",
    "effects": [],
    "net": "C6H5Li + CH3CHO + HCl → C8H10O + LiCl"
  },
  {
    "id": "om-kumada-phmgbr-mei",
    "name": "Kumada coupling: phenylmagnesium bromide and iodomethane to toluene",
    "reactants": [
      "c6h5mgbr",
      "ch3i"
    ],
    "products": [
      "c7h8",
      "mgbr2",
      "mgi2"
    ],
    "enthalpy": -195,
    "desc": "Nickel/palladium-catalyzed cross-coupling.",
    "type": "redox_other",
    "effects": [],
    "net": "2 C6H5MgBr + 2 CH3I → 2 C7H8 + MgBr2 + MgI2"
  },
  {
    "id": "om-kumada-phmgbr-mecl",
    "name": "Kumada coupling: phenylmagnesium bromide and chloromethane to toluene",
    "reactants": [
      "c6h5mgbr",
      "ch3cl"
    ],
    "products": [
      "c7h8",
      "mgbr2",
      "mgcl2"
    ],
    "enthalpy": -185,
    "desc": "Cross-coupling generating toluene.",
    "type": "redox_other",
    "effects": [],
    "net": "2 C6H5MgBr + 2 CH3Cl → 2 C7H8 + MgBr2 + MgCl2"
  },
  {
    "id": "om-kumada-phmgbr-mebr",
    "name": "Kumada coupling: phenylmagnesium bromide and bromomethane to toluene",
    "reactants": [
      "c6h5mgbr",
      "ch3br"
    ],
    "products": [
      "c7h8",
      "mgbr2"
    ],
    "enthalpy": -190,
    "desc": "Cross-coupling.",
    "type": "redox_other",
    "effects": [],
    "net": "C6H5MgBr + CH3Br → C7H8 + MgBr2"
  },
  {
    "id": "om-kumada-phmgbr-etbr",
    "name": "Kumada coupling: phenylmagnesium bromide and bromoethane to ethylbenzene",
    "reactants": [
      "c6h5mgbr",
      "c2h5br"
    ],
    "products": [
      "c8h10",
      "mgbr2"
    ],
    "enthalpy": -180,
    "desc": "Cross-coupling synthesizing ethylbenzene.",
    "type": "redox_other",
    "effects": [],
    "net": "C6H5MgBr + C2H5Br → C8H10 + MgBr2"
  },
  {
    "id": "om-kumada-phmgbr-etcl",
    "name": "Kumada coupling: phenylmagnesium bromide and chloroethane to ethylbenzene",
    "reactants": [
      "c6h5mgbr",
      "c2h5cl"
    ],
    "products": [
      "c8h10",
      "mgbr2",
      "mgcl2"
    ],
    "enthalpy": -175,
    "desc": "Cross-coupling.",
    "type": "redox_other",
    "effects": [],
    "net": "2 C6H5MgBr + 2 C2H5Cl → 2 C8H10 + MgBr2 + MgCl2"
  },
  {
    "id": "om-kumada-phmgbr-phbr",
    "name": "Kumada biaryl coupling: phenylmagnesium bromide and bromobenzene to biphenyl",
    "reactants": [
      "c6h5mgbr",
      "bromobenzene"
    ],
    "products": [
      "c12h10",
      "mgbr2"
    ],
    "enthalpy": -210,
    "desc": "Biaryl cross-coupling.",
    "type": "redox_other",
    "effects": [],
    "net": "C6H5MgBr + C6H5Br → C12H10 + MgBr2"
  },
  {
    "id": "om-kumada-phmgbr-phcl",
    "name": "Kumada biaryl coupling: phenylmagnesium bromide and chlorobenzene",
    "reactants": [
      "c6h5mgbr",
      "chlorobenzene"
    ],
    "products": [
      "c12h10",
      "mgbr2",
      "mgcl2"
    ],
    "enthalpy": -205,
    "desc": "Biaryl cross-coupling.",
    "type": "redox_other",
    "effects": [],
    "net": "2 C6H5MgBr + 2 C6H5Cl → 2 C12H10 + MgBr2 + MgCl2"
  },
  {
    "id": "om-kumada-phmgbr-phi",
    "name": "Kumada biaryl coupling: phenylmagnesium bromide and iodobenzene",
    "reactants": [
      "c6h5mgbr",
      "c6h5i"
    ],
    "products": [
      "c12h10",
      "mgbr2",
      "mgi2"
    ],
    "enthalpy": -215,
    "desc": "Biaryl cross-coupling.",
    "type": "redox_other",
    "effects": [],
    "net": "2 C6H5MgBr + 2 C6H5I → 2 C12H10 + MgBr2 + MgI2"
  },
  {
    "id": "om-coupling-phli-phbr",
    "name": "Organolithium biaryl coupling: phenyllithium and bromobenzene to biphenyl",
    "reactants": [
      "c6h5li",
      "bromobenzene"
    ],
    "products": [
      "c12h10",
      "libr"
    ],
    "enthalpy": -240,
    "desc": "Biaryl coupling.",
    "type": "redox_other",
    "effects": [],
    "net": "C6H5Li + C6H5Br → C12H10 + LiBr"
  },
  {
    "id": "om-coupling-phli-phcl",
    "name": "Organolithium biaryl coupling: phenyllithium and chlorobenzene to biphenyl",
    "reactants": [
      "c6h5li",
      "chlorobenzene"
    ],
    "products": [
      "c12h10",
      "licl"
    ],
    "enthalpy": -235,
    "desc": "Biaryl coupling.",
    "type": "redox_other",
    "effects": [],
    "net": "C6H5Li + C6H5Cl → C12H10 + LiCl"
  },
  {
    "id": "om-coupling-phli-phi",
    "name": "Organolithium biaryl coupling: phenyllithium and iodobenzene to biphenyl",
    "reactants": [
      "c6h5li",
      "c6h5i"
    ],
    "products": [
      "c12h10",
      "lii"
    ],
    "enthalpy": -245,
    "desc": "Biaryl coupling.",
    "type": "redox_other",
    "effects": [],
    "net": "C6H5Li + C6H5I → C12H10 + LiI"
  },
  {
    "id": "om-kumada-ch3mgcl-mecl",
    "name": "Wurtz-Grignard coupling: methylmagnesium chloride and chloromethane to ethane",
    "reactants": [
      "ch3mgcl",
      "ch3cl"
    ],
    "products": [
      "c2h6",
      "mgcl2"
    ],
    "enthalpy": -195,
    "desc": "Alkyl-alkyl coupling generating ethane gas.",
    "type": "gas_evolution",
    "effects": [],
    "net": "CH3MgCl + CH3Cl → C2H6 + MgCl2"
  },
  {
    "id": "om-kumada-ch3mgi-mei",
    "name": "Coupling of methylmagnesium iodide and iodomethane yielding ethane",
    "reactants": [
      "ch3mgi",
      "ch3i"
    ],
    "products": [
      "c2h6",
      "mgi2"
    ],
    "enthalpy": -205,
    "desc": "Cross-coupling forming ethane gas.",
    "type": "gas_evolution",
    "effects": [],
    "net": "CH3MgI + CH3I → C2H6 + MgI2"
  },
  {
    "id": "om-kumada-ch3mgcl-mei",
    "name": "Cross-coupling of methylmagnesium chloride with iodomethane",
    "reactants": [
      "ch3mgcl",
      "ch3i"
    ],
    "products": [
      "c2h6",
      "mgcl2",
      "mgi2"
    ],
    "enthalpy": -200,
    "desc": "Mixed halide coupling generating ethane.",
    "type": "gas_evolution",
    "effects": [],
    "net": "2 CH3MgCl + 2 CH3I → 2 C2H6 + MgCl2 + MgI2"
  },
  {
    "id": "om-coupling-phli-etbr",
    "name": "Ethylation of phenyllithium by bromoethane to ethylbenzene",
    "reactants": [
      "c6h5li",
      "c2h5br"
    ],
    "products": [
      "c8h10",
      "libr"
    ],
    "enthalpy": -205,
    "desc": "Alkylation producing ethylbenzene.",
    "type": "redox_other",
    "effects": [],
    "net": "C6H5Li + C2H5Br → C8H10 + LiBr"
  },
  {
    "id": "om-coupling-phli-etcl",
    "name": "Ethylation of phenyllithium by chloroethane to ethylbenzene",
    "reactants": [
      "c6h5li",
      "c2h5cl"
    ],
    "products": [
      "c8h10",
      "licl"
    ],
    "enthalpy": -200,
    "desc": "Alkylation.",
    "type": "redox_other",
    "effects": [],
    "net": "C6H5Li + C2H5Cl → C8H10 + LiCl"
  },
  {
    "id": "om-kumada-ch3mgi-phbr",
    "name": "Kumada coupling of methylmagnesium iodide with bromobenzene to toluene",
    "reactants": [
      "ch3mgi",
      "bromobenzene"
    ],
    "products": [
      "c7h8",
      "mgbr2",
      "mgi2"
    ],
    "enthalpy": -195,
    "desc": "Cross-coupling.",
    "type": "redox_other",
    "effects": [],
    "net": "2 CH3MgI + 2 C6H5Br → 2 C7H8 + MgBr2 + MgI2"
  },
  {
    "id": "om-kumada-ch3mgcl-phbr",
    "name": "Kumada coupling of methylmagnesium chloride with bromobenzene",
    "reactants": [
      "ch3mgcl",
      "bromobenzene"
    ],
    "products": [
      "c7h8",
      "mgbr2",
      "mgcl2"
    ],
    "enthalpy": -190,
    "desc": "Cross-coupling.",
    "type": "redox_other",
    "effects": [],
    "net": "2 CH3MgCl + 2 C6H5Br → 2 C7H8 + MgBr2 + MgCl2"
  },
  {
    "id": "om-kumada-ch3mgcl-phcl",
    "name": "Kumada coupling of methylmagnesium chloride with chlorobenzene to toluene",
    "reactants": [
      "ch3mgcl",
      "chlorobenzene"
    ],
    "products": [
      "c7h8",
      "mgcl2"
    ],
    "enthalpy": -185,
    "desc": "Cross-coupling.",
    "type": "redox_other",
    "effects": [],
    "net": "CH3MgCl + C6H5Cl → C7H8 + MgCl2"
  },
  {
    "id": "om-kumada-c2h5mgbr-phbr",
    "name": "Kumada coupling of ethylmagnesium bromide with bromobenzene to ethylbenzene",
    "reactants": [
      "c2h5mgbr",
      "bromobenzene"
    ],
    "products": [
      "c8h10",
      "mgbr2"
    ],
    "enthalpy": -180,
    "desc": "Cross-coupling.",
    "type": "redox_other",
    "effects": [],
    "net": "C2H5MgBr + C6H5Br → C8H10 + MgBr2"
  },
  {
    "id": "om-suzuki-pba-phbr-naoh",
    "name": "Suzuki-Miyaura cross-coupling: phenylboronic acid and bromobenzene (NaOH base)",
    "reactants": [
      "c6h7bo2_pba",
      "bromobenzene",
      "naoh"
    ],
    "products": [
      "c12h10",
      "h3bo3",
      "nabr"
    ],
    "enthalpy": -210,
    "desc": "Palladium-catalyzed biaryl cross-coupling.",
    "type": "redox_other",
    "effects": [],
    "net": "C6H7BO2 + C6H5Br + NaOH → C12H10 + H3BO3 + NaBr"
  },
  {
    "id": "om-suzuki-pba-phbr-koh",
    "name": "Suzuki-Miyaura cross-coupling: phenylboronic acid and bromobenzene (KOH base)",
    "reactants": [
      "c6h7bo2_pba",
      "bromobenzene",
      "koh"
    ],
    "products": [
      "c12h10",
      "h3bo3",
      "kbr"
    ],
    "enthalpy": -212,
    "desc": "Cross-coupling.",
    "type": "redox_other",
    "effects": [],
    "net": "C6H7BO2 + C6H5Br + KOH → C12H10 + H3BO3 + KBr"
  },
  {
    "id": "om-suzuki-pba-phcl-naoh",
    "name": "Suzuki-Miyaura cross-coupling: phenylboronic acid and chlorobenzene",
    "reactants": [
      "c6h7bo2_pba",
      "chlorobenzene",
      "naoh"
    ],
    "products": [
      "c12h10",
      "h3bo3",
      "nacl"
    ],
    "enthalpy": -205,
    "desc": "Cross-coupling.",
    "type": "redox_other",
    "effects": [],
    "net": "C6H7BO2 + C6H5Cl + NaOH → C12H10 + H3BO3 + NaCl"
  },
  {
    "id": "om-suzuki-pba-phcl-koh",
    "name": "Suzuki-Miyaura cross-coupling: phenylboronic acid and chlorobenzene with KOH",
    "reactants": [
      "c6h7bo2_pba",
      "chlorobenzene",
      "koh"
    ],
    "products": [
      "c12h10",
      "h3bo3",
      "kcl"
    ],
    "enthalpy": -207,
    "desc": "Cross-coupling.",
    "type": "redox_other",
    "effects": [],
    "net": "C6H7BO2 + C6H5Cl + KOH → C12H10 + H3BO3 + KCl"
  },
  {
    "id": "om-suzuki-pba-phi-naoh",
    "name": "Suzuki-Miyaura cross-coupling: phenylboronic acid and iodobenzene",
    "reactants": [
      "c6h7bo2_pba",
      "c6h5i",
      "naoh"
    ],
    "products": [
      "c12h10",
      "h3bo3",
      "nai"
    ],
    "enthalpy": -215,
    "desc": "Cross-coupling.",
    "type": "redox_other",
    "effects": [],
    "net": "C6H7BO2 + C6H5I + NaOH → C12H10 + H3BO3 + NaI"
  },
  {
    "id": "om-suzuki-pba-phi-koh",
    "name": "Suzuki-Miyaura cross-coupling: phenylboronic acid and iodobenzene with KOH",
    "reactants": [
      "c6h7bo2_pba",
      "c6h5i",
      "koh"
    ],
    "products": [
      "c12h10",
      "h3bo3",
      "ki"
    ],
    "enthalpy": -218,
    "desc": "Cross-coupling.",
    "type": "redox_other",
    "effects": [],
    "net": "C6H7BO2 + C6H5I + KOH → C12H10 + H3BO3 + KI"
  },
  {
    "id": "om-suzuki-pba-mei-naoh",
    "name": "Suzuki methylation: phenylboronic acid and iodomethane yielding toluene",
    "reactants": [
      "c6h7bo2_pba",
      "ch3i",
      "naoh"
    ],
    "products": [
      "c7h8",
      "h3bo3",
      "nai"
    ],
    "enthalpy": -195,
    "desc": "Cross-coupling.",
    "type": "redox_other",
    "effects": [],
    "net": "C6H7BO2 + CH3I + NaOH → C7H8 + H3BO3 + NaI"
  },
  {
    "id": "om-suzuki-pba-mecl-naoh",
    "name": "Suzuki methylation: phenylboronic acid and chloromethane yielding toluene",
    "reactants": [
      "c6h7bo2_pba",
      "ch3cl",
      "naoh"
    ],
    "products": [
      "c7h8",
      "h3bo3",
      "nacl"
    ],
    "enthalpy": -185,
    "desc": "Cross-coupling.",
    "type": "redox_other",
    "effects": [],
    "net": "C6H7BO2 + CH3Cl + NaOH → C7H8 + H3BO3 + NaCl"
  },
  {
    "id": "om-suzuki-pba-mebr-naoh",
    "name": "Suzuki methylation: phenylboronic acid and bromomethane yielding toluene",
    "reactants": [
      "c6h7bo2_pba",
      "ch3br",
      "naoh"
    ],
    "products": [
      "c7h8",
      "h3bo3",
      "nabr"
    ],
    "enthalpy": -190,
    "desc": "Cross-coupling.",
    "type": "redox_other",
    "effects": [],
    "net": "C6H7BO2 + CH3Br + NaOH → C7H8 + H3BO3 + NaBr"
  },
  {
    "id": "om-suzuki-pba-etbr-naoh",
    "name": "Suzuki ethylation: phenylboronic acid and bromoethane to ethylbenzene",
    "reactants": [
      "c6h7bo2_pba",
      "c2h5br",
      "naoh"
    ],
    "products": [
      "c8h10",
      "h3bo3",
      "nabr"
    ],
    "enthalpy": -180,
    "desc": "Cross-coupling.",
    "type": "redox_other",
    "effects": [],
    "net": "C6H7BO2 + C2H5Br + NaOH → C8H10 + H3BO3 + NaBr"
  },
  {
    "id": "om-suzuki-pba-etcl-naoh",
    "name": "Suzuki ethylation: phenylboronic acid and chloroethane to ethylbenzene",
    "reactants": [
      "c6h7bo2_pba",
      "c2h5cl",
      "naoh"
    ],
    "products": [
      "c8h10",
      "h3bo3",
      "nacl"
    ],
    "enthalpy": -175,
    "desc": "Cross-coupling.",
    "type": "redox_other",
    "effects": [],
    "net": "C6H7BO2 + C2H5Cl + NaOH → C8H10 + H3BO3 + NaCl"
  },
  {
    "id": "om-pba-protodeboronation",
    "name": "Protodeboronation: hydrolytic cleavage of phenylboronic acid to benzene",
    "reactants": [
      "c6h7bo2_pba",
      "water"
    ],
    "products": [
      "c6h6",
      "h3bo3"
    ],
    "enthalpy": -45,
    "desc": "Hydrolytic cleavage.",
    "type": "redox_other",
    "effects": [],
    "net": "C6H7BO2 + H2O → C6H6 + H3BO3"
  },
  {
    "id": "om-pba-oxidation-peroxide",
    "name": "Oxidation of phenylboronic acid by alkaline hydrogen peroxide to sodium phenolate",
    "reactants": [
      "c6h7bo2_pba",
      "h2o2",
      "naoh"
    ],
    "products": [
      "sodium-phenolate",
      "h3bo3",
      "water"
    ],
    "enthalpy": -360,
    "desc": "Oxidative deboronation.",
    "type": "redox_other",
    "effects": [],
    "net": "C6H7BO2 + H2O2 + NaOH → C6H5ONa + H3BO3 + H2O"
  },
  {
    "id": "om-pba-ipso-nitration",
    "name": "Ipso-nitration of phenylboronic acid yielding nitrobenzene",
    "reactants": [
      "c6h7bo2_pba",
      "hno3"
    ],
    "products": [
      "nitrobenzene",
      "h3bo3"
    ],
    "enthalpy": -140,
    "desc": "Electrophilic ipso-substitution.",
    "type": "redox_other",
    "effects": [],
    "net": "C6H7BO2 + HNO3 → C6H5NO2 + H3BO3"
  },
  {
    "id": "om-pba-bromodeboronation",
    "name": "Bromodeboronation of phenylboronic acid yielding bromobenzene",
    "reactants": [
      "c6h7bo2_pba",
      "br2",
      "water"
    ],
    "products": [
      "bromobenzene",
      "hbr",
      "h3bo3"
    ],
    "enthalpy": -120,
    "desc": "Halodeboronation.",
    "type": "redox_other",
    "effects": [],
    "net": "C6H7BO2 + Br2 + H2O → C6H5Br + HBr + H3BO3"
  },
  {
    "id": "om-ferrocene-naoh-synth",
    "name": "Synthesis of ferrocene from cyclopentadiene, iron(II) chloride, and NaOH",
    "reactants": [
      "fecl2",
      "c5h6_cpd",
      "naoh"
    ],
    "products": [
      "fe-c5h5-2",
      "nacl",
      "water"
    ],
    "enthalpy": -165,
    "desc": "Base-promoted deprotonation and coordination.",
    "type": "redox_other",
    "effects": [],
    "net": "FeCl2 + 2 C5H6 + 2 NaOH → C10H10Fe + 2 NaCl + 2 H2O"
  },
  {
    "id": "om-ferrocene-koh-synth",
    "name": "Synthesis of ferrocene using KOH base",
    "reactants": [
      "fecl2",
      "c5h6_cpd",
      "koh"
    ],
    "products": [
      "fe-c5h5-2",
      "kcl",
      "water"
    ],
    "enthalpy": -170,
    "desc": "Coordination synthesis.",
    "type": "redox_other",
    "effects": [],
    "net": "FeCl2 + 2 C5H6 + 2 KOH → C10H10Fe + 2 KCl + 2 H2O"
  },
  {
    "id": "om-ferrocene-ammonia-synth",
    "name": "Synthesis of ferrocene using ammonia base",
    "reactants": [
      "fecl2",
      "c5h6_cpd",
      "ammonia"
    ],
    "products": [
      "fe-c5h5-2",
      "ammonium-chloride"
    ],
    "enthalpy": -155,
    "desc": "Ammoniacal ferrocene synthesis.",
    "type": "redox_other",
    "effects": [],
    "net": "FeCl2 + 2 C5H6 + 2 NH3 → C10H10Fe + 2 NH4Cl"
  },
  {
    "id": "om-titanocene-naoh-synth",
    "name": "Synthesis of titanocene dichloride from TiCl4, cyclopentadiene, and NaOH",
    "reactants": [
      "ticl4",
      "c5h6_cpd",
      "naoh"
    ],
    "products": [
      "ti-c5h5-2-cl2",
      "nacl",
      "water"
    ],
    "enthalpy": -210,
    "desc": "Organotitanium synthesis.",
    "type": "redox_other",
    "effects": [],
    "net": "TiCl4 + 2 C5H6 + 2 NaOH → C10H10Cl2Ti + 2 NaCl + 2 H2O"
  },
  {
    "id": "om-titanocene-koh-synth",
    "name": "Synthesis of titanocene dichloride using KOH base",
    "reactants": [
      "ticl4",
      "c5h6_cpd",
      "koh"
    ],
    "products": [
      "ti-c5h5-2-cl2",
      "kcl",
      "water"
    ],
    "enthalpy": -215,
    "desc": "Organotitanium synthesis.",
    "type": "redox_other",
    "effects": [],
    "net": "TiCl4 + 2 C5H6 + 2 KOH → C10H10Cl2Ti + 2 KCl + 2 H2O"
  },
  {
    "id": "om-titanocene-ammonia-synth",
    "name": "Synthesis of titanocene dichloride using ammonia",
    "reactants": [
      "ticl4",
      "c5h6_cpd",
      "ammonia"
    ],
    "products": [
      "ti-c5h5-2-cl2",
      "ammonium-chloride"
    ],
    "enthalpy": -195,
    "desc": "Coordination synthesis.",
    "type": "redox_other",
    "effects": [],
    "net": "TiCl4 + 2 C5H6 + 2 NH3 → C10H10Cl2Ti + 2 NH4Cl"
  },
  {
    "id": "om-ferrocene-combustion",
    "name": "Complete combustion of ferrocene to iron(III) oxide and CO2",
    "reactants": [
      "fe-c5h5-2",
      "o2"
    ],
    "products": [
      "fe2o3",
      "co2",
      "water"
    ],
    "enthalpy": -6420,
    "desc": "Combustion.",
    "type": "combustion",
    "effects": [],
    "net": "4 C10H10Fe + 53 O2 → 2 Fe2O3 + 40 CO2 + 20 H2O"
  },
  {
    "id": "om-ferrocene-nitric-digestion",
    "name": "Oxidative acid digestion of ferrocene in hot nitric acid",
    "reactants": [
      "fe-c5h5-2",
      "hno3"
    ],
    "products": [
      "fe-no3-3",
      "no2",
      "co2",
      "water"
    ],
    "enthalpy": -3280,
    "desc": "Nitric acid oxidation.",
    "type": "redox_other",
    "effects": [],
    "net": "C10H10Fe + 56 HNO3 → Fe(NO3)3 + 53 NO2 + 10 CO2 + 33 H2O"
  },
  {
    "id": "om-titanocene-hydrolysis-water",
    "name": "Aqueous hydrolysis of titanocene dichloride producing TiO2 and cyclopentadiene",
    "reactants": [
      "ti-c5h5-2-cl2",
      "water"
    ],
    "products": [
      "tio2",
      "hcl",
      "c5h6_cpd"
    ],
    "enthalpy": -65,
    "desc": "Hydrolysis.",
    "type": "redox_other",
    "effects": [],
    "net": "C10H10Cl2Ti + 2 H2O → TiO2 + 2 HCl + 2 C5H6"
  },
  {
    "id": "om-titanocene-combustion",
    "name": "Thermal combustion of titanocene dichloride producing titanium dioxide",
    "reactants": [
      "ti-c5h5-2-cl2",
      "o2"
    ],
    "products": [
      "tio2",
      "cl2",
      "co2",
      "water"
    ],
    "enthalpy": -4950,
    "desc": "Combustion.",
    "type": "combustion",
    "effects": [],
    "net": "2 C10H10Cl2Ti + 27 O2 → 2 TiO2 + 2 Cl2 + 20 CO2 + 10 H2O"
  },
  {
    "id": "om-pd-oac2-reduction-h2",
    "name": "Hydrogen reduction of palladium(II) acetate to active Pd(0) catalyst",
    "reactants": [
      "pd-oac-2",
      "h2"
    ],
    "products": [
      "pd",
      "ch3cooh"
    ],
    "enthalpy": -145,
    "desc": "Catalyst activation.",
    "type": "redox_other",
    "effects": [],
    "net": "C4H6O4Pd + H2 → Pd + 2 CH3COOH"
  },
  {
    "id": "om-pd-oac2-reduction-co",
    "name": "Carbon monoxide reduction of palladium(II) acetate to Pd(0)",
    "reactants": [
      "pd-oac-2",
      "co",
      "water"
    ],
    "products": [
      "pd",
      "co2",
      "ch3cooh"
    ],
    "enthalpy": -195,
    "desc": "Reductive carbonylation.",
    "type": "redox_other",
    "effects": [],
    "net": "C4H6O4Pd + 5 CO + 3 H2O → Pd + 3 CO2 + 3 CH3COOH"
  },
  {
    "id": "om-pd-oac2-reduction-methanol",
    "name": "Methanol reduction of palladium(II) acetate generating formaldehyde and Pd(0)",
    "reactants": [
      "pd-oac-2",
      "ch3oh"
    ],
    "products": [
      "pd",
      "hcho",
      "ch3cooh"
    ],
    "enthalpy": -110,
    "desc": "Alcohol reduction.",
    "type": "redox_other",
    "effects": [],
    "net": "3 C4H6O4Pd + 3 CH3OH → 3 Pd + 5 HCHO + 5 CH3COOH"
  },
  {
    "id": "om-pd-oac2-metathesis-hcl",
    "name": "Acid metathesis: palladium(II) acetate conversion to palladium(II) chloride",
    "reactants": [
      "pd-oac-2",
      "hcl"
    ],
    "products": [
      "pdcl2",
      "ch3cooh"
    ],
    "enthalpy": -65,
    "desc": "Ligand metathesis.",
    "type": "redox_other",
    "effects": [],
    "net": "C4H6O4Pd + 2 HCl → PdCl2 + 2 CH3COOH"
  },
  {
    "id": "om-pd-oac2-reduction-nabh4",
    "name": "Sodium borohydride reduction of palladium acetate to zero-valent Pd nanoparticles",
    "reactants": [
      "pd-oac-2",
      "nabh4",
      "water"
    ],
    "products": [
      "pd",
      "h3bo3",
      "ch3coona",
      "h2"
    ],
    "enthalpy": -420,
    "desc": "Nanoparticle synthesis.",
    "type": "redox_other",
    "effects": [],
    "net": "C4H6O4Pd + 2 NaBH4 + 6 H2O → Pd + 2 H3BO3 + 2 CH3COONa + 7 H2"
  },
  {
    "id": "om-pd-oac2-reduction-mg",
    "name": "Magnesium metal reduction of palladium(II) acetate",
    "reactants": [
      "pd-oac-2",
      "mg"
    ],
    "products": [
      "pd",
      "ch3coo-2-mg"
    ],
    "enthalpy": -310,
    "desc": "Metallo-reduction.",
    "type": "redox_other",
    "effects": [],
    "net": "C4H6O4Pd + Mg → Pd + (CH3COO)2Mg"
  },
  {
    "id": "om-pd-oac2-reduction-zn",
    "name": "Zinc dust reduction of palladium(II) acetate",
    "reactants": [
      "pd-oac-2",
      "zn"
    ],
    "products": [
      "pd",
      "ch3coo-2-zn"
    ],
    "enthalpy": -280,
    "desc": "Metallo-reduction.",
    "type": "redox_other",
    "effects": [],
    "net": "C4H6O4Pd + Zn → Pd + (CH3COO)2Zn"
  },
  {
    "id": "om-pd-oac2-reduction-fe",
    "name": "Iron metal cementation of palladium from palladium acetate",
    "reactants": [
      "pd-oac-2",
      "fe"
    ],
    "products": [
      "pd",
      "ch3coo-2-fe"
    ],
    "enthalpy": -240,
    "desc": "Cementation.",
    "type": "redox_other",
    "effects": [],
    "net": "C4H6O4Pd + Fe → Pd + (CH3COO)2Fe"
  },
  {
    "id": "om-pd-oac2-reduction-cu",
    "name": "Copper wire reduction of palladium acetate to palladium metal",
    "reactants": [
      "pd-oac-2",
      "cu"
    ],
    "products": [
      "pd",
      "ch3coo-2-cu"
    ],
    "enthalpy": -150,
    "desc": "Cementation.",
    "type": "redox_other",
    "effects": [],
    "net": "C4H6O4Pd + Cu → Pd + Cu(CH3COO)2"
  },
  {
    "id": "om-pd-oac2-combustion",
    "name": "Thermal calcination of palladium(II) acetate yielding palladium metal",
    "reactants": [
      "pd-oac-2",
      "o2"
    ],
    "products": [
      "pd",
      "co2",
      "water"
    ],
    "enthalpy": -1650,
    "desc": "Oxidative calcination.",
    "type": "combustion",
    "effects": [],
    "net": "2 C4H6O4Pd + 7 O2 → 2 Pd + 8 CO2 + 6 H2O"
  }
];

  for (const r of reactions) {
    addReaction({
      id: r.id,
      name: r.name,
      reactionType: (r.type || "redox_other") as any,
      reactants: r.reactants,
      products: r.products,
      netIonicEquation: r.net,
      enthalpyKjPerMol: r.enthalpy,
      observableEffects: r.effects || [],
      safetyNotes: r.desc,
    });
  }
}
