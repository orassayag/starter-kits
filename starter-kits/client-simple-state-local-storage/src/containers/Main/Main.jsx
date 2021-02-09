import React, { Component } from 'react';
import movieService from '../../services/movie.service';
import localStorageService from '../../services/localStorage.service';
import movieUtils from '../../utils/movie.utils';
import './Main.scss';
import { SearchPanel, MoviesList } from '../../components';

const propTypes = {};
const defaultProps = {};

class Main extends Component {

  constructor(props) {
    super(props);
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
    this.handleLoadMoreButtonClick = this.handleLoadMoreButtonClick.bind(this);
    this.handleMovieClick = this.handleMovieClick.bind(this);
    this.handleFavoriteMovieClick = this.handleFavoriteMovieClick.bind(this);
  }

  state = {
    searchText: '',
    pageNumber: 0,
    isLoadingMoreMovies: false,
    isPager: true,
    moviesList: [],
    isInitiateFavoriteMoviesList: false,
    favoriteMoviesList: []
  };

  async componentDidMount() {
    await this.handleComponentDidMount();
  }

  async handleComponentDidMount() {
    await this.getMovies(null, false);
  }

  async handleLoadMoreButtonClick() {
    await this.getMovies(null, false);
  }

  handleMovieClick(e) {
    if (e.target.className === 'movie') {
      this.props.history.push(`/details/${e.currentTarget.dataset.id}`);
    }
  }

  filterMovies(moviesList, favoriteMoviesList) {
    if (!moviesList) {
      return [];
    }
    return this.setMovies(moviesList.filter(movie => movie.poster_path !== null).map(movie => movie), favoriteMoviesList);
  }

  setMovies(moviesList, favoriteMoviesList) {
    if (!moviesList || moviesList.length <= 0) {
      return moviesList;
    }
    for (let i = 0, length = moviesList.length; i < length; i++) {
      const favoriteMovieIndex = favoriteMoviesList.findIndex(id => parseInt(id) === parseInt(moviesList[i].id));
      moviesList[i].is_favorite = favoriteMovieIndex > -1;
    }
    return moviesList;
  }

  async handleSearchTextChange(e) {
    this.setState({
      searchText: e.target.value
    });
    await this.getMovies(e.target.value, true);
  }

  handleFavoriteMovieClick(e) {
    const { id, name, posterId } = e.currentTarget.dataset;
    let { moviesList, favoriteMoviesList } = this.state;
    const movieIdIndex = favoriteMoviesList.findIndex(movieId => parseInt(movieId) === parseInt(id));
    if (movieIdIndex > -1) {
      // Remove.
      localStorageService.removeItem(favoriteMoviesList[movieIdIndex]);
      favoriteMoviesList.splice(movieIdIndex, 1);
    }
    else {
      // Add.
      localStorageService.setItem({ id: id, name: name, posterId: posterId });
      favoriteMoviesList.push(id);
    }
    this.setState({
      favoriteMoviesList: favoriteMoviesList,
      moviesList: this.setMovies(moviesList, favoriteMoviesList)
    });
  }

  async getMovies(updatedSearchText, isSearchChange) {
    const { searchText, pageNumber } = this.state;
    let { favoriteMoviesList, isInitiateFavoriteMoviesList } = this.state;
    if (!isInitiateFavoriteMoviesList) {
      const initiateFavoriteMoviesList = localStorageService.getAllItems();
      favoriteMoviesList = initiateFavoriteMoviesList.map(movie => movie.id);
      isInitiateFavoriteMoviesList = true;
    }
    this.setState({
      isInitiateFavoriteMoviesList: isInitiateFavoriteMoviesList,
      favoriteMoviesList: favoriteMoviesList,
      isLoadingMoreMovies: true
    });
    const updatedPageNumber = isSearchChange ? 1 : pageNumber + 1;
    const moviesList = await movieService.getMovies({
      searchText: isSearchChange ? updatedSearchText : searchText,
      pageNumber: updatedPageNumber
    });
    const updatedMoviesList = this.filterMovies(moviesList.results, favoriteMoviesList);
    this.setState(prevState => ({
      pageNumber: moviesList.page,
      isLoadingMoreMovies: false,
      isPager: moviesList.page < moviesList.total_pages,
      moviesList: movieUtils.removeDuplicates(isSearchChange ? updatedMoviesList : [...prevState.moviesList, ...updatedMoviesList], 'id')
    }));
  }

  render() {
    const { searchText, isLoadingMoreMovies, isPager, moviesList } = this.state;
    return (
      <div className="main-area">
        <SearchPanel
          searchText={searchText}
          onSearchTextChange={this.handleSearchTextChange}
        />
        <MoviesList
          pageName='movies'
          moviesList={moviesList}
          isLoadingMoreMovies={isLoadingMoreMovies}
          isPager={isPager}
          onLoadMoreClick={this.handleLoadMoreButtonClick}
          onMovieClick={this.handleMovieClick}
          onFavoriteMovieClick={this.handleFavoriteMovieClick}
        />
      </div>
    );
  }
}

Main.propTypes = propTypes;
Main.defaultProps = defaultProps;

export default Main;