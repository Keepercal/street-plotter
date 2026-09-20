import {
	createProjectData,
	createProjectDataFromWorkspace,
} from './projectData';

import {
	createSessionMetadata,
	createSessionMetadataFromWorkspace,
} from './sessionMetadata';

const VERSION = 1;

/**
 * createSession
 * -----------
 * Creates a Session model from session-shaped data.
 */
export function createSession(overrides = {}) {
	return {
		version: VERSION,

		metadata: createSessionMetadata(overrides.metadata),
		data: createProjectData(overrides.data),
	};
}

/**
 * createSessionFromWorkspace
 * -----------
 * Creates a Session model from workspace state.
 */
export function createSessionFromWorkspace(workspace, metadata = {}) {
	return createSession({
		metadata,
		data: createProjectDataFromWorkspace(workspace),
	});
}

/**
 * updateSession
 * -----------
 * Updates a Session model from session-shaped data.
 */
export function updateSession(session, changes = {}) {
	return {
		...session,

		metadata: createSessionMetadata({
			...session.metadata,
			...changes.metadata,
			modified: new Date().toISOString(),
		}),

		data: {
			...session.data,
			...changes.data,
		},
	};
}

/**
 * updateSessionFromWorkspace
 * -----------
 * Updates a Session model from workspace state.
 */
export function updateSessionFromWorkspace(session, workspace) {
	return updateSession(session, {
		data: createProjectDataFromWorkspace(workspace),
		metadata: createSessionMetadataFromWorkspace(session),
	});
}
