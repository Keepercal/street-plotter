import { createRoot } from 'react-dom/client';
import FeaturePopup from '../components/FeaturePopup/FeaturePopup';

/**
 * bindFeaturePopup
 * -----------------
 * Creates and attaches a Leaflet popup for an OSM feature, using a custom popup component.
 */
export default function bindFeaturePopup(feature, layer, exclude) {
	const container = document.createElement('div');
	const root = createRoot(container);

	root.render(<FeaturePopup feature={feature} exclude={exclude} />);

	layer.bindPopup(container, {
		//maxHeight: 400,
	});
}
