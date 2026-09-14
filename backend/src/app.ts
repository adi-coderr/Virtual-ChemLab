import express, { type Express } from "express";
import cors from "cors";
import type Database from "better-sqlite3";
import { apiRouter } from "./routes/index.js";
import { requestLogger } from "./middleware/requestLogger.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { getConfig } from "./config/env.js";

export function createApp(db: Database.Database): Express {
  const app = express();
  const config = getConfig();

  app.use(cors({ origin: config.corsOrigin }));
  app.use(express.json({ limit: "1mb" }));
  app.use(requestLogger);

  app.use("/api", apiRouter(db));

  app.use((req, res) => {
    res.status(404).json({ status: "error", code: "NOT_FOUND", message: `No route for ${req.method} ${req.path}` });
  });

  app.use(errorHandler);

  return app;
}
