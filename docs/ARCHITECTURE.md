# Architecture

## Layering

The product brief's core scientific principle — **the AI layer must never be
the authoritative chemistry engine** — is enforced by keeping these concerns
in separate modules that only talk to each other through narrow interfaces:

```
┌─────────────────────────────────────────────────────────────────┐
│ Frontend (React)                                                 │
│  components/ -> state/experimentStore.ts -> api/*.ts             │
└───────────────────────────────┬───────────────────────────────────┘
                                 │ HTTP (JSON)
┌───────────────────────────────▼───────────────────────────────────┐
│ Backend                                                            │
│                                                                     │
│  routes/*  ─▶  validation/schemas.ts (Zod)                        │
│      │              (every request is validated before a          │
│      ▼               controller method ever runs)                 │
│  controllers/*  ─▶  services/*                                    │
│                        │                                           │
│         ┌──────────────┼───────────────────┐                       │
│         ▼              ▼                   ▼                       │
│  chemistry-engine/  data/repositories/   ai/ (NLU providers)       │
│  (pure functions,   (SQLite via                                    │
│   no I/O, no DB)     better-sqlite3)                               │
└─────────────────────────────────────────────────────────────────┘
```

**chemistry-engine/** has zero dependencies on Express, SQLite, or anything
else I/O-related. Every function takes plain data in and returns plain data
out (see `reactionResolver.ts`'s `ChemicalLookupPort` interface — the
resolver doesn't know or care that the real implementation is backed by
SQLite; the resolver tests inject an in-memory fake). This is what makes it
possible to unit-test the actual chemistry (balancing, stoichiometry,
solubility) in complete isolation, and it's what section 34/38 of the
product brief mean by "deterministic, testable service."

**ai/** (the NLU layer) is even more tightly boxed in: its only output type
is `ParsedIntent` (`ProposedOperation | ProposedQuery | UnrecognizedIntent`
in `ai/nluProvider.ts`). A `ProposedOperation` is inert data — an
`{actionType, chemicalQuery, amount, unit}` object — until
`services/assistantService.ts` resolves the chemical name against the real
database and the frontend calls the *exact same* `POST
/experiments/:id/actions` endpoint (validated by the *exact same*
`experimentActionSchema` discriminated union) that a manually-clicked UI
button would call. There is no code path where an AI-produced string
reaches the database or the chemistry engine directly.

## Why two independent projects, not a monorepo package

`backend/` and `frontend/` are separate npm projects with their own
`package.json`, each `npm install`-able and runnable on its own. A few
types (chemical/reaction shapes) are intentionally duplicated between
`backend/src/chemistry-engine/types.ts` and `frontend/src/types/chemistry.ts`
rather than extracted into a shared workspace package. For a v0.1 this
keeps the two halves simple to run independently; the natural next step if
the API surface grows is a shared `packages/api-types` workspace (npm
workspaces or a small OpenAPI-generated client) — see
[ROADMAP.md](ROADMAP.md).

## Request lifecycle for `POST /api/reactions/simulate`

This is the pipeline described in product brief section 6, as actually
implemented:

1. **Zod validation** (`validation/schemas.ts`) — rejects malformed
   quantities, units, or shapes before any business logic runs.
2. **`ReactionController.simulate`** — thin, no logic beyond calling the
   service and shaping the HTTP response.
3. **`SimulationService.simulate`** —
   a. Resolves every reactant id against `ChemicalRepository`; unknown ids
      short-circuit with a 400 (`UNKNOWN_CHEMICAL`).
   b. Calls `resolveReaction` (the chemistry engine), which:
      - Looks for a curated reaction matching the exact reactant set,
        filtered by condition compatibility (`reactionResolver.ts`).
      - If none, tries rule-based pathways in order of specificity: acid +
        carbonate/bicarbonate (gas evolution) → acid + base (neutralization)
        → metal + acid → metal + salt (activity series) → two salts
        (solubility-rule precipitation) → fuel + O2 (combustion).
      - Returns a `ReactionResolution` with a status
        (`REACTION`/`NO_REACTION`/`UNSUPPORTED`), confidence tier, balanced
        equation, products, observable effects, and a human-readable
        `explanation` that always names which rule or curated record was
        used (`ruleApplied`).
   c. If a reaction occurred, calls `computeStoichiometry` with the user's
      actual input quantities to get moles, limiting reagent, and
      theoretical yield.
4. Response is a plain JSON envelope; no reaction ever silently fails —
   `UNSUPPORTED` is a normal, well-formed response, not an error.

## Data flow for the AI assistant

```
user text ─▶ NluProvider.parse() ─▶ ParsedIntent[]
                                        │
                          ┌─────────────┴─────────────┐
                          ▼                             ▼
                  ProposedOperation              ProposedQuery
                          │                             │
        AssistantService resolves the           AssistantService reads
        chemical name against the real          the experiment's last
        ChemicalRepository (fuzzy search)        RUN_REACTION result and
                          │                       answers from that stored
                          ▼                       data only (never invents
        Frontend shows "Confirm" button           chemistry to answer)
                          │
                          ▼
        POST /experiments/:id/actions (same
        endpoint + same schema as any manual
        UI action)
```

## Adding a capability without touching unrelated code

- **A new chemical**: add one entry to `backend/src/data/seed/chemicals.ts`
  (see [ADDING_NEW_REACTIONS.md](ADDING_NEW_REACTIONS.md)). No code changes.
- **A new curated reaction**: add one entry to
  `backend/src/data/seed/reactions.ts`. No code changes.
- **A new general rule** (e.g. sulfite/sulfide + acid → SO2/H2S, structurally
  identical to the existing carbonate rule): add one `try*` function to
  `reactionResolver.ts` and one line in the `attempts` array. Existing rules
  are untouched.
- **A new equipment type**: add one entry to `EQUIPMENT_CATALOG` in
  `frontend/src/components/equipment/EquipmentPanel.tsx`.
- **A new frontend results tab**: add one entry to the `tabs` array in
  `ReactionResultPanel.tsx`.

## Versioning

The engine reports `engineVersion: "0.1.0"` from `GET /api/health`. Bumping
this is a deliberate signal that the supported-reaction-class surface has
changed (see product brief section 28) — v0.1 supports acid-base,
precipitation, single displacement, combustion, and carbonate/bicarbonate
gas evolution; a v0.2 that adds equilibrium or electrochemistry should bump
this and update the frontend's displayed capability list.
