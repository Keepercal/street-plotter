/**
 * createProjectData
 * -----------
 * Creates a standardised ProjectData schema
 */
export function createProjectData(overrides = {}) {
	return {
		settings: {
			basemap: 'carto',
			displayMode: 'default',
			...overrides.settings,
		},

		boundaries: overrides.boundaries ?? [],

		layers: overrides.layers ?? [],
	};
}

/**
 * createProjectDataFromWorkspace
 * -----------
 * Converts workspace state into standardised ProjectData schema
 */
export function createProjectDataFromWorkspace(workspace) {
	return createProjectData({
		settings: {
			basemap: workspace.basemap,
			displayMode: workspace.displayMode,
		},

		boundaries: workspace.boundaries,

		layers: workspace.layers,
	});
}
