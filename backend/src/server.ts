import { getDb } from "./data/db.js";
import { seedDatabase } from "./data/seed/index.js";
import { createApp } from "./app.js";
import { getConfig } from "./config/env.js";
import { logger } from "./utils/logger.js";

const db = getDb();
seedDatabase(db);

const app = createApp(db);
const config = getConfig();

app.listen(config.port, () => {
  logger.info(`Virtual Chemistry Laboratory API listening on port ${config.port}`, { env: config.nodeEnv });
});
