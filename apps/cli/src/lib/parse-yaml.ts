import type { YAMLParseError } from "yaml";

import { BaseError } from "@ultra-repo/core/error/classes/base";

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
