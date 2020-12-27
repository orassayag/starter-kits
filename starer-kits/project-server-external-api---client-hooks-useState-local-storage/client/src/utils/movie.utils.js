class MovieUtils {

	constructor() { }

	removeDuplicates(array, fieldName) {
		if (!array || array.length <= 0) {
			return array;
		}
		array = array.filter((thing, index, self) =>
			index === self.findIndex((t) => (
				t[fieldName] === thing[fieldName]
			))
		);
		return array;
	}
}

export default new MovieUtils();