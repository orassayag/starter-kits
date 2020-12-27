import React, { useState, useEffect, useCallback } from 'react';
import './Favorites.scss';
import localStorageService from '../../services/localStorage.service';
import { MoviesList, PageTitle, ButtonClick } from '../../components';

const propTypes = {};
const defaultProps = {};

const Favorites = (props) => {
  const itemsPerPage = 20;
  const [pageNumber, setPageNumber] = useState(0);
  const [isInitiateMoviesList, setIsInitiateMoviesList] = useState(false);
  const [favoriteMoviesList, setFavoriteMoviesList] = useState([]);

  const getMovies = () => {
    let tempFavoriteMoviesList = favoriteMoviesList;
    let tempPageNumber = pageNumber;
    let tempIsInitiateMoviesList = isInitiateMoviesList;
    if (!isInitiateMoviesList) {
      const initiateMoviesList = localStorageService.getAllItems();
      tempFavoriteMoviesList = initiateMoviesList.map(movie => ({
        id: movie.id,
        title: movie.name,
        poster_path: movie.posterId,
        is_favorite: true
      }));
      tempIsInitiateMoviesList = true;
      setFavoriteMoviesList(tempFavoriteMoviesList);
    }
    const totalCount = tempFavoriteMoviesList.length;
    tempPageNumber++;
    tempFavoriteMoviesList = tempFavoriteMoviesList.slice(0, tempPageNumber * itemsPerPage);
    setPageNumber(tempPageNumber);
    setIsInitiateMoviesList(tempIsInitiateMoviesList);
  };

  useEffect(() => {
    getMovies();
  }, []);

  const handleLoadMoreButtonClick = () => {
    getMovies();
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
    const { id } = e.currentTarget.dataset;
    const movieIdIndex = favoriteMoviesList.findIndex(movie => parseInt(movie.id) === parseInt(id));
    if (movieIdIndex > -1) {
      // Remove.
      localStorageService.removeItem(favoriteMoviesList[movieIdIndex].id);
    }
    setFavoriteMoviesList(currentFavoriteMoviesList => currentFavoriteMoviesList.filter(movie => parseInt(movie.id) !== parseInt(id)));
  }, [favoriteMoviesList]);

  const displayFavoriteMoviesList = favoriteMoviesList.slice(0, pageNumber * itemsPerPage);

  return (
    <div className="main-area favorites">
      <PageTitle
        pageName='favorites'
        pageTitle='Favorites'
      />
      <MoviesList
        pageName='favorites'
        moviesList={displayFavoriteMoviesList}
        isLoadingMoreMovies={false}
        isPager={displayFavoriteMoviesList.length < favoriteMoviesList.length}
        onLoadMoreClick={handleLoadMoreButtonClick}
        onMovieClick={handleMovieClick}
        onFavoriteMovieClick={handleFavoriteMovieClick}
      />
      <ButtonClick
        buttonText={'Back'}
        buttonTitle={'Back'}
        isLoading={false}
        onClick={handleBackClick}
      />
    </div>
  );
};

Favorites.propTypes = propTypes;
Favorites.defaultProps = defaultProps;

export default Favorites;