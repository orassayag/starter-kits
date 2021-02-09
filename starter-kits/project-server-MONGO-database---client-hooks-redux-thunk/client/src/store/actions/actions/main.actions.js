import { mainTypes } from '../types';

export const updateMoviesLoader = (isLoading, isLoadMoreClick) => {
    return {
        type: mainTypes.MAIN_UPDATE_MOVIES_LOADER,
        isLoading: isLoading,
        isLoadMoreClick: isLoadMoreClick
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

export const updateOptionsPanelDisplay = (isOptionsPanel) => {
    return {
        type: mainTypes.MAIN_UPDATE_OPTIONS_PANEL_DISPLAY,
        isOptionsPanel: isOptionsPanel
    };
};

export const updateModalData = (modalData) => {
    return {
        type: mainTypes.MAIN_UPDATE_MODAL_DATA,
        modalData: modalData
    };
};

export const setGenresList = (genresList) => {
    return {
        type: mainTypes.MAIN_SET_GENRES_LIST,
        genresList: genresList
    };
};