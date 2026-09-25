import './BasemapSwitcher.css';
import BASEMAPS from '@/config/basemaps';

/**
 * BasemapSwitcher
 * ---------------
 * A Google Maps-style basemap switcher.
 * Displays the active basemap as a thumbnail and allows switching layers.
 */

function BasemapSwitcher({ basemap, setBasemap }) {
	return (
		<div className="basemap-options">
			{Object.entries(BASEMAPS).map(([id, layer]) => (
				<button
					key={id}
					className={
						basemap === id
							? 'basemap-option active'
							: 'basemap-option'
					}
					onClick={() => setBasemap(id)}
				>
					{layer.preview && (
						<img src={layer.preview} alt={layer.name} />
					)}

					<span>{layer.name}</span>
				</button>
			))}
		</div>
	);
}

export default BasemapSwitcher;
