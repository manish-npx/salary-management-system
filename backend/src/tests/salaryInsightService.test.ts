import { EmployeeRepository } from "../repositories/employeeRepository";
import { SalaryInsightRepository } from "../repositories/salaryInsightRepository";
import { SalaryInsightService } from "../services/salaryInsightService";
import { buildEmployeeInput } from "./helpers/employeeFactory";

describe("SalaryInsightService", () => {
  const employeeRepository = new EmployeeRepository();
  const service = new SalaryInsightService(new SalaryInsightRepository());

  beforeEach(async () => {
    const employees = [
      buildEmployeeInput({
        employeeCode: "EMP-0001",
        email: "a@example.com",
        fullName: "A One",
        country: "India",
        jobTitle: "Frontend Engineer",
        department: "Engineering",
        salary: 3000000
      }),
      buildEmployeeInput({
        employeeCode: "EMP-0002",
        email: "b@example.com",
        fullName: "B Two",
        country: "India",
        jobTitle: "Frontend Engineer",
        department: "Engineering",
        salary: 5000000
      }),
      buildEmployeeInput({
        employeeCode: "EMP-0003",
        email: "c@example.com",
        fullName: "C Three",
        country: "India",
        jobTitle: "Backend Engineer",
        department: "Platform",
        salary: 7000000
      }),
      buildEmployeeInput({
        employeeCode: "EMP-0004",
        email: "d@example.com",
        fullName: "D Four",
        country: "United States",
        jobTitle: "Product Manager",
        department: "Product",
        salary: 150000
      })
    ];

    await Promise.all(employees.map((employee) => employeeRepository.create(employee)));
  });

  it("summarizes salary metrics by country", async () => {
    const insights = await service.getCountryInsights();

    expect(insights).toContainEqual({
      country: "India",
      employeeCount: 3,
      minSalary: 3000000,
      maxSalary: 7000000,
      averageSalary: 5000000,
      medianSalary: 5000000
    });
  });

  it("calculates average salary by job title within a country", async () => {
    const insights = await service.getJobTitleInsights("India");

    expect(insights).toEqual([
      {
        country: "India",
        jobTitle: "Backend Engineer",
        employeeCount: 1,
        averageSalary: 7000000
      },
      {
        country: "India",
        jobTitle: "Frontend Engineer",
        employeeCount: 2,
        averageSalary: 4000000
      }
    ]);
  });

  it("builds dashboard metrics for cards and charts", async () => {
    const dashboard = await service.getDashboard();

    expect(dashboard.totalEmployeeCount).toBe(4);
    expect(dashboard.medianSalary).toBe(4000000);
    expect(dashboard.topPaidDepartments[0]).toEqual({
      department: "Platform",
      employeeCount: 1,
      averageSalary: 7000000
    });
    expect(dashboard.salaryDistribution).toEqual([
      { label: "0-100k", count: 0 },
      { label: "100k-250k", count: 1 },
      { label: "250k-500k", count: 0 },
      { label: "500k-1m", count: 0 },
      { label: "1m+", count: 3 }
    ]);
  });
});
