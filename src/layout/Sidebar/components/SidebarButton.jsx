import './SidebarButton.css';

const SidebarButton = ({
	label,
	title,
	icon,
	isCollapsed,
	active,
	disabled,
	onClick,
}) => (
	<button
		className={`sidebar-button 
            ${active ? 'active' : ''}
            ${disabled ? 'disabled' : ''}
        `}
		title={title}
		disabled={disabled}
		onClick={onClick}
	>
		{icon && <span className="sidebar-button-icon">{icon}</span>}

		{!isCollapsed ? (
			<span className="sidebar-button-label">{label}</span>
		) : (
			<span className="sidebar-button-label"></span>
		)}
	</button>
);

export default SidebarButton;
