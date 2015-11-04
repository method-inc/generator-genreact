/** @flow */
require('es6-promise').polyfill();
require('isomorphic-fetch');
var debug = require('debug')('app startup');

import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import Router from 'react-router';
import routes from '../routes';
import {resources} from './webpack';

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
app.get('/robots.txt', function(req, res) {
  res.type('text/plain');
  res.send('User-agent: *\nDisallow:\n');
});

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
    res.status(status).send(renderedHtmlString);

    return res.status(status).send(renderedHtmlString);
  });
});

debug(`app server starting on `);
var server = app.listen(process.env.PORT || 4444, function () {
  var host = server.address().address;
  var port = server.address().port;

  debug('%s listening at http://%s:%s', 'The app is', host, port);
});
