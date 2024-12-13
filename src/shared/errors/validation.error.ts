import { AppError } from "./app.error";

export class CustomValidationError extends AppError {
  constructor(public message: string = "Validation error") {
    super(message, 400);
  }
}
