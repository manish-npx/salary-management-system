import { Router } from "express";
import {
  createEmployee,
  deleteEmployee,
  getEmployee,
  listEmployees,
  updateEmployee
} from "../controllers/employeeController";
import { asyncHandler } from "../middleware/asyncHandler";
import { validate } from "../middleware/validate";
import { idParamSchema } from "../validators/commonSchemas";
import { employeeCreateSchema, employeeListQuerySchema, employeeUpdateSchema } from "../validators/employeeSchemas";

export const employeeRoutes = Router();

employeeRoutes.get("/", validate(employeeListQuerySchema, "query"), asyncHandler(listEmployees));
employeeRoutes.get("/:id", validate(idParamSchema, "params"), asyncHandler(getEmployee));
employeeRoutes.post("/", validate(employeeCreateSchema, "body"), asyncHandler(createEmployee));
employeeRoutes.put("/:id", validate(idParamSchema, "params"), validate(employeeUpdateSchema, "body"), asyncHandler(updateEmployee));
employeeRoutes.delete("/:id", validate(idParamSchema, "params"), asyncHandler(deleteEmployee));
