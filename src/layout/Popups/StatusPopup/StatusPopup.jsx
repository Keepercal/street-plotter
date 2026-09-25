import { useState } from 'react';
import { BarLoader } from 'react-spinners';
import Popup from '../Popup';

/**
 * StatusPopup
 * ----------------
 * Displays application status messages:
 * - loading states
 * - errors
 * - alerts
 */

export default function StatusPopup({
	trigger,
	type,
	title,
	message,
	//onClose,
	drawerOpen,
}) {
	const [rendered, setRendered] = useState(trigger);

	if (trigger && !rendered) setRendered(true);

	if (!rendered) return null;

	return (
		<Popup
			title={title}
			type={type}
			drawerOpen={drawerOpen}
			className={trigger ? '' : 'closing'}
			onAnimationEnd={(e) => {
				if (e.target !== e.currentTarget) return;
				if (!trigger) setRendered(false);
			}}
		>
			{message && <p className={`popup-message ${type}`}>{message}</p>}
			{type === 'loading' && (
				<div className="popup-loader">
					<BarLoader width="100%" />
				</div>
			)}
		</Popup>
	);
}
