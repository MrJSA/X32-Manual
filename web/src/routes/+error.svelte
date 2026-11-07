<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.status} — Topic Not Found | X32 Manual</title>
</svelte:head>

<div class="error-page">
	<div class="error-code">{page.status}</div>
	<h1 class="error-title">Topic or Chapter Not Found</h1>
	<p class="error-desc">
		{page.error?.message || 'The manual chapter or section you were looking for does not exist or may have been reorganized.'}
	</p>
	<a href="/" class="home-btn">Return to Manual Overview</a>
</div>

<style>
	.error-page {
		padding: 6rem 1rem;
		text-align: center;
		max-width: 500px;
		margin: 0 auto;
	}

	.error-code {
		font-family: var(--font-display);
		font-size: 5rem;
		font-weight: 700;
		color: var(--accent);
		line-height: 1;
		margin-bottom: 1rem;
	}

	.error-title {
		font-family: var(--font-display);
		font-size: 1.75rem;
		font-weight: 700;
		margin-bottom: 1rem;
		color: var(--text);
	}

	.error-desc {
		font-size: 1rem;
		color: var(--text-muted);
		line-height: 1.6;
		margin-bottom: 2rem;
	}

	.home-btn {
		display: inline-block;
		background: var(--accent);
		color: #000;
		font-family: var(--font-display);
		font-weight: 700;
		font-size: 0.95rem;
		padding: 0.75rem 1.75rem;
		border-radius: var(--radius);
		text-decoration: none;
		transition: all 0.15s ease;
	}

	.home-btn:hover {
		transform: translateY(-2px);
		box-shadow: var(--shadow);
		text-decoration: none;
	}
</style>
