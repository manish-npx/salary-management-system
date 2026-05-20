import { useQuery } from "@tanstack/react-query";
import { getCountryInsights, getDashboardInsights, getJobTitleInsights } from "../api/insights";

export const useDashboardInsights = () =>
  useQuery({
    queryKey: ["insights", "dashboard"],
    queryFn: getDashboardInsights
  });

export const useCountryInsights = () =>
  useQuery({
    queryKey: ["insights", "country"],
    queryFn: getCountryInsights
  });

export const useJobTitleInsights = (country: string) =>
  useQuery({
    queryKey: ["insights", "job-title", country],
    queryFn: () => getJobTitleInsights(country || undefined)
  });
