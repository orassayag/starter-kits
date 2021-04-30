import { detailsTypes } from '../actions/types';
import { updateObject } from '../utilities/utility';

const initialState = {
	movie: null,
	youtubeKey: null,
	actorsList: null,
	crewsList: null
};

const setMovieDetails = (state, action) => {
	const { movie, youtubeKey, actorsList, crewsList } = action.request;
	const updatedState = {
		movie: movie,
		youtubeKey: youtubeKey,
		actorsList: actorsList,
		crewsList: crewsList
	};
	return updateObject(state, updatedState);
};

const detailsReducer = (state = initialState, action) => {
	switch (action.type) {
		case detailsTypes.DETAILS_MOVIE_DETAILS_LOAD_SUCCESS: {
			return setMovieDetails(state, action);
		}
	}
	return state;
};

export default detailsReducer;