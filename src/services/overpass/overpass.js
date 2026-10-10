import { reportError } from '@/utils/errorReporting';

const OVERPASS_URL = import.meta.env.VITE_OVERPASS_URL;

/**
 * Executes a raw Overpass API query and returns the HTTP response.
 *
 * Handles only transport-level concerns (fetch + status logging).
 */
async function callOverpass(query) {
	const url = `${OVERPASS_URL}?data=${encodeURIComponent(query)}`;

	try {
		return await fetch(url);
	} catch (error) {
		// report error to Sentury if issue with Overpass API
		reportError(error, {
			tags: { feature: 'overpass-api', errorType: 'network' },
			extra: { url, query },
		});
		throw error;
	}
}

/**
 * Centralised response handler for Overpass API calls.
 *
 * - Handles retries for 504 gateway timeouts
 * - Throws consistent errors for HTTP failures
 * - Validates payload shape
 */
async function handleOverpassResponse(result, retryFn, retries, context = {}) {
	if (result.status === 504) {
		if (retries <= 0) {
			const err = new Error('Overpass timed out after multiple retries');
			throw err;
		}
		await new Promise((resolve) => setTimeout(resolve, 1000));
		return retryFn();
	}

	if (!result.ok) {
		if (result.status === 429) {
			const err = new Error(
				//`HTTP ${result.status}: Too Many Requests - wait before retrying`
				'Too many requests to Overpass API, please wait before retrying'
			);
			throw err;
		}
		const err = new Error(`HTTP ${result.status} (${result.statusText})`);
		reportError(err, {
			tags: { feature: 'overpass-api', errorType: 'http' },
			extra: { status: result.status, ...context },
		});
		throw err;
	}

	const data = await result.json();

	if (!data?.elements?.length) {
		const err = Object.assign(
			new Error('Overpass returned an empty result'),
			{
				notificationType: 'alert',
			}
		);
		throw err;
	}

	return data;
}

/**
 * Fetches an OpenStreetMap boundary relation from Overpass by ID.
 *
 * @param {string|number} boundaryIDs - One or more OSM relation IDs.
 * @param {number} retries - Number of retries remaining after a failed request.
 * @returns {Promise<*>} The Overpass response, or null when no boundary ID is provided.
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
 * Fetches an OSM feature inside one or multiple boundaries using a given tag's `Key` and `Value`
 *
 * @param {string|number} boundaryIDs - One or more OSM relation IDs
 * @param {string} osmTagKey - A given OSM feature TagKey e.g. `amenity`
 * @param {string} osmTagValue - A given OSM feature TagValue e.g. `bicycle_parking`
 * @param {number} retries - Number of retries remaining after a failed request
 * @returns {Promise<*>} The Overpass response, or null when no boundary ID is provided
 */
export async function fetchOSMFeature(
	boundaryIDs,
	osmTagKey,
	osmTagValue,
	retries = 3
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

		nwr(area.area)["${osmTagKey}"="${osmTagValue}"]->.features;

		(
			.features;
			node(r.features);
		);

		out tags geom meta;
	`;

	const result = await callOverpass(query);

	console.log(result);

	return handleOverpassResponse(
		result,
		() => fetchOSMFeature(boundaryIDs, osmTagKey, osmTagValue, retries - 1),
		retries,
		{ boundaryIDs, osmTagKey, osmTagValue } // pass context through for Sentry
	);
}
