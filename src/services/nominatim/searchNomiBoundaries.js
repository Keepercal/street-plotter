import { reportError } from '@/utils/errorReporting';

/**
 * Searches Nominatim for OpenStreetMap boundaries matching a name.
 *
 * @param {string} boundaryName - The name or query used to search for boundaries.
 * @returns {Promise<Array>} Matching non-node Nominatim results.
 * @throws {Error} If the Nominatim request fails.
 */
export default async function searchNomiBoundaries(boundaryName) {
	const url =
		`https://nominatim.openstreetmap.org/search?` +
		new URLSearchParams({
			q: boundaryName,
			format: 'jsonv2',
			limit: 10,
			polygon_geojson: 1,
		});

	const result = await fetch(url, {
		headers: {
			Accept: 'application/json',
			Referer: window.location.origin,
		},
	});

	if (!result.ok) {
		reportError(result.status);
		throw new Error(`Nominatim HTTP error: ${result.status}`);
	}

	const data = await result.json();

	return data.filter((item) => item.osm_type !== 'node');
}
