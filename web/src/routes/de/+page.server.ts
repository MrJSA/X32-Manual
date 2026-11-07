import { getChapters, getIndexContent } from '#lib/content.js';
import { renderMarkdown } from '#lib/markdown.js';

export function load() {
	const rawIndex = getIndexContent('de');
	const renderedIndex = renderMarkdown(rawIndex);

	return {
		chapters: getChapters('de'),
		renderedIndex
	};
}
