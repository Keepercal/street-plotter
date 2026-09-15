import './HeaderButton.css';

export default function HeaderButton({
	label,
	title,
	icon,
	indicator = false,
	onClick,
	disabled = false,
}) {
	return (
		<button
			className="header-button"
			disabled={disabled}
			onClick={onClick}
			title={title}
		>
			{label}
			{icon}
			{indicator && <span className="header-button-indicator" />}
		</button>
	);
}
