import { AppError } from "./app.error";

export class DuplicateError extends AppError {
  constructor(public message: string = "Data Already exists") {
    super(message, 400);
  }
}
