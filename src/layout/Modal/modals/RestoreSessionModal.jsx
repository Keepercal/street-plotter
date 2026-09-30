import Modal from '../Modal';

export default function RestoreSessionModal({
	isProject,
	project,
	onRestore,
	onStartNew,
	onClose,
}) {
	const title = isProject
		? `Restore '${project?.metadata?.name ?? 'Project'}'?`
		: 'Restore Unsaved Workspace?';

	const message = isProject
		? 'A previously open project was found. Would you like to restore it?'
		: 'A previous unsaved workspace with data was found. Would you like to restore it?';

	const buttonMessage = isProject ? 'Restore Project' : 'Restore Workspace';

	return (
		<Modal title={title} onClose={onClose} canClose={false}>
			<section className="modal-section">
				<p>{message}</p>

				{isProject && project && (
					<div className="project-details">
						<p>
							<strong>Name:</strong>{' '}
							{project.metadata?.name ?? 'Unnamed Project'}
						</p>

						<p>
							<strong>Description:</strong>{' '}
							{project.metadata?.description ?? 'No description'}
						</p>
					</div>
				)}
			</section>

			<section className="modal-actions">
				<button className="secondary-btn warning" onClick={onStartNew}>
					Start New Workspace
				</button>
				<button className="primary-btn" onClick={onRestore}>
					{buttonMessage}
				</button>
			</section>
		</Modal>
	);
}
