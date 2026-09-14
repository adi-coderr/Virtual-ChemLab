import fs from "node:fs";
import { getConfig } from "../config/env.js";
import { logger } from "../utils/logger.js";
import { getDb } from "./db.js";
import { seedDatabase } from "./seed/index.js";

const config = getConfig();

if (config.databaseFile !== ":memory:" && fs.existsSync(config.databaseFile)) {
  fs.rmSync(config.databaseFile);
  for (const suffix of ["-wal", "-shm"]) {
    const sidecar = config.databaseFile + suffix;
    if (fs.existsSync(sidecar)) fs.rmSync(sidecar);
  }
  logger.info(`Removed existing database file at ${config.databaseFile}`);
}

const db = getDb();
seedDatabase(db);
logger.info("Database reset and reseeded.");
db.close();
