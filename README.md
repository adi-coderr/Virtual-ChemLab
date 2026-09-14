# Virtual Chemistry Laboratory

A virtual laboratory where you select real chemicals, combine them under
chosen conditions, and get back a **scientifically traceable** result: a
balanced equation, the actual products, their properties, observable effects,
safety information, and — critically — an honest confidence rating for how
that result was obtained.

This is a v0.1 foundation, not a finished encyclopedia of chemistry. It is
built so the chemistry domain (chemicals, reactions, rules) can grow without
rewriting the architecture. See [docs/ROADMAP.md](docs/ROADMAP.md) for
exactly what that means in practice.

## Why a confidence tier on every result

Mixing two chemicals doesn't always have one guaranteed answer. This app
never lets the AI layer invent chemistry. Every result is one of:

| Tier | Meaning |
|---|---|
| **SUPPORTED** | Matches a curated, experimentally-grounded reaction record. |
| **PREDICTED** | Derived from a deterministic rule (solubility table, activity series, acid-base pattern, combustion) applied via real linear-algebra equation balancing. |
| **APPROXIMATE** | Molecular identity is right, but something (usually equilibrium position) isn't modeled precisely. |
| **UNKNOWN** | No rule or curated data applies. The app says so and explains what's missing, rather than guessing. |

A confidently-determined **"no reaction happens"** (e.g. two soluble salts
that don't precipitate) is reported as such, distinct from "unknown" —
knowing nothing happens is a real result, not a failure to find one.

## Project layout

```
virtual-chem-lab/
├── backend/     Node.js + TypeScript API, chemistry engine, SQLite database
├── frontend/    React + TypeScript lab interface (2D/3D molecule viewers, etc.)
└── docs/        Architecture, database schema, API reference, extension guide
```

## Running it

Requires Node.js 18.18+ (developed against Node 22).

```bash
# Terminal 1 — backend (creates and seeds the SQLite database on first run)
cd backend
npm install
cp .env.example .env   # optional, defaults work out of the box
npm run dev             # http://localhost:4000

# Terminal 2 — frontend
cd frontend
npm install
npm run dev              # http://localhost:5173
```

Open http://localhost:5173. The frontend's dev server proxies `/api` to the
backend, so no extra configuration is needed for local development.

To reset the database to a clean, freshly-seeded state at any point:

```bash
cd backend && npm run db:reset
```

## Running the tests

```bash
cd backend && npm test      # 335+ tests: chemistry engine, data layer, API integration
cd frontend && npm test     # component tests
```

The backend test suite is the part worth actually reading if you want to
verify the chemistry: `backend/src/chemistry-engine/*.test.ts` checks the
equation balancer, stoichiometry, solubility rules, and reaction resolver
against known-correct chemistry (including the exact examples from the
original product brief), and `backend/src/data/seed/*.test.ts` cross-checks
every hand-entered chemical and reaction against the balancer itself rather
than trusting hand arithmetic.

## What's implemented vs. what's scaffolded for later

**Implemented and tested:**
- Formula parsing, a real equation balancer (exact-arithmetic linear algebra
  over the element-conservation matrix, not a lookup table), stoichiometry,
  limiting reagent / theoretical yield calculations
- Solubility-rule and activity-series based reaction prediction, with real
  ion-charge formula reconstruction (the "criss-cross" method)
- 38 curated chemicals and 9 curated reactions with real physical data,
  hazards, and (for a representative subset) hand-derived 2D/3D molecular
  geometry
- A normalized relational schema (13 tables) designed to scale past a
  hand-curated dataset
- A REST API with strong validation and an allowlisted action system
- A rule-based natural-language assistant that proposes — never executes —
  lab actions, with an optional real-Claude upgrade path
- A lab bench UI: search, equipment, drag/pour, 2D+3D molecule viewers,
  results panel, timeline, safety panel, and an assistant chat panel

**Deliberately not implemented yet** (see [docs/ROADMAP.md](docs/ROADMAP.md)):
- General oxidation-state assignment / full redox half-reaction balancing
  (only exact, unambiguous free-element ↔ monatomic-ion redox is modeled)
- Kinetics, equilibrium constants, and pH calculation
- User accounts, saved-experiment sharing, or a teacher dashboard
- End-to-end (browser) tests — unit and integration tests exist; e2e is a
  natural next addition once the app has a real deployment target

## License / data provenance

Chemical and reaction data is curated from standard general-chemistry
reference knowledge (textbook/handbook level). It is good enough for
education and for exercising the architecture, but production or clinical
use should cross-reference a live database such as PubChem. Every chemical
record's `provenance` field says so explicitly rather than implying more
certainty than it has.
