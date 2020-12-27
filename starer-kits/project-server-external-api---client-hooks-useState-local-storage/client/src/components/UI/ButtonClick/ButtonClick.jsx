import React from 'react';
import './ButtonClick.scss';
import PropTypes from 'prop-types';

const propTypes = {
	buttonText: PropTypes.string.isRequired,
	buttonTitle: PropTypes.string.isRequired,
	isLoading: PropTypes.bool.isRequired,
	onClick: PropTypes.func
};

const defaultProps = {
	onClick: null
};

const ButtonClick = (props) => {
	const { buttonText, buttonTitle, isLoading, onClick } = props;
	const element = isLoading ? (<div className="loader"></div>) : (<button className="button" onClick={onClick} title={buttonTitle}><p>{buttonText}</p></button>);
	return (
		<div className="button-container">
			{element}
		</div>
	);
};

ButtonClick.propTypes = propTypes;
ButtonClick.defaultProps = defaultProps;

export default ButtonClick;