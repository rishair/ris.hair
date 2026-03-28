import { load } from 'js-yaml';
import type { LibraryItem } from './types';

export async function getAllLibraryItems(): Promise<LibraryItem[]> {
	const items: LibraryItem[] = [];
	const files = import.meta.glob('/src/library/*.yaml', { as: 'raw', eager: true });

	for (const path in files) {
		const raw = files[path] as string;
		const item = load(raw) as any;
		const slug = item.slug || path.split('/').at(-1)?.replace('.yaml', '');
		item.slug = slug;
		items.push(item as LibraryItem);
	}

	return items;
}
