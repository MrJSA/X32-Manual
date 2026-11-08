import { Marked } from 'marked';
import { localize, type Lang } from './i18n/index.js';

export interface TocItem {
	id: string;
	text: string;
	depth: number;
}

export function slugify(text: string): string {
	return text
		.replace(/&(?:quot|amp|lt|gt|#39|apos);/g, '')
		.replace(/["'“”‘’]/g, '')
		.toLowerCase()
		.normalize('NFKD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/<[^>]*>/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');
}

/**
 * Replaces markdown chapter links (e.g. `01_Gain_Staging_and_Preamps.md`)
 * with clean web routes (e.g. `/01-gain-staging-preamps`).
 */
export function normalizeLinks(markdown: string, lang: Lang = 'en'): string {
	return markdown.replace(/\]\(([0-9]{2}_[^)]+\.md|UserRouting\.md|INDEX\.md)\)/g, (match, file) => {
		const mapping: Record<string, string> = {
			'00_Introduction_and_Hardware_Overview.md': '/01-hardware-overview',
			'01_Hardware_Overview_and_Surface_Anatomy.md': '/01-hardware-overview',
			'09_Stageboxes_and_AES50_Networking.md': '/02-stageboxes-aes50',
			'02_Stageboxes_and_AES50_Networking.md': '/02-stageboxes-aes50',
			'03_Routing_and_Patching.md': '/03-routing-patching',
			'UserRouting.md': '/04-user-routing',
			'04_Firmware_4x_User_Routing.md': '/04-user-routing',
			'01_Gain_Staging_and_Preamps.md': '/05-gain-staging-preamps',
			'05_Gain_Staging_and_Preamps.md': '/05-gain-staging-preamps',
			'02_Channel_Processing.md': '/06-channel-processing',
			'06_Channel_Processing.md': '/06-channel-processing',
			'04_Mixing_Buses_and_Sends.md': '/07-mix-buses-sends',
			'07_Mixing_Buses_and_Sends.md': '/07-mix-buses-sends',
			'05_DCA_and_Mute_Groups.md': '/08-dca-mute-groups',
			'08_DCA_and_Mute_Groups.md': '/08-dca-mute-groups',
			'06_Effects_Rack_and_Plugins.md': '/09-effects-rack-plugins',
			'09_Effects_Rack_and_Plugins.md': '/09-effects-rack-plugins',
			'08_Monitoring_Talkback_and_Utilities.md': '/10-monitoring-talkback',
			'10_Monitoring_Talkback_and_Utilities.md': '/10-monitoring-talkback',
			'10_Personal_Monitoring_DP48_and_P16.md': '/11-personal-monitoring',
			'11_Personal_Monitoring_DP48_and_P16.md': '/11-personal-monitoring',
			'07_Scenes_Cues_and_Snippets.md': '/12-scenes-cues-snippets',
			'12_Scenes_Cues_and_Snippets.md': '/12-scenes-cues-snippets',
			'11_Recording_and_Expansion_Cards.md': '/13-recording-expansion-cards',
			'13_Recording_and_Expansion_Cards.md': '/13-recording-expansion-cards',
			'12_Network_Remote_Control_and_Software.md': '/14-network-remote-control',
			'14_Network_Remote_Control_and_Software.md': '/14-network-remote-control',
			'13_Live_Mixing_Workflows_and_Best_Practices.md': '/15-live-mixing-workflows',
			'15_Live_Mixing_Workflows_and_Best_Practices.md': '/15-live-mixing-workflows',
			'INDEX.md': '/'
		};
		const route = mapping[file] ?? `/${file.replace(/\.md$/, '')}`;
		return `](${localize(route, lang)})`;
	});
}


/**
 * Makes heading ids unique within one document, like GitHub: the second "Parameter"
 * becomes `parameter-1`. Both the renderer and the sidebar TOC use it, so they agree.
 */
function uniqueSlugger() {
	const seen = new Map<string, number>();
	return (base: string): string => {
		const n = seen.get(base) ?? 0;
		seen.set(base, n + 1);
		return n === 0 ? base : `${base}-${n}`;
	};
}

/** Slugger for the document currently being rendered (rendering is synchronous). */
let headingSlug = uniqueSlugger();

export function extractToc(markdown: string): TocItem[] {
	// Every heading level counts towards uniqueness (as in the renderer); only h2/h3 are listed.
	const headingRegex = /^(#{1,6})\s+(.+)$/gm;
	const unique = uniqueSlugger();
	const toc: TocItem[] = [];
	let match;

	while ((match = headingRegex.exec(markdown)) !== null) {
		const depth = match[1].length;
		const rawText = match[2].trim();
		const cleanText = rawText.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*_`]/g, '');
		const id = unique(slugify(cleanText));
		if (depth < 2 || depth > 3) continue;
		toc.push({ id, text: cleanText, depth });
	}

	return toc;
}

const marked = new Marked({
	gfm: true,
	renderer: {
		heading({ tokens, depth }) {
			const text = this.parser.parseInline(tokens);
			const cleanText = text.replace(/<[^>]*>/g, '');
			const id = headingSlug(slugify(cleanText));
			return `<h${depth} id="${id}"><a class="header-anchor" href="#${id}" aria-hidden="true" tabindex="-1">#</a>${text}</h${depth}>\n`;
		},
		link({ href, title, tokens }) {
			const text = this.parser.parseInline(tokens);
			const isExternal = /^https?:\/\//i.test(href);
			const titleAttr = title ? ` title="${title}"` : '';
			const relAttr = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
			return `<a href="${href}"${titleAttr}${relAttr}>${text}</a>`;
		},
		table(token) {
			let headerCells = '';
			for (let j = 0; j < token.header.length; j++) {
				headerCells += this.tablecell(token.header[j]);
			}
			const header = this.tablerow({ text: headerCells });

			let body = '';
			for (let j = 0; j < token.rows.length; j++) {
				const row = token.rows[j];
				let rowCells = '';
				for (let k = 0; k < row.length; k++) {
					rowCells += this.tablecell(row[k]);
				}
				body += this.tablerow({ text: rowCells });
			}
			const tbody = body ? `<tbody>\n${body}</tbody>\n` : '';
			return `<div class="table-container"><table>\n<thead>\n${header}</thead>\n${tbody}</table></div>\n`;
		}
	}
});

const CALLOUT_LABELS: Record<Lang, Record<string, string>> = {
	en: { note: 'Note', tip: 'Tip', important: 'Important', warning: 'Warning', caution: 'Caution' },
	de: { note: 'Hinweis', tip: 'Tipp', important: 'Wichtig', warning: 'Warnung', caution: 'Vorsicht' }
};

export function renderMarkdown(markdown: string, lang: Lang = 'en'): string {
	headingSlug = uniqueSlugger();
	const normalized = normalizeLinks(markdown, lang);
	const rendered = marked.parse(normalized, { async: false });

	// Process GitHub-style callouts: > [!NOTE], > [!TIP], > [!IMPORTANT], > [!WARNING], > [!CAUTION]
	return (rendered as string).replace(
		/<blockquote>\s*<p>\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]([\s\S]*?)<\/blockquote>/gi,
		(match, type, content) => {
			const alertType = type.toLowerCase();
			return `<div class="callout callout-${alertType}"><div class="callout-header"><span class="callout-badge">${CALLOUT_LABELS[lang][alertType] ?? type}</span></div><div class="callout-body"><p>${content.trim()}</p></div></div>`;
		}
	);
}
