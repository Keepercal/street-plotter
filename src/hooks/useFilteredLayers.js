import { useMemo } from 'react';
import evaluateFeature from '@/utils/evaluateFeature';

/**
 * Applies each layer's filters to its GeoJSON features.
 *
 * Adds a `_matchesFilters` flag to each feature indicating
 * whether it matches the layer's configured filters.
 *
 * The transformed layers are memoised and recalculated when
 * `featureLayers` changes.
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
