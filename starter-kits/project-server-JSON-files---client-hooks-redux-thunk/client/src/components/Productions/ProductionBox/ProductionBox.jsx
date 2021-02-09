import React from 'react';
import './ProductionBox.scss';
import { Field, Dropdown } from '../../';

const ProductionBox = (props) => {
	const { production, contries, onProductionBoxValueChange, onProductionBoxRemoveClick } = props;
	const { id, name, logo_path, origin_country, errorField } = production;
	return (
		<div className={`container${errorField ? ' error-container' : ''}`}>
			<div className="delete" data-id={id} onClick={onProductionBoxRemoveClick}>
				<i className="fa fa-times" aria-hidden="true"></i>
			</div>
			<p className="title">Production</p>
			<Field
				labelTitle="Full Name"
				inputType="text"
				inputName="name"
				dataId={id}
				value={name}
				isError={errorField === 'name'}
				onValueChange={onProductionBoxValueChange}
			/>
			<Dropdown
				labelTitle="Production Country"
				dropName="origin_country"
				dataId={id}
				value={origin_country}
				dropOptions={contries}
				onDropChange={onProductionBoxValueChange}
			/>
			<Field
				labelTitle="Logo Path"
				inputType="text"
				inputName="logo_path"
				dataId={id}
				value={logo_path}
				isError={errorField === 'logo_path'}
				onValueChange={onProductionBoxValueChange}
			/>
		</div>
	);
};

export default ProductionBox;