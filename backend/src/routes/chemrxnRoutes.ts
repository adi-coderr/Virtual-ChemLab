import { Router } from "express";
import { ChemrxnController } from "../controllers/chemrxnController.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export function chemrxnRoutes(): Router {
  const router = Router();
  const controller = new ChemrxnController();

  router.get("/reactions", asyncHandler(async (req, res) => controller.search(req, res)));
  router.get("/stats", asyncHandler(async (req, res) => controller.getStats(req, res)));
  router.post("/ingest", asyncHandler(async (req, res) => controller.ingest(req, res)));
  router.get("/reactions/:id", asyncHandler(async (req, res) => controller.getById(req, res)));
  router.post("/simulate/:id", asyncHandler(async (req, res) => controller.simulate(req, res)));

  return router;
}
