import './FeatureItem.css';
import { Plus, Database } from 'lucide-react';

export default function FeatureItem({
	label,
	onClick,
	isCached,
	disabled = false,
}) {
	return (
		<button className="add-layer-btn" disabled={disabled} onClick={onClick}>
			<Plus size={16} />

			{label}

			{isCached && (
				<>
					<span className="cached-wrapper">
						<Database
							className="cached-icon"
							size={16}
							title="Cached data avaliable"
						/>

						<span className="tooltip">Cached data available</span>
					</span>
				</>
			)}
		</button>
	);
}
