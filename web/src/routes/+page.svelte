<script lang="ts">
	import type { ChapterMeta } from '#lib/content.js';

	interface Props {
		data: {
			chapters: ChapterMeta[];
			renderedIndex: string;
		};
	}

	let { data }: Props = $props();

	// Group chapters by category
	const categories = $derived.by(() => {
		const map = new Map<string, ChapterMeta[]>();
		for (const ch of data.chapters) {
			const list = map.get(ch.category) ?? [];
			list.push(ch);
			map.set(ch.category, list);
		}
		return Array.from(map.entries());
	});
</script>

<svelte:head>
	<title>X32 / M32 Technical Manual & Field Guide (FW 4.x)</title>
	<meta name="description" content="Comprehensive engineering guide and reference manual for Behringer X32 and Midas M32 consoles." />
</svelte:head>

<div class="home-page">
	<div class="hero">
		<div class="badge-row">
			<span class="hero-badge">BEHRINGER X32 & MIDAS M32</span>
			<span class="firmware-badge">FIRMWARE 4.x</span>
		</div>
		<h1 class="hero-title">Console Engineering & Field Guide</h1>
		<p class="hero-subtitle">
			A complete, practical, and in-depth technical manual for routing, headamp gain staging, channel processing, mix buses, virtual rack plugins, and live show automation.
		</p>

		<div class="stats-row">
			<div class="stat-card">
				<span class="stat-val">40</span>
				<span class="stat-lbl">Processing Channels</span>
			</div>
			<div class="stat-card">
				<span class="stat-val">25</span>
				<span class="stat-lbl">Time-Aligned Buses</span>
			</div>
			<div class="stat-card">
				<span class="stat-val">8</span>
				<span class="stat-lbl">Virtual FX Slots</span>
			</div>
			<div class="stat-card">
				<span class="stat-val">14</span>
				<span class="stat-lbl">Manual Chapters</span>
			</div>
		</div>
	</div>

	<div class="chapters-section">
		<h2 class="section-title">Manual Table of Contents</h2>

		<div class="categories-container">
			{#each categories as [categoryName, items]}
				<div class="category-group">
					<h3 class="category-heading">{categoryName}</h3>
					<div class="cards-grid">
						{#each items as item}
							<a href="/{item.slug}" class="chapter-card">
								<div class="card-top">
									<span class="chapter-number">{item.number}</span>
									<span class="chapter-badge">{item.category}</span>
								</div>
								<h4 class="card-title">{item.title}</h4>
								<p class="card-desc">{item.summary}</p>
								<div class="card-footer">
									<span class="read-link">
										Read chapter
										<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
											<line x1="5" y1="12" x2="19" y2="12"></line>
											<polyline points="12 5 19 12 12 19"></polyline>
										</svg>
									</span>
								</div>
							</a>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.home-page {
		max-width: var(--container);
		margin: 0 auto;
	}

	.hero {
		padding: 2rem 0 3.5rem;
		border-bottom: 1px solid var(--border);
		margin-bottom: 3.5rem;
	}

	.badge-row {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 1.25rem;
	}

	.hero-badge {
		font-family: var(--font-display);
		font-weight: 700;
		font-size: 0.78rem;
		letter-spacing: 0.08em;
		background: var(--accent);
		color: #000;
		padding: 0.25rem 0.6rem;
		border-radius: var(--radius-sm);
	}

	.firmware-badge {
		font-family: var(--font-mono);
		font-size: 0.76rem;
		background: var(--surface);
		border: 1px solid var(--border-strong);
		padding: 0.2rem 0.55rem;
		border-radius: 9999px;
		color: var(--accent-cyan);
	}

	.hero-title {
		font-family: var(--font-display);
		font-size: clamp(2rem, 4.5vw, 3.25rem);
		font-weight: 700;
		line-height: 1.15;
		color: var(--text);
		margin-bottom: 1.25rem;
		letter-spacing: -0.02em;
	}

	.hero-subtitle {
		font-size: 1.15rem;
		color: var(--text-muted);
		max-width: 780px;
		line-height: 1.6;
		margin-bottom: 2.5rem;
	}

	.stats-row {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
		gap: 1rem;
		max-width: 720px;
	}

	.stat-card {
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		padding: 1.1rem 1.25rem;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.stat-val {
		font-family: var(--font-display);
		font-size: 1.85rem;
		font-weight: 700;
		color: var(--accent);
		line-height: 1;
	}

	.stat-lbl {
		font-size: 0.8rem;
		color: var(--text-muted);
		font-weight: 500;
	}

	.section-title {
		font-family: var(--font-display);
		font-size: 1.6rem;
		font-weight: 700;
		margin-bottom: 2rem;
		color: var(--text);
	}

	.categories-container {
		display: flex;
		flex-direction: column;
		gap: 2.75rem;
	}

	.category-heading {
		font-family: var(--font-display);
		font-size: 0.95rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--accent-cyan);
		margin-bottom: 1.2rem;
		padding-bottom: 0.4rem;
		border-bottom: 1px solid var(--border);
	}

	.cards-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: 1.25rem;
	}

	.chapter-card {
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		padding: 1.35rem 1.5rem;
		display: flex;
		flex-direction: column;
		text-decoration: none;
		transition: all 0.18s var(--ease);
		box-shadow: var(--shadow-sm);
	}

	.chapter-card:hover {
		border-color: var(--accent);
		background: var(--surface-hover);
		transform: translateY(-2px);
		box-shadow: var(--shadow);
		text-decoration: none;
	}

	.card-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 0.85rem;
	}

	.chapter-number {
		font-family: var(--font-mono);
		font-size: 0.82rem;
		font-weight: 700;
		background: var(--bg);
		border: 1px solid var(--border-strong);
		padding: 0.15rem 0.45rem;
		border-radius: 4px;
		color: var(--accent);
	}

	.chapter-badge {
		font-size: 0.74rem;
		color: var(--text-faint);
	}

	.card-title {
		font-family: var(--font-display);
		font-size: 1.15rem;
		font-weight: 600;
		color: var(--text);
		margin-bottom: 0.5rem;
		line-height: 1.3;
	}

	.card-desc {
		font-size: 0.88rem;
		color: var(--text-muted);
		line-height: 1.5;
		margin-bottom: 1.25rem;
		flex: 1;
	}

	.card-footer {
		margin-top: auto;
	}

	.read-link {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.82rem;
		font-weight: 600;
		color: var(--accent-cyan);
	}

	.chapter-card:hover .read-link {
		color: var(--accent);
	}
</style>
