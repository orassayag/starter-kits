import { configureStore } from '@reduxjs/toolkit';
import { detailsSlices, favoritesSlices, mainSlices } from '../slices';

const store = configureStore({
    reducer: {
        details: detailsSlices.reducer,
        favorites: favoritesSlices.reducer,
        main: mainSlices.reducer
    },
    devTools: process.env.NODE_ENV === 'development'
});

export default store;