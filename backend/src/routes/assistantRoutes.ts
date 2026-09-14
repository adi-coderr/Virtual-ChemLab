import { Router } from "express";
import type Database from "better-sqlite3";
import { AssistantController } from "../controllers/assistantController.js";
import { validate } from "../middleware/validateRequest.js";
import { assistantParseSchema } from "../validation/schemas.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export function assistantRoutes(db: Database.Database): Router {
  const router = Router();
  const controller = new AssistantController(db);

  router.post("/parse", validate(assistantParseSchema), asyncHandler(async (req, res) => controller.parse(req, res)));

  return router;
}
