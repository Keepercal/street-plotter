export default function buildExportGeoJSON({
	featureLayers,
	layerScope,
	featureScope,
	selectedLayers,
}) {
	let layers = Object.entries(featureLayers);

	// Layer filtering
	if (layerScope === 'visible') {
		layers = layers.filter(([, layer]) => layer.visible);
	}

	if (layerScope === 'selected') {
		layers = layers.filter(([id]) => selectedLayers.includes(id));
	}

	// Feature filtering
	const features = layers.flatMap(([layerId, layer]) => {
		let layerFeatures = layer.geojson?.features ?? [];

		if (featureScope === 'filtered') {
			layerFeatures = layerFeatures.filter(
				(feature) => feature._matchesFilters
			);
		}

		return layerFeatures.map((feature) => ({
			...feature,

			properties: {
				...feature.properties,
				_layer: layerId,
			},
		}));
	});

	return {
		type: 'FeatureCollection',
		features,
	};
}
