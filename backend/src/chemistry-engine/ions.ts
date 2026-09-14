import { parseFormula } from "./formulaParser.js";
import type { ElementComposition } from "./types.js";

/**
 * A named ion used for double-displacement / precipitation prediction.
 *
 * Which ions a given neutral compound dissociates into is genuine chemical
 * knowledge (NaOH dissociates into Na+ and OH-; glucose, despite having O
 * and H too, does not dissociate at all) -- it is not something this engine
 * derives from the bare formula. That is why `dissociation` is attached to
 * each ionic Chemical record in the seed data rather than guessed here.
 */
export interface IonSpec {
  /** The ion's formula without charge notation, e.g. "SO4", "Na", "OH". */
  formula: string;
  charge: number;
  composition: ElementComposition;
}

export function ion(formulaWithoutCharge: string, charge: number): IonSpec {
  const parsed = parseFormula(formulaWithoutCharge);
  return { formula: formulaWithoutCharge, charge, composition: parsed.composition };
}

function atomCount(composition: ElementComposition): number {
  return Object.values(composition).reduce((sum, n) => sum + n, 0);
}

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a === 0 ? 1 : a;
}

export interface ComposedCompound {
  formula: string;
  composition: ElementComposition;
  cationCount: number;
  anionCount: number;
}

/**
 * Combines a cation and an anion into the neutral compound they form,
 * using the standard "criss-cross" method: the magnitude of one ion's
 * charge becomes the subscript on the other, reduced to lowest terms.
 * Multi-atom ions are parenthesized when their subscript is greater than 1
 * (e.g. Ca(OH)2, (NH4)2SO4), matching standard formula-writing convention.
 */
export function composeNeutralFormula(cation: IonSpec, anion: IonSpec): ComposedCompound {
  if (cation.charge <= 0) {
    throw new Error(`composeNeutralFormula: cation "${cation.formula}" must have a positive charge.`);
  }
  if (anion.charge >= 0) {
    throw new Error(`composeNeutralFormula: anion "${anion.formula}" must have a negative charge.`);
  }
  const anionMagnitude = Math.abs(anion.charge);
  const divisor = gcd(cation.charge, anionMagnitude);
  const cationCount = anionMagnitude / divisor;
  const anionCount = cation.charge / divisor;

  const cationPart =
    cationCount === 1
      ? cation.formula
      : atomCount(cation.composition) > 1
        ? `(${cation.formula})${cationCount}`
        : `${cation.formula}${cationCount}`;
  const anionPart =
    anionCount === 1
      ? anion.formula
      : atomCount(anion.composition) > 1
        ? `(${anion.formula})${anionCount}`
        : `${anion.formula}${anionCount}`;

  const composition: ElementComposition = {};
  for (const [el, count] of Object.entries(cation.composition)) {
    composition[el] = (composition[el] ?? 0) + count * cationCount;
  }
  for (const [el, count] of Object.entries(anion.composition)) {
    composition[el] = (composition[el] ?? 0) + count * anionCount;
  }

  return { formula: `${cationPart}${anionPart}`, composition, cationCount, anionCount };
}
