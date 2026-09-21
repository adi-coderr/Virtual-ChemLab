import { addReaction } from "./generate1000Reactions.js";
import type { SeedObservableEffect } from "../reactions.js";

export function buildDomain4GasEvolution(): void {
  // Domain 4: 80 Curated Gas Evolution Reactions
  const list = [
  {
    "id": "gas-carb-k2co3-hno3",
    "name": "Effervescence of carbon dioxide from Potassium carbonate and Nitric acid",
    "reactants": [
      "k2co3",
      "hno3"
    ],
    "products": [
      "kno3",
      "water",
      "co2"
    ],
    "gasId": "co2",
    "enthalpy": -25,
    "desc": "Vigorous fizzing and effervescence of carbon dioxide gas bubbles."
  },
  {
    "id": "gas-bicarb-khco3-hno3",
    "name": "Carbon dioxide evolution from Potassium bicarbonate and Nitric acid",
    "reactants": [
      "khco3",
      "hno3"
    ],
    "products": [
      "kno3",
      "water",
      "co2"
    ],
    "gasId": "co2",
    "enthalpy": -15,
    "desc": "Rapid bubbling and evolution of odorless carbon dioxide gas."
  },
  {
    "id": "gas-carb-k2co3-h2so4",
    "name": "Effervescence of carbon dioxide from Potassium carbonate and Sulfuric acid",
    "reactants": [
      "k2co3",
      "h2so4"
    ],
    "products": [
      "k2so4",
      "water",
      "co2"
    ],
    "gasId": "co2",
    "enthalpy": -25,
    "desc": "Vigorous fizzing and effervescence of carbon dioxide gas bubbles."
  },
  {
    "id": "gas-bicarb-khco3-h2so4",
    "name": "Carbon dioxide evolution from Potassium bicarbonate and Sulfuric acid",
    "reactants": [
      "khco3",
      "h2so4"
    ],
    "products": [
      "k2so4",
      "water",
      "co2"
    ],
    "gasId": "co2",
    "enthalpy": -15,
    "desc": "Rapid bubbling and evolution of odorless carbon dioxide gas."
  },
  {
    "id": "gas-carb-k2co3-hbr",
    "name": "Effervescence of carbon dioxide from Potassium carbonate and Hydrogen bromide",
    "reactants": [
      "k2co3",
      "hbr"
    ],
    "products": [
      "kbr",
      "water",
      "co2"
    ],
    "gasId": "co2",
    "enthalpy": -25,
    "desc": "Vigorous fizzing and effervescence of carbon dioxide gas bubbles."
  },
  {
    "id": "gas-bicarb-khco3-hbr",
    "name": "Carbon dioxide evolution from Potassium bicarbonate and Hydrogen bromide",
    "reactants": [
      "khco3",
      "hbr"
    ],
    "products": [
      "kbr",
      "water",
      "co2"
    ],
    "gasId": "co2",
    "enthalpy": -15,
    "desc": "Rapid bubbling and evolution of odorless carbon dioxide gas."
  },
  {
    "id": "gas-carb-k2co3-hi",
    "name": "Effervescence of carbon dioxide from Potassium carbonate and Hydroiodic acid",
    "reactants": [
      "k2co3",
      "hi"
    ],
    "products": [
      "ki",
      "water",
      "co2"
    ],
    "gasId": "co2",
    "enthalpy": -25,
    "desc": "Vigorous fizzing and effervescence of carbon dioxide gas bubbles."
  },
  {
    "id": "gas-bicarb-khco3-hi",
    "name": "Carbon dioxide evolution from Potassium bicarbonate and Hydroiodic acid",
    "reactants": [
      "khco3",
      "hi"
    ],
    "products": [
      "ki",
      "water",
      "co2"
    ],
    "gasId": "co2",
    "enthalpy": -15,
    "desc": "Rapid bubbling and evolution of odorless carbon dioxide gas."
  },
  {
    "id": "gas-carb-k2co3-hclo4",
    "name": "Effervescence of carbon dioxide from Potassium carbonate and Perchloric acid",
    "reactants": [
      "k2co3",
      "hclo4"
    ],
    "products": [
      "kclo4",
      "water",
      "co2"
    ],
    "gasId": "co2",
    "enthalpy": -25,
    "desc": "Vigorous fizzing and effervescence of carbon dioxide gas bubbles."
  },
  {
    "id": "gas-bicarb-khco3-hclo4",
    "name": "Carbon dioxide evolution from Potassium bicarbonate and Perchloric acid",
    "reactants": [
      "khco3",
      "hclo4"
    ],
    "products": [
      "kclo4",
      "water",
      "co2"
    ],
    "gasId": "co2",
    "enthalpy": -15,
    "desc": "Rapid bubbling and evolution of odorless carbon dioxide gas."
  },
  {
    "id": "gas-carb-k2co3-ch3cooh",
    "name": "Effervescence of carbon dioxide from Potassium carbonate and Acetic acid",
    "reactants": [
      "k2co3",
      "ch3cooh"
    ],
    "products": [
      "ch3cook",
      "water",
      "co2"
    ],
    "gasId": "co2",
    "enthalpy": -25,
    "desc": "Vigorous fizzing and effervescence of carbon dioxide gas bubbles."
  },
  {
    "id": "gas-bicarb-khco3-ch3cooh",
    "name": "Carbon dioxide evolution from Potassium bicarbonate and Acetic acid",
    "reactants": [
      "khco3",
      "ch3cooh"
    ],
    "products": [
      "ch3cook",
      "water",
      "co2"
    ],
    "gasId": "co2",
    "enthalpy": -15,
    "desc": "Rapid bubbling and evolution of odorless carbon dioxide gas."
  },
  {
    "id": "gas-carb-li2co3-hcl",
    "name": "Effervescence of carbon dioxide from Lithium carbonate and Hydrochloric acid",
    "reactants": [
      "li2co3",
      "hcl"
    ],
    "products": [
      "licl",
      "water",
      "co2"
    ],
    "gasId": "co2",
    "enthalpy": -25,
    "desc": "Vigorous fizzing and effervescence of carbon dioxide gas bubbles."
  },
  {
    "id": "gas-carb-li2co3-hno3",
    "name": "Effervescence of carbon dioxide from Lithium carbonate and Nitric acid",
    "reactants": [
      "li2co3",
      "hno3"
    ],
    "products": [
      "lino3",
      "water",
      "co2"
    ],
    "gasId": "co2",
    "enthalpy": -25,
    "desc": "Vigorous fizzing and effervescence of carbon dioxide gas bubbles."
  },
  {
    "id": "gas-carb-li2co3-h2so4",
    "name": "Effervescence of carbon dioxide from Lithium carbonate and Sulfuric acid",
    "reactants": [
      "li2co3",
      "h2so4"
    ],
    "products": [
      "li2so4",
      "water",
      "co2"
    ],
    "gasId": "co2",
    "enthalpy": -25,
    "desc": "Vigorous fizzing and effervescence of carbon dioxide gas bubbles."
  },
  {
    "id": "gas-carb-li2co3-hbr",
    "name": "Effervescence of carbon dioxide from Lithium carbonate and Hydrogen bromide",
    "reactants": [
      "li2co3",
      "hbr"
    ],
    "products": [
      "libr",
      "water",
      "co2"
    ],
    "gasId": "co2",
    "enthalpy": -25,
    "desc": "Vigorous fizzing and effervescence of carbon dioxide gas bubbles."
  },
  {
    "id": "gas-carb-li2co3-hi",
    "name": "Effervescence of carbon dioxide from Lithium carbonate and Hydroiodic acid",
    "reactants": [
      "li2co3",
      "hi"
    ],
    "products": [
      "lii",
      "water",
      "co2"
    ],
    "gasId": "co2",
    "enthalpy": -25,
    "desc": "Vigorous fizzing and effervescence of carbon dioxide gas bubbles."
  },
  {
    "id": "gas-carb-li2co3-hclo4",
    "name": "Effervescence of carbon dioxide from Lithium carbonate and Perchloric acid",
    "reactants": [
      "li2co3",
      "hclo4"
    ],
    "products": [
      "liclo4",
      "water",
      "co2"
    ],
    "gasId": "co2",
    "enthalpy": -25,
    "desc": "Vigorous fizzing and effervescence of carbon dioxide gas bubbles."
  },
  {
    "id": "gas-carb-li2co3-ch3cooh",
    "name": "Effervescence of carbon dioxide from Lithium carbonate and Acetic acid",
    "reactants": [
      "li2co3",
      "ch3cooh"
    ],
    "products": [
      "ch3cooli",
      "water",
      "co2"
    ],
    "gasId": "co2",
    "enthalpy": -25,
    "desc": "Vigorous fizzing and effervescence of carbon dioxide gas bubbles."
  },
  {
    "id": "gas-carb-mgco3-hcl",
    "name": "Effervescence of carbon dioxide from Magnesium carbonate and Hydrochloric acid",
    "reactants": [
      "mgco3",
      "hcl"
    ],
    "products": [
      "mgcl2",
      "water",
      "co2"
    ],
    "gasId": "co2",
    "enthalpy": -25,
    "desc": "Vigorous fizzing and effervescence of carbon dioxide gas bubbles."
  },
  {
    "id": "gas-bicarb-mg-hco3-2-hcl",
    "name": "Carbon dioxide evolution from Magnesium bicarbonate and Hydrochloric acid",
    "reactants": [
      "mg-hco3-2",
      "hcl"
    ],
    "products": [
      "mgcl2",
      "water",
      "co2"
    ],
    "gasId": "co2",
    "enthalpy": -15,
    "desc": "Rapid bubbling and evolution of odorless carbon dioxide gas."
  },
  {
    "id": "gas-carb-mgco3-hno3",
    "name": "Effervescence of carbon dioxide from Magnesium carbonate and Nitric acid",
    "reactants": [
      "mgco3",
      "hno3"
    ],
    "products": [
      "mg-no3-2",
      "water",
      "co2"
    ],
    "gasId": "co2",
    "enthalpy": -25,
    "desc": "Vigorous fizzing and effervescence of carbon dioxide gas bubbles."
  },
  {
    "id": "gas-bicarb-mg-hco3-2-hno3",
    "name": "Carbon dioxide evolution from Magnesium bicarbonate and Nitric acid",
    "reactants": [
      "mg-hco3-2",
      "hno3"
    ],
    "products": [
      "mg-no3-2",
      "water",
      "co2"
    ],
    "gasId": "co2",
    "enthalpy": -15,
    "desc": "Rapid bubbling and evolution of odorless carbon dioxide gas."
  },
  {
    "id": "gas-carb-mgco3-h2so4",
    "name": "Effervescence of carbon dioxide from Magnesium carbonate and Sulfuric acid",
    "reactants": [
      "mgco3",
      "h2so4"
    ],
    "products": [
      "mgso4",
      "water",
      "co2"
    ],
    "gasId": "co2",
    "enthalpy": -25,
    "desc": "Vigorous fizzing and effervescence of carbon dioxide gas bubbles."
  },
  {
    "id": "gas-bicarb-mg-hco3-2-h2so4",
    "name": "Carbon dioxide evolution from Magnesium bicarbonate and Sulfuric acid",
    "reactants": [
      "mg-hco3-2",
      "h2so4"
    ],
    "products": [
      "mgso4",
      "water",
      "co2"
    ],
    "gasId": "co2",
    "enthalpy": -15,
    "desc": "Rapid bubbling and evolution of odorless carbon dioxide gas."
  },
  {
    "id": "gas-carb-mgco3-hbr",
    "name": "Effervescence of carbon dioxide from Magnesium carbonate and Hydrogen bromide",
    "reactants": [
      "mgco3",
      "hbr"
    ],
    "products": [
      "mgbr2",
      "water",
      "co2"
    ],
    "gasId": "co2",
    "enthalpy": -25,
    "desc": "Vigorous fizzing and effervescence of carbon dioxide gas bubbles."
  },
  {
    "id": "gas-bicarb-mg-hco3-2-hbr",
    "name": "Carbon dioxide evolution from Magnesium bicarbonate and Hydrogen bromide",
    "reactants": [
      "mg-hco3-2",
      "hbr"
    ],
    "products": [
      "mgbr2",
      "water",
      "co2"
    ],
    "gasId": "co2",
    "enthalpy": -15,
    "desc": "Rapid bubbling and evolution of odorless carbon dioxide gas."
  },
  {
    "id": "gas-carb-mgco3-hi",
    "name": "Effervescence of carbon dioxide from Magnesium carbonate and Hydroiodic acid",
    "reactants": [
      "mgco3",
      "hi"
    ],
    "products": [
      "mgi2",
      "water",
      "co2"
    ],
    "gasId": "co2",
    "enthalpy": -25,
    "desc": "Vigorous fizzing and effervescence of carbon dioxide gas bubbles."
  },
  {
    "id": "gas-bicarb-mg-hco3-2-hi",
    "name": "Carbon dioxide evolution from Magnesium bicarbonate and Hydroiodic acid",
    "reactants": [
      "mg-hco3-2",
      "hi"
    ],
    "products": [
      "mgi2",
      "water",
      "co2"
    ],
    "gasId": "co2",
    "enthalpy": -15,
    "desc": "Rapid bubbling and evolution of odorless carbon dioxide gas."
  },
  {
    "id": "gas-carb-caco3-hno3",
    "name": "Effervescence of carbon dioxide from Calcium carbonate and Nitric acid",
    "reactants": [
      "caco3",
      "hno3"
    ],
    "products": [
      "ca-no3-2",
      "water",
      "co2"
    ],
    "gasId": "co2",
    "enthalpy": -25,
    "desc": "Vigorous fizzing and effervescence of carbon dioxide gas bubbles."
  },
  {
    "id": "gas-carb-caco3-hbr",
    "name": "Effervescence of carbon dioxide from Calcium carbonate and Hydrogen bromide",
    "reactants": [
      "caco3",
      "hbr"
    ],
    "products": [
      "cabr2",
      "water",
      "co2"
    ],
    "gasId": "co2",
    "enthalpy": -25,
    "desc": "Vigorous fizzing and effervescence of carbon dioxide gas bubbles."
  },
  {
    "id": "gas-carb-caco3-hi",
    "name": "Effervescence of carbon dioxide from Calcium carbonate and Hydroiodic acid",
    "reactants": [
      "caco3",
      "hi"
    ],
    "products": [
      "cai2",
      "water",
      "co2"
    ],
    "gasId": "co2",
    "enthalpy": -25,
    "desc": "Vigorous fizzing and effervescence of carbon dioxide gas bubbles."
  },
  {
    "id": "gas-carb-baco3-hcl",
    "name": "Effervescence of carbon dioxide from Barium carbonate and Hydrochloric acid",
    "reactants": [
      "baco3",
      "hcl"
    ],
    "products": [
      "bacl2",
      "water",
      "co2"
    ],
    "gasId": "co2",
    "enthalpy": -25,
    "desc": "Vigorous fizzing and effervescence of carbon dioxide gas bubbles."
  },
  {
    "id": "gas-carb-baco3-hno3",
    "name": "Effervescence of carbon dioxide from Barium carbonate and Nitric acid",
    "reactants": [
      "baco3",
      "hno3"
    ],
    "products": [
      "bano32",
      "water",
      "co2"
    ],
    "gasId": "co2",
    "enthalpy": -25,
    "desc": "Vigorous fizzing and effervescence of carbon dioxide gas bubbles."
  },
  {
    "id": "gas-carb-baco3-hbr",
    "name": "Effervescence of carbon dioxide from Barium carbonate and Hydrogen bromide",
    "reactants": [
      "baco3",
      "hbr"
    ],
    "products": [
      "babr2",
      "water",
      "co2"
    ],
    "gasId": "co2",
    "enthalpy": -25,
    "desc": "Vigorous fizzing and effervescence of carbon dioxide gas bubbles."
  },
  {
    "id": "gas-carb-baco3-hi",
    "name": "Effervescence of carbon dioxide from Barium carbonate and Hydroiodic acid",
    "reactants": [
      "baco3",
      "hi"
    ],
    "products": [
      "bai2",
      "water",
      "co2"
    ],
    "gasId": "co2",
    "enthalpy": -25,
    "desc": "Vigorous fizzing and effervescence of carbon dioxide gas bubbles."
  },
  {
    "id": "gas-carb-srco3-hcl",
    "name": "Effervescence of carbon dioxide from Strontium carbonate and Hydrochloric acid",
    "reactants": [
      "srco3",
      "hcl"
    ],
    "products": [
      "srcl2",
      "water",
      "co2"
    ],
    "gasId": "co2",
    "enthalpy": -25,
    "desc": "Vigorous fizzing and effervescence of carbon dioxide gas bubbles."
  },
  {
    "id": "gas-carb-srco3-hno3",
    "name": "Effervescence of carbon dioxide from Strontium carbonate and Nitric acid",
    "reactants": [
      "srco3",
      "hno3"
    ],
    "products": [
      "sr-no3-2",
      "water",
      "co2"
    ],
    "gasId": "co2",
    "enthalpy": -25,
    "desc": "Vigorous fizzing and effervescence of carbon dioxide gas bubbles."
  },
  {
    "id": "gas-carb-srco3-hbr",
    "name": "Effervescence of carbon dioxide from Strontium carbonate and Hydrogen bromide",
    "reactants": [
      "srco3",
      "hbr"
    ],
    "products": [
      "srbr2",
      "water",
      "co2"
    ],
    "gasId": "co2",
    "enthalpy": -25,
    "desc": "Vigorous fizzing and effervescence of carbon dioxide gas bubbles."
  },
  {
    "id": "gas-sul-na2so3-hno3",
    "name": "Sulfur dioxide gas evolution from Sodium sulfite and Nitric acid",
    "reactants": [
      "na2so3",
      "hno3"
    ],
    "products": [
      "nano3",
      "water",
      "so2"
    ],
    "gasId": "so2",
    "enthalpy": -20,
    "desc": "Choking, sharp, pungent sulfur dioxide gas effervesces from solution."
  },
  {
    "id": "gas-sul-na2so3-h2so4",
    "name": "Sulfur dioxide gas evolution from Sodium sulfite and Sulfuric acid",
    "reactants": [
      "na2so3",
      "h2so4"
    ],
    "products": [
      "na2so4",
      "water",
      "so2"
    ],
    "gasId": "so2",
    "enthalpy": -20,
    "desc": "Choking, sharp, pungent sulfur dioxide gas effervesces from solution."
  },
  {
    "id": "gas-sul-na2so3-hbr",
    "name": "Sulfur dioxide gas evolution from Sodium sulfite and Hydrogen bromide",
    "reactants": [
      "na2so3",
      "hbr"
    ],
    "products": [
      "nabr",
      "water",
      "so2"
    ],
    "gasId": "so2",
    "enthalpy": -20,
    "desc": "Choking, sharp, pungent sulfur dioxide gas effervesces from solution."
  },
  {
    "id": "gas-sul-na2so3-hi",
    "name": "Sulfur dioxide gas evolution from Sodium sulfite and Hydroiodic acid",
    "reactants": [
      "na2so3",
      "hi"
    ],
    "products": [
      "nai",
      "water",
      "so2"
    ],
    "gasId": "so2",
    "enthalpy": -20,
    "desc": "Choking, sharp, pungent sulfur dioxide gas effervesces from solution."
  },
  {
    "id": "gas-sul-k2so3-hno3",
    "name": "Sulfur dioxide gas evolution from Potassium sulfite and Nitric acid",
    "reactants": [
      "k2so3",
      "hno3"
    ],
    "products": [
      "kno3",
      "water",
      "so2"
    ],
    "gasId": "so2",
    "enthalpy": -20,
    "desc": "Choking, sharp, pungent sulfur dioxide gas effervesces from solution."
  },
  {
    "id": "gas-sul-k2so3-h2so4",
    "name": "Sulfur dioxide gas evolution from Potassium sulfite and Sulfuric acid",
    "reactants": [
      "k2so3",
      "h2so4"
    ],
    "products": [
      "k2so4",
      "water",
      "so2"
    ],
    "gasId": "so2",
    "enthalpy": -20,
    "desc": "Choking, sharp, pungent sulfur dioxide gas effervesces from solution."
  },
  {
    "id": "gas-sul-k2so3-hbr",
    "name": "Sulfur dioxide gas evolution from Potassium sulfite and Hydrogen bromide",
    "reactants": [
      "k2so3",
      "hbr"
    ],
    "products": [
      "kbr",
      "water",
      "so2"
    ],
    "gasId": "so2",
    "enthalpy": -20,
    "desc": "Choking, sharp, pungent sulfur dioxide gas effervesces from solution."
  },
  {
    "id": "gas-sul-k2so3-hi",
    "name": "Sulfur dioxide gas evolution from Potassium sulfite and Hydroiodic acid",
    "reactants": [
      "k2so3",
      "hi"
    ],
    "products": [
      "ki",
      "water",
      "so2"
    ],
    "gasId": "so2",
    "enthalpy": -20,
    "desc": "Choking, sharp, pungent sulfur dioxide gas effervesces from solution."
  },
  {
    "id": "gas-sul-caso3-hcl",
    "name": "Sulfur dioxide gas evolution from Calcium sulfite and Hydrochloric acid",
    "reactants": [
      "caso3",
      "hcl"
    ],
    "products": [
      "cacl2",
      "water",
      "so2"
    ],
    "gasId": "so2",
    "enthalpy": -20,
    "desc": "Choking, sharp, pungent sulfur dioxide gas effervesces from solution."
  },
  {
    "id": "gas-sul-caso3-hno3",
    "name": "Sulfur dioxide gas evolution from Calcium sulfite and Nitric acid",
    "reactants": [
      "caso3",
      "hno3"
    ],
    "products": [
      "ca-no3-2",
      "water",
      "so2"
    ],
    "gasId": "so2",
    "enthalpy": -20,
    "desc": "Choking, sharp, pungent sulfur dioxide gas effervesces from solution."
  },
  {
    "id": "gas-sul-caso3-hbr",
    "name": "Sulfur dioxide gas evolution from Calcium sulfite and Hydrogen bromide",
    "reactants": [
      "caso3",
      "hbr"
    ],
    "products": [
      "cabr2",
      "water",
      "so2"
    ],
    "gasId": "so2",
    "enthalpy": -20,
    "desc": "Choking, sharp, pungent sulfur dioxide gas effervesces from solution."
  },
  {
    "id": "gas-sul-caso3-hi",
    "name": "Sulfur dioxide gas evolution from Calcium sulfite and Hydroiodic acid",
    "reactants": [
      "caso3",
      "hi"
    ],
    "products": [
      "cai2",
      "water",
      "so2"
    ],
    "gasId": "so2",
    "enthalpy": -20,
    "desc": "Choking, sharp, pungent sulfur dioxide gas effervesces from solution."
  },
  {
    "id": "gas-h2s-zns-hcl",
    "name": "Hydrogen sulfide gas evolution from Zinc sulfide and Hydrochloric acid",
    "reactants": [
      "zns",
      "hcl"
    ],
    "products": [
      "zncl2",
      "h2s"
    ],
    "gasId": "h2s",
    "enthalpy": -22,
    "desc": "Foul rotten-egg odor of hydrogen sulfide gas evolves as sulfide dissolves."
  },
  {
    "id": "gas-h2s-zns-h2so4",
    "name": "Hydrogen sulfide gas evolution from Zinc sulfide and Sulfuric acid",
    "reactants": [
      "zns",
      "h2so4"
    ],
    "products": [
      "znso4",
      "h2s"
    ],
    "gasId": "h2s",
    "enthalpy": -22,
    "desc": "Foul rotten-egg odor of hydrogen sulfide gas evolves as sulfide dissolves."
  },
  {
    "id": "gas-h2s-zns-hbr",
    "name": "Hydrogen sulfide gas evolution from Zinc sulfide and Hydrogen bromide",
    "reactants": [
      "zns",
      "hbr"
    ],
    "products": [
      "znbr2",
      "h2s"
    ],
    "gasId": "h2s",
    "enthalpy": -22,
    "desc": "Foul rotten-egg odor of hydrogen sulfide gas evolves as sulfide dissolves."
  },
  {
    "id": "gas-h2s-zns-hi",
    "name": "Hydrogen sulfide gas evolution from Zinc sulfide and Hydroiodic acid",
    "reactants": [
      "zns",
      "hi"
    ],
    "products": [
      "zni2",
      "h2s"
    ],
    "gasId": "h2s",
    "enthalpy": -22,
    "desc": "Foul rotten-egg odor of hydrogen sulfide gas evolves as sulfide dissolves."
  },
  {
    "id": "gas-h2s-mns-hcl",
    "name": "Hydrogen sulfide gas evolution from Manganese(II) sulfide and Hydrochloric acid",
    "reactants": [
      "mns",
      "hcl"
    ],
    "products": [
      "mncl2",
      "h2s"
    ],
    "gasId": "h2s",
    "enthalpy": -22,
    "desc": "Foul rotten-egg odor of hydrogen sulfide gas evolves as sulfide dissolves."
  },
  {
    "id": "gas-h2s-mns-h2so4",
    "name": "Hydrogen sulfide gas evolution from Manganese(II) sulfide and Sulfuric acid",
    "reactants": [
      "mns",
      "h2so4"
    ],
    "products": [
      "mnso4",
      "h2s"
    ],
    "gasId": "h2s",
    "enthalpy": -22,
    "desc": "Foul rotten-egg odor of hydrogen sulfide gas evolves as sulfide dissolves."
  },
  {
    "id": "gas-h2s-mns-hbr",
    "name": "Hydrogen sulfide gas evolution from Manganese(II) sulfide and Hydrogen bromide",
    "reactants": [
      "mns",
      "hbr"
    ],
    "products": [
      "mnbr2",
      "h2s"
    ],
    "gasId": "h2s",
    "enthalpy": -22,
    "desc": "Foul rotten-egg odor of hydrogen sulfide gas evolves as sulfide dissolves."
  },
  {
    "id": "gas-h2s-na2s-h2so4",
    "name": "Hydrogen sulfide gas evolution from Sodium sulfide and Sulfuric acid",
    "reactants": [
      "na2s",
      "h2so4"
    ],
    "products": [
      "na2so4",
      "h2s"
    ],
    "gasId": "h2s",
    "enthalpy": -22,
    "desc": "Foul rotten-egg odor of hydrogen sulfide gas evolves as sulfide dissolves."
  },
  {
    "id": "gas-h2s-na2s-hbr",
    "name": "Hydrogen sulfide gas evolution from Sodium sulfide and Hydrogen bromide",
    "reactants": [
      "na2s",
      "hbr"
    ],
    "products": [
      "nabr",
      "h2s"
    ],
    "gasId": "h2s",
    "enthalpy": -22,
    "desc": "Foul rotten-egg odor of hydrogen sulfide gas evolves as sulfide dissolves."
  },
  {
    "id": "gas-h2s-na2s-hi",
    "name": "Hydrogen sulfide gas evolution from Sodium sulfide and Hydroiodic acid",
    "reactants": [
      "na2s",
      "hi"
    ],
    "products": [
      "nai",
      "h2s"
    ],
    "gasId": "h2s",
    "enthalpy": -22,
    "desc": "Foul rotten-egg odor of hydrogen sulfide gas evolves as sulfide dissolves."
  },
  {
    "id": "gas-h2s-k2s-hcl",
    "name": "Hydrogen sulfide gas evolution from Potassium sulfide and Hydrochloric acid",
    "reactants": [
      "k2s",
      "hcl"
    ],
    "products": [
      "kcl",
      "h2s"
    ],
    "gasId": "h2s",
    "enthalpy": -22,
    "desc": "Foul rotten-egg odor of hydrogen sulfide gas evolves as sulfide dissolves."
  },
  {
    "id": "gas-h2s-k2s-h2so4",
    "name": "Hydrogen sulfide gas evolution from Potassium sulfide and Sulfuric acid",
    "reactants": [
      "k2s",
      "h2so4"
    ],
    "products": [
      "k2so4",
      "h2s"
    ],
    "gasId": "h2s",
    "enthalpy": -22,
    "desc": "Foul rotten-egg odor of hydrogen sulfide gas evolves as sulfide dissolves."
  },
  {
    "id": "gas-h2s-k2s-hbr",
    "name": "Hydrogen sulfide gas evolution from Potassium sulfide and Hydrogen bromide",
    "reactants": [
      "k2s",
      "hbr"
    ],
    "products": [
      "kbr",
      "h2s"
    ],
    "gasId": "h2s",
    "enthalpy": -22,
    "desc": "Foul rotten-egg odor of hydrogen sulfide gas evolves as sulfide dissolves."
  },
  {
    "id": "gas-h2s-k2s-hi",
    "name": "Hydrogen sulfide gas evolution from Potassium sulfide and Hydroiodic acid",
    "reactants": [
      "k2s",
      "hi"
    ],
    "products": [
      "ki",
      "h2s"
    ],
    "gasId": "h2s",
    "enthalpy": -22,
    "desc": "Foul rotten-egg odor of hydrogen sulfide gas evolves as sulfide dissolves."
  },
  {
    "id": "gas-nh3-nh4no3-naoh",
    "name": "Ammonia gas release from Ammonium nitrate with Sodium hydroxide",
    "reactants": [
      "nh4no3",
      "naoh"
    ],
    "products": [
      "nano3",
      "water",
      "ammonia"
    ],
    "gasId": "ammonia",
    "enthalpy": 5,
    "desc": "Pungent ammonia fumes rise, turning damp red litmus paper blue."
  },
  {
    "id": "gas-nh3-nh4no3-koh",
    "name": "Ammonia gas release from Ammonium nitrate with Potassium hydroxide",
    "reactants": [
      "nh4no3",
      "koh"
    ],
    "products": [
      "kno3",
      "water",
      "ammonia"
    ],
    "gasId": "ammonia",
    "enthalpy": 5,
    "desc": "Pungent ammonia fumes rise, turning damp red litmus paper blue."
  },
  {
    "id": "gas-nh3-nh4no3-lioh",
    "name": "Ammonia gas release from Ammonium nitrate with Lithium hydroxide",
    "reactants": [
      "nh4no3",
      "lioh"
    ],
    "products": [
      "lino3",
      "water",
      "ammonia"
    ],
    "gasId": "ammonia",
    "enthalpy": 5,
    "desc": "Pungent ammonia fumes rise, turning damp red litmus paper blue."
  },
  {
    "id": "gas-nh3-nh4no3-caoh2",
    "name": "Ammonia gas release from Ammonium nitrate with Calcium hydroxide",
    "reactants": [
      "nh4no3",
      "caoh2"
    ],
    "products": [
      "ca-no3-2",
      "water",
      "ammonia"
    ],
    "gasId": "ammonia",
    "enthalpy": 5,
    "desc": "Pungent ammonia fumes rise, turning damp red litmus paper blue."
  },
  {
    "id": "gas-nh3-nh4no3-ba-oh-2",
    "name": "Ammonia gas release from Ammonium nitrate with Barium hydroxide",
    "reactants": [
      "nh4no3",
      "ba-oh-2"
    ],
    "products": [
      "bano32",
      "water",
      "ammonia"
    ],
    "gasId": "ammonia",
    "enthalpy": 5,
    "desc": "Pungent ammonia fumes rise, turning damp red litmus paper blue."
  },
  {
    "id": "gas-nh3-nh4br-naoh",
    "name": "Ammonia gas release from Ammonium bromide with Sodium hydroxide",
    "reactants": [
      "nh4br",
      "naoh"
    ],
    "products": [
      "nabr",
      "water",
      "ammonia"
    ],
    "gasId": "ammonia",
    "enthalpy": 5,
    "desc": "Pungent ammonia fumes rise, turning damp red litmus paper blue."
  },
  {
    "id": "gas-nh3-nh4br-koh",
    "name": "Ammonia gas release from Ammonium bromide with Potassium hydroxide",
    "reactants": [
      "nh4br",
      "koh"
    ],
    "products": [
      "kbr",
      "water",
      "ammonia"
    ],
    "gasId": "ammonia",
    "enthalpy": 5,
    "desc": "Pungent ammonia fumes rise, turning damp red litmus paper blue."
  },
  {
    "id": "gas-nh3-nh4br-lioh",
    "name": "Ammonia gas release from Ammonium bromide with Lithium hydroxide",
    "reactants": [
      "nh4br",
      "lioh"
    ],
    "products": [
      "libr",
      "water",
      "ammonia"
    ],
    "gasId": "ammonia",
    "enthalpy": 5,
    "desc": "Pungent ammonia fumes rise, turning damp red litmus paper blue."
  },
  {
    "id": "gas-nh3-nh4br-caoh2",
    "name": "Ammonia gas release from Ammonium bromide with Calcium hydroxide",
    "reactants": [
      "nh4br",
      "caoh2"
    ],
    "products": [
      "cabr2",
      "water",
      "ammonia"
    ],
    "gasId": "ammonia",
    "enthalpy": 5,
    "desc": "Pungent ammonia fumes rise, turning damp red litmus paper blue."
  },
  {
    "id": "gas-nh3-nh4br-ba-oh-2",
    "name": "Ammonia gas release from Ammonium bromide with Barium hydroxide",
    "reactants": [
      "nh4br",
      "ba-oh-2"
    ],
    "products": [
      "babr2",
      "water",
      "ammonia"
    ],
    "gasId": "ammonia",
    "enthalpy": 5,
    "desc": "Pungent ammonia fumes rise, turning damp red litmus paper blue."
  },
  {
    "id": "gas-nh3-nh4i-naoh",
    "name": "Ammonia gas release from Ammonium iodide with Sodium hydroxide",
    "reactants": [
      "nh4i",
      "naoh"
    ],
    "products": [
      "nai",
      "water",
      "ammonia"
    ],
    "gasId": "ammonia",
    "enthalpy": 5,
    "desc": "Pungent ammonia fumes rise, turning damp red litmus paper blue."
  },
  {
    "id": "gas-nh3-nh4i-koh",
    "name": "Ammonia gas release from Ammonium iodide with Potassium hydroxide",
    "reactants": [
      "nh4i",
      "koh"
    ],
    "products": [
      "ki",
      "water",
      "ammonia"
    ],
    "gasId": "ammonia",
    "enthalpy": 5,
    "desc": "Pungent ammonia fumes rise, turning damp red litmus paper blue."
  },
  {
    "id": "gas-nh3-nh4i-lioh",
    "name": "Ammonia gas release from Ammonium iodide with Lithium hydroxide",
    "reactants": [
      "nh4i",
      "lioh"
    ],
    "products": [
      "lii",
      "water",
      "ammonia"
    ],
    "gasId": "ammonia",
    "enthalpy": 5,
    "desc": "Pungent ammonia fumes rise, turning damp red litmus paper blue."
  },
  {
    "id": "gas-nh3-nh4i-caoh2",
    "name": "Ammonia gas release from Ammonium iodide with Calcium hydroxide",
    "reactants": [
      "nh4i",
      "caoh2"
    ],
    "products": [
      "cai2",
      "water",
      "ammonia"
    ],
    "gasId": "ammonia",
    "enthalpy": 5,
    "desc": "Pungent ammonia fumes rise, turning damp red litmus paper blue."
  },
  {
    "id": "gas-nh3-nh4i-ba-oh-2",
    "name": "Ammonia gas release from Ammonium iodide with Barium hydroxide",
    "reactants": [
      "nh4i",
      "ba-oh-2"
    ],
    "products": [
      "bai2",
      "water",
      "ammonia"
    ],
    "gasId": "ammonia",
    "enthalpy": 5,
    "desc": "Pungent ammonia fumes rise, turning damp red litmus paper blue."
  }
];

  for (const d of list) {
    const eff: SeedObservableEffect = {
      type: "gas_evolution",
      description: d.desc,
      relatedChemicalId: d.gasId,
    };

    addReaction({
      id: d.id,
      name: d.name,
      reactionType: "gas_evolution",
      reactants: d.reactants,
      products: d.products,
      enthalpyKjPerMol: d.enthalpy,
      temperatureMinC: 15,
      temperatureMaxC: 65,
      observableEffects: [eff],
      safetyNotes: "Gas evolution reaction; perform in a well-ventilated fume hood with eye protection.",
    });
  }
}
