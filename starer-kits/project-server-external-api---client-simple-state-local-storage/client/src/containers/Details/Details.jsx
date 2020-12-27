import React, { Component } from 'react';
import movieService from '../../services/movie.service';
import localStorageService from '../../services/localStorage.service';
import movieUtils from '../../utils/movie.utils';
import './Details.scss';
import { ActorsList, CrewsList, Rating, Trailer, FeaturesList, ProductionsList, ButtonClick, PageTitle } from '../../components';

const propTypes = {};
const defaultProps = {};

class Details extends Component {
	constructor(props) {
		super(props);
		this.handleBackClick = this.handleBackClick.bind(this);
		this.handleFavoriteMovieClick = this.handleFavoriteMovieClick.bind(this);
	}

	state = {
		movie: null,
		youtubeKey: null,
		credits: null,
		isFavorite: false
	};

	async componentDidMount() {
		await this.handleComponentDidMount();
	}

	async handleComponentDidMount() {
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
		const isFavorite = localStorageService.getItem(movieId) !== null;
		this.setState({
			movie: movie,
			youtubeKey: videos.length > 0 ? videos[0].key : null,
			credits: credits,
			isFavorite: isFavorite
		});
	}

	numberWithCommas(number) {
		return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	}

	handleBackClick() {
		this.props.history.push(`/`);
	}

	handleFavoriteMovieClick() {
		const { movie } = this.state;
		let { isFavorite } = this.state;
		if (isFavorite) {
			localStorageService.removeItem(movie.id);
			isFavorite = false;
		}
		else {
			localStorageService.setItem({ id: movie.id, name: movie.name, posterId: movie.poster_path });
			isFavorite = true;
		}
		this.setState({
			isFavorite: isFavorite
		});
	}

	render() {
		const { movie, youtubeKey, credits, isFavorite } = this.state;
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
									isFavorite={isFavorite}
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

export default Details;