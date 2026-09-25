import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettierConfig from 'eslint-config-prettier';
import { defineConfig, globalIgnores } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';

export default defineConfig([
	globalIgnores(['dist']),
	{
		files: ['**/*.{js,jsx}'],
		extends: [
			js.configs.recommended,
			reactHooks.configs.flat.recommended,
			reactRefresh.configs.vite,
			prettierConfig,
		],
		plugins: {
			import: importPlugin,
		},
		languageOptions: {
			ecmaVersion: 2020,
			globals: {
				...globals.browser,
				__APP_NAME__: 'readonly',
				__APP_VERSION__: 'readonly',
			},
			parserOptions: {
				ecmaVersion: 'latest',
				ecmaFeatures: { jsx: true },
				sourceType: 'module',
			},
		},
		rules: {
			'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
		},
		settings: {
			'import/resolver': {
				alias: {
					map: [['@', './src']],
					extensions: ['.js', '.jsx'],
				},
			},
		},
	},
	{
		files: ['**/contexts/**/*.{js,jsx}'],
		rules: {
			'react-refresh/only-export-components': 'off',
		},
	},
]);
