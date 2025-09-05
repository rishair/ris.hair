import { getAllProjects } from '$lib/projects';

interface Project {
	title: string;
	slug: string;
}

export async function load({ params }) {
	const projects: Project[] = await getAllProjects();
	const index = projects.findIndex((p) => p.slug === params.slug);
	const project = projects[index];

	const prev = index > 0 ? projects[index - 1] : null;
	const next = index < projects.length - 1 ? projects[index + 1] : null;

	return {
		project,
		prevProject: prev ? { slug: prev.slug, title: prev.title } : null,
		nextProject: next ? { slug: next.slug, title: next.title } : null,
		title: project.title + " / Rishi",
		description: project.description
	};
}
