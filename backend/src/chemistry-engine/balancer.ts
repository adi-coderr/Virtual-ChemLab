import { Fraction, gcdOfBigInts, lcmBig } from "./fraction.js";
import type { ElementComposition } from "./types.js";
import { ChemistryEngineError } from "./types.js";
import { toFormulaSegments } from "./formulaParser.js";

export interface BalancerSpecies {
  /** Any stable identifier for the species (chemical id or formula), used only for labeling/errors. */
  label: string;
  formula: string;
  composition: ElementComposition;
  charge: number;
}

export interface BalanceResult {
  reactantCoefficients: number[];
  productCoefficients: number[];
  balancedEquationText: string;
  /** True if charge was included as a conserved quantity (net-ionic-style balancing). */
  chargeBalanced: boolean;
  warnings: string[];
}

const CHARGE_KEY = "__charge__";

function collectElements(all: BalancerSpecies[]): string[] {
  const set = new Set<string>();
  for (const sp of all) {
    for (const [el, count] of Object.entries(sp.composition)) {
      if (count !== 0) set.add(el);
    }
  }
  return Array.from(set).sort();
}

/**
 * Verifies every element present in the reactants is also present in the
 * products and vice versa. This is checked *before* running linear algebra
 * so a mismatched equation produces a specific, actionable error ("chlorine
 * appears in the reactants but not the products") instead of an opaque
 * "no solution" from the solver.
 */
function checkElementCoverage(reactants: BalancerSpecies[], products: BalancerSpecies[]): void {
  const reactantElements = collectElements(reactants);
  const productElements = collectElements(products);
  const reactantSet = new Set(reactantElements);
  const productSet = new Set(productElements);

  const onlyInReactants = reactantElements.filter((e) => !productSet.has(e));
  const onlyInProducts = productElements.filter((e) => !reactantSet.has(e));

  if (onlyInReactants.length > 0 || onlyInProducts.length > 0) {
    const parts: string[] = [];
    if (onlyInReactants.length > 0) {
      parts.push(`present only in reactants: ${onlyInReactants.join(", ")}`);
    }
    if (onlyInProducts.length > 0) {
      parts.push(`present only in products: ${onlyInProducts.join(", ")}`);
    }
    throw new ChemistryEngineError(
      `This equation cannot be balanced: some elements are not conserved (${parts.join("; ")}). ` +
        `Every element must appear on both sides of a real chemical equation.`,
      "ELEMENT_NOT_CONSERVED",
      { onlyInReactants, onlyInProducts }
    );
  }
}

/** Row-reduces a rational matrix in place (Gauss-Jordan) and returns a basis for its null space. */
function nullSpaceBasis(matrixIn: Fraction[][], numCols: number): Fraction[][] {
  const rows = matrixIn.length;
  const m = matrixIn.map((row) => row.slice());
  const pivotColOfRow: number[] = [];
  let pivotRowCursor = 0;

  // Every row of `m` is constructed by the caller with exactly `numCols`
  // entries, so any index `< numCols` (columns) or `< rows` (rows) is always
  // in bounds; the non-null assertions below encode that invariant for
  // TypeScript's noUncheckedIndexedAccess, which can't see it across the
  // module boundary.
  for (let col = 0; col < numCols && pivotRowCursor < rows; col++) {
    let pivotRow = -1;
    for (let r = pivotRowCursor; r < rows; r++) {
      if (!m[r]![col]!.isZero()) {
        pivotRow = r;
        break;
      }
    }
    if (pivotRow === -1) continue;

    const tmp = m[pivotRowCursor]!;
    m[pivotRowCursor] = m[pivotRow]!;
    m[pivotRow] = tmp;

    const pivotVal = m[pivotRowCursor]![col]!;
    m[pivotRowCursor] = m[pivotRowCursor]!.map((v) => v.div(pivotVal));

    for (let r = 0; r < rows; r++) {
      if (r === pivotRowCursor) continue;
      const factor = m[r]![col]!;
      if (!factor.isZero()) {
        const pivotRowValues = m[pivotRowCursor]!;
        m[r] = m[r]!.map((v, idx) => v.sub(factor.mul(pivotRowValues[idx]!)));
      }
    }

    pivotColOfRow[pivotRowCursor] = col;
    pivotRowCursor += 1;
  }

  const rank = pivotRowCursor;
  const pivotCols = new Set(pivotColOfRow.slice(0, rank));
  const freeCols: number[] = [];
  for (let c = 0; c < numCols; c++) {
    if (!pivotCols.has(c)) freeCols.push(c);
  }

  return freeCols.map((freeCol) => {
    const vec: Fraction[] = new Array(numCols).fill(Fraction.zero());
    vec[freeCol] = Fraction.one();
    for (let r = 0; r < rank; r++) {
      const pivotCol = pivotColOfRow[r]!;
      vec[pivotCol] = m[r]![freeCol]!.neg();
    }
    return vec;
  });
}

