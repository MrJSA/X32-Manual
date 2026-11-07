import { CHAPTERS, getIndexContent } from '#lib/content.js';
import { renderMarkdown } from '#lib/markdown.js';

export function load() {
	const rawIndex = getIndexContent();
	const renderedIndex = renderMarkdown(rawIndex);

	return {
		chapters: CHAPTERS,
		renderedIndex
	};
}
