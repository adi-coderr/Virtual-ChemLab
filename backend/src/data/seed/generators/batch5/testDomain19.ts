import { SEED_CHEMICALS } from "../../chemicals.js";
import { SEED_REACTIONS } from "../../reactions.js";
import { RAW_BATCH_5_CHEMICALS } from "./chemicalDefinitionsBatch5.js";
import { REACTIONS_BATCH_5 } from "../../reactionsBatch5.js";

const allChems = new Set([...SEED_CHEMICALS.map(c => c.id), ...RAW_BATCH_5_CHEMICALS.map(c => c.id)]);
const allReactantKeys = new Set([...SEED_REACTIONS, ...REACTIONS_BATCH_5].map(r => r.reactants.map(x => x.chemicalId).sort().join("+")));

console.log("Total chemicals:", allChems.size);
console.log("Total existing reaction keys:", allReactantKeys.size);
