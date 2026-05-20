import type { Request, Response } from "express";
import { SalaryInsightRepository } from "../repositories/salaryInsightRepository";
import { SalaryInsightService } from "../services/salaryInsightService";

const service = new SalaryInsightService(new SalaryInsightRepository());

export const getDashboardInsights = async (_request: Request, response: Response): Promise<void> => {
  const dashboard = await service.getDashboard();
  response.json({ success: true, data: dashboard });
};

export const getCountryInsights = async (_request: Request, response: Response): Promise<void> => {
  const insights = await service.getCountryInsights();
  response.json({ success: true, data: insights });
};

export const getJobTitleInsights = async (request: Request, response: Response): Promise<void> => {
  const country = typeof request.query.country === "string" ? request.query.country : undefined;
  const insights = await service.getJobTitleInsights(country);
  response.json({ success: true, data: insights });
};
