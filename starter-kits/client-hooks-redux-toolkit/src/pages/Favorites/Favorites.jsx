import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { favoritesActions, mainActions } from '../../store/actions';
import './Favorites.scss';
import { ButtonClick, MoviesList, PageTitle } from '../../components';

const propTypes = {};
const defaultProps = {};

const Favorites = (props) => {
  const dispatch = useDispatch();
  const itemsPerPage = 20;
  const pageNumber = useSelector((state) => state.favorites.pageNumber);
  const moviesList = useSelector((state) => state.main.moviesList);
  const favoriteMoviesList = useSelector((state) => state.main.favoriteMoviesList);

  const getMovies = (isLoadMore) => {
    dispatch(favoritesActions.setFavoriteMoviesSuccess({ pageNumber: isLoadMore ? pageNumber + 1 : pageNumber }));
  };

  useEffect(() => {
    getMovies(false);
  }, []);

  const handleLoadMoreButtonClick = () => {
    getMovies(true);
  };

  const handleBackClick = useCallback(() => {
    props.history.push(`/`);
  });

  const handleMovieClick = (e) => {
    if (e.target.className === 'movie') {
      props.history.push(`/details/${e.currentTarget.dataset.id}`);
    }
  };

  const handleFavoriteMovieClick = useCallback((e) => {
    const { id, name, posterId } = e.currentTarget.dataset;
    dispatch(mainActions.updateFavoriteMoviesSuccess({
      updatedMovie: { id: id, name: name, posterId: posterId },
      favoriteMoviesList: favoriteMoviesList.map(o => ({ ...o })),
      moviesList: moviesList.map(o => ({ ...o }))
    }));
  }, [favoriteMoviesList]);

  const displayFavoriteMoviesList = favoriteMoviesList.slice(0, pageNumber * itemsPerPage).map(movie => { return { ...movie, is_favorite: true, poster_path: movie.posterId }; });
  return (
    <div className="main-area favorites">
      <PageTitle
        pageName="favorites"
        pageTitle="Favorites"
      />
      <MoviesList
        pageName="favorites"
        moviesList={displayFavoriteMoviesList}
        isLoadingMoreMovies={false}
        isPager={displayFavoriteMoviesList.length < favoriteMoviesList.length}
        onLoadMoreClick={handleLoadMoreButtonClick}
        onMovieClick={handleMovieClick}
        onFavoriteMovieClick={handleFavoriteMovieClick}
      />
      <ButtonClick
        buttonText="Back"
        buttonTitle="Back"
        isLoading={false}
        onClick={handleBackClick}
      />
    </div>
  );
};

Favorites.propTypes = propTypes;
Favorites.defaultProps = defaultProps;

export default Favorites;