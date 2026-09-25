import './AddLayerPanel.css';
import FeatureItem from './components/FeatureItem/FeatureItem.jsx';

/* HOOKS */
import useFeatureCategories from './hooks/useFeatureCategories.js';

/* CONSTANTS */
import GROUP_LABELS from '@/config/featureCategories.js';
import { FEATURE_OPTIONS } from '@/config/featureOptions.js';

/**
 * AddLayerPanel.jsx
 * ------------
 * UI component in sidebar which contains feature options
 *
 * Features:
 * - Load features from a preselect list
 */
const AddLayerPanel = ({ handleAddLayer, cachedFeatures }) => {
	const { categorisedFeatures, openCategories, toggleCategory } =
		useFeatureCategories(FEATURE_OPTIONS);

	return (
		<>
			{Object.entries(categorisedFeatures).map(([category, features]) => (
				<div key={category} className="accordion-category">
					{/* LEVEL 2 HEADER */}
					<h4
						className="accordion-header"
						onClick={() => toggleCategory(category)}
					>
						{GROUP_LABELS[category] || category}
						<span
							className={`arrow ${openCategories[category] ? 'rotated' : ''}`}
						>
							▸
						</span>
					</h4>

					{/* LEVEL 3 CONTENT */}
					<div
						className={`accordion-content ${openCategories[category] ? 'open' : ''}`}
						style={{
							gridTemplateRows: `repeat(${Math.ceil(features.length / 2)}, auto)`,
						}}
					>
						{[...features]
							.sort((a, b) => a.label.localeCompare(b.label))
							.map(({ key, osmKey, osmValue, label }) => {
								const isCached =
									cachedFeatures?.includes(osmKey);

								return (
									<FeatureItem
										key={key}
										label={label}
										onClick={() =>
											handleAddLayer(
												osmKey,
												osmValue,
												label
											)
										}
										isCached={isCached}
									/>
								);
							})}
					</div>
				</div>
			))}
		</>
	);
};

export default AddLayerPanel;
