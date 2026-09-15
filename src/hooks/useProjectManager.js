import { useState } from 'react';

import { getProject, saveProject as saveProjectToDB } from '../db/projectDB';
import { createSession } from '@/models/session.js';
import { createSessionMetadata } from '@/models/sessionMetadata';

import {
	createProjectFromWorkspace,
	updateProjectFromWorkspace,
} from '../models/project';

export default function useProjectManager({
	workspace,
	session,
	restore,
	//resetWorkspace,
	onSaveAsRequested,
	onDirtyChange,
}) {
	const [project, setProject] = useState(null);

	async function openProject(projectId) {
		const project = await getProject(projectId);

		if (!project) {
			console.error('Project not found');
			return;
		}

		console.log('[DEBUG] Opening project:', project);

		setProject(project);

		restore.restoreWorkspace(
			createSession({
				metadata: createSessionMetadata({
					projectId: project.metadata.id,
				}),
				data: project.data,
			})
		);

		onDirtyChange(false);
	}

	/*
	 * Saves the current project
	 */
	async function saveCurrentProject() {
		if (!project) {
			console.log('[DEBUG] No existing project, opening Save As');
			onSaveAsRequested?.();
			return;
		}

		const updatedProject = updateProjectFromWorkspace(project, workspace);

		await saveProjectToDB(updatedProject);

		console.log('[DEBUG] Saving project', updatedProject);

		setProject(updatedProject);
		onDirtyChange(false);

		console.log('[DEBUG] Project saved:', updatedProject);

		return true;
	}

	/*
	 * Creates a brand new project
	 */
	async function saveProjectAs(name, description) {
		const newProject = createProjectFromWorkspace(
			name,
			description,
			workspace
		);

		await saveProjectToDB(newProject);

		console.log('[DEBUG] Saving project', newProject);

		setProject(newProject);

		// Link the current session to this project
		session.setSessionInfo((prev) => ({
			...prev,
			metadata: {
				...prev.metadata,
				projectId: newProject.metadata.id,
				modified: new Date().toISOString(),
			},
		}));

		onDirtyChange(false);

		console.log('[DEBUG] Project saved:', newProject);

		return newProject;
	}

	return {
		project,
		setProject,

		openProject,
		saveCurrentProject,
		saveProjectAs,
	};
}
