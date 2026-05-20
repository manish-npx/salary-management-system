import type { Employee, Prisma } from "@prisma/client";
import { prisma } from "../config/prisma";
import type { PaginatedResult } from "../types/pagination";
import type { CreateEmployeeInput, EmployeeListQuery, UpdateEmployeeInput } from "../validators/employeeSchemas";

const toEmployeeCreateData = (input: CreateEmployeeInput): Prisma.EmployeeCreateInput => ({
  ...input,
  dateOfJoining: new Date(input.dateOfJoining)
});

const toEmployeeUpdateData = (input: UpdateEmployeeInput): Prisma.EmployeeUpdateInput => ({
  ...input,
  dateOfJoining: input.dateOfJoining ? new Date(input.dateOfJoining) : undefined
});

const buildWhere = (query: Partial<EmployeeListQuery>): Prisma.EmployeeWhereInput => {
  const filters: Prisma.EmployeeWhereInput[] = [];

  if (query.country) {
    filters.push({ country: query.country });
  }

  if (query.jobTitle) {
    filters.push({ jobTitle: query.jobTitle });
  }

  if (query.department) {
    filters.push({ department: query.department });
  }

  if (query.search) {
    filters.push({
      OR: [
        { fullName: { contains: query.search } },
        { email: { contains: query.search } },
        { employeeCode: { contains: query.search } }
      ]
    });
  }

  return filters.length > 0 ? { AND: filters } : {};
};

export class EmployeeRepository {
  async create(input: CreateEmployeeInput): Promise<Employee> {
    return prisma.employee.create({ data: toEmployeeCreateData(input) });
  }

  async findById(id: string): Promise<Employee | null> {
    return prisma.employee.findUnique({ where: { id } });
  }

  async list(query: Partial<EmployeeListQuery> = {}): Promise<PaginatedResult<Employee>> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const sortBy = query.sortBy ?? "createdAt";
    const order = query.order ?? "desc";
    const where = buildWhere(query);

    const [data, total] = await prisma.$transaction([
      prisma.employee.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { [sortBy]: order }
      }),
      prisma.employee.count({ where })
    ]);

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async update(id: string, input: UpdateEmployeeInput): Promise<Employee> {
    return prisma.employee.update({ where: { id }, data: toEmployeeUpdateData(input) });
  }

  async delete(id: string): Promise<void> {
    await prisma.employee.delete({ where: { id } });
  }
}
