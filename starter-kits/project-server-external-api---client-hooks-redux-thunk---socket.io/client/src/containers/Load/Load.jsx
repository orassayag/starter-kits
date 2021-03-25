import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socketIOClient from 'socket.io-client';
import { loadActions, mainActions } from '../../store/actions/actions';
import './Load.scss';
import { ButtonClick, MoviesList, PageTitle } from '../../components';
import movieService from '../../services/movie.service';

const propTypes = {};
const defaultProps = {};

const Load = () => {
  const dispatch = useDispatch();
  let socket = null;
  const isDisplayLoadButton = useSelector((state) => state.load.isDisplayLoadButton);
  const moviesList = useSelector((state) => state.load.moviesList);
  const favoriteMoviesList = useSelector((state) => state.main.favoriteMoviesList);
  const onLoadMoviesSuccess = (moviesList) => dispatch(loadActions.setLoadMoviesSuccess(moviesList));
  const onUpdateFavoriteMoviesSuccess = (request) => dispatch(mainActions.updateFavoriteMoviesSuccess(request));

  useEffect(() => {
    socket = socketIOClient('http://localhost:3001/');
    socket.on('moreMovies', (moviesList) => {
      moviesList = moviesList.filter(movie => movie.poster_path !== null).map(movie => movie);
      onLoadMoviesSuccess(moviesList);
    });
    return () => {
      socket.emit('terminate', { socketId: socket.id });
    };
  }, []);

  const handleMovieClick = () => { };
  const handleLoadClick = async () => {
    await movieService.loadMovies();
  };

  const handleFavoriteMovieClick = useCallback((e) => {
    const { id, name, posterId } = e.currentTarget.dataset;
    onUpdateFavoriteMoviesSuccess({
      updatedMovie: { id: id, name: name, posterId: posterId },
      favoriteMoviesList: favoriteMoviesList,
      moviesList: moviesList
    });
  }, [favoriteMoviesList]);

  return (
    <div className="main-area load">
      <PageTitle
        pageName="load"
        pageTitle="Load"
      />
      {isDisplayLoadButton && <ButtonClick
        buttonText="Load!"
        buttonTitle="Load!"
        isLoading={false}
        onClick={handleLoadClick}
      />}
      <MoviesList
        pageName="load"
        moviesList={moviesList}
        isLoadingMoreMovies={false}
        isPager={false}
        onLoadMoreClick={() => { }}
        onMovieClick={handleMovieClick}
        onFavoriteMovieClick={handleFavoriteMovieClick}
      />
    </div>
  );
};

Load.propTypes = propTypes;
Load.defaultProps = defaultProps;

export default Load;