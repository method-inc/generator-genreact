/** @flow */
require('es6-promise').polyfill();
require('isomorphic-fetch');
var debug = require('debug')('app startup');

import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RoutingContext } from 'react-router';
import routes from '../routes';
import { resources } from './webpack';

import {readFileSync as read} from 'fs';
import {join} from 'path';
import fs from 'fs';

var tmpl = o => read('./index.html', 'utf8')
  .replace('†react†', o.html)
  .replace('†__resolver__†', JSON.stringify(o.data))
  .replace('†head†', resources());

var app = express();

app.use('/cdn', express.static(join(process.cwd(), 'dist')));
app.use('/public', express.static(join(process.cwd(), 'public')));

// robots.txt
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send('User-agent: *\nDisallow:\n');
});

<<<<<<< HEAD
app.get('*', (req, res) => {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      console.log("HERE", <RoutingContext {...renderProps} />);
      res.status(200).send(tmpl({html: renderToString(<RoutingContext {...renderProps} />)}));
    } else {
      res.status(404).send('Not found');
    }
=======
app.get('*', function(req, res) {

  var router = Router.create({
    routes: routes,
    location: req.url,
    onAbort(redirect) {
      res.writeHead(303, { Location: redirect.to });
      res.end();
    },
    onError(err) {
      debug('Routing Error');
      debug(err);
    },
  });

  router.run((Handler, state) => {
    var isNotFound = state.routes.some(function(route) {
      return route.isNotFound;
    });

    var status = isNotFound ? 404 : 200;

    var renderedHtmlString = tmpl({html: ReactDOM.renderToString(<Handler />)});

    return res.status(status).send(renderedHtmlString);
>>>>>>> 18e3f90a0860974cf30ffde818735ed80c9eda48
  });
});

debug(`app server starting on `);
var server = app.listen(process.env.PORT || 4444, function () {
  var host = server.address().address;
  var port = server.address().port;

  debug('%s listening at http://%s:%s', 'The app is', host, port);
});
