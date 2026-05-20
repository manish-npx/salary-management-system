import type { Request, Response } from "express";
import { EmployeeRepository } from "../repositories/employeeRepository";
import { EmployeeService } from "../services/employeeService";
import type { EmployeeListQuery } from "../validators/employeeSchemas";

const service = new EmployeeService(new EmployeeRepository());

export const listEmployees = async (request: Request, response: Response): Promise<void> => {
  const query = (response.locals.validatedQuery ?? request.query) as EmployeeListQuery;
  const result = await service.list(query);
  response.json({ success: true, ...result });
};

export const getEmployee = async (request: Request, response: Response): Promise<void> => {
  const employee = await service.getById(String(request.params.id));
  response.json({ success: true, data: employee });
};

export const createEmployee = async (request: Request, response: Response): Promise<void> => {
  const employee = await service.create(request.body);
  response.status(201).json({ success: true, data: employee });
};

export const updateEmployee = async (request: Request, response: Response): Promise<void> => {
  const employee = await service.update(String(request.params.id), request.body);
  response.json({ success: true, data: employee });
};

export const deleteEmployee = async (request: Request, response: Response): Promise<void> => {
  await service.delete(String(request.params.id));
  response.status(204).send();
};
