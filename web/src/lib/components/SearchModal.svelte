<script lang="ts">
	import type { SearchEntry } from '#lib/content.js';
	import { page } from '$app/state';
	import { langOf, localize, texts, type Lang } from '#lib/i18n/index.js';

	interface Props {
		isOpen?: boolean;
		onClose?: () => void;
	}

	let { isOpen = false, onClose }: Props = $props();

	let query = $state('');

	const currentLang = $derived(langOf(page.url.pathname));
	const t = $derived(texts[currentLang]);

	// The index (prerendered /search.json) is only downloaded the first time search opens.
	let indexByLang = $state<Record<Lang, SearchEntry[]> | null>(null);
	let loading = false;
	$effect(() => {
		if (!isOpen || indexByLang || loading) return;
		loading = true;
		fetch('/search.json')
			.then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
			.then((data) => (indexByLang = data))
			.catch(() => {})
			.finally(() => (loading = false));
	});
	const searchIndex = $derived(indexByLang?.[currentLang] ?? []);

	let results = $derived.by(() => {
		const q = query.trim().toLowerCase();
		if (!q) return [];
		return searchIndex
			.filter((entry) => {
				return (
					entry.title.toLowerCase().includes(q) ||
					entry.category.toLowerCase().includes(q) ||
					entry.headings.some((h: string) => h.toLowerCase().includes(q)) ||
					entry.excerpt.toLowerCase().includes(q)
				);
			})
			.slice(0, 8);
	});

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			if (onClose) onClose();
		}
	}
</script>

<svelte:window onkeydown={handleKeyDown} />

