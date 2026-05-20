import { z } from "zod";

const isoDateString = z.string().refine((value) => !Number.isNaN(Date.parse(value)), {
  message: "dateOfJoining must be a valid date"
});

export const employeeCreateSchema = z.object({
  employeeCode: z.string().trim().min(1).max(30),
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160),
  jobTitle: z.string().trim().min(2).max(120),
  department: z.string().trim().min(2).max(120),
  country: z.string().trim().min(2).max(80),
  salary: z.number().int().positive(),
  currency: z.string().trim().min(3).max(3),
  employmentType: z.string().trim().min(2).max(60),
  dateOfJoining: isoDateString
});

export const employeeUpdateSchema = employeeCreateSchema.partial();

export const employeeSortBySchema = z.enum([
  "employeeCode",
  "fullName",
  "email",
  "jobTitle",
  "department",
  "country",
  "salary",
  "dateOfJoining",
  "createdAt"
]);

export const employeeListQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  search: z.string().trim().optional(),
  country: z.string().trim().optional(),
  jobTitle: z.string().trim().optional(),
  department: z.string().trim().optional(),
  sortBy: employeeSortBySchema.default("createdAt"),
  order: z.enum(["asc", "desc"]).default("desc")
});

export type CreateEmployeeInput = z.infer<typeof employeeCreateSchema>;
export type UpdateEmployeeInput = z.infer<typeof employeeUpdateSchema>;
export type EmployeeListQuery = z.infer<typeof employeeListQuerySchema>;
