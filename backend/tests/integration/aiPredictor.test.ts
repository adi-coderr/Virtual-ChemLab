import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import { createApp } from "../../src/app.js";
import { getDb } from "../../src/data/db.js";
import { seedDatabase } from "../../src/data/seed/index.js";
import { aiReactionPredictor } from "../../src/services/aiReactionPredictor.js";

describe("AI Reaction Prediction Endpoints", () => {
  const db = getDb();
  seedDatabase(db);
  const app = createApp(db);

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("GET /api/reactions/ai-status returns server configuration", async () => {
    const res = await request(app).get("/api/reactions/ai-status");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
    expect(res.body.data).toHaveProperty("serverKeysConfigured");
    expect(res.body.data).toHaveProperty("defaultProvider");
  });

  it("POST /api/reactions/test-key validates missing/invalid key", async () => {
    const res = await request(app)
      .post("/api/reactions/test-key")
      .send({ provider: "gemini", apiKey: "invalid_test_key_123" });
    expect(res.status).toBe(200);
    expect(res.body.data.valid).toBe(false);
  });

  it("POST /api/reactions/predict returns curated reaction when query matches DB", async () => {
    const res = await request(app)
      .post("/api/reactions/predict")
      .send({ query: "Sabatier" });
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
    expect(res.body.data.source).toBe("curated_database");
    expect(res.body.data.simulationResult.resolution.status).toBe("REACTION");
    expect(res.body.data.simulationResult.resolution.balancedEquation).toBeDefined();
  });

  it("POST /api/reactions/predict invokes AI predictor when query is not in DB", async () => {
    vi.spyOn(aiReactionPredictor, "predict").mockResolvedValueOnce({
      status: "REACTION",
      confidenceTier: "PREDICTED",
      confidenceScore: 0.95,
      reactionType: "redox_other",
      balancedEquation: "2KMnO4 + 3H2SO4 + 5H2O2 → K2SO4 + 2MnSO4 + 8H2O + 5O2",
      reactants: [
        { chemicalId: "kmno4", formula: "KMnO4", commonName: "Potassium permanganate", coefficient: 2, isRegistered: false },
        { chemicalId: "h2so4", formula: "H2SO4", commonName: "Sulfuric acid", coefficient: 3, isRegistered: false },
        { chemicalId: "h2o2", formula: "H2O2", commonName: "Hydrogen peroxide", coefficient: 5, isRegistered: false },
      ],
      products: [
        { chemicalId: "k2so4", formula: "K2SO4", commonName: "Potassium sulfate", coefficient: 1, isRegistered: false },
        { chemicalId: "mnso4", formula: "MnSO4", commonName: "Manganese(II) sulfate", coefficient: 2, isRegistered: false },
        { chemicalId: "water", formula: "H2O", commonName: "Water", coefficient: 8, isRegistered: false },
        { chemicalId: "o2", formula: "O2", commonName: "Oxygen", coefficient: 5, isRegistered: false },
      ],
      observableEffects: [
        { type: "color_change", description: "Purple solution turns colorless", colorFrom: "#800080", colorTo: "#FFFFFF" },
        { type: "gas_evolution", description: "Vigorous evolution of oxygen gas" },
      ],
      energyClassification: "exothermic",
      enthalpyKjPerMol: -840,
      explanation: "Permanganate oxidizes hydrogen peroxide to oxygen gas while being reduced to Mn2+.",
      ruleApplied: "ai_predicted:gemini",
      warnings: ["Dynamically predicted by Google Gemini."],
      aiProvider: "Google Gemini",
      isAiPredicted: true,
    });

    const res = await request(app)
      .post("/api/reactions/predict")
      .send({
        query: "KMnO4 + H2O2 + H2SO4",
        apiKey: "fake_gemini_key",
        provider: "gemini",
      });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
    expect(res.body.data.source).toBe("ai_predicted");
    expect(res.body.data.simulationResult.resolution.aiProvider).toBe("Google Gemini");
    expect(res.body.data.simulationResult.resolution.isAiPredicted).toBe(true);
    expect(res.body.data.simulationResult.resolution.balancedEquation).toContain("KMnO4");
  });
});
