import { mainTypes } from '../actions/types';
import { updateObject } from '../utilities/utility';
import movieUtils from '../../utils/movie.utils';

const initialState = {
	searchText: '',
	pageNumber: 0,
	isLoadingMoreMovies: false,
	isPager: true,
	moviesList: [],
	favoriteMoviesList: []
};

const setSearchText = (state, action) => {
	const updatedState = {
		searchText: action.searchText
	};
	return updateObject(state, updatedState);
};

const setMoviesStart = (state, action) => {
	const updatedState = {
		isLoadingMoreMovies: action.isLoadingMoreMovies
	};
	return updateObject(state, updatedState);
};

const setMoviesSuccess = (state, action) => {
	const { pageNumber, totalPages, isSearchChange, updatedMoviesList } = action.request;
	const updatedState = {
		pageNumber: pageNumber,
		isLoadingMoreMovies: false,
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

const mainReducer = (state = initialState, action) => {
	switch (action.type) {
		case mainTypes.MAIN_SEARCH_TEXT_CHANGE_SUCCESS: {
			return setSearchText(state, action);
		}
		case mainTypes.MAIN_LOAD_MOVIES_START: {
			return setMoviesStart(state, action);
		}
		case mainTypes.MAIN_LOAD_MOVIES_SUCCESS: {
			return setMoviesSuccess(state, action);
		}
		case mainTypes.MAIN_UPDATE_FAVORITE_MOVIES_SUCCESS: {
			return updateFavoriteMoviesSuccess(state, action);
		}
	}
	return state;
};

export default mainReducer;