import { AppError } from "./app.error";

export class NoTokenError extends AppError {
  constructor(public message: string = "Please login.") {
    super(message, 400);
  }
}
