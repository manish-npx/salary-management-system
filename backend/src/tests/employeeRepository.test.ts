import { EmployeeRepository } from "../repositories/employeeRepository";
import { buildEmployeeInput } from "./helpers/employeeFactory";

describe("EmployeeRepository", () => {
  const repository = new EmployeeRepository();

  it("creates and retrieves an employee", async () => {
    const created = await repository.create(buildEmployeeInput());

    expect(created.id).toEqual(expect.any(String));
    expect(created.employeeCode).toBe("EMP-0001");
    expect(created.fullName).toBe("Aarav Sharma");
    expect(created.createdAt).toBeInstanceOf(Date);

    const found = await repository.findById(created.id);
    expect(found?.email).toBe("aarav.sharma@example.com");
  });

  it("lists employees with pagination metadata", async () => {
    await repository.create(buildEmployeeInput({ employeeCode: "EMP-0001", email: "one@example.com" }));
    await repository.create(buildEmployeeInput({ employeeCode: "EMP-0002", email: "two@example.com" }));
    await repository.create(buildEmployeeInput({ employeeCode: "EMP-0003", email: "three@example.com" }));

    const result = await repository.list({ page: 2, limit: 2 });

    expect(result.data).toHaveLength(1);
    expect(result.meta).toEqual({ page: 2, limit: 2, total: 3, totalPages: 2 });
  });

  it("filters, searches, and sorts employees using indexed fields", async () => {
    await repository.create(
      buildEmployeeInput({
        employeeCode: "EMP-0001",
        email: "maya@example.com",
        fullName: "Maya Rao",
        country: "India",
        jobTitle: "Backend Engineer",
        salary: 4200000
      })
    );
    await repository.create(
      buildEmployeeInput({
        employeeCode: "EMP-0002",
        email: "nora@example.com",
        fullName: "Nora Smith",
        country: "United States",
        jobTitle: "Product Manager",
        salary: 145000
      })
    );
    await repository.create(
      buildEmployeeInput({
        employeeCode: "EMP-0003",
        email: "ravi@example.com",
        fullName: "Ravi Kumar",
        country: "India",
        jobTitle: "Frontend Engineer",
        salary: 3900000
      })
    );

    const result = await repository.list({
      country: "India",
      search: "ra",
      sortBy: "salary",
      order: "desc",
      page: 1,
      limit: 10
    });

    expect(result.data.map((employee) => employee.fullName)).toEqual(["Maya Rao", "Ravi Kumar"]);
  });

  it("updates and deletes an employee", async () => {
    const created = await repository.create(buildEmployeeInput());

    const updated = await repository.update(created.id, { salary: 4100000, department: "Platform" });
    expect(updated.salary).toBe(4100000);
    expect(updated.department).toBe("Platform");

    await repository.delete(created.id);
    await expect(repository.findById(created.id)).resolves.toBeNull();
  });
});
