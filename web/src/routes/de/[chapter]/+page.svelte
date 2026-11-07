<script lang="ts">
	import ChapterPage from '../../[chapter]/+page.svelte';

	interface Props {
		data: {
			chapter: {
				slug: string;
				number: string;
				title: string;
				shortTitle: string;
				summary: string;
				category: string;
				prev: import('#lib/content.js').ChapterMeta | null;
				next: import('#lib/content.js').ChapterMeta | null;
			};
			html: string;
			toc: import('#lib/markdown.js').TocItem[];
		};
	}

	let { data }: Props = $props();
</script>

<ChapterPage {data} />
