import './HeaderDropdown.css';

export default function HeaderDropdown({
	label,
	title,
	//icon,
	items,
	isOpen,
	onToggle,
	onItemClick,
}) {
	return (
		<div className="dropdown">
			<button
				className={`dropdown-button ${isOpen ? 'open' : ''}`}
				onClick={onToggle}
				title={title}
			>
				{label}
				<span className={`arrow ${isOpen ? 'rotated' : ''}`}>▸</span>
			</button>

			{isOpen && (
				<div className="dropdown-menu">
					{items.map((item) => (
						<div key={item.id} className="dropdown-item-wrapper">
							{/*{item.icon}*/}
							<button
								className="dropdown-item"
								disabled={item.disabled}
								onClick={(e) => {
									e.stopPropagation();

									if (item.disabled) return;

									onItemClick(item);
								}}
							>
								{item.label}
							</button>

							{/*{item.disabled && (
								<span className="tooltip">Coming soon</span>
							)}*/}
						</div>
					))}
				</div>
			)}
		</div>
	);
}
