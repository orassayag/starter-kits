import apiService from './api.service';

class MovieService {

	constructor() {
		this.requestsList = ['upcoming', 'top_rated', 'popular', 'now_playing'];
	}

	async getMovies(request) {
		const { searchText, pageNumber } = request;
		const randomQuery = parseInt(Math.random() * (this.requestsList.length - 0) + 0);
		const queryURL = searchText ? `search/movie?query=${searchText}` : `movie/${this.requestsList[randomQuery]}`;
		const response = await apiService.request({
			queryURL: queryURL,
			pageNumber: pageNumber,
			language: 'en-US'
		});
		if (!response || response.error || !response.response || !response.response.data) {
			return [];
		}
		return response.response.data;
	}

	async getMovie(movieId) {
		const queryURL = `movie/${movieId}`;
		const response = await apiService.request({
			queryURL: queryURL,
			pageNumber: null,
			language: 'en-US'
		});
		if (!response || response.error || !response.response || !response.response.data) {
			return [];
		}
		return response.response.data;
	}

	async getVideos(movieId) {
		const queryURL = `movie/${movieId}/videos`;
		const response = await apiService.request({
			queryURL: queryURL,
			pageNumber: null,
			language: 'en-US'
		});
		if (!response || response.error || !response.response || !response.response.data) {
			return [];
		}
		return response.response.data;
	}

	async getCredits(movieId) {
		const queryURL = `movie/${movieId}/credits`;
		const response = await apiService.request({
			queryURL: queryURL,
			pageNumber: null,
			language: null
		});
		if (!response || response.error || !response.response || !response.response.data) {
			return [];
		}
		return response.response.data;
	}
}

export default new MovieService();