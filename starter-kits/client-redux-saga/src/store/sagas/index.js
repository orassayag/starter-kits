import { takeEvery, all } from 'redux-saga/effects';
import { detailsTypes, favoritesTypes, mainTypes } from '../actions/types';
import { loadDetailsSaga } from './details.sagas';
import { loadFavoriteMoviesSaga } from './favorites.sagas';
import { loadMoviesSaga, searchTextChangeSaga, updateFavoriteMoviesSaga } from './main.sagas';

export function* watchDetails() {
	try {
		yield all([
			takeEvery(detailsTypes.DETAILS_LOAD_MOVIE_DETAILS, loadDetailsSaga)
		]);
	}
	catch (error) { }
}

export function* watchFavorites() {
	try {
		yield all([
			takeEvery(favoritesTypes.FAVORITES_LOAD_FAVORITE_MOVIES, loadFavoriteMoviesSaga)
		]);
	}
	catch (error) { }
}

export function* watchMain() {
	try {
		yield all([
			takeEvery(mainTypes.MAIN_LOAD_MOVIES, loadMoviesSaga),
			takeEvery(mainTypes.MAIN_SEARCH_TEXT_CHANGE, searchTextChangeSaga),
			takeEvery(mainTypes.MAIN_UPDATE_FAVORITE_MOVIES, updateFavoriteMoviesSaga)
		]);
	}
	catch (error) { }
}