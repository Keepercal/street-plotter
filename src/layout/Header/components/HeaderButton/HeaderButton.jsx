import './HeaderButton.css';
import { CircleAlert } from 'lucide-react';

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
			{indicator && (
				<div className="header-button-indicator">
					<CircleAlert strokeWidth={3} />
				</div>
			)}
		</button>
	);
}
