import './LayerFilters.css';
import useFilterData from '../useFilterData.js';
import FilterRow from '../FilterRow/FilterRow.jsx';
import FilterJoin from '../FilterJoin/FilterJoin.jsx';

export default function LayerFilters({ layerID, layer, updateLayerFilters }) {
	const filters = layer.filters ?? [];

	const { tags, getValues } = useFilterData(layer.geojson, filters);

	/* Creates new filter object */
	const addFilter = () => {
		const newFilter = {
			id: crypto.randomUUID(),
			key: '',
			operator: 'equals',
			value: '',
		};

		// Only add join if this is NOT the first filter
		if (filters.length > 0) {
			newFilter.join = 'AND';
		}

		updateLayerFilters(layerID, [...filters, newFilter]);
	};

	const updateFilter = (filterID, changes) => {
		const updatedFilters = filters.map((filter) =>
			filter.id === filterID
				? {
						...filter,
						...changes,
					}
				: filter
		);

		updateLayerFilters(layerID, updatedFilters);
	};

	const removeFilter = (filterID) => {
		const updatedFilters = filters.filter(
			(filter) => filter.id !== filterID
		);

		if (updatedFilters.length > 0) {
			const firstFilter = updatedFilters[0];

			const { join, ...cleanFirstFilter } = firstFilter;

			updatedFilters[0] = cleanFirstFilter;
		}

		updateLayerFilters(layerID, updatedFilters);
	};

	return (
		<div className="layer-filters">
			{filters.map((filter, index) => (
				<div key={filter.id}>
					{index > 0 && (
						<FilterJoin
							filter={filter}
							updateFilter={updateFilter}
						/>
					)}

					<FilterRow
						filter={filter}
						tags={tags}
						getValues={getValues}

						updateFilter={updateFilter}
						removeFilter={removeFilter}
					/>
				</div>
			))}

			<button className="add-filter-btn" onClick={addFilter}>
				+ Add Filter
			</button>
		</div>
	);
}
