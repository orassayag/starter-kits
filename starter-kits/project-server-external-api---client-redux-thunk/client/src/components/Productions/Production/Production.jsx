import React from 'react';
import './Production.scss';

const Production = (props) => {
	const { posterId, name, country } = props;
	return (
		<div className="production-company">
			<div className="image" style={{ backgroundImage: `url('https://image.tmdb.org/t/p/original${posterId}')` }}></div>
			<div className="name">{`${name} - ${country}`}</div>
		</div>
	);
};

export default Production;