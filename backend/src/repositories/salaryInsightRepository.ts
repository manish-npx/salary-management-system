import { prisma } from "../config/prisma";

export type CountrySalaryRow = {
  country: string;
  employeeCount: number;
  minSalary: number;
  maxSalary: number;
  averageSalary: number;
};

export type JobTitleSalaryRow = {
  country: string;
  jobTitle: string;
  employeeCount: number;
  averageSalary: number;
};

export type DepartmentSalaryRow = {
  department: string;
  employeeCount: number;
  averageSalary: number;
};

export class SalaryInsightRepository {
  async getCountrySalaryRows(): Promise<CountrySalaryRow[]> {
    const rows = await prisma.employee.groupBy({
      by: ["country"],
      _count: { _all: true },
      _min: { salary: true },
      _max: { salary: true },
      _avg: { salary: true },
      orderBy: { country: "asc" }
    });

    return rows.map((row) => ({
      country: row.country,
      employeeCount: row._count._all,
      minSalary: row._min.salary ?? 0,
      maxSalary: row._max.salary ?? 0,
      averageSalary: Math.round(row._avg.salary ?? 0)
    }));
  }

  async getJobTitleSalaryRows(country?: string): Promise<JobTitleSalaryRow[]> {
    const rows = await prisma.employee.groupBy({
      by: ["country", "jobTitle"],
      where: country ? { country } : undefined,
      _count: { _all: true },
      _avg: { salary: true },
      orderBy: [{ country: "asc" }, { jobTitle: "asc" }]
    });

    return rows.map((row) => ({
      country: row.country,
      jobTitle: row.jobTitle,
      employeeCount: row._count._all,
      averageSalary: Math.round(row._avg.salary ?? 0)
    }));
  }

  async getTopDepartmentSalaryRows(limit: number): Promise<DepartmentSalaryRow[]> {
    const rows = await prisma.employee.groupBy({
      by: ["department"],
      _count: { _all: true },
      _avg: { salary: true },
      orderBy: { _avg: { salary: "desc" } },
      take: limit
    });

    return rows.map((row) => ({
      department: row.department,
      employeeCount: row._count._all,
      averageSalary: Math.round(row._avg.salary ?? 0)
    }));
  }

  async getSortedSalaries(country?: string): Promise<number[]> {
    const employees = await prisma.employee.findMany({
      where: country ? { country } : undefined,
      select: { salary: true },
      orderBy: { salary: "asc" }
    });

    return employees.map((employee) => employee.salary);
  }

  async countEmployees(): Promise<number> {
    return prisma.employee.count();
  }
}
