class MovieUtils {

	constructor() { }

	setMovies(moviesList, favoriteMoviesList) {
		if (!moviesList || moviesList.length <= 0) {
			return moviesList;
		}
		for (let i = 0, length = moviesList.length; i < length; i++) {
			const favoriteMovieIndex = favoriteMoviesList.findIndex(movie => parseInt(movie.id) === parseInt(moviesList[i].id));
			moviesList[i].is_favorite = favoriteMovieIndex > -1;
		}
		return moviesList;
	}

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