import { Component } from 'react';
import { connect } from 'react-redux';
import { mainActions } from '../../store/actions/actions';
import './Main.scss';
import { MoviesList, SearchPanel } from '../../components';

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

  componentDidMount() {
    this.handleComponentDidMount();
  }

  handleComponentDidMount() {
    const { moviesList } = this.props;
    if (!moviesList || moviesList.length <= 0) {
      this.getMovies(null, false);
    }
  }

  handleLoadMoreButtonClick() {
    this.getMovies(null, false);
  }

  handleMovieClick(e) {
    if (e.target.className === 'movie') {
      this.props.history.push(`/details/${e.currentTarget.dataset.id}`);
    }
  }

  handleSearchTextChange(e) {
    const { pageNumber, favoriteMoviesList } = this.props;
    this.props.onSearchTextChange({
      searchText: e.target.value,
      pageNumber: pageNumber,
      favoriteMoviesList: favoriteMoviesList
    });
  }

  handleFavoriteMovieClick(e) {
    const { id, name, posterId } = e.currentTarget.dataset;
    const { moviesList, favoriteMoviesList } = this.props;
    this.props.onUpdateFavoriteMovies({
      updatedMovie: { id: id, name: name, posterId: posterId },
      favoriteMoviesList: favoriteMoviesList,
      moviesList: moviesList
    });
  }

  getMovies(updatedSearchText, isSearchChange) {
    const { searchText, pageNumber, favoriteMoviesList } = this.props;
    this.props.onLoadMovies({
      pageNumber: pageNumber,
      favoriteMoviesList: favoriteMoviesList,
      updatedSearchText: isSearchChange ? updatedSearchText : searchText,
      isSearchChange: isSearchChange
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
    onLoadMovies: (request) => dispatch(mainActions.loadMovies(request)),
    onSearchTextChange: (request) => dispatch(mainActions.searchTextChange(request)),
    onUpdateFavoriteMovies: (request) => dispatch(mainActions.updateFavoriteMovies(request))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);