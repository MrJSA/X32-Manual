import { json } from '@sveltejs/kit';
import { buildSearchIndex } from '#lib/content.js';
import { langs } from '#lib/i18n/index.js';

export const prerender = true;
export const trailingSlash = 'never';

/** Search index for both languages, fetched by the search dialog the first time it opens. */
export function GET() {
	return json(Object.fromEntries(langs.map((lang) => [lang, buildSearchIndex(lang)])));
}
