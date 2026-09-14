import { describe, it, expect } from "vitest";
import { createTestDb } from "../db.js";
import { seedDatabase } from "./index.js";
import { SEED_CHEMICALS } from "./chemicals.js";
import { SEED_REACTIONS } from "./reactions.js";

describe("seedDatabase", () => {
  it("populates chemicals, reactions, and reference tables", () => {
    const db = createTestDb();
    seedDatabase(db);

    const chemicalCount = (db.prepare("SELECT COUNT(*) as n FROM chemicals").get() as { n: number }).n;
    expect(chemicalCount).toBe(SEED_CHEMICALS.length);

    const reactionCount = (db.prepare("SELECT COUNT(*) as n FROM reactions").get() as { n: number }).n;
    expect(reactionCount).toBe(SEED_REACTIONS.length);

    const elementCount = (db.prepare("SELECT COUNT(*) as n FROM elements").get() as { n: number }).n;
    expect(elementCount).toBeGreaterThan(0);

    const hclRow = db.prepare("SELECT * FROM chemicals WHERE id = ?").get("hcl") as Record<string, unknown>;
    expect(hclRow.formula).toBe("HCl");
    expect(hclRow.is_acid).toBe(1);

    const aliasRows = db.prepare("SELECT alias FROM chemical_aliases WHERE chemical_id = ?").all("nacl") as { alias: string }[];
    expect(aliasRows.map((r) => r.alias)).toContain("table salt");

    const atomRows = db.prepare("SELECT * FROM molecule_atoms WHERE chemical_id = ? ORDER BY atom_index").all("water");
    expect(atomRows.length).toBe(3);

    db.close();
  });

  it("is idempotent: calling it twice does not duplicate or error", () => {
    const db = createTestDb();
    seedDatabase(db);
    seedDatabase(db);
    const chemicalCount = (db.prepare("SELECT COUNT(*) as n FROM chemicals").get() as { n: number }).n;
    expect(chemicalCount).toBe(SEED_CHEMICALS.length);
    db.close();
  });
});
