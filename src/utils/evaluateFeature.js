/**
 * evaluateFeature
 * -------------------
 * Evaluates whether a GeoJSON feature matches all provided filter rules.
 *
 * Each filter is applied using an AND condition.
 * Returns true only if all filters pass.
 */
export default function evaluateFeature(feature, filters) {
	const tags = feature?.properties ?? {};

	return filters.every((filter) => {
		const value = tags[filter.key];

		const normalisedValue = String(value ?? '');

		const numericValue = Number(value);
		const numericFilterValue = Number(filter.value);

		switch (filter.operator) {
			case 'equals':
				return normalisedValue === filter.value;

			case 'not_equals':
				return normalisedValue !== filter.value;

			case 'greater_than':
				return (
					!Number.isNaN(numericValue) &&
					!Number.isNaN(numericFilterValue) &&
					numericValue > numericFilterValue
				);
			case 'greater_than_or_equal':
				return (
					!Number.isNaN(numericValue) &&
					!Number.isNaN(numericFilterValue) &&
					numericValue >= numericFilterValue
				);

			case 'less_than':
				return (
					!Number.isNaN(numericValue) &&
					!Number.isNaN(numericFilterValue) &&
					numericValue < numericFilterValue
				);
			case 'less_than_or_equal':
				return (
					!Number.isNaN(numericValue) &&
					!Number.isNaN(numericFilterValue) &&
					numericValue <= numericFilterValue
				);

			case 'exists':
				return value !== undefined;

			case 'missing':
				return value === undefined;

			default:
				// Unknown operators are treated as non-blocking
				return true;
		}
	});
}
