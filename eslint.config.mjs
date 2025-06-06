import js from "@eslint/js";

import astro from "eslint-plugin-astro";
import solid from "eslint-plugin-solid/configs/typescript";
import ts from "typescript-eslint";

import * as tsParser from "@typescript-eslint/parser";

export default ts.config(
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
