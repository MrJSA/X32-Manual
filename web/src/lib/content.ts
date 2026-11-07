export interface ChapterMeta {
	slug: string;
	number: string;
	title: string;
	shortTitle: string;
	summary: string;
	fileName: string;
	category: string;
}

export const CHAPTERS: ChapterMeta[] = [
	{
		slug: '00-hardware-overview',
		number: '00',
		title: 'Hardware Overview & Surface Anatomy',
		shortTitle: 'Hardware Overview',
		summary: 'Surface topography, fader banks, dedicated channel strip controls, 7" color TFT screen, and rear panel connectivity.',
		fileName: '00_Introduction_and_Hardware_Overview.md',
		category: 'Console Foundations'
	},
	{
		slug: '01-gain-staging-preamps',
		number: '01',
		title: 'Gain Staging, Preamps & Headamps',
		shortTitle: 'Gain Staging & Preamps',
		summary: 'Analog headamp vs. digital trim, the -18 dBFS digital target, phantom power rules, polarity flip, and HA Gain Split.',
		fileName: '01_Gain_Staging_and_Preamps.md',
		category: 'Console Foundations'
	},
	{
		slug: '02-channel-processing',
		number: '02',
		title: 'Channel Processing Architecture',
		shortTitle: 'Channel Processing',
		summary: 'Signal flow, Low Cut filter, 5-mode Gate/Expander/Ducker, 4-band PEQ with RTA, and dynamics compressor with parallel mix %.',
		fileName: '02_Channel_Processing.md',
		category: 'Processing & Mixing'
	},
	{
		slug: '03-routing-patching',
		number: '03',
		title: 'Routing, Patching & Signal Distribution',
		shortTitle: 'Routing & Patching',
		summary: 'Blocks of eight vs. Firmware 4.x User 1:1 Routing, tap point selection (In/LC, Pre-EQ, Pre-Fader, Post-Fader), and stage recipes.',
		fileName: '03_Routing_and_Patching.md',
		category: 'Routing & Patching'
	},
	{
		slug: '04-mix-buses-sends',
		number: '04',
		title: 'Mix Buses, Sends-on-Faders & Matrices',
		shortTitle: 'Mix Buses & Sends',
		summary: '16 Mix Buses, Sends-on-Faders workflow, floor monitors vs. IEMs, audio subgroups vs. DCAs, parallel drum smash, and 6 Matrices.',
		fileName: '04_Mixing_Buses_and_Sends.md',
		category: 'Processing & Mixing'
	},
	{
		slug: '05-dca-mute-groups',
		number: '05',
		title: 'DCAs, Mute Groups & Fader Management',
		shortTitle: 'DCAs & Mute Groups',
		summary: '8 DCA groups, DCA pre/post-fader send behavior gotcha, Firmware 4.x DCA Spill, and 6 master Mute Groups with FX mute protocol.',
		fileName: '05_DCA_and_Mute_Groups.md',
		category: 'Show Control & Organization'
	},
	{
		slug: '06-effects-rack-plugins',
		number: '06',
		title: 'Virtual Effects Rack & All 30+ Processors',
		shortTitle: 'Effects Rack & Plugins',
		summary: '8-slot virtual rack, send vs. insert workflows, vintage compressors (1176, LA-2A, Fairchild), Pultec EQs, delays, reverbs, and enhancers.',
		fileName: '06_Effects_Rack_and_Plugins.md',
		category: 'Processing & Mixing'
	},
	{
		slug: '07-scenes-cues-snippets',
		number: '07',
		title: 'Scenes, Cues, Snippets & Show Control',
		shortTitle: 'Scenes & Show Control',
		summary: 'Show control hierarchy (Show → Cues → Scenes → Snippets), surgical snippet recalls without audio dropouts, and Parameter/Channel Safes.',
		fileName: '07_Scenes_Cues_and_Snippets.md',
		category: 'Show Control & Organization'
	},
	{
		slug: '08-monitoring-talkback',
		number: '08',
		title: 'Monitoring, Solo, Talkback & Utilities',
		shortTitle: 'Monitoring & Talkback',
		summary: 'Control Room / Phones, PFL vs. AFL solo, Talkback A/B destination matrices, test oscillator, and the 8-channel Dan Dugan speech automixer.',
		fileName: '08_Monitoring_Talkback_and_Utilities.md',
		category: 'Monitoring & Utilities'
	},
	{
		slug: '09-stageboxes-aes50',
		number: '09',
		title: 'Digital Snakes, Stageboxes & AES50 Networks',
		shortTitle: 'Stageboxes & AES50',
		summary: 'SuperMAC AES50 protocol, S16/S32/SD/DL stageboxes, mandatory shielded STP cabling and EtherCON requirements, and master/slave clocking.',
		fileName: '09_Stageboxes_and_AES50_Networking.md',
		category: 'Hardware & Networking'
	},
	{
		slug: '10-personal-monitoring',
		number: '10',
		title: 'Personal Monitoring: P16 & Midas DP48',
		shortTitle: 'Personal Monitoring',
		summary: 'Ultranet P16-M mixers and P16-D distribution hubs, the "16-channel squeeze" strategy, and Midas DP48 dual 48-channel AES50 integration.',
		fileName: '10_Personal_Monitoring_DP48_and_P16.md',
		category: 'Monitoring & Utilities'
	},
	{
		slug: '11-recording-expansion-cards',
		number: '11',
		title: 'Recording, Playback & Expansion Cards',
		shortTitle: 'Recording & Cards',
		summary: 'Top-panel 2-track USB WAV recorder, 32x32 X-USB interface, standalone X-LIVE dual SD card recording, and Virtual Soundcheck (VSC).',
		fileName: '11_Recording_and_Expansion_Cards.md',
		category: 'Hardware & Networking'
	},
	{
		slug: '12-network-remote-control',
		number: '12',
		title: 'Network Setup, Remote Control & Software',
		shortTitle: 'Network & Remote Apps',
		summary: 'Static IP configuration, live venue 5 GHz Wi-Fi optimization, X32-Edit synchronization safety, Mixing Station customization, and OSC UDP control.',
		fileName: '12_Network_Remote_Control_and_Software.md',
		category: 'Hardware & Networking'
	},
	{
		slug: '13-live-mixing-workflows',
		number: '13',
		title: 'Live Mixing Workflows & System Tuning',
		shortTitle: 'Live Mixing Workflows',
		summary: 'Step-by-step soundcheck protocol, PA time-alignment formulas, ringing out stage monitors with RTA, broadcast streaming loudness, and troubleshooting.',
		fileName: '13_Live_Mixing_Workflows_and_Best_Practices.md',
		category: 'Live Engineering & Operations'
	},
	{
		slug: 'user-routing',
		number: 'App',
		title: 'Deep Dive: Firmware 4.x User Routing',
		shortTitle: 'User Routing Deep Dive',
		summary: 'Comprehensive 1:1 flexible patching architecture, routing multi-stagebox setups, wireless mic integration, and custom output configurations.',
		fileName: 'UserRouting.md',
		category: 'Routing & Patching'
	}
];

