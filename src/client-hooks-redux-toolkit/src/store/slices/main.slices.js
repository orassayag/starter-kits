import { createSlice } from '@reduxjs/toolkit';
import movieUtils from '../../utils/movie.utils';

const initialState = {
    searchText: '',
    pageNumber: 0,
    isLoadingMoreMovies: false,
    isPager: true,
    moviesList: [],
    favoriteMoviesList: []
};

const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        setSearchText(state, action) {
            state.searchText = action.payload.searchText;
        },
        setMoviesStart(state, action) {
            state.isLoadingMoreMovies = action.payload.isLoadingMoreMovies;
        },
        setMoviesSuccess(state, action) {
            const { pageNumber, totalPages, isSearchChange, updatedMoviesList } = action.payload;
            state.pageNumber = pageNumber;
            state.isLoadingMoreMovies = false;
            state.isPager = pageNumber < totalPages;
            state.moviesList = movieUtils.removeDuplicates(isSearchChange ? updatedMoviesList : [...state.moviesList, ...updatedMoviesList], 'id');
        },
        updateFavoriteMoviesSuccess(state, action) {
            const { updatedMovie, favoriteMoviesList } = action.payload;
            let { moviesList } = action.payload;
            const movieIdIndex = favoriteMoviesList.findIndex(movie => parseInt(movie.id) === parseInt(updatedMovie.id));
            if (movieIdIndex > -1) {
                // Remove.
                favoriteMoviesList.splice(movieIdIndex, 1);
            }
            else {
                // Add.
                favoriteMoviesList.push({ id: updatedMovie.id, name: updatedMovie.name, posterId: updatedMovie.posterId });
            }
            moviesList = movieUtils.setMovies(moviesList, favoriteMoviesList);
            state.moviesList = [...moviesList];
            state.favoriteMoviesList = [...favoriteMoviesList];
        }
    }
});

export const mainActions = mainSlice.actions;
export default mainSlice;