import type { Request, Response } from "express";
import { chemrxnService } from "../services/chemrxnService.js";
import { HttpError } from "../utils/errors.js";

export class ChemrxnController {
  search = (req: Request, res: Response): void => {
    const q = req.query.q as string | undefined;
    const year = req.query.year ? parseInt(req.query.year as string, 10) : undefined;
    const era = req.query.era as string | undefined;
    const minYield = req.query.minYield ? parseFloat(req.query.minYield as string) : undefined;
    const reactant = req.query.reactant as string | undefined;
    const product = req.query.product as string | undefined;
    const productState = req.query.productState as string | undefined;
    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 25;
    const offset = req.query.offset ? parseInt(req.query.offset as string, 10) : 0;

    const result = chemrxnService.search({
      q,
      year,
      era,
      minYield,
      reactant,
      product,
      productState,
      limit,
      offset,
    });

    res.json({
      status: "ok",
      data: result.items,
      total: result.total,
      limit,
      offset,
    });
  };

  getById = (req: Request, res: Response): void => {
    const id = req.params.id as string;
    const reaction = chemrxnService.getById(id);
    if (!reaction) {
      throw HttpError.notFound("CHEMRXN_REACTION_NOT_FOUND", `No ChemRxn reaction with id "${id}".`);
    }
    res.json({ status: "ok", data: reaction });
  };

  simulate = (req: Request, res: Response): void => {
    const id = req.params.id as string;
    const reaction = chemrxnService.getById(id);
    if (!reaction) {
      throw HttpError.notFound("CHEMRXN_REACTION_NOT_FOUND", `No ChemRxn reaction with id "${id}".`);
    }

    const conditions = (req.body?.conditions as any) ?? {};
    const simulationResult = chemrxnService.simulateChemrxnReaction(reaction, conditions);
    res.json({ status: "ok", data: simulationResult });
  };

  getStats = (_req: Request, res: Response): void => {
    const stats = chemrxnService.getStats();
    res.json({ status: "ok", data: stats });
  };

  ingest = (req: Request, res: Response): void => {
    const { year, filePath, maxFiles } = req.body as {
      year?: number;
      filePath?: string;
      maxFiles?: number;
    };

    let count = 0;
    if (filePath && year) {
      count = chemrxnService.ingestFile(filePath, year);
    } else if (year) {
      count = chemrxnService.ingestYear(year, maxFiles ?? 2);
    } else {
      const result = chemrxnService.ensureInitialSeed();
      count = result.totalIndexed;
    }

    res.json({ status: "ok", count, totalIndexed: chemrxnService.getCount() });
  };
}
