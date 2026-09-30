import Modal from '../../Modal';
import './RestoreSessionModal.css';

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
					<table className="project-details">
						<tbody>
							<tr>
								<th scope="row">Name</th>
								<td>
									{project.metadata?.name ??
										'Unnamed Project'}
								</td>
							</tr>
							<tr>
								<th scope="row">Description</th>
								<td>
									{project.metadata?.description ??
										'No description'}
								</td>
							</tr>
						</tbody>
					</table>
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
