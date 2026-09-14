export class HttpError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly code: string,
    message: string,
    public readonly details?: Record<string, unknown>
  ) {
    super(message);
    this.name = "HttpError";
  }

  static badRequest(code: string, message: string, details?: Record<string, unknown>): HttpError {
    return new HttpError(400, code, message, details);
  }

  static notFound(code: string, message: string): HttpError {
    return new HttpError(404, code, message);
  }

  static unprocessable(code: string, message: string, details?: Record<string, unknown>): HttpError {
    return new HttpError(422, code, message, details);
  }
}
