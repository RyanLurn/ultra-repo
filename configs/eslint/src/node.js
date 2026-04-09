import prettier from "eslint-config-prettier/flat";
import { defineConfig } from "eslint/config";
import globals from "globals";

import { baseConfig } from "./base.js";

export const nodeConfig = defineConfig([
  baseConfig,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
      globals: {
        ...globals.nodeBuiltin,
      },
    },
  },
  prettier,
]);
