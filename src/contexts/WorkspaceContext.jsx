import { createContext, useContext, useMemo } from 'react';

const WorkspaceContext = createContext(null);

export function WorkspaceProvider({ value, children }) {
	return (
		<WorkspaceContext.Provider value={value}>
			{children}
		</WorkspaceContext.Provider>
	);
}

export function useWorkspaceContext() {
	const context = useContext(WorkspaceContext);

	if (!context) {
		throw new Error(
			'useWorkspaceContext must be used within a WorkspaceProvider'
		);
	}

	return context;
}

/**
 * useWorkspaceContextValue
 * ---------------
 * Assembles the WorkspaceContext value. Unlike Boundary/Layer,
 * this one draws from several different hooks (useState,
 * useProjectManager, useSession, useWorkspaceActions,
 * useUnsavedChanges) rather than one manager object, so it takes
 * a flat bag of values rather than a single manager + extras.
 */
export function useWorkspaceContextValue(values) {
	const {
		basemap,
		setBasemap,
		displayMode,
		setDisplayMode,
		isDirty,
		setIsDirty,
		sessionInfo,
		setSessionInfo,
		clearSavedSession,
		handleNewWorkspace,
		handleSaveAndContinue,
		handleDiscardAndContinue,
		handleCancel,
		restoreWorkspace,
		resetWorkspace,
		pendingAction,
		setPendingAction,
	} = values;

	return useMemo(
		() => ({
			basemap,
			setBasemap,
			displayMode,
			setDisplayMode,
			isDirty,
			setIsDirty,
			sessionInfo,
			setSessionInfo,
			clearSavedSession,
			handleNewWorkspace,
			handleSaveAndContinue,
			handleDiscardAndContinue,
			handleCancel,
			restoreWorkspace,
			resetWorkspace,
			pendingAction,
			setPendingAction,
		}),
		[
			basemap,
			setBasemap,
			displayMode,
			setDisplayMode,
			isDirty,
			setIsDirty,
			sessionInfo,
			setSessionInfo,
			clearSavedSession,
			handleNewWorkspace,
			handleSaveAndContinue,
			handleDiscardAndContinue,
			handleCancel,
			restoreWorkspace,
			resetWorkspace,
			pendingAction,
			setPendingAction,
		]
	);
}
