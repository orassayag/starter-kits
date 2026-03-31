import { detailsTypes } from '../types';

export const setMovieDetails = (request) => {
    return {
        type: detailsTypes.DETAILS_MOVIE_DETAILS_LOAD_SUCCESS,
        request: request
    };
};