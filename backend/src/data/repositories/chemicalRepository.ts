import type Database from "better-sqlite3";
import type {
  AcidBaseStrength,
  Chemical,
  ChemicalClass,
  DataConfidence,
  ElementComposition,
  Hazard,
  MoleculeStructure,
  PhysicalState,
} from "../../chemistry-engine/types.js";

interface ChemicalRow {
  id: string;
  common_name: string;
  iupac_name: string | null;
  formula: string;
  molar_mass: number;
  cas_number: string | null;
  smiles: string | null;
  inchi: string | null;
  inchi_key: string | null;
  physical_state: string;
  density: number | null;
  melting_point_c: number | null;
  boiling_point_c: number | null;
  solubility_notes: string | null;
  is_acid: number;
  is_base: number;
  acid_base_strength: string;
  pka: number | null;
  pkb: number | null;
  chemical_class: string;
  charge: number;
  substance_color: string | null;
  is_elemental: number;
  common_cation_charge: number | null;
  neutralization_produces_water: number;
  dissociation_cation_formula: string | null;
  dissociation_cation_charge: number | null;
  dissociation_anion_formula: string | null;
  dissociation_anion_charge: number | null;
  source: string;
  reference: string | null;
  last_verified_date: string | null;
  confidence: string;
  data_version: string;
  notes: string | null;
}

export interface ChemicalSummary {
  id: string;
  commonName: string;
  formula: string;
  molarMass: number;
  chemicalClass: ChemicalClass;
  substanceColor?: string;
}

export interface PagedResult<T> {
  items: T[];
  total: number;
}

export class ChemicalRepository {
  constructor(private readonly db: Database.Database) {}

  private getComposition(chemicalId: string): ElementComposition {
    const rows = this.db
      .prepare("SELECT element_symbol, count FROM chemical_elements WHERE chemical_id = ?")
      .all(chemicalId) as { element_symbol: string; count: number }[];
    const composition: ElementComposition = {};
    for (const row of rows) composition[row.element_symbol] = row.count;
    return composition;
  }

  private getAliases(chemicalId: string): string[] {
    return (this.db.prepare("SELECT alias FROM chemical_aliases WHERE chemical_id = ?").all(chemicalId) as { alias: string }[]).map(
      (r) => r.alias
    );
  }

  private getHazards(chemicalId: string): Hazard[] {
    return this.db
      .prepare(
        `SELECT h.code, h.label, h.description, h.severity
         FROM chemical_hazards ch JOIN hazards h ON h.code = ch.hazard_code
         WHERE ch.chemical_id = ?`
      )
      .all(chemicalId) as Hazard[];
  }

  private getStructure(chemicalId: string): MoleculeStructure | undefined {
    const atoms = this.db
      .prepare("SELECT * FROM molecule_atoms WHERE chemical_id = ? ORDER BY atom_index")
      .all(chemicalId) as {
      atom_index: number;
      element_symbol: string;
      x2d: number;
      y2d: number;
      x3d: number;
      y3d: number;
      z3d: number;
      formal_charge: number;
    }[];
    if (atoms.length === 0) return undefined;

    const bonds = this.db.prepare("SELECT * FROM molecule_bonds WHERE chemical_id = ?").all(chemicalId) as {
      atom_index_1: number;
      atom_index_2: number;
      bond_order: number;
      bond_type: string;
    }[];

    return {
      curated: true,
      atoms: atoms.map((a) => ({
        atomIndex: a.atom_index,
        element: a.element_symbol,
        x2d: a.x2d,
        y2d: a.y2d,
        x3d: a.x3d,
        y3d: a.y3d,
        z3d: a.z3d,
        formalCharge: a.formal_charge,
      })),
      bonds: bonds.map((b) => ({
        atomIndex1: b.atom_index_1,
        atomIndex2: b.atom_index_2,
        order: b.bond_order as 1 | 2 | 3,
        type: b.bond_type as "covalent" | "ionic",
      })),
    };
  }

  private rowToChemical(row: ChemicalRow): Chemical {
    const dissociation =
      row.dissociation_cation_formula && row.dissociation_anion_formula
        ? {
            cation: { formula: row.dissociation_cation_formula, charge: row.dissociation_cation_charge ?? 0 },
            anion: { formula: row.dissociation_anion_formula, charge: row.dissociation_anion_charge ?? 0 },
          }
        : undefined;

    return {
      id: row.id,
      commonName: row.common_name,
      iupacName: row.iupac_name ?? undefined,
      formula: row.formula,
      composition: this.getComposition(row.id),
      charge: row.charge,
      molarMass: row.molar_mass,
      casNumber: row.cas_number ?? undefined,
      smiles: row.smiles ?? undefined,
      inchi: row.inchi ?? undefined,
      inchiKey: row.inchi_key ?? undefined,
      physicalState: row.physical_state as PhysicalState,
      density: row.density ?? undefined,
      meltingPointC: row.melting_point_c ?? undefined,
      boilingPointC: row.boiling_point_c ?? undefined,
      solubilityNotes: row.solubility_notes ?? undefined,
      isAcid: !!row.is_acid,
      isBase: !!row.is_base,
      acidBaseStrength: row.acid_base_strength as AcidBaseStrength,
      pKa: row.pka ?? undefined,
      pKb: row.pkb ?? undefined,
      chemicalClass: row.chemical_class as ChemicalClass,
      substanceColor: row.substance_color ?? undefined,
      aliases: this.getAliases(row.id),
      hazards: this.getHazards(row.id),
      structure: this.getStructure(row.id),
      provenance: {
        source: row.source,
        reference: row.reference ?? undefined,
        lastVerifiedDate: row.last_verified_date ?? undefined,
        confidence: row.confidence as DataConfidence,
        dataVersion: row.data_version,
      },
      notes: row.notes ?? undefined,
      dissociation,
      isElemental: !!row.is_elemental,
      commonCationCharge: row.common_cation_charge ?? undefined,
      neutralizationProducesWater: !!row.neutralization_produces_water,
    };
  }

