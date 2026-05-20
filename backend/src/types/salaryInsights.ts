export type CountrySalaryInsight = {
  country: string;
  employeeCount: number;
  minSalary: number;
  maxSalary: number;
  averageSalary: number;
  medianSalary: number;
};

export type JobTitleSalaryInsight = {
  country: string;
  jobTitle: string;
  employeeCount: number;
  averageSalary: number;
};

export type DepartmentSalaryInsight = {
  department: string;
  employeeCount: number;
  averageSalary: number;
};

export type SalaryDistributionBucket = {
  label: string;
  count: number;
};

export type DashboardInsight = {
  totalEmployeeCount: number;
  medianSalary: number;
  topPaidDepartments: DepartmentSalaryInsight[];
  salaryDistribution: SalaryDistributionBucket[];
  countryInsights: CountrySalaryInsight[];
};
