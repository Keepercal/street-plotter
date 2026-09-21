export default function LicencePage() {
	return (
		<>
			<h2>Licence Information</h2>
			<h3>{__APP_NAME__}</h3>
			<p>
				{__APP_NAME__} is an independent application that provides a
				graphical interface for exploring and exporting OpenStreetMap
				data. It is not affiliated with or endorsed by the OpenStreetMap
				Foundation. The licence for the application is separate from the
				OpenStreetMap data licence.
			</p>
			<p>
				All software, source code, object code, design, functionality, ,
				and other materials contained within this application are the
				intellectual property of Callum Stevens and are protected by
				applicable copyright and intellectual property laws.
			</p>{' '}
			<p>
				You may use this application only for its intended purpose. You
				may not, without prior written permission from Callum Stevens:
			</p>{' '}
			<ul>
				{' '}
				<li>
					Copy, reproduce, or reuse any part of the source code or
					software;
				</li>{' '}
				<li>
					Modify, adapt, or create derivative works from the code;
				</li>{' '}
				<li>Sell, distribute, publish, or sublicense the code;</li>{' '}
				<li>
					Reverse engineer, decompile, or attempt to extract the
					source code; or
				</li>{' '}
				<li>
					Use the code, or any substantial part of it, in another
					application, website, or software product.
				</li>{' '}
			</ul>{' '}
			<p>
				No ownership or intellectual property rights in the software or
				source code are transferred to you by your use of this
				application.
			</p>{' '}
			<p>
				All rights not expressly granted are reserved by Callum Stevens.
			</p>{' '}
			<p>
				Nothing in these Terms limits any rights that cannot legally be
				excluded under applicable UK law.
			</p>
			<h3>OpenStreetMap Data</h3>
			<p>{__APP_NAME__} uses data from OpenStreetMap.</p>
			<p>
				OpenStreetMap data is made available under the{' '}
				<strong>Open Database Licence (ODbL) v1.0</strong>, which allows
				users to copy, distribute, modify, and build upon the data,
				provided that appropriate attribution is given and any publicly
				shared derivative databases are distributed under the same
				licence.
			</p>
			<p>© OpenStreetMap contributors.</p>
			<h3>Third-Party Software</h3>
			<p>
				{__APP_NAME__} makes use of a number of open-source libraries
				and frameworks. These components remain subject to their own
				individual licences.
			</p>
		</>
	);
}
