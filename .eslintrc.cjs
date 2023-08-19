module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	ignorePatterns: ["/dist/*", "/node_modules/*"],
	extends: 'xo',
	overrides: [
		{
			extends: [
				'xo-typescript',
			],
			files: [
				'*.ts',
				'*.tsx',
			],
			rules: {
				'semi': 'off',
				'@typescript-eslint/semi': 'off',
			},
		},
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},

};
