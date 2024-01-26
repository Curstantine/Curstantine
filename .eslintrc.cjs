module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		"@unocss",
		"eslint:recommended",
		"plugin:solid/typescript",
	],
	overrides: [
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
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	plugins: [
		"solid",
	],
	rules: {},
};
