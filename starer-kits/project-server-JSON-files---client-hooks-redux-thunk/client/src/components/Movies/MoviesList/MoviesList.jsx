import React, { memo } from 'react';
import './MoviesList.scss';
import { Movie, ButtonClick } from '../../';

const MoviesList = memo((props) => {
	const { pageName, moviesList, isLoadingMoreMovies, isPager, onLoadMoreClick, onMovieClick, onFavoriteMovieClick, onUpdateMovieClick } = props;
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
		<div className="movies-area">
			{moviesComponents}
			{isPager && <ButtonClick
				buttonText={'Load More'}
				buttonTitle={'Load More'}
				isLoading={isLoadingMoreMovies}
				onClick={onLoadMoreClick}
			/>}
		</div>
	);
});

export default MoviesList;