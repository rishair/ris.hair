import { getAllProjects } from '$lib/projects';

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;

export async function load({ fetch }) {
	const projects = await getAllProjects();
	const response = await fetch('api/posts');
	const posts = await response.json();
	return { projects, posts };
}
