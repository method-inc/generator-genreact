/** @flow */
import React from 'react';
import {Route} from 'react-router';

import App from './handlers/Base';
import Home from'./handlers/Home';
import NotFound from './handlers/NotFound';

var routes = (
  <Route component={App}>
    <Route path="/" component={Home} />
    <Route path="*" component={NotFound}/>
  </Route>
);

export default routes;


