<script lang="ts">
	import { getChapters } from '#lib/content.js';
	import { page } from '$app/state';
	import { langOf, localize, unlocalize, texts } from '#lib/i18n/index.js';

	interface Props {
		isOpen?: boolean;
		onClose?: () => void;
	}

	let { isOpen = false, onClose }: Props = $props();

	let activeSectionId = $state<string>('');

	const currentLang = $derived(langOf(page.url.pathname));
	const currentChapters = $derived(getChapters(currentLang));
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
		<nav class="nav-tree" aria-label="Manual Navigation">
			<a
				href={localize('/', currentLang)}
				class="nav-item home-link"
				class:active={unlocalize(page.url.pathname) === '/'}
				onclick={handleChapterClick}
			>
				<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
					<polyline points="9 22 9 12 15 12 15 22"></polyline>
				</svg>
				<span>{t.overviewAndIndex}</span>
			</a>

			{#each categories as [categoryName, items]}
				<div class="category-block">
					<div class="category-title">{categoryName}</div>
					{#each items as item}
						{@const isChapterActive = unlocalize(page.url.pathname) === `/${item.slug}`}
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
		border-right: 1px solid var(--border);
		background: var(--bg);
		height: calc(100vh - var(--header-h));
		position: sticky;
		top: var(--header-h);
		overflow-y: auto;
		z-index: 30;
	}

	.sidebar-inner {
		padding: 1.5rem 1rem 3rem 1.15rem;
	}

	.nav-tree {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.category-block {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}

	.category-title {
		font-family: var(--font-display);
		font-size: 0.74rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--text-faint);
		padding: 0.35rem 0.6rem 0.25rem;
	}

	.chapter-entry {
		display: flex;
		flex-direction: column;
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

	/* Subsections Tree (Expanded only for active chapter) */
	.subsections-tree {
		margin: 0.25rem 0 0.5rem 0.65rem;
		padding-left: 0.75rem;
		border-left: 1px solid var(--border-strong);
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
	}

	.sub-item {
		display: flex;
		align-items: flex-start;
		gap: 0.5rem;
		padding: 0.28rem 0.45rem;
		font-size: 0.8rem;
		line-height: 1.35;
		color: var(--text-muted);
		text-decoration: none;
		border-radius: var(--radius-sm);
		transition: all 0.12s ease;
		position: relative;
	}

	.sub-item:hover {
		color: var(--text);
		background: var(--surface-hover);
	}

	.sub-item.active {
		color: var(--accent);
		font-weight: 600;
		background: var(--accent-soft);
	}

	.sub-item.depth-3 {
		padding-left: 1rem;
		font-size: 0.76rem;
		color: var(--text-faint);
	}

	.sub-item.depth-3:hover {
		color: var(--text);
	}

	.sub-item.depth-3.active {
		color: var(--accent);
	}

	.sub-dot {
		width: 4px;
		height: 4px;
		border-radius: 50%;
		background: var(--text-faint);
		margin-top: 0.45rem;
		flex-shrink: 0;
		transition: all 0.15s ease;
	}

	.sub-item:hover .sub-dot {
		background: var(--text);
	}

	.sub-item.active .sub-dot {
		background: var(--accent);
		transform: scale(1.4);
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
