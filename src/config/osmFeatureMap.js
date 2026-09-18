export const OSM_FEATURE_MAP = {
	// Transport
	public_transport_networks: {
		bus_network: {
			osmKey: 'route',
			osmValue: 'bus',
			label: 'Bus Network',
		},

		railway_network: {
			osmKey: 'route',
			osmValue: 'train',
			label: 'Railway Network',
		},

		ferry_network: {
			osmKey: 'route',
			osmValue: 'ferry',
			label: 'Ferry Network',
		},

		tram_network: {
			osmKey: 'route',
			osmValue: 'tram',
			label: 'Tram Network',
		},
	},

	active_travel_networks: {
		local_cycling_network: {
			osmKey: 'network',
			osmValue: 'lcn',
			label: 'Local Cycling Network',
		},
		local_walking_network: {
			osmKey: 'network',
			osmValue: 'lwn',
			label: 'Local Walking Network',
		},
		national_cycling_network: {
			osmKey: 'network',
			osmValue: 'ncn',
			label: 'National Cycling Network',
		},
	},

	vehicle_highways: {
		motorway: {
			osmKey: 'highway',
			osmValue: 'motorway',
			label: 'Motorways',
		},
		trunk_road: {
			osmKey: 'highway',
			osmValue: 'trunk',
			label: 'Trunk',
		},
		primary_road: {
			osmKey: 'highway',
			osmValue: 'primary',
			label: 'Primary',
		},
		secondary_road: {
			osmKey: 'highway',
			osmValue: 'secondary',
			label: 'Secondary',
		},
		tertiary_road: {
			osmKey: 'highway',
			osmValue: 'tertiary',
			label: 'Tertiary',
		},
		residential_road: {
			osmKey: 'highway',
			osmValue: 'residential',
			label: 'Residential',
		},
		service_road: {
			osmKey: 'highway',
			osmValue: 'service',
			label: 'Service',
		},
		unclassified_road: {
			osmKey: 'highway',
			osmValue: 'unclassified',
			label: 'Unclassified',
		},
	},

	active_travel_highways: {
		path: {
			osmKey: 'highway',
			osmValue: 'path',
			label: 'Paths',
		},
		footway: {
			osmKey: 'highway',
			osmValue: 'footway',
			label: 'Footways',
		},
		shared_footway: {
			osmKey: 'highway',
			osmValue: 'shared_footway',
			label: 'Shared-Use Footways',
		},
		cycleway: {
			osmKey: 'highway',
			osmValue: 'cycleway',
			label: 'Cycle Ways',
		},
		bridleway: {
			osmKey: 'highway',
			osmValue: 'bridleway',
			label: 'Bridleway',
		},
		public_footpath: {
			osmKey: 'designation',
			osmValue: 'public_footpath',
			label: 'Public Rights of Way',
			type: 'way',
		},
		school_street: {
			osmKey: 'traffic_intervention',
			osmValue: 'school_street',
			label: 'School Streets',
		},
	},

	crossings: {
		unmarked_crossing: {
			osmKey: 'crossing',
			osmValue: 'unmarked',
			label: 'Unmarked Crossings',
		},
		zebra_crossing: {
			osmKey: 'crossing_ref',
			osmValue: 'zebra',
			label: 'Zebra',
		},
		parallel_crossing: {
			osmKey: 'crossing_ref',
			osmValue: 'tiger',
			label: 'Parallel',
		},
		pelican_crossing: {
			osmKey: 'crossing_ref',
			osmValue: 'pelican',
			label: 'Pelican',
		},
		puffin_crossing: {
			osmKey: 'crossing_ref',
			osmValue: 'puffin',
			label: 'Puffin',
		},
		toucan_crossing: {
			osmKey: 'crossing_ref',
			osmValue: 'toucan',
			label: 'Toucan',
		},
		pegasus_crossing: {
			osmKey: 'crossing_ref',
			osmValue: 'pegasus',
			label: 'Pegasus (Equestrian)',
		},
	},

	transport: {
		railway_station: {
			osmKey: 'railway',
			osmValue: 'station',
			label: 'Railway Stations',
		},
		bus_station: {
			osmKey: 'amenity',
			osmValue: 'bus_station',
			label: 'Bus Stations',
		},
		bus_stop: {
			osmKey: 'highway',
			osmValue: 'bus_stop',
			label: 'Bus Stops',
		},
		tram_stop: {
			osmKey: 'highway',
			osmValue: 'tram_stop',
			label: 'Tram Stops',
		},
		airport: {
			osmKey: 'aeroway',
			osmValue: 'airport',
			label: 'Airports',
		},
		taxi: {
			osmKey: 'amenity',
			osmValue: 'taxi',
			label: 'Taxis',
			type: 'node',
		},
	},

	cycling: {
		bicycle_parking: {
			osmKey: 'amenity',
			osmValue: 'bicycle_parking',
			label: 'Bicycle Parking',
		},
		bicycle_rental: {
			osmKey: 'amenity',
			osmValue: 'bicycle_rental',
			label: 'Bicycle Rental',
		},
		bicycle_shop: {
			osmKey: 'shop',
			osmValue: 'bicycle',
			label: 'Bicycle Shops',
		},
		bicycle_repair_station: {
			osmKey: 'amenity',
			osmValue: 'bicycle_repair_station',
			label: 'Repair Stations',
		},
	},

	driving: {
		parking: {
			osmKey: 'amenity',
			osmValue: 'parking',
			label: 'Parking',
		},
		fuel: {
			osmKey: 'amenity',
			osmValue: 'fuel',
			label: 'Fuel Stations',
		},
		charging_station: {
			osmKey: 'amenity',
			osmValue: 'charging_station',
			label: 'EV Chargers',
		},
		car_wash: {
			osmKey: 'amenity',
			osmValue: 'car_wash',
			label: 'Car Washes',
		},
		car_rental: {
			osmKey: 'amenity',
			osmValue: 'car_rental',
			label: 'Car Rental',
		},
		car_repair: {
			osmKey: 'shop',
			osmValue: 'car_repair',
			label: 'Repair Garages',
		},
	},

	// Services & civic infrastructure
	emergency: {
		police: {
			osmKey: 'amenity',
			osmValue: 'police',
			label: 'Police',
		},
		fire_station: {
			osmKey: 'amenity',
			osmValue: 'fire_station',
			label: 'Fire Stations',
		},
		ambulance_station: {
			osmKey: 'amenity',
			osmValue: 'ambulance_station',
			label: 'Ambulance Stations',
		},
		emergency_phone: {
			osmKey: 'emergency',
			osmValue: 'phone',
			label: 'Emergency Phones',
		},
		defibrillator: {
			osmKey: 'amenity',
			osmValue: 'defibrillator',
			label: 'Defibrillators',
		},
	},

	healthcare: {
		hospital: {
			osmKey: 'amenity',
			osmValue: 'hospital',
			label: 'Hospitals',
		},
		clinic: {
			osmKey: 'amenity',
			osmValue: 'clinic',
			label: 'Clinics',
		},
		doctors: {
			osmKey: 'amenity',
			osmValue: 'doctors',
			label: 'Doctors',
		},
		dentist: {
			osmKey: 'amenity',
			osmValue: 'dentist',
			label: 'Dentist',
		},
		pharmacy: {
			osmKey: 'amenity',
			osmValue: 'pharmacy',
			label: 'Pharmacies',
		},
		veterinary: {
			osmKey: 'amenity',
			osmValue: 'veterinary',
			label: 'Veterinaries',
		},
	},

	education: {
		school: {
			osmKey: 'amenity',
			osmValue: 'school',
			label: 'Schools',
		},
		college: {
			osmKey: 'amenity',
			osmValue: 'college',
			label: 'Colleges',
		},
		university: {
			osmKey: 'amenity',
			osmValue: 'university',
			label: 'Universities',
		},
		library: {
			osmKey: 'amenity',
			osmValue: 'library',
			label: 'Libraries',
		},
	},

	publicServices: {
		townhall: {
			osmKey: 'amenity',
			osmValue: 'townhall',
			label: 'Town Halls',
		},
		courthouse: {
			osmKey: 'amenity',
			osmValue: 'courthouse',
			label: 'Court Houses',
		},
		post_office: {
			osmKey: 'amenity',
			osmValue: 'post_office',
			label: 'Post Offices',
		},
		community_centre: {
			osmKey: 'amenity',
			osmValue: 'community_centre',
			label: 'Community Centres',
		},
		prison: {
			osmKey: 'amenity',
			osmValue: 'prison',
			label: 'Prisons',
		},
	},

	publicAmenities: {
		atm: {
			osmKey: 'amenity',
			osmValue: 'atm',
			label: 'ATM',
		},
		parcel_locker: {
			osmKey: 'amenity',
			osmValue: 'parcel_locker',
			label: 'Parcel Lockers',
		},
		post_box: {
			osmKey: 'amenity',
			osmValue: 'post_box',
			label: 'Post Boxes',
		},
		toilets: {
			osmKey: 'amenity',
			osmValue: 'toilets',
			label: 'Toilets',
		},
		drinking_water: {
			osmKey: 'amenity',
			osmValue: 'drinking_water',
			label: 'Drinking Water',
		},
		public_telephone: {
			osmKey: 'amenity',
			osmValue: 'telephone',
			label: 'Public Telephones',
		},
	},

	streetFurniture: {
		bench: {
			osmKey: 'amenity',
			osmValue: 'bench',
			label: 'Benches',
		},
		waste_basket: {
			osmKey: 'amenity',
			osmValue: 'waste_basket',
			label: 'Waste Bins',
		},
		recycling_bin: {
			osmKey: 'amenity',
			osmValue: 'recycling',
			label: 'Recycling Bins',
		},
		picnic_site: {
			osmKey: 'amenity',
			osmValue: 'picnic_site',
			label: 'Picnic Sites',
		},
	},

	// Places & everyday destinations
	places: {
		city: {
			osmKey: 'place',
			osmValue: 'city',
			label: 'Cities',
		},
		town: {
			osmKey: 'place',
			osmValue: 'town',
			label: 'Towns',
		},
		village: {
			osmKey: 'place',
			osmValue: 'village',
			label: 'Villages',
		},
		hamlet: {
			osmKey: 'place',
			osmValue: 'hamlet',
			label: 'Hamlets',
		},
	},

	poi: {
		monument: {
			osmKey: 'historic',
			osmValue: 'monument',
			label: 'Monuments',
		},
		place_of_worship: {
			osmKey: 'amenity',
			osmValue: 'place_of_worship',
			label: 'Places of Worship',
		},
		artwork: {
			osmKey: 'tourism',
			osmValue: 'artwork',
			label: 'Artwork',
		},
		memorial: {
			osmKey: 'historic',
			osmValue: 'memorial',
			label: 'Memorial',
		},
	},

	shopping: {
		supermarket: {
			osmKey: 'shop',
			osmValue: 'supermarket',
			label: 'Supermarkets',
		},
		convenience_store: {
			osmKey: 'shop',
			osmValue: 'convenience',
			label: 'Convenience Stores',
			type: 'way',
		},
		marketplace: {
			osmKey: 'amenity',
			osmValue: 'marketplace',
			label: 'Marketplace',
		},
		bakery: {
			osmKey: 'shop',
			osmValue: 'bakery',
			label: 'Bakeries',
		},
		butcher: {
			osmKey: 'shop',
			osmValue: 'butcher',
			label: 'Butchers',
		},
		hairdresser: {
			osmKey: 'shop',
			osmValue: 'hairdresser',
			label: 'Hairdressers',
		},
		greengrocer: {
			osmKey: 'shop',
			osmValue: 'greengrocer',
			label: 'Greengrocers',
		},
		clothes_shop: {
			osmKey: 'shop',
			osmValue: 'clothes',
			label: 'Clothing',
		},
		shoe_shop: {
			osmKey: 'shop',
			osmValue: 'shoes',
			label: 'Shoes',
		},
		book_shop: {
			osmKey: 'shop',
			osmValue: 'books',
			label: 'Books',
		},
		music_shop: {
			osmKey: 'shop',
			osmValue: 'music',
			label: 'Music',
		},
		electronics_shop: {
			osmKey: 'shop',
			osmValue: 'electronics',
			label: 'Electronics',
		},
		diy_shop: {
			osmKey: 'shop',
			osmValue: 'doityourself',
			label: 'DIY',
		},
		hardware_shop: {
			osmKey: 'shop',
			osmValue: 'hardware',
			label: 'Hardware',
		},
		shopping_mall: {
			osmKey: 'shop',
			osmValue: 'mall',
			label: 'Mall',
			type: 'way',
		},
		department_store: {
			osmKey: 'shop',
			osmValue: 'department_store',
			label: 'Department Stores',
		},
		kiosk: {
			osmKey: 'shop',
			osmValue: 'kiosk',
			label: 'Kiosks',
		},
	},

	fooddrink: {
		restaurant: {
			osmKey: 'amenity',
			osmValue: 'restaurant',
			label: 'Restaurants',
		},
		cafe: {
			osmKey: 'amenity',
			osmValue: 'cafe',
			label: 'Cafes',
		},
		fast_food: {
			osmKey: 'amenity',
			osmValue: 'fast_food',
			label: 'Fast Food',
		},
		pub: {
			osmKey: 'amenity',
			osmValue: 'pub',
			label: 'Pubs',
		},
		bar: {
			osmKey: 'amenity',
			osmValue: 'bar',
			label: 'Bars',
		},
	},

	accommodation: {
		hotel: {
			osmKey: 'tourism',
			osmValue: 'hotel',
			label: 'Hotels',
		},
		hostel: {
			osmKey: 'tourism',
			osmValue: 'hostel',
			label: 'Hostels',
		},
		camp_site: {
			osmKey: 'tourism',
			osmValue: 'camp_site',
			label: 'Camp Sites',
		},
		caravan_site: {
			osmKey: 'tourism',
			osmValue: 'caravan_site',
			label: 'Caravan Sites',
		},
	},

	// Leisure & tourism
	leisure: {
		playground: {
			osmKey: 'leisure',
			osmValue: 'playground',
			label: 'Playgrounds',
		},
		park: {
			osmKey: 'leisure',
			osmValue: 'park',
			label: 'Parks',
		},
		garden: {
			osmKey: 'leisure',
			osmValue: 'garden',
			label: 'Gardens',
		},
		dog_park: {
			osmKey: 'leisure',
			osmValue: 'dog_park',
			label: 'Dog Parks',
		},
		fitness_centre: {
			osmKey: 'leisure',
			osmValue: 'fitness_centre',
			label: 'Fitness Centres',
		},
		sports_centre: {
			osmKey: 'leisure',
			osmValue: 'sports_centre',
			label: 'Sports Centres',
		},
		stadium: {
			osmKey: 'leisure',
			osmValue: 'stadium',
			label: 'Stadiums',
		},
		swimming_pool: {
			osmKey: 'leisure',
			osmValue: 'swimming_pool',
			label: 'Swimming Pools',
		},
		pitch: {
			osmKey: 'leisure',
			osmValue: 'pitch',
			label: 'Pitches',
		},
		track: {
			osmKey: 'leisure',
			osmValue: 'track',
			label: 'Tracks',
		},
		nightclub: {
			osmKey: 'amenity',
			osmValue: 'nightclub',
			label: 'Nightclub',
		},
	},

	tourism: {
		museum: {
			osmKey: 'tourism',
			osmValue: 'museum',
			label: 'Museums',
		},
		theatre: {
			osmKey: 'tourism',
			osmValue: 'theatre',
			label: 'Theatre',
			type: 'way',
		},
		attraction: {
			osmKey: 'tourism',
			osmValue: 'attraction',
			label: 'Attractions',
		},
		information: {
			osmKey: 'tourism',
			osmValue: 'information',
			label: 'Information',
		},
		viewpoint: {
			osmKey: 'tourism',
			osmValue: 'viewpoint',
			label: 'Viewpoints',
		},
		zoo: {
			osmKey: 'tourism',
			osmValue: 'zoo',
			label: 'Zoos',
		},
		aquarium: {
			osmKey: 'tourism',
			osmValue: 'aquarium',
			label: 'Aquarium',
		},
	},

	// Physical environment
	landuse: {
		landuse_residential: {
			osmKey: 'landuse',
			osmValue: 'residential',
			label: 'Residential',
		},
		landuse_commercial: {
			osmKey: 'landuse',
			osmValue: 'commercial',
			label: 'Commercial',
		},
		landuse_industrial: {
			osmKey: 'landuse',
			osmValue: 'industrial',
			label: 'Industrial',
		},
		landuse_retail: {
			osmKey: 'landuse',
			osmValue: 'retail',
			label: 'Retail',
		},
		recreation_ground: {
			osmKey: 'landuse',
			osmValue: 'recreation_ground',
			label: 'Recreation Ground',
		},
		farmland: {
			osmKey: 'landuse',
			osmValue: 'farmland',
			label: 'Farmland',
		},
		allotment: {
			osmKey: 'landuse',
			osmValue: 'allotment',
			label: 'Allotment',
		},
		meadow: {
			osmKey: 'landuse',
			osmValue: 'meadow',
			label: 'Meadow',
		},
		orchard: {
			osmKey: 'landuse',
			osmValue: 'orchard',
			label: 'Orchard',
		},
		vineyard: {
			osmKey: 'landuse',
			label: 'Vineyard',
			type: 'way',
		},
		quarry: {
			osmKey: 'landuse',
			label: 'Quarry',
			type: 'way',
		},
		military: {
			osmKey: 'landuse',
			osmValue: 'military',
			label: 'Military',
			type: 'way',
		},
		construction: {
			osmKey: 'landuse',
			osmValue: 'construction',
			label: 'Construction',
			type: 'way',
		},
	},

	buildings: {
		building_residential: {
			osmKey: 'building',
			osmValue: 'residential',
			label: 'Residential',
		},
		building_house: {
			osmKey: 'building',
			osmValue: 'house',
			label: 'House',
		},
		building_apartments: {
			osmKey: 'building',
			osmValue: 'apartments',
			label: 'Apartments',
		},
		building_commercial: {
			osmKey: 'building',
			osmValue: 'commercial',
			label: 'Commercial',
		},
		building_industrial: {
			osmKey: 'building',
			osmValue: 'industrial',
			label: 'Industrial',
		},
		building_retail: {
			osmKey: 'building',
			osmValue: 'retail',
			label: 'Retail',
		},
		office: {
			osmKey: 'building',
			osmValue: 'office',
			label: 'Offices',
		},
		civic: {
			osmKey: 'building',
			osmValue: 'civic',
			label: 'Civic',
			type: 'way',
		},
		government: {
			osmKey: 'building',
			osmValue: 'government',
			label: 'Government',
		},
	},

	naturalFeatures: {
		woodland: {
			osmKey: 'natural',
			osmValue: 'wood',
			label: 'Woodland',
		},
		forest: {
			osmKey: 'landuse',
			osmValue: 'forest',
			label: 'Forest',
		},
		grassland: {
			osmKey: 'natural',
			osmValue: 'grassland',
			label: 'Grassland',
		},
		beach: {
			osmKey: 'natural',
			osmValue: 'beach',
			label: 'Beach',
		},
		water: {
			osmKey: 'natural',
			osmValue: 'water',
			label: 'Water',
		},
		river: {
			osmKey: 'waterway',
			osmValue: 'river',
			label: 'River',
		},
		stream: {
			osmKey: 'waterway',
			osmValue: 'stream',
			label: 'Stream',
		},
		peak: {
			osmKey: 'natural',
			osmValue: 'peak',
			label: 'Peak',
		},
		cliff: {
			osmKey: 'natural',
			osmValue: 'cliff',
			label: 'Cliff',
		},
		cave_entrance: {
			osmKey: 'natural',
			osmValue: 'cave_entrance',
			label: 'Cave',
		},
		tree: {
			osmKey: 'natural',
			osmValue: 'tree',
			label: 'Trees',
		},
	},
};
