import { createContext, useContext, useMemo } from 'react';

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

/**
 * Builds the BoundaryContext value from the boundary manager
 * and additional app-level state.
 */
export function useBoundaryContextValue(boundaryManager, extras) {
	const {
		boundaries,
		previewBoundary,
		setPreviewBoundary,
		previewTrigger,
		boundaryResults,
		fetchBoundaryResults,
		clearBoundaryResults,
		handlePreviewBoundary,
		setBoundary,
		removeBoundary,
		clearBoundaries,
		restoreBoundaries,
		handleSelectBoundary,
		handleRemoveBoundary,
		status,
		error,
	} = boundaryManager;

	const { handleClearBoundaries, selectedBoundaryIds } = extras;

	return useMemo(
		() => ({
			boundaries,
			hasBoundary: boundaries.length > 0,
			previewBoundary,
			setPreviewBoundary,
			previewTrigger,
			boundaryResults,
			fetchBoundaryResults,
			clearBoundaryResults,
			handlePreviewBoundary,
			handleClearBoundaries,
			selectedBoundaryIds,
			setBoundary,
			removeBoundary,
			clearBoundaries,
			restoreBoundaries,
			handleSelectBoundary,
			handleRemoveBoundary,
			status,
			error,
		}),
		[
			boundaries,
			previewBoundary,
			setPreviewBoundary,
			previewTrigger,
			boundaryResults,
			fetchBoundaryResults,
			clearBoundaryResults,
			handlePreviewBoundary,
			handleClearBoundaries,
			selectedBoundaryIds,
			setBoundary,
			removeBoundary,
			clearBoundaries,
			restoreBoundaries,
			handleSelectBoundary,
			handleRemoveBoundary,
			status,
			error,
		]
	);
}
