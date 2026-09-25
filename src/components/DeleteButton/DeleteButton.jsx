import './DeleteButton.css';
import { Trash2 } from 'lucide-react';

export default function DeleteButton({
	label,
	title,
	onClick,
	disabled = false,
}) {
	return (
		<button
			className="delete-boundary-btn"
			title={title}
			disabled={disabled}
			type="button"
			onClick={onClick}
		>
			{/*{icon}{label}*/}
			<Trash2 size={14} />
			{label}
		</button>
	);
}
