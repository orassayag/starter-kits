import React from 'react';
import './Actor.scss';

const Actor = (props) => {
	const { posterId, name, character } = props;
	const imageURL = posterId ? `https://image.tmdb.org/t/p/w185${posterId}` : 'https://m.media-amazon.com/images/G/01/imdb/images/nopicture/32x44/name-2138558783._CB468460248_.png';
	return (
		<div className="actor">
			<div className="image" style={{ backgroundImage: `url('${imageURL}')` }}></div>
			<div className="name">{name}</div>
			<div className="also-known-as">{character}</div>
		</div>
	);
};

export default Actor;