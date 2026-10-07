export default function LicencePage() {
	return (
		<>
			<h2>Licence Information</h2>

			<h3>{__APP_NAME__}</h3>

			<p>
				{__APP_NAME__} is an independent application that provides a
				graphical interface for exploring and exporting OpenStreetMap
				data. It is not affiliated with, sponsored by, or endorsed by
				the OpenStreetMap Foundation.
			</p>

			<p>
				The licence and terms applicable to the {__APP_NAME__}{' '}
				application are separate from the licence applicable to
				OpenStreetMap data and other third-party materials.
			</p>

			<h3>Software and Intellectual Property</h3>

			<p>
				Except where otherwise stated, the {__APP_NAME__} application,
				including its source code, object code, original design
				elements, and original software functionality, is the
				intellectual property of Callum Stevens and is protected by
				applicable copyright and intellectual property laws.
			</p>

			<p>
				Third-party software, libraries, data, imagery, map tiles,
				fonts, icons, and other materials incorporated into or made
				available through the application may be subject to their own
				licences and intellectual property rights. Nothing in these
				terms claims ownership of such third-party materials.
			</p>

			<h3>Restrictions</h3>

			<p>
				You may use this application for its intended purposes, subject
				to these terms and any applicable third-party licences.
			</p>

			<p>
				Unless you have prior written permission from Callum Stevens, or
				are otherwise permitted by applicable law, you may not:
			</p>

			<ul>
				<li>
					Copy, reproduce, or redistribute the {__APP_NAME__} source
					code or software;
				</li>
				<li>
					Modify, adapt, or create derivative works from the{' '}
					{__APP_NAME__} software;
				</li>
				<li>
					Sell, sublicense, publish, or redistribute the{' '}
					{__APP_NAME__} software or source code;
				</li>
				<li>
					Reverse engineer, decompile, disassemble, or otherwise
					attempt to obtain the source code, except to the extent
					permitted by applicable law;
				</li>
				<li>
					Incorporate the {__APP_NAME__} software or a substantial
					part of its source code into another application, website,
					or software product.
				</li>
			</ul>

			<p>
				No ownership or intellectual property rights in the{' '}
				{__APP_NAME__} software or source code are transferred to you
				through your use of the application.
			</p>

			<p>
				All rights not expressly granted by these terms are reserved by
				Callum Stevens.
			</p>

			<p>
				Nothing in these terms limits or excludes any rights or remedies
				that cannot lawfully be limited or excluded under applicable UK
				law.
			</p>

			<h3>OpenStreetMap Data</h3>

			<p>
				{__APP_NAME__} uses data from OpenStreetMap. OpenStreetMap data
				is provided by the OpenStreetMap contributors.
			</p>

			<p>
				OpenStreetMap data is made available under the{' '}
				<strong>
					Open Data Commons Open Database Licence (ODbL) v1.0
				</strong>
				. The use, copying, modification, and redistribution of
				OpenStreetMap data are subject to the terms of that licence and
				its applicable attribution requirements.
			</p>

			<p>© OpenStreetMap contributors.</p>

			<h3>Third-Party Software</h3>

			<p>
				{__APP_NAME__} makes use of a number of open-source libraries
				and frameworks. These components remain subject to their
				respective licences. The licences for applicable third-party
				components are separate from the licence applicable to the{' '}
				{__APP_NAME__} software.
			</p>
		</>
	);
}
