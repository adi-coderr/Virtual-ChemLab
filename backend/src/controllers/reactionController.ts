import type { Request, Response } from "express";
import type Database from "better-sqlite3";
import { ReactionService } from "../services/reactionService.js";
import { SimulationService } from "../services/simulationService.js";
import { ChemicalService } from "../services/chemicalService.js";
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
    const { limit, offset } = req.query as unknown as { limit: number; offset: number };
    const result = this.reactionService.list(limit ?? 50, offset ?? 0);
    res.json({ status: "ok", data: result.items, total: result.total });
  };

  balance = (req: Request, res: Response): void => {
    const { reactants, products } = req.body as { reactants: string[]; products: string[] };
    const result = this.reactionService.balance(reactants, products);
    res.json({ status: "ok", data: result });
  };

  simulate = (req: Request, res: Response): void => {
    const { reactants, conditions } = req.body as {
      reactants: Parameters<SimulationService["simulate"]>[0];
      conditions?: Parameters<SimulationService["simulate"]>[1];
    };
    const result = this.simulationService.simulate(reactants, conditions ?? {});
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
