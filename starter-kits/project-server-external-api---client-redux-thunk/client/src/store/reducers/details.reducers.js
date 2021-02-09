import { detailsTypes } from '../actions/types';
import { updateObject } from '../utilities/utility';

const initialState = {
	movie: null,
	youtubeKey: null,
	credits: null
};

const setMovieDetails = (state, action) => {
	const { movie, youtubeKey, credits } = action.request;
	const updatedState = {
		movie: movie,
		youtubeKey: youtubeKey,
		credits: credits
	};
	return updateObject(state, updatedState);
};

const detailsReducer = (state = initialState, action) => {
	switch (action.type) {
		case detailsTypes.DETAILS_MOVIE_DETAILS_LOAD_SUCCESS:
			return setMovieDetails(state, action);
		default:
			break;
	}
	return state;
};

export default detailsReducer;