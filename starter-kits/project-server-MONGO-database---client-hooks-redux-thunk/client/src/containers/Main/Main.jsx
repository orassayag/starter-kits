import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mainActions } from '../../store/actions/actions';
import './Main.scss';
import { Modal, MoviesList, SearchPanel } from '../../components';
import movieService from '../../services/movie.service';

const propTypes = {};
const defaultProps = {};

const Main = (props) => {
  const dispatch = useDispatch();
  const isOptionsPanel = useSelector((state) => state.main.isOptionsPanel);
  const genresList = useSelector((state) => state.main.genresList);
  const pageNumber = useSelector((state) => state.main.pageNumber);
  const isLoading = useSelector((state) => state.main.isLoading);
  const isPager = useSelector((state) => state.main.isPager);
  const moviesList = useSelector((state) => state.main.moviesList);
  const favoriteMoviesList = useSelector((state) => state.main.favoriteMoviesList);
  const modalData = useSelector((state) => state.main.modalData);
  const searchText = useSelector((state) => state.search.searchText);
  const genres = useSelector((state) => state.search.genres);
  const searchType = useSelector((state) => state.search.searchType);
  const year = useSelector((state) => state.search.year);
  const status = useSelector((state) => state.search.status);
  const production_country = useSelector((state) => state.search.production_country);
  const original_language = useSelector((state) => state.search.original_language);
  const onUpdateMoviesLoader = (isLoading, isLoadMoreClick) => dispatch(mainActions.updateMoviesLoader(isLoading, isLoadMoreClick));
  const onLoadMoviesSuccess = (request) => dispatch(mainActions.setMoviesSuccess(request));
  const onUpdateFavoriteMoviesSuccess = (request) => dispatch(mainActions.updateFavoriteMoviesSuccess(request));
  const onUpdateOptionsPanelDisplay = (isOptionsPanel) => dispatch(mainActions.updateOptionsPanelDisplay(isOptionsPanel));
  const onUpdateModalData = (modalData) => dispatch(mainActions.updateModalData(modalData));
  const onSetGenresList = (genresList) => dispatch(mainActions.setGenresList(genresList));

  const getMovies = async (isLoadMoreClick) => {
    onUpdateMoviesLoader(true, isLoadMoreClick);
    let intPageNumber = parseInt(pageNumber);
    let updatedPageNumber = intPageNumber > 0 ? intPageNumber : 1;
    if (isLoadMoreClick) {
      updatedPageNumber++;
    }
    else {
      updatedPageNumber = 1;
    }

    const moviesList = await movieService.getMovies({
      searchText: searchText,
      genres: genres,
      searchType: searchType,
      year: year,
      status: status,
      production_country: production_country,
      original_language: original_language,
      pageNumber: updatedPageNumber,
      itemsPerPage: 20
    });

    const updatedMoviesList = filterMovies(moviesList.results, favoriteMoviesList);
    onLoadMoviesSuccess({
      pageNumber: moviesList.page,
      totalPages: moviesList.total_pages,
      isSearchChange: !isLoadMoreClick,
      updatedMoviesList: updatedMoviesList
    });
  };

  const setGenresList = async () => {
    const genresResults = await movieService.getGenres();
    onSetGenresList(genresResults);
  };

  useEffect(() => {
    const initiate = async () => {
      if (!genresList || genresList.length === 0) {
        await setGenresList();
      }
      await getMovies(false);
    };
    initiate();
  }, []);

  const handleLoadMoreButtonClick = async () => {
    await getMovies(true);
  };

  const handleMovieClick = (e) => {
    if (e.target.className === 'movie') {
      props.history.push(`/details/${e.currentTarget.dataset.id}`);
    }
  };

  const handleOnOptionsButtonClick = useCallback(() => {
    onUpdateOptionsPanelDisplay(!isOptionsPanel);
  }, [isOptionsPanel]);

  const filterMovies = useCallback((tempMoviesList, tempFavoriteMoviesList) => {
    if (!tempMoviesList) {
      return [];
    }
    return setMovies(tempMoviesList.filter(movie => movie.poster_path !== null).map(movie => movie), tempFavoriteMoviesList);
  }, []);

  const setMovies = useCallback((tempMoviesList, tempFavoriteMoviesList) => {
    if (!tempMoviesList || tempMoviesList.length <= 0) {
      return tempMoviesList;
    }
    for (let i = 0, length = tempMoviesList.length; i < length; i++) {
      const favoriteMovieIndex = tempFavoriteMoviesList.findIndex(id => parseInt(id) === parseInt(tempMoviesList[i].id));
      tempMoviesList[i].is_favorite = favoriteMovieIndex > -1;
    }
    return tempMoviesList;
  }, []);

  const handUpdateMovieClick = (e) => {
    if (e.target.className === 'fa fa-pencil-square') {
      props.history.push(`/form/${e.currentTarget.dataset.id}`);
    }
  };

  const handleFavoriteMovieClick = useCallback((e) => {
    const { id, name, posterId } = e.currentTarget.dataset;
    onUpdateFavoriteMoviesSuccess({
      updatedMovie: { id: id, name: name, posterId: posterId },
      favoriteMoviesList: favoriteMoviesList,
      moviesList: moviesList
    });
  }, [moviesList]);

  const handleOnSearchButtonClick = async () => {
    if (isOptionsPanel) {
      onUpdateOptionsPanelDisplay(false);
    }
    await getMovies(false);
  };

  const handleOnRemoveMovieClick = useCallback((e) => {
    const { id, name } = e.currentTarget.dataset;
    onUpdateModalData({
      isModalDisplay: true,
      id: id,
      name: name
    });
  }, [modalData]);

  const handleOnCloseModalButtonClick = useCallback(() => {
    onUpdateModalData({
      isModalDisplay: false,
      id: null,
      name: null
    });
  }, [modalData]);

  const handleOnRemoveButtonClick = async () => {
    await movieService.deleteMovie(modalData.id);
    onUpdateModalData({
      isModalDisplay: false,
      id: null,
      name: null
    });
    await getMovies(false);
  };

  return (
    <div className="main-area">
      <SearchPanel
        isOptionsPanel={isOptionsPanel}
        genresList={genresList}
        onOptionsButtonClick={handleOnOptionsButtonClick}
        onSearchButtonClick={handleOnSearchButtonClick}
      />
      <MoviesList
        pageName='movies'
        moviesList={moviesList}
        isLoading={isLoading}
        isPager={isPager}
        onLoadMoreClick={handleLoadMoreButtonClick}
        onMovieClick={handleMovieClick}
        onFavoriteMovieClick={handleFavoriteMovieClick}
        onUpdateMovieClick={handUpdateMovieClick}
        onRemoveMovieClick={handleOnRemoveMovieClick}
      />
      <Modal
        modalData={modalData}
        onRemoveButtonClick={handleOnRemoveButtonClick}
        onCloseModalButtonClick={handleOnCloseModalButtonClick}
      />
    </div>
  );
};

Main.propTypes = propTypes;
Main.defaultProps = defaultProps;

export default Main;