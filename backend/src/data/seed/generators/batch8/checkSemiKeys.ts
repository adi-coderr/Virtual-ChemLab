import { getExistingKeys } from "./inspectCollisions.js";
import { DOMAIN_38_REACTIONS } from "./domain38TotalSynthesisNamedRxns.js";
import { DOMAIN_39_REACTIONS } from "./domain39AgrochemPesticidesFertilizers.js";
import { DOMAIN_40_REACTIONS } from "./domain40AstrochemPlanetaryGeochem.js";
import { DOMAIN_41_REACTIONS } from "./domain41ClinicalDiagnosticsBiosensors.js";

const existing = getExistingKeys();
for (const r of DOMAIN_38_REACTIONS) existing.add([...r.reactants].sort().join("+"));
for (const r of DOMAIN_39_REACTIONS) existing.add([...r.reactants].sort().join("+"));
for (const r of DOMAIN_40_REACTIONS) existing.add([...r.reactants].sort().join("+"));
for (const r of DOMAIN_41_REACTIONS) existing.add([...r.reactants].sort().join("+"));

console.log("Total existing keys across Batches 1-7 and Domains 38-41:", existing.size);

const testKeys = [
  "sih4",
  "si2h6",
  "si3h8",
  "sih2cl2",
  "h2+sihcl3",
  "h2+sicl4",
  "sicl4+zn",
  "geh4",
  "ge2h6",
  "geh4+sih4",
  "o2+sih4",
  "n2o+sih4",
  "n2o+sih2cl2",
  "teos",
  "o3+teos",
  "ammonia+sih2cl2",
  "ammonia+sih4",
  "n2+sih4",
  "ch4+sih4",
  "ch3sicl3"
];

for (const k of testKeys) {
  console.log(k, "=>", existing.has(k) ? "COLLISION" : "AVAILABLE");
}
