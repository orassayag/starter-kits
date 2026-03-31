import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    movie: null,
    youtubeKey: null,
    actorsList: null,
    crewsList: null
};

const detailsSlice = createSlice({
    name: 'details',
    initialState,
    reducers: {
        setMovieDetails(state, action) {
            const { movie, youtubeKey, actorsList, crewsList } = action.payload;
            state.movie = movie;
            state.youtubeKey = youtubeKey;
            state.actorsList = actorsList;
            state.crewsList = crewsList;
        }
    }
});

export const detailsActions = detailsSlice.actions;
export default detailsSlice;