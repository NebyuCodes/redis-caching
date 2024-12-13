import { AppError } from "./app.error";

export class InvalidApiKeyError extends AppError {
  constructor(public message: string = "Invalid API Key.") {
    super(message, 400);
  }
}

export class ApiKeyNotFoundError extends AppError {
  constructor(public message: string = "API Key not found.") {
    super(message, 401);
  }
}
