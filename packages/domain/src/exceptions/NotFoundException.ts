import { AppException } from "./AppExceptions.js";

export class NotFoundException extends AppException {
  constructor(message = "Not found") {
    super(message, 404);
  }
}
