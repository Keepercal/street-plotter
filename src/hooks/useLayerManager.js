import { useState, useRef, useCallback } from 'react';
import osmtogeojson from 'osmtogeojson';

import { fetchOSMFeature } from '../services/overpass/overpass';
import generateLayerColour from '../utils/generateLayerColour';
import countFeatures from '../utils/countFeatures';

import MODALS from '@/config/modalTypes.js';

const LARGE_DATASET_LIMIT = 5000;

/**
 * useLayerManager
 * ------------
 * Manages loading and display of layers within the application
 *
 * Includes:
 * - request deduplication via cache
 * - request cancellation
 * - GeoJSON conversion
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
	const cache = useRef(new Map());

	/* Flags */
	const [failedFeatureKey, setFailedFeatureKey] = useState(null); // cleanup

	const selectedBoundaryIds = new Set(
		Array.from(boundaries, (boundary) => boundary.osm_id)
	);

	function markDirty() {
		onChange?.();
	}

	/* Takes an object of layer properties and returns a new object */
	const buildLayer = useCallback(
		({
			sourceKey,
			label,
			data,
			geojson,
			colour,
			visible = true,
			filters = [],
		}) => ({
			sourceKey,
			label,
			data,
			geojson,
			colour,
			visible,
			filters,
		}),
		[]
	);

	/* Update layer and mark as changed */
	function patchLayer(layerID, changes) {
		setFeatureLayers((prev) => ({
			...prev,
			[layerID]: {
				...prev[layerID],
				...changes,
			},
		}));

		markDirty();
	}

	/* Remove a single layer */
	const removeLayer = (layerID) => {
		console.log('[DEBUG] removing feature:', { layerID });
		setFeatureLayers((prev) => {
			const next = { ...prev };

			delete next[layerID];

			return next;
		});

		setError(null);
		setStatus('idle');
		markDirty();
	};

	/* Remove all layers from map */
	const clearLayers = ({ markDirty = true } = {}) => {
		console.log('[DEBUG] clearing all map features');

		setFeatureLayers({});

		if (markDirty) {
			onChange?.();
		}

		setError(null);
		setStatus('idle');
	};

	/* Show or hide layer on the map */
	const toggleLayerVisibility = (layerID) => {
		setFeatureLayers((prev) => {
			const layer = prev[layerID];

			if (!layer) return prev;

			return {
				...prev,
				[layerID]: {
					...layer,
					visible: !layer.visible,
				},
			};
		});

		markDirty();
	};

	/* Create label for each layer with an indicator for if it's a duplicate */
	const generateLayerLabel = (layers, featureKey, featureLabel) => {
		let count = 0;

		for (const id in layers) {
			if (layers[id].sourceKey === featureKey) {
				count++;
			}
		}

		return count === 0 ? featureLabel : `${featureLabel} (${count + 1})`;
	};

	/* Update layer filter */
	const updateLayerFilters = (layerID, filters) => {
		patchLayer(layerID, { filters });
	};

	/* Cache a given layer */
	function cacheLayer(cacheKey, layer) {
		cache.current.set(cacheKey, layer);
	}

	/* Array indicating what features are in the cache */
	// Used in the UI to indicate cached features
	const getCachedFeatures = (boundaryIds) => {
		return Array.from(cache.current.entries())
			.filter(([cacheKey]) => {
				const [cachedBoundary] = JSON.parse(cacheKey);

				return cachedBoundary === boundaryIds;
			})
			.map(([layer]) => layer.sourceKey);
	};

	/* Load a layer from the cache */
	function loadCachedLayer(cacheKey, layerID, featureLabel) {
		// Check cache for stored features
		const cached = cache.current.get(cacheKey);

		if (!cached) return false;

		// Load features from cache
		setFeatureLayers((prev) => {
			const label = generateLayerLabel(
				prev,
				cached.sourceKey,
				featureLabel
			);

			return {
				...prev,
				[layerID]: buildLayer({
					...cached,
					label,
					filters: [],
				}),
			};
		});

		setStatus('success');
	}

	/* Clear cache */
	// Used when loading a new boundary, data isn't left over in the cache
	const clearCache = () => {
		cache.current.clear();
	};

	/* Fetches the requested layer from Overpass and prepares it as an object */
	async function prepareLayer({
		layerID,
		cacheKey,
		featureKey,
		boundaryIds,
		featureTag,
		featureValue,
		featureType,
		featureLabel,
	}) {
		// Fetch OSM feature from Overpass API
		const payload = await fetchOSMFeature(
			boundaryIds,
			featureTag,
			featureValue,
			featureType
		);

		// Convert the payload into a GeoJSON format
		const geojson = osmtogeojson(payload, {
			meta: true,
		}); // Convert to geoJSON

		const colour = generateLayerColour(featureKey); // Assign colour

		// Count the number of features within the the payload
		const { totalCount } = countFeatures({
			temp: {
				data: payload,
			},
		});

		return {
			layerID,
			cacheKey,
			sourceKey: featureKey,
			featureLabel,
			payload,
			geojson,
			colour,
			query: {
				boundaryIds,
				featureTag,
				featureValue,
				featureType,
				featureLabel,
			},
			totalCount,
		};
	}

	/* Take prepared layer, store in cache, update state */
	function commitLayer(preparedLayer) {
		const {
			layerID,
			cacheKey,
			sourceKey,
			featureLabel,
			payload,
			geojson,
			colour,
			query,
		} = preparedLayer;

		cacheLayer(cacheKey, {
			sourceKey,
			data: payload,
			geojson,
			colour,
			query,
		});

		setFeatureLayers((prev) => {
			const label = generateLayerLabel(prev, sourceKey, featureLabel);

			return {
				// Create a new object for the feature
				...prev,
				[layerID]: buildLayer({
					sourceKey,
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

	/* Orchestrate loading a new map layer */
	const loadLayer = async ({
		featureKey,
		boundaryIds,
		featureTag,
		featureValue,
		featureType,
		featureLabel,
	}) => {
		console.log('[DEBUG] loadLayer ENTER:', {
			featureKey,
			boundaryIds,
			featureTag,
			featureValue,
			featureType,
			featureLabel,
		});

		if (!featureKey || !boundaryIds || !featureTag) {
			throw new Error('Missing required feature parameters');
		}

		const layerID = crypto.randomUUID(); // Generate unique ID for layer

		const currentId = ++requestId.current;

		if (featureValue === null) {
			setStatus('idle');
			return;
		}

		// Create a cache key for the layer
		const cacheKey = JSON.stringify([
			boundaryIds,
			featureTag,
			featureValue,
			featureType,
			featureLabel,
		]);

		// Check layer to see if copy stored in cache
		if (cache.current.has(cacheKey)) {
			loadCachedLayer(cacheKey, layerID, featureLabel);
			return;
		}

		setFeatureLayers((prev) => {
			const next = { ...prev };
			delete next[featureKey];
			return next;
		});

		setError(null);
		setFailedFeatureKey(null);
		setStatus('loading');

		try {
			const preparedLayer = await prepareLayer({
				layerID,
				cacheKey,
				featureKey,
				boundaryIds,
				featureTag,
				featureValue,
				featureType,
				featureLabel,
			});

			if (currentId !== requestId.current) return;

			setStatus('idle');

			return preparedLayer;
		} catch (err) {
			if (currentId !== requestId.current) return;

			setFailedFeatureKey(featureKey);

			if (err?.notificationType === 'alert') {
				setError(err);
				setStatus('alert');
			} else {
				setError(err);
				setStatus('error');
			}
		}
	};

	/**
	 * Handle feature adding to project
	 */
	const handleAddLayer = async (
		featureKey,
		featureTag,
		featureValue,
		featureType,
		featureLabel
	) => {
		console.log(
			`Calling loadLayer with boundary ID: ${selectedBoundaryIds}`
		);

		const preparedLayer = await loadLayer({
			featureKey,
			boundaryIds: selectedBoundaryIds,
			featureTag,
			featureValue,
			featureType,
			featureLabel,
		});

		if (!preparedLayer) return;

		if (preparedLayer.totalCount > LARGE_DATASET_LIMIT) {
			setPendingLayer(preparedLayer);
			setActiveModal(MODALS.LARGE_DATASET);
			return;
		}

		commitLayer(preparedLayer);
		//setIsDirty(true);
	};

	/* Layer inspection and updating */
	const updateLayer = (layerID, changes) => {
		patchLayer(layerID, changes);
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
			restored[layer.id] = buildLayer({
				...layer,
				filters: layer.filters ?? [],
			});
		});

		setFeatureLayers(restored);

		setStatus('success');
		setError(null);
	};

	/**
	 * Handle renaming features
	 */
	const renameLayer = (layerID, newLabel) => {
		updateLayer(layerID, {
			displayName: newLabel,
		});
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
		loadLayer,
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