  getById(id: string): Chemical | undefined {
    const row = this.db.prepare("SELECT * FROM chemicals WHERE id = ?").get(id) as ChemicalRow | undefined;
    return row ? this.rowToChemical(row) : undefined;
  }

  getByIds(ids: string[]): Chemical[] {
    return ids.map((id) => this.getById(id)).filter((c): c is Chemical => c !== undefined);
  }

  /**
   * Finds a registered chemical with an exact element composition and charge.
   * The dataset is small (tens to low hundreds of records) so an in-memory
   * scan is simpler and plenty fast; at "thousands to millions of records"
   * scale (see docs/DATABASE_SCHEMA.md) this should become an indexed
   * canonical-composition-hash lookup instead.
   */
  findByComposition(composition: ElementComposition, charge: number): Chemical | undefined {
    const candidates = this.db.prepare("SELECT id FROM chemicals WHERE charge = ?").all(charge) as { id: string }[];
    const targetKeys = Object.keys(composition)
      .filter((k) => composition[k] !== 0)
      .sort();
    for (const { id } of candidates) {
      const candidateComposition = this.getComposition(id);
      const candidateKeys = Object.keys(candidateComposition).sort();
      if (candidateKeys.length !== targetKeys.length) continue;
      if (candidateKeys.every((k, i) => k === targetKeys[i] && candidateComposition[k] === composition[k])) {
        return this.getById(id);
      }
    }
    return undefined;
  }

  search(query: string, limit = 20, offset = 0): PagedResult<ChemicalSummary> {
    const q = `%${query.trim().toLowerCase()}%`;
    const exact = query.trim().toLowerCase();

    const rows = this.db
      .prepare(
        `SELECT DISTINCT c.id, c.common_name, c.formula, c.molar_mass, c.chemical_class, c.substance_color,
                CASE
                  WHEN LOWER(c.formula) = @exact THEN 0
                  WHEN LOWER(c.common_name) = @exact THEN 1
                  WHEN c.cas_number = @raw THEN 1
                  WHEN LOWER(c.formula) LIKE @prefix THEN 2
                  WHEN LOWER(c.common_name) LIKE @prefix THEN 3
                  ELSE 4
                END as rank
         FROM chemicals c
         LEFT JOIN chemical_aliases a ON a.chemical_id = c.id
         WHERE LOWER(c.common_name) LIKE @q
            OR LOWER(c.formula) LIKE @q
            OR LOWER(COALESCE(c.iupac_name, '')) LIKE @q
            OR LOWER(a.alias) LIKE @q
            OR c.cas_number = @raw
         ORDER BY rank ASC, LENGTH(c.common_name) ASC
         LIMIT @limit OFFSET @offset`
      )
      .all({ q, exact, raw: query.trim(), prefix: `${exact}%`, limit, offset }) as (ChemicalRow extends never
      ? never
      : {
          id: string;
          common_name: string;
          formula: string;
          molar_mass: number;
          chemical_class: string;
          substance_color: string | null;
        })[];

    const totalRow = this.db
      .prepare(
        `SELECT COUNT(DISTINCT c.id) as n
         FROM chemicals c
         LEFT JOIN chemical_aliases a ON a.chemical_id = c.id
         WHERE LOWER(c.common_name) LIKE @q
            OR LOWER(c.formula) LIKE @q
            OR LOWER(COALESCE(c.iupac_name, '')) LIKE @q
            OR LOWER(a.alias) LIKE @q
            OR c.cas_number = @raw`
      )
      .get({ q, raw: query.trim() }) as { n: number };

    return {
      items: rows.map((r) => ({
        id: r.id,
        commonName: r.common_name,
        formula: r.formula,
        molarMass: r.molar_mass,
        chemicalClass: r.chemical_class as ChemicalClass,
        substanceColor: r.substance_color ?? undefined,
      })),
      total: totalRow.n,
    };
  }

  list(limit = 50, offset = 0, chemicalClass?: string): PagedResult<ChemicalSummary> {
    const rows = chemicalClass
      ? (this.db
          .prepare("SELECT * FROM chemicals WHERE chemical_class = ? ORDER BY common_name LIMIT ? OFFSET ?")
          .all(chemicalClass, limit, offset) as ChemicalRow[])
      : (this.db.prepare("SELECT * FROM chemicals ORDER BY common_name LIMIT ? OFFSET ?").all(limit, offset) as ChemicalRow[]);

    const totalRow = chemicalClass
      ? (this.db.prepare("SELECT COUNT(*) as n FROM chemicals WHERE chemical_class = ?").get(chemicalClass) as { n: number })
      : (this.db.prepare("SELECT COUNT(*) as n FROM chemicals").get() as { n: number });

    return {
      items: rows.map((r) => ({
        id: r.id,
        commonName: r.common_name,
        formula: r.formula,
        molarMass: r.molar_mass,
        chemicalClass: r.chemical_class as ChemicalClass,
        substanceColor: r.substance_color ?? undefined,
      })),
      total: totalRow.n,
    };
  }
}
