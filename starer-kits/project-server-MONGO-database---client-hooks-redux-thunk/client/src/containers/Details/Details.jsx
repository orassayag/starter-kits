import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsActions, mainActions } from '../../store/actions/actions';
import movieService from '../../services/movie.service';
import movieUtils from '../../utils/movie.utils';
import './Details.scss';
import {
	ActorsList, CrewsList, Rating, Trailer, FeaturesList, ProductionsList,
	ButtonClick, Modal, PageLoader, PageTitle
} from '../../components';

const propTypes = {};
const defaultProps = {};

const getFormattedYear = (date) => {
	date = new Date(date);
	const year = date.getFullYear();
	return year;
};

const getFormattedDate = (date) => {
	date = new Date(date);
	const year = date.getFullYear();
	let month = (1 + date.getMonth()).toString();
	month = month.length > 1 ? month : '0' + month;
	let day = date.getDate().toString();
	day = day.length > 1 ? day : '0' + day;
	return `${year}-${month}-${day}`;
};

const Details = (props) => {
	const dispatch = useDispatch();
	const isLoading = useSelector((state) => state.details.isLoading);
	const movie = useSelector((state) => state.details.movie);
	const youtubeKey = useSelector((state) => state.details.youtubeKey);
	const actorsList = useSelector((state) => state.details.actorsList);
	const crewsList = useSelector((state) => state.details.crewsList);
	const moviesList = useSelector((state) => state.main.moviesList);
	const favoriteMoviesList = useSelector((state) => state.main.favoriteMoviesList);
	const modalData = useSelector((state) => state.main.modalData);
	const genresList = useSelector((state) => state.main.genresList);
	const onMovieDetailsLoadSuccess = (request) => dispatch(detailsActions.setMovieDetails(request));
	const onUpdateFavoriteMoviesSuccess = (request) => dispatch(mainActions.updateFavoriteMoviesSuccess(request));
	const onUpdateModalData = (modalData) => dispatch(mainActions.updateModalData(modalData));
	const onSetGenresList = (genresList) => dispatch(mainActions.setGenresList(genresList));

	const handleBackClick = () => {
		props.history.push(`/`);
	};

	const setGenresList = async () => {
		const genresResults = await movieService.getGenres();
		onSetGenresList(genresResults);
	};

	useEffect(() => {
		const loadDetails = async () => {
			const movieId = props.match.params.id;
			if (!movieId) {
				handleBackClick();
				return;
			}
			const movie = await movieService.getMovie(movieId);
			if (!movie || movie.length <= 0) {
				handleBackClick();
				return;
			}

			if (!genresList || genresList.length === 0) {
				await setGenresList();
			}

			onMovieDetailsLoadSuccess({
				isLoading: false,
				movie: movie,
				youtubeKey: movie.youtubeKey,
				actorsList: movieUtils.removeDuplicates(movie.actorsList, 'name'),
				crewsList: movieUtils.removeDuplicates(movie.crewsList, 'name')
			});
		};
		loadDetails();
		return () => {
			onMovieDetailsLoadSuccess({
				isLoading: true,
				movie: null,
				youtubeKey: null,
				actorsList: null,
				crewsList: null
			});
		};
	}, []);

	const numberWithCommas = (number) => {
		if (isNaN(number)) {
			return number;
		}
		return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	};

	const handleFavoriteMovieClick = () => {
		const { id, name, poster_path } = movie;
		onUpdateFavoriteMoviesSuccess({
			updatedMovie: { id: id, name: name, posterId: poster_path },
			favoriteMoviesList: favoriteMoviesList,
			moviesList: moviesList
		});
	};

	const handleUpdateMovieClick = () => {
		props.history.push(`/form/${movie.id}`);
	};

	const handleOnRemoveMovieClick = () => {
		onUpdateModalData({
			isModalDisplay: true,
			id: movie.id,
			name: movie.original_title
		});
	};

	const handleOnCloseModalButtonClick = useCallback(() => {
		onUpdateModalData({
			isModalDisplay: false,
			id: null,
			name: null
		});
	}, [modalData]);

	const handleOnRemoveButtonClick = async () => {
		await movieService.deleteMovie(modalData.id);
		onUpdateModalData({
			isModalDisplay: false,
			id: null,
			name: null
		});
		handleBackClick();
	};

	let id, adult, poster_path, budget, genres, homepage, imdb_id, original_language, original_title,
		overview, popularity, production_companies, production_country, release_date, revenue, runtime, spoken_language,
		status, tagline, title, video, vote_average, vote_count, genresText, countriesText, languagesText,
		featuresList, linksList = null;
	featuresList = [];
	linksList = [];
	if (movie) {
		id = movie.id;
		adult = movie.adult;
		poster_path = movie.poster_path;
		budget = movie.budget;
		genres = movie.genres;
		homepage = movie.homepage;
		imdb_id = movie.imdb_id;
		original_language = movie.original_language;
		original_title = movie.original_title;
		overview = movie.overview;
		popularity = movie.popularity;
		production_companies = movie.production_companies;
		production_country = movie.production_country;
		release_date = movie.release_date;
		revenue = movie.revenue;
		runtime = movie.runtime;
		spoken_language = movie.spoken_language;
		status = movie.status;
		tagline = movie.tagline;
		title = movie.title;
		video = movie.video;
		vote_average = movie.vote_average;
		vote_count = movie.vote_count;
		const genresStrings = [];
		for (let i = 0; i < genres.length; i++) {
			const genre = genresList.find(g => parseInt(g.id) === parseInt(genres[i]));
			if (genre) {
				genresStrings.push(genre.name);
			}
		}
		genresText = genresStrings.join(', ');
		countriesText = production_country;
		languagesText = spoken_language;
		featuresList = [
			{ item: 'Release Date', value: getFormattedDate(release_date) },
			{ item: 'Budget', value: `$${numberWithCommas(budget)}` },
			{ item: 'Revenue', value: `$${numberWithCommas(revenue)}` },
			{ item: 'Length', value: `${runtime} minutes` },
			{ item: 'Popularity', value: popularity },
			{ item: 'Id', value: id },
			{ item: 'Original Title', value: original_title },
			{ item: 'For Adults', value: adult ? 'Yes' : 'No' },
			{ item: 'Original Language', value: original_language },
			{ item: 'Spoken Languages', value: languagesText },
			{ item: 'Countries', value: countriesText },
			{ item: 'Status', value: status },
			{ item: 'Is Video', value: video ? 'Yes' : 'No' }
		];
		if (homepage) {
			linksList.push({ id: 1, name: 'Homepage', url: homepage });
		}
		if (imdb_id) {
			linksList.push({ id: 2, name: 'IMDB', url: `https://www.imdb.com/title/${imdb_id}` });
		}
	}

	return (
		<div className="details-body">
			{isLoading && <PageLoader />}
			{!isLoading && movie && <div>
				<section className="details-area">
					<PageTitle
						pageName='details'
						pageTitle='Details'
					/>
					<ul className="details-content">
						<li className="details-left" style={{ backgroundImage: `url('https://image.tmdb.org/t/p/original${poster_path}')` }}></li>
						<li className="details-right">
							{release_date && <h2>{title} ({getFormattedYear(release_date)})</h2>}
							<p className="genres">{genresText}</p>
							<p className="description short">{tagline}</p>
							{vote_average && <Rating
								rating={vote_average}
								votesCount={numberWithCommas(vote_count)}
							/>}
							<p className="description full">{overview}</p>
							<div className="extra">
								{featuresList && featuresList.length > 0 && <FeaturesList
									featuresList={featuresList.slice(0, 5)}
									linksList={null}
									isFavorite={favoriteMoviesList.findIndex(favoriteMovie => parseInt(favoriteMovie.id) === parseInt(movie.id)) > -1}
									onFavoriteMovieClick={handleFavoriteMovieClick}
									onUpdateMovieClick={handleUpdateMovieClick}
									onRemoveMovieClick={handleOnRemoveMovieClick}
								/>}
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
								onUpdateMovieClick={null}
								onRemoveMovieClick={null}
							/>
							{production_companies && production_companies.length > 0 && <ProductionsList
								productionsList={production_companies}
							/>}
						</div>
					</ul>
				</section>
				{actorsList && actorsList.length > 0 && <section className="actors-area">
					<PageTitle
						pageName='actors'
						pageTitle='Cast'
					/>
					<ActorsList
						actorsList={actorsList}
					/>
				</section>}
				{crewsList && crewsList.length > 0 && <section className="crew-area">
					<PageTitle
						pageName='crew'
						pageTitle='Crew'
					/>
					<CrewsList
						crewsList={crewsList}
					/>
				</section>}
				<ButtonClick
					buttonText={'Back'}
					buttonTitle={'Back'}
					isLoading={false}
					onClick={handleBackClick}
				/>
				<Modal
					modalData={modalData}
					onRemoveButtonClick={handleOnRemoveButtonClick}
					onCloseModalButtonClick={handleOnCloseModalButtonClick}
				/>
			</div>}
		</div>
	);
};

Details.propTypes = propTypes;
Details.defaultProps = defaultProps;

export default Details;