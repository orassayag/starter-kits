import React from 'react';
import './LongText.scss';

const LongText = (props) => {
	const { labelTitle, longName, isError, value, onLongChange } = props;
	return (
		<p className={`longText${isError ? ' error' : ''}`}>
			<label>{labelTitle}</label>
			<textarea name={longName} value={value || ''} onChange={onLongChange}></textarea>
		</p>
	);
};

export default LongText;