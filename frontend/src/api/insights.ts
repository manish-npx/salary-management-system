import type { ApiSuccess } from "../types/api";
import type { CountrySalaryInsight, DashboardInsight, JobTitleSalaryInsight } from "../types/insights";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "";

const request = async <T>(url: string): Promise<T> => {
  const response = await fetch(`${apiBaseUrl}${url}`);

  if (!response.ok) {
    throw new Error("Request failed");
  }

  return response.json() as Promise<T>;
};

export const getDashboardInsights = (): Promise<ApiSuccess<DashboardInsight>> => request("/api/insights/dashboard");

export const getCountryInsights = (): Promise<ApiSuccess<CountrySalaryInsight[]>> => request("/api/insights/country");

export const getJobTitleInsights = (country?: string): Promise<ApiSuccess<JobTitleSalaryInsight[]>> => {
  const params = new URLSearchParams();
  if (country) params.set("country", country);
  const query = params.toString();
  return request(`/api/insights/job-title${query ? `?${query}` : ""}`);
};
