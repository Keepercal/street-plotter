import './ManageLayerPanel.css';
import LayerItem from './LayerItem/LayerItem.jsx';
import { Ghost } from 'lucide-react';

import DeleteButton from '../../../../components/DeleteButton/DeleteButton.jsx';

/* Context */
import { useLayerContext } from '@/contexts/LayerContext.jsx';

export default function ManageLayerPanel() {
	const {
		featureLayers,
		toggleLayerVisibility,
		updateLayer,
		updateLayerFilters,
		removeLayer,
		renameLayer,
		clearLayers,
	} = useLayerContext();

	const hasLayers = Object.keys(featureLayers).length > 0;

	return (
		<>
			<DeleteButton
				label="Delete All Layers"
				title="Delete all layers from the current workspace"
				onClick={clearLayers}
				disabled={!hasLayers}
			/>
			{!hasLayers ? (
				<div className="empty-state">
					<Ghost size={180} />
					<p>No feature layers in workspace</p>
				</div>
			) : (
				<div className="panel-body">
					{Object.entries(featureLayers).map(([layerId, layer]) => (
						<LayerItem
							key={layerId}
							layerId={layerId}
							layer={layer}
							toggleLayerVisibility={toggleLayerVisibility}
							updateLayer={updateLayer}

							updateLayerFilters={updateLayerFilters}

							removeLayer={removeLayer}
							renameLayer={renameLayer}
						/>
					))}
				</div>
			)}
		</>
	);
}
