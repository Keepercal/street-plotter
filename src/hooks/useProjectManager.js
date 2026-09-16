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
		const project = await getProject(projectId);

		if (!project) {
			console.error('Project not found');
			return;
		}

		console.log('[DEBUG] Opening project:', project);

		setProjectStatus('idle');
		setProjectError(null);

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

		setProjectStatus('saving');
		setProjectError(null);

		try {
			const updatedProject = updateProjectFromWorkspace(
				project,
				workspace
			);

			await saveProjectToDB(updatedProject);

			console.log('[DEBUG] Saving project', updatedProject);

			setProject(updatedProject);
			onDirtyChange(false);

			setProjectStatus('saved');

			console.log('[DEBUG] Project saved:', updatedProject);

			return true;
		} catch (err) {
			console.error('[DEBUG] Failed to save project:', err);
			setProjectStatus('error');
			setProjectError(err);
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

			console.log('[DEBUG] Saving project', newProject);

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

			console.log('[DEBUG] Project saved:', newProject);

			return newProject;
		} catch (err) {
			console.error('[DEBUG] Failed to save project:', err);
			setProjectStatus('error');
			setProjectError(err);
			return null;
		}
	}

	return {
		project,
		setProject,

		projectStatus,
		projectError,

		openProject,
		saveCurrentProject,
		saveProjectAs,
	};
}
