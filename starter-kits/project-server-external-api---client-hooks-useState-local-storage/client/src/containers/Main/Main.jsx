import { useState, useEffect, useCallback } from 'react';
import './Main.scss';
import { MoviesList, SearchPanel } from '../../components';
import localStorageService from '../../services/localStorage.service';
import movieService from '../../services/movie.service';
import movieUtils from '../../utils/movie.utils';

const propTypes = {};
const defaultProps = {};

const Main = (props) => {
  const [searchText, setSearchText] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const [isLoadingMoreMovies, setIsLoadingMoreMovies] = useState(false);
  const [isPager, setIsPager] = useState(true);
  const [moviesList, setMoviesList] = useState([]);
  const [isInitiateFavoriteMoviesList, setIsInitiateFavoriteMoviesList] = useState(false);
  const [favoriteMoviesList, setFavoriteMoviesList] = useState([]);

  const getMovies = async (updatedSearchText, isSearchChange) => {
    let tempFavoriteMoviesList = favoriteMoviesList;
    let tempIsInitiateFavoriteMoviesList = isInitiateFavoriteMoviesList;
    if (!isInitiateFavoriteMoviesList) {
      const initiateFavoriteMoviesList = localStorageService.getAllItems();
      tempFavoriteMoviesList = initiateFavoriteMoviesList.map(movie => movie.id);
      tempIsInitiateFavoriteMoviesList = true;
    }
    setIsInitiateFavoriteMoviesList(tempIsInitiateFavoriteMoviesList);
    setFavoriteMoviesList(tempFavoriteMoviesList);
    setIsLoadingMoreMovies(true);

    const updatedPageNumber = isSearchChange ? 1 : pageNumber + 1;
    const moviesList = await movieService.getMovies({
      searchText: isSearchChange ? updatedSearchText : searchText,
      pageNumber: updatedPageNumber
    });
    const updatedMoviesList = filterMovies(moviesList.results, tempFavoriteMoviesList);

    setPageNumber(moviesList.page);
    setIsLoadingMoreMovies(false);
    setIsPager(moviesList.page < moviesList.total_pages);
    setMoviesList(prevMoviesList => {
      return movieUtils.removeDuplicates(isSearchChange ? updatedMoviesList : [...prevMoviesList, ...updatedMoviesList], 'id');
    });
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
    setSearchText(e.target.value);
    await getMovies(e.target.value, true);
  };

  const handleFavoriteMovieClick = useCallback((e) => {
    const { id, name, posterId } = e.currentTarget.dataset;
    const tempFavoriteMoviesList = [...favoriteMoviesList];
    const movieIdIndex = favoriteMoviesList.findIndex(movieId => parseInt(movieId) === parseInt(id));
    if (movieIdIndex > -1) {
      // Remove.
      localStorageService.removeItem(tempFavoriteMoviesList[movieIdIndex]);
      tempFavoriteMoviesList.splice(movieIdIndex, 1);
    }
    else {
      // Add.
      localStorageService.setItem({ id: id, name: name, posterId: posterId });
      tempFavoriteMoviesList.push(id);
    }
    setFavoriteMoviesList([...tempFavoriteMoviesList]);
    setMoviesList([...setMovies(moviesList, tempFavoriteMoviesList)]);
  }, [moviesList]);

  return (
    <div className="main-area">
      <SearchPanel
        searchText={searchText}
        onSearchTextChange={handleSearchTextChange}
      />
      <MoviesList
        pageName='movies'
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