import { getProject } from '$lib/projects';

export async function load({ params }) {
	const project = await getProject(params.slug);
	return { project };
}
