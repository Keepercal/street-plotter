import { useEffect, useMemo } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.heat';

import getFeatureCords from '../utils/getFeatureCoords.js';

/**
 * HeatmapLayer
 * ------------
 * Renders OSM geojson features as a heatmap.
 */
export default function HeatmapLayer({ featureLayers }) {
	const map = useMap();

	/* Build heatmap points */
	const points = useMemo(() => {
		const heatPoints = [];

		Object.values(featureLayers ?? {}).forEach((layer) => {
			if (!layer.visible) return;

			layer.geojson?.features?.forEach((feature) => {
				// Respect filters
				if (feature._matchesFilters === false) return;

				const { lat, lon } = getFeatureCords(feature);

				if (Number.isFinite(lat) && Number.isFinite(lon)) {
					heatPoints.push([lat, lon]);
				}
			});
		});

		return heatPoints;
	}, [featureLayers]);

	useEffect(() => {
		const heatLayer = L.heatLayer(points, {
			radius: 25,
			blur: 20,
			maxZoom: 18,
			minOpacity: 0.3,
		});

		heatLayer.addTo(map);

		return () => {
			map.removeLayer(heatLayer);
		};
	}, [map, points]);

	return null;
}
