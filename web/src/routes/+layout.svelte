<script lang="ts">
	import Header from '#lib/components/Header.svelte';
	import Sidebar from '#lib/components/Sidebar.svelte';
	import SearchModal from '#lib/components/SearchModal.svelte';
	import { page } from '$app/state';
	import { langOf, texts } from '#lib/i18n/index.js';
	import { ui } from '#lib/ui.svelte.js';
	import '#lib/styles/global.css';

	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	const currentLang = $derived(langOf(page.url.pathname));
	const t = $derived(texts[currentLang]);

	$effect(() => {
		document.documentElement.lang = currentLang;
	});

	function handleGlobalKeyDown(e: KeyboardEvent) {
		if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
			e.preventDefault();
			ui.searchOpen = !ui.searchOpen;
		}
	}
</script>

<svelte:window onkeydown={handleGlobalKeyDown} />

<div class="app">
	<Header onToggleSidebar={() => (ui.sidebarOpen = !ui.sidebarOpen)} onOpenSearch={() => (ui.searchOpen = true)} />

	<div class="body">
		<Sidebar isOpen={ui.sidebarOpen} onClose={() => (ui.sidebarOpen = false)} />

		<main class="main">
			{@render children?.()}

			<footer class="footer">
				<span>{t.footerNote}</span>
			</footer>
		</main>
	</div>

	<SearchModal isOpen={ui.searchOpen} onClose={() => (ui.searchOpen = false)} />
</div>

<style>
	.app {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.body {
		flex: 1;
		display: flex;
		gap: clamp(0px, 2vw, 24px);
		max-width: var(--container);
		width: 100%;
		margin: 0 auto;
		padding: 0 clamp(12px, 2vw, 24px);
	}

	.main {
		flex: 1;
		min-width: 0;
		padding: 2.25rem clamp(0.25rem, 3vw, 2.5rem) 2rem;
		display: flex;
		flex-direction: column;
	}

	.footer {
		margin-top: auto;
		padding-top: 4rem;
		text-align: center;
		font-size: 0.8rem;
		color: var(--text-faint);
	}

	@media (max-width: 860px) {
		.main {
			padding: 1.5rem 0.25rem 2rem;
		}
	}
</style>
