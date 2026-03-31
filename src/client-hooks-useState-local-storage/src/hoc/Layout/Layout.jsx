import './Layout.scss';
import PropTypes from 'prop-types';
import { Footer, Header } from '../../components';

const propTypes = {
    children: PropTypes.node
};

const defaultProps = {
    children: null
};

const Layout = (props) => {
    return (
        <div className="main-container">
            <Header />
            {props.children}
            <Footer />
        </div>
    );
};

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;

export default Layout;