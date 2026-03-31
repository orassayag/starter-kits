import { favoritesTypes } from '../actions/types';
import { updateObject } from '../utilities/utility';

const initialState = {
	pageNumber: 1
};

const setFavoriteMoviesSuccess = (state, action) => {
	const { pageNumber } = action;
	const updatedState = {
		pageNumber: pageNumber
	};
	return updateObject(state, updatedState);
};

const favoritesReducer = (state = initialState, action) => {
	switch (action.type) {
		case favoritesTypes.FAVORITES_LOAD_MOVIES_SUCCESS: {
			return setFavoriteMoviesSuccess(state, action);
		}
	}
	return state;
};

export default favoritesReducer;