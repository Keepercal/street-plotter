/**
 * App Entry Point
 * -----------
 * npm run dev: Local development server
 * npm run deploy: Builds and deploys to GitHub Pages
 */

import './App.css';
import { useEffect, useState, useRef, useCallback, useMemo } from 'react';

/* High level components */
import AppLayout from './layout/AppLayout.jsx';
import ModalManager from './layout/Modal/ModalManager.jsx';

/* Popups */
import StatusPopup from '@/layout/Popups/StatusPopup/StatusPopup.jsx';

/* Modals */
import MODALS from '@/config/modalTypes.js';

/* Hooks */
import useBoundaryManager from './hooks/useBoundaryManager.js';
import useLayerManager from './hooks/useLayerManager.js';
import useWorkspaceActions from './hooks/useWorkspaceActions.js';
import useProjectManager from './hooks/useProjectManager.js';

import useLateBinding from './hooks/useLateBinding.js';
import useFilteredLayers from './hooks/useFilteredLayers.js';
import useSession from './hooks/useSession.js';
import useUnsavedChanges from './hooks/useUnsavedChanges.js';

import useStatusPopup from './hooks/useStatusPopup.js';

/* Context */
import {
	BoundaryProvider,
	useBoundaryContextValue,
} from './contexts/BoundaryContext.jsx';
import {
	LayerProvider,
	useLayerContextValue,
} from './contexts/LayerContext.jsx';
import {
	WorkspaceProvider,
	useWorkspaceContextValue,
} from './contexts/WorkspaceContext.jsx';
import { UIProvider, useUIContextValue } from './contexts/UIContext.jsx';
import {
	ProjectProvider,
	useProjectContextValue,
} from './contexts/ProjectContext.jsx';

/* Session & Database */
import { createSession } from './models/session.js';
import { getAllProjects, deleteProject } from './db/projectDB.js';

console.log('App Version:', __APP_VERSION__);

