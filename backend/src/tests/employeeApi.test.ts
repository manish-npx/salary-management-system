import request from "supertest";
import { app } from "../app";
import { EmployeeRepository } from "../repositories/employeeRepository";
import { buildEmployeeInput } from "./helpers/employeeFactory";

describe("Employee API", () => {
  const repository = new EmployeeRepository();

  it("creates, reads, updates, and deletes an employee", async () => {
    const createResponse = await request(app)
      .post("/api/employees")
      .send(buildEmployeeInput())
      .expect(201);

    expect(createResponse.body.success).toBe(true);
    expect(createResponse.body.data.email).toBe("aarav.sharma@example.com");

    const id = createResponse.body.data.id;
    await request(app).get(`/api/employees/${id}`).expect(200);

    const updateResponse = await request(app).put(`/api/employees/${id}`).send({ salary: 3900000 }).expect(200);
    expect(updateResponse.body.data.salary).toBe(3900000);

    await request(app).delete(`/api/employees/${id}`).expect(204);
    const missingResponse = await request(app).get(`/api/employees/${id}`).expect(404);
    expect(missingResponse.body).toEqual({ success: false, message: "Employee not found" });
  });

  it("lists employees with server-side pagination, filters, search, and sorting", async () => {
    await repository.create(buildEmployeeInput({ employeeCode: "EMP-0001", email: "a@example.com", fullName: "Asha Rao", country: "India", salary: 3000000 }));
    await repository.create(buildEmployeeInput({ employeeCode: "EMP-0002", email: "b@example.com", fullName: "Ben Cole", country: "United States", salary: 120000 }));
    await repository.create(buildEmployeeInput({ employeeCode: "EMP-0003", email: "c@example.com", fullName: "Ravi Rao", country: "India", salary: 4500000 }));

    const response = await request(app)
      .get("/api/employees")
      .query({ country: "India", search: "rao", sortBy: "salary", order: "desc", page: 1, limit: 1 })
      .expect(200);

    expect(response.body.data).toHaveLength(1);
    expect(response.body.data[0].fullName).toBe("Ravi Rao");
    expect(response.body.meta).toEqual({ page: 1, limit: 1, total: 2, totalPages: 2 });
  });

  it("returns validation errors consistently", async () => {
    const response = await request(app)
      .post("/api/employees")
      .send({ ...buildEmployeeInput(), email: "not-an-email", salary: -1 })
      .expect(400);

    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Validation failed");
  });
});
