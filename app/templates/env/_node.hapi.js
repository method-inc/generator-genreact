/** @flow */
require('es6-promise').polyfill();
require('isomorphic-fetch');
var projectName = require('../package.json').name;

var debug = require('debug')('app startup');

import path from 'path';
import Hapi from 'hapi';
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

var server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: process.env.PORT,
});

server.route({
  method: 'GET',
  path: '/favicon.ico',
  handler: {
    file: function (request) {
      return path.join('public', 'favicon.ico');
    }
  }
});

// static file server. This should all probably be cleaned up.
server.route({
  method: 'GET',
  path: `/cdn/{filename}`,
  handler: {
    file(request) {
      return path.join('dist', request.params.filename);
    }
  }
});

// static file server
['css', 'images'].forEach(a => {
  server.route({
    method: 'GET',
    path: '/public/' + a + '/{filename}', // param* for other syntax
    handler: {
      file(request) {
        return path.join('public', a, request.params.filename);
      }
      // why is this syntax not working?
      // directory: {path: __dirname + '/public'}
    }
  });
});

// TODO: handle 500s correctly
server.route({
  method: 'GET',
  path: '/{location*}',
  handler: function(request, reply) {
    var location = new Location(request.params.location || '/', request.query);
    function onError(err) {
      debug('Router Error', err);
      reply(tmpl({html: '<h1>500 error</h1>', data: {}}));
    }

    function onAbort(redirect) {
      debug('onAbort', redirect);
      reply.redirect(redirect.to);
    }

    Router.run(routes, location, (error, initialState, transition) => {
      if (error) {
        console.error('THE SKY IS FALLING!', error);
        return onError();
      }

      Resolver.renderToString(<Router onAbort={onAbort} onError={onError} {...initialState} />)
        .then(o => reply(tmpl({html: o.toString(), data: o.data})))
    });
  },
});

debug(projectName + ' server starting on ' + process.env.PORT);

server.start();

