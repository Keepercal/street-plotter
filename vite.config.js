import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import pkg from './package.json';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	base: '/street-plotter/',
	define: {
		__APP_NAME__: JSON.stringify(pkg.displayName),
		__APP_VERSION__: JSON.stringify(pkg.version),
	},
});
