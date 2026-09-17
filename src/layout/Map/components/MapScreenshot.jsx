import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { SimpleMapScreenshoter } from 'leaflet-simple-map-screenshoter';

function buildFileName() {
	const now = new Date();

	const timestamp = [
		String(now.getHours()).padStart(2, '0'),
		String(now.getMinutes()).padStart(2, '0'),
		String(now.getSeconds()).padStart(2, '0'),
	].join('-');

	return `map_screenshot_${timestamp}`;
}

function MapScreenshot({ onReady }) {
	const map = useMap();

	useEffect(() => {
		const screenshotter = new SimpleMapScreenshoter({
			hidden: true,
			mimeType: 'image/png',
			hideElementsWithSelectors: ['.leaflet-control-container'],
		});

		screenshotter.addTo(map);

		const takeScreenshot = async () => {
			try {
				const blob = await screenshotter.takeScreen('blob');

				const url = URL.createObjectURL(blob);

				const link = document.createElement('a');
				link.href = url;
				link.download = `${buildFileName()}.png`;

				document.body.appendChild(link);
				link.click();
				link.remove();

				URL.revokeObjectURL(url);
			} catch (error) {
				console.error('Failed to create map screenshot', error);
			}
		};

		onReady?.(takeScreenshot);

		return () => {
			map.removeControl(screenshotter);
			onReady(null);
		};
	}, [map, onReady]);

	return null;
}

export default MapScreenshot;
