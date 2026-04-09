import perfectionist from "eslint-plugin-perfectionist";
import { defineConfig, globalIgnores } from "eslint/config";
import ts from "typescript-eslint";
import js from "@eslint/js";

export const baseConfig = defineConfig([
  globalIgnores([
    "**/routeTree.gen.ts",
    "**/_generated/",
    "**/migrations/",
    "**/.tanstack/",
    "**/dist/",
    "**/build/",
  ]),
  js.configs.recommended,
  ts.configs.recommendedTypeChecked,
  {
    rules: {
      "@typescript-eslint/no-import-type-side-effects": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      curly: "error",
    },
  },
  perfectionist.configs["recommended-line-length"],
]);
