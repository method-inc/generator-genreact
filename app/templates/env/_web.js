require('isomorphic-fetch');
require('es6-promise').polyfill();

import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import { createHistory } from 'history';
import routes from '../routes';

const history = createHistory();

render(
  <Router children={routes} history={history} />,
  document.getElementById('app')
);
