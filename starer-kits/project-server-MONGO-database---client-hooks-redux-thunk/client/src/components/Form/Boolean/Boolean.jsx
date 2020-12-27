import React from 'react';
import './Boolean.scss';

const Boolean = (props) => {
	const { labelTitle, boolName, value, onBoolChange } = props;

	return (
		<p className="boolean">
			<label>{labelTitle}</label>
			<select name={boolName} value={value} onChange={onBoolChange}>
				<option value={false}>No</option>
				<option value={true}>Yes</option>
			</select>
		</p>
	);
};

export default Boolean;