import './BasemapPanel.css';
import BasemapSwitcher from './BasemapSwitcher/BasemapSwitcher.jsx';

/* Context */
import { useWorkspaceContext } from '@/contexts/WorkspaceContext.jsx';

/**
 * BasemapSwitcher
 * ------------
 * Change how map layers are presented
 *
 * - Default
 * - Days since last edit
 */
const BasemapPanel = () => {
	const { basemap, setBasemap } = useWorkspaceContext();

	return (
		<div className="panel-body">
			<section className="display-section">
				<h3>Basemap</h3>

				<BasemapSwitcher basemap={basemap} setBasemap={setBasemap} />
			</section>
		</div>
	);
};

export default BasemapPanel;
