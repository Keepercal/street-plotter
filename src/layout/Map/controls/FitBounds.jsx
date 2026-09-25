import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

/**
 * FitBounds
 * ---------
 * Automatically adjusts the map view to fit a GeoJSON boundary.
 *
 * Triggers whenever `boundary` changes.
 */
export default function FitBounds({ boundaries, trigger }) {
	const map = useMap();

	useEffect(() => {
		if (!boundaries) return;

		// Create bounds directly from GeoJSON without rendering a layer
		const bounds = L.geoJSON(boundaries).getBounds();

		if (bounds.isValid()) {
			map.fitBounds(bounds, {
				padding: [20, 20],
				maxZoom: 14,
				animate: true,
				duration: 0.6,
			});
		}
	}, [boundaries, trigger, map]);

	return null;
}
