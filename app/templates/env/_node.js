/** @flow */
require('es6-promise').polyfill();
require('isomorphic-fetch');
var debug = require('debug')('app startup');

import express from 'express';
import React from 'react';
import Router from 'react-router';
import {Resolver} from 'react-resolver';
import routes from '../routes';

import {readFileSync as read} from 'fs';

var tmpl = o => read('./index.html', 'utf8')
  .replace('†react†', o.html)
  .replace('†__resolver__†',  JSON.stringify(o.data));

var app = express();

app.get('*', function(req, res) {
  var router = Router.create({
    routes: routes,
    location: req.url,
    onAbort(redirect) {
      res.writeHead(303, {Location: redirect.to});
      res.end();
    },
    onError(err) {
      debug('Routing Error');
      debug(err);
    },
  });

  router.run((Handler, state) => (
    Resolver.renderToString(<Handler />)
      .then(o => res.send(tmpl({html: o.toString(), data: o.data})))
  ));
});

debug('app server starting on <%= port %>');
var server = app.listen(<%= port %>, function () {
  var host = server.address().address;
  var port = server.address().port;

  debug('React-docs listening at http://%s:%s', host, port);
});

