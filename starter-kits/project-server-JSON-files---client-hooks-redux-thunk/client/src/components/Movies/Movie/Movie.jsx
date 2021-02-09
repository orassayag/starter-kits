import React, { memo } from 'react';
import './Movie.scss';

const Movie = memo((props) => {
	const { movieId, movieName, posterId, isFavorite, onMovieClick, onFavoriteMovieClick, onUpdateMovieClick } = props;
	return (
		<div className="movie" data-id={movieId} title={movieName} style={{ backgroundImage: `url('https://image.tmdb.org/t/p/w342${posterId}')` }} onClick={onMovieClick}>
			<div className="movie-favorite">
				<i className={`fa fa-star${isFavorite ? ' active' : ''}`} aria-hidden="true" data-id={movieId} data-name={movieName} data-poster-id={posterId} onClick={onFavoriteMovieClick}></i>
			</div>
			<div className="movie-update">
				<i className="fa fa-pencil-square" aria-hidden="true" data-id={movieId} onClick={onUpdateMovieClick}></i>
			</div>
		</div>
	);
});

export default Movie;