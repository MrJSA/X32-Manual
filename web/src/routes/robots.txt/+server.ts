import { SITE_URL } from '#lib/i18n/index.js';

export const prerender = true;
export const trailingSlash = 'never';

export function GET() {
	return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`, {
		headers: { 'Content-Type': 'text/plain' }
	});
}
