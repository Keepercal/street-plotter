import { createContext, useContext } from 'react';

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
