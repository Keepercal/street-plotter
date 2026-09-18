import './AddBoundaryPanel.css';

import { useState } from 'react';
import { Ghost, GlobeX } from 'lucide-react';
import { BeatLoader } from 'react-spinners';

/* UI Components */
import InputItem from './components/InputItem/InputItem.jsx';
import BoundaryItem from '@/components/BoundaryItem/BoundaryItem.jsx';

const AddBoundaryPanel = ({
	fetchBoundaryResults,
	clearBoundaryResults,

	boundaryResults,
	handleSelectBoundary,
	handlePreviewBoundary,
}) => {
	const [hasSearched, setHasSearched] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const handleSearch = async (...args) => {
		setIsLoading(true);
		setHasSearched(true);
		setError(null);

		try {
			await fetchBoundaryResults(...args);
		} catch (error) {
			setError(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<div className="panel-header">
				<InputItem
					onSearch={handleSearch}
					setHasSearched={setHasSearched}
					clearBoundaryResults={clearBoundaryResults}
				/>
			</div>

			<div className="panel-body">
				{hasSearched ? (
					<div className="boundary-results">
						{isLoading ? (
							<div className="loading-state">
								<BeatLoader
									className="loading-spinner"
									size={30}
									color="rgba(255, 255, 255, 0.65)"
								/>
								<p>Fetching boundaries...</p>
							</div>
						) : error ? (
							<div className="empty-state">
								<GlobeX size={120} />
								{/*<p>
									Could not load any boundaries right now,
									please try again soon...
								</p>*/}
								<p>{error.message}</p>
							</div>
						) : boundaryResults?.length > 0 ? (
							boundaryResults.map((boundary) => (
								<BoundaryItem
									key={boundary.osm_id}
									boundary={boundary}
									addButton={true}
									onPreview={() =>
										handlePreviewBoundary(boundary)
									}
									onAdd={() => handleSelectBoundary(boundary)}
								/>
							))
						) : (
							<div className="empty-state">
								<Ghost size={180} />
								<p>
									Could not find any boundaries with that name
								</p>
							</div>
						)}
					</div>
				) : null}
			</div>
		</>
	);
};

export default AddBoundaryPanel;
