# API Reference

Base URL: `http://localhost:4000/api` (dev). All responses are JSON. Success
responses are `{ "status": "ok", "data": ... }` (list endpoints also include
`"total"`); errors are `{ "status": "error", "code": "...", "message": "...", "details"?: {...} }`
with an appropriate HTTP status code. Full validation is powered by Zod
(`backend/src/validation/schemas.ts`) and runs before any controller logic.

## Chemicals

### `GET /chemicals/search?q=&limit=&offset=`
Searches by common name, formula, IUPAC name, alias, or exact CAS number.
Ranked: exact formula/name/CAS match first, then prefix match, then
substring. Example: `q=7647-14-5` finds sodium chloride by CAS number
(the exact example from the product brief).

### `GET /chemicals?limit=&offset=&chemicalClass=`
Paginated listing, optionally filtered by class (`acid`, `base`, `salt`,
`metal`, ...).

### `GET /chemicals/:id`
Full chemical record: composition, molar mass, physical properties, acid/
base data, hazards, aliases, molecular structure (if curated), and
provenance. 404 with code `CHEMICAL_NOT_FOUND` if the id doesn't exist.

## Reactions

### `POST /reactions/balance`
Balances an arbitrary equation, independent of the chemical database.
```json
{ "reactants": ["Fe", "O2"], "products": ["Fe2O3"] }
```
→ `{ "data": { "balancedEquationText": "4 Fe + 3 O2 → 2 Fe2O3", "reactantCoefficients": [4,3], "productCoefficients": [2], "warnings": [] } }`

Returns 422 with a specific code (`INVALID_FORMULA`, `ELEMENT_NOT_CONSERVED`,
`NO_BALANCE_SOLUTION`, ...) when the equation can't be balanced — see
[CHEMISTRY_ENGINE.md](CHEMISTRY_ENGINE.md).

### `POST /reactions/simulate`
The main endpoint. Reactants must be registered chemical ids.
```json
{
  "reactants": [
    { "chemicalId": "hcl", "amount": 100, "unit": "mL", "concentrationMolar": 0.1 },
    { "chemicalId": "naoh", "amount": 100, "unit": "mL", "concentrationMolar": 0.1 }
  ],
  "conditions": { "temperatureC": 25, "solvent": "water" }
}
```
→ `{ "data": { "resolution": { "status", "confidenceTier", "balancedEquation", "products", "observableEffects", "explanation", "ruleApplied", ... }, "stoichiometry": [...], "limitingReagentChemicalId": "hcl" } }`

`conditions` is optional. `unit` is one of `g | kg | mg | mol | mmol | mL | L`;
`mL`/`L` require `concentrationMolar`. 1–6 reactants.

### `POST /reactions/stoichiometry`
Pure stoichiometry against an already-known curated reaction (no resolution
step) — useful for a "what if I used these exact amounts" calculator without
re-running rule matching.
```json
{ "reactionId": "hcl-naoh-neutralization", "reactantAmounts": [...], "actualYieldMassGrams": 0.55 }
```

### `GET /reactions` / `GET /reactions/:id`
List / fetch curated reaction records directly.

## Experiments

### `POST /experiments` — `{ "name"?: string }`
### `GET /experiments/:id`
### `GET /experiments?limit=&offset=`
### `POST /experiments/:id/reset` — clears the action log, keeps the experiment
### `POST /experiments/:id/actions`

The allowlisted operation system (product brief section 33). Body is a
discriminated union on `actionType` — anything outside this set is rejected
by Zod before it reaches a controller:

| `actionType` | `payload` shape |
|---|---|
| `ADD_CHEMICAL` | `{ chemicalId, amount, unit, concentrationMolar?, containerId? }` |
| `MIX` | `{ containerId? }` |
| `HEAT` / `COOL` | `{ targetTemperatureC, containerId? }` |
| `REMOVE` | `{ chemicalId, containerId? }` |
| `MEASURE` | `{ containerId?, note? }` |
| `RUN_REACTION` | `{ reactants: [...], conditions? }` — actually invokes the simulation and stores the result on the action |
| `RESET` | `{}` |

`RUN_REACTION`'s response includes `simulationResult` (the same shape as
`/reactions/simulate`'s response) so the frontend doesn't need a second
request.

## Assistant

### `POST /assistant/parse` — `{ "text": string, "experimentId"?: string }`
Returns an array of response items, each one of:
- `{ "kind": "proposed_action", "actionType", "payload", "matchedChemical", "text" }` —
  a structured, but **not yet executed**, lab action. The frontend calls
  `POST /experiments/:id/actions` with this exact `actionType`/`payload` only
  after the user confirms.
- `{ "kind": "answer", "text" }` — a question answered from the experiment's
  actual last `RUN_REACTION` result (never invented).
- `{ "kind": "clarification_needed", "text" }` — the assistant couldn't
  confidently resolve the chemical name or the sentence at all.

Uses a deterministic rule-based parser by default; set `ANTHROPIC_API_KEY`
in the backend's `.env` to upgrade to real Claude-based parsing (see
`backend/src/ai/anthropicNlu.ts`). Either way, the output feeds through the
exact same validation as a manual action — see
[ARCHITECTURE.md](ARCHITECTURE.md#data-flow-for-the-ai-assistant).

## Error codes you'll actually see

| Code | HTTP | Meaning |
|---|---|---|
| `VALIDATION_ERROR` | 400 | Request body/query failed schema validation |
| `UNKNOWN_CHEMICAL` | 400 | A chemical id isn't registered |
| `CHEMICAL_NOT_FOUND` / `REACTION_NOT_FOUND` / `EXPERIMENT_NOT_FOUND` | 404 | Id doesn't exist |
| `INVALID_FORMULA` / `AMBIGUOUS_CHARGE_NOTATION` | 422 | Formula string couldn't be parsed |
| `ELEMENT_NOT_CONSERVED` / `NO_BALANCE_SOLUTION` / `ZERO_COEFFICIENT` | 422 | Equation can't be balanced as given |
| `MISSING_CONCENTRATION` / `INVALID_AMOUNT` | 422 | Stoichiometry input is incomplete/invalid |
| `INTERNAL_ERROR` | 500 | Unexpected — should not happen; please report with the request body |