// Load raw markdown files at build time using Vite's glob import
const markdownModules = import.meta.glob('../../content/*.md', {
	query: '?raw',
	import: 'default',
	eager: true
}) as Record<string, string>;

export function getChapterBySlug(slug: string): (ChapterMeta & { rawContent: string; prev: ChapterMeta | null; next: ChapterMeta | null }) | null {
	const index = CHAPTERS.findIndex((c) => c.slug === slug);
	if (index === -1) return null;

	const chapter = CHAPTERS[index];
	const key = `../../content/${chapter.fileName}`;
	const rawContent = markdownModules[key] ?? '';

	const prev = index > 0 ? CHAPTERS[index - 1] : null;
	const next = index < CHAPTERS.length - 1 ? CHAPTERS[index + 1] : null;

	return {
		...chapter,
		rawContent,
		prev,
		next
	};
}

export function getIndexContent(): string {
	const key = '../../content/INDEX.md';
	return markdownModules[key] ?? '';
}

export interface SearchEntry {
	slug: string;
	title: string;
	number: string;
	category: string;
	headings: string[];
	excerpt: string;
}

export function buildSearchIndex(): SearchEntry[] {
	return CHAPTERS.map((ch) => {
		const raw = markdownModules[`../../content/${ch.fileName}`] ?? '';
		const headingMatches = raw.match(/^(?:##|###)\s+(.+)$/gm) ?? [];
		const headings = headingMatches.map((h) => h.replace(/^(?:##|###)\s+/, '').trim());
		const cleanBody = raw
			.replace(/^#.+$/gm, '')
			.replace(/```[\s\S]*?```/g, '')
			.replace(/[*_#`[\]()]/g, '')
			.replace(/\s+/g, ' ')
			.trim();
		const excerpt = cleanBody.slice(0, 180) + '...';

		return {
			slug: ch.slug,
			title: ch.title,
			number: ch.number,
			category: ch.category,
			headings,
			excerpt
		};
	});
}
