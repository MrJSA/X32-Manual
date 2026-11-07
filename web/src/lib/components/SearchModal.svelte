<script lang="ts">
	import { buildSearchIndex } from '#lib/content.js';

	interface Props {
		isOpen?: boolean;
		onClose?: () => void;
	}

	let { isOpen = false, onClose }: Props = $props();

	let query = $state('');
	const searchIndex = buildSearchIndex();

	let results = $derived.by(() => {
		const q = query.trim().toLowerCase();
		if (!q) return [];
		return searchIndex
			.filter((entry) => {
				return (
					entry.title.toLowerCase().includes(q) ||
					entry.number.toLowerCase().includes(q) ||
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
			aria-label="Search manual"
		>
			<div class="search-input-wrap">
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<circle cx="11" cy="11" r="8"></circle>
					<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
				</svg>
				<!-- svelte-ignore a11y_autofocus -->
				<input
					type="text"
					bind:value={query}
					placeholder="Search chapters, routing, plugins, preamps..."
					class="search-input"
					autofocus
				/>
				<button class="close-btn" onclick={onClose} aria-label="Close search">
					<kbd>Esc</kbd>
				</button>
			</div>

			<div class="search-results">
				{#if query.trim() && results.length === 0}
					<div class="empty-state">No matching topics found for "{query}"</div>
				{:else if results.length > 0}
					<div class="results-list">
						{#each results as item}
							<a href="/{item.slug}" class="result-card" onclick={onClose}>
								<div class="result-header">
									<span class="badge">{item.number}</span>
									<span class="title">{item.title}</span>
									<span class="cat">{item.category}</span>
								</div>
								<p class="excerpt">{item.excerpt}</p>
							</a>
						{/each}
					</div>
				{:else}
					<div class="search-hints">
						<span class="hint-title">POPULAR TOPICS:</span>
						<div class="hint-tags">
							<button class="hint-tag" onclick={() => (query = 'User Routing')}>User Routing</button>
							<button class="hint-tag" onclick={() => (query = 'Vintage Compressor')}>Vintage Compressors</button>
							<button class="hint-tag" onclick={() => (query = 'Sends on Faders')}>Sends on Faders</button>
							<button class="hint-tag" onclick={() => (query = 'Gain Split')}>Gain Split</button>
							<button class="hint-tag" onclick={() => (query = 'Virtual Soundcheck')}>Virtual Soundcheck</button>
							<button class="hint-tag" onclick={() => (query = 'AES50 Shielded')}>AES50 Cabling</button>
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
		background: rgba(0, 0, 0, 0.7);
		backdrop-filter: blur(6px);
		z-index: 50;
		display: flex;
		align-items: flex-start;
		justify-content: center;
		padding: 5rem 1rem 2rem;
	}

	.search-dialog {
		width: 100%;
		max-width: 620px;
		background: var(--bg-elev);
		border: 1px solid var(--border-strong);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-lg);
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	.search-input-wrap {
		display: flex;
		align-items: center;
		gap: 0.85rem;
		padding: 1.1rem 1.4rem;
		border-bottom: 1px solid var(--border);
		color: var(--text-muted);
	}

	.search-input {
		flex: 1;
		background: transparent;
		border: none;
		outline: none;
		font-size: 1.05rem;
		color: var(--text);
		font-family: inherit;
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
		font-family: var(--font-mono);
		font-size: 0.75rem;
		background: var(--surface);
		border: 1px solid var(--border);
		padding: 0.15rem 0.4rem;
		border-radius: 4px;
		color: var(--text-faint);
	}

	.search-results {
		max-height: 420px;
		overflow-y: auto;
		padding: 1rem;
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
		gap: 0.5rem;
	}

	.result-card {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		padding: 0.9rem 1.1rem;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		text-decoration: none;
		transition: all 0.12s ease;
	}

	.result-card:hover {
		border-color: var(--accent);
		background: var(--surface-hover);
		text-decoration: none;
	}

	.result-header {
		display: flex;
		align-items: center;
		gap: 0.6rem;
	}

	.badge {
		font-family: var(--font-mono);
		font-size: 0.72rem;
		background: var(--bg);
		border: 1px solid var(--border-strong);
		padding: 0.1rem 0.35rem;
		border-radius: 4px;
		color: var(--accent);
	}

	.title {
		font-size: 0.95rem;
		font-weight: 600;
		color: var(--text);
		flex: 1;
	}

	.cat {
		font-size: 0.75rem;
		color: var(--text-faint);
	}

	.excerpt {
		font-size: 0.82rem;
		color: var(--text-muted);
		line-height: 1.4;
	}

	.search-hints {
		padding: 1.5rem 0.5rem;
	}

	.hint-title {
		font-family: var(--font-display);
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		color: var(--text-faint);
		display: block;
		margin-bottom: 0.75rem;
	}

	.hint-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.hint-tag {
		background: var(--surface);
		border: 1px solid var(--border);
		color: var(--text-muted);
		padding: 0.35rem 0.7rem;
		border-radius: 9999px;
		font-size: 0.82rem;
		cursor: pointer;
		transition: all 0.12s ease;
	}

	.hint-tag:hover {
		border-color: var(--accent);
		color: var(--text);
	}
</style>
