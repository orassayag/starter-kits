import React from 'react';
import PropTypes from 'prop-types';
import './Layout.scss';

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