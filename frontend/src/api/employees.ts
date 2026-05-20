import type { PaginatedApiSuccess } from "../types/api";
import type { Employee, EmployeeFilters, EmployeeSort } from "../types/employee";
import type { EmployeeFormValues } from "../utils/employeeSchema";

export type EmployeeListParams = EmployeeFilters &
  EmployeeSort & {
    page: number;
    limit: number;
  };

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "";

export const buildEmployeeListUrl = (params: EmployeeListParams): string => {
  const searchParams = new URLSearchParams();
  searchParams.set("page", String(params.page));
  searchParams.set("limit", String(params.limit));

  if (params.search) searchParams.set("search", params.search);
  if (params.country) searchParams.set("country", params.country);
  if (params.jobTitle) searchParams.set("jobTitle", params.jobTitle);

  searchParams.set("sortBy", params.sortBy);
  searchParams.set("order", params.order);

  return `/api/employees?${searchParams.toString()}`;
};

const request = async <T>(url: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(`${apiBaseUrl}${url}`, {
    headers: { "Content-Type": "application/json" },
    ...init
  });

  if (!response.ok) {
    throw new Error("Request failed");
  }

  return response.json() as Promise<T>;
};

export const listEmployees = (params: EmployeeListParams): Promise<PaginatedApiSuccess<Employee>> =>
  request(buildEmployeeListUrl(params));

export const createEmployee = (values: EmployeeFormValues): Promise<{ success: true; data: Employee }> =>
  request("/api/employees", { method: "POST", body: JSON.stringify(values) });

export const updateEmployee = (id: string, values: EmployeeFormValues): Promise<{ success: true; data: Employee }> =>
  request(`/api/employees/${id}`, { method: "PUT", body: JSON.stringify(values) });

export const deleteEmployee = async (id: string): Promise<void> => {
  const response = await fetch(`${apiBaseUrl}/api/employees/${id}`, { method: "DELETE" });
  if (!response.ok) {
    throw new Error("Delete failed");
  }
};
