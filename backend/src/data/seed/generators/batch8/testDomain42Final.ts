import * as fs from "fs";
import * as path from "path";
import { parseFormula } from "../../../../chemistry-engine/formulaParser.js";
import { balanceEquation, type BalancerSpecies } from "../../../../chemistry-engine/balancer.js";
import { SEED_CHEMICALS } from "../../chemicals.js";
import { CHEMICALS_BATCH_5 } from "../../chemicalsBatch5.js";
import { CHEMICALS_BATCH_6 } from "../../chemicalsBatch6.js";
import { CHEMICALS_BATCH_7 } from "../../chemicalsBatch7.js";
import { RAW_BATCH_8_CHEMICALS } from "./chemicalDefinitionsBatch8.js";
import { getExistingKeys } from "./inspectCollisions.js";
import { DOMAIN_38_REACTIONS } from "./domain38TotalSynthesisNamedRxns.js";
import { DOMAIN_39_REACTIONS } from "./domain39AgrochemPesticidesFertilizers.js";
import { DOMAIN_40_REACTIONS } from "./domain40AstrochemPlanetaryGeochem.js";
import { DOMAIN_41_REACTIONS } from "./domain41ClinicalDiagnosticsBiosensors.js";

const all = new Map<string, any>();
for (const c of SEED_CHEMICALS) if (c && c.id) all.set(c.id, c);
for (const c of CHEMICALS_BATCH_5) if (c && c.id) all.set(c.id, c);
for (const c of CHEMICALS_BATCH_6) if (c && c.id) all.set(c.id, c);
for (const c of CHEMICALS_BATCH_7) if (c && c.id) all.set(c.id, c);
for (const c of RAW_BATCH_8_CHEMICALS) if (c && c.id) all.set(c.id, c);

const existingKeys = getExistingKeys();
for (const r of DOMAIN_38_REACTIONS) existingKeys.add([...r.reactants].sort().join("+"));
for (const r of DOMAIN_39_REACTIONS) existingKeys.add([...r.reactants].sort().join("+"));
for (const r of DOMAIN_40_REACTIONS) existingKeys.add([...r.reactants].sort().join("+"));
for (const r of DOMAIN_41_REACTIONS) existingKeys.add([...r.reactants].sort().join("+"));

console.log("Total existing keys across Batches 1-7 and Domains 38-41:", existingKeys.size);

