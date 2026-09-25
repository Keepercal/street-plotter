/* Generate a colour for feature data, colour will be consistent across projects */
const generateLayerColour = (key) => {
	key = String(key ?? '');

	let hash = 0;

	for (let i = 0; i < key.length; i++) {
		hash = key.charCodeAt(i) + ((hash << 5) - hash);
	}

	const colour = (hash & 0x00ffffff).toString(16).padStart(6, '0');

	return `#${colour}`;
};

export default generateLayerColour;
