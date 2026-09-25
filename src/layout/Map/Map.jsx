import 'leaflet/dist/leaflet.css';
import './Map.css';

import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import { useState, useCallback, useMemo } from 'react';

import BoundaryLayer from './layers/BoundaryLayer';
import FeatureLayer from './layers/FeatureLayer';
import HeatmapLayer from './layers/HeatmapLayer';
import FitBounds from './controls/FitBounds';
import ZoomTracker from './controls/ZoomTracker';
import MapScreenshot from './components/MapScreenshot';

import BASEMAPS from '@/config/basemaps';
import { BRISTOL, UK, GLOBE } from './config/mapDefaults.js';

/**
 * Map
 * ---
 * Main map container that handles:
 * - Basemap switching
 * - Feature rendering
 * - Boundary fitting
 * - Zoom tracking
 */

function Map({
	boundaries,
	previewBoundary,
	previewTrigger,
	boundaryIDs,
	featureLayers,
	displayMode,
	basemap,
	focusTrigger,
	onScreenshot,
}) {
	const geojsons = useMemo(
		() => Array.from(boundaries, (boundary) => boundary.geojson),
		[boundaries]
	);
	const [zoom, setZoom] = useState(13);

	const activeBasemap = BASEMAPS[basemap] ?? BASEMAPS.carto;

	const handleScreenshotReady = useCallback(
		(takeScreenshot) => {
			onScreenshot?.(takeScreenshot);
		},
		[onScreenshot]
	);

	return (
		<>
			<MapContainer
				key={boundaryIDs}
				center={BRISTOL.centre}
				zoom={BRISTOL.zoom}
				minZoom={2}
				zoomControl={false}
				maxBounds={[
					[-90, -Infinity],
					[90, Infinity],
				]}
				maxBoundsViscosity={1.0}
				style={{ height: '100%', width: '100%' }}
			>
				<ZoomControl position="bottomright" />

				<MapScreenshot onReady={handleScreenshotReady} />

				{/* Track zoom level */}
				<ZoomTracker onZoom={setZoom} />

				{/* Basemap tiles */}
				<TileLayer
					key={basemap}
					url={activeBasemap.url}
					attribution={activeBasemap.attribution}
				/>

				{previewBoundary && (
					<>
						<BoundaryLayer
							previewBoundary={previewBoundary}
							colour="blue"
							fillOpacity={0.1}
						/>
						<FitBounds
							boundaries={previewBoundary.geojson}
							trigger={previewTrigger}
						/>
					</>
				)}

				{/* Boundary + auto-fit */}
				{boundaries.length > 0 && (
					<>
						<BoundaryLayer boundaries={boundaries} colour="red" />
						<FitBounds
							boundaries={geojsons}
							trigger={focusTrigger}
						/>
					</>
				)}

				{displayMode === 'heatmap' ? (
					<HeatmapLayer featureLayers={featureLayers} />
				) : (
					<FeatureLayer
						featureLayers={featureLayers}
						zoom={zoom}
						displayMode={displayMode}
					/>
				)}
			</MapContainer>
		</>
	);
}

export default Map;
