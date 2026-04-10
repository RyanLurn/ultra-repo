import type { ProcessOutput } from "zx";

import { BaseError } from "@ultra-repo/core/error/classes/base";

export type ShellErrorContext = {
  arguments?: Record<string, unknown>;
  result: ProcessOutput;
  operation: string;
};

export class ShellError extends BaseError {
  declare context: ShellErrorContext;
  declare code: "SHELL_ERROR";

  constructor(
    message: string,
    {
      context,
      cause,
    }: {
      context: ShellErrorContext;
      cause?: unknown;
    }
  ) {
    super(message, { code: "SHELL_ERROR", context, cause });
  }
}
