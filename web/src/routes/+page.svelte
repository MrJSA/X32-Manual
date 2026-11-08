<script lang="ts">
	import type { ChapterMeta } from '#lib/content.js';
	import Seo from '#lib/components/Seo.svelte';
	import { page } from '$app/state';
	import { langOf, localize, texts } from '#lib/i18n/index.js';
	import { ui } from '#lib/ui.svelte.js';

	interface Props {
		data: {
			chapters: ChapterMeta[];
			renderedIndex: string;
		};
	}

	let { data }: Props = $props();

	const currentLang = $derived(langOf(page.url.pathname));
	const t = $derived(texts[currentLang]);

	const categories = $derived.by(() => {
		const map = new Map<string, ChapterMeta[]>();
		for (const ch of data.chapters) {
			const list = map.get(ch.category) ?? [];
			list.push(ch);
			map.set(ch.category, list);
		}
		return Array.from(map.entries());
	});

	const stats = $derived([
		{ value: '40', label: t.statChannels },
		{ value: '25', label: t.statBuses },
		{ value: '8', label: t.statFx },
		{ value: String(data.chapters.length), label: t.statChapters }
	]);

	function openSearch() {
		ui.searchOpen = true;
	}
</script>

<Seo title="{t.brandBadge} {t.brandTitle} — {t.heroTitle} {t.heroTitleAccent}" description={t.heroSubtitle} />

