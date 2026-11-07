<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { langOf, localize, rememberLang, texts, type Lang } from '#lib/i18n/index.js';

	interface Props {
		onToggleSidebar?: () => void;
		onOpenSearch?: () => void;
	}

	let { onToggleSidebar, onOpenSearch }: Props = $props();

	let theme = $state<'dark' | 'light'>('dark');

	const currentLang = $derived(langOf(page.url.pathname));
	const t = $derived(texts[currentLang]);

	$effect(() => {
		if (typeof document !== 'undefined') {
			theme = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
		}
	});

	function toggleTheme() {
		const next = theme === 'dark' ? 'light' : 'dark';
		theme = next;
		if (typeof document !== 'undefined') {
			document.documentElement.dataset.theme = next;
			localStorage.setItem('theme', next);
		}
	}

	function switchLanguage(targetLang: Lang) {
		if (targetLang === currentLang) return;
		rememberLang(targetLang);
		const targetUrl = localize(page.url.pathname, targetLang);
		goto(targetUrl);
	}
</script>

<header class="header">
	<div class="header-inner">
		<div class="left-group">
			<button class="mobile-toggle" onclick={onToggleSidebar} aria-label="Toggle navigation menu">
				<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<line x1="3" y1="12" x2="21" y2="12"></line>
					<line x1="3" y1="6" x2="21" y2="6"></line>
					<line x1="3" y1="18" x2="21" y2="18"></line>
				</svg>
			</button>

			<a href={localize('/', currentLang)} class="brand">
				<span class="brand-badge">{t.brandBadge}</span>
				<span class="brand-title">{t.brandTitle}</span>
			</a>
			<span class="firmware-tag">{t.firmwareTag}</span>
		</div>

		<div class="right-group">
			<button class="search-trigger" onclick={onOpenSearch} aria-label={t.searchTitle}>
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<circle cx="11" cy="11" r="8"></circle>
					<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
				</svg>
				<span class="search-text">{t.searchPlaceholder}</span>
				<kbd class="search-kbd">{t.searchKbd}</kbd>
			</button>

			<!-- Language Switcher -->
			<div class="lang-switcher" role="group" aria-label={t.switchLang}>
				<button
					class="lang-btn"
					class:active={currentLang === 'en'}
					onclick={() => switchLanguage('en')}
					title="English"
					aria-pressed={currentLang === 'en'}
				>
					EN
				</button>
				<span class="lang-divider">/</span>
				<button
					class="lang-btn"
					class:active={currentLang === 'de'}
					onclick={() => switchLanguage('de')}
					title="Deutsch"
					aria-pressed={currentLang === 'de'}
				>
					DE
				</button>
			</div>

			<button class="icon-button" onclick={toggleTheme} aria-label={t.toggleTheme}>
				{#if theme === 'dark'}
					<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<circle cx="12" cy="12" r="5"></circle>
						<line x1="12" y1="1" x2="12" y2="3"></line>
						<line x1="12" y1="21" x2="12" y2="23"></line>
						<line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
						<line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
						<line x1="1" y1="12" x2="3" y2="12"></line>
						<line x1="21" y1="12" x2="23" y2="12"></line>
						<line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
						<line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
					</svg>
				{:else}
					<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
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
		background: var(--bg-elev);
		border-bottom: 1px solid var(--border);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
	}

	.header-inner {
		max-width: var(--container);
		height: 100%;
		margin: 0 auto;
		padding: 0 1.5rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.left-group {
		display: flex;
		align-items: center;
		gap: 0.85rem;
	}

	.mobile-toggle {
		display: none;
		background: transparent;
		border: none;
		color: var(--text-muted);
		cursor: pointer;
		padding: 0.35rem;
		border-radius: var(--radius-sm);
	}

	.brand {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		text-decoration: none;
		color: var(--text);
	}

	.brand-badge {
		font-family: var(--font-display);
		font-weight: 700;
		font-size: 0.85rem;
		background: var(--accent);
		color: #000;
		padding: 0.2rem 0.5rem;
		border-radius: var(--radius-sm);
		letter-spacing: 0.04em;
	}

	.brand-title {
		font-family: var(--font-display);
		font-weight: 700;
		font-size: 1.15rem;
		letter-spacing: 0.05em;
	}

	.firmware-tag {
		font-family: var(--font-mono);
		font-size: 0.72rem;
		background: var(--surface);
		border: 1px solid var(--border);
		padding: 0.15rem 0.45rem;
		border-radius: 9999px;
		color: var(--accent-cyan);
	}

	.right-group {
		display: flex;
		align-items: center;
		gap: 0.85rem;
	}

	.search-trigger {
		display: flex;
		align-items: center;
		gap: 0.65rem;
		background: var(--surface);
		border: 1px solid var(--border);
		color: var(--text-muted);
		padding: 0.4rem 0.8rem;
		border-radius: var(--radius-sm);
		cursor: pointer;
		font-size: 0.88rem;
		transition: all 0.15s ease;
	}

	.search-trigger:hover {
		border-color: var(--border-strong);
		color: var(--text);
	}

	.search-kbd {
		font-family: var(--font-mono);
		font-size: 0.72rem;
		background: var(--bg);
		border: 1px solid var(--border);
		padding: 0.1rem 0.35rem;
		border-radius: 4px;
		color: var(--text-faint);
	}

	/* Language Switcher */
	.lang-switcher {
		display: flex;
		align-items: center;
		gap: 0.2rem;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
		padding: 0.2rem 0.4rem;
	}

	.lang-btn {
		background: transparent;
		border: none;
		font-family: var(--font-display);
		font-size: 0.78rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		color: var(--text-faint);
		cursor: pointer;
		padding: 0.15rem 0.35rem;
		border-radius: 3px;
		transition: all 0.12s ease;
	}

	.lang-btn:hover {
		color: var(--text);
	}

	.lang-btn.active {
		background: var(--accent);
		color: #000;
	}

	.lang-divider {
		font-size: 0.72rem;
		color: var(--border-strong);
		user-select: none;
	}

	.icon-button {
		background: var(--surface);
		border: 1px solid var(--border);
		color: var(--text-muted);
		width: 36px;
		height: 36px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: var(--radius-sm);
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.icon-button:hover {
		border-color: var(--border-strong);
		color: var(--text);
	}

	@media (max-width: 860px) {
		.mobile-toggle {
			display: block;
		}
		.firmware-tag,
		.search-text,
		.search-kbd {
			display: none;
		}
		.search-trigger {
			padding: 0.5rem;
		}
	}
</style>
