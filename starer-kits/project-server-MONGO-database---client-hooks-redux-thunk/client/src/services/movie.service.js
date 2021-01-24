import apiService from './api.service';

class MovieService {

	constructor() { }

	async getGenres() {
		const queryURL = 'getGenres';
		const response = await apiService.getRequest(queryURL);
		if (!response || response.error || !response.response || !response.response.data) {
			return [];
		}
		return response.response.data;
	}

	isValid(value) {
		if (value && (value === 'N/A' || value.indexOf('--') > -1)) {
			return null;
		}
		return value;
	}

	async getMovies(postRequest) {
		const queryURL = 'getMovies';
		let { searchType, searchText, genres, year, status, production_country,
			original_language, pageNumber, itemsPerPage } = postRequest;
		const request = {
			searchType: searchType,
			searchText: searchText,
			genres: genres.length > 0 ? genres : null,
			year: this.isValid(year),
			status: this.isValid(status),
			production_country: this.isValid(production_country),
			original_language: this.isValid(original_language),
			pageNumber: pageNumber,
			itemsPerPage: itemsPerPage
		};
		const response = await apiService.postRequest(queryURL, request);
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

	async deleteMovie(movieId) {
		const queryURL = 'deleteMovie';
		const response = await apiService.postRequest(queryURL, { id: movieId });
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