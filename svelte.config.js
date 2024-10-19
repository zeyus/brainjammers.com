import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		appDir: 'app',
		adapter: adapter({
			fallback: "404.html",
			pages: "docs",
			assets: "docs",
			strict: true
		}),
		paths: {
			base: ''
		}
	}
};

export default config;
