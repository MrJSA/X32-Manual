import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	// Never inline assets as data: URIs (fonts etc. stay files), so CSP needs no 'data:'.
	build: { assetsInlineLimit: 0 },
	plugins: [
		sveltekit({
			adapter: adapter({ pages: 'build', assets: 'build', fallback: '404.html', precompress: true }),
			inlineStyleThreshold: 4096,
			// Every page gets a <meta> Content-Security-Policy with the hashes of SvelteKit's own
			// inline scripts/styles, so nothing else inline can run. The Rust server adds the
			// header-only directives (frame-ancestors etc.) on top — see src/headers.rs.
			csp: {
				mode: 'hash',
				directives: {
					'default-src': ['self'],
					'script-src': ['self'],
					'style-src': ['self'],
					// Only style *attributes* (SvelteKit's screen-reader route announcer uses one).
					// Style attributes can't run code; <style> blocks stay hash-locked.
					'style-src-attr': ['unsafe-inline'],
					'img-src': ['self'],
					'font-src': ['self'],
					'connect-src': ['self'],
					'manifest-src': ['self'],
					'object-src': ['none'],
					'base-uri': ['self'],
					'form-action': ['none']
				}
			},
			prerender: {
				// Endpoints no page links to must be listed so they get prerendered too.
				entries: ['*', '/search.json', '/sitemap.xml', '/robots.txt'],
				handleHttpError: 'fail',
				handleMissingId: 'fail',
				handleUnseenRoutes: 'ignore'
			}
		})
	]
});
