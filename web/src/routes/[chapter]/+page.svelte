<script lang="ts">
	import ChapterNav from '#lib/components/ChapterNav.svelte';
	import type { ChapterMeta } from '#lib/content.js';
	import type { TocItem } from '#lib/markdown.js';

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
</script>

<svelte:head>
	<title>Chapter {data.chapter.number}: {data.chapter.title} | X32 Manual</title>
	<meta name="description" content={data.chapter.summary} />
</svelte:head>

<div class="chapter-view">
	<nav class="breadcrumbs" aria-label="Breadcrumb">
		<a href="/" class="crumb-link">Manual</a>
		<span class="crumb-sep">/</span>
		<span class="crumb-category">{data.chapter.category}</span>
		<span class="crumb-sep">/</span>
		<span class="crumb-current">Chapter {data.chapter.number}</span>
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
	}

	.crumb-link:hover {
		color: var(--accent);
	}

	.crumb-sep {
		color: var(--text-faint);
	}

	.crumb-category {
		color: var(--text-faint);
	}

	.crumb-current {
		color: var(--accent);
		font-weight: 600;
	}
</style>
