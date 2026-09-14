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
	LayoutDashboard,
	MapPinned,
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

	return (
		<div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
			<div className="sidebar-content">
				<SidebarButton
					label="Add Boundary"
					title="Search for a OSM boundary"
					icon={<MapPlus />}
					isCollapsed={collapsed}
					active={activeDrawer === 'addBoundary'}
					onClick={() => openDrawer('addBoundary')}
				/>

				<SidebarButton
					label="Manage Boundaries"
					title="Manage boundaries within workspace"
					icon={<LayoutDashboard />}
					isCollapsed={collapsed}
					active={activeDrawer === 'manageBoundary'}
					onClick={() => openDrawer('manageBoundary')}
				/>

				<SidebarButton
					label="Add Layers"
					title="Load an OSM feature onto the map"
					icon={<LayersPlus />}
					isCollapsed={collapsed}
					disabled={!hasBoundary}
					active={activeDrawer === 'addLayers'}
					onClick={() => {
						openDrawer('addLayers');
					}}
				/>

				<SidebarButton
					label="Manage Layers"
					title="Manage the feature layers within the project"
					icon={<MapPinned />}
					isCollapsed={collapsed}
					disabled={!hasBoundary}
					active={activeDrawer === 'manageLayers'}
					onClick={() => {
						openDrawer('manageLayers');
					}}
				/>

				<SidebarButton
					label="Display"
					title="Alter the display settings of the project"
					icon={<MonitorCog />}
					isCollapsed={collapsed}
					active={activeDrawer === 'display'}
					onClick={() => openDrawer('display')}
				/>
			</div>

			<button
				className="close-sidebar-button"
				onClick={() => setCollapsed((prev) => !prev)}
			>
				{collapsed ? (
					<ArrowRightFromLine size={18} />
				) : (
					<ArrowLeftFromLine size={18} />
				)}
			</button>
		</div>
	);
};

export default Sidebar;
