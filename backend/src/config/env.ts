import "dotenv/config";
import path from "node:path";

export interface AppConfig {
  port: number;
  databaseFile: string;
  corsOrigin: string;
  nodeEnv: "development" | "production" | "test";
  anthropicApiKey?: string;
}

let cached: AppConfig | undefined;

export function getConfig(): AppConfig {
  if (cached) return cached;

  const nodeEnv = (process.env.NODE_ENV as AppConfig["nodeEnv"]) || "development";
  cached = {
    port: Number(process.env.PORT ?? 4000),
    databaseFile:
      process.env.DATABASE_FILE ?? (nodeEnv === "test" ? ":memory:" : path.join(process.cwd(), "data", "chemlab.db")),
    corsOrigin: process.env.CORS_ORIGIN ?? "http://localhost:5173",
    nodeEnv,
    anthropicApiKey: process.env.ANTHROPIC_API_KEY,
  };
  return cached;
}
