<script lang="ts">
	let { size = 36 }: { size?: number } = $props();
	const uid = $props.id();
</script>

<!-- Rounded gradient mark: three soft faders riding a flowing wave. -->
<svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
	<defs>
		<linearGradient id="lg-{uid}" x1="0" y1="0" x2="1" y2="1">
			<stop offset="0" stop-color="#fbbf24" />
			<stop offset="0.5" stop-color="#fb7185" />
			<stop offset="1" stop-color="#a78bfa" />
		</linearGradient>
	</defs>
	<rect width="48" height="48" rx="16" fill="url(#lg-{uid})" />
	<path
		d="M6 31c6-7 10-7 15 0s10 7 15 0 6-5 6-5"
		fill="none"
		stroke="#fff"
		stroke-opacity="0.35"
		stroke-width="2.5"
		stroke-linecap="round"
	/>
	<g stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-opacity="0.55">
		<line x1="15" y1="12" x2="15" y2="36" />
		<line x1="24" y1="12" x2="24" y2="36" />
		<line x1="33" y1="12" x2="33" y2="36" />
	</g>
	<g fill="#fff">
		<circle cx="15" cy="27" r="4.5" />
		<circle cx="24" cy="18" r="4.5" />
		<circle cx="33" cy="24" r="4.5" />
	</g>
</svg>
