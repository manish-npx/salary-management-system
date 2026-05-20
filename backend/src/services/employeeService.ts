import type { Employee } from "@prisma/client";
import type { EmployeeRepository } from "../repositories/employeeRepository";
import type { PaginatedResult } from "../types/pagination";
import { AppError } from "../utils/AppError";
import type { CreateEmployeeInput, EmployeeListQuery, UpdateEmployeeInput } from "../validators/employeeSchemas";

export class EmployeeService {
  constructor(private readonly repository: EmployeeRepository) {}

  async create(input: CreateEmployeeInput): Promise<Employee> {
    return this.repository.create(input);
  }

  async getById(id: string): Promise<Employee> {
    const employee = await this.repository.findById(id);

    if (!employee) {
      throw new AppError(404, "Employee not found");
    }

    return employee;
  }

  async list(query: EmployeeListQuery): Promise<PaginatedResult<Employee>> {
    return this.repository.list(query);
  }

  async update(id: string, input: UpdateEmployeeInput): Promise<Employee> {
    await this.getById(id);
    return this.repository.update(id, input);
  }

  async delete(id: string): Promise<void> {
    await this.getById(id);
    await this.repository.delete(id);
  }
}
