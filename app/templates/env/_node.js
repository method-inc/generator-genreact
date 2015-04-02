/** @flow */
require('es6-promise').polyfill();
require('isomorphic-fetch');

import express from 'express';
import Resolver from 'react-resolver';
import React from 'react';
import Router from 'react-router';
import routes from '../routes';

import {readFileSync as read} from 'fs';

var tmpl = function(markup) {
  return read('./index.html', 'utf8').replace('†react†', markup);
};

var app = express();

app.get('*', function(req, res) {
  var resolver = Resolver.create();
  var router = Router.create({
    routes: resolver.route(routes),
    location: req.url,
    onAbort(redirect) {
      cb({redirect});
    },
    onError(err) {
      console.log('Routing Error');
      console.log(err);
    }
  });

  router.run(function(Handler, state) {
    resolver.resolve(<Handler />).then(function(handled) {
      res.send(tmpl(React.renderToStaticMarkup(handled)));
    });
  });
});

console.log('app server starting on <%= port %>');
var server = app.listen(<%= port %>, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('React-docs listening at http://%s:%s', host, port);
});

