import { BaseError } from "@/error/classes/base";

export type FallBackError = UnexpectedError | UnknownError;

export class UnexpectedError extends BaseError {
  declare code: "UNEXPECTED_ERROR";
  declare cause: Error;

  constructor(
    message: string,
    {
      context,
      cause,
    }: {
      context?: Record<string, unknown>;
      cause: Error;
    }
  ) {
    super(message, {
      code: "UNEXPECTED_ERROR",
      context,
      cause,
    });
  }
}

export class UnknownError extends BaseError {
  declare code: "UNKNOWN_ERROR";
  declare cause: unknown;

  constructor(
    message: string,
    {
      context,
      cause,
    }: {
      context?: Record<string, unknown>;
      cause: unknown;
    }
  ) {
    super(message, {
      code: "UNKNOWN_ERROR",
      context,
      cause,
    });
  }
}

export function createFallbackError({
  message,
  context,
  cause,
}: {
  context?: Record<string, unknown>;
  message?: string;
  cause: unknown;
}): FallBackError {
  if (cause instanceof Error) {
    return new UnexpectedError(message ?? cause.message, { context, cause });
  }

  return new UnknownError(message ?? "An unknown non-Error value was thrown", {
    context,
    cause,
  });
}
