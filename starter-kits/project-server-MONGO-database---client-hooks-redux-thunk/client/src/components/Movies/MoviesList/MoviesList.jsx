import { memo } from 'react';
import './MoviesList.scss';
import { ButtonClick, Movie, PageLoader } from '../../';

const MoviesList = memo((props) => {
	const { pageName, moviesList, isLoading, isPager, onLoadMoreClick, onMovieClick, onFavoriteMovieClick, onUpdateMovieClick, onRemoveMovieClick } = props;
	let moviesComponents = null;
	if (moviesList.length > 0) {
		moviesComponents = moviesList.map(movie => {
			return (
				<Movie
					key={movie.id}
					movieId={movie.id}
					movieName={movie.title}
					posterId={movie.poster_path}
					isFavorite={movie.is_favorite}
					onMovieClick={onMovieClick}
					onFavoriteMovieClick={onFavoriteMovieClick}
					onUpdateMovieClick={onUpdateMovieClick}
					onRemoveMovieClick={onRemoveMovieClick}
				/>
			);
		});
	}
	else {
		if (pageName === 'favorites') {
			moviesComponents = (<div>No favorite movies added yet...</div>);
		}
	}

	return (
		<div>
			<div className="movies-area">
				{moviesComponents}
				{!isLoading && isPager && moviesList.length > 0 && <ButtonClick
					buttonText={'Load More'}
					buttonTitle={'Load More'}
					isLoading={false}
					onClick={onLoadMoreClick}
				/>}
			</div>
			{isLoading && <PageLoader />}
		</div>
	);
});

export default MoviesList;