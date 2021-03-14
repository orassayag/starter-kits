const express = require('express');
const Actor = require('../models/Actor.model');
const Crew = require('../models/Crew.model');
const Genre = require('../models/Genre.model');
const ProductionCompany = require('../models/ProductionCompany.model');
const Movie = require('../models/Movie.model');
const MovieActor = require('../models/MovieActor.model');
const MovieCrew = require('../models/MovieCrew.model');
const MovieProductionCompany = require('../models/MovieProductionCompany.model');

const random = () => {
	const min = 999999;
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

const validURL = (url) => {
	const pattern = new RegExp('^(https?:\\/\\/)?' + // Protocol.
		'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // Domain name.
		'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address.
		'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // Port and path.
		'(\\?[;&a-z\\d%_.~+=-]*)?' + // Query string.
		'(\\#[-a-z\\d_]*)?$', 'i'); // Fragment locator.
	return !!pattern.test(url);
};

// Validates that the input string is a valid date formatted as "mm/dd/yyyy".
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
	if (!production_countries || production_countries.length <= 0) {
		return '12';
	}
	if (!release_date) {
		return '13';
	}
	if (!isValidDate(release_date)) {
		return '14';
	}
	if (isNaN(revenue)) {
		return '15';
	}
	if (isNaN(runtime)) {
		return '16';
	}
	if (!spoken_languages || spoken_languages.length <= 0) {
		return '17';
	}
	if (!status) {
		return '18';
	}
	if (!tagline) {
		return '21';
	}
	if (!title) {
		return '22';
	}
	if (!Object.prototype.hasOwnProperty.call(body, 'video')) {
		return '23';
	}
	if (isNaN(vote_average)) {
		return '24';
	}
	if (isNaN(vote_count)) {
		return '25';
	}
	if (!youtubeKey) {
		return '26';
	}

	if (isCreateMode) {
		if (!actorsList || actorsList.length <= 0) {
			return '27';
		}
		if (!crewsList || crewsList.length <= 0) {
			return '28';
		}
		if (!production_companies || production_companies.length <= 0) {
			return '29';
		}

		// Validate Actors.
		for (let i = 0, length = actorsList.length; i < length; i++) {
			const actor = actorsList[i];
			if (!actor.character) {
				return '30';
			}
			if (!actor.name) {
				return '31';
			}
			if (!actor.profile_path) {
				return '32';
			}
		}
		// Validate Crews.
		for (let i = 0, length = crewsList.length; i < length; i++) {
			const crew = crewsList[i];
			if (!crew.department) {
				return '33';
			}
			if (!crew.job) {
				return '34';
			}
			if (!crew.name) {
				return '35';
			}
			if (!crew.profile_path) {
				return '36';
			}
		}
		// Validate Productions.
		for (let i = 0, length = production_companies.length; i < length; i++) {
			const productionCompany = production_companies[i];
			if (!productionCompany.logo_path) {
				return '37';
			}
			if (!productionCompany.name) {
				return '38';
			}
		}
	}
	else {
		const { clientUpdateActorsList, clientAddActorsList, clientUpdateCrewsList,
			clientAddCrewsList, clientUpdateProductionsList, clientAddProductionsList
		} = body;

		// Validate Actors.
		if (clientUpdateActorsList && clientUpdateActorsList.length > 0) {
			for (let i = 0, length = clientUpdateActorsList.length; i < length; i++) {
				const actor = clientUpdateActorsList[i];
				if (!actor.name) {
					return '39';
				}
			}
		}
		if (clientAddActorsList && clientAddActorsList.length > 0) {
			for (let i = 0, length = clientAddActorsList.length; i < length; i++) {
				const actor = clientAddActorsList[i];
				if (!actor.character) {
					return '40';
				}
				if (!actor.name) {
					return '41';
				}
			}
		}

		// Validate Crews.
		if (clientUpdateCrewsList && clientUpdateCrewsList.length > 0) {
			for (let i = 0, length = clientUpdateCrewsList.length; i < length; i++) {
				const crew = clientUpdateCrewsList[i];
				if (!crew.department) {
					return '42';
				}
				if (!crew.job) {
					return '43';
				}
				if (!crew.name) {
					return '44';
				}
			}
		}
		if (clientAddCrewsList && clientAddCrewsList.length > 0) {
			for (let i = 0, length = clientAddCrewsList.length; i < length; i++) {
				const crew = clientAddCrewsList[i];
				if (!crew.department) {
					return '45';
				}
				if (!crew.job) {
					return '46';
				}
				if (!crew.name) {
					return '47';
				}
				if (!crew.profile_path) {
					return '48';
				}
			}
		}

		// Validate Productions.
		if (clientUpdateProductionsList && clientUpdateProductionsList.length > 0) {
			for (let i = 0, length = clientUpdateProductionsList.length; i < length; i++) {
				const productionCompany = clientUpdateProductionsList[i];
				if (!productionCompany.name) {
					return '49';
				}
			}
		}
		if (clientAddProductionsList && clientAddProductionsList.length > 0) {
			for (let i = 0, length = clientAddProductionsList.length; i < length; i++) {
				const productionCompany = clientAddProductionsList[i];
				if (!productionCompany.logo_path) {
					return '50';
				}
				if (!productionCompany.name) {
					return '51';
				}
			}
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
	original_language = original_language[0];
	production_companies.forEach(company => { delete company.errorField; });
	production_countries = production_countries.map(production => { return { iso_3166_1: 'DE', name: production }; });
	release_date = getFormattedDate(release_date);
	spoken_languages = spoken_languages.map(language => { return { iso_639_1: language, name: language }; });
	status = status[0];
	actorsList.forEach(actor => { delete actor.errorField; });
	crewsList.forEach(crew => { delete crew.errorField; });

	// Find all actors, crews, productions by name.
	const actorsText = actorsList.map(actor => actor.name).join('|');
	const crewsText = crewsList.map(crew => crew.name).join('|');
	const productionsText = production_companies.map(production => production.name).join('|');

	const itemsQuery =
		[{ $limit: 1 },
		{
			$facet: {
				'c1': [
					{
						$lookup: {
							from: Actor.collection.name,
							pipeline: [
								{ $match: { name: new RegExp(`^${actorsText}$`, 'i') } }
							],
							as: 'collection1'
						}
					},
					{
						$project: {
							'collection1.id': 1,
							'collection1.name': 1
						}
					}
				],
				'c2': [
					{
						$lookup: {
							from: Crew.collection.name,
							pipeline: [
								{ $match: { name: new RegExp(`^${crewsText}$`, 'i') } }
							],
							as: 'collection2'
						}
					},
					{
						$project: {
							'collection2.id': 1,
							'collection2.name': 1
						}
					}
				],
				'c3': [
					{
						$lookup: {
							from: ProductionCompany.collection.name,
							pipeline: [
								{ $match: { name: new RegExp(`^${productionsText}$`, 'i') } }
							],
							as: 'collection3'
						}
					},
					{
						$project: {
							'collection3.id': 1,
							'collection3.name': 1
						}
					}
				]
			}
		},
		{
			$project: {
				data: {
					$concatArrays: ['$c1', '$c2', '$c3']
				}
			}
		},
		{ $unwind: '$data' },
		{ $replaceRoot: { 'newRoot': '$data' } }
		];

	const result = await Movie.aggregate(itemsQuery);
	const toAddActorsList = [...actorsList];
	const toAddCrewsList = [...crewsList];
	const toAddProductionsList = [...production_companies];
	const removedActorsList = [];
	const removedCrewsList = [];
	const removedProductionsList = [];
	if (result && result.length > 0) {
		if (typeof result[0] !== 'undefined') {
			const keys = Object.keys(result[0].collection1);
			for (let i = 0; i < keys.length; i++) {
				const actorIndex = toAddActorsList.findIndex(a => a.name.trim().toLowerCase() === result[0].collection1[keys[i]].name.trim().toLowerCase());
				if (actorIndex > -1) {
					const existsActor = toAddActorsList.splice(actorIndex, 1)[0];
					existsActor.id = result[0].collection1[keys[i]].id;
					removedActorsList.push(existsActor);
				}
			}
		}
		if (typeof result[1] !== 'undefined') {
			const keys = Object.keys(result[1].collection2);
			for (let i = 0; i < keys.length; i++) {
				const crewIndex = toAddCrewsList.findIndex(a => a.name.trim().toLowerCase() === result[1].collection2[keys[i]].name.trim().toLowerCase());
				if (crewIndex > -1) {
					const existsCrew = toAddCrewsList.splice(crewIndex, 1)[0];
					existsCrew.id = result[1].collection2[keys[i]].id;
					removedCrewsList.push(existsCrew);
				}
			}
		}
		if (typeof result[2] !== 'undefined') {
			const keys = Object.keys(result[2].collection3);
			for (let i = 0; i < keys.length; i++) {
				const productionIndex = toAddProductionsList.findIndex(a => a.name.trim().toLowerCase() === result[2].collection3[keys[i]].name.trim().toLowerCase());
				if (productionIndex > -1) {
					const existsProduction = toAddProductionsList.splice(productionIndex, 1)[0];
					existsProduction.id = result[2].collection3[keys[i]].id;
					removedProductionsList.push(existsProduction);
				}
			}
		}
	}

	// If exists, don't add them.
	if (toAddActorsList.length > 0) {
		for (let i = 0; i < toAddActorsList.length; i++) {
			toAddActorsList[i].id = random();
		}
		await Actor.insertMany(toAddActorsList);
	}
	if (toAddCrewsList.length > 0) {
		for (let i = 0; i < toAddCrewsList.length; i++) {
			toAddCrewsList[i].id = random();
		}
		await Crew.insertMany(toAddCrewsList);
	}
	if (toAddProductionsList.length > 0) {
		for (let i = 0; i < toAddProductionsList.length; i++) {
			toAddProductionsList[i].id = random();
		}
		await ProductionCompany.insertMany(toAddProductionsList);
	}

	const movieId = random();

	// Add the movie itself.
	await new Movie({
		id: movieId,
		adult: adult,
		poster_path: poster_path,
		budget: budget,
		genres: genres,
		homepage: homepage,
		imdb_id: imdb_id,
		original_language: original_language,
		original_title: original_title,
		overview: overview,
		popularity: popularity,
		production_country: production_countries[0].name,
		release_date: new Date(release_date),
		revenue: revenue,
		runtime: runtime,
		spoken_language: spoken_languages[0].name,
		status: status,
		tagline: tagline,
		title: title,
		video: video,
		vote_average: vote_average,
		vote_count: vote_count,
		youtubeKey: youtubeKey
	}).save();

	// Add relations tables.
	const fullActorsList = [...toAddActorsList, ...removedActorsList];
	const fullCrewsList = [...toAddCrewsList, ...removedCrewsList];
	const fullProductionsList = [...toAddProductionsList, ...removedProductionsList];

	const movieActorsList = fullActorsList.map(a => {
		return {
			actorId: a.id,
			movieId: movieId,
			character: a.character,
			order: a.order
		};
	});

	const movieCrewsList = fullCrewsList.map(c => {
		return {
			crewId: c.id,
			movieId: movieId,
			job: c.job,
			department: c.department
		};
	});

	const movieProductionsList = fullProductionsList.map(p => {
		return {
			productionCompanyId: p.id,
			movieId: movieId
		};
	});

	await MovieActor.insertMany(movieActorsList);
	await MovieCrew.insertMany(movieCrewsList);
	await MovieProductionCompany.insertMany(movieProductionsList);
};

const updateMovie = async (body) => {
	let { movieId, adult, poster_path, budget, genres, homepage, imdb_id, original_language, original_title,
		overview, popularity, production_countries, release_date, revenue,
		runtime, spoken_languages, status, tagline, title, video, vote_average, vote_count,
		youtubeKey, clientDeleteActorIdsList, clientUpdateActorsList, clientAddActorsList,
		clientDeleteCrewIdsList, clientUpdateCrewsList, clientAddCrewsList, clientDeleteProductionIdsList,
		clientUpdateProductionsList, clientAddProductionsList } = body;

	movieId = parseInt(movieId);

	// Convert the data to fit original JSON files standards and structure.
	original_language = original_language[0];
	production_countries = production_countries.map(production => { return { iso_3166_1: 'DE', name: production }; });
	release_date = getFormattedDate(release_date);
	spoken_languages = spoken_languages.map(language => { return { iso_639_1: 'xx', name: language }; });
	status = status[0];

	const isDeleteActors = clientDeleteActorIdsList && clientDeleteActorIdsList.length > 0;
	const isUpdateActors = clientUpdateActorsList && clientUpdateActorsList.length > 0;
	let isAddActors = clientAddActorsList && clientAddActorsList.length > 0;

	const isDeleteCrews = clientDeleteCrewIdsList && clientDeleteCrewIdsList.length > 0;
	const isUpdateCrews = clientUpdateCrewsList && clientUpdateCrewsList.length > 0;
	let isAddCrews = clientAddCrewsList && clientAddCrewsList.length > 0;

	const isDeleteProductions = clientDeleteProductionIdsList && clientDeleteProductionIdsList.length > 0;
	const isUpdateProductions = clientUpdateProductionsList && clientUpdateProductionsList.length > 0;
	let isAddProductions = clientAddProductionsList && clientAddProductionsList.length > 0;

	if (isUpdateActors) {
		clientUpdateActorsList = clientUpdateActorsList.map(actor => { return { ...actor, cast_id: random(), credit_id: '52fe420fc3a36847f8000c83' }; });
	}
	if (isAddActors) {
		clientAddActorsList = clientAddActorsList.map(actor => { return { ...actor, cast_id: random(), credit_id: '52fe420fc3a36847f8000c83' }; });
	}
	if (isUpdateCrews) {
		clientUpdateCrewsList = clientUpdateCrewsList.map(crew => { return { ...crew, credit_id: '52fe420fc3a36847f8000c83' }; });
	}
	if (isAddCrews) {
		clientAddCrewsList = clientAddCrewsList.map(crew => { return { ...crew, credit_id: '52fe420fc3a36847f8000c83' }; });
	}
	if (isUpdateProductions) {
		clientUpdateProductionsList = clientUpdateProductionsList.map(company => { return { ...company }; });
	}
	if (isAddProductions) {
		clientAddProductionsList = clientAddProductionsList.map(company => { return { ...company }; });
	}

	// Get all actors and actor movies data related to the movie.
	// Find all relations of actors, crews, productions.
	const relationsResults = await Movie.aggregate([
		{ $match: { id: movieId } },
		{
			$lookup:
			{
				from: MovieActor.collection.name,
				localField: 'id',
				foreignField: 'movieId',
				as: 'moviesActorsList'
			}
		},
		{
			$lookup:
			{
				from: Actor.collection.name,
				localField: 'moviesActorsList.actorId',
				foreignField: 'id',
				as: 'actorsDataList'
			}
		},
		{
			$lookup:
			{
				from: MovieCrew.collection.name,
				localField: 'id',
				foreignField: 'movieId',
				as: 'moviesCrewsList'
			}
		},
		{
			$lookup:
			{
				from: Crew.collection.name,
				localField: 'moviesCrewsList.crewId',
				foreignField: 'id',
				as: 'crewsDataList'
			}
		},
		{
			$lookup:
			{
				from: MovieProductionCompany.collection.name,
				localField: 'id',
				foreignField: 'movieId',
				as: 'moviesProductionsList'
			}
		},
		{
			$lookup:
			{
				from: ProductionCompany.collection.name,
				localField: 'production_companies.productionCompanyId',
				foreignField: 'id',
				as: 'productionsDataList'
			}
		}
	]);

	let moviesActorsList = [];
	let actorsDataList = [];
	let moviesCrewsList = [];
	let crewsDataList = [];
	let moviesProductionsList = [];
	let productionsDataList = [];

	if (relationsResults && relationsResults.length > 0) {
		moviesActorsList = relationsResults[0].moviesActorsList;
		actorsDataList = relationsResults[0].actorsDataList;
		moviesCrewsList = relationsResults[0].moviesCrewsList;
		crewsDataList = relationsResults[0].crewsDataList;
		moviesProductionsList = relationsResults[0].moviesProductionsList;
		productionsDataList = relationsResults[0].productionsDataList;
	}

	// ===DELETE START=== //
	if (isDeleteActors || isDeleteCrews || isDeleteProductions) {
		// Logic for delete - Same as for the delete movie.

		// Remove all relations.
		if (isDeleteActors) {
			const actorIdsRemoveList = moviesActorsList.filter(a => clientDeleteActorIdsList.includes(a.actorId)).map(a => a._id);
			await MovieActor.deleteMany({ _id: { $in: actorIdsRemoveList } });
		}

		if (isDeleteCrews) {
			const crewsRemoveList = moviesCrewsList.filter(c => clientDeleteCrewIdsList.includes(c.crewId)).map(c => c._id);
			await MovieCrew.deleteMany({ _id: { $in: crewsRemoveList } });
		}

		if (isDeleteProductions) {
			const productionIdsRemoveList = moviesProductionsList.filter(p => clientDeleteProductionIdsList.includes(p.productionCompanyId)).map(p => p._id);
			await MovieProductionCompany.deleteMany({ _id: { $in: productionIdsRemoveList } });
		}

		// Check if the actors, crews, productions is still in use in relation tables.
		const existsRelationsResults = await Movie.aggregate(
			[{ $limit: 1 },
			{
				$facet: {
					'c1': [
						{
							$lookup: {
								from: MovieActor.collection.name,
								pipeline: [
									{ $match: { actorId: { $in: clientDeleteActorIdsList } } }
								],
								as: 'collection1'
							}
						},
						{
							$project: {
								'collection1.actorId': 1
							}
						}
					],
					'c2': [
						{
							$lookup: {
								from: MovieCrew.collection.name,
								pipeline: [
									{ $match: { crewId: { $in: clientDeleteCrewIdsList } } }
								],
								as: 'collection2'
							}
						},
						{
							$project: {
								'collection2.crewId': 1
							}
						}
					],
					'c3': [
						{
							$lookup: {
								from: MovieProductionCompany.collection.name,
								pipeline: [
									{ $match: { productionCompanyId: { $in: clientDeleteProductionIdsList } } }
								],
								as: 'collection3'
							}
						},
						{
							$project: {
								'collection3.productionCompanyId': 1
							}
						}
					]
				}
			},
			{
				$project: {
					data: {
						$concatArrays: ['$c1', '$c2', '$c3']
					}
				}
			},
			{ $unwind: '$data' },
			{ $replaceRoot: { 'newRoot': '$data' } }
			]);

		if (existsRelationsResults && existsRelationsResults.length > 0) {
			if (isDeleteActors && typeof existsRelationsResults[0] !== 'undefined') {
				const existsActorsList = [...new Set(existsRelationsResults[0].collection1.map(a => a.actorId))];
				const removeActorIds = clientDeleteActorIdsList.filter(a => !existsActorsList.includes(a));
				if (removeActorIds && removeActorIds.length > 0) {
					await Actor.deleteMany({ id: { $in: removeActorIds } });
				}
			}
			if (isDeleteCrews && typeof existsRelationsResults[1] !== 'undefined') {
				const existsCrewsList = [...new Set(existsRelationsResults[1].collection2.map(c => c.crewId))];
				const removeCrewIds = clientDeleteCrewIdsList.filter(c => !existsCrewsList.includes(c));
				if (removeCrewIds && removeCrewIds.length > 0) {
					await Crew.deleteMany({ id: { $in: removeCrewIds } });
				}
			}
			if (isDeleteProductions && typeof existsRelationsResults[2] !== 'undefined') {
				const existsProductionsList = [...new Set(existsRelationsResults[2].collection3.map(p => p.productionCompanyId))];
				const removeProductionIds = clientDeleteProductionIdsList.filter(p => !existsProductionsList.includes(p));
				if (removeProductionIds && removeProductionIds.length > 0) {
					await ProductionCompany.deleteMany({ id: { $in: removeProductionIds } });
				}
			}
		}
	}
	// ===DELETE END=== //

	// ===UPDATE START=== //
	if (isUpdateActors || isUpdateCrews || isUpdateProductions) {
		// Logic for update -
		// 1. Compare names of all actors.
		// 2. If all match - Do nothing and update the actors.
		// 3. If mismatch - Search the actors by their names.
		// 4. If not found - Add the actors to the list of add actors.
		// 5. If found - Change the relevant docs in MovieActor.

		// Actors.
		if (isUpdateActors) {
			const searches = {};
			for (let i = 0; i < clientUpdateActorsList.length; i++) {
				const { id, name } = clientUpdateActorsList[i];
				searches[`${id}`] = [{ $match: { name: new RegExp(name, 'i') } }];
			}
			const searchResults = await Actor.aggregate([{ $facet: searches }]);
			if (searchResults && searchResults.length > 0) {
				const actorBulk = [];
				const movieActorBulk = [];
				const keys = Object.keys(searchResults[0]);
				for (let i = 0; i < keys.length; i++) {
					const key = keys[i];
					const intKey = parseInt(key);
					const value = searchResults[0][key];
					const updatedActor = clientUpdateActorsList.find(a => parseInt(a.id) === intKey);
					if (!value || value.length <= 0) {
						// New Actor that not found in database.
						clientAddActorsList.push(updatedActor);
						isAddActors = true;
					}
					else {
						// Update Actor.
						actorBulk.push({
							'updateOne': {
								'filter': { _id: actorsDataList.find(a => parseInt(a.id) === intKey)._id },
								'update': {
									$set: {
										gender: updatedActor.gender,
										profile_path: updatedActor.profile_path
									}
								}
							}
						});
						// Update MovieActor.
						movieActorBulk.push({
							'updateOne': {
								'filter': { _id: moviesActorsList.find(a => parseInt(a.actorId) === intKey)._id },
								'update': {
									$set: {
										actorId: intKey === parseInt(value[0].id) ? intKey : value[0].id,
										character: updatedActor.character,
										order: updatedActor.order
									}
								}
							}
						});
					}
				}
				if (actorBulk.length > 0) {
					await Actor.bulkWrite(actorBulk);
				}
				if (movieActorBulk.length > 0) {
					await MovieActor.bulkWrite(movieActorBulk);
				}
			}
		}

		// Crews.
		if (isUpdateCrews) {
			const searches = {};
			for (let i = 0; i < clientUpdateCrewsList.length; i++) {
				const { id, name } = clientUpdateCrewsList[i];
				searches[`${id}`] = [{ $match: { name: new RegExp(name, 'i') } }];
			}
			const searchResults = await Crew.aggregate([{ $facet: searches }]);
			if (searchResults && searchResults.length > 0) {
				const crewBulk = [];
				const movieCrewBulk = [];
				const keys = Object.keys(searchResults[0]);
				for (let i = 0; i < keys.length; i++) {
					const key = keys[i];
					const intKey = parseInt(key);
					const value = searchResults[0][key];
					const updatedCrew = clientUpdateCrewsList.find(c => parseInt(c.id) === intKey);
					if (!value || value.length <= 0) {
						// New Crew that not found in database.
						clientAddCrewsList.push(updatedCrew);
						isAddCrews = true;
					}
					else {
						// Update Crew.
						crewBulk.push({
							'updateOne': {
								'filter': { _id: crewsDataList.find(c => parseInt(c.id) === intKey)._id },
								'update': {
									$set: {
										gender: updatedCrew.gender,
										profile_path: updatedCrew.profile_path
									}
								}
							}
						});
						// Update MovieCrew.
						movieCrewBulk.push({
							'updateOne': {
								'filter': { _id: moviesCrewsList.find(c => parseInt(c.crewId) === intKey)._id },
								'update': {
									$set: {
										crewId: intKey === parseInt(value[0].id) ? intKey : value[0].id,
										job: updatedCrew.job,
										department: updatedCrew.department
									}
								}
							}
						});
					}
				}
				if (crewBulk.length > 0) {
					await Crew.bulkWrite(crewBulk);
				}
				if (movieCrewBulk.length > 0) {
					await MovieCrew.bulkWrite(movieCrewBulk);
				}
			}
		}

		// Production Companies.
		if (isUpdateProductions) {
			const searches = {};
			for (let i = 0; i < clientUpdateProductionsList.length; i++) {
				const { id, name } = clientUpdateProductionsList[i];
				searches[`${id}`] = [{ $match: { name: new RegExp(name, 'i') } }];
			}
			const searchResults = await ProductionCompany.aggregate([{ $facet: searches }]);
			if (searchResults && searchResults.length > 0) {
				const productionBulk = [];
				const movieProductionBulk = [];
				const keys = Object.keys(searchResults[0]);
				for (let i = 0; i < keys.length; i++) {
					const key = keys[i];
					const intKey = parseInt(key);
					const value = searchResults[0][key];
					const updatedProduction = clientUpdateProductionsList.find(p => parseInt(p.id) === intKey);
					if (!value || value.length <= 0) {
						// New ProductionCompany that not found in database.
						clientAddProductionsList.push(updatedProduction);
						isAddProductions = true;
					}
					else {
						// Update ProductionCompany.
						productionBulk.push({
							'updateOne': {
								'filter': { _id: productionsDataList.find(p => parseInt(p.id) === intKey)._id },
								'update': {
									$set: {
										logo_path: updatedProduction.logo_path,
										origin_country: updatedProduction.origin_country
									}
								}
							}
						});
						// Update MovieProductionCompany.
						movieProductionBulk.push({
							'updateOne': {
								'filter': { _id: moviesProductionsList.find(p => parseInt(p.productionCompanyId) === intKey)._id },
								'update': {
									$set: {
										productionCompanyId: intKey === parseInt(value[0].id) ? intKey : value[0].id
									}
								}
							}
						});
					}
				}
				if (productionBulk.length > 0) {
					await ProductionCompany.bulkWrite(productionBulk);
				}
				if (movieProductionBulk.length > 0) {
					await MovieProductionCompany.bulkWrite(movieProductionBulk);
				}
			}
		}
	}
	// ===UPDATE END=== //

	// ===ADD START=== //
	if (isAddActors || isAddCrews || isAddProductions) {
		// Logic for add -
		// 1. Get all the actors by theire names.
		// 2. What found in database, don't add.
		// 3. What not found - Add to Actors.
		// 4. Add docs to MovieActor.

		// Find all actors, crews, productions by name.
		const actorsText = isAddActors ? clientAddActorsList.map(actor => actor.name).join('|') : '';
		const crewsText = isAddCrews ? clientAddCrewsList.map(crew => crew.name).join('|') : '';
		const productionsText = isAddProductions ? clientAddProductionsList.map(production => production.name).join('|') : '';

		const itemsQuery =
			[{ $limit: 1 },
			{
				$facet: {
					'c1': [
						{
							$lookup: {
								from: Actor.collection.name,
								pipeline: [
									{ $match: { name: new RegExp(`^${actorsText}$`, 'i') } }
								],
								as: 'collection1'
							}
						},
						{
							$project: {
								'collection1.id': 1,
								'collection1.name': 1
							}
						}
					],
					'c2': [
						{
							$lookup: {
								from: Crew.collection.name,
								pipeline: [
									{ $match: { name: new RegExp(`^${crewsText}$`, 'i') } }
								],
								as: 'collection2'
							}
						},
						{
							$project: {
								'collection2.id': 1,
								'collection2.name': 1
							}
						}
					],
					'c3': [
						{
							$lookup: {
								from: ProductionCompany.collection.name,
								pipeline: [
									{ $match: { name: new RegExp(`^${productionsText}$`, 'i') } }
								],
								as: 'collection3'
							}
						},
						{
							$project: {
								'collection3.id': 1,
								'collection3.name': 1
							}
						}
					]
				}
			},
			{
				$project: {
					data: {
						$concatArrays: ['$c1', '$c2', '$c3']
					}
				}
			},
			{ $unwind: '$data' },
			{ $replaceRoot: { 'newRoot': '$data' } }
			];

		const result = await Movie.aggregate(itemsQuery);
		const toAddActorsList = [...clientAddActorsList];
		const toAddCrewsList = [...clientAddCrewsList];
		const toAddProductionsList = [...clientAddProductionsList];
		const removedActorsList = [];
		const removedCrewsList = [];
		const removedProductionsList = [];
		if (result && result.length > 0) {
			if (isAddActors && typeof result[0] !== 'undefined') {
				const keys = Object.keys(result[0].collection1);
				for (let i = 0; i < keys.length; i++) {
					const actorIndex = toAddActorsList.findIndex(a => a.name.trim().toLowerCase() === result[0].collection1[keys[i]].name.trim().toLowerCase());
					if (actorIndex > -1) {
						const existsActor = toAddActorsList.splice(actorIndex, 1)[0];
						existsActor.id = result[0].collection1[keys[i]].id;
						removedActorsList.push(existsActor);
					}
				}
			}
			if (isAddCrews && typeof result[1] !== 'undefined') {
				const keys = Object.keys(result[1].collection2);
				for (let i = 0; i < keys.length; i++) {
					const crewIndex = toAddCrewsList.findIndex(a => a.name.trim().toLowerCase() === result[1].collection2[keys[i]].name.trim().toLowerCase());
					if (crewIndex > -1) {
						const existsCrew = toAddCrewsList.splice(crewIndex, 1)[0];
						existsCrew.id = result[1].collection2[keys[i]].id;
						removedCrewsList.push(existsCrew);
					}
				}
			}
			if (isAddProductions && typeof result[2] !== 'undefined') {
				const keys = Object.keys(result[2].collection3);
				for (let i = 0; i < keys.length; i++) {
					const productionIndex = toAddProductionsList.findIndex(a => a.name.trim().toLowerCase() === result[2].collection3[keys[i]].name.trim().toLowerCase());
					if (productionIndex > -1) {
						const existsProduction = toAddProductionsList.splice(productionIndex, 1)[0];
						existsProduction.id = result[2].collection3[keys[i]].id;
						removedProductionsList.push(existsProduction);
					}
				}
			}
		}

		// Add relations tables + If exists, don't add them.
		if (isAddActors) {
			if (toAddActorsList.length > 0) {
				for (let i = 0; i < toAddActorsList.length; i++) {
					toAddActorsList[i].id = random();
				}
				await Actor.insertMany(toAddActorsList);
			}
			const fullActorsList = [...toAddActorsList, ...removedActorsList];
			const movieActorsList = fullActorsList.map(a => {
				return {
					actorId: a.id,
					movieId: movieId,
					character: a.character,
					order: a.order
				};
			});
			await MovieActor.insertMany(movieActorsList);
		}

		if (isAddCrews) {
			if (toAddCrewsList.length > 0) {
				for (let i = 0; i < toAddCrewsList.length; i++) {
					toAddCrewsList[i].id = random();
				}
				await Crew.insertMany(toAddCrewsList);
			}
			const fullCrewsList = [...toAddCrewsList, ...removedCrewsList];
			const movieCrewsList = fullCrewsList.map(c => {
				return {
					crewId: c.id,
					movieId: movieId,
					job: c.job,
					department: c.department
				};
			});
			await MovieCrew.insertMany(movieCrewsList);
		}

		if (isAddProductions) {
			if (toAddProductionsList.length > 0) {
				for (let i = 0; i < toAddProductionsList.length; i++) {
					toAddProductionsList[i].id = random();
				}
				await ProductionCompany.insertMany(toAddProductionsList);
			}
			const fullProductionsList = [...toAddProductionsList, ...removedProductionsList];
			const movieProductionsList = fullProductionsList.map(p => {
				return {
					productionCompanyId: p.id,
					movieId: movieId
				};
			});
			await MovieProductionCompany.insertMany(movieProductionsList);
		}

		// ===ADD END=== //
	}

	// Update Movie.
	await Movie.updateOne({ id: movieId }, {
		adult: adult,
		poster_path: poster_path,
		budget: budget,
		genres: genres,
		homepage: homepage,
		imdb_id: imdb_id,
		original_language: original_language,
		original_title: original_title,
		overview: overview,
		popularity: popularity,
		production_country: production_countries[0].name,
		release_date: new Date(release_date),
		revenue: revenue,
		runtime: runtime,
		spoken_language: spoken_languages[0].name,
		status: status,
		tagline: tagline,
		title: title,
		video: video,
		vote_average: vote_average,
		vote_count: vote_count,
		youtubeKey: youtubeKey
	});

};

class MoviesRoute {

	constructor() {

		this.router = express.Router();

		this.router.get('/getGenres', async (request, response) => {
			if (request) { }
			const genres = await Genre.find({});
			let genresResults = [];
			genres.forEach(genre => {
				genresResults.push({ id: genre.id, name: genre.name });
			});
			return response.status(200).send(genresResults);
		});

		this.router.post('/getMovies', async (request, response) => {
			let { searchType, searchText, genres, year, status, production_country, original_language,
				pageNumber, itemsPerPage } = request.body;

			if (!searchType || !pageNumber || !itemsPerPage) {
				return response.status(500).send('Invalid or missing on of the following: searchType | pageNumber | itemsPerPage');
			}

			pageNumber = parseInt(pageNumber);
			itemsPerPage = parseInt(itemsPerPage);

			if (genres) {
				genres = genres.map(genre => parseInt(genre));
			}

			const moviesResults = {
				results: [],
				page: pageNumber,
				total_pages: 0
			};

			const movieTitleQuery = { $match: { original_title: { $regex: new RegExp(searchText, 'gi') } } }; // Name.
			const movieStatusQuery = { $match: { status: { $regex: new RegExp(`^${status}$`, 'i') } } }; // Status.
			const movieYearQuery1 = { $addFields: { year: { $year: '$release_date' } } }; // Year.
			const movieYearQuery2 = { $match: { year: parseInt(year) } }; // Year.
			const movieProductionCountryQuery = { $match: { production_country: { $regex: new RegExp(production_country, 'gi') } } }; // Production Country.
			const movieOriginalLanguageQuery = { $match: { original_language: { $regex: new RegExp(original_language, 'gi') } } }; // Original Language.
			const movieGenresQuery1 = { $match: { genres: { $in: genres } } };
			const movieGenresQuery2 = {
				$lookup:
				{
					from: Genre.collection.name,
					localField: 'genres',
					foreignField: 'id',
					as: 'genresList'
				}
			};

			let moviesQuery = [];
			if (year) {
				moviesQuery.push(movieYearQuery1);
				moviesQuery.push(movieYearQuery2);
			}
			if (status) {
				moviesQuery.push(movieStatusQuery);
			}
			if (production_country) {
				moviesQuery.push(movieProductionCountryQuery);
			}
			if (original_language) {
				moviesQuery.push(movieOriginalLanguageQuery);
			}
			if (genres && genres.length > 0) {
				moviesQuery.push(movieGenresQuery1);
				moviesQuery.push(movieGenresQuery2);
			}

			if (searchType === 'movie') {
				if (searchText) {
					moviesQuery.push(movieTitleQuery);
				}
			}
			else if (searchType === 'vote') {
				if (searchText) {
					searchText = parseInt(searchText);
					const movieVoteQuery = { $match: { vote_average: { $gt: searchText } } }; // Vote Avarage.
					moviesQuery.push(movieVoteQuery);
				}
			}
			else {
				let movieidsList = [];
				if (searchType === 'character') {
					const results = await MovieActor.find({ character: new RegExp(`^${searchText}$`, 'i') }, null, { limit: Number.MAX_SAFE_INTEGER });
					if (results && results.length > 0) {
						movieidsList = results.map(actorMovie => parseInt(actorMovie.movieId));
					}
				}
				else {
					let searchCollection, relationCollection, idField, textFieldName = null;
					switch (searchType) {
						case 'actor':
							searchCollection = 'Actor';
							relationCollection = 'MovieActor';
							idField = 'actorId';
							textFieldName = 'name';
							break;
						case 'crew':
							searchCollection = 'Crew';
							relationCollection = 'MovieCrew';
							idField = 'crewId';
							textFieldName = 'name';
							break;
						case 'production':
							searchCollection = 'ProductionCompany';
							relationCollection = 'MovieProductionCompany';
							idField = 'productionCompanyId';
							textFieldName = 'name';
							break;
					}
					const itemIdList = await eval(searchCollection).find({ [textFieldName]: new RegExp(`^${searchText}$`, 'i') }, null, { limit: 1 });
					if (itemIdList && itemIdList.length > 0) {
						const results = await eval(relationCollection).find({ [idField]: itemIdList[0].id }, null, { limit: Number.MAX_SAFE_INTEGER });
						if (results && results.length > 0) {
							movieidsList = results.map(item => parseInt(item.movieId));
						}
					}
				}

				if (movieidsList.length > 0) {
					const movieIdsQuery = { $match: { id: { $in: movieidsList } } }; // Movie Ids.
					moviesQuery.push(movieIdsQuery);
				}
			}

			moviesQuery =
				[{
					$facet: {
						data: [
							...moviesQuery,
							{ $sort: { id: 1 } },
							{ $skip: (pageNumber - 1) * itemsPerPage },
							{ $limit: pageNumber * itemsPerPage }
						],
						totalCount: [
							...moviesQuery,
							{ $count: 'totalCount' }
						]
					}
				}];

			const queryResults = await Movie.aggregate(moviesQuery);
			if (queryResults && queryResults.length > 0 && queryResults[0].data.length > 0) {
				moviesResults.results = queryResults[0].data;
				moviesResults.total_pages = Math.ceil(queryResults[0].totalCount[0].totalCount / itemsPerPage);
				moviesResults.results = moviesResults.results.map(movie => {
					return {
						id: movie.id,
						title: movie.title,
						poster_path: movie.poster_path
					};
				});
			}

			return response.status(200).send(moviesResults);
		});

		this.router.get('/getMovie', async (request, response) => {
			const { movieId } = request.query;
			if (!movieId) {
				return response.status(500).send('Invalid movieId');
			}

			const results = await Movie.aggregate([
				{ $match: { id: parseInt(movieId) } },
				{
					$lookup:
					{
						from: MovieActor.collection.name,
						localField: 'id',
						foreignField: 'movieId',
						as: 'moviesActorsList'
					}
				},
				{
					$lookup:
					{
						from: Actor.collection.name,
						localField: 'moviesActorsList.actorId',
						foreignField: 'id',
						as: 'actorsDataList'
					}
				},
				{
					$lookup:
					{
						from: MovieCrew.collection.name,
						localField: 'id',
						foreignField: 'movieId',
						as: 'moviesCrewsList'
					}
				},
				{
					$lookup:
					{
						from: Crew.collection.name,
						localField: 'moviesCrewsList.crewId',
						foreignField: 'id',
						as: 'crewsDataList'
					}
				},
				{
					$lookup:
					{
						from: MovieProductionCompany.collection.name,
						localField: 'id',
						foreignField: 'movieId',
						as: 'production_companies'
					}
				},
				{
					$lookup:
					{
						from: ProductionCompany.collection.name,
						localField: 'production_companies.productionCompanyId',
						foreignField: 'id',
						as: 'production_companies'
					}
				}
			]);

			let movie = null;
			if (results && results.length > 0) {
				// Merge actors.
				let actorsList = [];
				let crewsList = [];
				let productionCompanies = [];
				const { moviesActorsList, actorsDataList } = results[0];
				if (moviesActorsList && actorsDataList.length > 0 && actorsDataList && actorsDataList.length > 0) {
					actorsList = moviesActorsList.map(x => Object.assign(x, actorsDataList.find(y => parseInt(y.id) == parseInt(x.actorId)))).
						map(m => { return { id: m.id, gender: m.gender, name: m.name, character: m.character, order: m.order, profile_path: m.profile_path }; });
					// Remove irrelevant data.
					delete results[0].moviesActorsList;
					delete results[0].actorsDataList;
				}
				// Merge crews.
				const { moviesCrewsList, crewsDataList } = results[0];
				if (moviesCrewsList && moviesCrewsList.length > 0 && crewsDataList && crewsDataList.length > 0) {
					crewsList = moviesCrewsList.map(x => Object.assign(x, crewsDataList.find(y => parseInt(y.id) == parseInt(x.crewId)))).
						map(c => { return { id: c.id, gender: c.gender, name: c.name, job: c.job, department: c.department, profile_path: c.profile_path }; });
					// Remove irrelevant data.
					delete results[0].moviesCrewsList;
					delete results[0].crewsDataList;
				}

				// Merge production_companies.
				const { production_companies } = results[0];
				if (production_companies && production_companies.length > 0) {
					productionCompanies = production_companies
						.map(p => { return { id: p.id, logo_path: p.logo_path, name: p.name, origin_country: p.origin_country }; });
					// Remove irrelevant data.
					delete results[0].production_companies;
				}

				// Add updated data.
				results[0].actorsList = actorsList;
				results[0].crewsList = crewsList;
				results[0].production_companies = productionCompanies;
				movie = results[0];
			}
			return response.status(200).send(movie);
		});

		this.router.post('/deleteMovie', async (request, response) => {
			let movieId = request.body.id;
			if (!movieId) {
				return response.status(500).send('Error has occurred');
			}

			const movie = await Movie.find({ id: movieId });
			if (!movie) {
				return response.status(500).send('Error has occurred');
			}

			if (movie.length <= 0) {
				return response.status(500).send('Error has occurred');
			}

			movieId = parseInt(movieId);

			// Find all relations of actors, crews, productions.
			const relationsResults = await Movie.aggregate([
				{ $match: { id: movieId } },
				{
					$lookup:
					{
						from: MovieActor.collection.name,
						localField: 'id',
						foreignField: 'movieId',
						as: 'moviesActorsList'
					}
				},
				{
					$lookup:
					{
						from: MovieCrew.collection.name,
						localField: 'id',
						foreignField: 'movieId',
						as: 'moviesCrewsList'
					}
				},
				{
					$lookup:
					{
						from: MovieProductionCompany.collection.name,
						localField: 'id',
						foreignField: 'movieId',
						as: 'production_companies'
					}
				}
			]);

			// Remove all relations.
			let actorIdsList = [];
			let crewIdsList = [];
			let productionIdsList = [];
			let removeIdsList = [];
			if (relationsResults && relationsResults.length > 0) {
				const { moviesActorsList, moviesCrewsList, production_companies } = relationsResults[0];
				if (moviesActorsList && moviesActorsList.length > 0) {
					actorIdsList = [...new Set(moviesActorsList.map(a => a.actorId))];
					removeIdsList = moviesActorsList.map(a => a._id);
					await MovieActor.deleteMany({ _id: { $in: removeIdsList } });
				}
				if (moviesCrewsList && moviesCrewsList.length > 0) {
					crewIdsList = [...new Set(moviesCrewsList.map(c => c.crewId))];
					removeIdsList = moviesCrewsList.map(c => c._id);
					await MovieCrew.deleteMany({ _id: { $in: removeIdsList } });
				}
				if (production_companies && production_companies.length > 0) {
					productionIdsList = [...new Set(production_companies.map(p => p.productionCompanyId))];
					removeIdsList = production_companies.map(p => p._id);
					await MovieProductionCompany.deleteMany({ _id: { $in: removeIdsList } });
				}
			}

			// Check if the actors, crews, productions is still in use in relation tables.
			const existsRelationsResults = await Movie.aggregate(
				[{ $limit: 1 },
				{
					$facet: {
						'c1': [
							{
								$lookup: {
									from: MovieActor.collection.name,
									pipeline: [
										{ $match: { actorId: { $in: actorIdsList } } }
									],
									as: 'collection1'
								}
							},
							{
								$project: {
									'collection1.actorId': 1
								}
							}
						],
						'c2': [
							{
								$lookup: {
									from: MovieCrew.collection.name,
									pipeline: [
										{ $match: { crewId: { $in: crewIdsList } } }
									],
									as: 'collection2'
								}
							},
							{
								$project: {
									'collection2.crewId': 1
								}
							}
						],
						'c3': [
							{
								$lookup: {
									from: MovieProductionCompany.collection.name,
									pipeline: [
										{ $match: { productionCompanyId: { $in: productionIdsList } } }
									],
									as: 'collection3'
								}
							},
							{
								$project: {
									'collection3.productionCompanyId': 1
								}
							}
						]
					}
				},
				{
					$project: {
						data: {
							$concatArrays: ['$c1', '$c2', '$c3']
						}
					}
				},
				{ $unwind: '$data' },
				{ $replaceRoot: { 'newRoot': '$data' } }
				]);

			if (existsRelationsResults && existsRelationsResults.length > 0) {
				if (typeof existsRelationsResults[0] !== 'undefined') {
					const temporaryActorIdsList = [...new Set(existsRelationsResults[0].collection1.map(a => a.actorId))];
					const removeActorIds = temporaryActorIdsList.filter(a => !actorIdsList.includes(a));
					if (removeActorIds && removeActorIds.length > 0) {
						await Actor.deleteMany({ id: { $in: removeActorIds } });
					}
				}
				if (typeof existsRelationsResults[1] !== 'undefined') {
					const temporaryCrewIdsList = [...new Set(existsRelationsResults[1].collection2.map(c => c.crewId))];
					const removeCrewIds = temporaryCrewIdsList.filter(c => !crewIdsList.includes(c));
					if (removeCrewIds && removeCrewIds.length > 0) {
						await Crew.deleteMany({ id: { $in: removeCrewIds } });
					}
				}
				if (typeof existsRelationsResults[2] !== 'undefined') {
					const temporaryProductionIdsList = [...new Set(existsRelationsResults[2].collection3.map(p => p.productionCompanyId))];
					const removeProductionIds = temporaryProductionIdsList.filter(c => !productionIdsList.includes(c));
					if (removeProductionIds && removeProductionIds.length > 0) {
						await ProductionCompany.deleteMany({ id: { $in: removeProductionIds } });
					}
				}
			}

			// Delete the movie.
			await Movie.deleteOne({ id: movieId });
			return response.status(200).send('OK');
		});

		this.router.post('/createMovie', async (request, response) => {
			let result = validateMovie(request.body, true);
			if (result) {
				return response.status(500).send('Error has occurred');
			}
			else {
				// Make sure no movie exists with this name already.
				const movieTitle = request.body.title.toLowerCase();
				const movie = await Movie.find({ title: { $regex: new RegExp(movieTitle, 'i') } });
				if (movie && movie.length > 0) {
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
				const movie = await Movie.find({ id: parseInt(request.body.movieId) });
				if (!movie) {
					return response.status(500).send('Movie not exists');
				}
				updateMovie(request.body);
				return response.status(200).send('OK');
			}
		});
	}
}

module.exports = new MoviesRoute();