import { AppError } from "./app.error";

export class NotAuthorizedError extends AppError {
  constructor(public message: string = "Not Authorized") {
    super(message, 403);
  }
}
