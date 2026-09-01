/**
 * Base for own errors, which carry their own HTTP status code.
 *
 * When such an error is thrown, the errorHandler can read the status code from it.
 * That way the controller does not have to know any status code.
 */
export class AppException extends Error {
  /**
   * @param message - Text that is sent to the client
   * @param status - HTTP status code this error should produce
   */
  constructor(
    message: string,
    public readonly status: number,
  ) {
    // Hands the message up to the built-in `Error` class.
    // `status` stays here, TypeScript creates that field from the constructor parameter above.
    super(message);
  }
}
