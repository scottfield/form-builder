import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import FormPage from './routes/FormPage';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/form" exact component={FormPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
