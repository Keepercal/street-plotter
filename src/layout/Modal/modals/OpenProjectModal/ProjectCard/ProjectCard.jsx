import './ProjectCard.css';
import { timeAgo } from '@/utils/timeAgo';
import { useState } from 'react';

import { Trash2, Pencil } from 'lucide-react';

export default function ProjectCard({
	project,
	onOpen,
	confirmDelete,
	handleUpdateProject,
}) {
	const [editing, setEditing] = useState(false);

	const [name, setName] = useState(project.metadata.name ?? '');
	const [description, setDescription] = useState(
		project.metadata.description ?? ''
	);

	const [originalName, setOriginalName] = useState(
		project.metadata.name ?? ''
	);
	const [originalDescription, setOriginalDescription] = useState(
		project.metadata.description ?? ''
	);

	const boundaries = project?.data?.boundaries ?? [];

	const startEditing = () => {
		setName(project.metadata.name ?? '');
		setDescription(project.metadata.description ?? '');

		setOriginalName(project.metadata.name ?? '');
		setOriginalDescription(project.metadata.description ?? '');

		setEditing(true);
	};

	const saveChanges = async (projectId) => {
		const trimmedName = name.trim();
		const trimmedDescription = description.trim();

		const nameChanged = trimmedName !== originalName.trim();
		const descriptionChanged =
			trimmedDescription !== originalDescription.trim();

		// Nothing changed
		if (!nameChanged && !descriptionChanged) {
			setEditing(false);
			return;
		}

		// Don't save an empty name
		if (trimmedName.length === 0) {
			return;
		}

		await handleUpdateProject(projectId, {
			name: trimmedName,
			description: trimmedDescription,
		});

		setEditing(false);
	};

	return (
		<div className="project-item">
			<div
				className="project-card"
				onClick={() => {
					if (!editing) {
						onOpen(project.metadata.id);
					}
				}}
			>
				<div className="project-card-content">
					<div className="project-card-main">
						{!editing ? (
							<h3>{project.metadata.name}</h3>
						) : (
							<input
								className="project-name-input"
								value={name}
								autoFocus
								onChange={(event) =>
									setName(event.target.value)
								}
								onKeyDown={(event) => {
									if (event.key === 'Enter') {
										saveChanges(project.metadata.id);
									}

									if (event.key === 'Escape') {
										setEditing(false);
										setName(originalName);
										setDescription(originalDescription);
									}
								}}
							/>
						)}

						{!editing ? (
							project.metadata.description && (
								<p className="project-description">
									{project.metadata.description}
								</p>
							)
						) : (
							<textarea
								className="project-description-input"
								value={description}
								onChange={(event) =>
									setDescription(event.target.value)
								}
							/>
						)}
					</div>

					<div className="project-card-meta">
						<span className="project-boundaries">
							{boundaries[0]?.name}
							{boundaries[1] && `, ${boundaries[1].name}`}
							{boundaries[2] && `, ${boundaries[2].name}`}
							{boundaries.length > 3 &&
								` and ${boundaries.length - 3} others`}
						</span>

						<span className="project-updated">
							<strong>Last edited:</strong>{' '}
							{timeAgo(project?.metadata.modified)}
						</span>
					</div>
				</div>
			</div>

			{editing ? (
				<button
					className="project-card-action save"
					onClick={() => saveChanges(project.metadata.id)}
					aria-label={`Save changes to ${project.metadata.name}`}
				>
					Save
				</button>
			) : (
				<button
					className="project-card-action edit"
					onClick={(event) => {
						event.stopPropagation();
						startEditing();
					}}
					aria-label={`Edit ${project.metadata.name}`}
				>
					<Pencil size={22} />
				</button>
			)}

			<button
				className="project-card-action delete"
				onClick={(event) => {
					event.stopPropagation();
					confirmDelete(project);
				}}
				aria-label={`Delete ${project.metadata.name}`}
			>
				<Trash2 size={22} />
			</button>
		</div>
	);
}
