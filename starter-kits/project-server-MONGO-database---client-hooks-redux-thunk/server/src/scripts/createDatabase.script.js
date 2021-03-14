const fs = require('fs-extra');
const path = require('path');
const mongoose = require('mongoose');
const Actor = require('../models/Actor.model');
const Crew = require('../models/Crew.model');
const Genre = require('../models/Genre.model');
const ProductionCompany = require('../models/ProductionCompany.model');
const Movie = require('../models/Movie.model');
const MovieActor = require('../models/MovieActor.model');
const MovieCrew = require('../models/MovieCrew.model');
const MovieProductionCompany = require('../models/MovieProductionCompany.model');

class CreateDatabaseScript {

	constructor() {
		this.distPath = './src/dist/';
		this.moviesList = [];
		this.lastId = 0;
		this.client = null;
		this.mongoConnectionString = 'mongodb://localhost:27017/moviesDB';
		this.mongoConnectionOptions = {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useCreateIndex: true,
			poolSize: 20,
			socketTimeoutMS: 480000,
			keepAlive: 300000,
			ssl: false,
			sslValidate: false
		};
	}

	async run() {
		await this.validateDatabase();
	}

	async validateDatabase() {
		// Check if the database contains any data. If not, load all the database from JSON files
		// and inject into the mongo database. If it exists, don't do anything except initiate the database.
		await this.createConnection();
		const moviesCount = await mongoose.connection.collection('movies').countDocuments();
		if (moviesCount === 0) {
			this.logStatus('No MongoDB database records. Loading JSON Files.');
			await this.loadJSONFiles();
			await this.injectData();
		}
		else {
			this.logStatus('All set and ready to go.');
		}
	}

	async createConnection() {
		// Connect to the Mongo database.
		this.client = await mongoose.connect(this.mongoConnectionString, this.mongoConnectionOptions)
			.catch(error => { throw new Error(`Failed to connect to MongoDB: ${error} (1000006)`); });
		if (!this.client) {
			throw new Error('Failed to connect to MongoDB: Client is null or empty (1000007)');
		}
		this.logStatus(`Connected successfully to ${this.mongoConnectionString}`);
	}

	async injectData() {
		this.logStatus('Start inject data to MongoDB. This may take a few moments.');
		// Genres.
		const genresItems = [].concat.apply([], this.moviesList.map(movie => movie.genres));
		const genresDistinct = this.removeDuplicates(genresItems, 'id');
		for (let i = 0; i < genresDistinct.length; i++) {
			await new Genre(genresDistinct[i]).save();
		}
		// Production Companies.
		const productionCompaniesItems = [].concat.apply([], this.moviesList.map(movie => movie.production_companies));
		const productionCompaniesDistinct = this.removeDuplicates(productionCompaniesItems, 'id');
		for (let i = 0; i < productionCompaniesDistinct.length; i++) {
			await new ProductionCompany(productionCompaniesDistinct[i]).save();
		}
		// Actors.
		const actorsListItems = [].concat.apply([], this.moviesList.map(movie => movie.actorsList));
		const actorsDistinct = this.removeDuplicates(actorsListItems, 'id');
		for (let i = 0; i < actorsDistinct.length; i++) {
			await new Actor(actorsDistinct[i]).save();
		}
		// Crews.
		const crewsListItems = [].concat.apply([], this.moviesList.map(movie => movie.crewsList));
		const crewsDistinct = this.removeDuplicates(crewsListItems, 'id');
		for (let i = 0; i < crewsDistinct.length; i++) {
			await new Crew(crewsDistinct[i]).save();
		}
		// Relations Collections & Movie.
		for (let i = 0; i < this.moviesList.length; i++) {
			const movie = this.moviesList[i];
			const { id, genres, production_companies, actorsList, crewsList, production_countries, spoken_languages } = movie;
			// Movie Production Company.
			for (let y = 0; y < production_companies.length; y++) {
				await new MovieProductionCompany({
					productionCompanyId: production_companies[y].id,
					movieId: id
				}).save();
			}
			// Movie Actor.
			for (let y = 0; y < actorsList.length; y++) {
				const actor = actorsList[y];
				await new MovieActor({
					actorId: actor.id,
					movieId: id,
					character: actor.character,
					order: actor.order
				}).save();
			}
			// Movie Crew.
			for (let y = 0; y < crewsList.length; y++) {
				const crew = crewsList[y];
				await new MovieCrew({
					crewId: crew.id,
					movieId: id,
					job: crew.job,
					department: crew.department
				}).save();
			}
			// Movie.
			await new Movie({
				...movie,
				genres: genres.map(genre => genre.id),
				production_country: production_countries ? production_countries.length > 0 ? production_countries[0].iso_3166_1 : null : null,
				spoken_language: spoken_languages ? spoken_languages.length > 0 ? spoken_languages[0].iso_639_1 : null : null
			}).save();
		}
		this.logStatus('Finish inject data to MongoDB.');
		this.logStatus('Finish to create the MongoDB database.');
		this.logStatus('All set and ready to go.');
	}

	async loadJSONFiles() {
		this.logStatus('Start load JSON files');
		let files = await fs.readdir(this.distPath);
		files = files.filter(file => {
			return this.isTypeFile({ fileName: file, fileExtension: 'json' });
		});
		for (let i = 0, length = files.length; i < length; i++) {
			const jsonMovie = await fs.readFile(`${this.distPath}${files[i]}`, 'utf-8');
			const movie = JSON.parse(jsonMovie);
			this.moviesList.push(movie);
			const movieId = parseInt(movie.id);
			if (this.lastId < movieId) {
				this.lastId = movieId;
			}
		}
		this.logStatus('Finish load JSON files');
	}

	logStatus(text) {
		console.log(`===${text}===`);
	}

	removeDuplicates(array, fieldName) {
		if (!array || array.length <= 0) {
			return array;
		}
		const result = [];
		const map = new Map();
		for (const item of array) {
			if (!map.has(item[fieldName])) {
				map.set(item[fieldName], true);
				result.push(item);
			}
		}
		return result;
	}

	isTypeFile(data) {
		const { fileName, fileExtension } = data;
		const extension = path.extname(fileName);
		if (!extension) {
			throw new Error(`extension not received: ${extension} (1000034)`);
		}
		return extension.toLowerCase() === `.${fileExtension.toLowerCase()}`;
	}
}

module.exports = new CreateDatabaseScript();