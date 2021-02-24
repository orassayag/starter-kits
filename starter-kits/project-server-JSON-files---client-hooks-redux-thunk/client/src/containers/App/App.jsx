import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { Layout } from '../../hoc';
import { Details, Favorites, Form, Main } from '../';

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route path={'/'} exact={true} render={(props) => <Main {...props} />} />
        <Route path={'/favorites'} exact={true} render={(props) => <Favorites {...props} />} />
        <Route path={'/details/:id'} exact={true} render={(props) => <Details {...props} />} />
        <Route path={'/form/:id?'} exact={true} render={(props) => <Form key={props.match.params.id} {...props} />} />
        <Redirect to={'/'} />
      </Switch>
    </Layout>
  );
};

export default withRouter(App);