import { createContext, useContext, useMemo } from 'react';

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

export function useUIContextValue(values) {
	const {
		activeDrawer,
		setActiveDrawer,
		activeLayer,
		setActiveLayer,
		activeModal,
		setActiveModal,
		focusTrigger,
		setFocusTrigger,
		takeScreenshot,
		handleScreenshotReady,
		pendingSession,
		setPendingSession,
		pendingLayer,
		setPendingLayer,
	} = values;

	return useMemo(
		() => ({
			activeDrawer,
			setActiveDrawer,
			activeLayer,
			setActiveLayer,
			activeModal,
			setActiveModal,
			focusTrigger,
			setFocusTrigger,
			takeScreenshot,
			handleScreenshotReady,
			pendingSession,
			setPendingSession,
			pendingLayer,
			setPendingLayer,
		}),
		[
			activeDrawer,
			setActiveDrawer,
			activeLayer,
			setActiveLayer,
			activeModal,
			setActiveModal,
			focusTrigger,
			setFocusTrigger,
			takeScreenshot,
			handleScreenshotReady,
			pendingSession,
			setPendingSession,
			pendingLayer,
			setPendingLayer,
		]
	);
}
