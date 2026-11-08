import { getChapters } from '#lib/content.js';
import { SITE_URL, langs, localize } from '#lib/i18n/index.js';

export const prerender = true;
export const trailingSlash = 'never';

export function GET() {
	const paths = ['/', ...getChapters('en').map((ch) => `/${ch.slug}/`)];
	// Every page exists in every language; each URL lists all of its language versions.
	const urls = paths
		.flatMap((path) =>
			langs.map((lang) => {
				const alternates = [...langs, 'x-default' as const]
					.map((l) => {
						const href = SITE_URL + localize(path, l === 'x-default' ? 'en' : l);
						return `<xhtml:link rel="alternate" hreflang="${l}" href="${href}"/>`;
					})
					.join('');
				return `  <url><loc>${SITE_URL}${localize(path, lang)}</loc>${alternates}</url>`;
			})
		)
		.join('\n');
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
	return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
