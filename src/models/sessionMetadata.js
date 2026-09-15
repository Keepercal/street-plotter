/**
 * createSessionMetadata
 * -----------
 * Creates a standardised SessionMetadata schema
 */
export function createSessionMetadata(overrides = {}) {
	const now = new Date().toISOString();

	return {
		id: overrides.id ?? crypto.randomUUID(),
		projectId: overrides.projectId ?? null,
		created: overrides.created ?? now,
		modified: overrides.modified ?? now,
	};
}

/**
 * createSessionMetadataFromWorkspace
 * -----------
 * Converts workspace state into standardised ProjectData schema
 */
export function createSessionMetadataFromWorkspace(session) {
	return createSessionMetadata({
		id: session.id,
		projectId: session.projectId,
		created: session.created,
		modified: session.modified,
	});
}
