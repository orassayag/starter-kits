import React from 'react';
import './Rating.scss';

const Rating = (props) => {
	const { rating, votesCount } = props;
	const intPart = Math.trunc(rating);
	const isHalf = Number((rating - intPart).toFixed(2)) >= 0.5;
	return (
		<div className="rate">
			{[...Array(intPart)].map((ctrl, i) => (<i key={i} className="fa fa-star" aria-hidden="true"></i>))}
			{isHalf ? (<i className="fa fa-star-half" aria-hidden="true"></i>) : ''}
			<span className="count">{`(${rating} - ${votesCount} votes)`}</span>
		</div>
	);
};

export default Rating;