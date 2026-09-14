# Database Schema

SQLite via `better-sqlite3`, chosen for zero-setup local development while
still being real SQL (not a JSON blob) — every relationship below is a
proper foreign key, not a nested document. Migrations are plain `.sql`
files in `backend/src/data/migrations/`, applied in filename order and
tracked in a `_migrations` bookkeeping table (`backend/src/data/db.ts`), so
adding schema changes later is `002_whatever.sql`, not a rewrite.

Swapping SQLite for Postgres later is a matter of changing `data/db.ts` and
the repository classes' query syntax (mostly compatible SQL already) — the
service/controller layers above never touch SQL directly.

## Entity-relationship overview

```
elements ──────────────┬───────────────────────┐
  (periodic table       │                        │
   reference data)       │ element_symbol (FK)    │ element_symbol (FK)
                        ▼                        ▼
                 chemical_elements        molecule_atoms
                 (composition)            (2D/3D coordinates)
                        ▲                        ▲
                        │ chemical_id (FK)        │ chemical_id (FK)
                        │                        │
chemicals ◀─────────────┴────────────────────────┘
  │   ▲
  │   │ chemical_id (FK)
  │   ├── chemical_aliases       (search synonyms)
  │   ├── chemical_hazards ──▶ hazards (GHS-style reference table)
  │   └── molecule_bonds         (bond order/type, references atom_index)
  │
  │ chemical_id (FK, from reaction tables below)
  ▼
reactions
  ├── reaction_reactants   (chemical_id, coefficient)
  ├── reaction_products    (chemical_id, coefficient, is_byproduct)
  └── reaction_observable_effects (effect_type, description, related_chemical_id)

experiments
  └── experiment_actions   (sequence, action_type, payload_json, result_json)
```

## Why some things are columns, not separate tables

The product brief's example entity list includes `ReactionCondition` as its
own table. In this schema, a curated reaction's conditions
(`temperature_min_c`, `temperature_max_c`, `solvent`, `catalyst_chemical_id`)
are columns directly on `reactions`, because **each row already represents
one condition-bound outcome** — that's what "these conditions produce this
result" means. Condition-dependent branching (the same reactants giving
different products at different temperatures) is modeled by seeding
*multiple reaction rows with the same reactant set* rather than a many-to-
many join table; `ReactionRepository.findByReactantSet` returns all matches,
and `reactionResolver.ts` filters by condition compatibility, reporting an
explicit "multiple possible outcomes" result if more than one still matches
(see `resolveReaction`'s handling of `compatible.length > 1`). The seed data
doesn't currently include a deliberately branching example, but the
mechanism is implemented and tested (`reactionResolver.test.ts`, the
"ambiguous" fixture reactions) — if you add one, no schema change is needed.

Similarly, an ionic compound's dissociation (`Dissociation` in the domain
types) is stored as four columns directly on `chemicals`
(`dissociation_cation_formula`, `dissociation_cation_charge`,
`dissociation_anion_formula`, `dissociation_anion_charge`) rather than a
separate `ions` table with a many-to-many join, because in this dataset
every ionic compound dissociates into exactly one cation type and one anion
type. A genuine `ions` table (useful once you have compounds sharing ion
identities that you want to query independently, e.g. "all compounds
containing sulfate") is a natural, non-breaking v0.2 migration.

## Full table list

| Table | Purpose |
|---|---|
| `elements` | Periodic table reference data (mass, CPK color, covalent radius) |
| `chemicals` | One row per chemical: identity, physical properties, acid/base data, provenance |
| `chemical_aliases` | Search synonyms ("table salt" → `nacl`) |
| `chemical_elements` | Element composition (normalized, not re-parsed from the formula string at query time) |
| `chemical_hazards` | Many-to-many: chemicals ↔ hazard codes |
| `hazards` | GHS-style hazard reference data |
| `molecule_atoms` | 2D/3D atom coordinates for the molecule viewers |
| `molecule_bonds` | Bond order/type between atom indices |
| `reactions` | One row per curated reaction outcome |
| `reaction_reactants` / `reaction_products` | Balanced-equation species with coefficients |
| `reaction_observable_effects` | Structured effect metadata the frontend renders generically (see product brief section 13) |
| `experiments` | One row per saved lab session |
| `experiment_actions` | Append-only action log (the replay/undo source of truth) |

## Scaling beyond a hand-curated dataset

`ChemicalRepository.findByComposition` and `ReactionRepository.findByReactantSet`
currently do an in-memory scan over all chemicals/reactions rather than an
indexed query, because the seed dataset is tens of rows. Both methods have a
code comment marking this explicitly. At "thousands to millions of records"
scale (the product brief's stated long-term target), the fix is
straightforward and doesn't change any calling code: add a
`canonical_composition_hash` column (a stable hash of the sorted
element:count pairs) to `chemicals`, index it, and look up by hash instead
of scanning. `chemical_elements` and `reaction_reactants` already have
indexes on `element_symbol` / `chemical_id` respectively, so the query
patterns that matter for search and reaction lookup are index-backed today.
