import './BoundaryItem.css';

import { Trash2, Plus } from 'lucide-react';

const BoundaryItem = ({
	boundary,
	addButton = false,
	deleteButton = false,
	onPreview,
	onAdd,
	onDelete,
}) => {
	/*const confirmDelete = (project) => {
		if (window.confirm(`Delete project "${project.metadata.name}"?`)) {
			handleDeleteProject(project.metadata.id);
		}
	};*/

	const parts = boundary.display_name.split(', ');

	const name = parts[0];
	const location = parts.slice(1).join(', ');
	const type = boundary.type.charAt(0).toUpperCase() + boundary.type.slice(1);
	return (
		<div className="boundary-item">
			<div
				key={boundary.osm_id}
				className={`boundary-card ${boundary.osm_id ? 'selected' : ''}`}
				onClick={(event) => {
					event.stopPropagation();
					onPreview?.(boundary);
				}}
			>
				<div className="boundary-name">
					{name} <span className="boundary-type">({type})</span>
				</div>

				<div className="boundary-location">{location}</div>
			</div>
			{addButton && (
				<button
					className="boundary-action add"
					onClick={(event) => {
						event.stopPropagation();
						onAdd?.(boundary);
					}}
					aria-label={`Delete boundary${boundary.name}?`}
				>
					<Plus size={22} />
				</button>
			)}
			{deleteButton && (
				<button
					className="boundary-action delete"
					onClick={(event) => {
						event.stopPropagation();
						onDelete?.(boundary);
					}}
					aria-label={`Delete boundary${boundary.name}?`}
				>
					<Trash2 size={22} />
				</button>
			)}
		</div>
	);
};

export default BoundaryItem;
