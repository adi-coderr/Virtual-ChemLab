import type { NextFunction, Request, Response } from "express";
import type { ZodSchema } from "zod";
import { HttpError } from "../utils/errors.js";

type Target = "body" | "query" | "params";

export function validate(schema: ZodSchema, target: Target = "body") {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req[target]);
    if (!result.success) {
      next(
        HttpError.badRequest("VALIDATION_ERROR", `Invalid ${target}: ${result.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ")}`, {
          issues: result.error.issues,
        })
      );
      return;
    }
    (req as unknown as Record<Target, unknown>)[target] = result.data;
    next();
  };
}
