/**
 * createLayer
 * -----------
 * Creates a Layer model from layer-shaped data.
 */
export function createLayer({
	osmTagValue,
	label,
	data,
	geojson,
	colour,
	visible = true,
	filters = [],
}) {
	return {
		osmTagValue,
		label,
		data,
		geojson,
		colour,
		visible,
		filters,
	};
}

/**
 * applyLayerChanges
 * -----------
 * Updates a Layer model from layer-shaped data.
 */

export function applyLayerChanges(layer, changes = {}) {
	return {
		...layer,
		...changes,
	};
}
