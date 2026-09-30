import {
	createProjectData,
	createProjectDataFromWorkspace,
} from './projectData';

/**
 * Creates a Project model from project-shaped data.
 */
export function createProject(overrides = {}) {
	const now = new Date().toISOString();

	return {
		version: 1,

		metadata: {
			id: crypto.randomUUID(),
			name: 'Untitled Project',
			description: '',
			created: now,
			modified: now,
			...overrides.metadata,
		},

		data: createProjectData(overrides.data),
	};
}

/**
 * Creates a Project model from workspace state.
 */
export function createProjectFromWorkspace(name, description, workspace) {
	return createProject({
		metadata: {
			name,
			description,
		},
		data: createProjectDataFromWorkspace(workspace),
	});
}

/**
 * Updates a Project model from project-shaped data.
 */
export function updateProject(project, changes = {}) {
	return {
		...project,

		metadata: {
			...project.metadata,
			...changes.metadata,
			modified: new Date().toISOString(),
		},

		data: {
			...project.data,
			...changes.data,
		},
	};
}

/**
 * Updates a Project model from workspace state.
 */
export function updateProjectFromWorkspace(project, workspace) {
	return updateProject(project, {
		data: createProjectDataFromWorkspace(workspace),
	});
}
