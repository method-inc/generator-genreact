/** @flow */
import React from 'react';
import Router from 'react-router';

const {
  DefaultRoute,
  Link,
  Route,
  RouteHandler,
  NotFoundRoute
} = Router;

import App from './handlers/Base';
import Home from'./handlers/Home';
import NotFound from './handlers/NotFound';

var routes = (
  <Route path="/" handler={RouteHandler}>
    <Route handler={App}>
      <DefaultRoute handler={Home} />
      <NotFoundRoute handler={NotFound}/>
    </Route>
  </Route>
);

export default routes;

