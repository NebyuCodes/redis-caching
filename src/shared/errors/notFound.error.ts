import { AppError } from "./app.error";

export class NotFoundError extends AppError {
  constructor(public message: string = "Resource can not be found.") {
    super(message, 404);
  }
}
