<script lang="ts">
	import { page } from '$app/state';
	import { SITE_URL, langOf, langs, locales, localize } from '#lib/i18n/index.js';

	interface Props {
		title: string;
		description?: string;
		noindex?: boolean;
	}

	let { title, description, noindex = false }: Props = $props();

	const lang = $derived(langOf(page.url.pathname));
	const canonical = $derived(SITE_URL + page.url.pathname);
	// The same page in every language, for `hreflang` (English is the fallback for all others).
	const alternates = $derived(
		langs.map((l) => ({ lang: l, href: SITE_URL + localize(page.url.pathname, l) }))
	);
</script>

<svelte:head>
	<title>{title}</title>
	{#if description}<meta name="description" content={description} />{/if}
	{#if noindex}
		<meta name="robots" content="noindex" />
	{:else}
		<link rel="canonical" href={canonical} />
		{#each alternates as a (a.lang)}<link rel="alternate" hreflang={a.lang} href={a.href} />{/each}
		<link rel="alternate" hreflang="x-default" href={alternates[0].href} />
	{/if}
	<meta property="og:type" content="article" />
	<meta property="og:title" content={title} />
	{#if description}<meta property="og:description" content={description} />{/if}
	<meta property="og:url" content={canonical} />
	<meta property="og:locale" content={locales[lang]} />
	{#each langs.filter((l) => l !== lang) as l (l)}<meta property="og:locale:alternate" content={locales[l]} />{/each}
</svelte:head>
