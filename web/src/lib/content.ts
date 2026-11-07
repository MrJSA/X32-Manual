import { extractToc, type TocItem } from './markdown.js';
import type { Lang } from './i18n/index.js';

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

export interface ChapterDefinition {
	slug: string;
	number: string;
	fileName: string;
	title: Record<Lang, string>;
	shortTitle: Record<Lang, string>;
	summary: Record<Lang, string>;
	category: Record<Lang, string>;
}

export const CHAPTER_DEFINITIONS: ChapterDefinition[] = [
	{
		slug: '01-hardware-overview',
		number: '01',
		fileName: '01_Hardware_Overview_and_Surface_Anatomy.md',
		title: {
			en: 'Hardware Overview & Surface Anatomy',
			de: 'Hardware-Übersicht & Pult-Anatomie'
		},
		shortTitle: {
			en: 'Hardware Overview',
			de: 'Hardware-Übersicht'
		},
		summary: {
			en: 'Surface topography, fader banks, dedicated channel strip controls, 7" color TFT screen, and rear panel connectivity.',
			de: 'Oberflächen-Topographie, Faderbänke, dedizierte Channel-Strip-Bedienelemente, 7"-Farbdisplay und Anschlüsse der Rückseite.'
		},
		category: {
			en: 'Console Foundations',
			de: 'Grundlagen der Konsole'
		}
	},
	{
		slug: '02-stageboxes-aes50',
		number: '02',
		fileName: '02_Stageboxes_and_AES50_Networking.md',
		title: {
			en: 'Digital Snakes, Stageboxes & AES50 Networks',
			de: 'Digitale Snakes, Stageboxen & AES50-Netzwerke'
		},
		shortTitle: {
			en: 'Stageboxes & AES50',
			de: 'Stageboxen & AES50'
		},
		summary: {
			en: 'SuperMAC AES50 protocol, S16/S32/SD/DL stageboxes, mandatory shielded STP cabling and EtherCON requirements, and master/slave clocking.',
			de: 'SuperMAC AES50-Protokoll, S16/S32/SD/DL Stageboxen, geschirmte STP-Verkabelung mit EtherCON und Master/Slave-Clocking.'
		},
		category: {
			en: 'Console Foundations',
			de: 'Grundlagen der Konsole'
		}
	},
	{
		slug: '03-routing-patching',
		number: '03',
		fileName: '03_Routing_and_Patching.md',
		title: {
			en: 'Routing, Patching & Signal Distribution',
			de: 'Routing, Patching & Signalverteilung'
		},
		shortTitle: {
			en: 'Routing & Patching',
			de: 'Routing & Patching'
		},
		summary: {
			en: 'Blocks of eight, tap point selection (In/LC, Pre-EQ, Pre-Fader, Post-Fader), XLR Out, Aux Out, Ultranet, Card Out, and stage patch recipes.',
			de: 'Achter-Blöcke, Tap-Punkte (In/LC, Pre-EQ, Pre-Fader, Post-Fader), XLR Out, Aux Out, Ultranet, Card Out und Bühnen-Patch-Rezepte.'
		},
		category: {
			en: 'Routing & Patching',
			de: 'Routing & Signalverteilung'
		}
	},
	{
		slug: '04-user-routing',
		number: '04',
		fileName: '04_Firmware_4x_User_Routing.md',
		title: {
			en: 'Firmware 4.x User Routing (1:1 Patching)',
			de: 'Firmware 4.x User Routing (1:1 Patching)'
		},
		shortTitle: {
			en: 'User Routing (1:1)',
			de: 'User Routing (1:1)'
		},
		summary: {
			en: 'Breaking free of 8-channel blocks with Firmware 4.x User In and User Out 1:1 flexible patching, wireless mic racks, and custom stage patches.',
			de: 'Loslösen von Achter-Blöcken mit Firmware 4.x User In und User Out 1:1 Patching, Funkempfänger-Racks und individuelle Bühnen-Patches.'
		},
		category: {
			en: 'Routing & Patching',
			de: 'Routing & Signalverteilung'
		}
	},
	{
		slug: '05-gain-staging-preamps',
		number: '05',
		fileName: '05_Gain_Staging_and_Preamps.md',
		title: {
			en: 'Gain Staging, Preamps & Headamps',
			de: 'Gain-Staging, Preamps & Vorverstärker'
		},
		shortTitle: {
			en: 'Gain Staging & Preamps',
			de: 'Gain-Staging & Preamps'
		},
		summary: {
			en: 'Analog headamp vs. digital trim, the -18 dBFS digital target, phantom power rules, polarity flip, and HA Gain Split.',
			de: 'Analoger Vorverstärker vs. digitaler Trim, das -18 dBFS Digital-Ziel, Phantomspeisungs-Regeln, Phasendrehung und HA Gain Split.'
		},
		category: {
			en: 'Channel Strip',
			de: 'Kanalzug (Channel Strip)'
		}
	},
	{
		slug: '06-channel-processing',
		number: '06',
		fileName: '06_Channel_Processing.md',
		title: {
			en: 'Channel Processing Architecture',
			de: 'Kanalbearbeitung & Signalarchitektur'
		},
		shortTitle: {
			en: 'Channel Processing',
			de: 'Kanalbearbeitung'
		},
		summary: {
			en: 'Signal flow, Low Cut filter, 5-mode Gate/Expander/Ducker, 4-band PEQ with RTA, and dynamics compressor with parallel mix %.',
			de: 'Signalfluss, Low-Cut-Filter, 5-Modi Noise Gate/Expander/Ducker, 4-Band parametrischer EQ mit RTA und Dynamikkompressor mit parallelem Mix.'
		},
		category: {
			en: 'Channel Strip',
			de: 'Kanalzug (Channel Strip)'
		}
	},
	{
		slug: '07-mix-buses-sends',
		number: '07',
		fileName: '07_Mixing_Buses_and_Sends.md',
		title: {
			en: 'Mix Buses, Sends-on-Faders & Matrices',
			de: 'Mix-Busse, Sends-on-Faders & Matrizen'
		},
		shortTitle: {
			en: 'Mix Buses & Sends',
			de: 'Mix-Busse & Sends'
		},
		summary: {
			en: '16 Mix Buses, Sends-on-Faders workflow, floor monitors vs. IEMs, audio subgroups vs. DCAs, parallel drum smash, and 6 Matrices.',
			de: '16 Mix-Busse, Sends-on-Faders Workflow, Bühnenmonitore vs. In-Ear-Monitoring, Subgruppen vs. DCAs, parallele Drums und 6 Matrizen.'
		},
		category: {
			en: 'Mixing & Summing',
			de: 'Mischen & Summieren'
		}
	},
	{
		slug: '08-dca-mute-groups',
		number: '08',
		fileName: '08_DCA_and_Mute_Groups.md',
		title: {
			en: 'DCAs, Mute Groups & Fader Management',
			de: 'DCAs, Mute-Gruppen & Fader-Organisation'
		},
		shortTitle: {
			en: 'DCAs & Mute Groups',
			de: 'DCAs & Mute-Gruppen'
		},
		summary: {
			en: '8 DCA groups, DCA pre/post-fader send behavior gotcha, Firmware 4.x DCA Spill, and 6 master Mute Groups with FX mute protocol.',
			de: '8 DCA-Gruppen, Pre/Post-Fader Send-Verhalten, Firmware 4.x DCA-Spill und 6 Master-Mute-Gruppen mit FX-Mute-Strategie.'
		},
		category: {
			en: 'Mixing & Summing',
			de: 'Mischen & Summieren'
		}
	},
	{
		slug: '09-effects-rack-plugins',
		number: '09',
		fileName: '09_Effects_Rack_and_Plugins.md',
		title: {
			en: 'Virtual Effects Rack & Processors',
			de: 'Virtuelles Effekt-Rack & Studio-Prozessoren'
		},
		shortTitle: {
			en: 'Effects Rack & Plugins',
			de: 'Effekt-Rack & Plugins'
		},
		summary: {
			en: '8-slot virtual rack, send vs. insert workflows, vintage compressors (1176, LA-2A, Fairchild), Pultec EQs, delays, reverbs, and enhancers.',
			de: '8-Slot virtuelles Rack, Send- vs. Insert-Effekte, Vintage-Kompressoren (1176, LA-2A, Fairchild), Pultec EQs, Delays, Reverbs und Enhancer.'
		},
		category: {
			en: 'Mixing & Summing',
			de: 'Mischen & Summieren'
		}
	},
	{
		slug: '10-monitoring-talkback',
		number: '10',
		fileName: '10_Monitoring_Talkback_and_Utilities.md',
		title: {
			en: 'Monitoring, Solo, Talkback & Utilities',
			de: 'Monitoring, Solo, Talkback & System-Utilities'
		},
		shortTitle: {
			en: 'Monitoring & Talkback',
			de: 'Monitoring & Talkback'
		},
		summary: {
			en: 'Control Room / Phones, PFL vs. AFL solo, Talkback A/B destination matrices, test oscillator, and the 8-channel Dan Dugan speech automixer.',
			de: 'Regieabhöre & Kopfhörer, PFL vs. AFL Solo, Talkback A/B Routing, Testoszillator und der 8-Kanal Dan Dugan Sprach-Automixer.'
		},
		category: {
			en: 'Monitoring & Communications',
			de: 'Monitoring & Kommunikation'
		}
	},
	{
		slug: '11-personal-monitoring',
		number: '11',
		fileName: '11_Personal_Monitoring_DP48_and_P16.md',
		title: {
			en: 'Personal Monitoring: Ultranet P16 & Midas DP48',
			de: 'Persönliches Monitoring: Ultranet P16 & Midas DP48'
		},
		shortTitle: {
			en: 'Personal Monitoring',
			de: 'Personal Monitoring'
		},
		summary: {
			en: 'Ultranet P16-M mixers and P16-D distribution hubs, the "16-channel squeeze" strategy, and Midas DP48 dual 48-channel AES50 integration.',
			de: 'Ultranet P16-M Mixer und P16-D Hubs, die „16-Kanal-Kompression“-Strategie und Einbindung des Midas DP48 über duale 48-Kanal AES50 Streams.'
		},
		category: {
			en: 'Monitoring & Communications',
			de: 'Monitoring & Kommunikation'
		}
	},
	{
		slug: '12-scenes-cues-snippets',
		number: '12',
		fileName: '12_Scenes_Cues_and_Snippets.md',
		title: {
			en: 'Scenes, Cues, Snippets & Show Control',
			de: 'Szenen, Cues, Snippets & Show-Steuerung'
		},
		shortTitle: {
			en: 'Scenes & Show Control',
			de: 'Szenen & Show-Steuerung'
		},
		summary: {
			en: 'Show control hierarchy (Show → Cues → Scenes → Snippets), surgical snippet recalls without audio dropouts, and Parameter/Channel Safes.',
			de: 'Hierarchie der Show-Steuerung (Show → Cues → Szenen → Snippets), punktgenaue Snippet-Aufrufe ohne Dropouts und Parameter-/Kanal-Safes.'
		},
		category: {
			en: 'Show Control & Recording',
			de: 'Show-Steuerung & Recording'
		}
	},
	{
		slug: '13-recording-expansion-cards',
		number: '13',
		fileName: '13_Recording_and_Expansion_Cards.md',
		title: {
			en: 'Recording, Playback & Expansion Cards',
			de: 'Aufnahme, Wiedergabe & Erweiterungskarten'
		},
		shortTitle: {
			en: 'Recording & Cards',
			de: 'Aufnahme & Karten'
		},
		summary: {
			en: 'Top-panel 2-track USB WAV recorder, 32x32 X-USB interface, standalone X-LIVE dual SD card recording, and Virtual Soundcheck (VSC).',
			de: 'Oberseitiger 2-Spur USB-WAV-Recorder, 32x32 X-USB Interface, autarke X-LIVE Doppel-SD-Aufnahme und virtueller Soundcheck (VSC).'
		},
		category: {
			en: 'Show Control & Recording',
			de: 'Show-Steuerung & Recording'
		}
	},
	{
		slug: '14-network-remote-control',
		number: '14',
		fileName: '14_Network_Remote_Control_and_Software.md',
		title: {
			en: 'Network Setup, Remote Control & Software',
			de: 'Netzwerk-Setup, Fernsteuerung & Software'
		},
		shortTitle: {
			en: 'Network & Remote Apps',
			de: 'Netzwerk & Remote-Apps'
		},
		summary: {
			en: 'Static IP configuration, live venue 5 GHz Wi-Fi optimization, X32-Edit synchronization safety, Mixing Station customization, and OSC UDP control.',
			de: 'Statische IP-Konfiguration, 5 GHz WLAN-Optimierung im Saal, X32-Edit Synchronisation, Mixing Station Anpassung und OSC-Steuerung.'
		},
		category: {
			en: 'Control & Live Operations',
			de: 'Steuerung & Live-Betrieb'
		}
	},
	{
		slug: '15-live-mixing-workflows',
		number: '15',
		fileName: '15_Live_Mixing_Workflows_and_Best_Practices.md',
		title: {
			en: 'Live Mixing Workflows & System Tuning',
			de: 'Live-Mixing-Workflows & System-Einmessung'
		},
		shortTitle: {
			en: 'Live Mixing Workflows',
			de: 'Live-Workflows & Einmessen'
		},
		summary: {
			en: 'Step-by-step soundcheck protocol, PA time-alignment formulas, ringing out stage monitors with RTA, broadcast streaming loudness, and troubleshooting.',
			de: 'Schritt-für-Schritt Soundcheck-Protokoll, PA-Laufzeit-Berechnungen, Einpfeifen von Monitoren mit RTA, Broadcast-Lautheit und Fehlersuche.'
		},
		category: {
			en: 'Control & Live Operations',
			de: 'Steuerung & Live-Betrieb'
		}
	}
];

