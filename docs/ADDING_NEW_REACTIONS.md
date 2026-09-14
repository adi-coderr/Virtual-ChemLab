# Adding a New Chemical or Reaction

This is the concrete walkthrough the rest of the docs point to. All of it
happens in `backend/src/data/seed/`; you should not need to touch
`chemistry-engine/` or any controller/route/service code for either task.

## Adding a chemical

Open `backend/src/data/seed/chemicals.ts` and add an entry to the
`SEED_CHEMICALS` array:

```ts
{
  id: "khco3",                          // lowercase, unique, used everywhere as the FK
  commonName: "Potassium bicarbonate",
  formula: "KHCO3",
  casNumber: "298-14-6",
  physicalState: "solid",
  density: 2.17,
  chemicalClass: "salt",
  substanceColor: "#FFFFFF",
  dissociation: { cation: { formula: "K", charge: 1 }, anion: { formula: "HCO3", charge: -1 } },
  source: "General chemistry reference knowledge...",
},
```

Required fields: `id`, `commonName`, `formula`, `physicalState`,
`chemicalClass`, `source`. Everything else is optional but strongly
encouraged where you actually know it — the point of the `provenance`/
`source`/`notes` fields is that *unknown stays visibly unknown* rather than
silently defaulting.

**If every element in the formula is already in
`chemistry-engine/elementData.ts`**, you're done — molar mass is computed
automatically at seed time, not hand-entered. If you use a new element,
add it to `ELEMENT_LIST` in `elementData.ts` first (symbol, name, atomic
number, atomic mass, CPK color, covalent radius) — `elementData.test.ts`... 
actually there's no dedicated test file for that data, but `molarMass.ts`
will throw a clear, loud error (`No curated data for element "X"`) the
moment anything tries to use an uncurated element, rather than silently
computing a wrong mass.

**If this compound needs to participate in the precipitation, acid-base, or
displacement rules**, set `dissociation` (what cation/anion it splits into)
and, if it's an acid/base, `isAcid`/`isBase`/`acidBaseStrength` and (for
genuine hydroxide bases only) `neutralizationProducesWater: true`. See the
comment on `neutralizationProducesWater` in `chemistry-engine/types.ts` for
why this is a separate explicit flag rather than inferred from the anion
(ammonia is the cautionary example — inferring "hydroxide base" from having
an OH⁻ in its dissociation data would incorrectly add a water byproduct to
its neutralization reactions).

**If you want a 2D/3D molecular structure**, add atom coordinates (both
`x2d,y2d` and `x3d,y3d,z3d`) and bonds referencing atom array indices. This
is genuinely hand-authored geometry (real bond lengths/angles, not
auto-generated) — see the worked examples in `chemicals.ts` (`WATER_STRUCTURE`,
`NH3_STRUCTURE`, etc.) and reuse the `sulfateFragmentWithCation` /
`nitrateFragmentWithCation` / `ionPairStructure` helpers for ionic salts. If
you skip this, the frontend shows an honest "no curated structure yet"
message instead of guessing a layout — that's intentional, not a bug to fix
by adding a fake auto-layout.

**Always run the validation tests after adding a chemical:**
```bash
cd backend && npx vitest run src/data/seed/chemicals.test.ts
```
This cross-checks your formula, structure, and dissociation data against
each other (composition consistency, formal charges summing to the correct
net charge, dissociation ions recombining to the stated formula) — it has
caught real data-entry mistakes during this project's own development
(see git history / the balancer's `ions.ts` tests) and it will catch yours
too.

## Adding a curated reaction

Open `backend/src/data/seed/reactions.ts` and add an entry to
`SEED_REACTIONS`:

```ts
{
  id: "khco3-hcl-gas-evolution",
  name: "Reaction of potassium bicarbonate with hydrochloric acid",
  reactionType: "gas_evolution",
  reactants: [{ chemicalId: "khco3", coefficient: 1 }, { chemicalId: "hcl", coefficient: 1 }],
  products: [
    { chemicalId: "kcl", coefficient: 1 },
    { chemicalId: "water", coefficient: 1, isByproduct: true },
    { chemicalId: "co2", coefficient: 1, isByproduct: true },
  ],
  equationDisplay: "KHCO3 + HCl → KCl + H2O + CO2",
  confidenceScore: 0.98,
  energyClassification: "endothermic",
  experimentalStatus: "experimentally_verified",
  observableEffects: [{ type: "gas_evolution", description: "..." }],
  source: "...",
},
```

You do **not** need to hand-verify the coefficients are balanced — the
validation test does it for you by feeding your reactants/products into the
same `balanceEquation` function the resolver uses, and checking your stored
coefficients are a consistent integer multiple of the minimal solution:

```bash
cd backend && npx vitest run src/data/seed/reactions.test.ts
```

If your coefficients are wrong, this test fails with a specific message
telling you the balancer's actual answer.

## Adding a new general rule (not curated, applies broadly)

If you want a new rule like "acid + sulfite → salt + water + SO2"
(structurally identical to the existing carbonate/bicarbonate rule, just a
different anion and gas), add a new `try*` function to
`chemistry-engine/reactionResolver.ts` following the pattern of
`tryGasEvolution`, and add it to the `attempts` array in `resolveReaction`.
Existing rules are untouched — each is independent and returns `null` when
its precondition doesn't match, so ordering only matters for which rule
"wins" when more than one could apply (more specific rules should generally
come first).

Write a unit test in `reactionResolver.test.ts` using the existing
in-memory fake `ChemicalLookupPort` pattern — you don't need the real
database to test resolver logic in isolation.

## After any of the above

```bash
cd backend
npm test          # full suite
npm run typecheck
npm run build     # verify it actually compiles
```

The database is reseeded automatically from `chemicals.ts`/`reactions.ts`
on next server start if the `chemicals` table is empty; to force a full
reseed during development, run `npm run db:reset`.
