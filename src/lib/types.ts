export interface Document {
	title: string;
	slug: string;
	description: string;
	tags?: string[];
	image?: string;
}

export interface Post extends Document {
	date: string;
	published: boolean;
	body: string;
}

export type Categories = 'sveltekit' | 'svelte';

export interface Project extends Document {
	link?: string;
	startDate: string;
	endDate?: string;
	atAGlance?: string[];
	fullDescription?: string;
	gallery?: { src: string; caption?: string; type?: string }[];
}
