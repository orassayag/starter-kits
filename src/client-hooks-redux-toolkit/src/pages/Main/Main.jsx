import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mainActions } from '../../store/actions';
import './Main.scss';
import { MoviesList, SearchPanel } from '../../components';
import movieService from '../../services/movie.service';

const propTypes = {};
const defaultProps = {};

const Main = (props) => {
  const dispatch = useDispatch();
  const { searchText, pageNumber, isLoadingMoreMovies, isPager, moviesList, favoriteMoviesList } = useSelector(state => state.main);

  const getMovies = async (updatedSearchText, isSearchChange) => {
    dispatch(mainActions.setMoviesStart({ isLoadingMoreMovies: true }));
    const updatedPageNumber = isSearchChange ? 1 : pageNumber + 1;
    const moviesList = await movieService.getMovies({
      searchText: isSearchChange ? updatedSearchText : searchText,
      pageNumber: updatedPageNumber
    });
    const updatedMoviesList = filterMovies(moviesList.results, favoriteMoviesList);
    dispatch(mainActions.setMoviesSuccess({
      pageNumber: moviesList.page,
      totalPages: moviesList.total_pages,
      isSearchChange: isSearchChange,
      updatedMoviesList: updatedMoviesList
    }));
  };

  useEffect(() => {
    const initiateMovies = async () => {
      await getMovies(null, false);
    };
    initiateMovies();
  }, []);

  const handleLoadMoreButtonClick = async () => {
    await getMovies(null, false);
  };

  const handleMovieClick = (e) => {
    if (e.target.className === 'movie') {
      props.history.push(`/details/${e.currentTarget.dataset.id}`);
    }
  };

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

  const handleSearchTextChange = async (e) => {
    dispatch(mainActions.setSearchText({ searchText: e.target.value }));
    await getMovies(e.target.value, true);
  };

  const handleFavoriteMovieClick = useCallback((e) => {
    const { id, name, posterId } = e.currentTarget.dataset;
    dispatch(mainActions.updateFavoriteMoviesSuccess({
      updatedMovie: { id: id, name: name, posterId: posterId },
      favoriteMoviesList: favoriteMoviesList.map(o => ({ ...o })),
      moviesList: moviesList.map(o => ({ ...o }))
    }));
  }, [moviesList]);

  return (
    <div className="main-area">
      <SearchPanel
        searchText={searchText}
        onSearchTextChange={handleSearchTextChange}
      />
      <MoviesList
        pageName="movies"
        moviesList={moviesList}
        isLoadingMoreMovies={isLoadingMoreMovies}
        isPager={isPager}
        onLoadMoreClick={handleLoadMoreButtonClick}
        onMovieClick={handleMovieClick}
        onFavoriteMovieClick={handleFavoriteMovieClick}
      />
    </div>
  );
};

Main.propTypes = propTypes;
Main.defaultProps = defaultProps;

export default Main;