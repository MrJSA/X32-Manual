<script lang="ts">
	import type { ChapterMeta } from '#lib/content.js';
	import { page } from '$app/state';
	import { langOf, localize, texts } from '#lib/i18n/index.js';

	interface Props {
		prev: ChapterMeta | null;
		next: ChapterMeta | null;
	}

	let { prev, next }: Props = $props();

	const currentLang = $derived(langOf(page.url.pathname));
	const t = $derived(texts[currentLang]);
</script>

<div class="chapter-nav">
	{#if prev}
		<a href={localize(`/${prev.slug}`, currentLang)} class="nav-card prev-card">
			<span class="nav-direction">
				<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<line x1="19" y1="12" x2="5" y2="12"></line>
					<polyline points="12 19 5 12 12 5"></polyline>
				</svg>
				{t.prevChapter.toUpperCase()}
			</span>
			<span class="nav-title">
				{prev.shortTitle}
			</span>
		</a>
	{:else}
		<div class="empty-slot"></div>
	{/if}

	{#if next}
		<a href={localize(`/${next.slug}`, currentLang)} class="nav-card next-card">
			<span class="nav-direction">
				{t.nextChapter.toUpperCase()}
				<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<line x1="5" y1="12" x2="19" y2="12"></line>
					<polyline points="12 5 19 12 12 19"></polyline>
				</svg>
			</span>
			<span class="nav-title">
				{next.shortTitle}
			</span>
		</a>
	{:else}
		<div class="empty-slot"></div>
	{/if}
</div>

<style>
	.chapter-nav {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.25rem;
		margin-top: 3.5rem;
		padding-top: 2rem;
		border-top: 1px solid var(--border);
	}

	.nav-card {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		padding: 1.25rem 1.5rem;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		text-decoration: none;
		transition: all 0.15s ease;
		box-shadow: var(--shadow-sm);
	}

	.nav-card:hover {
		border-color: var(--accent);
		background: var(--surface-hover);
		transform: translateY(-2px);
		text-decoration: none;
	}

	.next-card {
		text-align: right;
		align-items: flex-end;
	}

	.nav-direction {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		font-family: var(--font-display);
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.07em;
		color: var(--text-faint);
	}

	.nav-title {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 1.05rem;
		font-weight: 600;
		color: var(--text);
	}

	.empty-slot {
		display: block;
	}

	@media (max-width: 640px) {
		.chapter-nav {
			grid-template-columns: 1fr;
		}
		.next-card {
			text-align: left;
			align-items: flex-start;
		}
	}
</style>
