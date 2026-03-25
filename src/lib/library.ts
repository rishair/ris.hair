export interface LibraryItem {
	title: string;
	author: string;
	type: 'article' | 'book' | 'essay' | 'podcast' | 'video';
	url: string;
	note: string;
	publication?: string;
	dateAdded: string;
}

export const libraryItems: LibraryItem[] = [
	{
		title: 'Your Work Will Change You Whether You Like It Or Not',
		author: 'Matt Beard',
		type: 'article',
		url: 'https://thatvastvariety.substack.com/p/your-work-will-change-you-whether',
		publication: 'That Vast Variety',
		note: 'Excellent commentary on choosing the games you\'re playing, and being totally aware that the games you play shape who you become.',
		dateAdded: '2026-03-25'
	}
];
