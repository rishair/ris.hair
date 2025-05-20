import { getPost } from '$lib/posts';
import type { Post } from '$lib/types';

export async function load({ params }) {
	const post: Post = await getPost(params.slug);
	return { post, title: post.title + ' / Rishi' };
}
