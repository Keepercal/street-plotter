import './CheckboxItem.css';
import { useRef, useEffect } from 'react';

const CheckboxItem = ({
	label,
	checked,
	indeterminate = false,
	disabled = false,
	onChange,
	className = '',
}) => {
	const checkboxRef = useRef(null);

	useEffect(() => {
		if (checkboxRef.current) {
			checkboxRef.current.indeterminate = indeterminate;
		}
	}, [indeterminate]);

	return (
		<div
			className={`checkbox-item ${className} ${disabled ? 'disabled' : ''}`}
		>
			<label className={`checkbox-label ${className}`}>
				<span className="checkbox-wrapper">
					<input
						ref={checkboxRef}
						className="checkbox-input"
						type="checkbox"
						checked={checked}
						disabled={disabled}
						onChange={() => {
							if (!disabled) {
								onChange();
							}
						}}
					/>

					<span className="checkbox-mark"></span>
				</span>

				<span className="checkbox-text">{label}</span>
			</label>
		</div>
	);
};

export default CheckboxItem;
