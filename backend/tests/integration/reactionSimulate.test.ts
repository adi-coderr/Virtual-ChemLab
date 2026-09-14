import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";
import type { Express } from "express";
import type Database from "better-sqlite3";
import { createTestDb } from "../../src/data/db.js";
import { seedDatabase } from "../../src/data/seed/index.js";
import { createApp } from "../../src/app.js";

let app: Express;
let db: Database.Database;

beforeAll(() => {
  db = createTestDb();
  seedDatabase(db);
  app = createApp(db);
});

describe("POST /api/reactions/simulate", () => {
  it("returns SUPPORTED for the exact HCl + NaOH stoichiometry example from the product brief", async () => {
    const res = await request(app)
      .post("/api/reactions/simulate")
      .send({
        reactants: [
          { chemicalId: "hcl", amount: 100, unit: "mL", concentrationMolar: 0.1 },
          { chemicalId: "naoh", amount: 100, unit: "mL", concentrationMolar: 0.1 },
        ],
      });

    expect(res.status).toBe(200);
    expect(res.body.data.resolution.confidenceTier).toBe("SUPPORTED");
    expect(res.body.data.resolution.balancedEquation).toBe("HCl + NaOH \u2192 NaCl + H2O");
    const nacl = res.body.data.stoichiometry.find((l: { chemicalId: string }) => l.chemicalId === "nacl");
    expect(nacl.theoreticalYieldMoles).toBeCloseTo(0.01, 6);
  });

  it("returns PREDICTED for a general-rule single displacement not in the curated set (Mg + HCl)", async () => {
    const res = await request(app)
      .post("/api/reactions/simulate")
      .send({ reactants: [{ chemicalId: "mg", amount: 1, unit: "g" }, { chemicalId: "hcl", amount: 50, unit: "mL", concentrationMolar: 1 }] });

    expect(res.status).toBe(200);
    expect(res.body.data.resolution.status).toBe("REACTION");
    expect(res.body.data.resolution.confidenceTier).toBe("PREDICTED");
    expect(res.body.data.resolution.products.map((p: { chemicalId: string }) => p.chemicalId).sort()).toEqual(["h2", "mgcl2"]);
  });

  it("returns NO_REACTION for a double displacement where both products are soluble (NaCl + KI)", async () => {
    const res = await request(app)
      .post("/api/reactions/simulate")
      .send({ reactants: [{ chemicalId: "nacl", amount: 1, unit: "g" }, { chemicalId: "ki", amount: 1, unit: "g" }] });

    expect(res.status).toBe(200);
    expect(res.body.data.resolution.status).toBe("NO_REACTION");
    expect(res.body.data.resolution.confidenceTier).toBe("PREDICTED");
  });

  it("returns APPROXIMATE for a weak acid + weak base pair", async () => {
    const res = await request(app)
      .post("/api/reactions/simulate")
      .send({ reactants: [{ chemicalId: "acetic-acid", amount: 1, unit: "g" }, { chemicalId: "ammonia", amount: 1, unit: "g" }] });

    expect(res.status).toBe(200);
    expect(res.body.data.resolution.confidenceTier).toBe("APPROXIMATE");
  });

  it("returns UNSUPPORTED/UNKNOWN with confidence 0 when nothing matches", async () => {
    const res = await request(app)
      .post("/api/reactions/simulate")
      .send({ reactants: [{ chemicalId: "propane", amount: 1, unit: "g" }, { chemicalId: "nacl", amount: 1, unit: "g" }] });

    expect(res.status).toBe(200);
    expect(res.body.data.resolution.status).toBe("UNSUPPORTED");
    expect(res.body.data.resolution.confidenceTier).toBe("UNKNOWN");
    expect(res.body.data.resolution.confidenceScore).toBe(0);
  });

  it("rejects an unknown chemical id with a structured 400", async () => {
    const res = await request(app)
      .post("/api/reactions/simulate")
      .send({ reactants: [{ chemicalId: "not-a-real-chemical", amount: 1, unit: "g" }] });

    expect(res.status).toBe(400);
    expect(res.body.code).toBe("UNKNOWN_CHEMICAL");
  });

  it("rejects a negative amount at the validation layer before it reaches the engine", async () => {
    const res = await request(app)
      .post("/api/reactions/simulate")
      .send({ reactants: [{ chemicalId: "hcl", amount: -5, unit: "g" }] });

    expect(res.status).toBe(400);
    expect(res.body.code).toBe("VALIDATION_ERROR");
  });

  it("rejects an invalid unit", async () => {
    const res = await request(app)
      .post("/api/reactions/simulate")
      .send({ reactants: [{ chemicalId: "hcl", amount: 5, unit: "parsecs" }] });

    expect(res.status).toBe(400);
  });

  it("rejects an empty reactants array", async () => {
    const res = await request(app).post("/api/reactions/simulate").send({ reactants: [] });
    expect(res.status).toBe(400);
  });
});

describe("POST /api/reactions/balance", () => {
  it("balances a standalone equation not tied to any registered chemical", async () => {
    const res = await request(app).post("/api/reactions/balance").send({ reactants: ["Fe", "O2"], products: ["Fe2O3"] });
    expect(res.status).toBe(200);
    expect(res.body.data.balancedEquationText).toBe("4 Fe + 3 O2 \u2192 2 Fe2O3");
  });

  it("rejects a malformed formula with a specific error", async () => {
    const res = await request(app).post("/api/reactions/balance").send({ reactants: ["Xz2Q"], products: ["H2O"] });
    expect(res.status).toBe(422);
    expect(res.body.code).toBe("INVALID_FORMULA");
  });

  it("rejects an equation that cannot be balanced (elements not conserved)", async () => {
    const res = await request(app).post("/api/reactions/balance").send({ reactants: ["H2", "O2"], products: ["NaCl"] });
    expect(res.status).toBe(422);
    expect(res.body.code).toBe("ELEMENT_NOT_CONSERVED");
  });
});
