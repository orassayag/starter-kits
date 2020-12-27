import React from 'react';
import './Layout.scss';
import PropTypes from 'prop-types';

const propTypes = {
    children: PropTypes.node
};

const defaultProps = {
    children: null
};

const Layout = (props) => {
    return (
        <div className='main-container'>
            {props.children}
        </div>
    );
};

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;

export default Layout;