/** @flow */
require('es6-promise').polyfill();
require('isomorphic-fetch');
var debug = require('debug')('app startup');

import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { createLocation } from 'history';
import routes from '../routes';
import { resources } from './webpack';
import { Provider } from 'react-redux';
import defaultState from 'store/defaultState';
import configureStore from 'store/configureStore';

import {readFileSync as read} from 'fs';
import {join} from 'path';

const tmpl = o => read('./index.html', 'utf8')
  .replace('†react†', o.html)
  .replace('†__resolver__†', JSON.stringify(o.data))
  .replace('†__initialState__†', JSON.stringify(o.initalState))
  .replace('†head†', resources());

let app = express();

app.use('/cdn', express.static(join(process.cwd(), 'dist')));
app.use('/public', express.static(join(process.cwd(), 'public')));

// robots.txt
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send('User-agent: *\nDisallow:\n');
});

app.get('*', (req, res) => {
  const location = createLocation(req.url);
  match({ routes, location }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      // Create a new Redux store instance
      const store = configureStore(defaultState);
      const html = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );
      res.status(200).send(tmpl({html, initalState: store.getState()}));
    } else {
      res.status(404).send('Not found');
    }
  });
});

debug('app server starting on %s', process.env.PORT || 4444);
const server = app.listen(process.env.PORT || 4444, () => {
  const host = server.address().address;
  const port = server.address().port;

  debug(' 🌎 %s listening at http://%s:%s', 'convey-directory-client', host, port);
});
