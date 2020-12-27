import React from 'react';
import './FavoriteButton.scss';

const FavoriteButton = (props) => {
	const { isFavorite, onFavoriteMovieClick } = props;
	return (
		<button className="favorite-star" onClick={onFavoriteMovieClick}>
			<i className={`fa fa-star${isFavorite ? ' active' : ''}`} aria-hidden="true"></i>
		</button>
	);
};

export default FavoriteButton;