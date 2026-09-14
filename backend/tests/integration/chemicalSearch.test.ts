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

describe("GET /api/chemicals/search", () => {
  it("finds a chemical by common name", async () => {
    const res = await request(app).get("/api/chemicals/search").query({ q: "sodium chloride" });
    expect(res.status).toBe(200);
    expect(res.body.data.some((c: { id: string }) => c.id === "nacl")).toBe(true);
  });

  it("finds a chemical by formula", async () => {
    const res = await request(app).get("/api/chemicals/search").query({ q: "NaOH" });
    expect(res.status).toBe(200);
    expect(res.body.data.some((c: { id: string }) => c.id === "naoh")).toBe(true);
  });

  it("finds a chemical by CAS number (the exact example from the product brief)", async () => {
    const res = await request(app).get("/api/chemicals/search").query({ q: "7647-14-5" });
    expect(res.status).toBe(200);
    expect(res.body.data.some((c: { id: string }) => c.id === "nacl")).toBe(true);
  });

  it("finds a chemical by common alias ('salt')", async () => {
    const res = await request(app).get("/api/chemicals/search").query({ q: "salt" });
    expect(res.status).toBe(200);
    expect(res.body.data.some((c: { id: string }) => c.id === "nacl")).toBe(true);
  });

  it("rejects a missing query parameter", async () => {
    const res = await request(app).get("/api/chemicals/search");
    expect(res.status).toBe(400);
  });
});

describe("GET /api/chemicals/:id", () => {
  it("returns 404 for an unknown chemical", async () => {
    const res = await request(app).get("/api/chemicals/not-a-real-chemical");
    expect(res.status).toBe(404);
    expect(res.body.code).toBe("CHEMICAL_NOT_FOUND");
  });
});

describe("Experiment lifecycle", () => {
  it("creates an experiment, appends actions, runs a reaction, and resets", async () => {
    const created = await request(app).post("/api/experiments").send({ name: "Integration test" });
    expect(created.status).toBe(201);
    const experimentId = created.body.data.id;

    const addHcl = await request(app)
      .post(`/api/experiments/${experimentId}/actions`)
      .send({ actionType: "ADD_CHEMICAL", payload: { chemicalId: "hcl", amount: 20, unit: "mL", concentrationMolar: 1 } });
    expect(addHcl.status).toBe(201);

    const addNaoh = await request(app)
      .post(`/api/experiments/${experimentId}/actions`)
      .send({ actionType: "ADD_CHEMICAL", payload: { chemicalId: "naoh", amount: 20, unit: "mL", concentrationMolar: 1 } });
    expect(addNaoh.status).toBe(201);

    const run = await request(app)
      .post(`/api/experiments/${experimentId}/actions`)
      .send({
        actionType: "RUN_REACTION",
        payload: {
          reactants: [
            { chemicalId: "hcl", amount: 20, unit: "mL", concentrationMolar: 1 },
            { chemicalId: "naoh", amount: 20, unit: "mL", concentrationMolar: 1 },
          ],
        },
      });
    expect(run.status).toBe(201);
    expect(run.body.data.simulationResult.resolution.confidenceTier).toBe("SUPPORTED");

    const fetched = await request(app).get(`/api/experiments/${experimentId}`);
    expect(fetched.body.data.actions.length).toBe(3);

    const reset = await request(app).post(`/api/experiments/${experimentId}/reset`);
    expect(reset.status).toBe(200);
    expect(reset.body.data.actions.length).toBe(0);
  });

  it("rejects an action type outside the allowlist", async () => {
    const created = await request(app).post("/api/experiments").send({});
    const experimentId = created.body.data.id;

    const res = await request(app)
      .post(`/api/experiments/${experimentId}/actions`)
      .send({ actionType: "EXECUTE_SQL", payload: { query: "DROP TABLE chemicals" } });

    expect(res.status).toBe(400);
    expect(res.body.code).toBe("VALIDATION_ERROR");
  });

  it("rejects ADD_CHEMICAL with a missing amount", async () => {
    const created = await request(app).post("/api/experiments").send({});
    const experimentId = created.body.data.id;

    const res = await request(app)
      .post(`/api/experiments/${experimentId}/actions`)
      .send({ actionType: "ADD_CHEMICAL", payload: { chemicalId: "hcl", unit: "mL" } });

    expect(res.status).toBe(400);
  });

  it("returns 404 for actions on a nonexistent experiment", async () => {
    const res = await request(app)
      .post("/api/experiments/does-not-exist/actions")
      .send({ actionType: "MIX", payload: {} });
    expect(res.status).toBe(404);
  });
});

describe("POST /api/assistant/parse", () => {
  it("proposes a validated ADD_CHEMICAL action from natural language", async () => {
    const res = await request(app).post("/api/assistant/parse").send({ text: "Add 20 ml of hydrochloric acid." });
    expect(res.status).toBe(200);
    expect(res.body.data[0].kind).toBe("proposed_action");
    expect(res.body.data[0].payload.chemicalId).toBe("hcl");
  });

  it("answers a question using a real completed reaction", async () => {
    const created = await request(app).post("/api/experiments").send({});
    const experimentId = created.body.data.id;
    await request(app)
      .post(`/api/experiments/${experimentId}/actions`)
      .send({
        actionType: "RUN_REACTION",
        payload: {
          reactants: [
            { chemicalId: "agno3", amount: 0.01, unit: "mol" },
            { chemicalId: "nacl", amount: 0.01, unit: "mol" },
          ],
        },
      });

    const res = await request(app).post("/api/assistant/parse").send({ text: "Why did this precipitate form?", experimentId });
    expect(res.status).toBe(200);
    expect(res.body.data[0].kind).toBe("answer");
    expect(res.body.data[0].text).toMatch(/silver chloride|AgCl/i);
  });

  it("asks for clarification on an unrecognized chemical name", async () => {
    const res = await request(app).post("/api/assistant/parse").send({ text: "Add 10 mL of unobtainium-hydride" });
    expect(res.status).toBe(200);
    expect(res.body.data[0].kind).toBe("clarification_needed");
  });
});
