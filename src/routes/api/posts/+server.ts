import { json } from '@sveltejs/kit';
import type { Post } from '$lib/types';
import { getAllPosts } from '$lib/posts';

async function getPosts(): Promise<Post[]> {
	return getAllPosts();
}

export async function GET() {
	const posts = await getPosts();
	return json(posts);
}
