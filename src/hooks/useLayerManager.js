import { useState, useRef } from 'react';
import useCache from './useCache';
import osmtogeojson from 'osmtogeojson';

import { createLayer, applyLayerChanges } from '@/models/layer';

import { fetchOSMFeature } from '../services/overpass/overpass';
import generateLayerColour from './utils/generateLayerColour';
import { generateLayerLabel } from './utils/generateLayerLabel';
import countFeatures from '../utils/countFeatures';

import MODALS from '@/config/modalTypes.js';

const LARGE_DATASET_LIMIT = 5000;

/**
 * useLayerManager
 * ------------
 * Manages loading and display of layers within the application
 *
 * Includes:
 * - Load previously loaded layer from cache
 */
export default function useLayerManager({
	onChange = () => {},
	boundaries = [],
	setPendingLayer,
	setActiveModal,
}) {
	const [featureLayers, setFeatureLayers] = useState({});

	/* Status popup handling */
	const [status, setStatus] = useState('idle');
	const [error, setError] = useState(null);

	/* Cacheing */
	const requestId = useRef(0);

	/* Flags */
	const [failedFeatureKey, setFailedFeatureKey] = useState(null); // cleanup

	const selectedBoundaryIds = new Set(
		Array.from(boundaries, (boundary) => boundary.osm_id)
	);

	function markDirty() {
		onChange?.();
	}

	const {
		//get: getCachedLayer,
		set: cacheLayer,
		entries: getCacheEntries,
		clear: clearCache,
	} = useCache();

	/* Fetches the requested layer from Overpass and prepares it as an object */
	async function prepareLayer({
		layerId,
		cacheKey,
		boundaryIds,
		osmTagKey,
		osmTagValue,
		osmFeatureLabel,
	}) {
		// Fetch OSM feature from Overpass API
		const payload = await fetchOSMFeature(
			boundaryIds,
			osmTagKey,
			osmTagValue
		);

		// Convert the payload into a GeoJSON format
		const geojson = osmtogeojson(payload, {
			meta: true,
		});

		// Count the number of features within the the payload
		const { totalCount } = countFeatures({
			temp: {
				data: payload,
			},
		});

		return {
			layerId, // layer UUID
			cacheKey,
			osmTagValue,
			osmFeatureLabel,
			payload,
			geojson,
			colour: generateLayerColour(osmTagValue), // assign colour
			query: {
				boundaryIds,
				osmTagKey,
				osmTagValue,
				osmFeatureLabel,
			},
			totalCount,
		};
	}

	/* Orchestrate loading a new map layer */
	const loadLayer = async ({
		boundaryIds,
		osmTagKey,
		osmTagValue,
		osmFeatureLabel,
	}) => {
		if (!boundaryIds || !osmTagKey || !osmTagValue) {
			throw new Error('Missing required feature parameters');
		}

		const layerId = crypto.randomUUID(); // Generate unique ID for layer

		const currentId = ++requestId.current;

		if (osmTagValue === null) {
			setStatus('idle');
			return;
		}

		// Create a cache key for the layer
		const cacheKey = JSON.stringify([
			boundaryIds,
			osmTagKey,
			osmTagValue,
			osmFeatureLabel,
		]);

		//const cached = getCachedLayer(cacheKey);

		// Check layer to see if copy stored in cache
		/*if (cached) {
			loadCachedLayer(cached, layerId, osmFeatureLabel);
			return;
		}*/

		setFeatureLayers((prev) => {
			const next = { ...prev };
			delete next[osmTagValue];
			return next;
		});

		setError(null);
		setFailedFeatureKey(null);
		setStatus('loading');

		try {
			const preparedLayer = await prepareLayer({
				layerId,
				cacheKey,
				boundaryIds,
				osmTagKey,
				osmTagValue,
				osmFeatureLabel,
			});

			if (currentId !== requestId.current) return;

			setStatus('idle');

			return preparedLayer;
		} catch (error) {
			if (currentId !== requestId.current) return;

			setFailedFeatureKey(osmTagValue);

			if (error?.notificationType === 'alert') {
				setError(error);
				setStatus('alert');
			} else {
				setError(error);
				setStatus('error');
			}
		}
	};

	/* Load a layer from the cache */
	/*function loadCachedLayer(cached, layerId, osmFeatureLabel) {
		// Check cache for stored features
		if (!cached) return false;

		// Load features from cache
		setFeatureLayers((prev) => {
			const label = generateLayerLabel(
				prev,
				cached.osmTagValue,
				osmFeatureLabel
			);

			return {
				...prev,
				[layerId]: createLayer({
					...cached,
					label,
					filters: [],
				}),
			};
		});

		setStatus('success');
	}*/

	/* Take prepared layer, store in cache, update state */
	function commitLayer(preparedLayer) {
		const {
			layerId,
			cacheKey,
			osmTagValue,
			osmFeatureLabel,
			payload,
			geojson,
			colour,
			query,
		} = preparedLayer;

		cacheLayer(cacheKey, {
			osmTagValue,
			data: payload,
			geojson,
			colour,
			query,
		});

		setFeatureLayers((prev) => {
			const label = generateLayerLabel(
				prev,
				osmTagValue,
				osmFeatureLabel
			);

			return {
				// Create a new object for the feature
				...prev,
				[layerId]: createLayer({
					osmTagValue,
					label,
					data: payload,
					geojson,
					colour,
				}),
			};
		});

		setStatus('success');
		markDirty();
	}

	/**
	 * Handle adding feature to project
	 */
	const handleAddLayer = async (osmTagKey, osmTagValue, osmFeatureLabel) => {
		const preparedLayer = await loadLayer({
			boundaryIds: selectedBoundaryIds,
			osmTagKey,
			osmTagValue,
			osmFeatureLabel,
		});

		if (!preparedLayer) return;

		if (preparedLayer.totalCount > LARGE_DATASET_LIMIT) {
			setPendingLayer(preparedLayer);
			setActiveModal(MODALS.LARGE_DATASET);
			return;
		}

		commitLayer(preparedLayer);
	};

	/* Export layer as an object */
	const exportLayers = () => {
		return Object.entries(featureLayers).map(([id, layer]) => ({
			id,
			...layer,
		}));
	};

	const restoreLayers = (layers) => {
		if (!layers) {
			setFeatureLayers({});
			return;
		}

		const restored = {};

		layers.forEach((layer) => {
			restored[layer.id] = createLayer({
				...layer,
				filters: layer.filters ?? [],
			});
		});

		setFeatureLayers(restored);

		setStatus('success');
		setError(null);
	};

	/* Update layer and mark as changed */
	function updateLayer(layerId, changes) {
		setFeatureLayers((prev) => ({
			...prev,
			[layerId]: applyLayerChanges(prev[layerId], changes),
		}));

		markDirty();
	}

	/* Remove a single layer */
	const removeLayer = (layerId) => {
		setFeatureLayers((prev) => {
			const next = { ...prev };

			delete next[layerId];

			return next;
		});

		setError(null);
		setStatus('idle');
		markDirty();
	};

	/* Clear all layers from map */
	const clearLayers = ({ markDirty = true } = {}) => {
		setFeatureLayers({});

		if (markDirty) {
			onChange?.();
		}

		setError(null);
		setStatus('idle');
	};

	/**
	 * Handle renaming features
	 */
	const renameLayer = (layerId, newLabel) => {
		updateLayer(layerId, {
			displayName: newLabel,
		});
	};

	/* Show or hide layer on the map */
	const toggleLayerVisibility = (layerId) => {
		setFeatureLayers((prev) => {
			const layer = prev[layerId];

			if (!layer) return prev;

			return {
				...prev,
				[layerId]: {
					...layer,
					visible: !layer.visible,
				},
			};
		});

		markDirty();
	};

	/* Update layer filter */
	const updateLayerFilters = (layerId, filters) => {
		updateLayer(layerId, { filters });
	};

	/* Array indicating what features are in the cache */
	// Used in the UI to indicate cached features
	const getCachedFeatures = (boundaryIds) => {
		return getCacheEntries()
			.filter(([cacheKey]) => {
				const [cachedBoundary] = JSON.parse(cacheKey);

				return cachedBoundary === boundaryIds;
			})
			.map(([, layer]) => layer.osmTagValue);
	};

	const clearStatus = () => {
		setStatus('idle');
		setError(null);
		setFailedFeatureKey(null);
	};

	return {
		// state
		featureLayers,

		// data operations
		updateLayer,
		removeLayer,
		clearLayers,
		updateLayerFilters,
		commitLayer,

		handleAddLayer,

		// layer editing
		toggleLayerVisibility,
		renameLayer,

		// persistence
		exportLayers,
		restoreLayers,

		// cache
		getCachedFeatures,
		clearCache,

		// status
		failedFeatureKey,
		clearStatus,
		status,
		error,
	};
}
