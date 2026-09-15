import Modal from '../Modal';

export default function RestoreSessionModal({
	isProject,
	onRestore,
	onStartNew,
	onClose,
}) {
	const title = isProject ? 'Restore Project?' : 'Restore Unsaved Workspace?';

	const message = isProject
		? 'A previously open project was found. Would you like to restore it?'
		: 'A previous unsaved workspace with data was found. Would you like to restore it?';

	const buttonMessage = isProject ? 'Restore Project' : 'Restore Workspace';

	return (
		<Modal title={title} onClose={onClose} canClose={false}>
			<section className="modal-section">
				<p>{message}</p>
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