{#if isOpen}
	<div class="search-overlay" onclick={onClose} aria-hidden="true">
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<div
			class="search-dialog"
			onclick={(e) => e.stopPropagation()}
			onkeydown={handleKeyDown}
			role="dialog"
			tabindex="0"
			aria-modal="true"
			aria-label={t.searchTitle}
		>
			<div class="search-input-wrap">
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<circle cx="11" cy="11" r="8"></circle>
					<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
				</svg>
				<!-- svelte-ignore a11y_autofocus -->
				<input
					type="search"
					autocomplete="off"
					spellcheck="false"
					bind:value={query}
					placeholder={t.searchPlaceholder}
					class="search-input"
					autofocus
				/>
				<button class="close-btn" onclick={onClose} aria-label={t.closeSearch}>
					<kbd>Esc</kbd>
				</button>
			</div>

			<div class="search-results">
				{#if query.trim() && results.length === 0}
					<div class="empty-state">{t.searchNoResults} "{query}"</div>
				{:else if results.length > 0}
					<div class="results-list">
						{#each results as item}
							<a href={localize(`/${item.slug}`, currentLang)} class="result-card" onclick={onClose}>
								<div class="result-header">
									<span class="title">{item.title}</span>
									<span class="cat">{item.category}</span>
								</div>
								<p class="excerpt">{item.excerpt}</p>
							</a>
						{/each}
					</div>
				{:else}
					<div class="search-hints">
						<span class="hint-title">{t.popularTopics}</span>
						<div class="hint-tags">
							{#if currentLang === 'de'}
								<button class="hint-tag" onclick={() => (query = 'User Routing')}>User Routing</button>
								<button class="hint-tag" onclick={() => (query = 'Kompressor')}>Kompressoren</button>
								<button class="hint-tag" onclick={() => (query = 'Sends on Faders')}>Sends on Faders</button>
								<button class="hint-tag" onclick={() => (query = 'Gain Split')}>Gain Split</button>
								<button class="hint-tag" onclick={() => (query = 'Virtual Soundcheck')}>Virtual Soundcheck</button>
								<button class="hint-tag" onclick={() => (query = 'AES50 geschirmt')}>AES50 Verkabelung</button>
							{:else}
								<button class="hint-tag" onclick={() => (query = 'User Routing')}>User Routing</button>
								<button class="hint-tag" onclick={() => (query = 'Vintage Compressor')}>Vintage Compressors</button>
								<button class="hint-tag" onclick={() => (query = 'Sends on Faders')}>Sends on Faders</button>
								<button class="hint-tag" onclick={() => (query = 'Gain Split')}>Gain Split</button>
								<button class="hint-tag" onclick={() => (query = 'Virtual Soundcheck')}>Virtual Soundcheck</button>
								<button class="hint-tag" onclick={() => (query = 'AES50 Shielded')}>AES50 Cabling</button>
							{/if}
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}

<style>
	.search-overlay {
		position: fixed;
		inset: 0;
		z-index: 60;
		display: flex;
		align-items: flex-start;
		justify-content: center;
		padding: 12vh 16px 24px;
		background: rgb(5 6 15 / 0.5);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		animation: fade 0.25s var(--ease);
	}

	.search-dialog {
		width: 100%;
		max-width: 640px;
		background: var(--surface-solid);
		border: 1px solid var(--border-strong);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-lg);
		overflow: hidden;
		display: flex;
		flex-direction: column;
		animation: pop 0.35s var(--ease);
	}

	@keyframes fade {
		from {
			opacity: 0;
		}
	}

	@keyframes pop {
		from {
			opacity: 0;
			transform: translateY(12px) scale(0.98);
		}
	}

	.search-input-wrap {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 16px 18px 16px 22px;
		border-bottom: 1px solid var(--border);
		color: var(--accent);
	}

	.search-input {
		flex: 1;
		min-width: 0;
		background: transparent;
		border: none;
		outline: none;
		font-size: 1.08rem;
		color: var(--text);
		font-family: inherit;
	}

	.search-input::-webkit-search-cancel-button {
		display: none;
	}

	.search-input::placeholder {
		color: var(--text-faint);
	}

	.close-btn {
		background: transparent;
		border: none;
		cursor: pointer;
	}

	.close-btn kbd {
		font-family: var(--font-sans);
		font-size: 0.72rem;
		font-weight: 600;
		background: var(--surface-active);
		padding: 4px 10px;
		border-radius: var(--radius-pill);
		color: var(--text-muted);
	}

	.search-results {
		max-height: min(460px, 60vh);
		overflow-y: auto;
		padding: 10px;
	}

	.empty-state {
		padding: 2.5rem 1rem;
		text-align: center;
		color: var(--text-faint);
		font-size: 0.95rem;
	}

	.results-list {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.result-card {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 14px 16px;
		border-radius: var(--radius);
		color: var(--text);
		transition: background 0.2s var(--ease);
	}

	.result-card:hover,
	.result-card:focus-visible {
		background: var(--grad-soft);
		color: var(--text);
	}

	.result-header {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.title {
		font-family: var(--font-display);
		font-size: 0.98rem;
		font-weight: 700;
		flex: 1;
	}

	.cat {
		font-size: 0.72rem;
		font-weight: 600;
		color: var(--text-muted);
		padding: 3px 10px;
		border-radius: var(--radius-pill);
		background: var(--surface);
		border: 1px solid var(--border);
		white-space: nowrap;
	}

	.excerpt {
		font-size: 0.83rem;
		color: var(--text-muted);
		line-height: 1.45;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.search-hints {
		padding: 18px 12px 14px;
	}

	.hint-title {
		font-family: var(--font-display);
		font-size: 0.8rem;
		font-weight: 700;
		color: var(--text-faint);
		display: block;
		margin-bottom: 12px;
	}

	.hint-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.hint-tag {
		background: var(--surface);
		border: 1px solid var(--border);
		color: var(--text-muted);
		padding: 7px 14px;
		border-radius: var(--radius-pill);
		font-size: 0.84rem;
		cursor: pointer;
		transition: all 0.25s var(--ease);
	}

	.hint-tag:hover {
		background: var(--grad-soft);
		border-color: rgb(251 113 133 / 0.35);
		color: var(--text);
		transform: translateY(-1px);
	}
</style>
