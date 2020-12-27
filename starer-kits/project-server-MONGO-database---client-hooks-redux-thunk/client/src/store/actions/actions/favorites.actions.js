import { favoritesTypes } from '../types';

export const setFavoriteMoviesSuccess = (pageNumber) => {
    return {
        type: favoritesTypes.FAVORITES_LOAD_MOVIES_SUCCESS,
        pageNumber: pageNumber
    };
};