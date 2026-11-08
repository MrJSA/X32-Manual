import { getChapters } from '#lib/content.js';
import { langOf } from '#lib/i18n/index.js';

export const prerender = true;
export const trailingSlash = 'always';

/**
 * Navigation for the sidebar, computed at build time. Keeping this on the server stops
 * the raw markdown of every chapter (both languages) from ending up in the client bundle.
 */
export function load({ url }) {
	const lang = langOf(url.pathname);
	return {
		lang,
		nav: getChapters(lang).map(({ slug, number, shortTitle, category, toc }) => ({
			slug,
			number,
			shortTitle,
			category,
			toc: toc ?? []
		}))
	};
}
