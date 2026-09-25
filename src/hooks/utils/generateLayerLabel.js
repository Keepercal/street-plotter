/* Create label for each layer with a number if it's a duplicate */
export const generateLayerLabel = (layers, osmTagValue, osmFeatureLabel) => {
	let count = 0;

	for (const id in layers) {
		if (layers[id].osmTagValue === osmTagValue) {
			count++;
		}
	}

	return count === 0 ? osmFeatureLabel : `${osmFeatureLabel} (${count + 1})`;
};
