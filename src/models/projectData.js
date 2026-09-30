/**
 * Creates a standardised ProjectData object
 */
export function createProjectData(overrides = {}) {
	return {
		config: {
			basemap: 'carto',
			displayMode: 'default',
			...overrides.settings,
		},

		boundaries: overrides.boundaries ?? [],

		layers: overrides.layers ?? [],
	};
}

/**
 * Converts workspace state into standardised ProjectData object
 */
export function createProjectDataFromWorkspace(workspace) {
	return createProjectData({
		config: {
			basemap: workspace.basemap,
			displayMode: workspace.displayMode,
		},

		boundaries: workspace.boundaries,

		layers: workspace.layers,
	});
}
