import { Router } from "express";
import type Database from "better-sqlite3";
import { ChemicalController } from "../controllers/chemicalController.js";
import { validate } from "../middleware/validateRequest.js";
import { chemicalSearchQuerySchema, chemicalListQuerySchema } from "../validation/schemas.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export function chemicalRoutes(db: Database.Database): Router {
  const router = Router();
  const controller = new ChemicalController(db);

  // IMPORTANT: /search must be registered before /:id, or "search" would be captured as an :id param.
  router.get("/search", validate(chemicalSearchQuerySchema, "query"), asyncHandler(async (req, res) => controller.search(req, res)));
  router.get("/", validate(chemicalListQuerySchema, "query"), asyncHandler(async (req, res) => controller.list(req, res)));
  router.get("/:id", asyncHandler(async (req, res) => controller.getById(req, res)));

  return router;
}
