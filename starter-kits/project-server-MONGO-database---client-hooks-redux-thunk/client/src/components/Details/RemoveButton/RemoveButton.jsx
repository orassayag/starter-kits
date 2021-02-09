import React from 'react';
import './RemoveButton.scss';

const RemoveButton = (props) => {
	const { onRemoveMovieClick } = props;
	return (
		<button className="remove-icon" onClick={onRemoveMovieClick}>
			<i className="fa fa-times" aria-hidden="true"></i>
		</button>
	);
};

export default RemoveButton;