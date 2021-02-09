import React from 'react';
import './UpdateButton.scss';

const UpdateButton = (props) => {
	const { onUpdateMovieClick } = props;
	return (
		<button className="update-icon" onClick={onUpdateMovieClick}>
			<i className="fa fa-pencil-square" aria-hidden="true"></i>
		</button>
	);
};

export default UpdateButton;