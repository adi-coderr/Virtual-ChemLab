/**
 * Oxidation-state tracking, deliberately narrow in scope.
 *
 * Assigning oxidation states for arbitrary compounds in general (covalent
 * molecules, polyatomic ions with internal charge distribution, etc.) is a
 * genuinely hard problem with many edge cases. Rather than build a general
 * solver that would silently be wrong on some inputs, this module only
 * asserts two facts that are *exactly* true, never approximated:
 *
 *   1. An element in its free (uncombined) elemental form has oxidation
 *      state 0 -- true by definition.
 *   2. An element as a monatomic ion has an oxidation state exactly equal
 *      to that ion's charge -- also true by definition.
 *
 * That is sufficient to correctly detect and explain redox electron
 * transfer for single-displacement reactions (a free metal becoming a
 * cation, and a cation becoming a free metal), which is the redox class
 * this engine currently supports. It intentionally does not attempt to
 * assign oxidation states inside covalent or polyatomic species (e.g. S in
 * sulfate) -- see docs/CHEMISTRY_ENGINE.md for what a v0.2 general solver
 * would need.
 */

export interface RedoxElectronTransfer {
  element: string;
  fromOxidationState: number;
  toOxidationState: number;
  direction: "oxidation" | "reduction";
  electronsPerAtom: number;
}

export function freeElementOxidationState(): 0 {
  return 0;
}

export function monatomicIonOxidationState(ionCharge: number): number {
  return ionCharge;
}

/**
 * Given that `element` goes from a free element (oxidation state 0) to a
 * monatomic ion of the given charge (or vice versa), returns the electron
 * transfer description. Returns null if the charge is 0 (no actual change).
 */
export function describeElementTransfer(
  element: string,
  freeElementIsReactant: boolean,
  monatomicIonCharge: number
): RedoxElectronTransfer | null {
  if (monatomicIonCharge === 0) return null;
  const from = freeElementIsReactant ? 0 : monatomicIonCharge;
  const to = freeElementIsReactant ? monatomicIonCharge : 0;
  return {
    element,
    fromOxidationState: from,
    toOxidationState: to,
    direction: to > from ? "oxidation" : "reduction",
    electronsPerAtom: Math.abs(to - from),
  };
}
