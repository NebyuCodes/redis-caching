import { AppError } from "./app.error";

export class UnknownUrlError extends AppError {
  constructor(public message: string = "Unknown URL") {
    super(message, 404);
  }
}
