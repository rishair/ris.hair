import { getProject } from '$lib/projects';

interface Project {
	title: string;
}

export async function load({ params }) {
	const project = await getProject(params.slug) as Project;
	return {
		project,
		title: 'Rishi | ' + project.title
	};
}
