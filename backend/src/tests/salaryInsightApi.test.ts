import request from "supertest";
import { app } from "../app";
import { EmployeeRepository } from "../repositories/employeeRepository";
import { buildEmployeeInput } from "./helpers/employeeFactory";

describe("Salary Insight API", () => {
  const repository = new EmployeeRepository();

  beforeEach(async () => {
    await repository.create(buildEmployeeInput({ employeeCode: "EMP-0001", email: "a@example.com", country: "India", jobTitle: "Frontend Engineer", department: "Engineering", salary: 3000000 }));
    await repository.create(buildEmployeeInput({ employeeCode: "EMP-0002", email: "b@example.com", country: "India", jobTitle: "Frontend Engineer", department: "Engineering", salary: 5000000 }));
    await repository.create(buildEmployeeInput({ employeeCode: "EMP-0003", email: "c@example.com", country: "United States", jobTitle: "Product Manager", department: "Product", salary: 150000 }));
  });

  it("returns dashboard metrics", async () => {
    const response = await request(app).get("/api/insights/dashboard").expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data.totalEmployeeCount).toBe(3);
    expect(response.body.data.salaryDistribution).toEqual(expect.any(Array));
  });

  it("returns country salary insights", async () => {
    const response = await request(app).get("/api/insights/country").expect(200);

    expect(response.body.data).toContainEqual({
      country: "India",
      employeeCount: 2,
      minSalary: 3000000,
      maxSalary: 5000000,
      averageSalary: 4000000,
      medianSalary: 4000000
    });
  });

  it("returns job title insights filtered by country", async () => {
    const response = await request(app).get("/api/insights/job-title").query({ country: "India" }).expect(200);

    expect(response.body.data).toEqual([
      {
        country: "India",
        jobTitle: "Frontend Engineer",
        employeeCount: 2,
        averageSalary: 4000000
      }
    ]);
  });
});
