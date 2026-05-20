import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { errorHandler } from "./middleware/errorHandler";
import { employeeRoutes } from "./routes/employeeRoutes";

export const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/health", (_request, response) => {
  response.json({ success: true, status: "ok" });
});

app.use("/api/employees", employeeRoutes);
app.use(errorHandler);
