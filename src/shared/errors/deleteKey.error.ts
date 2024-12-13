import { AppError } from "./app.error";

export class DeleteKeyError extends AppError {
  constructor(public message: string = "Invalid Delete Key") {
    super(message, 400);
  }
}
