import Brand from '@/components/Brand/Brand';

export default function OverviewPage() {
	const currentYear = new Date().getFullYear();
	return (
		<>
			<Brand />
			<p>
				{__APP_NAME__} is designed for transport planners, engineers,
				GIS analysts, mapping enthusiasts, and anyone interested in
				exploring and working with OpenStreetMap data.
			</p>
			<p>
				Users can search, filter, inspect, and export OpenStreetMap
				features through an intuitive interface. Explore map data by
				location, tags, and feature types without needing to write
				complex queries. Display data by when it was last edited on
				OpenStreetMap, or view the density of features and discover gaps
				in provision with a heatmap overlay.
			</p>
			<p>
				The application makes OpenStreetMap data more accessible for
				professionals and enthusiasts who need to explore geographic
				information quickly. It can support tasks such as data
				discovery, quality checking, analysis, and exporting data for
				use in other mapping tools.
			</p>
			<p>
				All data used by this application is sourced from OpenStreetMap,
				an open map of the world powered by a global community of
				contributors. Data is extracted using the Overpass API.{' '}
				{__APP_NAME__} provides access to OpenStreetMap data and does
				not modify the underlying OSM database.
			</p>
			<p>
				This application is inspired by
				<a href="https://overpass-turbo.eu/"> Overpass Turbo</a>, a
				web-based application which allows users to search OpenStreetMap
				data using custom queries. {__APP_NAME__} provides a more
				user-friendly way to explore OSM data without requiring any
				prior knowledge of scripting.
			</p>
			<p>
				<strong>Disclaimer:</strong> OpenStreetMap data is not 100%
				accurate, and in some instances may be outdated or incorrect.
				Use data with caution.
			</p>

			<h3>© {currentYear} Callum Stevens </h3>
		</>
	);
}
