<script lang="ts">
	import { page } from '$app/state';
	import Seo from '#lib/components/Seo.svelte';
	import { langOf, localize, texts } from '#lib/i18n/index.js';

	const lang = $derived(langOf(page.url.pathname));
	const t = $derived(texts[lang]);
</script>

<Seo title="{page.status} — {t.notFoundTitle} | {t.brandBadge} {t.manualWord}" noindex />

<div class="error-page">
	<div class="error-code grad-text">{page.status}</div>
	<h1 class="error-title">{t.notFoundTitle}</h1>
	<p class="error-desc">
		{page.status === 404 ? t.notFoundText : page.error?.message}
	</p>
	<a href={localize('/', lang)} class="home-btn">{t.backHome}</a>
</div>
<style>
	.error-page {
		max-width: 520px;
		margin: 4rem auto;
		padding: 3rem 2rem;
		text-align: center;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow);
	}

	.error-code {
		font-family: var(--font-display);
		font-size: clamp(4rem, 14vw, 6.5rem);
		font-weight: 800;
		letter-spacing: -0.05em;
		line-height: 1;
		margin-bottom: 1rem;
	}

	.error-title {
		font-family: var(--font-display);
		font-size: 1.6rem;
		font-weight: 800;
		letter-spacing: -0.025em;
		margin-bottom: 0.75rem;
	}

	.error-desc {
		color: var(--text-muted);
		margin-bottom: 2rem;
	}

	.home-btn {
		display: inline-flex;
		align-items: center;
		height: 48px;
		padding: 0 26px;
		border-radius: var(--radius-pill);
		background: var(--grad);
		color: #1a0f12;
		font-weight: 650;
		box-shadow: 0 10px 30px -10px rgb(251 113 133 / 0.8);
		transition: transform 0.3s var(--ease);
	}

	.home-btn:hover {
		color: #1a0f12;
		transform: translateY(-2px);
	}
</style>
