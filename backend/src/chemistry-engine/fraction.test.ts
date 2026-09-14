import { describe, it, expect } from "vitest";
import { Fraction, lcmBig, gcdOfBigInts } from "./fraction.js";

describe("Fraction", () => {
  it("reduces to lowest terms on construction", () => {
    const f = new Fraction(4n, 8n);
    expect(f.num).toBe(1n);
    expect(f.den).toBe(2n);
  });

  it("normalizes sign to the numerator", () => {
    const f = new Fraction(3n, -4n);
    expect(f.num).toBe(-3n);
    expect(f.den).toBe(4n);
  });

  it("adds fractions exactly", () => {
    const a = new Fraction(1n, 3n);
    const b = new Fraction(1n, 6n);
    const sum = a.add(b);
    expect(sum.num).toBe(1n);
    expect(sum.den).toBe(2n);
  });

  it("multiplies and divides exactly", () => {
    const a = new Fraction(2n, 3n);
    const b = new Fraction(3n, 4n);
    expect(a.mul(b).equals(new Fraction(1n, 2n))).toBe(true);
    expect(a.div(b).equals(new Fraction(8n, 9n))).toBe(true);
  });

  it("throws on zero denominator", () => {
    expect(() => new Fraction(1n, 0n)).toThrow();
  });

  it("compares fractions with different denominators correctly", () => {
    expect(new Fraction(2n, 3n).compare(new Fraction(3n, 5n))).toBeGreaterThan(0);
    expect(new Fraction(1n, 2n).compare(new Fraction(2n, 4n))).toBe(0);
  });

  it("never drifts across a long chain of operations (unlike floats)", () => {
    let acc = Fraction.zero();
    for (let i = 0; i < 20; i++) {
      acc = acc.add(new Fraction(1n, 3n));
    }
    // 20/3 exactly, not 6.666666666666667
    expect(acc.num).toBe(20n);
    expect(acc.den).toBe(3n);
  });
});

describe("lcmBig / gcdOfBigInts", () => {
  it("computes lcm correctly", () => {
    expect(lcmBig(4n, 6n)).toBe(12n);
    expect(lcmBig(3n, 7n)).toBe(21n);
  });

  it("computes gcd of a list", () => {
    expect(gcdOfBigInts([12n, 18n, 24n])).toBe(6n);
  });
});
