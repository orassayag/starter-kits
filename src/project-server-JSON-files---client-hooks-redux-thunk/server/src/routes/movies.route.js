const express = require('express');
const fs = require('fs-extra');
const loadJSONFilesScript = require('../scripts/loadJSONFiles.script');

const distPath = './src/dist/';

const validURL = (url) => {
	const pattern = new RegExp('^(https?:\\/\\/)?' + // Protocol.
		'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // Domain name.
		'((\\d{1,3}\\.){3}\\d{1,3}))' + // Or IP (v4) address.
		'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // Port and path.
		'(\\?[;&a-z\\d%_.~+=-]*)?' + // Query string.
		'(\\#[-a-z\\d_]*)?$', 'i'); // Fragment locator.
	return !!pattern.test(url);
};

// Validates that the input string is a valid date formatted as 'mm/dd/yyyy'.
const isValidDate = (date) => {
	date = new Date(date);
	date = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
	// First check for the pattern.
	if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(date)) {
		return false;
	}
	// Parse the date parts to integers.
	const parts = date.split('/');
	const day = parseInt(parts[1], 10);
	const month = parseInt(parts[0], 10);
	const year = parseInt(parts[2], 10);
	// Check the ranges of month and year.
	if (year < 1000 || year > 3000 || month == 0 || month > 12) {
		return false;
	}
	const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	// Adjust for leap years.
	if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
		monthLength[1] = 29;
	}
	// Check the range of the day.
	return day > 0 && day <= monthLength[month - 1];
};

