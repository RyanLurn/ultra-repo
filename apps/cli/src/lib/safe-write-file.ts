import type { ObjectEncodingOptions, PathLike, OpenMode, Mode } from "node:fs";
import type { Result } from "@ultra-repo/core/types/result";
import type { Abortable } from "node:events";
import type Stream from "node:stream";

import {
  createFallbackError,
  type FallBackError,
} from "@ultra-repo/core/error/classes/fallback";
import { type FileHandle, writeFile } from "node:fs/promises";

export type WriteFileResult = Result<undefined, FallBackError>;

export async function safeWriteFile({
  options,
  file,
  data,
}: {
  options?:
    | ({
        flag?: undefined | OpenMode;
        flush?: undefined | boolean;
        mode?: undefined | Mode;
      } & ObjectEncodingOptions &
        Abortable)
    | BufferEncoding
    | null;
  data:
    | AsyncIterable<NodeJS.ArrayBufferView | string>
    | Iterable<NodeJS.ArrayBufferView | string>
    | NodeJS.ArrayBufferView
    | string
    | Stream;
  file: FileHandle | PathLike;
}): Promise<WriteFileResult> {
  try {
    await writeFile(file, data, options);
    return {
      data: undefined,
      success: true,
    };
  } catch (error) {
    const context = {
      arguments: {
        options,
        data,
        file,
      },
      operation: "safeWriteFile",
    };

    const fallbackError = createFallbackError({ cause: error, context });
    return {
      error: fallbackError,
      success: false,
    };
  }
}
