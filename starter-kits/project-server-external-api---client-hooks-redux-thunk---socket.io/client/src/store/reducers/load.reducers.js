import { loadTypes } from '../actions/types';
import { updateObject } from '../utilities/utility';
import movieUtils from '../../utils/movie.utils';

const initialState = {
	isDisplayLoadButton: true,
	moviesList: []
};

const setLoadMoviesSuccess = (state, action) => {
	const { moviesList } = action;
	const updatedState = {
		moviesList: movieUtils.removeDuplicates([...state.moviesList, ...moviesList], 'id'),
		isDisplayLoadButton: false
	};
	return updateObject(state, updatedState);
};

const loadReducer = (state = initialState, action) => {
	switch (action.type) {
		case loadTypes.LOAD_LOAD_MOVIES_SUCCESS:
			return setLoadMoviesSuccess(state, action);
		default:
			break;
	}
	return state;
};

export default loadReducer;