import * as Sentry from '@sentry/react';

/**
 * Report an error to Sentry with optional context.
 * @param {Error|string} error - The error object or message
 * @param {Object} [options]
 * @param {Object} [options.extra] - Extra debugging data (objects, state, etc.)
 * @param {Object} [options.tags] - Searchable key-value tags (e.g. { feature: "checkout" })
 * @param {string} [options.level] - 'fatal' | 'error' | 'warning' | 'info' | 'debug'
 * @param {Object} [options.user] - { id, email, username } if you want to attach user context
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
