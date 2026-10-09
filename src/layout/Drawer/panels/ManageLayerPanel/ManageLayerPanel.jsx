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
		duplicateLayer,
		updateLayerFilters,
		removeLayer,
		renameLayer,
		moveLayer,
		clearLayers,
	} = useLayerContext();

	const entries = Object.entries(featureLayers);
	const renderedEntries = [...entries].reverse();

	const hasLayers = entries.length > 0;

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
					<p>
						No feature layers
						<br /> in workspace
					</p>
				</div>
			) : (
				<div className="panel-body">
					{renderedEntries.map(([layerId, layer], index) => (
						<LayerItem
							key={layerId}
							layerId={layerId}
							layer={layer}

							toggleLayerVisibility={toggleLayerVisibility}
							updateLayer={updateLayer}
							updateLayerFilters={updateLayerFilters}

							removeLayer={removeLayer}
							duplicateLayer={duplicateLayer}
							renameLayer={renameLayer}

							moveLayer={moveLayer}
							isFirst={index === 0}
							isLast={index === entries.length - 1}
						/>
					))}
				</div>
			)}
		</>
	);
}
