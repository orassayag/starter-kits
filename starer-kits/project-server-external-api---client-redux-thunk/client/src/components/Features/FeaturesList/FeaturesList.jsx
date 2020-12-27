import React from 'react';
import './FeaturesList.scss';
import { Feature, FavoriteButton, LinksList } from '../../';

const FeaturesList = (props) => {
	const { featuresList, linksList, isFavorite, onFavoriteMovieClick } = props;
	const list = featuresList.map(feature => {
		return (<Feature
			key={feature.item}
			item={feature.item}
			value={feature.value}
		/>);
	});
	return (
		<div className="features">
			{list}
			{onFavoriteMovieClick && <FavoriteButton
				isFavorite={isFavorite}
				onFavoriteMovieClick={onFavoriteMovieClick}
			/>}
			{linksList && <LinksList
				linksList={linksList}
			/>}
		</div>
	);
};

export default FeaturesList;