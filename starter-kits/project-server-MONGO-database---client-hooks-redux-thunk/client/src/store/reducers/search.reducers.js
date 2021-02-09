import { searchTypes } from '../actions/types';
import { updateObject } from '../utilities/utility';

const initialState = {
	searchText: null,
	genres: [],
	searchType: 'movie',
	year: null,
	status: null,
	production_country: null,
	original_language: null
};

const setSearchValue = (state, action) => {
	const { fieldName, fieldValue } = action;
	const updatedState = {
		...state,
		[fieldName]: fieldValue
	};
	return updateObject(state, updatedState);
};

const setLeaveSearch = (state) => {
	return updateObject(state, initialState);
};

const searchReducer = (state = initialState, action) => {
	switch (action.type) {
		case searchTypes.SEARCH_SET_SEARCH_VALUE:
			return setSearchValue(state, action);
		case searchTypes.SEARCH_SET_LEAVE_SEARCH:
			return setLeaveSearch(state, action);
		default:
			break;
	}
	return state;
};

export default searchReducer;