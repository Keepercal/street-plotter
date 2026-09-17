const OVERPASS_URL = 'https://overpass-api.de/api/interpreter';

/**
 * callOverpass
 * ------------
 * Executes a raw Overpass API query and returns the HTTP response.
 *
 * Handles only transport-level concerns (fetch + status logging).
 */
async function callOverpass(query) {
	try {
		const url = `${OVERPASS_URL}?data=${encodeURIComponent(query)}`;

		const result = await fetch(url);

		return result;
	} catch (error) {
		console.error('Overpass API call failed with error:', error);
		return error;
	}
}

/**
 * handleOverpassResponse
 * ----------------------
 * Centralised response handler for Overpass API calls.
 *
 * - Handles retries for 504 gateway timeouts
 * - Throws consistent errors for HTTP failures
 * - Validates payload shape
 */
async function handleOverpassResponse(result, retryFn, retries) {
	if (result.status === 504) {
		if (retries <= 0) {
			throw new Error('Overpass timed out after multiple retries');
		}

		await new Promise((resolve) => setTimeout(resolve, 1000));

		return retryFn();
	}

	if (!result.ok) {
		if (result.status === 429) {
			throw new Error(
				`HTTP ${result.status}: Too Many Requests - wait before retrying`
			);
		}

		throw new Error(`HTTP ${result.status} (${result.statusText})`);
	}

	const data = await result.json();

	if (!data?.elements?.length) {
		throw Object.assign(new Error('Overpass returned an empty result'), {
			notificationType: 'alert',
		});
	}

	return data;
}

/**
 * fetchOSMBoundary
 * -------------
 * Fetches a boundary relation from Overpass by name.
 */
export async function fetchOSMBoundary(boundaryIDs, boundaryType, retries = 3) {
	if (!boundaryIDs || boundaryIDs === 'none') return null;

	let query;

	query = `
        [out:json][timeout:60];
        relation(${boundaryIDs});
        out geom meta;
    `;

	const result = await callOverpass(query);

	return handleOverpassResponse(
		result,
		() => fetchOSMBoundary(boundaryIDs, boundaryType, retries - 1),
		retries
	);
}

/**
 * fetchOSMFeature
 * ---------------
 * Fetches OSM features inside a boundary area using tag filters.
 */
export async function fetchOSMFeature(
	boundaryIDs,
	featureTag,
	featureValue,
	featureType
) {
	if (!boundaryIDs || boundaryIDs === 'none') return null;

	const relations = [...boundaryIDs]
		.map((id) => `  relation(${id});`)
		.join('\n');

	const query = `
		[out:json][timeout:60];

		(
	${relations}
		);

		map_to_area -> .area;

		nwr(area.area)["${featureTag}"="${featureValue}"]->.features;

		(
			.features;
			node(r.features);
		);

		out tags geom meta;
	`;

	const result = await callOverpass(query);

	console.log(result);

	return handleOverpassResponse(result, () =>
		fetchOSMFeature(boundaryIDs, featureTag, featureValue, featureType)
	);
}
