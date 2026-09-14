import { useEffect, useMemo, useState } from 'react';

export default function useStatusPopup({
	boundaryStatus,
	boundaryError,
	featureStatus,
	featureError,
	failedFeatureKey,
}) {
	const [dismissed, setDismissed] = useState(false);

	/*
	 * Reset status popup dismissal when loading starts
	 */
	useEffect(() => {
		if (
			boundaryStatus === 'loading' ||
			featureStatus === 'loading' ||
			boundaryStatus === 'error' ||
			featureStatus === 'error'
		) {
			setDismissed(false);
		}
	}, [boundaryStatus, featureStatus]);

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

		if (boundaryStatus === 'loading') {
			console.log('[DEBUG] Popup: boundary loading');
			return {
				trigger: true,
				type: 'loading',
				source: 'boundary',
				featureKey: null,
				title: 'Loading',
				message: 'Loading boundary...',
			};
		}

		if (boundaryStatus === 'error') {
			console.error('[DEBUG] Popup: boundary error', boundaryError);
			return {
				trigger: true,
				type: 'error',
				source: 'boundary',
				featureKey: null,
				title: 'Error',
				message: boundaryError?.message,
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
		boundaryStatus,
		boundaryError,
		featureStatus,
		featureError,
		failedFeatureKey,
	]);

	useEffect(() => {
		if (!statusPopup.trigger || statusPopup.type !== 'error') {
			return;
		}

		const timer = setTimeout(() => {
			setDismissed(true);
		}, 5000);

		return () => clearTimeout(timer);
	}, [statusPopup.trigger, statusPopup.type]);

	return {
		statusPopup,

		dismissPopup() {
			setDismissed(true);
		},
	};
}
