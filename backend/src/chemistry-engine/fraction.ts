/**
 * Minimal exact-rational-number type.
 *
 * Balancing a chemical equation is solving a homogeneous linear system.
 * Doing that with floating point numbers is a classic source of subtly
 * wrong coefficients (e.g. 0.9999999998 instead of 1). We use BigInt-backed
 * fractions instead so every intermediate step is exact, and only convert
 * to integers at the very end.
 */

function absBig(a: bigint): bigint {
  return a < 0n ? -a : a;
}

function gcdBig(a: bigint, b: bigint): bigint {
  a = absBig(a);
  b = absBig(b);
  while (b !== 0n) {
    [a, b] = [b, a % b];
  }
  return a === 0n ? 1n : a;
}

export class Fraction {
  readonly num: bigint;
  readonly den: bigint;

  constructor(num: bigint | number, den: bigint | number = 1n) {
    let n = typeof num === "number" ? BigInt(Math.round(num)) : num;
    let d = typeof den === "number" ? BigInt(Math.round(den)) : den;
    if (d === 0n) {
      throw new Error("Fraction: division by zero denominator");
    }
    if (d < 0n) {
      n = -n;
      d = -d;
    }
    const g = gcdBig(n, d);
    this.num = n / g;
    this.den = d / g;
  }

  static zero(): Fraction {
    return new Fraction(0n, 1n);
  }

  static one(): Fraction {
    return new Fraction(1n, 1n);
  }

  static fromInt(n: number | bigint): Fraction {
    return new Fraction(typeof n === "number" ? BigInt(n) : n, 1n);
  }

  add(other: Fraction): Fraction {
    return new Fraction(this.num * other.den + other.num * this.den, this.den * other.den);
  }

  sub(other: Fraction): Fraction {
    return new Fraction(this.num * other.den - other.num * this.den, this.den * other.den);
  }

  mul(other: Fraction): Fraction {
    return new Fraction(this.num * other.num, this.den * other.den);
  }

  div(other: Fraction): Fraction {
    if (other.num === 0n) throw new Error("Fraction: division by zero");
    return new Fraction(this.num * other.den, this.den * other.num);
  }

  neg(): Fraction {
    return new Fraction(-this.num, this.den);
  }

  isZero(): boolean {
    return this.num === 0n;
  }

  isNegative(): boolean {
    return this.num < 0n;
  }

  equals(other: Fraction): boolean {
    return this.num === other.num && this.den === other.den;
  }

  compare(other: Fraction): number {
    const l = this.num * other.den;
    const r = other.num * this.den;
    if (l < r) return -1;
    if (l > r) return 1;
    return 0;
  }

  /** Returns the fraction as a plain number (only safe for display/rounding, never for further exact math). */
  toNumber(): number {
    return Number(this.num) / Number(this.den);
  }

  toString(): string {
    return this.den === 1n ? this.num.toString() : `${this.num}/${this.den}`;
  }
}

export function gcdOfBigInts(values: bigint[]): bigint {
  return values.reduce((acc, v) => gcdBig(acc, v), 0n);
}

export function lcmBig(a: bigint, b: bigint): bigint {
  if (a === 0n || b === 0n) return 0n;
  return absBig((a / gcdBig(a, b)) * b);
}
