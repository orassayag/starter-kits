import { Component } from 'react';
import { connect } from 'react-redux';
import { mainActions } from '../../store/actions/actions';
import './Main.scss';
import { MoviesList, SearchPanel } from '../../components';
import movieService from '../../services/movie.service';
import movieUtils from '../../utils/movie.utils';

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

  async componentDidMount() {
    await this.handleComponentDidMount();
  }

  async handleComponentDidMount() {
    const { moviesList } = this.props;
    if (!moviesList || moviesList.length <= 0) {
      await this.getMovies(null, false);
    }
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
    return movieUtils.setMovies(moviesList.filter(movie => movie.poster_path !== null).map(movie => movie), favoriteMoviesList);
  }

  async handleSearchTextChange(e) {
    this.props.onSearchTextChange(e.target.value);
    await this.getMovies(e.target.value, true);
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

  async getMovies(updatedSearchText, isSearchChange) {
    const { searchText, pageNumber, favoriteMoviesList } = this.props;
    this.props.onLoadMoviesStart(true);
    const updatedPageNumber = isSearchChange ? 1 : pageNumber + 1;
    const moviesList = await movieService.getMovies({
      searchText: isSearchChange ? updatedSearchText : searchText,
      pageNumber: updatedPageNumber
    });
    const updatedMoviesList = this.filterMovies(moviesList.results, favoriteMoviesList);
    this.props.onLoadMoviesSuccess({
      pageNumber: moviesList.page,
      totalPages: moviesList.total_pages,
      isSearchChange: isSearchChange,
      updatedMoviesList: updatedMoviesList
    });
  }

  render() {
    const { searchText, isLoadingMoreMovies, isPager, moviesList } = this.props;
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

const mapStateToProps = (state) => {
  return {
    searchText: state.main.searchText,
    pageNumber: state.main.pageNumber,
    isLoadingMoreMovies: state.main.isLoadingMoreMovies,
    isPager: state.main.isPager,
    moviesList: state.main.moviesList,
    favoriteMoviesList: state.main.favoriteMoviesList
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchTextChange: (searchText) => dispatch(mainActions.setSearchText(searchText)),
    onLoadMoviesStart: (isLoadingMoreMovies) => dispatch(mainActions.setMoviesStart(isLoadingMoreMovies)),
    onLoadMoviesSuccess: (request) => dispatch(mainActions.setMoviesSuccess(request)),
    onUpdateFavoriteMoviesSuccess: (request) => dispatch(mainActions.updateFavoriteMoviesSuccess(request))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);