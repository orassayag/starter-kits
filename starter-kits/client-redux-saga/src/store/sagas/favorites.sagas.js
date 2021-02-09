import { put } from 'redux-saga/effects';
import { favoritesActions } from '../actions/actions';

export function* loadFavoriteMoviesSaga(action) {
	const { pageNumber } = action;
	try {
		yield put(favoritesActions.setFavoriteMoviesSuccess(pageNumber));
	}
	catch (error) { }
}