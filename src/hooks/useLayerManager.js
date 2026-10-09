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
 * Manages the application's feature layers.
 *
 * Handles loading layers from Overpass, converting OSM data to GeoJSON,
 * caching, layer editing, persistence, visibility, ordering, and status.
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

	/** Prepares data returned from Overpass as Layer object */
	async function prepareLayer({
		layerId,
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
		const totalCount = countFeatures({
			temp: {
				data: payload,
			},
		});

		// Create a cache key for the layer
		const cacheKey = JSON.stringify([
			boundaryIds,
			osmTagKey,
			osmTagValue,
			//osmFeatureLabel,
		]);

		//const cached = getCachedLayer(cacheKey);

		// Check layer to see if copy stored in cache
		/*if (cached) {
			loadCachedLayer(cached, layerId, osmFeatureLabel);
			return;
		}*/

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

	/** Loads and prepares a new layer, handling request state and errors */
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

		// Validate if osmTagKey and osmTagValue are strings
		if (
			typeof osmTagKey !== 'string' ||
			typeof osmTagValue !== 'string' ||
			!osmTagKey.trim() ||
			!osmTagValue.trim()
		) {
			setStatus('idle');
			throw new Error(
				'osmTagKey and osmTagValue must be non-empty strings'
			);
		}

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

	/** Load a layer from the cache */
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

	/** Takes the prepared layer, stores in cache, and updates state */
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

	/** Handle adding feature to project */
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

	/** Export all layers as an object */
	const exportLayers = () => {
		return Object.entries(featureLayers).map(([id, layer]) => ({
			id,
			...layer,
		}));
	};

	/** Restores a given set of layers into state */
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

	/** Updates a layer's object with given changes in state */
	function updateLayer(layerId, changes) {
		setFeatureLayers((prev) => {
			const currentLayer = prev[layerId];
			const updatedLayer = applyLayerChanges(currentLayer, changes);

			if (updatedLayer === currentLayer) {
				return prev;
			}

			markDirty();

			return {
				...prev,
				[layerId]: updatedLayer,
			};
		});
	}

	/** Move a layer up or down in the state's layer stack */
	const moveLayer = (layerId, direction) => {
		setFeatureLayers((prev) => {
			const entries = Object.entries(prev);

			const index = entries.findIndex(([id]) => id === layerId);

			if (index === -1) return prev;

			const newIndex = index + direction;

			// Already at the top/bottom
			if (newIndex < 0 || newIndex >= entries.length) {
				return prev;
			}

			// Swap the two layers
			[entries[index], entries[newIndex]] = [
				entries[newIndex],
				entries[index],
			];

			markDirty();

			return Object.fromEntries(entries);
		});
	};

	/** Removes a single layer from state */
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

	/** Clear all layers from state */
	const clearLayers = ({ markDirty = true } = {}) => {
		setFeatureLayers({});

		if (markDirty) {
			onChange?.();
		}

		setError(null);
		setStatus('idle');
	};

	/** Updates the displayName in a given layer's object */
	const renameLayer = (layerId, newLabel) => {
		updateLayer(layerId, {
			displayName: newLabel,
		});
	};

	/** Show or hide layer on the map */
	const toggleLayerVisibility = (layerId) => {
		setFeatureLayers((prev) => {
			const layer = prev[layerId];

			console.log(layer);

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

	/** Create a duplicate object from a given layer */
	const duplicateLayer = (layerId) => {
		setFeatureLayers((prev) => {
			const layer = prev[layerId];

			if (!layer) {
				return prev;
			}

			// Strip any existing copy suffix
			const baseLabel = layer.label.replace(/ \(Copy(?: \d+)?\)$/, '');

			let count = 1;
			let label = `${baseLabel} (Copy ${count})`;

			while (Object.values(prev).some((l) => l.label === label)) {
				count++;
				label = `${baseLabel} (Copy ${count})`;
			}

			const newId = crypto.randomUUID();

			const duplicatedLayer = createLayer({
				...layer,
				label,
				data: layer.data,
				geojson: layer.geojson,
			});

			markDirty();

			return {
				...prev,
				[newId]: duplicatedLayer,
			};
		});
	};

	/** Update a layer with given filters */
	const updateLayerFilters = (layerId, filters) => {
		updateLayer(layerId, { filters });
	};

	/** Array indicating what features are in the cache */
	// Used in the UI to indicate cached features
	const getCachedFeatures = (boundaryIds) => {
		return getCacheEntries()
			.filter(([cacheKey]) => {
				const [cachedBoundary] = JSON.parse(cacheKey);

				return cachedBoundary === boundaryIds;
			})
			.map(([, layer]) => layer.osmTagValue);
	};

	/** Reset popup status */
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
		moveLayer,
		duplicateLayer,
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
