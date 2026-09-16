import './Popup.css';

export default function Popup({
	title,
	type,
	children,
	//onClose,
	drawerOpen,
	className = '',
	onAnimationEnd,
}) {
	return (
		<div
			className={`popup ${type || ''} ${drawerOpen ? 'drawer-open' : ''} ${className}`}
			onAnimationEnd={onAnimationEnd}
		>
			<div className="popup-header">
				<h3 className={`popup-title ${type || ''}`}>{title}</h3>
				{/*<button className="popup-close" onClick={onClose}>
					×
				</button>*/}
			</div>

			<div className="popup-content">{children}</div>
		</div>
	);
}
