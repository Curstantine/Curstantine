import js from "@eslint/js";
import astro from "eslint-plugin-astro";
import solid from "eslint-plugin-solid/configs/typescript";
import { defineConfig } from "eslint/config";
import ts from "typescript-eslint";

import * as tsParser from "@typescript-eslint/parser";

export default defineConfig(
	{ ignores: [".vercel", ".astro", "dist"] },
	js.configs.recommended,
	ts.configs.recommended,
	astro.configs.recommended,
	{
		files: ["**/*.{ts,tsx}"],
		...solid,
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				tsconfigRootDir: import.meta.dirname,
				project: "tsconfig.json",
			},
		},
	},
);
