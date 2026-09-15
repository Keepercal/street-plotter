import { useMemo, useEffect, useState, useCallback } from 'react';
import {
	saveSession,
	loadSession,
	clearSession,
} from '../services/sessionService';
import { createSessionFromWorkspace } from '../models/session';

/**
 * useSession
 * -----------
 * Handles session saving and loading.
 *
 * Includes:
 * - autosave
 * - restore
 */
export default function useSession({
	sessionInfo,
	basemap,
	displayMode,
	boundaries,
	layers,
	onRestore,
}) {
	// Prevent autosave until the initial session load is complete
	const [hydrated, setHydrated] = useState(false);

	// Prevent autosave while restoring a session
	const [restoring, setRestoring] = useState(false);

	function hasSessionData(session) {
		if (!session?.data) return false;

		const hasBoundary =
			Array.isArray(session.data.boundaries) &&
			session.data.boundaries.length > 0;

		const hasLayers =
			Array.isArray(session.data.layers) &&
			session.data.layers.length > 0;

		return Boolean(hasBoundary || hasLayers);
	}

	const clearSavedSession = useCallback(() => {
		clearSession();
	}, []);

	// Create the current session as an object
	const currentSession = useMemo(() => {
		if (!sessionInfo && !boundaries && layers.length === 0) {
			return null;
		}

		return createSessionFromWorkspace(
			{
				basemap,
				displayMode,
				boundaries,
				layers,
			},
			sessionInfo.metadata
		);
	}, [sessionInfo, basemap, displayMode, boundaries, layers]);

	// Load saved session from storage
	const restoreSavedSession = useCallback(() => {
		const session = loadSession();

		// No session found
		if (!session || !hasSessionData(session)) {
			console.log('[DEBUG] No saved session found');

			clearSession();

			setHydrated(true);
			return false;
		}

		setRestoring(true);

		// Send project data back to App
		onRestore?.(session);

		// Enable autosave after restore finishes
		setTimeout(() => {
			setRestoring(false);
			setHydrated(true);
		}, 0);

		return true;
	}, [onRestore]);

	// Automatically save changes after a short delay
	useEffect(() => {
		if (!hydrated || restoring) return;

		if (!currentSession || !hasSessionData(currentSession)) {
			return;
		}

		const timer = setTimeout(() => {
			saveSession(currentSession);
		}, 1000);

		return () => clearTimeout(timer);
	}, [currentSession, hydrated, restoring]);

	// Manually save current project
	const saveCurrentSession = useCallback(() => {
		if (!hydrated || restoring) return;

		if (!hasSessionData(currentSession)) {
			return;
		}

		saveSession(currentSession);
	}, [currentSession, hydrated, restoring]);

	// Export project as a JSON file
	/*const saveProjectAs = useCallback(() => {
		const json = JSON.stringify(currentProject, null, 2);

		const blob = new Blob([json], { type: 'application/json' });

		const url = URL.createObjectURL(blob);

		const link = document.createElement('a');

		link.href = url;

		const filename = currentProject.metadata.filename
			.replace(/[<>:"/\\|?*]+/g, '_')
			.trim();

		link.download = `${filename || 'Untitled Project'}.json`;

		link.click();

		URL.revokeObjectURL(url);
	}, [currentProject]); */

	return {
		currentSession,

		saveCurrentSession,
		clearSavedSession,
		restoreSavedSession,

		hydrated,
	};
}
