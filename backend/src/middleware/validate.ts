import type { NextFunction, Request, Response } from "express";
import type { ZodSchema } from "zod";

type ValidationTarget = "body" | "query" | "params";

export const validate =
  (schema: ZodSchema, target: ValidationTarget) =>
  (request: Request, response: Response, next: NextFunction): void => {
    const result = schema.safeParse(request[target]);

    if (!result.success) {
      response.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.flatten()
      });
      return;
    }

    if (target === "query") {
      response.locals.validatedQuery = result.data;
    } else {
      request[target] = result.data;
    }

    next();
  };
