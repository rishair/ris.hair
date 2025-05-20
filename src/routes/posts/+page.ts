import type { Post } from '../../lib/types';
import { getAllPosts } from '$lib/posts';

export async function load() {
	const posts: Post[] = await getAllPosts();
	return { posts };
}
