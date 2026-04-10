import type { Result } from "@ultra-repo/core/types/result";

import {
  createFallbackError,
  type FallBackError,
} from "@ultra-repo/core/error/classes/fallback";
import { $ } from "zx";

export async function checkPnpm(): Promise<Result<string, FallBackError>> {
  try {
    const output = await $`pnpm --version`;
    if (output.exitCode === 0) {
      return {
        data: output.text(),
        success: true,
      };
    }

    const fallbackError = createFallbackError({
      context: { operation: "checkPnpm", result: output },
      message: "Failed to check pnpm version",
      cause: output.stderr,
    });
    return {
      error: fallbackError,
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
