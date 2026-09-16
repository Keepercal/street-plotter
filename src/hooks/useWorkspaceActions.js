import { useCallback } from 'react';
import { createSession } from '../models/session.js';
import { getProject } from '../db/projectDB.js';

/**
 * useWorkspaceActions
 * ---------
 * Restoring and resetting the workspace (project, map settings, boundaries, layers).
 */
export default function useWorkspaceActions({
	setSessionInfo,
	setProject,
	resetProjectStatus,
	setBasemap,
	setDisplayMode,
	restoreBoundaries,
	restoreLayers,
	setIsDirty,

	clearSavedSession,
	clearBoundaryResults,
	clearBoundaries,
	clearLayers,
	clearCache,
	setActiveModal,
	setActiveDrawer,
}) {
	/*
	 * Restores a saved workspace, including the project, map settings, boundaries, and layers.
	 */
	const restoreWorkspace = useCallback(
		async (session) => {
			if (!session) return;

			console.log('[DEBUG] Restoring workspace:', session);

			console.log(
				'[DEBUG] Session type:',
				session.projectId
					? `Project (${session.projectId})`
					: 'Temporary session'
			);

			// If the session matches the ID of a project
			if (session.metadata?.projectId) {
				const project = await getProject(session.metadata.projectId);

				if (project) {
					setProject(project);
				}
			}

			const sessionData = session.data ?? {};
			setSessionInfo(session);

			// restore workspace settings
			setBasemap(sessionData.settings?.basemap ?? 'carto');
			setDisplayMode(sessionData.settings?.displayMode ?? 'default');

			// restore boundary
			restoreBoundaries(sessionData.boundaries);

			// restore layers
			restoreLayers(sessionData.layers ?? []);

			if (session.metadata?.projectId === null) {
				setIsDirty(true);
			} else {
				setIsDirty(false);
			}
		},
		[
			setSessionInfo,
			setProject,
			setBasemap,
			setDisplayMode,
			restoreBoundaries,
			restoreLayers,
			setIsDirty,
		]
	);

	/*
	 * Creates a blank workspace
	 */
	const resetWorkspace = useCallback(
		({ preserveAutosave = false } = {}) => {
			console.log('[DEBUG] Resetting workspace');

			if (!preserveAutosave) {
				clearSavedSession();
			}

			setProject(null);
			resetProjectStatus?.();
			setSessionInfo(createSession());

			clearBoundaryResults();
			clearBoundaries();
			clearLayers();
			clearCache();

			setBasemap('carto');
			setDisplayMode('default');

			setActiveModal(null);
			setActiveDrawer(null);
			setIsDirty(false);
		},
		[
			clearSavedSession,
			setProject,
			resetProjectStatus,
			setSessionInfo,
			clearBoundaryResults,
			clearBoundaries,
			clearLayers,
			clearCache,
			setBasemap,
			setDisplayMode,
			setActiveModal,
			setActiveDrawer,
			setIsDirty,
		]
	);

	return { restoreWorkspace, resetWorkspace };
}
