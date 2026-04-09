import tanstackRouter from "@tanstack/eslint-plugin-router";
import reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-config-prettier/flat";
import { defineConfig } from "eslint/config";
import globals from "globals";

import { baseConfig } from "./base.js";

export const browserConfig = defineConfig([
  baseConfig,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    rules: {
      "@typescript-eslint/only-throw-error": [
        "error",
        {
          allow: [
            {
              package: "@tanstack/router-core",
              name: "Redirect",
              from: "package",
            },
            {
              package: "@tanstack/router-core",
              name: "NotFoundError",
              from: "package",
            },
          ],
        },
      ],
    },
  },
  tanstackRouter.configs["flat/recommended"],
  reactHooks.configs.flat.recommended,
  prettier,
]);
