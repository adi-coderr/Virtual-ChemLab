import type { Request, Response } from "express";
import type Database from "better-sqlite3";
import { ReactionService } from "../services/reactionService.js";
import { SimulationService } from "../services/simulationService.js";
import { ChemicalService } from "../services/chemicalService.js";
import { aiReactionPredictor } from "../services/aiReactionPredictor.js";
import { getConfig } from "../config/env.js";
import { computeStoichiometry, computePercentageYield } from "../chemistry-engine/stoichiometry.js";

export class ReactionController {
  private readonly reactionService: ReactionService;
  private readonly simulationService: SimulationService;
  private readonly chemicalService: ChemicalService;

  constructor(db: Database.Database) {
    this.reactionService = new ReactionService(db);
    this.simulationService = new SimulationService(db);
    this.chemicalService = new ChemicalService(db);
  }

  getById = (req: Request, res: Response): void => {
    const reaction = this.reactionService.getById(req.params.id as string);
    res.json({ status: "ok", data: reaction });
  };

  list = (req: Request, res: Response): void => {
    const limit = req.query.limit !== undefined ? Number(req.query.limit) : 200;
    const offset = req.query.offset !== undefined ? Number(req.query.offset) : 0;
    const result = this.reactionService.list(limit, offset);
    res.json({ status: "ok", data: result.items, total: result.total });
  };

  balance = (req: Request, res: Response): void => {
    const { reactants, products } = req.body as { reactants: string[]; products: string[] };
    const result = this.reactionService.balance(reactants, products);
    res.json({ status: "ok", data: result });
  };

  simulate = async (req: Request, res: Response): Promise<void> => {
    const { reactants, conditions } = req.body as {
      reactants: Parameters<SimulationService["simulate"]>[0];
      conditions?: Parameters<SimulationService["simulate"]>[1];
    };
    const apiKey = (req.headers["x-api-key"] as string) || (req.body?.apiKey as string);
    const provider = (req.headers["x-provider"] as any) || (req.body?.provider as any);
    const result = await this.simulationService.simulateWithAi(reactants, conditions ?? {}, { apiKey, provider });
    res.json({ status: "ok", data: result });
  };

  predict = async (req: Request, res: Response): Promise<void> => {
    const { query, conditions, apiKey, provider } = req.body as {
      query: string;
      conditions?: any;
      apiKey?: string;
      provider?: any;
    };
    const resolvedApiKey = (req.headers["x-api-key"] as string) || apiKey;
    const resolvedProvider = (req.headers["x-provider"] as any) || provider;
    const result = await this.simulationService.predictAny(query, conditions ?? {}, {
      apiKey: resolvedApiKey,
      provider: resolvedProvider,
    });
    res.json({ status: "ok", data: result });
  };

  getAiStatus = (_req: Request, res: Response): void => {
    const config = getConfig();
    res.json({
      status: "ok",
      data: {
        serverKeysConfigured: {
          gemini: !!config.geminiApiKey,
          openai: !!config.openaiApiKey,
          anthropic: !!config.anthropicApiKey,
        },
        defaultProvider: config.defaultAiProvider || "gemini",
      },
    });
  };

  testKey = async (req: Request, res: Response): Promise<void> => {
    const { provider, apiKey } = req.body as { provider: any; apiKey: string };
    const result = await aiReactionPredictor.testApiKey(provider, apiKey);
    res.json({ status: "ok", data: result });
  };

  stoichiometry = (req: Request, res: Response): void => {
    const { reactionId, reactantAmounts, actualYieldMassGrams } = req.body as {
      reactionId: string;
      reactantAmounts: Parameters<SimulationService["simulate"]>[0];
      actualYieldMassGrams?: number;
    };
    const reaction = this.reactionService.getById(reactionId);

    const reactantInfos = reaction.reactants.map((r) => {
      const chem = this.chemicalService.getById(r.chemicalId);
      return { chemicalId: chem.id, formula: chem.formula, commonName: chem.commonName, coefficient: r.coefficient, molarMass: chem.molarMass };
    });
    const productInfos = reaction.products.map((p) => {
      const chem = this.chemicalService.getById(p.chemicalId);
      return {
        chemicalId: chem.id,
        formula: chem.formula,
        commonName: chem.commonName,
        coefficient: p.coefficient,
        molarMass: chem.molarMass,
        isByproduct: p.isByproduct,
      };
    });

    const result = computeStoichiometry(reactantInfos, productInfos, reactantAmounts);

    let percentageYield: number | undefined;
    if (actualYieldMassGrams !== undefined) {
      const mainProduct = result.lines.find((l) => l.role === "product");
      if (mainProduct?.theoreticalYieldMass) {
        percentageYield = computePercentageYield(mainProduct.theoreticalYieldMass, actualYieldMassGrams);
      }
    }

    res.json({ status: "ok", data: { ...result, percentageYield } });
  };
}
