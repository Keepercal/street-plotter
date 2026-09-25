import './Drawer.css';

import AddBoundaryPanel from './panels/AddBoundaryPanel/AddBoundaryPanel';
import ManageBoundaryPanel from './panels/ManageBoundaryPanel/ManageBoundaryPanel';
import AddLayerPanel from './panels/AddLayerPanel/AddLayerPanel';
import ManageLayerPanel from './panels/ManageLayerPanel/ManageLayerPanel';
import DisplayPanel from './panels/DisplayPanel/DisplayPanel';
import BasemapPanel from './panels/BasemapPanel/BasemapPanel';

/* Context */
import { useUIContext } from '@/contexts/UIContext.jsx';
import { useBoundaryContext } from '@/contexts/BoundaryContext.jsx';
import { useLayerContext } from '@/contexts/LayerContext.jsx';

function Drawer() {
	const { activeDrawer, setActiveDrawer } = useUIContext();

	const {
		boundaryResults,
		fetchBoundaryResults,
		clearBoundaryResults,
		handlePreviewBoundary,
		handleSelectBoundary,
		selectedBoundaryIds,
	} = useBoundaryContext();

	const { handleAddLayer, clearLayers, getCachedFeatures } =
		useLayerContext();

	const cachedFeatures = getCachedFeatures(selectedBoundaryIds);

	const DRAWER_TITLES = {
		addBoundary: 'Search for Boundary',
		manageBoundary: 'Manage Active Boundaries',
		addLayers: 'Add Layer',
		manageLayers: 'Manage Layers',
		display: 'Display',
		basemapSwitcher: 'Switch Basemap',
	};

	return (
		<div className={`drawer ${activeDrawer ? 'open' : ''}`}>
			<div className="drawer-header">
				<h2>{DRAWER_TITLES[activeDrawer]}</h2>

				<button
					className="drawer-close"
					onClick={() => setActiveDrawer(null)}
					aria-label="Close drawer"
				>
					×
				</button>
			</div>

			<div className="drawer-content">
				{activeDrawer === 'addBoundary' && (
					<AddBoundaryPanel
						fetchBoundaryResults={fetchBoundaryResults}
						clearBoundaryResults={clearBoundaryResults}
						clearLayers={clearLayers}

						boundaryResults={boundaryResults}
						handlePreviewBoundary={handlePreviewBoundary}
						handleSelectBoundary={handleSelectBoundary}
						selectedBoundaryIds={selectedBoundaryIds}
					/>
				)}

				{activeDrawer === 'manageBoundary' && (
					/*context driven */
					<ManageBoundaryPanel />
				)}

				{activeDrawer === 'addLayers' && (
					<AddLayerPanel
						handleAddLayer={handleAddLayer}
						cachedFeatures={cachedFeatures}
					/>
				)}

				{activeDrawer === 'manageLayers' && (
					/*context driven */
					<ManageLayerPanel />
				)}

				{activeDrawer === 'display' && (
					/*context driven */
					<DisplayPanel />
				)}

				{activeDrawer === 'basemapSwitcher' && (
					/*context driven */
					<BasemapPanel />
				)}
			</div>
		</div>
	);
}

export default Drawer;
