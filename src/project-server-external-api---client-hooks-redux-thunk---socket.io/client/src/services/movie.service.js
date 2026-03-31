import apiService from './api.service';

class MovieService {

	constructor() { }

	async getMovies(request) {
		const { searchText, pageNumber } = request;
		const queryURL = `getMovies?searchText=${searchText ? searchText : ''}&pageNumber=${pageNumber}`;
		const response = await apiService.request(queryURL);
		if (!response || response.error || !response.response || !response.response.data) {
			return [];
		}
		return response.response.data;
	}

	async getMovie(movieId) {
		const queryURL = `getMovie?movieId=${movieId}`;
		const response = await apiService.request(queryURL);
		if (!response || response.error || !response.response || !response.response.data) {
			return [];
		}
		return response.response.data;
	}

	async getVideos(movieId) {
		const queryURL = `getVideos?movieId=${movieId}`;
		const response = await apiService.request(queryURL);
		if (!response || response.error || !response.response || !response.response.data) {
			return [];
		}
		return response.response.data;
	}

	async getCredits(movieId) {
		const queryURL = `getCredits?movieId=${movieId}`;
		const response = await apiService.request(queryURL);
		if (!response || response.error || !response.response || !response.response.data) {
			return [];
		}
		return response.response.data;
	}

	async loadMovies() {
		const queryURL = 'loadMovies';
		const response = await apiService.request(queryURL);
		if (!response || response.error || !response.response || !response.response.data) {
			return [];
		}
		return response.response.data;
	}
}

export default new MovieService();