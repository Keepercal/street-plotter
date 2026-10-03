import L from 'leaflet';

import getDaysSinceEdit from './getDaysSinceEdit';
import getColourByAge from './getColourByAge';

const defaultBlue = '#3388ff';

/* Create point marker */
function createDotMarker(latlng, colour, pane) {
	return L.circleMarker(latlng, {
		radius: 5,

		color: '#ffffff',
		weight: 1,

		fillColor: colour ?? defaultBlue,
		fillOpacity: 0.9,

		opacity: 1,

		pane: typeof pane === 'string' ? pane : undefined,
	});
}

/* Create marker for point features */
export function createFeatureMarker(
	feature,
	latlng,
	displayMode,
	colour,
	overview = false,
	pane
) {
	const match = feature._matchesFilters !== false;

	// Hide features that don't match filters
	if (!match) {
		return null;
	}

	let markerColour = colour ?? defaultBlue;

	// Change dot colour based on edit age
	if (displayMode === 'lastEdited') {
		const daysSinceEdit = getDaysSinceEdit(feature.properties?.timestamp);

		markerColour = getColourByAge(daysSinceEdit);
	}

	return createDotMarker(latlng, markerColour, pane);
}

/* Polygon styling based on age + filter state */
export function stylePolygon(feature, displayMode, colour) {
	const match = feature._matchesFilters !== false;

	let polygonColour = colour ?? defaultBlue;

	/* Display features by age */
	if (displayMode === 'lastEdited') {
		const daysSinceEdit = getDaysSinceEdit(feature.properties?.timestamp);

		polygonColour = getColourByAge(daysSinceEdit);
	}

	/* Filtered styling */
	if (!match) {
		return {
			color: polygonColour,
			opacity: 0.1,
			weight: 2,
			fillOpacity: 0.15,
			interactive: false,
		};
	}

	return {
		color: polygonColour,
		opacity: 1,
		weight: 3,
		fillOpacity: 0.2,
	};
}
