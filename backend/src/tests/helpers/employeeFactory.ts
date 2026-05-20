import type { CreateEmployeeInput } from "../../validators/employeeSchemas";

export const buildEmployeeInput = (
  overrides: Partial<CreateEmployeeInput> = {}
): CreateEmployeeInput => ({
  employeeCode: "EMP-0001",
  fullName: "Aarav Sharma",
  email: "aarav.sharma@example.com",
  jobTitle: "Frontend Engineer",
  department: "Engineering",
  country: "India",
  salary: 3600000,
  currency: "INR",
  employmentType: "Full-time",
  dateOfJoining: "2022-04-15",
  ...overrides
});
