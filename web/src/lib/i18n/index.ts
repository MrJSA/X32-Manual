import { en, type I18nTexts } from './en.js';
import { de } from './de.js';

export const langs = ['en', 'de'] as const;
export type Lang = (typeof langs)[number];
export type { I18nTexts };

export const texts: Record<Lang, I18nTexts> = { en, de };

export const LANG_KEY = 'x32.lang';

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
 * `/01-hardware-overview/` with 'de' -> `/de/01-hardware-overview/`
 * `/01-hardware-overview/` with 'en' -> `/01-hardware-overview/`
 */
export function localize(path: string, lang: Lang): string {
	const clean = unlocalize(path);
	if (lang === 'en') {
		return clean;
	}
	return clean === '/' ? '/de/' : `/de${clean}`;
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
