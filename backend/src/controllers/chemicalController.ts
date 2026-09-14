import type { Request, Response } from "express";
import type Database from "better-sqlite3";
import { ChemicalService } from "../services/chemicalService.js";

export class ChemicalController {
  private readonly service: ChemicalService;

  constructor(db: Database.Database) {
    this.service = new ChemicalService(db);
  }

  getById = (req: Request, res: Response): void => {
    const chemical = this.service.getById(req.params.id as string);
    res.json({ status: "ok", data: chemical });
  };

  search = (req: Request, res: Response): void => {
    const { q, limit, offset } = req.query as unknown as { q: string; limit: number; offset: number };
    const result = this.service.search(q, limit, offset);
    res.json({ status: "ok", data: result.items, total: result.total });
  };

  list = (req: Request, res: Response): void => {
    const { limit, offset, chemicalClass } = req.query as unknown as { limit: number; offset: number; chemicalClass?: string };
    const result = this.service.list(limit, offset, chemicalClass);
    res.json({ status: "ok", data: result.items, total: result.total });
  };
}
