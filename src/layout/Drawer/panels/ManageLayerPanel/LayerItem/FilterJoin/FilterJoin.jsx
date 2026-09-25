import './FilterJoin.css';

export default function FilterJoin({ filter, updateFilter }) {
	return (
		<div className="filter-join">
			<select
				value={filter.join ?? 'AND'}
				onChange={(event) =>
					updateFilter(filter.id, {
						join: event.target.value,
					})
				}
			>
				<option value="AND">AND</option>
				<option value="OR">OR</option>
			</select>
		</div>
	);
}
