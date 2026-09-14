import './MapFooter.css';
import countFeatures from '../../utils/countFeatures';

/* Context */
import { useLayerContext } from '@/contexts/LayerContext.jsx';
import { useWorkspaceContext } from '@/contexts/WorkspaceContext.jsx';

/**
 * MapRibbon
 * ------------
 * Displays a summary count across all loaded feature layers.
 */
const MapFooter = () => {
	const { featureLayers } = useLayerContext();
	const { projectName } = useWorkspaceContext();

	const { nodeCount, wayCount, relationCount } = countFeatures(featureLayers);

	return (
		<div className="map-ribbon-content">
			<div className="current-project">
				<p>Current Project: {projectName}</p>
			</div>

			<div className="feature-counter">
				<p>Nodes {nodeCount}</p>
				<p>Ways {wayCount}</p>
				<p>Relations {relationCount}</p>
			</div>
		</div>
	);
};

export default MapFooter;
