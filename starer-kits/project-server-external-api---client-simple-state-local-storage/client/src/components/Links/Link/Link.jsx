import React from 'react';
import './Link.scss';

const Link = (props) => {
	const { name, url } = props;
	return (
		<div className="link">
			<a href={url} target="_blank">{name}</a>
		</div>
	);
};

export default Link;