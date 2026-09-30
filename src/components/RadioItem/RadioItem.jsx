import './RadioItem.css';

const RadioItem = ({ label, value, selected, onChange, className = '' }) => (
	<div className={`radio-item ${className}`}>
		<label className={`radio-label ${className}`}>
			<input
				className={`radio-checkbox ${className}`}
				type="radio"
				value={value}
				checked={selected === value}
				onChange={() => onChange(value)}
			/>
			{label}
		</label>
	</div>
);

export default RadioItem;
