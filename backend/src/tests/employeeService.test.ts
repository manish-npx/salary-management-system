import { EmployeeRepository } from "../repositories/employeeRepository";
import { EmployeeService } from "../services/employeeService";
import { buildEmployeeInput } from "./helpers/employeeFactory";

describe("EmployeeService", () => {
  const service = new EmployeeService(new EmployeeRepository());

  it("returns an employee by id", async () => {
    const created = await service.create(buildEmployeeInput());

    await expect(service.getById(created.id)).resolves.toMatchObject({
      id: created.id,
      employeeCode: "EMP-0001"
    });
  });

  it("throws a not found error when an employee does not exist", async () => {
    await expect(service.getById("missing-id")).rejects.toMatchObject({
      statusCode: 404,
      message: "Employee not found"
    });
  });

  it("updates and deletes employees through the repository boundary", async () => {
    const created = await service.create(buildEmployeeInput());
    const updated = await service.update(created.id, { salary: 4400000 });

    expect(updated.salary).toBe(4400000);
    await service.delete(created.id);
    await expect(service.getById(created.id)).rejects.toMatchObject({ statusCode: 404 });
  });
});
