import type { NextFunction, Request, Response } from "express";
import { ChemistryEngineError } from "../chemistry-engine/types.js";
import { HttpError } from "../utils/errors.js";
import { logger } from "../utils/logger.js";
import type { ApiError } from "../types/api.js";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction): void {
  if (err instanceof HttpError) {
    logger.warn("Request failed", { path: req.path, code: err.code, message: err.message });
    const body: ApiError = { status: "error", code: err.code, message: err.message, details: err.details };
    res.status(err.statusCode).json(body);
    return;
  }

  if (err instanceof ChemistryEngineError) {
    logger.warn("Chemistry engine rejected input", { path: req.path, code: err.code, message: err.message });
    const body: ApiError = { status: "error", code: err.code, message: err.message, details: err.details };
    res.status(422).json(body);
    return;
  }

  const message = err instanceof Error ? err.message : "Unknown error";
  logger.error("Unhandled error", { path: req.path, message });
  const body: ApiError = { status: "error", code: "INTERNAL_ERROR", message: "An unexpected error occurred." };
  res.status(500).json(body);
}
