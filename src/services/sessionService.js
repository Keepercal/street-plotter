const SESSION_KEY = 'osm-project-session';

/**
 * Save project to local storage
 */
export function saveSession(project) {
	localStorage.setItem(SESSION_KEY, JSON.stringify(project));
}

/**
 * Load saved project from local storage
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
 * Remove saved project
 */
export function clearSession() {
	localStorage.removeItem(SESSION_KEY);
}
