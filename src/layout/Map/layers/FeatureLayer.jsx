// Creates a new feature point to be placed on the map
// Feature position is derived from Overpass feature's metadata

import { GeoJSON, useMap } from 'react-leaflet';
import React from 'react';

import bindFeaturePopup from '../utils/bindFeaturePopup.jsx';
import { createFeatureMarker, stylePolygon } from '../utils/featureRendering';

import createOverviewFeatures from '../utils/createOverviewFeatures.js';
import evaluateFeature from '@/utils/evaluateFeature';

// Fields not displayed in the popup
const EXCLUDE_KEYS = new Set([
	'type',
	'id',
	'timestamp',
	'version',
	'changeset',
	'user',
	'uid',
]);

const BASE_Z_INDEX = 400;

/**
 * Forces Leaflet to refresh polygon styles
 */
function StyledGeoJSON({ data, styleFunction, ...props }) {
	const geoJsonRef = React.useRef();

	React.useEffect(() => {
		if (!geoJsonRef.current) return;

		geoJsonRef.current.eachLayer((layer) => {
			if (layer.feature) {
				layer.setStyle(styleFunction(layer.feature));
			}
		});
	}, [data, styleFunction]);

	return (
		<GeoJSON
			ref={geoJsonRef}
			data={data}
			style={styleFunction}
			{...props}
		/>
	);
}

/**
 * Ensures a named pane exists and keeps its z-index in sync.
 * Children render inside it via the `pane` prop.
 */
function LayerPane({ name, zIndex, children }) {
	const map = useMap();

	const pane = map.getPane(name) ?? map.createPane(name);
	pane.style.zIndex = zIndex;

	return children;
}

/**
 * FeatureLayer
 * ------------
 * Renders OSM geojson features on the map, as polygons or points.
 *
 * - Converts small polygons to points when zoomed out
 * - Rerenders and unrenders when filters change, or layer is hidden
 * - Binds popup content
 */
export default function FeatureLayer({ featureLayers, zoom, displayMode }) {
	if (!featureLayers || Object.keys(featureLayers).length === 0) {
		return null;
	}

	return (
		<>
			{Object.entries(featureLayers)
				.map(([featureKey, layer], index) => [featureKey, layer, index])
				.filter(([, layer]) => layer.visible)
				.map(([featureKey, layer, index]) => {
					const features = layer.geojson;

					if (!features?.features) return null;

					// Evaluate every feature against the current filters
					const matchingFeatures = features.features.filter(
						(feature) =>
							evaluateFeature(feature, layer.filters ?? [])
					);

					const filteredGeojson = {
						...features,
						features: matchingFeatures,
					};

					// Create overview dots from matching small polygon features
					const overviewFeatures = createOverviewFeatures(
						filteredGeojson,
						zoom
					);

					// Used to rebuild layers when filters change
					const filterKey = JSON.stringify(layer.filters ?? []);

					const handleEachFeature = (feature, layer) => {
						bindFeaturePopup(feature, layer, EXCLUDE_KEYS);
					};

					const paneName = `layer-${featureKey}`;

					return (
						<LayerPane
							key={`${featureKey}-${filterKey}-${zoom < 15}`}
							name={paneName}
							zIndex={BASE_Z_INDEX + index}
						>
							<React.Fragment
								key={`${featureKey}-${filterKey}-${zoom < 15}`}
							>
								{/* Main features */}
								<StyledGeoJSON
									data={filteredGeojson}
									key={`${featureKey}-${filterKey}-${displayMode}-${layer.colour}`}
									styleFunction={(feature) =>
										stylePolygon(
											feature,
											displayMode,
											layer.colour
										)
									}
									pointToLayer={(feature, latlng) =>
										createFeatureMarker(
											feature,
											latlng,
											displayMode,
											layer.colour,
											false,
											paneName
										)
									}
									onEachFeature={handleEachFeature}
								/>

								{/* Overview dots */}
								{zoom < 15 && (
									<GeoJSON
										data={overviewFeatures}
										key={`${featureKey}-overview-${filterKey}-${displayMode}-${layer.colour}`}
										pointToLayer={(feature, latlng) =>
											createFeatureMarker(
												feature,
												latlng,
												displayMode,
												layer.colour,
												true,
												paneName
											)
										}
										onEachFeature={handleEachFeature}
									/>
								)}
							</React.Fragment>
						</LayerPane>
					);
				})}
		</>
	);
}
