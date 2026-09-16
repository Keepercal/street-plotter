import { useState } from 'react';

export default function useUnsavedChanges({
	isDirty,
	setActiveModal,
	modalKey,
	saveCurrentProject,
}) {
	const [pendingAction, setPendingAction] = useState(null);

	function confirmUnsavedChanges(action) {
		if (!isDirty) {
			action();
			return;
		}

		setPendingAction(() => action);
		setActiveModal(modalKey);
	}

	const handleSaveAndContinue = async () => {
		const success = await saveCurrentProject({ silent: true });
		if (!success) return;
		await pendingAction?.();
		clearPendingAction();
	};

	const handleDiscardAndContinue = async () => {
		await pendingAction?.();
		await clearPendingAction();
	};

	const handleCancel = () => {
		clearPendingAction();
	};

	function clearPendingAction() {
		setPendingAction(null);
		setActiveModal(null);
	}

	return {
		confirmUnsavedChanges,
		handleSaveAndContinue,
		handleDiscardAndContinue,
		handleCancel,
	};
}
