import { reportError } from '@/utils/errorReporting';

const OVERPASS_URL = 'https://overpass-api.de/api/interpreter';

/**
 * callOverpass
 * ------------
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
 * handleOverpassResponse
 * ----------------------
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
				`HTTP ${result.status}: Too Many Requests - wait before retrying`
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

	console.log(query);

	const result = await callOverpass(query);

	console.log(result);

	return handleOverpassResponse(
		result,
		() => fetchOSMFeature(boundaryIDs, osmTagKey, osmTagValue, retries - 1),
		retries,
		{ boundaryIDs, osmTagKey, osmTagValue } // pass context through for Sentry
	);
}
