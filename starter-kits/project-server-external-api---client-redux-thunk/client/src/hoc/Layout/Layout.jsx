import { Component } from 'react';
import PropTypes from 'prop-types';
import './Layout.scss';
import { Footer, Header } from '../../components';

const propTypes = {
    children: PropTypes.node
};

const defaultProps = {
    children: null
};

class Layout extends Component {
    render() {
        return (
            <div className='main-container'>
                <Header />
                {this.props.children}
                <Footer />
            </div>
        );
    }
}

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;

export default Layout;