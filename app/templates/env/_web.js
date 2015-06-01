require('isomorphic-fetch');

import React from 'react';
import Router from 'react-router';

import {Resolver} from 'react-resolver';
import routes from '../routes';

Router.run(routes, Router.HistoryLocation, function(Handler) {
  Resolver.render(<Handler />, document.getElementById('app'));
});

// clean up the __resolver__ rehydration script
(function() {
  var tmp = document.getElementById('__resolver__');
  if (tmp) {
    Object.keys(window.__resolver__).forEach(
      key => delete window.__resolver__[key]
    );
    tmp.parentNode.removeChild(tmp);
  }
})();

