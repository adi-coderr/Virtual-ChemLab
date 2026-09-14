-- Migration 001: initial schema.
-- See docs/DATABASE_SCHEMA.md for the entity-relationship rationale.

PRAGMA foreign_keys = ON;

CREATE TABLE elements (
  symbol TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  atomic_number INTEGER NOT NULL,
  atomic_mass REAL NOT NULL,
  cpk_color TEXT NOT NULL,
  covalent_radius_pm REAL NOT NULL,
  category TEXT NOT NULL
);

CREATE TABLE chemicals (
  id TEXT PRIMARY KEY,
  common_name TEXT NOT NULL,
  iupac_name TEXT,
  formula TEXT NOT NULL,
  molar_mass REAL NOT NULL,
  cas_number TEXT,
  smiles TEXT,
  inchi TEXT,
  inchi_key TEXT,
  physical_state TEXT NOT NULL,
  density REAL,
  melting_point_c REAL,
  boiling_point_c REAL,
  solubility_notes TEXT,
  is_acid INTEGER NOT NULL DEFAULT 0,
  is_base INTEGER NOT NULL DEFAULT 0,
  acid_base_strength TEXT NOT NULL DEFAULT 'none',
  pka REAL,
  pkb REAL,
  chemical_class TEXT NOT NULL,
  charge INTEGER NOT NULL DEFAULT 0,
  substance_color TEXT,
  is_elemental INTEGER NOT NULL DEFAULT 0,
  common_cation_charge INTEGER,
  neutralization_produces_water INTEGER NOT NULL DEFAULT 0,
  dissociation_cation_formula TEXT,
  dissociation_cation_charge INTEGER,
  dissociation_anion_formula TEXT,
  dissociation_anion_charge INTEGER,
  source TEXT NOT NULL,
  reference TEXT,
  last_verified_date TEXT,
  confidence TEXT NOT NULL DEFAULT 'high',
  data_version TEXT NOT NULL DEFAULT '1.0',
  notes TEXT
);

CREATE TABLE chemical_aliases (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  chemical_id TEXT NOT NULL REFERENCES chemicals(id) ON DELETE CASCADE,
  alias TEXT NOT NULL,
  UNIQUE (chemical_id, alias)
);
CREATE INDEX idx_chemical_aliases_alias ON chemical_aliases (alias);
CREATE INDEX idx_chemical_aliases_chemical_id ON chemical_aliases (chemical_id);

CREATE TABLE chemical_elements (
  chemical_id TEXT NOT NULL REFERENCES chemicals(id) ON DELETE CASCADE,
  element_symbol TEXT NOT NULL REFERENCES elements(symbol),
  count INTEGER NOT NULL,
  PRIMARY KEY (chemical_id, element_symbol)
);
CREATE INDEX idx_chemical_elements_element ON chemical_elements (element_symbol);

CREATE TABLE molecule_atoms (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  chemical_id TEXT NOT NULL REFERENCES chemicals(id) ON DELETE CASCADE,
  atom_index INTEGER NOT NULL,
  element_symbol TEXT NOT NULL REFERENCES elements(symbol),
  x2d REAL NOT NULL,
  y2d REAL NOT NULL,
  x3d REAL NOT NULL,
  y3d REAL NOT NULL,
  z3d REAL NOT NULL,
  formal_charge INTEGER NOT NULL DEFAULT 0,
  UNIQUE (chemical_id, atom_index)
);
CREATE INDEX idx_molecule_atoms_chemical ON molecule_atoms (chemical_id);

CREATE TABLE molecule_bonds (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  chemical_id TEXT NOT NULL REFERENCES chemicals(id) ON DELETE CASCADE,
  atom_index_1 INTEGER NOT NULL,
  atom_index_2 INTEGER NOT NULL,
  bond_order INTEGER NOT NULL DEFAULT 1,
  bond_type TEXT NOT NULL DEFAULT 'covalent'
);
CREATE INDEX idx_molecule_bonds_chemical ON molecule_bonds (chemical_id);

CREATE TABLE hazards (
  code TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  description TEXT NOT NULL,
  severity TEXT NOT NULL
);

CREATE TABLE chemical_hazards (
  chemical_id TEXT NOT NULL REFERENCES chemicals(id) ON DELETE CASCADE,
  hazard_code TEXT NOT NULL REFERENCES hazards(code),
  PRIMARY KEY (chemical_id, hazard_code)
);

CREATE TABLE reactions (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  reaction_type TEXT NOT NULL,
  equation_display TEXT NOT NULL,
  net_ionic_equation TEXT,
  confidence_score REAL NOT NULL,
  energy_classification TEXT NOT NULL DEFAULT 'unknown',
  temperature_min_c REAL,
  temperature_max_c REAL,
  solvent TEXT,
  catalyst_chemical_id TEXT REFERENCES chemicals(id),
  experimental_status TEXT NOT NULL,
  source TEXT NOT NULL,
  reference TEXT,
  safety_notes TEXT
);

CREATE TABLE reaction_reactants (
  reaction_id TEXT NOT NULL REFERENCES reactions(id) ON DELETE CASCADE,
  chemical_id TEXT NOT NULL REFERENCES chemicals(id),
  coefficient INTEGER NOT NULL,
  PRIMARY KEY (reaction_id, chemical_id)
);

CREATE TABLE reaction_products (
  reaction_id TEXT NOT NULL REFERENCES reactions(id) ON DELETE CASCADE,
  chemical_id TEXT NOT NULL REFERENCES chemicals(id),
  coefficient INTEGER NOT NULL,
  is_byproduct INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (reaction_id, chemical_id)
);

CREATE TABLE reaction_observable_effects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  reaction_id TEXT NOT NULL REFERENCES reactions(id) ON DELETE CASCADE,
  effect_type TEXT NOT NULL,
  description TEXT NOT NULL,
  related_chemical_id TEXT REFERENCES chemicals(id),
  color_from TEXT,
  color_to TEXT
);
CREATE INDEX idx_reaction_effects_reaction ON reaction_observable_effects (reaction_id);

-- Reactant-set index: used by the resolver to find every curated reaction
-- whose reactant chemical set matches a given selection. A generated column
-- would be nicer, but SQLite's json_group_array over a subquery is simplest.
CREATE INDEX idx_reaction_reactants_chemical ON reaction_reactants (chemical_id);

CREATE TABLE experiments (
  id TEXT PRIMARY KEY,
  name TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'in_progress'
);

CREATE TABLE experiment_actions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  experiment_id TEXT NOT NULL REFERENCES experiments(id) ON DELETE CASCADE,
  sequence INTEGER NOT NULL,
  action_type TEXT NOT NULL,
  payload_json TEXT NOT NULL,
  result_json TEXT,
  created_at TEXT NOT NULL
);
CREATE INDEX idx_experiment_actions_experiment ON experiment_actions (experiment_id, sequence);
