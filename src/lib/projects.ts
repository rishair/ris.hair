import { load } from 'js-yaml';
import { error } from '@sveltejs/kit';
import { parseDate } from './utils';

// This helper function will read and parse all project YAML files
export async function getAllProjects() {
	const projects = [];

	// Import all .yaml files from src/projects
	const projectFiles = import.meta.glob('/src/projects/*.yaml', { as: 'raw', eager: true });

	for (const path in projectFiles) {
		const content = projectFiles[path];
		const project = load(content);
		// Skip empty or invalid project files
		if (project && typeof project === 'object' && project.slug && project.title) {
			projects.push(project);
		}
	}

	// Sort projects by date (most recent first)
	return projects.sort((a, b) => {
		if (!a.endDate) {
			return -1;
		}
		if (!b.endDate) {
			return 1;
		}
		const dateA = parseDate(a.endDate);
		const dateB = parseDate(b.endDate);
		return dateB.getTime() - dateA.getTime();
	});
}

// This helper function will get a single project by slug
export async function getProject(slug: string) {
	try {
		const projects = await getAllProjects();
		const project = projects.find((p) => p.slug === slug);

		if (!project) {
			throw error(404, 'Project not found');
		}

		return project;
	} catch (e) {
		throw error(404, 'Project not found');
	}
}
