import React, { Component } from 'react';
import { connect } from 'react-redux';
import { detailsActions, mainActions } from '../../store/actions/actions';
import movieUtils from '../../utils/movie.utils';
import movieService from '../../services/movie.service';
import './Details.scss';
import { ActorsList, CrewsList, Rating, Trailer, FeaturesList, ProductionsList, ButtonClick, PageTitle } from '../../components';

const propTypes = {};
const defaultProps = {};

class Details extends Component {
	constructor(props) {
		super(props);
		this.handleBackClick = this.handleBackClick.bind(this);
		this.handleFavoriteMovieClick = this.handleFavoriteMovieClick.bind(this);
		this.isFavorite = false;
	}

	async componentDidMount() {
		await this.handleComponentDidMount();
	}

	async handleComponentDidMount() {
		if (this.props.moviesList.length <= 0) {
			this.handleBackClick();
			return;
		}
		this.props.onMovieDetailsLoadSuccess({
			movie: null,
			youtubeKey: null,
			credits: null
		});
		const movieId = this.props.match.params.id;
		if (!movieId) {
			this.handleBackClick();
			return;
		}
		const movie = await movieService.getMovie(movieId);
		if (!movie || movie.length <= 0) {
			this.handleBackClick();
			return;
		}
		const videosResults = await movieService.getVideos(movieId);
		const videos = videosResults ? videosResults.results.filter(video => video.site.toLowerCase() === 'youtube').map(video => video) : null;
		const credits = await movieService.getCredits(movieId);
		this.updateIsFavorite(movieId);
		this.props.onMovieDetailsLoadSuccess({
			movie: movie,
			youtubeKey: videos.length > 0 ? videos[0].key : null,
			credits: credits
		});
	}

	numberWithCommas(number) {
		return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	}

	updateIsFavorite(movieId) {
		this.isFavorite = this.props.favoriteMoviesList.findIndex(movie => parseInt(movie.id) === parseInt(movieId)) > -1;
	}

	handleBackClick() {
		this.props.history.push(`/`);
	}

	handleFavoriteMovieClick() {
		const { movie, moviesList, favoriteMoviesList } = this.props;
		this.props.onUpdateFavoriteMoviesSuccess({
			updatedMovie: { id: movie.id, name: movie.title, posterId: movie.poster_path },
			favoriteMoviesList: favoriteMoviesList,
			moviesList: moviesList
		});
		this.updateIsFavorite(movie.id);
	}

	render() {
		const { movie, youtubeKey, credits } = this.props;
		if (!movie) {
			return null;
		}
		const { adult, poster_path, budget, genres, homepage, imdb_id, original_language, original_title,
			overview, popularity, production_companies, production_countries, release_date, revenue, runtime, spoken_languages,
			status, tagline, title, video, vote_average, vote_count } = movie;
		const genresText = genres.map(genre => genre.name).join(', ');
		const countriesText = production_countries.map(country => country.name).join(', ');
		const languagesText = spoken_languages.map(language => language.name).join(', ');
		const featuresList = [
			{ item: 'Release Date', value: release_date },
			{ item: 'Budget', value: `$${this.numberWithCommas(budget)}` },
			{ item: 'Revenue', value: `$${this.numberWithCommas(revenue)}` },
			{ item: 'Length', value: `${runtime} minutes` },
			{ item: 'Popularity', value: popularity },
			{ item: 'Original Title', value: original_title },
			{ item: 'For Adults', value: adult ? 'Yes' : 'No' },
			{ item: 'Original Language', value: original_language },
			{ item: 'Spoken Languages', value: languagesText },
			{ item: 'Countries', value: countriesText },
			{ item: 'Status', value: status },
			{ item: 'Is Video', value: video ? 'Yes' : 'No' }
		];
		const linksList = [];
		if (homepage) {
			linksList.push({ id: 1, name: 'Homepage', url: homepage });
		}
		if (imdb_id) {
			linksList.push({ id: 2, name: 'IMDB', url: `https://www.imdb.com/title/${imdb_id}` });
		}
		const actorsList = movieUtils.removeDuplicates(credits ? credits.cast ? credits.cast : null : null, 'name');
		const crewsList = movieUtils.removeDuplicates(credits ? credits.crew ? credits.crew : null : null, 'name');
		return (
			<div>
				<section className="details-area">
					<PageTitle
						pageName='details'
						pageTitle='Details'
					/>
					<ul className="details-content">
						<li className="details-left" style={{ backgroundImage: `url('https://image.tmdb.org/t/p/original${poster_path}')` }}></li>
						<li className="details-right">
							<h2>{title} ({release_date.substr(0, 4)})</h2>
							<p className="genres">{genresText}</p>
							<p className="description short">{tagline}</p>
							<Rating
								rating={vote_average}
								votesCount={this.numberWithCommas(vote_count)}
							/>
							<p className="description full">{overview}</p>
							<div className="extra">
								<FeaturesList
									featuresList={featuresList.slice(0, 5)}
									linksList={null}
									isFavorite={this.isFavorite}
									onFavoriteMovieClick={this.handleFavoriteMovieClick}
								/>
								{youtubeKey && <Trailer
									youtubeKey={youtubeKey}
								/>}
							</div>
						</li>
						<div className="extra-features">
							<FeaturesList
								featuresList={featuresList.slice(5, featuresList.length)}
								linksList={linksList}
								isFavorite={null}
								onFavoriteMovieClick={null}
							/>
							<ProductionsList
								productionsList={production_companies}
							/>
						</div>
					</ul>
				</section>
				<section className="actors-area">
					<PageTitle
						pageName='actors'
						pageTitle='Cast'
					/>
					<ActorsList
						actorsList={actorsList}
					/>
				</section>
				<section className="crew-area">
					<PageTitle
						pageName='crew'
						pageTitle='Crew'
					/>
					<CrewsList
						crewsList={crewsList}
					/>
				</section>
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

Details.propTypes = propTypes;
Details.defaultProps = defaultProps;

const mapStateToProps = (state) => {
	return {
		movie: state.details.movie,
		youtubeKey: state.details.youtubeKey,
		credits: state.details.credits,
		moviesList: state.main.moviesList,
		favoriteMoviesList: state.main.favoriteMoviesList
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onMovieDetailsLoadSuccess: (request) => dispatch(detailsActions.setMovieDetails(request)),
		onUpdateFavoriteMoviesSuccess: (request) => dispatch(mainActions.updateFavoriteMoviesSuccess(request))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Details);