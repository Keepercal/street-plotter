import { helpImages } from '../config/helpImages';

export default function DisplaySettingsPage() {
	return (
		<>
			<h2>Display settings</h2>
			<p>
				{__APP_NAME__} comes with settings for customising the
				presentation of the map and date displayed on it.
			</p>
			<h2>Map Content</h2>
			<p>
				You can change how the data is displayed on map by
				<strong> Last Edit</strong> and
				<strong> Heatmap</strong>
			</p>
			<h3>Default</h3>
			<p>
				The default style will how each layer as an individual colour,
				used to differentiate between data when analysing the map.
			</p>

			<h3>By Last Edit</h3>

			<p>
				By Last Edit mode will style the map content based on how much
				time has passed since a user last edited a feature on
				OpenStreetMap. Useful for verifying if the data you are using it
				outdated.
			</p>

			<p>
				The example below shows the time since last edit of some pubs
				within central Bristol.
			</p>

			<img
				src={helpImages.lastEdited}
				alt={`A screenshot of the ${__APP_NAME__} interface showing pubs displayed when they were last edited`}
			/>

			<h3>Heatmap</h3>

			<p>
				The Heatmap mode will draw a heatmap around each feature,
				allowing you to see the density of features within a given area.
				The hotter the colour of the heat map, the more features are
				present within that area.
			</p>

			<p>
				The example below shows the density of pubs in Bristol. Central
				Bristol has a higher density of pubs compared to the outer
				suburbs.
			</p>

			<img
				src={helpImages.heatmap}
				alt={`A screenshot of the ${__APP_NAME__} interface showing pubs displayed as a heatmap`}
			/>
			<h2>Basemap</h2>
			<p>
				There are several different basemaps to choose from which will
				alter how the map appears within your workspace. Here is an
				example of the dark CARTO basemap.
			</p>
			<img
				src={helpImages.basemapExample}
				alt={`A screenshot of the ${__APP_NAME__} interface with the Display drawer open showing a dark basemap`}
			/>
		</>
	);
}
