import type { ElementComposition } from "./types.js";
import { requireElementInfo } from "./elementData.js";

/**
 * Computes molar mass (g/mol) from an element composition.
 * Throws if any element in the composition has no curated atomic-mass data,
 * rather than silently skipping it (a silently-wrong molar mass is worse
 * than a loud error here).
 */
export function computeMolarMass(composition: ElementComposition): number {
  let total = 0;
  for (const [symbol, count] of Object.entries(composition)) {
    const info = requireElementInfo(symbol);
    total += info.atomicMass * count;
  }
  // Round to 3 decimal places for display sanity; internal stoichiometry
  // math is done with the full-precision figure via a fresh computation,
  // not by re-parsing this rounded output.
  return Math.round(total * 1000) / 1000;
}
