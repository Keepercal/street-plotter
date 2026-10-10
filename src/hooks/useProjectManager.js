import { useState } from 'react';

import {
	getProject,
	saveProject as saveProjectToDB,
	updateStoredProject,
} from '../db/projectDB';
import { createSession } from '@/models/session.js';
import { createSessionMetadata } from '@/models/sessionMetadata';

import {
	createProjectFromWorkspace,
	updateProjectFromWorkspace,
} from '../models/project';

/**
 * Manages project loading, saving, and metadata updates.
 *
 * Coordinates project persistence with the current workspace and session state.
 *
 * @param {Object} params The dependencies required to manage projects
 * @param {Object} params.workspace The current workspace data
 * @param {Object} params.session The current session and session state updater
 * @param {Object} params.restore The workspace restoration utilities
 * @param {Function} [params.onSaveAsRequested] Callback to request opening the Save As modal
 * @param {Function} params.onDirtyChange Callback to update the workspace dirty state
 * @returns {Object} Project state, status, and project management functions
 */
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

	/**
	 * Orchestrates opening a project into the workspace, handling db request, statues and session
	 * @param {string} projectId The ID of the project to update
	 * @returns {Promise<void>} Resolves when the operation completes
	 */
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

	/**
	 * Updates the currently open project in db
	 * @returns {Promise<Boolean>} True if successful, false if unsuccessful
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

			reportError(error, {
				tags: {
					feature: 'projects',
					operation: 'save',
				},
			});

			return false;
		}
	}

	/**
	 * Creates and saves a new project from workspace to db
	 * @param {string} name The project name, from user input
	 * @param {string} description The project description, from user input
	 * @returns {Promise<Object|null>} The saved project if successful, or null if saving fails
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

	/**
	 * Updates the metadata of a stored project.
	 * @param {string} projectId The ID of the project to update
	 * @param {Object} changes The metadata fields to update
	 * @returns {Promise<Object>} The updated project
	 */
	const updateProjectMetadata = (projectId, changes) => {
		return updateStoredProject(projectId, {
			metadata: changes,
		});
	};

	/** Resets popup status for projects */
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
		updateProjectMetadata,
	};
}
