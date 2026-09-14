import { Router } from "express";
import type Database from "better-sqlite3";
import { ExperimentController } from "../controllers/experimentController.js";
import { validate } from "../middleware/validateRequest.js";
import { createExperimentSchema, experimentActionSchema } from "../validation/schemas.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export function experimentRoutes(db: Database.Database): Router {
  const router = Router();
  const controller = new ExperimentController(db);

  router.post("/", validate(createExperimentSchema), asyncHandler(async (req, res) => controller.create(req, res)));
  router.get("/", asyncHandler(async (req, res) => controller.list(req, res)));
  router.get("/:id", asyncHandler(async (req, res) => controller.getById(req, res)));
  router.post("/:id/actions", validate(experimentActionSchema), asyncHandler(async (req, res) => controller.addAction(req, res)));
  router.post("/:id/reset", asyncHandler(async (req, res) => controller.reset(req, res)));

  return router;
}
