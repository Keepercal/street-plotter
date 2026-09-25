import './Sidebar.css';

/* UI COMPONENTS */
import SidebarButton from './components/SidebarButton';

/* API imports */
import {
	Map,
	MapPlus,
	LayersPlus,
	Layers,
	MonitorCog,
	ArrowLeftFromLine,
	ArrowRightFromLine,
	PanelLeftClose,
	PanelLeftOpen,
	LayoutDashboard,
	MapPinned,
	Image,
	LayerArrowDown,
	SquareDashed,
	SquareDashedPlus,
} from 'lucide-react';

/* Context */
import { useUIContext } from '@/contexts/UIContext.jsx';
import { useBoundaryContext } from '@/contexts/BoundaryContext.jsx';

/**
 * Sidebar.jsx
 * ------------
 * UI component to toggle data onto map
 *
 * Features:
 * - Select a boundary
 * - Load features from a preselect list
 */
const Sidebar = ({ collapsed, setCollapsed }) => {
	const { activeDrawer, setActiveDrawer } = useUIContext();
	const { hasBoundary } = useBoundaryContext();

	const openDrawer = (name) => {
		setActiveDrawer((prev) => (prev === name ? null : name));
	};

	// Why is the basemap drawer not opening when I click the button on the sidebar?

	return (
		<div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
			<div className="sidebar-content">
				<SidebarButton
					label="Add Boundary"
					alt="Search for a OSM boundary"
					title="Search for a OSM boundary"
					icon={<SquareDashedPlus />}
					isCollapsed={collapsed}
					active={activeDrawer === 'addBoundary'}
					onClick={() => openDrawer('addBoundary')}
				/>

				<SidebarButton
					label="Manage Boundaries"
					alt="Manage boundaries within workspace"
					title="Manage boundaries within workspace"
					icon={<SquareDashed />}
					isCollapsed={collapsed}
					disabled={!hasBoundary}
					active={activeDrawer === 'manageBoundary'}
					onClick={() => openDrawer('manageBoundary')}
				/>

				<SidebarButton
					label="Add Layers"
					alt="Load an OSM feature onto the map"
					title="Load an OSM feature onto the map"
					icon={<LayerArrowDown />}
					isCollapsed={collapsed}
					disabled={!hasBoundary}
					active={activeDrawer === 'addLayers'}
					onClick={() => {
						openDrawer('addLayers');
					}}
				/>

				<SidebarButton
					label="Manage Layers"
					alt="Manage the feature layers within the project"
					title="Manage the feature layers within the project"
					icon={<Layers />}
					isCollapsed={collapsed}
					disabled={!hasBoundary}
					active={activeDrawer === 'manageLayers'}
					onClick={() => {
						openDrawer('manageLayers');
					}}
				/>
				<SidebarButton
					label="Display"
					alt="Alter the display settings of the project"
					title="Alter the display settings of the project"
					icon={<MonitorCog />}
					isCollapsed={collapsed}
					active={activeDrawer === 'display'}
					onClick={() => openDrawer('display')}
				/>
				<SidebarButton
					label="Switch Basemap"
					alt="Switch the basemap within your current workspace"
					title="Switch the basemap within your current workspace"
					icon={<Map />}
					isCollapsed={collapsed}
					active={activeDrawer === 'basemapSwitcher'}
					onClick={() => {
						openDrawer('basemapSwitcher');
					}}
				/>
			</div>

			<button
				className="close-sidebar-button"
				title="Enlarge or collapse the sidebar"
				onClick={() => setCollapsed((prev) => !prev)}
			>
				{collapsed ? (
					<PanelLeftOpen size={18} />
				) : (
					<PanelLeftClose size={18} />
				)}
			</button>
		</div>
	);
};

export default Sidebar;
