import React from 'react';
import './Field.scss';

const Field = (props) => {
	const { labelTitle, inputType, inputName, dataId, isError, value, onValueChange } = props;
	const dataIdValue = {};
	if (dataId) {
		dataIdValue['data-id'] = dataId;
	}
	const errorValue = {};
	if (isError) {
		errorValue['className'] = 'error';
	}
	return (
		<p {...errorValue}>
			<label>{labelTitle}</label>
			<input type={inputType} name={inputName} value={value || ''} onChange={onValueChange}{...dataIdValue} />
		</p>
	);
};

export default Field;
