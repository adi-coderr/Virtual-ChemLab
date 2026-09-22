import { addReaction } from "./generateBatch5.js";

export function buildDomain12OrganicSynthesis(): void {
  // Domain 12: 150 Organic Synthesis & Named Reactions
  const reactions = [
    // 1. Acylations, Anhydride & Acid Chloride Esterifications (30)
    {
      id: "org-acetyl-chloride-methanol",
      name: "Synthesis of methyl acetate from acetyl chloride and methanol",
      reactants: ["ch3cocl", "ch3oh"],
      products: ["c3h6o2_est", "hcl"],
      enthalpy: -68.0,
      desc: "Violent exothermic reaction releasing dense white acidic fumes of hydrogen chloride as fruity ester forms."
    },
    {
      id: "org-acetyl-chloride-ethanol",
      name: "Synthesis of ethyl acetate from acetyl chloride and ethanol",
      reactants: ["ch3cocl", "c2h5oh"],
      products: ["ch3cooc2h5", "hcl"],
      enthalpy: -70.0,
      desc: "Rapid exothermic esterification yielding sweet-smelling ethyl acetate with choking HCl gas evolution."
    },
    {
      id: "org-acetyl-chloride-propanol",
      name: "Acylation of 1-propanol with acetyl chloride",
      reactants: ["ch3cocl", "c3h8o"],
      products: ["c5h10o2", "hcl"],
      enthalpy: -69.0,
      desc: "Fast acylation forming propyl acetate with copious effervescence of hydrogen chloride."
    },
    {
      id: "org-acetyl-chloride-water-hydrolysis",
      name: "Vigorous hydrolysis of acetyl chloride",
      reactants: ["ch3cocl", "water"],
      products: ["ch3cooh", "hcl"],
      enthalpy: -112.0,
      desc: "Violent, sputtering hydrolysis accompanied by hissing, steaming, and dense choking clouds of HCl mist."
    },
    {
      id: "org-acetyl-chloride-ammonia",
      name: "Ammonolysis of acetyl chloride to acetamide",
      reactants: ["ch3cocl", "ammonia"],
      products: ["acetamide", "ammonium-chloride"],
      enthalpy: -145.0,
      desc: "Exothermic reaction in ether precipitating dense white fumes and crystals of ammonium chloride and acetamide."
    },
    {
      id: "org-acetyl-chloride-phenol",
      name: "Schotten-Baumann synthesis of phenyl acetate",
      reactants: ["ch3cocl", "phenol"],
      products: ["c8h8o3", "hcl"], // using phenolic ester
      enthalpy: -55.0,
      desc: "Phenol reacts with acetyl chloride releasing HCl vapor, forming liquid phenyl ester."
    },
    {
      id: "org-acetyl-chloride-salicylic-acid",
      name: "Synthesis of aspirin from salicylic acid and acetyl chloride",
      reactants: ["ch3cocl", "salicylic-acid"],
      products: ["aspirin", "hcl"],
      enthalpy: -62.0,
      desc: "Salicylic acid dissolves upon heating with acetyl chloride; on cooling, white lustrous crystals of aspirin precipitate."
    },
    {
      id: "org-acetic-anhydride-methanol",
      name: "Alcoholysis of acetic anhydride with methanol",
      reactants: ["ac2o", "ch3oh"],
      products: ["c3h6o2_est", "ch3cooh"],
      enthalpy: -48.0,
      desc: "Smooth exothermic esterification forming methyl acetate and acetic acid."
    },
    {
      id: "org-acetic-anhydride-ethanol",
      name: "Alcoholysis of acetic anhydride with ethanol",
      reactants: ["ac2o", "c2h5oh"],
      products: ["ch3cooc2h5", "ch3cooh"],
      enthalpy: -50.0,
      desc: "Acid-catalyzed esterification yielding sweet ethyl acetate solvent."
    },
    {
      id: "org-acetic-anhydride-water-hydrolysis",
      name: "Hydrolysis of acetic anhydride",
      reactants: ["ac2o", "water"],
      products: ["ch3cooh"],
      enthalpy: -58.0,
      desc: "Slow dissolution and exothermic cleavage of acetic anhydride into glacial acetic acid."
    },
    {
      id: "org-acetic-anhydride-salicylic-acid",
      name: "Industrial synthesis of aspirin (acetylsalicylic acid)",
      reactants: ["ac2o", "salicylic-acid"],
      products: ["aspirin", "ch3cooh"],
      enthalpy: -42.0,
      desc: "Classic pharmaceutical synthesis: white needle-like crystals of acetylsalicylic acid form upon adding ice-water."
    },
    {
      id: "org-benzoyl-chloride-water-hydrolysis",
      name: "Hydrolysis of benzoyl chloride",
      reactants: ["c6h5cocl", "water"],
      products: ["c6h5cooh", "hcl"],
      enthalpy: -75.0,
      desc: "Slow lachrymatory hydrolysis forming glittering white flakes of benzoic acid."
    },
    {
      id: "org-benzoyl-chloride-methanol",
      name: "Methanolysis of benzoyl chloride to methyl benzoate",
      reactants: ["c6h5cocl", "ch3oh"],
      products: ["c8h8o2", "hcl"],
      enthalpy: -65.0,
      desc: "Exothermic reaction producing sweet, floral-scented methyl benzoate (oil of Niobe) with HCl evolution."
    },
    {
      id: "org-benzoyl-chloride-ethanol",
      name: "Ethanolysis of benzoyl chloride to ethyl benzoate",
      reactants: ["c6h5cocl", "c2h5oh"],
      products: ["c9h10o2", "hcl"],
      enthalpy: -66.0,
      desc: "Fruity aromatic ester layer separates with evolution of hydrogen chloride gas."
    },
    {
      id: "org-benzoyl-chloride-ammonia",
      name: "Ammonolysis of benzoyl chloride to benzamide",
      reactants: ["c6h5cocl", "ammonia"],
      products: ["benzamide", "ammonium-chloride"],
      enthalpy: -138.0,
      desc: "White crystalline flakes of benzamide precipitate vigorously alongside ammonium chloride."
    },
    {
      id: "org-benzoyl-chloride-phenol",
      name: "Schotten-Baumann acylation of phenol to phenyl benzoate",
      reactants: ["c6h5cocl", "sodium-phenolate"],
      products: ["c13h10o2_est", "nacl"],
      enthalpy: -115.0,
      desc: "Rapid precipitation of lustrous white crystalline phenyl benzoate in alkaline aqueous emulsion."
    },
    {
      id: "org-phthalic-anhydride-ethanol",
      name: "Monoesterification of phthalic anhydride with ethanol",
      reactants: ["phthalic-anhydride", "c2h5oh"],
      products: ["c10h10o4"],
      enthalpy: -35.0,
      desc: "Ring opening of cyclic phthalic anhydride by ethanol forming phthalate ester."
    },
    {
      id: "org-phthalic-anhydride-water",
      name: "Hydration of phthalic anhydride to phthalic acid",
      reactants: ["phthalic-anhydride", "water"],
      products: ["c8h6o4"],
      enthalpy: -28.0,
      desc: "Hot water hydrolyzes white crystalline phthalic anhydride to sparkling plates of phthalic acid."
    },
    {
      id: "org-maleic-anhydride-water",
      name: "Hydration of maleic anhydride to maleic acid",
      reactants: ["maleic-anhydride", "water"],
      products: ["c4h4o4"],
      enthalpy: -36.0,
      desc: "Exothermic hydration of maleic anhydride crystals into cis-butenedioic acid."
    },
    {
      id: "org-maleic-anhydride-methanol",
      name: "Methanolysis of maleic anhydride",
      reactants: ["maleic-anhydride", "ch3oh"],
      products: ["c5h6o4"],
      enthalpy: -40.0,
      desc: "Ring opening forming monomethyl maleate."
    },
    {
      id: "org-acetic-anhydride-ammonia",
      name: "Synthesis of acetamide from acetic anhydride",
      reactants: ["ac2o", "ammonia"],
      products: ["acetamide", "ammonium-acetate"],
      enthalpy: -95.0,
      desc: "Exothermic reaction in ether forming deliquescent crystals of acetamide."
    },
    {
      id: "org-acetyl-chloride-methylamine",
      name: "Synthesis of N-methylacetamide from acetyl chloride",
      reactants: ["ch3cocl", "methylamine"],
      products: ["c3h7no", "hcl"],
      enthalpy: -92.0,
      desc: "Pungent gas reacts vigorously forming substituted secondary amide."
    },
    {
      id: "org-acetyl-chloride-dimethylamine",
      name: "Synthesis of N,N-dimethylacetamide",
      reactants: ["ch3cocl", "dimethylamine"],
      products: ["c4h9no", "hcl"],
      enthalpy: -98.0,
      desc: "Dense white salt fumes accompany tertiary amide formation."
    },
    {
      id: "org-benzoyl-chloride-methylamine",
      name: "Synthesis of N-methylbenzamide",
      reactants: ["c6h5cocl", "methylamine"],
      products: ["c8h9no", "hcl"],
      enthalpy: -90.0,
      desc: "Solid white crystalline amide forms rapidly."
    },
    {
      id: "org-benzyl-alcohol-acetic-acid",
      name: "Fischer esterification of benzyl alcohol with acetic acid",
      reactants: ["benzyl-alcohol", "ch3cooh"],
      products: ["c9h10o2", "water"],
      enthalpy: -10.0,
      desc: "Refluxing benzyl alcohol with glacial acetic acid forms fragrant benzyl acetate layer."
    },
    {
      id: "org-benzyl-alcohol-formic-acid",
      name: "Fischer esterification of benzyl alcohol with formic acid",
      reactants: ["benzyl-alcohol", "hcooh"],
      products: ["c8h8o2", "water"],
      enthalpy: -9.0,
      desc: "Acid-catalyzed condensation of benzyl alcohol and formic acid yields sweet fruity benzyl formate."
    },
    {
      id: "org-salicylic-acid-methanol-wintergreen",
      name: "Synthesis of oil of wintergreen (methyl salicylate)",
      reactants: ["salicylic-acid", "ch3oh"],
      products: ["c8h8o3", "water"],
      enthalpy: -12.0,
      desc: "Formation of intensely sweet, minty-scented wintergreen oil layer on addition of water."
    },
    {
      id: "org-adipic-acid-methanol",
      name: "Diesterification of adipic acid with methanol",
      reactants: ["adipic-acid", "ch3oh"],
      products: ["c8h14o4", "water"],
      enthalpy: -15.0,
      desc: "Clear dimethyl adipate ester layer separates upon cooling."
    },
    {
      id: "org-adipic-acid-ethanol",
      name: "Diesterification of adipic acid with ethanol",
      reactants: ["adipic-acid", "c2h5oh"],
      products: ["c10h18o4", "water"],
      enthalpy: -16.0,
      desc: "Diethyl adipate ester formation."
    },
    {
      id: "org-terephthalic-acid-methanol",
      name: "Methanol esterification of terephthalic acid to dimethyl terephthalate",
      reactants: ["terephthalic-acid", "ch3oh"],
      products: ["dimethyl-terephthalate", "water"],
      enthalpy: -14.0,
      desc: "Industrial polyester precursor DMT crystallizes as glistening white leaflets."
    },

    // 2. Friedel-Crafts Alkylations, Acylations & Electrophilic Substitutions (35)
    {
      id: "org-fc-acylation-benzene-acetyl",
      name: "Friedel-Crafts acylation of benzene to acetophenone",
      reactants: ["c6h6", "ch3cocl"],
      products: ["acetophenone", "hcl"],
      enthalpy: -85.0,
      desc: "In the presence of anhydrous AlCl3, benzene reacts with acetyl chloride evolving pungent HCl gas."
    },
    {
      id: "org-fc-acylation-benzene-benzoyl",
      name: "Friedel-Crafts synthesis of benzophenone",
      reactants: ["c6h6", "c6h5cocl"],
      products: ["benzophenone", "hcl"],
      enthalpy: -82.0,
      desc: "Benzene and benzoyl chloride condense into aromatic ketone benzophenone."
    },
    {
      id: "org-fc-acylation-toluene-acetyl",
      name: "Friedel-Crafts acylation of toluene",
      reactants: ["c7h8", "ch3cocl"],
      products: ["c9h10o", "hcl"],
      enthalpy: -90.0,
      desc: "Fast acylation of toluene yielding 4-methylacetophenone."
    },
    {
      id: "org-fc-alkylation-benzene-chloromethane",
      name: "Friedel-Crafts methylation of benzene to toluene",
      reactants: ["c6h6", "ch3cl"],
      products: ["c7h8", "hcl"],
      enthalpy: -95.0,
      desc: "AlCl3-catalyzed electrophilic alkylation evolving hydrogen chloride gas."
    },
    {
      id: "org-fc-alkylation-benzene-chloroethane",
      name: "Friedel-Crafts ethylation of benzene to ethylbenzene",
      reactants: ["c6h6", "c2h5cl"],
      products: ["c8h10", "hcl"],
      enthalpy: -98.0,
      desc: "Ethylation of benzene producing ethylbenzene with steady HCl effervescence."
    },
    {
      id: "org-fc-alkylation-toluene-chloromethane",
      name: "Friedel-Crafts methylation of toluene to xylene",
      reactants: ["c7h8", "ch3cl"],
      products: ["c8h10", "hcl"],
      enthalpy: -96.0,
      desc: "Methylation producing isomeric dimethylbenzenes."
    },
    {
      id: "org-electrophilic-bromination-benzene",
      name: "Electrophilic aromatic bromination of benzene",
      reactants: ["c6h6", "br2"],
      products: ["bromobenzene", "hbr"],
      enthalpy: -45.0,
      desc: "Catalyzed by FeBr3: red-brown bromine decolorizes with evolution of acidic white HBr fumes."
    },
    {
      id: "org-electrophilic-chlorination-benzene",
      name: "Electrophilic aromatic chlorination of benzene",
      reactants: ["c6h6", "cl2"],
      products: ["chlorobenzene", "hcl"],
      enthalpy: -105.0,
      desc: "FeCl3-catalyzed chlorination generating chlorobenzene and copious HCl gas."
    },
    {
      id: "org-nitration-benzene",
      name: "Nitration of benzene to nitrobenzene",
      reactants: ["c6h6", "hno3"],
      products: ["nitrobenzene", "water"],
      enthalpy: -130.0,
      desc: "Nitrating mixture (HNO3/H2SO4) converts benzene into a dense, oily pale-yellow layer of nitrobenzene."
    },
    {
      id: "org-nitration-toluene",
      name: "Mononitration of toluene",
      reactants: ["c7h8", "hno3"],
      products: ["c7h7no2", "water"],
      enthalpy: -135.0,
      desc: "Exothermic nitration producing ortho- and para-nitrotoluenes."
    },
    {
      id: "org-nitration-chlorobenzene",
      name: "Nitration of chlorobenzene",
      reactants: ["chlorobenzene", "hno3"],
      products: ["c6h4clno2", "water"],
      enthalpy: -128.0,
      desc: "Nitration yielding pale yellow crystalline 1-chloro-4-nitrobenzene."
    },
    {
      id: "org-nitration-phenol-picric",
      name: "Exhaustive trinitration of phenol to picric acid",
      reactants: ["phenol", "hno3"],
      products: ["picric-acid", "water"],
      enthalpy: -380.0,
      desc: "Vigorous nitration: solution turns intensely bright canary-yellow, depositing explosive picric acid crystals."
    },
    {
      id: "org-bromination-phenol",
      name: "Electrophilic tribromination of phenol",
      reactants: ["phenol", "br2"],
      products: ["c6h3br3o", "hbr"],
      enthalpy: -190.0,
      desc: "Bromine water instantly decolorizes, throwing down a dense white crystalline precipitate of 2,4,6-tribromophenol."
    },
    {
      id: "org-bromination-aniline",
      name: "Electrophilic tribromination of aniline",
      reactants: ["aniline", "br2"],
      products: ["c6h4br3n", "hbr"],
      enthalpy: -210.0,
      desc: "Aniline instantly precipitates white flocculent 2,4,6-tribromoaniline on adding bromine water."
    },
    {
      id: "org-chlorination-toluene-sidechain",
      name: "Free-radical side-chain chlorination of toluene to benzyl chloride",
      reactants: ["c7h8", "cl2"],
      products: ["benzyl-chloride", "hcl"],
      enthalpy: -108.0,
      desc: "Photochemical chlorination under UV light converts boiling toluene into lachrymatory benzyl chloride."
    },
    {
      id: "org-diels-alder-butadiene-maleic",
      name: "Diels-Alder cycloaddition of 1,3-butadiene and maleic anhydride",
      reactants: ["butadiene", "maleic-anhydride"],
      products: ["c8h8o3_da"],
      enthalpy: -165.0,
      desc: "Classic concerted [4+2] cycloaddition yielding cis-1,2,3,6-tetrahydrophthalic anhydride crystals."
    },
    {
      id: "org-williamson-ether-sodium-phenolate-ch3i",
      name: "Williamson ether synthesis of anisole (methoxybenzene)",
      reactants: ["sodium-phenolate", "ch3i"],
      products: ["c7h8o_ether", "nai"],
      enthalpy: -85.0,
      desc: "Sodium phenoxide attacks iodomethane, precipitating sodium iodide and yielding pleasant anise-scented anisole."
    },
    {
      id: "org-williamson-ether-sodium-phenolate-c2h5i",
      name: "Williamson ether synthesis of phenetole",
      reactants: ["sodium-phenolate", "c2h5i"],
      products: ["c8h10o_ether", "nai"],
      enthalpy: -84.0,
      desc: "Formation of ethyl phenyl ether."
    },
    {
      id: "org-williamson-diethyl-ether",
      name: "Williamson ether synthesis of diethyl ether",
      reactants: ["c2h5ona", "c2h5i"],
      products: ["diethyl-ether", "nai"],
      enthalpy: -90.0,
      desc: "Sodium ethoxide nucleophilically displaces iodide, precipitating white NaI in ether."
    },
    {
      id: "org-kolbe-schmitt-salicylic-acid",
      name: "Kolbe-Schmitt carboxylation of sodium phenolate to salicylic acid",
      reactants: ["sodium-phenolate", "co2", "hcl"],
      products: ["salicylic-acid", "nacl"],
      enthalpy: -110.0,
      desc: "Under heat and pressure, CO2 carboxylates phenoxide, acidifying to produce crystalline salicylic acid."
    },
    {
      id: "org-sulfonyl-chloride-benzene",
      name: "Electrophilic chlorosulfonation of benzene",
      reactants: ["c6h6", "so2cl2"],
      products: ["chlorobenzene", "so2", "hcl"],
      enthalpy: -75.0,
      desc: "Sulfuryl chloride chlorinates benzene under catalytic conditions."
    },
    {
      id: "org-alkylation-benzene-propene-cumene",
      name: "Industrial synthesis of cumene by Friedel-Crafts alkylation of benzene",
      reactants: ["c6h6", "c3h6"],
      products: ["cumene"],
      enthalpy: -105.0,
      desc: "Solid acid-catalyzed addition of propylene to benzene producing cumene."
    },
    {
      id: "org-alkylation-benzene-ethene",
      name: "Friedel-Crafts alkylation of benzene with ethylene to ethylbenzene",
      reactants: ["c6h6", "c2h4"],
      products: ["c8h10"],
      enthalpy: -106.0,
      desc: "Exothermic catalytic gas-liquid addition producing pure ethylbenzene."
    },
    {
      id: "org-chlorination-chlorobenzene-dichlorobenzene",
      name: "Further chlorination of chlorobenzene to 1,4-dichlorobenzene",
      reactants: ["chlorobenzene", "cl2"],
      products: ["c6h4cl2", "hcl"],
      enthalpy: -102.0,
      desc: "Forms crystalline white mothball-scented para-dichlorobenzene."
    },
    {
      id: "org-bromination-toluene-bromotoluene",
      name: "Ring bromination of toluene",
      reactants: ["c7h8", "br2"],
      products: ["c7h7br", "hbr"],
      enthalpy: -48.0,
      desc: "Iron-catalyzed electrophilic substitution yielding 4-bromotoluene."
    },
    {
      id: "org-sulfonation-benzene",
      name: "Aromatic sulfonation of benzene",
      reactants: ["c6h6", "h2so4"],
      products: ["c6h6o3s", "water"],
      enthalpy: -35.0,
      desc: "Fuming sulfuric acid sulfonates benzene into water-soluble benzenesulfonic acid."
    },
    {
      id: "org-sulfonation-toluene",
      name: "Aromatic sulfonation of toluene to p-toluenesulfonic acid",
      reactants: ["c7h8", "h2so4"],
      products: ["c7h8o3s", "water"],
      enthalpy: -38.0,
      desc: "Produces hygroscopic crystalline organic superacid PTSA."
    },
    {
      id: "org-sulfonation-phenol",
      name: "Sulfonation of phenol",
      reactants: ["phenol", "h2so4"],
      products: ["c6h6o4s", "water"],
      enthalpy: -42.0,
      desc: "Smooth sulfonation yielding 4-hydroxybenzenesulfonic acid."
    },
    {
      id: "org-alkylation-phenol-methyl",
      name: "Etherification of phenol to methyl ether with dimethyl sulfate model",
      reactants: ["sodium-phenolate", "ch3cl"],
      products: ["c7h8o_ether", "nacl"],
      enthalpy: -78.0,
      desc: "Nucleophilic phenoxide attack yields anisole and sodium chloride."
    },
    {
      id: "org-alkylation-aniline-methyl",
      name: "N-methylation of aniline with chloromethane",
      reactants: ["aniline", "ch3cl"],
      products: ["c7h9n", "hcl"],
      enthalpy: -72.0,
      desc: "Forms N-methylaniline."
    },
    {
      id: "org-alkylation-aniline-dimethyl",
      name: "N-methylation of N-methylaniline to N,N-dimethylaniline",
      reactants: ["c7h9n", "ch3cl"],
      products: ["c8h11n", "hcl"],
      enthalpy: -73.0,
      desc: "Yields industrial dye intermediate N,N-dimethylaniline."
    },
    {
      id: "org-halogenation-acetic-acid-hvh",
      name: "Hell-Volhard-Zelinsky alpha-halogenation of acetic acid",
      reactants: ["ch3cooh", "cl2"],
      products: ["c2h3clo2", "hcl"],
      enthalpy: -95.0,
      desc: "Red phosphorus-catalyzed chlorination yielding chloroacetic acid."
    },
    {
      id: "org-halogenation-propionic-acid",
      name: "Alpha-bromination of propionic acid",
      reactants: ["c2h5cooh", "br2"],
      products: ["c3h5bro2", "hbr"],
      enthalpy: -42.0,
      desc: "Produces 2-bromopropionic acid."
    },
    {
      id: "org-halogenation-isobutylene",
      name: "Electrophilic chlorine addition to isobutylene",
      reactants: ["isobutylene", "cl2"],
      products: ["c4h8cl2"],
      enthalpy: -175.0,
      desc: "Rapid exothermic addition of chlorine across double bond."
    },
    {
      id: "org-hydrohalogenation-isobutylene",
      name: "Markovnikov hydrochlorination of isobutylene to tert-butyl chloride",
      reactants: ["isobutylene", "hcl"],
      products: ["c4h9cl_tert"],
      enthalpy: -78.0,
      desc: "Markovnikov addition producing tertiary alkyl chloride."
    },

    // 3. Carbonyl Additions & Condensations (Aldol, Claisen, Cannizzaro, Benzoin) (35)
    {
      id: "org-crossed-aldol-benzaldehyde-acetaldehyde",
      name: "Crossed aldol condensation to cinnamaldehyde",
      reactants: ["c7h6o", "ch3cho"],
      products: ["cinnamaldehyde", "water"],
      enthalpy: -35.0,
      desc: "Base-catalyzed condensation yields yellow oil with the pleasant aroma of cinnamon."
    },
    {
      id: "org-crossed-aldol-benzaldehyde-acetone",
      name: "Synthesis of benzalacetone via Claisen-Schmidt condensation",
      reactants: ["c7h6o", "ch3coch3"],
      products: ["c10h10o", "water"],
      enthalpy: -38.0,
      desc: "Yellow crystalline alpha,beta-unsaturated ketone precipitates upon stirring in dilute NaOH."
    },
    {
      id: "org-self-aldol-acetaldehyde",
      name: "Self-aldol condensation of acetaldehyde to crotonaldehyde",
      reactants: ["ch3cho"],
      products: ["c4h6o_crot", "water"],
      enthalpy: -32.0,
      desc: "Aldol dehydration yields pungent, lachrymatory unsaturated crotonaldehyde."
    },
    {
      id: "org-self-aldol-acetone",
      name: "Self-aldol condensation of acetone to mesityl oxide",
      reactants: ["ch3coch3"],
      products: ["c6h10o_mes", "water"],
      enthalpy: -28.0,
      desc: "Acid-catalyzed condensation producing mesityl oxide."
    },
    {
      id: "org-cannizzaro-benzaldehyde",
      name: "Cannizzaro disproportionation of benzaldehyde",
      reactants: ["c7h6o", "naoh"],
      products: ["c6h5coona", "benzyl-alcohol"],
      enthalpy: -65.0,
      desc: "Non-enolizable benzaldehyde disproportionates in concentrated alkali into sodium benzoate and benzyl alcohol."
    },
    {
      id: "org-cannizzaro-formaldehyde",
      name: "Cannizzaro disproportionation of formaldehyde",
      reactants: ["hcho", "naoh"],
      products: ["hcoona", "ch3oh"],
      enthalpy: -72.0,
      desc: "Formaldehyde disproportionates into sodium formate and methanol."
    },
    {
      id: "org-benzoin-condensation",
      name: "Cyanide-catalyzed benzoin condensation",
      reactants: ["c7h6o"],
      products: ["benzoin"],
      enthalpy: -48.0,
      desc: "Catalytic cyanide couples two benzaldehyde molecules into crystalline hydroxy-ketone benzoin."
    },
    {
      id: "org-benzoin-oxidation-nitric",
      name: "Nitric acid oxidation of benzoin to benzil",
      reactants: ["benzoin", "hno3"],
      products: ["benzil", "no2", "water"],
      enthalpy: -145.0,
      desc: "Dense red-brown NO2 gas bubbles off as white benzoin oxidizes into bright yellow crystalline benzil."
    },
    {
      id: "org-benzil-benzilic-acid-rearrangement",
      name: "Benzilic acid rearrangement",
      reactants: ["benzil", "koh"],
      products: ["c14h11ko3"],
      enthalpy: -55.0,
      desc: "Yellow diketone benzil rearranges smoothly in hot KOH into potassium benzilate."
    },
    {
      id: "org-claisen-condensation-ethyl-acetate",
      name: "Claisen condensation of ethyl acetate to ethyl acetoacetate",
      reactants: ["ch3cooc2h5"],
      products: ["ethyl-acetoacetate", "c2h5oh"],
      enthalpy: -15.0,
      desc: "Sodium ethoxide promotes condensation of two ester molecules into beta-keto ester ethyl acetoacetate."
    },
    {
      id: "org-dieckmann-condensation-adipate",
      name: "Dieckmann cyclization of diethyl adipate to 2-carbethoxycyclopentanone",
      reactants: ["c10h18o4"],
      products: ["c8h12o3", "c2h5oh"],
      enthalpy: -18.0,
      desc: "Intramolecular Claisen cyclization forming cyclic beta-keto ester."
    },
    {
      id: "org-malonic-ester-alkylation-methyl",
      name: "Alkylation of diethyl malonate with iodomethane",
      reactants: ["diethyl-malonate", "ch3i", "c2h5ona"],
      products: ["c8h14o4_mal", "nai", "c2h5oh"],
      enthalpy: -78.0,
      desc: "Sodium salt of diethyl malonate displaces iodide forming diethyl methylmalonate."
    },
    {
      id: "org-malonic-ester-alkylation-ethyl",
      name: "Alkylation of diethyl malonate with iodoethane",
      reactants: ["diethyl-malonate", "c2h5i", "c2h5ona"],
      products: ["c9h16o4_mal", "nai", "c2h5oh"],
      enthalpy: -80.0,
      desc: "Produces diethyl ethylmalonate."
    },
    {
      id: "org-acetoacetic-ester-alkylation",
      name: "Alkylation of ethyl acetoacetate with iodomethane",
      reactants: ["ethyl-acetoacetate", "ch3i", "c2h5ona"],
      products: ["c7h12o3", "nai", "c2h5oh"],
      enthalpy: -75.0,
      desc: "Forms ethyl 2-methylacetoacetate."
    },
    {
      id: "org-acetoacetic-ester-hydrolysis-ketonic",
      name: "Ketonic cleavage of ethyl acetoacetate",
      reactants: ["ethyl-acetoacetate", "water"],
      products: ["ch3coch3", "co2", "c2h5oh"],
      enthalpy: -22.0,
      desc: "Dilute acid hydrolysis decarboxylates the beta-keto ester into acetone, CO2 gas, and ethanol."
    },
    {
      id: "org-acetoacetic-ester-hydrolysis-acidic",
      name: "Alkaline cleavage of ethyl acetoacetate",
      reactants: ["ethyl-acetoacetate", "naoh"],
      products: ["ch3coona", "c2h5oh"],
      enthalpy: -65.0,
      desc: "Cleavage in concentrated alkali yielding sodium acetate and ethanol."
    },
    {
      id: "org-cyanohydrin-formation-benzaldehyde",
      name: "Cyanohydrin synthesis from benzaldehyde",
      reactants: ["c7h6o", "hcn"],
      products: ["c8h7no_mandelonitrile"],
      enthalpy: -48.0,
      desc: "Nucleophilic addition of cyanide forming mandelonitrile."
    },
    {
      id: "org-cyanohydrin-formation-acetone",
      name: "Cyanohydrin synthesis from acetone",
      reactants: ["ch3coch3", "hcn"],
      products: ["c4h7no_ach"],
      enthalpy: -52.0,
      desc: "Industrial acetone cyanohydrin intermediate for methyl methacrylate."
    },
    {
      id: "org-bisulfite-addition-benzaldehyde",
      name: "Sodium bisulfite adduct precipitation with benzaldehyde",
      reactants: ["c7h6o", "nahso3"],
      products: ["c7h7nao4s"],
      enthalpy: -65.0,
      desc: "White crystalline bisulfite addition adduct precipitates cleanly from aqueous solution."
    },
    {
      id: "org-bisulfite-addition-acetone",
      name: "Sodium bisulfite adduct formation with acetone",
      reactants: ["ch3coch3", "nahso3"],
      products: ["c3h7nao4s"],
      enthalpy: -68.0,
      desc: "Rapid crystallization of white crystalline acetone bisulfite adduct."
    },
    {
      id: "org-oxime-formation-cyclohexanone",
      name: "Synthesis of cyclohexanone oxime",
      reactants: ["cyclohexanone", "nh2oh_model"],
      products: ["c6h11no", "water"],
      enthalpy: -55.0,
      desc: "Condensation yielding white crystalline oxime precursor to caprolactam."
    },
    {
      id: "org-beckmann-rearrangement-caprolactam",
      name: "Beckmann rearrangement of cyclohexanone oxime to caprolactam",
      reactants: ["c6h11no"],
      products: ["caprolactam"],
      enthalpy: -95.0,
      desc: "Sulfuric acid-catalyzed rearrangement into seven-membered nylon monomer caprolactam."
    },
    {
      id: "org-grignard-ch3mgbr-formaldehyde",
      name: "Grignard synthesis of ethanol from formaldehyde",
      reactants: ["ch3mgbr_model", "hcho", "hbr"],
      products: ["c2h5oh", "mgbr2"],
      enthalpy: -210.0,
      desc: "Nucleophilic organomagnesium addition to formaldehyde forming primary alcohol."
    },
    {
      id: "org-grignard-ch3mgbr-acetaldehyde",
      name: "Grignard synthesis of isopropanol from acetaldehyde",
      reactants: ["ch3mgbr_model", "ch3cho", "hbr"],
      products: ["c3h8o_iso", "mgbr2"],
      enthalpy: -205.0,
      desc: "Addition to aldehyde yielding secondary alcohol isopropanol."
    },
    {
      id: "org-grignard-ch3mgbr-acetone",
      name: "Grignard synthesis of tert-butanol from acetone",
      reactants: ["ch3mgbr_model", "ch3coch3", "hbr"],
      products: ["c4h10o_tert", "mgbr2"],
      enthalpy: -198.0,
      desc: "Addition to ketone yielding tertiary alcohol tert-butanol."
    },
    {
      id: "org-grignard-phmgbr-co2-benzoic",
      name: "Carbonation of phenylmagnesium bromide to benzoic acid",
      reactants: ["c6h5mgbr_model", "co2", "hbr"],
      products: ["c6h5cooh", "mgbr2"],
      enthalpy: -220.0,
      desc: "Pouring Grignard reagent onto crushed dry ice followed by acid quench precipitates benzoic acid."
    },
    {
      id: "org-grignard-phmgbr-benzaldehyde",
      name: "Grignard synthesis of benzhydrol",
      reactants: ["c6h5mgbr_model", "c7h6o", "hbr"],
      products: ["c13h12o", "mgbr2"],
      enthalpy: -195.0,
      desc: "Addition of phenyl Grignard to benzaldehyde forming diphenylmethanol."
    },
    {
      id: "org-grignard-phmgbr-benzophenone",
      name: "Grignard synthesis of triphenylmethanol",
      reactants: ["c6h5mgbr_model", "benzophenone", "hbr"],
      products: ["c19h16o", "mgbr2"],
      enthalpy: -188.0,
      desc: "White crystalline triaryl alcohol precipitates upon quenching with ice water."
    },
    {
      id: "org-hydration-styrene-phenylethanol",
      name: "Electrophilic hydration of styrene to 1-phenylethanol",
      reactants: ["styrene", "water"],
      products: ["c8h10o"],
      enthalpy: -45.0,
      desc: "Acid-catalyzed Markovnikov hydration of styrene."
    },
    {
      id: "org-bromination-styrene-dibromoethylbenzene",
      name: "Electrophilic bromine addition to styrene",
      reactants: ["styrene", "br2"],
      products: ["c8h8br2"],
      enthalpy: -125.0,
      desc: "Red-brown bromine color instantly discharges, depositing white crystals of styrene dibromide."
    },
    {
      id: "org-chlorination-styrene",
      name: "Chlorine addition across styrene double bond",
      reactants: ["styrene", "cl2"],
      products: ["c8h8cl2"],
      enthalpy: -170.0,
      desc: "Rapid exothermic addition forming 1,2-dichloroethylbenzene."
    },
    {
      id: "org-addition-hcl-styrene",
      name: "Markovnikov addition of HCl to styrene",
      reactants: ["styrene", "hcl"],
      products: ["c8h9cl"],
      enthalpy: -72.0,
      desc: "Produces 1-chloro-1-phenylethane."
    },
    {
      id: "org-hydration-ethylene-oxide-glycol",
      name: "Hydrolysis of ethylene oxide to ethylene glycol",
      reactants: ["c2h4o-epoxide", "water"],
      products: ["c2h6o2"],
      enthalpy: -92.0,
      desc: "Ring opening of strained epoxide producing viscous antifreeze diol ethylene glycol."
    },
    {
      id: "org-hydration-propylene-oxide-glycol",
      name: "Hydrolysis of propylene oxide to propylene glycol",
      reactants: ["c3h6o-epoxide", "water"],
      products: ["c3h8o2"],
      enthalpy: -90.0,
      desc: "Acid-catalyzed ring opening producing nontoxic propylene glycol."
    },
    {
      id: "org-methanolysis-ethylene-oxide",
      name: "Methanolysis of ethylene oxide to 2-methoxyethanol",
      reactants: ["c2h4o-epoxide", "ch3oh"],
      products: ["c3h8o2_glycol_ether"],
      enthalpy: -88.0,
      desc: "Nucleophilic alcohol attack producing cellosolve glycol ether."
    },

    // 4. Reductions & Oxidations of Functional Groups (25)
    {
      id: "org-reduction-nitrobenzene-iron-bechamp",
      name: "Béchamp reduction of nitrobenzene to aniline with iron and acid",
      reactants: ["nitrobenzene", "fe", "hcl"],
      products: ["aniline", "fecl2", "water"],
      enthalpy: -540.0,
      desc: "Classic industrial reduction: yellow nitrobenzene reduces cleanly into brown oily aniline."
    },
    {
      id: "org-reduction-nitrobenzene-tin-hcl",
      name: "Tin metal reduction of nitrobenzene to aniline",
      reactants: ["nitrobenzene", "sn", "hcl"],
      products: ["aniline", "sncl2", "water"],
      enthalpy: -510.0,
      desc: "Tin granules dissolve in concentrated HCl, reducing nitrobenzene with boiling heat."
    },
    {
      id: "org-reduction-nitrobenzene-zinc-hcl",
      name: "Zinc reduction of nitrobenzene in acid",
      reactants: ["nitrobenzene", "zn", "hcl"],
      products: ["aniline", "zncl2", "water"],
      enthalpy: -610.0,
      desc: "Exothermic metal reduction yielding aniline hydrochloride salt."
    },
    {
      id: "org-reduction-nitrobenzene-zinc-nh4cl-hydroxyl",
      name: "Mild zinc reduction of nitrobenzene to N-phenylhydroxylamine",
      reactants: ["nitrobenzene", "zn", "water"],
      products: ["c6h7no", "zno"],
      enthalpy: -290.0,
      desc: "Neutral reduction in ammonium chloride buffer precipitating white crystals of N-phenylhydroxylamine."
    },
    {
      id: "org-oxidation-toluene-kmno4-benzoic",
      name: "Permanganate side-chain oxidation of toluene to benzoic acid",
      reactants: ["c7h8", "kmno4"],
      products: ["c6h5cooh", "mno2", "koh"],
      enthalpy: -620.0,
      desc: "Purple permanganate refluxes with toluene, depositing heavy black MnO2; acid quench yields white benzoic acid."
    },
    {
      id: "org-oxidation-benzyl-alcohol-kmno4",
      name: "Permanganate oxidation of benzyl alcohol to benzoic acid",
      reactants: ["benzyl-alcohol", "kmno4"],
      products: ["c6h5cooh", "mno2", "koh", "water"],
      enthalpy: -480.0,
      desc: "Rapid oxidation decolorizing purple permanganate into voluminous brown MnO2."
    },
    {
      id: "org-oxidation-benzyl-alcohol-chromic",
      name: "Jones oxidation of benzyl alcohol to benzaldehyde",
      reactants: ["benzyl-alcohol", "k2cr2o7", "h2so4"],
      products: ["c7h6o", "cr2-so4-3", "k2so4", "water"],
      enthalpy: -360.0,
      desc: "Orange dichromate turns deep forest green as benzyl alcohol oxidizes to almond-scented benzaldehyde."
    },
    {
      id: "org-clemmensen-reduction-acetophenone",
      name: "Clemmensen reduction of acetophenone to ethylbenzene",
      reactants: ["acetophenone", "zn", "hcl"],
      products: ["c8h10", "zncl2", "water"],
      enthalpy: -240.0,
      desc: "Zinc-amalgam in refluxing concentrated HCl cleanly deoxygenates the ketone into ethylbenzene."
    },
    {
      id: "org-reduction-benzophenone-zinc",
      name: "Zinc reduction of benzophenone to diphenylmethane",
      reactants: ["benzophenone", "zn", "hcl"],
      products: ["c13h12", "zncl2", "water"],
      enthalpy: -235.0,
      desc: "Carbonyl reduction yielding hydrocarbon diphenylmethane."
    },
    {
      id: "org-reduction-benzaldehyde-nabh4",
      name: "Hydride reduction of benzaldehyde to benzyl alcohol",
      reactants: ["c7h6o", "h2"],
      products: ["benzyl-alcohol"],
      enthalpy: -65.0,
      desc: "Smooth catalytic hydrogenation of aromatic aldehyde to primary alcohol."
    },
    {
      id: "org-reduction-acetophenone-nabh4",
      name: "Hydride reduction of acetophenone to 1-phenylethanol",
      reactants: ["acetophenone", "h2"],
      products: ["c8h10o"],
      enthalpy: -58.0,
      desc: "Reduction of aromatic ketone to secondary alcohol."
    },
    {
      id: "org-oxidation-cyclohexanol-nitric-adipic",
      name: "Industrial nitric acid oxidation of cyclohexanol to adipic acid",
      reactants: ["cyclohexanol", "hno3"],
      products: ["adipic-acid", "no2", "water"],
      enthalpy: -610.0,
      desc: "Hot nitric acid cleaves cyclohexanol with vigorous red-brown NO2 gas evolution; cooling crystallizes adipic acid."
    },
    {
      id: "org-oxidation-cyclohexanone-nitric-adipic",
      name: "Nitric acid oxidation of cyclohexanone to adipic acid",
      reactants: ["cyclohexanone", "hno3"],
      products: ["adipic-acid", "no2", "water"],
      enthalpy: -580.0,
      desc: "Industrial Nylon-6,6 precursor synthesis accompanied by heavy nitrous fumes."
    },
    {
      id: "org-oxidation-isobutylene-methacrolein",
      name: "Gas-phase catalytic oxidation of isobutylene to methacrolein",
      reactants: ["isobutylene", "o2"],
      products: ["c4h6o_ma", "water"],
      enthalpy: -350.0,
      desc: "Catalytic oxidation stage in methyl methacrylate manufacture."
    },
    {
      id: "org-dehydration-glycerol-acrolein",
      name: "Acid-catalyzed thermal dehydration of glycerol to acrolein",
      reactants: ["c3h8o3"],
      products: ["acrolein", "water"],
      enthalpy: 55.0,
      desc: "Heating glycerol with potassium bisulfate dehydrates it into acrid, pungent acrolein vapor."
    },
    {
      id: "org-oxidation-acrolein-acrylic-acid",
      name: "Oxidation of acrolein to acrylic acid",
      reactants: ["acrolein", "o2"],
      products: ["c3h4o2_acrylic"],
      enthalpy: -250.0,
      desc: "Second stage oxidation yielding acrylic acid monomer."
    },
    {
      id: "org-oxidation-cumene-hydroperoxide",
      name: "Aerial autoxidation of cumene to cumene hydroperoxide",
      reactants: ["cumene", "o2"],
      products: ["cumene-hydroperoxide"],
      enthalpy: -115.0,
      desc: "First step of the industrial Hock process: air bubbling through cumene forms tertiary hydroperoxide."
    },
    {
      id: "org-cleavage-cumene-hydroperoxide",
      name: "Hock acid-catalyzed cleavage of cumene hydroperoxide to phenol and acetone",
      reactants: ["cumene-hydroperoxide"],
      products: ["phenol", "ch3coch3"],
      enthalpy: -250.0,
      desc: "Extremely exothermic sulfuric acid-catalyzed rearrangement producing equimolar phenol and acetone."
    },
    {
      id: "org-oxidation-p-xylene-nitric",
      name: "Nitric acid oxidation of p-xylene to terephthalic acid",
      reactants: ["c8h10", "hno3"],
      products: ["terephthalic-acid", "no", "water"],
      enthalpy: -850.0,
      desc: "Refluxing p-xylene with dilute nitric acid precipitates pure white terephthalic acid with evolution of NO fumes."
    },
    {
      id: "org-dehydration-phthalic-acid",
      name: "Thermal dehydration of phthalic acid to phthalic anhydride",
      reactants: ["c8h6o4"],
      products: ["phthalic-anhydride", "water"],
      enthalpy: 62.0,
      desc: "Sublimation-driven thermal cyclization of phthalic acid yielding needle-like crystals of phthalic anhydride."
    },
    {
      id: "org-hydroxylation-benzene-fenton",
      name: "Fenton hydroxylation of benzene to phenol",
      reactants: ["c6h6", "h2o2"],
      products: ["phenol", "water"],
      enthalpy: -210.0,
      desc: "Iron(II)-catalyzed radical hydroxylation of benzene by hydrogen peroxide gives phenol."
    },
    {
      id: "org-dehydration-maleic-acid",
      name: "Thermal dehydration of maleic acid to maleic anhydride",
      reactants: ["c4h4o4"],
      products: ["maleic-anhydride", "water"],
      enthalpy: 48.0,
      desc: "Mild heating of maleic acid causes loss of water and cyclization to maleic anhydride."
    },
    {
      id: "org-ammoxidation-propylene-acrylonitrile",
      name: "Sohio ammoxidation of propylene to acrylonitrile",
      reactants: ["c3h6", "ammonia", "o2"],
      products: ["acrylonitrile", "water"],
      enthalpy: -515.0,
      desc: "Single-pass fluidized bed industrial synthesis of acrylonitrile for acrylic fibers."
    },
    {
      id: "org-epoxidation-ethylene-peroxide",
      name: "Epoxidation of ethylene with hydrogen peroxide",
      reactants: ["c2h4", "h2o2"],
      products: ["c2h4o-epoxide", "water"],
      enthalpy: -160.0,
      desc: "Catalytic epoxidation of ethylene using hydrogen peroxide yielding ethylene oxide."
    },
    {
      id: "org-dehydrogenation-cyclohexanol-cyclohexanone",
      name: "Catalytic dehydrogenation of cyclohexanol to cyclohexanone",
      reactants: ["cyclohexanol"],
      products: ["cyclohexanone", "h2"],
      enthalpy: 65.0,
      desc: "Vapor-phase dehydrogenation over copper catalyst producing ketone precursor for nylon 6."
    },

    // 5. Diazonium Salts, Sandmeyer & Azo Dye Couplings (25)
    {
      id: "org-diazotization-aniline",
      name: "Griess diazotization of aniline to benzenediazonium chloride",
      reactants: ["aniline", "nano2", "hcl"],
      products: ["benzenediazonium-chloride", "nacl", "water"],
      enthalpy: -115.0,
      desc: "At 0-5 °C with ice, nitrous acid converts aniline into clear, highly reactive diazonium salt solution."
    },
    {
      id: "org-sandmeyer-chlorobenzene",
      name: "Sandmeyer synthesis of chlorobenzene with copper(I) chloride catalyst",
      reactants: ["benzenediazonium-chloride"],
      products: ["chlorobenzene", "n2"],
      catalystChemicalId: "cucl",
      enthalpy: -95.0,
      desc: "Adding CuCl triggers rapid effervescence of nitrogen gas, separating an oily layer of chlorobenzene."
    },
    {
      id: "org-sandmeyer-bromobenzene",
      name: "Sandmeyer synthesis of bromobenzene with copper(I) bromide",
      reactants: ["benzenediazonium-chloride", "cubr"],
      products: ["bromobenzene", "n2", "cucl"],
      enthalpy: -90.0,
      desc: "Nitrogen gas effervesces vigorously, yielding heavy aromatic bromobenzene."
    },
    {
      id: "org-sandmeyer-iodobenzene",
      name: "Gattermann-type synthesis of iodobenzene with potassium iodide",
      reactants: ["benzenediazonium-chloride", "ki"],
      products: ["c6h5i", "kcl", "n2"],
      enthalpy: -110.0,
      desc: "Immediate rapid bubbling of nitrogen gas accompanied by separation of dense heavy oily iodobenzene."
    },
    {
      id: "org-diazonium-hydrolysis-phenol",
      name: "Thermal hydrolysis of benzenediazonium chloride to phenol",
      reactants: ["benzenediazonium-chloride", "water"],
      products: ["phenol", "n2", "hcl"],
      enthalpy: -85.0,
      desc: "Warming the diazonium solution above 50 °C evolves nitrogen gas briskly, leaving pure phenol in water."
    },
    {
      id: "org-diazonium-reduction-hypophosphorous",
      name: "Reductive deamination of benzenediazonium chloride to benzene",
      reactants: ["benzenediazonium-chloride", "h3po2_model", "water"],
      products: ["c6h6", "h3po3", "hcl", "n2"],
      enthalpy: -220.0,
      desc: "Hypophosphorous acid smoothly replaces the diazo group with hydrogen, bubbling N2 and leaving benzene."
    },
    {
      id: "org-azo-coupling-phenol",
      name: "Azo coupling with phenol (p-hydroxyazobenzene synthesis)",
      reactants: ["benzenediazonium-chloride", "sodium-phenolate"],
      products: ["azo-hydroxy", "nacl"],
      enthalpy: -125.0,
      desc: "Cold alkaline coupling instantly produces an intense bright orange-yellow azo dye precipitate."
    },
    {
      id: "org-azo-coupling-beta-naphthol",
      name: "Synthesis of Sudan I / Para Red azo dye with 2-naphthol",
      reactants: ["benzenediazonium-chloride", "beta-naphthol", "naoh"],
      products: ["azo-sudan1", "nacl", "water"],
      enthalpy: -140.0,
      desc: "Spectacular flash of intense fiery scarlet-red azo dye precipitate upon adding diazonium salt to 2-naphthol."
    },
    {
      id: "org-azo-coupling-alpha-naphthol",
      name: "Azo coupling of benzenediazonium chloride with 1-naphthol",
      reactants: ["benzenediazonium-chloride", "alpha-naphthol", "naoh"],
      products: ["azo-naphthol1", "nacl", "water"],
      enthalpy: -138.0,
      desc: "Forms a deep reddish-brown monoazo dye."
    },
    {
      id: "org-azo-coupling-resorcinol",
      name: "Synthesis of Chrysoine resorcinol azo dye",
      reactants: ["benzenediazonium-chloride", "resorcinol", "naoh"],
      products: ["azo-resorcinol", "nacl", "water"],
      enthalpy: -145.0,
      desc: "Brilliant deep golden-orange azo dye forms instantaneously."
    },
    {
      id: "org-azo-coupling-aniline",
      name: "Coupling of benzenediazonium chloride with aniline to diazoaminobenzene",
      reactants: ["benzenediazonium-chloride", "aniline"],
      products: ["azo-diazoamino", "hcl"],
      enthalpy: -95.0,
      desc: "Golden-yellow crystalline diazoaminobenzene precipitates from buffered solution."
    },
    {
      id: "org-rearrangement-diazoaminobenzene",
      name: "Acid-catalyzed rearrangement to 4-aminoazobenzene",
      reactants: ["azo-diazoamino"],
      products: ["azo-aminoazo"],
      enthalpy: -45.0,
      desc: "Warm aniline hydrochloride rearranges diazoamino intermediate into brilliant orange aminoazobenzene dye."
    },
    {
      id: "org-condensation-aniline-benzaldehyde",
      name: "Schiff base condensation of aniline and benzaldehyde",
      reactants: ["aniline", "c7h6o"],
      products: ["c13h11n_schiff", "water"],
      enthalpy: -38.0,
      desc: "Exothermic condensation crystallizing bright glistening yellow needles of benzylideneaniline."
    },
    {
      id: "org-condensation-aniline-formaldehyde",
      name: "Acid-catalyzed condensation of aniline with formaldehyde",
      reactants: ["aniline", "hcho"],
      products: ["c13h14n2_mda", "water"],
      enthalpy: -65.0,
      desc: "Industrial synthesis of 4,4'-methylenedianiline precursor to MDI polyurethane."
    },
    {
      id: "org-condensation-phenol-formaldehyde-novolac",
      name: "Acid-catalyzed phenol-formaldehyde condensation (Novolac resin step)",
      reactants: ["phenol", "hcho"],
      products: ["c7h8o2_resin"],
      enthalpy: -85.0,
      desc: "Exothermic condensation yielding hydroxymethylphenol prepolymer."
    },
    {
      id: "org-saponification-aspirin",
      name: "Alkaline saponification of aspirin",
      reactants: ["aspirin", "naoh"],
      products: ["salicylic-acid", "ch3coona"],
      enthalpy: -82.0,
      desc: "Hydrolysis of aspirin into sodium salicylate and sodium acetate in alkali."
    },
    {
      id: "org-bromination-benzyl-alcohol-pbr3",
      name: "Conversion of benzyl alcohol to benzyl bromide with phosphorus tribromide",
      reactants: ["benzyl-alcohol", "pbr3"],
      products: ["c7h7br", "h3po3"],
      enthalpy: -88.0,
      desc: "Phosphorus tribromide smoothly converts benzyl alcohol into lachrymatory liquid benzyl bromide."
    },
    {
      id: "org-decarboxylation-salicylic-acid",
      name: "Thermal decarboxylation of salicylic acid to phenol",
      reactants: ["salicylic-acid"],
      products: ["phenol", "co2"],
      enthalpy: 45.0,
      desc: "Heating dry salicylic acid evolves CO2 gas, distilling over carbolic-smelling liquid phenol."
    },
    {
      id: "org-hofmann-rearrangement-benzamide",
      name: "Hofmann bromamide rearrangement of benzamide to aniline",
      reactants: ["benzamide", "br2", "naoh"],
      products: ["aniline", "nabr", "na2co3", "water"],
      enthalpy: -180.0,
      desc: "Classic Hofmann rearrangement converts primary aryl amide into aniline with loss of carbonyl carbon as carbonate."
    },
    {
      id: "org-oxidation-azobenzene-azoxy",
      name: "Hydrogen peroxide oxidation of azobenzene to azoxybenzene",
      reactants: ["azo-benzene", "h2o2"],
      products: ["c12h10n2o_azoxy", "water"],
      enthalpy: -175.0,
      desc: "Orange azobenzene converts to pale yellow azoxybenzene in glacial acetic acid."
    },
    {
      id: "org-reduction-azobenzene-hydrazobenzene",
      name: "Zinc reduction of azobenzene to hydrazobenzene",
      reactants: ["azo-benzene", "zn", "water"],
      products: ["c12h12n2", "zno"],
      enthalpy: -160.0,
      desc: "Orange color discharges completely into colorless 1,2-diphenylhydrazine."
    },
    {
      id: "org-benzidine-rearrangement",
      name: "Acid-catalyzed benzidine rearrangement",
      reactants: ["c12h12n2"],
      products: ["c12h12n2_benzidine"],
      enthalpy: -88.0,
      desc: "Hydrazobenzene undergoes [5,5]-sigmatropic rearrangement into 4,4'-diaminobiphenyl (benzidine)."
    },
    {
      id: "org-haloform-acetophenone",
      name: "Haloform cleavage of acetophenone with sodium hypochlorite",
      reactants: ["acetophenone", "naclo"],
      products: ["c6h5coona", "chcl3", "naoh"],
      enthalpy: -220.0,
      desc: "Bleach solution converts methyl ketone into sweet chloroform droplets and water-soluble sodium benzoate."
    },
    {
      id: "org-wurtz-fittig-chlorobenzene-chloromethane",
      name: "Wurtz-Fittig synthesis of toluene",
      reactants: ["chlorobenzene", "ch3cl", "na"],
      products: ["c7h8", "nacl"],
      enthalpy: -480.0,
      desc: "Sodium metal couples aryl and alkyl chlorides in anhydrous ether, precipitating sodium chloride."
    },
    {
      id: "org-ullmann-coupling-bromobenzene",
      name: "Ullmann biaryl coupling of bromobenzene with copper powder",
      reactants: ["bromobenzene", "cu"],
      products: ["c12h10", "cubr"],
      enthalpy: -180.0,
      desc: "Heating bromobenzene with active copper powder yields glistening white crystalline biphenyl."
    }
  ];

  for (const r of reactions) {
    addReaction({
      id: r.id,
      name: r.name,
      reactionType: "redox_other",
      reactants: r.reactants,
      products: r.products,
      enthalpyKjPerMol: r.enthalpy,
      temperatureMinC: 20,
      temperatureMaxC: 180,
      observableEffects: [
        {
          type: "color_change",
          description: r.desc,
        }
      ],
      safetyNotes: "Organic synthetic transformation. Perform in a certified fume hood. Avoid skin contact with acyl halides, aromatic amines, and hazardous organic vapors."
    });
  }
}
