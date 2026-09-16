export const SAVED_DISMISS_MS = 2500;
export const ERROR_DISMISS_MS = 5000;

export function buildStatusSources({
	featureStatus,
	featureError,
	failedFeatureKey,
	projectStatus,
	projectError,
}) {
	return [
		{
			test: () => featureStatus === 'loading',
			build: () => ({
				type: 'loading',
				title: 'Loading',
				message: 'Loading feature from Overpass...',
				source: 'feature',
			}),
		},
		{
			test: () => featureStatus === 'error',
			build: () => ({
				type: 'error',
				title: 'Error',
				message: featureError?.message,
				source: 'feature',
				featureKey: failedFeatureKey,
			}),
			dismissMs: ERROR_DISMISS_MS,
		},
		{
			test: () => projectStatus === 'saving',
			build: () => ({
				type: 'loading',
				title: 'Saving',
				message: 'Saving project...',
				source: 'project',
			}),
		},
		{
			test: () => projectStatus === 'saved',
			build: () => ({
				type: 'saved',
				title: 'Saved',
				message: 'Project saved.',
				source: 'project',
			}),
			dismissMs: SAVED_DISMISS_MS,
		},
		{
			test: () => projectStatus === 'error',
			build: () => ({
				type: 'error',
				title: 'Error',
				message: projectError?.message ?? 'Failed to save project.',
				source: 'project',
			}),
			dismissMs: ERROR_DISMISS_MS,
		},
	];
}
