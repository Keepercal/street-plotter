import './ExportButton.css';

import { convertGeoJSON, type ExportFormat } from '@/services/exportFormats';
import { downloadFile } from '@/utils/downloadFile';

interface ExportButtonProps {
	geojson: any;
	format: ExportFormat;
	filename?: string;
}

export default function ExportButton({
	geojson,
	format,
	filename = 'osm-export',
}: ExportButtonProps) {
	function handleExport() {
		const now = new Date();

		const timestamp = [
			String(now.getHours()).padStart(2, '0'),
			String(now.getMinutes()).padStart(2, '0'),
			String(now.getSeconds()).padStart(2, '0'),
		].join('-');

		const convertedData = convertGeoJSON(geojson, format);

		const fileSettings: Record<
			ExportFormat,
			{
				extension: string;
				mime: string;
			}
		> = {
			geojson: {
				extension: 'geojson',
				mime: 'application/geo+json',
			},

			kml: {
				extension: 'kml',
				mime: 'application/vnd.google-earth.kml+xml',
			},

			gpx: {
				extension: 'gpx',
				mime: 'application/gpx+xml',
			},
		};

		downloadFile(
			convertedData,
			`${filename}_${timestamp}.${fileSettings[format].extension}`,
			fileSettings[format].mime
		);
	}

	return (
		<button className="export-btn" onClick={handleExport}>
			Export {format.toUpperCase()}
		</button>
	);
}
