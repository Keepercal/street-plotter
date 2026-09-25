import { SeparatorVertical } from 'lucide-react';
import './InputItem.css';
import { useState } from 'react';

export default function InputItem({
	onSearch,
	clearBoundaryResults,
	setHasSearched,
}) {
	const [boundaryName, setBoundaryName] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevent browser from reloading the page

		const formData = new FormData(e.target); // Read the form data
		const boundaryName = formData.get('boundaryName');

		await onSearch(boundaryName);
		setHasSearched(true);
	};

	const clearResults = () => {
		clearBoundaryResults();
		setHasSearched(false);
		setBoundaryName('');
	};

	return (
		<form className="boundary-form" onSubmit={handleSubmit}>
			<input
				className="input-item"
				name="boundaryName"
				value={boundaryName}
				onChange={(e) => setBoundaryName(e.target.value)}
				placeholder="e.g. Bristol"
				autoComplete="off"
			/>

			<div className="button-row">
				<button className="btn btn-primary" type="submit">
					Search
				</button>
				<button
					className="btn btn-secondary"
					type="button"
					onClick={clearResults}
				>
					Clear Results
				</button>
			</div>
		</form>
	);
}
