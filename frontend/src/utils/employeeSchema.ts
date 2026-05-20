import { z } from "zod";

export const employeeFormSchema = z.object({
  employeeCode: z.string().trim().min(1, "Employee code is required"),
  fullName: z.string().trim().min(1, "Full name is required"),
  email: z.string().trim().email("Valid email is required"),
  jobTitle: z.string().trim().min(1, "Job title is required"),
  department: z.string().trim().min(1, "Department is required"),
  country: z.string().trim().min(1, "Country is required"),
  salary: z.coerce.number().positive("Salary must be greater than zero"),
  currency: z.string().trim().length(3, "Currency must be a 3-letter code"),
  employmentType: z.string().trim().min(1, "Employment type is required"),
  dateOfJoining: z.string().trim().min(1, "Date of joining is required")
});

export type EmployeeFormValues = z.infer<typeof employeeFormSchema>;
export type EmployeeFormInput = z.input<typeof employeeFormSchema>;
