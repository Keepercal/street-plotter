/**
 * Generate a colour for feature data, colour will be consistent across projects
 * @param {string} value A given value to generate a colour from
 * @returns {string} A string containing a Hex colour code
 */
const generateLayerColour = (value) => {
	value = String(value ?? '');

	let hash = 0;

	for (let i = 0; i < value.length; i++) {
		hash = value.charCodeAt(i) + ((hash << 5) - hash);
	}

	const colour = (hash & 0x00ffffff).toString(16).padStart(6, '0');

	return `#${colour}`;
};

export default generateLayerColour;
