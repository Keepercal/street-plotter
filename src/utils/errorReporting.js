import * as Sentry from '@sentry/react';

/**
 * Reports an error to Sentry with optional debugging context.
 *
 * @param {Error|string} error The error object or message to report
 * @param {Object} [options={}] Optional reporting configuration
 * @param {Object} [options.extra] Additional debugging context
 * @param {Object} [options.tags] Searchable key-value tags
 * @param {'fatal'|'error'|'warning'|'info'|'debug'} [options.level='error'] Severity level
 * @param {Object} [options.user] User context to attach to the report
 * @returns {void}
 */
export function reportError(error, options = {}) {
	const { extra, tags, level = 'error', user } = options;

	Sentry.withScope((scope) => {
		if (extra) scope.setExtras(extra);
		if (tags) scope.setTags(tags);
		if (user) scope.setUser(user);
		scope.setLevel(level);

		if (error instanceof Error) {
			Sentry.captureException(error);
		} else {
			Sentry.captureMessage(String(error), level);
		}
	});

	// Optional: still log to console in dev
	if (import.meta.env.NODE_ENV === 'development') {
		console.error('[reportError]', error, options);
	}
}
