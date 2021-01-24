import React from 'react';
import './PageTitle.scss';

const PageTitle = (props) => {
	const { pageName, pageTitle } = props;
	return (
		<h3 className={`section-title${pageName ? ` ${pageName}` : ''}`}>{pageTitle}</h3>
	);
};

export default PageTitle;