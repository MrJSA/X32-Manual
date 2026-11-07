<script lang="ts">
	import { CHAPTERS } from '#lib/content.js';
	import { page } from '$app/state';

	interface Props {
		isOpen?: boolean;
		onClose?: () => void;
	}

	let { isOpen = false, onClose }: Props = $props();

	// Group chapters by category
	const categories = $derived.by(() => {
		const map = new Map<string, typeof CHAPTERS>();
		for (const ch of CHAPTERS) {
			const list = map.get(ch.category) ?? [];
			list.push(ch);
			map.set(ch.category, list);
		}
		return Array.from(map.entries());
	});

	function handleLinkClick() {
		if (onClose) onClose();
	}
</script>

<aside class="sidebar" class:open={isOpen}>
	<div class="sidebar-inner">
		<nav class="nav-tree">
			<a href="/" class="nav-item home-link" class:active={page.url.pathname === '/'} onclick={handleLinkClick}>
				<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
					<polyline points="9 22 9 12 15 12 15 22"></polyline>
				</svg>
				<span>Overview & Index</span>
			</a>

			{#each categories as [categoryName, items]}
				<div class="category-block">
					<div class="category-title">{categoryName}</div>
					{#each items as item}
						{@const isActive = page.url.pathname === `/${item.slug}`}
						<a
							href="/{item.slug}"
							class="nav-item chapter-link"
							class:active={isActive}
							onclick={handleLinkClick}
						>
							<span class="chapter-badge">{item.number}</span>
							<span class="chapter-title">{item.shortTitle}</span>
						</a>
					{/each}
				</div>
			{/each}
		</nav>
	</div>
</aside>

{#if isOpen}
	<div class="backdrop" onclick={onClose} aria-hidden="true"></div>
{/if}

<style>
	.sidebar {
		width: var(--sidebar-w);
		flex-shrink: 0;
		border-right: 1px solid var(--border);
		background: var(--bg);
		height: calc(100vh - var(--header-h));
		position: sticky;
		top: var(--header-h);
		overflow-y: auto;
		z-index: 30;
	}

	.sidebar-inner {
		padding: 1.5rem 1rem 3rem 1.25rem;
	}

	.nav-tree {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.category-block {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.category-title {
		font-family: var(--font-display);
		font-size: 0.76rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--text-faint);
		padding: 0.35rem 0.6rem 0.25rem;
	}

	.nav-item {
		display: flex;
		align-items: center;
		gap: 0.65rem;
		padding: 0.45rem 0.65rem;
		border-radius: var(--radius-sm);
		color: var(--text-muted);
		text-decoration: none;
		font-size: 0.88rem;
		font-weight: 500;
		transition: all 0.12s ease;
	}

	.nav-item:hover {
		background: var(--surface-hover);
		color: var(--text);
	}

	.nav-item.active {
		background: var(--surface-active);
		color: var(--accent);
		font-weight: 600;
	}

	.chapter-badge {
		font-family: var(--font-mono);
		font-size: 0.72rem;
		background: var(--surface);
		border: 1px solid var(--border);
		padding: 0.1rem 0.35rem;
		border-radius: 4px;
		color: var(--text-faint);
		flex-shrink: 0;
	}

	.nav-item.active .chapter-badge {
		border-color: var(--accent);
		color: var(--accent);
		background: var(--accent-soft);
	}

	.chapter-title {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.home-link {
		font-weight: 600;
		color: var(--text);
		border: 1px solid var(--border);
		background: var(--surface);
		margin-bottom: 0.5rem;
	}

	.home-link.active {
		border-color: var(--accent);
		color: var(--accent);
	}

	.backdrop {
		display: none;
	}

	@media (max-width: 860px) {
		.sidebar {
			position: fixed;
			top: var(--header-h);
			left: 0;
			bottom: 0;
			height: calc(100vh - var(--header-h));
			transform: translateX(-100%);
			transition: transform 0.25s var(--ease);
			box-shadow: var(--shadow-lg);
			background: var(--bg-elev);
		}

		.sidebar.open {
			transform: translateX(0);
		}

		.backdrop {
			display: block;
			position: fixed;
			inset: 0;
			top: var(--header-h);
			background: rgba(0, 0, 0, 0.6);
			z-index: 25;
			backdrop-filter: blur(2px);
		}
	}
</style>
