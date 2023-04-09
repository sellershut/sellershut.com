module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'airbnb-base',
		'airbnb-typescript/base',
		'prettier'
	],
	plugins: ['svelte3', '@typescript-eslint'],
	ignorePatterns: ['*.cjs', '/*.js', '/*.ts'],
	overrides: [
		{ files: ['*.svelte'], processor: 'svelte3/svelte3' },
		{
			files: ['./src/routes/**/*.ts'],
			rules: {
				'import/prefer-default-export': 0
			}
		}
	],
	settings: {
		'svelte3/typescript': () => require('typescript')
	},
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		project: './tsconfig.json',
		extraFileExtensions: ['.svelte']
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	rules: {
		'import/extensions': 0
	}
};
