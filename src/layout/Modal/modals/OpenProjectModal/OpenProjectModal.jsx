import './OpenProjectModal.css';

import { useEffect } from 'react';

import Modal from '../../Modal';
import ProjectCard from './ProjectCard/ProjectCard';

/**
 * OpenProjectModal
 * ------------
 * Creates a modal with a list of saved projects, allowing the user to open and delete projects.
 */
export default function OpenProjectModal({
	onOpen,
	onClose,
	projects,
	loadProjects,
	handleDeleteProject,
	hasSavedProjects,
	handleUpdateProject,
}) {
	useEffect(() => {
		loadProjects();
	}, [loadProjects]);

	// Prompt user to confirm deletion
	const confirmDelete = (project) => {
		if (window.confirm(`Delete project "${project.metadata.name}"?`)) {
			handleDeleteProject(project.metadata.id);
		}
	};

	return (
		<Modal title="Open Project" onClose={onClose}>
			<section className="modal-section">
				{!hasSavedProjects ? (
					<div className="no-projects">
						<p>No projects have been saved</p>
					</div>
				) : (
					<div className="project-list">
						{projects.map((project) => {
							return (
								<ProjectCard
									key={project.metadata.id}
									project={project}
									onOpen={onOpen}
									confirmDelete={confirmDelete}
									handleUpdateProject={handleUpdateProject}
								/>
							);
						})}
					</div>
				)}
			</section>
		</Modal>
	);
}
