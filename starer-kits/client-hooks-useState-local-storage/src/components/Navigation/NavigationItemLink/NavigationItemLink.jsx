import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const propTypes = {
    link: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    exact: PropTypes.bool.isRequired,
    children: PropTypes.node
};

const defaultProps = {
    children: null
};

const NavigationItem = (props) => {
    const { link, linkText, isActive, exact } = props;
    return (
        <li className={`link${isActive ? ' active' : ''}`}>
            <NavLink to={link} exact={exact}>{linkText}</NavLink>
        </li>
    );
};

NavigationItem.propTypes = propTypes;
NavigationItem.defaultProps = defaultProps;

export default NavigationItem;