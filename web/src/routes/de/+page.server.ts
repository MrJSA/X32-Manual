import { getChapters, getIndexContent } from '#lib/content.js';
import { renderMarkdown } from '#lib/markdown.js';

export function load() {
	const rawIndex = getIndexContent('de');
	const renderedIndex = renderMarkdown(rawIndex, 'de');

	return {
		chapters: getChapters('de'),
		renderedIndex
	};
}
