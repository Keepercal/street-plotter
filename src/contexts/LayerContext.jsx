import { createContext, useContext, useMemo } from 'react';

const LayerContext = createContext(null);

export function LayerProvider({ value, children }) {
	return (
		<LayerContext.Provider value={value}>{children}</LayerContext.Provider>
	);
}

export function useLayerContext() {
	const context = useContext(LayerContext);

	if (!context) {
		throw new Error('useLayerContext must be used within a LayerProvider');
	}

	return context;
}

/**
 * Builds the LayerContext value from the layer manager
 * and additional derived/app-level state.
 */
export function useLayerContextValue(layerManager, extras) {
	const {
		featureLayers,
		updateLayer,
		removeLayer,
		duplicateLayer,
		moveLayer,
		clearLayers,
		updateLayerFilters,
		commitLayer,
		handleAddLayer,
		toggleLayerVisibility,
		renameLayer,
		exportLayers,
		restoreLayers,
		getCachedFeatures,
		clearCache,
		failedFeatureKey,
		clearStatus,
		status,
		error,
	} = layerManager;

	const { filteredLayers, hasFeatures } = extras;

	return useMemo(
		() => ({
			featureLayers,
			filteredLayers,
			hasFeatures,
			commitLayer,
			updateLayer,
			removeLayer,
			duplicateLayer,
			moveLayer,
			renameLayer,
			handleAddLayer,
			updateLayerFilters,
			toggleLayerVisibility,
			clearLayers,
			restoreLayers,
			exportLayers,
			getCachedFeatures,
			clearCache,
			failedFeatureKey,
			clearStatus,
			status,
			error,
		}),
		[
			featureLayers,
			filteredLayers,
			hasFeatures,
			commitLayer,
			updateLayer,
			removeLayer,
			duplicateLayer,
			moveLayer,
			renameLayer,
			handleAddLayer,
			updateLayerFilters,
			toggleLayerVisibility,
			clearLayers,
			restoreLayers,
			exportLayers,
			getCachedFeatures,
			clearCache,
			failedFeatureKey,
			clearStatus,
			status,
			error,
		]
	);
}
