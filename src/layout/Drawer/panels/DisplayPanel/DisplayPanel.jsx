import './DisplayPanel.css';
import RadioItem from '../../../../components/RadioItem/RadioItem.jsx';

/* Context */
import { useWorkspaceContext } from '@/contexts/WorkspaceContext.jsx';

const displayModeLabels = {
	default: 'Default',
	lastEdited: 'By Last Edit',
	heatmap: 'Heatmap',
};

/**
 * Display.jsx
 * ------------
 * Change how map layers are presented
 *
 * - Default
 * - Days since last edit
 */
const DisplayPanel = () => {
	const { displayMode, setDisplayMode } = useWorkspaceContext();

	return (
		<div className="panel-body">
			<section className="display-section">
				<h3>Style map content</h3>

				<p className="current-display-indicator">
					Current: {displayModeLabels[displayMode]}
				</p>

				<RadioItem
					label="Default"
					value="default"
					selected={displayMode}
					onChange={setDisplayMode}
				/>

				<RadioItem
					label="By Last Edit"
					value="lastEdited"
					selected={displayMode}
					onChange={setDisplayMode}
				/>
				<RadioItem
					label="Heatmap"
					value="heatmap"
					selected={displayMode}
					onChange={setDisplayMode}
				/>
			</section>
		</div>
	);
};

export default DisplayPanel;
