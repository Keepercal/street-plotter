import { useMemo } from 'react';

/**
 * useFilterData
 * -------------
 * Extracts and prepares metadata from GeoJSON features for use in the filter UI.
 *
 * Responsibilities:
 * - Collect all unique property keys (tags) from features
 * - Map each tag to its unique set of values
 * - Derive available (unused) tags based on active filters
 * - Provide a helper for retrieving sorted values per tag
 *
 * This hook memoises results to avoid recomputation unless `features` or `filters` change.
 */
const OSM_METADATA_KEYS = new Set([
	'id',
	'relations',
	'tainted',
	'timestamp',
	'version',
	'changeset',
	'uid',
]);

export default function useFilterData(features) {
	return useMemo(() => {
		// Unique set of all property keys across all features
		const tagSet = new Set();

		// Maps each property key → Set of unique values
		const tagValueMap = {};

		// Extract metadata from GeoJSON features
		features?.features?.forEach((feature) => {
			const properties = feature?.properties || {};

			Object.entries(properties).forEach(([key, value]) => {
				if (OSM_METADATA_KEYS.has(key)) return;
				tagSet.add(key);

				if (!tagValueMap[key]) {
					tagValueMap[key] = new Set();
				}

				if (value !== null && value !== undefined) {
					tagValueMap[key].add(value);
				}
			});
		});

		// Available (unused) tags sorted alphabetically
		const tags = [...tagSet].sort();

		// Helper: return sorted list of values for a given tag
		const getValues = (key) =>
			tagValueMap[key] ? [...tagValueMap[key]].sort() : [];

		return {
			tags,
			tagValueMap,
			getValues,
		};
	}, [features]);
}
