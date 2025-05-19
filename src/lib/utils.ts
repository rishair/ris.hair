import { marked } from 'marked';

type DateStyle = Intl.DateTimeFormatOptions['dateStyle']

export function formatDate(date: string, dateStyle: DateStyle = 'medium', locales = 'en') {
	// Safari is mad about dashes in the date
	const dateToFormat = new Date(date.replaceAll('-', '/'))
	const dateFormatter = new Intl.DateTimeFormat(locales, { dateStyle })
	return dateFormatter.format(dateToFormat)
}

/**
 * Process markdown content with custom extensions for:
 * - Images with captions that expand to full screen
 * - Quotes with special styling
 * - Code blocks with special formatting
 */
export function processMarkdown(content: string): string {
	if (!content) return '';

	let processedContent = content;

	// Process blockquotes: group consecutive lines starting with '>' or '>!'
	processedContent = processedContent.replace(
		/(^>!.*(?:\n>!.*)*)|(^>.*(?:\n>.*)*)/gm,
		(match) => {
			// Check if it's a non-italic blockquote
			const isNoItalic = match.trim().startsWith('>!');
			console.log(match.trim().slice(0, 5))
			// Remove leading '> ' or '>! ' and split by newlines
			const lines = match.split(/\n/).map(line => line.replace(/^>!? ?/, '').trim());
			const wrapped = lines.map(line => {
				if (!line) return '';
				const headerMatch = line.match(/^(#{1,6})\s+(.*)$/);
				if (headerMatch) {
					const level = headerMatch[1].length;
					const text = headerMatch[2];
					return `<h${level}>${marked.parseInline(text)}</h${level}>`;
				}
				return `<p>${marked.parseInline(line)}</p>`;
			}).join('');
			return `<blockquote${isNoItalic ? ' class="no-italic"' : ''}>${wrapped}</blockquote>`;
		}
	);

	// Process code blocks: ```code```
	processedContent = processedContent.replace(
		/```([\s\S]*?)```/g,
		(match, code) => {
			return `<pre class="bg-gray-100 rounded-lg p-4 my-6 overflow-x-auto"><code class="font-mono text-sm">${code.trim()}</code></pre>`;
		}
	);

	// Process images with captions: ![alt text](image-url "caption")
	processedContent = processedContent.replace(
		/!\[(.*?)\]\((.*?)(?:\s+"(.*?)")?\)/g,
		(match, alt, src, caption) => {
			return `<figure class="my-6"><img src="${src}" alt="${alt || ''}" class="w-full rounded-lg shadow transform hover:scale-105 transition-transform duration-200 cursor-pointer markdown-image" data-caption="${caption || ''}"/>${caption ? `<figcaption class="text-sm text-gray-500 mt-2">${caption}</figcaption>` : ''}</figure>`;
		}
	);

	// Process video embeds: !video[alt](src "caption")
	processedContent = processedContent.replace(
		/!video\[(.*?)\]\((.*?)(?:\s+"(.*?)")?\)/g,
		(match, alt, src, caption) => {
			return `<figure class="my-6">
				<video autoplay muted loop playsinline width="100%" poster="/video/fallback.jpg" class="w-full rounded-lg shadow transform hover:scale-105 transition-transform duration-200 cursor-pointer markdown-video" data-caption="${caption || ''}">
					<source src="${src}" type="video/mp4" />
					${alt || 'Your browser does not support the video tag.'}
				</video>
				${caption ? `<figcaption class="text-sm text-gray-500 mt-2">${caption}</figcaption>` : ''}
			</figure>`;
		}
	);

	try {
		const renderer = new marked.Renderer();
		renderer.link = ({ href, title, tokens }) => {
			const text = tokens.map(t => 'text' in t ? t.text : '').join('');
			return `<a href="${href}" target="_blank" rel="noopener noreferrer"${title ? ` title="${title}"` : ''}>${text}</a>`;
		};

		const markedOptions = {
			breaks: true,
			renderer
		};
		const result = marked.parse(processedContent, markedOptions);
		return result.toString();
	} catch (error) {
		console.error('Error processing markdown:', error);
		return processedContent;
	}
}
