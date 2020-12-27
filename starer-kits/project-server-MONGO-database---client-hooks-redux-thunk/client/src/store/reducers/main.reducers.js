import { mainTypes } from '../actions/types';
import { updateObject } from '../utilities/utility';
import movieUtils from '../../utils/movie.utils';

const initialState = {
	isOptionsPanel: false,
	genresList: [],
	pageNumber: 1,
	isLoading: false,
	isPager: true,
	moviesList: [],
	favoriteMoviesList: [],
	modalData: {
		isModalDisplay: false,
		id: null,
		name: null
	}
};

const updateMoviesLoader = (state, action) => {
	const { isLoading, isLoadMoreClick } = action;
	const updatedState = {
		isLoading: isLoading,
		moviesList: isLoadMoreClick ? state.moviesList : []
	};
	return updateObject(state, updatedState);
};

const setMoviesSuccess = (state, action) => {
	const { pageNumber, totalPages, isSearchChange, updatedMoviesList } = action.request;
	const updatedState = {
		pageNumber: pageNumber,
		isLoading: false,
		isPager: pageNumber < totalPages,
		moviesList: movieUtils.removeDuplicates(isSearchChange ? updatedMoviesList : [...state.moviesList, ...updatedMoviesList], 'id')
	};
	return updateObject(state, updatedState);
};

const updateFavoriteMoviesSuccess = (state, action) => {
	const { updatedMovie, favoriteMoviesList } = action.request;
	let { moviesList } = action.request;
	const movieIdIndex = favoriteMoviesList.findIndex(movie => parseInt(movie.id) === parseInt(updatedMovie.id));
	if (movieIdIndex > -1) {
		// Remove.
		favoriteMoviesList.splice(movieIdIndex, 1);
	}
	else {
		// Add.
		favoriteMoviesList.push({ id: updatedMovie.id, name: updatedMovie.name, posterId: updatedMovie.posterId });
	}
	moviesList = movieUtils.setMovies(moviesList, favoriteMoviesList);
	const updatedState = {
		moviesList: [...moviesList],
		favoriteMoviesList: [...favoriteMoviesList]
	};
	return updateObject(state, updatedState);
};

const updateOptionsPanelDisplay = (state, action) => {
	const updatedState = {
		isOptionsPanel: action.isOptionsPanel
	};
	return updateObject(state, updatedState);
};

const updateModalData = (state, action) => {
	const updatedState = {
		modalData: action.modalData
	};
	return updateObject(state, updatedState);
};

const setGenresList = (state, action) => {
	const updatedState = {
		genresList: action.genresList
	};
	return updateObject(state, updatedState);
};

const mainReducer = (state = initialState, action) => {
	switch (action.type) {
		case mainTypes.MAIN_UPDATE_MOVIES_LOADER:
			return updateMoviesLoader(state, action);
		case mainTypes.MAIN_LOAD_MOVIES_SUCCESS:
			return setMoviesSuccess(state, action);
		case mainTypes.MAIN_UPDATE_FAVORITE_MOVIES_SUCCESS:
			return updateFavoriteMoviesSuccess(state, action);
		case mainTypes.MAIN_UPDATE_OPTIONS_PANEL_DISPLAY:
			return updateOptionsPanelDisplay(state, action);
		case mainTypes.MAIN_UPDATE_MODAL_DATA:
			return updateModalData(state, action);
		case mainTypes.MAIN_SET_GENRES_LIST:
			return setGenresList(state, action);
		default:
			break;
	}
	return state;
};

export default mainReducer;