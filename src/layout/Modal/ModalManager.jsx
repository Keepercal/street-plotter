import ExportModal from '@/layout/Modal/modals/ExportModal/ExportModal.jsx';
import OpenProjectModal from '@/layout/Modal/modals/OpenProjectModal/OpenProjectModal.jsx';
import HowToModal from '@/layout/Modal/modals/HowToModal/HowToModal.jsx';
import AboutModal from '@/layout/Modal/modals/AboutModal/AboutModal.jsx';

import UnsavedChangesModal from '@/layout/Modal/modals/UnsavedChangesModal.jsx';
import SaveModal from '@/layout/Modal/modals/SaveModal.jsx';
import LargeDatasetModal from '@/layout/Modal/modals/LargeDatasetModal.jsx';
import RestoreSessionModal from '@/layout/Modal/modals/RestoreSessionModal.jsx';

import MODALS from '@/config/modalTypes.js';

/* Context */
import { useUIContext } from '@/contexts/UIContext.jsx';
import { useWorkspaceContext } from '@/contexts/WorkspaceContext.jsx';
import { useBoundaryContext } from '@/contexts/BoundaryContext.jsx';
import { useLayerContext } from '@/contexts/LayerContext.jsx';

/**
 * ModalManager
 * ------------
 * Centralised management for modals
 */
export default function ModalManager() {
	const {
		activeModal,
		setActiveModal,
		pendingSession,
		setPendingSession,
		pendingLayer,
		setPendingLayer,
	} = useUIContext();

	const {
		isDirty,
		setIsDirty,
		restoreWorkspace,
		resetWorkspace,
		clearSavedSession,
		handleSaveAndContinue,
		handleDiscardAndContinue,
		handleCancel,
		handleOpenProject,
		projects,
		loadProjects,
		handleDeleteProject,
		saveProjectAs,
		hasSavedProjects,
	} = useWorkspaceContext();

	const { boundaries } = useBoundaryContext();
	const { filteredLayers, commitLayer, clearStatus } = useLayerContext();

	return (
		<>
			{activeModal === MODALS.RESTORE_WORKSPACE && (
				<RestoreSessionModal
					onRestore={() => {
						if (!pendingSession) return;

						restoreWorkspace(pendingSession);

						setPendingSession(null);
						setActiveModal(null);
					}}
					onStartNew={() => {
						clearSavedSession();

						setPendingSession(null);
						setActiveModal(null);

						resetWorkspace();
					}}
					onClose={() => {
						setPendingSession(null);
						setActiveModal(null);
					}}
				/>
			)}

			{activeModal === MODALS.UNSAVED_CHANGES && (
				<UnsavedChangesModal
					onSave={handleSaveAndContinue}
					onDiscard={handleDiscardAndContinue}
					onClose={handleCancel}
					canClose={false}
				/>
			)}

			{activeModal === MODALS.OPEN_PROJECT && (
				<OpenProjectModal
					isDirty={isDirty}
					onOpen={handleOpenProject}
					onClose={() => setActiveModal(null)}
					handleDeleteProject={handleDeleteProject}
					projects={projects}
					loadProjects={loadProjects}
					saveProjectAs={saveProjectAs}
					hasSavedProjects={hasSavedProjects}
				/>
			)}

			{activeModal === MODALS.SAVE_PROJECT && (
				<SaveModal
					onSaveAs={(name, description) => {
						saveProjectAs(name, description);
						setActiveModal(null);
					}}
					onClose={() => setActiveModal(null)}
				/>
			)}

			{activeModal === MODALS.EXPORT && (
				<ExportModal
					boundaryGeojson={boundaries}
					featureLayers={filteredLayers}
					onClose={() => setActiveModal(null)}
				/>
			)}

			{activeModal === MODALS.LARGE_DATASET && (
				<LargeDatasetModal
					onConfirm={() => {
						if (!pendingLayer) return;

						commitLayer(pendingLayer);
						setPendingLayer(null);
						setActiveModal(null);
						clearStatus();
						setIsDirty(true);
					}}
					onDiscard={() => {
						setPendingLayer(null);
						setActiveModal(null);
						clearStatus();
					}}
				/>
			)}

			{activeModal === MODALS.HOW_TO && (
				<HowToModal onClose={() => setActiveModal(null)} />
			)}

			{activeModal === MODALS.ABOUT && (
				<AboutModal onClose={() => setActiveModal(null)} />
			)}
		</>
	);
}
