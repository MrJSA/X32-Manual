import { error } from '@sveltejs/kit';
import { getChapterBySlug, CHAPTERS } from '#lib/content.js';
import { renderMarkdown, extractToc } from '#lib/markdown.js';

export function entries() {
	return CHAPTERS.map((ch) => ({ chapter: ch.slug }));
}

export function load({ params }) {
	const chapter = getChapterBySlug(params.chapter);
	if (!chapter) {
		throw error(404, `Chapter "${params.chapter}" not found in manual`);
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
