import type { Result } from "@ultra-repo/core/types/result";

import {
  createFallbackError,
  type FallBackError,
} from "@ultra-repo/core/error/classes/fallback";
import { BaseError } from "@ultra-repo/core/error/classes/base";
import { YAMLParseError, parse } from "yaml";

export class InvalidYamlError extends BaseError {
  declare code: "INVALID_YAML_ERROR";
  declare cause: YAMLParseError;

  constructor({
    context,
    cause,
  }: {
    context?: Record<string, unknown>;
    cause: YAMLParseError;
  }) {
    super(cause.message, {
      code: "INVALID_YAML_ERROR",
      context,
      cause,
    });
  }
}

export function parseYaml({
  yamlString,
}: {
  yamlString: string;
}): Result<unknown, InvalidYamlError | FallBackError> {
  const context = {
    arguments: {
      yamlString,
    },
    operation: "parseYaml",
  };

  try {
    const value = parse(yamlString) as unknown;
    return {
      success: true,
      data: value,
    };
  } catch (error) {
    if (error instanceof YAMLParseError) {
      const invalidYamlError = new InvalidYamlError({ cause: error, context });
      return {
        error: invalidYamlError,
        success: false,
      };
    }

    const fallbackError = createFallbackError({ cause: error, context });
    return {
      error: fallbackError,
      success: false,
    };
  }
}
