import apiService from './api.service';

class MovieService {

	constructor() { }

	async getMovies(getRequest) {
		const { searchText, pageNumber } = getRequest;
		const queryURL = `getMovies?searchText=${searchText ? searchText : ''}&pageNumber=${pageNumber}&itemsPerPage=20`;
		const response = await apiService.getRequest(queryURL);
		if (!response || response.error || !response.response || !response.response.data) {
			return [];
		}
		return response.response.data;
	}

	async getMovie(movieId) {
		const queryURL = `getMovie?movieId=${movieId}`;
		const response = await apiService.getRequest(queryURL);
		if (!response || response.error || !response.response || !response.response.data) {
			return [];
		}
		return response.response.data;
	}

	async getVideos(movieId) {
		const queryURL = `getVideos?movieId=${movieId}`;
		const response = await apiService.getRequest(queryURL);
		if (!response || response.error || !response.response || !response.response.data) {
			return [];
		}
		return response.response.data;
	}

	async getCredits(movieId) {
		const queryURL = `getCredits?movieId=${movieId}`;
		const response = await apiService.getRequest(queryURL);
		if (!response || response.error || !response.response || !response.response.data) {
			return [];
		}
		return response.response.data;
	}

	async createMovie(request) {
		const queryURL = 'createMovie';
		const response = await apiService.postRequest(queryURL, request);
		const results = {
			errorMessage: null,
			data: null
		};
		if (!response) {
			results.errorMessage = 'Empty response from server';
			return results;
		}

		if (response.error) {
			if (response.error.response) {
				results.errorMessage = response.error.response.data;
			}
			else if (response.error.message) {
				results.errorMessage = response.error.message;
			}
			else {
				results.errorMessage = 'Server error';
			}
			return results;
		}
		results.data = response.response.data;
		return response;
	}

	async updateMovie(request) {
		const queryURL = 'updateMovie';
		const response = await apiService.postRequest(queryURL, request);
		const results = {
			errorMessage: null,
			data: null
		};
		if (!response) {
			results.errorMessage = 'Empty response from server';
			return results;
		}

		if (response.error) {
			if (response.error.response) {
				results.errorMessage = response.error.response.data;
			}
			else if (response.error.message) {
				results.errorMessage = response.error.message;
			}
			else {
				results.errorMessage = 'Server error';
			}
			return results;
		}
		results.data = response.response.data;
		return response;
	}
}

export default new MovieService();