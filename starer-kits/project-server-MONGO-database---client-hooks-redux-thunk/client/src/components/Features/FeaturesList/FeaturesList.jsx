import React from 'react';
import './FeaturesList.scss';
import { FavoriteButton, Feature, LinksList, RemoveButton, UpdateButton } from '../../';

const FeaturesList = (props) => {
	const { featuresList, linksList, isFavorite, onFavoriteMovieClick, onUpdateMovieClick, onRemoveMovieClick } = props;
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
			<div className="options">
				{onFavoriteMovieClick && <FavoriteButton
					isFavorite={isFavorite}
					onFavoriteMovieClick={onFavoriteMovieClick}
				/>}
				{onUpdateMovieClick && <UpdateButton
					onUpdateMovieClick={onUpdateMovieClick}
				/>}
				{onRemoveMovieClick && <RemoveButton
					onRemoveMovieClick={onRemoveMovieClick}
				/>}
			</div>
			{linksList && <LinksList
				linksList={linksList}
			/>}
		</div>
	);
};

export default FeaturesList;