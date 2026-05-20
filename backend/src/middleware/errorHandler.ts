import { Prisma } from "@prisma/client";
import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { AppError } from "../utils/AppError";

export const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  if (error instanceof AppError) {
    response.status(error.statusCode).json({ success: false, message: error.message });
    return;
  }

  if (error instanceof ZodError) {
    response.status(400).json({ success: false, message: "Validation failed", errors: error.flatten() });
    return;
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
    response.status(404).json({ success: false, message: "Employee not found" });
    return;
  }

  response.status(500).json({ success: false, message: "Internal server error" });
};
