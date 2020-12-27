import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePick.scss';

const DatePick = (props) => {
	const { labelTitle, dateName, isError, value, onDateChange } = props;

	return (
		<div className={`date-pick${isError ? ' error' : ''}`}>
			<label>{labelTitle}</label>
			<DatePicker
				selected={value || ''}
				onChange={onDateChange}
				name={dateName}
			/>
		</div>
	);
};

export default DatePick;
