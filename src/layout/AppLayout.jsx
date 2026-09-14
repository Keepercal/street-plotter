import { useState } from 'react';

import Map from './Map/Map.jsx';
import Toolbar from './Toolbar/Toolbar';
import Sidebar from './Sidebar/Sidebar';
import Drawer from './Drawer/Drawer';
import MapFooter from './MapFooter/MapFooter.jsx';
import Legend from '@/components/Legend/Legend.jsx';

import { useBoundaryContext } from '@/contexts/BoundaryContext.jsx';
import { useLayerContext } from '@/contexts/LayerContext.jsx';
import { useWorkspaceContext } from '@/contexts/WorkspaceContext.jsx';
import { useUIContext } from '@/contexts/UIContext.jsx';

import { FEATURE_OPTIONS } from '@/config/featureOptions.js';

export default function AppLayout({ hasBoundary, hasFeatures }) {
	const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

	/* Context */
	const { boundaries, previewBoundary, selectedBoundaryIds } =
		useBoundaryContext();
	const { featureLayers, filteredLayers } = useLayerContext();
	const { basemap, displayMode } = useWorkspaceContext();
	const { focusTrigger, handleScreenshotReady } = useUIContext();

	return (
		<div className="app-layout">
			<header className="app-header">
				<Toolbar />
			</header>

			<div
				className={`app-body ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}
			>
				<Sidebar
					hasBoundary={hasBoundary}
					featureLayers={featureLayers}

					collapsed={sidebarCollapsed}
					setCollapsed={setSidebarCollapsed}
				/>

				<Drawer hasBoundary={hasBoundary} />

				<div className="main-content">
					<div className="map-container">
						{hasFeatures && displayMode === 'lastEdited' && (
							<Legend />
						)}

						<Map
							// boundary
							boundaries={boundaries}
							previewBoundary={previewBoundary}
							boundaryIDs={selectedBoundaryIds}

							// features
							featureLayers={filteredLayers}

							// display settings
							displayMode={displayMode}
							basemap={basemap}
							focusTrigger={focusTrigger}
							onScreenshot={handleScreenshotReady}
						/>
					</div>

					<div className="map-ribbon">
						<MapFooter features={featureLayers} />
					</div>
				</div>
			</div>
		</div>
	);
}
