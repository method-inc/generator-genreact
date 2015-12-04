/** @flow */
import React from 'react';
import Router from 'react-router';

const {
  DefaultRoute,
  Route,
  NotFoundRoute,
} = Router;

import Base from './handlers/Base';
import Home from'./handlers/Home';
import NotFound from './handlers/NotFound';

var routes = (
  <Route path="/" component={Base}>
    <DefaultRoute name="home" component={Home} />
    <NotFoundRoute component={NotFound}/>
  </Route>
);

export default routes;
