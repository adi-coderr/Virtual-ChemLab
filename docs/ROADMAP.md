# Roadmap

The original brief listed a long-term wishlist (molecular dynamics, ML
reaction prediction, VR/AR, spectroscopy simulation, multiplayer, teacher
dashboards, and more) with the explicit instruction not to build all of it
now, but to make it *possible* later. This is an honest accounting of how
close the current v0.1 architecture actually gets to that for each item —
not everything is equally close.

## Straightforward with the current architecture (mostly additive)

- **More chemicals/reactions** — literally just data entry; see
  [ADDING_NEW_REACTIONS.md](ADDING_NEW_REACTIONS.md). Zero code changes.
- **More general rules** (sulfite/sulfide gas evolution, more combustion
  variants, more precipitation edge cases) — one new function per rule in
  `reactionResolver.ts`, following the existing pattern.
- **More equipment types** — one entry in the frontend's `EQUIPMENT_CATALOG`.
- **Student accounts / saved experiments** — `experiments` already has a
  stable schema and an append-only action log designed for this; adding a
  `user_id` column and an auth middleware layer doesn't touch the chemistry
  engine at all.
- **Titration simulation** — the `burette` equipment type and the
  stoichiometry engine's limiting-reagent logic already model most of the
  underlying math (incremental addition + a `computeStoichiometry` call per
  increment); the missing piece is a frontend "drip" interaction and a
  pH-vs-volume calculation, which leads into the next section.
- **Real Postgres/MySQL instead of SQLite** — the repository classes are
  the only layer that touches SQL; see
  [DATABASE_SCHEMA.md](DATABASE_SCHEMA.md#entity-relationship-overview).

## Real but scoped work (the architecture supports it; the science itself is the effort)

- **Equilibrium and pH calculation** — the `AcidBaseStrength` field and the
  `APPROXIMATE` confidence tier already flag exactly where this is missing
  (see any weak-acid/weak-base result's explanation). Adding real Ka/Kb-based
  equilibrium math is a new module (`chemistry-engine/equilibrium.ts`) that
  the resolver's acid-base rule would call instead of returning
  `APPROXIMATE` — a real scoped addition, not an architecture change.
- **General oxidation-state assignment / full redox balancing** — see
  [CHEMISTRY_ENGINE.md](CHEMISTRY_ENGINE.md#redox--oxidation-states-oxidationstatets)
  for exactly what's missing and why it was deliberately scoped out rather
  than half-implemented.
- **Kinetics / reaction-rate graphs** — product brief section 19 explicitly
  requires not generating scientifically meaningless graphs when no kinetic
  model exists, which today is every reaction (the engine reports
  thermodynamic classification, not rate). A real kinetics module would need
  actual rate law data per reaction — again additive, not a rewrite, but
  real curation work.
- **IR/NMR/mass spectra** — the `MoleculeStructure` schema (atoms + bonds +
  3D coordinates) is the right starting substrate for a real IR/NMR
  predictor, but predicting a believable spectrum from structure is a
  substantial numerical/ML task in its own right, not a UI feature.

## Bigger architectural additions

- **Machine-learning reaction prediction** — would slot in as one more entry
  in the resolver's `attempts` array, returning `PREDICTED` or a new,
  explicitly-lower `ML_PREDICTED` tier with a confidence score from the
  model itself. The important constraint to preserve: it must return the
  same `ReactionResolution` shape with an honest confidence tier, not bypass
  the tier system because "the model is usually right."
- **Multiplayer / collaborative experiments** — `experiments` and
  `experiment_actions` are already structured as an event log, which is the
  right foundation for this (broadcast new actions over a WebSocket, replay
  the log for a joining client), but the actual realtime transport layer
  doesn't exist yet.
- **Teacher dashboards / grading** — needs the accounts work above plus a
  rubric/scoring concept that doesn't exist in the schema yet; additive once
  accounts exist.
- **VR/AR** — the 3D viewer already uses real Three.js scenes with real
  geometry (not a canned animation), which is the right substrate, but a VR
  frontend is a different rendering target (WebXR) built on the same
  `MoleculeStructure` data, not a small tweak to `MoleculeViewer3D.tsx`.

## Explicitly not attempted, and why

- **Molecular dynamics / quantum chemistry integration** — genuinely a
  different category of software (numerical simulation at a very different
  scale of complexity and compute) from a reaction-lookup-and-rules engine.
  The honest thing to say is that this app's 3D viewer is, per its own
  caption, "a scientifically informed representation... not a live
  quantum-mechanical simulation" — and that remains true until an actual DFT
  or MD engine is integrated as a genuinely separate service.
- **End-to-end (browser) tests** — unit and integration tests exist and are
  extensive (300+ backend tests); e2e tests are most valuable against a real
  deployed environment (they'd mostly be testing Vite dev-server plumbing
  right now), so they're deferred rather than added for their own sake.
