import React from 'react';
import './MiniButton.scss';

const MiniButton = (props) => {
	const { buttonText, buttonTitle, onClick } = props;
	return (
		<button className="mini-button" onClick={onClick} title={buttonTitle}><p>{buttonText}</p></button>
	);
};

export default MiniButton;