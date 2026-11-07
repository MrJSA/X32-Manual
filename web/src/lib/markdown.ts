import { Marked } from 'marked';

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
export function normalizeLinks(markdown: string): string {
	return markdown.replace(/\]\(([0-9]{2}_[^)]+\.md|UserRouting\.md|INDEX\.md)\)/g, (match, file) => {
		const mapping: Record<string, string> = {
			'00_Introduction_and_Hardware_Overview.md': '/00-hardware-overview',
			'01_Gain_Staging_and_Preamps.md': '/01-gain-staging-preamps',
			'02_Channel_Processing.md': '/02-channel-processing',
			'03_Routing_and_Patching.md': '/03-routing-patching',
			'04_Mixing_Buses_and_Sends.md': '/04-mix-buses-sends',
			'05_DCA_and_Mute_Groups.md': '/05-dca-mute-groups',
			'06_Effects_Rack_and_Plugins.md': '/06-effects-rack-plugins',
			'07_Scenes_Cues_and_Snippets.md': '/07-scenes-cues-snippets',
			'08_Monitoring_Talkback_and_Utilities.md': '/08-monitoring-talkback',
			'09_Stageboxes_and_AES50_Networking.md': '/09-stageboxes-aes50',
			'10_Personal_Monitoring_DP48_and_P16.md': '/10-personal-monitoring',
			'11_Recording_and_Expansion_Cards.md': '/11-recording-expansion-cards',
			'12_Network_Remote_Control_and_Software.md': '/12-network-remote-control',
			'13_Live_Mixing_Workflows_and_Best_Practices.md': '/13-live-mixing-workflows',
			'UserRouting.md': '/user-routing',
			'INDEX.md': '/'
		};
		const route = mapping[file] ?? `/${file.replace(/\.md$/, '')}`;
		return `](${route})`;
	});
}

export function extractToc(markdown: string): TocItem[] {
	const headingRegex = /^(#{2,3})\s+(.+)$/gm;
	const toc: TocItem[] = [];
	let match;

	while ((match = headingRegex.exec(markdown)) !== null) {
		const depth = match[1].length;
		const rawText = match[2].trim();
		const cleanText = rawText.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*_`]/g, '');
		const id = slugify(cleanText);
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
			const id = slugify(cleanText);
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

export function renderMarkdown(markdown: string): string {
	const normalized = normalizeLinks(markdown);
	const rendered = marked.parse(normalized, { async: false });

	// Process GitHub-style callouts: > [!NOTE], > [!TIP], > [!IMPORTANT], > [!WARNING], > [!CAUTION]
	return (rendered as string).replace(
		/<blockquote>\s*<p>\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]([\s\S]*?)<\/blockquote>/gi,
		(match, type, content) => {
			const alertType = type.toLowerCase();
			return `<div class="callout callout-${alertType}"><div class="callout-header"><span class="callout-badge">${type}</span></div><div class="callout-body"><p>${content.trim()}</p></div></div>`;
		}
	);
}
