import { createContext, useContext } from 'react';

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
