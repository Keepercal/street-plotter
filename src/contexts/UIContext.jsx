import { createContext, useContext } from 'react';

const UIContext = createContext(null);

export function UIProvider({ value, children }) {
	return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUIContext() {
	const context = useContext(UIContext);

	if (!context) {
		throw new Error('useUIContext must be used within a UIProvider');
	}

	return context;
}
