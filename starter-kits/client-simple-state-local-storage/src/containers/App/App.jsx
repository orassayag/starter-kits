import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { Layout } from '../../hoc';
import { Details, Favorites, Main } from '../';

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path={'/'} exact={true} component={Main} />
          <Route path={'/favorites'} exact={true} component={Favorites} />
          <Route path={'/details/:id'} exact={true} component={Details} />
          <Redirect to={'/'} />
        </Switch>
      </Layout>
    );
  }
}

export default withRouter(App);