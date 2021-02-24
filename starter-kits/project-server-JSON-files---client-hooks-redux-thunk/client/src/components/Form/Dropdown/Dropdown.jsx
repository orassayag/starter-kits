import './Dropdown.scss';

const Dropdown = (props) => {
	const { labelTitle, dropName, dataId, value, dropOptions, onDropChange } = props;
	const dataIdValue = {};
	if (dataId) {
		dataIdValue['data-id'] = dataId;
	}
	return (
		<p>
			<label>{labelTitle}</label>
			<select name={dropName} value={value} onChange={onDropChange}{...dataIdValue}>
				{dropOptions.map(o => (<option key={o.value} value={o.value}>{o.title}</option>))}
			</select>
		</p>
	);
};

export default Dropdown;