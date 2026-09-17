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
	onSaveAsRequested,
	onDirtyChange,
}) {
	const [project, setProject] = useState(null);
	const [projectStatus, setProjectStatus] = useState('idle');
	const [projectError, setProjectError] = useState(null);

	async function openProject(projectId) {
		try {
			const project = await getProject(projectId);

			if (!project) {
				setProjectStatus('error');
				setProjectError(new Error('Project does not exist.'));
				return;
			}

			resetProjectStatus();
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
		} catch (error) {
			setProjectStatus('error');
			setProjectError(error);

			console.error('Failed to open project: ', error);
		}
	}

	/*
	 * Saves the current project
	 */
	async function saveCurrentProject() {
		if (!project) {
			onSaveAsRequested?.(); // opens the Save As modal there is no existing project to overwrite
			return;
		}

		setProjectStatus('saving');
		setProjectError(null);

		try {
			const updatedProject = updateProjectFromWorkspace(
				project,
				workspace
			);

			await saveProjectToDB(updatedProject);

			setProject(updatedProject);
			onDirtyChange(false);

			setProjectStatus('saved');

			return true;
		} catch (error) {
			setProjectStatus('error');
			setProjectError(error);

			console.error('Failed to save project:', error);
			return false;
		}
	}

	/*
	 * Creates a brand new project
	 */
	async function saveProjectAs(name, description) {
		setProjectStatus('saving');
		setProjectError(null);

		try {
			const newProject = createProjectFromWorkspace(
				name,
				description,
				workspace
			);

			await saveProjectToDB(newProject);

			setProject(newProject);

			session.setSessionInfo((prev) => ({
				...prev,
				metadata: {
					...prev.metadata,
					projectId: newProject.metadata.id,
					modified: new Date().toISOString(),
				},
			}));

			onDirtyChange(false);

			setProjectStatus('saved');

			return newProject;
		} catch (error) {
			console.error('Failed to save project:', error);
			setProjectStatus('error');
			setProjectError(error);
			return null;
		}
	}

	function resetProjectStatus() {
		setProjectStatus('idle');
		setProjectError(null);
	}

	return {
		project,
		setProject,

		projectStatus,
		projectError,
		resetProjectStatus,

		openProject,
		saveCurrentProject,
		saveProjectAs,
	};
}
