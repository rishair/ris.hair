import { getAllProjects } from '$lib/projects';

export async function load() {
	const projects = await getAllProjects();
	return { projects };
}
