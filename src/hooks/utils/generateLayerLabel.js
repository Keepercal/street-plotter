/**
 * Creates a label for a layer, adding a number if a duplicate exists.
 * @param {Object} layers An object containing all layers in the workspace
 * @param {string} osmTagValue The tag value of the layer
 * @param {string} osmFeatureLabel The human-readable label of the layer
 * @returns {string} The generated layer label, with a numbered suffix if duplicated
 */
export const generateLayerLabel = (layers, osmTagValue, osmFeatureLabel) => {
	console.log(layers);
	let count = 0;

	for (const id in layers) {
		if (layers[id].osmTagValue === osmTagValue) {
			count++;
		}
	}

	return count === 0 ? osmFeatureLabel : `${osmFeatureLabel} (${count + 1})`;
};
