import { Component } from 'react';
import { connect } from 'react-redux';
import { favoritesActions, mainActions } from '../../store/actions/actions';
import './Favorites.scss';
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

  componentDidMount() {
    this.handleComponentDidMount();
  }

  handleComponentDidMount() {
    const { moviesList, favoriteMoviesList } = this.props;
    if (favoriteMoviesList.length > 0 && moviesList.length <= 0) {
      this.handleBackClick();
      return;
    }
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
    const { id, name, posterId } = e.currentTarget.dataset;
    const { moviesList, favoriteMoviesList } = this.props;
    this.props.onUpdateFavoriteMoviesSuccess({
      updatedMovie: { id: id, name: name, posterId: posterId },
      favoriteMoviesList: favoriteMoviesList,
      moviesList: moviesList
    });
  }

  getMovies(isLoadMore) {
    const { pageNumber } = this.props;
    this.props.onLoadFavoritesMoviesSuccess(isLoadMore ? pageNumber + 1 : pageNumber);
  }

  render() {
    const { pageNumber, favoriteMoviesList } = this.props;
    const displayFavoriteMoviesList = favoriteMoviesList.slice(0, pageNumber * this.itemsPerPage).map(movie => { return { ...movie, is_favorite: true, poster_path: movie.posterId }; });
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
          onLoadMoreClick={this.handleLoadMoreButtonClick}
          onMovieClick={this.handleMovieClick}
          onFavoriteMovieClick={this.handleFavoriteMovieClick}
        />
        <ButtonClick
          buttonText={'Back'}
          buttonTitle={'Back'}
          isLoading={false}
          onClick={this.handleBackClick}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pageNumber: state.favorites.pageNumber,
    moviesList: state.main.moviesList,
    favoriteMoviesList: state.main.favoriteMoviesList
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadFavoritesMoviesSuccess: (request) => dispatch(favoritesActions.setFavoriteMoviesSuccess(request)),
    onUpdateFavoriteMoviesSuccess: (request) => dispatch(mainActions.updateFavoriteMoviesSuccess(request))
  };
};

Favorites.propTypes = propTypes;
Favorites.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);