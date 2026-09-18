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
 * useLayerContextValue
 * ---------------
 * Assembles the LayerContext value from useLayerManager's return
 * value plus derived/App-level extras.
 */
export function useLayerContextValue(layerManager, extras) {
	const {
		featureLayers,
		updateLayer,
		removeLayer,
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
