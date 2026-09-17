import { useState } from 'react';

import Modal from '../Modal';

import FormInput from '../components/FormInput/FormInput';

export default function SaveModal({ onClose, onSaveAs }) {
	const [projectName, setProjectName] = useState('');
	const [projectDescription, setProjectDescription] = useState('');

	const [hasTitle, setHasTitle] = useState(true);

	const handleCreate = () => {
		if (!projectName) {
			setHasTitle(false);
			return;
		}

		const name = projectName.trim() || 'Untitled Project';
		const description = projectDescription || '';

		setHasTitle(true);

		onSaveAs(name, description);
	};

	return (
		<Modal title="Save as New Project" onClose={onClose}>
			<section className="modal-section">
				<h3>Project Details</h3>

				<div className="modal-metadata">
					<FormInput
						label="Project Name (required)"
						value={projectName}
						onChange={(e) => setProjectName(e.target.value)}
						placeholder="Untitled Project"
						error={
							!hasTitle
								? 'Please enter a name before saving your project'
								: ''
						}
					/>

					<FormInput
						label="Description"
						type="textarea"
						value={projectDescription}
						onChange={(e) => setProjectDescription(e.target.value)}
						placeholder="Describe your project (optional)"
					/>
				</div>
			</section>

			<section className="modal-actions">
				<button className="secondary-btn" onClick={onClose}>
					Cancel
				</button>

				<button className="primary-btn" onClick={handleCreate}>
					Save Project
				</button>
			</section>
		</Modal>
	);
}
