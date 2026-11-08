<script lang="ts">
	import ChapterNav from '#lib/components/ChapterNav.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import type { ChapterMeta } from '#lib/content.js';
	import type { TocItem } from '#lib/markdown.js';
	import { page } from '$app/state';
	import { langOf, localize, texts } from '#lib/i18n/index.js';

	interface Props {
		data: {
			chapter: {
				slug: string;
				number: string;
				title: string;
				shortTitle: string;
				summary: string;
				category: string;
				prev: ChapterMeta | null;
				next: ChapterMeta | null;
			};
			html: string;
			toc: TocItem[];
		};
	}

	let { data }: Props = $props();
	const currentLang = $derived(langOf(page.url.pathname));
	const t = $derived(texts[currentLang]);
</script>

<Seo
	title="{t.breadcrumbChapter} {data.chapter.number}: {data.chapter.title} | {t.brandBadge} {t.manualWord}"
	description={data.chapter.summary}
/>

<div class="chapter-view">
	<nav class="crumbs" aria-label="Breadcrumb">
		<a href={localize('/', currentLang)}>{t.breadcrumbManual}</a>
		<span class="sep" aria-hidden="true"></span>
		<span>{data.chapter.category}</span>
		<span class="sep" aria-hidden="true"></span>
		<span class="current">{t.breadcrumbChapter} {data.chapter.number}</span>
	</nav>

	<article class="markdown-body">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html data.html}
	</article>

	<ChapterNav prev={data.chapter.prev} next={data.chapter.next} />
</div>

<style>
	.chapter-view {
		max-width: var(--content-max);
		margin: 0 auto;
		width: 100%;
	}

	.crumbs {
		display: inline-flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 10px;
		padding: 7px 16px;
		margin-bottom: 2rem;
		font-size: 0.82rem;
		color: var(--text-faint);
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: var(--radius-pill);
	}

	.crumbs a {
		color: var(--text-muted);
		font-weight: 600;
	}

	.crumbs a:hover {
		color: var(--accent);
	}

	.sep {
		width: 4px;
		height: 4px;
		border-radius: 50%;
		background: var(--border-strong);
	}

	.current {
		color: var(--accent);
		font-weight: 650;
	}
</style>