const random = () => {
	const min = 1;
	const max = 34359738368;
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getFormattedDate = (date) => {
	date = new Date(date);
	const year = date.getFullYear();
	let month = (1 + date.getMonth()).toString();
	month = month.length > 1 ? month : '0' + month;
	let day = date.getDate().toString();
	day = day.length > 1 ? day : '0' + day;
	return `${year}-${month}-${day}`;
};

const validateMovie = (body, isCreateMode) => {
	const { poster_path, budget, genres, homepage, imdb_id, original_language, original_title,
		overview, popularity, production_companies, production_countries, release_date, revenue,
		runtime, spoken_languages, status, tagline, title, vote_average, vote_count,
		youtubeKey, actorsList, crewsList } = body;
	if (!Object.prototype.hasOwnProperty.call(body, 'adult')) {
		return '1';
	}
	if (isCreateMode) {
		if (!poster_path) {
			return '2';
		}
	}
	if (isNaN(budget)) {
		return '3';
	}
	if (!genres || genres.length <= 0) {
		return '4';
	}
	if (isCreateMode) {
		if (!homepage) {
			return '5';
		}
	}
	if (homepage) {
		if (!validURL(homepage)) {
			return '6';
		}
	}
	if (!imdb_id) {
		return '7';
	}
	if (!original_language || original_language.length <= 0) {
		return '8';
	}
	if (!original_title) {
		return '9';
	}
	if (!overview) {
		return '10';
	}
	if (isNaN(popularity)) {
		return '11';
	}
	if (!production_companies || production_companies.length <= 0) {
		return '12';
	}
	if (!production_countries || production_countries.length <= 0) {
		return '13';
	}
	if (!release_date) {
		return '14';
	}
	if (!isValidDate(release_date)) {
		return '15';
	}
	if (isNaN(revenue)) {
		return '16';
	}
	if (isNaN(runtime)) {
		return '17';
	}
	if (!spoken_languages || spoken_languages.length <= 0) {
		return '18';
	}
	if (!status) {
		return '19';
	}
	if (!tagline) {
		return '20';
	}
	if (!title) {
		return '21';
	}
	if (!Object.prototype.hasOwnProperty.call(body, 'video')) {
		return '22';
	}
	if (isNaN(vote_average)) {
		return '23';
	}
	if (isNaN(vote_count)) {
		return '24';
	}
	if (!youtubeKey) {
		return '25';
	}
	if (!actorsList || actorsList.length <= 0) {
		return '26';
	}
	if (!crewsList || crewsList.length <= 0) {
		return '27';
	}

	// Validate Actors.
	for (let i = 0, length = actorsList.length; i < length; i++) {
		const actor = actorsList[i];
		if (!actor.character) {
			return '28';
		}
		if (!actor.name) {
			return '29';
		}
		if (isCreateMode) {
			if (!actor.profile_path) {
				return '30';
			}
		}
	}

	// Validate Crews.
	for (let i = 0, length = crewsList.length; i < length; i++) {
		const crew = crewsList[i];
		if (!crew.department) {
			return '31';
		}
		if (!crew.job) {
			return '32';
		}
		if (!crew.name) {
			return '33';
		}
		if (isCreateMode) {
			if (!crew.profile_path) {
				return '34';
			}
		}
	}

	// Validate Productions.
	for (let i = 0, length = production_companies.length; i < length; i++) {
		const productionCompany = production_companies[i];
		if (isCreateMode) {
			if (!productionCompany.logo_path) {
				return '35';
			}
		}
		if (!productionCompany.name) {
			return '36';
		}
	}
	return null;
};

const createMovie = async (body) => {
	let { adult, poster_path, budget, genres, homepage, imdb_id, original_language, original_title,
		overview, popularity, production_companies, production_countries, release_date, revenue,
		runtime, spoken_languages, status, tagline, title, video, vote_average, vote_count,
		youtubeKey, actorsList, crewsList } = body;

	// Convert the data to fit original JSON files standards and structure.
	const id = loadJSONFilesScript.lastId + 1;
	genres = genres.map(genre => { return { id: random(), name: genre }; });
	original_language = original_language[0];
	production_companies = production_companies.map(company => { return { ...company, id: random() }; });
	production_companies.forEach(company => { delete company.errorField; });
	production_countries = production_countries.map(production => { return { iso_3166_1: 'DE', name: production }; });
	release_date = getFormattedDate(release_date);
	spoken_languages = spoken_languages.map(language => { return { iso_639_1: language, name: language }; });
	status = status[0];
	actorsList = actorsList.map(actor => { return { ...actor, id: random(), cast_id: random(), credit_id: '52fe420fc3a36847f8000c83', order: 0 }; });
	crewsList = crewsList.map(crew => { return { ...crew, id: random(), credit_id: '52fe420fc3a36847f8000c83' }; });
	actorsList.forEach(actor => { delete actor.errorField; });
	crewsList.forEach(crew => { delete crew.errorField; });

	const movie = {
		id, adult, poster_path, budget, genres, homepage, imdb_id, original_language, original_title,
		overview, popularity, production_companies, production_countries, release_date, revenue,
		runtime, spoken_languages, status, tagline, title, video, vote_average, vote_count,
		youtubeKey, actorsList, crewsList
	};

	const json = JSON.stringify(movie);
	await fs.writeFile(`${distPath}${id}.json`, json);
	loadJSONFilesScript.moviesList.push(movie);
	loadJSONFilesScript.lastId = movie.id;
};

const updateMovie = async (body) => {
	let { id, adult, poster_path, budget, genres, homepage, imdb_id, original_language, original_title,
		overview, popularity, production_companies, production_countries, release_date, revenue,
		runtime, spoken_languages, status, tagline, title, video, vote_average, vote_count,
		youtubeKey, actorsList, crewsList } = body;

	// Convert the data to fit original JSON files standards and structure.
	genres = genres.map(genre => { return { id: random(), name: genre }; });
	original_language = original_language[0];
	production_companies = production_companies.map(company => { return { ...company, id: random() }; });
	production_companies.forEach(company => { delete company.errorField; });
	production_countries = production_countries.map(production => { return { iso_3166_1: 'DE', name: production }; });
	release_date = getFormattedDate(release_date);
	spoken_languages = spoken_languages.map(language => { return { iso_639_1: 'xx', name: language }; });
	status = status[0];
	actorsList = actorsList.map(actor => { return { ...actor, id: random(), cast_id: random(), credit_id: '52fe420fc3a36847f8000c83', order: 0 }; });
	crewsList = crewsList.map(crew => { return { ...crew, id: random(), credit_id: '52fe420fc3a36847f8000c83' }; });
	actorsList.forEach(actor => { delete actor.errorField; });
	crewsList.forEach(crew => { delete crew.errorField; });

	const movie = {
		id, adult, poster_path, budget, genres, homepage, imdb_id, original_language, original_title,
		overview, popularity, production_companies, production_countries, release_date, revenue,
		runtime, spoken_languages, status, tagline, title, video, vote_average, vote_count,
		youtubeKey, actorsList, crewsList
	};

	const filePath = `${distPath}${id}.json`;
	await fs.remove(filePath);
	const json = JSON.stringify(movie);
	await fs.writeFile(`${distPath}${id}.json`, json);
	const index = loadJSONFilesScript.moviesList.findIndex(m => parseInt(m.id) === parseInt(id));
	loadJSONFilesScript.moviesList.splice(index, 1);
	loadJSONFilesScript.moviesList.push(movie);
};

class MoviesRoute {

	constructor() {

		this.router = express.Router();

		this.router.get('/getMovies', (request, response) => {
			const { searchText, pageNumber, itemsPerPage } = request.query;
			if (!pageNumber || !itemsPerPage) {
				return response.status(500).send('Invalid pageNumber or itemsPerPage');
			}
			const moviesResults = {
				results: loadJSONFilesScript.moviesList,
				page: pageNumber,
				total_pages: 0
			};
			if (searchText) {
				moviesResults.results = moviesResults.results.filter(movie => movie.original_title.indexOf(searchText) > -1);
			}
			moviesResults.total_pages = Math.ceil(moviesResults.results.length / itemsPerPage);
			moviesResults.results = moviesResults.results.slice((pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage);
			moviesResults.results = moviesResults.results.map(movie => {
				return {
					id: movie.id,
					title: movie.title,
					poster_path: movie.poster_path
				};
			});
			return response.status(200).send(moviesResults);
		});

		this.router.get('/getMovie', (request, response) => {
			const { movieId } = request.query;
			if (!movieId) {
				return response.status(500).send('Invalid movieId');
			}
			let movie = loadJSONFilesScript.moviesList.filter(m => parseInt(m.id) === parseInt(movieId));
			movie = movie.length > 0 ? movie[0] : null;
			return response.status(200).send(movie);
		});

		this.router.post('/createMovie', async (request, response) => {
			let result = validateMovie(request.body, true);
			if (result) {
				return response.status(500).send('Error has occurred');
			}
			else {
				// Make sure no movie exists with this name already.
				const movieTitle = request.body.title.toLowerCase();
				if (loadJSONFilesScript.moviesList.findIndex(movie => movie.title.toLowerCase() === movieTitle) > -1) {
					return response.status(500).send('Movie already exists');
				}
				await createMovie(request.body);
				return response.status(200).send('OK');
			}
		});

		this.router.post('/updateMovie', async (request, response) => {
			let result = validateMovie(request.body, false);
			if (result) {
				return response.status(500).send('Error has occurred');
			}
			else {
				// Make sure the movie exists in the database.
				if (loadJSONFilesScript.moviesList.findIndex(movie => parseInt(movie.id) === parseInt(request.body.id)) <= -1) {
					return response.status(500).send('Movie not exists');
				}
				await updateMovie(request.body);
				return response.status(200).send('OK');
			}
		});
	}
}

module.exports = new MoviesRoute();