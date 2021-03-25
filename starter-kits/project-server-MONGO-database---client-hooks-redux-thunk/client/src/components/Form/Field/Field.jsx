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
	const inputValue = inputType === 'number' ? (value === undefined || value === null ? '' : value) : (value || '');
	return (
		<p {...errorValue}>
			<label>{labelTitle}</label>
			<input type={inputType} name={inputName} value={inputValue} onChange={onValueChange}{...dataIdValue} />
		</p>
	);
};

export default Field;