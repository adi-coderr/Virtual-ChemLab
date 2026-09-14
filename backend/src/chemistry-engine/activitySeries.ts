/**
 * Standard metal activity (reactivity) series, most to least reactive.
 * "H" is included as a reference point: any metal ranked above hydrogen
 * will displace H2 from a dilute acid; metals below it will not.
 *
 * This is a well-established, textbook-standard ordering used to predict
 * single-displacement reactions (A + BC -> AC + B occurs only if A is more
 * reactive than B).
 */
const ACTIVITY_SERIES: string[] = [
  "K", "Ca", "Na", "Mg", "Al", "Zn", "Fe", "Ni", "Sn", "Pb", "H", "Cu", "Ag", "Au",
];

const RANK: Map<string, number> = new Map(ACTIVITY_SERIES.map((symbol, index) => [symbol, index]));

export function getActivityRank(symbol: string): number | undefined {
  return RANK.get(symbol);
}

/** True if `a` is more reactive than `b` (both must be in the known series). */
export function isMoreReactive(a: string, b: string): boolean | undefined {
  const rankA = RANK.get(a);
  const rankB = RANK.get(b);
  if (rankA === undefined || rankB === undefined) return undefined;
  return rankA < rankB;
}

export function canDisplaceHydrogenFromAcid(metalSymbol: string): boolean | undefined {
  return isMoreReactive(metalSymbol, "H");
}
