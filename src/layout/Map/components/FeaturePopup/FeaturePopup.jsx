import './FeaturePopup.css';
import { Pencil } from 'lucide-react';

import { timeAgo } from '../../../../utils/timeAgo';
import getFeatureName from '../../utils/getFeatureName';
import getFeatureCoords from '../../utils/getFeatureCoords';

export default function FeaturePopup({ feature, exclude }) {
	const props = feature.properties ?? {};

	/* OSM ID parsing */
	const [featureType, osmID] = (feature.id || '').split('/');

	const featureName = getFeatureName(feature);
	const { lat, lon } = getFeatureCoords(feature);

	const formattedDate = new Date(props.timestamp).toLocaleDateString('en-GB');
	const timeAgoText = timeAgo(props.timestamp);

	function capitaliseString(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	return (
		<div>
			<div className="feature-popup-header">
				<div className="feature-popup-id">
					<a
						href={`https://www.openstreetmap.org/${featureType}/${osmID}`}
						target="_blank"
						rel="noopener noreferrer"
						title="Show in OpenStreetMap"
					>
						{/*capitaliseString(featureType)}: {osmID}*/}
						View in OSM
					</a>

					<a
						className="edit-link"
						href={`https://www.openstreetmap.org/edit?${featureType}=${osmID}`}
						target="_blank"
						rel="noopener noreferrer"
						title="Edit in OpenStreetMap"
					>
						<Pencil size={18} />
					</a>
				</div>

				{featureName && <h2>{featureName}</h2>}
			</div>

			<div className="feature-popup-content-header">
				<h3>Tags</h3>
			</div>

			<div className="feature-popup-content">
				<div className="tags-table">
					{Object.entries(props)
						//.filter(([k]) => k !== "name" && !exclude.has(k)) // exclude metadata and name from tags
						.filter(([k]) => !exclude.has(k)) // exclude metadata, include name
						.sort(([a], [b]) => a.localeCompare(b))
						.map(([key, value]) => (
							<div className="tag-row" key={key}>
								<div className="tag-key">{key}</div>
								<div className="tag-value">{String(value)}</div>
							</div>
						))}
				</div>
			</div>

			<div className="feature-popup-footer">
				{props.timestamp && (
					<div
						className="feature-popup-metadata"
						style={{
							fontSize: 12.5,
							opacity: 0.75,
						}}
					>
						<strong>Last edited:</strong> {formattedDate} (
						{timeAgoText})
						<br />
						<strong>Last edited by:</strong>{' '}
						{props.user ? (
							<a
								href={`https://www.openstreetmap.org/user/${props.user}`}
								target="_blank"
								rel="noopener noreferrer"
								title="View user who last edited on OpenStreetMap"
							>
								{props.user}
							</a>
						) : (
							'Unknown'
						)}
						<br />
						<strong>Changeset:</strong>{' '}
						{props.changeset ? (
							<a
								href={`https://www.openstreetmap.org/changeset/${props.changeset}`}
								target="_blank"
								rel="noopener noreferrer"
								title="View changeset on OpenStreetMap"
							>
								#{props.changeset}
							</a>
						) : (
							'Unknown'
						)}
					</div>
				)}

				<h3>
					<a
						href={`https://www.google.com/maps?q=${lat},${lon}`}
						target="_blank"
						rel="noopener noreferrer"
					>
						View in Google Maps
					</a>
				</h3>
			</div>
		</div>
	);
}
