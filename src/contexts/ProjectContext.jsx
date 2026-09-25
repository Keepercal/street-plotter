import { createContext, useContext, useMemo } from 'react';

const ProjectContext = createContext(null);

export function ProjectProvider({ value, children }) {
	return (
		<ProjectContext.Provider value={value}>
			{children}
		</ProjectContext.Provider>
	);
}

export function useProjectContext() {
	const context = useContext(ProjectContext);

	if (!context) {
		throw new Error(
			'useWorkspaceContext must be used within a WorkspaceProvider'
		);
	}

	return context;
}

/**
 * useProjectontextValue
 * ---------------
 * Assembles the ProjectContext value.
 */
export function useProjectContextValue(values) {
	const {
		project,
		projects,
		projectName,
		loadProjects,
		hasSavedProjects,
		saveCurrentProject,
		saveProjectAs,
		handleOpenProject,
		handleDeleteProject,
		handleUpdateProject,
	} = values;

	return useMemo(
		() => ({
			project,
			projects,
			projectName,
			loadProjects,
			hasSavedProjects,
			saveCurrentProject,
			saveProjectAs,
			handleOpenProject,
			handleDeleteProject,
			handleUpdateProject,
		}),
		[
			project,
			projects,
			projectName,
			loadProjects,
			hasSavedProjects,
			saveCurrentProject,
			saveProjectAs,
			handleOpenProject,
			handleDeleteProject,
			handleUpdateProject,
		]
	);
}
