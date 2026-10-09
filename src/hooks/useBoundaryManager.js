import { useState, useRef, useEffect } from 'react';
//import osmtogeojson from 'osmtogeojson';

//import { fetchOSMBoundary } from '../services/overpass/overpass';
import searchNomiBoundaries from '../services/nominatim/searchNomiBoundaries';

/**
 * useBoundaryManager
 * ------------------
 * Manages OSM boundary data and its GeoJSON representation.
 *
 * Handles:
 * - Searching Nominatim for boundaries
 * - Loading boundary data via Overpass
 * - Clearing and resetting boundary state
 * - Exporting and restoring boundaries
 */
export default function useBoundaryManager({ onChange = () => {} } = {}) {
	const [boundaryResults, setBoundaryResults] = useState([]);

	const [boundaries, setBoundaries] = useState([]); // stores the current boundaries in the application as an array
	const [previewBoundary, setPreviewBoundary] = useState(null);
	const [previewTrigger, setPreviewTrigger] = useState(0);

	const [status, setStatus] = useState('idle');
	const [error, setError] = useState(null);

	const requestId = useRef(0);

	function markDirty() {
		onChange?.();
	}

	useEffect(() => {}, [boundaries]);

	/** Produce a list of boundaries from Nominatim API from a given input */
	const fetchBoundaryResults = async (userInput) => {
		setBoundaryResults(null);

		const currentId = ++requestId.current;

		if (userInput === 'none') {
			return;
		}

		try {
			const result = await searchNomiBoundaries(userInput); // call API

			if (currentId !== requestId.current) return;

			setBoundaryResults(result); // add results into state
		} catch (error) {
			console.error(error);
			if (currentId !== requestId.current) return;

			setBoundaryResults([]);

			throw error;
		}
	};

	/** Remove all Nominatim boundary results from array */
	const clearBoundaryResults = () => {
		setBoundaryResults([]);
	};

	/*
	 * THIS COMMENTED SECTION OF CODE RETURNS A BOUNDARY RELATION FROM THE OVERPASS API.
	 */

	/* Load boundary by fetching from Overpass API */
	/*const loadBoundary = async (boundaryIDs, boundaryType, boundaryName) => {
		clearBoundaries();

		const currentId = ++requestId.current;

		if (boundaryIDs === 'none') {
			return;
		}

		setStatus('loading');

		try {
			const result = await fetchOSMBoundary(
				// Fetch boundary from Overpass API
				boundaryIDs,
				boundaryType
			);

			if (currentId !== requestId.current) return;

			const geojson = osmtogeojson(result, { meta: true }); // Convert results to geoJSON

			setBoundaryData(result);
			setBoundaryGeojson(geojson);

			setStatus('success');
		} catch (error) {
			if (currentId !== requestId.current) return;

			console.error(error);

			setBoundaryData(null);
			setBoundaryGeojson(null);

			setStatus('error');
			setError(error);
		}
	};*/

	/** Add a single boundary into state */
	const setBoundary = (boundary) => {
		if (!boundary || boundary.osm_id === 'none') {
			return;
		}

		setBoundaries((prev) => {
			if (prev.some((item) => item.osm_id === boundary.osm_id)) {
				return prev;
			}

			return [...prev, boundary];
		});

		setStatus('success');
	};

	/** Remove singular boundary from state */
	const removeBoundary = (osmId) => {
		setBoundaries((prev) =>
			prev.filter((boundary) => boundary.osm_id !== osmId)
		);

		setPreviewBoundary(null);
		markDirty();
	};

	/** Clear all boundaries from state */
	const clearBoundaries = () => {
		setBoundaries([]);
		setPreviewBoundary(null);

		setStatus('idle');
		setError(null);
		markDirty();
	};

	/** Restore a given boundary to state */
	const restoreBoundaries = (boundaries) => {
		requestId.current++;

		if (!boundaries) {
			clearBoundaries();
			return;
		}

		if (!Array.isArray(boundaries)) {
			console.error(
				'[ERROR] restoreBoundaries expected an array:',
				boundaries
			);
			return;
		}

		setBoundaries(boundaries);

		setStatus('success');
		setError(null);
	};

	/** Rerenders the map to focus on the chosen boundary */
	const handlePreviewBoundary = (boundary) => {
		setPreviewBoundary(boundary);
		setPreviewTrigger((t) => t + 1); // trigger map to rerender
	};

	/** Handle boundary selection */
	const handleSelectBoundary = (boundary) => {
		setBoundary(boundary);
		handlePreviewBoundary(null);
		markDirty();
	};

	/** Handle removing a single boundary from state */
	const handleRemoveBoundary = (boundary) => {
		removeBoundary(boundary);
		markDirty();
	};

	return {
		// boundary results
		boundaryResults,
		fetchBoundaryResults,
		clearBoundaryResults,

		// boundary data
		boundaries,
		previewBoundary,
		setPreviewBoundary,
		previewTrigger,

		// boundary handling
		setBoundary,
		removeBoundary,
		clearBoundaries,
		restoreBoundaries,
		handlePreviewBoundary,

		handleSelectBoundary,
		handleRemoveBoundary,

		// status
		status,
		error,
	};
}