// Test the full 100 reactions for Domain 42!
const testReactions = [
  // 001 - 020: Silicon, Polysilicon, Epitaxy & LPCVD
  { id: "semi-001", r: ["si2h6"], p: ["si", "h2"] },
  { id: "semi-002", r: ["si3h8"], p: ["si", "h2"] },
  { id: "semi-003", r: ["sih2cl2", "o2"], p: ["sio2", "hcl"] },
  { id: "semi-004", r: ["sicl4", "zn"], p: ["si", "zncl2"] },
  { id: "semi-005", r: ["sicl4", "ca"], p: ["si", "cacl2"] },
  { id: "semi-006", r: ["sihcl3", "zn"], p: ["si", "zncl2", "h2"] },
  { id: "semi-007", r: ["ge2h6"], p: ["ge", "h2"] },
  { id: "semi-008", r: ["ge2h6", "n2o"], p: ["geo2", "n2", "water"] },
  { id: "semi-009", r: ["ph3", "naocl"], p: ["h3po4", "nacl"] },
  { id: "semi-010", r: ["b2h6", "naocl"], p: ["h3bo3", "nacl"] },
  { id: "semi-011", r: ["sih4", "n2"], p: ["si3n4", "h2"] },
  { id: "semi-012", r: ["teos", "o3"], p: ["sio2", "ch3cho", "water"] },
  { id: "semi-013", r: ["ch3sicl3"], p: ["sic", "hcl"] },
  { id: "semi-014", r: ["sicl4", "ammonia"], p: ["si3n4", "hcl"] },
  { id: "semi-015", r: ["si2h6", "n2o"], p: ["sio2", "n2", "water"] },
  { id: "semi-016", r: ["sibr4", "h2"], p: ["si", "hbr"] },
  { id: "semi-017", r: ["geh4", "o3"], p: ["geo2", "water"] },
  { id: "semi-018", r: ["ge2h6", "o2"], p: ["geo2", "water"] },
  { id: "semi-019", r: ["sih4", "c2h4"], p: ["sic", "ch4", "h2"] },
  { id: "semi-020", r: ["sif4", "h2"], p: ["si", "hf"] },

  // 021 - 040: High-k, Dielectric ALD & Metals
  { id: "semi-021", r: ["hfcl4", "water"], p: ["hfo2", "hcl"] },
  { id: "semi-022", r: ["zrcl4", "o3"], p: ["zro2", "cl2", "o2"] },
  { id: "semi-023", r: ["ticl4", "o3"], p: ["tio2", "cl2", "o2"] },
  { id: "semi-024", r: ["ttip"], p: ["tio2", "c3h6", "water"] },
  { id: "semi-025", r: ["al-ch3-3"], p: ["al", "c2h6"] },
  { id: "semi-026", r: ["al-ch3-3", "o3"], p: ["al2o3", "co2", "water"] },
  { id: "semi-027", r: ["tacl5", "water"], p: ["ta2o5", "hcl"] },
  { id: "semi-028", r: ["ticl4", "n2", "h2"], p: ["tin", "hcl"] },
  { id: "semi-029", r: ["tacl5", "ammonia"], p: ["tan", "n2", "hcl"] },
  { id: "semi-030", r: ["wf6", "si2h6"], p: ["w", "sif4", "h2"] },
  { id: "semi-031", r: ["wf6", "zn"], p: ["w", "znf2"] },
  { id: "semi-032", r: ["wf6", "si3h8"], p: ["wsi2", "sif4", "hf"] },
  { id: "semi-033", r: ["co2-co-8"], p: ["cobalt-metal", "co"] },
  { id: "semi-034", r: ["cucl", "zn"], p: ["cu", "zncl2"] },
  { id: "semi-035", r: ["bcl3", "ammonia"], p: ["bn", "hcl"] },
  { id: "semi-036", r: ["al-ch3-3", "ammonia"], p: ["aln", "ch4"] },
  { id: "semi-037", r: ["gacl3", "ammonia"], p: ["gan", "hcl"] },
  { id: "semi-038", r: ["incl3", "ph3"], p: ["inp", "hcl"] },
  { id: "semi-039", r: ["gacl3", "ash3"], p: ["gaas", "hcl"] },
  { id: "semi-040", r: ["mocl5", "h2"], p: ["mo", "hcl"] },

  // 041 - 060: Wet Chemical Etch & Surface Cleaning
  { id: "semi-041", r: ["h2so4", "h2o2"], p: ["h2so5", "water"] },
  { id: "semi-042", r: ["c", "h2so5"], p: ["co2", "h2so4"] },
  { id: "semi-043", r: ["sio2", "nh4f"], p: ["nh42sif6", "ammonia", "water"] },
  { id: "semi-044", r: ["sio2", "hf", "nh4f"], p: ["nh42sif6", "water"] },
  { id: "semi-045", r: ["nh4f", "hf"], p: ["nh4hf2"] },
  { id: "semi-046", r: ["sio2", "nh4hf2"], p: ["nh42sif6", "nh4f", "water"] },
  { id: "semi-047", r: ["si3n4", "h3po4", "water"], p: ["sio2", "monoammonium_phosphate"] },
  { id: "semi-048", r: ["si", "csoh", "water"], p: ["cs2sio3", "h2"] },
  { id: "semi-049", r: ["si", "tmah", "water"], p: ["tmah_silicate", "h2"] },
  { id: "semi-050", r: ["si", "hno3"], p: ["sio2", "no2", "water"] },
  { id: "semi-051", r: ["ti", "h2so4", "h2o2"], p: ["tiso4", "water"] },
  { id: "semi-052", r: ["al", "hno3"], p: ["al-no3-3", "no2", "water"] },
  { id: "semi-053", r: ["w", "h2o2"], p: ["wo3", "water"] },
  { id: "semi-054", r: ["wo3", "koh"], p: ["k2wo4", "water"] },
  { id: "semi-055", r: ["cu", "h2o2"], p: ["cuo", "water"] },
  { id: "semi-056", r: ["cuo", "glycine"], p: ["c4h8cun2o4", "water"] },
  { id: "semi-057", r: ["ch3oh", "h2o2"], p: ["co2", "water"] },
  { id: "semi-058", r: ["fe", "h2o2", "hcl"], p: ["fecl3", "water"] },
  { id: "semi-059", r: ["sio2", "hf", "c2h5oh"], p: ["sif4", "water", "c2h5oh"] },
  { id: "semi-060", r: ["si", "hf", "h2o2"], p: ["h2sif6", "water"] },

  // 061 - 080: Dry Plasma & RIE
  { id: "semi-061", r: ["ti", "xef2"], p: ["tif4", "xe"] },
  { id: "semi-062", r: ["si", "cl2", "bcl3"], p: ["sicl4", "bcl3"] },
  { id: "semi-063", r: ["si", "br2"], p: ["sibr4"] },
  { id: "semi-064", r: ["sio2", "cf4"], p: ["sif4", "co2"] },
  { id: "semi-065", r: ["sio2", "chf3"], p: ["sif4", "co", "water"] },
  { id: "semi-066", r: ["si3n4", "sf6"], p: ["sif4", "sf4", "n2"] },
  { id: "semi-067", r: ["w", "sf6"], p: ["wf6", "s"] },
  { id: "semi-068", r: ["w", "xef2"], p: ["wf6", "xe"] },
  { id: "semi-069", r: ["tin", "bcl3", "cl2"], p: ["ticl4", "bn"] },
  { id: "semi-070", r: ["ti", "bcl3"], p: ["ticl4", "b"] },
  { id: "semi-071", r: ["al2o3", "bcl3"], p: ["alcl3", "b2o3"] },
  { id: "semi-072", r: ["al", "bcl3", "cl2"], p: ["alcl3", "bcl3"] },
  { id: "semi-073", r: ["c4f8"], p: ["cf4", "c"] },
  { id: "semi-074", r: ["c", "o3"], p: ["co2"] },
  { id: "semi-075", r: ["gaas", "cl2"], p: ["gacl3", "as"] },
  { id: "semi-076", r: ["inp", "cl2"], p: ["incl3", "pcl3"] },
  { id: "semi-077", r: ["mo", "cf4", "o2"], p: ["mof6", "co2"] },
  { id: "semi-078", r: ["ta", "sf6"], p: ["taf5", "s"] },
  { id: "semi-079", r: ["si", "hbr", "o2"], p: ["sibr4", "sio2", "water"] },
  { id: "semi-080", r: ["sicl4", "ch4"], p: ["sic", "hcl"] },

  // 081 - 100: Oxidation, Doping, Silicidation & Packaging
  { id: "semi-081", r: ["si", "n2o"], p: ["sio2", "n2"] },
  { id: "semi-082", r: ["si", "o2", "hcl"], p: ["sio2", "cl2", "water"] },
  { id: "semi-083", r: ["si", "o3"], p: ["sio2", "o2"] },
  { id: "semi-084", r: ["bbr3", "o2"], p: ["b2o3", "br2"] },
  { id: "semi-085", r: ["b2o3", "si"], p: ["b", "sio2"] },
  { id: "semi-086", r: ["pocl3", "cao"], p: ["ca3po42", "cacl2"] },
  { id: "semi-087", r: ["p4o10", "si"], p: ["p", "sio2"] },
  { id: "semi-088", r: ["as2o3", "si"], p: ["as", "sio2"] },
  { id: "semi-089", r: ["sb2o3", "si"], p: ["sb", "sio2"] },
  { id: "semi-090", r: ["ti", "si"], p: ["tisi2"] },
  { id: "semi-091", r: ["cobalt-metal", "si"], p: ["cosi"] },
  { id: "semi-092", r: ["cosi", "si"], p: ["cosi2"] },
  { id: "semi-093", r: ["ni", "si"], p: ["nisi"] },
  { id: "semi-094", r: ["pt", "si"], p: ["pt2si"] },
  { id: "semi-095", r: ["pt2si", "si"], p: ["ptsi"] },
  { id: "semi-096", r: ["au", "al"], p: ["au2al"] },
  { id: "semi-097", r: ["au2al", "al"], p: ["aual2"] },
  { id: "semi-098", r: ["cuo", "ammonia"], p: ["cu", "n2", "water"] },
  { id: "semi-099", r: ["sno2", "ammonia"], p: ["sn", "n2", "water"] },
  { id: "semi-100", r: ["fe", "si"], p: ["fesi2"] }
];

