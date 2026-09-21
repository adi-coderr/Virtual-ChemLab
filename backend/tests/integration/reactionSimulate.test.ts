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

  it("handles mixtures with more than 6 chemicals without a validation error", async () => {
    const res = await request(app)
      .post("/api/reactions/simulate")
      .send({
        reactants: [
          { chemicalId: "hcl", amount: 20, unit: "mL", concentrationMolar: 0.1 },
          { chemicalId: "naoh", amount: 20, unit: "mL", concentrationMolar: 0.1 },
          { chemicalId: "agno3", amount: 10, unit: "mL", concentrationMolar: 0.1 },
          { chemicalId: "nacl", amount: 5, unit: "g" },
          { chemicalId: "cuso4", amount: 10, unit: "mL", concentrationMolar: 0.1 },
          { chemicalId: "zn", amount: 2, unit: "g" },
          { chemicalId: "water", amount: 50, unit: "mL", concentrationMolar: 55.5 },
        ],
      });

    expect(res.status).toBe(200);
    expect(res.body.data.resolution.status).toBe("REACTION");
  });

  it("resolves the reacting pair and notes spectator species when water or spectators are present", async () => {
    const res = await request(app)
      .post("/api/reactions/simulate")
      .send({
        reactants: [
          { chemicalId: "hcl", amount: 50, unit: "mL", concentrationMolar: 0.1 },
          { chemicalId: "naoh", amount: 50, unit: "mL", concentrationMolar: 0.1 },
          { chemicalId: "water", amount: 100, unit: "mL", concentrationMolar: 55.5 },
        ],
      });

    expect(res.status).toBe(200);
    expect(res.body.data.resolution.status).toBe("REACTION");
    expect(res.body.data.resolution.balancedEquation).toBe("HCl + NaOH → NaCl + H2O");
    expect(res.body.data.resolution.warnings.some((w: string) => w.includes("Spectator species"))).toBe(true);
  });

  it("aggregates duplicate chemical inputs in stoichiometry calculations", async () => {
    const res = await request(app)
      .post("/api/reactions/simulate")
      .send({
        reactants: [
          { chemicalId: "hcl", amount: 20, unit: "mL", concentrationMolar: 0.1 }, // 0.002 mol
          { chemicalId: "hcl", amount: 30, unit: "mL", concentrationMolar: 0.1 }, // 0.003 mol -> total 0.005 mol
          { chemicalId: "naoh", amount: 50, unit: "mL", concentrationMolar: 0.1 }, // 0.005 mol
        ],
      });

    expect(res.status).toBe(200);
    expect(res.body.data.resolution.status).toBe("REACTION");
    const hclLine = res.body.data.stoichiometry.find((l: { chemicalId: string }) => l.chemicalId === "hcl");
    expect(hclLine.inputMoles).toBeCloseTo(0.005, 6);
  });

  it("calculates exact temperature decrease for endothermic potassium nitrate dissolution", async () => {
    const res = await request(app)
      .post("/api/reactions/simulate")
      .send({
        reactants: [
          { chemicalId: "kno3", amount: 10, unit: "g" },
          { chemicalId: "water", amount: 100, unit: "mL" },
        ],
        conditions: { temperatureC: 25 },
      });

    expect(res.status).toBe(200);
    expect(res.body.data.resolution.status).toBe("REACTION");
    expect(res.body.data.calorimetry).toBeDefined();
    expect(res.body.data.calorimetry.temperatureDeltaC).toBeLessThan(0);
    expect(res.body.data.calorimetry.finalTemperatureC).toBeLessThan(25);

    const tempEffect = res.body.data.resolution.observableEffects.find(
      (e: { type: string }) => e.type === "temperature_decrease"
    );
    expect(tempEffect).toBeDefined();
    expect(tempEffect.temperatureDeltaC).toBeLessThan(0);
    expect(tempEffect.description).toContain("Temperature decreased by");
    expect(tempEffect.description).toContain("from 25.0 °C to");
  });

  it("calculates exact temperature decrease for ammonium nitrate dissolution (cold pack)", async () => {
    const res = await request(app)
      .post("/api/reactions/simulate")
      .send({
        reactants: [
          { chemicalId: "nh4no3", amount: 10, unit: "g" },
          { chemicalId: "water", amount: 100, unit: "mL" },
        ],
        conditions: { temperatureC: 25 },
      });

    expect(res.status).toBe(200);
    expect(res.body.data.resolution.status).toBe("REACTION");
    expect(res.body.data.resolution.confidenceTier).toBe("SUPPORTED");
    expect(res.body.data.calorimetry.temperatureDeltaC).toBeLessThan(0);
    expect(res.body.data.resolution.energyClassification).toBe("endothermic");
  });

  it("simulates copper(II) hydroxide precipitation from CuSO4 and NaOH", async () => {
    const res = await request(app)
      .post("/api/reactions/simulate")
      .send({
        reactants: [
          { chemicalId: "cuso4", amount: 20, unit: "mL", concentrationMolar: 0.1 },
          { chemicalId: "naoh", amount: 40, unit: "mL", concentrationMolar: 0.1 },
        ],
      });

    expect(res.status).toBe(200);
    expect(res.body.data.resolution.status).toBe("REACTION");
    expect(res.body.data.resolution.confidenceTier).toBe("SUPPORTED");
    expect(res.body.data.resolution.balancedEquation).toBe("CuSO4 + 2NaOH → Cu(OH)2 + Na2SO4");
    expect(res.body.data.resolution.observableEffects.some((e: { type: string }) => e.type === "precipitation")).toBe(true);
  });

  it("simulates silver tree displacement of silver by copper", async () => {
    const res = await request(app)
      .post("/api/reactions/simulate")
      .send({
        reactants: [
          { chemicalId: "cu", amount: 1, unit: "g" },
          { chemicalId: "agno3", amount: 50, unit: "mL", concentrationMolar: 0.1 },
        ],
      });

    expect(res.status).toBe(200);
    expect(res.body.data.resolution.status).toBe("REACTION");
    expect(res.body.data.resolution.confidenceTier).toBe("SUPPORTED");
    expect(res.body.data.resolution.balancedEquation).toBe("Cu + 2AgNO3 → Cu(NO3)2 + 2Ag");
    expect(res.body.data.resolution.netIonicEquation).toBe("Cu + 2Ag⁺ → Cu²⁺ + 2Ag(s)");
  });
});

describe("GET /api/reactions", () => {
  it("lists all curated reactions with complete details", async () => {
    const res = await request(app).get("/api/reactions?limit=200");
    expect(res.status).toBe(200);
    expect(res.body.data.length).toBeGreaterThanOrEqual(30);
    const rx = res.body.data.find((r: { id: string }) => r.id === "cuso4-naoh-precipitation");
    expect(rx).toBeDefined();
    expect(rx.equationDisplay).toBe("CuSO4 + 2NaOH → Cu(OH)2 + Na2SO4");
    expect(rx.enthalpyKjPerMol).toBe(-56.0);
    expect(rx.observableEffects.length).toBeGreaterThan(0);
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
