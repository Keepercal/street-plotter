import reportError from '@/utils/errorReporting';

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