let issues = 0;
const localSeen = new Set<string>();

testReactions.forEach(({ id, r, p }) => {
  const rKey = [...r].sort().join("+");
  if (existingKeys.has(rKey)) {
    console.error(`❌ [${id}] COLLISION: ${rKey}`);
    issues++;
  }
  if (localSeen.has(rKey)) {
    console.error(`❌ [${id}] LOCAL DUP: ${rKey}`);
    issues++;
  }
  localSeen.add(rKey);

  const missing = [...r, ...p].filter(cid => !all.has(cid));
  if (missing.length > 0) {
    console.error(`❌ [${id}] MISSING: ${missing.join(", ")}`);
    issues++;
    return;
  }

  try {
    const rs = r.map(cid => ({ label: cid, formula: all.get(cid).formula, composition: parseFormula(all.get(cid).formula).composition, charge: 0 }));
    const ps = p.map(cid => ({ label: cid, formula: all.get(cid).formula, composition: parseFormula(all.get(cid).formula).composition, charge: 0 }));
    const res = balanceEquation(rs, ps);
    if (!res.balancedEquationText) {
      console.error(`❌ [${id}] BALANCE FAIL: no text`);
      issues++;
    } else {
      console.log(`✓ [${id}] ${res.balancedEquationText}`);
    }
  } catch (err: any) {
    console.error(`❌ [${id}] BALANCE ERR: ${err.message}`);
    issues++;
  }
});

console.log(`Audited all ${testReactions.length} reactions for Domain 42. Total issues: ${issues}`);
if (issues === 0) {
  console.log("🌟 DOMAIN 42 CANDIDATES ARE 100% PERFECT!");
}
