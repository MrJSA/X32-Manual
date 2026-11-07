<script lang="ts">
	import ChapterNav from '#lib/components/ChapterNav.svelte';
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

<svelte:head>
	<title>{t.breadcrumbChapter} {data.chapter.number}: {data.chapter.title} | {t.brandBadge} Manual</title>
	<meta name="description" content={data.chapter.summary} />
</svelte:head>

<div class="chapter-view">
	<nav class="breadcrumbs" aria-label="Breadcrumb">
		<a href={localize('/', currentLang)} class="crumb-link">{t.breadcrumbManual}</a>
		<span class="crumb-sep">/</span>
		<span class="crumb-category">{data.chapter.category}</span>
		<span class="crumb-sep">/</span>
		<span class="crumb-current">{t.breadcrumbChapter} {data.chapter.number}</span>
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

	.breadcrumbs {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.84rem;
		color: var(--text-muted);
		margin-bottom: 2rem;
	}

	.crumb-link {
		color: var(--text-muted);
		text-decoration: none;
		transition: color 0.12s ease;
	}

	.crumb-link:hover {
		color: var(--accent);
	}

	.crumb-sep {
		color: var(--border-strong);
	}

	.crumb-category {
		color: var(--text-faint);
	}

	.crumb-current {
		color: var(--accent-cyan);
		font-weight: 500;
	}
</style>
