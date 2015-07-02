/** @flow */
require('es6-promise').polyfill();
require('isomorphic-fetch');
var projectName = require('../package.json').name;

var debug = require('debug')('app startup');

import express from 'express';
import React from 'react';
import Router from 'react-router';
import Location from 'react-router/lib/Location';
import {Resolver} from 'react-resolver';
import routes from '../routes';
import {resources} from './webpack';

import {readFileSync as read} from 'fs';
import {join} from 'path';

var tmpl = o => read('./index.html', 'utf8')
  .replace('†react†', o.html)
  .replace('†__resolver__†', JSON.stringify(o.data))
  .replace('†head†', resources());

var app = express();

app.use('/cdn', express.static(join(process.cwd(), 'dist')));

app.get('*', function(req, res) {
  var location = new Location(req.path, req.query);
  function onError(err) {
    debug('Router Error', err);
    res.send(500, (tmpl({html: '<h1>500 error</h1>', data: {}})));
  }

  function onAbort(redirect) {
    debug('onAbort', redirect);
    res.send(302, {Location: redirect.to});
  }

  Router.run(routes, location, (error, initialState, transition) => {
    if (error) {
      console.error('THE SKY IS FALLING!', error);
      return onError();
    }

    Resolver.renderToString(<Router onAbort={onAbort} onError={onError} {...initialState} />)
      .then(o => res.send(tmpl({html: o.toString(), data: o.data})))
  });
});

debug(projectName + ' server starting on ${process.env.PORT}`);
var server = app.listen(process.env.PORT, function () {
  var host = server.address().address;
  var port = server.address().port;

  debug('%s listening at http://%s:%s', projectName, host, port);
});

