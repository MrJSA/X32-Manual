<script lang="ts">
	import Header from '#lib/components/Header.svelte';
	import Sidebar from '#lib/components/Sidebar.svelte';
	import SearchModal from '#lib/components/SearchModal.svelte';
	import { page } from '$app/state';
	import { langOf } from '#lib/i18n/index.js';
	import '#lib/styles/global.css';

	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	let isSidebarOpen = $state(false);
	let isSearchOpen = $state(false);

	const currentLang = $derived(langOf(page.url.pathname));

	$effect(() => {
		if (typeof document !== 'undefined') {
			document.documentElement.lang = currentLang;
		}
	});

	function toggleSidebar() {
		isSidebarOpen = !isSidebarOpen;
	}

	function closeSidebar() {
		isSidebarOpen = false;
	}

	function openSearch() {
		isSearchOpen = true;
	}

	function closeSearch() {
		isSearchOpen = false;
	}

	function handleGlobalKeyDown(e: KeyboardEvent) {
		if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
			e.preventDefault();
			isSearchOpen = !isSearchOpen;
		}
	}
</script>

<svelte:window onkeydown={handleGlobalKeyDown} />

<div class="app-layout">
	<Header onToggleSidebar={toggleSidebar} onOpenSearch={openSearch} />

	<div class="layout-body">
		<Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

		<main class="main-content">
			{#if children}
				{@render children()}
			{/if}
		</main>
	</div>

	<SearchModal isOpen={isSearchOpen} onClose={closeSearch} />
</div>

<style>
	.app-layout {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.layout-body {
		flex: 1;
		display: flex;
		max-width: var(--container);
		width: 100%;
		margin: 0 auto;
	}

	.main-content {
		flex: 1;
		min-width: 0;
		padding: 2.5rem clamp(1.25rem, 4vw, 3rem) 5rem;
	}

	@media (max-width: 860px) {
		.main-content {
			padding: 1.5rem 1rem 4rem;
		}
	}
</style>
