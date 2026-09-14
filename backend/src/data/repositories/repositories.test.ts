import { describe, it, expect, beforeAll } from "vitest";
import type Database from "better-sqlite3";
import { createTestDb } from "../db.js";
import { seedDatabase } from "../seed/index.js";
import { ChemicalRepository } from "./chemicalRepository.js";
import { ReactionRepository } from "./reactionRepository.js";
import { ExperimentRepository } from "./experimentRepository.js";

let db: Database.Database;
let chemicals: ChemicalRepository;
let reactions: ReactionRepository;
let experiments: ExperimentRepository;

beforeAll(() => {
  db = createTestDb();
  seedDatabase(db);
  chemicals = new ChemicalRepository(db);
  reactions = new ReactionRepository(db);
  experiments = new ExperimentRepository(db);
});

describe("ChemicalRepository", () => {
  it("getById returns a fully assembled chemical with composition, aliases, and hazards", () => {
    const hcl = chemicals.getById("hcl");
    expect(hcl).toBeDefined();
    expect(hcl!.formula).toBe("HCl");
    expect(hcl!.composition).toEqual({ H: 1, Cl: 1 });
    expect(hcl!.aliases).toContain("muriatic acid");
    expect(hcl!.hazards.some((h) => h.code === "CORROSIVE")).toBe(true);
    expect(hcl!.dissociation).toEqual({ cation: { formula: "H", charge: 1 }, anion: { formula: "Cl", charge: -1 } });
  });

  it("getById includes molecule structure when curated", () => {
    const water = chemicals.getById("water");
    expect(water!.structure).toBeDefined();
    expect(water!.structure!.atoms.length).toBe(3);
    expect(water!.structure!.bonds.length).toBe(2);
  });

  it("returns undefined for an unknown id", () => {
    expect(chemicals.getById("not-a-real-chemical")).toBeUndefined();
  });

  it("search finds a chemical by common name", () => {
    const result = chemicals.search("sodium chloride");
    expect(result.items.some((c) => c.id === "nacl")).toBe(true);
  });

  it("search finds a chemical by formula", () => {
    const result = chemicals.search("NaOH");
    expect(result.items.some((c) => c.id === "naoh")).toBe(true);
  });

  it("search finds a chemical by alias", () => {
    const result = chemicals.search("table salt");
    expect(result.items.some((c) => c.id === "nacl")).toBe(true);
  });

  it("search finds a chemical by CAS number", () => {
    const result = chemicals.search("7647-14-5");
    expect(result.items.some((c) => c.id === "nacl")).toBe(true);
  });

  it("ranks an exact formula match first", () => {
    const result = chemicals.search("hcl");
    expect(result.items[0]?.id).toBe("hcl");
  });

  it("findByComposition locates AgCl by its element composition", () => {
    const found = chemicals.findByComposition({ Ag: 1, Cl: 1 }, 0);
    expect(found?.id).toBe("agcl");
  });

  it("findByComposition returns undefined for a composition with no registered match", () => {
    const found = chemicals.findByComposition({ Xe: 3, Kr: 2 }, 0);
    expect(found).toBeUndefined();
  });

  it("list paginates and reports a total count", () => {
    const page1 = chemicals.list(5, 0);
    expect(page1.items.length).toBe(5);
    expect(page1.total).toBeGreaterThan(5);
    const page2 = chemicals.list(5, 5);
    expect(page2.items[0]?.id).not.toBe(page1.items[0]?.id);
  });
});

describe("ReactionRepository", () => {
  it("getById returns a fully assembled curated reaction", () => {
    const reaction = reactions.getById("hcl-naoh-neutralization");
    expect(reaction).toBeDefined();
    expect(reaction!.reactants.map((r) => r.chemicalId).sort()).toEqual(["hcl", "naoh"]);
    expect(reaction!.products.map((p) => p.chemicalId).sort()).toEqual(["nacl", "water"]);
    expect(reaction!.observableEffects.length).toBeGreaterThan(0);
  });

  it("findByReactantSet matches regardless of order", () => {
    const a = reactions.findByReactantSet(["hcl", "naoh"]);
    const b = reactions.findByReactantSet(["naoh", "hcl"]);
    expect(a.map((r) => r.id)).toEqual(b.map((r) => r.id));
    expect(a.length).toBe(1);
  });

  it("findByReactantSet returns nothing for an uncurated combination", () => {
    expect(reactions.findByReactantSet(["hcl", "agno3"])).toEqual([]);
  });
});

describe("ExperimentRepository", () => {
  it("creates, appends actions to, and retrieves an experiment", () => {
    const experiment = experiments.create("Test experiment");
    expect(experiment.status).toBe("in_progress");

    experiments.appendAction(experiment.id, "ADD_CHEMICAL", { chemicalId: "hcl", amount: 20, unit: "mL" });
    experiments.appendAction(experiment.id, "ADD_CHEMICAL", { chemicalId: "naoh", amount: 20, unit: "mL" });
    const withActions = experiments.getById(experiment.id);

    expect(withActions!.actions.length).toBe(2);
    expect(withActions!.actions[0]?.sequence).toBe(1);
    expect(withActions!.actions[1]?.sequence).toBe(2);
  });

  it("reset clears the action log but keeps the experiment", () => {
    const experiment = experiments.create();
    experiments.appendAction(experiment.id, "ADD_CHEMICAL", { chemicalId: "hcl", amount: 10, unit: "mL" });
    experiments.reset(experiment.id);
    const afterReset = experiments.getById(experiment.id);
    expect(afterReset!.actions.length).toBe(0);
  });

  it("throws when appending to a nonexistent experiment", () => {
    expect(() => experiments.appendAction("does-not-exist", "ADD_CHEMICAL", {})).toThrow();
  });
});
