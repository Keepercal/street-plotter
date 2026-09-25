import { GeoJSON } from 'react-leaflet';

/**
 * BoundaryLayer
 * --------------
 * Renders boundary GeoJSON overlays on the map.
 */
export default function BoundaryLayer({
	boundaries = [],
	previewBoundary = null,
	colour,
	fillOpacity = 0.02,
}) {
	const style = {
		color: colour,
		dashArray: '5, 5',
		weight: 2,
		opacity: 0.55,
		fillOpacity: fillOpacity,
		interactive: false,
	};

	if (previewBoundary) {
		return (
			<GeoJSON
				key={previewBoundary.osm_id}
				data={previewBoundary.geojson}
				style={style}
				pointToLayer={() => null}
			/>
		);
	}

	return (
		<>
			{boundaries.map((boundary) => (
				<GeoJSON
					key={boundary.osm_id}
					data={boundary.geojson}
					style={style}
					pointToLayer={() => null}
				/>
			))}
		</>
	);
}
