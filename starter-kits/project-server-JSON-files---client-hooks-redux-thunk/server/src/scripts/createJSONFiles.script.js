const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

class CreateJSONFilesScript {

	constructor() {
		this.apiSessionKeys = [
			'dbfb7829607ce1b175a677653a605c89',
			'66c1449d8ae6233eb525fea6c12804a2',
			'cb63a57a17bd4d4e82c0756153fb2a2d',
			'25270d4534da3a6854e80c2670462614',
			'b4c8a16ad84284c8aa58d810a16bae63',
			'2888d57bcc3ca9099f95ba1213227b0e',
			'52fca05f7ac09851e2f8fe07e01ea4e7',
			'beb7557d34cea39a41f9f878b1374dea',
			'29f475eb06d3a6819b94e05edc81e414',
			'b355541587291b4ce090456082ea5565',
			'9f2827992ede14221b162101368004c5',
			'eef6f2fbaef2db948872a07ee06f30cc',
			'07a6022616013ea20c999143162429e7',
			'c39cf777dcc8c4846b709188c2f5cb8a',
			'c88e37723edb24a139bffc56e50e1298',
			'0416020879c836673d5e823fc5042f98',
			'e0d8d809c20f5a1c5452bff8fa83249a'
		];
		this.existingIdsList = [];
		this.distPath = './src/dist/';
		this.maximumIndex = 500000;
		this.minimumIndex = 1;
		this.retriesMaximumCount = 200;
		this.currentRetriesCount = 0;
		this.maximumJSONFilesCount = 250000;
		this.currentJSONFilesCount = 0;
		this.baseAPI = 'https://api.themoviedb.org/3/';
		const headers = {
			'content-type': 'application/json'
		};
		this.serverAPI = axios.create({
			headers: headers
		});
	}

	async run() {
		// Initate.
		this.setProcess();
		// Load all JSON files existing ids.
		await this.loadExistingIds();
		// Fetch JSON files.
		await this.fetchJSONFiles();
	}

	async loadExistingIds() {
		this.logStatus('Scan existing JSON files');
		const files = await fs.readdir(this.distPath);
		this.existingIdsList = files.filter(file => {
			return this.isTypeFile({ fileName: file, fileExtension: 'json' });
		}).map(file => parseInt(file.replace('.json', '')));
	}

	async fetchJSONFiles() {
		this.logStatus('Start Fetch JSON files');
		for (let i = this.minimumIndex; i < this.maximumIndex; i++) {
			await this.fetchJSONFile(i);
		}
		this.logStatus('End Fetch JSON files');
	}

	async fetchJSONFile(movieId) {
		if (this.currentRetriesCount >= this.retriesMaximumCount) {
			throw new Error(`Not found movies over ${this.retriesMaximumCount} times in a row`);
		}

		if (this.currentJSONFilesCount >= this.maximumJSONFilesCount) {
			this.logStatus('Finish');
			process.exit(0);
		}

		this.logStatus(`MovieId: ${movieId} - Start`);
		if (this.existingIdsList.indexOf(movieId) > -1) {
			this.currentRetriesCount = 0;
			this.logStatus(`MovieId: ${movieId} - Already exists`);
			return;
		}
		let isSuccess = true;
		let movie, videos, credits = null;
		movie = await this.getMovie(movieId);
		if (!movie || movie.length <= 0) {
			this.currentRetriesCount++;
			this.logStatus(`MovieId: ${movieId} - Not found`);
			return;
		}
		else {
			this.currentRetriesCount = 0;
			videos = await this.getVideos(movieId);
			credits = await this.getCredits(movieId);
			try {
				await this.saveJSONFile(movie, videos, credits);
				this.currentJSONFilesCount++;
			}
			catch (error) {
				console.log(error);
				isSuccess = false;
			}
		}
		this.logStatus(`MovieId: ${movieId} - ${isSuccess ? 'Success' : 'Failed'}`);
	}

	async saveJSONFile(movie, videos, credits) {
		const { adult, poster_path, budget, genres, homepage, id, imdb_id, original_language, original_title,
			overview, popularity, production_companies, production_countries, release_date, revenue, runtime, spoken_languages,
			status, tagline, title, video, vote_average, vote_count } = movie;
		const videosResults = videos ? videos.results ? videos.results.filter(v => v.site.toLowerCase() === 'youtube').map(v => v) : null : null;
		const youtubeKey = videosResults ? videosResults.length > 0 ? videosResults[0].key : null : null;
		const actorsList = credits ? credits.cast ? credits.cast : null : null;
		const crewsList = credits ? credits.crew ? credits.crew : null : null;
		const movieResult = {
			adult, poster_path, budget, genres, homepage, id, imdb_id, original_language, original_title, overview,
			popularity, production_companies, production_countries, release_date, revenue, runtime, spoken_languages,
			status, tagline, title, video, vote_average, vote_count, youtubeKey, actorsList, crewsList
		};
		const json = JSON.stringify(movieResult);
		await fs.writeFile(`${this.distPath}${id}.json`, json);
	}

	logStatus(text) {
		console.log(`===${text}===`);
	}

	isTypeFile(data) {
		const { fileName, fileExtension } = data;
		const extension = path.extname(fileName);
		if (!extension) {
			throw new Error(`extension not received: ${extension} (1000034)`);
		}
		return extension.toLowerCase() === `.${fileExtension.toLowerCase()}`;
	}

	setProcess() {
		process.on('uncaughtException', (error) => {
			console.log(error);
		});
		process.on('unhandledRejection', (reason, promise) => {
			console.log(reason);
			console.log(promise);
		});
	}

	async request(request) {
		const { queryURL, language } = request;
		const apiKey = `api_key=${this.apiSessionKeys[Math.floor(Math.random() * this.apiSessionKeys.length)]}`;
		const responseResult = {
			response: null,
			error: null
		};
		const query = `${this.baseAPI}${queryURL}${queryURL.indexOf('?') > -1 ? '&' : '?'}${apiKey}${language ? `&language=${language}` : ''}`;
		try {
			console.log(query);
			responseResult.response = await this.serverAPI.get(query);
		} catch (error) {
			if (error) {
				responseResult.error = error;
			}
		}
		return responseResult;
	}

	async getMovie(movieId) {
		const queryURL = `movie/${movieId}`;
		const response = await this.request({
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
		const response = await this.request({
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
		const response = await this.request({
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

new CreateJSONFilesScript().run();