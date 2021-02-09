import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { Layout } from '../../hoc';
import { Details, Favorites, Main } from '../';

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route path={'/'} exact={true} render={(props) => <Main {...props} />} />
        <Route path={'/favorites'} exact={true} render={(props) => <Favorites {...props} />} />
        <Route path={'/details/:id'} exact={true} render={(props) => <Details {...props} />} />
        <Redirect to={'/'} />
      </Switch>
    </Layout>
  );
};

export default withRouter(App);