import { detailsTypes } from '../types';

export const setMovieDetails = (request) => {
    return {
        type: detailsTypes.DETAILS_MOVIE_DETAILS_LOAD_SUCCESS,
        request: request
    };
};

// SAGAS
export const loadDetails = (movieId) => {
    return {
        type: detailsTypes.DETAILS_LOAD_MOVIE_DETAILS,
        movieId: movieId
    };
};