<div class="home">
	<section class="hero">
		<svg class="waves" viewBox="0 0 1200 320" preserveAspectRatio="none" aria-hidden="true">
			<defs>
				<linearGradient id="wave-a" x1="0" x2="1">
					<stop offset="0" stop-color="#fbbf24" stop-opacity="0" />
					<stop offset="0.4" stop-color="#fb7185" stop-opacity="0.55" />
					<stop offset="1" stop-color="#a78bfa" stop-opacity="0.35" />
				</linearGradient>
				<linearGradient id="wave-b" x1="0" x2="1">
					<stop offset="0" stop-color="#a78bfa" stop-opacity="0" />
					<stop offset="0.5" stop-color="#a78bfa" stop-opacity="0.4" />
					<stop offset="1" stop-color="#fbbf24" stop-opacity="0.25" />
				</linearGradient>
			</defs>
			<path class="w1" d="M0 210 C 200 120, 360 300, 600 200 S 1000 90, 1200 170" stroke="url(#wave-a)" />
			<path class="w2" d="M0 250 C 240 170, 420 320, 640 240 S 980 150, 1200 220" stroke="url(#wave-b)" />
			<path class="w3" d="M0 170 C 180 230, 380 110, 620 160 S 1020 250, 1200 130" stroke="url(#wave-a)" />
		</svg>

		<div class="hero-inner">
			<div class="pills">
				<span class="pill pill-grad">{t.heroBadge}</span>
				<span class="pill">{t.firmwareTag}</span>
			</div>
			<h1 class="hero-title">
				{t.heroTitle}
				<span class="grad-text">{t.heroTitleAccent}</span>
			</h1>
			<p class="hero-subtitle">{t.heroSubtitle}</p>

			<div class="actions">
				{#if data.chapters[0]}
					<a class="btn btn-primary" href={localize(`/${data.chapters[0].slug}`, currentLang)}>
						{t.heroCta}
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
							<path d="M5 12h14M13 6l6 6-6 6" />
						</svg>
					</a>
				{/if}
				<button class="btn btn-ghost" onclick={openSearch}>
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
						<circle cx="11" cy="11" r="7" />
						<path d="m20 20-3.5-3.5" />
					</svg>
					{t.heroCtaSearch}
				</button>
			</div>

			<div class="stats">
				{#each stats as s (s.label)}
					<div class="stat">
						<span class="stat-val grad-text">{s.value}</span>
						<span class="stat-lbl">{s.label}</span>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section class="chapters">
		<h2 class="section-title">{t.manualTocTitle}</h2>

		{#each categories as [categoryName, items] (categoryName)}
			<div class="group">
				<h3 class="group-title"><span class="dot"></span>{categoryName}</h3>
				<div class="grid">
					{#each items as item (item.slug)}
						<a href={localize(`/${item.slug}`, currentLang)} class="card">
							<span class="num">{item.number}</span>
							<h4 class="card-title">{item.title}</h4>
							<p class="card-desc">{item.summary}</p>
							<span class="read">
								{t.readChapter}
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
									<path d="M5 12h14M13 6l6 6-6 6" />
								</svg>
							</span>
						</a>
					{/each}
				</div>
			</div>
		{/each}
	</section>
</div>

<style>
	.home {
		max-width: 1100px;
		margin: 0 auto;
	}

	/* Hero */
	.hero {
		position: relative;
		padding: clamp(2.5rem, 6vw, 4.5rem) clamp(1.25rem, 4vw, 3.5rem);
		border-radius: var(--radius-lg);
		background: var(--surface);
		border: 1px solid var(--border);
		overflow: hidden;
		isolation: isolate;
		box-shadow: var(--shadow);
		margin-bottom: 4.5rem;
	}

	.waves {
		position: absolute;
		inset: auto 0 -10% 0;
		width: 100%;
		height: 70%;
		z-index: -1;
		pointer-events: none;
	}

	.waves path {
		fill: none;
		stroke-width: 2.5;
		stroke-linecap: round;
		animation: drift 14s ease-in-out infinite alternate;
	}

	.waves .w2 {
		stroke-width: 2;
		animation-duration: 18s;
		animation-delay: -4s;
	}

	.waves .w3 {
		stroke-width: 1.5;
		animation-duration: 22s;
		animation-delay: -9s;
	}

	@keyframes drift {
		from {
			transform: translateX(-3%) translateY(0);
		}
		to {
			transform: translateX(3%) translateY(-12px);
		}
	}

	.hero-inner {
		max-width: 760px;
	}

	.pills {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-bottom: 1.5rem;
	}

	.pill {
		display: inline-flex;
		align-items: center;
		padding: 6px 14px;
		border-radius: var(--radius-pill);
		font-size: 0.8rem;
		font-weight: 600;
		color: var(--text-muted);
		background: var(--surface);
		border: 1px solid var(--border-strong);
	}

	.pill-grad {
		color: var(--text);
		background: var(--grad-soft);
		border-color: rgb(251 113 133 / 0.35);
	}

	.hero-title {
		font-family: var(--font-display);
		font-size: clamp(2.4rem, 6vw, 4.2rem);
		font-weight: 800;
		line-height: 1.05;
		letter-spacing: -0.045em;
		margin-bottom: 1.25rem;
	}

	.hero-title .grad-text {
		display: block;
	}

	.hero-subtitle {
		font-size: clamp(1.02rem, 1.6vw, 1.18rem);
		color: var(--text-muted);
		line-height: 1.65;
		max-width: 640px;
		margin-bottom: 2rem;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		margin-bottom: 2.75rem;
	}

	.btn {
		white-space: nowrap;
		display: inline-flex;
		align-items: center;
		gap: 10px;
		height: 48px;
		padding: 0 24px;
		border-radius: var(--radius-pill);
		font-weight: 650;
		font-size: 0.95rem;
		cursor: pointer;
		transition:
			transform 0.3s var(--ease),
			box-shadow 0.3s var(--ease),
			background 0.3s var(--ease);
	}

	.btn-primary {
		background: var(--grad);
		color: #1a0f12;
		border: 0;
		box-shadow: 0 10px 30px -10px rgb(251 113 133 / 0.8);
	}

	.btn-primary:hover {
		color: #1a0f12;
		transform: translateY(-2px);
		box-shadow: 0 16px 36px -10px rgb(251 113 133 / 0.9);
	}

	.btn-primary:hover svg {
		transform: translateX(3px);
	}

	.btn svg {
		transition: transform 0.3s var(--ease);
	}

	.btn-ghost {
		background: var(--surface);
		border: 1px solid var(--border-strong);
		color: var(--text);
	}

	.btn-ghost:hover {
		background: var(--surface-hover);
		transform: translateY(-2px);
	}

	.stats {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 12px;
		max-width: 640px;
	}

	.stat {
		display: flex;
		flex-direction: column;
		gap: 2px;
		padding: 14px 18px;
		border-radius: var(--radius);
		background: var(--surface);
		border: 1px solid var(--border);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
	}

	.stat-val {
		font-family: var(--font-display);
		font-size: 1.9rem;
		font-weight: 800;
		line-height: 1.1;
		letter-spacing: -0.03em;
	}

	.stat-lbl {
		font-size: 0.78rem;
		color: var(--text-muted);
		line-height: 1.3;
	}

	/* Chapters */
	.section-title {
		font-family: var(--font-display);
		font-size: clamp(1.6rem, 3vw, 2.1rem);
		font-weight: 800;
		letter-spacing: -0.03em;
		margin-bottom: 2.25rem;
	}

	.group {
		margin-bottom: 3rem;
	}

	.group-title {
		display: flex;
		align-items: center;
		gap: 10px;
		font-family: var(--font-display);
		font-size: 1rem;
		font-weight: 700;
		color: var(--text-muted);
		margin-bottom: 1rem;
	}

	.dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: var(--grad);
		box-shadow: 0 0 14px rgb(251 113 133 / 0.6);
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
		gap: 16px;
	}

	.card {
		position: relative;
		display: flex;
		flex-direction: column;
		padding: 24px;
		border-radius: var(--radius-lg);
		background: var(--surface);
		border: 1px solid var(--border);
		color: var(--text);
		overflow: hidden;
		isolation: isolate;
		transition:
			transform 0.35s var(--ease),
			box-shadow 0.35s var(--ease),
			border-color 0.35s var(--ease);
	}

	/* Gradient wash that fades in on hover */
	.card::before {
		content: '';
		position: absolute;
		inset: 0;
		z-index: -1;
		background: var(--grad-soft);
		opacity: 0;
		transition: opacity 0.35s var(--ease);
	}

	.card:hover {
		color: var(--text);
		transform: translateY(-4px);
		border-color: rgb(251 113 133 / 0.35);
		box-shadow: var(--shadow-lg);
	}

	.card:hover::before {
		opacity: 1;
	}

	.num {
		display: grid;
		place-items: center;
		width: 40px;
		height: 40px;
		border-radius: 14px;
		margin-bottom: 18px;
		font-family: var(--font-display);
		font-weight: 800;
		font-size: 0.9rem;
		color: #1a0f12;
		background: var(--grad);
		box-shadow: 0 8px 20px -8px rgb(251 113 133 / 0.7);
	}

	.card-title {
		font-family: var(--font-display);
		font-size: 1.12rem;
		font-weight: 700;
		letter-spacing: -0.015em;
		line-height: 1.3;
		margin-bottom: 8px;
	}

	.card-desc {
		font-size: 0.88rem;
		color: var(--text-muted);
		line-height: 1.55;
		margin-bottom: 20px;
		flex: 1;
	}

	.read {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-size: 0.85rem;
		font-weight: 650;
		color: var(--accent);
	}

	.read svg {
		transition: transform 0.3s var(--ease);
	}

	.card:hover .read svg {
		transform: translateX(4px);
	}

	@media (max-width: 640px) {
		.stats {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
		.btn {
			padding: 0 16px;
			flex: 1;
			justify-content: center;
		}
	}
</style>
