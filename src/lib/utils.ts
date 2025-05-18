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
	
	// Process the content directly with regular expressions
	let processedContent = content;
	
	// Process blockquotes: > This is a quote
	processedContent = processedContent.replace(
		/^>\s*(.*?)$/gm,
		(match, quote) => {
			return `<blockquote class="border-l-4 border-orange pl-4 py-2 my-6 bg-orange bg-opacity-5 rounded-r-lg"><p>${quote}</p></blockquote>`;
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
	
	// Process the remaining content with marked
	// We'll use a simple approach to avoid TypeScript errors
	try {
		const markedOptions = { breaks: true };
		const result = marked.parse(processedContent, markedOptions);
		return result.toString();
	} catch (error) {
		console.error('Error processing markdown:', error);
		return processedContent;
	}
}
