import type Database from "better-sqlite3";
import type { CuratedReaction, EnergyClassification, ObservableEffect, ReactionType } from "../../chemistry-engine/types.js";

interface ReactionRow {
  id: string;
  name: string;
  reaction_type: string;
  equation_display: string;
  net_ionic_equation: string | null;
  confidence_score: number;
  energy_classification: string;
  temperature_min_c: number | null;
  temperature_max_c: number | null;
  solvent: string | null;
  catalyst_chemical_id: string | null;
  experimental_status: string;
  source: string;
  reference: string | null;
  safety_notes: string | null;
}

export class ReactionRepository {
  constructor(private readonly db: Database.Database) {}

  private getReactants(reactionId: string) {
    return (
      this.db.prepare("SELECT chemical_id, coefficient FROM reaction_reactants WHERE reaction_id = ?").all(reactionId) as {
        chemical_id: string;
        coefficient: number;
      }[]
    ).map((r) => ({ chemicalId: r.chemical_id, coefficient: r.coefficient }));
  }

  private getProducts(reactionId: string) {
    return (
      this.db
        .prepare("SELECT chemical_id, coefficient, is_byproduct FROM reaction_products WHERE reaction_id = ?")
        .all(reactionId) as { chemical_id: string; coefficient: number; is_byproduct: number }[]
    ).map((r) => ({ chemicalId: r.chemical_id, coefficient: r.coefficient, isByproduct: !!r.is_byproduct }));
  }

  private getEffects(reactionId: string): ObservableEffect[] {
    return (
      this.db
        .prepare("SELECT effect_type, description, related_chemical_id, color_from, color_to FROM reaction_observable_effects WHERE reaction_id = ?")
        .all(reactionId) as { effect_type: string; description: string; related_chemical_id: string | null; color_from: string | null; color_to: string | null }[]
    ).map((e) => ({
      type: e.effect_type as ObservableEffect["type"],
      description: e.description,
      relatedChemicalId: e.related_chemical_id ?? undefined,
      colorFrom: e.color_from ?? undefined,
      colorTo: e.color_to ?? undefined,
    }));
  }

  private rowToReaction(row: ReactionRow): CuratedReaction {
    return {
      id: row.id,
      name: row.name,
      reactionType: row.reaction_type as ReactionType,
      reactants: this.getReactants(row.id),
      products: this.getProducts(row.id),
      equationDisplay: row.equation_display,
      netIonicEquation: row.net_ionic_equation ?? undefined,
      energyClassification: row.energy_classification as EnergyClassification,
      temperatureMinC: row.temperature_min_c ?? undefined,
      temperatureMaxC: row.temperature_max_c ?? undefined,
      solvent: row.solvent ?? undefined,
      catalystChemicalId: row.catalyst_chemical_id ?? undefined,
      observableEffects: this.getEffects(row.id),
      experimentalStatus: row.experimental_status as CuratedReaction["experimentalStatus"],
      confidenceScore: row.confidence_score,
      source: row.source,
      reference: row.reference ?? undefined,
      safetyNotes: row.safety_notes ?? undefined,
    };
  }

  getById(id: string): CuratedReaction | undefined {
    const row = this.db.prepare("SELECT * FROM reactions WHERE id = ?").get(id) as ReactionRow | undefined;
    return row ? this.rowToReaction(row) : undefined;
  }

  list(limit = 50, offset = 0): { items: CuratedReaction[]; total: number } {
    const rows = this.db.prepare("SELECT * FROM reactions ORDER BY name LIMIT ? OFFSET ?").all(limit, offset) as ReactionRow[];
    const total = (this.db.prepare("SELECT COUNT(*) as n FROM reactions").get() as { n: number }).n;
    return { items: rows.map((r) => this.rowToReaction(r)), total };
  }

  /**
   * Finds every curated reaction whose reactant chemical-id set is exactly
   * equal (order independent) to the given set. Small dataset -> simple
   * in-memory comparison; see chemicalRepository.findByComposition for the
   * same scaling note.
   */
  findByReactantSet(chemicalIds: string[]): CuratedReaction[] {
    const target = new Set(chemicalIds);
    const allIds = (this.db.prepare("SELECT id FROM reactions").all() as { id: string }[]).map((r) => r.id);
    const matches: CuratedReaction[] = [];
    for (const id of allIds) {
      const reactantIds = new Set(this.getReactants(id).map((r) => r.chemicalId));
      if (reactantIds.size === target.size && [...target].every((t) => reactantIds.has(t))) {
        const reaction = this.getById(id);
        if (reaction) matches.push(reaction);
      }
    }
    return matches;
  }
}
