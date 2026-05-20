export type Employee = {
  id: string;
  employeeCode: string;
  fullName: string;
  email: string;
  jobTitle: string;
  department: string;
  country: string;
  salary: number;
  currency: string;
  employmentType: string;
  dateOfJoining: string;
  createdAt: string;
  updatedAt: string;
};

export type EmployeeFilters = {
  search: string;
  country: string;
  jobTitle: string;
};

export type EmployeeSort = {
  sortBy: keyof Pick<Employee, "createdAt" | "fullName" | "country" | "jobTitle" | "salary">;
  order: "asc" | "desc";
};
