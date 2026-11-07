<script lang="ts">
	import Page from '../+page.svelte';

	interface Props {
		data: {
			chapters: import('#lib/content.js').ChapterMeta[];
			renderedIndex: string;
		};
	}

	let { data }: Props = $props();
</script>

<Page {data} />
