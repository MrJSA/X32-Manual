<script lang="ts">
	import { page } from '$app/state';
	import { SITE_URL, langOf, langs, locales, localize, texts } from '#lib/i18n/index.js';

	type Crumb = { name: string; path: string };

	interface Props {
		title: string;
		description?: string;
		noindex?: boolean;
		/** Chapter pages pass this; the start page leaves it out. */
		article?: { headline: string; section: string };
		/** Parent pages between the start page and this one (paths without language prefix). */
		breadcrumbs?: Crumb[];
	}

	let { title, description, noindex = false, article, breadcrumbs = [] }: Props = $props();

	const lang = $derived(langOf(page.url.pathname));
	const t = $derived(texts[lang]);
	const siteName = $derived(`X32 / M32 ${t.brandTitle}`);
	const canonical = $derived(SITE_URL + page.url.pathname);
	// The same page in every language, for `hreflang` (English is the fallback for all others).
	const alternates = $derived(
		langs.map((l) => ({ lang: l, href: SITE_URL + localize(page.url.pathname, l) }))
	);
	// 1200×630 preview card per language (web/static/og-*.png).
	const image = $derived(`${SITE_URL}/og-${lang}.png`);
	const imageAlt = $derived(`${t.heroTitle} ${t.heroTitleAccent} — ${siteName}`);

	// schema.org structured data: who publishes the site, what this page is and where it sits.
	const jsonLd = $derived.by(() => {
		const WEBSITE = `${SITE_URL}/#website`;
		const PUBLISHER = `${SITE_URL}/#publisher`;
		const home = SITE_URL + localize('/', lang);
		const graph: Record<string, unknown>[] = [
			{
				'@type': 'Organization',
				'@id': PUBLISHER,
				name: 'MrJSA',
				url: 'https://mrjsa.com/'
			},
			{
				'@type': 'WebSite',
				'@id': WEBSITE,
				url: `${SITE_URL}/`,
				name: siteName,
				inLanguage: langs,
				publisher: { '@id': PUBLISHER }
			}
		];
		if (article) {
			const crumbs: Crumb[] = [
				{ name: t.breadcrumbManual, path: home },
				...breadcrumbs.map((c) => ({ name: c.name, path: SITE_URL + localize(c.path, lang) })),
				{ name: article.headline, path: canonical }
			];
			graph.push(
				{
					'@type': 'TechArticle',
					'@id': `${canonical}#article`,
					headline: article.headline,
					description,
					articleSection: article.section,
					inLanguage: lang,
					url: canonical,
					image,
					about: ['Behringer X32', 'Midas M32'],
					isPartOf: { '@id': WEBSITE },
					publisher: { '@id': PUBLISHER },
					mainEntityOfPage: canonical
				},
				{
					'@type': 'BreadcrumbList',
					'@id': `${canonical}#breadcrumb`,
					itemListElement: crumbs.map((c, i) => ({
						'@type': 'ListItem',
						position: i + 1,
						name: c.name,
						item: c.path
					}))
				}
			);
		} else {
			graph.push({
				'@type': 'WebPage',
				'@id': canonical,
				url: canonical,
				name: title,
				description,
				inLanguage: lang,
				isPartOf: { '@id': WEBSITE },
				primaryImageOfPage: { '@type': 'ImageObject', url: image }
			});
		}
		// `<` escaped so text inside the data can never close the script tag.
		return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
	});
</script>

<svelte:head>
	<title>{title}</title>
	{#if description}<meta name="description" content={description} />{/if}
	{#if noindex}
		<meta name="robots" content="noindex" />
	{:else}
		<!-- Lets search engines show large image previews and full snippets. -->
		<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
		<link rel="canonical" href={canonical} />
		{#each alternates as a (a.lang)}<link rel="alternate" hreflang={a.lang} href={a.href} />{/each}
		<link rel="alternate" hreflang="x-default" href={alternates[0].href} />
	{/if}
	<meta property="og:site_name" content={siteName} />
	<meta property="og:type" content={article ? 'article' : 'website'} />
	<meta property="og:title" content={title} />
	{#if description}<meta property="og:description" content={description} />{/if}
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={image} />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={imageAlt} />
	<meta property="og:locale" content={locales[lang]} />
	{#each langs.filter((l) => l !== lang) as l (l)}<meta property="og:locale:alternate" content={locales[l]} />{/each}
	{#if article}<meta property="article:section" content={article.section} />{/if}
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	{#if description}<meta name="twitter:description" content={description} />{/if}
	<meta name="twitter:image" content={image} />
	<meta name="twitter:image:alt" content={imageAlt} />
	{#if !noindex}
		<!-- JSON data block, never executed, so the strict CSP doesn't need to allow it. -->
		{@html `<script type="application/ld+json">${jsonLd}</` + `script>`}
	{/if}
</svelte:head>
