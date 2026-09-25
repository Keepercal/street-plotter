import { helpImages } from '../config/helpImages';

export default function ManagingLayersPage() {
	return (
		<>
			<h2>Edit layers</h2>
			<p>
				Within the Manage Layers drawer, you can rename, hide, change
				the colour of and delete layers. You can also delete all layers
				in one button press.
			</p>
			<img
				src={helpImages.manageLayers}
				alt={`A screenshot of the ${__APP_NAME__} interface with the Manage Layers draw open and a Pubs layer active.`}
			/>
			<p>
				{__APP_NAME__} does more than just display OpenStreetMap data.
				Every feature in OpenStreetMap contains data known as "Tags".
				These give a feature more information, for example whether a pub
				is wheelchair accessible.
			</p>
			<img
				src={helpImages.featureTags}
				alt={`A screenshot of the ${__APP_NAME__} interface with the Manage Layers draw open and a Pubs layer 
				active and the feature overview popup for the Foresters Arms pub, showing its tags and metadata.`}
			/>
			<h2>Filter layers</h2>
			<p>
				You can use the Manage Layers panel to filter the data displayed
				on the map based on tags to your liking.
				<br />
				<br />
				Filtering uses a four comparison operators,{' '}
				<strong>EQUALS</strong>,<strong> NOT EQUALS</strong>,{' '}
				<strong>EXISTS</strong> and
				<strong> MISSING</strong>
			</p>
			<dl className="list">
				<dt>EQUALS ( = )</dt>
				<dd>
					Returns results where the selected field or tag exactly
					matches the specified value.
				</dd>

				<dt>NOT EQUALS ( != )</dt>
				<dd>
					Returns results where the selected field or tag does not
					match the specified value.
				</dd>

				<dt>GREATER THAN ( &gt; )</dt>
				<dd>
					Returns results where the selected field or tag is larger
					than a given numerical value
				</dd>

				<dt>GREATER THAN OR EQUAL TO ( &gt;= )</dt>
				<dd>
					Returns results where the selected field or tag is larger
					than or equal to a given numerical value
				</dd>

				<dt>LESS THAN ( &lt; )</dt>
				<dd>
					Returns results where the selected field or tag is smaller
					than a given numerical value
				</dd>

				<dt>LESS THAN OR EQUAL TO ( &lt;= )</dt>
				<dd>
					Returns results where the selected field or tag is smaller
					than or equal to a given numerical value
				</dd>

				<dt>EXISTS</dt>
				<dd>
					Returns results where the selected field or tag is present,
					regardless of its value.
				</dd>

				<dt>MISSING</dt>
				<dd>
					Returns results where the selected field or tag is not
					present.
				</dd>
			</dl>
			<p>
				There are also two join operators when adding multiple filters
				to a layer, <strong>AND</strong> and <strong>OR</strong>.
			</p>

			<dl className="list">
				<dt>AND</dt>
				<dd>
					Returns results that match all of the selected conditions.
				</dd>

				<dt>OR</dt>
				<dd>
					Returns results that match at least one of the selected
					conditions.
				</dd>
			</dl>

			<p>
				Here is the Pubs layer again with a filter applied, showing all
				pubs that have a wheelchair tag equal to yes.
			</p>
			<img
				src={helpImages.wheelchairAccessible}
				alt={`A screenshot of the ${__APP_NAME__} interface showing only the pubs that have a wheelchair tag equal to yes`}
			/>
			<p>
				Or you can show all pubs that are missing the wheelchair tag.
				This is useful for auditing features to find missing tags, and
				adding the information yourself within OpenStreetMap.{' '}
			</p>
			<img
				src={helpImages.wheelchairMissing}
				alt={`A screenshot of the ${__APP_NAME__} interface showing only the pubs that are missing the wheelchair tag`}
			/>
			<p>
				You can add multiple filters using a join operator. In this
				example, I am showing all pubs where wheelchair equals yes and
				an indoor_seating tag exists
			</p>

			<img
				src={helpImages.joinOperation}
				alt={`A screenshot of the ${__APP_NAME__} interface showing only the pubs that are missing the wheelchair tag`}
			/>
		</>
	);
}
