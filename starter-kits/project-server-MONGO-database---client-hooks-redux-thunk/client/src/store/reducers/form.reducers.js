import { formTypes } from '../actions/types';
import { updateObject } from '../utilities/utility';
import movieUtils from '../../utils/movie.utils';

const initialState = {
	isLoading: true,
	id: 0,
	adult: false,
	poster_path: '',
	budget: '',
	genres: [],
	homepage: '',
	imdb_id: '',
	original_language: '',
	original_title: '',
	overview: '',
	popularity: '',
	production_companies: [],
	production_countries: [],
	release_date: new Date(),
	revenue: '',
	runtime: '',
	spoken_languages: [],
	status: '',
	tagline: '',
	title: '',
	video: false,
	vote_average: '',
	vote_count: '',
	youtubeKey: '',
	actorsList: [],
	crewsList: [],
	isCreateMode: true,
	errorFieldName: '',
	statusMessage: '',
	originalActorsList: null,
	originalCrewsList: null,
	originalProductionsList: null
};

const setForm = (state, action) => {
	const { fieldName, fieldValue } = action;
	const updatedState = {
		...state,
		[fieldName]: fieldValue
	};
	return updateObject(state, updatedState);
};

const setFormStatus = (state, action) => {
	const { errorFieldName, statusMessage } = action;
	const updatedState = {
		...state,
		errorFieldName: errorFieldName,
		statusMessage: statusMessage
	};
	return updateObject(state, updatedState);
};

const setLeaveForm = (state) => {
	return updateObject(state, initialState);
};

const setInitExistsForm = (state, action) => {
	const { movie } = action;
	const { id, adult, poster_path, budget, genres, homepage, imdb_id, original_language, original_title,
		overview, popularity, production_companies, production_country, release_date, revenue,
		runtime, spoken_language, status, tagline, title, video, vote_average, vote_count,
		youtubeKey, actorsList, crewsList } = movie;
	const movieActorsList = movieUtils.removeDuplicates(actorsList, 'id').sort((a, b) => { return parseInt(a.order) - parseInt(b.order); });
	const movieCrewsList = movieUtils.removeDuplicates(crewsList, 'id');
	const movieProductionsList = production_companies;
	const updatedState = {
		...state,
		isLoading: false,
		id: id,
		adult: adult,
		poster_path: poster_path,
		budget: budget,
		genres: genres,
		homepage: homepage,
		imdb_id: imdb_id,
		original_language: [original_language],
		original_title: original_title,
		overview: overview,
		popularity: popularity,
		production_companies: movieProductionsList,
		production_countries: [production_country],
		release_date: new Date(release_date),
		revenue: revenue,
		runtime: runtime,
		spoken_languages: [spoken_language],
		status: [status],
		tagline: tagline,
		title: title,
		video: video,
		vote_average: vote_average,
		vote_count: vote_count,
		youtubeKey: youtubeKey,
		actorsList: movieActorsList,
		crewsList: movieCrewsList,
		isCreateMode: false,
		originalActorsList: JSON.parse(JSON.stringify(movieActorsList)),
		originalCrewsList: JSON.parse(JSON.stringify(movieCrewsList)),
		originalProductionsList: JSON.parse(JSON.stringify(movieProductionsList))
	};
	return updateObject(state, updatedState);
};

const formReducer = (state = initialState, action) => {
	switch (action.type) {
		case formTypes.FORM_SET_FORM_SUCCESS: {
			return setForm(state, action);
		}
		case formTypes.FORM_SET_FORM_STATUS_SUCCESS: {
			return setFormStatus(state, action);
		}
		case formTypes.FORM_SET_FORM_LEAVE_SUCCESS: {
			return setLeaveForm(state);
		}
		case formTypes.FORM_INIT_EXISTS_FORM_SUCCESS: {
			return setInitExistsForm(state, action);
		}
	}
	return state;
};

export default formReducer;