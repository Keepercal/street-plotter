import { useMemo } from 'react';
import evaluateFeature from '@/utils/evaluateFeature';

/**
 * useFilteredLayers
 * ------------
 * Applies each layer's filters to its GeoJSON features.
 *
 * For each feature, evaluates the configured filters and adds
 * a _matchesFilters flag indicating whether the feature matches.
 *
 * The transformed layers are memoized and recalculated when
 * featureLayers changes.
 */
export default function useFilteredLayers(featureLayers) {
	return useMemo(() => {
		const result = {};

		Object.entries(featureLayers).forEach(([key, layer]) => {
			if (!layer.geojson?.features) return;

			const filters = layer.filters ?? [];

			result[key] = {
				...layer,
				geojson: {
					...layer.geojson,
					features: layer.geojson.features.map((feature) => ({
						...feature,
						_matchesFilters: evaluateFeature(feature, filters),
					})),
				},
			};
		});

		return result;
	}, [featureLayers]);
}
