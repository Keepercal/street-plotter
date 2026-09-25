import { useEffect, useMemo, useState } from 'react';

export default function useFeatureCategories(featureOptions) {
	const [openCategories, setOpenCategories] = useState({});

	/* Group features by category */
	const categorisedFeatures = useMemo(() => {
		return Object.entries(featureOptions || {}).reduce(
			(categories, [key, feature]) => {
				const category = feature.category;

				if (!category) return categories;

				if (!categories[category]) {
					categories[category] = [];
				}

				categories[category].push({
					key,
					...feature,
				});

				// Sort the group
				categories[category].sort((a, b) =>
					a.key.localeCompare(b.label)
				);

				return categories;
			},
			{}
		);
	}, [featureOptions]);

	/* Initialize group open/closed state */
	useEffect(() => {
		if (!featureOptions) return;

		setOpenCategories((prev) => {
			const initial = Object.values(featureOptions).reduce(
				(categories, feature) => {
					if (feature?.category) {
						categories[feature.category] = false;
					}

					return categories;
				},
				{}
			);
			return { ...initial, ...prev };
		});
	}, [featureOptions]);

	/**
	 * Toggle group visibility
	 */
	const toggleCategory = (category) => {
		setOpenCategories((prev) => ({
			...prev, // impacts whether more than one accordian can be open at the same time
			[category]: !prev[category],
		}));
	};

	return {
		categorisedFeatures,
		openCategories,
		toggleCategory,
	};
}
