/* Style/UI */
import './Header.css';
import { Download, CirclePlus, Save, Focus, Camera } from 'lucide-react';

/* Components */
import Brand from '../../components/Brand/Brand';
import HeaderDropdown from './components/HeaderDropdown/HeaderDropdown';
import HeaderButton from './components/HeaderButton/HeaderButton';

/* Hooks */
import { useState, useRef } from 'react';
import { useClickOutside } from './hooks/useClickOutside';

/* Context */
import { useUIContext } from '@/contexts/UIContext.jsx';
import { useWorkspaceContext } from '@/contexts/WorkspaceContext.jsx';
import { useBoundaryContext } from '@/contexts/BoundaryContext.jsx';
import { useLayerContext } from '@/contexts/LayerContext.jsx';

/* Config */
import { menus } from './config/menus';

export default function Header() {
	const { setActiveModal, setFocusTrigger, takeScreenshot } = useUIContext();
	const { isDirty, sessionInfo, handleNewWorkspace, saveCurrentProject } =
		useWorkspaceContext();
	const { hasBoundary } = useBoundaryContext();
	const { featureLayers } = useLayerContext();

	/* Derived */
	const canSave = hasBoundary;
	const canExport = Object.keys(featureLayers).length > 0;
	const isProject = Boolean(sessionInfo.metadata.projectId != null);

	/* States */
	const [openMenu, setOpenMenu] = useState(null);
	const toolbarRef = useRef(null);

	function handleMenuItemClick(item) {
		switch (item.action) {
			case 'save':
				saveCurrentProject();
				break;

			case 'newWorkspace':
				handleNewWorkspace();
				break;

			case 'openProject':
				setActiveModal('openProject');
				break;

			case 'modal':
				setActiveModal(item.modal);
				break;
			case 'reportBug':
				open('https://forms.gle/5RPAsRZC6CRGNkcG9');
				break;
		}

		setOpenMenu(null);
	}

	/* Closes dropdown menu when user clicks anywhere on screen */
	useClickOutside(toolbarRef, () => {
		setOpenMenu(null);
	});

	/* Toggles menu */
	function toggleMenu(id) {
		setOpenMenu((current) => (current === id ? null : id));
	}

	const toolbarMenus = menus.map((menu) => ({
		...menu,
		items: menu.items.map((item) => ({
			...item,
			disabled: item.requires === 'canSave' ? !canSave : item.disabled,
		})),
	}));

	return (
		<div className="header">
			<Brand />

			<div className="header-actions-left" ref={toolbarRef}>
				<HeaderButton
					label="Save"
					title="Save project to file"
					icon={<Save size={18} />}
					indicator={isDirty}
					isProject={isProject}
					disabled={!isDirty || !hasBoundary}
					onClick={saveCurrentProject}
				/>
				<HeaderButton
					label="Export"
					title="Export project as geospatial data format"
					icon={<Download size={18} />}
					disabled={!canExport}
					onClick={() => setActiveModal('export')}
				/>
				{toolbarMenus.map((menu) => (
					<HeaderDropdown
						key={menu.id}
						label={menu.label}
						icon={<CirclePlus size={18} />}
						items={menu.items}
						isOpen={openMenu === menu.id}
						onToggle={() => toggleMenu(menu.id)}
						onItemClick={handleMenuItemClick}
					/>
				))}
			</div>

			<div className="header-actions-right">
				<HeaderButton
					label="Refocus"
					title="Refocus viewport on boundaries within the workspace"
					icon={<Focus size={18} />}
					disabled={!hasBoundary}
					onClick={() => setFocusTrigger((t) => t + 1)}
				/>
				<HeaderButton
					title="Take screenshot of viewport"
					icon={<Camera size={18} />}
					disabled={!takeScreenshot}
					onClick={() => takeScreenshot?.()}
				/>
				{/*<BoundaryIndicator boundaryName={boundaryName} />*/}
				<a
					href="https://github.com/Keepercal/streets-dashboard"
					target="_blank"
					rel="noopener noreferrer"
					className="github-link"
					aria-label="Open GitHub repository"
					title={`Open ${__APP_NAME__} GitHub repository`}
				>
					<img src="./github-mark.svg" alt="GitHub" />
				</a>
			</div>
		</div>
	);
}
