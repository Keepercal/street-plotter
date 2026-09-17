const BASEMAPS = {
	carto: {
		name: 'CARTO',
		url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png?key=cb1_33nq_1_546fcbaf7443758ee25faca8',
		attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
		preview: '/streets-dashboard/images/carto.png',
	},
	carto_grey: {
		name: 'CARTO Grey',
		url: 'https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}{r}.png?key=cb1_33nq_1_546fcbaf7443758ee25faca8',
		attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
		preview: '/streets-dashboard/images/carto_grey.png',
	},
	carto_dark: {
		name: 'CARTO Dark',
		url: 'https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png?key=cb1_33nq_1_546fcbaf7443758ee25faca8',
		attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
		preview: '/streets-dashboard/images/carto_dark.png',
	},
	world_topo: {
		name: 'World Topo',
		url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
		attribution: 'Tiles &copy; Esri ',
		preview: '/streets-dashboard/images/world_topo.png',
	},
	openstreetmap: {
		name: 'OpenStreetMap',
		url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
		attribution:
			'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		preview: '/streets-dashboard/images/osm.png',
	},
	satellite: {
		name: 'Satellite',
		url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
		attribution: '&copy; Esri',
		preview: '/streets-dashboard/images/satellite.png',
	},
};

export default BASEMAPS;
