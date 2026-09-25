import Modal from '../Modal';

export default function UnsavedChangesModal({ onSave, onDiscard, onClose }) {
	return (
		<Modal title="Unsaved Changes!" onClose={onClose} canClose={false}>
			<section className="modal-section">
				<h3>You have unsaved changes in your workspace.</h3>
				<p>Would you like to save them before continuing?</p>
			</section>

			<section className="modal-actions">
				<button className="secondary-btn" onClick={onClose}>
					Cancel
				</button>

				<button className="primary-btn discard" onClick={onDiscard}>
					Discard Changes
				</button>

				<button className="primary-btn" onClick={onSave}>
					Save & Continue
				</button>
			</section>
		</Modal>
	);
}
