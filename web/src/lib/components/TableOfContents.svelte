<script lang="ts">
	import type { TocItem } from '#lib/markdown.js';

	interface Props {
		items: TocItem[];
	}

	let { items = [] }: Props = $props();
</script>

{#if items.length > 0}
	<aside class="toc">
		<div class="toc-header">ON THIS PAGE</div>
		<nav class="toc-nav">
			{#each items as item}
				<a
					href="#{item.id}"
					class="toc-link"
					class:depth-3={item.depth === 3}
				>
					{item.text}
				</a>
			{/each}
		</nav>
	</aside>
{/if}

<style>
	.toc {
		width: 220px;
		flex-shrink: 0;
		position: sticky;
		top: calc(var(--header-h) + 2rem);
		max-height: calc(100vh - var(--header-h) - 4rem);
		overflow-y: auto;
		padding-left: 1.5rem;
		border-left: 1px solid var(--border);
		display: none;
	}

	@media (min-width: 1140px) {
		.toc {
			display: block;
		}
	}

	.toc-header {
		font-family: var(--font-display);
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		color: var(--text-faint);
		margin-bottom: 0.85rem;
	}

	.toc-nav {
		display: flex;
		flex-direction: column;
		gap: 0.45rem;
	}

	.toc-link {
		font-size: 0.82rem;
		color: var(--text-muted);
		text-decoration: none;
		line-height: 1.4;
		transition: color 0.15s ease;
		display: block;
	}

	.toc-link:hover {
		color: var(--accent);
		text-decoration: none;
	}

	.toc-link.depth-3 {
		padding-left: 0.75rem;
		font-size: 0.78rem;
		color: var(--text-faint);
	}

	.toc-link.depth-3:hover {
		color: var(--text);
	}
</style>