export default function App() {
	// ─────────────────────────────────────────
	// State
	// ─────────────────────────────────────────

	// Workspace
	const [isDirty, setIsDirty] = useState(false);
	const [basemap, setBasemap] = useState('carto');
	const [displayMode, setDisplayMode] = useState('default');

	// UI
	const [activeDrawer, setActiveDrawer] = useState(null);
	const [activeLayer, setActiveLayer] = useState(null);
	const [activeModal, setActiveModal] = useState(null);
	const [focusTrigger, setFocusTrigger] = useState(0);

	// Session
	const [sessionInfo, setSessionInfo] = useState(createSession());

	// Pending states
	const [pendingSession, setPendingSession] = useState(null);
	const [pendingLayer, setPendingLayer] = useState(null);
	const [pendingAction, setPendingAction] = useState(null);

	// Project
	const [projects, setProjects] = useState([]);

	// Startup
	const didRestore = useRef(false);

	// Screenshot
	const [takeScreenshot, setTakeScreenshot] = useState(null);

	const handleScreenshotReady = useCallback((fn) => {
		setTakeScreenshot(() => fn);
	}, []);

	// Circular dependency breakers (see useWorkspaceActions/useProjectManager below)
	const [stableSetProject, bindSetProject] = useLateBinding();
	const [stableClearSavedSession, bindClearSavedSession] = useLateBinding();
	const [stableResetProjectStatus, bindResetProjectStatus] = useLateBinding();

	// ─────────────────────────────────────────
	// Managers
	// ─────────────────────────────────────────

	/* Manages states for boundaries */
	const boundaryManager = useBoundaryManager({
		onChange: () => setIsDirty(true),
		setIsDirty,
	});

	const {
		boundaries,
		setPreviewBoundary,
		clearBoundaryResults,
		clearBoundaries,
		restoreBoundaries,
	} = boundaryManager;

	/* Manages states for data displayed on map */
	const layerManager = useLayerManager({
		onChange: () => setIsDirty(true),
		boundaries,
		setPendingLayer,
		setActiveModal,
	});

	const {
		featureLayers,
		clearLayers,
		clearCache,
		exportLayers,
		restoreLayers,
	} = layerManager;

	/**
	 * Removes all boundaries from the workspace
	 */
	const handleClearBoundaries = () => {
		clearBoundaries();
		clearLayers();
		setActiveDrawer(null);

		setIsDirty(false);
	};

	// ─────────────────────────────────────────
	// Workspace
	// ─────────────────────────────────────────

	const { restoreWorkspace, resetWorkspace } = useWorkspaceActions({
		setSessionInfo,
		setProject: stableSetProject,
		setBasemap,
		setDisplayMode,
		setIsDirty,

		resetProjectStatus: stableResetProjectStatus,

		restoreBoundaries,
		restoreLayers,

		clearSavedSession: stableClearSavedSession,
		clearBoundaryResults,
		clearBoundaries,
		clearLayers,
		clearCache,

		setActiveModal,
		setActiveDrawer,
	});

	const handleNewWorkspace = () => {
		confirmUnsavedChanges(resetWorkspace);
	};

	// ─────────────────────────────────────────x
	// Projects
	// ─────────────────────────────────────────

	const {
		project,
		setProject,
		projectStatus,
		projectError,
		resetProjectStatus,
		openProject,
		saveCurrentProject,
		saveProjectAs,
		updateProjectMetadata,
	} = useProjectManager({
		workspace: {
			basemap,
			displayMode,
			boundaries,
			layers: exportLayers(featureLayers),
		},
		session: { sessionInfo, setSessionInfo },
		restore: { restoreWorkspace, restoreBoundaries, restoreLayers },
		resetWorkspace,
		onDirtyChange: setIsDirty,
		onSaveAsRequested: () => setActiveModal(MODALS.SAVE_PROJECT),
	});

	useEffect(() => {
		bindSetProject(setProject);
		bindResetProjectStatus(resetProjectStatus);
	}, [
		setProject,
		bindSetProject,
		resetProjectStatus,
		bindResetProjectStatus,
	]);

	/*
	 * Creates a list of projects
	 */
	const loadProjects = useCallback(async () => {
		const list = await getAllProjects();
		const sorted = [...list].sort((a, b) => {
			return (
				new Date(b.metadata.modified) - new Date(a.metadata.modified)
			);
		});

		setProjects(sorted);
	}, []);

	/*
	 * Confirm unsaved changes and open project
	 */
	const handleOpenProject = (projectId) => {
		confirmUnsavedChanges(async () => {
			await openProject(projectId);
			setActiveModal(null);
		});
	};

	/*
	 * Reset workspace when active project deleted
	 */
	async function handleUpdateProject(id, changes) {
		await updateProjectMetadata(id, changes);
		await loadProjects();

		if (project?.metadata.id !== id) return;
	}

	/*
	 * Reset workspace when active project deleted
	 */
	async function handleDeleteProject(id) {
		await deleteProject(id);
		await loadProjects();

		if (project?.metadata.id !== id) return;

		resetWorkspace();
	}

	// ─────────────────────────────────────────
	// Session
	// ─────────────────────────────────────────

	/*
	 *	Handles the management of the current working session
	 */
	const sessionManager = useSession({
		sessionInfo,
		basemap,
		displayMode,
		boundaries,
		layers: exportLayers(),
		onRestore: (session) => {
			setPendingSession(session);
			setActiveModal(MODALS.RESTORE_WORKSPACE);
		},
	});

	const { restoreSavedSession, clearSavedSession } = sessionManager;

	// Point the ref at the real clearSavedSession now that it exists
	useEffect(() => {
		bindClearSavedSession(clearSavedSession);
	}, [clearSavedSession, bindClearSavedSession]);

	/*
	 * Restore session on refresh or open
	 */
	useEffect(() => {
		if (didRestore.current) return;

		didRestore.current = true;

		restoreSavedSession();
	}, [restoreSavedSession]);

	// ─────────────────────────────────────────
	// Derived state
	// ─────────────────────────────────────────

	const hasFeatures = Object.keys(featureLayers).length > 0; // Flag to check if features exist
	const hasSavedProjects = Object.keys(projects).length > 0;
	const filteredLayers = useFilteredLayers(featureLayers);
	const projectName = project?.metadata.name ?? 'None';

	const selectedBoundaryIds = useMemo(
		() => new Set(Array.from(boundaries, (boundary) => boundary.osm_id)),
		[boundaries]
	);

	// ─────────────────────────────────────────
	// Managers
	// ─────────────────────────────────────────

	/*
	 * Hook for managing any unsaved changes changes within the session
	 */
	const {
		confirmUnsavedChanges,
		handleSaveAndContinue,
		handleDiscardAndContinue,
		handleCancel,
	} = useUnsavedChanges({
		isDirty,
		setActiveModal,
		modalKey: MODALS.UNSAVED_CHANGES,
		saveCurrentProject,
		pendingAction,
		setPendingAction,
	});

	const { statusPopup } = useStatusPopup({
		boundaryStatus: boundaryManager.status,
		boundaryError: boundaryManager.error,
		featureStatus: layerManager.status,
		featureError: layerManager.error,
		failedFeatureKey: layerManager.failedFeatureKey,

		projectStatus,
		projectError,
	});

	/* Remove the preview boundary if the user closes the active drawer */
	useEffect(() => {
		setPreviewBoundary(null);
	}, [setPreviewBoundary, activeDrawer]);

	// ─────────────────────────────────────────
	// Context
	// ─────────────────────────────────────────

	const boundaryContextValue = useBoundaryContextValue(boundaryManager, {
		handleClearBoundaries,
		selectedBoundaryIds,
	});

	const layerContextValue = useLayerContextValue(layerManager, {
		filteredLayers,
		hasFeatures,
	});

	const workspaceContextValue = useWorkspaceContextValue({
		basemap,
		setBasemap,
		displayMode,
		setDisplayMode,
		isDirty,
		setIsDirty,

		sessionInfo,
		setSessionInfo,

		handleNewWorkspace,
		handleSaveAndContinue,
		handleDiscardAndContinue,
		handleCancel,
		restoreWorkspace,
		resetWorkspace,
		clearSavedSession,
		pendingAction,
		setPendingAction,
	});

	const projectContextValue = useProjectContextValue({
		project,
		projects,
		projectName,
		loadProjects,
		hasSavedProjects,
		saveCurrentProject,
		saveProjectAs,
		handleOpenProject,
		handleDeleteProject,
		handleUpdateProject,
	});

	const uiContextValue = useUIContextValue({
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
	});

	return (
		<div className="App">
			<WorkspaceProvider value={workspaceContextValue}>
				<BoundaryProvider value={boundaryContextValue}>
					<LayerProvider value={layerContextValue}>
						<ProjectProvider value={projectContextValue}>
							<UIProvider value={uiContextValue}>
								<StatusPopup
									trigger={statusPopup.trigger}
									type={statusPopup.type}
									title={statusPopup.title}
									message={statusPopup.message}
									drawerOpen={activeDrawer !== null}
								/>

								<ModalManager />

								{/* Main UI */}
								<AppLayout hasFeatures={hasFeatures} />
							</UIProvider>
						</ProjectProvider>
					</LayerProvider>
				</BoundaryProvider>
			</WorkspaceProvider>
		</div>
	);
}
