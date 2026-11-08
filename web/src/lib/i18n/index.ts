import { en, type I18nTexts } from './en.js';
import { de } from './de.js';

export const langs = ['en', 'de'] as const;
export type Lang = (typeof langs)[number];
export type { I18nTexts };

export const texts: Record<Lang, I18nTexts> = { en, de };

/** localStorage key of the language picked in the header (read early in app.html). */
export const LANG_KEY = 'x32.lang';

/** Public origin of the site, used for canonical, hreflang and sitemap URLs. */
export const SITE_URL = 'https://x32.mrjsa.com';

/** Open Graph locale per language. */
export const locales: Record<Lang, string> = { en: 'en_US', de: 'de_DE' };

export function isLang(value: unknown): value is Lang {
	return typeof value === 'string' && (langs as readonly string[]).includes(value);
}

/**
 * Extracts language from pathname.
 * `/de/01-hardware-overview/` -> `de`
 * `/01-hardware-overview/` -> `en`
 */
export function langOf(pathname: string): Lang {
	const segments = pathname.split('/').filter(Boolean);
	const first = segments[0];
	return first && isLang(first) ? (first as Lang) : 'en';
}

/**
 * Localizes a path for the given language.
 * `/01-hardware-overview` with 'de' -> `/de/01-hardware-overview/`
 * `/de/01-hardware-overview/` with 'en' -> `/01-hardware-overview/`
 *
 * Pages are prerendered as `<path>/index.html` (trailingSlash: 'always'), so links
 * always end in `/` — otherwise every click costs a 308 redirect.
 */
export function localize(path: string, lang: Lang): string {
	let clean = unlocalize(path);
	if (!clean.endsWith('/')) clean += '/';
	return lang === 'en' ? clean : `/de${clean}`;
}

/** True if both paths point to the same page, ignoring language prefix and trailing slash. */
export function samePage(a: string, b: string): boolean {
	const norm = (p: string) => unlocalize(p).replace(/\/+$/, '') || '/';
	return norm(a) === norm(b);
}

/**
 * Strips language prefix from pathname.
 * `/de/01-hardware-overview/` -> `/01-hardware-overview/`
 * `/de/` -> `/`
 */
export function unlocalize(pathname: string): string {
	const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`;
	if (normalized === '/de' || normalized === '/de/') {
		return '/';
	}
	if (normalized.startsWith('/de/')) {
		return normalized.slice(3) || '/';
	}
	return normalized;
}

export function rememberLang(lang: Lang): void {
	try {
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem(LANG_KEY, lang);
		}
	} catch {
		// localStorage might be unavailable in private browsing
	}
}
