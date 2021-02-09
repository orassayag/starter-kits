import { put, call } from 'redux-saga/effects';
import { mainActions } from '../actions/actions';
import movieService from '../../services/movie.service';
import movieUtils from '../../utils/movie.utils';

const filterMovies = (moviesList, favoriteMoviesList) => {
	if (!moviesList) {
		return [];
	}
	return movieUtils.setMovies(moviesList.filter(movie => movie.poster_path !== null).map(movie => movie), favoriteMoviesList);
};

export function* loadMoviesSaga(action) {
	const { pageNumber, favoriteMoviesList, updatedSearchText, isSearchChange } = action.request;
	try {
		yield put(mainActions.setMoviesStart(true));
		const updatedPageNumber = isSearchChange ? 1 : pageNumber + 1;
		const moviesList = yield movieService.getMovies({
			searchText: updatedSearchText,
			pageNumber: updatedPageNumber
		});
		const updatedMoviesList = filterMovies(moviesList.results, favoriteMoviesList);
		yield put(mainActions.setMoviesSuccess({
			pageNumber: moviesList.page,
			totalPages: moviesList.total_pages,
			isSearchChange: isSearchChange,
			updatedMoviesList: updatedMoviesList
		}));
	}
	catch (error) { }
}

export function* searchTextChangeSaga(action) {
	const { searchText, pageNumber, favoriteMoviesList } = action.request;
	try {
		yield put(mainActions.setSearchText(searchText));
		yield call(loadMoviesSaga, {
			request: {
				pageNumber: pageNumber,
				favoriteMoviesList: favoriteMoviesList,
				updatedSearchText: searchText,
				isSearchChange: true
			}
		});
	}
	catch (error) { }
}

export function* updateFavoriteMoviesSaga(action) {
	try {
		yield put(mainActions.updateFavoriteMoviesSuccess(action.request));
	}
	catch (error) { }
}