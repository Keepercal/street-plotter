const SESSION_KEY = 'osm-project-session';

/**
 * Saves the workspace as a session to local storage
 * @param {Object} project The workspace to save to session
 */
export function saveSession(workspace) {
	localStorage.setItem(SESSION_KEY, JSON.stringify(workspace));
}

/**
 * Loads a session from local storage
 * @returns
 */
export function loadSession() {
	const json = localStorage.getItem(SESSION_KEY);

	// No saved project exists
	if (!json) {
		return null;
	}

	try {
		return JSON.parse(json);
	} catch (error) {
		console.error('[DEBUG] Failed to load session:', error);
		return null;
	}
}

/**
 * Remove saved session from local storage
 */
export function removeSession() {
	localStorage.removeItem(SESSION_KEY);
}
