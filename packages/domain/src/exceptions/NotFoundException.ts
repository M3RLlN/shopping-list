import { AppException } from "./AppExceptions.js";

/**
 * Error for "does not exist". Always leads to status code 404.
 *
 * The 404 is fixed here, so whoever throws this error only writes the text and
 * cannot pass a wrong number by mistake.
 */
export class NotFoundException extends AppException {
  constructor(message = "Not found") {
    super(message, 404);
  }
}
