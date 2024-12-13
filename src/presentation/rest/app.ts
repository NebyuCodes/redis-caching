import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";

import { configs } from "../../config";
import {
  ApiKeyNotFoundError,
  InvalidApiKeyError,
  UnknownUrlError,
} from "../../shared/errors";
import { geh } from "../rest/middlewares";
import { v1 } from "./routes";

const app: Application = express();

app.use(helmet());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Check API Key
app.use((req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) return next(new ApiKeyNotFoundError());

  if (configs.api_key !== apiKey) return next(new InvalidApiKeyError());

  next();
});

// Use routers
v1(app);

// Handle Unknown URL
app.use("*", (req: Request, res: Response, next: NextFunction) => {
  return next(new UnknownUrlError());
});

// Global error handler
app.use(geh);

// Export global application
export { app };
