import { Router } from "express";
import { getCountryInsights, getDashboardInsights, getJobTitleInsights } from "../controllers/salaryInsightController";
import { asyncHandler } from "../middleware/asyncHandler";

export const salaryInsightRoutes = Router();

salaryInsightRoutes.get("/dashboard", asyncHandler(getDashboardInsights));
salaryInsightRoutes.get("/country", asyncHandler(getCountryInsights));
salaryInsightRoutes.get("/job-title", asyncHandler(getJobTitleInsights));
