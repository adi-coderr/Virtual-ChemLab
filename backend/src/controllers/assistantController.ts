import type { Request, Response } from "express";
import type Database from "better-sqlite3";
import { AssistantService } from "../services/assistantService.js";

export class AssistantController {
  private readonly service: AssistantService;

  constructor(db: Database.Database) {
    this.service = new AssistantService(db);
  }

  parse = async (req: Request, res: Response): Promise<void> => {
    const { text, experimentId } = req.body as { text: string; experimentId?: string };
    const responses = await this.service.handle(text, experimentId);
    res.json({ status: "ok", data: responses, provider: this.service.providerName });
  };
}
