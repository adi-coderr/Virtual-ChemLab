import type { Request, Response } from "express";
import type Database from "better-sqlite3";
import { ExperimentService } from "../services/experimentService.js";

export class ExperimentController {
  private readonly service: ExperimentService;

  constructor(db: Database.Database) {
    this.service = new ExperimentService(db);
  }

  create = (req: Request, res: Response): void => {
    const { name } = req.body as { name?: string };
    const experiment = this.service.create(name);
    res.status(201).json({ status: "ok", data: experiment });
  };

  getById = (req: Request, res: Response): void => {
    const experiment = this.service.getById(req.params.id as string);
    res.json({ status: "ok", data: experiment });
  };

  list = (req: Request, res: Response): void => {
    const { limit, offset } = req.query as unknown as { limit?: number; offset?: number };
    const result = this.service.list(limit ?? 20, offset ?? 0);
    res.json({ status: "ok", data: result.items, total: result.total });
  };

  addAction = async (req: Request, res: Response): Promise<void> => {
    const { actionType, payload } = req.body as { actionType: Parameters<ExperimentService["applyAction"]>[1]; payload: Record<string, unknown> };
    const apiKey = (req.headers["x-api-key"] as string) || (payload?.apiKey as string);
    const provider = (req.headers["x-provider"] as any) || (payload?.provider as any);
    const result = await this.service.applyAction(req.params.id as string, actionType, payload, { apiKey, provider });
    res.status(201).json({ status: "ok", data: result });
  };

  reset = (req: Request, res: Response): void => {
    const experiment = this.service.reset(req.params.id as string);
    res.json({ status: "ok", data: experiment });
  };
}
