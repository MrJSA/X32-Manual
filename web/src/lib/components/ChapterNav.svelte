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
				{t.prevChapter}
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
				{t.nextChapter}
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
		gap: 16px;
		margin-top: 4rem;
	}

	.nav-card {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 6px;
		padding: 22px 26px;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		overflow: hidden;
		isolation: isolate;
		transition:
			transform 0.35s var(--ease),
			border-color 0.35s var(--ease),
			box-shadow 0.35s var(--ease);
	}

	.nav-card::before {
		content: '';
		position: absolute;
		inset: 0;
		z-index: -1;
		background: var(--grad-soft);
		opacity: 0;
		transition: opacity 0.35s var(--ease);
	}

	.nav-card:hover {
		transform: translateY(-3px);
		border-color: rgb(251 113 133 / 0.35);
		box-shadow: var(--shadow);
	}

	.nav-card:hover::before {
		opacity: 1;
	}

	.next-card {
		text-align: right;
		align-items: flex-end;
	}

	.nav-direction {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 0.8rem;
		font-weight: 600;
		color: var(--text-faint);
	}

	.nav-direction svg {
		transition: transform 0.3s var(--ease);
	}

	.prev-card:hover .nav-direction svg {
		transform: translateX(-4px);
	}

	.next-card:hover .nav-direction svg {
		transform: translateX(4px);
	}

	.nav-title {
		font-family: var(--font-display);
		font-size: 1.08rem;
		font-weight: 700;
		letter-spacing: -0.015em;
		color: var(--text);
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
