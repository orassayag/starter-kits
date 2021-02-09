import { loadTypes } from '../types';

export const setLoadMoviesSuccess = (moviesList) => {
    return {
        type: loadTypes.LOAD_LOAD_MOVIES_SUCCESS,
        moviesList: moviesList
    };
};