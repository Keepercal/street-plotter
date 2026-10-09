import { GeoJSON, useMap } from 'react-leaflet';
import React from 'react';

import bindFeaturePopup from '../utils/bindFeaturePopup.jsx';
import { createFeatureMarker, stylePolygon } from '../utils/featureRendering';
import createOverviewFeatures from '../utils/createOverviewFeatures.js';
import evaluateFeature from '@/utils/evaluateFeature';

const EXCLUDE_KEYS = new Set([
	'type',
	'id',
	'timestamp',
	'version',
	'changeset',
	'user',
	'uid',
]);

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

function LayerPane({ name, zIndex, children }) {
	const map = useMap();

	React.useLayoutEffect(() => {
		const pane = map.getPane(name) ?? map.createPane(name);
		pane.style.zIndex = String(zIndex);
	}, [map, name, zIndex]);

	return children;
}

/**
 * Renders a given OSM geojson as a Leaflet map layer, as polygons or points.
 *
 * - Converts small polygons to points when zoomed out
 * - Rerenders and unrenders when filters change, or layer is hidden
 * - Binds popup content
 */
export default function FeatureLayer({
	featureKey,
	layer,
	zoom,
	displayMode,
	zIndex,
}) {
	const features = layer.geojson;

	if (!features?.features) return null;

	// Evaluate every feature against the current filters
	const matchingFeatures = features.features.filter((feature) =>
		evaluateFeature(feature, layer.filters ?? [])
	);

	const filteredGeojson = {
		...features,
		features: matchingFeatures,
	};

	// Create overview dots from matching small polygon features
	const overviewFeatures = createOverviewFeatures(filteredGeojson, zoom);

	// Used to rebuild layers when filters change
	const filterKey = JSON.stringify(layer.filters ?? []);

	const handleEachFeature = (feature, layer) => {
		bindFeaturePopup(feature, layer, EXCLUDE_KEYS);
	};

	const paneName = `layer-${featureKey}`;
	return (
		<LayerPane name={paneName} zIndex={zIndex}>
			<React.Fragment key={`${featureKey}-${filterKey}-${zoom < 15}`}>
				{/* Main features */}
				<StyledGeoJSON
					pane={paneName}
					data={filteredGeojson}
					key={`${featureKey}-${filterKey}-${displayMode}-${layer.colour}`}
					styleFunction={(feature) =>
						stylePolygon(feature, displayMode, layer.colour)
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
						pane={paneName}
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
}
