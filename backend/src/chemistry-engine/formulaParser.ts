import { ChemistryEngineError } from "./types.js";
import type { ElementComposition, ParsedFormula } from "./types.js";
import { ELEMENT_SYMBOLS } from "./elementData.js";

/**
 * Parses a chemical formula string into an element composition and net charge.
 *
 * Supported grammar (informally):
 *   formula      := group+ chargeSuffix?
 *   group        := element count? | '(' group+ ')' count? | '[' group+ ']' count?
 *   element      := UppercaseLetter LowercaseLetter*
 *   count        := digit+
 *   chargeSuffix := '^'? digit* ('+' | '-')   -- anchored to the end of the string
 *
 * Known, explicit limitations (see docs/CHEMISTRY_ENGINE.md):
 *   - Hydrate dot-notation (e.g. "CuSO4·5H2O") is not parsed; use the
 *     anhydrous formula and note hydration in `notes` instead.
 *   - Isotope notation is not supported.
 */

interface ParseState {
  input: string;
  pos: number;
}

function isUpper(ch: string): boolean {
  return ch >= "A" && ch <= "Z";
}
function isLower(ch: string): boolean {
  return ch >= "a" && ch <= "z";
}
function isDigit(ch: string): boolean {
  return ch >= "0" && ch <= "9";
}

function peek(state: ParseState): string | undefined {
  return state.input[state.pos];
}

function readCount(state: ParseState): number {
  let digits = "";
  while (state.pos < state.input.length && isDigit(state.input[state.pos] as string)) {
    digits += state.input[state.pos];
    state.pos += 1;
  }
  return digits.length > 0 ? parseInt(digits, 10) : 1;
}

function readElementSymbol(state: ParseState): string {
  const start = state.pos;
  let symbol = state.input[state.pos] as string;
  state.pos += 1;
  // Greedily try two-letter symbol first (e.g. "Na"), fall back to one letter (e.g. "N")
  // if the two-letter combination is not a real element (so "NO3" parses as N + O3, not "No" + "3").
  if (state.pos < state.input.length && isLower(state.input[state.pos] as string)) {
    const twoLetter = symbol + state.input[state.pos];
    if (ELEMENT_SYMBOLS.has(twoLetter)) {
      symbol = twoLetter;
      state.pos += 1;
    }
  }
  if (!ELEMENT_SYMBOLS.has(symbol)) {
    throw new ChemistryEngineError(
      `Unrecognized element symbol "${symbol}" at position ${start} in formula "${state.input}"`,
      "INVALID_FORMULA",
      { formula: state.input, position: start }
    );
  }
  return symbol;
}

function mergeInto(target: ElementComposition, source: ElementComposition, multiplier: number): void {
  for (const [el, count] of Object.entries(source)) {
    target[el] = (target[el] ?? 0) + count * multiplier;
  }
}

function parseGroup(state: ParseState): ElementComposition {
  const composition: ElementComposition = {};

  while (state.pos < state.input.length) {
    const ch = peek(state);
    if (ch === undefined) break;

    if (ch === ")" || ch === "]") {
      break;
    }

    if (ch === "(" || ch === "[") {
      const closing = ch === "(" ? ")" : "]";
      state.pos += 1; // consume opening bracket
      const inner = parseGroup(state);
      if (peek(state) !== closing) {
        throw new ChemistryEngineError(
          `Mismatched brackets in formula "${state.input}" (expected "${closing}")`,
          "INVALID_FORMULA",
          { formula: state.input }
        );
      }
      state.pos += 1; // consume closing bracket
      const count = readCount(state);
      mergeInto(composition, inner, count);
      continue;
    }

    if (isUpper(ch)) {
      const symbol = readElementSymbol(state);
      const count = readCount(state);
      mergeInto(composition, { [symbol]: count }, 1);
      continue;
    }

    throw new ChemistryEngineError(
      `Unexpected character "${ch}" at position ${state.pos} in formula "${state.input}"`,
      "INVALID_FORMULA",
      { formula: state.input, position: state.pos }
    );
  }

  return composition;
}

const BARE_ELEMENT_PATTERN = /^[A-Z][a-z]?$/;

/**
 * Strips a trailing charge notation from a formula, e.g. "Na+" -> Na, +1;
 * "SO4^2-" -> SO4, -2.
 *
 * This is deliberately conservative about a genuine notational ambiguity:
 * a bare digit immediately before a trailing sign (no caret) is only
 * unambiguous when the remaining base is a single element symbol with no
 * subscript of its own (a monatomic ion like "Fe3+" or "O2-") - there, the
 * digit can only be the charge. For a polyatomic base ("CO3", "SO4", ...),
 * a trailing bare digit could belong to the subscript *or* the charge
 * ("N3-" could mean azide N3^- or nitride N^3-), so we require the "^"
 * separator instead of silently guessing. This trades a small amount of
 * notational convenience for never mis-assigning a formula's composition.
 */
