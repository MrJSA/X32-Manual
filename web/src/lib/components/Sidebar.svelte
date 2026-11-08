<script lang="ts">
	import { page } from '$app/state';
	import { langOf, localize, samePage, texts } from '#lib/i18n/index.js';

	interface Props {
		isOpen?: boolean;
		onClose?: () => void;
	}

	let { isOpen = false, onClose }: Props = $props();

	let activeSectionId = $state<string>('');

	const currentLang = $derived(langOf(page.url.pathname));
	// Built at prerender time by +layout.server.ts.
	const currentChapters = $derived(page.data.nav ?? []);
	const t = $derived(texts[currentLang]);

	// Group chapters by category in strict sequential order
	const categories = $derived.by(() => {
		const map = new Map<string, typeof currentChapters>();
		for (const ch of currentChapters) {
			const list = map.get(ch.category) ?? [];
			list.push(ch);
			map.set(ch.category, list);
		}
		return Array.from(map.entries());
	});

	function handleChapterClick() {
		if (onClose && typeof window !== 'undefined' && window.innerWidth <= 860) {
			onClose();
		}
	}

	function handleSubsectionClick() {
		if (onClose && typeof window !== 'undefined' && window.innerWidth <= 860) {
			onClose();
		}
	}

	// Active section observer on scroll
	$effect(() => {
		const currentPath = page.url.pathname;
		if (typeof window === 'undefined') return;

		// Reset active section when changing chapter
		activeSectionId = '';

		let observer: IntersectionObserver | null = null;

		// Use requestAnimationFrame / timeout to ensure the new chapter's DOM is mounted
		const timer = setTimeout(() => {
			const headings = Array.from(document.querySelectorAll<HTMLElement>('.markdown-body h2[id], .markdown-body h3[id]'));
			if (headings.length === 0) return;

			// If URL has a hash, mark it active initially
			const hash = window.location.hash.replace(/^#/, '');
			if (hash) {
				activeSectionId = hash;
			} else if (headings[0]) {
				activeSectionId = headings[0].id;
			}

			observer = new IntersectionObserver(
				(entries) => {
					for (const entry of entries) {
						if (entry.isIntersecting) {
							activeSectionId = entry.target.id;
							break;
						}
					}
				},
				{
					rootMargin: '-80px 0px -70% 0px'
				}
			);

			for (const heading of headings) {
				observer.observe(heading);
			}
		}, 100);

		return () => {
			clearTimeout(timer);
			if (observer) {
				observer.disconnect();
			}
		};
	});
</script>

<aside class="sidebar" class:open={isOpen}>
	<div class="sidebar-inner">
		<nav class="nav-tree" aria-label={t.navLabel}>
			<a
				href={localize('/', currentLang)}
				class="nav-item home-link"
				class:active={samePage(page.url.pathname, '/')}
				onclick={handleChapterClick}
			>
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
					<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
					<polyline points="9 22 9 12 15 12 15 22"></polyline>
				</svg>
				<span>{t.overviewAndIndex}</span>
			</a>

			{#each categories as [categoryName, items]}
				<div class="category-block">
					<div class="category-title">{categoryName}</div>
					{#each items as item}
						{@const isChapterActive = samePage(page.url.pathname, `/${item.slug}`)}
						<div class="chapter-entry" class:expanded={isChapterActive}>
							<a
								href={localize(`/${item.slug}`, currentLang)}
								class="nav-item chapter-link"
								class:active={isChapterActive}
								onclick={handleChapterClick}
							>
								<span class="chapter-title">{item.shortTitle}</span>
							</a>

							{#if isChapterActive && item.toc && item.toc.length > 0}
								<div class="subsections-tree">
									{#each item.toc as heading (heading.id)}
										{@const isSectionActive = activeSectionId === heading.id}
										<a
											href="{localize(`/${item.slug}`, currentLang)}#{heading.id}"
											class="sub-item"
											class:depth-3={heading.depth === 3}
											class:active={isSectionActive}
											onclick={handleSubsectionClick}
											title={heading.text}
										>
											<span class="sub-dot"></span>
											<span class="sub-text">{heading.text}</span>
										</a>
									{/each}
								</div>
							{/if}
						</div>
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
		height: calc(100vh - var(--header-h));
		position: sticky;
		top: var(--header-h);
		overflow-y: auto;
		overscroll-behavior: contain;
		z-index: 30;
		padding: 24px 8px 40px 0;
	}

	.sidebar-inner {
		padding: 0 6px 0 4px;
	}

	.nav-tree {
		display: flex;
		flex-direction: column;
		gap: 22px;
	}

	.category-block {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.category-title {
		font-family: var(--font-display);
		font-size: 0.74rem;
		font-weight: 700;
		color: var(--text-faint);
		padding: 0 14px 6px;
	}

	.chapter-entry {
		display: flex;
		flex-direction: column;
	}

	.nav-item {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 8px 14px;
		border-radius: var(--radius-pill);
		color: var(--text-muted);
		font-size: 0.9rem;
		font-weight: 500;
		transition:
			background 0.25s var(--ease),
			color 0.25s var(--ease),
			transform 0.25s var(--ease);
	}

	.nav-item:hover {
		background: var(--surface-hover);
		color: var(--text);
		transform: translateX(2px);
	}

	.nav-item.active {
		background: var(--grad-soft);
		color: var(--text);
		font-weight: 650;
		box-shadow: inset 0 0 0 1px var(--border);
	}

	.chapter-title {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.home-link {
		font-weight: 600;
		color: var(--text);
		background: var(--surface);
		border: 1px solid var(--border);
		padding: 11px 16px;
	}

	.home-link svg {
		color: var(--accent);
	}

	.subsections-tree {
		margin: 6px 0 10px 22px;
		padding-left: 12px;
		border-left: 2px solid var(--border);
		display: flex;
		flex-direction: column;
		gap: 1px;
	}

	.sub-item {
		display: flex;
		align-items: flex-start;
		gap: 9px;
		padding: 5px 10px;
		font-size: 0.8rem;
		line-height: 1.4;
		color: var(--text-muted);
		border-radius: var(--radius-sm);
		transition: all 0.2s var(--ease);
	}

	.sub-item:hover {
		color: var(--text);
		background: var(--surface);
	}

	.sub-item.active {
		color: var(--accent);
		font-weight: 600;
	}

	.sub-item.depth-3 {
		padding-left: 22px;
		font-size: 0.77rem;
		color: var(--text-faint);
	}

	.sub-item.depth-3:hover,
	.sub-item.depth-3.active {
		color: var(--text);
	}

	.sub-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--border-strong);
		margin-top: 0.42rem;
		flex-shrink: 0;
		transition: all 0.25s var(--ease);
	}

	.sub-item.active .sub-dot {
		background: var(--grad);
		box-shadow: 0 0 10px rgb(251 113 133 / 0.7);
		transform: scale(1.3);
	}

	.sub-text {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.backdrop {
		display: none;
	}

	@media (max-width: 860px) {
		.sidebar {
			position: fixed;
			top: calc(var(--header-h) + 8px);
			left: 12px;
			bottom: 12px;
			height: auto;
			width: min(var(--sidebar-w), calc(100vw - 24px));
			padding: 18px 8px 24px;
			transform: translateX(calc(-100% - 24px));
			transition: transform 0.4s var(--ease);
			background: var(--surface-solid);
			border: 1px solid var(--border);
			border-radius: var(--radius-lg);
			box-shadow: var(--shadow-lg);
			z-index: 45;
		}

		.sidebar.open {
			transform: translateX(0);
		}

		.backdrop {
			display: block;
			position: fixed;
			inset: 0;
			background: rgb(5 6 15 / 0.45);
			z-index: 35;
			backdrop-filter: blur(4px);
		}
	}
</style>
