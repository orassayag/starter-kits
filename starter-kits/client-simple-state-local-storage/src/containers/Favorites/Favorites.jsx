import { Component } from 'react';
import './Favorites.scss';
import localStorageService from '../../services/localStorage.service';
import { ButtonClick, MoviesList, PageTitle } from '../../components';

const propTypes = {};
const defaultProps = {};

class Favorites extends Component {

  constructor(props) {
    super(props);
    this.handleLoadMoreButtonClick = this.handleLoadMoreButtonClick.bind(this);
    this.handleMovieClick = this.handleMovieClick.bind(this);
    this.handleFavoriteMovieClick = this.handleFavoriteMovieClick.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
    this.itemsPerPage = 20;
  }
  state = {
    pageNumber: 1,
    isLoadingMoreMovies: false,
    isInitiateMoviesList: false,
    favoriteMoviesList: []
  };

  componentDidMount() {
    this.handleComponentDidMount();
  }

  handleComponentDidMount() {
    this.getMovies(false);
  }

  handleLoadMoreButtonClick() {
    this.getMovies(true);
  }

  handleBackClick() {
    this.props.history.push(`/`);
  }

  handleMovieClick(e) {
    if (e.target.className === 'movie') {
      this.props.history.push(`/details/${e.currentTarget.dataset.id}`);
    }
  }

  handleFavoriteMovieClick(e) {
    const { id } = e.currentTarget.dataset;
    const { favoriteMoviesList } = this.state;
    const movieIdIndex = favoriteMoviesList.findIndex(movie => parseInt(movie.id) === parseInt(id));
    if (movieIdIndex > -1) {
      // Remove.
      localStorageService.removeItem(favoriteMoviesList[movieIdIndex].id);
      favoriteMoviesList.splice(movieIdIndex, 1);
    }
    this.setState({
      favoriteMoviesList: favoriteMoviesList
    });
  }

  getMovies(isLoadMore) {
    let { pageNumber, favoriteMoviesList, isInitiateMoviesList } = this.state;
    if (!isInitiateMoviesList) {
      const initiateMoviesList = localStorageService.getAllItems();
      favoriteMoviesList = initiateMoviesList.map(movie => ({
        id: movie.id,
        title: movie.name,
        poster_path: movie.posterId,
        is_favorite: true
      }));
      isInitiateMoviesList = true;
      this.setState({
        favoriteMoviesList: favoriteMoviesList
      });
    }

    this.setState({
      pageNumber: isLoadMore ? pageNumber + 1 : pageNumber,
      isInitiateMoviesList: isInitiateMoviesList
    });
  }

  render() {
    const { pageNumber, favoriteMoviesList } = this.state;
    const displayFavoriteMoviesList = favoriteMoviesList.slice(0, pageNumber * this.itemsPerPage);

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
          onLoadMoreClick={this.handleLoadMoreButtonClick}
          onMovieClick={this.handleMovieClick}
          onFavoriteMovieClick={this.handleFavoriteMovieClick}
        />
        <ButtonClick
          buttonText="Back"
          buttonTitle="Back"
          isLoading={false}
          onClick={this.handleBackClick}
        />
      </div>
    );
  }
}

Favorites.propTypes = propTypes;
Favorites.defaultProps = defaultProps;

export default Favorites;