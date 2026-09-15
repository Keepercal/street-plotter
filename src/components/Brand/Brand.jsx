import './Brand.css';

const Brand = () => (
	<div className="brand" href="/">
		<img
			className="brand-logo"
			src="./favicon.svg"
			alt={`${__APP_NAME__} logo`}
		/>
		<div className="brand-text">
			<h2 className="brand-title">
				{__APP_NAME__.split(' ')[0]}
				<br />
				{__APP_NAME__.split(' ').slice(1).join(' ')}
			</h2>
		</div>
	</div>
);

export default Brand;
