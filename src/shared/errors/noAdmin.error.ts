import { AppError } from "./app.error";

export class NoAdminFound extends AppError {
  constructor(public message: string = "Admin does not exists") {
    super(message, 404);
  }
}