function fractionsToMinimalPositiveIntegers(fractions: Fraction[], context: string): number[] {
  const nonZero = fractions.filter((f) => !f.isZero());
  if (nonZero.length === 0) {
    throw new ChemistryEngineError(
      `Balancing produced an all-zero solution for ${context}; the given species do not form a valid reaction.`,
      "DEGENERATE_BALANCE"
    );
  }

  const allNonNegative = fractions.every((f) => !f.isNegative());
  const allNonPositive = fractions.every((f) => f.num <= 0n);
  if (!allNonNegative && !allNonPositive) {
    throw new ChemistryEngineError(
      `Balancing ${context} produced coefficients with inconsistent signs, which means the given ` +
        `reactants/products do not correspond to a physically valid single reaction.`,
      "INCONSISTENT_BALANCE_SIGN"
    );
  }
  const normalized = allNonPositive ? fractions.map((f) => f.neg()) : fractions;

  if (normalized.some((f) => f.isZero())) {
    throw new ChemistryEngineError(
      `Balancing ${context} assigned a zero coefficient to one of the given species, meaning it is not ` +
        `actually part of this reaction as specified.`,
      "ZERO_COEFFICIENT"
    );
  }

  const denominators = normalized.map((f) => f.den);
  let lcm = 1n;
  for (const d of denominators) lcm = lcmBig(lcm, d);

  const scaled = normalized.map((f) => (f.num * lcm) / f.den);
  const gcd = gcdOfBigInts(scaled);
  const minimal = scaled.map((v) => v / gcd);

  return minimal.map((v) => {
    if (v <= 0n || v > 100000n) {
      throw new ChemistryEngineError(
        `Balancing ${context} produced an implausible coefficient (${v.toString()}); refusing to report it.`,
        "IMPLAUSIBLE_COEFFICIENT"
      );
    }
    return Number(v);
  });
}

function formatSpeciesWithCoefficient(coefficient: number, formula: string): string {
  const segments = toFormulaSegments(formula);
  const formulaText = segments.map((s) => s.text).join("");
  return coefficient === 1 ? formulaText : `${coefficient} ${formulaText}`;
}

/**
 * Balances a chemical equation by solving the element-conservation linear
 * system exactly (see fraction.ts). Optionally also conserves net charge,
 * which is what makes this usable for net ionic equations.
 */
export function balanceEquation(reactants: BalancerSpecies[], products: BalancerSpecies[]): BalanceResult {
  if (reactants.length === 0 || products.length === 0) {
    throw new ChemistryEngineError("Cannot balance an equation with no reactants or no products.", "EMPTY_EQUATION");
  }

  checkElementCoverage(reactants, products);

  const elements = collectElements([...reactants, ...products]);
  const anyCharged = [...reactants, ...products].some((s) => s.charge !== 0);
  const rows = anyCharged ? [...elements, CHARGE_KEY] : elements;

  const allSpecies = [...reactants, ...products];
  const matrix: Fraction[][] = rows.map((rowKey) =>
    allSpecies.map((sp, idx) => {
      const isProduct = idx >= reactants.length;
      const magnitude = rowKey === CHARGE_KEY ? sp.charge : sp.composition[rowKey] ?? 0;
      const signed = isProduct ? -magnitude : magnitude;
      return Fraction.fromInt(signed);
    })
  );

  const basis = nullSpaceBasis(matrix, allSpecies.length);
  const warnings: string[] = [];

  if (basis.length === 0) {
    throw new ChemistryEngineError(
      "This system of reactants and products has no valid balancing solution (over-constrained). " +
        "Double-check that the listed products are actually reachable from the listed reactants.",
      "NO_BALANCE_SOLUTION"
    );
  }
  if (basis.length > 1) {
    warnings.push(
      `This reactant/product set is under-constrained (${basis.length} independent balances exist); ` +
        `showing one valid integer solution. This can happen with some redox equations that need additional ` +
        `half-reaction information to pin down a unique balance.`
    );
  }

  const solution = basis[0] as Fraction[];
  const allCoefficients = fractionsToMinimalPositiveIntegers(solution, "the equation");

  const reactantCoefficients = allCoefficients.slice(0, reactants.length);
  const productCoefficients = allCoefficients.slice(reactants.length);

  const lhs = reactants
    .map((r, i) => formatSpeciesWithCoefficient(reactantCoefficients[i] as number, r.formula))
    .join(" + ");
  const rhs = products
    .map((p, i) => formatSpeciesWithCoefficient(productCoefficients[i] as number, p.formula))
    .join(" + ");

  return {
    reactantCoefficients,
    productCoefficients,
    balancedEquationText: `${lhs} \u2192 ${rhs}`,
    chargeBalanced: anyCharged,
    warnings,
  };
}
