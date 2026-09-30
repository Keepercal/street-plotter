/**
 * Converts a time into a human-readable relative time string.
 *
 * Examples:
 * - "just now"
 * - "5 minutes ago"
 * - "2 days ago"
 */
export function timeAgo(time) {
	const diffMs = Date.now() - new Date(time).getTime();

	const minute = 60 * 1000;
	const hour = 60 * minute;
	const day = 24 * hour;
	const month = 30.44 * day;
	const year = 365.25 * day;

	const format = (value, unit) =>
		`${value} ${unit}${value !== 1 ? 's' : ''} ago`;

	if (diffMs < minute) {
		return 'Just now';
	}

	if (diffMs < hour) {
		return format(Math.floor(diffMs / minute), 'minute');
	}

	if (diffMs < day) {
		return format(Math.floor(diffMs / hour), 'hour');
	}

	if (diffMs < month) {
		return format(Math.floor(diffMs / day), 'day');
	}

	if (diffMs < year) {
		return format(Math.floor(diffMs / month), 'month');
	}

	return format(Math.floor(diffMs / year), 'year');
}
