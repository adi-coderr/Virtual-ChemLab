import { Router } from "express";
import type Database from "better-sqlite3";
import { chemicalRoutes } from "./chemicalRoutes.js";
import { reactionRoutes } from "./reactionRoutes.js";
import { experimentRoutes } from "./experimentRoutes.js";
import { assistantRoutes } from "./assistantRoutes.js";

export function apiRouter(db: Database.Database): Router {
  const router = Router();

  router.get("/health", (_req, res) => {
    res.json({ status: "ok", engineVersion: "0.1.0" });
  });

  router.use("/chemicals", chemicalRoutes(db));
  router.use("/reactions", reactionRoutes(db));
  router.use("/experiments", experimentRoutes(db));
  router.use("/assistant", assistantRoutes(db));

  return router;
}
