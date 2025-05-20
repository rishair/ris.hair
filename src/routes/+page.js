import { getAllProjects } from '$lib/projects';
import { getAllPosts } from '$lib/posts';

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;

export async function load() {
	const projects = await getAllProjects();
	const posts = await getAllPosts();
	return { projects, posts };
}
