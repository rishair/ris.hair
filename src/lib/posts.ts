import { load } from 'js-yaml';
import { error } from '@sveltejs/kit';
import type { Post } from './types';
import { parseDate } from './utils';

export async function getAllPosts(): Promise<Post[]> {
	const posts: Post[] = [];
	const files = import.meta.glob('/src/posts/*.yaml', { as: 'raw', eager: true });

	for (const path in files) {
		const raw = files[path] as string;
		const post = load(raw) as any;
		const slug = post.slug || path.split('/').at(-1)?.replace('.yaml', '');
		post.slug = slug;
		posts.push(post as Post);
	}

	console.log(posts);

	return posts
		.filter((p) => p.published)
		.sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime());
}

export async function getPost(slug: string): Promise<Post> {
	const posts = await getAllPosts();
	const post = posts.find((p) => p.slug === slug);
	if (!post) {
		throw error(404, 'Post not found');
	}
	return post;
}
