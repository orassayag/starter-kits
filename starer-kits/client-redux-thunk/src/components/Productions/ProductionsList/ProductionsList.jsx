import React from 'react';
import './ProductionsList.scss';
import { Production } from '../../';

const ProductionsList = (props) => {
	const { productionsList } = props;
	const list = productionsList.filter(production => production.logo_path !== null).map(production => {
		return (<Production
			key={production.id}
			posterId={production.logo_path}
			name={production.name}
			country={production.origin_country}
		/>);
	});
	return (
		<div className="production-companies">
			<div className="production-companies-list">
				{list}
			</div>
		</div>
	);
};

export default ProductionsList;