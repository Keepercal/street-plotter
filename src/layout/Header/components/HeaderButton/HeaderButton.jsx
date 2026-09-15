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
			className="toolbar-button"
			disabled={disabled}
			onClick={onClick}
			title={title}
		>
			{label}
			{icon}
			{indicator && <span className="toolbar-button-indicator" />}
		</button>
	);
}
