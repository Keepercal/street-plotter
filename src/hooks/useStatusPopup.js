import { useEffect, useMemo, useState } from 'react';

export default function useStatusPopup({
	featureStatus,
	featureError,
	failedFeatureKey,
	projectStatus,
	projectError,
}) {
	const [dismissed, setDismissed] = useState(false);

	/*
	 * Reset status popup dismissal when loading starts
	 */
	useEffect(() => {
		if (
			featureStatus === 'loading' ||
			projectStatus === 'saved' ||
			featureStatus === 'error' ||
			projectStatus === 'error'
		) {
			setDismissed(false);
		}
	}, [featureStatus, projectStatus]);

	/* Handle status popup */
	const statusPopup = useMemo(() => {
		if (dismissed) {
			console.log('[DEBUG] Popup dismissed → idle state');
			return {
				trigger: false,
				type: 'idle',
				source: null,
				featureKey: null,
				title: '',
				message: '',
			};
		}

		if (featureStatus === 'loading') {
			return {
				trigger: true,
				type: 'loading',
				source: 'feature',
				featureKey: null,
				title: 'Loading',
				message: 'Loading feature from Overpass...',
			};
		}

		if (featureStatus === 'error') {
			console.error('[DEBUG] Popup: feature error', featureError);
			return {
				trigger: true,
				type: 'error',
				source: 'feature',
				featureKey: failedFeatureKey,
				title: 'Error',
				message: featureError?.message,
			};
		}

		if (projectStatus === 'saved') {
			return {
				trigger: true,
				type: 'saved',
				source: 'project',
				featureKey: null,
				title: 'Saved',
				message: 'Project saved.',
			};
		}

		if (projectStatus === 'error') {
			console.error('[DEBUG] Popup: project error', projectError);
			return {
				trigger: true,
				type: 'error',
				source: 'project',
				featureKey: null,
				title: 'Error',
				message: projectError?.message ?? 'Failed to save project.',
			};
		}

		return {
			trigger: false,
			type: 'idle',
			source: null,
			featureKey: null,
			title: '',
			message: '',
		};
	}, [
		dismissed,
		featureStatus,
		featureError,
		failedFeatureKey,
		projectStatus,
		projectError,
	]);

	useEffect(() => {
		if (
			!statusPopup.trigger ||
			(statusPopup.type !== 'error' && statusPopup.type !== 'saved')
		) {
			return;
		}

		const delay = statusPopup.type === 'saved' ? 2500 : 5000;

		const timer = setTimeout(() => {
			setDismissed(true);
		}, delay);

		return () => clearTimeout(timer);
	}, [statusPopup.trigger, statusPopup.type]);

	return {
		statusPopup,

		dismissPopup() {
			setDismissed(true);
		},
	};
}
