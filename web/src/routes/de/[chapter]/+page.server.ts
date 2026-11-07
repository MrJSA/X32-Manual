import { error } from '@sveltejs/kit';
import { getChapterBySlug, getChapters } from '#lib/content.js';
import { renderMarkdown, extractToc } from '#lib/markdown.js';

export function entries() {
	return getChapters('de').map((ch) => ({ chapter: ch.slug }));
}

export function load({ params }) {
	const chapter = getChapterBySlug(params.chapter, 'de');
	if (!chapter) {
		throw error(404, `Kapitel "${params.chapter}" wurde im Handbuch nicht gefunden`);
	}

	const html = renderMarkdown(chapter.rawContent);
	const toc = chapter.toc ?? extractToc(chapter.rawContent);

	return {
		chapter: {
			slug: chapter.slug,
			number: chapter.number,
			title: chapter.title,
			shortTitle: chapter.shortTitle,
			summary: chapter.summary,
			category: chapter.category,
			prev: chapter.prev,
			next: chapter.next
		},
		html,
		toc
	};
}
