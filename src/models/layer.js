/**
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
 * Updates a Layer model from layer-shaped data.
 */
export function applyLayerChanges(layer, changes = {}) {
	const hasChanges = Object.entries(changes).some(
		([key, value]) => layer[key] !== value
	);

	if (!hasChanges) {
		return layer;
	}

	return {
		...layer,
		...changes,
	};
}
