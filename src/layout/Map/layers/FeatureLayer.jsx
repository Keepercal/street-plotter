import FeatureLayerItem from './FeatureLayerItem';

const BASE_Z_INDEX = 400;

/**
 * Renders multiple visible feature layers on the Leaflet map.
 *
 * - Iterates over workspace feature layers
 * - Skips hidden layers
 * - Assigns stacking order to each layer
 */
export default function FeatureLayer({ featureLayers, zoom, displayMode }) {
	if (!featureLayers) return null;

	const entries = Object.entries(featureLayers);

	return (
		<>
			{entries.map(([featureKey, layer], index) => {
				if (!layer.visible) return null;

				return (
					<FeatureLayerItem
						key={featureKey}
						featureKey={featureKey}
						layer={layer}
						zoom={zoom}
						displayMode={displayMode}
						zIndex={BASE_Z_INDEX + index}
					/>
				);
			})}
		</>
	);
}
