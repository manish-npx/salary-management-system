import { buildSeedEmployees, chunkEmployees } from "../../prisma/seedEmployeeFactory";

describe("seed employee factory", () => {
  it("creates deterministic, realistic employees", () => {
    const employees = buildSeedEmployees(3);

    expect(employees).toHaveLength(3);
    expect(employees[0]).toMatchObject({
      employeeCode: "EMP-00001",
      currency: expect.any(String),
      salary: expect.any(Number)
    });
    expect(new Set(employees.map((employee) => employee.email)).size).toBe(3);
  });

  it("chunks employees for batched inserts", () => {
    const employees = buildSeedEmployees(5);

    expect(chunkEmployees(employees, 2).map((chunk) => chunk.length)).toEqual([2, 2, 1]);
  });
});
