module.exports = {
	extends: [
		"@unocss",
		"plugin:solid/typescript",
		"plugin:astro/jsx-a11y-recommended",
	],
	overrides: [
		{
			files: ["*.ts"],
			parser: "@typescript-eslint/parser",
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module",
			},
		},
		{
			files: ["*.tsx"],
			plugins: ["solid"],
			parser: "@typescript-eslint/parser",
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module",
			},
		},
		{
			// Define the configuration for `.astro` file.
			files: ["*.astro"],
			// Allows Astro components to be parsed.
			parser: "astro-eslint-parser",
			processor: "astro/client-side-ts",
			// Parse the script in `.astro` as TypeScript by adding the following configuration.
			// It's the setting you need when using TypeScript.
			parserOptions: {
				parser: "@typescript-eslint/parser",
				extraFileExtensions: [".astro"],
			},
			rules: {
				// override/add rules settings here, such as:
				// "astro/no-set-html-directive": "error"
			},
		},
		{
			env: {
				node: true,
			},
			files: [
				".eslintrc.{js,cjs}",
			],
			parserOptions: {
				sourceType: "script",
			},
		},
	],
};
