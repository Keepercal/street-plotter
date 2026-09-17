import { useState, useRef, useEffect } from 'react';
//import osmtogeojson from 'osmtogeojson';

//import { fetchOSMBoundary } from '../services/overpass/overpass';
import searchNomiBoundaries from '../services/nominatim/searchNomiBoundaries';

/**
 * useBoundaryManager
 * -----------
 * Fetches and manages OSM boundary data and its GeoJSON conversion.
 *
 * Handles:
 * - search Nominatim for list of boundaies, clear boundaries
 * - loading boundary using a service from the Overpass API
 * - clearing boundaries
 * - resetting state
 * - exporting and restoring boundaries
 */
export default function useBoundaryManager({
	onChange = () => {},
	setIsDirty,
} = {}) {
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

	/* Produce a list of boundaries from Nominatim from a given input */
	const fetchBoundaryResults = async (userInput) => {
		setBoundaryResults(null);

		const currentId = ++requestId.current;

		if (userInput === 'none') {
			return;
		}

		try {
			const result = await searchNomiBoundaries(userInput);

			if (currentId !== requestId.current) return;

			setBoundaryResults(result);
		} catch (error) {
			if (currentId !== requestId.current) return;
			setBoundaryResults([]);
			console.error(error);
		}
	};

	/* Remove all Nominatim results from array */
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

	/* Add a boundary into array */
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

	/* Remove singular boundary from array */
	const removeBoundary = (osmId) => {
		setBoundaries((prev) =>
			prev.filter((boundary) => boundary.osm_id !== osmId)
		);

		setPreviewBoundary(null);
		setIsDirty(true);
	};

	/* Clear all boundaries from array */
	const clearBoundaries = () => {
		setBoundaries([]);
		setPreviewBoundary(null);

		setStatus('idle');
		setError(null);
		setIsDirty(true);
	};

	/* Restore a given boundary to state */
	const restoreBoundaries = (value) => {
		requestId.current++;

		if (!value) {
			clearBoundaries();
			return;
		}

		if (!Array.isArray(value)) {
			console.error(
				'[ERROR] restoreBoundaries expected an array:',
				value
			);
			return;
		}

		setBoundaries(value);

		setStatus('success');
		setError(null);
	};

	/**
	 * Rerenders the map to focus on the chosen boundary
	 */
	const handlePreviewBoundary = (boundary) => {
		setPreviewBoundary(boundary);
		setPreviewTrigger((t) => t + 1);
	};

	/**
	 * Handle input for boundary search
	 */
	const handleSelectBoundary = (boundaryData) => {
		setBoundary(boundaryData);
		handlePreviewBoundary(null);
		setIsDirty(true);
	};

	/**
	 * Removes a single boundary from the workspace
	 */
	const handleRemoveBoundary = (osmId) => {
		removeBoundary(osmId);
		setIsDirty(true);
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
