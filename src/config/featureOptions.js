import { OSM_FEATURE_MAP } from './osmFeatureMap';

/**
 * Takes a nested object `OSM_FEATURE_MAP` and turns it into a single flat array of feature objects.
 * */
export const FEATURE_OPTIONS = Object.entries(OSM_FEATURE_MAP).flatMap(
	([category, features]) =>
		Object.entries(features).map(([featureKey, feature]) => ({
			featureKey,
			category,
			osmKey: feature.osmKey,
			osmValue: feature.osmValue,
			label: feature.label,
		}))
);
