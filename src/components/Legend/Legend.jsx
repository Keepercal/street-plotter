import { ageCategories } from '@/config/ageCatagories';
import './Legend.css';

/**
 * Displays a map legend explaining dot colours based on "last edited" age.
 */
function Legend() {
	return (
		<div className="legend">
			<div className="legend-content">
				<h4>Last Edited</h4>

				{ageCategories.map((item) => (
					<div key={item.label} className="legend-item">
						<div
							className="legend-dot"
							style={{
								backgroundColor: item.color,
							}}
						/>

						<span>{item.label}</span>
					</div>
				))}
			</div>
		</div>
	);
}

export default Legend;
