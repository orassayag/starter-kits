import React from 'react';
import './Trailer.scss';

const Trailer = (props) => {
	const { youtubeKey } = props;
	return (
		<div className="trailer">
			<iframe title="Ad Astra (2020)" width="400" height="180" src={`https://www.youtube.com/embed/${youtubeKey}`}
				frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
		</div>
	);
};

export default Trailer;