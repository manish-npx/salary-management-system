import type { SalaryInsightRepository } from "../repositories/salaryInsightRepository";
import type {
  CountrySalaryInsight,
  DashboardInsight,
  JobTitleSalaryInsight,
  SalaryDistributionBucket
} from "../types/salaryInsights";

const distributionBuckets = [
  { label: "0-100k", min: 0, max: 100000 },
  { label: "100k-250k", min: 100000, max: 250000 },
  { label: "250k-500k", min: 250000, max: 500000 },
  { label: "500k-1m", min: 500000, max: 1000000 },
  { label: "1m+", min: 1000000, max: Number.POSITIVE_INFINITY }
] as const;

const median = (sortedValues: number[]): number => {
  if (sortedValues.length === 0) {
    return 0;
  }

  const midpoint = Math.floor(sortedValues.length / 2);
  if (sortedValues.length % 2 === 1) {
    return sortedValues[midpoint];
  }

  return Math.round((sortedValues[midpoint - 1] + sortedValues[midpoint]) / 2);
};

const distributionFor = (salaries: number[]): SalaryDistributionBucket[] =>
  distributionBuckets.map((bucket) => ({
    label: bucket.label,
    count: salaries.filter((salary) => salary >= bucket.min && salary < bucket.max).length
  }));

export class SalaryInsightService {
  constructor(private readonly repository: SalaryInsightRepository) {}

  async getCountryInsights(): Promise<CountrySalaryInsight[]> {
    const rows = await this.repository.getCountrySalaryRows();

    return Promise.all(
      rows.map(async (row) => ({
        ...row,
        medianSalary: median(await this.repository.getSortedSalaries(row.country))
      }))
    );
  }

  async getJobTitleInsights(country?: string): Promise<JobTitleSalaryInsight[]> {
    return this.repository.getJobTitleSalaryRows(country);
  }

  async getDashboard(): Promise<DashboardInsight> {
    const salaries = await this.repository.getSortedSalaries();
    const [totalEmployeeCount, topPaidDepartments, countryInsights] = await Promise.all([
      this.repository.countEmployees(),
      this.repository.getTopDepartmentSalaryRows(5),
      this.getCountryInsights()
    ]);

    return {
      totalEmployeeCount,
      medianSalary: median(salaries),
      topPaidDepartments,
      salaryDistribution: distributionFor(salaries),
      countryInsights
    };
  }
}
