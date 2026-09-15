import './MapFooter.css';
import countFeatures from '../../utils/countFeatures';

/* Context */
import { useLayerContext } from '@/contexts/LayerContext.jsx';
import { useWorkspaceContext } from '@/contexts/WorkspaceContext.jsx';

import { TriangleAlert } from 'lucide-react';

/**
 * MapRibbon
 * ------------
 * Displays a summary count across all loaded feature layers.
 */
const MapFooter = () => {
	const { featureLayers } = useLayerContext();
	const { projectName } = useWorkspaceContext();

	const { nodeCount, wayCount, relationCount } = countFeatures(featureLayers);

	const workspaceText =
		projectName === 'None'
			? 'Unsaved Workspace'
			: `Current Project: ${projectName}`;

	return (
		<div className="map-footer-content">
			<div className="workspace-indicator">
				<p>{workspaceText}</p>
			</div>

			<div className="feature-counter">
				<p>Nodes {nodeCount}</p>
				<p>Ways {wayCount}</p>
				<p>Relations {relationCount}</p>
			</div>

			<p className="version-tag">v{__APP_VERSION__}</p>
		</div>
	);
};

export default MapFooter;
