import React from 'react';
import './Feature.scss';

const Feature = (props) => {
	const { item, value } = props;
	return (
		<div className="feature">
			<span className="item">
				{item}:
			</span>
			<span className="value">
				{value}
			</span>
		</div>
	);
};

export default Feature;