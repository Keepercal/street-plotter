export const FEATURE_MAP = {
	// Transport
	public_transport_networks: {
		bus: {
			tag: 'route',
			label: 'Bus Network',
			type: 'relation',
		},

		train: {
			tag: 'route',
			label: 'Railway Network',
		},

		ferry: {
			tag: 'route',
			label: 'Ferry Network',
		},

		tram: {
			tag: 'route',
			label: 'Tram Network',
		},
	},

	active_travel_networks: {
		lcn: {
			tag: 'network',
			label: 'Local Cycling Network',
			type: 'relation',
		},
		lwn: {
			tag: 'network',
			label: 'Local Walking Network',
			type: 'relation',
		},
		ncn: {
			tag: 'network',
			label: 'National Cycling Network',
			type: 'relation',
		},
	},

	vehicle_highways: {
		motorway: {
			tag: 'highway',
			label: 'Motorways',
			type: 'way',
		},
		trunk: {
			tag: 'highway',
			label: 'Trunk',
			type: 'way',
		},
		primary: {
			tag: 'highway',
			label: 'Primary',
			type: 'way',
		},
		secondary: {
			tag: 'highway',
			label: 'Secondary',
			type: 'way',
		},
		tertiary: {
			tag: 'highway',
			label: 'Tertiary',
			type: 'way',
		},
		residential: {
			tag: 'highway',
			label: 'Residential',
			type: 'way',
		},
		service: {
			tag: 'highway',
			label: 'Service',
			type: 'way',
		},
		unclassified: {
			tag: 'highway',
			label: 'Unclassified',
			type: 'way',
		},
	},

	active_travel_highways: {
		path: {
			tag: 'highway',
			label: 'Paths',
			type: 'way',
		},
		footway: {
			tag: 'highway',
			label: 'Footways',
			type: 'way',
		},
		shared_footway: {
			tag: 'highway',
			label: 'Shared-Use Footways',
			type: 'way',
		},
		cycleway: {
			tag: 'highway',
			label: 'Cycle Ways',
			type: 'way',
		},
		bridleway: {
			tag: 'highway',
			label: 'Bridleway',
			type: 'way',
		},
		public_footpath: {
			tag: 'designation',
			label: 'Public Rights of Way',
			type: 'way',
		},
		school_street: {
			tag: 'traffic_intervention',
			label: 'School Streets',
			type: 'way',
		},
	},

	crossings: {
		unmarked: {
			tag: 'crossing',
			label: 'Unmarked Crossings',
			type: 'node',
		},
		zebra: {
			tag: 'crossing_ref',
			label: 'Zebra',
			type: 'node',
		},
		tiger: {
			tag: 'crossing_ref',
			label: 'Parallel',
			type: 'node',
		},
		pelican: {
			tag: 'crossing_ref',
			label: 'Pelican',
			type: 'node',
		},
		puffin: {
			tag: 'crossing_ref',
			label: 'Puffin',
			type: 'node',
		},
		toucan: {
			tag: 'crossing_ref',
			label: 'Toucan',
			type: 'node',
		},
		pegasus: {
			tag: 'crossing_ref',
			label: 'Pegasus (Equestrian)',
			type: 'node',
		},
	},

	transport: {
		station: {
			tag: 'railway',
			label: 'Railway Stations',
			type: 'node',
		},
		bus_station: {
			tag: 'amenity',
			label: 'Bus Stations',
			type: 'node',
		},
		bus_stop: {
			tag: 'highway',
			label: 'Bus Stops',
			type: 'node',
		},
		tram_stop: {
			tag: 'highway',
			label: 'Tram Stops',
			type: 'node',
		},
		airport: {
			tag: 'aeroway',
			label: 'Airports',
			type: 'way',
		},
		taxi: {
			tag: 'amenity',
			label: 'Taxi Ranks',
			type: 'node',
		},
	},

	cycling: {
		bicycle_parking: {
			tag: 'amenity',
			label: 'Bicycle Parking',
			type: 'way',
		},
		bicycle_rental: {
			tag: 'amenity',
			label: 'Bicycle Rental',
			type: 'way',
		},
		bicycle: {
			tag: 'shop',
			label: 'Bicycle Shops',
			type: 'way',
		},
		bicycle_repair_station: {
			tag: 'amenity',
			label: 'Repair Stations',
			type: 'way',
		},
	},

	driving: {
		parking: {
			tag: 'amenity',
			label: 'Parking',
			type: 'way',
		},
		fuel: {
			tag: 'amenity',
			label: 'Fuel Stations',
			type: 'way',
		},
		charging_station: {
			tag: 'amenity',
			label: 'EV Chargers',
			type: 'node',
		},
		car_wash: {
			tag: 'amenity',
			label: 'Car Washes',
			type: 'way',
		},
		car_rental: {
			tag: 'amenity',
			label: 'Car Rental',
			type: 'way',
		},
		car_repair: {
			tag: 'shop',
			label: 'Garages',
			type: 'way',
		},
	},

	// Services & civic infrastructure
	emergency: {
		police: {
			tag: 'amenity',
			label: 'Police',
			type: 'way',
		},
		fire_station: {
			tag: 'amenity',
			label: 'Fire Stations',
			type: 'way',
		},
		ambulance_station: {
			tag: 'amenity',
			label: 'Ambulance Stations',
			type: 'way',
		},
		phone: {
			tag: 'emergency',
			label: 'Emergency Phones',
			type: 'way',
		},
		defibrillator: {
			tag: 'amenity',
			label: 'Defibrillators',
			type: 'way',
		},
	},

	healthcare: {
		hospital: {
			tag: 'amenity',
			label: 'Hospitals',
			type: 'way',
		},
		clinic: {
			tag: 'amenity',
			label: 'Clinics',
			type: 'way',
		},
		doctors: {
			tag: 'amenity',
			label: 'Doctors',
			type: 'way',
		},
		dentist: {
			tag: 'amenity',
			label: 'Dentist',
			type: 'way',
		},
		pharmacy: {
			tag: 'amenity',
			label: 'Pharmacies',
			type: 'way',
		},
		veterinary: {
			tag: 'amenity',
			label: 'Veterinaries',
			type: 'way',
		},
	},

	education: {
		school: {
			tag: 'amenity',
			label: 'Schools',
			type: 'way',
		},
		college: {
			tag: 'amenity',
			label: 'Colleges',
			type: 'way',
		},
		university: {
			tag: 'amenity',
			label: 'Universities',
			type: 'way',
		},
		library: {
			tag: 'amenity',
			label: 'Libraries',
			type: 'way',
		},
	},

	publicServices: {
		townhall: {
			tag: 'amenity',
			label: 'Town Halls',
			type: 'way',
		},
		courthouse: {
			tag: 'amenity',
			label: 'Court Houses',
			type: 'way',
		},
		post_office: {
			tag: 'amenity',
			label: 'Post Offices',
			type: 'way',
		},
		community_centre: {
			tag: 'amenity',
			label: 'Community Centres',
			type: 'way',
		},
		prison: {
			tag: 'amenity',
			label: 'Prisons',
			type: 'way',
		},
	},

	publicAmenities: {
		atm: {
			tag: 'amenity',
			label: 'ATM',
		},
		parcel_locker: {
			tag: 'amenity',
			label: 'Parcel Lockers',
			type: 'way',
		},
		post_box: {
			tag: 'amenity',
			label: 'Post Boxes',
		},
		toilets: {
			tag: 'amenity',
			label: 'Toilets',
			type: 'node',
		},
		drinking_water: {
			tag: 'amenity',
			label: 'Drinking Water',
			type: 'node',
		},
		telephone: {
			tag: 'amenity',
			label: 'Public Telephones',
		},
	},

	streetFurniture: {
		bench: {
			tag: 'amenity',
			label: 'Benches',
			type: 'node',
		},
		waste_basket: {
			tag: 'amenity',
			label: 'Waste Bins',
			type: 'node',
		},
		recycling: {
			tag: 'amenity',
			label: 'Recycling Bins',
			type: 'node',
		},
		picnic_site: {
			tag: 'amenity',
			label: 'Picnic Tables',
			type: 'node',
		},
	},

	// Places & everyday destinations
	places: {
		city: {
			tag: 'place',
			label: 'Cities',
		},
		town: {
			tag: 'place',
			label: 'Towns',
		},
		village: {
			tag: 'place',
			label: 'Villages',
		},
		hamlet: {
			tag: 'place',
			label: 'Hamlets',
		},
	},

	poi: {
		monument: {
			tag: 'historic',
			label: 'Monuments',
			type: 'way',
		},
		place_of_worship: {
			tag: 'amenity',
			label: 'Places of Worship',
			type: 'way',
		},
		artwork: {
			tag: 'tourism',
			label: 'Artwork',
			type: 'node',
		},
		memorial: {
			tag: 'historic',
			label: 'Memorial',
			type: 'node',
		},
	},

	shopping: {
		supermarket: {
			tag: 'shop',
			label: 'Supermarkets',
			type: 'way',
		},
		convenience: {
			tag: 'shop',
			label: 'Convenience Stores',
			type: 'way',
		},
		commercial: {
			tag: 'amenity',
			label: 'Marketplace',
			type: 'way',
		},
		bakery: {
			tag: 'shop',
			label: 'Bakeries',
			type: 'way',
		},
		butcher: {
			tag: 'shop',
			label: 'Butchers',
			type: 'way',
		},
		hairdresser: {
			tag: 'shop',
			label: 'Hairdressers',
			type: 'way',
		},
		greengrocer: {
			tag: 'shop',
			label: 'Greengrocers',
			type: 'way',
		},
		clothes: {
			tag: 'shop',
			label: 'Clothing',
			type: 'way',
		},
		shoes: {
			tag: 'shop',
			label: 'Shoes',
			type: 'way',
		},
		books: {
			tag: 'shop',
			label: 'Books',
			type: 'way',
		},
		music: {
			tag: 'shop',
			label: 'Music',
			type: 'way',
		},
		electronics: {
			tag: 'shop',
			label: 'Electronics',
			type: 'way',
		},
		doityourself: {
			tag: 'shop',
			label: 'DIY',
			type: 'way',
		},
		hardware: {
			tag: 'shop',
			label: 'Hardware',
			type: 'way',
		},
		mall: {
			tag: 'shop',
			label: 'Mall',
			type: 'way',
		},
		department_store: {
			tag: 'shop',
			label: 'Department Stores',
			type: 'way',
		},
		kiosk: {
			tag: 'shop',
			label: 'Kiosks',
			type: 'way',
		},
	},

	fooddrink: {
		restaurant: {
			tag: 'amenity',
			label: 'Restaurants',
			type: 'way',
		},
		cafe: {
			tag: 'amenity',
			label: 'Cafes',
			type: 'way',
		},
		fast_food: {
			tag: 'amenity',
			label: 'Fast Food',
			type: 'way',
		},
		pub: {
			tag: 'amenity',
			label: 'Pubs',
			type: 'way',
		},
		bar: {
			tag: 'amenity',
			label: 'Bars',
			type: 'way',
		},
	},

	accommodation: {
		hotel: {
			tag: 'tourism',
			label: 'Hotels',
			type: 'way',
		},
		hostel: {
			tag: 'tourism',
			label: 'Hostels',
			type: 'way',
		},
		camp_site: {
			tag: 'tourism',
			label: 'Camp Sites',
			type: 'way',
		},
		caravan_site: {
			tag: 'tourism',
			label: 'Caravan Sites',
			type: 'way',
		},
	},

	// Leisure & tourism
	leisure: {
		playground: {
			tag: 'leisure',
			label: 'Playgrounds',
			type: 'way',
		},
		park: {
			tag: 'leisure',
			label: 'Parks',
			type: 'way',
		},
		garden: {
			tag: 'leisure',
			label: 'Gardens',
			type: 'way',
		},
		dog_park: {
			tag: 'leisure',
			label: 'Dog Parks',
			type: 'way',
		},
		fitness_centre: {
			tag: 'leisure',
			label: 'Fitness Centres',
			type: 'way',
		},
		sports_centre: {
			tag: 'leisure',
			label: 'Sports Centres',
			type: 'way',
		},
		stadium: {
			tag: 'leisure',
			label: 'Stadiums',
			type: 'way',
		},
		swimming_pool: {
			tag: 'leisure',
			label: 'Swimming Pools',
			type: 'way',
		},
		pitch: {
			tag: 'leisure',
			label: 'Pitches',
			type: 'way',
		},
		track: {
			tag: 'leisure',
			label: 'Tracks',
			type: 'way',
		},
		nightclub: {
			tag: 'amenity',
			label: 'Nightclub',
			type: 'way',
		},
	},

	tourism: {
		museum: {
			tag: 'tourism',
			label: 'Museums',
			type: 'way',
		},
		theatre: {
			tag: 'tourism',
			label: 'Theatre',
			type: 'way',
		},
		attraction: {
			tag: 'tourism',
			label: 'Attractions',
			type: 'way',
		},
		information: {
			tag: 'tourism',
			label: 'Information',
			type: 'node',
		},
		viewpoint: {
			tag: 'tourism',
			label: 'Viewpoints',
			type: 'node',
		},
		zoo: {
			tag: 'tourism',
			label: 'Zoos',
			type: 'way',
		},
		aquarium: {
			tag: 'tourism',
			label: 'Aquarium',
			type: 'way',
		},
	},

	// Physical environment
	landuse: {
		residential: {
			tag: 'landuse',
			label: 'Residential',
			type: 'way',
		},
		commercial: {
			tag: 'landuse',
			label: 'Commercial',
			type: 'way',
		},
		industrial: {
			tag: 'landuse',
			label: 'Industrial',
			type: 'way',
		},
		retail: {
			tag: 'landuse',
			label: 'Retail',
			type: 'way',
		},
		recreation_ground: {
			tag: 'landuse',
			label: 'Recreation Ground',
			type: 'way',
		},
		farmland: {
			tag: 'landuse',
			label: 'Farmland',
			type: 'way',
		},
		allotment: {
			tag: 'landuse',
			label: 'Allotment',
			type: 'way',
		},
		meadow: {
			tag: 'landuse',
			label: 'Meadow',
			type: 'way',
		},
		orchard: {
			tag: 'landuse',
			label: 'Orchard',
			type: 'way',
		},
		vineyard: {
			tag: 'landuse',
			label: 'Vineyard',
			type: 'way',
		},
		quarry: {
			tag: 'landuse',
			label: 'Quarry',
			type: 'way',
		},
		military: {
			tag: 'landuse',
			label: 'Military',
			type: 'way',
		},
		construction: {
			tag: 'landuse',
			label: 'Construction',
			type: 'way',
		},
	},

	buildings: {
		residential: {
			tag: 'building',
			label: 'Residential',
			type: 'way',
		},
		house: {
			tag: 'building',
			label: 'House',
			type: 'way',
		},
		apartments: {
			tag: 'building',
			label: 'Apartments',
			type: 'way',
		},
		commercial: {
			tag: 'building',
			label: 'Commercial',
			type: 'way',
		},
		industrial: {
			tag: 'building',
			label: 'Industrial',
			type: 'way',
		},
		retail: {
			tag: 'building',
			label: 'Retail',
			type: 'way',
		},
		office: {
			tag: 'building',
			label: 'Offices',
			type: 'way',
		},
		civic: {
			tag: 'building',
			label: 'Civic',
			type: 'way',
		},
		government: {
			tag: 'building',
			label: 'Government',
			type: 'way',
		},
	},

	naturalFeatures: {
		wood: {
			tag: 'natural',
			label: 'Woodland',
			type: 'way',
		},
		forest: {
			tag: 'landuse',
			label: 'Forest',
			type: 'way',
		},
		grassland: {
			tag: 'natural',
			label: 'Grassland',
			type: 'way',
		},
		beach: {
			tag: 'natural',
			label: 'Beach',
			type: 'way',
		},
		water: {
			tag: 'natural',
			label: 'Water',
			type: 'way',
		},
		river: {
			tag: 'waterway',
			label: 'River',
			type: 'way',
		},
		stream: {
			tag: 'waterway',
			label: 'Stream',
			type: 'way',
		},
		peak: {
			tag: 'natural',
			label: 'Peak',
			type: 'node',
		},
		cliff: {
			tag: 'natural',
			label: 'Cliff',
			type: 'way',
		},
		cave_entrance: {
			tag: 'natural',
			label: 'Cave',
			type: 'node',
		},
		tree: {
			tag: 'natural',
			label: 'Trees',
		},
	},
};