// Load raw markdown files at build time using Vite's glob import
const markdownModules = import.meta.glob('../../content/**/*.md', {
	query: '?raw',
	import: 'default',
	eager: true
}) as Record<string, string>;

export function getChapters(lang: Lang = 'en'): ChapterMeta[] {
	return CHAPTER_DEFINITIONS.map((def) => {
		const key = `../../content/${lang}/${def.fileName}`;
		const raw = markdownModules[key] ?? '';
		const toc = extractToc(raw);
		return {
			slug: def.slug,
			number: def.number,
			title: def.title[lang],
			shortTitle: def.shortTitle[lang],
			summary: def.summary[lang],
			fileName: def.fileName,
			category: def.category[lang],
			toc
		};
	});
}

// Keep CHAPTERS exported as English default for backward compatibility
export const CHAPTERS: ChapterMeta[] = getChapters('en');

export function getChapterBySlug(
	slug: string,
	lang: Lang = 'en'
): (ChapterMeta & { rawContent: string; toc: TocItem[]; prev: ChapterMeta | null; next: ChapterMeta | null }) | null {
	const chapters = getChapters(lang);
	const index = chapters.findIndex((c) => c.slug === slug);
	if (index === -1) return null;

	const chapter = chapters[index];
	const key = `../../content/${lang}/${chapter.fileName}`;
	const rawContent = markdownModules[key] ?? '';
	const toc = chapter.toc ?? extractToc(rawContent);

	const prev = index > 0 ? chapters[index - 1] : null;
	const next = index < chapters.length - 1 ? chapters[index + 1] : null;

	return {
		...chapter,
		rawContent,
		toc,
		prev,
		next
	};
}

export function getIndexContent(lang: Lang = 'en'): string {
	const key = `../../content/${lang}/INDEX.md`;
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

export function buildSearchIndex(lang: Lang = 'en'): SearchEntry[] {
	const chapters = getChapters(lang);
	return chapters.map((ch) => {
		const raw = markdownModules[`../../content/${lang}/${ch.fileName}`] ?? '';
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
