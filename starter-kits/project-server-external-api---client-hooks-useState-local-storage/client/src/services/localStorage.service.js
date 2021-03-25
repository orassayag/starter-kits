class LocalStorageService {

	constructor() { }

	setItem(movie) {
		if (!movie) {
			return;
		}
		const existsMovie = this.getItem(movie.id);
		if (existsMovie) {
			return;
		}
		localStorage.setItem(movie.id, JSON.stringify(movie));
	}

	getItem(movieId) {
		if (!movieId) {
			return null;
		}
		const movie = localStorage.getItem(movieId);
		if (!movie) {
			return null;
		}
		return JSON.parse(movie);
	}

	removeItem(movieId) {
		if (!movieId) {
			return;
		}
		localStorage.removeItem(movieId);
	}

	getAllItems() {
		const items = [];
		const keys = Object.keys(localStorage);
		let i = keys.length;
		while (i--) {
			items.push(this.getItem(keys[i]));
		}
		return items;
	}
}

export default new LocalStorageService();