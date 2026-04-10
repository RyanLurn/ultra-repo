/* eslint-disable perfectionist/sort-objects */
import { join } from "node:path";

import { type WriteFileResult, safeWriteFile } from "@/lib/safe-write-file";

export async function createRootPackageJson({
  pnpmVersion,
  name,
  cwd,
}: {
  pnpmVersion: string;
  name: string;
  cwd: string;
}): Promise<WriteFileResult> {
  const rootPackageJson = {
    name,
    version: "0.1.0",
    type: "module",
    scripts: {
      build: "turbo run build",
      "check-types": "turbo run check-types",
      lint: "turbo run lint",
      "lint:fix": "turbo run lint:fix",
      format: "prettier . --write --cache",
      "format:check": "prettier . --check --cache",
      check: "turbo run check-types lint && pnpm run format:check",
      fix: "turbo run lint:fix && pnpm run format",
    },
    devDependencies: {
      prettier: "3.8.2",
      turbo: "^2.9.5",
    },
    packageManager: `pnpm@${pnpmVersion}`,
  };

  const writeFileResult = await safeWriteFile({
    file: join(cwd, "package.json"),
    data: JSON.stringify(rootPackageJson, null, 2),
  });

  return writeFileResult;
}
