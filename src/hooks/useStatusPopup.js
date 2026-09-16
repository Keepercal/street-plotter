// useStatusPopup.js
import { useEffect, useReducer, useRef } from 'react';
import { buildStatusSources } from './utils/statusPopupSources';

const initialState = {
	status: 'idle',
	type: null,
	title: '',
	message: '',
	source: null,
};

function popupReducer(state, action) {
	switch (action.type) {
		case 'SHOW':
			return { status: 'visible', ...action.payload };
		case 'DISMISS':
			return initialState;
		default:
			return state;
	}
}

export default function useStatusPopup(sourceInputs) {
	const [popup, dispatch] = useReducer(popupReducer, initialState);
	const timerRef = useRef(null);

	useEffect(() => {
		clearTimeout(timerRef.current);

		const sources = buildStatusSources(sourceInputs);
		const active = sources.find((source) => source.test());

		if (!active) {
			dispatch({ type: 'DISMISS' });
			return;
		}

		dispatch({ type: 'SHOW', payload: active.build() });

		if (active.dismissMs) {
			timerRef.current = setTimeout(
				() => dispatch({ type: 'DISMISS' }),
				active.dismissMs
			);
		}

		return () => clearTimeout(timerRef.current);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		sourceInputs.featureStatus,
		sourceInputs.featureError,
		sourceInputs.failedFeatureKey,
		sourceInputs.projectStatus,
		sourceInputs.projectError,
	]);

	return {
		statusPopup: { trigger: popup.status === 'visible', ...popup },
		dismissPopup: () => {
			clearTimeout(timerRef.current);
			dispatch({ type: 'DISMISS' });
		},
	};
}
