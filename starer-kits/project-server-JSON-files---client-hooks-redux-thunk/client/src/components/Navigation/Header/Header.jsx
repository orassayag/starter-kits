import React from 'react';
import './Header.scss';
import { NavLink } from 'react-router-dom';
import { NavigationItemLink } from '../../';

const Header = () => {
	const pageName = window.location.pathname;
	return (
		<header>
			<h2>
				<NavLink to={'/'} exact={true}>{'Movie Library'}</NavLink>
			</h2>
			<nav>
				<NavigationItemLink link={'/'} linkText={'Home'} isActive={pageName === '/'} exact={true} />
				<NavigationItemLink link={'/favorites'} linkText={'Favorites'} isActive={pageName === '/favorites'} exact={true} />
				<NavigationItemLink link={'/form'} linkText={'Add Movie'} isActive={pageName === '/form'} exact={true} />
			</nav>
		</header>
	);
};

export default Header;