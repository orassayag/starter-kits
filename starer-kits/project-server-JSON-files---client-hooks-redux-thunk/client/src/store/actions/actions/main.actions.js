import { mainTypes } from '../types';

export const setSearchText = (searchText) => {
    return {
        type: mainTypes.MAIN_SEARCH_TEXT_CHANGE_SUCCESS,
        searchText: searchText
    };
};

export const setMoviesStart = (isLoadingMoreMovies) => {
    return {
        type: mainTypes.MAIN_LOAD_MOVIES_START,
        isLoadingMoreMovies: isLoadingMoreMovies
    };
};

export const setMoviesSuccess = (request) => {
    return {
        type: mainTypes.MAIN_LOAD_MOVIES_SUCCESS,
        request: request
    };
};

export const updateFavoriteMoviesSuccess = (request) => {
    return {
        type: mainTypes.MAIN_UPDATE_FAVORITE_MOVIES_SUCCESS,
        request: request
    };
};