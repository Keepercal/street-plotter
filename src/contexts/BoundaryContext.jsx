import { createContext, useContext } from 'react';

const BoundaryContext = createContext(null);

export function BoundaryProvider({ value, children }) {
	return (
		<BoundaryContext.Provider value={value}>
			{children}
		</BoundaryContext.Provider>
	);
}

export function useBoundaryContext() {
	const context = useContext(BoundaryContext);

	if (!context) {
		throw new Error(
			'useBoundaryContext must be used within a BoundaryProvider'
		);
	}

	return context;
}
