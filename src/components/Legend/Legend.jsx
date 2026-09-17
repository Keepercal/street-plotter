import './Legend.css';

const legendItems = [
	{
		label: '< 6 months',
		color: '#5ba328',
	},
	{
		label: '6-12 months',
		color: '#e7bb2d',
	},
	{
		label: '+1 years',
		color: '#dd351b',
	},
];

/**
 * Legend
 * ------
 * Displays a map legend explaining dot colours based on "last edited" age.
 */
function Legend() {
	return (
		<div className="legend">
			<div className="legend-content">
				<h4>Last Edited</h4>

				{legendItems.map((item) => (
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
