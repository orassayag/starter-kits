import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    pageNumber: 1
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        setFavoriteMoviesSuccess(state, action) {
            state.pageNumber = action.payload.pageNumber;
        }
    }
});

export const favoritesActions = favoritesSlice.actions;
export default favoritesSlice;