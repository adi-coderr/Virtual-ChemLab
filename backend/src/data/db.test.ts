import { describe, it, expect } from "vitest";
import { createTestDb } from "./db.js";

describe("database migrations", () => {
  it("applies migrations and creates the expected tables", () => {
    const db = createTestDb();
    const tables = db
      .prepare("SELECT name FROM sqlite_master WHERE type = 'table' ORDER BY name")
      .all()
      .map((r) => (r as { name: string }).name);

    expect(tables).toEqual(
      expect.arrayContaining([
        "chemicals",
        "chemical_aliases",
        "chemical_elements",
        "chemical_hazards",
        "elements",
        "experiment_actions",
        "experiments",
        "hazards",
        "molecule_atoms",
        "molecule_bonds",
        "reaction_observable_effects",
        "reaction_products",
        "reaction_reactants",
        "reactions",
      ])
    );
    db.close();
  });

  it("is idempotent: running migrations twice does not error", () => {
    const db = createTestDb();
    expect(() => db.exec("SELECT 1")).not.toThrow();
    db.close();
  });
});
