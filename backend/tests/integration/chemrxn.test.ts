import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";
import { createApp } from "../../src/app.js";
import { getDb } from "../../src/data/db.js";
import { chemrxnService } from "../../src/services/chemrxnService.js";

describe("ChemRxn Patent Reactions API", () => {
  let app: ReturnType<typeof createApp>;

  beforeAll(() => {
    const db = getDb();
    chemrxnService.ensureInitialSeed(1);
    app = createApp(db);
  });

  it("GET /api/chemrxn/stats returns database statistics", async () => {
    const res = await request(app).get("/api/chemrxn/stats");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
    expect(res.body.data.totalIndexed).toBeGreaterThan(1000);
    expect(res.body.data.yearsCovered).toBeGreaterThan(30);
  });

  it("GET /api/chemrxn/reactions searches reactions by keyword", async () => {
    const res = await request(app).get("/api/chemrxn/reactions?q=benzene&limit=5");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.total).toBeGreaterThan(0);
  });

  it("GET /api/chemrxn/reactions supports filtering by year and yield", async () => {
    const res = await request(app).get("/api/chemrxn/reactions?year=2000&minYield=80&limit=5");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
    if (res.body.data.length > 0) {
      expect(res.body.data[0].year).toBe(2000);
      expect(res.body.data[0].yieldPercent).toBeGreaterThanOrEqual(80);
    }
  });

  it("POST /api/chemrxn/simulate/:id simulates a ChemRxn reaction", async () => {
    const listRes = await request(app).get("/api/chemrxn/reactions?limit=1");
    const rxn = listRes.body.data[0];
    expect(rxn).toBeDefined();

    const simRes = await request(app).post(`/api/chemrxn/simulate/${rxn.id}`).send({});
    expect(simRes.status).toBe(200);
    expect(simRes.body.status).toBe("ok");
    expect(simRes.body.data.resolution.status).toBe("REACTION");
    expect(simRes.body.data.resolution.confidenceTier).toBe("SUPPORTED");
    expect(simRes.body.data.resolution.reference).toContain(rxn.documentId);
  });
});
