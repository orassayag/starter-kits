import { detailsTypes } from '../actions/types';
import { updateObject } from '../utilities/utility';

const initialState = {
	isLoading: true,
	movie: null,
	youtubeKey: null,
	actorsList: null,
	crewsList: null
};

const setMovieDetails = (state, action) => {
	const { movie, youtubeKey, actorsList, crewsList, isLoading } = action.request;
	const updatedState = {
		isLoading: isLoading,
		movie: movie,
		youtubeKey: youtubeKey,
		actorsList: actorsList ? actorsList.sort((a, b) => { return parseInt(a.order) - parseInt(b.order); }) : actorsList,
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