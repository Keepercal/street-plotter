import './AddLayerPanel.css';
import FeatureItem from './components/FeatureItem/FeatureItem.jsx';

/* HOOKS */
import useFeatureGroups from './hooks/useFeatureGroups.js';

/* CONSTANTS */
import GROUP_LABELS from '@/config/featureGroups.js';
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
	const { groupedFeatures, openGroups, toggleGroup } =
		useFeatureGroups(FEATURE_OPTIONS);

	return (
		<>
			{Object.entries(groupedFeatures).map(([group, features]) => (
				<div key={group} className="accordion-group">
					{/* LEVEL 2 HEADER */}
					<h4
						className="accordion-header"
						onClick={() => toggleGroup(group)}
					>
						{GROUP_LABELS[group] || group}
						<span
							className={`arrow ${openGroups[group] ? 'rotated' : ''}`}
						>
							▸
						</span>
					</h4>

					{/* LEVEL 3 CONTENT */}
					<div
						className={`accordion-content ${openGroups[group] ? 'open' : ''}`}
					>
						<FeatureItem
							features={features}
							handleAddLayer={handleAddLayer}
							cachedFeatures={cachedFeatures}
						/>
					</div>
				</div>
			))}
		</>
	);
};

export default AddLayerPanel;
