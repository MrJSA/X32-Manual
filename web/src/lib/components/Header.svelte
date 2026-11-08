<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import Logo from '#lib/components/Logo.svelte';
	import { langOf, langs, localize, rememberLang, texts, type Lang } from '#lib/i18n/index.js';

	interface Props {
		onToggleSidebar?: () => void;
		onOpenSearch?: () => void;
	}

	let { onToggleSidebar, onOpenSearch }: Props = $props();

	let theme = $state<'dark' | 'light'>('dark');

	const currentLang = $derived(langOf(page.url.pathname));
	const t = $derived(texts[currentLang]);
	const langNames: Record<Lang, string> = { en: 'English', de: 'Deutsch' };

	$effect(() => {
		theme = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
	});

	function toggleTheme() {
		const next = theme === 'dark' ? 'light' : 'dark';
		theme = next;
		document.documentElement.dataset.theme = next;
		try {
			localStorage.setItem('theme', next);
		} catch {
			// storage may be blocked (private mode)
		}
	}

	function switchLanguage(targetLang: Lang) {
		if (targetLang === currentLang) return;
		rememberLang(targetLang);
		goto(localize(page.url.pathname, targetLang));
	}
</script>

<header class="header">
	<div class="bar">
		<div class="left">
			<button class="icon-btn menu-btn" onclick={onToggleSidebar} aria-label={t.toggleMenu}>
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
					<path d="M4 7h16M4 12h10M4 17h16" />
				</svg>
			</button>

			<a href={localize('/', currentLang)} class="brand">
				<Logo size={34} />
				<span class="brand-text">
					<span class="brand-name">X32 / M32</span>
					<span class="brand-sub">{t.brandTitle}</span>
				</span>
			</a>
		</div>

		<div class="right">
			<button class="search" onclick={onOpenSearch} aria-label={t.searchTitle}>
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
					<circle cx="11" cy="11" r="7" />
					<path d="m20 20-3.5-3.5" />
				</svg>
				<span class="search-text">{t.searchPlaceholder}</span>
				<kbd>{t.searchKbd}</kbd>
			</button>

			<div class="segmented" role="group" aria-label={t.switchLang}>
				{#each langs as l (l)}
					<button
						class:active={currentLang === l}
						onclick={() => switchLanguage(l)}
						title={langNames[l]}
						aria-pressed={currentLang === l}
						lang={l}
					>
						{l.toUpperCase()}
					</button>
				{/each}
			</div>

			<button class="icon-btn" onclick={toggleTheme} aria-label={t.toggleTheme}>
				{#if theme === 'dark'}
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
						<circle cx="12" cy="12" r="4.5" />
						<path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
					</svg>
				{:else}
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z" />
					</svg>
				{/if}
			</button>
		</div>
	</div>
</header>

<style>
	.header {
		position: sticky;
		top: 0;
		z-index: 40;
		height: var(--header-h);
		padding: 12px clamp(12px, 2vw, 24px) 0;
	}

	.bar {
		max-width: var(--container);
		height: calc(var(--header-h) - 12px);
		margin: 0 auto;
		padding: 0 10px 0 12px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		background: var(--bg-elev);
		border: 1px solid var(--border);
		border-radius: var(--radius-pill);
		box-shadow: var(--shadow);
		backdrop-filter: blur(18px) saturate(1.4);
		-webkit-backdrop-filter: blur(18px) saturate(1.4);
	}

	.left,
	.right {
		display: flex;
		align-items: center;
		gap: 10px;
		min-width: 0;
	}

	.brand {
		display: flex;
		align-items: center;
		gap: 10px;
		color: var(--text);
		min-width: 0;
	}

	.brand:hover {
		color: var(--text);
	}

	.brand-text {
		display: flex;
		flex-direction: column;
		line-height: 1.1;
	}

	.brand-name {
		white-space: nowrap;
		font-family: var(--font-display);
		font-weight: 800;
		font-size: 1rem;
		letter-spacing: -0.02em;
	}

	.brand-sub {
		font-size: 0.75rem;
		color: var(--text-muted);
		font-weight: 500;
	}

	.search {
		display: flex;
		align-items: center;
		gap: 10px;
		height: 40px;
		padding: 0 8px 0 16px;
		min-width: 240px;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: var(--radius-pill);
		color: var(--text-faint);
		font-size: 0.9rem;
		cursor: pointer;
		transition: all 0.25s var(--ease);
	}

	.search:hover {
		background: var(--surface-hover);
		border-color: var(--border-strong);
		color: var(--text-muted);
	}

	.search-text {
		flex: 1;
		text-align: left;
	}

	kbd {
		font-family: var(--font-sans);
		font-size: 0.72rem;
		font-weight: 600;
		padding: 4px 9px;
		border-radius: var(--radius-pill);
		background: var(--surface-active);
		color: var(--text-muted);
	}

	.segmented {
		display: flex;
		padding: 4px;
		gap: 2px;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: var(--radius-pill);
	}

	.segmented button {
		border: 0;
		background: transparent;
		padding: 5px 11px;
		border-radius: var(--radius-pill);
		font-size: 0.76rem;
		font-weight: 700;
		color: var(--text-faint);
		cursor: pointer;
		transition: all 0.25s var(--ease);
	}

	.segmented button:hover {
		color: var(--text);
	}

	.segmented button.active {
		background: var(--grad);
		color: #1a0f12;
		box-shadow: 0 4px 14px -4px rgb(251 113 133 / 0.6);
	}

	.icon-btn {
		width: 40px;
		height: 40px;
		flex-shrink: 0;
		display: grid;
		place-items: center;
		border: 1px solid var(--border);
		background: var(--surface);
		color: var(--text-muted);
		border-radius: 50%;
		cursor: pointer;
		transition: all 0.25s var(--ease);
	}

	.icon-btn:hover {
		color: var(--text);
		background: var(--surface-hover);
		transform: rotate(-8deg);
	}

	.menu-btn {
		display: none;
	}

	@media (max-width: 860px) {
		.menu-btn {
			display: grid;
		}
		.search {
			min-width: 0;
			width: 40px;
			padding: 0;
			justify-content: center;
		}
		.search-text,
		kbd {
			display: none;
		}
	}

	@media (max-width: 480px) {
		.bar {
			gap: 6px;
			padding: 0 8px;
		}
		.brand-sub {
			display: none;
		}
		.right {
			gap: 6px;
		}
	}
</style>
