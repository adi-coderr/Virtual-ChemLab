import { addReaction } from "./generate1000Reactions.js";
import type { SeedObservableEffect } from "../reactions.js";

export function buildDomain10AnalyticalTests(): void {
  // Domain 10: 50 Curated Analytical Qualitative & Spot Tests
  const list = [
  {
    "id": "spot-chromyl-nacl-test",
    "name": "Chromyl chloride test for chloride using sodium chloride",
    "reactants": [
      "k2cr2o7",
      "nacl",
      "h2so4"
    ],
    "products": [
      "cro2cl2",
      "k2so4",
      "na2so4",
      "water"
    ],
    "enthalpy": -112,
    "desc": "Heating solid chloride and potassium dichromate with concentrated sulfuric acid evolves dense red-orange chromyl chloride vapor."
  },
  {
    "id": "spot-chromyl-kcl-test",
    "name": "Chromyl chloride test for chloride using potassium chloride",
    "reactants": [
      "k2cr2o7",
      "kcl",
      "h2so4"
    ],
    "products": [
      "cro2cl2",
      "k2so4",
      "water"
    ],
    "enthalpy": -115,
    "desc": "Potassium chloride heated with acidic dichromate liberates dark red fuming CrO2Cl2 vapor."
  },
  {
    "id": "spot-chromyl-naoh-confirm",
    "name": "Absorption and confirmation of chromyl chloride in sodium hydroxide",
    "reactants": [
      "cro2cl2",
      "naoh"
    ],
    "products": [
      "na2cro4",
      "nacl",
      "water"
    ],
    "enthalpy": -188,
    "desc": "Passing red chromyl chloride vapor into dilute sodium hydroxide forms a bright canary-yellow sodium chromate solution."
  },
  {
    "id": "spot-chromyl-koh-confirm",
    "name": "Absorption and confirmation of chromyl chloride in potassium hydroxide",
    "reactants": [
      "cro2cl2",
      "koh"
    ],
    "products": [
      "k2cro4",
      "kcl",
      "water"
    ],
    "enthalpy": -190,
    "desc": "Red chromyl chloride vapor turns into bright yellow potassium chromate solution in KOH."
  },
  {
    "id": "spot-chromate-lead-confirm",
    "name": "Lead acetate confirmation of chromate (chrome yellow spot test)",
    "reactants": [
      "na2cro4",
      "ch3coo-2-pb"
    ],
    "products": [
      "pbcro4",
      "ch3coona"
    ],
    "enthalpy": -68,
    "desc": "Acidifying chromate with acetic acid and adding lead acetate gives an insoluble bright chrome-yellow precipitate."
  },
  {
    "id": "spot-chromate-k-lead-confirm",
    "name": "Lead acetate confirmation of potassium chromate",
    "reactants": [
      "k2cro4",
      "ch3coo-2-pb"
    ],
    "products": [
      "pbcro4",
      "ch3cook"
    ],
    "enthalpy": -67,
    "desc": "Lead acetate produces heavy yellow lead chromate precipitate."
  },
  {
    "id": "spot-brown-ring-nano3",
    "name": "Brown ring test for nitrate (redox reduction stage with sodium nitrate)",
    "reactants": [
      "nano3",
      "feso4",
      "h2so4"
    ],
    "products": [
      "fe2-so4-3",
      "na2so4",
      "no",
      "water"
    ],
    "enthalpy": -195,
    "desc": "Nitrate reduced by iron(II) sulfate and concentrated sulfuric acid producing nitric oxide gas which forms the classic brown ring."
  },
  {
    "id": "spot-brown-ring-kno3",
    "name": "Brown ring test for nitrate (redox reduction stage with potassium nitrate)",
    "reactants": [
      "kno3",
      "feso4",
      "h2so4"
    ],
    "products": [
      "fe2-so4-3",
      "k2so4",
      "no",
      "water"
    ],
    "enthalpy": -196,
    "desc": "Potassium nitrate reduced by ferrous sulfate in acid liberating nitric oxide."
  },
  {
    "id": "spot-so2-dichromate-paper",
    "name": "Dichromate test paper detection of sulfur dioxide",
    "reactants": [
      "k2cr2o7",
      "so2",
      "h2so4"
    ],
    "products": [
      "cr2-so4-3",
      "k2so4",
      "water"
    ],
    "enthalpy": -390,
    "desc": "Orange potassium dichromate paper turns distinctly emerald green when exposed to choking sulfur dioxide gas."
  },
  {
    "id": "spot-so2-permanganate-bleach",
    "name": "Permanganate bleaching test for sulfur dioxide",
    "reactants": [
      "kmno4",
      "so2",
      "water"
    ],
    "products": [
      "k2so4",
      "mnso4",
      "h2so4"
    ],
    "enthalpy": -840,
    "desc": "Bubbling sulfur dioxide gas into purple potassium permanganate solution instantly discharges the color to water-clear Mn2+."
  },
  {
    "id": "spot-nitrite-ki-test",
    "name": "Acidified potassium iodide spot test for nitrite",
    "reactants": [
      "nano2",
      "ki",
      "h2so4"
    ],
    "products": [
      "i2",
      "no",
      "na2so4",
      "k2so4",
      "water"
    ],
    "enthalpy": -160,
    "desc": "Acidified nitrite oxidizes iodide to dark iodine with vigorous effervescence of colorless nitric oxide turning brown in air."
  },
  {
    "id": "spot-lead-acetate-h2s",
    "name": "Lead acetate test paper blackening by hydrogen sulfide gas",
    "reactants": [
      "ch3coo-2-pb",
      "h2s"
    ],
    "products": [
      "pbs",
      "ch3cooh"
    ],
    "enthalpy": -78,
    "desc": "Moist white lead acetate paper instantaneously turns silvery-black upon contact with trace hydrogen sulfide gas."
  },
  {
    "id": "spot-lead-acetate-na2s",
    "name": "Lead acetate detection of aqueous sodium sulfide",
    "reactants": [
      "ch3coo-2-pb",
      "na2s"
    ],
    "products": [
      "pbs",
      "ch3coona"
    ],
    "enthalpy": -85,
    "desc": "Lead acetate produces an immediate dense velvety-black precipitate of lead(II) sulfide."
  },
  {
    "id": "spot-lead-acetate-k2s",
    "name": "Lead acetate detection of potassium sulfide",
    "reactants": [
      "ch3coo-2-pb",
      "k2s"
    ],
    "products": [
      "pbs",
      "ch3cook"
    ],
    "enthalpy": -84,
    "desc": "Lead acetate forms black lead sulfide precipitate."
  },
  {
    "id": "spot-baryta-co2",
    "name": "Baryta water sensitive test for carbon dioxide",
    "reactants": [
      "ba-oh-2",
      "co2"
    ],
    "products": [
      "baco3",
      "water"
    ],
    "enthalpy": -138,
    "desc": "Clear baryta water rapidly turns cloudy milky white forming insoluble barium carbonate."
  },
  {
    "id": "spot-strontia-co2",
    "name": "Strontia water test for carbon dioxide",
    "reactants": [
      "sr-oh-2",
      "co2"
    ],
    "products": [
      "srco3",
      "water"
    ],
    "enthalpy": -125,
    "desc": "Strontium hydroxide solution turns cloudy upon absorption of carbon dioxide gas."
  },
  {
    "id": "spot-nh4cl-naoh-litmus",
    "name": "Alkaline liberation test for ammonium ion (ammonium chloride)",
    "reactants": [
      "ammonium-chloride",
      "naoh"
    ],
    "products": [
      "nacl",
      "ammonia",
      "water"
    ],
    "enthalpy": -3,
    "desc": "Warming ammonium chloride with caustic soda evolves pungent choking ammonia gas turning moist red litmus blue."
  },
  {
    "id": "spot-nh4so4-naoh-litmus",
    "name": "Alkaline liberation test for ammonium ion (ammonium sulfate)",
    "reactants": [
      "nh4-2-so4",
      "naoh"
    ],
    "products": [
      "na2so4",
      "ammonia",
      "water"
    ],
    "enthalpy": -6,
    "desc": "Ammonium sulfate warmed with sodium hydroxide liberates sharp ammonia gas."
  },
  {
    "id": "spot-nh4cl-caoh2-lime",
    "name": "Quicklime/slaked lime test for ammonium salts",
    "reactants": [
      "ammonium-chloride",
      "caoh2"
    ],
    "products": [
      "cacl2",
      "ammonia",
      "water"
    ],
    "enthalpy": 12,
    "desc": "Grinding dry ammonium chloride with slaked lime immediately evolves strong ammonia odor."
  },
  {
    "id": "spot-prussian-blue-feno3",
    "name": "Prussian blue detection of ferric iron using iron(III) nitrate",
    "reactants": [
      "fe-no3-3",
      "k4-fe-cn-6"
    ],
    "products": [
      "fe4-fe-cn-6-3",
      "kno3"
    ],
    "enthalpy": -280,
    "desc": "Addition of potassium ferrocyanide to iron(III) nitrate instantly precipitates intense dark blue Prussian blue pigment."
  },
  {
    "id": "spot-prussian-blue-feso4-ferric",
    "name": "Prussian blue detection of ferric iron using iron(III) sulfate",
    "reactants": [
      "fe2-so4-3",
      "k4-fe-cn-6"
    ],
    "products": [
      "fe4-fe-cn-6-3",
      "k2so4"
    ],
    "enthalpy": -560,
    "desc": "Iron(III) sulfate produces deep insoluble Prussian blue with potassium ferrocyanide."
  },
  {
    "id": "spot-turnbulls-blue-fecl2",
    "name": "Turnbull's blue detection of ferrous iron using iron(II) chloride",
    "reactants": [
      "fecl2",
      "k3-fe-cn-6"
    ],
    "products": [
      "fe3-fe-cn-6-2",
      "kcl"
    ],
    "enthalpy": -240,
    "desc": "Ferrous chloride reacts with potassium ferricyanide precipitating brilliant deep blue Turnbull's blue."
  },
  {
    "id": "spot-golden-rain-pb-nai",
    "name": "Golden rain confirmatory test for lead(II) using sodium iodide",
    "reactants": [
      "pbno32",
      "nai"
    ],
    "products": [
      "pbi2",
      "nano3"
    ],
    "enthalpy": -61,
    "desc": "Sodium iodide precipitates bright yellow sparkling lead(II) iodide flakes."
  },
  {
    "id": "spot-ag-nai-test",
    "name": "Silver nitrate confirmatory test for iodide using sodium iodide",
    "reactants": [
      "agno3",
      "nai"
    ],
    "products": [
      "agi",
      "nano3"
    ],
    "enthalpy": -112,
    "desc": "Silver nitrate produces canary-yellow precipitate of silver iodide."
  },
  {
    "id": "spot-tollens-ch3cho-cl",
    "name": "Tollens silver mirror test for acetaldehyde (chloride)",
    "reactants": [
      "ch3cho",
      "ag-nh3-2-cl",
      "water"
    ],
    "products": [
      "ch3cooh",
      "ag",
      "ammonia",
      "hcl"
    ],
    "enthalpy": -144,
    "desc": "Acetaldehyde reduces diamminesilver(I) chloride depositing shiny metallic silver mirror."
  },
  {
    "id": "spot-tollens-hcho-cl",
    "name": "Tollens silver mirror test for formaldehyde (chloride)",
    "reactants": [
      "hcho",
      "ag-nh3-2-cl",
      "water"
    ],
    "products": [
      "hcooh",
      "ag",
      "ammonia",
      "hcl"
    ],
    "enthalpy": -151,
    "desc": "Formaldehyde reduces diamminesilver chloride to reflective silver mirror."
  },
  {
    "id": "spot-tollens-c3h6o-cl",
    "name": "Tollens silver mirror test for propionaldehyde (chloride)",
    "reactants": [
      "c3h6o_ald",
      "ag-nh3-2-cl",
      "water"
    ],
    "products": [
      "c2h5cooh",
      "ag",
      "ammonia",
      "hcl"
    ],
    "enthalpy": -141,
    "desc": "Propionaldehyde gives positive silver mirror test with ammoniacal silver chloride."
  },
  {
    "id": "spot-tollens-c7h6o-cl",
    "name": "Tollens silver mirror test for benzaldehyde (chloride)",
    "reactants": [
      "c7h6o",
      "ag-nh3-2-cl",
      "water"
    ],
    "products": [
      "c6h5cooh",
      "ag",
      "ammonia",
      "hcl"
    ],
    "enthalpy": -137,
    "desc": "Benzaldehyde forms silver mirror with diamminesilver chloride."
  },
  {
    "id": "spot-fehling-hcho-naoh",
    "name": "Fehling's test for formaldehyde with copper(II) sulfate",
    "reactants": [
      "hcho",
      "cuso4",
      "naoh"
    ],
    "products": [
      "hcooh",
      "cu2o",
      "na2so4",
      "water"
    ],
    "enthalpy": -178,
    "desc": "Deep royal blue copper tartrate/hydroxide solution reduces to a dense brick-red precipitate of cuprous oxide (Cu2O)."
  },
  {
    "id": "spot-fehling-c3h6o-naoh",
    "name": "Fehling's test for propionaldehyde with copper(II) sulfate",
    "reactants": [
      "c3h6o_ald",
      "cuso4",
      "naoh"
    ],
    "products": [
      "c2h5cooh",
      "cu2o",
      "na2so4",
      "water"
    ],
    "enthalpy": -168,
    "desc": "Propionaldehyde reduces alkaline copper sulfate into opaque brick-red cuprous oxide."
  },
  {
    "id": "spot-fehling-c7h6o-naoh",
    "name": "Fehling's test for benzaldehyde with copper(II) sulfate",
    "reactants": [
      "c7h6o",
      "cuso4",
      "naoh"
    ],
    "products": [
      "c6h5cooh",
      "cu2o",
      "na2so4",
      "water"
    ],
    "enthalpy": -160,
    "desc": "Benzaldehyde slowly reduces copper sulfate forming red cuprous oxide."
  },
  {
    "id": "spot-fehling-hcho-koh",
    "name": "Fehling's test for formaldehyde with potassium hydroxide",
    "reactants": [
      "hcho",
      "cuso4",
      "koh"
    ],
    "products": [
      "hcooh",
      "cu2o",
      "k2so4",
      "water"
    ],
    "enthalpy": -179,
    "desc": "Formaldehyde reduces copper sulfate in KOH yielding brick-red Cu2O."
  },
  {
    "id": "spot-fehling-ch3cho-koh",
    "name": "Fehling's test for acetaldehyde with potassium hydroxide",
    "reactants": [
      "ch3cho",
      "cuso4",
      "koh"
    ],
    "products": [
      "ch3cooh",
      "cu2o",
      "k2so4",
      "water"
    ],
    "enthalpy": -172,
    "desc": "Acetaldehyde reduces copper sulfate in KOH to brick-red cuprous oxide."
  },
  {
    "id": "spot-fehling-c3h6o-koh",
    "name": "Fehling's test for propionaldehyde with potassium hydroxide",
    "reactants": [
      "c3h6o_ald",
      "cuso4",
      "koh"
    ],
    "products": [
      "c2h5cooh",
      "cu2o",
      "k2so4",
      "water"
    ],
    "enthalpy": -169,
    "desc": "Propionaldehyde gives positive Fehling's red precipitate in KOH."
  },
  {
    "id": "spot-fehling-hcho-cucl2",
    "name": "Fehling's test for formaldehyde with copper(II) chloride",
    "reactants": [
      "hcho",
      "cucl2",
      "naoh"
    ],
    "products": [
      "hcooh",
      "cu2o",
      "nacl",
      "water"
    ],
    "enthalpy": -175,
    "desc": "Formaldehyde reduces copper(II) chloride in alkali to brick-red Cu2O precipitate."
  },
  {
    "id": "spot-fehling-ch3cho-cucl2",
    "name": "Fehling's test for acetaldehyde with copper(II) chloride",
    "reactants": [
      "ch3cho",
      "cucl2",
      "naoh"
    ],
    "products": [
      "ch3cooh",
      "cu2o",
      "nacl",
      "water"
    ],
    "enthalpy": -170,
    "desc": "Acetaldehyde reduces copper(II) chloride in alkali to brick-red cuprous oxide."
  },
  {
    "id": "spot-fehling-c3h6o-cucl2",
    "name": "Fehling's test for propionaldehyde with copper(II) chloride",
    "reactants": [
      "c3h6o_ald",
      "cucl2",
      "naoh"
    ],
    "products": [
      "c2h5cooh",
      "cu2o",
      "nacl",
      "water"
    ],
    "enthalpy": -167,
    "desc": "Propionaldehyde reduces alkaline copper(II) chloride to red Cu2O."
  },
  {
    "id": "spot-fehling-c7h6o-cucl2",
    "name": "Fehling's test for benzaldehyde with copper(II) chloride",
    "reactants": [
      "c7h6o",
      "cucl2",
      "naoh"
    ],
    "products": [
      "c6h5cooh",
      "cu2o",
      "nacl",
      "water"
    ],
    "enthalpy": -158,
    "desc": "Benzaldehyde reduces copper(II) chloride to red Cu2O precipitate."
  },
  {
    "id": "spot-fehling-hcho-cucl2-k",
    "name": "Fehling's test for formaldehyde with copper(II) chloride and KOH",
    "reactants": [
      "hcho",
      "cucl2",
      "koh"
    ],
    "products": [
      "hcooh",
      "cu2o",
      "kcl",
      "water"
    ],
    "enthalpy": -176,
    "desc": "Reduction of copper(II) chloride in potassium hydroxide to red cuprous oxide."
  },
  {
    "id": "spot-fehling-ch3cho-cucl2-k",
    "name": "Fehling's test for acetaldehyde with copper(II) chloride and KOH",
    "reactants": [
      "ch3cho",
      "cucl2",
      "koh"
    ],
    "products": [
      "ch3cooh",
      "cu2o",
      "kcl",
      "water"
    ],
    "enthalpy": -171,
    "desc": "Acetaldehyde reduces copper chloride in KOH to brick-red Cu2O."
  },
  {
    "id": "spot-fehling-c3h6o-cucl2-k",
    "name": "Fehling's test for propionaldehyde with copper(II) chloride and KOH",
    "reactants": [
      "c3h6o_ald",
      "cucl2",
      "koh"
    ],
    "products": [
      "c2h5cooh",
      "cu2o",
      "kcl",
      "water"
    ],
    "enthalpy": -168,
    "desc": "Propionaldehyde reduces copper chloride in KOH to red Cu2O."
  },
  {
    "id": "spot-fehling-c7h6o-cucl2-k",
    "name": "Fehling's test for benzaldehyde with copper(II) chloride and KOH",
    "reactants": [
      "c7h6o",
      "cucl2",
      "koh"
    ],
    "products": [
      "c6h5cooh",
      "cu2o",
      "kcl",
      "water"
    ],
    "enthalpy": -159,
    "desc": "Benzaldehyde reduces copper chloride in KOH to red cuprous oxide."
  },
  {
    "id": "spot-iodoform-acetone-koh",
    "name": "Iodoform test for acetone with potassium hydroxide",
    "reactants": [
      "ch3coch3",
      "i2",
      "koh"
    ],
    "products": [
      "chi3",
      "ch3cook",
      "ki",
      "water"
    ],
    "enthalpy": -195,
    "desc": "Acetone forms pale yellow crystalline iodoform flakes with distinct medicinal antiseptic scent in KOH."
  },
  {
    "id": "spot-iodoform-ethanol-naoh",
    "name": "Lieben iodoform test for ethanol with sodium hydroxide",
    "reactants": [
      "c2h5oh",
      "i2",
      "naoh"
    ],
    "products": [
      "chi3",
      "hcoona",
      "nai",
      "water"
    ],
    "enthalpy": -245,
    "desc": "Ethanol oxidized and iodinated in warm alkaline solution precipitating pale yellow iodoform crystals."
  },
  {
    "id": "spot-iodoform-ethanol-koh",
    "name": "Lieben iodoform test for ethanol with potassium hydroxide",
    "reactants": [
      "c2h5oh",
      "i2",
      "koh"
    ],
    "products": [
      "chi3",
      "hcook",
      "ki",
      "water"
    ],
    "enthalpy": -247,
    "desc": "Ethanol precipitates yellow iodoform crystals with KOH."
  },
  {
    "id": "spot-iodoform-isopropanol-naoh",
    "name": "Iodoform test for isopropanol with sodium hydroxide",
    "reactants": [
      "c3h8o_iso",
      "i2",
      "naoh"
    ],
    "products": [
      "chi3",
      "ch3coona",
      "nai",
      "water"
    ],
    "enthalpy": -238,
    "desc": "Isopropanol yields characteristic yellow iodoform precipitate."
  },
  {
    "id": "spot-iodoform-isopropanol-koh",
    "name": "Iodoform test for isopropanol with potassium hydroxide",
    "reactants": [
      "c3h8o_iso",
      "i2",
      "koh"
    ],
    "products": [
      "chi3",
      "ch3cook",
      "ki",
      "water"
    ],
    "enthalpy": -240,
    "desc": "Isopropanol precipitates medicinal-scented yellow iodoform flakes in KOH."
  },
  {
    "id": "spot-iodoform-acetaldehyde-naoh",
    "name": "Iodoform test for acetaldehyde with sodium hydroxide",
    "reactants": [
      "ch3cho",
      "i2",
      "naoh"
    ],
    "products": [
      "chi3",
      "hcoona",
      "nai",
      "water"
    ],
    "enthalpy": -215,
    "desc": "Acetaldehyde reacts with iodine and alkali producing yellow crystalline iodoform."
  },
  {
    "id": "spot-iodoform-acetaldehyde-koh",
    "name": "Iodoform test for acetaldehyde with potassium hydroxide",
    "reactants": [
      "ch3cho",
      "i2",
      "koh"
    ],
    "products": [
      "chi3",
      "hcook",
      "ki",
      "water"
    ],
    "enthalpy": -216,
    "desc": "Acetaldehyde yields yellow iodoform in KOH."
  },
  {
    "id": "spot-haloform-acetone-cl2-naoh",
    "name": "Liebig haloform synthesis of chloroform from acetone and sodium hypochlorite/chlorine",
    "reactants": [
      "ch3coch3",
      "cl2",
      "naoh"
    ],
    "products": [
      "chcl3",
      "ch3coona",
      "nacl",
      "water"
    ],
    "enthalpy": -320,
    "desc": "Chlorination of acetone in alkali yields heavy, sweet-smelling droplets of liquid chloroform."
  }
];

  for (const d of list) {
    const isPrecip = d.products.some(p => ["cro2cl2", "pbcro4", "fe4-fe-cn-6-3", "fe3-fe-cn-6-2", "pbi2", "ag", "cu2o", "chi3", "pbs", "caco3", "baco3", "srco3", "agbr", "agi"].includes(p));
    const isGas = d.products.some(p => ["ammonia", "so2", "no", "co2"].includes(p));
    const eff: SeedObservableEffect = isPrecip
      ? {
          type: "precipitation",
          description: d.desc,
          relatedChemicalId: d.products.find(p => ["cro2cl2", "pbcro4", "fe4-fe-cn-6-3", "fe3-fe-cn-6-2", "pbi2", "ag", "cu2o", "chi3", "pbs", "caco3", "baco3", "srco3", "agbr", "agi"].includes(p)),
        }
      : isGas
      ? {
          type: "gas_evolution",
          description: d.desc,
          relatedChemicalId: d.products.find(p => ["ammonia", "so2", "no", "co2"].includes(p)),
        }
      : {
          type: "color_change",
          description: d.desc,
          colorFrom: "#C0C0C0",
          colorTo: "#FFD700",
          relatedChemicalId: d.products[0],
        };

    addReaction({
      id: d.id,
      name: d.name,
      reactionType: ((d as any).reactionType || "redox_other") as any,
      reactants: d.reactants,
      products: d.products,
      enthalpyKjPerMol: d.enthalpy,
      temperatureMinC: 20,
      temperatureMaxC: 100,
      observableEffects: [eff],
      safetyNotes: "Qualitative analytical spot test. Wear standard laboratory PPE and avoid inhalation of evolved fumes or contact with heavy metal reagents.",
    });
  }
}
