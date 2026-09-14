import { Router } from "express";
import type Database from "better-sqlite3";
import { ReactionController } from "../controllers/reactionController.js";
import { validate } from "../middleware/validateRequest.js";
import { balanceEquationRequestSchema, simulateReactionSchema, stoichiometryRequestSchema } from "../validation/schemas.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export function reactionRoutes(db: Database.Database): Router {
  const router = Router();
  const controller = new ReactionController(db);

  router.get("/", asyncHandler(async (req, res) => controller.list(req, res)));
  router.get("/:id", asyncHandler(async (req, res) => controller.getById(req, res)));
  router.post("/balance", validate(balanceEquationRequestSchema), asyncHandler(async (req, res) => controller.balance(req, res)));
  router.post("/simulate", validate(simulateReactionSchema), asyncHandler(async (req, res) => controller.simulate(req, res)));
  router.post("/stoichiometry", validate(stoichiometryRequestSchema), asyncHandler(async (req, res) => controller.stoichiometry(req, res)));

  return router;
}
