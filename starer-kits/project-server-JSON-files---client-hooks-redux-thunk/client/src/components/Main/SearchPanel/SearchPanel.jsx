
import React from 'react';
import './SearchPanel.scss';

const SearchPanel = (props) => {
	const { searchText, onSearchTextChange } = props;
	return (
		<div className="search-area">
			<div className="search-container">
				<div className="search-icon">
					<i className="fa fa-search" aria-hidden="true"></i>
				</div>
				<input type="text" onChange={onSearchTextChange} placeholder="Search" value={searchText || ''} className="search-input" />
			</div>
		</div>
	);
};

export default SearchPanel;