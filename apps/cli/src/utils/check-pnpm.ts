import type { Result } from "@ultra-repo/core/types/result";

import {
  createFallbackError,
  type FallBackError,
} from "@ultra-repo/core/error/classes/fallback";
import { $ } from "zx";

import { ShellError } from "@/errors/shell";

export async function checkPnpm(): Promise<
  Result<string, FallBackError | ShellError>
> {
  try {
    const output = await $`pnpm --version`;
    if (output.exitCode === 0) {
      return {
        data: output.text(),
        success: true,
      };
    }

    const shellError = new ShellError("Failed to check pnpm's version", {
      context: {
        operation: "checkPnpm",
        result: output,
      },
    });
    return {
      error: shellError,
      success: false,
    };
  } catch (error) {
    const fallbackError = createFallbackError({
      context: { operation: "checkPnpm" },
      cause: error,
    });
    return {
      error: fallbackError,
      success: false,
    };
  }
}