function extractCharge(formula: string): { base: string; charge: number } {
  const caretMatch = formula.match(/\^(\d*)([+-])$/);
  if (caretMatch) {
    const magnitude = caretMatch[1] ? parseInt(caretMatch[1], 10) : 1;
    const sign = caretMatch[2] === "+" ? 1 : -1;
    const base = formula.slice(0, formula.length - caretMatch[0].length);
    return { base, charge: magnitude * sign };
  }

  const bareMatch = formula.match(/(\d?)([+-])$/);
  if (!bareMatch) {
    return { base: formula, charge: 0 };
  }
  const [wholeMatch, digitsGroup, signGroup] = bareMatch;
  const digits = digitsGroup ?? "";
  const signChar = signGroup as "+" | "-"; // group 2 has no "?" on itself, so it always participates when bareMatch is non-null
  const sign = signChar === "+" ? 1 : -1;
  const base = formula.slice(0, formula.length - (wholeMatch as string).length);

  if (digits.length === 0) {
    // No digit at all before the sign, e.g. "Cl-", "NO3-", "OH-": unambiguous, magnitude 1.
    return { base, charge: sign };
  }

  if (BARE_ELEMENT_PATTERN.test(base)) {
    // Monatomic ion, e.g. "Fe3+", "Cu2+", "O2-": the digit can only be the charge.
    return { base, charge: parseInt(digits, 10) * sign };
  }

  throw new ChemistryEngineError(
    `Ambiguous charge notation in "${formula}": it is unclear whether the trailing digit belongs to the ` +
      `element subscript or the charge magnitude. Use "^" to disambiguate, e.g. "${base}${digits}^${signChar}" ` +
      `if the digit is a subscript, or "${base}^${digits}${signChar}" if it is the charge.`,
    "AMBIGUOUS_CHARGE_NOTATION",
    { formula }
  );
}

export function parseFormula(rawFormula: string): ParsedFormula {
  const trimmed = rawFormula.trim();
  if (trimmed.length === 0) {
    throw new ChemistryEngineError("Cannot parse an empty formula", "INVALID_FORMULA", { formula: rawFormula });
  }

  const { base, charge } = extractCharge(trimmed);
  if (base.length === 0) {
    throw new ChemistryEngineError(
      `Formula "${rawFormula}" contains only a charge, no element composition`,
      "INVALID_FORMULA",
      { formula: rawFormula }
    );
  }

  const state: ParseState = { input: base, pos: 0 };
  const composition = parseGroup(state);
  if (state.pos !== state.input.length) {
    throw new ChemistryEngineError(
      `Unexpected trailing characters in formula "${rawFormula}" at position ${state.pos}`,
      "INVALID_FORMULA",
      { formula: rawFormula, position: state.pos }
    );
  }
  if (Object.keys(composition).length === 0) {
    throw new ChemistryEngineError(`Formula "${rawFormula}" contains no elements`, "INVALID_FORMULA", {
      formula: rawFormula,
    });
  }

  return { raw: rawFormula, composition, charge };
}

/** Splits a formula into text/subscript segments for display (e.g. rendering "Fe2O3" with a subscript "2" and "3"). */
export function toFormulaSegments(formula: string): { text: string; subscript: boolean }[] {
  const segments: { text: string; subscript: boolean }[] = [];
  let buffer = "";
  let bufferIsDigit = false;

  for (const ch of formula) {
    const chIsDigit = isDigit(ch);
    if (buffer.length > 0 && chIsDigit !== bufferIsDigit) {
      segments.push({ text: buffer, subscript: bufferIsDigit });
      buffer = "";
    }
    buffer += ch;
    bufferIsDigit = chIsDigit;
  }
  if (buffer.length > 0) {
    segments.push({ text: buffer, subscript: bufferIsDigit });
  }
  return segments;
}

export function compositionsEqual(a: ElementComposition, b: ElementComposition): boolean {
  const keysA = Object.keys(a).filter((k) => a[k] !== 0);
  const keysB = Object.keys(b).filter((k) => b[k] !== 0);
  if (keysA.length !== keysB.length) return false;
  return keysA.every((k) => a[k] === b[k]);
}
