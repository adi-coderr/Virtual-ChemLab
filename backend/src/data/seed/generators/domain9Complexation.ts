import { addReaction } from "./generate1000Reactions.js";
import type { SeedObservableEffect } from "../reactions.js";

export function buildDomain9Complexation(): void {
  // Domain 9: 50 Curated Coordination Chemistry & Complexation Reactions
  const list = [
  {
    "id": "cmplx-ni-nh3-cl",
    "name": "Synthesis of hexaamminenickel(II) chloride",
    "reactants": [
      "nicl2",
      "ammonia"
    ],
    "products": [
      "ni-nh3-6-cl2"
    ],
    "enthalpy": -188,
    "desc": "Addition of concentrated aqueous ammonia to green nickel chloride solution produces a gorgeous deep royal purple-violet solution of hexaamminenickel(II)."
  },
  {
    "id": "cmplx-zn-nh3-so4",
    "name": "Synthesis of tetraamminezinc(II) sulfate",
    "reactants": [
      "znso4",
      "ammonia"
    ],
    "products": [
      "zn-nh3-4-so4"
    ],
    "enthalpy": -145,
    "desc": "Zinc sulfate reacts with excess aqueous ammonia redissolving initial zinc hydroxide precipitate into clear colorless tetraamminezinc(II) complex."
  },
  {
    "id": "cmplx-ag-nh3-cl",
    "name": "Dissolution of silver chloride in ammonia to diamminesilver(I) chloride",
    "reactants": [
      "agcl",
      "ammonia"
    ],
    "products": [
      "ag-nh3-2-cl"
    ],
    "enthalpy": -56,
    "desc": "Curdy white silver chloride precipitate dissolves readily in dilute aqueous ammonia forming clear soluble diamminesilver(I)."
  },
  {
    "id": "cmplx-ag-nh3-no3",
    "name": "Preparation of Tollens reagent (diamminesilver(I) nitrate)",
    "reactants": [
      "agno3",
      "ammonia"
    ],
    "products": [
      "ag-nh3-2-no3"
    ],
    "enthalpy": -54,
    "desc": "Silver nitrate combines with aqueous ammonia to yield Tollens reagent solution."
  },
  {
    "id": "cmplx-co-nh3-cl3",
    "name": "Oxidative synthesis of hexaamminecobalt(III) chloride",
    "reactants": [
      "cocl2",
      "ammonia",
      "hcl",
      "o2"
    ],
    "products": [
      "co-nh3-6-cl3",
      "water"
    ],
    "enthalpy": -340,
    "desc": "Aeration of cobalt(II) chloride and ammonia over charcoal catalyst oxidizes pink cobalt to golden-yellow crystalline Werner complex."
  },
  {
    "id": "cmplx-also4-naoh-excess",
    "name": "Reaction of aluminium sulfate with excess sodium hydroxide",
    "reactants": [
      "al2-so4-3",
      "naoh"
    ],
    "products": [
      "na-al-oh-4",
      "na2so4"
    ],
    "enthalpy": -360,
    "desc": "Aluminium sulfate redissolves in excess sodium hydroxide into clear aluminate solution."
  },
  {
    "id": "cmplx-znso4-naoh-excess",
    "name": "Reaction of zinc sulfate with excess sodium hydroxide",
    "reactants": [
      "znso4",
      "naoh"
    ],
    "products": [
      "na2-zn-oh-4",
      "na2so4"
    ],
    "enthalpy": -142,
    "desc": "Zinc sulfate reacts with excess sodium hydroxide forming soluble tetrahydroxozincate."
  },
  {
    "id": "cmplx-znno32-naoh-excess",
    "name": "Reaction of zinc nitrate with excess sodium hydroxide",
    "reactants": [
      "zn-no3-2",
      "naoh"
    ],
    "products": [
      "na2-zn-oh-4",
      "nano3"
    ],
    "enthalpy": -140,
    "desc": "Zinc nitrate redissolves in excess base."
  },
  {
    "id": "cmplx-pb-naoh-hydrox",
    "name": "Dissolution of lead(II) hydroxide in excess sodium hydroxide (plumbite formation)",
    "reactants": [
      "pb-oh-2",
      "naoh"
    ],
    "products": [
      "na2-pb-oh-4"
    ],
    "enthalpy": -32,
    "desc": "White lead(II) hydroxide dissolves in excess caustic soda forming clear soluble sodium tetrahydroxoplumbate(II)."
  },
  {
    "id": "cmplx-pbcl2-naoh-excess",
    "name": "Reaction of lead(II) chloride with excess sodium hydroxide",
    "reactants": [
      "pbcl2",
      "naoh"
    ],
    "products": [
      "na2-pb-oh-4",
      "nacl"
    ],
    "enthalpy": -125,
    "desc": "Insoluble lead chloride dissolves in boiling excess concentrated sodium hydroxide."
  },
  {
    "id": "cmplx-sn-naoh-hydrox",
    "name": "Dissolution of tin(II) hydroxide in sodium hydroxide (stannite formation)",
    "reactants": [
      "sn-oh-2",
      "naoh"
    ],
    "products": [
      "na-sn-oh-3"
    ],
    "enthalpy": -26,
    "desc": "White tin(II) hydroxide dissolves in sodium hydroxide forming strongly reducing sodium trihydroxostannate(II)."
  },
  {
    "id": "cmplx-sncl2-naoh-excess",
    "name": "Reaction of tin(II) chloride with excess sodium hydroxide",
    "reactants": [
      "sncl2",
      "naoh"
    ],
    "products": [
      "na-sn-oh-3",
      "nacl"
    ],
    "enthalpy": -115,
    "desc": "Stannous chloride reacts with excess alkali producing stannite solution."
  },
  {
    "id": "cmplx-cr-naoh-hydrox",
    "name": "Dissolution of chromium(III) hydroxide in excess sodium hydroxide (chromite formation)",
    "reactants": [
      "cr-oh-3",
      "naoh"
    ],
    "products": [
      "na-cr-oh-4"
    ],
    "enthalpy": -35,
    "desc": "Gray-green chromium(III) hydroxide dissolves in excess alkali yielding an emerald-green sodium tetrahydroxochromate(III) solution."
  },
  {
    "id": "cmplx-crcl3-naoh-excess",
    "name": "Reaction of chromium(III) chloride with excess sodium hydroxide",
    "reactants": [
      "crcl3",
      "naoh"
    ],
    "products": [
      "na-cr-oh-4",
      "nacl"
    ],
    "enthalpy": -160,
    "desc": "Chromium(III) chloride forms clear green chromite solution in excess base."
  },
  {
    "id": "cmplx-crso4-naoh-excess",
    "name": "Reaction of chromium(III) sulfate with excess sodium hydroxide",
    "reactants": [
      "cr2-so4-3",
      "naoh"
    ],
    "products": [
      "na-cr-oh-4",
      "na2so4"
    ],
    "enthalpy": -320,
    "desc": "Chromic sulfate dissolves in excess sodium hydroxide to green chromite."
  },
  {
    "id": "cmplx-k2-cu-cl4",
    "name": "Synthesis of potassium tetrachlorocuprate(II)",
    "reactants": [
      "cucl2",
      "kcl"
    ],
    "products": [
      "k2-cu-cl4"
    ],
    "enthalpy": -28,
    "desc": "Copper(II) chloride combines with potassium chloride in concentrated solution forming bright yellow-green square planar K2[CuCl4]."
  },
  {
    "id": "cmplx-k2-co-cl4",
    "name": "Synthesis of potassium tetrachlorocobaltate(II)",
    "reactants": [
      "cocl2",
      "kcl"
    ],
    "products": [
      "k2-co-cl4"
    ],
    "enthalpy": -32,
    "desc": "Cobalt(II) chloride reacts with excess potassium chloride forming an intense royal-blue tetrahedral complex."
  },
  {
    "id": "cmplx-k-fe-cl4",
    "name": "Synthesis of potassium tetrachloroferrate(III)",
    "reactants": [
      "fecl3",
      "kcl"
    ],
    "products": [
      "k-fe-cl4"
    ],
    "enthalpy": -22,
    "desc": "Iron(III) chloride combines with potassium chloride forming golden-yellow crystalline K[FeCl4]."
  },
  {
    "id": "cmplx-ag-nacn-linear",
    "name": "Cyanide extraction of silver (sodium dicyanoargentate synthesis)",
    "reactants": [
      "agcl",
      "nacn"
    ],
    "products": [
      "na-ag-cn-2",
      "nacl"
    ],
    "enthalpy": -92,
    "desc": "Silver chloride dissolves rapidly in sodium cyanide solution forming soluble linear dicyanoargentate complex."
  },
  {
    "id": "cmplx-agno3-nacn",
    "name": "Reaction of silver nitrate with sodium cyanide",
    "reactants": [
      "agno3",
      "nacn"
    ],
    "products": [
      "na-ag-cn-2",
      "nano3"
    ],
    "enthalpy": -90,
    "desc": "Silver nitrate reacts with excess cyanide yielding clear soluble dicyano complex."
  },
  {
    "id": "cmplx-ag2s-nacn-o2",
    "name": "MacArthur-Forrest cyanidation of silver sulfide ore",
    "reactants": [
      "ag2s",
      "nacn",
      "water",
      "o2"
    ],
    "products": [
      "na-ag-cn-2",
      "naoh",
      "s"
    ],
    "enthalpy": -280,
    "desc": "Aerated alkaline cyanide solution leaches silver sulfide ore into soluble dicyanoargentate."
  },
  {
    "id": "cmplx-k2-ni-cn-4",
    "name": "Synthesis of potassium tetracyanonickelate(II)",
    "reactants": [
      "nicl2",
      "kcn"
    ],
    "products": [
      "k2-ni-cn-4",
      "kcl"
    ],
    "enthalpy": -184,
    "desc": "Apple-green nickel chloride reacts with excess potassium cyanide forming bright orange-yellow square planar K2[Ni(CN)4]."
  },
  {
    "id": "cmplx-ni-so4-kcn",
    "name": "Reaction of nickel(II) sulfate with potassium cyanide",
    "reactants": [
      "niso4",
      "kcn"
    ],
    "products": [
      "k2-ni-cn-4",
      "k2so4"
    ],
    "enthalpy": -182,
    "desc": "Nickel sulfate dissolves in excess cyanide forming orange-yellow tetracyanonickelate."
  },
  {
    "id": "cmplx-fecl2-kcn-ferro",
    "name": "Synthesis of potassium ferrocyanide from iron(II) chloride",
    "reactants": [
      "fecl2",
      "kcn"
    ],
    "products": [
      "k4-fe-cn-6",
      "kcl"
    ],
    "enthalpy": -360,
    "desc": "Pale green ferrous chloride reacts with excess potassium cyanide forming pale yellow crystalline potassium ferrocyanide."
  },
  {
    "id": "cmplx-feso4-kcn-ferro",
    "name": "Synthesis of potassium ferrocyanide from iron(II) sulfate",
    "reactants": [
      "feso4",
      "kcn"
    ],
    "products": [
      "k4-fe-cn-6",
      "k2so4"
    ],
    "enthalpy": -358,
    "desc": "Ferrous sulfate combines with potassium cyanide yielding potassium hexacyanoferrate(II)."
  },
  {
    "id": "cmplx-fecl3-kcn-ferri",
    "name": "Synthesis of potassium ferricyanide from iron(III) chloride",
    "reactants": [
      "fecl3",
      "kcn"
    ],
    "products": [
      "k3-fe-cn-6",
      "kcl"
    ],
    "enthalpy": -290,
    "desc": "Ferric chloride reacts with excess potassium cyanide forming ruby-red crystals of potassium ferricyanide."
  },
  {
    "id": "cmplx-feno33-kcn-ferri",
    "name": "Synthesis of potassium ferricyanide from iron(III) nitrate",
    "reactants": [
      "fe-no3-3",
      "kcn"
    ],
    "products": [
      "k3-fe-cn-6",
      "kno3"
    ],
    "enthalpy": -288,
    "desc": "Iron(III) nitrate combines with potassium cyanide producing potassium hexacyanoferrate(III)."
  },
  {
    "id": "cmplx-feno33-kscn",
    "name": "Formation of blood-red thiocyanatoferrate from iron(III) nitrate",
    "reactants": [
      "fe-no3-3",
      "kscn"
    ],
    "products": [
      "k3-fe-scn-6",
      "kno3"
    ],
    "enthalpy": -64,
    "desc": "Iron(III) nitrate gives an intense blood-red color with potassium thiocyanate."
  },
  {
    "id": "cmplx-feso4-kscn-hexa",
    "name": "Reaction of iron(III) sulfate with potassium thiocyanate",
    "reactants": [
      "fe2-so4-3",
      "kscn"
    ],
    "products": [
      "k3-fe-scn-6",
      "k2so4"
    ],
    "enthalpy": -128,
    "desc": "Ferric sulfate turns deeply blood-red upon addition of excess thiocyanate."
  },
  {
    "id": "cmplx-cocl2-kscn-tetra",
    "name": "Vogel test formation of tetrathiocyanatocobaltate(II)",
    "reactants": [
      "cocl2",
      "kscn"
    ],
    "products": [
      "k2-co-scn-4",
      "kcl"
    ],
    "enthalpy": -48,
    "desc": "Cobalt(II) chloride forms an intense royal blue tetrathiocyanato complex in concentrated solution (Vogel test for cobalt)."
  },
  {
    "id": "cmplx-coso4-kscn-tetra",
    "name": "Reaction of cobalt(II) sulfate with potassium thiocyanate",
    "reactants": [
      "coso4",
      "kscn"
    ],
    "products": [
      "k2-co-scn-4",
      "k2so4"
    ],
    "enthalpy": -46,
    "desc": "Cobalt sulfate turns deep blue in presence of excess thiocyanate."
  },
  {
    "id": "cmplx-cono32-kscn-tetra",
    "name": "Reaction of cobalt(II) nitrate with potassium thiocyanate",
    "reactants": [
      "co-no3-2",
      "kscn"
    ],
    "products": [
      "k2-co-scn-4",
      "kno3"
    ],
    "enthalpy": -47,
    "desc": "Cobalt nitrate forms blue thiocyanate complex."
  },
  {
    "id": "cmplx-cocl2-nabo2",
    "name": "Cobalt borax bead test complexation",
    "reactants": [
      "cocl2",
      "nabo2"
    ],
    "products": [
      "co-bo2-2",
      "nacl"
    ],
    "enthalpy": -42,
    "desc": "Cobalt(II) chloride fuses with sodium metaborate forming a deep royal blue vitreous cobalt metaborate bead."
  },
  {
    "id": "cmplx-coso4-nabo2",
    "name": "Cobalt sulfate borax bead fusion",
    "reactants": [
      "coso4",
      "nabo2"
    ],
    "products": [
      "co-bo2-2",
      "na2so4"
    ],
    "enthalpy": -39,
    "desc": "Cobalt sulfate melts into sodium metaborate bead giving characteristic sapphire-blue color."
  },
  {
    "id": "cmplx-cono32-nabo2",
    "name": "Cobalt nitrate borax bead reaction",
    "reactants": [
      "co-no3-2",
      "nabo2"
    ],
    "products": [
      "co-bo2-2",
      "nano3"
    ],
    "enthalpy": -40,
    "desc": "Cobalt nitrate decomposes and dissolves in borax bead."
  },
  {
    "id": "cmplx-cucl2-nabo2",
    "name": "Copper borax bead test complexation",
    "reactants": [
      "cucl2",
      "nabo2"
    ],
    "products": [
      "cu-bo2-2",
      "nacl"
    ],
    "enthalpy": -38,
    "desc": "Copper(II) chloride fuses with sodium metaborate forming a turquoise sky-blue transparent glassy bead."
  },
  {
    "id": "cmplx-cuso4-nabo2",
    "name": "Copper sulfate borax bead fusion",
    "reactants": [
      "cuso4",
      "nabo2"
    ],
    "products": [
      "cu-bo2-2",
      "na2so4"
    ],
    "enthalpy": -36,
    "desc": "Copper sulfate gives vivid greenish-blue bead in oxidizing flame."
  },
  {
    "id": "cmplx-cuno32-nabo2",
    "name": "Copper nitrate borax bead reaction",
    "reactants": [
      "cu-no3-2",
      "nabo2"
    ],
    "products": [
      "cu-bo2-2",
      "nano3"
    ],
    "enthalpy": -37,
    "desc": "Copper nitrate dissolves in molten metaborate."
  },
  {
    "id": "cmplx-pbno32-naoh-excess",
    "name": "Reaction of lead(II) nitrate with excess sodium hydroxide",
    "reactants": [
      "pbno32",
      "naoh"
    ],
    "products": [
      "na2-pb-oh-4",
      "nano3"
    ],
    "enthalpy": -128,
    "desc": "Lead nitrate dissolves in excess alkali yielding clear plumbite solution."
  },
  {
    "id": "destruct-ni-nh3-hcl",
    "name": "Destruction of hexaamminenickel(II) by hydrochloric acid",
    "reactants": [
      "ni-nh3-6-cl2",
      "hcl"
    ],
    "products": [
      "nicl2",
      "ammonium-chloride"
    ],
    "enthalpy": -285,
    "desc": "Acidification of violet hexaamminenickel complex protonates ammonia ligands returning solution to apple-green Ni2+."
  },
  {
    "id": "destruct-zn-nh3-h2so4",
    "name": "Destruction of tetraamminezinc(II) complex by sulfuric acid",
    "reactants": [
      "zn-nh3-4-so4",
      "h2so4"
    ],
    "products": [
      "znso4",
      "nh4-2-so4"
    ],
    "enthalpy": -210,
    "desc": "Sulfuric acid destroys tetraamminezinc complex forming ammonium sulfate."
  },
  {
    "id": "destruct-ag-nh3-hno3",
    "name": "Reprecipitation of silver chloride from diamminesilver(I) by nitric acid",
    "reactants": [
      "ag-nh3-2-cl",
      "hno3"
    ],
    "products": [
      "agcl",
      "nh4no3"
    ],
    "enthalpy": -122,
    "desc": "Adding nitric acid to diamminesilver solution instantly destroys the complex, reprecipitating white curdy AgCl."
  },
  {
    "id": "destruct-ag-tollens-hno3",
    "name": "Acid destruction of Tollens reagent",
    "reactants": [
      "ag-nh3-2-no3",
      "hno3"
    ],
    "products": [
      "agno3",
      "nh4no3"
    ],
    "enthalpy": -118,
    "desc": "Acidification neutralizes ammonia ligands yielding silver nitrate and ammonium nitrate."
  },
  {
    "id": "destruct-al-aluminate-hcl",
    "name": "Precipitation of aluminium hydroxide by controlled neutralization of aluminate",
    "reactants": [
      "na-al-oh-4",
      "hcl"
    ],
    "products": [
      "al-oh-3",
      "nacl",
      "water"
    ],
    "enthalpy": -58,
    "desc": "Careful addition of dilute acid to sodium aluminate drops gelatinous white precipitate of aluminium hydroxide."
  },
  {
    "id": "destruct-al-aluminate-hno3",
    "name": "Precipitation of aluminium hydroxide from aluminate with nitric acid",
    "reactants": [
      "na-al-oh-4",
      "hno3"
    ],
    "products": [
      "al-oh-3",
      "nano3",
      "water"
    ],
    "enthalpy": -57.5,
    "desc": "Nitric acid precipitates aluminium hydroxide from alkaline aluminate solution."
  },
  {
    "id": "destruct-zn-zincate-hcl",
    "name": "Reprecipitation of zinc hydroxide from sodium zincate by acid",
    "reactants": [
      "na2-zn-oh-4",
      "hcl"
    ],
    "products": [
      "znoh2",
      "nacl",
      "water"
    ],
    "enthalpy": -115,
    "desc": "Neutralization of alkaline zincate with hydrochloric acid reprecipitates white gelatinous zinc hydroxide."
  },
  {
    "id": "destruct-zn-zincate-hno3",
    "name": "Reprecipitation of zinc hydroxide from zincate with nitric acid",
    "reactants": [
      "na2-zn-oh-4",
      "hno3"
    ],
    "products": [
      "znoh2",
      "nano3",
      "water"
    ],
    "enthalpy": -114,
    "desc": "Nitric acid neutralizes zincate precipitating Zn(OH)2."
  },
  {
    "id": "destruct-pb-plumbite-hcl",
    "name": "Reprecipitation of lead(II) hydroxide from sodium plumbite",
    "reactants": [
      "na2-pb-oh-4",
      "hcl"
    ],
    "products": [
      "pb-oh-2",
      "nacl",
      "water"
    ],
    "enthalpy": -110,
    "desc": "Neutralization of plumbite solution reprecipitates chalky white lead(II) hydroxide."
  },
  {
    "id": "destruct-sn-stannite-hcl",
    "name": "Reprecipitation of tin(II) hydroxide from sodium stannite",
    "reactants": [
      "na-sn-oh-3",
      "hcl"
    ],
    "products": [
      "sn-oh-2",
      "nacl",
      "water"
    ],
    "enthalpy": -56,
    "desc": "Acidification of stannite solution reprecipitates white tin(II) hydroxide."
  },
  {
    "id": "destruct-cr-chromite-hcl",
    "name": "Reprecipitation of chromium(III) hydroxide from sodium chromite",
    "reactants": [
      "na-cr-oh-4",
      "hcl"
    ],
    "products": [
      "cr-oh-3",
      "nacl",
      "water"
    ],
    "enthalpy": -55,
    "desc": "Neutralization of emerald-green chromite reprecipitates gray-green chromium(III) hydroxide."
  }
];

  for (const d of list) {
    const isPrecip = d.products.some(p => ["agcl", "agbr", "agi", "pbso4", "al-oh-3", "znoh2", "pb-oh-2", "sn-oh-2", "cr-oh-3"].includes(p));
    const pptId = d.products.find(p => ["agcl", "agbr", "agi", "pbso4", "al-oh-3", "znoh2", "pb-oh-2", "sn-oh-2", "cr-oh-3"].includes(p));
    const eff: SeedObservableEffect = isPrecip
      ? {
          type: "precipitation",
          description: d.desc,
          relatedChemicalId: pptId,
        }
      : {
          type: "color_change",
          description: d.desc,
          colorFrom: "#E8E8E8",
          colorTo: "#4169E1",
          relatedChemicalId: d.products[0],
        };

    addReaction({
      id: d.id,
      name: d.name,
      reactionType: ((d as any).reactionType || "synthesis") as any,
      reactants: d.reactants,
      products: d.products,
      enthalpyKjPerMol: d.enthalpy,
      temperatureMinC: 15,
      temperatureMaxC: 100,
      observableEffects: [eff],
      safetyNotes: "Coordination chemistry and complexation reaction. Handle ligand reagents (ammonia, cyanide, thiocyanate) with appropriate ventilation and PPE.",
    });
  }
}
