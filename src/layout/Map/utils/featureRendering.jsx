import L from 'leaflet';

import getDaysSinceEdit from './getDaysSinceEdit';

const defaultBlue = '#3388ff';

const green = '#5ba328';
const yellow = '#e7bb2d';
const red = '#dd351b';

/* Choose dot colour based on feature age */
function getColourByAge(days) {
	if (days == null) {
		return red;
	}

	if (days <= 183) {
		// Less than 6 months
		return green;
	}

	if (days <= 365) {
		// Less than 1 year
		return yellow;
	}

	return red; // greater than 1 year
}

/* Create point marker */
function createDotMarker(latlng, colour) {
	return L.circleMarker(latlng, {
		radius: 5,

		color: '#ffffff',
		weight: 1,

		fillColor: colour ?? defaultBlue,
		fillOpacity: 0.9,

		opacity: 1,
	});
}

/* Create marker for point features */
export function createFeatureMarker(
	feature,
	latlng,
	displayMode,
	colour
	//overview = false
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

	return createDotMarker(latlng, markerColour);
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
