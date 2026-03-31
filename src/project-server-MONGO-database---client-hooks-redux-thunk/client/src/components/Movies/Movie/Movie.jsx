import { memo } from 'react';
import './Movie.scss';

const Movie = memo((props) => {
	const { movieId, movieName, posterId, isFavorite, onMovieClick, onFavoriteMovieClick, onUpdateMovieClick, onRemoveMovieClick } = props;
	return (
		<div className="movie" data-id={movieId} title={`${movieName} (${movieId})`} style={{ backgroundImage: `url('https://image.tmdb.org/t/p/w342${posterId}')` }} onClick={onMovieClick}>
			<div className={`movie-remove${onRemoveMovieClick ? '' : ' hidden'}`} title="Remove">
				<i className="fa fa-times" title="Remove" aria-hidden="true" data-id={movieId} data-name={movieName} onClick={onRemoveMovieClick}></i>
			</div>
			<div className="movie-favorite" title="Mark as Favorite">
				<i className={`fa fa-star${isFavorite ? ' active' : ''}`} title="Mark as Favorite" aria-hidden="true" data-id={movieId} data-name={movieName} data-poster-id={posterId} onClick={onFavoriteMovieClick}></i>
			</div>
			<div className="movie-update" title="Update">
				<i className="fa fa-pencil-square" title="Update" aria-hidden="true" data-id={movieId} onClick={onUpdateMovieClick}></i>
			</div>
		</div>
	);
});

export default Movie;