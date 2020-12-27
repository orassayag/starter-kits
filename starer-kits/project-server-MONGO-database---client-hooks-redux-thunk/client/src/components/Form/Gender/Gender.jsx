import React from 'react';
import './Gender.scss';

const Gender = (props) => {
	const { labelTitle, genderName, dataId, value, onGenderChange } = props;
	const dataIdValue = {};
	if (dataId) {
		dataIdValue['data-id'] = dataId;
	}
	return (
		<p className="gender">
			<label>{labelTitle}</label>
			<select name={genderName} value={value} onChange={onGenderChange}{...dataIdValue}>
				<option value={2}>Male</option>
				<option value={1}>Female</option>
			</select>
		</p>
	);
};

export default Gender;