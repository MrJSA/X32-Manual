import { extractToc, type TocItem } from './markdown.js';

export interface ChapterMeta {
	slug: string;
	number: string;
	title: string;
	shortTitle: string;
	summary: string;
	fileName: string;
	category: string;
	toc?: TocItem[];
}

export const CHAPTER_DEFINITIONS: Omit<ChapterMeta, 'toc'>[] = [
	{
		slug: '01-hardware-overview',
		number: '01',
		title: 'Hardware Overview & Surface Anatomy',
		shortTitle: 'Hardware Overview',
		summary: 'Surface topography, fader banks, dedicated channel strip controls, 7" color TFT screen, and rear panel connectivity.',
		fileName: '01_Hardware_Overview_and_Surface_Anatomy.md',
		category: 'Console Foundations'
	},
	{
		slug: '02-stageboxes-aes50',
		number: '02',
		title: 'Digital Snakes, Stageboxes & AES50 Networks',
		shortTitle: 'Stageboxes & AES50',
		summary: 'SuperMAC AES50 protocol, S16/S32/SD/DL stageboxes, mandatory shielded STP cabling and EtherCON requirements, and master/slave clocking.',
		fileName: '02_Stageboxes_and_AES50_Networking.md',
		category: 'Console Foundations'
	},
	{
		slug: '03-routing-patching',
		number: '03',
		title: 'Routing, Patching & Signal Distribution',
		shortTitle: 'Routing & Patching',
		summary: 'Blocks of eight, tap point selection (In/LC, Pre-EQ, Pre-Fader, Post-Fader), XLR Out, Aux Out, Ultranet, Card Out, and stage patch recipes.',
		fileName: '03_Routing_and_Patching.md',
		category: 'Routing & Patching'
	},
	{
		slug: '04-user-routing',
		number: '04',
		title: 'Firmware 4.x User Routing (1:1 Patching)',
		shortTitle: 'User Routing (1:1)',
		summary: 'Breaking free of 8-channel blocks with Firmware 4.x User In and User Out 1:1 flexible patching, wireless mic racks, and custom stage patches.',
		fileName: '04_Firmware_4x_User_Routing.md',
		category: 'Routing & Patching'
	},
	{
		slug: '05-gain-staging-preamps',
		number: '05',
		title: 'Gain Staging, Preamps & Headamps',
		shortTitle: 'Gain Staging & Preamps',
		summary: 'Analog headamp vs. digital trim, the -18 dBFS digital target, phantom power rules, polarity flip, and HA Gain Split.',
		fileName: '05_Gain_Staging_and_Preamps.md',
		category: 'Channel Strip'
	},
	{
		slug: '06-channel-processing',
		number: '06',
		title: 'Channel Processing Architecture',
		shortTitle: 'Channel Processing',
		summary: 'Signal flow, Low Cut filter, 5-mode Gate/Expander/Ducker, 4-band PEQ with RTA, and dynamics compressor with parallel mix %.',
		fileName: '06_Channel_Processing.md',
		category: 'Channel Strip'
	},
	{
		slug: '07-mix-buses-sends',
		number: '07',
		title: 'Mix Buses, Sends-on-Faders & Matrices',
		shortTitle: 'Mix Buses & Sends',
		summary: '16 Mix Buses, Sends-on-Faders workflow, floor monitors vs. IEMs, audio subgroups vs. DCAs, parallel drum smash, and 6 Matrices.',
		fileName: '07_Mixing_Buses_and_Sends.md',
		category: 'Mixing & Summing'
	},
	{
		slug: '08-dca-mute-groups',
		number: '08',
		title: 'DCAs, Mute Groups & Fader Management',
		shortTitle: 'DCAs & Mute Groups',
		summary: '8 DCA groups, DCA pre/post-fader send behavior gotcha, Firmware 4.x DCA Spill, and 6 master Mute Groups with FX mute protocol.',
		fileName: '08_DCA_and_Mute_Groups.md',
		category: 'Mixing & Summing'
	},
	{
		slug: '09-effects-rack-plugins',
		number: '09',
		title: 'Virtual Effects Rack & Processors',
		shortTitle: 'Effects Rack & Plugins',
		summary: '8-slot virtual rack, send vs. insert workflows, vintage compressors (1176, LA-2A, Fairchild), Pultec EQs, delays, reverbs, and enhancers.',
		fileName: '09_Effects_Rack_and_Plugins.md',
		category: 'Mixing & Summing'
	},
	{
		slug: '10-monitoring-talkback',
		number: '10',
		title: 'Monitoring, Solo, Talkback & Utilities',
		shortTitle: 'Monitoring & Talkback',
		summary: 'Control Room / Phones, PFL vs. AFL solo, Talkback A/B destination matrices, test oscillator, and the 8-channel Dan Dugan speech automixer.',
		fileName: '10_Monitoring_Talkback_and_Utilities.md',
		category: 'Monitoring & Communications'
	},
	{
		slug: '11-personal-monitoring',
		number: '11',
		title: 'Personal Monitoring: Ultranet P16 & Midas DP48',
		shortTitle: 'Personal Monitoring',
		summary: 'Ultranet P16-M mixers and P16-D distribution hubs, the "16-channel squeeze" strategy, and Midas DP48 dual 48-channel AES50 integration.',
		fileName: '11_Personal_Monitoring_DP48_and_P16.md',
		category: 'Monitoring & Communications'
	},
	{
		slug: '12-scenes-cues-snippets',
		number: '12',
		title: 'Scenes, Cues, Snippets & Show Control',
		shortTitle: 'Scenes & Show Control',
		summary: 'Show control hierarchy (Show → Cues → Scenes → Snippets), surgical snippet recalls without audio dropouts, and Parameter/Channel Safes.',
		fileName: '12_Scenes_Cues_and_Snippets.md',
		category: 'Show Control & Recording'
	},
	{
		slug: '13-recording-expansion-cards',
		number: '13',
		title: 'Recording, Playback & Expansion Cards',
		shortTitle: 'Recording & Cards',
		summary: 'Top-panel 2-track USB WAV recorder, 32x32 X-USB interface, standalone X-LIVE dual SD card recording, and Virtual Soundcheck (VSC).',
		fileName: '13_Recording_and_Expansion_Cards.md',
		category: 'Show Control & Recording'
	},
	{
		slug: '14-network-remote-control',
		number: '14',
		title: 'Network Setup, Remote Control & Software',
		shortTitle: 'Network & Remote Apps',
		summary: 'Static IP configuration, live venue 5 GHz Wi-Fi optimization, X32-Edit synchronization safety, Mixing Station customization, and OSC UDP control.',
		fileName: '14_Network_Remote_Control_and_Software.md',
		category: 'Control & Live Operations'
	},
	{
		slug: '15-live-mixing-workflows',
		number: '15',
		title: 'Live Mixing Workflows & System Tuning',
		shortTitle: 'Live Mixing Workflows',
		summary: 'Step-by-step soundcheck protocol, PA time-alignment formulas, ringing out stage monitors with RTA, broadcast streaming loudness, and troubleshooting.',
		fileName: '15_Live_Mixing_Workflows_and_Best_Practices.md',
		category: 'Control & Live Operations'
	}
];

// Load raw markdown files at build time using Vite's glob import
const markdownModules = import.meta.glob('../../content/*.md', {
	query: '?raw',
	import: 'default',
	eager: true
}) as Record<string, string>;

export const CHAPTERS: ChapterMeta[] = CHAPTER_DEFINITIONS.map((def) => {
	const raw = markdownModules[`../../content/${def.fileName}`] ?? '';
	const toc = extractToc(raw);
	return {
		...def,
		toc
	};
});

export function getChapterBySlug(slug: string): (ChapterMeta & { rawContent: string; toc: TocItem[]; prev: ChapterMeta | null; next: ChapterMeta | null }) | null {
	const index = CHAPTERS.findIndex((c) => c.slug === slug);
	if (index === -1) return null;

	const chapter = CHAPTERS[index];
	const key = `../../content/${chapter.fileName}`;
	const rawContent = markdownModules[key] ?? '';
	const toc = chapter.toc ?? extractToc(rawContent);

	const prev = index > 0 ? CHAPTERS[index - 1] : null;
	const next = index < CHAPTERS.length - 1 ? CHAPTERS[index + 1] : null;

	return {
		...chapter,
		rawContent,
		toc,
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
