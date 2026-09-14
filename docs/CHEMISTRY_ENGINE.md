# Chemistry Engine

Location: `backend/src/chemistry-engine/`. Framework-agnostic — no Express,
no SQLite, no I/O. Every module is independently unit-tested; run
`cd backend && npm test -- chemistry-engine` to see all of them.

## Formula parsing (`formulaParser.ts`)

Recursive-descent parser: elements, nested parentheses with multipliers
(`Al2(SO4)3`), and trailing charge notation (`Na+`, `SO4^2-`).

**Known limitation, by design:** a bare digit immediately before a trailing
`+`/`-` is only treated as the charge when the preceding formula is a single
element with no subscript of its own (e.g. `Fe3+`, `O2-` are unambiguous).
For a polyatomic base, a bare trailing digit is genuinely ambiguous —
`N3-` could mean azide (N3, charge 1-) or nitride (N, charge 3-) — so the
parser requires a caret (`N3^-` or `N^3-`) instead of guessing. This traded
a small amount of typing convenience for never silently mis-assigning a
formula's composition; see `formulaParser.test.ts` for the exact case that
motivated this.

**Not supported:** hydrate dot-notation (`CuSO4·5H2O`) — use the anhydrous
formula and note hydration in the chemical's `notes` field instead.

## Equation balancing (`balancer.ts`, `fraction.ts`)

This does **not** use stored coefficients. It builds the element-conservation
matrix (rows = elements ∪ {charge, if any species is ionic}, columns =
species, entries = signed atom counts) and solves for its null space via
Gauss-Jordan elimination — using exact BigInt-backed fractions
(`fraction.ts`), never floating point, so there's no risk of a coefficient
coming out as `2.9999999998`. The null-space vector is then scaled to the
smallest positive integers (LCM of denominators, then divide by GCD).

Before running the solver, `checkElementCoverage` verifies every element
appears on both sides — an element only present in reactants or only in
products gets a specific error naming which element and which side, rather
than an opaque "no solution."

This same balancer is used identically whether the equation came from a
curated reaction, a rule-based prediction, or the standalone `POST
/api/reactions/balance` endpoint — there is exactly one place balancing
logic lives.

## Stoichiometry (`stoichiometry.ts`, `units.ts`)

Converts mass/moles/volume+concentration to moles, finds the limiting
reagent (smallest `moles ÷ coefficient` ratio), and computes theoretical
yield. Deliberately does **not** convert a bare gas volume to moles via the
ideal gas law — see the comment in `units.ts` for why (it's easy to imply
more precision than temperature/pressure inputs actually support). Provide
mass or moles directly for gases, or convert yourself for your specific
conditions.

## Reaction prediction rules (`reactionResolver.ts`)

Each rule is a `try*` function with a narrow, explicit precondition. If the
precondition isn't met, it returns `null` and the resolver falls through to
the next rule — nothing ever guesses.

| Rule | Precondition | Confidence tier |
|---|---|---|
| Curated lookup | Reactant chemical-id set matches a seeded reaction | `SUPPORTED` |
| Gas evolution | One reactant `isAcid`, the other has `dissociation.anion` of `CO3`/`HCO3` | `PREDICTED` |
| Acid-base | One reactant `isAcid`, one `isBase`, both `strong` | `PREDICTED` |
| Acid-base (weak) | Same, but at least one is `weak` | `APPROXIMATE` (equilibrium not modeled) |
| Metal + acid | One reactant elemental + in the activity series, other `isAcid` | `PREDICTED` (or `NO_REACTION`/`PREDICTED` if below H) |
| Single displacement | One reactant elemental metal, other has a metal `dissociation.cation` | `PREDICTED` (or `NO_REACTION`/`PREDICTED` if less reactive) |
| Precipitation | Both reactants have `dissociation` (recognized simple salts), neither elemental/acid/base | `PREDICTED` (`NO_REACTION` if both possible products are soluble) |
| Combustion | One reactant is `o2`, other contains only C/H/O with both C and H present | `PREDICTED` |
| *(none matched)* | — | `UNKNOWN` / `UNSUPPORTED` |

### Ion chemistry (`ions.ts`, `solubility.ts`, `activitySeries.ts`)

- **`composeNeutralFormula`** implements the standard "criss-cross" method:
  a cation and anion combine with subscripts equal to the other ion's charge
  magnitude, reduced to lowest terms (so `Ca2+` + `CO3^2-` → `CaCO3`, not
  `Ca2(CO3)2`), with parentheses added only around genuinely multi-atom ions
  when their count exceeds 1 (`Ca(OH)2`, `(NH4)2SO4`).
- **`predictSolubility`** encodes the standard textbook solubility rules
  (Group 1/ammonium always soluble; nitrates/acetates always soluble;
  halides soluble except Ag+/Pb2+/Hg2(2+); sulfates soluble except
  Ba2+/Sr2+/Pb2+ insoluble and Ca2+/Ag+ slightly soluble; hydroxides
  insoluble except Group 1/Ba2+/Sr2+; carbonates/phosphates/sulfites/
  chromates insoluble except Group 1/ammonium; sulfides insoluble except
  Group 1/ammonium). Returns `null` — not a guess — when an anion isn't in
  this table.
- **`activitySeries.ts`** is the standard K > Ca > Na > Mg > Al > Zn > Fe >
  Ni > Sn > Pb > (H) > Cu > Ag > Au ordering.

**Where this data comes from:** which ions a compound dissociates into is
curated on each `Chemical` record's `dissociation` field (see
`data/seed/chemicals.ts`) — it is domain knowledge attached to the record,
not derived from the bare formula (you cannot tell from `NaOH` alone, in
general, that it fully dissociates while a similar-looking covalent
compound would not).

## Redox / oxidation states (`oxidationState.ts`)

Deliberately narrow. General oxidation-state assignment for arbitrary
compounds (covalent bonds, polyatomic ions with internally-distributed
charge) is a genuinely hard problem with many edge cases — building a
general solver that's sometimes silently wrong would be worse than not
having one. This module only asserts two facts that are *exactly* true by
definition: a free element has oxidation state 0, and a monatomic ion's
oxidation state equals its charge. That's sufficient to correctly detect
and explain electron transfer for single-displacement reactions (a metal
going from free element to cation, or vice versa) — the reaction class this
engine actually supports.

**What a v0.2 general solver would need:** recognizing known polyatomic ions
as charge-conserving units (so e.g. S in SO4²⁻ can be solved as "+6 given O
is -2 and the ion's own charge is -2"), then falling back to per-element
electronegativity-based rules, then flagging any remaining truly ambiguous
compound rather than guessing. This is real, scoped-out future work, not an
oversight.

## Classification (`classifier.ts`)

Small structural helpers (`isFreeElement`, `soleElementOf`) plus
human-readable labels for each `ReactionType`. Each resolver rule already
knows its own type by construction (the acid-base rule *is* the code that
detects acid-base reactions), so this module doesn't attempt a generic
"classify these arbitrary reactants" function — that would just be a worse
reimplementation of the rules that already exist.
