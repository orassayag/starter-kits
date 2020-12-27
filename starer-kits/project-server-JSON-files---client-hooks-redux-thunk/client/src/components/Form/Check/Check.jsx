import React from 'react';
import './Check.scss';

const Check = (props) => {
	const { labelTitle, checkName, value, onCheckChange } = props;
	return (
		<p className="check">
			<input type="checkbox" id={checkName} checked={value ? 'checked' : ''} name={checkName} onChange={onCheckChange} />
			<label htmlFor={checkName}>{labelTitle}</label>
		</p>
	);
};

export default Check;