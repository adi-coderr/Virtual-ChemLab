import { addReaction } from "./generate1000Reactions.js";

export function buildDomain1AcidBase(): void {
  // Domain 1: 120 Curated Acid-Base Neutralizations
  const neutralizations = [
    // --- Group 1: Strong & Medium Acids + Alkali/Alkaline Earth Hydroxides (40) ---
    { id: "neut-hbr-naoh", name: "Neutralization of hydrobromic acid with sodium hydroxide", acid: "hbr", base: "naoh", salt: "nabr", enth: -57.3, net: "H+ + OH- → H2O", desc: "Colorless solution warms as HBr is neutralized by NaOH forming sodium bromide." },
    { id: "neut-hbr-koh", name: "Neutralization of hydrobromic acid with potassium hydroxide", acid: "hbr", base: "koh", salt: "kbr", enth: -57.4, net: "H+ + OH- → H2O", desc: "Exothermic neutralization forming soluble potassium bromide." },
    { id: "neut-hbr-lioh", name: "Neutralization of hydrobromic acid with lithium hydroxide", acid: "hbr", base: "lioh", salt: "libr", enth: -56.8, net: "H+ + OH- → H2O", desc: "Exothermic reaction yielding aqueous lithium bromide." },
    { id: "neut-hbr-rboh", name: "Neutralization of hydrobromic acid with rubidium hydroxide", acid: "hbr", base: "rboh", salt: "rbbr", enth: -57.5, net: "H+ + OH- → H2O", desc: "Strong acid/strong base neutralization yielding rubidium bromide." },
    { id: "neut-hbr-csoh", name: "Neutralization of hydrobromic acid with cesium hydroxide", acid: "hbr", base: "csoh", salt: "csbr", enth: -57.6, net: "H+ + OH- → H2O", desc: "Exothermic neutralization yielding cesium bromide." },
    { id: "neut-hbr-caoh2", name: "Neutralization of hydrobromic acid with calcium hydroxide", acid: "hbr", base: "caoh2", salt: "cabr2", enth: -115.0, net: "2H+ + Ca(OH)2 → Ca2+ + 2H2O", desc: "Slightly cloudy limewater dissolves cleanly forming calcium bromide." },
    { id: "neut-hbr-baoh2", name: "Neutralization of hydrobromic acid with barium hydroxide", acid: "hbr", base: "ba-oh-2", salt: "babr2", enth: -115.2, net: "2H+ + Ba(OH)2 → Ba2+ + 2H2O", desc: "Barium hydroxide neutralizes HBr with noticeable temperature elevation." },
    { id: "neut-hbr-sroh2", name: "Neutralization of hydrobromic acid with strontium hydroxide", acid: "hbr", base: "sr-oh-2", salt: "srbr2", enth: -114.8, net: "2H+ + Sr(OH)2 → Sr2+ + 2H2O", desc: "Strontium hydroxide solution neutralizes HBr yielding strontium bromide." },
    { id: "neut-hbr-mgoh2", name: "Dissolution and neutralization of magnesium hydroxide by hydrobromic acid", acid: "hbr", base: "mgoh2", salt: "mgbr2", enth: -105.4, net: "2H+ + Mg(OH)2(s) → Mg2+ + 2H2O", desc: "White milky suspension of milk of magnesia dissolves cleanly." },

    { id: "neut-hi-naoh", name: "Neutralization of hydroiodic acid with sodium hydroxide", acid: "hi", base: "naoh", salt: "nai", enth: -57.2, net: "H+ + OH- → H2O", desc: "Hydroiodic acid neutralized by sodium hydroxide forming sodium iodide." },
    { id: "neut-hi-koh", name: "Neutralization of hydroiodic acid with potassium hydroxide", acid: "hi", base: "koh", salt: "ki", enth: -57.3, net: "H+ + OH- → H2O", desc: "Hydroiodic acid neutralized by potassium hydroxide forming potassium iodide." },
    { id: "neut-hi-lioh", name: "Neutralization of hydroiodic acid with lithium hydroxide", acid: "hi", base: "lioh", salt: "lii", enth: -56.7, net: "H+ + OH- → H2O", desc: "Exothermic neutralization forming soluble lithium iodide." },
    { id: "neut-hi-rboh", name: "Neutralization of hydroiodic acid with rubidium hydroxide", acid: "hi", base: "rboh", salt: "rbi", enth: -57.4, net: "H+ + OH- → H2O", desc: "Exothermic neutralization forming rubidium iodide." },
    { id: "neut-hi-csoh", name: "Neutralization of hydroiodic acid with cesium hydroxide", acid: "hi", base: "csoh", salt: "csi", enth: -57.5, net: "H+ + OH- → H2O", desc: "Exothermic neutralization yielding cesium iodide." },
    { id: "neut-hi-caoh2", name: "Neutralization of hydroiodic acid with calcium hydroxide", acid: "hi", base: "caoh2", salt: "cai2", enth: -114.6, net: "2H+ + Ca(OH)2 → Ca2+ + 2H2O", desc: "Calcium hydroxide suspension clears smoothly into soluble calcium iodide." },
    { id: "neut-hi-baoh2", name: "Neutralization of hydroiodic acid with barium hydroxide", acid: "hi", base: "ba-oh-2", salt: "bai2", enth: -115.0, net: "2H+ + Ba(OH)2 → Ba2+ + 2H2O", desc: "Barium hydroxide neutralizes HI forming barium iodide." },
    { id: "neut-hi-sroh2", name: "Neutralization of hydroiodic acid with strontium hydroxide", acid: "hi", base: "sr-oh-2", salt: "sri2", enth: -114.5, net: "2H+ + Sr(OH)2 → Sr2+ + 2H2O", desc: "Strontium hydroxide neutralizes HI forming strontium iodide." },
    { id: "neut-hi-mgoh2", name: "Dissolution of magnesium hydroxide in hydroiodic acid", acid: "hi", base: "mgoh2", salt: "mgi2", enth: -104.9, net: "2H+ + Mg(OH)2(s) → Mg2+ + 2H2O", desc: "White suspension dissolves into clear magnesium iodide." },

    { id: "neut-hcl-rboh", name: "Neutralization of hydrochloric acid with rubidium hydroxide", acid: "hcl", base: "rboh", salt: "rbcl", enth: -57.4, net: "H+ + OH- → H2O", desc: "Neutralization producing rubidium chloride." },
    { id: "neut-hcl-csoh", name: "Neutralization of hydrochloric acid with cesium hydroxide", acid: "hcl", base: "csoh", salt: "cscl", enth: -57.5, net: "H+ + OH- → H2O", desc: "Neutralization producing cesium chloride." },
    { id: "neut-hcl-sroh2", name: "Neutralization of hydrochloric acid with strontium hydroxide", acid: "hcl", base: "sr-oh-2", salt: "srcl2", enth: -114.8, net: "2H+ + Sr(OH)2 → Sr2+ + 2H2O", desc: "Neutralization producing soluble strontium chloride." },
    { id: "neut-hcl-baoh2", name: "Neutralization of hydrochloric acid with barium hydroxide", acid: "hcl", base: "ba-oh-2", salt: "bacl2", enth: -115.1, net: "2H+ + Ba(OH)2 → Ba2+ + 2H2O", desc: "Neutralization producing barium chloride." },

    { id: "neut-hno3-lioh", name: "Neutralization of nitric acid with lithium hydroxide", acid: "hno3", base: "lioh", salt: "lino3", enth: -56.9, net: "H+ + OH- → H2O", desc: "Exothermic reaction producing lithium nitrate." },
    { id: "neut-hno3-rboh", name: "Neutralization of nitric acid with rubidium hydroxide", acid: "hno3", base: "rboh", salt: "rbno3", enth: -57.3, net: "H+ + OH- → H2O", desc: "Neutralization producing rubidium nitrate." },
    { id: "neut-hno3-csoh", name: "Neutralization of nitric acid with cesium hydroxide", acid: "hno3", base: "csoh", salt: "csno3", enth: -57.4, net: "H+ + OH- → H2O", desc: "Neutralization producing cesium nitrate." },
    { id: "neut-hno3-sroh2", name: "Neutralization of nitric acid with strontium hydroxide", acid: "hno3", base: "sr-oh-2", salt: "sr-no3-2", enth: -114.6, net: "2H+ + Sr(OH)2 → Sr2+ + 2H2O", desc: "Neutralization producing strontium nitrate." },
    { id: "neut-hno3-baoh2", name: "Neutralization of nitric acid with barium hydroxide", acid: "hno3", base: "ba-oh-2", salt: "bano32", enth: -114.9, net: "2H+ + Ba(OH)2 → Ba2+ + 2H2O", desc: "Neutralization producing barium nitrate." },
    { id: "neut-hno3-caoh2", name: "Neutralization of nitric acid with calcium hydroxide", acid: "hno3", base: "caoh2", salt: "ca-no3-2", enth: -114.2, net: "2H+ + Ca(OH)2 → Ca2+ + 2H2O", desc: "Neutralization producing calcium nitrate." },
    { id: "neut-hno3-mgoh2", name: "Dissolution of magnesium hydroxide by nitric acid", acid: "hno3", base: "mgoh2", salt: "mg-no3-2", enth: -104.5, net: "2H+ + Mg(OH)2(s) → Mg2+ + 2H2O", desc: "White suspension dissolves forming magnesium nitrate." },

    { id: "neut-h2so4-rboh", name: "Neutralization of sulfuric acid with rubidium hydroxide", acid: "h2so4", base: "rboh", salt: "rb2so4", enth: -114.6, net: "H2SO4 + 2OH- → SO4(2-) + 2H2O", desc: "Neutralization producing rubidium sulfate." },
    { id: "neut-h2so4-csoh", name: "Neutralization of sulfuric acid with cesium hydroxide", acid: "h2so4", base: "csoh", salt: "cs2so4", enth: -114.8, net: "H2SO4 + 2OH- → SO4(2-) + 2H2O", desc: "Neutralization producing cesium sulfate." },
    { id: "neut-h2so4-sroh2", name: "Neutralization and precipitation of strontium hydroxide with sulfuric acid", acid: "h2so4", base: "sr-oh-2", salt: "srso4", enth: -128.5, net: "Sr2+ + 2OH- + 2H+ + SO4(2-) → SrSO4(s) + 2H2O", desc: "Simultaneous acid-base neutralization and precipitation of white strontium sulfate." },

    { id: "neut-hclo4-lioh", name: "Neutralization of perchloric acid with lithium hydroxide", acid: "hclo4", base: "lioh", salt: "liclo4", enth: -57.1, net: "H+ + OH- → H2O", desc: "Neutralization producing lithium perchlorate." },
    { id: "neut-hclo4-naoh", name: "Neutralization of perchloric acid with sodium hydroxide", acid: "hclo4", base: "naoh", salt: "naclo4", enth: -57.3, net: "H+ + OH- → H2O", desc: "Neutralization producing sodium perchlorate." },
    { id: "neut-hclo4-koh", name: "Neutralization of perchloric acid with potassium hydroxide", acid: "hclo4", base: "koh", salt: "kclo4", enth: -57.4, net: "H+ + OH- → H2O", desc: "Exothermic neutralization forming sparingly soluble potassium perchlorate." },

    { id: "neut-hf-naoh", name: "Neutralization of hydrofluoric acid with sodium hydroxide", acid: "hf", base: "naoh", salt: "naf", enth: -68.3, net: "HF + OH- → F- + H2O", desc: "Weak acid neutralization forming sodium fluoride." },
    { id: "neut-hf-koh", name: "Neutralization of hydrofluoric acid with potassium hydroxide", acid: "hf", base: "koh", salt: "kf", enth: -68.5, net: "HF + OH- → F- + H2O", desc: "Neutralization forming potassium fluoride." },
    { id: "neut-hf-caoh2", name: "Precipitative neutralization of hydrofluoric acid with calcium hydroxide", acid: "hf", base: "caoh2", salt: "caf2", enth: -138.2, net: "2HF + Ca(OH)2 → CaF2(s) + 2H2O", desc: "Rapid precipitation of insoluble calcium fluoride." },
    { id: "neut-hno2-naoh", name: "Neutralization of nitrous acid with sodium hydroxide", acid: "hno2", base: "naoh", salt: "nano2", enth: -53.2, net: "HNO2 + OH- → NO2- + H2O", desc: "Neutralization of nitrous acid producing sodium nitrite." },

    // --- Group 2: Weak Carboxylic & Inorganic Acids with Bases (40) ---
    { id: "neut-hf-baoh2", name: "Neutralization of hydrofluoric acid with barium hydroxide", acid: "hf", base: "ba-oh-2", salt: "baf2", enth: -137.8, net: "2HF + Ba(OH)2 → BaF2(s) + 2H2O", desc: "Precipitation of barium fluoride." },
    { id: "neut-hf-sroh2", name: "Neutralization of hydrofluoric acid with strontium hydroxide", acid: "hf", base: "sr-oh-2", salt: "srf2", enth: -136.9, net: "2HF + Sr(OH)2 → SrF2(s) + 2H2O", desc: "Precipitation of strontium fluoride." },
    { id: "neut-hf-mgoh2", name: "Neutralization of hydrofluoric acid with magnesium hydroxide", acid: "hf", base: "mgoh2", salt: "mgf2", enth: -128.4, net: "2HF + Mg(OH)2(s) → MgF2(s) + 2H2O", desc: "Conversion of hydroxide to insoluble magnesium fluoride." },
    { id: "neut-hclo-naoh", name: "Neutralization of hypochlorous acid with sodium hydroxide", acid: "hclo", base: "naoh", salt: "naclo", enth: -55.0, net: "HClO + OH- → ClO- + H2O", desc: "Neutralization of hypochlorous acid forming household bleach (sodium hypochlorite)." },
    { id: "neut-h3bo3-naoh", name: "Neutralization of boric acid with sodium hydroxide", acid: "h3bo3", base: "naoh", salt: "nabo2", enth: -42.5, net: "H3BO3 + OH- → BO2- + 2H2O", desc: "Mild neutralization of boric acid to sodium metaborate." },

    { id: "neut-hcooh-naoh", name: "Neutralization of formic acid with sodium hydroxide", acid: "hcooh", base: "naoh", salt: "hcoona", enth: -56.2, net: "HCOOH + OH- → HCOO- + H2O", desc: "Mild warming as formic acid is neutralized to sodium formate." },
    { id: "neut-hcooh-koh", name: "Neutralization of formic acid with potassium hydroxide", acid: "hcooh", base: "koh", salt: "hcook", enth: -56.4, net: "HCOOH + OH- → HCOO- + H2O", desc: "Neutralization yielding potassium formate." },
    { id: "neut-hcooh-caoh2", name: "Neutralization of formic acid with calcium hydroxide", acid: "hcooh", base: "caoh2", salt: "hcoo-2-ca", enth: -112.5, net: "2HCOOH + Ca(OH)2 → Ca(HCOO)2 + 2H2O", desc: "Limewater clears as calcium formate is produced." },
    { id: "neut-hcooh-baoh2", name: "Neutralization of formic acid with barium hydroxide", acid: "hcooh", base: "ba-oh-2", salt: "hcoo-2-ba", enth: -113.0, net: "2HCOOH + Ba(OH)2 → Ba(HCOO)2 + 2H2O", desc: "Neutralization yielding barium formate." },

    { id: "neut-ch3cooh-lioh", name: "Neutralization of acetic acid with lithium hydroxide", acid: "acetic-acid", base: "lioh", salt: "ch3cooli", enth: -55.8, net: "CH3COOH + OH- → CH3COO- + H2O", desc: "Vinegar odor subsides as lithium acetate forms." },
    { id: "neut-ch3cooh-koh", name: "Neutralization of acetic acid with potassium hydroxide", acid: "acetic-acid", base: "koh", salt: "ch3cook", enth: -56.1, net: "CH3COOH + OH- → CH3COO- + H2O", desc: "Neutralization yielding potassium acetate." },
    { id: "neut-ch3cooh-caoh2", name: "Neutralization of acetic acid with calcium hydroxide", acid: "acetic-acid", base: "caoh2", salt: "ch3coo-2-ca", enth: -112.0, net: "2CH3COOH + Ca(OH)2 → (CH3COO)2Ca + 2H2O", desc: "Calcium hydroxide dissolves forming calcium acetate." },
    { id: "neut-ch3cooh-baoh2", name: "Neutralization of acetic acid with barium hydroxide", acid: "acetic-acid", base: "ba-oh-2", salt: "ch3coo-2-ba", enth: -112.4, net: "2CH3COOH + Ba(OH)2 → (CH3COO)2Ba + 2H2O", desc: "Barium hydroxide dissolves forming barium acetate." },
    { id: "neut-ch3cooh-mgoh2", name: "Neutralization of acetic acid with magnesium hydroxide", acid: "acetic-acid", base: "mgoh2", salt: "ch3coo-2-mg", enth: -101.8, net: "2CH3COOH + Mg(OH)2(s) → (CH3COO)2Mg + 2H2O", desc: "Suspension dissolves forming magnesium acetate." },

    { id: "neut-c3h7cooh-naoh", name: "Neutralization of butyric acid with sodium hydroxide", acid: "c3h7cooh", base: "naoh", salt: "c3h7coona", enth: -55.5, net: "C3H7COOH + OH- → C3H7COO- + H2O", desc: "Pungent odor of butyric acid neutralizes into sodium butyrate." },
    { id: "neut-c3h7cooh-koh", name: "Neutralization of butyric acid with potassium hydroxide", acid: "c3h7cooh", base: "koh", salt: "c3h7cook", enth: -55.7, net: "C3H7COOH + OH- → C3H7COO- + H2O", desc: "Neutralization yielding potassium butyrate." },
    { id: "neut-c4h9cooh-naoh", name: "Neutralization of valeric acid with sodium hydroxide", acid: "c4h9cooh", base: "naoh", salt: "c4h9coona", enth: -55.3, net: "C4H9COOH + OH- → C4H9COO- + H2O", desc: "Valeric acid neutralizes into sodium valerate." },
    { id: "neut-c6h5cooh-naoh", name: "Neutralization of benzoic acid with sodium hydroxide", acid: "c6h5cooh", base: "naoh", salt: "c6h5coona", enth: -54.8, net: "C6H5COOH(s) + OH- → C6H5COO- + H2O", desc: "White benzoic acid crystals dissolve into clear sodium benzoate solution." },
    { id: "neut-c6h5cooh-koh", name: "Neutralization of benzoic acid with potassium hydroxide", acid: "c6h5cooh", base: "koh", salt: "c6h5cook", enth: -55.0, net: "C6H5COOH(s) + OH- → C6H5COO- + H2O", desc: "Benzoic acid dissolves forming potassium benzoate." },
    { id: "neut-c7h6o3-naoh", name: "Neutralization of salicylic acid with sodium hydroxide", acid: "c7h6o3", base: "naoh", salt: "c7h5o3na", enth: -54.2, net: "C7H6O3(s) + OH- → C7H5O3- + H2O", desc: "Salicylic acid dissolves forming sodium salicylate." },
    { id: "neut-c3h6o3-naoh", name: "Neutralization of lactic acid with sodium hydroxide", acid: "c3h6o3", base: "naoh", salt: "c3h5o3na", enth: -55.1, net: "C3H6O3 + OH- → C3H5O3- + H2O", desc: "Lactic acid neutralizes to sodium lactate." },
    { id: "neut-c6h8o7-naoh", name: "Neutralization of citric acid with sodium hydroxide", acid: "c6h8o7", base: "naoh", salt: "c6h5o7na3", enth: -162.0, net: "C6H8O7 + 3OH- → C6H5O7(3-) + 3H2O", desc: "Triprotic neutralization forming trisodium citrate." },
    { id: "neut-c4h6o6-naoh", name: "Neutralization of tartaric acid with sodium hydroxide", acid: "c4h6o6", base: "naoh", salt: "c4h4o6na2", enth: -108.4, net: "C4H6O6 + 2OH- → C4H4O6(2-) + 2H2O", desc: "Diprotic neutralization forming sodium tartrate." },
    { id: "neut-c2h3clo2-naoh", name: "Neutralization of chloroacetic acid with sodium hydroxide", acid: "c2h3clo2", base: "naoh", salt: "c2h2clo2na", enth: -56.5, net: "C2H3ClO2 + OH- → C2H2ClO2- + H2O", desc: "Neutralization forming sodium chloroacetate." },
    { id: "neut-c2hf3o2-naoh", name: "Neutralization of trifluoroacetic acid with sodium hydroxide", acid: "c2hf3o2", base: "naoh", salt: "c2f3o2na", enth: -57.1, net: "CF3COOH + OH- → CF3COO- + H2O", desc: "Strong organofluorine acid neutralizes with rapid heat release." },

    { id: "neut-hcn-naoh", name: "Neutralization of hydrogen cyanide with sodium hydroxide", acid: "hcn", base: "naoh", salt: "nacn", enth: -43.5, net: "HCN + OH- → CN- + H2O", desc: "Cyanide neutralization forming sodium cyanide." },
    { id: "neut-hcn-koh", name: "Neutralization of hydrogen cyanide with potassium hydroxide", acid: "hcn", base: "koh", salt: "kcn", enth: -43.8, net: "HCN + OH- → CN- + H2O", desc: "Neutralization forming potassium cyanide." },
    { id: "neut-hscn-naoh", name: "Neutralization of thiocyanic acid with sodium hydroxide", acid: "hscn", base: "naoh", salt: "nascn", enth: -56.8, net: "HSCN + OH- → SCN- + H2O", desc: "Neutralization forming sodium thiocyanate." },

    { id: "neut-h2c2o4-naoh", name: "Neutralization of oxalic acid with sodium hydroxide", acid: "h2c2o4", base: "naoh", salt: "na2c2o4", enth: -110.2, net: "H2C2O4 + 2OH- → C2O4(2-) + 2H2O", desc: "Neutralization of oxalic acid producing sodium oxalate." },
    { id: "neut-h2c2o4-koh", name: "Neutralization of oxalic acid with potassium hydroxide", acid: "h2c2o4", base: "koh", salt: "k2c2o4", enth: -110.6, net: "H2C2O4 + 2OH- → C2O4(2-) + 2H2O", desc: "Neutralization yielding potassium oxalate." },

    { id: "neut-h3po4-baoh2", name: "Precipitative neutralization of phosphoric acid with barium hydroxide", acid: "h3po4", base: "ba-oh-2", salt: "ba3po42", enth: -326.5, net: "2H3PO4 + 3Ba(OH)2 → Ba3(PO4)2(s) + 6H2O", desc: "Dense white precipitate of barium phosphate forms." },
    { id: "neut-h3po4-mgoh2", name: "Precipitative neutralization of phosphoric acid with magnesium hydroxide", acid: "h3po4", base: "mgoh2", salt: "mg3-po4-2", enth: -302.0, net: "2H3PO4 + 3Mg(OH)2(s) → Mg3(PO4)2(s) + 6H2O", desc: "White insoluble magnesium phosphate forms." },
    { id: "neut-na2o-hcl", name: "Reaction of sodium oxide with hydrochloric acid", acid: "hcl", base: "na2o", salt: "nacl", enth: -256.0, net: "Na2O(s) + 2H+ → 2Na+ + H2O", desc: "Vigorous dissolution of sodium oxide powder forming sodium chloride." },
    { id: "neut-k2o-hcl", name: "Reaction of potassium oxide with hydrochloric acid", acid: "hcl", base: "k2o", salt: "kcl", enth: -260.0, net: "K2O(s) + 2H+ → 2K+ + H2O", desc: "Exothermic dissolution of potassium oxide yielding potassium chloride." },
    { id: "neut-li2o-hcl", name: "Reaction of lithium oxide with hydrochloric acid", acid: "hcl", base: "li2o", salt: "licl", enth: -245.0, net: "Li2O(s) + 2H+ → 2Li+ + H2O", desc: "Exothermic reaction producing lithium chloride." },
    { id: "neut-bao-hcl", name: "Reaction of barium oxide with hydrochloric acid", acid: "hcl", base: "bao", salt: "bacl2", enth: -215.0, net: "BaO(s) + 2H+ → Ba2+ + H2O", desc: "Dissolution of barium oxide yielding barium chloride." },
    { id: "neut-bao-hbr", name: "Reaction of barium oxide with hydrobromic acid", acid: "hbr", base: "bao", salt: "babr2", enth: -214.0, net: "BaO(s) + 2H+ → Ba2+ + H2O", desc: "Dissolution of barium oxide forming barium bromide." },
    { id: "neut-bao-hi", name: "Reaction of barium oxide with hydroiodic acid", acid: "hi", base: "bao", salt: "bai2", enth: -213.0, net: "BaO(s) + 2H+ → Ba2+ + H2O", desc: "Dissolution of barium oxide forming barium iodide." },
    { id: "neut-bao-hno3", name: "Reaction of barium oxide with nitric acid", acid: "hno3", base: "bao", salt: "bano32", enth: -214.5, net: "BaO(s) + 2H+ → Ba2+ + H2O", desc: "Dissolution yielding barium nitrate." },

    // --- Group 3: Insoluble Hydroxides & Basic Oxides with Strong Acids (40) ---
    { id: "neut-cuoh2-hcl", name: "Dissolution of copper(II) hydroxide in hydrochloric acid", acid: "hcl", base: "cuoh2", salt: "cucl2", enth: -98.5, net: "Cu(OH)2(s) + 2H+ → Cu2+ + 2H2O", desc: "Pale blue gelatinous solid dissolves into clear green-blue copper(II) chloride." },
    { id: "neut-cuoh2-h2so4", name: "Dissolution of copper(II) hydroxide in sulfuric acid", acid: "h2so4", base: "cuoh2", salt: "cuso4", enth: -100.2, net: "Cu(OH)2(s) + 2H+ → Cu2+ + 2H2O", desc: "Pale blue precipitate dissolves into azure-blue copper(II) sulfate." },
    { id: "neut-cuoh2-hno3", name: "Dissolution of copper(II) hydroxide in nitric acid", acid: "hno3", base: "cuoh2", salt: "cu-no3-2", enth: -99.4, net: "Cu(OH)2(s) + 2H+ → Cu2+ + 2H2O", desc: "Pale blue precipitate dissolves into bright blue copper(II) nitrate." },
    { id: "neut-cuoh2-hbr", name: "Dissolution of copper(II) hydroxide in hydrobromic acid", acid: "hbr", base: "cuoh2", salt: "cubr2", enth: -97.8, net: "Cu(OH)2(s) + 2H+ → Cu2+ + 2H2O", desc: "Pale blue precipitate dissolves into dark brownish-green copper(II) bromide." },

    { id: "neut-feoh2-hcl", name: "Dissolution of iron(II) hydroxide in hydrochloric acid", acid: "hcl", base: "feoh2", salt: "fecl2", enth: -102.0, net: "Fe(OH)2(s) + 2H+ → Fe2+ + 2H2O", desc: "Dirty green precipitate dissolves into pale green ferrous chloride." },
    { id: "neut-feoh2-h2so4", name: "Dissolution of iron(II) hydroxide in sulfuric acid", acid: "h2so4", base: "feoh2", salt: "feso4", enth: -103.5, net: "Fe(OH)2(s) + 2H+ → Fe2+ + 2H2O", desc: "Dirty green precipitate dissolves into pale green ferrous sulfate." },
    { id: "neut-feoh2-hno3", name: "Dissolution of iron(II) hydroxide in nitric acid", acid: "hno3", base: "feoh2", salt: "fe-no3-2", enth: -101.8, net: "Fe(OH)2(s) + 2H+ → Fe2+ + 2H2O", desc: "Green precipitate dissolves into ferrous nitrate." },

    { id: "neut-feoh3-hcl", name: "Dissolution of iron(III) hydroxide in hydrochloric acid", acid: "hcl", base: "feoh3", salt: "fecl3", enth: -145.0, net: "Fe(OH)3(s) + 3H+ → Fe3+ + 3H2O", desc: "Rust-red gelatinous precipitate dissolves into golden yellow-brown ferric chloride." },
    { id: "neut-feoh3-hno3", name: "Dissolution of iron(III) hydroxide in nitric acid", acid: "hno3", base: "feoh3", salt: "fe-no3-3", enth: -144.5, net: "Fe(OH)3(s) + 3H+ → Fe3+ + 3H2O", desc: "Rust-red precipitate dissolves into pale violet/tan ferric nitrate." },
    { id: "neut-feoh3-h2so4", name: "Dissolution of iron(III) hydroxide in sulfuric acid", acid: "h2so4", base: "feoh3", salt: "fe2-so4-3", enth: -288.0, net: "2Fe(OH)3(s) + 6H+ → 2Fe3+ + 6H2O", desc: "Rust-red precipitate dissolves into yellow ferric sulfate." },

    { id: "neut-znoh2-hcl", name: "Dissolution of zinc hydroxide in hydrochloric acid", acid: "hcl", base: "znoh2", salt: "zncl2", enth: -108.0, net: "Zn(OH)2(s) + 2H+ → Zn2+ + 2H2O", desc: "White gelatinous precipitate dissolves completely into colorless zinc chloride." },
    { id: "neut-znoh2-h2so4", name: "Dissolution of zinc hydroxide in sulfuric acid", acid: "h2so4", base: "znoh2", salt: "znso4", enth: -109.5, net: "Zn(OH)2(s) + 2H+ → Zn2+ + 2H2O", desc: "White precipitate dissolves into clear zinc sulfate." },
    { id: "neut-znoh2-hno3", name: "Dissolution of zinc hydroxide in nitric acid", acid: "hno3", base: "znoh2", salt: "zn-no3-2", enth: -107.8, net: "Zn(OH)2(s) + 2H+ → Zn2+ + 2H2O", desc: "White precipitate dissolves into clear zinc nitrate." },
    { id: "neut-znoh2-hbr", name: "Dissolution of zinc hydroxide in hydrobromic acid", acid: "hbr", base: "znoh2", salt: "znbr2", enth: -106.5, net: "Zn(OH)2(s) + 2H+ → Zn2+ + 2H2O", desc: "White precipitate dissolves into clear zinc bromide." },

    { id: "neut-aloh3-hcl", name: "Dissolution of aluminium hydroxide in hydrochloric acid", acid: "hcl", base: "al-oh-3", salt: "alcl3", enth: -152.0, net: "Al(OH)3(s) + 3H+ → Al3+ + 3H2O", desc: "White gelatinous precipitate dissolves cleanly into clear aluminium chloride." },
    { id: "neut-aloh3-h2so4", name: "Dissolution of aluminium hydroxide in sulfuric acid", acid: "h2so4", base: "al-oh-3", salt: "al2-so4-3", enth: -302.0, net: "2Al(OH)3(s) + 6H+ → 2Al3+ + 6H2O", desc: "White precipitate dissolves into aluminium sulfate." },
    { id: "neut-aloh3-hno3", name: "Dissolution of aluminium hydroxide in nitric acid", acid: "hno3", base: "al-oh-3", salt: "al-no3-3", enth: -151.2, net: "Al(OH)3(s) + 3H+ → Al3+ + 3H2O", desc: "White precipitate dissolves into aluminium nitrate." },

    { id: "neut-nioh2-hcl", name: "Dissolution of nickel(II) hydroxide in hydrochloric acid", acid: "hcl", base: "nioh2", salt: "nicl2", enth: -101.5, net: "Ni(OH)2(s) + 2H+ → Ni2+ + 2H2O", desc: "Apple-green precipitate dissolves into emerald-green nickel chloride." },
    { id: "neut-nioh2-h2so4", name: "Dissolution of nickel(II) hydroxide in sulfuric acid", acid: "h2so4", base: "nioh2", salt: "niso4", enth: -103.0, net: "Ni(OH)2(s) + 2H+ → Ni2+ + 2H2O", desc: "Apple-green precipitate dissolves into emerald-green nickel sulfate." },
    { id: "neut-nioh2-hno3", name: "Dissolution of nickel(II) hydroxide in nitric acid", acid: "hno3", base: "nioh2", salt: "ni-no3-2", enth: -101.2, net: "Ni(OH)2(s) + 2H+ → Ni2+ + 2H2O", desc: "Apple-green precipitate dissolves into green nickel nitrate." },

    { id: "neut-cooh2-hcl", name: "Dissolution of cobalt(II) hydroxide in hydrochloric acid", acid: "hcl", base: "cooh2", salt: "cocl2", enth: -100.8, net: "Co(OH)2(s) + 2H+ → Co2+ + 2H2O", desc: "Pink-blue precipitate dissolves into rose-red cobalt chloride." },
    { id: "neut-cooh2-h2so4", name: "Dissolution of cobalt(II) hydroxide in sulfuric acid", acid: "h2so4", base: "cooh2", salt: "coso4", enth: -102.2, net: "Co(OH)2(s) + 2H+ → Co2+ + 2H2O", desc: "Pink precipitate dissolves into rose-pink cobalt sulfate." },
    { id: "neut-cooh2-hno3", name: "Dissolution of cobalt(II) hydroxide in nitric acid", acid: "hno3", base: "cooh2", salt: "co-no3-2", enth: -100.5, net: "Co(OH)2(s) + 2H+ → Co2+ + 2H2O", desc: "Pink precipitate dissolves into red-magenta cobalt nitrate." },

    { id: "neut-mnoh2-hcl", name: "Dissolution of manganese(II) hydroxide in hydrochloric acid", acid: "hcl", base: "mnoh2", salt: "mncl2", enth: -103.2, net: "Mn(OH)2(s) + 2H+ → Mn2+ + 2H2O", desc: "Off-white precipitate dissolves into pale pink manganese chloride." },
    { id: "neut-mnoh2-h2so4", name: "Dissolution of manganese(II) hydroxide in sulfuric acid", acid: "h2so4", base: "mnoh2", salt: "mnso4", enth: -104.6, net: "Mn(OH)2(s) + 2H+ → Mn2+ + 2H2O", desc: "Off-white precipitate dissolves into pale pink manganese sulfate." },
    { id: "neut-mnoh2-hno3", name: "Dissolution of manganese(II) hydroxide in nitric acid", acid: "hno3", base: "mnoh2", salt: "mn-no3-2", enth: -102.8, net: "Mn(OH)2(s) + 2H+ → Mn2+ + 2H2O", desc: "Off-white precipitate dissolves into pink manganese nitrate." },

    { id: "neut-pboh2-hno3", name: "Dissolution of lead(II) hydroxide in nitric acid", acid: "hno3", base: "pb-oh-2", salt: "pbno32", enth: -96.5, net: "Pb(OH)2(s) + 2H+ → Pb2+ + 2H2O", desc: "White lead hydroxide dissolves cleanly into lead nitrate." },
    { id: "neut-bioh3-hno3", name: "Dissolution of bismuth(III) hydroxide in nitric acid", acid: "hno3", base: "bi-oh-3", salt: "bi-no3-3", enth: -140.0, net: "Bi(OH)3(s) + 3H+ → Bi3+ + 3H2O", desc: "White bismuth hydroxide dissolves into acidic bismuth nitrate." },

    { id: "neut-cao-hcl", name: "Reaction of calcium oxide with hydrochloric acid", acid: "hcl", base: "cao", salt: "cacl2", enth: -193.0, net: "CaO(s) + 2H+ → Ca2+ + H2O", desc: "Quicklime dissolves vigorously with significant heat release." },
    { id: "neut-cao-hno3", name: "Reaction of calcium oxide with nitric acid", acid: "hno3", base: "cao", salt: "ca-no3-2", enth: -192.5, net: "CaO(s) + 2H+ → Ca2+ + H2O", desc: "Vigorous dissolution of quicklime yielding calcium nitrate." },
    { id: "neut-cao-h2so4", name: "Reaction of calcium oxide with sulfuric acid", acid: "h2so4", base: "cao", salt: "caso4", enth: -205.0, net: "CaO(s) + 2H+ + SO4(2-) → CaSO4(s) + H2O", desc: "Exothermic reaction producing white calcium sulfate." },

    { id: "neut-mgo-hno3", name: "Reaction of magnesium oxide with nitric acid", acid: "hno3", base: "mgo", salt: "mg-no3-2", enth: -148.0, net: "MgO(s) + 2H+ → Mg2+ + H2O", desc: "Magnesia powder dissolves smoothly into clear magnesium nitrate." },
    { id: "neut-mgo-hbr", name: "Reaction of magnesium oxide with hydrobromic acid", acid: "hbr", base: "mgo", salt: "mgbr2", enth: -149.0, net: "MgO(s) + 2H+ → Mg2+ + H2O", desc: "Magnesia dissolves forming magnesium bromide." },
    { id: "neut-mgo-hi", name: "Reaction of magnesium oxide with hydroiodic acid", acid: "hi", base: "mgo", salt: "mgi2", enth: -148.5, net: "MgO(s) + 2H+ → Mg2+ + H2O", desc: "Magnesia dissolves forming magnesium iodide." },

    { id: "neut-zno-hcl", name: "Reaction of zinc oxide with hydrochloric acid", acid: "hcl", base: "zno", salt: "zncl2", enth: -89.4, net: "ZnO(s) + 2H+ → Zn2+ + H2O", desc: "White zinc oxide dissolves smoothly into colorless zinc chloride." },
    { id: "neut-zno-h2so4", name: "Reaction of zinc oxide with sulfuric acid", acid: "h2so4", base: "zno", salt: "znso4", enth: -91.0, net: "ZnO(s) + 2H+ → Zn2+ + H2O", desc: "White zinc oxide powder dissolves into clear zinc sulfate." },
    { id: "neut-zno-hno3", name: "Reaction of zinc oxide with nitric acid", acid: "hno3", base: "zno", salt: "zn-no3-2", enth: -89.0, net: "ZnO(s) + 2H+ → Zn2+ + H2O", desc: "Zinc oxide dissolves into clear zinc nitrate." },

    { id: "neut-nio-hcl", name: "Reaction of nickel(II) oxide with hydrochloric acid", acid: "hcl", base: "nio", salt: "nicl2", enth: -75.0, net: "NiO(s) + 2H+ → Ni2+ + H2O", desc: "Greenish-black nickel oxide dissolves forming bright green nickel chloride." },
    { id: "neut-nio-h2so4", name: "Reaction of nickel(II) oxide with sulfuric acid", acid: "h2so4", base: "nio", salt: "niso4", enth: -77.0, net: "NiO(s) + 2H+ → Ni2+ + H2O", desc: "Greenish oxide dissolves into emerald-green nickel sulfate." },
    { id: "neut-nio-hbr", name: "Reaction of nickel(II) oxide with hydrobromic acid", acid: "hbr", base: "nio", salt: "nibr2", enth: -74.2, net: "NiO(s) + 2H+ → Ni2+ + H2O", desc: "Nickel oxide dissolves forming nickel bromide." },
    { id: "neut-sro-hcl", name: "Reaction of strontium oxide with hydrochloric acid", acid: "hcl", base: "sro", salt: "srcl2", enth: -210.0, net: "SrO(s) + 2H+ → Sr2+ + H2O", desc: "Vigorous dissolution of strontium oxide yielding strontium chloride." },
    { id: "neut-sro-hno3", name: "Reaction of strontium oxide with nitric acid", acid: "hno3", base: "sro", salt: "sr-no3-2", enth: -208.0, net: "SrO(s) + 2H+ → Sr2+ + H2O", desc: "Dissolution of strontium oxide yielding strontium nitrate." },
  ];

  if (neutralizations.length !== 120) {
    throw new Error(`Expected 120 acid-base reactions, got ${neutralizations.length}`);
  }

  for (const n of neutralizations) {
    addReaction({
      id: n.id,
      name: n.name,
      reactionType: "acid_base_neutralization",
      reactants: [n.acid, n.base],
      products: [n.salt, { chemicalId: "water", isByproduct: true }],
      netIonicEquation: n.net,
      enthalpyKjPerMol: n.enth,
      temperatureMinC: 10,
      temperatureMaxC: 80,
      solvent: "water",
      observableEffects: [
        {
          type: "temperature_increase",
          description: n.desc,
        },
      ],
      safetyNotes: "Neutralization can be strongly exothermic; add reagents slowly and wear eye protection.",
    });
  }
}
