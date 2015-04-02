require('es6-promise').polyfill();
require('isomorphic-fetch');

import React from 'react';
import Resolver from 'react-resolver';
import Router from 'react-router';
import routes from '../routes';

const resolver = Resolver.create();

Router.run(resolver.route(routes), Router.HistoryLocation, function(Handler) {
  React.render(<Handler />, document.getElementById('app'));
});

